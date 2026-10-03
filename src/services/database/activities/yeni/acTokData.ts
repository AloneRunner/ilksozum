// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (ac-tok). Elle düzenleme.
// 5 çift, 10 soru. Görseller: gorsel-ham/ac-tok/ → id 4301-4310.
import { ConceptRound, ActivityType } from '../../../../types';

export const hungryFullDataYeni: ConceptRound[] = [
    // bebek
    {
        id: 1,
        question: "Hangi bebek aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi bebek aç?', correct: 'Evet! Bebek açtır.', wrong: 'Hayır, bu bebek toktur.' }
        },
        options: [
            { id: 4301, word: "bebek", imageUrl: "/images/4301.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 4302, word: "bebek", imageUrl: "/images/4302.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    {
        id: 2,
        question: "Hangi bebek tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi bebek tok?', correct: 'Evet! Bebek toktur.', wrong: 'Hayır, bu bebek açtır.' }
        },
        options: [
            { id: 4302, word: "bebek", imageUrl: "/images/4302.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 4301, word: "bebek", imageUrl: "/images/4301.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    // çocuk
    {
        id: 3,
        question: "Hangi çocuk aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi çocuk aç?', correct: 'Evet! Çocuk açtır.', wrong: 'Hayır, bu çocuk toktur.' }
        },
        options: [
            { id: 4303, word: "çocuk", imageUrl: "/images/4303.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4304, word: "çocuk", imageUrl: "/images/4304.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 4,
        question: "Hangi çocuk tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi çocuk tok?', correct: 'Evet! Çocuk toktur.', wrong: 'Hayır, bu çocuk açtır.' }
        },
        options: [
            { id: 4304, word: "çocuk", imageUrl: "/images/4304.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4303, word: "çocuk", imageUrl: "/images/4303.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // kedi
    {
        id: 5,
        question: "Hangi kedi aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi kedi aç?', correct: 'Evet! Kedi açtır.', wrong: 'Hayır, bu kedi toktur.' }
        },
        options: [
            { id: 4305, word: "kedi", imageUrl: "/images/4305.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 4306, word: "kedi", imageUrl: "/images/4306.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    {
        id: 6,
        question: "Hangi kedi tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi kedi tok?', correct: 'Evet! Kedi toktur.', wrong: 'Hayır, bu kedi açtır.' }
        },
        options: [
            { id: 4306, word: "kedi", imageUrl: "/images/4306.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 4305, word: "kedi", imageUrl: "/images/4305.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // köpek
    {
        id: 7,
        question: "Hangi köpek aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi köpek aç?', correct: 'Evet! Köpek açtır.', wrong: 'Hayır, bu köpek toktur.' }
        },
        options: [
            { id: 4307, word: "köpek", imageUrl: "/images/4307.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 4308, word: "köpek", imageUrl: "/images/4308.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    {
        id: 8,
        question: "Hangi köpek tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi köpek tok?', correct: 'Evet! Köpek toktur.', wrong: 'Hayır, bu köpek açtır.' }
        },
        options: [
            { id: 4308, word: "köpek", imageUrl: "/images/4308.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 4307, word: "köpek", imageUrl: "/images/4307.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    // kuş
    {
        id: 9,
        question: "Hangi kuş aç?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi kuş aç?', correct: 'Evet! Kuş açtır.', wrong: 'Hayır, bu kuş toktur.' }
        },
        options: [
            { id: 4309, word: "kuş", imageUrl: "/images/4309.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 4310, word: "kuş", imageUrl: "/images/4310.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
    {
        id: 10,
        question: "Hangi kuş tok?",
        questionAudioKey: "",
        activityType: ActivityType.HungryFull,
        speech: {
            tr: { question: 'Hangi kuş tok?', correct: 'Evet! Kuş toktur.', wrong: 'Hayır, bu kuş açtır.' }
        },
        options: [
            { id: 4310, word: "kuş", imageUrl: "/images/4310.webp", isCorrect: true, audioKey: "kuş", spokenText: "kuş" },
            { id: 4309, word: "kuş", imageUrl: "/images/4309.webp", isCorrect: false, audioKey: "kuş", spokenText: "kuş" }
        ]
    },
];
