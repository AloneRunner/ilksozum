// Kelimeden uygulamanın kendi fotoğrafını bulur (mini oyunlarda emoji yerine; Kaan: "uygulama kendi görsellerini kullanıyordu").
// Yeni gerçekçi görsel (id 2001+) tercih edilir; eskiyse yenisine çevrilir (nesneUrl). Yoksa null → oyun emojiye düşer.
import { imageData } from './database/imageData.ts';
import { nesneUrl } from './nesneGorsel.ts';

const yeniMi = (u: string) => { const m = /\/images\/(\d+)\.webp$/.exec(u); return !!m && Number(m[1]) >= 2001; };
let harita: Map<string, string> | null = null;

export const kelimeGorseli = (kelime: string): string | null => {
  if (!harita) {
    harita = new Map();
    for (const e of imageData) {
      const k = e.word.toLocaleLowerCase('tr-TR').trim();
      const url = nesneUrl(e.imageUrl);
      const onceki = harita.get(k);
      if (!onceki || (!yeniMi(onceki) && yeniMi(url))) harita.set(k, url);
    }
  }
  return harita.get(kelime.toLocaleLowerCase('tr-TR').trim()) || null;
};
