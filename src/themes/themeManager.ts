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

// 2026-10: video arka planlı temalar kaldırıldı (videolar yedek/videolar klasöründe)
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
};

// Themes that should be available to all users (temporarily free or permanently free)
export const FREE_THEMES = new Set<string>(['simple', 'simple2', 'yumusak', 'koyu', 'deneme', 'deneme2']);

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