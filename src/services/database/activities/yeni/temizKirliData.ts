// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (temiz-kirli). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/temiz-kirli/ → id 3201-3220.
import { ConceptRound, ActivityType } from '../../../../types';

export const cleanDirtyDataYeni: ConceptRound[] = [
    // araba
    {
        id: 1,
        question: "Temiz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Temiz olan hangisi?', correct: 'Evet! Araba temizdir.', wrong: 'Hayır, bu araba kirlidir.' }
        },
        options: [
            { id: 3202, word: "araba", imageUrl: "/images/3202.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3201, word: "araba", imageUrl: "/images/3201.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 2,
        question: "Kirli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Kirli olan hangisi?', correct: 'Evet! Araba kirlidir.', wrong: 'Hayır, bu araba temizdir.' }
        },
        options: [
            { id: 3201, word: "araba", imageUrl: "/images/3201.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3202, word: "araba", imageUrl: "/images/3202.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // ayakkabı
    {
        id: 3,
        question: "Temiz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Temiz olan hangisi?', correct: 'Evet! Ayakkabı temizdir.', wrong: 'Hayır, bu ayakkabı kirlidir.' }
        },
        options: [
            { id: 3204, word: "ayakkabı", imageUrl: "/images/3204.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 3203, word: "ayakkabı", imageUrl: "/images/3203.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    {
        id: 4,
        question: "Kirli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Kirli olan hangisi?', correct: 'Evet! Ayakkabı kirlidir.', wrong: 'Hayır, bu ayakkabı temizdir.' }
        },
        options: [
            { id: 3203, word: "ayakkabı", imageUrl: "/images/3203.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 3204, word: "ayakkabı", imageUrl: "/images/3204.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    // ayı
    {
        id: 5,
        question: "Temiz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Temiz olan hangisi?', correct: 'Evet! Ayı temizdir.', wrong: 'Hayır, bu ayı kirlidir.' }
        },
        options: [
            { id: 3206, word: "ayı", imageUrl: "/images/3206.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 3205, word: "ayı", imageUrl: "/images/3205.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 6,
        question: "Kirli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Kirli olan hangisi?', correct: 'Evet! Ayı kirlidir.', wrong: 'Hayır, bu ayı temizdir.' }
        },
        options: [
            { id: 3205, word: "ayı", imageUrl: "/images/3205.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 3206, word: "ayı", imageUrl: "/images/3206.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // bardak
    {
        id: 7,
        question: "Temiz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Temiz olan hangisi?', correct: 'Evet! Bardak temizdir.', wrong: 'Hayır, bu bardak kirlidir.' }
        },
        options: [
            { id: 3208, word: "bardak", imageUrl: "/images/3208.webp", isCorrect: true, audioKey: "bardak", spokenText: "bardak" },
            { id: 3207, word: "bardak", imageUrl: "/images/3207.webp", isCorrect: false, audioKey: "bardak", spokenText: "bardak" }
        ]
    },
    {
        id: 8,
        question: "Kirli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Kirli olan hangisi?', correct: 'Evet! Bardak kirlidir.', wrong: 'Hayır, bu bardak temizdir.' }
        },
        options: [
            { id: 3207, word: "bardak", imageUrl: "/images/3207.webp", isCorrect: true, audioKey: "bardak", spokenText: "bardak" },
            { id: 3208, word: "bardak", imageUrl: "/images/3208.webp", isCorrect: false, audioKey: "bardak", spokenText: "bardak" }
        ]
    },
    // çorap
    {
        id: 9,
        question: "Temiz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Temiz olan hangisi?', correct: 'Evet! Çorap temizdir.', wrong: 'Hayır, bu çorap kirlidir.' }
        },
        options: [
            { id: 3210, word: "çorap", imageUrl: "/images/3210.webp", isCorrect: true, audioKey: "çorap", spokenText: "çorap" },
            { id: 3209, word: "çorap", imageUrl: "/images/3209.webp", isCorrect: false, audioKey: "çorap", spokenText: "çorap" }
        ]
    },
    {
        id: 10,
        question: "Kirli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Kirli olan hangisi?', correct: 'Evet! Çorap kirlidir.', wrong: 'Hayır, bu çorap temizdir.' }
        },
        options: [
            { id: 3209, word: "çorap", imageUrl: "/images/3209.webp", isCorrect: true, audioKey: "çorap", spokenText: "çorap" },
            { id: 3210, word: "çorap", imageUrl: "/images/3210.webp", isCorrect: false, audioKey: "çorap", spokenText: "çorap" }
        ]
    },
    // el
    {
        id: 11,
        question: "Elleri temiz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Elleri temiz olan hangisi?', correct: 'Evet! Eller temizdir.', wrong: 'Hayır, bu eller kirlidir.' }
        },
        options: [
            { id: 3212, word: "el", imageUrl: "/images/3212.webp", isCorrect: true, audioKey: "el", spokenText: "el" },
            { id: 3211, word: "el", imageUrl: "/images/3211.webp", isCorrect: false, audioKey: "el", spokenText: "el" }
        ]
    },
    {
        id: 12,
        question: "Elleri kirli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Elleri kirli olan hangisi?', correct: 'Evet! Eller kirlidir.', wrong: 'Hayır, bu eller temizdir.' }
        },
        options: [
            { id: 3211, word: "el", imageUrl: "/images/3211.webp", isCorrect: true, audioKey: "el", spokenText: "el" },
            { id: 3212, word: "el", imageUrl: "/images/3212.webp", isCorrect: false, audioKey: "el", spokenText: "el" }
        ]
    },
    // köpek
    {
        id: 13,
        question: "Temiz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Temiz olan hangisi?', correct: 'Evet! Köpek temizdir.', wrong: 'Hayır, bu köpek kirlidir.' }
        },
        options: [
            { id: 3214, word: "köpek", imageUrl: "/images/3214.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 3213, word: "köpek", imageUrl: "/images/3213.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    {
        id: 14,
        question: "Kirli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Kirli olan hangisi?', correct: 'Evet! Köpek kirlidir.', wrong: 'Hayır, bu köpek temizdir.' }
        },
        options: [
            { id: 3213, word: "köpek", imageUrl: "/images/3213.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 3214, word: "köpek", imageUrl: "/images/3214.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    // tabak
    {
        id: 15,
        question: "Temiz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Temiz olan hangisi?', correct: 'Evet! Tabak temizdir.', wrong: 'Hayır, bu tabak kirlidir.' }
        },
        options: [
            { id: 3216, word: "tabak", imageUrl: "/images/3216.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 3215, word: "tabak", imageUrl: "/images/3215.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
    {
        id: 16,
        question: "Kirli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Kirli olan hangisi?', correct: 'Evet! Tabak kirlidir.', wrong: 'Hayır, bu tabak temizdir.' }
        },
        options: [
            { id: 3215, word: "tabak", imageUrl: "/images/3215.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 3216, word: "tabak", imageUrl: "/images/3216.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
    // tişört
    {
        id: 17,
        question: "Temiz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Temiz olan hangisi?', correct: 'Evet! Tişört temizdir.', wrong: 'Hayır, bu tişört kirlidir.' }
        },
        options: [
            { id: 3218, word: "tişört", imageUrl: "/images/3218.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 3217, word: "tişört", imageUrl: "/images/3217.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 18,
        question: "Kirli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Kirli olan hangisi?', correct: 'Evet! Tişört kirlidir.', wrong: 'Hayır, bu tişört temizdir.' }
        },
        options: [
            { id: 3217, word: "tişört", imageUrl: "/images/3217.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 3218, word: "tişört", imageUrl: "/images/3218.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    // yüz
    {
        id: 19,
        question: "Yüzü temiz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Yüzü temiz olan hangisi?', correct: 'Evet! Yüz temizdir.', wrong: 'Hayır, bu yüz kirlidir.' }
        },
        options: [
            { id: 3220, word: "yüz", imageUrl: "/images/3220.webp", isCorrect: true, audioKey: "yüz", spokenText: "yüz" },
            { id: 3219, word: "yüz", imageUrl: "/images/3219.webp", isCorrect: false, audioKey: "yüz", spokenText: "yüz" }
        ]
    },
    {
        id: 20,
        question: "Yüzü kirli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Yüzü kirli olan hangisi?', correct: 'Evet! Yüz kirlidir.', wrong: 'Hayır, bu yüz temizdir.' }
        },
        options: [
            { id: 3219, word: "yüz", imageUrl: "/images/3219.webp", isCorrect: true, audioKey: "yüz", spokenText: "yüz" },
            { id: 3220, word: "yüz", imageUrl: "/images/3220.webp", isCorrect: false, audioKey: "yüz", spokenText: "yüz" }
        ]
    },
];
