import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { imageData } from '../../services/database/imageData.ts';
import { nesneUrl } from '../../services/nesneGorsel.ts';
import { speak } from '../../services/speechService.ts';

// Yapboz (yeniden, Kaan 2026-10-08): gerçek fotoğraflar, gerçek yapboz taşı biçimi (çıkıntı/girinti),
// büyük tahta + soluk iz + kesik parça hatları, mıknatıslı oturma, sürükle ya da dokun-dokun; ceza yok.
// Seviye: 2 → 4 → 6 → 9 parça, başardıkça. 6-9 parçada kalabalık sahneler (mekânlar, doğa) da gelir.
const SEVIYELER = [{ r: 1, c: 2 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 3, c: 3 }];
const OTURUM = 5;
const TEKLI = new Set(['Hayvanlar', 'Taşıtlar', 'Meyveler', 'Oyuncaklar', 'Sebzeler', 'hayvanlar']);
const SAHNE = new Set(['Mekanlar & Odalar', 'Doğal Yapılar & Uzay']);

interface Resim { url: string; kelime: string }
const havuzKur = (kat: Set<string>): Resim[] => {
  const gorulen = new Set<string>(); const l: Resim[] = [];
  for (const i of imageData) {
    if (!kat.has(i.tags?.category) || gorulen.has(i.word)) continue;
    const url = nesneUrl(i.imageUrl);
    if (!url || !url.endsWith('.webp')) continue;
    gorulen.add(i.word); l.push({ url, kelime: i.word });
  }
  return l;
};
const TEKLI_HAVUZ = havuzKur(TEKLI);
const SAHNE_HAVUZ = havuzKur(SAHNE);
const karistir = <T,>(a: T[]): T[] => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const buyukBas = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);
const resimSec = (seviye: number, oncekiler: Set<string>): Resim => {
  const havuz = seviye >= 2 && Math.random() < 0.5 ? SAHNE_HAVUZ : TEKLI_HAVUZ;
  const aday = havuz.filter((x) => !oncekiler.has(x.url));
  const l = aday.length ? aday : havuz;
  return l[Math.floor(Math.random() * l.length)];
};

// --- yapboz taşı kenarları ---
// Kenarlar saat yönünde çizilir; s: +1 dışa çıkıntı, -1 içe girinti, 0 düz (tahta kenarı).
type Kenarlar = { ust: number; sag: number; alt: number; sol: number };
const kenarYolu = (ax: number, ay: number, bx: number, by: number, s: number, K: number): string => {
  if (!s) return `L ${bx} ${by}`;
  const len = Math.hypot(bx - ax, by - ay), ux = (bx - ax) / len, uy = (by - ay) / len, nx = uy, ny = -ux;
  const P = (t: number, h: number) => `${(ax + ux * t * len + nx * h * s * K).toFixed(1)} ${(ay + uy * t * len + ny * h * s * K).toFixed(1)}`;
  return `L ${P(0.37, 0)} C ${P(0.39, 0.3)} ${P(0.3, 1)} ${P(0.5, 1)} C ${P(0.7, 1)} ${P(0.61, 0.3)} ${P(0.63, 0)} L ${P(1, 0)}`;
};
/** Taşın yolu (kutu: W+2m × H+2m, hücre m,m'den başlar) */
const tasYolu = (W: number, H: number, m: number, k: Kenarlar) => {
  const K = Math.min(W, H) * 0.2;
  return `M ${m} ${m} ${kenarYolu(m, m, m + W, m, k.ust, K)} ${kenarYolu(m + W, m, m + W, m + H, k.sag, K)} ${kenarYolu(m + W, m + H, m, m + H, k.alt, K)} ${kenarYolu(m, m + H, m, m, k.sol, K)} Z`;
};

