// Beceri kulvarlı (yeni) Program Modu simülasyonu: sanal çocuk her gün bir oturum oynar; kulvar seviyeleri izlenir.
// Çalıştır: node tools/program/yeni-program-sim.mjs
import fs from 'fs'; import os from 'os'; import path from 'path'; import { pathToFileURL } from 'url';
const KOK = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const { build } = await import(pathToFileURL(path.join(KOK, 'node_modules/esbuild/lib/main.js')).href);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ysim-'));
const depo = {};
globalThis.localStorage = { getItem: (k) => depo[k] ?? null, setItem: (k, v) => { depo[k] = String(v); }, removeItem: (k) => { delete depo[k]; } };
globalThis.window = globalThis;
const giris = `export * from './src/program/motor.ts'; export { KULVARLAR } from './src/program/kulvarlar.ts'; export { ActivityType } from './src/types.ts';`;
await build({ stdin: { contents: giris, resolveDir: KOK, loader: 'ts', sourcefile: 'g.ts' }, bundle: true, format: 'esm', platform: 'node', outfile: path.join(tmp, 'b.mjs'), logLevel: 'error' });
const m = await import(pathToFileURL(path.join(tmp, 'b.mjs')).href);
const AT = m.ActivityType;
const AYAR = { oturumUzunlugu: 7, kapaliKulvarlar: ['okuma'], odak: null, bilinen: {}, yerlestirme: 'bitti' };

const senaryo = (baslik, basariOf, { ertele = [], gun = 60 } = {}) => {
  const stats = {}; let ts = Date.now() - 400 * 864e5;
  const ertelenen = new Set(ertele.map(String));
  for (let g = 1; g <= gun; g++) {
    const o = m.oturumKur(stats, AYAR, 'sim', g, ertelenen);
    for (const x of o) {
      const id = String(x.id); const p = basariOf(id); const soru = 8; const d = Math.round(p * soru);
      const st = stats[id] || (stats[id] = { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0, history: [] });
      st.totalCorrect += d; st.totalQuestions += soru; st.history.push({ timestamp: ts += 3600000, score: d, total: soru, mode: 'program' });
    }
  }
  const durum = m.KULVARLAR.filter((k) => !AYAR.kapaliKulvarlar.includes(k.id)).map((k) => {
    const d = m.kulvarDurumu(stats, AYAR, k.id, 'sim', ertelenen);
    return `${k.emoji}${d.bitti ? '✓' : `${d.seviye + 1}/${d.toplam}`}`;
  });
  console.log(`== ${baslik} (${gun} gün): ${durum.join('  ')}`);
};

const ba = String(AT.BeforeAfter);
senaryo('İyi giden çocuk %90', () => 0.9);
senaryo('Zorlanan çocuk %60', () => 0.6);
senaryo('Zorlanan çocuk %55 (geçmemeli)', () => 0.55);
senaryo('Sınırda %78, Önce-Sonra %0', (id) => (id === ba ? 0 : 0.78), { gun: 90 });
senaryo('Sınırda %78, Önce-Sonra %0, ERTELENDİ', (id) => (id === ba ? 0 : 0.78), { gun: 90, ertele: [ba] });
// Ertelenen etkinlik oturuma giriyor mu?
{
  const stats = {}; const e = new Set([String(AT.Colors)]); let n = 0;
  for (let i = 0; i < 30; i++) if (m.oturumKur(stats, AYAR, 'sim', i, e).some((x) => String(x.id) === String(AT.Colors))) n++;
  console.log(`== Ertelenen "Renkler" 30 oturumda kaç kez geldi: ${n} (0 olmalı)`);
}
