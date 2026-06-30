import { ConceptRound, ActivityType } from '../../../../types';

// ─── SVG helpers ────────────────────────────────────────────────────────────
// All SVGs are 200×300 px, drawn large so they fill the card.

// Long vertical bar (indigo) – starts near top, ends at bottom
const LONG_BAR = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect x='70' y='10' width='60' height='280' rx='20' fill='%236366f1'/></svg>`;

// Short vertical bar (red) – lower half only
const SHORT_BAR = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect x='70' y='170' width='60' height='120' rx='20' fill='%23ef4444'/></svg>`;

// Long train: locomotive + 3 wagons
const LONG_TRAIN = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 120'><rect x='5' y='20' width='70' height='60' rx='8' fill='%2310b981'/><rect x='80' y='35' width='55' height='45' rx='6' fill='%2310b981'/><rect x='140' y='35' width='55' height='45' rx='6' fill='%2310b981'/><rect x='200' y='35' width='55' height='45' rx='6' fill='%2310b981'/><rect x='258' y='45' width='35' height='25' rx='4' fill='%2310b981'/><circle cx='35' cy='88' r='14' fill='%23333'/><circle cx='107' cy='88' r='12' fill='%23333'/><circle cx='167' cy='88' r='12' fill='%23333'/><circle cx='227' cy='88' r='12' fill='%23333'/><circle cx='275' cy='75' r='10' fill='%23333'/><rect x='4' y='18' width='72' height='20' rx='6' fill='%2334d399'/><polygon points='75,48 90,36 90,80 75,80' fill='%23333'/></svg>`;

// Short train: locomotive only
const SHORT_TRAIN = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 120'><rect x='85' y='25' width='75' height='65' rx='10' fill='%23f59e0b'/><rect x='83' y='22' width='77' height='22' rx='6' fill='%23fcd34d'/><circle cx='122' cy='100' r='14' fill='%23333'/><polygon points='160,55 185,38 185,88 160,88' fill='%23555'/></svg>`;

// Long rope: wide wavy line crossing full width
const LONG_ROPE = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 100'><path d='M5,50 Q40,10 75,50 T145,50 T215,50 T285,50' fill='none' stroke='%23ec4899' stroke-width='16' stroke-linecap='round'/></svg>`;

// Short rope: single arc in the center
const SHORT_ROPE = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 100'><path d='M90,50 Q150,10 210,50' fill='none' stroke='%2306b6d4' stroke-width='16' stroke-linecap='round'/></svg>`;

// Long pencil: tall thin rectangle with cap + tip
const LONG_PENCIL = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 300'><rect x='33' y='20' width='34' height='220' fill='%23fde68a'/><rect x='33' y='20' width='34' height='20' rx='4' fill='%23f59e0b'/><polygon points='33,240 67,240 50,285' fill='%239ca3af'/><polygon points='42,260 58,260 50,285' fill='%23374151'/></svg>`;

// Short pencil: same style but half height
const SHORT_PENCIL = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 300'><rect x='33' y='130' width='34' height='110' fill='%23fde68a'/><rect x='33' y='130' width='34' height='20' rx='4' fill='%23f59e0b'/><polygon points='33,240 67,240 50,285' fill='%239ca3af'/><polygon points='42,260 58,260 50,285' fill='%23374151'/></svg>`;

// ─── Data ────────────────────────────────────────────────────────────────────

