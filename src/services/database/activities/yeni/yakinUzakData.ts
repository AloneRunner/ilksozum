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
            tr: { question: 'Hangi ağaç yakın?', correct: 'Evet! Ağaç yakındır.', wrong: 'Hayır, bu ağaç uzaktır.' }
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
            tr: { question: 'Hangi ağaç uzak?', correct: 'Evet! Ağaç uzaktır.', wrong: 'Hayır, bu ağaç yakındır.' }
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
            tr: { question: 'Hangi araba yakın?', correct: 'Evet! Araba yakındır.', wrong: 'Hayır, bu araba uzaktır.' }
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
            tr: { question: 'Hangi araba uzak?', correct: 'Evet! Araba uzaktır.', wrong: 'Hayır, bu araba yakındır.' }
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
            tr: { question: 'Hangi balon yakın?', correct: 'Evet! Balon yakındır.', wrong: 'Hayır, bu balon uzaktır.' }
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
            tr: { question: 'Hangi balon uzak?', correct: 'Evet! Balon uzaktır.', wrong: 'Hayır, bu balon yakındır.' }
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
            tr: { question: 'Hangi bisiklet yakın?', correct: 'Evet! Bisiklet yakındır.', wrong: 'Hayır, bu bisiklet uzaktır.' }
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
            tr: { question: 'Hangi bisiklet uzak?', correct: 'Evet! Bisiklet uzaktır.', wrong: 'Hayır, bu bisiklet yakındır.' }
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
            tr: { question: 'Hangi çocuk yakın?', correct: 'Evet! Çocuk yakındır.', wrong: 'Hayır, bu çocuk uzaktır.' }
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
            tr: { question: 'Hangi çocuk uzak?', correct: 'Evet! Çocuk uzaktır.', wrong: 'Hayır, bu çocuk yakındır.' }
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
            tr: { question: 'Hangi ev yakın?', correct: 'Evet! Ev yakındır.', wrong: 'Hayır, bu ev uzaktır.' }
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
            tr: { question: 'Hangi ev uzak?', correct: 'Evet! Ev uzaktır.', wrong: 'Hayır, bu ev yakındır.' }
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
            tr: { question: 'Hangi inek yakın?', correct: 'Evet! İnek yakındır.', wrong: 'Hayır, bu inek uzaktır.' }
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
            tr: { question: 'Hangi inek uzak?', correct: 'Evet! İnek uzaktır.', wrong: 'Hayır, bu inek yakındır.' }
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
            tr: { question: 'Hangi köpek yakın?', correct: 'Evet! Köpek yakındır.', wrong: 'Hayır, bu köpek uzaktır.' }
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
            tr: { question: 'Hangi köpek uzak?', correct: 'Evet! Köpek uzaktır.', wrong: 'Hayır, bu köpek yakındır.' }
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
            tr: { question: 'Hangi tekne yakın?', correct: 'Evet! Tekne yakındır.', wrong: 'Hayır, bu tekne uzaktır.' }
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
            tr: { question: 'Hangi tekne uzak?', correct: 'Evet! Tekne uzaktır.', wrong: 'Hayır, bu tekne yakındır.' }
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
            tr: { question: 'Hangi top yakın?', correct: 'Evet! Top yakındır.', wrong: 'Hayır, bu top uzaktır.' }
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
            tr: { question: 'Hangi top uzak?', correct: 'Evet! Top uzaktır.', wrong: 'Hayır, bu top yakındır.' }
        },
        options: [
            { id: 5519, word: "top", imageUrl: "/images/5519.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 5520, word: "top", imageUrl: "/images/5520.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
];
