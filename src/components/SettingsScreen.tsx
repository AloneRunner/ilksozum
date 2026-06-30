import React, { useState, useRef, useEffect } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import RestoreIcon from './icons/RestoreIcon.tsx';
import CrownIcon from './icons/CrownIcon.tsx';
import HeartIcon from './icons/HeartIcon.tsx';
import XCircleIcon from './icons/XCircleIcon.tsx';
import StarIcon from './icons/StarIcon.tsx';
import { ActivityCategory, Profile, ParentOverride } from '../types.ts';
import { ACTIVITY_METADATA_MAP } from '../constants/activityMetadata';
import { getAvatar } from './ProfileSelectionScreen.tsx';
import { ACHIEVEMENTS } from '../constants.ts';
import LockClosedIcon from './icons/LockClosedIcon.tsx';
import { getColorClasses } from '../themes/colorManager.ts';
import { THEMES, FREE_THEMES } from '../themes/themeManager.ts';
import { useAppContext } from '../contexts/AppContext.ts';
import { getUnlockedUnits } from '../services/masteryEngine.ts';
import { getUnitDefinition } from '../constants/unitDefinitions.ts';
import { t, getCurrentLanguage } from '../i18n/index.ts';
import {
  SimpleThemeWrapper,
  SIMPLE_THEME_TAG_CLASS,
  SIMPLE_THEME_TEXT_PRIMARY,
  SIMPLE_THEME_TEXT_SECONDARY,
} from '../themes/simpleTheme';
import CosmicBackdrop from './ui/CosmicBackdrop.tsx';
import PanelStars from './ui/PanelStars.tsx';

type ThemeVariant = 'cat' | 'hilal' | 'snow' | 'fox' | 'zurafa' | 'geceorman' | 'ay' | 'yagmur' | 'geometri' | 'gunbatimi' | 'tilki2' | 'kus' | 'gunes' | 'deneme' | 'deneme2' | 'simple';


interface SettingsScreenProps {
  onBack: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isAutoSpeakEnabled: boolean;
  onToggleAutoSpeak: () => void;
  isBanButtonEnabled: boolean;
  onToggleBanButton: () => void;
  isFastTransitionEnabled: boolean;
  onToggleFastTransition: () => void;
  isUnderwaterMusicEnabled: boolean;
  onToggleUnderwaterMusic: () => void;
  onSelectPrivacyPolicy: () => void;
  onManageBannedImages: () => void;
  isPremium: boolean;
  hasPurchasedPremium: boolean;
  onPurchaseMonthly: () => void;
  onPurchaseLifetime: () => void;
  onRestorePurchases: () => Promise<boolean>;
  onResetProgress: () => void;
  theme: string;
  onChangeTheme: (themeKey: string) => void;
  activeProfile: Profile;
  onManageProfiles: () => void;
  onManageActivities: (category: ActivityCategory) => void;
  showPremiumToast: () => void;
  onSelectAchievements: () => void;
  // Parent Override (Joker Hakkı)
  parentOverrides: ParentOverride[];
  onAddParentOverride: (activityId: string, durationHours: number, reason?: string, ignoreForProgress?: boolean) => void;
  onRemoveParentOverride: (activityId: string) => void;
  isSpamGuardEnabled: boolean;
  onToggleSpamGuard: () => void;
  spamGuardRoundThreshold: number;
  onChangeSpamGuardThreshold: (value: number) => void;
  isRealisticImagesEnabled: boolean;
  onToggleRealisticImages: () => void;
  isBasaraHighlightEnabled: boolean;
  onToggleBasaraHighlight: () => void;
}

const ToggleSwitch: React.FC<{ isEnabled: boolean; onToggle: () => void; themeVariant?: ThemeVariant }> = ({ isEnabled, onToggle, themeVariant }) => {
  const ringClass =
    themeVariant === 'cat'
      ? 'focus:ring-orange-300'
      : themeVariant === 'hilal'
      ? 'focus:ring-indigo-300'
      : themeVariant === 'snow'
      ? 'focus:ring-sky-300'
      : themeVariant === 'fox'
      ? 'focus:ring-emerald-300'
      : themeVariant === 'zurafa'
      ? 'focus:ring-cyan-300'
      : themeVariant === 'geceorman'
      ? 'focus:ring-emerald-400'
      : themeVariant === 'ay'
      ? 'focus:ring-indigo-400'
      : themeVariant === 'yagmur'
      ? 'focus:ring-blue-400'
      : themeVariant === 'deneme2'
      ? 'focus:ring-cyan-300'
      : 'focus:ring-indigo-400';
  const activeBackground =
    themeVariant === 'cat'
      ? 'bg-orange-400'
      : themeVariant === 'hilal'
      ? 'bg-indigo-500'
      : themeVariant === 'snow'
      ? 'bg-sky-400'
      : themeVariant === 'fox'
      ? 'bg-amber-400'
      : themeVariant === 'zurafa'
      ? 'bg-cyan-400'
      : themeVariant === 'geceorman'
      ? 'bg-emerald-500'
      : themeVariant === 'ay'
      ? 'bg-indigo-500'
      : themeVariant === 'yagmur'
      ? 'bg-blue-500'
      : themeVariant === 'deneme2'
      ? 'bg-cyan-400'
      : 'bg-indigo-500';
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${ringClass} ${
        isEnabled ? activeBackground : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${
          isEnabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

const SettingsRow: React.FC<{
  title: string;
  subtitle: string;
  children: React.ReactNode;
  isPremiumFeature?: boolean;
  isPremiumUser?: boolean;
  onClick?: () => void;
  isThemed: boolean;
  themeVariant?: ThemeVariant;
}> = ({ title, subtitle, children, isPremiumFeature, isPremiumUser, onClick, isThemed, themeVariant }) => {
  const rowBg =
    themeVariant === 'cat'
      ? 'bg-white/45 border border-orange-200/45 shadow-[0_18px_40px_rgba(249,115,22,0.2)] backdrop-blur-lg'
      : themeVariant === 'hilal'
      ? 'bg-white/46 border border-indigo-200/45 shadow-[0_18px_40px_rgba(79,70,229,0.2)] backdrop-blur-lg'
      : themeVariant === 'snow'
      ? 'bg-white/48 border border-sky-100/45 shadow-[0_18px_40px_rgba(56,189,248,0.18)] backdrop-blur-xl'
      : themeVariant === 'fox'
      ? 'bg-white/46 border border-amber-100/45 shadow-[0_18px_40px_rgba(245,158,11,0.2)] backdrop-blur-lg'
      : themeVariant === 'zurafa'
      ? 'bg-white/45 border border-cyan-200/45 shadow-[0_18px_40px_rgba(6,182,212,0.2)] backdrop-blur-lg'
      : themeVariant === 'geceorman'
      ? 'bg-white/14 border border-emerald-400/20 shadow-[0_18px_40px_rgba(16,185,129,0.25)] backdrop-blur-md'
      : themeVariant === 'ay'
      ? 'bg-white/12 border border-indigo-400/20 shadow-[0_18px_40px_rgba(99,102,241,0.25)] backdrop-blur-md'
      : themeVariant === 'yagmur'
      ? 'bg-white/14 border border-blue-400/20 shadow-[0_18px_40px_rgba(59,130,246,0.25)] backdrop-blur-md'
      : themeVariant === 'deneme2'
      ? 'bg-white/10 border border-cyan-300/30 shadow-[0_18px_40px_rgba(14,165,233,0.2)] backdrop-blur-md'
      : isThemed
      ? 'bg-white/38 backdrop-blur-md'
      : 'bg-white/95 border border-slate-200 shadow-md';
  const textColor =
    themeVariant === 'cat'
      ? 'text-orange-900 drop-shadow-[0_2px_8px_rgba(255,255,255,0.55)]'
      : themeVariant === 'hilal'
      ? 'text-indigo-100 drop-shadow-[0_2px_8px_rgba(15,23,42,0.65)]'
      : themeVariant === 'snow'
      ? 'text-sky-900 drop-shadow-[0_2px_8px_rgba(148,197,253,0.55)]'
      : themeVariant === 'fox'
      ? 'text-amber-900 drop-shadow-[0_2px_8px_rgba(255,255,255,0.55)]'
      : themeVariant === 'zurafa'
      ? 'text-cyan-900 drop-shadow-[0_2px_8px_rgba(255,255,255,0.55)]'
      : themeVariant === 'geceorman'
      ? 'text-emerald-50 drop-shadow-[0_2px_8px_rgba(6,78,59,0.7)]'
      : themeVariant === 'ay'
      ? 'text-indigo-100 drop-shadow-[0_2px_8px_rgba(30,27,75,0.7)]'
      : themeVariant === 'yagmur'
      ? 'text-blue-100 drop-shadow-[0_2px_8px_rgba(23,37,84,0.7)]'
      : themeVariant === 'deneme2'
      ? 'text-white'
      : SIMPLE_THEME_TEXT_PRIMARY;
  const subTextColor =
    themeVariant === 'cat'
      ? 'text-orange-700 drop-shadow-[0_1px_4px_rgba(255,255,255,0.45)]'
      : themeVariant === 'hilal'
      ? 'text-indigo-200 drop-shadow-[0_1px_4px_rgba(15,23,42,0.6)]'
      : themeVariant === 'snow'
      ? 'text-sky-700 drop-shadow-[0_1px_4px_rgba(186,230,253,0.45)]'
      : themeVariant === 'fox'
      ? 'text-emerald-700 drop-shadow-[0_1px_4px_rgba(209,250,229,0.45)]'
      : themeVariant === 'zurafa'
      ? 'text-cyan-700 drop-shadow-[0_1px_4px_rgba(255,255,255,0.45)]'
      : themeVariant === 'geceorman'
      ? 'text-emerald-200 drop-shadow-[0_1px_4px_rgba(6,78,59,0.65)]'
      : themeVariant === 'ay'
      ? 'text-indigo-300 drop-shadow-[0_1px_4px_rgba(30,27,75,0.65)]'
      : themeVariant === 'yagmur'
      ? 'text-blue-200 drop-shadow-[0_1px_4px_rgba(23,37,84,0.65)]'
      : themeVariant === 'deneme2'
      ? 'text-white/85'
      : SIMPLE_THEME_TEXT_SECONDARY;
  const crownTone =
    themeVariant === 'cat'
      ? 'text-orange-400'
      : themeVariant === 'hilal'
      ? 'text-indigo-200'
      : themeVariant === 'snow'
      ? 'text-sky-400'
      : themeVariant === 'fox'
      ? 'text-emerald-400'
      : themeVariant === 'zurafa'
      ? 'text-cyan-400'
      : themeVariant === 'geceorman'
      ? 'text-emerald-400'
      : themeVariant === 'ay'
      ? 'text-indigo-400'
      : themeVariant === 'yagmur'
      ? 'text-blue-400'
      : themeVariant === 'deneme2'
      ? 'text-cyan-300'
      : 'text-amber-500';

  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center p-4 rounded-xl shadow-sm transition-opacity ${rowBg} ${isPremiumFeature && !isPremiumUser ? 'opacity-60' : ''} ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex-1 pr-3 min-w-0">
        <h3 className={`font-bold flex items-center ${textColor}`}>
          {title}
          {isPremiumFeature && <CrownIcon className={`w-5 h-5 ml-2 ${crownTone}`}/>}
        </h3>
        <p className={`text-sm ${subTextColor}`}>{subtitle}</p>
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );
};


const ParentGateButton: React.FC<{ onConfirm: () => void; isThemed: boolean; label?: string }> = ({ onConfirm, isThemed, label }) => {
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<number | null>(null);
    const intervalRef = useRef<number | null>(null);
    const HOLD_DURATION = 2000; // 2 seconds

    const handleComplete = () => {
        // İkinci aşama: Basit matematik sorusu (Google Play Parent Gate)
        const num1 = Math.floor(Math.random() * 5) + 1; // 1-5
        const num2 = Math.floor(Math.random() * 5) + 1; // 1-5
        const correctAnswer = num1 + num2;
        
        const userAnswer = window.prompt(
            t('settingsEx.premium.mathQuestion', 'Ebeveyn Onayı:\n\nDevam etmek için bu soruyu cevaplayın:\n\n{num1} + {num2} = ?')
                .replace('{num1}', String(num1))
                .replace('{num2}', String(num2))
        );
        
        if (userAnswer && parseInt(userAnswer) === correctAnswer) {
            // Doğru cevap - direkt satın alma
            onConfirm();
        } else if (userAnswer !== null) {
            // Yanlış cevap
            alert(t('settingsEx.premium.wrongAnswer', 'Yanlış cevap. Lütfen tekrar deneyin.'));
        }
        
        setTimeout(() => setProgress(0), 500);
    };

    const startHold = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);

        setProgress(0);
        
        const startTime = Date.now();
        intervalRef.current = window.setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const currentProgress = Math.min(100, (elapsedTime / HOLD_DURATION) * 100);
            setProgress(currentProgress);
        }, 50);

        timerRef.current = window.setTimeout(() => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setProgress(100);
            handleComplete();
        }, HOLD_DURATION);
    };

    const cancelHold = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
        timerRef.current = null;
        intervalRef.current = null;
        setProgress(0);
    };
    
    const buttonClass = isThemed 
        ? 'bg-amber-400/80 text-white' 
        : 'bg-white text-amber-500';

    return (
        <button
            onPointerDown={startHold}
            onPointerUp={cancelHold}
            onPointerLeave={cancelHold}
      className={`relative font-bold py-3 px-8 rounded-full shadow-md hover:scale-105 transition-transform transform overflow-hidden ${buttonClass}`}
      aria-label={t('settingsEx.premium.holdToPurchaseAria', 'Hold for 2 seconds to purchase')}
        >
            <div 
                className="absolute top-0 left-0 h-full bg-green-300/50 transition-all duration-100"
                style={{ width: `${progress}%` }}
            />
      <span className="relative z-10 flex items-center justify-center">
        {label || t('settingsEx.premium.cta', "Go Premium & Support")} <HeartIcon className="inline w-5 h-5 ml-1"/>
            </span>
        </button>
    );
};


