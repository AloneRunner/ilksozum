// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (tembel-caliskan). Elle düzenleme.
// 4 çift, 8 soru. Görseller: gorsel-ham/tembel-caliskan/ → id 4501-4508.
import { ConceptRound, ActivityType } from '../../../../types';

export const tembelCaliskanDataYeni: ConceptRound[] = [
    // çocuk
    {
        id: 1,
        question: "Hangi çocuk çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk çalışkan?', correct: 'Evet! Çocuk çalışkandır.', wrong: 'Hayır, bu çocuk tembeldir.' }
        },
        options: [
            { id: 4501, word: "çocuk", imageUrl: "/images/4501.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4502, word: "çocuk", imageUrl: "/images/4502.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 2,
        question: "Hangi çocuk tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk tembel?', correct: 'Evet! Çocuk tembeldir.', wrong: 'Hayır, bu çocuk çalışkandır.' }
        },
        options: [
            { id: 4502, word: "çocuk", imageUrl: "/images/4502.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4501, word: "çocuk", imageUrl: "/images/4501.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // karinca_agustos
    {
        id: 3,
        question: "Çalışkan olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Çalışkan olan hangisi?', correct: 'Evet! Karınca çalışkandır.', wrong: 'Hayır, ağustos böceği tembeldir.' }
        },
        options: [
            { id: 4503, word: "karınca", imageUrl: "/images/4503.webp", isCorrect: true, audioKey: "karınca", spokenText: "karınca" },
            { id: 4504, word: "ağustos böceği", imageUrl: "/images/4504.webp", isCorrect: false, audioKey: "ağustos böceği", spokenText: "ağustos böceği" }
        ]
    },
    {
        id: 4,
        question: "Tembel olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Tembel olan hangisi?', correct: 'Evet! Ağustos böceği tembeldir.', wrong: 'Hayır, karınca çalışkandır.' }
        },
        options: [
            { id: 4504, word: "ağustos böceği", imageUrl: "/images/4504.webp", isCorrect: true, audioKey: "ağustos böceği", spokenText: "ağustos böceği" },
            { id: 4503, word: "karınca", imageUrl: "/images/4503.webp", isCorrect: false, audioKey: "karınca", spokenText: "karınca" }
        ]
    },
    // çocuk
    {
        id: 5,
        question: "Hangi çocuk çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk çalışkan?', correct: 'Evet! Çocuk çalışkandır.', wrong: 'Hayır, bu çocuk tembeldir.' }
        },
        options: [
            { id: 4505, word: "çocuk", imageUrl: "/images/4505.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4506, word: "çocuk", imageUrl: "/images/4506.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 6,
        question: "Hangi çocuk tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk tembel?', correct: 'Evet! Çocuk tembeldir.', wrong: 'Hayır, bu çocuk çalışkandır.' }
        },
        options: [
            { id: 4506, word: "çocuk", imageUrl: "/images/4506.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4505, word: "çocuk", imageUrl: "/images/4505.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // çocuk
    {
        id: 7,
        question: "Hangi çocuk çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk çalışkan?', correct: 'Evet! Çocuk çalışkandır.', wrong: 'Hayır, bu çocuk tembeldir.' }
        },
        options: [
            { id: 4507, word: "çocuk", imageUrl: "/images/4507.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4508, word: "çocuk", imageUrl: "/images/4508.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 8,
        question: "Hangi çocuk tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk tembel?', correct: 'Evet! Çocuk tembeldir.', wrong: 'Hayır, bu çocuk çalışkandır.' }
        },
        options: [
            { id: 4508, word: "çocuk", imageUrl: "/images/4508.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4507, word: "çocuk", imageUrl: "/images/4507.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
];
