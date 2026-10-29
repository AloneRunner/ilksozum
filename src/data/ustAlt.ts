// Üstünde / Altında setleri (Gökhan Hoca, 2026-10-29): nesne (kesik fotoğraf) + kodla çizilmiş mobilya.
export type Mobilya = 'masa' | 'sandalye' | 'tabure' | 'sehpa' | 'bank';
export interface UstAltSet { nesne: string; dosya: string; mobilya: Mobilya; tamlayan: string }
export const UST_ALT_SETLER: UstAltSet[] = [
  { nesne: 'top', dosya: 'top', mobilya: 'masa', tamlayan: 'masanın' },
  { nesne: 'ayı', dosya: 'ayi', mobilya: 'sandalye', tamlayan: 'sandalyenin' },
  { nesne: 'araba', dosya: 'araba', mobilya: 'sehpa', tamlayan: 'sehpanın' },
  { nesne: 'elma', dosya: 'elma', mobilya: 'tabure', tamlayan: 'taburenin' },
  { nesne: 'kedi', dosya: 'kedi', mobilya: 'bank', tamlayan: 'bankın' },
  { nesne: 'bebek', dosya: 'bebek', mobilya: 'sandalye', tamlayan: 'sandalyenin' },
  { nesne: 'portakal', dosya: 'portakal', mobilya: 'tabure', tamlayan: 'taburenin' },
  { nesne: 'çanta', dosya: 'canta', mobilya: 'masa', tamlayan: 'masanın' },
  { nesne: 'kitap', dosya: 'kitap', mobilya: 'sehpa', tamlayan: 'sehpanın' },
];
export const ustAltSoru = (s: UstAltSet, ust: boolean) => `Hangi ${s.nesne} ${s.tamlayan} ${ust ? 'üstünde' : 'altında'}?`;
export const ustAltDogru = (s: UstAltSet, ust: boolean) => `Evet! Bu ${s.nesne} ${s.tamlayan} ${ust ? 'üstünde' : 'altında'}.`;
