// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (dolu-bos). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/dolu-bos/ → id 2601-2620.
import { ConceptRound, ActivityType } from '../../../../types';

export const fullEmptyDataYeni: ConceptRound[] = [
    // akvaryum
    {
        id: 1,
        question: "Dolu olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Dolu olan hangisi?', correct: 'Evet! Akvaryum doludur.', wrong: 'Hayır, bu akvaryum boştur.' }
        },
        options: [
            { id: 2602, word: "akvaryum", imageUrl: "/images/2602.webp", isCorrect: true, audioKey: "akvaryum", spokenText: "akvaryum" },
            { id: 2601, word: "akvaryum", imageUrl: "/images/2601.webp", isCorrect: false, audioKey: "akvaryum", spokenText: "akvaryum" }
        ]
    },
    {
        id: 2,
        question: "Boş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Boş olan hangisi?', correct: 'Evet! Akvaryum boştur.', wrong: 'Hayır, bu akvaryum doludur.' }
        },
        options: [
            { id: 2601, word: "akvaryum", imageUrl: "/images/2601.webp", isCorrect: true, audioKey: "akvaryum", spokenText: "akvaryum" },
            { id: 2602, word: "akvaryum", imageUrl: "/images/2602.webp", isCorrect: false, audioKey: "akvaryum", spokenText: "akvaryum" }
        ]
    },
    // bardak
    {
        id: 3,
        question: "Dolu olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Dolu olan hangisi?', correct: 'Evet! Bardak doludur.', wrong: 'Hayır, bu bardak boştur.' }
        },
        options: [
            { id: 2604, word: "bardak", imageUrl: "/images/2604.webp", isCorrect: true, audioKey: "bardak", spokenText: "bardak" },
            { id: 2603, word: "bardak", imageUrl: "/images/2603.webp", isCorrect: false, audioKey: "bardak", spokenText: "bardak" }
        ]
    },
    {
        id: 4,
        question: "Boş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Boş olan hangisi?', correct: 'Evet! Bardak boştur.', wrong: 'Hayır, bu bardak doludur.' }
        },
        options: [
            { id: 2603, word: "bardak", imageUrl: "/images/2603.webp", isCorrect: true, audioKey: "bardak", spokenText: "bardak" },
            { id: 2604, word: "bardak", imageUrl: "/images/2604.webp", isCorrect: false, audioKey: "bardak", spokenText: "bardak" }
        ]
    },
    // kalemlik
    {
        id: 5,
        question: "Dolu olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Dolu olan hangisi?', correct: 'Evet! Kalemlik doludur.', wrong: 'Hayır, bu kalemlik boştur.' }
        },
        options: [
            { id: 2606, word: "kalemlik", imageUrl: "/images/2606.webp", isCorrect: true, audioKey: "kalemlik", spokenText: "kalemlik" },
            { id: 2605, word: "kalemlik", imageUrl: "/images/2605.webp", isCorrect: false, audioKey: "kalemlik", spokenText: "kalemlik" }
        ]
    },
    {
        id: 6,
        question: "Boş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Boş olan hangisi?', correct: 'Evet! Kalemlik boştur.', wrong: 'Hayır, bu kalemlik doludur.' }
        },
        options: [
            { id: 2605, word: "kalemlik", imageUrl: "/images/2605.webp", isCorrect: true, audioKey: "kalemlik", spokenText: "kalemlik" },
            { id: 2606, word: "kalemlik", imageUrl: "/images/2606.webp", isCorrect: false, audioKey: "kalemlik", spokenText: "kalemlik" }
        ]
    },
    // kavanoz
    {
        id: 7,
        question: "Dolu olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Dolu olan hangisi?', correct: 'Evet! Kavanoz doludur.', wrong: 'Hayır, bu kavanoz boştur.' }
        },
        options: [
            { id: 2608, word: "kavanoz", imageUrl: "/images/2608.webp", isCorrect: true, audioKey: "kavanoz", spokenText: "kavanoz" },
            { id: 2607, word: "kavanoz", imageUrl: "/images/2607.webp", isCorrect: false, audioKey: "kavanoz", spokenText: "kavanoz" }
        ]
    },
    {
        id: 8,
        question: "Boş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Boş olan hangisi?', correct: 'Evet! Kavanoz boştur.', wrong: 'Hayır, bu kavanoz doludur.' }
        },
        options: [
            { id: 2607, word: "kavanoz", imageUrl: "/images/2607.webp", isCorrect: true, audioKey: "kavanoz", spokenText: "kavanoz" },
            { id: 2608, word: "kavanoz", imageUrl: "/images/2608.webp", isCorrect: false, audioKey: "kavanoz", spokenText: "kavanoz" }
        ]
    },
    // yumurta kolisi
    {
        id: 9,
        question: "Dolu olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Dolu olan hangisi?', correct: 'Evet! Yumurta kolisi doludur.', wrong: 'Hayır, bu yumurta kolisi boştur.' }
        },
        options: [
            { id: 2610, word: "yumurta kolisi", imageUrl: "/images/2610.webp", isCorrect: true, audioKey: "yumurta kolisi", spokenText: "yumurta kolisi" },
            { id: 2609, word: "yumurta kolisi", imageUrl: "/images/2609.webp", isCorrect: false, audioKey: "yumurta kolisi", spokenText: "yumurta kolisi" }
        ]
    },
    {
        id: 10,
        question: "Boş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Boş olan hangisi?', correct: 'Evet! Yumurta kolisi boştur.', wrong: 'Hayır, bu yumurta kolisi doludur.' }
        },
        options: [
            { id: 2609, word: "yumurta kolisi", imageUrl: "/images/2609.webp", isCorrect: true, audioKey: "yumurta kolisi", spokenText: "yumurta kolisi" },
            { id: 2610, word: "yumurta kolisi", imageUrl: "/images/2610.webp", isCorrect: false, audioKey: "yumurta kolisi", spokenText: "yumurta kolisi" }
        ]
    },
    // kova
    {
        id: 11,
        question: "Dolu olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Dolu olan hangisi?', correct: 'Evet! Kova doludur.', wrong: 'Hayır, bu kova boştur.' }
        },
        options: [
            { id: 2612, word: "kova", imageUrl: "/images/2612.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 2611, word: "kova", imageUrl: "/images/2611.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    {
        id: 12,
        question: "Boş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Boş olan hangisi?', correct: 'Evet! Kova boştur.', wrong: 'Hayır, bu kova doludur.' }
        },
        options: [
            { id: 2611, word: "kova", imageUrl: "/images/2611.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 2612, word: "kova", imageUrl: "/images/2612.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    // kumbara
    {
        id: 13,
        question: "Dolu olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Dolu olan hangisi?', correct: 'Evet! Kumbara doludur.', wrong: 'Hayır, bu kumbara boştur.' }
        },
        options: [
            { id: 2614, word: "kumbara", imageUrl: "/images/2614.webp", isCorrect: true, audioKey: "kumbara", spokenText: "kumbara" },
            { id: 2613, word: "kumbara", imageUrl: "/images/2613.webp", isCorrect: false, audioKey: "kumbara", spokenText: "kumbara" }
        ]
    },
    {
        id: 14,
        question: "Boş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Boş olan hangisi?', correct: 'Evet! Kumbara boştur.', wrong: 'Hayır, bu kumbara doludur.' }
        },
        options: [
            { id: 2613, word: "kumbara", imageUrl: "/images/2613.webp", isCorrect: true, audioKey: "kumbara", spokenText: "kumbara" },
            { id: 2614, word: "kumbara", imageUrl: "/images/2614.webp", isCorrect: false, audioKey: "kumbara", spokenText: "kumbara" }
        ]
    },
    // oyuncak kutusu
    {
        id: 15,
        question: "Dolu olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Dolu olan hangisi?', correct: 'Evet! Oyuncak kutusu doludur.', wrong: 'Hayır, bu oyuncak kutusu boştur.' }
        },
        options: [
            { id: 2616, word: "oyuncak kutusu", imageUrl: "/images/2616.webp", isCorrect: true, audioKey: "oyuncak kutusu", spokenText: "oyuncak kutusu" },
            { id: 2615, word: "oyuncak kutusu", imageUrl: "/images/2615.webp", isCorrect: false, audioKey: "oyuncak kutusu", spokenText: "oyuncak kutusu" }
        ]
    },
    {
        id: 16,
        question: "Boş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Boş olan hangisi?', correct: 'Evet! Oyuncak kutusu boştur.', wrong: 'Hayır, bu oyuncak kutusu doludur.' }
        },
        options: [
            { id: 2615, word: "oyuncak kutusu", imageUrl: "/images/2615.webp", isCorrect: true, audioKey: "oyuncak kutusu", spokenText: "oyuncak kutusu" },
            { id: 2616, word: "oyuncak kutusu", imageUrl: "/images/2616.webp", isCorrect: false, audioKey: "oyuncak kutusu", spokenText: "oyuncak kutusu" }
        ]
    },
    // sepet
    {
        id: 17,
        question: "Dolu olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Dolu olan hangisi?', correct: 'Evet! Sepet doludur.', wrong: 'Hayır, bu sepet boştur.' }
        },
        options: [
            { id: 2618, word: "sepet", imageUrl: "/images/2618.webp", isCorrect: true, audioKey: "sepet", spokenText: "sepet" },
            { id: 2617, word: "sepet", imageUrl: "/images/2617.webp", isCorrect: false, audioKey: "sepet", spokenText: "sepet" }
        ]
    },
    {
        id: 18,
        question: "Boş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Boş olan hangisi?', correct: 'Evet! Sepet boştur.', wrong: 'Hayır, bu sepet doludur.' }
        },
        options: [
            { id: 2617, word: "sepet", imageUrl: "/images/2617.webp", isCorrect: true, audioKey: "sepet", spokenText: "sepet" },
            { id: 2618, word: "sepet", imageUrl: "/images/2618.webp", isCorrect: false, audioKey: "sepet", spokenText: "sepet" }
        ]
    },
    // tabak
    {
        id: 19,
        question: "Dolu olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Dolu olan hangisi?', correct: 'Evet! Tabak doludur.', wrong: 'Hayır, bu tabak boştur.' }
        },
        options: [
            { id: 2620, word: "tabak", imageUrl: "/images/2620.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 2619, word: "tabak", imageUrl: "/images/2619.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
    {
        id: 20,
        question: "Boş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FullEmpty,
        speech: {
            tr: { question: 'Boş olan hangisi?', correct: 'Evet! Tabak boştur.', wrong: 'Hayır, bu tabak doludur.' }
        },
        options: [
            { id: 2619, word: "tabak", imageUrl: "/images/2619.webp", isCorrect: true, audioKey: "tabak", spokenText: "tabak" },
            { id: 2620, word: "tabak", imageUrl: "/images/2620.webp", isCorrect: false, audioKey: "tabak", spokenText: "tabak" }
        ]
    },
];
