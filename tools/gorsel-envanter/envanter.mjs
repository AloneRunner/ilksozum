// Görsel envanteri üretici.
// Çalıştır:  node tools/gorsel-envanter/envanter.mjs
// Çıktı:     tools/gorsel-envanter/envanter.html (tarayıcıda aç) + envanter.json
//
// Her görselin hangi soruda, hangi rolde (doğru/yanlış şık) kullanıldığını,
// hiç kullanılmayanları ve her sorunun şıklarını yan yana gösterir.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const SRC = path.join(ROOT, 'src');
const { build } = await import(pathToFileURL(path.join(ROOT, 'node_modules/esbuild/lib/main.js')).href);
const rel = p => path.relative(ROOT, p).replace(/\\/g, '/');

// ---- 1) Veri dosyalarını bul ----
function listTs(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) listTs(p, out);
    else if (/\.ts$/.test(e.name) && !/backup|\.bak|^index\.ts$/.test(e.name)) out.push(p);
  }
  return out;
}
const dataFiles = [...listTs(path.join(SRC, 'services/database/activities')), ...listTs(path.join(SRC, 'data'))];

// Uygulamada hiç import edilmeyen (ölü) dosyalar
const allCode = [];
(function collect(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== 'i18n') collect(p); }
    else if (/\.tsx?$/.test(e.name)) allCode.push([p, fs.readFileSync(p, 'utf8')]);
  }
})(SRC);
const isImported = f => {
  const b = path.basename(f, '.ts');
  const re = new RegExp(`['"/]${b}(\\.ts|\\.js)?['"]`);
  return allCode.some(([p, t]) => p !== f && re.test(t));
};
const deadFiles = new Set(dataFiles.filter(f => !isImported(f)).map(rel));
const worksheetOnly = f => /activities\/objects\/en/.test(f);

// ---- 2) Hepsini tek bundle'da yükle ----
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gorsel-envanter-'));
const imp = p => pathToFileURL(p).href.replace('file:///', '');
const entry = dataFiles.map((f, i) => `import * as m${i} from '${imp(f)}'; export const f${i} = ['${rel(f)}', m${i}];`).join('\n') + `
import { imageData } from '${imp(path.join(SRC, 'services/database/imageData.ts'))}'; export { imageData };
import * as comm from '${imp(path.join(SRC, 'services/communicationData.ts'))}'; export const commMod = comm;
import { ActivityType } from '${imp(path.join(SRC, 'types.ts'))}'; export { ActivityType };
import { ALL_SUB_ACHIEVEMENTS, OBJECT_CATEGORIES } from '${imp(path.join(SRC, 'constants.ts'))}'; export { ALL_SUB_ACHIEVEMENTS, OBJECT_CATEGORIES };
`;
fs.writeFileSync(path.join(tmp, 'entry.ts'), entry);
await build({
  entryPoints: [path.join(tmp, 'entry.ts')], bundle: true, format: 'esm', platform: 'node',
  outfile: path.join(tmp, 'bundle.mjs'), loader: { '.json': 'json', '.png': 'empty', '.mp3': 'empty', '.css': 'empty' },
  logLevel: 'error', define: { 'import.meta.env': '{"DEV":true}' }, // yeni sorular açıkken (hedef durum)
  external: ['@capacitor/*', '@capacitor-community/*', '@revenuecat/*'],
});
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };
globalThis.window = globalThis;
const mod = await import(pathToFileURL(path.join(tmp, 'bundle.mjs')).href);
fs.rmSync(tmp, { recursive: true, force: true });

// Etkinlik adları (Türkçe)
const AT = mod.ActivityType;
const trName = {};
for (const s of mod.ALL_SUB_ACHIEVEMENTS) if (typeof s.id === 'number') trName[s.id] = s.name;
const activityLabel = v => {
  if (v == null) return '';
  if (typeof v === 'number') return trName[v] || AT[v] || String(v);
  return String(v);
};

// ---- 3) Soruları dolaş ----
const idFromUrl = u => { const m = /\/images\/(\d+)\.(png|gif|jpe?g|webp)/i.exec(u || ''); return m ? +m[1] : null; };
const uses = new Map();   // id -> [{src, activity, question, role, round}]
const rounds = [];        // {src, status, activity, question, options:[{id, word, role}]}
const add = (id, u) => { if (id == null || isNaN(id)) return; if (!uses.has(id)) uses.set(id, []); uses.get(id).push(u); };
const OPT_KEYS = ['options', 'choices', 'items', 'cards', 'images', 'sequence', 'pairs'];

