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
            tr: { question: 'Hangi at aç?', correct: 'Evet! Bu at aç.', wrong: 'Hayır, bu at tok.' }
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
            tr: { question: 'Hangi at tok?', correct: 'Evet! Bu at tok.', wrong: 'Hayır, bu at aç.' }
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
            tr: { question: 'Hangi bebek aç?', correct: 'Evet! Bu bebek aç.', wrong: 'Hayır, bu bebek tok.' }
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
            tr: { question: 'Hangi bebek tok?', correct: 'Evet! Bu bebek tok.', wrong: 'Hayır, bu bebek aç.' }
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
            tr: { question: 'Hangi civciv aç?', correct: 'Evet! Bu civciv aç.', wrong: 'Hayır, bu civciv tok.' }
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
            tr: { question: 'Hangi civciv tok?', correct: 'Evet! Bu civciv tok.', wrong: 'Hayır, bu civciv aç.' }
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
            tr: { question: 'Hangi çocuk aç?', correct: 'Evet! Bu çocuk aç.', wrong: 'Hayır, bu çocuk tok.' }
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
            tr: { question: 'Hangi çocuk tok?', correct: 'Evet! Bu çocuk tok.', wrong: 'Hayır, bu çocuk aç.' }
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
            tr: { question: 'Hangi inek aç?', correct: 'Evet! Bu inek aç.', wrong: 'Hayır, bu inek tok.' }
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
            tr: { question: 'Hangi inek tok?', correct: 'Evet! Bu inek tok.', wrong: 'Hayır, bu inek aç.' }
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
            tr: { question: 'Hangi kedi aç?', correct: 'Evet! Bu kedi aç.', wrong: 'Hayır, bu kedi tok.' }
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
            tr: { question: 'Hangi kedi tok?', correct: 'Evet! Bu kedi tok.', wrong: 'Hayır, bu kedi aç.' }
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
            tr: { question: 'Hangi köpek aç?', correct: 'Evet! Bu köpek aç.', wrong: 'Hayır, bu köpek tok.' }
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
            tr: { question: 'Hangi köpek tok?', correct: 'Evet! Bu köpek tok.', wrong: 'Hayır, bu köpek aç.' }
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
            tr: { question: 'Hangi kuş aç?', correct: 'Evet! Bu kuş aç.', wrong: 'Hayır, bu kuş tok.' }
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
            tr: { question: 'Hangi kuş tok?', correct: 'Evet! Bu kuş tok.', wrong: 'Hayır, bu kuş aç.' }
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
            tr: { question: 'Hangi kuzu aç?', correct: 'Evet! Bu kuzu aç.', wrong: 'Hayır, bu kuzu tok.' }
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
            tr: { question: 'Hangi kuzu tok?', correct: 'Evet! Bu kuzu tok.', wrong: 'Hayır, bu kuzu aç.' }
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
            tr: { question: 'Hangi tavşan aç?', correct: 'Evet! Bu tavşan aç.', wrong: 'Hayır, bu tavşan tok.' }
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
            tr: { question: 'Hangi tavşan tok?', correct: 'Evet! Bu tavşan tok.', wrong: 'Hayır, bu tavşan aç.' }
        },
        options: [
            { id: 4320, word: "tavşan", imageUrl: "/images/4320.webp", isCorrect: true, audioKey: "tavşan", spokenText: "tavşan" },
            { id: 4319, word: "tavşan", imageUrl: "/images/4319.webp", isCorrect: false, audioKey: "tavşan", spokenText: "tavşan" }
        ]
    },
];
