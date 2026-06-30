import React from 'react';
import type { LoyaltySnapshot } from '../services/loyaltyService';

interface Props {
  theme: string;
  snapshot: LoyaltySnapshot;
}

function formatRemainingDays(until: number): string {
  if (!until) return '';
  const ms = until - Date.now();
  if (ms <= 0) return '';
  const days = Math.ceil(ms / (24 * 60 * 60 * 1000));
  return `${days} gün`;
}

const LoyaltyProgressCard: React.FC<Props> = ({ theme, snapshot }) => {
  const isDark = ['koyu', 'dark', 'geceorman', 'ay', 'yagmur', 'deneme2'].includes(theme);
  const isSimple = theme === 'simple';

  const pct = Math.min(100, Math.round((snapshot.openDaysCount / snapshot.requiredDays) * 100));
  const isComplete = snapshot.isActive;

  const cardClass = isComplete
    ? (isDark
        ? 'bg-gradient-to-br from-emerald-900/40 to-purple-900/40 border border-emerald-400/30 text-emerald-50'
        : 'bg-gradient-to-br from-emerald-50 to-purple-50 border border-emerald-200 text-emerald-900')
    : (isDark
        ? 'bg-white/10 border border-white/15 text-white'
        : isSimple
          ? 'bg-white/90 border border-purple-200 text-purple-900'
          : 'bg-white/80 border border-slate-200 text-slate-900');

  const subTextClass = isDark ? 'text-white/80' : isSimple ? 'text-purple-700' : 'text-slate-700';

  const barBg = isDark ? 'bg-white/15' : 'bg-purple-100';
  const barFill = isComplete
    ? 'bg-gradient-to-r from-emerald-400 to-purple-500'
    : 'bg-gradient-to-r from-purple-400 to-pink-400';

  return (
    <div className={`w-full rounded-2xl px-4 py-3 shadow-sm ${cardClass}`}>
      <div className="flex items-center gap-2">
        <span className="text-xl" role="img" aria-label="rozet">
          {isComplete ? '🏆' : '⭐'}
        </span>
        <h3 className="font-bold text-sm sm:text-base flex-1">
          {isComplete ? 'Sadakat Premium aktif' : 'Sadakat ödülüne ilerleme'}
        </h3>
        {isComplete && (
          <span className="text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40">
            {formatRemainingDays(snapshot.until)} kaldı
          </span>
        )}
      </div>

      <div className={`mt-2 text-xs sm:text-sm ${subTextClass}`}>
        {isComplete
          ? `Düzenli kullandığınız için ${snapshot.rewardDays} gün ücretsiz Premium hediye! Süre dolduğunda kullanmaya devam ederek tekrar kazanabilirsiniz.`
          : `Son ${snapshot.windowDays} günde ${snapshot.openDaysCount} / ${snapshot.requiredDays} farklı gün açtınız. ${snapshot.requiredDays - snapshot.openDaysCount} gün daha açarsanız ${snapshot.rewardDays} gün ücretsiz Premium hediye!`}
      </div>

      <div className={`mt-2 w-full h-2.5 rounded-full overflow-hidden ${barBg}`}>
        <div
          className={`h-full ${barFill} transition-[width] duration-500`}
          style={{ width: `${isComplete ? 100 : pct}%` }}
        />
      </div>

      <div className={`mt-1 flex justify-between text-[10px] sm:text-[11px] ${subTextClass}`}>
        <span>{isComplete ? 'Hedef tamamlandı' : `${pct}%`}</span>
        <span>{snapshot.openDaysCount} / {snapshot.requiredDays} gün</span>
      </div>
    </div>
  );
};

export default LoyaltyProgressCard;
