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

## Üçüncü tur: Gürültülü/Sessiz, kalan 5 çift (5 görsel, yan yana)

EDIT insanı korumadığı için her çift tek karede, iki yarım olarak isteniyor; Claude ortadan keser. Sol gürültülü (4203, 4205, 4207, 4217, 4219), sağ sessiz (4204, 4206, 4208, 4218, 4220).

Sonuç (2026-11-10): gorsel-ham/kasim4/, 5 görselin beşi de ilk denemede oldu, `kasim-ikili.py` ile kesildi. Kişi iki yarımda da aynı kaldı: insanlı çiftlerde bu yöntem kullanılsın.

Picture cards for young children in special education. Each image is ONE landscape 16:9 picture made of TWO panels side by side, separated by a thin white vertical gap in the exact middle. Both panels show the SAME subject: same face, same hair, same clothes, same size, same position, same camera. The ONLY difference is the one described.

Rules: photorealistic, bright soft even light, plain solid pale blue background in both panels, nothing else in the scene, no toys or furniture unless named, no text, no logos. Subject centered in its panel, large, fully inside the panel, with some space above and below. Generate exactly 5 images, one for each line below. Do not edit or replace earlier images.

1. A baby lying on a plain pale blue blanket, seen from above. Left panel: the baby crying loudly, mouth wide open, eyes shut, tears. Right panel: the SAME baby sleeping peacefully, mouth closed.
2. A small child sitting on the floor with a red toy drum in front. Left panel: hitting the drum with two sticks raised, mouth wide open, shouting happily. Right panel: the SAME child and drum, sticks resting still on the drum, mouth closed, calm.
3. A different small child sitting on the floor holding a metal cooking pot and a wooden spoon. Left panel: banging the pot with the spoon, mouth wide open, shouting happily. Right panel: the SAME child, pot on the lap, spoon still, mouth closed, calm.
4. A grey donkey standing, side view, whole animal visible. Left panel: head raised, mouth wide open, braying. Right panel: the SAME donkey, head level, mouth closed, calm.
5. A very simple classroom with a plain pale blue wall, one small table and four children, nothing else. Left panel: the four children standing, arms up, jumping, mouths wide open, shouting. Right panel: the SAME four children sitting at the table, mouths closed, quietly drawing.

Start with image 1.

## Dördüncü tur: Konum, Miktar, Duyular (20 görsel, yan yana)

Sonuç (2026-11-10): gorsel-ham/kasim5/, 20 görselin hepsi kullanıldı (`kasim-ikili.py`).

Sıra önem sırasıdır, 12'de durulabilir. Sol = ilk kavram, sağ = ikinci kavram. Claude ortadan keser ve yerleştirir.
Hedef: 1-2 İç/Dış (kuş, bebek); 3-6 Yan Yana (çocuklar, arabalar, kuşlar 5616/5615, atlar 5604/5603); 7-8 Dolu/Boş (2602/2601, 2612/2611); 9-12 Kalabalık/Tenha (4601/2, 4615/16, 4611/12, 4619/20); 13-20 Duyular.

Picture cards for young children in special education. Each image is ONE landscape 16:9 picture made of TWO panels side by side, separated by a thin white vertical gap in the exact middle. Both panels show the SAME subject and the SAME place: same faces, same hair, same clothes, same colours, same size, same camera, same light. The ONLY difference is the one described.

Rules: photorealistic, bright soft even light, plain solid pale blue background unless the line says otherwise, nothing else in the scene, no text, no logos. Subject large and fully inside the panel, with some space above and below. Generate exactly 20 images, one for each line. Do not edit or replace earlier images.

