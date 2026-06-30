interface Background {
  type: 'video' | 'gradient';
  value: string; // path or tailwind gradient classes
}

interface Theme {
  name: string;
  previewClass: string;
  type: 'video' | 'gradient';
  value: string; // portrait (default) video path or gradient classes
  landscapeValue?: string; // optional landscape override video path
}

export const THEMES: Record<string, Theme> = {
  simple: {
    name: 'Sade',
    previewClass: 'bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100',
    type: 'gradient',
    value: 'bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100',
  },
  simple2: {
    name: 'Sade 2',
    previewClass: 'bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100',
    type: 'gradient',
    value: 'bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100',
  },
  yumusak: {
    name: '☁️ Yumuşak',
    previewClass: 'bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50',
    type: 'gradient',
    value: 'bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50',
  },
  koyu: {
    name: '🌙 Koyu Yumuşak',
    previewClass: 'bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900',
    type: 'gradient',
    value: 'bg-gradient-to-br from-slate-800 via-gray-900 to-slate-900',
  },
  // Oceanic, undersea 'Deneme' theme — keep it distinct and readable
  deneme: { name: '🎨 Okyanus Keşfi', previewClass: 'bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-500', type: 'gradient', value: 'bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-500' },
  deneme2: { name: '🤖 Robot Arkadaş', previewClass: 'bg-gradient-to-br from-sky-200 via-indigo-100 to-purple-100', type: 'gradient', value: 'bg-gradient-to-br from-sky-200 via-indigo-100 to-purple-100' },
  gunes: { name: 'Güneş', previewClass: 'bg-yellow-300', type: 'video', value: '/videos/gunes.mp4', landscapeValue: '/videos/gunesyan.mp4' },
  tilki: { name: 'Tilki', previewClass: 'bg-green-400', type: 'video', value: '/videos/tilki.mp4' },
  ay: { name: 'Ay', previewClass: 'bg-indigo-400', type: 'video', value: '/videos/ay.mp4', landscapeValue: '/videos/ayyan.mp4' },
  geceorman: { name: 'Gece Ormanı', previewClass: 'bg-indigo-800', type: 'video', value: '/videos/geceorman.mp4', landscapeValue: '/videos/geceormanyan.mp4' },
  yagmur: { name: 'Yağmur', previewClass: 'bg-slate-500', type: 'video', value: '/videos/yagmur.mp4', landscapeValue: '/videos/yagmuryan.mp4' },
  kus: { name: 'Kuşlar', previewClass: 'bg-sky-400', type: 'video', value: '/videos/kus.mp4', landscapeValue: '/videos/kusyan.mp4' },
  tilki2: { name: 'Çayır Tilkisi', previewClass: 'bg-lime-400', type: 'video', value: '/videos/tilki2.mp4', landscapeValue: '/videos/tilki2yan.mp4' },
  kedi: { name: 'Kedi', previewClass: 'bg-green-400', type: 'video', value: '/videos/kedi.mp4', landscapeValue: '/videos/kediyan.mp4' },
  kar: { name: 'Kar', previewClass: 'bg-sky-200', type: 'video', value: '/videos/kar.mp4', landscapeValue: '/videos/karyan.mp4' },
  gunbatimi: { name: 'Gün Batımı', previewClass: 'bg-orange-400', type: 'video', value: '/videos/gunbatimi.mp4', landscapeValue: '/videos/gunbatimiyan.mp4' },
  ay2: { name: 'Hilal', previewClass: 'bg-indigo-500', type: 'video', value: '/videos/ay2.mp4', landscapeValue: '/videos/ayyan.mp4' },
  zurafa: { name: 'Zürafa', previewClass: 'bg-cyan-300', type: 'video', value: '/videos/zurafa2.mp4' },
  geometri: { name: 'Geometrik', previewClass: 'bg-rose-200', type: 'video', value: '/videos/geometri.mp4', landscapeValue: '/videos/geometriyan.mp4' },
};

// Themes that should be available to all users (temporarily free or permanently free)
export const FREE_THEMES = new Set<string>(['simple', 'simple2', 'yumusak', 'koyu', 'deneme', 'deneme2', 'tilki', 'yagmur', 'kedi']);

export const getScreenBackground = (
  themeKey: string,
  isLandscape?: boolean
): Background => {
  const selectedTheme = THEMES[themeKey] || THEMES.simple;
  const useValue = (isLandscape && selectedTheme.landscapeValue) ? selectedTheme.landscapeValue : selectedTheme.value;
  return {
    type: selectedTheme.type,
    value: useValue,
  };
};