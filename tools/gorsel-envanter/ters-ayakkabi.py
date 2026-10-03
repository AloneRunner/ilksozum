# Beyaz zeminde yukarıdan çekilmiş ayakkabı çifti -> TERS: her tek yerinde aynalanır (sağ tek sola geçmiş gibi) ve burnu dışa döner.
# Flow ayakkabıyı ters ayağa çeviremiyor (Kaan); ters hali buradan üretilir. Gerekir: pip install pillow numpy scipy
# kullanım: python ters-ayakkabi.py girdi.jpg cikti.jpg aci [esik]
#   aci>0: burunlar yukarı bakıyorsa; aşağıdaysa negatif. esik: tek maskesi (varsayılan 60; beyaz burunlu spor ayakkabıda 30)
# tur 32: çizme 14, terlik 14, spor ayakkabı -14 30
import sys, numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as nd
src, out, ang = sys.argv[1], sys.argv[2], float(sys.argv[3])
im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(float)
H, W, _ = a.shape
# 1) zemin modeli: renkli (doygun) ve koyu bölgeler dışındaki piksellere ikinci derece yüzey uydur (vinyet dahil)
chroma = a.max(-1) - a.min(-1); lum = a.mean(-1)
kaba = nd.binary_dilation((chroma > 22) | (lum < np.percentile(lum, 40) - 25), iterations=45)
yy, xx = np.mgrid[0:H, 0:W] / max(H, W)
X = np.stack([np.ones_like(xx), xx, yy, xx*xx, yy*yy, xx*yy, xx**3, yy**3, xx*xx*yy, xx*yy*yy], -1)
sel = ~kaba
sel[::3] = False; sel[:, ::3] = False
coef = np.linalg.lstsq(X[sel], a[sel], rcond=None)[0]
bg = X @ coef
# 3) yerel zeminden fark -> yumuşak alfa (gölge yarı saydam gelir)
d = np.abs(a - bg).sum(-1)
m = nd.binary_fill_holes(nd.binary_closing(d > float(sys.argv[4]) if len(sys.argv) > 4 else d > 60, iterations=4))
col = m.sum(0); x0 = W//3; cut = x0 + int(np.argmin(col[x0:2*W//3]))
m[:, cut-1:cut+2] = False
lab, n = nd.label(m)
sizes = nd.sum(m, lab, range(1, n+1))
big = sorted((np.argsort(sizes)[-2:] + 1).tolist(), key=lambda k: nd.center_of_mass(lab == k)[1])
def premul_rotate(p, aci):
    # önceden çarpılmış alfa ile döndür: kenarda koyu çizgi kalmasın
    x = np.asarray(p).astype(float); al = x[..., 3:4]/255
    pre = np.concatenate([x[..., :3]*al, x[..., 3:4]], -1).astype(np.uint8)
    r = np.asarray(Image.fromarray(pre, 'RGBA').rotate(aci, resample=Image.BICUBIC, expand=True)).astype(float)
    al2 = np.maximum(r[..., 3:4]/255, 1e-6)
    rgb = np.clip(r[..., :3]/al2, 0, 255)
    return Image.fromarray(np.concatenate([rgb, r[..., 3:4]], -1).astype(np.uint8), 'RGBA')
res = Image.fromarray(np.clip(bg, 0, 255).astype(np.uint8)).convert('RGBA')
for i, k in enumerate(big):
    bolge = nd.binary_dilation(lab == k, iterations=20)
    bolge[:, cut-1:cut+2] = bolge[:, cut-1:cut+2] & (np.arange(W)[cut-1:cut+2] < cut if i == 0 else np.arange(W)[cut-1:cut+2] > cut)
    tek = nd.binary_opening(lab == k, iterations=2)
    cekirdek = nd.gaussian_filter(nd.binary_erosion(tek, iterations=1).astype(float), 1.2)
    yumusak = np.clip((d - 8) / 40.0, 0, 1)  # gölge yarı saydam, zemine doğru sönümlenir
    sinir = nd.gaussian_filter(bolge.astype(float), 6)
    al = np.maximum(cekirdek, yumusak) * sinir
    ys, xs = np.where(bolge)
    bx0, bx1, by0, by1 = max(xs.min()-12, 0), min(xs.max()+13, W), max(ys.min()-12, 0), min(ys.max()+13, H)
    cx, cy = (bx0+bx1)/2, (by0+by1)/2
    rgba = im.convert('RGBA'); rgba.putalpha(Image.fromarray((al*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.7)))
    piece = rgba.crop((bx0, by0, bx1, by1)).transpose(Image.FLIP_LEFT_RIGHT)
    piece = premul_rotate(piece, ang if i == 0 else -ang)
    px, py = int(cx - piece.width/2), int(cy - piece.height/2)
    res.alpha_composite(piece, (px, py))
res.convert('RGB').save(out, quality=95)
print(out, 'kesim x', cut, 'tekler', [int(sizes[k-1]) for k in big])
