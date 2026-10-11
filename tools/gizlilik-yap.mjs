// Uygulamadaki gizlilik metninden (src/services/privacyContent.ts) public/gizlilik.html üretir (TR + EN, tek sayfa).
// Çalıştır: node tools/gizlilik-yap.mjs   → ilksozum.ozarik.org/gizlilik.html
import fs from 'fs'; import os from 'os'; import path from 'path'; import { pathToFileURL } from 'url';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const { build } = await import(pathToFileURL(path.join(ROOT, 'node_modules/esbuild/lib/main.js')).href);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'giz-'));
const depo = {};
globalThis.localStorage = { getItem: (k) => depo[k] ?? null, setItem: (k, v) => { depo[k] = String(v); }, removeItem: () => {} };
globalThis.window = globalThis;
globalThis.document = { documentElement: { lang: 'tr' }, addEventListener() {}, createElement: () => ({ style: {} }) };
const kaynak = fs.readFileSync(path.join(ROOT, 'src/services/privacyContent.ts'), 'utf8') +
  `\nexport { trSections, enSections, trPolicyTitle, enPolicyTitle };\n`;
await build({ stdin: { contents: kaynak, resolveDir: path.join(ROOT, 'src/services'), loader: 'ts', sourcefile: 'p.ts' }, bundle: true, format: 'esm', platform: 'node', outfile: path.join(tmp, 'b.mjs'), logLevel: 'error' });
const m = await import(pathToFileURL(path.join(tmp, 'b.mjs')).href);
const bolum = (liste) => liste.map((s) => `<section><h2>${s.title}</h2><p>${s.content}</p></section>`).join('\n');
const html = `<!doctype html>
<html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Gizlilik Politikası · İlk Sözüm</title>
<style>
body{font:17px/1.6 system-ui,Segoe UI,Arial,sans-serif;margin:0;background:#f6f8fb;color:#1f2933}
main{max-width:760px;margin:0 auto;padding:24px 18px 60px}
section{background:#fff;border-radius:14px;padding:6px 20px;margin:14px 0;box-shadow:0 1px 3px #0001}
h1{font-size:28px}h2{font-size:20px;color:#0f5f8c}hr{border:0;border-top:2px solid #cfd8e3;margin:36px 0}
a{color:#0b79b8}ul{padding-left:20px}
</style></head><body><main>
<h1 id="tr">${m.trPolicyTitle}</h1>
${bolum(m.trSections)}
<hr>
<h1 id="en">${m.enPolicyTitle}</h1>
${bolum(m.enSections)}
</main></body></html>
`;
fs.writeFileSync(path.join(ROOT, 'public/gizlilik.html'), html.replace(/ class="[^"]*"/g, ''));
console.log('public/gizlilik.html', html.length, 'bayt');
