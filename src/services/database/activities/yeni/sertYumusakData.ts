// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (sert-yumusak). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/sert-yumusak/ → id 3501-3515.
import { ConceptRound, ActivityType } from '../../../../types';

export const hardSoftDataYeni: ConceptRound[] = [
    // hamur_blok
    {
        id: 1,
        question: "Yumuşak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Yumuşak olan hangisi?', correct: 'Evet! Oyun hamuru yumuşaktır.', wrong: 'Hayır, tahta blok serttir.' }
        },
        options: [
            { id: 3502, word: "oyun hamuru", imageUrl: "/images/3502.webp", isCorrect: true, audioKey: "oyun hamuru", spokenText: "oyun hamuru" },
            { id: 3501, word: "tahta blok", imageUrl: "/images/3501.webp", isCorrect: false, audioKey: "tahta blok", spokenText: "tahta blok" }
        ]
    },
    {
        id: 2,
        question: "Sert olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Sert olan hangisi?', correct: 'Evet! Tahta blok serttir.', wrong: 'Hayır, oyun hamuru yumuşaktır.' }
        },
        options: [
            { id: 3501, word: "tahta blok", imageUrl: "/images/3501.webp", isCorrect: true, audioKey: "tahta blok", spokenText: "tahta blok" },
            { id: 3502, word: "oyun hamuru", imageUrl: "/images/3502.webp", isCorrect: false, audioKey: "oyun hamuru", spokenText: "oyun hamuru" }
        ]
    },
    // kedi_kaplumbaga
    {
        id: 3,
        question: "Yumuşak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Yumuşak olan hangisi?', correct: 'Evet! Kedi yumuşaktır.', wrong: 'Hayır, kaplumbağa serttir.' }
        },
        options: [
            { id: 3504, word: "kedi", imageUrl: "/images/3504.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 3503, word: "kaplumbağa", imageUrl: "/images/3503.webp", isCorrect: false, audioKey: "kaplumbağa", spokenText: "kaplumbağa" }
        ]
    },
    {
        id: 4,
        question: "Sert olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Sert olan hangisi?', correct: 'Evet! Kaplumbağa serttir.', wrong: 'Hayır, kedi yumuşaktır.' }
        },
        options: [
            { id: 3503, word: "kaplumbağa", imageUrl: "/images/3503.webp", isCorrect: true, audioKey: "kaplumbağa", spokenText: "kaplumbağa" },
            { id: 3504, word: "kedi", imageUrl: "/images/3504.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // lokum_akide
    {
        id: 5,
        question: "Yumuşak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Yumuşak olan hangisi?', correct: 'Evet! Lokum yumuşaktır.', wrong: 'Hayır, akide şekeri serttir.' }
        },
        options: [
            { id: 3506, word: "lokum", imageUrl: "/images/3506.webp", isCorrect: true, audioKey: "lokum", spokenText: "lokum" },
            { id: 3505, word: "akide şekeri", imageUrl: "/images/3505.webp", isCorrect: false, audioKey: "akide şekeri", spokenText: "akide şekeri" }
        ]
    },
    {
        id: 6,
        question: "Sert olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Sert olan hangisi?', correct: 'Evet! Akide şekeri serttir.', wrong: 'Hayır, lokum yumuşaktır.' }
        },
        options: [
            { id: 3505, word: "akide şekeri", imageUrl: "/images/3505.webp", isCorrect: true, audioKey: "akide şekeri", spokenText: "akide şekeri" },
            { id: 3506, word: "lokum", imageUrl: "/images/3506.webp", isCorrect: false, audioKey: "lokum", spokenText: "lokum" }
        ]
    },
    // muz_ceviz
    {
        id: 7,
        question: "Yumuşak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Yumuşak olan hangisi?', correct: 'Evet! Muz yumuşaktır.', wrong: 'Hayır, ceviz serttir.' }
        },
        options: [
            { id: 3508, word: "muz", imageUrl: "/images/3508.webp", isCorrect: true, audioKey: "muz", spokenText: "muz" },
            { id: 3507, word: "ceviz", imageUrl: "/images/3507.webp", isCorrect: false, audioKey: "ceviz", spokenText: "ceviz" }
        ]
    },
    {
        id: 8,
        question: "Sert olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Sert olan hangisi?', correct: 'Evet! Ceviz serttir.', wrong: 'Hayır, muz yumuşaktır.' }
        },
        options: [
            { id: 3507, word: "ceviz", imageUrl: "/images/3507.webp", isCorrect: true, audioKey: "ceviz", spokenText: "ceviz" },
            { id: 3508, word: "muz", imageUrl: "/images/3508.webp", isCorrect: false, audioKey: "muz", spokenText: "muz" }
        ]
    },
    // pamuk_cakil
    {
        id: 9,
        question: "Yumuşak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Yumuşak olan hangisi?', correct: 'Evet! Pamuk yumuşaktır.', wrong: 'Hayır, çakıl taşı serttir.' }
        },
        options: [
            { id: 3510, word: "pamuk", imageUrl: "/images/3510.webp", isCorrect: true, audioKey: "pamuk", spokenText: "pamuk" },
            { id: 3509, word: "çakıl taşı", imageUrl: "/images/3509.webp", isCorrect: false, audioKey: "çakıl taşı", spokenText: "çakıl taşı" }
        ]
    },
    {
        id: 10,
        question: "Sert olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Sert olan hangisi?', correct: 'Evet! Çakıl taşı serttir.', wrong: 'Hayır, pamuk yumuşaktır.' }
        },
        options: [
            { id: 3509, word: "çakıl taşı", imageUrl: "/images/3509.webp", isCorrect: true, audioKey: "çakıl taşı", spokenText: "çakıl taşı" },
            { id: 3510, word: "pamuk", imageUrl: "/images/3510.webp", isCorrect: false, audioKey: "pamuk", spokenText: "pamuk" }
        ]
    },
    // puf_sandalye
    {
        id: 11,
        question: "Yumuşak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Yumuşak olan hangisi?', correct: 'Evet! Puf yumuşaktır.', wrong: 'Hayır, sandalye serttir.' }
        },
        options: [
            { id: 3511, word: "puf", imageUrl: "/images/3511.webp", isCorrect: true, audioKey: "puf", spokenText: "puf" },
            { id: 3116, word: "sandalye", imageUrl: "/images/3116.webp", isCorrect: false, audioKey: "sandalye", spokenText: "sandalye" }
        ]
    },
    {
        id: 12,
        question: "Sert olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Sert olan hangisi?', correct: 'Evet! Sandalye serttir.', wrong: 'Hayır, puf yumuşaktır.' }
        },
        options: [
            { id: 3116, word: "sandalye", imageUrl: "/images/3116.webp", isCorrect: true, audioKey: "sandalye", spokenText: "sandalye" },
            { id: 3511, word: "puf", imageUrl: "/images/3511.webp", isCorrect: false, audioKey: "puf", spokenText: "puf" }
        ]
    },
    // sunger_tas
    {
        id: 13,
        question: "Yumuşak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Yumuşak olan hangisi?', correct: 'Evet! Sünger yumuşaktır.', wrong: 'Hayır, taş serttir.' }
        },
        options: [
            { id: 3311, word: "sünger", imageUrl: "/images/3311.webp", isCorrect: true, audioKey: "sünger", spokenText: "sünger" },
            { id: 3512, word: "taş", imageUrl: "/images/3512.webp", isCorrect: false, audioKey: "taş", spokenText: "taş" }
        ]
    },
    {
        id: 14,
        question: "Sert olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Sert olan hangisi?', correct: 'Evet! Taş serttir.', wrong: 'Hayır, sünger yumuşaktır.' }
        },
        options: [
            { id: 3512, word: "taş", imageUrl: "/images/3512.webp", isCorrect: true, audioKey: "taş", spokenText: "taş" },
            { id: 3311, word: "sünger", imageUrl: "/images/3311.webp", isCorrect: false, audioKey: "sünger", spokenText: "sünger" }
        ]
    },
    // yastik_tugla
    {
        id: 15,
        question: "Yumuşak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Yumuşak olan hangisi?', correct: 'Evet! Yastık yumuşaktır.', wrong: 'Hayır, tuğla serttir.' }
        },
        options: [
            { id: 2320, word: "yastık", imageUrl: "/images/2320.webp", isCorrect: true, audioKey: "yastık", spokenText: "yastık" },
            { id: 3513, word: "tuğla", imageUrl: "/images/3513.webp", isCorrect: false, audioKey: "tuğla", spokenText: "tuğla" }
        ]
    },
    {
        id: 16,
        question: "Sert olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Sert olan hangisi?', correct: 'Evet! Tuğla serttir.', wrong: 'Hayır, yastık yumuşaktır.' }
        },
        options: [
            { id: 3513, word: "tuğla", imageUrl: "/images/3513.webp", isCorrect: true, audioKey: "tuğla", spokenText: "tuğla" },
            { id: 2320, word: "yastık", imageUrl: "/images/2320.webp", isCorrect: false, audioKey: "yastık", spokenText: "yastık" }
        ]
    },
    // yumak_top
    {
        id: 17,
        question: "Yumuşak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Yumuşak olan hangisi?', correct: 'Evet! Yün yumağı yumuşaktır.', wrong: 'Hayır, tahta top serttir.' }
        },
        options: [
            { id: 3515, word: "yün yumağı", imageUrl: "/images/3515.webp", isCorrect: true, audioKey: "yün yumağı", spokenText: "yün yumağı" },
            { id: 3514, word: "tahta top", imageUrl: "/images/3514.webp", isCorrect: false, audioKey: "tahta top", spokenText: "tahta top" }
        ]
    },
    {
        id: 18,
        question: "Sert olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Sert olan hangisi?', correct: 'Evet! Tahta top serttir.', wrong: 'Hayır, yün yumağı yumuşaktır.' }
        },
        options: [
            { id: 3514, word: "tahta top", imageUrl: "/images/3514.webp", isCorrect: true, audioKey: "tahta top", spokenText: "tahta top" },
            { id: 3515, word: "yün yumağı", imageUrl: "/images/3515.webp", isCorrect: false, audioKey: "yün yumağı", spokenText: "yün yumağı" }
        ]
    },
    // ayi_robot
    {
        id: 19,
        question: "Yumuşak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Yumuşak olan hangisi?', correct: 'Evet! Ayı yumuşaktır.', wrong: 'Hayır, robot serttir.' }
        },
        options: [
            { id: 3206, word: "ayı", imageUrl: "/images/3206.webp", isCorrect: true, audioKey: "ayı", spokenText: "ayı" },
            { id: 3112, word: "robot", imageUrl: "/images/3112.webp", isCorrect: false, audioKey: "robot", spokenText: "robot" }
        ]
    },
    {
        id: 20,
        question: "Sert olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HardSoft,
        speech: {
            tr: { question: 'Sert olan hangisi?', correct: 'Evet! Robot serttir.', wrong: 'Hayır, ayı yumuşaktır.' }
        },
        options: [
            { id: 3112, word: "robot", imageUrl: "/images/3112.webp", isCorrect: true, audioKey: "robot", spokenText: "robot" },
            { id: 3206, word: "ayı", imageUrl: "/images/3206.webp", isCorrect: false, audioKey: "ayı", spokenText: "ayı" }
        ]
    },
];
