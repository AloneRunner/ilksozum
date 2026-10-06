// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (butun-yarim-ceyrek). Elle düzenleme.
// 24 çift, 64 soru. Görseller: gorsel-ham/butun-yarim-ceyrek/ → id 2801-2824.
import { ConceptRound, ActivityType } from '../../../../types';

export const halfQuarterWholeDataYeni: ConceptRound[] = [
    // domates
    {
        id: 1,
        question: "Hangi domates bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi domates bütün?', correct: 'Evet! Bu domates bütün.', wrong: 'Hayır, bu domates yarım.' }
        },
        options: [
            { id: 2801, word: "domates", imageUrl: "/images/2801.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2803, word: "domates", imageUrl: "/images/2803.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 2,
        question: "Hangi domates yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi domates yarım?', correct: 'Evet! Bu domates yarım.', wrong: 'Hayır, bu domates bütün.' }
        },
        options: [
            { id: 2803, word: "domates", imageUrl: "/images/2803.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2801, word: "domates", imageUrl: "/images/2801.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 3,
        question: "Hangi domates tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi domates tam?', correct: 'Evet! Bu domates tam.', wrong: 'Hayır, bu domates yarım.' }
        },
        options: [
            { id: 2801, word: "domates", imageUrl: "/images/2801.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2803, word: "domates", imageUrl: "/images/2803.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 4,
        question: "Hangi domates yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi domates yarım?', correct: 'Evet! Bu domates yarım.', wrong: 'Hayır, bu domates çeyrek.' }
        },
        options: [
            { id: 2803, word: "domates", imageUrl: "/images/2803.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2802, word: "domates", imageUrl: "/images/2802.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 5,
        question: "Hangi domates çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi domates çeyrek?', correct: 'Evet! Bu domates çeyrek.', wrong: 'Hayır, bu domates yarım.' }
        },
        options: [
            { id: 2802, word: "domates", imageUrl: "/images/2802.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2803, word: "domates", imageUrl: "/images/2803.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 6,
        question: "Hangi domates bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi domates bütün?', correct: 'Evet! Bu domates bütün.', wrong: 'Hayır, bu domates çeyrek.' }
        },
        options: [
            { id: 2801, word: "domates", imageUrl: "/images/2801.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2802, word: "domates", imageUrl: "/images/2802.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 7,
        question: "Hangi domates çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi domates çeyrek?', correct: 'Evet! Bu domates çeyrek.', wrong: 'Hayır, bu domates bütün.' }
        },
        options: [
            { id: 2802, word: "domates", imageUrl: "/images/2802.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2801, word: "domates", imageUrl: "/images/2801.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 8,
        question: "Hangi domates tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi domates tam?', correct: 'Evet! Bu domates tam.', wrong: 'Hayır, bu domates çeyrek.' }
        },
        options: [
            { id: 2801, word: "domates", imageUrl: "/images/2801.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 2802, word: "domates", imageUrl: "/images/2802.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    // ekmek
    {
        id: 9,
        question: "Hangi ekmek bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi ekmek bütün?', correct: 'Evet! Bu ekmek bütün.', wrong: 'Hayır, bu ekmek yarım.' }
        },
        options: [
            { id: 2804, word: "ekmek", imageUrl: "/images/2804.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2806, word: "ekmek", imageUrl: "/images/2806.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 10,
        question: "Hangi ekmek yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi ekmek yarım?', correct: 'Evet! Bu ekmek yarım.', wrong: 'Hayır, bu ekmek bütün.' }
        },
        options: [
            { id: 2806, word: "ekmek", imageUrl: "/images/2806.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2804, word: "ekmek", imageUrl: "/images/2804.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 11,
        question: "Hangi ekmek tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi ekmek tam?', correct: 'Evet! Bu ekmek tam.', wrong: 'Hayır, bu ekmek yarım.' }
        },
        options: [
            { id: 2804, word: "ekmek", imageUrl: "/images/2804.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2806, word: "ekmek", imageUrl: "/images/2806.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 12,
        question: "Hangi ekmek yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi ekmek yarım?', correct: 'Evet! Bu ekmek yarım.', wrong: 'Hayır, bu ekmek çeyrek.' }
        },
        options: [
            { id: 2806, word: "ekmek", imageUrl: "/images/2806.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2805, word: "ekmek", imageUrl: "/images/2805.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 13,
        question: "Hangi ekmek çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi ekmek çeyrek?', correct: 'Evet! Bu ekmek çeyrek.', wrong: 'Hayır, bu ekmek yarım.' }
        },
        options: [
            { id: 2805, word: "ekmek", imageUrl: "/images/2805.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2806, word: "ekmek", imageUrl: "/images/2806.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 14,
        question: "Hangi ekmek bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi ekmek bütün?', correct: 'Evet! Bu ekmek bütün.', wrong: 'Hayır, bu ekmek çeyrek.' }
        },
        options: [
            { id: 2804, word: "ekmek", imageUrl: "/images/2804.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2805, word: "ekmek", imageUrl: "/images/2805.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 15,
        question: "Hangi ekmek çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi ekmek çeyrek?', correct: 'Evet! Bu ekmek çeyrek.', wrong: 'Hayır, bu ekmek bütün.' }
        },
        options: [
            { id: 2805, word: "ekmek", imageUrl: "/images/2805.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2804, word: "ekmek", imageUrl: "/images/2804.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 16,
        question: "Hangi ekmek tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi ekmek tam?', correct: 'Evet! Bu ekmek tam.', wrong: 'Hayır, bu ekmek çeyrek.' }
        },
        options: [
            { id: 2804, word: "ekmek", imageUrl: "/images/2804.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2805, word: "ekmek", imageUrl: "/images/2805.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    // elma
    {
        id: 17,
        question: "Hangi elma bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi elma bütün?', correct: 'Evet! Bu elma bütün.', wrong: 'Hayır, bu elma yarım.' }
        },
        options: [
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2809, word: "elma", imageUrl: "/images/2809.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 18,
        question: "Hangi elma yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi elma yarım?', correct: 'Evet! Bu elma yarım.', wrong: 'Hayır, bu elma bütün.' }
        },
        options: [
            { id: 2809, word: "elma", imageUrl: "/images/2809.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 19,
        question: "Hangi elma tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi elma tam?', correct: 'Evet! Bu elma tam.', wrong: 'Hayır, bu elma yarım.' }
        },
        options: [
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2809, word: "elma", imageUrl: "/images/2809.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 20,
        question: "Hangi elma yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi elma yarım?', correct: 'Evet! Bu elma yarım.', wrong: 'Hayır, bu elma çeyrek.' }
        },
        options: [
            { id: 2809, word: "elma", imageUrl: "/images/2809.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2808, word: "elma", imageUrl: "/images/2808.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 21,
        question: "Hangi elma çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi elma çeyrek?', correct: 'Evet! Bu elma çeyrek.', wrong: 'Hayır, bu elma yarım.' }
        },
        options: [
            { id: 2808, word: "elma", imageUrl: "/images/2808.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2809, word: "elma", imageUrl: "/images/2809.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 22,
        question: "Hangi elma bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi elma bütün?', correct: 'Evet! Bu elma bütün.', wrong: 'Hayır, bu elma çeyrek.' }
        },
        options: [
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2808, word: "elma", imageUrl: "/images/2808.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 23,
        question: "Hangi elma çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi elma çeyrek?', correct: 'Evet! Bu elma çeyrek.', wrong: 'Hayır, bu elma bütün.' }
        },
        options: [
            { id: 2808, word: "elma", imageUrl: "/images/2808.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 24,
        question: "Hangi elma tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi elma tam?', correct: 'Evet! Bu elma tam.', wrong: 'Hayır, bu elma çeyrek.' }
        },
        options: [
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2808, word: "elma", imageUrl: "/images/2808.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // karpuz
    {
        id: 25,
        question: "Hangi karpuz bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi karpuz bütün?', correct: 'Evet! Bu karpuz bütün.', wrong: 'Hayır, bu karpuz yarım.' }
        },
        options: [
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2812, word: "karpuz", imageUrl: "/images/2812.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 26,
        question: "Hangi karpuz yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi karpuz yarım?', correct: 'Evet! Bu karpuz yarım.', wrong: 'Hayır, bu karpuz bütün.' }
        },
        options: [
            { id: 2812, word: "karpuz", imageUrl: "/images/2812.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 27,
        question: "Hangi karpuz tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi karpuz tam?', correct: 'Evet! Bu karpuz tam.', wrong: 'Hayır, bu karpuz yarım.' }
        },
        options: [
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2812, word: "karpuz", imageUrl: "/images/2812.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 28,
        question: "Hangi karpuz yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi karpuz yarım?', correct: 'Evet! Bu karpuz yarım.', wrong: 'Hayır, bu karpuz çeyrek.' }
        },
        options: [
            { id: 2812, word: "karpuz", imageUrl: "/images/2812.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2811, word: "karpuz", imageUrl: "/images/2811.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 29,
        question: "Hangi karpuz çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi karpuz çeyrek?', correct: 'Evet! Bu karpuz çeyrek.', wrong: 'Hayır, bu karpuz yarım.' }
        },
        options: [
            { id: 2811, word: "karpuz", imageUrl: "/images/2811.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2812, word: "karpuz", imageUrl: "/images/2812.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 30,
        question: "Hangi karpuz bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi karpuz bütün?', correct: 'Evet! Bu karpuz bütün.', wrong: 'Hayır, bu karpuz çeyrek.' }
        },
        options: [
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2811, word: "karpuz", imageUrl: "/images/2811.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 31,
        question: "Hangi karpuz çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi karpuz çeyrek?', correct: 'Evet! Bu karpuz çeyrek.', wrong: 'Hayır, bu karpuz bütün.' }
        },
        options: [
            { id: 2811, word: "karpuz", imageUrl: "/images/2811.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 32,
        question: "Hangi karpuz tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi karpuz tam?', correct: 'Evet! Bu karpuz tam.', wrong: 'Hayır, bu karpuz çeyrek.' }
        },
        options: [
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 2811, word: "karpuz", imageUrl: "/images/2811.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    // limon
    {
        id: 33,
        question: "Hangi limon bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi limon bütün?', correct: 'Evet! Bu limon bütün.', wrong: 'Hayır, bu limon yarım.' }
        },
        options: [
            { id: 2813, word: "limon", imageUrl: "/images/2813.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2815, word: "limon", imageUrl: "/images/2815.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 34,
        question: "Hangi limon yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi limon yarım?', correct: 'Evet! Bu limon yarım.', wrong: 'Hayır, bu limon bütün.' }
        },
        options: [
            { id: 2815, word: "limon", imageUrl: "/images/2815.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2813, word: "limon", imageUrl: "/images/2813.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 35,
        question: "Hangi limon tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi limon tam?', correct: 'Evet! Bu limon tam.', wrong: 'Hayır, bu limon yarım.' }
        },
        options: [
            { id: 2813, word: "limon", imageUrl: "/images/2813.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2815, word: "limon", imageUrl: "/images/2815.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 36,
        question: "Hangi limon yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi limon yarım?', correct: 'Evet! Bu limon yarım.', wrong: 'Hayır, bu limon çeyrek.' }
        },
        options: [
            { id: 2815, word: "limon", imageUrl: "/images/2815.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2814, word: "limon", imageUrl: "/images/2814.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 37,
        question: "Hangi limon çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi limon çeyrek?', correct: 'Evet! Bu limon çeyrek.', wrong: 'Hayır, bu limon yarım.' }
        },
        options: [
            { id: 2814, word: "limon", imageUrl: "/images/2814.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2815, word: "limon", imageUrl: "/images/2815.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 38,
        question: "Hangi limon bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi limon bütün?', correct: 'Evet! Bu limon bütün.', wrong: 'Hayır, bu limon çeyrek.' }
        },
        options: [
            { id: 2813, word: "limon", imageUrl: "/images/2813.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2814, word: "limon", imageUrl: "/images/2814.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 39,
        question: "Hangi limon çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi limon çeyrek?', correct: 'Evet! Bu limon çeyrek.', wrong: 'Hayır, bu limon bütün.' }
        },
        options: [
            { id: 2814, word: "limon", imageUrl: "/images/2814.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2813, word: "limon", imageUrl: "/images/2813.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    {
        id: 40,
        question: "Hangi limon tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi limon tam?', correct: 'Evet! Bu limon tam.', wrong: 'Hayır, bu limon çeyrek.' }
        },
        options: [
            { id: 2813, word: "limon", imageUrl: "/images/2813.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2814, word: "limon", imageUrl: "/images/2814.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    // pasta
    {
        id: 41,
        question: "Hangi pasta bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pasta bütün?', correct: 'Evet! Bu pasta bütün.', wrong: 'Hayır, bu pasta yarım.' }
        },
        options: [
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2818, word: "pasta", imageUrl: "/images/2818.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 42,
        question: "Hangi pasta yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pasta yarım?', correct: 'Evet! Bu pasta yarım.', wrong: 'Hayır, bu pasta bütün.' }
        },
        options: [
            { id: 2818, word: "pasta", imageUrl: "/images/2818.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 43,
        question: "Hangi pasta tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pasta tam?', correct: 'Evet! Bu pasta tam.', wrong: 'Hayır, bu pasta yarım.' }
        },
        options: [
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2818, word: "pasta", imageUrl: "/images/2818.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 44,
        question: "Hangi pasta yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pasta yarım?', correct: 'Evet! Bu pasta yarım.', wrong: 'Hayır, bu pasta çeyrek.' }
        },
        options: [
            { id: 2818, word: "pasta", imageUrl: "/images/2818.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2817, word: "pasta", imageUrl: "/images/2817.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 45,
        question: "Hangi pasta çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pasta çeyrek?', correct: 'Evet! Bu pasta çeyrek.', wrong: 'Hayır, bu pasta yarım.' }
        },
        options: [
            { id: 2817, word: "pasta", imageUrl: "/images/2817.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2818, word: "pasta", imageUrl: "/images/2818.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 46,
        question: "Hangi pasta bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pasta bütün?', correct: 'Evet! Bu pasta bütün.', wrong: 'Hayır, bu pasta çeyrek.' }
        },
        options: [
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2817, word: "pasta", imageUrl: "/images/2817.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 47,
        question: "Hangi pasta çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pasta çeyrek?', correct: 'Evet! Bu pasta çeyrek.', wrong: 'Hayır, bu pasta bütün.' }
        },
        options: [
            { id: 2817, word: "pasta", imageUrl: "/images/2817.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 48,
        question: "Hangi pasta tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pasta tam?', correct: 'Evet! Bu pasta tam.', wrong: 'Hayır, bu pasta çeyrek.' }
        },
        options: [
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 2817, word: "pasta", imageUrl: "/images/2817.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    // pizza
    {
        id: 49,
        question: "Hangi pizza bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pizza bütün?', correct: 'Evet! Bu pizza bütün.', wrong: 'Hayır, bu pizza yarım.' }
        },
        options: [
            { id: 2819, word: "pizza", imageUrl: "/images/2819.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2821, word: "pizza", imageUrl: "/images/2821.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 50,
        question: "Hangi pizza yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pizza yarım?', correct: 'Evet! Bu pizza yarım.', wrong: 'Hayır, bu pizza bütün.' }
        },
        options: [
            { id: 2821, word: "pizza", imageUrl: "/images/2821.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2819, word: "pizza", imageUrl: "/images/2819.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 51,
        question: "Hangi pizza tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pizza tam?', correct: 'Evet! Bu pizza tam.', wrong: 'Hayır, bu pizza yarım.' }
        },
        options: [
            { id: 2819, word: "pizza", imageUrl: "/images/2819.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2821, word: "pizza", imageUrl: "/images/2821.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 52,
        question: "Hangi pizza yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pizza yarım?', correct: 'Evet! Bu pizza yarım.', wrong: 'Hayır, bu pizza çeyrek.' }
        },
        options: [
            { id: 2821, word: "pizza", imageUrl: "/images/2821.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2820, word: "pizza", imageUrl: "/images/2820.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 53,
        question: "Hangi pizza çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pizza çeyrek?', correct: 'Evet! Bu pizza çeyrek.', wrong: 'Hayır, bu pizza yarım.' }
        },
        options: [
            { id: 2820, word: "pizza", imageUrl: "/images/2820.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2821, word: "pizza", imageUrl: "/images/2821.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 54,
        question: "Hangi pizza bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pizza bütün?', correct: 'Evet! Bu pizza bütün.', wrong: 'Hayır, bu pizza çeyrek.' }
        },
        options: [
            { id: 2819, word: "pizza", imageUrl: "/images/2819.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2820, word: "pizza", imageUrl: "/images/2820.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 55,
        question: "Hangi pizza çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pizza çeyrek?', correct: 'Evet! Bu pizza çeyrek.', wrong: 'Hayır, bu pizza bütün.' }
        },
        options: [
            { id: 2820, word: "pizza", imageUrl: "/images/2820.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2819, word: "pizza", imageUrl: "/images/2819.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    {
        id: 56,
        question: "Hangi pizza tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi pizza tam?', correct: 'Evet! Bu pizza tam.', wrong: 'Hayır, bu pizza çeyrek.' }
        },
        options: [
            { id: 2819, word: "pizza", imageUrl: "/images/2819.webp", isCorrect: true, audioKey: "pizza", spokenText: "pizza" },
            { id: 2820, word: "pizza", imageUrl: "/images/2820.webp", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    // portakal
    {
        id: 57,
        question: "Hangi portakal bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi portakal bütün?', correct: 'Evet! Bu portakal bütün.', wrong: 'Hayır, bu portakal yarım.' }
        },
        options: [
            { id: 2822, word: "portakal", imageUrl: "/images/2822.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2824, word: "portakal", imageUrl: "/images/2824.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 58,
        question: "Hangi portakal yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi portakal yarım?', correct: 'Evet! Bu portakal yarım.', wrong: 'Hayır, bu portakal bütün.' }
        },
        options: [
            { id: 2824, word: "portakal", imageUrl: "/images/2824.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2822, word: "portakal", imageUrl: "/images/2822.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 59,
        question: "Hangi portakal tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi portakal tam?', correct: 'Evet! Bu portakal tam.', wrong: 'Hayır, bu portakal yarım.' }
        },
        options: [
            { id: 2822, word: "portakal", imageUrl: "/images/2822.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2824, word: "portakal", imageUrl: "/images/2824.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 60,
        question: "Hangi portakal yarım?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi portakal yarım?', correct: 'Evet! Bu portakal yarım.', wrong: 'Hayır, bu portakal çeyrek.' }
        },
        options: [
            { id: 2824, word: "portakal", imageUrl: "/images/2824.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2823, word: "portakal", imageUrl: "/images/2823.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 61,
        question: "Hangi portakal çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi portakal çeyrek?', correct: 'Evet! Bu portakal çeyrek.', wrong: 'Hayır, bu portakal yarım.' }
        },
        options: [
            { id: 2823, word: "portakal", imageUrl: "/images/2823.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2824, word: "portakal", imageUrl: "/images/2824.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 62,
        question: "Hangi portakal bütün?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi portakal bütün?', correct: 'Evet! Bu portakal bütün.', wrong: 'Hayır, bu portakal çeyrek.' }
        },
        options: [
            { id: 2822, word: "portakal", imageUrl: "/images/2822.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2823, word: "portakal", imageUrl: "/images/2823.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 63,
        question: "Hangi portakal çeyrek?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi portakal çeyrek?', correct: 'Evet! Bu portakal çeyrek.', wrong: 'Hayır, bu portakal bütün.' }
        },
        options: [
            { id: 2823, word: "portakal", imageUrl: "/images/2823.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2822, word: "portakal", imageUrl: "/images/2822.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 64,
        question: "Hangi portakal tam?",
        questionAudioKey: "",
        activityType: ActivityType.HalfQuarterWhole,
        speech: {
            tr: { question: 'Hangi portakal tam?', correct: 'Evet! Bu portakal tam.', wrong: 'Hayır, bu portakal çeyrek.' }
        },
        options: [
            { id: 2822, word: "portakal", imageUrl: "/images/2822.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 2823, word: "portakal", imageUrl: "/images/2823.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
];
