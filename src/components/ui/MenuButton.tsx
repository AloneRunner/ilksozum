import React from 'react';

type ButtonColor = 'sky' | 'amber' | 'teal' | 'indigo' | 'rose' | 'cyan' | 'lime' | 'purple' | 'orange' | 'pink' | 'blue' | 'emerald' | 'fuchsia';
type ThemeKey = 'simple' | 'gunes' | 'tilki' | 'ay' | 'geceorman' | 'yagmur' | 'kus' | 'tilki2' | 'kedi' | 'kar' | 'gunbatimi' | 'ay2' | 'zurafa' | 'geometri' | 'deneme';

interface MenuButtonProps {
  icon: React.FC<{ className?: string }>;
  title: string;
  subtitle: string;
  onClick: () => void;
  color: ButtonColor;
  theme: string;
  children?: React.ReactNode;
  disabled?: boolean;
  badge?: string;
  isUnderDevelopment?: boolean;
}

const themeConfig: Record<ThemeKey, any> = {
  simple: {
    // Her renk kombinasyonu farklı ve özel
    sky: { bg: 'bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100', iconBg: 'bg-gradient-to-br from-sky-300 to-blue-400', iconText: 'text-white', title: 'text-sky-900', subtitle: 'text-sky-700', ring: 'focus:ring-sky-300', border: 'border-sky-200/60', glow: 'shadow-[0_8px_20px_rgba(14,165,233,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(14,165,233,0.35)]' },
    amber: { bg: 'bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100', iconBg: 'bg-gradient-to-br from-amber-300 to-orange-400', iconText: 'text-white', title: 'text-amber-900', subtitle: 'text-amber-700', ring: 'focus:ring-amber-300', border: 'border-amber-200/60', glow: 'shadow-[0_8px_20px_rgba(251,191,36,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(251,191,36,0.35)]' },
    teal: { bg: 'bg-gradient-to-br from-teal-100 via-emerald-50 to-green-100', iconBg: 'bg-gradient-to-br from-teal-300 to-emerald-400', iconText: 'text-white', title: 'text-teal-900', subtitle: 'text-teal-700', ring: 'focus:ring-teal-300', border: 'border-teal-200/60', glow: 'shadow-[0_8px_20px_rgba(20,184,166,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(20,184,166,0.35)]' },
    indigo: { bg: 'bg-gradient-to-br from-indigo-100 via-purple-50 to-violet-100', iconBg: 'bg-gradient-to-br from-indigo-300 to-purple-400', iconText: 'text-white', title: 'text-indigo-900', subtitle: 'text-indigo-700', ring: 'focus:ring-indigo-300', border: 'border-indigo-200/60', glow: 'shadow-[0_8px_20px_rgba(99,102,241,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(99,102,241,0.35)]' },
    rose: { bg: 'bg-gradient-to-br from-rose-100 via-pink-50 to-red-100', iconBg: 'bg-gradient-to-br from-rose-300 to-pink-400', iconText: 'text-white', title: 'text-rose-900', subtitle: 'text-rose-700', ring: 'focus:ring-rose-300', border: 'border-rose-200/60', glow: 'shadow-[0_8px_20px_rgba(244,63,94,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(244,63,94,0.35)]' },
    cyan: { bg: 'bg-gradient-to-br from-cyan-100 via-teal-50 to-sky-100', iconBg: 'bg-gradient-to-br from-cyan-300 to-teal-400', iconText: 'text-white', title: 'text-cyan-900', subtitle: 'text-cyan-700', ring: 'focus:ring-cyan-300', border: 'border-cyan-200/60', glow: 'shadow-[0_8px_20px_rgba(6,182,212,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(6,182,212,0.35)]' },
    lime: { bg: 'bg-gradient-to-br from-lime-100 via-green-50 to-emerald-100', iconBg: 'bg-gradient-to-br from-lime-300 to-green-400', iconText: 'text-white', title: 'text-lime-900', subtitle: 'text-lime-700', ring: 'focus:ring-lime-300', border: 'border-lime-200/60', glow: 'shadow-[0_8px_20px_rgba(132,204,22,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(132,204,22,0.35)]' },
    purple: { bg: 'bg-gradient-to-br from-purple-100 via-fuchsia-50 to-pink-100', iconBg: 'bg-gradient-to-br from-purple-300 to-fuchsia-400', iconText: 'text-white', title: 'text-purple-900', subtitle: 'text-purple-700', ring: 'focus:ring-purple-300', border: 'border-purple-200/60', glow: 'shadow-[0_8px_20px_rgba(168,85,247,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(168,85,247,0.35)]' },
    orange: { bg: 'bg-gradient-to-br from-orange-100 via-red-50 to-rose-100', iconBg: 'bg-gradient-to-br from-orange-300 to-red-400', iconText: 'text-white', title: 'text-orange-900', subtitle: 'text-orange-700', ring: 'focus:ring-orange-300', border: 'border-orange-200/60', glow: 'shadow-[0_8px_20px_rgba(249,115,22,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(249,115,22,0.35)]' },
    pink: { bg: 'bg-gradient-to-br from-pink-100 via-rose-50 to-fuchsia-100', iconBg: 'bg-gradient-to-br from-pink-300 to-rose-400', iconText: 'text-white', title: 'text-pink-900', subtitle: 'text-pink-700', ring: 'focus:ring-pink-300', border: 'border-pink-200/60', glow: 'shadow-[0_8px_20px_rgba(236,72,153,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(236,72,153,0.35)]' },
    blue: { bg: 'bg-gradient-to-br from-blue-100 via-indigo-50 to-sky-100', iconBg: 'bg-gradient-to-br from-blue-300 to-indigo-400', iconText: 'text-white', title: 'text-blue-900', subtitle: 'text-blue-700', ring: 'focus:ring-blue-300', border: 'border-blue-200/60', glow: 'shadow-[0_8px_20px_rgba(59,130,246,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(59,130,246,0.35)]' },
    emerald: { bg: 'bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100', iconBg: 'bg-gradient-to-br from-emerald-300 to-green-400', iconText: 'text-white', title: 'text-emerald-900', subtitle: 'text-emerald-700', ring: 'focus:ring-emerald-300', border: 'border-emerald-200/60', glow: 'shadow-[0_8px_20px_rgba(16,185,129,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(16,185,129,0.35)]' },
    fuchsia: { bg: 'bg-gradient-to-br from-fuchsia-100 via-purple-50 to-pink-100', iconBg: 'bg-gradient-to-br from-fuchsia-300 to-purple-400', iconText: 'text-white', title: 'text-fuchsia-900', subtitle: 'text-fuchsia-700', ring: 'focus:ring-fuchsia-300', border: 'border-fuchsia-200/60', glow: 'shadow-[0_8px_20px_rgba(217,70,239,0.25)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(217,70,239,0.35)]' },
  },
  gunes: { bg: 'bg-gradient-to-br from-yellow-200/90 via-amber-200/85 to-orange-200/80', iconBg: 'bg-gradient-to-br from-yellow-300 to-amber-400', iconText: 'text-white', title: 'text-orange-900', subtitle: 'text-orange-700', ring: 'focus:ring-amber-300', border: 'border-yellow-300/60', glow: 'shadow-[0_10px_28px_rgba(251,191,36,0.35)]', hoverGlow: 'hover:shadow-[0_16px_38px_rgba(251,191,36,0.45)]' },
  tilki: { bg: 'bg-gradient-to-br from-white/85 via-amber-50/65 to-lime-100/60', iconBg: 'bg-white/80 border border-amber-100/50', iconText: 'text-amber-500', title: 'text-emerald-900', subtitle: 'text-emerald-700', ring: 'focus:ring-amber-200', border: 'border-amber-200/60', glow: 'shadow-[0_8px_24px_rgba(245,158,11,0.18)]', hoverGlow: 'hover:shadow-[0_14px_32px_rgba(56,161,105,0.22)]' },
  tilki2: { bg: 'bg-green-700/70', iconBg: 'bg-orange-400/20', iconText: 'text-orange-300', title: 'text-white', subtitle: 'text-green-200', ring: 'focus:ring-orange-300' },
  ay: { bg: 'bg-indigo-900/70', iconBg: 'bg-yellow-400/20', iconText: 'text-yellow-300', title: 'text-white', subtitle: 'text-indigo-200', ring: 'focus:ring-yellow-300' },
  geceorman: { bg: 'bg-indigo-800/70', iconBg: 'bg-cyan-400/20', iconText: 'text-cyan-300', title: 'text-white', subtitle: 'text-indigo-200', ring: 'focus:ring-cyan-300' },
  yagmur: { bg: 'bg-emerald-800/70', iconBg: 'bg-emerald-400/20', iconText: 'text-emerald-300', title: 'text-white', subtitle: 'text-emerald-100', ring: 'focus:ring-emerald-300' },
  kus: { bg: 'bg-sky-300/70', iconBg: 'bg-sky-100/50', iconText: 'text-sky-600', title: 'text-sky-900', subtitle: 'text-sky-700', ring: 'focus:ring-sky-300' },
  kedi: { bg: 'bg-gradient-to-br from-amber-100/90 via-orange-100/70 to-yellow-100/80', iconBg: 'bg-white/90', iconText: 'text-orange-500', title: 'text-orange-900', subtitle: 'text-orange-700', ring: 'focus:ring-amber-200', border: 'border-orange-300/70', glow: 'shadow-[0_12px_30px_rgba(249,115,22,0.25)]', hoverGlow: 'hover:shadow-[0_16px_36px_rgba(249,115,22,0.35)]' },
  kar: { bg: 'bg-white/60', iconBg: 'bg-sky-200/50', iconText: 'text-sky-700', title: 'text-sky-900', subtitle: 'text-sky-800', ring: 'focus:ring-sky-300' },
  gunbatimi: { bg: 'bg-rose-900/60', iconBg: 'bg-orange-400/20', iconText: 'text-orange-300', title: 'text-white', subtitle: 'text-rose-200', ring: 'focus:ring-orange-300' },
  ay2: { bg: 'bg-indigo-900/70', iconBg: 'bg-yellow-400/20', iconText: 'text-yellow-300', title: 'text-white', subtitle: 'text-indigo-200', ring: 'focus:ring-yellow-300' },
  zurafa: { bg: 'bg-white/60', iconBg: 'bg-cyan-200/50', iconText: 'text-cyan-700', title: 'text-cyan-900', subtitle: 'text-cyan-800', ring: 'focus:ring-cyan-300' },
  geometri: { bg: 'bg-rose-900/10', iconBg: 'bg-rose-200/40', iconText: 'text-rose-800', title: 'text-rose-900', subtitle: 'text-rose-700', ring: 'focus:ring-rose-300' },
  deneme: { bg: 'bg-gradient-to-br from-cyan-500/20 via-blue-500/15 to-teal-500/20 backdrop-blur-sm', iconBg: 'bg-gradient-to-br from-cyan-400/60 via-blue-500/60 to-teal-600/60', iconText: 'text-white', title: 'text-cyan-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]', subtitle: 'text-cyan-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]', ring: 'focus:ring-cyan-300', border: 'border-cyan-300/30', glow: 'shadow-[0_8px_20px_rgba(6,182,212,0.15)]', hoverGlow: 'hover:shadow-[0_12px_28px_rgba(6,182,212,0.25)]' },
};


