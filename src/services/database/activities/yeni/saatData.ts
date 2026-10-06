// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-saat.mjs. Elle düzenleme.
// Saat kavramı: kodla çizilmiş saatler (id 5401-5424). Kırmızı kısa = akrep, mavi uzun = yelkovan.
// 36 soru: 12 tam saat + 24 buçuk/tam ayrımı.
import { ConceptRound, ActivityType } from '../../../../types';

export const saatDataYeni: ConceptRound[] = [
    { // tam saat
        id: 1,
        question: "Hangi saat biri gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat biri gösteriyor?', correct: 'Evet! Saat bir.', wrong: 'Hayır, bu saat yediyi gösteriyor.' } },
        options: [
            { id: 5401, word: "saat bir", imageUrl: "/images/5401.webp", isCorrect: true, audioKey: "saat bir", spokenText: "saat bir" },
            { id: 5413, word: "saat yedi", imageUrl: "/images/5413.webp", isCorrect: false, audioKey: "saat yedi", spokenText: "saat yedi" }
        ]
    },
    { // tam saat
        id: 2,
        question: "Hangi saat ikiyi gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat ikiyi gösteriyor?', correct: 'Evet! Saat iki.', wrong: 'Hayır, bu saat sekizi gösteriyor.' } },
        options: [
            { id: 5403, word: "saat iki", imageUrl: "/images/5403.webp", isCorrect: true, audioKey: "saat iki", spokenText: "saat iki" },
            { id: 5415, word: "saat sekiz", imageUrl: "/images/5415.webp", isCorrect: false, audioKey: "saat sekiz", spokenText: "saat sekiz" }
        ]
    },
    { // tam saat
        id: 3,
        question: "Hangi saat üçü gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat üçü gösteriyor?', correct: 'Evet! Saat üç.', wrong: 'Hayır, bu saat dokuzu gösteriyor.' } },
        options: [
            { id: 5405, word: "saat üç", imageUrl: "/images/5405.webp", isCorrect: true, audioKey: "saat üç", spokenText: "saat üç" },
            { id: 5417, word: "saat dokuz", imageUrl: "/images/5417.webp", isCorrect: false, audioKey: "saat dokuz", spokenText: "saat dokuz" }
        ]
    },
    { // tam saat
        id: 4,
        question: "Hangi saat dördü gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat dördü gösteriyor?', correct: 'Evet! Saat dört.', wrong: 'Hayır, bu saat onu gösteriyor.' } },
        options: [
            { id: 5407, word: "saat dört", imageUrl: "/images/5407.webp", isCorrect: true, audioKey: "saat dört", spokenText: "saat dört" },
            { id: 5419, word: "saat on", imageUrl: "/images/5419.webp", isCorrect: false, audioKey: "saat on", spokenText: "saat on" }
        ]
    },
    { // tam saat
        id: 5,
        question: "Hangi saat beşi gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat beşi gösteriyor?', correct: 'Evet! Saat beş.', wrong: 'Hayır, bu saat on biri gösteriyor.' } },
        options: [
            { id: 5409, word: "saat beş", imageUrl: "/images/5409.webp", isCorrect: true, audioKey: "saat beş", spokenText: "saat beş" },
            { id: 5421, word: "saat on bir", imageUrl: "/images/5421.webp", isCorrect: false, audioKey: "saat on bir", spokenText: "saat on bir" }
        ]
    },
    { // tam saat
        id: 6,
        question: "Hangi saat altıyı gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat altıyı gösteriyor?', correct: 'Evet! Saat altı.', wrong: 'Hayır, bu saat on ikiyi gösteriyor.' } },
        options: [
            { id: 5411, word: "saat altı", imageUrl: "/images/5411.webp", isCorrect: true, audioKey: "saat altı", spokenText: "saat altı" },
            { id: 5423, word: "saat on iki", imageUrl: "/images/5423.webp", isCorrect: false, audioKey: "saat on iki", spokenText: "saat on iki" }
        ]
    },
    { // tam saat
        id: 7,
        question: "Hangi saat yediyi gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat yediyi gösteriyor?', correct: 'Evet! Saat yedi.', wrong: 'Hayır, bu saat biri gösteriyor.' } },
        options: [
            { id: 5413, word: "saat yedi", imageUrl: "/images/5413.webp", isCorrect: true, audioKey: "saat yedi", spokenText: "saat yedi" },
            { id: 5401, word: "saat bir", imageUrl: "/images/5401.webp", isCorrect: false, audioKey: "saat bir", spokenText: "saat bir" }
        ]
    },
    { // tam saat
        id: 8,
        question: "Hangi saat sekizi gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat sekizi gösteriyor?', correct: 'Evet! Saat sekiz.', wrong: 'Hayır, bu saat ikiyi gösteriyor.' } },
        options: [
            { id: 5415, word: "saat sekiz", imageUrl: "/images/5415.webp", isCorrect: true, audioKey: "saat sekiz", spokenText: "saat sekiz" },
            { id: 5403, word: "saat iki", imageUrl: "/images/5403.webp", isCorrect: false, audioKey: "saat iki", spokenText: "saat iki" }
        ]
    },
    { // tam saat
        id: 9,
        question: "Hangi saat dokuzu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat dokuzu gösteriyor?', correct: 'Evet! Saat dokuz.', wrong: 'Hayır, bu saat üçü gösteriyor.' } },
        options: [
            { id: 5417, word: "saat dokuz", imageUrl: "/images/5417.webp", isCorrect: true, audioKey: "saat dokuz", spokenText: "saat dokuz" },
            { id: 5405, word: "saat üç", imageUrl: "/images/5405.webp", isCorrect: false, audioKey: "saat üç", spokenText: "saat üç" }
        ]
    },
    { // tam saat
        id: 10,
        question: "Hangi saat onu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat onu gösteriyor?', correct: 'Evet! Saat on.', wrong: 'Hayır, bu saat dördü gösteriyor.' } },
        options: [
            { id: 5419, word: "saat on", imageUrl: "/images/5419.webp", isCorrect: true, audioKey: "saat on", spokenText: "saat on" },
            { id: 5407, word: "saat dört", imageUrl: "/images/5407.webp", isCorrect: false, audioKey: "saat dört", spokenText: "saat dört" }
        ]
    },
    { // tam saat
        id: 11,
        question: "Hangi saat on biri gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat on biri gösteriyor?', correct: 'Evet! Saat on bir.', wrong: 'Hayır, bu saat beşi gösteriyor.' } },
        options: [
            { id: 5421, word: "saat on bir", imageUrl: "/images/5421.webp", isCorrect: true, audioKey: "saat on bir", spokenText: "saat on bir" },
            { id: 5409, word: "saat beş", imageUrl: "/images/5409.webp", isCorrect: false, audioKey: "saat beş", spokenText: "saat beş" }
        ]
    },
    { // tam saat
        id: 12,
        question: "Hangi saat on ikiyi gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat on ikiyi gösteriyor?', correct: 'Evet! Saat on iki.', wrong: 'Hayır, bu saat altıyı gösteriyor.' } },
        options: [
            { id: 5423, word: "saat on iki", imageUrl: "/images/5423.webp", isCorrect: true, audioKey: "saat on iki", spokenText: "saat on iki" },
            { id: 5411, word: "saat altı", imageUrl: "/images/5411.webp", isCorrect: false, audioKey: "saat altı", spokenText: "saat altı" }
        ]
    },
    { // buçuk
        id: 13,
        question: "Hangi saat bir buçuğu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat bir buçuğu gösteriyor?', correct: 'Evet! Saat bir buçuk.', wrong: 'Hayır, bu saat biri gösteriyor.' } },
        options: [
            { id: 5402, word: "saat bir buçuk", imageUrl: "/images/5402.webp", isCorrect: true, audioKey: "saat bir buçuk", spokenText: "saat bir buçuk" },
            { id: 5401, word: "saat bir", imageUrl: "/images/5401.webp", isCorrect: false, audioKey: "saat bir", spokenText: "saat bir" }
        ]
    },
    { // buçuk
        id: 14,
        question: "Hangi saat biri gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat biri gösteriyor?', correct: 'Evet! Saat bir.', wrong: 'Hayır, bu saat bir buçuğu gösteriyor.' } },
        options: [
            { id: 5401, word: "saat bir", imageUrl: "/images/5401.webp", isCorrect: true, audioKey: "saat bir", spokenText: "saat bir" },
            { id: 5402, word: "saat bir buçuk", imageUrl: "/images/5402.webp", isCorrect: false, audioKey: "saat bir buçuk", spokenText: "saat bir buçuk" }
        ]
    },
    { // buçuk
        id: 15,
        question: "Hangi saat iki buçuğu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat iki buçuğu gösteriyor?', correct: 'Evet! Saat iki buçuk.', wrong: 'Hayır, bu saat ikiyi gösteriyor.' } },
        options: [
            { id: 5404, word: "saat iki buçuk", imageUrl: "/images/5404.webp", isCorrect: true, audioKey: "saat iki buçuk", spokenText: "saat iki buçuk" },
            { id: 5403, word: "saat iki", imageUrl: "/images/5403.webp", isCorrect: false, audioKey: "saat iki", spokenText: "saat iki" }
        ]
    },
    { // buçuk
        id: 16,
        question: "Hangi saat ikiyi gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat ikiyi gösteriyor?', correct: 'Evet! Saat iki.', wrong: 'Hayır, bu saat iki buçuğu gösteriyor.' } },
        options: [
            { id: 5403, word: "saat iki", imageUrl: "/images/5403.webp", isCorrect: true, audioKey: "saat iki", spokenText: "saat iki" },
            { id: 5404, word: "saat iki buçuk", imageUrl: "/images/5404.webp", isCorrect: false, audioKey: "saat iki buçuk", spokenText: "saat iki buçuk" }
        ]
    },
    { // buçuk
        id: 17,
        question: "Hangi saat üç buçuğu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat üç buçuğu gösteriyor?', correct: 'Evet! Saat üç buçuk.', wrong: 'Hayır, bu saat üçü gösteriyor.' } },
        options: [
            { id: 5406, word: "saat üç buçuk", imageUrl: "/images/5406.webp", isCorrect: true, audioKey: "saat üç buçuk", spokenText: "saat üç buçuk" },
            { id: 5405, word: "saat üç", imageUrl: "/images/5405.webp", isCorrect: false, audioKey: "saat üç", spokenText: "saat üç" }
        ]
    },
    { // buçuk
        id: 18,
        question: "Hangi saat üçü gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat üçü gösteriyor?', correct: 'Evet! Saat üç.', wrong: 'Hayır, bu saat üç buçuğu gösteriyor.' } },
        options: [
            { id: 5405, word: "saat üç", imageUrl: "/images/5405.webp", isCorrect: true, audioKey: "saat üç", spokenText: "saat üç" },
            { id: 5406, word: "saat üç buçuk", imageUrl: "/images/5406.webp", isCorrect: false, audioKey: "saat üç buçuk", spokenText: "saat üç buçuk" }
        ]
    },
    { // buçuk
        id: 19,
        question: "Hangi saat dört buçuğu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat dört buçuğu gösteriyor?', correct: 'Evet! Saat dört buçuk.', wrong: 'Hayır, bu saat dördü gösteriyor.' } },
        options: [
            { id: 5408, word: "saat dört buçuk", imageUrl: "/images/5408.webp", isCorrect: true, audioKey: "saat dört buçuk", spokenText: "saat dört buçuk" },
            { id: 5407, word: "saat dört", imageUrl: "/images/5407.webp", isCorrect: false, audioKey: "saat dört", spokenText: "saat dört" }
        ]
    },
    { // buçuk
        id: 20,
        question: "Hangi saat dördü gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat dördü gösteriyor?', correct: 'Evet! Saat dört.', wrong: 'Hayır, bu saat dört buçuğu gösteriyor.' } },
        options: [
            { id: 5407, word: "saat dört", imageUrl: "/images/5407.webp", isCorrect: true, audioKey: "saat dört", spokenText: "saat dört" },
            { id: 5408, word: "saat dört buçuk", imageUrl: "/images/5408.webp", isCorrect: false, audioKey: "saat dört buçuk", spokenText: "saat dört buçuk" }
        ]
    },
    { // buçuk
        id: 21,
        question: "Hangi saat beş buçuğu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat beş buçuğu gösteriyor?', correct: 'Evet! Saat beş buçuk.', wrong: 'Hayır, bu saat beşi gösteriyor.' } },
        options: [
            { id: 5410, word: "saat beş buçuk", imageUrl: "/images/5410.webp", isCorrect: true, audioKey: "saat beş buçuk", spokenText: "saat beş buçuk" },
            { id: 5409, word: "saat beş", imageUrl: "/images/5409.webp", isCorrect: false, audioKey: "saat beş", spokenText: "saat beş" }
        ]
    },
    { // buçuk
        id: 22,
        question: "Hangi saat beşi gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat beşi gösteriyor?', correct: 'Evet! Saat beş.', wrong: 'Hayır, bu saat beş buçuğu gösteriyor.' } },
        options: [
            { id: 5409, word: "saat beş", imageUrl: "/images/5409.webp", isCorrect: true, audioKey: "saat beş", spokenText: "saat beş" },
            { id: 5410, word: "saat beş buçuk", imageUrl: "/images/5410.webp", isCorrect: false, audioKey: "saat beş buçuk", spokenText: "saat beş buçuk" }
        ]
    },
    { // buçuk
        id: 23,
        question: "Hangi saat altı buçuğu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat altı buçuğu gösteriyor?', correct: 'Evet! Saat altı buçuk.', wrong: 'Hayır, bu saat altıyı gösteriyor.' } },
        options: [
            { id: 5412, word: "saat altı buçuk", imageUrl: "/images/5412.webp", isCorrect: true, audioKey: "saat altı buçuk", spokenText: "saat altı buçuk" },
            { id: 5411, word: "saat altı", imageUrl: "/images/5411.webp", isCorrect: false, audioKey: "saat altı", spokenText: "saat altı" }
        ]
    },
    { // buçuk
        id: 24,
        question: "Hangi saat altıyı gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat altıyı gösteriyor?', correct: 'Evet! Saat altı.', wrong: 'Hayır, bu saat altı buçuğu gösteriyor.' } },
        options: [
            { id: 5411, word: "saat altı", imageUrl: "/images/5411.webp", isCorrect: true, audioKey: "saat altı", spokenText: "saat altı" },
            { id: 5412, word: "saat altı buçuk", imageUrl: "/images/5412.webp", isCorrect: false, audioKey: "saat altı buçuk", spokenText: "saat altı buçuk" }
        ]
    },
    { // buçuk
        id: 25,
        question: "Hangi saat yedi buçuğu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat yedi buçuğu gösteriyor?', correct: 'Evet! Saat yedi buçuk.', wrong: 'Hayır, bu saat yediyi gösteriyor.' } },
        options: [
            { id: 5414, word: "saat yedi buçuk", imageUrl: "/images/5414.webp", isCorrect: true, audioKey: "saat yedi buçuk", spokenText: "saat yedi buçuk" },
            { id: 5413, word: "saat yedi", imageUrl: "/images/5413.webp", isCorrect: false, audioKey: "saat yedi", spokenText: "saat yedi" }
        ]
    },
    { // buçuk
        id: 26,
        question: "Hangi saat yediyi gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat yediyi gösteriyor?', correct: 'Evet! Saat yedi.', wrong: 'Hayır, bu saat yedi buçuğu gösteriyor.' } },
        options: [
            { id: 5413, word: "saat yedi", imageUrl: "/images/5413.webp", isCorrect: true, audioKey: "saat yedi", spokenText: "saat yedi" },
            { id: 5414, word: "saat yedi buçuk", imageUrl: "/images/5414.webp", isCorrect: false, audioKey: "saat yedi buçuk", spokenText: "saat yedi buçuk" }
        ]
    },
    { // buçuk
        id: 27,
        question: "Hangi saat sekiz buçuğu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat sekiz buçuğu gösteriyor?', correct: 'Evet! Saat sekiz buçuk.', wrong: 'Hayır, bu saat sekizi gösteriyor.' } },
        options: [
            { id: 5416, word: "saat sekiz buçuk", imageUrl: "/images/5416.webp", isCorrect: true, audioKey: "saat sekiz buçuk", spokenText: "saat sekiz buçuk" },
            { id: 5415, word: "saat sekiz", imageUrl: "/images/5415.webp", isCorrect: false, audioKey: "saat sekiz", spokenText: "saat sekiz" }
        ]
    },
    { // buçuk
        id: 28,
        question: "Hangi saat sekizi gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat sekizi gösteriyor?', correct: 'Evet! Saat sekiz.', wrong: 'Hayır, bu saat sekiz buçuğu gösteriyor.' } },
        options: [
            { id: 5415, word: "saat sekiz", imageUrl: "/images/5415.webp", isCorrect: true, audioKey: "saat sekiz", spokenText: "saat sekiz" },
            { id: 5416, word: "saat sekiz buçuk", imageUrl: "/images/5416.webp", isCorrect: false, audioKey: "saat sekiz buçuk", spokenText: "saat sekiz buçuk" }
        ]
    },
    { // buçuk
        id: 29,
        question: "Hangi saat dokuz buçuğu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat dokuz buçuğu gösteriyor?', correct: 'Evet! Saat dokuz buçuk.', wrong: 'Hayır, bu saat dokuzu gösteriyor.' } },
        options: [
            { id: 5418, word: "saat dokuz buçuk", imageUrl: "/images/5418.webp", isCorrect: true, audioKey: "saat dokuz buçuk", spokenText: "saat dokuz buçuk" },
            { id: 5417, word: "saat dokuz", imageUrl: "/images/5417.webp", isCorrect: false, audioKey: "saat dokuz", spokenText: "saat dokuz" }
        ]
    },
    { // buçuk
        id: 30,
        question: "Hangi saat dokuzu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat dokuzu gösteriyor?', correct: 'Evet! Saat dokuz.', wrong: 'Hayır, bu saat dokuz buçuğu gösteriyor.' } },
        options: [
            { id: 5417, word: "saat dokuz", imageUrl: "/images/5417.webp", isCorrect: true, audioKey: "saat dokuz", spokenText: "saat dokuz" },
            { id: 5418, word: "saat dokuz buçuk", imageUrl: "/images/5418.webp", isCorrect: false, audioKey: "saat dokuz buçuk", spokenText: "saat dokuz buçuk" }
        ]
    },
    { // buçuk
        id: 31,
        question: "Hangi saat on buçuğu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat on buçuğu gösteriyor?', correct: 'Evet! Saat on buçuk.', wrong: 'Hayır, bu saat onu gösteriyor.' } },
        options: [
            { id: 5420, word: "saat on buçuk", imageUrl: "/images/5420.webp", isCorrect: true, audioKey: "saat on buçuk", spokenText: "saat on buçuk" },
            { id: 5419, word: "saat on", imageUrl: "/images/5419.webp", isCorrect: false, audioKey: "saat on", spokenText: "saat on" }
        ]
    },
    { // buçuk
        id: 32,
        question: "Hangi saat onu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat onu gösteriyor?', correct: 'Evet! Saat on.', wrong: 'Hayır, bu saat on buçuğu gösteriyor.' } },
        options: [
            { id: 5419, word: "saat on", imageUrl: "/images/5419.webp", isCorrect: true, audioKey: "saat on", spokenText: "saat on" },
            { id: 5420, word: "saat on buçuk", imageUrl: "/images/5420.webp", isCorrect: false, audioKey: "saat on buçuk", spokenText: "saat on buçuk" }
        ]
    },
    { // buçuk
        id: 33,
        question: "Hangi saat on bir buçuğu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat on bir buçuğu gösteriyor?', correct: 'Evet! Saat on bir buçuk.', wrong: 'Hayır, bu saat on biri gösteriyor.' } },
        options: [
            { id: 5422, word: "saat on bir buçuk", imageUrl: "/images/5422.webp", isCorrect: true, audioKey: "saat on bir buçuk", spokenText: "saat on bir buçuk" },
            { id: 5421, word: "saat on bir", imageUrl: "/images/5421.webp", isCorrect: false, audioKey: "saat on bir", spokenText: "saat on bir" }
        ]
    },
    { // buçuk
        id: 34,
        question: "Hangi saat on biri gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat on biri gösteriyor?', correct: 'Evet! Saat on bir.', wrong: 'Hayır, bu saat on bir buçuğu gösteriyor.' } },
        options: [
            { id: 5421, word: "saat on bir", imageUrl: "/images/5421.webp", isCorrect: true, audioKey: "saat on bir", spokenText: "saat on bir" },
            { id: 5422, word: "saat on bir buçuk", imageUrl: "/images/5422.webp", isCorrect: false, audioKey: "saat on bir buçuk", spokenText: "saat on bir buçuk" }
        ]
    },
    { // buçuk
        id: 35,
        question: "Hangi saat on iki buçuğu gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat on iki buçuğu gösteriyor?', correct: 'Evet! Saat on iki buçuk.', wrong: 'Hayır, bu saat on ikiyi gösteriyor.' } },
        options: [
            { id: 5424, word: "saat on iki buçuk", imageUrl: "/images/5424.webp", isCorrect: true, audioKey: "saat on iki buçuk", spokenText: "saat on iki buçuk" },
            { id: 5423, word: "saat on iki", imageUrl: "/images/5423.webp", isCorrect: false, audioKey: "saat on iki", spokenText: "saat on iki" }
        ]
    },
    { // buçuk
        id: 36,
        question: "Hangi saat on ikiyi gösteriyor?",
        questionAudioKey: "",
        activityType: ActivityType.ClockLearning,
        speech: { tr: { question: 'Hangi saat on ikiyi gösteriyor?', correct: 'Evet! Saat on iki.', wrong: 'Hayır, bu saat on iki buçuğu gösteriyor.' } },
        options: [
            { id: 5423, word: "saat on iki", imageUrl: "/images/5423.webp", isCorrect: true, audioKey: "saat on iki", spokenText: "saat on iki" },
            { id: 5424, word: "saat on iki buçuk", imageUrl: "/images/5424.webp", isCorrect: false, audioKey: "saat on iki buçuk", spokenText: "saat on iki buçuk" }
        ]
    }
];
