// Gökçe kayıtlarının harf zamanlarını tek dosyada toplar (ağız hareketi için).
// Kullanım: node tools/ses/hizalama-paketle.mjs   → public/audio/ses/hizalama.json
// Biçim: { "<dosya>": ["harfler", [başlangıç, ...], son] }; süreler santisaniye (1/100 sn) tamsayı.
// Uygulama bu dosyayı ancak ağız ekranı açılınca indirir.
import fs from 'fs';
import path from 'path';

const KOK = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const KLASOR = path.join(KOK, 'tools/ses/hizalama');
const SES = path.join(KOK, 'public/audio/ses');
const cs = (t) => Math.round(t * 100);

const cikti = {};
for (const f of fs.readdirSync(KLASOR)) {
  const ad = f.replace(/\.json$/, '');
  if (!fs.existsSync(path.join(SES, `${ad}.mp3`))) continue; // listeden çıkmış kayıt
  const h = JSON.parse(fs.readFileSync(path.join(KLASOR, f), 'utf8'));
  if (!h.characters?.length) continue;
  cikti[ad] = [h.characters.join(''), h.character_start_times_seconds.map(cs), cs(h.character_end_times_seconds.at(-1))];
}
const yol = path.join(SES, 'hizalama.json');
fs.writeFileSync(yol, JSON.stringify(cikti));
console.log(`${Object.keys(cikti).length} kayıt · ${(fs.statSync(yol).size / 1024).toFixed(0)} KB → ${path.relative(KOK, yol)}`);
