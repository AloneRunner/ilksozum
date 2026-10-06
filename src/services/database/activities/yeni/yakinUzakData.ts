// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (yakin-uzak). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/yakin-uzak/ → id 5501-5520.
import { ConceptRound, ActivityType } from '../../../../types';

export const nearFarDataYeni: ConceptRound[] = [
    // ağaç
    {
        id: 1001,
        question: "Hangi ağaç yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi ağaç yakın?', correct: 'Evet! Bu ağaç yakın.', wrong: 'Hayır, bu ağaç uzak.' }
        },
        options: [
            { id: 5502, word: "ağaç", imageUrl: "/images/5502.webp", isCorrect: true, audioKey: "ağaç", spokenText: "ağaç" },
            { id: 5501, word: "ağaç", imageUrl: "/images/5501.webp", isCorrect: false, audioKey: "ağaç", spokenText: "ağaç" }
        ]
    },
    {
        id: 1002,
        question: "Hangi ağaç uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi ağaç uzak?', correct: 'Evet! Bu ağaç uzak.', wrong: 'Hayır, bu ağaç yakın.' }
        },
        options: [
            { id: 5501, word: "ağaç", imageUrl: "/images/5501.webp", isCorrect: true, audioKey: "ağaç", spokenText: "ağaç" },
            { id: 5502, word: "ağaç", imageUrl: "/images/5502.webp", isCorrect: false, audioKey: "ağaç", spokenText: "ağaç" }
        ]
    },
    // araba
    {
        id: 1003,
        question: "Hangi araba yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi araba yakın?', correct: 'Evet! Bu araba yakın.', wrong: 'Hayır, bu araba uzak.' }
        },
        options: [
            { id: 5504, word: "araba", imageUrl: "/images/5504.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 5503, word: "araba", imageUrl: "/images/5503.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 1004,
        question: "Hangi araba uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi araba uzak?', correct: 'Evet! Bu araba uzak.', wrong: 'Hayır, bu araba yakın.' }
        },
        options: [
            { id: 5503, word: "araba", imageUrl: "/images/5503.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 5504, word: "araba", imageUrl: "/images/5504.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // balon
    {
        id: 1005,
        question: "Hangi balon yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi balon yakın?', correct: 'Evet! Bu balon yakın.', wrong: 'Hayır, bu balon uzak.' }
        },
        options: [
            { id: 5506, word: "balon", imageUrl: "/images/5506.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 5505, word: "balon", imageUrl: "/images/5505.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 1006,
        question: "Hangi balon uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi balon uzak?', correct: 'Evet! Bu balon uzak.', wrong: 'Hayır, bu balon yakın.' }
        },
        options: [
            { id: 5505, word: "balon", imageUrl: "/images/5505.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 5506, word: "balon", imageUrl: "/images/5506.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    // bisiklet
    {
        id: 1007,
        question: "Hangi bisiklet yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi bisiklet yakın?', correct: 'Evet! Bu bisiklet yakın.', wrong: 'Hayır, bu bisiklet uzak.' }
        },
        options: [
            { id: 5508, word: "bisiklet", imageUrl: "/images/5508.webp", isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" },
            { id: 5507, word: "bisiklet", imageUrl: "/images/5507.webp", isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    {
        id: 1008,
        question: "Hangi bisiklet uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi bisiklet uzak?', correct: 'Evet! Bu bisiklet uzak.', wrong: 'Hayır, bu bisiklet yakın.' }
        },
        options: [
            { id: 5507, word: "bisiklet", imageUrl: "/images/5507.webp", isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" },
            { id: 5508, word: "bisiklet", imageUrl: "/images/5508.webp", isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    // çocuk
    {
        id: 1009,
        question: "Hangi çocuk yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi çocuk yakın?', correct: 'Evet! Bu çocuk yakın.', wrong: 'Hayır, bu çocuk uzak.' }
        },
        options: [
            { id: 5510, word: "çocuk", imageUrl: "/images/5510.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 5509, word: "çocuk", imageUrl: "/images/5509.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 1010,
        question: "Hangi çocuk uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi çocuk uzak?', correct: 'Evet! Bu çocuk uzak.', wrong: 'Hayır, bu çocuk yakın.' }
        },
        options: [
            { id: 5509, word: "çocuk", imageUrl: "/images/5509.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 5510, word: "çocuk", imageUrl: "/images/5510.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // ev
    {
        id: 1011,
        question: "Hangi ev yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi ev yakın?', correct: 'Evet! Bu ev yakın.', wrong: 'Hayır, bu ev uzak.' }
        },
        options: [
            { id: 5512, word: "ev", imageUrl: "/images/5512.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 5511, word: "ev", imageUrl: "/images/5511.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    {
        id: 1012,
        question: "Hangi ev uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi ev uzak?', correct: 'Evet! Bu ev uzak.', wrong: 'Hayır, bu ev yakın.' }
        },
        options: [
            { id: 5511, word: "ev", imageUrl: "/images/5511.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 5512, word: "ev", imageUrl: "/images/5512.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    // inek
    {
        id: 1013,
        question: "Hangi inek yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi inek yakın?', correct: 'Evet! Bu inek yakın.', wrong: 'Hayır, bu inek uzak.' }
        },
        options: [
            { id: 5514, word: "inek", imageUrl: "/images/5514.webp", isCorrect: true, audioKey: "inek", spokenText: "inek" },
            { id: 5513, word: "inek", imageUrl: "/images/5513.webp", isCorrect: false, audioKey: "inek", spokenText: "inek" }
        ]
    },
    {
        id: 1014,
        question: "Hangi inek uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi inek uzak?', correct: 'Evet! Bu inek uzak.', wrong: 'Hayır, bu inek yakın.' }
        },
        options: [
            { id: 5513, word: "inek", imageUrl: "/images/5513.webp", isCorrect: true, audioKey: "inek", spokenText: "inek" },
            { id: 5514, word: "inek", imageUrl: "/images/5514.webp", isCorrect: false, audioKey: "inek", spokenText: "inek" }
        ]
    },
    // köpek
    {
        id: 1015,
        question: "Hangi köpek yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi köpek yakın?', correct: 'Evet! Bu köpek yakın.', wrong: 'Hayır, bu köpek uzak.' }
        },
        options: [
            { id: 5516, word: "köpek", imageUrl: "/images/5516.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 5515, word: "köpek", imageUrl: "/images/5515.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    {
        id: 1016,
        question: "Hangi köpek uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi köpek uzak?', correct: 'Evet! Bu köpek uzak.', wrong: 'Hayır, bu köpek yakın.' }
        },
        options: [
            { id: 5515, word: "köpek", imageUrl: "/images/5515.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 5516, word: "köpek", imageUrl: "/images/5516.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    // tekne
    {
        id: 1017,
        question: "Hangi tekne yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi tekne yakın?', correct: 'Evet! Bu tekne yakın.', wrong: 'Hayır, bu tekne uzak.' }
        },
        options: [
            { id: 5518, word: "tekne", imageUrl: "/images/5518.webp", isCorrect: true, audioKey: "tekne", spokenText: "tekne" },
            { id: 5517, word: "tekne", imageUrl: "/images/5517.webp", isCorrect: false, audioKey: "tekne", spokenText: "tekne" }
        ]
    },
    {
        id: 1018,
        question: "Hangi tekne uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi tekne uzak?', correct: 'Evet! Bu tekne uzak.', wrong: 'Hayır, bu tekne yakın.' }
        },
        options: [
            { id: 5517, word: "tekne", imageUrl: "/images/5517.webp", isCorrect: true, audioKey: "tekne", spokenText: "tekne" },
            { id: 5518, word: "tekne", imageUrl: "/images/5518.webp", isCorrect: false, audioKey: "tekne", spokenText: "tekne" }
        ]
    },
    // top
    {
        id: 1019,
        question: "Hangi top yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi top yakın?', correct: 'Evet! Bu top yakın.', wrong: 'Hayır, bu top uzak.' }
        },
        options: [
            { id: 5520, word: "top", imageUrl: "/images/5520.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 5519, word: "top", imageUrl: "/images/5519.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 1020,
        question: "Hangi top uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi top uzak?', correct: 'Evet! Bu top uzak.', wrong: 'Hayır, bu top yakın.' }
        },
        options: [
            { id: 5519, word: "top", imageUrl: "/images/5519.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 5520, word: "top", imageUrl: "/images/5520.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
];
