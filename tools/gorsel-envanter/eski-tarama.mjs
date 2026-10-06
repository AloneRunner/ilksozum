// Eski görsel taraması: kaynak kodda ve verilerde hâlâ eski (id < 2001) görsel gösteren yerler.
// Hiçbir şey silmez; sadece rapor yazar → tools/gorsel-envanter/eski-tarama.json
// Çalıştır: node tools/gorsel-envanter/eski-tarama.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const SRC = path.join(ROOT, 'src');

const nesneYeni = fs.readFileSync(path.join(SRC, 'services/database/nesneYeni.ts'), 'utf8');
const yenisiVar = new Set([...nesneYeni.matchAll(/^  (\d+):/gm)].map(m => +m[1]));

const dosyalar = [];
const gez = d => { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) gez(p); else if (/\.(tsx?|json)$/.test(f)) dosyalar.push(p); } };
gez(SRC);

const rapor = {};
for (const p of dosyalar) {
  const rel = path.relative(ROOT, p).replace(/\\/g, '/');
  if (rel.includes('imageData-') || rel.endsWith('nesneYeni.ts')) continue;
  const s = fs.readFileSync(p, 'utf8');
  const ids = new Set();
  for (const m of s.matchAll(/\/images\/(\d+)\.(png|gif|webp|jpg)/g)) if (+m[1] < 2001) ids.add(+m[1]);
  for (const m of s.matchAll(/imageId:\s*(\d+)/g)) if (+m[1] < 2001 && +m[1] > 0) ids.add(+m[1]);
  if (!ids.size) continue;
  const eskiKalan = [...ids].filter(i => !yenisiVar.has(i)).sort((a, b) => a - b);
  rapor[rel] = { toplam: ids.size, yenisiVar: ids.size - eskiKalan.length, eskiKalan };
}
fs.writeFileSync(path.join(HERE, 'eski-tarama.json'), JSON.stringify(rapor, null, 2) + '\n');
const sirali = Object.entries(rapor).filter(([, r]) => r.eskiKalan.length).sort((a, b) => b[1].eskiKalan.length - a[1].eskiKalan.length);
for (const [f, r] of sirali) console.log(`${String(r.eskiKalan.length).padStart(4)} eski / ${r.toplam}  ${f}`);
