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
            tr: { question: 'Hangi çukur derin?', correct: 'Evet! Çukur derindir.', wrong: 'Hayır, bu çukur sığdır.' }
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
            tr: { question: 'Hangi çukur sığ?', correct: 'Evet! Çukur sığdır.', wrong: 'Hayır, bu çukur derindir.' }
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
            tr: { question: 'Hangi fırın kabı derin?', correct: 'Evet! Fırın kabı derindir.', wrong: 'Hayır, bu fırın kabı sığdır.' }
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
            tr: { question: 'Hangi fırın kabı sığ?', correct: 'Evet! Fırın kabı sığdır.', wrong: 'Hayır, bu fırın kabı derindir.' }
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
            tr: { question: 'Hangi havuzun suyu derin?', correct: 'Evet! Havuzun suyu derindir.', wrong: 'Hayır, bu havuzun suyu sığdır.' }
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
            tr: { question: 'Hangi havuzun suyu sığ?', correct: 'Evet! Havuzun suyu sığdır.', wrong: 'Hayır, bu havuzun suyu derindir.' }
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
            tr: { question: 'Hangi kase derin?', correct: 'Evet! Kase derindir.', wrong: 'Hayır, bu kase sığdır.' }
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
            tr: { question: 'Hangi kase sığ?', correct: 'Evet! Kase sığdır.', wrong: 'Hayır, bu kase derindir.' }
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
            tr: { question: 'Hangi kova derin?', correct: 'Evet! Kova derindir.', wrong: 'Hayır, bu kova sığdır.' }
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
            tr: { question: 'Hangi kova sığ?', correct: 'Evet! Kova sığdır.', wrong: 'Hayır, bu kova derindir.' }
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
            tr: { question: 'Hangi kutu derin?', correct: 'Evet! Kutu derindir.', wrong: 'Hayır, bu kutu sığdır.' }
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
            tr: { question: 'Hangi kutu sığ?', correct: 'Evet! Kutu sığdır.', wrong: 'Hayır, bu kutu derindir.' }
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
            tr: { question: 'Hangi leğen derin?', correct: 'Evet! Leğen derindir.', wrong: 'Hayır, bu leğen sığdır.' }
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
            tr: { question: 'Hangi leğen sığ?', correct: 'Evet! Leğen sığdır.', wrong: 'Hayır, bu leğen derindir.' }
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
            tr: { question: 'Hangi sepet derin?', correct: 'Evet! Sepet derindir.', wrong: 'Hayır, bu sepet sığdır.' }
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
            tr: { question: 'Hangi sepet sığ?', correct: 'Evet! Sepet sığdır.', wrong: 'Hayır, bu sepet derindir.' }
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
            tr: { question: 'Hangi tabak derin?', correct: 'Evet! Tabak derindir.', wrong: 'Hayır, bu tabak sığdır.' }
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
            tr: { question: 'Hangi tabak sığ?', correct: 'Evet! Tabak sığdır.', wrong: 'Hayır, bu tabak derindir.' }
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
            tr: { question: 'Hangi tencere derin?', correct: 'Evet! Tencere derindir.', wrong: 'Hayır, bu tencere sığdır.' }
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
            tr: { question: 'Hangi tencere sığ?', correct: 'Evet! Tencere sığdır.', wrong: 'Hayır, bu tencere derindir.' }
        },
        options: [
            { id: 2920, word: "tencere", imageUrl: "/images/2920.webp", isCorrect: true, audioKey: "tencere", spokenText: "tencere" },
            { id: 2919, word: "tencere", imageUrl: "/images/2919.webp", isCorrect: false, audioKey: "tencere", spokenText: "tencere" }
        ]
    },
];
