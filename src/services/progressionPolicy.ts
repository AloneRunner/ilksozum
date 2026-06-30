// Daily progression policy: at most three unit advancements per day per profile

import { ActivityStats } from '../types';
import { getActivityMetadata } from '../constants/activityMetadata';

export interface DailyPolicySnapshot {
  advances: number; // how many unit advancements happened today (0..3)
  lastAdvancedUnit?: number;
  date: string; // YYYY-MM-DD
}

function highWaterKey(profileId: string) {
  return `programHighWater_${profileId}`;
}

function getExplicitModeHistorySnapshot(allStats: Record<string, ActivityStats>) {
  let hasExplicitModeHistory = false;
  const explicitProgramUnits = new Set<number>();

  for (const id of Object.keys(allStats || {})) {
    const stats = allStats[id];
    if (!stats || !Array.isArray(stats.history) || stats.history.length === 0) continue;

    const hasExplicitMode = stats.history.some(attempt => attempt.mode === 'program' || attempt.mode === 'free');
    if (hasExplicitMode) {
      hasExplicitModeHistory = true;
    }

    const hasProgramAttempt = stats.history.some(attempt => attempt.mode === 'program' && attempt.total > 0);
    if (!hasProgramAttempt) continue;

    const meta = getActivityMetadata(id);
    if (meta && meta.unitNumber > 0) {
      explicitProgramUnits.add(meta.unitNumber);
    }
  }

  let highestContiguousProgramUnit = 0;
  while (explicitProgramUnits.has(highestContiguousProgramUnit + 1)) {
    highestContiguousProgramUnit += 1;
  }

  return { hasExplicitModeHistory, highestContiguousProgramUnit };
}

/**
 * High water mark: the highest unit the child has ever reached/attempted.
 * Once a unit is reached, it must NEVER be locked back. Without this, recent
 * low scores (last-6 window) can demote previously unlocked units, dragging
 * the child backwards (e.g. from Unit 4 down to Unit 2).
 */
export function getProgramHighWaterUnit(
  profileId: string,
  allStats: Record<string, ActivityStats>
): number {
  let stored = 1;
  try {
    const raw = window.localStorage.getItem(highWaterKey(profileId));
    if (raw) {
      const v = parseInt(raw, 10);
      if (!isNaN(v) && v > 1) stored = v;
    }
  } catch {}

  const { hasExplicitModeHistory, highestContiguousProgramUnit } = getExplicitModeHistorySnapshot(allStats);

  let sanitizedStored = stored;
  if (hasExplicitModeHistory) {
    sanitizedStored = highestContiguousProgramUnit > 0
      ? Math.min(stored, highestContiguousProgramUnit + 1)
      : 1;
  }

  const next = Math.max(sanitizedStored, highestContiguousProgramUnit, 1);
  if (next !== stored) {
    try { window.localStorage.setItem(highWaterKey(profileId), String(next)); } catch {}
  }
  return next;
}

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function key(profileId: string) {
  return `programPolicy_${profileId}_${today()}`;
}

export function getPolicyToday(profileId: string): DailyPolicySnapshot {
  try {
    const raw = window.localStorage.getItem(key(profileId));
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.date === today()) return parsed;
    }
  } catch {}
  const snapshot: DailyPolicySnapshot = { advances: 0, date: today() };
  try { window.localStorage.setItem(key(profileId), JSON.stringify(snapshot)); } catch {}
  return snapshot;
}

export function canAdvanceUnitToday(profileId: string): boolean {
  const snap = getPolicyToday(profileId);
  return (snap.advances || 0) < 3;
}

export function recordUnitAdvanced(profileId: string, unitNumber: number) {
  const snap = getPolicyToday(profileId);
  const next: DailyPolicySnapshot = { ...snap, advances: Math.min(3, (snap.advances || 0) + 1), lastAdvancedUnit: unitNumber };
  try { window.localStorage.setItem(key(profileId), JSON.stringify(next)); } catch {}
  try {
    const raw = window.localStorage.getItem(highWaterKey(profileId));
    const stored = raw ? parseInt(raw, 10) : 1;
    const nextHighWater = Math.max(Number.isNaN(stored) ? 1 : stored, unitNumber, 1);
    window.localStorage.setItem(highWaterKey(profileId), String(nextHighWater));
  } catch {}
}

export function getAllowedUnitCeiling(profileId: string, currentUnlockedUnits: Set<number>): number {
  const snap = getPolicyToday(profileId);
  let maxUnlocked = 1;
  currentUnlockedUnits.forEach(u => { if (u > maxUnlocked) maxUnlocked = u; });
  
  // After 3 advancements, freeze at the last advanced unit without hiding
  // units that were already unlocked by previous days or a repaired high-water mark.
  if ((snap.advances || 0) >= 3 && snap.lastAdvancedUnit) {
    return Math.max(snap.lastAdvancedUnit, maxUnlocked);
  }
  
  // Otherwise, don't reduce access: keep already-unlocked units available.
  // (Previously this computed a smaller 'baseCeiling' and returned the min,
  // which could demote previously unlocked units.)
  // Important: do not *reduce* access to units the child has already unlocked.
  // Previously the function returned Math.min(baseCeiling, maxUnlocked) which could
  // lower the allowed ceiling below the already-unlocked units when `baseCeiling` was small.
  // That caused children who had reached higher units to be shown only Unit 1 again
  // when `advances` for the day was 0. To avoid demoting progress we return the
  // already-unlocked maximum unit here (unless a freeze due to 3 daily advances applies).
  return Math.max(1, maxUnlocked);
}
