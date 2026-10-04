# Tek / Çift: "<nesne>-cift.jpg" (beyaz zeminde bir çift eşya) dosyasından tek eşyayı kesip "<nesne>-tek.jpg" yapar.
# İki parçayı bulur (yan yana ya da üst üste), soldakini/üsttekini alır, aynı boyutta zeminin ortasına koyar.
# Kullanım: python tools/gorsel-envanter/tek-cift.py   (yalnızca -tek dosyası olmayanları işler)
import os
import glob
import numpy as np
from PIL import Image
from scipy import ndimage as nd

# Otomatik yön bulunamayanlar için elle: (eksen, kesim oranı, eşik)
ELLE = {'paten': ('x', 0.5, 40), 'corap': ('y', 0.5, 40), 'baget': ('y', 0.5, 18)}
KLASOR = os.path.join(os.path.dirname(__file__), '..', '..', 'gorsel-ham', 'tek-cift')

for cift in sorted(glob.glob(os.path.join(KLASOR, '*-cift.jpg'))):
    tek = cift.replace('-cift.jpg', '-tek.jpg')
    if os.path.exists(tek):
        continue
    im = Image.open(cift).convert('RGB')
    a = np.asarray(im).astype(float)
    H, W, _ = a.shape
    kenar = np.concatenate([a[:12].reshape(-1, 3), a[-12:].reshape(-1, 3), a[:, :12].reshape(-1, 3), a[:, -12:].reshape(-1, 3)])
    zemin = np.median(kenar, 0)
    ad = os.path.basename(cift)[:-len('-cift.jpg')]
    elle = ELLE.get(ad)
    m = np.abs(a - zemin).sum(-1) > (elle[2] if elle else 40)
    m = nd.binary_opening(m, iterations=1 if elle else 2)
    # İki eşya arasındaki boşluk: ortadaki üçte birlik bölgede en az dolu sütun (yan yana) ya da satır (üst üste)
    sut, sat = m.sum(0), m.sum(1)
    sx = W // 3 + int(np.argmin(sut[W // 3: 2 * W // 3]))
    sy = H // 3 + int(np.argmin(sat[H // 3: 2 * H // 3]))
    # Hangi eksende daha temiz bir boşluk var? (kesim çizgisindeki dolu piksel oranı)
    yatay = sut[sx] / max(1, sut.max()) <= sat[sy] / max(1, sat.max())
    if elle:
        yatay = elle[0] == 'x'
        sx, sy = int(W * elle[1]), int(H * elle[1])
    parca_m = m[:, :sx] if yatay else m[:sy, :]
    ys, xs = np.where(parca_m)
    if len(xs) == 0:
        print('boşluk bulunamadı:', os.path.basename(cift))
        continue
    x0, y0, x1, y1 = xs.min(), ys.min(), xs.max(), ys.max()
    pay = 30
    x1 = min(x1 + pay, sx - 2) if yatay else x1 + pay
    y1 = min(y1 + pay, sy - 2) if not yatay else y1 + pay
    x0, y0, x1, y1 = max(0, x0 - pay), max(0, y0 - pay), min(W, x1), min(H, y1)
    parca = im.crop((x0, y0, x1, y1))
    tuval = Image.new('RGB', (W, H), tuple(int(c) for c in zemin))
    tuval.paste(parca, ((W - parca.width) // 2, (H - parca.height) // 2))
    tuval.save(tek, quality=93)
    print('tamam', os.path.basename(tek), 'yan yana' if yatay else 'üst üste')
