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
            tr: { question: 'Hangi aslan gürültülü?', correct: 'Evet! Aslan gürültülüdür.', wrong: 'Hayır, bu aslan sessizdir.' }
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
            tr: { question: 'Hangi aslan sessiz?', correct: 'Evet! Aslan sessizdir.', wrong: 'Hayır, bu aslan gürültülüdür.' }
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
            tr: { question: 'Hangi bebek gürültülü?', correct: 'Evet! Bebek gürültülüdür.', wrong: 'Hayır, bu bebek sessizdir.' }
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
            tr: { question: 'Hangi bebek sessiz?', correct: 'Evet! Bebek sessizdir.', wrong: 'Hayır, bu bebek gürültülüdür.' }
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
            tr: { question: 'Hangi çocuk gürültülü?', correct: 'Evet! Çocuk gürültülüdür.', wrong: 'Hayır, bu çocuk sessizdir.' }
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
            tr: { question: 'Hangi çocuk sessiz?', correct: 'Evet! Çocuk sessizdir.', wrong: 'Hayır, bu çocuk gürültülüdür.' }
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
            tr: { question: 'Hangi eşek gürültülü?', correct: 'Evet! Eşek gürültülüdür.', wrong: 'Hayır, bu eşek sessizdir.' }
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
            tr: { question: 'Hangi eşek sessiz?', correct: 'Evet! Eşek sessizdir.', wrong: 'Hayır, bu eşek gürültülüdür.' }
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
            tr: { question: 'Hangi horoz gürültülü?', correct: 'Evet! Horoz gürültülüdür.', wrong: 'Hayır, bu horoz sessizdir.' }
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
            tr: { question: 'Hangi horoz sessiz?', correct: 'Evet! Horoz sessizdir.', wrong: 'Hayır, bu horoz gürültülüdür.' }
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
            tr: { question: 'Hangi inek gürültülü?', correct: 'Evet! İnek gürültülüdür.', wrong: 'Hayır, bu inek sessizdir.' }
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
            tr: { question: 'Hangi inek sessiz?', correct: 'Evet! İnek sessizdir.', wrong: 'Hayır, bu inek gürültülüdür.' }
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
            tr: { question: 'Hangi kedi gürültülü?', correct: 'Evet! Kedi gürültülüdür.', wrong: 'Hayır, bu kedi sessizdir.' }
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
            tr: { question: 'Hangi kedi sessiz?', correct: 'Evet! Kedi sessizdir.', wrong: 'Hayır, bu kedi gürültülüdür.' }
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
            tr: { question: 'Hangi köpek gürültülü?', correct: 'Evet! Köpek gürültülüdür.', wrong: 'Hayır, bu köpek sessizdir.' }
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
            tr: { question: 'Hangi köpek sessiz?', correct: 'Evet! Köpek sessizdir.', wrong: 'Hayır, bu köpek gürültülüdür.' }
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
            tr: { question: 'Hangi çocuk gürültülü?', correct: 'Evet! Çocuk gürültülüdür.', wrong: 'Hayır, bu çocuk sessizdir.' }
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
            tr: { question: 'Hangi çocuk sessiz?', correct: 'Evet! Çocuk sessizdir.', wrong: 'Hayır, bu çocuk gürültülüdür.' }
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
            tr: { question: 'Hangi sınıf gürültülü?', correct: 'Evet! Sınıf gürültülüdür.', wrong: 'Hayır, bu sınıf sessizdir.' }
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
            tr: { question: 'Hangi sınıf sessiz?', correct: 'Evet! Sınıf sessizdir.', wrong: 'Hayır, bu sınıf gürültülüdür.' }
        },
        options: [
            { id: 4220, word: "sınıf", imageUrl: "/images/4220.webp", isCorrect: true, audioKey: "sınıf", spokenText: "sınıf" },
            { id: 4219, word: "sınıf", imageUrl: "/images/4219.webp", isCorrect: false, audioKey: "sınıf", spokenText: "sınıf" }
        ]
    },
];
