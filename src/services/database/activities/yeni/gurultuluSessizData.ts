// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (gurultulu-sessiz). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/gurultulu-sessiz/ → id 4201-4220.
import { ConceptRound, ActivityType } from '../../../../types';

export const noisyQuietDataYeni: ConceptRound[] = [
    // aslan
    {
        id: 1,
        question: "Hangi aslan gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi aslan gürültülü?', correct: 'Evet! Bu aslan gürültülü.', wrong: 'Hayır, bu aslan sessiz.' }
        },
        options: [
            { id: 4201, word: "aslan", imageUrl: "/images/4201.webp", isCorrect: true, audioKey: "aslan", spokenText: "aslan" },
            { id: 4202, word: "aslan", imageUrl: "/images/4202.webp", isCorrect: false, audioKey: "aslan", spokenText: "aslan" }
        ]
    },
    {
        id: 2,
        question: "Hangi aslan sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi aslan sessiz?', correct: 'Evet! Bu aslan sessiz.', wrong: 'Hayır, bu aslan gürültülü.' }
        },
        options: [
            { id: 4202, word: "aslan", imageUrl: "/images/4202.webp", isCorrect: true, audioKey: "aslan", spokenText: "aslan" },
            { id: 4201, word: "aslan", imageUrl: "/images/4201.webp", isCorrect: false, audioKey: "aslan", spokenText: "aslan" }
        ]
    },
    // bebek
    {
        id: 3,
        question: "Hangi bebek gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi bebek gürültülü?', correct: 'Evet! Bu bebek gürültülü.', wrong: 'Hayır, bu bebek sessiz.' }
        },
        options: [
            { id: 4203, word: "bebek", imageUrl: "/images/4203.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 4204, word: "bebek", imageUrl: "/images/4204.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    {
        id: 4,
        question: "Hangi bebek sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi bebek sessiz?', correct: 'Evet! Bu bebek sessiz.', wrong: 'Hayır, bu bebek gürültülü.' }
        },
        options: [
            { id: 4204, word: "bebek", imageUrl: "/images/4204.webp", isCorrect: true, audioKey: "bebek", spokenText: "bebek" },
            { id: 4203, word: "bebek", imageUrl: "/images/4203.webp", isCorrect: false, audioKey: "bebek", spokenText: "bebek" }
        ]
    },
    // çocuk
    {
        id: 5,
        question: "Hangi çocuk gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi çocuk gürültülü?', correct: 'Evet! Bu çocuk gürültülü.', wrong: 'Hayır, bu çocuk sessiz.' }
        },
        options: [
            { id: 4205, word: "çocuk", imageUrl: "/images/4205.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4206, word: "çocuk", imageUrl: "/images/4206.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 6,
        question: "Hangi çocuk sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi çocuk sessiz?', correct: 'Evet! Bu çocuk sessiz.', wrong: 'Hayır, bu çocuk gürültülü.' }
        },
        options: [
            { id: 4206, word: "çocuk", imageUrl: "/images/4206.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4205, word: "çocuk", imageUrl: "/images/4205.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // eşek
    {
        id: 7,
        question: "Hangi eşek gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi eşek gürültülü?', correct: 'Evet! Bu eşek gürültülü.', wrong: 'Hayır, bu eşek sessiz.' }
        },
        options: [
            { id: 4207, word: "eşek", imageUrl: "/images/4207.webp", isCorrect: true, audioKey: "eşek", spokenText: "eşek" },
            { id: 4208, word: "eşek", imageUrl: "/images/4208.webp", isCorrect: false, audioKey: "eşek", spokenText: "eşek" }
        ]
    },
    {
        id: 8,
        question: "Hangi eşek sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi eşek sessiz?', correct: 'Evet! Bu eşek sessiz.', wrong: 'Hayır, bu eşek gürültülü.' }
        },
        options: [
            { id: 4208, word: "eşek", imageUrl: "/images/4208.webp", isCorrect: true, audioKey: "eşek", spokenText: "eşek" },
            { id: 4207, word: "eşek", imageUrl: "/images/4207.webp", isCorrect: false, audioKey: "eşek", spokenText: "eşek" }
        ]
    },
    // horoz
    {
        id: 9,
        question: "Hangi horoz gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi horoz gürültülü?', correct: 'Evet! Bu horoz gürültülü.', wrong: 'Hayır, bu horoz sessiz.' }
        },
        options: [
            { id: 4209, word: "horoz", imageUrl: "/images/4209.webp", isCorrect: true, audioKey: "horoz", spokenText: "horoz" },
            { id: 4210, word: "horoz", imageUrl: "/images/4210.webp", isCorrect: false, audioKey: "horoz", spokenText: "horoz" }
        ]
    },
    {
        id: 10,
        question: "Hangi horoz sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi horoz sessiz?', correct: 'Evet! Bu horoz sessiz.', wrong: 'Hayır, bu horoz gürültülü.' }
        },
        options: [
            { id: 4210, word: "horoz", imageUrl: "/images/4210.webp", isCorrect: true, audioKey: "horoz", spokenText: "horoz" },
            { id: 4209, word: "horoz", imageUrl: "/images/4209.webp", isCorrect: false, audioKey: "horoz", spokenText: "horoz" }
        ]
    },
    // inek
    {
        id: 11,
        question: "Hangi inek gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi inek gürültülü?', correct: 'Evet! Bu inek gürültülü.', wrong: 'Hayır, bu inek sessiz.' }
        },
        options: [
            { id: 4211, word: "inek", imageUrl: "/images/4211.webp", isCorrect: true, audioKey: "inek", spokenText: "inek" },
            { id: 4212, word: "inek", imageUrl: "/images/4212.webp", isCorrect: false, audioKey: "inek", spokenText: "inek" }
        ]
    },
    {
        id: 12,
        question: "Hangi inek sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi inek sessiz?', correct: 'Evet! Bu inek sessiz.', wrong: 'Hayır, bu inek gürültülü.' }
        },
        options: [
            { id: 4212, word: "inek", imageUrl: "/images/4212.webp", isCorrect: true, audioKey: "inek", spokenText: "inek" },
            { id: 4211, word: "inek", imageUrl: "/images/4211.webp", isCorrect: false, audioKey: "inek", spokenText: "inek" }
        ]
    },
    // kedi
    {
        id: 13,
        question: "Hangi kedi gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi kedi gürültülü?', correct: 'Evet! Bu kedi gürültülü.', wrong: 'Hayır, bu kedi sessiz.' }
        },
        options: [
            { id: 4213, word: "kedi", imageUrl: "/images/4213.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 4214, word: "kedi", imageUrl: "/images/4214.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    {
        id: 14,
        question: "Hangi kedi sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi kedi sessiz?', correct: 'Evet! Bu kedi sessiz.', wrong: 'Hayır, bu kedi gürültülü.' }
        },
        options: [
            { id: 4214, word: "kedi", imageUrl: "/images/4214.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 4213, word: "kedi", imageUrl: "/images/4213.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // köpek
    {
        id: 15,
        question: "Hangi köpek gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi köpek gürültülü?', correct: 'Evet! Bu köpek gürültülü.', wrong: 'Hayır, bu köpek sessiz.' }
        },
        options: [
            { id: 4215, word: "köpek", imageUrl: "/images/4215.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 4216, word: "köpek", imageUrl: "/images/4216.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    {
        id: 16,
        question: "Hangi köpek sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi köpek sessiz?', correct: 'Evet! Bu köpek sessiz.', wrong: 'Hayır, bu köpek gürültülü.' }
        },
        options: [
            { id: 4216, word: "köpek", imageUrl: "/images/4216.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 4215, word: "köpek", imageUrl: "/images/4215.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    // çocuk
    {
        id: 17,
        question: "Hangi çocuk gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi çocuk gürültülü?', correct: 'Evet! Bu çocuk gürültülü.', wrong: 'Hayır, bu çocuk sessiz.' }
        },
        options: [
            { id: 4217, word: "çocuk", imageUrl: "/images/4217.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4218, word: "çocuk", imageUrl: "/images/4218.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 18,
        question: "Hangi çocuk sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi çocuk sessiz?', correct: 'Evet! Bu çocuk sessiz.', wrong: 'Hayır, bu çocuk gürültülü.' }
        },
        options: [
            { id: 4218, word: "çocuk", imageUrl: "/images/4218.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 4217, word: "çocuk", imageUrl: "/images/4217.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // sınıf
    {
        id: 19,
        question: "Hangi sınıf gürültülü?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi sınıf gürültülü?', correct: 'Evet! Bu sınıf gürültülü.', wrong: 'Hayır, bu sınıf sessiz.' }
        },
        options: [
            { id: 4219, word: "sınıf", imageUrl: "/images/4219.webp", isCorrect: true, audioKey: "sınıf", spokenText: "sınıf" },
            { id: 4220, word: "sınıf", imageUrl: "/images/4220.webp", isCorrect: false, audioKey: "sınıf", spokenText: "sınıf" }
        ]
    },
    {
        id: 20,
        question: "Hangi sınıf sessiz?",
        questionAudioKey: "",
        activityType: ActivityType.NoisyQuiet,
        speech: {
            tr: { question: 'Hangi sınıf sessiz?', correct: 'Evet! Bu sınıf sessiz.', wrong: 'Hayır, bu sınıf gürültülü.' }
        },
        options: [
            { id: 4220, word: "sınıf", imageUrl: "/images/4220.webp", isCorrect: true, audioKey: "sınıf", spokenText: "sınıf" },
            { id: 4219, word: "sınıf", imageUrl: "/images/4219.webp", isCorrect: false, audioKey: "sınıf", spokenText: "sınıf" }
        ]
    },
];
