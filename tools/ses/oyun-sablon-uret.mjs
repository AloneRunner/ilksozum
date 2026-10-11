// Mini oyunlarda kelimeye/ada göre kurulan cümleleri kaynaktan çıkarır, kayıtsız olanları paket olarak yazar (kredi harcamaz).
// Çıktı: tools/ses/paketler/eksik-oyun-sablon.json   (sonra: node tools/ses/uret-ses.mjs <paket> --evet)
import fs from 'fs'; import path from 'path';
const KOK = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const G = path.join(KOK, 'src/components/games');
const oku = (d) => fs.readFileSync(path.join(G, d), 'utf8');
const k = (s) => s.toLocaleLowerCase('tr-TR');
const ilkBuyuk = (s) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);
const hepsi = []; // string | [metin, okunuş]

// Hece Treni: "kelime. Heceleri sırayla diz: he, ce." + kelime
for (const m of oku('SyllableTrainGameScreen.tsx').matchAll(/word:\s*'([^']+)',\s*syllables:\s*\[([^\]]+)\]/g)) {
  const w = k(m[1]); const sy = [...m[2].matchAll(/'([^']+)'/g)].map((x) => k(x[1]));
  hepsi.push(`${w}.`, `Heceleri sırayla diz: ${sy.join(', ')}.`, `${ilkBuyuk(w)}.`);
}
// Kelime Kutusu
for (const m of oku('WordBoxGameScreen.tsx').matchAll(/word:\s*'([^']+)',\s*options/g)) {
  const w = k(m[1]); hepsi.push(`Bu bir ${w}.`, `${w} yazan kelimeyi bul.`, `${w}.`);
}
// Bitki Büyüt
for (const m of oku('PlantGrowingGameScreen.tsx').matchAll(/name:\s*'([^']+)',\s*final/g)) hepsi.push(`${m[1]} yetiştirelim.`, `${m[1]} büyüdü!`);
// Sıralı Ol: rutin başlıkları ve adım cümleleri
const rut = oku('DailyRoutineGameScreen.tsx');
for (const m of rut.matchAll(/title:\s*'([^']+)'/g)) hepsi.push(`${m[1]}.`);
for (const m of rut.matchAll(/A\('[^']+',\s*'[^']+',\s*'([^']+)'/g)) hepsi.push(`${m[1]}.`);
// Renk Dizisi: sayılar
const SAY = ['bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz'];
for (const n of SAY) hepsi.push(`${ilkBuyuk(n)} kere bastın.`, `${n} kere basacaktık.`);
// Büyüklük sıralama
for (const m of oku('SizeOrderingGameScreen.tsx').matchAll(/name:\s*'([^']+)',\s*sizes/g)) {
  const a = m[1] + (/lar$/.test(m[1]) ? 'ı' : 'i');
  hepsi.push(`${a} küçükten büyüğe sırala.`, `${a} büyükten küçüğe sırala.`);
}
hepsi.push('Önce en küçük olana dokun.', 'Önce en büyük olana dokun.');
// Noktaları birleştir: şekil adları
for (const m of oku('ConnectDotsGameScreen.tsx').matchAll(/^\s{8}name:\s*'([^']+)'/gm)) hepsi.push(`${m[1]} tamamlandı.`);
// Yapboz
for (const m of oku('PuzzleGameScreen.tsx').matchAll(/^\s{8}name:\s*'([^']+)'/gm)) hepsi.push(`${m[1]} yapbozu.`);
// Sayma: "5 tane." ve tek sayı
const YAZI = ['bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on'];
YAZI.forEach((y, i) => { hepsi.push([`${i + 1} tane.`, `${ilkBuyuk(y)} tane.`], [`${i + 1}.`, `${ilkBuyuk(y)}.`]); });
// Gölge eşleme / hafıza: nesne adları
for (const f of ['ShadowMatchGameScreen.tsx', 'MemoryMatchGameScreen.tsx']) {
  for (const m of oku(f).matchAll(/name:\s*'([^']+)'/g)) { const w = k(m[1]); hepsi.push(`Bu bir ${w}.`, `İki ${w}.`, `${ilkBuyuk(w)}.`); }
}

// Kayıtlı olanları ayıkla
const liste = JSON.parse(fs.readFileSync(path.join(KOK, 'src/data/sesListesi.ts'), 'utf8').match(/\/\/ BASLA\r?\n([\s\S]*?)\r?\n\/\/ BITIR/)[1]);
const an = (s) => s.normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('tr-TR');
const var2 = (c) => { const x = an(c); return !!(liste[x] || liste[x.replace(/[.!?,]+$/, '')]); };
const gorulen = new Set(); const eksik = [];
for (const h of hepsi) {
  const metin = Array.isArray(h) ? h[0] : h;
  const kk = an(metin).replace(/[.!?,]+$/, '');
  if (!kk || gorulen.has(kk) || var2(metin)) continue;
  gorulen.add(kk); eksik.push(h);
}
const kar = eksik.reduce((t, h) => t + (Array.isArray(h) ? h[1] : h).length, 0);
fs.writeFileSync(path.join(KOK, 'tools/ses/paketler/eksik-oyun-sablon.json'), JSON.stringify(eksik, null, 1));
console.log(`aday ${hepsi.length} · eksik ${eksik.length} · ${kar} karakter (~${Math.round(kar * 0.4)} kredi)`);
