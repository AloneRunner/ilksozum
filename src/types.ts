import React from 'react';

export enum ScreenState {
  MainMenu,
  LetterSelection,
  GroupSelection,
  Loading,
  Playing,
  Finished,
  ConceptActivitiesMenu,
  ReasoningActivitiesMenu,
  Settings,
  PrivacyPolicy,
  Achievements,
  BannedImages,
  CommunicationMenu,
  CommunicationDetail,
  SoundImitationMenu,
  SoundImitationSadeceGorsel,
  SoundImitationUfakVideolar,
  ObjectCategoriesMenu,
  LetterActivitiesMenu,
  CommunicationSubCategory,
  ProfileSelection,
  ParentReport,
  ParentTips,
  ActivityManagement,
  PrintPreview,
  PrintPool,
  PrintSelectionDetail,
  ObjectCategoriesIntlMenu,
  FineMotorMenu,
  RelativeComparisonMenu,
  RelativeComparisonActivitiesMenu,
  ProgramIntro,
  FiveWOneHMenu,
  MiniGamesMenu,
  BalloonPopGame,
  ButterflyGardenGame,
  FireworksGame,
  ShapeMatchingGame,
  MusicTouchGame,
  SevenDifferencesGame,
  EmotionPuppetGame,
  PatternGame,
  ColorMixGame,
  SheepShearingGame,
  BubblePopGame,
  BusJamGame,
  PuzzleGame,
  FishingGame,
  RoomCleaningGame,
  FruitCollectorGame,
  TargetShootingGame,
  TrainTrackGame,
  MergeDropGame,
  NumberMergeGame,
  BalanceScaleGame,
  MazeGame,
  MemoryMatchGame,
  WorksheetCenter,
  ConceptWorksheet,
  OddOneOutGame,
  LetterBubblesGame,
  DailyRoutineGame,
  ColorSortingGame,
  ConnectDotsGame,
  CountingGame,
  ShadowMatchGame,
  SizeOrderingGame,
  NumberTargetGame,
  NumberSequenceGame,
  AnimalSoundsGame,
  PlantGrowingGame,
  WhereBelongsGame,
  SyllableTrainGame,
  RainbowGame,
  WordBoxGame,
  MissingPieceGame,
  MandalaGame,
  WhoseIsThisGame,
  ClockLearningGame,
  BasaraLessonMap,    // BASARA Yöntemi — ders haritası
  BasaraLesson,       // BASARA Yöntemi — tek ders akışı
}

export enum Tab {
  Activities,
  Communication,
  Rewards,
}

export enum ActivityType {
  // === Harf ve Ses Etkinlikleri ===
  Syllabification,
  FindTheLetterInGrid,
  FindTheSoundInImage,
  EmbeddedStory,
  SoundPresence,
  FindTheLetter,
  Hangman,              // Adam Asmaca: Harf seçerek kelimeyi bul

  // === Kavram Etkinlikleri > Ana Kategori ===
  YesNo, // Evet/Hayır is a main category now

  // === Kavram Etkinlikleri > Temel Kavramlar ===
  Colors,
  Shapes,
  Emotions,

  // === Kavram Etkinlikleri > Nitelikler (Zıt Kavramlar) ===
  NoisyQuiet,
  BigSmall,
  LongShort,
  ThinThick,
  WideNarrow,
  LineTracing,      // Çizgi Takip Etkinliği
  ShapeColoring,    // Şekil Boyama
  RhythmFollowing,  // Ritim Takip
  LetterTracing,    // Harf Çizgi Takibi
  ConstrainedColoring, // Kısıtlı Boyama

  OldNew,
  HardSoft,
  CleanDirty,
  WetDry,
  OpenClosed,
  StraightCurved,
  AliveLifeless,
  BitterSweet,
  HeavyLight,
  HotCold,
  RoughSmooth,
  BrokenIntact,
  MessyClean,
  TazeBayat,
  KirisikDuzgun,
  SivriKut,
  ParlakMat,
  TembelCaliskan,
  SeffafOpak,
  DikenliPuruzsuz,
  DerinSig,
  KalabalikTenha,
  DugumCozuk,
  HungryFull,
  YoungOld,
  TersDuz,
  ClockLearning,

