// Gürültülü/Sessiz'in gerçek sesleri: ElevenLabs Ses Efektleri → public/audio/gercek/<ad>.mp3 (Kaan onayıyla çalıştırılır).
// Kullanım: node tools/ses/uret-gercek-ses.mjs        → kuru çalışma
//           node tools/ses/uret-gercek-ses.mjs --evet → üretir (var olan dosya yeniden üretilmez)
import fs from 'fs';
import { execFileSync } from 'child_process';
import { SES_DOSYALARI } from '../../src/data/ciftKavramlar.ts';

const KOK = 'public/audio/gercek', SURE = 2.5, FF = 'node_modules/ffmpeg-static/ffmpeg.exe';
const evet = process.argv.includes('--evet'), key = process.env.ELEVENLABS_API_KEY;
fs.mkdirSync(KOK, { recursive: true });
const kalan = SES_DOSYALARI.filter(([ad]) => !fs.existsSync(`${KOK}/${ad}.mp3`));
console.log(`${kalan.length} ses, tahmini ${Math.round(kalan.length * SURE * 40)} kredi`);
if (!evet) process.exit(0);
if (!key) throw new Error('ELEVENLABS_API_KEY yok');

for (const [ad, text] of kalan) {
  const r = await fetch('https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128', {
    method: 'POST', headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, duration_seconds: SURE, prompt_influence: 0.6 }),
  });
  if (!r.ok) { console.error(ad, r.status, (await r.text()).slice(0, 300)); process.exit(1); }
  const ham = `${KOK}/${ad}.ham.mp3`;
  fs.writeFileSync(ham, Buffer.from(await r.arrayBuffer()));
  // Sesler aynı yükseklikte olsun, baştaki/sondaki kesilme tıklamasın, dosya küçük kalsın
  execFileSync(FF, ['-y', '-loglevel', 'error', '-i', ham, '-af', `loudnorm=I=-20:TP=-3,afade=t=out:st=${SURE - 0.3}:d=0.3`, '-ac', '1', '-b:a', '64k', `${KOK}/${ad}.mp3`]);
  fs.unlinkSync(ham);
  console.log('✓', ad, fs.statSync(`${KOK}/${ad}.mp3`).size);
}
