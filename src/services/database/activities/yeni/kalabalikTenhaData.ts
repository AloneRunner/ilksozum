// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (kalabalik-tenha). Elle düzenleme.
// 6 çift, 12 soru. Görseller: gorsel-ham/kalabalik-tenha/ → id 4601-4612.
import { ConceptRound, ActivityType } from '../../../../types';

export const kalabalikTenhaDataYeni: ConceptRound[] = [
    // market
    {
        id: 1,
        question: "Hangi market kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi market kalabalık?', correct: 'Evet! Market kalabalıktır.', wrong: 'Hayır, bu market tenhadır.' }
        },
        options: [
            { id: 4601, word: "market", imageUrl: "/images/4601.webp", isCorrect: true, audioKey: "market", spokenText: "market" },
            { id: 4602, word: "market", imageUrl: "/images/4602.webp", isCorrect: false, audioKey: "market", spokenText: "market" }
        ]
    },
    {
        id: 2,
        question: "Hangi market tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi market tenha?', correct: 'Evet! Market tenhadır.', wrong: 'Hayır, bu market kalabalıktır.' }
        },
        options: [
            { id: 4602, word: "market", imageUrl: "/images/4602.webp", isCorrect: true, audioKey: "market", spokenText: "market" },
            { id: 4601, word: "market", imageUrl: "/images/4601.webp", isCorrect: false, audioKey: "market", spokenText: "market" }
        ]
    },
    // otobüs
    {
        id: 3,
        question: "Hangi otobüs kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi otobüs kalabalık?', correct: 'Evet! Otobüs kalabalıktır.', wrong: 'Hayır, bu otobüs tenhadır.' }
        },
        options: [
            { id: 4603, word: "otobüs", imageUrl: "/images/4603.webp", isCorrect: true, audioKey: "otobüs", spokenText: "otobüs" },
            { id: 4604, word: "otobüs", imageUrl: "/images/4604.webp", isCorrect: false, audioKey: "otobüs", spokenText: "otobüs" }
        ]
    },
    {
        id: 4,
        question: "Hangi otobüs tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi otobüs tenha?', correct: 'Evet! Otobüs tenhadır.', wrong: 'Hayır, bu otobüs kalabalıktır.' }
        },
        options: [
            { id: 4604, word: "otobüs", imageUrl: "/images/4604.webp", isCorrect: true, audioKey: "otobüs", spokenText: "otobüs" },
            { id: 4603, word: "otobüs", imageUrl: "/images/4603.webp", isCorrect: false, audioKey: "otobüs", spokenText: "otobüs" }
        ]
    },
    // oyun parkı
    {
        id: 5,
        question: "Hangi oyun parkı kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi oyun parkı kalabalık?', correct: 'Evet! Oyun parkı kalabalıktır.', wrong: 'Hayır, bu oyun parkı tenhadır.' }
        },
        options: [
            { id: 4605, word: "oyun parkı", imageUrl: "/images/4605.webp", isCorrect: true, audioKey: "oyun parkı", spokenText: "oyun parkı" },
            { id: 4606, word: "oyun parkı", imageUrl: "/images/4606.webp", isCorrect: false, audioKey: "oyun parkı", spokenText: "oyun parkı" }
        ]
    },
    {
        id: 6,
        question: "Hangi oyun parkı tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi oyun parkı tenha?', correct: 'Evet! Oyun parkı tenhadır.', wrong: 'Hayır, bu oyun parkı kalabalıktır.' }
        },
        options: [
            { id: 4606, word: "oyun parkı", imageUrl: "/images/4606.webp", isCorrect: true, audioKey: "oyun parkı", spokenText: "oyun parkı" },
            { id: 4605, word: "oyun parkı", imageUrl: "/images/4605.webp", isCorrect: false, audioKey: "oyun parkı", spokenText: "oyun parkı" }
        ]
    },
    // park
    {
        id: 7,
        question: "Hangi park kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi park kalabalık?', correct: 'Evet! Park kalabalıktır.', wrong: 'Hayır, bu park tenhadır.' }
        },
        options: [
            { id: 4607, word: "park", imageUrl: "/images/4607.webp", isCorrect: true, audioKey: "park", spokenText: "park" },
            { id: 4608, word: "park", imageUrl: "/images/4608.webp", isCorrect: false, audioKey: "park", spokenText: "park" }
        ]
    },
    {
        id: 8,
        question: "Hangi park tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi park tenha?', correct: 'Evet! Park tenhadır.', wrong: 'Hayır, bu park kalabalıktır.' }
        },
        options: [
            { id: 4608, word: "park", imageUrl: "/images/4608.webp", isCorrect: true, audioKey: "park", spokenText: "park" },
            { id: 4607, word: "park", imageUrl: "/images/4607.webp", isCorrect: false, audioKey: "park", spokenText: "park" }
        ]
    },
    // plaj
    {
        id: 9,
        question: "Hangi plaj kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi plaj kalabalık?', correct: 'Evet! Plaj kalabalıktır.', wrong: 'Hayır, bu plaj tenhadır.' }
        },
        options: [
            { id: 4609, word: "plaj", imageUrl: "/images/4609.webp", isCorrect: true, audioKey: "plaj", spokenText: "plaj" },
            { id: 4610, word: "plaj", imageUrl: "/images/4610.webp", isCorrect: false, audioKey: "plaj", spokenText: "plaj" }
        ]
    },
    {
        id: 10,
        question: "Hangi plaj tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi plaj tenha?', correct: 'Evet! Plaj tenhadır.', wrong: 'Hayır, bu plaj kalabalıktır.' }
        },
        options: [
            { id: 4610, word: "plaj", imageUrl: "/images/4610.webp", isCorrect: true, audioKey: "plaj", spokenText: "plaj" },
            { id: 4609, word: "plaj", imageUrl: "/images/4609.webp", isCorrect: false, audioKey: "plaj", spokenText: "plaj" }
        ]
    },
    // sokak
    {
        id: 11,
        question: "Hangi sokak kalabalık?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi sokak kalabalık?', correct: 'Evet! Sokak kalabalıktır.', wrong: 'Hayır, bu sokak tenhadır.' }
        },
        options: [
            { id: 4611, word: "sokak", imageUrl: "/images/4611.webp", isCorrect: true, audioKey: "sokak", spokenText: "sokak" },
            { id: 4612, word: "sokak", imageUrl: "/images/4612.webp", isCorrect: false, audioKey: "sokak", spokenText: "sokak" }
        ]
    },
    {
        id: 12,
        question: "Hangi sokak tenha?",
        questionAudioKey: "",
        activityType: ActivityType.KalabalikTenha,
        speech: {
            tr: { question: 'Hangi sokak tenha?', correct: 'Evet! Sokak tenhadır.', wrong: 'Hayır, bu sokak kalabalıktır.' }
        },
        options: [
            { id: 4612, word: "sokak", imageUrl: "/images/4612.webp", isCorrect: true, audioKey: "sokak", spokenText: "sokak" },
            { id: 4611, word: "sokak", imageUrl: "/images/4611.webp", isCorrect: false, audioKey: "sokak", spokenText: "sokak" }
        ]
    },
];
