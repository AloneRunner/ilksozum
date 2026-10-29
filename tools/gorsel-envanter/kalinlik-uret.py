# Kalın/İnce çalışma görselleri (Gökhan Hoca, 2026-10-29): yalnız kalınlık değişir; boy, renk, doku ve açı aynı.
# Kalın fotoğrafın yalnız kalınlık ekseni küçültülür (uzunluk aynı kalır), aynı boyda tuvale konur.
# Çıktı: public/images/ozel/kalin-ince/<nesne>-<0..3>.webp (0 en ince … 3 en kalın).
# Çalıştır (proje kökünde): python tools/gorsel-envanter/kalinlik-uret.py
from pathlib import Path
import numpy as np
from PIL import Image

KOK = Path(__file__).resolve().parents[2]
CIKTI = KOK / 'public/images/ozel/kalin-ince'
CIKTI.mkdir(parents=True, exist_ok=True)

def kirp(a, esik=28):
    zemin = np.median(np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]]), axis=0)
    m = np.abs(a.astype(int) - zemin).max(axis=2) > esik
    ys, xs = np.where(m)
    return a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]

# (ad, kalın olanın kimliği, kalınlık ekseni: 'x' = genişlik (dik duran), 'y' = yükseklik (yatan))
NESNELER = [('mum', 2005, 'x'), ('havuc', 2007, 'y'), ('firca', 2011, 'y'), ('civi', 2013, 'y')]
ORAN = [0.3, 0.5, 0.75, 1.0]

for ad, kid, eksen in NESNELER:
    a = kirp(np.asarray(Image.open(KOK / f'public/images/{kid}.webp').convert('RGB')))
    h, w = a.shape[:2]
    olcek = (560 / h) if eksen == 'x' else (760 / w)  # uzunluk sabit: dik olanda boy, yatanda en
    h, w = int(h * olcek), int(w * olcek)
    W, H = (int(w + 40), h + 40) if eksen == 'x' else (w + 40, int(h + 40))
    for i, o in enumerate(ORAN):
        yw, yh = (max(2, int(w * o)), h) if eksen == 'x' else (w, max(2, int(h * o)))
        p = Image.fromarray(a).resize((yw, yh), Image.LANCZOS)
        tuval = Image.new('RGB', (W, H), 'white')
        # dik: alta oturur, ortalı; yatan: sola dayalı, dikeyde ortalı
        tuval.paste(p, ((W - yw) // 2, H - 20 - yh) if eksen == 'x' else (20, (H - yh) // 2))
        tuval.save(CIKTI / f'{ad}-{i}.webp', quality=84)
    print(ad, W, H)
