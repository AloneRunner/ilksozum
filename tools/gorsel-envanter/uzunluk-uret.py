# Uzun/Kısa çalışma görselleri (Gökhan Hoca, 2026-10-29): yalnız uzunluk değişir; kalınlık, yükseklik ve ölçek aynı kalır.
# Mevcut fotoğraftan: iki uç (kalemin ucu/arkası, bankın ayakları, yılanın başı/kuyruğu) olduğu gibi kalır, yalnız orta
# bölüm uzar/kısalır. Tren: uzun trenin fotoğrafındaki lokomotif ve bir vagon ayrılır, vagon sayısı değişir.
# Hepsi aynı genişlikte tuvale sola dayalı çizilir: alt alta konunca sol uçlar hizalı, ölçek aynı.
# Çıktı: public/images/ozel/uzun-kisa/<nesne>-<0..3>.webp (0 en kısa … 3 en uzun). Çorap dikey (üst kenar hizalı).
# Çalıştır (proje kökünde): python tools/gorsel-envanter/uzunluk-uret.py
from pathlib import Path
import numpy as np
from PIL import Image

KOK = Path(__file__).resolve().parents[2]
CIKTI = KOK / 'public/images/ozel/uzun-kisa'
CIKTI.mkdir(parents=True, exist_ok=True)

def yukle(id_):
    return np.asarray(Image.open(KOK / f'public/images/{id_}.webp').convert('RGB')).astype(np.int16)

def nesne_maskesi(a, esik=28):
    zemin = np.median(np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]]), axis=0)
    return np.abs(a - zemin).max(axis=2) > esik

def kirp(a):
    m = nesne_maskesi(a)
    ys, xs = np.where(m)
    return a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]

def yatay_uzat(a, sol, sag, hedef_orta):
    """sol/sag: uç payı (oran). Orta bölüm hedef genişliğe yeniden örneklenir."""
    h, w = a.shape[:2]
    l, r = int(w * sol), int(w * (1 - sag))
    orta = Image.fromarray(a[:, l:r].astype(np.uint8)).resize((max(1, hedef_orta), h), Image.LANCZOS)
    return np.concatenate([a[:, :l], np.asarray(orta).astype(np.int16), a[:, r:]], axis=1)

def dikey_uzat(a, ust, alt, hedef_orta):
    h, w = a.shape[:2]
    u, d = int(h * ust), int(h * (1 - alt))
    orta = Image.fromarray(a[u:d].astype(np.uint8)).resize((w, max(1, hedef_orta)), Image.LANCZOS)
    return np.concatenate([a[:u], np.asarray(orta).astype(np.int16), a[d:]], axis=0)

def tuvale(parca, W, H, yatay=True, pay=16):
    tuval = np.full((H, W, 3), 255, np.uint8)
    h, w = parca.shape[:2]
    y = (H - h) // 2 if yatay else pay
    x = pay if yatay else (W - w) // 2
    tuval[y:y + h, x:x + w] = np.clip(parca, 0, 255)
    return Image.fromarray(tuval)

# Yatay nesneler: (ad, kaynak id = uzun olan, sol uç, sağ uç payı)
YATAY = [('kalem', 2408, 0.10, 0.16), ('atki', 2402, 0.06, 0.06), ('kurdele', 2410, 0.03, 0.03),
         ('yilan', 2420, 0.08, 0.16), ('bank', 2404, 0.10, 0.10)]
ORANLAR = [0.35, 0.55, 0.78, 1.0]  # orta bölümün uzun hâline oranı

for ad, kid, sol, sag in YATAY:
    a = kirp(yukle(kid))
    h, w = a.shape[:2]
    orta = int(w * (1 - sol - sag))
    olcek = 900 / w  # en uzun hâl 900 px
    parcalar = []
    for o in ORANLAR:
        p = yatay_uzat(a, sol, sag, int(orta * o))
        p = np.asarray(Image.fromarray(p.astype(np.uint8)).resize((int(p.shape[1] * olcek), int(h * olcek)), Image.LANCZOS)).astype(np.int16)
        parcalar.append(p)
    H = max(p.shape[0] for p in parcalar) + 32
    for i, p in enumerate(parcalar):
        tuvale(p, 932, H).save(CIKTI / f'{ad}-{i}.webp', quality=84)
    print(ad, [p.shape[1] for p in parcalar])

# Tren: vagonlar bitişik; bağlantı yerleri (sütun yüksekliği çok düşük) ortasından kesilir → lokomotif + vagonlar.
# Lokomotif + N tane aynı vagon (ortadaki vagon) yan yana konunca bağlantılar yeniden oluşur.
a = kirp(yukle(2418))
m = nesne_maskesi(a)
yuk = m.sum(axis=0)
alcak = yuk < 0.35 * yuk.max()
kes, bas = [], None
for x, d in enumerate(list(alcak) + [False]):
    if d and bas is None: bas = x
    if not d and bas is not None:
        if 20 < bas < len(yuk) - 20: kes.append((bas + x) // 2)
        bas = None
print('tren kesimleri', kes)
sinir = [0] + kes + [a.shape[1]]
parcalar_t = [a[:, sinir[i]:sinir[i + 1]] for i in range(len(sinir) - 1)]
lok, vagon = parcalar_t[0], parcalar_t[2]
trenler = []
for n in [1, 2, 3, 4]:
    trenler.append(np.concatenate([lok] + [vagon] * n, axis=1))
olcek = 900 / trenler[-1].shape[1]
for i, p in enumerate(trenler):
    p = np.asarray(Image.fromarray(p.astype(np.uint8)).resize((int(p.shape[1] * olcek), int(p.shape[0] * olcek)), Image.LANCZOS)).astype(np.int16)
    tuvale(p, 932, p.shape[0] + 32).save(CIKTI / f'tren-{i}.webp', quality=84)

# Çorap (dikey): uzun çoraptan; üstteki lastik ve alttaki ayak olduğu gibi, bacak kısmı kısalır. Üst kenar hizalı.
a = kirp(yukle(2406))
h, w = a.shape[:2]
ust, alt = 0.10, 0.36
orta = int(h * (1 - ust - alt))
corap = [dikey_uzat(a, ust, alt, int(orta * o)) for o in [0.15, 0.4, 0.7, 1.0]]
olcek = 560 / h
for i, p in enumerate(corap):
    p = np.asarray(Image.fromarray(p.astype(np.uint8)).resize((int(w * olcek), int(p.shape[0] * olcek)), Image.LANCZOS)).astype(np.int16)
    tuvale(p, int(w * olcek) + 32, 592, yatay=False).save(CIKTI / f'corap-{i}.webp', quality=84)
print('bitti')
