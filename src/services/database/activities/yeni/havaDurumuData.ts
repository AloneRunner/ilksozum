// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (hava). Elle düzenleme.
// 16 çift, 32 soru. Görseller: gorsel-ham/hava/ → id 6901-6916.
import { ConceptRound, ActivityType } from '../../../../types';

export const havaDurumuDataYeni: ConceptRound[] = [
    // çocuk
    {
        id: 1,
        question: "Hangi resimde hava güneşli?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde hava güneşli?', correct: 'Evet! Burada hava güneşli.', wrong: 'Hayır, burada yağmur yağıyor.' }
        },
        options: [
            { id: 6901, word: "çocuk", imageUrl: "/images/6901.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6904, word: "çocuk", imageUrl: "/images/6904.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 2,
        question: "Hangi resimde yağmur yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde yağmur yağıyor?', correct: 'Evet! Burada yağmur yağıyor.', wrong: 'Hayır, burada hava güneşli.' }
        },
        options: [
            { id: 6904, word: "çocuk", imageUrl: "/images/6904.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6901, word: "çocuk", imageUrl: "/images/6901.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 3,
        question: "Hangi resimde hava güneşli?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde hava güneşli?', correct: 'Evet! Burada hava güneşli.', wrong: 'Hayır, burada kar yağıyor.' }
        },
        options: [
            { id: 6901, word: "çocuk", imageUrl: "/images/6901.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6902, word: "çocuk", imageUrl: "/images/6902.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 4,
        question: "Hangi resimde kar yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde kar yağıyor?', correct: 'Evet! Burada kar yağıyor.', wrong: 'Hayır, burada hava güneşli.' }
        },
        options: [
            { id: 6902, word: "çocuk", imageUrl: "/images/6902.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6901, word: "çocuk", imageUrl: "/images/6901.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 5,
        question: "Hangi resimde hava güneşli?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde hava güneşli?', correct: 'Evet! Burada hava güneşli.', wrong: 'Hayır, burada rüzgâr esiyor.' }
        },
        options: [
            { id: 6901, word: "çocuk", imageUrl: "/images/6901.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6903, word: "çocuk", imageUrl: "/images/6903.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 6,
        question: "Hangi resimde rüzgâr esiyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde rüzgâr esiyor?', correct: 'Evet! Burada rüzgâr esiyor.', wrong: 'Hayır, burada hava güneşli.' }
        },
        options: [
            { id: 6903, word: "çocuk", imageUrl: "/images/6903.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6901, word: "çocuk", imageUrl: "/images/6901.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 7,
        question: "Hangi resimde yağmur yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde yağmur yağıyor?', correct: 'Evet! Burada yağmur yağıyor.', wrong: 'Hayır, burada kar yağıyor.' }
        },
        options: [
            { id: 6904, word: "çocuk", imageUrl: "/images/6904.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6902, word: "çocuk", imageUrl: "/images/6902.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 8,
        question: "Hangi resimde kar yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde kar yağıyor?', correct: 'Evet! Burada kar yağıyor.', wrong: 'Hayır, burada yağmur yağıyor.' }
        },
        options: [
            { id: 6902, word: "çocuk", imageUrl: "/images/6902.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6904, word: "çocuk", imageUrl: "/images/6904.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // ev
    {
        id: 9,
        question: "Hangi resimde hava güneşli?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde hava güneşli?', correct: 'Evet! Burada hava güneşli.', wrong: 'Hayır, burada yağmur yağıyor.' }
        },
        options: [
            { id: 6905, word: "ev", imageUrl: "/images/6905.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 6908, word: "ev", imageUrl: "/images/6908.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    {
        id: 10,
        question: "Hangi resimde yağmur yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde yağmur yağıyor?', correct: 'Evet! Burada yağmur yağıyor.', wrong: 'Hayır, burada hava güneşli.' }
        },
        options: [
            { id: 6908, word: "ev", imageUrl: "/images/6908.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 6905, word: "ev", imageUrl: "/images/6905.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    {
        id: 11,
        question: "Hangi resimde hava güneşli?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde hava güneşli?', correct: 'Evet! Burada hava güneşli.', wrong: 'Hayır, burada kar yağıyor.' }
        },
        options: [
            { id: 6905, word: "ev", imageUrl: "/images/6905.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 6906, word: "ev", imageUrl: "/images/6906.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    {
        id: 12,
        question: "Hangi resimde kar yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde kar yağıyor?', correct: 'Evet! Burada kar yağıyor.', wrong: 'Hayır, burada hava güneşli.' }
        },
        options: [
            { id: 6906, word: "ev", imageUrl: "/images/6906.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 6905, word: "ev", imageUrl: "/images/6905.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    {
        id: 13,
        question: "Hangi resimde hava güneşli?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde hava güneşli?', correct: 'Evet! Burada hava güneşli.', wrong: 'Hayır, burada rüzgâr esiyor.' }
        },
        options: [
            { id: 6905, word: "ev", imageUrl: "/images/6905.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 6907, word: "ev", imageUrl: "/images/6907.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    {
        id: 14,
        question: "Hangi resimde rüzgâr esiyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde rüzgâr esiyor?', correct: 'Evet! Burada rüzgâr esiyor.', wrong: 'Hayır, burada hava güneşli.' }
        },
        options: [
            { id: 6907, word: "ev", imageUrl: "/images/6907.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 6905, word: "ev", imageUrl: "/images/6905.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    {
        id: 15,
        question: "Hangi resimde yağmur yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde yağmur yağıyor?', correct: 'Evet! Burada yağmur yağıyor.', wrong: 'Hayır, burada kar yağıyor.' }
        },
        options: [
            { id: 6908, word: "ev", imageUrl: "/images/6908.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 6906, word: "ev", imageUrl: "/images/6906.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    {
        id: 16,
        question: "Hangi resimde kar yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde kar yağıyor?', correct: 'Evet! Burada kar yağıyor.', wrong: 'Hayır, burada yağmur yağıyor.' }
        },
        options: [
            { id: 6906, word: "ev", imageUrl: "/images/6906.webp", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 6908, word: "ev", imageUrl: "/images/6908.webp", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    // oyun parkı
    {
        id: 17,
        question: "Hangi resimde hava güneşli?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde hava güneşli?', correct: 'Evet! Burada hava güneşli.', wrong: 'Hayır, burada yağmur yağıyor.' }
        },
        options: [
            { id: 6909, word: "oyun parkı", imageUrl: "/images/6909.webp", isCorrect: true, audioKey: "oyun parkı", spokenText: "oyun parkı" },
            { id: 6912, word: "oyun parkı", imageUrl: "/images/6912.webp", isCorrect: false, audioKey: "oyun parkı", spokenText: "oyun parkı" }
        ]
    },
    {
        id: 18,
        question: "Hangi resimde yağmur yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde yağmur yağıyor?', correct: 'Evet! Burada yağmur yağıyor.', wrong: 'Hayır, burada hava güneşli.' }
        },
        options: [
            { id: 6912, word: "oyun parkı", imageUrl: "/images/6912.webp", isCorrect: true, audioKey: "oyun parkı", spokenText: "oyun parkı" },
            { id: 6909, word: "oyun parkı", imageUrl: "/images/6909.webp", isCorrect: false, audioKey: "oyun parkı", spokenText: "oyun parkı" }
        ]
    },
    {
        id: 19,
        question: "Hangi resimde hava güneşli?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde hava güneşli?', correct: 'Evet! Burada hava güneşli.', wrong: 'Hayır, burada kar yağıyor.' }
        },
        options: [
            { id: 6909, word: "oyun parkı", imageUrl: "/images/6909.webp", isCorrect: true, audioKey: "oyun parkı", spokenText: "oyun parkı" },
            { id: 6910, word: "oyun parkı", imageUrl: "/images/6910.webp", isCorrect: false, audioKey: "oyun parkı", spokenText: "oyun parkı" }
        ]
    },
    {
        id: 20,
        question: "Hangi resimde kar yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde kar yağıyor?', correct: 'Evet! Burada kar yağıyor.', wrong: 'Hayır, burada hava güneşli.' }
        },
        options: [
            { id: 6910, word: "oyun parkı", imageUrl: "/images/6910.webp", isCorrect: true, audioKey: "oyun parkı", spokenText: "oyun parkı" },
            { id: 6909, word: "oyun parkı", imageUrl: "/images/6909.webp", isCorrect: false, audioKey: "oyun parkı", spokenText: "oyun parkı" }
        ]
    },
    {
        id: 21,
        question: "Hangi resimde hava güneşli?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde hava güneşli?', correct: 'Evet! Burada hava güneşli.', wrong: 'Hayır, burada rüzgâr esiyor.' }
        },
        options: [
            { id: 6909, word: "oyun parkı", imageUrl: "/images/6909.webp", isCorrect: true, audioKey: "oyun parkı", spokenText: "oyun parkı" },
            { id: 6911, word: "oyun parkı", imageUrl: "/images/6911.webp", isCorrect: false, audioKey: "oyun parkı", spokenText: "oyun parkı" }
        ]
    },
    {
        id: 22,
        question: "Hangi resimde rüzgâr esiyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde rüzgâr esiyor?', correct: 'Evet! Burada rüzgâr esiyor.', wrong: 'Hayır, burada hava güneşli.' }
        },
        options: [
            { id: 6911, word: "oyun parkı", imageUrl: "/images/6911.webp", isCorrect: true, audioKey: "oyun parkı", spokenText: "oyun parkı" },
            { id: 6909, word: "oyun parkı", imageUrl: "/images/6909.webp", isCorrect: false, audioKey: "oyun parkı", spokenText: "oyun parkı" }
        ]
    },
    {
        id: 23,
        question: "Hangi resimde yağmur yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde yağmur yağıyor?', correct: 'Evet! Burada yağmur yağıyor.', wrong: 'Hayır, burada kar yağıyor.' }
        },
        options: [
            { id: 6912, word: "oyun parkı", imageUrl: "/images/6912.webp", isCorrect: true, audioKey: "oyun parkı", spokenText: "oyun parkı" },
            { id: 6910, word: "oyun parkı", imageUrl: "/images/6910.webp", isCorrect: false, audioKey: "oyun parkı", spokenText: "oyun parkı" }
        ]
    },
    {
        id: 24,
        question: "Hangi resimde kar yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde kar yağıyor?', correct: 'Evet! Burada kar yağıyor.', wrong: 'Hayır, burada yağmur yağıyor.' }
        },
        options: [
            { id: 6910, word: "oyun parkı", imageUrl: "/images/6910.webp", isCorrect: true, audioKey: "oyun parkı", spokenText: "oyun parkı" },
            { id: 6912, word: "oyun parkı", imageUrl: "/images/6912.webp", isCorrect: false, audioKey: "oyun parkı", spokenText: "oyun parkı" }
        ]
    },
    // park yolu
    {
        id: 25,
        question: "Hangi resimde hava güneşli?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde hava güneşli?', correct: 'Evet! Burada hava güneşli.', wrong: 'Hayır, burada yağmur yağıyor.' }
        },
        options: [
            { id: 6913, word: "park yolu", imageUrl: "/images/6913.webp", isCorrect: true, audioKey: "park yolu", spokenText: "park yolu" },
            { id: 6916, word: "park yolu", imageUrl: "/images/6916.webp", isCorrect: false, audioKey: "park yolu", spokenText: "park yolu" }
        ]
    },
    {
        id: 26,
        question: "Hangi resimde yağmur yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde yağmur yağıyor?', correct: 'Evet! Burada yağmur yağıyor.', wrong: 'Hayır, burada hava güneşli.' }
        },
        options: [
            { id: 6916, word: "park yolu", imageUrl: "/images/6916.webp", isCorrect: true, audioKey: "park yolu", spokenText: "park yolu" },
            { id: 6913, word: "park yolu", imageUrl: "/images/6913.webp", isCorrect: false, audioKey: "park yolu", spokenText: "park yolu" }
        ]
    },
    {
        id: 27,
        question: "Hangi resimde hava güneşli?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde hava güneşli?', correct: 'Evet! Burada hava güneşli.', wrong: 'Hayır, burada kar yağıyor.' }
        },
        options: [
            { id: 6913, word: "park yolu", imageUrl: "/images/6913.webp", isCorrect: true, audioKey: "park yolu", spokenText: "park yolu" },
            { id: 6914, word: "park yolu", imageUrl: "/images/6914.webp", isCorrect: false, audioKey: "park yolu", spokenText: "park yolu" }
        ]
    },
    {
        id: 28,
        question: "Hangi resimde kar yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde kar yağıyor?', correct: 'Evet! Burada kar yağıyor.', wrong: 'Hayır, burada hava güneşli.' }
        },
        options: [
            { id: 6914, word: "park yolu", imageUrl: "/images/6914.webp", isCorrect: true, audioKey: "park yolu", spokenText: "park yolu" },
            { id: 6913, word: "park yolu", imageUrl: "/images/6913.webp", isCorrect: false, audioKey: "park yolu", spokenText: "park yolu" }
        ]
    },
    {
        id: 29,
        question: "Hangi resimde hava güneşli?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde hava güneşli?', correct: 'Evet! Burada hava güneşli.', wrong: 'Hayır, burada rüzgâr esiyor.' }
        },
        options: [
            { id: 6913, word: "park yolu", imageUrl: "/images/6913.webp", isCorrect: true, audioKey: "park yolu", spokenText: "park yolu" },
            { id: 6915, word: "park yolu", imageUrl: "/images/6915.webp", isCorrect: false, audioKey: "park yolu", spokenText: "park yolu" }
        ]
    },
    {
        id: 30,
        question: "Hangi resimde rüzgâr esiyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde rüzgâr esiyor?', correct: 'Evet! Burada rüzgâr esiyor.', wrong: 'Hayır, burada hava güneşli.' }
        },
        options: [
            { id: 6915, word: "park yolu", imageUrl: "/images/6915.webp", isCorrect: true, audioKey: "park yolu", spokenText: "park yolu" },
            { id: 6913, word: "park yolu", imageUrl: "/images/6913.webp", isCorrect: false, audioKey: "park yolu", spokenText: "park yolu" }
        ]
    },
    {
        id: 31,
        question: "Hangi resimde yağmur yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde yağmur yağıyor?', correct: 'Evet! Burada yağmur yağıyor.', wrong: 'Hayır, burada kar yağıyor.' }
        },
        options: [
            { id: 6916, word: "park yolu", imageUrl: "/images/6916.webp", isCorrect: true, audioKey: "park yolu", spokenText: "park yolu" },
            { id: 6914, word: "park yolu", imageUrl: "/images/6914.webp", isCorrect: false, audioKey: "park yolu", spokenText: "park yolu" }
        ]
    },
    {
        id: 32,
        question: "Hangi resimde kar yağıyor?",
        questionAudioKey: "",
        activityType: ActivityType.HavaDurumu,
        speech: {
            tr: { question: 'Hangi resimde kar yağıyor?', correct: 'Evet! Burada kar yağıyor.', wrong: 'Hayır, burada yağmur yağıyor.' }
        },
        options: [
            { id: 6914, word: "park yolu", imageUrl: "/images/6914.webp", isCorrect: true, audioKey: "park yolu", spokenText: "park yolu" },
            { id: 6916, word: "park yolu", imageUrl: "/images/6916.webp", isCorrect: false, audioKey: "park yolu", spokenText: "park yolu" }
        ]
    },
];
