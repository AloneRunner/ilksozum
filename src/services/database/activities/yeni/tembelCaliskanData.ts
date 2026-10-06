// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (tembel-caliskan). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/tembel-caliskan/ → id 4501-4520.
import { ConceptRound, ActivityType } from '../../../../types';

export const tembelCaliskanDataYeni: ConceptRound[] = [
    // aşçı
    {
        id: 1,
        question: "Hangi aşçı çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi aşçı çalışkan?', correct: 'Evet! Bu aşçı çalışkan.', wrong: 'Hayır, bu aşçı tembel.' }
        },
        options: [
            { id: 4501, word: "aşçı", imageUrl: "/images/4501.webp", isCorrect: true, audioKey: "aşçı", spokenText: "aşçı" },
            { id: 4502, word: "aşçı", imageUrl: "/images/4502.webp", isCorrect: false, audioKey: "aşçı", spokenText: "aşçı" }
        ]
    },
    {
        id: 2,
        question: "Hangi aşçı tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi aşçı tembel?', correct: 'Evet! Bu aşçı tembel.', wrong: 'Hayır, bu aşçı çalışkan.' }
        },
        options: [
            { id: 4502, word: "aşçı", imageUrl: "/images/4502.webp", isCorrect: true, audioKey: "aşçı", spokenText: "aşçı" },
            { id: 4501, word: "aşçı", imageUrl: "/images/4501.webp", isCorrect: false, audioKey: "aşçı", spokenText: "aşçı" }
        ]
    },
    // çocuk
    {
        id: 3,
        question: "Hangi çocuk çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk çalışkan?', correct: 'Evet! Bu çocuk çalışkan.', wrong: 'Hayır, bu çocuk tembel.' }
        },
        options: [
            { id: 4503, word: "çocuk", imageUrl: "/images/4503.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4504, word: "çocuk", imageUrl: "/images/4504.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 4,
        question: "Hangi çocuk tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk tembel?', correct: 'Evet! Bu çocuk tembel.', wrong: 'Hayır, bu çocuk çalışkan.' }
        },
        options: [
            { id: 4504, word: "çocuk", imageUrl: "/images/4504.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4503, word: "çocuk", imageUrl: "/images/4503.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // boyacı
    {
        id: 5,
        question: "Hangi boyacı çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi boyacı çalışkan?', correct: 'Evet! Bu boyacı çalışkan.', wrong: 'Hayır, bu boyacı tembel.' }
        },
        options: [
            { id: 4505, word: "boyacı", imageUrl: "/images/4505.webp", isCorrect: true, audioKey: "boyacı", spokenText: "boyacı" },
            { id: 4506, word: "boyacı", imageUrl: "/images/4506.webp", isCorrect: false, audioKey: "boyacı", spokenText: "boyacı" }
        ]
    },
    {
        id: 6,
        question: "Hangi boyacı tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi boyacı tembel?', correct: 'Evet! Bu boyacı tembel.', wrong: 'Hayır, bu boyacı çalışkan.' }
        },
        options: [
            { id: 4506, word: "boyacı", imageUrl: "/images/4506.webp", isCorrect: true, audioKey: "boyacı", spokenText: "boyacı" },
            { id: 4505, word: "boyacı", imageUrl: "/images/4505.webp", isCorrect: false, audioKey: "boyacı", spokenText: "boyacı" }
        ]
    },
    // çiftçi
    {
        id: 7,
        question: "Hangi çiftçi çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çiftçi çalışkan?', correct: 'Evet! Bu çiftçi çalışkan.', wrong: 'Hayır, bu çiftçi tembel.' }
        },
        options: [
            { id: 4507, word: "çiftçi", imageUrl: "/images/4507.webp", isCorrect: true, audioKey: "çiftçi", spokenText: "çiftçi" },
            { id: 4508, word: "çiftçi", imageUrl: "/images/4508.webp", isCorrect: false, audioKey: "çiftçi", spokenText: "çiftçi" }
        ]
    },
    {
        id: 8,
        question: "Hangi çiftçi tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çiftçi tembel?', correct: 'Evet! Bu çiftçi tembel.', wrong: 'Hayır, bu çiftçi çalışkan.' }
        },
        options: [
            { id: 4508, word: "çiftçi", imageUrl: "/images/4508.webp", isCorrect: true, audioKey: "çiftçi", spokenText: "çiftçi" },
            { id: 4507, word: "çiftçi", imageUrl: "/images/4507.webp", isCorrect: false, audioKey: "çiftçi", spokenText: "çiftçi" }
        ]
    },
    // fırıncı
    {
        id: 9,
        question: "Hangi fırıncı çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi fırıncı çalışkan?', correct: 'Evet! Bu fırıncı çalışkan.', wrong: 'Hayır, bu fırıncı tembel.' }
        },
        options: [
            { id: 4509, word: "fırıncı", imageUrl: "/images/4509.webp", isCorrect: true, audioKey: "fırıncı", spokenText: "fırıncı" },
            { id: 4510, word: "fırıncı", imageUrl: "/images/4510.webp", isCorrect: false, audioKey: "fırıncı", spokenText: "fırıncı" }
        ]
    },
    {
        id: 10,
        question: "Hangi fırıncı tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi fırıncı tembel?', correct: 'Evet! Bu fırıncı tembel.', wrong: 'Hayır, bu fırıncı çalışkan.' }
        },
        options: [
            { id: 4510, word: "fırıncı", imageUrl: "/images/4510.webp", isCorrect: true, audioKey: "fırıncı", spokenText: "fırıncı" },
            { id: 4509, word: "fırıncı", imageUrl: "/images/4509.webp", isCorrect: false, audioKey: "fırıncı", spokenText: "fırıncı" }
        ]
    },
    // karinca_agustos
    {
        id: 11,
        question: "Çalışkan olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Çalışkan olan hangisi?', correct: 'Evet! Karınca çalışkandır.', wrong: 'Hayır, ağustos böceği tembeldir.' }
        },
        options: [
            { id: 4511, word: "karınca", imageUrl: "/images/4511.webp", isCorrect: true, audioKey: "karınca", spokenText: "karınca" },
            { id: 4512, word: "ağustos böceği", imageUrl: "/images/4512.webp", isCorrect: false, audioKey: "ağustos böceği", spokenText: "ağustos böceği" }
        ]
    },
    {
        id: 12,
        question: "Tembel olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Tembel olan hangisi?', correct: 'Evet! Ağustos böceği tembeldir.', wrong: 'Hayır, karınca çalışkandır.' }
        },
        options: [
            { id: 4512, word: "ağustos böceği", imageUrl: "/images/4512.webp", isCorrect: true, audioKey: "ağustos böceği", spokenText: "ağustos böceği" },
            { id: 4511, word: "karınca", imageUrl: "/images/4511.webp", isCorrect: false, audioKey: "karınca", spokenText: "karınca" }
        ]
    },
    // köpek
    {
        id: 13,
        question: "Hangi köpek çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi köpek çalışkan?', correct: 'Evet! Bu köpek çalışkan.', wrong: 'Hayır, bu köpek tembel.' }
        },
        options: [
            { id: 4513, word: "köpek", imageUrl: "/images/4513.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 4514, word: "köpek", imageUrl: "/images/4514.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    {
        id: 14,
        question: "Hangi köpek tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi köpek tembel?', correct: 'Evet! Bu köpek tembel.', wrong: 'Hayır, bu köpek çalışkan.' }
        },
        options: [
            { id: 4514, word: "köpek", imageUrl: "/images/4514.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 4513, word: "köpek", imageUrl: "/images/4513.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    // çocuk
    {
        id: 15,
        question: "Hangi çocuk çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk çalışkan?', correct: 'Evet! Bu çocuk çalışkan.', wrong: 'Hayır, bu çocuk tembel.' }
        },
        options: [
            { id: 4515, word: "çocuk", imageUrl: "/images/4515.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4516, word: "çocuk", imageUrl: "/images/4516.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 16,
        question: "Hangi çocuk tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk tembel?', correct: 'Evet! Bu çocuk tembel.', wrong: 'Hayır, bu çocuk çalışkan.' }
        },
        options: [
            { id: 4516, word: "çocuk", imageUrl: "/images/4516.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4515, word: "çocuk", imageUrl: "/images/4515.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // çocuk
    {
        id: 17,
        question: "Hangi çocuk çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk çalışkan?', correct: 'Evet! Bu çocuk çalışkan.', wrong: 'Hayır, bu çocuk tembel.' }
        },
        options: [
            { id: 4517, word: "çocuk", imageUrl: "/images/4517.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4518, word: "çocuk", imageUrl: "/images/4518.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 18,
        question: "Hangi çocuk tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk tembel?', correct: 'Evet! Bu çocuk tembel.', wrong: 'Hayır, bu çocuk çalışkan.' }
        },
        options: [
            { id: 4518, word: "çocuk", imageUrl: "/images/4518.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4517, word: "çocuk", imageUrl: "/images/4517.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // çocuk
    {
        id: 19,
        question: "Hangi çocuk çalışkan?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk çalışkan?', correct: 'Evet! Bu çocuk çalışkan.', wrong: 'Hayır, bu çocuk tembel.' }
        },
        options: [
            { id: 4519, word: "çocuk", imageUrl: "/images/4519.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4520, word: "çocuk", imageUrl: "/images/4520.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 20,
        question: "Hangi çocuk tembel?",
        questionAudioKey: "",
        activityType: ActivityType.TembelCaliskan,
        speech: {
            tr: { question: 'Hangi çocuk tembel?', correct: 'Evet! Bu çocuk tembel.', wrong: 'Hayır, bu çocuk çalışkan.' }
        },
        options: [
            { id: 4520, word: "çocuk", imageUrl: "/images/4520.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4519, word: "çocuk", imageUrl: "/images/4519.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
];
