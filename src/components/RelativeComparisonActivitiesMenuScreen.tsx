import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { ActivityType, ActivityStats } from '../types.ts';
import SparklesIcon from './icons/SparklesIcon.tsx';
import ProgressIndicator from './ui/ProgressIndicator.tsx';
import MenuButton from './ui/MenuButton.tsx';
import { t } from '../i18n/index.ts';


interface RelativeComparisonActivitiesMenuScreenProps {
  onSelectActivity: (activity: ActivityType) => void;
  onBack: () => void;
  activityStats: Record<string, ActivityStats>;
  theme: string;
  enabledActivities: Set<string>;
}

const activityDefs = [
  { type: ActivityType.RelativeBigSmall, key: 'concepts.activities.bigSmall', fallback: 'Büyük / Küçük' },
  { type: ActivityType.RelativeWideNarrow, key: 'concepts.activities.wideNarrow', fallback: 'Geniş / Dar' },
  { type: ActivityType.RelativeThinThick, key: 'concepts.activities.thinThick', fallback: 'İnce / Kalın' },
  { type: ActivityType.RelativeFewMuch, key: 'concepts.activities.fewMuch', fallback: 'Az / Çok' },
  { type: ActivityType.RelativeLongShort, key: 'concepts.activities.longShort', fallback: 'Uzun / Kısa' },
  { type: ActivityType.RelativeNearFar, key: 'concepts.activities.nearFar', fallback: 'Yakın / Uzak' },
  { type: ActivityType.RelativeHighLow, key: 'concepts.activities.highLow', fallback: 'Yüksek / Alçak' },
];

