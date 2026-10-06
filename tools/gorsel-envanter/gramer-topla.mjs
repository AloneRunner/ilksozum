// Gramer kontrolü için uygulamanın Türkçe soru/cevap cümlelerini toplar (Kaan, 2026-10-06).
// Yeni kavram soruları + akıl oyunu verileri yüklenir; question / questionText / speech.tr.* metinleri çıkarılır.
// Çıktı: tools/gorsel-envanter/gramer-cumleler.json  [{ kaynak, alan, metin }]
// Çalıştır: node tools/gorsel-envanter/gramer-topla.mjs
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const { build } = await import(pathToFileURL(path.join(ROOT, 'node_modules/esbuild/lib/main.js')).href);

const DB = path.join(ROOT, 'src/services/database/activities');
const girisler = [
  ['yeni', path.join(DB, 'yeni/index.ts')],
  ...fs.readdirSync(path.join(DB, 'reasoning')).filter(f => f.endsWith('.ts')).map(f => [`reasoning/${f}`, path.join(DB, 'reasoning', f)]),
];
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gramer-'));
const entry = path.join(tmp, 'giris.ts');
fs.writeFileSync(entry, girisler.map(([ad, p], i) => `export * as m${i} from ${JSON.stringify(p.replace(/\\/g, '/'))};`).join('\n'));
await build({ entryPoints: [entry], bundle: true, format: 'esm', platform: 'node', outfile: path.join(tmp, 'b.mjs'),
  logLevel: 'error', define: { 'import.meta.env': '{"DEV":true}' }, loader: { '.tsx': 'tsx' },
  external: ['react', 'react-dom', '@capacitor/*'] });
const mod = await import(pathToFileURL(path.join(tmp, 'b.mjs')).href);
fs.rmSync(tmp, { recursive: true, force: true });

const ALAN = new Set(['question', 'questionText', 'correct', 'wrong', 'explanation', 'hint', 'feedback']);
const cikti = [];
const gorulen = new Set();
const gez = (deger, kaynak, yol, dilTr) => {
  if (Array.isArray(deger)) { deger.forEach(d => gez(d, kaynak, yol, dilTr)); return; }
  if (!deger || typeof deger !== 'object') return;
  for (const [k, v] of Object.entries(deger)) {
    if (['en', 'de', 'fr', 'nl', 'az'].includes(k)) continue; // yalnız Türkçe
    if (typeof v === 'string' && ALAN.has(k) && /[a-zçğıöşü]/i.test(v)) {
      const anahtar = `${k}|${v}`;
      if (gorulen.has(anahtar)) continue;
      gorulen.add(anahtar);
      cikti.push({ kaynak, alan: k, metin: v });
    } else if (typeof v === 'object') gez(v, kaynak, `${yol}.${k}`, dilTr || k === 'tr');
  }
};
for (const [i, [ad]] of girisler.entries()) {
  const m = mod[`m${i}`];
  for (const [isim, deger] of Object.entries(m || {})) if (typeof deger === 'object') gez(deger, `${ad}:${isim}`, '', false);
}
fs.writeFileSync(path.join(HERE, 'gramer-cumleler.json'), JSON.stringify(cikti, null, 1));
const say = {}; for (const c of cikti) say[c.alan] = (say[c.alan] || 0) + 1;
console.log('cümle', cikti.length, say);
