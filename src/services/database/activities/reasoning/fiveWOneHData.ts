import { ActivityType, ConceptRound, ImageMetadata } from '../../../../types';

// 5N1K: Kim? Ne? Nerede? Ne zaman? Neden? Nasıl?
// Not: Image ID'ler mevcut public/images kümesine göre hazırlanmıştır.
// Gerekirse rahatça çoğaltılabilir.

const meta = (id: number, word: string): ImageMetadata => ({
  id,
  word,
  imageUrl: `/images/${id}.png`,
  audioKeys: { default: word },
  tags: { category: '' }
});

export const fiveWOneHData: ConceptRound[] = [
  // 1) KİM?
  {
    id: 301,
    activityType: ActivityType.FiveWOneH,
    question: 'Hastalanınca kime gideriz?',
    questionAudioKey: 'q_who_to_when_sick',
    speech: {
      tr: { correct: 'Evet! Hastalanınca doktora gideriz.', wrong: 'Hayır, hastalanınca ona gitmeyiz.' },
      en: { correct: 'Yes! We go to the doctor when we are sick.', wrong: "No, that's not where we go when we are sick." }
    },
    questionItem: meta(784, 'hasta çocuk'),
    options: [
      { id: 324, word: 'doktor', spokenText: 'doktor', imageUrl: '/images/324.png', isCorrect: true, audioKey: 'doktor' },
      { id: 835, word: 'berber', spokenText: 'berber', imageUrl: '/images/835.png', isCorrect: false, audioKey: 'berber' },
      { id: 326, word: 'aşçı', spokenText: 'aşçı', imageUrl: '/images/326.png', isCorrect: false, audioKey: 'asci' },
    ],
  },
  {
    id: 302,
    activityType: ActivityType.FiveWOneH,
    question: 'Yangın çıkınca kimi ararız?',
    questionAudioKey: 'q_who_to_when_fire',
    speech: {
      tr: { correct: 'Doğru! Yangın çıkınca itfaiyeyi ararız.', wrong: 'Hayır, yangında itfaiyeyi aramalıyız.' },
      en: { correct: 'Correct! We call the firefighters in a fire.', wrong: 'No, in a fire we should call the firefighters.' }
    },
    questionItem: meta(707, 'ateş'),
    options: [
      { id: 327, word: 'itfaiyeci', spokenText: 'itfaiyeci', imageUrl: '/images/327.png', isCorrect: true, audioKey: 'itfaiyeci' },
      { id: 839, word: 'polis', spokenText: 'polis', imageUrl: '/images/839.png', isCorrect: false, audioKey: 'polis' },
      { id: 84, word: 'öğretmen', spokenText: 'öğretmen', imageUrl: '/images/84.png', isCorrect: false, audioKey: 'ogretmen' },
    ],
  },
  {
    id: 303,
    activityType: ActivityType.FiveWOneH,
    question: 'Okulda bize kim ders anlatır?',
    questionAudioKey: 'q_who_teaches_at_school',
    speech: {
      tr: { correct: 'Doğru! Öğretmen ders anlatır.', wrong: 'Hayır, okulda dersi öğretmen anlatır.' },
      en: { correct: 'Correct! The teacher teaches.', wrong: 'No, at school the teacher teaches.' }
    },
    questionItem: meta(497, 'okul'),
    options: [
      { id: 84, word: 'öğretmen', spokenText: 'öğretmen', imageUrl: '/images/84.png', isCorrect: true, audioKey: 'ogretmen' },
      { id: 386, word: 'hemşire', spokenText: 'hemşire', imageUrl: '/images/386.png', isCorrect: false, audioKey: 'hemsire' },
      { id: 878, word: 'garson', spokenText: 'garson', imageUrl: '/images/878.png', isCorrect: false, audioKey: 'garson' },
    ],
  },
  {
    id: 304,
    activityType: ActivityType.FiveWOneH,
    question: 'Mektupları kim getirir?',
    questionAudioKey: 'q_who_brings_letter',
    speech: {
      tr: { correct: 'Doğru! Mektubu postacı getirir.', wrong: 'Hayır, mektubu postacı getirir.' },
      en: { correct: 'Correct! The postman brings the letter.', wrong: 'No, the postman brings the letter.' }
    },
    questionItem: meta(600, 'zarf'),
    options: [
      { id: 834, word: 'postacı', spokenText: 'postacı', imageUrl: '/images/834.png', isCorrect: true, audioKey: 'postaci' },
      { id: 387, word: 'pilot', spokenText: 'pilot', imageUrl: '/images/387.png', isCorrect: false, audioKey: 'pilot' },
      { id: 837, word: 'çiftçi', spokenText: 'çiftçi', imageUrl: '/images/837.png', isCorrect: false, audioKey: 'ciftci' },
    ],
  },
  {
    id: 305,
    activityType: ActivityType.FiveWOneH,
    question: 'Uçağı kim kullanır?',
    questionAudioKey: 'q_who_flies_plane',
    speech: {
      tr: { correct: 'Evet! Uçağı pilot kullanır.', wrong: 'Hayır, uçağı o kullanmaz.' },
      en: { correct: 'Yes! A pilot flies the plane.', wrong: "No, they don’t fly the plane." }
    },
    questionItem: meta(107, 'uçak'),
    options: [
      { id: 387, word: 'pilot', spokenText: 'pilot', imageUrl: '/images/387.png', isCorrect: true, audioKey: 'pilot' },
      { id: 325, word: 'polis', spokenText: 'polis', imageUrl: '/images/325.png', isCorrect: false, audioKey: 'polis' },
      { id: 326, word: 'aşçı', spokenText: 'aşçı', imageUrl: '/images/326.png', isCorrect: false, audioKey: 'asci' },
    ],
  },
  {
    id: 306,
    activityType: ActivityType.FiveWOneH,
    question: 'Saçımızı kesmesi için kime gideriz?',
    questionAudioKey: 'q_who_cuts_hair',
    speech: {
      tr: { correct: 'Doğru! Saçımızı berber keser.', wrong: 'Hayır, saçımızı o kesmez.' },
      en: { correct: 'Correct! A barber cuts our hair.', wrong: "No, they don’t cut our hair." }
    },
    questionItem: meta(144, 'makas'),
    options: [
      { id: 835, word: 'berber', spokenText: 'berber', imageUrl: '/images/835.png', isCorrect: true, audioKey: 'berber' },
      { id: 324, word: 'doktor', spokenText: 'doktor', imageUrl: '/images/324.png', isCorrect: false, audioKey: 'doktor' },
      { id: 877, word: 'kasiyer', spokenText: 'kasiyer', imageUrl: '/images/877.png', isCorrect: false, audioKey: 'kasiyer' },
    ],
  },
  {
    id: 307,
    activityType: ActivityType.FiveWOneH,
    question: 'Yemeği kim pişirir?',
    questionAudioKey: 'q_who_cooks_food',
    speech: {
      tr: { correct: 'Evet! Yemeği aşçı pişirir.', wrong: 'Hayır, yemeği aşçı pişirir.' },
      en: { correct: 'Yes! A cook prepares the food.', wrong: 'No, that is not correct.' }
    },
    questionItem: meta(939, 'ocak'),
    options: [
      { id: 326, word: 'aşçı', spokenText: 'aşçı', imageUrl: '/images/326.png', isCorrect: true, audioKey: 'asci' },
      { id: 84, word: 'öğretmen', spokenText: 'öğretmen', imageUrl: '/images/84.png', isCorrect: false, audioKey: 'ogretmen' },
      { id: 327, word: 'itfaiyeci', spokenText: 'itfaiyeci', imageUrl: '/images/327.png', isCorrect: false, audioKey: 'itfaiyeci' },
    ],
  },
  {
    id: 308,
    activityType: ActivityType.FiveWOneH,
    question: 'Sütü bize kim sağlar?',
    questionAudioKey: 'q_who_provides_milk',
    speech: {
      tr: { correct: 'Evet! Sütü inek sağlar.', wrong: 'Hayır, sütü genelde inek sağlar.' },
      en: { correct: 'Yes! A cow provides milk.', wrong: 'No, it is usually provided by a cow.' }
    },
    questionItem: meta(265, 'süt'),
    options: [
      { id: 291, word: 'inek', spokenText: 'inek', imageUrl: '/images/291.png', isCorrect: true, audioKey: 'inek' },
      { id: 321, word: 'tavuk', spokenText: 'tavuk', imageUrl: '/images/321.png', isCorrect: false, audioKey: 'tavuk' },
      { id: 460, word: 'koyun', spokenText: 'koyun', imageUrl: '/images/460.png', isCorrect: false, audioKey: 'koyun' },
    ],
  },
  {
    id: 309,
    activityType: ActivityType.FiveWOneH,
    question: 'Balı kim yapar?',
    questionAudioKey: 'q_who_makes_honey',
    speech: {
      tr: { correct: 'Evet! Balı arı yapar.', wrong: 'Hayır, balı arı yapar.' },
      en: { correct: 'Yes! A bee makes honey.', wrong: 'No, a bee makes honey.' }
    },
    questionItem: meta(228, 'bal'),
    options: [
      { id: 273, word: 'arı', spokenText: 'arı', imageUrl: '/images/273.png', isCorrect: true, audioKey: 'ari' },
      { id: 274, word: 'kelebek', spokenText: 'kelebek', imageUrl: '/images/274.png', isCorrect: false, audioKey: 'kelebek' },
      { id: 917, word: 'örümcek', spokenText: 'örümcek', imageUrl: '/images/917.png', isCorrect: false, audioKey: 'orumcek' },
    ],
  },
  {
    id: 310,
    activityType: ActivityType.FiveWOneH,
    question: 'Geceleri bize masal anlatıp bizi kim uyutur?',
    questionAudioKey: 'q_who_reads_bedtime_stories',
    speech: {
      tr: { correct: 'Evet! Annemiz bize masal anlatır.', wrong: 'Hayır, o değil.' },
      en: { correct: 'Yes! Our mother reads us stories.', wrong: 'No, not them.' }
    },
    questionItem: meta(606, 'yatak'),
    options: [
      { id: 711, word: 'anne', spokenText: 'anne', imageUrl: '/images/711.png', isCorrect: true, audioKey: 'anne' },
      { id: 839, word: 'polis', spokenText: 'polis', imageUrl: '/images/839.png', isCorrect: false, audioKey: 'polis' },
      { id: 878, word: 'garson', spokenText: 'garson', imageUrl: '/images/878.png', isCorrect: false, audioKey: 'garson' },
    ],
  },
  {
    id: 311,
    activityType: ActivityType.FiveWOneH,
    question: 'Birlikte oyun oynadığımız kişi kimdir?',
    questionAudioKey: 'q_who_do_we_play_with',
    speech: {
      tr: { correct: 'Evet! Arkadaşımızla oyun oynarız.', wrong: 'Hayır, o değil.' },
      en: { correct: 'Yes! We play with our friend.', wrong: 'No, not them.' }
    },
    questionItem: meta(767, 'paylaşan çocuklar'),
    options: [
      { id: 838, word: 'arkadaş', spokenText: 'arkadaş', imageUrl: '/images/838.png', isCorrect: true, audioKey: 'arkadas' },
      { id: 828, word: 'baba', spokenText: 'baba', imageUrl: '/images/828.png', isCorrect: false, audioKey: 'baba' },
      { id: 701, word: 'nine', spokenText: 'nine', imageUrl: '/images/701.png', isCorrect: false, audioKey: 'nine' },
    ],
  },
  {
    id: 312,
    activityType: ActivityType.FiveWOneH,
    question: 'Oyuncağı kırıldığı için kim üzgün olabilir?',
    questionAudioKey: 'q_who_is_sad_about_broken_toy',
    speech: {
      tr: { correct: 'Evet! Oyuncağı kırılan çocuk üzgün olur.', wrong: 'Hayır, o değil.' },
      en: { correct: 'Yes! The child with the broken toy is sad.', wrong: 'No, not them.' }
    },
    questionItem: meta(108, 'kırık araba'),
    options: [
      { id: 781, word: 'ağlayan çocuk', spokenText: 'ağlayan çocuk', imageUrl: '/images/781.png', isCorrect: true, audioKey: 'aglayan_cocuk' },
      { id: 779, word: 'neşeli çocuk', spokenText: 'neşeli çocuk', imageUrl: '/images/779.png', isCorrect: false, audioKey: 'neseli_cocuk' },
      { id: 785, word: 'uykulu çocuk', spokenText: 'uykulu çocuk', imageUrl: '/images/785.png', isCorrect: false, audioKey: 'uykulu_cocuk' },
    ],
  },
  {
    id: 313,
    activityType: ActivityType.FiveWOneH,
    question: 'Yemeğini görünce kim sevinir?',
    questionAudioKey: 'q_who_is_happy_to_see_food',
    speech: {
      tr: { correct: 'Evet! Acıkan bebek yemeğini görünce sevinir.', wrong: 'Hayır, o değil.' },
      en: { correct: 'Yes! The hungry baby is happy to see food.', wrong: 'No, not them.' }
    },
    questionItem: meta(267, 'makarna'),
    options: [
      { id: 752, word: 'aç bebek', spokenText: 'aç bebek', imageUrl: '/images/752.png', isCorrect: true, audioKey: 'ac_bebek' },
      { id: 751, word: 'tok bebek', spokenText: 'tok bebek', imageUrl: '/images/751.png', isCorrect: false, audioKey: 'tok_bebek' },
      { id: 901, word: 'uyuyan çocuk', spokenText: 'uyuyan çocuk', imageUrl: '/images/901.png', isCorrect: false, audioKey: 'uyuyan_cocuk' },
    ],
  },
  {
    id: 314,
    activityType: ActivityType.FiveWOneH,
    question: 'Topla oynayan kimdir?',
    questionAudioKey: 'q_who_is_playing_with_ball',
    speech: {
      tr: { correct: 'Evet! Bu çocuk topla oynuyor.', wrong: 'Hayır, o değil.' },
      en: { correct: 'Yes! This child is playing with a ball.', wrong: 'No, not them.' }
    },
    questionItem: meta(826, 'top oynayan çocuk'),
    options: [
      { id: 826, word: 'top oynayan çocuk', spokenText: 'top oynayan çocuk', imageUrl: '/images/826.png', isCorrect: true, audioKey: 'top_oynayan_cocuk' },
      { id: 775, word: 'kitap okuyan çocuk', spokenText: 'kitap okuyan çocuk', imageUrl: '/images/775.png', isCorrect: false, audioKey: 'kitap_okuyan_cocuk' },
      { id: 795, word: 'resim yapan çocuk', spokenText: 'resim yapan çocuk', imageUrl: '/images/795.png', isCorrect: false, audioKey: 'resim_yapan_cocuk' },
    ],
  },
  {
    id: 315,
    activityType: ActivityType.FiveWOneH,
    question: 'Arabayı süren kimdir?',
    questionAudioKey: 'q_who_is_driving_car',
    speech: {
      tr: { correct: 'Evet! Baba arabayı sürüyor.', wrong: 'Hayır, o değil.' },
      en: { correct: 'Yes! His father is driving the car.', wrong: 'No, not them.' }
    },
    questionItem: meta(1, 'araba'),
    options: [
      { id: 828, word: 'baba', spokenText: 'baba', imageUrl: '/images/828.png', isCorrect: true, audioKey: 'baba' },
      { id: 784, word: 'hasta çocuk', spokenText: 'hasta çocuk', imageUrl: '/images/784.png', isCorrect: false, audioKey: 'hasta_cocuk' },
      { id: 831, word: 'öğrenci', spokenText: 'öğrenci', imageUrl: '/images/831.png', isCorrect: false, audioKey: 'ogrenci' },
    ],
  },
  {
    id: 316,
    activityType: ActivityType.FiveWOneH,
    question: 'Tarlayı sürüp sebze ve meyveleri kim yetiştirir?',
    questionAudioKey: 'q_who_plows_field_and_grows_vegetables',
    speech: {
      tr: { correct: 'Evet! Çiftçi tarlayı sürer ve sebze, meyve yetiştirir.', wrong: 'Hayır, o değil.' },
      en: { correct: 'Yes! The farmer plows the field and grows vegetables and fruits.', wrong: 'No, not them.' }
    },
    questionItem: meta(289, 'traktör'),
    options: [
      { id: 837, word: 'çiftçi', spokenText: 'çiftçi', imageUrl: '/images/837.png', isCorrect: true, audioKey: 'ciftci' },
      { id: 878, word: 'garson', spokenText: 'garson', imageUrl: '/images/878.png', isCorrect: false, audioKey: 'garson' },
      { id: 324, word: 'doktor', spokenText: 'doktor', imageUrl: '/images/324.png', isCorrect: false, audioKey: 'doktor' },
    ],
  },
  {
    id: 317,
    activityType: ActivityType.FiveWOneH,
    question: 'Rokete binip uzaya kim gider?',
    questionAudioKey: 'q_who_goes_to_space_in_rocket',
    speech: {
      tr: { correct: 'Evet! Astronot uzaya gider.', wrong: 'Hayır, o değil.' },
      en: { correct: 'Yes! The astronaut goes to space.', wrong: 'No, not them.' }
    },
    questionItem: meta(381, 'uzay mekiği'),
    options: [
      { id: 380, word: 'astronot', spokenText: 'astronot', imageUrl: '/images/380.png', isCorrect: true, audioKey: 'astronot' },
      { id: 387, word: 'pilot', spokenText: 'pilot', imageUrl: '/images/387.png', isCorrect: false, audioKey: 'pilot' },
      { id: 839, word: 'polis', spokenText: 'polis', imageUrl: '/images/839.png', isCorrect: false, audioKey: 'polis' },
    ],
  },
  {
    id: 318,
    activityType: ActivityType.FiveWOneH,
    question: 'Masallarda tacı olan ve sarayda yaşayan kimdir?',
    questionAudioKey: 'q_who_wears_crown_and_lives_in_palace',
    speech: {
      tr: { correct: 'Evet! Kral sarayda yaşar ve taç takar.', wrong: 'Hayır, o değil.' },
      en: { correct: 'Yes! The king lives in the palace and wears a crown.', wrong: 'No, not them.' }
    },
    questionItem: meta(212, 'kale'),
    options: [
      { id: 314, word: 'kral', spokenText: 'kral', imageUrl: '/images/314.png', isCorrect: true, audioKey: 'kral' },
      { id: 716, word: 'asker', spokenText: 'asker', imageUrl: '/images/716.png', isCorrect: false, audioKey: 'asker' },
      { id: 84, word: 'öğretmen', spokenText: 'öğretmen', imageUrl: '/images/84.png', isCorrect: false, audioKey: 'ogretmen' },
    ],
  },
  {
    id: 319,
    activityType: ActivityType.FiveWOneH,
    question: 'Yaralanan veya hasta olan birine ilk yardımı kim yapar?',
    questionAudioKey: 'q_who_gives_first_aid',
    speech: {
      tr: { correct: 'Evet! Hemşire ilk yardım yapar.', wrong: 'Hayır, o değil.' },
      en: { correct: 'Yes! The nurse gives first aid.', wrong: 'No, not them.' }
    },
    questionItem: meta(257, 'ambulans'),
    options: [
      { id: 386, word: 'hemşire', spokenText: 'hemşire', imageUrl: '/images/386.png', isCorrect: true, audioKey: 'hemsire' },
      { id: 869, word: 'manav', spokenText: 'manav', imageUrl: '/images/869.png', isCorrect: false, audioKey: 'manav' },
      { id: 834, word: 'postacı', spokenText: 'postacı', imageUrl: '/images/834.png', isCorrect: false, audioKey: 'postaci' },
    ],
  },
  {
    id: 320,
    activityType: ActivityType.FiveWOneH,
    question: 'Okulda ders çalışıp yeni şeyler öğrenen kimdir?',
    questionAudioKey: 'q_who_studies_and_learns_at_school',
    speech: {
      tr: { correct: 'Evet! Öğrenci okulda ders çalışır.', wrong: 'Hayır, o değil.' },
      en: { correct: 'Yes! The student studies at school.', wrong: 'No, not them.' }
    },
    questionItem: meta(36, 'kitaplar'),
        options: [
          { id: 831, word: 'öğrenci', spokenText: 'öğrenci', imageUrl: '/images/831.png', isCorrect: true, audioKey: 'ogrenci' },
          { id: 832, word: 'müdür', spokenText: 'müdür', imageUrl: '/images/832.png', isCorrect: false, audioKey: 'mudur' },
          { id: 833, word: 'temizlik görevlisi', spokenText: 'temizlik görevlisi', imageUrl: '/images/833.png', isCorrect: false, audioKey: 'temizlik_gorevlisi' },
        ],
      },
      // 2) NE?
      {
        id: 321,
        activityType: ActivityType.FiveWOneH,
        question: 'Dişlerimizi fırçalarken fırçanın üzerine ne süreriz?',
        questionAudioKey: 'q_what_brush_teeth_with',
        speech: {
          tr: { correct: 'Evet! Diş fırçasının üzerine diş macunu süreriz.', wrong: 'Hayır, fırçanın üzerine o sürülmez.' },
          en: { correct: 'Yes! We put toothpaste on the toothbrush when we brush our teeth.', wrong: "No, we don't put that on the toothbrush." }
        },
        questionItem: meta(441, 'diş fırçası'),
        options: [
          { id: 425, word: 'diş macunu', spokenText: 'diş macunu', imageUrl: '/images/425.png', isCorrect: true, audioKey: 'dis_macunu' },
          { id: 209, word: 'sabun', spokenText: 'sabun', imageUrl: '/images/209.png', isCorrect: false, audioKey: 'sabun' },
          { id: 426, word: 'şampuan', spokenText: 'şampuan', imageUrl: '/images/426.png', isCorrect: false, audioKey: 'sampuan' },
        ],
      },
      {
        id: 322,
        activityType: ActivityType.FiveWOneH,
        question: 'Çorbayı içmek için ne kullanırız?',
        questionAudioKey: 'q_what_use_for_soup',
        speech: {
          tr: { correct: 'Doğru! Çorba içmek için kaşık kullanırız.', wrong: 'Hayır, çorba için o kullanılmaz.' },
          en: { correct: 'Correct! We use a spoon to drink soup.', wrong: 'No, that is not correct.' }
        },
        questionItem: meta(266, 'çorba'),
        options: [
          { id: 125, word: 'kaşık', spokenText: 'kaşık', imageUrl: '/images/125.png', isCorrect: true, audioKey: 'kasik' },
          { id: 126, word: 'çatal', spokenText: 'çatal', imageUrl: '/images/126.png', isCorrect: false, audioKey: 'catal' },
          { id: 262, word: 'bıçak', spokenText: 'bıçak', imageUrl: '/images/262.png', isCorrect: false, audioKey: 'bicak' },
        ],
      },
      {
        id: 323,
        activityType: ActivityType.FiveWOneH,
        question: 'Yanlış yazdığımızda neyle sileriz?',
        questionAudioKey: 'q_what_erase_with',
        speech: {
          tr: { correct: 'Evet! Yanlış yazdığımızda silgiyle sileriz.', wrong: 'Hayır, onunla silmeyiz.' },
          en: { correct: 'Yes! We erase with an eraser when we write wrong.', wrong: "No, we don't erase with that." }
        },
        questionItem: meta(121, 'yazı yazan kalem'),
        options: [
          { id: 535, word: 'silgi', spokenText: 'silgi', imageUrl: '/images/535.png', isCorrect: true, audioKey: 'silgi' },
          { id: 149, word: 'cetvel', spokenText: 'cetvel', imageUrl: '/images/149.png', isCorrect: false, audioKey: 'cetvel' },
          { id: 870, word: 'kalemtıraş', spokenText: 'kalemtıraş', imageUrl: '/images/870.png', isCorrect: false, audioKey: 'kalemtras' },
        ],
      },
      {
        id: 324,
        activityType: ActivityType.FiveWOneH,
        question: 'Banyo yaptıktan sonra neyle kurulanırız?',
        questionAudioKey: 'q_what_dry_after_bath',
        speech: {
          tr: { correct: 'Doğru! Banyodan sonra havluyla kurulanırız.', wrong: 'Hayır, onunla kurulanmayız.' },
          en: { correct: 'Correct! We dry ourselves with a towel after a bath.', wrong: "No, we don’t dry with that." }
        },
        questionItem: meta(875, 'banyo yapan çocuk'),
        options: [
          { id: 816, word: 'havlu', spokenText: 'havlu', imageUrl: '/images/816.png', isCorrect: true, audioKey: 'havlu' },
          { id: 137, word: 'yastık', spokenText: 'yastık', imageUrl: '/images/137.png', isCorrect: false, audioKey: 'yastik' },
          { id: 283, word: 'perde', spokenText: 'perde', imageUrl: '/images/283.png', isCorrect: false, audioKey: 'perde' },
        ],
      },
      {
        id: 325,
        activityType: ActivityType.FiveWOneH,
        question: 'Tavuklar bize ne verir?',
        questionAudioKey: 'q_what_chickens_give_us_for_breakfast',
        speech: {
          tr: { correct: 'Evet! Tavuklar yumurta verir.', wrong: 'Hayır, onu vermezler.' },
          en: { correct: 'Yes! Chickens give us eggs.', wrong: 'No, they don’t give that.' }
        },
        questionItem: meta(321, 'tavuk'),
        options: [
          { id: 113, word: 'yumurta', spokenText: 'yumurta', imageUrl: '/images/113.png', isCorrect: true, audioKey: 'yumurta' },
          { id: 801, word: 'süt', spokenText: 'süt', imageUrl: '/images/801.png', isCorrect: false, audioKey: 'sut' },
          { id: 50, word: 'peynir', spokenText: 'peynir', imageUrl: '/images/50.png', isCorrect: false, audioKey: 'peynir' },
        ],
      },
      {
        id: 326,
        activityType: ActivityType.FiveWOneH,
        question: 'Ellerimizi yıkarken ne kullanırız?',
        questionAudioKey: 'q_what_wash_hands_with',
        speech: {
          tr: { correct: 'Evet! Ellerimizi sabunla yıkarız.', wrong: 'Hayır, onunla yıkamayız.' },
          en: { correct: 'Yes! We wash our hands with soap.', wrong: "No, we don't wash with that." }
        },
        questionItem: meta(591, 'kirli el'),
        options: [
          { id: 209, word: 'sabun', spokenText: 'sabun', imageUrl: '/images/209.png', isCorrect: true, audioKey: 'sabun' },
          { id: 211, word: 'krem', spokenText: 'krem', imageUrl: '/images/211.png', isCorrect: false, audioKey: 'krem' },
          { id: 425, word: 'diş macunu', spokenText: 'diş macunu', imageUrl: '/images/425.png', isCorrect: false, audioKey: 'dis_macunu' },
        ],
      },
      {
        id: 327,
        activityType: ActivityType.FiveWOneH,
        question: 'Resim yapmak için ne kullanırız?',
        questionAudioKey: 'q_what_use_to_paint',
        speech: {
          tr: { correct: 'Evet! Resim yapmak için boya kalemleri kullanırız.', wrong: 'Hayır, onu resim için kullanmayız.' },
          en: { correct: 'Yes! We use crayons to paint.', wrong: 'No, that is not correct.' }
        },
        questionItem: meta(402, 'boş boyama sayfası'),
        options: [
          { id: 714, word: 'boya kalemleri', spokenText: 'boya kalemleri', imageUrl: '/images/714.png', isCorrect: true, audioKey: 'boya_kalemleri' },
          { id: 496, word: 'çekiç', spokenText: 'çekiç', imageUrl: '/images/496.png', isCorrect: false, audioKey: 'cekic' },
          { id: 217, word: 'tornavida', spokenText: 'tornavida', imageUrl: '/images/217.png', isCorrect: false, audioKey: 'tornavida' },
        ],
      },
      {
        id: 328,
        activityType: ActivityType.FiveWOneH,
        question: 'Saçımızı bağlamak için ne kullanırız?',
        questionAudioKey: 'q_what_use_to_tie_hair',
        speech: {
          tr: { correct: 'Evet! Saçımızı saç tokasıyla bağlarız.', wrong: 'Hayır, onu saç için kullanmayız.' },
          en: { correct: 'Yes! We use a hair clip to tie hair.', wrong: 'No, that is not correct.' }
        },
        questionItem: meta(662, 'toplu saç'),
        options: [
          { id: 979, word: 'toka', spokenText: 'toka', imageUrl: '/images/979.png', isCorrect: true, audioKey: 'toka' },
          { id: 978, word: 'kemer', spokenText: 'kemer', imageUrl: '/images/978.png', isCorrect: false, audioKey: 'kemer' },
          { id: 576, word: 'kravat', spokenText: 'kravat', imageUrl: '/images/576.png', isCorrect: false, audioKey: 'kravat' },
        ],
      },
      {
        id: 329,
        activityType: ActivityType.FiveWOneH,
        question: 'Uyurken başımızın altına ne koyarız?',
        questionAudioKey: 'q_what_put_under_head_when_sleeping',
        speech: {
          tr: { correct: 'Evet! Yastık koyarız.', wrong: 'Hayır, onu koymayız.' },
          en: { correct: 'Yes! We put a pillow.', wrong: "No, we don't put that." }
        },
        questionItem: meta(901, 'uyuyan çocuk'),
        options: [
          { id: 137, word: 'yastık', spokenText: 'yastık', imageUrl: '/images/137.png', isCorrect: true, audioKey: 'yastik' },
          { id: 36, word: 'kitap', spokenText: 'kitap', imageUrl: '/images/36.png', isCorrect: false, audioKey: 'kitap' },
          { id: 156, word: 'top', spokenText: 'top', imageUrl: '/images/156.png', isCorrect: false, audioKey: 'top' },
        ],
      },
      {
        id: 330,
        activityType: ActivityType.FiveWOneH,
        question: 'Dışarı çıkarken ayağımıza ne giyeriz?',
        questionAudioKey: 'q_what_wear_on_feet_when_going_out',
        speech: {
          tr: { correct: 'Evet! Ayakkabı giyeriz.', wrong: 'Hayır, onu giymeyiz.' },
          en: { correct: 'Yes! We wear shoes.', wrong: "No, we don't wear that." }
        },
        questionItem: meta(561, 'ayak'),
        options: [
          { id: 59, word: 'ayakkabı', spokenText: 'ayakkabı', imageUrl: '/images/59.png', isCorrect: true, audioKey: 'ayakkabi' },
          { id: 272, word: 'eldiven', spokenText: 'eldiven', imageUrl: '/images/272.png', isCorrect: false, audioKey: 'eldiven' },
          { id: 271, word: 'atkı', spokenText: 'atkı', imageUrl: '/images/271.png', isCorrect: false, audioKey: 'atki' },
        ],
      },
      {
        id: 331,
        activityType: ActivityType.FiveWOneH,
        question: 'Uzağı iyi göremeyenler ne takar?',
        questionAudioKey: 'q_what_people_who_cant_see_far_wear',
        speech: {
          tr: { correct: 'Evet! Gözlük takarlar.', wrong: 'Hayır, onu takmazlar.' },
          en: { correct: 'Yes! They wear glasses.', wrong: "No, they don't wear that." }
        },
        questionItem: meta(564, 'göz'),
        options: [
          { id: 93, word: 'gözlük', spokenText: 'gözlük', imageUrl: '/images/93.png', isCorrect: true, audioKey: 'gozluk' },
          { id: 214, word: 'dürbün', spokenText: 'dürbün', imageUrl: '/images/214.png', isCorrect: false, audioKey: 'durbun' },
          { id: 691, word: 'büyüteç', spokenText: 'büyüteç', imageUrl: '/images/691.png', isCorrect: false, audioKey: 'buyutec' },
        ],
      },
      {
        id: 332,
        activityType: ActivityType.FiveWOneH,
        question: 'Doğum günü pastasının üzerine ne koyup üfleriz?',
        questionAudioKey: 'q_what_put_on_birthday_cake_and_blow',
        speech: {
          tr: { correct: 'Evet! Mum koyup üfleriz.', wrong: 'Hayır, onu koymayız.' },
          en: { correct: 'Yes! We put candles and blow.', wrong: "No, we don't put that." }
        },
        questionItem: meta(403, 'hediye paketi'),
        options: [
          { id: 540, word: 'mum', spokenText: 'mum', imageUrl: '/images/540.png', isCorrect: true, audioKey: 'mum' },
          { id: 130, word: 'balon', spokenText: 'balon', imageUrl: '/images/130.png', isCorrect: false, audioKey: 'balon' },
          { id: 443, word: 'çiçek', spokenText: 'çiçek', imageUrl: '/images/443.png', isCorrect: false, audioKey: 'cicek' },
        ],
      },
      {
        id: 333,
        activityType: ActivityType.FiveWOneH,
        question: 'Salataya ekşi bir tat vermesi için ne sıkarız?',
        questionAudioKey: 'q_what_squeeze_on_salad_for_sour_taste',
        speech: {
          tr: { correct: 'Evet! Limon sıkarız.', wrong: 'Hayır, onu sıkmayız.' },
          en: { correct: 'Yes! We squeeze lemon.', wrong: "No, we don't squeeze that." }
        },
        questionItem: meta(332, 'salata'),
        options: [
          { id: 55, word: 'limon', spokenText: 'limon', imageUrl: '/images/55.png', isCorrect: true, audioKey: 'limon' },
          { id: 801, word: 'süt', spokenText: 'süt', imageUrl: '/images/801.png', isCorrect: false, audioKey: 'sut' },
          { id: 228, word: 'bal', spokenText: 'bal', imageUrl: '/images/228.png', isCorrect: false, audioKey: 'bal' },
        ],
      },
      {
        id: 334,
        activityType: ActivityType.FiveWOneH,
        question: 'Duvara çivi çakmak için ne kullanırız?',
        questionAudioKey: 'q_what_use_to_hammer_nail_on_wall',
        speech: {
          tr: { correct: 'Evet! Çekiç kullanırız.', wrong: 'Hayır, onu kullanmayız.' },
          en: { correct: 'Yes! We use a hammer.', wrong: "No, we don't use that." }
        },
        questionItem: meta(306, 'çivi'),
        options: [
          { id: 496, word: 'çekiç', spokenText: 'çekiç', imageUrl: '/images/496.png', isCorrect: true, audioKey: 'cekic' },
          { id: 344, word: 'pense', spokenText: 'pense', imageUrl: '/images/344.png', isCorrect: false, audioKey: 'pense' },
          { id: 217, word: 'tornavida', spokenText: 'tornavida', imageUrl: '/images/217.png', isCorrect: false, audioKey: 'tornavida' },
        ],
      },
      {
        id: 335,
        activityType: ActivityType.FiveWOneH,
        question: 'Isınmak için ne yakarız?',
        questionAudioKey: 'q_what_burn_to_get_warm',
        speech: {
          tr: { correct: 'Evet! Odun yakarız.', wrong: 'Hayır, onu yakmayız.' },
          en: { correct: 'Yes! We burn wood.', wrong: "No, we don't burn that." }
        },
        questionItem: meta(707, 'ateş'),
        options: [
          { id: 886, word: 'kütük (odun)', spokenText: 'kütük (odun)', imageUrl: '/images/886.png', isCorrect: true, audioKey: 'kutuk_odun' },
          { id: 37, word: 'kitap', spokenText: 'kitap', imageUrl: '/images/37.png', isCorrect: false, audioKey: 'kitap' },
          { id: 814, word: 'plastik şişe', spokenText: 'plastik şişe', imageUrl: '/images/814.png', isCorrect: false, audioKey: 'plastik_sise' },
        ],
      },
      {
        id: 336,
        activityType: ActivityType.FiveWOneH,
        question: 'Okula giderken eşyalarımızı neyin içine koyarız?',
        questionAudioKey: 'q_what_put_stuff_in_when_going_to_school',
        speech: {
          tr: { correct: 'Evet! Okul çantasına koyarız.', wrong: 'Hayır, ona koymayız.' },
          en: { correct: 'Yes! We put them in the school bag.', wrong: "No, we don't put them in that." }
        },
        questionItem: meta(207, 'okul çantası'),
        options: [
          { id: 207, word: 'okul çantası', spokenText: 'okul çantası', imageUrl: '/images/207.png', isCorrect: true, audioKey: 'okul_cantasi' },
          { id: 448, word: 'alışveriş sepeti', spokenText: 'alışveriş sepeti', imageUrl: '/images/448.png', isCorrect: false, audioKey: 'alisveris_sepeti' },
          { id: 671, word: 'tencere', spokenText: 'tencere', imageUrl: '/images/671.png', isCorrect: false, audioKey: 'tencere' },
        ],
      },
      {
        id: 337,
        activityType: ActivityType.FiveWOneH,
        question: 'Patatesten yapılan, çıtır çıtır yenen atıştırmalık nedir?',
        questionAudioKey: 'q_what_is_crispy_snack_made_of_potatoes',
        speech: {
          tr: { correct: 'Evet! Cips patatesten yapılır.', wrong: 'Hayır, o değil.' },
          en: { correct: 'Yes! Chips are made of potatoes.', wrong: 'No, not that.' }
        },
        questionItem: meta(802, 'patates'),
        options: [
          { id: 804, word: 'cips', spokenText: 'cips', imageUrl: '/images/804.png', isCorrect: true, audioKey: 'cips' },
          { id: 112, word: 'ekmek', spokenText: 'ekmek', imageUrl: '/images/112.png', isCorrect: false, audioKey: 'ekmek' },
          { id: 267, word: 'makarna', spokenText: 'makarna', imageUrl: '/images/267.png', isCorrect: false, audioKey: 'makarna' },
        ],
      },
      {
        id: 338,
        activityType: ActivityType.FiveWOneH,
        question: 'Suyu neyle içeriz?',
        questionAudioKey: 'q_what_drink_water_with',
        speech: {
          tr: { correct: 'Evet! Suyu bardakla içeriz.', wrong: 'Hayır, onunla içmeyiz.' },
          en: { correct: 'Yes! We drink water with a glass.', wrong: "No, we don't drink with that." }
        },
        questionItem: meta(774, 'su içen çocuk'),
        options: [
          { id: 124, word: 'bardak', spokenText: 'bardak', imageUrl: '/images/124.png', isCorrect: true, audioKey: 'bardak' },
          { id: 153, word: 'tabak', spokenText: 'tabak', imageUrl: '/images/153.png', isCorrect: false, audioKey: 'tabak' },
          { id: 125, word: 'kaşık', spokenText: 'kaşık', imageUrl: '/images/125.png', isCorrect: false, audioKey: 'kasik' },
        ],
      },
      {
        id: 339,
        activityType: ActivityType.FiveWOneH,
        question: 'Mektubu postalamak için üzerine ne yapıştırırız?',
        questionAudioKey: 'q_what_stick_on_letter_to_mail',
        speech: {
          tr: { correct: 'Evet! Pul yapıştırırız.', wrong: 'Hayır, onu yapıştırmayız.' },
          en: { correct: 'Yes! We stick a stamp.', wrong: "No, we don't stick that." }
        },
        questionItem: meta(600, 'mektup (zarf)'),
        options: [
          { id: 397, word: 'pul', spokenText: 'pul', imageUrl: '/images/397.png', isCorrect: true, audioKey: 'pul' },
          { id: 30, word: 'düğme', spokenText: 'düğme', imageUrl: '/images/30.png', isCorrect: false, audioKey: 'dugme' },
          { id: 33, word: 'jeton', spokenText: 'jeton', imageUrl: '/images/33.png', isCorrect: false, audioKey: 'jeton' },
        ],
      },
      {
        id: 340,
        activityType: ActivityType.FiveWOneH,
        question: 'Bebekler sütü neyle içer?',
        questionAudioKey: 'q_what_babies_drink_milk_with',
        speech: {
          tr: { correct: 'Evet! Bebekler sütü biberonla içer.', wrong: 'Hayır, onunla içmezler.' },
          en: { correct: 'Yes! Babies drink milk with a bottle.', wrong: "No, they don't drink with that." }
        },
        questionItem: meta(579, 'bebek'),
        options: [
          { id: 371, word: 'biberon', spokenText: 'biberon', imageUrl: '/images/371.png', isCorrect: true, audioKey: 'biberon' },
          { id: 842, word: 'fincan', spokenText: 'fincan', imageUrl: '/images/842.png', isCorrect: false, audioKey: 'fincan' },
          { id: 350, word: 'sürahi', spokenText: 'sürahi', imageUrl: '/images/350.png', isCorrect: false, audioKey: 'surahi' },
        ],
      },
      {
        id: 341,
        activityType: ActivityType.FiveWOneH,
        question: 'Dağınık saçlarımızı düzeltmek için ne kullanırız?',
        questionAudioKey: 'q_what_use_to_fix_messy_hair',
        speech: {
          tr: { correct: 'Evet! Tarak kullanırız.', wrong: 'Hayır, onu kullanmayız.' },
          en: { correct: 'Yes! We use a comb.', wrong: "No, we don't use that." }
        },
        questionItem: meta(663, 'saç'),
        options: [
          { id: 856, word: 'tarak', spokenText: 'tarak', imageUrl: '/images/856.png', isCorrect: true, audioKey: 'tarak' },
          { id: 441, word: 'diş fırçası', spokenText: 'diş fırçası', imageUrl: '/images/441.png', isCorrect: false, audioKey: 'dis_fircasi' },
          { id: 51, word: 'boya fırçası', spokenText: 'boya fırçası', imageUrl: '/images/51.png', isCorrect: false, audioKey: 'boya_fircasi' },
        ],
      },
      {
        id: 342,
        activityType: ActivityType.FiveWOneH,
        question: 'Ekmeğin üzerine kahvaltıda ne süreriz?',
        questionAudioKey: 'q_what_spread_on_bread_for_breakfast',
        speech: {
          tr: { correct: 'Evet! Tereyağı süreriz.', wrong: 'Hayır, onu sürmeyiz.' },
          en: { correct: 'Yes! We spread butter.', wrong: "No, we don't spread that." }
        },
        questionItem: meta(112, 'ekmek'),
            options: [
              { id: 810, word: 'tereyağı', spokenText: 'tereyağı', imageUrl: '/images/810.png', isCorrect: true, audioKey: 'tereyagi' },
              { id: 332, word: 'salata', spokenText: 'salata', imageUrl: '/images/332.png', isCorrect: false, audioKey: 'salata' },
              { id: 266, word: 'çorba', spokenText: 'çorba', imageUrl: '/images/266.png', isCorrect: false, audioKey: 'corba' },
            ],
          },
          // 3) NEREDE?
          {
            id: 343,
            activityType: ActivityType.FiveWOneH,
            question: 'Doktorlar nerede çalışır?',
            questionAudioKey: 'q_where_doctors_work',
            speech: {
              tr: { correct: 'Evet! Doktorlar hastanede çalışır.', wrong: 'Hayır, orada çalışmazlar.' },
              en: { correct: 'Yes! Doctors work at the hospital.', wrong: 'No, they don’t work there.' }
            },
            questionItem: meta(324, 'doktor'),
            options: [
              { id: 852, word: 'hastane', spokenText: 'hastane', imageUrl: '/images/852.png', isCorrect: true, audioKey: 'hastane' },
              { id: 497, word: 'okul', spokenText: 'okul', imageUrl: '/images/497.png', isCorrect: false, audioKey: 'okul' },
              { id: 879, word: 'market', spokenText: 'market', imageUrl: '/images/879.png', isCorrect: false, audioKey: 'market' },
            ],
          },
          {
            id: 344,
            activityType: ActivityType.FiveWOneH,
            question: 'Salıncakta sallanmak için nereye gideriz?',
            questionAudioKey: 'q_where_go_to_swing',
            speech: {
              tr: { correct: 'Evet! Çocuk parkına gideriz.', wrong: 'Hayır, oraya gitmeyiz.' },
              en: { correct: 'Yes! We go to the playground.', wrong: 'No, we don’t go there.' }
            },
            questionItem: meta(393, 'salıncak'),
            options: [
              { id: 505, word: 'çocuk parkı', spokenText: 'çocuk parkı', imageUrl: '/images/505.png', isCorrect: true, audioKey: 'cocuk_parki' },
              { id: 614, word: 'kütüphane', spokenText: 'kütüphane', imageUrl: '/images/614.png', isCorrect: false, audioKey: 'kutuphane' },
              { id: 880, word: 'restoran', spokenText: 'restoran', imageUrl: '/images/880.png', isCorrect: false, audioKey: 'restoran' },
            ],
          },
          {
            id: 345,
            activityType: ActivityType.FiveWOneH,
            question: 'Gece olunca nerede uyuruz?',
            questionAudioKey: 'q_where_sleep_at_night',
            speech: {
              tr: { correct: 'Evet! Yatakta uyuruz.', wrong: 'Hayır, orada uyumayız.' },
              en: { correct: 'Yes! We sleep in bed.', wrong: 'No, we don’t sleep there.' }
            },
            questionItem: meta(785, 'uykulu çocuk'),
            options: [
              { id: 606, word: 'yatak', spokenText: 'yatak', imageUrl: '/images/606.png', isCorrect: true, audioKey: 'yatak' },
              { id: 134, word: 'masa', spokenText: 'masa', imageUrl: '/images/134.png', isCorrect: false, audioKey: 'masa' },
              { id: 548, word: 'koltuk', spokenText: 'koltuk', imageUrl: '/images/548.png', isCorrect: false, audioKey: 'koltuk' },
            ],
          },
          {
            id: 346,
            activityType: ActivityType.FiveWOneH,
            question: 'Balıklar nerede yaşar?',
            questionAudioKey: 'q_where_fish_live',
            speech: {
              tr: { correct: 'Evet! Balıklar denizde yaşar.', wrong: 'Hayır, orada yaşamazlar.' },
              en: { correct: 'Yes! Fish live in the sea.', wrong: 'No, they don’t live there.' }
            },
            questionItem: meta(915, 'balık'),
            options: [
              { id: 225, word: 'deniz', spokenText: 'deniz', imageUrl: '/images/225.png', isCorrect: true, audioKey: 'deniz' },
              { id: 242, word: 'orman', spokenText: 'orman', imageUrl: '/images/242.png', isCorrect: false, audioKey: 'orman' },
              { id: 243, word: 'çöl', spokenText: 'çöl', imageUrl: '/images/243.png', isCorrect: false, audioKey: 'col' },
            ],
          },
          {
            id: 347,
            activityType: ActivityType.FiveWOneH,
            question: 'Öğretmenler nerede ders anlatır?',
            questionAudioKey: 'q_where_teachers_teach',
            speech: {
              tr: { correct: 'Evet! Öğretmenler okulda ders anlatır.', wrong: 'Hayır, orada anlatmazlar.' },
              en: { correct: 'Yes! Teachers teach at school.', wrong: 'No, they don’t teach there.' }
            },
            questionItem: meta(84, 'öğretmen'),
            options: [
              { id: 497, word: 'okul', spokenText: 'okul', imageUrl: '/images/497.png', isCorrect: true, audioKey: 'okul' },
              { id: 852, word: 'hastane', spokenText: 'hastane', imageUrl: '/images/852.png', isCorrect: false, audioKey: 'hastane' },
              { id: 858, word: 'plaj', spokenText: 'plaj', imageUrl: '/images/858.png', isCorrect: false, audioKey: 'plaj' },
            ],
          },
          {
            id: 348,
            activityType: ActivityType.FiveWOneH,
            question: 'Uçaklar nerede uçar?',
            questionAudioKey: 'q_where_planes_fly',
            speech: {
              tr: { correct: 'Evet! Uçaklar gökyüzünde uçar.', wrong: 'Hayır, orada uçmazlar.' },
              en: { correct: 'Yes! Planes fly in the sky.', wrong: 'No, they don’t fly there.' }
            },
            questionItem: meta(107, 'uçak'),
            options: [
              { id: 604, word: 'gökyüzü', spokenText: 'gökyüzü', imageUrl: '/images/604.png', isCorrect: true, audioKey: 'gokyuzu' },
              { id: 225, word: 'deniz', spokenText: 'deniz', imageUrl: '/images/225.png', isCorrect: false, audioKey: 'deniz' },
              { id: 61, word: 'yol', spokenText: 'yol', imageUrl: '/images/61.png', isCorrect: false, audioKey: 'yol' },
            ],
          },
          {
            id: 349,
            activityType: ActivityType.FiveWOneH,
            question: 'Gemiler nerede yüzer?',
            questionAudioKey: 'q_where_ships_sail',
            speech: {
              tr: { correct: 'Evet! Gemiler denizde yüzer.', wrong: 'Hayır, orada yüzmezler.' },
              en: { correct: 'Yes! Ships sail on the sea.', wrong: 'No, they don’t sail there.' }
            },
            questionItem: meta(492, 'gemi'),
            options: [
              { id: 225, word: 'deniz', spokenText: 'deniz', imageUrl: '/images/225.png', isCorrect: true, audioKey: 'deniz' },
              { id: 604, word: 'gökyüzü', spokenText: 'gökyüzü', imageUrl: '/images/604.png', isCorrect: false, audioKey: 'gokyuzu' },
              { id: 242, word: 'orman', spokenText: 'orman', imageUrl: '/images/242.png', isCorrect: false, audioKey: 'orman' },
            ],
          },
          {
            id: 350,
            activityType: ActivityType.FiveWOneH,
            question: 'Arabalar nerede gider?',
            questionAudioKey: 'q_where_cars_go',
            speech: {
              tr: { correct: 'Evet! Arabalar yolda gider.', wrong: 'Hayır, orada gitmezler.' },
              en: { correct: 'Yes! Cars go on the road.', wrong: 'No, they don’t go there.' }
            },
            questionItem: meta(1, 'araba'),
            options: [
              { id: 61, word: 'yol', spokenText: 'yol', imageUrl: '/images/61.png', isCorrect: true, audioKey: 'yol' },
              { id: 225, word: 'deniz', spokenText: 'deniz', imageUrl: '/images/225.png', isCorrect: false, audioKey: 'deniz' },
              { id: 891, word: 'kaldırım', spokenText: 'kaldırım', imageUrl: '/images/891.png', isCorrect: false, audioKey: 'kaldirim' },
            ],
          },
          {
            id: 351,
            activityType: ActivityType.FiveWOneH,
            question: 'Ailemizle dışarıda yemek yemek için nereye gidebiliriz?',
            questionAudioKey: 'q_where_eat_out_with_family',
            speech: {
              tr: { correct: 'Evet! Restorana gidebiliriz.', wrong: 'Hayır, oraya gitmeyiz.' },
              en: { correct: 'Yes! We can go to a restaurant.', wrong: 'No, we don’t go there.' }
            },
            questionItem: meta(827, 'yemek yiyen çocuk'),
            options: [
              { id: 880, word: 'restoran', spokenText: 'restoran', imageUrl: '/images/880.png', isCorrect: true, audioKey: 'restoran' },
              { id: 614, word: 'kütüphane', spokenText: 'kütüphane', imageUrl: '/images/614.png', isCorrect: false, audioKey: 'kutuphane' },
              { id: 852, word: 'hastane', spokenText: 'hastane', imageUrl: '/images/852.png', isCorrect: false, audioKey: 'hastane' },
            ],
          },
          {
            id: 352,
            activityType: ActivityType.FiveWOneH,
            question: 'Eve yiyecek almak için nereye gideriz?',
            questionAudioKey: 'q_where_buy_food_for_home',
            speech: {
              tr: { correct: 'Evet! Markete gideriz.', wrong: 'Hayır, oraya gitmeyiz.' },
              en: { correct: 'Yes! We go to the market.', wrong: 'No, we don’t go there.' }
            },
            questionItem: meta(248, 'para'),
            options: [
              { id: 879, word: 'market', spokenText: 'market', imageUrl: '/images/879.png', isCorrect: true, audioKey: 'market' },
              { id: 841, word: 'cami', spokenText: 'cami', imageUrl: '/images/841.png', isCorrect: false, audioKey: 'cami' },
              { id: 497, word: 'okul', spokenText: 'okul', imageUrl: '/images/497.png', isCorrect: false, audioKey: 'okul' },
            ],
          },
          {
            id: 353,
            activityType: ActivityType.FiveWOneH,
            question: 'Bir sürü kitabın olduğu ve kitap okuyabildiğimiz yer neresidir?',
            questionAudioKey: 'q_where_is_place_with_lots_of_books',
            speech: {
              tr: { correct: 'Evet! Burası kütüphane.', wrong: 'Hayır, orası değil.' },
              en: { correct: 'Yes! It’s the library.', wrong: 'No, not there.' }
            },
            questionItem: meta(36, 'kitap'),
            options: [
              { id: 614, word: 'kütüphane', spokenText: 'kütüphane', imageUrl: '/images/614.png', isCorrect: true, audioKey: 'kutuphane' },
              { id: 881, word: 'sinema salonu', spokenText: 'sinema salonu', imageUrl: '/images/881.png', isCorrect: false, audioKey: 'sinema_salonu' },
              { id: 858, word: 'plaj', spokenText: 'plaj', imageUrl: '/images/858.png', isCorrect: false, audioKey: 'plaj' },
            ],
          },
          {
            id: 354,
            activityType: ActivityType.FiveWOneH,
            question: 'Develer genellikle nerede yaşar?',
            questionAudioKey: 'q_where_camels_usually_live',
            speech: {
              tr: { correct: 'Evet! Develer çölde yaşar.', wrong: 'Hayır, orada yaşamazlar.' },
              en: { correct: 'Yes! Camels live in the desert.', wrong: 'No, they don’t live there.' }
            },
            questionItem: meta(909, 'deve'),
            options: [
              { id: 243, word: 'çöl', spokenText: 'çöl', imageUrl: '/images/243.png', isCorrect: true, audioKey: 'col' },
              { id: 242, word: 'orman', spokenText: 'orman', imageUrl: '/images/242.png', isCorrect: false, audioKey: 'orman' },
              { id: 225, word: 'deniz', spokenText: 'deniz', imageUrl: '/images/225.png', isCorrect: false, audioKey: 'deniz' },
            ],
          },
          {
            id: 355,
            activityType: ActivityType.FiveWOneH,
            question: 'Ayılar genellikle nerede yaşar?',
            questionAudioKey: 'q_where_bears_usually_live',
            speech: {
              tr: { correct: 'Evet! Ayılar ormanda yaşar.', wrong: 'Hayır, orada yaşamazlar.' },
              en: { correct: 'Yes! Bears live in the forest.', wrong: 'No, they don’t live there.' }
            },
            questionItem: meta(916, 'ayı'),
            options: [
              { id: 242, word: 'orman', spokenText: 'orman', imageUrl: '/images/242.png', isCorrect: true, audioKey: 'orman' },
              { id: 243, word: 'çöl', spokenText: 'çöl', imageUrl: '/images/243.png', isCorrect: false, audioKey: 'col' },
              { id: 858, word: 'plaj', spokenText: 'plaj', imageUrl: '/images/858.png', isCorrect: false, audioKey: 'plaj' },
            ],
          },
          {
            id: 356,
            activityType: ActivityType.FiveWOneH,
            question: 'Temiz giysilerimizi nereye koyarız?',
            questionAudioKey: 'q_where_put_clean_clothes',
            speech: {
              tr: { correct: 'Evet! Elbise dolabına koyarız.', wrong: 'Hayır, oraya koymayız.' },
              en: { correct: 'Yes! We put them in the wardrobe.', wrong: 'No, we don’t put them there.' }
            },
            questionItem: meta(255, 'gömlek'),
            options: [
              { id: 339, word: 'elbise dolabı', spokenText: 'elbise dolabı', imageUrl: '/images/339.png', isCorrect: true, audioKey: 'elbise_dolabi' },
              { id: 251, word: 'buzdolabı', spokenText: 'buzdolabı', imageUrl: '/images/251.png', isCorrect: false, audioKey: 'buzdolabi' },
              { id: 287, word: 'kitaplık', spokenText: 'kitaplık', imageUrl: '/images/287.png', isCorrect: false, audioKey: 'kitaplik' },
            ],
          },
          {
            id: 357,
            activityType: ActivityType.FiveWOneH,
            question: 'Yazın güneşlenmek ve yüzmek için nereye gideriz?',
            questionAudioKey: 'q_where_go_to_sunbathe_and_swim_in_summer',
            speech: {
              tr: { correct: 'Evet! Plaja gideriz.', wrong: 'Hayır, oraya gitmeyiz.' },
              en: { correct: 'Yes! We go to the beach.', wrong: 'No, we don’t go there.' }
            },
            questionItem: meta(796, 'yüzen çocuk'),
            options: [
              { id: 858, word: 'plaj', spokenText: 'plaj', imageUrl: '/images/858.png', isCorrect: true, audioKey: 'plaj' },
              { id: 242, word: 'orman', spokenText: 'orman', imageUrl: '/images/242.png', isCorrect: false, audioKey: 'orman' },
              { id: 195, word: 'dağ', spokenText: 'dağ', imageUrl: '/images/195.png', isCorrect: false, audioKey: 'dag' },
            ],
          },
          {
            id: 358,
            activityType: ActivityType.FiveWOneH,
            question: 'Kuşlar yumurtalarını nereye yapar?',
            questionAudioKey: 'q_where_birds_lay_eggs',
            speech: {
              tr: { correct: 'Evet! Kuş yuvasına yaparlar.', wrong: 'Hayır, oraya yapmazlar.' },
              en: { correct: 'Yes! They lay them in the bird’s nest.', wrong: 'No, they don’t lay them there.' }
            },
            questionItem: meta(73, 'kuş'),
            options: [
              { id: 534, word: 'kuş yuvası', spokenText: 'kuş yuvası', imageUrl: '/images/534.png', isCorrect: true, audioKey: 'kus_yuvasi' },
              { id: 310, word: 'akvaryum', spokenText: 'akvaryum', imageUrl: '/images/310.png', isCorrect: false, audioKey: 'akvaryum' },
              { id: 698, word: 'kuyu', spokenText: 'kuyu', imageUrl: '/images/698.png', isCorrect: false, audioKey: 'kuyu' },
            ],
          },
          {
            id: 359,
            activityType: ActivityType.FiveWOneH,
            question: 'Aşçı yemekleri nerede pişirir?',
            questionAudioKey: 'q_where_cook_cooks',
            speech: {
              tr: { correct: 'Evet! Aşçı restoranda yemek pişirir.', wrong: 'Hayır, orada pişirmez.' },
              en: { correct: 'Yes! The cook cooks in the restaurant.', wrong: 'No, he doesn’t cook there.' }
            },
            questionItem: meta(326, 'aşçı'),
            options: [
              { id: 880, word: 'restoran', spokenText: 'restoran', imageUrl: '/images/880.png', isCorrect: true, audioKey: 'restoran' },
              { id: 424, word: 'banyo', spokenText: 'banyo', imageUrl: '/images/424.png', isCorrect: false, audioKey: 'banyo' },
              { id: 606, word: 'yatak odası', spokenText: 'yatak odası', imageUrl: '/images/606.png', isCorrect: false, audioKey: 'yatak_odasi' },
            ],
          },
          {
            id: 360,
            activityType: ActivityType.FiveWOneH,
            question: 'Kamp yapmak için çadırımızı nereye kurarız?',
            questionAudioKey: 'q_where_set_up_tent_for_camping',
            speech: {
              tr: { correct: 'Evet! Çadırımızı ormana kurarız.', wrong: 'Hayır, oraya kurmayız.' },
              en: { correct: 'Yes! We camp in the forest.', wrong: 'No, we don’t camp there.' }
            },
            questionItem: meta(179, 'çadır'),
                options: [
                  { id: 242, word: 'orman', spokenText: 'orman', imageUrl: '/images/242.png', isCorrect: true, audioKey: 'orman' },
                  { id: 612, word: 'şehir', spokenText: 'şehir', imageUrl: '/images/612.png', isCorrect: false, audioKey: 'sehir' },
                  { id: 858, word: 'plaj', spokenText: 'plaj', imageUrl: '/images/858.png', isCorrect: false, audioKey: 'plaj' },
                ],
              },
              // 4) NE ZAMAN?
              {
                id: 361,
                activityType: ActivityType.FiveWOneH,
                question: 'Şemsiyeyi ne zaman kullanırız?',
                questionAudioKey: 'q_when_use_umbrella',
                speech: {
                  tr: { correct: 'Evet! Yağmurda şemsiye kullanırız.', wrong: 'Hayır, o zaman şemsiye kullanmayız.' },
                  en: { correct: 'Yes! We use an umbrella when it rains.', wrong: "No, we don't use an umbrella then." }
                },
                questionItem: meta(157, 'şemsiye'),
                options: [
                  { id: 52, word: 'yağmur', spokenText: 'yağmur', imageUrl: '/images/52.png', isCorrect: true, audioKey: 'yagmur' },
                  { id: 405, word: 'kar', spokenText: 'kar', imageUrl: '/images/405.png', isCorrect: false, audioKey: 'kar' },
                  { id: 237, word: 'güneş', spokenText: 'güneş', imageUrl: '/images/237.png', isCorrect: false, audioKey: 'gunes' },
                ],
              },
              {
                id: 362,
                activityType: ActivityType.FiveWOneH,
                question: 'Kardan adamı ne zaman yaparız?',
                questionAudioKey: 'q_when_make_snowman',
                speech: {
                  tr: { correct: 'Doğru! Kar yağınca kardan adam yaparız.', wrong: 'Hayır, o zaman kardan adam yapmayız.' },
                  en: { correct: 'Correct! We make a snowman when it snows.', wrong: "No, we don’t make a snowman then." }
                },
                questionItem: meta(440, 'kardan adam'),
                options: [
                  { id: 405, word: 'kar', spokenText: 'kar', imageUrl: '/images/405.png', isCorrect: true, audioKey: 'kar' },
                  { id: 52, word: 'yağmur', spokenText: 'yağmur', imageUrl: '/images/52.png', isCorrect: false, audioKey: 'yagmur' },
                  { id: 237, word: 'güneş', spokenText: 'güneş', imageUrl: '/images/237.png', isCorrect: false, audioKey: 'gunes' },
                ],
              },
              {
                id: 363,
                activityType: ActivityType.FiveWOneH,
                question: 'Baykuşları genellikle ne zaman görürüz?',
                questionAudioKey: 'q_when_see_owls',
                speech: {
                  tr: { correct: 'Doğru! Baykuşu gece görürüz.', wrong: 'Hayır, baykuş genelde gece görülür.' },
                  en: { correct: 'Correct! We see owls at night.', wrong: 'No, owls are usually seen at night.' }
                },
                questionItem: meta(103, 'baykuş'),
                options: [
                  { id: 603, word: 'gece', spokenText: 'gece', imageUrl: '/images/603.png', isCorrect: true, audioKey: 'gece' },
                  { id: 604, word: 'gündüz', spokenText: 'gündüz', imageUrl: '/images/604.png', isCorrect: false, audioKey: 'gunduz' },
                  { id: 52, word: 'yağmurlu hava', spokenText: 'yağmurlu hava', imageUrl: '/images/52.png', isCorrect: false, audioKey: 'yagmurlu_hava' },
                ],
              },
              {
                id: 364,
                activityType: ActivityType.FiveWOneH,
                question: 'Gökyüzünde yıldızları ne zaman görürüz?',
                questionAudioKey: 'q_when_see_stars_in_sky',
                speech: {
                  tr: { correct: 'Evet! Gece görürüz.', wrong: 'Hayır, o zaman görmeyiz.' },
                  en: { correct: 'Yes! We see them at night.', wrong: 'No, we don’t see them then.' }
                },
                questionItem: meta(239, 'yıldızlar'),
                options: [
                  { id: 603, word: 'gece', spokenText: 'gece', imageUrl: '/images/603.png', isCorrect: true, audioKey: 'gece' },
                  { id: 604, word: 'gündüz', spokenText: 'gündüz', imageUrl: '/images/604.png', isCorrect: false, audioKey: 'gunduz' },
                  { id: 236, word: 'bulutlu hava', spokenText: 'bulutlu hava', imageUrl: '/images/236.png', isCorrect: false, audioKey: 'bulutlu_hava' },
                ],
              },
              {
                id: 365,
                activityType: ActivityType.FiveWOneH,
                question: 'Horozlar genellikle ne zaman öter?',
                questionAudioKey: 'q_when_roosters_crow',
                speech: {
                  tr: { correct: 'Evet! Sabah öterler.', wrong: 'Hayır, o zaman ötmezler.' },
                  en: { correct: 'Yes! They crow in the morning.', wrong: 'No, they don’t crow then.' }
                },
                questionItem: meta(102, 'horoz'),
                options: [
                  { id: 604, word: 'gündüz / sabah', spokenText: 'gündüz / sabah', imageUrl: '/images/604.png', isCorrect: true, audioKey: 'gunduz_sabah' },
                  { id: 603, word: 'gece', spokenText: 'gece', imageUrl: '/images/603.png', isCorrect: false, audioKey: 'gece' },
                  { id: 405, word: 'karlı hava', spokenText: 'karlı hava', imageUrl: '/images/405.png', isCorrect: false, audioKey: 'karli_hava' },
                ],
              },
              {
                id: 366,
                activityType: ActivityType.FiveWOneH,
                question: 'Bereyi ne zaman takarız?',
                questionAudioKey: 'q_when_wear_beanie_when_cold',
                speech: {
                  tr: { correct: 'Doğru! Karlı havada bere takarız.', wrong: 'Hayır, o zaman bere takmayız.' },
                  en: { correct: 'Correct! We wear a beanie when it snows.', wrong: "No, we don't wear a beanie then." }
                },
                questionItem: meta(336, 'bere'),
                options: [
                  { id: 405, word: 'karlı hava', spokenText: 'karlı hava', imageUrl: '/images/405.png', isCorrect: true, audioKey: 'karli_hava' },
                  { id: 237, word: 'güneşli hava', spokenText: 'güneşli hava', imageUrl: '/images/237.png', isCorrect: false, audioKey: 'gunesli_hava' },
                  { id: 52, word: 'yağmurlu hava', spokenText: 'yağmurlu hava', imageUrl: '/images/52.png', isCorrect: false, audioKey: 'yagmurlu_hava' },
                ],
              },
              {
                id: 367,
                activityType: ActivityType.FiveWOneH,
                question: 'Plaja genellikle ne zaman gideriz?',
                questionAudioKey: 'q_when_usually_go_to_beach',
                speech: {
                  tr: { correct: 'Evet! Güneşli havada gideriz.', wrong: 'Hayır, o zaman gitmeyiz.' },
                  en: { correct: 'Yes! We go when it’s sunny.', wrong: 'No, we don’t go then.' }
                },
                questionItem: meta(858, 'plaj'),
                options: [
                  { id: 237, word: 'güneşli hava', spokenText: 'güneşli hava', imageUrl: '/images/237.png', isCorrect: true, audioKey: 'gunesli_hava' },
                  { id: 405, word: 'karlı hava', spokenText: 'karlı hava', imageUrl: '/images/405.png', isCorrect: false, audioKey: 'karli_hava' },
                  { id: 52, word: 'yağmurlu hava', spokenText: 'yağmurlu hava', imageUrl: '/images/52.png', isCorrect: false, audioKey: 'yagmurlu_hava' },
                ],
              },
              {
                id: 368,
                activityType: ActivityType.FiveWOneH,
                question: 'Pastanın üzerindeki mumları ne zaman üfleriz?',
                questionAudioKey: 'q_when_blow_out_candles_on_cake',
                speech: {
                  tr: { correct: 'Evet! Doğum günümüzde üfleriz.', wrong: 'Hayır, o zaman üflemeyiz.' },
                  en: { correct: 'Yes! We blow them out on our birthday.', wrong: 'No, we don’t blow them out then.' }
                },
                questionItem: meta(78, 'pasta'),
                options: [
                  { id: 403, word: 'doğum gününde', spokenText: 'doğum gününde', imageUrl: '/images/403.png', isCorrect: true, audioKey: 'dogum_gununde' },
                  { id: 105, word: 'okula giderken', spokenText: 'okula giderken', imageUrl: '/images/105.png', isCorrect: false, audioKey: 'okula_giderken' },
                  { id: 606, word: 'uyurken', spokenText: 'uyurken', imageUrl: '/images/606.png', isCorrect: false, audioKey: 'uyurken' },
                ],
              },
              {
                id: 369,
                activityType: ActivityType.FiveWOneH,
                question: 'Ne zaman yemek yeriz?',
                questionAudioKey: 'q_when_eat',
                speech: {
                  tr: { correct: 'Evet! Acıkınca yemek yeriz.', wrong: 'Hayır, o zaman yemeyiz.' },
                  en: { correct: 'Yes! We eat when we are hungry.', wrong: 'No, we don’t eat then.' }
                },
                questionItem: meta(827, 'yemek yiyen çocuk'),
                options: [
                  { id: 752, word: 'acıkınca', spokenText: 'acıkınca', imageUrl: '/images/752.png', isCorrect: true, audioKey: 'acikinca' },
                  { id: 785, word: 'uykumuz gelince', spokenText: 'uykumuz gelince', imageUrl: '/images/785.png', isCorrect: false, audioKey: 'uykumuz_gelince' },
                  { id: 751, word: 'tokken', spokenText: 'tokken', imageUrl: '/images/751.png', isCorrect: false, audioKey: 'tokken' },
                ],
              },
              {
                id: 370,
                activityType: ActivityType.FiveWOneH,
                question: 'Ne zaman uyuruz?',
                questionAudioKey: 'q_when_sleep',
                speech: {
                  tr: { correct: 'Evet! Yorulunca uyuruz.', wrong: 'Hayır, o zaman uyumayız.' },
                  en: { correct: 'Yes! We sleep when we are tired.', wrong: 'No, we don’t sleep then.' }
                },
                questionItem: meta(901, 'uyuyan çocuk'),
                options: [
                  { id: 904, word: 'yorulunca', spokenText: 'yorulunca', imageUrl: '/images/904.png', isCorrect: true, audioKey: 'yorulunca' },
                  { id: 752, word: 'acıkınca', spokenText: 'acıkınca', imageUrl: '/images/752.png', isCorrect: false, audioKey: 'acikinca' },
                  { id: 776, word: 'heyecanlanınca', spokenText: 'heyecanlanınca', imageUrl: '/images/776.png', isCorrect: false, audioKey: 'heyecanlaninca' },
                ],
              },
              {
                id: 371,
                activityType: ActivityType.FiveWOneH,
                question: 'Ayılar ne zaman kış uykusuna yatar?',
                questionAudioKey: 'q_when_bears_hibernate',
                speech: {
                  tr: { correct: 'Doğru! Kışın kış uykusuna yatarlar.', wrong: 'Hayır, o zaman yatmazlar.' },
                  en: { correct: 'Correct! They hibernate in winter.', wrong: 'No, they don’t hibernate then.' }
                },
                questionItem: meta(916, 'ayı'),
                options: [
                  { id: 405, word: 'kışın', spokenText: 'kışın', imageUrl: '/images/405.png', isCorrect: true, audioKey: 'kisin' },
                  { id: 237, word: 'yazın', spokenText: 'yazın', imageUrl: '/images/237.png', isCorrect: false, audioKey: 'yazin' },
                  { id: 117, word: 'sonbaharda', spokenText: 'sonbaharda', imageUrl: '/images/117.png', isCorrect: false, audioKey: 'sonbaharda' },
                ],
              },
              {
                id: 372,
                activityType: ActivityType.FiveWOneH,
                question: 'Genellikle ne zaman yatağımıza gideriz?',
                questionAudioKey: 'q_when_usually_go_to_bed',
                speech: {
                  tr: { correct: 'Evet! Gece yatağımıza gideriz.', wrong: 'Hayır, o zaman gitmeyiz.' },
                  en: { correct: 'Yes! We go to bed at night.', wrong: 'No, we don’t go then.' }
                },
                questionItem: meta(606, 'yatak'),
                options: [
                  { id: 603, word: 'gece', spokenText: 'gece', imageUrl: '/images/603.png', isCorrect: true, audioKey: 'gece' },
                  { id: 604, word: 'gündüz', spokenText: 'gündüz', imageUrl: '/images/604.png', isCorrect: false, audioKey: 'gunduz' },
                  { id: 102, word: 'sabah', spokenText: 'sabah', imageUrl: '/images/102.png', isCorrect: false, audioKey: 'sabah' },
                ],
              },
              {
                id: 373,
                activityType: ActivityType.FiveWOneH,
                question: 'Gökyüzünde güneşi ne zaman görürüz?',
                questionAudioKey: 'q_when_see_sun_in_sky',
                speech: {
                  tr: { correct: 'Evet! Gündüz görürüz.', wrong: 'Hayır, o zaman görmeyiz.' },
                  en: { correct: 'Yes! We see it during the day.', wrong: 'No, we don’t see it then.' }
                },
                questionItem: meta(237, 'güneş'),
                options: [
                  { id: 604, word: 'gündüz', spokenText: 'gündüz', imageUrl: '/images/604.png', isCorrect: true, audioKey: 'gunduz' },
                  { id: 603, word: 'gece', spokenText: 'gece', imageUrl: '/images/603.png', isCorrect: false, audioKey: 'gece' },
                  { id: 52, word: 'yağmurlu hava', spokenText: 'yağmurlu hava', imageUrl: '/images/52.png', isCorrect: false, audioKey: 'yagmurlu_hava' },
                ],
              },
              {
                id: 374,
                activityType: ActivityType.FiveWOneH,
                question: 'Odanın ışığını ne zaman açarız?',
                questionAudioKey: 'q_when_turn_on_light_in_room',
                speech: {
                  tr: { correct: 'Evet! Gece veya karanlık olunca açarız.', wrong: 'Hayır, o zaman açmayız.' },
                  en: { correct: 'Yes! We turn it on at night or when it’s dark.', wrong: 'No, we don’t turn it on then.' }
                },
                questionItem: meta(575, 'lamba'),
                options: [
                  { id: 603, word: 'gece / karanlık olunca', spokenText: 'gece / karanlık olunca', imageUrl: '/images/603.png', isCorrect: true, audioKey: 'gece_karanlik_olunca' },
                  { id: 604, word: 'gündüz', spokenText: 'gündüz', imageUrl: '/images/604.png', isCorrect: false, audioKey: 'gunduz' },
                  { id: 237, word: 'güneşli havada', spokenText: 'güneşli havada', imageUrl: '/images/237.png', isCorrect: false, audioKey: 'gunesli_havada' },
                ],
              },
              {
                id: 375,
                activityType: ActivityType.FiveWOneH,
                question: 'Eldivenlerimizi ne zaman takarız?',
                questionAudioKey: 'q_when_wear_gloves_when_hands_cold',
                speech: {
                  tr: { correct: 'Evet! Soğuk havada takarız.', wrong: 'Hayır, o zaman takmayız.' },
                  en: { correct: 'Yes! We wear them when it’s snowy.', wrong: 'No, we don’t wear them then.' }
                },
                questionItem: meta(272, 'eldivenler'),
                options: [
                  { id: 405, word: 'karlı havada', spokenText: 'karlı havada', imageUrl: '/images/405.png', isCorrect: true, audioKey: 'karli_hava' },
                  { id: 237, word: 'güneşli havada', spokenText: 'güneşli havada', imageUrl: '/images/237.png', isCorrect: false, audioKey: 'gunesli_hava' },
                  { id: 707, word: 'sıcak havada', spokenText: 'sıcak havada', imageUrl: '/images/707.png', isCorrect: false, audioKey: 'sicak_havada' },
                ],
              },
              {
                id: 376,
                activityType: ActivityType.FiveWOneH,
                question: 'Genellikle ne zaman şort giyeriz?',
                questionAudioKey: 'q_when_usually_wear_shorts',
                speech: {
                  tr: { correct: 'Evet! Sıcak veya güneşli havada giyeriz.', wrong: 'Hayır, o zaman giymeyiz.' },
                  en: { correct: 'Yes! We wear them when it’s hot or sunny.', wrong: 'No, we don’t wear them then.' }
                },
                questionItem: meta(80, 'şort'),
                options: [
                  { id: 237, word: 'sıcak / güneşli havada', spokenText: 'sıcak / güneşli havada', imageUrl: '/images/237.png', isCorrect: true, audioKey: 'sicak_gunesli_havada' },
                  { id: 405, word: 'karlı havada', spokenText: 'karlı havada', imageUrl: '/images/405.png', isCorrect: false, audioKey: 'karli_hava' },
                  { id: 899, word: 'soğuk havada', spokenText: 'soğuk havada', imageUrl: '/images/899.png', isCorrect: false, audioKey: 'soguk_havada' },
                ],
              },
              {
                id: 377,
                activityType: ActivityType.FiveWOneH,
                question: 'Ellerimizi ne zaman yıkarız?',
                questionAudioKey: 'q_when_wash_hands',
                speech: {
                  tr: { correct: 'Evet! Kirlenince yıkarız.', wrong: 'Hayır, o zaman yıkamayız.' },
                  en: { correct: 'Yes! We wash them when they are dirty.', wrong: 'No, we don’t wash them then.' }
                },
                questionItem: meta(820, 'el yıkamak'),
                    options: [
                      { id: 591, word: 'kirlenince', spokenText: 'kirlenince', imageUrl: '/images/591.png', isCorrect: true, audioKey: 'kirlenince' },
                      { id: 901, word: 'uyurken', spokenText: 'uyurken', imageUrl: '/images/901.png', isCorrect: false, audioKey: 'uyurken' },
                      { id: 590, word: 'temizken', spokenText: 'temizken', imageUrl: '/images/590.png', isCorrect: false, audioKey: 'temizken' },
                    ],
                  },
                  // 5) NEDEN?
                  {
                    id: 378,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Dondurma neden erimiş olabilir?',
                    questionAudioKey: 'q_why_ice_cream_melted',
                    speech: {
                      tr: { correct: 'Evet! Güneşten erimiş olabilir.', wrong: 'Hayır, ondan erimemiştir.' },
                      en: { correct: 'Yes! It might have melted because of the sun.', wrong: 'No, it didn’t melt because of that.' }
                    },
                    questionItem: meta(64, 'erimiş dondurma'),
                    options: [
                      { id: 237, word: 'güneş', spokenText: 'güneş', imageUrl: '/images/237.png', isCorrect: true, audioKey: 'gunes' },
                      { id: 405, word: 'kar', spokenText: 'kar', imageUrl: '/images/405.png', isCorrect: false, audioKey: 'kar' },
                      { id: 238, word: 'ay', spokenText: 'ay', imageUrl: '/images/238.png', isCorrect: false, audioKey: 'ay' },
                    ],
                  },
                  {
                    id: 379,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Bu saç neden ıslak?',
                    questionAudioKey: 'q_why_hair_is_wet',
                    speech: {
                      tr: { correct: 'Evet! Duş aldığı için ıslak.', wrong: 'Hayır, ondan ıslak değil.' },
                      en: { correct: 'Yes! It’s wet because of a shower.', wrong: 'No, it’s not wet because of that.' }
                    },
                    questionItem: meta(594, 'ıslak saç'),
                    options: [
                      { id: 300, word: 'duş başlığı', spokenText: 'duş başlığı', imageUrl: '/images/300.png', isCorrect: true, audioKey: 'dus_basligi' },
                      { id: 856, word: 'tarak', spokenText: 'tarak', imageUrl: '/images/856.png', isCorrect: false, audioKey: 'tarak' },
                      { id: 930, word: 'saç kurutma makinesi', spokenText: 'saç kurutma makinesi', imageUrl: '/images/930.png', isCorrect: false, audioKey: 'sac_kurutma_makinesi' },
                    ],
                  },
                  {
                    id: 380,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Çocuk neden üşüyor olabilir?',
                    questionAudioKey: 'q_why_child_is_cold',
                    speech: {
                      tr: { correct: 'Evet! Kar yağdığı için üşüyor olabilir.', wrong: 'Hayır, ondan üşümüyor.' },
                      en: { correct: 'Yes! He might be cold because it’s snowing.', wrong: 'No, he’s not cold because of that.' }
                    },
                    questionItem: meta(899, 'üşüyen çocuk'),
                    options: [
                      { id: 405, word: 'kar / soğuk hava', spokenText: 'kar / soğuk hava', imageUrl: '/images/405.png', isCorrect: true, audioKey: 'kar_soguk_hava' },
                      { id: 237, word: 'güneş / sıcak hava', spokenText: 'güneş / sıcak hava', imageUrl: '/images/237.png', isCorrect: false, audioKey: 'gunes_sicak_hava' },
                      { id: 707, word: 'ateş', spokenText: 'ateş', imageUrl: '/images/707.png', isCorrect: false, audioKey: 'ates' },
                    ],
                  },
                  {
                    id: 381,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Bu çocuk neden ağlıyor olabilir?',
                    questionAudioKey: 'q_why_child_is_crying',
                    speech: {
                      tr: { correct: 'Evet! Canı acıdığı için ağlıyor olabilir.', wrong: 'Hayır, ondan ağlamıyor.' },
                      en: { correct: 'Yes! He might be crying because he’s hurt.', wrong: 'No, he’s not crying because of that.' }
                    },
                    questionItem: meta(781, 'ağlayan çocuk'),
                    options: [
                      { id: 873, word: 'canı acıyan çocuk (düşmüş)', spokenText: 'canı acıyan çocuk (düşmüş)', imageUrl: '/images/873.png', isCorrect: true, audioKey: 'cani_aciyan_cocuk_dusmus' },
                      { id: 500, word: 'mutlu çocuk', spokenText: 'mutlu çocuk', imageUrl: '/images/500.png', isCorrect: false, audioKey: 'mutlu_cocuk' },
                      { id: 826, word: 'oyun oynayan çocuk', spokenText: 'oyun oynayan çocuk', imageUrl: '/images/826.png', isCorrect: false, audioKey: 'oyun_oynayan_cocuk' },
                    ],
                  },
                  {
                    id: 382,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Çocuk neden şemsiye tutuyor?',
                    questionAudioKey: 'q_why_child_holds_umbrella',
                    speech: {
                      tr: { correct: 'Evet! Yağmur yağdığı için şemsiye tutuyor.', wrong: 'Hayır, ondan tutmuyor.' },
                      en: { correct: 'Yes! He’s holding an umbrella because it’s raining.', wrong: 'No, he’s not holding it for that reason.' }
                    },
                    questionItem: meta(157, 'şemsiye tutan çocuk'),
                    options: [
                      { id: 52, word: 'yağmur', spokenText: 'yağmur', imageUrl: '/images/52.png', isCorrect: true, audioKey: 'yagmur' },
                      { id: 405, word: 'kar', spokenText: 'kar', imageUrl: '/images/405.png', isCorrect: false, audioKey: 'kar' },
                      { id: 237, word: 'güneş', spokenText: 'güneş', imageUrl: '/images/237.png', isCorrect: false, audioKey: 'gunes' },
                    ],
                  },
                  {
                    id: 383,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Kırışık elbise neden düzgün oldu?',
                    questionAudioKey: 'q_why_wrinkled_clothes_became_smooth',
                    speech: {
                      tr: { correct: 'Evet! Ütülendiği için düzgün oldu.', wrong: 'Hayır, ondan değil.' },
                      en: { correct: 'Yes! They became smooth because they were ironed.', wrong: 'No, not because of that.' }
                    },
                    questionItem: meta(255, 'düzgün gömlek'),
                    options: [
                      { id: 305, word: 'ütü', spokenText: 'ütü', imageUrl: '/images/305.png', isCorrect: true, audioKey: 'utu' },
                      { id: 169, word: 'çamaşır makinesi', spokenText: 'çamaşır makinesi', imageUrl: '/images/169.png', isCorrect: false, audioKey: 'camasir_makinesi' },
                      { id: 339, word: 'elbise dolabı', spokenText: 'elbise dolabı', imageUrl: '/images/339.png', isCorrect: false, audioKey: 'elbise_dolabi' },
                    ],
                  },
                  {
                    id: 384,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Ellerimiz neden kirlenir?',
                    questionAudioKey: 'q_why_hands_get_dirty',
                    speech: {
                      tr: { correct: 'Evet! Oyun oynayınca kirlenir.', wrong: 'Hayır, ondan kirlenmez.' },
                      en: { correct: 'Yes! They get dirty when we play.', wrong: 'No, they don’t get dirty from that.' }
                    },
                    questionItem: meta(591, 'kirli el'),
                    options: [
                      { id: 505, word: 'oyun oynamak', spokenText: 'oyun oynamak', imageUrl: '/images/505.png', isCorrect: true, audioKey: 'oyun_oynamak' },
                      { id: 606, word: 'uyumak', spokenText: 'uyumak', imageUrl: '/images/606.png', isCorrect: false, audioKey: 'uyumak' },
                      { id: 827, word: 'yemek yemek', spokenText: 'yemek yemek', imageUrl: '/images/827.png', isCorrect: false, audioKey: 'yemek_yemek' },
                    ],
                  },
                  {
                    id: 385,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Bu çocuk neden yorulmuş olabilir?',
                    questionAudioKey: 'q_why_child_is_tired',
                    speech: {
                      tr: { correct: 'Evet! Bisiklet sürdüğü için yorulmuş olabilir.', wrong: 'Hayır, ondan yorulmamıştır.' },
                      en: { correct: 'Yes! He might be tired because he rode a bike.', wrong: 'No, he’s not tired from that.' }
                    },
                    questionItem: meta(904, 'yorulmuş çocuk'),
                    options: [
                      { id: 825, word: 'bisiklet sürmek', spokenText: 'bisiklet sürmek', imageUrl: '/images/825.png', isCorrect: true, audioKey: 'bisiklet_surmek' },
                      { id: 548, word: 'oturmak', spokenText: 'oturmak', imageUrl: '/images/548.png', isCorrect: false, audioKey: 'oturmak' },
                      { id: 775, word: 'kitap okumak', spokenText: 'kitap okumak', imageUrl: '/images/775.png', isCorrect: false, audioKey: 'kitap_okumak' },
                    ],
                  },
                  {
                    id: 386,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Bu çocuk neden yatıyor?',
                    questionAudioKey: 'q_why_child_is_lying_down',
                    speech: {
                      tr: { correct: 'Evet! Ateşi olduğu için yatıyor olabilir.', wrong: 'Hayır, ondan yatmıyor.' },
                      en: { correct: 'Yes! He might be lying down because he has a fever.', wrong: 'No, he’s not lying down for that reason.' }
                    },
                    questionItem: meta(784, 'hasta çocuk'),
                    options: [
                      { id: 872, word: 'ateşli çocuk (termometre)', spokenText: 'ateşli çocuk (termometre)', imageUrl: '/images/872.png', isCorrect: true, audioKey: 'atesli_cocuk_termometre' },
                      { id: 779, word: 'neşeli çocuk', spokenText: 'neşeli çocuk', imageUrl: '/images/779.png', isCorrect: false, audioKey: 'neseli_cocuk' },
                      { id: 500, word: 'yüzü gülen çocuk', spokenText: 'yüzü gülen çocuk', imageUrl: '/images/500.png', isCorrect: false, audioKey: 'yuzu_gulen_cocuk' },
                    ],
                  },
                  {
                    id: 387,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Vazo neden kırılmış olabilir?',
                    questionAudioKey: 'q_why_vase_is_broken',
                    speech: {
                      tr: { correct: 'Evet! Top oynarken kırılmış olabilir.', wrong: 'Hayır, ondan kırılmamıştır.' },
                      en: { correct: 'Yes! It might have been broken while playing with a ball.', wrong: 'No, it wasn’t broken by that.' }
                    },
                    questionItem: meta(651, 'kırık vazo'),
                    options: [
                      { id: 826, word: 'top oynamak (içeride)', spokenText: 'top oynamak (içeride)', imageUrl: '/images/826.png', isCorrect: true, audioKey: 'top_oynamak_iceride' },
                      { id: 443, word: 'çiçek', spokenText: 'çiçek', imageUrl: '/images/443.png', isCorrect: false, audioKey: 'cicek' },
                      { id: 982, word: 'su', spokenText: 'su', imageUrl: '/images/982.png', isCorrect: false, audioKey: 'su' },
                    ],
                  },
                  {
                    id: 388,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Oda neden aydınlık?',
                    questionAudioKey: 'q_why_room_is_bright',
                    speech: {
                      tr: { correct: 'Evet! Lamba yandığı için aydınlık.', wrong: 'Hayır, ondan aydınlık değil.' },
                      en: { correct: 'Yes! It’s bright because the lamp is on.', wrong: 'No, it’s not bright because of that.' }
                    },
                    questionItem: meta(575, 'lamba'),
                    options: [
                      { id: 575, word: 'lamba', spokenText: 'lamba', imageUrl: '/images/575.png', isCorrect: true, audioKey: 'lamba' },
                      { id: 598, word: 'perde (kapalı)', spokenText: 'perde (kapalı)', imageUrl: '/images/598.png', isCorrect: false, audioKey: 'perde_kapali' },
                      { id: 686, word: 'güneş gözlüğü', spokenText: 'güneş gözlüğü', imageUrl: '/images/686.png', isCorrect: false, audioKey: 'gunes_gozlugu' },
                    ],
                  },
                  {
                    id: 389,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Yerler neden ıslak olabilir?',
                    questionAudioKey: 'q_why_floor_is_wet',
                    speech: {
                      tr: { correct: 'Evet! Yağmur yağdığı için ıslak olabilir.', wrong: 'Hayır, ondan ıslak değildir.' },
                      en: { correct: 'Yes! It might be wet because it’s raining.', wrong: 'No, it’s not wet because of that.' }
                    },
                    questionItem: meta(599, 'ıslak zemin'),
                    options: [
                      { id: 52, word: 'yağmur', spokenText: 'yağmur', imageUrl: '/images/52.png', isCorrect: true, audioKey: 'yagmur' },
                      { id: 237, word: 'güneş', spokenText: 'güneş', imageUrl: '/images/237.png', isCorrect: false, audioKey: 'gunes' },
                      { id: 405, word: 'kar', spokenText: 'kar', imageUrl: '/images/405.png', isCorrect: false, audioKey: 'kar' },
                    ],
                  },
                  {
                    id: 390,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Oda neden karanlık?',
                    questionAudioKey: 'q_why_room_is_dark',
                    speech: {
                      tr: { correct: 'Evet! Gece olduğu için karanlık.', wrong: 'Hayır, ondan karanlık değil.' },
                      en: { correct: 'Yes! It’s dark because it’s night.', wrong: 'No, it’s not dark because of that.' }
                    },
                    questionItem: meta(83, 'gece penceresi'),
                    options: [
                      { id: 603, word: 'gece', spokenText: 'gece', imageUrl: '/images/603.png', isCorrect: true, audioKey: 'gece' },
                      { id: 604, word: 'gündüz', spokenText: 'gündüz', imageUrl: '/images/604.png', isCorrect: false, audioKey: 'gunduz' },
                      { id: 575, word: 'lamba', spokenText: 'lamba', imageUrl: '/images/575.png', isCorrect: false, audioKey: 'lamba' },
                    ],
                  },
                  {
                    id: 391,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Çocuk neden mutlu olmuş olabilir?',
                    questionAudioKey: 'q_why_child_is_happy',
                    speech: {
                      tr: { correct: 'Evet! Hediye aldığı için mutlu olmuş olabilir.', wrong: 'Hayır, ondan mutlu olmamıştır.' },
                      en: { correct: 'Yes! He might be happy because he received a gift.', wrong: 'No, he’s not happy because of that.' }
                    },
                    questionItem: meta(500, 'mutlu çocuk'),
                    options: [
                      { id: 403, word: 'hediye kutusu', spokenText: 'hediye kutusu', imageUrl: '/images/403.png', isCorrect: true, audioKey: 'hediye_kutusu' },
                      { id: 108, word: 'kırık oyuncak', spokenText: 'kırık oyuncak', imageUrl: '/images/108.png', isCorrect: false, audioKey: 'kirik_oyuncak' },
                      { id: 14, word: 'kirli tişört', spokenText: 'kirli tişört', imageUrl: '/images/14.png', isCorrect: false, audioKey: 'kirli_tisort' },
                    ],
                  },
                  {
                    id: 392,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Kirli tabaklar neden temizlendi?',
                    questionAudioKey: 'q_why_dirty_dishes_are_clean',
                    speech: {
                      tr: { correct: 'Evet! Bulaşık makinesinde yıkandıkları için temizlendi.', wrong: 'Hayır, ondan temizlenmedi.' },
                      en: { correct: 'Yes! They were cleaned because they were washed in the dishwasher.', wrong: 'No, they weren’t cleaned by that.' }
                    },
                    questionItem: meta(153, 'temiz tabak'),
                    options: [
                      { id: 301, word: 'bulaşık makinesi', spokenText: 'bulaşık makinesi', imageUrl: '/images/301.png', isCorrect: true, audioKey: 'bulasik_makinesi' },
                      { id: 302, word: 'fırın', spokenText: 'fırın', imageUrl: '/images/302.png', isCorrect: false, audioKey: 'firin' },
                      { id: 251, word: 'buzdolabı', spokenText: 'buzdolabı', imageUrl: '/images/251.png', isCorrect: false, audioKey: 'buzdolabi' },
                    ],
                  },
                  {
                    id: 393,
                    activityType: ActivityType.FiveWOneH,
                    question: 'Bazı insanlar neden gözlük takar?',
                    questionAudioKey: 'q_why_some_people_wear_glasses',
                    speech: {
                      tr: { correct: 'Evet! Uzağı iyi göremedikleri için takarlar.', wrong: 'Hayır, ondan takmazlar.' },
                      en: { correct: 'Yes! They wear them because they can’t see far.', wrong: 'No, they don’t wear them for that reason.' }
                    },
                    questionItem: meta(93, 'gözlük'),
                        options: [
                          { id: 175, word: 'uzağı görememek', spokenText: 'uzağı görememek', imageUrl: '/images/175.png', isCorrect: true, audioKey: 'uzagi_gorememek' },
                          { id: 490, word: 'iyi duymak için', spokenText: 'iyi duymak için', imageUrl: '/images/490.png', isCorrect: false, audioKey: 'iyi_duymak_icin' },
                          { id: 556, word: 'güzel koklamak için', spokenText: 'güzel koklamak için', imageUrl: '/images/556.png', isCorrect: false, audioKey: 'guzel_koklamak_icin' },
                        ],
                      },
                      // 6) NASIL?
                      {
                        id: 394,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Okula nasıl gideriz?',
                        questionAudioKey: 'q_how_go_to_school',
                        speech: {
                          tr: { correct: 'Evet! Okula okul otobüsüyle gideriz.', wrong: 'Hayır, genelde öyle gitmeyiz.' },
                          en: { correct: 'Yes! We go to school by school bus.', wrong: "No, we don’t usually go that way." }
                        },
                        questionItem: meta(497, 'okul'),
                        options: [
                          { id: 105, word: 'okul otobüsü', spokenText: 'okul otobüsü', imageUrl: '/images/105.png', isCorrect: true, audioKey: 'okul_otobusu' },
                          { id: 492, word: 'gemi', spokenText: 'gemi', imageUrl: '/images/492.png', isCorrect: false, audioKey: 'gemi' },
                          { id: 107, word: 'uçak', spokenText: 'uçak', imageUrl: '/images/107.png', isCorrect: false, audioKey: 'ucak' },
                        ],
                      },
                      {
                        id: 395,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Kapıyı nasıl açarız?',
                        questionAudioKey: 'q_how_open_door',
                        speech: {
                          tr: { correct: 'Evet! Kapıyı anahtarla açarız.', wrong: 'Hayır, kapıyı onunla açmayız.' },
                          en: { correct: 'Yes! We open the door with a key.', wrong: "No, we don’t open the door with that." }
                        },
                        questionItem: meta(39, 'kapı'),
                        options: [
                          { id: 142, word: 'anahtar', spokenText: 'anahtar', imageUrl: '/images/142.png', isCorrect: true, audioKey: 'anahtar' },
                          { id: 37, word: 'kitap', spokenText: 'kitap', imageUrl: '/images/37.png', isCorrect: false, audioKey: 'kitap' },
                          { id: 125, word: 'kaşık', spokenText: 'kaşık', imageUrl: '/images/125.png', isCorrect: false, audioKey: 'kasik' },
                        ],
                      },
                      {
                        id: 396,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Bu bebek kendini nasıl hissediyor?',
                        questionAudioKey: 'q_how_baby_feels',
                        speech: {
                          tr: { correct: 'Doğru! Bebek üzgün.', wrong: 'Hayır, bebek öyle hissetmiyor.' },
                          en: { correct: 'Correct! The baby feels sad.', wrong: "No, the baby doesn’t feel that way." }
                        },
                        questionItem: meta(752, 'ağlayan bebek'),
                        options: [
                          { id: 501, word: 'üzgün', spokenText: 'üzgün', imageUrl: '/images/501.png', isCorrect: true, audioKey: 'uzgun' },
                          { id: 500, word: 'mutlu', spokenText: 'mutlu', imageUrl: '/images/500.png', isCorrect: false, audioKey: 'mutlu' },
                          { id: 503, word: 'şaşkın', spokenText: 'şaşkın', imageUrl: '/images/503.png', isCorrect: false, audioKey: 'saskin' },
                        ],
                      },
                      {
                        id: 397,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Yüksek bir yere nasıl ulaşırız?',
                        questionAudioKey: 'q_how_reach_high_place',
                        speech: {
                          tr: { correct: 'Evet! Merdivenle ulaşırız.', wrong: 'Hayır, onunla ulaşamayız.' },
                          en: { correct: 'Yes! We use a ladder to reach.', wrong: "No, we can’t reach with that." }
                        },
                        questionItem: meta(611, 'yüksek raf'),
                        options: [
                          { id: 143, word: 'merdiven', spokenText: 'merdiven', imageUrl: '/images/143.png', isCorrect: true, audioKey: 'merdiven' },
                          { id: 96, word: 'sandalye', spokenText: 'sandalye', imageUrl: '/images/96.png', isCorrect: false, audioKey: 'sandalye' },
                          { id: 134, word: 'masa', spokenText: 'masa', imageUrl: '/images/134.png', isCorrect: false, audioKey: 'masa' },
                        ],
                      },
                      {
                        id: 398,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Denizde nasıl seyahat ederiz?',
                        questionAudioKey: 'q_how_travel_at_sea',
                        speech: {
                          tr: { correct: 'Doğru! Denizde gemiyle seyahat ederiz.', wrong: 'Hayır, denizde genelde onunla gitmeyiz.' },
                          en: { correct: 'Correct! We travel by ship at sea.', wrong: "No, we don’t usually travel by that at sea." }
                        },
                        questionItem: meta(225, 'deniz'),
                        options: [
                          { id: 492, word: 'gemi', spokenText: 'gemi', imageUrl: '/images/492.png', isCorrect: true, audioKey: 'gemi' },
                          { id: 1, word: 'araba', spokenText: 'araba', imageUrl: '/images/1.png', isCorrect: false, audioKey: 'araba' },
                          { id: 110, word: 'bisiklet', spokenText: 'bisiklet', imageUrl: '/images/110.png', isCorrect: false, audioKey: 'bisiklet' },
                        ],
                      },
                      {
                        id: 399,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Odayı nasıl temizleriz?',
                        questionAudioKey: 'q_how_clean_room',
                        speech: {
                          tr: { correct: 'Evet! Odayı temizlik kovası ve malzemeleriyle temizleriz.', wrong: 'Hayır, odayı onunla temizlemeyiz.' },
                          en: { correct: 'Yes! We clean the room with a cleaning bucket and supplies.', wrong: "No, we don’t clean the room with that." }
                        },
                        questionItem: meta(229, 'dağınık oda'),
                        options: [
                          { id: 797, word: 'temizlik kovası', spokenText: 'temizlik kovası', imageUrl: '/images/797.png', isCorrect: true, audioKey: 'temizlik_kovasi' },
                          { id: 804, word: 'cips', spokenText: 'cips', imageUrl: '/images/804.png', isCorrect: false, audioKey: 'cips' },
                          { id: 137, word: 'yastık', spokenText: 'yastık', imageUrl: '/images/137.png', isCorrect: false, audioKey: 'yastik' },
                        ],
                      },
                      {
                        id: 400,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Ellerimizi yıkadıktan sonra nasıl kurularız?',
                        questionAudioKey: 'q_how_dry_hands_after_washing',
                        speech: {
                          tr: { correct: 'Evet! Havluyla kurularız.', wrong: 'Hayır, eller havluyla kurulanır.' },
                          en: { correct: 'Yes! We dry them with a towel.', wrong: 'No, we dry hands with a towel.' }
                        },
                        questionItem: meta(820, 'el yıkamak'),
                        options: [
                          { id: 523, word: 'havlu', spokenText: 'havlu', imageUrl: '/images/523.png', isCorrect: true, audioKey: 'havlu' },
                          { id: 126, word: 'çatal', spokenText: 'çatal', imageUrl: '/images/126.png', isCorrect: false, audioKey: 'catal' },
                          { id: 37, word: 'kitap', spokenText: 'kitap', imageUrl: '/images/37.png', isCorrect: false, audioKey: 'kitap' },
                        ],
                      },
                      {
                        id: 401,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Bu çocuk kendini nasıl hissediyor?',
                        questionAudioKey: 'q_how_child_feels',
                        speech: {
                          tr: { correct: 'Doğru! Çocuk mutlu.', wrong: 'Hayır, çocuk öyle hissetmiyor.' },
                          en: { correct: 'Correct! The child feels happy.', wrong: "No, the child doesn’t feel that way." }
                        },
                        questionItem: meta(500, 'gülen çocuk'),
                        options: [
                          { id: 500, word: 'mutlu', spokenText: 'mutlu', imageUrl: '/images/500.png', isCorrect: true, audioKey: 'mutlu' },
                          { id: 501, word: 'üzgün', spokenText: 'üzgün', imageUrl: '/images/501.png', isCorrect: false, audioKey: 'uzgun' },
                          { id: 502, word: 'kızgın', spokenText: 'kızgın', imageUrl: '/images/502.png', isCorrect: false, audioKey: 'kizgin' },
                        ],
                      },
                      {
                        id: 402,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Makarnayı nasıl yeriz?',
                        questionAudioKey: 'q_how_eat_pasta',
                        speech: {
                          tr: { correct: 'Evet! Makarnayı çatalla yeriz.', wrong: 'Hayır, onunla yemeyiz.' },
                          en: { correct: 'Yes! We eat pasta with a fork.', wrong: "No, we don't eat with that." }
                        },
                        questionItem: meta(267, 'makarna'),
                        options: [
                          { id: 126, word: 'çatal', spokenText: 'çatal', imageUrl: '/images/126.png', isCorrect: true, audioKey: 'catal' },
                          { id: 144, word: 'makas', spokenText: 'makas', imageUrl: '/images/144.png', isCorrect: false, audioKey: 'makas' },
                          { id: 856, word: 'tarak', spokenText: 'tarak', imageUrl: '/images/856.png', isCorrect: false, audioKey: 'tarak' },
                        ],
                      },
                      {
                        id: 403,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Saçımızı nasıl tararız?',
                        questionAudioKey: 'q_how_comb_hair',
                        speech: {
                          tr: { correct: 'Evet! Saçımızı tarakla tararız.', wrong: 'Hayır, onunla taramayız.' },
                          en: { correct: 'Yes! We comb our hair with a comb.', wrong: "No, we don't comb with that." }
                        },
                        questionItem: meta(663, 'dağınık saç'),
                        options: [
                          { id: 856, word: 'tarak', spokenText: 'tarak', imageUrl: '/images/856.png', isCorrect: true, audioKey: 'tarak' },
                          { id: 441, word: 'diş fırçası', spokenText: 'diş fırçası', imageUrl: '/images/441.png', isCorrect: false, audioKey: 'dis_fircasi' },
                          { id: 125, word: 'kaşık', spokenText: 'kaşık', imageUrl: '/images/125.png', isCorrect: false, audioKey: 'kasik' },
                        ],
                      },
                      {
                        id: 404,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Kağıdı nasıl keseriz?',
                        questionAudioKey: 'q_how_cut_paper',
                        speech: {
                          tr: { correct: 'Evet! Kağıdı makasla keseriz.', wrong: 'Hayır, onunla kesmeyiz.' },
                          en: { correct: 'Yes! We cut paper with scissors.', wrong: "No, we don't cut with that." }
                        },
                        questionItem: meta(642, 'kağıt'),
                        options: [
                          { id: 144, word: 'makas', spokenText: 'makas', imageUrl: '/images/144.png', isCorrect: true, audioKey: 'makas' },
                          { id: 121, word: 'kalem', spokenText: 'kalem', imageUrl: '/images/121.png', isCorrect: false, audioKey: 'kalem' },
                          { id: 149, word: 'cetvel', spokenText: 'cetvel', imageUrl: '/images/149.png', isCorrect: false, audioKey: 'cetvel' },
                        ],
                      },
                      {
                        id: 405,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Boyumuzu nasıl ölçeriz?',
                        questionAudioKey: 'q_how_measure_height',
                        speech: {
                          tr: { correct: 'Evet! Boyumuzu cetvelle ölçeriz.', wrong: 'Hayır, onunla ölçmeyiz.' },
                          en: { correct: 'Yes! We measure our height with a ruler.', wrong: "No, we don't measure with that." }
                        },
                        questionItem: meta(771, 'tırmanan çocuk'),
                        options: [
                          { id: 149, word: 'cetvel', spokenText: 'cetvel', imageUrl: '/images/149.png', isCorrect: true, audioKey: 'cetvel' },
                          { id: 496, word: 'çekiç', spokenText: 'çekiç', imageUrl: '/images/496.png', isCorrect: false, audioKey: 'cekic' },
                          { id: 156, word: 'top', spokenText: 'top', imageUrl: '/images/156.png', isCorrect: false, audioKey: 'top' },
                        ],
                      },
                      {
                        id: 406,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Uzaktaki biriyle nasıl konuşuruz?',
                        questionAudioKey: 'q_how_talk_to_someone_far_away',
                        speech: {
                          tr: { correct: 'Evet! Akıllı telefonla konuşuruz.', wrong: 'Hayır, onunla konuşmayız.' },
                          en: { correct: 'Yes! We talk on a smartphone.', wrong: "No, we don't talk with that." }
                        },
                        questionItem: meta(175, 'uzaktaki ev'),
                        options: [
                          { id: 464, word: 'akıllı telefon', spokenText: 'akıllı telefon', imageUrl: '/images/464.png', isCorrect: true, audioKey: 'akilli_telefon' },
                          { id: 37, word: 'kitap', spokenText: 'kitap', imageUrl: '/images/37.png', isCorrect: false, audioKey: 'kitap' },
                          { id: 600, word: 'mektup', spokenText: 'mektup', imageUrl: '/images/600.png', isCorrect: false, audioKey: 'mektup' },
                        ],
                      },
                      {
                        id: 407,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Karanlık bir odayı nasıl aydınlatırız?',
                        questionAudioKey: 'q_how_light_a_dark_room',
                        speech: {
                          tr: { correct: 'Evet! Lambayla aydınlatırız.', wrong: 'Hayır, onunla aydınlatmayız.' },
                          en: { correct: 'Yes! We light it with a lamp.', wrong: "No, we don't light it with that." }
                        },
                        questionItem: meta(608, 'karanlık oda'),
                        options: [
                          { id: 575, word: 'lamba', spokenText: 'lamba', imageUrl: '/images/575.png', isCorrect: true, audioKey: 'lamba' },
                          { id: 598, word: 'perde', spokenText: 'perde', imageUrl: '/images/598.png', isCorrect: false, audioKey: 'perde' },
                          { id: 686, word: 'güneş gözlüğü', spokenText: 'güneş gözlüğü', imageUrl: '/images/686.png', isCorrect: false, audioKey: 'gunes_gozlugu' },
                        ],
                      },
                      {
                        id: 408,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Yiyecekleri nasıl pişiririz?',
                        questionAudioKey: 'q_how_cook_food',
                        speech: {
                          tr: { correct: 'Evet! Fırında pişiririz.', wrong: 'Hayır, onda pişirmeyiz.' },
                          en: { correct: 'Yes! We cook it in the oven.', wrong: "No, we don't cook it in that." }
                        },
                        questionItem: meta(788, 'çiğ tavuk'),
                        options: [
                          { id: 302, word: 'fırın', spokenText: 'fırın', imageUrl: '/images/302.png', isCorrect: true, audioKey: 'firin' },
                          { id: 251, word: 'buzdolabı', spokenText: 'buzdolabı', imageUrl: '/images/251.png', isCorrect: false, audioKey: 'buzdolabi' },
                          { id: 301, word: 'bulaşık makinesi', spokenText: 'bulaşık makinesi', imageUrl: '/images/301.png', isCorrect: false, audioKey: 'bulasik_makinesi' },
                        ],
                      },
                      {
                        id: 409,
                        activityType: ActivityType.FiveWOneH,
                        question: 'Tavşan nasıl hareket eder?',
                        questionAudioKey: 'q_how_rabbit_moves',
                        speech: {
                          tr: { correct: 'Evet! Tavşan hızlı hareket eder.', wrong: 'Hayır, öyle hareket etmez.' },
                          en: { correct: 'Yes! The rabbit moves fast.', wrong: 'No, it doesn’t move like that.' }
                        },
                        questionItem: meta(41, 'tavşan'),
                        options: [
                          { id: 145, word: 'hızlı', spokenText: 'hızlı', imageUrl: '/images/145.png', isCorrect: true, audioKey: 'hizli' },
                          { id: 42, word: 'yavaş', spokenText: 'yavaş', imageUrl: '/images/42.png', isCorrect: false, audioKey: 'yavas' },
                          { id: 785, word: 'uykulu', spokenText: 'uykulu', imageUrl: '/images/785.png', isCorrect: false, audioKey: 'uykulu' },
                        ],
                      },
                    ];
                    