/**
 * Program Mode Session Builder (Yeni Kural Seti)
 * ==================================================
 * Kullanıcı taleplerine göre sadeleştirilmiş yeni mantık:
 *
 * 1) Her etkinlik çalıştırıldığında (program / random fark etmeksizin) artık varsayılan tur soru sayısı 6.
 *    (Etkinlikte 6'dan az soru varsa eldeki kadar gelir.)  Bu sayı hook içinde ayarlanır; burada sadece
 *    oturum kompozisyonu (hangi etkinlikler) belirlenir.
 *
 * 2) Oturum uzunluğu dinamik: 7 veya 8 etkinlik.
 *    - 1. Ünitedeyse her zaman 7 etkinlik (tamamen 1. ünite).
 *    - 2+ ünitelerde temel şablon:
 *         a. 1 Isınma (geçmiş ünitelerden yüksek başarı oranlı – "rahat" yaptığı bir etkinlik)
 *         b. 5 Odak (mevcut odak ünitenin etkinlikleri)
 *         c. 0–2 Pekiştirme:
 *             - Eğer geçmiş ünitelerde başarısı düşük (zayıf) etkinlik(ler) varsa en fazla 2 tanesi eklenir → toplam 8
 *             - Eğer zayıf yoksa kalan slotlar (varsa) odak ünitenin henüz sorulmamış diğer etkinlikleriyle doldurulur
 *               fakat zayıf yok ve ek faaliyet de yoksa toplam 7’de kalır.
 *
 * 3) YENİ EŞİKLER (Kullanıcı Son Talebi - 09 Kasım 2025)
 *    Isınma için başarı eşiği: >= 0.75 (ustalaşmış kabul)
 *      - Seçim mantığı: 0.75 üzerindeki EN DÜŞÜK başarıya sahip etkinliği getir (yeni ustalaşmış olanı tekrar ettir)
 *    Pekiştirme için eşik: > 0 ve < 0.75 (henüz tam ustalaşmamış)
 *      - Seçim mantığı: 0.75 altındaki EN YÜKSEK başarıyı (eşiğe en yakın) öncele. Ornek: %74, %60 varken %74 seçilir.
 *    (Başarı oranı: doğru / toplam sorulan – history ve aggregate alanları üzerinden türetilir.)
 *
 * 4) Odak Ünitesi = 1'den başlayarak sırayla kontrol edilen ilk tamamlanmamış ünite.
 *    - allowedUnitCeiling sadece üst sınırı belirler; odak açık olan en yüksek üniteye zıplamaz.
 *    - 1. ünite için özel kural: sadece o ünite ve 7 etkinlik.
 *
 * 5) Zayıf etkinlik bulunursa toplam 8’e çıkar; bulunmazsa 7’de kalır (ör: kullanıcı talebindeki 7–8 kuralı).
 *
 * 6) Unit 2 ve sonrası: Eğer hiç zayıf yoksa (örn. 5. ünite örneği) tüm oturum 7 etkinlik olabilir; bu durumda ek
 *    pekiştirme turu eklenmez.
 */

import { ActivityType, ActivityStats, ParentOverride } from '../types';
import { 
  getAvailableActivities, 
  getMasteredActivities,
  isUnitCompleteForProgramMode,
  PROGRAM_WIDE_MASTERY_THRESHOLD
} from './masteryEngine';
import { getUnitDefinition } from '../constants/unitDefinitions';
import { getActivityMetadata } from '../constants/activityMetadata';

export interface SessionActivity {
  activityId: ActivityType | string;
  activityName: string;
  sessionRole: 'warmup' | 'new' | 'reinforcement';
  unitNumber: number;
}

export interface DailySession {
  date: string; // ISO date string
  activities: SessionActivity[];
  estimatedDuration: number; // minutes
  focusUnit: number; // Primary unit for this session
}

/**
 * Build a daily session with spaced repetition
 * 
 * Algorithm:
 * 1. Select 1-2 mastered activities for warmup (random, prefer recently mastered)
 * 2. Select 2-3 available (unlocked but not mastered) activities for new content
 * 3. Select 1-2 activities that are close to mastery for reinforcement
 * 4. Avoid repeating same activities in consecutive sessions
 */
