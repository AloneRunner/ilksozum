/**
 * Mastery Engine for Unit-Based Program Mode
 * Implements differentiated mastery rules (Wide vs Narrow pool)
 * and activity/unit unlock logic
 */

import { 
  ActivityType, 
  ActivityStats, 
  AttemptRecord,
  MasteryPoolType, 
  PrerequisiteRule,
  ParentOverride 
} from '../types.ts';
import { ACTIVITY_METADATA_MAP, getActivityMetadata } from '../constants/activityMetadata';
import { UNIT_DEFINITIONS, getUnitDefinition } from '../constants/unitDefinitions';
import { getProgramHighWaterUnit } from './progressionPolicy';

export const PROGRAM_WIDE_MASTERY_THRESHOLD = 0.75;

/**
 * Check if an activity has been mastered based on its pool type
 * 
 * WIDE POOL: Requires 75% success rate in recent attempts (program mode 100%, free mode 50% weight)
 * NARROW POOL: Requires 100% in last 2 consecutive perfect sessions (program mode only)
 */
function getProgramScopedAttempts(stats: ActivityStats | undefined): AttemptRecord[] {
  if (!stats || !Array.isArray(stats.history)) return [];
  return stats.history.filter(attempt => attempt.mode === 'program' || !attempt.mode);
}

export function isMasteryAchieved(
  activityId: ActivityType | string,
  stats: ActivityStats | undefined
): boolean {
  if (!stats || !stats.history || stats.history.length === 0) {
    return false; // No attempts yet
  }

  const metadata = getActivityMetadata(activityId);
  if (!metadata) {
    console.warn(`No metadata found for activity: ${activityId}`);
    return false;
  }

  const { masteryRule } = metadata;
  const { poolType } = masteryRule;

  if (poolType === MasteryPoolType.WIDE) {
  // WIDE POOL: Check last N attempts for success rate with mode weighting
  // Updated: Reduced from 15 to 5 for more reasonable child progression
  const window = masteryRule.recentAttemptsWindow || 5;
    const threshold = Math.min(
      masteryRule.masteryThreshold ?? PROGRAM_WIDE_MASTERY_THRESHOLD,
      PROGRAM_WIDE_MASTERY_THRESHOLD
    );
    
    const recentAttempts = stats.history.slice(-window);
    if (recentAttempts.length < window) {
      return false; // Need at least 'window' attempts
    }

    // Apply weighting: program mode = 1.0, free mode = 0.5
    let weightedCorrect = 0;
    let weightedTotal = 0;
    for (const attempt of recentAttempts) {
      const weight = attempt.mode === 'program' ? 1.0 : 0.5;
      weightedCorrect += attempt.score * weight;
      weightedTotal += attempt.total * weight;
    }
    
    if (weightedTotal === 0) return false;
    
    const successRate = weightedCorrect / weightedTotal;
    return successRate >= threshold;
  } else {
    // NARROW POOL: Check last N sessions for perfect scores (program mode only)
    const requiredPerfect = masteryRule.perfectSessionsRequired || 2;
    
    // Filter to program mode attempts only
    const programAttempts = stats.history.filter(a => a.mode === 'program' || !a.mode);
    const recentSessions = programAttempts.slice(-requiredPerfect);
    if (recentSessions.length < requiredPerfect) {
      return false; // Need at least 'requiredPerfect' program sessions
    }

    // All recent program sessions must be perfect (100%)
    return recentSessions.every((session) => 
      session.total > 0 && session.score === session.total
    );
  }
}

/**
 * Check if a prerequisite rule is satisfied
 * Handles complex prerequisite logic with AND/OR/MIN_CATEGORIES
 */
export function isPrerequisiteSatisfied(
  prerequisite: PrerequisiteRule | null,
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>
): boolean {
  if (prerequisite === null) {
    return true; // No prerequisite (Kilitsiz)
  }

  // Simple prerequisite: single activity ID
  if (typeof prerequisite === 'string' || typeof prerequisite === 'number') {
    const activityId = prerequisite.toString();
    
    // Check if it's an object category
    if (masteredObjectCategories.has(activityId)) {
      return true;
    }
    
    // Check if it's a regular activity
    const stats = allStats[activityId];
    return isMasteryAchieved(activityId, stats);
  }

  // Complex prerequisite with AND/OR/MIN_CATEGORIES
  if ('type' in prerequisite) {
    if (prerequisite.type === 'AND') {
      // All conditions must be satisfied
      return prerequisite.conditions.every((condition) =>
        isPrerequisiteSatisfied(condition, allStats, masteredObjectCategories)
      );
    } else if (prerequisite.type === 'OR') {
      // At least one condition must be satisfied
      return prerequisite.conditions.some((condition) =>
        isPrerequisiteSatisfied(condition, allStats, masteredObjectCategories)
      );
    } else if (prerequisite.type === 'MIN_CATEGORIES') {
      // Minimum number of object categories must be mastered
      return masteredObjectCategories.size >= prerequisite.count;
    }
  }

  console.warn('Unknown prerequisite type:', prerequisite);
  return false;
}