const seen = new WeakSet();
function walk(node, src, ctx) {
  if (!node || typeof node !== 'object' || seen.has(node)) return;
  seen.add(node);
  if (Array.isArray(node)) { node.forEach(n => walk(n, src, ctx)); return; }
  const q = typeof node.question === 'string' ? node.question
    : (node.question && typeof node.question === 'object' ? (node.question.tr || '') : null);
  const activity = node.activityType ?? ctx.activity;
  const question = q ?? ctx.question;
  const keys = OPT_KEYS.filter(k => Array.isArray(node[k]));
  let round = null;
  for (const k of keys) {
    for (const o of node[k]) {
      if (!o || typeof o !== 'object') continue;
      if (typeof o.imageUrl === 'string' && o.imageUrl.startsWith('data:')) {
        if (!round) { round = { src: src.file, status: src.status, activity: activityLabel(activity), question: question || '', options: [] }; rounds.push(round); }
        round.options.push({ id: null, svg: o.imageUrl, word: o.word || '', role: o.isCorrect === true ? 'doğru' : o.isCorrect === false ? 'yanlış' : 'şık' });
        continue;
      }
      const id = idFromUrl(o.imageUrl || o.image || o.img) ?? (typeof o.imageId === 'number' ? o.imageId : null)
        ?? (typeof o.id === 'number' && (o.imageUrl || o.word) ? o.id : null);
      if (id == null) continue;
      if (!round) { round = { src: src.file, status: src.status, activity: activityLabel(activity), question: question || '', options: [] }; rounds.push(round); }
      const role = o.isCorrect === true ? 'doğru' : o.isCorrect === false ? 'yanlış' : 'şık';
      round.options.push({ id, word: o.word || o.label || '', role });
      add(id, { src: src.file, status: src.status, activity: activityLabel(activity), question: question || '', role, round: rounds.length - 1 });
    }
  }
  for (const [k, v] of Object.entries(node)) {
    if (round && keys.includes(k)) continue;
    if (typeof v === 'string' && !round) {
      const id = idFromUrl(v);
      if (id != null) add(id, { src: src.file, status: src.status, activity: activityLabel(activity), question: question || '', role: k });
    } else if (v && typeof v === 'object') walk(v, src, { activity, question });
  }
}
for (const [k, v] of Object.entries(mod)) {
  if (!/^f\d+$/.test(k)) continue;
  const [file, m] = v;
  const status = deadFiles.has(file) ? 'ölü' : worksheetOnly(file) ? 'çalışma kağıdı' : 'aktif';
  for (const ev of Object.values(m)) walk(ev, { file, status }, {});
}

// İletişim kartları
JSON.stringify(mod.commMod, (key, val) => {
  if (key === 'imageId' && typeof val === 'number') add(val, { src: 'src/services/communicationData.ts', status: 'aktif', activity: 'İletişim Kartları', question: '', role: 'kart' });
  return val;
});

// Bileşenlerde sabit yazılmış referanslar
const structured = new Set(dataFiles.map(rel).concat(['src/services/communicationData.ts']));
for (const [p, t] of allCode) {
  const r = rel(p);
  if (structured.has(r) || /imageData/.test(r)) continue;
  t.split('\n').forEach((ln, i) => {
    for (const m of ln.matchAll(/\/images\/(\d+)\.(png|gif|jpe?g)/gi)) add(+m[1], { src: `${r}:${i + 1}`, status: 'aktif', activity: 'Kod içinde', question: '', role: 'sabit' });
    for (const m of ln.matchAll(/imageId\s*:\s*(\d+)/g)) add(+m[1], { src: `${r}:${i + 1}`, status: 'aktif', activity: 'Kod içinde', question: '', role: 'kapak' });
  });
}

