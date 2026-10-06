# Renkler: aynı nesneyi farklı renklere boyar → gorsel-ham/renkler/<nesne>-<renk>.jpg
# "Hangi balon kırmızı?" — iki şıkta aynı nesne, sadece renk farklı (çift kuralı).
# Sadece renkli (doygun) kısım boyanır; zemin, tekerlek, sap gibi kısımlar aynı kalır.
# Kullanım: python tools/gorsel-envanter/renkler.py   (Gerekir: pip install pillow numpy scipy)
import os
import numpy as np
from PIL import Image
from scipy import ndimage as nd

KOK = os.path.join(os.path.dirname(__file__), '..', '..', 'gorsel-ham')
CIKTI = os.path.join(KOK, 'renkler')
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
# Donuk/koyu renkli nesnelerde boyanacak kısmı yakalamak için daha düşük doygunluk eşiği
ESIK = {'kupa': 0.06, 'kova': 0.07}
# renk: (ton 0-1, doygunluk, hedef parlaklık ortancası)
RENK = {
    'kirmizi': (0.995, 0.85, 0.78),
    'mavi': (0.60, 0.80, 0.72),
    'sari': (0.14, 0.88, 0.95),
    'yesil': (0.34, 0.75, 0.62),
    'turuncu': (0.07, 0.90, 0.95),
    'mor': (0.77, 0.65, 0.58),
    'pembe': (0.93, 0.50, 0.95),
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


os.makedirs(CIKTI, exist_ok=True)
for ad, yol in KAYNAK.items():
    a = np.asarray(Image.open(os.path.join(KOK, yol)).convert('RGB')).astype(float) / 255
    h, s, v = rgb2hsv(a)
    e = ESIK.get(ad, 0.18)
    maske = np.clip((s - e) / 0.12, 0, 1) * np.clip((v - 0.06) / 0.1, 0, 1)
    if ad in ESIK:
        # boşlukları doldur: nesnenin tamamı tek parça boyansın
        sert0 = maske > 0.5
        sert0 = nd.binary_fill_holes(nd.binary_closing(sert0, iterations=4))
        lab, n = nd.label(sert0)
        if n:
            sert0 = lab == (np.argmax(nd.sum(sert0, lab, range(1, n + 1))) + 1)
        maske = np.maximum(maske, sert0.astype(float))
    maske = nd.gaussian_filter(maske, 1.2)
    sert = maske > 0.5
    v_orta = np.median(v[sert]) if sert.any() else 0.6
    # Gölge/ışık farkı korunur: göreli parlaklık (v / ortanca)
    goreli = v / max(v_orta, 1e-3)
    for renk, (ton, doy, hedef) in RENK.items():
        v2 = np.clip(goreli * hedef, 0, 1)
        # açık renklerde (sarı, pembe) parlak noktalarda doygunluk biraz düşer: doğal görünsün
        s2 = np.clip(doy * (1 - np.clip(v2 - 0.92, 0, 1) * 4), 0, 1)
        yeni = hsv2rgb(np.full_like(h, ton), s2, v2)
        sonuc = a * (1 - maske[..., None]) + yeni * maske[..., None]
        Image.fromarray((np.clip(sonuc, 0, 1) * 255).astype(np.uint8)).save(os.path.join(CIKTI, f'{ad}-{renk}.jpg'), quality=92)
    print(ad, 'tamam')
