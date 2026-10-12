import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { NESNELER, NesneCizimi } from './KutuIcDis.tsx';

// Nesneyi Yerleştir (Kaan, 2026-10-13: "kutunun içinde/Nesneyi yerleştir etkinliğini daha profesyonel baştan"):
// Fotoğraf ve ızgara yok. Çizimli bir masa; çocuk nesneyi sürükleyip söylenen yere koyar:
// masanın ÜSTÜNE / ALTINA / SOLUNA / SAĞINA. Puan, süre, can yok; yanlışta nesne yerine döner, 2 yanlıştan sonra ipucu.

type Yer = 'ustune' | 'altina' | 'soluna' | 'sagina';
const YERLER: { id: Yer; yon: string; durum: string }[] = [
  { id: 'ustune', yon: 'üstüne', durum: 'üstünde' },
  { id: 'altina', yon: 'altına', durum: 'altında' },
  { id: 'soluna', yon: 'soluna', durum: 'solunda' },
  { id: 'sagina', yon: 'sağına', durum: 'sağında' },
];

const W = 360, H = 300, Y0 = 112;
const MX = 180;                         // masanın orta çizgisi
const OBJ = 80;
const BASLA = { x: MX, y: 368 };        // yerdeki başlangıç noktası (masanın önü)
// bırakma bölgeleri (viewBox koordinatı) ve nesnenin oturacağı noktalar
const BOLGE: Record<Yer, { x0: number; x1: number; y0: number; y1: number; hedef: { x: number; y: number } }> = {
  ustune: { x0: 80, x1: 280, y0: 130, y1: 264, hedef: { x: MX, y: 214 } },
  altina: { x0: 118, x1: 244, y0: 282, y1: 352, hedef: { x: MX, y: 318 } },
  soluna: { x0: 0, x1: 76, y0: 150, y1: 412, hedef: { x: 38, y: 332 } },
  sagina: { x0: 284, x1: 360, y0: 150, y1: 412, hedef: { x: 322, y: 332 } },
};
const px = (v: number) => `${(v / W) * 100}%`;
const py = (v: number) => `${((v - Y0) / H) * 100}%`;

const Masa: React.FC<{ ipucu?: Yer | null }> = ({ ipucu }) => (
  <svg viewBox={`0 ${Y0} ${W} ${H}`} className="absolute inset-0 w-full h-full" aria-hidden>
    <defs>
      <linearGradient id="ms-ust" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fbe0b0" /><stop offset="1" stopColor="#f0c585" /></linearGradient>
      <linearGradient id="ms-on" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9a05b" /><stop offset="1" stopColor="#bf8441" /></linearGradient>
      <linearGradient id="ms-bacak" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c58a45" /><stop offset="1" stopColor="#a56e2e" /></linearGradient>
      <linearGradient id="ms-zemin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#cfe8c9" /><stop offset="1" stopColor="#9fd3a7" /></linearGradient>
    </defs>
    <ellipse cx={W / 2} cy="372" rx="215" ry="42" fill="url(#ms-zemin)" opacity=".9" />
    <ellipse cx={MX} cy="352" rx="112" ry="12" fill="#000" opacity=".15" />
    {/* bacaklar */}
    <rect x="104" y="278" width="16" height="74" rx="3" fill="url(#ms-bacak)" stroke="#8b5a25" strokeWidth="2" />
    <rect x="240" y="278" width="16" height="74" rx="3" fill="url(#ms-bacak)" stroke="#8b5a25" strokeWidth="2" />
    {/* üst yüzey ve ön kenar */}
    <path d="M84 262 L276 262 L264 242 L96 242Z" fill="url(#ms-ust)" stroke="#a06a2c" strokeWidth="2" strokeLinejoin="round" />
    <rect x="84" y="262" width="192" height="18" rx="3" fill="url(#ms-on)" stroke="#8b5a25" strokeWidth="2" />
    {/* ipucu: hedef bölgeyi çerçeveler */}
    {ipucu && (
      <rect x={BOLGE[ipucu].x0 + 4} y={Math.max(BOLGE[ipucu].y0, 150)} width={BOLGE[ipucu].x1 - BOLGE[ipucu].x0 - 8} height={Math.min(BOLGE[ipucu].y1, 396) - Math.max(BOLGE[ipucu].y0, 150)} rx="14"
        fill="rgba(34,197,94,.12)" stroke="#22c55e" strokeWidth="5" strokeDasharray="10 8" className="animate-pulse" />
    )}
  </svg>
);

interface Props { currentCard: number; totalCards: number; onAdvance: (correct: boolean) => void; onBack: () => void; }