export function buildDailySession(
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>,
  _previousSessionActivities?: (ActivityType | string)[],
  _sessionLength: 'short' | 'medium' | 'long' = 'medium',
  allowedUnitCeiling?: number,
  parentOverrides?: ParentOverride[]
): DailySession {
  // Respect parent overrides (Joker) by passing them through
  const available = getAvailableActivities(allStats, masteredObjectCategories, parentOverrides);
  const mastered = getMasteredActivities(allStats, masteredObjectCategories);

  // --- Helpers ---
  const successOf = (id: ActivityType | string): number => {
    const stats = allStats[id as string];
    if (!stats) return 0;
    let correct = stats.totalCorrect || 0;
    let total = stats.totalQuestions || 0;
    if (total === 0) {
      const hist = (stats.history || []).filter(h => h.total > 0);
      for (const h of hist) { correct += h.score; total += h.total; }
    }
    return total > 0 ? correct / total : 0;
  };
  const isAttempted = (id: ActivityType | string): boolean => {
    const st = allStats[id as string];
    if (!st) return false;
    if ((st.totalQuestions || 0) > 0) return true;
    const hist = (st.history || []).filter(h => h.total > 0);
    return hist.length > 0;
  };
  const randPick = <T,>(arr: T[], n: number) => arr.slice().sort(() => Math.random() - 0.5).slice(0, n);

  // --- Focus (first incomplete unit, scanned sequentially from 1) ---
  const highestAllowedUnit = (() => {
    if (allowedUnitCeiling) return allowedUnitCeiling;
    let maxU = 1;
    for (const id of available) {
      const meta = getActivityMetadata(id);
      if (meta && meta.unitNumber > maxU) maxU = meta.unitNumber;
    }
    return maxU;
  })();

  const focusUnit = (() => {
    for (let unitNumber = 1; unitNumber <= highestAllowedUnit; unitNumber += 1) {
      if (!isUnitCompleteForProgramMode(unitNumber, allStats, masteredObjectCategories, parentOverrides, 6)) {
        return unitNumber;
      }
    }

    return highestAllowedUnit;
  })();
  const focusDef = getUnitDefinition(focusUnit);
  const focusActivities = (focusDef?.activities || []).filter(a => {
    const meta = getActivityMetadata(a);
    return meta && meta.unitNumber === focusUnit; // sanity
  });

  // Previous units' activities (flatten) for warmup / reinforcement pools
  const previousActivities: (ActivityType | string)[] = [];
  for (let u = 1; u < focusUnit; u++) {
    const def = getUnitDefinition(u);
    if (!def) continue;
    previousActivities.push(...def.activities);
  }

  // Filter previous activities:
  // Isınma adayları: başarı >= 0.75 (ustalaşmış). EN DÜŞÜK başarıyı seçmek için sıralama ascending.
  const warmupCandidates = previousActivities.filter(id => successOf(id) >= PROGRAM_WIDE_MASTERY_THRESHOLD);
  // Pekiştirme adayları: başarı < 0.75 (include zeros so reinforcement appears even
  // when the child repeatedly failed and their percentage stuck below threshold).
  // Eşiğe yakın olanı öncelemek için descending sıralama.
  const weakCandidates = previousActivities.filter(id => {
    const s = successOf(id);
    return s < PROGRAM_WIDE_MASTERY_THRESHOLD; // include zero-success activities
  }).sort((a,b) => successOf(b) - successOf(a));

  // Debug logging to help trace why reinforcement may or may not be selected
  try {
    console.debug('[SessionBuilder] focusUnit', focusUnit, 'previousActivities', previousActivities.length, 'weakCandidates', weakCandidates.map(w => ({ id: String(w), success: successOf(w) })));
  } catch (e) {
    // ignore in environments without console
  }

  // --- Session Construction ---
  const session: SessionActivity[] = [];

  if (focusUnit === 1) {
    // Unit 1 special rule: exactly (up to) 7 activities from unit 1
    const chosen = randPick(focusActivities, 7).map(id => createSessionActivity(id, 'new')).filter(Boolean) as SessionActivity[];
    session.push(...chosen);
    return {
      date: new Date().toISOString().split('T')[0],
      activities: session,
      estimatedDuration: 20,
      focusUnit: 1,
    };
  }

  // 1) Warmup (1 high-success previous). If none, fall back to any previous mastered/attempted.
  let warmup: SessionActivity[] = [];
  if (warmupCandidates.length > 0) {
    // EN DÜŞÜK başarı >=0.75 olanı al (tek)
    const sortedAsc = warmupCandidates.sort((a,b)=> successOf(a)-successOf(b));
    const picked = [sortedAsc[0]];
    warmup = picked.map(id => createSessionActivity(id, 'warmup')).filter(Boolean) as SessionActivity[];
  } else {
    const fallbackPrev = previousActivities.filter(isAttempted);
    const picked = randPick(fallbackPrev, 1);
    warmup = picked.map(id => createSessionActivity(id, 'warmup')).filter(Boolean) as SessionActivity[];
  }
  session.push(...warmup);

  // 2) Focus (5 activities from current unit; coverage-first may add +1):
  // priority unattempted -> attempted not mastered -> mastered (rare) as filler
  const unattemptedFocus = focusActivities.filter(a => !isAttempted(a));
  const attemptedNotMasteredFocus = focusActivities.filter(a => isAttempted(a) && !mastered.includes(a));
  const masteredFocus = focusActivities.filter(a => mastered.includes(a));

  const focusOrdered = [
    ...randPick(unattemptedFocus, unattemptedFocus.length),
    ...randPick(attemptedNotMasteredFocus, attemptedNotMasteredFocus.length),
    ...randPick(masteredFocus, masteredFocus.length)
  ];
  // Coverage-first: if there exists any unattempted focus content, shift one slot from reinforcement to new
  const coverageBonus = unattemptedFocus.length > 0 ? 1 : 0;
  const desiredNewCount = Math.min(5 + coverageBonus, focusOrdered.length);
  const focusPicked = focusOrdered.slice(0, desiredNewCount).map(id => createSessionActivity(id, 'new')).filter(Boolean) as SessionActivity[];
  session.push(...focusPicked);

  // Track which focus activities already used so we can fill later if needed
  const usedIds = new Set(session.map(a => String(a.activityId)));

  // 3) Reinforcement (0–2). Choose weak previous (lowest success).
  // Coverage-first reduces reinforcement by 1 when we added +1 new above.
  let reinforcement: SessionActivity[] = [];
  if (weakCandidates.length > 0) {
    const maxReinforcement = Math.max(0, 2 - (desiredNewCount - 5));
    const weakPicked = weakCandidates.slice(0, maxReinforcement).map(id => createSessionActivity(id, 'reinforcement')).filter(Boolean) as SessionActivity[];
    reinforcement.push(...weakPicked);
  } else {
    // No weak activities.
    // - Eğer odak ünite 5 ise: pekiştirme yapma, toplam 7 kalsın (1 warmup + 5 odak + 1 ek odak gerekirse → 7).
    // - Eğer odak ünite 2 ise: henüz sorulmamış 2. ünite etkinliklerinden doldur ve toplamı 8'e tamamla.
    // - Diğer üniteler: en az 7'yi garanti et (yetersiz içerikte var olan kadar).
    const remainingFocus = focusActivities.filter(id => !usedIds.has(String(id)));
    const baseTarget = (focusUnit === 2) ? 8 : 7;
    const target = Math.max(baseTarget, 1 /*warmup*/ + desiredNewCount); // ensure we don't trim below desired new count
    while (session.length < target && remainingFocus.length > 0) {
      const next = remainingFocus.shift();
      if (!next) break;
      const act = createSessionActivity(next, 'new');
      if (act) session.push(act);
    }
  }

  session.push(...reinforcement);

  // Ensure no duplicates and trim if somehow exceeded 8
  const uniqueMap = new Map<string, SessionActivity>();
  for (const act of session) {
    uniqueMap.set(String(act.activityId), act);
  }
  let finalList = Array.from(uniqueMap.values());
  // Keep original order preference: warmup first, then focus, then reinforcement
  const orderScore = (a: SessionActivity): number => {
    switch(a.sessionRole){
      case 'warmup': return 0;
      case 'new': return 1;
      case 'reinforcement': return 2;
    }
  };
  finalList.sort((a,b) => orderScore(a) - orderScore(b));
  if (finalList.length > 8) finalList = finalList.slice(0,8);

  // If after all logic we ended up with <7 (content scarcity), just return what we have.
  return {
    date: new Date().toISOString().split('T')[0],
    activities: finalList,
    estimatedDuration: finalList.length <=7 ? 18 : 22,
    focusUnit,
  };
}

