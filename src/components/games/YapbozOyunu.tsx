import React, { useCallback, useEffect, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { imageData } from '../../services/database/imageData.ts';
import { nesneUrl } from '../../services/nesneGorsel.ts';
import { speak } from '../../services/speechService.ts';

// Yapboz (yeniden, Kaan 2026-10-08): gerçek fotoğraflar, büyük tahta, soluk iz (nereye koyacağını görür),
// mıknatıslı oturma, sürükle ya da dokun-dokun; ceza yok. Seviye: 2 → 4 → 6 → 9 parça, başardıkça.
const SEVIYELER = [{ r: 1, c: 2 }, { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 3, c: 3 }];
const OTURUM = 5;
const KATEGORILER = new Set(['Hayvanlar', 'Taşıtlar', 'Meyveler', 'Oyuncaklar', 'Sebzeler', 'hayvanlar']);

interface Resim { url: string; kelime: string }
const HAVUZ: Resim[] = (() => {
  const gorulen = new Set<string>();
  const l: Resim[] = [];
  for (const i of imageData) {
    if (!KATEGORILER.has(i.tags?.category) || gorulen.has(i.word)) continue;
    const url = nesneUrl(i.imageUrl);
    if (!url || !url.endsWith('.webp')) continue;
    gorulen.add(i.word);
    l.push({ url, kelime: i.word });
  }
  return l;
})();
const karistir = <T,>(a: T[]): T[] => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const buyukBas = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

const YapbozOyunu: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { seviye, basari, zorlandi } = useSeviye('yapboz', SEVIYELER.length - 1);
  const [sira, setSira] = useState<Resim[]>(() => karistir(HAVUZ).slice(0, OTURUM));
  const [adim, setAdim] = useState(0);
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
  const [boyut, setBoyut] = useState(300);
  const [alanBoy, setAlanBoy] = useState({ w: 360, h: 600 });

  const resim = sira[adim];

  // tahta boyutu: ekrana sığan en büyük kare
  useEffect(() => {
    const el = alan.current; if (!el) return;
    const ol = () => { const { width, height } = el.getBoundingClientRect(); setAlanBoy({ w: width, h: height }); setBoyut(Math.max(160, Math.min(width - 24, (height - 40) * 0.56, 460))); };
    ol(); const ro = new ResizeObserver(ol); ro.observe(el); return () => ro.disconnect();
  }, []);

  // yeni yapboz
  useEffect(() => {
    if (!resim) return;
    const g = SEVIYELER[seviye]; setIzgara(g);
    setYerlesen(new Set()); setTepsi(karistir(Array.from({ length: g.r * g.c }, (_, i) => i))); setSecili(null); setYanlis(0);
    speak(g.r * g.c === 2 ? 'İki parçayı yerine koy.' : 'Parçaları yerine koy.');
  }, [adim, resim]); // eslint-disable-line react-hooks/exhaustive-deps

  const parcaStil = (id: number, w: number, h: number): React.CSSProperties => {
    const rr = Math.floor(id / c), cc = id % c;
    return {
      width: w, height: h, backgroundImage: `url(${resim?.url})`,
      backgroundSize: `${c * 100}% ${r * 100}%`,
      backgroundPosition: `${c > 1 ? (cc / (c - 1)) * 100 : 50}% ${r > 1 ? (rr / (r - 1)) * 100 : 50}%`,
    };
  };

  const yerlestir = useCallback((id: number) => {
    setYerlesen((s) => {
      const y = new Set(s); y.add(id);
      if (y.size === toplam) {
        setTimeout(() => { setKutlama(true); speak(`Aferin! ${buyukBas(resim.kelime)}.`); }, 250);
      }
      return y;
    });
    setTepsi((t) => t.filter((x) => x !== id));
    setSecili(null);
  }, [toplam, resim]);

  const hata = (id: number) => {
    setSallanan(id); setTimeout(() => setSallanan(null), 700);
    setYanlis((n) => n + 1);
  };

  // tahtadaki hangi hücre (x,y ekran koordinatı)
  const hucre = (x: number, y: number): number | null => {
    const b = tahta.current?.getBoundingClientRect(); if (!b) return null;
    if (x < b.left || x > b.right || y < b.top || y > b.bottom) return null;
    const cc = Math.min(c - 1, Math.floor(((x - b.left) / b.width) * c));
    const rr = Math.min(r - 1, Math.floor(((y - b.top) / b.height) * r));
    return rr * c + cc;
  };

  // sürükleme
  useEffect(() => {
    if (!surukle) return;
    const hareket = (e: PointerEvent) => setSurukle((s) => (s ? { ...s, x: e.clientX, y: e.clientY } : s));
    const birak = (e: PointerEvent) => {
      const h = hucre(e.clientX, e.clientY);
      const id = surukle.id;
      setSurukle(null);
      if (h === null) return; // tepsiye geri döner
      if (h === id) yerlestir(id);
      else hata(id);
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
    if (yanlis >= 3) zorlandi(); else basari();
    if (adim + 1 >= OTURUM) setBitti(true); else setAdim((a) => a + 1);
  };

  const tekrar = () => { setSira(karistir(HAVUZ).slice(0, OTURUM)); setAdim(0); setBitti(false); };

  const hucreBoy = { w: boyut / c, h: boyut / r };
  // tepsi: parçalar tahtanın altındaki boş alana sığsın (satırda en çok 4)
  const satirda = Math.min(Math.max(tepsi.length, 1), toplam <= 4 ? toplam : Math.ceil(toplam / 2));
  const satir = Math.ceil(Math.max(tepsi.length, 1) / satirda);
  const tepsiOlcek = Math.min(0.9,
    (alanBoy.w - 24 - (satirda - 1) * 12) / (satirda * hucreBoy.w),
    (alanBoy.h - boyut - 70 - (satir - 1) * 12) / (satir * hucreBoy.h));
  const ipucu = yanlis >= 2 ? (secili ?? surukle?.id ?? null) : null; // iki yanlıştan sonra doğru yer parlar

  if (!resim) return null;
  return (
    <OyunCercevesi baslik="Yapboz" emoji="🧩" onBack={onBack} adim={adim + (bitti ? 1 : 0)} toplamAdim={OTURUM}
      yonerge={toplam === 2 ? 'İki parçayı yerine koy.' : 'Parçaları yerine koy.'}>
      <div ref={alan} className="absolute inset-0 flex flex-col items-center justify-start gap-4 pt-2 px-3 select-none touch-none">
        {/* tahta */}
        <div ref={tahta} className="relative shrink-0 rounded-3xl bg-white shadow-xl ring-8 ring-amber-200" style={{ width: boyut, height: boyut }}>
          <div className="absolute inset-0 rounded-3xl bg-center bg-cover opacity-20" style={{ backgroundImage: `url(${resim.url})` }} />
          <div className="absolute inset-0 grid" style={{ gridTemplateColumns: `repeat(${c}, 1fr)`, gridTemplateRows: `repeat(${r}, 1fr)` }}>
            {Array.from({ length: toplam }, (_, h) => (
              <div key={h} data-hucre={h} onClick={() => hucreyeDokun(h)}
                className={`relative border-2 border-dashed ${yerlesen.has(h) ? 'border-transparent' : 'border-amber-300'} ${ipucu === h ? 'bg-amber-200/60 animate-pulse' : ''}`}>
                {yerlesen.has(h) && <div className="absolute inset-0 shadow-inner" style={{ ...parcaStil(h, hucreBoy.w, hucreBoy.h), width: '100%', height: '100%', animation: 'ok-yildiz .35s ease-out' }} />}
              </div>
            ))}
          </div>
          {yerlesen.size === toplam && (
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-amber-400 text-white text-2xl font-black shadow-lg">{buyukBas(resim.kelime)}</div>
          )}
        </div>

        {/* tepsi */}
        <div className="flex flex-wrap justify-center gap-3 mt-3" style={{ maxWidth: alanBoy.w - 16 }}>
          {tepsi.map((id) => (
            <div key={id} data-parca={id}
              onPointerDown={(e) => { e.preventDefault(); setSecili(id); setSurukle({ id, x: e.clientX, y: e.clientY }); }}
              className={`rounded-xl shadow-lg cursor-grab ring-4 ${secili === id ? 'ring-sky-400' : 'ring-white'} ${sallanan === id ? 'ok-sallan' : ''} ${surukle?.id === id ? 'opacity-30' : ''}`}
              style={parcaStil(id, hucreBoy.w * tepsiOlcek, hucreBoy.h * tepsiOlcek)} />
          ))}
        </div>
      </div>

      {/* sürüklenen parça parmağın altında */}
      {surukle && (
        <div className="fixed z-50 pointer-events-none rounded-xl shadow-2xl ring-4 ring-sky-400"
          style={{ ...parcaStil(surukle.id, hucreBoy.w, hucreBoy.h), left: surukle.x - hucreBoy.w / 2, top: surukle.y - hucreBoy.h / 2 }} />
      )}

      <Kutlama acik={kutlama} yazi="Aferin!" onBitti={sonraki} sure={2200} alt />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

export default YapbozOyunu;
