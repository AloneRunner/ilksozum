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

// 2026-10 (Kaan): Sade dışındaki temalar kaldırıldı; yeni görünüşler arka plan sahnesiyle (ui/ArkaPlanSahnesi).
// Eski tema kaydı olan kullanıcı açılışta Sade'ye döner (useSettings). Videolar yedek/videolar klasöründe.
export const THEMES: Record<string, Theme> = {
  simple: {
    name: 'Sade',
    previewClass: 'bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100',
    type: 'gradient',
    value: 'bg-gradient-to-br from-pink-100 via-purple-50 to-cyan-100',
  },
};

// Themes that should be available to all users (temporarily free or permanently free)
export const FREE_THEMES = new Set<string>(['simple']);

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