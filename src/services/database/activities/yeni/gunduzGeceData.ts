// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (gunduz-gece). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/gunduz-gece/ → id 5901-5920.
import { ConceptRound, ActivityType } from '../../../../types';

export const dayNightDataYeni: ConceptRound[] = [
    // ahır
    {
        id: 1,
        question: "Hangi resimde gündüz?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gündüz?', correct: 'Evet! Burada gündüz.', wrong: 'Hayır, burada gece.' }
        },
        options: [
            { id: 5902, word: "ahır", imageUrl: "/images/5902.webp", isCorrect: true, audioKey: "ahır", spokenText: "ahır" },
            { id: 5901, word: "ahır", imageUrl: "/images/5901.webp", isCorrect: false, audioKey: "ahır", spokenText: "ahır" }
        ]
    },
    {
        id: 2,
        question: "Hangi resimde gece?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gece?', correct: 'Evet! Burada gece.', wrong: 'Hayır, burada gündüz.' }
        },
        options: [
            { id: 5901, word: "ahır", imageUrl: "/images/5901.webp", isCorrect: true, audioKey: "ahır", spokenText: "ahır" },
            { id: 5902, word: "ahır", imageUrl: "/images/5902.webp", isCorrect: false, audioKey: "ahır", spokenText: "ahır" }
        ]
    },
    // bahçe
    {
        id: 3,
        question: "Hangi resimde gündüz?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gündüz?', correct: 'Evet! Burada gündüz.', wrong: 'Hayır, burada gece.' }
        },
        options: [
            { id: 5904, word: "bahçe", imageUrl: "/images/5904.webp", isCorrect: true, audioKey: "bahçe", spokenText: "bahçe" },
            { id: 5903, word: "bahçe", imageUrl: "/images/5903.webp", isCorrect: false, audioKey: "bahçe", spokenText: "bahçe" }
        ]
    },
    {
        id: 4,
        question: "Hangi resimde gece?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gece?', correct: 'Evet! Burada gece.', wrong: 'Hayır, burada gündüz.' }
        },
        options: [
            { id: 5903, word: "bahçe", imageUrl: "/images/5903.webp", isCorrect: true, audioKey: "bahçe", spokenText: "bahçe" },
            { id: 5904, word: "bahçe", imageUrl: "/images/5904.webp", isCorrect: false, audioKey: "bahçe", spokenText: "bahçe" }
        ]
    },
    // çadır
    {
        id: 5,
        question: "Hangi resimde gündüz?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gündüz?', correct: 'Evet! Burada gündüz.', wrong: 'Hayır, burada gece.' }
        },
        options: [
            { id: 5906, word: "çadır", imageUrl: "/images/5906.webp", isCorrect: true, audioKey: "çadır", spokenText: "çadır" },
            { id: 5905, word: "çadır", imageUrl: "/images/5905.webp", isCorrect: false, audioKey: "çadır", spokenText: "çadır" }
        ]
    },
    {
        id: 6,
        question: "Hangi resimde gece?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gece?', correct: 'Evet! Burada gece.', wrong: 'Hayır, burada gündüz.' }
        },
        options: [
            { id: 5905, word: "çadır", imageUrl: "/images/5905.webp", isCorrect: true, audioKey: "çadır", spokenText: "çadır" },
            { id: 5906, word: "çadır", imageUrl: "/images/5906.webp", isCorrect: false, audioKey: "çadır", spokenText: "çadır" }
        ]
    },
    // ev
    {
        id: 7,
        question: "Hangi resimde gündüz?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gündüz?', correct: 'Evet! Burada gündüz.', wrong: 'Hayır, burada gece.' }
        },
        options: [
            { id: 5908, word: "ev", imageUrl: "/images/5908.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 5907, word: "ev", imageUrl: "/images/5907.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    {
        id: 8,
        question: "Hangi resimde gece?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gece?', correct: 'Evet! Burada gece.', wrong: 'Hayır, burada gündüz.' }
        },
        options: [
            { id: 5907, word: "ev", imageUrl: "/images/5907.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 5908, word: "ev", imageUrl: "/images/5908.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    // kasaba
    {
        id: 9,
        question: "Hangi resimde gündüz?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gündüz?', correct: 'Evet! Burada gündüz.', wrong: 'Hayır, burada gece.' }
        },
        options: [
            { id: 5910, word: "kasaba", imageUrl: "/images/5910.webp", isCorrect: true, audioKey: "kasaba", spokenText: "kasaba" },
            { id: 5909, word: "kasaba", imageUrl: "/images/5909.webp", isCorrect: false, audioKey: "kasaba", spokenText: "kasaba" }
        ]
    },
    {
        id: 10,
        question: "Hangi resimde gece?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gece?', correct: 'Evet! Burada gece.', wrong: 'Hayır, burada gündüz.' }
        },
        options: [
            { id: 5909, word: "kasaba", imageUrl: "/images/5909.webp", isCorrect: true, audioKey: "kasaba", spokenText: "kasaba" },
            { id: 5910, word: "kasaba", imageUrl: "/images/5910.webp", isCorrect: false, audioKey: "kasaba", spokenText: "kasaba" }
        ]
    },
    // park
    {
        id: 11,
        question: "Hangi resimde gündüz?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gündüz?', correct: 'Evet! Burada gündüz.', wrong: 'Hayır, burada gece.' }
        },
        options: [
            { id: 5912, word: "park", imageUrl: "/images/5912.webp", isCorrect: true, audioKey: "park", spokenText: "park" },
            { id: 5911, word: "park", imageUrl: "/images/5911.webp", isCorrect: false, audioKey: "park", spokenText: "park" }
        ]
    },
    {
        id: 12,
        question: "Hangi resimde gece?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gece?', correct: 'Evet! Burada gece.', wrong: 'Hayır, burada gündüz.' }
        },
        options: [
            { id: 5911, word: "park", imageUrl: "/images/5911.webp", isCorrect: true, audioKey: "park", spokenText: "park" },
            { id: 5912, word: "park", imageUrl: "/images/5912.webp", isCorrect: false, audioKey: "park", spokenText: "park" }
        ]
    },
    // pencere
    {
        id: 13,
        question: "Hangi resimde gündüz?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gündüz?', correct: 'Evet! Burada gündüz.', wrong: 'Hayır, burada gece.' }
        },
        options: [
            { id: 5914, word: "pencere", imageUrl: "/images/5914.webp", isCorrect: true, audioKey: "pencere", spokenText: "pencere" },
            { id: 5913, word: "pencere", imageUrl: "/images/5913.webp", isCorrect: false, audioKey: "pencere", spokenText: "pencere" }
        ]
    },
    {
        id: 14,
        question: "Hangi resimde gece?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gece?', correct: 'Evet! Burada gece.', wrong: 'Hayır, burada gündüz.' }
        },
        options: [
            { id: 5913, word: "pencere", imageUrl: "/images/5913.webp", isCorrect: true, audioKey: "pencere", spokenText: "pencere" },
            { id: 5914, word: "pencere", imageUrl: "/images/5914.webp", isCorrect: false, audioKey: "pencere", spokenText: "pencere" }
        ]
    },
    // plaj
    {
        id: 15,
        question: "Hangi resimde gündüz?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gündüz?', correct: 'Evet! Burada gündüz.', wrong: 'Hayır, burada gece.' }
        },
        options: [
            { id: 5916, word: "plaj", imageUrl: "/images/5916.webp", isCorrect: true, audioKey: "plaj", spokenText: "plaj" },
            { id: 5915, word: "plaj", imageUrl: "/images/5915.webp", isCorrect: false, audioKey: "plaj", spokenText: "plaj" }
        ]
    },
    {
        id: 16,
        question: "Hangi resimde gece?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gece?', correct: 'Evet! Burada gece.', wrong: 'Hayır, burada gündüz.' }
        },
        options: [
            { id: 5915, word: "plaj", imageUrl: "/images/5915.webp", isCorrect: true, audioKey: "plaj", spokenText: "plaj" },
            { id: 5916, word: "plaj", imageUrl: "/images/5916.webp", isCorrect: false, audioKey: "plaj", spokenText: "plaj" }
        ]
    },
    // sandal
    {
        id: 17,
        question: "Hangi resimde gündüz?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gündüz?', correct: 'Evet! Burada gündüz.', wrong: 'Hayır, burada gece.' }
        },
        options: [
            { id: 5918, word: "sandal", imageUrl: "/images/5918.webp", isCorrect: true, audioKey: "sandal", spokenText: "sandal" },
            { id: 5917, word: "sandal", imageUrl: "/images/5917.webp", isCorrect: false, audioKey: "sandal", spokenText: "sandal" }
        ]
    },
    {
        id: 18,
        question: "Hangi resimde gece?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gece?', correct: 'Evet! Burada gece.', wrong: 'Hayır, burada gündüz.' }
        },
        options: [
            { id: 5917, word: "sandal", imageUrl: "/images/5917.webp", isCorrect: true, audioKey: "sandal", spokenText: "sandal" },
            { id: 5918, word: "sandal", imageUrl: "/images/5918.webp", isCorrect: false, audioKey: "sandal", spokenText: "sandal" }
        ]
    },
    // sokak
    {
        id: 19,
        question: "Hangi resimde gündüz?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gündüz?', correct: 'Evet! Burada gündüz.', wrong: 'Hayır, burada gece.' }
        },
        options: [
            { id: 5920, word: "sokak", imageUrl: "/images/5920.webp", isCorrect: true, audioKey: "sokak", spokenText: "sokak" },
            { id: 5919, word: "sokak", imageUrl: "/images/5919.webp", isCorrect: false, audioKey: "sokak", spokenText: "sokak" }
        ]
    },
    {
        id: 20,
        question: "Hangi resimde gece?",
        questionAudioKey: "",
        activityType: ActivityType.DayNight,
        speech: {
            tr: { question: 'Hangi resimde gece?', correct: 'Evet! Burada gece.', wrong: 'Hayır, burada gündüz.' }
        },
        options: [
            { id: 5919, word: "sokak", imageUrl: "/images/5919.webp", isCorrect: true, audioKey: "sokak", spokenText: "sokak" },
            { id: 5920, word: "sokak", imageUrl: "/images/5920.webp", isCorrect: false, audioKey: "sokak", spokenText: "sokak" }
        ]
    },
];