1. A white bird cage and a small yellow bird. Left: the bird inside the cage. Right: the SAME cage, door open, the bird on the floor right next to the cage.
2. A wooden baby cradle and a doll. Left: the doll lying down inside the cradle. Right: the SAME cradle, the doll lying on the floor right next to it.
3. Two children, a boy and a girl, full body, sitting on the floor. Left: sitting side by side, both facing the camera. Right: the SAME two children sitting facing each other, seen from the side.
4. Two identical red toy cars on a plain light floor, seen from directly above. Left: side by side, both pointing up. Right: the SAME cars, nose to nose, facing each other.
5. Two identical small blue birds on one bare branch. Left: side by side, both looking at the camera. Right: the SAME birds on the SAME branch, facing each other.
6. Two identical brown horses on plain green grass with a plain sky. Left: side by side, both facing the camera. Right: the SAME horses facing each other, seen from the side.
7. A rectangular glass aquarium on a plain surface, white background. Left: full of water with small orange fish and green plants. Right: the SAME aquarium, completely empty and dry.
8. A yellow plastic bucket seen from slightly above so the inside is visible, white background. Left: full to the top with colourful balls. Right: the SAME bucket, completely empty, the yellow inside clearly visible.
9. A swimming pool, realistic scene (no blue background). Left: crowded with 12 to 15 children in the water. Right: the SAME pool with only 1 child.
10. A sandy beach, realistic scene (no blue background). Left: crowded with 12 to 15 people. Right: the SAME beach with only 2 people.
11. A green park with a path and trees, realistic scene (no blue background). Left: crowded with 12 to 15 people. Right: the SAME park with only 1 person.
12. A quiet town street, realistic scene (no blue background). Left: crowded with 12 to 15 people walking. Right: the SAME street with only 1 person.
13. A single green rose stem, no flower, no leaves, white background. Left: with many big clearly visible thorns. Right: the SAME stem, with no thorns at all.
14. A round green cactus in a plain pot, white background. Left: covered with long sharp spines. Right: the SAME cactus and pot, smooth, no spines at all.
15. Extreme close-up of the tip of a yellow pencil, the tip fills the panel, white background. Left: very sharp pointed tip. Right: the SAME pencil, flat blunt tip.
16. Extreme close-up of the end of a wooden stick, white background. Left: sharpened to a point. Right: the SAME stick, cut flat and blunt.
17. Extreme close-up of the end of an orange carrot, same thickness and length in both, white background. Left: a sharp pointed end. Right: the SAME carrot, a rounded blunt end.
18. A flat grey stone, matte, not shiny, white background. Left: a very rough bumpy surface. Right: the SAME stone, same shape and colour, smooth matte surface.
19. A piece of light wood, matte, not shiny, white background. Left: rough with splinters. Right: the SAME piece of wood, same shape and colour, sanded smooth, matte.
20. A beige square of fabric-free cardboard-like material, matte, white background. Left: rough coarse sandpaper-like surface. Right: the SAME square, same colour, smooth matte surface.

Start with image 1.

## Beşinci tur: Pürüzlü, Sivri, Dikenli örnekleri (12 görsel, yan yana)

Sonuç (2026-11-10): gorsel-ham/kasim6/, 10 çift yerleşti. Külah (iki yarım aynı) ve böğürtlen dalı (sağda da diken var) olmadı, kullanılmadı.

Sol = pürüzlü / sivri / dikenli, sağ = pürüzsüz / küt / dikensiz.

Picture cards for young children in special education. Each image is ONE landscape 16:9 picture made of TWO panels side by side, separated by a thin white vertical gap in the exact middle. Both panels show the SAME object: same shape, same size, same colour, same position, same camera, same light. The ONLY difference is the one described.

Rules: photorealistic, bright soft even light, plain solid pure white background, nothing else in the scene, no text, no logos. Object large and fully inside the panel, unless the line says close-up. Nothing shiny or glossy: every surface is matte. Generate exactly 12 images, one for each line. Do not edit or replace earlier images.

ROUGH / SMOOTH
1. A red brick. Left: very rough, bumpy, crumbly surface. Right: the SAME brick, smooth matte surface.
2. A wooden spoon. Left: rough with splinters. Right: the SAME spoon, sanded smooth, matte.
3. A terracotta flowerpot. Left: very rough, gritty surface. Right: the SAME pot, smooth matte surface.
4. A plain white bar of soap. Left: rough, cracked, bumpy surface. Right: the SAME bar, smooth matte surface.

SHARP / BLUNT (close-up, the tip fills the panel; only the tip changes, same length and thickness)
5. Extreme close-up of the end of a steel nail, matte grey. Left: very sharp point. Right: the SAME nail, flat blunt end.
6. Extreme close-up of the tip of a blue wax crayon. Left: sharp pointed tip. Right: the SAME crayon, rounded blunt tip.
7. Close-up of the end of a thick wooden garden stake. Left: sharpened to a point. Right: the SAME stake, cut flat.
8. An empty ice cream cone, whole, pointing down. Left: very sharp pointed bottom. Right: the SAME cone, rounded blunt bottom.

THORNY / NOT THORNY (only the thorns change, nothing else)
9. A green rubber ball. Left: covered with long pointed spikes. Right: the SAME green ball, completely smooth, no spikes.
10. A single bare brown bramble branch, no leaves, no berries. Left: with many big clear thorns. Right: the SAME branch with no thorns at all.
11. A tall column cactus in a plain grey pot. Left: covered with long sharp spines. Right: the SAME cactus and pot, no spines at all.
12. A small round yellow pufferfish on a plain pale blue background. Left: covered with long sharp spines. Right: the SAME fish, same size, smooth skin, no spines.

Start with image 1.
