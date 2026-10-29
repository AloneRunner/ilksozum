// Özel eğitim etkinliklerinin seslendirilecek cümleleri → tools/ses/paketler/ozel-egitim.json
// Çalıştır (proje kökünde): node --experimental-strip-types tools/ses/paket-ozel.mjs
// Sonra: tools/ses/uret-ses.mjs tools/ses/paketler/ozel-egitim.json (ElevenLabs, Kaan onayıyla)
import fs from 'fs';
const V = await import(new URL('../../src/components/ozel/ozelVeri.ts', import.meta.url).href);

const metinler = [
  'Bir öykü seç.', 'Öykü bitti. Aferin!', 'Ne yapalım? Birini seç.', 'Aferin! Hepsini yaptın.',
  'Kartları sırayla diz. Önce hangisi?', 'Aferin! Sıraladın.', 'Kedi nerede? Bul ve dokun.', 'Resme dokun, dinle.',
  'Tebrikler, oyunu bitirdin!',
];
for (const o of V.OYKULER) for (const s of o.sayfalar) metinler.push(s.yazi);
for (const r of V.RUTINLER) for (const a of r.adimlar) metinler.push(a.soz);
for (const d of V.DURUMLAR) { metinler.push(`${d.durum} Nasıl hisseder?`, d.dogru); }
for (const g of V.ZAMIR_GRUPLARI) for (const z of g) { metinler.push(z.soz, `Evet! ${z.soz}`, V.zamirSoru(z)); }
for (const m of V.MEVSIMLER) { metinler.push(m.ad, `Hangisi ${m.ad.toLocaleLowerCase('tr-TR')}?`, m.agacSoz, m.cocukSoz, `Evet! ${m.agacSoz}`, `Evet! ${m.cocukSoz}`); }
for (const k of V.KEDILER) metinler.push(`Buldun! ${k.yer}`);
// Sesin Yeri ve İşlevsel Okuma (sözcüklerin kendisi ve "Evet, bu elma." zaten kayıtlı)
metinler.push('Bir ses seç.', V.OKUMA_SORU, V.YAZI_SORU);
for (const h of V.SES_HARFLERI) metinler.push(V.sesinYeriSoru(h));
for (const y of Object.keys(V.YERLER)) metinler.push(V.sesinYeriDogru(y));
// Ne yapıyor?, Yönerge takibi, Dinle-bul, Toplama, Günler ve aylar
for (const e of V.EYLEMLER) metinler.push(e.soz, e.soru, e.dogru);
for (const [k, y] of V.YONERGE_NESNELER) metinler.push(V.dokunCumle(y), V.onceCumle(y), V.sonraCumle(y), `Evet, bu ${k}.`);
for (const s of V.DINLE_SESLER) metinler.push(V.dinleSoru(s), `Evet, bu ${s.kelime}.`);
metinler.push(V.TOPLAMA_SORU);
for (let n = 2; n <= 10; n++) metinler.push(V.toplamaDogru(n));
V.GUNLER.forEach((g, i) => metinler.push(`${g}.`, V.gunSoru(i), V.evetAd(g), V.bugunCumle(i)));
V.AYLAR.forEach((a, i) => metinler.push(`${a}.`, V.aySoru(i), V.evetAd(a), V.buAyCumle(i)));

// Uygulamanın arama kuralı (speechService.kayitBul / cumleler)
const liste = fs.readFileSync('src/data/sesListesi.ts', 'utf8');
const var_ = new Set([...liste.matchAll(/^ "((?:[^"\\]|\\.)*)":/gm)].map(m => JSON.parse(`"${m[1]}"`)));
const anahtar = t => t.toLocaleLowerCase('tr-TR').normalize('NFC').trim();
const kayitli = t => { const k = anahtar(t), sade = k.replace(/[.!?,]+$/, ''); return var_.has(k) || var_.has(sade) || var_.has(`${sade}.`); };
const cumleler = t => (t.match(/[^.!?]+[.!?]*/g) || []).map(p => p.trim()).filter(Boolean);

const paket = new Set();
for (const t of metinler) {
  if (kayitli(t)) continue;
  const p = cumleler(t);
  // Tırnaklı cümleler bölününce bozulur ("Bugün olmaz." der): bütün olarak kaydedilir
  if (p.length < 2 || /"[^"]*[.!?][^"]*"/.test(t)) { paket.add(t); continue; }
  for (const c of p) if (!kayitli(c)) paket.add(c);
}
const dizi = [...paket].filter(t => /[.!?]$/.test(t) || !paket.has(t + '.'));
fs.writeFileSync('tools/ses/paketler/ozel-egitim.json', JSON.stringify(dizi, null, 1) + '\n');
console.log(`${metinler.length} metin → ${dizi.length} yeni kayıt, ${dizi.join('').length} karakter`);
