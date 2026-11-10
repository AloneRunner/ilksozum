// Gökhan Hoca'nın 2026-11-09 turu: Islak/Kuru, Sıcak/Soğuk, Acı/Tatlı, Gürültülü/Sessiz, Kırışık/Düz.
// Her çiftte aynı nesne, yalnız kavram değişir. a: ilk öğretilen yan, b: öteki yan.
// bekliyor: görseli Flow'dan henüz gelmedi; sesi hazır, oyunda çıkmaz (tools/gorsel-envanter/flow-kavram-kasim.md).
export interface Yan { url: string; soru: string; dogru: string; uyari?: string } // uyari: Tanı'da dokununca cümleden sonra (güvenlik)
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

// --- Miktar (Gökhan Hoca, 2026-11-09 22:00 notları)
// Tek / Çift: küpe yerine günlük nesneler; önce çift, sonra tek
const tc = (ad: string, a: number, b: number): CiftSet => ({
  ad,
  a: { url: im(a), soru: `Hangi resimde bir çift ${ad} var?`, dogru: `Evet! Burada bir çift ${ad} var.` },
  b: { url: im(b), soru: `Hangi resimde tek ${ad} var?`, dogru: `Evet! Burada tek ${ad} var.` },
});
export const TEK_CIFT: CiftSet[] = [
  tc('çorap', 6957, 6958), tc('eldiven', 6959, 6960), tc('ayakkabı', 6961, 6962), tc('spor ayakkabı', 6951, 6952),
  tc('çizme', 6955, 6956), tc('sandalet', 6967, 6968), tc('terlik', 6969, 6970), tc('paten', 6965, 6966),
];

// Bütün / Yarım / Çeyrek. kusbakisi: yukarıdan çekilmiş, parçalar daire maskesiyle kesildi (oran tam).
// tamOran: çeyreği gerçekten 1/4 görünenler; Çeyrek aşaması yalnız bunlarla (hoca: "parçalar gerçekten 1/2 ve 1/4 oranında olsun").
export type Kisim = 'bütün' | 'yarım' | 'çeyrek';
export interface Parcali { ad: string; bütün: string; yarım: string; çeyrek: string; kusbakisi?: boolean; tamOran?: boolean }
const pr = (ad: string, b: number, y: number, c: number, e: Partial<Parcali> = {}): Parcali => ({ ad, bütün: im(b), yarım: im(y), çeyrek: im(c), ...e });
export const PARCALI: Parcali[] = [
  pr('pizza', 2819, 2821, 2820, { kusbakisi: true, tamOran: true }), pr('pasta', 2816, 2818, 2817, { kusbakisi: true, tamOran: true }),
  pr('karpuz', 2810, 2812, 2811, { tamOran: true }), pr('ekmek', 2804, 2806, 2805, { tamOran: true }),
  pr('domates', 2801, 2803, 2802), pr('elma', 2807, 2809, 2808), pr('limon', 2813, 2815, 2814), pr('portakal', 2822, 2824, 2823),
];
export const parcaSoru = (ad: string, k: Kisim) => `Hangi ${ad} ${k}?`;
export const parcaDogru = (ad: string, k: Kisim) => `Evet! Bu ${ad} ${k}.`;

// Az / Çok: az 1-4, çok 8-15; soru kalıbı "Hangisinde çok elma var?"
export const AZ_COK_NESNE = ['elma', 'çilek', 'muz', 'portakal', 'armut', 'top', 'araba', 'balon', 'kalem', 'ördek'];
export const azCokSoru = (ad: string, k: 'az' | 'çok') => `Hangisinde ${k} ${ad} var?`;
export const azCokDogru = (ad: string, k: 'az' | 'çok') => `Evet! Burada ${k} ${ad} var.`;

// Kaç Tane Var?: el kadar nesneyi bul
export const KAC_NESNE = ['elma', 'top', 'araba', 'balon', 'kupa'];
export const KAC_SORU = 'Hangisinde bu kadar var?';
export const SAYI_YAZI = ['', 'bir', 'iki', 'üç', 'dört', 'beş'];
export const kacDogru = (n: number, ad: string) => `Evet! Burada ${SAYI_YAZI[n]} ${ad} var.`;

