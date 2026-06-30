import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { ActivityType, ActivityStats } from '../types.ts';
import SameDifferentIcon from './icons/SameDifferentIcon.tsx';
import SequencingIcon from './icons/SequencingIcon.tsx';
import PatternIcon from './icons/PatternIcon.tsx';
import SudokuIcon from './icons/SudokuIcon.tsx';
import MemoryCardsIcon from './icons/MemoryCardsIcon.tsx';
import MoveIcon from './icons/MoveIcon.tsx';
import PositioningIcon from './icons/PositioningIcon.tsx';
import ProgressIndicator from './ui/ProgressIndicator.tsx';
import MenuButton from './ui/MenuButton.tsx';
import { getCurrentLanguage, t } from '../i18n/index.ts';
import CosmicBackdrop from './ui/CosmicBackdrop.tsx';
import PanelStars from './ui/PanelStars.tsx';
// Note: Using a simple gradient orb here instead of CosmicOrb to avoid API mismatch

interface ReasoningActivitiesMenuScreenProps {
  onSelectActivity: (activity: ActivityType) => void;
  onBack: () => void;
  activityStats: Record<string, ActivityStats>;
  theme: string;
  enabledActivities: Set<string>;
}

const ReasoningActivitiesMenuScreen: React.FC<ReasoningActivitiesMenuScreenProps> = ({ onSelectActivity, onBack, activityStats, theme, enabledActivities }) => {
  
  const lang = getCurrentLanguage();
  const isTr = lang === 'tr';
  const isCosmic = theme === 'deneme2';
  const isUnderwater = theme === 'deneme';

  // Neptune palette - oceanic blues/cyans/teals
  const neptunePalettes = [
    { from: 'from-blue-600', via: 'via-blue-500', to: 'to-cyan-400', glow: 'shadow-blue-500/50' },
    { from: 'from-cyan-600', via: 'via-cyan-500', to: 'to-teal-400', glow: 'shadow-cyan-500/50' },
    { from: 'from-teal-600', via: 'via-teal-500', to: 'to-blue-400', glow: 'shadow-teal-500/50' },
    { from: 'from-sky-600', via: 'via-sky-500', to: 'to-cyan-400', glow: 'shadow-sky-500/50' },
    { from: 'from-indigo-600', via: 'via-blue-500', to: 'to-cyan-400', glow: 'shadow-indigo-500/50' },
    { from: 'from-cyan-700', via: 'via-blue-600', to: 'to-teal-400', glow: 'shadow-cyan-600/50' },
    { from: 'from-blue-700', via: 'via-cyan-600', to: 'to-sky-400', glow: 'shadow-blue-600/50' },
  ];

  const activities = [
    { type: ActivityType.WhatDoesntBelong, icon: SameDifferentIcon, title: t('reasoning.activities.whatDoesntBelong.title', isTr ? 'Hangisi Farklı?' : 'Odd One Out'), subtitle: t('reasoning.activities.whatDoesntBelong.subtitle', isTr ? 'Gruba uymayanı bul' : 'Find what does not belong'), color: 'rose' as const },
    { type: ActivityType.SequencingStories, icon: SequencingIcon, title: t('reasoning.activities.sequencingStories.title', isTr ? 'Olay Sıralama' : 'Story Sequencing'), subtitle: t('reasoning.activities.sequencingStories.subtitle', isTr ? 'Hikayeyi doğru sıraya diz' : 'Put the story in order'), color: 'purple' as const },
    { type: ActivityType.PatternCompletion, icon: PatternIcon, title: t('reasoning.activities.patternCompletion.title', isTr ? 'Örüntü Tamamlama' : 'Pattern Completion'), subtitle: t('reasoning.activities.patternCompletion.subtitle', isTr ? 'Sıradaki şekli tahmin et' : 'Predict the next shape'), color: 'cyan' as const },
    { type: ActivityType.Sudoku, icon: SudokuIcon, title: t('reasoning.activities.sudoku.title', isTr ? 'Görsel Sudoku' : 'Picture Sudoku'), subtitle: t('reasoning.activities.sudoku.subtitle', isTr ? 'Eksik parçayı tamamla' : 'Complete the missing piece'), color: 'teal' as const },
    { type: ActivityType.MemoryCards, icon: MemoryCardsIcon, title: t('reasoning.activities.memoryCards.title', isTr ? 'Hafıza Kartları' : 'Memory Cards'), subtitle: t('reasoning.activities.memoryCards.subtitle', isTr ? 'Kartların eşini bul' : 'Find matching cards'), color: 'sky' as const },
    { type: ActivityType.DragAndDropCounting, icon: MoveIcon, title: t('reasoning.activities.dragAndDropCounting.title', isTr ? 'Nesneleri Taşı' : 'Move Objects'), subtitle: t('reasoning.activities.dragAndDropCounting.subtitle', isTr ? 'İstenen sayıda nesneyi taşı' : 'Move the requested number of items'), color: 'lime' as const },
  { type: ActivityType.DragAndDropPositioning, icon: PositioningIcon, title: t('reasoning.activities.dragAndDropPositioning.title', isTr ? 'Nesneyi Yerleştir' : 'Place the Object'), subtitle: t('reasoning.activities.dragAndDropPositioning.subtitle', isTr ? 'Nesneyi doğru konuma yerleştir' : 'Place the item in the right spot'), color: 'indigo' as const },
    // Adam Asmaca - eğlence amaçlı
    { type: ActivityType.Hangman, icon: PositioningIcon, title: t('reasoning.activities.hangman.title', isTr ? 'Adam Asmaca' : 'Hangman'), subtitle: t('reasoning.activities.hangman.subtitle', isTr ? 'Kelimeyi tahmin et' : 'Guess the word'), color: 'pink' as const },
    // Nesne Toplama - YENİ!
    { type: ActivityType.ObjectCollector, icon: SameDifferentIcon, title: t('games.objectCollector.title', isTr ? 'Nesne Toplama' : 'Object Collector'), subtitle: t('games.objectCollector.subtitle', isTr ? 'Doğru nesneleri sepete topla' : 'Collect the right objects in the basket'), color: 'amber' as const },
    { type: ActivityType.WhatsMissing, icon: MemoryCardsIcon, title: isTr ? 'Hangisi Kayıp?' : "What's Missing?", subtitle: isTr ? 'Nesneleri ezberle, kayıp olanı bul' : 'Memorize objects, find the missing one', color: 'sky' as const },
  ];

  const renderCosmicCard = (activity: typeof activities[0], idx: number) => {
    const stats = activityStats[String(activity.type)] || { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0 };
    const isDisabled = !enabledActivities.has(String(activity.type));
    const palette = neptunePalettes[idx % neptunePalettes.length];
    const Icon = activity.icon;

    return (
      <button
        key={activity.type}
        onClick={() => !isDisabled && onSelectActivity(activity.type)}
        disabled={isDisabled}
        className={`relative flex flex-col items-center p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-cyan-300/30 min-h-[180px] transition-all duration-300 ${
          isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105 hover:border-cyan-300/60 hover:shadow-lg hover:shadow-cyan-400/20 cursor-pointer'
        }`}
      >
        <div className={`w-14 h-14 flex-shrink-0 rounded-full bg-gradient-to-br ${palette.from} ${palette.via} ${palette.to} shadow-lg ${palette.glow} flex items-center justify-center`}>
          <Icon className="w-7 h-7 text-white drop-shadow-md" />
        </div>
        <h3 className="text-sm font-bold text-white text-center mb-1 flex-shrink-0 line-clamp-2">
          {activity.title}
        </h3>
        <p className="text-xs text-cyan-100/80 text-center flex-shrink-0 line-clamp-1 mb-2">
          {activity.subtitle}
        </p>
        <div className="mt-auto w-full">
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

  const renderUnderwaterCard = (activity: typeof activities[0], idx: number) => {
    const stats = activityStats[String(activity.type)] || { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0 };
    const isDisabled = !enabledActivities.has(String(activity.type));
    const Icon = activity.icon;
    
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
    const color = jellyfishColors[idx % jellyfishColors.length];

    return (
      <button
        key={activity.type}
        onClick={() => !isDisabled && onSelectActivity(activity.type)}
        disabled={isDisabled}
        className={`relative flex flex-col items-center transition-all duration-300 ${
          isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'
        }`}
      >
        {/* Jellyfish body (dome) */}
        <div className={`w-32 h-24 sm:w-36 sm:h-28 rounded-t-full bg-gradient-to-b ${color} border-2 border-white/30 backdrop-blur-sm shadow-lg relative overflow-hidden ${!isDisabled && 'hover:shadow-2xl'}`}>
          {/* Shine effect */}
          <div className="absolute top-1 left-3 w-4 h-4 bg-white/40 rounded-full blur-sm"></div>
          <div className="absolute top-2 right-4 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
          
          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-md" />
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
        </div>
        
        {/* Title */}
        <h3 className="text-sm font-bold text-white text-center mt-2 line-clamp-2 px-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
          {activity.title}
        </h3>
        
        {/* Subtitle */}
        <p className="text-xs text-white/90 text-center line-clamp-1 px-2 mb-2 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]">
          {activity.subtitle}
        </p>
        
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

  const isThemed = theme !== 'simple';
  const titleColorClass = isThemed ? 'text-white text-shadow-soft' : 'text-indigo-800';
  const iconColorClass = isThemed ? 'text-white' : 'text-indigo-700';
  
  if (isCosmic) {
    return (
      <>
        <CosmicBackdrop variant="rich" />
        <div className="relative z-10 flex flex-col items-center justify-start h-full max-w-2xl mx-auto p-4 sm-landscape:p-2 animate-fade-in overflow-hidden">
          <PanelStars count={72} />
          <div className="relative z-10 w-full flex items-center mb-8 sm-landscape:mb-4">
            <button 
              onClick={onBack} 
              className="absolute left-0 p-2 rounded-full bg-cyan-400/20 hover:bg-cyan-400/30 backdrop-blur-sm border border-cyan-300/30 transition-all duration-200" 
              aria-label={t('app.back', 'Go back')}
            >
              <ArrowLeftIcon className="w-8 h-8 sm-landscape:w-7 sm-landscape:h-7 text-white drop-shadow-md" />
            </button>
            <div className="flex-1 flex justify-center">
              <div className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-blue-600/80 via-cyan-500/80 to-blue-600/80 backdrop-blur-sm border border-cyan-300/40 shadow-lg shadow-cyan-400/30">
                <h1 className="text-3xl sm:text-4xl sm-landscape:text-2xl font-black text-white drop-shadow-lg">
                  {t('reasoning.title', isTr ? 'Akıl Oyunları' : 'Reasoning Games')}
                </h1>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 w-full flex-grow overflow-y-auto pr-2 animate-fade-in">
            <div className="grid grid-cols-2 landscape:grid-cols-3 sm-landscape:grid-cols-3 gap-4 sm-landscape:gap-3">
              {activities.map((activity, idx) => renderCosmicCard(activity, idx))}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isUnderwater) {
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

        <div className="relative z-10 flex flex-col items-center justify-start h-full max-w-2xl mx-auto p-4 sm-landscape:p-2 animate-fade-in overflow-hidden">
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

          <div className="relative z-10 w-full flex items-center mb-8 sm-landscape:mb-4">
            <button 
              onClick={onBack} 
              className="absolute left-0 p-2 rounded-full bg-cyan-400/20 hover:bg-cyan-400/30 backdrop-blur-sm border border-cyan-300/30 transition-all duration-200" 
              aria-label={t('app.back', 'Go back')}
            >
              <ArrowLeftIcon className="w-8 h-8 sm-landscape:w-7 sm-landscape:h-7 text-cyan-100 drop-shadow-md" />
            </button>
            <div className="flex-1 flex justify-center">
              <div className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-cyan-600/80 via-teal-500/80 to-cyan-600/80 backdrop-blur-sm border border-cyan-300/40 shadow-lg shadow-cyan-400/30">
                <h1 className="text-3xl sm:text-4xl sm-landscape:text-2xl font-black text-cyan-100 drop-shadow-lg">
                  {t('reasoning.title', isTr ? 'Akıl Oyunları' : 'Reasoning Games')}
                </h1>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 w-full flex-grow overflow-y-auto pr-2 animate-fade-in">
            <div className="grid grid-cols-2 landscape:grid-cols-3 sm-landscape:grid-cols-3 gap-6 sm-landscape:gap-4">
              {activities.map((activity, idx) => renderUnderwaterCard(activity, idx))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start h-full max-w-2xl mx-auto p-4 sm-landscape:p-1 animate-fade-in">
      <div className="w-full flex items-center mb-8 sm-landscape:mb-4 relative">
        <button 
          onClick={onBack} 
          className="absolute left-0 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors" 
          aria-label={t('app.back', 'Go back')}
        >
          <ArrowLeftIcon className={`w-8 h-8 sm-landscape:w-7 sm-landscape:h-7 ${iconColorClass}`} />
        </button>
        <h1 className={`flex-1 text-center text-3xl sm:text-4xl sm-landscape:text-2xl font-black ${titleColorClass}`}>
          {t('reasoning.title', isTr ? 'Akıl Oyunları' : 'Reasoning Games')}
        </h1>
      </div>
      
      <div className="w-full flex-grow overflow-y-auto pr-2 animate-fade-in">
         <div className="grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-3 sm-landscape:grid-cols-3 gap-4 sm-landscape:gap-3">
      {activities.map((activity) => {
                const stats = activityStats[String(activity.type)] || { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0 };
                const isDisabled = !enabledActivities.has(String(activity.type));
                const isNewGame = activity.type === ActivityType.Hangman || activity.type === ActivityType.ObjectCollector || activity.type === ActivityType.EmotionPuppet;
                return (
                    <MenuButton
                        key={activity.type}
                        icon={activity.icon}
                        title={activity.title}
                        subtitle={activity.subtitle}
                        onClick={() => onSelectActivity(activity.type)}
                        color={activity.color}
                        theme={theme}
                        disabled={isDisabled}
                        badge={isNewGame ? 'Yeni!' : undefined}
                    >
                        <ProgressIndicator 
                            attempts={stats.attempts} 
                            completions={stats.completions}
                            totalCorrect={stats.totalCorrect}
                            totalQuestions={stats.totalQuestions}
                        />
                    </MenuButton>
                )
            })}
        </div>
      </div>
    </div>
  );
};

export default ReasoningActivitiesMenuScreen;