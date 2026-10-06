// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (parlak-mat). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/parlak-mat/ → id 3901-3918.
import { ConceptRound, ActivityType } from '../../../../types';

export const parlakMatDataYeni: ConceptRound[] = [
    // araba
    {
        id: 1,
        question: "Hangi araba parlak?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi araba parlak?', correct: 'Evet! Bu araba parlak.', wrong: 'Hayır, bu araba mat.' }
        },
        options: [
            { id: 3902, word: "araba", imageUrl: "/images/3902.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3901, word: "araba", imageUrl: "/images/3901.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 2,
        question: "Hangi araba mat?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi araba mat?', correct: 'Evet! Bu araba mat.', wrong: 'Hayır, bu araba parlak.' }
        },
        options: [
            { id: 3901, word: "araba", imageUrl: "/images/3901.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 3902, word: "araba", imageUrl: "/images/3902.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // ayakkabı
    {
        id: 3,
        question: "Hangi ayakkabı parlak?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi ayakkabı parlak?', correct: 'Evet! Bu ayakkabı parlak.', wrong: 'Hayır, bu ayakkabı mat.' }
        },
        options: [
            { id: 3904, word: "ayakkabı", imageUrl: "/images/3904.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 3903, word: "ayakkabı", imageUrl: "/images/3903.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    {
        id: 4,
        question: "Hangi ayakkabı mat?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi ayakkabı mat?', correct: 'Evet! Bu ayakkabı mat.', wrong: 'Hayır, bu ayakkabı parlak.' }
        },
        options: [
            { id: 3903, word: "ayakkabı", imageUrl: "/images/3903.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 3904, word: "ayakkabı", imageUrl: "/images/3904.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    // balon
    {
        id: 5,
        question: "Hangi balon parlak?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi balon parlak?', correct: 'Evet! Bu balon parlak.', wrong: 'Hayır, bu balon mat.' }
        },
        options: [
            { id: 3905, word: "balon", imageUrl: "/images/3905.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 2305, word: "balon", imageUrl: "/images/2305.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 6,
        question: "Hangi balon mat?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi balon mat?', correct: 'Evet! Bu balon mat.', wrong: 'Hayır, bu balon parlak.' }
        },
        options: [
            { id: 2305, word: "balon", imageUrl: "/images/2305.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 3905, word: "balon", imageUrl: "/images/3905.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    // elma
    {
        id: 7,
        question: "Hangi elma parlak?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi elma parlak?', correct: 'Evet! Bu elma parlak.', wrong: 'Hayır, bu elma mat.' }
        },
        options: [
            { id: 3907, word: "elma", imageUrl: "/images/3907.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 3906, word: "elma", imageUrl: "/images/3906.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 8,
        question: "Hangi elma mat?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi elma mat?', correct: 'Evet! Bu elma mat.', wrong: 'Hayır, bu elma parlak.' }
        },
        options: [
            { id: 3906, word: "elma", imageUrl: "/images/3906.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 3907, word: "elma", imageUrl: "/images/3907.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kaşık
    {
        id: 9,
        question: "Hangi kaşık parlak?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi kaşık parlak?', correct: 'Evet! Bu kaşık parlak.', wrong: 'Hayır, bu kaşık mat.' }
        },
        options: [
            { id: 3909, word: "kaşık", imageUrl: "/images/3909.webp", isCorrect: true, audioKey: "kaşık", spokenText: "kaşık" },
            { id: 3908, word: "kaşık", imageUrl: "/images/3908.webp", isCorrect: false, audioKey: "kaşık", spokenText: "kaşık" }
        ]
    },
    {
        id: 10,
        question: "Hangi kaşık mat?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi kaşık mat?', correct: 'Evet! Bu kaşık mat.', wrong: 'Hayır, bu kaşık parlak.' }
        },
        options: [
            { id: 3908, word: "kaşık", imageUrl: "/images/3908.webp", isCorrect: true, audioKey: "kaşık", spokenText: "kaşık" },
            { id: 3909, word: "kaşık", imageUrl: "/images/3909.webp", isCorrect: false, audioKey: "kaşık", spokenText: "kaşık" }
        ]
    },
    // kupa
    {
        id: 11,
        question: "Hangi kupa parlak?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi kupa parlak?', correct: 'Evet! Bu kupa parlak.', wrong: 'Hayır, bu kupa mat.' }
        },
        options: [
            { id: 3911, word: "kupa", imageUrl: "/images/3911.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 3910, word: "kupa", imageUrl: "/images/3910.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 12,
        question: "Hangi kupa mat?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi kupa mat?', correct: 'Evet! Bu kupa mat.', wrong: 'Hayır, bu kupa parlak.' }
        },
        options: [
            { id: 3910, word: "kupa", imageUrl: "/images/3910.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 3911, word: "kupa", imageUrl: "/images/3911.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    // saksı
    {
        id: 13,
        question: "Hangi saksı parlak?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi saksı parlak?', correct: 'Evet! Bu saksı parlak.', wrong: 'Hayır, bu saksı mat.' }
        },
        options: [
            { id: 3912, word: "saksı", imageUrl: "/images/3912.webp", isCorrect: true, audioKey: "saksı", spokenText: "saksı" },
            { id: 3114, word: "saksı", imageUrl: "/images/3114.webp", isCorrect: false, audioKey: "saksı", spokenText: "saksı" }
        ]
    },
    {
        id: 14,
        question: "Hangi saksı mat?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi saksı mat?', correct: 'Evet! Bu saksı mat.', wrong: 'Hayır, bu saksı parlak.' }
        },
        options: [
            { id: 3114, word: "saksı", imageUrl: "/images/3114.webp", isCorrect: true, audioKey: "saksı", spokenText: "saksı" },
            { id: 3912, word: "saksı", imageUrl: "/images/3912.webp", isCorrect: false, audioKey: "saksı", spokenText: "saksı" }
        ]
    },
    // tencere
    {
        id: 15,
        question: "Hangi tencere parlak?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi tencere parlak?', correct: 'Evet! Bu tencere parlak.', wrong: 'Hayır, bu tencere mat.' }
        },
        options: [
            { id: 3914, word: "tencere", imageUrl: "/images/3914.webp", isCorrect: true, audioKey: "tencere", spokenText: "tencere" },
            { id: 3913, word: "tencere", imageUrl: "/images/3913.webp", isCorrect: false, audioKey: "tencere", spokenText: "tencere" }
        ]
    },
    {
        id: 16,
        question: "Hangi tencere mat?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi tencere mat?', correct: 'Evet! Bu tencere mat.', wrong: 'Hayır, bu tencere parlak.' }
        },
        options: [
            { id: 3913, word: "tencere", imageUrl: "/images/3913.webp", isCorrect: true, audioKey: "tencere", spokenText: "tencere" },
            { id: 3914, word: "tencere", imageUrl: "/images/3914.webp", isCorrect: false, audioKey: "tencere", spokenText: "tencere" }
        ]
    },
    // top
    {
        id: 17,
        question: "Hangi top parlak?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi top parlak?', correct: 'Evet! Bu top parlak.', wrong: 'Hayır, bu top mat.' }
        },
        options: [
            { id: 3916, word: "top", imageUrl: "/images/3916.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 3915, word: "top", imageUrl: "/images/3915.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 18,
        question: "Hangi top mat?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi top mat?', correct: 'Evet! Bu top mat.', wrong: 'Hayır, bu top parlak.' }
        },
        options: [
            { id: 3915, word: "top", imageUrl: "/images/3915.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 3916, word: "top", imageUrl: "/images/3916.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // vazo
    {
        id: 19,
        question: "Hangi vazo parlak?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi vazo parlak?', correct: 'Evet! Bu vazo parlak.', wrong: 'Hayır, bu vazo mat.' }
        },
        options: [
            { id: 3918, word: "vazo", imageUrl: "/images/3918.webp", isCorrect: true, audioKey: "vazo", spokenText: "vazo" },
            { id: 3917, word: "vazo", imageUrl: "/images/3917.webp", isCorrect: false, audioKey: "vazo", spokenText: "vazo" }
        ]
    },
    {
        id: 20,
        question: "Hangi vazo mat?",
        questionAudioKey: "",
        activityType: ActivityType.ParlakMat,
        speech: {
            tr: { question: 'Hangi vazo mat?', correct: 'Evet! Bu vazo mat.', wrong: 'Hayır, bu vazo parlak.' }
        },
        options: [
            { id: 3917, word: "vazo", imageUrl: "/images/3917.webp", isCorrect: true, audioKey: "vazo", spokenText: "vazo" },
            { id: 3918, word: "vazo", imageUrl: "/images/3918.webp", isCorrect: false, audioKey: "vazo", spokenText: "vazo" }
        ]
    },
];
