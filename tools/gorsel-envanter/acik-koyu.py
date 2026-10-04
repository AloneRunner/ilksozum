# Açık / Koyu renk çiftleri: aynı nesne fotoğrafından açık ve koyu tonlu iki görsel üretir.
# Sadece renkli (doygun) kısımlar değişir; beyaz zemin, siyah tekerlek/sap gibi kısımlar aynı kalır.
# Kullanım: python tools/gorsel-envanter/acik-koyu.py   → gorsel-ham/acik-koyu/<nesne>-acik.jpg / -koyu.jpg
# Gerekir: pip install pillow numpy scipy
import os
import numpy as np
from PIL import Image
from scipy import ndimage as nd

KOK = os.path.join(os.path.dirname(__file__), '..', '..', 'gorsel-ham')
CIKTI = os.path.join(KOK, 'acik-koyu')
KAYNAK = {
    'canta': 'acik-kapali/canta-kapali.jpg',
    'semsiye': 'acik-kapali/semsiye-kapali.jpg',
    'balon': 'buyuk-kucuk/balon-buyuk.jpg',
    'kupa': 'buyuk-kucuk/kupa-buyuk.jpg',
    'top': 'buyuk-kucuk/top-buyuk.jpg',
    'araba': 'eski-yeni/araba-yeni.jpg',
    'tisort': 'eski-yeni/tisort-yeni.jpg',
    'elbise': 'kirisik-duzgun/elbise-duzgun.jpg',
    'cizme': 'ters-duz/cizme-duz.jpg',
    'sise': 'seffaf-opak/sise-opak.jpg',
    'kova': 'tekil/kaplar/cop-kovasi.jpg',
}


def rgb2hsv(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(-1), a.min(-1)
    v = mx
    s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    d = np.maximum(mx - mn, 1e-6)
    h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) / 6
    return h, s, v


def hsv2rgb(h, s, v):
    i = np.floor(h * 6).astype(int) % 6
    f = h * 6 - np.floor(h * 6)
    p, q, t = v * (1 - s), v * (1 - f * s), v * (1 - (1 - f) * s)
    secim = [(v, t, p), (q, v, p), (p, v, t), (p, q, v), (t, p, v), (v, p, q)]
    out = np.zeros(h.shape + (3,))
    for k, (r, g, b) in enumerate(secim):
        m = i == k
        out[..., 0][m], out[..., 1][m], out[..., 2][m] = r[m], g[m], b[m]
    return out


os.makedirs(CIKTI, exist_ok=True)
for ad, yol in KAYNAK.items():
    a = np.asarray(Image.open(os.path.join(KOK, yol)).convert('RGB')).astype(float) / 255
    h, s, v = rgb2hsv(a)
    # renkli kısım maskesi (yumuşak kenarlı)
    maske = np.clip((s - 0.18) / 0.15, 0, 1) * np.clip((v - 0.12) / 0.1, 0, 1)
    maske = nd.gaussian_filter(maske, 1.2)
    for ek, (sv, vv) in {'acik': (0.42, None), 'koyu': (1.08, 0.5)}.items():
        s2 = np.clip(s * sv, 0, 1)
        v2 = v + (1 - v) * 0.5 if vv is None else v * vv
        yeni = hsv2rgb(h, s2, v2)
        sonuc = a * (1 - maske[..., None]) + yeni * maske[..., None]
        Image.fromarray((np.clip(sonuc, 0, 1) * 255).astype(np.uint8)).save(os.path.join(CIKTI, f'{ad}-{ek}.jpg'), quality=93)
    print(ad, 'tamam')
