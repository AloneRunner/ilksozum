// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (eski-yeni). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/eski-yeni/ → id 3401-3420.
import { ConceptRound, ActivityType } from '../../../../types';

export const oldNewDataYeni: ConceptRound[] = [
    // araba
    {
        id: 1,
        question: "Hangi araba eski?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi araba eski?', correct: 'Evet! Bu araba eski.', wrong: 'Hayır, bu araba yeni.' }
        },
        options: [
            { id: 3401, word: "araba", imageUrl: "/images/3401.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3402, word: "araba", imageUrl: "/images/3402.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 2,
        question: "Hangi araba yeni?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi araba yeni?', correct: 'Evet! Bu araba yeni.', wrong: 'Hayır, bu araba eski.' }
        },
        options: [
            { id: 3402, word: "araba", imageUrl: "/images/3402.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3401, word: "araba", imageUrl: "/images/3401.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // ayakkabı
    {
        id: 3,
        question: "Hangi ayakkabı eski?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi ayakkabı eski?', correct: 'Evet! Bu ayakkabı eski.', wrong: 'Hayır, bu ayakkabı yeni.' }
        },
        options: [
            { id: 3403, word: "ayakkabı", imageUrl: "/images/3403.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 3404, word: "ayakkabı", imageUrl: "/images/3404.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    {
        id: 4,
        question: "Hangi ayakkabı yeni?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi ayakkabı yeni?', correct: 'Evet! Bu ayakkabı yeni.', wrong: 'Hayır, bu ayakkabı eski.' }
        },
        options: [
            { id: 3404, word: "ayakkabı", imageUrl: "/images/3404.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 3403, word: "ayakkabı", imageUrl: "/images/3403.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    // ayı
    {
        id: 5,
        question: "Hangi ayı eski?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi ayı eski?', correct: 'Evet! Bu ayı eski.', wrong: 'Hayır, bu ayı yeni.' }
        },
        options: [
            { id: 3405, word: "ayı", imageUrl: "/images/3405.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 3406, word: "ayı", imageUrl: "/images/3406.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 6,
        question: "Hangi ayı yeni?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi ayı yeni?', correct: 'Evet! Bu ayı yeni.', wrong: 'Hayır, bu ayı eski.' }
        },
        options: [
            { id: 3406, word: "ayı", imageUrl: "/images/3406.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 3405, word: "ayı", imageUrl: "/images/3405.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // bisiklet
    {
        id: 7,
        question: "Hangi bisiklet eski?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi bisiklet eski?', correct: 'Evet! Bu bisiklet eski.', wrong: 'Hayır, bu bisiklet yeni.' }
        },
        options: [
            { id: 3407, word: "bisiklet", imageUrl: "/images/3407.webp", isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" },
            { id: 3408, word: "bisiklet", imageUrl: "/images/3408.webp", isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    {
        id: 8,
        question: "Hangi bisiklet yeni?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi bisiklet yeni?', correct: 'Evet! Bu bisiklet yeni.', wrong: 'Hayır, bu bisiklet eski.' }
        },
        options: [
            { id: 3408, word: "bisiklet", imageUrl: "/images/3408.webp", isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" },
            { id: 3407, word: "bisiklet", imageUrl: "/images/3407.webp", isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    // çanta
    {
        id: 9,
        question: "Hangi çanta eski?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi çanta eski?', correct: 'Evet! Bu çanta eski.', wrong: 'Hayır, bu çanta yeni.' }
        },
        options: [
            { id: 3409, word: "çanta", imageUrl: "/images/3409.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 3410, word: "çanta", imageUrl: "/images/3410.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 10,
        question: "Hangi çanta yeni?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi çanta yeni?', correct: 'Evet! Bu çanta yeni.', wrong: 'Hayır, bu çanta eski.' }
        },
        options: [
            { id: 3410, word: "çanta", imageUrl: "/images/3410.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 3409, word: "çanta", imageUrl: "/images/3409.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    // çaydanlık
    {
        id: 11,
        question: "Hangi çaydanlık eski?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi çaydanlık eski?', correct: 'Evet! Bu çaydanlık eski.', wrong: 'Hayır, bu çaydanlık yeni.' }
        },
        options: [
            { id: 3411, word: "çaydanlık", imageUrl: "/images/3411.webp", isCorrect: true, audioKey: "çaydanlık", spokenText: "çaydanlık" },
            { id: 3412, word: "çaydanlık", imageUrl: "/images/3412.webp", isCorrect: false, audioKey: "çaydanlık", spokenText: "çaydanlık" }
        ]
    },
    {
        id: 12,
        question: "Hangi çaydanlık yeni?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi çaydanlık yeni?', correct: 'Evet! Bu çaydanlık yeni.', wrong: 'Hayır, bu çaydanlık eski.' }
        },
        options: [
            { id: 3412, word: "çaydanlık", imageUrl: "/images/3412.webp", isCorrect: true, audioKey: "çaydanlık", spokenText: "çaydanlık" },
            { id: 3411, word: "çaydanlık", imageUrl: "/images/3411.webp", isCorrect: false, audioKey: "çaydanlık", spokenText: "çaydanlık" }
        ]
    },
    // kapı
    {
        id: 13,
        question: "Hangi kapı eski?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi kapı eski?', correct: 'Evet! Bu kapı eski.', wrong: 'Hayır, bu kapı yeni.' }
        },
        options: [
            { id: 3413, word: "kapı", imageUrl: "/images/3413.webp", isCorrect: true, audioKey: "kapı", spokenText: "kapı" },
            { id: 3414, word: "kapı", imageUrl: "/images/3414.webp", isCorrect: false, audioKey: "kapı", spokenText: "kapı" }
        ]
    },
    {
        id: 14,
        question: "Hangi kapı yeni?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi kapı yeni?', correct: 'Evet! Bu kapı yeni.', wrong: 'Hayır, bu kapı eski.' }
        },
        options: [
            { id: 3414, word: "kapı", imageUrl: "/images/3414.webp", isCorrect: true, audioKey: "kapı", spokenText: "kapı" },
            { id: 3413, word: "kapı", imageUrl: "/images/3413.webp", isCorrect: false, audioKey: "kapı", spokenText: "kapı" }
        ]
    },
    // kitap
    {
        id: 15,
        question: "Hangi kitap eski?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi kitap eski?', correct: 'Evet! Bu kitap eski.', wrong: 'Hayır, bu kitap yeni.' }
        },
        options: [
            { id: 3415, word: "kitap", imageUrl: "/images/3415.webp", isCorrect: true, audioKey: "kitap", spokenText: "kitap" },
            { id: 3416, word: "kitap", imageUrl: "/images/3416.webp", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    {
        id: 16,
        question: "Hangi kitap yeni?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi kitap yeni?', correct: 'Evet! Bu kitap yeni.', wrong: 'Hayır, bu kitap eski.' }
        },
        options: [
            { id: 3416, word: "kitap", imageUrl: "/images/3416.webp", isCorrect: true, audioKey: "kitap", spokenText: "kitap" },
            { id: 3415, word: "kitap", imageUrl: "/images/3415.webp", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    // kova
    {
        id: 17,
        question: "Hangi kova eski?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi kova eski?', correct: 'Evet! Bu kova eski.', wrong: 'Hayır, bu kova yeni.' }
        },
        options: [
            { id: 3417, word: "kova", imageUrl: "/images/3417.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 3418, word: "kova", imageUrl: "/images/3418.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    {
        id: 18,
        question: "Hangi kova yeni?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi kova yeni?', correct: 'Evet! Bu kova yeni.', wrong: 'Hayır, bu kova eski.' }
        },
        options: [
            { id: 3418, word: "kova", imageUrl: "/images/3418.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 3417, word: "kova", imageUrl: "/images/3417.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    // tişört
    {
        id: 19,
        question: "Hangi tişört eski?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi tişört eski?', correct: 'Evet! Bu tişört eski.', wrong: 'Hayır, bu tişört yeni.' }
        },
        options: [
            { id: 3419, word: "tişört", imageUrl: "/images/3419.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 3420, word: "tişört", imageUrl: "/images/3420.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 20,
        question: "Hangi tişört yeni?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Hangi tişört yeni?', correct: 'Evet! Bu tişört yeni.', wrong: 'Hayır, bu tişört eski.' }
        },
        options: [
            { id: 3420, word: "tişört", imageUrl: "/images/3420.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 3419, word: "tişört", imageUrl: "/images/3419.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
];
