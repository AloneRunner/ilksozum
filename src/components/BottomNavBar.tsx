
import React from 'react';
import { Tab } from '../types.ts';
import ObjectsIcon from './icons/ObjectsIcon.tsx';
import CommunicationIcon from './icons/CommunicationIcon.tsx';
import TrophyIcon from './icons/TrophyIcon.tsx';
import CogIcon from './icons/CogIcon.tsx';
import CrownIcon from './icons/CrownIcon.tsx';
import { t } from '../i18n/index.ts';

interface BottomNavBarProps {
  activeTab: Tab;
  onSelectTab: (tab: Tab) => void;
  onSelectSettings: () => void;
  isPremium: boolean;
  themeKey?: string;
}

const NavButton: React.FC<{
  icon: React.FC<{ className?: string }>;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isLocked?: boolean;
  themeKey: string;
}> = ({ icon: Icon, label, isActive, onClick, isLocked, themeKey }) => {
  const isCosmic = themeKey === 'deneme2';
  const isUnderwater = themeKey === 'deneme'; const activeClasses = isCosmic
    ? 'text-cyan-300'
    : isUnderwater
      ? 'text-cyan-200 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]'
      : 'text-sky-600 landscape:bg-sky-100/80';

  const inactiveClasses = (() => {
    if (isCosmic) {
      return isLocked ? 'text-slate-500/60' : 'text-slate-300 hover:text-white/90';
    }
    if (isUnderwater) {
      return isLocked ? 'text-slate-500/60' : 'text-cyan-100/70 hover:text-cyan-200 hover:drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]';
    }
    return isLocked ? 'text-slate-400' : 'text-slate-500 hover:text-sky-500 landscape:hover:bg-slate-200/50';
  })();

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 landscape:w-auto landscape:h-auto landscape:p-2 landscape:rounded-lg ${isActive ? activeClasses : inactiveClasses}`}
    >
      <Icon className={`w-7 h-7 mb-0.5 landscape:w-8 landscape:h-8 ${isCosmic ? 'drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]' : isUnderwater ? 'drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : ''}`} />
      <span className={`text-xs font-bold landscape:text-[10px] landscape:mt-1 ${isCosmic || isUnderwater ? 'tracking-wide' : ''}`}>{label}</span>
      {isLocked && <CrownIcon className="absolute -top-0.5 -right-0.5 w-4 h-4 text-amber-500 bg-white rounded-full p-0.5" />}
    </button>
  );
};

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onSelectTab, onSelectSettings, isPremium, themeKey }) => {
  const currentThemeKey = themeKey || 'simple'; // Fallback to simple theme

  // Determine variant based on themeKey
  let variant: 'default' | 'cosmic' | 'underwater' = 'default';
  if (currentThemeKey === 'deneme2') {
    variant = 'cosmic';
  } else if (currentThemeKey === 'deneme') {
    variant = 'underwater';
  }

  const isCosmicTheme = variant === 'cosmic';
  const isUnderwaterTheme = variant === 'underwater';

  const baseNavClass = isCosmicTheme
    ? 'bg-slate-800/90 border-cyan-500/30 shadow-[0_-4px_20px_rgba(6,182,212,0.2)] text-slate-200'
    : isUnderwaterTheme
      ? 'bg-gradient-to-t from-[#001122]/80 via-[#001a2e]/70 to-[#000814]/60 border-cyan-400/30 shadow-[0_-8px_24px_rgba(6,182,212,0.15)] text-cyan-100'
      : 'bg-white/80 border-slate-200 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]';

  return (
    <nav className={`fixed bottom-0 left-0 right-0 h-20 ${baseNavClass} backdrop-blur-md flex items-center justify-around z-30 landscape:h-full landscape:w-20 landscape:flex-col landscape:justify-start landscape:pt-6 landscape:pb-8 landscape:gap-3 landscape:border-t-0 landscape:border-r-2 landscape:right-auto`}>
      <NavButton
        icon={ObjectsIcon}
        label={t('tabs.activities', 'Etkinlikler')}
        isActive={activeTab === Tab.Activities}
        onClick={() => onSelectTab(Tab.Activities)}
        themeKey={currentThemeKey}
      />
      <NavButton
        icon={CommunicationIcon}
        label={t('tabs.communication', 'İletişim')}
        isActive={activeTab === Tab.Communication}
        onClick={() => onSelectTab(Tab.Communication)}
        themeKey={currentThemeKey}
      />
      <NavButton
        icon={TrophyIcon}
        label={t('tabs.achievements', 'Başarımlar')}
        isActive={activeTab === Tab.Rewards}
        onClick={() => onSelectTab(Tab.Rewards)}
        isLocked={!isPremium}
        themeKey={currentThemeKey}
      />
      <NavButton
        icon={CogIcon}
        label={t('tabs.settings', 'Ayarlar')}
        isActive={false}
        onClick={onSelectSettings}
        themeKey={currentThemeKey}
      />
    </nav>
  );
};

export default React.memo(BottomNavBar);
