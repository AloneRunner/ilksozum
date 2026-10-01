// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (az-cok). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/az-cok/ → id 2701-2720.
import { ConceptRound, ActivityType } from '../../../../types';

export const fewMuchDataYeni: ConceptRound[] = [
    // araba
    {
        id: 1,
        question: "Çok olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Çok olan hangisi?', correct: 'Evet! Burada arabalar çoktur.', wrong: 'Hayır, burada arabalar azdır.' }
        },
        options: [
            { id: 2702, word: "araba", imageUrl: "/images/2702.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2701, word: "araba", imageUrl: "/images/2701.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 2,
        question: "Az olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Az olan hangisi?', correct: 'Evet! Burada arabalar azdır.', wrong: 'Hayır, burada arabalar çoktur.' }
        },
        options: [
            { id: 2701, word: "araba", imageUrl: "/images/2701.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2702, word: "araba", imageUrl: "/images/2702.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // balon
    {
        id: 3,
        question: "Çok olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Çok olan hangisi?', correct: 'Evet! Burada balonlar çoktur.', wrong: 'Hayır, burada balonlar azdır.' }
        },
        options: [
            { id: 2704, word: "balon", imageUrl: "/images/2704.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 2703, word: "balon", imageUrl: "/images/2703.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 4,
        question: "Az olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Az olan hangisi?', correct: 'Evet! Burada balonlar azdır.', wrong: 'Hayır, burada balonlar çoktur.' }
        },
        options: [
            { id: 2703, word: "balon", imageUrl: "/images/2703.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 2704, word: "balon", imageUrl: "/images/2704.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    // blok
    {
        id: 5,
        question: "Çok olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Çok olan hangisi?', correct: 'Evet! Burada bloklar çoktur.', wrong: 'Hayır, burada bloklar azdır.' }
        },
        options: [
            { id: 2706, word: "blok", imageUrl: "/images/2706.webp", isCorrect: true, audioKey: "blok", spokenText: "blok" },
            { id: 2705, word: "blok", imageUrl: "/images/2705.webp", isCorrect: false, audioKey: "blok", spokenText: "blok" }
        ]
    },
    {
        id: 6,
        question: "Az olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Az olan hangisi?', correct: 'Evet! Burada bloklar azdır.', wrong: 'Hayır, burada bloklar çoktur.' }
        },
        options: [
            { id: 2705, word: "blok", imageUrl: "/images/2705.webp", isCorrect: true, audioKey: "blok", spokenText: "blok" },
            { id: 2706, word: "blok", imageUrl: "/images/2706.webp", isCorrect: false, audioKey: "blok", spokenText: "blok" }
        ]
    },
    // çilek
    {
        id: 7,
        question: "Çok olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Çok olan hangisi?', correct: 'Evet! Burada çilekler çoktur.', wrong: 'Hayır, burada çilekler azdır.' }
        },
        options: [
            { id: 2708, word: "çilek", imageUrl: "/images/2708.webp", isCorrect: true, audioKey: "çilek", spokenText: "çilek" },
            { id: 2707, word: "çilek", imageUrl: "/images/2707.webp", isCorrect: false, audioKey: "çilek", spokenText: "çilek" }
        ]
    },
    {
        id: 8,
        question: "Az olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Az olan hangisi?', correct: 'Evet! Burada çilekler azdır.', wrong: 'Hayır, burada çilekler çoktur.' }
        },
        options: [
            { id: 2707, word: "çilek", imageUrl: "/images/2707.webp", isCorrect: true, audioKey: "çilek", spokenText: "çilek" },
            { id: 2708, word: "çilek", imageUrl: "/images/2708.webp", isCorrect: false, audioKey: "çilek", spokenText: "çilek" }
        ]
    },
    // düğme
    {
        id: 9,
        question: "Çok olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Çok olan hangisi?', correct: 'Evet! Burada düğmeler çoktur.', wrong: 'Hayır, burada düğmeler azdır.' }
        },
        options: [
            { id: 2710, word: "düğme", imageUrl: "/images/2710.webp", isCorrect: true, audioKey: "düğme", spokenText: "düğme" },
            { id: 2709, word: "düğme", imageUrl: "/images/2709.webp", isCorrect: false, audioKey: "düğme", spokenText: "düğme" }
        ]
    },
    {
        id: 10,
        question: "Az olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Az olan hangisi?', correct: 'Evet! Burada düğmeler azdır.', wrong: 'Hayır, burada düğmeler çoktur.' }
        },
        options: [
            { id: 2709, word: "düğme", imageUrl: "/images/2709.webp", isCorrect: true, audioKey: "düğme", spokenText: "düğme" },
            { id: 2710, word: "düğme", imageUrl: "/images/2710.webp", isCorrect: false, audioKey: "düğme", spokenText: "düğme" }
        ]
    },
    // elma
    {
        id: 11,
        question: "Çok olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Çok olan hangisi?', correct: 'Evet! Burada elmalar çoktur.', wrong: 'Hayır, burada elmalar azdır.' }
        },
        options: [
            { id: 2712, word: "elma", imageUrl: "/images/2712.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2711, word: "elma", imageUrl: "/images/2711.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 12,
        question: "Az olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Az olan hangisi?', correct: 'Evet! Burada elmalar azdır.', wrong: 'Hayır, burada elmalar çoktur.' }
        },
        options: [
            { id: 2711, word: "elma", imageUrl: "/images/2711.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2712, word: "elma", imageUrl: "/images/2712.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kalem
    {
        id: 13,
        question: "Çok olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Çok olan hangisi?', correct: 'Evet! Burada kalemler çoktur.', wrong: 'Hayır, burada kalemler azdır.' }
        },
        options: [
            { id: 2714, word: "kalem", imageUrl: "/images/2714.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2713, word: "kalem", imageUrl: "/images/2713.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 14,
        question: "Az olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Az olan hangisi?', correct: 'Evet! Burada kalemler azdır.', wrong: 'Hayır, burada kalemler çoktur.' }
        },
        options: [
            { id: 2713, word: "kalem", imageUrl: "/images/2713.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2714, word: "kalem", imageUrl: "/images/2714.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kurabiye
    {
        id: 15,
        question: "Çok olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Çok olan hangisi?', correct: 'Evet! Burada kurabiyeler çoktur.', wrong: 'Hayır, burada kurabiyeler azdır.' }
        },
        options: [
            { id: 2716, word: "kurabiye", imageUrl: "/images/2716.webp", isCorrect: true, audioKey: "kurabiye", spokenText: "kurabiye" },
            { id: 2715, word: "kurabiye", imageUrl: "/images/2715.webp", isCorrect: false, audioKey: "kurabiye", spokenText: "kurabiye" }
        ]
    },
    {
        id: 16,
        question: "Az olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Az olan hangisi?', correct: 'Evet! Burada kurabiyeler azdır.', wrong: 'Hayır, burada kurabiyeler çoktur.' }
        },
        options: [
            { id: 2715, word: "kurabiye", imageUrl: "/images/2715.webp", isCorrect: true, audioKey: "kurabiye", spokenText: "kurabiye" },
            { id: 2716, word: "kurabiye", imageUrl: "/images/2716.webp", isCorrect: false, audioKey: "kurabiye", spokenText: "kurabiye" }
        ]
    },
    // top
    {
        id: 17,
        question: "Çok olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Çok olan hangisi?', correct: 'Evet! Burada toplar çoktur.', wrong: 'Hayır, burada toplar azdır.' }
        },
        options: [
            { id: 2718, word: "top", imageUrl: "/images/2718.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2717, word: "top", imageUrl: "/images/2717.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 18,
        question: "Az olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Az olan hangisi?', correct: 'Evet! Burada toplar azdır.', wrong: 'Hayır, burada toplar çoktur.' }
        },
        options: [
            { id: 2717, word: "top", imageUrl: "/images/2717.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2718, word: "top", imageUrl: "/images/2718.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // yaprak
    {
        id: 19,
        question: "Çok olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Çok olan hangisi?', correct: 'Evet! Burada yapraklar çoktur.', wrong: 'Hayır, burada yapraklar azdır.' }
        },
        options: [
            { id: 2720, word: "yaprak", imageUrl: "/images/2720.webp", isCorrect: true, audioKey: "yaprak", spokenText: "yaprak" },
            { id: 2719, word: "yaprak", imageUrl: "/images/2719.webp", isCorrect: false, audioKey: "yaprak", spokenText: "yaprak" }
        ]
    },
    {
        id: 20,
        question: "Az olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Az olan hangisi?', correct: 'Evet! Burada yapraklar azdır.', wrong: 'Hayır, burada yapraklar çoktur.' }
        },
        options: [
            { id: 2719, word: "yaprak", imageUrl: "/images/2719.webp", isCorrect: true, audioKey: "yaprak", spokenText: "yaprak" },
            { id: 2720, word: "yaprak", imageUrl: "/images/2720.webp", isCorrect: false, audioKey: "yaprak", spokenText: "yaprak" }
        ]
    },
];
