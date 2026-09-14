/**
 * Mini oyunlar için ortak sesli yönerge yardımcıları.
 * Uygulamanın mevcut TTS servisini kullanır; oyunlar kendi ses efektlerini
 * çalmaya devam eder, bu modül sadece konuşma ekler.
 */
import { speak, cancelSpeech } from '../services/speechService.ts';

const PRAISE = ['Aferin!', 'Harika!', 'Süper!', 'Çok güzel!', 'Bravo!'];
const RETRY = ['Bir daha deneyelim.', 'Tekrar dene.', 'Olmadı, bir daha bak.'];

const pick = (list: string[]) => list[Math.floor(Math.random() * list.length)];

/** Önceki konuşmayı keser ve yeni yönergeyi okur. */
export const sayInstruction = (text: string, delayMs = 0): void => {
    if (!text) return;
    const run = () => {
        cancelSpeech().catch(() => { /* yoksay */ });
        speak(text).catch(() => { /* yoksay */ });
    };
    if (delayMs > 0) window.setTimeout(run, delayMs);
    else run();
};

/** Doğru cevapta kısa, rastgele bir övgü okur. */
export const sayCorrect = (extra?: string): void => {
    const text = extra ? `${pick(PRAISE)} ${extra}` : pick(PRAISE);
    speak(text).catch(() => { /* yoksay */ });
};

/** Yanlış cevapta nötr, cesaretlendirici bir cümle okur. */
export const sayWrong = (): void => {
    speak(pick(RETRY)).catch(() => { /* yoksay */ });
};

/** Oyun tamamlandığında kutlama cümlesi okur. */
export const sayFinished = (text = 'Tebrikler, oyunu bitirdin!'): void => {
    speak(text).catch(() => { /* yoksay */ });
};
