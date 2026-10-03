# Kuş seti "arkasında": yaninda.jpg'deki kuşu kafesin arkasına taşı (Flow yapamadı, Kaan pro modda da denedi).
# kullanım: python kus-arkasinda.py yaninda.jpg cikti.jpg olcek merkez_x ayak_y   (tur 33: 0.85 810 820)
import sys, numpy as np
from PIL import Image
from scipy import ndimage as nd
src, out = sys.argv[1], sys.argv[2]
olcek, cx, ayak_y = float(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5])
a = np.asarray(Image.open(src).convert('RGB')).astype(float); H, W, _ = a.shape
# zemin: düz gri; kafes ve kuş dışındaki piksellere yüzey uydur
lum = a.mean(-1); chroma = a.max(-1) - a.min(-1)
on = np.abs(lum - np.median(lum)) > 10
kaba = nd.binary_dilation(on | (chroma > 25), iterations=20)
yy, xx = np.mgrid[0:H, 0:W] / W
X = np.stack([np.ones_like(xx), xx, yy, xx*xx, yy*yy, xx*yy], -1)
sel = ~kaba; sel[::2] = False
bg = X @ np.linalg.lstsq(X[sel], a[sel], rcond=None)[0]
d = np.abs(a - bg).sum(-1)
# kuş: sağdaki renkli nesne (x > 775)
kus = np.zeros((H, W), bool); kus[:, 778:] = d[:, 778:] > 30
kus = nd.binary_fill_holes(nd.binary_closing(kus, iterations=3))
lab, n = nd.label(kus); s = nd.sum(kus, lab, range(1, n+1)); kus = lab == (np.argmax(s) + 1)
ys, xs = np.where(kus)
# boş kafes: kuşun yerini zeminle doldur
bos = a.copy(); kd = nd.binary_dilation(kus, iterations=10)
halka = nd.binary_dilation(kd, iterations=12) & ~kd & ~nd.binary_dilation(kaba & ~nd.binary_dilation(kus, iterations=25), iterations=1)
fark = np.median((a - bg)[halka], axis=0)  # zemin modelinin yerel sapması
bos[kd] = bg[kd] + fark
# kafes maskesi (teller, tepsi): boş görselde zeminden farklı pikseller
kafes = np.clip((np.abs(bos - bg).sum(-1) - 10) / 25.0, 0, 1)
kafes = np.maximum(kafes, nd.grey_dilation(kafes, size=(2, 2)) * 0.8)
# kuş parçası, ölçekle
x0, x1, y0, y1 = xs.min()-4, xs.max()+5, ys.min()-4, ys.max()+5
al = nd.gaussian_filter(kus.astype(float), 0.8)[y0:y1, x0:x1]
rgba = np.concatenate([a[y0:y1, x0:x1], al[..., None]*255], -1).astype(np.uint8)
p = Image.fromarray(rgba, 'RGBA'); p = p.resize((int(p.width*olcek), int(p.height*olcek)), Image.LANCZOS)
pa = np.asarray(p).astype(float)
px, py = cx - p.width//2, ayak_y - p.height
lay = np.zeros((H, W, 4)); lay[py:py+p.height, px:px+p.width] = pa
ka = lay[..., 3:4]/255 * (1 - kafes[..., None])   # kafesin olduğu yerde kafes önde
res = bos*(1-ka) + lay[..., :3]*ka
Image.fromarray(np.clip(res, 0, 255).astype(np.uint8)).save(out, quality=95)
print('kus bbox', x0, x1, y0, y1)
