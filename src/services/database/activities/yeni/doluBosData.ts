// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (dolu-bos). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/dolu-bos/ → id 2601-2620.
import { ConceptRound, ActivityType } from '../../../../types';

export const fullEmptyDataYeni: ConceptRound[] = [
    // akvaryum
    {
        id: 1,
        question: "Hangi akvaryum dolu?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi akvaryum dolu?', correct: 'Evet! Bu akvaryum dolu.', wrong: 'Hayır, bu akvaryum boş.' }
        },
        options: [
            { id: 2602, word: "akvaryum", imageUrl: "/images/2602.webp", isCorrect: true, audioKey: "akvaryum", spokenText: "akvaryum" },
            { id: 2601, word: "akvaryum", imageUrl: "/images/2601.webp", isCorrect: false, audioKey: "akvaryum", spokenText: "akvaryum" }
        ]
    },
    {
        id: 2,
        question: "Hangi akvaryum boş?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi akvaryum boş?', correct: 'Evet! Bu akvaryum boş.', wrong: 'Hayır, bu akvaryum dolu.' }
        },
        options: [
            { id: 2601, word: "akvaryum", imageUrl: "/images/2601.webp", isCorrect: true, audioKey: "akvaryum", spokenText: "akvaryum" },
            { id: 2602, word: "akvaryum", imageUrl: "/images/2602.webp", isCorrect: false, audioKey: "akvaryum", spokenText: "akvaryum" }
        ]
    },
    // bardak
    {
        id: 3,
        question: "Hangi bardak dolu?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi bardak dolu?', correct: 'Evet! Bu bardak dolu.', wrong: 'Hayır, bu bardak boş.' }
        },
        options: [
            { id: 2604, word: "bardak", imageUrl: "/images/2604.webp", isCorrect: true, audioKey: "bardak", spokenText: "bardak" },
            { id: 2603, word: "bardak", imageUrl: "/images/2603.webp", isCorrect: false, audioKey: "bardak", spokenText: "bardak" }
        ]
    },
    {
        id: 4,
        question: "Hangi bardak boş?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi bardak boş?', correct: 'Evet! Bu bardak boş.', wrong: 'Hayır, bu bardak dolu.' }
        },
        options: [
            { id: 2603, word: "bardak", imageUrl: "/images/2603.webp", isCorrect: true, audioKey: "bardak", spokenText: "bardak" },
            { id: 2604, word: "bardak", imageUrl: "/images/2604.webp", isCorrect: false, audioKey: "bardak", spokenText: "bardak" }
        ]
    },
    // kalemlik
    {
        id: 5,
        question: "Hangi kalemlik dolu?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi kalemlik dolu?', correct: 'Evet! Bu kalemlik dolu.', wrong: 'Hayır, bu kalemlik boş.' }
        },
        options: [
            { id: 2606, word: "kalemlik", imageUrl: "/images/2606.webp", isCorrect: true, audioKey: "kalemlik", spokenText: "kalemlik" },
            { id: 2605, word: "kalemlik", imageUrl: "/images/2605.webp", isCorrect: false, audioKey: "kalemlik", spokenText: "kalemlik" }
        ]
    },
    {
        id: 6,
        question: "Hangi kalemlik boş?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi kalemlik boş?', correct: 'Evet! Bu kalemlik boş.', wrong: 'Hayır, bu kalemlik dolu.' }
        },
        options: [
            { id: 2605, word: "kalemlik", imageUrl: "/images/2605.webp", isCorrect: true, audioKey: "kalemlik", spokenText: "kalemlik" },
            { id: 2606, word: "kalemlik", imageUrl: "/images/2606.webp", isCorrect: false, audioKey: "kalemlik", spokenText: "kalemlik" }
        ]
    },
    // kavanoz
    {
        id: 7,
        question: "Hangi kavanoz dolu?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi kavanoz dolu?', correct: 'Evet! Bu kavanoz dolu.', wrong: 'Hayır, bu kavanoz boş.' }
        },
        options: [
            { id: 2608, word: "kavanoz", imageUrl: "/images/2608.webp", isCorrect: true, audioKey: "kavanoz", spokenText: "kavanoz" },
            { id: 2607, word: "kavanoz", imageUrl: "/images/2607.webp", isCorrect: false, audioKey: "kavanoz", spokenText: "kavanoz" }
        ]
    },
    {
        id: 8,
        question: "Hangi kavanoz boş?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi kavanoz boş?', correct: 'Evet! Bu kavanoz boş.', wrong: 'Hayır, bu kavanoz dolu.' }
        },
        options: [
            { id: 2607, word: "kavanoz", imageUrl: "/images/2607.webp", isCorrect: true, audioKey: "kavanoz", spokenText: "kavanoz" },
            { id: 2608, word: "kavanoz", imageUrl: "/images/2608.webp", isCorrect: false, audioKey: "kavanoz", spokenText: "kavanoz" }
        ]
    },
    // yumurta kolisi
    {
        id: 9,
        question: "Hangi yumurta kolisi dolu?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi yumurta kolisi dolu?', correct: 'Evet! Bu yumurta kolisi dolu.', wrong: 'Hayır, bu yumurta kolisi boş.' }
        },
        options: [
            { id: 2610, word: "yumurta kolisi", imageUrl: "/images/2610.webp", isCorrect: true, audioKey: "yumurta kolisi", spokenText: "yumurta kolisi" },
            { id: 2609, word: "yumurta kolisi", imageUrl: "/images/2609.webp", isCorrect: false, audioKey: "yumurta kolisi", spokenText: "yumurta kolisi" }
        ]
    },
    {
        id: 10,
        question: "Hangi yumurta kolisi boş?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi yumurta kolisi boş?', correct: 'Evet! Bu yumurta kolisi boş.', wrong: 'Hayır, bu yumurta kolisi dolu.' }
        },
        options: [
            { id: 2609, word: "yumurta kolisi", imageUrl: "/images/2609.webp", isCorrect: true, audioKey: "yumurta kolisi", spokenText: "yumurta kolisi" },
            { id: 2610, word: "yumurta kolisi", imageUrl: "/images/2610.webp", isCorrect: false, audioKey: "yumurta kolisi", spokenText: "yumurta kolisi" }
        ]
    },
    // kova
    {
        id: 11,
        question: "Hangi kova dolu?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi kova dolu?', correct: 'Evet! Bu kova dolu.', wrong: 'Hayır, bu kova boş.' }
        },
        options: [
            { id: 2612, word: "kova", imageUrl: "/images/2612.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 2611, word: "kova", imageUrl: "/images/2611.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    {
        id: 12,
        question: "Hangi kova boş?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi kova boş?', correct: 'Evet! Bu kova boş.', wrong: 'Hayır, bu kova dolu.' }
        },
        options: [
            { id: 2611, word: "kova", imageUrl: "/images/2611.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 2612, word: "kova", imageUrl: "/images/2612.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    // kumbara
    {
        id: 13,
        question: "Hangi kumbara dolu?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi kumbara dolu?', correct: 'Evet! Bu kumbara dolu.', wrong: 'Hayır, bu kumbara boş.' }
        },
        options: [
            { id: 2614, word: "kumbara", imageUrl: "/images/2614.webp", isCorrect: true, audioKey: "kumbara", spokenText: "kumbara" },
            { id: 2613, word: "kumbara", imageUrl: "/images/2613.webp", isCorrect: false, audioKey: "kumbara", spokenText: "kumbara" }
        ]
    },
    {
        id: 14,
        question: "Hangi kumbara boş?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi kumbara boş?', correct: 'Evet! Bu kumbara boş.', wrong: 'Hayır, bu kumbara dolu.' }
        },
        options: [
            { id: 2613, word: "kumbara", imageUrl: "/images/2613.webp", isCorrect: true, audioKey: "kumbara", spokenText: "kumbara" },
            { id: 2614, word: "kumbara", imageUrl: "/images/2614.webp", isCorrect: false, audioKey: "kumbara", spokenText: "kumbara" }
        ]
    },
    // oyuncak kutusu
    {
        id: 15,
        question: "Hangi oyuncak kutusu dolu?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi oyuncak kutusu dolu?', correct: 'Evet! Bu oyuncak kutusu dolu.', wrong: 'Hayır, bu oyuncak kutusu boş.' }
        },
        options: [
            { id: 2616, word: "oyuncak kutusu", imageUrl: "/images/2616.webp", isCorrect: true, audioKey: "oyuncak kutusu", spokenText: "oyuncak kutusu" },
            { id: 2615, word: "oyuncak kutusu", imageUrl: "/images/2615.webp", isCorrect: false, audioKey: "oyuncak kutusu", spokenText: "oyuncak kutusu" }
        ]
    },
    {
        id: 16,
        question: "Hangi oyuncak kutusu boş?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi oyuncak kutusu boş?', correct: 'Evet! Bu oyuncak kutusu boş.', wrong: 'Hayır, bu oyuncak kutusu dolu.' }
        },
        options: [
            { id: 2615, word: "oyuncak kutusu", imageUrl: "/images/2615.webp", isCorrect: true, audioKey: "oyuncak kutusu", spokenText: "oyuncak kutusu" },
            { id: 2616, word: "oyuncak kutusu", imageUrl: "/images/2616.webp", isCorrect: false, audioKey: "oyuncak kutusu", spokenText: "oyuncak kutusu" }
        ]
    },
    // sepet
    {
        id: 17,
        question: "Hangi sepet dolu?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi sepet dolu?', correct: 'Evet! Bu sepet dolu.', wrong: 'Hayır, bu sepet boş.' }
        },
        options: [
            { id: 2618, word: "sepet", imageUrl: "/images/2618.webp", isCorrect: true, audioKey: "sepet", spokenText: "sepet" },
            { id: 2617, word: "sepet", imageUrl: "/images/2617.webp", isCorrect: false, audioKey: "sepet", spokenText: "sepet" }
        ]
    },
    {
        id: 18,
        question: "Hangi sepet boş?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi sepet boş?', correct: 'Evet! Bu sepet boş.', wrong: 'Hayır, bu sepet dolu.' }
        },
        options: [
            { id: 2617, word: "sepet", imageUrl: "/images/2617.webp", isCorrect: true, audioKey: "sepet", spokenText: "sepet" },
            { id: 2618, word: "sepet", imageUrl: "/images/2618.webp", isCorrect: false, audioKey: "sepet", spokenText: "sepet" }
        ]
    },
    // tabak
    {
        id: 19,
        question: "Hangi tabak dolu?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi tabak dolu?', correct: 'Evet! Bu tabak dolu.', wrong: 'Hayır, bu tabak boş.' }
        },
        options: [
            { id: 2620, word: "tabak", imageUrl: "/images/2620.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 2619, word: "tabak", imageUrl: "/images/2619.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
    {
        id: 20,
        question: "Hangi tabak boş?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Hangi tabak boş?', correct: 'Evet! Bu tabak boş.', wrong: 'Hayır, bu tabak dolu.' }
        },
        options: [
            { id: 2619, word: "tabak", imageUrl: "/images/2619.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 2620, word: "tabak", imageUrl: "/images/2620.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
];
