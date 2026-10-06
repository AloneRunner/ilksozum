import { CommunicationCategory, CommunicationCard } from '../types.ts';
import { imageData } from './database/imageData.ts';

// --- Icon Imports ---
import WantIcon from '../components/icons/comm/WantIcon.tsx';
import MoveIcon from '../components/icons/MoveIcon.tsx';
import FeelingsIcon from '../components/icons/comm/FeelingsIcon.tsx';
import PeopleIcon from '../components/icons/comm/PeopleIcon.tsx';
import LocationIcon from '../components/icons/LocationIcon.tsx';
import ObjectsIcon from '../components/icons/ObjectsIcon.tsx';
import PawIcon from '../components/icons/comm/PawIcon.tsx';
import CarIcon from '../components/icons/comm/CarIcon.tsx';

// Helper function to create cards from image data
const createCardFromImage = (id: number, customText?: string): CommunicationCard => {
    const image = imageData.find(img => img.id === id);
    if (!image) {
        // Fallback for missing images, ensures app doesn't crash
        return { id: `img_${id}_missing`, text: customText || `Görsel ID ${id}`, imageId: 9999, audioKey: 'hata' };
    }
    const text = customText || image.word;
    const audioKey = text.toLocaleLowerCase('tr-TR').replace(/ /g, '_');
    return {
        id: `img_${image.id}`,
        text: text,
        imageId: image.id,
        audioKey: audioKey
    };
};

// Helper function for manual cards without a specific image
const createManualCard = (id: string, text: string, imageId?: number): CommunicationCard => {
    const audioKey = text.toLocaleLowerCase('tr-TR').replace(/ /g, '_');
    return { id, text, audioKey, imageId };
};

