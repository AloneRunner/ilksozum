import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { ActivityType, ActivityStats } from '../types.ts';
import BookOpenIcon from './icons/BookOpenIcon.tsx';
import SyllableIcon from './icons/SyllableIcon.tsx';
import GridIcon from './icons/GridIcon.tsx';
import ImageIcon from './icons/ImageIcon.tsx';
import SpeakerIcon from './icons/SpeakerIcon.tsx';
import SearchIcon from './icons/SearchIcon.tsx';
import ProgressIndicator from './ui/ProgressIndicator.tsx';
import { t, getCurrentLanguage } from '../i18n/index.ts';
import { getAlphabet } from '../data/alphabets.ts';
import { getLetterActivityPack } from '../data/letterActivityPacks.ts';
import MenuButton from './ui/MenuButton.tsx';
import CosmicBackdrop from './ui/CosmicBackdrop.tsx';
import PanelStars from './ui/PanelStars.tsx';

interface LetterActivitiesMenuScreenProps {
  onSelectActivity: (activity: ActivityType) => void;
  onBack: () => void;
  activityStats: Record<string, ActivityStats>;
  theme: string;
  enabledActivities: Set<string>;
}

const LetterActivitiesMenuScreen: React.FC<LetterActivitiesMenuScreenProps> = ({ onSelectActivity, onBack, activityStats, theme, enabledActivities }) => {
  const isCosmic = theme === 'deneme2';
  const isUnderwater = theme === 'deneme';
  const lang = getCurrentLanguage();
  const pack = getLetterActivityPack(lang);
  
  // Syllabification and Story are TR/AZ only
  const allActivities = [
    { id: ActivityType.FindTheLetterInGrid, icon: GridIcon, title: t('activities.letter.grid', 'Harf Tablosu'), subtitle: t('activities.letterSubtitles.grid', 'Karışık harflerden isteneni bul.'), color: 'amber' as const, hasSubCategories: true },
    { id: ActivityType.SoundPresence, icon: SpeakerIcon, title: t('activities.letter.soundPresence', 'Seste Harf Var mı?'), subtitle: t('activities.letterSubtitles.soundPresence', 'Görselin adında o ses var mı?'), color: 'teal' as const, hasSubCategories: true },
    { id: ActivityType.FindTheLetter, icon: SearchIcon, title: t('activities.letter.findTheLetter', 'Harf Bulma Oyunu'), subtitle: t('activities.letterSubtitles.findTheLetter', 'Kelimenin içindeki harfleri bul.'), color: 'indigo' as const, hasSubCategories: true },
    { id: ActivityType.FindTheSoundInImage, icon: ImageIcon, title: t('activities.letter.findSoundInImage', 'Görselde Sesi Bul'), subtitle: t('activities.letterSubtitles.findSoundInImage', 'İstenen sesi içeren görseli seç.'), color: 'emerald' as const, hasSubCategories: true },
    ...(lang === 'tr' || lang === 'az' ? [
      { id: ActivityType.Syllabification, icon: SyllableIcon, title: t('activities.letter.syllabification', 'Heceleme Oyunu'), subtitle: t('activities.letterSubtitles.syllabification', 'Kelimeleri hecelerine ayır.'), color: 'rose' as const, hasSubCategories: true },
    ] : []),
    ...(lang === 'tr' ? [
      { id: ActivityType.EmbeddedStory, icon: BookOpenIcon, title: t('activities.letter.embeddedStory', 'Hikaye Zamanı'), subtitle: t('activities.letterSubtitles.embeddedStory', 'Harfle ilgili hikayeleri dinle.'), color: 'purple' as const, hasSubCategories: false },
      { id: ActivityType.Basara, icon: SyllableIcon, title: t('activities.letter.basara', 'BASARA Yöntemi'), subtitle: t('activities.letterSubtitles.basara', 'Önce ünlüler, sonra heceler: adım adım oku.'), color: 'blue' as const, hasSubCategories: false },
      { id: ActivityType.Basara2, icon: SyllableIcon, title: t('activities.letter.basara2', 'BASARA 2 (Klasik)'), subtitle: t('activities.letterSubtitles.basara2', 'Yaygın sürüm: a-serisi heceler ve tüm ünlüler.'), color: 'cyan' as const, hasSubCategories: false },
    ] : []),
  ];
  const activities = allActivities;

  const getAggregateStats = (activityId: ActivityType): ActivityStats => {
      let totalCorrect = 0;
      let totalQuestions = 0;
      let attempts = 0;
      const prefix = String(activityId);
    const lang = getCurrentLanguage();

      // Aggregate stats from sub-categories (letters or groups)
      if (activityId === ActivityType.Syllabification) {
          for (let i = 1; i <= 5; i++) { // For 5 groups
              const key = `${prefix}-${i}`;
              const stats = activityStats[key];
              if (stats) {
                  attempts += stats.attempts;
                  totalCorrect += stats.totalCorrect || 0;
                  totalQuestions += stats.totalQuestions || 0;
              }
          }
      } else {
      const allLetters = getAlphabet(lang);
          for (const letter of allLetters) {
              const key = `${prefix}-${letter}`;
              const stats = activityStats[key];
              if (stats) {
                  attempts += stats.attempts;
                  totalCorrect += stats.totalCorrect || 0;
                  totalQuestions += stats.totalQuestions || 0;
              }
          }
      }

      // Also include the main activity's stats if they exist
      const mainStats = activityStats[prefix];
      if (mainStats) {
          attempts = Math.max(attempts, mainStats.attempts); // Use the larger attempt count
      }
      
      return { attempts, completions: 0, totalCorrect, totalQuestions };
  };

  const isSimpleTheme = theme === 'simple';
  const titleColorClass = isCosmic 
    ? 'bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-indigo-200 to-fuchsia-300 text-glow-planet drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
    : isSimpleTheme ? 'text-purple-900' : 'text-white text-shadow-soft';
  const subtitleColorClass = isCosmic
    ? 'text-sky-200/90 font-semibold drop-shadow-[0_2px_8px_rgba(15,23,42,0.55)]'
    : isSimpleTheme ? 'text-pink-700' : 'text-white/90 text-shadow-soft';
  const iconColorClass = isCosmic ? 'text-sky-300' : isSimpleTheme ? 'text-purple-700' : 'text-white';

  // Cosmic gradient palettes for each activity
  const cosmicPalettes: Record<string, string> = {
    [ActivityType.FindTheLetterInGrid]: 'from-amber-400 via-orange-300 to-yellow-200',
    [ActivityType.SoundPresence]: 'from-teal-400 via-cyan-300 to-sky-200',
    [ActivityType.FindTheLetter]: 'from-indigo-400 via-purple-300 to-fuchsia-200',
    [ActivityType.FindTheSoundInImage]: 'from-emerald-400 via-green-300 to-lime-200',
    [ActivityType.Syllabification]: 'from-rose-400 via-pink-300 to-fuchsia-200',
    [ActivityType.EmbeddedStory]: 'from-purple-400 via-violet-300 to-indigo-200',
    [ActivityType.Basara]: 'from-blue-400 via-sky-300 to-cyan-200',
    [ActivityType.Basara2]: 'from-cyan-400 via-teal-300 to-sky-200',
  };

  // Render cosmic activity card
  const renderCosmicCard = (activity: typeof activities[0], stats: ActivityStats | undefined, isDisabled: boolean) => {
    const Icon = activity.icon;
    const gradient = cosmicPalettes[activity.id];
    return (
      <button
        key={activity.id}
        onClick={() => !isDisabled && onSelectActivity(activity.id)}
        disabled={isDisabled}
        className={`group relative overflow-hidden rounded-3xl p-4 min-h-[180px] flex flex-col transition-all duration-300 ${
          isDisabled 
            ? 'opacity-40 cursor-not-allowed' 
            : 'hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] active:scale-95'
        }`}
        style={{
          background: isDisabled 
            ? 'linear-gradient(135deg, rgba(51,65,85,0.6), rgba(30,41,59,0.6))' 
            : `linear-gradient(135deg, rgba(15,23,42,0.85), rgba(30,41,59,0.85))`,
          border: '2px solid rgba(56,189,248,0.3)',
        }}
      >
        {/* Inner glow layer */}
        <div 
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity rounded-3xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${gradient.split(' ')[0].replace('from-', '')}, transparent 70%)`,
          }}
        />
        
        {/* Icon orb */}
        <div className="relative z-10 mb-2 flex justify-center flex-shrink-0">
          <div 
            className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg ${!isDisabled && 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]'} transition-shadow`}
          >
            <Icon className="w-7 h-7 text-slate-900" />
          </div>
        </div>
        
        {/* Title */}
        <h3 className="relative z-10 text-center font-bold text-sm text-sky-100 mb-1 group-hover:text-white transition-colors flex-shrink-0">
          {activity.title}
        </h3>
        
        {/* Subtitle */}
        <p className="relative z-10 text-center text-xs text-sky-300/70 mb-2 flex-shrink-0 line-clamp-1">
          {activity.subtitle}
        </p>
        
        {/* Progress */}
        {activity.hasSubCategories && stats && (
          <div className="relative z-10 mt-auto">
            <ProgressIndicator 
              mode="aggregate"
              attempts={stats.attempts} 
              completions={stats.completions}
              totalCorrect={stats.totalCorrect}
              totalQuestions={stats.totalQuestions}
            />
          </div>
        )}
      </button>
    );
  };

  // Render underwater (deneme) card — jellyfish style
  const renderUnderwaterCard = (activity: typeof activities[0], stats: ActivityStats | undefined, isDisabled: boolean, idx: number) => {
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
        key={activity.id}
        onClick={() => !isDisabled && onSelectActivity(activity.id)}
        disabled={isDisabled}
        className={`relative flex flex-col items-center transition-all duration-300 ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'}`}>
        <div className={`w-32 h-24 sm:w-36 sm:h-28 rounded-t-full bg-gradient-to-b ${color} border-2 border-white/30 backdrop-blur-sm shadow-lg relative overflow-hidden ${!isDisabled && 'hover:shadow-2xl'}`}>
          <div className="absolute top-1 left-3 w-4 h-4 bg-white/40 rounded-full blur-sm"></div>
          <div className="absolute top-2 right-4 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-md" />
          </div>
        </div>

        <div className="flex gap-0.5 justify-center -mt-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`w-0.5 h-8 bg-gradient-to-b ${color} opacity-60 rounded-full animate-tentacle`} style={{ height: `${32 + Math.random() * 12}px`, animationDelay: `${i * 0.15}s`, transformOrigin: 'top' }} />
          ))}
        </div>

        <h3 className="text-sm font-bold text-white text-center mt-2 line-clamp-2 px-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">{activity.title}</h3>
        <p className="text-xs text-white/90 text-center line-clamp-1 px-2 mb-2 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]">{activity.subtitle}</p>
        {activity.hasSubCategories && stats && (
          <div className="w-full px-2">
            <ProgressIndicator
              mode="aggregate"
              attempts={stats.attempts}
              completions={stats.completions}
              totalCorrect={stats.totalCorrect}
              totalQuestions={stats.totalQuestions}
            />
          </div>
        )}
      </button>
    );
  };

  return (
    <div className={`relative flex flex-col items-center justify-start h-full max-w-2xl mx-auto p-4 sm-landscape:p-2 animate-fade-in ${isCosmic || isUnderwater ? 'overflow-hidden' : 'overflow-y-auto'}`}>
      {isCosmic && (
        <CosmicBackdrop variant="light" showMeteors={false} />
      )}
      {isUnderwater && (
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
        </>
      )}
      
      {/* Cosmic: Wrap in big panel */}
      <div className={`relative w-full h-full flex flex-col ${isCosmic || isUnderwater ? 'bg-gradient-to-b from-[#001122]/60 via-[#001a2e]/50 to-[#000814]/40 border border-cyan-400/20 backdrop-blur-lg rounded-3xl shadow-xl p-4 sm-landscape:p-3 overflow-y-auto' : ''}`}>
        {isCosmic && (
          <>
            <PanelStars count={58} className="rounded-3xl" />
            <div className="cosmic-panel-nebula rounded-3xl" />
          </>
        )}
        
        <div className={`relative z-10 w-full flex justify-between items-center mb-4 sm-landscape:mb-2 px-3 py-1.5 ${isCosmic ? 'bg-slate-900/60 border border-sky-400/20 backdrop-blur-sm rounded-full' : ''}`}>
          <button 
            onClick={onBack} 
            className={`p-2 rounded-full ${isCosmic ? 'hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} transition-colors`} 
            aria-label={t('app.back', 'Go back')}
          >
            <ArrowLeftIcon className={`w-8 h-8 sm-landscape:w-7 sm-landscape:h-7 ${iconColorClass}`} />
          </button>
          <h1 className={`flex-1 text-center text-3xl sm:text-4xl sm-landscape:text-2xl font-black ${titleColorClass}`}>
            {t('menu.letterSound.title', 'Harf ve Sesler')}
          </h1>
          <div className="w-12 h-12 sm-landscape:w-11 sm-landscape:h-11" />
        </div>

        <p className={`relative z-10 text-center mb-3 sm-landscape:mb-2 text-lg sm-landscape:text-base ${subtitleColorClass}`}>
          {t('letters.menuSubtitle', 'Bir etkinlik seç ve harfleri öğrenmeye başla!')}
        </p>
        {pack?.notes && (
          <div className={`relative z-10 mb-5 sm-landscape:mb-3 px-4 py-2 rounded-xl text-xs shadow ${isCosmic ? 'bg-slate-800/70 border border-sky-400/30 text-sky-200' : 'bg-amber-50 border border-amber-200 text-amber-800'}`}> 
            {t('activities.letter.betaNotice', pack.notes)}
          </div>
        )}
        
        <div className="relative z-10 w-full animate-fade-in">
          {isCosmic ? (
            <div className="grid grid-cols-2 sm-landscape:grid-cols-3 gap-4 sm-landscape:gap-3">
              {activities.map((activity) => {
                const stats = activity.hasSubCategories ? getAggregateStats(activity.id) : activityStats[String(activity.id)];
                const isDisabled = (activity.id === ActivityType.Basara || activity.id === ActivityType.Basara2) ? false : !enabledActivities.has(String(activity.id));
                return renderCosmicCard(activity, stats, isDisabled);
              })}
            </div>
          ) : isUnderwater ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm-landscape:gap-3">
              {activities.map((activity, idx) => {
                const stats = activity.hasSubCategories ? getAggregateStats(activity.id) : activityStats[String(activity.id)];
                const isDisabled = (activity.id === ActivityType.Basara || activity.id === ActivityType.Basara2) ? false : !enabledActivities.has(String(activity.id));
                return renderUnderwaterCard(activity, stats, isDisabled, idx);
              })}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm-landscape:grid-cols-3 gap-4 sm-landscape:gap-2">
              {activities.map((activity) => {
                const stats = activity.hasSubCategories ? getAggregateStats(activity.id) : activityStats[String(activity.id)];
                const isDisabled = (activity.id === ActivityType.Basara || activity.id === ActivityType.Basara2) ? false : !enabledActivities.has(String(activity.id));
                return (
                  <MenuButton
                    key={activity.id}
                    icon={activity.icon}
                    title={activity.title}
                    subtitle={activity.subtitle}
                    onClick={() => onSelectActivity(activity.id)}
                    color={activity.color}
                    theme={theme}
                    disabled={isDisabled}
                  >
                    {activity.hasSubCategories && stats && (
                      <ProgressIndicator 
                        mode="aggregate"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(LetterActivitiesMenuScreen);
