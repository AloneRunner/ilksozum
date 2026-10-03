// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (canli-cansiz). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/canli-cansiz/ → id 5301-5300.
import { ConceptRound, ActivityType } from '../../../../types';

export const aliveLifelessDataYeni: ConceptRound[] = [
    // kedi_robot
    {
        id: 1,
        question: "Canlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Canlı olan hangisi?', correct: 'Evet! Kedi canlıdır.', wrong: 'Hayır, robot cansızdır.' }
        },
        options: [
            { id: 3504, word: "kedi", imageUrl: "/images/3504.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 3112, word: "robot", imageUrl: "/images/3112.webp", isCorrect: false, audioKey: "robot", spokenText: "robot" }
        ]
    },
    {
        id: 2,
        question: "Cansız olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Cansız olan hangisi?', correct: 'Evet! Robot cansızdır.', wrong: 'Hayır, kedi canlıdır.' }
        },
        options: [
            { id: 3112, word: "robot", imageUrl: "/images/3112.webp", isCorrect: true, audioKey: "robot", spokenText: "robot" },
            { id: 3504, word: "kedi", imageUrl: "/images/3504.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // kopek_top
    {
        id: 3,
        question: "Canlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Canlı olan hangisi?', correct: 'Evet! Köpek canlıdır.', wrong: 'Hayır, top cansızdır.' }
        },
        options: [
            { id: 4415, word: "köpek", imageUrl: "/images/4415.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 2317, word: "top", imageUrl: "/images/2317.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 4,
        question: "Cansız olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Cansız olan hangisi?', correct: 'Evet! Top cansızdır.', wrong: 'Hayır, köpek canlıdır.' }
        },
        options: [
            { id: 2317, word: "top", imageUrl: "/images/2317.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 4415, word: "köpek", imageUrl: "/images/4415.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    // kaplumbaga_tas
    {
        id: 5,
        question: "Canlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Canlı olan hangisi?', correct: 'Evet! Kaplumbağa canlıdır.', wrong: 'Hayır, taş cansızdır.' }
        },
        options: [
            { id: 3503, word: "kaplumbağa", imageUrl: "/images/3503.webp", isCorrect: true, audioKey: "kaplumbağa", spokenText: "kaplumbağa" },
            { id: 3512, word: "taş", imageUrl: "/images/3512.webp", isCorrect: false, audioKey: "taş", spokenText: "taş" }
        ]
    },
    {
        id: 6,
        question: "Cansız olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Cansız olan hangisi?', correct: 'Evet! Taş cansızdır.', wrong: 'Hayır, kaplumbağa canlıdır.' }
        },
        options: [
            { id: 3512, word: "taş", imageUrl: "/images/3512.webp", isCorrect: true, audioKey: "taş", spokenText: "taş" },
            { id: 3503, word: "kaplumbağa", imageUrl: "/images/3503.webp", isCorrect: false, audioKey: "kaplumbağa", spokenText: "kaplumbağa" }
        ]
    },
    // kirpi_dikenlitop
    {
        id: 7,
        question: "Canlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Canlı olan hangisi?', correct: 'Evet! Kirpi canlıdır.', wrong: 'Hayır, dikenli top cansızdır.' }
        },
        options: [
            { id: 3813, word: "kirpi", imageUrl: "/images/3813.webp", isCorrect: true, audioKey: "kirpi", spokenText: "kirpi" },
            { id: 3817, word: "dikenli top", imageUrl: "/images/3817.webp", isCorrect: false, audioKey: "dikenli top", spokenText: "dikenli top" }
        ]
    },
    {
        id: 8,
        question: "Cansız olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Cansız olan hangisi?', correct: 'Evet! Dikenli top cansızdır.', wrong: 'Hayır, kirpi canlıdır.' }
        },
        options: [
            { id: 3817, word: "dikenli top", imageUrl: "/images/3817.webp", isCorrect: true, audioKey: "dikenli top", spokenText: "dikenli top" },
            { id: 3813, word: "kirpi", imageUrl: "/images/3813.webp", isCorrect: false, audioKey: "kirpi", spokenText: "kirpi" }
        ]
    },
    // tay_sandalye
    {
        id: 9,
        question: "Canlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Canlı olan hangisi?', correct: 'Evet! Tay canlıdır.', wrong: 'Hayır, sandalye cansızdır.' }
        },
        options: [
            { id: 4405, word: "tay", imageUrl: "/images/4405.webp", isCorrect: true, audioKey: "tay", spokenText: "tay" },
            { id: 3116, word: "sandalye", imageUrl: "/images/3116.webp", isCorrect: false, audioKey: "sandalye", spokenText: "sandalye" }
        ]
    },
    {
        id: 10,
        question: "Cansız olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Cansız olan hangisi?', correct: 'Evet! Sandalye cansızdır.', wrong: 'Hayır, tay canlıdır.' }
        },
        options: [
            { id: 3116, word: "sandalye", imageUrl: "/images/3116.webp", isCorrect: true, audioKey: "sandalye", spokenText: "sandalye" },
            { id: 4405, word: "tay", imageUrl: "/images/4405.webp", isCorrect: false, audioKey: "tay", spokenText: "tay" }
        ]
    },
    // civciv_ordek
    {
        id: 11,
        question: "Canlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Canlı olan hangisi?', correct: 'Evet! Civciv canlıdır.', wrong: 'Hayır, oyuncak ördek cansızdır.' }
        },
        options: [
            { id: 4306, word: "civciv", imageUrl: "/images/4306.webp", isCorrect: true, audioKey: "civciv", spokenText: "civciv" },
            { id: 3816, word: "oyuncak ördek", imageUrl: "/images/3816.webp", isCorrect: false, audioKey: "oyuncak ördek", spokenText: "oyuncak ördek" }
        ]
    },
    {
        id: 12,
        question: "Cansız olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Cansız olan hangisi?', correct: 'Evet! Oyuncak ördek cansızdır.', wrong: 'Hayır, civciv canlıdır.' }
        },
        options: [
            { id: 3816, word: "oyuncak ördek", imageUrl: "/images/3816.webp", isCorrect: true, audioKey: "oyuncak ördek", spokenText: "oyuncak ördek" },
            { id: 4306, word: "civciv", imageUrl: "/images/4306.webp", isCorrect: false, audioKey: "civciv", spokenText: "civciv" }
        ]
    },
    // lale_kalem
    {
        id: 13,
        question: "Canlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Canlı olan hangisi?', correct: 'Evet! Lale canlıdır.', wrong: 'Hayır, kalem cansızdır.' }
        },
        options: [
            { id: 3003, word: "lale", imageUrl: "/images/3003.webp", isCorrect: true, audioKey: "lale", spokenText: "lale" },
            { id: 2001, word: "kalem", imageUrl: "/images/2001.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 14,
        question: "Cansız olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Cansız olan hangisi?', correct: 'Evet! Kalem cansızdır.', wrong: 'Hayır, lale canlıdır.' }
        },
        options: [
            { id: 2001, word: "kalem", imageUrl: "/images/2001.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 3003, word: "lale", imageUrl: "/images/3003.webp", isCorrect: false, audioKey: "lale", spokenText: "lale" }
        ]
    },
    // agac_bank
    {
        id: 15,
        question: "Canlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Canlı olan hangisi?', correct: 'Evet! Ağaç canlıdır.', wrong: 'Hayır, bank cansızdır.' }
        },
        options: [
            { id: 2009, word: "ağaç", imageUrl: "/images/2009.webp", isCorrect: true, audioKey: "ağaç", spokenText: "ağaç" },
            { id: 2404, word: "bank", imageUrl: "/images/2404.webp", isCorrect: false, audioKey: "bank", spokenText: "bank" }
        ]
    },
    {
        id: 16,
        question: "Cansız olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Cansız olan hangisi?', correct: 'Evet! Bank cansızdır.', wrong: 'Hayır, ağaç canlıdır.' }
        },
        options: [
            { id: 2404, word: "bank", imageUrl: "/images/2404.webp", isCorrect: true, audioKey: "bank", spokenText: "bank" },
            { id: 2009, word: "ağaç", imageUrl: "/images/2009.webp", isCorrect: false, audioKey: "ağaç", spokenText: "ağaç" }
        ]
    },
    // tavsan_ayi
    {
        id: 17,
        question: "Canlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Canlı olan hangisi?', correct: 'Evet! Tavşan canlıdır.', wrong: 'Hayır, oyuncak ayı cansızdır.' }
        },
        options: [
            { id: 4320, word: "tavşan", imageUrl: "/images/4320.webp", isCorrect: true, audioKey: "tavşan", spokenText: "tavşan" },
            { id: 3206, word: "oyuncak ayı", imageUrl: "/images/3206.webp", isCorrect: false, audioKey: "oyuncak ayı", spokenText: "oyuncak ayı" }
        ]
    },
    {
        id: 18,
        question: "Cansız olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Cansız olan hangisi?', correct: 'Evet! Oyuncak ayı cansızdır.', wrong: 'Hayır, tavşan canlıdır.' }
        },
        options: [
            { id: 3206, word: "oyuncak ayı", imageUrl: "/images/3206.webp", isCorrect: true, audioKey: "oyuncak ayı", spokenText: "oyuncak ayı" },
            { id: 4320, word: "tavşan", imageUrl: "/images/4320.webp", isCorrect: false, audioKey: "tavşan", spokenText: "tavşan" }
        ]
    },
    // kuzu_yastik
    {
        id: 19,
        question: "Canlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Canlı olan hangisi?', correct: 'Evet! Kuzu canlıdır.', wrong: 'Hayır, yastık cansızdır.' }
        },
        options: [
            { id: 4318, word: "kuzu", imageUrl: "/images/4318.webp", isCorrect: true, audioKey: "kuzu", spokenText: "kuzu" },
            { id: 2320, word: "yastık", imageUrl: "/images/2320.webp", isCorrect: false, audioKey: "yastık", spokenText: "yastık" }
        ]
    },
    {
        id: 20,
        question: "Cansız olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.AliveLifeless,
        speech: {
            tr: { question: 'Cansız olan hangisi?', correct: 'Evet! Yastık cansızdır.', wrong: 'Hayır, kuzu canlıdır.' }
        },
        options: [
            { id: 2320, word: "yastık", imageUrl: "/images/2320.webp", isCorrect: true, audioKey: "yastık", spokenText: "yastık" },
            { id: 4318, word: "kuzu", imageUrl: "/images/4318.webp", isCorrect: false, audioKey: "kuzu", spokenText: "kuzu" }
        ]
    },
];
