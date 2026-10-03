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
            tr: { question: 'Hangi araba parlak?', correct: 'Evet! Araba parlaktır.', wrong: 'Hayır, bu araba mattır.' }
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
            tr: { question: 'Hangi araba mat?', correct: 'Evet! Araba mattır.', wrong: 'Hayır, bu araba parlaktır.' }
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
            tr: { question: 'Hangi ayakkabı parlak?', correct: 'Evet! Ayakkabı parlaktır.', wrong: 'Hayır, bu ayakkabı mattır.' }
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
            tr: { question: 'Hangi ayakkabı mat?', correct: 'Evet! Ayakkabı mattır.', wrong: 'Hayır, bu ayakkabı parlaktır.' }
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
            tr: { question: 'Hangi balon parlak?', correct: 'Evet! Balon parlaktır.', wrong: 'Hayır, bu balon mattır.' }
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
            tr: { question: 'Hangi balon mat?', correct: 'Evet! Balon mattır.', wrong: 'Hayır, bu balon parlaktır.' }
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
            tr: { question: 'Hangi elma parlak?', correct: 'Evet! Elma parlaktır.', wrong: 'Hayır, bu elma mattır.' }
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
            tr: { question: 'Hangi elma mat?', correct: 'Evet! Elma mattır.', wrong: 'Hayır, bu elma parlaktır.' }
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
            tr: { question: 'Hangi kaşık parlak?', correct: 'Evet! Kaşık parlaktır.', wrong: 'Hayır, bu kaşık mattır.' }
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
            tr: { question: 'Hangi kaşık mat?', correct: 'Evet! Kaşık mattır.', wrong: 'Hayır, bu kaşık parlaktır.' }
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
            tr: { question: 'Hangi kupa parlak?', correct: 'Evet! Kupa parlaktır.', wrong: 'Hayır, bu kupa mattır.' }
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
            tr: { question: 'Hangi kupa mat?', correct: 'Evet! Kupa mattır.', wrong: 'Hayır, bu kupa parlaktır.' }
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
            tr: { question: 'Hangi saksı parlak?', correct: 'Evet! Saksı parlaktır.', wrong: 'Hayır, bu saksı mattır.' }
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
            tr: { question: 'Hangi saksı mat?', correct: 'Evet! Saksı mattır.', wrong: 'Hayır, bu saksı parlaktır.' }
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
            tr: { question: 'Hangi tencere parlak?', correct: 'Evet! Tencere parlaktır.', wrong: 'Hayır, bu tencere mattır.' }
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
            tr: { question: 'Hangi tencere mat?', correct: 'Evet! Tencere mattır.', wrong: 'Hayır, bu tencere parlaktır.' }
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
            tr: { question: 'Hangi top parlak?', correct: 'Evet! Top parlaktır.', wrong: 'Hayır, bu top mattır.' }
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
            tr: { question: 'Hangi top mat?', correct: 'Evet! Top mattır.', wrong: 'Hayır, bu top parlaktır.' }
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
            tr: { question: 'Hangi vazo parlak?', correct: 'Evet! Vazo parlaktır.', wrong: 'Hayır, bu vazo mattır.' }
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
            tr: { question: 'Hangi vazo mat?', correct: 'Evet! Vazo mattır.', wrong: 'Hayır, bu vazo parlaktır.' }
        },
        options: [
            { id: 3917, word: "vazo", imageUrl: "/images/3917.webp", isCorrect: true, audioKey: "vazo", spokenText: "vazo" },
            { id: 3918, word: "vazo", imageUrl: "/images/3918.webp", isCorrect: false, audioKey: "vazo", spokenText: "vazo" }
        ]
    },
];