/**
 * Select random activities from candidates and convert to SessionActivity format
 */
// Legacy helpers retained for potential future feature toggles (currently unused after refactor)
/*
function selectRandomActivities(
  candidates: (ActivityType | string)[],
  count: number,
  _allStats: Record<string, ActivityStats>,
  role: 'warmup' | 'new' | 'reinforcement'
): SessionActivity[] { ... }
*/

/* function selectTopActivities(...) { ... } */

function createSessionActivity(
  activityId: ActivityType | string,
  role: 'warmup' | 'new' | 'reinforcement'
): SessionActivity | null {
  const metadata = getActivityMetadata(activityId);
  if (!metadata) {
    return null;
  }

  return {
    activityId,
    activityName: metadata.activityName,
    sessionRole: role,
    unitNumber: metadata.unitNumber,
  };
}

/**
 * Determine the focus unit for the session (most activities from which unit)
 */
// determineFocusUnit no longer needed (focus = highestAllowedUnit). Left commented for reference.
/* function determineFocusUnit(activities: SessionActivity[]): number { ... } */

/**
 * Get recommended session length based on child's age/progress
 * (Can be customized by parents in settings)
 * 
 * NOTE: Always returns 'medium' for consistent warmup reinforcement (2 warmup activities)
 * Short (1 warmup) doesn't allow proper high/weak mix for reinforcement
 */
