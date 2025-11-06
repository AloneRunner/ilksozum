// FIX: Import React to use React.Dispatch and React.SetStateAction types.
import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { getCurrentLanguage, setCurrentLanguage, type Locale } from '../i18n/index.ts';
import { useLocalStorage } from './useLocalStorage.ts';
import { purchasePremium, getPaywallOptions, purchasePackageByIdentifier, syncPremiumEntitlement } from '../services/monetizationService.ts';
import { FREE_THEMES } from '../themes/themeManager.ts';

interface UseSettingsProps {
    showToast: (message: string, type?: 'error' | 'info', duration?: number) => void;
    showPremiumToast: () => void;
    userId?: string; // RevenueCat için kullanıcı ID'si
}

export const useSettings = ({ showToast, showPremiumToast, userId }: UseSettingsProps) => {
    const [hasPurchasedPremium, setHasPurchasedPremium] = useLocalStorage<boolean>('isPremium_v1', false);
    const [trialStartDate, setTrialStartDate] = useLocalStorage<number | null>('trialStartDate_v1', null);
    const [bannedImageIdsArray, setBannedImageIdsArray] = useLocalStorage<number[]>('bannedImageIds_v1', []);
    const [isMuted, setIsMuted] = useLocalStorage<boolean>('isMuted', false);
    const [isAutoSpeakEnabled, setIsAutoSpeakEnabled] = useLocalStorage<boolean>('isAutoSpeakEnabled', true);
    const [isWordLabelVisible, setIsWordLabelVisible] = useLocalStorage<boolean>('isWordLabelVisible', false);
    const [isBanButtonEnabled, setIsBanButtonEnabled] = useLocalStorage<boolean>('isBanButtonEnabled', false);
    const [isFastTransitionEnabled, setIsFastTransitionEnabled] = useLocalStorage<boolean>('isFastTransitionEnabled', false);
    // Child-friendly and accessibility settings
    const [isChildModeEnabled, setIsChildModeEnabled] = useLocalStorage<boolean>('isChildModeEnabled_v1', false);
    const [isErrorlessModeEnabled, setIsErrorlessModeEnabled] = useLocalStorage<boolean>('isErrorlessModeEnabled_v1', false);
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

    // Special promotion: Give all existing users premium until November 15, 2025
    const isPromotionActive = useMemo(() => {
        const promotionEndDate = new Date('2025-11-15T23:59:59');
        const now = new Date();
        // If user had trialStartDate before today (existing user), give them promotion
        if (trialStartDate && trialStartDate < Date.now() - (7 * 24 * 60 * 60 * 1000)) {
            return now < promotionEndDate;
        }
        return false;
    }, [trialStartDate]);

    const isPremium = hasPurchasedPremium || isTrialActive || isPromotionActive;

    // Paywall pricing (for showing prices in UI)
    const [paywallMonthly, setPaywallMonthly] = useState<string | undefined>(undefined);
    const [paywallLifetime, setPaywallLifetime] = useState<string | undefined>(undefined);
    const [paywallMonthlyPkgId, setPaywallMonthlyPkgId] = useState<string | undefined>(undefined);
    const [paywallLifetimePkgId, setPaywallLifetimePkgId] = useState<string | undefined>(undefined);
    useEffect(() => {
        (async () => {
            try {
                const opts = await getPaywallOptions(userId);
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
    }, [userId]);
    
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
    
    const handlePurchasePremium = useCallback(async (): Promise<boolean> => {
        try {
            // Try to fetch available packages from RC and present subscription vs lifetime
            const options = await getPaywallOptions(userId);
            const monthly = options.find(o => o.type === 'monthly');
            const lifetime = options.find(o => o.type === 'lifetime') || options.find(o => o.productIdentifier === 'premium_upgrade');

            let success = false;
            if (monthly && lifetime) {
                const msg = `Hangisini almak istersiniz?\n\nAylık Abonelik: ${monthly.priceString || monthly.price} / ay\nÖmür Boyu Premium: ${lifetime.priceString || lifetime.price}\n\nAylık için Tamam, Ömür boyu için İptal'e basın.`;
                const chooseMonthly = window.confirm(msg);
                const chosen = chooseMonthly ? monthly : lifetime;
                success = await purchasePackageByIdentifier(chosen.packageIdentifier, userId);
            } else if (monthly) {
                // Only monthly available
                success = await purchasePackageByIdentifier(monthly.packageIdentifier, userId);
            } else if (lifetime) {
                success = await purchasePackageByIdentifier(lifetime.packageIdentifier, userId);
            } else {
                // Fallback to legacy purchase flow (selects first available or lifetime by product id)
                success = await purchasePremium(userId);
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
    }, [setHasPurchasedPremium, showToast, userId]);

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

                const hasEntitlement = await syncPremiumEntitlement(userId);
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
    }, [userId, setHasPurchasedPremium]);

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

    return {
        isPremium,
        hasPurchasedPremium,
        paywall: { monthlyPrice: paywallMonthly, lifetimePrice: paywallLifetime, hasData: !!(paywallMonthly || paywallLifetime) },
        bannedImageIds,
        isMuted,
        isAutoSpeakEnabled,
        isWordLabelVisible,
        isBanButtonEnabled,
        isFastTransitionEnabled,
        isChildModeEnabled,
        isErrorlessModeEnabled,
        theme,
        language,
        handleToggleMute,
        handleToggleAutoSpeak,
        handleToggleWordLabel,
        handleToggleBanButton,
        handleToggleFastTransition,
        handleToggleChildMode,
        handleToggleErrorlessMode,
        onChangeTheme: handleChangeTheme,
        onChangeLanguage: handleChangeLanguage,
        handlePurchasePremium,
        handlePurchaseMonthly: async (): Promise<boolean> => {
            if (paywallMonthlyPkgId) {
                const ok = await purchasePackageByIdentifier(paywallMonthlyPkgId, userId);
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
                const ok = await purchasePackageByIdentifier(paywallLifetimePkgId, userId);
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
    };
};