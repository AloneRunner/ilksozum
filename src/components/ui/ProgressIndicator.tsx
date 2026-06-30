import React from 'react';
import StarIcon from '../icons/StarIcon.tsx';
import { useAppContext } from '../../contexts/AppContext.ts';

interface ProgressIndicatorProps {
  mode?: 'individual' | 'aggregate';
  attempts: number;
  completions: number;
  totalCorrect?: number;
  totalQuestions?: number;
  compact?: boolean;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  mode = 'individual',
  attempts,
  completions,
  totalCorrect,
  totalQuestions,
  className = '',
  compact = false,
}) => {
  const { settings } = useAppContext();
  const isSimpleTheme = settings.theme === 'simple';

  if (attempts === 0) {
    return null;
  }

  const masteryLevel = Math.min(3, completions || 0);
  const skillPercentage =
    (totalQuestions || 0) > 0 ? (((totalCorrect || 0) / totalQuestions!) * 100) : 0;

  // Tema bazlı renk ayarları
  const getThemeColors = () => {
    const themeColors: Record<string, { bg: string; text: string; progressBg: string; barLow: string; barMid: string; barHigh: string }> = {
      simple: { bg: 'bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200/60 shadow-md', text: 'text-purple-900', progressBg: 'bg-purple-100', barLow: 'bg-rose-500', barMid: 'bg-amber-500', barHigh: 'bg-emerald-500' },
      gunes: { bg: 'bg-gradient-to-r from-yellow-200/90 via-amber-200/85 to-orange-200/80 backdrop-blur-md border border-yellow-400/70 shadow-lg shadow-amber-300/40', text: 'text-orange-900 font-bold', progressBg: 'bg-yellow-300/60', barLow: 'bg-red-500', barMid: 'bg-amber-500', barHigh: 'bg-yellow-500' },
      tilki: { bg: 'bg-green-100/80 backdrop-blur-md border border-green-300/60', text: 'text-green-900', progressBg: 'bg-green-200/50', barLow: 'bg-red-500', barMid: 'bg-yellow-500', barHigh: 'bg-green-500' },
      ay: { bg: 'bg-indigo-100/80 backdrop-blur-md border border-indigo-300/60', text: 'text-indigo-900', progressBg: 'bg-indigo-200/50', barLow: 'bg-red-500', barMid: 'bg-blue-400', barHigh: 'bg-indigo-500' },
      geceorman: { bg: 'bg-indigo-200/80 backdrop-blur-md border border-indigo-400/60', text: 'text-indigo-900', progressBg: 'bg-indigo-300/50', barLow: 'bg-red-500', barMid: 'bg-purple-400', barHigh: 'bg-indigo-500' },
      yagmur: { bg: 'bg-slate-100/80 backdrop-blur-md border border-slate-300/60', text: 'text-slate-900', progressBg: 'bg-slate-200/50', barLow: 'bg-red-500', barMid: 'bg-gray-400', barHigh: 'bg-slate-500' },
      kus: { bg: 'bg-sky-100/80 backdrop-blur-md border border-sky-300/60', text: 'text-sky-900', progressBg: 'bg-sky-200/50', barLow: 'bg-red-500', barMid: 'bg-cyan-400', barHigh: 'bg-sky-500' },
      tilki2: { bg: 'bg-lime-100/80 backdrop-blur-md border border-lime-300/60', text: 'text-lime-900', progressBg: 'bg-lime-200/50', barLow: 'bg-red-500', barMid: 'bg-yellow-400', barHigh: 'bg-lime-500' },
      kedi: { bg: 'bg-green-100/80 backdrop-blur-md border border-green-300/60', text: 'text-green-900', progressBg: 'bg-green-200/50', barLow: 'bg-red-500', barMid: 'bg-teal-400', barHigh: 'bg-green-500' },
      kar: { bg: 'bg-sky-50/80 backdrop-blur-md border border-sky-200/60', text: 'text-sky-900', progressBg: 'bg-sky-100/50', barLow: 'bg-red-400', barMid: 'bg-blue-300', barHigh: 'bg-sky-400' },
      gunbatimi: { bg: 'bg-orange-100/80 backdrop-blur-md border border-orange-300/60', text: 'text-orange-900', progressBg: 'bg-orange-200/50', barLow: 'bg-red-600', barMid: 'bg-orange-400', barHigh: 'bg-amber-500' },
      ay2: { bg: 'bg-indigo-100/80 backdrop-blur-md border border-indigo-300/60', text: 'text-indigo-900', progressBg: 'bg-indigo-200/50', barLow: 'bg-red-500', barMid: 'bg-violet-400', barHigh: 'bg-indigo-500' },
      zurafa: { bg: 'bg-cyan-100/80 backdrop-blur-md border border-cyan-300/60', text: 'text-cyan-900', progressBg: 'bg-cyan-200/50', barLow: 'bg-red-500', barMid: 'bg-teal-400', barHigh: 'bg-cyan-500' },
      geometri: { bg: 'bg-rose-100/80 backdrop-blur-md border border-rose-300/60', text: 'text-rose-900', progressBg: 'bg-rose-200/50', barLow: 'bg-red-500', barMid: 'bg-pink-400', barHigh: 'bg-rose-500' },
      // Underwater 'Deneme' palette — ocean blues/teal for contrast and readability
      deneme: { bg: 'bg-gradient-to-r from-blue-900/85 via-cyan-800/80 to-teal-700/85 backdrop-blur-md border border-cyan-400/30 shadow-lg shadow-cyan-700/30', text: 'text-cyan-100 font-bold', progressBg: 'bg-cyan-700/40', barLow: 'bg-amber-500', barMid: 'bg-cyan-400', barHigh: 'bg-blue-400' },
      // Robot Theme - deneme2
      deneme2: { bg: 'bg-slate-800/50 border border-cyan-500/30', text: 'text-cyan-100', progressBg: 'bg-slate-700', barLow: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]', barMid: 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]', barHigh: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]' }
    };
    return themeColors[settings.theme] || { bg: 'bg-black/20 backdrop-blur-sm', text: 'text-white/90', progressBg: 'bg-black/20', barLow: 'bg-red-400', barMid: 'bg-yellow-400', barHigh: 'bg-green-400' };
  };

  const colors = getThemeColors();

  const skillBarColor =
    isNaN(skillPercentage) || skillPercentage < 40
      ? colors.barLow
      : skillPercentage < 75
        ? colors.barMid
        : colors.barHigh;

  const bgStyle = colors.bg;
  const textStyle = colors.text;
  const progressBg = colors.progressBg;

  const starInactive = isSimpleTheme
    ? 'text-purple-200'
    : 'text-white/30';

  if (mode === 'aggregate') {
    if (compact) {
      return (
        <div className="w-full h-1.5 rounded-full overflow-hidden bg-slate-700 mt-1">
          <div
            className={`h-full ${skillBarColor} rounded-full transition-all duration-500`}
            style={{ width: `${skillPercentage}%` }}
          />
        </div>
      );
    }

    return (
      <div
        className={`absolute bottom-2 left-2 right-2 h-auto flex flex-col items-start gap-1 ${bgStyle} p-1.5 rounded-lg ${className}`}
        aria-label={`Genel Beceri Seviyesi: ${Math.round(skillPercentage)}%`}
      >
        <span className={`text-[10px] font-bold ml-0.5 ${textStyle}`}>
          Başarı: {Math.round(skillPercentage)}%
        </span>
        <div className={`w-full h-1.5 rounded-full overflow-hidden ${progressBg}`}>
          <div
            className={`h-full ${skillBarColor} rounded-full transition-all duration-500`}
            style={{ width: `${skillPercentage}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`absolute bottom-1.5 left-2 right-2 h-5 flex items-center gap-1.5 ${bgStyle} px-1.5 py-0.5 rounded-full ${className}`}
      aria-label={`Beceri seviyesi: ${Math.round(skillPercentage)}%, Ustalık: ${masteryLevel} yıldız`}
    >
      <div className={`flex-grow h-1.5 rounded-full overflow-hidden ${progressBg}`}>
        <div
          className={`h-full ${skillBarColor} rounded-full transition-all duration-500`}
          style={{ width: `${skillPercentage}%` }}
        ></div>
      </div>
      <div className="flex-shrink-0 flex items-center">
        {[...Array(3)].map((_, i) => (
          <StarIcon
            key={i}
            className={`w-3.5 h-3.5 transition-colors ${i < masteryLevel
              ? 'text-amber-400'
              : starInactive
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
