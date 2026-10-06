// BASARA sıra denetleyicisi: her dersteki kelime/cümle/hikâye yalnızca o derse kadar öğrenilen birimlerle mi?
// Birimler: tek ünlüler (1–8. ders), öğrenilen heceler (ba, sa, ra … dı … ğa) ve görme kelimeleri (bak, gel, ver, al).
// Bir kelime bu birimlerin art arda dizilişi olarak bölünebiliyorsa geçerlidir ("kabak" = ka + bak).
// Çalıştır: node tools/basara/kontrol.mjs           (tüm dersler; hatalıları yazar)
//           node tools/basara/kontrol.mjs 21 "metin" (21. derse göre bir metni dener)
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const { build } = await import(pathToFileURL(path.join(ROOT, 'node_modules/esbuild/lib/main.js')).href);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'basara-'));
await build({ entryPoints: [path.join(ROOT, 'src/data/basaraLessons.ts')], bundle: true, format: 'esm', platform: 'node', outfile: path.join(tmp, 'b.mjs'), logLevel: 'error' });
const { getBasaraLessons } = await import(pathToFileURL(path.join(tmp, 'b.mjs')).href);
fs.rmSync(tmp, { recursive: true, force: true });

const dersler = getBasaraLessons(1);
const kucuk = s => s.toLocaleLowerCase('tr-TR');

/** k. derse kadar öğrenilen birimler */
export const birimler = (k) => {
  const u = new Set();
  for (const d of dersler) if (d.id <= k) for (const f of d.family) u.add(kucuk(f));
  return u;
};

const bolunur = (kelime, u, bellek = new Map()) => {
  if (kelime === '') return true;
  if (bellek.has(kelime)) return bellek.get(kelime);
  let ok = false;
  for (let n = Math.min(4, kelime.length); n >= 1 && !ok; n--) {
    if (u.has(kelime.slice(0, n)) && bolunur(kelime.slice(n), u, bellek)) ok = true;
  }
  bellek.set(kelime, ok);
  return ok;
};

export const metniDenetle = (k, metin) => {
  const u = birimler(k);
  return kucuk(metin).replace(/['’]/g, '').split(/[^a-zçğıöşü]+/).filter(Boolean).filter(w => !bolunur(w, u));
};

if (process.argv[2]) {
  const k = Number(process.argv[2]);
  const hatali = metniDenetle(k, process.argv.slice(3).join(' '));
  console.log(hatali.length ? `HATALI (${k}. ders): ${hatali.join(', ')}` : `geçerli (${k}. ders)`);
} else {
  let toplam = 0;
  for (const d of dersler) {
    for (const [alan, liste] of [['kelime', d.words], ['cümle', d.sentences], ['hikâye', d.story || []]]) {
      for (const m of liste) {
        const h = metniDenetle(d.id, m);
        if (h.length) { toplam++; console.log(`${d.id} ${d.newUnit} ${alan}: "${m}" → ${h.join(', ')}`); }
      }
    }
  }
  console.log(toplam ? `${toplam} sorunlu satır` : 'Tüm dersler sıraya uygun.');
}
