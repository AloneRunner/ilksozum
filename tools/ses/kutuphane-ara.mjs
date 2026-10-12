// ElevenLabs Voice Library araması: aday seslerin örnek mp3'lerini klasöre indirir (kredi harcamaz).
// Kullanım: node tools/ses/kutuphane-ara.mjs <cikti_klasoru> <arama1> [arama2 ...]
import fs from 'fs'; import path from 'path';
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.log('ELEVENLABS_API_KEY yok.'); process.exit(1); }
const CIKTI = path.resolve(process.argv[2]);
const ARAMALAR = process.argv.slice(3);
fs.mkdirSync(CIKTI, { recursive: true });
const gorulen = new Map();
for (const q of ARAMALAR) {
  const url = new URL('https://api.elevenlabs.io/v1/shared-voices');
  url.searchParams.set('search', q); url.searchParams.set('page_size', '12'); url.searchParams.set('sort', 'usage_character_count_1y');
  const r = await fetch(url, { headers: { 'xi-api-key': KEY } });
  if (!r.ok) { console.log('HATA', q, r.status, (await r.text()).slice(0, 200)); continue; }
  const j = await r.json();
  for (const v of j.voices || []) if (!gorulen.has(v.voice_id)) gorulen.set(v.voice_id, { ...v, arama: q });
}
const liste = [...gorulen.values()];
console.log(liste.length, 'ses bulundu');
let n = 0; const kayit = [];
for (const v of liste) {
  if (!v.preview_url) continue;
  n++;
  const ad = `${String(n).padStart(2, '0')}-${v.name.replace(/[^\p{L}\p{N}]+/gu, '_').slice(0, 24)}.mp3`;
  try {
    const b = Buffer.from(await (await fetch(v.preview_url)).arrayBuffer());
    fs.writeFileSync(path.join(CIKTI, ad), b);
    kayit.push({ no: n, ad, voice_id: v.voice_id, sahip: v.public_owner_id, arama: v.arama, dil: v.language, aksan: v.accent, yas: v.age, cinsiyet: v.gender, kullanim: v.use_case, aciklama: (v.description || '').slice(0, 140) });
    console.log(`${String(n).padStart(2, '0')} ${v.name} | ${v.gender || '?'} | ${v.accent || '?'} | ${v.use_case || '?'} | ${(v.description || '').slice(0, 70)}`);
  } catch (e) { console.log('indirilemedi', v.name); }
}
fs.writeFileSync(path.join(CIKTI, 'kutuphane.json'), JSON.stringify(kayit, null, 1));
