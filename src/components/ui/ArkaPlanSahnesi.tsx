import React from 'react';

// Videosuz arka plan sahneleri (Kaan, 2026-10-06: "videosuz daha değişik temalar; profesyonel ve oyun gibi").
// Sade temanın arkasında durur; arayüz Sade tema gibi açık renkli kalır (yazılar okunur).
// Hareketler yavaş ve azdır; etkinlik oynanırken (sakin) sahne durur ve soluklaşır, dikkat dağıtmaz.
export type SahneId = 'yok' | 'orman' | 'deniz' | 'gokkusagi' | 'konfeti';

export const SAHNELER: Array<{ id: SahneId; ad: string; onizleme: string; zemin: string }> = [
  { id: 'yok', ad: 'Sade', onizleme: 'bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100', zemin: 'bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100' },
  { id: 'orman', ad: 'Orman', onizleme: 'bg-gradient-to-b from-sky-200 via-lime-100 to-green-300', zemin: 'bg-gradient-to-b from-sky-100 via-emerald-50 to-lime-100' },
  { id: 'deniz', ad: 'Deniz', onizleme: 'bg-gradient-to-b from-sky-200 via-cyan-100 to-sky-400', zemin: 'bg-gradient-to-b from-sky-100 via-cyan-50 to-sky-100' },
  { id: 'gokkusagi', ad: 'Gökkuşağı', onizleme: 'bg-gradient-to-br from-rose-200 via-amber-100 to-sky-200', zemin: 'bg-gradient-to-b from-sky-100 via-rose-50 to-amber-50' },
  { id: 'konfeti', ad: 'Konfeti', onizleme: 'bg-gradient-to-br from-fuchsia-200 via-amber-100 to-teal-200', zemin: 'bg-gradient-to-br from-fuchsia-50 via-amber-50 to-teal-50' },
];

const STIL = `
@keyframes aps-suzul { from { transform: translateX(-20vw); } to { transform: translateX(120vw); } }
@keyframes aps-dalga { from { transform: translateX(0); } to { transform: translateX(-600px); } }
@keyframes aps-sallan { 0%,100% { transform: translateY(0) rotate(-2deg); } 50% { transform: translateY(6px) rotate(2deg); } }
@keyframes aps-yuksel { from { transform: translateY(0); } to { transform: translateY(-115vh); } }
@keyframes aps-don { to { transform: rotate(360deg); } }
@keyframes aps-uc { 0%,100% { transform: translate(0,0) rotate(0deg); } 50% { transform: translate(10px,-14px) rotate(20deg); } }
.aps-sakin * { animation-play-state: paused !important; }
@media (prefers-reduced-motion: reduce) { .aps-kok * { animation: none !important; } }
`;

const Bulut: React.FC<{ y: string; s: number; sure: number; gecikme: number }> = ({ y, s, sure, gecikme }) => (
  <div className="absolute left-0" style={{ top: y, animation: `aps-suzul ${sure}s linear ${-gecikme}s infinite` }}>
    <svg width={120 * s} height={50 * s} viewBox="0 0 120 50" aria-hidden="true">
      <g fill="#ffffff" opacity="0.92">
        <ellipse cx="35" cy="32" rx="28" ry="16" /><ellipse cx="62" cy="24" rx="28" ry="20" /><ellipse cx="88" cy="33" rx="26" ry="14" />
      </g>
    </svg>
  </div>
);

const Gunes: React.FC<{ renk?: string }> = ({ renk = '#fcd34d' }) => (
  <svg className="absolute right-[6%] top-[5%] w-24 h-24 sm:w-32 sm:h-32" viewBox="0 0 100 100" aria-hidden="true">
    <g style={{ transformOrigin: '50px 50px', animation: 'aps-don 60s linear infinite' }} stroke={renk} strokeWidth="5" strokeLinecap="round" opacity="0.8">
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return <line key={i} x1={50 + Math.cos(a) * 32} y1={50 + Math.sin(a) * 32} x2={50 + Math.cos(a) * 44} y2={50 + Math.sin(a) * 44} />;
      })}
    </g>
    <circle cx="50" cy="50" r="24" fill={renk} />
  </svg>
);

