import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';

// İçinde / Dışında (Kaan, 2026-10-13: "kutunun içinde etkinliğini baştan, çok daha profesyonel; fotoğraf şart değil").
// Fotoğraf yok: kutu ve nesneler SVG ile çizilir. Çocuk nesneyi sürükleyip kutunun İÇİNE koyar ya da kutudan DIŞARI çıkarır.
// Kurallar (oyun kiti ile aynı): puan/süre/can yok, yanlışta ceza yok (nesne yerine döner), 2 yanlıştan sonra ipucu parlar.
// Hafif: CSS dönüşümü + SVG; canvas/3D yok (eski telefonda akıcı).

export type Nesne = 'top' | 'elma' | 'ayi' | 'araba' | 'yildiz';
export const NESNELER: { id: Nesne; ad: string; belirtme: string }[] = [
  { id: 'top', ad: 'Top', belirtme: 'Topu' },
  { id: 'elma', ad: 'Elma', belirtme: 'Elmayı' },
  { id: 'ayi', ad: 'Ayı', belirtme: 'Ayıyı' },
  { id: 'araba', ad: 'Araba', belirtme: 'Arabayı' },
  { id: 'yildiz', ad: 'Yıldız', belirtme: 'Yıldızı' },
];

// Sahne ölçüleri (viewBox 360×420; yüzdeler aynı koordinattan türetilir)
const W = 360, H = 300, Y0 = 112;      // görünür dikey bant: y = 112…412
const KX = 215;                 // kutunun orta çizgisi
const ON_Y0 = 242, ON_Y1 = 352; // ön yüz
const ON_X0 = KX - 112, ON_X1 = KX + 112;
const ARKA_Y = 188;
const OBJ = 94;                 // nesne boyu (viewBox birimi)
const IC = { x: KX, y: 214 };   // kutunun içinde duran nesnenin merkezi
const DIS = { x: 52, y: 336 };  // yerdeki başlangıç noktası
const px = (v: number) => `${(v / W) * 100}%`;               // x konumu / genişlik
const py = (v: number) => `${((v - Y0) / H) * 100}%`;          // y konumu
const ph = (v: number) => `${(v / H) * 100}%`;                  // yükseklik

export const NesneCizimi: React.FC<{ tur: Nesne }> = ({ tur }) => {
  switch (tur) {
    case 'top': return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs><radialGradient id="kt-top" cx="35%" cy="30%" r="75%"><stop offset="0" stopColor="#ff8a80" /><stop offset="1" stopColor="#d32f2f" /></radialGradient></defs>
        <circle cx="50" cy="50" r="44" fill="url(#kt-top)" stroke="#9f1f1f" strokeWidth="2" />
        <path d="M10 46 Q50 66 90 46" stroke="#fff" strokeWidth="6" fill="none" opacity=".9" />
        <ellipse cx="34" cy="30" rx="10" ry="6" fill="#fff" opacity=".55" transform="rotate(-30 34 30)" />
      </svg>);
    case 'elma': return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs><radialGradient id="kt-elma" cx="38%" cy="35%" r="75%"><stop offset="0" stopColor="#ff8a65" /><stop offset="1" stopColor="#c62828" /></radialGradient></defs>
        <path d="M50 28 C30 14 8 30 10 56 C12 82 32 94 50 88 C68 94 88 82 90 56 C92 30 70 14 50 28Z" fill="url(#kt-elma)" stroke="#8e1b1b" strokeWidth="2" />
        <path d="M50 28 Q50 14 56 8" stroke="#6d4c2f" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M56 16 Q72 4 82 14 Q68 24 56 16Z" fill="#43a047" stroke="#2e7d32" strokeWidth="2" />
        <ellipse cx="30" cy="42" rx="8" ry="5" fill="#fff" opacity=".5" transform="rotate(-35 30 42)" />
      </svg>);
    case 'ayi': return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="22" cy="24" r="14" fill="#a1672f" /><circle cx="78" cy="24" r="14" fill="#a1672f" />
        <circle cx="22" cy="24" r="7" fill="#e7b98a" /><circle cx="78" cy="24" r="7" fill="#e7b98a" />
        <circle cx="50" cy="52" r="38" fill="#b9783a" stroke="#8a5524" strokeWidth="2" />
        <ellipse cx="50" cy="64" rx="17" ry="13" fill="#f0d0a8" />
        <circle cx="36" cy="46" r="5" fill="#2b1a0c" /><circle cx="64" cy="46" r="5" fill="#2b1a0c" />
        <circle cx="34.5" cy="44.5" r="1.6" fill="#fff" /><circle cx="62.5" cy="44.5" r="1.6" fill="#fff" />
        <ellipse cx="50" cy="59" rx="6" ry="4.5" fill="#3b2412" />
        <path d="M44 69 Q50 75 56 69" stroke="#3b2412" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>);
    case 'araba': return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <path d="M8 62 L12 48 Q14 42 22 42 L34 42 L42 28 Q44 25 48 25 L68 25 Q72 25 75 30 L84 44 Q92 46 93 56 L94 66 Q94 70 90 70 L10 70 Q6 70 8 62Z" fill="#1e88e5" stroke="#0d5aa7" strokeWidth="2" />
        <path d="M44 31 L66 31 L76 44 L40 44Z" fill="#cfe9ff" stroke="#0d5aa7" strokeWidth="1.5" />
        <rect x="14" y="52" width="10" height="6" rx="2" fill="#ffe082" />
        <circle cx="30" cy="72" r="12" fill="#37474f" /><circle cx="30" cy="72" r="5" fill="#cfd8dc" />
        <circle cx="72" cy="72" r="12" fill="#37474f" /><circle cx="72" cy="72" r="5" fill="#cfd8dc" />
      </svg>);
    case 'yildiz': return (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs><linearGradient id="kt-yil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe066" /><stop offset="1" stopColor="#f59e0b" /></linearGradient></defs>
        <path d="M50 6 L62 36 L94 38 L69 58 L78 90 L50 72 L22 90 L31 58 L6 38 L38 36Z" fill="url(#kt-yil)" stroke="#c77b06" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="43" cy="47" r="3" fill="#7a4a06" /><circle cx="57" cy="47" r="3" fill="#7a4a06" />
        <path d="M44 57 Q50 62 56 57" stroke="#7a4a06" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>);
  }
};

