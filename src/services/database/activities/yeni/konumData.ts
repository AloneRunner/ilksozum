// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-konum.mjs. Elle düzenleme; betiği değiştirip yeniden çalıştır.
// Konum kavramları: 8 nesne seti (top, ayı, araba, elma, kalem, kedi, kuş, bebek). Her sette aynı nesneler,
// sadece konum değişir. Kaynak: tools/gorsel-envanter/flow-konum.md, flow-konum-ek.md
import { ConceptRound, ActivityType } from '../../../../types';

export const insideOutsideDataYeni: ConceptRound[] = [
    // top
    {
        id: 1001,
        question: "Hangi top kutunun içinde?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi top kutunun içinde?', correct: 'Evet! Bu top kutunun içinde.', wrong: 'Hayır, bu top kutunun dışında.' }
        },
        options: [
            { id: 2027, word: "top", imageUrl: "/images/2027.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2026, word: "top", imageUrl: "/images/2026.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 1002,
        question: "Hangi top kutunun dışında?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi top kutunun dışında?', correct: 'Evet! Bu top kutunun dışında.', wrong: 'Hayır, bu top kutunun içinde.' }
        },
        options: [
            { id: 2026, word: "top", imageUrl: "/images/2026.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2027, word: "top", imageUrl: "/images/2027.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // ayı
    {
        id: 1003,
        question: "Hangi ayı sepetin içinde?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi ayı sepetin içinde?', correct: 'Evet! Bu ayı sepetin içinde.', wrong: 'Hayır, bu ayı sepetin dışında.' }
        },
        options: [
            { id: 2039, word: "ayı", imageUrl: "/images/2039.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2038, word: "ayı", imageUrl: "/images/2038.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 1004,
        question: "Hangi ayı sepetin dışında?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi ayı sepetin dışında?', correct: 'Evet! Bu ayı sepetin dışında.', wrong: 'Hayır, bu ayı sepetin içinde.' }
        },
        options: [
            { id: 2038, word: "ayı", imageUrl: "/images/2038.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2039, word: "ayı", imageUrl: "/images/2039.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // araba
    {
        id: 1005,
        question: "Hangi araba kovanın içinde?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi araba kovanın içinde?', correct: 'Evet! Bu araba kovanın içinde.', wrong: 'Hayır, bu araba kovanın dışında.' }
        },
        options: [
            { id: 2051, word: "araba", imageUrl: "/images/2051.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2050, word: "araba", imageUrl: "/images/2050.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 1006,
        question: "Hangi araba kovanın dışında?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi araba kovanın dışında?', correct: 'Evet! Bu araba kovanın dışında.', wrong: 'Hayır, bu araba kovanın içinde.' }
        },
        options: [
            { id: 2050, word: "araba", imageUrl: "/images/2050.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2051, word: "araba", imageUrl: "/images/2051.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // elma
    {
        id: 1007,
        question: "Hangi elma kasenin içinde?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi elma kasenin içinde?', correct: 'Evet! Bu elma kasenin içinde.', wrong: 'Hayır, bu elma kasenin dışında.' }
        },
        options: [
            { id: 2063, word: "elma", imageUrl: "/images/2063.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2062, word: "elma", imageUrl: "/images/2062.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 1008,
        question: "Hangi elma kasenin dışında?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi elma kasenin dışında?', correct: 'Evet! Bu elma kasenin dışında.', wrong: 'Hayır, bu elma kasenin içinde.' }
        },
        options: [
            { id: 2062, word: "elma", imageUrl: "/images/2062.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2063, word: "elma", imageUrl: "/images/2063.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kalem
    {
        id: 1009,
        question: "Hangi kalem kalemliğin içinde?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi kalem kalemliğin içinde?', correct: 'Evet! Bu kalem kalemliğin içinde.', wrong: 'Hayır, bu kalem kalemliğin dışında.' }
        },
        options: [
            { id: 2075, word: "kalem", imageUrl: "/images/2075.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2074, word: "kalem", imageUrl: "/images/2074.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 1010,
        question: "Hangi kalem kalemliğin dışında?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi kalem kalemliğin dışında?', correct: 'Evet! Bu kalem kalemliğin dışında.', wrong: 'Hayır, bu kalem kalemliğin içinde.' }
        },
        options: [
            { id: 2074, word: "kalem", imageUrl: "/images/2074.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2075, word: "kalem", imageUrl: "/images/2075.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kedi
    {
        id: 1011,
        question: "Hangi kedi yatağın içinde?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi kedi yatağın içinde?', correct: 'Evet! Bu kedi yatağın içinde.', wrong: 'Hayır, bu kedi yatağın dışında.' }
        },
        options: [
            { id: 2087, word: "kedi", imageUrl: "/images/2087.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2086, word: "kedi", imageUrl: "/images/2086.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    {
        id: 1012,
        question: "Hangi kedi yatağın dışında?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi kedi yatağın dışında?', correct: 'Evet! Bu kedi yatağın dışında.', wrong: 'Hayır, bu kedi yatağın içinde.' }
        },
        options: [
            { id: 2086, word: "kedi", imageUrl: "/images/2086.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2087, word: "kedi", imageUrl: "/images/2087.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // kuş
    {
        id: 1013,
        question: "Hangi kuş kafesin içinde?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi kuş kafesin içinde?', correct: 'Evet! Bu kuş kafesin içinde.', wrong: 'Hayır, bu kuş kafesin dışında.' }
        },
        options: [
            { id: 2099, word: "kuş", imageUrl: "/images/2099.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2098, word: "kuş", imageUrl: "/images/2098.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    {
        id: 1014,
        question: "Hangi kuş kafesin dışında?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi kuş kafesin dışında?', correct: 'Evet! Bu kuş kafesin dışında.', wrong: 'Hayır, bu kuş kafesin içinde.' }
        },
        options: [
            { id: 2098, word: "kuş", imageUrl: "/images/2098.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2099, word: "kuş", imageUrl: "/images/2099.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    // bebek
    {
        id: 1015,
        question: "Hangi bebek beşiğin içinde?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi bebek beşiğin içinde?', correct: 'Evet! Bu bebek beşiğin içinde.', wrong: 'Hayır, bu bebek beşiğin dışında.' }
        },
        options: [
            { id: 2111, word: "bebek", imageUrl: "/images/2111.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2110, word: "bebek", imageUrl: "/images/2110.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    {
        id: 1016,
        question: "Hangi bebek beşiğin dışında?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi bebek beşiğin dışında?', correct: 'Evet! Bu bebek beşiğin dışında.', wrong: 'Hayır, bu bebek beşiğin içinde.' }
        },
        options: [
            { id: 2110, word: "bebek", imageUrl: "/images/2110.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2111, word: "bebek", imageUrl: "/images/2111.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    // dinozor
    {
        id: 1017,
        question: "Hangi dinozor kutunun içinde?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi dinozor kutunun içinde?', correct: 'Evet! Bu dinozor kutunun içinde.', wrong: 'Hayır, bu dinozor kutunun dışında.' }
        },
        options: [
            { id: 2123, word: "dinozor", imageUrl: "/images/2123.webp", isCorrect: true, audioKey: "dinozor", spokenText: "dinozor" },
            { id: 2122, word: "dinozor", imageUrl: "/images/2122.webp", isCorrect: false, audioKey: "dinozor", spokenText: "dinozor" }
        ]
    },
    {
        id: 1018,
        question: "Hangi dinozor kutunun dışında?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi dinozor kutunun dışında?', correct: 'Evet! Bu dinozor kutunun dışında.', wrong: 'Hayır, bu dinozor kutunun içinde.' }
        },
        options: [
            { id: 2122, word: "dinozor", imageUrl: "/images/2122.webp", isCorrect: true, audioKey: "dinozor", spokenText: "dinozor" },
            { id: 2123, word: "dinozor", imageUrl: "/images/2123.webp", isCorrect: false, audioKey: "dinozor", spokenText: "dinozor" }
        ]
    },
    // ördek
    {
        id: 1019,
        question: "Hangi ördek sepetin içinde?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi ördek sepetin içinde?', correct: 'Evet! Bu ördek sepetin içinde.', wrong: 'Hayır, bu ördek sepetin dışında.' }
        },
        options: [
            { id: 2134, word: "ördek", imageUrl: "/images/2134.webp", isCorrect: true, audioKey: "ördek", spokenText: "ördek" },
            { id: 2133, word: "ördek", imageUrl: "/images/2133.webp", isCorrect: false, audioKey: "ördek", spokenText: "ördek" }
        ]
    },
    {
        id: 1020,
        question: "Hangi ördek sepetin dışında?",
        questionAudioKey: "",
        activityType: ActivityType.InsideOutside,
        speech: {
            tr: { question: 'Hangi ördek sepetin dışında?', correct: 'Evet! Bu ördek sepetin dışında.', wrong: 'Hayır, bu ördek sepetin içinde.' }
        },
        options: [
            { id: 2133, word: "ördek", imageUrl: "/images/2133.webp", isCorrect: true, audioKey: "ördek", spokenText: "ördek" },
            { id: 2134, word: "ördek", imageUrl: "/images/2134.webp", isCorrect: false, audioKey: "ördek", spokenText: "ördek" }
        ]
    },
];

export const onUnderDataYeni: ConceptRound[] = [
    // top
    {
        id: 1001,
        question: "Hangi top masanın üstünde?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi top masanın üstünde?', correct: 'Evet! Bu top masanın üstünde.', wrong: 'Hayır, bu top masanın altında.' }
        },
        options: [
            { id: 2029, word: "top", imageUrl: "/images/2029.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2021, word: "top", imageUrl: "/images/2021.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 1002,
        question: "Hangi top masanın altında?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi top masanın altında?', correct: 'Evet! Bu top masanın altında.', wrong: 'Hayır, bu top masanın üstünde.' }
        },
        options: [
            { id: 2021, word: "top", imageUrl: "/images/2021.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2029, word: "top", imageUrl: "/images/2029.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // ayı
    {
        id: 1003,
        question: "Hangi ayı sandalyenin üstünde?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi ayı sandalyenin üstünde?', correct: 'Evet! Bu ayı sandalyenin üstünde.', wrong: 'Hayır, bu ayı sandalyenin altında.' }
        },
        options: [
            { id: 2041, word: "ayı", imageUrl: "/images/2041.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2033, word: "ayı", imageUrl: "/images/2033.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 1004,
        question: "Hangi ayı sandalyenin altında?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi ayı sandalyenin altında?', correct: 'Evet! Bu ayı sandalyenin altında.', wrong: 'Hayır, bu ayı sandalyenin üstünde.' }
        },
        options: [
            { id: 2033, word: "ayı", imageUrl: "/images/2033.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2041, word: "ayı", imageUrl: "/images/2041.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // araba
    {
        id: 1005,
        question: "Hangi araba sehpanın üstünde?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi araba sehpanın üstünde?', correct: 'Evet! Bu araba sehpanın üstünde.', wrong: 'Hayır, bu araba sehpanın altında.' }
        },
        options: [
            { id: 2053, word: "araba", imageUrl: "/images/2053.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2045, word: "araba", imageUrl: "/images/2045.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 1006,
        question: "Hangi araba sehpanın altında?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi araba sehpanın altında?', correct: 'Evet! Bu araba sehpanın altında.', wrong: 'Hayır, bu araba sehpanın üstünde.' }
        },
        options: [
            { id: 2045, word: "araba", imageUrl: "/images/2045.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2053, word: "araba", imageUrl: "/images/2053.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // elma
    {
        id: 1007,
        question: "Hangi elma taburenin üstünde?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi elma taburenin üstünde?', correct: 'Evet! Bu elma taburenin üstünde.', wrong: 'Hayır, bu elma taburenin altında.' }
        },
        options: [
            { id: 2065, word: "elma", imageUrl: "/images/2065.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2057, word: "elma", imageUrl: "/images/2057.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 1008,
        question: "Hangi elma taburenin altında?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi elma taburenin altında?', correct: 'Evet! Bu elma taburenin altında.', wrong: 'Hayır, bu elma taburenin üstünde.' }
        },
        options: [
            { id: 2057, word: "elma", imageUrl: "/images/2057.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2065, word: "elma", imageUrl: "/images/2065.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kalem
    {
        id: 1009,
        question: "Hangi kalem masanın üstünde?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi kalem masanın üstünde?', correct: 'Evet! Bu kalem masanın üstünde.', wrong: 'Hayır, bu kalem masanın altında.' }
        },
        options: [
            { id: 2077, word: "kalem", imageUrl: "/images/2077.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2069, word: "kalem", imageUrl: "/images/2069.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 1010,
        question: "Hangi kalem masanın altında?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi kalem masanın altında?', correct: 'Evet! Bu kalem masanın altında.', wrong: 'Hayır, bu kalem masanın üstünde.' }
        },
        options: [
            { id: 2069, word: "kalem", imageUrl: "/images/2069.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2077, word: "kalem", imageUrl: "/images/2077.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kedi
    {
        id: 1011,
        question: "Hangi kedi bankın üstünde?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi kedi bankın üstünde?', correct: 'Evet! Bu kedi bankın üstünde.', wrong: 'Hayır, bu kedi bankın altında.' }
        },
        options: [
            { id: 2089, word: "kedi", imageUrl: "/images/2089.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2081, word: "kedi", imageUrl: "/images/2081.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    {
        id: 1012,
        question: "Hangi kedi bankın altında?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi kedi bankın altında?', correct: 'Evet! Bu kedi bankın altında.', wrong: 'Hayır, bu kedi bankın üstünde.' }
        },
        options: [
            { id: 2081, word: "kedi", imageUrl: "/images/2081.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2089, word: "kedi", imageUrl: "/images/2089.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // kuş
    {
        id: 1013,
        question: "Hangi kuş sehpanın üstünde?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi kuş sehpanın üstünde?', correct: 'Evet! Bu kuş sehpanın üstünde.', wrong: 'Hayır, bu kuş sehpanın altında.' }
        },
        options: [
            { id: 2101, word: "kuş", imageUrl: "/images/2101.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2093, word: "kuş", imageUrl: "/images/2093.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    {
        id: 1014,
        question: "Hangi kuş sehpanın altında?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi kuş sehpanın altında?', correct: 'Evet! Bu kuş sehpanın altında.', wrong: 'Hayır, bu kuş sehpanın üstünde.' }
        },
        options: [
            { id: 2093, word: "kuş", imageUrl: "/images/2093.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2101, word: "kuş", imageUrl: "/images/2101.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    // bebek
    {
        id: 1015,
        question: "Hangi bebek sandalyenin üstünde?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi bebek sandalyenin üstünde?', correct: 'Evet! Bu bebek sandalyenin üstünde.', wrong: 'Hayır, bu bebek sandalyenin altında.' }
        },
        options: [
            { id: 2113, word: "bebek", imageUrl: "/images/2113.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2105, word: "bebek", imageUrl: "/images/2105.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    {
        id: 1016,
        question: "Hangi bebek sandalyenin altında?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi bebek sandalyenin altında?', correct: 'Evet! Bu bebek sandalyenin altında.', wrong: 'Hayır, bu bebek sandalyenin üstünde.' }
        },
        options: [
            { id: 2105, word: "bebek", imageUrl: "/images/2105.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2113, word: "bebek", imageUrl: "/images/2113.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    // dinozor
    {
        id: 1017,
        question: "Hangi dinozor sehpanın üstünde?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi dinozor sehpanın üstünde?', correct: 'Evet! Bu dinozor sehpanın üstünde.', wrong: 'Hayır, bu dinozor sehpanın altında.' }
        },
        options: [
            { id: 2125, word: "dinozor", imageUrl: "/images/2125.webp", isCorrect: true, audioKey: "dinozor", spokenText: "dinozor" },
            { id: 2117, word: "dinozor", imageUrl: "/images/2117.webp", isCorrect: false, audioKey: "dinozor", spokenText: "dinozor" }
        ]
    },
    {
        id: 1018,
        question: "Hangi dinozor sehpanın altında?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi dinozor sehpanın altında?', correct: 'Evet! Bu dinozor sehpanın altında.', wrong: 'Hayır, bu dinozor sehpanın üstünde.' }
        },
        options: [
            { id: 2117, word: "dinozor", imageUrl: "/images/2117.webp", isCorrect: true, audioKey: "dinozor", spokenText: "dinozor" },
            { id: 2125, word: "dinozor", imageUrl: "/images/2125.webp", isCorrect: false, audioKey: "dinozor", spokenText: "dinozor" }
        ]
    },
    // ördek
    {
        id: 1019,
        question: "Hangi ördek taburenin üstünde?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi ördek taburenin üstünde?', correct: 'Evet! Bu ördek taburenin üstünde.', wrong: 'Hayır, bu ördek taburenin altında.' }
        },
        options: [
            { id: 2136, word: "ördek", imageUrl: "/images/2136.webp", isCorrect: true, audioKey: "ördek", spokenText: "ördek" },
            { id: 2128, word: "ördek", imageUrl: "/images/2128.webp", isCorrect: false, audioKey: "ördek", spokenText: "ördek" }
        ]
    },
    {
        id: 1020,
        question: "Hangi ördek taburenin altında?",
        questionAudioKey: "",
        activityType: ActivityType.OnUnder,
        speech: {
            tr: { question: 'Hangi ördek taburenin altında?', correct: 'Evet! Bu ördek taburenin altında.', wrong: 'Hayır, bu ördek taburenin üstünde.' }
        },
        options: [
            { id: 2128, word: "ördek", imageUrl: "/images/2128.webp", isCorrect: true, audioKey: "ördek", spokenText: "ördek" },
            { id: 2136, word: "ördek", imageUrl: "/images/2136.webp", isCorrect: false, audioKey: "ördek", spokenText: "ördek" }
        ]
    },
];

export const inFrontOfBehindDataYeni: ConceptRound[] = [
    // top
    {
        id: 1001,
        question: "Hangi top kutunun önünde?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi top kutunun önünde?', correct: 'Evet! Bu top kutunun önünde.', wrong: 'Hayır, bu top kutunun arkasında.' }
        },
        options: [
            { id: 2028, word: "top", imageUrl: "/images/2028.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2024, word: "top", imageUrl: "/images/2024.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 1002,
        question: "Hangi top kutunun arkasında?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi top kutunun arkasında?', correct: 'Evet! Bu top kutunun arkasında.', wrong: 'Hayır, bu top kutunun önünde.' }
        },
        options: [
            { id: 2024, word: "top", imageUrl: "/images/2024.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2028, word: "top", imageUrl: "/images/2028.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // ayı
    {
        id: 1003,
        question: "Hangi ayı sepetin önünde?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi ayı sepetin önünde?', correct: 'Evet! Bu ayı sepetin önünde.', wrong: 'Hayır, bu ayı sepetin arkasında.' }
        },
        options: [
            { id: 2040, word: "ayı", imageUrl: "/images/2040.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2036, word: "ayı", imageUrl: "/images/2036.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 1004,
        question: "Hangi ayı sepetin arkasında?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi ayı sepetin arkasında?', correct: 'Evet! Bu ayı sepetin arkasında.', wrong: 'Hayır, bu ayı sepetin önünde.' }
        },
        options: [
            { id: 2036, word: "ayı", imageUrl: "/images/2036.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2040, word: "ayı", imageUrl: "/images/2040.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // araba
    {
        id: 1005,
        question: "Hangi araba kovanın önünde?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi araba kovanın önünde?', correct: 'Evet! Bu araba kovanın önünde.', wrong: 'Hayır, bu araba kovanın arkasında.' }
        },
        options: [
            { id: 2052, word: "araba", imageUrl: "/images/2052.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2048, word: "araba", imageUrl: "/images/2048.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 1006,
        question: "Hangi araba kovanın arkasında?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi araba kovanın arkasında?', correct: 'Evet! Bu araba kovanın arkasında.', wrong: 'Hayır, bu araba kovanın önünde.' }
        },
        options: [
            { id: 2048, word: "araba", imageUrl: "/images/2048.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2052, word: "araba", imageUrl: "/images/2052.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // elma
    {
        id: 1007,
        question: "Hangi elma kasenin önünde?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi elma kasenin önünde?', correct: 'Evet! Bu elma kasenin önünde.', wrong: 'Hayır, bu elma kasenin arkasında.' }
        },
        options: [
            { id: 2064, word: "elma", imageUrl: "/images/2064.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2060, word: "elma", imageUrl: "/images/2060.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 1008,
        question: "Hangi elma kasenin arkasında?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi elma kasenin arkasında?', correct: 'Evet! Bu elma kasenin arkasında.', wrong: 'Hayır, bu elma kasenin önünde.' }
        },
        options: [
            { id: 2060, word: "elma", imageUrl: "/images/2060.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2064, word: "elma", imageUrl: "/images/2064.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kalem
    {
        id: 1009,
        question: "Hangi kalem kalemliğin önünde?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi kalem kalemliğin önünde?', correct: 'Evet! Bu kalem kalemliğin önünde.', wrong: 'Hayır, bu kalem kalemliğin arkasında.' }
        },
        options: [
            { id: 2076, word: "kalem", imageUrl: "/images/2076.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2072, word: "kalem", imageUrl: "/images/2072.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 1010,
        question: "Hangi kalem kalemliğin arkasında?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi kalem kalemliğin arkasında?', correct: 'Evet! Bu kalem kalemliğin arkasında.', wrong: 'Hayır, bu kalem kalemliğin önünde.' }
        },
        options: [
            { id: 2072, word: "kalem", imageUrl: "/images/2072.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2076, word: "kalem", imageUrl: "/images/2076.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kedi
    {
        id: 1011,
        question: "Hangi kedi yatağın önünde?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi kedi yatağın önünde?', correct: 'Evet! Bu kedi yatağın önünde.', wrong: 'Hayır, bu kedi yatağın arkasında.' }
        },
        options: [
            { id: 2088, word: "kedi", imageUrl: "/images/2088.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2084, word: "kedi", imageUrl: "/images/2084.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    {
        id: 1012,
        question: "Hangi kedi yatağın arkasında?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi kedi yatağın arkasında?', correct: 'Evet! Bu kedi yatağın arkasında.', wrong: 'Hayır, bu kedi yatağın önünde.' }
        },
        options: [
            { id: 2084, word: "kedi", imageUrl: "/images/2084.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2088, word: "kedi", imageUrl: "/images/2088.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // kuş
    {
        id: 1013,
        question: "Hangi kuş kafesin önünde?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi kuş kafesin önünde?', correct: 'Evet! Bu kuş kafesin önünde.', wrong: 'Hayır, bu kuş kafesin arkasında.' }
        },
        options: [
            { id: 2100, word: "kuş", imageUrl: "/images/2100.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2096, word: "kuş", imageUrl: "/images/2096.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    {
        id: 1014,
        question: "Hangi kuş kafesin arkasında?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi kuş kafesin arkasında?', correct: 'Evet! Bu kuş kafesin arkasında.', wrong: 'Hayır, bu kuş kafesin önünde.' }
        },
        options: [
            { id: 2096, word: "kuş", imageUrl: "/images/2096.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2100, word: "kuş", imageUrl: "/images/2100.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    // bebek
    {
        id: 1015,
        question: "Hangi bebek beşiğin önünde?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi bebek beşiğin önünde?', correct: 'Evet! Bu bebek beşiğin önünde.', wrong: 'Hayır, bu bebek beşiğin arkasında.' }
        },
        options: [
            { id: 2112, word: "bebek", imageUrl: "/images/2112.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2108, word: "bebek", imageUrl: "/images/2108.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    {
        id: 1016,
        question: "Hangi bebek beşiğin arkasında?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi bebek beşiğin arkasında?', correct: 'Evet! Bu bebek beşiğin arkasında.', wrong: 'Hayır, bu bebek beşiğin önünde.' }
        },
        options: [
            { id: 2108, word: "bebek", imageUrl: "/images/2108.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2112, word: "bebek", imageUrl: "/images/2112.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    // dinozor
    {
        id: 1017,
        question: "Hangi dinozor kutunun önünde?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi dinozor kutunun önünde?', correct: 'Evet! Bu dinozor kutunun önünde.', wrong: 'Hayır, bu dinozor kutunun arkasında.' }
        },
        options: [
            { id: 2124, word: "dinozor", imageUrl: "/images/2124.webp", isCorrect: true, audioKey: "dinozor", spokenText: "dinozor" },
            { id: 2120, word: "dinozor", imageUrl: "/images/2120.webp", isCorrect: false, audioKey: "dinozor", spokenText: "dinozor" }
        ]
    },
    {
        id: 1018,
        question: "Hangi dinozor kutunun arkasında?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi dinozor kutunun arkasında?', correct: 'Evet! Bu dinozor kutunun arkasında.', wrong: 'Hayır, bu dinozor kutunun önünde.' }
        },
        options: [
            { id: 2120, word: "dinozor", imageUrl: "/images/2120.webp", isCorrect: true, audioKey: "dinozor", spokenText: "dinozor" },
            { id: 2124, word: "dinozor", imageUrl: "/images/2124.webp", isCorrect: false, audioKey: "dinozor", spokenText: "dinozor" }
        ]
    },
    // ördek
    {
        id: 1019,
        question: "Hangi ördek sepetin önünde?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi ördek sepetin önünde?', correct: 'Evet! Bu ördek sepetin önünde.', wrong: 'Hayır, bu ördek sepetin arkasında.' }
        },
        options: [
            { id: 2135, word: "ördek", imageUrl: "/images/2135.webp", isCorrect: true, audioKey: "ördek", spokenText: "ördek" },
            { id: 2131, word: "ördek", imageUrl: "/images/2131.webp", isCorrect: false, audioKey: "ördek", spokenText: "ördek" }
        ]
    },
    {
        id: 1020,
        question: "Hangi ördek sepetin arkasında?",
        questionAudioKey: "",
        activityType: ActivityType.InFrontOfBehind,
        speech: {
            tr: { question: 'Hangi ördek sepetin arkasında?', correct: 'Evet! Bu ördek sepetin arkasında.', wrong: 'Hayır, bu ördek sepetin önünde.' }
        },
        options: [
            { id: 2131, word: "ördek", imageUrl: "/images/2131.webp", isCorrect: true, audioKey: "ördek", spokenText: "ördek" },
            { id: 2135, word: "ördek", imageUrl: "/images/2135.webp", isCorrect: false, audioKey: "ördek", spokenText: "ördek" }
        ]
    },
];

export const betweenDataYeni: ConceptRound[] = [
    // top
    {
        id: 1001,
        question: "Hangi top iki kutunun arasında?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'Hangi top iki kutunun arasında?', correct: 'Evet! Bu top kutuların arasında.', wrong: 'Hayır, bu top kutuların arasında değil.' }
        },
        options: [
            { id: 2023, word: "top", imageUrl: "/images/2023.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2022, word: "top", imageUrl: "/images/2022.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // ayı
    {
        id: 1002,
        question: "Hangi ayı iki sepetin arasında?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'Hangi ayı iki sepetin arasında?', correct: 'Evet! Bu ayı sepetlerin arasında.', wrong: 'Hayır, bu ayı sepetlerin arasında değil.' }
        },
        options: [
            { id: 2035, word: "ayı", imageUrl: "/images/2035.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2034, word: "ayı", imageUrl: "/images/2034.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // araba
    {
        id: 1003,
        question: "Hangi araba iki kovanın arasında?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'Hangi araba iki kovanın arasında?', correct: 'Evet! Bu araba kovaların arasında.', wrong: 'Hayır, bu araba kovaların arasında değil.' }
        },
        options: [
            { id: 2047, word: "araba", imageUrl: "/images/2047.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2046, word: "araba", imageUrl: "/images/2046.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // elma
    {
        id: 1004,
        question: "Hangi elma iki kasenin arasında?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'Hangi elma iki kasenin arasında?', correct: 'Evet! Bu elma kaselerin arasında.', wrong: 'Hayır, bu elma kaselerin arasında değil.' }
        },
        options: [
            { id: 2059, word: "elma", imageUrl: "/images/2059.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2058, word: "elma", imageUrl: "/images/2058.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kalem
    {
        id: 1005,
        question: "Hangi kalem iki kalemliğin arasında?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'Hangi kalem iki kalemliğin arasında?', correct: 'Evet! Bu kalem kalemliklerin arasında.', wrong: 'Hayır, bu kalem kalemliklerin arasında değil.' }
        },
        options: [
            { id: 2071, word: "kalem", imageUrl: "/images/2071.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2070, word: "kalem", imageUrl: "/images/2070.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kedi
    {
        id: 1006,
        question: "Hangi kedi iki yatağın arasında?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'Hangi kedi iki yatağın arasında?', correct: 'Evet! Bu kedi yatakların arasında.', wrong: 'Hayır, bu kedi yatakların arasında değil.' }
        },
        options: [
            { id: 2083, word: "kedi", imageUrl: "/images/2083.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2082, word: "kedi", imageUrl: "/images/2082.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // kuş
    {
        id: 1007,
        question: "Hangi kuş iki kafesin arasında?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'Hangi kuş iki kafesin arasında?', correct: 'Evet! Bu kuş kafeslerin arasında.', wrong: 'Hayır, bu kuş kafeslerin arasında değil.' }
        },
        options: [
            { id: 2095, word: "kuş", imageUrl: "/images/2095.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2094, word: "kuş", imageUrl: "/images/2094.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    // bebek
    {
        id: 1008,
        question: "Hangi bebek iki beşiğin arasında?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'Hangi bebek iki beşiğin arasında?', correct: 'Evet! Bu bebek beşiklerin arasında.', wrong: 'Hayır, bu bebek beşiklerin arasında değil.' }
        },
        options: [
            { id: 2107, word: "bebek", imageUrl: "/images/2107.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2106, word: "bebek", imageUrl: "/images/2106.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    // dinozor
    {
        id: 1009,
        question: "Hangi dinozor iki kutunun arasında?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'Hangi dinozor iki kutunun arasında?', correct: 'Evet! Bu dinozor kutuların arasında.', wrong: 'Hayır, bu dinozor kutuların arasında değil.' }
        },
        options: [
            { id: 2119, word: "dinozor", imageUrl: "/images/2119.webp", isCorrect: true, audioKey: "dinozor", spokenText: "dinozor" },
            { id: 2118, word: "dinozor", imageUrl: "/images/2118.webp", isCorrect: false, audioKey: "dinozor", spokenText: "dinozor" }
        ]
    },
    // ördek
    {
        id: 1010,
        question: "Hangi ördek iki sepetin arasında?",
        questionAudioKey: "",
        activityType: ActivityType.Between,
        speech: {
            tr: { question: 'Hangi ördek iki sepetin arasında?', correct: 'Evet! Bu ördek sepetlerin arasında.', wrong: 'Hayır, bu ördek sepetlerin arasında değil.' }
        },
        options: [
            { id: 2130, word: "ördek", imageUrl: "/images/2130.webp", isCorrect: true, audioKey: "ördek", spokenText: "ördek" },
            { id: 2129, word: "ördek", imageUrl: "/images/2129.webp", isCorrect: false, audioKey: "ördek", spokenText: "ördek" }
        ]
    },
];

export const belowAboveDataYeni: ConceptRound[] = [
    // top
    {
        id: 1001,
        question: "Hangi top yukarıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi top yukarıda?', correct: 'Evet! Bu top yukarıda.', wrong: 'Hayır, bu top aşağıda.' }
        },
        options: [
            { id: 2031, word: "top", imageUrl: "/images/2031.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2025, word: "top", imageUrl: "/images/2025.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 1002,
        question: "Hangi top aşağıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi top aşağıda?', correct: 'Evet! Bu top aşağıda.', wrong: 'Hayır, bu top yukarıda.' }
        },
        options: [
            { id: 2025, word: "top", imageUrl: "/images/2025.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2031, word: "top", imageUrl: "/images/2031.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // ayı
    {
        id: 1003,
        question: "Hangi ayı yukarıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi ayı yukarıda?', correct: 'Evet! Bu ayı yukarıda.', wrong: 'Hayır, bu ayı aşağıda.' }
        },
        options: [
            { id: 2043, word: "ayı", imageUrl: "/images/2043.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2037, word: "ayı", imageUrl: "/images/2037.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    {
        id: 1004,
        question: "Hangi ayı aşağıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi ayı aşağıda?', correct: 'Evet! Bu ayı aşağıda.', wrong: 'Hayır, bu ayı yukarıda.' }
        },
        options: [
            { id: 2037, word: "ayı", imageUrl: "/images/2037.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 2043, word: "ayı", imageUrl: "/images/2043.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
    // araba
    {
        id: 1005,
        question: "Hangi araba yukarıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi araba yukarıda?', correct: 'Evet! Bu araba yukarıda.', wrong: 'Hayır, bu araba aşağıda.' }
        },
        options: [
            { id: 2055, word: "araba", imageUrl: "/images/2055.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2049, word: "araba", imageUrl: "/images/2049.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 1006,
        question: "Hangi araba aşağıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi araba aşağıda?', correct: 'Evet! Bu araba aşağıda.', wrong: 'Hayır, bu araba yukarıda.' }
        },
        options: [
            { id: 2049, word: "araba", imageUrl: "/images/2049.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2055, word: "araba", imageUrl: "/images/2055.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // elma
    {
        id: 1007,
        question: "Hangi elma yukarıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi elma yukarıda?', correct: 'Evet! Bu elma yukarıda.', wrong: 'Hayır, bu elma aşağıda.' }
        },
        options: [
            { id: 2067, word: "elma", imageUrl: "/images/2067.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2061, word: "elma", imageUrl: "/images/2061.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 1008,
        question: "Hangi elma aşağıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi elma aşağıda?', correct: 'Evet! Bu elma aşağıda.', wrong: 'Hayır, bu elma yukarıda.' }
        },
        options: [
            { id: 2061, word: "elma", imageUrl: "/images/2061.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2067, word: "elma", imageUrl: "/images/2067.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kalem
    {
        id: 1009,
        question: "Hangi kalem yukarıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi kalem yukarıda?', correct: 'Evet! Bu kalem yukarıda.', wrong: 'Hayır, bu kalem aşağıda.' }
        },
        options: [
            { id: 2079, word: "kalem", imageUrl: "/images/2079.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2073, word: "kalem", imageUrl: "/images/2073.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 1010,
        question: "Hangi kalem aşağıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi kalem aşağıda?', correct: 'Evet! Bu kalem aşağıda.', wrong: 'Hayır, bu kalem yukarıda.' }
        },
        options: [
            { id: 2073, word: "kalem", imageUrl: "/images/2073.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2079, word: "kalem", imageUrl: "/images/2079.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kedi
    {
        id: 1011,
        question: "Hangi kedi yukarıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi kedi yukarıda?', correct: 'Evet! Bu kedi yukarıda.', wrong: 'Hayır, bu kedi aşağıda.' }
        },
        options: [
            { id: 2091, word: "kedi", imageUrl: "/images/2091.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2085, word: "kedi", imageUrl: "/images/2085.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    {
        id: 1012,
        question: "Hangi kedi aşağıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi kedi aşağıda?', correct: 'Evet! Bu kedi aşağıda.', wrong: 'Hayır, bu kedi yukarıda.' }
        },
        options: [
            { id: 2085, word: "kedi", imageUrl: "/images/2085.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 2091, word: "kedi", imageUrl: "/images/2091.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // kuş
    {
        id: 1013,
        question: "Hangi kuş yukarıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi kuş yukarıda?', correct: 'Evet! Bu kuş yukarıda.', wrong: 'Hayır, bu kuş aşağıda.' }
        },
        options: [
            { id: 2103, word: "kuş", imageUrl: "/images/2103.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2097, word: "kuş", imageUrl: "/images/2097.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    {
        id: 1014,
        question: "Hangi kuş aşağıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi kuş aşağıda?', correct: 'Evet! Bu kuş aşağıda.', wrong: 'Hayır, bu kuş yukarıda.' }
        },
        options: [
            { id: 2097, word: "kuş", imageUrl: "/images/2097.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 2103, word: "kuş", imageUrl: "/images/2103.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    // bebek
    {
        id: 1015,
        question: "Hangi bebek yukarıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi bebek yukarıda?', correct: 'Evet! Bu bebek yukarıda.', wrong: 'Hayır, bu bebek aşağıda.' }
        },
        options: [
            { id: 2115, word: "bebek", imageUrl: "/images/2115.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2109, word: "bebek", imageUrl: "/images/2109.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    {
        id: 1016,
        question: "Hangi bebek aşağıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi bebek aşağıda?', correct: 'Evet! Bu bebek aşağıda.', wrong: 'Hayır, bu bebek yukarıda.' }
        },
        options: [
            { id: 2109, word: "bebek", imageUrl: "/images/2109.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 2115, word: "bebek", imageUrl: "/images/2115.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    // dinozor
    {
        id: 1017,
        question: "Hangi dinozor yukarıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi dinozor yukarıda?', correct: 'Evet! Bu dinozor yukarıda.', wrong: 'Hayır, bu dinozor aşağıda.' }
        },
        options: [
            { id: 2127, word: "dinozor", imageUrl: "/images/2127.webp", isCorrect: true, audioKey: "dinozor", spokenText: "dinozor" },
            { id: 2121, word: "dinozor", imageUrl: "/images/2121.webp", isCorrect: false, audioKey: "dinozor", spokenText: "dinozor" }
        ]
    },
    {
        id: 1018,
        question: "Hangi dinozor aşağıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi dinozor aşağıda?', correct: 'Evet! Bu dinozor aşağıda.', wrong: 'Hayır, bu dinozor yukarıda.' }
        },
        options: [
            { id: 2121, word: "dinozor", imageUrl: "/images/2121.webp", isCorrect: true, audioKey: "dinozor", spokenText: "dinozor" },
            { id: 2127, word: "dinozor", imageUrl: "/images/2127.webp", isCorrect: false, audioKey: "dinozor", spokenText: "dinozor" }
        ]
    },
    // ördek
    {
        id: 1019,
        question: "Hangi ördek yukarıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi ördek yukarıda?', correct: 'Evet! Bu ördek yukarıda.', wrong: 'Hayır, bu ördek aşağıda.' }
        },
        options: [
            { id: 2138, word: "ördek", imageUrl: "/images/2138.webp", isCorrect: true, audioKey: "ördek", spokenText: "ördek" },
            { id: 2132, word: "ördek", imageUrl: "/images/2132.webp", isCorrect: false, audioKey: "ördek", spokenText: "ördek" }
        ]
    },
    {
        id: 1020,
        question: "Hangi ördek aşağıda?",
        questionAudioKey: "",
        activityType: ActivityType.BelowAbove,
        speech: {
            tr: { question: 'Hangi ördek aşağıda?', correct: 'Evet! Bu ördek aşağıda.', wrong: 'Hayır, bu ördek yukarıda.' }
        },
        options: [
            { id: 2132, word: "ördek", imageUrl: "/images/2132.webp", isCorrect: true, audioKey: "ördek", spokenText: "ördek" },
            { id: 2138, word: "ördek", imageUrl: "/images/2138.webp", isCorrect: false, audioKey: "ördek", spokenText: "ördek" }
        ]
    },
];
