import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

// Yeni sürüm yayınlanınca açık sekmedeki eski sayfa, artık sunucuda olmayan parça dosyalarını ister (404) ve ekran çöker
// (Kaan, 2026-10-21: Program Modu'na basınca "Failed to fetch dynamically imported module").
// Parça yüklenemezse sayfa bir kez yenilenir; yeni sürüm gelir. Aynı oturumda tekrar olursa (gerçek bir hata) yenileme yapılmaz.
const ANAHTAR = 'parcaYenilendi';

const parcaHatasi = (e: unknown) => /dynamically imported module|Importing a module script failed|Failed to fetch|error loading dynamically/i.test(String((e as Error)?.message || e));

export function lazyGuvenli<T extends ComponentType<any>>(yukle: () => Promise<{ default: T }>): LazyExoticComponent<T> {
  return lazy(() => yukle().then((m) => {
    try { sessionStorage.removeItem(ANAHTAR); } catch { /* yok say */ }
    return m;
  }).catch((e) => {
    let yenilendi = false;
    try { yenilendi = sessionStorage.getItem(ANAHTAR) === '1'; } catch { /* yok say */ }
    if (parcaHatasi(e) && !yenilendi) {
      try { sessionStorage.setItem(ANAHTAR, '1'); } catch { /* yok say */ }
      window.location.reload();
      return new Promise<{ default: T }>(() => { /* yenilenirken bekle */ });
    }
    throw e;
  }));
}
