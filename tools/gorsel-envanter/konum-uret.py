# Üstünde/Altında çalışma görselleri (Gökhan Hoca, 2026-10-29): iki şıkta aynı mobilya fotoğrafı, yalnız nesnenin yeri değişir.
# "Altında" fotoğrafından nesne kesilir, yeri zeminle doldurulur (boş mobilya); aynı nesne aynı boyutta
#  - üstünde: yüzeye değecek şekilde (altında gölge, havada durmaz),
#  - altında: ön ve arka ayakların arasında, yerde (ayakların arasında görünür, önünde değil)
# konur. Bebek ayının sandalyesine (hoca: bebek–sandalye yeniden), araba ahşap sehpaya (beyaz sehpa zeminde kayboluyordu).
# Çıktı: public/images/ozel/ust-alt/<ad>-ust.webp, <ad>-alt.webp. Çalıştır: python tools/gorsel-envanter/konum-uret.py
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

KOK = Path(__file__).resolve().parents[2]
CIKTI = KOK / 'public/images/ozel/ust-alt'
CIKTI.mkdir(parents=True, exist_ok=True)

def yukle(i):
    return Image.open(KOK / f'public/images/{i}.webp').convert('RGB')

def zemin_rengi(a, k):
    x0, y0, x1, y1 = k
    serit = np.concatenate([a[y0:y1, max(0, x0 - 6):x0].reshape(-1, 3), a[y0:y1, x1:x1 + 6].reshape(-1, 3), a[max(0, y0 - 6):y0, x0:x1].reshape(-1, 3), a[y1:y1 + 6, x0:x1].reshape(-1, 3)])
    return np.median(serit, axis=0)

def zemin_yuzeyi(a, k, pay=22):
    """Kutunun çevresindeki halkadan (nesne dışı) her kanal için ikinci dereceden yüzey uydur: kutunun içindeki zemin tahmini"""
    x0, y0, x1, y1 = k
    H, W = a.shape[:2]
    X0, Y0, X1, Y1 = max(0, x0 - pay), max(0, y0 - pay), min(W, x1 + pay), min(H, y1 + pay)
    yy, xx = np.mgrid[Y0:Y1, X0:X1]
    halka = ~((xx >= x0) & (xx < x1) & (yy >= y0) & (yy < y1))
    px = a[Y0:Y1, X0:X1].astype(float)
    # halkadaki mobilya (ayak, tabla) piksellerini at: zeminden çok farklı olanlar
    med = np.median(px[halka], axis=0)
    temiz = halka & (np.abs(px - med).max(axis=2) < 40)
    def tasarim(x, y): return np.stack([np.ones_like(x), x, y, x * x, y * y, x * y], -1).astype(float)
    A = tasarim(xx[temiz] / W, yy[temiz] / H)
    kats = [np.linalg.lstsq(A, px[..., c][temiz], rcond=None)[0] for c in range(3)]
    ky, kx = np.mgrid[y0:y1, x0:x1]
    B = tasarim(kx / W, ky / H)
    return np.stack([B @ kats[c] for c in range(3)], -1)

def fark(a, k):
    x0, y0, x1, y1 = k
    return np.abs(a[y0:y1, x0:x1].astype(float) - zemin_yuzeyi(a, k)).max(axis=2)

def maske(a, k):
    """Nesne: zemin yüzeyinden belirgin farklı pikseller (yumuşak gri gölge eşiğin altında kalır); satır/sütun içi doldurulur"""
    x0, y0, x1, y1 = k
    alan = fark(a, k) > 42
    for r in range(alan.shape[0]):
        xs = np.where(alan[r])[0]
        if len(xs) > 1: alan[r, xs.min():xs.max() + 1] = True
    m = np.zeros(a.shape[:2], bool)
    m[y0:y1, x0:x1] = alan
    return Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))

def bosalt(im, k):
    """Yalnız nesne ve gölgesinin pikselleri (yüzeyden farkı > 10) zemin yüzeyiyle değiştirilir; geçiş yumuşak"""
    a = np.asarray(im).astype(float)
    x0, y0, x1, y1 = k
    yuzey = zemin_yuzeyi(a, k)
    f = np.abs(a[y0:y1, x0:x1] - yuzey).max(axis=2)
    agirlik = np.clip((f - 6) / 14, 0, 1)
    agirlik = np.asarray(Image.fromarray((agirlik * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(2))) / 255.0
    a[y0:y1, x0:x1] = a[y0:y1, x0:x1] * (1 - agirlik[..., None]) + yuzey * agirlik[..., None]
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))

