import React, { useId } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { ParlakMatCiz } from './ParlakMatCalis.tsx';
import { SekilCiz } from './SekilCalis.tsx';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Şeffaf / Opak (Gökhan Hoca, 2026-10-29): her soruda aynı kap, içinde aynı nesne. Şeffaf kapta nesne net görünür,
// opak kapta hiç görünmez. Kap biçimi ve rengi aynı, yalnız malzeme değişir (kodla çizilir).
// Sıra: önce yalnız "şeffaf", sonra yalnız "opak" (2 şık → 3 şık), en son karışık.
type Kap = 'kavanoz' | 'bardak' | 'kutu';
type Ic = 'top' | 'elma' | 'yıldız';
const KAPLAR: Kap[] = ['kavanoz', 'bardak', 'kutu'];
const ICLER: Ic[] = ['top', 'elma', 'yıldız'];
const RENKLER = ['#2563eb', '#16a34a', '#d97706', '#7c3aed', '#0891b2', '#db2777'];
const IC_RENK: Record<Ic, string> = { top: '#ef4444', elma: '#dc2626', 'yıldız': '#f59e0b' };

const GOVDE: Record<Kap, string> = {
  kavanoz: 'M26 30 C20 30 18 35 18 41 V84 C18 90 22 94 28 94 H72 C78 94 82 90 82 84 V41 C82 35 80 30 74 30 Z',
  bardak: 'M20 14 H80 L73 94 H27 Z',
  kutu: 'M16 30 H84 V92 H16 Z',
};

export const KapCiz: React.FC<{ kap: Kap; ic: Ic; renk: string; seffaf: boolean; className?: string }> = ({ kap, ic, renk, seffaf, className }) => {
  const k = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={`${kap} ${seffaf ? 'şeffaf' : 'opak'}`}>
      <defs>
        <linearGradient id={`o${k}`} x1="0" x2="1">
          <stop offset="0" stopColor={renk} stopOpacity="0.75" /><stop offset="0.3" stopColor={renk} /><stop offset="1" stopColor={renk} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="96" rx="34" ry="3" fill="#000" opacity="0.12" />
      {/* İçteki nesne: yalnız şeffaf kapta çizilir */}
      {seffaf && (
        <svg x="27" y={kap === 'bardak' ? 46 : 48} width="46" height="46" viewBox="0 0 100 100">
          {ic === 'yıldız' ? <SekilCiz ad="yıldız" renk={IC_RENK[ic]} /> : <ParlakMatCiz ad={ic} renk={IC_RENK[ic]} parlak={false} />}
        </svg>
      )}
      {seffaf ? (
        <>
          <path d={GOVDE[kap]} fill={renk} fillOpacity="0.08" stroke={renk} strokeWidth="2.5" />
          <rect x={kap === 'bardak' ? 26 : 23} y={kap === 'kavanoz' ? 38 : kap === 'kutu' ? 36 : 22} width="5" height="44" rx="2.5" fill="#fff" opacity="0.7" />
        </>
      ) : (
        <path d={GOVDE[kap]} fill={`url(#o${k})`} stroke={renk} strokeWidth="2.5" />
      )}
      {kap === 'kavanoz' && <rect x="24" y="18" width="52" height="13" rx="3" fill="#9ca3af" stroke="#6b7280" strokeWidth="1.5" />}
      {kap === 'kutu' && <rect x="12" y="22" width="76" height="10" rx="2" fill={seffaf ? renk : renk} fillOpacity={seffaf ? 0.25 : 1} stroke={renk} strokeWidth="2.5" />}
    </svg>
  );
};

const tur = (k: 'şeffaf' | 'opak', n: number): Tur => {
  const kap = KAPLAR[zar(KAPLAR.length)], ic = ICLER[zar(ICLER.length)], renk = RENKLER[zar(RENKLER.length)];
  const siklar = karistir([k, ...Array.from({ length: n - 1 }, (_, i) => `${k === 'şeffaf' ? 'opak' : 'şeffaf'}-${i}`)]);
  return {
    soru: `Hangi ${kap} ${k}?`, dogruId: k, dogruSoz: `Evet! Bu ${kap} ${k}.`,
    secenekler: siklar.map((s) => ({ id: s, icerik: <KapCiz kap={kap} ic={ic} renk={renk} seffaf={s.startsWith('şeffaf')} className="w-full aspect-square p-2" /> })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Şeffaf / Opak" emoji="🫙" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
      <div className="grid grid-cols-1 landscape:grid-cols-3 gap-3 w-full max-w-4xl mx-auto">
        {KAPLAR.map((kap, i) => (
          <div key={kap} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
            {(['şeffaf', 'opak'] as const).map((k) => (
              <button key={k} onClick={() => speak(`Bu ${kap} ${k}.`)} className="rounded-2xl active:scale-95">
                <KapCiz kap={kap} ic={ICLER[i]} renk={RENKLER[i]} seffaf={k === 'şeffaf'} className="w-full aspect-square" />
                <span className="block text-xl font-black text-slate-800">{k}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 text-center max-w-md mx-auto">Şeffaf kabın içi görünür. Opak kabın içi görünmez. Evde de deneyin: cam bardağa ve kupaya aynı oyuncağı koyun, "Hangisinde görüyorsun?" diye sorun.</p>
    </div>
  </OyunCercevesi>
);

const SeffafOpakCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => (
  <AsamaliCalisma id="seffafOpakCalis" baslik="Şeffaf / Opak" emoji="🫙" onBack={onBack} onSorular={onSorular}
    aciklama="Aynı kap, içinde aynı nesne. Şeffaf kapta nesne görünür, opak kapta görünmez. Önce yalnız “şeffaf”, sonra yalnız “opak”; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Şeffaf ve opak kaplar, dokun ve dinle"
    asamalar={[
      { ad: 'Şeffaf · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur('şeffaf', 2)) },
      { ad: 'Şeffaf · 3 şık', alt: '10 soru', secenek: 3, turlar: () => on(() => tur('şeffaf', 3)) },
      { ad: 'Opak · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur('opak', 2)) },
      { ad: 'Opak · 3 şık', alt: '10 soru', secenek: 3, turlar: () => on(() => tur('opak', 3)) },
    ]}
    karisik={{ alt: '30 soru, şeffaf ve opak karışık', secenek: 3, turlar: () => Array.from({ length: 30 }, () => tur(zar(2) ? 'şeffaf' : 'opak', 2 + zar(2))) }} />
);

export default SeffafOpakCalis;
