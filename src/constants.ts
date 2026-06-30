import { ActivityType, Achievement, ActivityCategory, SubAchievement } from './types.ts';
import BookOpenIcon from './components/icons/BookOpenIcon.tsx';
import LightBulbIcon from './components/icons/LightBulbIcon.tsx';
import BrainIcon from './components/icons/BrainIcon.tsx';
import ObjectsIcon from './components/icons/ObjectsIcon.tsx';
import HandIcon from './components/icons/HandIcon.tsx';
import FiveWOneHIcon from './components/icons/FiveWOneHIcon.tsx';


export const LETTER_SOUND_ACTIVITIES = [
    ActivityType.Syllabification, 
    ActivityType.FindTheLetterInGrid, 
    ActivityType.FindTheSoundInImage, 
    ActivityType.EmbeddedStory, 
    ActivityType.SoundPresence, 
    ActivityType.FindTheLetter,
];

export const CONCEPT_ACTIVITIES = [
    ActivityType.YesNo, 
    ActivityType.Colors, 
    ActivityType.Shapes, 
    ActivityType.Emotions,
    ActivityType.BigSmall, 
    ActivityType.LongShort, 
    ActivityType.ThinThick, 
    ActivityType.WideNarrow, 
    ActivityType.OldNew, 
    ActivityType.HardSoft,
    ActivityType.CleanDirty,
    ActivityType.WetDry,
    ActivityType.OpenClosed,
    ActivityType.StraightCurved,
    ActivityType.NoisyQuiet,
    ActivityType.AliveLifeless,
    ActivityType.BitterSweet,
    ActivityType.HeavyLight,
    ActivityType.HotCold,
    ActivityType.RoughSmooth,
    ActivityType.BrokenIntact,
    ActivityType.MessyClean,
    ActivityType.TazeBayat,
    ActivityType.KirisikDuzgun,
    ActivityType.SivriKut,
    ActivityType.ParlakMat,
    ActivityType.TembelCaliskan,
    ActivityType.SeffafOpak,
    ActivityType.DikenliPuruzsuz,
    ActivityType.DerinSig,
    ActivityType.KalabalikTenha,
    ActivityType.DugumCozuk,
    ActivityType.HungryFull,
    ActivityType.YoungOld,
    ActivityType.TersDuz,
    ActivityType.FewMuch, 
    ActivityType.HalfQuarterWhole,
    ActivityType.FullEmpty,
    ActivityType.OddEven,
    ActivityType.CountMatch,
    ActivityType.OnUnder, 
    ActivityType.BelowAbove, 
    ActivityType.BesideOpposite, 
    ActivityType.InFrontOfBehind, 
    ActivityType.InsideOutside, 
    ActivityType.Between, 
    ActivityType.LeftRight,
    ActivityType.NearFar,
    ActivityType.HighLow,
    ActivityType.BeforeAfter, 
    ActivityType.DayNight, 
    ActivityType.FastSlow,
    ActivityType.NowNextLater,
    ActivityType.YesterdayTodayTomorrow,
    ActivityType.Senses,
    // Future concepts
    ActivityType.AnimalSounds,
    ActivityType.AnimalHomes,
    ActivityType.Professions,
    ActivityType.ClockLearning,
];

export const REASONING_ACTIVITIES = [
    ActivityType.WhatDoesntBelong, 
    ActivityType.SequencingStories,
    ActivityType.PatternCompletion, 
    ActivityType.Sudoku, 
    ActivityType.MemoryCards,
    ActivityType.DragAndDropCounting,
    ActivityType.DragAndDropPositioning,
    ActivityType.Hangman,              // EĞLENCE: Adam Asmaca - Harf seçerek kelimeyi bul
    ActivityType.ObjectCollector,      // EĞLENCE: Nesne Toplama - Düşen objeleri sepete topla
];

export const OBJECT_RECOGNITION_ACTIVITIES = [ActivityType.ObjectRecognition];

