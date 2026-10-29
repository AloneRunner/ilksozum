import React, { useEffect, useState } from 'react';

// Terazi (Gökhan Hoca, 2026-10-29: "ağır-hafif soyut kalıyor; terazi olsun, iki nesneyi koysun, ağırlığına kendi karar versin").
// Kefelere iki resim konur; terazi önce düz durur, sonra ağır tarafa yavaşça iner. egim: -1 sol ağır, 1 sağ ağır, 0 düz.
const L = 70, ACI = 14;

export const Terazi: React.FC<{ sol?: string; sag?: string; egim: -1 | 0 | 1; className?: string }> = ({ sol, sag, egim, className }) => {
  const [simdi, setSimdi] = useState<-1 | 0 | 1>(0);
  // Önce düz, kısa beklemeden sonra iner (çocuk "ne olacak" diye baksın)
  useEffect(() => { setSimdi(0); const z = setTimeout(() => setSimdi(egim), 700); return () => clearTimeout(z); }, [egim, sol, sag]);
  const a = simdi * ACI; // derece (SVG'de artı = saat yönü); sol ağır → -ACI → sol kol aşağı
  const dy = L * Math.sin((a * Math.PI) / 180);
  const gecis = { transition: 'transform 1.2s cubic-bezier(.3,1.4,.5,1)' };
  const kefe = (x: number, kayma: number, resim?: string) => (
    <g style={{ ...gecis, transform: `translateY(${kayma}px)` }}>
      <line x1={x} y1="40" x2={x - 22} y2="78" stroke="#64748b" strokeWidth="1.5" />
      <line x1={x} y1="40" x2={x + 22} y2="78" stroke="#64748b" strokeWidth="1.5" />
      {/* Fotoğraflar beyaz kartta: kırık beyaz zeminler kefede dağınık kare gibi görünmesin */}
      {resim && <rect x={x - 32} y="14" width="64" height="64" rx="10" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />}
      {resim && <image href={resim} x={x - 29} y="17" width="58" height="58" preserveAspectRatio="xMidYMid meet" />}
      <path d={`M${x - 28} 78 Q${x} 92 ${x + 28} 78 Z`} fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
    </g>
  );
  return (
    <svg viewBox="0 -10 200 160" className={className} role="img" aria-label="terazi">
      <rect x="92" y="40" width="16" height="96" rx="4" fill="#94a3b8" />
      <rect x="62" y="132" width="76" height="10" rx="5" fill="#64748b" />
      <g style={{ ...gecis, transform: `rotate(${a}deg)`, transformOrigin: '100px 40px' }}>
        <rect x={100 - L - 4} y="36" width={2 * L + 8} height="8" rx="4" fill="#475569" />
      </g>
      {kefe(100 - L, -dy, sol)}
      {kefe(100 + L, dy, sag)}
      <circle cx="100" cy="40" r="7" fill="#334155" />
      <polygon points="100,52 94,62 106,62" fill={simdi === 0 ? '#22c55e' : '#94a3b8'} />
    </svg>
  );
};

export default Terazi;