export const abstractLongShortData: ConceptRound[] = [
    // 1. Çubuk – UZUN
    { 
        id: 1, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.RelativeLongShort, 
        speech: {
            tr: { correct: 'Evet! Bu çubuk uzundur.', wrong: 'Hayır, bu çubuk kısadır.' },
            en: { correct: 'Yes! This stick is long.', wrong: 'No, this stick is short.' }
        },
        options: [
            { id: 9001, word: "uzun", imageUrl: LONG_BAR,  isCorrect: true,  audioKey: "", spokenText: "uzun çubuk" },
            { id: 9002, word: "kısa", imageUrl: SHORT_BAR, isCorrect: false, audioKey: "", spokenText: "kısa çubuk" }
        ]
    },
    // 2. Çubuk – KISA
    { 
        id: 2, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.RelativeLongShort, 
        speech: {
            tr: { correct: 'Evet! Bu çubuk kısadır.', wrong: 'Hayır, bu çubuk uzundur.' },
            en: { correct: 'Yes! This stick is short.', wrong: 'No, this stick is long.' }
        },
        options: [
            { id: 9001, word: "uzun", imageUrl: LONG_BAR,  isCorrect: false, audioKey: "", spokenText: "uzun çubuk" },
            { id: 9002, word: "kısa", imageUrl: SHORT_BAR, isCorrect: true,  audioKey: "", spokenText: "kısa çubuk" }
        ]
    },

    // 3. Tren – UZUN
    { 
        id: 3, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.RelativeLongShort, 
        speech: {
            tr: { correct: 'Evet! Bu tren uzundur.', wrong: 'Hayır, bu tren kısadır.' },
            en: { correct: 'Yes! This train is long.', wrong: 'No, this train is short.' }
        },
        options: [
            { id: 9003, word: "uzun tren", imageUrl: LONG_TRAIN,  isCorrect: true,  audioKey: "tren", spokenText: "uzun tren" },
            { id: 9004, word: "kısa tren", imageUrl: SHORT_TRAIN, isCorrect: false, audioKey: "tren", spokenText: "kısa tren" }
        ]
    },
    // 4. Tren – KISA
    { 
        id: 4, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.RelativeLongShort, 
        speech: {
            tr: { correct: 'Evet! Bu tren kısadır.', wrong: 'Hayır, bu tren uzundur.' },
            en: { correct: 'Yes! This train is short.', wrong: 'No, this train is long.' }
        },
        options: [
            { id: 9003, word: "uzun tren", imageUrl: LONG_TRAIN,  isCorrect: false, audioKey: "tren", spokenText: "uzun tren" },
            { id: 9004, word: "kısa tren", imageUrl: SHORT_TRAIN, isCorrect: true,  audioKey: "tren", spokenText: "kısa tren" }
        ]
    },

    // 5. Kalem – UZUN
    { 
        id: 5, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.RelativeLongShort, 
        speech: {
            tr: { correct: 'Evet! Bu kalem uzundur.', wrong: 'Hayır, bu kalem kısadır.' },
            en: { correct: 'Yes! This pencil is long.', wrong: 'No, this pencil is short.' }
        },
        options: [
            { id: 9005, word: "uzun kalem", imageUrl: LONG_PENCIL,  isCorrect: true,  audioKey: "kalem", spokenText: "uzun kalem" },
            { id: 9006, word: "kısa kalem", imageUrl: SHORT_PENCIL, isCorrect: false, audioKey: "kalem", spokenText: "kısa kalem" }
        ]
    },
    // 6. Kalem – KISA
    { 
        id: 6, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.RelativeLongShort, 
        speech: {
            tr: { correct: 'Evet! Bu kalem kısadır.', wrong: 'Hayır, bu kalem uzundur.' },
            en: { correct: 'Yes! This pencil is short.', wrong: 'No, this pencil is long.' }
        },
        options: [
            { id: 9005, word: "uzun kalem", imageUrl: LONG_PENCIL,  isCorrect: false, audioKey: "kalem", spokenText: "uzun kalem" },
            { id: 9006, word: "kısa kalem", imageUrl: SHORT_PENCIL, isCorrect: true,  audioKey: "kalem", spokenText: "kısa kalem" }
        ]
    },

    // 7. İp – UZUN
    { 
        id: 7, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.RelativeLongShort, 
        speech: {
            tr: { correct: 'Evet! Bu ip uzundur.', wrong: 'Hayır, bu ip kısadır.' },
            en: { correct: 'Yes! This rope is long.', wrong: 'No, this rope is short.' }
        },
        options: [
            { id: 9007, word: "uzun ip", imageUrl: LONG_ROPE,  isCorrect: true,  audioKey: "ip", spokenText: "uzun ip" },
            { id: 9008, word: "kısa ip", imageUrl: SHORT_ROPE, isCorrect: false, audioKey: "ip", spokenText: "kısa ip" }
        ]
    },
    // 8. İp – KISA
    { 
        id: 8, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.RelativeLongShort, 
        speech: {
            tr: { correct: 'Evet! Bu ip kısadır.', wrong: 'Hayır, bu ip uzundur.' },
            en: { correct: 'Yes! This rope is short.', wrong: 'No, this rope is long.' }
        },
        options: [
            { id: 9007, word: "uzun ip", imageUrl: LONG_ROPE,  isCorrect: false, audioKey: "ip", spokenText: "uzun ip" },
            { id: 9008, word: "kısa ip", imageUrl: SHORT_ROPE, isCorrect: true,  audioKey: "ip", spokenText: "kısa ip" }
        ]
    }
];