// Etiketlerine göre otomatik soru üreten etkinlikler (contentService.ts)
const reg = new Map(mod.imageData.map(x => [x.id, x]));
const dyn = (id, activity, role) => add(id, { src: 'src/services/contentService.ts', status: 'aktif', activity, question: '(etikete göre otomatik)', role });
for (const x of mod.imageData) {
  const t = x.tags || {};
  if (t.color) dyn(x.id, 'Renkler', 'renk: ' + [].concat(t.color).join(', '));
  if (t.shape) dyn(x.id, 'Şekiller', 'şekil: ' + [].concat(t.shape).join(', '));
  if (t.emotion) dyn(x.id, 'Duygular', 'duygu: ' + [].concat(t.emotion).join(', '));
}
const cs = fs.readFileSync(path.join(SRC, 'services/contentService.ts'), 'utf8');
const yn = /YES_NO_ALLOWED_IDS\s*=\s*new Set\(\[([\s\S]*?)\]\)/.exec(cs);
if (yn) for (const n of yn[1].match(/\d+/g) || []) dyn(+n, 'Evet / Hayır', 'havuz');

// ---- 4) Kayıt + dosyalar ----
const imgDir = path.join(ROOT, 'public/images');
const filesById = new Map();
const extraFiles = [];
for (const f of fs.readdirSync(imgDir)) {
  const size = fs.statSync(path.join(imgDir, f)).size;
  const m = /^(\d+)\.(\w+)$/.exec(f);
  if (!m) { extraFiles.push({ name: f, size }); continue; }
  if (!filesById.has(+m[1])) filesById.set(+m[1], []);
  filesById.get(+m[1]).push({ name: f, size });
}

const norm = s => (s || '').toString().toLocaleLowerCase('tr-TR').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
  .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]/g, '');
const objNorm = mod.OBJECT_CATEGORIES.map(c => norm(c.id));

const ids = [...new Set([...filesById.keys(), ...reg.keys(), ...uses.keys()])].sort((a, b) => a - b);
const images = ids.map(id => {
  const r = reg.get(id);
  const cat = r?.tags?.category || '';
  const pool = !!cat && objNorm.some(a => norm(cat).includes(a) || a.includes(norm(cat)));
  const { category, lifeform, syllables, letters, ...tags } = r?.tags || {};
  const u = uses.get(id) || [];
  return {
    id, word: r?.word || '', category: cat, tags, files: filesById.get(id) || [],
    registered: !!r, pool, uses: u,
    activeUses: u.filter(x => x.status === 'aktif').length,
  };
});

// Şüpheli sorular: 2 şıklı kavram sorusunda şıklar farklı nesne
for (const r of rounds) {
  const words = [...new Set(r.options.filter(o => o.id != null).map(o => norm(reg.get(o.id)?.word || o.word)).filter(Boolean))];
  const isConcept = /activities\/(qualities|quantities|spatial)\//.test(r.src);
  r.differentObjects = isConcept && r.options.length === 2 && r.options.every(o => o.id != null) && words.length === 2;
  r.missingFile = r.options.some(o => o.id != null && !filesById.has(o.id));
}

rounds.sort((a, b) => a.activity.localeCompare(b.activity, 'tr') || a.src.localeCompare(b.src));
for (const im of images) for (const u of im.uses) if (u.round != null) u.round = undefined;
const data = { generatedAt: new Date().toISOString(), images, rounds, extraFiles, deadFiles: [...deadFiles] };
fs.writeFileSync(path.join(HERE, 'envanter.json'), JSON.stringify(data));
const tpl = fs.readFileSync(path.join(HERE, 'sablon.html'), 'utf8');
fs.writeFileSync(path.join(HERE, 'envanter.html'), tpl.replace('/*__DATA__*/null', JSON.stringify(data).replace(/</g, '\\u003c')));

const unused = images.filter(i => i.files.length && !i.activeUses && !i.pool);
console.log(`Görsel: ${images.length} | aktif soruda: ${images.filter(i => i.activeUses).length} | yalnız nesne havuzunda: ${images.filter(i => !i.activeUses && i.pool).length} | hiç kullanılmayan: ${unused.length} (${(unused.reduce((s, i) => s + i.files.reduce((a, f) => a + f.size, 0), 0) / 1048576).toFixed(1)} MB)`);
console.log(`Soru: ${rounds.length} | farklı nesne çifti: ${rounds.filter(r => r.differentObjects).length} | dosyası eksik: ${rounds.filter(r => r.missingFile).length}`);
for (const r of rounds.filter(r => r.missingFile && r.status === 'aktif'))
  console.log(`  Dosyası eksik: ${r.src} — "${r.question}" → ${r.options.filter(o => o.id != null && !filesById.has(o.id)).map(o => '#' + o.id).join(', ')}`);
console.log(`Ölü veri dosyaları: ${[...deadFiles].join(', ')}`);
