// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (uzun-kisa). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/uzun-kisa/ → id 2401-2420.
import { ConceptRound, ActivityType } from '../../../../types';

export const longShortDataYeni: ConceptRound[] = [
    // atkı
    {
        id: 1,
        question: "Uzun olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Uzun olan hangisi?', correct: 'Evet! Atkı uzundur.', wrong: 'Hayır, bu atkı kısadır.' }
        },
        options: [
            { id: 2402, word: "atkı", imageUrl: "/images/2402.webp", isCorrect: true, audioKey: "atkı", spokenText: "atkı" },
            { id: 2401, word: "atkı", imageUrl: "/images/2401.webp", isCorrect: false, audioKey: "atkı", spokenText: "atkı" }
        ]
    },
    {
        id: 2,
        question: "Kısa olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Kısa olan hangisi?', correct: 'Evet! Atkı kısadır.', wrong: 'Hayır, bu atkı uzundur.' }
        },
        options: [
            { id: 2401, word: "atkı", imageUrl: "/images/2401.webp", isCorrect: true, audioKey: "atkı", spokenText: "atkı" },
            { id: 2402, word: "atkı", imageUrl: "/images/2402.webp", isCorrect: false, audioKey: "atkı", spokenText: "atkı" }
        ]
    },
    // bank
    {
        id: 3,
        question: "Uzun olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Uzun olan hangisi?', correct: 'Evet! Bank uzundur.', wrong: 'Hayır, bu bank kısadır.' }
        },
        options: [
            { id: 2404, word: "bank", imageUrl: "/images/2404.webp", isCorrect: true, audioKey: "bank", spokenText: "bank" },
            { id: 2403, word: "bank", imageUrl: "/images/2403.webp", isCorrect: false, audioKey: "bank", spokenText: "bank" }
        ]
    },
    {
        id: 4,
        question: "Kısa olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Kısa olan hangisi?', correct: 'Evet! Bank kısadır.', wrong: 'Hayır, bu bank uzundur.' }
        },
        options: [
            { id: 2403, word: "bank", imageUrl: "/images/2403.webp", isCorrect: true, audioKey: "bank", spokenText: "bank" },
            { id: 2404, word: "bank", imageUrl: "/images/2404.webp", isCorrect: false, audioKey: "bank", spokenText: "bank" }
        ]
    },
    // çorap
    {
        id: 5,
        question: "Uzun olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Uzun olan hangisi?', correct: 'Evet! Çorap uzundur.', wrong: 'Hayır, bu çorap kısadır.' }
        },
        options: [
            { id: 2406, word: "çorap", imageUrl: "/images/2406.webp", isCorrect: true, audioKey: "çorap", spokenText: "çorap" },
            { id: 2405, word: "çorap", imageUrl: "/images/2405.webp", isCorrect: false, audioKey: "çorap", spokenText: "çorap" }
        ]
    },
    {
        id: 6,
        question: "Kısa olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Kısa olan hangisi?', correct: 'Evet! Çorap kısadır.', wrong: 'Hayır, bu çorap uzundur.' }
        },
        options: [
            { id: 2405, word: "çorap", imageUrl: "/images/2405.webp", isCorrect: true, audioKey: "çorap", spokenText: "çorap" },
            { id: 2406, word: "çorap", imageUrl: "/images/2406.webp", isCorrect: false, audioKey: "çorap", spokenText: "çorap" }
        ]
    },
    // kalem
    {
        id: 7,
        question: "Uzun olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Uzun olan hangisi?', correct: 'Evet! Kalem uzundur.', wrong: 'Hayır, bu kalem kısadır.' }
        },
        options: [
            { id: 2408, word: "kalem", imageUrl: "/images/2408.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2407, word: "kalem", imageUrl: "/images/2407.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 8,
        question: "Kısa olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Kısa olan hangisi?', correct: 'Evet! Kalem kısadır.', wrong: 'Hayır, bu kalem uzundur.' }
        },
        options: [
            { id: 2407, word: "kalem", imageUrl: "/images/2407.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2408, word: "kalem", imageUrl: "/images/2408.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kurdele
    {
        id: 9,
        question: "Uzun olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Uzun olan hangisi?', correct: 'Evet! Kurdele uzundur.', wrong: 'Hayır, bu kurdele kısadır.' }
        },
        options: [
            { id: 2410, word: "kurdele", imageUrl: "/images/2410.webp", isCorrect: true, audioKey: "kurdele", spokenText: "kurdele" },
            { id: 2409, word: "kurdele", imageUrl: "/images/2409.webp", isCorrect: false, audioKey: "kurdele", spokenText: "kurdele" }
        ]
    },
    {
        id: 10,
        question: "Kısa olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Kısa olan hangisi?', correct: 'Evet! Kurdele kısadır.', wrong: 'Hayır, bu kurdele uzundur.' }
        },
        options: [
            { id: 2409, word: "kurdele", imageUrl: "/images/2409.webp", isCorrect: true, audioKey: "kurdele", spokenText: "kurdele" },
            { id: 2410, word: "kurdele", imageUrl: "/images/2410.webp", isCorrect: false, audioKey: "kurdele", spokenText: "kurdele" }
        ]
    },
    // pantolon
    {
        id: 11,
        question: "Uzun olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Uzun olan hangisi?', correct: 'Evet! Pantolon uzundur.', wrong: 'Hayır, bu pantolon kısadır.' }
        },
        options: [
            { id: 2412, word: "pantolon", imageUrl: "/images/2412.webp", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 2411, word: "pantolon", imageUrl: "/images/2411.webp", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" }
        ]
    },
    {
        id: 12,
        question: "Kısa olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Kısa olan hangisi?', correct: 'Evet! Pantolon kısadır.', wrong: 'Hayır, bu pantolon uzundur.' }
        },
        options: [
            { id: 2411, word: "pantolon", imageUrl: "/images/2411.webp", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 2412, word: "pantolon", imageUrl: "/images/2412.webp", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" }
        ]
    },
    // saç
    {
        id: 13,
        question: "Saçı uzun olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Saçı uzun olan hangisi?', correct: 'Evet! Saç uzundur.', wrong: 'Hayır, bu saç kısadır.' }
        },
        options: [
            { id: 2414, word: "saç", imageUrl: "/images/2414.webp", isCorrect: true, audioKey: "saç", spokenText: "saç" },
            { id: 2413, word: "saç", imageUrl: "/images/2413.webp", isCorrect: false, audioKey: "saç", spokenText: "saç" }
        ]
    },
    {
        id: 14,
        question: "Saçı kısa olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Saçı kısa olan hangisi?', correct: 'Evet! Saç kısadır.', wrong: 'Hayır, bu saç uzundur.' }
        },
        options: [
            { id: 2413, word: "saç", imageUrl: "/images/2413.webp", isCorrect: true, audioKey: "saç", spokenText: "saç" },
            { id: 2414, word: "saç", imageUrl: "/images/2414.webp", isCorrect: false, audioKey: "saç", spokenText: "saç" }
        ]
    },
    // tişört kolu
    {
        id: 15,
        question: "Kolu uzun olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Kolu uzun olan hangisi?', correct: 'Evet! Tişört kolu uzundur.', wrong: 'Hayır, bu tişört kolu kısadır.' }
        },
        options: [
            { id: 2416, word: "tişört kolu", imageUrl: "/images/2416.webp", isCorrect: true, audioKey: "tişört kolu", spokenText: "tişört kolu" },
            { id: 2415, word: "tişört kolu", imageUrl: "/images/2415.webp", isCorrect: false, audioKey: "tişört kolu", spokenText: "tişört kolu" }
        ]
    },
    {
        id: 16,
        question: "Kolu kısa olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Kolu kısa olan hangisi?', correct: 'Evet! Tişört kolu kısadır.', wrong: 'Hayır, bu tişört kolu uzundur.' }
        },
        options: [
            { id: 2415, word: "tişört kolu", imageUrl: "/images/2415.webp", isCorrect: true, audioKey: "tişört kolu", spokenText: "tişört kolu" },
            { id: 2416, word: "tişört kolu", imageUrl: "/images/2416.webp", isCorrect: false, audioKey: "tişört kolu", spokenText: "tişört kolu" }
        ]
    },
    // tren
    {
        id: 17,
        question: "Uzun olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Uzun olan hangisi?', correct: 'Evet! Tren uzundur.', wrong: 'Hayır, bu tren kısadır.' }
        },
        options: [
            { id: 2418, word: "tren", imageUrl: "/images/2418.webp", isCorrect: true, audioKey: "tren", spokenText: "tren" },
            { id: 2417, word: "tren", imageUrl: "/images/2417.webp", isCorrect: false, audioKey: "tren", spokenText: "tren" }
        ]
    },
    {
        id: 18,
        question: "Kısa olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Kısa olan hangisi?', correct: 'Evet! Tren kısadır.', wrong: 'Hayır, bu tren uzundur.' }
        },
        options: [
            { id: 2417, word: "tren", imageUrl: "/images/2417.webp", isCorrect: true, audioKey: "tren", spokenText: "tren" },
            { id: 2418, word: "tren", imageUrl: "/images/2418.webp", isCorrect: false, audioKey: "tren", spokenText: "tren" }
        ]
    },
    // yılan
    {
        id: 19,
        question: "Uzun olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Uzun olan hangisi?', correct: 'Evet! Yılan uzundur.', wrong: 'Hayır, bu yılan kısadır.' }
        },
        options: [
            { id: 2420, word: "yılan", imageUrl: "/images/2420.webp", isCorrect: true, audioKey: "yılan", spokenText: "yılan" },
            { id: 2419, word: "yılan", imageUrl: "/images/2419.webp", isCorrect: false, audioKey: "yılan", spokenText: "yılan" }
        ]
    },
    {
        id: 20,
        question: "Kısa olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Kısa olan hangisi?', correct: 'Evet! Yılan kısadır.', wrong: 'Hayır, bu yılan uzundur.' }
        },
        options: [
            { id: 2419, word: "yılan", imageUrl: "/images/2419.webp", isCorrect: true, audioKey: "yılan", spokenText: "yılan" },
            { id: 2420, word: "yılan", imageUrl: "/images/2420.webp", isCorrect: false, audioKey: "yılan", spokenText: "yılan" }
        ]
    },
];
