// İlk / Son (Gökhan Hoca, 2026-10-29): tek resim; bayrak solda, aynı nesneler aynı zeminde bayrağa doğru dizili.
// Soruda renk yok: "Hangisi ilk?" / "Hangisi son?". Önce 3 nesne, sonra 4–5. İki resimli eski düzen ileri aşama
// (Hızlı Sorular) olarak kalır; "ortada" daha sonra eklenecek.
export const ILK_SON_NESNELER = ['araba', 'kaplumbaga', 'ordek'] as const;
export type IlkSonNesne = typeof ILK_SON_NESNELER[number];
export const isSoru = (ilk: boolean) => `Hangisi ${ilk ? 'ilk' : 'son'}?`;
export const isDogru = (ilk: boolean) => `Evet! Bu ${ilk ? 'ilk' : 'son'}.`;
