// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (renkler). Elle düzenleme.
// 88 çift, 176 soru. Görseller: gorsel-ham/renkler/ → id 7101-7177.
import { ConceptRound, ActivityType } from '../../../../types';

export const colorsDataYeni: ConceptRound[] = [
    // araba
    {
        id: 1,
        question: "Hangi araba kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba kırmızı?', correct: 'Evet! Bu araba kırmızı.', wrong: 'Hayır, bu araba mavi.' }
        },
        options: [
            { id: 7101, word: "araba", imageUrl: "/images/7101.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7102, word: "araba", imageUrl: "/images/7102.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 2,
        question: "Hangi araba mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba mavi?', correct: 'Evet! Bu araba mavi.', wrong: 'Hayır, bu araba kırmızı.' }
        },
        options: [
            { id: 7102, word: "araba", imageUrl: "/images/7102.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7101, word: "araba", imageUrl: "/images/7101.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 3,
        question: "Hangi araba sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba sarı?', correct: 'Evet! Bu araba sarı.', wrong: 'Hayır, bu araba mor.' }
        },
        options: [
            { id: 7105, word: "araba", imageUrl: "/images/7105.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7103, word: "araba", imageUrl: "/images/7103.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 4,
        question: "Hangi araba mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba mor?', correct: 'Evet! Bu araba mor.', wrong: 'Hayır, bu araba sarı.' }
        },
        options: [
            { id: 7103, word: "araba", imageUrl: "/images/7103.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7105, word: "araba", imageUrl: "/images/7105.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 5,
        question: "Hangi araba yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba yeşil?', correct: 'Evet! Bu araba yeşil.', wrong: 'Hayır, bu araba turuncu.' }
        },
        options: [
            { id: 7107, word: "araba", imageUrl: "/images/7107.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7106, word: "araba", imageUrl: "/images/7106.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 6,
        question: "Hangi araba turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba turuncu?', correct: 'Evet! Bu araba turuncu.', wrong: 'Hayır, bu araba yeşil.' }
        },
        options: [
            { id: 7106, word: "araba", imageUrl: "/images/7106.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7107, word: "araba", imageUrl: "/images/7107.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 7,
        question: "Hangi araba pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba pembe?', correct: 'Evet! Bu araba pembe.', wrong: 'Hayır, bu araba mavi.' }
        },
        options: [
            { id: 7104, word: "araba", imageUrl: "/images/7104.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7102, word: "araba", imageUrl: "/images/7102.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 8,
        question: "Hangi araba mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba mavi?', correct: 'Evet! Bu araba mavi.', wrong: 'Hayır, bu araba pembe.' }
        },
        options: [
            { id: 7102, word: "araba", imageUrl: "/images/7102.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7104, word: "araba", imageUrl: "/images/7104.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 9,
        question: "Hangi araba kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba kırmızı?', correct: 'Evet! Bu araba kırmızı.', wrong: 'Hayır, bu araba yeşil.' }
        },
        options: [
            { id: 7101, word: "araba", imageUrl: "/images/7101.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7107, word: "araba", imageUrl: "/images/7107.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 10,
        question: "Hangi araba yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba yeşil?', correct: 'Evet! Bu araba yeşil.', wrong: 'Hayır, bu araba kırmızı.' }
        },
        options: [
            { id: 7107, word: "araba", imageUrl: "/images/7107.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7101, word: "araba", imageUrl: "/images/7101.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 11,
        question: "Hangi araba sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba sarı?', correct: 'Evet! Bu araba sarı.', wrong: 'Hayır, bu araba mavi.' }
        },
        options: [
            { id: 7105, word: "araba", imageUrl: "/images/7105.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7102, word: "araba", imageUrl: "/images/7102.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 12,
        question: "Hangi araba mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba mavi?', correct: 'Evet! Bu araba mavi.', wrong: 'Hayır, bu araba sarı.' }
        },
        options: [
            { id: 7102, word: "araba", imageUrl: "/images/7102.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7105, word: "araba", imageUrl: "/images/7105.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 13,
        question: "Hangi araba turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba turuncu?', correct: 'Evet! Bu araba turuncu.', wrong: 'Hayır, bu araba mor.' }
        },
        options: [
            { id: 7106, word: "araba", imageUrl: "/images/7106.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7103, word: "araba", imageUrl: "/images/7103.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 14,
        question: "Hangi araba mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba mor?', correct: 'Evet! Bu araba mor.', wrong: 'Hayır, bu araba turuncu.' }
        },
        options: [
            { id: 7103, word: "araba", imageUrl: "/images/7103.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7106, word: "araba", imageUrl: "/images/7106.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 15,
        question: "Hangi araba pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba pembe?', correct: 'Evet! Bu araba pembe.', wrong: 'Hayır, bu araba yeşil.' }
        },
        options: [
            { id: 7104, word: "araba", imageUrl: "/images/7104.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7107, word: "araba", imageUrl: "/images/7107.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 16,
        question: "Hangi araba yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi araba yeşil?', correct: 'Evet! Bu araba yeşil.', wrong: 'Hayır, bu araba pembe.' }
        },
        options: [
            { id: 7107, word: "araba", imageUrl: "/images/7107.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 7104, word: "araba", imageUrl: "/images/7104.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // balon
    {
        id: 17,
        question: "Hangi balon kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon kırmızı?', correct: 'Evet! Bu balon kırmızı.', wrong: 'Hayır, bu balon mavi.' }
        },
        options: [
            { id: 7108, word: "balon", imageUrl: "/images/7108.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7109, word: "balon", imageUrl: "/images/7109.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 18,
        question: "Hangi balon mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon mavi?', correct: 'Evet! Bu balon mavi.', wrong: 'Hayır, bu balon kırmızı.' }
        },
        options: [
            { id: 7109, word: "balon", imageUrl: "/images/7109.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7108, word: "balon", imageUrl: "/images/7108.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 19,
        question: "Hangi balon sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon sarı?', correct: 'Evet! Bu balon sarı.', wrong: 'Hayır, bu balon mor.' }
        },
        options: [
            { id: 7112, word: "balon", imageUrl: "/images/7112.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7110, word: "balon", imageUrl: "/images/7110.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 20,
        question: "Hangi balon mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon mor?', correct: 'Evet! Bu balon mor.', wrong: 'Hayır, bu balon sarı.' }
        },
        options: [
            { id: 7110, word: "balon", imageUrl: "/images/7110.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7112, word: "balon", imageUrl: "/images/7112.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 21,
        question: "Hangi balon yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon yeşil?', correct: 'Evet! Bu balon yeşil.', wrong: 'Hayır, bu balon turuncu.' }
        },
        options: [
            { id: 7114, word: "balon", imageUrl: "/images/7114.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7113, word: "balon", imageUrl: "/images/7113.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 22,
        question: "Hangi balon turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon turuncu?', correct: 'Evet! Bu balon turuncu.', wrong: 'Hayır, bu balon yeşil.' }
        },
        options: [
            { id: 7113, word: "balon", imageUrl: "/images/7113.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7114, word: "balon", imageUrl: "/images/7114.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 23,
        question: "Hangi balon pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon pembe?', correct: 'Evet! Bu balon pembe.', wrong: 'Hayır, bu balon mavi.' }
        },
        options: [
            { id: 7111, word: "balon", imageUrl: "/images/7111.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7109, word: "balon", imageUrl: "/images/7109.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 24,
        question: "Hangi balon mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon mavi?', correct: 'Evet! Bu balon mavi.', wrong: 'Hayır, bu balon pembe.' }
        },
        options: [
            { id: 7109, word: "balon", imageUrl: "/images/7109.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7111, word: "balon", imageUrl: "/images/7111.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 25,
        question: "Hangi balon kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon kırmızı?', correct: 'Evet! Bu balon kırmızı.', wrong: 'Hayır, bu balon yeşil.' }
        },
        options: [
            { id: 7108, word: "balon", imageUrl: "/images/7108.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7114, word: "balon", imageUrl: "/images/7114.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 26,
        question: "Hangi balon yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon yeşil?', correct: 'Evet! Bu balon yeşil.', wrong: 'Hayır, bu balon kırmızı.' }
        },
        options: [
            { id: 7114, word: "balon", imageUrl: "/images/7114.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7108, word: "balon", imageUrl: "/images/7108.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 27,
        question: "Hangi balon sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon sarı?', correct: 'Evet! Bu balon sarı.', wrong: 'Hayır, bu balon mavi.' }
        },
        options: [
            { id: 7112, word: "balon", imageUrl: "/images/7112.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7109, word: "balon", imageUrl: "/images/7109.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 28,
        question: "Hangi balon mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon mavi?', correct: 'Evet! Bu balon mavi.', wrong: 'Hayır, bu balon sarı.' }
        },
        options: [
            { id: 7109, word: "balon", imageUrl: "/images/7109.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7112, word: "balon", imageUrl: "/images/7112.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 29,
        question: "Hangi balon turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon turuncu?', correct: 'Evet! Bu balon turuncu.', wrong: 'Hayır, bu balon mor.' }
        },
        options: [
            { id: 7113, word: "balon", imageUrl: "/images/7113.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7110, word: "balon", imageUrl: "/images/7110.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 30,
        question: "Hangi balon mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon mor?', correct: 'Evet! Bu balon mor.', wrong: 'Hayır, bu balon turuncu.' }
        },
        options: [
            { id: 7110, word: "balon", imageUrl: "/images/7110.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7113, word: "balon", imageUrl: "/images/7113.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 31,
        question: "Hangi balon pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon pembe?', correct: 'Evet! Bu balon pembe.', wrong: 'Hayır, bu balon yeşil.' }
        },
        options: [
            { id: 7111, word: "balon", imageUrl: "/images/7111.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7114, word: "balon", imageUrl: "/images/7114.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 32,
        question: "Hangi balon yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi balon yeşil?', correct: 'Evet! Bu balon yeşil.', wrong: 'Hayır, bu balon pembe.' }
        },
        options: [
            { id: 7114, word: "balon", imageUrl: "/images/7114.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 7111, word: "balon", imageUrl: "/images/7111.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    // çanta
    {
        id: 33,
        question: "Hangi çanta kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta kırmızı?', correct: 'Evet! Bu çanta kırmızı.', wrong: 'Hayır, bu çanta mavi.' }
        },
        options: [
            { id: 7115, word: "çanta", imageUrl: "/images/7115.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7116, word: "çanta", imageUrl: "/images/7116.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 34,
        question: "Hangi çanta mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta mavi?', correct: 'Evet! Bu çanta mavi.', wrong: 'Hayır, bu çanta kırmızı.' }
        },
        options: [
            { id: 7116, word: "çanta", imageUrl: "/images/7116.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7115, word: "çanta", imageUrl: "/images/7115.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 35,
        question: "Hangi çanta sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta sarı?', correct: 'Evet! Bu çanta sarı.', wrong: 'Hayır, bu çanta mor.' }
        },
        options: [
            { id: 7119, word: "çanta", imageUrl: "/images/7119.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7117, word: "çanta", imageUrl: "/images/7117.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 36,
        question: "Hangi çanta mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta mor?', correct: 'Evet! Bu çanta mor.', wrong: 'Hayır, bu çanta sarı.' }
        },
        options: [
            { id: 7117, word: "çanta", imageUrl: "/images/7117.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7119, word: "çanta", imageUrl: "/images/7119.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 37,
        question: "Hangi çanta yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta yeşil?', correct: 'Evet! Bu çanta yeşil.', wrong: 'Hayır, bu çanta turuncu.' }
        },
        options: [
            { id: 7121, word: "çanta", imageUrl: "/images/7121.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7120, word: "çanta", imageUrl: "/images/7120.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 38,
        question: "Hangi çanta turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta turuncu?', correct: 'Evet! Bu çanta turuncu.', wrong: 'Hayır, bu çanta yeşil.' }
        },
        options: [
            { id: 7120, word: "çanta", imageUrl: "/images/7120.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7121, word: "çanta", imageUrl: "/images/7121.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 39,
        question: "Hangi çanta pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta pembe?', correct: 'Evet! Bu çanta pembe.', wrong: 'Hayır, bu çanta mavi.' }
        },
        options: [
            { id: 7118, word: "çanta", imageUrl: "/images/7118.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7116, word: "çanta", imageUrl: "/images/7116.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 40,
        question: "Hangi çanta mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta mavi?', correct: 'Evet! Bu çanta mavi.', wrong: 'Hayır, bu çanta pembe.' }
        },
        options: [
            { id: 7116, word: "çanta", imageUrl: "/images/7116.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7118, word: "çanta", imageUrl: "/images/7118.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 41,
        question: "Hangi çanta kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta kırmızı?', correct: 'Evet! Bu çanta kırmızı.', wrong: 'Hayır, bu çanta yeşil.' }
        },
        options: [
            { id: 7115, word: "çanta", imageUrl: "/images/7115.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7121, word: "çanta", imageUrl: "/images/7121.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 42,
        question: "Hangi çanta yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta yeşil?', correct: 'Evet! Bu çanta yeşil.', wrong: 'Hayır, bu çanta kırmızı.' }
        },
        options: [
            { id: 7121, word: "çanta", imageUrl: "/images/7121.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7115, word: "çanta", imageUrl: "/images/7115.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 43,
        question: "Hangi çanta sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta sarı?', correct: 'Evet! Bu çanta sarı.', wrong: 'Hayır, bu çanta mavi.' }
        },
        options: [
            { id: 7119, word: "çanta", imageUrl: "/images/7119.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7116, word: "çanta", imageUrl: "/images/7116.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 44,
        question: "Hangi çanta mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta mavi?', correct: 'Evet! Bu çanta mavi.', wrong: 'Hayır, bu çanta sarı.' }
        },
        options: [
            { id: 7116, word: "çanta", imageUrl: "/images/7116.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7119, word: "çanta", imageUrl: "/images/7119.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 45,
        question: "Hangi çanta turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta turuncu?', correct: 'Evet! Bu çanta turuncu.', wrong: 'Hayır, bu çanta mor.' }
        },
        options: [
            { id: 7120, word: "çanta", imageUrl: "/images/7120.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7117, word: "çanta", imageUrl: "/images/7117.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 46,
        question: "Hangi çanta mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta mor?', correct: 'Evet! Bu çanta mor.', wrong: 'Hayır, bu çanta turuncu.' }
        },
        options: [
            { id: 7117, word: "çanta", imageUrl: "/images/7117.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7120, word: "çanta", imageUrl: "/images/7120.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 47,
        question: "Hangi çanta pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta pembe?', correct: 'Evet! Bu çanta pembe.', wrong: 'Hayır, bu çanta yeşil.' }
        },
        options: [
            { id: 7118, word: "çanta", imageUrl: "/images/7118.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7121, word: "çanta", imageUrl: "/images/7121.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 48,
        question: "Hangi çanta yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çanta yeşil?', correct: 'Evet! Bu çanta yeşil.', wrong: 'Hayır, bu çanta pembe.' }
        },
        options: [
            { id: 7121, word: "çanta", imageUrl: "/images/7121.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 7118, word: "çanta", imageUrl: "/images/7118.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    // çizme
    {
        id: 49,
        question: "Hangi çizme kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme kırmızı?', correct: 'Evet! Bu çizme kırmızı.', wrong: 'Hayır, bu çizme mavi.' }
        },
        options: [
            { id: 7122, word: "çizme", imageUrl: "/images/7122.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7123, word: "çizme", imageUrl: "/images/7123.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 50,
        question: "Hangi çizme mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme mavi?', correct: 'Evet! Bu çizme mavi.', wrong: 'Hayır, bu çizme kırmızı.' }
        },
        options: [
            { id: 7123, word: "çizme", imageUrl: "/images/7123.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7122, word: "çizme", imageUrl: "/images/7122.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 51,
        question: "Hangi çizme sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme sarı?', correct: 'Evet! Bu çizme sarı.', wrong: 'Hayır, bu çizme mor.' }
        },
        options: [
            { id: 7126, word: "çizme", imageUrl: "/images/7126.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7124, word: "çizme", imageUrl: "/images/7124.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 52,
        question: "Hangi çizme mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme mor?', correct: 'Evet! Bu çizme mor.', wrong: 'Hayır, bu çizme sarı.' }
        },
        options: [
            { id: 7124, word: "çizme", imageUrl: "/images/7124.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7126, word: "çizme", imageUrl: "/images/7126.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 53,
        question: "Hangi çizme yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme yeşil?', correct: 'Evet! Bu çizme yeşil.', wrong: 'Hayır, bu çizme turuncu.' }
        },
        options: [
            { id: 7128, word: "çizme", imageUrl: "/images/7128.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7127, word: "çizme", imageUrl: "/images/7127.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 54,
        question: "Hangi çizme turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme turuncu?', correct: 'Evet! Bu çizme turuncu.', wrong: 'Hayır, bu çizme yeşil.' }
        },
        options: [
            { id: 7127, word: "çizme", imageUrl: "/images/7127.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7128, word: "çizme", imageUrl: "/images/7128.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 55,
        question: "Hangi çizme pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme pembe?', correct: 'Evet! Bu çizme pembe.', wrong: 'Hayır, bu çizme mavi.' }
        },
        options: [
            { id: 7125, word: "çizme", imageUrl: "/images/7125.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7123, word: "çizme", imageUrl: "/images/7123.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 56,
        question: "Hangi çizme mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme mavi?', correct: 'Evet! Bu çizme mavi.', wrong: 'Hayır, bu çizme pembe.' }
        },
        options: [
            { id: 7123, word: "çizme", imageUrl: "/images/7123.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7125, word: "çizme", imageUrl: "/images/7125.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 57,
        question: "Hangi çizme kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme kırmızı?', correct: 'Evet! Bu çizme kırmızı.', wrong: 'Hayır, bu çizme yeşil.' }
        },
        options: [
            { id: 7122, word: "çizme", imageUrl: "/images/7122.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7128, word: "çizme", imageUrl: "/images/7128.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 58,
        question: "Hangi çizme yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme yeşil?', correct: 'Evet! Bu çizme yeşil.', wrong: 'Hayır, bu çizme kırmızı.' }
        },
        options: [
            { id: 7128, word: "çizme", imageUrl: "/images/7128.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7122, word: "çizme", imageUrl: "/images/7122.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 59,
        question: "Hangi çizme sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme sarı?', correct: 'Evet! Bu çizme sarı.', wrong: 'Hayır, bu çizme mavi.' }
        },
        options: [
            { id: 7126, word: "çizme", imageUrl: "/images/7126.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7123, word: "çizme", imageUrl: "/images/7123.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 60,
        question: "Hangi çizme mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme mavi?', correct: 'Evet! Bu çizme mavi.', wrong: 'Hayır, bu çizme sarı.' }
        },
        options: [
            { id: 7123, word: "çizme", imageUrl: "/images/7123.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7126, word: "çizme", imageUrl: "/images/7126.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 61,
        question: "Hangi çizme turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme turuncu?', correct: 'Evet! Bu çizme turuncu.', wrong: 'Hayır, bu çizme mor.' }
        },
        options: [
            { id: 7127, word: "çizme", imageUrl: "/images/7127.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7124, word: "çizme", imageUrl: "/images/7124.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 62,
        question: "Hangi çizme mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme mor?', correct: 'Evet! Bu çizme mor.', wrong: 'Hayır, bu çizme turuncu.' }
        },
        options: [
            { id: 7124, word: "çizme", imageUrl: "/images/7124.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7127, word: "çizme", imageUrl: "/images/7127.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 63,
        question: "Hangi çizme pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme pembe?', correct: 'Evet! Bu çizme pembe.', wrong: 'Hayır, bu çizme yeşil.' }
        },
        options: [
            { id: 7125, word: "çizme", imageUrl: "/images/7125.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7128, word: "çizme", imageUrl: "/images/7128.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 64,
        question: "Hangi çizme yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çizme yeşil?', correct: 'Evet! Bu çizme yeşil.', wrong: 'Hayır, bu çizme pembe.' }
        },
        options: [
            { id: 7128, word: "çizme", imageUrl: "/images/7128.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 7125, word: "çizme", imageUrl: "/images/7125.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    // elbise
    {
        id: 65,
        question: "Hangi elbise kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise kırmızı?', correct: 'Evet! Bu elbise kırmızı.', wrong: 'Hayır, bu elbise mavi.' }
        },
        options: [
            { id: 7129, word: "elbise", imageUrl: "/images/7129.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7130, word: "elbise", imageUrl: "/images/7130.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 66,
        question: "Hangi elbise mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise mavi?', correct: 'Evet! Bu elbise mavi.', wrong: 'Hayır, bu elbise kırmızı.' }
        },
        options: [
            { id: 7130, word: "elbise", imageUrl: "/images/7130.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7129, word: "elbise", imageUrl: "/images/7129.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 67,
        question: "Hangi elbise sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise sarı?', correct: 'Evet! Bu elbise sarı.', wrong: 'Hayır, bu elbise mor.' }
        },
        options: [
            { id: 7133, word: "elbise", imageUrl: "/images/7133.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7131, word: "elbise", imageUrl: "/images/7131.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 68,
        question: "Hangi elbise mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise mor?', correct: 'Evet! Bu elbise mor.', wrong: 'Hayır, bu elbise sarı.' }
        },
        options: [
            { id: 7131, word: "elbise", imageUrl: "/images/7131.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7133, word: "elbise", imageUrl: "/images/7133.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 69,
        question: "Hangi elbise yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise yeşil?', correct: 'Evet! Bu elbise yeşil.', wrong: 'Hayır, bu elbise turuncu.' }
        },
        options: [
            { id: 7135, word: "elbise", imageUrl: "/images/7135.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7134, word: "elbise", imageUrl: "/images/7134.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 70,
        question: "Hangi elbise turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise turuncu?', correct: 'Evet! Bu elbise turuncu.', wrong: 'Hayır, bu elbise yeşil.' }
        },
        options: [
            { id: 7134, word: "elbise", imageUrl: "/images/7134.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7135, word: "elbise", imageUrl: "/images/7135.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 71,
        question: "Hangi elbise pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise pembe?', correct: 'Evet! Bu elbise pembe.', wrong: 'Hayır, bu elbise mavi.' }
        },
        options: [
            { id: 7132, word: "elbise", imageUrl: "/images/7132.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7130, word: "elbise", imageUrl: "/images/7130.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 72,
        question: "Hangi elbise mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise mavi?', correct: 'Evet! Bu elbise mavi.', wrong: 'Hayır, bu elbise pembe.' }
        },
        options: [
            { id: 7130, word: "elbise", imageUrl: "/images/7130.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7132, word: "elbise", imageUrl: "/images/7132.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 73,
        question: "Hangi elbise kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise kırmızı?', correct: 'Evet! Bu elbise kırmızı.', wrong: 'Hayır, bu elbise yeşil.' }
        },
        options: [
            { id: 7129, word: "elbise", imageUrl: "/images/7129.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7135, word: "elbise", imageUrl: "/images/7135.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 74,
        question: "Hangi elbise yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise yeşil?', correct: 'Evet! Bu elbise yeşil.', wrong: 'Hayır, bu elbise kırmızı.' }
        },
        options: [
            { id: 7135, word: "elbise", imageUrl: "/images/7135.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7129, word: "elbise", imageUrl: "/images/7129.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 75,
        question: "Hangi elbise sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise sarı?', correct: 'Evet! Bu elbise sarı.', wrong: 'Hayır, bu elbise mavi.' }
        },
        options: [
            { id: 7133, word: "elbise", imageUrl: "/images/7133.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7130, word: "elbise", imageUrl: "/images/7130.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 76,
        question: "Hangi elbise mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise mavi?', correct: 'Evet! Bu elbise mavi.', wrong: 'Hayır, bu elbise sarı.' }
        },
        options: [
            { id: 7130, word: "elbise", imageUrl: "/images/7130.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7133, word: "elbise", imageUrl: "/images/7133.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 77,
        question: "Hangi elbise turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise turuncu?', correct: 'Evet! Bu elbise turuncu.', wrong: 'Hayır, bu elbise mor.' }
        },
        options: [
            { id: 7134, word: "elbise", imageUrl: "/images/7134.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7131, word: "elbise", imageUrl: "/images/7131.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 78,
        question: "Hangi elbise mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise mor?', correct: 'Evet! Bu elbise mor.', wrong: 'Hayır, bu elbise turuncu.' }
        },
        options: [
            { id: 7131, word: "elbise", imageUrl: "/images/7131.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7134, word: "elbise", imageUrl: "/images/7134.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 79,
        question: "Hangi elbise pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise pembe?', correct: 'Evet! Bu elbise pembe.', wrong: 'Hayır, bu elbise yeşil.' }
        },
        options: [
            { id: 7132, word: "elbise", imageUrl: "/images/7132.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7135, word: "elbise", imageUrl: "/images/7135.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 80,
        question: "Hangi elbise yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi elbise yeşil?', correct: 'Evet! Bu elbise yeşil.', wrong: 'Hayır, bu elbise pembe.' }
        },
        options: [
            { id: 7135, word: "elbise", imageUrl: "/images/7135.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 7132, word: "elbise", imageUrl: "/images/7132.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    // çöp kovası
    {
        id: 81,
        question: "Hangi çöp kovası kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası kırmızı?', correct: 'Evet! Bu çöp kovası kırmızı.', wrong: 'Hayır, bu çöp kovası mavi.' }
        },
        options: [
            { id: 7136, word: "çöp kovası", imageUrl: "/images/7136.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7137, word: "çöp kovası", imageUrl: "/images/7137.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 82,
        question: "Hangi çöp kovası mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası mavi?', correct: 'Evet! Bu çöp kovası mavi.', wrong: 'Hayır, bu çöp kovası kırmızı.' }
        },
        options: [
            { id: 7137, word: "çöp kovası", imageUrl: "/images/7137.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7136, word: "çöp kovası", imageUrl: "/images/7136.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 83,
        question: "Hangi çöp kovası sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası sarı?', correct: 'Evet! Bu çöp kovası sarı.', wrong: 'Hayır, bu çöp kovası mor.' }
        },
        options: [
            { id: 7140, word: "çöp kovası", imageUrl: "/images/7140.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7138, word: "çöp kovası", imageUrl: "/images/7138.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 84,
        question: "Hangi çöp kovası mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası mor?', correct: 'Evet! Bu çöp kovası mor.', wrong: 'Hayır, bu çöp kovası sarı.' }
        },
        options: [
            { id: 7138, word: "çöp kovası", imageUrl: "/images/7138.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7140, word: "çöp kovası", imageUrl: "/images/7140.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 85,
        question: "Hangi çöp kovası yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası yeşil?', correct: 'Evet! Bu çöp kovası yeşil.', wrong: 'Hayır, bu çöp kovası turuncu.' }
        },
        options: [
            { id: 7142, word: "çöp kovası", imageUrl: "/images/7142.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7141, word: "çöp kovası", imageUrl: "/images/7141.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 86,
        question: "Hangi çöp kovası turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası turuncu?', correct: 'Evet! Bu çöp kovası turuncu.', wrong: 'Hayır, bu çöp kovası yeşil.' }
        },
        options: [
            { id: 7141, word: "çöp kovası", imageUrl: "/images/7141.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7142, word: "çöp kovası", imageUrl: "/images/7142.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 87,
        question: "Hangi çöp kovası pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası pembe?', correct: 'Evet! Bu çöp kovası pembe.', wrong: 'Hayır, bu çöp kovası mavi.' }
        },
        options: [
            { id: 7139, word: "çöp kovası", imageUrl: "/images/7139.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7137, word: "çöp kovası", imageUrl: "/images/7137.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 88,
        question: "Hangi çöp kovası mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası mavi?', correct: 'Evet! Bu çöp kovası mavi.', wrong: 'Hayır, bu çöp kovası pembe.' }
        },
        options: [
            { id: 7137, word: "çöp kovası", imageUrl: "/images/7137.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7139, word: "çöp kovası", imageUrl: "/images/7139.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 89,
        question: "Hangi çöp kovası kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası kırmızı?', correct: 'Evet! Bu çöp kovası kırmızı.', wrong: 'Hayır, bu çöp kovası yeşil.' }
        },
        options: [
            { id: 7136, word: "çöp kovası", imageUrl: "/images/7136.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7142, word: "çöp kovası", imageUrl: "/images/7142.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 90,
        question: "Hangi çöp kovası yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası yeşil?', correct: 'Evet! Bu çöp kovası yeşil.', wrong: 'Hayır, bu çöp kovası kırmızı.' }
        },
        options: [
            { id: 7142, word: "çöp kovası", imageUrl: "/images/7142.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7136, word: "çöp kovası", imageUrl: "/images/7136.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 91,
        question: "Hangi çöp kovası sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası sarı?', correct: 'Evet! Bu çöp kovası sarı.', wrong: 'Hayır, bu çöp kovası mavi.' }
        },
        options: [
            { id: 7140, word: "çöp kovası", imageUrl: "/images/7140.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7137, word: "çöp kovası", imageUrl: "/images/7137.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 92,
        question: "Hangi çöp kovası mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası mavi?', correct: 'Evet! Bu çöp kovası mavi.', wrong: 'Hayır, bu çöp kovası sarı.' }
        },
        options: [
            { id: 7137, word: "çöp kovası", imageUrl: "/images/7137.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7140, word: "çöp kovası", imageUrl: "/images/7140.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 93,
        question: "Hangi çöp kovası turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası turuncu?', correct: 'Evet! Bu çöp kovası turuncu.', wrong: 'Hayır, bu çöp kovası mor.' }
        },
        options: [
            { id: 7141, word: "çöp kovası", imageUrl: "/images/7141.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7138, word: "çöp kovası", imageUrl: "/images/7138.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 94,
        question: "Hangi çöp kovası mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası mor?', correct: 'Evet! Bu çöp kovası mor.', wrong: 'Hayır, bu çöp kovası turuncu.' }
        },
        options: [
            { id: 7138, word: "çöp kovası", imageUrl: "/images/7138.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7141, word: "çöp kovası", imageUrl: "/images/7141.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 95,
        question: "Hangi çöp kovası pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası pembe?', correct: 'Evet! Bu çöp kovası pembe.', wrong: 'Hayır, bu çöp kovası yeşil.' }
        },
        options: [
            { id: 7139, word: "çöp kovası", imageUrl: "/images/7139.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7142, word: "çöp kovası", imageUrl: "/images/7142.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 96,
        question: "Hangi çöp kovası yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi çöp kovası yeşil?', correct: 'Evet! Bu çöp kovası yeşil.', wrong: 'Hayır, bu çöp kovası pembe.' }
        },
        options: [
            { id: 7142, word: "çöp kovası", imageUrl: "/images/7142.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 7139, word: "çöp kovası", imageUrl: "/images/7139.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    // kupa
    {
        id: 97,
        question: "Hangi kupa kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa kırmızı?', correct: 'Evet! Bu kupa kırmızı.', wrong: 'Hayır, bu kupa mavi.' }
        },
        options: [
            { id: 7143, word: "kupa", imageUrl: "/images/7143.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7144, word: "kupa", imageUrl: "/images/7144.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 98,
        question: "Hangi kupa mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa mavi?', correct: 'Evet! Bu kupa mavi.', wrong: 'Hayır, bu kupa kırmızı.' }
        },
        options: [
            { id: 7144, word: "kupa", imageUrl: "/images/7144.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7143, word: "kupa", imageUrl: "/images/7143.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 99,
        question: "Hangi kupa sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa sarı?', correct: 'Evet! Bu kupa sarı.', wrong: 'Hayır, bu kupa mor.' }
        },
        options: [
            { id: 7147, word: "kupa", imageUrl: "/images/7147.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7145, word: "kupa", imageUrl: "/images/7145.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 100,
        question: "Hangi kupa mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa mor?', correct: 'Evet! Bu kupa mor.', wrong: 'Hayır, bu kupa sarı.' }
        },
        options: [
            { id: 7145, word: "kupa", imageUrl: "/images/7145.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7147, word: "kupa", imageUrl: "/images/7147.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 101,
        question: "Hangi kupa yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa yeşil?', correct: 'Evet! Bu kupa yeşil.', wrong: 'Hayır, bu kupa turuncu.' }
        },
        options: [
            { id: 7149, word: "kupa", imageUrl: "/images/7149.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7148, word: "kupa", imageUrl: "/images/7148.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 102,
        question: "Hangi kupa turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa turuncu?', correct: 'Evet! Bu kupa turuncu.', wrong: 'Hayır, bu kupa yeşil.' }
        },
        options: [
            { id: 7148, word: "kupa", imageUrl: "/images/7148.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7149, word: "kupa", imageUrl: "/images/7149.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 103,
        question: "Hangi kupa pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa pembe?', correct: 'Evet! Bu kupa pembe.', wrong: 'Hayır, bu kupa mavi.' }
        },
        options: [
            { id: 7146, word: "kupa", imageUrl: "/images/7146.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7144, word: "kupa", imageUrl: "/images/7144.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 104,
        question: "Hangi kupa mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa mavi?', correct: 'Evet! Bu kupa mavi.', wrong: 'Hayır, bu kupa pembe.' }
        },
        options: [
            { id: 7144, word: "kupa", imageUrl: "/images/7144.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7146, word: "kupa", imageUrl: "/images/7146.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 105,
        question: "Hangi kupa kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa kırmızı?', correct: 'Evet! Bu kupa kırmızı.', wrong: 'Hayır, bu kupa yeşil.' }
        },
        options: [
            { id: 7143, word: "kupa", imageUrl: "/images/7143.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7149, word: "kupa", imageUrl: "/images/7149.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 106,
        question: "Hangi kupa yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa yeşil?', correct: 'Evet! Bu kupa yeşil.', wrong: 'Hayır, bu kupa kırmızı.' }
        },
        options: [
            { id: 7149, word: "kupa", imageUrl: "/images/7149.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7143, word: "kupa", imageUrl: "/images/7143.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 107,
        question: "Hangi kupa sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa sarı?', correct: 'Evet! Bu kupa sarı.', wrong: 'Hayır, bu kupa mavi.' }
        },
        options: [
            { id: 7147, word: "kupa", imageUrl: "/images/7147.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7144, word: "kupa", imageUrl: "/images/7144.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 108,
        question: "Hangi kupa mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa mavi?', correct: 'Evet! Bu kupa mavi.', wrong: 'Hayır, bu kupa sarı.' }
        },
        options: [
            { id: 7144, word: "kupa", imageUrl: "/images/7144.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7147, word: "kupa", imageUrl: "/images/7147.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 109,
        question: "Hangi kupa turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa turuncu?', correct: 'Evet! Bu kupa turuncu.', wrong: 'Hayır, bu kupa mor.' }
        },
        options: [
            { id: 7148, word: "kupa", imageUrl: "/images/7148.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7145, word: "kupa", imageUrl: "/images/7145.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 110,
        question: "Hangi kupa mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa mor?', correct: 'Evet! Bu kupa mor.', wrong: 'Hayır, bu kupa turuncu.' }
        },
        options: [
            { id: 7145, word: "kupa", imageUrl: "/images/7145.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7148, word: "kupa", imageUrl: "/images/7148.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 111,
        question: "Hangi kupa pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa pembe?', correct: 'Evet! Bu kupa pembe.', wrong: 'Hayır, bu kupa yeşil.' }
        },
        options: [
            { id: 7146, word: "kupa", imageUrl: "/images/7146.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7149, word: "kupa", imageUrl: "/images/7149.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 112,
        question: "Hangi kupa yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi kupa yeşil?', correct: 'Evet! Bu kupa yeşil.', wrong: 'Hayır, bu kupa pembe.' }
        },
        options: [
            { id: 7149, word: "kupa", imageUrl: "/images/7149.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 7146, word: "kupa", imageUrl: "/images/7146.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    // şemsiye
    {
        id: 113,
        question: "Hangi şemsiye kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye kırmızı?', correct: 'Evet! Bu şemsiye kırmızı.', wrong: 'Hayır, bu şemsiye mavi.' }
        },
        options: [
            { id: 7150, word: "şemsiye", imageUrl: "/images/7150.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7151, word: "şemsiye", imageUrl: "/images/7151.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 114,
        question: "Hangi şemsiye mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye mavi?', correct: 'Evet! Bu şemsiye mavi.', wrong: 'Hayır, bu şemsiye kırmızı.' }
        },
        options: [
            { id: 7151, word: "şemsiye", imageUrl: "/images/7151.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7150, word: "şemsiye", imageUrl: "/images/7150.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 115,
        question: "Hangi şemsiye sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye sarı?', correct: 'Evet! Bu şemsiye sarı.', wrong: 'Hayır, bu şemsiye mor.' }
        },
        options: [
            { id: 7154, word: "şemsiye", imageUrl: "/images/7154.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7152, word: "şemsiye", imageUrl: "/images/7152.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 116,
        question: "Hangi şemsiye mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye mor?', correct: 'Evet! Bu şemsiye mor.', wrong: 'Hayır, bu şemsiye sarı.' }
        },
        options: [
            { id: 7152, word: "şemsiye", imageUrl: "/images/7152.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7154, word: "şemsiye", imageUrl: "/images/7154.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 117,
        question: "Hangi şemsiye yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye yeşil?', correct: 'Evet! Bu şemsiye yeşil.', wrong: 'Hayır, bu şemsiye turuncu.' }
        },
        options: [
            { id: 7156, word: "şemsiye", imageUrl: "/images/7156.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7155, word: "şemsiye", imageUrl: "/images/7155.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 118,
        question: "Hangi şemsiye turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye turuncu?', correct: 'Evet! Bu şemsiye turuncu.', wrong: 'Hayır, bu şemsiye yeşil.' }
        },
        options: [
            { id: 7155, word: "şemsiye", imageUrl: "/images/7155.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7156, word: "şemsiye", imageUrl: "/images/7156.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 119,
        question: "Hangi şemsiye pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye pembe?', correct: 'Evet! Bu şemsiye pembe.', wrong: 'Hayır, bu şemsiye mavi.' }
        },
        options: [
            { id: 7153, word: "şemsiye", imageUrl: "/images/7153.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7151, word: "şemsiye", imageUrl: "/images/7151.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 120,
        question: "Hangi şemsiye mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye mavi?', correct: 'Evet! Bu şemsiye mavi.', wrong: 'Hayır, bu şemsiye pembe.' }
        },
        options: [
            { id: 7151, word: "şemsiye", imageUrl: "/images/7151.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7153, word: "şemsiye", imageUrl: "/images/7153.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 121,
        question: "Hangi şemsiye kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye kırmızı?', correct: 'Evet! Bu şemsiye kırmızı.', wrong: 'Hayır, bu şemsiye yeşil.' }
        },
        options: [
            { id: 7150, word: "şemsiye", imageUrl: "/images/7150.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7156, word: "şemsiye", imageUrl: "/images/7156.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 122,
        question: "Hangi şemsiye yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye yeşil?', correct: 'Evet! Bu şemsiye yeşil.', wrong: 'Hayır, bu şemsiye kırmızı.' }
        },
        options: [
            { id: 7156, word: "şemsiye", imageUrl: "/images/7156.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7150, word: "şemsiye", imageUrl: "/images/7150.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 123,
        question: "Hangi şemsiye sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye sarı?', correct: 'Evet! Bu şemsiye sarı.', wrong: 'Hayır, bu şemsiye mavi.' }
        },
        options: [
            { id: 7154, word: "şemsiye", imageUrl: "/images/7154.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7151, word: "şemsiye", imageUrl: "/images/7151.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 124,
        question: "Hangi şemsiye mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye mavi?', correct: 'Evet! Bu şemsiye mavi.', wrong: 'Hayır, bu şemsiye sarı.' }
        },
        options: [
            { id: 7151, word: "şemsiye", imageUrl: "/images/7151.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7154, word: "şemsiye", imageUrl: "/images/7154.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 125,
        question: "Hangi şemsiye turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye turuncu?', correct: 'Evet! Bu şemsiye turuncu.', wrong: 'Hayır, bu şemsiye mor.' }
        },
        options: [
            { id: 7155, word: "şemsiye", imageUrl: "/images/7155.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7152, word: "şemsiye", imageUrl: "/images/7152.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 126,
        question: "Hangi şemsiye mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye mor?', correct: 'Evet! Bu şemsiye mor.', wrong: 'Hayır, bu şemsiye turuncu.' }
        },
        options: [
            { id: 7152, word: "şemsiye", imageUrl: "/images/7152.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7155, word: "şemsiye", imageUrl: "/images/7155.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 127,
        question: "Hangi şemsiye pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye pembe?', correct: 'Evet! Bu şemsiye pembe.', wrong: 'Hayır, bu şemsiye yeşil.' }
        },
        options: [
            { id: 7153, word: "şemsiye", imageUrl: "/images/7153.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7156, word: "şemsiye", imageUrl: "/images/7156.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 128,
        question: "Hangi şemsiye yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şemsiye yeşil?', correct: 'Evet! Bu şemsiye yeşil.', wrong: 'Hayır, bu şemsiye pembe.' }
        },
        options: [
            { id: 7156, word: "şemsiye", imageUrl: "/images/7156.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 7153, word: "şemsiye", imageUrl: "/images/7153.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    // şişe
    {
        id: 129,
        question: "Hangi şişe kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe kırmızı?', correct: 'Evet! Bu şişe kırmızı.', wrong: 'Hayır, bu şişe mavi.' }
        },
        options: [
            { id: 7157, word: "şişe", imageUrl: "/images/7157.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7158, word: "şişe", imageUrl: "/images/7158.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 130,
        question: "Hangi şişe mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe mavi?', correct: 'Evet! Bu şişe mavi.', wrong: 'Hayır, bu şişe kırmızı.' }
        },
        options: [
            { id: 7158, word: "şişe", imageUrl: "/images/7158.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7157, word: "şişe", imageUrl: "/images/7157.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 131,
        question: "Hangi şişe sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe sarı?', correct: 'Evet! Bu şişe sarı.', wrong: 'Hayır, bu şişe mor.' }
        },
        options: [
            { id: 7161, word: "şişe", imageUrl: "/images/7161.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7159, word: "şişe", imageUrl: "/images/7159.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 132,
        question: "Hangi şişe mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe mor?', correct: 'Evet! Bu şişe mor.', wrong: 'Hayır, bu şişe sarı.' }
        },
        options: [
            { id: 7159, word: "şişe", imageUrl: "/images/7159.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7161, word: "şişe", imageUrl: "/images/7161.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 133,
        question: "Hangi şişe yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe yeşil?', correct: 'Evet! Bu şişe yeşil.', wrong: 'Hayır, bu şişe turuncu.' }
        },
        options: [
            { id: 7163, word: "şişe", imageUrl: "/images/7163.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7162, word: "şişe", imageUrl: "/images/7162.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 134,
        question: "Hangi şişe turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe turuncu?', correct: 'Evet! Bu şişe turuncu.', wrong: 'Hayır, bu şişe yeşil.' }
        },
        options: [
            { id: 7162, word: "şişe", imageUrl: "/images/7162.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7163, word: "şişe", imageUrl: "/images/7163.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 135,
        question: "Hangi şişe pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe pembe?', correct: 'Evet! Bu şişe pembe.', wrong: 'Hayır, bu şişe mavi.' }
        },
        options: [
            { id: 7160, word: "şişe", imageUrl: "/images/7160.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7158, word: "şişe", imageUrl: "/images/7158.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 136,
        question: "Hangi şişe mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe mavi?', correct: 'Evet! Bu şişe mavi.', wrong: 'Hayır, bu şişe pembe.' }
        },
        options: [
            { id: 7158, word: "şişe", imageUrl: "/images/7158.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7160, word: "şişe", imageUrl: "/images/7160.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 137,
        question: "Hangi şişe kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe kırmızı?', correct: 'Evet! Bu şişe kırmızı.', wrong: 'Hayır, bu şişe yeşil.' }
        },
        options: [
            { id: 7157, word: "şişe", imageUrl: "/images/7157.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7163, word: "şişe", imageUrl: "/images/7163.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 138,
        question: "Hangi şişe yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe yeşil?', correct: 'Evet! Bu şişe yeşil.', wrong: 'Hayır, bu şişe kırmızı.' }
        },
        options: [
            { id: 7163, word: "şişe", imageUrl: "/images/7163.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7157, word: "şişe", imageUrl: "/images/7157.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 139,
        question: "Hangi şişe sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe sarı?', correct: 'Evet! Bu şişe sarı.', wrong: 'Hayır, bu şişe mavi.' }
        },
        options: [
            { id: 7161, word: "şişe", imageUrl: "/images/7161.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7158, word: "şişe", imageUrl: "/images/7158.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 140,
        question: "Hangi şişe mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe mavi?', correct: 'Evet! Bu şişe mavi.', wrong: 'Hayır, bu şişe sarı.' }
        },
        options: [
            { id: 7158, word: "şişe", imageUrl: "/images/7158.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7161, word: "şişe", imageUrl: "/images/7161.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 141,
        question: "Hangi şişe turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe turuncu?', correct: 'Evet! Bu şişe turuncu.', wrong: 'Hayır, bu şişe mor.' }
        },
        options: [
            { id: 7162, word: "şişe", imageUrl: "/images/7162.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7159, word: "şişe", imageUrl: "/images/7159.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 142,
        question: "Hangi şişe mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe mor?', correct: 'Evet! Bu şişe mor.', wrong: 'Hayır, bu şişe turuncu.' }
        },
        options: [
            { id: 7159, word: "şişe", imageUrl: "/images/7159.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7162, word: "şişe", imageUrl: "/images/7162.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 143,
        question: "Hangi şişe pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe pembe?', correct: 'Evet! Bu şişe pembe.', wrong: 'Hayır, bu şişe yeşil.' }
        },
        options: [
            { id: 7160, word: "şişe", imageUrl: "/images/7160.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7163, word: "şişe", imageUrl: "/images/7163.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 144,
        question: "Hangi şişe yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi şişe yeşil?', correct: 'Evet! Bu şişe yeşil.', wrong: 'Hayır, bu şişe pembe.' }
        },
        options: [
            { id: 7163, word: "şişe", imageUrl: "/images/7163.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 7160, word: "şişe", imageUrl: "/images/7160.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    // tişört
    {
        id: 145,
        question: "Hangi tişört kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört kırmızı?', correct: 'Evet! Bu tişört kırmızı.', wrong: 'Hayır, bu tişört mavi.' }
        },
        options: [
            { id: 7164, word: "tişört", imageUrl: "/images/7164.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7165, word: "tişört", imageUrl: "/images/7165.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 146,
        question: "Hangi tişört mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört mavi?', correct: 'Evet! Bu tişört mavi.', wrong: 'Hayır, bu tişört kırmızı.' }
        },
        options: [
            { id: 7165, word: "tişört", imageUrl: "/images/7165.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7164, word: "tişört", imageUrl: "/images/7164.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 147,
        question: "Hangi tişört sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört sarı?', correct: 'Evet! Bu tişört sarı.', wrong: 'Hayır, bu tişört mor.' }
        },
        options: [
            { id: 7168, word: "tişört", imageUrl: "/images/7168.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7166, word: "tişört", imageUrl: "/images/7166.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 148,
        question: "Hangi tişört mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört mor?', correct: 'Evet! Bu tişört mor.', wrong: 'Hayır, bu tişört sarı.' }
        },
        options: [
            { id: 7166, word: "tişört", imageUrl: "/images/7166.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7168, word: "tişört", imageUrl: "/images/7168.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 149,
        question: "Hangi tişört yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört yeşil?', correct: 'Evet! Bu tişört yeşil.', wrong: 'Hayır, bu tişört turuncu.' }
        },
        options: [
            { id: 7170, word: "tişört", imageUrl: "/images/7170.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7169, word: "tişört", imageUrl: "/images/7169.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 150,
        question: "Hangi tişört turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört turuncu?', correct: 'Evet! Bu tişört turuncu.', wrong: 'Hayır, bu tişört yeşil.' }
        },
        options: [
            { id: 7169, word: "tişört", imageUrl: "/images/7169.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7170, word: "tişört", imageUrl: "/images/7170.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 151,
        question: "Hangi tişört pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört pembe?', correct: 'Evet! Bu tişört pembe.', wrong: 'Hayır, bu tişört mavi.' }
        },
        options: [
            { id: 7167, word: "tişört", imageUrl: "/images/7167.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7165, word: "tişört", imageUrl: "/images/7165.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 152,
        question: "Hangi tişört mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört mavi?', correct: 'Evet! Bu tişört mavi.', wrong: 'Hayır, bu tişört pembe.' }
        },
        options: [
            { id: 7165, word: "tişört", imageUrl: "/images/7165.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7167, word: "tişört", imageUrl: "/images/7167.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 153,
        question: "Hangi tişört kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört kırmızı?', correct: 'Evet! Bu tişört kırmızı.', wrong: 'Hayır, bu tişört yeşil.' }
        },
        options: [
            { id: 7164, word: "tişört", imageUrl: "/images/7164.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7170, word: "tişört", imageUrl: "/images/7170.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 154,
        question: "Hangi tişört yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört yeşil?', correct: 'Evet! Bu tişört yeşil.', wrong: 'Hayır, bu tişört kırmızı.' }
        },
        options: [
            { id: 7170, word: "tişört", imageUrl: "/images/7170.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7164, word: "tişört", imageUrl: "/images/7164.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 155,
        question: "Hangi tişört sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört sarı?', correct: 'Evet! Bu tişört sarı.', wrong: 'Hayır, bu tişört mavi.' }
        },
        options: [
            { id: 7168, word: "tişört", imageUrl: "/images/7168.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7165, word: "tişört", imageUrl: "/images/7165.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 156,
        question: "Hangi tişört mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört mavi?', correct: 'Evet! Bu tişört mavi.', wrong: 'Hayır, bu tişört sarı.' }
        },
        options: [
            { id: 7165, word: "tişört", imageUrl: "/images/7165.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7168, word: "tişört", imageUrl: "/images/7168.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 157,
        question: "Hangi tişört turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört turuncu?', correct: 'Evet! Bu tişört turuncu.', wrong: 'Hayır, bu tişört mor.' }
        },
        options: [
            { id: 7169, word: "tişört", imageUrl: "/images/7169.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7166, word: "tişört", imageUrl: "/images/7166.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 158,
        question: "Hangi tişört mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört mor?', correct: 'Evet! Bu tişört mor.', wrong: 'Hayır, bu tişört turuncu.' }
        },
        options: [
            { id: 7166, word: "tişört", imageUrl: "/images/7166.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7169, word: "tişört", imageUrl: "/images/7169.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 159,
        question: "Hangi tişört pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört pembe?', correct: 'Evet! Bu tişört pembe.', wrong: 'Hayır, bu tişört yeşil.' }
        },
        options: [
            { id: 7167, word: "tişört", imageUrl: "/images/7167.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7170, word: "tişört", imageUrl: "/images/7170.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 160,
        question: "Hangi tişört yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi tişört yeşil?', correct: 'Evet! Bu tişört yeşil.', wrong: 'Hayır, bu tişört pembe.' }
        },
        options: [
            { id: 7170, word: "tişört", imageUrl: "/images/7170.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 7167, word: "tişört", imageUrl: "/images/7167.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    // top
    {
        id: 161,
        question: "Hangi top kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top kırmızı?', correct: 'Evet! Bu top kırmızı.', wrong: 'Hayır, bu top mavi.' }
        },
        options: [
            { id: 7171, word: "top", imageUrl: "/images/7171.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7172, word: "top", imageUrl: "/images/7172.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 162,
        question: "Hangi top mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top mavi?', correct: 'Evet! Bu top mavi.', wrong: 'Hayır, bu top kırmızı.' }
        },
        options: [
            { id: 7172, word: "top", imageUrl: "/images/7172.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7171, word: "top", imageUrl: "/images/7171.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 163,
        question: "Hangi top sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top sarı?', correct: 'Evet! Bu top sarı.', wrong: 'Hayır, bu top mor.' }
        },
        options: [
            { id: 7175, word: "top", imageUrl: "/images/7175.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7173, word: "top", imageUrl: "/images/7173.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 164,
        question: "Hangi top mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top mor?', correct: 'Evet! Bu top mor.', wrong: 'Hayır, bu top sarı.' }
        },
        options: [
            { id: 7173, word: "top", imageUrl: "/images/7173.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7175, word: "top", imageUrl: "/images/7175.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 165,
        question: "Hangi top yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top yeşil?', correct: 'Evet! Bu top yeşil.', wrong: 'Hayır, bu top turuncu.' }
        },
        options: [
            { id: 7177, word: "top", imageUrl: "/images/7177.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7176, word: "top", imageUrl: "/images/7176.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 166,
        question: "Hangi top turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top turuncu?', correct: 'Evet! Bu top turuncu.', wrong: 'Hayır, bu top yeşil.' }
        },
        options: [
            { id: 7176, word: "top", imageUrl: "/images/7176.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7177, word: "top", imageUrl: "/images/7177.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 167,
        question: "Hangi top pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top pembe?', correct: 'Evet! Bu top pembe.', wrong: 'Hayır, bu top mavi.' }
        },
        options: [
            { id: 7174, word: "top", imageUrl: "/images/7174.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7172, word: "top", imageUrl: "/images/7172.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 168,
        question: "Hangi top mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top mavi?', correct: 'Evet! Bu top mavi.', wrong: 'Hayır, bu top pembe.' }
        },
        options: [
            { id: 7172, word: "top", imageUrl: "/images/7172.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7174, word: "top", imageUrl: "/images/7174.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 169,
        question: "Hangi top kırmızı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top kırmızı?', correct: 'Evet! Bu top kırmızı.', wrong: 'Hayır, bu top yeşil.' }
        },
        options: [
            { id: 7171, word: "top", imageUrl: "/images/7171.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7177, word: "top", imageUrl: "/images/7177.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 170,
        question: "Hangi top yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top yeşil?', correct: 'Evet! Bu top yeşil.', wrong: 'Hayır, bu top kırmızı.' }
        },
        options: [
            { id: 7177, word: "top", imageUrl: "/images/7177.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7171, word: "top", imageUrl: "/images/7171.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 171,
        question: "Hangi top sarı?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top sarı?', correct: 'Evet! Bu top sarı.', wrong: 'Hayır, bu top mavi.' }
        },
        options: [
            { id: 7175, word: "top", imageUrl: "/images/7175.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7172, word: "top", imageUrl: "/images/7172.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 172,
        question: "Hangi top mavi?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top mavi?', correct: 'Evet! Bu top mavi.', wrong: 'Hayır, bu top sarı.' }
        },
        options: [
            { id: 7172, word: "top", imageUrl: "/images/7172.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7175, word: "top", imageUrl: "/images/7175.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 173,
        question: "Hangi top turuncu?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top turuncu?', correct: 'Evet! Bu top turuncu.', wrong: 'Hayır, bu top mor.' }
        },
        options: [
            { id: 7176, word: "top", imageUrl: "/images/7176.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7173, word: "top", imageUrl: "/images/7173.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 174,
        question: "Hangi top mor?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top mor?', correct: 'Evet! Bu top mor.', wrong: 'Hayır, bu top turuncu.' }
        },
        options: [
            { id: 7173, word: "top", imageUrl: "/images/7173.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7176, word: "top", imageUrl: "/images/7176.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 175,
        question: "Hangi top pembe?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top pembe?', correct: 'Evet! Bu top pembe.', wrong: 'Hayır, bu top yeşil.' }
        },
        options: [
            { id: 7174, word: "top", imageUrl: "/images/7174.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7177, word: "top", imageUrl: "/images/7177.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 176,
        question: "Hangi top yeşil?",
        questionAudioKey: "",
        activityType: ActivityType.Colors,
        speech: {
            tr: { question: 'Hangi top yeşil?', correct: 'Evet! Bu top yeşil.', wrong: 'Hayır, bu top pembe.' }
        },
        options: [
            { id: 7177, word: "top", imageUrl: "/images/7177.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 7174, word: "top", imageUrl: "/images/7174.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
];
