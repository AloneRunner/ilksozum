// Saat kavramı (Kaan: saat kavram etkinliği olsun, mini oyun değil). Saatler kodla çizilir, her zaman doğru.
// Çalıştır: node tools/gorsel-envanter/uret-saat.mjs
// Çıktı: public/images/<id>.webp (5401+) ve src/services/database/activities/yeni/saatData.ts
// Görsel dosya üretimi: SVG → PNG (Edge headless, yazı tipi sorunsuz) → WebP (ImageMagick).
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const OUT_IMG = path.join(ROOT, 'public/images');
const OUT_TS = path.join(ROOT, 'src/services/database/activities/yeni/saatData.ts');
const EDGE = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ID0 = 5401;

// Çocuk saati: kalın kenar, büyük rakamlar, kısa kalın KIRMIZI akrep, uzun ince MAVİ yelkovan
function saatSVG(h, m) {
  const cx = 256, cy = 256, r = 220;
  const ha = ((h % 12) * 30 + m * 0.5 - 90) * Math.PI / 180;
  const ma = (m * 6 - 90) * Math.PI / 180;
  const nums = Array.from({ length: 12 }, (_, i) => i + 1).map(n => {
    const a = (n * 30 - 90) * Math.PI / 180;
    return `<text x="${cx + 168 * Math.cos(a)}" y="${cy + 168 * Math.sin(a)}" font-family="Segoe UI, Arial, sans-serif" font-size="52" font-weight="700" fill="#1f2937" text-anchor="middle" dominant-baseline="central">${n}</text>`;
  }).join('');
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i * 6 - 90) * Math.PI / 180, big = i % 5 === 0;
    const r1 = big ? 196 : 204, r2 = 212;
    return `<line x1="${cx + r1 * Math.cos(a)}" y1="${cy + r1 * Math.sin(a)}" x2="${cx + r2 * Math.cos(a)}" y2="${cy + r2 * Math.sin(a)}" stroke="#334155" stroke-width="${big ? 6 : 2}" stroke-linecap="round"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#ffffff"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#fffdf5" stroke="#f59e0b" stroke-width="18"/>
  ${ticks}${nums}
  <line x1="${cx}" y1="${cy}" x2="${cx + 105 * Math.cos(ha)}" y2="${cy + 105 * Math.sin(ha)}" stroke="#dc2626" stroke-width="18" stroke-linecap="round"/>
  <line x1="${cx}" y1="${cy}" x2="${cx + 165 * Math.cos(ma)}" y2="${cy + 165 * Math.sin(ma)}" stroke="#2563eb" stroke-width="10" stroke-linecap="round"/>
  <circle cx="${cx}" cy="${cy}" r="14" fill="#1f2937"/>
</svg>`;
}

const SAYI = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on', 'on bir', 'on iki'];
// "Hangi saat üçü gösteriyor?" için belirtme hali
const BELIRTME = ['', 'biri', 'ikiyi', 'üçü', 'dördü', 'beşi', 'altıyı', 'yediyi', 'sekizi', 'dokuzu', 'onu', 'on biri', 'on ikiyi'];
const ad = (h, m) => m === 30 ? `${SAYI[h]} buçuk` : SAYI[h];
const adBelirtme = (h, m) => m === 30 ? `${SAYI[h]} buçuğu` : BELIRTME[h];

// Görseller: 12 tam saat + 12 buçuk
const saatler = [];
for (let h = 1; h <= 12; h++) saatler.push({ h, m: 0 }, { h, m: 30 });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'saat-'));
const idOf = new Map();
saatler.forEach((t, i) => {
  const id = ID0 + i;
  idOf.set(`${t.h}:${t.m}`, id);
  const svg = path.join(tmp, `${id}.svg`), png = path.join(tmp, `${id}.png`);
  fs.writeFileSync(svg, saatSVG(t.h, t.m));
  execFileSync(EDGE, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=512,512',
    `--screenshot=${png}`, 'file:///' + svg.replace(/\\/g, '/')], { stdio: 'ignore' });
  execFileSync('magick', [png, '-resize', '512x512', '-quality', '82', path.join(OUT_IMG, `${id}.webp`)]);
});
fs.rmSync(tmp, { recursive: true, force: true });

// Sorular
let rid = 1;
const opt = (t, ok) => {
  const id = idOf.get(`${t.h}:${t.m}`);
  const w = `saat ${ad(t.h, t.m)}`;
  return `            { id: ${id}, word: "${w}", imageUrl: "/images/${id}.webp", isCorrect: ${ok}, audioKey: "${w}", spokenText: "${w}" }`;
};
const round = (dogru, yanlis, seviye) => {
  const q = `Hangi saat ${adBelirtme(dogru.h, dogru.m)} gösteriyor?`;
  return `    { // ${seviye}
        id: ${rid++},
        question: "${q}",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: '${q}', correct: 'Evet! Saat ${ad(dogru.h, dogru.m)}.', wrong: 'Hayır, bu saat ${ad(yanlis.h, yanlis.m)}.' } },
        options: [
${opt(dogru, true)},
${opt(yanlis, false)}
        ]
    }`;
};
const rounds = [];
// Seviye 1: tam saatler, karşı şık uzak bir tam saat (h+6)
for (let h = 1; h <= 12; h++) rounds.push(round({ h, m: 0 }, { h: ((h + 5) % 12) + 1, m: 0 }, 'tam saat'));
// Seviye 2: buçuk ile aynı saatin tamı (ince fark), iki yönde
for (let h = 1; h <= 12; h++) {
  rounds.push(round({ h, m: 30 }, { h, m: 0 }, 'buçuk'));
  rounds.push(round({ h, m: 0 }, { h, m: 30 }, 'buçuk'));
}

fs.writeFileSync(OUT_TS, `// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-saat.mjs. Elle düzenleme.
// Saat kavramı: kodla çizilmiş saatler (id ${ID0}-${ID0 + saatler.length - 1}). Kırmızı kısa = akrep, mavi uzun = yelkovan.
// ${rounds.length} soru: 12 tam saat + 24 buçuk/tam ayrımı.
import { ConceptRound, ActivityType } from '../../../../types';

export const saatDataYeni: ConceptRound[] = [
${rounds.join(',\n')}
];
`);
console.log(`${saatler.length} saat görseli (id ${ID0}-${ID0 + saatler.length - 1}), ${rounds.length} soru → yeni/saatData.ts`);
