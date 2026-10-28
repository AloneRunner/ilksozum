// Özel eğitim etkinliklerinin görsellerini işler (sosyal öykü, öz bakım, durumdan duygu, zamir, mevsim, saklanan kedi).
// Çalıştır:  node tools/gorsel-envanter/ozel-isle.mjs
// Kaynak: gorsel-ham/<klasör>/*.jpg (Flow, 1024 px)  →  public/images/ozel/<klasör>/<ad>.webp (720 px)
// Kelime veritabanına girmez; etkinlikler doğrudan yolla kullanır (src/components/ozel/ozelVeri.ts).
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const KLASORLER = ['sosyal-oyku', 'oz-bakim', 'durum-duygu', 'zamir', 'mevsim', 'saklanan'];
let n = 0, kb = 0;
for (const k of KLASORLER) {
  const kaynak = path.join(ROOT, 'gorsel-ham', k), hedef = path.join(ROOT, 'public/images/ozel', k);
  fs.mkdirSync(hedef, { recursive: true });
  for (const f of fs.readdirSync(kaynak).filter(f => /\.(jpe?g|png)$/i.test(f))) {
    const src = path.join(kaynak, f), dst = path.join(hedef, f.replace(/\.\w+$/, '.webp'));
    if (fs.existsSync(dst) && fs.statSync(dst).mtimeMs > fs.statSync(src).mtimeMs) { kb += fs.statSync(dst).size / 1024; n++; continue; }
    execFileSync('magick', [src, '-auto-orient', '-resize', '720x720', '-strip', '-quality', '80', dst]);
    kb += fs.statSync(dst).size / 1024; n++;
    console.log(`${k}/${path.basename(dst)}`);
  }
}
console.log(`\n${n} görsel, toplam ${(kb / 1024).toFixed(1)} MB`);
