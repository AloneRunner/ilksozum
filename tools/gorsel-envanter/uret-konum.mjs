// Konum setlerini (gorsel-ham/konum-set*) yeni görsel listesine ekler ve soru dosyasını üretir.
// Çalıştır: node tools/gorsel-envanter/uret-konum.mjs && node tools/gorsel-envanter/gorsel-isle.mjs
// Çıktı: yeni-gorseller.json'a konum görselleri (2021+) eklenir/güncellenir,
//        src/services/database/activities/yeni/konumData.ts yazılır.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const RAW = path.join(ROOT, 'gorsel-ham');
const LIST = path.join(HERE, 'yeni-gorseller.json');
const OUT = path.join(ROOT, 'src/services/database/activities/yeni/konumData.ts');
const START_ID = 2021;

// Her set: özne (nesne), kap ve mobilya için Türkçe hal ekleri elle yazıldı.
// kap: tamlayan (kutunun), çoğul tamlayan (kutuların) | mob: tamlayan (masanın)
const SETS = [
  { dir: 'konum-set1-top', ozne: 'top', kap: 'kutunun', kaplar: 'kutuların', iki: 'iki kutunun', mob: 'masanın' },
  { dir: 'konum-set2-ayi', ozne: 'ayı', kap: 'sepetin', kaplar: 'sepetlerin', iki: 'iki sepetin', mob: 'sandalyenin' },
  { dir: 'konum-set3-araba', ozne: 'araba', kap: 'kovanın', kaplar: 'kovaların', iki: 'iki kovanın', mob: 'sehpanın' },
  { dir: 'konum-set4-elma', ozne: 'elma', kap: 'kasenin', kaplar: 'kaselerin', iki: 'iki kasenin', mob: 'taburenin' },
  { dir: 'konum-set5-kalem', ozne: 'kalem', kap: 'kalemliğin', kaplar: 'kalemliklerin', iki: 'iki kalemliğin', mob: 'masanın' },
  { dir: 'konum-set6-kedi', ozne: 'kedi', kap: 'yatağın', kaplar: 'yatakların', iki: 'iki yatağın', mob: 'bankın' },
  { dir: 'konum-set7-kus', ozne: 'kuş', kap: 'kafesin', kaplar: 'kafeslerin', iki: 'iki kafesin', mob: 'sehpanın' },
  { dir: 'konum-set8-bebek', ozne: 'bebek', kap: 'beşiğin', kaplar: 'beşiklerin', iki: 'iki beşiğin', mob: 'sandalyenin' },
  { dir: 'konum-set9-dinozor', ozne: 'dinozor', kap: 'kutunun', kaplar: 'kutuların', iki: 'iki kutunun', mob: 'sehpanın' },
  { dir: 'konum-set10-ordek', ozne: 'ördek', kap: 'sepetin', kaplar: 'sepetlerin', iki: 'iki sepetin', mob: 'taburenin' },
];

// Dosya adı → konum etiketi
const POS = {
  icinde: 'içinde', disinda: 'dışında', ustunde: 'üstünde', altinda: 'altında', onunde: 'önünde',
  arkasinda: 'arkasında', yaninda: 'yanında', arasinda: 'arasında', yukarida: 'yukarıda', asagida: 'aşağıda',
};

// 1) Görsel listesini güncelle (konum görselleri sabit sırayla id alır)
const list = JSON.parse(fs.readFileSync(LIST, 'utf8'));
const others = list.gorseller.filter(g => !g.kaynak.startsWith('konum-set'));
const ids = {}; // "dir/ad" -> id
let id = START_ID;
const konum = [];
for (const s of SETS) {
  if (!fs.existsSync(path.join(RAW, s.dir))) { console.log(`${s.dir}: klasör yok, atlandı`); continue; }
  for (const f of fs.readdirSync(path.join(RAW, s.dir)).filter(f => f.endsWith('.jpg')).sort()) {
    const ad = f.replace(/\.jpg$/, '');
    const tags = POS[ad] ? { position: POS[ad] } : {};
    ids[`${s.dir}/${ad}`] = id;
    konum.push({ id: id++, kaynak: `${s.dir}/${f}`, word: s.ozne, category: 'none', tags });
  }
}
if (others.some(g => g.id >= START_ID && g.id < id)) throw new Error(`Konum aralığı (${START_ID}-${id - 1}) başka görsellerle çakışıyor.`);
list.gorseller = [...others, ...konum].sort((x, y) => x.id - y.id);
fs.writeFileSync(LIST, JSON.stringify(list, null, 2) + '\n');