export const communicationCategories: CommunicationCategory[] = [
  // 0. Temel İhtiyaçlar (Mavi)
  {
    id: 'ihtiyaclar',
    title: 'Temel İhtiyaçlar',
    icon: WantIcon,
    color: 'blue',
    subCategories: [
      { id: 'meyveler', title: 'Meyveler', imageId: 43, cards: [
          createCardFromImage(43, 'Elma'), createCardFromImage(114, 'Muz'), createCardFromImage(115, 'Portakal'),
          createCardFromImage(88, 'Üzüm'), createCardFromImage(171, 'Çilek'), createCardFromImage(170, 'Karpuz'),
          createCardFromImage(365, 'Armut'), createCardFromImage(278, 'Kiraz'), createCardFromImage(419, 'Mandalina'),
          createCardFromImage(295, 'Kavun'), createCardFromImage(279, 'Ananas'), createCardFromImage(649, 'Kivi'),
          createCardFromImage(498, 'Nar'),
          // Yeni eklenen meyveler
          createCardFromImage(944, 'İncir'), createCardFromImage(641, 'Erik'),
      ]},
      { id: 'sebzeler', title: 'Sebzeler', imageId: 128, cards: [
          createCardFromImage(128, 'Domates'), createCardFromImage(116, 'Salatalık'), createCardFromImage(98, 'Havuç'),
          createCardFromImage(802, 'Patates'), createCardFromImage(75, 'Soğan'), createCardFromImage(787, 'Yeşil Biber'),
          createCardFromImage(334, 'Lahana'), createCardFromImage(420, 'ıspanak'), createCardFromImage(803, 'Kabak'),
          createCardFromImage(311, 'Brokoli'), createCardFromImage(280, 'Patlıcan'), createCardFromImage(129, 'Marul'),
          createCardFromImage(853, 'Mısır'),
          // Yeni eklenen sebzeler / diğer bitkisel gıdalar
          createCardFromImage(943, 'Sarımsak'), createCardFromImage(931, 'Kereviz'), createCardFromImage(636, 'Turp'), createCardFromImage(928, 'Bezelye'),
      ]},
      { id: 'ana-yemekler', title: 'Ana Yemekler', imageId: 218, cards: [
          createCardFromImage(218, 'Pilav'), createCardFromImage(267, 'Makarna'), createCardFromImage(808, 'Köfte'),
          createCardFromImage(788, 'Tavuk'), createCardFromImage(740, 'Balık'), createCardFromImage(266, 'Çorba'),
          createCardFromImage(23, 'Pizza'), createCardFromImage(809, 'Hamburger'), createCardFromImage(812, 'Mantı'),
          createCardFromImage(789, 'Sulu Yemek'), createCardFromImage(623, 'Tost'), createCardFromImage(854, 'Dolma'),
          // Yeni ana yemek önerileri
          createCardFromImage(312, 'Sosis'), createCardFromImage(366, 'Sosisli Sandviç'),
      ]},
      { id: 'kahvaltiliklar', title: 'Kahvaltılıklar', imageId: 50, cards: [
          createCardFromImage(50, 'Peynir'), createCardFromImage(119, 'Zeytin'), createCardFromImage(113, 'Yumurta'),
          createCardFromImage(790, 'Ekmek'), createCardFromImage(639, 'Reçel'), createCardFromImage(810, 'Tereyağı'),
          createCardFromImage(296, 'Simit'), createCardFromImage(228, 'Bal'),
          // Kaşar Peyniri aynı görseli kullandığı için çıkarıldı; gerekirse farklı ID eklenebilir
          createCardFromImage(860, 'Sucuk'),
      ]},
      { id: 'atistirmaliklar', title: 'Atıştırmalıklar', imageId: 330, cards: [
          createCardFromImage(330, 'Bisküvi'), createCardFromImage(804, 'Cips'), createCardFromImage(297, 'Çikolata'),
          createCardFromImage(805, 'Kraker'), createCardFromImage(486, 'Kek'), createCardFromImage(78, 'Pasta'),
          createCardFromImage(63, 'Dondurma'), createCardFromImage(806, 'Jelibon'), createCardFromImage(807, 'Kuruyemiş'),
          createCardFromImage(623, 'Sandviç'), createCardFromImage(240, 'Lolipop'), createCardFromImage(249, 'Patlamış Mısır'),
          // Ek atıştırmalık önerisi
          createCardFromImage(853, 'Mısır'),
      ]},
      { id: 'icecekler', title: 'İçecekler', imageId: 123, cards: [
          createCardFromImage(123, 'Su'), createCardFromImage(811, 'Meyve Suyu'), createCardFromImage(801, 'Süt'),
          createCardFromImage(791, 'Çay'), createCardFromImage(351, 'Kahve'), createCardFromImage(813, 'Ayran'),
          createCardFromImage(793, 'Gazoz'), createCardFromImage(814, 'Su Şişesi'), createCardFromImage(331, 'Limonata'),
      ]},
       { id: 'saglik', title: 'Sağlık', imageId: 324, cards: [
          createCardFromImage(872, 'Hastayım'), 
          createManualCard('atesim_var', 'Ateşim var', 894),
          createManualCard('basim_agriyor', 'Başım ağrıyor', 895),
          createManualCard('karnim_agriyor', 'Karnım ağrıyor', 897),
          createManualCard('bogazim_agriyor', 'Boğazım ağrıyor', 896),
          createManualCard('kulagim_agriyor', 'Kulağım ağrıyor', 898),
          createManualCard('usuyorum', 'Üşüyorum', 899),
          createManualCard('sicakladim', 'Sıcakladım', 900),
          createCardFromImage(873, 'Acıyor'),
          createCardFromImage(241, 'İlaç'), 
          createCardFromImage(871, 'Yara bandı'), 
          createCardFromImage(324, 'Doktor'), 
          createCardFromImage(386, 'Hemşire'),
      ]},
      { id: 'tuvalet', title: 'Tuvalet', imageId: 422, cards: [
          createCardFromImage(422, 'Tuvalet'), createCardFromImage(815, 'Tuvalet Kağıdı'), createCardFromImage(799, 'Sifon'),
          createCardFromImage(798, 'Lazımlık'), createCardFromImage(423, 'Lavabo'), createCardFromImage(855, 'Islak Mendil'),
      ]},
      { id: 'temizlik', title: 'Temizlik', imageId: 209, cards: [
          createCardFromImage(209, 'Sabun'), createCardFromImage(794, 'Sıvı Sabun'), createCardFromImage(441, 'Diş Fırçası'),
          createCardFromImage(425, 'Diş Macunu'), createCardFromImage(410, 'Havlu'), createCardFromImage(300, 'Duş Başlığı'),
          createCardFromImage(426, 'Şampuan'), createCardFromImage(856, 'Tarak'), createCardFromImage(874, 'Lif'),
          // Yeni temizlik ürünleri
          createCardFromImage(933, 'Kağıt havlu'), createCardFromImage(932, 'Elektrikli süpürge'),
      ]},
      { id: 'uyku', title: 'Uyku', imageId: 531, cards: [
          createCardFromImage(531, 'Yatak'), createCardFromImage(137, 'Yastık'), createCardFromImage(54,  'Pijama'),
          createCardFromImage(816, 'Battaniye'), createCardFromImage(282, 'Gece Lambası'),
      ]},
      // Kıyafetler Temel İhtiyaçlar altına taşındı ve genişletildi
      { id: 'kiyafetler', title: 'Kıyafetler', imageId: 13, cards: [
          createCardFromImage(13, 'Tişört'), createCardFromImage(79, 'Pantolon'), createCardFromImage(59, 'Ayakkabı'),
          createCardFromImage(270, 'Mont'), createCardFromImage(147, 'Çorap'), createCardFromImage(111, 'Şapka'),
          // Yeni eklenen kıyafet ve aksesuarlar
          createCardFromImage(268, 'Elbise'), createCardFromImage(269, 'Etek'), createCardFromImage(307, 'Bot'),
          createCardFromImage(271, 'Atkı'), createCardFromImage(272, 'Eldiven'), createCardFromImage(308, 'Terlik'),
          createCardFromImage(978, 'Kemer'),
      ]},
      // Yeni alt kategori: Mutfak Gereçleri
      { id: 'mutfak_gerecleri_ihtiyac', title: 'Mutfak Gereçleri', imageId: 153, cards: [
          createCardFromImage(153, 'Tabak'), createCardFromImage(124, 'Bardak'), createCardFromImage(126, 'Çatal'),
          createCardFromImage(125, 'Kaşık'), createCardFromImage(262, 'Bıçak'), createCardFromImage(409, 'Peçete'),
          createCardFromImage(671, 'Tencere'), createCardFromImage(264, 'Tava'), createCardFromImage(935, 'Rende'),
      ]},
    ]
  },
  // 2. Eylemler (Yeşil)
  {
    id: 'eylemler',
    title: 'Eylemler',
    icon: MoveIcon,
    color: 'green',
    subCategories: [
      { id: 'gunluk', title: 'Günlük İşler', imageId: 827, cards: [
        createCardFromImage(827, 'Yemek yemek'), createCardFromImage(774, 'Su içmek'), createCardFromImage(901, 'Uyumak'), 
        createCardFromImage(765, 'Giyinmek'), createCardFromImage(875, 'Banyo yapmak'), createCardFromImage(819, 'Diş fırçalamak'),
        createCardFromImage(820, 'El yıkamak'), createCardFromImage(422, 'Tuvalete gitmek'), createCardFromImage(835, 'Saç taramak'),
        createCardFromImage(230, 'Odayı toplamak'), createCardFromImage(882, 'Ödev yapmak'),
      ]},
      { id: 'hareket', title: 'Hareket ve Spor', imageId: 709, cards: [
        createCardFromImage(709, 'Koşmak'), createCardFromImage(770, 'Yürümek'), createCardFromImage(391, 'Zıplamak'),
        createCardFromImage(771, 'Tırmanmak'), createCardFromImage(796, 'Yüzmek'), createCardFromImage(825, 'Bisiklet sürmek'),
        createCardFromImage(826, 'Top oynamak'), createCardFromImage(392, 'Salıncakta sallanmak'), createCardFromImage(185, 'Kaydıraktan kaymak'),
      ]},
      { id: 'sosyal', title: 'Sosyal Etkileşimler', imageId: 800, cards: [
        createCardFromImage(823, 'Konuşmak'), createCardFromImage(824, 'Dinlemek'), createCardFromImage(766, 'Selam vermek'), 
        createCardFromImage(864, 'Hoşça kal'), createCardFromImage(768, 'Teşekkür etmek'), createCardFromImage(772, 'Özür dilemek'),
        createCardFromImage(800, 'Sarılmak'), createCardFromImage(821, 'El sıkışmak'), createCardFromImage(822, 'Yardım etmek'),
        createCardFromImage(767, 'Paylaşmak'), createCardFromImage(773, 'Sırada beklemek'),
        createManualCard('oyuna_katilabilir_miyim', 'Oyununa katılabilir miyim?', 9076), createCardFromImage(863, 'Seni seviyorum'),
      ]},
      { id: 'sanatsal', title: 'Sanatsal ve Yaratıcı', imageId: 795, cards: [
        createCardFromImage(795, 'Resim yapmak'), createCardFromImage(876, 'Şarkı söylemek'), createCardFromImage(817, 'Müzik dinlemek'),
        createCardFromImage(818, 'Dans etmek'), createCardFromImage(775, 'Kitap okumak'), createCardFromImage(9071, 'Boyama yapmak'),
        createCardFromImage(9069, 'Lego oynamak'), createCardFromImage(161, 'Film izlemek'),
        // Yeni hobi / oyun kartları
        createCardFromImage(940, 'Kukla'), createCardFromImage(937, 'Tenis Raketi'),
      ]},
      { id: 'istekler', title: 'İstekler', imageId: 776, cards: [
        createCardFromImage(902, 'Oyun oynamak istiyorum'),
        createCardFromImage(903, 'Dışarı çıkmak istiyorum'),
        createCardFromImage(904, 'Mola vermek istiyorum'),
        createCardFromImage(905, 'Parka gitmek istiyorum'),
        createCardFromImage(906, 'Gezmeye gitmek istiyorum'),
        createManualCard('yardim_istiyorum', 'Yardım istiyorum', 9073),
      ]}
      ,
      // Yeni alt kategori: Okul Eylemleri
      { id: 'okul_eylemleri', title: 'Okul Eylemleri', imageId: 831, cards: [
        createCardFromImage(773, 'Sıraya girmek'),
        createCardFromImage(831, 'Parmak kaldırmak'),
        createCardFromImage(9074, 'Ders dinlemek'),
      ]}
    ]
  },
  // 3. Duygular (Sarı)
  {
    id: 'duygular',
    title: 'Duygular',
    icon: FeelingsIcon,
    color: 'yellow',
    subCategories: [
      { id: 'pozitif', title: 'Pozitif', imageId: 500, cards: [
        createCardFromImage(500, 'Mutlu'), createCardFromImage(779, 'Neşeli'), createCardFromImage(776, 'Heyecanlı'),
        createManualCard('sakin', 'Sakin', 777), createCardFromImage(9072, 'Rahat'), createCardFromImage(778, 'Gururlu'),
        createManualCard('sevgi_dolu', 'Sevgi dolu', 800), createCardFromImage(503, 'Şaşırmış'), createManualCard('merakli', 'Meraklı', 503),
      ]},
      { id: 'negatif', title: 'Negatif', imageId: 501, cards: [
        createCardFromImage(501, 'Üzgün'), createCardFromImage(780, 'Kızgın'), createCardFromImage(127, 'Korkmuş'),
        createCardFromImage(782, 'Utanmış'), createCardFromImage(781, 'Ağlayan'), createManualCard('endiseli', 'Endişeli', 127),
        createManualCard('kiskanc', 'Kıskanç', 780), createManualCard('hayal_kirikligi', 'Hayal kırıklığına uğramış', 501), createManualCard('yalniz', 'Yalnız', 501),
      ]},
      { id: 'fiziksel', title: 'Fiziksel Haller', imageId: 783, cards: [
        createCardFromImage(783, 'Yorgun'), createCardFromImage(784, 'Hasta'), createCardFromImage(785, 'Uykulu'),
        createCardFromImage(786, 'Sıkılmış'), createCardFromImage(752, 'Aç'), createCardFromImage(774, 'Susamış'),
        createManualCard('aci_ceken', 'Acı çeken', 784),
      ]}
    ]
  },
  // 4. Kişiler (Turuncu)
  {
    id: 'kisiler',
    title: 'Kişiler',
    icon: PeopleIcon,
    color: 'orange',
    subCategories: [
      { id: 'aile', title: 'Aile Üyeleri', imageId: 711, cards: [
        createCardFromImage(711, 'Anne'), createCardFromImage(828, 'Baba'), createCardFromImage(829, 'Kız kardeş'), 
        createCardFromImage(830, 'Erkek kardeş'), createCardFromImage(579, 'Bebek'), createCardFromImage(701, 'Büyükanne'),
        createCardFromImage(578, 'Büyükbaba'),
      ]},
      { id: 'okul_kisi', title: 'Okul Ortamı', imageId: 84, cards: [
        createCardFromImage(84, 'Öğretmen'), createCardFromImage(831, 'Öğrenci'), createCardFromImage(838, 'Arkadaş'), 
        createCardFromImage(832, 'Müdür'), createCardFromImage(836, 'Okul hizmetlisi'), createManualCard('servis_soforu', 'Servis şoförü', 105),
      ]},
        { id: 'meslekler', title: 'Meslekler', imageId: 324, cards: [
        createCardFromImage(324, 'Doktor'), createCardFromImage(386, 'Hemşire'), createCardFromImage(839, 'Polis'), 
  createCardFromImage(840, 'İtfaiyeci'), createCardFromImage(387, 'Pilot'),
        createCardFromImage(380, 'Astronot'), createCardFromImage(679, 'İnşaat işçisi'), createCardFromImage(834, 'Postacı'),
          createCardFromImage(837, 'Çiftçi'), createCardFromImage(835, 'Berber'),
        createManualCard('veteriner', 'Veteriner', 324),
        createCardFromImage(877, 'Kasiyer'), createCardFromImage(878, 'Garson'),
      ]}
        ,
        // Yeni alt kategori: Acil Durum
        { id: 'acil_durum', title: 'Acil Durum', imageId: 839, cards: [
          createCardFromImage(839, 'Polis'), createCardFromImage(840, 'İtfaiyeci'), createCardFromImage(324, 'Doktor'), createCardFromImage(386, 'Hemşire')
        ]}
    ]
  },
  // 5. Yerler (Kırmızı)
  {
    id: 'yerler',
    title: 'Yerler',
    icon: LocationIcon,
    color: 'red',
    subCategories: [
      { id: 'ev_yer', title: 'Ev', imageId: 174, cards: [
        createCardFromImage(174, 'Ev'), createCardFromImage(230, 'Oda'), createCardFromImage(867, 'Oturma Odası'),
        createCardFromImage(251, 'Mutfak'), createCardFromImage(424, 'Banyo'), createCardFromImage(10, 'Bahçe'), createCardFromImage(868, 'Balkon'),
      ]},
      { id: 'okul_yer', title: 'Okul', imageId: 497, cards: [
        createCardFromImage(497, 'Okul'), createCardFromImage(883, 'Sınıf'), createCardFromImage(614, 'Kütüphane'),
        createManualCard('kantin', 'Kantin', 851), createManualCard('okul_bahcesi', 'Okul Bahçesi', 850), createManualCard('spor_salonu', 'Spor Salonu', 9075),
      ]},
      { id: 'dis_mekan', title: 'Dış Mekan', imageId: 505, cards: [
        createCardFromImage(505, 'Park'), createCardFromImage(879, 'Market'), createCardFromImage(852, 'Hastane'),
        createManualCard('cami', 'Cami', 841), createCardFromImage(197, 'Otobüs Durağı'), createCardFromImage(857, 'AVM'),
        createCardFromImage(880, 'Restoran'), createCardFromImage(881, 'Sinema Salonu'), createCardFromImage(858, 'Plaj'),
      ]}
    ]
  },
  // 6. Eşyalar (Mor)
  {
    id: 'esyalar',
    title: 'Eşyalar',
    icon: ObjectsIcon,
    color: 'purple',
    subCategories: [
      { id: 'ev_esya', title: 'Ev Eşyaları', imageId: 134, cards: [
        createCardFromImage(134, 'Masa'), createCardFromImage(319, 'Sandalye'), createCardFromImage(549, 'Koltuk'),
        createCardFromImage(531, 'Yatak'), createCardFromImage(339, 'Dolap'), createCardFromImage(282, 'Lamba'),
        createCardFromImage(439, 'Halı'), createCardFromImage(161, 'Televizyon'), createCardFromImage(251, 'Buzdolabı'),
        createCardFromImage(169, 'Çamaşır makinesi'), createCardFromImage(465, 'Telefon'), createCardFromImage(884, 'Bilgisayar'),
        createCardFromImage(142, 'Anahtar'),
        // Yeni eklenen ev eşyaları
        createCardFromImage(946, 'Kumanda'), createCardFromImage(945, 'Tablet'), createCardFromImage(340, 'Priz'),
      ]},
      { id: 'okul_esya', title: 'Okul Eşyaları', imageId: 36, cards: [
        createCardFromImage(207, 'Çanta'), createCardFromImage(36, 'Kitap'), createCardFromImage(882, 'Defter'),
        createCardFromImage(121, 'Kalem'), createCardFromImage(535, 'Silgi'), createCardFromImage(149, 'Cetvel'),
        createCardFromImage(715, 'Boya kalemleri'), createCardFromImage(144, 'Makas'), createManualCard('yapistirici', 'Yapıştırıcı', 849),
        createCardFromImage(883, 'Tahta'), createCardFromImage(870, 'Kalemtıraş'),
      ]},
      { id: 'oyun_esya', title: 'Oyun ve Hobi', imageId: 177, cards: [
        createCardFromImage(156, 'Top'), createCardFromImage(4, 'Oyuncak araba'), createCardFromImage(480, 'Yapboz'), 
        createManualCard('bloklar', 'Bloklar', 9070), createCardFromImage(276, 'Peluş oyuncak'), createCardFromImage(135, 'Uçurtma'),
        createCardFromImage(221, 'Paten'), createCardFromImage(383, 'Kaykay'), createCardFromImage(109, 'Bebek'),
        createManualCard('oyun_hamuru', 'Oyun hamuru', 9046), createCardFromImage(940, 'Kukla'), createCardFromImage(937, 'Tenis Raketi'),
      ]}
    ]
  },
  // 7. Hayvanlar (Kahverengi)
  {
    id: 'hayvanlar',
    title: 'Hayvanlar',
    icon: PawIcon,
    color: 'amber',
    subCategories: [
        { id: 'evcil', title: 'Evcil Hayvanlar', imageId: 702, cards: [
            createCardFromImage(702, 'Kedi'), createCardFromImage(582, 'Köpek'), createCardFromImage(73,  'Kuş'),
            createCardFromImage(740, 'Balık'), createCardFromImage(861, 'Hamster'), createCardFromImage(41, 'Tavşan'),
        ]},
        { id: 'ciftlik', title: 'Çiftlik Hayvanları', imageId: 291, cards: [
      createCardFromImage(291, 'İnek'), createCardFromImage(377, 'Horoz'),
            createCardFromImage(290, 'At'), createCardFromImage(460, 'Koyun'), createCardFromImage(461, 'Keçi'),
            createCardFromImage(26, 'Ördek'), createCardFromImage(865, 'Eşek'),
        ]},
        { id: 'vahsi', title: 'Vahşi Hayvanlar', imageId: 100, cards: [
      createCardFromImage(100, 'Aslan'), createCardFromImage(28,  'Fil'), createCardFromImage(101, 'Zürafa'),
      createCardFromImage(277, 'Maymun'), createCardFromImage(415, 'Tilki'), createCardFromImage(320, 'Panda'),
      createCardFromImage(323, 'Yılan'), createCardFromImage(862, 'Kaplan'), createCardFromImage(916, 'Ayı'),
      createCardFromImage(866, 'Zebra'),
      // Yeni vahşi hayvanlar
      createCardFromImage(908, 'Gergedan'), createCardFromImage(909, 'Deve'), createCardFromImage(922, 'Kurt'), createCardFromImage(926, 'Timsah'), createCardFromImage(947, 'Kanguru'), createCardFromImage(948, 'Köpek Balığı'),
        ]}
    ]
  },
  // 8. Taşıtlar (Beyaz)
  {
    id: 'tasitlar',
    title: 'Taşıtlar',
    icon: CarIcon,
    color: 'slate',
    subCategories: [
        { id: 'kara', title: 'Kara Taşıtları', imageId: 1, cards: [
            createCardFromImage(1, 'Araba'), createCardFromImage(105, 'Otobüs'), createCardFromImage(106, 'Tren'),
            createCardFromImage(110, 'Bisiklet'), createCardFromImage(259, 'Motosiklet'), createCardFromImage(288, 'Kamyon'),
            createCardFromImage(257, 'Ambulans'), createCardFromImage(258, 'Polis Arabası'), createCardFromImage(256, 'İtfaiye Aracı'),
        ]},
        { id: 'hava', title: 'Hava Taşıtları', imageId: 107, cards: [
            createCardFromImage(107, 'Uçak'), createCardFromImage(162, 'Helikopter'), createCardFromImage(538, 'Sıcak Hava Balonu'),
            createCardFromImage(204, 'Roket'),
        ]},
        { id: 'deniz', title: 'Deniz Taşıtları', imageId: 492, cards: [
            createCardFromImage(492, 'Gemi'), createCardFromImage(493, 'Sandal'), createCardFromImage(375, 'Yelkenli'),
            createCardFromImage(337, 'Denizaltı'),
        ]}
    ]
  }
];