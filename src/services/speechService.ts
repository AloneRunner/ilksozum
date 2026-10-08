import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { SES_KAYITLARI } from '../data/sesListesi.ts';

// Current language code for TTS (BCP-47)
let speechLang = 'tr-TR';

// Uygulama yalnızca Türkçe: konuşma dili her zaman tr-TR.
export function setSpeechLanguage(_lang?: 'tr' | 'en' | 'de' | 'fr' | 'nl' | 'az') {
    speechLang = 'tr-TR';
}

let isMuted = false;
let currentEffect: HTMLAudioElement | null = null;
let supportedLangsCache: string[] | null = null;
let supportedLangsPromise: Promise<string[]> | null = null;

/** Cihazda Türkçe ses var mı? (ana ekrandaki "Ses gelmiyor mu?" uyarısı için). Bilinemiyorsa true döner. */
export const turkceSesVarMi = async (): Promise<boolean> => {
    try {
        if (Capacitor.isNativePlatform()) {
            const diller = await getSupportedLanguagesNative();
            return diller.length === 0 || diller.some((d) => d.toLowerCase().startsWith('tr'));
        }
        if (typeof speechSynthesis === 'undefined') return true;
        let sesler = speechSynthesis.getVoices();
        if (sesler.length === 0) {
            await new Promise((r) => setTimeout(r, 800));
            sesler = speechSynthesis.getVoices();
        }
        return sesler.length === 0 || sesler.some((v) => v.lang.toLowerCase().startsWith('tr'));
    } catch {
        return true;
    }
};

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

/** Oyunların kendi ürettiği sesler (Web Audio) de sessiz ayarına uysun diye. */
export const getMutedState = (): boolean => isMuted;

/**
 * Stops any currently playing or pending speech.
 */
export const cancelSpeech = async () => {
    kayitDurdur();
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

// Telaffuz düzeltmeleri (yalnız seslendirmede; ekrandaki yazı değişmez).
// Kaan (2026-10-06): ses motoru tek başına "nine" kelimesini İngilizce 9 sanıp "nayn" okuyordu.
// Görünmez hece işareti (U+00AD) kelimeyi İngilizceden ayırır, okunuş "ni-ne" kalır.
const TELAFFUZ: Array<[RegExp, string]> = [
    [/(^|[^a-zçğıöşü])(n)ine(?=$|[^a-zçğıöşü])/gi, '$1$2i­ne'],
];
const telaffuzDuzelt = (metin: string): string => TELAFFUZ.reduce((m, [re, yeni]) => m.replace(re, yeni), metin);

// Kayıtlı sesler (ElevenLabs, Kaan 2026-10-06): metnin kaydı varsa mp3 çalınır, yoksa cihaz sesi.
// Anahtar tools/ses/uret-ses.mjs'deki ile aynı olmalı.
const kayitAnahtari = (m: string): string => m.normalize('NFC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('tr-TR');
// Ayarlar > "Kayıtlı ses (Gökçe)": kapalıysa her şey cihaz sesiyle okunur
let kayitliSesAcik = (() => { try { return localStorage.getItem('kayitliSes_v1') !== 'false'; } catch { return true; } })();
export const setKayitliSes = (acik: boolean) => { kayitliSesAcik = acik; };
let kayitSesi: HTMLAudioElement | null = null;
let kayitSayaci = 0; // her yeni konuşma / iptal önceki kayıt dizisini geçersiz kılar

// Kayıt hızı (Ağzımı İzle "yavaş" modu); tarayıcı sesin perdesini korur
let kayitHizi = 1;
export const setKayitHizi = (h: number) => { kayitHizi = h; };

// Ağız hareketi için: hangi kaydın çaldığını dinleyenlere bildirir (null = sustu)
type KayitDinleyici = (k: { dosya: string; audio: HTMLAudioElement } | null) => void;
const kayitDinleyiciler = new Set<KayitDinleyici>();
export const kayitDinle = (cb: KayitDinleyici): (() => void) => { kayitDinleyiciler.add(cb); return () => { kayitDinleyiciler.delete(cb); }; };
const kayitBildir = (k: { dosya: string; audio: HTMLAudioElement } | null) => { kayitDinleyiciler.forEach((cb) => { try { cb(k); } catch { /* yok say */ } }); };

function kayitDurdur() {
    kayitSayaci++;
    if (kayitSesi) { kayitSesi.pause(); kayitSesi = null; kayitBildir(null); }
}

/** Metnin tamamı ya da cümlelerinin hepsi kayıtlıysa dosya listesi ("Aferin! Bu kalem kalın." → 2 kayıt). */
const kayitBul = (metin: string): string | undefined => {
    const k = kayitAnahtari(metin);
    return SES_KAYITLARI[k] || SES_KAYITLARI[k.replace(/[.!?,]+$/, '')];
};
/** Metnin Gökçe kaydı var mı (İfade Tahtası cümlesi gibi parça parça okumalar için). */
export const kayitVarMi = (metin: string): boolean => kayitliSesAcik && !!kayitBul(metin);

const kayitliDosyalar = (metin: string): string[] | null => {
    const tam = kayitBul(metin);
    if (tam) return [tam];
    const parcalar = (metin.match(/[^.!?]+[.!?]*/g) || []).map((p) => p.trim()).filter(Boolean);
    if (parcalar.length < 2) return null;
    const dosyalar = parcalar.map((p) => kayitBul(p));
    return dosyalar.every(Boolean) ? (dosyalar as string[]) : null;
};

/** Kayıtları sırayla çalar; çalınamazsa false döner (cihaz sesine düşülür). */
const kayitCal = async (dosyalar: string[]): Promise<boolean> => {
    const sira = ++kayitSayaci;
    for (const d of dosyalar) {
        if (sira !== kayitSayaci) return true; // araya başka konuşma girdi
        const tamam = await new Promise<boolean>((resolve) => {
            const audio = new Audio(`/audio/ses/${d}.mp3`);
            kayitSesi = audio;
            audio.playbackRate = kayitHizi;
            audio.onplaying = () => kayitBildir({ dosya: d, audio });
            audio.onended = () => resolve(true);
            audio.onerror = () => resolve(false);
            audio.onpause = () => { if (!audio.ended) resolve(true); };
            audio.play().catch(() => resolve(false));
        });
        if (!tamam) return false;
    }
    if (sira === kayitSayaci) { kayitSesi = null; kayitBildir(null); }
    return true;
};

/** Ağzımı İzle: kayıt varsa (Kayıtlı ses ayarı kapalı olsa bile) kayıttan çalar; ağız ancak kayıtla senkron. */
export const kayittanSoyle = async (metin: string): Promise<void> => {
    if (isMuted || !metin) return;
    await cancelSpeech();
    stopCurrentEffect();
    const d = kayitliDosyalar(metin);
    if (d && await kayitCal(d)) return;
    await speak(metin);
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
    const kayitMetni = textToSpeak;
    if (!overrideLang || overrideLang.startsWith('tr')) textToSpeak = telaffuzDuzelt(textToSpeak);

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

    if (kayitliSesAcik && (!overrideLang || overrideLang.startsWith('tr'))) {
        const dosyalar = kayitliDosyalar(kayitMetni);
        if (import.meta.env.DEV) console.log('[SES]', dosyalar ? 'kayıt' : 'cihaz', kayitMetni);
        if (dosyalar && await kayitCal(dosyalar)) return;
    }

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