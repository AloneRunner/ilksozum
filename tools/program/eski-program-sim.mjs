// Üniteli (eski) Program Modu simülasyonu: sanal çocuk her gün bir oturum oynar; ünite ilerlemesi ve tıkanma denetlenir.
// Çalıştır: node tools/program/eski-program-sim.mjs
import fs from 'fs'; import os from 'os'; import path from 'path'; import { pathToFileURL } from 'url';
const KOK = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const { build } = await import(pathToFileURL(path.join(KOK, 'node_modules/esbuild/lib/main.js')).href);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sim-'));
const depo = {};
globalThis.localStorage = { getItem: (k) => depo[k] ?? null, setItem: (k, v) => { depo[k] = String(v); }, removeItem: (k) => { delete depo[k]; } };
globalThis.window = globalThis;
globalThis.document = { documentElement: { lang: 'tr' }, addEventListener() {}, createElement: () => ({ style: {} }) };
const giris = `
export { buildDailySession } from './src/services/sessionBuilder.ts';
export { getUnlockedUnitsForProgramMode, isUnitCompleteForProgramMode } from './src/services/masteryEngine.ts';
export { ActivityType, ERTELE } from './src/types.ts';
export { ALL_SUB_ACHIEVEMENTS } from './src/constants.ts';
export { UNIT_DEFINITIONS } from './src/constants/unitDefinitions.ts';
`;
await build({ stdin: { contents: giris, resolveDir: KOK, loader: 'ts', sourcefile: 'g.ts' }, bundle: true, format: 'esm', platform: 'node', outfile: path.join(tmp, 'b.mjs'), logLevel: 'error', loader: { '.png': 'empty', '.svg': 'empty', '.css': 'empty', '.webp': 'empty' } });
const m = await import(pathToFileURL(path.join(tmp, 'b.mjs')).href);
console.debug = () => {};
const ad = new Map(m.ALL_SUB_ACHIEVEMENTS.map((s) => [String(s.id), s.name]));
const AT = m.ActivityType;

const senaryo = (baslik, basariOf, { ertele = [], gun = 80 } = {}) => {
  const stats = {}; let ts = Date.UTC(2026, 0, 1);
  const overrides = ertele.map((id) => ({ activityId: id, expiresAt: Date.now() + 365 * 864e5, reason: m.ERTELE, ignoreForProgress: true }));
  const odak = []; let son = 0; let takilmaGunu = 0;
  for (let g = 1; g <= gun; g++) {
    const acik = m.getUnlockedUnitsForProgramMode(stats, new Set(), overrides, 6, null);
    const tavan = Math.max(...acik);
    const s = m.buildDailySession(stats, new Set(), undefined, 'medium', tavan, overrides);
    if (!s.activities.length) { console.log(`  gün ${g}: oturum BOŞ`); break; }
    odak.push(s.focusUnit);
    if (s.focusUnit === son) takilmaGunu++; else { takilmaGunu = 1; son = s.focusUnit; }
    for (const a of s.activities) {
      const id = String(a.activityId); const p = basariOf(id); const soru = 8; const dogru = Math.round(p * soru);
      const st = stats[id] || (stats[id] = { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0, history: [] });
      st.attempts++; st.completions++; st.totalCorrect += dogru; st.totalQuestions += soru;
      st.history.push({ timestamp: ts += 60000, score: dogru, total: soru, mode: 'program' });
    }
  }
  // Ünite başına kaç gün odakta kalındı
  const sure = {}; for (const u of odak) sure[u] = (sure[u] || 0) + 1;
  const sonUnite = odak[odak.length - 1];
  console.log(`\n== ${baslik}`);
  console.log('   ünite → gün: ' + Object.entries(sure).map(([u, n]) => `${u}:${n}`).join('  '));
  console.log(`   ${gun} gün sonunda odak ünite: ${sonUnite}${takilmaGunu > 15 ? `  ⚠ ${takilmaGunu} gündür aynı ünitede` : ''}`);
  return { sure, sonUnite };
};

const zor = new Set([String(AT.BeforeAfter), String(AT.SequencingStories)]);
// 1) Her şeyde iyi çocuk (%90)
senaryo('İyi giden çocuk (%90 doğru)', () => 0.9);
// 2) Önce/Sonra ve Sıralama'yı yapamayan çocuk (%20), diğerleri %85
const r2 = senaryo('Önce-Sonra ve Sıralama %20, diğerleri %85', (id) => (zor.has(id) ? 0.2 : 0.85));
// 3) Aynı çocuk, aile bu ikisini ertelemiş
senaryo('Aynı çocuk, Önce-Sonra ve Sıralama ERTELENMİŞ', (id) => (zor.has(id) ? 0.2 : 0.85), { ertele: [...zor] });
// 4) Zorlanan çocuk (%60 genel)
senaryo('Zorlanan çocuk (%60 doğru)', () => 0.6, { gun: 60 });
// 5) Ertelenen etkinlik oturuma giriyor mu?
{
  const stats = {}; const ov = [{ activityId: String(AT.Shapes), expiresAt: Date.now() + 864e5, reason: m.ERTELE, ignoreForProgress: true }];
  let girdi = 0; for (let i = 0; i < 30; i++) { const s = m.buildDailySession(stats, new Set(), undefined, 'medium', 1, ov); if (s.activities.some((a) => String(a.activityId) === String(AT.Shapes))) girdi++; }
  console.log(`\n== Ertelenen "Şekiller" 30 oturumda kaç kez geldi: ${girdi} (0 olmalı)`);
}
// 6) Her ünitedeki etkinliklerin oturuma girebildiği
{
  for (const u of m.UNIT_DEFINITIONS) {
    const gorulen = new Set();
    // önceki üniteleri tamamlanmış say: hepsine %95
    const stats = {}; let ts = 1;
    for (const p of m.UNIT_DEFINITIONS.filter((x) => x.unitNumber < u.unitNumber)) for (const a of p.activities) {
      stats[String(a)] = { attempts: 6, completions: 6, totalCorrect: 46, totalQuestions: 48, history: Array.from({ length: 6 }, () => ({ timestamp: ts++, score: 8, total: 8, mode: 'program' })) };
    }
    for (let i = 0; i < 40; i++) { const s = m.buildDailySession(stats, new Set(), undefined, 'medium', u.unitNumber, []); s.activities.filter((a) => a.sessionRole === 'new').forEach((a) => gorulen.add(String(a.activityId))); }
    const eksik = u.activities.map(String).filter((a) => !gorulen.has(a));
    console.log(`   Ünite ${u.unitNumber}: ${u.activities.length} etkinlik, oturuma giren ${gorulen.size}${eksik.length ? '  ⚠ hiç gelmeyen: ' + eksik.map((x) => ad.get(x) || x).join(', ') : ''}`);
  }
}
// 7) Sınırda çocuk: diğerleri %78, Önce/Sonra %0 → erteleme olmadan 9. ünitede takılır mı?
const ba = String(AT.BeforeAfter);
senaryo('Sınırda çocuk (%78), Önce-Sonra %0 — ertelemesiz', (id) => (id === ba ? 0 : 0.78), { gun: 50 });
senaryo('Sınırda çocuk (%78), Önce-Sonra %0 — Önce-Sonra ERTELENDİ', (id) => (id === ba ? 0 : 0.78), { gun: 50, ertele: [ba] });
