// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (yakin-uzak). Elle düzenleme.
// 8 çift, 16 soru. Görseller: gorsel-ham/yakin-uzak/ → id 5501-5516.
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
    // bisiklet
    {
        id: 1003,
        question: "Hangi bisiklet yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi bisiklet yakın?', correct: 'Evet! Bisiklet yakındır.', wrong: 'Hayır, bu bisiklet uzaktır.' }
        },
        options: [
            { id: 5504, word: "bisiklet", imageUrl: "/images/5504.webp", isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" },
            { id: 5503, word: "bisiklet", imageUrl: "/images/5503.webp", isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    {
        id: 1004,
        question: "Hangi bisiklet uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi bisiklet uzak?', correct: 'Evet! Bisiklet uzaktır.', wrong: 'Hayır, bu bisiklet yakındır.' }
        },
        options: [
            { id: 5503, word: "bisiklet", imageUrl: "/images/5503.webp", isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" },
            { id: 5504, word: "bisiklet", imageUrl: "/images/5504.webp", isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    // çocuk
    {
        id: 1005,
        question: "Hangi çocuk yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi çocuk yakın?', correct: 'Evet! Çocuk yakındır.', wrong: 'Hayır, bu çocuk uzaktır.' }
        },
        options: [
            { id: 5506, word: "çocuk", imageUrl: "/images/5506.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 5505, word: "çocuk", imageUrl: "/images/5505.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 1006,
        question: "Hangi çocuk uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi çocuk uzak?', correct: 'Evet! Çocuk uzaktır.', wrong: 'Hayır, bu çocuk yakındır.' }
        },
        options: [
            { id: 5505, word: "çocuk", imageUrl: "/images/5505.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 5506, word: "çocuk", imageUrl: "/images/5506.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // ev
    {
        id: 1007,
        question: "Hangi ev yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi ev yakın?', correct: 'Evet! Ev yakındır.', wrong: 'Hayır, bu ev uzaktır.' }
        },
        options: [
            { id: 5508, word: "ev", imageUrl: "/images/5508.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 5507, word: "ev", imageUrl: "/images/5507.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    {
        id: 1008,
        question: "Hangi ev uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi ev uzak?', correct: 'Evet! Ev uzaktır.', wrong: 'Hayır, bu ev yakındır.' }
        },
        options: [
            { id: 5507, word: "ev", imageUrl: "/images/5507.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 5508, word: "ev", imageUrl: "/images/5508.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    // inek
    {
        id: 1009,
        question: "Hangi inek yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi inek yakın?', correct: 'Evet! İnek yakındır.', wrong: 'Hayır, bu inek uzaktır.' }
        },
        options: [
            { id: 5510, word: "inek", imageUrl: "/images/5510.webp", isCorrect: true, audioKey: "inek", spokenText: "inek" },
            { id: 5509, word: "inek", imageUrl: "/images/5509.webp", isCorrect: false, audioKey: "inek", spokenText: "inek" }
        ]
    },
    {
        id: 1010,
        question: "Hangi inek uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi inek uzak?', correct: 'Evet! İnek uzaktır.', wrong: 'Hayır, bu inek yakındır.' }
        },
        options: [
            { id: 5509, word: "inek", imageUrl: "/images/5509.webp", isCorrect: true, audioKey: "inek", spokenText: "inek" },
            { id: 5510, word: "inek", imageUrl: "/images/5510.webp", isCorrect: false, audioKey: "inek", spokenText: "inek" }
        ]
    },
    // köpek
    {
        id: 1011,
        question: "Hangi köpek yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi köpek yakın?', correct: 'Evet! Köpek yakındır.', wrong: 'Hayır, bu köpek uzaktır.' }
        },
        options: [
            { id: 5512, word: "köpek", imageUrl: "/images/5512.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 5511, word: "köpek", imageUrl: "/images/5511.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    {
        id: 1012,
        question: "Hangi köpek uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi köpek uzak?', correct: 'Evet! Köpek uzaktır.', wrong: 'Hayır, bu köpek yakındır.' }
        },
        options: [
            { id: 5511, word: "köpek", imageUrl: "/images/5511.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 5512, word: "köpek", imageUrl: "/images/5512.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    // tekne
    {
        id: 1013,
        question: "Hangi tekne yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi tekne yakın?', correct: 'Evet! Tekne yakındır.', wrong: 'Hayır, bu tekne uzaktır.' }
        },
        options: [
            { id: 5514, word: "tekne", imageUrl: "/images/5514.webp", isCorrect: true, audioKey: "tekne", spokenText: "tekne" },
            { id: 5513, word: "tekne", imageUrl: "/images/5513.webp", isCorrect: false, audioKey: "tekne", spokenText: "tekne" }
        ]
    },
    {
        id: 1014,
        question: "Hangi tekne uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi tekne uzak?', correct: 'Evet! Tekne uzaktır.', wrong: 'Hayır, bu tekne yakındır.' }
        },
        options: [
            { id: 5513, word: "tekne", imageUrl: "/images/5513.webp", isCorrect: true, audioKey: "tekne", spokenText: "tekne" },
            { id: 5514, word: "tekne", imageUrl: "/images/5514.webp", isCorrect: false, audioKey: "tekne", spokenText: "tekne" }
        ]
    },
    // top
    {
        id: 1015,
        question: "Hangi top yakın?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi top yakın?', correct: 'Evet! Top yakındır.', wrong: 'Hayır, bu top uzaktır.' }
        },
        options: [
            { id: 5516, word: "top", imageUrl: "/images/5516.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 5515, word: "top", imageUrl: "/images/5515.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 1016,
        question: "Hangi top uzak?",
        questionAudioKey: "",
        activityType: ActivityType.NearFar,
        speech: {
            tr: { question: 'Hangi top uzak?', correct: 'Evet! Top uzaktır.', wrong: 'Hayır, bu top yakındır.' }
        },
        options: [
            { id: 5515, word: "top", imageUrl: "/images/5515.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 5516, word: "top", imageUrl: "/images/5516.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
];
