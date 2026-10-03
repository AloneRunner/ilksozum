// Lightweight i18n utilities - Modular structure
import trCommon from './tr/common.json';
import trScreens from './tr/screens.json';
import trLetterActivities from './tr/letterActivities.json';
import trGameActivities from './tr/gameActivities.json';
import trConcepts from './tr/concepts.json';
import trObjects from './tr/objects.json';
import trQuestions from './tr/questions.json';
import trActivityFeedback from './tr/activityFeedback.json';
import trCommunication from './tr/communication.json';
import trFiveWOneH from './tr/fiveWOneH.json';
import trCauseEffect from './tr/causeEffect.json';
import trFunctionalMatching from './tr/functionalMatching.json';
import trWhatDoesntBelong from './tr/whatDoesntBelong.json';
import trSequencingStories from './tr/sequencingStories.json';
import trDragAndDropCounting from './tr/dragAndDropCounting.json';
import trPatternCompletion from './tr/patternCompletion.json';
import trSudoku from './tr/sudoku.json';
import trEmotionPuppet from './tr/emotionPuppet.json';
import trBigSmall from './tr/bigSmall.json';
import trSpatial from './tr/spatial.json';
import trAliveLifeless from './tr/aliveLifeless.json';
import trBitterSweet from './tr/bitterSweet.json';
import trBrokenIntact from './tr/brokenIntact.json';
import trCleanDirty from './tr/cleanDirty.json';
import trDerinSig from './tr/derinSig.json';
import trDikenliPuruzsuz from './tr/dikenliPuruzsuz.json';
import trDugumCozuk from './tr/dugumCozuk.json';
import trHardSoft from './tr/hardSoft.json';
import trHeavyLight from './tr/heavyLight.json';
import trHotCold from './tr/hotCold.json';
import trHungryFull from './tr/hungryFull.json';
import trKalabalikTenha from './tr/kalabalikTenha.json';
import trKirisikDuzgun from './tr/kirisikDuzgun.json';
import trLongShort from './tr/longShort.json';
import trMessyClean from './tr/messyClean.json';
import trNoisyQuiet from './tr/noisyQuiet.json';
import trParlakMatConcepts from './tr/parlakMatConcepts.json';
import trRoughSmoothConcepts from './tr/roughSmoothConcepts.json';
import trSeffafOpakConcepts from './tr/seffafOpakConcepts.json';
import trSivriKutConcepts from './tr/sivriKutConcepts.json';
import trStraightCurvedConcepts from './tr/straightCurvedConcepts.json';
import trTazeBayatConcepts from './tr/tazeBayatConcepts.json';
import trTembelCaliskanConcepts from './tr/tembelCaliskanConcepts.json';
import trTersDuzConcepts from './tr/tersDuzConcepts.json';
import trThinThickConcepts from './tr/thinThickConcepts.json';
import trWetDryConcepts from './tr/wetDryConcepts.json';
import trWideNarrowConcepts from './tr/wideNarrowConcepts.json';
import trYoungOldConcepts from './tr/youngOldConcepts.json';
import trFewMuchConcepts from './tr/fewMuchConcepts.json';
import trFullEmptyConcepts from './tr/fullEmptyConcepts.json';
import trHalfQuarterWholeConcepts from './tr/halfQuarterWholeConcepts.json';
import trOddEvenConcepts from './tr/oddEvenConcepts.json';
import trTamamlama from './tr/tamamlama.json';

export type Locale = 'tr' | 'en' | 'de' | 'fr' | 'nl' | 'az';

type Dict = Record<string, any>;

