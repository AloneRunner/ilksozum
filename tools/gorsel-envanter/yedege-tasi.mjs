// Eski görsel temizliği (Kaan, 2026-10-06): SİLME YOK. Kullanılmayan eski görseller public/ dışına,
// yedek/eski-gorseller/ klasörüne git mv ile taşınır (git geçmişinde de durur).
//
// Uygulamada kalan eski görseller:
//  - vücut bölümleri (organlar) ve ESKI_KALSIN adayları: yeni fotoğraflar çocukta denenecek, geri dönüş için
//  - yenisi olmayan (NESNE_YENI'de karşılığı yok) ve kaynak kodda/verilerde geçen her id
//  - sayı olmayan adlar (yes.gif, no.gif, placeholder.png ...)
// Taşınanlar: yenisi olan (uygulama artık yenisini gösteriyor) ya da hiçbir yerde geçmeyen eski id'ler.
//
// Çalıştır: node tools/gorsel-envanter/yedege-tasi.mjs        (sadece rapor)
//           TASI=1 node tools/gorsel-envanter/yedege-tasi.mjs (git mv ile taşır)
// Geri almak: git mv yedek/eski-gorseller/images/<dosya> public/images/  (realistic için aynı)
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '../..');
const SRC = path.join(ROOT, 'src');

const nesneYeni = fs.readFileSync(path.join(SRC, 'services/database/nesneYeni.ts'), 'utf8');
const yenisiVar = new Set([...nesneYeni.matchAll(/^  (\d+):/gm)].map(m => +m[1]));

// Organlar: vücut bölümleri kategorisindeki her eski id + ESKI_KALSIN adayları
const ORGAN = new Set([555, 557, 559, 560, 561, 562, 563, 949, 981, 479, 597]);
const dbDir = path.join(SRC, 'services/database');
for (const f of fs.readdirSync(dbDir).filter(f => /^imageData-\d/.test(f))) {
  const s = fs.readFileSync(path.join(dbDir, f), 'utf8');
  for (const parca of s.split(/"id":\s*/).slice(1)) if (parca.includes('"Vücudun Bölümleri"')) ORGAN.add(parseInt(parca, 10));
}

// Kaynakta geçen eski id'ler (yenisi yoksa eski dosya gösterilebilir)
const gecen = new Set();
// imageData-xxx kayıtları her zaman yenisine çevrilir (imageData.ts nesneYenile). Diğer dosyalar görseli
// doğrudan açabilir (ör. mini oyunlar imgUrl ile, Gölge Eşleştirme saydam eski çizimle): orada geçen id yenisi olsa da kalır.
const dogrudanGecen = new Set();
const gez = d => {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) { gez(p); continue; }
    if (!/\.(tsx?|json|mjs|js)$/.test(f) || f === 'nesneYeni.ts' || f === 'imageData-yeni.ts') continue;
    const s = fs.readFileSync(p, 'utf8');
    // Adresi id'den kendisi kuran dosya: mini oyun görsel setleri (imgUrl(id) → /images/<id>.png, eşleme yok)
    const idDenKuran = f === 'gameImageSets.ts';
    // Yazılı eski adresler: yenisi varsa ekranda yenisine çevrilir (nesneUrl/SmartImage; kaçan olursa
    // main.tsx'teki eskiGorselYedeginiKur yüklenemeyen eski resmi yenisine geçirir)
    for (const m of s.matchAll(/\/(?:images|realistic)\/(\d+)\.(?:png|gif|webp|jpg)/g)) gecen.add(+m[1]);
    // id alanları (TS ve JSON biçimi); dinamik adresler (/images/${id}) bu alanlardan yakalanır
    for (const m of s.matchAll(/\b["']?(?:imageId|imageIds|id|eskiId|targetId)["']?\s*:\s*\[?\s*(\d+)\b/g)) { gecen.add(+m[1]); if (idDenKuran) dogrudanGecen.add(+m[1]); }
  }
};
gez(SRC);

const kalmali = id => ORGAN.has(id) || dogrudanGecen.has(id) || (!yenisiVar.has(id) && gecen.has(id));

// Yedekte olup artık kalması gerekenleri geri getir: GERI=1
if (process.env.GERI === '1') {
  let n = 0;
  for (const klasor of ['images', 'realistic']) {
    const yd = path.join(ROOT, 'yedek/eski-gorseller', klasor);
    if (!fs.existsSync(yd)) continue;
    const geri = fs.readdirSync(yd).filter(f => { const m = /^(\d+)\./.exec(f); return m && kalmali(+m[1]); });
    for (let i = 0; i < geri.length; i += 200) {
      execFileSync('git', ['mv', '-k', ...geri.slice(i, i + 200).map(f => `yedek/eski-gorseller/${klasor}/${f}`), `public/${klasor}/`], { cwd: ROOT });
    }
    n += geri.length;
  }
  console.log('geri getirildi:', n);
}

const rapor = { tasinan: { images: [], realistic: [] }, kalan: { images: [], realistic: [] } };
let boyut = { tasinan: 0, kalan: 0 };
for (const klasor of ['images', 'realistic']) {
  const dir = path.join(ROOT, 'public', klasor);
  for (const f of fs.readdirSync(dir)) {
    const m = /^(\d+)\.(png|gif|webp|jpg)$/.exec(f);
    if (!m) continue;               // sayı olmayan adlar kalır
    const id = +m[1];
    if (klasor === 'images' && id >= 2001) continue; // yeni görseller
    const b = fs.statSync(path.join(dir, f)).size;
    const tur = kalmali(id) ? 'kalan' : 'tasinan';
    rapor[tur][klasor].push(f);
    boyut[tur] += b;
  }
}
const mb = b => (b / 1048576).toFixed(1) + ' MB';
console.log(`taşınacak: images ${rapor.tasinan.images.length}, realistic ${rapor.tasinan.realistic.length} (${mb(boyut.tasinan)})`);
console.log(`kalacak:   images ${rapor.kalan.images.length}, realistic ${rapor.kalan.realistic.length} (${mb(boyut.kalan)})`);
console.log(`organ id: ${ORGAN.size}`);
fs.writeFileSync(path.join(HERE, 'yedege-tasi.json'), JSON.stringify({ organ: [...ORGAN].sort((a, b) => a - b), ...rapor }, null, 1) + '\n');

if (process.env.TASI === '1') {
  for (const klasor of ['images', 'realistic']) {
    const hedef = path.join(ROOT, 'yedek/eski-gorseller', klasor);
    fs.mkdirSync(hedef, { recursive: true });
    const dosyalar = rapor.tasinan[klasor];
    for (let i = 0; i < dosyalar.length; i += 200) {
      const parca = dosyalar.slice(i, i + 200).map(f => `public/${klasor}/${f}`);
      execFileSync('git', ['mv', '-k', ...parca, `yedek/eski-gorseller/${klasor}/`], { cwd: ROOT });
    }
  }
  console.log('taşındı → yedek/eski-gorseller/');
}
