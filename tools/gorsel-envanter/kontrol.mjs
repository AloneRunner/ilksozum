// Yeni soruların toplu kontrol sayfası.
// Çalıştır: node tools/gorsel-envanter/kontrol.mjs  →  tools/gorsel-envanter/kontrol.html
// Uygulamanın kullandığı soru dosyalarından (activities/yeni) üretilir. Her kavramda her satır bir çift:
// SOL = kavramın ilk sorusunun doğru cevabı (ör. "Uzun"), SAĞ = karşı taraf (ör. "Kısa").
// Ters eşleşmiş bir çift (sola kısa düşmüş) tek bakışta görünür.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const { build } = await import(pathToFileURL(path.join(ROOT, 'node_modules/esbuild/lib/main.js')).href);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'kontrol-'));
const entry = path.join(ROOT, 'src/services/database/activities/yeni/index.ts');
await build({ entryPoints: [entry], bundle: true, format: 'esm', platform: 'node', outfile: path.join(tmp, 'b.mjs'),
  logLevel: 'error', define: { 'import.meta.env': '{"DEV":true}' } });
const mod = await import(pathToFileURL(path.join(tmp, 'b.mjs')).href);
fs.rmSync(tmp, { recursive: true, force: true });

const ADLAR = {
  thinThickDataYeni: 'İnce / Kalın', wideNarrowDataYeni: 'Geniş / Dar', bigSmallDataYeni: 'Büyük / Küçük',
  longShortDataYeni: 'Uzun / Kısa', highLowDataYeni: 'Yüksek / Alçak', fullEmptyDataYeni: 'Dolu / Boş',
  fewMuchDataYeni: 'Az / Çok', halfQuarterWholeDataYeni: 'Bütün / Yarım / Çeyrek', derinSigDataYeni: 'Derin / Sığ',
  openClosedDataYeni: 'Açık / Kapalı', brokenIntactDataYeni: 'Kırık / Sağlam', cleanDirtyDataYeni: 'Temiz / Kirli',
  wetDryDataYeni: 'Islak / Kuru', oldNewDataYeni: 'Eski / Yeni', hardSoftDataYeni: 'Sert / Yumuşak',
  hotColdDataYeni: 'Sıcak / Soğuk', roughSmoothDataYeni: 'Pürüzlü / Pürüzsüz', dikenliPuruzsuzDataYeni: 'Dikenli / Pürüzsüz',
  parlakMatDataYeni: 'Parlak / Mat', seffafOpakDataYeni: 'Şeffaf / Opak',
  insideOutsideDataYeni: 'İçinde / Dışında', onUnderDataYeni: 'Üstünde / Altında', inFrontOfBehindDataYeni: 'Önünde / Arkasında',
  betweenDataYeni: 'Arasında', belowAboveDataYeni: 'Aşağıda / Yukarıda',
  bitterSweetDataYeni: 'Acı / Ekşi / Tatlı', noisyQuietDataYeni: 'Gürültülü / Sessiz', hungryFullDataYeni: 'Aç / Tok',
  youngOldDataYeni: 'Yaşlı / Genç', tembelCaliskanDataYeni: 'Tembel / Çalışkan', kalabalikTenhaDataYeni: 'Kalabalık / Tenha',
  kirisikDuzgunDataYeni: 'Kırışık / Düzgün', dugumCozukDataYeni: 'Düğümlü / Çözük', straightCurvedDataYeni: 'Düz / Eğri',
  tazeBayatDataYeni: 'Taze / Bayat', messyCleanDataYeni: 'Dağınık / Toplu',
  leftRightDataYeni: 'Sağa / Sola bakan', aliveLifelessDataYeni: 'Canlı / Cansız',
  nearFarDataYeni: 'Yakın / Uzak', besideOppositeDataYeni: 'Yan yana / Karşı karşıya', saatDataYeni: 'Saat',
  tersDuzDataYeni: 'Ters / Düz', sivriKutDataYeni: 'Sivri / Küt',
  dayNightDataYeni: 'Gündüz / Gece', fastSlowDataYeni: 'Hızlı / Yavaş',
  beforeAfterDataYeni: 'Önce / Sonra', heavyLightDataYeni: 'Ağır / Hafif',
  emotionsDataYeni: 'Duygular', acikKoyuDataYeni: 'Açık / Koyu',
};
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const img = o => `<img loading="lazy" src="../../public/images/${o.id}.webp" alt="">`;

