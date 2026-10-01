// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (buyuk-kucuk). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/buyuk-kucuk/ → id 2301-2321.
import { ConceptRound, ActivityType } from '../../../../types';

export const bigSmallDataYeni: ConceptRound[] = [
    // ayakkabı
    {
        id: 1,
        question: "Büyük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Büyük olan hangisi?', correct: 'Evet! Ayakkabı büyüktür.', wrong: 'Hayır, bu ayakkabı küçüktür.' }
        },
        options: [
            { id: 2301, word: "ayakkabı", imageUrl: "/images/2301.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 2302, word: "ayakkabı", imageUrl: "/images/2302.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    {
        id: 2,
        question: "Küçük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Küçük olan hangisi?', correct: 'Evet! Ayakkabı küçüktür.', wrong: 'Hayır, bu ayakkabı büyüktür.' }
        },
        options: [
            { id: 2302, word: "ayakkabı", imageUrl: "/images/2302.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 2301, word: "ayakkabı", imageUrl: "/images/2301.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    // ayı
    {
        id: 3,
        question: "Büyük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Büyük olan hangisi?', correct: 'Evet! Ayı büyüktür.', wrong: 'Hayır, bu ayı küçüktür.' }
        },
        options: [
            { id: 2303, word: "ayı", imageUrl: "/images/2303.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2304, word: "ayı", imageUrl: "/images/2304.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 4,
        question: "Küçük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Küçük olan hangisi?', correct: 'Evet! Ayı küçüktür.', wrong: 'Hayır, bu ayı büyüktür.' }
        },
        options: [
            { id: 2304, word: "ayı", imageUrl: "/images/2304.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2303, word: "ayı", imageUrl: "/images/2303.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // balon
    {
        id: 5,
        question: "Büyük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Büyük olan hangisi?', correct: 'Evet! Balon büyüktür.', wrong: 'Hayır, bu balon küçüktür.' }
        },
        options: [
            { id: 2305, word: "balon", imageUrl: "/images/2305.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 2306, word: "balon", imageUrl: "/images/2306.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 6,
        question: "Küçük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Küçük olan hangisi?', correct: 'Evet! Balon küçüktür.', wrong: 'Hayır, bu balon büyüktür.' }
        },
        options: [
            { id: 2306, word: "balon", imageUrl: "/images/2306.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 2305, word: "balon", imageUrl: "/images/2305.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    // elma
    {
        id: 7,
        question: "Büyük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Büyük olan hangisi?', correct: 'Evet! Elma büyüktür.', wrong: 'Hayır, bu elma küçüktür.' }
        },
        options: [
            { id: 2307, word: "elma", imageUrl: "/images/2307.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2308, word: "elma", imageUrl: "/images/2308.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 8,
        question: "Küçük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Küçük olan hangisi?', correct: 'Evet! Elma küçüktür.', wrong: 'Hayır, bu elma büyüktür.' }
        },
        options: [
            { id: 2308, word: "elma", imageUrl: "/images/2308.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2307, word: "elma", imageUrl: "/images/2307.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // karpuz
    {
        id: 9,
        question: "Büyük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Büyük olan hangisi?', correct: 'Evet! Karpuz büyüktür.', wrong: 'Hayır, bu karpuz küçüktür.' }
        },
        options: [
            { id: 2309, word: "karpuz", imageUrl: "/images/2309.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2310, word: "karpuz", imageUrl: "/images/2310.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 10,
        question: "Küçük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Küçük olan hangisi?', correct: 'Evet! Karpuz küçüktür.', wrong: 'Hayır, bu karpuz büyüktür.' }
        },
        options: [
            { id: 2310, word: "karpuz", imageUrl: "/images/2310.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2309, word: "karpuz", imageUrl: "/images/2309.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    // kupa
    {
        id: 11,
        question: "Büyük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Büyük olan hangisi?', correct: 'Evet! Kupa büyüktür.', wrong: 'Hayır, bu kupa küçüktür.' }
        },
        options: [
            { id: 2311, word: "kupa", imageUrl: "/images/2311.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 2312, word: "kupa", imageUrl: "/images/2312.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 12,
        question: "Küçük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Küçük olan hangisi?', correct: 'Evet! Kupa küçüktür.', wrong: 'Hayır, bu kupa büyüktür.' }
        },
        options: [
            { id: 2312, word: "kupa", imageUrl: "/images/2312.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 2311, word: "kupa", imageUrl: "/images/2311.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    // kutu
    {
        id: 13,
        question: "Büyük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Büyük olan hangisi?', correct: 'Evet! Kutu büyüktür.', wrong: 'Hayır, bu kutu küçüktür.' }
        },
        options: [
            { id: 2313, word: "kutu", imageUrl: "/images/2313.webp", isCorrect: true, audioKey: "kutu", spokenText: "kutu" },
            { id: 2314, word: "kutu", imageUrl: "/images/2314.webp", isCorrect: false, audioKey: "kutu", spokenText: "kutu" }
        ]
    },
    {
        id: 14,
        question: "Küçük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Küçük olan hangisi?', correct: 'Evet! Kutu küçüktür.', wrong: 'Hayır, bu kutu büyüktür.' }
        },
        options: [
            { id: 2314, word: "kutu", imageUrl: "/images/2314.webp", isCorrect: true, audioKey: "kutu", spokenText: "kutu" },
            { id: 2313, word: "kutu", imageUrl: "/images/2313.webp", isCorrect: false, audioKey: "kutu", spokenText: "kutu" }
        ]
    },
    // tencere
    {
        id: 15,
        question: "Büyük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Büyük olan hangisi?', correct: 'Evet! Tencere büyüktür.', wrong: 'Hayır, bu tencere küçüktür.' }
        },
        options: [
            { id: 2315, word: "tencere", imageUrl: "/images/2315.webp", isCorrect: true, audioKey: "tencere", spokenText: "tencere" },
            { id: 2316, word: "tencere", imageUrl: "/images/2316.webp", isCorrect: false, audioKey: "tencere", spokenText: "tencere" }
        ]
    },
    {
        id: 16,
        question: "Küçük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Küçük olan hangisi?', correct: 'Evet! Tencere küçüktür.', wrong: 'Hayır, bu tencere büyüktür.' }
        },
        options: [
            { id: 2316, word: "tencere", imageUrl: "/images/2316.webp", isCorrect: true, audioKey: "tencere", spokenText: "tencere" },
            { id: 2315, word: "tencere", imageUrl: "/images/2315.webp", isCorrect: false, audioKey: "tencere", spokenText: "tencere" }
        ]
    },
    // top
    {
        id: 17,
        question: "Büyük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Büyük olan hangisi?', correct: 'Evet! Top büyüktür.', wrong: 'Hayır, bu top küçüktür.' }
        },
        options: [
            { id: 2317, word: "top", imageUrl: "/images/2317.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2318, word: "top", imageUrl: "/images/2318.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 18,
        question: "Küçük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Küçük olan hangisi?', correct: 'Evet! Top küçüktür.', wrong: 'Hayır, bu top büyüktür.' }
        },
        options: [
            { id: 2318, word: "top", imageUrl: "/images/2318.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2317, word: "top", imageUrl: "/images/2317.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // yastık
    {
        id: 19,
        question: "Büyük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Büyük olan hangisi?', correct: 'Evet! Yastık büyüktür.', wrong: 'Hayır, bu yastık küçüktür.' }
        },
        options: [
            { id: 2320, word: "yastık", imageUrl: "/images/2320.webp", isCorrect: true, audioKey: "yastık", spokenText: "yastık" },
            { id: 2321, word: "yastık", imageUrl: "/images/2321.webp", isCorrect: false, audioKey: "yastık", spokenText: "yastık" }
        ]
    },
    {
        id: 20,
        question: "Küçük olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BigSmall,
        speech: {
            tr: { question: 'Küçük olan hangisi?', correct: 'Evet! Yastık küçüktür.', wrong: 'Hayır, bu yastık büyüktür.' }
        },
        options: [
            { id: 2321, word: "yastık", imageUrl: "/images/2321.webp", isCorrect: true, audioKey: "yastık", spokenText: "yastık" },
            { id: 2320, word: "yastık", imageUrl: "/images/2320.webp", isCorrect: false, audioKey: "yastık", spokenText: "yastık" }
        ]
    },
];
