import React from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { YUKARI_SETLER, yukariSoru, yukariDogru, type YukariSet, type DikeySahne } from '../../data/yukariAsagi.ts';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Yukarıda / Aşağıda (Gökhan Hoca, 2026-10-29): dikey sahneler (kitaplık, ağaç, merdiven, gökyüzü–yer), kodla çizilir;
// iki şıkta sahne aynı, yalnız nesnenin yüksekliği değişir. Masa/tabure/sandalye kullanılmaz (üstünde–altında ile karışıyor).
// Sıra: Tanı → yalnız "yukarıda" → yalnız "aşağıda" → karışık.
const url = (s: YukariSet) => `/images/ozel/kesik/${s.dosya}.webp`;

// Her sahnede nesnenin yukarıdaki ve aşağıdaki yeri: alt kenar y, orta x, yükseklik
const YER: Record<DikeySahne, { ust: [number, number]; alt: [number, number]; boy: number }> = {
  kitaplik: { ust: [56, 80], alt: [206, 80], boy: 38 },
  agac: { ust: [76, 118], alt: [204, 118], boy: 38 },
  merdiven: { ust: [44, 104], alt: [206, 62], boy: 36 },
  gokyuzu: { ust: [84, 80], alt: [200, 80], boy: 62 },
};

const Arka: React.FC<{ sahne: DikeySahne }> = ({ sahne }) => {
  if (sahne === 'kitaplik') return (
    <>
      <rect width="160" height="220" fill="#f8fafc" />
      <rect x="28" y="8" width="104" height="204" rx="3" fill="#b07a45" />
      <rect x="34" y="14" width="92" height="192" fill="#f3e3c8" />
      {[60, 110, 160].map((y) => <rect key={y} x="34" y={y - 2} width="92" height="5" fill="#b07a45" />)}
      <rect x="34" y="206" width="92" height="6" fill="#b07a45" />
      {/* orta raflarda kitaplar (dolu görünsün) */}
      {[['#ef4444', 40], ['#3b82f6', 48], ['#22c55e', 56], ['#f59e0b', 64], ['#a855f7', 72]].map(([r, x]) => <rect key={String(x)} x={x as number} y="72" width="7" height="36" fill={r as string} />)}
      {[['#0ea5e9', 96], ['#f43f5e', 104], ['#84cc16', 112]].map(([r, x]) => <rect key={String(x)} x={x as number} y="122" width="7" height="36" fill={r as string} />)}
    </>
  );
  if (sahne === 'agac') return (
    <>
      <rect width="160" height="220" fill="#e0f2fe" />
      <rect y="196" width="160" height="24" fill="#86c95a" />
      <rect x="66" y="70" width="18" height="132" rx="4" fill="#8b5a2b" />
      <path d="M82 80 L140 72 L140 79 L82 90 Z" fill="#8b5a2b" />
      <circle cx="75" cy="44" r="36" fill="#22c55e" /><circle cx="48" cy="58" r="22" fill="#16a34a" /><circle cx="104" cy="54" r="24" fill="#16a34a" />
    </>
  );
  if (sahne === 'merdiven') return (
    <>
      <rect width="160" height="220" fill="#f8fafc" />
      <rect y="206" width="160" height="14" fill="#e2e8f0" />
      <line x1="44" y1="208" x2="82" y2="14" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
      <line x1="96" y1="208" x2="134" y2="14" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
      {Array.from({ length: 8 }, (_, i) => { const y = 188 - i * 24; const t = (208 - y) / 194; return <line key={i} x1={44 + 38 * t} y1={y} x2={96 + 38 * t} y2={y} stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />; })}
    </>
  );
  return (
    <>
      <defs><linearGradient id="gok" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#7dd3fc" /><stop offset="1" stopColor="#e0f2fe" /></linearGradient></defs>
      <rect width="160" height="220" fill="url(#gok)" />
      <circle cx="132" cy="28" r="14" fill="#fde047" />
      <ellipse cx="40" cy="40" rx="22" ry="9" fill="#fff" /><ellipse cx="110" cy="70" rx="18" ry="7" fill="#fff" />
      <rect y="192" width="160" height="28" fill="#86c95a" />
    </>
  );
};

export const DikeySahneCiz: React.FC<{ s: YukariSet; yukari: boolean; className?: string }> = ({ s, yukari, className }) => {
  const y = YER[s.sahne];
  const [altY, cx] = yukari ? y.ust : y.alt;
  const havada = s.sahne === 'gokyuzu' && yukari;
  return (
    <svg viewBox="0 0 160 220" className={className} role="img" aria-label={`${s.nesne} ${yukari ? 'yukarıda' : 'aşağıda'}`}>
      <Arka sahne={s.sahne} />
      {!havada && <ellipse cx={cx} cy={altY} rx={y.boy * 0.42} ry={3} fill="#000" opacity={0.18} />}
      <image href={url(s)} x={cx - y.boy * 0.7} y={altY - y.boy} width={y.boy * 1.4} height={y.boy} preserveAspectRatio="xMidYMax meet" />
    </svg>
  );
};

const tur = (yukari: boolean): Tur => {
  const s = YUKARI_SETLER[zar(YUKARI_SETLER.length)];
  return {
    soru: yukariSoru(s, yukari), dogruId: yukari ? 'yukari' : 'asagi', dogruSoz: yukariDogru(s, yukari),
    secenekler: karistir(['yukari', 'asagi']).map((id) => ({ id, icerik: <DikeySahneCiz s={s} yukari={id === 'yukari'} className="w-full aspect-[160/220]" /> })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const ornek = [YUKARI_SETLER[0], YUKARI_SETLER[6], YUKARI_SETLER[8], YUKARI_SETLER[10]];
  return (
    <OyunCercevesi baslik="Yukarıda / Aşağıda" emoji="⬆️" onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
          {ornek.map((s, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
              {([true, false] as const).map((u) => (
                <button key={String(u)} onClick={() => speak(yukariDogru(s, u).replace(/^Evet! /, ''))} className="rounded-2xl overflow-hidden active:scale-95">
                  <DikeySahneCiz s={s} yukari={u} className="w-full aspect-[160/220]" />
                  <span className="block text-lg font-black text-slate-800">{u ? 'yukarıda' : 'aşağıda'}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </OyunCercevesi>
  );
};

const YukariAsagiCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => (
  <AsamaliCalisma id="yukariAsagiCalis" baslik="Yukarıda / Aşağıda" emoji="⬆️" onBack={onBack} onSorular={onSorular}
    aciklama="Kitaplık, ağaç, merdiven, gökyüzü: aynı yer, yalnız nesnenin yüksekliği farklı. Önce “yukarıda”, sonra “aşağıda”; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Yukarıda ve aşağıda, dokun ve dinle"
    asamalar={[
      { ad: 'Yukarıda · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(true)) },
      { ad: 'Aşağıda · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(false)) },
    ]}
    karisik={{ alt: '30 soru, yukarıda ve aşağıda karışık', secenek: 2, turlar: () => Array.from({ length: 30 }, () => tur(zar(2) === 0)) }} />
);

export default YukariAsagiCalis;
