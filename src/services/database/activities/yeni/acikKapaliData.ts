// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (acik-kapali). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/acik-kapali/ → id 3001-3020.
import { ConceptRound, ActivityType } from '../../../../types';

export const openClosedDataYeni: ConceptRound[] = [
    // çanta
    {
        id: 1,
        question: "Hangi çanta açık?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi çanta açık?', correct: 'Evet! Bu çanta açık.', wrong: 'Hayır, bu çanta kapalı.' }
        },
        options: [
            { id: 3001, word: "çanta", imageUrl: "/images/3001.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 3002, word: "çanta", imageUrl: "/images/3002.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 2,
        question: "Hangi çanta kapalı?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi çanta kapalı?', correct: 'Evet! Bu çanta kapalı.', wrong: 'Hayır, bu çanta açık.' }
        },
        options: [
            { id: 3002, word: "çanta", imageUrl: "/images/3002.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 3001, word: "çanta", imageUrl: "/images/3001.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    // çiçek
    {
        id: 3,
        question: "Hangi çiçek açık?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi çiçek açık?', correct: 'Evet! Bu çiçek açık.', wrong: 'Hayır, bu çiçek kapalı.' }
        },
        options: [
            { id: 3003, word: "çiçek", imageUrl: "/images/3003.webp", isCorrect: true, audioKey: "çiçek", spokenText: "çiçek" },
            { id: 3004, word: "çiçek", imageUrl: "/images/3004.webp", isCorrect: false, audioKey: "çiçek", spokenText: "çiçek" }
        ]
    },
    {
        id: 4,
        question: "Hangi çiçek kapalı?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi çiçek kapalı?', correct: 'Evet! Bu çiçek kapalı.', wrong: 'Hayır, bu çiçek açık.' }
        },
        options: [
            { id: 3004, word: "çiçek", imageUrl: "/images/3004.webp", isCorrect: true, audioKey: "çiçek", spokenText: "çiçek" },
            { id: 3003, word: "çiçek", imageUrl: "/images/3003.webp", isCorrect: false, audioKey: "çiçek", spokenText: "çiçek" }
        ]
    },
    // göz
    {
        id: 5,
        question: "Hangi çocuğun gözleri açık?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi çocuğun gözleri açık?', correct: 'Evet! Bu gözler açık.', wrong: 'Hayır, bu gözler kapalı.' }
        },
        options: [
            { id: 3005, word: "göz", imageUrl: "/images/3005.webp", isCorrect: true, audioKey: "göz", spokenText: "göz" },
            { id: 3006, word: "göz", imageUrl: "/images/3006.webp", isCorrect: false, audioKey: "göz", spokenText: "göz" }
        ]
    },
    {
        id: 6,
        question: "Hangi çocuğun gözleri kapalı?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi çocuğun gözleri kapalı?', correct: 'Evet! Bu gözler kapalı.', wrong: 'Hayır, bu gözler açık.' }
        },
        options: [
            { id: 3006, word: "göz", imageUrl: "/images/3006.webp", isCorrect: true, audioKey: "göz", spokenText: "göz" },
            { id: 3005, word: "göz", imageUrl: "/images/3005.webp", isCorrect: false, audioKey: "göz", spokenText: "göz" }
        ]
    },
    // kapı
    {
        id: 7,
        question: "Hangi kapı açık?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi kapı açık?', correct: 'Evet! Bu kapı açık.', wrong: 'Hayır, bu kapı kapalı.' }
        },
        options: [
            { id: 3007, word: "kapı", imageUrl: "/images/3007.webp", isCorrect: true, audioKey: "kapı", spokenText: "kapı" },
            { id: 3008, word: "kapı", imageUrl: "/images/3008.webp", isCorrect: false, audioKey: "kapı", spokenText: "kapı" }
        ]
    },
    {
        id: 8,
        question: "Hangi kapı kapalı?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi kapı kapalı?', correct: 'Evet! Bu kapı kapalı.', wrong: 'Hayır, bu kapı açık.' }
        },
        options: [
            { id: 3008, word: "kapı", imageUrl: "/images/3008.webp", isCorrect: true, audioKey: "kapı", spokenText: "kapı" },
            { id: 3007, word: "kapı", imageUrl: "/images/3007.webp", isCorrect: false, audioKey: "kapı", spokenText: "kapı" }
        ]
    },
    // kavanoz
    {
        id: 9,
        question: "Hangi kavanoz açık?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi kavanoz açık?', correct: 'Evet! Bu kavanoz açık.', wrong: 'Hayır, bu kavanoz kapalı.' }
        },
        options: [
            { id: 3009, word: "kavanoz", imageUrl: "/images/3009.webp", isCorrect: true, audioKey: "kavanoz", spokenText: "kavanoz" },
            { id: 3010, word: "kavanoz", imageUrl: "/images/3010.webp", isCorrect: false, audioKey: "kavanoz", spokenText: "kavanoz" }
        ]
    },
    {
        id: 10,
        question: "Hangi kavanoz kapalı?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi kavanoz kapalı?', correct: 'Evet! Bu kavanoz kapalı.', wrong: 'Hayır, bu kavanoz açık.' }
        },
        options: [
            { id: 3010, word: "kavanoz", imageUrl: "/images/3010.webp", isCorrect: true, audioKey: "kavanoz", spokenText: "kavanoz" },
            { id: 3009, word: "kavanoz", imageUrl: "/images/3009.webp", isCorrect: false, audioKey: "kavanoz", spokenText: "kavanoz" }
        ]
    },
    // kitap
    {
        id: 11,
        question: "Hangi kitap açık?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi kitap açık?', correct: 'Evet! Bu kitap açık.', wrong: 'Hayır, bu kitap kapalı.' }
        },
        options: [
            { id: 3011, word: "kitap", imageUrl: "/images/3011.webp", isCorrect: true, audioKey: "kitap", spokenText: "kitap" },
            { id: 3012, word: "kitap", imageUrl: "/images/3012.webp", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    {
        id: 12,
        question: "Hangi kitap kapalı?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi kitap kapalı?', correct: 'Evet! Bu kitap kapalı.', wrong: 'Hayır, bu kitap açık.' }
        },
        options: [
            { id: 3012, word: "kitap", imageUrl: "/images/3012.webp", isCorrect: true, audioKey: "kitap", spokenText: "kitap" },
            { id: 3011, word: "kitap", imageUrl: "/images/3011.webp", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    // kutu
    {
        id: 13,
        question: "Hangi kutu açık?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi kutu açık?', correct: 'Evet! Bu kutu açık.', wrong: 'Hayır, bu kutu kapalı.' }
        },
        options: [
            { id: 3013, word: "kutu", imageUrl: "/images/3013.webp", isCorrect: true, audioKey: "kutu", spokenText: "kutu" },
            { id: 3014, word: "kutu", imageUrl: "/images/3014.webp", isCorrect: false, audioKey: "kutu", spokenText: "kutu" }
        ]
    },
    {
        id: 14,
        question: "Hangi kutu kapalı?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi kutu kapalı?', correct: 'Evet! Bu kutu kapalı.', wrong: 'Hayır, bu kutu açık.' }
        },
        options: [
            { id: 3014, word: "kutu", imageUrl: "/images/3014.webp", isCorrect: true, audioKey: "kutu", spokenText: "kutu" },
            { id: 3013, word: "kutu", imageUrl: "/images/3013.webp", isCorrect: false, audioKey: "kutu", spokenText: "kutu" }
        ]
    },
    // musluk
    {
        id: 15,
        question: "Hangi musluk açık?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi musluk açık?', correct: 'Evet! Bu musluk açık.', wrong: 'Hayır, bu musluk kapalı.' }
        },
        options: [
            { id: 3015, word: "musluk", imageUrl: "/images/3015.webp", isCorrect: true, audioKey: "musluk", spokenText: "musluk" },
            { id: 3016, word: "musluk", imageUrl: "/images/3016.webp", isCorrect: false, audioKey: "musluk", spokenText: "musluk" }
        ]
    },
    {
        id: 16,
        question: "Hangi musluk kapalı?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi musluk kapalı?', correct: 'Evet! Bu musluk kapalı.', wrong: 'Hayır, bu musluk açık.' }
        },
        options: [
            { id: 3016, word: "musluk", imageUrl: "/images/3016.webp", isCorrect: true, audioKey: "musluk", spokenText: "musluk" },
            { id: 3015, word: "musluk", imageUrl: "/images/3015.webp", isCorrect: false, audioKey: "musluk", spokenText: "musluk" }
        ]
    },
    // pencere
    {
        id: 17,
        question: "Hangi pencere açık?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi pencere açık?', correct: 'Evet! Bu pencere açık.', wrong: 'Hayır, bu pencere kapalı.' }
        },
        options: [
            { id: 3017, word: "pencere", imageUrl: "/images/3017.webp", isCorrect: true, audioKey: "pencere", spokenText: "pencere" },
            { id: 3018, word: "pencere", imageUrl: "/images/3018.webp", isCorrect: false, audioKey: "pencere", spokenText: "pencere" }
        ]
    },
    {
        id: 18,
        question: "Hangi pencere kapalı?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi pencere kapalı?', correct: 'Evet! Bu pencere kapalı.', wrong: 'Hayır, bu pencere açık.' }
        },
        options: [
            { id: 3018, word: "pencere", imageUrl: "/images/3018.webp", isCorrect: true, audioKey: "pencere", spokenText: "pencere" },
            { id: 3017, word: "pencere", imageUrl: "/images/3017.webp", isCorrect: false, audioKey: "pencere", spokenText: "pencere" }
        ]
    },
    // şemsiye
    {
        id: 19,
        question: "Hangi şemsiye açık?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi şemsiye açık?', correct: 'Evet! Bu şemsiye açık.', wrong: 'Hayır, bu şemsiye kapalı.' }
        },
        options: [
            { id: 3019, word: "şemsiye", imageUrl: "/images/3019.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 3020, word: "şemsiye", imageUrl: "/images/3020.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 20,
        question: "Hangi şemsiye kapalı?",
        questionAudioKey: "",
        activityType: ActivityType.OpenClosed,
        speech: {
            tr: { question: 'Hangi şemsiye kapalı?', correct: 'Evet! Bu şemsiye kapalı.', wrong: 'Hayır, bu şemsiye açık.' }
        },
        options: [
            { id: 3020, word: "şemsiye", imageUrl: "/images/3020.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 3019, word: "şemsiye", imageUrl: "/images/3019.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
];
