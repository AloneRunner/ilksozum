// FIX: Import React to use React.Dispatch and React.SetStateAction types.
import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { getCurrentLanguage, setCurrentLanguage, type Locale } from '../i18n/index.ts';
import { useLocalStorage } from './useLocalStorage.ts';
import { purchasePremium, getPaywallOptions, purchasePackageByIdentifier, syncPremiumEntitlement, restorePurchases } from '../services/monetizationService.ts';
import { FREE_THEMES } from '../themes/themeManager.ts';
import {
    getLoyaltySnapshot,
    isLoyaltyPremiumActive,
    hasPendingCelebration,
    consumeCelebration as consumeLoyaltyCelebration,
    type LoyaltySnapshot,
} from '../services/loyaltyService.ts';

interface UseSettingsProps {
    showToast: (message: string, type?: 'error' | 'info', duration?: number) => void;
    showPremiumToast: () => void;
}

// Global device-level RC user; we no longer accept per-profile userId.
export const useSettings = ({ showToast, showPremiumToast }: UseSettingsProps) => {
    const [hasPurchasedPremium, setHasPurchasedPremium] = useLocalStorage<boolean>('isPremium_v1', false);
    const [trialStartDate, setTrialStartDate] = useLocalStorage<number | null>('trialStartDate_v1', null);
    const [bannedImageIdsArray, setBannedImageIdsArray] = useLocalStorage<number[]>('bannedImageIds_v1', []);
    const [isMuted, setIsMuted] = useLocalStorage<boolean>('isMuted', false);
    const [isAutoSpeakEnabled, setIsAutoSpeakEnabled] = useLocalStorage<boolean>('isAutoSpeakEnabled', true);
    const [isWordLabelVisible, setIsWordLabelVisible] = useLocalStorage<boolean>('isWordLabelVisible', false);
    const [isBanButtonEnabled, setIsBanButtonEnabled] = useLocalStorage<boolean>('isBanButtonEnabled', false);
    const [isFastTransitionEnabled, setIsFastTransitionEnabled] = useLocalStorage<boolean>('isFastTransitionEnabled', false);
    const [isSpamGuardEnabled, setIsSpamGuardEnabled] = useLocalStorage<boolean>('isSpamGuardEnabled_v1', true);
    const [spamGuardRoundThreshold, setSpamGuardRoundThreshold] = useLocalStorage<number>('spamGuardRoundThreshold_v1', 8);
    const [isBasaraHighlightEnabled, setIsBasaraHighlightEnabled] = useLocalStorage<boolean>('isBasaraHighlightEnabled_v1', true);
    // Child-friendly and accessibility settings
    const [isChildModeEnabled, setIsChildModeEnabled] = useLocalStorage<boolean>('isChildModeEnabled_v1', false);
    const [isErrorlessModeEnabled, setIsErrorlessModeEnabled] = useLocalStorage<boolean>('isErrorlessModeEnabled_v1', false);
    const [isUnderwaterMusicEnabled, setIsUnderwaterMusicEnabled] = useLocalStorage<boolean>('isUnderwaterMusicEnabled', false);
    const [isRealisticImagesEnabled, setIsRealisticImagesEnabled] = useLocalStorage<boolean>('isRealisticImagesEnabled_v1', false);
    const [theme, setTheme] = useLocalStorage<string>('theme_v2', 'simple');
    const [language, setLanguage] = useLocalStorage<Locale>('lang_v1', getCurrentLanguage());
    
    useEffect(() => {
        // This runs only once on the very first launch for a user
        if (trialStartDate === null) {
            console.log("First launch detected. Starting 7-day premium trial.");
            setTrialStartDate(Date.now());
            // Set default theme to 'simple' for new users
            setTheme('simple');
        }
    }, [trialStartDate, setTrialStartDate, setTheme]);

    // Keep i18n current language in sync with settings
    useEffect(() => {
        setCurrentLanguage(language);
    }, [language]);

    const isTrialActive = useMemo(() => {
        if (!trialStartDate) {
            return false;
        }
        const sevenDaysInMillis = 7 * 24 * 60 * 60 * 1000;
        return (Date.now() - trialStartDate) < sevenDaysInMillis;
    }, [trialStartDate]);

    // Global promotion: Premium is a gift for everyone until August 1, 2026.
    // Extended through the summer (free access while BASARA + tracing features roll out
    // and the app is shared with special-education teachers).
    const promotionEndDate = new Date('2026-08-01T23:59:59');

    const isPromotionActive = useMemo(() => {
        const now = new Date();
        return now < promotionEndDate;
    }, []);

    // Loyalty premium: rolling 30-day window earns 30 days free premium.
    // We track this in a tick so isPremium recomputes when it expires/awards.
    const [loyaltyTick, setLoyaltyTick] = useState(0);
    const bumpLoyalty = useCallback(() => setLoyaltyTick(t => t + 1), []);
    const loyaltySnapshot: LoyaltySnapshot = useMemo(
        () => getLoyaltySnapshot(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [loyaltyTick]
    );
    const isLoyaltyActive = useMemo(
        () => isLoyaltyPremiumActive(),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [loyaltyTick]
    );

    const [isLoyaltyCelebrationPending, setIsLoyaltyCelebrationPending] = useState<boolean>(() => hasPendingCelebration());
    const acknowledgeLoyaltyCelebration = useCallback(() => {
        consumeLoyaltyCelebration();
        setIsLoyaltyCelebrationPending(false);
    }, []);

    const isPremium = hasPurchasedPremium || isTrialActive || isPromotionActive || isLoyaltyActive;

    // Auto-disable fast mode when premium expires
    useEffect(() => {
        if (!isPremium && isFastTransitionEnabled) {
            setIsFastTransitionEnabled(false);
        }
    }, [isPremium, isFastTransitionEnabled, setIsFastTransitionEnabled]);

    // Show a one-time toast for the global promotion so users know they received the gift.
    useEffect(() => {
        try {
            if (isPromotionActive) {
                const flagKey = 'promo_toast_shown_2026_08';
                const shown = window.localStorage.getItem(flagKey);
                if (!shown) {
                    try { showToast && showToast('Hediye Premium aktif — 1 Ağustos 2026\'ya kadar! 🎁', 'info', 6000); } catch (e) {}
                    window.localStorage.setItem(flagKey, 'true');
                }
            }
        } catch (e) {
            // ignore
        }
    }, [isPromotionActive, showToast]);

    // Paywall pricing (for showing prices in UI)
    const [paywallMonthly, setPaywallMonthly] = useState<string | undefined>(undefined);
    const [paywallLifetime, setPaywallLifetime] = useState<string | undefined>(undefined);
    const [paywallMonthlyPkgId, setPaywallMonthlyPkgId] = useState<string | undefined>(undefined);
    const [paywallLifetimePkgId, setPaywallLifetimePkgId] = useState<string | undefined>(undefined);
    useEffect(() => {
        (async () => {
            try {
                const opts = await getPaywallOptions();
                const m = opts.find(o => o.type === 'monthly');
                const l = opts.find(o => o.type === 'lifetime') || opts.find(o => o.productIdentifier === 'premium_upgrade');
                setPaywallMonthly(m?.priceString || (m?.price != null ? `${m.price}` : undefined));
                setPaywallLifetime(l?.priceString || (l?.price != null ? `${l.price}` : undefined));
                setPaywallMonthlyPkgId(m?.packageIdentifier);
                setPaywallLifetimePkgId(l?.packageIdentifier);
            } catch (e) {
                // silently ignore
            }
        })();
    }, []);
    
    const bannedImageIds = useMemo(() => new Set(bannedImageIdsArray), [bannedImageIdsArray]);

    // Enforce free theme restrictions for non-premium users
    useEffect(() => {
        if (!isPremium && theme !== 'simple' && !FREE_THEMES.has(theme)) {
            setTheme('simple');
        }
    }, [isPremium, theme, setTheme]);

    const handleToggleMute = useCallback(() => setIsMuted(prev => !prev), [setIsMuted]);
    const handleToggleAutoSpeak = useCallback(() => setIsAutoSpeakEnabled(prev => !prev), [setIsAutoSpeakEnabled]);
    const handleToggleWordLabel = useCallback(() => setIsWordLabelVisible(prev => !prev), [setIsWordLabelVisible]);
    const handleToggleBanButton = useCallback(() => setIsBanButtonEnabled(prev => !prev), [setIsBanButtonEnabled]);
    const handleToggleChildMode = useCallback(() => setIsChildModeEnabled(prev => !prev), [setIsChildModeEnabled]);
    const handleToggleErrorlessMode = useCallback(() => setIsErrorlessModeEnabled(prev => !prev), [setIsErrorlessModeEnabled]);
    const handleToggleUnderwaterMusic = useCallback(() => setIsUnderwaterMusicEnabled(prev => !prev), [setIsUnderwaterMusicEnabled]);
    const handleToggleSpamGuard = useCallback(() => setIsSpamGuardEnabled(prev => !prev), [setIsSpamGuardEnabled]);
    const handleToggleRealisticImages = useCallback(() => setIsRealisticImagesEnabled(prev => !prev), [setIsRealisticImagesEnabled]);
    const handleToggleBasaraHighlight = useCallback(() => setIsBasaraHighlightEnabled(prev => !prev), [setIsBasaraHighlightEnabled]);

    const handleToggleFastTransition = useCallback(() => {
        if (isPremium) setIsFastTransitionEnabled(prev => !prev);
        else showPremiumToast();
    }, [isPremium, setIsFastTransitionEnabled, showPremiumToast]);

    const handleChangeTheme = useCallback((newTheme: string) => {
        // Allow if user is premium OR theme is one of the free themes (temporary promotion) OR it's the simple theme
        if (!isPremium && newTheme !== 'simple' && !FREE_THEMES.has(newTheme)) {
            showPremiumToast();
            return;
        }
        setTheme(newTheme);
    }, [isPremium, setTheme, showPremiumToast]);
    
    const handleChangeLanguage = useCallback((newLang: Locale) => {
        setLanguage(newLang);
        setCurrentLanguage(newLang);
    }, [setLanguage]);

    const handleChangeSpamGuardThreshold = useCallback((value: number) => {
        setSpamGuardRoundThreshold(value);
    }, [setSpamGuardRoundThreshold]);
    
    const handlePurchasePremium = useCallback(async (): Promise<boolean> => {
        try {
            // Try to fetch available packages from RC and present subscription vs lifetime
            const options = await getPaywallOptions();
            const monthly = options.find(o => o.type === 'monthly');
            const lifetime = options.find(o => o.type === 'lifetime') || options.find(o => o.productIdentifier === 'premium_upgrade');

            let success = false;
            if (monthly && lifetime) {
                const msg = `Hangisini almak istersiniz?\n\nAylık Abonelik: ${monthly.priceString || monthly.price} / ay\nÖmür Boyu Premium: ${lifetime.priceString || lifetime.price}\n\nAylık için Tamam, Ömür boyu için İptal'e basın.`;
                const chooseMonthly = window.confirm(msg);
                const chosen = chooseMonthly ? monthly : lifetime;
                success = await purchasePackageByIdentifier(chosen.packageIdentifier);
            } else if (monthly) {
                // Only monthly available
                success = await purchasePackageByIdentifier(monthly.packageIdentifier);
            } else if (lifetime) {
                success = await purchasePackageByIdentifier(lifetime.packageIdentifier);
            } else {
                // Fallback to legacy purchase flow (selects first available or lifetime by product id)
                success = await purchasePremium();
            }

            if (success) {
                setHasPurchasedPremium(true);
                showToast('Desteğiniz için teşekkürler! Premium özellikler açıldı.', 'info');
            } else {
                showToast('Satın alma işlemi tamamlanamadı. Lütfen tekrar deneyin.', 'error');
            }
            return success;
        } catch (e) {
            console.error('handlePurchasePremium error:', e);
            showToast('Satın alma işlemi sırasında hata oluştu.', 'error');
            return false;
        }
    }, [setHasPurchasedPremium, showToast]);

    // Keep entitlement in sync with RC (covers subscription status changes)
    // This runs on mount, when userId changes, and periodically
    useEffect(() => {
        let active = true;
        let intervalId: NodeJS.Timeout;

        const checkPremiumStatus = async () => {
            if (!active) return;
            try {
                // On web (non-native), RevenueCat SDK is not initialized; do not override
                // local purchase flag with a false value that causes UI to flicker.
                if (!Capacitor.isNativePlatform()) return;

                const hasEntitlement = await syncPremiumEntitlement();
                if (!active) return;
                // Only update when true or when we are on native platform; this prevents
                // toggling from true->false spuriously in web preview.
                setHasPurchasedPremium(!!hasEntitlement);
            } catch (e) {
                console.error('Premium status check error:', e);
            }
        };

        // Check immediately on mount/userId change (native only)
        if (Capacitor.isNativePlatform()) checkPremiumStatus();

        // Check periodically every 30 seconds to catch subscription changes (native only)
        if (Capacitor.isNativePlatform()) {
            intervalId = setInterval(checkPremiumStatus, 30000);
        }

        // Also check when app comes to foreground (for mobile)
        const handleVisibilityChange = () => {
            if (!document.hidden && active) {
                checkPremiumStatus();
            }
        };

        if (Capacitor.isNativePlatform()) {
            document.addEventListener('visibilitychange', handleVisibilityChange);
            window.addEventListener('focus', checkPremiumStatus);
        }

        return () => {
            active = false;
            if (intervalId) clearInterval(intervalId);
            if (Capacitor.isNativePlatform()) {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                window.removeEventListener('focus', checkPremiumStatus);
            }
        };
    }, [setHasPurchasedPremium]);

    const handleBanImage = useCallback((bannedImageId: number, setActivityData: React.Dispatch<React.SetStateAction<any[]>>) => {
        setBannedImageIdsArray(prev => Array.from(new Set(prev).add(bannedImageId)));
        
        // This logic should ideally be inside the activity hook, but for now we pass setActivityData
        setActivityData(prevData => prevData.filter(round => {
            const containsBanned = (item: any) => item && item.id === bannedImageId;
            if (containsBanned(round)) return false;
            if (round.options?.some(containsBanned)) return false;
            // ... add more checks for other activity types if necessary
            return true;
        }));

        showToast("Bu görsel artık etkinliklerde görünmeyecek.", 'info');
    }, [setBannedImageIdsArray, showToast]);

    const handleUnbanImage = useCallback((id: number) => {
        setBannedImageIdsArray(prev => prev.filter(imageId => imageId !== id));
        showToast("Görsel geri yüklendi.", 'info');
    }, [setBannedImageIdsArray, showToast]);

    const handleRestorePurchases = useCallback(async (profileIds?: string[]): Promise<boolean> => {
        try {
            if (!Capacitor.isNativePlatform()) {
                showToast('Satın alma geri yükleme, yalnızca mağaza uygulamasında çalışır.', 'info');
                return false;
            }
            
            // First try standard restore with current device user
            let ok = await restorePurchases();
            if (ok) {
                setHasPurchasedPremium(true);
                showToast('Satın alımlarınız geri yüklendi. Premium özellikler açıldı.', 'info');
                return true;
            }
            
            // If that failed and we have old profile IDs, try migrating from them
            if (profileIds && profileIds.length > 0) {
                const { migrateOldPurchases } = await import('../services/monetizationService.ts');
                
                for (const oldId of profileIds) {
                    console.log(`Trying to migrate purchases from profile: ${oldId}`);
                    const migrated = await migrateOldPurchases(oldId);
                    if (migrated) {
                        setHasPurchasedPremium(true);
                        showToast('Satın alımlarınız geri yüklendi! Premium özellikler açıldı.', 'info');
                        return true;
                    }
                }
            }
            
            showToast('Geri yükleme yapılamadı ya da etkin satın alma bulunamadı.', 'info');
            return false;
        } catch (e) {
            console.error('handleRestorePurchases error:', e);
            showToast('Geri yükleme sırasında bir hata oluştu.', 'error');
            return false;
        }
    }, [setHasPurchasedPremium, showToast]);

    return {
        isPremium,
        hasPurchasedPremium,
        promotion: { isActive: isPromotionActive, endsAt: promotionEndDate.toISOString() },
        loyalty: {
            ...loyaltySnapshot,
            isCelebrationPending: isLoyaltyCelebrationPending,
            acknowledgeCelebration: acknowledgeLoyaltyCelebration,
            refresh: bumpLoyalty,
        },
        paywall: { monthlyPrice: paywallMonthly, lifetimePrice: paywallLifetime, hasData: !!(paywallMonthly || paywallLifetime) },
        bannedImageIds,
        isMuted,
        isAutoSpeakEnabled,
        isWordLabelVisible,
        isBanButtonEnabled,
        isFastTransitionEnabled,
        isSpamGuardEnabled,
        spamGuardRoundThreshold,
        isChildModeEnabled,
        isErrorlessModeEnabled,
        isUnderwaterMusicEnabled,
        isRealisticImagesEnabled,
        isBasaraHighlightEnabled,
        theme,
        language,
        handleToggleMute,
        handleToggleAutoSpeak,
        handleToggleWordLabel,
        handleToggleBanButton,
        handleToggleFastTransition,
        handleToggleSpamGuard,
        handleToggleChildMode,
        handleToggleErrorlessMode,
        handleToggleUnderwaterMusic,
        handleToggleRealisticImages,
        handleToggleBasaraHighlight,
        onChangeTheme: handleChangeTheme,
        onChangeLanguage: handleChangeLanguage,
        onChangeSpamGuardThreshold: handleChangeSpamGuardThreshold,
        handlePurchasePremium,
        handlePurchaseMonthly: async (): Promise<boolean> => {
            if (paywallMonthlyPkgId) {
                const ok = await purchasePackageByIdentifier(paywallMonthlyPkgId);
                if (ok) {
                    setHasPurchasedPremium(true);
                    showToast('Desteğiniz için teşekkürler! Premium özellikler açıldı.', 'info');
                } else {
                    showToast('Satın alma işlemi tamamlanamadı. Lütfen tekrar deneyin.', 'error');
                }
                return ok;
            }
            // fallback to flow
            return handlePurchasePremium();
        },
        handlePurchaseLifetime: async (): Promise<boolean> => {
            if (paywallLifetimePkgId) {
                const ok = await purchasePackageByIdentifier(paywallLifetimePkgId);
                if (ok) {
                    setHasPurchasedPremium(true);
                    showToast('Desteğiniz için teşekkürler! Premium özellikler açıldı.', 'info');
                } else {
                    showToast('Satın alma işlemi tamamlanamadı. Lütfen tekrar deneyin.', 'error');
                }
                return ok;
            }
            // fallback to legacy premium purchase (selects lifetime when possible)
            return handlePurchasePremium();
        },
        handleBanImage,
        handleUnbanImage,
        handleRestorePurchases,
    };
};