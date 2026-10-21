import { ActivityType } from '../../types.ts';
import { WORKSHEET_REGISTRY } from './worksheetRegistry.ts';
import { ActivityStats } from '../../types.ts';

// Etkinlik → çalışma kâğıdı (Kaan, 2026-10-21: Program Modu'ndan "bu hafta çalıştığı etkinliklerin kâğıtları").
// Anahtar: ActivityType (sayı, metin olarak) ya da nesne kategorisi / 5N1K alt başlığı. Değer: WORKSHEET_REGISTRY id.
const A = (t: ActivityType) => String(t);
export const ETKINLIK_KAGIT: Record<string, string> = {
  [A(ActivityType.BigSmall)]: 'big-small', [A(ActivityType.RelativeBigSmall)]: 'relative-big-small',
  [A(ActivityType.LongShort)]: 'long-short', [A(ActivityType.RelativeLongShort)]: 'abstract-long-short',
  [A(ActivityType.ThinThick)]: 'thin-thick', [A(ActivityType.RelativeThinThick)]: 'thin-thick',
  [A(ActivityType.WideNarrow)]: 'wide-narrow', [A(ActivityType.RelativeWideNarrow)]: 'wide-narrow',
  [A(ActivityType.FewMuch)]: 'few-much', [A(ActivityType.RelativeFewMuch)]: 'few-much',
  [A(ActivityType.NearFar)]: 'near-far', [A(ActivityType.RelativeNearFar)]: 'near-far',
  [A(ActivityType.HighLow)]: 'high-low', [A(ActivityType.RelativeHighLow)]: 'high-low',
  [A(ActivityType.OldNew)]: 'old-new', [A(ActivityType.YoungOld)]: 'young-old', [A(ActivityType.HardSoft)]: 'hard-soft',
  [A(ActivityType.CleanDirty)]: 'clean-dirty', [A(ActivityType.WetDry)]: 'wet-dry', [A(ActivityType.OpenClosed)]: 'open-closed',
  [A(ActivityType.StraightCurved)]: 'straight-curved', [A(ActivityType.NoisyQuiet)]: 'noisy-quiet', [A(ActivityType.AliveLifeless)]: 'alive-lifeless',
  [A(ActivityType.BitterSweet)]: 'bitter-sweet', [A(ActivityType.HeavyLight)]: 'heavy-light', [A(ActivityType.HotCold)]: 'hot-cold',
  [A(ActivityType.RoughSmooth)]: 'rough-smooth', [A(ActivityType.TazeBayat)]: 'fresh-stale', [A(ActivityType.KirisikDuzgun)]: 'wrinkled-smooth',
  [A(ActivityType.SivriKut)]: 'sharp-blunt', [A(ActivityType.ParlakMat)]: 'shiny-dull', [A(ActivityType.TembelCaliskan)]: 'lazy-hardworking',
  [A(ActivityType.SeffafOpak)]: 'transparent-opaque', [A(ActivityType.DikenliPuruzsuz)]: 'spiky-smooth', [A(ActivityType.DerinSig)]: 'deep-shallow',
  [A(ActivityType.KalabalikTenha)]: 'crowded-empty', [A(ActivityType.HungryFull)]: 'hungry-full', [A(ActivityType.TersDuz)]: 'upside-down',
  [A(ActivityType.FullEmpty)]: 'full-empty', [A(ActivityType.BrokenIntact)]: 'broken-intact', [A(ActivityType.MessyClean)]: 'messy-clean',
  [A(ActivityType.DugumCozuk)]: 'knotted-untied', [A(ActivityType.HalfQuarterWhole)]: 'whole-half',
  [A(ActivityType.OddEven)]: 'odd-even', [A(ActivityType.CountMatch)]: 'how-many',
  [A(ActivityType.OnUnder)]: 'on-under', [A(ActivityType.InsideOutside)]: 'inside-outside', [A(ActivityType.KutuOyunu)]: 'inside-outside',
  [A(ActivityType.InFrontOfBehind)]: 'in-front-behind', [A(ActivityType.LeftRight)]: 'left-right', [A(ActivityType.BelowAbove)]: 'above-below',
  [A(ActivityType.BesideOpposite)]: 'beside-opposite', [A(ActivityType.Between)]: 'between', [A(ActivityType.DragAndDropPositioning)]: 'on-under',
  [A(ActivityType.BeforeAfter)]: 'before-after', [A(ActivityType.DayNight)]: 'day-night', [A(ActivityType.FastSlow)]: 'fast-slow', [A(ActivityType.Senses)]: 'senses',
  [A(ActivityType.WhatDoesntBelong)]: 'what-doesnt-belong', [A(ActivityType.WhoseIsThis)]: 'whose-is-this',
  [A(ActivityType.ColorRecognition)]: 'color-recognition', [A(ActivityType.WhatsMissing)]: 'whats-missing',
  FiveWOneH_Who: 'fivew-kim', FiveWOneH_What: 'fivew-ne', FiveWOneH_Where: 'fivew-nerede',
  FiveWOneH_When: 'fivew-nezaman', FiveWOneH_Why: 'fivew-neden', FiveWOneH_How: 'fivew-nasil',
  meyveler: 'obj-fruits', sebzeler: 'obj-vegetables', diger_yiyecekler: 'obj-foods', ev_esyalari: 'obj-household', oyuncaklar: 'obj-toys',
  giysiler_aksesuarlar: 'obj-clothes', mutfak_gerecleri: 'obj-kitchen', tasitlar: 'obj-vehicles', hayvanlar: 'obj-animals', aile_uyeleri: 'obj-family',
  bitkiler: 'obj-plants', vucudun_bolumleri: 'obj-body', meslekler: 'obj-professions', dogal_yapilar_uzay: 'obj-nature', aletler: 'obj-tools',
  muzik_aletleri: 'obj-musical', okul_ofis_gerecleri: 'obj-school', mekanlar_odalar: 'obj-places',
};

const VAR = new Set(WORKSHEET_REGISTRY.map((w) => w.id));

/** Verilen etkinliklerin kâğıtları + son 7 günde Program Modu'nda çalışılanlarınki (tekrarsız, yalnız var olanlar) */
export const haftaninKagitlari = (etkinlikler: (ActivityType | string)[], stats: Record<string, ActivityStats>): string[] => {
  const sinir = Date.now() - 7 * 86400000;
  const son7 = Object.entries(stats || {})
    .filter(([, s]) => (s.history || []).some((h) => h.mode === 'program' && (h.timestamp || 0) >= sinir))
    .map(([id]) => id);
  const sonuc: string[] = [];
  for (const id of [...etkinlikler.map(String), ...son7]) {
    const k = ETKINLIK_KAGIT[id];
    if (k && VAR.has(k) && !sonuc.includes(k)) sonuc.push(k);
  }
  return sonuc;
};
