import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { NesneCizimi } from './KutuIcDis.tsx';

// Nesneleri Taşı → "Tabağa iki kurabiye koy" (Kaan, 2026-10-15: "oranın da güzelleşmesi lazım").
// Çizimli tabak / tepsi / sepet (yukarıdan görünüş) ve nesneler; çocuk istenen sayıda nesneyi sürükleyip koyar.
// Her koyuşta sayı söylenir ("Bir. İki."); istenen sayıya varınca kutlama. Fazla nesne rafta durur, yanlış sayılmaz.

const W = 360, H = 360, OBJ = 52;
const px = (v: number) => `${(v / W) * 100}%`;
const py = (v: number) => `${(v / H) * 100}%`;

const KAPLAR = [
  { id: 'tabak', yon: 'Tabağa' },
  { id: 'tepsi', yon: 'Tepsiye' },
  { id: 'sepet', yon: 'Sepete' },
] as const;
type KapId = typeof KAPLAR[number]['id'];
const NESNELER = [
  { id: 'kurabiye', ad: 'kurabiye' },
  { id: 'elma', ad: 'elma' },
  { id: 'top', ad: 'top' },
  { id: 'yildiz', ad: 'yıldız' },
] as const;
type NesId = typeof NESNELER[number]['id'];
const SAYI = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı'];
const buyuk = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);
const TUR_SAYILARI = [1, 2, 3, 2, 4, 3, 5, 6];

const KAP_MERKEZ = { x: 180, y: 270 };
const KAP_BOLGE = { x0: 52, x1: 308, y0: 200, y1: 345 };
const YUVALAR = [[-62, -16], [0, -16], [62, -16], [-62, 24], [0, 24], [62, 24]] as const;

const Kurabiye: React.FC = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs><radialGradient id="kb-g" cx="40%" cy="35%" r="75%"><stop offset="0" stopColor="#f3c98b" /><stop offset="1" stopColor="#cf9448" /></radialGradient></defs>
    <circle cx="50" cy="50" r="42" fill="url(#kb-g)" stroke="#a46d28" strokeWidth="3" />
    {[[34, 36], [62, 32], [46, 58], [68, 60], [30, 64], [54, 44]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="6" ry="5" fill="#5a3416" />)}
  </svg>
);
const Cizim: React.FC<{ id: NesId }> = ({ id }) => (id === 'kurabiye' ? <Kurabiye /> : <NesneCizimi tur={id === 'top' ? 'top' : id === 'elma' ? 'elma' : 'yildiz'} />);

