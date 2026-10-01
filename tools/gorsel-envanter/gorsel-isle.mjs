// Yeni görselleri işler ve uygulamaya kaydeder.
// Çalıştır:  node tools/gorsel-envanter/gorsel-isle.mjs
//
// Kaynak:  tools/gorsel-envanter/yeni-gorseller.json + gorsel-ham/<kaynak>
// Çıktı:   public/images/<id>.webp  (arka plan beyaza çekilir, 512 px, kırpma YOK:
//          çiftlerin ölçeği Flow'da eşitlendiği için korunmalı)
//          src/services/database/imageData-yeni.ts  (otomatik üretilir, elle düzenleme)
// Gerekli: ImageMagick (magick komutu)
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const RAW = path.join(ROOT, 'gorsel-ham');
const OUT_IMG = path.join(ROOT, 'public/images');
const OUT_TS = path.join(ROOT, 'src/services/database/imageData-yeni.ts');
const SIZE = 512;
const QUALITY = 82;

const { gorseller } = JSON.parse(fs.readFileSync(path.join(HERE, 'yeni-gorseller.json'), 'utf8'));
const magick = (...args) => execFileSync('magick', args, { encoding: 'utf8' }).trim();

// Türkçe heceleme: her hece bir ünlü içerir; iki ünlü arasındaki ünsüzlerden sonuncusu sonraki heceye geçer.
const VOWELS = 'aeıioöuüâîû';
function syllabify(word) {
  return word.split(/\s+/).flatMap(w => {
    const s = w.toLocaleLowerCase('tr-TR');
    const vi = [...s].map((c, i) => (VOWELS.includes(c) ? i : -1)).filter(i => i >= 0);
    if (vi.length <= 1) return [s];
    const parts = [];
    let start = 0;
    for (let k = 0; k < vi.length - 1; k++) {
      const between = vi[k + 1] - vi[k] - 1;
      const cut = between === 0 ? vi[k] + 1 : vi[k + 1] - 1;
      parts.push(s.slice(start, cut));
      start = cut;
    }
    parts.push(s.slice(start));
    return parts;
  });
}
const letters = word => [...word.replace(/\s+/g, '')].map(c => c.toLocaleUpperCase('tr-TR'));

const seen = new Set();
const entries = [];
for (const g of gorseller) {
  if (seen.has(g.id)) throw new Error(`Aynı id iki kez: ${g.id}`);
  seen.add(g.id);
  if (g.id < 2001 || g.id > 2999) throw new Error(`id 2001-2999 aralığında olmalı: ${g.id}`);
  const src = path.join(RAW, g.kaynak);
  if (!fs.existsSync(src)) throw new Error(`Kaynak yok: ${g.kaynak}`);
  const dst = path.join(OUT_IMG, `${g.id}.webp`);

  // Arka plan parlaklığı: dört köşenin ortalaması. Bu değer beyaza (255) çekilir.
  const bg = ['NorthWest', 'NorthEast', 'SouthWest', 'SouthEast']
    .map(gr => +magick(src, '-colorspace', 'gray', '-gravity', gr, '-crop', '16x16+0+0', '+repage', '-format', '%[fx:255*mean]', 'info:'))
    .reduce((a, b) => a + b, 0) / 4;
  const args = [src, '-auto-orient'];
  // Sahne görsellerinde (yol, nehir...) köşeler arka plan değil: renklere dokunma.
  if (!g.sahne && bg < 252) args.push('-level', `0%,${((bg - 3) / 255 * 100).toFixed(1)}%`);
  args.push('-resize', `${SIZE}x${SIZE}`, '-background', 'white', '-gravity', 'center', '-extent', `${SIZE}x${SIZE}`,
    '-strip', '-quality', String(QUALITY), dst);
  magick(...args);
  const kb = (fs.statSync(dst).size / 1024).toFixed(0);
  console.log(`${g.id} ${g.word.padEnd(8)} ${g.sahne ? 'sahne (renk korunur)' : `arka plan ${bg.toFixed(0)} → 255`}  ${kb} KB`);

  entries.push({
    id: g.id,
    word: g.word,
    imageUrl: `/images/${g.id}.webp`,
    audioKeys: { default: g.word },
    tags: { category: g.category || 'none', ...(g.tags || {}), syllables: syllabify(g.word), letters: letters(g.word) },
  });
}

const ts = `// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/gorsel-isle.mjs
// Elle düzenleme; tools/gorsel-envanter/yeni-gorseller.json dosyasını değiştirip betiği yeniden çalıştır.
import { ImageMetadata } from '../../types.ts';

export const imageDataYeni: ImageMetadata[] = ${JSON.stringify(entries, null, 2)} as ImageMetadata[];
`;
fs.writeFileSync(OUT_TS, ts);
// Listede artık olmayan yeni görsel dosyalarını (2001-2999) sil
for (const f of fs.readdirSync(OUT_IMG)) {
  const m = /^(\d+)\.webp$/.exec(f);
  if (m && +m[1] >= 2001 && +m[1] <= 2999 && !seen.has(+m[1])) {
    fs.unlinkSync(path.join(OUT_IMG, f));
    console.log(`silindi (listede yok): ${f}`);
  }
}
console.log(`\n${entries.length} görsel işlendi → ${path.relative(ROOT, OUT_TS)}`);
