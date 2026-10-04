# İlk / Son: sola bakan tek nesneden (beyaz zemin) renk değiştirilmiş kopyalarla bir sıra dizer.
# Solda bitiş çizgisi var: sıranın başı orası. Hedef nesne bir resimde en önde (ilk), öbüründe en arkada (son).
# Kullanım: python tools/gorsel-envanter/ilk-son.py  → gorsel-ham/ilk-son/<ad>-ilk.jpg, <ad>-son.jpg
# Gerekir: pip install pillow numpy scipy
import os
import numpy as np
from PIL import Image
from scipy import ndimage as nd

KOK = os.path.join(os.path.dirname(__file__), '..', '..', 'gorsel-ham')
HAM = os.path.join(KOK, 'ilk-son-ham')
CIKTI = os.path.join(KOK, 'ilk-son')

# ton: 0-1 arası hue; None = rengi olduğu gibi bırak; 'gri' = renksiz
RENK = {'kirmizi': 0.0, 'mavi': 0.6, 'yesil': 0.33, 'sari': 0.14, 'pembe': 0.93, 'mor': 0.78, 'turuncu': 0.07, 'gri': 'gri'}
# ad: (kaynak, hedef rengi (None=orijinal), diğerlerinin renkleri). Arabalar yatay ve ince: en fazla 3 (kartta küçük kalmasın)
SIRALAR = {
    'araba_kirmizi': ('araba', None, ['mavi', 'yesil']),
    'araba_mavi': ('araba', 'mavi', ['kirmizi', 'sari']),
    'araba3_yesil': ('araba', 'yesil', ['kirmizi', 'mavi']),
    'ordek_sari': ('ordek', None, ['pembe', 'mavi', 'yesil']),
    'ordek_pembe': ('ordek', 'pembe', ['sari', 'yesil', 'mavi']),
    'ordek3_mavi': ('ordek', 'mavi', ['sari', 'pembe']),
    'ayi_kahverengi': ('ayi', None, ['gri', 'gri', 'gri']),
    'ayi3_gri': ('ayi', 'gri', ['kahverengi', 'kahverengi']),
    'araba_sari': ('araba', 'sari', ['mor', 'kirmizi']),
    'ordek_turuncu': ('ordek', 'turuncu', ['sari', 'mavi', 'pembe']),
}


def rgb2hsv(a):
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(-1), a.min(-1)
    s = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1e-6), 0)
    d = np.maximum(mx - mn, 1e-6)
    h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) / 6
    return h, s, mx


def hsv2rgb(h, s, v):
    i = np.floor(h * 6).astype(int) % 6
    f = h * 6 - np.floor(h * 6)
    p, q, t = v * (1 - s), v * (1 - f * s), v * (1 - (1 - f) * s)
    out = np.zeros(h.shape + (3,))
    for k, (r, g, b) in enumerate([(v, t, p), (q, v, p), (p, v, t), (p, q, v), (t, p, v), (v, p, q)]):
        m = i == k
        out[..., 0][m], out[..., 1][m], out[..., 2][m] = r[m], g[m], b[m]
    return out


def kes(ad):
    """Nesneyi beyaz zeminden kes: (RGB 0-1, alfa 0-1), kenarlara göre kırpılmış."""
    a = np.asarray(Image.open(os.path.join(HAM, ad + '.jpg')).convert('RGB')).astype(float) / 255
    kenar = np.concatenate([a[:10].reshape(-1, 3), a[-10:].reshape(-1, 3), a[:, :10].reshape(-1, 3), a[:, -10:].reshape(-1, 3)])
    zemin = np.median(kenar, 0)
    d = np.abs(a - zemin).sum(-1)
    m = nd.binary_fill_holes(nd.binary_closing(d > 0.12, iterations=3))
    lab, n = nd.label(m)
    m = lab == (np.argmax(nd.sum(m, lab, range(1, n + 1))) + 1)
    alfa = nd.gaussian_filter(m.astype(float), 1.0)
    ys, xs = np.where(m)
    return a[ys.min():ys.max() + 1, xs.min():xs.max() + 1], alfa[ys.min():ys.max() + 1, xs.min():xs.max() + 1]


def boya(rgb, renk):
    if renk is None or renk == 'kahverengi':
        return rgb
    h, s, v = rgb2hsv(rgb)
    maske = np.clip((s - 0.15) / 0.15, 0, 1)[..., None]  # yalnız renkli kısımlar (tekerlek, göz değişmez)
    if renk == 'gri':
        yeni = hsv2rgb(h, s * 0.08, np.clip(v * 1.05, 0, 1))
    else:
        yeni = hsv2rgb(np.full_like(h, RENK[renk]), np.maximum(s, 0.55), v)
    return rgb * (1 - maske) + yeni * maske


os.makedirs(CIKTI, exist_ok=True)
W, H = 1024, 1024
for ad, (kaynak, hedef, digerleri) in SIRALAR.items():
    rgb, alfa = kes(kaynak)
    n = len(digerleri) + 1
    genislik = int(W * (0.8 / n) * 0.92)  # her nesneye düşen genişlik
    olcek = genislik / rgb.shape[1]
    yuk = int(rgb.shape[0] * olcek)
    parcalar = {}
    for renk in set([hedef] + digerleri):
        p = boya(rgb, renk)
        im = Image.fromarray((p * 255).astype(np.uint8)).resize((genislik, yuk), Image.LANCZOS)
        al = Image.fromarray((alfa * 255).astype(np.uint8)).resize((genislik, yuk), Image.LANCZOS)
        parcalar[renk] = (im, al)
    for ek, sira in (('ilk', [hedef] + digerleri), ('son', digerleri + [hedef])):
        tuval = Image.new('RGB', (W, H), (255, 255, 255))
        zemin_y = int(H * 0.62)
        # yol çizgisi ve soldaki bitiş çizgisi (damalı): sıranın başı
        yol = np.asarray(tuval).copy()
        yol[zemin_y:zemin_y + 8, 40:W - 30] = (200, 200, 200)
        for i in range(12):
            for j in range(2):
                renk = (30, 30, 30) if (i + j) % 2 == 0 else (255, 255, 255)
                yol[zemin_y - 300 + i * 26: zemin_y - 300 + (i + 1) * 26, 40 + j * 13: 40 + (j + 1) * 13] = renk
        yol[zemin_y - 300: zemin_y + 8, 38:40] = (30, 30, 30)
        tuval = Image.fromarray(yol)
        x = 90
        aralik = (W - 90 - 40 - n * genislik) // max(1, n - 1)
        for renk in sira:
            im, al = parcalar[renk]
            tuval.paste(im, (x, zemin_y - yuk), al)
            x += genislik + aralik
        tuval.save(os.path.join(CIKTI, f'{ad}-{ek}.jpg'), quality=92)
    print(ad, 'tamam')
