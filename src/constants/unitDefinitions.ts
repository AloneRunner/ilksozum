/**
 * Unit Definitions for Unit-Based Program Mode
 * Defines the 10-unit skill pyramid structure
 */

import { UnitDefinition } from '../types';
import { ActivityType } from '../types';

const UNIT_COMPLETION_THRESHOLD = 0.75;

/**
 * 10-Unit Skill Pyramid
 * Units unlock sequentially as the child masters activities
 * Each unit requires 75% completion before next unit unlocks
 */
export const UNIT_DEFINITIONS: UnitDefinition[] = [
  {
    unitNumber: 1,
    unitName: 'Merhaba Dünya',
    activities: [
      ActivityType.Colors,
      ActivityType.Shapes,
      ActivityType.LineTracing,
      'hayvanlar',
      'meyveler',
      'tasitlar',
      'oyuncaklar',
      ActivityType.AyniniBul,          // Aynısını Bul (2026-10-21)
    ],
    completionThreshold: UNIT_COMPLETION_THRESHOLD,
    prerequisiteUnits: [], // No prerequisites - first unit is always unlocked
  },
  {
    unitNumber: 2,
    unitName: 'Fiziksel Dünya',
    activities: [
      ActivityType.BigSmall,
      ActivityType.InsideOutside,
      ActivityType.KutuOyunu,
      ActivityType.OnUnder,
      ActivityType.ShapeColoring,
      'vucudun_bolumleri',
      'giysiler_aksesuarlar',
      'ev_esyalari',
    ],
    completionThreshold: UNIT_COMPLETION_THRESHOLD,
    prerequisiteUnits: [1],
  },
  {
    unitNumber: 3,
    unitName: 'Hafıza ve Dikkat',
    activities: [
      ActivityType.MemoryCards,
      ActivityType.FullEmpty,
      'mutfak_gerecleri',
      'icecekler',
      'sebzeler',
      'diger_yiyecekler',
      ActivityType.ColorRecognition,   // Rengi Ne? (2026-10-21)
    ],
    completionThreshold: UNIT_COMPLETION_THRESHOLD,
    prerequisiteUnits: [2],
  },
  {
    unitNumber: 4,
    unitName: 'Nitelikler I',
    activities: [
      ActivityType.LongShort,
      ActivityType.ThinThick,
      ActivityType.WideNarrow,
      ActivityType.FewMuch,
      ActivityType.OpenClosed,
      'bitkiler',
      'aile_uyeleri',
      ActivityType.CountMatch,         // Kaç Tane Var? (2026-10-21)
      ActivityType.ConstrainedColoring, // Kısıtlı Boyama (2026-10-21)
    ],
    completionThreshold: UNIT_COMPLETION_THRESHOLD,
    prerequisiteUnits: [3],
  },
  {
    unitNumber: 5,
    unitName: 'Nitelikler II',
    activities: [
      ActivityType.WetDry,
      ActivityType.CleanDirty,
      ActivityType.HotCold,
      ActivityType.HardSoft,
      ActivityType.Emotions,
      ActivityType.DayNight,
      'meslekler',
      'mekanlar_odalar',
      'aletler',
      ActivityType.DikenliPuruzsuz,
      ActivityType.DugumCozuk,
    ],
    completionThreshold: UNIT_COMPLETION_THRESHOLD,
    prerequisiteUnits: [4],
  },
  {
    unitNumber: 6,
    unitName: 'Örüntü ve İlişkiler',
    activities: [
      ActivityType.PatternCompletion,
      ActivityType.RhythmFollowing,
      'muzik_aletleri',
      'okul_ofis_gerecleri',
      ActivityType.BrokenIntact,
      ActivityType.RoughSmooth,
      ActivityType.HeavyLight,
      ActivityType.BitterSweet,
    ],
    completionThreshold: UNIT_COMPLETION_THRESHOLD,
    prerequisiteUnits: [5],
  },
  {
    unitNumber: 7,
    unitName: 'Göreceli Kavramlar',
    activities: [
      ActivityType.RelativeBigSmall,
      ActivityType.RelativeLongShort,
      ActivityType.RelativeThinThick,
      ActivityType.RelativeWideNarrow,
      ActivityType.RelativeFewMuch,
      ActivityType.BelowAbove,
      ActivityType.BesideOpposite,
      ActivityType.InFrontOfBehind,
      ActivityType.NearFar,
      ActivityType.HighLow,
      ActivityType.YesNo,
      ActivityType.TazeBayat,
      ActivityType.KirisikDuzgun,
      ActivityType.SivriKut,
      ActivityType.ParlakMat,
      ActivityType.AcikKoyu,
      ActivityType.HavaDurumu,
      ActivityType.IlkSon,
      ActivityType.TehlikeliGuvenli,
      ActivityType.YenirYenmez,
      ActivityType.OldNew,
      ActivityType.NoisyQuiet,         // Gürültülü / Sessiz (2026-10-21)
      ActivityType.TersDuz,            // Ters / Düz (2026-10-21)
      ActivityType.WhatsMissing,       // Hangisi Kayıp? (2026-10-21)
    ],
    completionThreshold: UNIT_COMPLETION_THRESHOLD,
    prerequisiteUnits: [6],
  },
  {
    unitNumber: 8,
    unitName: 'Neden-Sonuç ve Sıralama',
    activities: [
      ActivityType.WhatDoesntBelong,
      // CauseEffect was removed from Program/Reinforcement selection (migrated into 5W1H)
      // (Previously: ActivityType.CauseEffect),
      ActivityType.SequencingStories,
      ActivityType.DragAndDropCounting,
      ActivityType.DragAndDropPositioning,
      ActivityType.HalfQuarterWhole,
      'dogal_yapilar_uzay',
      ActivityType.MessyClean,
      ActivityType.StraightCurved,
      ActivityType.WhoseIsThis,        // Bu Kimin? (2026-10-21)
    ],
    completionThreshold: UNIT_COMPLETION_THRESHOLD,
    prerequisiteUnits: [7],
  },
  {
    unitNumber: 9,
    unitName: 'Sorgulama ve Analiz',
    activities: [
      // 5N1K erken alt başlıkları
      'FiveWOneH_Who',
      'FiveWOneH_What',
      'FiveWOneH_Where',
      ActivityType.Sudoku,
      ActivityType.AliveLifeless,
      ActivityType.Between,
      ActivityType.OddEven,
      ActivityType.RelativeNearFar,
      ActivityType.RelativeHighLow,
      ActivityType.DerinSig,
      ActivityType.KalabalikTenha,
      ActivityType.HungryFull,
      ActivityType.YoungOld,
      ActivityType.ClockLearning,      // Saat (2026-10-21)
      ActivityType.BeforeAfter,        // Önce / Sonra: 7. üniteden taşındı (Kaan: küçük yaşta zor, ünite tıkanıyordu)
    ],
    completionThreshold: UNIT_COMPLETION_THRESHOLD,
    prerequisiteUnits: [8],
  },
  {
    unitNumber: 10,
    unitName: 'Ustalık',
    activities: [
      // 5N1K ileri alt başlıkları
      'FiveWOneH_When',
      'FiveWOneH_Why',
      'FiveWOneH_How',
      ActivityType.LeftRight,
      ActivityType.Senses,
      ActivityType.TembelCaliskan,
      ActivityType.SeffafOpak,
      ActivityType.FastSlow,
      // Reading Readiness Track (Okuma Hazırlığı Kulvarı)
      ActivityType.FindTheSoundInImage,
      ActivityType.FindTheLetter,
      ActivityType.FindTheLetterInGrid,
      ActivityType.SoundPresence,
      ActivityType.Syllabification,
      ActivityType.LetterTracing,      // Harf Çizgi Takibi (2026-10-21)
      // Hikâye Zamanı programdan çıkarıldı (2026-10-21): bitişi olmayan gezinme ekranı, ünite ilerlemesini tıkıyordu
    ],
    completionThreshold: UNIT_COMPLETION_THRESHOLD,
    prerequisiteUnits: [9],
  },
];

/**
 * Helper function to get unit definition by number
 */
export function getUnitDefinition(unitNumber: number): UnitDefinition | undefined {
  return UNIT_DEFINITIONS.find((unit) => unit.unitNumber === unitNumber);
}

/**
 * Helper function to get all unlocked units for a profile
 * based on completion status
 */
export function getUnlockedUnits(completedUnits: number[]): UnitDefinition[] {
  return UNIT_DEFINITIONS.filter((unit) => {
    // First unit is always unlocked
    if (unit.unitNumber === 1) return true;
    
    // Check if all prerequisite units are completed
    return unit.prerequisiteUnits.every((prereqUnit) => 
      completedUnits.includes(prereqUnit)
    );
  });
}
