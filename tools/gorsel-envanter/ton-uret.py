# Açık/Koyu çalışma görselleri (Gökhan Hoca, 2026-10-29): aynı nesnenin aynı fotoğrafından 4 ton (çok açık → çok koyu),
# mavi, yeşil ve kahverengi ailelerinde. Kaynak: Renkler fotoğrafları (11 nesne; mavi, yeşil, turuncu → kahverengi).
# Yalnız nesnenin renkli gövdesi boyanır (tekerlek, sap, ip olduğu gibi kalır); gölge ve doku korunur (CIELAB'da L farkı).
# Hepsi aynı fotoğraftan çıktığı için boyut ve hiza birebir aynı. Çıktı: public/images/ozel/acik-koyu/<nesne>-<aile>-<0..3>.webp
# Çalıştır (proje kökünde): python tools/gorsel-envanter/ton-uret.py
from pathlib import Path
import numpy as np
from PIL import Image

KOK = Path(__file__).resolve().parents[2]
CIKTI = KOK / 'public/images/ozel/acik-koyu'
CIKTI.mkdir(parents=True, exist_ok=True)

# nesne: (dosya adı, mavi, yeşil, turuncu) — src/data/renkGorselleri.ts ile aynı kimlikler
NESNELER = {
    'araba': ('araba', 7102, 7107, 7106), 'balon': ('balon', 7109, 7114, 7113), 'çanta': ('canta', 7116, 7121, 7120),
    'çizme': ('cizme', 7123, 7128, 7127), 'elbise': ('elbise', 7130, 7135, 7134), 'çöp kovası': ('cop-kovasi', 7137, 7142, 7141),
    'kupa': ('kupa', 7144, 7149, 7148), 'şemsiye': ('semsiye', 7151, 7156, 7155), 'şişe': ('sise', 7158, 7163, 7162),
    'tişört': ('tisort', 7165, 7170, 7169), 'top': ('top', 7172, 7177, 7176),
}
# Aile → 4 hedef ton (0 çok açık … 3 çok koyu); kaynak sütunu
AILELER = {
    'mavi': (1, ['#c7dcfa', '#6aa2ec', '#2456b8', '#0f2557']),
    'yesil': (2, ['#c9eccb', '#6cc070', '#2b7a35', '#123d1a']),
    'kahve': (3, ['#ecd3b4', '#c48e5c', '#7e4a26', '#3e2412']),
}

def srgb2lab(rgb):
    c = rgb / 255.0
    c = np.where(c > 0.04045, ((c + 0.055) / 1.055) ** 2.4, c / 12.92)
    m = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]])
    xyz = c @ m.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)

def lab2srgb(lab):
    fy = (lab[..., 0] + 16) / 116
    f = np.stack([fy + lab[..., 1] / 500, fy, fy - lab[..., 2] / 200], -1)
    xyz = np.where(f ** 3 > 0.008856, f ** 3, (f - 16 / 116) / 7.787) * np.array([0.95047, 1.0, 1.08883])
    m = np.array([[3.2406, -1.5372, -0.4986], [-0.9689, 1.8758, 0.0415], [0.0557, -0.2040, 1.0570]])
    c = xyz @ m.T
    c = np.where(c > 0.0031308, 1.055 * np.clip(c, 0, None) ** (1 / 2.4) - 0.055, 12.92 * c)
    return np.clip(c * 255, 0, 255)

def hex2lab(h):
    return srgb2lab(np.array([[int(h[i:i + 2], 16) for i in (1, 3, 5)]], dtype=float))[0]

