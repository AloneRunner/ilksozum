// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (puruzlu-puruzsuz). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/puruzlu-puruzsuz/ → id 3701-3714.
import { ConceptRound, ActivityType } from '../../../../types';

export const roughSmoothDataYeni: ConceptRound[] = [
    // ananas_mango
    {
        id: 1,
        question: "Pürüzlü olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzlü olan hangisi?', correct: 'Evet! Ananas pürüzlüdür.', wrong: 'Hayır, mango pürüzsüzdür.' }
        },
        options: [
            { id: 3701, word: "ananas", imageUrl: "/images/3701.webp", isCorrect: true, audioKey: "ananas", spokenText: "ananas" },
            { id: 3702, word: "mango", imageUrl: "/images/3702.webp", isCorrect: false, audioKey: "mango", spokenText: "mango" }
        ]
    },
    {
        id: 2,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Mango pürüzsüzdür.', wrong: 'Hayır, ananas pürüzlüdür.' }
        },
        options: [
            { id: 3702, word: "mango", imageUrl: "/images/3702.webp", isCorrect: true, audioKey: "mango", spokenText: "mango" },
            { id: 3701, word: "ananas", imageUrl: "/images/3701.webp", isCorrect: false, audioKey: "ananas", spokenText: "ananas" }
        ]
    },
    // kabuk_sise
    {
        id: 3,
        question: "Pürüzlü olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzlü olan hangisi?', correct: 'Evet! Ağaç kabuğu pürüzlüdür.', wrong: 'Hayır, cam şişe pürüzsüzdür.' }
        },
        options: [
            { id: 3703, word: "ağaç kabuğu", imageUrl: "/images/3703.webp", isCorrect: true, audioKey: "ağaç kabuğu", spokenText: "ağaç kabuğu" },
            { id: 3704, word: "cam şişe", imageUrl: "/images/3704.webp", isCorrect: false, audioKey: "cam şişe", spokenText: "cam şişe" }
        ]
    },
    {
        id: 4,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Cam şişe pürüzsüzdür.', wrong: 'Hayır, ağaç kabuğu pürüzlüdür.' }
        },
        options: [
            { id: 3704, word: "cam şişe", imageUrl: "/images/3704.webp", isCorrect: true, audioKey: "cam şişe", spokenText: "cam şişe" },
            { id: 3703, word: "ağaç kabuğu", imageUrl: "/images/3703.webp", isCorrect: false, audioKey: "ağaç kabuğu", spokenText: "ağaç kabuğu" }
        ]
    },
    // kavun_karpuz
    {
        id: 5,
        question: "Pürüzlü olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzlü olan hangisi?', correct: 'Evet! Kavun pürüzlüdür.', wrong: 'Hayır, karpuz pürüzsüzdür.' }
        },
        options: [
            { id: 3705, word: "kavun", imageUrl: "/images/3705.webp", isCorrect: true, audioKey: "kavun", spokenText: "kavun" },
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 6,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Karpuz pürüzsüzdür.', wrong: 'Hayır, kavun pürüzlüdür.' }
        },
        options: [
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 3705, word: "kavun", imageUrl: "/images/3705.webp", isCorrect: false, audioKey: "kavun", spokenText: "kavun" }
        ]
    },
    // portakal_elma
    {
        id: 7,
        question: "Pürüzlü olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzlü olan hangisi?', correct: 'Evet! Portakal pürüzlüdür.', wrong: 'Hayır, elma pürüzsüzdür.' }
        },
        options: [
            { id: 3706, word: "portakal", imageUrl: "/images/3706.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 8,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Elma pürüzsüzdür.', wrong: 'Hayır, portakal pürüzlüdür.' }
        },
        options: [
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 3706, word: "portakal", imageUrl: "/images/3706.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    // sungertasi_sabun
    {
        id: 9,
        question: "Pürüzlü olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzlü olan hangisi?', correct: 'Evet! Sünger taşı pürüzlüdür.', wrong: 'Hayır, sabun pürüzsüzdür.' }
        },
        options: [
            { id: 3707, word: "sünger taşı", imageUrl: "/images/3707.webp", isCorrect: true, audioKey: "sünger taşı", spokenText: "sünger taşı" },
            { id: 3708, word: "sabun", imageUrl: "/images/3708.webp", isCorrect: false, audioKey: "sabun", spokenText: "sabun" }
        ]
    },
    {
        id: 10,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Sabun pürüzsüzdür.', wrong: 'Hayır, sünger taşı pürüzlüdür.' }
        },
        options: [
            { id: 3708, word: "sabun", imageUrl: "/images/3708.webp", isCorrect: true, audioKey: "sabun", spokenText: "sabun" },
            { id: 3707, word: "sünger taşı", imageUrl: "/images/3707.webp", isCorrect: false, audioKey: "sünger taşı", spokenText: "sünger taşı" }
        ]
    },
    // tahta
    {
        id: 11,
        question: "Hangi tahta pürüzlü?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Hangi tahta pürüzlü?', correct: 'Evet! Bu tahta pürüzlü.', wrong: 'Hayır, bu tahta pürüzsüz.' }
        },
        options: [
            { id: 3709, word: "tahta", imageUrl: "/images/3709.webp", isCorrect: true, audioKey: "tahta", spokenText: "tahta" },
            { id: 3710, word: "tahta", imageUrl: "/images/3710.webp", isCorrect: false, audioKey: "tahta", spokenText: "tahta" }
        ]
    },
    {
        id: 12,
        question: "Hangi tahta pürüzsüz?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Hangi tahta pürüzsüz?', correct: 'Evet! Bu tahta pürüzsüz.', wrong: 'Hayır, bu tahta pürüzlü.' }
        },
        options: [
            { id: 3710, word: "tahta", imageUrl: "/images/3710.webp", isCorrect: true, audioKey: "tahta", spokenText: "tahta" },
            { id: 3709, word: "tahta", imageUrl: "/images/3709.webp", isCorrect: false, audioKey: "tahta", spokenText: "tahta" }
        ]
    },
    // tugla_fayans
    {
        id: 13,
        question: "Pürüzlü olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzlü olan hangisi?', correct: 'Evet! Tuğla pürüzlüdür.', wrong: 'Hayır, fayans pürüzsüzdür.' }
        },
        options: [
            { id: 3513, word: "tuğla", imageUrl: "/images/3513.webp", isCorrect: true, audioKey: "tuğla", spokenText: "tuğla" },
            { id: 3711, word: "fayans", imageUrl: "/images/3711.webp", isCorrect: false, audioKey: "fayans", spokenText: "fayans" }
        ]
    },
    {
        id: 14,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Fayans pürüzsüzdür.', wrong: 'Hayır, tuğla pürüzlüdür.' }
        },
        options: [
            { id: 3711, word: "fayans", imageUrl: "/images/3711.webp", isCorrect: true, audioKey: "fayans", spokenText: "fayans" },
            { id: 3513, word: "tuğla", imageUrl: "/images/3513.webp", isCorrect: false, audioKey: "tuğla", spokenText: "tuğla" }
        ]
    },
    // volkanik_dere
    {
        id: 15,
        question: "Pürüzlü olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzlü olan hangisi?', correct: 'Evet! Pürüzlü taş pürüzlüdür.', wrong: 'Hayır, dere taşı pürüzsüzdür.' }
        },
        options: [
            { id: 3712, word: "pürüzlü taş", imageUrl: "/images/3712.webp", isCorrect: true, audioKey: "pürüzlü taş", spokenText: "pürüzlü taş" },
            { id: 3512, word: "dere taşı", imageUrl: "/images/3512.webp", isCorrect: false, audioKey: "dere taşı", spokenText: "dere taşı" }
        ]
    },
    {
        id: 16,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Dere taşı pürüzsüzdür.', wrong: 'Hayır, pürüzlü taş pürüzlüdür.' }
        },
        options: [
            { id: 3512, word: "dere taşı", imageUrl: "/images/3512.webp", isCorrect: true, audioKey: "dere taşı", spokenText: "dere taşı" },
            { id: 3712, word: "pürüzlü taş", imageUrl: "/images/3712.webp", isCorrect: false, audioKey: "pürüzlü taş", spokenText: "pürüzlü taş" }
        ]
    },
    // zimpara_kagit
    {
        id: 17,
        question: "Pürüzlü olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzlü olan hangisi?', correct: 'Evet! Zımpara kâğıdı pürüzlüdür.', wrong: 'Hayır, kâğıt pürüzsüzdür.' }
        },
        options: [
            { id: 3713, word: "zımpara kâğıdı", imageUrl: "/images/3713.webp", isCorrect: true, audioKey: "zımpara kâğıdı", spokenText: "zımpara kâğıdı" },
            { id: 3714, word: "kâğıt", imageUrl: "/images/3714.webp", isCorrect: false, audioKey: "kâğıt", spokenText: "kâğıt" }
        ]
    },
    {
        id: 18,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Kâğıt pürüzsüzdür.', wrong: 'Hayır, zımpara kâğıdı pürüzlüdür.' }
        },
        options: [
            { id: 3714, word: "kâğıt", imageUrl: "/images/3714.webp", isCorrect: true, audioKey: "kâğıt", spokenText: "kâğıt" },
            { id: 3713, word: "zımpara kâğıdı", imageUrl: "/images/3713.webp", isCorrect: false, audioKey: "zımpara kâğıdı", spokenText: "zımpara kâğıdı" }
        ]
    },
    // ceviz_yumurta
    {
        id: 19,
        question: "Pürüzlü olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzlü olan hangisi?', correct: 'Evet! Ceviz pürüzlüdür.', wrong: 'Hayır, yumurta pürüzsüzdür.' }
        },
        options: [
            { id: 3507, word: "ceviz", imageUrl: "/images/3507.webp", isCorrect: true, audioKey: "ceviz", spokenText: "ceviz" },
            { id: 3120, word: "yumurta", imageUrl: "/images/3120.webp", isCorrect: false, audioKey: "yumurta", spokenText: "yumurta" }
        ]
    },
    {
        id: 20,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.RoughSmooth,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Yumurta pürüzsüzdür.', wrong: 'Hayır, ceviz pürüzlüdür.' }
        },
        options: [
            { id: 3120, word: "yumurta", imageUrl: "/images/3120.webp", isCorrect: true, audioKey: "yumurta", spokenText: "yumurta" },
            { id: 3507, word: "ceviz", imageUrl: "/images/3507.webp", isCorrect: false, audioKey: "ceviz", spokenText: "ceviz" }
        ]
    },
];
