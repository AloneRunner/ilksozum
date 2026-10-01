// Çift kavramları (geniş/dar, büyük/küçük...) için görsel listesi ve soru dosyası üretir.
// Çalıştır: node tools/gorsel-envanter/uret-cift.mjs && node tools/gorsel-envanter/gorsel-isle.mjs
//
// Klasör düzeni: gorsel-ham/<klasor>/<nesne>-<a>.jpg ve <nesne>-<b>.jpg (ör. yol-genis.jpg, yol-dar.jpg).
// İkisi de olan her nesne bir çift olur ve 2 soru üretir. Tek kalan dosyalar (ör. kaydirak-orta.jpg)
// sadece görsel olarak kaydedilir (göreceli sorular için).
// Yeni kavram eklemek: KAVRAMLAR dizisine bir kayıt ekle (id aralığı çakışmasın).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const RAW = path.join(ROOT, 'gorsel-ham');
const LIST = path.join(HERE, 'yeni-gorseller.json');
const OUT_DIR = path.join(ROOT, 'src/services/database/activities/yeni');

const KAVRAMLAR = [
  {
    klasor: 'genis-dar',
    dosya: 'genisDarData.ts',
    exportAdi: 'wideNarrowDataYeni',
    activityType: 'WideNarrow',
    idBaslangic: 2201,
    sahne: true, // gerçek ortam fotoğrafları: renkler korunur
    etiket: 'width',
    a: { ek: 'genis', deger: 'geniş', soru: 'Geniş olan hangisi?', sifat: 'geniştir' },
    b: { ek: 'dar', deger: 'dar', soru: 'Dar olan hangisi?', sifat: 'dardır' },
    kelime: { yol: 'yol', nehir: 'nehir', kapi: 'kapı', pencere: 'pencere', sokak: 'sokak', koridor: 'koridor',
      merdiven: 'merdiven', kaydirak: 'kaydırak', tunel: 'tünel', kopru: 'köprü' },
  },
  {
    klasor: 'buyuk-kucuk',
    dosya: 'buyukKucukData.ts',
    exportAdi: 'bigSmallDataYeni',
    activityType: 'BigSmall',
    idBaslangic: 2301,
    etiket: 'size',
    a: { ek: 'buyuk', deger: 'büyük', soru: 'Büyük olan hangisi?', sifat: 'büyüktür' },
    b: { ek: 'kucuk', deger: 'küçük', soru: 'Küçük olan hangisi?', sifat: 'küçüktür' },
    kelime: { top: 'top', elma: 'elma', ayi: 'ayı', kutu: 'kutu', balon: 'balon', ayakkabi: 'ayakkabı',
      kupa: 'kupa', tencere: 'tencere', karpuz: 'karpuz', yastik: 'yastık' },
  },
  {
    klasor: 'uzun-kisa',
    dosya: 'uzunKisaData.ts',
    exportAdi: 'longShortDataYeni',
    activityType: 'LongShort',
    idBaslangic: 2401,
    etiket: 'length',
    sahneNesneler: ['sac'], // portre: gri arka plan, renkler korunur
    a: { ek: 'uzun', deger: 'uzun', soru: 'Uzun olan hangisi?', sifat: 'uzundur' },
    b: { ek: 'kisa', deger: 'kısa', soru: 'Kısa olan hangisi?', sifat: 'kısadır' },
    kelime: { kalem: 'kalem', tren: 'tren', atki: 'atkı', kurdele: 'kurdele', yilan: 'yılan', bank: 'bank',
      pantolon: 'pantolon', tisort: 'tişört kolu', corap: 'çorap', sac: 'saç' },
  },
  {
    klasor: 'yuksek-alcak',
    dosya: 'yuksekAlcakData.ts',
    exportAdi: 'highLowDataYeni',
    activityType: 'HighLow',
    idBaslangic: 2501,
    soruIdBaslangic: 1001, // HighLow eski i18n'den questions.sp_highlow_<id>_* arıyor
    etiket: 'height',
    sahneNesneler: ['bina', 'dag', 'cit', 'duvar', 'cadir'],
    ozne: { ayakkabi: 'ayakkabının topuğu' },
    a: { ek: 'yuksek', deger: 'yüksek', soru: 'Yüksek olan hangisi?', sifat: 'yüksektir' },
    b: { ek: 'alcak', deger: 'alçak', soru: 'Alçak olan hangisi?', sifat: 'alçaktır' },
    kelime: { blok: 'blok kulesi', bina: 'bina', dag: 'dağ', cit: 'çit', duvar: 'duvar', masa: 'masa',
      tabure: 'tabure', kitaplik: 'kitaplık', ayakkabi: 'ayakkabı', cadir: 'çadır' },
  },
  {
    klasor: 'dolu-bos',
    dosya: 'doluBosData.ts',
    exportAdi: 'fullEmptyDataYeni',
    activityType: 'FullEmpty',
    idBaslangic: 2601,
    etiket: 'fullness',
    a: { ek: 'dolu', deger: 'dolu', soru: 'Dolu olan hangisi?', sifat: 'doludur' },
    b: { ek: 'bos', deger: 'boş', soru: 'Boş olan hangisi?', sifat: 'boştur' },
    kelime: { kumbara: 'kumbara', bardak: 'bardak', kavanoz: 'kavanoz', sepet: 'sepet', kutu: 'oyuncak kutusu',
      kova: 'kova', kalemlik: 'kalemlik', tabak: 'tabak', akvaryum: 'akvaryum', koli: 'yumurta kolisi' },
  },
  {
    klasor: 'az-cok',
    dosya: 'azCokData.ts',
    exportAdi: 'fewMuchDataYeni',
    activityType: 'FewMuch',
    idBaslangic: 2701,
    etiket: 'quantity',
    a: { ek: 'cok', deger: 'çok', soru: 'Çok olan hangisi?', sifat: 'çoktur' },
    b: { ek: 'az', deger: 'az', soru: 'Az olan hangisi?', sifat: 'azdır' },
    // "Elma çoktur" yerine çoğul özne: "Burada elmalar çoktur"
    buYok: true, // "Hayır, burada elmalar azdır."
    ozne: { elma: 'burada elmalar', top: 'burada toplar', kalem: 'burada kalemler', kurabiye: 'burada kurabiyeler',
      dugme: 'burada düğmeler', blok: 'burada bloklar', araba: 'burada arabalar', balon: 'burada balonlar',
      yaprak: 'burada yapraklar', cilek: 'burada çilekler' },
    kelime: { elma: 'elma', top: 'top', kalem: 'kalem', kurabiye: 'kurabiye', dugme: 'düğme', blok: 'blok',
      araba: 'araba', balon: 'balon', yaprak: 'yaprak', cilek: 'çilek' },
  },
  {
    klasor: 'butun-yarim-ceyrek',
    dosya: 'butunYarimCeyrekData.ts',
    exportAdi: 'halfQuarterWholeDataYeni',
    activityType: 'HalfQuarterWhole',
    idBaslangic: 2801,
    etiket: 'portion',
    haller: {
      // Kaan: "tam" da lazım. Okulda "tam elma / yarım elma" da deniyor.
      butun: { deger: 'bütün', soru: 'Bütün olan hangisi?', sifat: 'bütündür', esSoru: 'Tam olan hangisi?', esSifat: 'tamdır' },
      yarim: { deger: 'yarım', soru: 'Yarım olan hangisi?', sifat: 'yarımdır' },
      ceyrek: { deger: 'çeyrek', soru: 'Çeyrek olan hangisi?', sifat: 'çeyrektir' },
    },
    // Her yiyecekten 3 karşılaştırma: bütün-yarım, yarım-çeyrek, bütün-çeyrek
    ciftler: [['butun', 'yarim'], ['yarim', 'ceyrek'], ['butun', 'ceyrek']],
    kelime: { elma: 'elma', portakal: 'portakal', pizza: 'pizza', pasta: 'pasta', karpuz: 'karpuz',
      ekmek: 'ekmek', limon: 'limon', domates: 'domates' },
  },
  {
    klasor: 'derin-sig',
    dosya: 'derinSigData.ts',
    exportAdi: 'derinSigDataYeni',
    activityType: 'DerinSig',
    idBaslangic: 2901,
    etiket: 'depth',
    sahneNesneler: ['cukur', 'havuz'],
    a: { ek: 'derin', deger: 'derin', soru: 'Derin olan hangisi?', sifat: 'derindir' },
    b: { ek: 'sig', deger: 'sığ', soru: 'Sığ olan hangisi?', sifat: 'sığdır' },
    ozne: { havuz: 'havuzun suyu' },
    kelime: { tabak: 'tabak', kase: 'kase', tencere: 'tencere', kutu: 'kutu', kova: 'kova', sepet: 'sepet',
      cekmece: 'çekmece', firin: 'fırın kabı', cukur: 'çukur', havuz: 'havuz' },
  },
  {
    klasor: 'acik-kapali',
    dosya: 'acikKapaliData.ts',
    exportAdi: 'openClosedDataYeni',
    activityType: 'OpenClosed',
    idBaslangic: 3001,
    etiket: 'state',
    sahneNesneler: ['goz'],
    a: { ek: 'acik', deger: 'açık', soru: 'Açık olan hangisi?', sifat: 'açıktır' },
    b: { ek: 'kapali', deger: 'kapalı', soru: 'Kapalı olan hangisi?', sifat: 'kapalıdır' },
    ozne: { goz: 'gözler', cicek: 'çiçek' },
    kelime: { kapi: 'kapı', pencere: 'pencere', kutu: 'kutu', semsiye: 'şemsiye', kitap: 'kitap', kavanoz: 'kavanoz',
      musluk: 'musluk', canta: 'çanta', goz: 'göz', cicek: 'çiçek' },
  },
  {
    klasor: 'kirik-saglam',
    dosya: 'kirikSaglamData.ts',
    exportAdi: 'brokenIntactDataYeni',
    activityType: 'BrokenIntact',
    idBaslangic: 3101,
    etiket: 'condition',
    a: { ek: 'kirik', deger: 'kırık', soru: 'Kırık olan hangisi?', sifat: 'kırıktır' },
    b: { ek: 'saglam', deger: 'sağlam', soru: 'Sağlam olan hangisi?', sifat: 'sağlamdır' },
    kelime: { tabak: 'tabak', fincan: 'fincan', yumurta: 'yumurta', kalem: 'kalem', araba: 'araba', gozluk: 'gözlük',
      sandalye: 'sandalye', saksi: 'saksı', biskuvi: 'bisküvi', robot: 'robot' },
  },
];