const MenuButton: React.FC<MenuButtonProps> = ({ icon: Icon, title, subtitle, onClick, color, theme, children, disabled = false, badge, isUnderDevelopment }) => {
  const finalDisabled = disabled || isUnderDevelopment;
  const badgeClass = badge === 'Yeni!' ? 'bg-green-400 animate-pulse' : 'bg-orange-400';

  // All themes now use themed version with proper color palettes
  const themedClasses = (theme === 'simple' && themeConfig.simple[color])
    ? themeConfig.simple[color]
    : themeConfig[theme as ThemeKey] || themeConfig.simple.purple;
  const themedBorder = themedClasses.border || 'border-white/30';
  const themedGlow = themedClasses.glow || '';
  const themedHoverGlow = themedClasses.hoverGlow || '';

  return (
    <button
      onClick={onClick}
      disabled={finalDisabled}
      className={`relative w-full h-28 sm:h-32 text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg ${themedGlow} transition-all duration-300 ease-in-out transform hover:scale-[1.03] active:scale-[0.98] hover:shadow-xl ${themedHoverGlow} focus:outline-none focus:ring-4 backdrop-blur-md border ${themedBorder} ${themedClasses.bg} ${themedClasses.ring} ${finalDisabled ? 'opacity-50 grayscale pointer-events-none' : ''}`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow">
          <div className="flex items-start gap-2 sm:gap-3">
            <div className={`p-2 sm:p-2.5 rounded-lg sm:rounded-xl flex-shrink-0 ${themedClasses.iconBg}`}>
              <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${themedClasses.iconText}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className={`text-sm sm:text-base font-bold leading-tight truncate ${themedClasses.title} ${theme === 'kedi' ? 'text-shadow-soft' : ''}`}>{title}</h2>
              <p className={`text-[11px] sm:text-xs leading-snug mt-1 line-clamp-2 ${themedClasses.subtitle} ${theme === 'kedi' ? 'text-shadow-soft' : ''}`}>{subtitle}</p>
            </div>
          </div>
        </div>
      </div>
      {theme === 'kedi' && (
        <span className="absolute bottom-1 right-1 text-xl animate-bounce drop-shadow-[0_6px_12px_rgba(249,115,22,0.35)]">
          🐱
        </span>
      )}
      {children}
      {isUnderDevelopment && (
        <div className="absolute top-1 right-1 bg-yellow-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">Geliştiriliyor</div>
      )}
      {disabled && badge && !isUnderDevelopment && (
        <div className="absolute top-1 right-1 bg-yellow-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">Yakında</div>
      )}
      {badge && !disabled && !isUnderDevelopment && (
        <div className={`absolute top-1 right-1 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ${badgeClass}`}>{badge}</div>
      )}
    </button>
  );
};

export default MenuButton;