  // === Kavram Etkinlikleri > Miktar & Sayılar ===
  FewMuch,
  HalfQuarterWhole,
  FullEmpty,
  OddEven,
  CountMatch,

  // === Kavram Etkinlikleri > Konum Kavramları ===
  OnUnder,
  BelowAbove,
  BesideOpposite,
  InFrontOfBehind,
  InsideOutside,
  Between,
  LeftRight,
  NearFar,
  HighLow,

  // === Göreceli Karşılaştırma Etkinlikleri (Experimental) ===
  RelativeBigSmall,
  RelativeWideNarrow,
  RelativeThinThick,
  RelativeFewMuch,
  RelativeLongShort,
  RelativeNearFar,
  RelativeHighLow,

  // === Kavram Etkinlikleri > Zaman Kavramları ===
  BeforeAfter,
  DayNight,
  FastSlow,
  NowNextLater, // Önce/Şimdi/Sonra (YAKINDA)
  YesterdayTodayTomorrow, // Dün/Bugün/Yarın (YAKINDA)

  // === Kavram Etkinlikleri > Duyular ===
  Senses, // YENİ EKLENDİ

  // === YAKINDA GELECEK DİĞER KAVRAMLAR ===
  AnimalSounds,
  AnimalHomes,
  Professions,

  // === Akıl Yürütme Etkinlikleri ===
  WhatDoesntBelong,
  FunctionalMatching,
  CauseEffect,
  SequencingStories,
  PatternCompletion,
  Sudoku,
  MemoryCards,
  DragAndDropCounting,
  DragAndDropPositioning,
  ObjectRecognition,
  ObjectCollector,      // Nesne Toplama Oyunu: Düşen objeleri sepete toplama
  EmotionPuppet,        // Duygu Kuklası: Yüz parçalarını birleştirerek duygu oluşturma
  // === 5N1K (Who/What/Where/When/Why/How) ===
  FiveWOneH,
  WhoseIsThis,          // Bu Kimin? (Aidiyet ve Sahiplik yönlü eşleştirme)
  ColorRecognition,     // Rengi Ne? (Nesnenin rengini bul)
  WhatsMissing,         // Hangisi Kayıp? (Göster-gizle hafıza etkinliği)
  Basara,               // BASARA Yöntemi — TR'ye özel rehberli okuma kulvarı (en sonda: enum değerlerini kaydırmamak için)
  Basara2,              // BASARA 2 (Klasik) — yaygın/eski a-serisi sürümü (ayrı kulvar)
}

export enum ActivityCategory {
  LetterSound = 'LetterSound',
  Concept = 'Concept',
  Reasoning = 'Reasoning',
  Objects = 'Objects', // New category for achievements
  FineMotor = 'FineMotor', // Fine motor skills category
  RelativeComparison = 'RelativeComparison', // Experimental relative comparison
  FiveWOneH = 'FiveWOneH', // 5N1K (Who/What/Where/When/Why/How)
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
}

export interface AttemptRecord {
  timestamp: number;
  score: number;
  total: number;
  mode?: 'program' | 'free';
}

export interface ActivityStats {
  attempts: number;
  completions: number;
  totalCorrect?: number;
  totalQuestions?: number;
  history?: AttemptRecord[];
}

export interface Achievement {
  id: ActivityCategory;
  name: string;
  icon: React.FC<{ className?: string }>;
  color: string;
}

// New interface for detailed sub-achievements
export interface SubAchievement {
  id: ActivityType | string; // Use ActivityType enum as ID where possible, string for object categories
  name: string;
  category: ActivityCategory;
}


export interface Word {
  id: number;
  word: string;
  imageUrl: string;
  audioKeys: {
    default: string;
    [key: string]: string;
  };
  hasLetter?: boolean;
  syllables?: string[];
  distractorSyllables?: string[]; // Added for the syllabification game
  options?: Word[];
  // For concept learning (Yes/No)
  questionText?: string;
  questionAudioKey?: string;
  isCorrectAnswer?: boolean;
  activityType?: ActivityType;
}

