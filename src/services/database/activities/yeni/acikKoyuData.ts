// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (acik-koyu). Elle düzenleme.
// 11 çift, 22 soru. Görseller: gorsel-ham/acik-koyu/ → id 6601-6622.
import { ConceptRound, ActivityType } from '../../../../types';

export const acikKoyuDataYeni: ConceptRound[] = [
    // araba
    {
        id: 1,
        question: "Hangi araba açık renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi araba açık renk?', correct: 'Evet! Bu araba açık renk.', wrong: 'Hayır, bu araba koyu renk.' }
        },
        options: [
            { id: 6601, word: "araba", imageUrl: "/images/6601.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 6602, word: "araba", imageUrl: "/images/6602.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 2,
        question: "Hangi araba koyu renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi araba koyu renk?', correct: 'Evet! Bu araba koyu renk.', wrong: 'Hayır, bu araba açık renk.' }
        },
        options: [
            { id: 6602, word: "araba", imageUrl: "/images/6602.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 6601, word: "araba", imageUrl: "/images/6601.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // balon
    {
        id: 3,
        question: "Hangi balon açık renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi balon açık renk?', correct: 'Evet! Bu balon açık renk.', wrong: 'Hayır, bu balon koyu renk.' }
        },
        options: [
            { id: 6603, word: "balon", imageUrl: "/images/6603.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 6604, word: "balon", imageUrl: "/images/6604.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 4,
        question: "Hangi balon koyu renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi balon koyu renk?', correct: 'Evet! Bu balon koyu renk.', wrong: 'Hayır, bu balon açık renk.' }
        },
        options: [
            { id: 6604, word: "balon", imageUrl: "/images/6604.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 6603, word: "balon", imageUrl: "/images/6603.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    // çanta
    {
        id: 5,
        question: "Hangi çanta açık renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi çanta açık renk?', correct: 'Evet! Bu çanta açık renk.', wrong: 'Hayır, bu çanta koyu renk.' }
        },
        options: [
            { id: 6605, word: "çanta", imageUrl: "/images/6605.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 6606, word: "çanta", imageUrl: "/images/6606.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    {
        id: 6,
        question: "Hangi çanta koyu renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi çanta koyu renk?', correct: 'Evet! Bu çanta koyu renk.', wrong: 'Hayır, bu çanta açık renk.' }
        },
        options: [
            { id: 6606, word: "çanta", imageUrl: "/images/6606.webp", isCorrect: true, audioKey: "çanta", spokenText: "çanta" },
            { id: 6605, word: "çanta", imageUrl: "/images/6605.webp", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    // çizme
    {
        id: 7,
        question: "Hangi çizme açık renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi çizme açık renk?', correct: 'Evet! Bu çizme açık renk.', wrong: 'Hayır, bu çizme koyu renk.' }
        },
        options: [
            { id: 6607, word: "çizme", imageUrl: "/images/6607.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 6608, word: "çizme", imageUrl: "/images/6608.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 8,
        question: "Hangi çizme koyu renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi çizme koyu renk?', correct: 'Evet! Bu çizme koyu renk.', wrong: 'Hayır, bu çizme açık renk.' }
        },
        options: [
            { id: 6608, word: "çizme", imageUrl: "/images/6608.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 6607, word: "çizme", imageUrl: "/images/6607.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    // elbise
    {
        id: 9,
        question: "Hangi elbise açık renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi elbise açık renk?', correct: 'Evet! Bu elbise açık renk.', wrong: 'Hayır, bu elbise koyu renk.' }
        },
        options: [
            { id: 6609, word: "elbise", imageUrl: "/images/6609.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 6610, word: "elbise", imageUrl: "/images/6610.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    {
        id: 10,
        question: "Hangi elbise koyu renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi elbise koyu renk?', correct: 'Evet! Bu elbise koyu renk.', wrong: 'Hayır, bu elbise açık renk.' }
        },
        options: [
            { id: 6610, word: "elbise", imageUrl: "/images/6610.webp", isCorrect: true, audioKey: "elbise", spokenText: "elbise" },
            { id: 6609, word: "elbise", imageUrl: "/images/6609.webp", isCorrect: false, audioKey: "elbise", spokenText: "elbise" }
        ]
    },
    // çöp kovası
    {
        id: 11,
        question: "Hangi çöp kovası açık renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi çöp kovası açık renk?', correct: 'Evet! Bu çöp kovası açık renk.', wrong: 'Hayır, bu çöp kovası koyu renk.' }
        },
        options: [
            { id: 6611, word: "çöp kovası", imageUrl: "/images/6611.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 6612, word: "çöp kovası", imageUrl: "/images/6612.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    {
        id: 12,
        question: "Hangi çöp kovası koyu renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi çöp kovası koyu renk?', correct: 'Evet! Bu çöp kovası koyu renk.', wrong: 'Hayır, bu çöp kovası açık renk.' }
        },
        options: [
            { id: 6612, word: "çöp kovası", imageUrl: "/images/6612.webp", isCorrect: true, audioKey: "çöp kovası", spokenText: "çöp kovası" },
            { id: 6611, word: "çöp kovası", imageUrl: "/images/6611.webp", isCorrect: false, audioKey: "çöp kovası", spokenText: "çöp kovası" }
        ]
    },
    // kupa
    {
        id: 13,
        question: "Hangi kupa açık renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi kupa açık renk?', correct: 'Evet! Bu kupa açık renk.', wrong: 'Hayır, bu kupa koyu renk.' }
        },
        options: [
            { id: 6613, word: "kupa", imageUrl: "/images/6613.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 6614, word: "kupa", imageUrl: "/images/6614.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 14,
        question: "Hangi kupa koyu renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi kupa koyu renk?', correct: 'Evet! Bu kupa koyu renk.', wrong: 'Hayır, bu kupa açık renk.' }
        },
        options: [
            { id: 6614, word: "kupa", imageUrl: "/images/6614.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 6613, word: "kupa", imageUrl: "/images/6613.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    // şemsiye
    {
        id: 15,
        question: "Hangi şemsiye açık renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi şemsiye açık renk?', correct: 'Evet! Bu şemsiye açık renk.', wrong: 'Hayır, bu şemsiye koyu renk.' }
        },
        options: [
            { id: 6615, word: "şemsiye", imageUrl: "/images/6615.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 6616, word: "şemsiye", imageUrl: "/images/6616.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 16,
        question: "Hangi şemsiye koyu renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi şemsiye koyu renk?', correct: 'Evet! Bu şemsiye koyu renk.', wrong: 'Hayır, bu şemsiye açık renk.' }
        },
        options: [
            { id: 6616, word: "şemsiye", imageUrl: "/images/6616.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 6615, word: "şemsiye", imageUrl: "/images/6615.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    // şişe
    {
        id: 17,
        question: "Hangi şişe açık renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi şişe açık renk?', correct: 'Evet! Bu şişe açık renk.', wrong: 'Hayır, bu şişe koyu renk.' }
        },
        options: [
            { id: 6617, word: "şişe", imageUrl: "/images/6617.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 6618, word: "şişe", imageUrl: "/images/6618.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 18,
        question: "Hangi şişe koyu renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi şişe koyu renk?', correct: 'Evet! Bu şişe koyu renk.', wrong: 'Hayır, bu şişe açık renk.' }
        },
        options: [
            { id: 6618, word: "şişe", imageUrl: "/images/6618.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 6617, word: "şişe", imageUrl: "/images/6617.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    // tişört
    {
        id: 19,
        question: "Hangi tişört açık renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi tişört açık renk?', correct: 'Evet! Bu tişört açık renk.', wrong: 'Hayır, bu tişört koyu renk.' }
        },
        options: [
            { id: 6619, word: "tişört", imageUrl: "/images/6619.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 6620, word: "tişört", imageUrl: "/images/6620.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 20,
        question: "Hangi tişört koyu renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi tişört koyu renk?', correct: 'Evet! Bu tişört koyu renk.', wrong: 'Hayır, bu tişört açık renk.' }
        },
        options: [
            { id: 6620, word: "tişört", imageUrl: "/images/6620.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 6619, word: "tişört", imageUrl: "/images/6619.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    // top
    {
        id: 21,
        question: "Hangi top açık renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi top açık renk?', correct: 'Evet! Bu top açık renk.', wrong: 'Hayır, bu top koyu renk.' }
        },
        options: [
            { id: 6621, word: "top", imageUrl: "/images/6621.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 6622, word: "top", imageUrl: "/images/6622.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 22,
        question: "Hangi top koyu renk?",
        questionAudioKey: "",
        activityType: ActivityType.AcikKoyu,
        speech: {
            tr: { question: 'Hangi top koyu renk?', correct: 'Evet! Bu top koyu renk.', wrong: 'Hayır, bu top açık renk.' }
        },
        options: [
            { id: 6622, word: "top", imageUrl: "/images/6622.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 6621, word: "top", imageUrl: "/images/6621.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
];
