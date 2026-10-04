// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (tek-cift). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/tek-cift/ → id 6951-6970.
import { ConceptRound, ActivityType } from '../../../../types';

export const oddEvenDataYeni: ConceptRound[] = [
    // spor ayakkabı
    {
        id: 1,
        question: "Hangi resimde tek spor ayakkabı var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde tek spor ayakkabı var?', correct: 'Evet! Burada tek spor ayakkabı var.', wrong: 'Hayır, burada bir çift spor ayakkabı var.' }
        },
        options: [
            { id: 6952, word: "spor ayakkabı", imageUrl: "/images/6952.webp", isCorrect: true, audioKey: "spor ayakkabı", spokenText: "spor ayakkabı" },
            { id: 6951, word: "spor ayakkabı", imageUrl: "/images/6951.webp", isCorrect: false, audioKey: "spor ayakkabı", spokenText: "spor ayakkabı" }
        ]
    },
    {
        id: 2,
        question: "Hangi resimde bir çift spor ayakkabı var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde bir çift spor ayakkabı var?', correct: 'Evet! Burada bir çift spor ayakkabı var.', wrong: 'Hayır, burada tek spor ayakkabı var.' }
        },
        options: [
            { id: 6951, word: "spor ayakkabı", imageUrl: "/images/6951.webp", isCorrect: true, audioKey: "spor ayakkabı", spokenText: "spor ayakkabı" },
            { id: 6952, word: "spor ayakkabı", imageUrl: "/images/6952.webp", isCorrect: false, audioKey: "spor ayakkabı", spokenText: "spor ayakkabı" }
        ]
    },
    // davul çubuğu
    {
        id: 3,
        question: "Hangi resimde tek davul çubuğu var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde tek davul çubuğu var?', correct: 'Evet! Burada tek davul çubuğu var.', wrong: 'Hayır, burada bir çift davul çubuğu var.' }
        },
        options: [
            { id: 6954, word: "davul çubuğu", imageUrl: "/images/6954.webp", isCorrect: true, audioKey: "davul çubuğu", spokenText: "davul çubuğu" },
            { id: 6953, word: "davul çubuğu", imageUrl: "/images/6953.webp", isCorrect: false, audioKey: "davul çubuğu", spokenText: "davul çubuğu" }
        ]
    },
    {
        id: 4,
        question: "Hangi resimde bir çift davul çubuğu var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde bir çift davul çubuğu var?', correct: 'Evet! Burada bir çift davul çubuğu var.', wrong: 'Hayır, burada tek davul çubuğu var.' }
        },
        options: [
            { id: 6953, word: "davul çubuğu", imageUrl: "/images/6953.webp", isCorrect: true, audioKey: "davul çubuğu", spokenText: "davul çubuğu" },
            { id: 6954, word: "davul çubuğu", imageUrl: "/images/6954.webp", isCorrect: false, audioKey: "davul çubuğu", spokenText: "davul çubuğu" }
        ]
    },
    // çizme
    {
        id: 5,
        question: "Hangi resimde tek çizme var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde tek çizme var?', correct: 'Evet! Burada tek çizme var.', wrong: 'Hayır, burada bir çift çizme var.' }
        },
        options: [
            { id: 6956, word: "çizme", imageUrl: "/images/6956.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 6955, word: "çizme", imageUrl: "/images/6955.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    {
        id: 6,
        question: "Hangi resimde bir çift çizme var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde bir çift çizme var?', correct: 'Evet! Burada bir çift çizme var.', wrong: 'Hayır, burada tek çizme var.' }
        },
        options: [
            { id: 6955, word: "çizme", imageUrl: "/images/6955.webp", isCorrect: true, audioKey: "çizme", spokenText: "çizme" },
            { id: 6956, word: "çizme", imageUrl: "/images/6956.webp", isCorrect: false, audioKey: "çizme", spokenText: "çizme" }
        ]
    },
    // çorap
    {
        id: 7,
        question: "Hangi resimde tek çorap var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde tek çorap var?', correct: 'Evet! Burada tek çorap var.', wrong: 'Hayır, burada bir çift çorap var.' }
        },
        options: [
            { id: 6958, word: "çorap", imageUrl: "/images/6958.webp", isCorrect: true, audioKey: "çorap", spokenText: "çorap" },
            { id: 6957, word: "çorap", imageUrl: "/images/6957.webp", isCorrect: false, audioKey: "çorap", spokenText: "çorap" }
        ]
    },
    {
        id: 8,
        question: "Hangi resimde bir çift çorap var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde bir çift çorap var?', correct: 'Evet! Burada bir çift çorap var.', wrong: 'Hayır, burada tek çorap var.' }
        },
        options: [
            { id: 6957, word: "çorap", imageUrl: "/images/6957.webp", isCorrect: true, audioKey: "çorap", spokenText: "çorap" },
            { id: 6958, word: "çorap", imageUrl: "/images/6958.webp", isCorrect: false, audioKey: "çorap", spokenText: "çorap" }
        ]
    },
    // eldiven
    {
        id: 9,
        question: "Hangi resimde tek eldiven var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde tek eldiven var?', correct: 'Evet! Burada tek eldiven var.', wrong: 'Hayır, burada bir çift eldiven var.' }
        },
        options: [
            { id: 6960, word: "eldiven", imageUrl: "/images/6960.webp", isCorrect: true, audioKey: "eldiven", spokenText: "eldiven" },
            { id: 6959, word: "eldiven", imageUrl: "/images/6959.webp", isCorrect: false, audioKey: "eldiven", spokenText: "eldiven" }
        ]
    },
    {
        id: 10,
        question: "Hangi resimde bir çift eldiven var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde bir çift eldiven var?', correct: 'Evet! Burada bir çift eldiven var.', wrong: 'Hayır, burada tek eldiven var.' }
        },
        options: [
            { id: 6959, word: "eldiven", imageUrl: "/images/6959.webp", isCorrect: true, audioKey: "eldiven", spokenText: "eldiven" },
            { id: 6960, word: "eldiven", imageUrl: "/images/6960.webp", isCorrect: false, audioKey: "eldiven", spokenText: "eldiven" }
        ]
    },
    // ayakkabı
    {
        id: 11,
        question: "Hangi resimde tek ayakkabı var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde tek ayakkabı var?', correct: 'Evet! Burada tek ayakkabı var.', wrong: 'Hayır, burada bir çift ayakkabı var.' }
        },
        options: [
            { id: 6962, word: "ayakkabı", imageUrl: "/images/6962.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 6961, word: "ayakkabı", imageUrl: "/images/6961.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    {
        id: 12,
        question: "Hangi resimde bir çift ayakkabı var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde bir çift ayakkabı var?', correct: 'Evet! Burada bir çift ayakkabı var.', wrong: 'Hayır, burada tek ayakkabı var.' }
        },
        options: [
            { id: 6961, word: "ayakkabı", imageUrl: "/images/6961.webp", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 6962, word: "ayakkabı", imageUrl: "/images/6962.webp", isCorrect: false, audioKey: "ayakkabı", spokenText: "ayakkabı" }
        ]
    },
    // küpe
    {
        id: 13,
        question: "Hangi resimde tek küpe var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde tek küpe var?', correct: 'Evet! Burada tek küpe var.', wrong: 'Hayır, burada bir çift küpe var.' }
        },
        options: [
            { id: 6964, word: "küpe", imageUrl: "/images/6964.webp", isCorrect: true, audioKey: "küpe", spokenText: "küpe" },
            { id: 6963, word: "küpe", imageUrl: "/images/6963.webp", isCorrect: false, audioKey: "küpe", spokenText: "küpe" }
        ]
    },
    {
        id: 14,
        question: "Hangi resimde bir çift küpe var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde bir çift küpe var?', correct: 'Evet! Burada bir çift küpe var.', wrong: 'Hayır, burada tek küpe var.' }
        },
        options: [
            { id: 6963, word: "küpe", imageUrl: "/images/6963.webp", isCorrect: true, audioKey: "küpe", spokenText: "küpe" },
            { id: 6964, word: "küpe", imageUrl: "/images/6964.webp", isCorrect: false, audioKey: "küpe", spokenText: "küpe" }
        ]
    },
    // paten
    {
        id: 15,
        question: "Hangi resimde tek paten var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde tek paten var?', correct: 'Evet! Burada tek paten var.', wrong: 'Hayır, burada bir çift paten var.' }
        },
        options: [
            { id: 6966, word: "paten", imageUrl: "/images/6966.webp", isCorrect: true, audioKey: "paten", spokenText: "paten" },
            { id: 6965, word: "paten", imageUrl: "/images/6965.webp", isCorrect: false, audioKey: "paten", spokenText: "paten" }
        ]
    },
    {
        id: 16,
        question: "Hangi resimde bir çift paten var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde bir çift paten var?', correct: 'Evet! Burada bir çift paten var.', wrong: 'Hayır, burada tek paten var.' }
        },
        options: [
            { id: 6965, word: "paten", imageUrl: "/images/6965.webp", isCorrect: true, audioKey: "paten", spokenText: "paten" },
            { id: 6966, word: "paten", imageUrl: "/images/6966.webp", isCorrect: false, audioKey: "paten", spokenText: "paten" }
        ]
    },
    // sandalet
    {
        id: 17,
        question: "Hangi resimde tek sandalet var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde tek sandalet var?', correct: 'Evet! Burada tek sandalet var.', wrong: 'Hayır, burada bir çift sandalet var.' }
        },
        options: [
            { id: 6968, word: "sandalet", imageUrl: "/images/6968.webp", isCorrect: true, audioKey: "sandalet", spokenText: "sandalet" },
            { id: 6967, word: "sandalet", imageUrl: "/images/6967.webp", isCorrect: false, audioKey: "sandalet", spokenText: "sandalet" }
        ]
    },
    {
        id: 18,
        question: "Hangi resimde bir çift sandalet var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde bir çift sandalet var?', correct: 'Evet! Burada bir çift sandalet var.', wrong: 'Hayır, burada tek sandalet var.' }
        },
        options: [
            { id: 6967, word: "sandalet", imageUrl: "/images/6967.webp", isCorrect: true, audioKey: "sandalet", spokenText: "sandalet" },
            { id: 6968, word: "sandalet", imageUrl: "/images/6968.webp", isCorrect: false, audioKey: "sandalet", spokenText: "sandalet" }
        ]
    },
    // terlik
    {
        id: 19,
        question: "Hangi resimde tek terlik var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde tek terlik var?', correct: 'Evet! Burada tek terlik var.', wrong: 'Hayır, burada bir çift terlik var.' }
        },
        options: [
            { id: 6970, word: "terlik", imageUrl: "/images/6970.webp", isCorrect: true, audioKey: "terlik", spokenText: "terlik" },
            { id: 6969, word: "terlik", imageUrl: "/images/6969.webp", isCorrect: false, audioKey: "terlik", spokenText: "terlik" }
        ]
    },
    {
        id: 20,
        question: "Hangi resimde bir çift terlik var?",
        questionAudioKey: "",
        activityType: ActivityType.OddEven,
        speech: {
            tr: { question: 'Hangi resimde bir çift terlik var?', correct: 'Evet! Burada bir çift terlik var.', wrong: 'Hayır, burada tek terlik var.' }
        },
        options: [
            { id: 6969, word: "terlik", imageUrl: "/images/6969.webp", isCorrect: true, audioKey: "terlik", spokenText: "terlik" },
            { id: 6970, word: "terlik", imageUrl: "/images/6970.webp", isCorrect: false, audioKey: "terlik", spokenText: "terlik" }
        ]
    },
];
