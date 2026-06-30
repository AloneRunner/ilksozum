import React, { useState, useCallback } from 'react';
import { ActivityType, ActivityStats, AttemptRecord, ActivityCategory, ParentOverride } from '../types.ts';
import { ALL_SUB_ACHIEVEMENTS, LETTER_GROUPS, OBJECT_CATEGORIES, LETTER_SOUND_ACTIVITIES } from '../constants.ts';
import { getActivityMetadata } from '../constants/activityMetadata';
import { createObjectChoiceRounds, fetchConceptActivityData, fetchLetterActivityData, fetchSyllableWordsForGroup, fetchFiveWOneHBySubKey } from '../services/contentService.ts';
import { shuffleArray } from '../utils.ts';
import { t, getCurrentLanguage } from '../i18n/index.ts';
import { buildDailySession, getRecommendedSessionLength } from '../services/sessionBuilder';
import { getUnitDefinition } from '../constants/unitDefinitions';
import { getUnlockedUnits, getUnlockedUnitsForProgramMode } from '../services/masteryEngine';
import { getAllowedUnitCeiling, recordUnitAdvanced } from '../services/progressionPolicy';

interface UseActivityProps {
    activityStats: Record<string, ActivityStats>;
    setActivityStats: React.Dispatch<React.SetStateAction<Record<string, ActivityStats>>>;
    showToast: (message: string, type?: 'error' | 'info', duration?: number) => void;
    handleGoToMenu: () => void;
    handleGoToProgramIntro?: () => void;
    enabledActivitiesSet: Set<string>;
    activeProfileId?: string | null;
    isPremium?: boolean;
}