export function getRecommendedSessionLength(
  _totalMasteredActivities: number
): 'short' | 'medium' | 'long' {
  return 'medium'; // Always medium for 2 warmup (50% high + 50% weak reinforcement)
  
  // Old dynamic logic (disabled - short doesn't work well with reinforcement strategy):
  // if (totalMasteredActivities < 10) return 'short';
  // else if (totalMasteredActivities < 30) return 'medium';
  // else return 'long';
}

/**
 * Check if it's been long enough since last session
 * With new daily unit advancement policy (up to 3 units/day), we allow multiple sessions per day
 * Returns true - sessions always available (progression policy handles daily limits)
 */
export function shouldShowNewSession(_lastSessionDate?: string): boolean {
  // Always allow new sessions - progression policy enforces daily unit advancement limits
  return true;
}

/**
 * Get session history summary for parent dashboard
 */
export interface SessionSummary {
  totalSessions: number;
  averageDuration: number;
  lastSessionDate?: string;
  currentStreak: number; // Consecutive days
}

export function getSessionSummary(
  sessionHistory: DailySession[]
): SessionSummary {
  if (sessionHistory.length === 0) {
    return {
      totalSessions: 0,
      averageDuration: 0,
      currentStreak: 0,
    };
  }

  // Calculate average duration
  const totalDuration = sessionHistory.reduce(
    (sum, session) => sum + session.estimatedDuration,
    0
  );
  const averageDuration = Math.round(totalDuration / sessionHistory.length);

  // Calculate current streak
  const sortedSessions = [...sessionHistory].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let currentStreak = 0;
  const today = new Date().toISOString().split('T')[0];
  let checkDate = today;
  
  for (const session of sortedSessions) {
    if (session.date === checkDate) {
      currentStreak++;
      // Move to previous day
      const prevDate = new Date(checkDate);
      prevDate.setDate(prevDate.getDate() - 1);
      checkDate = prevDate.toISOString().split('T')[0];
    } else {
      break; // Streak broken
    }
  }

  return {
    totalSessions: sessionHistory.length,
    averageDuration,
    lastSessionDate: sortedSessions[0]?.date,
    currentStreak,
  };
}
