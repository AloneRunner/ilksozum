import React from 'react';
import { ActivityCategory, ActivityType } from '../types.ts';
import { ALL_SUB_ACHIEVEMENTS } from '../constants.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import CrownIcon from './icons/CrownIcon.tsx';
import LockClosedIcon from './icons/LockClosedIcon.tsx';
import { t, getCurrentLanguage } from '../i18n/index.ts';
import { useAppContext } from '../contexts/AppContext.ts';
// Note: dependency display was removed per request; Activity Management only toggles enable/disable.

interface ActivityManagementScreenProps {
  onBack: () => void;
  category: ActivityCategory;
  enabledActivities: Set<string>;
  onToggleActivity: (activityId: string) => void;
  onToggleCategory: (category: ActivityCategory, isEnabled: boolean) => void;
  isPremium: boolean;
  showPremiumToast: () => void;
}

const ToggleSwitch: React.FC<{ isEnabled: boolean; onToggle: () => void; themeVariant?: 'cat' | 'hilal' | 'snow' | 'fox' }> = ({ isEnabled, onToggle, themeVariant }) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${
      themeVariant === 'cat'
        ? 'focus:ring-orange-300'
        : themeVariant === 'hilal'
        ? 'focus:ring-indigo-300'
        : themeVariant === 'snow'
        ? 'focus:ring-sky-300'
        : themeVariant === 'fox'
        ? 'focus:ring-amber-300'
        : 'focus:ring-sky-500'
    } ${
      isEnabled
        ? themeVariant === 'cat'
          ? 'bg-orange-400'
        : themeVariant === 'hilal'
          ? 'bg-indigo-500'
        : themeVariant === 'snow'
          ? 'bg-sky-400'
        : themeVariant === 'fox'
          ? 'bg-amber-400'
          : 'bg-green-500'
        : 'bg-slate-300'
    }`}
  >
    <span
      className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${
        isEnabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const ActivityManagementScreen: React.FC<ActivityManagementScreenProps> = ({
  onBack,
  category,
  enabledActivities,
  onToggleActivity,
  onToggleCategory,
  isPremium,
  showPremiumToast
}) => {
  const { settings } = useAppContext();
  const activities = ALL_SUB_ACHIEVEMENTS.filter(sa => sa.category === category);
  const lang = getCurrentLanguage();
  const themeVariant =
    settings.theme === 'kedi'
      ? 'cat'
      : settings.theme === 'ay2'
      ? 'hilal'
      : settings.theme === 'kar'
      ? 'snow'
      : settings.theme === 'tilki'
      ? 'fox'
      : undefined;

  
  // Exclude "Hikaye Zamanı" from being disabled
  const manageableActivities = activities.filter(act => String(act.id) !== String(ActivityType.EmbeddedStory));

  const allEnabled = manageableActivities.every(act => enabledActivities.has(String(act.id)));

  const handleToggleAll = () => {
    onToggleCategory(category, !allEnabled);
  };

  const getActivityDisplayName = (activityId: string | number, fallback: string) => {
    if (category === ActivityCategory.LetterSound) {
      switch (activityId) {
        case ActivityType.Syllabification:
          return t('activities.letter.syllabification', fallback);
        case ActivityType.FindTheLetterInGrid:
          return t('activities.letter.grid', fallback);
        case ActivityType.FindTheSoundInImage:
          return t('activities.letter.findSoundInImage', fallback);
        case ActivityType.EmbeddedStory:
          return t('activities.letter.embeddedStory', fallback);
        case ActivityType.SoundPresence:
          return t('activities.letter.soundPresence', fallback);
        case ActivityType.FindTheLetter:
          return t('activities.letter.findTheLetter', fallback);
        default:
          return fallback;
      }
    }
    if (category === ActivityCategory.Objects && typeof activityId === 'string') {
      return t(`objects.categories.${activityId}`, fallback);
    }
    if (category === ActivityCategory.Concept && typeof activityId === 'number') {
      // Map ActivityType to concepts.activities.* keys
      switch (activityId) {
        case ActivityType.YesNo: return t('concepts.activities.yesNo', fallback);
        case ActivityType.Colors: return t('concepts.activities.colors', fallback);
        case ActivityType.Shapes: return t('concepts.activities.shapes', fallback);
        case ActivityType.Emotions: return t('concepts.activities.emotions', fallback);
        case ActivityType.ParlakMat: return t('concepts.activities.parlakMat', fallback);
        case ActivityType.AcikKoyu: return t('concepts.activities.acikKoyu', fallback);
        case ActivityType.HavaDurumu: return t('concepts.activities.havaDurumu', fallback);
        case ActivityType.TehlikeliGuvenli: return t('concepts.activities.tehlikeliGuvenli', fallback);
        case ActivityType.YenirYenmez: return t('concepts.activities.yenirYenmez', fallback);
        case ActivityType.SeffafOpak: return t('concepts.activities.seffafOpak', fallback);
        case ActivityType.StraightCurved: return t('concepts.activities.straightCurved', fallback);
        case ActivityType.BigSmall: return t('concepts.activities.bigSmall', fallback);
        case ActivityType.LongShort: return t('concepts.activities.longShort', fallback);
        case ActivityType.ThinThick: return t('concepts.activities.thinThick', fallback);
        case ActivityType.WideNarrow: return t('concepts.activities.wideNarrow', fallback);
        case ActivityType.HeavyLight: return t('concepts.activities.heavyLight', fallback);
        case ActivityType.DerinSig: return t('concepts.activities.derinSig', fallback);
        case ActivityType.KalabalikTenha: return t('concepts.activities.kalabalikTenha', fallback);
        case ActivityType.HardSoft: return t('concepts.activities.hardSoft', fallback);
        case ActivityType.RoughSmooth: return t('concepts.activities.roughSmooth', fallback);
        case ActivityType.DikenliPuruzsuz: return t('concepts.activities.dikenliPuruzsuz', fallback);
        case ActivityType.KirisikDuzgun: return t('concepts.activities.kirisikDuzgun', fallback);
        case ActivityType.SivriKut: return t('concepts.activities.sivriKut', fallback);
        case ActivityType.OldNew: return t('concepts.activities.oldNew', fallback);
        case ActivityType.YoungOld: return t('concepts.activities.youngOld', fallback);
        case ActivityType.CleanDirty: return t('concepts.activities.cleanDirty', fallback);
        case ActivityType.WetDry: return t('concepts.activities.wetDry', fallback);
        case ActivityType.OpenClosed: return t('concepts.activities.openClosed', fallback);
        case ActivityType.AliveLifeless: return t('concepts.activities.aliveLifeless', fallback);
        case ActivityType.BrokenIntact: return t('concepts.activities.brokenIntact', fallback);
        case ActivityType.MessyClean: return t('concepts.activities.messyClean', fallback);
        case ActivityType.TazeBayat: return t('concepts.activities.tazeBayat', fallback);
        case ActivityType.DugumCozuk: return t('concepts.activities.dugumCozuk', fallback);
        case ActivityType.HungryFull: return t('concepts.activities.hungryFull', fallback);
        case ActivityType.TembelCaliskan: return t('concepts.activities.tembelCaliskan', fallback);
        case ActivityType.HotCold: return t('concepts.activities.hotCold', fallback);
        case ActivityType.BitterSweet: return t('concepts.activities.bitterSweet', fallback);
        case ActivityType.TersDuz: return t('concepts.activities.tersDuz', fallback);
        case ActivityType.FewMuch: return t('concepts.activities.fewMuch', fallback);
        case ActivityType.HalfQuarterWhole: return t('concepts.activities.halfQuarterWhole', fallback);
        case ActivityType.FullEmpty: return t('concepts.activities.fullEmpty', fallback);
        case ActivityType.OddEven: return t('concepts.activities.oddEven', fallback);
        case ActivityType.OnUnder: return t('concepts.activities.onUnder', fallback);
        case ActivityType.BelowAbove: return t('concepts.activities.belowAbove', fallback);
        case ActivityType.InFrontOfBehind: return t('concepts.activities.inFrontOfBehind', fallback);
        case ActivityType.InsideOutside: return t('concepts.activities.insideOutside', fallback);
        case ActivityType.BesideOpposite: return t('concepts.activities.besideOpposite', fallback);
        case ActivityType.Between: return t('concepts.activities.between', fallback);
        case ActivityType.LeftRight: return t('concepts.activities.leftRight', fallback);
        case ActivityType.NearFar: return t('concepts.activities.nearFar', fallback);
        case ActivityType.HighLow: return t('concepts.activities.highLow', fallback);
        case ActivityType.BeforeAfter: return t('concepts.activities.beforeAfter', fallback);
        case ActivityType.DayNight: return t('concepts.activities.dayNight', fallback);
        case ActivityType.FastSlow: return t('concepts.activities.fastSlow', fallback);
        case ActivityType.Senses: return t('concepts.activities.senses', fallback);
        default: return fallback;
      }
    }
    if (category === ActivityCategory.Reasoning && typeof activityId === 'number') {
      switch (activityId) {
        case ActivityType.WhatDoesntBelong: return t('reasoning.activities.whatDoesntBelong.title', fallback);
        // FunctionalMatching removed - now integrated into 5N1K "What?" category
        case ActivityType.CauseEffect: return t('reasoning.activities.causeEffect.title', fallback);
        case ActivityType.SequencingStories: return t('reasoning.activities.sequencingStories.title', fallback);
        case ActivityType.PatternCompletion: return t('reasoning.activities.patternCompletion.title', fallback);
        case ActivityType.Sudoku: return t('reasoning.activities.sudoku.title', fallback);
        case ActivityType.MemoryCards: return t('reasoning.activities.memoryCards.title', fallback);
        case ActivityType.DragAndDropCounting: return t('reasoning.activities.dragAndDropCounting.title', fallback);
        case ActivityType.DragAndDropPositioning: return t('reasoning.activities.dragAndDropPositioning.title', fallback);
        default: return fallback;
      }
    }
    if (category === ActivityCategory.RelativeComparison && typeof activityId === 'number') {
      switch (activityId) {
        case ActivityType.RelativeBigSmall: return t('concepts.activities.bigSmall', fallback);
        case ActivityType.RelativeWideNarrow: return t('concepts.activities.wideNarrow', fallback);
        case ActivityType.RelativeThinThick: return t('concepts.activities.thinThick', fallback);
        case ActivityType.RelativeFewMuch: return t('concepts.activities.fewMuch', fallback);
        case ActivityType.RelativeLongShort: return t('concepts.activities.longShort', fallback);
        case ActivityType.RelativeNearFar: return t('concepts.activities.nearFar', fallback);
        case ActivityType.RelativeHighLow: return t('concepts.activities.highLow', fallback);
        default: return fallback;
      }
    }
    return fallback;
  };
  
  const getCategoryTitle = (cat: ActivityCategory) => {
    switch (cat) {
      case ActivityCategory.LetterSound:
        return t('achievements.categories.letterSound', 'Harf ve Sesler');
      case ActivityCategory.Objects:
        return t('achievements.categories.objects', 'Nesneleri Tanıyalım');
      case ActivityCategory.Concept:
        return t('achievements.categories.concept', 'Kavramları Öğrenelim');
      case ActivityCategory.Reasoning:
        return t('achievements.categories.reasoning', 'Akıl Oyunları');
      case ActivityCategory.FiveWOneH:
        return t('achievements.categories.fiveWOneH', '5N1K');
      case ActivityCategory.FineMotor:
        return t('menu.fineMotor.title', 'İnce Motor');
      case ActivityCategory.RelativeComparison:
        return t('experimental.relativeComparison.title', 'Göreceli Karşılaştırma');
      default:
        return t('tabs.activities', 'Etkinlikler');
    }
  };

  const catPalette = {
    containerClass: 'relative flex flex-col items-center justify-start h-full max-w-2xl mx-auto p-4 animate-fade-in overflow-hidden',
    overlay: {
      layers: [
        { className: 'absolute inset-0 bg-gradient-to-b from-sky-200/75 via-white/85 to-amber-100/80' },
        { className: 'absolute bottom-14 left-1/2 -translate-x-1/2 w-[220px] h-[220px] bg-amber-200/80 rounded-full blur-3xl opacity-70' },
      ],
      decorations: [
        { className: 'absolute bottom-16 left-1/2 -translate-x-1/2 text-6xl opacity-80 drop-shadow-[0_18px_30px_rgba(249,115,22,0.35)]', content: '\uD83D\uDC31' },
      ],
    },
    headerContainerClass: 'w-full flex items-center mb-8 gap-3 relative px-3 py-2 rounded-3xl border border-orange-200/60 backdrop-blur-md',
    headerButtonClass: 'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/80 border border-orange-200/60 shadow-[0_14px_28px_rgba(249,115,22,0.22)] hover:bg-white/90 transition-colors',
    backIconClass: 'text-orange-500',
    headerTitleClass: 'flex-1 text-center text-2xl sm:text-3xl font-black text-orange-900 drop-shadow-[0_4px_14px_rgba(255,255,255,0.65)]',
    headerSectionStyle: {
      background: 'linear-gradient(180deg, rgba(191,219,254,0.85) 0%, rgba(255,255,255,0.92) 65%, rgba(254,215,170,0.9) 100%)',
      boxShadow: '0 24px 48px rgba(59,130,246,0.25)',
    },
    headerSpacer: true,
    enableAllCardClass: 'flex justify-between items-center bg-white/85 border border-orange-200/55 p-4 rounded-2xl shadow-[0_18px_36px_rgba(249,115,22,0.2)] backdrop-blur-md',
    enableAllTitleClass: 'font-bold text-lg text-orange-900 drop-shadow-[0_2px_6px_rgba(255,255,255,0.6)]',
    enableAllSubtitleClass: 'text-sm text-orange-700 drop-shadow-[0_1px_4px_rgba(255,255,255,0.5)]',
    activityCardBase: 'relative flex justify-between items-center p-4 rounded-2xl border border-orange-200/55 bg-white/75 shadow-[0_16px_32px_rgba(249,115,22,0.18)] transition-all duration-200 hover:bg-white/85',
    lockedInfoClass: 'flex items-center gap-2 text-orange-500 drop-shadow-[0_2px_6px_rgba(255,255,255,0.45)]',
    activityLabelClass: 'font-semibold text-orange-900 drop-shadow-[0_2px_6px_rgba(255,255,255,0.55)]',
    contentSpacingClass: 'space-y-4',
    crownIconClass: 'text-orange-400',
    lockIconClass: 'text-orange-400/80',
    activityDecoration: { className: 'absolute -right-1 -bottom-2 text-xl opacity-60 pointer-events-none select-none', content: '\uD83D\uDC3E' },
    footerDecoration: {
      wrapperClass: 'flex justify-center mt-6 pointer-events-none select-none',
      innerClass: 'text-6xl drop-shadow-[0_18px_32px_rgba(249,115,22,0.35)] animate-bounce',
      content: '\uD83D\uDC31',
    },
    dividerClass: 'border-orange-200/60',
  };

  const hilalPalette = {
    containerClass: 'relative flex flex-col items-center justify-start h-full max-w-2xl mx-auto p-4 animate-fade-in overflow-hidden',
    overlay: {
      layers: [
        { className: 'absolute inset-0 bg-gradient-to-b from-indigo-200/75 via-white/88 to-slate-100/80' },
        { className: 'absolute bottom-14 left-1/2 -translate-x-1/2 w-[220px] h-[220px] bg-indigo-200/70 rounded-full blur-3xl opacity-65' },
      ],
      decorations: [
        { className: 'absolute top-8 right-10 text-4xl opacity-70 drop-shadow-[0_14px_28px_rgba(79,70,229,0.28)]', content: '\uD83C\uDF19' },
        { className: 'absolute bottom-12 left-12 text-3xl opacity-60 drop-shadow-[0_14px_28px_rgba(79,70,229,0.25)]', content: '\u2728' },
      ],
    },
    headerContainerClass: 'w-full flex items-center mb-8 gap-3 relative px-3 py-2 rounded-3xl border border-indigo-200/60 backdrop-blur-md',
    headerButtonClass: 'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/80 border border-indigo-200/60 shadow-[0_14px_28px_rgba(79,70,229,0.22)] hover:bg-white/90 transition-colors',
    backIconClass: 'text-indigo-500',
    headerTitleClass: 'flex-1 text-center text-2xl sm:text-3xl font-black text-indigo-900 drop-shadow-[0_4px_14px_rgba(199,210,254,0.65)]',
    headerSectionStyle: {
      background: 'linear-gradient(180deg, rgba(199,210,254,0.9) 0%, rgba(255,255,255,0.94) 65%, rgba(191,219,254,0.9) 100%)',
      boxShadow: '0 24px 48px rgba(79,70,229,0.22)',
    },
    headerSpacer: true,
    enableAllCardClass: 'flex justify-between items-center bg-white/85 border border-indigo-200/55 p-4 rounded-2xl shadow-[0_18px_36px_rgba(79,70,229,0.2)] backdrop-blur-md',
    enableAllTitleClass: 'font-bold text-lg text-indigo-900 drop-shadow-[0_2px_6px_rgba(199,210,254,0.6)]',
    enableAllSubtitleClass: 'text-sm text-indigo-700 drop-shadow-[0_1px_4px_rgba(199,210,254,0.5)]',
    activityCardBase: 'relative flex justify-between items-center p-4 rounded-2xl border border-indigo-200/55 bg-white/78 shadow-[0_16px_32px_rgba(79,70,229,0.18)] transition-all duration-200 hover:bg-white/88',
    lockedInfoClass: 'flex items-center gap-2 text-indigo-500 drop-shadow-[0_2px_6px_rgba(199,210,254,0.45)]',
    activityLabelClass: 'font-semibold text-indigo-900 drop-shadow-[0_2px_6px_rgba(199,210,254,0.55)]',
    contentSpacingClass: 'space-y-4',
    crownIconClass: 'text-indigo-400',
    lockIconClass: 'text-indigo-400/80',
    activityDecoration: { className: 'absolute -right-1 -bottom-2 text-xl opacity-60 pointer-events-none select-none', content: '\u2728' },
    footerDecoration: {
      wrapperClass: 'flex justify-center mt-6 pointer-events-none select-none',
      innerClass: 'text-5xl text-indigo-500 drop-shadow-[0_18px_32px_rgba(79,70,229,0.28)] animate-cat-wave',
      content: '\uD83C\uDF1F',
    },
    dividerClass: 'border-indigo-200/60',
  };

  const snowPalette = {
    containerClass: 'relative flex flex-col items-center justify-start h-full max-w-2xl mx-auto p-4 animate-fade-in overflow-hidden',
    overlay: {
      layers: [
        { className: 'absolute inset-0 bg-gradient-to-b from-sky-100/75 via-white/88 to-sky-200/70' },
        { className: 'absolute -bottom-20 right-8 w-[260px] h-[260px] bg-sky-200/60 rounded-full blur-3xl opacity-65' },
      ],
      decorations: [
        { className: 'absolute top-10 left-8 text-4xl opacity-70 drop-shadow-[0_16px_32px_rgba(56,189,248,0.26)]', content: '\u2744' },
        { className: 'absolute bottom-12 right-12 text-3xl opacity-60 drop-shadow-[0_14px_28px_rgba(125,211,252,0.24)]', content: '\u2745' },
      ],
    },
    headerContainerClass: 'w-full flex items-center mb-8 gap-3 relative px-3 py-2 rounded-3xl border border-sky-100/60 backdrop-blur-xl',
    headerButtonClass: 'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/85 border border-sky-100/60 shadow-[0_14px_28px_rgba(56,189,248,0.22)] hover:bg-white/90 transition-colors',
    backIconClass: 'text-sky-600',
    headerTitleClass: 'flex-1 text-center text-2xl sm:text-3xl font-black text-sky-900 drop-shadow-[0_4px_14px_rgba(148,197,253,0.55)]',
    headerSectionStyle: {
      background: 'linear-gradient(180deg, rgba(226,232,240,0.9) 0%, rgba(255,255,255,0.94) 65%, rgba(186,230,253,0.9) 100%)',
      boxShadow: '0 24px 48px rgba(56,189,248,0.2)',
    },
    headerSpacer: true,
    enableAllCardClass: 'flex justify-between items-center bg-white/85 border border-sky-100/55 p-4 rounded-2xl shadow-[0_18px_36px_rgba(56,189,248,0.18)] backdrop-blur-md',
    enableAllTitleClass: 'font-bold text-lg text-sky-900 drop-shadow-[0_2px_6px_rgba(148,197,253,0.55)]',
    enableAllSubtitleClass: 'text-sm text-sky-700 drop-shadow-[0_1px_4px_rgba(186,230,253,0.45)]',
    activityCardBase: 'relative flex justify-between items-center p-4 rounded-2xl border border-sky-100/55 bg-white/78 shadow-[0_16px_32px_rgba(56,189,248,0.18)] transition-all duration-200 hover:bg-white/88',
    lockedInfoClass: 'flex items-center gap-2 text-sky-500 drop-shadow-[0_2px_6px_rgba(186,230,253,0.45)]',
    activityLabelClass: 'font-semibold text-sky-900 drop-shadow-[0_2px_6px_rgba(148,197,253,0.5)]',
    contentSpacingClass: 'space-y-4',
    crownIconClass: 'text-sky-400',
    lockIconClass: 'text-sky-400/80',
    activityDecoration: { className: 'absolute -right-1 -bottom-2 text-xl opacity-60 pointer-events-none select-none', content: '\u2744' },
    footerDecoration: {
      wrapperClass: 'flex justify-center mt-6 pointer-events-none select-none',
      innerClass: 'text-5xl text-sky-500 drop-shadow-[0_18px_32px_rgba(56,189,248,0.26)] animate-bounce',
      content: '\u2744',
    },
    dividerClass: 'border-sky-100/60',
  };

  const foxPalette = {
    containerClass: 'relative flex flex-col items-center justify-start h-full max-w-2xl mx-auto p-4 animate-fade-in overflow-hidden',
    overlay: {
      layers: [
        { className: 'absolute inset-0 bg-gradient-to-b from-amber-50/60 via-white/85 to-emerald-50/60' },
        { className: 'absolute -bottom-14 right-10 w-[240px] h-[240px] bg-emerald-100/50 rounded-full blur-3xl opacity-60' },
      ],
      decorations: [
        { className: 'absolute top-10 left-8 text-4xl opacity-65 drop-shadow-[0_16px_32px_rgba(245,158,11,0.25)]', content: '\u2728' },
        { className: 'absolute bottom-12 right-14 text-4xl opacity-55 drop-shadow-[0_14px_28px_rgba(52,211,153,0.22)]', content: '\uD83E\uDD8A' },
      ],
    },
    headerContainerClass: 'w-full flex items-center mb-8 gap-3 relative px-3 py-2 rounded-3xl border border-amber-100/55 backdrop-blur-lg bg-white/60',
    headerButtonClass: 'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/85 border border-amber-100/55 shadow-[0_14px_28px_rgba(245,158,11,0.2)] hover:bg-white/90 transition-colors',
    backIconClass: 'text-emerald-600',
    headerTitleClass: 'flex-1 text-center text-2xl sm:text-3xl font-black text-emerald-900 drop-shadow-[0_4px_14px_rgba(255,255,255,0.55)]',
    headerSectionStyle: {
      background: 'linear-gradient(180deg, rgba(254,243,199,0.85) 0%, rgba(255,255,255,0.92) 60%, rgba(187,247,208,0.85) 100%)',
      boxShadow: '0 24px 48px rgba(52,211,153,0.18)',
    },
    headerSpacer: true,
    enableAllCardClass: 'flex justify-between items-center bg-white/75 border border-amber-100/50 p-4 rounded-2xl shadow-[0_18px_36px_rgba(245,158,11,0.2)] backdrop-blur-md',
    enableAllTitleClass: 'font-bold text-lg text-emerald-900 drop-shadow-[0_2px_6px_rgba(255,255,255,0.5)]',
    enableAllSubtitleClass: 'text-sm text-emerald-700 drop-shadow-[0_1px_4px_rgba(255,255,255,0.45)]',
    activityCardBase: 'relative flex justify-between items-center p-4 rounded-2xl border border-amber-100/55 bg-white/70 shadow-[0_16px_32px_rgba(245,158,11,0.18)] transition-all duration-200 hover:bg-white/82',
    lockedInfoClass: 'flex items-center gap-2 text-amber-500 drop-shadow-[0_2px_6px_rgba(255,255,255,0.45)]',
    activityLabelClass: 'font-semibold text-emerald-900 drop-shadow-[0_2px_6px_rgba(255,255,255,0.5)]',
    contentSpacingClass: 'space-y-4',
    crownIconClass: 'text-amber-400',
    lockIconClass: 'text-amber-400/80',
    activityDecoration: { className: 'absolute -right-1 -bottom-2 text-xl opacity-60 pointer-events-none select-none', content: '\u2728' },
    footerDecoration: {
      wrapperClass: 'flex justify-center mt-6 pointer-events-none select-none',
      innerClass: 'text-5xl text-emerald-500 drop-shadow-[0_18px_32px_rgba(52,211,153,0.24)] animate-bounce',
      content: '\uD83E\uDD8A',
    },
    dividerClass: 'border-amber-100/55',
  };

  const palette = themeVariant === 'cat' ? catPalette : themeVariant === 'hilal' ? hilalPalette : themeVariant === 'snow' ? snowPalette : themeVariant === 'fox' ? foxPalette : null;

  const containerClass = palette?.containerClass ?? 'flex flex-col items-center justify-start h-full max-w-2xl mx-auto p-4 animate-fade-in';
  const overlayConfig = palette?.overlay;
  const headerContainerClass = palette?.headerContainerClass ?? 'w-full flex items-center mb-8 gap-3 relative';
  const headerButtonClass = palette?.headerButtonClass ?? 'absolute left-0 p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors';
  const backIconClass = palette?.backIconClass ?? 'text-slate-700';
  const headerTitleClass = palette?.headerTitleClass ?? 'flex-1 text-center text-2xl sm:text-3xl font-black text-slate-800';
  const headerSectionStyle = palette?.headerSectionStyle;
  const headerSpacer = palette?.headerSpacer ?? false;
  const enableAllCardClass = palette?.enableAllCardClass ?? 'flex justify-between items-center bg-white/90 p-4 rounded-xl shadow-md';
  const enableAllTitleClass = palette?.enableAllTitleClass ?? 'font-bold text-lg text-slate-800';
  const enableAllSubtitleClass = palette?.enableAllSubtitleClass ?? 'text-sm text-slate-500';
  const activityCardBase = palette?.activityCardBase ?? 'flex justify-between items-center bg-white/70 p-4 rounded-xl shadow-sm';
  const lockedInfoClass = palette?.lockedInfoClass ?? 'flex items-center gap-2 text-slate-400';
  const activityLabelClass = palette?.activityLabelClass ?? 'font-semibold text-slate-700';
  const contentSpacingClass = palette?.contentSpacingClass ?? '';
  const crownIconClass = palette?.crownIconClass ?? 'text-amber-500';
  const lockIconClass = palette?.lockIconClass ?? '';
  const activityDecoration = palette?.activityDecoration;
  const footerDecoration = palette?.footerDecoration;
  const dividerClass = palette?.dividerClass ?? 'border-slate-200/60';

  return (
    <div className={containerClass}>
      {overlayConfig && (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
          {overlayConfig.layers?.map((layer, idx) => (
            <div key={`layer-${idx}`} className={layer.className} />
          ))}
          {overlayConfig.decorations?.map((dec, idx) => (
            <span key={`dec-${idx}`} className={dec.className}>
              {dec.content}
            </span>
          ))}
        </div>
      )}
      <div
        className={headerContainerClass}
        style={headerSectionStyle}
      >
        <button 
          onClick={onBack} 
          className={headerButtonClass}
          aria-label={t('settingsEx.backToSettingsAria', 'Ayarlara dön')}
        >
          <ArrowLeftIcon className={`w-8 h-8 ${backIconClass}`} />
        </button>
        <h1 className={headerTitleClass}>
          {getCategoryTitle(category)}
        </h1>
        {headerSpacer && <div className="h-12 w-12 shrink-0" />}
      </div>

      <div className={`w-full flex-grow overflow-y-auto pr-2 ${contentSpacingClass}`}>
        {category === ActivityCategory.LetterSound && lang !== 'tr' && (
          <div className="mb-4 p-4 rounded-xl bg-amber-50 text-amber-800 border border-amber-200">
            {t('settings.languageNote', 'Letter activities are currently Turkish-only.')}
          </div>
        )}
        <div className="space-y-3">
          <div className={enableAllCardClass}>
            <div>
              <h3 className={enableAllTitleClass}>{t('activityMgmt.enableAll', 'Tümünü Etkinleştir')}</h3>
              <p className={enableAllSubtitleClass}>{t('activityMgmt.enableAllHelp', 'Bu kategorideki tüm etkinlikleri aç/kapat')}</p>
            </div>
            <ToggleSwitch isEnabled={allEnabled} onToggle={handleToggleAll} themeVariant={themeVariant} />
          </div>
          <hr className={`my-4 ${dividerClass}`} />
          {manageableActivities.map(activity => (
            <div 
                key={String(activity.id)} 
                onClick={!isPremium ? showPremiumToast : undefined}
                className={`${activityCardBase} ${!isPremium ? 'cursor-pointer' : ''}`}
            >
              {(() => {
                const resolved = getActivityDisplayName(activity.id, activity.name);
                const fallbackName = typeof activity.name === 'string' && activity.name.trim().length > 0 ? activity.name : t('experimental.relativeComparison.title', 'Göreceli Karşılaştırma');
                const labelToShow = resolved || fallbackName;
                return <span className={activityLabelClass}>{labelToShow}</span>;
              })()}
              {isPremium ? (
                <ToggleSwitch
                  isEnabled={enabledActivities.has(String(activity.id))}
                  onToggle={() => onToggleActivity(String(activity.id))}
                  themeVariant={themeVariant}
                />
              ) : (
                <div className={lockedInfoClass}>
                   <CrownIcon className={`w-6 h-6 ${crownIconClass}`} />
                   <LockClosedIcon className={`w-6 h-6 ${lockIconClass}`} />
                </div>
              )}
              {activityDecoration && (
                <span className={activityDecoration.className}>{activityDecoration.content}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      {footerDecoration && (
        <div className={footerDecoration.wrapperClass}>
          <div className="relative">
            <span className={footerDecoration.innerClass}>{footerDecoration.content}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityManagementScreen;