// Ana Görsel Seçimi - Her nesne için belirlenen ana görsel ID'leri
export const MAIN_IMAGE_IDS: Record<string, number> = {
  // Temel Nesneler (Ana Listeden)
  'araba': 1,
  'bardak': 124,
  'kitap': 37,
  'ağaç': 10,
  'tişört': 13,
  'kedi': 16,
  'masa': 134,
  'sandalye': 319,
  'pantolon': 79,
  'ayakkabı': 59,
  'pencere': 82,
  'kapı': 39,
  'top': 156,
  'kutu': 5,
  'kalem': 121,
  'fırça': 539,
  'saksı': 432,
  'yastık': 137,
  'merdiven': 143,
  'gömlek': 255,
  'çorap': 147,
  'sepet': 449,
  'ev': 533,
  'roket': 204, // PNG versiyonu
  'robot': 177,
  'saat': 118,
  'halı': 439,
  'sandalet': 848,
  'elbise_dolabı': 339,
  'yatak': 606,
  'gözlük': 93,
  'mum': 540,
  'havlu': 523,
  'kurdele': 517,
  'şişe': 814,
  'zarf': 600,
  'musluk': 304,
  'hazine_sandığı': 201,
  'gemi': 621,
  'bisiklet': 110,
  'pizza': 23,
  'vazo': 34,
  'köpek': 47,
  'dondurma': 63,
  'havuç': 98,
  'aslan': 100,
  'tren': 106,
  'yumurta': 113,
  'tabak': 153,
  'şemsiye': 158,
  'portakal': 115,
  'kitaplık': 287,
  'kavanoz': 447,
  'paten': 382,
  'limon': 703,
  'armut': 365
};

export const OBJECT_CATEGORIES = [
  // Canonical categories (ordered as specified by the user)
  { id: 'meyveler', title: 'Meyveler', imageId: 24, disabled: false },
  { id: 'sebzeler', title: 'Sebzeler', imageId: 98, disabled: false },
  { id: 'icecekler', title: 'İçecekler', imageId: 801, disabled: false },
  { id: 'diger_yiyecekler', title: 'Diğer Yiyecekler', imageId: 23, disabled: false },
  { id: 'ev_esyalari', title: 'Ev Eşyaları', imageId: 134, disabled: false },
  { id: 'oyuncaklar', title: 'Oyuncaklar', imageId: 156, disabled: false },
  { id: 'giysiler_aksesuarlar', title: 'Giysiler & Aksesuarlar', imageId: 31, disabled: false },
  { id: 'mutfak_gerecleri', title: 'Mutfak Gereçleri', imageId: 124, disabled: false },
  { id: 'tasitlar', title: 'Taşıtlar', imageId: 1, disabled: false },
  { id: 'hayvanlar', title: 'Hayvanlar', imageId: 16, disabled: false },
  { id: 'aile_uyeleri', title: 'Aile Üyeleri', imageId: 711, disabled: false },
  { id: 'bitkiler', title: 'Bitkiler', imageId: 10, disabled: false },
  { id: 'okul_ofis_gerecleri', title: 'Okul & Ofis Gereçleri', imageId: 36, disabled: false },
  // NOTE: this ID was updated to match normalized category ids used across imageData and i18n
  { id: 'vucudun_bolumleri', title: 'Vücudun Bölümleri', imageId: 285, disabled: false },
  { id: 'meslekler', title: 'Meslekler', imageId: 324, disabled: false },
  { id: 'mekanlar_odalar', title: 'Mekanlar & Odalar', imageId: 505, disabled: false },
  { id: 'dogal_yapilar_uzay', title: 'Doğal Yapılar & Uzay', imageId: 195, disabled: false },
  // { id: 'ev_insaat', title: 'Ev & Yapı İnşaat Aşamaları', imageId: 999, disabled: true }, // removed per user note
  { id: 'aletler', title: 'Aletler', imageId: 539, disabled: false },
  { id: 'muzik_aletleri', title: 'Müzik Aletleri', imageId: 180, disabled: false },
];

// Canonical order for object categories used by the Intl/EN curated view.
// Keep this derived from OBJECT_CATEGORIES so it stays in sync if categories change.
export const OBJECTS_INTL_ORDER: string[] = OBJECT_CATEGORIES.flatMap(c => {
  const subs = (c as any).subcategories || [];
  return [c.id, ...subs.map((s: any) => s.id)];
});

