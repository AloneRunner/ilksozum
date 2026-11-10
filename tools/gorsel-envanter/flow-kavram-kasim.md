# Flow turu: Kasım kavramları (Gökhan Hoca, 2026-11-09)

Islak/Kuru, Sıcak/Soğuk, Kırışık/Düz, Gürültülü/Sessiz için. Toplam 60 görsel (30 çift); parça parça yapılabilir, sıra önem sırasıdır.
İndirilenler `gorsel-ham/kasim/` klasörüne, adlarını Claude koyar. Mevcut görselin üstüne yazılanlarda kod değişmez, yenilerde `bekliyor: true` kalkar (src/data/ciftKavramlar.ts). Hepsinin sesi hazır.
Hava aşamasında Mevsimler'in yaz/kış resimleri de kullanılıyor (ağaç, çocuk); onlar istenmedi.
Saç çifti Flow'a verilmedi: EDIT insanı korumuyor, Claude kodla aynı çocuğu çizecek.

## Ajana yapıştırılacak metin

I am making picture cards for young children in special education (ages 3-6: autism, intellectual disability, Down syndrome). Each pair teaches one concept, so the ONLY difference between the two images of a pair must be that concept.

RULES:
1. Photorealistic, bright, soft even light, plain solid pure white background unless the item says otherwise, no text, no logos, no letters. Square image, item centered and large, fully inside the frame.
2. VERY IMPORTANT: both images of a pair must exist at the end, as two separate images in the project. NEVER replace, modify in place or delete the first image. If I only see one image of a pair, the job has failed.
3. "EDIT of N" does NOT mean changing image N. It means: use image N as a REFERENCE (ingredient) and generate a NEW, separate image from it, leaving image N untouched: same item, same colour, same size, same position, same camera. Change ONLY what is described. The difference must be VERY clear, even for a small child.
4. After each pair, check that both images are still there. Stop after every 4 images and wait for my approval.

WET / DRY:
1. A blue child's sock lying flat, dry, sharp focus, clear knitted texture.
2. EDIT of 1: the SAME sock soaking wet: darker fabric, shiny, water drops on it and a small puddle under it.
3. An orange folded towel, dry and fluffy.
4. EDIT of 3: the SAME towel soaking wet: darker, flattened, water dripping, small puddle.
5. A small pile of light golden sand, dry and powdery.
6. EDIT of 5: the SAME pile of sand wet: darker brown, clumped, shiny, holding its shape.
7. A green tree leaf, dry-looking matte surface, lying flat.
8. EDIT of 7: the SAME leaf covered with big clear water drops, shiny.
9. A square of light grey tiled floor seen from above at an angle, completely dry, matte, fills the whole image (no white background).
10. EDIT of 9: the SAME floor wet: shiny puddles and reflections on the tiles.
11. A brown teddy bear sitting, front view, dry and fluffy.
12. EDIT of 11: the SAME bear soaking wet: fur dark, flat and clumped, water dripping.
13. A pair of red children's sneakers, side view, dry and clean.
14. EDIT of 13: the SAME sneakers soaking wet: darker, shiny, water drops and a puddle under them.
15. A sheet of pale yellow paper lying flat, dry and smooth.
16. EDIT of 15: the SAME paper wet: darker wet patches, slightly wavy, water drops on it.
17. A blue child's winter jacket lying flat, dry.
18. EDIT of 17: the SAME jacket soaking wet: darker, shiny, water drops running down.

HOT / COLD (same object, same camera):
19. A clear glass of tea, very hot, thick white steam rising from it.
20. EDIT of 19: the SAME glass of tea with ice cubes in it, frost and cold water droplets on the glass, no steam.
21. A clear glass of water, very hot, thick white steam rising.
22. EDIT of 21: the SAME glass of water with ice cubes, cold droplets on the glass, no steam.
23. A ceramic bowl of orange soup, thick white steam rising.
24. EDIT of 23: the SAME bowl of soup, no steam, covered with frost and small ice crystals around the rim.
25. A metal cooking pot with a lid, thick white steam coming out.
26. EDIT of 25: the SAME pot, no steam, covered with white frost and icicles.
27. A loaf of bread, freshly baked, thick white steam rising.
28. EDIT of 27: the SAME loaf of bread, no steam, covered with white frost and ice crystals.

WEATHER (full scenes, no people, no white background):
29. A small house with a garden on a very hot sunny summer day, bright sun, green grass, blue sky.
30. EDIT of 29: the SAME house and garden in deep winter: thick snow everywhere, snow falling, grey sky.
31. A park with a bench and a swing on a very hot sunny summer day.
32. EDIT of 31: the SAME park covered in thick snow, snow falling.
33. A quiet street with houses on a hot sunny summer day.
34. EDIT of 33: the SAME street covered with thick snow, snow falling.

