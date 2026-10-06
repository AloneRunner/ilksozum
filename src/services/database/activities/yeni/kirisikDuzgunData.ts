// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (kirisik-duzgun). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/kirisik-duzgun/ → id 4701-4720.
import { ConceptRound, ActivityType } from '../../../../types';

export const kirisikDuzgunDataYeni: ConceptRound[] = [
    // elbise
    {
        id: 1,
        question: "Hangi elbise kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi elbise kırışık?', correct: 'Evet! Bu elbise kırışık.', wrong: 'Hayır, bu elbise düzgün.' }
        },
        options: [
            { id: 4702, word: "elbise", imageUrl: "/images/4702.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 4701, word: "elbise", imageUrl: "/images/4701.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 2,
        question: "Hangi elbise düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi elbise düzgün?', correct: 'Evet! Bu elbise düzgün.', wrong: 'Hayır, bu elbise kırışık.' }
        },
        options: [
            { id: 4701, word: "elbise", imageUrl: "/images/4701.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 4702, word: "elbise", imageUrl: "/images/4702.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    // etek
    {
        id: 3,
        question: "Hangi etek kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi etek kırışık?', correct: 'Evet! Bu etek kırışık.', wrong: 'Hayır, bu etek düzgün.' }
        },
        options: [
            { id: 4704, word: "etek", imageUrl: "/images/4704.webp", isCorrect: true, audioKey: "etek", spokenText: "etek" },
            { id: 4703, word: "etek", imageUrl: "/images/4703.webp", isCorrect: false, audioKey: "etek", spokenText: "etek" }
        ]
    },
    {
        id: 4,
        question: "Hangi etek düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi etek düzgün?', correct: 'Evet! Bu etek düzgün.', wrong: 'Hayır, bu etek kırışık.' }
        },
        options: [
            { id: 4703, word: "etek", imageUrl: "/images/4703.webp", isCorrect: true, audioKey: "etek", spokenText: "etek" },
            { id: 4704, word: "etek", imageUrl: "/images/4704.webp", isCorrect: false, audioKey: "etek", spokenText: "etek" }
        ]
    },
    // gömlek
    {
        id: 5,
        question: "Hangi gömlek kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi gömlek kırışık?', correct: 'Evet! Bu gömlek kırışık.', wrong: 'Hayır, bu gömlek düzgün.' }
        },
        options: [
            { id: 4706, word: "gömlek", imageUrl: "/images/4706.webp", isCorrect: true, audioKey: "gömlek", spokenText: "gömlek" },
            { id: 4705, word: "gömlek", imageUrl: "/images/4705.webp", isCorrect: false, audioKey: "gömlek", spokenText: "gömlek" }
        ]
    },
    {
        id: 6,
        question: "Hangi gömlek düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi gömlek düzgün?', correct: 'Evet! Bu gömlek düzgün.', wrong: 'Hayır, bu gömlek kırışık.' }
        },
        options: [
            { id: 4705, word: "gömlek", imageUrl: "/images/4705.webp", isCorrect: true, audioKey: "gömlek", spokenText: "gömlek" },
            { id: 4706, word: "gömlek", imageUrl: "/images/4706.webp", isCorrect: false, audioKey: "gömlek", spokenText: "gömlek" }
        ]
    },
    // kâğıt
    {
        id: 7,
        question: "Hangi kâğıt kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi kâğıt kırışık?', correct: 'Evet! Bu kâğıt kırışık.', wrong: 'Hayır, bu kâğıt düzgün.' }
        },
        options: [
            { id: 4708, word: "kâğıt", imageUrl: "/images/4708.webp", isCorrect: true, audioKey: "kâğıt", spokenText: "kâğıt" },
            { id: 4707, word: "kâğıt", imageUrl: "/images/4707.webp", isCorrect: false, audioKey: "kâğıt", spokenText: "kâğıt" }
        ]
    },
    {
        id: 8,
        question: "Hangi kâğıt düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi kâğıt düzgün?', correct: 'Evet! Bu kâğıt düzgün.', wrong: 'Hayır, bu kâğıt kırışık.' }
        },
        options: [
            { id: 4707, word: "kâğıt", imageUrl: "/images/4707.webp", isCorrect: true, audioKey: "kâğıt", spokenText: "kâğıt" },
            { id: 4708, word: "kâğıt", imageUrl: "/images/4708.webp", isCorrect: false, audioKey: "kâğıt", spokenText: "kâğıt" }
        ]
    },
    // masa örtüsü
    {
        id: 9,
        question: "Hangi masa örtüsü kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi masa örtüsü kırışık?', correct: 'Evet! Bu masa örtüsü kırışık.', wrong: 'Hayır, bu masa örtüsü düzgün.' }
        },
        options: [
            { id: 4710, word: "masa örtüsü", imageUrl: "/images/4710.webp", isCorrect: true, audioKey: "masa örtüsü", spokenText: "masa örtüsü" },
            { id: 4709, word: "masa örtüsü", imageUrl: "/images/4709.webp", isCorrect: false, audioKey: "masa örtüsü", spokenText: "masa örtüsü" }
        ]
    },
    {
        id: 10,
        question: "Hangi masa örtüsü düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi masa örtüsü düzgün?', correct: 'Evet! Bu masa örtüsü düzgün.', wrong: 'Hayır, bu masa örtüsü kırışık.' }
        },
        options: [
            { id: 4709, word: "masa örtüsü", imageUrl: "/images/4709.webp", isCorrect: true, audioKey: "masa örtüsü", spokenText: "masa örtüsü" },
            { id: 4710, word: "masa örtüsü", imageUrl: "/images/4710.webp", isCorrect: false, audioKey: "masa örtüsü", spokenText: "masa örtüsü" }
        ]
    },
    // yatak örtüsü
    {
        id: 11,
        question: "Hangi yatak örtüsü kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi yatak örtüsü kırışık?', correct: 'Evet! Bu yatak örtüsü kırışık.', wrong: 'Hayır, bu yatak örtüsü düzgün.' }
        },
        options: [
            { id: 4712, word: "yatak örtüsü", imageUrl: "/images/4712.webp", isCorrect: true, audioKey: "yatak örtüsü", spokenText: "yatak örtüsü" },
            { id: 4711, word: "yatak örtüsü", imageUrl: "/images/4711.webp", isCorrect: false, audioKey: "yatak örtüsü", spokenText: "yatak örtüsü" }
        ]
    },
    {
        id: 12,
        question: "Hangi yatak örtüsü düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi yatak örtüsü düzgün?', correct: 'Evet! Bu yatak örtüsü düzgün.', wrong: 'Hayır, bu yatak örtüsü kırışık.' }
        },
        options: [
            { id: 4711, word: "yatak örtüsü", imageUrl: "/images/4711.webp", isCorrect: true, audioKey: "yatak örtüsü", spokenText: "yatak örtüsü" },
            { id: 4712, word: "yatak örtüsü", imageUrl: "/images/4712.webp", isCorrect: false, audioKey: "yatak örtüsü", spokenText: "yatak örtüsü" }
        ]
    },
    // pantolon
    {
        id: 13,
        question: "Hangi pantolon kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi pantolon kırışık?', correct: 'Evet! Bu pantolon kırışık.', wrong: 'Hayır, bu pantolon düzgün.' }
        },
        options: [
            { id: 4714, word: "pantolon", imageUrl: "/images/4714.webp", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 4713, word: "pantolon", imageUrl: "/images/4713.webp", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" }
        ]
    },
    {
        id: 14,
        question: "Hangi pantolon düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi pantolon düzgün?', correct: 'Evet! Bu pantolon düzgün.', wrong: 'Hayır, bu pantolon kırışık.' }
        },
        options: [
            { id: 4713, word: "pantolon", imageUrl: "/images/4713.webp", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 4714, word: "pantolon", imageUrl: "/images/4714.webp", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" }
        ]
    },
    // peçete
    {
        id: 15,
        question: "Hangi peçete kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi peçete kırışık?', correct: 'Evet! Bu peçete kırışık.', wrong: 'Hayır, bu peçete düzgün.' }
        },
        options: [
            { id: 4716, word: "peçete", imageUrl: "/images/4716.webp", isCorrect: true, audioKey: "peçete", spokenText: "peçete" },
            { id: 4715, word: "peçete", imageUrl: "/images/4715.webp", isCorrect: false, audioKey: "peçete", spokenText: "peçete" }
        ]
    },
    {
        id: 16,
        question: "Hangi peçete düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi peçete düzgün?', correct: 'Evet! Bu peçete düzgün.', wrong: 'Hayır, bu peçete kırışık.' }
        },
        options: [
            { id: 4715, word: "peçete", imageUrl: "/images/4715.webp", isCorrect: true, audioKey: "peçete", spokenText: "peçete" },
            { id: 4716, word: "peçete", imageUrl: "/images/4716.webp", isCorrect: false, audioKey: "peçete", spokenText: "peçete" }
        ]
    },
    // perde
    {
        id: 17,
        question: "Hangi perde kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi perde kırışık?', correct: 'Evet! Bu perde kırışık.', wrong: 'Hayır, bu perde düzgün.' }
        },
        options: [
            { id: 4718, word: "perde", imageUrl: "/images/4718.webp", isCorrect: true, audioKey: "perde", spokenText: "perde" },
            { id: 4717, word: "perde", imageUrl: "/images/4717.webp", isCorrect: false, audioKey: "perde", spokenText: "perde" }
        ]
    },
    {
        id: 18,
        question: "Hangi perde düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi perde düzgün?', correct: 'Evet! Bu perde düzgün.', wrong: 'Hayır, bu perde kırışık.' }
        },
        options: [
            { id: 4717, word: "perde", imageUrl: "/images/4717.webp", isCorrect: true, audioKey: "perde", spokenText: "perde" },
            { id: 4718, word: "perde", imageUrl: "/images/4718.webp", isCorrect: false, audioKey: "perde", spokenText: "perde" }
        ]
    },
    // tişört
    {
        id: 19,
        question: "Hangi tişört kırışık?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi tişört kırışık?', correct: 'Evet! Bu tişört kırışık.', wrong: 'Hayır, bu tişört düzgün.' }
        },
        options: [
            { id: 4720, word: "tişört", imageUrl: "/images/4720.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 4719, word: "tişört", imageUrl: "/images/4719.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 20,
        question: "Hangi tişört düzgün?",
        questionAudioKey: "",
        activityType: ActivityType.KirisikDuzgun,
        speech: {
            tr: { question: 'Hangi tişört düzgün?', correct: 'Evet! Bu tişört düzgün.', wrong: 'Hayır, bu tişört kırışık.' }
        },
        options: [
            { id: 4719, word: "tişört", imageUrl: "/images/4719.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 4720, word: "tişört", imageUrl: "/images/4720.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
];
