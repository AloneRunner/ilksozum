// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (yenir-yenmez). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/yenir-yenmez/ → id 6801-6820.
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
    // cilek_silgi
    {
        id: 3,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Çilek yenir.', wrong: 'Hayır, çilek silgi yenmez.' }
        },
        options: [
            { id: 6803, word: "çilek", imageUrl: "/images/6803.webp", isCorrect: true, audioKey: "çilek", spokenText: "çilek" },
            { id: 6804, word: "çilek silgi", imageUrl: "/images/6804.webp", isCorrect: false, audioKey: "çilek silgi", spokenText: "çilek silgi" }
        ]
    },
    {
        id: 4,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Çilek silgi yenmez.', wrong: 'Hayır, çilek yenir.' }
        },
        options: [
            { id: 6804, word: "çilek silgi", imageUrl: "/images/6804.webp", isCorrect: true, audioKey: "çilek silgi", spokenText: "çilek silgi" },
            { id: 6803, word: "çilek", imageUrl: "/images/6803.webp", isCorrect: false, audioKey: "çilek", spokenText: "çilek" }
        ]
    },
    // elma_top
    {
        id: 5,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Elma yenir.', wrong: 'Hayır, top yenmez.' }
        },
        options: [
            { id: 6805, word: "elma", imageUrl: "/images/6805.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 6806, word: "top", imageUrl: "/images/6806.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 6,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Top yenmez.', wrong: 'Hayır, elma yenir.' }
        },
        options: [
            { id: 6806, word: "top", imageUrl: "/images/6806.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 6805, word: "elma", imageUrl: "/images/6805.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // havuc_boya
    {
        id: 7,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Havuç yenir.', wrong: 'Hayır, pastel boya yenmez.' }
        },
        options: [
            { id: 6807, word: "havuç", imageUrl: "/images/6807.webp", isCorrect: true, audioKey: "havuç", spokenText: "havuç" },
            { id: 6808, word: "pastel boya", imageUrl: "/images/6808.webp", isCorrect: false, audioKey: "pastel boya", spokenText: "pastel boya" }
        ]
    },
    {
        id: 8,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Pastel boya yenmez.', wrong: 'Hayır, havuç yenir.' }
        },
        options: [
            { id: 6808, word: "pastel boya", imageUrl: "/images/6808.webp", isCorrect: true, audioKey: "pastel boya", spokenText: "pastel boya" },
            { id: 6807, word: "havuç", imageUrl: "/images/6807.webp", isCorrect: false, audioKey: "havuç", spokenText: "havuç" }
        ]
    },
    // kurabiye_altlik
    {
        id: 9,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Kurabiye yenir.', wrong: 'Hayır, bardak altlığı yenmez.' }
        },
        options: [
            { id: 6809, word: "kurabiye", imageUrl: "/images/6809.webp", isCorrect: true, audioKey: "kurabiye", spokenText: "kurabiye" },
            { id: 6810, word: "bardak altlığı", imageUrl: "/images/6810.webp", isCorrect: false, audioKey: "bardak altlığı", spokenText: "bardak altlığı" }
        ]
    },
    {
        id: 10,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Bardak altlığı yenmez.', wrong: 'Hayır, kurabiye yenir.' }
        },
        options: [
            { id: 6810, word: "bardak altlığı", imageUrl: "/images/6810.webp", isCorrect: true, audioKey: "bardak altlığı", spokenText: "bardak altlığı" },
            { id: 6809, word: "kurabiye", imageUrl: "/images/6809.webp", isCorrect: false, audioKey: "kurabiye", spokenText: "kurabiye" }
        ]
    },
    // meyvesuyu_sabun
    {
        id: 11,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Meyve suyu yenir.', wrong: 'Hayır, sıvı sabun yenmez.' }
        },
        options: [
            { id: 6811, word: "meyve suyu", imageUrl: "/images/6811.webp", isCorrect: true, audioKey: "meyve suyu", spokenText: "meyve suyu" },
            { id: 6812, word: "sıvı sabun", imageUrl: "/images/6812.webp", isCorrect: false, audioKey: "sıvı sabun", spokenText: "sıvı sabun" }
        ]
    },
    {
        id: 12,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Sıvı sabun yenmez.', wrong: 'Hayır, meyve suyu yenir.' }
        },
        options: [
            { id: 6812, word: "sıvı sabun", imageUrl: "/images/6812.webp", isCorrect: true, audioKey: "sıvı sabun", spokenText: "sıvı sabun" },
            { id: 6811, word: "meyve suyu", imageUrl: "/images/6811.webp", isCorrect: false, audioKey: "meyve suyu", spokenText: "meyve suyu" }
        ]
    },
    // muz_oyuncakmuz
    {
        id: 13,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Muz yenir.', wrong: 'Hayır, oyuncak muz yenmez.' }
        },
        options: [
            { id: 6813, word: "muz", imageUrl: "/images/6813.webp", isCorrect: true, audioKey: "muz", spokenText: "muz" },
            { id: 6814, word: "oyuncak muz", imageUrl: "/images/6814.webp", isCorrect: false, audioKey: "oyuncak muz", spokenText: "oyuncak muz" }
        ]
    },
    {
        id: 14,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Oyuncak muz yenmez.', wrong: 'Hayır, muz yenir.' }
        },
        options: [
            { id: 6814, word: "oyuncak muz", imageUrl: "/images/6814.webp", isCorrect: true, audioKey: "oyuncak muz", spokenText: "oyuncak muz" },
            { id: 6813, word: "muz", imageUrl: "/images/6813.webp", isCorrect: false, audioKey: "muz", spokenText: "muz" }
        ]
    },
    // peynir_sunger
    {
        id: 15,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Peynir yenir.', wrong: 'Hayır, sünger yenmez.' }
        },
        options: [
            { id: 6815, word: "peynir", imageUrl: "/images/6815.webp", isCorrect: true, audioKey: "peynir", spokenText: "peynir" },
            { id: 6816, word: "sünger", imageUrl: "/images/6816.webp", isCorrect: false, audioKey: "sünger", spokenText: "sünger" }
        ]
    },
    {
        id: 16,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Sünger yenmez.', wrong: 'Hayır, peynir yenir.' }
        },
        options: [
            { id: 6816, word: "sünger", imageUrl: "/images/6816.webp", isCorrect: true, audioKey: "sünger", spokenText: "sünger" },
            { id: 6815, word: "peynir", imageUrl: "/images/6815.webp", isCorrect: false, audioKey: "peynir", spokenText: "peynir" }
        ]
    },
    // seker_dugme
    {
        id: 17,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Şeker yenir.', wrong: 'Hayır, düğme yenmez.' }
        },
        options: [
            { id: 6817, word: "şeker", imageUrl: "/images/6817.webp", isCorrect: true, audioKey: "şeker", spokenText: "şeker" },
            { id: 6818, word: "düğme", imageUrl: "/images/6818.webp", isCorrect: false, audioKey: "düğme", spokenText: "düğme" }
        ]
    },
    {
        id: 18,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Düğme yenmez.', wrong: 'Hayır, şeker yenir.' }
        },
        options: [
            { id: 6818, word: "düğme", imageUrl: "/images/6818.webp", isCorrect: true, audioKey: "düğme", spokenText: "düğme" },
            { id: 6817, word: "şeker", imageUrl: "/images/6817.webp", isCorrect: false, audioKey: "şeker", spokenText: "şeker" }
        ]
    },
    // uzum_bilye
    {
        id: 19,
        question: "Hangisi yenir?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenir?', correct: 'Evet! Üzüm yenir.', wrong: 'Hayır, bilye yenmez.' }
        },
        options: [
            { id: 6819, word: "üzüm", imageUrl: "/images/6819.webp", isCorrect: true, audioKey: "üzüm", spokenText: "üzüm" },
            { id: 6820, word: "bilye", imageUrl: "/images/6820.webp", isCorrect: false, audioKey: "bilye", spokenText: "bilye" }
        ]
    },
    {
        id: 20,
        question: "Hangisi yenmez?",
        questionAudioKey: "",
        activityType: ActivityType.YenirYenmez,
        speech: {
            tr: { question: 'Hangisi yenmez?', correct: 'Evet! Bilye yenmez.', wrong: 'Hayır, üzüm yenir.' }
        },
        options: [
            { id: 6820, word: "bilye", imageUrl: "/images/6820.webp", isCorrect: true, audioKey: "bilye", spokenText: "bilye" },
            { id: 6819, word: "üzüm", imageUrl: "/images/6819.webp", isCorrect: false, audioKey: "üzüm", spokenText: "üzüm" }
        ]
    },
];
