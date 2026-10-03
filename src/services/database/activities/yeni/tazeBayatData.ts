// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (taze-bayat). Elle düzenleme.
// 8 çift, 16 soru. Görseller: gorsel-ham/taze-bayat/ → id 5001-5016.
import { ConceptRound, ActivityType } from '../../../../types';

export const tazeBayatDataYeni: ConceptRound[] = [
    // domates
    {
        id: 1,
        question: "Hangi domates taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi domates taze?', correct: 'Evet! Domates tazedir.', wrong: 'Hayır, bu domates bayattır.' }
        },
        options: [
            { id: 5002, word: "domates", imageUrl: "/images/5002.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 5001, word: "domates", imageUrl: "/images/5001.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 2,
        question: "Hangi domates bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi domates bayat?', correct: 'Evet! Domates bayattır.', wrong: 'Hayır, bu domates tazedir.' }
        },
        options: [
            { id: 5001, word: "domates", imageUrl: "/images/5001.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 5002, word: "domates", imageUrl: "/images/5002.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    // ekmek
    {
        id: 3,
        question: "Hangi ekmek taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi ekmek taze?', correct: 'Evet! Ekmek tazedir.', wrong: 'Hayır, bu ekmek bayattır.' }
        },
        options: [
            { id: 5004, word: "ekmek", imageUrl: "/images/5004.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 5003, word: "ekmek", imageUrl: "/images/5003.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 4,
        question: "Hangi ekmek bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi ekmek bayat?', correct: 'Evet! Ekmek bayattır.', wrong: 'Hayır, bu ekmek tazedir.' }
        },
        options: [
            { id: 5003, word: "ekmek", imageUrl: "/images/5003.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 5004, word: "ekmek", imageUrl: "/images/5004.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    // elma
    {
        id: 5,
        question: "Hangi elma taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi elma taze?', correct: 'Evet! Elma tazedir.', wrong: 'Hayır, bu elma bayattır.' }
        },
        options: [
            { id: 5006, word: "elma", imageUrl: "/images/5006.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 5005, word: "elma", imageUrl: "/images/5005.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 6,
        question: "Hangi elma bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi elma bayat?', correct: 'Evet! Elma bayattır.', wrong: 'Hayır, bu elma tazedir.' }
        },
        options: [
            { id: 5005, word: "elma", imageUrl: "/images/5005.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 5006, word: "elma", imageUrl: "/images/5006.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // havuç
    {
        id: 7,
        question: "Hangi havuç taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi havuç taze?', correct: 'Evet! Havuç tazedir.', wrong: 'Hayır, bu havuç bayattır.' }
        },
        options: [
            { id: 5008, word: "havuç", imageUrl: "/images/5008.webp", isCorrect: true, audioKey: "havuç", spokenText: "havuç" },
            { id: 5007, word: "havuç", imageUrl: "/images/5007.webp", isCorrect: false, audioKey: "havuç", spokenText: "havuç" }
        ]
    },
    {
        id: 8,
        question: "Hangi havuç bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi havuç bayat?', correct: 'Evet! Havuç bayattır.', wrong: 'Hayır, bu havuç tazedir.' }
        },
        options: [
            { id: 5007, word: "havuç", imageUrl: "/images/5007.webp", isCorrect: true, audioKey: "havuç", spokenText: "havuç" },
            { id: 5008, word: "havuç", imageUrl: "/images/5008.webp", isCorrect: false, audioKey: "havuç", spokenText: "havuç" }
        ]
    },
    // marul
    {
        id: 9,
        question: "Hangi marul taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi marul taze?', correct: 'Evet! Marul tazedir.', wrong: 'Hayır, bu marul bayattır.' }
        },
        options: [
            { id: 5010, word: "marul", imageUrl: "/images/5010.webp", isCorrect: true, audioKey: "marul", spokenText: "marul" },
            { id: 5009, word: "marul", imageUrl: "/images/5009.webp", isCorrect: false, audioKey: "marul", spokenText: "marul" }
        ]
    },
    {
        id: 10,
        question: "Hangi marul bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi marul bayat?', correct: 'Evet! Marul bayattır.', wrong: 'Hayır, bu marul tazedir.' }
        },
        options: [
            { id: 5009, word: "marul", imageUrl: "/images/5009.webp", isCorrect: true, audioKey: "marul", spokenText: "marul" },
            { id: 5010, word: "marul", imageUrl: "/images/5010.webp", isCorrect: false, audioKey: "marul", spokenText: "marul" }
        ]
    },
    // muz
    {
        id: 11,
        question: "Hangi muz taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi muz taze?', correct: 'Evet! Muz tazedir.', wrong: 'Hayır, bu muz bayattır.' }
        },
        options: [
            { id: 5012, word: "muz", imageUrl: "/images/5012.webp", isCorrect: true, audioKey: "muz", spokenText: "muz" },
            { id: 5011, word: "muz", imageUrl: "/images/5011.webp", isCorrect: false, audioKey: "muz", spokenText: "muz" }
        ]
    },
    {
        id: 12,
        question: "Hangi muz bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi muz bayat?', correct: 'Evet! Muz bayattır.', wrong: 'Hayır, bu muz tazedir.' }
        },
        options: [
            { id: 5011, word: "muz", imageUrl: "/images/5011.webp", isCorrect: true, audioKey: "muz", spokenText: "muz" },
            { id: 5012, word: "muz", imageUrl: "/images/5012.webp", isCorrect: false, audioKey: "muz", spokenText: "muz" }
        ]
    },
    // salatalık
    {
        id: 13,
        question: "Hangi salatalık taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi salatalık taze?', correct: 'Evet! Salatalık tazedir.', wrong: 'Hayır, bu salatalık bayattır.' }
        },
        options: [
            { id: 5014, word: "salatalık", imageUrl: "/images/5014.webp", isCorrect: true, audioKey: "salatalık", spokenText: "salatalık" },
            { id: 5013, word: "salatalık", imageUrl: "/images/5013.webp", isCorrect: false, audioKey: "salatalık", spokenText: "salatalık" }
        ]
    },
    {
        id: 14,
        question: "Hangi salatalık bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi salatalık bayat?', correct: 'Evet! Salatalık bayattır.', wrong: 'Hayır, bu salatalık tazedir.' }
        },
        options: [
            { id: 5013, word: "salatalık", imageUrl: "/images/5013.webp", isCorrect: true, audioKey: "salatalık", spokenText: "salatalık" },
            { id: 5014, word: "salatalık", imageUrl: "/images/5014.webp", isCorrect: false, audioKey: "salatalık", spokenText: "salatalık" }
        ]
    },
    // simit
    {
        id: 15,
        question: "Hangi simit taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi simit taze?', correct: 'Evet! Simit tazedir.', wrong: 'Hayır, bu simit bayattır.' }
        },
        options: [
            { id: 5016, word: "simit", imageUrl: "/images/5016.webp", isCorrect: true, audioKey: "simit", spokenText: "simit" },
            { id: 5015, word: "simit", imageUrl: "/images/5015.webp", isCorrect: false, audioKey: "simit", spokenText: "simit" }
        ]
    },
    {
        id: 16,
        question: "Hangi simit bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi simit bayat?', correct: 'Evet! Simit bayattır.', wrong: 'Hayır, bu simit tazedir.' }
        },
        options: [
            { id: 5015, word: "simit", imageUrl: "/images/5015.webp", isCorrect: true, audioKey: "simit", spokenText: "simit" },
            { id: 5016, word: "simit", imageUrl: "/images/5016.webp", isCorrect: false, audioKey: "simit", spokenText: "simit" }
        ]
    },
];
