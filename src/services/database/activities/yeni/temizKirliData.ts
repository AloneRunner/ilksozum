// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (temiz-kirli). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/temiz-kirli/ → id 3201-3220.
import { ConceptRound, ActivityType } from '../../../../types';

export const cleanDirtyDataYeni: ConceptRound[] = [
    // araba
    {
        id: 1,
        question: "Hangi araba temiz?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi araba temiz?', correct: 'Evet! Bu araba temiz.', wrong: 'Hayır, bu araba kirli.' }
        },
        options: [
            { id: 3202, word: "araba", imageUrl: "/images/3202.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3201, word: "araba", imageUrl: "/images/3201.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 2,
        question: "Hangi araba kirli?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi araba kirli?', correct: 'Evet! Bu araba kirli.', wrong: 'Hayır, bu araba temiz.' }
        },
        options: [
            { id: 3201, word: "araba", imageUrl: "/images/3201.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3202, word: "araba", imageUrl: "/images/3202.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // ayakkabı
    {
        id: 3,
        question: "Hangi ayakkabı temiz?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi ayakkabı temiz?', correct: 'Evet! Bu ayakkabı temiz.', wrong: 'Hayır, bu ayakkabı kirli.' }
        },
        options: [
            { id: 3204, word: "ayakkabı", imageUrl: "/images/3204.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 3203, word: "ayakkabı", imageUrl: "/images/3203.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    {
        id: 4,
        question: "Hangi ayakkabı kirli?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi ayakkabı kirli?', correct: 'Evet! Bu ayakkabı kirli.', wrong: 'Hayır, bu ayakkabı temiz.' }
        },
        options: [
            { id: 3203, word: "ayakkabı", imageUrl: "/images/3203.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 3204, word: "ayakkabı", imageUrl: "/images/3204.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    // ayı
    {
        id: 5,
        question: "Hangi ayı temiz?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi ayı temiz?', correct: 'Evet! Bu ayı temiz.', wrong: 'Hayır, bu ayı kirli.' }
        },
        options: [
            { id: 3206, word: "ayı", imageUrl: "/images/3206.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 3205, word: "ayı", imageUrl: "/images/3205.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 6,
        question: "Hangi ayı kirli?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi ayı kirli?', correct: 'Evet! Bu ayı kirli.', wrong: 'Hayır, bu ayı temiz.' }
        },
        options: [
            { id: 3205, word: "ayı", imageUrl: "/images/3205.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 3206, word: "ayı", imageUrl: "/images/3206.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // bardak
    {
        id: 7,
        question: "Hangi bardak temiz?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi bardak temiz?', correct: 'Evet! Bu bardak temiz.', wrong: 'Hayır, bu bardak kirli.' }
        },
        options: [
            { id: 3208, word: "bardak", imageUrl: "/images/3208.webp", isCorrect: true, audioKey: "bardak", spokenText: "bardak" },
            { id: 3207, word: "bardak", imageUrl: "/images/3207.webp", isCorrect: false, audioKey: "bardak", spokenText: "bardak" }
        ]
    },
    {
        id: 8,
        question: "Hangi bardak kirli?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi bardak kirli?', correct: 'Evet! Bu bardak kirli.', wrong: 'Hayır, bu bardak temiz.' }
        },
        options: [
            { id: 3207, word: "bardak", imageUrl: "/images/3207.webp", isCorrect: true, audioKey: "bardak", spokenText: "bardak" },
            { id: 3208, word: "bardak", imageUrl: "/images/3208.webp", isCorrect: false, audioKey: "bardak", spokenText: "bardak" }
        ]
    },
    // çorap
    {
        id: 9,
        question: "Hangi çorap temiz?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi çorap temiz?', correct: 'Evet! Bu çorap temiz.', wrong: 'Hayır, bu çorap kirli.' }
        },
        options: [
            { id: 3210, word: "çorap", imageUrl: "/images/3210.webp", isCorrect: true, audioKey: "çorap", spokenText: "çorap" },
            { id: 3209, word: "çorap", imageUrl: "/images/3209.webp", isCorrect: false, audioKey: "çorap", spokenText: "çorap" }
        ]
    },
    {
        id: 10,
        question: "Hangi çorap kirli?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi çorap kirli?', correct: 'Evet! Bu çorap kirli.', wrong: 'Hayır, bu çorap temiz.' }
        },
        options: [
            { id: 3209, word: "çorap", imageUrl: "/images/3209.webp", isCorrect: true, audioKey: "çorap", spokenText: "çorap" },
            { id: 3210, word: "çorap", imageUrl: "/images/3210.webp", isCorrect: false, audioKey: "çorap", spokenText: "çorap" }
        ]
    },
    // el
    {
        id: 11,
        question: "Hangi çocuğun elleri temiz?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi çocuğun elleri temiz?', correct: 'Evet! Bu eller temiz.', wrong: 'Hayır, bu eller kirli.' }
        },
        options: [
            { id: 3212, word: "el", imageUrl: "/images/3212.webp", isCorrect: true, audioKey: "el", spokenText: "el" },
            { id: 3211, word: "el", imageUrl: "/images/3211.webp", isCorrect: false, audioKey: "el", spokenText: "el" }
        ]
    },
    {
        id: 12,
        question: "Hangi çocuğun elleri kirli?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi çocuğun elleri kirli?', correct: 'Evet! Bu eller kirli.', wrong: 'Hayır, bu eller temiz.' }
        },
        options: [
            { id: 3211, word: "el", imageUrl: "/images/3211.webp", isCorrect: true, audioKey: "el", spokenText: "el" },
            { id: 3212, word: "el", imageUrl: "/images/3212.webp", isCorrect: false, audioKey: "el", spokenText: "el" }
        ]
    },
    // köpek
    {
        id: 13,
        question: "Hangi köpek temiz?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi köpek temiz?', correct: 'Evet! Bu köpek temiz.', wrong: 'Hayır, bu köpek kirli.' }
        },
        options: [
            { id: 3214, word: "köpek", imageUrl: "/images/3214.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 3213, word: "köpek", imageUrl: "/images/3213.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    {
        id: 14,
        question: "Hangi köpek kirli?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi köpek kirli?', correct: 'Evet! Bu köpek kirli.', wrong: 'Hayır, bu köpek temiz.' }
        },
        options: [
            { id: 3213, word: "köpek", imageUrl: "/images/3213.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 3214, word: "köpek", imageUrl: "/images/3214.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    // tabak
    {
        id: 15,
        question: "Hangi tabak temiz?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi tabak temiz?', correct: 'Evet! Bu tabak temiz.', wrong: 'Hayır, bu tabak kirli.' }
        },
        options: [
            { id: 3216, word: "tabak", imageUrl: "/images/3216.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 3215, word: "tabak", imageUrl: "/images/3215.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
    {
        id: 16,
        question: "Hangi tabak kirli?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi tabak kirli?', correct: 'Evet! Bu tabak kirli.', wrong: 'Hayır, bu tabak temiz.' }
        },
        options: [
            { id: 3215, word: "tabak", imageUrl: "/images/3215.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 3216, word: "tabak", imageUrl: "/images/3216.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
    // tişört
    {
        id: 17,
        question: "Hangi tişört temiz?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi tişört temiz?', correct: 'Evet! Bu tişört temiz.', wrong: 'Hayır, bu tişört kirli.' }
        },
        options: [
            { id: 3218, word: "tişört", imageUrl: "/images/3218.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 3217, word: "tişört", imageUrl: "/images/3217.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 18,
        question: "Hangi tişört kirli?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi tişört kirli?', correct: 'Evet! Bu tişört kirli.', wrong: 'Hayır, bu tişört temiz.' }
        },
        options: [
            { id: 3217, word: "tişört", imageUrl: "/images/3217.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 3218, word: "tişört", imageUrl: "/images/3218.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    // yüz
    {
        id: 19,
        question: "Hangi çocuğun yüzü temiz?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi çocuğun yüzü temiz?', correct: 'Evet! Bu yüz temiz.', wrong: 'Hayır, bu yüz kirli.' }
        },
        options: [
            { id: 3220, word: "yüz", imageUrl: "/images/3220.webp", isCorrect: true, audioKey: "yüz", spokenText: "yüz" },
            { id: 3219, word: "yüz", imageUrl: "/images/3219.webp", isCorrect: false, audioKey: "yüz", spokenText: "yüz" }
        ]
    },
    {
        id: 20,
        question: "Hangi çocuğun yüzü kirli?",
        questionAudioKey: "",
        activityType: ActivityType.CleanDirty,
        speech: {
            tr: { question: 'Hangi çocuğun yüzü kirli?', correct: 'Evet! Bu yüz kirli.', wrong: 'Hayır, bu yüz temiz.' }
        },
        options: [
            { id: 3219, word: "yüz", imageUrl: "/images/3219.webp", isCorrect: true, audioKey: "yüz", spokenText: "yüz" },
            { id: 3220, word: "yüz", imageUrl: "/images/3220.webp", isCorrect: false, audioKey: "yüz", spokenText: "yüz" }
        ]
    },
];
