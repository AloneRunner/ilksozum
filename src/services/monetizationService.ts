import { Capacitor } from '@capacitor/core';
import {
  AdMob,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
} from '@capacitor-community/admob';
import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';

// ---- Ad IDs
const REAL_BANNER_ID = 'ca-app-pub-1337451525993562/1685338874';
const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';
const BANNER_ID = Capacitor.isNativePlatform() ? REAL_BANNER_ID : TEST_BANNER_ID;

// ---- RevenueCat
const RC_PUBLIC_SDK_KEY = 'goog_nISmHsACCmafpOJYWwvRhaaFCyW';
// RevenueCat setup
// Map multiple products (lifetime IAP and subscriptions) to the same entitlement in RC dashboard.
// Keep identifiers here in sync with your RC Offering setup.
const PREMIUM_PRODUCT_ID = 'premium_upgrade'; // lifetime IAP product ID (managed/non-consumable)
const PREMIUM_ENTITLEMENT_ID = 'premium';

// Heuristic identifiers for packages in RC offerings (adjust to your offering names if needed)
const PACKAGE_ID_LIFETIME = 'lifetime';
const PACKAGE_ID_MONTHLY = 'monthly';

let rcInitialized = false;
let currentRcUserId: string | undefined;
let fallbackUserId: string | undefined; // stable fallback when no userId provided

