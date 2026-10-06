// ElevenLabs ses üretimi (Kaan, 2026-10-06). Kaan olmadan çalıştırılmaz.
//
// Kullanım:
//   node tools/ses/uret-ses.mjs tools/ses/paketler/ovguler.json        → kuru çalışma: kaç metin, kaç kredi
//   node tools/ses/uret-ses.mjs tools/ses/paketler/ovguler.json --evet → üretir
//   node tools/ses/uret-ses.mjs --metin "Aferin!" --evet
//
// - API anahtarı yalnız ortam değişkeninden okunur (ELEVENLABS_API_KEY); hiçbir dosyaya yazılmaz.
// - Daha önce üretilen metin tekrar üretilmez (kredi boşa gitmez).
// - Ses hesaba geçici eklenir, iş bitince çıkarılır (hesapta 10 ses yeri var, 9'u Kaan'ın).
// - Çıktı: public/audio/ses/<dosya>.mp3 + src/data/sesListesi.ts (metin → dosya)
//   + tools/ses/hizalama/<dosya>.json (harf zamanları; ağız hareketi için).
import fs from 'fs';
import path from 'path';

const KOK = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '../..');
const SES = { ad: 'gokce', kutuphaneId: 'oPC5I9GKjMReiaM29gjY', sahip: '991994d44c6bfe4b3978666d09e5539d22ad7a82e1ffc137334d524a61057e0f' };
// Kaan'ın beğendiği ayar: biraz yavaş ve sakin
const AYAR = { model_id: 'eleven_multilingual_v2', language_code: 'tr', voice_settings: { stability: 0.6, similarity_boost: 0.8, speed: 0.85 } };
const BICIM = 'mp3_44100_64';

const LISTE = path.join(KOK, 'src/data/sesListesi.ts');
const SES_KLASOR = path.join(KOK, 'public/audio/ses');
const HIZA_KLASOR = path.join(KOK, 'tools/ses/hizalama');

// speechService.ts'deki kayitAnahtari ile aynı olmalı
export const anahtar = (m) => m.normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('tr-TR');
const fnv = (s) => { let h = 0x811c9dc5; for (const c of Buffer.from(s, 'utf8')) { h ^= c; h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(16).padStart(8, '0'); };
const dosyaAdi = (k) => `${SES.ad}-${fnv(k)}`;

const listeOku = () => {
  if (!fs.existsSync(LISTE)) return {};
  const m = fs.readFileSync(LISTE, 'utf8').match(/\/\/ BASLA\n([\s\S]*)\n\/\/ BITIR/);
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
let metinler = [];
const mi = arg.indexOf('--metin');
if (mi >= 0) metinler = [arg[mi + 1]];
else if (arg[0] && !arg[0].startsWith('--')) metinler = JSON.parse(fs.readFileSync(path.resolve(arg[0]), 'utf8'));
if (!metinler.length) { console.log('Paket dosyası ya da --metin "..." verin.'); process.exit(1); }

const liste = listeOku();
const gorulen = new Set();
const eksik = metinler.filter((m) => { const k = anahtar(m); if (!k || liste[k] || gorulen.has(k)) return false; gorulen.add(k); return true; });
const karakter = eksik.reduce((t, m) => t + m.trim().length, 0);
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
  for (const m of eksik) {
    const k = anahtar(m);
    const ad = dosyaAdi(k);
    const c = await api(`/v1/text-to-speech/${sesId}/with-timestamps?output_format=${BICIM}`, { text: m.trim(), ...AYAR });
    fs.writeFileSync(path.join(SES_KLASOR, `${ad}.mp3`), Buffer.from(c.audio_base64, 'base64'));
    fs.writeFileSync(path.join(HIZA_KLASOR, `${ad}.json`), JSON.stringify({ metin: m.trim(), ...c.alignment }));
    liste[k] = ad;
    listeYaz(liste); // her kayıttan sonra yaz: yarıda kesilirse üretilenler kaybolmaz
    console.log(`✓ ${++n}/${eksik.length} ${m.trim()}`);
  }
} finally {
  await api(`/v1/voices/${sesId}`, null, 'DELETE').catch((e) => console.log('Ses hesaptan çıkarılamadı:', e.message));
  console.log(`Bitti: ${n} kayıt. Kalan kredi: ${await kalan()}`);
}
