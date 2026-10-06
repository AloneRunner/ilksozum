// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (yuksek-alcak). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/yuksek-alcak/ → id 2501-2521.
import { ConceptRound, ActivityType } from '../../../../types';

export const highLowDataYeni: ConceptRound[] = [
    // ayakkabı
    {
        id: 1001,
        question: "Hangi ayakkabının topuğu yüksek?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi ayakkabının topuğu yüksek?', correct: 'Evet! Bu ayakkabının topuğu yüksek.', wrong: 'Hayır, bu ayakkabının topuğu alçak.' }
        },
        options: [
            { id: 2502, word: "ayakkabı", imageUrl: "/images/2502.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 2501, word: "ayakkabı", imageUrl: "/images/2501.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    {
        id: 1002,
        question: "Hangi ayakkabının topuğu alçak?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi ayakkabının topuğu alçak?', correct: 'Evet! Bu ayakkabının topuğu alçak.', wrong: 'Hayır, bu ayakkabının topuğu yüksek.' }
        },
        options: [
            { id: 2501, word: "ayakkabı", imageUrl: "/images/2501.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 2502, word: "ayakkabı", imageUrl: "/images/2502.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    // bina
    {
        id: 1003,
        question: "Hangi bina yüksek?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi bina yüksek?', correct: 'Evet! Bu bina yüksek.', wrong: 'Hayır, bu bina alçak.' }
        },
        options: [
            { id: 2504, word: "bina", imageUrl: "/images/2504.webp", isCorrect: true, audioKey: "bina", spokenText: "bina" },
            { id: 2503, word: "bina", imageUrl: "/images/2503.webp", isCorrect: false, audioKey: "bina", spokenText: "bina" }
        ]
    },
    {
        id: 1004,
        question: "Hangi bina alçak?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi bina alçak?', correct: 'Evet! Bu bina alçak.', wrong: 'Hayır, bu bina yüksek.' }
        },
        options: [
            { id: 2503, word: "bina", imageUrl: "/images/2503.webp", isCorrect: true, audioKey: "bina", spokenText: "bina" },
            { id: 2504, word: "bina", imageUrl: "/images/2504.webp", isCorrect: false, audioKey: "bina", spokenText: "bina" }
        ]
    },
    // blok kulesi
    {
        id: 1005,
        question: "Hangi blok kulesi yüksek?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi blok kulesi yüksek?', correct: 'Evet! Bu blok kulesi yüksek.', wrong: 'Hayır, bu blok kulesi alçak.' }
        },
        options: [
            { id: 2507, word: "blok kulesi", imageUrl: "/images/2507.webp", isCorrect: true, audioKey: "blok kulesi", spokenText: "blok kulesi" },
            { id: 2505, word: "blok kulesi", imageUrl: "/images/2505.webp", isCorrect: false, audioKey: "blok kulesi", spokenText: "blok kulesi" }
        ]
    },
    {
        id: 1006,
        question: "Hangi blok kulesi alçak?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi blok kulesi alçak?', correct: 'Evet! Bu blok kulesi alçak.', wrong: 'Hayır, bu blok kulesi yüksek.' }
        },
        options: [
            { id: 2505, word: "blok kulesi", imageUrl: "/images/2505.webp", isCorrect: true, audioKey: "blok kulesi", spokenText: "blok kulesi" },
            { id: 2507, word: "blok kulesi", imageUrl: "/images/2507.webp", isCorrect: false, audioKey: "blok kulesi", spokenText: "blok kulesi" }
        ]
    },
    // çadır
    {
        id: 1007,
        question: "Hangi çadır yüksek?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi çadır yüksek?', correct: 'Evet! Bu çadır yüksek.', wrong: 'Hayır, bu çadır alçak.' }
        },
        options: [
            { id: 2509, word: "çadır", imageUrl: "/images/2509.webp", isCorrect: true, audioKey: "çadır", spokenText: "çadır" },
            { id: 2508, word: "çadır", imageUrl: "/images/2508.webp", isCorrect: false, audioKey: "çadır", spokenText: "çadır" }
        ]
    },
    {
        id: 1008,
        question: "Hangi çadır alçak?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi çadır alçak?', correct: 'Evet! Bu çadır alçak.', wrong: 'Hayır, bu çadır yüksek.' }
        },
        options: [
            { id: 2508, word: "çadır", imageUrl: "/images/2508.webp", isCorrect: true, audioKey: "çadır", spokenText: "çadır" },
            { id: 2509, word: "çadır", imageUrl: "/images/2509.webp", isCorrect: false, audioKey: "çadır", spokenText: "çadır" }
        ]
    },
    // çit
    {
        id: 1009,
        question: "Hangi çit yüksek?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi çit yüksek?', correct: 'Evet! Bu çit yüksek.', wrong: 'Hayır, bu çit alçak.' }
        },
        options: [
            { id: 2511, word: "çit", imageUrl: "/images/2511.webp", isCorrect: true, audioKey: "çit", spokenText: "çit" },
            { id: 2510, word: "çit", imageUrl: "/images/2510.webp", isCorrect: false, audioKey: "çit", spokenText: "çit" }
        ]
    },
    {
        id: 1010,
        question: "Hangi çit alçak?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi çit alçak?', correct: 'Evet! Bu çit alçak.', wrong: 'Hayır, bu çit yüksek.' }
        },
        options: [
            { id: 2510, word: "çit", imageUrl: "/images/2510.webp", isCorrect: true, audioKey: "çit", spokenText: "çit" },
            { id: 2511, word: "çit", imageUrl: "/images/2511.webp", isCorrect: false, audioKey: "çit", spokenText: "çit" }
        ]
    },
    // dağ
    {
        id: 1011,
        question: "Hangi dağ yüksek?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi dağ yüksek?', correct: 'Evet! Bu dağ yüksek.', wrong: 'Hayır, bu dağ alçak.' }
        },
        options: [
            { id: 2513, word: "dağ", imageUrl: "/images/2513.webp", isCorrect: true, audioKey: "dağ", spokenText: "dağ" },
            { id: 2512, word: "dağ", imageUrl: "/images/2512.webp", isCorrect: false, audioKey: "dağ", spokenText: "dağ" }
        ]
    },
    {
        id: 1012,
        question: "Hangi dağ alçak?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi dağ alçak?', correct: 'Evet! Bu dağ alçak.', wrong: 'Hayır, bu dağ yüksek.' }
        },
        options: [
            { id: 2512, word: "dağ", imageUrl: "/images/2512.webp", isCorrect: true, audioKey: "dağ", spokenText: "dağ" },
            { id: 2513, word: "dağ", imageUrl: "/images/2513.webp", isCorrect: false, audioKey: "dağ", spokenText: "dağ" }
        ]
    },
    // duvar
    {
        id: 1013,
        question: "Hangi duvar yüksek?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi duvar yüksek?', correct: 'Evet! Bu duvar yüksek.', wrong: 'Hayır, bu duvar alçak.' }
        },
        options: [
            { id: 2515, word: "duvar", imageUrl: "/images/2515.webp", isCorrect: true, audioKey: "duvar", spokenText: "duvar" },
            { id: 2514, word: "duvar", imageUrl: "/images/2514.webp", isCorrect: false, audioKey: "duvar", spokenText: "duvar" }
        ]
    },
    {
        id: 1014,
        question: "Hangi duvar alçak?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi duvar alçak?', correct: 'Evet! Bu duvar alçak.', wrong: 'Hayır, bu duvar yüksek.' }
        },
        options: [
            { id: 2514, word: "duvar", imageUrl: "/images/2514.webp", isCorrect: true, audioKey: "duvar", spokenText: "duvar" },
            { id: 2515, word: "duvar", imageUrl: "/images/2515.webp", isCorrect: false, audioKey: "duvar", spokenText: "duvar" }
        ]
    },
    // kitaplık
    {
        id: 1015,
        question: "Hangi kitaplık yüksek?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi kitaplık yüksek?', correct: 'Evet! Bu kitaplık yüksek.', wrong: 'Hayır, bu kitaplık alçak.' }
        },
        options: [
            { id: 2517, word: "kitaplık", imageUrl: "/images/2517.webp", isCorrect: true, audioKey: "kitaplık", spokenText: "kitaplık" },
            { id: 2516, word: "kitaplık", imageUrl: "/images/2516.webp", isCorrect: false, audioKey: "kitaplık", spokenText: "kitaplık" }
        ]
    },
    {
        id: 1016,
        question: "Hangi kitaplık alçak?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi kitaplık alçak?', correct: 'Evet! Bu kitaplık alçak.', wrong: 'Hayır, bu kitaplık yüksek.' }
        },
        options: [
            { id: 2516, word: "kitaplık", imageUrl: "/images/2516.webp", isCorrect: true, audioKey: "kitaplık", spokenText: "kitaplık" },
            { id: 2517, word: "kitaplık", imageUrl: "/images/2517.webp", isCorrect: false, audioKey: "kitaplık", spokenText: "kitaplık" }
        ]
    },
    // masa
    {
        id: 1017,
        question: "Hangi masa yüksek?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi masa yüksek?', correct: 'Evet! Bu masa yüksek.', wrong: 'Hayır, bu masa alçak.' }
        },
        options: [
            { id: 2519, word: "masa", imageUrl: "/images/2519.webp", isCorrect: true, audioKey: "masa", spokenText: "masa" },
            { id: 2518, word: "masa", imageUrl: "/images/2518.webp", isCorrect: false, audioKey: "masa", spokenText: "masa" }
        ]
    },
    {
        id: 1018,
        question: "Hangi masa alçak?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi masa alçak?', correct: 'Evet! Bu masa alçak.', wrong: 'Hayır, bu masa yüksek.' }
        },
        options: [
            { id: 2518, word: "masa", imageUrl: "/images/2518.webp", isCorrect: true, audioKey: "masa", spokenText: "masa" },
            { id: 2519, word: "masa", imageUrl: "/images/2519.webp", isCorrect: false, audioKey: "masa", spokenText: "masa" }
        ]
    },
    // tabure
    {
        id: 1019,
        question: "Hangi tabure yüksek?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi tabure yüksek?', correct: 'Evet! Bu tabure yüksek.', wrong: 'Hayır, bu tabure alçak.' }
        },
        options: [
            { id: 2521, word: "tabure", imageUrl: "/images/2521.webp", isCorrect: true, audioKey: "tabure", spokenText: "tabure" },
            { id: 2520, word: "tabure", imageUrl: "/images/2520.webp", isCorrect: false, audioKey: "tabure", spokenText: "tabure" }
        ]
    },
    {
        id: 1020,
        question: "Hangi tabure alçak?",
        questionAudioKey: "",
        activityType: ActivityType.HighLow,
        speech: {
            tr: { question: 'Hangi tabure alçak?', correct: 'Evet! Bu tabure alçak.', wrong: 'Hayır, bu tabure yüksek.' }
        },
        options: [
            { id: 2520, word: "tabure", imageUrl: "/images/2520.webp", isCorrect: true, audioKey: "tabure", spokenText: "tabure" },
            { id: 2521, word: "tabure", imageUrl: "/images/2521.webp", isCorrect: false, audioKey: "tabure", spokenText: "tabure" }
        ]
    },
];
