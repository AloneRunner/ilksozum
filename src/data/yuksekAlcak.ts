// Yüksek / Alçak (Gökhan Hoca, 2026-10-29): yalnız yükseklik değişir; en, model, renk ve açı aynı, nesneler aynı taban
// çizgisinde. Blok kulesi model: iki kulede bloklar aynı boyda. Uzun/kısa yatay, yüksek/alçak dikey nesnelerle sorulur.
export type YuksekTur = 'kule' | 'bina' | 'kitaplik' | 'duvar' | 'cit' | 'masa' | 'tabure';
export const YK_NESNELER: [YuksekTur, string][] = [
  ['kule', 'blok kulesi'], ['bina', 'bina'], ['kitaplik', 'kitaplık'], ['duvar', 'duvar'], ['cit', 'çit'], ['masa', 'masa'], ['tabure', 'tabure'],
];
export const ykSoru = (ad: string, yuksek: boolean) => `Hangi ${ad} ${yuksek ? 'yüksek' : 'alçak'}?`;
export const ykDogru = (ad: string, yuksek: boolean) => `Evet! Bu ${ad} ${yuksek ? 'yüksek' : 'alçak'}.`;
