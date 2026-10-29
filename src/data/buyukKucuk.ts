// Büyük / Küçük çalışması (Gökhan Hoca, 2026-10-29): aynı fotoğraf farklı ölçekte (yalnız boyut değişir, aynı tabanda).
// Havuz: eski büyük-küçük fotoğraflarının büyükleri + Renkler fotoğrafları + kelime fotoğrafları (beyaz zeminli).
// [kelime, resim adresi | null (kelime fotoğrafından bulunur)]
export const BK_NESNELER: [string, string | null][] = [
  ['ayakkabı', '/images/2301.webp'], ['ayı', '/images/2303.webp'], ['balon', '/images/2305.webp'], ['elma', '/images/2307.webp'],
  ['karpuz', '/images/2309.webp'], ['kupa', '/images/2311.webp'], ['kutu', '/images/2313.webp'], ['tencere', '/images/2315.webp'],
  ['top', '/images/2317.webp'], ['yastık', '/images/2320.webp'],
  ['araba', '/images/7101.webp'], ['çanta', '/images/7116.webp'], ['şişe', '/images/7163.webp'], ['tişört', '/images/7168.webp'],
  ['çizme', '/images/7125.webp'], ['şemsiye', '/images/7154.webp'],
  ['muz', null], ['portakal', null], ['armut', null], ['ördek', null],
];
export const bkSoru = (k: string, buyuk: boolean) => `Hangi ${k} ${buyuk ? 'büyük' : 'küçük'}?`;
export const bkDogru = (k: string, buyuk: boolean) => `Evet! Bu ${k} ${buyuk ? 'büyük' : 'küçük'}.`;
// Eski Büyük/Küçük sorularında etiket (Gökhan Hoca: "etiket kısmı değiştirilmeli"): büyük görsellerin kimlikleri
export const BUYUK_IDLER = new Set([2301, 2303, 2305, 2307, 2309, 2311, 2313, 2315, 2317, 2319, 2320]);
export const KUCUK_IDLER = new Set([2302, 2304, 2306, 2308, 2310, 2312, 2314, 2316, 2318, 2321]);
