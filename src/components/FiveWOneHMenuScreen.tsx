import React, { useMemo } from 'react';
import { FiveWOneHCategory } from '../services/database/activities/reasoning/fiveWOneHBatch50';
import { getCurrentLanguage, t } from '../i18n/index';
import UnderwaterBackdrop from './ui/UnderwaterBackdrop.tsx';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';

interface FiveWOneHMenuScreenProps {
  onSelectCategory: (category: FiveWOneHCategory | 'Karışık') => void;
  onBack: () => void;
  theme: string;
}

const FiveWOneHMenuScreen: React.FC<FiveWOneHMenuScreenProps> = ({ onSelectCategory, onBack, theme }) => {
  const lang = getCurrentLanguage();
  const isCosmic = theme === 'deneme2';
  const isUnderwater = theme === 'deneme';
  const localizedTitle = t('menu.fiveWOneH.title', '5N1K');

  // Planet configuration (data source)
  const planets = useMemo(() => [
    { category: 'Kim', label: t('menu.fiveWOneH.category.who', 'Kim?'), emoji: '👤', color: 'from-gray-400 to-gray-600' },
    { category: 'Ne', label: t('menu.fiveWOneH.category.what', 'Ne?'), emoji: '📦', color: 'from-yellow-400 to-orange-500' },
    { category: 'Nerede', label: t('menu.fiveWOneH.category.where', 'Nerede?'), emoji: '📍', color: 'from-blue-400 to-blue-600' },
    { category: 'Ne Zaman', label: t('menu.fiveWOneH.category.when', 'Ne Zaman?'), emoji: '⏰', color: 'from-red-400 to-red-600' },
    { category: 'Neden', label: t('menu.fiveWOneH.category.why', 'Neden?'), emoji: '💡', color: 'from-orange-300 to-orange-500' },
    { category: 'Nasıl', label: t('menu.fiveWOneH.category.how', 'Nasıl?'), emoji: '🛠️', color: 'from-yellow-300 to-yellow-500' },
    { category: 'Karışık', label: t('menu.fiveWOneH.category.mixed', 'Karışık'), emoji: '🔀', color: 'from-cyan-300 to-cyan-500' },
  ], [lang]);

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
              {localizedTitle}
            </span>
          </div>

          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 flex items-center justify-center">
          <div className="grid grid-cols-2 landscape:grid-cols-3 gap-6 max-w-4xl w-full">
            {planets.map((item, idx) => {
              const borderColors = [
                'border-cyan-500/30 hover:border-cyan-400',
                'border-sky-500/30 hover:border-sky-400',
                'border-teal-500/30 hover:border-teal-400',
                'border-indigo-500/30 hover:border-indigo-400',
              ];
              const borderColor = borderColors[idx % borderColors.length];

              return (
                <button
                  key={item.category}
                  onClick={() => onSelectCategory(item.category as FiveWOneHCategory | 'Karışık')}
                  className={`relative group flex flex-col items-center gap-4 p-6 rounded-xl border-2 transition-all duration-300 ${borderColor} bg-slate-800/40 hover:bg-slate-800/80 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] cursor-pointer overflow-hidden`}
                >
                  {/* Tech Corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 transition-colors" />

                  <div className={`w-20 h-20 rounded-full bg-slate-900 border border-cyan-500/20 flex items-center justify-center text-4xl shadow-inner shadow-black/50 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                    <span className="drop-shadow-lg filter group-hover:brightness-125 transition-all">{item.emoji}</span>
                  </div>

                  <div className="text-center z-10">
                    <h3 className="text-lg font-bold text-cyan-100 font-mono tracking-wide uppercase">{item.label}</h3>
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
    return (
      <>
        <UnderwaterBackdrop count={12} className="-z-20 opacity-90" />

        <div className="relative z-10 flex flex-col items-center justify-start h-full max-w-4xl mx-auto p-4 animate-fade-in overflow-hidden">
          <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
            <div className="absolute top-10 right-12 w-12 h-12 opacity-14">🪼</div>
            <div className="absolute bottom-12 left-8 text-cyan-300/12 text-xl">🐠</div>
          </div>

          <div className="absolute top-4 left-4 z-20">
            <button
              onClick={onBack}
              className="p-2 rounded-full bg-cyan-400/20 hover:bg-cyan-400/30 backdrop-blur-sm border border-cyan-300/40 transition-all duration-200"
              aria-label={t('app.back', 'Geri Dön')}
            >
              <ArrowLeftIcon className="w-8 h-8 text-cyan-100 drop-shadow-md" />
            </button>
          </div>

          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
            <div className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-cyan-500/80 to-teal-500/80 drop-shadow-lg border border-cyan-300/40">
              <h1 className="text-3xl font-black text-cyan-100">{localizedTitle}</h1>
            </div>
          </div>

          <div className="relative z-10 w-full flex-grow overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 landscape:grid-cols-3 sm-landscape:grid-cols-4">
              {planets.map((planet) => (
                <button
                  key={planet.category}
                  onClick={() => onSelectCategory(planet.category as FiveWOneHCategory | 'Karışık')}
                  className={`w-full p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all duration-200 hover:scale-105 border border-cyan-300/10`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${planet.color} shadow-lg`}>{planet.emoji}</div>
                  <div className="mt-2 text-sm font-bold text-cyan-100">{planet.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  const colorClassMap: Record<'emerald' | 'amber' | 'sky' | 'indigo' | 'rose' | 'teal', string> = {
    emerald: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200',
    amber: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
    sky: 'bg-sky-100 text-sky-800 hover:bg-sky-200',
    indigo: 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200',
    rose: 'bg-rose-100 text-rose-800 hover:bg-rose-200',
    teal: 'bg-teal-100 text-teal-800 hover:bg-teal-200',
  };

  const categories: { id: FiveWOneHCategory; label: string; color: 'emerald' | 'amber' | 'sky' | 'indigo' | 'rose' | 'teal' }[] = [
    { id: 'Kim', label: t('menu.fiveWOneH.category.who', 'Kim?'), color: 'emerald' },
    { id: 'Ne', label: t('menu.fiveWOneH.category.what', 'Ne?'), color: 'amber' },
    { id: 'Nerede', label: t('menu.fiveWOneH.category.where', 'Nerede?'), color: 'sky' },
    { id: 'Ne Zaman', label: t('menu.fiveWOneH.category.when', 'Ne Zaman?'), color: 'indigo' },
    { id: 'Neden', label: t('menu.fiveWOneH.category.why', 'Neden?'), color: 'rose' },
    { id: 'Nasıl', label: t('menu.fiveWOneH.category.how', 'Nasıl?'), color: 'teal' },
  ];

  return (
    <div className="flex flex-col items-center justify-start h-full max-w-lg mx-auto p-4 animate-fade-in">
      <div className="w-full flex items-center mb-8 relative">
        <button onClick={onBack} className="absolute left-0 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors" aria-label={t('app.back', 'Geri Dön')}>
          <span className="text-lg font-bold">←</span>
        </button>
        <h1 className="flex-1 text-center text-3xl font-black text-emerald-700">{localizedTitle}</h1>
      </div>
      <div className="w-full flex-grow overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`rounded-2xl px-4 py-6 font-bold text-lg shadow-md transition-colors ${colorClassMap[cat.color]}`}
              onClick={() => onSelectCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
          <button
            className="rounded-2xl px-4 py-6 font-bold text-lg shadow-md bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
            onClick={() => onSelectCategory('Karışık')}
          >
            {t('menu.fiveWOneH.category.mixed', 'Karışık')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiveWOneHMenuScreen;
