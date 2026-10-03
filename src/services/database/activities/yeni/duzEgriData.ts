// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (duz-egri). Elle düzenleme.
// 8 çift, 16 soru. Görseller: gorsel-ham/duz-egri/ → id 4901-4916.
import { ConceptRound, ActivityType } from '../../../../types';

export const straightCurvedDataYeni: ConceptRound[] = [
    // ağaç
    {
        id: 1,
        question: "Hangi ağaç düz?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi ağaç düz?', correct: 'Evet! Ağaç düzdür.', wrong: 'Hayır, bu ağaç eğridir.' }
        },
        options: [
            { id: 4901, word: "ağaç", imageUrl: "/images/4901.webp", isCorrect: true, audioKey: "ağaç", spokenText: "ağaç" },
            { id: 4902, word: "ağaç", imageUrl: "/images/4902.webp", isCorrect: false, audioKey: "ağaç", spokenText: "ağaç" }
        ]
    },
    {
        id: 2,
        question: "Hangi ağaç eğri?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi ağaç eğri?', correct: 'Evet! Ağaç eğridir.', wrong: 'Hayır, bu ağaç düzdür.' }
        },
        options: [
            { id: 4902, word: "ağaç", imageUrl: "/images/4902.webp", isCorrect: true, audioKey: "ağaç", spokenText: "ağaç" },
            { id: 4901, word: "ağaç", imageUrl: "/images/4901.webp", isCorrect: false, audioKey: "ağaç", spokenText: "ağaç" }
        ]
    },
    // çivi
    {
        id: 3,
        question: "Hangi çivi düz?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi çivi düz?', correct: 'Evet! Çivi düzdür.', wrong: 'Hayır, bu çivi eğridir.' }
        },
        options: [
            { id: 4903, word: "çivi", imageUrl: "/images/4903.webp", isCorrect: true, audioKey: "çivi", spokenText: "çivi" },
            { id: 4904, word: "çivi", imageUrl: "/images/4904.webp", isCorrect: false, audioKey: "çivi", spokenText: "çivi" }
        ]
    },
    {
        id: 4,
        question: "Hangi çivi eğri?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi çivi eğri?', correct: 'Evet! Çivi eğridir.', wrong: 'Hayır, bu çivi düzdür.' }
        },
        options: [
            { id: 4904, word: "çivi", imageUrl: "/images/4904.webp", isCorrect: true, audioKey: "çivi", spokenText: "çivi" },
            { id: 4903, word: "çivi", imageUrl: "/images/4903.webp", isCorrect: false, audioKey: "çivi", spokenText: "çivi" }
        ]
    },
    // çubuk
    {
        id: 5,
        question: "Hangi çubuk düz?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi çubuk düz?', correct: 'Evet! Çubuk düzdür.', wrong: 'Hayır, bu çubuk eğridir.' }
        },
        options: [
            { id: 4905, word: "çubuk", imageUrl: "/images/4905.webp", isCorrect: true, audioKey: "çubuk", spokenText: "çubuk" },
            { id: 4906, word: "çubuk", imageUrl: "/images/4906.webp", isCorrect: false, audioKey: "çubuk", spokenText: "çubuk" }
        ]
    },
    {
        id: 6,
        question: "Hangi çubuk eğri?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi çubuk eğri?', correct: 'Evet! Çubuk eğridir.', wrong: 'Hayır, bu çubuk düzdür.' }
        },
        options: [
            { id: 4906, word: "çubuk", imageUrl: "/images/4906.webp", isCorrect: true, audioKey: "çubuk", spokenText: "çubuk" },
            { id: 4905, word: "çubuk", imageUrl: "/images/4905.webp", isCorrect: false, audioKey: "çubuk", spokenText: "çubuk" }
        ]
    },
    // ip
    {
        id: 7,
        question: "Hangi ip düz?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi ip düz?', correct: 'Evet! İp düzdür.', wrong: 'Hayır, bu ip eğridir.' }
        },
        options: [
            { id: 4907, word: "ip", imageUrl: "/images/4907.webp", isCorrect: true, audioKey: "ip", spokenText: "ip" },
            { id: 4908, word: "ip", imageUrl: "/images/4908.webp", isCorrect: false, audioKey: "ip", spokenText: "ip" }
        ]
    },
    {
        id: 8,
        question: "Hangi ip eğri?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi ip eğri?', correct: 'Evet! İp eğridir.', wrong: 'Hayır, bu ip düzdür.' }
        },
        options: [
            { id: 4908, word: "ip", imageUrl: "/images/4908.webp", isCorrect: true, audioKey: "ip", spokenText: "ip" },
            { id: 4907, word: "ip", imageUrl: "/images/4907.webp", isCorrect: false, audioKey: "ip", spokenText: "ip" }
        ]
    },
    // pipet
    {
        id: 9,
        question: "Hangi pipet düz?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi pipet düz?', correct: 'Evet! Pipet düzdür.', wrong: 'Hayır, bu pipet eğridir.' }
        },
        options: [
            { id: 4909, word: "pipet", imageUrl: "/images/4909.webp", isCorrect: true, audioKey: "pipet", spokenText: "pipet" },
            { id: 4910, word: "pipet", imageUrl: "/images/4910.webp", isCorrect: false, audioKey: "pipet", spokenText: "pipet" }
        ]
    },
    {
        id: 10,
        question: "Hangi pipet eğri?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi pipet eğri?', correct: 'Evet! Pipet eğridir.', wrong: 'Hayır, bu pipet düzdür.' }
        },
        options: [
            { id: 4910, word: "pipet", imageUrl: "/images/4910.webp", isCorrect: true, audioKey: "pipet", spokenText: "pipet" },
            { id: 4909, word: "pipet", imageUrl: "/images/4909.webp", isCorrect: false, audioKey: "pipet", spokenText: "pipet" }
        ]
    },
    // tren rayı
    {
        id: 11,
        question: "Hangi tren rayı düz?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi tren rayı düz?', correct: 'Evet! Tren rayı düzdür.', wrong: 'Hayır, bu tren rayı eğridir.' }
        },
        options: [
            { id: 4911, word: "tren rayı", imageUrl: "/images/4911.webp", isCorrect: true, audioKey: "tren rayı", spokenText: "tren rayı" },
            { id: 4912, word: "tren rayı", imageUrl: "/images/4912.webp", isCorrect: false, audioKey: "tren rayı", spokenText: "tren rayı" }
        ]
    },
    {
        id: 12,
        question: "Hangi tren rayı eğri?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi tren rayı eğri?', correct: 'Evet! Tren rayı eğridir.', wrong: 'Hayır, bu tren rayı düzdür.' }
        },
        options: [
            { id: 4912, word: "tren rayı", imageUrl: "/images/4912.webp", isCorrect: true, audioKey: "tren rayı", spokenText: "tren rayı" },
            { id: 4911, word: "tren rayı", imageUrl: "/images/4911.webp", isCorrect: false, audioKey: "tren rayı", spokenText: "tren rayı" }
        ]
    },
    // tel
    {
        id: 13,
        question: "Hangi tel düz?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi tel düz?', correct: 'Evet! Tel düzdür.', wrong: 'Hayır, bu tel eğridir.' }
        },
        options: [
            { id: 4913, word: "tel", imageUrl: "/images/4913.webp", isCorrect: true, audioKey: "tel", spokenText: "tel" },
            { id: 4914, word: "tel", imageUrl: "/images/4914.webp", isCorrect: false, audioKey: "tel", spokenText: "tel" }
        ]
    },
    {
        id: 14,
        question: "Hangi tel eğri?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi tel eğri?', correct: 'Evet! Tel eğridir.', wrong: 'Hayır, bu tel düzdür.' }
        },
        options: [
            { id: 4914, word: "tel", imageUrl: "/images/4914.webp", isCorrect: true, audioKey: "tel", spokenText: "tel" },
            { id: 4913, word: "tel", imageUrl: "/images/4913.webp", isCorrect: false, audioKey: "tel", spokenText: "tel" }
        ]
    },
    // yol
    {
        id: 15,
        question: "Hangi yol düz?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi yol düz?', correct: 'Evet! Yol düzdür.', wrong: 'Hayır, bu yol eğridir.' }
        },
        options: [
            { id: 4915, word: "yol", imageUrl: "/images/4915.webp", isCorrect: true, audioKey: "yol", spokenText: "yol" },
            { id: 4916, word: "yol", imageUrl: "/images/4916.webp", isCorrect: false, audioKey: "yol", spokenText: "yol" }
        ]
    },
    {
        id: 16,
        question: "Hangi yol eğri?",
        questionAudioKey: "",
        activityType: ActivityType.StraightCurved,
        speech: {
            tr: { question: 'Hangi yol eğri?', correct: 'Evet! Yol eğridir.', wrong: 'Hayır, bu yol düzdür.' }
        },
        options: [
            { id: 4916, word: "yol", imageUrl: "/images/4916.webp", isCorrect: true, audioKey: "yol", spokenText: "yol" },
            { id: 4915, word: "yol", imageUrl: "/images/4915.webp", isCorrect: false, audioKey: "yol", spokenText: "yol" }
        ]
    },
];
