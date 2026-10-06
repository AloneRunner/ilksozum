// Kayıt temizleme (Kaan, 2026-10-07): ElevenLabs kısa kayıtların başına/sonuna hışırtı, tık ve kopuk ses ekliyor
// ("la" hecesinde 2 sn "zzz"). Konuşmanın başladığı ve bittiği yeri bulur, dışını atar, uçları yumuşatır.
//
// Kullanım: node tools/ses/temizle.mjs <dosya.mp3>...   (yerinde temizler; asıl dosya tools/ses/ham/ altına kopyalanır)
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import ffmpeg from 'ffmpeg-static';

const SR = 44100;
const KARE = 0.01; // 10 ms
const ESIK_DB = 26; // tepe sesin bu kadar altı "sessiz"
const TABAN_FARK = 12;
const KISA_PARCA = 0.06; // bundan kısa…
const BOSLUK = 0.06; // …ve konuşmadan bu kadar uzak parça atılır (baştaki/sondaki kopuk ses)
const PAY_BAS = 0.03, PAY_SON = 0.08; // kesilen yerden önce/sonra bırakılan pay
const FADE_BAS = 0.01, FADE_SON = 0.05;

const pcmOku = (girdi) => {
  const ham = execFileSync(ffmpeg, ['-v', 'error', '-i', girdi, '-ac', '1', '-ar', String(SR), '-f', 'f32le', '-'], { maxBuffer: 1 << 28 });
  return new Float32Array(ham.buffer, ham.byteOffset, ham.byteLength / 4);
};

/** Konuşmanın [baş, son] saniyesi */
export const konusmaAraligi = (x) => {
  const n = Math.round(KARE * SR);
  const db = [];
  for (let i = 0; i + n <= x.length; i += n) {
    let t = 0; for (let j = i; j < i + n; j++) t += x[j] * x[j];
    db.push(10 * Math.log10(t / n + 1e-12));
  }
  const tepe = Math.max(...db);
  // eşik: tepenin 26 dB altı, ama arka plan hışırtısının (en sessiz %10) en az 12 dB üstü
  const taban = [...db].sort((a, b) => a - b)[Math.floor(db.length * 0.1)];
  const esik = Math.max(tepe - ESIK_DB, taban + TABAN_FARK);
  // sesli kareleri parçalara ayır
  const parcalar = [];
  db.forEach((d, i) => {
    if (d < esik) return;
    const son = parcalar[parcalar.length - 1];
    if (son && i - son[1] <= 3) son[1] = i; else parcalar.push([i, i]);
  });
  if (!parcalar.length) return [0, x.length / SR];
  const sure = (p) => (p[1] - p[0] + 1) * KARE;
  // baştaki ve sondaki kısa, kopuk parçaları at
  while (parcalar.length > 1 && sure(parcalar[0]) < KISA_PARCA && (parcalar[1][0] - parcalar[0][1]) * KARE > BOSLUK) parcalar.shift();
  while (parcalar.length > 1 && sure(parcalar.at(-1)) < KISA_PARCA && (parcalar.at(-1)[0] - parcalar.at(-2)[1]) * KARE > BOSLUK) parcalar.pop();
  const bas = Math.max(0, parcalar[0][0] * KARE - PAY_BAS);
  const son = Math.min(x.length / SR, (parcalar.at(-1)[1] + 1) * KARE + PAY_SON);
  return [bas, son];
};

/** Dosyayı yerinde temizler; [baş, son] döner (harf zamanlarını kaydırmak için). */
export const temizle = (dosya, { bitHizi = '64k' } = {}) => {
  const x = pcmOku(dosya);
  const [bas, son] = konusmaAraligi(x);
  const sure = son - bas;
  const gecici = dosya + '.tmp.mp3';
  execFileSync(ffmpeg, ['-v', 'error', '-y', '-i', dosya, '-ss', bas.toFixed(3), '-t', sure.toFixed(3),
    '-af', `afade=t=in:d=${FADE_BAS},afade=t=out:st=${Math.max(0, sure - FADE_SON).toFixed(3)}:d=${FADE_SON}`,
    '-ac', '1', '-ar', String(SR), '-b:a', bitHizi, gecici]);
  fs.renameSync(gecici, dosya);
  return [bas, son, x.length / SR];
};

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'))) {
  const hamKlasor = path.join(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), 'ham');
  for (const d of process.argv.slice(2)) {
    fs.mkdirSync(hamKlasor, { recursive: true });
    const yedek = path.join(hamKlasor, path.basename(d));
    if (!fs.existsSync(yedek)) fs.copyFileSync(d, yedek);
    const [bas, son, eski] = temizle(d);
    console.log(`${path.basename(d)}: ${eski.toFixed(2)} sn → ${(son - bas).toFixed(2)} sn (${bas.toFixed(2)}–${son.toFixed(2)})`);
  }
}