const Agac: React.FC<{ x: number; y: number; k: number; renk: string }> = ({ x, y, k, renk }) => (
  <g transform={`translate(${x} ${y}) scale(${k})`}>
    <rect x="-6" y="0" width="12" height="40" rx="3" fill="#92400e" />
    <circle cx="0" cy="-10" r="30" fill={renk} />
    <circle cx="-20" cy="6" r="20" fill={renk} />
    <circle cx="20" cy="6" r="20" fill={renk} />
  </g>
);

const Orman = () => (
  <>
    <Gunes />
    <Bulut y="10%" s={1.1} sure={140} gecikme={20} />
    <Bulut y="22%" s={0.8} sure={180} gecikme={110} />
    <svg className="absolute bottom-0 left-0 w-full h-[42%]" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d="M0 230 Q 200 150 420 220 T 820 200 T 1200 210 V400 H0Z" fill="#bbf7d0" />
      <Agac x={140} y={205} k={1.1} renk="#4ade80" />
      <Agac x={330} y={215} k={0.8} renk="#22c55e" />
      <Agac x={880} y={200} k={1} renk="#4ade80" />
      <Agac x={1080} y={210} k={1.25} renk="#22c55e" />
      <path d="M0 300 Q 300 240 600 290 T 1200 280 V400 H0Z" fill="#86efac" />
      <path d="M0 350 Q 350 310 700 345 T 1200 340 V400 H0Z" fill="#4ade80" />
      {[180, 420, 640, 960, 1110].map((x, i) => (
        <g key={i} transform={`translate(${x} ${355 + (i % 2) * 12})`}>
          <circle r="7" fill={['#f472b6', '#facc15', '#fb7185', '#a78bfa', '#facc15'][i]} /><circle r="3" fill="#fff7ed" />
        </g>
      ))}
    </svg>
  </>
);

const Deniz = () => (
  <>
    <Gunes renk="#fde68a" />
    <Bulut y="12%" s={1} sure={160} gecikme={40} />
    <svg className="absolute left-[12%] top-[18%] w-24 h-10" viewBox="0 0 100 40" aria-hidden="true" style={{ animation: 'aps-uc 9s ease-in-out infinite' }}>
      <path d="M10 20 q12 -12 24 0 q12 -12 24 0" fill="none" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      <path d="M60 10 q8 -8 16 0 q8 -8 16 0" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
    <div className="absolute bottom-[19%] left-[58%] w-24 h-24" style={{ animation: 'aps-sallan 6s ease-in-out infinite' }}>
      <svg viewBox="0 0 100 100" aria-hidden="true">
        <path d="M52 10 V70 H22 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M56 22 V70 H80 Z" fill="#fda4af" />
        <path d="M14 74 H88 L76 90 H26 Z" fill="#f97316" />
      </svg>
    </div>
    {[{ b: '0%', h: '26%', r: '#7dd3fc', s: 26 }, { b: '0%', h: '19%', r: '#38bdf8', s: 18 }, { b: '0%', h: '11%', r: '#0ea5e9', s: 12 }].map((d, i) => (
      <div key={i} className="absolute left-0 w-[calc(100%+600px)] overflow-hidden" style={{ bottom: d.b, height: d.h }}>
        <svg className="w-full h-full" viewBox="0 0 1800 100" preserveAspectRatio="none" aria-hidden="true" style={{ animation: `aps-dalga ${d.s}s linear infinite` }}>
          <path d={`M0 30 ${Array.from({ length: 12 }, (_, k) => `Q ${k * 150 + 75} ${k % 2 ? 50 : 10} ${(k + 1) * 150} 30`).join(' ')} V100 H0Z`} fill={d.r} opacity="0.9" />
        </svg>
      </div>
    ))}
  </>
);