/**
 * Check if an activity is unlocked for the child
 * An activity is unlocked if:
 * 1. Its unit is unlocked
 * 2. Its prerequisites are satisfied
 * 3. OR parent override is active
 */
export function isActivityUnlocked(
  activityId: ActivityType | string,
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>,
  unlockedUnits: Set<number>,
  parentOverrides?: ParentOverride[]
): boolean {
  // Check parent override first
  if (parentOverrides) {
    const override = parentOverrides.find(
      (o) => o.activityId === activityId && o.expiresAt > Date.now()
    );
    if (override) {
      return true; // Parent Joker active
    }
  }

  const metadata = getActivityMetadata(activityId);
  if (!metadata) {
    console.warn(`No metadata found for activity: ${activityId}`);
    return false;
  }

  // Check if unit is unlocked
  if (!unlockedUnits.has(metadata.unitNumber)) {
    return false;
  }

  // Check if prerequisites are satisfied
  return isPrerequisiteSatisfied(
    metadata.prerequisite,
    allStats,
    masteredObjectCategories
  );
}

/**
 * Check if a unit is unlocked
 * A unit is unlocked if all its prerequisite units are 75% complete
 */
export function isUnitUnlocked(
  unitNumber: number,
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>,
  parentOverrides?: ParentOverride[]
): boolean {
  const unitDef = getUnitDefinition(unitNumber);
  if (!unitDef) {
    console.warn(`No unit definition found for unit: ${unitNumber}`);
    return false;
  }

  // First unit is always unlocked
  if (unitNumber === 1) {
    return true;
  }

  // Check if all prerequisite units are completed
  return unitDef.prerequisiteUnits.every((prereqUnitNum) => {
    return isUnitComplete(prereqUnitNum, allStats, masteredObjectCategories, parentOverrides);
  });
}

/**
 * Check if a unit is complete (ready to unlock next unit)
 * Uses early progress percentage to match what the user sees in UI
 */
export function isUnitComplete(
  unitNumber: number,
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>,
  parentOverrides?: ParentOverride[]
): boolean {
  const unitDef = getUnitDefinition(unitNumber);
  if (!unitDef) {
    return false;
  }

  // New rule: must attempt every activity in the unit at least once
  if (!hasUnitMinimumCoverage(unitNumber, allStats, masteredObjectCategories, parentOverrides)) {
    return false;
  }

  // Use display-oriented success (parents' report logic; ignores unattempted items)
  const progressPercent = getUnitDisplaySuccessPercentage(unitNumber, allStats, masteredObjectCategories, parentOverrides);
  const thresholdPercent = unitDef.completionThreshold * 100;
  
  return progressPercent >= thresholdPercent;
}

/**
 * Get all unlocked units for the current profile
 */
export function getUnlockedUnits(
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>,
  parentOverrides?: ParentOverride[]
): Set<number> {
  const unlockedUnits = new Set<number>();

  for (const unit of UNIT_DEFINITIONS) {
    if (isUnitUnlocked(unit.unitNumber, allStats, masteredObjectCategories, parentOverrides)) {
      unlockedUnits.add(unit.unitNumber);
    }
  }

  return unlockedUnits;
}

/**
 * Get unit completion percentage (0-100)
 */
export function getUnitCompletionPercentage(
  unitNumber: number,
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>,
  parentOverrides?: ParentOverride[]
): number {
  const unitDef = getUnitDefinition(unitNumber);
  if (!unitDef) {
    return 0;
  }

  const masteredCount = unitDef.activities.filter((activityId) => {
    // Check if it's an object category
    if (typeof activityId === 'string' && masteredObjectCategories.has(activityId)) {
      return true;
    }
    
    // Check if it's a regular activity
    const stats = allStats[activityId as string];
    // If a parent override marks this activity as ignored for progress and is active, count it as covered
    if (parentOverrides) {
      const override = parentOverrides.find(o => o.activityId === activityId && o.expiresAt > Date.now() && o.ignoreForProgress);
      if (override) return true;
    }

    return isMasteryAchieved(activityId, stats);
  }).length;

  return Math.round((masteredCount / unitDef.activities.length) * 100);
}