export interface Story {
  id: number;
  title: string;
  story: string;
}

export interface ConceptOption {
  id: number;
  word: string;
  audioKey: string;
  spokenText?: string;
  imageUrl: string;
  imageScale?: number; // Used for relative big/small where the same image is sized differently
  disableRealistic?: boolean;
  isCorrect: boolean;
}


export interface ConceptRound {
  id: number;
  question: string;
  questionAudioKey: string;
  options: ConceptOption[];
  activityType: ActivityType; // Pass activity type for context
  questionItem?: ImageMetadata; // For games like FunctionalMatching
  // Optional, child-friendly label for the shared group of the wrong options in Odd One Out rounds (TR-first)
  // Example: 'meyveler', 'hayvanlar', 'taşıtlar', 'mutfak gereçleri'
  othersGroupLabel?: string;
  // Optional per-round speech overrides, localized by language code (e.g., 'tr', 'en').
  // Supports simple templating with tokens: {item}, {category}, {others}, {correctCategory}.
  // - {item}: localized selected item's name
  // - {category}: localized singular category for the selected item
  // - {others}: localized singular category for the group of the other items (Odd One Out)
  // - {correctCategory}: localized singular category for the correct item (if different from {category})
  speech?: {
    [locale: string]: {
      question?: string;   // Optional TTS text for the question
      correct?: string;    // TTS to speak when the user selects the correct option
      wrong?: string;      // TTS to speak when the user selects a wrong option
    }
  };
}

// === Sudoku Game Types ===
export interface SudokuItem {
  id: number;
  word: string;
  imageUrl: string;
}
export interface SudokuRound {
  id: number;
  questionText: string;
  questionAudioKey: string;
  solutionGrid: SudokuItem[]; // 3x3 = 9 items
  puzzleGrid: (SudokuItem | null)[]; // 3x3 = 9 items
  itemPool: SudokuItem[];
  activityType?: ActivityType;
}


// === Memory Cards Game Types (Hafıza Kartları) ===
export interface MemoryCard {
  id: number;
  word: string;
  imageUrl: string;
  audioKey: string;
}

export interface MemoryGameRound {
  id: number;
  boardCards: MemoryCard[];
  activityType?: ActivityType;
}


// === Pattern Completion Game Types ===
export interface PatternItem {
  id: number;
  word: string;
  imageUrl: string;
}

export interface PatternRound {
  id: number;
  question: string;
  questionAudioKey: string;
  pattern: PatternItem[];
  options: PatternItem[];
  answer: PatternItem;
  activityType?: ActivityType;
}

// === Sequencing Stories Game Types ===
export interface SequencingStoryItem {
  id: number;
  word: string;
  imageUrl: string;
  audioKey: string;
}

export interface SequencingStoryRound {
  id: number;
  question: string;
  questionAudioKey: string;
  items: SequencingStoryItem[]; // Correct order
  activityType?: ActivityType;
}

// === Number Sequencing ===
// NumberSequencing intentionally removed

// === Drag and Drop Counting Game Types ===
export interface DragAndDropCountingRound {
  id: number;
  question: string;
  questionAudioKey: string;
  itemToDrag: ImageMetadata;
  targetCount: number;
  activityType?: ActivityType;
}

// === Drag and Drop Positioning Game Types ===
export interface DragAndDropPositioningRound {
  id: number;
  question: string;
  questionAudioKey: string;
  itemToDrag: ImageMetadata;
  correctZone: 'üstünde' | 'altında' | 'içinde' | 'solunda' | 'sağında';
  activityType?: ActivityType;
}


