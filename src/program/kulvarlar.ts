// Program Modu 2 (2026-10, Kaan onayı): beceri kulvarları. Ana menüdeki beceri alanlarıyla aynı.
// Her kulvarın kendi seviyeleri var; kulvarlar birlikte ilerler (tek zincir yok).
// Kimlikler: ActivityType (sayı) ya da nesne kategorisi / 5N1K alt başlığı (metin). Kayıt anahtarları eskisiyle aynı.
import { ActivityType as A } from '../types.ts';

export type KulvarId = 'kelimeler' | 'kavramlar' | 'sayilar' | 'dusunme' | 'okuma' | 'el' | 'anlama';
export type EtkinlikId = A | string;

export interface Seviye { ad: string; etkinlikler: EtkinlikId[] }
export interface Kulvar { id: KulvarId; ad: string; emoji: string; seviyeler: Seviye[] }

export const KULVARLAR: Kulvar[] = [
  {
    id: 'kelimeler', ad: 'Kelimeler', emoji: '🍎', seviyeler: [
      { ad: 'İlk kelimeler', etkinlikler: ['hayvanlar', 'meyveler', 'tasitlar', 'oyuncaklar'] },
      { ad: 'Ben ve evim', etkinlikler: ['vucudun_bolumleri', 'giysiler_aksesuarlar', 'ev_esyalari', 'sebzeler'] },
      { ad: 'Mutfak ve aile', etkinlikler: ['mutfak_gerecleri', 'icecekler', 'diger_yiyecekler', 'aile_uyeleri'] },
      { ad: 'Dünya', etkinlikler: ['meslekler', 'mekanlar_odalar', 'aletler', 'muzik_aletleri', 'bitkiler', 'okul_ofis_gerecleri', 'dogal_yapilar_uzay'] },
    ],
  },
  {
    id: 'kavramlar', ad: 'Kavramlar', emoji: '💡', seviyeler: [
      { ad: 'Renk, şekil, büyük/küçük', etkinlikler: [A.Colors, A.Shapes, A.BigSmall, A.YesNo] },
      { ad: 'İçinde, üstünde', etkinlikler: [A.OnUnder, A.InsideOutside, A.ColorRecognition, A.LongShort, A.FullEmpty] },
      { ad: 'Günlük nitelikler', etkinlikler: [A.HotCold, A.WetDry, A.CleanDirty, A.OpenClosed, A.HardSoft, A.Emotions, A.DayNight, A.FewMuch] },
      { ad: 'Boyut ve konum', etkinlikler: [A.ThinThick, A.WideNarrow, A.HeavyLight, A.BelowAbove, A.InFrontOfBehind, A.Between, A.NearFar, A.HighLow] },
      { ad: 'Ben ve çevrem', etkinlikler: [A.BrokenIntact, A.OldNew, A.YoungOld, A.HungryFull, A.YenirYenmez, A.TehlikeliGuvenli, A.HavaDurumu, A.AcikKoyu, A.WhoseIsThis] },
      { ad: 'Zaman ve duyular', etkinlikler: [A.LeftRight, A.BeforeAfter, A.FastSlow, A.IlkSon, A.Senses, A.NoisyQuiet, A.BitterSweet, A.RoughSmooth, A.ClockLearning] },
      { ad: 'Nesnenin hali', etkinlikler: [A.BesideOpposite, A.TersDuz, A.DikenliPuruzsuz, A.SivriKut, A.ParlakMat, A.SeffafOpak, A.KirisikDuzgun, A.DugumCozuk, A.TazeBayat, A.MessyClean, A.StraightCurved, A.AliveLifeless, A.DerinSig, A.KalabalikTenha, A.TembelCaliskan, A.HalfQuarterWhole] },
      { ad: 'Kıyasla (zor)', etkinlikler: [A.RelativeBigSmall, A.RelativeLongShort, A.RelativeThinThick, A.RelativeWideNarrow, A.RelativeFewMuch, A.RelativeNearFar, A.RelativeHighLow] },
    ],
  },
  {
    id: 'sayilar', ad: 'Sayılar', emoji: '🔢', seviyeler: [
      { ad: 'Kaç tane?', etkinlikler: [A.CountMatch] },
      { ad: 'Say ve taşı', etkinlikler: [A.DragAndDropCounting, A.OddEven] },
    ],
  },
  {
    id: 'dusunme', ad: 'Düşünme ve Hafıza', emoji: '🧠', seviyeler: [
      { ad: 'Aynı ve farklı', etkinlikler: [A.AyniniBul, A.WhatDoesntBelong, A.MemoryCards] },
      { ad: 'Hafıza ve örüntü', etkinlikler: [A.WhatsMissing, A.PatternCompletion, A.DragAndDropPositioning] },
      { ad: 'Sıralama ve mantık', etkinlikler: [A.SequencingStories, A.Sudoku] },
    ],
  },
  {
    id: 'okuma', ad: 'Okuma (isteğe bağlı)', emoji: '🔤', seviyeler: [
      { ad: 'Harfleri tanı', etkinlikler: [A.FindTheLetterInGrid, A.SoundPresence, A.LetterTracing] },
      { ad: 'Sesleri bul', etkinlikler: [A.FindTheLetter, A.FindTheSoundInImage] },
      { ad: 'Hece ve hikâye', etkinlikler: [A.Syllabification, A.EmbeddedStory] },
    ],
  },
  {
    id: 'el', ad: 'El Becerisi', emoji: '✋', seviyeler: [
      { ad: 'Çizgi ve boya', etkinlikler: [A.LineTracing, A.ShapeColoring] },
      { ad: 'Kurallı boyama', etkinlikler: [A.ConstrainedColoring] },
    ],
  },
  {
    id: 'anlama', ad: 'Anlama (5N1K)', emoji: '🗣️', seviyeler: [
      { ad: 'Kim, ne, nerede?', etkinlikler: ['FiveWOneH_Who', 'FiveWOneH_What', 'FiveWOneH_Where'] },
      { ad: 'Ne zaman, neden, nasıl?', etkinlikler: ['FiveWOneH_When', 'FiveWOneH_Why', 'FiveWOneH_How'] },
    ],
  },
];

/** Oturum sonu ödül oyunları (Oyun Odası + çocukların sevdikleri) */
export const ODUL_OYUNLARI = ['bubblePop', 'musicTouch', 'sheepShearing', 'memoryMatch', 'puzzle'];

export const kulvarBul = (id: KulvarId) => KULVARLAR.find((k) => k.id === id)!;