const RelativeComparisonActivitiesMenuScreen: React.FC<RelativeComparisonActivitiesMenuScreenProps> = ({
  onSelectActivity,
  onBack,
  activityStats,
  theme,
  enabledActivities,
}) => {
  const activities = activityDefs.map(a => ({
    type: a.type,
    title: t(a.key, a.fallback),
    subtitle: t('experimental.relativeComparison.instruction', 'Açılan iki kartı karşılaştır ve soruyu cevapla.'),
  }));
  const isCosmic = theme === 'deneme2';
  const isUnderwater = theme === 'deneme';

  if (isCosmic) {
    // Robot Theme: Tech Interface
    return (
      <div className="relative h-full flex flex-col overflow-hidden bg-slate-900">
        {/* Tech Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900/80 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 bg-slate-800/50 backdrop-blur-md">
          <button
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-700/50 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-200 transition-all"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-100 font-bold tracking-wider font-mono text-lg uppercase">
              {t('experimental.relativeComparison.title', 'Göreceli Karşılaştırma')}
            </span>
          </div>

          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 flex items-center justify-center">
          <div className="grid grid-cols-2 landscape:grid-cols-3 gap-6 max-w-4xl w-full">
            {activities.map((activity, idx) => {
              const stats = activityStats[String(activity.type)] || { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0 };
              const isEnabled = enabledActivities.has(String(activity.type));

              const borderColors = [
                'border-cyan-500/30 hover:border-cyan-400',
                'border-sky-500/30 hover:border-sky-400',
                'border-teal-500/30 hover:border-teal-400',
                'border-indigo-500/30 hover:border-indigo-400',
              ];
              const borderColor = borderColors[idx % borderColors.length];

              return (
                <button
                  key={String(activity.type)}
                  onClick={() => isEnabled && onSelectActivity(activity.type)}
                  disabled={!isEnabled}
                  className={`relative group flex flex-col items-center gap-4 p-6 rounded-xl border-2 transition-all duration-300 ${borderColor} bg-slate-800/40 ${!isEnabled ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:bg-slate-800/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer'
                    } overflow-hidden`}
                >
                  {/* Tech Corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />

                  <div className={`w-16 h-16 rounded-lg bg-slate-900 border border-cyan-500/20 flex items-center justify-center shadow-inner shadow-black/50 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <SparklesIcon className="w-8 h-8 text-cyan-200 drop-shadow-lg" />
                  </div>

                  <div className="text-center z-10">
                    <h3 className="text-sm font-bold text-cyan-100 font-mono tracking-wide uppercase mb-1">{activity.title}</h3>
                    <p className="text-[10px] text-cyan-400/60 font-mono leading-tight max-w-[120px] mx-auto hidden sm:block">{activity.subtitle}</p>
                  </div>

                  <div className="w-full mt-auto pt-2 opacity-80 group-hover:opacity-100 z-10">
                    <ProgressIndicator
                      attempts={stats.attempts}
                      completions={stats.completions}
                      totalCorrect={stats.totalCorrect}
                      totalQuestions={stats.totalQuestions}
                      compact
                    />
                  </div>

                  {/* Scan Line Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-700 pointer-events-none" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (isUnderwater) {
    const jellyfishColors = [
      // Oceanic palette — prioritize blues, cyans and teals. Keep variety but avoid pinks.
      'from-blue-600 to-cyan-500',
      'from-cyan-600 to-teal-500',
      'from-teal-600 to-blue-500',
      'from-sky-600 to-cyan-400',
      'from-indigo-600 to-blue-500',
      'from-blue-700 to-teal-500',
      'from-cyan-500 to-sky-400',
      'from-teal-500 to-cyan-400',
    ];

    const renderUnderwaterCard = (activity: typeof activities[number], idx: number) => {
      const stats = activityStats[String(activity.type)] || { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0 };
      const isEnabled = enabledActivities.has(String(activity.type));
      const color = jellyfishColors[idx % jellyfishColors.length];

      return (
        <button
          key={String(activity.type)}
          onClick={() => isEnabled && onSelectActivity(activity.type)}
          disabled={!isEnabled}
          className={`relative flex flex-col items-center transition-all duration-300 ${!isEnabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'
            }`}
        >
          {/* Jellyfish body (dome) */}
          <div className={`w-32 h-24 sm:w-36 sm:h-28 rounded-t-full bg-gradient-to-b ${color} border-2 border-white/30 backdrop-blur-sm shadow-lg relative overflow-hidden ${isEnabled && 'hover:shadow-2xl'}`}>
            {/* Shine effect */}
            <div className="absolute top-1 left-3 w-4 h-4 bg-white/40 rounded-full blur-sm"></div>
            <div className="absolute top-2 right-4 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>

            {/* Icon in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <SparklesIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-md" />
            </div>
          </div>

          {/* Tentacles */}
          <div className="flex gap-0.5 justify-center -mt-1">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`w-0.5 h-8 bg-gradient-to-b ${color} opacity-60 rounded-full animate-tentacle`}
                style={{ height: `${32 + Math.random() * 12}px`, animationDelay: `${i * 0.15}s`, transformOrigin: 'top' }}
              />
            ))}
          </div>          {/* Title */}
          <h3 className="text-sm font-bold text-white text-center mt-2 line-clamp-2 px-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">{activity.title}</h3>

          {/* Subtitle */}
          <p className="text-xs text-white/90 text-center line-clamp-1 px-2 mb-2 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]">{activity.subtitle}</p>

          {/* Progress */}
          <div className="w-full px-2">
            <ProgressIndicator
              attempts={stats.attempts}
              completions={stats.completions}
              totalCorrect={stats.totalCorrect}
              totalQuestions={stats.totalQuestions}
            />
          </div>
        </button>
      );
    };

    return (
      <>
        {/* Deep ocean gradient background */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#001122] via-[#001a2e] to-[#000814]" />

        {/* Ocean bubbles animation */}
        <div className="absolute inset-0 -z-18 opacity-40">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full animate-bubble"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-10px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Ocean floor sand */}
        <div className="absolute bottom-0 left-0 right-0 h-32 -z-15 bg-gradient-to-t from-amber-900/30 via-amber-800/20 to-transparent" />

        {/* Light rays from surface */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-300/60 via-cyan-400/30 to-transparent -z-16" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-blue-300/60 via-blue-400/30 to-transparent -z-16" />

        <div className="relative z-10 flex flex-col items-center justify-start h-full max-w-4xl mx-auto p-4 sm-landscape:p-2 animate-fade-in overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            {/* Jellyfish */}
            <div className="absolute top-12 right-16 w-12 h-12 opacity-20">
              <div className="w-full h-full bg-cyan-400/20 rounded-full relative animate-pulse">
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-5 bg-cyan-400/20 rounded-b-full"></div>
                <div className="absolute top-1.5 left-1.5 w-1.5 h-3 bg-cyan-300/30 rounded-full"></div>
                <div className="absolute top-1.5 right-1.5 w-1.5 h-3 bg-cyan-300/30 rounded-full"></div>
              </div>
            </div>
            {/* Fish */}
            <div className="absolute bottom-16 left-12 text-cyan-300/15 text-xl animate-pulse">🐠</div>
            <div className="absolute top-1/3 left-8 text-teal-300/10 text-lg animate-pulse" style={{ animationDelay: '1s' }}>🐟</div>
          </div>

          <div className="relative z-10 w-full flex items-center mb-6 sm-landscape:mb-3">
            <button
              onClick={onBack}
              className="absolute left-0 z-20 p-2 rounded-full bg-cyan-400/20 hover:bg-cyan-400/30 backdrop-blur-sm border border-cyan-300/30 transition-all duration-200"
              aria-label={t('app.back', 'Geri dön')}
            >
              <ArrowLeftIcon className="w-8 h-8 sm-landscape:w-7 sm-landscape:h-7 text-cyan-100 drop-shadow-md" />
            </button>
            <div className="flex-1 flex justify-center">
              <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-cyan-600/80 via-teal-500/80 to-cyan-600/80 backdrop-blur-sm border border-cyan-300/40 shadow-lg shadow-cyan-400/30 pointer-events-none z-10">
                <h1 className="text-2xl sm:text-3xl sm-landscape:text-xl font-black text-cyan-100 drop-shadow-lg">
                  {t('experimental.relativeComparison.title', 'Göreceli Karşılaştırma')}
                </h1>
              </div>
            </div>
          </div>
          <div className="relative z-10 w-full flex-grow overflow-y-auto pr-2 animate-fade-in">
            <div className="grid grid-cols-2 landscape:grid-cols-3 sm-landscape:grid-cols-4 gap-6 sm-landscape:gap-4">
              {activities.map((a, idx) => renderUnderwaterCard(a, idx))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start h-full max-w-4xl mx-auto p-4 animate-fade-in">
      <style>{`
        /* Make the activities area scrollable when needed and responsive to orientation */
        .rc-menu-scroll { max-height: calc(100vh - 8rem); overflow-y: auto; -webkit-overflow-scrolling: touch; }
        .rc-menu-grid { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 1rem; }
        @media (min-width: 640px) { .rc-menu-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        /* In landscape prefer more columns so the menu compacts */
        @media (orientation: landscape) {
          .rc-menu-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @media (min-width: 1024px) and (orientation: landscape) {
          .rc-menu-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
      `}</style>
      <div className="w-full flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-full hover:bg-black/10 transition-colors"
          aria-label={t('app.back', 'Geri dön')}
        >
          <ArrowLeftIcon className="w-8 h-8 text-teal-700" />
        </button>
        <div className="text-center flex-1">
          <h2 className="text-2xl font-bold text-slate-800">
            {t('experimental.relativeComparison.title', 'Göreceli Karşılaştırma')}
          </h2>
          <p className="text-sm text-slate-600">
            {t('experimental.relativeComparison.menuSubtitle', 'Bir karşılaştırma etkinliği seç.')}
          </p>
        </div>
        <div className="w-8 h-8" />
      </div>

      <div className="rc-menu-scroll w-full">
        <div className="rc-menu-grid w-full">
          {activities.map((activity) => {
            const stats = activityStats[String(activity.type)];
            const isEnabled = enabledActivities.has(String(activity.type));
            return (
              <MenuButton
                key={String(activity.type)}
                icon={SparklesIcon}
                title={activity.title}
                subtitle={activity.subtitle}
                onClick={() => onSelectActivity(activity.type)}
                color="teal"
                theme={theme}
                disabled={!isEnabled}
              >
                {stats && (
                  <ProgressIndicator
                    attempts={stats.attempts}
                    completions={stats.completions}
                    totalCorrect={stats.totalCorrect}
                    totalQuestions={stats.totalQuestions}
                  />
                )}
              </MenuButton>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default React.memo(RelativeComparisonActivitiesMenuScreen);