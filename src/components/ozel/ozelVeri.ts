// Özel eğitim etkinlikleri (Kaan, 2026-10-29; öneriler: özel eğitimciler, MEB otizm programı).
// Görseller: public/images/ozel/<klasör>/ (tools/gorsel-envanter/ozel-isle.mjs, promptlar flow-ozel-egitim-2.md).
// Fotoğraf: berber, kaydırak, selam, el yıkama. Çizgi film: geri kalanı (fotoğrafta çocuklu kareler filtreye takıldı).
const g = (yol: string) => `/images/ozel/${yol}.webp`;

// --- Sosyal öyküler: birinci ağızdan, kısa cümleler (Carol Gray tarzı) ---
export interface Oyku { id: string; emoji: string; ad: string; sayfalar: { url: string; yazi: string }[] }
export const OYKULER: Oyku[] = [
  { id: 'berber', emoji: '💈', ad: 'Berbere Gidiyorum', sayfalar: [
    { url: g('sosyal-oyku/berber-1'), yazi: 'Bugün babamla berbere gidiyorum. Berbere merhaba derim.' },
    { url: g('sosyal-oyku/berber-2'), yazi: 'Sıramı beklerim. Beklerken oyuncak arabamla oynarım.' },
    { url: g('sosyal-oyku/berber-3'), yazi: 'Sıra bana gelince koltuğa otururum. Berber boynuma önlük takar.' },
    { url: g('sosyal-oyku/berber-4'), yazi: 'Berber saçımı makasla keser. Makas çıt çıt ses çıkarır. Kıpırdamadan otururum.' },
    { url: g('sosyal-oyku/berber-5'), yazi: 'Aynaya bakarım. Saçım kısacık oldu. Çok yakıştı!' },
  ] },
  { id: 'doktor', emoji: '🩺', ad: 'Doktora Gidiyorum', sayfalar: [
    { url: g('sosyal-oyku/doktor-1'), yazi: 'Bugün annemle doktora geldik. Kitap okuyarak sıramızı bekleriz.' },
    { url: g('sosyal-oyku/doktor-2'), yazi: 'Doktor kapıyı açar ve merhaba der. Ben de el sallarım.' },
    { url: g('sosyal-oyku/doktor-3'), yazi: 'Annemin kucağına otururum. Doktor bana nasıl olduğumu sorar.' },
    { url: g('sosyal-oyku/doktor-4'), yazi: 'Doktor önce ayıcığı dinler. Sonra beni de dinler. Hiç acımaz.' },
    { url: g('sosyal-oyku/doktor-5'), yazi: 'Doktor bana bir yıldız verir. Teşekkür ederim ve hoşça kal derim.' },
  ] },
  { id: 'kaydirak', emoji: '🛝', ad: 'Sıra Beklerim', sayfalar: [
    { url: g('sosyal-oyku/kaydirak-1'), yazi: 'Parkta kaydıraktan kaymak istiyorum. Kaydırağın önünde çocuklar var.' },
    { url: g('sosyal-oyku/kaydirak-2'), yazi: 'Sıranın en sonuna geçerim ve beklerim.' },
    { url: g('sosyal-oyku/kaydirak-3'), yazi: 'Önümdeki çocuk merdivene çıkar. Şimdi sıra bende.' },
    { url: g('sosyal-oyku/kaydirak-4'), yazi: 'Merdivene tutunarak dikkatlice çıkarım.' },
    { url: g('sosyal-oyku/kaydirak-5'), yazi: 'Kaydıraktan kayarım. Sıra bekleyince herkes oynayabilir.' },
  ] },
  { id: 'market', emoji: '🛒', ad: 'Markete Gidiyorum', sayfalar: [
    { url: g('sosyal-oyku/market-1'), yazi: 'Babamla markete gidiyoruz. Babam alışveriş arabasını iter.' },
    { url: g('sosyal-oyku/market-2'), yazi: 'Elmayı ben seçerim ve arabaya koyarım.' },
    { url: g('sosyal-oyku/market-3'), yazi: 'Kurabiye istiyorum. Babam "Bugün olmaz." der. Üzülsem de sakin kalırım.' },
    { url: g('sosyal-oyku/market-4'), yazi: 'Kasada sıramızı bekleriz.' },
    { url: g('sosyal-oyku/market-5'), yazi: 'Alışveriş bitti. Poşeti taşıyarak babama yardım ederim.' },
  ] },
  { id: 'selam', emoji: '👋', ad: 'Arkadaşımla Oynarım', sayfalar: [
    { url: g('sosyal-oyku/selam-1'), yazi: 'Sabah okula gelince öğretmenime günaydın derim.' },
    { url: g('sosyal-oyku/selam-2'), yazi: 'Bir arkadaşım bloklarla oynuyor.' },
    { url: g('sosyal-oyku/selam-3'), yazi: 'Yanına giderim ve "Ben de oynayabilir miyim?" diye sorarım.' },
    { url: g('sosyal-oyku/selam-4'), yazi: 'Birlikte kocaman bir kule yaparız.' },
    { url: g('sosyal-oyku/selam-5'), yazi: 'Kule bitince çak yaparız. Arkadaşımla oynamak çok güzel!' },
  ] },
];