// --- Duyularımız (Gökhan Hoca, 2026-11-09): organ tanıma; her nesne tek duyuya bağlı. Sıra: göz, kulak, el, burun, dil.
export interface Organ { ad: string; baslik: string; url: string; goster: string; bu: string; eylem: string; cumle: string; nesneSoru: string; nesneler: string[]; sesler?: string[] }
const org = (ad: string, id: number, eylem: string, cumle: string, nesneSoru: string, nesneler: number[], sesler?: string[]): Organ => ({
  ad, baslik: buyuk(ad), url: im(id), goster: `${buyuk(ad)} hangisi?`, bu: `Evet! Bu ${ad}.`, eylem, cumle: `Evet! ${cumle}`, nesneSoru, nesneler: nesneler.map(im), sesler,
});
export const ORGANLAR: Organ[] = [
  org('göz', 6301, 'Hangisiyle görürüz?', 'Gözümüzle görürüz.', 'Bunu hangisiyle görürüz?', [8159, 8069, 8619, 8236]), // gökkuşağı, yıldız, ay, bulut
  org('kulak', 6302, 'Hangisiyle duyarız?', 'Kulağımızla duyarız.', '', [], ['davul', 'kedi', 'kopek', 'horoz', 'inek', 'aslan', 'esek']),
  org('el', 6305, 'Hangisiyle dokunuruz?', 'Elimizle dokunuruz.', 'Bunu hangisiyle hissederiz?', [3510, 6212, 3311, 2320]), // pamuk, tüy, sünger, yastık
  org('burun', 6303, 'Hangisiyle koku alırız?', 'Burnumuzla koku alırız.', 'Bunu hangisiyle koklarız?', [3809, 8076, 8057]), // gül, papatya, lale
  org('dil', 6304, 'Hangisiyle tat alırız?', 'Dilimizle tat alırız.', 'Bunu hangisiyle tadarız?', [2813, 3608, 4103, 8240]), // limon, dondurma, bal, lolipop
];
export const SES_SORU = 'Bu sesi hangisiyle duyarız?';

// --- Pürüzlü / Pürüzsüz ve Sivri / Küt (+Dikenli): Gökhan Hoca 2026-11-09; aynı nesne, yalnız doku ya da uç değişir
const pz = (ad: string, d: string): CiftSet => ({
  ad, a: { url: yeni(`puruzlu-${d}-a`), soru: `Hangi ${ad} pürüzlü?`, dogru: `Evet! Bu ${ad} pürüzlü. Elimize takılır.` },
  b: { url: yeni(`puruzlu-${d}-b`), soru: `Hangi ${ad} pürüzsüz?`, dogru: `Evet! Bu ${ad} pürüzsüz. Düzdür.` },
});
export const PURUZLU: CiftSet[] = [pz('taş', 'tas'), pz('tahta', 'tahta'), pz('karton', 'karton'), pz('tuğla', 'tugla'), pz('kaşık', 'kasik'), pz('saksı', 'saksi'), pz('sabun', 'sabun')];
export const SIVRI_UYARI = 'Sivri şeyler batar, dikkat ederiz.';
const uc = (ad: string, u: [string, string]): CiftSet => ({
  ad, a: { url: u[0], soru: `Hangi ${ad} ucu sivri?`, dogru: `Evet! Bu ${ad} ucu sivri.`, uyari: SIVRI_UYARI }, b: { url: u[1], soru: `Hangi ${ad} ucu küt?`, dogru: `Evet! Bu ${ad} ucu küt.` },
});
const ucYeni = (d: string): [string, string] => [yeni(`sivri-${d}-a`), yeni(`sivri-${d}-b`)];
export const SIVRI_KUT: CiftSet[] = [uc('kalemin', ucYeni('kalem')), uc('çubuğun', ucYeni('cubuk')), uc('havucun', ucYeni('havuc')), uc('makasın', [im(5818), im(5817)]), uc('çivinin', ucYeni('civi')), uc('boya kaleminin', ucYeni('boya')), uc('kazığın', ucYeni('kazik'))];
export const DIKENLI_UYARI = 'Dikenli şeylere dikkat ederiz.';
const dk = (ad: string, a: string, b: string): CiftSet => ({
  ad, a: { url: a, soru: `Hangi ${ad} dikenli?`, dogru: `Evet! Bu ${ad} dikenli. ${DIKENLI_UYARI}` }, b: { url: b, soru: `Hangi ${ad} dikensiz?`, dogru: `Evet! Bu ${ad} dikensiz.` },
});
export const DIKENLI: CiftSet[] = [dk('gül dalı', yeni('dikenli-gul-a'), yeni('dikenli-gul-b')), dk('kaktüs', yeni('dikenli-kaktus-a'), yeni('dikenli-kaktus-b')), dk('kestane', im(3811), im(3812)), dk('top', yeni('dikenli-top-a'), yeni('dikenli-top-b')), dk('kaktüs', yeni('dikenli-kaktus2-a'), yeni('dikenli-kaktus2-b')), dk('balık', yeni('dikenli-balik-a'), yeni('dikenli-balik-b'))];

