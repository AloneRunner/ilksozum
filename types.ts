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
  ObjectCategoriesMenu,
  LetterActivitiesMenu, 
  BodyPainScreen,
  CommunicationSubCategory,
  ProfileSelection,
  ParentReport,
  ParentTips,
  ActivityManagement,
  PrintPreview,
  PrintPool,
  MiniGamesMenu,
  BalloonPopGame,
  ButterflyGardenGame,
  FireworksGame,
  ShapeMatchingGame,
  MusicTouchGame,
  SevenDifferencesGame,
  EmotionPuppetGame,
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
  
  // === Kavram Etkinlikleri > Ana Kategori ===
  YesNo, // Evet/Hayır is a main category now

  // === Kavram Etkinlikleri > Temel Kavramlar ===
  Colors,
  Shapes,
  Emotions, 
  
  // === Kavram Etkinlikleri > Nitelikler (Zıt Kavramlar) ===
  BigSmall,
  LongShort,
  ThinThick,
  WideNarrow,
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
  
  // === Kavram Etkinlikleri > Miktar & Sayılar ===
  FewMuch,
  HalfQuarterWhole,
  FullEmpty,
  OddEven, 

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
  Sudoku, // Tablo Eşleştirme (Görseli kopyalama)
  MemoryCards, // Hafıza Kartları (Ezberleyip eşleştirme)
  PatternCompletion, // Örüntü Tamalama
  WhatDoesntBelong,
  FunctionalMatching, // İşlevsel Eşleştirme (e.g., key-lock)
  CauseEffect, // Neden-Sonuç İlişkisi
  SequencingStories, // Sıralama Hikayeleri
  DragAndDropCounting, // Sürükle Bırak Sayma (YENİ)
  DragAndDropPositioning, // Sürükle Bırak Konum (YENİ)

  // === Nesneleri Tanıyalım ===
  ObjectRecognition, // Generic type for object recognition tests
}

export enum ActivityCategory {
  LetterSound = 'LetterSound',
  Concept = 'Concept',
  Reasoning = 'Reasoning',
  Objects = 'Objects', // New category for achievements
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
    spokenText: string;
    imageUrl: string;
    isCorrect: boolean;
}

export interface ConceptRound {
    id: number;
    question: string;
    questionAudioKey: string;
    options: ConceptOption[];
    activityType: ActivityType; // Pass activity type for context
    questionItem?: ImageMetadata; // For games like FunctionalMatching
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
    emotion?: 'mutlu' | 'üzgün' | 'kızgın' | 'şaşkın' | 'korkmuş' | 'hasta' | 'yorgun' | 'uykulu' | 'heyecanlı' | 'rahat' | 'gururlu' | 'neşeli' | 'utanmış' | 'sıkılmış' | 'sevgi dolu';
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
    density?: 'kalabalik' | 'tenhâ';
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
