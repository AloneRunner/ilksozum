// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (genis-dar). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/genis-dar/ → id 2201-2222.
import { ConceptRound, ActivityType } from '../../../../types';

export const wideNarrowDataYeni: ConceptRound[] = [
    // kapı
    {
        id: 1,
        question: "Hangi kapı geniş?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi kapı geniş?', correct: 'Evet! Bu kapı geniş.', wrong: 'Hayır, bu kapı dar.', wrongOlumsuz: 'Hayır, bu kapı geniş değil.' }
        },
        options: [
            { id: 2202, word: "kapı", imageUrl: "/images/2202.webp", isCorrect: true, audioKey: "kapı", spokenText: "kapı" },
            { id: 2201, word: "kapı", imageUrl: "/images/2201.webp", isCorrect: false, audioKey: "kapı", spokenText: "kapı" }
        ]
    },
    {
        id: 2,
        question: "Hangi kapı dar?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi kapı dar?', correct: 'Evet! Bu kapı dar.', wrong: 'Hayır, bu kapı geniş.', wrongOlumsuz: 'Hayır, bu kapı dar değil.' }
        },
        options: [
            { id: 2201, word: "kapı", imageUrl: "/images/2201.webp", isCorrect: true, audioKey: "kapı", spokenText: "kapı" },
            { id: 2202, word: "kapı", imageUrl: "/images/2202.webp", isCorrect: false, audioKey: "kapı", spokenText: "kapı" }
        ]
    },
    // kaydırak
    {
        id: 3,
        question: "Hangi kaydırak geniş?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi kaydırak geniş?', correct: 'Evet! Bu kaydırak geniş.', wrong: 'Hayır, bu kaydırak dar.', wrongOlumsuz: 'Hayır, bu kaydırak geniş değil.' }
        },
        options: [
            { id: 2205, word: "kaydırak", imageUrl: "/images/2205.webp", isCorrect: true, audioKey: "kaydırak", spokenText: "kaydırak" },
            { id: 2204, word: "kaydırak", imageUrl: "/images/2204.webp", isCorrect: false, audioKey: "kaydırak", spokenText: "kaydırak" }
        ]
    },
    {
        id: 4,
        question: "Hangi kaydırak dar?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi kaydırak dar?', correct: 'Evet! Bu kaydırak dar.', wrong: 'Hayır, bu kaydırak geniş.', wrongOlumsuz: 'Hayır, bu kaydırak dar değil.' }
        },
        options: [
            { id: 2204, word: "kaydırak", imageUrl: "/images/2204.webp", isCorrect: true, audioKey: "kaydırak", spokenText: "kaydırak" },
            { id: 2205, word: "kaydırak", imageUrl: "/images/2205.webp", isCorrect: false, audioKey: "kaydırak", spokenText: "kaydırak" }
        ]
    },
    // köprü
    {
        id: 5,
        question: "Hangi köprü geniş?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi köprü geniş?', correct: 'Evet! Bu köprü geniş.', wrong: 'Hayır, bu köprü dar.', wrongOlumsuz: 'Hayır, bu köprü geniş değil.' }
        },
        options: [
            { id: 2208, word: "köprü", imageUrl: "/images/2208.webp", isCorrect: true, audioKey: "köprü", spokenText: "köprü" },
            { id: 2207, word: "köprü", imageUrl: "/images/2207.webp", isCorrect: false, audioKey: "köprü", spokenText: "köprü" }
        ]
    },
    {
        id: 6,
        question: "Hangi köprü dar?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi köprü dar?', correct: 'Evet! Bu köprü dar.', wrong: 'Hayır, bu köprü geniş.', wrongOlumsuz: 'Hayır, bu köprü dar değil.' }
        },
        options: [
            { id: 2207, word: "köprü", imageUrl: "/images/2207.webp", isCorrect: true, audioKey: "köprü", spokenText: "köprü" },
            { id: 2208, word: "köprü", imageUrl: "/images/2208.webp", isCorrect: false, audioKey: "köprü", spokenText: "köprü" }
        ]
    },
    // koridor
    {
        id: 7,
        question: "Hangi koridor geniş?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi koridor geniş?', correct: 'Evet! Bu koridor geniş.', wrong: 'Hayır, bu koridor dar.', wrongOlumsuz: 'Hayır, bu koridor geniş değil.' }
        },
        options: [
            { id: 2210, word: "koridor", imageUrl: "/images/2210.webp", isCorrect: true, audioKey: "koridor", spokenText: "koridor" },
            { id: 2209, word: "koridor", imageUrl: "/images/2209.webp", isCorrect: false, audioKey: "koridor", spokenText: "koridor" }
        ]
    },
    {
        id: 8,
        question: "Hangi koridor dar?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi koridor dar?', correct: 'Evet! Bu koridor dar.', wrong: 'Hayır, bu koridor geniş.', wrongOlumsuz: 'Hayır, bu koridor dar değil.' }
        },
        options: [
            { id: 2209, word: "koridor", imageUrl: "/images/2209.webp", isCorrect: true, audioKey: "koridor", spokenText: "koridor" },
            { id: 2210, word: "koridor", imageUrl: "/images/2210.webp", isCorrect: false, audioKey: "koridor", spokenText: "koridor" }
        ]
    },
    // merdiven
    {
        id: 9,
        question: "Hangi merdiven geniş?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi merdiven geniş?', correct: 'Evet! Bu merdiven geniş.', wrong: 'Hayır, bu merdiven dar.', wrongOlumsuz: 'Hayır, bu merdiven geniş değil.' }
        },
        options: [
            { id: 2212, word: "merdiven", imageUrl: "/images/2212.webp", isCorrect: true, audioKey: "merdiven", spokenText: "merdiven" },
            { id: 2211, word: "merdiven", imageUrl: "/images/2211.webp", isCorrect: false, audioKey: "merdiven", spokenText: "merdiven" }
        ]
    },
    {
        id: 10,
        question: "Hangi merdiven dar?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi merdiven dar?', correct: 'Evet! Bu merdiven dar.', wrong: 'Hayır, bu merdiven geniş.', wrongOlumsuz: 'Hayır, bu merdiven dar değil.' }
        },
        options: [
            { id: 2211, word: "merdiven", imageUrl: "/images/2211.webp", isCorrect: true, audioKey: "merdiven", spokenText: "merdiven" },
            { id: 2212, word: "merdiven", imageUrl: "/images/2212.webp", isCorrect: false, audioKey: "merdiven", spokenText: "merdiven" }
        ]
    },
    // nehir
    {
        id: 11,
        question: "Hangi nehir geniş?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi nehir geniş?', correct: 'Evet! Bu nehir geniş.', wrong: 'Hayır, bu nehir dar.', wrongOlumsuz: 'Hayır, bu nehir geniş değil.' }
        },
        options: [
            { id: 2214, word: "nehir", imageUrl: "/images/2214.webp", isCorrect: true, audioKey: "nehir", spokenText: "nehir" },
            { id: 2213, word: "nehir", imageUrl: "/images/2213.webp", isCorrect: false, audioKey: "nehir", spokenText: "nehir" }
        ]
    },
    {
        id: 12,
        question: "Hangi nehir dar?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi nehir dar?', correct: 'Evet! Bu nehir dar.', wrong: 'Hayır, bu nehir geniş.', wrongOlumsuz: 'Hayır, bu nehir dar değil.' }
        },
        options: [
            { id: 2213, word: "nehir", imageUrl: "/images/2213.webp", isCorrect: true, audioKey: "nehir", spokenText: "nehir" },
            { id: 2214, word: "nehir", imageUrl: "/images/2214.webp", isCorrect: false, audioKey: "nehir", spokenText: "nehir" }
        ]
    },
    // pencere
    {
        id: 13,
        question: "Hangi pencere geniş?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi pencere geniş?', correct: 'Evet! Bu pencere geniş.', wrong: 'Hayır, bu pencere dar.', wrongOlumsuz: 'Hayır, bu pencere geniş değil.' }
        },
        options: [
            { id: 2216, word: "pencere", imageUrl: "/images/2216.webp", isCorrect: true, audioKey: "pencere", spokenText: "pencere" },
            { id: 2215, word: "pencere", imageUrl: "/images/2215.webp", isCorrect: false, audioKey: "pencere", spokenText: "pencere" }
        ]
    },
    {
        id: 14,
        question: "Hangi pencere dar?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi pencere dar?', correct: 'Evet! Bu pencere dar.', wrong: 'Hayır, bu pencere geniş.', wrongOlumsuz: 'Hayır, bu pencere dar değil.' }
        },
        options: [
            { id: 2215, word: "pencere", imageUrl: "/images/2215.webp", isCorrect: true, audioKey: "pencere", spokenText: "pencere" },
            { id: 2216, word: "pencere", imageUrl: "/images/2216.webp", isCorrect: false, audioKey: "pencere", spokenText: "pencere" }
        ]
    },
    // sokak
    {
        id: 15,
        question: "Hangi sokak geniş?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi sokak geniş?', correct: 'Evet! Bu sokak geniş.', wrong: 'Hayır, bu sokak dar.', wrongOlumsuz: 'Hayır, bu sokak geniş değil.' }
        },
        options: [
            { id: 2218, word: "sokak", imageUrl: "/images/2218.webp", isCorrect: true, audioKey: "sokak", spokenText: "sokak" },
            { id: 2217, word: "sokak", imageUrl: "/images/2217.webp", isCorrect: false, audioKey: "sokak", spokenText: "sokak" }
        ]
    },
    {
        id: 16,
        question: "Hangi sokak dar?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi sokak dar?', correct: 'Evet! Bu sokak dar.', wrong: 'Hayır, bu sokak geniş.', wrongOlumsuz: 'Hayır, bu sokak dar değil.' }
        },
        options: [
            { id: 2217, word: "sokak", imageUrl: "/images/2217.webp", isCorrect: true, audioKey: "sokak", spokenText: "sokak" },
            { id: 2218, word: "sokak", imageUrl: "/images/2218.webp", isCorrect: false, audioKey: "sokak", spokenText: "sokak" }
        ]
    },
    // tünel
    {
        id: 17,
        question: "Hangi tünel geniş?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi tünel geniş?', correct: 'Evet! Bu tünel geniş.', wrong: 'Hayır, bu tünel dar.', wrongOlumsuz: 'Hayır, bu tünel geniş değil.' }
        },
        options: [
            { id: 2220, word: "tünel", imageUrl: "/images/2220.webp", isCorrect: true, audioKey: "tünel", spokenText: "tünel" },
            { id: 2219, word: "tünel", imageUrl: "/images/2219.webp", isCorrect: false, audioKey: "tünel", spokenText: "tünel" }
        ]
    },
    {
        id: 18,
        question: "Hangi tünel dar?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi tünel dar?', correct: 'Evet! Bu tünel dar.', wrong: 'Hayır, bu tünel geniş.', wrongOlumsuz: 'Hayır, bu tünel dar değil.' }
        },
        options: [
            { id: 2219, word: "tünel", imageUrl: "/images/2219.webp", isCorrect: true, audioKey: "tünel", spokenText: "tünel" },
            { id: 2220, word: "tünel", imageUrl: "/images/2220.webp", isCorrect: false, audioKey: "tünel", spokenText: "tünel" }
        ]
    },
    // yol
    {
        id: 19,
        question: "Hangi yol geniş?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi yol geniş?', correct: 'Evet! Bu yol geniş.', wrong: 'Hayır, bu yol dar.', wrongOlumsuz: 'Hayır, bu yol geniş değil.' }
        },
        options: [
            { id: 2222, word: "yol", imageUrl: "/images/2222.webp", isCorrect: true, audioKey: "yol", spokenText: "yol" },
            { id: 2221, word: "yol", imageUrl: "/images/2221.webp", isCorrect: false, audioKey: "yol", spokenText: "yol" }
        ]
    },
    {
        id: 20,
        question: "Hangi yol dar?",
        questionAudioKey: "",
        activityType: ActivityType.WideNarrow,
        speech: {
            tr: { question: 'Hangi yol dar?', correct: 'Evet! Bu yol dar.', wrong: 'Hayır, bu yol geniş.', wrongOlumsuz: 'Hayır, bu yol dar değil.' }
        },
        options: [
            { id: 2221, word: "yol", imageUrl: "/images/2221.webp", isCorrect: true, audioKey: "yol", spokenText: "yol" },
            { id: 2222, word: "yol", imageUrl: "/images/2222.webp", isCorrect: false, audioKey: "yol", spokenText: "yol" }
        ]
    },
];
