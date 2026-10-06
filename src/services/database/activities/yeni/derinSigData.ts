// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (derin-sig). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/derin-sig/ → id 2901-2920.
import { ConceptRound, ActivityType } from '../../../../types';

export const derinSigDataYeni: ConceptRound[] = [
    // çukur
    {
        id: 1,
        question: "Hangi çukur derin?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi çukur derin?', correct: 'Evet! Bu çukur derin.', wrong: 'Hayır, bu çukur sığ.' }
        },
        options: [
            { id: 2901, word: "çukur", imageUrl: "/images/2901.webp", isCorrect: true, audioKey: "çukur", spokenText: "çukur" },
            { id: 2902, word: "çukur", imageUrl: "/images/2902.webp", isCorrect: false, audioKey: "çukur", spokenText: "çukur" }
        ]
    },
    {
        id: 2,
        question: "Hangi çukur sığ?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi çukur sığ?', correct: 'Evet! Bu çukur sığ.', wrong: 'Hayır, bu çukur derin.' }
        },
        options: [
            { id: 2902, word: "çukur", imageUrl: "/images/2902.webp", isCorrect: true, audioKey: "çukur", spokenText: "çukur" },
            { id: 2901, word: "çukur", imageUrl: "/images/2901.webp", isCorrect: false, audioKey: "çukur", spokenText: "çukur" }
        ]
    },
    // fırın kabı
    {
        id: 3,
        question: "Hangi fırın kabı derin?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi fırın kabı derin?', correct: 'Evet! Bu fırın kabı derin.', wrong: 'Hayır, bu fırın kabı sığ.' }
        },
        options: [
            { id: 2903, word: "fırın kabı", imageUrl: "/images/2903.webp", isCorrect: true, audioKey: "fırın kabı", spokenText: "fırın kabı" },
            { id: 2904, word: "fırın kabı", imageUrl: "/images/2904.webp", isCorrect: false, audioKey: "fırın kabı", spokenText: "fırın kabı" }
        ]
    },
    {
        id: 4,
        question: "Hangi fırın kabı sığ?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi fırın kabı sığ?', correct: 'Evet! Bu fırın kabı sığ.', wrong: 'Hayır, bu fırın kabı derin.' }
        },
        options: [
            { id: 2904, word: "fırın kabı", imageUrl: "/images/2904.webp", isCorrect: true, audioKey: "fırın kabı", spokenText: "fırın kabı" },
            { id: 2903, word: "fırın kabı", imageUrl: "/images/2903.webp", isCorrect: false, audioKey: "fırın kabı", spokenText: "fırın kabı" }
        ]
    },
    // havuz
    {
        id: 5,
        question: "Hangi havuzun suyu derin?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi havuzun suyu derin?', correct: 'Evet! Bu havuzun suyu derin.', wrong: 'Hayır, bu havuzun suyu sığ.' }
        },
        options: [
            { id: 2905, word: "havuz", imageUrl: "/images/2905.webp", isCorrect: true, audioKey: "havuz", spokenText: "havuz" },
            { id: 2906, word: "havuz", imageUrl: "/images/2906.webp", isCorrect: false, audioKey: "havuz", spokenText: "havuz" }
        ]
    },
    {
        id: 6,
        question: "Hangi havuzun suyu sığ?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi havuzun suyu sığ?', correct: 'Evet! Bu havuzun suyu sığ.', wrong: 'Hayır, bu havuzun suyu derin.' }
        },
        options: [
            { id: 2906, word: "havuz", imageUrl: "/images/2906.webp", isCorrect: true, audioKey: "havuz", spokenText: "havuz" },
            { id: 2905, word: "havuz", imageUrl: "/images/2905.webp", isCorrect: false, audioKey: "havuz", spokenText: "havuz" }
        ]
    },
    // kase
    {
        id: 7,
        question: "Hangi kase derin?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi kase derin?', correct: 'Evet! Bu kase derin.', wrong: 'Hayır, bu kase sığ.' }
        },
        options: [
            { id: 2907, word: "kase", imageUrl: "/images/2907.webp", isCorrect: true, audioKey: "kase", spokenText: "kase" },
            { id: 2908, word: "kase", imageUrl: "/images/2908.webp", isCorrect: false, audioKey: "kase", spokenText: "kase" }
        ]
    },
    {
        id: 8,
        question: "Hangi kase sığ?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi kase sığ?', correct: 'Evet! Bu kase sığ.', wrong: 'Hayır, bu kase derin.' }
        },
        options: [
            { id: 2908, word: "kase", imageUrl: "/images/2908.webp", isCorrect: true, audioKey: "kase", spokenText: "kase" },
            { id: 2907, word: "kase", imageUrl: "/images/2907.webp", isCorrect: false, audioKey: "kase", spokenText: "kase" }
        ]
    },
    // kova
    {
        id: 9,
        question: "Hangi kova derin?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi kova derin?', correct: 'Evet! Bu kova derin.', wrong: 'Hayır, bu kova sığ.' }
        },
        options: [
            { id: 2909, word: "kova", imageUrl: "/images/2909.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 2910, word: "kova", imageUrl: "/images/2910.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    {
        id: 10,
        question: "Hangi kova sığ?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi kova sığ?', correct: 'Evet! Bu kova sığ.', wrong: 'Hayır, bu kova derin.' }
        },
        options: [
            { id: 2910, word: "kova", imageUrl: "/images/2910.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 2909, word: "kova", imageUrl: "/images/2909.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    // kutu
    {
        id: 11,
        question: "Hangi kutu derin?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi kutu derin?', correct: 'Evet! Bu kutu derin.', wrong: 'Hayır, bu kutu sığ.' }
        },
        options: [
            { id: 2911, word: "kutu", imageUrl: "/images/2911.webp", isCorrect: true, audioKey: "kutu", spokenText: "kutu" },
            { id: 2912, word: "kutu", imageUrl: "/images/2912.webp", isCorrect: false, audioKey: "kutu", spokenText: "kutu" }
        ]
    },
    {
        id: 12,
        question: "Hangi kutu sığ?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi kutu sığ?', correct: 'Evet! Bu kutu sığ.', wrong: 'Hayır, bu kutu derin.' }
        },
        options: [
            { id: 2912, word: "kutu", imageUrl: "/images/2912.webp", isCorrect: true, audioKey: "kutu", spokenText: "kutu" },
            { id: 2911, word: "kutu", imageUrl: "/images/2911.webp", isCorrect: false, audioKey: "kutu", spokenText: "kutu" }
        ]
    },
    // leğen
    {
        id: 13,
        question: "Hangi leğen derin?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi leğen derin?', correct: 'Evet! Bu leğen derin.', wrong: 'Hayır, bu leğen sığ.' }
        },
        options: [
            { id: 2913, word: "leğen", imageUrl: "/images/2913.webp", isCorrect: true, audioKey: "leğen", spokenText: "leğen" },
            { id: 2914, word: "leğen", imageUrl: "/images/2914.webp", isCorrect: false, audioKey: "leğen", spokenText: "leğen" }
        ]
    },
    {
        id: 14,
        question: "Hangi leğen sığ?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi leğen sığ?', correct: 'Evet! Bu leğen sığ.', wrong: 'Hayır, bu leğen derin.' }
        },
        options: [
            { id: 2914, word: "leğen", imageUrl: "/images/2914.webp", isCorrect: true, audioKey: "leğen", spokenText: "leğen" },
            { id: 2913, word: "leğen", imageUrl: "/images/2913.webp", isCorrect: false, audioKey: "leğen", spokenText: "leğen" }
        ]
    },
    // sepet
    {
        id: 15,
        question: "Hangi sepet derin?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi sepet derin?', correct: 'Evet! Bu sepet derin.', wrong: 'Hayır, bu sepet sığ.' }
        },
        options: [
            { id: 2915, word: "sepet", imageUrl: "/images/2915.webp", isCorrect: true, audioKey: "sepet", spokenText: "sepet" },
            { id: 2916, word: "sepet", imageUrl: "/images/2916.webp", isCorrect: false, audioKey: "sepet", spokenText: "sepet" }
        ]
    },
    {
        id: 16,
        question: "Hangi sepet sığ?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi sepet sığ?', correct: 'Evet! Bu sepet sığ.', wrong: 'Hayır, bu sepet derin.' }
        },
        options: [
            { id: 2916, word: "sepet", imageUrl: "/images/2916.webp", isCorrect: true, audioKey: "sepet", spokenText: "sepet" },
            { id: 2915, word: "sepet", imageUrl: "/images/2915.webp", isCorrect: false, audioKey: "sepet", spokenText: "sepet" }
        ]
    },
    // tabak
    {
        id: 17,
        question: "Hangi tabak derin?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi tabak derin?', correct: 'Evet! Bu tabak derin.', wrong: 'Hayır, bu tabak sığ.' }
        },
        options: [
            { id: 2917, word: "tabak", imageUrl: "/images/2917.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 2918, word: "tabak", imageUrl: "/images/2918.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
    {
        id: 18,
        question: "Hangi tabak sığ?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi tabak sığ?', correct: 'Evet! Bu tabak sığ.', wrong: 'Hayır, bu tabak derin.' }
        },
        options: [
            { id: 2918, word: "tabak", imageUrl: "/images/2918.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 2917, word: "tabak", imageUrl: "/images/2917.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
    // tencere
    {
        id: 19,
        question: "Hangi tencere derin?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi tencere derin?', correct: 'Evet! Bu tencere derin.', wrong: 'Hayır, bu tencere sığ.' }
        },
        options: [
            { id: 2919, word: "tencere", imageUrl: "/images/2919.webp", isCorrect: true, audioKey: "tencere", spokenText: "tencere" },
            { id: 2920, word: "tencere", imageUrl: "/images/2920.webp", isCorrect: false, audioKey: "tencere", spokenText: "tencere" }
        ]
    },
    {
        id: 20,
        question: "Hangi tencere sığ?",
        questionAudioKey: "",
        activityType: ActivityType.DerinSig,
        speech: {
            tr: { question: 'Hangi tencere sığ?', correct: 'Evet! Bu tencere sığ.', wrong: 'Hayır, bu tencere derin.' }
        },
        options: [
            { id: 2920, word: "tencere", imageUrl: "/images/2920.webp", isCorrect: true, audioKey: "tencere", spokenText: "tencere" },
            { id: 2919, word: "tencere", imageUrl: "/images/2919.webp", isCorrect: false, audioKey: "tencere", spokenText: "tencere" }
        ]
    },
];
