import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

// Current language code for TTS (BCP-47)
let speechLang = 'tr-TR';

export function setSpeechLanguage(lang: 'tr' | 'en' | 'de' | 'fr' | 'nl' | 'az') {
    const map: Record<string, string> = {
        tr: 'tr-TR',
        en: 'en-US',
        de: 'de-DE',
        fr: 'fr-FR',
        nl: 'nl-NL',
        az: 'az-Latn-AZ', // Azerice Latin
    };
    speechLang = map[lang] || 'en-US';
}

let isMuted = false;
let currentEffect: HTMLAudioElement | null = null;
let supportedLangsCache: string[] | null = null;
let supportedLangsPromise: Promise<string[]> | null = null;

const getSupportedLanguagesNative = async (): Promise<string[]> => {
    if (!Capacitor.isNativePlatform()) return [];
    if (supportedLangsCache) return supportedLangsCache;
    if (supportedLangsPromise) return supportedLangsPromise;

    supportedLangsPromise = (async () => {
        try {
            const result = await TextToSpeech.getSupportedLanguages();
            const langs = (result?.languages || []).filter(Boolean);
            supportedLangsCache = langs;
            return langs;
        } catch (e) {
            return [];
        } finally {
            supportedLangsPromise = null;
        }
    })();

    return supportedLangsPromise;
};

const resolveNativeLang = async (requestedLang: string): Promise<string> => {
    const langs = await getSupportedLanguagesNative();
    if (!langs || langs.length === 0) return requestedLang;

    if (langs.includes(requestedLang)) return requestedLang;

    const requestedPrefix = requestedLang.split('-')[0].toLowerCase();
    const prefixMatch = langs.find(lang => lang.toLowerCase().startsWith(requestedPrefix));
    if (prefixMatch) return prefixMatch;

    const trMatch = langs.find(lang => lang.toLowerCase().startsWith('tr'));
    if (trMatch) return trMatch;

    const enMatch = langs.find(lang => lang.toLowerCase().startsWith('en'));
    if (enMatch) return enMatch;

    return requestedLang;
};

/**
 * Updates the global mute state for the speech service.
 * @param {boolean} muted - Whether the sound should be muted.
 */
export const setMutedState = (muted: boolean) => {
    isMuted = muted;
    if (isMuted) {
        cancelSpeech();
        stopCurrentEffect();
    }
};

/**
 * Stops any currently playing or pending speech.
 */
export const cancelSpeech = async () => {
    if (Capacitor.isNativePlatform()) {
        try {
            await TextToSpeech.stop();
        } catch (e) {
            // Ignore errors if TTS wasn't speaking
        }
    } else {
        if (typeof speechSynthesis !== 'undefined' && (speechSynthesis.speaking || speechSynthesis.pending)) {
            speechSynthesis.cancel();
        }
    }
};

/**
 * Stops any currently playing sound effect.
 */
const stopCurrentEffect = () => {
    if (currentEffect) {
        currentEffect.pause();
        currentEffect.currentTime = 0;
        currentEffect = null;
    }
};

/**
 * Speaks a given text using the appropriate TTS engine for the platform.
 * Returns a promise that resolves when the speech is finished.
 * @param {string} textToSpeak - The text to be spoken.
 * @returns {Promise<void>}
 */