// --- Öz bakım adımları. sirala: false olan adım sıralama oyununa girmez (aynı resim iki kez) ---
export interface Rutin { id: string; emoji: string; ad: string; adimlar: { url: string; yazi: string; soz: string; sirala?: false }[] }
export const RUTINLER: Rutin[] = [
  { id: 'el', emoji: '🧼', ad: 'El Yıkama', adimlar: [
    { url: g('oz-bakim/el-1'), yazi: 'Musluğu aç', soz: 'Musluğu aç.' },
    { url: g('oz-bakim/el-2'), yazi: 'Ellerini ıslat', soz: 'Ellerini ıslat.' },
    { url: g('oz-bakim/el-3'), yazi: 'Sabun al', soz: 'Sabun al.' },
    { url: g('oz-bakim/el-4'), yazi: 'Ellerini ovala', soz: 'Ellerini ovala.' },
    { url: g('oz-bakim/el-2'), yazi: 'Ellerini durula', soz: 'Ellerini durula.', sirala: false },
    { url: g('oz-bakim/el-6'), yazi: 'Ellerini kurula', soz: 'Ellerini havluyla kurula.' },
  ] },
  { id: 'dis', emoji: '🪥', ad: 'Diş Fırçalama', adimlar: [
    { url: g('oz-bakim/dis-1'), yazi: 'Fırçanı al', soz: 'Fırçanı ve macununu al.' },
    { url: g('oz-bakim/dis-2'), yazi: 'Macun sür', soz: 'Fırçaya biraz macun sür.' },
    { url: g('oz-bakim/dis-3'), yazi: 'Dişlerini fırçala', soz: 'Dişlerini fırçala.' },
    { url: g('oz-bakim/dis-4'), yazi: 'Ağzını çalkala', soz: 'Ağzını suyla çalkala.' },
    { url: g('oz-bakim/dis-5'), yazi: 'Aynaya bak', soz: 'Aynaya bak. Dişlerin tertemiz!' },
  ] },
  { id: 'giyinme', emoji: '🧥', ad: 'Dışarı Çıkmaya Hazırlan', adimlar: [
    { url: g('oz-bakim/giyinme-1'), yazi: 'Eşyalarını hazırla', soz: 'Dışarı çıkıyoruz. Eşyalarını hazırla.' },
    { url: g('oz-bakim/giyinme-2'), yazi: 'Ayakkabını giy', soz: 'Ayakkabılarını giy.' },
    { url: g('oz-bakim/giyinme-3'), yazi: 'Montunu giy', soz: 'Montunu giy, fermuarını çek.' },
    { url: g('oz-bakim/giyinme-4'), yazi: 'Bereni tak', soz: 'Bereni tak.' },
    { url: g('oz-bakim/giyinme-5'), yazi: 'Çantanı tak', soz: 'Çantanı tak. Hazırsın!' },
  ] },
];

// --- Durumdan duygu ---
export type Duygu = 'mutlu' | 'uzgun' | 'korkmus' | 'kizgin' | 'sasirmis';
export const DUYGULAR: Record<Duygu, { emoji: string; ad: string }> = {
  mutlu: { emoji: '😊', ad: 'Mutlu' },
  uzgun: { emoji: '😢', ad: 'Üzgün' },
  korkmus: { emoji: '😨', ad: 'Korkmuş' },
  kizgin: { emoji: '😠', ad: 'Kızgın' },
  sasirmis: { emoji: '😲', ad: 'Şaşırmış' },
};
export const DURUMLAR: { url: string; durum: string; duygu: Duygu; dogru: string }[] = [
  { url: g('durum-duygu/1'), durum: 'Dondurması yere düştü.', duygu: 'uzgun', dogru: 'Evet, üzgün. Dondurması düştü.' },
  { url: g('durum-duygu/2'), durum: 'Hediyesini açıyor.', duygu: 'mutlu', dogru: 'Evet, mutlu. Hediyesini açıyor.' },
  { url: g('durum-duygu/3'), durum: 'Köpek ona havlıyor.', duygu: 'korkmus', dogru: 'Evet, korkmuş. Köpek ona havlıyor.' },
  { url: g('durum-duygu/4'), durum: 'Kulesi yıkıldı.', duygu: 'uzgun', dogru: 'Evet, üzgün. Kulesi yıkıldı.' },
  { url: g('durum-duygu/5'), durum: 'Doğum günü pastasını görüyor.', duygu: 'mutlu', dogru: 'Evet, mutlu. Doğum günü pastası var.' },
  { url: g('durum-duygu/6'), durum: 'Yeşil kazaklı çocuğun arabasını alıyorlar.', duygu: 'kizgin', dogru: 'Evet, kızgın. Arabasını alıyorlar.' },
  { url: g('durum-duygu/7'), durum: 'Oda karanlık.', duygu: 'korkmus', dogru: 'Evet, korkmuş. Oda karanlık.' },
  { url: g('durum-duygu/8'), durum: 'Kutudan oyuncak fırladı.', duygu: 'sasirmis', dogru: 'Evet, şaşırmış. Kutudan oyuncak fırladı.' },
];

