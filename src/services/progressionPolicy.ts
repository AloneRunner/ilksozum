// Daily progression policy: at most three unit advancements per day per profile

import { ActivityStats } from '../types';
import { getActivityMetadata } from '../constants/activityMetadata';

export interface DailyPolicySnapshot {
  advances: number; // how many unit advancements happened today (0..3)
  lastAdvancedUnit?: number;
  // Units already counted today. Makes recordUnitAdvanced idempotent per unit,
  // so repeated detection of the same unlock cannot burn extra daily slots.
  advancedUnits?: number[];
  date: string; // YYYY-MM-DD (local time)
}

const MAX_DAILY_ADVANCES = 3;

function highWaterKey(profileId: string) {
  return `programHighWater_${profileId}`;
}

function policyKeyPrefix(profileId: string) {
  return `programPolicy_${profileId}_`;
}

/**
 * Highest unit N such that every unit 1..N has at least one program-scoped
 * attempt with real questions. Mode-less records predate the program/free
 * split and are counted as program, consistent with masteryEngine's
 * program-scoped filtering.
 */
function getHighestContiguousProgramUnit(allStats: Record<string, ActivityStats>): number {
  const programUnits = new Set<number>();

  for (const id of Object.keys(allStats || {})) {
    const stats = allStats[id];
    if (!stats || !Array.isArray(stats.history) || stats.history.length === 0) continue;

    const hasProgramAttempt = stats.history.some(
      attempt => (attempt.mode === 'program' || !attempt.mode) && attempt.total > 0
    );
    if (!hasProgramAttempt) continue;

    const meta = getActivityMetadata(id);
    if (meta && meta.unitNumber > 0) {
      programUnits.add(meta.unitNumber);
    }
  }

  let highest = 0;
  while (programUnits.has(highest + 1)) {
    highest += 1;
  }
  return highest;
}

/**
 * High water mark: the highest unit the child has ever reached/attempted.
 * Monotonic by design: once a unit is reached it is NEVER locked back.
 *
 * The stored value is only ever raised (using history-derived evidence as a
 * floor for legacy profiles that predate this key). It must never be lowered
 * from history: the per-activity attempt history is capped, so old
 * program-mode records naturally fall out of it over time — recomputing and
 * clamping here is what used to silently reset children's progress.
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

  const derived = getHighestContiguousProgramUnit(allStats);
  const next = Math.max(stored, derived, 1);
  if (next > stored) {
    try { window.localStorage.setItem(highWaterKey(profileId), String(next)); } catch {}
  }
  return next;
}

function today(): string {
  // Local calendar day — toISOString() is UTC and would roll the daily limit
  // over at 03:00 instead of midnight in Türkiye (UTC+3).
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

function key(profileId: string) {
  return `${policyKeyPrefix(profileId)}${today()}`;
}

/** Remove per-day policy snapshots except the one for `keepKey` (pass null to remove all). */
function removePolicySnapshots(profileId: string, keepKey: string | null) {
  try {
    const prefix = policyKeyPrefix(profileId);
    const stale: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(prefix) && k !== keepKey) stale.push(k);
    }
    stale.forEach(k => window.localStorage.removeItem(k));
  } catch {}
}

export function getPolicyToday(profileId: string): DailyPolicySnapshot {
  const todayKey = key(profileId);
  try {
    const raw = window.localStorage.getItem(todayKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.date === today()) return parsed;
    }
  } catch {}
  const snapshot: DailyPolicySnapshot = { advances: 0, advancedUnits: [], date: today() };
  // Day rolled over: drop stale dated snapshots so they don't accumulate forever.
  removePolicySnapshots(profileId, todayKey);
  try { window.localStorage.setItem(todayKey, JSON.stringify(snapshot)); } catch {}
  return snapshot;
}

export function canAdvanceUnitToday(profileId: string): boolean {
  const snap = getPolicyToday(profileId);
  return (snap.advances || 0) < MAX_DAILY_ADVANCES;
}

export function recordUnitAdvanced(profileId: string, unitNumber: number) {
  const snap = getPolicyToday(profileId);
  const advancedUnits = Array.isArray(snap.advancedUnits) ? snap.advancedUnits : [];

  if (!advancedUnits.includes(unitNumber)) {
    const next: DailyPolicySnapshot = {
      ...snap,
      advances: Math.min(MAX_DAILY_ADVANCES, (snap.advances || 0) + 1),
      lastAdvancedUnit: unitNumber,
      advancedUnits: [...advancedUnits, unitNumber],
    };
    try { window.localStorage.setItem(key(profileId), JSON.stringify(next)); } catch {}
  }

  try {
    const raw = window.localStorage.getItem(highWaterKey(profileId));
    const stored = raw ? parseInt(raw, 10) : 1;
    const nextHighWater = Math.max(Number.isNaN(stored) ? 1 : stored, unitNumber, 1);
    window.localStorage.setItem(highWaterKey(profileId), String(nextHighWater));
  } catch {}
}

/**
 * Remove all progression bookkeeping for a profile (high-water mark and daily
 * policy snapshots). Must be called whenever a profile's progress is reset —
 * otherwise the stale high-water mark instantly re-unlocks every old unit on
 * the freshly reset profile.
 */
export function clearProgressionData(profileId: string) {
  try { window.localStorage.removeItem(highWaterKey(profileId)); } catch {}
  removePolicySnapshots(profileId, null);
}

export function getAllowedUnitCeiling(profileId: string, currentUnlockedUnits: Set<number>): number {
  const snap = getPolicyToday(profileId);
  let maxUnlocked = 1;
  currentUnlockedUnits.forEach(u => { if (u > maxUnlocked) maxUnlocked = u; });

  // After 3 advancements, freeze at the last advanced unit without hiding
  // units that were already unlocked by previous days or a repaired high-water mark.
  if ((snap.advances || 0) >= MAX_DAILY_ADVANCES && snap.lastAdvancedUnit) {
    return Math.max(snap.lastAdvancedUnit, maxUnlocked);
  }

  // Never reduce access to units the child has already unlocked.
  return Math.max(1, maxUnlocked);
}
