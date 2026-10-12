// ElevenLabs Voice Design: açıklamadan 3 aday ses üretir, örnek cümleyi bu seslerle kaydeder (kalıcı ses oluşturmaz).
// Kullanım: node tools/ses/ses-tasarla.mjs <cikti_klasoru> ["ses tarifi"]   (ELEVENLABS_API_KEY ortam değişkeni)
import fs from 'fs'; import path from 'path';
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) { console.log('ELEVENLABS_API_KEY yok.'); process.exit(1); }
const CIKTI = path.resolve(process.argv[2] || 'ses-adaylari');
const TARIF = process.argv[3] || 'A powerful, deep male stadium announcer, energetic and dramatic, like a boxing ring or esports caster. Booming, confident, slightly raspy, with strong projection and excitement. Speaks Turkish with a native Turkish accent.';
const METIN = '[excited] Hoş geldin şampiyon! [pause] Bakalım bugün sana meydan okumaya cesaret edebilecekler mi? [shouting] Şampiyon oyuna girdi! [pause] Meydan okumaya var mısın?';
fs.mkdirSync(CIKTI, { recursive: true });
const r = await fetch('https://api.elevenlabs.io/v1/text-to-voice/design', {
  method: 'POST', headers: { 'xi-api-key': KEY, 'Content-Type': 'application/json' },
  body: JSON.stringify({ voice_description: TARIF, text: METIN, model_id: 'eleven_ttv_v3', auto_generate_text: false }),
});
const j = await r.json();
if (!r.ok) { console.log('HATA', r.status, JSON.stringify(j).slice(0, 400)); process.exit(1); }
const adaylar = j.previews || [];
console.log(adaylar.length, 'aday');
const kayit = [];
adaylar.forEach((a, i) => {
  const dosya = path.join(CIKTI, `aday-${i + 1}.mp3`);
  fs.writeFileSync(dosya, Buffer.from(a.audio_base_64, 'base64'));
  kayit.push({ no: i + 1, generated_voice_id: a.generated_voice_id, sure: a.duration_secs, dosya });
  console.log(`aday-${i + 1}: ${a.duration_secs?.toFixed?.(1)} sn  ${a.generated_voice_id}`);
});
fs.writeFileSync(path.join(CIKTI, 'adaylar.json'), JSON.stringify({ tarif: TARIF, metin: METIN, adaylar: kayit }, null, 1));