export const speak = async (textToSpeak: string, overrideLang?: string): Promise<void> => {
    if (isMuted || !textToSpeak) {
        return Promise.resolve();
    }

    // Dev: log the exact text spoken so F12 shows live TTS output (useful for i18n checks)
    try {
        if (typeof window !== 'undefined') {
            const host = window.location && window.location.hostname ? window.location.hostname : '';
            const isLocal = host === 'localhost' || host === '127.0.0.1' || host.startsWith('192.168.') || window.location.protocol === 'file:';
            if (isLocal) {
                const displayLang = overrideLang || speechLang;
                console.log('[TTS]', { text: textToSpeak, lang: displayLang, platform: Capacitor.getPlatform ? Capacitor.getPlatform() : (Capacitor.isNativePlatform() ? 'native' : 'web') });
            }
        }
    } catch (e) {
        // ignore logging errors
    }

    await cancelSpeech();
    stopCurrentEffect();

    if (Capacitor.isNativePlatform()) {
        const requestedLang = overrideLang || speechLang;
        
        // Check what languages the native TTS supports
        let supportedLangs: string[] = [];
        try {
            supportedLangs = await getSupportedLanguagesNative();
            console.log('[TTS] Supported languages:', supportedLangs);
        } catch (e) {
            console.warn('[TTS] Failed to get supported languages:', e);
        }

        // Try resolveNativeLang when supported languages are available
        let primaryLang = requestedLang;
        if (supportedLangs.length === 0) {
            console.warn('[TTS] No supported languages detected on native TTS; attempting native speak anyway');
        } else {
            try {
                primaryLang = await resolveNativeLang(requestedLang);
                console.log('[TTS] Resolved language:', requestedLang, '->', primaryLang);
            } catch (e) {
                console.warn("Language resolution failed:", e);
            }
        }
        
        // Try with minimal parameters first (best for Samsung TTS)
        try {
            console.log('[TTS] Attempting minimal speak:', { text: textToSpeak.substring(0, 30), lang: primaryLang });
            await TextToSpeech.speak({
                text: textToSpeak,
                lang: primaryLang,
            });
            console.log('[TTS] Minimal speak succeeded');
            return;
        } catch (e) {
            console.warn('[TTS] Minimal speak failed:', e);
            // Try with standard parameters
            try {
                console.log('[TTS] Attempting standard speak with rate/pitch/volume');
                await TextToSpeech.speak({
                    text: textToSpeak,
                    lang: primaryLang,
                    rate: 0.9,
                    pitch: 1.0,
                    volume: 1.0,
                });
                console.log('[TTS] Standard speak succeeded');
                return;
            } catch (e2) {
                console.warn('[TTS] Standard speak also failed:', e2);
                // Try simple fallback languages
                const fallbackCandidates = ['en-US', 'en', 'tr-TR'];
                for (const fallback of fallbackCandidates) {
                    if (fallback === primaryLang) continue;
                    try {
                        console.log('[TTS] Trying fallback language:', fallback);
                        await TextToSpeech.speak({
                            text: textToSpeak,
                            lang: fallback,
                        });
                        console.log('[TTS] Fallback succeeded with:', fallback);
                        return;
                    } catch (innerError) {
                        console.warn('[TTS] Fallback failed for:', fallback, innerError);
                    }
                }
                console.error("[TTS] All native TTS attempts failed. Falling back to Web Speech API:", e);
                // Fall through to web TTS below
            }
        }
    }
    
    // Web Speech API fallback (reached if native TTS not available or all attempts failed)
    if (typeof speechSynthesis !== 'undefined') {
        return new Promise((resolve) => {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            const lang = overrideLang || speechLang;
            utterance.lang = lang;
            utterance.rate = 0.9;

            // Try to select the most appropriate voice for the target language
            try {
                const chooseVoice = () => {
                    const voices = speechSynthesis.getVoices?.() || [];
                    if (voices.length === 0) return;
                    const langPrefix = lang.split('-')[0];
                    
                    // Special handling for Azerbaijani (often not available in browsers)
                    if (langPrefix === 'az') {
                        // Try Azerbaijani first
                        let voice = voices.find(v => v.lang?.toLowerCase().startsWith('az'));
                        // Fallback to Turkish (very similar language)
                        if (!voice) voice = voices.find(v => v.lang?.toLowerCase().startsWith('tr'));
                        // Last resort: any available voice
                        if (!voice && voices.length > 0) {
                            console.warn('No Azerbaijani or Turkish voice found, using default');
                            voice = voices[0];
                        }
                        if (voice) utterance.voice = voice;
                        return;
                    }
                    
                    // Exact match first
                    let voice = voices.find(v => v.lang?.toLowerCase() === lang.toLowerCase());
                    // Then language-only match (en-*, de-*, ...)
                    if (!voice) voice = voices.find(v => v.lang?.toLowerCase().startsWith(langPrefix));
                    
                    // Special handling for Turkish: try Azerbaijani as fallback
                    if (!voice && langPrefix === 'tr') {
                        voice = voices.find(v => v.lang?.toLowerCase().startsWith('az'));
                    }
                    
                    // General fallback: prefer English for non-Turkish/Azerbaijani languages
                    if (!voice && langPrefix !== 'tr' && langPrefix !== 'az') {
                        voice = voices.find(v => v.lang?.toLowerCase().startsWith('en'));
                    }
                    
                    // Last resort: use first available voice
                    if (!voice && voices.length > 0) {
                        console.warn(`No voice found for ${langPrefix}, using default voice`);
                        voice = voices[0];
                    }
                    
                    if (voice) utterance.voice = voice;
                };

                // Some browsers load voices asynchronously
                if (speechSynthesis.onvoiceschanged !== undefined) {
                    const handler = () => { chooseVoice(); speechSynthesis.onvoiceschanged = null as any; };
                    speechSynthesis.onvoiceschanged = handler;
                    // Also attempt immediately in case voices are already available
                    chooseVoice();
                } else {
                    chooseVoice();
                }
            } catch (e) {
                // Non-fatal: if voice selection fails, rely on browser default
            }

            utterance.onend = () => resolve();
            utterance.onerror = (event) => {
                console.error("Web Speech API error:", (event as any)?.error || event);
                resolve();
            };
            try {
                speechSynthesis.speak(utterance);
            } catch (e) {
                console.error("Speech Synthesis speak() failed:", e);
                resolve();
            }
        });
    } else {
        console.warn("Speech Synthesis API not supported in this browser.");
        return Promise.resolve();
    }
};

