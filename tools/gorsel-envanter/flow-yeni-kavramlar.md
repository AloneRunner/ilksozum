# Flow turu 38: yeni kavramlar (Kaan: "hepsini isterim, faydalıymış")

Beş yeni kavram ekleniyor:
- **Yenir / Yenmez** ("Hangisi yenir?"): ağza her şeyi alma riskine karşı. Çiftler BİRBİRİNE BENZEYEN şeylerden oluşuyor (üzüm / bilye), çocuk ayırt etmeyi öğrensin.
- **Tehlikeli / Güvenli** ("Hangisi tehlikeli?"): güvenlik farkındalığı.
- **Hava durumu** ("Hangi resimde yağmur yağıyor?"): aynı yer, farklı hava.
- **İlk / Son:** Flow'dan yalnızca yandan çekilmiş tekil nesneler isteniyor. Claude bunları renk değiştirerek çoğaltıp sıraya dizecek ("Hangi resimde kırmızı araba ilk sırada?").
- **Açık / Koyu:** Flow gerekmez. Claude mevcut nesne resimlerinden yaptı (11 çift).
- **Kaç Tane?:** Gruplar Flow'suz yapıldı (elma, top, balon, araba, kupa; 1-5 adet). Flow'dan yalnızca parmak gösteren eller isteniyor (Bölüm F).
- **Tek / Çift:** 3 çift ayakkabıdan yapıldı. 10 çifte çıkmak için Bölüm E'deki çift eşyalar isteniyor.

Toplam 69 görsel. Claude ayırır: `yenir-yenmez/`, `tehlikeli-guvenli/`, `hava/`, `ilk-son-ham/`.

## Ajana yapıştırılacak metin

I am making picture cards for young children in special education (ages 3-6: autism, language delay). Topics: EDIBLE vs NOT EDIBLE, DANGEROUS vs SAFE, WEATHER, and some single objects.

RULES:
1. Photorealistic photos, bright, simple. NOT cartoon. No text, no logos, no letters, no brand names.
2. Single objects: plain pure white background, the object in the middle, about 65% of the picture. The object itself is NOT white.
3. Create every image as a SEPARATE NEW image. Never overwrite a previous one.
4. For pairs, the two pictures must look as SIMILAR as possible (same size, same angle, same light). Only what is asked differs.
5. Stop after every 5 images and wait for my approval.

PART A: EDIBLE vs NOT EDIBLE (pairs of things that look alike; the first is food, the second is NOT food)
1. A small bunch of green grapes.
2. A handful of green glass marbles, same size and color as the grapes.
3. A round red candy (hard candy) without wrapper.
4. A round red plastic button, same size and color.
5. A slice of yellow cheese.
6. A yellow kitchen sponge, same size and shape.
7. An orange carrot.
8. An orange crayon, same size as the carrot, lying the same way.
9. A chocolate bar piece, brown.
10. A brown bar of soap, same size and shape.
11. A red apple.
12. A red ball of the same size.
13. A glass of orange juice.
14. A clear bottle of orange liquid dish soap, same color and same height as the glass.
15. A cookie.
16. A round brown coaster, same size and color as the cookie.
17. A small pile of colorful candy-coated chocolates.
18. A small pile of colorful round pills (medicine tablets), same colors and size.
19. A banana.
20. A yellow plastic toy banana, same size, clearly a shiny plastic toy.

PART B: DANGEROUS vs SAFE (one object each, white background; the dangerous thing must look clearly dangerous but not scary)
21. A sharp kitchen knife. / 22. A plastic children's spoon.
23. Open scissors with sharp points. / 24. A soft teddy bear.
25. An electric wall socket. / 26. A wooden toy block.
27. A hot steaming iron with a red glow. / 28. A soft pillow.
29. A lit match with a small flame. / 30. A crayon.
31. A box of medicine pills. / 32. A box of crayons.
33. A broken glass with sharp pieces. / 34. A plastic cup.
35. A boiling pot with steam on a stove. / 36. A toy pot.

PART C: WEATHER (same place, same camera; only the weather changes; all clearly visible, daytime)
Place 1: a small house with a red roof and a tree in front.
37. SUNNY: bright sun, blue sky.
38. RAINY: grey sky, rain falling, puddles.
39. SNOWY: snow on the roof, tree and ground, snow falling.
40. WINDY: tree bending in strong wind, leaves flying.
Place 2: a playground with a slide and a swing.
41. SUNNY. 42. RAINY. 43. SNOWY. 44. WINDY.
Place 3: a park path with a bench.
45. SUNNY. 46. RAINY. 47. SNOWY. 48. WINDY.
Place 4: a child (5 years old) standing outside, front view.
49. SUNNY: child in a t-shirt and sun hat.
50. RAINY: same child with a yellow raincoat and umbrella.
51. SNOWY: same child in a winter coat, hat and scarf, snow falling.
52. WINDY: same child holding the hat, hair blowing.

