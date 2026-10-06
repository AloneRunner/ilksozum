// Türkçe cümle yardımcıları (Kaan, 2026-10-06: "Misketler hangisi? / Evet, bu misketler" dilbilgisine ters).
// Çoğul isimler soruda ve cevapta tekil kullanılır: "Misket hangisi?", "Evet, bunlar misket.", "Hayır, bu misket değil."

/** Sondaki çoğul ekini (-lar/-ler) atar; "alkışlayan eller" → "alkışlayan el". */
export const trTekil = (kelime: string): string => kelime.replace(/(lar|ler)$/i, '') || kelime;

/** Kelime çoğul mu (sonu -lar/-ler)? Görsel kelimelerinde -lar/-ler ile biten tekil isim yok. */
export const trCogulMu = (kelime: string): boolean => /(lar|ler)$/i.test(kelime.trim());

export const buyukBas = (s: string): string => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

/** "Misket hangisi?" */
export const trHangisi = (kelime: string): string => `${buyukBas(trTekil(kelime))} hangisi?`;
/** "Evet, bunlar misket." / "Evet, bu top." */
export const trEvetBu = (kelime: string): string => trCogulMu(kelime) ? `Evet, bunlar ${trTekil(kelime)}.` : `Evet, bu ${kelime}.`;
/** "Hayır, bu misket değil." */
export const trHayirBuDegil = (kelime: string): string => `Hayır, bu ${trTekil(kelime)} değil.`;

/** Özel isme ilgi eki: "Ali'nin", "Kaan'ın", "Mert'in", "Doğu'nun", "Gül'ün" (ünlü uyumu). */
export const trIlgi = (ad: string): string => {
    const a = ad.trim();
    const kucuk = a.toLocaleLowerCase('tr-TR');
    const unluler = [...kucuk].filter(c => 'aıoueiöü'.includes(c));
    const son = unluler[unluler.length - 1] || 'e';
    const ek = ({ a: 'ın', ı: 'ın', o: 'un', u: 'un', e: 'in', i: 'in', ö: 'ün', ü: 'ün' } as Record<string, string>)[son];
    const unluyleBiter = 'aıoueiöü'.includes(kucuk.slice(-1));
    return `${a}'${unluyleBiter ? 'n' : ''}${ek}`;
};
