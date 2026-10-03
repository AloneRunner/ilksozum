// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (ac-tok). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/ac-tok/ → id 4301-4320.
import { ConceptRound, ActivityType } from '../../../../types';

export const hungryFullDataYeni: ConceptRound[] = [
    // at
    {
        id: 1,
        question: "Hangi at aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi at aç?', correct: 'Evet! At açtır.', wrong: 'Hayır, bu at toktur.' }
        },
        options: [
            { id: 4301, word: "at", imageUrl: "/images/4301.webp", isCorrect: true, audioKey: "at", spokenText: "at" },
            { id: 4302, word: "at", imageUrl: "/images/4302.webp", isCorrect: false, audioKey: "at", spokenText: "at" }
        ]
    },
    {
        id: 2,
        question: "Hangi at tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi at tok?', correct: 'Evet! At toktur.', wrong: 'Hayır, bu at açtır.' }
        },
        options: [
            { id: 4302, word: "at", imageUrl: "/images/4302.webp", isCorrect: true, audioKey: "at", spokenText: "at" },
            { id: 4301, word: "at", imageUrl: "/images/4301.webp", isCorrect: false, audioKey: "at", spokenText: "at" }
        ]
    },
    // bebek
    {
        id: 3,
        question: "Hangi bebek aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi bebek aç?', correct: 'Evet! Bebek açtır.', wrong: 'Hayır, bu bebek toktur.' }
        },
        options: [
            { id: 4303, word: "bebek", imageUrl: "/images/4303.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 4304, word: "bebek", imageUrl: "/images/4304.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    {
        id: 4,
        question: "Hangi bebek tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi bebek tok?', correct: 'Evet! Bebek toktur.', wrong: 'Hayır, bu bebek açtır.' }
        },
        options: [
            { id: 4304, word: "bebek", imageUrl: "/images/4304.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 4303, word: "bebek", imageUrl: "/images/4303.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    // civciv
    {
        id: 5,
        question: "Hangi civciv aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi civciv aç?', correct: 'Evet! Civciv açtır.', wrong: 'Hayır, bu civciv toktur.' }
        },
        options: [
            { id: 4305, word: "civciv", imageUrl: "/images/4305.webp", isCorrect: true, audioKey: "civciv", spokenText: "civciv" },
            { id: 4306, word: "civciv", imageUrl: "/images/4306.webp", isCorrect: false, audioKey: "civciv", spokenText: "civciv" }
        ]
    },
    {
        id: 6,
        question: "Hangi civciv tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi civciv tok?', correct: 'Evet! Civciv toktur.', wrong: 'Hayır, bu civciv açtır.' }
        },
        options: [
            { id: 4306, word: "civciv", imageUrl: "/images/4306.webp", isCorrect: true, audioKey: "civciv", spokenText: "civciv" },
            { id: 4305, word: "civciv", imageUrl: "/images/4305.webp", isCorrect: false, audioKey: "civciv", spokenText: "civciv" }
        ]
    },
    // çocuk
    {
        id: 7,
        question: "Hangi çocuk aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi çocuk aç?', correct: 'Evet! Çocuk açtır.', wrong: 'Hayır, bu çocuk toktur.' }
        },
        options: [
            { id: 4307, word: "çocuk", imageUrl: "/images/4307.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4308, word: "çocuk", imageUrl: "/images/4308.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 8,
        question: "Hangi çocuk tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi çocuk tok?', correct: 'Evet! Çocuk toktur.', wrong: 'Hayır, bu çocuk açtır.' }
        },
        options: [
            { id: 4308, word: "çocuk", imageUrl: "/images/4308.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4307, word: "çocuk", imageUrl: "/images/4307.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // inek
    {
        id: 9,
        question: "Hangi inek aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi inek aç?', correct: 'Evet! İnek açtır.', wrong: 'Hayır, bu inek toktur.' }
        },
        options: [
            { id: 4309, word: "inek", imageUrl: "/images/4309.webp", isCorrect: true, audioKey: "inek", spokenText: "inek" },
            { id: 4310, word: "inek", imageUrl: "/images/4310.webp", isCorrect: false, audioKey: "inek", spokenText: "inek" }
        ]
    },
    {
        id: 10,
        question: "Hangi inek tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi inek tok?', correct: 'Evet! İnek toktur.', wrong: 'Hayır, bu inek açtır.' }
        },
        options: [
            { id: 4310, word: "inek", imageUrl: "/images/4310.webp", isCorrect: true, audioKey: "inek", spokenText: "inek" },
            { id: 4309, word: "inek", imageUrl: "/images/4309.webp", isCorrect: false, audioKey: "inek", spokenText: "inek" }
        ]
    },
    // kedi
    {
        id: 11,
        question: "Hangi kedi aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi kedi aç?', correct: 'Evet! Kedi açtır.', wrong: 'Hayır, bu kedi toktur.' }
        },
        options: [
            { id: 4311, word: "kedi", imageUrl: "/images/4311.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 4312, word: "kedi", imageUrl: "/images/4312.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    {
        id: 12,
        question: "Hangi kedi tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi kedi tok?', correct: 'Evet! Kedi toktur.', wrong: 'Hayır, bu kedi açtır.' }
        },
        options: [
            { id: 4312, word: "kedi", imageUrl: "/images/4312.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 4311, word: "kedi", imageUrl: "/images/4311.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // köpek
    {
        id: 13,
        question: "Hangi köpek aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi köpek aç?', correct: 'Evet! Köpek açtır.', wrong: 'Hayır, bu köpek toktur.' }
        },
        options: [
            { id: 4313, word: "köpek", imageUrl: "/images/4313.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 4314, word: "köpek", imageUrl: "/images/4314.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    {
        id: 14,
        question: "Hangi köpek tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi köpek tok?', correct: 'Evet! Köpek toktur.', wrong: 'Hayır, bu köpek açtır.' }
        },
        options: [
            { id: 4314, word: "köpek", imageUrl: "/images/4314.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 4313, word: "köpek", imageUrl: "/images/4313.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    // kuş
    {
        id: 15,
        question: "Hangi kuş aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi kuş aç?', correct: 'Evet! Kuş açtır.', wrong: 'Hayır, bu kuş toktur.' }
        },
        options: [
            { id: 4315, word: "kuş", imageUrl: "/images/4315.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 4316, word: "kuş", imageUrl: "/images/4316.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    {
        id: 16,
        question: "Hangi kuş tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi kuş tok?', correct: 'Evet! Kuş toktur.', wrong: 'Hayır, bu kuş açtır.' }
        },
        options: [
            { id: 4316, word: "kuş", imageUrl: "/images/4316.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 4315, word: "kuş", imageUrl: "/images/4315.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    // kuzu
    {
        id: 17,
        question: "Hangi kuzu aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi kuzu aç?', correct: 'Evet! Kuzu açtır.', wrong: 'Hayır, bu kuzu toktur.' }
        },
        options: [
            { id: 4317, word: "kuzu", imageUrl: "/images/4317.webp", isCorrect: true, audioKey: "kuzu", spokenText: "kuzu" },
            { id: 4318, word: "kuzu", imageUrl: "/images/4318.webp", isCorrect: false, audioKey: "kuzu", spokenText: "kuzu" }
        ]
    },
    {
        id: 18,
        question: "Hangi kuzu tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi kuzu tok?', correct: 'Evet! Kuzu toktur.', wrong: 'Hayır, bu kuzu açtır.' }
        },
        options: [
            { id: 4318, word: "kuzu", imageUrl: "/images/4318.webp", isCorrect: true, audioKey: "kuzu", spokenText: "kuzu" },
            { id: 4317, word: "kuzu", imageUrl: "/images/4317.webp", isCorrect: false, audioKey: "kuzu", spokenText: "kuzu" }
        ]
    },
    // tavşan
    {
        id: 19,
        question: "Hangi tavşan aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi tavşan aç?', correct: 'Evet! Tavşan açtır.', wrong: 'Hayır, bu tavşan toktur.' }
        },
        options: [
            { id: 4319, word: "tavşan", imageUrl: "/images/4319.webp", isCorrect: true, audioKey: "tavşan", spokenText: "tavşan" },
            { id: 4320, word: "tavşan", imageUrl: "/images/4320.webp", isCorrect: false, audioKey: "tavşan", spokenText: "tavşan" }
        ]
    },
    {
        id: 20,
        question: "Hangi tavşan tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi tavşan tok?', correct: 'Evet! Tavşan toktur.', wrong: 'Hayır, bu tavşan açtır.' }
        },
        options: [
            { id: 4320, word: "tavşan", imageUrl: "/images/4320.webp", isCorrect: true, audioKey: "tavşan", spokenText: "tavşan" },
            { id: 4319, word: "tavşan", imageUrl: "/images/4319.webp", isCorrect: false, audioKey: "tavşan", spokenText: "tavşan" }
        ]
    },
];