PART D: SINGLE OBJECTS, side view, all FACING LEFT (white background; Claude will copy and recolor them to make lines)
53. A red toy car, side view, facing left.
54. A yellow rubber duck, side view, facing left.
55. A brown teddy bear walking, side view, facing left.
56. A green toy train wagon, side view, facing left.
57. A red apple (front view).

PART E: PAIRS (things that come in pairs; a PAIR side by side, top view, white background. Claude will crop one of them to make the "single" picture, so leave a small gap between the two.)
58. A pair of red knitted mittens.
59. A pair of striped children's socks.
60. A pair of small gold earrings with a red stone.
61. A pair of colorful roller skates.
62. A pair of wooden drumsticks.
63. A pair of blue children's sandals.
64. A pair of brown leather children's shoes.

PART F: COUNTING HANDS (the SAME child's hand, palm toward the camera, plain light background, clearly counted fingers, other fingers folded)
65. Hand showing ONE finger (index finger up).
66. Hand showing TWO fingers.
67. Hand showing THREE fingers.
68. Hand showing FOUR fingers (thumb folded).
69. Hand showing FIVE fingers (open hand).

Start with IMAGE 1.

## Sonuç (ilk deneme, 51 görsel geldi; Flow D bölümünden önce hata verdi)
- **Yenir/Yenmez: 7 çift.** Alınmayanlar:
  - Meyve suyu/deterjan: deterjan görselinde yanında meyve suyu bardağı vardı; kırpınca etiketsiz şişe meyve suyuna benzedi.
  - Şekerleme/ilaç: ikisi de renkli şeker gibi görünüyordu.
  - Muz: gerçek muz gelmedi; oyuncak muz da gerçeğinden ayırt edilemiyor.
- **Tehlikeli/Güvenli: 7 çift.** İlaç kutusu düz mavi bir kutuydu, ilaç olduğu anlaşılmıyordu.
- **Hava durumu: 16 görselin hepsi alındı, 16 çift.**
- **Gelmeyenler:** D (sıra nesneleri), E (çift eşyalar), F (parmaklı eller).

## Eksikler turu (ajana yapıştırılacak metin)

I am making picture cards for young children in special education (ages 3-6). Photorealistic photos, NOT cartoon. No text, no logos, no letters, no brand names. Plain pure white background, the object in the middle, about 65% of the picture. Create every image as a SEPARATE NEW image. Stop after every 5 images and wait for my approval.

EDIBLE vs NOT EDIBLE (pairs that look alike; the first is food, the second is clearly NOT food):
1. A yellow banana.
2. A yellow plastic toy banana with a visible seam and a small plastic loop, clearly a shiny toy.
3. A round chocolate cookie.
4. A round brown wooden coaster with wood grain.
5. A red strawberry.
6. A red strawberry-shaped eraser, clearly rubber.
7. A glass of orange juice.
8. An orange plastic dish soap bottle with a pump on top, no label text.

DANGEROUS vs SAFE (one object each):
9. A medicine bottle with a child-safety cap and some pills spilled next to it (clearly medicine).
10. A box of crayons, open, crayons visible.
11. A cleaning spray bottle (bleach type, no text).
12. A plastic water bottle with water.
13. A sewing needle with thread.
14. A soft cotton ball.

SINGLE OBJECTS, side view, all FACING LEFT:
15. A red toy car, side view, facing left.
16. A yellow rubber duck, side view, facing left.
17. A brown teddy bear walking, side view, facing left.
18. A green toy train wagon, side view, facing left.

PAIRS (a PAIR side by side, top view, small gap between the two):
19. A pair of red knitted mittens.
20. A pair of striped children's socks.
21. A pair of small gold earrings with a red stone.
22. A pair of colorful roller skates.
23. A pair of wooden drumsticks.
24. A pair of blue children's sandals.
25. A pair of brown leather children's shoes.

COUNTING HANDS (the SAME child's hand, palm toward the camera, plain light background, other fingers folded):
26. Hand showing ONE finger (index finger up).
27. Hand showing TWO fingers.
28. Hand showing THREE fingers.
29. Hand showing FOUR fingers (thumb folded).
30. Hand showing FIVE fingers (open hand).

Start with IMAGE 1.
