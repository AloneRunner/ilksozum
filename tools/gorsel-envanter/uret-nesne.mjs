// Nesne turu: eski nesne görsellerinin yeni karşılıklarını bağlar.
// Çalıştır: node tools/gorsel-envanter/uret-nesne.mjs && node tools/gorsel-envanter/gorsel-isle.mjs
// Kaynaklar:
//  1) gorsel-ham/nesne/<eskiId>-<ad>.jpg  → yeni görsel, id = 8000 + eskiId (sabit, takibi kolay)
//  2) nesne-esleme.json { "<eskiId>": "<kavram klasörü>/<dosya>.jpg" } → kavram turundan hazır görsel yeniden kullanılır
// Çıktı: yeni-gorseller.json ('nesne/' kayıtları), src/services/database/nesneYeni.ts (eskiId → yeni adres)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const RAW = path.join(ROOT, 'gorsel-ham');
const LIST = path.join(HERE, 'yeni-gorseller.json');
const OUT = path.join(ROOT, 'src/services/database/nesneYeni.ts');
const ESLEME = path.join(HERE, 'nesne-esleme.json');

const liste = JSON.parse(fs.readFileSync(LIST, 'utf8'));
const nesneler = JSON.parse(fs.readFileSync(path.join(HERE, 'nesne-liste.json'), 'utf8')).kategoriler;
const eskiKayit = Object.fromEntries(Object.values(nesneler).flat().map(e => [e.id, e]));

// Renkli/gri zeminli nesneler (beyaz hayvan gri zeminde, deniz hayvanı mavi zeminde): zemin beyazlatılmaz
const SAHNE = new Set([26, 460, 491, 921, 948, 95, 169, 251, 301, 422, 423, 424, 708, 798, 799, 815, 855, 933, 929, 211, 302, 941]);
const harita = {};
const renkler = {}; // eşlemede renk verilirse (Kaan: eski renge uymak gerekmez) kayıttaki renk etiketi yenisiyle değişir
const yeni = [];
// 1) Yeni nesne görselleri
const klasor = path.join(RAW, 'nesne');
if (fs.existsSync(klasor)) {
  for (const f of fs.readdirSync(klasor).filter(f => f.endsWith('.jpg')).sort()) {
    const eskiId = Number(f.split('-')[0]);
    if (!eskiId || !eskiKayit[eskiId]) { console.log('tanınmayan dosya:', f); continue; }
    const id = 8000 + eskiId;
    yeni.push({ id, kaynak: `nesne/${f}`, word: eskiKayit[eskiId].word, category: 'none', ...(SAHNE.has(eskiId) ? { sahne: true } : {}), tags: { nesneEskiId: eskiId } });
    harita[eskiId] = `/images/${id}.webp`;
  }
}
// 2) Kavram turlarından yeniden kullanılanlar (kaynak dosyası zaten yeni-gorseller.json'da kayıtlı olmalı)
const esleme = fs.existsSync(ESLEME) ? JSON.parse(fs.readFileSync(ESLEME, 'utf8')) : {};
const kaynaktanId = Object.fromEntries([...liste.gorseller, ...yeni].map(g => [g.kaynak, g.id]));
for (const [eskiId, deger] of Object.entries(esleme)) {
  if (harita[eskiId]) continue; // kendi yeni görseli varsa o öncelikli
  const kaynak = typeof deger === 'string' ? deger : deger.kaynak;
  if (typeof deger === 'object' && deger.renk) renkler[eskiId] = deger.renk;
  const id = kaynaktanId[kaynak];
  if (!id) { console.log('eşleme kaynağı kayıtlı değil:', eskiId, kaynak); continue; }
  harita[eskiId] = `/images/${id}.webp`;
}

// 3) Uygulamada hiç olmayan yeni kelimeler (Kaan: "önceden olmayan yeni şeyler de ekle").
//    nesne-yeni-kelimeler.json: [{ ad, word, category, color? }] — sıra sabit, id = 9001 + sıra (yalnız sona ekle).
//    Dosya: gorsel-ham/nesne-yeni/<ad>.jpg. Kendi kategorisinde nesne havuzuna girer (hece/harf gorsel-isle'de).
const YENI_KELIME = path.join(HERE, 'nesne-yeni-kelimeler.json');
const yeniKelimeler = fs.existsSync(YENI_KELIME) ? JSON.parse(fs.readFileSync(YENI_KELIME, 'utf8')) : [];
let yeniKelimeSay = 0;
yeniKelimeler.forEach((k, i) => {
  const dosya = `nesne-yeni/${k.ad}.jpg`;
  if (!fs.existsSync(path.join(RAW, dosya))) return;
  yeni.push({ id: 9001 + i, kaynak: dosya, word: k.word, category: k.category, ...(k.sahne ? { sahne: true } : {}), tags: k.color ? { color: k.color } : {} });
  yeniKelimeSay++;
});

liste.gorseller = [...liste.gorseller.filter(g => !g.kaynak.startsWith('nesne/') && !g.kaynak.startsWith('nesne-yeni/')), ...yeni].sort((a, b) => a.id - b.id);
fs.writeFileSync(LIST, JSON.stringify(liste, null, 2) + '\n');

const satirlar = Object.entries(harita).sort((a, b) => a[0] - b[0]).map(([k, v]) => `  ${k}: '${v}', // ${eskiKayit[k]?.word ?? ''}`);
fs.writeFileSync(OUT, `// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-nesne.mjs. Elle düzenleme.
// Eski nesne görseli id → yeni gerçekçi görsel adresi (services/nesneGorsel.ts kullanır).
export const NESNE_YENI: Record<number, string> = {
${satirlar.join('\n')}
};

// Yeni görselin rengi eskisinden farklıysa (renk soruları doğru kalsın)
export const NESNE_RENK: Record<number, string> = ${JSON.stringify(renkler)};
`);
const toplam = Object.keys(eskiKayit).length;
console.log(`nesne: ${yeni.length - yeniKelimeSay} yeni görsel, ${yeniKelimeSay} yeni kelime, ${Object.keys(harita).length - (yeni.length - yeniKelimeSay)} yeniden kullanım; ${Object.keys(harita).length}/${toplam} nesne yeni`);
