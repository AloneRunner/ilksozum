// Tekil (çift olmayan) yeni görseller: duyu organları, kişiler/meslekler, odalar, kaplar, günlük rutin.
// Çalıştır: node tools/gorsel-envanter/uret-tekil.mjs && node tools/gorsel-envanter/gorsel-isle.mjs
// Yapar:
//  1) gorsel-ham/tekil/<grup>/<ad>.jpg → yeni-gorseller.json (id 6301+)
//  2) yeni/sensesData.ts, yeni/ownershipData.ts: eski sorular aynen, sadece organ/kişi resimleri yenisiyle değişir
//  3) yeni/tekilGorseller.ts: mini oyunların kullandığı oda, kap ve rutin resimleri
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const RAW = path.join(ROOT, 'gorsel-ham');
const LIST = path.join(HERE, 'yeni-gorseller.json');
const YENI = path.join(ROOT, 'src/services/database/activities/yeni');
const ID0 = 6301, ID_SON = 6499;

// grup → { sahne, kelime: { dosyaAdı: kelime } }. Sıra id sırasını belirler; yeni dosya eklemek için sona ekle.
const GRUPLAR = {
  duyular: { sahne: true, kelime: { goz: 'göz', kulak: 'kulak', burun: 'burun', dil: 'dil', el: 'el' } },
  kisiler: {
    sahne: true, kelime: {
      polis: 'polis', ogretmen: 'öğretmen', itfaiyeci: 'itfaiyeci', doktor: 'doktor', asci: 'aşçı', astronot: 'astronot',
      kral: 'kral', nine: 'nine', dede: 'dede', baba: 'baba', bebek: 'bebek', ogrenci: 'öğrenci', 'kiz-cocugu': 'kız çocuğu',
      futbolcu: 'futbolcu',
    },
  },
  odalar: { sahne: true, kelime: { mutfak: 'mutfak', banyo: 'banyo', 'yatak-odasi': 'yatak odası', sinif: 'sınıf', bahce: 'bahçe' } },
  kaplar: { sahne: false, kelime: { 'oyuncak-kutusu': 'oyuncak kutusu', 'cop-kovasi': 'çöp kovası', kitaplik: 'kitaplık', 'camasir-sepeti': 'çamaşır sepeti' } },
  rutin: {
    sahne: true, kelime: {
      '01-uyan': 'uyan', '02-yatak-topla': 'yatağı topla', '03-yuz-yika': 'yüzünü yıka', '04-giyin': 'giyin', '05-kahvalti': 'kahvaltı yap',
      '06-dis-fircala': 'dişlerini fırçala', '07-ayakkabi-giy': 'ayakkabı giy', '08-okula-git': 'okula git', '09-el-yika': 'ellerini yıka',
      '10-ogle-yemegi': 'yemeğini ye', '11-banyo': 'banyo yap', '12-pijama': 'pijama giy', '13-kitap-oku': 'kitap oku', '14-uyu': 'uyu',
    },
  },
};

// 1) Görsel listesi (id'ler sabit kalsın diye her dosyaya, var olmasa da sırasıyla yer ayrılır)
const list = JSON.parse(fs.readFileSync(LIST, 'utf8'));
const digerleri = list.gorseller.filter(g => !g.kaynak.startsWith('tekil/'));
const yeni = [];
const url = {}; // 'grup/ad' → '/images/<id>.webp'
let id = ID0;
for (const [grup, g] of Object.entries(GRUPLAR)) {
  for (const [ad, kelime] of Object.entries(g.kelime)) {
    const kaynak = `tekil/${grup}/${ad}.jpg`;
    const buId = id++;
    if (buId > ID_SON) throw new Error('tekil id aralığı doldu');
    if (!fs.existsSync(path.join(RAW, kaynak))) continue;
    yeni.push({ id: buId, kaynak, word: kelime, category: 'none', ...(g.sahne ? { sahne: true } : {}), tags: { tekil: grup } });
    url[`${grup}/${ad}`] = `/images/${buId}.webp`;
  }
}
list.gorseller = [...digerleri, ...yeni].sort((a, b) => a.id - b.id);
fs.writeFileSync(LIST, JSON.stringify(list, null, 2) + '\n');

