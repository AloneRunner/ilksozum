# Rengi Ne? fotoğraflarındaki nesnenin gerçek tonu (Gökhan Hoca, 2026-10-29: "renk düğmesi fotoğrafla ton olarak tam uyuşmalı").
# Arka plan (beyaz/gri, doygunluğu düşük) atılır; kalan piksellerde baskın renk tonunun ortanca rengi alınır.
# Beyaz ve siyah nesnelerde doygunluk yerine parlaklık kullanılır. Çıktı: src/data/renkTonlari.ts
# Çalıştır (proje kökünde): python tools/gorsel-envanter/renk-tonu.py
import re, colorsys, statistics
from pathlib import Path
from PIL import Image

KOK = Path(__file__).resolve().parents[2]
veri = (KOK / 'src/services/database/activities/yeni/renkTanimaData.ts').read_text(encoding='utf-8')
satirlar = re.findall(r"\['(/images/\d+\.webp)', '([^']+)', '([^']+)'", veri)

def ton(yol, renk):
    im = Image.open(KOK / 'public' / yol.lstrip('/')).convert('RGB')
    im.thumbnail((160, 160))
    px = list(im.getdata())
    hsv = [(colorsys.rgb_to_hsv(r / 255, g / 255, b / 255), (r, g, b)) for r, g, b in px]
    if renk == 'beyaz':
        sec = [p for (h, s, v), p in hsv if s < 0.12 and 0.86 < v < 0.985]  # saf beyaz arka planı ve gri gölgeleri at
    elif renk == 'siyah':
        sec = [p for (h, s, v), p in hsv if v < 0.28]
    else:
        sec = [(hh, p) for (hh, s, v), p in hsv if s > 0.30 and v > 0.18]
        if not sec:
            return None
        # baskın ton kümesi: tonu 12 dilime böl, en kalabalık dilim ve komşuları
        kova = [0] * 12
        for hh, _ in sec:
            kova[int(hh * 12) % 12] += 1
        en = max(range(12), key=lambda i: kova[i])
        sec = [p for hh, p in sec if min(abs(int(hh * 12) - en), 12 - abs(int(hh * 12) - en)) <= 1]
    if not sec:
        return None
    r, g, b = (int(statistics.median(c[i] for c in sec)) for i in range(3))
    return f'#{r:02x}{g:02x}{b:02x}'

sonuc = {}
for yol, kelime, renk in satirlar:
    t = ton(yol, renk)
    sonuc[yol] = t
    print(f'{kelime:12} {renk:11} {t}')

govde = ',\n'.join(f"  '{y}': '{t}'" for y, t in sonuc.items() if t)
(KOK / 'src/data/renkTonlari.ts').write_text(
    '// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/renk-tonu.py — Rengi Ne? fotoğraflarındaki nesnenin ölçülen tonu.\n'
    'export const RENK_TONLARI: Record<string, string> = {\n' + govde + ',\n};\n', encoding='utf-8')