/**
 * Early progress metric to avoid showing 0% at the beginning.
 * Calculates an average success rate across all activities in the unit, using
 * the same aggregated correctness data surfaced in the parent report. Mastered
 * activities (including mastered object categories) count as 100%.
 */
export function getUnitEarlyProgressPercentage(
  unitNumber: number,
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>
  ,
  parentOverrides?: ParentOverride[]
): number {
  const unitDef = getUnitDefinition(unitNumber);
  if (!unitDef) return 0;

  const totalActivities = unitDef.activities.length || 1;
  let cumulativeSuccess = 0;

  for (const activityId of unitDef.activities) {
    // Mastered object categories carry over a perfect success score
    if (typeof activityId === 'string' && masteredObjectCategories.has(activityId)) {
      cumulativeSuccess += 1;
      continue;
    }
    // If a parent override marks this activity as ignored for progress and is active, treat as perfect
    if (parentOverrides) {
      const override = parentOverrides.find(o => o.activityId === activityId && o.expiresAt > Date.now() && o.ignoreForProgress);
      if (override) {
        cumulativeSuccess += 1;
        continue;
      }
    }
    const statsKey = typeof activityId === 'string' ? activityId : String(activityId);
    const stats = allStats[statsKey];
    if (!stats) {
      continue; // No attempts logged yet
    }

    if (isMasteryAchieved(activityId, stats)) {
      cumulativeSuccess += 1;
      continue;
    }

    // Derive success directly from recorded attempts (mirrors parent report logic)
    let correctSum = stats.totalCorrect || 0;
    let questionSum = stats.totalQuestions || 0;

    if (questionSum === 0) {
      const attemptHistory = (stats.history || []).filter((entry) => entry.total > 0);
      for (const attempt of attemptHistory) {
        correctSum += attempt.score;
        questionSum += attempt.total;
      }
    }

    if (questionSum > 0) {
      const successRate = Math.min(Math.max(correctSum / questionSum, 0), 1);
      cumulativeSuccess += successRate;
    } else if (stats.attempts > 0) {
      // Fallback: if attempts exist but totals were not captured, grant minimal visible progress
      cumulativeSuccess += 0.2;
    }
  }

  const progressPercent = Math.round((cumulativeSuccess / totalActivities) * 100);
  return Math.max(0, Math.min(100, progressPercent));
}

/**
 * Display-oriented success percentage for a unit (0-100).
 * Averages only over activities that have any recorded questions/attempts,
 * mirroring what parents see in detailed reports. Unattempted items are ignored
 * for the display to prevent artificially low percentages at the start.
 */
export function getUnitDisplaySuccessPercentage(
  unitNumber: number,
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>
  ,
  parentOverrides?: ParentOverride[]
): number {
  const unitDef = getUnitDefinition(unitNumber);
  if (!unitDef) return 0;

  let included = 0;
  let cumulative = 0;

  for (const activityId of unitDef.activities) {
    if (typeof activityId === 'string' && masteredObjectCategories.has(activityId)) {
      cumulative += 1;
      included += 1;
      continue;
    }

    // If a parent override marks this activity as ignored for progress and is active, treat as perfect
    if (parentOverrides) {
      const override = parentOverrides.find(o => o.activityId === activityId && o.expiresAt > Date.now() && o.ignoreForProgress);
      if (override) {
        cumulative += 1;
        included += 1;
        continue;
      }
    }

    const key = typeof activityId === 'string' ? activityId : String(activityId);
    const stats = allStats[key];
    if (!stats) continue;

    // Prefer aggregated totals; fall back to history
    let correct = stats.totalCorrect || 0;
    let total = stats.totalQuestions || 0;
    if (total === 0) {
      const history = (stats.history || []).filter(h => h.total > 0);
      for (const h of history) {
        correct += h.score;
        total += h.total;
      }
    }

    if (total > 0) {
      cumulative += Math.min(Math.max(correct / total, 0), 1);
      included += 1;
    } else if (stats.attempts > 0) {
      // If there were attempts but no totals captured, show a small placeholder progress
      cumulative += 0.2;
      included += 1;
    }
  }

  if (included === 0) return 0;
  return Math.round((cumulative / included) * 100);
}

/**
 * Program-mode variant: compute unit display percentage using only the last
 * `recentAttemptsWindow` attempts per activity (default 7). This makes program
 * progression responsive to recent improvement while leaving reporting logic
 * unchanged.
 */
