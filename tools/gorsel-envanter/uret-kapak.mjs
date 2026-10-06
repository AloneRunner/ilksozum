// Kavram menüsü kart kapakları: her kavramın ilk sorusundaki iki görsel (ör. uzun / kısa).
// Kaynak: src/services/database/activities/yeni/*.ts → src/data/kavramKapak.ts (ActivityType adı → [görsel, görsel]).
// Çalıştır: node tools/gorsel-envanter/uret-kapak.mjs  (yeni sorular üretildikten sonra)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const DIR = path.join(ROOT, 'src/services/database/activities/yeni');

const kapak = {};
for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.ts'))) {
  const s = fs.readFileSync(path.join(DIR, f), 'utf8');
  for (const m of s.matchAll(/activityType: ActivityType\.(\w+)/g)) {
    const ad = m[1];
    if (kapak[ad]) continue;
    const sonra = s.slice(m.index, m.index + 4000);
    const gorseller = [...new Set([...sonra.matchAll(/imageUrl: ["'](\/images\/\d+\.webp)["']/g)].map(x => x[1]))].slice(0, 2);
    if (gorseller.length === 2) kapak[ad] = gorseller;
  }
  // Turda tek görsel olan etkinlikler (Rengi Ne?, Bu Kimin?): dosyadaki ilk iki farklı görsel
  const tip = /activityType: ActivityType\.(\w+)/.exec(s)?.[1];
  if (tip && !kapak[tip]) {
    const ilk = [...new Set([...s.matchAll(/imageUrl: ["'](\/images\/\d+\.webp)["']/g)].map(x => x[1]))].slice(0, 2);
    if (ilk.length === 2) kapak[tip] = ilk;
  }
}
// Veri biçimi farklı olanlar (dizi / JSON): elle seçildi
kapak.ColorRecognition ??= ['/images/2307.webp', '/images/5014.webp']; // kırmızı elma, sarı muz
const biberon = /^  371: '([^']+)'/m.exec(fs.readFileSync(path.join(ROOT, 'src/services/database/nesneYeni.ts'), 'utf8'))?.[1];
if (biberon) kapak.WhoseIsThis ??= [biberon, '/images/6316.webp']; // biberon → bebek
// Kıyasla (Zor) kavramları temel kavramın kapağını kullanır
const KIYAS = { RelativeBigSmall: 'BigSmall', RelativeWideNarrow: 'WideNarrow', RelativeThinThick: 'ThinThick', RelativeFewMuch: 'FewMuch', RelativeLongShort: 'LongShort', RelativeNearFar: 'NearFar', RelativeHighLow: 'HighLow' };
for (const [k, v] of Object.entries(KIYAS)) if (kapak[v]) kapak[k] = kapak[v];

const satirlar = Object.keys(kapak).sort().map(k => `  ${k}: ['${kapak[k][0]}', '${kapak[k][1]}'],`);
fs.writeFileSync(path.join(ROOT, 'src/data/kavramKapak.ts'),
  `// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-kapak.mjs. Kavram kartı kapakları (ilk sorunun iki görseli).\n` +
  `export const KAVRAM_KAPAK: Record<string, [string, string]> = {\n${satirlar.join('\n')}\n};\n`);
console.log('kapak', Object.keys(kapak).length);