// === NEW UNIFIED METADATA TYPE ===
export interface ImageMetadata {
  id: number;
  word: string;
  imageUrl: string;
  pairGroupId?: string | string[];
  audioKeys: {
    default: string;
    [key: string]: string;
  };
  tags: {
    category: string;
    concept?: string | string[];
    size?: ('büyük' | 'küçük' | 'uzun' | 'kısa') | ('büyük' | 'küçük' | 'uzun' | 'kısa')[];
    length?: 'uzun' | 'kısa';
    thickness?: 'ince' | 'kalın';
    width?: 'dar' | 'geniş';
    condition?: 'eski' | 'yeni';
    texture?: ('sert' | 'yumuşak' | 'pürüzlü' | 'pürüzsüz' | 'dikenli' | 'parlak' | 'mat') | ('sert' | 'yumuşak' | 'pürüzlü' | 'pürüzsüz' | 'dikenli' | 'parlak' | 'mat')[];
    position?: ('üstünde' | 'altında' | 'aşağıda' | 'yukarıda' | 'önünde' | 'arkasında' | 'içinde' | 'dışında' | 'arasında' | 'yanında' | 'karşısında' | 'üst üste' | 'yan yana' | 'sağında' | 'solunda') | ('üstünde' | 'altında' | 'aşağıda' | 'yukarıda' | 'önünde' | 'arkasında' | 'içinde' | 'dışında' | 'arasında' | 'yanında' | 'karşısında' | 'üst üste' | 'yan yana' | 'sağında' | 'solunda')[];
    time?: 'gündüz' | 'gece' | 'sabah' | 'öğle' | 'akşam';
    speed?: 'hızlı' | 'yavaş';
    quality?: ('güzel' | 'solgun' | 'taze' | 'çürük' | 'temiz' | 'kirli' | 'sağlam' | 'kırık' | 'bayat' | 'kırışık' | 'düzgün' | 'sivri' | 'küt' | 'tembel' | 'çalışkan' | 'şeffaf' | 'opak' | 'ters') | ('güzel' | 'solgun' | 'taze' | 'çürük' | 'temiz' | 'kirli' | 'sağlam' | 'kırık' | 'bayat' | 'kırışık' | 'düzgün' | 'sivri' | 'küt' | 'tembel' | 'çalışkan' | 'şeffaf' | 'opak' | 'ters')[];
    emotion?: 'mutlu' | 'üzgün' | 'kızgın' | 'şaşkın' | 'korkmuş' | 'hasta' | 'yorgun' | 'uykulu' | 'heyecanlı' | 'rahat' | 'sakin' | 'gururlu' | 'neşeli' | 'utanmış' | 'sıkılmış' | 'sevgi dolu';
    quantity?: 'az' | 'çok';
    fraction?: 'bütün' | 'yarım' | 'çeyrek';
    fullness?: 'boş' | 'dolu';
    direction?: 'sol' | 'sağ';
    color?: string | string[];
    shape?: ('daire' | 'kare' | 'üçgen' | 'dikdörtgen' | 'yıldız' | 'düz' | 'eğri' | 'oval') | ('daire' | 'kare' | 'üçgen' | 'dikdörtgen' | 'yıldız' | 'düz' | 'eğri' | 'oval')[];
    form?: 'düz' | 'eğri';
    state?: ('ıslak' | 'kuru' | 'açık' | 'kapalı' | 'önce' | 'sonra' | 'düğüm' | 'çözük' | 'dağınık' | 'toplu' | 'uyanık' | 'uykulu' | 'aç' | 'tok') | ('ıslak' | 'kuru' | 'açık' | 'kapalı' | 'önce' | 'sonra' | 'aç' | 'tok' | 'düğüm' | 'çözük' | 'dağınık' | 'toplu' | 'uyanık' | 'uykulu')[];
    temperature?: 'sıcak' | 'soğuk';
    letters?: string[];
    syllables?: string[];
    sense?: 'tat' | 'koku' | 'ses' | 'görme' | 'dokunma';
    taste?: 'ekşi' | 'tatlı' | 'acı';
    smell?: 'güzel' | 'kötü';
    sound?: 'gürültülü' | 'melodik' | 'sessiz';
    pattern?: string;
    weight?: 'ağır' | 'hafif';
    quantity_type?: 'tek' | 'çift';
    height?: 'yüksek' | 'alçak';
    density?: 'kalabalik' | 'tenha';
    depth?: 'derin' | 'sığ';
    distance?: 'yakın' | 'uzak';
    relation?: 'aynı' | 'farklı';
    profession?: string;
    lifeform?: 'canlı' | 'cansız';
    age?: 'genç' | 'yaşlı';
    functionalPair?: string;
    causeEffectPair?: { id: string; role: 'cause' | 'effect' };
    sequence?: { group: string; order: number };
    count?: number;
    /** Optional difficulty/level for activities like sound imitation; small integer (1..4). */
    level?: number;
    note?: string;
    missingImage?: boolean;
  }
}

