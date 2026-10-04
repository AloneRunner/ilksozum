// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (tehlikeli-guvenli). Elle düzenleme.
// 7 çift, 14 soru. Görseller: gorsel-ham/tehlikeli-guvenli/ → id 6851-6864.
import { ConceptRound, ActivityType } from '../../../../types';

export const tehlikeliGuvenliDataYeni: ConceptRound[] = [
    // bicak_kasik
    {
        id: 1,
        question: "Hangisi tehlikeli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi tehlikeli?', correct: 'Evet! Bıçak tehlikelidir.', wrong: 'Hayır, kaşık güvenlidir.' }
        },
        options: [
            { id: 6852, word: "bıçak", imageUrl: "/images/6852.webp", isCorrect: true, audioKey: "bıçak", spokenText: "bıçak" },
            { id: 6851, word: "kaşık", imageUrl: "/images/6851.webp", isCorrect: false, audioKey: "kaşık", spokenText: "kaşık" }
        ]
    },
    {
        id: 2,
        question: "Hangisi güvenli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi güvenli?', correct: 'Evet! Kaşık güvenlidir.', wrong: 'Hayır, bıçak tehlikelidir.' }
        },
        options: [
            { id: 6851, word: "kaşık", imageUrl: "/images/6851.webp", isCorrect: true, audioKey: "kaşık", spokenText: "kaşık" },
            { id: 6852, word: "bıçak", imageUrl: "/images/6852.webp", isCorrect: false, audioKey: "bıçak", spokenText: "bıçak" }
        ]
    },
    // kibrit_boya
    {
        id: 3,
        question: "Hangisi tehlikeli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi tehlikeli?', correct: 'Evet! Yanan kibrit tehlikelidir.', wrong: 'Hayır, pastel boya güvenlidir.' }
        },
        options: [
            { id: 6854, word: "yanan kibrit", imageUrl: "/images/6854.webp", isCorrect: true, audioKey: "yanan kibrit", spokenText: "yanan kibrit" },
            { id: 6853, word: "pastel boya", imageUrl: "/images/6853.webp", isCorrect: false, audioKey: "pastel boya", spokenText: "pastel boya" }
        ]
    },
    {
        id: 4,
        question: "Hangisi güvenli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi güvenli?', correct: 'Evet! Pastel boya güvenlidir.', wrong: 'Hayır, yanan kibrit tehlikelidir.' }
        },
        options: [
            { id: 6853, word: "pastel boya", imageUrl: "/images/6853.webp", isCorrect: true, audioKey: "pastel boya", spokenText: "pastel boya" },
            { id: 6854, word: "yanan kibrit", imageUrl: "/images/6854.webp", isCorrect: false, audioKey: "yanan kibrit", spokenText: "yanan kibrit" }
        ]
    },
    // kirikbardak_bardak
    {
        id: 5,
        question: "Hangisi tehlikeli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi tehlikeli?', correct: 'Evet! Kırık bardak tehlikelidir.', wrong: 'Hayır, plastik bardak güvenlidir.' }
        },
        options: [
            { id: 6856, word: "kırık bardak", imageUrl: "/images/6856.webp", isCorrect: true, audioKey: "kırık bardak", spokenText: "kırık bardak" },
            { id: 6855, word: "plastik bardak", imageUrl: "/images/6855.webp", isCorrect: false, audioKey: "plastik bardak", spokenText: "plastik bardak" }
        ]
    },
    {
        id: 6,
        question: "Hangisi güvenli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi güvenli?', correct: 'Evet! Plastik bardak güvenlidir.', wrong: 'Hayır, kırık bardak tehlikelidir.' }
        },
        options: [
            { id: 6855, word: "plastik bardak", imageUrl: "/images/6855.webp", isCorrect: true, audioKey: "plastik bardak", spokenText: "plastik bardak" },
            { id: 6856, word: "kırık bardak", imageUrl: "/images/6856.webp", isCorrect: false, audioKey: "kırık bardak", spokenText: "kırık bardak" }
        ]
    },
    // makas_ayi
    {
        id: 7,
        question: "Hangisi tehlikeli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi tehlikeli?', correct: 'Evet! Makas tehlikelidir.', wrong: 'Hayır, oyuncak ayı güvenlidir.' }
        },
        options: [
            { id: 6858, word: "makas", imageUrl: "/images/6858.webp", isCorrect: true, audioKey: "makas", spokenText: "makas" },
            { id: 6857, word: "oyuncak ayı", imageUrl: "/images/6857.webp", isCorrect: false, audioKey: "oyuncak ayı", spokenText: "oyuncak ayı" }
        ]
    },
    {
        id: 8,
        question: "Hangisi güvenli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi güvenli?', correct: 'Evet! Oyuncak ayı güvenlidir.', wrong: 'Hayır, makas tehlikelidir.' }
        },
        options: [
            { id: 6857, word: "oyuncak ayı", imageUrl: "/images/6857.webp", isCorrect: true, audioKey: "oyuncak ayı", spokenText: "oyuncak ayı" },
            { id: 6858, word: "makas", imageUrl: "/images/6858.webp", isCorrect: false, audioKey: "makas", spokenText: "makas" }
        ]
    },
    // priz_blok
    {
        id: 9,
        question: "Hangisi tehlikeli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi tehlikeli?', correct: 'Evet! Priz tehlikelidir.', wrong: 'Hayır, oyuncak blok güvenlidir.' }
        },
        options: [
            { id: 6860, word: "priz", imageUrl: "/images/6860.webp", isCorrect: true, audioKey: "priz", spokenText: "priz" },
            { id: 6859, word: "oyuncak blok", imageUrl: "/images/6859.webp", isCorrect: false, audioKey: "oyuncak blok", spokenText: "oyuncak blok" }
        ]
    },
    {
        id: 10,
        question: "Hangisi güvenli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi güvenli?', correct: 'Evet! Oyuncak blok güvenlidir.', wrong: 'Hayır, priz tehlikelidir.' }
        },
        options: [
            { id: 6859, word: "oyuncak blok", imageUrl: "/images/6859.webp", isCorrect: true, audioKey: "oyuncak blok", spokenText: "oyuncak blok" },
            { id: 6860, word: "priz", imageUrl: "/images/6860.webp", isCorrect: false, audioKey: "priz", spokenText: "priz" }
        ]
    },
    // tencere_oyuncak
    {
        id: 11,
        question: "Hangisi tehlikeli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi tehlikeli?', correct: 'Evet! Kaynayan tencere tehlikelidir.', wrong: 'Hayır, oyuncak tencere güvenlidir.' }
        },
        options: [
            { id: 6862, word: "kaynayan tencere", imageUrl: "/images/6862.webp", isCorrect: true, audioKey: "kaynayan tencere", spokenText: "kaynayan tencere" },
            { id: 6861, word: "oyuncak tencere", imageUrl: "/images/6861.webp", isCorrect: false, audioKey: "oyuncak tencere", spokenText: "oyuncak tencere" }
        ]
    },
    {
        id: 12,
        question: "Hangisi güvenli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi güvenli?', correct: 'Evet! Oyuncak tencere güvenlidir.', wrong: 'Hayır, kaynayan tencere tehlikelidir.' }
        },
        options: [
            { id: 6861, word: "oyuncak tencere", imageUrl: "/images/6861.webp", isCorrect: true, audioKey: "oyuncak tencere", spokenText: "oyuncak tencere" },
            { id: 6862, word: "kaynayan tencere", imageUrl: "/images/6862.webp", isCorrect: false, audioKey: "kaynayan tencere", spokenText: "kaynayan tencere" }
        ]
    },
    // utu_yastik
    {
        id: 13,
        question: "Hangisi tehlikeli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi tehlikeli?', correct: 'Evet! Sıcak ütü tehlikelidir.', wrong: 'Hayır, yastık güvenlidir.' }
        },
        options: [
            { id: 6864, word: "sıcak ütü", imageUrl: "/images/6864.webp", isCorrect: true, audioKey: "sıcak ütü", spokenText: "sıcak ütü" },
            { id: 6863, word: "yastık", imageUrl: "/images/6863.webp", isCorrect: false, audioKey: "yastık", spokenText: "yastık" }
        ]
    },
    {
        id: 14,
        question: "Hangisi güvenli?",
        questionAudioKey: "",
        activityType: ActivityType.TehlikeliGuvenli,
        speech: {
            tr: { question: 'Hangisi güvenli?', correct: 'Evet! Yastık güvenlidir.', wrong: 'Hayır, sıcak ütü tehlikelidir.' }
        },
        options: [
            { id: 6863, word: "yastık", imageUrl: "/images/6863.webp", isCorrect: true, audioKey: "yastık", spokenText: "yastık" },
            { id: 6864, word: "sıcak ütü", imageUrl: "/images/6864.webp", isCorrect: false, audioKey: "sıcak ütü", spokenText: "sıcak ütü" }
        ]
    },
];