WRINKLED / SMOOTH (same item, same colour, same model):
35. A green curtain hanging straight from a rail, perfectly smooth and flat.
36. EDIT of 35: the SAME curtain still hanging from the rail, full of sharp messy wrinkles.
37. A pink child's skirt laid flat, perfectly smooth, ironed.
38. EDIT of 37: the SAME pink skirt laid flat, full of sharp messy wrinkles. Same colour, same length.
39. A red cloth napkin folded in a square, perfectly smooth.
40. EDIT of 39: the SAME napkin, same square shape, full of sharp wrinkles.
41. Long dark blue child's trousers laid flat, perfectly smooth, ironed.
42. EDIT of 41: the SAME trousers, same length, full of sharp wrinkles.
43. A yellow child's t-shirt laid flat, perfectly smooth, ironed.
44. EDIT of 43: the SAME t-shirt, same yellow, full of sharp wrinkles.
45. A grey child's blazer laid flat, perfectly smooth, ironed.
46. EDIT of 45: the SAME blazer full of sharp wrinkles.
47. A folded blue towel, perfectly smooth and neat.
48. EDIT of 47: the SAME towel, same fold, full of sharp wrinkles.
49. A light green pillow, perfectly smooth, plump.
50. EDIT of 49: the SAME pillow full of sharp wrinkles.

NOISY / QUIET (animal, plain pale blue background, whole animal visible):
51. A lion standing, side view, mouth wide open, roaring.
52. EDIT of 51: the SAME lion in the SAME position with its mouth closed, calm. Nothing else changes.
53. A rooster standing on the ground, side view, beak wide open, crowing.
54. EDIT of 53: the SAME rooster, beak closed, calm. Nothing else changes.
55. A cat sitting, front view, mouth wide open, meowing.
56. EDIT of 55: the SAME cat, mouth closed, calm. Nothing else changes.
57. A dog standing, side view, mouth wide open, barking.
58. EDIT of 57: the SAME dog, mouth closed, calm. Nothing else changes.
59. A cow standing, side view, head up, mouth open, mooing.
60. EDIT of 59: the SAME cow, mouth closed, head level, calm. Nothing else changes.

Start with IMAGE 1.

## Sonuç (2026-11-10)
53 dosya geldi (gorsel-ham/kasim/), `kasim-yerlestir.py` ile yerleşti: 22 tam çift + peçetenin kırışık hali.
Flow'da EDIT önceki resmin üstüne yazıyordu; kural 2-3 ona göre düzeltildi.
Eksik çıkanlar aşağıdaki ikinci turda.

## İkinci tur: yapıştırılacak metin (16 görsel, 8 çift)

Sonuç (2026-11-10): gorsel-ham/kasim2/; 7 çift yerleşti. Peçetede birinci turun daha kırışık resmi kaldı. Mavi havlunun ikinci tur hali olmadı; birinci turun indirilmemiş çifti gorsel-ham/kasim3/ klasöründen alındı.

Same rules: photorealistic, bright soft light, no text or logos, square image, item centered and large. Every pair must end as TWO separate images. "EDIT of N" means: use image N as a reference and generate a NEW separate image, leaving image N untouched: same item, same colour, same size, same position, same camera.

WRINKLED / SMOOTH (plain pure white background):
1. A red cloth napkin laid flat, a square, perfectly smooth, ironed.
2. EDIT of 1: the SAME napkin, same square shape, full of sharp messy wrinkles.
3. Long dark blue child's trousers laid flat, perfectly smooth, ironed.
4. EDIT of 3: the SAME trousers, same length, full of sharp messy wrinkles.
5. A yellow child's t-shirt laid flat, perfectly smooth, ironed.
6. EDIT of 5: the SAME t-shirt, same yellow, full of sharp messy wrinkles.
7. A grey child's blazer laid flat, perfectly smooth, ironed.
8. EDIT of 7: the SAME blazer full of sharp messy wrinkles.
9. A folded blue towel, perfectly smooth and neat.
10. EDIT of 9: the SAME towel, same fold, full of sharp messy wrinkles.

NOISY / QUIET (plain pale blue background, whole animal visible):
11. A rooster standing on the ground, side view, beak wide open, crowing.
12. EDIT of 11: the SAME rooster, beak closed, calm. Nothing else changes.
13. A cat sitting, front view, mouth wide open, meowing.
14. EDIT of 13: the SAME cat, mouth closed, calm. Nothing else changes.
15. A cow standing, side view, head up, mouth open, mooing.
16. EDIT of 15: the SAME cow, mouth closed, head level, calm. Nothing else changes.

Start with IMAGE 1.