const SettingsScreen: React.FC<SettingsScreenProps> = ({
  onBack, isMuted, onToggleMute, isAutoSpeakEnabled, onToggleAutoSpeak, isBanButtonEnabled, onToggleBanButton,
  isFastTransitionEnabled, onToggleFastTransition, isUnderwaterMusicEnabled, onToggleUnderwaterMusic,
  onSelectPrivacyPolicy, onManageBannedImages, isPremium, hasPurchasedPremium,
  onPurchaseMonthly, onPurchaseLifetime, onResetProgress, theme, onChangeTheme, activeProfile, onManageProfiles, onManageActivities, showPremiumToast,
  onSelectAchievements,
  onRestorePurchases,
  parentOverrides,
  onAddParentOverride,
  onRemoveParentOverride,
  isSpamGuardEnabled,
  onToggleSpamGuard,
  spamGuardRoundThreshold,
  onChangeSpamGuardThreshold,
  isRealisticImagesEnabled,
  onToggleRealisticImages,
  isBasaraHighlightEnabled,
  onToggleBasaraHighlight,
}) => {
  // Scroll pozisyonunu localStorage ile koru
  useEffect(() => {
    const saved = localStorage.getItem('settingsScrollY');
    if (saved) {
      window.scrollTo({ top: parseInt(saved, 10) || 0, behavior: 'auto' });
      localStorage.removeItem('settingsScrollY');
    }
    return () => {
      localStorage.setItem('settingsScrollY', String(window.scrollY));
    };
  }, []);
  const { settings, profile } = useAppContext();
  const darkSettingsThemes = new Set(['geceorman', 'ay', 'yagmur', 'deneme2']);
  const isThemed = settings.theme !== 'simple';
  const isDarkSettings = darkSettingsThemes.has(settings.theme);
  const isCosmicTheme = settings.theme === 'deneme2';
  const isCatTheme = settings.theme === 'kedi';
  const isHilalTheme = settings.theme === 'ay2';
  const isSnowTheme = settings.theme === 'kar';
  const isFoxTheme = settings.theme === 'tilki';
  const isZurafaTheme = settings.theme === 'zurafa';
  const isGeceOrmanTheme = settings.theme === 'geceorman';
  const isAyTheme = settings.theme === 'ay';
  const isYagmurTheme = settings.theme === 'yagmur';
  const isGeometriTheme = settings.theme === 'geometri';
  const isGunBatimiTheme = settings.theme === 'gunbatimi';
  const isTilki2Theme = settings.theme === 'tilki2';
  const isKusTheme = settings.theme === 'kus';
  const isGunesTheme = settings.theme === 'gunes';
  const isDenemeTheme = settings.theme === 'deneme';
  const isSimpleTheme = settings.theme === 'simple';
  const spamGuardThresholdOptions = [2, 3, 4, 6, 8, 10, 12];
  const themeVariant: ThemeVariant | undefined = isCatTheme
    ? 'cat'
    : isHilalTheme
    ? 'hilal'
    : isSnowTheme
    ? 'snow'
    : isFoxTheme
    ? 'fox'
    : isZurafaTheme
    ? 'zurafa'
    : isGeceOrmanTheme
    ? 'geceorman'
    : isAyTheme
    ? 'ay'
    : isYagmurTheme
    ? 'yagmur'
    : isGeometriTheme
    ? 'geometri'
    : isGunBatimiTheme
    ? 'gunbatimi'
    : isTilki2Theme
    ? 'tilki2'
    : isKusTheme
    ? 'kus'
    : isGunesTheme
    ? 'gunes'
    : isDenemeTheme
    ? 'deneme'
    : isCosmicTheme
    ? 'deneme2'
    : isSimpleTheme
    ? 'simple'
    : undefined;
  const lang = getCurrentLanguage();
  const getLocaleForLang = (l: string) => l === 'tr' ? 'tr-TR' : l === 'de' ? 'de-DE' : l === 'fr' ? 'fr-FR' : l === 'nl' ? 'nl-NL' : l === 'az' ? 'az-Latn-AZ' : 'en-US';
  const promoNote: string | null = (() => {
    const p = (settings as any).promotion as { isActive?: boolean; endsAt?: string } | undefined;
    if (p?.isActive && p?.endsAt) {
      const ends = new Date(p.endsAt);
      const dateStr = ends.toLocaleDateString(getLocaleForLang(lang), { day: 'numeric', month: 'long', year: 'numeric' });
      return t('settingsEx.promoNote', 'Hediye Premium: {date} tarihine kadar tüm özellikler açık.').replace('{date}', dateStr);
    }
    return null;
  })();
  // derived premium flag is used inline in UI without separate variable

  // Joker Hakkı form state
  const [overrideActivityId, setOverrideActivityId] = useState<string>("");
  const [overrideHours, setOverrideHours] = useState<number>(24);
  const [overrideReason, setOverrideReason] = useState<string>("");
  const [overrideIgnoreForProgress, setOverrideIgnoreForProgress] = useState<boolean>(false);

  const handleResetClick = () => {
  const confirmMsg = t('settingsEx.reset.confirm', `${activeProfile.name} için tüm ilerlemeyi sıfırlamak istediğinizden emin misiniz? Bu işlem geri alınamaz.`).replace('{name}', activeProfile.name);
    if (window.confirm(confirmMsg)) {
      onResetProgress();
    }
  };
  
  const Avatar = getAvatar(activeProfile.avatar);

  const titleColor =
    isCosmicTheme
      ? 'text-white text-shadow-soft'
      : themeVariant === 'cat'
      ? 'text-orange-900 drop-shadow-[0_6px_16px_rgba(255,255,255,0.55)]'
      : themeVariant === 'hilal'
      ? 'text-indigo-100 drop-shadow-[0_6px_16px_rgba(15,23,42,0.7)]'
      : themeVariant === 'snow'
      ? 'text-sky-900 drop-shadow-[0_6px_16px_rgba(148,197,253,0.55)]'
      : themeVariant === 'fox'
      ? 'text-amber-900 drop-shadow-[0_6px_16px_rgba(255,255,255,0.55)]'
      : themeVariant === 'zurafa'
      ? 'text-cyan-900 drop-shadow-[0_6px_16px_rgba(255,255,255,0.55)]'
      : isDarkSettings
      ? 'text-white text-shadow-soft'
      : SIMPLE_THEME_TEXT_PRIMARY;
  const iconColor =
    isCosmicTheme
      ? 'text-white'
      : themeVariant === 'cat'
      ? 'text-orange-500'
      : themeVariant === 'hilal'
      ? 'text-indigo-200'
      : themeVariant === 'snow'
      ? 'text-sky-500'
      : themeVariant === 'fox'
      ? 'text-emerald-600'
      : themeVariant === 'zurafa'
      ? 'text-cyan-500'
      : isDarkSettings
      ? 'text-white'
      : 'text-indigo-600';
  const sectionTitleColor =
    isCosmicTheme
      ? 'text-white text-shadow-soft'
      : themeVariant === 'cat'
      ? 'text-orange-900 drop-shadow-[0_4px_12px_rgba(255,255,255,0.5)]'
      : themeVariant === 'hilal'
      ? 'text-indigo-100 drop-shadow-[0_4px_12px_rgba(15,23,42,0.65)]'
      : themeVariant === 'snow'
      ? 'text-sky-900 drop-shadow-[0_4px_12px_rgba(148,197,253,0.55)]'
      : themeVariant === 'fox'
      ? 'text-amber-900 drop-shadow-[0_4px_12px_rgba(255,255,255,0.5)]'
      : themeVariant === 'zurafa'
      ? 'text-cyan-900 drop-shadow-[0_4px_12px_rgba(255,255,255,0.5)]'
      : isDarkSettings
      ? 'text-white text-shadow-soft'
      : SIMPLE_THEME_TEXT_PRIMARY;
  const rowBg =
    isCosmicTheme
      ? 'bg-white/10 border border-cyan-300/30 shadow-[0_18px_40px_rgba(14,165,233,0.2)] backdrop-blur-md'
      : themeVariant === 'cat'
      ? 'bg-white/42 border border-orange-200/45 shadow-[0_20px_44px_rgba(249,115,22,0.22)] backdrop-blur-lg'
      : themeVariant === 'hilal'
      ? 'bg-white/44 border border-indigo-200/45 shadow-[0_20px_44px_rgba(79,70,229,0.22)] backdrop-blur-lg'
      : themeVariant === 'snow'
      ? 'bg-white/46 border border-sky-100/45 shadow-[0_20px_44px_rgba(56,189,248,0.2)] backdrop-blur-xl'
      : themeVariant === 'fox'
      ? 'bg-white/44 border border-amber-100/45 shadow-[0_20px_44px_rgba(245,158,11,0.22)] backdrop-blur-lg'
      : themeVariant === 'zurafa'
      ? 'bg-white/42 border border-cyan-200/45 shadow-[0_20px_44px_rgba(6,182,212,0.22)] backdrop-blur-lg'
      : isDarkSettings
      ? 'bg-white/14'
      : 'bg-white/92 border border-slate-200/70 shadow-sm';
  const textColor =
    isCosmicTheme
      ? 'text-white'
      : themeVariant === 'cat'
      ? 'text-orange-900 drop-shadow-[0_2px_8px_rgba(255,255,255,0.55)]'
      : themeVariant === 'hilal'
      ? 'text-indigo-100 drop-shadow-[0_2px_8px_rgba(15,23,42,0.65)]'
      : themeVariant === 'snow'
      ? 'text-sky-900 drop-shadow-[0_2px_8px_rgba(148,197,253,0.55)]'
      : themeVariant === 'fox'
      ? 'text-amber-900 drop-shadow-[0_2px_8px_rgba(255,255,255,0.55)]'
      : themeVariant === 'zurafa'
      ? 'text-cyan-900 drop-shadow-[0_2px_8px_rgba(255,255,255,0.55)]'
      : isDarkSettings
      ? 'text-white'
      : SIMPLE_THEME_TEXT_PRIMARY;
  const subTextColor =
    isCosmicTheme
      ? 'text-white/80'
      : themeVariant === 'cat'
      ? 'text-orange-700 drop-shadow-[0_1px_4px_rgba(255,255,255,0.45)]'
      : themeVariant === 'hilal'
      ? 'text-indigo-200 drop-shadow-[0_1px_4px_rgba(15,23,42,0.6)]'
      : themeVariant === 'snow'
      ? 'text-sky-700 drop-shadow-[0_1px_4px_rgba(186,230,253,0.45)]'
      : themeVariant === 'fox'
      ? 'text-emerald-700 drop-shadow-[0_1px_4px_rgba(209,250,229,0.45)]'
      : themeVariant === 'zurafa'
      ? 'text-cyan-700 drop-shadow-[0_1px_4px_rgba(255,255,255,0.45)]'
      : isDarkSettings
      ? 'text-white/70'
      : SIMPLE_THEME_TEXT_SECONDARY;
  const premiumCardClass =
    isCosmicTheme
      ? 'relative overflow-hidden p-6 rounded-3xl text-white bg-white/10 border border-cyan-300/30 shadow-[0_28px_52px_rgba(14,165,233,0.22)] backdrop-blur-xl text-center'
      : themeVariant === 'cat'
      ? 'relative overflow-hidden p-6 rounded-3xl text-orange-900 bg-gradient-to-b from-white/60 via-white/38 to-white/24 border border-orange-200/40 shadow-[0_28px_52px_rgba(249,115,22,0.22)] backdrop-blur-lg text-center'
      : themeVariant === 'hilal'
      ? 'relative overflow-hidden p-6 rounded-3xl text-indigo-100 bg-gradient-to-b from-white/60 via-indigo-50/34 to-white/24 border border-indigo-200/40 shadow-[0_28px_52px_rgba(79,70,229,0.22)] backdrop-blur-lg text-center'
      : themeVariant === 'snow'
      ? 'relative overflow-hidden p-6 rounded-3xl text-sky-900 bg-gradient-to-b from-white/60 via-sky-50/34 to-white/24 border border-sky-100/40 shadow-[0_28px_52px_rgba(56,189,248,0.22)] backdrop-blur-xl text-center'
      : themeVariant === 'fox'
      ? 'relative overflow-hidden p-6 rounded-3xl text-amber-900 bg-gradient-to-b from-white/60 via-amber-50/34 to-white/24 border border-amber-100/40 shadow-[0_28px_52px_rgba(245,158,11,0.22)] backdrop-blur-lg text-center'
      : themeVariant === 'zurafa'
      ? 'relative overflow-hidden p-6 rounded-3xl text-cyan-900 bg-gradient-to-b from-white/60 via-cyan-50/34 to-white/24 border border-cyan-200/40 shadow-[0_28px_52px_rgba(6,182,212,0.22)] backdrop-blur-lg text-center'
      : 'relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/95 p-6 text-center shadow-lg';
  const premiumTitleClass =
    isCosmicTheme
      ? 'text-2xl font-bold mb-2 text-white'
      : themeVariant === 'cat'
      ? 'text-2xl font-bold mb-2 drop-shadow-[0_2px_8px_rgba(255,255,255,0.55)]'
      : themeVariant === 'hilal'
      ? 'text-2xl font-bold mb-2 drop-shadow-[0_2px_8px_rgba(15,23,42,0.65)]'
      : themeVariant === 'snow'
      ? 'text-2xl font-bold mb-2 drop-shadow-[0_2px_8px_rgba(148,197,253,0.55)]'
      : themeVariant === 'fox'
      ? 'text-2xl font-bold mb-2 drop-shadow-[0_2px_8px_rgba(255,255,255,0.55)]'
      : themeVariant === 'zurafa'
      ? 'text-2xl font-bold mb-2 drop-shadow-[0_2px_8px_rgba(255,255,255,0.55)]'
      : `text-2xl font-bold mb-2 ${SIMPLE_THEME_TEXT_PRIMARY}`;
  const premiumDescClass =
    isCosmicTheme
      ? 'mb-4 text-white/85'
      : themeVariant === 'cat'
      ? 'mb-4 text-orange-700 drop-shadow-[0_1px_4px_rgba(255,255,255,0.45)]'
      : themeVariant === 'hilal'
      ? 'mb-4 text-indigo-200 drop-shadow-[0_1px_4px_rgba(15,23,42,0.6)]'
      : themeVariant === 'snow'
      ? 'mb-4 text-sky-700 drop-shadow-[0_1px_4px_rgba(186,230,253,0.45)]'
      : themeVariant === 'fox'
      ? 'mb-4 text-emerald-700 drop-shadow-[0_1px_4px_rgba(209,250,229,0.45)]'
      : themeVariant === 'zurafa'
      ? 'mb-4 text-cyan-700 drop-shadow-[0_1px_4px_rgba(255,255,255,0.45)]'
      : `mb-4 text-sm sm:text-base ${SIMPLE_THEME_TEXT_SECONDARY}`;
  const premiumCrownClass =
    isCosmicTheme
      ? 'w-12 h-12 mx-auto mb-2 text-cyan-300 drop-shadow-[0_10px_24px_rgba(14,165,233,0.35)]'
      : themeVariant === 'cat'
      ? 'w-12 h-12 mx-auto mb-2 text-orange-400 drop-shadow-[0_10px_24px_rgba(249,115,22,0.35)]'
      : themeVariant === 'hilal'
      ? 'w-12 h-12 mx-auto mb-2 text-indigo-400 drop-shadow-[0_10px_24px_rgba(79,70,229,0.35)]'
      : themeVariant === 'snow'
      ? 'w-12 h-12 mx-auto mb-2 text-sky-400 drop-shadow-[0_10px_24px_rgba(56,189,248,0.3)]'
      : themeVariant === 'fox'
      ? 'w-12 h-12 mx-auto mb-2 text-emerald-400 drop-shadow-[0_10px_24px_rgba(16,185,129,0.3)]'
      : themeVariant === 'zurafa'
      ? 'w-12 h-12 mx-auto mb-2 text-cyan-400 drop-shadow-[0_10px_24px_rgba(6,182,212,0.35)]'
      : 'w-12 h-12 mx-auto mb-2 text-amber-400';
  const avatarBgClass =
    isCosmicTheme
      ? 'bg-white/15 border border-cyan-300/30 shadow-[0_14px_32px_rgba(14,165,233,0.2)]'
      : themeVariant === 'cat'
      ? 'bg-white/42 border border-orange-200/40 shadow-[0_14px_32px_rgba(249,115,22,0.2)]'
      : themeVariant === 'hilal'
      ? 'bg-white/44 border border-indigo-200/40 shadow-[0_14px_32px_rgba(79,70,229,0.2)]'
      : themeVariant === 'snow'
      ? 'bg-white/44 border border-sky-100/40 shadow-[0_14px_32px_rgba(56,189,248,0.18)]'
      : themeVariant === 'fox'
      ? 'bg-white/42 border border-amber-100/40 shadow-[0_14px_32px_rgba(245,158,11,0.2)]'
      : themeVariant === 'zurafa'
      ? 'bg-white/42 border border-cyan-200/40 shadow-[0_14px_32px_rgba(6,182,212,0.2)]'
      : isThemed
      ? 'bg-white/24'
      : 'bg-slate-50/40 border border-slate-200/20 shadow-lg';
  const avatarIconClass =
    isCosmicTheme
      ? 'w-12 h-12 text-white'
      : themeVariant === 'cat'
      ? 'w-12 h-12 text-orange-500'
      : themeVariant === 'hilal'
      ? 'w-12 h-12 text-indigo-500'
      : themeVariant === 'snow'
      ? 'w-12 h-12 text-sky-500'
      : themeVariant === 'fox'
      ? 'w-12 h-12 text-emerald-600'
      : themeVariant === 'zurafa'
      ? 'w-12 h-12 text-cyan-500'
      : 'w-12 h-12 text-slate-300';
  const manageButtonClass =
    isCosmicTheme
      ? 'bg-cyan-500/90 text-white font-semibold py-2 px-4 rounded-lg shadow-[0_12px_28px_rgba(14,165,233,0.28)] hover:bg-cyan-400/90 transition-colors'
      : themeVariant === 'cat'
      ? 'bg-orange-400/90 text-white font-semibold py-2 px-4 rounded-lg shadow-[0_12px_28px_rgba(249,115,22,0.28)] hover:bg-orange-500 transition-colors'
      : themeVariant === 'hilal'
      ? 'bg-indigo-500/90 text-white font-semibold py-2 px-4 rounded-lg shadow-[0_12px_28px_rgba(79,70,229,0.28)] hover:bg-indigo-600 transition-colors'
      : themeVariant === 'snow'
      ? 'bg-sky-500/90 text-white font-semibold py-2 px-4 rounded-lg shadow-[0_12px_28px_rgba(56,189,248,0.28)] hover:bg-sky-600 transition-colors'
      : themeVariant === 'fox'
      ? 'bg-amber-400/90 text-white font-semibold py-2 px-4 rounded-lg shadow-[0_12px_28px_rgba(245,158,11,0.28)] hover:bg-amber-500 transition-colors'
      : themeVariant === 'zurafa'
      ? 'bg-cyan-400/90 text-white font-semibold py-2 px-4 rounded-lg shadow-[0_12px_28px_rgba(6,182,212,0.28)] hover:bg-cyan-500 transition-colors'
      : 'bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-sky-600 transition-colors';
  const manageBannedButtonClass =
    isCosmicTheme
      ? 'p-2 rounded-full bg-white/15 border border-cyan-300/30 text-cyan-200 shadow-[0_12px_28px_rgba(14,165,233,0.2)] hover:bg-white/25 transition-colors'
      : themeVariant === 'cat'
      ? 'p-2 rounded-full bg-white/38 border border-orange-200/40 text-orange-500 shadow-[0_12px_28px_rgba(249,115,22,0.2)] hover:bg-white/48 transition-colors'
      : themeVariant === 'hilal'
      ? 'p-2 rounded-full bg-white/40 border border-indigo-200/40 text-indigo-500 shadow-[0_12px_28px_rgba(79,70,229,0.2)] hover:bg-white/50 transition-colors'
      : themeVariant === 'snow'
      ? 'p-2 rounded-full bg-white/40 border border-sky-100/40 text-sky-500 shadow-[0_12px_28px_rgba(56,189,248,0.2)] hover:bg-white/50 transition-colors'
      : themeVariant === 'fox'
      ? 'p-2 rounded-full bg-white/40 border border-amber-100/40 text-emerald-600 shadow-[0_12px_28px_rgba(245,158,11,0.2)] hover:bg-white/50 transition-colors'
      : themeVariant === 'zurafa'
      ? 'p-2 rounded-full bg-white/38 border border-cyan-200/40 text-cyan-500 shadow-[0_12px_28px_rgba(6,182,212,0.2)] hover:bg-white/48 transition-colors'
      : isThemed
      ? 'p-2 rounded-full bg-white/24 hover:bg-white/32'
      : 'p-2 rounded-full bg-slate-100/30 border border-slate-200/20 shadow-sm hover:bg-slate-100/50 transition-colors';
  const manageBannedIconClass =
    isCosmicTheme
      ? 'w-6 h-6 text-cyan-200'
      : themeVariant === 'cat'
      ? 'w-6 h-6 text-orange-500'
      : themeVariant === 'hilal'
      ? 'w-6 h-6 text-indigo-200'
      : themeVariant === 'snow'
      ? 'w-6 h-6 text-sky-500'
      : themeVariant === 'fox'
      ? 'w-6 h-6 text-emerald-600'
      : themeVariant === 'zurafa'
      ? 'w-6 h-6 text-cyan-500'
      : isThemed
      ? 'w-6 h-6 text-white/80'
      : 'w-6 h-6 text-slate-300';
  const privacyLinkClass =
    isCosmicTheme
      ? 'font-bold hover:underline text-cyan-200'
      : themeVariant === 'cat'
      ? 'font-bold hover:underline text-orange-600'
      : themeVariant === 'hilal'
      ? 'font-bold hover:underline text-indigo-200'
      : themeVariant === 'snow'
      ? 'font-bold hover:underline text-sky-600'
      : themeVariant === 'fox'
      ? 'font-bold hover:underline text-emerald-600'
      : themeVariant === 'zurafa'
      ? 'font-bold hover:underline text-cyan-600'
      : isThemed
      ? 'font-bold hover:underline text-sky-300'
      : 'font-semibold text-sky-600 transition-colors hover:text-sky-700';
  const sectionBorderClass =
    isCosmicTheme
      ? 'border-cyan-300/30'
      : themeVariant === 'cat'
      ? 'border-orange-200/60'
      : themeVariant === 'hilal'
      ? 'border-indigo-200/60'
      : themeVariant === 'snow'
      ? 'border-sky-100/60'
      : themeVariant === 'fox'
      ? 'border-amber-100/60'
      : themeVariant === 'zurafa'
      ? 'border-cyan-200/60'
      : 'border-slate-300/30';
  const containerClass = themeVariant
    ? 'relative flex flex-col items-center justify-start max-w-4xl mx-auto p-4 animate-fade-in'
    : 'flex w-full flex-col gap-6 animate-fade-in';

  const settingsContent = (
    <div className={containerClass}>
      {themeVariant === 'cat' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-200/60 via-white/70 to-emerald-100/60" />
          <span className="absolute top-6 right-6 text-5xl opacity-75 drop-shadow-[0_16px_30px_rgba(249,115,22,0.28)]">
            {"\uD83D\uDC08"}
          </span>
          <span className="absolute bottom-16 left-1/2 -translate-x-1/2 text-6xl opacity-80 drop-shadow-[0_18px_30px_rgba(249,115,22,0.32)]">
            {"\uD83D\uDC31"}
          </span>
        </div>
      )}
      {themeVariant === 'hilal' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-100/48 via-white/52 to-slate-100/38" />
          <span className="absolute -top-5 right-8 text-5xl opacity-70 drop-shadow-[0_14px_28px_rgba(79,70,229,0.25)]">
            {"\uD83C\uDF19"}
          </span>
          <span className="absolute bottom-8 left-10 text-4xl opacity-60 drop-shadow-[0_14px_28px_rgba(79,70,229,0.25)]">
            {"\u2728"}
          </span>
        </div>
      )}
      {themeVariant === 'snow' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-100/44 via-white/50 to-sky-200/36" />
          <span className="absolute -top-6 right-8 text-5xl opacity-70 drop-shadow-[0_14px_28px_rgba(125,211,252,0.28)]">
            {"\u2744"}
          </span>
          <span className="absolute bottom-6 left-8 text-4xl opacity-60 drop-shadow-[0_14px_28px_rgba(125,211,252,0.26)]">
            {"\u2745"}
          </span>
          <span className="absolute bottom-4 right-10 text-5xl opacity-70 drop-shadow-[0_14px_28px_rgba(56,189,248,0.28)]">
            {"\uD83D\uDC30"}
          </span>
        </div>
      )}
      {themeVariant === 'fox' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100/44 via-white/50 to-emerald-100/36" />
          <span className="absolute -top-6 right-8 text-5xl opacity-70 drop-shadow-[0_14px_28px_rgba(245,158,11,0.28)]">
            {"\uD83E\uDD8A"}
          </span>
          <span className="absolute bottom-6 left-8 text-4xl opacity-60 drop-shadow-[0_14px_28px_rgba(16,185,129,0.26)]">
            {"\u2728"}
          </span>
          <span className="absolute bottom-4 right-10 text-5xl opacity-65 drop-shadow-[0_12px_24px_rgba(34,197,94,0.24)]">
            {"\uD83C\uDF31"}
          </span>
        </div>
      )}
      {themeVariant === 'zurafa' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-200/60 via-white/70 to-yellow-100/60" />
          <span className="absolute top-6 right-6 text-5xl opacity-75 drop-shadow-[0_16px_30px_rgba(6,182,212,0.28)]">
            {"\uD83E\uDD92"}
          </span>
          <span className="absolute bottom-16 left-1/2 -translate-x-1/2 text-6xl opacity-80 drop-shadow-[0_18px_30px_rgba(34,197,94,0.32)]">
            {"\uD83C\uDF3F"}
          </span>
        </div>
      )}
      {themeVariant === 'geceorman' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800/90 via-emerald-900/60 to-slate-900/80" />
          <span className="absolute top-6 right-6 text-5xl opacity-60 drop-shadow-[0_16px_30px_rgba(34,197,94,0.4)]">
            {"\uD83C\uDF32"}
          </span>
          <span className="absolute bottom-16 left-10 text-6xl opacity-50 drop-shadow-[0_18px_30px_rgba(16,185,129,0.35)]">
            {"\uD83E\uDD89"}
          </span>
        </div>
      )}
      {themeVariant === 'ay' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-indigo-900/70 to-slate-900/90" />
          <span className="absolute -top-5 right-8 text-6xl opacity-70 drop-shadow-[0_14px_28px_rgba(129,140,248,0.35)]">
            {"\uD83C\uDF19"}
          </span>
          <span className="absolute bottom-8 left-10 text-4xl opacity-60 drop-shadow-[0_14px_28px_rgba(165,180,252,0.3)]">
            {"\u2728"}
          </span>
        </div>
      )}
      {themeVariant === 'yagmur' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-700/90 via-blue-900/60 to-slate-800/85" />
          <span className="absolute top-10 right-10 text-5xl opacity-65 drop-shadow-[0_14px_28px_rgba(59,130,246,0.4)]">
            {"\uD83C\uDF27"}
          </span>
          <span className="absolute bottom-12 left-12 text-4xl opacity-55 drop-shadow-[0_12px_24px_rgba(96,165,250,0.35)]">
            {"\u26C8"}
          </span>
        </div>
      )}
      {themeVariant === 'geometri' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-200/60 via-white/70 to-purple-100/60" />
          <span className="absolute top-8 right-8 text-5xl opacity-70 drop-shadow-[0_16px_30px_rgba(244,114,182,0.3)]">
            {"\u25A0"}
          </span>
          <span className="absolute bottom-10 left-10 text-6xl opacity-75 drop-shadow-[0_18px_30px_rgba(167,139,250,0.3)]">
            {"\u25C6"}
          </span>
        </div>
      )}
      {themeVariant === 'gunbatimi' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-orange-300/60 via-pink-200/70 to-purple-200/60" />
          <span className="absolute top-8 right-10 text-6xl opacity-75 drop-shadow-[0_16px_30px_rgba(251,146,60,0.35)]">
            {"\uD83C\uDF05"}
          </span>
          <span className="absolute bottom-12 left-8 text-5xl opacity-70 drop-shadow-[0_14px_28px_rgba(244,114,182,0.3)]">
            {"\u2600"}
          </span>
        </div>
      )}
      {themeVariant === 'tilki2' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-lime-300/60 via-white/70 to-emerald-100/60" />
          <span className="absolute top-8 right-8 text-6xl opacity-75 drop-shadow-[0_16px_30px_rgba(132,204,22,0.3)]">
            {"\uD83E\uDD8A"}
          </span>
          <span className="absolute bottom-10 left-10 text-5xl opacity-70 drop-shadow-[0_14px_28px_rgba(34,197,94,0.3)]">
            {"\uD83C\uDF3E"}
          </span>
        </div>
      )}
      {themeVariant === 'kus' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-sky-300/60 via-white/70 to-blue-100/60" />
          <span className="absolute top-8 right-8 text-6xl opacity-75 drop-shadow-[0_16px_30px_rgba(56,189,248,0.3)]">
            {"\uD83D\uDC26"}
          </span>
          <span className="absolute bottom-10 left-10 text-5xl opacity-70 drop-shadow-[0_14px_28px_rgba(14,165,233,0.3)]">
            {"\uD83E\uDEB6"}
          </span>
        </div>
      )}
      {themeVariant === 'gunes' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/70 via-amber-100/65 to-orange-100/70" />
          <span className="absolute top-8 right-8 text-8xl opacity-85 drop-shadow-[0_20px_40px_rgba(251,191,36,0.45)] animate-pulse-slow">
            {"\u2600\uFE0F"}
          </span>
          <span className="absolute bottom-10 left-10 text-6xl opacity-75 drop-shadow-[0_16px_32px_rgba(251,146,60,0.4)] animate-bounce-slow">
            {"\u2728"}
          </span>
          <span className="absolute top-1/3 right-16 text-5xl opacity-70 drop-shadow-[0_14px_28px_rgba(245,158,11,0.35)]">
            {"\uD83C\uDF1E"}
          </span>
        </div>
      )}
      {themeVariant === 'deneme' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          {/* 🎨 KARALAMA SAYFASI - İstediğin gibi değiştir! */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/60 via-pink-500/50 to-red-500/60" />
          <span className="absolute top-8 right-8 text-8xl opacity-80">
            {"\uD83C\uDFA8"}
          </span>
          <span className="absolute bottom-10 left-10 text-6xl opacity-70">
            {"\u2728"}
          </span>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-20">
            {"\uD83D\uDD8C\uFE0F"}
          </span>
        </div>
      )}
      {themeVariant === 'simple' && (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/80 via-purple-50/70 to-cyan-100/80" />
          {/* Dekoratif elementler - renkli ve neşeli */}
          <span className="absolute top-8 right-12 text-6xl opacity-75 drop-shadow-[0_14px_28px_rgba(236,72,153,0.35)] animate-bounce-slow">
            💖
          </span>
          <span className="absolute bottom-12 left-16 text-5xl opacity-70 drop-shadow-[0_12px_24px_rgba(139,92,246,0.3)] animate-float">
            🦋
          </span>
          <span className="absolute top-1/3 right-20 text-4xl opacity-65 drop-shadow-[0_10px_20px_rgba(6,182,212,0.28)]">
            ✨
          </span>
          <span className="absolute bottom-1/4 right-12 text-5xl opacity-70 drop-shadow-[0_12px_24px_rgba(244,114,182,0.32)] animate-float-delayed">
            🌸
          </span>
          <span className="absolute top-20 left-10 text-4xl opacity-60 drop-shadow-[0_10px_20px_rgba(147,51,234,0.25)]">
            🌈
          </span>
        </div>
      )}
      {settings.theme === 'deneme2' && (
        <>
          <CosmicBackdrop variant="light" showMeteors={false} showDots={false} />
          <PanelStars count={72} />
        </>
      )}
      {!isThemed && (
        <div className="mb-4 w-full">
          <span className={SIMPLE_THEME_TAG_CLASS}>{t('tabs.settings', 'Ayarlar')}</span>
        </div>
      )}
      <div className="w-full flex items-center mb-8 relative z-20 pointer-events-auto gap-3">
        <button
          onClick={onBack}
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors ${
            themeVariant === 'cat'
              ? 'bg-white/40 border border-orange-200/40 shadow-[0_14px_32px_rgba(249,115,22,0.22)] hover:bg-white/48'
            : themeVariant === 'hilal'
              ? 'bg-white/42 border border-indigo-200/40 shadow-[0_14px_32px_rgba(79,70,229,0.22)] hover:bg-white/50'
              : themeVariant === 'snow'
              ? 'bg-white/42 border border-sky-100/40 shadow-[0_14px_32px_rgba(56,189,248,0.2)] hover:bg-white/50'
              : themeVariant === 'fox'
              ? 'bg-white/42 border border-amber-100/40 shadow-[0_14px_32px_rgba(245,158,11,0.22)] hover:bg-white/50'
              : isThemed
              ? 'bg-black/10 hover:bg-black/20'
              : 'bg-white/95 border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-0.5'
          }`}
          aria-label={t('app.back', 'Go back')}
        >
          <ArrowLeftIcon className={`w-8 h-8 ${iconColor}`} />
        </button>
        <h1 className={`flex-1 text-center text-2xl landscape:text-xl sm:text-3xl font-black ${titleColor} ${isCosmicTheme ? 'tracking-wide drop-shadow-[0_8px_28px_rgba(14,165,233,0.35)]' : ''}`}>
          {t('settingsEx.title', 'Ayarlar')}
        </h1>
        <div className="h-12 w-12 shrink-0" aria-hidden="true" />
      </div>
      
  <div className={`w-full space-y-4 ${themeVariant ? 'pr-2 pb-10' : 'pb-12'} ${isCosmicTheme ? 'pt-2' : ''}`}>
        {!hasPurchasedPremium && (
          <div className={premiumCardClass}>
            {themeVariant === 'cat' && (
              <>
                <span className="absolute -top-4 -left-2 text-4xl opacity-60 drop-shadow-[0_12px_28px_rgba(249,115,22,0.3)] pointer-events-none">
                  {"\uD83D\uDC31"}
                </span>
                <span className="absolute bottom-2 -right-1 text-3xl opacity-55 drop-shadow-[0_12px_28px_rgba(249,115,22,0.25)] pointer-events-none">
                  {"\uD83D\uDC08"}
                </span>
              </>
            )}
            {themeVariant === 'hilal' && (
              <>
                <span className="absolute -top-4 -left-2 text-4xl opacity-60 drop-shadow-[0_12px_28px_rgba(79,70,229,0.3)] pointer-events-none">
                  {"\uD83C\uDF19"}
                </span>
                <span className="absolute bottom-2 -right-1 text-3xl opacity-55 drop-shadow-[0_12px_28px_rgba(79,70,229,0.25)] pointer-events-none">
                  {"\u2728"}
                </span>
              </>
            )}
            {themeVariant === 'snow' && (
              <>
                <span className="absolute -top-4 -left-2 text-4xl opacity-60 drop-shadow-[0_12px_28px_rgba(125,211,252,0.28)] pointer-events-none">
                  {"\u2744"}
                </span>
                <span className="absolute bottom-2 -right-1 text-3xl opacity-55 drop-shadow-[0_12px_28px_rgba(56,189,248,0.26)] pointer-events-none">
                  {"\uD83D\uDC30"}
                </span>
              </>
            )}
            {themeVariant === 'fox' && (
              <>
                <span className="absolute -top-4 -left-2 text-4xl opacity-60 drop-shadow-[0_12px_28px_rgba(245,158,11,0.28)] pointer-events-none">
                  {"\uD83E\uDD8A"}
                </span>
                <span className="absolute bottom-2 -right-1 text-3xl opacity-55 drop-shadow-[0_12px_28px_rgba(34,197,94,0.24)] pointer-events-none">
                  {"\u2728"}
                </span>
              </>
            )}
            <CrownIcon className={premiumCrownClass}/>
            <h2 className={premiumTitleClass}>{t('settingsEx.premium.title', 'Premium Özellikler')}</h2>
            <p className={premiumDescClass}>{t('settingsEx.premium.desc', 'Tüm reklamları kaldırın, temalı arayüzü açın, gelişim raporunu görüntüleyin ve daha fazlasına erişin!')}</p>
            {promoNote && (
              <p className={premiumDescClass}>
                {promoNote}
              </p>
            )}
            {settings.paywall?.hasData && (
              <div className="mb-4 flex items-center justify-center gap-3 text-sm">
                {settings.paywall.monthlyPrice && (
                  <span className={`inline-flex items-center rounded-full px-3 py-1 ${isCosmicTheme ? 'bg-white/15 text-white/90' : 'bg-black/10 text-black/70'}`}>
                    {t('settingsEx.premium.monthly', 'Aylık')}: {settings.paywall.monthlyPrice}
                  </span>
                )}
                {settings.paywall.lifetimePrice && (
                  <span className={`inline-flex items-center rounded-full px-3 py-1 ${isCosmicTheme ? 'bg-white/15 text-white/90' : 'bg-black/10 text-black/70'}`}>
                    {t('settingsEx.premium.lifetime', 'Ömür Boyu')}: {settings.paywall.lifetimePrice}
                  </span>
                )}
              </div>
            )}
            {/* Two purchase actions with localized price labels */}
            <div className="mt-3 flex gap-3 justify-center flex-wrap">
              <ParentGateButton
                onConfirm={onPurchaseMonthly}
                isThemed={isThemed}
                label={`${t('settingsEx.premium.monthly', 'Aylık')}${settings.paywall?.monthlyPrice ? `: ${settings.paywall.monthlyPrice}` : ''}`}
              />
              <ParentGateButton
                onConfirm={onPurchaseLifetime}
                isThemed={isThemed}
                label={`${t('settingsEx.premium.lifetime', 'Ömür Boyu')}${settings.paywall?.lifetimePrice ? `: ${settings.paywall.lifetimePrice}` : ''}`}
              />
              <button
                type="button"
                onClick={() => { void onRestorePurchases(); }}
                className={`mt-1 inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${isCosmicTheme ? 'bg-white/15 text-white/90 hover:bg-white/25' : isThemed ? 'bg-black/10 text-white/90 hover:bg-black/20' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                aria-label={t('settingsEx.premium.restoreAria', 'Satın alımları geri yükle')}
              >
                <RestoreIcon className={`w-4 h-4 ${isCosmicTheme ? 'text-white/90' : isThemed ? 'text-white/90' : 'text-slate-600'}`} />
                {t('settingsEx.premium.restore', 'Satın alımları geri yükle')}
              </button>
            </div>
          </div>
        )}

  <h2 className={`text-xl font-bold pt-4 pb-2 border-b ${sectionBorderClass} ${sectionTitleColor} ${isCosmicTheme ? 'drop-shadow-[0_4px_14px_rgba(14,165,233,0.4)]' : ''}`}>{t('settingsEx.profile.title', 'Profil')}</h2>
        <div className={`p-4 rounded-xl shadow-sm flex items-center justify-between ${rowBg}`}>
            <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${avatarBgClass}`}>
                    <Avatar className={avatarIconClass}/>
                </div>
                <div>
                    <p className={`text-sm ${subTextColor}`}>{t('settingsEx.profile.active', 'Aktif Profil')}</p>
                    <h3 className={`font-bold text-xl ${textColor}`}>{activeProfile.name}</h3>
                </div>
            </div>
            <button onClick={onManageProfiles} className={manageButtonClass}>
                {t('settingsEx.profile.manage', 'Yönet')}
            </button>
        </div>

        {/* Başarımlar */}
        <div className={`p-4 rounded-xl shadow-sm flex items-center justify-between ${rowBg}`}>
            <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${avatarBgClass}`}>
                    <StarIcon className={avatarIconClass}/>
                </div>
                <div>
                    <h3 className={`font-bold text-xl ${textColor}`}>{t('settingsEx.achievements.title', 'Başarımlar')}</h3>
                    <p className={`text-sm ${subTextColor}`}>{t('settingsEx.achievements.subtitle', 'Rozetleri görüntüle')}</p>
                </div>
            </div>
            <button onClick={onSelectAchievements} className={manageButtonClass}>
                {t('settingsEx.achievements.view', 'Görüntüle')}
            </button>
        </div>
        
  <h2 className={`text-lg font-bold pt-3 pb-1.5 border-b ${sectionBorderClass} ${sectionTitleColor} ${isCosmicTheme ? 'drop-shadow-[0_4px_12px_rgba(14,165,233,0.35)]' : ''}`}>{t('settingsEx.theme.title', 'Uygulama Teması')}</h2>
    <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 mt-2">
      {Object.entries(THEMES).map(([key, themeInfo]) => {
        const isThemedButton = themeInfo.type === 'video';
        const isSelected = theme === key;
        const isFreeTheme = FREE_THEMES.has(key);
        // Theme is locked for non-premium users when it's a video/theme and not in FREE_THEMES
        const isLocked = isThemedButton && !isPremium && !isFreeTheme;
        return (
          <button 
            key={key}
            onClick={() => onChangeTheme(key)}
      className={`relative p-1 rounded-lg border-2 transition-all duration-200 ${isSelected ? 'border-sky-500 ring-2 ring-sky-500' : 'border-transparent'}`}
          >
      <div className={`relative w-full h-8 rounded-md overflow-hidden ${themeInfo.previewClass} flex items-center justify-center`}>
         <div className="absolute inset-0 bg-black/20 pointer-events-none"/>
         {isLocked && <LockClosedIcon className="relative z-10 w-4 h-4 text-white/80"/>}
      </div>
    <p className={`text-center font-medium text-[9px] mt-0.5 leading-tight ${isThemed ? 'text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.6)]' : 'text-slate-700'}`}>{t(`themes.${key}`, themeInfo.name)}</p>
          </button>
        )
      })}
        </div>

        <div className="grid grid-cols-1 landscape:grid-cols-2 gap-4">
            <div>
  <h2 className={`text-xl font-bold pt-4 pb-2 border-b ${sectionBorderClass} ${sectionTitleColor} ${isCosmicTheme ? 'drop-shadow-[0_4px_12px_rgba(14,165,233,0.35)]' : ''}`}>{t('settingsEx.general.title', 'Genel Ayarlar')}</h2>
                <div className="space-y-3 mt-2">
                    {/* Language selector */}
                    <SettingsRow title={t('settings.language')} subtitle={t('settings.languageSubtitle')} isThemed={isThemed} themeVariant={themeVariant}>
                        <select
                          value={settings.language}
                          onChange={(e) => settings.onChangeLanguage(e.target.value as any)}
                          className={`px-3 py-2 rounded-lg border bg-white text-slate-800 ${isThemed ? 'border-white/30' : 'border-slate-300'}`}
                          aria-label={t('settings.language')}
                        >
                          <option value="tr">Türkçe</option>
                          <option value="en">English</option>
                          <option value="de">Deutsch</option>
                          <option value="fr">Français</option>
                          <option value="nl">Nederlands</option>
                          <option value="az">Azərbaycan dili</option>
                        </select>
                    </SettingsRow>
                    <p className={`text-xs ${subTextColor} -mt-2 mb-1`}>{t('settings.languageNote')}</p>
                    {/* AI translation apology / feedback note (optional) */}
          {t('settings.languageAutoNote') && (
            <p className={`text-xs ${subTextColor} -mt-1 mb-2 italic text-[11px]`}>{t('settings.languageAutoNote')}</p>
          )}
          <SettingsRow title={t('settingsEx.mute.title', 'Sessiz Mod')} subtitle={t('settingsEx.mute.subtitle', 'Tüm sesleri kapatır')} isThemed={isThemed} themeVariant={themeVariant}>
                        <ToggleSwitch isEnabled={isMuted} onToggle={onToggleMute} themeVariant={themeVariant} />
                    </SettingsRow>
          <SettingsRow title={t('settingsEx.autoSpeak.title', 'Otomatik Seslendirme')} subtitle={t('settingsEx.autoSpeak.subtitle', 'Sorular otomatik okunur')} isThemed={isThemed} themeVariant={themeVariant}>
                        <ToggleSwitch isEnabled={isAutoSpeakEnabled} onToggle={onToggleAutoSpeak} themeVariant={themeVariant} />
                    </SettingsRow>
          <SettingsRow title={t('settingsEx.spamGuard.title', 'Spam Koruması')} subtitle={t('settingsEx.spamGuard.subtitle', 'Çok hızlı dokunuşları durdurur')} isThemed={isThemed} themeVariant={themeVariant}>
                        <ToggleSwitch isEnabled={isSpamGuardEnabled} onToggle={onToggleSpamGuard} themeVariant={themeVariant} />
                    </SettingsRow>
          {isSpamGuardEnabled && (
            <SettingsRow title={t('settingsEx.spamGuard.thresholdTitle', 'Uyarı Eşiği')} subtitle={t('settingsEx.spamGuard.thresholdSubtitle', 'Kaç hızlı dokunuş sonrası ara verilsin?')} isThemed={isThemed} themeVariant={themeVariant}>
                        <select
                          value={spamGuardRoundThreshold}
                          onChange={(e) => onChangeSpamGuardThreshold(Number(e.target.value))}
                          className={`px-3 py-2 rounded-lg border bg-white text-slate-800 ${isThemed ? 'border-white/30' : 'border-slate-300'}`}
                          aria-label={t('settingsEx.spamGuard.thresholdTitle', 'Uyarı Eşiği')}
                        >
                          {spamGuardThresholdOptions.map(option => (
                            <option key={option} value={option}>{t('settingsEx.spamGuard.thresholdOption', '{count} dokunuş').replace('{count}', String(option))}</option>
                          ))}
                        </select>
                    </SettingsRow>
          )}
  {/* Çocuk Modu ve Hatasız Öğrenme kaldırıldı */}
          <SettingsRow
            title={t('settingsEx.settingsBlock.realisticImages', 'Gerçekçi Görseller (Alternatif)')}
            subtitle={t('settingsEx.settingsBlock.realisticImagesDesc', 'Çizimler otizmli çocuklar için bazen soyut gelebilir. Etkinliklerde varsa fotoğraf (gerçek) görselleri dener.')}
            isThemed={isThemed} themeVariant={themeVariant}
          >
            <ToggleSwitch isEnabled={isRealisticImagesEnabled} onToggle={onToggleRealisticImages} themeVariant={themeVariant} />
          </SettingsRow>

          <SettingsRow title={t('settingsEx.fastMode.title', 'Hızlı Mod')} subtitle={t('settingsEx.fastMode.subtitle', 'Geçişleri hızlandırır')} isPremiumFeature={true} isPremiumUser={isPremium} onClick={!isPremium ? showPremiumToast : undefined} isThemed={isThemed} themeVariant={themeVariant}>
                        {isPremium ? <ToggleSwitch isEnabled={isFastTransitionEnabled} onToggle={onToggleFastTransition} themeVariant={themeVariant} /> : <LockClosedIcon className="w-7 h-7 text-slate-400"/>}
                    </SettingsRow>
          {theme === 'deneme' && (
            <SettingsRow title="Okyanus Müziği" subtitle="Okyanus Keşfi temasından arka plan müziği çal" isThemed={isThemed} themeVariant={themeVariant}>
              <ToggleSwitch isEnabled={isUnderwaterMusicEnabled} onToggle={onToggleUnderwaterMusic} themeVariant={themeVariant} />
            </SettingsRow>
          )}
                </div>
            </div>
             <div>
  <h2 className={`text-xl font-bold pt-4 pb-2 border-b ${sectionBorderClass} ${sectionTitleColor} ${isCosmicTheme ? 'drop-shadow-[0_4px_12px_rgba(14,165,233,0.35)]' : ''}`}>{t('settingsEx.content.title', 'İçerik Ayarları')}</h2>
                <div className="space-y-3 mt-2">
          <SettingsRow title={t('settingsEx.banButton.title', 'Görsel Yasaklama')} subtitle={t('settingsEx.banButton.subtitle', "'Yasakla' düğmesini gösterir")} isThemed={isThemed} themeVariant={themeVariant}>
                        <ToggleSwitch isEnabled={isBanButtonEnabled} onToggle={onToggleBanButton} themeVariant={themeVariant} />
                    </SettingsRow>
          <SettingsRow title={t('settingsEx.manageBanned.title', 'Yasaklı Görselleri Yönet')} subtitle={t('settingsEx.manageBanned.subtitle', 'Yasakladıklarınızı düzenleyin')} isThemed={isThemed} themeVariant={themeVariant}>
                        <button onClick={onManageBannedImages} className={manageBannedButtonClass}>
                            <RestoreIcon className={manageBannedIconClass}/>
                        </button>
                    </SettingsRow>
          <SettingsRow title={t('settingsEx.basaraHighlight.title', 'Basara Hece Renklendirme')} subtitle={t('settingsEx.basaraHighlight.subtitle', 'Öğrenilen güncel heceleri belirginleştirir')} isThemed={isThemed} themeVariant={themeVariant}>
            <ToggleSwitch isEnabled={isBasaraHighlightEnabled} onToggle={onToggleBasaraHighlight} themeVariant={themeVariant} />
          </SettingsRow>
                </div>
            </div>
        </div>

  <h2 className={`text-xl font-bold pt-4 pb-2 border-b ${sectionBorderClass} ${sectionTitleColor} ${isCosmicTheme ? 'drop-shadow-[0_4px_12px_rgba(14,165,233,0.35)]' : ''}`}>{t('settingsEx.activityManagement.title', 'Etkinlik Yönetimi')}</h2>
     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ACHIEVEMENTS.filter(a => !(a.id === ActivityCategory.LetterSound && lang !== 'tr')).map(ach => {
          const colorClasses = getColorClasses(ach.color);
          const activityButtonClass =
            isCosmicTheme
              ? 'relative flex items-center gap-4 p-4 rounded-2xl border border-cyan-300/30 bg-white/10 shadow-[0_20px_44px_rgba(14,165,233,0.2)] backdrop-blur-md transition-all duration-200 hover:bg-white/15 hover:shadow-[0_24px_50px_rgba(14,165,233,0.26)]'
            : themeVariant === 'cat'
              ? 'relative flex items-center gap-4 p-4 rounded-2xl border border-orange-200/45 bg-white/38 shadow-[0_20px_44px_rgba(249,115,22,0.2)] transition-all duration-200 hover:bg-white/50 hover:shadow-[0_24px_50px_rgba(249,115,22,0.26)]'
            : themeVariant === 'hilal'
              ? 'relative flex items-center gap-4 p-4 rounded-2xl border border-indigo-200/45 bg-white/40 shadow-[0_20px_44px_rgba(79,70,229,0.2)] transition-all duration-200 hover:bg-white/52 hover:shadow-[0_24px_50px_rgba(79,70,229,0.26)]'
            : themeVariant === 'snow'
              ? 'relative flex items-center gap-4 p-4 rounded-2xl border border-sky-100/45 bg-white/40 shadow-[0_20px_44px_rgba(56,189,248,0.18)] transition-all duration-200 hover:bg-white/50 hover:shadow-[0_24px_50px_rgba(56,189,248,0.24)]'
            : themeVariant === 'fox'
              ? 'relative flex items-center gap-4 p-4 rounded-2xl border border-amber-100/45 bg-white/38 shadow-[0_20px_44px_rgba(245,158,11,0.2)] transition-all duration-200 hover:bg-white/50 hover:shadow-[0_24px_50px_rgba(16,185,129,0.26)]'
            : themeVariant === 'zurafa'
              ? 'relative flex items-center gap-4 p-4 rounded-2xl border border-cyan-200/45 bg-white/38 shadow-[0_20px_44px_rgba(6,182,212,0.2)] transition-all duration-200 hover:bg-white/50 hover:shadow-[0_24px_50px_rgba(6,182,212,0.26)]'
            : 'relative flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/90 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg';
          const activityIconWrapperClass =
            isCosmicTheme
              ? 'p-2.5 rounded-xl bg-white/20 border border-cyan-300/30 shadow-[0_10px_22px_rgba(14,165,233,0.22)]'
            : themeVariant === 'cat'
              ? 'p-2.5 rounded-xl bg-orange-100 border border-orange-200/70 shadow-[0_10px_22px_rgba(249,115,22,0.22)]'
            : themeVariant === 'hilal'
              ? 'p-2.5 rounded-xl bg-indigo-100 border border-indigo-200/70 shadow-[0_10px_22px_rgba(79,70,229,0.22)]'
            : themeVariant === 'snow'
              ? 'p-2.5 rounded-xl bg-sky-100 border border-sky-100/70 shadow-[0_10px_22px_rgba(56,189,248,0.22)]'
            : themeVariant === 'fox'
              ? 'p-2.5 rounded-xl bg-amber-100 border border-amber-100/70 shadow-[0_10px_22px_rgba(245,158,11,0.22)]'
            : themeVariant === 'zurafa'
              ? 'p-2.5 rounded-xl bg-cyan-100 border border-cyan-200/70 shadow-[0_10px_22px_rgba(6,182,212,0.22)]'
            : `p-2.5 ${colorClasses.bg100} rounded-xl border border-slate-200/70 shadow-sm`;
          const activityIconClass =
            isCosmicTheme
              ? 'w-7 h-7 text-white'
            : themeVariant === 'cat'
              ? 'w-7 h-7 text-orange-500'
            : themeVariant === 'hilal'
              ? 'w-7 h-7 text-indigo-200'
            : themeVariant === 'snow'
              ? 'w-7 h-7 text-sky-500'
            : themeVariant === 'fox'
              ? 'w-7 h-7 text-emerald-600'
            : themeVariant === 'zurafa'
              ? 'w-7 h-7 text-cyan-500'
            : `w-6 h-6 ${colorClasses.text600}`;
          const activityTextClass =
            isCosmicTheme
              ? 'font-semibold text-white'
            : themeVariant === 'cat'
              ? 'font-semibold text-orange-900 drop-shadow-[0_1px_4px_rgba(255,255,255,0.55)]'
            : themeVariant === 'hilal'
              ? 'font-semibold text-indigo-100 drop-shadow-[0_1px_4px_rgba(15,23,42,0.65)]'
            : themeVariant === 'snow'
              ? 'font-semibold text-sky-900 drop-shadow-[0_1px_4px_rgba(186,230,253,0.55)]'
            : themeVariant === 'fox'
              ? 'font-semibold text-amber-900 drop-shadow-[0_1px_4px_rgba(255,255,255,0.55)]'
            : themeVariant === 'zurafa'
              ? 'font-semibold text-cyan-900 drop-shadow-[0_1px_4px_rgba(255,255,255,0.55)]'
            : `font-semibold ${textColor}`;
         return (
           <button 
             key={ach.id}
             onClick={() => {
               // localStorage ile scroll pozisyonu kaydedilecek, burada ekstra gerek yok
               onManageActivities(ach.id);
             }}
             className={activityButtonClass}
           >
             <div className={activityIconWrapperClass}>
               <ach.icon className={activityIconClass} />
             </div>
             <span className={activityTextClass}>
               {ach.id === ActivityCategory.LetterSound && t('achievements.categories.letterSound', ach.name)}
               {ach.id === ActivityCategory.Objects && t('achievements.categories.objects', ach.name)}
               {ach.id === ActivityCategory.Concept && t('achievements.categories.concept', ach.name)}
               {ach.id === ActivityCategory.Reasoning && t('achievements.categories.reasoning', ach.name)}
               {ach.id === ActivityCategory.FiveWOneH && t('achievements.categories.fiveWOneH', ach.name)}
               {ach.id === ActivityCategory.FineMotor && t('achievements.categories.fineMotor', ach.name)}
               {ach.id === ActivityCategory.RelativeComparison && t('achievements.categories.relativeComparison', ach.name)}
             </span>
             {themeVariant === 'cat' && (
               <span className="absolute -right-2 -bottom-2 text-2xl opacity-60 pointer-events-none select-none">
                 {"\uD83D\uDC3E"}
               </span>
             )}
             {themeVariant === 'hilal' && (
               <span className="absolute -right-2 -bottom-2 text-2xl opacity-60 pointer-events-none select-none">
                 {"\u2728"}
               </span>
             )}
              {themeVariant === 'snow' && (
                <span className="absolute -right-2 -bottom-2 text-2xl opacity-60 pointer-events-none select-none">
                  {"\u2744"}
                </span>
              )}
              {themeVariant === 'fox' && (
                <span className="absolute -right-2 -bottom-2 text-2xl opacity-60 pointer-events-none select-none">
                  {"\uD83E\uDD8A"}
                </span>
              )}
           </button>
         );
       })}
     </div>

    <div className="grid grid-cols-1 landscape:grid-cols-2 gap-4">
            <div>
         <h2 className={`text-xl font-bold pt-4 pb-2 border-b ${sectionBorderClass} ${sectionTitleColor} ${isCosmicTheme ? 'drop-shadow-[0_4px_12px_rgba(14,165,233,0.35)]' : ''}`}>{t('settingsEx.data.title', 'Veri Yönetimi')}</h2>
                <div className="space-y-3 mt-2">
          <SettingsRow title={t('settingsEx.reset.title', 'İlerlemeyi Sıfırla')} subtitle={t('settingsEx.reset.subtitle', `${activeProfile.name}'in tüm verilerini siler`).replace('{name}', activeProfile.name)} isThemed={isThemed} themeVariant={themeVariant}>
            <button onClick={handleResetClick} className={`p-2 rounded-full transition-colors ${isThemed ? 'bg-red-500/20 hover:bg-red-500/40' : 'bg-red-100 hover:bg-red-200'}`} aria-label={t('settingsEx.reset.title', 'Reset Progress')}>
                            <XCircleIcon className={`w-6 h-6 ${isThemed ? 'text-red-300' : 'text-red-600'}`}/>
                        </button>
                    </SettingsRow>
                </div>
            </div>
             <div>
  <h2 className={`text-xl font-bold pt-4 pb-2 border-b ${sectionBorderClass} ${sectionTitleColor} ${isCosmicTheme ? 'drop-shadow-[0_4px_12px_rgba(14,165,233,0.35)]' : ''}`}>{t('settingsEx.about.title', 'Hakkında')}</h2>
                <div className="space-y-3 mt-2">
          <SettingsRow title={t('settingsEx.privacy.title', 'Gizlilik Politikası')} subtitle={t('settingsEx.privacy.subtitle', 'Veri kullanımı ve haklarınız')} isThemed={isThemed} themeVariant={themeVariant}>
             <button onClick={onSelectPrivacyPolicy} className={privacyLinkClass}>
            {t('settingsEx.privacy.read', 'Oku')}
                      </button>
                    </SettingsRow>
                </div>
            </div>
        </div>

        {/* Joker Hakkı (Parent Override) */}
        <div className="rounded-2xl p-4 bg-white/90 border border-emerald-200 shadow-sm mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-emerald-800 flex items-center gap-2">
              🎟️ Joker Hakkı
            </h2>
          </div>
              <p className="text-sm text-slate-600 mb-2">
                Burada çocuğunuzun o an takıldığı (zayıf olduğu) etkinlikler listelenir. Sadece bu etkinliklere joker uygulanabilir.
              </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
            <select
              value={overrideActivityId}
              onChange={(e) => setOverrideActivityId(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Takıldığı etkinlikleri seçin…</option>
              {(() => {
                try {
                  const stats = profile?.activityStats || {};
                  const unlocked = getUnlockedUnits(stats, new Set<string>());
                  const focusUnit = Math.max(...Array.from(unlocked.values()), 1);
                  const unitDef = getUnitDefinition(focusUnit);
                  const activities = unitDef?.activities || [];

                  const successOf = (id: string) => {
                    const st = stats[id];
                    if (!st) return 0;
                    let correct = st.totalCorrect || 0;
                    let total = st.totalQuestions || 0;
                    if (total === 0) {
                      const hist = (st.history || []).filter(h => h.total > 0);
                      for (const h of hist) { correct += h.score; total += h.total; }
                    }
                    return total > 0 ? correct / total : 0;
                  };

                  const stuck = activities.filter(a => {
                    const id = String(a);
                    const s = successOf(id);
                    return s > 0 && s < 0.8; // zayıf / takılı
                  });

                  if (stuck.length === 0) return <option value="">(Şu an takıldığı etkinlik yok)</option>;

                  return stuck.map(id => (
                    <option key={id} value={id}>
                      {ACTIVITY_METADATA_MAP[id]?.activityName || id}
                    </option>
                  ));
                } catch (e) {
                  return <option value="">(Etkinlik yüklenemedi)</option>;
                }
              })()}
            </select>
            <select
              value={overrideHours}
              onChange={(e) => setOverrideHours(Number(e.target.value))}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              {[4, 12, 24, 48, 72].map(h => (
                <option key={h} value={h}>{h} saat</option>
              ))}
            </select>
            <input
              value={overrideReason}
              onChange={(e) => setOverrideReason(e.target.value)}
              placeholder="(İsteğe bağlı) Not / sebep"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm flex items-center gap-2">
                <input type="checkbox" checked={overrideIgnoreForProgress} onChange={(e) => setOverrideIgnoreForProgress(e.target.checked)} className="w-4 h-4" />
                <span className="text-xs">Bu etkinliği ünite ilerlemesinden sayma (çocuğun takıldığı için atla)</span>
              </label>
            </div>
            <button
              type="button"
              onClick={() => {
                if (!overrideActivityId) return;
                onAddParentOverride(overrideActivityId, overrideHours, overrideReason || undefined, overrideIgnoreForProgress);
                setOverrideActivityId("");
                setOverrideReason("");
                setOverrideIgnoreForProgress(false);
              }}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold disabled:opacity-50"
            disabled={!overrideActivityId}
          >
            Joker Ekle
          </button>

          {parentOverrides && parentOverrides.filter(o => o.expiresAt > Date.now()).length > 0 ? (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-emerald-800 mb-2">Aktif Jokerler</h3>
              <ul className="space-y-2">
                {parentOverrides
                  .filter(o => o.expiresAt > Date.now())
                  .sort((a,b) => a.expiresAt - b.expiresAt)
                  .map((o) => (
                  <li key={`${o.activityId}-${o.expiresAt}`} className="flex items-center justify-between border rounded-lg px-3 py-2 text-sm">
                    <div>
                      <div className="font-medium">{ACTIVITY_METADATA_MAP[o.activityId]?.activityName || o.activityId}</div>
                      <div className="text-slate-500 text-xs">Bitiş: {new Date(o.expiresAt).toLocaleString()}</div>
                      {o.reason && <div className="text-slate-500 text-xs">Not: {o.reason}</div>}
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveParentOverride(String(o.activityId))}
                      className="text-red-600 text-xs font-semibold hover:underline"
                    >
                      Kaldır
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-xs text-slate-500 mt-3">Aktif joker yok.</p>
          )}
        </div>
      </div>
    </div>
  );

  if (!themeVariant) {
    return (
      <SimpleThemeWrapper maxWidthClassName="max-w-4xl">
        {settingsContent}
      </SimpleThemeWrapper>
    );
  }

  return settingsContent;
};

export default SettingsScreen;