// 2) Eski soruları al, organ/kişi resimlerini değiştir
const { build } = await import(pathToFileURL(path.join(ROOT, 'node_modules/esbuild/lib/main.js')).href);
const yukle = async (dosya) => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tekil-'));
  await build({ entryPoints: [path.join(ROOT, dosya)], bundle: true, format: 'esm', platform: 'node', outfile: path.join(tmp, 'b.mjs'), logLevel: 'error', define: { 'import.meta.env': '{"DEV":true}' } });
  const m = await import(pathToFileURL(path.join(tmp, 'b.mjs')).href);
  fs.rmSync(tmp, { recursive: true, force: true });
  return m;
};
const kelimedenUrl = (grup) => Object.fromEntries(Object.entries(GRUPLAR[grup].kelime).filter(([ad]) => url[`${grup}/${ad}`]).map(([ad, k]) => [k, url[`${grup}/${ad}`]]));

const degistir = (rounds, harita) => {
  let n = 0;
  const yeniRounds = rounds.map(r => {
    const kopya = JSON.parse(JSON.stringify(r));
    for (const o of kopya.options || []) if (harita[o.word]) { o.imageUrl = harita[o.word]; n++; }
    if (kopya.questionItem && harita[kopya.questionItem.word]) { kopya.questionItem.imageUrl = harita[kopya.questionItem.word]; n++; }
    return kopya;
  });
  return { yeniRounds, n };
};
const yaz = (dosya, exportAdi, aciklama, rounds, tip) => {
  const govde = rounds.map(r => { const { activityType, ...rest } = r; return `    { ...${JSON.stringify(rest)}, activityType: ActivityType.${tip} }`; }).join(',\n');
  fs.writeFileSync(path.join(YENI, dosya), `// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-tekil.mjs. Elle düzenleme.
// ${aciklama}
import { ConceptRound, ActivityType } from '../../../../types';

export const ${exportAdi}: ConceptRound[] = [
${govde}
];
`);
};

const { sensesData } = await yukle('src/services/database/activities/sensesData.ts');
const duyu = degistir(sensesData, kelimedenUrl('duyular'));
yaz('sensesData.ts', 'sensesDataYeni', 'Duyularımız: eski sorular, organ resimleri yeni (göz, kulak, burun, dil, el).', duyu.yeniRounds, 'Senses');

const { ownershipData } = await yukle('src/services/database/activities/reasoning/ownershipData.ts');
const sahip = degistir(ownershipData, kelimedenUrl('kisiler'));
yaz('ownershipData.ts', 'ownershipDataYeni', 'Bu Kimin?: eski sorular, kişi/meslek resimleri yeni.', sahip.yeniRounds, 'WhoseIsThis');

// 3) Mini oyunlar için resim listesi
const grupUrl = (grup) => Object.fromEntries(Object.keys(GRUPLAR[grup].kelime).filter(ad => url[`${grup}/${ad}`]).map(ad => [ad, url[`${grup}/${ad}`]]));
fs.writeFileSync(path.join(YENI, 'tekilGorseller.ts'), `// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-tekil.mjs. Elle düzenleme.
// Mini oyunların gerçek resimleri (yoksa oyun emojiyi kullanır).
export const ODA_GORSEL: Record<string, string> = ${JSON.stringify(grupUrl('odalar'))};
export const KAP_GORSEL: Record<string, string> = ${JSON.stringify(grupUrl('kaplar'))};
export const RUTIN_GORSEL: Record<string, string> = ${JSON.stringify(grupUrl('rutin'))};
`);

console.log(`tekil: ${yeni.length} görsel (id ${ID0}+); Duyular ${duyu.n} resim değişti, Bu Kimin ${sahip.n} resim değişti`);
