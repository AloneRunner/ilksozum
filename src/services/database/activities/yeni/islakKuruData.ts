// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (islak-kuru). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/islak-kuru/ → id 3301-3319.
import { ConceptRound, ActivityType } from '../../../../types';

export const wetDryDataYeni: ConceptRound[] = [
    // çorap
    {
        id: 1,
        question: "Hangi çorap ıslak?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi çorap ıslak?', correct: 'Evet! Bu çorap ıslak.', wrong: 'Hayır, bu çorap kuru.', wrongOlumsuz: 'Hayır, bu çorap ıslak değil.' }
        },
        options: [
            { id: 3301, word: "çorap", imageUrl: "/images/3301.webp", isCorrect: true, audioKey: "çorap", spokenText: "çorap" },
            { id: 3302, word: "çorap", imageUrl: "/images/3302.webp", isCorrect: false, audioKey: "çorap", spokenText: "çorap" }
        ]
    },
    {
        id: 2,
        question: "Hangi çorap kuru?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi çorap kuru?', correct: 'Evet! Bu çorap kuru.', wrong: 'Hayır, bu çorap ıslak.', wrongOlumsuz: 'Hayır, bu çorap kuru değil.' }
        },
        options: [
            { id: 3302, word: "çorap", imageUrl: "/images/3302.webp", isCorrect: true, audioKey: "çorap", spokenText: "çorap" },
            { id: 3301, word: "çorap", imageUrl: "/images/3301.webp", isCorrect: false, audioKey: "çorap", spokenText: "çorap" }
        ]
    },
    // havlu
    {
        id: 3,
        question: "Hangi havlu ıslak?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi havlu ıslak?', correct: 'Evet! Bu havlu ıslak.', wrong: 'Hayır, bu havlu kuru.', wrongOlumsuz: 'Hayır, bu havlu ıslak değil.' }
        },
        options: [
            { id: 3303, word: "havlu", imageUrl: "/images/3303.webp", isCorrect: true, audioKey: "havlu", spokenText: "havlu" },
            { id: 3304, word: "havlu", imageUrl: "/images/3304.webp", isCorrect: false, audioKey: "havlu", spokenText: "havlu" }
        ]
    },
    {
        id: 4,
        question: "Hangi havlu kuru?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi havlu kuru?', correct: 'Evet! Bu havlu kuru.', wrong: 'Hayır, bu havlu ıslak.', wrongOlumsuz: 'Hayır, bu havlu kuru değil.' }
        },
        options: [
            { id: 3304, word: "havlu", imageUrl: "/images/3304.webp", isCorrect: true, audioKey: "havlu", spokenText: "havlu" },
            { id: 3303, word: "havlu", imageUrl: "/images/3303.webp", isCorrect: false, audioKey: "havlu", spokenText: "havlu" }
        ]
    },
    // kum
    {
        id: 5,
        question: "Hangi kum ıslak?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi kum ıslak?', correct: 'Evet! Bu kum ıslak.', wrong: 'Hayır, bu kum kuru.', wrongOlumsuz: 'Hayır, bu kum ıslak değil.' }
        },
        options: [
            { id: 3305, word: "kum", imageUrl: "/images/3305.webp", isCorrect: true, audioKey: "kum", spokenText: "kum" },
            { id: 3306, word: "kum", imageUrl: "/images/3306.webp", isCorrect: false, audioKey: "kum", spokenText: "kum" }
        ]
    },
    {
        id: 6,
        question: "Hangi kum kuru?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi kum kuru?', correct: 'Evet! Bu kum kuru.', wrong: 'Hayır, bu kum ıslak.', wrongOlumsuz: 'Hayır, bu kum kuru değil.' }
        },
        options: [
            { id: 3306, word: "kum", imageUrl: "/images/3306.webp", isCorrect: true, audioKey: "kum", spokenText: "kum" },
            { id: 3305, word: "kum", imageUrl: "/images/3305.webp", isCorrect: false, audioKey: "kum", spokenText: "kum" }
        ]
    },
    // saç
    {
        id: 7,
        question: "Hangi çocuğun saçı ıslak?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi çocuğun saçı ıslak?', correct: 'Evet! Bu saçlar ıslak.', wrong: 'Hayır, bu saçlar kuru.', wrongOlumsuz: 'Hayır, bu saçlar ıslak değil.' }
        },
        options: [
            { id: 3307, word: "saç", imageUrl: "/images/3307.webp", isCorrect: true, audioKey: "saç", spokenText: "saç" },
            { id: 3308, word: "saç", imageUrl: "/images/3308.webp", isCorrect: false, audioKey: "saç", spokenText: "saç" }
        ]
    },
    {
        id: 8,
        question: "Hangi çocuğun saçı kuru?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi çocuğun saçı kuru?', correct: 'Evet! Bu saçlar kuru.', wrong: 'Hayır, bu saçlar ıslak.', wrongOlumsuz: 'Hayır, bu saçlar kuru değil.' }
        },
        options: [
            { id: 3308, word: "saç", imageUrl: "/images/3308.webp", isCorrect: true, audioKey: "saç", spokenText: "saç" },
            { id: 3307, word: "saç", imageUrl: "/images/3307.webp", isCorrect: false, audioKey: "saç", spokenText: "saç" }
        ]
    },
    // şemsiye
    {
        id: 9,
        question: "Hangi şemsiye ıslak?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi şemsiye ıslak?', correct: 'Evet! Bu şemsiye ıslak.', wrong: 'Hayır, bu şemsiye kuru.', wrongOlumsuz: 'Hayır, bu şemsiye ıslak değil.' }
        },
        options: [
            { id: 3309, word: "şemsiye", imageUrl: "/images/3309.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 3019, word: "şemsiye", imageUrl: "/images/3019.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 10,
        question: "Hangi şemsiye kuru?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi şemsiye kuru?', correct: 'Evet! Bu şemsiye kuru.', wrong: 'Hayır, bu şemsiye ıslak.', wrongOlumsuz: 'Hayır, bu şemsiye kuru değil.' }
        },
        options: [
            { id: 3019, word: "şemsiye", imageUrl: "/images/3019.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 3309, word: "şemsiye", imageUrl: "/images/3309.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    // sünger
    {
        id: 11,
        question: "Hangi sünger ıslak?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi sünger ıslak?', correct: 'Evet! Bu sünger ıslak.', wrong: 'Hayır, bu sünger kuru.', wrongOlumsuz: 'Hayır, bu sünger ıslak değil.' }
        },
        options: [
            { id: 3310, word: "sünger", imageUrl: "/images/3310.webp", isCorrect: true, audioKey: "sünger", spokenText: "sünger" },
            { id: 3311, word: "sünger", imageUrl: "/images/3311.webp", isCorrect: false, audioKey: "sünger", spokenText: "sünger" }
        ]
    },
    {
        id: 12,
        question: "Hangi sünger kuru?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi sünger kuru?', correct: 'Evet! Bu sünger kuru.', wrong: 'Hayır, bu sünger ıslak.', wrongOlumsuz: 'Hayır, bu sünger kuru değil.' }
        },
        options: [
            { id: 3311, word: "sünger", imageUrl: "/images/3311.webp", isCorrect: true, audioKey: "sünger", spokenText: "sünger" },
            { id: 3310, word: "sünger", imageUrl: "/images/3310.webp", isCorrect: false, audioKey: "sünger", spokenText: "sünger" }
        ]
    },
    // tişört
    {
        id: 13,
        question: "Hangi tişört ıslak?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi tişört ıslak?', correct: 'Evet! Bu tişört ıslak.', wrong: 'Hayır, bu tişört kuru.', wrongOlumsuz: 'Hayır, bu tişört ıslak değil.' }
        },
        options: [
            { id: 3312, word: "tişört", imageUrl: "/images/3312.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 3313, word: "tişört", imageUrl: "/images/3313.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 14,
        question: "Hangi tişört kuru?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi tişört kuru?', correct: 'Evet! Bu tişört kuru.', wrong: 'Hayır, bu tişört ıslak.', wrongOlumsuz: 'Hayır, bu tişört kuru değil.' }
        },
        options: [
            { id: 3313, word: "tişört", imageUrl: "/images/3313.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 3312, word: "tişört", imageUrl: "/images/3312.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    // toprak
    {
        id: 15,
        question: "Hangi toprak ıslak?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi toprak ıslak?', correct: 'Evet! Bu toprak ıslak.', wrong: 'Hayır, bu toprak kuru.', wrongOlumsuz: 'Hayır, bu toprak ıslak değil.' }
        },
        options: [
            { id: 3314, word: "toprak", imageUrl: "/images/3314.webp", isCorrect: true, audioKey: "toprak", spokenText: "toprak" },
            { id: 3315, word: "toprak", imageUrl: "/images/3315.webp", isCorrect: false, audioKey: "toprak", spokenText: "toprak" }
        ]
    },
    {
        id: 16,
        question: "Hangi toprak kuru?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi toprak kuru?', correct: 'Evet! Bu toprak kuru.', wrong: 'Hayır, bu toprak ıslak.', wrongOlumsuz: 'Hayır, bu toprak kuru değil.' }
        },
        options: [
            { id: 3315, word: "toprak", imageUrl: "/images/3315.webp", isCorrect: true, audioKey: "toprak", spokenText: "toprak" },
            { id: 3314, word: "toprak", imageUrl: "/images/3314.webp", isCorrect: false, audioKey: "toprak", spokenText: "toprak" }
        ]
    },
    // yaprak
    {
        id: 17,
        question: "Hangi yaprak ıslak?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi yaprak ıslak?', correct: 'Evet! Bu yaprak ıslak.', wrong: 'Hayır, bu yaprak kuru.', wrongOlumsuz: 'Hayır, bu yaprak ıslak değil.' }
        },
        options: [
            { id: 3316, word: "yaprak", imageUrl: "/images/3316.webp", isCorrect: true, audioKey: "yaprak", spokenText: "yaprak" },
            { id: 3317, word: "yaprak", imageUrl: "/images/3317.webp", isCorrect: false, audioKey: "yaprak", spokenText: "yaprak" }
        ]
    },
    {
        id: 18,
        question: "Hangi yaprak kuru?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi yaprak kuru?', correct: 'Evet! Bu yaprak kuru.', wrong: 'Hayır, bu yaprak ıslak.', wrongOlumsuz: 'Hayır, bu yaprak kuru değil.' }
        },
        options: [
            { id: 3317, word: "yaprak", imageUrl: "/images/3317.webp", isCorrect: true, audioKey: "yaprak", spokenText: "yaprak" },
            { id: 3316, word: "yaprak", imageUrl: "/images/3316.webp", isCorrect: false, audioKey: "yaprak", spokenText: "yaprak" }
        ]
    },
    // yer
    {
        id: 19,
        question: "Hangi yer ıslak?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi yer ıslak?', correct: 'Evet! Bu yer ıslak.', wrong: 'Hayır, bu yer kuru.', wrongOlumsuz: 'Hayır, bu yer ıslak değil.' }
        },
        options: [
            { id: 3318, word: "yer", imageUrl: "/images/3318.webp", isCorrect: true, audioKey: "yer", spokenText: "yer" },
            { id: 3319, word: "yer", imageUrl: "/images/3319.webp", isCorrect: false, audioKey: "yer", spokenText: "yer" }
        ]
    },
    {
        id: 20,
        question: "Hangi yer kuru?",
        questionAudioKey: "",
        activityType: ActivityType.WetDry,
        speech: {
            tr: { question: 'Hangi yer kuru?', correct: 'Evet! Bu yer kuru.', wrong: 'Hayır, bu yer ıslak.', wrongOlumsuz: 'Hayır, bu yer kuru değil.' }
        },
        options: [
            { id: 3319, word: "yer", imageUrl: "/images/3319.webp", isCorrect: true, audioKey: "yer", spokenText: "yer" },
            { id: 3318, word: "yer", imageUrl: "/images/3318.webp", isCorrect: false, audioKey: "yer", spokenText: "yer" }
        ]
    },
];
