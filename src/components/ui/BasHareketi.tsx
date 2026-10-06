import React from 'react';

// Evet/Hayır baş hareketi (Kaan: "çocuklar baş hareketini bilmiyor"). Eski GIF'lerin yerine kodla çizilmiş yüz:
// Evet = gülümseyen yüz başını aşağı-yukarı sallar; Hayır = düz ağızlı yüz başını sağa-sola sallar.
// Hareket yön okuyla birlikte gösterilir; "hareketi azalt" ayarında durur.

const STIL = `
@keyframes bh-evet { 0%,100% { transform: translateY(0) rotate(0deg); } 20% { transform: translateY(9px) rotate(0deg) scaleY(0.97); } 40% { transform: translateY(0); } 60% { transform: translateY(9px) scaleY(0.97); } 80% { transform: translateY(0); } }
@keyframes bh-hayir { 0%,100% { transform: translateX(0) rotate(0deg); } 20% { transform: translateX(-10px) rotate(-7deg); } 40% { transform: translateX(10px) rotate(7deg); } 60% { transform: translateX(-10px) rotate(-7deg); } 80% { transform: translateX(10px) rotate(7deg); } }
@media (prefers-reduced-motion: reduce) { .bh-bas { animation: none !important; } }
`;

const BasHareketi: React.FC<{ tur: 'evet' | 'hayir'; className?: string }> = ({ tur, className }) => {
  const evet = tur === 'evet';
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label={evet ? 'Evet, baş sallama' : 'Hayır, baş sallama'}>
      <style>{STIL}</style>
      {/* yön okları */}
      {evet ? (
        <g stroke="#16a34a" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7">
          <path d="M108 30 V62" /><path d="M102 36 L108 28 L114 36" /><path d="M102 56 L108 64 L114 56" />
        </g>
      ) : (
        <g stroke="#dc2626" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7">
          <path d="M34 112 H86" /><path d="M40 106 L32 112 L40 118" /><path d="M80 106 L88 112 L80 118" />
        </g>
      )}
      <g className="bh-bas" style={{ transformOrigin: '60px 96px', animation: `${evet ? 'bh-evet' : 'bh-hayir'} 1.6s ease-in-out infinite` }}>
        {/* boyun ve omuz izi */}
        <rect x="50" y="86" width="20" height="14" rx="6" fill="#f5c9a3" />
        {/* baş */}
        <circle cx="60" cy="56" r="36" fill="#fcd9b8" stroke="#e8b48c" strokeWidth="2" />
        {/* saç */}
        <path d="M25 50 C26 26 44 16 60 16 C78 16 95 26 95 50 C88 38 74 32 60 33 C46 32 32 38 25 50 Z" fill="#7c4a24" />
        {/* kulaklar */}
        <circle cx="24" cy="58" r="6" fill="#f5c9a3" /><circle cx="96" cy="58" r="6" fill="#f5c9a3" />
        {/* gözler */}
        <circle cx="47" cy="56" r="4.5" fill="#1f2937" /><circle cx="73" cy="56" r="4.5" fill="#1f2937" />
        <circle cx="48.5" cy="54.5" r="1.4" fill="#fff" /><circle cx="74.5" cy="54.5" r="1.4" fill="#fff" />
        {/* yanaklar */}
        <circle cx="40" cy="68" r="5" fill="#fca5a5" opacity="0.55" /><circle cx="80" cy="68" r="5" fill="#fca5a5" opacity="0.55" />
        {/* ağız */}
        {evet
          ? <path d="M46 72 Q60 86 74 72" stroke="#9a3412" strokeWidth="4" fill="none" strokeLinecap="round" />
          : <path d="M50 77 H70" stroke="#9a3412" strokeWidth="4" fill="none" strokeLinecap="round" />}
      </g>
    </svg>
  );
};

export default React.memo(BasHareketi);