def boya(kaynak_id, hedefler, k=0.7):
    """Kaynak fotoğrafın renkli gövdesini verilen hedef tonlara boyar; [(hedef_hex, k)] → görüntüler"""
    im = Image.open(KOK / f'public/images/{kaynak_id}.webp').convert('RGB')
    im.thumbnail((420, 420), Image.LANCZOS)
    rgb = np.asarray(im, dtype=float)
    lab = srgb2lab(rgb)
    kroma = np.hypot(lab[..., 1], lab[..., 2])
    govde = kroma > 18
    aci = np.degrees(np.arctan2(lab[..., 2], lab[..., 1]))
    orta = np.degrees(np.arctan2(np.median(lab[..., 2][govde]), np.median(lab[..., 1][govde])))
    fark = np.abs((aci - orta + 180) % 360 - 180)
    maske = np.clip((kroma - 12) / 14, 0, 1) * np.clip((50 - fark) / 20, 0, 1)
    lort = np.median(lab[..., 0][maske > 0.5])
    for h, kk in hedefler:
        hedef = hex2lab(h)
        yeni = lab.copy()
        yeni[..., 0] = np.clip(hedef[0] + (lab[..., 0] - lort) * kk, 2, 99)
        yeni[..., 1] = hedef[1]
        yeni[..., 2] = hedef[2]
        m = maske[..., None]
        yield Image.fromarray((lab2srgb(yeni) * m + rgb * (1 - m)).astype(np.uint8))

# Renk Öğren'e siyah, beyaz, kahverengi (Gökhan Hoca, 2026-10-29: 2. grup yeşil-siyah-beyaz, 3. grup … kahverengi).
# Mavi fotoğraftan boyanır; beyazda gölge biraz artırılır ki beyaz zeminden ayrılsın. Çıktı: public/images/ozel/renk/<nesne>-<renk>.webp
RENK_CIKTI = KOK / 'public/images/ozel/renk'
RENK_CIKTI.mkdir(parents=True, exist_ok=True)
for ad, (dosya, mavi, yesil, turuncu) in NESNELER.items():
    siyah, beyaz = boya(mavi, [('#202020', 0.55), ('#ececec', 0.9)])
    siyah.save(RENK_CIKTI / f'{dosya}-siyah.webp', quality=82)
    beyaz.save(RENK_CIKTI / f'{dosya}-beyaz.webp', quality=82)
    kahve, = boya(turuncu, [('#7a4a28', 0.7)])
    kahve.save(RENK_CIKTI / f'{dosya}-kahverengi.webp', quality=82)

for ad, (dosya, *kaynaklar) in NESNELER.items():
    for aile, (sutun, tonlar) in AILELER.items():
        im = Image.open(KOK / f'public/images/{kaynaklar[sutun - 1]}.webp').convert('RGB')
        im.thumbnail((420, 420), Image.LANCZOS)
        rgb = np.asarray(im, dtype=float)
        lab = srgb2lab(rgb)
        kroma = np.hypot(lab[..., 1], lab[..., 2])
        # Gövde maskesi: kaynak rengin tonuna yakın ve doygun pikseller (yumuşak kenar)
        govde = kroma > 18
        aci = np.degrees(np.arctan2(lab[..., 2], lab[..., 1]))
        orta = np.degrees(np.arctan2(np.median(lab[..., 2][govde]), np.median(lab[..., 1][govde])))
        fark = np.abs((aci - orta + 180) % 360 - 180)
        maske = np.clip((kroma - 12) / 14, 0, 1) * np.clip((50 - fark) / 20, 0, 1)
        lort = np.median(lab[..., 0][maske > 0.5])
        for i, h in enumerate(tonlar):
            hedef = hex2lab(h)
            yeni = lab.copy()
            yeni[..., 0] = np.clip(hedef[0] + (lab[..., 0] - lort) * 0.7, 2, 99)
            yeni[..., 1] = hedef[1]
            yeni[..., 2] = hedef[2]
            m = maske[..., None]
            out = lab2srgb(yeni) * m + rgb * (1 - m)
            Image.fromarray(out.astype(np.uint8)).save(CIKTI / f'{dosya}-{aile}-{i}.webp', quality=82)
    print(ad)
