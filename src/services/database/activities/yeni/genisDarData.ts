// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (genis-dar). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/genis-dar/ → id 2201-2222.
import { ConceptRound, ActivityType } from '../../../../types';

export const wideNarrowDataYeni: ConceptRound[] = [
    // kapı
    {
        id: 1,
        question: "Geniş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Geniş olan hangisi?', correct: 'Evet! Kapı geniştir.', wrong: 'Hayır, bu kapı dardır.' }
        },
        options: [
            { id: 2202, word: "kapı", imageUrl: "/images/2202.webp", isCorrect: true, audioKey: "kapı", spokenText: "kapı" },
            { id: 2201, word: "kapı", imageUrl: "/images/2201.webp", isCorrect: false, audioKey: "kapı", spokenText: "kapı" }
        ]
    },
    {
        id: 2,
        question: "Dar olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Dar olan hangisi?', correct: 'Evet! Kapı dardır.', wrong: 'Hayır, bu kapı geniştir.' }
        },
        options: [
            { id: 2201, word: "kapı", imageUrl: "/images/2201.webp", isCorrect: true, audioKey: "kapı", spokenText: "kapı" },
            { id: 2202, word: "kapı", imageUrl: "/images/2202.webp", isCorrect: false, audioKey: "kapı", spokenText: "kapı" }
        ]
    },
    // kaydırak
    {
        id: 3,
        question: "Geniş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Geniş olan hangisi?', correct: 'Evet! Kaydırak geniştir.', wrong: 'Hayır, bu kaydırak dardır.' }
        },
        options: [
            { id: 2205, word: "kaydırak", imageUrl: "/images/2205.webp", isCorrect: true, audioKey: "kaydırak", spokenText: "kaydırak" },
            { id: 2204, word: "kaydırak", imageUrl: "/images/2204.webp", isCorrect: false, audioKey: "kaydırak", spokenText: "kaydırak" }
        ]
    },
    {
        id: 4,
        question: "Dar olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Dar olan hangisi?', correct: 'Evet! Kaydırak dardır.', wrong: 'Hayır, bu kaydırak geniştir.' }
        },
        options: [
            { id: 2204, word: "kaydırak", imageUrl: "/images/2204.webp", isCorrect: true, audioKey: "kaydırak", spokenText: "kaydırak" },
            { id: 2205, word: "kaydırak", imageUrl: "/images/2205.webp", isCorrect: false, audioKey: "kaydırak", spokenText: "kaydırak" }
        ]
    },
    // köprü
    {
        id: 5,
        question: "Geniş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Geniş olan hangisi?', correct: 'Evet! Köprü geniştir.', wrong: 'Hayır, bu köprü dardır.' }
        },
        options: [
            { id: 2208, word: "köprü", imageUrl: "/images/2208.webp", isCorrect: true, audioKey: "köprü", spokenText: "köprü" },
            { id: 2207, word: "köprü", imageUrl: "/images/2207.webp", isCorrect: false, audioKey: "köprü", spokenText: "köprü" }
        ]
    },
    {
        id: 6,
        question: "Dar olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Dar olan hangisi?', correct: 'Evet! Köprü dardır.', wrong: 'Hayır, bu köprü geniştir.' }
        },
        options: [
            { id: 2207, word: "köprü", imageUrl: "/images/2207.webp", isCorrect: true, audioKey: "köprü", spokenText: "köprü" },
            { id: 2208, word: "köprü", imageUrl: "/images/2208.webp", isCorrect: false, audioKey: "köprü", spokenText: "köprü" }
        ]
    },
    // koridor
    {
        id: 7,
        question: "Geniş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Geniş olan hangisi?', correct: 'Evet! Koridor geniştir.', wrong: 'Hayır, bu koridor dardır.' }
        },
        options: [
            { id: 2210, word: "koridor", imageUrl: "/images/2210.webp", isCorrect: true, audioKey: "koridor", spokenText: "koridor" },
            { id: 2209, word: "koridor", imageUrl: "/images/2209.webp", isCorrect: false, audioKey: "koridor", spokenText: "koridor" }
        ]
    },
    {
        id: 8,
        question: "Dar olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Dar olan hangisi?', correct: 'Evet! Koridor dardır.', wrong: 'Hayır, bu koridor geniştir.' }
        },
        options: [
            { id: 2209, word: "koridor", imageUrl: "/images/2209.webp", isCorrect: true, audioKey: "koridor", spokenText: "koridor" },
            { id: 2210, word: "koridor", imageUrl: "/images/2210.webp", isCorrect: false, audioKey: "koridor", spokenText: "koridor" }
        ]
    },
    // merdiven
    {
        id: 9,
        question: "Geniş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Geniş olan hangisi?', correct: 'Evet! Merdiven geniştir.', wrong: 'Hayır, bu merdiven dardır.' }
        },
        options: [
            { id: 2212, word: "merdiven", imageUrl: "/images/2212.webp", isCorrect: true, audioKey: "merdiven", spokenText: "merdiven" },
            { id: 2211, word: "merdiven", imageUrl: "/images/2211.webp", isCorrect: false, audioKey: "merdiven", spokenText: "merdiven" }
        ]
    },
    {
        id: 10,
        question: "Dar olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Dar olan hangisi?', correct: 'Evet! Merdiven dardır.', wrong: 'Hayır, bu merdiven geniştir.' }
        },
        options: [
            { id: 2211, word: "merdiven", imageUrl: "/images/2211.webp", isCorrect: true, audioKey: "merdiven", spokenText: "merdiven" },
            { id: 2212, word: "merdiven", imageUrl: "/images/2212.webp", isCorrect: false, audioKey: "merdiven", spokenText: "merdiven" }
        ]
    },
    // nehir
    {
        id: 11,
        question: "Geniş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Geniş olan hangisi?', correct: 'Evet! Nehir geniştir.', wrong: 'Hayır, bu nehir dardır.' }
        },
        options: [
            { id: 2214, word: "nehir", imageUrl: "/images/2214.webp", isCorrect: true, audioKey: "nehir", spokenText: "nehir" },
            { id: 2213, word: "nehir", imageUrl: "/images/2213.webp", isCorrect: false, audioKey: "nehir", spokenText: "nehir" }
        ]
    },
    {
        id: 12,
        question: "Dar olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Dar olan hangisi?', correct: 'Evet! Nehir dardır.', wrong: 'Hayır, bu nehir geniştir.' }
        },
        options: [
            { id: 2213, word: "nehir", imageUrl: "/images/2213.webp", isCorrect: true, audioKey: "nehir", spokenText: "nehir" },
            { id: 2214, word: "nehir", imageUrl: "/images/2214.webp", isCorrect: false, audioKey: "nehir", spokenText: "nehir" }
        ]
    },
    // pencere
    {
        id: 13,
        question: "Geniş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Geniş olan hangisi?', correct: 'Evet! Pencere geniştir.', wrong: 'Hayır, bu pencere dardır.' }
        },
        options: [
            { id: 2216, word: "pencere", imageUrl: "/images/2216.webp", isCorrect: true, audioKey: "pencere", spokenText: "pencere" },
            { id: 2215, word: "pencere", imageUrl: "/images/2215.webp", isCorrect: false, audioKey: "pencere", spokenText: "pencere" }
        ]
    },
    {
        id: 14,
        question: "Dar olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Dar olan hangisi?', correct: 'Evet! Pencere dardır.', wrong: 'Hayır, bu pencere geniştir.' }
        },
        options: [
            { id: 2215, word: "pencere", imageUrl: "/images/2215.webp", isCorrect: true, audioKey: "pencere", spokenText: "pencere" },
            { id: 2216, word: "pencere", imageUrl: "/images/2216.webp", isCorrect: false, audioKey: "pencere", spokenText: "pencere" }
        ]
    },
    // sokak
    {
        id: 15,
        question: "Geniş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Geniş olan hangisi?', correct: 'Evet! Sokak geniştir.', wrong: 'Hayır, bu sokak dardır.' }
        },
        options: [
            { id: 2218, word: "sokak", imageUrl: "/images/2218.webp", isCorrect: true, audioKey: "sokak", spokenText: "sokak" },
            { id: 2217, word: "sokak", imageUrl: "/images/2217.webp", isCorrect: false, audioKey: "sokak", spokenText: "sokak" }
        ]
    },
    {
        id: 16,
        question: "Dar olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Dar olan hangisi?', correct: 'Evet! Sokak dardır.', wrong: 'Hayır, bu sokak geniştir.' }
        },
        options: [
            { id: 2217, word: "sokak", imageUrl: "/images/2217.webp", isCorrect: true, audioKey: "sokak", spokenText: "sokak" },
            { id: 2218, word: "sokak", imageUrl: "/images/2218.webp", isCorrect: false, audioKey: "sokak", spokenText: "sokak" }
        ]
    },
    // tünel
    {
        id: 17,
        question: "Geniş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Geniş olan hangisi?', correct: 'Evet! Tünel geniştir.', wrong: 'Hayır, bu tünel dardır.' }
        },
        options: [
            { id: 2220, word: "tünel", imageUrl: "/images/2220.webp", isCorrect: true, audioKey: "tünel", spokenText: "tünel" },
            { id: 2219, word: "tünel", imageUrl: "/images/2219.webp", isCorrect: false, audioKey: "tünel", spokenText: "tünel" }
        ]
    },
    {
        id: 18,
        question: "Dar olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Dar olan hangisi?', correct: 'Evet! Tünel dardır.', wrong: 'Hayır, bu tünel geniştir.' }
        },
        options: [
            { id: 2219, word: "tünel", imageUrl: "/images/2219.webp", isCorrect: true, audioKey: "tünel", spokenText: "tünel" },
            { id: 2220, word: "tünel", imageUrl: "/images/2220.webp", isCorrect: false, audioKey: "tünel", spokenText: "tünel" }
        ]
    },
    // yol
    {
        id: 19,
        question: "Geniş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Geniş olan hangisi?', correct: 'Evet! Yol geniştir.', wrong: 'Hayır, bu yol dardır.' }
        },
        options: [
            { id: 2222, word: "yol", imageUrl: "/images/2222.webp", isCorrect: true, audioKey: "yol", spokenText: "yol" },
            { id: 2221, word: "yol", imageUrl: "/images/2221.webp", isCorrect: false, audioKey: "yol", spokenText: "yol" }
        ]
    },
    {
        id: 20,
        question: "Dar olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Dar olan hangisi?', correct: 'Evet! Yol dardır.', wrong: 'Hayır, bu yol geniştir.' }
        },
        options: [
            { id: 2221, word: "yol", imageUrl: "/images/2221.webp", isCorrect: true, audioKey: "yol", spokenText: "yol" },
            { id: 2222, word: "yol", imageUrl: "/images/2222.webp", isCorrect: false, audioKey: "yol", spokenText: "yol" }
        ]
    },
];