const NesneYerlestir: React.FC<Props> = ({ currentCard, totalCards, onAdvance, onBack }) => {
  const kapRef = useRef<HTMLDivElement>(null);
  const sahneRef = useRef<HTMLDivElement>(null);
  const nesneRef = useRef<HTMLDivElement>(null);
  const tut = useRef<{ sx: number; sy: number } | null>(null);
  const [boy, setBoy] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const k = kapRef.current; if (!k) return;
    const olc = () => { const w = Math.max(0, Math.min(k.clientWidth, k.clientHeight * (W / H))); setBoy({ w, h: w * (H / W) }); };
    olc(); const ro = new ResizeObserver(olc); ro.observe(k); return () => ro.disconnect();
  }, []);

  // Tur: ilk turlar kolay (üstüne), sonra karışık
  const { nesne, yer } = useMemo(() => {
    const n = NESNELER[Math.floor(Math.random() * NESNELER.length)];
    const havuz: Yer[] = currentCard <= 1 ? ['ustune'] : currentCard <= 2 ? ['ustune', 'altina'] : ['ustune', 'altina', 'soluna', 'sagina'];
    const secilen = havuz[Math.floor(Math.random() * havuz.length)];
    return { nesne: n, yer: YERLER.find((y) => y.id === secilen)! };
  }, [currentCard]);
  const yonerge = `${nesne.belirtme} masanın ${yer.yon} koy.`;

  const [ofset, setOfset] = useState({ x: 0, y: 0 });
  const [surukleniyor, setSurukleniyor] = useState(false);
  const [gecis, setGecis] = useState(false);
  const [bitti, setBitti] = useState(false);
  const [hata, setHata] = useState(0);
  const [kutlama, setKutlama] = useState(false);

  useEffect(() => { const z = setTimeout(() => speak(yonerge), 350); return () => clearTimeout(z); }, [yonerge]);
  useEffect(() => { if (!gecis) return; const z = setTimeout(() => setGecis(false), 450); return () => clearTimeout(z); }, [gecis]);

  const birim = () => (boy.w || 1) / W; // 1 viewBox birimi kaç piksel

  const nerede = (): Yer | null => {
    const s = sahneRef.current, o = nesneRef.current;
    if (!s || !o) return null;
    const sr = s.getBoundingClientRect(), r = o.getBoundingClientRect();
    const vx = ((r.left + r.width / 2 - sr.left) / sr.width) * W;
    const vy = Y0 + ((r.top + r.height / 2 - sr.top) / sr.height) * H;
    // üst yüzey ve altı çakışmasın diye önce daha dar bölgeler
    for (const id of ['altina', 'soluna', 'sagina', 'ustune'] as Yer[]) {
      const b = BOLGE[id];
      if (vx >= b.x0 && vx <= b.x1 && vy >= b.y0 && vy <= b.y1) return id;
    }
    return null;
  };

  const baslat = (e: React.PointerEvent) => {
    if (bitti) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    tut.current = { sx: e.clientX - ofset.x, sy: e.clientY - ofset.y };
    setGecis(false); setSurukleniyor(true);
  };
  const tasi = (e: React.PointerEvent) => { if (tut.current) setOfset({ x: e.clientX - tut.current.sx, y: e.clientY - tut.current.sy }); };
  const birak = () => {
    if (!tut.current) return;
    tut.current = null; setSurukleniyor(false);
    const hangi = nerede();
    const oynadi = Math.abs(ofset.x) > 6 || Math.abs(ofset.y) > 6;
    if (hangi === yer.id) {
      // hedef noktaya otur
      const b = BOLGE[yer.id].hedef; const u = birim();
      setGecis(true); setBitti(true);
      setOfset({ x: (b.x - BASLA.x) * u, y: (b.y - BASLA.y) * u });
      setTimeout(() => { setKutlama(true); speak(`Aferin! ${nesne.ad} masanın ${yer.durum}.`); }, 500);
    } else {
      setGecis(true); setOfset({ x: 0, y: 0 });
      if (oynadi) { setHata((n) => n + 1); setTimeout(() => speak('Bir daha deneyelim.'), 300); }
    }
  };

  return (
    <OyunCercevesi baslik="Nesneyi Yerleştir" emoji="📍" onBack={onBack} adim={currentCard} toplamAdim={totalCards} yonerge={yonerge}>
      <div ref={kapRef} className="absolute inset-0 flex items-center justify-center">
        <div ref={sahneRef} className="relative" style={{ width: boy.w, height: boy.h }}>
          <Masa ipucu={hata >= 2 && !bitti ? yer.id : null} />
          <div
            ref={nesneRef}
            onPointerDown={baslat} onPointerMove={tasi} onPointerUp={birak} onPointerCancel={birak}
            className="absolute cursor-grab active:cursor-grabbing select-none"
            style={{
              left: px(BASLA.x - OBJ / 2), top: py(BASLA.y - OBJ / 2), width: px(OBJ), aspectRatio: '1 / 1',
              transform: `translate(${ofset.x}px, ${ofset.y}px) scale(${surukleniyor ? 1.12 : 1})`,
              transition: gecis ? 'transform .4s cubic-bezier(.3,1.3,.5,1)' : 'none',
              touchAction: 'none', zIndex: 20,
              filter: surukleniyor ? 'drop-shadow(0 10px 8px rgba(0,0,0,.25))' : 'drop-shadow(0 4px 3px rgba(0,0,0,.2))',
            }}
            role="button" aria-label={nesne.ad}
          >
            <NesneCizimi tur={nesne.id} />
          </div>
        </div>
      </div>
      <Kutlama acik={kutlama} alt onBitti={() => onAdvance(hata === 0)} sure={1500} />
    </OyunCercevesi>
  );
};

export default NesneYerlestir;
