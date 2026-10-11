// Harf hikâyeleri (src/services/staticData.ts) cümlelerini çıkarır; kayıtsız olanları paket yazar. Kredi harcamaz.
// Çıktı: tools/ses/paketler/hikayeler.json  (üretmek için: node tools/ses/uret-ses.mjs tools/ses/paketler/hikayeler.json --evet)
import fs from 'fs'; import path from 'path';
const KOK = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const kaynak = fs.readFileSync(path.join(KOK, 'src/services/staticData.ts'), 'utf8');
const liste = JSON.parse(fs.readFileSync(path.join(KOK, 'src/data/sesListesi.ts'), 'utf8').match(/\/\/ BASLA\r?\n([\s\S]*?)\r?\n\/\/ BITIR/)[1]);
const an = (s) => s.normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('tr-TR');
const var2 = (c) => { const k = an(c); return !!(liste[k] || liste[k.replace(/[.!?,]+$/, '')]); };
const re = /title:\s*'((?:[^'\\]|\\.)*)',\s*story:\s*'((?:[^'\\]|\\.)*)'/g;
const cumleler = (s) => (s.match(/[^.!?]+[.!?]*/g) || []).map((x) => x.trim()).filter(Boolean);
let m; let n = 0; const hepsi = new Map();
while ((m = re.exec(kaynak))) {
  n++;
  const t = m[1].replace(/\\'/g, "'"); const st = m[2].replace(/\\'/g, "'");
  // Uygulama "Başlık. Hikâye" okuyor (StoryScreen): başlığın sonuna nokta konur
  for (const c of cumleler(`${t}. ${st}`)) hepsi.set(an(c).replace(/[.!?,]+$/, ''), c);
}
const eksik = [...hepsi.values()].filter((c) => !var2(c));
const kar = eksik.reduce((t, c) => t + c.length, 0);
fs.writeFileSync(path.join(KOK, 'tools/ses/paketler/hikayeler.json'), JSON.stringify(eksik, null, 1));
console.log(`hikâye ${n} · benzersiz cümle ${hepsi.size} · kayıtsız ${eksik.length} · ${kar} karakter (~${Math.round(kar * 0.4)} kredi)`);
