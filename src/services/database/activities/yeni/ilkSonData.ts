// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (ilk-son). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/ilk-son/ → id 7001-7020.
import { ConceptRound, ActivityType } from '../../../../types';

export const ilkSonDataYeni: ConceptRound[] = [
    // yeşil araba
    {
        id: 1,
        question: "Hangi resimde yeşil araba ilk sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde yeşil araba ilk sırada?', correct: 'Evet! Burada yeşil araba ilk sırada.', wrong: 'Hayır, burada yeşil araba son sırada.' }
        },
        options: [
            { id: 7001, word: "yeşil araba", imageUrl: "/images/7001.webp", isCorrect: true, audioKey: "yeşil araba", spokenText: "yeşil araba" },
            { id: 7002, word: "yeşil araba", imageUrl: "/images/7002.webp", isCorrect: false, audioKey: "yeşil araba", spokenText: "yeşil araba" }
        ]
    },
    {
        id: 2,
        question: "Hangi resimde yeşil araba son sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde yeşil araba son sırada?', correct: 'Evet! Burada yeşil araba son sırada.', wrong: 'Hayır, burada yeşil araba ilk sırada.' }
        },
        options: [
            { id: 7002, word: "yeşil araba", imageUrl: "/images/7002.webp", isCorrect: true, audioKey: "yeşil araba", spokenText: "yeşil araba" },
            { id: 7001, word: "yeşil araba", imageUrl: "/images/7001.webp", isCorrect: false, audioKey: "yeşil araba", spokenText: "yeşil araba" }
        ]
    },
    // kırmızı araba
    {
        id: 3,
        question: "Hangi resimde kırmızı araba ilk sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde kırmızı araba ilk sırada?', correct: 'Evet! Burada kırmızı araba ilk sırada.', wrong: 'Hayır, burada kırmızı araba son sırada.' }
        },
        options: [
            { id: 7003, word: "kırmızı araba", imageUrl: "/images/7003.webp", isCorrect: true, audioKey: "kırmızı araba", spokenText: "kırmızı araba" },
            { id: 7004, word: "kırmızı araba", imageUrl: "/images/7004.webp", isCorrect: false, audioKey: "kırmızı araba", spokenText: "kırmızı araba" }
        ]
    },
    {
        id: 4,
        question: "Hangi resimde kırmızı araba son sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde kırmızı araba son sırada?', correct: 'Evet! Burada kırmızı araba son sırada.', wrong: 'Hayır, burada kırmızı araba ilk sırada.' }
        },
        options: [
            { id: 7004, word: "kırmızı araba", imageUrl: "/images/7004.webp", isCorrect: true, audioKey: "kırmızı araba", spokenText: "kırmızı araba" },
            { id: 7003, word: "kırmızı araba", imageUrl: "/images/7003.webp", isCorrect: false, audioKey: "kırmızı araba", spokenText: "kırmızı araba" }
        ]
    },
    // mavi araba
    {
        id: 5,
        question: "Hangi resimde mavi araba ilk sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde mavi araba ilk sırada?', correct: 'Evet! Burada mavi araba ilk sırada.', wrong: 'Hayır, burada mavi araba son sırada.' }
        },
        options: [
            { id: 7005, word: "mavi araba", imageUrl: "/images/7005.webp", isCorrect: true, audioKey: "mavi araba", spokenText: "mavi araba" },
            { id: 7006, word: "mavi araba", imageUrl: "/images/7006.webp", isCorrect: false, audioKey: "mavi araba", spokenText: "mavi araba" }
        ]
    },
    {
        id: 6,
        question: "Hangi resimde mavi araba son sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde mavi araba son sırada?', correct: 'Evet! Burada mavi araba son sırada.', wrong: 'Hayır, burada mavi araba ilk sırada.' }
        },
        options: [
            { id: 7006, word: "mavi araba", imageUrl: "/images/7006.webp", isCorrect: true, audioKey: "mavi araba", spokenText: "mavi araba" },
            { id: 7005, word: "mavi araba", imageUrl: "/images/7005.webp", isCorrect: false, audioKey: "mavi araba", spokenText: "mavi araba" }
        ]
    },
    // sarı araba
    {
        id: 7,
        question: "Hangi resimde sarı araba ilk sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde sarı araba ilk sırada?', correct: 'Evet! Burada sarı araba ilk sırada.', wrong: 'Hayır, burada sarı araba son sırada.' }
        },
        options: [
            { id: 7007, word: "sarı araba", imageUrl: "/images/7007.webp", isCorrect: true, audioKey: "sarı araba", spokenText: "sarı araba" },
            { id: 7008, word: "sarı araba", imageUrl: "/images/7008.webp", isCorrect: false, audioKey: "sarı araba", spokenText: "sarı araba" }
        ]
    },
    {
        id: 8,
        question: "Hangi resimde sarı araba son sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde sarı araba son sırada?', correct: 'Evet! Burada sarı araba son sırada.', wrong: 'Hayır, burada sarı araba ilk sırada.' }
        },
        options: [
            { id: 7008, word: "sarı araba", imageUrl: "/images/7008.webp", isCorrect: true, audioKey: "sarı araba", spokenText: "sarı araba" },
            { id: 7007, word: "sarı araba", imageUrl: "/images/7007.webp", isCorrect: false, audioKey: "sarı araba", spokenText: "sarı araba" }
        ]
    },
    // gri ayı
    {
        id: 9,
        question: "Hangi resimde gri ayı ilk sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde gri ayı ilk sırada?', correct: 'Evet! Burada gri ayı ilk sırada.', wrong: 'Hayır, burada gri ayı son sırada.' }
        },
        options: [
            { id: 7009, word: "gri ayı", imageUrl: "/images/7009.webp", isCorrect: true, audioKey: "gri ayı", spokenText: "gri ayı" },
            { id: 7010, word: "gri ayı", imageUrl: "/images/7010.webp", isCorrect: false, audioKey: "gri ayı", spokenText: "gri ayı" }
        ]
    },
    {
        id: 10,
        question: "Hangi resimde gri ayı son sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde gri ayı son sırada?', correct: 'Evet! Burada gri ayı son sırada.', wrong: 'Hayır, burada gri ayı ilk sırada.' }
        },
        options: [
            { id: 7010, word: "gri ayı", imageUrl: "/images/7010.webp", isCorrect: true, audioKey: "gri ayı", spokenText: "gri ayı" },
            { id: 7009, word: "gri ayı", imageUrl: "/images/7009.webp", isCorrect: false, audioKey: "gri ayı", spokenText: "gri ayı" }
        ]
    },
    // kahverengi ayı
    {
        id: 11,
        question: "Hangi resimde kahverengi ayı ilk sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde kahverengi ayı ilk sırada?', correct: 'Evet! Burada kahverengi ayı ilk sırada.', wrong: 'Hayır, burada kahverengi ayı son sırada.' }
        },
        options: [
            { id: 7011, word: "kahverengi ayı", imageUrl: "/images/7011.webp", isCorrect: true, audioKey: "kahverengi ayı", spokenText: "kahverengi ayı" },
            { id: 7012, word: "kahverengi ayı", imageUrl: "/images/7012.webp", isCorrect: false, audioKey: "kahverengi ayı", spokenText: "kahverengi ayı" }
        ]
    },
    {
        id: 12,
        question: "Hangi resimde kahverengi ayı son sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde kahverengi ayı son sırada?', correct: 'Evet! Burada kahverengi ayı son sırada.', wrong: 'Hayır, burada kahverengi ayı ilk sırada.' }
        },
        options: [
            { id: 7012, word: "kahverengi ayı", imageUrl: "/images/7012.webp", isCorrect: true, audioKey: "kahverengi ayı", spokenText: "kahverengi ayı" },
            { id: 7011, word: "kahverengi ayı", imageUrl: "/images/7011.webp", isCorrect: false, audioKey: "kahverengi ayı", spokenText: "kahverengi ayı" }
        ]
    },
    // mavi ördek
    {
        id: 13,
        question: "Hangi resimde mavi ördek ilk sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde mavi ördek ilk sırada?', correct: 'Evet! Burada mavi ördek ilk sırada.', wrong: 'Hayır, burada mavi ördek son sırada.' }
        },
        options: [
            { id: 7013, word: "mavi ördek", imageUrl: "/images/7013.webp", isCorrect: true, audioKey: "mavi ördek", spokenText: "mavi ördek" },
            { id: 7014, word: "mavi ördek", imageUrl: "/images/7014.webp", isCorrect: false, audioKey: "mavi ördek", spokenText: "mavi ördek" }
        ]
    },
    {
        id: 14,
        question: "Hangi resimde mavi ördek son sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde mavi ördek son sırada?', correct: 'Evet! Burada mavi ördek son sırada.', wrong: 'Hayır, burada mavi ördek ilk sırada.' }
        },
        options: [
            { id: 7014, word: "mavi ördek", imageUrl: "/images/7014.webp", isCorrect: true, audioKey: "mavi ördek", spokenText: "mavi ördek" },
            { id: 7013, word: "mavi ördek", imageUrl: "/images/7013.webp", isCorrect: false, audioKey: "mavi ördek", spokenText: "mavi ördek" }
        ]
    },
    // pembe ördek
    {
        id: 15,
        question: "Hangi resimde pembe ördek ilk sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde pembe ördek ilk sırada?', correct: 'Evet! Burada pembe ördek ilk sırada.', wrong: 'Hayır, burada pembe ördek son sırada.' }
        },
        options: [
            { id: 7015, word: "pembe ördek", imageUrl: "/images/7015.webp", isCorrect: true, audioKey: "pembe ördek", spokenText: "pembe ördek" },
            { id: 7016, word: "pembe ördek", imageUrl: "/images/7016.webp", isCorrect: false, audioKey: "pembe ördek", spokenText: "pembe ördek" }
        ]
    },
    {
        id: 16,
        question: "Hangi resimde pembe ördek son sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde pembe ördek son sırada?', correct: 'Evet! Burada pembe ördek son sırada.', wrong: 'Hayır, burada pembe ördek ilk sırada.' }
        },
        options: [
            { id: 7016, word: "pembe ördek", imageUrl: "/images/7016.webp", isCorrect: true, audioKey: "pembe ördek", spokenText: "pembe ördek" },
            { id: 7015, word: "pembe ördek", imageUrl: "/images/7015.webp", isCorrect: false, audioKey: "pembe ördek", spokenText: "pembe ördek" }
        ]
    },
    // sarı ördek
    {
        id: 17,
        question: "Hangi resimde sarı ördek ilk sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde sarı ördek ilk sırada?', correct: 'Evet! Burada sarı ördek ilk sırada.', wrong: 'Hayır, burada sarı ördek son sırada.' }
        },
        options: [
            { id: 7017, word: "sarı ördek", imageUrl: "/images/7017.webp", isCorrect: true, audioKey: "sarı ördek", spokenText: "sarı ördek" },
            { id: 7018, word: "sarı ördek", imageUrl: "/images/7018.webp", isCorrect: false, audioKey: "sarı ördek", spokenText: "sarı ördek" }
        ]
    },
    {
        id: 18,
        question: "Hangi resimde sarı ördek son sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde sarı ördek son sırada?', correct: 'Evet! Burada sarı ördek son sırada.', wrong: 'Hayır, burada sarı ördek ilk sırada.' }
        },
        options: [
            { id: 7018, word: "sarı ördek", imageUrl: "/images/7018.webp", isCorrect: true, audioKey: "sarı ördek", spokenText: "sarı ördek" },
            { id: 7017, word: "sarı ördek", imageUrl: "/images/7017.webp", isCorrect: false, audioKey: "sarı ördek", spokenText: "sarı ördek" }
        ]
    },
    // turuncu ördek
    {
        id: 19,
        question: "Hangi resimde turuncu ördek ilk sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde turuncu ördek ilk sırada?', correct: 'Evet! Burada turuncu ördek ilk sırada.', wrong: 'Hayır, burada turuncu ördek son sırada.' }
        },
        options: [
            { id: 7019, word: "turuncu ördek", imageUrl: "/images/7019.webp", isCorrect: true, audioKey: "turuncu ördek", spokenText: "turuncu ördek" },
            { id: 7020, word: "turuncu ördek", imageUrl: "/images/7020.webp", isCorrect: false, audioKey: "turuncu ördek", spokenText: "turuncu ördek" }
        ]
    },
    {
        id: 20,
        question: "Hangi resimde turuncu ördek son sırada?",
        questionAudioKey: "",
        activityType: ActivityType.IlkSon,
        speech: {
            tr: { question: 'Hangi resimde turuncu ördek son sırada?', correct: 'Evet! Burada turuncu ördek son sırada.', wrong: 'Hayır, burada turuncu ördek ilk sırada.' }
        },
        options: [
            { id: 7020, word: "turuncu ördek", imageUrl: "/images/7020.webp", isCorrect: true, audioKey: "turuncu ördek", spokenText: "turuncu ördek" },
            { id: 7019, word: "turuncu ördek", imageUrl: "/images/7019.webp", isCorrect: false, audioKey: "turuncu ördek", spokenText: "turuncu ördek" }
        ]
    },
];
