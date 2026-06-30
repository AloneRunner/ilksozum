/**
 * Loyalty / Sadakat Premium Service
 *
 * Rolling 30-day window: a user who opens the app on at least REQUIRED_DAYS distinct
 * days within the last WINDOW_DAYS earns REWARD_DAYS of free Premium. The reward
 * renews automatically once the previous window expires (provided the user is still
 * active). Storage is purely localStorage — no backend.
 */

const OPEN_DAYS_KEY = 'loyalty_openDays_v1';
const PREMIUM_UNTIL_KEY = 'loyalty_premiumUntil_v1';
const PENDING_CELEBRATION_KEY = 'loyalty_pendingCelebration_v1';
const FIRST_AWARD_TIMESTAMP_KEY = 'loyalty_firstAwardAt_v1';

export const LOYALTY_REQUIRED_DAYS = 20;
export const LOYALTY_WINDOW_DAYS = 30;
export const LOYALTY_REWARD_DAYS = 30;
const RETENTION_DAYS = 60; // keep up to 60 days of history (window + buffer)

const DAY_MS = 24 * 60 * 60 * 1000;

function todayKey(): string {
  return new Date().toISOString().split('T')[0];
}

function dayKey(d: Date): string {
  return d.toISOString().split('T')[0];
}

function readDayList(): string[] {
  try {
    const raw = window.localStorage.getItem(OPEN_DAYS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((s): s is string => typeof s === 'string');
  } catch {
    return [];
  }
}

function writeDayList(list: string[]): void {
  try {
    window.localStorage.setItem(OPEN_DAYS_KEY, JSON.stringify(list));
  } catch {}
}

/** Record that the app was opened today. Idempotent — only one entry per day. */
export function recordTodayOpen(): void {
  const today = todayKey();
  const list = readDayList();
  if (!list.includes(today)) list.push(today);

  // Trim entries older than RETENTION_DAYS to bound storage size.
  const cutoff = dayKey(new Date(Date.now() - RETENTION_DAYS * DAY_MS));
  const pruned = list.filter(d => d >= cutoff);
  writeDayList(pruned);
}

/** Distinct days the app was opened within the last LOYALTY_WINDOW_DAYS. */
export function getOpenDaysInWindow(): string[] {
  const cutoff = dayKey(new Date(Date.now() - (LOYALTY_WINDOW_DAYS - 1) * DAY_MS));
  return readDayList().filter(d => d >= cutoff);
}

/** Timestamp until which loyalty premium is granted. 0 if never granted. */
export function getLoyaltyPremiumUntil(): number {
  try {
    const raw = window.localStorage.getItem(PREMIUM_UNTIL_KEY);
    if (!raw) return 0;
    const v = parseInt(raw, 10);
    return isNaN(v) ? 0 : v;
  } catch {
    return 0;
  }
}

export function isLoyaltyPremiumActive(): boolean {
  return Date.now() < getLoyaltyPremiumUntil();
}

/**
 * If the user qualifies AND a current loyalty grant is not already active,
 * grant REWARD_DAYS of premium and queue a celebration. Returns true when a
 * new grant was awarded on this call.
 */
export function checkAndAwardLoyalty(): boolean {
  if (isLoyaltyPremiumActive()) return false;
  const eligible = getOpenDaysInWindow().length >= LOYALTY_REQUIRED_DAYS;
  if (!eligible) return false;

  const newUntil = Date.now() + LOYALTY_REWARD_DAYS * DAY_MS;
  try {
    window.localStorage.setItem(PREMIUM_UNTIL_KEY, String(newUntil));
    window.localStorage.setItem(PENDING_CELEBRATION_KEY, '1');
    if (!window.localStorage.getItem(FIRST_AWARD_TIMESTAMP_KEY)) {
      window.localStorage.setItem(FIRST_AWARD_TIMESTAMP_KEY, String(Date.now()));
    }
  } catch {}
  return true;
}

export function hasPendingCelebration(): boolean {
  try {
    return window.localStorage.getItem(PENDING_CELEBRATION_KEY) === '1';
  } catch {
    return false;
  }
}

export function consumeCelebration(): void {
  try { window.localStorage.setItem(PENDING_CELEBRATION_KEY, '0'); } catch {}
}

/** True once the user has ever earned a loyalty award (used to show the badge forever). */
export function hasEverEarnedLoyalty(): boolean {
  try {
    return !!window.localStorage.getItem(FIRST_AWARD_TIMESTAMP_KEY);
  } catch {
    return false;
  }
}

export interface LoyaltySnapshot {
  openDaysCount: number;
  requiredDays: number;
  windowDays: number;
  rewardDays: number;
  isActive: boolean;
  until: number;
  hasEverEarned: boolean;
}

export function getLoyaltySnapshot(): LoyaltySnapshot {
  return {
    openDaysCount: getOpenDaysInWindow().length,
    requiredDays: LOYALTY_REQUIRED_DAYS,
    windowDays: LOYALTY_WINDOW_DAYS,
    rewardDays: LOYALTY_REWARD_DAYS,
    isActive: isLoyaltyPremiumActive(),
    until: getLoyaltyPremiumUntil(),
    hasEverEarned: hasEverEarnedLoyalty(),
  };
}
