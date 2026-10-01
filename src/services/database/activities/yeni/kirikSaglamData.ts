// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (kirik-saglam). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/kirik-saglam/ → id 3101-3120.
import { ConceptRound, ActivityType } from '../../../../types';

export const brokenIntactDataYeni: ConceptRound[] = [
    // araba
    {
        id: 1,
        question: "Kırık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Kırık olan hangisi?', correct: 'Evet! Araba kırıktır.', wrong: 'Hayır, bu araba sağlamdır.' }
        },
        options: [
            { id: 3101, word: "araba", imageUrl: "/images/3101.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3102, word: "araba", imageUrl: "/images/3102.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 2,
        question: "Sağlam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Sağlam olan hangisi?', correct: 'Evet! Araba sağlamdır.', wrong: 'Hayır, bu araba kırıktır.' }
        },
        options: [
            { id: 3102, word: "araba", imageUrl: "/images/3102.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3101, word: "araba", imageUrl: "/images/3101.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // bisküvi
    {
        id: 3,
        question: "Kırık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Kırık olan hangisi?', correct: 'Evet! Bisküvi kırıktır.', wrong: 'Hayır, bu bisküvi sağlamdır.' }
        },
        options: [
            { id: 3103, word: "bisküvi", imageUrl: "/images/3103.webp", isCorrect: true, audioKey: "bisküvi", spokenText: "bisküvi" },
            { id: 3104, word: "bisküvi", imageUrl: "/images/3104.webp", isCorrect: false, audioKey: "bisküvi", spokenText: "bisküvi" }
        ]
    },
    {
        id: 4,
        question: "Sağlam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Sağlam olan hangisi?', correct: 'Evet! Bisküvi sağlamdır.', wrong: 'Hayır, bu bisküvi kırıktır.' }
        },
        options: [
            { id: 3104, word: "bisküvi", imageUrl: "/images/3104.webp", isCorrect: true, audioKey: "bisküvi", spokenText: "bisküvi" },
            { id: 3103, word: "bisküvi", imageUrl: "/images/3103.webp", isCorrect: false, audioKey: "bisküvi", spokenText: "bisküvi" }
        ]
    },
    // fincan
    {
        id: 5,
        question: "Kırık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Kırık olan hangisi?', correct: 'Evet! Fincan kırıktır.', wrong: 'Hayır, bu fincan sağlamdır.' }
        },
        options: [
            { id: 3105, word: "fincan", imageUrl: "/images/3105.webp", isCorrect: true, audioKey: "fincan", spokenText: "fincan" },
            { id: 3106, word: "fincan", imageUrl: "/images/3106.webp", isCorrect: false, audioKey: "fincan", spokenText: "fincan" }
        ]
    },
    {
        id: 6,
        question: "Sağlam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Sağlam olan hangisi?', correct: 'Evet! Fincan sağlamdır.', wrong: 'Hayır, bu fincan kırıktır.' }
        },
        options: [
            { id: 3106, word: "fincan", imageUrl: "/images/3106.webp", isCorrect: true, audioKey: "fincan", spokenText: "fincan" },
            { id: 3105, word: "fincan", imageUrl: "/images/3105.webp", isCorrect: false, audioKey: "fincan", spokenText: "fincan" }
        ]
    },
    // gözlük
    {
        id: 7,
        question: "Kırık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Kırık olan hangisi?', correct: 'Evet! Gözlük kırıktır.', wrong: 'Hayır, bu gözlük sağlamdır.' }
        },
        options: [
            { id: 3107, word: "gözlük", imageUrl: "/images/3107.webp", isCorrect: true, audioKey: "gözlük", spokenText: "gözlük" },
            { id: 3108, word: "gözlük", imageUrl: "/images/3108.webp", isCorrect: false, audioKey: "gözlük", spokenText: "gözlük" }
        ]
    },
    {
        id: 8,
        question: "Sağlam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Sağlam olan hangisi?', correct: 'Evet! Gözlük sağlamdır.', wrong: 'Hayır, bu gözlük kırıktır.' }
        },
        options: [
            { id: 3108, word: "gözlük", imageUrl: "/images/3108.webp", isCorrect: true, audioKey: "gözlük", spokenText: "gözlük" },
            { id: 3107, word: "gözlük", imageUrl: "/images/3107.webp", isCorrect: false, audioKey: "gözlük", spokenText: "gözlük" }
        ]
    },
    // kalem
    {
        id: 9,
        question: "Kırık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Kırık olan hangisi?', correct: 'Evet! Kalem kırıktır.', wrong: 'Hayır, bu kalem sağlamdır.' }
        },
        options: [
            { id: 3109, word: "kalem", imageUrl: "/images/3109.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 3110, word: "kalem", imageUrl: "/images/3110.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 10,
        question: "Sağlam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Sağlam olan hangisi?', correct: 'Evet! Kalem sağlamdır.', wrong: 'Hayır, bu kalem kırıktır.' }
        },
        options: [
            { id: 3110, word: "kalem", imageUrl: "/images/3110.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 3109, word: "kalem", imageUrl: "/images/3109.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // robot
    {
        id: 11,
        question: "Kırık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Kırık olan hangisi?', correct: 'Evet! Robot kırıktır.', wrong: 'Hayır, bu robot sağlamdır.' }
        },
        options: [
            { id: 3111, word: "robot", imageUrl: "/images/3111.webp", isCorrect: true, audioKey: "robot", spokenText: "robot" },
            { id: 3112, word: "robot", imageUrl: "/images/3112.webp", isCorrect: false, audioKey: "robot", spokenText: "robot" }
        ]
    },
    {
        id: 12,
        question: "Sağlam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Sağlam olan hangisi?', correct: 'Evet! Robot sağlamdır.', wrong: 'Hayır, bu robot kırıktır.' }
        },
        options: [
            { id: 3112, word: "robot", imageUrl: "/images/3112.webp", isCorrect: true, audioKey: "robot", spokenText: "robot" },
            { id: 3111, word: "robot", imageUrl: "/images/3111.webp", isCorrect: false, audioKey: "robot", spokenText: "robot" }
        ]
    },
    // saksı
    {
        id: 13,
        question: "Kırık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Kırık olan hangisi?', correct: 'Evet! Saksı kırıktır.', wrong: 'Hayır, bu saksı sağlamdır.' }
        },
        options: [
            { id: 3113, word: "saksı", imageUrl: "/images/3113.webp", isCorrect: true, audioKey: "saksı", spokenText: "saksı" },
            { id: 3114, word: "saksı", imageUrl: "/images/3114.webp", isCorrect: false, audioKey: "saksı", spokenText: "saksı" }
        ]
    },
    {
        id: 14,
        question: "Sağlam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Sağlam olan hangisi?', correct: 'Evet! Saksı sağlamdır.', wrong: 'Hayır, bu saksı kırıktır.' }
        },
        options: [
            { id: 3114, word: "saksı", imageUrl: "/images/3114.webp", isCorrect: true, audioKey: "saksı", spokenText: "saksı" },
            { id: 3113, word: "saksı", imageUrl: "/images/3113.webp", isCorrect: false, audioKey: "saksı", spokenText: "saksı" }
        ]
    },
    // sandalye
    {
        id: 15,
        question: "Kırık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Kırık olan hangisi?', correct: 'Evet! Sandalye kırıktır.', wrong: 'Hayır, bu sandalye sağlamdır.' }
        },
        options: [
            { id: 3115, word: "sandalye", imageUrl: "/images/3115.webp", isCorrect: true, audioKey: "sandalye", spokenText: "sandalye" },
            { id: 3116, word: "sandalye", imageUrl: "/images/3116.webp", isCorrect: false, audioKey: "sandalye", spokenText: "sandalye" }
        ]
    },
    {
        id: 16,
        question: "Sağlam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Sağlam olan hangisi?', correct: 'Evet! Sandalye sağlamdır.', wrong: 'Hayır, bu sandalye kırıktır.' }
        },
        options: [
            { id: 3116, word: "sandalye", imageUrl: "/images/3116.webp", isCorrect: true, audioKey: "sandalye", spokenText: "sandalye" },
            { id: 3115, word: "sandalye", imageUrl: "/images/3115.webp", isCorrect: false, audioKey: "sandalye", spokenText: "sandalye" }
        ]
    },
    // tabak
    {
        id: 17,
        question: "Kırık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Kırık olan hangisi?', correct: 'Evet! Tabak kırıktır.', wrong: 'Hayır, bu tabak sağlamdır.' }
        },
        options: [
            { id: 3117, word: "tabak", imageUrl: "/images/3117.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 3118, word: "tabak", imageUrl: "/images/3118.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
    {
        id: 18,
        question: "Sağlam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Sağlam olan hangisi?', correct: 'Evet! Tabak sağlamdır.', wrong: 'Hayır, bu tabak kırıktır.' }
        },
        options: [
            { id: 3118, word: "tabak", imageUrl: "/images/3118.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 3117, word: "tabak", imageUrl: "/images/3117.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
    // yumurta
    {
        id: 19,
        question: "Kırık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Kırık olan hangisi?', correct: 'Evet! Yumurta kırıktır.', wrong: 'Hayır, bu yumurta sağlamdır.' }
        },
        options: [
            { id: 3119, word: "yumurta", imageUrl: "/images/3119.webp", isCorrect: true, audioKey: "yumurta", spokenText: "yumurta" },
            { id: 3120, word: "yumurta", imageUrl: "/images/3120.webp", isCorrect: false, audioKey: "yumurta", spokenText: "yumurta" }
        ]
    },
    {
        id: 20,
        question: "Sağlam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BrokenIntact,
        speech: {
            tr: { question: 'Sağlam olan hangisi?', correct: 'Evet! Yumurta sağlamdır.', wrong: 'Hayır, bu yumurta kırıktır.' }
        },
        options: [
            { id: 3120, word: "yumurta", imageUrl: "/images/3120.webp", isCorrect: true, audioKey: "yumurta", spokenText: "yumurta" },
            { id: 3119, word: "yumurta", imageUrl: "/images/3119.webp", isCorrect: false, audioKey: "yumurta", spokenText: "yumurta" }
        ]
    },
];