const getOrCreateFallbackUserId = (): string => {
  if (fallbackUserId) return fallbackUserId;
  try {
    const key = 'rc_fallback_user_id_v1';
    const fromStorage = window.localStorage.getItem(key);
    if (fromStorage) {
      fallbackUserId = fromStorage;
      return fallbackUserId;
    }
    // Generate a stable pseudo-UUID
    const rand = Math.random().toString(36).slice(2);
    const id = `guest_${Date.now().toString(36)}_${rand}`;
    window.localStorage.setItem(key, id);
    fallbackUserId = id;
    return id;
  } catch {
    // last resort
    fallbackUserId = `guest_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
    return fallbackUserId;
  }
};

export const initializeRevenueCat = async (userId?: string) => {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });

    if (!rcInitialized) {
      await Purchases.configure({ apiKey: RC_PUBLIC_SDK_KEY });
      rcInitialized = true;
    }

    const resolvedId = userId || getOrCreateFallbackUserId();
    if (resolvedId && resolvedId !== currentRcUserId) {
      await Purchases.logIn({ appUserID: resolvedId });
      currentRcUserId = resolvedId;
      console.log(`RevenueCat user ID set: ${currentRcUserId}`);
    }
  } catch (e) {
    console.error('RevenueCat init error:', e);
  }
};

// Guard: showBanner must not be called before AdMob.initialize() completes.
// BannerExecutor throws NullPointerException on Android if called too early.
let adMobReady = false;

export const initializeAds = async (): Promise<void> => {
  if (!Capacitor.isNativePlatform()) return;

  try {
    await AdMob.initialize();
    console.log('AdMob initialized');

    const cfgFn = (AdMob as any)?.setRequestConfiguration as
      | ((cfg: any) => Promise<void>)
      | undefined;

    if (cfgFn) {
      await cfgFn({
        maxAdContentRating: 'G',
        tagForChildDirectedTreatment: true,
        tagForUnderAgeOfConsent: true,
      });
      console.log('Kids mode request configuration applied.');
    } else {
      console.log('AdMob setRequestConfiguration API not found; skipping.');
    }

    adMobReady = true;
  } catch (e) {
    console.error('AdMob init error:', e);
  }
};

export const showBanner = async () => {
  if (!Capacitor.isNativePlatform()) return;
  if (!adMobReady) {
    console.warn('AdMob not ready yet, skipping banner show.');
    return;
  }

  const opts: BannerAdOptions = {
    adId: BANNER_ID,
    adSize: BannerAdSize.ADAPTIVE_BANNER,
    position: BannerAdPosition.TOP_CENTER,
  };

  try {
    await AdMob.showBanner(opts);
    console.log('Banner shown:', BANNER_ID);
  } catch (e) {
    console.error('Banner show error:', e);
  }
};

export const hideBanner = async () => {
  if (!Capacitor.isNativePlatform()) return;
  try {
    await AdMob.hideBanner();
  } catch {
    // no-op
  }
};

export const restorePurchases = async (userId?: string) => {
  if (!Capacitor.isNativePlatform()) return false;

  await initializeRevenueCat(userId);
  if (!rcInitialized) return false;

  try {
    const { customerInfo } = await Purchases.restorePurchases();
    const hasPremium = !!customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID];
    if (hasPremium) await hideBanner();
    return hasPremium;
  } catch (e) {
    console.error('restorePurchases error:', e);
    return false;
  }
};

export const purchasePremium = async (userId?: string) => {
  await initializeRevenueCat(userId);
  if (!rcInitialized) return false;

  if (!Capacitor.isNativePlatform()) {
    console.warn('Simulation: purchase request triggered (web environment).');
    return true;
  }

  try {
    const offerings = await Purchases.getOfferings();
    console.log('RevenueCat offerings:', JSON.stringify(offerings, null, 2));

    const current = offerings.current;
    if (!current || !current.availablePackages?.length) {
      console.error('ERROR: RevenueCat/Google Play returned no available packages.');
      return false;
    }

    const pkg =
      // prefer lifetime product id if present, else any
      current.availablePackages.find((p: any) => p?.identifier === PACKAGE_ID_LIFETIME || p?.product?.identifier === PREMIUM_PRODUCT_ID) ??
      current.availablePackages[0];

    console.log(`Selected package: ${pkg.identifier} (Product ID: ${pkg.product.identifier})`);

    const { customerInfo } = await Purchases.purchasePackage({ aPackage: pkg as any });
    const hasPremium = !!customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID];
    if (hasPremium) await hideBanner();
    return hasPremium;
  } catch (e: any) {
    if (e?.userCancelled) {
      console.log('Purchase flow cancelled by user.');
      return false;
    }
    console.error('purchasePremium error:', e);
    return false;
  }
};

// ---- New: Paywall helpers for subscriptions vs lifetime
export interface PaywallOption {
  packageIdentifier: string;
  productIdentifier: string;
  type: 'lifetime' | 'monthly' | 'annual' | 'other';
  price: string | number | null; // priceString preferred if available
  priceString?: string;
  title?: string;
  description?: string;
}

const resolvePackageType = (pkg: any): PaywallOption['type'] => {
  const id: string = String(pkg?.identifier || '').toLowerCase();
  if (id.includes('lifetime')) return 'lifetime';
  if (id.includes('month')) return 'monthly';
  if (id.includes('year') || id.includes('annual')) return 'annual';
  // try product period hints
  const period: string = String(pkg?.product?.subscriptionPeriod || '').toUpperCase(); // e.g., P1M, P1Y
  if (period === 'P1M') return 'monthly';
  if (period === 'P1Y') return 'annual';
  return 'other';
};

export const getPaywallOptions = async (userId?: string): Promise<PaywallOption[]> => {
  await initializeRevenueCat(userId);
  if (!rcInitialized) return [];
  try {
    const offerings = await Purchases.getOfferings();
    const current = offerings.current;
    if (!current || !current.availablePackages?.length) return [];
    return current.availablePackages.map((pkg: any) => ({
      packageIdentifier: pkg?.identifier,
      productIdentifier: pkg?.product?.identifier,
      type: resolvePackageType(pkg),
      price: (pkg?.product?.price as number) ?? null,
      priceString: pkg?.product?.priceString,
      title: pkg?.product?.title,
      description: pkg?.product?.description,
    }));
  } catch (e) {
    console.error('getPaywallOptions error:', e);
    return [];
  }
};

export const purchasePackageByIdentifier = async (packageIdentifier: string, userId?: string): Promise<boolean> => {
  await initializeRevenueCat(userId);
  if (!rcInitialized) return false;
  if (!Capacitor.isNativePlatform()) {
    console.warn(`Simulation: purchase ${packageIdentifier} (web environment).`);
    return true;
  }
  try {
    const offerings = await Purchases.getOfferings();
    const current = offerings.current;
    if (!current || !current.availablePackages?.length) return false;
    const pkg = current.availablePackages.find((p: any) => String(p?.identifier).toLowerCase() === String(packageIdentifier).toLowerCase());
    const selected = pkg ?? current.availablePackages[0];
    const { customerInfo } = await Purchases.purchasePackage({ aPackage: selected as any });
    const hasPremium = !!customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID];
    if (hasPremium) await hideBanner();
    return hasPremium;
  } catch (e: any) {
    if (e?.userCancelled) return false;
    console.error('purchasePackageByIdentifier error:', e);
    return false;
  }
};

export const purchaseMonthlySubscription = async (userId?: string): Promise<boolean> => {
  await initializeRevenueCat(userId);
  if (!rcInitialized) return false;
  if (!Capacitor.isNativePlatform()) {
    console.warn('Simulation: purchase monthly (web environment).');
    return true;
  }
  try {
    const offerings = await Purchases.getOfferings();
    const current = offerings.current;
    if (!current || !current.availablePackages?.length) return false;
    const monthly = current.availablePackages.find((p: any) => {
      const id = String(p?.identifier || '').toLowerCase();
      const prodId = String(p?.product?.identifier || '').toLowerCase();
      return id.includes('month') || id === PACKAGE_ID_MONTHLY || prodId.includes('month');
    }) ?? current.availablePackages[0];
    const { customerInfo } = await Purchases.purchasePackage({ aPackage: monthly as any });
    const hasPremium = !!customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID];
    if (hasPremium) await hideBanner();
    return hasPremium;
  } catch (e: any) {
    if (e?.userCancelled) return false;
    console.error('purchaseMonthlySubscription error:', e);
    return false;
  }
};

export const syncPremiumEntitlement = async (userId?: string): Promise<boolean> => {
  await initializeRevenueCat(userId);
  if (!rcInitialized) return false;
  try {
    // getCustomerInfo is supported by purchases-capacitor
    const { customerInfo } = (await (Purchases as any).getCustomerInfo?.()) || {};
    const info = customerInfo ?? (await Purchases.restorePurchases()).customerInfo;
    const hasPremium = !!info?.entitlements?.active?.[PREMIUM_ENTITLEMENT_ID];
    if (hasPremium) await hideBanner();
    return !!hasPremium;
  } catch (e) {
    console.error('syncPremiumEntitlement error:', e);
    return false;
  }
};

// Migration helper: Transfer purchases from old profile-based user ID to new device-based ID
export const migrateOldPurchases = async (oldUserId: string): Promise<boolean> => {
  if (!Capacitor.isNativePlatform()) return false;
  
  try {
    // First ensure RC is initialized
    if (!rcInitialized) {
      await Purchases.configure({ apiKey: RC_PUBLIC_SDK_KEY });
      rcInitialized = true;
    }

    // Log in with the OLD user ID to access old purchases
    console.log(`Attempting to restore old purchases for user: ${oldUserId}`);
    await Purchases.logIn({ appUserID: oldUserId });
    
    // Restore purchases for old user
    const { customerInfo: oldInfo } = await Purchases.restorePurchases();
    const hadOldPremium = !!oldInfo?.entitlements?.active?.[PREMIUM_ENTITLEMENT_ID];
    
    if (!hadOldPremium) {
      console.log('No active premium found on old user ID');
      // Switch back to device user
      const deviceId = getOrCreateFallbackUserId();
      await Purchases.logIn({ appUserID: deviceId });
      currentRcUserId = deviceId;
      return false;
    }

    console.log('Found premium on old user! Transferring to device user...');
    
    // Now switch to device ID - RC will automatically merge the purchase history
    const deviceId = getOrCreateFallbackUserId();
    await Purchases.logIn({ appUserID: deviceId });
    currentRcUserId = deviceId;
    
    // Verify the transfer worked
    const { customerInfo: newInfo } = await Purchases.restorePurchases();
    const hasNewPremium = !!newInfo?.entitlements?.active?.[PREMIUM_ENTITLEMENT_ID];
    
    if (hasNewPremium) {
      console.log('✅ Successfully migrated purchases to device user!');
      await hideBanner();
      
      // Mark migration as complete
      try {
        window.localStorage.setItem('rc_migration_complete_v1', 'true');
      } catch {}
      
      return true;
    } else {
      console.warn('⚠️ Migration may have failed - premium not found on new user');
      return false;
    }
  } catch (e) {
    console.error('migrateOldPurchases error:', e);
    // Try to recover to device user
    try {
      const deviceId = getOrCreateFallbackUserId();
      await Purchases.logIn({ appUserID: deviceId });
      currentRcUserId = deviceId;
    } catch {}
    return false;
  }
};