const cap = w => w.charAt(0).toLocaleUpperCase('tr-TR') + w.slice(1);
const list = JSON.parse(fs.readFileSync(LIST, 'utf8'));

for (const k of KAVRAMLAR) {
  // İki halli kavramlar (a/b) tek karşılaştırmadır. Üç halliler (bütün/yarım/çeyrek) "haller" + "ciftler" ile tanımlanır.
  const haller = k.haller || { [k.a.ek]: k.a, [k.b.ek]: k.b };
  const ciftler = k.ciftler || [[k.a.ek, k.b.ek]];
  const dir = path.join(RAW, k.klasor);
  if (!fs.existsSync(dir)) { console.log(`${k.klasor}: klasör yok, atlandı`); continue; }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).sort();
  const nesneler = [...new Set(files.map(f => f.replace(/-[^-]+\.jpg$/, '')))];
  const word = n => {
    if (!k.kelime[n]) throw new Error(`${k.klasor}: "${n}" için kelime tanımı yok (KAVRAMLAR.kelime)`);
    return k.kelime[n];
  };

  // 1) Görsel listesi: bu klasöre ait eski kayıtları çıkarıp yeniden yaz
  const digerleri = list.gorseller.filter(g => !g.kaynak.startsWith(`${k.klasor}/`));
  let id = k.idBaslangic;
  const ids = {};
  const yeni = [];
  for (const f of files) {
    const [, n, ek] = /^(.+)-([^-]+)\.jpg$/.exec(f);
    const deger = haller[ek] ? haller[ek].deger : ek;
    ids[f] = id;
    const sahne = k.sahne || (k.sahneNesneler || []).includes(n);
    yeni.push({ id: id++, kaynak: `${k.klasor}/${f}`, word: word(n), category: 'none', ...(sahne ? { sahne: true } : {}), tags: { [k.etiket]: deger } });
  }
  const cakisan = digerleri.find(g => g.id >= k.idBaslangic && g.id < id);
  if (cakisan) throw new Error(`id çakışması: ${cakisan.id} (${cakisan.kaynak})`);
  list.gorseller = [...digerleri, ...yeni].sort((x, y) => x.id - y.id);

  // 2) Sorular
  // Bazı etkinlikler (HighLow gibi konum türleri) eski i18n metnini soru numarasıyla arıyor: o zaman 1001'den başla.
  let rid = k.soruIdBaslangic || 1;
  const opt = (f, w, ok) => `            { id: ${ids[f]}, word: "${w}", imageUrl: "/images/${ids[f]}.webp", isCorrect: ${ok}, audioKey: "${w}", spokenText: "${w}" }`;
  const round = (q, correct, wrong, fOk, fNo, w) => `    {
        id: ${rid++},
        question: "${q}",
        questionAudioKey: "",
        activityType: ActivityType.${k.activityType},
        speech: {
            tr: { question: '${q}', correct: '${correct}', wrong: '${wrong}' }
        },
        options: [
${opt(fOk, w, true)},
${opt(fNo, w, false)}
        ]
    }`;
  const rounds = [];
  let ciftSayisi = 0;
  for (const n of nesneler) {
    const w = word(n);
    // Cümle öznesi kelimeden farklı olabilir (ör. "ayakkabının topuğu yüksektir")
    const oz = (k.ozne || {})[n] || w;
    const bu = k.buYok ? '' : 'bu ';
    let yazildi = false;
    for (const [ea, eb] of ciftler) {
      const fa = `${n}-${ea}.jpg`, fb = `${n}-${eb}.jpg`;
      if (!ids[fa] || !ids[fb]) continue;
      if (!yazildi) { rounds.push(`    // ${w}`); yazildi = true; }
      ciftSayisi++;
      const A = haller[ea], B = haller[eb];
      rounds.push(round(A.soru, `Evet! ${cap(oz)} ${A.sifat}.`, `Hayır, ${bu}${oz} ${B.sifat}.`, fa, fb, w) + ',');
      rounds.push(round(B.soru, `Evet! ${cap(oz)} ${B.sifat}.`, `Hayır, ${bu}${oz} ${A.sifat}.`, fb, fa, w) + ',');
      // Eş anlamlı soru (ör. bütün = tam): aynı görseller, farklı kelime; turda biri seçilir
      for (const [X, Y, fx, fy] of [[A, B, fa, fb], [B, A, fb, fa]]) {
        if (X.esSoru) rounds.push(round(X.esSoru, `Evet! ${cap(oz)} ${X.esSifat}.`, `Hayır, ${bu}${oz} ${Y.sifat}.`, fx, fy, w) + ',');
      }
    }
  }
  const soruSayisi = rid - (k.soruIdBaslangic || 1);
  const ts = `// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (${k.klasor}). Elle düzenleme.
// ${ciftSayisi} çift, ${soruSayisi} soru. Görseller: gorsel-ham/${k.klasor}/ → id ${k.idBaslangic}-${id - 1}.
import { ConceptRound, ActivityType } from '../../../../types';

export const ${k.exportAdi}: ConceptRound[] = [
${rounds.join('\n')}
];
`;
  fs.writeFileSync(path.join(OUT_DIR, k.dosya), ts);
  console.log(`${k.klasor}: ${yeni.length} görsel (id ${k.idBaslangic}-${id - 1}), ${ciftSayisi} çift, ${soruSayisi} soru → yeni/${k.dosya}`);
}
fs.writeFileSync(LIST, JSON.stringify(list, null, 2) + '\n');
