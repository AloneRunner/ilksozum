// Program Modu 2 motor testleri: node tools/program/motor-test.mjs
import fs from 'fs'; import os from 'os'; import path from 'path'; import { pathToFileURL } from 'url';
const ROOT = 'D:/projeler/final3';
const { build } = await import(pathToFileURL(path.join(ROOT, 'node_modules/esbuild/lib/main.js')).href);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mt-'));
await build({ entryPoints: [path.join(ROOT, 'src/program/motor.ts')], bundle: true, format: 'esm', platform: 'node', outfile: path.join(tmp, 'b.mjs'), logLevel: 'error' });
const depo = {};
globalThis.localStorage = { getItem: (k) => depo[k] ?? null, setItem: (k, v) => { depo[k] = String(v); }, removeItem: (k) => { delete depo[k]; } };
const m = await import(pathToFileURL(path.join(tmp, 'b.mjs')).href);
let hata = 0;
const ok = (k, msg) => { console.log((k ? '✓ ' : '✗ ') + msg); if (!k) hata++; };
const kayit = (score, total, mode = 'program', gunOnce = 0) => ({ timestamp: Date.now() - gunOnce * 86400000, score, total, mode });
const st = (...h) => ({ attempts: h.length, completions: 0, totalCorrect: 0, totalQuestions: 0, history: h });

// 1) öğrenme kuralı
ok(m.ogrendiMi({ x: st(kayit(5, 6), kayit(6, 6)) }, 'x'), 'son 2 program denemesi %80+ → öğrendi');
ok(!m.ogrendiMi({ x: st(kayit(6, 6), kayit(3, 6)) }, 'x'), 'son deneme düşük → öğrenmedi');
ok(m.ogrendiMi({ x: st(kayit(6, 6, 'free'), kayit(6, 6, 'free'), kayit(6, 6, 'free')) }, 'x'), 'serbest oyunda 3 kez %90+ → öğrendi');

// 2) seviye ilerlemesi: kelimeler L1 (4 etkinlik) → 4'ün %80'i = 4 (ceil 3.2) gerekir
const a0 = m.ayarOku('p1');
let stats = {};
ok(m.kulvarDurumu(stats, a0, 'kelimeler', 'p1').seviye === 0, 'boş profil: kelimeler seviye 1');
for (const e of ['hayvanlar', 'meyveler', 'tasitlar']) stats[e] = st(kayit(6, 6), kayit(6, 6));
ok(m.kulvarDurumu(stats, a0, 'kelimeler', 'p1').seviye === 0, '3/4 öğrenildi → hâlâ seviye 1 (%80 = 4 gerekir)');
stats.oyuncaklar = st(kayit(5, 6), kayit(6, 6));
ok(m.kulvarDurumu(stats, a0, 'kelimeler', 'p1').seviye === 1, '4/4 → seviye 2');

// 3) oturum: uzunluk, tekrar etmeyen, ısınma (eski öğrenilmiş)
const eski = { hayvanlar: st(kayit(6, 6, 'program', 10), kayit(6, 6, 'program', 10)) };
const o = m.oturumKur(eski, a0, 'p1');
ok(o.length === 7, `oturum 7 etkinlik (${o.length})`);
ok(new Set(o.map((x) => String(x.id))).size === o.length, 'oturumda tekrar yok');
ok(o[0].rol === 'isinma' && o[0].id === 'hayvanlar', '10 gün önce öğrenilen hayvanlar ısınma olarak geliyor');
ok(JSON.stringify(m.oturumKur(eski, a0, 'p1')) === JSON.stringify(o), 'aynı gün aynı oturum (önizleme = başlat)');
const kapali = m.oturumKur({}, { ...a0, kapaliKulvarlar: ['okuma', 'el'] }, 'p1');
ok(!kapali.some((x) => x.kulvar === 'okuma' || x.kulvar === 'el'), 'kapalı kulvar oturuma girmiyor');
const odak = m.oturumKur({}, { ...a0, odak: 'kavramlar' }, 'p1');
ok(odak.filter((x) => x.kulvar === 'kavramlar').length >= 2, `odak kulvarı daha çok (${odak.filter((x) => x.kulvar === 'kavramlar').length})`);

// 4) yerleştirme
const y = m.yerlestirmeKur({}, a0, 'p1');
ok(y.length === 5 && !y.some((x) => x.kulvar === 'el' || x.kulvar === 'okuma'), `tanıma turu 5 kulvar (el ve okuma hariç) (${y.length})`);
ok(!m.oturumKur({}, a0, 'p1').some((x) => x.kulvar === 'okuma'), 'okuma varsayılan kapalı: oturumda yok');
ok(m.oturumKur({}, { ...a0, kapaliKulvarlar: [] }, 'p1', 3).length === 7, 'okuma açılınca oturum yine 7');
const yStats = { [String(y[0].id)]: st(kayit(6, 6)), [String(y[1].id)]: st(kayit(2, 6)) };
const d = m.yerlestirmeDegerlendir(yStats, { ...a0, yerlestirme: 'devam', yerlestirmeKuyrugu: y.map((x) => ({ id: x.id, kulvar: x.kulvar })) }, 'p1');
ok(d.atlanan.length === 1 && d.atlanan[0] === y[0].kulvar, `iyi yapılan kulvar atlandı (${d.atlanan})`);
ok(m.kulvarDurumu(yStats, d.ayar, y[0].kulvar, 'p1').seviye === 1, 'atlanan kulvar seviye 2den başlıyor');

// 5) eski Program Modu'ndan geçiş: 5. üniteye gelmiş çocuk
depo['programHighWater_p2'] = '5';
ok(m.kulvarDurumu({}, m.ayarOku('p2'), 'kelimeler', 'p2').seviye === 2, 'eski 5. ünite → kelimeler seviye 3ten');

// 6) oturum bitti işareti
m.programOturumBitti('p3');
ok(m.ayarOku('p3').sonOturum === m.bugun(), 'oturum bitince bugün kaydediliyor');
console.log(hata ? `${hata} HATA` : 'hepsi geçti');
fs.rmSync(tmp, { recursive: true, force: true });
