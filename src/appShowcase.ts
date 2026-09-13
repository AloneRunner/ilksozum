import { Capacitor } from '@capacitor/core';

export interface AppShowcaseItem {
  id: string;
  name: string;
  emoji: string;
  accent: string;
  webHref: string;
  androidHref?: string;
  windowsHref?: string;
  description: string;
  logoUrl?: string;
}

export const APP_SHOWCASE: AppShowcaseItem[] = [
  {
    id: 'ozarik-org',
    name: 'ozarik.org',
    emoji: '🌐',
    accent: '#60a5fa',
    webHref: 'https://ozarik.org/',
    description: 'Eğitim uygulamalarım ve projelerim',
  },
  {
    id: 'zeka-ustasi',
    name: 'Zeka Ustası',
    emoji: '🧠',
    accent: '#56c2ff',
    webHref: 'https://ozarikzeka.netlify.app/',
    androidHref: 'https://play.google.com/store/apps/details?id=org.ozarik.akiloyunlari',
    description: 'TAZOF turnuvaları için zeka oyunları',
    logoUrl: '/logo-zeka.png',
  },
  {
    id: 'ders-timetable',
    name: 'Özarık DersTimeTable',
    emoji: '📝',
    accent: '#56c2ff',
    webHref: 'https://ozariktable.netlify.app/',
    androidHref: 'https://play.google.com/store/apps/details?id=com.ozarik.dersprogrami',
    windowsHref: 'https://apps.microsoft.com/detail/9N5Z8M82FSQ2?hl=tr-tr&gl=TR&ocid=pdpshare',
    description: 'İdareci, sınıf ve öğretmen ders programı hazırlama',
    logoUrl: '/logo-ders.png',
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
  if (/windows/i.test(navigator?.userAgent || '') && item.windowsHref) {
    return item.windowsHref;
  }
  return item.webHref;
};
