import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { speak, playEffect } from '../../services/speechService.ts';

// Oda Temizliği (yeniden, Kaan 2026-10-08: "oda çok kötü şu an"): gerçek fotoğraflı eşyalar ve kutular.
// Eşyayı doğru kutuya taşı (ya da eşyaya, sonra kutuya dokun). Ceza yok; iki yanlıştan sonra doğru kutu parlar.
// Seviye: 2 kutu / 4 eşya → 3 kutu / 6 eşya → 4 kutu / 8 eşya.
interface Kap { id: string; ad: string; url: string; esyalar: [string, string][] }
const KAPLAR: Kap[] = [
  { id: 'oyuncak', ad: 'Oyuncak kutusu', url: '/images/2615.webp', esyalar: [['top', '/images/2317.webp'], ['oyuncak araba', '/images/9047.webp'], ['oyuncak ayı', '/images/5703.webp'], ['lego', '/images/9069.webp'], ['yapboz', '/images/8480.webp'], ['uçurtma', '/images/8135.webp'], ['oyuncak bebek', '/images/8109.webp']] },
  { id: 'kiyafet', ad: 'Çamaşır sepeti', url: '/images/6328.webp', esyalar: [['çorap', '/images/6958.webp'], ['tişört', '/images/3420.webp'], ['pantolon', '/images/4713.webp'], ['elbise', '/images/4701.webp'], ['mont', '/images/9062.webp']] },
  { id: 'kitap', ad: 'Kitaplık', url: '/images/6327.webp', esyalar: [['kitap', '/images/3416.webp'], ['defter', '/images/8882.webp']] },
  { id: 'cop', ad: 'Çöp kutusu', url: '/images/6326.webp', esyalar: [['konserve kutusu', '/images/8685.webp'], ['çöp poşeti', '/images/4809.webp'], ['peçete', '/images/9089.webp']] },
];
const SEVIYELER = [{ kap: 2, esya: 4 }, { kap: 3, esya: 6 }, { kap: 4, esya: 8 }];
const OTURUM = 3;
const karistir = <T,>(a: T[]): T[] => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

interface Esya { i: number; ad: string; url: string; kap: string; x: number; y: number; a: number }

