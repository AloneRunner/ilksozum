// Önünde / Arkasında setleri (Gökhan Hoca, 2026-10-29: "ördek–sepet örneği model alınsın"): referans nesne iki şıkta
// aynı yerde ve aynı ölçekte; nesne referansın tam ortasında; önünde referansın bir kısmını kapatır, arkasında yalnız üstü görünür.
export interface OnArkaSet { nesne: string; dosya: string; ref: string; refDosya: string; refBoy: number; tamlayan: string }
export const ON_ARKA_SETLER: OnArkaSet[] = [
  { nesne: 'top', dosya: 'top', ref: 'kutu', refDosya: 'kutu', refBoy: 120, tamlayan: 'kutunun' },
  { nesne: 'ayı', dosya: 'ayi', ref: 'sepet', refDosya: 'sepet', refBoy: 110, tamlayan: 'sepetin' },
  { nesne: 'araba', dosya: 'araba', ref: 'kova', refDosya: 'kova', refBoy: 110, tamlayan: 'kovanın' },
  { nesne: 'elma', dosya: 'elma', ref: 'kase', refDosya: 'kase', refBoy: 72, tamlayan: 'kasenin' },
  { nesne: 'kedi', dosya: 'kedi', ref: 'kutu', refDosya: 'kutu', refBoy: 120, tamlayan: 'kutunun' },
  { nesne: 'bebek', dosya: 'bebek', ref: 'sepet', refDosya: 'sepet', refBoy: 110, tamlayan: 'sepetin' },
];
export const onArkaSoru = (s: OnArkaSet, on: boolean) => `Hangi ${s.nesne} ${s.tamlayan} ${on ? 'önünde' : 'arkasında'}?`;
export const onArkaDogru = (s: OnArkaSet, on: boolean) => `Evet! Bu ${s.nesne} ${s.tamlayan} ${on ? 'önünde' : 'arkasında'}.`;
