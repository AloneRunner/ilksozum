// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (uzun-kisa). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/uzun-kisa/ → id 2401-2420.
import { ConceptRound, ActivityType } from '../../../../types';

export const longShortDataYeni: ConceptRound[] = [
    // atkı
    {
        id: 1,
        question: "Hangi atkı uzun?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi atkı uzun?', correct: 'Evet! Bu atkı uzun.', wrong: 'Hayır, bu atkı kısa.' }
        },
        options: [
            { id: 2402, word: "atkı", imageUrl: "/images/2402.webp", isCorrect: true, audioKey: "atkı", spokenText: "atkı" },
            { id: 2401, word: "atkı", imageUrl: "/images/2401.webp", isCorrect: false, audioKey: "atkı", spokenText: "atkı" }
        ]
    },
    {
        id: 2,
        question: "Hangi atkı kısa?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi atkı kısa?', correct: 'Evet! Bu atkı kısa.', wrong: 'Hayır, bu atkı uzun.' }
        },
        options: [
            { id: 2401, word: "atkı", imageUrl: "/images/2401.webp", isCorrect: true, audioKey: "atkı", spokenText: "atkı" },
            { id: 2402, word: "atkı", imageUrl: "/images/2402.webp", isCorrect: false, audioKey: "atkı", spokenText: "atkı" }
        ]
    },
    // bank
    {
        id: 3,
        question: "Hangi bank uzun?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi bank uzun?', correct: 'Evet! Bu bank uzun.', wrong: 'Hayır, bu bank kısa.' }
        },
        options: [
            { id: 2404, word: "bank", imageUrl: "/images/2404.webp", isCorrect: true, audioKey: "bank", spokenText: "bank" },
            { id: 2403, word: "bank", imageUrl: "/images/2403.webp", isCorrect: false, audioKey: "bank", spokenText: "bank" }
        ]
    },
    {
        id: 4,
        question: "Hangi bank kısa?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi bank kısa?', correct: 'Evet! Bu bank kısa.', wrong: 'Hayır, bu bank uzun.' }
        },
        options: [
            { id: 2403, word: "bank", imageUrl: "/images/2403.webp", isCorrect: true, audioKey: "bank", spokenText: "bank" },
            { id: 2404, word: "bank", imageUrl: "/images/2404.webp", isCorrect: false, audioKey: "bank", spokenText: "bank" }
        ]
    },
    // çorap
    {
        id: 5,
        question: "Hangi çorap uzun?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi çorap uzun?', correct: 'Evet! Bu çorap uzun.', wrong: 'Hayır, bu çorap kısa.' }
        },
        options: [
            { id: 2406, word: "çorap", imageUrl: "/images/2406.webp", isCorrect: true, audioKey: "çorap", spokenText: "çorap" },
            { id: 2405, word: "çorap", imageUrl: "/images/2405.webp", isCorrect: false, audioKey: "çorap", spokenText: "çorap" }
        ]
    },
    {
        id: 6,
        question: "Hangi çorap kısa?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi çorap kısa?', correct: 'Evet! Bu çorap kısa.', wrong: 'Hayır, bu çorap uzun.' }
        },
        options: [
            { id: 2405, word: "çorap", imageUrl: "/images/2405.webp", isCorrect: true, audioKey: "çorap", spokenText: "çorap" },
            { id: 2406, word: "çorap", imageUrl: "/images/2406.webp", isCorrect: false, audioKey: "çorap", spokenText: "çorap" }
        ]
    },
    // kalem
    {
        id: 7,
        question: "Hangi kalem uzun?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi kalem uzun?', correct: 'Evet! Bu kalem uzun.', wrong: 'Hayır, bu kalem kısa.' }
        },
        options: [
            { id: 2408, word: "kalem", imageUrl: "/images/2408.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2407, word: "kalem", imageUrl: "/images/2407.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 8,
        question: "Hangi kalem kısa?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi kalem kısa?', correct: 'Evet! Bu kalem kısa.', wrong: 'Hayır, bu kalem uzun.' }
        },
        options: [
            { id: 2407, word: "kalem", imageUrl: "/images/2407.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2408, word: "kalem", imageUrl: "/images/2408.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kurdele
    {
        id: 9,
        question: "Hangi kurdele uzun?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi kurdele uzun?', correct: 'Evet! Bu kurdele uzun.', wrong: 'Hayır, bu kurdele kısa.' }
        },
        options: [
            { id: 2410, word: "kurdele", imageUrl: "/images/2410.webp", isCorrect: true, audioKey: "kurdele", spokenText: "kurdele" },
            { id: 2409, word: "kurdele", imageUrl: "/images/2409.webp", isCorrect: false, audioKey: "kurdele", spokenText: "kurdele" }
        ]
    },
    {
        id: 10,
        question: "Hangi kurdele kısa?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi kurdele kısa?', correct: 'Evet! Bu kurdele kısa.', wrong: 'Hayır, bu kurdele uzun.' }
        },
        options: [
            { id: 2409, word: "kurdele", imageUrl: "/images/2409.webp", isCorrect: true, audioKey: "kurdele", spokenText: "kurdele" },
            { id: 2410, word: "kurdele", imageUrl: "/images/2410.webp", isCorrect: false, audioKey: "kurdele", spokenText: "kurdele" }
        ]
    },
    // pantolon
    {
        id: 11,
        question: "Hangi pantolon uzun?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi pantolon uzun?', correct: 'Evet! Bu pantolon uzun.', wrong: 'Hayır, bu pantolon kısa.' }
        },
        options: [
            { id: 2412, word: "pantolon", imageUrl: "/images/2412.webp", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 2411, word: "pantolon", imageUrl: "/images/2411.webp", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" }
        ]
    },
    {
        id: 12,
        question: "Hangi pantolon kısa?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi pantolon kısa?', correct: 'Evet! Bu pantolon kısa.', wrong: 'Hayır, bu pantolon uzun.' }
        },
        options: [
            { id: 2411, word: "pantolon", imageUrl: "/images/2411.webp", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 2412, word: "pantolon", imageUrl: "/images/2412.webp", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" }
        ]
    },
    // saç
    {
        id: 13,
        question: "Hangi kızın saçı uzun?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi kızın saçı uzun?', correct: 'Evet! Bu saç uzun.', wrong: 'Hayır, bu saç kısa.' }
        },
        options: [
            { id: 2414, word: "saç", imageUrl: "/images/2414.webp", isCorrect: true, audioKey: "saç", spokenText: "saç" },
            { id: 2413, word: "saç", imageUrl: "/images/2413.webp", isCorrect: false, audioKey: "saç", spokenText: "saç" }
        ]
    },
    {
        id: 14,
        question: "Hangi kızın saçı kısa?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi kızın saçı kısa?', correct: 'Evet! Bu saç kısa.', wrong: 'Hayır, bu saç uzun.' }
        },
        options: [
            { id: 2413, word: "saç", imageUrl: "/images/2413.webp", isCorrect: true, audioKey: "saç", spokenText: "saç" },
            { id: 2414, word: "saç", imageUrl: "/images/2414.webp", isCorrect: false, audioKey: "saç", spokenText: "saç" }
        ]
    },
    // tişört kolu
    {
        id: 15,
        question: "Hangi tişörtün kolu uzun?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi tişörtün kolu uzun?', correct: 'Evet! Bu tişört kolu uzun.', wrong: 'Hayır, bu tişört kolu kısa.' }
        },
        options: [
            { id: 2416, word: "tişört kolu", imageUrl: "/images/2416.webp", isCorrect: true, audioKey: "tişört kolu", spokenText: "tişört kolu" },
            { id: 2415, word: "tişört kolu", imageUrl: "/images/2415.webp", isCorrect: false, audioKey: "tişört kolu", spokenText: "tişört kolu" }
        ]
    },
    {
        id: 16,
        question: "Hangi tişörtün kolu kısa?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi tişörtün kolu kısa?', correct: 'Evet! Bu tişört kolu kısa.', wrong: 'Hayır, bu tişört kolu uzun.' }
        },
        options: [
            { id: 2415, word: "tişört kolu", imageUrl: "/images/2415.webp", isCorrect: true, audioKey: "tişört kolu", spokenText: "tişört kolu" },
            { id: 2416, word: "tişört kolu", imageUrl: "/images/2416.webp", isCorrect: false, audioKey: "tişört kolu", spokenText: "tişört kolu" }
        ]
    },
    // tren
    {
        id: 17,
        question: "Hangi tren uzun?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi tren uzun?', correct: 'Evet! Bu tren uzun.', wrong: 'Hayır, bu tren kısa.' }
        },
        options: [
            { id: 2418, word: "tren", imageUrl: "/images/2418.webp", isCorrect: true, audioKey: "tren", spokenText: "tren" },
            { id: 2417, word: "tren", imageUrl: "/images/2417.webp", isCorrect: false, audioKey: "tren", spokenText: "tren" }
        ]
    },
    {
        id: 18,
        question: "Hangi tren kısa?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi tren kısa?', correct: 'Evet! Bu tren kısa.', wrong: 'Hayır, bu tren uzun.' }
        },
        options: [
            { id: 2417, word: "tren", imageUrl: "/images/2417.webp", isCorrect: true, audioKey: "tren", spokenText: "tren" },
            { id: 2418, word: "tren", imageUrl: "/images/2418.webp", isCorrect: false, audioKey: "tren", spokenText: "tren" }
        ]
    },
    // yılan
    {
        id: 19,
        question: "Hangi yılan uzun?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi yılan uzun?', correct: 'Evet! Bu yılan uzun.', wrong: 'Hayır, bu yılan kısa.' }
        },
        options: [
            { id: 2420, word: "yılan", imageUrl: "/images/2420.webp", isCorrect: true, audioKey: "yılan", spokenText: "yılan" },
            { id: 2419, word: "yılan", imageUrl: "/images/2419.webp", isCorrect: false, audioKey: "yılan", spokenText: "yılan" }
        ]
    },
    {
        id: 20,
        question: "Hangi yılan kısa?",
        questionAudioKey: "",
        activityType: ActivityType.LongShort,
        speech: {
            tr: { question: 'Hangi yılan kısa?', correct: 'Evet! Bu yılan kısa.', wrong: 'Hayır, bu yılan uzun.' }
        },
        options: [
            { id: 2419, word: "yılan", imageUrl: "/images/2419.webp", isCorrect: true, audioKey: "yılan", spokenText: "yılan" },
            { id: 2420, word: "yılan", imageUrl: "/images/2420.webp", isCorrect: false, audioKey: "yılan", spokenText: "yılan" }
        ]
    },
];
