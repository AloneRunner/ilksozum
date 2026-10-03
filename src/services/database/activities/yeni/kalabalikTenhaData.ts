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
            tr: { question: 'Hangi havuz kalabalık?', correct: 'Evet! Havuz kalabalıktır.', wrong: 'Hayır, bu havuz tenhadır.' }
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
            tr: { question: 'Hangi havuz tenha?', correct: 'Evet! Havuz tenhadır.', wrong: 'Hayır, bu havuz kalabalıktır.' }
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
            tr: { question: 'Hangi lunapark kalabalık?', correct: 'Evet! Lunapark kalabalıktır.', wrong: 'Hayır, bu lunapark tenhadır.' }
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
            tr: { question: 'Hangi lunapark tenha?', correct: 'Evet! Lunapark tenhadır.', wrong: 'Hayır, bu lunapark kalabalıktır.' }
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
            tr: { question: 'Hangi market kalabalık?', correct: 'Evet! Market kalabalıktır.', wrong: 'Hayır, bu market tenhadır.' }
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
            tr: { question: 'Hangi market tenha?', correct: 'Evet! Market tenhadır.', wrong: 'Hayır, bu market kalabalıktır.' }
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
            tr: { question: 'Hangi otobüs kalabalık?', correct: 'Evet! Otobüs kalabalıktır.', wrong: 'Hayır, bu otobüs tenhadır.' }
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
            tr: { question: 'Hangi otobüs tenha?', correct: 'Evet! Otobüs tenhadır.', wrong: 'Hayır, bu otobüs kalabalıktır.' }
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
            tr: { question: 'Hangi oyun parkı kalabalık?', correct: 'Evet! Oyun parkı kalabalıktır.', wrong: 'Hayır, bu oyun parkı tenhadır.' }
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
            tr: { question: 'Hangi oyun parkı tenha?', correct: 'Evet! Oyun parkı tenhadır.', wrong: 'Hayır, bu oyun parkı kalabalıktır.' }
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
            tr: { question: 'Hangi park kalabalık?', correct: 'Evet! Park kalabalıktır.', wrong: 'Hayır, bu park tenhadır.' }
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
            tr: { question: 'Hangi park tenha?', correct: 'Evet! Park tenhadır.', wrong: 'Hayır, bu park kalabalıktır.' }
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
            tr: { question: 'Hangi tren peronu kalabalık?', correct: 'Evet! Tren peronu kalabalıktır.', wrong: 'Hayır, bu tren peronu tenhadır.' }
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
            tr: { question: 'Hangi tren peronu tenha?', correct: 'Evet! Tren peronu tenhadır.', wrong: 'Hayır, bu tren peronu kalabalıktır.' }
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
            tr: { question: 'Hangi plaj kalabalık?', correct: 'Evet! Plaj kalabalıktır.', wrong: 'Hayır, bu plaj tenhadır.' }
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
            tr: { question: 'Hangi plaj tenha?', correct: 'Evet! Plaj tenhadır.', wrong: 'Hayır, bu plaj kalabalıktır.' }
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
            tr: { question: 'Hangi sinema salonu kalabalık?', correct: 'Evet! Sinema salonu kalabalıktır.', wrong: 'Hayır, bu sinema salonu tenhadır.' }
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
            tr: { question: 'Hangi sinema salonu tenha?', correct: 'Evet! Sinema salonu tenhadır.', wrong: 'Hayır, bu sinema salonu kalabalıktır.' }
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
            tr: { question: 'Hangi sokak kalabalık?', correct: 'Evet! Sokak kalabalıktır.', wrong: 'Hayır, bu sokak tenhadır.' }
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
            tr: { question: 'Hangi sokak tenha?', correct: 'Evet! Sokak tenhadır.', wrong: 'Hayır, bu sokak kalabalıktır.' }
        },
        options: [
            { id: 4620, word: "sokak", imageUrl: "/images/4620.webp", isCorrect: true, audioKey: "sokak", spokenText: "sokak" },
            { id: 4619, word: "sokak", imageUrl: "/images/4619.webp", isCorrect: false, audioKey: "sokak", spokenText: "sokak" }
        ]
    },
];