export function getUnitDisplaySuccessPercentageForProgramMode(
  unitNumber: number,
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>,
  parentOverrides?: ParentOverride[],
  recentAttemptsWindow: number = 6
): number {
  const unitDef = getUnitDefinition(unitNumber);
  if (!unitDef) return 0;

  let included = 0;
  let cumulative = 0;

  for (const activityId of unitDef.activities) {
    if (typeof activityId === 'string' && masteredObjectCategories.has(activityId)) {
      cumulative += 1;
      included += 1;
      continue;
    }

    // If a parent override marks this activity as ignored for progress and is active, treat as perfect
    if (parentOverrides) {
      const override = parentOverrides.find(o => o.activityId === activityId && o.expiresAt > Date.now() && o.ignoreForProgress);
      if (override) {
        cumulative += 1;
        included += 1;
        continue;
      }
    }

    const key = typeof activityId === 'string' ? activityId : String(activityId);
    const stats = allStats[key];
    const programScopedAttempts = getProgramScopedAttempts(stats);

    // Prefer history (most recent attempts). If not available, fall back to aggregated totals.
    let recentAttempts: AttemptRecord[] = [];
    if (programScopedAttempts.length > 0) {
      recentAttempts = programScopedAttempts.slice(-recentAttemptsWindow);
    }

    if (recentAttempts.length > 0) {
      // Compute success as sum(score)/sum(total) across recent attempts
      let correct = 0;
      let total = 0;
      for (const h of recentAttempts) {
        if (h.total > 0) {
          correct += h.score;
          total += h.total;
        }
      }
      if (total > 0) {
        cumulative += Math.min(Math.max(correct / total, 0), 1);
        included += 1;
        continue;
      }
      // If recent attempts exist but totals are zero, fall through to aggregated fallback
    }

    // Aggregated fallback is only safe for truly legacy stats with no attempt history.
    // If recent history exists but contains only free-mode attempts, do not let those
    // contaminate Program Mode progression.
    const hasAnyHistory = Boolean(stats && Array.isArray(stats.history) && stats.history.length > 0);
    if (stats && !hasAnyHistory) {
      let correct = stats.totalCorrect || 0;
      let total = stats.totalQuestions || 0;
      if (total > 0) {
        cumulative += Math.min(Math.max(correct / total, 0), 1);
        included += 1;
        continue;
      }

      if (stats.attempts > 0) {
        cumulative += 0.2;
        included += 1;
        continue;
      }
    }
    // No data -> skip
  }

  if (included === 0) return 0;
  return Math.round((cumulative / included) * 100);
}

export function isUnitCompleteForProgramMode(
  unitNumber: number,
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>,
  parentOverrides?: ParentOverride[],
  recentAttemptsWindow: number = 6
): boolean {
  const unitDef = getUnitDefinition(unitNumber);
  if (!unitDef) {
    return false;
  }

  // Coverage rule: do not let one stubborn activity block the whole unit.
  if (!hasUnitMinimumCoverage(unitNumber, allStats, masteredObjectCategories, parentOverrides)) {
    return false;
  }

  const progressPercent = getUnitDisplaySuccessPercentageForProgramMode(unitNumber, allStats, masteredObjectCategories, parentOverrides, recentAttemptsWindow);
  const thresholdPercent = unitDef.completionThreshold * 100;
  return progressPercent >= thresholdPercent;
}

export function isUnitUnlockedForProgramMode(
  unitNumber: number,
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>,
  parentOverrides?: ParentOverride[],
  recentAttemptsWindow: number = 6,
  profileId?: string | null
): boolean {
  const unitDef = getUnitDefinition(unitNumber);
  if (!unitDef) {
    console.warn(`No unit definition found for unit: ${unitNumber}`);
    return false;
  }

  if (unitNumber === 1) return true;

  // High-water guard: once a unit was reached, never lock it again.
  if (profileId) {
    try {
      const high = getProgramHighWaterUnit(profileId, allStats);
      if (unitNumber <= high) return true;
    } catch {}
  }

  return unitDef.prerequisiteUnits.every((prereqUnitNum) => {
    return isUnitCompleteForProgramMode(prereqUnitNum, allStats, masteredObjectCategories, parentOverrides, recentAttemptsWindow);
  });
}

export function getUnlockedUnitsForProgramMode(
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>,
  parentOverrides?: ParentOverride[],
  recentAttemptsWindow: number = 6,
  profileId?: string | null
): Set<number> {
  const unlockedUnits = new Set<number>();

  for (const unit of UNIT_DEFINITIONS) {
    if (isUnitUnlockedForProgramMode(unit.unitNumber, allStats, masteredObjectCategories, parentOverrides, recentAttemptsWindow, profileId)) {
      unlockedUnits.add(unit.unitNumber);
    }
  }

  // Floor: ensure all units up to the high-water mark are present.
  if (profileId) {
    try {
      const high = getProgramHighWaterUnit(profileId, allStats);
      for (let u = 1; u <= high; u++) unlockedUnits.add(u);
    } catch {}
  }

  return unlockedUnits;
}