export const LETTER_GROUPS = [
  { name: '1. Grup', letters: 'ANETİL'.split('') },
  { name: '2. Grup', letters: 'OKURİM'.split('') },
  { name: '3. Grup', letters: 'ÜSÖYDZ'.split('') },
  { name: '4. Grup', letters: 'ÇBGCŞ'.split('') },
  { name: '5. Grup', letters: 'PHVĞFJ'.split('') },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: ActivityCategory.LetterSound,
    name: 'Harf ve Sesler',
    icon: BookOpenIcon,
    color: 'sky',
  },
  {
    id: ActivityCategory.Objects,
    name: 'Nesneleri Tanıyalım',
    icon: ObjectsIcon,
    color: 'amber',
  },
  {
    id: ActivityCategory.Concept,
    name: 'Kavramları Öğrenelim',
    icon: LightBulbIcon,
    color: 'teal',
  },
  {
    id: ActivityCategory.Reasoning,
    name: 'Akıl Oyunları',
    icon: BrainIcon,
    color: 'indigo',
  },
  {
    id: ActivityCategory.FiveWOneH,
    name: '5N1K',
    icon: FiveWOneHIcon,
    color: 'emerald',
  },
  {
    id: ActivityCategory.FineMotor,
    name: 'İnce Motor',
    icon: HandIcon,
    color: 'pink',
  },
  {
    id: ActivityCategory.RelativeComparison,
    name: 'Göreceli Karşılaştırma',
    icon: LightBulbIcon, // Use same icon for now
    color: 'purple',
  },
];

