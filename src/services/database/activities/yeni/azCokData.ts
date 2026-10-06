// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (az-cok). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/az-cok/ → id 2701-2720.
import { ConceptRound, ActivityType } from '../../../../types';

export const fewMuchDataYeni: ConceptRound[] = [
    // araba
    {
        id: 1,
        question: "Hangi resimde araba çok?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde araba çok?', correct: 'Evet! Burada çok araba var.', wrong: 'Hayır, burada az araba var.' }
        },
        options: [
            { id: 2702, word: "araba", imageUrl: "/images/2702.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2701, word: "araba", imageUrl: "/images/2701.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    {
        id: 2,
        question: "Hangi resimde araba az?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde araba az?', correct: 'Evet! Burada az araba var.', wrong: 'Hayır, burada çok araba var.' }
        },
        options: [
            { id: 2701, word: "araba", imageUrl: "/images/2701.webp", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2702, word: "araba", imageUrl: "/images/2702.webp", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    // balon
    {
        id: 3,
        question: "Hangi resimde balon çok?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde balon çok?', correct: 'Evet! Burada çok balon var.', wrong: 'Hayır, burada az balon var.' }
        },
        options: [
            { id: 2704, word: "balon", imageUrl: "/images/2704.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 2703, word: "balon", imageUrl: "/images/2703.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 4,
        question: "Hangi resimde balon az?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde balon az?', correct: 'Evet! Burada az balon var.', wrong: 'Hayır, burada çok balon var.' }
        },
        options: [
            { id: 2703, word: "balon", imageUrl: "/images/2703.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 2704, word: "balon", imageUrl: "/images/2704.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    // blok
    {
        id: 5,
        question: "Hangi resimde blok çok?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde blok çok?', correct: 'Evet! Burada çok blok var.', wrong: 'Hayır, burada az blok var.' }
        },
        options: [
            { id: 2706, word: "blok", imageUrl: "/images/2706.webp", isCorrect: true, audioKey: "blok", spokenText: "blok" },
            { id: 2705, word: "blok", imageUrl: "/images/2705.webp", isCorrect: false, audioKey: "blok", spokenText: "blok" }
        ]
    },
    {
        id: 6,
        question: "Hangi resimde blok az?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde blok az?', correct: 'Evet! Burada az blok var.', wrong: 'Hayır, burada çok blok var.' }
        },
        options: [
            { id: 2705, word: "blok", imageUrl: "/images/2705.webp", isCorrect: true, audioKey: "blok", spokenText: "blok" },
            { id: 2706, word: "blok", imageUrl: "/images/2706.webp", isCorrect: false, audioKey: "blok", spokenText: "blok" }
        ]
    },
    // çilek
    {
        id: 7,
        question: "Hangi resimde çilek çok?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde çilek çok?', correct: 'Evet! Burada çok çilek var.', wrong: 'Hayır, burada az çilek var.' }
        },
        options: [
            { id: 2708, word: "çilek", imageUrl: "/images/2708.webp", isCorrect: true, audioKey: "çilek", spokenText: "çilek" },
            { id: 2707, word: "çilek", imageUrl: "/images/2707.webp", isCorrect: false, audioKey: "çilek", spokenText: "çilek" }
        ]
    },
    {
        id: 8,
        question: "Hangi resimde çilek az?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde çilek az?', correct: 'Evet! Burada az çilek var.', wrong: 'Hayır, burada çok çilek var.' }
        },
        options: [
            { id: 2707, word: "çilek", imageUrl: "/images/2707.webp", isCorrect: true, audioKey: "çilek", spokenText: "çilek" },
            { id: 2708, word: "çilek", imageUrl: "/images/2708.webp", isCorrect: false, audioKey: "çilek", spokenText: "çilek" }
        ]
    },
    // düğme
    {
        id: 9,
        question: "Hangi resimde düğme çok?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde düğme çok?', correct: 'Evet! Burada çok düğme var.', wrong: 'Hayır, burada az düğme var.' }
        },
        options: [
            { id: 2710, word: "düğme", imageUrl: "/images/2710.webp", isCorrect: true, audioKey: "düğme", spokenText: "düğme" },
            { id: 2709, word: "düğme", imageUrl: "/images/2709.webp", isCorrect: false, audioKey: "düğme", spokenText: "düğme" }
        ]
    },
    {
        id: 10,
        question: "Hangi resimde düğme az?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde düğme az?', correct: 'Evet! Burada az düğme var.', wrong: 'Hayır, burada çok düğme var.' }
        },
        options: [
            { id: 2709, word: "düğme", imageUrl: "/images/2709.webp", isCorrect: true, audioKey: "düğme", spokenText: "düğme" },
            { id: 2710, word: "düğme", imageUrl: "/images/2710.webp", isCorrect: false, audioKey: "düğme", spokenText: "düğme" }
        ]
    },
    // elma
    {
        id: 11,
        question: "Hangi resimde elma çok?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde elma çok?', correct: 'Evet! Burada çok elma var.', wrong: 'Hayır, burada az elma var.' }
        },
        options: [
            { id: 2712, word: "elma", imageUrl: "/images/2712.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2711, word: "elma", imageUrl: "/images/2711.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    {
        id: 12,
        question: "Hangi resimde elma az?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde elma az?', correct: 'Evet! Burada az elma var.', wrong: 'Hayır, burada çok elma var.' }
        },
        options: [
            { id: 2711, word: "elma", imageUrl: "/images/2711.webp", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 2712, word: "elma", imageUrl: "/images/2712.webp", isCorrect: false, audioKey: "elma", spokenText: "elma" }
        ]
    },
    // kalem
    {
        id: 13,
        question: "Hangi resimde kalem çok?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde kalem çok?', correct: 'Evet! Burada çok kalem var.', wrong: 'Hayır, burada az kalem var.' }
        },
        options: [
            { id: 2714, word: "kalem", imageUrl: "/images/2714.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2713, word: "kalem", imageUrl: "/images/2713.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 14,
        question: "Hangi resimde kalem az?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde kalem az?', correct: 'Evet! Burada az kalem var.', wrong: 'Hayır, burada çok kalem var.' }
        },
        options: [
            { id: 2713, word: "kalem", imageUrl: "/images/2713.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2714, word: "kalem", imageUrl: "/images/2714.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // kurabiye
    {
        id: 15,
        question: "Hangi resimde kurabiye çok?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde kurabiye çok?', correct: 'Evet! Burada çok kurabiye var.', wrong: 'Hayır, burada az kurabiye var.' }
        },
        options: [
            { id: 2716, word: "kurabiye", imageUrl: "/images/2716.webp", isCorrect: true, audioKey: "kurabiye", spokenText: "kurabiye" },
            { id: 2715, word: "kurabiye", imageUrl: "/images/2715.webp", isCorrect: false, audioKey: "kurabiye", spokenText: "kurabiye" }
        ]
    },
    {
        id: 16,
        question: "Hangi resimde kurabiye az?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde kurabiye az?', correct: 'Evet! Burada az kurabiye var.', wrong: 'Hayır, burada çok kurabiye var.' }
        },
        options: [
            { id: 2715, word: "kurabiye", imageUrl: "/images/2715.webp", isCorrect: true, audioKey: "kurabiye", spokenText: "kurabiye" },
            { id: 2716, word: "kurabiye", imageUrl: "/images/2716.webp", isCorrect: false, audioKey: "kurabiye", spokenText: "kurabiye" }
        ]
    },
    // top
    {
        id: 17,
        question: "Hangi resimde top çok?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde top çok?', correct: 'Evet! Burada çok top var.', wrong: 'Hayır, burada az top var.' }
        },
        options: [
            { id: 2718, word: "top", imageUrl: "/images/2718.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2717, word: "top", imageUrl: "/images/2717.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    {
        id: 18,
        question: "Hangi resimde top az?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde top az?', correct: 'Evet! Burada az top var.', wrong: 'Hayır, burada çok top var.' }
        },
        options: [
            { id: 2717, word: "top", imageUrl: "/images/2717.webp", isCorrect: true, audioKey: "top", spokenText: "top" },
            { id: 2718, word: "top", imageUrl: "/images/2718.webp", isCorrect: false, audioKey: "top", spokenText: "top" }
        ]
    },
    // yaprak
    {
        id: 19,
        question: "Hangi resimde yaprak çok?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde yaprak çok?', correct: 'Evet! Burada çok yaprak var.', wrong: 'Hayır, burada az yaprak var.' }
        },
        options: [
            { id: 2720, word: "yaprak", imageUrl: "/images/2720.webp", isCorrect: true, audioKey: "yaprak", spokenText: "yaprak" },
            { id: 2719, word: "yaprak", imageUrl: "/images/2719.webp", isCorrect: false, audioKey: "yaprak", spokenText: "yaprak" }
        ]
    },
    {
        id: 20,
        question: "Hangi resimde yaprak az?",
        questionAudioKey: "",
        activityType: ActivityType.FewMuch,
        speech: {
            tr: { question: 'Hangi resimde yaprak az?', correct: 'Evet! Burada az yaprak var.', wrong: 'Hayır, burada çok yaprak var.' }
        },
        options: [
            { id: 2719, word: "yaprak", imageUrl: "/images/2719.webp", isCorrect: true, audioKey: "yaprak", spokenText: "yaprak" },
            { id: 2720, word: "yaprak", imageUrl: "/images/2720.webp", isCorrect: false, audioKey: "yaprak", spokenText: "yaprak" }
        ]
    },
];
