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
    soruOzel: {
      tisort: { uzun: 'Hangi tişörtün kolu uzun?', kisa: 'Hangi tişörtün kolu kısa?' },
      sac: { uzun: 'Hangi kızın saçı uzun?', kisa: 'Hangi kızın saçı kısa?' },
    },
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
    soruOzel: { ayakkabi: { yuksek: 'Hangi ayakkabının topuğu yüksek?', alcak: 'Hangi ayakkabının topuğu alçak?' } },
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
    soruKalip: (w, d) => `Hangi resimde ${w} ${d}?`,
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
      butun: { deger: 'bütün', soru: 'Bütün olan hangisi?', sifat: 'bütündür', esSoru: 'Tam olan hangisi?', esDeger: 'tam', esSifat: 'tamdır' },
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
    soruOzel: { havuz: { derin: 'Hangi havuzun suyu derin?', sig: 'Hangi havuzun suyu sığ?' } },
    etiket: 'depth',
    sahneNesneler: ['cukur', 'havuz'],
    a: { ek: 'derin', deger: 'derin', soru: 'Derin olan hangisi?', sifat: 'derindir' },
    b: { ek: 'sig', deger: 'sığ', soru: 'Sığ olan hangisi?', sifat: 'sığdır' },
    ozne: { havuz: 'havuzun suyu' },
    kelime: { legen: 'leğen', tabak: 'tabak', kase: 'kase', tencere: 'tencere', kutu: 'kutu', kova: 'kova', sepet: 'sepet',
      cekmece: 'çekmece', firin: 'fırın kabı', cukur: 'çukur', havuz: 'havuz' },
  },
  {
    klasor: 'acik-kapali',
    dosya: 'acikKapaliData.ts',
    exportAdi: 'openClosedDataYeni',
    activityType: 'OpenClosed',
    idBaslangic: 3001,
    soruOzel: { goz: { acik: 'Hangi çocuğun gözleri açık?', kapali: 'Hangi çocuğun gözleri kapalı?' } },
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
    soruOzel: { eller: { temiz: 'Hangi çocuğun elleri temiz?', kirli: 'Hangi çocuğun elleri kirli?' }, yuz: { temiz: 'Hangi çocuğun yüzü temiz?', kirli: 'Hangi çocuğun yüzü kirli?' } },
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
    soruOzel: { sac: { islak: 'Hangi çocuğun saçı ıslak?', kuru: 'Hangi çocuğun saçı kuru?' } },
    etiket: 'wetness',
    sahneNesneler: ['sac', 'yer', 'kum'],
    yenidenKullan: { 'semsiye-kuru': 'acik-kapali/semsiye-acik.jpg' }, // Kaan: aynı şemsiye
    a: { ek: 'islak', deger: 'ıslak', soru: 'Islak olan hangisi?', sifat: 'ıslaktır' },
    b: { ek: 'kuru', deger: 'kuru', soru: 'Kuru olan hangisi?', sifat: 'kurudur' },
    ozne: { sac: 'saçlar' },
    kelime: { corap: 'çorap', havlu: 'havlu', tisort: 'tişört', semsiye: 'şemsiye', sac: 'saç', kopek: 'köpek', sunger: 'sünger',
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
  {
    // Kaan: kar tanesi gibi soyut sembol yok. Sıcak = buhar/ateş/kızarmış, soğuk = buz/terleme/kar.
    // Karışık: bazı çiftler aynı nesne (kupa, hava), bazıları iki farklı nesne.
    klasor: 'sicak-soguk',
    dosya: 'sicakSogukData.ts',
    exportAdi: 'hotColdDataYeni',
    activityType: 'HotCold',
    idBaslangic: 3601,
    soruOzel: { hava: { sicak: 'Hangi resimde hava sıcak?', soguk: 'Hangi resimde hava soğuk?' } },
    etiket: 'temperature',
    sahneNesneler: ['hava', 'ates_kardanadam', 'soba_pencere', 'utu_buz'], // buz: beyazlatınca kayboluyor
    a: { ek: 'sicak', deger: 'sıcak', soru: 'Sıcak olan hangisi?', sifat: 'sıcaktır' },
    b: { ek: 'soguk', deger: 'soğuk', soru: 'Soğuk olan hangisi?', sifat: 'soğuktur' },
    ozne: { kupa: 'kupadaki içecek' },
    kelime: { sut: 'süt',
      kupa: 'kupa', hava: 'hava',
      corba_dondurma: { sicak: 'çorba', soguk: 'dondurma' },
      caydanlik_surahi: { sicak: 'çaydanlık', soguk: 'buzlu su' },
      ates_kardanadam: { sicak: 'ateş', soguk: 'kardan adam' },
      utu_buz: { sicak: 'ütü', soguk: 'buz' },
      cikolata_limonata: { sicak: 'sıcak çikolata', soguk: 'limonata' },
      ekmek_bezelye: { sicak: 'ekmek', soguk: 'dondurulmuş bezelye' },
      soba_pencere: { sicak: 'soba', soguk: 'buzlu pencere' },
    },
  },
  {
    klasor: 'puruzlu-puruzsuz',
    dosya: 'puruzluPuruzsuzData.ts',
    exportAdi: 'roughSmoothDataYeni',
    activityType: 'RoughSmooth',
    idBaslangic: 3701,
    etiket: 'texture',
    a: { ek: 'puruzlu', deger: 'pürüzlü', soru: 'Pürüzlü olan hangisi?', sifat: 'pürüzlüdür' },
    b: { ek: 'puruzsuz', deger: 'pürüzsüz', soru: 'Pürüzsüz olan hangisi?', sifat: 'pürüzsüzdür' },
    yenidenKullan: {
      'kavun_karpuz-puruzsuz': 'butun-yarim-ceyrek/karpuz-butun.jpg',
      'tugla_fayans-puruzlu': 'sert-yumusak/yastik_tugla-sert.jpg',
      'ceviz_yumurta-puruzlu': 'sert-yumusak/muz_ceviz-sert.jpg',
      'ceviz_yumurta-puruzsuz': 'kirik-saglam/yumurta-saglam.jpg',
      'portakal_elma-puruzsuz': 'butun-yarim-ceyrek/elma-butun.jpg',
      'volkanik_dere-puruzsuz': 'sert-yumusak/sunger_tas-sert.jpg',
    },
    kelime: { ananas_mango: { puruzlu: 'ananas', puruzsuz: 'mango' },
      tahta: 'tahta',
      kavun_karpuz: { puruzlu: 'kavun', puruzsuz: 'karpuz' }, tugla_fayans: { puruzlu: 'tuğla', puruzsuz: 'fayans' },
      ceviz_yumurta: { puruzlu: 'ceviz', puruzsuz: 'yumurta' }, portakal_elma: { puruzlu: 'portakal', puruzsuz: 'elma' },
      sungertasi_sabun: { puruzlu: 'sünger taşı', puruzsuz: 'sabun' }, kabuk_sise: { puruzlu: 'ağaç kabuğu', puruzsuz: 'cam şişe' },
      zimpara_kagit: { puruzlu: 'zımpara kâğıdı', puruzsuz: 'kâğıt' }, volkanik_dere: { puruzlu: 'pürüzlü taş', puruzsuz: 'dere taşı' },
    },
  },
  {
    klasor: 'dikenli-puruzsuz',
    dosya: 'dikenliPuruzsuzData.ts',
    exportAdi: 'dikenliPuruzsuzDataYeni',
    activityType: 'DikenliPuruzsuz',
    idBaslangic: 3801,
    sahneNesneler: ['kirpi_yunus', 'balonbaligi_japonbaligi'],
    etiket: 'texture',
    a: { ek: 'dikenli', deger: 'dikenli', soru: 'Dikenli olan hangisi?', sifat: 'dikenlidir' },
    b: { ek: 'puruzsuz', deger: 'pürüzsüz', soru: 'Pürüzsüz olan hangisi?', sifat: 'pürüzsüzdür' },
    yenidenKullan: {
      'kaktus_elma-puruzsuz': 'butun-yarim-ceyrek/elma-butun.jpg',
      'gul_lale-puruzsuz': 'acik-kapali/cicek-acik.jpg',
      'masajtopu_top-puruzsuz': 'buyuk-kucuk/top-buyuk.jpg',
    },
    kelime: { bogurtlen_bambu: { dikenli: 'böğürtlen dalı', puruzsuz: 'bambu' }, kirpioyuncak_ordek: { dikenli: 'dikenli oyuncak', puruzsuz: 'lastik ördek' },
      kestane: 'kestane',
      kaktus_elma: { dikenli: 'kaktüs', puruzsuz: 'elma' }, kirpi_yunus: { dikenli: 'kirpi', puruzsuz: 'yunus' },
      gul_lale: { dikenli: 'gül', puruzsuz: 'lale' }, denizkestanesi_kabuk: { dikenli: 'deniz kestanesi', puruzsuz: 'deniz kabuğu' },
      masajtopu_top: { dikenli: 'dikenli top', puruzsuz: 'top' }, devedikeni_nergis: { dikenli: 'deve dikeni', puruzsuz: 'nergis' },
      balonbaligi_japonbaligi: { dikenli: 'balon balığı', puruzsuz: 'japon balığı' },
    },
  },
  {
    klasor: 'parlak-mat',
    dosya: 'parlakMatData.ts',
    exportAdi: 'parlakMatDataYeni',
    activityType: 'ParlakMat',
    idBaslangic: 3901,
    etiket: 'texture',
    a: { ek: 'parlak', deger: 'parlak', soru: 'Parlak olan hangisi?', sifat: 'parlaktır' },
    b: { ek: 'mat', deger: 'mat', soru: 'Mat olan hangisi?', sifat: 'mattır' },
    yenidenKullan: {
      'balon-mat': 'buyuk-kucuk/balon-buyuk.jpg',
      'saksi-mat': 'kirik-saglam/saksi-saglam.jpg',
    },
    kelime: { tencere2: 'tencere', elma: 'elma', ayakkabi: 'ayakkabı', top: 'top', kupa: 'kupa', araba: 'araba', vazo: 'vazo',
      balon: 'balon', kasik: 'kaşık', saksi: 'saksı' },
  },
  {
    klasor: 'seffaf-opak',
    dosya: 'seffafOpakData.ts',
    exportAdi: 'seffafOpakDataYeni',
    activityType: 'SeffafOpak',
    idBaslangic: 4001,
    etiket: 'texture',
    a: { ek: 'seffaf', deger: 'şeffaf', soru: 'Şeffaf olan hangisi?', sifat: 'şeffaftır' },
    b: { ek: 'opak', deger: 'opak', soru: 'Opak olan hangisi?', sifat: 'opaktır' },
    yenidenKullan: {
      'semsiye-opak': 'acik-kapali/semsiye-acik.jpg',
      'kutu-opak': 'acik-kapali/kutu-kapali.jpg',
      'balon-opak': 'buyuk-kucuk/balon-buyuk.jpg',
      'kalemlik-opak': 'dolu-bos/kalemlik-dolu.jpg',
    },
    kelime: { vazo: 'vazo', bardak: 'bardak', sise: 'şişe', semsiye: 'şemsiye', kutu: 'kutu', kavanoz: 'kavanoz', balon: 'balon',
      kalemlik: 'kalemlik', poset_torba: { seffaf: 'poşet', opak: 'kâğıt torba' }, su_sut: { seffaf: 'su', opak: 'süt' } },
  },
  {
    // Tat görselden anlaşılmaz, bilinen yiyeceklerle öğretilir: her çift iki farklı yiyecek.
    klasor: 'aci-tatli',
    dosya: 'aciTatliData.ts',
    exportAdi: 'bitterSweetDataYeni',
    activityType: 'BitterSweet',
    idBaslangic: 4101,
    etiket: 'taste',
    haller: {
      aci: { deger: 'acı', soru: 'Acı olan hangisi?', sifat: 'acıdır' },
      eksi: { deger: 'ekşi', soru: 'Ekşi olan hangisi?', sifat: 'ekşidir' },
      tatli: { deger: 'tatlı', soru: 'Tatlı olan hangisi?', sifat: 'tatlıdır' },
    },
    ciftler: [['aci', 'tatli'], ['eksi', 'tatli']],
    yenidenKullan: {
      'turp_karpuz-tatli': 'butun-yarim-ceyrek/karpuz-butun.jpg',
      'hardal_lokum-tatli': 'sert-yumusak/lokum_akide-yumusak.jpg',
      'acisos_dondurma-tatli': 'sicak-soguk/corba_dondurma-soguk.jpg',
      'sivribiber_muz-tatli': 'sert-yumusak/muz_ceviz-yumusak.jpg',
      'limon_pasta-tatli': 'butun-yarim-ceyrek/pasta-butun.jpg',
    },
    kelime: {
      biber_bal: { aci: 'acı biber', tatli: 'bal' }, sogan_cikolata: { aci: 'soğan', tatli: 'çikolata' },
      turp_karpuz: { aci: 'turp', tatli: 'karpuz' }, hardal_lokum: { aci: 'hardal', tatli: 'lokum' },
      acisos_dondurma: { aci: 'acı sos', tatli: 'dondurma' }, sivribiber_muz: { aci: 'sivri biber', tatli: 'muz' },
      limon_pasta: { eksi: 'limon', tatli: 'pasta' }, tursu_seker: { eksi: 'turşu', tatli: 'şeker' },
      eriksek_cilek: { eksi: 'yeşil erik', tatli: 'çilek' }, greyfurt_uzum: { eksi: 'greyfurt', tatli: 'üzüm' },
    },
  },
  {
    // Ses görselde dolaylı: gürültü yapan an (ağız açık, çalgı çalınıyor) ve sakin an (uyuyor, okuyor). Aynı özne.
    klasor: 'gurultulu-sessiz',
    dosya: 'gurultuluSessizData.ts',
    exportAdi: 'noisyQuietDataYeni',
    activityType: 'NoisyQuiet',
    idBaslangic: 4201,
    sahne: true,
    etiket: 'sound',
    a: { ek: 'gurultulu', deger: 'gürültülü', soru: 'Gürültülü olan hangisi?', sifat: 'gürültülüdür' },
    b: { ek: 'sessiz', deger: 'sessiz', soru: 'Sessiz olan hangisi?', sifat: 'sessizdir' },
    kelime: { cocuk: 'çocuk', kopek: 'köpek', bebek: 'bebek', horoz: 'horoz', sinif: 'sınıf', mutfak: 'çocuk',
      inek: 'inek', kedi: 'kedi', aslan: 'aslan', esek: 'eşek' },
  },
  {
    klasor: 'ac-tok',
    dosya: 'acTokData.ts',
    exportAdi: 'hungryFullDataYeni',
    activityType: 'HungryFull',
    idBaslangic: 4301,
    sahne: true,
    etiket: 'state',
    a: { ek: 'ac', deger: 'aç', soru: 'Aç olan hangisi?', sifat: 'açtır' },
    b: { ek: 'tok', deger: 'tok', soru: 'Tok olan hangisi?', sifat: 'toktur' },
    kelime: { inek: 'inek', cocuk: 'çocuk', bebek: 'bebek', kopek: 'köpek', kedi: 'kedi', kus: 'kuş', tavsan: 'tavşan', at: 'at', civciv: 'civciv', kuzu: 'kuzu' },
  },
  {
    // Yaşlı (ağarmış) ile genç. İnsanlarda genç yetişkin; hayvanlarda YAVRU (Kaan: yetişkin-yaşlı ayrımı çocuk için zor).
    klasor: 'yasli-genc',
    dosya: 'yasliGencData.ts',
    exportAdi: 'youngOldDataYeni',
    activityType: 'YoungOld',
    idBaslangic: 4401,
    sahne: true,
    etiket: 'age',
    a: { ek: 'yasli', deger: 'yaşlı', soru: 'Yaşlı olan hangisi?', sifat: 'yaşlıdır' },
    b: { ek: 'genc', deger: 'genç', soru: 'Genç olan hangisi?', sifat: 'gençtir' },
    kelime: { inek: 'inek', koyun: 'koyun', nine: 'kadın', adam: 'adam', kadin: 'kadın', kopek: 'köpek', kedi: 'kedi', aslan: 'aslan', at: 'at', dede: 'adam' },
  },
  {
    klasor: 'tembel-caliskan',
    dosya: 'tembelCaliskanData.ts',
    exportAdi: 'tembelCaliskanDataYeni',
    activityType: 'TembelCaliskan',
    idBaslangic: 4501,
    sahne: true,
    etiket: 'state',
    a: { ek: 'caliskan', deger: 'çalışkan', soru: 'Çalışkan olan hangisi?', sifat: 'çalışkandır' },
    b: { ek: 'tembel', deger: 'tembel', soru: 'Tembel olan hangisi?', sifat: 'tembeldir' },
    kelime: { boyaci: 'boyacı', asci: 'aşçı', kopek: 'köpek', odev: 'çocuk', bahce: 'çocuk', karinca_agustos: { caliskan: 'karınca', tembel: 'ağustos böceği' },
      sofra: 'çocuk', ciftci: 'çiftçi', firinci: 'fırıncı', supurme: 'çocuk' },
  },
  {
    klasor: 'kalabalik-tenha',
    dosya: 'kalabalikTenhaData.ts',
    exportAdi: 'kalabalikTenhaDataYeni',
    activityType: 'KalabalikTenha',
    idBaslangic: 4601,
    sahne: true,
    etiket: 'crowd',
    a: { ek: 'kalabalik', deger: 'kalabalık', soru: 'Kalabalık olan hangisi?', sifat: 'kalabalıktır' },
    b: { ek: 'tenha', deger: 'tenha', soru: 'Tenha olan hangisi?', sifat: 'tenhadır' },
    kelime: { park: 'park', plaj: 'plaj', otobus: 'otobüs', sokak: 'sokak', oyunparki: 'oyun parkı', market: 'market',
      havuz: 'havuz', sinema: 'sinema salonu', peron: 'tren peronu', lunapark: 'lunapark' },
  },
  {
    // Mevcut görseller aynalanarak üretildi (gorsel-ham/sag-sol). Yön izleyiciye göre: ekranın sağına bakan = sağa bakan.
    klasor: 'sag-sol', dosya: 'sagSolData.ts', exportAdi: 'leftRightDataYeni',
    activityType: 'LeftRight', idBaslangic: 5201, etiket: 'direction',
    soruIdBaslangic: 1001, // LeftRight de i18n sp_leftRight_<id> arıyor
    sahneNesneler: ['at', 'horoz', 'inek', 'balik'],
    a: { ek: 'sag', deger: 'sağa', soru: 'Sağa bakan hangisi?', sifat: 'sağa bakıyor' },
    b: { ek: 'sol', deger: 'sola', soru: 'Sola bakan hangisi?', sifat: 'sola bakıyor' },
    soruKalip: (w, d) => `Hangi ${w} ${d} bakıyor?`,
    kelime: { kaplumbaga: 'kaplumbağa', kirpi: 'kirpi', bisiklet: 'bisiklet', caydanlik: 'çaydanlık', ayakkabi: 'ayakkabı',
      spor: 'spor ayakkabı', at: 'at', horoz: 'horoz', inek: 'inek', balik: 'balık' },
  },
  {
    // Hepsi önceki turların görselleri (yeni üretim yok). Canlı = hayvan/bitki, cansız = eşya; çoğu "gerçek / oyuncak" karşıtlığı.
    klasor: 'canli-cansiz', dosya: 'canliCansizData.ts', exportAdi: 'aliveLifelessDataYeni',
    activityType: 'AliveLifeless', idBaslangic: 5301, etiket: 'life',
    a: { ek: 'canli', deger: 'canlı', soru: 'Canlı olan hangisi?', sifat: 'canlıdır' },
    b: { ek: 'cansiz', deger: 'cansız', soru: 'Cansız olan hangisi?', sifat: 'cansızdır' },
    yenidenKullan: {
      'kedi_robot-canli': 'sert-yumusak/kedi_kaplumbaga-yumusak.jpg', 'kedi_robot-cansiz': 'kirik-saglam/robot-saglam.jpg',
      'kopek_top-canli': 'yasli-genc/kopek-genc.jpg', 'kopek_top-cansiz': 'buyuk-kucuk/top-buyuk.jpg',
      'kaplumbaga_tas-canli': 'sert-yumusak/kedi_kaplumbaga-sert.jpg', 'kaplumbaga_tas-cansiz': 'sert-yumusak/sunger_tas-sert.jpg',
      'kirpi_dikenlitop-canli': 'dikenli-puruzsuz/kirpi_yunus-dikenli.jpg', 'kirpi_dikenlitop-cansiz': 'dikenli-puruzsuz/masajtopu_top-dikenli.jpg',
      'tay_sandalye-canli': 'yasli-genc/at-genc.jpg', 'tay_sandalye-cansiz': 'kirik-saglam/sandalye-saglam.jpg',
      'civciv_ordek-canli': 'ac-tok/civciv-tok.jpg', 'civciv_ordek-cansiz': 'dikenli-puruzsuz/kirpioyuncak_ordek-puruzsuz.jpg',
      'lale_kalem-canli': 'acik-kapali/cicek-acik.jpg', 'lale_kalem-cansiz': 'kalin-ince/kalem-kalin.jpg',
      'agac_bank-canli': 'kalin-ince/agac-kalin.jpg', 'agac_bank-cansiz': 'uzun-kisa/bank-uzun.jpg',
      'tavsan_ayi-canli': 'ac-tok/tavsan-tok.jpg', 'tavsan_ayi-cansiz': 'temiz-kirli/ayi-temiz.jpg',
      'kuzu_yastik-canli': 'ac-tok/kuzu-tok.jpg', 'kuzu_yastik-cansiz': 'buyuk-kucuk/yastik-buyuk.jpg',
    },
    kelime: {
      kedi_robot: { canli: 'kedi', cansiz: 'robot' }, kopek_top: { canli: 'köpek', cansiz: 'top' },
      kaplumbaga_tas: { canli: 'kaplumbağa', cansiz: 'taş' }, kirpi_dikenlitop: { canli: 'kirpi', cansiz: 'dikenli top' },
      tay_sandalye: { canli: 'tay', cansiz: 'sandalye' }, civciv_ordek: { canli: 'civciv', cansiz: 'oyuncak ördek' },
      lale_kalem: { canli: 'lale', cansiz: 'kalem' }, agac_bank: { canli: 'ağaç', cansiz: 'bank' },
      tavsan_ayi: { canli: 'tavşan', cansiz: 'oyuncak ayı' }, kuzu_yastik: { canli: 'kuzu', cansiz: 'yastık' },
    },
  },
  {
    klasor: 'yakin-uzak', dosya: 'yakinUzakData.ts', exportAdi: 'nearFarDataYeni',
    activityType: 'NearFar', idBaslangic: 5501, sahne: true, etiket: 'distance',
    soruIdBaslangic: 1001, // NearFar i18n sp_nearfar_<id> arıyor
    a: { ek: 'yakin', deger: 'yakın', soru: 'Yakın olan hangisi?', sifat: 'yakındır' },
    b: { ek: 'uzak', deger: 'uzak', soru: 'Uzak olan hangisi?', sifat: 'uzaktır' },
    kelime: { bisiklet: 'bisiklet', kopek: 'köpek', cocuk: 'çocuk', inek: 'inek', agac: 'ağaç', ev: 'ev', top: 'top',
      tekne: 'tekne', araba: 'araba', balon: 'balon' },
  },
  {
    klasor: 'yanyana-karsi', dosya: 'yanyanaKarsiData.ts', exportAdi: 'besideOppositeDataYeni',
    activityType: 'BesideOpposite', idBaslangic: 5601, sahne: true, etiket: 'position',
    soruIdBaslangic: 1001, // BesideOpposite i18n sp_beside_<id> arıyor
    a: { ek: 'yanyana', deger: 'yan yana', soru: 'Yan yana olanlar hangisi?', sifat: 'yan yanadır' },
    b: { ek: 'karsi', deger: 'karşı karşıya', soru: 'Karşı karşıya olanlar hangisi?', sifat: 'karşı karşıyadır' },
    buYok: true,
    kelime: { sandalye: 'sandalyeler', cocuk: 'çocuklar', kedi: 'kediler', ayi: 'ayılar', araba: 'arabalar',
      koltuk: 'koltuklar', kus: 'kuşlar', ordek: 'ördekler', at: 'atlar', fincan: 'fincanlar' },
  },
  {
    klasor: 'kirisik-duzgun', dosya: 'kirisikDuzgunData.ts', exportAdi: 'kirisikDuzgunDataYeni',
    activityType: 'KirisikDuzgun', idBaslangic: 4701, etiket: 'condition', sahneNesneler: ['masaortusu', 'ortu', 'perde'],
    a: { ek: 'kirisik', deger: 'kırışık', soru: 'Kırışık olan hangisi?', sifat: 'kırışıktır' },
    b: { ek: 'duzgun', deger: 'düzgün', soru: 'Düzgün olan hangisi?', sifat: 'düzgündür' },
    kelime: { elbise: 'elbise', masaortusu: 'masa örtüsü', tisort: 'tişört', gomlek: 'gömlek', kagit: 'kâğıt', etek: 'etek', ortu: 'yatak örtüsü',
      pecete: 'peçete', perde: 'perde', pantolon: 'pantolon' },
  },
  {
    klasor: 'dugum-cozuk', dosya: 'dugumCozukData.ts', exportAdi: 'dugumCozukDataYeni',
    activityType: 'DugumCozuk', idBaslangic: 4801, etiket: 'condition',
    a: { ek: 'dugumlu', deger: 'düğümlü', soru: 'Düğümlü olan hangisi?', sifat: 'düğümlüdür' },
    b: { ek: 'cozuk', deger: 'çözük', soru: 'Çözük olan hangisi?', sifat: 'çözüktür' },
    ozne: { ayakkabi: 'ayakkabının bağcığı', poset: 'poşetin ağzı', balon: 'balonun ipi' },
    soruOzel: {
      ayakkabi: { dugumlu: 'Hangi ayakkabının bağcığı düğümlü?', cozuk: 'Hangi ayakkabının bağcığı çözük?' },
      poset: { dugumlu: 'Hangi poşetin ağzı düğümlü?', cozuk: 'Hangi poşetin ağzı çözük?' },
      balon: { dugumlu: 'Hangi balonun ipi düğümlü?', cozuk: 'Hangi balonun ipi çözük?' },
    },
    kelime: { hediye: 'hediye paketi', cop: 'çöp poşeti', bezcanta: 'bez çanta', ip: 'ip', ayakkabi: 'ayakkabı', kurdele: 'kurdele', poset: 'poşet', balon: 'balon', halat: 'halat', atki: 'atkı' },
  },
  {
    klasor: 'duz-egri', dosya: 'duzEgriData.ts', exportAdi: 'straightCurvedDataYeni',
    activityType: 'StraightCurved', idBaslangic: 4901, etiket: 'shape',
    sahneNesneler: ['yol', 'ray', 'agac', 'cit'],
    a: { ek: 'duz', deger: 'düz', soru: 'Düz olan hangisi?', sifat: 'düzdür' },
    b: { ek: 'egri', deger: 'eğri', soru: 'Eğri olan hangisi?', sifat: 'eğridir' },
    kelime: { kasik: 'kaşık', cit: 'çit', yol: 'yol', ray: 'tren rayı', pipet: 'pipet', tel: 'tel', civi: 'çivi', agac: 'ağaç', ip: 'ip', cubuk: 'çubuk' },
  },
  {
    klasor: 'taze-bayat', dosya: 'tazeBayatData.ts', exportAdi: 'tazeBayatDataYeni',
    activityType: 'TazeBayat', idBaslangic: 5001, etiket: 'freshness',
    a: { ek: 'taze', deger: 'taze', soru: 'Taze olan hangisi?', sifat: 'tazedir' },
    b: { ek: 'bayat', deger: 'bayat', soru: 'Bayat olan hangisi?', sifat: 'bayattır' },
    kelime: { cilek: 'çilek', portakal: 'portakal', ekmek: 'ekmek', muz: 'muz', elma: 'elma', marul: 'marul', domates: 'domates', havuc: 'havuç',
      salatalik: 'salatalık', simit: 'simit' },
  },
  {
    klasor: 'daginik-toplu', dosya: 'daginikTopluData.ts', exportAdi: 'messyCleanDataYeni',
    activityType: 'MessyClean', idBaslangic: 5101, sahne: true, etiket: 'order',
    a: { ek: 'daginik', deger: 'dağınık', soru: 'Dağınık olan hangisi?', sifat: 'dağınıktır' },
    b: { ek: 'toplu', deger: 'toplu', soru: 'Toplu olan hangisi?', sifat: 'topludur' },
    kelime: { canta: 'çanta', cekmece: 'çekmece', oda: 'oda', masa: 'masa', yatak: 'yatak', dolap: 'dolap', kitaplik: 'kitaplık', ayakkabilik: 'ayakkabılık',
      oyuncak: 'oyuncak rafı', tezgah: 'mutfak tezgahı' },
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
      // Soru nesneye göre özelleştirilebilir (Kaan: "Kolu kısa olan hangisi?", "Saçı kısa olan hangisi?")
      // Nesne adıyla sor: "Hangi kalem kalın?" (somut, tek odak). k.soruKalip ile değiştirilebilir.
      const kalip = k.soruKalip || ((w, d) => `Hangi ${w} ${d}?`);
      const qA = (k.soruOzel?.[n]?.[ea]) || kalip(w, A.deger), qB = (k.soruOzel?.[n]?.[eb]) || kalip(w, B.deger);
      rounds.push(round(qA, `Evet! ${cap(oz)} ${A.sifat}.`, `Hayır, ${bu}${oz} ${B.sifat}.`, fa, fb, w) + ',');
      rounds.push(round(qB, `Evet! ${cap(oz)} ${B.sifat}.`, `Hayır, ${bu}${oz} ${A.sifat}.`, fb, fa, w) + ',');
      // Eş anlamlı soru (ör. bütün = tam): aynı görseller, farklı kelime; turda biri seçilir
      for (const [X, Y, fx, fy] of [[A, B, fa, fb], [B, A, fb, fa]]) {
        if (X.esSoru) rounds.push(round(X.esDeger ? kalip(w, X.esDeger) : X.esSoru, `Evet! ${cap(oz)} ${X.esSifat}.`, `Hayır, ${bu}${oz} ${Y.sifat}.`, fx, fy, w) + ',');
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
