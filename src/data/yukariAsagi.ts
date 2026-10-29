// Yukarıda / Aşağıda setleri (Gökhan Hoca, 2026-10-29): masa/tabure/sandalye yok ("üstünde-altında" ile karışıyor);
// dikey sahneler: kitaplık rafları, ağaç, merdiven, gökyüzü–yer. İki şıkta sahne aynı, yalnız nesnenin yüksekliği değişir.
export type DikeySahne = 'kitaplik' | 'agac' | 'merdiven' | 'gokyuzu';
export interface YukariSet { nesne: string; dosya: string; sahne: DikeySahne }
export const YUKARI_SETLER: YukariSet[] = [
  { nesne: 'top', dosya: 'top', sahne: 'kitaplik' }, { nesne: 'ayı', dosya: 'ayi', sahne: 'kitaplik' },
  { nesne: 'araba', dosya: 'araba', sahne: 'kitaplik' }, { nesne: 'bebek', dosya: 'bebek', sahne: 'kitaplik' },
  { nesne: 'elma', dosya: 'elma', sahne: 'kitaplik' }, { nesne: 'kitap', dosya: 'kitap', sahne: 'kitaplik' },
  { nesne: 'kedi', dosya: 'kedi', sahne: 'agac' }, { nesne: 'top', dosya: 'top', sahne: 'agac' },
  { nesne: 'kedi', dosya: 'kedi', sahne: 'merdiven' }, { nesne: 'ayı', dosya: 'ayi', sahne: 'merdiven' },
  { nesne: 'balon', dosya: 'balon', sahne: 'gokyuzu' },
];
export const yukariSoru = (s: YukariSet, yukari: boolean) => `Hangi ${s.nesne} ${yukari ? 'yukarıda' : 'aşağıda'}?`;
export const yukariDogru = (s: YukariSet, yukari: boolean) => `Evet! Bu ${s.nesne} ${yukari ? 'yukarıda' : 'aşağıda'}.`;
