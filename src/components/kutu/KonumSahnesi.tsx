import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { NESNELER, NesneCizimi } from './KutuIcDis.tsx';

// Konum sahnesi (Kaan, 2026-10-13: "kutu oyununu çok daha gelişmiş yapalım: arasında, önünde, arkasında, altında, üstünde, içinde, dışında").
// Fotoğraf yok; her sahne SVG ile çizilir, çocuk nesneyi sürükleyip söylenen yere koyar.
// Katman düzeni: arka çizim (z0) < "arkada" duran nesne (z5) < ön çizim (z10) < sürüklenen nesne (z20).
// Böylece "arkasına" nesne ağacın gövdesinin arkasında, "içine" kutunun ön yüzünün arkasında görünür.

export type SahneId = 'kutu' | 'masa' | 'agac' | 'ikikutu';
export type HedefId = 'kutu-icine' | 'kutu-disina' | 'masa-ustune' | 'masa-altina' | 'masa-soluna' | 'masa-sagina' | 'agac-onune' | 'agac-arkasina' | 'ikikutu-arasina';

const W = 360, H = 300, Y0 = 112;
const OBJ = 80;
const BASLA = { x: 52, y: 372 };
const px = (v: number) => `${(v / W) * 100}%`;
const py = (v: number) => `${((v - Y0) / H) * 100}%`;

interface Hedef {
  id: HedefId; ref: string; yon: string; durum: string;
  icinde: (x: number, y: number) => boolean;           // bırakma bölgesi (nesne merkezi, viewBox)
  nokta: { x: number; y: number } | null;              // oturacağı nokta (null: bırakıldığı yerde kalır)
  arkada?: boolean;                                    // true: ön çizimin arkasında dururlar
  baslangicIcinde?: boolean;                           // nesne kutunun içinde başlar (kutu-disina)
  ipucu: { x0: number; x1: number; y0: number; y1: number };
}

// ---- Sahne ölçüleri
const KX = 215, ON_X0 = KX - 112, ON_X1 = KX + 112, ON_Y0 = 242, ON_Y1 = 352, ARKA_Y = 188;
const IC = { x: KX, y: 214 };
const MX = 180;

const HEDEFLER: Record<HedefId, Hedef> = {
  'kutu-icine': { id: 'kutu-icine', ref: 'kutunun', yon: 'içine', durum: 'içinde', arkada: true, nokta: IC,
    icinde: (x, y) => x > ON_X0 - 10 && x < ON_X1 + 10 && y > 150 && y < ON_Y1, ipucu: { x0: ON_X0, x1: ON_X1, y0: 150, y1: ON_Y0 } },
  'kutu-disina': { id: 'kutu-disina', ref: 'kutunun', yon: 'dışına', durum: 'dışında', nokta: null, baslangicIcinde: true,
    icinde: (x, y) => !(x > ON_X0 - 30 && x < ON_X1 + 30) && y > 190, ipucu: { x0: 10, x1: ON_X0 - 36, y0: 250, y1: 400 } },
  'masa-ustune': { id: 'masa-ustune', ref: 'masanın', yon: 'üstüne', durum: 'üstünde', nokta: { x: MX, y: 214 },
    icinde: (x, y) => x > 80 && x < 280 && y > 130 && y < 264, ipucu: { x0: 84, x1: 276, y0: 150, y1: 262 } },
  'masa-altina': { id: 'masa-altina', ref: 'masanın', yon: 'altına', durum: 'altında', nokta: { x: MX, y: 318 },
    icinde: (x, y) => x > 118 && x < 244 && y > 282 && y < 352, ipucu: { x0: 118, x1: 244, y0: 282, y1: 352 } },
  'masa-soluna': { id: 'masa-soluna', ref: 'masanın', yon: 'soluna', durum: 'solunda', nokta: { x: 40, y: 332 },
    icinde: (x, y) => x < 76 && y > 150 && y < 412, ipucu: { x0: 4, x1: 76, y0: 200, y1: 400 } },
  'masa-sagina': { id: 'masa-sagina', ref: 'masanın', yon: 'sağına', durum: 'sağında', nokta: { x: 320, y: 332 },
    icinde: (x, y) => x > 284 && y > 150 && y < 412, ipucu: { x0: 284, x1: 356, y0: 200, y1: 400 } },
  'agac-onune': { id: 'agac-onune', ref: 'ağacın', yon: 'önüne', durum: 'önünde', nokta: { x: MX, y: 356 },
    icinde: (x, y) => x > 100 && x < 260 && y >= 334 && y < 412, ipucu: { x0: 100, x1: 260, y0: 334, y1: 408 } },
  'agac-arkasina': { id: 'agac-arkasina', ref: 'ağacın', yon: 'arkasına', durum: 'arkasında', arkada: true, nokta: { x: MX + 22, y: 300 },
    icinde: (x, y) => x > 100 && x < 260 && y > 250 && y < 334, ipucu: { x0: 100, x1: 260, y0: 250, y1: 332 } },
  'ikikutu-arasina': { id: 'ikikutu-arasina', ref: 'iki kutunun', yon: 'arasına', durum: 'arasında', nokta: { x: MX, y: 296 },
    icinde: (x, y) => x > 142 && x < 218 && y > 240 && y < 360, ipucu: { x0: 142, x1: 218, y0: 250, y1: 352 } },
};
const SAHNE_HEDEFLERI: Record<SahneId, HedefId[]> = {
  kutu: ['kutu-icine', 'kutu-disina'],
  masa: ['masa-ustune', 'masa-altina', 'masa-soluna', 'masa-sagina'],
  agac: ['agac-onune', 'agac-arkasina'],
  ikikutu: ['ikikutu-arasina'],
};
const SAHNE_OF = (h: HedefId): SahneId => (h.split('-')[0] as SahneId);