/**
 * Plays a sound effect from an MP3 file, if not muted.
 * @param {'correct' | 'incorrect' | 'finish' | 'softincorrect'} effect - The name of the effect.
 * @param options Optional settings such as volume (0.0 - 1.0)
 */
export const playEffect = (effect: 'correct' | 'incorrect' | 'finish' | 'softincorrect', options?: { volume?: number }): Promise<void> => {
  return new Promise((resolve) => {
    if (isMuted) {
      return resolve();
    }
    
    stopCurrentEffect();

    const audioSrc = `/audio/${effect}.mp3`;
    const audio = new Audio(audioSrc);
        if (typeof options?.volume === 'number') {
            audio.volume = Math.max(0, Math.min(1, options.volume));
        }
    currentEffect = audio;

    audio.play().catch(error => {
      console.error(`Error playing sound effect '${effect}':`, error);
      currentEffect = null;
      resolve();
    });

    audio.onended = () => {
      currentEffect = null;
      resolve();
    };

    audio.onerror = () => {
      console.error(`Error loading sound effect '${effect}'`);
      currentEffect = null;
      resolve();
    };
  });
};

/**
 * Play an arbitrary named audio file from /audio/<key>.mp3 (e.g. audioKeys.default values).
 * Returns a promise that resolves when the sound finishes or fails.
 */
export const playNamedAudio = (key: string, options?: { volume?: number; fallbackText?: string }): Promise<void> => {
    return new Promise((resolve) => {
        if (isMuted || !key) return resolve();
        stopCurrentEffect();

        const audioSrc = `/audio/${key}.mp3`;
        const audio = new Audio(audioSrc);
        if (typeof options?.volume === 'number') {
            audio.volume = Math.max(0, Math.min(1, options.volume));
        }
        currentEffect = audio;

        audio.play().catch(async (error) => {
            console.warn(`Error playing audio key '${key}', falling back to TTS:`, error);
            currentEffect = null;
            // fallback to TTS; speak fallbackText if provided, otherwise the key
            try {
                await speak(options?.fallbackText ?? key);
            } catch (e) {
                // ignore failures
            }
            resolve();
        });

        audio.onended = () => {
            currentEffect = null;
            resolve();
        };

        audio.onerror = async () => {
            console.warn(`Error loading audio key '${key}', falling back to TTS`);
            currentEffect = null;
            try {
                await speak(options?.fallbackText ?? key);
            } catch (e) {
                // ignore
            }
            resolve();
        };
    });
};