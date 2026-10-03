// "Hangisi farklı?" soruları: 3 tamamen aynı görsel + 1 farklı (Kaan, 2026-10-03). Yeni görsel gerekmez.
// Çalıştır: node tools/gorsel-envanter/uret-farkli.mjs  →  src/services/database/activities/yeni/hangisiFarkliData.ts
//  - KOLAY: 3 aynı nesne + 1 bambaşka nesne (3 elma + 1 araba). Seçim: farklı kavramlardan, farklı kelimeler.
//  - ZOR (ince fark): bir çiftin bir yüzü ×3 + öbür yüzü ×1 (3 büyük top + 1 küçük top). Aynı nesneli çiftlerden.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const OUT = path.join(ROOT, 'src/services/database/activities/yeni/hangisiFarkliData.ts');
const { build } = await import(pathToFileURL(path.join(ROOT, 'node_modules/esbuild/lib/main.js')).href);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'farkli-'));
await build({ entryPoints: [path.join(ROOT, 'src/services/database/activities/yeni/index.ts')], bundle: true, format: 'esm',
  platform: 'node', outfile: path.join(tmp, 'b.mjs'), logLevel: 'error', define: { 'import.meta.env': '{"DEV":true}' } });
const mod = await import(pathToFileURL(path.join(tmp, 'b.mjs')).href);
fs.rmSync(tmp, { recursive: true, force: true });

// Sahne/konum/insan içeren kavramlar kolay soruya uygun değil (tek nesne gerekiyor); ince farkta hepsi olur.
const SADECE_NESNE = new Set(['thinThickDataYeni', 'bigSmallDataYeni', 'longShortDataYeni', 'fullEmptyDataYeni', 'openClosedDataYeni',
  'brokenIntactDataYeni', 'cleanDirtyDataYeni', 'oldNewDataYeni', 'parlakMatDataYeni', 'seffafOpakDataYeni', 'kirisikDuzgunDataYeni',
  'tazeBayatDataYeni', 'halfQuarterWholeDataYeni']);
const ATLA = new Set(['hangisiFarkliYeni']);

const ciftler = []; // { a, b, kavram }
const tekNesneler = new Map(); // word -> option (beyaz arka planlı tek nesne)
for (const [ad, rounds] of Object.entries(mod)) {
  if (!Array.isArray(rounds) || ATLA.has(ad)) continue;
  const gorulen = new Set();
  for (const r of rounds) {
    if (r.options.length !== 2) continue;
    const [x, y] = r.options;
    const key = [x.id, y.id].sort().join('-');
    if (gorulen.has(key)) continue;
    gorulen.add(key);
    if (x.word === y.word) ciftler.push({ a: x, b: y, kavram: ad });
    if (SADECE_NESNE.has(ad)) for (const o of [x, y]) if (!tekNesneler.has(o.word)) tekNesneler.set(o.word, o);
  }
}

const opt = (o, ok) => `            { id: ${o.id}, word: "${o.word}", imageUrl: "${o.imageUrl}", isCorrect: ${ok}, audioKey: "${o.word}", spokenText: "${o.word}" }`;
let rid = 5001;
const round = (ayni, farkli, not) => `    { // ${not}
        id: ${rid++},
        question: "Hangisi farklı?",
        questionAudioKey: "",
        activityType: ActivityType.WhatDoesntBelong,
        speech: { tr: { question: 'Hangisi farklı?', correct: 'Evet! Bu farklı.', wrong: 'Hayır, bu aynı. Farklı olanı bul.' } },
        options: [
${opt(ayni, false)},
${opt(ayni, false)},
${opt(ayni, false)},
${opt(farkli, true)}
        ]
    }`;

// ZOR: her çiftten bir soru (yön dönüşümlü: bazen 3 büyük + 1 küçük, bazen 3 küçük + 1 büyük)
const zor = ciftler.map((c, i) => (i % 2 ? round(c.b, c.a, `ince fark: ${c.kavram}`) : round(c.a, c.b, `ince fark: ${c.kavram}`)));
// KOLAY: tek nesneler arasından, kelimeleri farklı ikililer (karıştırılmış, sabit tohumla)
let tohum = 7;
const rnd = () => (tohum = (tohum * 9301 + 49297) % 233280) / 233280;
const nesneler = [...tekNesneler.values()].sort(() => rnd() - 0.5);
const kolay = [];
for (let i = 0; i + 1 < nesneler.length && kolay.length < 40; i += 2) kolay.push(round(nesneler[i], nesneler[i + 1], 'kolay'));

const ts = `// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-farkli.mjs. Elle düzenleme.
// "Hangisi farklı?": 3 aynı + 1 farklı. KOLAY ${kolay.length} soru (bambaşka nesne), ZOR ${zor.length} soru (aynı nesnenin öbür hali).
import { ConceptRound, ActivityType } from '../../../../types';

export const hangisiFarkliKolayYeni: ConceptRound[] = [
${kolay.join(',\n')}
];

export const hangisiFarkliZorYeni: ConceptRound[] = [
${zor.join(',\n')}
];
`;
fs.writeFileSync(OUT, ts);
console.log(`hangisiFarkliData.ts: kolay ${kolay.length}, zor (ince fark) ${zor.length}`);