const Kutu: React.FC<{ icerik?: Nesne | null; parla?: boolean }> = ({ icerik, parla }) => (
  <svg viewBox={`0 ${Y0} ${W} ${H}`} className="absolute inset-0 w-full h-full" aria-hidden>
    <defs>
      <linearGradient id="kt-ic" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6b4421" /><stop offset="1" stopColor="#8d5d2e" /></linearGradient>
      <linearGradient id="kt-on" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e6b36b" /><stop offset="1" stopColor="#c98d46" /></linearGradient>
      <linearGradient id="kt-zemin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bfe3c4" /><stop offset="1" stopColor="#8fcd9a" /></linearGradient>
    </defs>
    {/* zemin */}
    <ellipse cx={W / 2} cy="380" rx="200" ry="34" fill="url(#kt-zemin)" opacity=".85" />
    <ellipse cx={KX} cy="356" rx="128" ry="16" fill="#000" opacity=".16" />
    {/* arka kapak ve iç duvar */}
    <path d={`M${ON_X0 + 26} ${ARKA_Y} L${ON_X1 - 26} ${ARKA_Y} L${ON_X1 - 18} 148 L${ON_X0 + 18} 148Z`} fill="#c98d46" stroke="#a06a2c" strokeWidth="2" />
    <path d={`M${ON_X0 + 26} ${ARKA_Y} L${ON_X1 - 26} ${ARKA_Y} L${ON_X1} ${ON_Y0} L${ON_X0} ${ON_Y0}Z`} fill="url(#kt-ic)" />
    {/* içindeki nesne (ön yüzün arkasında) */}
    {icerik && (
      <foreignObject x={IC.x - OBJ / 2} y={IC.y - OBJ / 2} width={OBJ} height={OBJ}>
        <div style={{ width: '100%', height: '100%' }}><NesneCizimi tur={icerik} /></div>
      </foreignObject>
    )}
    {/* yan kapaklar */}
    <path d={`M${ON_X0} ${ON_Y0} L${ON_X0 + 26} ${ARKA_Y} L${ON_X0 - 30} 168 L${ON_X0 - 46} 226Z`} fill="#e9bb78" stroke="#a06a2c" strokeWidth="2" strokeLinejoin="round" />
    <path d={`M${ON_X1} ${ON_Y0} L${ON_X1 - 26} ${ARKA_Y} L${ON_X1 + 30} 168 L${ON_X1 + 46} 226Z`} fill="#dba85f" stroke="#a06a2c" strokeWidth="2" strokeLinejoin="round" />
    {/* ön yüz */}
    <path d={`M${ON_X0} ${ON_Y0} L${ON_X1} ${ON_Y0} L${ON_X1 - 4} ${ON_Y1} Q${ON_X1 - 4} ${ON_Y1 + 6} ${ON_X1 - 12} ${ON_Y1 + 6} L${ON_X0 + 12} ${ON_Y1 + 6} Q${ON_X0 + 4} ${ON_Y1 + 6} ${ON_X0 + 4} ${ON_Y1}Z`} fill="url(#kt-on)" stroke="#a06a2c" strokeWidth="2.5" strokeLinejoin="round" />
    <rect x={KX - 17} y={ON_Y0} width="34" height="40" fill="#f4e3c0" opacity=".9" />
    <path d={`M${ON_X0 + 14} ${ON_Y1 - 22} L${ON_X1 - 14} ${ON_Y1 - 22}`} stroke="#a06a2c" strokeWidth="2" strokeDasharray="6 7" opacity=".6" />
    {parla && <path d={`M${ON_X0 - 6} ${ON_Y0 - 6} L${ON_X0 + 22} ${ARKA_Y - 8} L${ON_X1 - 22} ${ARKA_Y - 8} L${ON_X1 + 6} ${ON_Y0 - 6}Z`} fill="none" stroke="#22c55e" strokeWidth="6" strokeDasharray="10 8" className="animate-pulse" />}
  </svg>
);

