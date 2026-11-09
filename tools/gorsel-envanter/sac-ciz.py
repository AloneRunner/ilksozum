# Islak/Kuru saç çifti (Gökhan Hoca, 2026-11-09: "aynı kişi ya da sade çizim"): aynı çocuk, yalnız saç değişir.
# Çalıştır: python tools/gorsel-envanter/sac-ciz.py  → public/images/3307.webp (ıslak), 3308.webp (kuru)
import math, os, random, subprocess, tempfile
from pathlib import Path
from PIL import Image

KOK = Path(__file__).resolve().parents[2]
EDGE = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'

def yuz():
    return '''
    <path d="M96 512 C100 410 170 372 256 372 C342 372 412 410 416 512 Z" fill="#3b82f6"/>
    <rect x="222" y="330" width="68" height="62" rx="24" fill="#eebd96"/>
    <circle cx="136" cy="262" r="24" fill="#f3c6a2"/><circle cx="376" cy="262" r="24" fill="#f3c6a2"/>
    <circle cx="256" cy="244" r="122" fill="#f8d3b4"/>
    <circle cx="210" cy="250" r="13" fill="#2f2118"/><circle cx="302" cy="250" r="13" fill="#2f2118"/>
    <circle cx="214" cy="245" r="4" fill="#fff"/><circle cx="306" cy="245" r="4" fill="#fff"/>
    <circle cx="176" cy="288" r="20" fill="#f6b6a6" opacity=".7"/><circle cx="336" cy="288" r="20" fill="#f6b6a6" opacity=".7"/>
    <path d="M218 306 Q256 342 294 306" fill="none" stroke="#a8503f" stroke-width="9" stroke-linecap="round"/>'''

def kuru():
    random.seed(7)
    arka = ''.join(f'<circle cx="{256 + 150 * math.cos(a):.0f}" cy="{205 + 128 * math.sin(a):.0f}" r="{random.randint(46, 60)}" fill="#8a5a2b"/>'
                   for a in [math.pi * (1 + i / 13) for i in range(14)])
    on = ''.join(f'<circle cx="{150 + i * 27}" cy="{150 - 34 * math.sin(math.pi * i / 8):.0f}" r="{random.randint(36, 44)}" fill="#9a6733"/>' for i in range(9))
    return arka, on

def islak():
    r = '#3d2614'
    arka = f'<path d="M130 240 C120 110 200 86 256 86 C312 86 392 110 382 240 L396 372 L356 340 L346 400 L312 330 L200 330 L166 400 L156 340 L116 372 Z" fill="{r}"/>'
    on = (f'<path d="M136 226 C140 130 206 104 256 104 C306 104 372 130 376 226 L350 186 L330 232 L300 176 L278 228 L252 174 L226 230 L204 178 L180 232 L160 188 Z" fill="{r}"/>'
          '<path d="M210 120 C230 112 260 112 284 120" fill="none" stroke="#7a5a44" stroke-width="7" stroke-linecap="round" opacity=".8"/>')
    damla = ''.join(f'<path d="M{x} {y} C{x-12} {y+22} {x-11} {y+36} {x} {y+36} C{x+11} {y+36} {x+12} {y+22} {x} {y} Z" fill="#4db4f5" stroke="#fff" stroke-width="2"/>'
                    for x, y in [(104, 392), (150, 428), (408, 392), (362, 428)])
    return arka, on + damla

def yaz(ad, parca):
    arka, on = parca
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#ffffff"/>{arka}{yuz()}{on}</svg>'
    with tempfile.TemporaryDirectory() as d:
        h = Path(d) / 'sac.html'; p = Path(d) / 'sac.png'
        h.write_text(f'<!doctype html><body style="margin:0">{svg}</body>', encoding='utf-8')
        subprocess.run([EDGE, '--headless=new', '--disable-gpu', f'--user-data-dir={d}/profil', f'--screenshot={p}', '--window-size=512,600', '--hide-scrollbars', f'file:///{h.as_posix()}'], check=True, capture_output=True, timeout=60)
        Image.open(p).convert('RGB').crop((0, 0, 512, 512)).save(KOK / f'public/images/{ad}.webp', quality=85)

yaz('3307', islak())
yaz('3308', kuru())
print('tamam')
