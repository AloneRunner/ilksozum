# Flow'dan yan yana gelen çiftleri ortadan keser (Kasım turları). Kaynak: gorsel-ham/kasim4/, kasim5/
# Sol yarı ilk kavram, sağ yarı ikinci kavram. Hedef sayıysa public/images/<id>.webp, adsa public/images/ozel/cift/<ad>.webp olur.
# Yarım dikey olduğundan iki yol var: nesne resmi yanlardan kenar rengiyle genişletilir (kırpılmaz); sahne resmi (KIRP) üst-alttan kırpılır.
from pathlib import Path
import numpy as np
from PIL import Image

KOK = Path(__file__).resolve().parents[2]
ESLEME = {
    'kasim4': {
        'Baby_crying_and_sleeping_f3b97c9f': (4203, 4204),
        'Child_hitting_and_resting_drum_cd40a823': (4205, 4206),
        'Donkey_braying_and_standing_calm_45e42dcc': (4207, 4208),
        'Child_shouting_and_calming_down_a5f54108': (4217, 4218),
        'Children_jumping_and_drawing_630d43dc': (4219, 4220),
    },
    'kasim5': {
        'Yellow_bird_leaving_cage_191a2b9a': (2099, 2098), 'Wooden_cradle_and_doll_1fc25d98': (2111, 2110),  # içinde, dışında
        'Children_sitting_on_floor_panels_aa046eda': (5608, 5607), 'Red_toy_cars_comparison_panels_f23f5fab': (5602, 5601),  # yan yana, karşı karşıya
        'Two_blue_birds_on_branch_c283aea8': (5616, 5615), 'Two_horses_in_two_panels_143c199b': (5604, 5603),
        'Aquarium_filled_and_empty_panels_d16c4ab1': (2602, 2601), 'Yellow_bucket_with_colourful_balls_ea8c7702': (2612, 2611),  # dolu, boş
        'Swimming_pool_crowded_versus_empty_6dd12ba1': (4601, 4602), 'Beach_crowd_comparison_split_view_e8b4acd7': (4615, 4616),  # kalabalık, tenha
        'Comparing_crowded_and_empty_park_e3403a32': (4611, 4612), 'Town_street_comparison_panels_a956d3cc': (4619, 4620),
        'Rose_stem_thorn_comparison_0922bac6': ('dikenli-gul-a', 'dikenli-gul-b'), 'Cactus_with_and_without_spines_989da148': ('dikenli-kaktus-a', 'dikenli-kaktus-b'),
        'Comparing_sharp_and_blunt_pencils_6b3a2f1d': ('sivri-kalem-a', 'sivri-kalem-b'), 'Wooden_stick_pointed_and_blunt_a80cf80c': ('sivri-cubuk-a', 'sivri-cubuk-b'),
        'Comparing_carrot_end_shapes_c4c9470c': ('sivri-havuc-a', 'sivri-havuc-b'), 'Two_panels_comparing_stone_texture_0c6b7d53': ('puruzlu-tas-a', 'puruzlu-tas-b'),
        'Wood_comparison_rough_and_smooth_e7487c0c': ('puruzlu-tahta-a', 'puruzlu-tahta-b'), 'Cardboard_surface_texture_compar…_cef5a8a9': ('puruzlu-karton-a', 'puruzlu-karton-b'),
    },
}
ESLEME['kasim6'] = {  # külah ve böğürtlen dalı olmadı (iki yarım aynı), kullanılmadı
    'Comparing_two_bricks_surface_tex…_edf582e8': ('puruzlu-tugla-a', 'puruzlu-tugla-b'), 'Comparing_rough_and_smooth_woode…_b80cbdcd': ('puruzlu-kasik-a', 'puruzlu-kasik-b'),
    'Comparing_terracotta_flowerpot_s…_a78fdf09': ('puruzlu-saksi-a', 'puruzlu-saksi-b'), 'Comparing_rough_and_smooth_soap_db8a5eac': ('puruzlu-sabun-a', 'puruzlu-sabun-b'),
    'Comparison_of_steel_nail_tips_d022ec29': ('sivri-civi-a', 'sivri-civi-b'), 'Blue_wax_crayon_tip_comparison_21ef4fc0': ('sivri-boya-a', 'sivri-boya-b'),
    'Wooden_garden_stake_comparison_p…_ee956111': ('sivri-kazik-a', 'sivri-kazik-b'), 'Comparing_spiky_and_smooth_green…_fabb4b68': ('dikenli-top-a', 'dikenli-top-b'),
    'Cactus_comparing_spines_and_spin…_79cc7aae': ('dikenli-kaktus2-a', 'dikenli-kaktus2-b'), 'Yellow_pufferfish_changing_skin_…_6c88eb64': ('dikenli-balik-a', 'dikenli-balik-b'),
}
KIRP = {'Two_blue_birds_on_branch_c283aea8', 'Two_horses_in_two_panels_143c199b', 'Swimming_pool_crowded_versus_empty_6dd12ba1', 'Beach_crowd_comparison_split_view_e8b4acd7',
        'Comparing_crowded_and_empty_park_e3403a32', 'Town_street_comparison_panels_a956d3cc', 'Rose_stem_thorn_comparison_0922bac6'}
PAY = 6  # beyaz aralığın kenarındaki yumuşak geçiş
EN_COK = 14  # ortadan en çok bu kadar uzaklaşır: beyaz zeminli resimde aralık zeminle birleşir

def bosluk(a):
    """Ortadaki beyaz aralığın sol ve sağ sütunu; bulunamazsa ortanın iki yanı."""
    orta = a.shape[1] // 2
    beyaz = a.min(axis=2).mean(axis=0) > 245
    if not beyaz[orta - EN_COK:orta + EN_COK].any(): return orta - 8, orta + 8
    sol = sag = next(x for x in sorted(range(orta - EN_COK, orta + EN_COK), key=lambda k: abs(k - orta)) if beyaz[x])
    while sol > orta - EN_COK and beyaz[sol - 1]: sol -= 1
    while sag < orta + EN_COK and beyaz[sag + 1]: sag += 1
    return sol, sag

def kare(p, kirp):
    h, w = p.shape[:2]
    if w >= h:
        x = (w - h) // 2
        return p[:, x:x + h]
    fark = h - w
    if kirp: return p[fark // 2:fark // 2 + w]
    return np.pad(p, ((0, 0), (fark // 2, fark - fark // 2), (0, 0)), mode='edge')

(KOK / 'public/images/ozel/cift').mkdir(parents=True, exist_ok=True)
n = 0
for klasor, liste in ESLEME.items():
    for kaynak, (sol_id, sag_id) in liste.items():
        a = np.asarray(Image.open(KOK / 'gorsel-ham' / klasor / f'{kaynak}.jpg').convert('RGB'))
        s, g = bosluk(a)
        for parca, hedef in ((a[:, :s - PAY], sol_id), (a[:, g + 1 + PAY:], sag_id)):
            yol = KOK / (f'public/images/{hedef}.webp' if isinstance(hedef, int) else f'public/images/ozel/cift/{hedef}.webp')
            Image.fromarray(kare(parca, kaynak in KIRP)).resize((512, 512), Image.LANCZOS).save(yol, quality=80)
            n += 1
print(n, 'görsel yerleşti')
