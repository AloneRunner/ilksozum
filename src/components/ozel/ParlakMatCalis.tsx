import React, { useId } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Parlak / Mat (Gökhan Hoca, 2026-10-29): her soruda aynı nesne; renk, biçim, boyut, model aynı, yalnız yüzey değişir.
// Fotoğraf çiftleri bunu sağlamıyordu (farklı model, boy, renk) → nesneler kodla çizilir.
// Parlak: keskin parlama noktası, pencere yansıması, kenar ışığı. Mat: yumuşak gölge, pürüzlü doku, hiç parlama yok.
// Sıra: önce yalnız "parlak", sonra yalnız "mat" (2 şık → 3 şık), en son karışık.
type Nesne = 'top' | 'balon' | 'elma' | 'vazo' | 'kupa' | 'saksı';
const NESNELER: Nesne[] = ['top', 'balon', 'elma', 'vazo', 'kupa', 'saksı'];
const RENKLER = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#7c3aed', '#0891b2'];

const karis = (hex: string, hedef: number, t: number) => '#' + [1, 3, 5].map((i) => {
  const c = parseInt(hex.slice(i, i + 2), 16);
  return Math.round(c + (hedef - c) * t).toString(16).padStart(2, '0');
}).join('');
const ac = (h: string, t: number) => karis(h, 255, t);
const koyu = (h: string, t: number) => karis(h, 0, t);

const BICIM: Record<Nesne, { yol: string; yuvarlak: boolean }> = {
  top: { yol: 'M50 14 A36 36 0 1 1 49.9 14 Z', yuvarlak: true },
  balon: { yol: 'M50 9 C66 9 76 22 76 39 C76 57 63 71 50 71 C37 71 24 57 24 39 C24 22 34 9 50 9 Z', yuvarlak: true },
  elma: { yol: 'M50 30 C38 18 14 22 15 48 C16 72 34 90 50 84 C66 90 84 72 85 48 C86 22 62 18 50 30 Z', yuvarlak: true },
  vazo: { yol: 'M40 12 H60 V20 C60 27 77 34 77 56 C77 78 65 90 50 90 C35 90 23 78 23 56 C23 34 40 27 40 20 Z', yuvarlak: false },
  kupa: { yol: 'M24 28 H70 V78 C70 86 64 90 56 90 H38 C30 90 24 86 24 78 Z', yuvarlak: false },
  'saksı': { yol: 'M20 22 H80 V34 H75 L67 88 H33 L25 34 H20 Z', yuvarlak: false },
};

export const ParlakMatCiz: React.FC<{ ad: Nesne; renk: string; parlak: boolean; className?: string }> = ({ ad, renk, parlak, className }) => {
  const k = useId().replace(/:/g, '');
  const b = BICIM[ad];
  const dolgu = `url(#d${k})`;
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={`${ad} ${parlak ? 'parlak' : 'mat'}`}>
      <defs>
        {b.yuvarlak ? (
          <radialGradient id={`d${k}`} cx="0.38" cy="0.34" r={parlak ? 0.75 : 0.8}>
            {parlak
              ? <><stop offset="0" stopColor={ac(renk, 0.45)} /><stop offset="0.4" stopColor={renk} /><stop offset="0.82" stopColor={koyu(renk, 0.5)} /><stop offset="1" stopColor={koyu(renk, 0.25)} /></>
              : <><stop offset="0" stopColor={ac(renk, 0.1)} /><stop offset="0.6" stopColor={renk} /><stop offset="1" stopColor={koyu(renk, 0.28)} /></>}
          </radialGradient>
        ) : (
          <linearGradient id={`d${k}`} x1="0" x2="1" y1="0" y2="0">
            {parlak
              ? <><stop offset="0" stopColor={koyu(renk, 0.5)} /><stop offset="0.16" stopColor={renk} /><stop offset="0.27" stopColor={ac(renk, 0.75)} /><stop offset="0.34" stopColor={renk} /><stop offset="0.72" stopColor={koyu(renk, 0.25)} /><stop offset="0.9" stopColor={ac(renk, 0.3)} /><stop offset="1" stopColor={koyu(renk, 0.5)} /></>
              : <><stop offset="0" stopColor={koyu(renk, 0.22)} /><stop offset="0.38" stopColor={ac(renk, 0.08)} /><stop offset="0.72" stopColor={renk} /><stop offset="1" stopColor={koyu(renk, 0.28)} /></>}
          </linearGradient>
        )}
        <clipPath id={`c${k}`}><path d={b.yol} /></clipPath>
        <filter id={`p${k}`} x="0" y="0" width="1" height="1">
          <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="3" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <filter id={`b${k}`}><feGaussianBlur stdDeviation="1.2" /></filter>
      </defs>
      <ellipse cx="50" cy="94" rx="28" ry="3.5" fill="#000" opacity="0.13" />
      {ad === 'balon' && <path d="M50 76 C46 82 54 88 50 98" stroke="#64748b" strokeWidth="1.2" fill="none" />}
      {ad === 'balon' && <polygon points="50,70 45,77 55,77" fill={koyu(renk, 0.3)} />}
      {ad === 'kupa' && <path d="M70 40 C88 40 88 72 70 72" stroke={koyu(renk, 0.1)} strokeWidth="7" fill="none" />}
      <path d={b.yol} fill={dolgu} />
      {ad === 'kupa' && <ellipse cx="47" cy="28" rx="23" ry="3.5" fill={koyu(renk, 0.55)} />}
      {ad === 'saksı' && <rect x="20" y="22" width="60" height="12" fill={koyu(renk, 0.08)} opacity="0.35" />}
      {ad === 'elma' && <><path d="M50 30 C50 22 52 16 55 12" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" /><ellipse cx="62" cy="18" rx="9" ry="4.5" fill="#4d7c0f" transform="rotate(-25 62 18)" /></>}
      <g clipPath={`url(#c${k})`}>
        {parlak ? (
          <>
            {/* pencere yansıması ve parlama noktası (belirgin) */}
            <rect x={b.yuvarlak ? 58 : 60} y="22" width="7" height={b.yuvarlak ? 22 : 50} rx="3" fill="#fff" opacity="0.55" filter={`url(#b${k})`} />
            <ellipse cx={b.yuvarlak ? 37 : 34} cy={b.yuvarlak ? 30 : 46} rx="10" ry="6" fill="#fff" opacity="0.95" transform={`rotate(-30 ${b.yuvarlak ? 37 : 34} ${b.yuvarlak ? 30 : 46})`} filter={`url(#b${k})`} />
            <ellipse cx={b.yuvarlak ? 33 : 32} cy={b.yuvarlak ? 27 : 42} rx="3.5" ry="2.2" fill="#fff" />
            <path d={b.yol} fill="none" stroke="#fff" strokeWidth="2" opacity="0.25" />
          </>
        ) : (
          <rect x="0" y="0" width="100" height="100" filter={`url(#p${k})`} opacity="0.16" style={{ mixBlendMode: 'multiply' }} />
        )}
      </g>
    </svg>
  );
};

