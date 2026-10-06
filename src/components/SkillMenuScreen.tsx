import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { ActivityStats } from '../types.ts';
import { getCurrentLanguage, t } from '../i18n/index.ts';
import type { Beceri, BeceriOge } from '../data/beceriMenu.ts';
import { useAppContext } from '../contexts/AppContext.ts';
import { tasarimAl } from './ui/tasarim.ts';

interface SkillMenuScreenProps {
  beceri: Beceri;
  onBack: () => void;
  onSelect: (oge: BeceriOge) => void;
  activityStats: Record<string, ActivityStats>;
  enabledActivities: Set<string>;
  theme: string;
}

const KOYU_TEMALAR = new Set(['koyu', 'dark', 'deneme', 'deneme2', 'ay', 'ay2', 'geceorman', 'yagmur', 'gunbatimi', 'tilki2']);

// Beceri menüsü: etkinlik, mini oyun ve alt menüler tek listede, büyük emojili kartlar.
const SkillMenuScreen: React.FC<SkillMenuScreenProps> = ({ beceri, onBack, onSelect, activityStats, enabledActivities, theme }) => {
  const koyu = KOYU_TEMALAR.has(theme);
  const tas = tasarimAl(useAppContext().settings.sahne);
  const isTr = getCurrentLanguage() === 'tr';
  const ogeler = beceri.ogeler.filter((g) => !g.sadeceTr || isTr);

  return (
    <div className={`relative w-full h-full flex flex-col overflow-hidden ${tas ? '' : koyu ? 'bg-slate-900' : 'bg-gradient-to-b from-slate-50 via-white to-slate-100'}`}>
      <div className={`relative px-3 pt-3 pb-5 shadow-md rounded-b-[28px] ${tas ? tas.serit(beceri.renk) : `bg-gradient-to-r ${beceri.renk}`}`}>
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className={`p-2 rounded-full shadow active:scale-95 transition ${tas ? tas.geriDugme : 'bg-white/90 hover:bg-white'}`}
            aria-label={t('app.back', 'Geri')}
          >
            <ArrowLeftIcon className={`w-6 h-6 ${tas ? '' : 'text-slate-700'}`} />
          </button>
          <span className="text-4xl drop-shadow-sm" aria-hidden="true">{beceri.emoji}</span>
          <div className="min-w-0">
            <h1 className={`text-2xl sm-landscape:text-xl font-black leading-tight ${tas ? tas.seritYazi : 'text-white drop-shadow'}`}>{beceri.baslik}</h1>
            <p className={`text-sm sm-landscape:text-xs font-semibold truncate opacity-90 ${tas ? tas.seritYazi : 'text-white/90'}`}>{beceri.alt}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pt-4 pb-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 landscape:grid-cols-4 gap-3">
          {ogeler.map((oge, i) => {
            const kapali = (oge.tur === 'etkinlik' || oge.tur === 'harf') && !enabledActivities.has(String(oge.tip));
            const st = oge.tur === 'etkinlik' ? activityStats[String(oge.tip)] : undefined;
            const yildiz = Math.min(st?.completions || 0, 5);
            return (
              <button
                key={`${oge.tur}-${i}`}
                onClick={() => !kapali && onSelect(oge)}
                disabled={kapali}
                className={`relative flex flex-col items-center text-center p-3 pt-4 min-h-[148px] transition-all duration-200 ${
                  tas ? tas.kart(i, beceri.renk)
                  : koyu
                    ? 'rounded-3xl bg-white/10 border border-white/15 hover:bg-white/15'
                    : 'rounded-3xl bg-white border border-slate-200 shadow-[0_6px_16px_rgba(15,23,42,0.08)] hover:shadow-[0_10px_24px_rgba(15,23,42,0.14)]'
                } ${kapali ? 'opacity-40 cursor-not-allowed' : tas ? '' : 'hover:-translate-y-0.5 active:scale-95'}`}
              >
                <span className={`w-16 h-16 flex items-center justify-center text-4xl mb-2 ${tas ? tas.kartIkon(i, beceri.renk) : `rounded-2xl bg-gradient-to-br ${beceri.renk} shadow-inner`}`} aria-hidden="true">
                  {oge.emoji}
                </span>
                <span className={`text-sm font-black leading-tight ${tas ? tas.kartBaslik(i) : koyu ? 'text-white' : 'text-slate-800'}`}>{oge.baslik}</span>
                <span className={`mt-1 text-[11px] leading-snug line-clamp-2 ${tas ? tas.kartAlt(i) : koyu ? 'text-white/70' : 'text-slate-500'}`}>{oge.alt}</span>
                {yildiz > 0 && (
                  <span className="absolute top-2 right-2 text-[11px] font-bold text-amber-500" aria-label={`${st?.completions} kez tamamlandı`}>
                    {'★'.repeat(yildiz)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SkillMenuScreen);
