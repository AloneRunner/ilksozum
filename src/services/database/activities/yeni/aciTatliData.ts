// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (aci-tatli). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/aci-tatli/ → id 4101-4115.
import { ConceptRound, ActivityType } from '../../../../types';

export const bitterSweetDataYeni: ConceptRound[] = [
    // acisos_dondurma
    {
        id: 1,
        question: "Acı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Acı olan hangisi?', correct: 'Evet! Acı sos acıdır.', wrong: 'Hayır, dondurma tatlıdır.' }
        },
        options: [
            { id: 4101, word: "acı sos", imageUrl: "/images/4101.webp", isCorrect: true, audioKey: "acı sos", spokenText: "acı sos" },
            { id: 3608, word: "dondurma", imageUrl: "/images/3608.webp", isCorrect: false, audioKey: "dondurma", spokenText: "dondurma" }
        ]
    },
    {
        id: 2,
        question: "Tatlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Tatlı olan hangisi?', correct: 'Evet! Dondurma tatlıdır.', wrong: 'Hayır, acı sos acıdır.' }
        },
        options: [
            { id: 3608, word: "dondurma", imageUrl: "/images/3608.webp", isCorrect: true, audioKey: "dondurma", spokenText: "dondurma" },
            { id: 4101, word: "acı sos", imageUrl: "/images/4101.webp", isCorrect: false, audioKey: "acı sos", spokenText: "acı sos" }
        ]
    },
    // biber_bal
    {
        id: 3,
        question: "Acı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Acı olan hangisi?', correct: 'Evet! Acı biber acıdır.', wrong: 'Hayır, bal tatlıdır.' }
        },
        options: [
            { id: 4102, word: "acı biber", imageUrl: "/images/4102.webp", isCorrect: true, audioKey: "acı biber", spokenText: "acı biber" },
            { id: 4103, word: "bal", imageUrl: "/images/4103.webp", isCorrect: false, audioKey: "bal", spokenText: "bal" }
        ]
    },
    {
        id: 4,
        question: "Tatlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Tatlı olan hangisi?', correct: 'Evet! Bal tatlıdır.', wrong: 'Hayır, acı biber acıdır.' }
        },
        options: [
            { id: 4103, word: "bal", imageUrl: "/images/4103.webp", isCorrect: true, audioKey: "bal", spokenText: "bal" },
            { id: 4102, word: "acı biber", imageUrl: "/images/4102.webp", isCorrect: false, audioKey: "acı biber", spokenText: "acı biber" }
        ]
    },
    // eriksek_cilek
    {
        id: 5,
        question: "Ekşi olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Ekşi olan hangisi?', correct: 'Evet! Yeşil erik ekşidir.', wrong: 'Hayır, çilek tatlıdır.' }
        },
        options: [
            { id: 4104, word: "yeşil erik", imageUrl: "/images/4104.webp", isCorrect: true, audioKey: "yeşil erik", spokenText: "yeşil erik" },
            { id: 4105, word: "çilek", imageUrl: "/images/4105.webp", isCorrect: false, audioKey: "çilek", spokenText: "çilek" }
        ]
    },
    {
        id: 6,
        question: "Tatlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Tatlı olan hangisi?', correct: 'Evet! Çilek tatlıdır.', wrong: 'Hayır, yeşil erik ekşidir.' }
        },
        options: [
            { id: 4105, word: "çilek", imageUrl: "/images/4105.webp", isCorrect: true, audioKey: "çilek", spokenText: "çilek" },
            { id: 4104, word: "yeşil erik", imageUrl: "/images/4104.webp", isCorrect: false, audioKey: "yeşil erik", spokenText: "yeşil erik" }
        ]
    },
    // greyfurt_uzum
    {
        id: 7,
        question: "Ekşi olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Ekşi olan hangisi?', correct: 'Evet! Greyfurt ekşidir.', wrong: 'Hayır, üzüm tatlıdır.' }
        },
        options: [
            { id: 4106, word: "greyfurt", imageUrl: "/images/4106.webp", isCorrect: true, audioKey: "greyfurt", spokenText: "greyfurt" },
            { id: 4107, word: "üzüm", imageUrl: "/images/4107.webp", isCorrect: false, audioKey: "üzüm", spokenText: "üzüm" }
        ]
    },
    {
        id: 8,
        question: "Tatlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Tatlı olan hangisi?', correct: 'Evet! Üzüm tatlıdır.', wrong: 'Hayır, greyfurt ekşidir.' }
        },
        options: [
            { id: 4107, word: "üzüm", imageUrl: "/images/4107.webp", isCorrect: true, audioKey: "üzüm", spokenText: "üzüm" },
            { id: 4106, word: "greyfurt", imageUrl: "/images/4106.webp", isCorrect: false, audioKey: "greyfurt", spokenText: "greyfurt" }
        ]
    },
    // hardal_lokum
    {
        id: 9,
        question: "Acı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Acı olan hangisi?', correct: 'Evet! Hardal acıdır.', wrong: 'Hayır, lokum tatlıdır.' }
        },
        options: [
            { id: 4108, word: "hardal", imageUrl: "/images/4108.webp", isCorrect: true, audioKey: "hardal", spokenText: "hardal" },
            { id: 3506, word: "lokum", imageUrl: "/images/3506.webp", isCorrect: false, audioKey: "lokum", spokenText: "lokum" }
        ]
    },
    {
        id: 10,
        question: "Tatlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Tatlı olan hangisi?', correct: 'Evet! Lokum tatlıdır.', wrong: 'Hayır, hardal acıdır.' }
        },
        options: [
            { id: 3506, word: "lokum", imageUrl: "/images/3506.webp", isCorrect: true, audioKey: "lokum", spokenText: "lokum" },
            { id: 4108, word: "hardal", imageUrl: "/images/4108.webp", isCorrect: false, audioKey: "hardal", spokenText: "hardal" }
        ]
    },
    // limon_pasta
    {
        id: 11,
        question: "Ekşi olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Ekşi olan hangisi?', correct: 'Evet! Limon ekşidir.', wrong: 'Hayır, pasta tatlıdır.' }
        },
        options: [
            { id: 4109, word: "limon", imageUrl: "/images/4109.webp", isCorrect: true, audioKey: "limon", spokenText: "limon" },
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: false, audioKey: "pasta", spokenText: "pasta" }
        ]
    },
    {
        id: 12,
        question: "Tatlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Tatlı olan hangisi?', correct: 'Evet! Pasta tatlıdır.', wrong: 'Hayır, limon ekşidir.' }
        },
        options: [
            { id: 2816, word: "pasta", imageUrl: "/images/2816.webp", isCorrect: true, audioKey: "pasta", spokenText: "pasta" },
            { id: 4109, word: "limon", imageUrl: "/images/4109.webp", isCorrect: false, audioKey: "limon", spokenText: "limon" }
        ]
    },
    // sivribiber_muz
    {
        id: 13,
        question: "Acı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Acı olan hangisi?', correct: 'Evet! Sivri biber acıdır.', wrong: 'Hayır, muz tatlıdır.' }
        },
        options: [
            { id: 4110, word: "sivri biber", imageUrl: "/images/4110.webp", isCorrect: true, audioKey: "sivri biber", spokenText: "sivri biber" },
            { id: 3508, word: "muz", imageUrl: "/images/3508.webp", isCorrect: false, audioKey: "muz", spokenText: "muz" }
        ]
    },
    {
        id: 14,
        question: "Tatlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Tatlı olan hangisi?', correct: 'Evet! Muz tatlıdır.', wrong: 'Hayır, sivri biber acıdır.' }
        },
        options: [
            { id: 3508, word: "muz", imageUrl: "/images/3508.webp", isCorrect: true, audioKey: "muz", spokenText: "muz" },
            { id: 4110, word: "sivri biber", imageUrl: "/images/4110.webp", isCorrect: false, audioKey: "sivri biber", spokenText: "sivri biber" }
        ]
    },
    // sogan_cikolata
    {
        id: 15,
        question: "Acı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Acı olan hangisi?', correct: 'Evet! Soğan acıdır.', wrong: 'Hayır, çikolata tatlıdır.' }
        },
        options: [
            { id: 4111, word: "soğan", imageUrl: "/images/4111.webp", isCorrect: true, audioKey: "soğan", spokenText: "soğan" },
            { id: 4112, word: "çikolata", imageUrl: "/images/4112.webp", isCorrect: false, audioKey: "çikolata", spokenText: "çikolata" }
        ]
    },
    {
        id: 16,
        question: "Tatlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Tatlı olan hangisi?', correct: 'Evet! Çikolata tatlıdır.', wrong: 'Hayır, soğan acıdır.' }
        },
        options: [
            { id: 4112, word: "çikolata", imageUrl: "/images/4112.webp", isCorrect: true, audioKey: "çikolata", spokenText: "çikolata" },
            { id: 4111, word: "soğan", imageUrl: "/images/4111.webp", isCorrect: false, audioKey: "soğan", spokenText: "soğan" }
        ]
    },
    // turp_karpuz
    {
        id: 17,
        question: "Acı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Acı olan hangisi?', correct: 'Evet! Turp acıdır.', wrong: 'Hayır, karpuz tatlıdır.' }
        },
        options: [
            { id: 4113, word: "turp", imageUrl: "/images/4113.webp", isCorrect: true, audioKey: "turp", spokenText: "turp" },
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" }
        ]
    },
    {
        id: 18,
        question: "Tatlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Tatlı olan hangisi?', correct: 'Evet! Karpuz tatlıdır.', wrong: 'Hayır, turp acıdır.' }
        },
        options: [
            { id: 2810, word: "karpuz", imageUrl: "/images/2810.webp", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 4113, word: "turp", imageUrl: "/images/4113.webp", isCorrect: false, audioKey: "turp", spokenText: "turp" }
        ]
    },
    // tursu_seker
    {
        id: 19,
        question: "Ekşi olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Ekşi olan hangisi?', correct: 'Evet! Turşu ekşidir.', wrong: 'Hayır, şeker tatlıdır.' }
        },
        options: [
            { id: 4114, word: "turşu", imageUrl: "/images/4114.webp", isCorrect: true, audioKey: "turşu", spokenText: "turşu" },
            { id: 4115, word: "şeker", imageUrl: "/images/4115.webp", isCorrect: false, audioKey: "şeker", spokenText: "şeker" }
        ]
    },
    {
        id: 20,
        question: "Tatlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.BitterSweet,
        speech: {
            tr: { question: 'Tatlı olan hangisi?', correct: 'Evet! Şeker tatlıdır.', wrong: 'Hayır, turşu ekşidir.' }
        },
        options: [
            { id: 4115, word: "şeker", imageUrl: "/images/4115.webp", isCorrect: true, audioKey: "şeker", spokenText: "şeker" },
            { id: 4114, word: "turşu", imageUrl: "/images/4114.webp", isCorrect: false, audioKey: "turşu", spokenText: "turşu" }
        ]
    },
];
