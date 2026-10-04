// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (agir-hafif). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/agir-hafif/ → id 6201-6220.
import { ConceptRound, ActivityType } from '../../../../types';

export const heavyLightDataYeni: ConceptRound[] = [
    // balkabagi_mandalina
    {
        id: 1,
        question: "Ağır olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Ağır olan hangisi?', correct: 'Evet! Balkabağı ağırdır.', wrong: 'Hayır, mandalina hafiftir.' }
        },
        options: [
            { id: 6201, word: "balkabağı", imageUrl: "/images/6201.webp", isCorrect: true, audioKey: "balkabağı", spokenText: "balkabağı" },
            { id: 6202, word: "mandalina", imageUrl: "/images/6202.webp", isCorrect: false, audioKey: "mandalina", spokenText: "mandalina" }
        ]
    },
    {
        id: 2,
        question: "Hafif olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Hafif olan hangisi?', correct: 'Evet! Mandalina hafiftir.', wrong: 'Hayır, balkabağı ağırdır.' }
        },
        options: [
            { id: 6202, word: "mandalina", imageUrl: "/images/6202.webp", isCorrect: true, audioKey: "mandalina", spokenText: "mandalina" },
            { id: 6201, word: "balkabağı", imageUrl: "/images/6201.webp", isCorrect: false, audioKey: "balkabağı", spokenText: "balkabağı" }
        ]
    },
    // bowling_plajtopu
    {
        id: 3,
        question: "Ağır olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Ağır olan hangisi?', correct: 'Evet! Bowling topu ağırdır.', wrong: 'Hayır, plaj topu hafiftir.' }
        },
        options: [
            { id: 6203, word: "bowling topu", imageUrl: "/images/6203.webp", isCorrect: true, audioKey: "bowling topu", spokenText: "bowling topu" },
            { id: 6204, word: "plaj topu", imageUrl: "/images/6204.webp", isCorrect: false, audioKey: "plaj topu", spokenText: "plaj topu" }
        ]
    },
    {
        id: 4,
        question: "Hafif olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Hafif olan hangisi?', correct: 'Evet! Plaj topu hafiftir.', wrong: 'Hayır, bowling topu ağırdır.' }
        },
        options: [
            { id: 6204, word: "plaj topu", imageUrl: "/images/6204.webp", isCorrect: true, audioKey: "plaj topu", spokenText: "plaj topu" },
            { id: 6203, word: "bowling topu", imageUrl: "/images/6203.webp", isCorrect: false, audioKey: "bowling topu", spokenText: "bowling topu" }
        ]
    },
    // dambil_balon
    {
        id: 5,
        question: "Ağır olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Ağır olan hangisi?', correct: 'Evet! Dambıl ağırdır.', wrong: 'Hayır, balon hafiftir.' }
        },
        options: [
            { id: 6205, word: "dambıl", imageUrl: "/images/6205.webp", isCorrect: true, audioKey: "dambıl", spokenText: "dambıl" },
            { id: 6206, word: "balon", imageUrl: "/images/6206.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 6,
        question: "Hafif olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Hafif olan hangisi?', correct: 'Evet! Balon hafiftir.', wrong: 'Hayır, dambıl ağırdır.' }
        },
        options: [
            { id: 6206, word: "balon", imageUrl: "/images/6206.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 6205, word: "dambıl", imageUrl: "/images/6205.webp", isCorrect: false, audioKey: "dambıl", spokenText: "dambıl" }
        ]
    },
    // fil_kelebek
    {
        id: 7,
        question: "Ağır olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Ağır olan hangisi?', correct: 'Evet! Fil ağırdır.', wrong: 'Hayır, kelebek hafiftir.' }
        },
        options: [
            { id: 6207, word: "fil", imageUrl: "/images/6207.webp", isCorrect: true, audioKey: "fil", spokenText: "fil" },
            { id: 6208, word: "kelebek", imageUrl: "/images/6208.webp", isCorrect: false, audioKey: "kelebek", spokenText: "kelebek" }
        ]
    },
    {
        id: 8,
        question: "Hafif olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Hafif olan hangisi?', correct: 'Evet! Kelebek hafiftir.', wrong: 'Hayır, fil ağırdır.' }
        },
        options: [
            { id: 6208, word: "kelebek", imageUrl: "/images/6208.webp", isCorrect: true, audioKey: "kelebek", spokenText: "kelebek" },
            { id: 6207, word: "fil", imageUrl: "/images/6207.webp", isCorrect: false, audioKey: "fil", spokenText: "fil" }
        ]
    },
    // karpuz_cilek
    {
        id: 9,
        question: "Ağır olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Ağır olan hangisi?', correct: 'Evet! Karpuz ağırdır.', wrong: 'Hayır, çilek hafiftir.' }
        },
        options: [
            { id: 6209, word: "karpuz", imageUrl: "/images/6209.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 6210, word: "çilek", imageUrl: "/images/6210.webp", isCorrect: false, audioKey: "çilek", spokenText: "çilek" }
        ]
    },
    {
        id: 10,
        question: "Hafif olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Hafif olan hangisi?', correct: 'Evet! Çilek hafiftir.', wrong: 'Hayır, karpuz ağırdır.' }
        },
        options: [
            { id: 6210, word: "çilek", imageUrl: "/images/6210.webp", isCorrect: true, audioKey: "çilek", spokenText: "çilek" },
            { id: 6209, word: "karpuz", imageUrl: "/images/6209.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    // kaya_tuy
    {
        id: 11,
        question: "Ağır olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Ağır olan hangisi?', correct: 'Evet! Taş ağırdır.', wrong: 'Hayır, tüy hafiftir.' }
        },
        options: [
            { id: 6211, word: "taş", imageUrl: "/images/6211.webp", isCorrect: true, audioKey: "taş", spokenText: "taş" },
            { id: 6212, word: "tüy", imageUrl: "/images/6212.webp", isCorrect: false, audioKey: "tüy", spokenText: "tüy" }
        ]
    },
    {
        id: 12,
        question: "Hafif olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Hafif olan hangisi?', correct: 'Evet! Tüy hafiftir.', wrong: 'Hayır, taş ağırdır.' }
        },
        options: [
            { id: 6212, word: "tüy", imageUrl: "/images/6212.webp", isCorrect: true, audioKey: "tüy", spokenText: "tüy" },
            { id: 6211, word: "taş", imageUrl: "/images/6211.webp", isCorrect: false, audioKey: "taş", spokenText: "taş" }
        ]
    },
    // kitap_kagit
    {
        id: 13,
        question: "Ağır olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Ağır olan hangisi?', correct: 'Evet! Kitaplar ağırdır.', wrong: 'Hayır, kâğıt hafiftir.' }
        },
        options: [
            { id: 6213, word: "kitaplar", imageUrl: "/images/6213.webp", isCorrect: true, audioKey: "kitaplar", spokenText: "kitaplar" },
            { id: 6214, word: "kâğıt", imageUrl: "/images/6214.webp", isCorrect: false, audioKey: "kâğıt", spokenText: "kâğıt" }
        ]
    },
    {
        id: 14,
        question: "Hafif olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Hafif olan hangisi?', correct: 'Evet! Kâğıt hafiftir.', wrong: 'Hayır, kitaplar ağırdır.' }
        },
        options: [
            { id: 6214, word: "kâğıt", imageUrl: "/images/6214.webp", isCorrect: true, audioKey: "kâğıt", spokenText: "kâğıt" },
            { id: 6213, word: "kitaplar", imageUrl: "/images/6213.webp", isCorrect: false, audioKey: "kitaplar", spokenText: "kitaplar" }
        ]
    },
    // kova
    {
        id: 15,
        question: "Hangi kova ağır?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Hangi kova ağır?', correct: 'Evet! Su dolu kova ağırdır.', wrong: 'Hayır, boş kova hafiftir.' }
        },
        options: [
            { id: 6215, word: "su dolu kova", imageUrl: "/images/6215.webp", isCorrect: true, audioKey: "su dolu kova", spokenText: "su dolu kova" },
            { id: 6216, word: "boş kova", imageUrl: "/images/6216.webp", isCorrect: false, audioKey: "boş kova", spokenText: "boş kova" }
        ]
    },
    {
        id: 16,
        question: "Hangi kova hafif?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Hangi kova hafif?', correct: 'Evet! Boş kova hafiftir.', wrong: 'Hayır, su dolu kova ağırdır.' }
        },
        options: [
            { id: 6216, word: "boş kova", imageUrl: "/images/6216.webp", isCorrect: true, audioKey: "boş kova", spokenText: "boş kova" },
            { id: 6215, word: "su dolu kova", imageUrl: "/images/6215.webp", isCorrect: false, audioKey: "su dolu kova", spokenText: "su dolu kova" }
        ]
    },
    // tugla_sunger
    {
        id: 17,
        question: "Ağır olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Ağır olan hangisi?', correct: 'Evet! Tuğla ağırdır.', wrong: 'Hayır, sünger hafiftir.' }
        },
        options: [
            { id: 6217, word: "tuğla", imageUrl: "/images/6217.webp", isCorrect: true, audioKey: "tuğla", spokenText: "tuğla" },
            { id: 6218, word: "sünger", imageUrl: "/images/6218.webp", isCorrect: false, audioKey: "sünger", spokenText: "sünger" }
        ]
    },
    {
        id: 18,
        question: "Hafif olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Hafif olan hangisi?', correct: 'Evet! Sünger hafiftir.', wrong: 'Hayır, tuğla ağırdır.' }
        },
        options: [
            { id: 6218, word: "sünger", imageUrl: "/images/6218.webp", isCorrect: true, audioKey: "sünger", spokenText: "sünger" },
            { id: 6217, word: "tuğla", imageUrl: "/images/6217.webp", isCorrect: false, audioKey: "tuğla", spokenText: "tuğla" }
        ]
    },
    // valiz_canta
    {
        id: 19,
        question: "Ağır olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Ağır olan hangisi?', correct: 'Evet! Valiz ağırdır.', wrong: 'Hayır, çanta hafiftir.' }
        },
        options: [
            { id: 6219, word: "valiz", imageUrl: "/images/6219.webp", isCorrect: true, audioKey: "valiz", spokenText: "valiz" },
            { id: 6220, word: "çanta", imageUrl: "/images/6220.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 20,
        question: "Hafif olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HeavyLight,
        speech: {
            tr: { question: 'Hafif olan hangisi?', correct: 'Evet! Çanta hafiftir.', wrong: 'Hayır, valiz ağırdır.' }
        },
        options: [
            { id: 6220, word: "çanta", imageUrl: "/images/6220.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 6219, word: "valiz", imageUrl: "/images/6219.webp", isCorrect: false, audioKey: "valiz", spokenText: "valiz" }
        ]
    },
];
