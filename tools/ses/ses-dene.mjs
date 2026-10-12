// Kütüphane sesini hesaba ekler ve verilen cümleleri üretir.
// Kullanım: node tools/ses/ses-dene.mjs <kutuphane.json> <no> <cikti_klasoru> <ses_adi> <cumleler.json> [--evet]
import fs from 'fs'; import path from 'path';
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.log('ELEVENLABS_API_KEY yok.'); process.exit(1); }
const [kj, no, cikti, ad, cj] = process.argv.slice(2);
const evet = process.argv.includes('--evet');
const v = JSON.parse(fs.readFileSync(kj, 'utf8')).find((x) => x.no === Number(no));
if (!v) { console.log('No bulunamadı'); process.exit(1); }
const cumleler = JSON.parse(fs.readFileSync(cj, 'utf8'));
const kar = cumleler.reduce((t, c) => t + c.metin.length, 0);
console.log(`${v.ad} · ${cumleler.length} cümle · ${kar} karakter (~${Math.round(kar * 0.4)} kredi)`);
if (!evet) { console.log('Kuru çalışma (--evet ile üret).'); process.exit(0); }
const api = async (yol, govde, yontem = govde ? 'POST' : 'GET') => {
  const r = await fetch(`https://api.elevenlabs.io${yol}`, { method: yontem, headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' }, body: govde ? JSON.stringify(govde) : undefined });
  if (!r.ok) throw new Error(`${yontem} ${yol.split('?')[0]} → ${r.status} ${(await r.text()).slice(0, 200)}`);
  return r;
};
const ekle = await (await api(`/v1/voices/add/${v.sahip}/${v.voice_id}`, { new_name: ad })).json();
const sesId = ekle.voice_id;
fs.mkdirSync(cikti, { recursive: true });
for (const c of cumleler) {
  const r = await api(`/v1/text-to-speech/${sesId}?output_format=mp3_44100_128`, { text: c.metin, model_id: 'eleven_v3', language_code: 'tr' });
  const dosya = path.join(cikti, `${c.ad}.mp3`);
  fs.writeFileSync(dosya, Buffer.from(await r.arrayBuffer()));
  console.log('✓', c.ad);
}
console.log('Ses hesabında:', ad, sesId);
