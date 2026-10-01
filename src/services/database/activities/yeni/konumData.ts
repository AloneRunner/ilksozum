// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-konum.mjs. Elle düzenleme; betiği değiştirip yeniden çalıştır.
// Konum kavramları: 8 nesne seti (top, ayı, araba, elma, kalem, kedi, kuş, bebek). Her sette aynı nesneler,
// sadece konum değişir. Kaynak: tools/gorsel-envanter/flow-konum.md, flow-konum-ek.md
import { ConceptRound, ActivityType } from '../../../../types';

export const insideOutsideDataYeni: ConceptRound[] = [
    // top
    {
        id: 1001,
        question: "Kutunun içinde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Kutunun içinde olan hangisi?', correct: 'Evet! Top kutunun içindedir.', wrong: 'Hayır, top kutunun dışındadır.' }
        },
        options: [
            { id: 2027, word: "top", imageUrl: "/images/2027.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2026, word: "top", imageUrl: "/images/2026.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 1002,
        question: "Kutunun dışında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Kutunun dışında olan hangisi?', correct: 'Evet! Top kutunun dışındadır.', wrong: 'Hayır, top kutunun içindedir.' }
        },
        options: [
            { id: 2026, word: "top", imageUrl: "/images/2026.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2027, word: "top", imageUrl: "/images/2027.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // ayı
    {
        id: 1003,
        question: "Sepetin içinde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Sepetin içinde olan hangisi?', correct: 'Evet! Ayı sepetin içindedir.', wrong: 'Hayır, ayı sepetin dışındadır.' }
        },
        options: [
            { id: 2039, word: "ayı", imageUrl: "/images/2039.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2038, word: "ayı", imageUrl: "/images/2038.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 1004,
        question: "Sepetin dışında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Sepetin dışında olan hangisi?', correct: 'Evet! Ayı sepetin dışındadır.', wrong: 'Hayır, ayı sepetin içindedir.' }
        },
        options: [
            { id: 2038, word: "ayı", imageUrl: "/images/2038.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2039, word: "ayı", imageUrl: "/images/2039.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // araba
    {
        id: 1005,
        question: "Kovanın içinde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Kovanın içinde olan hangisi?', correct: 'Evet! Araba kovanın içindedir.', wrong: 'Hayır, araba kovanın dışındadır.' }
        },
        options: [
            { id: 2051, word: "araba", imageUrl: "/images/2051.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2050, word: "araba", imageUrl: "/images/2050.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 1006,
        question: "Kovanın dışında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Kovanın dışında olan hangisi?', correct: 'Evet! Araba kovanın dışındadır.', wrong: 'Hayır, araba kovanın içindedir.' }
        },
        options: [
            { id: 2050, word: "araba", imageUrl: "/images/2050.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2051, word: "araba", imageUrl: "/images/2051.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // elma
    {
        id: 1007,
        question: "Kasenin içinde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Kasenin içinde olan hangisi?', correct: 'Evet! Elma kasenin içindedir.', wrong: 'Hayır, elma kasenin dışındadır.' }
        },
        options: [
            { id: 2063, word: "elma", imageUrl: "/images/2063.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2062, word: "elma", imageUrl: "/images/2062.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 1008,
        question: "Kasenin dışında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Kasenin dışında olan hangisi?', correct: 'Evet! Elma kasenin dışındadır.', wrong: 'Hayır, elma kasenin içindedir.' }
        },
        options: [
            { id: 2062, word: "elma", imageUrl: "/images/2062.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2063, word: "elma", imageUrl: "/images/2063.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kalem
    {
        id: 1009,
        question: "Kalemliğin içinde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Kalemliğin içinde olan hangisi?', correct: 'Evet! Kalem kalemliğin içindedir.', wrong: 'Hayır, kalem kalemliğin dışındadır.' }
        },
        options: [
            { id: 2075, word: "kalem", imageUrl: "/images/2075.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2074, word: "kalem", imageUrl: "/images/2074.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 1010,
        question: "Kalemliğin dışında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Kalemliğin dışında olan hangisi?', correct: 'Evet! Kalem kalemliğin dışındadır.', wrong: 'Hayır, kalem kalemliğin içindedir.' }
        },
        options: [
            { id: 2074, word: "kalem", imageUrl: "/images/2074.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2075, word: "kalem", imageUrl: "/images/2075.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kedi
    {
        id: 1011,
        question: "Yatağın içinde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Yatağın içinde olan hangisi?', correct: 'Evet! Kedi yatağın içindedir.', wrong: 'Hayır, kedi yatağın dışındadır.' }
        },
        options: [
            { id: 2086, word: "kedi", imageUrl: "/images/2086.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2085, word: "kedi", imageUrl: "/images/2085.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    {
        id: 1012,
        question: "Yatağın dışında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Yatağın dışında olan hangisi?', correct: 'Evet! Kedi yatağın dışındadır.', wrong: 'Hayır, kedi yatağın içindedir.' }
        },
        options: [
            { id: 2085, word: "kedi", imageUrl: "/images/2085.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2086, word: "kedi", imageUrl: "/images/2086.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // kuş
    {
        id: 1013,
        question: "Kafesin içinde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Kafesin içinde olan hangisi?', correct: 'Evet! Kuş kafesin içindedir.', wrong: 'Hayır, kuş kafesin dışındadır.' }
        },
        options: [
            { id: 2097, word: "kuş", imageUrl: "/images/2097.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2096, word: "kuş", imageUrl: "/images/2096.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    {
        id: 1014,
        question: "Kafesin dışında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Kafesin dışında olan hangisi?', correct: 'Evet! Kuş kafesin dışındadır.', wrong: 'Hayır, kuş kafesin içindedir.' }
        },
        options: [
            { id: 2096, word: "kuş", imageUrl: "/images/2096.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2097, word: "kuş", imageUrl: "/images/2097.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    // bebek
    {
        id: 1015,
        question: "Beşiğin içinde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Beşiğin içinde olan hangisi?', correct: 'Evet! Bebek beşiğin içindedir.', wrong: 'Hayır, bebek beşiğin dışındadır.' }
        },
        options: [
            { id: 2109, word: "bebek", imageUrl: "/images/2109.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2108, word: "bebek", imageUrl: "/images/2108.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    {
        id: 1016,
        question: "Beşiğin dışında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Beşiğin dışında olan hangisi?', correct: 'Evet! Bebek beşiğin dışındadır.', wrong: 'Hayır, bebek beşiğin içindedir.' }
        },
        options: [
            { id: 2108, word: "bebek", imageUrl: "/images/2108.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2109, word: "bebek", imageUrl: "/images/2109.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
];

export const onUnderDataYeni: ConceptRound[] = [
    // top
    {
        id: 1001,
        question: "Masanın üstünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Masanın üstünde olan hangisi?', correct: 'Evet! Top masanın üstündedir.', wrong: 'Hayır, top masanın altındadır.' }
        },
        options: [
            { id: 2029, word: "top", imageUrl: "/images/2029.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2021, word: "top", imageUrl: "/images/2021.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 1002,
        question: "Masanın altında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Masanın altında olan hangisi?', correct: 'Evet! Top masanın altındadır.', wrong: 'Hayır, top masanın üstündedir.' }
        },
        options: [
            { id: 2021, word: "top", imageUrl: "/images/2021.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2029, word: "top", imageUrl: "/images/2029.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // ayı
    {
        id: 1003,
        question: "Sandalyenin üstünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Sandalyenin üstünde olan hangisi?', correct: 'Evet! Ayı sandalyenin üstündedir.', wrong: 'Hayır, ayı sandalyenin altındadır.' }
        },
        options: [
            { id: 2041, word: "ayı", imageUrl: "/images/2041.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2033, word: "ayı", imageUrl: "/images/2033.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 1004,
        question: "Sandalyenin altında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Sandalyenin altında olan hangisi?', correct: 'Evet! Ayı sandalyenin altındadır.', wrong: 'Hayır, ayı sandalyenin üstündedir.' }
        },
        options: [
            { id: 2033, word: "ayı", imageUrl: "/images/2033.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2041, word: "ayı", imageUrl: "/images/2041.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // araba
    {
        id: 1005,
        question: "Sehpanın üstünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Sehpanın üstünde olan hangisi?', correct: 'Evet! Araba sehpanın üstündedir.', wrong: 'Hayır, araba sehpanın altındadır.' }
        },
        options: [
            { id: 2053, word: "araba", imageUrl: "/images/2053.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2045, word: "araba", imageUrl: "/images/2045.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 1006,
        question: "Sehpanın altında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Sehpanın altında olan hangisi?', correct: 'Evet! Araba sehpanın altındadır.', wrong: 'Hayır, araba sehpanın üstündedir.' }
        },
        options: [
            { id: 2045, word: "araba", imageUrl: "/images/2045.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2053, word: "araba", imageUrl: "/images/2053.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // elma
    {
        id: 1007,
        question: "Taburenin üstünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Taburenin üstünde olan hangisi?', correct: 'Evet! Elma taburenin üstündedir.', wrong: 'Hayır, elma taburenin altındadır.' }
        },
        options: [
            { id: 2065, word: "elma", imageUrl: "/images/2065.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2057, word: "elma", imageUrl: "/images/2057.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 1008,
        question: "Taburenin altında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Taburenin altında olan hangisi?', correct: 'Evet! Elma taburenin altındadır.', wrong: 'Hayır, elma taburenin üstündedir.' }
        },
        options: [
            { id: 2057, word: "elma", imageUrl: "/images/2057.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2065, word: "elma", imageUrl: "/images/2065.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kalem
    {
        id: 1009,
        question: "Masanın üstünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Masanın üstünde olan hangisi?', correct: 'Evet! Kalem masanın üstündedir.', wrong: 'Hayır, kalem masanın altındadır.' }
        },
        options: [
            { id: 2077, word: "kalem", imageUrl: "/images/2077.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2069, word: "kalem", imageUrl: "/images/2069.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 1010,
        question: "Masanın altında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Masanın altında olan hangisi?', correct: 'Evet! Kalem masanın altındadır.', wrong: 'Hayır, kalem masanın üstündedir.' }
        },
        options: [
            { id: 2069, word: "kalem", imageUrl: "/images/2069.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2077, word: "kalem", imageUrl: "/images/2077.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kedi
    {
        id: 1011,
        question: "Bankın üstünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Bankın üstünde olan hangisi?', correct: 'Evet! Kedi bankın üstündedir.', wrong: 'Hayır, kedi bankın altındadır.' }
        },
        options: [
            { id: 2088, word: "kedi", imageUrl: "/images/2088.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2080, word: "kedi", imageUrl: "/images/2080.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    {
        id: 1012,
        question: "Bankın altında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Bankın altında olan hangisi?', correct: 'Evet! Kedi bankın altındadır.', wrong: 'Hayır, kedi bankın üstündedir.' }
        },
        options: [
            { id: 2080, word: "kedi", imageUrl: "/images/2080.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2088, word: "kedi", imageUrl: "/images/2088.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // kuş
    {
        id: 1013,
        question: "Sehpanın üstünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Sehpanın üstünde olan hangisi?', correct: 'Evet! Kuş sehpanın üstündedir.', wrong: 'Hayır, kuş sehpanın altındadır.' }
        },
        options: [
            { id: 2099, word: "kuş", imageUrl: "/images/2099.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2092, word: "kuş", imageUrl: "/images/2092.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    {
        id: 1014,
        question: "Sehpanın altında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Sehpanın altında olan hangisi?', correct: 'Evet! Kuş sehpanın altındadır.', wrong: 'Hayır, kuş sehpanın üstündedir.' }
        },
        options: [
            { id: 2092, word: "kuş", imageUrl: "/images/2092.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2099, word: "kuş", imageUrl: "/images/2099.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    // bebek
    {
        id: 1015,
        question: "Sandalyenin üstünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Sandalyenin üstünde olan hangisi?', correct: 'Evet! Bebek sandalyenin üstündedir.', wrong: 'Hayır, bebek sandalyenin altındadır.' }
        },
        options: [
            { id: 2111, word: "bebek", imageUrl: "/images/2111.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2103, word: "bebek", imageUrl: "/images/2103.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    {
        id: 1016,
        question: "Sandalyenin altında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Sandalyenin altında olan hangisi?', correct: 'Evet! Bebek sandalyenin altındadır.', wrong: 'Hayır, bebek sandalyenin üstündedir.' }
        },
        options: [
            { id: 2103, word: "bebek", imageUrl: "/images/2103.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2111, word: "bebek", imageUrl: "/images/2111.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
];

export const inFrontOfBehindDataYeni: ConceptRound[] = [
    // top
    {
        id: 1001,
        question: "Kutunun önünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Kutunun önünde olan hangisi?', correct: 'Evet! Top kutunun önündedir.', wrong: 'Hayır, top kutunun arkasındadır.' }
        },
        options: [
            { id: 2028, word: "top", imageUrl: "/images/2028.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2024, word: "top", imageUrl: "/images/2024.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 1002,
        question: "Kutunun arkasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Kutunun arkasında olan hangisi?', correct: 'Evet! Top kutunun arkasındadır.', wrong: 'Hayır, top kutunun önündedir.' }
        },
        options: [
            { id: 2024, word: "top", imageUrl: "/images/2024.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2028, word: "top", imageUrl: "/images/2028.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // ayı
    {
        id: 1003,
        question: "Sepetin önünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Sepetin önünde olan hangisi?', correct: 'Evet! Ayı sepetin önündedir.', wrong: 'Hayır, ayı sepetin arkasındadır.' }
        },
        options: [
            { id: 2040, word: "ayı", imageUrl: "/images/2040.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2036, word: "ayı", imageUrl: "/images/2036.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 1004,
        question: "Sepetin arkasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Sepetin arkasında olan hangisi?', correct: 'Evet! Ayı sepetin arkasındadır.', wrong: 'Hayır, ayı sepetin önündedir.' }
        },
        options: [
            { id: 2036, word: "ayı", imageUrl: "/images/2036.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2040, word: "ayı", imageUrl: "/images/2040.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // araba
    {
        id: 1005,
        question: "Kovanın önünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Kovanın önünde olan hangisi?', correct: 'Evet! Araba kovanın önündedir.', wrong: 'Hayır, araba kovanın arkasındadır.' }
        },
        options: [
            { id: 2052, word: "araba", imageUrl: "/images/2052.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2048, word: "araba", imageUrl: "/images/2048.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 1006,
        question: "Kovanın arkasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Kovanın arkasında olan hangisi?', correct: 'Evet! Araba kovanın arkasındadır.', wrong: 'Hayır, araba kovanın önündedir.' }
        },
        options: [
            { id: 2048, word: "araba", imageUrl: "/images/2048.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2052, word: "araba", imageUrl: "/images/2052.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // elma
    {
        id: 1007,
        question: "Kasenin önünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Kasenin önünde olan hangisi?', correct: 'Evet! Elma kasenin önündedir.', wrong: 'Hayır, elma kasenin arkasındadır.' }
        },
        options: [
            { id: 2064, word: "elma", imageUrl: "/images/2064.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2060, word: "elma", imageUrl: "/images/2060.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 1008,
        question: "Kasenin arkasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Kasenin arkasında olan hangisi?', correct: 'Evet! Elma kasenin arkasındadır.', wrong: 'Hayır, elma kasenin önündedir.' }
        },
        options: [
            { id: 2060, word: "elma", imageUrl: "/images/2060.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2064, word: "elma", imageUrl: "/images/2064.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kalem
    {
        id: 1009,
        question: "Kalemliğin önünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Kalemliğin önünde olan hangisi?', correct: 'Evet! Kalem kalemliğin önündedir.', wrong: 'Hayır, kalem kalemliğin arkasındadır.' }
        },
        options: [
            { id: 2076, word: "kalem", imageUrl: "/images/2076.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2072, word: "kalem", imageUrl: "/images/2072.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 1010,
        question: "Kalemliğin arkasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Kalemliğin arkasında olan hangisi?', correct: 'Evet! Kalem kalemliğin arkasındadır.', wrong: 'Hayır, kalem kalemliğin önündedir.' }
        },
        options: [
            { id: 2072, word: "kalem", imageUrl: "/images/2072.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2076, word: "kalem", imageUrl: "/images/2076.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kedi
    {
        id: 1011,
        question: "Yatağın önünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Yatağın önünde olan hangisi?', correct: 'Evet! Kedi yatağın önündedir.', wrong: 'Hayır, kedi yatağın arkasındadır.' }
        },
        options: [
            { id: 2087, word: "kedi", imageUrl: "/images/2087.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2083, word: "kedi", imageUrl: "/images/2083.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    {
        id: 1012,
        question: "Yatağın arkasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Yatağın arkasında olan hangisi?', correct: 'Evet! Kedi yatağın arkasındadır.', wrong: 'Hayır, kedi yatağın önündedir.' }
        },
        options: [
            { id: 2083, word: "kedi", imageUrl: "/images/2083.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2087, word: "kedi", imageUrl: "/images/2087.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // bebek
    {
        id: 1013,
        question: "Beşiğin önünde olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Beşiğin önünde olan hangisi?', correct: 'Evet! Bebek beşiğin önündedir.', wrong: 'Hayır, bebek beşiğin arkasındadır.' }
        },
        options: [
            { id: 2110, word: "bebek", imageUrl: "/images/2110.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2106, word: "bebek", imageUrl: "/images/2106.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    {
        id: 1014,
        question: "Beşiğin arkasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Beşiğin arkasında olan hangisi?', correct: 'Evet! Bebek beşiğin arkasındadır.', wrong: 'Hayır, bebek beşiğin önündedir.' }
        },
        options: [
            { id: 2106, word: "bebek", imageUrl: "/images/2106.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2110, word: "bebek", imageUrl: "/images/2110.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
];

export const betweenDataYeni: ConceptRound[] = [
    // top
    {
        id: 1001,
        question: "İki kutunun arasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'İki kutunun arasında olan hangisi?', correct: 'Evet! Top kutuların arasındadır.', wrong: 'Hayır, top kutuların arasında değildir.' }
        },
        options: [
            { id: 2023, word: "top", imageUrl: "/images/2023.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2022, word: "top", imageUrl: "/images/2022.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // ayı
    {
        id: 1002,
        question: "İki sepetin arasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'İki sepetin arasında olan hangisi?', correct: 'Evet! Ayı sepetlerin arasındadır.', wrong: 'Hayır, ayı sepetlerin arasında değildir.' }
        },
        options: [
            { id: 2035, word: "ayı", imageUrl: "/images/2035.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2034, word: "ayı", imageUrl: "/images/2034.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // araba
    {
        id: 1003,
        question: "İki kovanın arasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'İki kovanın arasında olan hangisi?', correct: 'Evet! Araba kovaların arasındadır.', wrong: 'Hayır, araba kovaların arasında değildir.' }
        },
        options: [
            { id: 2047, word: "araba", imageUrl: "/images/2047.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2046, word: "araba", imageUrl: "/images/2046.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // elma
    {
        id: 1004,
        question: "İki kasenin arasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'İki kasenin arasında olan hangisi?', correct: 'Evet! Elma kaselerin arasındadır.', wrong: 'Hayır, elma kaselerin arasında değildir.' }
        },
        options: [
            { id: 2059, word: "elma", imageUrl: "/images/2059.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2058, word: "elma", imageUrl: "/images/2058.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kalem
    {
        id: 1005,
        question: "İki kalemliğin arasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'İki kalemliğin arasında olan hangisi?', correct: 'Evet! Kalem kalemliklerin arasındadır.', wrong: 'Hayır, kalem kalemliklerin arasında değildir.' }
        },
        options: [
            { id: 2071, word: "kalem", imageUrl: "/images/2071.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2070, word: "kalem", imageUrl: "/images/2070.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kedi
    {
        id: 1006,
        question: "İki yatağın arasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'İki yatağın arasında olan hangisi?', correct: 'Evet! Kedi yatakların arasındadır.', wrong: 'Hayır, kedi yatakların arasında değildir.' }
        },
        options: [
            { id: 2082, word: "kedi", imageUrl: "/images/2082.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2081, word: "kedi", imageUrl: "/images/2081.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // kuş
    {
        id: 1007,
        question: "İki kafesin arasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'İki kafesin arasında olan hangisi?', correct: 'Evet! Kuş kafeslerin arasındadır.', wrong: 'Hayır, kuş kafeslerin arasında değildir.' }
        },
        options: [
            { id: 2094, word: "kuş", imageUrl: "/images/2094.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2093, word: "kuş", imageUrl: "/images/2093.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    // bebek
    {
        id: 1008,
        question: "İki beşiğin arasında olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'İki beşiğin arasında olan hangisi?', correct: 'Evet! Bebek beşiklerin arasındadır.', wrong: 'Hayır, bebek beşiklerin arasında değildir.' }
        },
        options: [
            { id: 2105, word: "bebek", imageUrl: "/images/2105.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2104, word: "bebek", imageUrl: "/images/2104.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
];

export const belowAboveDataYeni: ConceptRound[] = [
    // top
    {
        id: 1001,
        question: "Yukarıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Yukarıda olan hangisi?', correct: 'Evet! Top yukarıdadır.', wrong: 'Hayır, top aşağıdadır.' }
        },
        options: [
            { id: 2031, word: "top", imageUrl: "/images/2031.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2025, word: "top", imageUrl: "/images/2025.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 1002,
        question: "Aşağıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Aşağıda olan hangisi?', correct: 'Evet! Top aşağıdadır.', wrong: 'Hayır, top yukarıdadır.' }
        },
        options: [
            { id: 2025, word: "top", imageUrl: "/images/2025.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2031, word: "top", imageUrl: "/images/2031.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // ayı
    {
        id: 1003,
        question: "Yukarıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Yukarıda olan hangisi?', correct: 'Evet! Ayı yukarıdadır.', wrong: 'Hayır, ayı aşağıdadır.' }
        },
        options: [
            { id: 2043, word: "ayı", imageUrl: "/images/2043.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2037, word: "ayı", imageUrl: "/images/2037.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 1004,
        question: "Aşağıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Aşağıda olan hangisi?', correct: 'Evet! Ayı aşağıdadır.', wrong: 'Hayır, ayı yukarıdadır.' }
        },
        options: [
            { id: 2037, word: "ayı", imageUrl: "/images/2037.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2043, word: "ayı", imageUrl: "/images/2043.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // araba
    {
        id: 1005,
        question: "Yukarıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Yukarıda olan hangisi?', correct: 'Evet! Araba yukarıdadır.', wrong: 'Hayır, araba aşağıdadır.' }
        },
        options: [
            { id: 2055, word: "araba", imageUrl: "/images/2055.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2049, word: "araba", imageUrl: "/images/2049.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 1006,
        question: "Aşağıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Aşağıda olan hangisi?', correct: 'Evet! Araba aşağıdadır.', wrong: 'Hayır, araba yukarıdadır.' }
        },
        options: [
            { id: 2049, word: "araba", imageUrl: "/images/2049.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2055, word: "araba", imageUrl: "/images/2055.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // elma
    {
        id: 1007,
        question: "Yukarıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Yukarıda olan hangisi?', correct: 'Evet! Elma yukarıdadır.', wrong: 'Hayır, elma aşağıdadır.' }
        },
        options: [
            { id: 2067, word: "elma", imageUrl: "/images/2067.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2061, word: "elma", imageUrl: "/images/2061.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 1008,
        question: "Aşağıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Aşağıda olan hangisi?', correct: 'Evet! Elma aşağıdadır.', wrong: 'Hayır, elma yukarıdadır.' }
        },
        options: [
            { id: 2061, word: "elma", imageUrl: "/images/2061.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2067, word: "elma", imageUrl: "/images/2067.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kedi
    {
        id: 1009,
        question: "Yukarıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Yukarıda olan hangisi?', correct: 'Evet! Kedi yukarıdadır.', wrong: 'Hayır, kedi aşağıdadır.' }
        },
        options: [
            { id: 2090, word: "kedi", imageUrl: "/images/2090.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2084, word: "kedi", imageUrl: "/images/2084.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    {
        id: 1010,
        question: "Aşağıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Aşağıda olan hangisi?', correct: 'Evet! Kedi aşağıdadır.', wrong: 'Hayır, kedi yukarıdadır.' }
        },
        options: [
            { id: 2084, word: "kedi", imageUrl: "/images/2084.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2090, word: "kedi", imageUrl: "/images/2090.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // kuş
    {
        id: 1011,
        question: "Yukarıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Yukarıda olan hangisi?', correct: 'Evet! Kuş yukarıdadır.', wrong: 'Hayır, kuş aşağıdadır.' }
        },
        options: [
            { id: 2101, word: "kuş", imageUrl: "/images/2101.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2095, word: "kuş", imageUrl: "/images/2095.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    {
        id: 1012,
        question: "Aşağıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Aşağıda olan hangisi?', correct: 'Evet! Kuş aşağıdadır.', wrong: 'Hayır, kuş yukarıdadır.' }
        },
        options: [
            { id: 2095, word: "kuş", imageUrl: "/images/2095.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2101, word: "kuş", imageUrl: "/images/2101.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    // bebek
    {
        id: 1013,
        question: "Yukarıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Yukarıda olan hangisi?', correct: 'Evet! Bebek yukarıdadır.', wrong: 'Hayır, bebek aşağıdadır.' }
        },
        options: [
            { id: 2113, word: "bebek", imageUrl: "/images/2113.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2107, word: "bebek", imageUrl: "/images/2107.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    {
        id: 1014,
        question: "Aşağıda olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Aşağıda olan hangisi?', correct: 'Evet! Bebek aşağıdadır.', wrong: 'Hayır, bebek yukarıdadır.' }
        },
        options: [
            { id: 2107, word: "bebek", imageUrl: "/images/2107.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2113, word: "bebek", imageUrl: "/images/2113.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
];
