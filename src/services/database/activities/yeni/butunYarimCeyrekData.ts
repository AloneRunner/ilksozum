// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (butun-yarim-ceyrek). Elle düzenleme.
// 24 çift, 64 soru. Görseller: gorsel-ham/butun-yarim-ceyrek/ → id 2801-2824.
import { ConceptRound, ActivityType } from '../../../../types';

export const halfQuarterWholeDataYeni: ConceptRound[] = [
    // domates
    {
        id: 1,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Domates bütündür.', wrong: 'Hayır, bu domates yarımdır.' }
        },
        options: [
            { id: 2801, word: "domates", imageUrl: "/images/2801.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2803, word: "domates", imageUrl: "/images/2803.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 2,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Domates yarımdır.', wrong: 'Hayır, bu domates bütündür.' }
        },
        options: [
            { id: 2803, word: "domates", imageUrl: "/images/2803.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2801, word: "domates", imageUrl: "/images/2801.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 3,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Domates tamdır.', wrong: 'Hayır, bu domates yarımdır.' }
        },
        options: [
            { id: 2801, word: "domates", imageUrl: "/images/2801.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2803, word: "domates", imageUrl: "/images/2803.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 4,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Domates yarımdır.', wrong: 'Hayır, bu domates çeyrektir.' }
        },
        options: [
            { id: 2803, word: "domates", imageUrl: "/images/2803.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2802, word: "domates", imageUrl: "/images/2802.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 5,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Domates çeyrektir.', wrong: 'Hayır, bu domates yarımdır.' }
        },
        options: [
            { id: 2802, word: "domates", imageUrl: "/images/2802.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2803, word: "domates", imageUrl: "/images/2803.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 6,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Domates bütündür.', wrong: 'Hayır, bu domates çeyrektir.' }
        },
        options: [
            { id: 2801, word: "domates", imageUrl: "/images/2801.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2802, word: "domates", imageUrl: "/images/2802.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 7,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Domates çeyrektir.', wrong: 'Hayır, bu domates bütündür.' }
        },
        options: [
            { id: 2802, word: "domates", imageUrl: "/images/2802.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2801, word: "domates", imageUrl: "/images/2801.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 8,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Domates tamdır.', wrong: 'Hayır, bu domates çeyrektir.' }
        },
        options: [
            { id: 2801, word: "domates", imageUrl: "/images/2801.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2802, word: "domates", imageUrl: "/images/2802.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    // ekmek
    {
        id: 9,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Ekmek bütündür.', wrong: 'Hayır, bu ekmek yarımdır.' }
        },
        options: [
            { id: 2804, word: "ekmek", imageUrl: "/images/2804.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2806, word: "ekmek", imageUrl: "/images/2806.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 10,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Ekmek yarımdır.', wrong: 'Hayır, bu ekmek bütündür.' }
        },
        options: [
            { id: 2806, word: "ekmek", imageUrl: "/images/2806.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2804, word: "ekmek", imageUrl: "/images/2804.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 11,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Ekmek tamdır.', wrong: 'Hayır, bu ekmek yarımdır.' }
        },
        options: [
            { id: 2804, word: "ekmek", imageUrl: "/images/2804.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2806, word: "ekmek", imageUrl: "/images/2806.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 12,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Ekmek yarımdır.', wrong: 'Hayır, bu ekmek çeyrektir.' }
        },
        options: [
            { id: 2806, word: "ekmek", imageUrl: "/images/2806.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2805, word: "ekmek", imageUrl: "/images/2805.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 13,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Ekmek çeyrektir.', wrong: 'Hayır, bu ekmek yarımdır.' }
        },
        options: [
            { id: 2805, word: "ekmek", imageUrl: "/images/2805.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2806, word: "ekmek", imageUrl: "/images/2806.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 14,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Ekmek bütündür.', wrong: 'Hayır, bu ekmek çeyrektir.' }
        },
        options: [
            { id: 2804, word: "ekmek", imageUrl: "/images/2804.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2805, word: "ekmek", imageUrl: "/images/2805.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 15,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Ekmek çeyrektir.', wrong: 'Hayır, bu ekmek bütündür.' }
        },
        options: [
            { id: 2805, word: "ekmek", imageUrl: "/images/2805.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2804, word: "ekmek", imageUrl: "/images/2804.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 16,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Ekmek tamdır.', wrong: 'Hayır, bu ekmek çeyrektir.' }
        },
        options: [
            { id: 2804, word: "ekmek", imageUrl: "/images/2804.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2805, word: "ekmek", imageUrl: "/images/2805.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    // elma
    {
        id: 17,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Elma bütündür.', wrong: 'Hayır, bu elma yarımdır.' }
        },
        options: [
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2809, word: "elma", imageUrl: "/images/2809.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 18,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Elma yarımdır.', wrong: 'Hayır, bu elma bütündür.' }
        },
        options: [
            { id: 2809, word: "elma", imageUrl: "/images/2809.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 19,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Elma tamdır.', wrong: 'Hayır, bu elma yarımdır.' }
        },
        options: [
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2809, word: "elma", imageUrl: "/images/2809.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 20,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Elma yarımdır.', wrong: 'Hayır, bu elma çeyrektir.' }
        },
        options: [
            { id: 2809, word: "elma", imageUrl: "/images/2809.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2808, word: "elma", imageUrl: "/images/2808.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 21,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Elma çeyrektir.', wrong: 'Hayır, bu elma yarımdır.' }
        },
        options: [
            { id: 2808, word: "elma", imageUrl: "/images/2808.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2809, word: "elma", imageUrl: "/images/2809.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 22,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Elma bütündür.', wrong: 'Hayır, bu elma çeyrektir.' }
        },
        options: [
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2808, word: "elma", imageUrl: "/images/2808.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 23,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Elma çeyrektir.', wrong: 'Hayır, bu elma bütündür.' }
        },
        options: [
            { id: 2808, word: "elma", imageUrl: "/images/2808.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 24,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Elma tamdır.', wrong: 'Hayır, bu elma çeyrektir.' }
        },
        options: [
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2808, word: "elma", imageUrl: "/images/2808.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // karpuz
    {
        id: 25,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Karpuz bütündür.', wrong: 'Hayır, bu karpuz yarımdır.' }
        },
        options: [
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2812, word: "karpuz", imageUrl: "/images/2812.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 26,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Karpuz yarımdır.', wrong: 'Hayır, bu karpuz bütündür.' }
        },
        options: [
            { id: 2812, word: "karpuz", imageUrl: "/images/2812.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 27,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Karpuz tamdır.', wrong: 'Hayır, bu karpuz yarımdır.' }
        },
        options: [
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2812, word: "karpuz", imageUrl: "/images/2812.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 28,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Karpuz yarımdır.', wrong: 'Hayır, bu karpuz çeyrektir.' }
        },
        options: [
            { id: 2812, word: "karpuz", imageUrl: "/images/2812.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2811, word: "karpuz", imageUrl: "/images/2811.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 29,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Karpuz çeyrektir.', wrong: 'Hayır, bu karpuz yarımdır.' }
        },
        options: [
            { id: 2811, word: "karpuz", imageUrl: "/images/2811.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2812, word: "karpuz", imageUrl: "/images/2812.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 30,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Karpuz bütündür.', wrong: 'Hayır, bu karpuz çeyrektir.' }
        },
        options: [
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2811, word: "karpuz", imageUrl: "/images/2811.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 31,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Karpuz çeyrektir.', wrong: 'Hayır, bu karpuz bütündür.' }
        },
        options: [
            { id: 2811, word: "karpuz", imageUrl: "/images/2811.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 32,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Karpuz tamdır.', wrong: 'Hayır, bu karpuz çeyrektir.' }
        },
        options: [
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2811, word: "karpuz", imageUrl: "/images/2811.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    // limon
    {
        id: 33,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Limon bütündür.', wrong: 'Hayır, bu limon yarımdır.' }
        },
        options: [
            { id: 2813, word: "limon", imageUrl: "/images/2813.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2815, word: "limon", imageUrl: "/images/2815.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 34,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Limon yarımdır.', wrong: 'Hayır, bu limon bütündür.' }
        },
        options: [
            { id: 2815, word: "limon", imageUrl: "/images/2815.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2813, word: "limon", imageUrl: "/images/2813.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 35,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Limon tamdır.', wrong: 'Hayır, bu limon yarımdır.' }
        },
        options: [
            { id: 2813, word: "limon", imageUrl: "/images/2813.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2815, word: "limon", imageUrl: "/images/2815.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 36,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Limon yarımdır.', wrong: 'Hayır, bu limon çeyrektir.' }
        },
        options: [
            { id: 2815, word: "limon", imageUrl: "/images/2815.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2814, word: "limon", imageUrl: "/images/2814.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 37,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Limon çeyrektir.', wrong: 'Hayır, bu limon yarımdır.' }
        },
        options: [
            { id: 2814, word: "limon", imageUrl: "/images/2814.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2815, word: "limon", imageUrl: "/images/2815.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 38,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Limon bütündür.', wrong: 'Hayır, bu limon çeyrektir.' }
        },
        options: [
            { id: 2813, word: "limon", imageUrl: "/images/2813.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2814, word: "limon", imageUrl: "/images/2814.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 39,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Limon çeyrektir.', wrong: 'Hayır, bu limon bütündür.' }
        },
        options: [
            { id: 2814, word: "limon", imageUrl: "/images/2814.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2813, word: "limon", imageUrl: "/images/2813.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 40,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Limon tamdır.', wrong: 'Hayır, bu limon çeyrektir.' }
        },
        options: [
            { id: 2813, word: "limon", imageUrl: "/images/2813.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2814, word: "limon", imageUrl: "/images/2814.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    // pasta
    {
        id: 41,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Pasta bütündür.', wrong: 'Hayır, bu pasta yarımdır.' }
        },
        options: [
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2818, word: "pasta", imageUrl: "/images/2818.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 42,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Pasta yarımdır.', wrong: 'Hayır, bu pasta bütündür.' }
        },
        options: [
            { id: 2818, word: "pasta", imageUrl: "/images/2818.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 43,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Pasta tamdır.', wrong: 'Hayır, bu pasta yarımdır.' }
        },
        options: [
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2818, word: "pasta", imageUrl: "/images/2818.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 44,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Pasta yarımdır.', wrong: 'Hayır, bu pasta çeyrektir.' }
        },
        options: [
            { id: 2818, word: "pasta", imageUrl: "/images/2818.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2817, word: "pasta", imageUrl: "/images/2817.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 45,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Pasta çeyrektir.', wrong: 'Hayır, bu pasta yarımdır.' }
        },
        options: [
            { id: 2817, word: "pasta", imageUrl: "/images/2817.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2818, word: "pasta", imageUrl: "/images/2818.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 46,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Pasta bütündür.', wrong: 'Hayır, bu pasta çeyrektir.' }
        },
        options: [
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2817, word: "pasta", imageUrl: "/images/2817.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 47,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Pasta çeyrektir.', wrong: 'Hayır, bu pasta bütündür.' }
        },
        options: [
            { id: 2817, word: "pasta", imageUrl: "/images/2817.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 48,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Pasta tamdır.', wrong: 'Hayır, bu pasta çeyrektir.' }
        },
        options: [
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2817, word: "pasta", imageUrl: "/images/2817.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    // pizza
    {
        id: 49,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Pizza bütündür.', wrong: 'Hayır, bu pizza yarımdır.' }
        },
        options: [
            { id: 2819, word: "pizza", imageUrl: "/images/2819.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2821, word: "pizza", imageUrl: "/images/2821.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 50,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Pizza yarımdır.', wrong: 'Hayır, bu pizza bütündür.' }
        },
        options: [
            { id: 2821, word: "pizza", imageUrl: "/images/2821.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2819, word: "pizza", imageUrl: "/images/2819.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 51,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Pizza tamdır.', wrong: 'Hayır, bu pizza yarımdır.' }
        },
        options: [
            { id: 2819, word: "pizza", imageUrl: "/images/2819.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2821, word: "pizza", imageUrl: "/images/2821.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 52,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Pizza yarımdır.', wrong: 'Hayır, bu pizza çeyrektir.' }
        },
        options: [
            { id: 2821, word: "pizza", imageUrl: "/images/2821.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2820, word: "pizza", imageUrl: "/images/2820.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 53,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Pizza çeyrektir.', wrong: 'Hayır, bu pizza yarımdır.' }
        },
        options: [
            { id: 2820, word: "pizza", imageUrl: "/images/2820.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2821, word: "pizza", imageUrl: "/images/2821.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 54,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Pizza bütündür.', wrong: 'Hayır, bu pizza çeyrektir.' }
        },
        options: [
            { id: 2819, word: "pizza", imageUrl: "/images/2819.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2820, word: "pizza", imageUrl: "/images/2820.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 55,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Pizza çeyrektir.', wrong: 'Hayır, bu pizza bütündür.' }
        },
        options: [
            { id: 2820, word: "pizza", imageUrl: "/images/2820.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2819, word: "pizza", imageUrl: "/images/2819.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 56,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Pizza tamdır.', wrong: 'Hayır, bu pizza çeyrektir.' }
        },
        options: [
            { id: 2819, word: "pizza", imageUrl: "/images/2819.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2820, word: "pizza", imageUrl: "/images/2820.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    // portakal
    {
        id: 57,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Portakal bütündür.', wrong: 'Hayır, bu portakal yarımdır.' }
        },
        options: [
            { id: 2822, word: "portakal", imageUrl: "/images/2822.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2824, word: "portakal", imageUrl: "/images/2824.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 58,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Portakal yarımdır.', wrong: 'Hayır, bu portakal bütündür.' }
        },
        options: [
            { id: 2824, word: "portakal", imageUrl: "/images/2824.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2822, word: "portakal", imageUrl: "/images/2822.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 59,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Portakal tamdır.', wrong: 'Hayır, bu portakal yarımdır.' }
        },
        options: [
            { id: 2822, word: "portakal", imageUrl: "/images/2822.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2824, word: "portakal", imageUrl: "/images/2824.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 60,
        question: "Yarım olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Yarım olan hangisi?', correct: 'Evet! Portakal yarımdır.', wrong: 'Hayır, bu portakal çeyrektir.' }
        },
        options: [
            { id: 2824, word: "portakal", imageUrl: "/images/2824.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2823, word: "portakal", imageUrl: "/images/2823.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 61,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Portakal çeyrektir.', wrong: 'Hayır, bu portakal yarımdır.' }
        },
        options: [
            { id: 2823, word: "portakal", imageUrl: "/images/2823.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2824, word: "portakal", imageUrl: "/images/2824.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 62,
        question: "Bütün olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Bütün olan hangisi?', correct: 'Evet! Portakal bütündür.', wrong: 'Hayır, bu portakal çeyrektir.' }
        },
        options: [
            { id: 2822, word: "portakal", imageUrl: "/images/2822.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2823, word: "portakal", imageUrl: "/images/2823.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 63,
        question: "Çeyrek olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Çeyrek olan hangisi?', correct: 'Evet! Portakal çeyrektir.', wrong: 'Hayır, bu portakal bütündür.' }
        },
        options: [
            { id: 2823, word: "portakal", imageUrl: "/images/2823.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2822, word: "portakal", imageUrl: "/images/2822.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 64,
        question: "Tam olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Tam olan hangisi?', correct: 'Evet! Portakal tamdır.', wrong: 'Hayır, bu portakal çeyrektir.' }
        },
        options: [
            { id: 2822, word: "portakal", imageUrl: "/images/2822.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2823, word: "portakal", imageUrl: "/images/2823.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
];
