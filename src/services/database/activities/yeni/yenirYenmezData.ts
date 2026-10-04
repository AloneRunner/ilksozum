// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (yenir-yenmez). Elle düzenleme.
// 7 çift, 14 soru. Görseller: gorsel-ham/yenir-yenmez/ → id 6801-6814.
import { ConceptRound, ActivityType } from '../../../../types';

export const yenirYenmezDataYeni: ConceptRound[] = [
    // cikolata_sabun
    {
        id: 1,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Çikolata yenir.', wrong: 'Hayır, sabun yenmez.' }
        },
        options: [
            { id: 6801, word: "çikolata", imageUrl: "/images/6801.webp", isCorrect: true, audioKey: "çikolata", spokenText: "çikolata" },
            { id: 6802, word: "sabun", imageUrl: "/images/6802.webp", isCorrect: false, audioKey: "sabun", spokenText: "sabun" }
        ]
    },
    {
        id: 2,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Sabun yenmez.', wrong: 'Hayır, çikolata yenir.' }
        },
        options: [
            { id: 6802, word: "sabun", imageUrl: "/images/6802.webp", isCorrect: true, audioKey: "sabun", spokenText: "sabun" },
            { id: 6801, word: "çikolata", imageUrl: "/images/6801.webp", isCorrect: false, audioKey: "çikolata", spokenText: "çikolata" }
        ]
    },
    // elma_top
    {
        id: 3,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Elma yenir.', wrong: 'Hayır, top yenmez.' }
        },
        options: [
            { id: 6803, word: "elma", imageUrl: "/images/6803.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 6804, word: "top", imageUrl: "/images/6804.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 4,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Top yenmez.', wrong: 'Hayır, elma yenir.' }
        },
        options: [
            { id: 6804, word: "top", imageUrl: "/images/6804.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 6803, word: "elma", imageUrl: "/images/6803.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // havuc_boya
    {
        id: 5,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Havuç yenir.', wrong: 'Hayır, pastel boya yenmez.' }
        },
        options: [
            { id: 6805, word: "havuç", imageUrl: "/images/6805.webp", isCorrect: true, audioKey: "havuç", spokenText: "havuç" },
            { id: 6806, word: "pastel boya", imageUrl: "/images/6806.webp", isCorrect: false, audioKey: "pastel boya", spokenText: "pastel boya" }
        ]
    },
    {
        id: 6,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Pastel boya yenmez.', wrong: 'Hayır, havuç yenir.' }
        },
        options: [
            { id: 6806, word: "pastel boya", imageUrl: "/images/6806.webp", isCorrect: true, audioKey: "pastel boya", spokenText: "pastel boya" },
            { id: 6805, word: "havuç", imageUrl: "/images/6805.webp", isCorrect: false, audioKey: "havuç", spokenText: "havuç" }
        ]
    },
    // kurabiye_altlik
    {
        id: 7,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Kurabiye yenir.', wrong: 'Hayır, bardak altlığı yenmez.' }
        },
        options: [
            { id: 6807, word: "kurabiye", imageUrl: "/images/6807.webp", isCorrect: true, audioKey: "kurabiye", spokenText: "kurabiye" },
            { id: 6808, word: "bardak altlığı", imageUrl: "/images/6808.webp", isCorrect: false, audioKey: "bardak altlığı", spokenText: "bardak altlığı" }
        ]
    },
    {
        id: 8,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Bardak altlığı yenmez.', wrong: 'Hayır, kurabiye yenir.' }
        },
        options: [
            { id: 6808, word: "bardak altlığı", imageUrl: "/images/6808.webp", isCorrect: true, audioKey: "bardak altlığı", spokenText: "bardak altlığı" },
            { id: 6807, word: "kurabiye", imageUrl: "/images/6807.webp", isCorrect: false, audioKey: "kurabiye", spokenText: "kurabiye" }
        ]
    },
    // peynir_sunger
    {
        id: 9,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Peynir yenir.', wrong: 'Hayır, sünger yenmez.' }
        },
        options: [
            { id: 6809, word: "peynir", imageUrl: "/images/6809.webp", isCorrect: true, audioKey: "peynir", spokenText: "peynir" },
            { id: 6810, word: "sünger", imageUrl: "/images/6810.webp", isCorrect: false, audioKey: "sünger", spokenText: "sünger" }
        ]
    },
    {
        id: 10,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Sünger yenmez.', wrong: 'Hayır, peynir yenir.' }
        },
        options: [
            { id: 6810, word: "sünger", imageUrl: "/images/6810.webp", isCorrect: true, audioKey: "sünger", spokenText: "sünger" },
            { id: 6809, word: "peynir", imageUrl: "/images/6809.webp", isCorrect: false, audioKey: "peynir", spokenText: "peynir" }
        ]
    },
    // seker_dugme
    {
        id: 11,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Şeker yenir.', wrong: 'Hayır, düğme yenmez.' }
        },
        options: [
            { id: 6811, word: "şeker", imageUrl: "/images/6811.webp", isCorrect: true, audioKey: "şeker", spokenText: "şeker" },
            { id: 6812, word: "düğme", imageUrl: "/images/6812.webp", isCorrect: false, audioKey: "düğme", spokenText: "düğme" }
        ]
    },
    {
        id: 12,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Düğme yenmez.', wrong: 'Hayır, şeker yenir.' }
        },
        options: [
            { id: 6812, word: "düğme", imageUrl: "/images/6812.webp", isCorrect: true, audioKey: "düğme", spokenText: "düğme" },
            { id: 6811, word: "şeker", imageUrl: "/images/6811.webp", isCorrect: false, audioKey: "şeker", spokenText: "şeker" }
        ]
    },
    // uzum_bilye
    {
        id: 13,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Üzüm yenir.', wrong: 'Hayır, bilye yenmez.' }
        },
        options: [
            { id: 6813, word: "üzüm", imageUrl: "/images/6813.webp", isCorrect: true, audioKey: "üzüm", spokenText: "üzüm" },
            { id: 6814, word: "bilye", imageUrl: "/images/6814.webp", isCorrect: false, audioKey: "bilye", spokenText: "bilye" }
        ]
    },
    {
        id: 14,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Bilye yenmez.', wrong: 'Hayır, üzüm yenir.' }
        },
        options: [
            { id: 6814, word: "bilye", imageUrl: "/images/6814.webp", isCorrect: true, audioKey: "bilye", spokenText: "bilye" },
            { id: 6813, word: "üzüm", imageUrl: "/images/6813.webp", isCorrect: false, audioKey: "üzüm", spokenText: "üzüm" }
        ]
    },
];