interface Props { currentCard: number; totalCards: number; onAdvance: (correct: boolean) => void; onBack: () => void; }

const KutuIcDis: React.FC<Props> = ({ currentCard, totalCards, onAdvance, onBack }) => {
  const sahneRef = useRef<HTMLDivElement>(null);
  const kutuRef = useRef<HTMLDivElement>(null);
  const nesneRef = useRef<HTMLDivElement>(null);
  const tut = useRef<{ sx: number; sy: number } | null>(null);
  const kapRef = useRef<HTMLDivElement>(null);
  // Sahne, oranını bozmadan mevcut alana sığar (yüzde konumlar viewBox ile birebir örtüşsün)
  const [sahneBoyu, setSahneBoyu] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const k = kapRef.current; if (!k) return;
    const olc = () => { const cw = k.clientWidth, ch = k.clientHeight; const w = Math.max(0, Math.min(cw, ch * (W / H))); setSahneBoyu({ w, h: w * (H / W) }); };
    olc(); const ro = new ResizeObserver(olc); ro.observe(k); return () => ro.disconnect();
  }, []);

  // Tur ayarı: ilk iki tur hep "içine"; sonra karışık
  const { nesne, mod } = useMemo(() => {
    const n = NESNELER[Math.floor(Math.random() * NESNELER.length)];
    const m: 'icine' | 'disina' = currentCard <= 3 ? 'icine' : Math.random() < 0.5 ? 'icine' : 'disina';
    return { nesne: n, mod: m };
  }, [currentCard]);

  const yonerge = `${nesne.belirtme} kutunun ${mod === 'icine' ? 'içine' : 'dışına'} koy.`;
  const baslangic = mod === 'icine' ? DIS : IC;

  const [ofset, setOfset] = useState({ x: 0, y: 0 });
  const [surukleniyor, setSurukleniyor] = useState(false);
  const [gecis, setGecis] = useState(false);
  const [bitti, setBitti] = useState<null | 'icinde' | 'disinda'>(null);
  const [hata, setHata] = useState(0);
  const [kutlama, setKutlama] = useState(false);

  useEffect(() => { const z = setTimeout(() => speak(yonerge), 350); return () => clearTimeout(z); }, [yonerge]);
  useEffect(() => { if (!gecis) return; const z = setTimeout(() => setGecis(false), 400); return () => clearTimeout(z); }, [gecis]);

  const merkezKutuIci = () => {
    const s = sahneRef.current, o = nesneRef.current, k = kutuRef.current;
    if (!s || !o || !k) return false;
    const r = o.getBoundingClientRect(); const kr = k.getBoundingClientRect();
    const cx = r.left + r.width / 2; const cy = r.top + r.height / 2;
    return cx > kr.left && cx < kr.right && cy > kr.top && cy < kr.bottom;
  };

  const baslat = (e: React.PointerEvent) => {
    if (bitti) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    tut.current = { sx: e.clientX - ofset.x, sy: e.clientY - ofset.y };
    setGecis(false); setSurukleniyor(true);
  };
  const tasi = (e: React.PointerEvent) => {
    if (!tut.current) return;
    setOfset({ x: e.clientX - tut.current.sx, y: e.clientY - tut.current.sy });
  };
  const birak = () => {
    if (!tut.current) return;
    tut.current = null; setSurukleniyor(false);
    const ici = merkezKutuIci();
    const dogru = mod === 'icine' ? ici : !ici;
    // Hiç oynatmadan bırakmak ("disina" modunda nesne kutudaysa) yanlış sayılır; ofset sıfır = yerinde
    const yerinde = Math.abs(ofset.x) < 6 && Math.abs(ofset.y) < 6;
    if (dogru && !yerinde) {
      setBitti(ici ? 'icinde' : 'disinda');
      if (ici) setOfset({ x: 0, y: 0 });
      setTimeout(() => { setKutlama(true); speak(`Aferin! ${nesne.ad} kutunun ${ici ? 'içinde' : 'dışında'}.`); }, 450);
    } else {
      setGecis(true); setOfset({ x: 0, y: 0 });
      if (!yerinde) { setHata((n) => n + 1); setTimeout(() => speak('Bir daha deneyelim.'), 300); }
    }
  };

  const boyut = `${(OBJ / W) * 100}%`;
  const kutudaDinleniyor = mod === 'disina' && !surukleniyor && !gecis && !bitti && Math.abs(ofset.x) < 6 && Math.abs(ofset.y) < 6;
  const icindeBitti = bitti === 'icinde';
  const disaridaGoster = !icindeBitti; // iç durumda nesneyi SVG çizer

  return (
    <OyunCercevesi baslik="İçinde / Dışında" emoji="📦" onBack={onBack} adim={currentCard} toplamAdim={totalCards} yonerge={yonerge}>
      <div ref={kapRef} className="absolute inset-0 flex items-center justify-center">
        <div ref={sahneRef} className="relative" style={{ width: sahneBoyu.w, height: sahneBoyu.h }}>
          <Kutu icerik={icindeBitti ? nesne.id : null} parla={hata >= 2 && mod === 'icine' && !bitti} />
          {/* kutu bırakma alanı (görünmez) */}
          <div ref={kutuRef} className="absolute" style={{ left: px(ON_X0 - 20), top: py(150), width: px(ON_X1 - ON_X0 + 40), height: ph(ON_Y1 + 6 - 150) }} />
          {/* ipucu: "dışına" için yerdeki halka */}
          {hata >= 2 && mod === 'disina' && !bitti && (
            <div className="absolute rounded-full border-4 border-dashed border-emerald-500 animate-pulse" style={{ left: px(DIS.x - 56), top: py(DIS.y - 52), width: px(112), height: ph(104) }} />
          )}
          {disaridaGoster && (
            <div
              ref={nesneRef}
              onPointerDown={baslat} onPointerMove={tasi} onPointerUp={birak} onPointerCancel={birak}
              className="absolute cursor-grab active:cursor-grabbing select-none"
              style={{
                left: px(baslangic.x - OBJ / 2), top: py(baslangic.y - OBJ / 2), width: boyut, aspectRatio: '1 / 1',
                transform: `translate(${ofset.x}px, ${ofset.y}px) scale(${surukleniyor ? 1.12 : 1})`,
                transition: gecis ? 'transform .35s cubic-bezier(.3,1.4,.5,1)' : 'none',
                touchAction: 'none', zIndex: 20,
                clipPath: kutudaDinleniyor ? `inset(0 0 ${Math.max(0, 100 - ((ON_Y0 - (IC.y - OBJ / 2)) / OBJ) * 100)}% 0)` : undefined,
                filter: surukleniyor ? 'drop-shadow(0 10px 8px rgba(0,0,0,.25))' : 'drop-shadow(0 4px 3px rgba(0,0,0,.2))',
              }}
              role="button" aria-label={nesne.ad}
            >
              <NesneCizimi tur={nesne.id} />
            </div>
          )}
        </div>
      </div>
      <Kutlama acik={kutlama} alt onBitti={() => onAdvance(hata === 0)} sure={1500} />
    </OyunCercevesi>
  );
};

export default KutuIcDis;
