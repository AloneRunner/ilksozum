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
  {
    klasor: 'temiz-kirli',
    dosya: 'temizKirliData.ts',
    exportAdi: 'cleanDirtyDataYeni',
    activityType: 'CleanDirty',
    idBaslangic: 3201,
    etiket: 'cleanliness',
    sahneNesneler: ['yuz', 'eller'],
    a: { ek: 'temiz', deger: 'temiz', soru: 'Temiz olan hangisi?', sifat: 'temizdir' },
    b: { ek: 'kirli', deger: 'kirli', soru: 'Kirli olan hangisi?', sifat: 'kirlidir' },
    ozne: { eller: 'eller', yuz: 'yüz' },
    kelime: { tisort: 'tişört', corap: 'çorap', ayakkabi: 'ayakkabı', araba: 'araba', tabak: 'tabak', eller: 'el',
      yuz: 'yüz', kopek: 'köpek', ayi: 'ayı', bardak: 'bardak' },
  },
  {
    klasor: 'islak-kuru',
    dosya: 'islakKuruData.ts',
    exportAdi: 'wetDryDataYeni',
    activityType: 'WetDry',
    idBaslangic: 3301,
    etiket: 'wetness',
    sahneNesneler: ['sac', 'yer', 'kum'],
    yenidenKullan: { 'semsiye-kuru': 'acik-kapali/semsiye-acik.jpg' }, // Kaan: aynı şemsiye
    a: { ek: 'islak', deger: 'ıslak', soru: 'Islak olan hangisi?', sifat: 'ıslaktır' },
    b: { ek: 'kuru', deger: 'kuru', soru: 'Kuru olan hangisi?', sifat: 'kurudur' },
    ozne: { sac: 'saçlar' },
    kelime: { havlu: 'havlu', tisort: 'tişört', semsiye: 'şemsiye', sac: 'saç', kopek: 'köpek', sunger: 'sünger',
      yaprak: 'yaprak', toprak: 'toprak', kum: 'kum', yer: 'yer' },
  },
  {
    klasor: 'eski-yeni',
    dosya: 'eskiYeniData.ts',
    exportAdi: 'oldNewDataYeni',
    activityType: 'OldNew',
    idBaslangic: 3401,
    sahneNesneler: ['kapi'],
    etiket: 'condition',
    a: { ek: 'eski', deger: 'eski', soru: 'Eski olan hangisi?', sifat: 'eskidir' },
    b: { ek: 'yeni', deger: 'yeni', soru: 'Yeni olan hangisi?', sifat: 'yenidir' },
    kelime: { ayi: 'ayı', ayakkabi: 'ayakkabı', tisort: 'tişört', kitap: 'kitap', araba: 'araba', kova: 'kova',
      bisiklet: 'bisiklet', canta: 'çanta', kapi: 'kapı', caydanlik: 'çaydanlık' },
  },
  {
    // Sertlik aynı nesnede gösterilemez: her çift İKİ FARKLI nesne (kelime: { yumusak, sert })
    klasor: 'sert-yumusak',
    dosya: 'sertYumusakData.ts',
    exportAdi: 'hardSoftDataYeni',
    activityType: 'HardSoft',
    idBaslangic: 3501,
    etiket: 'texture',
    a: { ek: 'yumusak', deger: 'yumuşak', soru: 'Yumuşak olan hangisi?', sifat: 'yumuşaktır' },
    b: { ek: 'sert', deger: 'sert', soru: 'Sert olan hangisi?', sifat: 'serttir' },
    yenidenKullan: {
      'yastik_tugla-yumusak': 'buyuk-kucuk/yastik-buyuk.jpg',
      'ayi_robot-yumusak': 'temiz-kirli/ayi-temiz.jpg',
      'ayi_robot-sert': 'kirik-saglam/robot-saglam.jpg',
      'sunger_tas-yumusak': 'islak-kuru/sunger-kuru.jpg',
      'puf_sandalye-sert': 'kirik-saglam/sandalye-saglam.jpg',
    },
    kelime: {
      yastik_tugla: { yumusak: 'yastık', sert: 'tuğla' }, ayi_robot: { yumusak: 'ayı', sert: 'robot' },
      sunger_tas: { yumusak: 'sünger', sert: 'taş' }, pamuk_cakil: { yumusak: 'pamuk', sert: 'çakıl taşı' },
      hamur_blok: { yumusak: 'oyun hamuru', sert: 'tahta blok' }, lokum_akide: { yumusak: 'lokum', sert: 'akide şekeri' },
      yumak_top: { yumusak: 'yün yumağı', sert: 'tahta top' }, kedi_kaplumbaga: { yumusak: 'kedi', sert: 'kaplumbağa' },
      muz_ceviz: { yumusak: 'muz', sert: 'ceviz' }, puf_sandalye: { yumusak: 'puf', sert: 'sandalye' },
    },
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
  const nesneler = [...new Set([...files, ...Object.keys(k.yenidenKullan || {}).map(a => a + '.jpg')].map(f => f.replace(/-[^-]+\.jpg$/, '')))];
  const word = (n, ek) => {
    const v = k.kelime[n];
    if (!v) throw new Error(`${k.klasor}: "${n}" için kelime tanımı yok (KAVRAMLAR.kelime)`);
    if (typeof v === 'string') return v;
    if (!v[ek]) throw new Error(`${k.klasor}: "${n}-${ek}" için kelime yok`);
    return v[ek]; // farklı nesneli çift
  };
  const farkliNesne = n => typeof k.kelime[n] === 'object';

  // 1) Görsel listesi: bu klasöre ait eski kayıtları çıkarıp yeniden yaz
  const digerleri = list.gorseller.filter(g => !g.kaynak.startsWith(`${k.klasor}/`));
  let id = k.idBaslangic;
  const ids = {};
  const yeni = [];
  // Yeniden kullanım: başka bir kavramın görseli bu kavramda da kullanılır (yeni görsel üretilmez).
  // Örnek: islak-kuru'da 'semsiye-kuru' = acik-kapali/semsiye-acik.jpg
  for (const [ad, kaynak] of Object.entries(k.yenidenKullan || {})) {
    const g = list.gorseller.find(x => x.kaynak === kaynak);
    if (!g) throw new Error(`${k.klasor}: yeniden kullanılacak görsel bulunamadı: ${kaynak}`);
    ids[`${ad}.jpg`] = g.id;
  }
  for (const f of files) {
    if (k.yenidenKullan && k.yenidenKullan[f.replace(/\.jpg$/, '')]) continue;
    const [, n, ek] = /^(.+)-([^-]+)\.jpg$/.exec(f);
    const deger = haller[ek] ? haller[ek].deger : ek;
    ids[f] = id;
    const sahne = k.sahne || (k.sahneNesneler || []).includes(n);
    yeni.push({ id: id++, kaynak: `${k.klasor}/${f}`, word: word(n, ek), category: 'none', ...(sahne ? { sahne: true } : {}), tags: { [k.etiket]: deger } });
  }
  const cakisan = digerleri.find(g => g.id >= k.idBaslangic && g.id < id);
  if (cakisan) throw new Error(`id çakışması: ${cakisan.id} (${cakisan.kaynak})`);
  list.gorseller = [...digerleri, ...yeni].sort((x, y) => x.id - y.id);

  // 2) Sorular
  // Bazı etkinlikler (HighLow gibi konum türleri) eski i18n metnini soru numarasıyla arıyor: o zaman 1001'den başla.
  let rid = k.soruIdBaslangic || 1;
  const opt = (f, w, ok) => `            { id: ${ids[f]}, word: "${w}", imageUrl: "/images/${ids[f]}.webp", isCorrect: ${ok}, audioKey: "${w}", spokenText: "${w}" }`;
  const round = (q, correct, wrong, fOk, fNo, w, wNo = w) => `    {
        id: ${rid++},
        question: "${q}",
        questionAudioKey: "",
        activityType: ActivityType.${k.activityType},
        speech: {
            tr: { question: '${q}', correct: '${correct}', wrong: '${wrong}' }
        },
        options: [
${opt(fOk, w, true)},
${opt(fNo, wNo, false)}
        ]
    }`;
  const rounds = [];
  let ciftSayisi = 0;
  for (const n of nesneler) {
    const w = farkliNesne(n) ? n : word(n);
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
      if (farkliNesne(n)) {
        // İki farklı nesne: "Evet! Taş serttir." / "Hayır, yastık yumuşaktır." (seçilen yanlış nesne anlatılır)
        const wa = word(n, ea), wb = word(n, eb);
        rounds.push(round(A.soru, `Evet! ${cap(wa)} ${A.sifat}.`, `Hayır, ${wb} ${B.sifat}.`, fa, fb, wa, wb) + ',');
        rounds.push(round(B.soru, `Evet! ${cap(wb)} ${B.sifat}.`, `Hayır, ${wa} ${A.sifat}.`, fb, fa, wb, wa) + ',');
        continue;
      }
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
