import { Capacitor } from '@capacitor/core';

export interface AppShowcaseItem {
  id: string;
  name: string;
  emoji: string;
  accent: string;
  webHref: string;
  androidHref?: string;
  logoUrl?: string;
}

export const APP_SHOWCASE: AppShowcaseItem[] = [
  {
    id: 'ozarik-org',
    name: 'ozarik.org',
    emoji: '🌐',
    accent: '#60a5fa',
    webHref: 'https://ozarik.org/',
  },
  {
    id: 'zeka-ustasi',
    name: 'Zeka Ustası',
    emoji: '🧠',
    accent: '#56c2ff',
    webHref: 'https://ozarikzeka.netlify.app/',
    androidHref: 'https://play.google.com/store/apps/details?id=org.ozarik.akiloyunlari',
    logoUrl: '/logo-zeka.png',
  },
  {
    id: 'ders-timetable',
    name: 'Özarık DersTimeTable',
    emoji: '📝',
    accent: '#56c2ff',
    webHref: 'https://ozariktable.netlify.app/',
    androidHref: 'https://play.google.com/store/apps/details?id=com.ozarik.dersprogrami',
    logoUrl: '/logo-ders.png',
  },
  {
    id: 'kelime-pusulasi',
    name: 'Kelime Pusulası',
    emoji: '🧭',
    accent: '#5edb7b',
    webHref: 'https://kelimepusulasi.netlify.app/',
    androidHref: 'https://play.google.com/store/apps/details?id=com.kelimepusulasi.app',
    logoUrl: '/logo-kelime.png',
  },
  {
    id: 'pocket-manager',
    name: 'Pocket Football Manager',
    emoji: '⚽',
    accent: '#ff8b63',
    webHref: 'https://promanagerturkey.netlify.app/',
    androidHref: 'https://play.google.com/store/apps/details?id=com.pocketfootballmanager.game',
    logoUrl: '/logo-pfm.png',
  },
];

export const WEB_VERSION_URL = 'https://ilksozumotizm.netlify.app/';

export const getPlatformLink = (item: AppShowcaseItem) => {
  const isAndroid = typeof Capacitor !== 'undefined'
    ? Capacitor.getPlatform() === 'android'
    : /android/i.test(navigator?.userAgent || '');
  if (isAndroid && item.androidHref) {
    return item.androidHref;
  }
  return item.webHref;
};
