// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (dikenli-puruzsuz). Elle düzenleme.
// 8 çift, 16 soru. Görseller: gorsel-ham/dikenli-puruzsuz/ → id 3801-3813.
import { ConceptRound, ActivityType } from '../../../../types';

export const dikenliPuruzsuzDataYeni: ConceptRound[] = [
    // balonbaligi_japonbaligi
    {
        id: 1,
        question: "Dikenli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Dikenli olan hangisi?', correct: 'Evet! Balon balığı dikenlidir.', wrong: 'Hayır, japon balığı pürüzsüzdür.' }
        },
        options: [
            { id: 3801, word: "balon balığı", imageUrl: "/images/3801.webp", isCorrect: true, audioKey: "balon balığı", spokenText: "balon balığı" },
            { id: 3802, word: "japon balığı", imageUrl: "/images/3802.webp", isCorrect: false, audioKey: "japon balığı", spokenText: "japon balığı" }
        ]
    },
    {
        id: 2,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Japon balığı pürüzsüzdür.', wrong: 'Hayır, balon balığı dikenlidir.' }
        },
        options: [
            { id: 3802, word: "japon balığı", imageUrl: "/images/3802.webp", isCorrect: true, audioKey: "japon balığı", spokenText: "japon balığı" },
            { id: 3801, word: "balon balığı", imageUrl: "/images/3801.webp", isCorrect: false, audioKey: "balon balığı", spokenText: "balon balığı" }
        ]
    },
    // denizkestanesi_kabuk
    {
        id: 3,
        question: "Dikenli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Dikenli olan hangisi?', correct: 'Evet! Deniz kestanesi dikenlidir.', wrong: 'Hayır, deniz kabuğu pürüzsüzdür.' }
        },
        options: [
            { id: 3803, word: "deniz kestanesi", imageUrl: "/images/3803.webp", isCorrect: true, audioKey: "deniz kestanesi", spokenText: "deniz kestanesi" },
            { id: 3804, word: "deniz kabuğu", imageUrl: "/images/3804.webp", isCorrect: false, audioKey: "deniz kabuğu", spokenText: "deniz kabuğu" }
        ]
    },
    {
        id: 4,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Deniz kabuğu pürüzsüzdür.', wrong: 'Hayır, deniz kestanesi dikenlidir.' }
        },
        options: [
            { id: 3804, word: "deniz kabuğu", imageUrl: "/images/3804.webp", isCorrect: true, audioKey: "deniz kabuğu", spokenText: "deniz kabuğu" },
            { id: 3803, word: "deniz kestanesi", imageUrl: "/images/3803.webp", isCorrect: false, audioKey: "deniz kestanesi", spokenText: "deniz kestanesi" }
        ]
    },
    // devedikeni_nergis
    {
        id: 5,
        question: "Dikenli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Dikenli olan hangisi?', correct: 'Evet! Deve dikeni dikenlidir.', wrong: 'Hayır, nergis pürüzsüzdür.' }
        },
        options: [
            { id: 3805, word: "deve dikeni", imageUrl: "/images/3805.webp", isCorrect: true, audioKey: "deve dikeni", spokenText: "deve dikeni" },
            { id: 3806, word: "nergis", imageUrl: "/images/3806.webp", isCorrect: false, audioKey: "nergis", spokenText: "nergis" }
        ]
    },
    {
        id: 6,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Nergis pürüzsüzdür.', wrong: 'Hayır, deve dikeni dikenlidir.' }
        },
        options: [
            { id: 3806, word: "nergis", imageUrl: "/images/3806.webp", isCorrect: true, audioKey: "nergis", spokenText: "nergis" },
            { id: 3805, word: "deve dikeni", imageUrl: "/images/3805.webp", isCorrect: false, audioKey: "deve dikeni", spokenText: "deve dikeni" }
        ]
    },
    // gul_lale
    {
        id: 7,
        question: "Dikenli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Dikenli olan hangisi?', correct: 'Evet! Gül dikenlidir.', wrong: 'Hayır, lale pürüzsüzdür.' }
        },
        options: [
            { id: 3807, word: "gül", imageUrl: "/images/3807.webp", isCorrect: true, audioKey: "gül", spokenText: "gül" },
            { id: 3003, word: "lale", imageUrl: "/images/3003.webp", isCorrect: false, audioKey: "lale", spokenText: "lale" }
        ]
    },
    {
        id: 8,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Lale pürüzsüzdür.', wrong: 'Hayır, gül dikenlidir.' }
        },
        options: [
            { id: 3003, word: "lale", imageUrl: "/images/3003.webp", isCorrect: true, audioKey: "lale", spokenText: "lale" },
            { id: 3807, word: "gül", imageUrl: "/images/3807.webp", isCorrect: false, audioKey: "gül", spokenText: "gül" }
        ]
    },
    // kaktus_elma
    {
        id: 9,
        question: "Dikenli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Dikenli olan hangisi?', correct: 'Evet! Kaktüs dikenlidir.', wrong: 'Hayır, elma pürüzsüzdür.' }
        },
        options: [
            { id: 3808, word: "kaktüs", imageUrl: "/images/3808.webp", isCorrect: true, audioKey: "kaktüs", spokenText: "kaktüs" },
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 10,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Elma pürüzsüzdür.', wrong: 'Hayır, kaktüs dikenlidir.' }
        },
        options: [
            { id: 2807, word: "elma", imageUrl: "/images/2807.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 3808, word: "kaktüs", imageUrl: "/images/3808.webp", isCorrect: false, audioKey: "kaktüs", spokenText: "kaktüs" }
        ]
    },
    // kestane
    {
        id: 11,
        question: "Hangi kestane dikenli?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Hangi kestane dikenli?', correct: 'Evet! Kestane dikenlidir.', wrong: 'Hayır, bu kestane pürüzsüzdür.' }
        },
        options: [
            { id: 3809, word: "kestane", imageUrl: "/images/3809.webp", isCorrect: true, audioKey: "kestane", spokenText: "kestane" },
            { id: 3810, word: "kestane", imageUrl: "/images/3810.webp", isCorrect: false, audioKey: "kestane", spokenText: "kestane" }
        ]
    },
    {
        id: 12,
        question: "Hangi kestane pürüzsüz?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Hangi kestane pürüzsüz?', correct: 'Evet! Kestane pürüzsüzdür.', wrong: 'Hayır, bu kestane dikenlidir.' }
        },
        options: [
            { id: 3810, word: "kestane", imageUrl: "/images/3810.webp", isCorrect: true, audioKey: "kestane", spokenText: "kestane" },
            { id: 3809, word: "kestane", imageUrl: "/images/3809.webp", isCorrect: false, audioKey: "kestane", spokenText: "kestane" }
        ]
    },
    // kirpi_yunus
    {
        id: 13,
        question: "Dikenli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Dikenli olan hangisi?', correct: 'Evet! Kirpi dikenlidir.', wrong: 'Hayır, yunus pürüzsüzdür.' }
        },
        options: [
            { id: 3811, word: "kirpi", imageUrl: "/images/3811.webp", isCorrect: true, audioKey: "kirpi", spokenText: "kirpi" },
            { id: 3812, word: "yunus", imageUrl: "/images/3812.webp", isCorrect: false, audioKey: "yunus", spokenText: "yunus" }
        ]
    },
    {
        id: 14,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Yunus pürüzsüzdür.', wrong: 'Hayır, kirpi dikenlidir.' }
        },
        options: [
            { id: 3812, word: "yunus", imageUrl: "/images/3812.webp", isCorrect: true, audioKey: "yunus", spokenText: "yunus" },
            { id: 3811, word: "kirpi", imageUrl: "/images/3811.webp", isCorrect: false, audioKey: "kirpi", spokenText: "kirpi" }
        ]
    },
    // masajtopu_top
    {
        id: 15,
        question: "Dikenli olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Dikenli olan hangisi?', correct: 'Evet! Dikenli top dikenlidir.', wrong: 'Hayır, top pürüzsüzdür.' }
        },
        options: [
            { id: 3813, word: "dikenli top", imageUrl: "/images/3813.webp", isCorrect: true, audioKey: "dikenli top", spokenText: "dikenli top" },
            { id: 2317, word: "top", imageUrl: "/images/2317.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 16,
        question: "Pürüzsüz olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.DikenliPuruzsuz,
        speech: {
            tr: { question: 'Pürüzsüz olan hangisi?', correct: 'Evet! Top pürüzsüzdür.', wrong: 'Hayır, dikenli top dikenlidir.' }
        },
        options: [
            { id: 2317, word: "top", imageUrl: "/images/2317.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 3813, word: "dikenli top", imageUrl: "/images/3813.webp", isCorrect: false, audioKey: "dikenli top", spokenText: "dikenli top" }
        ]
    },
];
