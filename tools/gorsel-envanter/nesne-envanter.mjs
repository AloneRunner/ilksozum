// Nesne turu envanteri: eski nesne görsellerinin listesi (id, kelime, kategori) + kavram turlarından
// yeniden kullanılabilecek yeni görsel adayları.
// Çalıştır: node tools/gorsel-envanter/nesne-envanter.mjs  → tools/gorsel-envanter/nesne-liste.json
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const { build } = await import(pathToFileURL(path.join(ROOT, 'node_modules/esbuild/lib/main.js')).href);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'nesne-'));
const giris = path.join(tmp, 'giris.ts');
const parcalar = ['001-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901-1000'];
fs.writeFileSync(giris, parcalar.map(p => `export { imageData_${p.replace('-', '_')} } from '${path.join(ROOT, 'src/services/database', `imageData-${p}.ts`).replace(/\\/g, '/')}';`).join('\n'));
await build({ entryPoints: [giris], bundle: true, format: 'esm', platform: 'node', outfile: path.join(tmp, 'b.mjs'), logLevel: 'error' });
const mod = await import(pathToFileURL(path.join(tmp, 'b.mjs')).href);
fs.rmSync(tmp, { recursive: true, force: true });
const eski = Object.values(mod).flat();

// Kavram turlarındaki yeni görseller: nesnenin "sade" hali olabilecekler (durum bildirmeyen ekler)
const SADE_EK = new Set(['duz', 'temiz', 'saglam', 'yeni', 'kuru', 'butun', 'kapali', 'buyuk', 'tek', 'gunduz', 'yenir', 'guvenli', 'opak', 'mat', 'duzgun', 'taze', 'toplu', 'dolu', 'acik', 'koyu']);
const yeni = JSON.parse(fs.readFileSync(path.join(HERE, 'yeni-gorseller.json'), 'utf8')).gorseller;
const adaylar = {};
for (const g of yeni) {
  if (g.sahne || g.kaynak.startsWith('konum') || g.kaynak.startsWith('sayi/') || g.kaynak.startsWith('ilk-son/')) continue;
  const ek = path.basename(g.kaynak, '.jpg').split('-').slice(-1)[0];
  if (!SADE_EK.has(ek)) continue;
  (adaylar[g.word] ||= []).push({ id: g.id, kaynak: g.kaynak });
}

const liste = eski
  .filter(e => e.tags?.category && e.tags.category !== 'none')
  .map(e => ({ id: e.id, word: e.word, category: e.tags.category, imageUrl: e.imageUrl, color: e.tags.color, aday: adaylar[e.word] || [] }));
const kategoriler = {};
for (const e of liste) (kategoriler[e.category] ||= []).push(e);
fs.writeFileSync(path.join(HERE, 'nesne-liste.json'), JSON.stringify({ kategoriler }, null, 2) + '\n');
console.log(`toplam ${liste.length} nesne, ${Object.keys(kategoriler).length} kategori, hazır aday olan ${liste.filter(e => e.aday.length).length}`);
for (const [k, v] of Object.entries(kategoriler)) console.log(`  ${k}: ${v.length} (aday ${v.filter(e => e.aday.length).length})`);
