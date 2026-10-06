// Üretilen kayıtları tarar, şüphelileri işaretler (Kaan'a yalnız bunları dinletmek için).
// Kullanım: node tools/ses/kontrol.mjs [çıktı.html]
//   Şüpheli: metne göre çok uzun/kısa süre, çok kısık ses, kırpılamamış uzun sessizlik.
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'ffmpeg-static';

const KOK = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const s = fs.readFileSync(path.join(KOK, 'src/data/sesListesi.ts'), 'utf8');
const liste = JSON.parse(s.match(/\/\/ BASLA\r?\n([\s\S]*?)\r?\n\/\/ BITIR/)[1]);

const olc = (dosya) => {
  const ham = execFileSync(ffmpeg, ['-v', 'error', '-i', dosya, '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], { maxBuffer: 1 << 28 });
  const x = new Float32Array(ham.buffer, ham.byteOffset, ham.byteLength / 4);
  let tepe = 0, t = 0; for (const v of x) { tepe = Math.max(tepe, Math.abs(v)); t += v * v; }
  // en uzun sessiz aralık (20 ms kareler, tepenin 30 dB altı)
  const n = 320, esik = tepe * tepe * 1e-3; let enUzun = 0, su = 0;
  for (let i = 0; i + n <= x.length; i += n) { let e = 0; for (let j = i; j < i + n; j++) e += x[j] * x[j]; if (e / n < esik) { su++; enUzun = Math.max(enUzun, su); } else su = 0; }
  return { sure: x.length / 16000, tepe, sessiz: enUzun * 0.02 };
};

const supheli = [];
let n = 0;
for (const [metin, ad] of Object.entries(liste)) {
  const d = path.join(KOK, 'public/audio/ses', `${ad}.mp3`);
  if (!fs.existsSync(d)) { supheli.push({ metin, ad, neden: 'dosya yok' }); continue; }
  const { sure, tepe, sessiz } = olc(d);
  n++;
  const harf = metin.replace(/[^\p{L}]/gu, '').length || 1;
  const nedenler = [];
  if (harf <= 3 && sure > 1.1) nedenler.push(`kısa birim için uzun (${sure.toFixed(2)} sn)`);
  if (harf > 3 && sure / harf > 0.28) nedenler.push(`metne göre uzun (${sure.toFixed(2)} sn)`);
  if (sure < 0.15 || (harf > 6 && sure / harf < 0.035)) nedenler.push(`metne göre kısa (${sure.toFixed(2)} sn)`);
  if (tepe < 0.12) nedenler.push(`kısık (tepe ${tepe.toFixed(2)})`);
  if (sessiz > 0.7) nedenler.push(`içinde ${sessiz.toFixed(1)} sn sessizlik`);
  if (nedenler.length) supheli.push({ metin, ad, neden: nedenler.join(', ') });
}
console.log(`${n} kayıt tarandı · ${supheli.length} şüpheli`);
for (const x of supheli) console.log(`  ${x.metin} → ${x.neden}`);

const cikti = process.argv[2];
if (cikti) {
  const satir = supheli.map((x) => `<div class=k><b>${x.metin}</b><small>${x.neden}</small><audio controls preload=none src="file:///${path.join(KOK, 'public/audio/ses', x.ad + '.mp3').replace(/\\/g, '/')}"></audio></div>`).join('');
  fs.writeFileSync(cikti, `<!doctype html><meta charset=utf-8><title>Şüpheli kayıtlar</title><style>body{font-family:system-ui;max-width:640px;margin:20px auto;padding:0 16px;background:#f8fafc}.k{background:#fff;border-radius:12px;padding:10px 12px;margin:8px 0;box-shadow:0 1px 4px #0002;display:flex;flex-direction:column;gap:4px}b{font-size:20px}small{color:#b45309}audio{width:100%}</style><h2>Şüpheli kayıtlar (${supheli.length})</h2><p>Bozuk olanları söyle, yalnız onları yeniden üretiriz.</p>${satir}`);
}
