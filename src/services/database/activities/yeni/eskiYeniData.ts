// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (eski-yeni). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/eski-yeni/ → id 3401-3420.
import { ConceptRound, ActivityType } from '../../../../types';

export const oldNewDataYeni: ConceptRound[] = [
    // araba
    {
        id: 1,
        question: "Eski olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Eski olan hangisi?', correct: 'Evet! Araba eskidir.', wrong: 'Hayır, bu araba yenidir.' }
        },
        options: [
            { id: 3401, word: "araba", imageUrl: "/images/3401.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3402, word: "araba", imageUrl: "/images/3402.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 2,
        question: "Yeni olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Yeni olan hangisi?', correct: 'Evet! Araba yenidir.', wrong: 'Hayır, bu araba eskidir.' }
        },
        options: [
            { id: 3402, word: "araba", imageUrl: "/images/3402.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3401, word: "araba", imageUrl: "/images/3401.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // ayakkabı
    {
        id: 3,
        question: "Eski olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Eski olan hangisi?', correct: 'Evet! Ayakkabı eskidir.', wrong: 'Hayır, bu ayakkabı yenidir.' }
        },
        options: [
            { id: 3403, word: "ayakkabı", imageUrl: "/images/3403.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 3404, word: "ayakkabı", imageUrl: "/images/3404.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    {
        id: 4,
        question: "Yeni olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Yeni olan hangisi?', correct: 'Evet! Ayakkabı yenidir.', wrong: 'Hayır, bu ayakkabı eskidir.' }
        },
        options: [
            { id: 3404, word: "ayakkabı", imageUrl: "/images/3404.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 3403, word: "ayakkabı", imageUrl: "/images/3403.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    // ayı
    {
        id: 5,
        question: "Eski olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Eski olan hangisi?', correct: 'Evet! Ayı eskidir.', wrong: 'Hayır, bu ayı yenidir.' }
        },
        options: [
            { id: 3405, word: "ayı", imageUrl: "/images/3405.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 3406, word: "ayı", imageUrl: "/images/3406.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 6,
        question: "Yeni olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Yeni olan hangisi?', correct: 'Evet! Ayı yenidir.', wrong: 'Hayır, bu ayı eskidir.' }
        },
        options: [
            { id: 3406, word: "ayı", imageUrl: "/images/3406.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 3405, word: "ayı", imageUrl: "/images/3405.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // bisiklet
    {
        id: 7,
        question: "Eski olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Eski olan hangisi?', correct: 'Evet! Bisiklet eskidir.', wrong: 'Hayır, bu bisiklet yenidir.' }
        },
        options: [
            { id: 3407, word: "bisiklet", imageUrl: "/images/3407.webp", isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" },
            { id: 3408, word: "bisiklet", imageUrl: "/images/3408.webp", isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    {
        id: 8,
        question: "Yeni olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Yeni olan hangisi?', correct: 'Evet! Bisiklet yenidir.', wrong: 'Hayır, bu bisiklet eskidir.' }
        },
        options: [
            { id: 3408, word: "bisiklet", imageUrl: "/images/3408.webp", isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" },
            { id: 3407, word: "bisiklet", imageUrl: "/images/3407.webp", isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    // çanta
    {
        id: 9,
        question: "Eski olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Eski olan hangisi?', correct: 'Evet! Çanta eskidir.', wrong: 'Hayır, bu çanta yenidir.' }
        },
        options: [
            { id: 3409, word: "çanta", imageUrl: "/images/3409.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 3410, word: "çanta", imageUrl: "/images/3410.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 10,
        question: "Yeni olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Yeni olan hangisi?', correct: 'Evet! Çanta yenidir.', wrong: 'Hayır, bu çanta eskidir.' }
        },
        options: [
            { id: 3410, word: "çanta", imageUrl: "/images/3410.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 3409, word: "çanta", imageUrl: "/images/3409.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    // çaydanlık
    {
        id: 11,
        question: "Eski olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Eski olan hangisi?', correct: 'Evet! Çaydanlık eskidir.', wrong: 'Hayır, bu çaydanlık yenidir.' }
        },
        options: [
            { id: 3411, word: "çaydanlık", imageUrl: "/images/3411.webp", isCorrect: true, audioKey: "çaydanlık", spokenText: "çaydanlık" },
            { id: 3412, word: "çaydanlık", imageUrl: "/images/3412.webp", isCorrect: false, audioKey: "çaydanlık", spokenText: "çaydanlık" }
        ]
    },
    {
        id: 12,
        question: "Yeni olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Yeni olan hangisi?', correct: 'Evet! Çaydanlık yenidir.', wrong: 'Hayır, bu çaydanlık eskidir.' }
        },
        options: [
            { id: 3412, word: "çaydanlık", imageUrl: "/images/3412.webp", isCorrect: true, audioKey: "çaydanlık", spokenText: "çaydanlık" },
            { id: 3411, word: "çaydanlık", imageUrl: "/images/3411.webp", isCorrect: false, audioKey: "çaydanlık", spokenText: "çaydanlık" }
        ]
    },
    // kapı
    {
        id: 13,
        question: "Eski olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Eski olan hangisi?', correct: 'Evet! Kapı eskidir.', wrong: 'Hayır, bu kapı yenidir.' }
        },
        options: [
            { id: 3413, word: "kapı", imageUrl: "/images/3413.webp", isCorrect: true, audioKey: "kapı", spokenText: "kapı" },
            { id: 3414, word: "kapı", imageUrl: "/images/3414.webp", isCorrect: false, audioKey: "kapı", spokenText: "kapı" }
        ]
    },
    {
        id: 14,
        question: "Yeni olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Yeni olan hangisi?', correct: 'Evet! Kapı yenidir.', wrong: 'Hayır, bu kapı eskidir.' }
        },
        options: [
            { id: 3414, word: "kapı", imageUrl: "/images/3414.webp", isCorrect: true, audioKey: "kapı", spokenText: "kapı" },
            { id: 3413, word: "kapı", imageUrl: "/images/3413.webp", isCorrect: false, audioKey: "kapı", spokenText: "kapı" }
        ]
    },
    // kitap
    {
        id: 15,
        question: "Eski olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Eski olan hangisi?', correct: 'Evet! Kitap eskidir.', wrong: 'Hayır, bu kitap yenidir.' }
        },
        options: [
            { id: 3415, word: "kitap", imageUrl: "/images/3415.webp", isCorrect: true, audioKey: "kitap", spokenText: "kitap" },
            { id: 3416, word: "kitap", imageUrl: "/images/3416.webp", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    {
        id: 16,
        question: "Yeni olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Yeni olan hangisi?', correct: 'Evet! Kitap yenidir.', wrong: 'Hayır, bu kitap eskidir.' }
        },
        options: [
            { id: 3416, word: "kitap", imageUrl: "/images/3416.webp", isCorrect: true, audioKey: "kitap", spokenText: "kitap" },
            { id: 3415, word: "kitap", imageUrl: "/images/3415.webp", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    // kova
    {
        id: 17,
        question: "Eski olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Eski olan hangisi?', correct: 'Evet! Kova eskidir.', wrong: 'Hayır, bu kova yenidir.' }
        },
        options: [
            { id: 3417, word: "kova", imageUrl: "/images/3417.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 3418, word: "kova", imageUrl: "/images/3418.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    {
        id: 18,
        question: "Yeni olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Yeni olan hangisi?', correct: 'Evet! Kova yenidir.', wrong: 'Hayır, bu kova eskidir.' }
        },
        options: [
            { id: 3418, word: "kova", imageUrl: "/images/3418.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 3417, word: "kova", imageUrl: "/images/3417.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    // tişört
    {
        id: 19,
        question: "Eski olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Eski olan hangisi?', correct: 'Evet! Tişört eskidir.', wrong: 'Hayır, bu tişört yenidir.' }
        },
        options: [
            { id: 3419, word: "tişört", imageUrl: "/images/3419.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 3420, word: "tişört", imageUrl: "/images/3420.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 20,
        question: "Yeni olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OldNew,
        speech: {
            tr: { question: 'Yeni olan hangisi?', correct: 'Evet! Tişört yenidir.', wrong: 'Hayır, bu tişört eskidir.' }
        },
        options: [
            { id: 3420, word: "tişört", imageUrl: "/images/3420.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 3419, word: "tişört", imageUrl: "/images/3419.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
];
