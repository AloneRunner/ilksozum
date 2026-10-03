// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (acik-kapali). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/acik-kapali/ → id 3001-3020.
import { ConceptRound, ActivityType } from '../../../../types';

export const openClosedDataYeni: ConceptRound[] = [
    // çanta
    {
        id: 1,
        question: "Açık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Açık olan hangisi?', correct: 'Evet! Çanta açıktır.', wrong: 'Hayır, bu çanta kapalıdır.' }
        },
        options: [
            { id: 3001, word: "çanta", imageUrl: "/images/3001.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 3002, word: "çanta", imageUrl: "/images/3002.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 2,
        question: "Kapalı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Kapalı olan hangisi?', correct: 'Evet! Çanta kapalıdır.', wrong: 'Hayır, bu çanta açıktır.' }
        },
        options: [
            { id: 3002, word: "çanta", imageUrl: "/images/3002.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 3001, word: "çanta", imageUrl: "/images/3001.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    // çiçek
    {
        id: 3,
        question: "Açık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Açık olan hangisi?', correct: 'Evet! Çiçek açıktır.', wrong: 'Hayır, bu çiçek kapalıdır.' }
        },
        options: [
            { id: 3003, word: "çiçek", imageUrl: "/images/3003.webp", isCorrect: true, audioKey: "çiçek", spokenText: "çiçek" },
            { id: 3004, word: "çiçek", imageUrl: "/images/3004.webp", isCorrect: false, audioKey: "çiçek", spokenText: "çiçek" }
        ]
    },
    {
        id: 4,
        question: "Kapalı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Kapalı olan hangisi?', correct: 'Evet! Çiçek kapalıdır.', wrong: 'Hayır, bu çiçek açıktır.' }
        },
        options: [
            { id: 3004, word: "çiçek", imageUrl: "/images/3004.webp", isCorrect: true, audioKey: "çiçek", spokenText: "çiçek" },
            { id: 3003, word: "çiçek", imageUrl: "/images/3003.webp", isCorrect: false, audioKey: "çiçek", spokenText: "çiçek" }
        ]
    },
    // göz
    {
        id: 5,
        question: "Gözleri açık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Gözleri açık olan hangisi?', correct: 'Evet! Gözler açıktır.', wrong: 'Hayır, bu gözler kapalıdır.' }
        },
        options: [
            { id: 3005, word: "göz", imageUrl: "/images/3005.webp", isCorrect: true, audioKey: "göz", spokenText: "göz" },
            { id: 3006, word: "göz", imageUrl: "/images/3006.webp", isCorrect: false, audioKey: "göz", spokenText: "göz" }
        ]
    },
    {
        id: 6,
        question: "Gözleri kapalı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Gözleri kapalı olan hangisi?', correct: 'Evet! Gözler kapalıdır.', wrong: 'Hayır, bu gözler açıktır.' }
        },
        options: [
            { id: 3006, word: "göz", imageUrl: "/images/3006.webp", isCorrect: true, audioKey: "göz", spokenText: "göz" },
            { id: 3005, word: "göz", imageUrl: "/images/3005.webp", isCorrect: false, audioKey: "göz", spokenText: "göz" }
        ]
    },
    // kapı
    {
        id: 7,
        question: "Açık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Açık olan hangisi?', correct: 'Evet! Kapı açıktır.', wrong: 'Hayır, bu kapı kapalıdır.' }
        },
        options: [
            { id: 3007, word: "kapı", imageUrl: "/images/3007.webp", isCorrect: true, audioKey: "kapı", spokenText: "kapı" },
            { id: 3008, word: "kapı", imageUrl: "/images/3008.webp", isCorrect: false, audioKey: "kapı", spokenText: "kapı" }
        ]
    },
    {
        id: 8,
        question: "Kapalı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Kapalı olan hangisi?', correct: 'Evet! Kapı kapalıdır.', wrong: 'Hayır, bu kapı açıktır.' }
        },
        options: [
            { id: 3008, word: "kapı", imageUrl: "/images/3008.webp", isCorrect: true, audioKey: "kapı", spokenText: "kapı" },
            { id: 3007, word: "kapı", imageUrl: "/images/3007.webp", isCorrect: false, audioKey: "kapı", spokenText: "kapı" }
        ]
    },
    // kavanoz
    {
        id: 9,
        question: "Açık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Açık olan hangisi?', correct: 'Evet! Kavanoz açıktır.', wrong: 'Hayır, bu kavanoz kapalıdır.' }
        },
        options: [
            { id: 3009, word: "kavanoz", imageUrl: "/images/3009.webp", isCorrect: true, audioKey: "kavanoz", spokenText: "kavanoz" },
            { id: 3010, word: "kavanoz", imageUrl: "/images/3010.webp", isCorrect: false, audioKey: "kavanoz", spokenText: "kavanoz" }
        ]
    },
    {
        id: 10,
        question: "Kapalı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Kapalı olan hangisi?', correct: 'Evet! Kavanoz kapalıdır.', wrong: 'Hayır, bu kavanoz açıktır.' }
        },
        options: [
            { id: 3010, word: "kavanoz", imageUrl: "/images/3010.webp", isCorrect: true, audioKey: "kavanoz", spokenText: "kavanoz" },
            { id: 3009, word: "kavanoz", imageUrl: "/images/3009.webp", isCorrect: false, audioKey: "kavanoz", spokenText: "kavanoz" }
        ]
    },
    // kitap
    {
        id: 11,
        question: "Açık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Açık olan hangisi?', correct: 'Evet! Kitap açıktır.', wrong: 'Hayır, bu kitap kapalıdır.' }
        },
        options: [
            { id: 3011, word: "kitap", imageUrl: "/images/3011.webp", isCorrect: true, audioKey: "kitap", spokenText: "kitap" },
            { id: 3012, word: "kitap", imageUrl: "/images/3012.webp", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    {
        id: 12,
        question: "Kapalı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Kapalı olan hangisi?', correct: 'Evet! Kitap kapalıdır.', wrong: 'Hayır, bu kitap açıktır.' }
        },
        options: [
            { id: 3012, word: "kitap", imageUrl: "/images/3012.webp", isCorrect: true, audioKey: "kitap", spokenText: "kitap" },
            { id: 3011, word: "kitap", imageUrl: "/images/3011.webp", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    // kutu
    {
        id: 13,
        question: "Açık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Açık olan hangisi?', correct: 'Evet! Kutu açıktır.', wrong: 'Hayır, bu kutu kapalıdır.' }
        },
        options: [
            { id: 3013, word: "kutu", imageUrl: "/images/3013.webp", isCorrect: true, audioKey: "kutu", spokenText: "kutu" },
            { id: 3014, word: "kutu", imageUrl: "/images/3014.webp", isCorrect: false, audioKey: "kutu", spokenText: "kutu" }
        ]
    },
    {
        id: 14,
        question: "Kapalı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Kapalı olan hangisi?', correct: 'Evet! Kutu kapalıdır.', wrong: 'Hayır, bu kutu açıktır.' }
        },
        options: [
            { id: 3014, word: "kutu", imageUrl: "/images/3014.webp", isCorrect: true, audioKey: "kutu", spokenText: "kutu" },
            { id: 3013, word: "kutu", imageUrl: "/images/3013.webp", isCorrect: false, audioKey: "kutu", spokenText: "kutu" }
        ]
    },
    // musluk
    {
        id: 15,
        question: "Açık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Açık olan hangisi?', correct: 'Evet! Musluk açıktır.', wrong: 'Hayır, bu musluk kapalıdır.' }
        },
        options: [
            { id: 3015, word: "musluk", imageUrl: "/images/3015.webp", isCorrect: true, audioKey: "musluk", spokenText: "musluk" },
            { id: 3016, word: "musluk", imageUrl: "/images/3016.webp", isCorrect: false, audioKey: "musluk", spokenText: "musluk" }
        ]
    },
    {
        id: 16,
        question: "Kapalı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Kapalı olan hangisi?', correct: 'Evet! Musluk kapalıdır.', wrong: 'Hayır, bu musluk açıktır.' }
        },
        options: [
            { id: 3016, word: "musluk", imageUrl: "/images/3016.webp", isCorrect: true, audioKey: "musluk", spokenText: "musluk" },
            { id: 3015, word: "musluk", imageUrl: "/images/3015.webp", isCorrect: false, audioKey: "musluk", spokenText: "musluk" }
        ]
    },
    // pencere
    {
        id: 17,
        question: "Açık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Açık olan hangisi?', correct: 'Evet! Pencere açıktır.', wrong: 'Hayır, bu pencere kapalıdır.' }
        },
        options: [
            { id: 3017, word: "pencere", imageUrl: "/images/3017.webp", isCorrect: true, audioKey: "pencere", spokenText: "pencere" },
            { id: 3018, word: "pencere", imageUrl: "/images/3018.webp", isCorrect: false, audioKey: "pencere", spokenText: "pencere" }
        ]
    },
    {
        id: 18,
        question: "Kapalı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Kapalı olan hangisi?', correct: 'Evet! Pencere kapalıdır.', wrong: 'Hayır, bu pencere açıktır.' }
        },
        options: [
            { id: 3018, word: "pencere", imageUrl: "/images/3018.webp", isCorrect: true, audioKey: "pencere", spokenText: "pencere" },
            { id: 3017, word: "pencere", imageUrl: "/images/3017.webp", isCorrect: false, audioKey: "pencere", spokenText: "pencere" }
        ]
    },
    // şemsiye
    {
        id: 19,
        question: "Açık olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Açık olan hangisi?', correct: 'Evet! Şemsiye açıktır.', wrong: 'Hayır, bu şemsiye kapalıdır.' }
        },
        options: [
            { id: 3019, word: "şemsiye", imageUrl: "/images/3019.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 3020, word: "şemsiye", imageUrl: "/images/3020.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 20,
        question: "Kapalı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Kapalı olan hangisi?', correct: 'Evet! Şemsiye kapalıdır.', wrong: 'Hayır, bu şemsiye açıktır.' }
        },
        options: [
            { id: 3020, word: "şemsiye", imageUrl: "/images/3020.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 3019, word: "şemsiye", imageUrl: "/images/3019.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
];
