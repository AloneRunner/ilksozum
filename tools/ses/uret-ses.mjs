// ElevenLabs ses üretimi (Kaan, 2026-10-06). Kaan olmadan çalıştırılmaz.
//
// Kullanım:
//   node tools/ses/uret-ses.mjs tools/ses/paketler/ovguler.json        → kuru çalışma: kaç metin, kaç kredi
//   node tools/ses/uret-ses.mjs tools/ses/paketler/ovguler.json --evet → üretir
//   node tools/ses/uret-ses.mjs --metin "Aferin!" --evet
//   --yeniden: listede olanları da baştan üretir (beğenilmeyen kayıtlar için)
//
// - API anahtarı yalnız ortam değişkeninden okunur (ELEVENLABS_API_KEY); hiçbir dosyaya yazılmaz.
// - Daha önce üretilen metin tekrar üretilmez (kredi boşa gitmez).
// - Ses hesaba geçici eklenir, iş bitince çıkarılır (hesapta 10 ses yeri var, 9'u Kaan'ın).
// - Çıktı: public/audio/ses/<dosya>.mp3 + src/data/sesListesi.ts (metin → dosya)
//   + tools/ses/hizalama/<dosya>.json (harf zamanları; ağız hareketi için) + tools/ses/ham/ (temizlenmemiş hali).
// - Her kayıt temizle.mjs ile temizlenir (baştaki/sondaki hışırtı, tık).
import fs from 'fs';
import path from 'path';
import { temizle, olc } from './temizle.mjs';

const KOK = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const SES = { ad: 'gokce', kutuphaneId: 'oPC5I9GKjMReiaM29gjY', sahip: '991994d44c6bfe4b3978666d09e5539d22ad7a82e1ffc137334d524a61057e0f' };
// Kaan (2026-10-06): multilingual_v2 kısa kelimelerde aksanlı ("Aferin" olmadı); v3 doğal ve aksansız.
const AYAR = { model_id: 'eleven_v3', language_code: 'tr' };
const BICIM = 'mp3_44100_64';

const LISTE = path.join(KOK, 'src/data/sesListesi.ts');
const SES_KLASOR = path.join(KOK, 'public/audio/ses');
const HIZA_KLASOR = path.join(KOK, 'tools/ses/hizalama');
const HAM_KLASOR = path.join(KOK, 'tools/ses/ham');