const Kap: React.FC<{ id: KapId }> = ({ id }) => (
  <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" aria-hidden>
    <defs>
      <linearGradient id="kap-zemin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff7e6" /><stop offset="1" stopColor="#ffe9bd" /></linearGradient>
    </defs>
    {/* raf zemini */}
    <rect x="16" y="26" width="328" height="150" rx="22" fill="url(#kap-zemin)" stroke="#f1d49a" strokeWidth="3" />
    {/* gölge */}
    <ellipse cx={KAP_MERKEZ.x} cy={KAP_MERKEZ.y + 22} rx="128" ry="34" fill="#000" opacity=".13" />
    {id === 'tabak' && (<>
      <ellipse cx={KAP_MERKEZ.x} cy={KAP_MERKEZ.y} rx="126" ry="62" fill="#fff" stroke="#c2d3e6" strokeWidth="4" />
      <ellipse cx={KAP_MERKEZ.x} cy={KAP_MERKEZ.y} rx="96" ry="44" fill="#eef4fb" stroke="#d3e0ee" strokeWidth="3" />
    </>)}
    {id === 'tepsi' && (<>
      <rect x={KAP_MERKEZ.x - 126} y={KAP_MERKEZ.y - 62} width="252" height="124" rx="22" fill="#c9d3dd" stroke="#8fa0b3" strokeWidth="4" />
      <rect x={KAP_MERKEZ.x - 108} y={KAP_MERKEZ.y - 46} width="216" height="92" rx="14" fill="#e6edf4" stroke="#aebdcc" strokeWidth="3" />
    </>)}
    {id === 'sepet' && (<>
      <ellipse cx={KAP_MERKEZ.x} cy={KAP_MERKEZ.y} rx="128" ry="64" fill="#b87a3d" stroke="#7d4f22" strokeWidth="4" />
      <ellipse cx={KAP_MERKEZ.x} cy={KAP_MERKEZ.y} rx="100" ry="46" fill="#d9a666" stroke="#9a6a30" strokeWidth="3" />
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M${KAP_MERKEZ.x - 90 + i * 30} ${KAP_MERKEZ.y - 38} Q${KAP_MERKEZ.x - 80 + i * 30} ${KAP_MERKEZ.y} ${KAP_MERKEZ.x - 90 + i * 30} ${KAP_MERKEZ.y + 38}`} stroke="#b07a3a" strokeWidth="3" fill="none" opacity=".6" />)}
    </>)}
  </svg>
);

interface Props { currentCard: number; totalCards: number; onAdvance: (correct: boolean) => void; onBack: () => void; }

const TabagaKoy: React.FC<Props> = ({ currentCard, totalCards, onAdvance, onBack }) => {
  const kapRef = useRef<HTMLDivElement>(null);
  const sahneRef = useRef<HTMLDivElement>(null);
  const [boy, setBoy] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const k = kapRef.current; if (!k) return;
    const olc = () => { const w = Math.max(0, Math.min(k.clientWidth, k.clientHeight * (W / H))); setBoy({ w, h: w * (H / W) }); };
    olc(); const ro = new ResizeObserver(olc); ro.observe(k); return () => ro.disconnect();
  }, []);

  const { kap, nes, n } = useMemo(() => ({
    kap: KAPLAR[Math.floor(Math.random() * KAPLAR.length)],
    nes: NESNELER[Math.floor(Math.random() * NESNELER.length)],
    n: TUR_SAYILARI[(currentCard - 1) % TUR_SAYILARI.length],
  }), [currentCard]);
  const yonerge = `${kap.yon} ${SAYI[n]} ${nes.ad} koy.`;

  // Raftaki nesneler: n + 2 (en çok 8), iki sıra
  const adet = Math.min(8, n + 2);
  const baslangic = useMemo(() => Array.from({ length: adet }, (_, i) => {
    const sira = i < 4 ? 0 : 1; const sut = i % 4; const toplam = sira === 0 ? Math.min(4, adet) : adet - 4;
    return { x: 180 + (sut - (toplam - 1) / 2) * 74, y: 74 + sira * 70 };
  }), [adet]);

  const [ofset, setOfset] = useState<{ x: number; y: number }[]>(() => Array.from({ length: adet }, () => ({ x: 0, y: 0 })));
  const [yuva, setYuva] = useState<(number | null)[]>(() => Array.from({ length: adet }, () => null));
  const [suruk, setSuruk] = useState<number | null>(null);
  const [gecis, setGecis] = useState<number | null>(null);
  const [kutlama, setKutlama] = useState(false);
  const [hata, setHata] = useState(0);
  const tut = useRef<{ i: number; sx: number; sy: number } | null>(null);
  const yerlesen = yuva.filter((v) => v !== null).length;

  useEffect(() => { const z = setTimeout(() => speak(yonerge), 350); return () => clearTimeout(z); }, [yonerge]);
  useEffect(() => { if (gecis === null) return; const z = setTimeout(() => setGecis(null), 450); return () => clearTimeout(z); }, [gecis]);

  const birim = () => (boy.w || 1) / W;

  const baslat = (i: number) => (e: React.PointerEvent) => {
    if (yuva[i] !== null || kutlama) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    tut.current = { i, sx: e.clientX - ofset[i].x, sy: e.clientY - ofset[i].y };
    setGecis(null); setSuruk(i);
  };
  const tasi = (e: React.PointerEvent) => {
    const t = tut.current; if (!t) return;
    setOfset((o) => o.map((v, k) => (k === t.i ? { x: e.clientX - t.sx, y: e.clientY - t.sy } : v)));
  };
  const birak = () => {
    const t = tut.current; if (!t) return;
    tut.current = null; setSuruk(null);
    const i = t.i; const u = birim();
    const cx = baslangic[i].x + ofset[i].x / u, cy = baslangic[i].y + ofset[i].y / u;
    const icinde = cx > KAP_BOLGE.x0 && cx < KAP_BOLGE.x1 && cy > KAP_BOLGE.y0 && cy < KAP_BOLGE.y1;
    const oynadi = Math.abs(ofset[i].x) > 6 || Math.abs(ofset[i].y) > 6;
    if (icinde && yerlesen < n) {
      const bos = YUVALAR.findIndex((_, s) => !yuva.includes(s));
      const [dx, dy] = YUVALAR[bos];
      setGecis(i);
      setOfset((o) => o.map((v, k) => (k === i ? { x: (KAP_MERKEZ.x + dx - baslangic[i].x) * u, y: (KAP_MERKEZ.y + dy - baslangic[i].y) * u } : v)));
      setYuva((y) => y.map((v, k) => (k === i ? bos : v)));
      const say = yerlesen + 1;
      speak(buyuk(SAYI[say]));
      if (say >= n) setTimeout(() => { setKutlama(true); speak(`Aferin! ${buyuk(SAYI[n])} ${nes.ad}.`); }, 900);
    } else {
      setGecis(i);
      setOfset((o) => o.map((v, k) => (k === i ? { x: 0, y: 0 } : v)));
      if (oynadi && !icinde) setHata((h) => h + 1);
    }
  };

  return (
    <OyunCercevesi baslik="Nesneleri Taşı" emoji="🧺" onBack={onBack} adim={currentCard} toplamAdim={totalCards} yonerge={yonerge}>
      <div ref={kapRef} className="absolute inset-0 flex items-center justify-center">
        <div ref={sahneRef} className="relative" style={{ width: boy.w, height: boy.h }}>
          <Kap id={kap.id} />
          {/* sayaç */}
          <div className="absolute z-10 flex items-center justify-center rounded-full bg-white shadow-md font-black text-emerald-600"
            style={{ left: px(W - 70), top: py(14), width: px(52), height: px(52), fontSize: boy.w * 0.085 }}>
            {yerlesen}/{n}
          </div>
          {baslangic.map((b, i) => (
            <div
              key={i}
              onPointerDown={baslat(i)} onPointerMove={tasi} onPointerUp={birak} onPointerCancel={birak}
              className="absolute select-none cursor-grab"
              style={{
                left: px(b.x - OBJ / 2), top: py(b.y - OBJ / 2), width: px(OBJ), aspectRatio: '1 / 1',
                transform: `translate(${ofset[i].x}px, ${ofset[i].y}px) scale(${suruk === i ? 1.15 : 1})`,
                transition: gecis === i ? 'transform .4s cubic-bezier(.3,1.3,.5,1)' : 'none',
                zIndex: suruk === i ? 30 : yuva[i] !== null ? 12 : 11, touchAction: 'none',
                pointerEvents: yuva[i] !== null || kutlama ? 'none' : 'auto',
                filter: suruk === i ? 'drop-shadow(0 8px 6px rgba(0,0,0,.25))' : 'drop-shadow(0 3px 2px rgba(0,0,0,.2))',
              }}
              role="button" aria-label={nes.ad}
            >
              <Cizim id={nes.id} />
            </div>
          ))}
          {hata >= 3 && !kutlama && (
            <div className="absolute rounded-full border-4 border-dashed border-emerald-500 animate-pulse pointer-events-none"
              style={{ left: px(KAP_MERKEZ.x - 130), top: py(KAP_MERKEZ.y - 66), width: px(260), height: py(132) }} />
          )}
        </div>
      </div>
      <Kutlama acik={kutlama} alt onBitti={() => onAdvance(hata === 0)} sure={1500} />
    </OyunCercevesi>
  );
};

export default TabagaKoy;
