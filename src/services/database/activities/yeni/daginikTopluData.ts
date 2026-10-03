// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (daginik-toplu). Elle düzenleme.
// 6 çift, 12 soru. Görseller: gorsel-ham/daginik-toplu/ → id 5101-5112.
import { ConceptRound, ActivityType } from '../../../../types';

export const messyCleanDataYeni: ConceptRound[] = [
    // ayakkabılık
    {
        id: 1,
        question: "Hangi ayakkabılık dağınık?",
        questionAudioKey: "",
        activityType: ActivityType.MessyClean,
        speech: {
            tr: { question: 'Hangi ayakkabılık dağınık?', correct: 'Evet! Ayakkabılık dağınıktır.', wrong: 'Hayır, bu ayakkabılık topludur.' }
        },
        options: [
            { id: 5101, word: "ayakkabılık", imageUrl: "/images/5101.webp", isCorrect: true, audioKey: "ayakkabılık", spokenText: "ayakkabılık" },
            { id: 5102, word: "ayakkabılık", imageUrl: "/images/5102.webp", isCorrect: false, audioKey: "ayakkabılık", spokenText: "ayakkabılık" }
        ]
    },
    {
        id: 2,
        question: "Hangi ayakkabılık toplu?",
        questionAudioKey: "",
        activityType: ActivityType.MessyClean,
        speech: {
            tr: { question: 'Hangi ayakkabılık toplu?', correct: 'Evet! Ayakkabılık topludur.', wrong: 'Hayır, bu ayakkabılık dağınıktır.' }
        },
        options: [
            { id: 5102, word: "ayakkabılık", imageUrl: "/images/5102.webp", isCorrect: true, audioKey: "ayakkabılık", spokenText: "ayakkabılık" },
            { id: 5101, word: "ayakkabılık", imageUrl: "/images/5101.webp", isCorrect: false, audioKey: "ayakkabılık", spokenText: "ayakkabılık" }
        ]
    },
    // dolap
    {
        id: 3,
        question: "Hangi dolap dağınık?",
        questionAudioKey: "",
        activityType: ActivityType.MessyClean,
        speech: {
            tr: { question: 'Hangi dolap dağınık?', correct: 'Evet! Dolap dağınıktır.', wrong: 'Hayır, bu dolap topludur.' }
        },
        options: [
            { id: 5103, word: "dolap", imageUrl: "/images/5103.webp", isCorrect: true, audioKey: "dolap", spokenText: "dolap" },
            { id: 5104, word: "dolap", imageUrl: "/images/5104.webp", isCorrect: false, audioKey: "dolap", spokenText: "dolap" }
        ]
    },
    {
        id: 4,
        question: "Hangi dolap toplu?",
        questionAudioKey: "",
        activityType: ActivityType.MessyClean,
        speech: {
            tr: { question: 'Hangi dolap toplu?', correct: 'Evet! Dolap topludur.', wrong: 'Hayır, bu dolap dağınıktır.' }
        },
        options: [
            { id: 5104, word: "dolap", imageUrl: "/images/5104.webp", isCorrect: true, audioKey: "dolap", spokenText: "dolap" },
            { id: 5103, word: "dolap", imageUrl: "/images/5103.webp", isCorrect: false, audioKey: "dolap", spokenText: "dolap" }
        ]
    },
    // masa
    {
        id: 5,
        question: "Hangi masa dağınık?",
        questionAudioKey: "",
        activityType: ActivityType.MessyClean,
        speech: {
            tr: { question: 'Hangi masa dağınık?', correct: 'Evet! Masa dağınıktır.', wrong: 'Hayır, bu masa topludur.' }
        },
        options: [
            { id: 5105, word: "masa", imageUrl: "/images/5105.webp", isCorrect: true, audioKey: "masa", spokenText: "masa" },
            { id: 5106, word: "masa", imageUrl: "/images/5106.webp", isCorrect: false, audioKey: "masa", spokenText: "masa" }
        ]
    },
    {
        id: 6,
        question: "Hangi masa toplu?",
        questionAudioKey: "",
        activityType: ActivityType.MessyClean,
        speech: {
            tr: { question: 'Hangi masa toplu?', correct: 'Evet! Masa topludur.', wrong: 'Hayır, bu masa dağınıktır.' }
        },
        options: [
            { id: 5106, word: "masa", imageUrl: "/images/5106.webp", isCorrect: true, audioKey: "masa", spokenText: "masa" },
            { id: 5105, word: "masa", imageUrl: "/images/5105.webp", isCorrect: false, audioKey: "masa", spokenText: "masa" }
        ]
    },
    // oda
    {
        id: 7,
        question: "Hangi oda dağınık?",
        questionAudioKey: "",
        activityType: ActivityType.MessyClean,
        speech: {
            tr: { question: 'Hangi oda dağınık?', correct: 'Evet! Oda dağınıktır.', wrong: 'Hayır, bu oda topludur.' }
        },
        options: [
            { id: 5107, word: "oda", imageUrl: "/images/5107.webp", isCorrect: true, audioKey: "oda", spokenText: "oda" },
            { id: 5108, word: "oda", imageUrl: "/images/5108.webp", isCorrect: false, audioKey: "oda", spokenText: "oda" }
        ]
    },
    {
        id: 8,
        question: "Hangi oda toplu?",
        questionAudioKey: "",
        activityType: ActivityType.MessyClean,
        speech: {
            tr: { question: 'Hangi oda toplu?', correct: 'Evet! Oda topludur.', wrong: 'Hayır, bu oda dağınıktır.' }
        },
        options: [
            { id: 5108, word: "oda", imageUrl: "/images/5108.webp", isCorrect: true, audioKey: "oda", spokenText: "oda" },
            { id: 5107, word: "oda", imageUrl: "/images/5107.webp", isCorrect: false, audioKey: "oda", spokenText: "oda" }
        ]
    },
    // oyuncak rafı
    {
        id: 9,
        question: "Hangi oyuncak rafı dağınık?",
        questionAudioKey: "",
        activityType: ActivityType.MessyClean,
        speech: {
            tr: { question: 'Hangi oyuncak rafı dağınık?', correct: 'Evet! Oyuncak rafı dağınıktır.', wrong: 'Hayır, bu oyuncak rafı topludur.' }
        },
        options: [
            { id: 5109, word: "oyuncak rafı", imageUrl: "/images/5109.webp", isCorrect: true, audioKey: "oyuncak rafı", spokenText: "oyuncak rafı" },
            { id: 5110, word: "oyuncak rafı", imageUrl: "/images/5110.webp", isCorrect: false, audioKey: "oyuncak rafı", spokenText: "oyuncak rafı" }
        ]
    },
    {
        id: 10,
        question: "Hangi oyuncak rafı toplu?",
        questionAudioKey: "",
        activityType: ActivityType.MessyClean,
        speech: {
            tr: { question: 'Hangi oyuncak rafı toplu?', correct: 'Evet! Oyuncak rafı topludur.', wrong: 'Hayır, bu oyuncak rafı dağınıktır.' }
        },
        options: [
            { id: 5110, word: "oyuncak rafı", imageUrl: "/images/5110.webp", isCorrect: true, audioKey: "oyuncak rafı", spokenText: "oyuncak rafı" },
            { id: 5109, word: "oyuncak rafı", imageUrl: "/images/5109.webp", isCorrect: false, audioKey: "oyuncak rafı", spokenText: "oyuncak rafı" }
        ]
    },
    // yatak
    {
        id: 11,
        question: "Hangi yatak dağınık?",
        questionAudioKey: "",
        activityType: ActivityType.MessyClean,
        speech: {
            tr: { question: 'Hangi yatak dağınık?', correct: 'Evet! Yatak dağınıktır.', wrong: 'Hayır, bu yatak topludur.' }
        },
        options: [
            { id: 5111, word: "yatak", imageUrl: "/images/5111.webp", isCorrect: true, audioKey: "yatak", spokenText: "yatak" },
            { id: 5112, word: "yatak", imageUrl: "/images/5112.webp", isCorrect: false, audioKey: "yatak", spokenText: "yatak" }
        ]
    },
    {
        id: 12,
        question: "Hangi yatak toplu?",
        questionAudioKey: "",
        activityType: ActivityType.MessyClean,
        speech: {
            tr: { question: 'Hangi yatak toplu?', correct: 'Evet! Yatak topludur.', wrong: 'Hayır, bu yatak dağınıktır.' }
        },
        options: [
            { id: 5112, word: "yatak", imageUrl: "/images/5112.webp", isCorrect: true, audioKey: "yatak", spokenText: "yatak" },
            { id: 5111, word: "yatak", imageUrl: "/images/5111.webp", isCorrect: false, audioKey: "yatak", spokenText: "yatak" }
        ]
    },
];
