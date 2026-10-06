// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (taze-bayat). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/taze-bayat/ → id 5001-5020.
import { ConceptRound, ActivityType } from '../../../../types';

export const tazeBayatDataYeni: ConceptRound[] = [
    // çilek
    {
        id: 1,
        question: "Hangi çilek taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi çilek taze?', correct: 'Evet! Bu çilek taze.', wrong: 'Hayır, bu çilek bayat.' }
        },
        options: [
            { id: 5002, word: "çilek", imageUrl: "/images/5002.webp", isCorrect: true, audioKey: "çilek", spokenText: "çilek" },
            { id: 5001, word: "çilek", imageUrl: "/images/5001.webp", isCorrect: false, audioKey: "çilek", spokenText: "çilek" }
        ]
    },
    {
        id: 2,
        question: "Hangi çilek bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi çilek bayat?', correct: 'Evet! Bu çilek bayat.', wrong: 'Hayır, bu çilek taze.' }
        },
        options: [
            { id: 5001, word: "çilek", imageUrl: "/images/5001.webp", isCorrect: true, audioKey: "çilek", spokenText: "çilek" },
            { id: 5002, word: "çilek", imageUrl: "/images/5002.webp", isCorrect: false, audioKey: "çilek", spokenText: "çilek" }
        ]
    },
    // domates
    {
        id: 3,
        question: "Hangi domates taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi domates taze?', correct: 'Evet! Bu domates taze.', wrong: 'Hayır, bu domates bayat.' }
        },
        options: [
            { id: 5004, word: "domates", imageUrl: "/images/5004.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 5003, word: "domates", imageUrl: "/images/5003.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    {
        id: 4,
        question: "Hangi domates bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi domates bayat?', correct: 'Evet! Bu domates bayat.', wrong: 'Hayır, bu domates taze.' }
        },
        options: [
            { id: 5003, word: "domates", imageUrl: "/images/5003.webp", isCorrect: true, audioKey: "domates", spokenText: "domates" },
            { id: 5004, word: "domates", imageUrl: "/images/5004.webp", isCorrect: false, audioKey: "domates", spokenText: "domates" }
        ]
    },
    // ekmek
    {
        id: 5,
        question: "Hangi ekmek taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi ekmek taze?', correct: 'Evet! Bu ekmek taze.', wrong: 'Hayır, bu ekmek bayat.' }
        },
        options: [
            { id: 5006, word: "ekmek", imageUrl: "/images/5006.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 5005, word: "ekmek", imageUrl: "/images/5005.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 6,
        question: "Hangi ekmek bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi ekmek bayat?', correct: 'Evet! Bu ekmek bayat.', wrong: 'Hayır, bu ekmek taze.' }
        },
        options: [
            { id: 5005, word: "ekmek", imageUrl: "/images/5005.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 5006, word: "ekmek", imageUrl: "/images/5006.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    // elma
    {
        id: 7,
        question: "Hangi elma taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi elma taze?', correct: 'Evet! Bu elma taze.', wrong: 'Hayır, bu elma bayat.' }
        },
        options: [
            { id: 5008, word: "elma", imageUrl: "/images/5008.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 5007, word: "elma", imageUrl: "/images/5007.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 8,
        question: "Hangi elma bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi elma bayat?', correct: 'Evet! Bu elma bayat.', wrong: 'Hayır, bu elma taze.' }
        },
        options: [
            { id: 5007, word: "elma", imageUrl: "/images/5007.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 5008, word: "elma", imageUrl: "/images/5008.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // havuç
    {
        id: 9,
        question: "Hangi havuç taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi havuç taze?', correct: 'Evet! Bu havuç taze.', wrong: 'Hayır, bu havuç bayat.' }
        },
        options: [
            { id: 5010, word: "havuç", imageUrl: "/images/5010.webp", isCorrect: true, audioKey: "havuç", spokenText: "havuç" },
            { id: 5009, word: "havuç", imageUrl: "/images/5009.webp", isCorrect: false, audioKey: "havuç", spokenText: "havuç" }
        ]
    },
    {
        id: 10,
        question: "Hangi havuç bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi havuç bayat?', correct: 'Evet! Bu havuç bayat.', wrong: 'Hayır, bu havuç taze.' }
        },
        options: [
            { id: 5009, word: "havuç", imageUrl: "/images/5009.webp", isCorrect: true, audioKey: "havuç", spokenText: "havuç" },
            { id: 5010, word: "havuç", imageUrl: "/images/5010.webp", isCorrect: false, audioKey: "havuç", spokenText: "havuç" }
        ]
    },
    // marul
    {
        id: 11,
        question: "Hangi marul taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi marul taze?', correct: 'Evet! Bu marul taze.', wrong: 'Hayır, bu marul bayat.' }
        },
        options: [
            { id: 5012, word: "marul", imageUrl: "/images/5012.webp", isCorrect: true, audioKey: "marul", spokenText: "marul" },
            { id: 5011, word: "marul", imageUrl: "/images/5011.webp", isCorrect: false, audioKey: "marul", spokenText: "marul" }
        ]
    },
    {
        id: 12,
        question: "Hangi marul bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi marul bayat?', correct: 'Evet! Bu marul bayat.', wrong: 'Hayır, bu marul taze.' }
        },
        options: [
            { id: 5011, word: "marul", imageUrl: "/images/5011.webp", isCorrect: true, audioKey: "marul", spokenText: "marul" },
            { id: 5012, word: "marul", imageUrl: "/images/5012.webp", isCorrect: false, audioKey: "marul", spokenText: "marul" }
        ]
    },
    // muz
    {
        id: 13,
        question: "Hangi muz taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi muz taze?', correct: 'Evet! Bu muz taze.', wrong: 'Hayır, bu muz bayat.' }
        },
        options: [
            { id: 5014, word: "muz", imageUrl: "/images/5014.webp", isCorrect: true, audioKey: "muz", spokenText: "muz" },
            { id: 5013, word: "muz", imageUrl: "/images/5013.webp", isCorrect: false, audioKey: "muz", spokenText: "muz" }
        ]
    },
    {
        id: 14,
        question: "Hangi muz bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi muz bayat?', correct: 'Evet! Bu muz bayat.', wrong: 'Hayır, bu muz taze.' }
        },
        options: [
            { id: 5013, word: "muz", imageUrl: "/images/5013.webp", isCorrect: true, audioKey: "muz", spokenText: "muz" },
            { id: 5014, word: "muz", imageUrl: "/images/5014.webp", isCorrect: false, audioKey: "muz", spokenText: "muz" }
        ]
    },
    // portakal
    {
        id: 15,
        question: "Hangi portakal taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi portakal taze?', correct: 'Evet! Bu portakal taze.', wrong: 'Hayır, bu portakal bayat.' }
        },
        options: [
            { id: 5016, word: "portakal", imageUrl: "/images/5016.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 5015, word: "portakal", imageUrl: "/images/5015.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    {
        id: 16,
        question: "Hangi portakal bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi portakal bayat?', correct: 'Evet! Bu portakal bayat.', wrong: 'Hayır, bu portakal taze.' }
        },
        options: [
            { id: 5015, word: "portakal", imageUrl: "/images/5015.webp", isCorrect: true, audioKey: "portakal", spokenText: "portakal" },
            { id: 5016, word: "portakal", imageUrl: "/images/5016.webp", isCorrect: false, audioKey: "portakal", spokenText: "portakal" }
        ]
    },
    // salatalık
    {
        id: 17,
        question: "Hangi salatalık taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi salatalık taze?', correct: 'Evet! Bu salatalık taze.', wrong: 'Hayır, bu salatalık bayat.' }
        },
        options: [
            { id: 5018, word: "salatalık", imageUrl: "/images/5018.webp", isCorrect: true, audioKey: "salatalık", spokenText: "salatalık" },
            { id: 5017, word: "salatalık", imageUrl: "/images/5017.webp", isCorrect: false, audioKey: "salatalık", spokenText: "salatalık" }
        ]
    },
    {
        id: 18,
        question: "Hangi salatalık bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi salatalık bayat?', correct: 'Evet! Bu salatalık bayat.', wrong: 'Hayır, bu salatalık taze.' }
        },
        options: [
            { id: 5017, word: "salatalık", imageUrl: "/images/5017.webp", isCorrect: true, audioKey: "salatalık", spokenText: "salatalık" },
            { id: 5018, word: "salatalık", imageUrl: "/images/5018.webp", isCorrect: false, audioKey: "salatalık", spokenText: "salatalık" }
        ]
    },
    // simit
    {
        id: 19,
        question: "Hangi simit taze?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi simit taze?', correct: 'Evet! Bu simit taze.', wrong: 'Hayır, bu simit bayat.' }
        },
        options: [
            { id: 5020, word: "simit", imageUrl: "/images/5020.webp", isCorrect: true, audioKey: "simit", spokenText: "simit" },
            { id: 5019, word: "simit", imageUrl: "/images/5019.webp", isCorrect: false, audioKey: "simit", spokenText: "simit" }
        ]
    },
    {
        id: 20,
        question: "Hangi simit bayat?",
        questionAudioKey: "",
        activityType: ActivityType.TazeBayat,
        speech: {
            tr: { question: 'Hangi simit bayat?', correct: 'Evet! Bu simit bayat.', wrong: 'Hayır, bu simit taze.' }
        },
        options: [
            { id: 5019, word: "simit", imageUrl: "/images/5019.webp", isCorrect: true, audioKey: "simit", spokenText: "simit" },
            { id: 5020, word: "simit", imageUrl: "/images/5020.webp", isCorrect: false, audioKey: "simit", spokenText: "simit" }
        ]
    },
];