def _eski_maske(a, k):
    """Kutudaki nesne: doygun renkli ya da zeminden çok farklı pikseller (gri gölge alınmaz); satırlarda yalnız bu çekirdeğin
    içi doldurulur (kedinin beyaz göğsü, bebeğin çorabı), kenarı yumuşatılır"""
    x0, y0, x1, y1 = k
    z = zemin_rengi(a, k)
    p = a[y0:y1, x0:x1].astype(float)
    mx, mn = p.max(axis=2), p.min(axis=2)
    doygun = (mx - mn) / np.maximum(mx, 1) > 0.22
    cok_farkli = np.abs(p - z).max(axis=2) > 75
    alan = doygun | cok_farkli
    for r in range(alan.shape[0]):
        xs = np.where(alan[r])[0]
        if len(xs) > 1 and xs.max() - xs.min() < 0.95 * alan.shape[1]: alan[r, xs.min():xs.max() + 1] = True
    for c in range(alan.shape[1]):
        ys = np.where(alan[:, c])[0]
        if len(ys) > 1: alan[ys.min():ys.max() + 1, c] = True
    m = np.zeros(a.shape[:2], bool)
    m[y0:y1, x0:x1] = alan
    return Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))

def _eski_bosalt(im, k, pay=10):
    """Kutuyu (biraz genişletip) her sütunda üstteki ve alttaki zemin pikselleri arasında doğrusal geçişle doldur:
    zeminin yatay tonu da korunur, nesne, yansıması ve gölgesi kaybolur"""
    a = np.asarray(im).astype(float)
    x0, y0, x1, y1 = k[0] - pay, k[1] - pay, k[2] + pay, k[3] + pay
    ust = a[y0 - 6:y0].mean(axis=0)[x0:x1]
    alt = a[y1:y1 + 6].mean(axis=0)[x0:x1]
    for r in range(y0, y1):
        t = (r - y0) / max(1, y1 - y0)
        a[r, x0:x1] = ust * (1 - t) + alt * t
    out = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    bulanik = out.filter(ImageFilter.GaussianBlur(3))
    yama = Image.new('L', im.size, 0)
    ImageDraw.Draw(yama).rectangle([x0, y0, x1, y1], fill=255)
    return Image.composite(bulanik, out, yama.filter(ImageFilter.GaussianBlur(4)))

def kes(im, k, olcek):
    a = np.asarray(im)
    m = maske(a, k)
    x0, y0, x1, y1 = k
    parca = im.crop(k); mp = m.crop(k)
    bb = mp.getbbox()
    parca, mp = parca.crop(bb), mp.crop(bb)
    w, h = int(parca.width * olcek), int(parca.height * olcek)
    return parca.resize((w, h), Image.LANCZOS), mp.resize((w, h), Image.LANCZOS)

def yerlestir(bos, parca, mp, cx, alt_y):
    out = bos.copy()
    golge = Image.new('L', out.size, 0)
    gw = int(parca.width * 0.9)
    ImageDraw.Draw(golge).ellipse([cx - gw // 2, alt_y - 6, cx + gw // 2, alt_y + 8], fill=110)
    golge = golge.filter(ImageFilter.GaussianBlur(5))
    out = Image.composite(Image.new('RGB', out.size, (120, 110, 100)), out, golge)
    out.paste(parca, (cx - parca.width // 2, alt_y - parca.height), mp)
    return out

# (ad, mobilya fotoğrafı, mobilyadaki nesne kutusu (silinir), nesne kaynağı, nesne kutusu, ölçek, üst yüzey y, alt (yer) y, orta x)
SETLER = [
    ('top', 2021, (185, 255, 325, 397), 2021, (185, 255, 325, 397), 0.8, 150, 408, 256),
    ('ayi', 2033, (180, 330, 296, 468), 2033, (180, 330, 296, 468), 0.68, 268, 404, 252),
    ('bebek', 2033, (180, 330, 296, 468), 2113, (188, 116, 324, 302), 0.6, 268, 404, 252),
    ('araba', 2093, (200, 232, 292, 352), 2045, (198, 303, 307, 378), 0.95, 164, 380, 256),
    ('elma', 2057, (212, 278, 322, 380), 2057, (212, 278, 322, 380), 1.0, 147, 396, 256),
    ('kalem', 2069, (222, 346, 298, 392), 2069, (222, 346, 298, 392), 1.3, 160, 374, 256),
    ('kedi', 2081, (224, 260, 312, 418), 2081, (224, 260, 312, 418), 0.8, 205, 386, 262),
]

for ad, mob, mk, kaynak, kk, olcek, ust_y, alt_y, cx in SETLER:
    bos = bosalt(yukle(mob), mk)
    parca, mp = kes(yukle(kaynak), kk, olcek)
    yerlestir(bos, parca, mp, cx, ust_y).save(CIKTI / f'{ad}-ust.webp', quality=86)
    yerlestir(bos, parca, mp, cx, alt_y).save(CIKTI / f'{ad}-alt.webp', quality=86)
    print(ad, parca.size)
