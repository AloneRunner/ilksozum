// Gökhan Hoca'nın 2026-11-09 turu: Islak/Kuru, Sıcak/Soğuk, Acı/Tatlı, Gürültülü/Sessiz, Kırışık/Düz.
// Her çiftte aynı nesne, yalnız kavram değişir. a: ilk öğretilen yan, b: öteki yan.
// bekliyor: görseli Flow'dan henüz gelmedi; sesi hazır, oyunda çıkmaz (tools/gorsel-envanter/flow-kavram-kasim.md).
export interface Yan { url: string; soru: string; dogru: string }
export interface CiftSet { ad: string; a: Yan; b: Yan; ses?: string; bekliyor?: boolean }

const im = (id: number) => `/images/${id}.webp`;
const yeni = (dosya: string) => `/images/ozel/cift/${dosya}.webp`;
const buyuk = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);
export const taniSoz = (dogru: string) => dogru.replace(/^Evet! /, '');
export const hazir = (l: CiftSet[]) => l.filter((s) => !s.bekliyor);

// "Hangi çorap ıslak?" / "Evet! Bu çorap ıslak."
const yan = (url: string, ad: string, k: string): Yan => ({ url, soru: `Hangi ${ad} ${k}?`, dogru: `Evet! Bu ${ad} ${k}.` });

// --- Islak / Kuru
const ik = (ad: string, a: number, b: number): CiftSet => ({ ad, a: yan(im(a), ad, 'ıslak'), b: yan(im(b), ad, 'kuru') });
const ikYeni = (ad: string, d: string): CiftSet => ({ ad, a: yan(yeni(`islak-${d}-a`), ad, 'ıslak'), b: yan(yeni(`islak-${d}-b`), ad, 'kuru') });
export const ISLAK_KURU: CiftSet[] = [
  ik('çorap', 3301, 3302), ik('havlu', 3303, 3304), ik('kum', 3305, 3306), ik('şemsiye', 3309, 3019), ik('sünger', 3310, 3311),
  ik('tişört', 3312, 3313), ik('toprak', 3314, 3315), ik('yaprak', 3316, 3317), ik('yer', 3318, 3319),
  { ad: 'saç', a: { url: im(3307), soru: 'Hangi çocuğun saçı ıslak?', dogru: 'Evet! Bu saçlar ıslak.' }, b: { url: im(3308), soru: 'Hangi çocuğun saçı kuru?', dogru: 'Evet! Bu saçlar kuru.' } },
  ikYeni('oyuncak ayı', 'ayi'), ikYeni('ayakkabı', 'ayakkabi'), ikYeni('kâğıt', 'kagit'), ikYeni('mont', 'mont'),
];

// --- Sıcak / Soğuk
const nesne = (sicak: string, a: number, soguk: string, b: number): CiftSet => ({
  ad: sicak,
  a: { url: im(a), soru: 'Sıcak olan hangisi?', dogru: `Evet! ${buyuk(sicak)} sıcaktır.` },
  b: { url: im(b), soru: 'Soğuk olan hangisi?', dogru: `Evet! ${buyuk(soguk)} soğuktur.` },
});
const ssYeni = (ad: string, d: string): CiftSet => ({ ad, a: yan(yeni(`sicak-${d}-a`), ad, 'sıcak'), b: yan(yeni(`sicak-${d}-b`), ad, 'soğuk') });
export const SICAK_SOGUK: CiftSet[] = [
  { ad: 'kupa', a: { url: im(3613), soru: 'Hangi kupa sıcak?', dogru: 'Evet! Bu kupadaki içecek sıcak.' }, b: { url: im(3614), soru: 'Hangi kupa soğuk?', dogru: 'Evet! Bu kupadaki içecek soğuk.' } },
  { ad: 'süt', a: yan(im(3617), 'süt', 'sıcak'), b: yan(im(3618), 'süt', 'soğuk') },
  ssYeni('çay', 'cay'), ssYeni('su', 'su'), ssYeni('çorba', 'corba'), ssYeni('tencere', 'tencere'), ssYeni('ekmek', 'ekmek'),
  nesne('ateş', 3601, 'kardan adam', 3602), nesne('çaydanlık', 3603, 'buzlu su', 3604), nesne('sıcak çikolata', 3605, 'limonata', 3606),
  nesne('çorba', 3607, 'dondurma', 3608), nesne('soba', 3615, 'buzlu pencere', 3616), nesne('ütü', 3619, 'buz', 3620),
];
const hava = (a: string, b: string): CiftSet => ({
  ad: 'hava',
  a: { url: a, soru: 'Hangi resimde hava sıcak?', dogru: 'Evet! Bu hava sıcak.' }, b: { url: b, soru: 'Hangi resimde hava soğuk?', dogru: 'Evet! Bu hava soğuk.' },
});
export const HAVA_SICAK_SOGUK: CiftSet[] = [
  hava(im(3611), im(3612)),
  // Mevsimler etkinliğinin yaz ve kış resimleri
  hava('/images/ozel/mevsim/yaz-agac.webp', '/images/ozel/mevsim/kis-agac.webp'),
  hava('/images/ozel/mevsim/yaz-cocuk.webp', '/images/ozel/mevsim/kis-cocuk.webp'),
  ...['ev', 'park', 'sokak'].map((d) => hava(yeni(`hava-${d}-a`), yeni(`hava-${d}-b`))),
];
// Güvenlik aşaması: sıcak nesne ile güvenli oyuncak; "Hangisine dokunmayız?"
export const DOKUNMA_SORU = 'Hangisine dokunmayız?';
export const DOKUNMA_KURAL = 'Sıcak şeylere dokunmayız.';
export const DOKUNMA_SICAK: { ad: string; url: string }[] = [
  { ad: 'soba', url: im(3615) }, { ad: 'ütü', url: im(3619) }, { ad: 'ateş', url: im(3601) }, { ad: 'çaydanlık', url: im(3603) }, { ad: 'çorba', url: im(3607) },
];
export const DOKUNMA_GUVENLI = ['ayi', 'top', 'araba', 'kutu'].map((d) => `/images/ozel/kesik/${d}.webp`);
export const dokunmaDogru = (ad: string) => `Evet! ${buyuk(ad)} sıcak. ${DOKUNMA_KURAL}`;