// New list for all sub-achievements for detailed tracking
export const ALL_SUB_ACHIEVEMENTS: SubAchievement[] = [
  // Letter Sound Activities
  { id: ActivityType.Syllabification, name: "Heceleme", category: ActivityCategory.LetterSound },
  { id: ActivityType.FindTheLetterInGrid, name: "Harf Tablosu", category: ActivityCategory.LetterSound },
  { id: ActivityType.FindTheSoundInImage, name: "Görselde Sesi Bul", category: ActivityCategory.LetterSound },
  { id: ActivityType.EmbeddedStory, name: "Hikaye Zamanı", category: ActivityCategory.LetterSound },
  { id: ActivityType.SoundPresence, name: "Seste Harf Var mı?", category: ActivityCategory.LetterSound },
  { id: ActivityType.FindTheLetter, name: "Harf Bulma", category: ActivityCategory.LetterSound },
  
  // Object Recognition Activities (dynamically created from OBJECT_CATEGORIES)
  ...OBJECT_CATEGORIES.map(cat => ({
    id: cat.id,
    name: cat.title,
    category: ActivityCategory.Objects,
  })),

  // Concept Activities
  { id: ActivityType.YesNo, name: "Evet / Hayır", category: ActivityCategory.Concept },
  { id: ActivityType.Colors, name: "Renkler", category: ActivityCategory.Concept },
  { id: ActivityType.Shapes, name: "Şekiller", category: ActivityCategory.Concept },
  { id: ActivityType.Emotions, name: "Duygular", category: ActivityCategory.Concept },
  { id: ActivityType.BigSmall, name: "Büyük / Küçük", category: ActivityCategory.Concept },
  { id: ActivityType.LongShort, name: "Uzun / Kısa", category: ActivityCategory.Concept },
  { id: ActivityType.ThinThick, name: "İnce / Kalın", category: ActivityCategory.Concept },
  { id: ActivityType.WideNarrow, name: "Geniş / Dar", category: ActivityCategory.Concept },
  { id: ActivityType.OldNew, name: "Eski / Yeni", category: ActivityCategory.Concept },
  { id: ActivityType.HardSoft, name: "Sert / Yumuşak", category: ActivityCategory.Concept },
  { id: ActivityType.CleanDirty, name: "Temiz / Kirli", category: ActivityCategory.Concept },
  { id: ActivityType.WetDry, name: "Islak / Kuru", category: ActivityCategory.Concept },
  { id: ActivityType.OpenClosed, name: "Açık / Kapalı", category: ActivityCategory.Concept },
  { id: ActivityType.StraightCurved, name: "Düz / Eğri", category: ActivityCategory.Concept },
  { id: ActivityType.NoisyQuiet, name: "Gürültülü / Sessiz", category: ActivityCategory.Concept },
  { id: ActivityType.AliveLifeless, name: "Canlı / Cansız", category: ActivityCategory.Concept },
  { id: ActivityType.BitterSweet, name: "Acı / Tatlı", category: ActivityCategory.Concept },
  { id: ActivityType.HeavyLight, name: "Ağır / Hafif", category: ActivityCategory.Concept },
  { id: ActivityType.HotCold, name: "Sıcak / Soğuk", category: ActivityCategory.Concept },
  { id: ActivityType.RoughSmooth, name: "Pürüzlü / Pürüzsüz", category: ActivityCategory.Concept },
  { id: ActivityType.BrokenIntact, name: "Sağlam / Kırık", category: ActivityCategory.Concept },
  { id: ActivityType.MessyClean, name: "Dağınık / Toplu", category: ActivityCategory.Concept },
  { id: ActivityType.TazeBayat, name: "Taze / Bayat", category: ActivityCategory.Concept },
  { id: ActivityType.KirisikDuzgun, name: "Kırışık / Düzgün", category: ActivityCategory.Concept },
  { id: ActivityType.SivriKut, name: "Sivri / Küt", category: ActivityCategory.Concept },
  { id: ActivityType.ParlakMat, name: "Parlak / Mat", category: ActivityCategory.Concept },
  { id: ActivityType.TembelCaliskan, name: "Tembel / Çalışkan", category: ActivityCategory.Concept },
  { id: ActivityType.SeffafOpak, name: "Şeffaf / Opak", category: ActivityCategory.Concept },
  { id: ActivityType.DikenliPuruzsuz, name: "Dikenli / Pürüzsüz", category: ActivityCategory.Concept },
  { id: ActivityType.DerinSig, name: "Derin / Sığ", category: ActivityCategory.Concept },
  { id: ActivityType.KalabalikTenha, name: "Kalabalık / Tenha", category: ActivityCategory.Concept },
  { id: ActivityType.DugumCozuk, name: "Düğüm / Çözük", category: ActivityCategory.Concept },
  { id: ActivityType.HungryFull, name: "Aç / Tok", category: ActivityCategory.Concept },
  { id: ActivityType.YoungOld, name: "Yaşlı / Genç", category: ActivityCategory.Concept },
  { id: ActivityType.TersDuz, name: "Ters / Düz", category: ActivityCategory.Concept },
  { id: ActivityType.FewMuch, name: "Az / Çok", category: ActivityCategory.Concept },
  { id: ActivityType.HalfQuarterWhole, name: "Bütün / Yarım / Çeyrek", category: ActivityCategory.Concept },
  { id: ActivityType.FullEmpty, name: "Dolu / Boş", category: ActivityCategory.Concept },
  { id: ActivityType.OddEven, name: "Tek / Çift", category: ActivityCategory.Concept },
  { id: ActivityType.CountMatch, name: "Kaç Tane Var?", category: ActivityCategory.Concept },
  { id: ActivityType.OnUnder, name: "Üstünde / Altında", category: ActivityCategory.Concept },
  { id: ActivityType.BelowAbove, name: "Aşağıda / Yukarıda", category: ActivityCategory.Concept },
  { id: ActivityType.BesideOpposite, name: "Yanında / Karşısında", category: ActivityCategory.Concept },
  { id: ActivityType.InFrontOfBehind, name: "Önünde / Arkada", category: ActivityCategory.Concept },
  { id: ActivityType.InsideOutside, name: "İçinde / Dışında", category: ActivityCategory.Concept },
  { id: ActivityType.Between, name: "Arasında", category: ActivityCategory.Concept },
  { id: ActivityType.LeftRight, name: "Sağ / Sol", category: ActivityCategory.Concept },
  { id: ActivityType.NearFar, name: "Yakın / Uzak", category: ActivityCategory.Concept },
  { id: ActivityType.HighLow, name: "Yüksek / Alçak", category: ActivityCategory.Concept },
  { id: ActivityType.BeforeAfter, name: "Önce / Sonra", category: ActivityCategory.Concept },
  { id: ActivityType.DayNight, name: "Gündüz / Gece", category: ActivityCategory.Concept },
  { id: ActivityType.FastSlow, name: "Hızlı / Yavaş", category: ActivityCategory.Concept },
  { id: ActivityType.Senses, name: "Duyularımız", category: ActivityCategory.Concept },

  // Reasoning Activities
  { id: ActivityType.WhatDoesntBelong, name: "Hangisi Farklı?", category: ActivityCategory.Reasoning },
  { id: ActivityType.FiveWOneH, name: "5N1K", category: ActivityCategory.FiveWOneH },
  { id: ActivityType.SequencingStories, name: "Sıralama", category: ActivityCategory.Reasoning },
  { id: ActivityType.PatternCompletion, name: "Örüntü Tamamlama", category: ActivityCategory.Reasoning },
  { id: ActivityType.Sudoku, name: "Sudoku", category: ActivityCategory.Reasoning },
  { id: ActivityType.MemoryCards, name: "Hafıza Kartları", category: ActivityCategory.Reasoning },
  { id: ActivityType.DragAndDropCounting, name: "Nesneleri Taşı", category: ActivityCategory.Reasoning },
  { id: ActivityType.DragAndDropPositioning, name: "Topu Yerleştir", category: ActivityCategory.Reasoning },
  { id: ActivityType.Hangman, name: "Adam Asmaca", category: ActivityCategory.Reasoning },
  { id: ActivityType.ObjectCollector, name: "Nesne Toplama", category: ActivityCategory.Reasoning },
  { id: ActivityType.EmotionPuppet, name: "Duygu Kuklası", category: ActivityCategory.Reasoning },
  { id: ActivityType.WhoseIsThis, name: "Bu Kimin?", category: ActivityCategory.Reasoning },
  { id: ActivityType.ColorRecognition, name: "Rengi Ne?", category: ActivityCategory.Concept },
  { id: ActivityType.WhatsMissing, name: "Hangisi Kayıp?", category: ActivityCategory.Reasoning },

  // Fine motor activities (make them manageable in Activity Management)
  { id: ActivityType.LineTracing, name: "Çizgi Takip", category: ActivityCategory.FineMotor },
  { id: ActivityType.ShapeColoring, name: "Şekil Boyama", category: ActivityCategory.FineMotor },
  { id: ActivityType.RhythmFollowing, name: "Ritim Takip", category: ActivityCategory.FineMotor },
  { id: ActivityType.LetterTracing, name: "Harf Çizgi Takibi", category: ActivityCategory.FineMotor },
  { id: ActivityType.ConstrainedColoring, name: "Kısıtlı Boyama", category: ActivityCategory.FineMotor },
  // Relative Comparison activities
  { id: ActivityType.RelativeBigSmall, name: "Büyük / Küçük", category: ActivityCategory.RelativeComparison },
  { id: ActivityType.RelativeWideNarrow, name: "Geniş / Dar", category: ActivityCategory.RelativeComparison },
  { id: ActivityType.RelativeThinThick, name: "İnce / Kalın", category: ActivityCategory.RelativeComparison },
  { id: ActivityType.RelativeFewMuch, name: "Az / Çok", category: ActivityCategory.RelativeComparison },
  { id: ActivityType.RelativeLongShort, name: "Uzun / Kısa", category: ActivityCategory.RelativeComparison },
  { id: ActivityType.RelativeNearFar, name: "Yakın / Uzak", category: ActivityCategory.RelativeComparison },
  { id: ActivityType.RelativeHighLow, name: "Yüksek / Alçak", category: ActivityCategory.RelativeComparison },
  
  // 5N1K Sub-categories (for detailed tracking)
  { id: 'FiveWOneH_Who', name: '5N1K - Kim?', category: ActivityCategory.FiveWOneH },
  { id: 'FiveWOneH_What', name: '5N1K - Ne?', category: ActivityCategory.FiveWOneH },
  { id: 'FiveWOneH_Where', name: '5N1K - Nerede?', category: ActivityCategory.FiveWOneH },
  { id: 'FiveWOneH_When', name: '5N1K - Ne Zaman?', category: ActivityCategory.FiveWOneH },
  { id: 'FiveWOneH_Why', name: '5N1K - Neden?', category: ActivityCategory.FiveWOneH },
  { id: 'FiveWOneH_How', name: '5N1K - Nasıl?', category: ActivityCategory.FiveWOneH },
];

