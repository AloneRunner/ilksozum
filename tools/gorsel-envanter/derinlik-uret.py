# Derin/Sığ çalışma görselleri (Gökhan Hoca, 2026-10-29): yalnız derinlik değişir; model, renk, çap ve açı aynı.
# Derin kabın fotoğrafında ağız (içi görünen üst kısım) ve taban olduğu gibi kalır, yalnız yan duvar kısalır.
# Aynı boyda tuvale, tabanı aynı çizgide konur. Çıktı: public/images/ozel/derin-sig/<nesne>-<0..3>.webp (0 en sığ).
# Çalıştır (proje kökünde): python tools/gorsel-envanter/derinlik-uret.py
from pathlib import Path
import numpy as np
from PIL import Image

KOK = Path(__file__).resolve().parents[2]
CIKTI = KOK / 'public/images/ozel/derin-sig'
CIKTI.mkdir(parents=True, exist_ok=True)

def kirp(a, esik=26):
    zemin = np.median(np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]]), axis=0)
    m = np.abs(a.astype(int) - zemin).max(axis=2) > esik
    ys, xs = np.where(m)
    return a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]

# (ad, derin olanın kimliği, üst pay (ağız), alt pay (taban)) — kesilmiş nesne yüksekliğine oran
NESNELER = [('tabak', 2917, 0.50, 0.22), ('tencere', 2919, 0.36, 0.16), ('legen', 2913, 0.54, 0.20),
            ('firin-kabi', 2903, 0.46, 0.20), ('kase', 2907, 0.42, 0.20), ('kova', 2909, 0.36, 0.12), ('kutu', 2911, 0.22, 0.08)]
DUVAR = [0.2, 0.42, 0.7, 1.0]  # 0.12'de leğenin kenarında kesik izi görünüyordu

for ad, kid, ust, alt in NESNELER:
    a = kirp(np.asarray(Image.open(KOK / f'public/images/{kid}.webp').convert('RGB')))
    h, w = a.shape[:2]
    u, d = int(h * ust), int(h * (1 - alt))
    olcek = 380 / w
    H = int(h * olcek) + 60
    for i, f in enumerate(DUVAR):
        orta = Image.fromarray(a[u:d]).resize((w, max(1, int((d - u) * f))), Image.LANCZOS)
        p = np.concatenate([a[:u], np.asarray(orta), a[d:]], axis=0)
        p = Image.fromarray(p).resize((380, int(p.shape[0] * olcek)), Image.LANCZOS)
        tuval = Image.new('RGB', (440, H), 'white')
        tuval.paste(p, (30, H - 30 - p.height))  # taban aynı çizgide
        tuval.save(CIKTI / f'{ad}-{i}.webp', quality=84)
    print(ad, H)
