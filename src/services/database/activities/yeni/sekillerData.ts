// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (sekiller). Elle düzenleme.
// 36 çift, 72 soru. Görseller: gorsel-ham/sekiller/ → id 7201-7228.
import { ConceptRound, ActivityType } from '../../../../types';

export const shapesDataYeni: ConceptRound[] = [
    // şekil
    {
        id: 1,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7201, word: "şekil", imageUrl: "/images/7201.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7204, word: "şekil", imageUrl: "/images/7204.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 2,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7204, word: "şekil", imageUrl: "/images/7204.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7201, word: "şekil", imageUrl: "/images/7201.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 3,
        question: "Hangisi üçgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi üçgen?', correct: 'Evet! Bu üçgen.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7206, word: "şekil", imageUrl: "/images/7206.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7201, word: "şekil", imageUrl: "/images/7201.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 4,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu üçgen.' }
        },
        options: [
            { id: 7201, word: "şekil", imageUrl: "/images/7201.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7206, word: "şekil", imageUrl: "/images/7206.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 5,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu üçgen.' }
        },
        options: [
            { id: 7204, word: "şekil", imageUrl: "/images/7204.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7206, word: "şekil", imageUrl: "/images/7206.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 6,
        question: "Hangisi üçgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi üçgen?', correct: 'Evet! Bu üçgen.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7206, word: "şekil", imageUrl: "/images/7206.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7204, word: "şekil", imageUrl: "/images/7204.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 7,
        question: "Hangisi yıldız?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi yıldız?', correct: 'Evet! Bu yıldız.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7207, word: "şekil", imageUrl: "/images/7207.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7201, word: "şekil", imageUrl: "/images/7201.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 8,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu yıldız.' }
        },
        options: [
            { id: 7201, word: "şekil", imageUrl: "/images/7201.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7207, word: "şekil", imageUrl: "/images/7207.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 9,
        question: "Hangisi kalp?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kalp?', correct: 'Evet! Bu kalp.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7203, word: "şekil", imageUrl: "/images/7203.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7204, word: "şekil", imageUrl: "/images/7204.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 10,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu kalp.' }
        },
        options: [
            { id: 7204, word: "şekil", imageUrl: "/images/7204.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7203, word: "şekil", imageUrl: "/images/7203.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 11,
        question: "Hangisi dikdörtgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi dikdörtgen?', correct: 'Evet! Bu dikdörtgen.', wrong: 'Hayır, bu üçgen.' }
        },
        options: [
            { id: 7202, word: "şekil", imageUrl: "/images/7202.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7206, word: "şekil", imageUrl: "/images/7206.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 12,
        question: "Hangisi üçgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi üçgen?', correct: 'Evet! Bu üçgen.', wrong: 'Hayır, bu dikdörtgen.' }
        },
        options: [
            { id: 7206, word: "şekil", imageUrl: "/images/7206.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7202, word: "şekil", imageUrl: "/images/7202.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 13,
        question: "Hangisi oval?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi oval?', correct: 'Evet! Bu oval.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7205, word: "şekil", imageUrl: "/images/7205.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7204, word: "şekil", imageUrl: "/images/7204.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 14,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu oval.' }
        },
        options: [
            { id: 7204, word: "şekil", imageUrl: "/images/7204.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7205, word: "şekil", imageUrl: "/images/7205.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 15,
        question: "Hangisi yıldız?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi yıldız?', correct: 'Evet! Bu yıldız.', wrong: 'Hayır, bu kalp.' }
        },
        options: [
            { id: 7207, word: "şekil", imageUrl: "/images/7207.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7203, word: "şekil", imageUrl: "/images/7203.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 16,
        question: "Hangisi kalp?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kalp?', correct: 'Evet! Bu kalp.', wrong: 'Hayır, bu yıldız.' }
        },
        options: [
            { id: 7203, word: "şekil", imageUrl: "/images/7203.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7207, word: "şekil", imageUrl: "/images/7207.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 17,
        question: "Hangisi dikdörtgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi dikdörtgen?', correct: 'Evet! Bu dikdörtgen.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7202, word: "şekil", imageUrl: "/images/7202.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7201, word: "şekil", imageUrl: "/images/7201.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 18,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu dikdörtgen.' }
        },
        options: [
            { id: 7201, word: "şekil", imageUrl: "/images/7201.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7202, word: "şekil", imageUrl: "/images/7202.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    // şekil
    {
        id: 19,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7208, word: "şekil", imageUrl: "/images/7208.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7211, word: "şekil", imageUrl: "/images/7211.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 20,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7211, word: "şekil", imageUrl: "/images/7211.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7208, word: "şekil", imageUrl: "/images/7208.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 21,
        question: "Hangisi üçgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi üçgen?', correct: 'Evet! Bu üçgen.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7213, word: "şekil", imageUrl: "/images/7213.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7208, word: "şekil", imageUrl: "/images/7208.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 22,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu üçgen.' }
        },
        options: [
            { id: 7208, word: "şekil", imageUrl: "/images/7208.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7213, word: "şekil", imageUrl: "/images/7213.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 23,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu üçgen.' }
        },
        options: [
            { id: 7211, word: "şekil", imageUrl: "/images/7211.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7213, word: "şekil", imageUrl: "/images/7213.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 24,
        question: "Hangisi üçgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi üçgen?', correct: 'Evet! Bu üçgen.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7213, word: "şekil", imageUrl: "/images/7213.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7211, word: "şekil", imageUrl: "/images/7211.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 25,
        question: "Hangisi yıldız?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi yıldız?', correct: 'Evet! Bu yıldız.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7214, word: "şekil", imageUrl: "/images/7214.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7208, word: "şekil", imageUrl: "/images/7208.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 26,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu yıldız.' }
        },
        options: [
            { id: 7208, word: "şekil", imageUrl: "/images/7208.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7214, word: "şekil", imageUrl: "/images/7214.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 27,
        question: "Hangisi kalp?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kalp?', correct: 'Evet! Bu kalp.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7210, word: "şekil", imageUrl: "/images/7210.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7211, word: "şekil", imageUrl: "/images/7211.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 28,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu kalp.' }
        },
        options: [
            { id: 7211, word: "şekil", imageUrl: "/images/7211.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7210, word: "şekil", imageUrl: "/images/7210.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 29,
        question: "Hangisi dikdörtgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi dikdörtgen?', correct: 'Evet! Bu dikdörtgen.', wrong: 'Hayır, bu üçgen.' }
        },
        options: [
            { id: 7209, word: "şekil", imageUrl: "/images/7209.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7213, word: "şekil", imageUrl: "/images/7213.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 30,
        question: "Hangisi üçgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi üçgen?', correct: 'Evet! Bu üçgen.', wrong: 'Hayır, bu dikdörtgen.' }
        },
        options: [
            { id: 7213, word: "şekil", imageUrl: "/images/7213.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7209, word: "şekil", imageUrl: "/images/7209.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 31,
        question: "Hangisi oval?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi oval?', correct: 'Evet! Bu oval.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7212, word: "şekil", imageUrl: "/images/7212.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7211, word: "şekil", imageUrl: "/images/7211.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 32,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu oval.' }
        },
        options: [
            { id: 7211, word: "şekil", imageUrl: "/images/7211.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7212, word: "şekil", imageUrl: "/images/7212.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 33,
        question: "Hangisi yıldız?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi yıldız?', correct: 'Evet! Bu yıldız.', wrong: 'Hayır, bu kalp.' }
        },
        options: [
            { id: 7214, word: "şekil", imageUrl: "/images/7214.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7210, word: "şekil", imageUrl: "/images/7210.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 34,
        question: "Hangisi kalp?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kalp?', correct: 'Evet! Bu kalp.', wrong: 'Hayır, bu yıldız.' }
        },
        options: [
            { id: 7210, word: "şekil", imageUrl: "/images/7210.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7214, word: "şekil", imageUrl: "/images/7214.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 35,
        question: "Hangisi dikdörtgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi dikdörtgen?', correct: 'Evet! Bu dikdörtgen.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7209, word: "şekil", imageUrl: "/images/7209.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7208, word: "şekil", imageUrl: "/images/7208.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 36,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu dikdörtgen.' }
        },
        options: [
            { id: 7208, word: "şekil", imageUrl: "/images/7208.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7209, word: "şekil", imageUrl: "/images/7209.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    // şekil
    {
        id: 37,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7215, word: "şekil", imageUrl: "/images/7215.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7218, word: "şekil", imageUrl: "/images/7218.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 38,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7218, word: "şekil", imageUrl: "/images/7218.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7215, word: "şekil", imageUrl: "/images/7215.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 39,
        question: "Hangisi üçgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi üçgen?', correct: 'Evet! Bu üçgen.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7220, word: "şekil", imageUrl: "/images/7220.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7215, word: "şekil", imageUrl: "/images/7215.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 40,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu üçgen.' }
        },
        options: [
            { id: 7215, word: "şekil", imageUrl: "/images/7215.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7220, word: "şekil", imageUrl: "/images/7220.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 41,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu üçgen.' }
        },
        options: [
            { id: 7218, word: "şekil", imageUrl: "/images/7218.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7220, word: "şekil", imageUrl: "/images/7220.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 42,
        question: "Hangisi üçgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi üçgen?', correct: 'Evet! Bu üçgen.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7220, word: "şekil", imageUrl: "/images/7220.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7218, word: "şekil", imageUrl: "/images/7218.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 43,
        question: "Hangisi yıldız?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi yıldız?', correct: 'Evet! Bu yıldız.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7221, word: "şekil", imageUrl: "/images/7221.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7215, word: "şekil", imageUrl: "/images/7215.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 44,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu yıldız.' }
        },
        options: [
            { id: 7215, word: "şekil", imageUrl: "/images/7215.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7221, word: "şekil", imageUrl: "/images/7221.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 45,
        question: "Hangisi kalp?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kalp?', correct: 'Evet! Bu kalp.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7217, word: "şekil", imageUrl: "/images/7217.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7218, word: "şekil", imageUrl: "/images/7218.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 46,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu kalp.' }
        },
        options: [
            { id: 7218, word: "şekil", imageUrl: "/images/7218.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7217, word: "şekil", imageUrl: "/images/7217.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 47,
        question: "Hangisi dikdörtgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi dikdörtgen?', correct: 'Evet! Bu dikdörtgen.', wrong: 'Hayır, bu üçgen.' }
        },
        options: [
            { id: 7216, word: "şekil", imageUrl: "/images/7216.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7220, word: "şekil", imageUrl: "/images/7220.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 48,
        question: "Hangisi üçgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi üçgen?', correct: 'Evet! Bu üçgen.', wrong: 'Hayır, bu dikdörtgen.' }
        },
        options: [
            { id: 7220, word: "şekil", imageUrl: "/images/7220.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7216, word: "şekil", imageUrl: "/images/7216.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 49,
        question: "Hangisi oval?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi oval?', correct: 'Evet! Bu oval.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7219, word: "şekil", imageUrl: "/images/7219.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7218, word: "şekil", imageUrl: "/images/7218.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 50,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu oval.' }
        },
        options: [
            { id: 7218, word: "şekil", imageUrl: "/images/7218.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7219, word: "şekil", imageUrl: "/images/7219.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 51,
        question: "Hangisi yıldız?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi yıldız?', correct: 'Evet! Bu yıldız.', wrong: 'Hayır, bu kalp.' }
        },
        options: [
            { id: 7221, word: "şekil", imageUrl: "/images/7221.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7217, word: "şekil", imageUrl: "/images/7217.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 52,
        question: "Hangisi kalp?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kalp?', correct: 'Evet! Bu kalp.', wrong: 'Hayır, bu yıldız.' }
        },
        options: [
            { id: 7217, word: "şekil", imageUrl: "/images/7217.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7221, word: "şekil", imageUrl: "/images/7221.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 53,
        question: "Hangisi dikdörtgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi dikdörtgen?', correct: 'Evet! Bu dikdörtgen.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7216, word: "şekil", imageUrl: "/images/7216.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7215, word: "şekil", imageUrl: "/images/7215.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 54,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu dikdörtgen.' }
        },
        options: [
            { id: 7215, word: "şekil", imageUrl: "/images/7215.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7216, word: "şekil", imageUrl: "/images/7216.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    // şekil
    {
        id: 55,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7222, word: "şekil", imageUrl: "/images/7222.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7225, word: "şekil", imageUrl: "/images/7225.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 56,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7225, word: "şekil", imageUrl: "/images/7225.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7222, word: "şekil", imageUrl: "/images/7222.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 57,
        question: "Hangisi üçgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi üçgen?', correct: 'Evet! Bu üçgen.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7227, word: "şekil", imageUrl: "/images/7227.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7222, word: "şekil", imageUrl: "/images/7222.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 58,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu üçgen.' }
        },
        options: [
            { id: 7222, word: "şekil", imageUrl: "/images/7222.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7227, word: "şekil", imageUrl: "/images/7227.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 59,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu üçgen.' }
        },
        options: [
            { id: 7225, word: "şekil", imageUrl: "/images/7225.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7227, word: "şekil", imageUrl: "/images/7227.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 60,
        question: "Hangisi üçgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi üçgen?', correct: 'Evet! Bu üçgen.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7227, word: "şekil", imageUrl: "/images/7227.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7225, word: "şekil", imageUrl: "/images/7225.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 61,
        question: "Hangisi yıldız?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi yıldız?', correct: 'Evet! Bu yıldız.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7228, word: "şekil", imageUrl: "/images/7228.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7222, word: "şekil", imageUrl: "/images/7222.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 62,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu yıldız.' }
        },
        options: [
            { id: 7222, word: "şekil", imageUrl: "/images/7222.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7228, word: "şekil", imageUrl: "/images/7228.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 63,
        question: "Hangisi kalp?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kalp?', correct: 'Evet! Bu kalp.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7224, word: "şekil", imageUrl: "/images/7224.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7225, word: "şekil", imageUrl: "/images/7225.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 64,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu kalp.' }
        },
        options: [
            { id: 7225, word: "şekil", imageUrl: "/images/7225.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7224, word: "şekil", imageUrl: "/images/7224.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 65,
        question: "Hangisi dikdörtgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi dikdörtgen?', correct: 'Evet! Bu dikdörtgen.', wrong: 'Hayır, bu üçgen.' }
        },
        options: [
            { id: 7223, word: "şekil", imageUrl: "/images/7223.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7227, word: "şekil", imageUrl: "/images/7227.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 66,
        question: "Hangisi üçgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi üçgen?', correct: 'Evet! Bu üçgen.', wrong: 'Hayır, bu dikdörtgen.' }
        },
        options: [
            { id: 7227, word: "şekil", imageUrl: "/images/7227.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7223, word: "şekil", imageUrl: "/images/7223.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 67,
        question: "Hangisi oval?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi oval?', correct: 'Evet! Bu oval.', wrong: 'Hayır, bu kare.' }
        },
        options: [
            { id: 7226, word: "şekil", imageUrl: "/images/7226.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7225, word: "şekil", imageUrl: "/images/7225.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 68,
        question: "Hangisi kare?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kare?', correct: 'Evet! Bu kare.', wrong: 'Hayır, bu oval.' }
        },
        options: [
            { id: 7225, word: "şekil", imageUrl: "/images/7225.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7226, word: "şekil", imageUrl: "/images/7226.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 69,
        question: "Hangisi yıldız?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi yıldız?', correct: 'Evet! Bu yıldız.', wrong: 'Hayır, bu kalp.' }
        },
        options: [
            { id: 7228, word: "şekil", imageUrl: "/images/7228.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7224, word: "şekil", imageUrl: "/images/7224.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 70,
        question: "Hangisi kalp?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi kalp?', correct: 'Evet! Bu kalp.', wrong: 'Hayır, bu yıldız.' }
        },
        options: [
            { id: 7224, word: "şekil", imageUrl: "/images/7224.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7228, word: "şekil", imageUrl: "/images/7228.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 71,
        question: "Hangisi dikdörtgen?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi dikdörtgen?', correct: 'Evet! Bu dikdörtgen.', wrong: 'Hayır, bu daire.' }
        },
        options: [
            { id: 7223, word: "şekil", imageUrl: "/images/7223.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7222, word: "şekil", imageUrl: "/images/7222.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
    {
        id: 72,
        question: "Hangisi daire?",
        questionAudioKey: "",
        activityType: ActivityType.Shapes,
        speech: {
            tr: { question: 'Hangisi daire?', correct: 'Evet! Bu daire.', wrong: 'Hayır, bu dikdörtgen.' }
        },
        options: [
            { id: 7222, word: "şekil", imageUrl: "/images/7222.webp", isCorrect: true, audioKey: "şekil", spokenText: "şekil" },
            { id: 7223, word: "şekil", imageUrl: "/images/7223.webp", isCorrect: false, audioKey: "şekil", spokenText: "şekil" }
        ]
    },
];