const Gokkusagi = () => (
  <>
    <Bulut y="8%" s={1.2} sure={150} gecikme={10} />
    <Bulut y="26%" s={0.9} sure={190} gecikme={95} />
    <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] sm:w-full max-w-[1100px]" viewBox="0 0 1000 420" aria-hidden="true">
      {['#f87171', '#fb923c', '#facc15', '#4ade80', '#38bdf8', '#818cf8', '#c084fc'].map((c, i) => (
        <path key={c} d={`M ${60 + i * 26} 420 A ${440 - i * 26} ${380 - i * 26} 0 0 1 ${940 - i * 26} 420`} fill="none" stroke={c} strokeWidth="26" opacity="0.55" />
      ))}
      <g fill="#ffffff"><ellipse cx="90" cy="405" rx="110" ry="40" /><ellipse cx="910" cy="405" rx="110" ry="40" /></g>
    </svg>
    {[{ x: '8%', c: '#f472b6', s: 38, g: 0 }, { x: '78%', c: '#60a5fa', s: 46, g: 18 }, { x: '45%', c: '#facc15', s: 52, g: 33 }].map((b, i) => (
      <div key={i} className="absolute bottom-[-90px]" style={{ left: b.x, animation: `aps-yuksel ${b.s}s linear ${-b.g}s infinite` }}>
        <svg width="44" height="86" viewBox="0 0 44 86" aria-hidden="true">
          <ellipse cx="22" cy="24" rx="18" ry="22" fill={b.c} opacity="0.85" />
          <ellipse cx="15" cy="16" rx="4" ry="7" fill="#ffffff" opacity="0.5" />
          <path d="M22 46 q-6 12 0 20 q6 8 0 20" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        </svg>
      </div>
    ))}
  </>
);

const KONFETI = Array.from({ length: 22 }, (_, i) => ({
  x: (i * 37) % 100, y: (i * 53) % 100, tur: i % 3, renk: ['#f472b6', '#facc15', '#34d399', '#60a5fa', '#a78bfa', '#fb923c'][i % 6],
  boy: 14 + ((i * 7) % 16), sure: 7 + (i % 5) * 2, gecikme: (i * 1.3) % 8,
}));
const Konfeti = () => (
  <>
    {KONFETI.map((k, i) => (
      <svg key={i} className="absolute" style={{ left: `${k.x}%`, top: `${k.y}%`, width: k.boy, height: k.boy, animation: `aps-uc ${k.sure}s ease-in-out ${-k.gecikme}s infinite`, opacity: 0.55 }} viewBox="0 0 20 20" aria-hidden="true">
        {k.tur === 0 && <circle cx="10" cy="10" r="8" fill={k.renk} />}
        {k.tur === 1 && <path d="M10 1 L12.6 7.2 L19 7.6 L14 11.8 L15.6 18.4 L10 14.8 L4.4 18.4 L6 11.8 L1 7.6 L7.4 7.2 Z" fill={k.renk} />}
        {k.tur === 2 && <path d="M10 2 L18 17 H2 Z" fill={k.renk} />}
      </svg>
    ))}
  </>
);

const ArkaPlanSahnesi: React.FC<{ sahne: SahneId; sakin?: boolean }> = ({ sahne, sakin }) => {
  if (sahne === 'yok') return null;
  return (
    <div
      className={`aps-kok absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-700 print:hidden ${sakin ? 'aps-sakin opacity-30' : 'opacity-100'}`}
      aria-hidden="true"
    >
      <style>{STIL}</style>
      {sahne === 'orman' && <Orman />}
      {sahne === 'deniz' && <Deniz />}
      {sahne === 'gokkusagi' && <Gokkusagi />}
      {sahne === 'konfeti' && <Konfeti />}
    </div>
  );
};

export default React.memo(ArkaPlanSahnesi);