const tur = (k: 'parlak' | 'mat', n: number): Tur => {
  const ad = NESNELER[zar(NESNELER.length)];
  const renk = ad === 'elma' ? (zar(2) ? '#dc2626' : '#65a30d') : RENKLER[zar(RENKLER.length)];
  // Doğru şık sorulan yüzey, ötekiler karşıtı (aynı nesne, aynı renk)
  const siklar = karistir([k, ...Array.from({ length: n - 1 }, (_, i) => `${k === 'parlak' ? 'mat' : 'parlak'}-${i}`)]);
  return {
    soru: `Hangi ${ad} ${k}?`, dogruId: k, dogruSoz: `Evet! Bu ${ad} ${k}.`,
    secenekler: siklar.map((s) => ({ id: s, icerik: <ParlakMatCiz ad={ad} renk={renk} parlak={s.startsWith('parlak')} className="w-full aspect-square p-2" /> })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Parlak / Mat" emoji="✨" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
      <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
        {NESNELER.map((ad, i) => (
          <div key={ad} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
            {(['parlak', 'mat'] as const).map((k) => (
              <button key={k} onClick={() => speak(`Bu ${ad} ${k}.`)} className="rounded-2xl active:scale-95">
                <ParlakMatCiz ad={ad} renk={ad === 'elma' ? '#dc2626' : RENKLER[i % RENKLER.length]} parlak={k === 'parlak'} className="w-full aspect-square" />
                <span className="block text-xl font-black text-slate-800">{k}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 text-center max-w-md mx-auto">Parlak eşyada ışık yansır, parlayan bir nokta görünür. Mat eşyada parlama olmaz. Evde de gösterin: kaşık parlak, kumaş mat.</p>
    </div>
  </OyunCercevesi>
);

const ParlakMatCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => (
  <AsamaliCalisma id="parlakMatCalis" baslik="Parlak / Mat" emoji="✨" onBack={onBack} onSorular={onSorular}
    aciklama="Aynı eşya, yalnız yüzeyi farklı. Önce yalnız “parlak”, sonra yalnız “mat” sorulur; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Parlak ve mat eşyalar, dokun ve dinle"
    asamalar={[
      { ad: 'Parlak · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur('parlak', 2)) },
      { ad: 'Parlak · 3 şık', alt: '10 soru', secenek: 3, turlar: () => on(() => tur('parlak', 3)) },
      { ad: 'Mat · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur('mat', 2)) },
      { ad: 'Mat · 3 şık', alt: '10 soru', secenek: 3, turlar: () => on(() => tur('mat', 3)) },
    ]}
    karisik={{ alt: '30 soru, parlak ve mat karışık', secenek: 3, turlar: () => Array.from({ length: 30 }, () => tur(zar(2) ? 'parlak' : 'mat', 2 + zar(2))) }} />
);

export default ParlakMatCalis;
