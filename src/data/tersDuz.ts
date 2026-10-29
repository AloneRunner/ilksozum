// Ters / Düz (Gökhan Hoca, 2026-10-29): yalnız baş aşağı duran nesneler. Tişört (içi dışında), şapka (arkası önde) ve
// benzerleri (kazak, pantolon) bu etkinlikten çıktı; sağ-sol giyilen ayakkabılar da çalışmaya alınmadı.
// foto: veri setindeki çift (düz, ters); kesik: aynı kesik görsel, ters şıkta baş aşağı çevrilir.
export interface TersDuzSet { ad: string; duz: string; ters: string; cevir?: boolean }
const foto = (ad: string, duz: number): TersDuzSet => ({ ad, duz: `/images/${duz}.webp`, ters: `/images/${duz + 1}.webp` });
const kesik = (ad: string, dosya: string): TersDuzSet => ({ ad, duz: `/images/ozel/kesik/${dosya}.webp`, ters: `/images/ozel/kesik/${dosya}.webp`, cevir: true });
export const TERS_DUZ_SETLER: TersDuzSet[] = [
  foto('oyuncak ayı', 5703), foto('fincan', 5707), foto('kova', 5711), foto('saksı', 5715), foto('sandalye', 5717),
  foto('şemsiye', 5721), foto('şişe', 5723), foto('tabure', 5725),
  kesik('bardak', 'bardak'), kesik('kutu', 'kutu'), kesik('araba', 'araba'),
];
/** Eski "Hızlı Sorular" verisinden çıkan görseller (içi dışında / arkası önde): kazak, pantolon, şapka, tişört */
export const TERS_DUZ_CIKAN = new Set([5709, 5710, 5713, 5714, 5719, 5720, 5729, 5730]);
export const tdSoru = (s: TersDuzSet, ters: boolean) => `Hangi ${s.ad} ${ters ? 'ters' : 'düz'}?`;
export const tdDogru = (s: TersDuzSet, ters: boolean) => `Evet! Bu ${s.ad} ${ters ? 'ters' : 'düz'}.`;