// --- Konum (Gökhan Hoca, 2026-10-29 18:45-18:49 notları) ve Dolu/Boş, Kalabalık/Tenha
const ozYan = (url: string, soru: string, dogru: string): Yan => ({ url, soru, dogru });
const ikiKalip = (ad: string, a: number, b: number, kA: string, kB: string): CiftSet => ({ ad, a: yan(im(a), ad, kA), b: yan(im(b), ad, kB) });
export const DOLU_BOS: CiftSet[] = [
  ikiKalip('akvaryum', 2602, 2601, 'dolu', 'boş'), ikiKalip('kova', 2612, 2611, 'dolu', 'boş'),
  ikiKalip('bardak', 2604, 2603, 'dolu', 'boş'), ikiKalip('kalemlik', 2606, 2605, 'dolu', 'boş'), ikiKalip('kavanoz', 2608, 2607, 'dolu', 'boş'), ikiKalip('yumurta kolisi', 2610, 2609, 'dolu', 'boş'),
  ikiKalip('kumbara', 2614, 2613, 'dolu', 'boş'), ikiKalip('oyuncak kutusu', 2616, 2615, 'dolu', 'boş'), ikiKalip('sepet', 2618, 2617, 'dolu', 'boş'), ikiKalip('tabak', 2620, 2619, 'dolu', 'boş'),
];
export const KALABALIK_TENHA: CiftSet[] = [
  ikiKalip('havuz', 4601, 4602, 'kalabalık', 'tenha'), ikiKalip('market', 4605, 4606, 'kalabalık', 'tenha'), ikiKalip('otobüs', 4607, 4608, 'kalabalık', 'tenha'), ikiKalip('park', 4611, 4612, 'kalabalık', 'tenha'),
  ikiKalip('plaj', 4615, 4616, 'kalabalık', 'tenha'), ikiKalip('sinema salonu', 4617, 4618, 'kalabalık', 'tenha'), ikiKalip('sokak', 4619, 4620, 'kalabalık', 'tenha'),
];
const icd = (ad: string, yer: string, a: number, b: number): CiftSet => ({
  ad, a: ozYan(im(a), `Hangi ${ad} ${yer} içinde?`, `Evet! Bu ${ad} ${yer} içinde.`), b: ozYan(im(b), `Hangi ${ad} ${yer} dışında?`, `Evet! Bu ${ad} ${yer} dışında.`),
});
export const IC_DIS: CiftSet[] = [
  icd('kuş', 'kafesin', 2099, 2098), icd('bebek', 'beşiğin', 2111, 2110),
  icd('top', 'kutunun', 2027, 2026), icd('ayı', 'sepetin', 2039, 2038), icd('araba', 'kovanın', 2051, 2050), icd('elma', 'kasenin', 2063, 2062), icd('kalem', 'kalemliğin', 2075, 2074), icd('kedi', 'yatağın', 2087, 2086),
];
const yy = (ad: string, a: number, b: number): CiftSet => ({
  ad, a: ozYan(im(a), `Hangi resimde ${ad} yan yana?`, `Evet! Burada ${ad} yan yana.`), b: ozYan(im(b), `Hangi resimde ${ad} karşı karşıya?`, `Evet! Burada ${ad} karşı karşıya.`),
});
export const YAN_YANA: CiftSet[] = [yy('kediler', 5612, 5611), yy('ayılar', 5606, 5605), yy('ördekler', 5618, 5617), yy('kuşlar', 5616, 5615), yy('atlar', 5604, 5603), yy('çocuklar', 5608, 5607), yy('arabalar', 5602, 5601)]; // yalnız önü belli olanlar
const ss = (ad: string, sag: number, sol: number): CiftSet => ({
  ad, a: ozYan(im(sol), `Hangi ${ad} sola bakıyor?`, `Evet! Bu ${ad} sola bakıyor.`), b: ozYan(im(sag), `Hangi ${ad} sağa bakıyor?`, `Evet! Bu ${ad} sağa bakıyor.`),
});
export const SAG_SOL: CiftSet[] = [ss('at', 5201, 5202), ss('balık', 5205, 5206), ss('horoz', 5211, 5212), ss('inek', 5213, 5214), ss('kaplumbağa', 5215, 5216), ss('kirpi', 5217, 5218)]; // yalnız yüzü olanlar
export interface AraSet { ad: string; soru: string; dogru: string; orta: string; yan: string }
const ara = (ad: string, iki: string, cogul: string, o: number, y: number): AraSet => ({ ad, soru: `Hangi ${ad} iki ${iki} arasında?`, dogru: `Evet! Bu ${ad} ${cogul} arasında.`, orta: im(o), yan: im(y) });
export const ARASINDA: AraSet[] = [
  ara('top', 'kutunun', 'kutuların', 2023, 2022), ara('ayı', 'sepetin', 'sepetlerin', 2035, 2034), ara('araba', 'kovanın', 'kovaların', 2047, 2046), ara('elma', 'kasenin', 'kaselerin', 2059, 2058),
  ara('kalem', 'kalemliğin', 'kalemliklerin', 2071, 2070), ara('kedi', 'yatağın', 'yatakların', 2083, 2082), ara('kuş', 'kafesin', 'kafeslerin', 2095, 2094),
];
// Yakın / Uzak: referansa göre, yandan; nesne iki resimde aynı boyutta. Perspektifli fotoğraflar ileri aşamada ("bize yakın").
export interface YakinYer { ad: string; dosya: string; e: string; c: string }
export const YAKIN_YER: YakinYer[] = [{ ad: 'kutu', dosya: 'kutu', e: 'kutuya', c: 'kutudan' }, { ad: 'sepet', dosya: 'sepet', e: 'sepete', c: 'sepetten' }, { ad: 'kova', dosya: 'kova', e: 'kovaya', c: 'kovadan' }];
export const YAKIN_NESNE = [{ ad: 'top', dosya: 'top' }, { ad: 'araba', dosya: 'araba' }, { ad: 'ayı', dosya: 'ayi' }, { ad: 'kedi', dosya: 'kedi' }];
export const yakinSoru = (ad: string, y: YakinYer, yakin: boolean) => (yakin ? `Hangi ${ad} ${y.e} yakın?` : `Hangi ${ad} ${y.c} uzak?`);
export const yakinDogru = (ad: string, y: YakinYer, yakin: boolean) => (yakin ? `Evet! Bu ${ad} ${y.e} yakın.` : `Evet! Bu ${ad} ${y.c} uzak.`);
export const BIZE_YAKIN: CiftSet[] = [
  ikiKalip('ağaç', 5502, 5501, 'yakın', 'uzak'), ikiKalip('araba', 5504, 5503, 'yakın', 'uzak'), ikiKalip('balon', 5506, 5505, 'yakın', 'uzak'), ikiKalip('bisiklet', 5508, 5507, 'yakın', 'uzak'), ikiKalip('ev', 5512, 5511, 'yakın', 'uzak'),
  ikiKalip('inek', 5514, 5513, 'yakın', 'uzak'), ikiKalip('köpek', 5516, 5515, 'yakın', 'uzak'), ikiKalip('tekne', 5518, 5517, 'yakın', 'uzak'), ikiKalip('top', 5520, 5519, 'yakın', 'uzak'),
];

// --- Kırışık / Düz (hoca: "düzgün" yerine "düz")
const kd = (ad: string, a: number, b: number): CiftSet => ({ ad, a: yan(im(a), ad, 'kırışık'), b: yan(im(b), ad, 'düz') });
const kdYeni = (ad: string, d: string): CiftSet => ({ ad, a: yan(yeni(`kirisik-${d}-a`), ad, 'kırışık'), b: yan(yeni(`kirisik-${d}-b`), ad, 'düz') });
export const KIRISIK_DUZ: CiftSet[] = [
  kd('gömlek', 4706, 4705), kd('elbise', 4702, 4701), kd('etek', 4704, 4703), kd('kâğıt', 4708, 4707), kd('masa örtüsü', 4710, 4709),
  kd('yatak örtüsü', 4712, 4711), kd('pantolon', 4714, 4713), kd('peçete', 4716, 4715), kd('perde', 4718, 4717), kd('tişört', 4720, 4719),
  kdYeni('yastık', 'yastik'), kdYeni('ceket', 'ceket'), kdYeni('havlu', 'havlu'),
];
