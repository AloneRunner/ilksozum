
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Profile, ActivityStats, ActivityCategory, ParentOverride } from '../types.ts';
import { useLocalStorage } from './useLocalStorage.ts';
import { getValueFromLocalStorage } from '../utils.ts';
import { ALL_SUB_ACHIEVEMENTS } from '../constants.ts';

const initializeEnabledActivities = (): string[] => {
    return ALL_SUB_ACHIEVEMENTS.map(sa => String(sa.id));
};

interface UseProfileProps {
    showToast: (message: string, type?: 'error' | 'info', duration?: number) => void;
}

export const useProfile = ({ showToast }: UseProfileProps) => {
    const [profiles, setProfiles] = useLocalStorage<Profile[]>('profiles_v1', []);
    const [activeProfileId, setActiveProfileId] = useLocalStorage<string | null>('activeProfileId_v1', null);
    const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
    const [activityStats, setActivityStats] = useState<Record<string, ActivityStats>>({});
    const [enabledActivities, setEnabledActivities] = useState<string[]>([]);
    const [parentOverrides, setParentOverrides] = useState<ParentOverride[]>([]);

    useEffect(() => {
        let profilesList = getValueFromLocalStorage<Profile[]>('profiles_v1', []);
        let currentProfile: Profile | null = null;

        if (profilesList.length === 0) {
            const guestProfile: Profile = { id: `guest_${Date.now()}`, name: 'Misafir', avatar: 'dog' };
            setProfiles([guestProfile]);
            setActiveProfileId(guestProfile.id);
            currentProfile = guestProfile;
        } else {
            const lastActiveId = getValueFromLocalStorage<string | null>('activeProfileId_v1', null);
            currentProfile = profilesList.find(p => p.id === lastActiveId) || profilesList[0];
            if (activeProfileId !== currentProfile.id) {
                setActiveProfileId(currentProfile.id);
            }
        }
        
        if (currentProfile) {
            setActiveProfile(currentProfile);
            let profileStats = getValueFromLocalStorage(`activityStats_profile_${currentProfile.id}`, {});
            // Migration: map any legacy/unknown keys to current activity IDs when possible
            try {
                const knownIds = new Set(ALL_SUB_ACHIEVEMENTS.map(sa => String(sa.id)));
                const statsKeys = Object.keys(profileStats || {});
                const unknownKeys = statsKeys.filter(k => !knownIds.has(k));
                if (unknownKeys.length > 0) {
                    // Build a name -> id map from known achievements and activity metadata
                    const nameToId = new Map<string, string>();
                    ALL_SUB_ACHIEVEMENTS.forEach(sa => {
                        if (sa.name) nameToId.set(String(sa.name).toLowerCase(), String(sa.id));
                    });

                    // (Best-effort) activity metadata names are already present in ALL_SUB_ACHIEVEMENTS
                    // so we skip dynamic import here to avoid async/await inside this effect.

                    let migrated = false;
                    const migratedStats: Record<string, any> = { ...(profileStats as any) };
                    for (const uk of unknownKeys) {
                        const lowered = uk.toLowerCase();
                        let targetId: string | undefined = undefined;

                        if (nameToId.has(lowered)) {
                            targetId = nameToId.get(lowered);
                        } else {
                            // Try fuzzy match: check if any known name contains the unknown key or vice versa
                            for (const [name, id] of nameToId.entries()) {
                                if (name.includes(lowered) || lowered.includes(name)) {
                                    targetId = id;
                                    break;
                                }
                            }
                        }

                        if (targetId && targetId !== uk) {
                            // Merge stats into targetId (prefer existing target values and sum attempts/score history)
                            const src = (profileStats as any)[uk];
                            const dest = migratedStats[targetId] || { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0, history: [] };
                            // Merge numeric aggregates conservatively
                            dest.attempts = (dest.attempts || 0) + (src.attempts || 0);
                            dest.completions = (dest.completions || 0) + (src.completions || 0);
                            dest.totalCorrect = (dest.totalCorrect || 0) + (src.totalCorrect || 0);
                            dest.totalQuestions = (dest.totalQuestions || 0) + (src.totalQuestions || 0);
                            // Merge histories and keep most recent 50
                            const combinedHistory = ((dest.history || []) as any[]).concat((src.history || []) as any[]).slice(-50);
                            dest.history = combinedHistory;
                            migratedStats[targetId] = dest;
                            // Remove legacy key
                            delete migratedStats[uk];
                            migrated = true;
                        }
                    }

                    if (migrated) {
                        // Backup original stats and replace with migrated stats
                        try {
                            window.localStorage.setItem(`activityStats_profile_${currentProfile.id}_backup_v1`, JSON.stringify(profileStats));
                        } catch (e) {}
                        profileStats = migratedStats;
                        try { window.localStorage.setItem(`activityStats_profile_${currentProfile.id}`, JSON.stringify(profileStats)); } catch (e) {}
                        try { showToast && showToast('Profil verileri otomatik olarak güncellendi (eski anahtarlar eşlendi).', 'info', 4000); } catch (e) {}
                    }
                }
            } catch (e) {
                console.warn('Profile stats migration failed (non-fatal):', e);
            }
            let profileEnabledActivities = getValueFromLocalStorage(`enabledActivities_profile_${currentProfile.id}`, initializeEnabledActivities());
            const profileOverrides = getValueFromLocalStorage<ParentOverride[]>(`parentOverrides_profile_${currentProfile.id}`, []);
            // If stored value is an empty array (or falsy), treat as all activities enabled to avoid accidentally locking activities
            if (!Array.isArray(profileEnabledActivities) || profileEnabledActivities.length === 0) {
                profileEnabledActivities = initializeEnabledActivities();
            }
            // Auto-enable any new activities added since the profile was last saved
            const allActivityIds = initializeEnabledActivities();
            const storedSet = new Set(profileEnabledActivities);
            const newlyAdded = allActivityIds.filter(id => !storedSet.has(id));
            if (newlyAdded.length > 0) {
                profileEnabledActivities = [...profileEnabledActivities, ...newlyAdded];
            }
            setActivityStats(profileStats);
            setEnabledActivities(profileEnabledActivities);
            setParentOverrides(profileOverrides);
        }
    }, [profiles]); // Depends on profiles to re-init if profiles list is empty

    useEffect(() => {
        if (activeProfile) {
            try {
                window.localStorage.setItem(`activityStats_profile_${activeProfile.id}`, JSON.stringify(activityStats));
                window.localStorage.setItem(`enabledActivities_profile_${activeProfile.id}`, JSON.stringify(enabledActivities));
                window.localStorage.setItem(`parentOverrides_profile_${activeProfile.id}`, JSON.stringify(parentOverrides));
            } catch (error) {
                console.error('Failed to save profile data:', error);
            }
        }
    }, [activityStats, enabledActivities, parentOverrides, activeProfile]);

    const enabledActivitiesSet = useMemo(() => new Set(enabledActivities), [enabledActivities]);

    const handleSelectProfile = useCallback((profile: Profile) => {
        const profileStats = getValueFromLocalStorage(`activityStats_profile_${profile.id}`, {});
        let profileEnabledActivities = getValueFromLocalStorage(`enabledActivities_profile_${profile.id}`, initializeEnabledActivities());
        const profileOverrides = getValueFromLocalStorage<ParentOverride[]>(`parentOverrides_profile_${profile.id}`, []);
        if (!Array.isArray(profileEnabledActivities) || profileEnabledActivities.length === 0) {
            profileEnabledActivities = initializeEnabledActivities();
        }
        // Auto-enable any new activities added since the profile was last saved
        const allActivityIds = initializeEnabledActivities();
        const storedSet = new Set(profileEnabledActivities);
        const newlyAdded = allActivityIds.filter(id => !storedSet.has(id));
        if (newlyAdded.length > 0) {
            profileEnabledActivities = [...profileEnabledActivities, ...newlyAdded];
        }
        setActivityStats(profileStats);
        setEnabledActivities(profileEnabledActivities);
        setParentOverrides(profileOverrides);
        setActiveProfile(profile);
        setActiveProfileId(profile.id);
    }, [setActiveProfileId]);

    const handleCreateProfile = useCallback((name: string, avatar: string) => {
        const newProfile: Profile = { id: Date.now().toString(), name, avatar };
        setProfiles(prev => [...prev, newProfile]);
        handleSelectProfile(newProfile);
    }, [setProfiles, handleSelectProfile]);

    const handleResetProgress = useCallback(() => {
        if (activeProfile) {
            setActivityStats({});
            setEnabledActivities(initializeEnabledActivities());
            showToast(`${activeProfile.name} için ilerleme sıfırlandı.`, 'info');
        }
    }, [activeProfile, showToast]);

    const updateActivityAttempt = useCallback((activityId: string) => {
        setActivityStats(prev => {
            const currentStats = prev[activityId] || { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0, history: [] };
            return {
                ...prev,
                [activityId]: { ...currentStats, attempts: currentStats.attempts + 1 }
            };
        });
    }, []);
    
    const handleToggleActivityEnabled = useCallback((activityId: string) => {
        setEnabledActivities(prev => {
            const newSet = new Set(prev);
            if (newSet.has(activityId)) newSet.delete(activityId); else newSet.add(activityId);
            return Array.from(newSet);
        });
    }, []);

    const handleToggleCategoryEnabled = useCallback((category: ActivityCategory, isEnabled: boolean) => {
        const activitiesInCategory = ALL_SUB_ACHIEVEMENTS.filter(sa => sa.category === category).map(sa => String(sa.id));
        setEnabledActivities(prev => {
            const newSet = new Set(prev);
            if (isEnabled) activitiesInCategory.forEach(id => newSet.add(id));
            else activitiesInCategory.forEach(id => newSet.delete(id));
            return Array.from(newSet);
        });
    }, []);

    // Parent Override (Joker Hakkı) functions
    const handleAddParentOverride = useCallback((activityId: string, durationHours: number = 24, reason?: string, isPremium: boolean = false, ignoreForProgress: boolean = false) => {
        // Limit active overrides by premium status: non-premium = 3, premium = 15
        const now = Date.now();
        const activeCount = parentOverrides.filter(o => o.expiresAt > now).length;
        const limit = isPremium ? 15 : 3;
        if (activeCount >= limit) {
            showToast(isPremium ? `Premium için aktif joker limiti (${limit}) doldu.` : `Üzgünüz, aktif joker limiti (${limit}) doldu.`, 'info');
            return;
        }

        const expiresAt = Date.now() + (durationHours * 60 * 60 * 1000);
        const newOverride: ParentOverride = { activityId, expiresAt, reason, ignoreForProgress };
        setParentOverrides(prev => {
            // Remove any existing override for this activity
            const filtered = prev.filter(o => o.activityId !== activityId);
            return [...filtered, newOverride];
        });
        showToast(`"${activityId}" geçici olarak açıldı (${durationHours} saat)`, 'info');
    }, [showToast, parentOverrides]);

    const handleRemoveParentOverride = useCallback((activityId: string) => {
        setParentOverrides(prev => prev.filter(o => o.activityId !== activityId));
        showToast(`"${activityId}" için joker kaldırıldı`, 'info');
    }, [showToast]);

    const handleClearExpiredOverrides = useCallback(() => {
        const now = Date.now();
        setParentOverrides(prev => prev.filter(o => o.expiresAt > now));
    }, []);

    // Clean up expired overrides on mount and periodically
    useEffect(() => {
        handleClearExpiredOverrides();
        const interval = setInterval(handleClearExpiredOverrides, 60000); // Every minute
        return () => clearInterval(interval);
    }, [handleClearExpiredOverrides]);

    return {
        profiles,
        activeProfile,
        activityStats,
        setActivityStats,
        enabledActivitiesSet,
        parentOverrides,
        handleSelectProfile,
        handleCreateProfile,
        handleResetProgress,
        updateActivityAttempt,
        handleToggleActivityEnabled,
        handleToggleCategoryEnabled,
        handleAddParentOverride,
        handleRemoveParentOverride,
        handleClearExpiredOverrides,
    };
};
