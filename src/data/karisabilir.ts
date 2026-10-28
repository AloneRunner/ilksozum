// Nesne sorularında birlikte çıkmaması gereken kelimeler (eski test ve Kelime Öğren ortak kullanır).

// Görselleri birbirine çok benzeyen kelimeler: aynı gruptakilerden ikisi aynı soruda yan yana çıkmaz.
export const KARISABILIR_GRUPLAR: string[][] = [
    ['süt', 'ayran'],
    // Kaan (2026-10-29): Türkiye'de yapı taşlarına da "lego" deniyor; görseller de birbirine çok benziyor
    // (yapı blokları = Lego kulesi, oyuncaklar = Lego dolu kutu)
    ['lego', 'yapı blokları', 'bloklar', 'oyuncaklar'],
];

// Kendi kategorisinde soru olamayacak kadar genel kelimeler ("Oyuncaklar hangisi?" sorusunda hepsi oyuncak)
export const GENEL_KELIMELER = new Set(['bitki', 'çiçek', 'oyuncaklar']);

const kucuk = (s: string) => s.toLocaleLowerCase('tr-TR').trim();
export const karisabilir = (a: string, b: string): boolean => {
    const x = kucuk(a), y = kucuk(b);
    return x !== y && KARISABILIR_GRUPLAR.some(g => g.includes(x) && g.includes(y));
};
export const genelKelime = (kelime: string): boolean => GENEL_KELIMELER.has(kucuk(kelime));