// === Communication Card Types ===
export interface CommunicationCard {
  id: string;
  text: string;
  icon?: React.FC<{ className?: string }>; // Optional icon for abstract cards
  imageId?: number; // Optional imageId for cards with real images
  audioKey: string;
  categoryColor?: string;
}

export interface CommunicationSubCategory {
  id: string;
  title: string;
  imageId?: number; // A representative image for the subcategory
  cards: CommunicationCard[];
}

export interface CommunicationCategory {
  id: string;
  title: string;
  icon: React.FC<{ className?: string }>;
  color: string;
  cards?: CommunicationCard[];
  subCategories?: CommunicationSubCategory[];
  isUnderDevelopment?: boolean;
}


// === Data structure types for staticData.ts ===
export type StoryData = {
  [key: string]: Story[];
};

// === UNIT-BASED PROGRAM MODE TYPES ===

/**
 * Mastery pool type determines which mastery rule applies to an activity
 * WIDE: Activities with many questions (>20), require 80% success in last 15 attempts
 * NARROW: Activities with few questions (3-5), require 100% in last 2 perfect sessions
 */
export enum MasteryPoolType {
  WIDE = 'WIDE',
  NARROW = 'NARROW'
}

/**
 * Mastery rule configuration for an activity
 */
export interface MasteryRule {
  poolType: MasteryPoolType;
  /** For WIDE pool: minimum success rate (0.8 = 80%) in last N attempts */
  masteryThreshold?: number;
  /** For WIDE pool: number of recent attempts to consider (default: 15) */
  recentAttemptsWindow?: number;
  /** For NARROW pool: number of consecutive perfect sessions required (default: 2) */
  perfectSessionsRequired?: number;
}

/**
 * Prerequisite rule for unlocking an activity
 * Can be a single activity ID or a complex expression with AND/OR logic
 */
export type PrerequisiteRule =
  | ActivityType
  | string // For object category names like "hayvanlar"
  | { type: 'AND'; conditions: PrerequisiteRule[] }
  | { type: 'OR'; conditions: PrerequisiteRule[] }
  | { type: 'MIN_CATEGORIES'; count: number; category: 'object' };

/**
 * Metadata for a single activity in the program mode system
 */
export interface ActivityMetadata {
  activityId: ActivityType | string;
  activityName: string;
  unitNumber: number;
  prerequisite: PrerequisiteRule | null; // null means "Yok (Kilitsiz)"
  masteryRule: MasteryRule;
}

/**
 * Unit definition with activities and progression rules
 */
export interface UnitDefinition {
  unitNumber: number;
  unitName: string;
  activities: (ActivityType | string)[]; // Activity IDs in this unit
  /** Percentage of unit activities that must be mastered before next unit unlocks (0.8 = 80%) */
  completionThreshold: number;
  /** Units that must be completed before this unit unlocks */
  prerequisiteUnits: number[];
}

/**
 * Parent override (Joker Hakkı) - temporarily unlock any activity for motivation
 */
export interface ParentOverride {
  activityId: ActivityType | string;
  expiresAt: number; // timestamp
  reason?: string;
  /** If true, this override should exclude the activity from unit progression calculations (treated as covered/mastered for unlocking) */
  ignoreForProgress?: boolean;
}
