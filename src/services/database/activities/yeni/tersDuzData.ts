// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (ters-duz). Elle düzenleme.
// 9 çift, 18 soru. Görseller: gorsel-ham/ters-duz/ → id 5701-5718.
import { ConceptRound, ActivityType } from '../../../../types';

export const tersDuzDataYeni: ConceptRound[] = [
    // oyuncak ayı
    {
        id: 1,
        question: "Hangi oyuncak ayı ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi oyuncak ayı ters?', correct: 'Evet! Oyuncak ayı terstir.', wrong: 'Hayır, bu oyuncak ayı düzdür.' }
        },
        options: [
            { id: 5702, word: "oyuncak ayı", imageUrl: "/images/5702.webp", isCorrect: true, audioKey: "oyuncak ayı", spokenText: "oyuncak ayı" },
            { id: 5701, word: "oyuncak ayı", imageUrl: "/images/5701.webp", isCorrect: false, audioKey: "oyuncak ayı", spokenText: "oyuncak ayı" }
        ]
    },
    {
        id: 2,
        question: "Hangi oyuncak ayı düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi oyuncak ayı düz?', correct: 'Evet! Oyuncak ayı düzdür.', wrong: 'Hayır, bu oyuncak ayı terstir.' }
        },
        options: [
            { id: 5701, word: "oyuncak ayı", imageUrl: "/images/5701.webp", isCorrect: true, audioKey: "oyuncak ayı", spokenText: "oyuncak ayı" },
            { id: 5702, word: "oyuncak ayı", imageUrl: "/images/5702.webp", isCorrect: false, audioKey: "oyuncak ayı", spokenText: "oyuncak ayı" }
        ]
    },
    // fincan
    {
        id: 3,
        question: "Hangi fincan ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi fincan ters?', correct: 'Evet! Fincan terstir.', wrong: 'Hayır, bu fincan düzdür.' }
        },
        options: [
            { id: 5704, word: "fincan", imageUrl: "/images/5704.webp", isCorrect: true, audioKey: "fincan", spokenText: "fincan" },
            { id: 5703, word: "fincan", imageUrl: "/images/5703.webp", isCorrect: false, audioKey: "fincan", spokenText: "fincan" }
        ]
    },
    {
        id: 4,
        question: "Hangi fincan düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi fincan düz?', correct: 'Evet! Fincan düzdür.', wrong: 'Hayır, bu fincan terstir.' }
        },
        options: [
            { id: 5703, word: "fincan", imageUrl: "/images/5703.webp", isCorrect: true, audioKey: "fincan", spokenText: "fincan" },
            { id: 5704, word: "fincan", imageUrl: "/images/5704.webp", isCorrect: false, audioKey: "fincan", spokenText: "fincan" }
        ]
    },
    // kova
    {
        id: 5,
        question: "Hangi kova ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi kova ters?', correct: 'Evet! Kova terstir.', wrong: 'Hayır, bu kova düzdür.' }
        },
        options: [
            { id: 5706, word: "kova", imageUrl: "/images/5706.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 5705, word: "kova", imageUrl: "/images/5705.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    {
        id: 6,
        question: "Hangi kova düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi kova düz?', correct: 'Evet! Kova düzdür.', wrong: 'Hayır, bu kova terstir.' }
        },
        options: [
            { id: 5705, word: "kova", imageUrl: "/images/5705.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 5706, word: "kova", imageUrl: "/images/5706.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    // pantolon
    {
        id: 7,
        question: "Hangi pantolon ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi pantolon ters?', correct: 'Evet! Pantolon terstir.', wrong: 'Hayır, bu pantolon düzdür.' }
        },
        options: [
            { id: 5708, word: "pantolon", imageUrl: "/images/5708.webp", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 5707, word: "pantolon", imageUrl: "/images/5707.webp", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" }
        ]
    },
    {
        id: 8,
        question: "Hangi pantolon düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi pantolon düz?', correct: 'Evet! Pantolon düzdür.', wrong: 'Hayır, bu pantolon terstir.' }
        },
        options: [
            { id: 5707, word: "pantolon", imageUrl: "/images/5707.webp", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 5708, word: "pantolon", imageUrl: "/images/5708.webp", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" }
        ]
    },
    // saksı
    {
        id: 9,
        question: "Hangi saksı ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi saksı ters?', correct: 'Evet! Saksı terstir.', wrong: 'Hayır, bu saksı düzdür.' }
        },
        options: [
            { id: 5710, word: "saksı", imageUrl: "/images/5710.webp", isCorrect: true, audioKey: "saksı", spokenText: "saksı" },
            { id: 5709, word: "saksı", imageUrl: "/images/5709.webp", isCorrect: false, audioKey: "saksı", spokenText: "saksı" }
        ]
    },
    {
        id: 10,
        question: "Hangi saksı düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi saksı düz?', correct: 'Evet! Saksı düzdür.', wrong: 'Hayır, bu saksı terstir.' }
        },
        options: [
            { id: 5709, word: "saksı", imageUrl: "/images/5709.webp", isCorrect: true, audioKey: "saksı", spokenText: "saksı" },
            { id: 5710, word: "saksı", imageUrl: "/images/5710.webp", isCorrect: false, audioKey: "saksı", spokenText: "saksı" }
        ]
    },
    // sandalye
    {
        id: 11,
        question: "Hangi sandalye ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi sandalye ters?', correct: 'Evet! Sandalye terstir.', wrong: 'Hayır, bu sandalye düzdür.' }
        },
        options: [
            { id: 5712, word: "sandalye", imageUrl: "/images/5712.webp", isCorrect: true, audioKey: "sandalye", spokenText: "sandalye" },
            { id: 5711, word: "sandalye", imageUrl: "/images/5711.webp", isCorrect: false, audioKey: "sandalye", spokenText: "sandalye" }
        ]
    },
    {
        id: 12,
        question: "Hangi sandalye düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi sandalye düz?', correct: 'Evet! Sandalye düzdür.', wrong: 'Hayır, bu sandalye terstir.' }
        },
        options: [
            { id: 5711, word: "sandalye", imageUrl: "/images/5711.webp", isCorrect: true, audioKey: "sandalye", spokenText: "sandalye" },
            { id: 5712, word: "sandalye", imageUrl: "/images/5712.webp", isCorrect: false, audioKey: "sandalye", spokenText: "sandalye" }
        ]
    },
    // şemsiye
    {
        id: 13,
        question: "Hangi şemsiye ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi şemsiye ters?', correct: 'Evet! Şemsiye terstir.', wrong: 'Hayır, bu şemsiye düzdür.' }
        },
        options: [
            { id: 5714, word: "şemsiye", imageUrl: "/images/5714.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 5713, word: "şemsiye", imageUrl: "/images/5713.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 14,
        question: "Hangi şemsiye düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi şemsiye düz?', correct: 'Evet! Şemsiye düzdür.', wrong: 'Hayır, bu şemsiye terstir.' }
        },
        options: [
            { id: 5713, word: "şemsiye", imageUrl: "/images/5713.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 5714, word: "şemsiye", imageUrl: "/images/5714.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    // şişe
    {
        id: 15,
        question: "Hangi şişe ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi şişe ters?', correct: 'Evet! Şişe terstir.', wrong: 'Hayır, bu şişe düzdür.' }
        },
        options: [
            { id: 5716, word: "şişe", imageUrl: "/images/5716.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 5715, word: "şişe", imageUrl: "/images/5715.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 16,
        question: "Hangi şişe düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi şişe düz?', correct: 'Evet! Şişe düzdür.', wrong: 'Hayır, bu şişe terstir.' }
        },
        options: [
            { id: 5715, word: "şişe", imageUrl: "/images/5715.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 5716, word: "şişe", imageUrl: "/images/5716.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    // tabure
    {
        id: 17,
        question: "Hangi tabure ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi tabure ters?', correct: 'Evet! Tabure terstir.', wrong: 'Hayır, bu tabure düzdür.' }
        },
        options: [
            { id: 5718, word: "tabure", imageUrl: "/images/5718.webp", isCorrect: true, audioKey: "tabure", spokenText: "tabure" },
            { id: 5717, word: "tabure", imageUrl: "/images/5717.webp", isCorrect: false, audioKey: "tabure", spokenText: "tabure" }
        ]
    },
    {
        id: 18,
        question: "Hangi tabure düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi tabure düz?', correct: 'Evet! Tabure düzdür.', wrong: 'Hayır, bu tabure terstir.' }
        },
        options: [
            { id: 5717, word: "tabure", imageUrl: "/images/5717.webp", isCorrect: true, audioKey: "tabure", spokenText: "tabure" },
            { id: 5718, word: "tabure", imageUrl: "/images/5718.webp", isCorrect: false, audioKey: "tabure", spokenText: "tabure" }
        ]
    },
];