// --- Zamirler: iki grup, şıklar aynı gruptan ---
export interface Zamir { id: string; ad: string; url: string; soz: string }
export const ZAMIR_GRUPLARI: Zamir[][] = [
  [
    { id: 'ben', ad: 'Ben', url: g('zamir/ben'), soz: 'Ben. Çocuk kendini gösteriyor.' },
    { id: 'sen', ad: 'Sen', url: g('zamir/sen'), soz: 'Sen. Çocuk seni gösteriyor.' },
    { id: 'o', ad: 'O', url: g('zamir/o'), soz: 'O. Çocuk kadını gösteriyor.' },
  ],
  [
    { id: 'benim', ad: 'Benim', url: g('zamir/benim'), soz: 'Benim topum. Top çocuğun.' },
    { id: 'senin', ad: 'Senin', url: g('zamir/senin'), soz: 'Senin topun. Çocuk topu sana veriyor.' },
    { id: 'onun', ad: 'Onun', url: g('zamir/onun'), soz: 'Onun topu. Top kadının.' },
  ],
];
// Sorular çocuğun ağzından: "Çocuk 'ben' diyor. Hangi resim?"
export const zamirSoru = (z: Zamir) => `Çocuk "${z.ad.toLocaleLowerCase('tr-TR')}" diyor. Hangi resim?`;

// --- Mevsimler ---
export type Mevsim = 'ilkbahar' | 'yaz' | 'sonbahar' | 'kis';
export const MEVSIMLER: { id: Mevsim; ad: string; emoji: string; agac: string; cocuk: string; agacSoz: string; cocukSoz: string }[] = [
  { id: 'ilkbahar', ad: 'İlkbahar', emoji: '🌸', agac: g('mevsim/ilkbahar-agac'), cocuk: g('mevsim/ilkbahar-cocuk'),
    agacSoz: 'İlkbahar. Ağaç çiçek açar.', cocukSoz: 'İlkbaharda yağmur yağar. Şemsiyemizi alırız.' },
  { id: 'yaz', ad: 'Yaz', emoji: '☀️', agac: g('mevsim/yaz-agac'), cocuk: g('mevsim/yaz-cocuk'),
    agacSoz: 'Yaz. Ağaçta elmalar olur.', cocukSoz: 'Yazın hava sıcaktır. Denize gideriz.' },
  { id: 'sonbahar', ad: 'Sonbahar', emoji: '🍂', agac: g('mevsim/sonbahar-agac'), cocuk: g('mevsim/sonbahar-cocuk'),
    agacSoz: 'Sonbahar. Yapraklar sararır ve düşer.', cocukSoz: 'Sonbaharda yapraklar yere düşer.' },
  { id: 'kis', ad: 'Kış', emoji: '❄️', agac: g('mevsim/kis-agac'), cocuk: g('mevsim/kis-cocuk'),
    agacSoz: 'Kış. Kar yağar, ağacın yaprağı yoktur.', cocukSoz: 'Kışın hava soğuktur. Mont, bere ve eldiven giyeriz.' },
];

// --- Saklanan kedi: x, y, r resmin kenarına oranla (0-1) ---
export const KEDILER: { url: string; x: number; y: number; r: number; yer: string }[] = [
  { url: g('saklanan/1'), x: 0.50, y: 0.75, r: 0.09, yer: 'Kedi masanın altında.' },
  { url: g('saklanan/2'), x: 0.60, y: 0.66, r: 0.08, yer: 'Kedi saksının arkasında.' },
  { url: g('saklanan/3'), x: 0.28, y: 0.18, r: 0.09, yer: 'Kedi buzdolabının üstünde.' },
  { url: g('saklanan/4'), x: 0.54, y: 0.63, r: 0.07, yer: 'Kedi battaniyenin altında.' },
  { url: g('saklanan/5'), x: 0.69, y: 0.63, r: 0.07, yer: 'Kedi kaydırağın arkasında.' },
  { url: g('saklanan/6'), x: 0.56, y: 0.51, r: 0.09, yer: 'Kedi küvetin içinde.' },
  { url: g('saklanan/7'), x: 0.49, y: 0.52, r: 0.08, yer: 'Kedi kitapların arasında.' },
  { url: g('saklanan/8'), x: 0.43, y: 0.75, r: 0.07, yer: 'Kedi bankın altında.' },
];
