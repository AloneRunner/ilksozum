// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (kalabalik-tenha). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/kalabalik-tenha/ → id 4601-4620.
import { ConceptRound, ActivityType } from '../../../../types';

export const kalabalikTenhaDataYeni: ConceptRound[] = [
    // havuz
    {
        id: 1,
        question: "Hangi havuz kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi havuz kalabalık?', correct: 'Evet! Bu havuz kalabalık.', wrong: 'Hayır, bu havuz tenha.' }
        },
        options: [
            { id: 4601, word: "havuz", imageUrl: "/images/4601.webp", isCorrect: true, audioKey: "havuz", spokenText: "havuz" },
            { id: 4602, word: "havuz", imageUrl: "/images/4602.webp", isCorrect: false, audioKey: "havuz", spokenText: "havuz" }
        ]
    },
    {
        id: 2,
        question: "Hangi havuz tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi havuz tenha?', correct: 'Evet! Bu havuz tenha.', wrong: 'Hayır, bu havuz kalabalık.' }
        },
        options: [
            { id: 4602, word: "havuz", imageUrl: "/images/4602.webp", isCorrect: true, audioKey: "havuz", spokenText: "havuz" },
            { id: 4601, word: "havuz", imageUrl: "/images/4601.webp", isCorrect: false, audioKey: "havuz", spokenText: "havuz" }
        ]
    },
    // lunapark
    {
        id: 3,
        question: "Hangi lunapark kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi lunapark kalabalık?', correct: 'Evet! Bu lunapark kalabalık.', wrong: 'Hayır, bu lunapark tenha.' }
        },
        options: [
            { id: 4603, word: "lunapark", imageUrl: "/images/4603.webp", isCorrect: true, audioKey: "lunapark", spokenText: "lunapark" },
            { id: 4604, word: "lunapark", imageUrl: "/images/4604.webp", isCorrect: false, audioKey: "lunapark", spokenText: "lunapark" }
        ]
    },
    {
        id: 4,
        question: "Hangi lunapark tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi lunapark tenha?', correct: 'Evet! Bu lunapark tenha.', wrong: 'Hayır, bu lunapark kalabalık.' }
        },
        options: [
            { id: 4604, word: "lunapark", imageUrl: "/images/4604.webp", isCorrect: true, audioKey: "lunapark", spokenText: "lunapark" },
            { id: 4603, word: "lunapark", imageUrl: "/images/4603.webp", isCorrect: false, audioKey: "lunapark", spokenText: "lunapark" }
        ]
    },
    // market
    {
        id: 5,
        question: "Hangi market kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi market kalabalık?', correct: 'Evet! Bu market kalabalık.', wrong: 'Hayır, bu market tenha.' }
        },
        options: [
            { id: 4605, word: "market", imageUrl: "/images/4605.webp", isCorrect: true, audioKey: "market", spokenText: "market" },
            { id: 4606, word: "market", imageUrl: "/images/4606.webp", isCorrect: false, audioKey: "market", spokenText: "market" }
        ]
    },
    {
        id: 6,
        question: "Hangi market tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi market tenha?', correct: 'Evet! Bu market tenha.', wrong: 'Hayır, bu market kalabalık.' }
        },
        options: [
            { id: 4606, word: "market", imageUrl: "/images/4606.webp", isCorrect: true, audioKey: "market", spokenText: "market" },
            { id: 4605, word: "market", imageUrl: "/images/4605.webp", isCorrect: false, audioKey: "market", spokenText: "market" }
        ]
    },
    // otobüs
    {
        id: 7,
        question: "Hangi otobüs kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi otobüs kalabalık?', correct: 'Evet! Bu otobüs kalabalık.', wrong: 'Hayır, bu otobüs tenha.' }
        },
        options: [
            { id: 4607, word: "otobüs", imageUrl: "/images/4607.webp", isCorrect: true, audioKey: "otobüs", spokenText: "otobüs" },
            { id: 4608, word: "otobüs", imageUrl: "/images/4608.webp", isCorrect: false, audioKey: "otobüs", spokenText: "otobüs" }
        ]
    },
    {
        id: 8,
        question: "Hangi otobüs tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi otobüs tenha?', correct: 'Evet! Bu otobüs tenha.', wrong: 'Hayır, bu otobüs kalabalık.' }
        },
        options: [
            { id: 4608, word: "otobüs", imageUrl: "/images/4608.webp", isCorrect: true, audioKey: "otobüs", spokenText: "otobüs" },
            { id: 4607, word: "otobüs", imageUrl: "/images/4607.webp", isCorrect: false, audioKey: "otobüs", spokenText: "otobüs" }
        ]
    },
    // oyun parkı
    {
        id: 9,
        question: "Hangi oyun parkı kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi oyun parkı kalabalık?', correct: 'Evet! Bu oyun parkı kalabalık.', wrong: 'Hayır, bu oyun parkı tenha.' }
        },
        options: [
            { id: 4609, word: "oyun parkı", imageUrl: "/images/4609.webp", isCorrect: true, audioKey: "oyun parkı", spokenText: "oyun parkı" },
            { id: 4610, word: "oyun parkı", imageUrl: "/images/4610.webp", isCorrect: false, audioKey: "oyun parkı", spokenText: "oyun parkı" }
        ]
    },
    {
        id: 10,
        question: "Hangi oyun parkı tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi oyun parkı tenha?', correct: 'Evet! Bu oyun parkı tenha.', wrong: 'Hayır, bu oyun parkı kalabalık.' }
        },
        options: [
            { id: 4610, word: "oyun parkı", imageUrl: "/images/4610.webp", isCorrect: true, audioKey: "oyun parkı", spokenText: "oyun parkı" },
            { id: 4609, word: "oyun parkı", imageUrl: "/images/4609.webp", isCorrect: false, audioKey: "oyun parkı", spokenText: "oyun parkı" }
        ]
    },
    // park
    {
        id: 11,
        question: "Hangi park kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi park kalabalık?', correct: 'Evet! Bu park kalabalık.', wrong: 'Hayır, bu park tenha.' }
        },
        options: [
            { id: 4611, word: "park", imageUrl: "/images/4611.webp", isCorrect: true, audioKey: "park", spokenText: "park" },
            { id: 4612, word: "park", imageUrl: "/images/4612.webp", isCorrect: false, audioKey: "park", spokenText: "park" }
        ]
    },
    {
        id: 12,
        question: "Hangi park tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi park tenha?', correct: 'Evet! Bu park tenha.', wrong: 'Hayır, bu park kalabalık.' }
        },
        options: [
            { id: 4612, word: "park", imageUrl: "/images/4612.webp", isCorrect: true, audioKey: "park", spokenText: "park" },
            { id: 4611, word: "park", imageUrl: "/images/4611.webp", isCorrect: false, audioKey: "park", spokenText: "park" }
        ]
    },
    // tren peronu
    {
        id: 13,
        question: "Hangi tren peronu kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi tren peronu kalabalık?', correct: 'Evet! Bu tren peronu kalabalık.', wrong: 'Hayır, bu tren peronu tenha.' }
        },
        options: [
            { id: 4613, word: "tren peronu", imageUrl: "/images/4613.webp", isCorrect: true, audioKey: "tren peronu", spokenText: "tren peronu" },
            { id: 4614, word: "tren peronu", imageUrl: "/images/4614.webp", isCorrect: false, audioKey: "tren peronu", spokenText: "tren peronu" }
        ]
    },
    {
        id: 14,
        question: "Hangi tren peronu tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi tren peronu tenha?', correct: 'Evet! Bu tren peronu tenha.', wrong: 'Hayır, bu tren peronu kalabalık.' }
        },
        options: [
            { id: 4614, word: "tren peronu", imageUrl: "/images/4614.webp", isCorrect: true, audioKey: "tren peronu", spokenText: "tren peronu" },
            { id: 4613, word: "tren peronu", imageUrl: "/images/4613.webp", isCorrect: false, audioKey: "tren peronu", spokenText: "tren peronu" }
        ]
    },
    // plaj
    {
        id: 15,
        question: "Hangi plaj kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi plaj kalabalık?', correct: 'Evet! Bu plaj kalabalık.', wrong: 'Hayır, bu plaj tenha.' }
        },
        options: [
            { id: 4615, word: "plaj", imageUrl: "/images/4615.webp", isCorrect: true, audioKey: "plaj", spokenText: "plaj" },
            { id: 4616, word: "plaj", imageUrl: "/images/4616.webp", isCorrect: false, audioKey: "plaj", spokenText: "plaj" }
        ]
    },
    {
        id: 16,
        question: "Hangi plaj tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi plaj tenha?', correct: 'Evet! Bu plaj tenha.', wrong: 'Hayır, bu plaj kalabalık.' }
        },
        options: [
            { id: 4616, word: "plaj", imageUrl: "/images/4616.webp", isCorrect: true, audioKey: "plaj", spokenText: "plaj" },
            { id: 4615, word: "plaj", imageUrl: "/images/4615.webp", isCorrect: false, audioKey: "plaj", spokenText: "plaj" }
        ]
    },
    // sinema salonu
    {
        id: 17,
        question: "Hangi sinema salonu kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi sinema salonu kalabalık?', correct: 'Evet! Bu sinema salonu kalabalık.', wrong: 'Hayır, bu sinema salonu tenha.' }
        },
        options: [
            { id: 4617, word: "sinema salonu", imageUrl: "/images/4617.webp", isCorrect: true, audioKey: "sinema salonu", spokenText: "sinema salonu" },
            { id: 4618, word: "sinema salonu", imageUrl: "/images/4618.webp", isCorrect: false, audioKey: "sinema salonu", spokenText: "sinema salonu" }
        ]
    },
    {
        id: 18,
        question: "Hangi sinema salonu tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi sinema salonu tenha?', correct: 'Evet! Bu sinema salonu tenha.', wrong: 'Hayır, bu sinema salonu kalabalık.' }
        },
        options: [
            { id: 4618, word: "sinema salonu", imageUrl: "/images/4618.webp", isCorrect: true, audioKey: "sinema salonu", spokenText: "sinema salonu" },
            { id: 4617, word: "sinema salonu", imageUrl: "/images/4617.webp", isCorrect: false, audioKey: "sinema salonu", spokenText: "sinema salonu" }
        ]
    },
    // sokak
    {
        id: 19,
        question: "Hangi sokak kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi sokak kalabalık?', correct: 'Evet! Bu sokak kalabalık.', wrong: 'Hayır, bu sokak tenha.' }
        },
        options: [
            { id: 4619, word: "sokak", imageUrl: "/images/4619.webp", isCorrect: true, audioKey: "sokak", spokenText: "sokak" },
            { id: 4620, word: "sokak", imageUrl: "/images/4620.webp", isCorrect: false, audioKey: "sokak", spokenText: "sokak" }
        ]
    },
    {
        id: 20,
        question: "Hangi sokak tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi sokak tenha?', correct: 'Evet! Bu sokak tenha.', wrong: 'Hayır, bu sokak kalabalık.' }
        },
        options: [
            { id: 4620, word: "sokak", imageUrl: "/images/4620.webp", isCorrect: true, audioKey: "sokak", spokenText: "sokak" },
            { id: 4619, word: "sokak", imageUrl: "/images/4619.webp", isCorrect: false, audioKey: "sokak", spokenText: "sokak" }
        ]
    },
];