let toplamCift = 0;
const bolumler = [];
for (const [ad, rounds] of Object.entries(mod)) {
  if (!Array.isArray(rounds) || !ADLAR[ad]) continue;
  const ciftler = new Map(); // "id-id" -> { ilk soru, diğer sorular }
  for (const r of rounds) {
    const key = r.options.map(o => o.id).sort((a, b) => a - b).join('-');
    if (!ciftler.has(key)) ciftler.set(key, { ilk: r, digerleri: [] });
    else ciftler.get(key).digerleri.push(r.question);
  }
  const satirlar = [...ciftler.values()].map(({ ilk, digerleri }) => {
    const sol = ilk.options.find(o => o.isCorrect), sag = ilk.options.find(o => !o.isCorrect);
    toplamCift++;
    return `<div class="satir">
      <figure class="sol">${img(sol)}<figcaption>✓ ${esc(ilk.question)}<br><small>#${sol.id} ${esc(sol.word)}</small></figcaption></figure>
      <figure>${img(sag)}<figcaption>${esc(digerleri[0] || '')}<br><small>#${sag.id} ${esc(sag.word)}</small></figcaption></figure>
    </div>`;
  });
  bolumler.push(`<section id="${ad}"><h2>${esc(ADLAR[ad])} <span>${ciftler.size} çift</span></h2><div class="izgara">${satirlar.join('')}</div></section>`);
}

const html = `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Yeni Sorular Kontrol</title><style>
:root{--bg:#f6f5f2;--card:#fff;--ink:#1f2328;--muted:#6b7078;--ok:#1f8a4c;--line:#e3e1dc}
@media (prefers-color-scheme:dark){:root{--bg:#16181c;--card:#1f2227;--ink:#e8e9eb;--muted:#9aa0a8;--ok:#57c285;--line:#33373e}}
body{margin:0;background:var(--bg);color:var(--ink);font:14px/1.4 system-ui,"Segoe UI",sans-serif}
header{position:sticky;top:0;background:var(--card);border-bottom:1px solid var(--line);padding:10px 16px;z-index:2}
header h1{margin:0;font-size:17px} header p{margin:2px 0 0;color:var(--muted);font-size:13px}
nav{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px} nav a{font-size:12px;color:var(--ink);background:var(--bg);border:1px solid var(--line);border-radius:999px;padding:2px 8px;text-decoration:none}
main{padding:12px 16px 60px} h2{font-size:16px;margin:24px 0 8px} h2 span{color:var(--muted);font-weight:400;font-size:13px}
.izgara{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px}
.satir{display:grid;grid-template-columns:1fr 1fr;gap:6px;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:6px}
figure{margin:0} img{width:100%;aspect-ratio:1;object-fit:contain;background:#fff;border-radius:6px;display:block}
.sol img{outline:3px solid var(--ok);outline-offset:-3px}
figcaption{font-size:12px;margin-top:3px} figcaption small{color:var(--muted)}
</style></head><body><header><h1>Yeni Sorular Kontrol</h1>
<p>${toplamCift} çift. Her satırda SOL (yeşil çerçeve) = o kavramın ilk sorusunun doğru cevabı. Sütunlar her kavramda hep aynı tarafı göstermeli.</p>
<nav>${Object.keys(mod).filter(k => ADLAR[k]).map(k => `<a href="#${k}">${esc(ADLAR[k])}</a>`).join('')}</nav></header>
<main>${bolumler.join('')}</main></body></html>`;
fs.writeFileSync(path.join(HERE, 'kontrol.html'), html);
console.log(`kontrol.html: ${bolumler.length} kavram, ${toplamCift} çift`);
