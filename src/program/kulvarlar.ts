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
  // Kavram, sayı ve düşünme seviyeleri eski ünite sırasını izler (Kaan, 2026-10-10: "önceki sistemi ona göre yapmıştık";
  // yumurta-civciv sıralaması erken geliyordu). Parantezde eski ünite.
  {
    id: 'kavramlar', ad: 'Kavramlar', emoji: '💡', seviyeler: [
      { ad: 'Renk, şekil, büyük/küçük', etkinlikler: [A.Colors, A.Shapes, A.BigSmall, A.ColorRecognition] }, // 1-2
      { ad: 'İçinde, üstünde', etkinlikler: [A.InsideOutside, A.OnUnder, A.FullEmpty] }, // 2-3
      { ad: 'Uzun, kalın, geniş', etkinlikler: [A.LongShort, A.ThinThick, A.WideNarrow, A.FewMuch, A.OpenClosed] }, // 4
      { ad: 'Günlük nitelikler', etkinlikler: [A.WetDry, A.CleanDirty, A.HotCold, A.HardSoft, A.Emotions, A.DayNight, A.DikenliPuruzsuz, A.DugumCozuk] }, // 5
      { ad: 'Dokun ve hisset', etkinlikler: [A.BrokenIntact, A.RoughSmooth, A.HeavyLight, A.BitterSweet, A.NoisyQuiet] }, // 6
      { ad: 'Konum', etkinlikler: [A.BelowAbove, A.InFrontOfBehind, A.NearFar, A.HighLow, A.BesideOpposite, A.BeforeAfter, A.YesNo] }, // 7
      { ad: 'Ben ve çevrem', etkinlikler: [A.OldNew, A.TazeBayat, A.KirisikDuzgun, A.SivriKut, A.ParlakMat, A.AcikKoyu, A.HavaDurumu, A.IlkSon, A.TehlikeliGuvenli, A.YenirYenmez, A.WhoseIsThis] }, // 7
      { ad: 'Nesnenin hali', etkinlikler: [A.MessyClean, A.StraightCurved, A.HalfQuarterWhole, A.AliveLifeless, A.Between, A.DerinSig, A.KalabalikTenha, A.HungryFull, A.YoungOld, A.TersDuz] }, // 8-9
      { ad: 'Zaman ve duyular', etkinlikler: [A.LeftRight, A.Senses, A.TembelCaliskan, A.SeffafOpak, A.FastSlow, A.ClockLearning] }, // 10
      { ad: 'Kıyasla (zor)', etkinlikler: [A.RelativeBigSmall, A.RelativeLongShort, A.RelativeThinThick, A.RelativeWideNarrow, A.RelativeFewMuch, A.RelativeNearFar, A.RelativeHighLow] }, // 7-9
    ],
  },
  {
    id: 'sayilar', ad: 'Sayılar', emoji: '🔢', seviyeler: [
      { ad: 'Kaç tane?', etkinlikler: [A.CountMatch] },
      { ad: 'Say ve taşı', etkinlikler: [A.DragAndDropCounting] }, // 8
      { ad: 'Tek ve çift', etkinlikler: [A.OddEven] }, // 9
    ],
  },
  {
    id: 'dusunme', ad: 'Düşünme ve Hafıza', emoji: '🧠', seviyeler: [
      { ad: 'Aynısını bul', etkinlikler: [A.AyniniBul, A.MemoryCards] }, // 3
      { ad: 'Örüntü ve eksik', etkinlikler: [A.PatternCompletion, A.WhatsMissing] }, // 6
      { ad: 'Farklı olan', etkinlikler: [A.WhatDoesntBelong, A.DragAndDropPositioning] }, // 8
      { ad: 'Sıralama ve mantık', etkinlikler: [A.SequencingStories, A.Sudoku] }, // 8-9
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
