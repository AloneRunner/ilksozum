// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (gurultulu-sessiz). Elle düzenleme.
// 6 çift, 12 soru. Görseller: gorsel-ham/gurultulu-sessiz/ → id 4201-4212.
import { ConceptRound, ActivityType } from '../../../../types';

export const noisyQuietDataYeni: ConceptRound[] = [
    // bebek
    {
        id: 1,
        question: "Hangi bebek gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi bebek gürültülü?', correct: 'Evet! Bebek gürültülüdür.', wrong: 'Hayır, bu bebek sessizdir.' }
        },
        options: [
            { id: 4201, word: "bebek", imageUrl: "/images/4201.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 4202, word: "bebek", imageUrl: "/images/4202.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    {
        id: 2,
        question: "Hangi bebek sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi bebek sessiz?', correct: 'Evet! Bebek sessizdir.', wrong: 'Hayır, bu bebek gürültülüdür.' }
        },
        options: [
            { id: 4202, word: "bebek", imageUrl: "/images/4202.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 4201, word: "bebek", imageUrl: "/images/4201.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    // çocuk
    {
        id: 3,
        question: "Hangi çocuk gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi çocuk gürültülü?', correct: 'Evet! Çocuk gürültülüdür.', wrong: 'Hayır, bu çocuk sessizdir.' }
        },
        options: [
            { id: 4203, word: "çocuk", imageUrl: "/images/4203.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4204, word: "çocuk", imageUrl: "/images/4204.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 4,
        question: "Hangi çocuk sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi çocuk sessiz?', correct: 'Evet! Çocuk sessizdir.', wrong: 'Hayır, bu çocuk gürültülüdür.' }
        },
        options: [
            { id: 4204, word: "çocuk", imageUrl: "/images/4204.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4203, word: "çocuk", imageUrl: "/images/4203.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // horoz
    {
        id: 5,
        question: "Hangi horoz gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi horoz gürültülü?', correct: 'Evet! Horoz gürültülüdür.', wrong: 'Hayır, bu horoz sessizdir.' }
        },
        options: [
            { id: 4205, word: "horoz", imageUrl: "/images/4205.webp", isCorrect: true, audioKey: "horoz", spokenText: "horoz" },
            { id: 4206, word: "horoz", imageUrl: "/images/4206.webp", isCorrect: false, audioKey: "horoz", spokenText: "horoz" }
        ]
    },
    {
        id: 6,
        question: "Hangi horoz sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi horoz sessiz?', correct: 'Evet! Horoz sessizdir.', wrong: 'Hayır, bu horoz gürültülüdür.' }
        },
        options: [
            { id: 4206, word: "horoz", imageUrl: "/images/4206.webp", isCorrect: true, audioKey: "horoz", spokenText: "horoz" },
            { id: 4205, word: "horoz", imageUrl: "/images/4205.webp", isCorrect: false, audioKey: "horoz", spokenText: "horoz" }
        ]
    },
    // köpek
    {
        id: 7,
        question: "Hangi köpek gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi köpek gürültülü?', correct: 'Evet! Köpek gürültülüdür.', wrong: 'Hayır, bu köpek sessizdir.' }
        },
        options: [
            { id: 4207, word: "köpek", imageUrl: "/images/4207.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 4208, word: "köpek", imageUrl: "/images/4208.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    {
        id: 8,
        question: "Hangi köpek sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi köpek sessiz?', correct: 'Evet! Köpek sessizdir.', wrong: 'Hayır, bu köpek gürültülüdür.' }
        },
        options: [
            { id: 4208, word: "köpek", imageUrl: "/images/4208.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 4207, word: "köpek", imageUrl: "/images/4207.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    // çocuk
    {
        id: 9,
        question: "Hangi çocuk gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi çocuk gürültülü?', correct: 'Evet! Çocuk gürültülüdür.', wrong: 'Hayır, bu çocuk sessizdir.' }
        },
        options: [
            { id: 4209, word: "çocuk", imageUrl: "/images/4209.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4210, word: "çocuk", imageUrl: "/images/4210.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 10,
        question: "Hangi çocuk sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi çocuk sessiz?', correct: 'Evet! Çocuk sessizdir.', wrong: 'Hayır, bu çocuk gürültülüdür.' }
        },
        options: [
            { id: 4210, word: "çocuk", imageUrl: "/images/4210.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4209, word: "çocuk", imageUrl: "/images/4209.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // sınıf
    {
        id: 11,
        question: "Hangi sınıf gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi sınıf gürültülü?', correct: 'Evet! Sınıf gürültülüdür.', wrong: 'Hayır, bu sınıf sessizdir.' }
        },
        options: [
            { id: 4211, word: "sınıf", imageUrl: "/images/4211.webp", isCorrect: true, audioKey: "sınıf", spokenText: "sınıf" },
            { id: 4212, word: "sınıf", imageUrl: "/images/4212.webp", isCorrect: false, audioKey: "sınıf", spokenText: "sınıf" }
        ]
    },
    {
        id: 12,
        question: "Hangi sınıf sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi sınıf sessiz?', correct: 'Evet! Sınıf sessizdir.', wrong: 'Hayır, bu sınıf gürültülüdür.' }
        },
        options: [
            { id: 4212, word: "sınıf", imageUrl: "/images/4212.webp", isCorrect: true, audioKey: "sınıf", spokenText: "sınıf" },
            { id: 4211, word: "sınıf", imageUrl: "/images/4211.webp", isCorrect: false, audioKey: "sınıf", spokenText: "sınıf" }
        ]
    },
];
