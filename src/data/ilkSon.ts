// İlk / Son (Gökhan Hoca, 2026-10-29): tek resim; bayrak solda, aynı nesneler aynı zeminde bayrağa doğru dizili.
// Soruda renk yok: "Hangisi ilk?" / "Hangisi son?". Önce 3 nesne, sonra 4–5; "ortada" ileri aşama (3 ya da 5 nesne).
// Nesneler eski sıra görsellerinin kaynağından kesik (lastik ördek, araba, ayı; hepsi sola, bayrağa bakıyor).
// İki resimli eski düzen Hızlı Sorular'da kalır.
export const ILK_SON_NESNELER = ['sira-ordek', 'sira-araba', 'sira-ayi'] as const;
export type IlkSonNesne = typeof ILK_SON_NESNELER[number];
export type Sira = 'ilk' | 'son' | 'ortada';
export const isSoru = (k: Sira) => `Hangisi ${k}?`;
export const isDogru = (k: Sira) => `Evet! Bu ${k}.`;
