// Düzeltilen seslerin dinleme sayfası: eski (yedek) ve yeni yan yana. Çıktı: tools/ses/dinle/duzeltme.html
import fs from 'fs'; import path from 'path';
const KOK = 'D:/projeler/final3';
const liste = JSON.parse(fs.readFileSync(path.join(KOK, 'src/data/sesListesi.ts'), 'utf8').match(/\/\/ BASLA\r?\n([\s\S]*?)\r?\n\/\/ BITIR/)[1]);
const paket = JSON.parse(fs.readFileSync(path.join(KOK, 'tools/ses/paketler/duzeltme-1.json'), 'utf8'));
const yedek = 'tools/ses/yedek/2026-10-11';
const satir = paket.map(([k, okunus]) => {
  const dosya = liste[k]; if (!dosya) return '';
  const eski = fs.existsSync(path.join(KOK, yedek, `${dosya}.mp3`));
  return `<tr><td><b>${k}</b><br><small>okunuş: ${okunus}</small></td>
<td>${eski ? `<audio controls src="../../../${yedek}/${dosya}.mp3"></audio>` : '<small>(eskisi yoktu)</small>'}</td>
<td><audio controls src="../../../public/audio/ses/${dosya}.mp3"></audio></td>
<td><label><input type="radio" name="${k}"> iyi</label> <label><input type="radio" name="${k}"> bozuk</label></td></tr>`;
}).join('\n');
fs.mkdirSync(path.join(KOK, 'tools/ses/dinle'), { recursive: true });
fs.writeFileSync(path.join(KOK, 'tools/ses/dinle/duzeltme.html'), `<!doctype html><meta charset="utf-8"><title>Ses kontrol</title>
<style>body{font:18px sans-serif;margin:24px;max-width:900px}td,th{padding:10px;border-bottom:1px solid #ddd;text-align:left}</style>
<h1>Düzeltilen sesler</h1><p>Eski ve yeni sesi dinleyin; yeni ses doğru okunuyor mu?</p>
<table><tr><th>Kelime</th><th>Eski</th><th>Yeni</th><th>Karar</th></tr>${satir}</table>`);
console.log('tools/ses/dinle/duzeltme.html');
