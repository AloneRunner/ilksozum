# Şekiller: düz, net, kodla çizilmiş geometrik şekiller → gorsel-ham/sekiller/<renk>-<sekil>.jpg
# İki şıkta aynı renk, farklı şekil: "Hangisi üçgen?" (şekil tek fark). Gerekir: pip install pillow
import math
import os
from PIL import Image, ImageDraw

CIKTI = os.path.join(os.path.dirname(__file__), '..', '..', 'gorsel-ham', 'sekiller')
RENK = {'kirmizi': (220, 38, 38), 'mavi': (37, 99, 235), 'yesil': (22, 163, 74), 'sari': (234, 179, 8)}
N = 1024  # büyük çiz, gorsel-isle 512'ye küçültür (kenarlar yumuşak olsun diye 2x çizilip küçültülür)


def sekil(ciz, ad, renk):
    c, r = N, N  # 2x tuval merkezi/ölçüsü
    cx, cy = N, N
    if ad == 'daire':
        ciz.ellipse([cx - 560, cy - 560, cx + 560, cy + 560], fill=renk)
    elif ad == 'kare':
        ciz.rectangle([cx - 520, cy - 520, cx + 520, cy + 520], fill=renk)
    elif ad == 'dikdortgen':
        ciz.rectangle([cx - 720, cy - 400, cx + 720, cy + 400], fill=renk)
    elif ad == 'oval':
        ciz.ellipse([cx - 720, cy - 450, cx + 720, cy + 450], fill=renk)
    elif ad == 'ucgen':
        ciz.polygon([(cx, cy - 640), (cx + 680, cy + 520), (cx - 680, cy + 520)], fill=renk)
    elif ad == 'yildiz':
        noktalar = []
        for i in range(10):
            a = -math.pi / 2 + i * math.pi / 5
            rr = 680 if i % 2 == 0 else 280
            noktalar.append((cx + rr * math.cos(a), cy + 40 + rr * math.sin(a)))
        ciz.polygon(noktalar, fill=renk)
    elif ad == 'kalp':
        noktalar = []
        for i in range(200):
            t = 2 * math.pi * i / 200
            x = 16 * math.sin(t) ** 3
            y = 13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)
            noktalar.append((cx + x * 40, cy - y * 40 - 40))
        ciz.polygon(noktalar, fill=renk)


os.makedirs(CIKTI, exist_ok=True)
for rk, rgb in RENK.items():
    for ad in ['daire', 'kare', 'ucgen', 'dikdortgen', 'oval', 'yildiz', 'kalp']:
        im = Image.new('RGB', (2 * N, 2 * N), (255, 255, 255))
        sekil(ImageDraw.Draw(im), ad, rgb)
        im.resize((N, N), Image.LANCZOS).save(os.path.join(CIKTI, f'{rk}-{ad}.jpg'), quality=94)
print('tamam')
