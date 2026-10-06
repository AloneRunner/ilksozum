// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (sag-sol). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/sag-sol/ → id 5201-5220.
import { ConceptRound, ActivityType } from '../../../../types';

export const leftRightDataYeni: ConceptRound[] = [
    // at
    {
        id: 1001,
        question: "Hangi at sağa bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi at sağa bakıyor?', correct: 'Evet! Bu at sağa bakıyor.', wrong: 'Hayır, bu at sola bakıyor.' }
        },
        options: [
            { id: 5201, word: "at", imageUrl: "/images/5201.webp", isCorrect: true, audioKey: "at", spokenText: "at" },
            { id: 5202, word: "at", imageUrl: "/images/5202.webp", isCorrect: false, audioKey: "at", spokenText: "at" }
        ]
    },
    {
        id: 1002,
        question: "Hangi at sola bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi at sola bakıyor?', correct: 'Evet! Bu at sola bakıyor.', wrong: 'Hayır, bu at sağa bakıyor.' }
        },
        options: [
            { id: 5202, word: "at", imageUrl: "/images/5202.webp", isCorrect: true, audioKey: "at", spokenText: "at" },
            { id: 5201, word: "at", imageUrl: "/images/5201.webp", isCorrect: false, audioKey: "at", spokenText: "at" }
        ]
    },
    // ayakkabı
    {
        id: 1003,
        question: "Hangi ayakkabı sağa bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi ayakkabı sağa bakıyor?', correct: 'Evet! Bu ayakkabı sağa bakıyor.', wrong: 'Hayır, bu ayakkabı sola bakıyor.' }
        },
        options: [
            { id: 5203, word: "ayakkabı", imageUrl: "/images/5203.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 5204, word: "ayakkabı", imageUrl: "/images/5204.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    {
        id: 1004,
        question: "Hangi ayakkabı sola bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi ayakkabı sola bakıyor?', correct: 'Evet! Bu ayakkabı sola bakıyor.', wrong: 'Hayır, bu ayakkabı sağa bakıyor.' }
        },
        options: [
            { id: 5204, word: "ayakkabı", imageUrl: "/images/5204.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 5203, word: "ayakkabı", imageUrl: "/images/5203.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    // balık
    {
        id: 1005,
        question: "Hangi balık sağa bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi balık sağa bakıyor?', correct: 'Evet! Bu balık sağa bakıyor.', wrong: 'Hayır, bu balık sola bakıyor.' }
        },
        options: [
            { id: 5205, word: "balık", imageUrl: "/images/5205.webp", isCorrect: true, audioKey: "balık", spokenText: "balık" },
            { id: 5206, word: "balık", imageUrl: "/images/5206.webp", isCorrect: false, audioKey: "balık", spokenText: "balık" }
        ]
    },
    {
        id: 1006,
        question: "Hangi balık sola bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi balık sola bakıyor?', correct: 'Evet! Bu balık sola bakıyor.', wrong: 'Hayır, bu balık sağa bakıyor.' }
        },
        options: [
            { id: 5206, word: "balık", imageUrl: "/images/5206.webp", isCorrect: true, audioKey: "balık", spokenText: "balık" },
            { id: 5205, word: "balık", imageUrl: "/images/5205.webp", isCorrect: false, audioKey: "balık", spokenText: "balık" }
        ]
    },
    // bisiklet
    {
        id: 1007,
        question: "Hangi bisiklet sağa bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi bisiklet sağa bakıyor?', correct: 'Evet! Bu bisiklet sağa bakıyor.', wrong: 'Hayır, bu bisiklet sola bakıyor.' }
        },
        options: [
            { id: 5207, word: "bisiklet", imageUrl: "/images/5207.webp", isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" },
            { id: 5208, word: "bisiklet", imageUrl: "/images/5208.webp", isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    {
        id: 1008,
        question: "Hangi bisiklet sola bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi bisiklet sola bakıyor?', correct: 'Evet! Bu bisiklet sola bakıyor.', wrong: 'Hayır, bu bisiklet sağa bakıyor.' }
        },
        options: [
            { id: 5208, word: "bisiklet", imageUrl: "/images/5208.webp", isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" },
            { id: 5207, word: "bisiklet", imageUrl: "/images/5207.webp", isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    // çaydanlık
    {
        id: 1009,
        question: "Hangi çaydanlık sağa bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi çaydanlık sağa bakıyor?', correct: 'Evet! Bu çaydanlık sağa bakıyor.', wrong: 'Hayır, bu çaydanlık sola bakıyor.' }
        },
        options: [
            { id: 5209, word: "çaydanlık", imageUrl: "/images/5209.webp", isCorrect: true, audioKey: "çaydanlık", spokenText: "çaydanlık" },
            { id: 5210, word: "çaydanlık", imageUrl: "/images/5210.webp", isCorrect: false, audioKey: "çaydanlık", spokenText: "çaydanlık" }
        ]
    },
    {
        id: 1010,
        question: "Hangi çaydanlık sola bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi çaydanlık sola bakıyor?', correct: 'Evet! Bu çaydanlık sola bakıyor.', wrong: 'Hayır, bu çaydanlık sağa bakıyor.' }
        },
        options: [
            { id: 5210, word: "çaydanlık", imageUrl: "/images/5210.webp", isCorrect: true, audioKey: "çaydanlık", spokenText: "çaydanlık" },
            { id: 5209, word: "çaydanlık", imageUrl: "/images/5209.webp", isCorrect: false, audioKey: "çaydanlık", spokenText: "çaydanlık" }
        ]
    },
    // horoz
    {
        id: 1011,
        question: "Hangi horoz sağa bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi horoz sağa bakıyor?', correct: 'Evet! Bu horoz sağa bakıyor.', wrong: 'Hayır, bu horoz sola bakıyor.' }
        },
        options: [
            { id: 5211, word: "horoz", imageUrl: "/images/5211.webp", isCorrect: true, audioKey: "horoz", spokenText: "horoz" },
            { id: 5212, word: "horoz", imageUrl: "/images/5212.webp", isCorrect: false, audioKey: "horoz", spokenText: "horoz" }
        ]
    },
    {
        id: 1012,
        question: "Hangi horoz sola bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi horoz sola bakıyor?', correct: 'Evet! Bu horoz sola bakıyor.', wrong: 'Hayır, bu horoz sağa bakıyor.' }
        },
        options: [
            { id: 5212, word: "horoz", imageUrl: "/images/5212.webp", isCorrect: true, audioKey: "horoz", spokenText: "horoz" },
            { id: 5211, word: "horoz", imageUrl: "/images/5211.webp", isCorrect: false, audioKey: "horoz", spokenText: "horoz" }
        ]
    },
    // inek
    {
        id: 1013,
        question: "Hangi inek sağa bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi inek sağa bakıyor?', correct: 'Evet! Bu inek sağa bakıyor.', wrong: 'Hayır, bu inek sola bakıyor.' }
        },
        options: [
            { id: 5213, word: "inek", imageUrl: "/images/5213.webp", isCorrect: true, audioKey: "inek", spokenText: "inek" },
            { id: 5214, word: "inek", imageUrl: "/images/5214.webp", isCorrect: false, audioKey: "inek", spokenText: "inek" }
        ]
    },
    {
        id: 1014,
        question: "Hangi inek sola bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi inek sola bakıyor?', correct: 'Evet! Bu inek sola bakıyor.', wrong: 'Hayır, bu inek sağa bakıyor.' }
        },
        options: [
            { id: 5214, word: "inek", imageUrl: "/images/5214.webp", isCorrect: true, audioKey: "inek", spokenText: "inek" },
            { id: 5213, word: "inek", imageUrl: "/images/5213.webp", isCorrect: false, audioKey: "inek", spokenText: "inek" }
        ]
    },
    // kaplumbağa
    {
        id: 1015,
        question: "Hangi kaplumbağa sağa bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi kaplumbağa sağa bakıyor?', correct: 'Evet! Bu kaplumbağa sağa bakıyor.', wrong: 'Hayır, bu kaplumbağa sola bakıyor.' }
        },
        options: [
            { id: 5215, word: "kaplumbağa", imageUrl: "/images/5215.webp", isCorrect: true, audioKey: "kaplumbağa", spokenText: "kaplumbağa" },
            { id: 5216, word: "kaplumbağa", imageUrl: "/images/5216.webp", isCorrect: false, audioKey: "kaplumbağa", spokenText: "kaplumbağa" }
        ]
    },
    {
        id: 1016,
        question: "Hangi kaplumbağa sola bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi kaplumbağa sola bakıyor?', correct: 'Evet! Bu kaplumbağa sola bakıyor.', wrong: 'Hayır, bu kaplumbağa sağa bakıyor.' }
        },
        options: [
            { id: 5216, word: "kaplumbağa", imageUrl: "/images/5216.webp", isCorrect: true, audioKey: "kaplumbağa", spokenText: "kaplumbağa" },
            { id: 5215, word: "kaplumbağa", imageUrl: "/images/5215.webp", isCorrect: false, audioKey: "kaplumbağa", spokenText: "kaplumbağa" }
        ]
    },
    // kirpi
    {
        id: 1017,
        question: "Hangi kirpi sağa bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi kirpi sağa bakıyor?', correct: 'Evet! Bu kirpi sağa bakıyor.', wrong: 'Hayır, bu kirpi sola bakıyor.' }
        },
        options: [
            { id: 5217, word: "kirpi", imageUrl: "/images/5217.webp", isCorrect: true, audioKey: "kirpi", spokenText: "kirpi" },
            { id: 5218, word: "kirpi", imageUrl: "/images/5218.webp", isCorrect: false, audioKey: "kirpi", spokenText: "kirpi" }
        ]
    },
    {
        id: 1018,
        question: "Hangi kirpi sola bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi kirpi sola bakıyor?', correct: 'Evet! Bu kirpi sola bakıyor.', wrong: 'Hayır, bu kirpi sağa bakıyor.' }
        },
        options: [
            { id: 5218, word: "kirpi", imageUrl: "/images/5218.webp", isCorrect: true, audioKey: "kirpi", spokenText: "kirpi" },
            { id: 5217, word: "kirpi", imageUrl: "/images/5217.webp", isCorrect: false, audioKey: "kirpi", spokenText: "kirpi" }
        ]
    },
    // spor ayakkabı
    {
        id: 1019,
        question: "Hangi spor ayakkabı sağa bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi spor ayakkabı sağa bakıyor?', correct: 'Evet! Bu spor ayakkabı sağa bakıyor.', wrong: 'Hayır, bu spor ayakkabı sola bakıyor.' }
        },
        options: [
            { id: 5219, word: "spor ayakkabı", imageUrl: "/images/5219.webp", isCorrect: true, audioKey: "spor ayakkabı", spokenText: "spor ayakkabı" },
            { id: 5220, word: "spor ayakkabı", imageUrl: "/images/5220.webp", isCorrect: false, audioKey: "spor ayakkabı", spokenText: "spor ayakkabı" }
        ]
    },
    {
        id: 1020,
        question: "Hangi spor ayakkabı sola bakıyor?",
        questionAudioKey: "",
        activityType: ActivityType.LeftRight,
        speech: {
            tr: { question: 'Hangi spor ayakkabı sola bakıyor?', correct: 'Evet! Bu spor ayakkabı sola bakıyor.', wrong: 'Hayır, bu spor ayakkabı sağa bakıyor.' }
        },
        options: [
            { id: 5220, word: "spor ayakkabı", imageUrl: "/images/5220.webp", isCorrect: true, audioKey: "spor ayakkabı", spokenText: "spor ayakkabı" },
            { id: 5219, word: "spor ayakkabı", imageUrl: "/images/5219.webp", isCorrect: false, audioKey: "spor ayakkabı", spokenText: "spor ayakkabı" }
        ]
    },
];
