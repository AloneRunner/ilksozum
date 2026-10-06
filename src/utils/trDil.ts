// Türkçe cümle yardımcıları (Kaan, 2026-10-06: "Misketler hangisi? / Evet, bu misketler" dilbilgisine ters).
// Çoğul isimler soruda ve cevapta tekil kullanılır: "Misket hangisi?", "Evet, bunlar misket.", "Hayır, bu misket değil."

/** Sondaki çoğul ekini (-lar/-ler) atar; "alkışlayan eller" → "alkışlayan el". */
export const trTekil = (kelime: string): string => kelime.replace(/(lar|ler)$/i, '') || kelime;

/** Kelime çoğul mu (sonu -lar/-ler)? Görsel kelimelerinde -lar/-ler ile biten tekil isim yok. */
export const trCogulMu = (kelime: string): boolean => /(lar|ler)$/i.test(kelime.trim());

const buyukBas = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

/** "Misket hangisi?" */
export const trHangisi = (kelime: string): string => `${buyukBas(trTekil(kelime))} hangisi?`;
/** "Evet, bunlar misket." / "Evet, bu top." */
export const trEvetBu = (kelime: string): string => trCogulMu(kelime) ? `Evet, bunlar ${trTekil(kelime)}.` : `Evet, bu ${kelime}.`;
/** "Hayır, bu misket değil." */
export const trHayirBuDegil = (kelime: string): string => `Hayır, bu ${trTekil(kelime)} değil.`;