// 2) Soruları üret
const img = (s, ad) => ids[`${s.dir}/${ad}`];
const opt = (s, ad, ok) => {
  const i = img(s, ad);
  return `            { id: ${i}, word: "${s.ozne}", imageUrl: "/images/${i}.webp", isCorrect: ${ok}, audioKey: "${s.ozne}", spokenText: "${s.ozne}" }`;
};
const cap = w => w.charAt(0).toLocaleUpperCase('tr-TR') + w.slice(1);
let rid = 1;
const round = (type, q, correct, wrong, s, a, b) => `    {
        id: ${rid++},
        question: "${q}",
        questionAudioKey: "",
        activityType: ActivityType.${type},
        speech: {
            tr: { question: '${q}', correct: '${correct}', wrong: '${wrong}' }
        },
        options: [
${opt(s, a, true)},
${opt(s, b, false)}
        ]
    }`;

// Çift: [etkinlik, A dosyası, B dosyası, soru(A), soru(B), cümle(A), cümle(B)]
const PAIRS = [
  // Cümleler (gramer, 2026-10-06): "Evet! Bu top kutunun içinde." / "Hayır, bu top kutunun dışında." (-dır yok)
  ['InsideOutside', 'icinde', 'disinda',
    s => `Hangi ${s.ozne} ${s.kap} içinde?`, s => `Hangi ${s.ozne} ${s.kap} dışında?`,
    s => `${s.ozne} ${s.kap} içinde`, s => `${s.ozne} ${s.kap} dışında`],
  ['OnUnder', 'ustunde', 'altinda',
    s => `Hangi ${s.ozne} ${s.mob} üstünde?`, s => `Hangi ${s.ozne} ${s.mob} altında?`,
    s => `${s.ozne} ${s.mob} üstünde`, s => `${s.ozne} ${s.mob} altında`],
  ['InFrontOfBehind', 'onunde', 'arkasinda',
    s => `Hangi ${s.ozne} ${s.kap} önünde?`, s => `Hangi ${s.ozne} ${s.kap} arkasında?`,
    s => `${s.ozne} ${s.kap} önünde`, s => `${s.ozne} ${s.kap} arkasında`],
  ['Between', 'arasinda', 'arasinda-degil',
    s => `Hangi ${s.ozne} ${s.iki} arasında?`, s => `${cap(s.kaplar)} arasında olmayan hangisi?`,
    s => `${s.ozne} ${s.kaplar} arasında`, s => `${s.ozne} ${s.kaplar} arasında değil`],
  ['BelowAbove', 'yukarida', 'asagida',
    s => `Hangi ${s.ozne} yukarıda?`, s => `Hangi ${s.ozne} aşağıda?`,
    s => `${s.ozne} yukarıda`, s => `${s.ozne} aşağıda`],
];

const exportsOut = [];
const summary = [];
for (const [type, a, b, qa, qb, ca, cb] of PAIRS) {
  // Numaralar 1001'den: eski konum çevirileri (i18n questions.sp_<tür>_<id>_*) 1-16 arasını kullanıyor,
  // ConceptChoiceScreen ekrandaki soruyu ve sesi önce o anahtarlardan aradığı için çakışmamalı.
  rid = 1001;
  const rounds = [];
  for (const s of SETS) {
    if (!img(s, a) || !img(s, b)) continue; // bu sette o kavram yok
    rounds.push(`    // ${s.ozne}`);
    rounds.push(round(type, qa(s), `Evet! Bu ${ca(s)}.`, `Hayır, bu ${cb(s)}.`, s, a, b) + ',');
    // Arasında: olumsuz soru ("arasında olmayan") özel eğitimde zor; sadece olumlu soru sorulur.
    if (type !== 'Between') rounds.push(round(type, qb(s), `Evet! Bu ${cb(s)}.`, `Hayır, bu ${ca(s)}.`, s, b, a) + ',');
  }
  const name = type.charAt(0).toLowerCase() + type.slice(1) + 'DataYeni';
  exportsOut.push(`export const ${name}: ConceptRound[] = [\n${rounds.join('\n')}\n];`);
  summary.push(`${type}: ${rid - 1001} soru`);
}

const ts = `// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-konum.mjs. Elle düzenleme; betiği değiştirip yeniden çalıştır.
// Konum kavramları: 8 nesne seti (top, ayı, araba, elma, kalem, kedi, kuş, bebek). Her sette aynı nesneler,
// sadece konum değişir. Kaynak: tools/gorsel-envanter/flow-konum.md, flow-konum-ek.md
import { ConceptRound, ActivityType } from '../../../../types';

${exportsOut.join('\n\n')}
`;
fs.writeFileSync(OUT, ts);
console.log(`${konum.length} konum görseli (id ${START_ID}-${id - 1}) listeye yazıldı`);
console.log(summary.join(' | '));
