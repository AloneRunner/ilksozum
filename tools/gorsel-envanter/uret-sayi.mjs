// Kaç Tane? (CountMatch): beyaz zeminli tek nesneyi 1-5 kez zar düzeninde dizip görsel üretir.
// Çalıştır: node tools/gorsel-envanter/uret-sayi.mjs && node tools/gorsel-envanter/gorsel-isle.mjs
// Çıktı: gorsel-ham/sayi/<nesne>-<n>.jpg, yeni-gorseller.json (id 6701+), yeni/countMatchData.ts
// Soru resmi (parmak gösteren el) şimdilik eski görsel; yeni el fotoğrafları gelince ELLER güncellenir.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const RAW = path.join(ROOT, 'gorsel-ham');
const LIST = path.join(HERE, 'yeni-gorseller.json');
const OUT_TS = path.join(ROOT, 'src/services/database/activities/yeni/countMatchData.ts');
const ID0 = 6701;

const NESNELER = [
  { ad: 'elma', kaynak: 'butun-yarim-ceyrek/elma-butun.jpg', tekil: 'elma' },
  { ad: 'top', kaynak: 'buyuk-kucuk/top-buyuk.jpg', tekil: 'top' },
  { ad: 'balon', kaynak: 'buyuk-kucuk/balon-buyuk.jpg', tekil: 'balon' },
  { ad: 'araba', kaynak: 'eski-yeni/araba-yeni.jpg', tekil: 'araba' },
  { ad: 'kupa', kaynak: 'buyuk-kucuk/kupa-buyuk.jpg', tekil: 'kupa' },
];
const SAYI = ['', 'bir', 'iki', 'üç', 'dört', 'beş'];
// Zar düzeni (0-1 arası merkezler): saymadan tanımayı kolaylaştırır
const DUZEN = {
  1: [[0.5, 0.5]],
  2: [[0.28, 0.5], [0.72, 0.5]],
  3: [[0.5, 0.27], [0.27, 0.72], [0.73, 0.72]],
  4: [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]],
  5: [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]],
};
// Soru resmi: aynı çocuğun 1-5 parmak gösteren eli (gorsel-ham/sayi/el-N.jpg, Flow turu 39). Yoksa eski çizim.
const ELLER_ESKI = { 1: 1002, 2: 1003, 3: 1004, 4: 1005, 5: 1006 };
const ELLER = {};
const EL_KELIME = { 1: 'bir parmak gösteren el', 2: 'iki parmak gösteren el', 3: 'üç parmak gösteren el', 4: 'dört parmak gösteren el', 5: 'beş parmak gösteren el' };