export const ACTIVITY_DEPENDENCIES: Partial<Record<ActivityType, ActivityType>> = {
    // Dimensional concepts depend on the most basic one
    [ActivityType.LongShort]: ActivityType.BigSmall,
    [ActivityType.ThinThick]: ActivityType.BigSmall,
    [ActivityType.WideNarrow]: ActivityType.BigSmall,
    [ActivityType.HeavyLight]: ActivityType.BigSmall,
    [ActivityType.DerinSig]: ActivityType.BigSmall,

    // More complex quantity concepts depend on simpler ones
    [ActivityType.HalfQuarterWhole]: ActivityType.FullEmpty,
    [ActivityType.CountMatch]: ActivityType.FewMuch,

    // More complex spatial concepts
    [ActivityType.Between]: ActivityType.OnUnder,
    [ActivityType.InFrontOfBehind]: ActivityType.OnUnder,
    [ActivityType.BesideOpposite]: ActivityType.OnUnder,

    // Reasoning
    // FunctionalMatching removed - now integrated into 5N1K "What?" category
    [ActivityType.FiveWOneH]: ActivityType.WhatDoesntBelong,
    [ActivityType.SequencingStories]: ActivityType.BeforeAfter,
    [ActivityType.PatternCompletion]: ActivityType.Shapes,
};