# Gölge Eşleştirme için saydam kesimler: mini oyun görsel setlerindeki (src/data/gameImageSets.ts) her eski id'nin
# yeni fotoğrafı (NESNE_YENI) beyaz zeminden ayrılır → public/images/golge/<eskiId>.webp (saydam, 256px).
# Zemin: kenara bağlı neredeyse-beyaz pikseller. Sahneli (renkli zeminli) ya da kesimi şüpheli olanlar atlanır;
# oyun onlar için eski saydam çizimi kullanır.
# Çalıştır: python tools/gorsel-envanter/golge-kes.py
import json, re
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[2]
setler = (ROOT / 'src/data/gameImageSets.ts').read_text(encoding='utf-8')
idler = sorted({int(m) for m in re.findall(r'id: (\d+)', setler)})
nesne = (ROOT / 'src/services/database/nesneYeni.ts').read_text(encoding='utf-8')
harita = {int(a): b for a, b in re.findall(r"^  (\d+): '([^']+)'", nesne, re.M)}

cikti = ROOT / 'public/images/golge'
cikti.mkdir(parents=True, exist_ok=True)
rapor = {'kesildi': [], 'atlandi': {}}
# Yeni fotoğrafı sahne olanlar (gökyüzü, ray, tarla...): gölgesi çıkmaz, eski çizim kalır
SAHNE = {26, 106, 107, 257, 289}
for eid in idler:
    url = harita.get(eid)
    if eid in SAHNE:
        rapor['atlandi'][eid] = 'sahne fotoğrafı'; continue
    if not url:
        rapor['atlandi'][eid] = 'yenisi yok'; continue
    im = Image.open(ROOT / 'public' / url.lstrip('/')).convert('RGB')
    a = np.asarray(im).astype(np.int16)
    # zemin: beyaz + nesnenin altındaki açık gri yer gölgesi (renksiz, açık); kenardaki 6 piksel hep zemin
    renksiz = (a.max(axis=2) - a.min(axis=2)) < 20
    beyaz = renksiz & (a.min(axis=2) > 178)
    beyaz[:6, :] = beyaz[-6:, :] = True; beyaz[:, :6] = beyaz[:, -6:] = True
    etiket, _ = ndimage.label(beyaz)
    kenar = set(np.unique(np.concatenate([etiket[0], etiket[-1], etiket[:, 0], etiket[:, -1]]))) - {0}
    zemin = np.isin(etiket, list(kenar))
    on = ~zemin
    on = ndimage.binary_opening(on, iterations=2)
    on = ndimage.binary_fill_holes(on)
    # en büyük parçalar dışındaki kırıntıları at
    lab, n = ndimage.label(on)
    if n:
        boy = ndimage.sum(on, lab, range(1, n + 1))
        on = np.isin(lab, [i + 1 for i, b in enumerate(boy) if b >= max(boy) * 0.12])
    oran = on.mean()
    kenar_on = np.concatenate([on[0], on[-1], on[:, 0], on[:, -1]]).mean()
    if oran > 0.8 or oran < 0.03 or kenar_on > 0.25:
        rapor['atlandi'][eid] = f'şüpheli kesim (doluluk {oran:.2f}, kenar {kenar_on:.2f})'; continue
    alfa = ndimage.gaussian_filter(on.astype(np.float32), 0.8)
    rgba = np.dstack([np.asarray(im), (np.clip(alfa, 0, 1) * 255).astype(np.uint8)])
    out = Image.fromarray(rgba, 'RGBA')
    kutu = out.getbbox()
    if kutu: out = out.crop(kutu)
    out.thumbnail((256, 256), Image.LANCZOS)
    kare = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
    kare.paste(out, ((256 - out.width) // 2, (256 - out.height) // 2))
    kare.save(cikti / f'{eid}.webp', quality=82, method=6)
    rapor['kesildi'].append(eid)

(ROOT / 'src/data/golgeListesi.ts').write_text(
    '// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/golge-kes.py. Saydam kesimi olan mini oyun görselleri (public/images/golge/<id>.webp).\n'
    'export const GOLGE_KESIMLERI = new Set<number>([' + ', '.join(map(str, rapor['kesildi'])) + ']);\n', encoding='utf-8')
(ROOT / 'tools/gorsel-envanter/golge-kes.json').write_text(json.dumps(rapor, ensure_ascii=False, indent=1), encoding='utf-8')
print('kesildi', len(rapor['kesildi']), '| atlandı', len(rapor['atlandi']))
for k, v in rapor['atlandi'].items(): print(' ', k, v)