const OdaToplamaOyunu: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { seviye, basari, zorlandi } = useSeviye('odatoplama', SEVIYELER.length - 1);
  const [adim, setAdim] = useState(0);
  const [tur, setTur] = useState(0);
  const { kaplar, esyalar } = useMemo(() => {
    const ay = SEVIYELER[seviye];
    const k = KAPLAR.slice(0, ay.kap);
    // her kaptan en az bir eşya, kalan rastgele
    const havuz = k.flatMap((kp) => karistir(kp.esyalar).map(([ad, url]) => ({ ad, url, kap: kp.id })));
    const secilen = [...k.map((kp) => havuz.find((h) => h.kap === kp.id)!)];
    for (const h of karistir(havuz)) { if (secilen.length >= ay.esya) break; if (!secilen.includes(h)) secilen.push(h); }
    // yerdeki dağınık konumlar (ızgara + sapma; üst üste binmesin)
    const sut = ay.esya <= 4 ? 2 : ay.esya <= 6 ? 3 : 4;
    const e: Esya[] = karistir(secilen).map((h, i) => ({
      ...h, i, x: ((i % sut) + 0.5) / sut * 100 + (Math.random() - 0.5) * 8, y: (Math.floor(i / sut) + 0.5) / Math.ceil(ay.esya / sut) * 100 + (Math.random() - 0.5) * 8, a: (Math.random() - 0.5) * 24,
    }));
    return { kaplar: karistir(k), esyalar: e };
  }, [tur]); // eslint-disable-line react-hooks/exhaustive-deps
  const [kaldirilan, setKaldirilan] = useState<Set<number>>(new Set());
  const [secili, setSecili] = useState<number | null>(null);
  const [surukle, setSurukle] = useState<{ i: number; x: number; y: number } | null>(null);
  const [sallanan, setSallanan] = useState<number | null>(null);
  const [ziplayan, setZiplayan] = useState<string | null>(null);
  const [yanlis, setYanlis] = useState(0);
  const [kutlama, setKutlama] = useState(false);
  const [bitti, setBitti] = useState(false);
  const kapRef = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => { setKaldirilan(new Set()); setYanlis(0); setSecili(null); speak('Eşyaları yerine kaldır.'); }, [tur]);

  const birak = (i: number, kapId: string) => {
    const e = esyalar[i];
    if (e.kap === kapId) {
      setKaldirilan((s) => {
        const y = new Set(s).add(i);
        if (y.size === esyalar.length) setTimeout(() => { setKutlama(true); speak('Aferin! Oda tertemiz oldu.'); }, 300);
        return y;
      });
      setZiplayan(kapId); setTimeout(() => setZiplayan(null), 500);
      playEffect('correct', { volume: 0.5 }); setSecili(null);
    } else {
      setSallanan(i); setTimeout(() => setSallanan(null), 700); setYanlis((n) => n + 1);
    }
  };

  const kapBul = (x: number, y: number) => Object.entries(kapRef.current).find(([, el]) => {
    if (!el) return false; const b = el.getBoundingClientRect();
    return x >= b.left - 10 && x <= b.right + 10 && y >= b.top - 20 && y <= b.bottom + 10;
  })?.[0];

  useEffect(() => {
    if (!surukle) return;
    const hareket = (e: PointerEvent) => setSurukle((s) => (s ? { ...s, x: e.clientX, y: e.clientY } : s));
    const son = (e: PointerEvent) => { const k = kapBul(e.clientX, e.clientY); const i = surukle.i; setSurukle(null); if (k) birak(i, k); };
    window.addEventListener('pointermove', hareket); window.addEventListener('pointerup', son, { once: true });
    return () => { window.removeEventListener('pointermove', hareket); window.removeEventListener('pointerup', son); };
  }, [surukle?.i]); // eslint-disable-line react-hooks/exhaustive-deps

  const sonraki = () => {
    setKutlama(false);
    if (yanlis >= 3) zorlandi(); else basari();
    if (adim + 1 >= OTURUM) { setBitti(true); return; }
    setAdim((a) => a + 1); setTur((t) => t + 1);
  };
  const tekrar = () => { setAdim(0); setTur((t) => t + 1); setBitti(false); };

  const aktif = secili ?? surukle?.i ?? null;
  const ipucuKap = yanlis >= 2 && aktif !== null ? esyalar[aktif]?.kap : null;
  const esyaBoy = esyalar.length <= 4 ? 112 : esyalar.length <= 6 ? 96 : 82;

  return (
    <OyunCercevesi baslik="Oda Temizliği" emoji="🧹" onBack={onBack} adim={adim + (bitti ? 1 : 0)} toplamAdim={OTURUM} yonerge="Eşyaları yerine kaldır.">
      <div className="absolute inset-0 flex flex-col px-3 pb-3 gap-3 select-none touch-none">
        {/* dağınık oda */}
        <div className="relative flex-1 rounded-3xl overflow-hidden shadow-inner bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.55), rgba(255,255,255,.55)), url(/images/8867.webp)' }}>
          {esyalar.map((e) => !kaldirilan.has(e.i) && (
            <button key={e.i} data-esya={e.i}
              onPointerDown={(ev) => { ev.preventDefault(); setSecili(e.i); setSurukle({ i: e.i, x: ev.clientX, y: ev.clientY }); speak(e.ad.charAt(0).toLocaleUpperCase('tr-TR') + e.ad.slice(1)); }}
              className={`absolute rounded-2xl bg-white p-1 shadow-lg ring-4 ${secili === e.i ? 'ring-sky-400' : 'ring-white'} ${sallanan === e.i ? 'ok-sallan' : ''} ${surukle?.i === e.i ? 'opacity-25' : ''}`}
              style={{ left: `calc(${e.x}% - ${esyaBoy / 2}px)`, top: `calc(${e.y}% - ${esyaBoy / 2}px)`, width: esyaBoy, height: esyaBoy, transform: `rotate(${e.a}deg)` }}>
              <img src={e.url} alt={e.ad} draggable={false} className="w-full h-full object-cover rounded-xl" />
            </button>
          ))}
        </div>
        {/* kutular */}
        <div className="grid gap-2 shrink-0" style={{ gridTemplateColumns: `repeat(${kaplar.length}, 1fr)` }}>
          {kaplar.map((k) => (
            <div key={k.id} data-kap={k.id} ref={(el) => { kapRef.current[k.id] = el; }}
              onClick={() => secili !== null && birak(secili, k.id)}
              className={`flex flex-col items-center rounded-2xl bg-white p-1.5 shadow-md ring-4 transition ${ipucuKap === k.id ? 'ring-amber-400 animate-pulse' : 'ring-transparent'}`}
              style={ziplayan === k.id ? { animation: 'ok-yildiz .45s ease-out' } : undefined}>
              <img src={k.url} alt={k.ad} draggable={false} className="w-full aspect-square object-cover rounded-xl" />
              <span className="text-xs sm:text-sm font-black text-slate-700 text-center leading-tight mt-1">{k.ad}</span>
            </div>
          ))}
        </div>
      </div>

      {surukle && (
        <div className="fixed z-50 pointer-events-none rounded-2xl bg-white p-1 shadow-2xl ring-4 ring-sky-400" style={{ left: surukle.x - esyaBoy / 2, top: surukle.y - esyaBoy / 2, width: esyaBoy, height: esyaBoy }}>
          <img src={esyalar[surukle.i].url} alt="" className="w-full h-full object-cover rounded-xl" />
        </div>
      )}
      <Kutlama acik={kutlama} yazi="Tertemiz!" onBitti={sonraki} sure={2000} />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

export default OdaToplamaOyunu;
