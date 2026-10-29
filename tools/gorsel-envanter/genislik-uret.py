# Geniş/Dar çalışma görselleri (Gökhan Hoca, 2026-10-29): yalnız en değişir; boy, renk, ortam ve açı aynı.
# Dar fotoğrafta nesnenin bulunduğu dikey şerit (kapı, pencere, tek oluklu kaydırak, merdiven, tünel, yol) yana
# genişletilir, iki yandaki duvar/ortam olduğu gibi kalır; görüntü ortadan aynı genişliğe kırpılır.
# Çıktı: public/images/ozel/genis-dar/<nesne>-<0..3>.webp (0 en dar … 3 en geniş).
# Çalıştır (proje kökünde): python tools/gorsel-envanter/genislik-uret.py
from pathlib import Path
import numpy as np
from PIL import Image

KOK = Path(__file__).resolve().parents[2]
CIKTI = KOK / 'public/images/ozel/genis-dar'
CIKTI.mkdir(parents=True, exist_ok=True)

# (ad, dar fotoğraf, şerit başı, şerit sonu — genişliğe oran)
NESNELER = [('kapi', 2201, 0.355, 0.665), ('pencere', 2215, 0.385, 0.625), ('kaydirak', 2204, 0.355, 0.67),
            ('merdiven', 2211, 0.29, 0.725), ('tunel', 2219, 0.30, 0.71), ('yol', 2221, 0.30, 0.72)]
ADIM = [0, 0.3, 0.62, 1.0]

for ad, kid, bas, son in NESNELER:
    im = Image.open(KOK / f'public/images/{kid}.webp').convert('RGB')
    W, H = im.size
    a, b = int(W * bas), int(W * son)
    fmax = min(2.3, 0.92 / (son - bas))
    for i, t in enumerate(ADIM):
        f = 1 + (fmax - 1) * t
        orta = im.crop((a, 0, b, H)).resize((int((b - a) * f), H), Image.LANCZOS)
        yeni = Image.new('RGB', (a + orta.width + (W - b), H))
        yeni.paste(im.crop((0, 0, a, H)), (0, 0))
        yeni.paste(orta, (a, 0))
        yeni.paste(im.crop((b, 0, W, H)), (a + orta.width, 0))
        fazla = yeni.width - W
        yeni.crop((fazla // 2, 0, fazla // 2 + W, H)).save(CIKTI / f'{ad}-{i}.webp', quality=84)
    print(ad, round(fmax, 2))