const magick = (...a) => execFileSync('magick', a, { stdio: ['ignore', 'pipe', 'inherit'] });
fs.mkdirSync(path.join(RAW, 'sayi'), { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sayi-'));

const yeni = [];
const idOf = {};
let id = ID0;
for (const n of NESNELER) {
  // Nesneyi beyaz zeminden kes (kenarları kırp)
  // Önce zemini tam beyaza çek (yoksa kesilen nesnenin etrafında gri kutu kalıyor), sonra kenarları kırp
  const kes = path.join(tmp, `${n.ad}.png`);
  const src = path.join(RAW, n.kaynak);
  const bg = ['NorthWest', 'NorthEast', 'SouthWest', 'SouthEast']
    .map(g => +execFileSync('magick', [src, '-colorspace', 'gray', '-gravity', g, '-crop', '16x16+0+0', '+repage', '-format', '%[fx:255*mean]', 'info:']).toString())
    .reduce((a, b) => a + b, 0) / 4;
  magick(src, '-level', `0%,${((bg - 6) / 255 * 100).toFixed(1)}%`, '-fuzz', '6%', '-trim', '+repage', kes);
  for (let k = 1; k <= 5; k++) {
    const hucre = k === 1 ? 560 : k === 2 ? 400 : k <= 4 ? 330 : 290;
    const dosya = `sayi/${n.ad}-${k}.jpg`;
    // Her nesne kendi hücresinde ortalanır (en-boy oranı farklı olabilir)
    const ortali = ['-size', '1024x1024', 'xc:white'];
    for (const [x, y] of DUZEN[k]) {
      ortali.push('(', kes, '-resize', `${hucre}x${hucre}`, '-background', 'white', '-gravity', 'center', '-extent', `${hucre}x${hucre}`, ')',
        '-gravity', 'NorthWest', '-geometry', `+${Math.round(x * 1024 - hucre / 2)}+${Math.round(y * 1024 - hucre / 2)}`, '-composite');
    }
    magick(...ortali, '-quality', '92', path.join(RAW, dosya));
    const buId = id++;
    idOf[`${n.ad}-${k}`] = buId;
    yeni.push({ id: buId, kaynak: dosya, word: `${SAYI[k]} ${n.tekil}`, category: 'none', tags: { count: k } });
  }
}
fs.rmSync(tmp, { recursive: true, force: true });
for (let k = 1; k <= 5; k++) {
  const dosya = `sayi/el-${k}.jpg`;
  if (!fs.existsSync(path.join(RAW, dosya))) continue;
  const buId = id++;
  ELLER[k] = buId;
  yeni.push({ id: buId, kaynak: dosya, word: EL_KELIME[k], category: 'none', sahne: true, tags: { count: k } });
}

const list = JSON.parse(fs.readFileSync(LIST, 'utf8'));
list.gorseller = [...list.gorseller.filter(g => !g.kaynak.startsWith('sayi/')), ...yeni].sort((a, b) => a.id - b.id);
fs.writeFileSync(LIST, JSON.stringify(list, null, 2) + '\n');

// Sorular: el N parmak gösterir; şıklar aynı nesnenin farklı adetleri (doğru + uzak iki yanlış)
let rid = 12001;
const rounds = [];
const opt = (ad, k, dogru) => {
  const i = idOf[`${ad}-${k}`];
  const w = `${SAYI[k]} ${NESNELER.find(x => x.ad === ad).tekil}`;
  return `      { id: ${i}, word: "${w}", spokenText: "${w}", imageUrl: "/images/${i}.webp", audioKey: "${w}", isCorrect: ${dogru} }`;
};
for (let k = 1; k <= 5; k++) {
  NESNELER.forEach((n, ni) => {
    // Yanlışlar: önce uzak sayılar (kolay ayırt), nesneye göre değişsin
    const digerler = [1, 2, 3, 4, 5].filter(x => x !== k).sort((a, b) => Math.abs(b - k) - Math.abs(a - k));
    const y1 = digerler[ni % 2], y2 = digerler[2 + (ni % 2)] ?? digerler[1 - (ni % 2)];
    const secenek = [opt(n.ad, k, true), opt(n.ad, y1, false), opt(n.ad, y2, false)];
    rounds.push(`  {
    id: ${rid++},
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: ${ELLER[k] ?? ELLER_ESKI[k]}, word: '${EL_KELIME[k]}', imageUrl: '${ELLER[k] ? `/images/${ELLER[k]}.webp` : `/images/${ELLER_ESKI[k]}.png`}', audioKeys: { default: '${EL_KELIME[k]}' }, tags: { category: 'eller', count: ${k} } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada ${SAYI[k]} ${n.tekil} var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
${secenek.join(',\n')}
    ]
  }`);
  });
}
fs.writeFileSync(OUT_TS, `// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-sayi.mjs. Elle düzenleme.
// Kaç Tane?: el N parmak gösterir; aynı nesnenin 1-5 adedi zar düzeninde (id ${ID0}+). ${rounds.length} soru.
import { ConceptRound, ActivityType } from '../../../../types';

export const countMatchDataYeni: ConceptRound[] = [
${rounds.join(',\n')}
];
`);
console.log(`sayi: ${yeni.length} görsel, ${rounds.length} soru → yeni/countMatchData.ts`);
