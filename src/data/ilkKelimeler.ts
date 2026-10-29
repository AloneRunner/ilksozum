// Kelime Öğren sırası (Gökhan Hoca, 2026-10-29: meyvedeki çalışma bütün kategorilerde): çocuğun ilk öğrendiği,
// günlük hayatta en sık gördüğü kelimeler öne. Listede olmayanlar eski sırasıyla (resim veritabanı) arkadan gelir.
// Eskiden oyuncaklar "jeton", sebzeler "soğan" ile başlıyordu.
const ILK: string[] = [
  // meyveler, sebzeler, yiyecek, içecek
  'elma', 'muz', 'portakal', 'çilek', 'üzüm', 'karpuz', 'armut', 'mandalina', 'kiraz', 'kavun', 'şeftali', 'limon',
  'domates', 'havuç', 'salatalık', 'patates', 'biber', 'mısır', 'soğan', 'marul', 'bezelye', 'kabak', 'brokoli',
  'ekmek', 'peynir', 'yumurta', 'makarna', 'pilav', 'çorba', 'yoğurt', 'dondurma', 'pasta', 'bisküvi', 'çikolata', 'simit', 'kek', 'köfte', 'pizza',
  'su', 'süt', 'meyve suyu', 'ayran', 'limonata', 'çay',
  // oyuncaklar, taşıtlar
  'top', 'oyuncak araba', 'oyuncak bebek', 'oyuncak ayı', 'balon', 'yapboz', 'lego', 'bloklar', 'robot', 'uçurtma', 'salıncak', 'düdük',
  'araba', 'otobüs', 'okul otobüsü', 'tren', 'uçak', 'bisiklet', 'gemi', 'kamyon', 'motosiklet', 'helikopter', 'taksi', 'traktör', 'ambulans', 'itfaiye aracı', 'polis arabası',
  // hayvanlar
  'kedi', 'köpek', 'kuş', 'balık', 'inek', 'at', 'tavuk', 'ördek', 'koyun', 'tavşan', 'aslan', 'fil', 'maymun', 'ayı', 'kelebek', 'arı', 'fare', 'horoz', 'civciv', 'kurbağa', 'zürafa', 'penguen',
  // giysiler, vücut, aile
  'ayakkabı', 'çorap', 'şapka', 'tişört', 'pantolon', 'mont', 'elbise', 'pijama', 'çanta', 'bere', 'eldivenler', 'gözlük', 'terlik', 'kazak',
  'göz', 'gözler', 'burun', 'ağız', 'kulak', 'el', 'ayak', 'saç', 'diş', 'parmak', 'kol', 'bacak', 'karın',
  'anne', 'baba', 'bebek', 'kız kardeş', 'erkek kardeş', 'dede', 'nine', 'arkadaş',
  // ev, mutfak, okul
  'masa', 'sandalye', 'yatak', 'kapı', 'pencere', 'televizyon', 'koltuk', 'yastık', 'battaniye', 'telefon', 'saat', 'lamba', 'buzdolabı', 'tuvalet', 'lavabo', 'diş fırçası', 'sabun', 'havlu', 'anahtar', 'ayna',
  'kaşık', 'çatal', 'tabak', 'bardak', 'kase', 'tencere', 'bıçak',
  'kitap', 'kalem', 'defter', 'silgi', 'makas', 'boya kalemi', 'kağıt', 'yapıştırıcı', 'cetvel',
  // doğa, yerler, müzik, meslekler
  'güneş', 'ay', 'yıldız', 'bulut', 'yağmur', 'kar', 'ağaç', 'çiçek', 'deniz', 'gökkuşağı', 'taş', 'dağ',
  'ev', 'okul', 'park', 'çocuk parkı', 'kaydırak', 'market', 'hastane', 'havuz', 'plaj', 'oda',
  'davul', 'piyano', 'gitar', 'zil', 'tef', 'flüt',
  'doktor', 'öğretmen', 'polis', 'itfaiyeci', 'aşçı', 'hemşire', 'pilot', 'berber', 'postacı',
];
const SIRA = new Map(ILK.map((k, i) => [k, i]));

/** Bilinen ilk kelimeler önde (listedeki sırayla), kalanlar eski sırasında */
export const ilkKelimelerOnde = <T extends { kelime: string }>(l: T[]): T[] =>
  l.map((o, i) => ({ o, i, s: SIRA.get(o.kelime) ?? ILK.length + i })).sort((a, b) => a.s - b.s).map((x) => x.o);
