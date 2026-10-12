// Kelimeye göre kurulan cümleler (Aynısını Bul, Hangisi Kayıp, Sayı Sayma, Harf Tablosu) + sabit eksikler.
// Çıktı: tools/ses/paketler/dinamik.json (kayıtsız olanlar). Kredi harcamaz.
import fs from 'fs'; import os from 'os'; import path from 'path'; import { pathToFileURL } from 'url';
const KOK = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const { build } = await import(pathToFileURL(path.join(KOK, 'node_modules/esbuild/lib/main.js')).href);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'din-'));
const depo = {};
globalThis.localStorage = { getItem: (k) => depo[k] ?? null, setItem: (k, v) => { depo[k] = String(v); }, removeItem: () => {} };
globalThis.window = globalThis;
globalThis.document = { documentElement: { lang: 'tr' }, addEventListener() {}, createElement: () => ({ style: {} }) };
const kaynak = fs.readFileSync(path.join(KOK, 'src/services/contentService.ts'), 'utf8') +
  `\nexport { imageData as __imageData };\nexport { SES_KAYITLARI as __ses } from '../data/sesListesi.ts';\n`;
await build({ stdin: { contents: kaynak, resolveDir: path.join(KOK, 'src/services'), loader: 'ts', sourcefile: 'cs.ts' }, bundle: true, format: 'esm', platform: 'node', outfile: path.join(tmp, 'b.mjs'), logLevel: 'error', loader: { '.png': 'empty', '.svg': 'empty', '.css': 'empty', '.webp': 'empty' } });
const m = await import(pathToFileURL(path.join(tmp, 'b.mjs')).href);
const ses = m.__ses; const img = m.__imageData;
const an = (c) => c.normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('tr-TR');
const var2 = (c) => { const k = an(c); const s = k.replace(/[.!?,]+$/, ''); return !!(ses[k] || ses[s] || ses[`${s}.`]); };
const buyuk = (s) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);
const hepsi = [];

// Sabit cümleler
hepsi.push('Bunun aynısı hangisi?', 'Hayır, bu farklı. Aynısını bul.', 'Hangisi farklı?', 'Bu farklı.', 'Hayır, bu aynı. Farklı olanı bul.',
  'Kartların yerini aklında tut ve eşleşen çiftleri bul.', 'Eksik olanı yerleştir.', 'Evet!', 'Hayır!', 'Aferin!');

// Aynısını Bul: "İkisi de X." (yeni fotoğraflar; id >= 2001)
const kelimeler = new Set();
for (const i of img) {
  const u = String(i.imageUrl || ''); const mm = /\/images\/(\d+)\.webp$/.exec(u);
  if (!mm || Number(mm[1]) < 2001 || !i.tags?.category) continue;
  kelimeler.add(String(i.word).toLocaleLowerCase('tr-TR'));
}
for (const w of kelimeler) hepsi.push(`İkisi de ${w}.`);
const nAyni = kelimeler.size;

// Hangisi Kayıp: whatsMissingData sözcükleri
const wm = fs.readFileSync(path.join(KOK, 'src/services/database/activities/reasoning/whatsMissingData.ts'), 'utf8');
const kayip = new Set([...wm.matchAll(/word:\s*'([^']+)'/g)].map((x) => x[1]));
for (const w of kayip) hepsi.push(`${buyuk(w)} kaybolmuştu!`);

// Sayı Sayma: "İki kelebek."
const sg = fs.readFileSync(path.join(KOK, 'src/components/games/SaymaOyunu.tsx'), 'utf8');
const KAT = new Set(['Meyveler', 'Hayvanlar', 'Taşıtlar', 'Oyuncaklar', 'Sebzeler', 'hayvanlar']);
const tan = new Set([...(/const TANIDIK = new Set\(\[([^\]]+)\]/.exec(sg)?.[1] || '').matchAll(/'([^']+)'/g)].map((x) => x[1]));
const havuz = []; const g = new Set();
for (const i of img) { if (!KAT.has(i.tags?.category) || g.has(i.word) || String(i.word).includes(' ') || !/\.webp$/.test(String(i.imageUrl))) continue; g.add(i.word); havuz.push(i.word); }
const sayilacak = havuz.filter((w) => tan.has(w)).length >= 6 ? havuz.filter((w) => tan.has(w)) : havuz;
const SAYI = ['sıfır', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on'];
for (const w of sayilacak) for (let n = 1; n <= 10; n++) hepsi.push(`${buyuk(SAYI[n])} ${w}.`);

// Harf Tablosu
for (const L of 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ') hepsi.push(`Tabloda gizlenen bütün "${L}" harflerini bul.`);

const gorulen = new Set(); const eksik = [];
for (const c of hepsi) { const k = an(c).replace(/[.!?,]+$/, ''); if (gorulen.has(k) || var2(c)) continue; gorulen.add(k); eksik.push(c); }
const kar = eksik.reduce((t, c) => t + c.length, 0);
fs.writeFileSync(path.join(KOK, 'tools/ses/paketler/dinamik.json'), JSON.stringify(eksik, null, 1));
console.log(`ikisi-de havuz ${nAyni} · kayıp ${kayip.size} · sayma ${sayilacak.length}×10 · aday ${hepsi.length} · EKSİK ${eksik.length} · ${kar} karakter (~${Math.round(kar * 0.4)} kredi)`);