// speechService.ts'deki kayitAnahtari ile aynı olmalı
export const anahtar = (m) => m.normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('tr-TR');
const fnv = (s) => { let h = 0x811c9dc5; for (const c of Buffer.from(s, 'utf8')) { h ^= c; h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };
const dosyaAdi = (k) => `${SES.ad}-${fnv(k)}`;

const listeOku = () => {
  if (!fs.existsSync(LISTE)) return {};
  const m = fs.readFileSync(LISTE, 'utf8').match(/\/\/ BASLA\r?\n([\s\S]*?)\r?\n\/\/ BITIR/);
  if (!m) throw new Error('sesListesi.ts okunamadı; liste silinmesin diye durdu.');
  return m ? JSON.parse(m[1]) : {};
};
const listeYaz = (liste) => {
  const sirali = Object.fromEntries(Object.entries(liste).sort(([a], [b]) => a.localeCompare(b, 'tr')));
  fs.writeFileSync(LISTE, `// Otomatik üretilir: tools/ses/uret-ses.mjs. Elle düzenleme.
// Kayıtlı sesler (ElevenLabs, ${SES.ad}). Anahtar: küçük harfli metin → public/audio/ses/<dosya>.mp3
export const SES_KAYITLARI: Record<string, string> =
// BASLA
${JSON.stringify(sirali, null, 1)}
// BITIR
;
`);
};

const arg = process.argv.slice(2);
const evet = arg.includes('--evet');
const yeniden = arg.includes('--yeniden');
let metinler = [];
const mi = arg.indexOf('--metin');
if (mi >= 0) metinler = [arg[mi + 1]];
else if (arg[0] && !arg[0].startsWith('--')) metinler = JSON.parse(fs.readFileSync(path.resolve(arg[0]), 'utf8'));
if (!metinler.length) { console.log('Paket dosyası ya da --metin "..." verin.'); process.exit(1); }

// Paket satırı "metin" ya da ["metin", "okunuş"] olabilir (ör. "pöf / öğğ" → "pöf, öğğ"; anahtar metin kalır)
const okunus = new Map();
metinler = metinler.map((m) => { if (Array.isArray(m)) { okunus.set(anahtar(m[0]), m[1]); return m[0]; } return m; });
const liste = listeOku();
const gorulen = new Set();
const eksik = metinler.filter((m) => { const k = anahtar(m); if (!k || (liste[k] && !yeniden) || gorulen.has(k)) return false; gorulen.add(k); return true; });
const oku = (m) => (okunus.get(anahtar(m)) ?? m).trim();
const karakter = eksik.reduce((t, m) => t + oku(m).length, 0);
console.log(`${metinler.length} metin · ${metinler.length - eksik.length} zaten var · ${eksik.length} üretilecek · ~${karakter} kredi`);

const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.log('ELEVENLABS_API_KEY ortam değişkeni yok.'); process.exit(1); }
const api = async (yol, govde, yontem = govde ? 'POST' : 'GET') => {
  const r = await fetch(`https://api.elevenlabs.io${yol}`, { method: yontem, headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' }, body: govde ? JSON.stringify(govde) : undefined });
  if (!r.ok) throw new Error(`${yontem} ${yol.split('?')[0]} → ${r.status} ${(await r.text()).slice(0, 200)}`);
  return r.json();
};
const kalan = async () => { const s = await api('/v1/user/subscription'); return s.character_limit - s.character_count; };

console.log(`Hesapta kalan kredi: ${await kalan()}`);
if (!eksik.length) process.exit(0);
if (!evet) { console.log('Kuru çalışma. Üretmek için --evet ekleyin (Kaan onayıyla).'); process.exit(0); }

fs.mkdirSync(SES_KLASOR, { recursive: true });
fs.mkdirSync(HIZA_KLASOR, { recursive: true });
const { voice_id: sesId } = await api(`/v1/voices/add/${SES.sahip}/${SES.kutuphaneId}`, { new_name: `ilksozum-${SES.ad}` });
let n = 0;
try {
  // Starter planı aynı anda 3 isteğe izin veriyor
  const uret = async (m) => {
    const k = anahtar(m);
    const ad = dosyaAdi(k);
    for (let deneme = 1; ; deneme++) {
    let c;
    try {
      c = await api(`/v1/text-to-speech/${sesId}/with-timestamps?output_format=${BICIM}`, { text: oku(m), ...AYAR });
    } catch (e) {
      // harf zamanları alınamazsa yalnız ses (ağız hareketi bu kayıtta olmaz)
      console.log('  zaman damgası yok:', e.message.slice(0, 80));
      const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${sesId}?output_format=${BICIM}`, { method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ text: oku(m), ...AYAR }) });
      if (!r.ok) throw new Error(`TTS → ${r.status} ${(await r.text()).slice(0, 200)}`);
      c = { audio_base64: Buffer.from(await r.arrayBuffer()).toString('base64'), alignment: null };
    }
    const mp3 = path.join(SES_KLASOR, `${ad}.mp3`);
    fs.writeFileSync(mp3, Buffer.from(c.audio_base64, 'base64'));
    fs.mkdirSync(HAM_KLASOR, { recursive: true });
    fs.copyFileSync(mp3, path.join(HAM_KLASOR, `${ad}.mp3`)); // ham hali (temizlik ayarı değişirse yeniden işlenir)
    const [bas, son] = temizle(mp3); // baştaki/sondaki hışırtı ve tıkları at
    const { sure, tepe } = olc(mp3);
    if ((tepe < 0.1 || sure < 0.12) && deneme < 3) { // model bazen ses yerine tık üretiyor ("e" 0,16 sn)
      console.log(`  boş çıktı (${sure.toFixed(2)} sn, tepe ${tepe.toFixed(2)}), yeniden deneniyor`);
      continue;
    }
    if (c.alignment) {
      const kaydir = (t) => Math.max(0, Math.min(son - bas, t - bas));
      const h = c.alignment;
      fs.writeFileSync(path.join(HIZA_KLASOR, `${ad}.json`), JSON.stringify({
        metin: oku(m), model: AYAR.model_id, characters: h.characters,
        character_start_times_seconds: h.character_start_times_seconds.map(kaydir),
        character_end_times_seconds: h.character_end_times_seconds.map(kaydir),
      }));
    }
    break;
    }
    liste[k] = ad;
    listeYaz(liste); // her kayıttan sonra yaz: yarıda kesilirse üretilenler kaybolmaz
    console.log(`✓ ${++n}/${eksik.length} ${m.trim()}`);
  };
  const sira = [...eksik];
  await Promise.all(Array.from({ length: Math.min(3, sira.length) }, async () => { while (sira.length) await uret(sira.shift()); }));
} finally {
  await api(`/v1/voices/${sesId}`, null, 'DELETE').catch((e) => console.log('Ses hesaptan çıkarılamadı:', e.message));
  console.log(`Bitti: ${n} kayıt. Kalan kredi: ${await kalan()}`);
}
