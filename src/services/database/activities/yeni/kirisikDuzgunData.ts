// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (kirisik-duzgun). Elle düzenleme.
// 8 çift, 16 soru. Görseller: gorsel-ham/kirisik-duzgun/ → id 4701-4716.
import { ConceptRound, ActivityType } from '../../../../types';

export const kirisikDuzgunDataYeni: ConceptRound[] = [
    // etek
    {
        id: 1,
        question: "Hangi etek kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi etek kırışık?', correct: 'Evet! Etek kırışıktır.', wrong: 'Hayır, bu etek düzgündür.' }
        },
        options: [
            { id: 4702, word: "etek", imageUrl: "/images/4702.webp", isCorrect: true, audioKey: "etek", spokenText: "etek" },
            { id: 4701, word: "etek", imageUrl: "/images/4701.webp", isCorrect: false, audioKey: "etek", spokenText: "etek" }
        ]
    },
    {
        id: 2,
        question: "Hangi etek düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi etek düzgün?', correct: 'Evet! Etek düzgündür.', wrong: 'Hayır, bu etek kırışıktır.' }
        },
        options: [
            { id: 4701, word: "etek", imageUrl: "/images/4701.webp", isCorrect: true, audioKey: "etek", spokenText: "etek" },
            { id: 4702, word: "etek", imageUrl: "/images/4702.webp", isCorrect: false, audioKey: "etek", spokenText: "etek" }
        ]
    },
    // gömlek
    {
        id: 3,
        question: "Hangi gömlek kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi gömlek kırışık?', correct: 'Evet! Gömlek kırışıktır.', wrong: 'Hayır, bu gömlek düzgündür.' }
        },
        options: [
            { id: 4704, word: "gömlek", imageUrl: "/images/4704.webp", isCorrect: true, audioKey: "gömlek", spokenText: "gömlek" },
            { id: 4703, word: "gömlek", imageUrl: "/images/4703.webp", isCorrect: false, audioKey: "gömlek", spokenText: "gömlek" }
        ]
    },
    {
        id: 4,
        question: "Hangi gömlek düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi gömlek düzgün?', correct: 'Evet! Gömlek düzgündür.', wrong: 'Hayır, bu gömlek kırışıktır.' }
        },
        options: [
            { id: 4703, word: "gömlek", imageUrl: "/images/4703.webp", isCorrect: true, audioKey: "gömlek", spokenText: "gömlek" },
            { id: 4704, word: "gömlek", imageUrl: "/images/4704.webp", isCorrect: false, audioKey: "gömlek", spokenText: "gömlek" }
        ]
    },
    // kâğıt
    {
        id: 5,
        question: "Hangi kâğıt kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi kâğıt kırışık?', correct: 'Evet! Kâğıt kırışıktır.', wrong: 'Hayır, bu kâğıt düzgündür.' }
        },
        options: [
            { id: 4706, word: "kâğıt", imageUrl: "/images/4706.webp", isCorrect: true, audioKey: "kâğıt", spokenText: "kâğıt" },
            { id: 4705, word: "kâğıt", imageUrl: "/images/4705.webp", isCorrect: false, audioKey: "kâğıt", spokenText: "kâğıt" }
        ]
    },
    {
        id: 6,
        question: "Hangi kâğıt düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi kâğıt düzgün?', correct: 'Evet! Kâğıt düzgündür.', wrong: 'Hayır, bu kâğıt kırışıktır.' }
        },
        options: [
            { id: 4705, word: "kâğıt", imageUrl: "/images/4705.webp", isCorrect: true, audioKey: "kâğıt", spokenText: "kâğıt" },
            { id: 4706, word: "kâğıt", imageUrl: "/images/4706.webp", isCorrect: false, audioKey: "kâğıt", spokenText: "kâğıt" }
        ]
    },
    // yatak örtüsü
    {
        id: 7,
        question: "Hangi yatak örtüsü kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi yatak örtüsü kırışık?', correct: 'Evet! Yatak örtüsü kırışıktır.', wrong: 'Hayır, bu yatak örtüsü düzgündür.' }
        },
        options: [
            { id: 4708, word: "yatak örtüsü", imageUrl: "/images/4708.webp", isCorrect: true, audioKey: "yatak örtüsü", spokenText: "yatak örtüsü" },
            { id: 4707, word: "yatak örtüsü", imageUrl: "/images/4707.webp", isCorrect: false, audioKey: "yatak örtüsü", spokenText: "yatak örtüsü" }
        ]
    },
    {
        id: 8,
        question: "Hangi yatak örtüsü düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi yatak örtüsü düzgün?', correct: 'Evet! Yatak örtüsü düzgündür.', wrong: 'Hayır, bu yatak örtüsü kırışıktır.' }
        },
        options: [
            { id: 4707, word: "yatak örtüsü", imageUrl: "/images/4707.webp", isCorrect: true, audioKey: "yatak örtüsü", spokenText: "yatak örtüsü" },
            { id: 4708, word: "yatak örtüsü", imageUrl: "/images/4708.webp", isCorrect: false, audioKey: "yatak örtüsü", spokenText: "yatak örtüsü" }
        ]
    },
    // pantolon
    {
        id: 9,
        question: "Hangi pantolon kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi pantolon kırışık?', correct: 'Evet! Pantolon kırışıktır.', wrong: 'Hayır, bu pantolon düzgündür.' }
        },
        options: [
            { id: 4710, word: "pantolon", imageUrl: "/images/4710.webp", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 4709, word: "pantolon", imageUrl: "/images/4709.webp", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" }
        ]
    },
    {
        id: 10,
        question: "Hangi pantolon düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi pantolon düzgün?', correct: 'Evet! Pantolon düzgündür.', wrong: 'Hayır, bu pantolon kırışıktır.' }
        },
        options: [
            { id: 4709, word: "pantolon", imageUrl: "/images/4709.webp", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 4710, word: "pantolon", imageUrl: "/images/4710.webp", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" }
        ]
    },
    // peçete
    {
        id: 11,
        question: "Hangi peçete kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi peçete kırışık?', correct: 'Evet! Peçete kırışıktır.', wrong: 'Hayır, bu peçete düzgündür.' }
        },
        options: [
            { id: 4712, word: "peçete", imageUrl: "/images/4712.webp", isCorrect: true, audioKey: "peçete", spokenText: "peçete" },
            { id: 4711, word: "peçete", imageUrl: "/images/4711.webp", isCorrect: false, audioKey: "peçete", spokenText: "peçete" }
        ]
    },
    {
        id: 12,
        question: "Hangi peçete düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi peçete düzgün?', correct: 'Evet! Peçete düzgündür.', wrong: 'Hayır, bu peçete kırışıktır.' }
        },
        options: [
            { id: 4711, word: "peçete", imageUrl: "/images/4711.webp", isCorrect: true, audioKey: "peçete", spokenText: "peçete" },
            { id: 4712, word: "peçete", imageUrl: "/images/4712.webp", isCorrect: false, audioKey: "peçete", spokenText: "peçete" }
        ]
    },
    // perde
    {
        id: 13,
        question: "Hangi perde kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi perde kırışık?', correct: 'Evet! Perde kırışıktır.', wrong: 'Hayır, bu perde düzgündür.' }
        },
        options: [
            { id: 4714, word: "perde", imageUrl: "/images/4714.webp", isCorrect: true, audioKey: "perde", spokenText: "perde" },
            { id: 4713, word: "perde", imageUrl: "/images/4713.webp", isCorrect: false, audioKey: "perde", spokenText: "perde" }
        ]
    },
    {
        id: 14,
        question: "Hangi perde düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi perde düzgün?', correct: 'Evet! Perde düzgündür.', wrong: 'Hayır, bu perde kırışıktır.' }
        },
        options: [
            { id: 4713, word: "perde", imageUrl: "/images/4713.webp", isCorrect: true, audioKey: "perde", spokenText: "perde" },
            { id: 4714, word: "perde", imageUrl: "/images/4714.webp", isCorrect: false, audioKey: "perde", spokenText: "perde" }
        ]
    },
    // tişört
    {
        id: 15,
        question: "Hangi tişört kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi tişört kırışık?', correct: 'Evet! Tişört kırışıktır.', wrong: 'Hayır, bu tişört düzgündür.' }
        },
        options: [
            { id: 4716, word: "tişört", imageUrl: "/images/4716.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 4715, word: "tişört", imageUrl: "/images/4715.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 16,
        question: "Hangi tişört düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi tişört düzgün?', correct: 'Evet! Tişört düzgündür.', wrong: 'Hayır, bu tişört kırışıktır.' }
        },
        options: [
            { id: 4715, word: "tişört", imageUrl: "/images/4715.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 4716, word: "tişört", imageUrl: "/images/4716.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
];