/**
 * Get an activity's recent success percentage for program mode (0-100).
 * Uses only the last `recentAttemptsWindow` attempts when available,
 * falling back to aggregated totals if not. This is used to show per-activity
 * indicators in program-mode UI.
 */
export function getActivityProgramSuccessPercentage(
  activityId: ActivityType | string,
  allStats: Record<string, ActivityStats>,
  recentAttemptsWindow: number = 6
): number {
  const key = typeof activityId === 'string' ? activityId : String(activityId);
  const stats = allStats[key];
  if (!stats) return 0;
  const programScopedAttempts = getProgramScopedAttempts(stats);

  // Prefer recent history
  if (programScopedAttempts.length > 0) {
    const recent = programScopedAttempts.slice(-recentAttemptsWindow);
    let correct = 0;
    let total = 0;
    for (const h of recent) {
      if (h.total > 0) {
        correct += h.score;
        total += h.total;
      }
    }
    if (total > 0) return Math.round((correct / total) * 100);
  }

  // Fallback to aggregated totals only when there is no recorded history at all.
  const hasAnyHistory = Array.isArray(stats.history) && stats.history.length > 0;
  if (hasAnyHistory) return 0;

  const correct = stats.totalCorrect || 0;
  const total = stats.totalQuestions || 0;
  if (total > 0) return Math.round((correct / total) * 100);

  return 0;
}

/**
 * Coverage rule: a unit has minimum coverage when enough activities have been
 * attempted to meet the unit completion ratio. This keeps progression moving
 * without letting large parts of a unit be skipped.
 */
export function hasUnitMinimumCoverage(
  unitNumber: number,
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>
  ,
  parentOverrides?: ParentOverride[]
): boolean {
  const unitDef = getUnitDefinition(unitNumber);
  if (!unitDef) return false;

  const hasAttempt = (id: ActivityType | string): boolean => {
    // Object categories can be counted via mastered set
    if (typeof id === 'string' && masteredObjectCategories.has(id)) return true;
    // If a parent override marks this activity as ignored for progress and is active, count as attempted
    if (parentOverrides) {
      const override = parentOverrides.find(o => o.activityId === id && o.expiresAt > Date.now() && o.ignoreForProgress);
      if (override) return true;
    }
    const key = typeof id === 'string' ? id : String(id);
    const stats = allStats[key];
    if (!stats) return false;
    if ((stats.totalQuestions || 0) > 0) return true;
    const hist = (stats.history || []).filter(h => h.total > 0);
    return hist.length > 0;
  };

  const attemptedCount = unitDef.activities.filter((activityId) => hasAttempt(activityId)).length;
  const requiredAttemptCount = Math.max(1, Math.ceil(unitDef.activities.length * unitDef.completionThreshold));

  return attemptedCount >= requiredAttemptCount;
}

/**
 * Get all activities that are currently unlocked and not yet mastered
 * (Available for today's session)
 */
export function getAvailableActivities(
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>,
  parentOverrides?: ParentOverride[]
): (ActivityType | string)[] {
  const unlockedUnits = getUnlockedUnits(allStats, masteredObjectCategories, parentOverrides);
  const availableActivities: (ActivityType | string)[] = [];

  for (const activityId of Object.keys(ACTIVITY_METADATA_MAP)) {
    // Skip if already mastered
    if (isMasteryAchieved(activityId, allStats[activityId])) {
      continue;
    }

    // Check if unlocked
    if (isActivityUnlocked(
      activityId,
      allStats,
      masteredObjectCategories,
      unlockedUnits,
      parentOverrides
    )) {
      availableActivities.push(activityId);
    }
  }

  return availableActivities;
}

/**
 * Get all activities that have been mastered
 * (Available for warmup/reinforcement in session)
 */
export function getMasteredActivities(
  allStats: Record<string, ActivityStats>,
  masteredObjectCategories: Set<string>
): (ActivityType | string)[] {
  const masteredActivities: (ActivityType | string)[] = [];

  for (const activityId of Object.keys(ACTIVITY_METADATA_MAP)) {
    if (isMasteryAchieved(activityId, allStats[activityId])) {
      masteredActivities.push(activityId);
    }
  }

  // Add mastered object categories
  masteredObjectCategories.forEach((category) => {
    masteredActivities.push(category);
  });

  return masteredActivities;
}
