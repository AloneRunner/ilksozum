/**
 * Kısa dokunsal titreşim (telefonda). Android'de Capacitor Haptics kullanılır;
 * tarayıcıda navigator.vibrate denenir. Çok sık çağrılırsa kendini sınırlar.
 */
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

let son = 0;

export const titret = (guc: 'hafif' | 'orta' = 'hafif', enAzAralikMs = 60): void => {
    const simdi = Date.now();
    if (simdi - son < enAzAralikMs) return;
    son = simdi;
    try {
        if (Capacitor.isNativePlatform()) {
            Haptics.impact({ style: guc === 'orta' ? ImpactStyle.Medium : ImpactStyle.Light }).catch(() => { /* yoksay */ });
        } else if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
            navigator.vibrate(guc === 'orta' ? 25 : 12);
        }
    } catch { /* yoksay */ }
};