// --- Acı / Tatlı: tatlı-ekşi ve tatlı-acı ayrı aşamalar. Net olmayan acı sos ve hardal çalışmaya alınmadı.
export type Tat = 'tatlı' | 'ekşi' | 'acı';
export interface Yiyecek { ad: string; url: string }
export const TATLAR: Record<Tat, Yiyecek[]> = {
  'tatlı': [['dondurma', 3608], ['bal', 4103], ['çilek', 4105], ['üzüm', 4107], ['lokum', 3506], ['pasta', 2816], ['muz', 3508], ['çikolata', 4112], ['karpuz', 2810], ['şeker', 4115]].map(([ad, id]) => ({ ad: ad as string, url: im(id as number) })),
  'ekşi': [['limon', 4109], ['yeşil erik', 4104], ['greyfurt', 4106], ['turşu', 4114], ['vişne', 8294]].map(([ad, id]) => ({ ad: ad as string, url: im(id as number) })),
  'acı': [['acı biber', 4102], ['sivri biber', 4110], ['soğan', 4111], ['turp', 4113], ['sarımsak', 8943]].map(([ad, id]) => ({ ad: ad as string, url: im(id as number) })),
};
export const tatSoru = (t: Tat) => `${buyuk(t)} olan hangisi?`;
const TAT_EK: Record<Tat, string> = { 'tatlı': 'tatlıdır', 'ekşi': 'ekşidir', 'acı': 'acıdır' };
export const tatDogru = (ad: string, t: Tat) => `Evet! ${buyuk(ad)} ${TAT_EK[t]}.`;

// --- Gürültülü / Sessiz: ses = public/audio/gercek/<ses>.mp3 (gürültülü yanda çalar; sessiz yanda ortak, çok kısık ses)
export const SES_CIKARIYOR = 'Ses çıkarıyor.', SES_CIKARMIYOR = 'Ses çıkarmıyor.';
const gs = (ad: string, a: number, b: number, ses: string): CiftSet => ({
  ad, ses,
  a: { url: im(a), soru: `Hangi ${ad} gürültülü?`, dogru: `Evet! Bu ${ad} gürültülü. ${SES_CIKARIYOR}` },
  b: { url: im(b), soru: `Hangi ${ad} sessiz?`, dogru: `Evet! Bu ${ad} sessiz. ${SES_CIKARMIYOR}` },
});
export const GURULTULU_SESSIZ: CiftSet[] = [
  gs('aslan', 4201, 4202, 'aslan'), gs('bebek', 4203, 4204, 'bebek'), gs('çocuk', 4205, 4206, 'davul'), gs('eşek', 4207, 4208, 'esek'), gs('horoz', 4209, 4210, 'horoz'),
  gs('inek', 4211, 4212, 'inek'), gs('kedi', 4213, 4214, 'kedi'), gs('köpek', 4215, 4216, 'kopek'), gs('çocuk', 4217, 4218, 'tencere'), gs('sınıf', 4219, 4220, 'sinif'),
];
export const SES_DOSYALARI: [string, string][] = [
  ['aslan', 'a single short lion roar, close, clean, no background'],
  ['bebek', 'a baby crying loudly for two seconds, clean, no background'],
  ['davul', 'a child hitting a small toy drum quickly, clean, no background'],
  ['esek', 'a single donkey braying, hee-haw, clean, no background'],
  ['horoz', 'a single rooster crowing, clean, no background'],
  ['inek', 'a single cow mooing, clean, no background'],
  ['kedi', 'a single cat meowing loudly, clean, no background'],
  ['kopek', 'a dog barking three times, clean, no background'],
  ['tencere', 'a metal pot being banged with a spoon, a few hits, clean, no background'],
  ['sinif', 'a noisy classroom with many children shouting and playing'],
  ['sessiz', 'very soft quiet breathing of someone sleeping, almost silent, calm'],
];

// --- Kırışık / Düz (hoca: "düzgün" yerine "düz")
const kd = (ad: string, a: number, b: number): CiftSet => ({ ad, a: yan(im(a), ad, 'kırışık'), b: yan(im(b), ad, 'düz') });
const kdYeni = (ad: string, d: string, bekliyor?: boolean): CiftSet => ({ ad, a: yan(yeni(`kirisik-${d}-a`), ad, 'kırışık'), b: yan(yeni(`kirisik-${d}-b`), ad, 'düz'), bekliyor });
export const KIRISIK_DUZ: CiftSet[] = [
  kd('gömlek', 4706, 4705), kd('elbise', 4702, 4701), kd('etek', 4704, 4703), kd('kâğıt', 4708, 4707), kd('masa örtüsü', 4710, 4709),
  kd('yatak örtüsü', 4712, 4711), kd('pantolon', 4714, 4713), kd('peçete', 4716, 4715), kd('perde', 4718, 4717), kd('tişört', 4720, 4719),
  kdYeni('yastık', 'yastik'), kdYeni('ceket', 'ceket', true), kdYeni('havlu', 'havlu', true),
];