// Deep-merge utility
function isPlainObject(v: any): v is Record<string, any> {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function mergeInto(target: Dict, src: Dict) {
  for (const k of Object.keys(src)) {
    const sv = src[k];
    const tv = target[k];
    if (isPlainObject(sv) && isPlainObject(tv)) {
      mergeInto(tv, sv);
    } else if (isPlainObject(sv)) {
      target[k] = JSON.parse(JSON.stringify(sv));
    } else {
      target[k] = sv;
    }
  }
}

function deepMerge(...objs: Dict[]): Dict {
  const out: Dict = {};
  for (const o of objs) {
    if (o && typeof o === 'object') mergeInto(out, o);
  }
  return out;
}

// Merge all modules for each language
// Sadece Türkçe kaynak. Diğer dil kodları (eski kodda hâlâ geçen dallar için) aynı Türkçe kaynağa bakar.
const trResources: Dict = deepMerge(
    {},
    trCommon,
    trScreens,
    trLetterActivities,
    trGameActivities,
    trConcepts,
    trObjects,
    trQuestions,
    trBigSmall,
    trSpatial,
    trAliveLifeless,
    trBitterSweet,
    trBrokenIntact,
    trCleanDirty,
    trDerinSig,
    trDikenliPuruzsuz,
    trDugumCozuk,
    trHardSoft,
    trHeavyLight,
    trHotCold,
    trHungryFull,
    trKalabalikTenha,
    trKirisikDuzgun,
    trLongShort,
    trMessyClean,
    trNoisyQuiet,
    trParlakMatConcepts,
    trRoughSmoothConcepts,
    trSeffafOpakConcepts,
    trSivriKutConcepts,
    trStraightCurvedConcepts,
    trTazeBayatConcepts,
    trTembelCaliskanConcepts,
    trTersDuzConcepts,
    trThinThickConcepts,
    trWetDryConcepts,
    trWideNarrowConcepts,
    trYoungOldConcepts,
    trFewMuchConcepts,
    trFullEmptyConcepts,
    trHalfQuarterWholeConcepts,
    trOddEvenConcepts,
    trActivityFeedback,
    trCommunication,
    trFiveWOneH,
    trCauseEffect,
    trFunctionalMatching,
    trWhatDoesntBelong,
    trSequencingStories,
    trDragAndDropCounting,
    trPatternCompletion,
    trSudoku,
    trEmotionPuppet,
    trTamamlama, // eksik Türkçe metinler (2026-10)
);

const resources: Record<Locale, Dict> = {
  tr: trResources, en: trResources, de: trResources, fr: trResources, nl: trResources, az: trResources,
};

// Uygulama yalnızca Türkçe (2026-10: kullanıcıların ~%97'si Türkiye).
let currentLang: Locale = 'tr';

export function getCurrentLanguage(): Locale {
  return currentLang;
}

// Dil değiştirme kapatıldı: her çağrı Türkçede kalır.
export function setCurrentLanguage(_lang: Locale) {
  currentLang = 'tr';
  applyDocumentLanguage();
}

export function applyDocumentLanguage() {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = currentLang;
  }
}

// Simple dotted path lookup
function lookup(dict: Dict, path: string): string | undefined {
  const parts = path.split('.');
  let node: any = dict;
  for (const p of parts) {
    if (node && typeof node === 'object' && p in node) node = node[p];
    else return undefined;
  }
  return typeof node === 'string' ? node : undefined;
}

export function t(key: string, fallback?: string): string {
  const res = lookup(resources[currentLang], key);
  if (res) return res;
  const resTr = lookup(resources.tr, key);
  if (resTr) return resTr;
  if (key.startsWith('objects.')) {
    const parts = key.split('.').slice(1);
    const last = parts.join('.');
    const placeholder = last.replace(/_/g, ' ');
    return placeholder || (fallback ?? key);
  }
  return fallback ?? key;
}

export function lookupLocale(key: string, locale?: Locale): string | undefined {
  const loc = locale ?? currentLang;
  return lookup(resources[loc], key);
}

// Return raw resource value (could be string | array | object)
export function getRaw(key: string, locale?: Locale): any {
  const loc = locale ?? currentLang;
  const parts = key.split('.');
  let node: any = resources[loc];
  for (const p of parts) {
    if (node && typeof node === 'object' && p in node) node = node[p];
    else return undefined;
  }
  return node;
}

applyDocumentLanguage();