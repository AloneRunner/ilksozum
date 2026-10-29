# Beyaz zeminli ürün fotoğraflarından saydam kesik nesneler (Üstünde/Altında, Yukarıda/Aşağıda sahneleri için).
# Zemin, kenarlardan taşma (flood fill) ile bulunur: kenara bağlı açık renkli bölge saydam olur; nesnenin içindeki
# açık renkler (kedinin beyaz tüyü, bebeğin elbisesi) korunur. Yumuşak gölge eşiğin altında kalır, kenar yumuşatılır.
# Çıktı: public/images/ozel/kesik/<ad>.webp (saydam). Çalıştır: python tools/gorsel-envanter/nesne-kes.py
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

KOK = Path(__file__).resolve().parents[2]
CIKTI = KOK / 'public/images/ozel/kesik'
CIKTI.mkdir(parents=True, exist_ok=True)

NESNELER = {'top': 3915, 'elma': 2307, 'ayi': 5703, 'araba': 9047, 'kedi': 3504, 'bebek': 8109,
            'portakal': 2822, 'canta': 3410, 'kitap': 2017, 'balon': 7109,
            # Önünde/Arkasında referans nesneleri (derin kaplar ve karton kutu, beyaz zeminli)
            'kova': 2909, 'kutu': 2911, 'kase': 2907, 'sepet': 2915,
            # Ters/Düz (mavi plastik bardak) ve İlk/Son (kaplumbağa çizimi)
            'bardak': 6859, 'kaplumbaga': 42,
            # İlk/Son: eski sıra görsellerinin kaynağı (sola bakan lastik ördek, araba, ayı; Hoca: "aynı nesneler korunsun")
            'sira-ordek': 'gorsel-ham/ilk-son-ham/ordek.jpg', 'sira-araba': 'gorsel-ham/ilk-son-ham/araba.jpg', 'sira-ayi': 'gorsel-ham/ilk-son-ham/ayi.jpg'}

for ad, kid in NESNELER.items():
    im = Image.open(KOK / (kid if isinstance(kid, str) else f'public/images/{kid}.webp')).convert('RGB')
    a = np.asarray(im).astype(int)
    zemin = np.median(np.concatenate([a[0], a[-1], a[:, 0], a[:, -1]]), axis=0)
    fark = np.abs(a - zemin).max(axis=2)
    acik = Image.fromarray(((fark < 34) * 255).astype(np.uint8)).copy()  # zemine benzeyen (gölge dahil); copy: numpy belleği salt okunur
    for nokta in [(0, 0), (im.width - 1, 0), (0, im.height - 1), (im.width - 1, im.height - 1), (im.width // 2, im.height - 1)]:
        if acik.getpixel(nokta) == 255: ImageDraw.floodfill(acik, nokta, 128)
    m = (np.asarray(acik) != 128).astype(np.uint8) * 255
    alfa = Image.fromarray(m).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))
    rgba = im.copy(); rgba.putalpha(alfa)
    rgba = rgba.crop(alfa.getbbox())
    rgba.thumbnail((360, 360), Image.LANCZOS)
    rgba.save(CIKTI / f'{ad}.webp', quality=90)
    print(ad, rgba.size)