const YapbozOyunu: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { seviye, basari, zorlandi } = useSeviye('yapboz', SEVIYELER.length - 1);
  const [adim, setAdim] = useState(0);
  const [resim, setResim] = useState<Resim>(() => resimSec(seviye, new Set()));
  const goruldu = useRef(new Set<string>());
  const [{ r, c }, setIzgara] = useState(SEVIYELER[seviye]);
  const toplam = r * c;
  const [yerlesen, setYerlesen] = useState<Set<number>>(new Set());
  const [tepsi, setTepsi] = useState<number[]>([]);
  const [secili, setSecili] = useState<number | null>(null);
  const [surukle, setSurukle] = useState<{ id: number; x: number; y: number } | null>(null);
  const [sallanan, setSallanan] = useState<number | null>(null);
  const [yanlis, setYanlis] = useState(0);
  const [kutlama, setKutlama] = useState(false);
  const [bitti, setBitti] = useState(false);
  const alan = useRef<HTMLDivElement>(null);
  const tahta = useRef<HTMLDivElement>(null);
  const [alanBoy, setAlanBoy] = useState({ w: 360, h: 600 });

  // her yapbozda çıkıntı yönleri rastgele
  const kenar = useMemo(() => {
    const yatay = Array.from({ length: r }, () => Array.from({ length: c }, () => (Math.random() < 0.5 ? 1 : -1)));
    const dikey = Array.from({ length: r }, () => Array.from({ length: c }, () => (Math.random() < 0.5 ? 1 : -1)));
    return (id: number): Kenarlar => {
      const rr = Math.floor(id / c), cc = id % c;
      return {
        ust: rr === 0 ? 0 : -yatay[rr - 1][cc], alt: rr === r - 1 ? 0 : yatay[rr][cc],
        sol: cc === 0 ? 0 : -dikey[rr][cc - 1], sag: cc === c - 1 ? 0 : dikey[rr][cc],
      };
    };
  }, [r, c, resim]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = alan.current; if (!el) return;
    const ol = () => { const { width, height } = el.getBoundingClientRect(); setAlanBoy({ w: width, h: height }); };
    ol(); const ro = new ResizeObserver(ol); ro.observe(el); return () => ro.disconnect();
  }, []);
  const boyut = Math.max(160, Math.min(alanBoy.w - 48, (alanBoy.h - 40) * 0.56, 460));

  // yeni yapboz
  useEffect(() => {
    const g = SEVIYELER[seviye]; setIzgara(g);
    setYerlesen(new Set()); setTepsi(karistir(Array.from({ length: g.r * g.c }, (_, i) => i))); setSecili(null); setYanlis(0);
    speak(g.r * g.c === 2 ? 'İki parçayı yerine koy.' : 'Parçaları yerine koy.');
  }, [adim]); // eslint-disable-line react-hooks/exhaustive-deps

  const W = boyut / c, H = boyut / r, M = Math.min(W, H) * 0.24;
  /** Taş görüntüsü: ölçek s ile (tepside küçük) */
  const tas = (id: number, s = 1, golge = true) => {
    const rr = Math.floor(id / c), cc = id % c;
    const w = W * s, h = H * s, m = M * s;
    const yol = tasYolu(w, h, m, kenar(id));
    return (
      <div style={{ width: w + 2 * m, height: h + 2 * m, filter: golge ? 'drop-shadow(0 3px 3px rgba(0,0,0,.35))' : undefined }}>
        <div style={{
          width: '100%', height: '100%', clipPath: `path('${yol}')`,
          backgroundImage: `url(${resim.url})`, backgroundSize: `${c * w}px ${r * h}px`,
          backgroundPosition: `${m - cc * w}px ${m - rr * h}px`, backgroundRepeat: 'no-repeat',
        }} />
      </div>
    );
  };

  const yerlestir = useCallback((id: number) => {
    setYerlesen((s) => {
      const y = new Set(s); y.add(id);
      if (y.size === toplam) setTimeout(() => { setKutlama(true); speak(`Aferin! ${buyukBas(resim.kelime)}.`); }, 250);
      return y;
    });
    setTepsi((t) => t.filter((x) => x !== id));
    setSecili(null);
  }, [toplam, resim]);

  const hata = (id: number) => { setSallanan(id); setTimeout(() => setSallanan(null), 700); setYanlis((n) => n + 1); };

  const hucre = (x: number, y: number): number | null => {
    const b = tahta.current?.getBoundingClientRect(); if (!b) return null;
    const pay = M; // kenara yakın bırakmayı da say
    if (x < b.left - pay || x > b.right + pay || y < b.top - pay || y > b.bottom + pay) return null;
    const cc = Math.max(0, Math.min(c - 1, Math.floor(((x - b.left) / b.width) * c)));
    const rr = Math.max(0, Math.min(r - 1, Math.floor(((y - b.top) / b.height) * r)));
    return rr * c + cc;
  };

  useEffect(() => {
    if (!surukle) return;
    const hareket = (e: PointerEvent) => setSurukle((s) => (s ? { ...s, x: e.clientX, y: e.clientY } : s));
    const birak = (e: PointerEvent) => {
      const h = hucre(e.clientX, e.clientY); const id = surukle.id;
      setSurukle(null);
      if (h === null) return;
      if (h === id) yerlestir(id); else hata(id);
    };
    window.addEventListener('pointermove', hareket);
    window.addEventListener('pointerup', birak, { once: true });
    return () => { window.removeEventListener('pointermove', hareket); window.removeEventListener('pointerup', birak); };
  }, [surukle?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const hucreyeDokun = (h: number) => {
    if (secili === null || yerlesen.has(h)) return;
    if (h === secili) yerlestir(secili); else hata(secili);
  };

  const sonraki = () => {
    setKutlama(false);
    const zor = yanlis >= 3;
    if (zor) zorlandi(); else basari();
    if (adim + 1 >= OTURUM) { setBitti(true); return; }
    goruldu.current.add(resim.url);
    setResim(resimSec(zor ? Math.max(0, seviye - 1) : seviye + 1, goruldu.current));
    setAdim((a) => a + 1);
  };
  const tekrar = () => { goruldu.current = new Set(); setResim(resimSec(seviye, new Set())); setAdim(0); setBitti(false); };

  // tepsi ölçeği: kalan alana sığsın (satırda en çok 4)
  const n = Math.max(tepsi.length, 1);
  const satirda = Math.min(n, toplam <= 4 ? toplam : Math.ceil(toplam / 2));
  const satir = Math.ceil(n / satirda);
  const tw = W + 2 * M, th = H + 2 * M;
  const tepsiOlcek = Math.min(0.85, (alanBoy.w - 24 - (satirda - 1) * 6) / (satirda * tw), (alanBoy.h - boyut - 60 - (satir - 1) * 6) / (satir * th));
  const ipucu = yanlis >= 2 ? (secili ?? surukle?.id ?? null) : null;

  return (
    <OyunCercevesi baslik="Yapboz" emoji="🧩" onBack={onBack} adim={adim + (bitti ? 1 : 0)} toplamAdim={OTURUM}
      yonerge={toplam === 2 ? 'İki parçayı yerine koy.' : 'Parçaları yerine koy.'}>
      <div ref={alan} className="absolute inset-0 flex flex-col items-center justify-start gap-3 pt-3 px-3 select-none touch-none">
        {/* tahta */}
        <div ref={tahta} className="relative shrink-0 rounded-2xl bg-white shadow-xl ring-8 ring-amber-200" style={{ width: boyut, height: boyut }}>
          <div className="absolute inset-0 rounded-2xl bg-center bg-cover opacity-20" style={{ backgroundImage: `url(${resim.url})` }} />
          {/* taşların kesik hatları (nereye ne gelecek) */}
          <svg className="absolute pointer-events-none overflow-visible" style={{ left: -M, top: -M, width: boyut + 2 * M, height: boyut + 2 * M }}>
            {Array.from({ length: toplam }, (_, id) => {
              const rr = Math.floor(id / c), cc = id % c;
              return <path key={id} d={tasYolu(W, H, M, kenar(id))} transform={`translate(${cc * W} ${rr * H})`}
                fill={ipucu === id ? 'rgba(252,211,77,.55)' : 'none'} stroke="#f59e0b" strokeWidth={2} strokeDasharray="6 5" opacity={yerlesen.has(id) ? 0 : 0.9} />;
            })}
          </svg>
          {/* dokunma hücreleri */}
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${c}, 1fr)`, gridTemplateRows: `repeat(${r}, 1fr)` }}>
            {Array.from({ length: toplam }, (_, h) => <div key={h} data-hucre={h} onClick={() => hucreyeDokun(h)} />)}
          </div>
          {/* yerleşen taşlar */}
          {[...yerlesen].map((id) => (
            <div key={id} className="absolute pointer-events-none" style={{ left: (id % c) * W - M, top: Math.floor(id / c) * H - M, animation: 'ok-yildiz .35s ease-out' }}>
              {tas(id, 1, yerlesen.size !== toplam)}
            </div>
          ))}
          {yerlesen.size === toplam && (
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-amber-400 text-white text-2xl font-black shadow-lg whitespace-nowrap">{buyukBas(resim.kelime)}</div>
          )}
        </div>

        {/* tepsi */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-4" style={{ maxWidth: alanBoy.w - 8 }}>
          {tepsi.map((id) => (
            <div key={id} data-parca={id}
              onPointerDown={(e) => { e.preventDefault(); setSecili(id); setSurukle({ id, x: e.clientX, y: e.clientY }); }}
              className={`cursor-grab rounded-xl ${secili === id ? 'bg-sky-200/70' : ''} ${sallanan === id ? 'ok-sallan' : ''} ${surukle?.id === id ? 'opacity-25' : ''}`}>
              {tas(id, tepsiOlcek)}
            </div>
          ))}
        </div>
      </div>

      {surukle && (
        <div className="fixed z-50 pointer-events-none" style={{ left: surukle.x - W / 2 - M, top: surukle.y - H / 2 - M, transform: 'scale(1.05)' }}>
          {tas(surukle.id)}
        </div>
      )}

      <Kutlama acik={kutlama} yazi="Aferin!" onBitti={sonraki} sure={2200} alt />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

export default YapbozOyunu;
