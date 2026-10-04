// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (duygular). Elle düzenleme.
// 11 çift, 22 soru. Görseller: gorsel-ham/duygular/ → id 6501-6512.
import { ConceptRound, ActivityType } from '../../../../types';

export const emotionsDataYeni: ConceptRound[] = [
    // çocuk
    {
        id: 1,
        question: "Hangi çocuk mutlu?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk mutlu?', correct: 'Evet! Bu çocuk mutlu.', wrong: 'Hayır, bu çocuk üzgün.' }
        },
        options: [
            { id: 6502, word: "çocuk", imageUrl: "/images/6502.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6503, word: "çocuk", imageUrl: "/images/6503.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 2,
        question: "Hangi çocuk üzgün?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk üzgün?', correct: 'Evet! Bu çocuk üzgün.', wrong: 'Hayır, bu çocuk mutlu.' }
        },
        options: [
            { id: 6503, word: "çocuk", imageUrl: "/images/6503.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6502, word: "çocuk", imageUrl: "/images/6502.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 3,
        question: "Hangi çocuk mutlu?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk mutlu?', correct: 'Evet! Bu çocuk mutlu.', wrong: 'Hayır, bu çocuk kızgın.' }
        },
        options: [
            { id: 6502, word: "çocuk", imageUrl: "/images/6502.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6501, word: "çocuk", imageUrl: "/images/6501.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 4,
        question: "Hangi çocuk kızgın?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk kızgın?', correct: 'Evet! Bu çocuk kızgın.', wrong: 'Hayır, bu çocuk mutlu.' }
        },
        options: [
            { id: 6501, word: "çocuk", imageUrl: "/images/6501.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6502, word: "çocuk", imageUrl: "/images/6502.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 5,
        question: "Hangi çocuk üzgün?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk üzgün?', correct: 'Evet! Bu çocuk üzgün.', wrong: 'Hayır, bu çocuk kızgın.' }
        },
        options: [
            { id: 6503, word: "çocuk", imageUrl: "/images/6503.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6501, word: "çocuk", imageUrl: "/images/6501.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 6,
        question: "Hangi çocuk kızgın?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk kızgın?', correct: 'Evet! Bu çocuk kızgın.', wrong: 'Hayır, bu çocuk üzgün.' }
        },
        options: [
            { id: 6501, word: "çocuk", imageUrl: "/images/6501.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6503, word: "çocuk", imageUrl: "/images/6503.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // çocuk
    {
        id: 7,
        question: "Hangi çocuk mutlu?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk mutlu?', correct: 'Evet! Bu çocuk mutlu.', wrong: 'Hayır, bu çocuk korkmuş.' }
        },
        options: [
            { id: 6505, word: "çocuk", imageUrl: "/images/6505.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6504, word: "çocuk", imageUrl: "/images/6504.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 8,
        question: "Hangi çocuk korkmuş?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk korkmuş?', correct: 'Evet! Bu çocuk korkmuş.', wrong: 'Hayır, bu çocuk mutlu.' }
        },
        options: [
            { id: 6504, word: "çocuk", imageUrl: "/images/6504.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6505, word: "çocuk", imageUrl: "/images/6505.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 9,
        question: "Hangi çocuk mutlu?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk mutlu?', correct: 'Evet! Bu çocuk mutlu.', wrong: 'Hayır, bu çocuk şaşkın.' }
        },
        options: [
            { id: 6505, word: "çocuk", imageUrl: "/images/6505.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6506, word: "çocuk", imageUrl: "/images/6506.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 10,
        question: "Hangi çocuk şaşkın?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk şaşkın?', correct: 'Evet! Bu çocuk şaşkın.', wrong: 'Hayır, bu çocuk mutlu.' }
        },
        options: [
            { id: 6506, word: "çocuk", imageUrl: "/images/6506.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6505, word: "çocuk", imageUrl: "/images/6505.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // çocuk
    {
        id: 11,
        question: "Hangi çocuk üzgün?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk üzgün?', correct: 'Evet! Bu çocuk üzgün.', wrong: 'Hayır, bu çocuk kızgın.' }
        },
        options: [
            { id: 6509, word: "çocuk", imageUrl: "/images/6509.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6507, word: "çocuk", imageUrl: "/images/6507.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 12,
        question: "Hangi çocuk kızgın?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk kızgın?', correct: 'Evet! Bu çocuk kızgın.', wrong: 'Hayır, bu çocuk üzgün.' }
        },
        options: [
            { id: 6507, word: "çocuk", imageUrl: "/images/6507.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6509, word: "çocuk", imageUrl: "/images/6509.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 13,
        question: "Hangi çocuk üzgün?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk üzgün?', correct: 'Evet! Bu çocuk üzgün.', wrong: 'Hayır, bu çocuk uykulu.' }
        },
        options: [
            { id: 6509, word: "çocuk", imageUrl: "/images/6509.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6508, word: "çocuk", imageUrl: "/images/6508.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 14,
        question: "Hangi çocuk uykulu?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk uykulu?', correct: 'Evet! Bu çocuk uykulu.', wrong: 'Hayır, bu çocuk üzgün.' }
        },
        options: [
            { id: 6508, word: "çocuk", imageUrl: "/images/6508.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6509, word: "çocuk", imageUrl: "/images/6509.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 15,
        question: "Hangi çocuk kızgın?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk kızgın?', correct: 'Evet! Bu çocuk kızgın.', wrong: 'Hayır, bu çocuk uykulu.' }
        },
        options: [
            { id: 6507, word: "çocuk", imageUrl: "/images/6507.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6508, word: "çocuk", imageUrl: "/images/6508.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 16,
        question: "Hangi çocuk uykulu?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk uykulu?', correct: 'Evet! Bu çocuk uykulu.', wrong: 'Hayır, bu çocuk kızgın.' }
        },
        options: [
            { id: 6508, word: "çocuk", imageUrl: "/images/6508.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6507, word: "çocuk", imageUrl: "/images/6507.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // çocuk
    {
        id: 17,
        question: "Hangi çocuk mutlu?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk mutlu?', correct: 'Evet! Bu çocuk mutlu.', wrong: 'Hayır, bu çocuk şaşkın.' }
        },
        options: [
            { id: 6510, word: "çocuk", imageUrl: "/images/6510.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6511, word: "çocuk", imageUrl: "/images/6511.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 18,
        question: "Hangi çocuk şaşkın?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk şaşkın?', correct: 'Evet! Bu çocuk şaşkın.', wrong: 'Hayır, bu çocuk mutlu.' }
        },
        options: [
            { id: 6511, word: "çocuk", imageUrl: "/images/6511.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6510, word: "çocuk", imageUrl: "/images/6510.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 19,
        question: "Hangi çocuk mutlu?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk mutlu?', correct: 'Evet! Bu çocuk mutlu.', wrong: 'Hayır, bu çocuk uykulu.' }
        },
        options: [
            { id: 6510, word: "çocuk", imageUrl: "/images/6510.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6512, word: "çocuk", imageUrl: "/images/6512.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 20,
        question: "Hangi çocuk uykulu?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk uykulu?', correct: 'Evet! Bu çocuk uykulu.', wrong: 'Hayır, bu çocuk mutlu.' }
        },
        options: [
            { id: 6512, word: "çocuk", imageUrl: "/images/6512.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6510, word: "çocuk", imageUrl: "/images/6510.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 21,
        question: "Hangi çocuk şaşkın?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk şaşkın?', correct: 'Evet! Bu çocuk şaşkın.', wrong: 'Hayır, bu çocuk uykulu.' }
        },
        options: [
            { id: 6511, word: "çocuk", imageUrl: "/images/6511.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6512, word: "çocuk", imageUrl: "/images/6512.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 22,
        question: "Hangi çocuk uykulu?",
        questionAudioKey: "",
        activityType: ActivityType.Emotions,
        speech: {
            tr: { question: 'Hangi çocuk uykulu?', correct: 'Evet! Bu çocuk uykulu.', wrong: 'Hayır, bu çocuk şaşkın.' }
        },
        options: [
            { id: 6512, word: "çocuk", imageUrl: "/images/6512.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6511, word: "çocuk", imageUrl: "/images/6511.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
];
