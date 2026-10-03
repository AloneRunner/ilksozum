// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (tembel-caliskan). Elle düzenleme.
// 7 çift, 14 soru. Görseller: gorsel-ham/tembel-caliskan/ → id 4501-4514.
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
    // çiftçi
    {
        id: 3,
        question: "Hangi çiftçi çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çiftçi çalışkan?', correct: 'Evet! Çiftçi çalışkandır.', wrong: 'Hayır, bu çiftçi tembeldir.' }
        },
        options: [
            { id: 4503, word: "çiftçi", imageUrl: "/images/4503.webp", isCorrect: true, audioKey: "çiftçi", spokenText: "çiftçi" },
            { id: 4504, word: "çiftçi", imageUrl: "/images/4504.webp", isCorrect: false, audioKey: "çiftçi", spokenText: "çiftçi" }
        ]
    },
    {
        id: 4,
        question: "Hangi çiftçi tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çiftçi tembel?', correct: 'Evet! Çiftçi tembeldir.', wrong: 'Hayır, bu çiftçi çalışkandır.' }
        },
        options: [
            { id: 4504, word: "çiftçi", imageUrl: "/images/4504.webp", isCorrect: true, audioKey: "çiftçi", spokenText: "çiftçi" },
            { id: 4503, word: "çiftçi", imageUrl: "/images/4503.webp", isCorrect: false, audioKey: "çiftçi", spokenText: "çiftçi" }
        ]
    },
    // fırıncı
    {
        id: 5,
        question: "Hangi fırıncı çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi fırıncı çalışkan?', correct: 'Evet! Fırıncı çalışkandır.', wrong: 'Hayır, bu fırıncı tembeldir.' }
        },
        options: [
            { id: 4505, word: "fırıncı", imageUrl: "/images/4505.webp", isCorrect: true, audioKey: "fırıncı", spokenText: "fırıncı" },
            { id: 4506, word: "fırıncı", imageUrl: "/images/4506.webp", isCorrect: false, audioKey: "fırıncı", spokenText: "fırıncı" }
        ]
    },
    {
        id: 6,
        question: "Hangi fırıncı tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi fırıncı tembel?', correct: 'Evet! Fırıncı tembeldir.', wrong: 'Hayır, bu fırıncı çalışkandır.' }
        },
        options: [
            { id: 4506, word: "fırıncı", imageUrl: "/images/4506.webp", isCorrect: true, audioKey: "fırıncı", spokenText: "fırıncı" },
            { id: 4505, word: "fırıncı", imageUrl: "/images/4505.webp", isCorrect: false, audioKey: "fırıncı", spokenText: "fırıncı" }
        ]
    },
    // karinca_agustos
    {
        id: 7,
        question: "Çalışkan olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Çalışkan olan hangisi?', correct: 'Evet! Karınca çalışkandır.', wrong: 'Hayır, ağustos böceği tembeldir.' }
        },
        options: [
            { id: 4507, word: "karınca", imageUrl: "/images/4507.webp", isCorrect: true, audioKey: "karınca", spokenText: "karınca" },
            { id: 4508, word: "ağustos böceği", imageUrl: "/images/4508.webp", isCorrect: false, audioKey: "ağustos böceği", spokenText: "ağustos böceği" }
        ]
    },
    {
        id: 8,
        question: "Tembel olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Tembel olan hangisi?', correct: 'Evet! Ağustos böceği tembeldir.', wrong: 'Hayır, karınca çalışkandır.' }
        },
        options: [
            { id: 4508, word: "ağustos böceği", imageUrl: "/images/4508.webp", isCorrect: true, audioKey: "ağustos böceği", spokenText: "ağustos böceği" },
            { id: 4507, word: "karınca", imageUrl: "/images/4507.webp", isCorrect: false, audioKey: "karınca", spokenText: "karınca" }
        ]
    },
    // çocuk
    {
        id: 9,
        question: "Hangi çocuk çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk çalışkan?', correct: 'Evet! Çocuk çalışkandır.', wrong: 'Hayır, bu çocuk tembeldir.' }
        },
        options: [
            { id: 4509, word: "çocuk", imageUrl: "/images/4509.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4510, word: "çocuk", imageUrl: "/images/4510.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 10,
        question: "Hangi çocuk tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk tembel?', correct: 'Evet! Çocuk tembeldir.', wrong: 'Hayır, bu çocuk çalışkandır.' }
        },
        options: [
            { id: 4510, word: "çocuk", imageUrl: "/images/4510.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4509, word: "çocuk", imageUrl: "/images/4509.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // çocuk
    {
        id: 11,
        question: "Hangi çocuk çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk çalışkan?', correct: 'Evet! Çocuk çalışkandır.', wrong: 'Hayır, bu çocuk tembeldir.' }
        },
        options: [
            { id: 4511, word: "çocuk", imageUrl: "/images/4511.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4512, word: "çocuk", imageUrl: "/images/4512.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 12,
        question: "Hangi çocuk tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk tembel?', correct: 'Evet! Çocuk tembeldir.', wrong: 'Hayır, bu çocuk çalışkandır.' }
        },
        options: [
            { id: 4512, word: "çocuk", imageUrl: "/images/4512.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4511, word: "çocuk", imageUrl: "/images/4511.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // çocuk
    {
        id: 13,
        question: "Hangi çocuk çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk çalışkan?', correct: 'Evet! Çocuk çalışkandır.', wrong: 'Hayır, bu çocuk tembeldir.' }
        },
        options: [
            { id: 4513, word: "çocuk", imageUrl: "/images/4513.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4514, word: "çocuk", imageUrl: "/images/4514.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 14,
        question: "Hangi çocuk tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk tembel?', correct: 'Evet! Çocuk tembeldir.', wrong: 'Hayır, bu çocuk çalışkandır.' }
        },
        options: [
            { id: 4514, word: "çocuk", imageUrl: "/images/4514.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4513, word: "çocuk", imageUrl: "/images/4513.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
];
