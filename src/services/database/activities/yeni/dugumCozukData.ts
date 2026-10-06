// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (dugum-cozuk). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/dugum-cozuk/ → id 4801-4820.
import { ConceptRound, ActivityType } from '../../../../types';

export const dugumCozukDataYeni: ConceptRound[] = [
    // atkı
    {
        id: 1,
        question: "Hangi atkı düğümlü?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi atkı düğümlü?', correct: 'Evet! Bu atkı düğümlü.', wrong: 'Hayır, bu atkı çözük.' }
        },
        options: [
            { id: 4802, word: "atkı", imageUrl: "/images/4802.webp", isCorrect: true, audioKey: "atkı", spokenText: "atkı" },
            { id: 4801, word: "atkı", imageUrl: "/images/4801.webp", isCorrect: false, audioKey: "atkı", spokenText: "atkı" }
        ]
    },
    {
        id: 2,
        question: "Hangi atkı çözük?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi atkı çözük?', correct: 'Evet! Bu atkı çözük.', wrong: 'Hayır, bu atkı düğümlü.' }
        },
        options: [
            { id: 4801, word: "atkı", imageUrl: "/images/4801.webp", isCorrect: true, audioKey: "atkı", spokenText: "atkı" },
            { id: 4802, word: "atkı", imageUrl: "/images/4802.webp", isCorrect: false, audioKey: "atkı", spokenText: "atkı" }
        ]
    },
    // ayakkabı
    {
        id: 3,
        question: "Hangi ayakkabının bağcığı düğümlü?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi ayakkabının bağcığı düğümlü?', correct: 'Evet! Bu ayakkabının bağcığı düğümlü.', wrong: 'Hayır, bu ayakkabının bağcığı çözük.' }
        },
        options: [
            { id: 4804, word: "ayakkabı", imageUrl: "/images/4804.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 4803, word: "ayakkabı", imageUrl: "/images/4803.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    {
        id: 4,
        question: "Hangi ayakkabının bağcığı çözük?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi ayakkabının bağcığı çözük?', correct: 'Evet! Bu ayakkabının bağcığı çözük.', wrong: 'Hayır, bu ayakkabının bağcığı düğümlü.' }
        },
        options: [
            { id: 4803, word: "ayakkabı", imageUrl: "/images/4803.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 4804, word: "ayakkabı", imageUrl: "/images/4804.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    // balon
    {
        id: 5,
        question: "Hangi balonun ipi düğümlü?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi balonun ipi düğümlü?', correct: 'Evet! Bu balonun ipi düğümlü.', wrong: 'Hayır, bu balonun ipi çözük.' }
        },
        options: [
            { id: 4806, word: "balon", imageUrl: "/images/4806.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 4805, word: "balon", imageUrl: "/images/4805.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 6,
        question: "Hangi balonun ipi çözük?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi balonun ipi çözük?', correct: 'Evet! Bu balonun ipi çözük.', wrong: 'Hayır, bu balonun ipi düğümlü.' }
        },
        options: [
            { id: 4805, word: "balon", imageUrl: "/images/4805.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 4806, word: "balon", imageUrl: "/images/4806.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    // bez çanta
    {
        id: 7,
        question: "Hangi bez çanta düğümlü?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi bez çanta düğümlü?', correct: 'Evet! Bu bez çanta düğümlü.', wrong: 'Hayır, bu bez çanta çözük.' }
        },
        options: [
            { id: 4808, word: "bez çanta", imageUrl: "/images/4808.webp", isCorrect: true, audioKey: "bez çanta", spokenText: "bez çanta" },
            { id: 4807, word: "bez çanta", imageUrl: "/images/4807.webp", isCorrect: false, audioKey: "bez çanta", spokenText: "bez çanta" }
        ]
    },
    {
        id: 8,
        question: "Hangi bez çanta çözük?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi bez çanta çözük?', correct: 'Evet! Bu bez çanta çözük.', wrong: 'Hayır, bu bez çanta düğümlü.' }
        },
        options: [
            { id: 4807, word: "bez çanta", imageUrl: "/images/4807.webp", isCorrect: true, audioKey: "bez çanta", spokenText: "bez çanta" },
            { id: 4808, word: "bez çanta", imageUrl: "/images/4808.webp", isCorrect: false, audioKey: "bez çanta", spokenText: "bez çanta" }
        ]
    },
    // çöp poşeti
    {
        id: 9,
        question: "Hangi çöp poşeti düğümlü?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi çöp poşeti düğümlü?', correct: 'Evet! Bu çöp poşeti düğümlü.', wrong: 'Hayır, bu çöp poşeti çözük.' }
        },
        options: [
            { id: 4810, word: "çöp poşeti", imageUrl: "/images/4810.webp", isCorrect: true, audioKey: "çöp poşeti", spokenText: "çöp poşeti" },
            { id: 4809, word: "çöp poşeti", imageUrl: "/images/4809.webp", isCorrect: false, audioKey: "çöp poşeti", spokenText: "çöp poşeti" }
        ]
    },
    {
        id: 10,
        question: "Hangi çöp poşeti çözük?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi çöp poşeti çözük?', correct: 'Evet! Bu çöp poşeti çözük.', wrong: 'Hayır, bu çöp poşeti düğümlü.' }
        },
        options: [
            { id: 4809, word: "çöp poşeti", imageUrl: "/images/4809.webp", isCorrect: true, audioKey: "çöp poşeti", spokenText: "çöp poşeti" },
            { id: 4810, word: "çöp poşeti", imageUrl: "/images/4810.webp", isCorrect: false, audioKey: "çöp poşeti", spokenText: "çöp poşeti" }
        ]
    },
    // halat
    {
        id: 11,
        question: "Hangi halat düğümlü?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi halat düğümlü?', correct: 'Evet! Bu halat düğümlü.', wrong: 'Hayır, bu halat çözük.' }
        },
        options: [
            { id: 4812, word: "halat", imageUrl: "/images/4812.webp", isCorrect: true, audioKey: "halat", spokenText: "halat" },
            { id: 4811, word: "halat", imageUrl: "/images/4811.webp", isCorrect: false, audioKey: "halat", spokenText: "halat" }
        ]
    },
    {
        id: 12,
        question: "Hangi halat çözük?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi halat çözük?', correct: 'Evet! Bu halat çözük.', wrong: 'Hayır, bu halat düğümlü.' }
        },
        options: [
            { id: 4811, word: "halat", imageUrl: "/images/4811.webp", isCorrect: true, audioKey: "halat", spokenText: "halat" },
            { id: 4812, word: "halat", imageUrl: "/images/4812.webp", isCorrect: false, audioKey: "halat", spokenText: "halat" }
        ]
    },
    // hediye paketi
    {
        id: 13,
        question: "Hangi hediye paketi düğümlü?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi hediye paketi düğümlü?', correct: 'Evet! Bu hediye paketi düğümlü.', wrong: 'Hayır, bu hediye paketi çözük.' }
        },
        options: [
            { id: 4814, word: "hediye paketi", imageUrl: "/images/4814.webp", isCorrect: true, audioKey: "hediye paketi", spokenText: "hediye paketi" },
            { id: 4813, word: "hediye paketi", imageUrl: "/images/4813.webp", isCorrect: false, audioKey: "hediye paketi", spokenText: "hediye paketi" }
        ]
    },
    {
        id: 14,
        question: "Hangi hediye paketi çözük?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi hediye paketi çözük?', correct: 'Evet! Bu hediye paketi çözük.', wrong: 'Hayır, bu hediye paketi düğümlü.' }
        },
        options: [
            { id: 4813, word: "hediye paketi", imageUrl: "/images/4813.webp", isCorrect: true, audioKey: "hediye paketi", spokenText: "hediye paketi" },
            { id: 4814, word: "hediye paketi", imageUrl: "/images/4814.webp", isCorrect: false, audioKey: "hediye paketi", spokenText: "hediye paketi" }
        ]
    },
    // ip
    {
        id: 15,
        question: "Hangi ip düğümlü?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi ip düğümlü?', correct: 'Evet! Bu ip düğümlü.', wrong: 'Hayır, bu ip çözük.' }
        },
        options: [
            { id: 4816, word: "ip", imageUrl: "/images/4816.webp", isCorrect: true, audioKey: "ip", spokenText: "ip" },
            { id: 4815, word: "ip", imageUrl: "/images/4815.webp", isCorrect: false, audioKey: "ip", spokenText: "ip" }
        ]
    },
    {
        id: 16,
        question: "Hangi ip çözük?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi ip çözük?', correct: 'Evet! Bu ip çözük.', wrong: 'Hayır, bu ip düğümlü.' }
        },
        options: [
            { id: 4815, word: "ip", imageUrl: "/images/4815.webp", isCorrect: true, audioKey: "ip", spokenText: "ip" },
            { id: 4816, word: "ip", imageUrl: "/images/4816.webp", isCorrect: false, audioKey: "ip", spokenText: "ip" }
        ]
    },
    // kurdele
    {
        id: 17,
        question: "Hangi kurdele düğümlü?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi kurdele düğümlü?', correct: 'Evet! Bu kurdele düğümlü.', wrong: 'Hayır, bu kurdele çözük.' }
        },
        options: [
            { id: 4818, word: "kurdele", imageUrl: "/images/4818.webp", isCorrect: true, audioKey: "kurdele", spokenText: "kurdele" },
            { id: 4817, word: "kurdele", imageUrl: "/images/4817.webp", isCorrect: false, audioKey: "kurdele", spokenText: "kurdele" }
        ]
    },
    {
        id: 18,
        question: "Hangi kurdele çözük?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi kurdele çözük?', correct: 'Evet! Bu kurdele çözük.', wrong: 'Hayır, bu kurdele düğümlü.' }
        },
        options: [
            { id: 4817, word: "kurdele", imageUrl: "/images/4817.webp", isCorrect: true, audioKey: "kurdele", spokenText: "kurdele" },
            { id: 4818, word: "kurdele", imageUrl: "/images/4818.webp", isCorrect: false, audioKey: "kurdele", spokenText: "kurdele" }
        ]
    },
    // poşet
    {
        id: 19,
        question: "Hangi poşetin ağzı düğümlü?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi poşetin ağzı düğümlü?', correct: 'Evet! Bu poşetin ağzı düğümlü.', wrong: 'Hayır, bu poşetin ağzı çözük.' }
        },
        options: [
            { id: 4820, word: "poşet", imageUrl: "/images/4820.webp", isCorrect: true, audioKey: "poşet", spokenText: "poşet" },
            { id: 4819, word: "poşet", imageUrl: "/images/4819.webp", isCorrect: false, audioKey: "poşet", spokenText: "poşet" }
        ]
    },
    {
        id: 20,
        question: "Hangi poşetin ağzı çözük?",
        questionAudioKey: "",
        activityType: ActivityType.DugumCozuk,
        speech: {
            tr: { question: 'Hangi poşetin ağzı çözük?', correct: 'Evet! Bu poşetin ağzı çözük.', wrong: 'Hayır, bu poşetin ağzı düğümlü.' }
        },
        options: [
            { id: 4819, word: "poşet", imageUrl: "/images/4819.webp", isCorrect: true, audioKey: "poşet", spokenText: "poşet" },
            { id: 4820, word: "poşet", imageUrl: "/images/4820.webp", isCorrect: false, audioKey: "poşet", spokenText: "poşet" }
        ]
    },
];