// ---- Çizimler
const Zemin: React.FC<{ id: string }> = ({ id }) => (
  <>
    <defs><linearGradient id={`z-${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#cfe8c9" /><stop offset="1" stopColor="#9fd3a7" /></linearGradient></defs>
    <ellipse cx={W / 2} cy="380" rx="215" ry="42" fill={`url(#z-${id})`} opacity=".9" />
  </>
);

const KutuArka: React.FC = () => (
  <>
    <Zemin id="k" />
    <defs>
      <linearGradient id="kt-ic" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6b4421" /><stop offset="1" stopColor="#8d5d2e" /></linearGradient>
    </defs>
    <ellipse cx={KX} cy="356" rx="128" ry="16" fill="#000" opacity=".16" />
    <path d={`M${ON_X0 + 26} ${ARKA_Y} L${ON_X1 - 26} ${ARKA_Y} L${ON_X1 - 18} 148 L${ON_X0 + 18} 148Z`} fill="#c98d46" stroke="#a06a2c" strokeWidth="2" />
    <path d={`M${ON_X0 + 26} ${ARKA_Y} L${ON_X1 - 26} ${ARKA_Y} L${ON_X1} ${ON_Y0} L${ON_X0} ${ON_Y0}Z`} fill="url(#kt-ic)" />
  </>
);
const KutuOn: React.FC = () => (
  <>
    <defs><linearGradient id="kt-on" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e6b36b" /><stop offset="1" stopColor="#c98d46" /></linearGradient></defs>
    <path d={`M${ON_X0} ${ON_Y0} L${ON_X0 + 26} ${ARKA_Y} L${ON_X0 - 30} 168 L${ON_X0 - 46} 226Z`} fill="#e9bb78" stroke="#a06a2c" strokeWidth="2" strokeLinejoin="round" />
    <path d={`M${ON_X1} ${ON_Y0} L${ON_X1 - 26} ${ARKA_Y} L${ON_X1 + 30} 168 L${ON_X1 + 46} 226Z`} fill="#dba85f" stroke="#a06a2c" strokeWidth="2" strokeLinejoin="round" />
    <path d={`M${ON_X0} ${ON_Y0} L${ON_X1} ${ON_Y0} L${ON_X1 - 4} ${ON_Y1} Q${ON_X1 - 4} ${ON_Y1 + 6} ${ON_X1 - 12} ${ON_Y1 + 6} L${ON_X0 + 12} ${ON_Y1 + 6} Q${ON_X0 + 4} ${ON_Y1 + 6} ${ON_X0 + 4} ${ON_Y1}Z`} fill="url(#kt-on)" stroke="#a06a2c" strokeWidth="2.5" strokeLinejoin="round" />
    <rect x={KX - 17} y={ON_Y0} width="34" height="40" fill="#f4e3c0" opacity=".9" />
    <path d={`M${ON_X0 + 14} ${ON_Y1 - 22} L${ON_X1 - 14} ${ON_Y1 - 22}`} stroke="#a06a2c" strokeWidth="2" strokeDasharray="6 7" opacity=".6" />
  </>
);

const MasaArka: React.FC = () => (
  <>
    <Zemin id="m" />
    <defs>
      <linearGradient id="ms-ust" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fbe0b0" /><stop offset="1" stopColor="#f0c585" /></linearGradient>
      <linearGradient id="ms-on" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#d9a05b" /><stop offset="1" stopColor="#bf8441" /></linearGradient>
      <linearGradient id="ms-bacak" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#c58a45" /><stop offset="1" stopColor="#a56e2e" /></linearGradient>
    </defs>
    <ellipse cx={MX} cy="352" rx="112" ry="12" fill="#000" opacity=".15" />
    <rect x="104" y="278" width="16" height="74" rx="3" fill="url(#ms-bacak)" stroke="#8b5a25" strokeWidth="2" />
    <rect x="240" y="278" width="16" height="74" rx="3" fill="url(#ms-bacak)" stroke="#8b5a25" strokeWidth="2" />
    <path d="M84 262 L276 262 L264 242 L96 242Z" fill="url(#ms-ust)" stroke="#a06a2c" strokeWidth="2" strokeLinejoin="round" />
    <rect x="84" y="262" width="192" height="18" rx="3" fill="url(#ms-on)" stroke="#8b5a25" strokeWidth="2" />
  </>
);

const AgacArka: React.FC = () => (
  <>
    <Zemin id="a" />
    <ellipse cx={MX} cy="356" rx="70" ry="10" fill="#000" opacity=".15" />
  </>
);
const AgacOn: React.FC = () => (
  <>
    <defs>
      <linearGradient id="ag-govde" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#a56a31" /><stop offset="1" stopColor="#7d4b1f" /></linearGradient>
      <radialGradient id="ag-tac" cx="40%" cy="35%" r="70%"><stop offset="0" stopColor="#7ed57a" /><stop offset="1" stopColor="#2f9a45" /></radialGradient>
    </defs>
    <rect x="163" y="212" width="34" height="142" rx="6" fill="url(#ag-govde)" stroke="#5e3813" strokeWidth="2.5" />
    <path d="M160 340 Q150 354 140 356 M200 340 Q210 354 220 356" stroke="#5e3813" strokeWidth="5" strokeLinecap="round" fill="none" />
    <ellipse cx={MX} cy="176" rx="96" ry="64" fill="url(#ag-tac)" stroke="#237a36" strokeWidth="2.5" />
    <ellipse cx="136" cy="150" rx="26" ry="14" fill="#fff" opacity=".18" />
  </>
);

const IkiKutuArka: React.FC = () => {
  const kutu = (x: number) => (
    <g>
      <rect x={x} y="270" width="80" height="64" rx="5" fill="#d9a05b" stroke="#a06a2c" strokeWidth="2.5" />
      <rect x={x + 30} y="270" width="20" height="26" fill="#f4e3c0" opacity=".9" />
      <path d={`M${x} 270 L${x + 12} 256 L${x + 68} 256 L${x + 80} 270Z`} fill="#e8b872" stroke="#a06a2c" strokeWidth="2" strokeLinejoin="round" />
    </g>
  );
  return (
    <>
      <Zemin id="i" />
      <ellipse cx="90" cy="336" rx="52" ry="8" fill="#000" opacity=".15" /><ellipse cx="270" cy="336" rx="52" ry="8" fill="#000" opacity=".15" />
      {kutu(50)}{kutu(230)}
    </>
  );
};

const arkaCizim = (s: SahneId) => ({ kutu: <KutuArka />, masa: <MasaArka />, agac: <AgacArka />, ikikutu: <IkiKutuArka /> }[s]);
const onCizim = (s: SahneId) => (s === 'kutu' ? <KutuOn /> : s === 'agac' ? <AgacOn /> : null);

// ---- Oyun
interface Props {
  currentCard: number; totalCards: number;
  onAdvance: (correct: boolean) => void; onBack: () => void;
  baslik: string; emoji: string;
  havuz: HedefId[];                // bu oyunda sorulabilecek yerler
}
const sira = (havuz: HedefId[], tur: number): HedefId => {
  // İlk turlar: kolay (içine / üstüne); sonra havuzdan karışık
  const kolay: HedefId[] = ['kutu-icine', 'masa-ustune', 'masa-altina'];
  const k = kolay.filter((h) => havuz.includes(h));
  if (tur <= k.length) return k[tur - 1];
  return havuz[Math.floor(Math.random() * havuz.length)];
};

const KonumSahnesi: React.FC<Props> = ({ currentCard, totalCards, onAdvance, onBack, baslik, emoji, havuz }) => {
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

  const { nesne, hedef } = useMemo(() => {
    const n = NESNELER[Math.floor(Math.random() * NESNELER.length)];
    return { nesne: n, hedef: HEDEFLER[sira(havuz, currentCard)] };
  }, [currentCard]); // eslint-disable-line react-hooks/exhaustive-deps
  const sahne = SAHNE_OF(hedef.id);
  const yonerge = `${nesne.belirtme} ${hedef.ref} ${hedef.yon} koy.`;
  const baslangic = hedef.baslangicIcinde ? IC : BASLA;

  const [ofset, setOfset] = useState({ x: 0, y: 0 });
  const [surukleniyor, setSurukleniyor] = useState(false);
  const [gecis, setGecis] = useState(false);
  const [bitti, setBitti] = useState(false);
  const [hata, setHata] = useState(0);
  const [kutlama, setKutlama] = useState(false);

  useEffect(() => { const z = setTimeout(() => speak(yonerge), 350); return () => clearTimeout(z); }, [yonerge]);
  useEffect(() => { if (!gecis) return; const z = setTimeout(() => setGecis(false), 450); return () => clearTimeout(z); }, [gecis]);

  const birim = () => (boy.w || 1) / W;
  const merkez = () => {
    const s = sahneRef.current, o = nesneRef.current;
    if (!s || !o) return null;
    const sr = s.getBoundingClientRect(), r = o.getBoundingClientRect();
    return { x: ((r.left + r.width / 2 - sr.left) / sr.width) * W, y: Y0 + ((r.top + r.height / 2 - sr.top) / sr.height) * H };
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
    const c = merkez();
    const oynadi = Math.abs(ofset.x) > 6 || Math.abs(ofset.y) > 6;
    // "dışına" için kutudan hiç çıkarmadan bırakmak doğru sayılmaz
    const dogru = !!c && oynadi && hedef.icinde(c.x, c.y);
    if (dogru) {
      setBitti(true); setGecis(true);
      if (hedef.nokta) { const u = birim(); setOfset({ x: (hedef.nokta.x - baslangic.x) * u, y: (hedef.nokta.y - baslangic.y) * u }); }
      setTimeout(() => { setKutlama(true); speak(`Aferin! ${nesne.ad} ${hedef.ref} ${hedef.durum}.`); }, 500);
    } else {
      setGecis(true); setOfset({ x: 0, y: 0 });
      if (oynadi) { setHata((n) => n + 1); setTimeout(() => speak('Bir daha deneyelim.'), 300); }
    }
  };

  const kutudaDinleniyor = !!hedef.baslangicIcinde && !surukleniyor && !gecis && !bitti && Math.abs(ofset.x) < 6 && Math.abs(ofset.y) < 6;
  // kutuda başlayan nesne ön yüzün arkasında görünsün: alt kısmı kırp
  const kirp = kutudaDinleniyor ? `inset(0 0 ${Math.max(0, 100 - ((ON_Y0 - (IC.y - OBJ / 2)) / OBJ) * 100)}% 0)` : undefined;
  const ipucu = hata >= 2 && !bitti ? hedef.ipucu : null;
  const z = bitti && hedef.arkada ? 5 : 20;

  return (
    <OyunCercevesi baslik={baslik} emoji={emoji} onBack={onBack} adim={currentCard} toplamAdim={totalCards} yonerge={yonerge}>
      <div ref={kapRef} className="absolute inset-0 flex items-center justify-center">
        <div ref={sahneRef} className="relative" style={{ width: boy.w, height: boy.h }}>
          <svg viewBox={`0 ${Y0} ${W} ${H}`} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} aria-hidden>{arkaCizim(sahne)}</svg>
          <svg viewBox={`0 ${Y0} ${W} ${H}`} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }} aria-hidden>
            {onCizim(sahne)}
            {ipucu && <rect x={ipucu.x0} y={ipucu.y0} width={ipucu.x1 - ipucu.x0} height={ipucu.y1 - ipucu.y0} rx="14" fill="rgba(34,197,94,.12)" stroke="#22c55e" strokeWidth="5" strokeDasharray="10 8" className="animate-pulse" />}
          </svg>
          <div
            ref={nesneRef}
            onPointerDown={baslat} onPointerMove={tasi} onPointerUp={birak} onPointerCancel={birak}
            className="absolute cursor-grab active:cursor-grabbing select-none"
            style={{
              left: px(baslangic.x - OBJ / 2), top: py(baslangic.y - OBJ / 2), width: px(OBJ), aspectRatio: '1 / 1',
              transform: `translate(${ofset.x}px, ${ofset.y}px) scale(${surukleniyor ? 1.12 : 1})`,
              transition: gecis ? 'transform .4s cubic-bezier(.3,1.3,.5,1)' : 'none',
              touchAction: 'none', zIndex: z, clipPath: kirp,
              filter: surukleniyor ? 'drop-shadow(0 10px 8px rgba(0,0,0,.25))' : 'drop-shadow(0 4px 3px rgba(0,0,0,.2))',
              pointerEvents: bitti ? 'none' : 'auto',
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

export const TUM_HEDEFLER: HedefId[] = Object.values(SAHNE_HEDEFLERI).flat();
export const MASA_HEDEFLERI: HedefId[] = SAHNE_HEDEFLERI.masa;
export default KonumSahnesi;
