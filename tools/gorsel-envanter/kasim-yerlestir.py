# Flow'dan gelen Kasım görsellerini yerleştirir (Gökhan Hoca, 2026-11-09 turu). Kaynak: gorsel-ham/kasim/
# Sayı: public/images/<id>.webp üstüne yazılır; ad: public/images/ozel/cift/<ad>.webp
from pathlib import Path
from PIL import Image

KOK = Path(__file__).resolve().parents[2]
HAM = KOK / 'gorsel-ham/kasim'
ESLEME = {
    # Islak/Kuru: mevcut id'ler (ıslak, kuru)
    3301: 'Wet_blue_child_sock_4cf0cfa9', 3302: 'Blue_child_sock_lying_flat_ec9ab5b2',
    3303: 'Folded_orange_towel_bfd5b1c0', 3304: 'Folded_orange_towel_4e6511bc',
    3305: 'Wet_pile_of_sand_a97cb308', 3306: 'Pile_of_dry_sand_4c99bdb1',
    3316: 'Green_leaf_covered_with_water_a25a2f49', 3317: 'Dry_green_tree_leaf_lying_d1c1312f',
    3318: 'Wet_grey_tiled_floor_41f7b8ec', 3319: 'Grey_tiled_floor_af92f08d',
    # Kırışık/Düz: mevcut id'ler (kırışık, düz); peçetede düz hali sonraki turda
    4718: 'Green_curtain_with_sharp_wrinkles_4447a7aa', 4717: 'Green_curtain_hanging_from_rail_009a6ed4',
    4704: 'Pink_skirt_with_wrinkles_b6b3803a', 4703: 'Pink_skirt_laid_flat_1ab266aa',
    4716: 'Red_cloth_napkin_with_wrinkles_e27beae2',
    # Gürültülü/Sessiz: mevcut id'ler (gürültülü, sessiz)
    4201: 'Lion_roaring_side_view_4904af19', 4202: 'Lion_with_closed_mouth_36038861',
    4215: 'Dog_barking_side_view_8a4a5575', 4216: 'Dog_standing_side_view_9ad15f1e',
    # Yeni çiftler (a: ilk öğretilen yan)
    'islak-ayi-a': 'Wet_brown_teddy_bear_sitting_e4a5646e', 'islak-ayi-b': 'Brown_teddy_bear_sitting_a675a2dd',
    'islak-ayakkabi-a': 'Red_wet_children_sneakers_447cd71e', 'islak-ayakkabi-b': "Red_children's_sneakers_side_view_43b8e554",
    'islak-kagit-a': 'Wet_pale_yellow_paper_lying_05640451', 'islak-kagit-b': 'Pale_yellow_paper_lying_flat_48d8deca',
    'islak-mont-a': 'Blue_winter_jacket_soaking_wet_1784800e', 'islak-mont-b': "Blue_child's_winter_jacket_5ab9db48",
    'sicak-cay-a': 'Hot_tea_with_steam_rising_705769bf', 'sicak-cay-b': 'Cold_tea_with_ice_cubes_b48b145a',
    'sicak-su-a': 'Hot_glass_of_water_steaming_967d5431', 'sicak-su-b': 'Glass_of_water_with_ice_c39fe699',
    'sicak-corba-a': 'Ceramic_bowl_of_orange_soup_59cd1818', 'sicak-corba-b': 'Bowl_of_cold_orange_soup_004f93e1',
    'sicak-tencere-a': 'Metal_cooking_pot_with_steam_46f0aee9', 'sicak-tencere-b': 'Metal_pot_covered_in_frost_6764067c',
    'sicak-ekmek-a': 'Freshly_baked_bread_rising_steam_11ee16fb', 'sicak-ekmek-b': 'Loaf_of_bread_with_frost_fbcb6bbf',
    'hava-ev-a': 'Small_house_with_garden_6f3b746b', 'hava-ev-b': 'Small_house_in_winter_snow_4034d8a8',
    'hava-park-a': 'Park_with_bench_and_swing_bd633118', 'hava-park-b': 'Snow_falling_on_park_bench_72cd1cf8',
    'hava-sokak-a': 'Quiet_street_on_sunny_day_ec65e48a', 'hava-sokak-b': 'Snow_falling_on_quiet_street_b5093a04',
    'kirisik-yastik-a': 'Green_pillow_with_sharp_wrinkles_945f962b', 'kirisik-yastik-b': 'Light_green_pillow_16788cc1',
}
(KOK / 'public/images/ozel/cift').mkdir(parents=True, exist_ok=True)
for hedef, kaynak in ESLEME.items():
    im = Image.open(HAM / f'{kaynak}.jpg').convert('RGB')
    w, h = im.size; s = min(w, h)
    im = im.crop(((w - s) // 2, (h - s) // 2, (w + s) // 2, (h + s) // 2)).resize((512, 512), Image.LANCZOS)
    yol = KOK / (f'public/images/{hedef}.webp' if isinstance(hedef, int) else f'public/images/ozel/cift/{hedef}.webp')
    im.save(yol, quality=80)
print(len(ESLEME), 'görsel yerleşti')
