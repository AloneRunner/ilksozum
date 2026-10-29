import React from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Geniş / Dar (Gökhan Hoca, 2026-10-29): yalnız en değişir; boy, renk, ortam ve açı aynı, aynı nesnenin dar ve geniş hâli.
// Kapı, pencere (aynı duvar rengi), tek oluklu kaydırak, merdiven, tünel, yol: dar fotoğrafın nesne şeridi genişletilir
// (tools/gorsel-envanter/genislik-uret.py). Köprü üstten, aynı model, kodla çizilir. Üçlü kaydırak çıkarıldı.
// Tanı'da kısa animasyon: top geniş kapıdan geçer, dar kapıda takılır.
// Sıra: Tanı → yalnız "geniş" (2 şık × 10) → yalnız "dar" (2 şık × 10) → karışık.
interface Esya { ad: string; ciz: (i: number) => React.ReactNode }
const foto = (dosya: string) => (i: number) => <img src={`/images/ozel/genis-dar/${dosya}-${i}.webp`} alt="" draggable={false} className="h-full w-full object-cover" />;

const KOPRU_EN = [10, 17, 26, 36];
const Kopru: React.FC<{ i: number }> = ({ i }) => {
  const e = KOPRU_EN[i], x = 50 - e / 2;
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label="köprü">
      <rect width="100" height="100" fill="#86c95a" />
      <path d="M0 36 C25 30 75 42 100 36 V66 C75 72 25 60 0 66 Z" fill="#3b82c4" />
      <path d="M0 44 C30 40 70 50 100 44" stroke="#93c5fd" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d={`M${x + e / 2 - 2} 0 V100`} stroke="#c2a170" strokeWidth="3" opacity="0.6" />
      <rect x={x} y="22" width={e} height="56" fill="#b7814b" />
      {Array.from({ length: 14 }, (_, n) => <line key={n} x1={x} x2={x + e} y1={22 + n * 4} y2={22 + n * 4} stroke="#8b5a2b" strokeWidth="0.8" />)}
      <rect x={x - 1.5} y="20" width="2.5" height="60" fill="#6b4423" /><rect x={x + e - 1} y="20" width="2.5" height="60" fill="#6b4423" />
    </svg>
  );
};

const ESYALAR: Esya[] = [
  { ad: 'kapı', ciz: foto('kapi') }, { ad: 'pencere', ciz: foto('pencere') }, { ad: 'kaydırak', ciz: foto('kaydirak') },
  { ad: 'merdiven', ciz: foto('merdiven') }, { ad: 'tünel', ciz: foto('tunel') }, { ad: 'yol', ciz: foto('yol') },
  { ad: 'köprü', ciz: (i) => <Kopru i={i} /> },
];
const BELIRGIN = [[0, 3], [0, 2], [1, 3]];
const YAKIN = [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3]];
const tur = (genis: boolean, ciftler: number[][]): Tur => {
  const e = ESYALAR[zar(ESYALAR.length)];
  const [a, b] = ciftler[zar(ciftler.length)];
  const k = genis ? 'geniş' : 'dar';
  return {
    soru: `Hangi ${e.ad} ${k}?`, dogruId: String(genis ? b : a), dogruSoz: `Evet! Bu ${e.ad} ${k}.`,
    secenekler: karistir([a, b]).map((i) => ({ id: String(i), icerik: <span className="block w-full aspect-square overflow-hidden">{e.ciz(i)}</span> })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);

// Üstten bakış: duvar ve kapı aralığı; top aşağıdan gelir. Geniş: geçer. Dar: takılır, geri seker.
const KapiAnimasyon: React.FC<{ genis: boolean }> = ({ genis }) => {
  const bosluk = genis ? 34 : 12;
  return (
    <svg viewBox="0 0 100 132" className="w-full h-auto" role="img" aria-label={genis ? 'top geniş kapıdan geçer' : 'top dar kapıda takılır'}>
      <rect width="100" height="132" rx="8" fill="#f1f5f9" />
      <rect x="0" y="44" width={50 - bosluk / 2} height="8" fill="#94a3b8" /><rect x={50 + bosluk / 2} y="44" width={50 - bosluk / 2} height="8" fill="#94a3b8" />
      <circle cx="50" r="11" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5">
        {genis
          ? <animate attributeName="cy" values="102;102;14;14" keyTimes="0;0.15;0.75;1" dur="3s" repeatCount="indefinite" />
          : <animate attributeName="cy" values="102;102;64;70;64;70;102" keyTimes="0;0.15;0.5;0.58;0.66;0.74;1" dur="3s" repeatCount="indefinite" />}
      </circle>
      <text x="50" y="127" textAnchor="middle" fontSize="8" fontWeight="800" fill={genis ? '#15803d' : '#b91c1c'}>{genis ? 'geçti ✓' : 'geçemedi ✗'}</text>
    </svg>
  );
};

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Geniş / Dar" emoji="🚪" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
      <button onClick={() => speak('Top geniş kapıdan geçti. Dar kapıdan geçemedi.')} className="grid grid-cols-2 gap-3 w-full max-w-md mx-auto rounded-3xl bg-white p-3 shadow-lg active:scale-[.99]">
        <span><KapiAnimasyon genis /><span className="block text-xl font-black text-slate-800">geniş kapı</span></span>
        <span><KapiAnimasyon genis={false} /><span className="block text-xl font-black text-slate-800">dar kapı</span></span>
      </button>
      <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
        {ESYALAR.map((e) => (
          <div key={e.ad} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
            {([['geniş', 3], ['dar', 0]] as const).map(([k, i]) => (
              <button key={k} onClick={() => speak(`Bu ${e.ad} ${k}.`)} className="rounded-2xl overflow-hidden active:scale-95">
                <span className="block aspect-square overflow-hidden rounded-2xl">{e.ciz(i)}</span>
                <span className="block text-lg font-black text-slate-800">{k} {e.ad}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  </OyunCercevesi>
);

const GenisDarCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => (
  <AsamaliCalisma id="genisDarCalis" baslik="Geniş / Dar" emoji="🚪" onBack={onBack} onSorular={onSorular}
    aciklama="Aynı eşya, aynı yer; yalnız eni farklı. Önce yalnız “geniş”, sonra yalnız “dar”; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Top geniş kapıdan geçer, dar kapıda takılır; geniş ve dar eşyalar"
    asamalar={[
      { ad: 'Geniş · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(true, BELIRGIN)) },
      { ad: 'Dar · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(false, BELIRGIN)) },
    ]}
    karisik={{ alt: '30 soru, geniş ve dar karışık; enler birbirine yakın', secenek: 2,
      turlar: () => Array.from({ length: 30 }, () => tur(zar(2) === 0, YAKIN)) }} />
);

export default GenisDarCalis;