export const useActivity = ({ activityStats, setActivityStats, showToast, handleGoToMenu, handleGoToProgramIntro, enabledActivitiesSet, activeProfileId, isPremium }: UseActivityProps) => {
    const safeParseArray = <T,>(raw: string | null): T[] => {
        if (!raw) return [];
        try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    };
    const getHighestUnlockedUnit = (units: Set<number>): number => {
        let highest = 1;
        units.forEach(unit => {
            if (unit > highest) highest = unit;
        });
        return highest;
    };
    const [activityType, setActivityType] = useState<ActivityType | null>(null);
    const [activityData, setActivityData] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [advanceCount, setAdvanceCount] = useState(0);
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
    const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
    const [selectedObjectCategory, setSelectedObjectCategory] = useState<{ id: string; title: string } | null>(null);
    const [selectedActivityForLetter, setSelectedActivityForLetter] = useState<ActivityType | null>(null);
    // 5N1K category tracking (per-category stats like Kim/Ne/Nerede...)
    const [selectedFiveWOneHKey, setSelectedFiveWOneHKey] = useState<string | null>(null);
    
    // Random Mode State
    const [isRandomMode, setIsRandomMode] = useState(false);
    const [isProgramMode, setIsProgramMode] = useState(false);
    const [randomModeQueue, setRandomModeQueue] = useState<(ActivityType | string)[]>([]);
    const [currentRandomActivityIndex, setCurrentRandomActivityIndex] = useState(0);
    const [randomModeAttemptCount, setRandomModeAttemptCount] = useState<Record<string, number>>({});

    // --- Program Mode progression (per-profile) ---
    // Old 24-level system removed - now using unit-based progression with progressionPolicy service
    // Program mode now uses buildDailySession from sessionBuilder.ts with dynamic difficulty adaptation

    const resetActivityState = useCallback(() => {
        setActivityType(null);
        setActivityData([]);
        setCurrentIndex(0);
        setScore(0);
        setAdvanceCount(0);
        setSelectedLetter(null);
        setSelectedGroup(null);
        setSelectedObjectCategory(null);
        setSelectedActivityForLetter(null);
        setIsRandomMode(false);
        setIsProgramMode(false);
        setRandomModeQueue([]);
        setCurrentRandomActivityIndex(0);
        setRandomModeAttemptCount({});
    }, []);

    const startSpecificRandomActivity = useCallback(async (activityId: ActivityType | string): Promise<{ success: boolean, data?: any[], type?: ActivityType | string }> => {
        const activityInfo = ALL_SUB_ACHIEVEMENTS.find(sa => String(sa.id) === String(activityId));
        if (!activityInfo) return { success: false };

        // Guard: Allow letter activities for TR + DE/AZ/EN/FR/NL (beta); block others in random/program flows
        const lang = getCurrentLanguage();
        if (activityInfo.category === ActivityCategory.LetterSound) {
            const allowed = new Set(['tr','de','az','en','fr','nl']);
            if (!allowed.has(lang)) return { success: false };
        }

    let fetchedData: any[] = [];
            // Program & random mod: her etkinlik çağrısında hedef soru sayısı = 6
            // İçerik servisleri count paramıyla soruları azaltabilir (yetersiz havuz durumunda)
            const randomCount = 6;
        
        try {
            switch (activityInfo.category) {
                case ActivityCategory.LetterSound: {
                    const activityType = activityInfo.id as ActivityType;
                    if (activityType === ActivityType.Syllabification) {
                        const randomGroup = Math.floor(Math.random() * 5) + 1;
                        fetchedData = await fetchSyllableWordsForGroup(randomGroup, randomCount);
                        if (fetchedData.length > 0) setSelectedGroup(randomGroup);
                    } else {
                        const allLetters = LETTER_GROUPS.flatMap(g => g.letters);
                        const randomLetter = allLetters[Math.floor(Math.random() * allLetters.length)];
                        fetchedData = await fetchLetterActivityData(activityType, randomLetter, randomCount);
                        if (fetchedData.length > 0) {
                            setSelectedLetter(randomLetter);
                            setSelectedActivityForLetter(activityType);
                        }
                    }
                    break;
                }
                case ActivityCategory.Objects: {
                    const categoryId = String(activityInfo.id);
                    fetchedData = await createObjectChoiceRounds(categoryId, randomCount);
                    if (fetchedData.length > 0) {
                        const categoryDetails = OBJECT_CATEGORIES.find(cat => cat.id === categoryId);
                        if (categoryDetails) setSelectedObjectCategory({ id: categoryDetails.id, title: categoryDetails.title });
                    }
                    break;
                }
                case ActivityCategory.Concept: {
                    fetchedData = await fetchConceptActivityData(activityInfo.id as ActivityType, activityStats, randomCount, isPremium);
                    break;
                }
                case ActivityCategory.Reasoning: {
                    // Special handling for 5W1H sub-IDs (string IDs)
                    if (String(activityInfo.id).startsWith('FiveWOneH_')) {
                        const subKey = String(activityInfo.id);
                        fetchedData = await fetchFiveWOneHBySubKey(subKey, randomCount);
                    } else {
                        fetchedData = await fetchConceptActivityData(activityInfo.id as ActivityType, activityStats, randomCount, isPremium);
                    }
                    break;
                }
                case ActivityCategory.FineMotor: {
                    // Fine motor activities (LineTracing, ShapeColoring, RhythmFollowing) use placeholder rounds
                    // provided by fetchConceptActivityData (which returns minimal round objects).
                    fetchedData = await fetchConceptActivityData(activityInfo.id as ActivityType, activityStats, randomCount, isPremium);
                    break;
                }
                case ActivityCategory.RelativeComparison: {
                    // Experimental relative comparison rounds are delivered via fetchConceptActivityData
                    fetchedData = await fetchConceptActivityData(activityInfo.id as ActivityType, activityStats, randomCount, isPremium);
                    break;
                }
            }
        } catch (e) {
            console.error(`Error fetching data for random activity: ${String(activityId)}`, e);
        }
        
        if (fetchedData.length > 0) {
            // For 5W1H sub-IDs keep activityType as FiveWOneH for UI/back navigation but stats key uses sub-ID elsewhere
            const resolvedType = String(activityInfo.id).startsWith('FiveWOneH_') ? ActivityType.FiveWOneH : (activityInfo.id as ActivityType);
            return { success: true, data: fetchedData, type: resolvedType };
        }
        
        return { success: false };
    }, [activityStats]);

    const startNextRandomActivity = useCallback(async (queue: (ActivityType | string)[], startIndex: number) => {
        for (let i = startIndex; i < queue.length; i++) {
            const nextActivityId = queue[i];
            setCurrentRandomActivityIndex(i);
            const { success, data, type } = await startSpecificRandomActivity(nextActivityId);

            if (success && data && type) {
                // Normal start
                setActivityType(type as ActivityType);
                setActivityData(data);
                setCurrentIndex(0);
                setScore(0);
                return true; // Found an activity to start
            } else {
                // Record a skipped attempt so early progress can reflect exposure
                setActivityStats(prev => {
                    const key = String(nextActivityId);
                    const current = prev[key] || { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0, history: [] };
                    const newRecord: AttemptRecord = { timestamp: Date.now(), score: 0, total: 0, mode: isProgramMode ? 'program' : 'free' };
                    return {
                        ...prev,
                        [key]: {
                            ...current,
                            attempts: (current.attempts || 0) + 1,
                            history: [...(current.history || []), newRecord].slice(-10)
                        }
                    };
                });
                console.warn(`No data for activity ${String(nextActivityId)}; recorded skipped attempt.`);
            }
        }
        return false; // No more activities in the queue
    }, [startSpecificRandomActivity, setActivityStats, isProgramMode]);
    
    const handleStartRandomMode = useCallback(async () => {
        const lang = getCurrentLanguage();
        const availableToPlay = ALL_SUB_ACHIEVEMENTS
            .filter(sa => enabledActivitiesSet.has(String(sa.id)) && sa.id !== ActivityType.EmbeddedStory)
            // Guard: allow letter activities for tr/de/az/en/fr/nl only
            .filter(sa => {
                if (sa.category !== ActivityCategory.LetterSound) return true;
                const allowed = new Set(['tr','de','az','en','fr','nl']);
                return allowed.has(lang);
            });

        if (availableToPlay.length === 0) {
            showToast("Rastgele mod için hiç etkinlik seçilmemiş. Lütfen ayarlardan etkinlikleri etkinleştirin.", 'info');
            return false;
        }

        const shuffledQueue = shuffleArray(availableToPlay.map(sa => sa.id));
        setRandomModeQueue(shuffledQueue);
        setCurrentRandomActivityIndex(0);
        setRandomModeAttemptCount({});
    setIsRandomMode(true);
    setIsProgramMode(false);
        
        const started = await startNextRandomActivity(shuffledQueue, 0);
        if (!started) {
            showToast("Rastgele mod için uygun etkinlik bulunamadı.", 'info');
            handleGoToMenu();
            return false;
        }
        return true;
    }, [enabledActivitiesSet, showToast, startNextRandomActivity, handleGoToMenu]);

    // Program Mode (experimental): curated sequence, independent of enabledActivitiesSet
    const handleStartProgramMode = useCallback(async () => {
        // Build session using new unit-based system with daily ceiling
        const sessionLength = getRecommendedSessionLength(
            Object.keys(activityStats).filter(id => activityStats[id]?.completions > 0).length
        );
        const masteredObjectCategories = new Set<string>(); // TODO: derive from stats if needed
        const parentOverrides = activeProfileId ? safeParseArray<ParentOverride>(window.localStorage.getItem(`parentOverrides_profile_${activeProfileId}`)) : undefined;
        const unlockedUnits = getUnlockedUnitsForProgramMode(activityStats, masteredObjectCategories, parentOverrides, 6, activeProfileId);
        const ceiling = activeProfileId
            ? (isPremium ? getHighestUnlockedUnit(unlockedUnits) : getAllowedUnitCeiling(activeProfileId, unlockedUnits))
            : undefined;

        const session = buildDailySession(
            activityStats,
            masteredObjectCategories,
            undefined,
            sessionLength,
            ceiling,
            parentOverrides
        );

        if (session.activities.length === 0) {
            showToast('Program modu için uygun içerik bulunamadı.', 'info');
            return false;
        }

        const PROGRAM_QUEUE = session.activities.map(a => a.activityId);
        setRandomModeQueue(PROGRAM_QUEUE);
        setCurrentRandomActivityIndex(0);
        setRandomModeAttemptCount({});
        setIsRandomMode(true);
        setIsProgramMode(true);

        const started = await startNextRandomActivity(PROGRAM_QUEUE, 0);
        if (!started) {
            showToast('Program modu için uygun içerik bulunamadı.', 'info');
            return false;
        }
        return true;
    }, [showToast, startNextRandomActivity, handleGoToMenu, activityStats, activeProfileId, isPremium]);

    // Reinforcement-only starter: prefer weak items from focus unit, fallback to previous weak candidates
    const handleStartReinforcementMode = useCallback(async () => {
        // Build a session to learn the focus unit
        const sessionLength = getRecommendedSessionLength(
            Object.keys(activityStats).filter(id => activityStats[id]?.completions > 0).length
        );
        const masteredObjectCategories = new Set<string>();
        const parentOverrides = activeProfileId ? safeParseArray<ParentOverride>(window.localStorage.getItem(`parentOverrides_profile_${activeProfileId}`)) : undefined;
        const unlockedUnits = getUnlockedUnitsForProgramMode(activityStats, masteredObjectCategories, parentOverrides, 6, activeProfileId);
        const ceiling = activeProfileId
            ? (isPremium ? getHighestUnlockedUnit(unlockedUnits) : getAllowedUnitCeiling(activeProfileId, unlockedUnits))
            : undefined;
        const session = buildDailySession(
            activityStats,
            masteredObjectCategories,
            undefined,
            sessionLength,
            ceiling,
            parentOverrides
        );

        // Helper: success rate computation (mirror of sessionBuilder)
        const successOf = (id: ActivityType | string): number => {
            const stats = activityStats[String(id)];
            if (!stats) return 0;
            let correct = stats.totalCorrect || 0;
            let total = stats.totalQuestions || 0;
            if (total === 0) {
                const hist = (stats.history || []).filter(h => h.total > 0);
                for (const h of hist) { correct += h.score; total += h.total; }
            }
            return total > 0 ? correct / total : 0;
        };

        const focusUnit = session.focusUnit || 1;
        const unitDef = getUnitDefinition(focusUnit);
        const focusActivities = (unitDef?.activities || []) as (ActivityType | string)[];

                // Weak candidates from focus unit: success < 0.80 (include zeros so reinforcement appears
                // even when a child kept failing and the percentage stuck just below threshold).
                const weakFocus = focusActivities.filter(a => {
                        const s = successOf(a);
                        return s < 0.80;
                }).sort((a,b) => successOf(b) - successOf(a));

                // Debugging: log per-activity success to help trace why reinforcement may not appear
                try {
                    console.debug('[Reinforcement] focusUnit', focusUnit, 'focusActivities', focusActivities.map(a => ({ id: String(a), success: successOf(a) })));
                } catch (e) {
                    // ignore debug failures in older environments
                }

        // Check for parent/manual reinforcement selections persisted by ProgramModeIntroScreen
        let queue: (ActivityType | string)[] = [];
        try {
            const manualKey = activeProfileId ? `manual_reinforcement_profile_${activeProfileId}` : null;
            if (manualKey) {
                const raw = window.localStorage.getItem(manualKey);
                if (raw) {
                    const arr = safeParseArray<string>(raw);
                    if (Array.isArray(arr) && arr.length > 0) {
                        // Resolve stored values to canonical activity ids where possible
                        const resolved: (ActivityType | string)[] = [];
                        const invalid: string[] = [];
                        for (const entry of arr) {
                            // Try to match by id or by name
                            const found = ALL_SUB_ACHIEVEMENTS.find(sa => String(sa.id) === String(entry) || String(sa.name) === String(entry));
                            if (found) resolved.push(found.id);
                            else {
                                // If the entry looks like a numeric id that exists as metadata, keep it; otherwise mark invalid
                                const maybe = ALL_SUB_ACHIEVEMENTS.find(sa => String(sa.id) === String(Number(entry)));
                                if (maybe) resolved.push(maybe.id);
                                else invalid.push(String(entry));
                            }
                        }
                        if (invalid.length > 0) {
                            console.warn('[Reinforcement] Ignoring unrecognized manual reinforcement ids:', invalid);
                        }
                        // Filter manual picks to unlocked units only (allow previous unit activities if unlocked)
                        const filteredByUnit: (ActivityType | string)[] = [];
                        const ignoredByUnit: string[] = [];
                        for (const r of resolved) {
                            const md = getActivityMetadata(r as any);
                            if (md && unlockedUnits.has(md.unitNumber)) filteredByUnit.push(r);
                            else ignoredByUnit.push(String(r));
                        }
                        if (ignoredByUnit.length > 0) {
                            console.warn('[Reinforcement] Manual picks ignored because not in unlocked units', ignoredByUnit);
                            try {
                                showToast(`Bazı manuel seçimler kilitli ünitelerde ve dikkate alınmadı.`, 'info', 3500);
                            } catch (e) {}
                        }
                        if (filteredByUnit.length > 0) queue = filteredByUnit;
                    }
                }
            }
        } catch (e) {
            console.warn('Failed to read manual reinforcement from localStorage in reinforcement starter', e);
        }

        if (queue.length === 0) {
            if (weakFocus.length > 0) {
                queue = weakFocus.slice(0, 3).map(a => a);
            } else {
                // fallback to session reinforcement roles (previous units)
                const fallback = session.activities.filter(a => a.sessionRole === 'reinforcement').map(a => a.activityId);
                if (fallback.length > 0) queue = fallback;
            }
        }

        // Debug: log what queue we will start reinforcement with and show a short toast for visibility
        try {
            const resolvedNames = queue.map(q => {
                const found = ALL_SUB_ACHIEVEMENTS.find(sa => String(sa.id) === String(q));
                return found ? (found.name || String(found.id)) : String(q);
            });
            console.debug('[Reinforcement] final queue (ids):', queue, 'names:', resolvedNames, 'weakFocus:', weakFocus.map(a=>({id:String(a), success: successOf(a)})));
            // Show a short info toast so parent can see what was chosen
            if (resolvedNames.length > 0) showToast(`Pekiştirme başlıyor: ${resolvedNames.join(', ')}`, 'info', 4000);
            else showToast(t('programMode.noReinforcementToday', 'No reinforcement candidates found.'), 'info', 3000);
        } catch (e) {
            console.debug('Reinforcement: debug log failed', e);
        }

        if (queue.length === 0) {
            showToast(t('programMode.noReinforcementToday', 'No reinforcement candidates found.'), 'info');
            return false;
        }

        setRandomModeQueue(queue);
        setCurrentRandomActivityIndex(0);
        setRandomModeAttemptCount({});
        setIsRandomMode(true);
        setIsProgramMode(true); // reinforcement now counts as program progress (affects unit advancement)

        const started = await startNextRandomActivity(queue, 0);
        if (!started) {
            showToast('Pekiştirme modu için uygun içerik bulunamadı.', 'info');
            return false;
        }
        return true;
    }, [activityStats, activeProfileId, isPremium, showToast, startNextRandomActivity, handleGoToMenu]);

    const handleAdvance = useCallback(async (isCorrect: boolean) => {
        // Track total number of advance attempts (used for overall question progress)
        setAdvanceCount(prev => prev + 1);
        const newScore = isCorrect ? score + 1 : score;
        if (isCorrect) setScore(newScore);

        if (currentIndex + 1 >= activityData.length) {
            // FINISH ACTIVITY LOGIC
            const finalScore = newScore;
            const totalQuestions = activityData.length;
            
            let genericKey: string | null = null;
            let specificKey: string | null = null;

            // In random/program mode, use the queue ID directly (it's already the correct granular ID)
            if (isRandomMode) {
                genericKey = String(randomModeQueue[currentRandomActivityIndex]);
                specificKey = null;
            } else {
                // In free mode, determine key based on activity type and context
                if (activityType && LETTER_SOUND_ACTIVITIES.includes(activityType) && selectedLetter) {
                    genericKey = String(activityType);
                    specificKey = `${activityType}-${selectedLetter}`;
                } else if (activityType === ActivityType.Syllabification && selectedGroup !== null) {
                    genericKey = String(activityType);
                    specificKey = `${activityType}-${selectedGroup}`;
                } else if (activityType === ActivityType.ObjectRecognition && selectedObjectCategory) {
                    genericKey = selectedObjectCategory.id;
                } else if (activityType === ActivityType.FiveWOneH && selectedFiveWOneHKey) {
                    // Record under the selected 5N1K sub-key (e.g., FiveWOneH_Who)
                    genericKey = selectedFiveWOneHKey;
                } else if (activityType !== null) {
                    genericKey = String(activityType);
                }
            }

            if (genericKey) {
                const newRecord: AttemptRecord = { timestamp: Date.now(), score: finalScore, total: totalQuestions, mode: isProgramMode ? 'program' : 'free' };
                
                                // Check units before stats update (for detecting new unlocks)
                                const emptyMasteredCats = new Set<string>();
                                // Use program-mode unlocked check when current session is program mode
                                const parentOverrides = activeProfileId ? safeParseArray<ParentOverride>(window.localStorage.getItem(`parentOverrides_profile_${activeProfileId}`)) : undefined;
                                const previousUnlockedUnits = isProgramMode
                                    ? getUnlockedUnitsForProgramMode(activityStats, emptyMasteredCats, parentOverrides, 6, activeProfileId)
                                    : getUnlockedUnits(activityStats, emptyMasteredCats);
                
                setActivityStats(prev => {
                    const updatedStats = { ...prev };
                    const isComplete = finalScore === totalQuestions;
                    
                    const updateStats = (key: string, isGeneric: boolean) => {
                        const current = updatedStats[key] || { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0, history: [] };
                        updatedStats[key] = {
                            ...current,
                            attempts: isGeneric ? current.attempts : (current.attempts || 0) + 1,
                            completions: isComplete && !isGeneric ? (current.completions || 0) + 1 : (current.completions || 0),
                            totalCorrect: (current.totalCorrect || 0) + finalScore,
                            totalQuestions: (current.totalQuestions || 0) + totalQuestions,
                             history: [...(current.history || []), newRecord].slice(-10)
                        };
                    };
                    
                    if (specificKey) {
                        updateStats(specificKey, false);
                        if (genericKey) {
                           const generic = updatedStats[genericKey] || { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0, history: [] };
                            updatedStats[genericKey] = {
                                ...generic,
                                totalCorrect: (generic.totalCorrect || 0) + finalScore,
                                totalQuestions: (generic.totalQuestions || 0) + totalQuestions,
                            };
                        }
                    } else {
                        updateStats(genericKey!, false);
                    }
                    
                    // Check if new unit unlocked after this activity (Program Mode only)
                        if (isProgramMode && activeProfileId) {
                        const currentUnlockedUnits = getUnlockedUnitsForProgramMode(updatedStats, emptyMasteredCats, parentOverrides, 6, activeProfileId);
                        
                        // Find newly unlocked units
                        currentUnlockedUnits.forEach(unitNum => {
                            if (!previousUnlockedUnits.has(unitNum)) {
                                console.log(`[Unit Advancement] New unit unlocked: ${unitNum}`);
                                recordUnitAdvanced(activeProfileId, unitNum);
                            }
                        });
                    }
                    
                    return updatedStats;
                });
            }
            
            if (isRandomMode) {
                const currentActivity = randomModeQueue[currentRandomActivityIndex];
                const attempts = (randomModeAttemptCount[String(currentActivity)] || 0) + 1;
                setRandomModeAttemptCount(prev => ({ ...prev, [String(currentActivity)]: attempts }));

                const successRate = totalQuestions > 0 ? (finalScore / totalQuestions) : 0;
                if (successRate < 0.75 && attempts < 2) {
                    showToast("Bu konuyu biraz daha pekiştirelim!", 'info');
                    const { success, data, type } = await startSpecificRandomActivity(currentActivity);
                    if (success && data && type) {
                        setActivityType(type as ActivityType);
                        setActivityData(data);
                        setCurrentIndex(0);
                        setScore(0);
                    } else {
                        handleGoToMenu();
                    }
                } else {
                     const hasNext = await startNextRandomActivity(randomModeQueue, currentRandomActivityIndex + 1);
                     if (!hasNext) {
                        if (isProgramMode) {
                            showToast(t('programMode.completed', 'Program mode finished! Great job.'), 'info');
                            resetActivityState();
                            handleGoToProgramIntro?.();
                        } else {
                            showToast("Rastgele mod tamamlandı! Harika iş.", 'info');
                            handleGoToMenu();
                        }
                     }
                }
            } else {
                return 'finished'; // Signal to core hook to change screen
            }
        } else {
            setCurrentIndex(prev => prev + 1);
        }
        return 'advanced';
    }, [score, currentIndex, activityData.length, activityType, selectedLetter, selectedGroup, selectedObjectCategory, isRandomMode, isProgramMode, randomModeQueue, currentRandomActivityIndex, setActivityStats, handleGoToMenu, handleGoToProgramIntro, showToast, startNextRandomActivity, startSpecificRandomActivity, randomModeAttemptCount, resetActivityState]);

    return {
        activityType,
        setActivityType,
        activityData,
        setActivityData,
        currentIndex,
        setCurrentIndex,
        score,
        setScore,
        advanceCount,
        setAdvanceCount,
        selectedLetter,
        setSelectedLetter,
        selectedGroup,
        setSelectedGroup,
        selectedObjectCategory,
        setSelectedObjectCategory,
        selectedActivityForLetter,
        setSelectedActivityForLetter,
        selectedFiveWOneHKey,
        setSelectedFiveWOneHKey,
        isRandomMode,
        isProgramMode,
        resetActivityState,
        handleAdvance,
        handleStartRandomMode,
        handleStartProgramMode,
        handleStartReinforcementMode,
        randomModeQueue,
        currentRandomActivityIndex,
        startSpecificRandomActivity,
    };
};