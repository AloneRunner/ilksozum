// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (kirik-saglam). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/kirik-saglam/ → id 3101-3120.
import { ConceptRound, ActivityType } from '../../../../types';

export const brokenIntactDataYeni: ConceptRound[] = [
    // araba
    {
        id: 1,
        question: "Hangi araba kırık?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi araba kırık?', correct: 'Evet! Bu araba kırık.', wrong: 'Hayır, bu araba sağlam.' }
        },
        options: [
            { id: 3101, word: "araba", imageUrl: "/images/3101.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3102, word: "araba", imageUrl: "/images/3102.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 2,
        question: "Hangi araba sağlam?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi araba sağlam?', correct: 'Evet! Bu araba sağlam.', wrong: 'Hayır, bu araba kırık.' }
        },
        options: [
            { id: 3102, word: "araba", imageUrl: "/images/3102.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3101, word: "araba", imageUrl: "/images/3101.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // bisküvi
    {
        id: 3,
        question: "Hangi bisküvi kırık?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi bisküvi kırık?', correct: 'Evet! Bu bisküvi kırık.', wrong: 'Hayır, bu bisküvi sağlam.' }
        },
        options: [
            { id: 3103, word: "bisküvi", imageUrl: "/images/3103.webp", isCorrect: true, audioKey: "bisküvi", spokenText: "bisküvi" },
            { id: 3104, word: "bisküvi", imageUrl: "/images/3104.webp", isCorrect: false, audioKey: "bisküvi", spokenText: "bisküvi" }
        ]
    },
    {
        id: 4,
        question: "Hangi bisküvi sağlam?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi bisküvi sağlam?', correct: 'Evet! Bu bisküvi sağlam.', wrong: 'Hayır, bu bisküvi kırık.' }
        },
        options: [
            { id: 3104, word: "bisküvi", imageUrl: "/images/3104.webp", isCorrect: true, audioKey: "bisküvi", spokenText: "bisküvi" },
            { id: 3103, word: "bisküvi", imageUrl: "/images/3103.webp", isCorrect: false, audioKey: "bisküvi", spokenText: "bisküvi" }
        ]
    },
    // fincan
    {
        id: 5,
        question: "Hangi fincan kırık?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi fincan kırık?', correct: 'Evet! Bu fincan kırık.', wrong: 'Hayır, bu fincan sağlam.' }
        },
        options: [
            { id: 3105, word: "fincan", imageUrl: "/images/3105.webp", isCorrect: true, audioKey: "fincan", spokenText: "fincan" },
            { id: 3106, word: "fincan", imageUrl: "/images/3106.webp", isCorrect: false, audioKey: "fincan", spokenText: "fincan" }
        ]
    },
    {
        id: 6,
        question: "Hangi fincan sağlam?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi fincan sağlam?', correct: 'Evet! Bu fincan sağlam.', wrong: 'Hayır, bu fincan kırık.' }
        },
        options: [
            { id: 3106, word: "fincan", imageUrl: "/images/3106.webp", isCorrect: true, audioKey: "fincan", spokenText: "fincan" },
            { id: 3105, word: "fincan", imageUrl: "/images/3105.webp", isCorrect: false, audioKey: "fincan", spokenText: "fincan" }
        ]
    },
    // gözlük
    {
        id: 7,
        question: "Hangi gözlük kırık?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi gözlük kırık?', correct: 'Evet! Bu gözlük kırık.', wrong: 'Hayır, bu gözlük sağlam.' }
        },
        options: [
            { id: 3107, word: "gözlük", imageUrl: "/images/3107.webp", isCorrect: true, audioKey: "gözlük", spokenText: "gözlük" },
            { id: 3108, word: "gözlük", imageUrl: "/images/3108.webp", isCorrect: false, audioKey: "gözlük", spokenText: "gözlük" }
        ]
    },
    {
        id: 8,
        question: "Hangi gözlük sağlam?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi gözlük sağlam?', correct: 'Evet! Bu gözlük sağlam.', wrong: 'Hayır, bu gözlük kırık.' }
        },
        options: [
            { id: 3108, word: "gözlük", imageUrl: "/images/3108.webp", isCorrect: true, audioKey: "gözlük", spokenText: "gözlük" },
            { id: 3107, word: "gözlük", imageUrl: "/images/3107.webp", isCorrect: false, audioKey: "gözlük", spokenText: "gözlük" }
        ]
    },
    // kalem
    {
        id: 9,
        question: "Hangi kalem kırık?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi kalem kırık?', correct: 'Evet! Bu kalem kırık.', wrong: 'Hayır, bu kalem sağlam.' }
        },
        options: [
            { id: 3109, word: "kalem", imageUrl: "/images/3109.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 3110, word: "kalem", imageUrl: "/images/3110.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 10,
        question: "Hangi kalem sağlam?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi kalem sağlam?', correct: 'Evet! Bu kalem sağlam.', wrong: 'Hayır, bu kalem kırık.' }
        },
        options: [
            { id: 3110, word: "kalem", imageUrl: "/images/3110.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 3109, word: "kalem", imageUrl: "/images/3109.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // robot
    {
        id: 11,
        question: "Hangi robot kırık?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi robot kırık?', correct: 'Evet! Bu robot kırık.', wrong: 'Hayır, bu robot sağlam.' }
        },
        options: [
            { id: 3111, word: "robot", imageUrl: "/images/3111.webp", isCorrect: true, audioKey: "robot", spokenText: "robot" },
            { id: 3112, word: "robot", imageUrl: "/images/3112.webp", isCorrect: false, audioKey: "robot", spokenText: "robot" }
        ]
    },
    {
        id: 12,
        question: "Hangi robot sağlam?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi robot sağlam?', correct: 'Evet! Bu robot sağlam.', wrong: 'Hayır, bu robot kırık.' }
        },
        options: [
            { id: 3112, word: "robot", imageUrl: "/images/3112.webp", isCorrect: true, audioKey: "robot", spokenText: "robot" },
            { id: 3111, word: "robot", imageUrl: "/images/3111.webp", isCorrect: false, audioKey: "robot", spokenText: "robot" }
        ]
    },
    // saksı
    {
        id: 13,
        question: "Hangi saksı kırık?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi saksı kırık?', correct: 'Evet! Bu saksı kırık.', wrong: 'Hayır, bu saksı sağlam.' }
        },
        options: [
            { id: 3113, word: "saksı", imageUrl: "/images/3113.webp", isCorrect: true, audioKey: "saksı", spokenText: "saksı" },
            { id: 3114, word: "saksı", imageUrl: "/images/3114.webp", isCorrect: false, audioKey: "saksı", spokenText: "saksı" }
        ]
    },
    {
        id: 14,
        question: "Hangi saksı sağlam?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi saksı sağlam?', correct: 'Evet! Bu saksı sağlam.', wrong: 'Hayır, bu saksı kırık.' }
        },
        options: [
            { id: 3114, word: "saksı", imageUrl: "/images/3114.webp", isCorrect: true, audioKey: "saksı", spokenText: "saksı" },
            { id: 3113, word: "saksı", imageUrl: "/images/3113.webp", isCorrect: false, audioKey: "saksı", spokenText: "saksı" }
        ]
    },
    // sandalye
    {
        id: 15,
        question: "Hangi sandalye kırık?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi sandalye kırık?', correct: 'Evet! Bu sandalye kırık.', wrong: 'Hayır, bu sandalye sağlam.' }
        },
        options: [
            { id: 3115, word: "sandalye", imageUrl: "/images/3115.webp", isCorrect: true, audioKey: "sandalye", spokenText: "sandalye" },
            { id: 3116, word: "sandalye", imageUrl: "/images/3116.webp", isCorrect: false, audioKey: "sandalye", spokenText: "sandalye" }
        ]
    },
    {
        id: 16,
        question: "Hangi sandalye sağlam?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi sandalye sağlam?', correct: 'Evet! Bu sandalye sağlam.', wrong: 'Hayır, bu sandalye kırık.' }
        },
        options: [
            { id: 3116, word: "sandalye", imageUrl: "/images/3116.webp", isCorrect: true, audioKey: "sandalye", spokenText: "sandalye" },
            { id: 3115, word: "sandalye", imageUrl: "/images/3115.webp", isCorrect: false, audioKey: "sandalye", spokenText: "sandalye" }
        ]
    },
    // tabak
    {
        id: 17,
        question: "Hangi tabak kırık?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi tabak kırık?', correct: 'Evet! Bu tabak kırık.', wrong: 'Hayır, bu tabak sağlam.' }
        },
        options: [
            { id: 3117, word: "tabak", imageUrl: "/images/3117.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 3118, word: "tabak", imageUrl: "/images/3118.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
    {
        id: 18,
        question: "Hangi tabak sağlam?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi tabak sağlam?', correct: 'Evet! Bu tabak sağlam.', wrong: 'Hayır, bu tabak kırık.' }
        },
        options: [
            { id: 3118, word: "tabak", imageUrl: "/images/3118.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 3117, word: "tabak", imageUrl: "/images/3117.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
    // yumurta
    {
        id: 19,
        question: "Hangi yumurta kırık?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi yumurta kırık?', correct: 'Evet! Bu yumurta kırık.', wrong: 'Hayır, bu yumurta sağlam.' }
        },
        options: [
            { id: 3119, word: "yumurta", imageUrl: "/images/3119.webp", isCorrect: true, audioKey: "yumurta", spokenText: "yumurta" },
            { id: 3120, word: "yumurta", imageUrl: "/images/3120.webp", isCorrect: false, audioKey: "yumurta", spokenText: "yumurta" }
        ]
    },
    {
        id: 20,
        question: "Hangi yumurta sağlam?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Hangi yumurta sağlam?', correct: 'Evet! Bu yumurta sağlam.', wrong: 'Hayır, bu yumurta kırık.' }
        },
        options: [
            { id: 3120, word: "yumurta", imageUrl: "/images/3120.webp", isCorrect: true, audioKey: "yumurta", spokenText: "yumurta" },
            { id: 3119, word: "yumurta", imageUrl: "/images/3119.webp", isCorrect: false, audioKey: "yumurta", spokenText: "yumurta" }
        ]
    },
];
