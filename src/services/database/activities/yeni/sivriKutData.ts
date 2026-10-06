// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (sivri-kut). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/sivri-kut/ → id 5801-5820.
import { ConceptRound, ActivityType } from '../../../../types';

export const sivriKutDataYeni: ConceptRound[] = [
    // çatı
    {
        id: 1,
        question: "Hangi çatı sivri?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi çatı sivri?', correct: 'Evet! Bu çatı sivri.', wrong: 'Hayır, bu çatı küt.' }
        },
        options: [
            { id: 5802, word: "çatı", imageUrl: "/images/5802.webp", isCorrect: true, audioKey: "çatı", spokenText: "çatı" },
            { id: 5801, word: "çatı", imageUrl: "/images/5801.webp", isCorrect: false, audioKey: "çatı", spokenText: "çatı" }
        ]
    },
    {
        id: 2,
        question: "Hangi çatı küt?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi çatı küt?', correct: 'Evet! Bu çatı küt.', wrong: 'Hayır, bu çatı sivri.' }
        },
        options: [
            { id: 5801, word: "çatı", imageUrl: "/images/5801.webp", isCorrect: true, audioKey: "çatı", spokenText: "çatı" },
            { id: 5802, word: "çatı", imageUrl: "/images/5802.webp", isCorrect: false, audioKey: "çatı", spokenText: "çatı" }
        ]
    },
    // çivi
    {
        id: 3,
        question: "Hangi çivinin ucu sivri?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi çivinin ucu sivri?', correct: 'Evet! Bu çivinin ucu sivri.', wrong: 'Hayır, bu çivinin ucu küt.' }
        },
        options: [
            { id: 5804, word: "çivi", imageUrl: "/images/5804.webp", isCorrect: true, audioKey: "çivi", spokenText: "çivi" },
            { id: 5803, word: "çivi", imageUrl: "/images/5803.webp", isCorrect: false, audioKey: "çivi", spokenText: "çivi" }
        ]
    },
    {
        id: 4,
        question: "Hangi çivinin ucu küt?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi çivinin ucu küt?', correct: 'Evet! Bu çivinin ucu küt.', wrong: 'Hayır, bu çivinin ucu sivri.' }
        },
        options: [
            { id: 5803, word: "çivi", imageUrl: "/images/5803.webp", isCorrect: true, audioKey: "çivi", spokenText: "çivi" },
            { id: 5804, word: "çivi", imageUrl: "/images/5804.webp", isCorrect: false, audioKey: "çivi", spokenText: "çivi" }
        ]
    },
    // çubuk
    {
        id: 5,
        question: "Hangi çubuğun ucu sivri?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi çubuğun ucu sivri?', correct: 'Evet! Bu çubuğun ucu sivri.', wrong: 'Hayır, bu çubuğun ucu küt.' }
        },
        options: [
            { id: 5806, word: "çubuk", imageUrl: "/images/5806.webp", isCorrect: true, audioKey: "çubuk", spokenText: "çubuk" },
            { id: 5805, word: "çubuk", imageUrl: "/images/5805.webp", isCorrect: false, audioKey: "çubuk", spokenText: "çubuk" }
        ]
    },
    {
        id: 6,
        question: "Hangi çubuğun ucu küt?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi çubuğun ucu küt?', correct: 'Evet! Bu çubuğun ucu küt.', wrong: 'Hayır, bu çubuğun ucu sivri.' }
        },
        options: [
            { id: 5805, word: "çubuk", imageUrl: "/images/5805.webp", isCorrect: true, audioKey: "çubuk", spokenText: "çubuk" },
            { id: 5806, word: "çubuk", imageUrl: "/images/5806.webp", isCorrect: false, audioKey: "çubuk", spokenText: "çubuk" }
        ]
    },
    // havuç
    {
        id: 7,
        question: "Hangi havucun ucu sivri?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi havucun ucu sivri?', correct: 'Evet! Bu havucun ucu sivri.', wrong: 'Hayır, bu havucun ucu küt.' }
        },
        options: [
            { id: 5808, word: "havuç", imageUrl: "/images/5808.webp", isCorrect: true, audioKey: "havuç", spokenText: "havuç" },
            { id: 5807, word: "havuç", imageUrl: "/images/5807.webp", isCorrect: false, audioKey: "havuç", spokenText: "havuç" }
        ]
    },
    {
        id: 8,
        question: "Hangi havucun ucu küt?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi havucun ucu küt?', correct: 'Evet! Bu havucun ucu küt.', wrong: 'Hayır, bu havucun ucu sivri.' }
        },
        options: [
            { id: 5807, word: "havuç", imageUrl: "/images/5807.webp", isCorrect: true, audioKey: "havuç", spokenText: "havuç" },
            { id: 5808, word: "havuç", imageUrl: "/images/5808.webp", isCorrect: false, audioKey: "havuç", spokenText: "havuç" }
        ]
    },
    // kalem
    {
        id: 9,
        question: "Hangi kalemin ucu sivri?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi kalemin ucu sivri?', correct: 'Evet! Bu kalemin ucu sivri.', wrong: 'Hayır, bu kalemin ucu küt.' }
        },
        options: [
            { id: 5810, word: "kalem", imageUrl: "/images/5810.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 5809, word: "kalem", imageUrl: "/images/5809.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 10,
        question: "Hangi kalemin ucu küt?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi kalemin ucu küt?', correct: 'Evet! Bu kalemin ucu küt.', wrong: 'Hayır, bu kalemin ucu sivri.' }
        },
        options: [
            { id: 5809, word: "kalem", imageUrl: "/images/5809.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 5810, word: "kalem", imageUrl: "/images/5810.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // boya kalemi
    {
        id: 11,
        question: "Hangi boya kaleminin ucu sivri?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi boya kaleminin ucu sivri?', correct: 'Evet! Bu boya kaleminin ucu sivri.', wrong: 'Hayır, bu boya kaleminin ucu küt.' }
        },
        options: [
            { id: 5812, word: "boya kalemi", imageUrl: "/images/5812.webp", isCorrect: true, audioKey: "boya kalemi", spokenText: "boya kalemi" },
            { id: 5811, word: "boya kalemi", imageUrl: "/images/5811.webp", isCorrect: false, audioKey: "boya kalemi", spokenText: "boya kalemi" }
        ]
    },
    {
        id: 12,
        question: "Hangi boya kaleminin ucu küt?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi boya kaleminin ucu küt?', correct: 'Evet! Bu boya kaleminin ucu küt.', wrong: 'Hayır, bu boya kaleminin ucu sivri.' }
        },
        options: [
            { id: 5811, word: "boya kalemi", imageUrl: "/images/5811.webp", isCorrect: true, audioKey: "boya kalemi", spokenText: "boya kalemi" },
            { id: 5812, word: "boya kalemi", imageUrl: "/images/5812.webp", isCorrect: false, audioKey: "boya kalemi", spokenText: "boya kalemi" }
        ]
    },
    // taş
    {
        id: 13,
        question: "Hangi taş sivri?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi taş sivri?', correct: 'Evet! Bu taş sivri.', wrong: 'Hayır, bu taş küt.' }
        },
        options: [
            { id: 5814, word: "taş", imageUrl: "/images/5814.webp", isCorrect: true, audioKey: "taş", spokenText: "taş" },
            { id: 5813, word: "taş", imageUrl: "/images/5813.webp", isCorrect: false, audioKey: "taş", spokenText: "taş" }
        ]
    },
    {
        id: 14,
        question: "Hangi taş küt?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi taş küt?', correct: 'Evet! Bu taş küt.', wrong: 'Hayır, bu taş sivri.' }
        },
        options: [
            { id: 5813, word: "taş", imageUrl: "/images/5813.webp", isCorrect: true, audioKey: "taş", spokenText: "taş" },
            { id: 5814, word: "taş", imageUrl: "/images/5814.webp", isCorrect: false, audioKey: "taş", spokenText: "taş" }
        ]
    },
    // kazık
    {
        id: 15,
        question: "Hangi kazığın ucu sivri?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi kazığın ucu sivri?', correct: 'Evet! Bu kazığın ucu sivri.', wrong: 'Hayır, bu kazığın ucu küt.' }
        },
        options: [
            { id: 5816, word: "kazık", imageUrl: "/images/5816.webp", isCorrect: true, audioKey: "kazık", spokenText: "kazık" },
            { id: 5815, word: "kazık", imageUrl: "/images/5815.webp", isCorrect: false, audioKey: "kazık", spokenText: "kazık" }
        ]
    },
    {
        id: 16,
        question: "Hangi kazığın ucu küt?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi kazığın ucu küt?', correct: 'Evet! Bu kazığın ucu küt.', wrong: 'Hayır, bu kazığın ucu sivri.' }
        },
        options: [
            { id: 5815, word: "kazık", imageUrl: "/images/5815.webp", isCorrect: true, audioKey: "kazık", spokenText: "kazık" },
            { id: 5816, word: "kazık", imageUrl: "/images/5816.webp", isCorrect: false, audioKey: "kazık", spokenText: "kazık" }
        ]
    },
    // makas
    {
        id: 17,
        question: "Hangi makasın ucu sivri?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi makasın ucu sivri?', correct: 'Evet! Bu makasın ucu sivri.', wrong: 'Hayır, bu makasın ucu küt.' }
        },
        options: [
            { id: 5818, word: "makas", imageUrl: "/images/5818.webp", isCorrect: true, audioKey: "makas", spokenText: "makas" },
            { id: 5817, word: "makas", imageUrl: "/images/5817.webp", isCorrect: false, audioKey: "makas", spokenText: "makas" }
        ]
    },
    {
        id: 18,
        question: "Hangi makasın ucu küt?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi makasın ucu küt?', correct: 'Evet! Bu makasın ucu küt.', wrong: 'Hayır, bu makasın ucu sivri.' }
        },
        options: [
            { id: 5817, word: "makas", imageUrl: "/images/5817.webp", isCorrect: true, audioKey: "makas", spokenText: "makas" },
            { id: 5818, word: "makas", imageUrl: "/images/5818.webp", isCorrect: false, audioKey: "makas", spokenText: "makas" }
        ]
    },
    // yaprak
    {
        id: 19,
        question: "Hangi yaprağın ucu sivri?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi yaprağın ucu sivri?', correct: 'Evet! Bu yaprağın ucu sivri.', wrong: 'Hayır, bu yaprağın ucu küt.' }
        },
        options: [
            { id: 5820, word: "yaprak", imageUrl: "/images/5820.webp", isCorrect: true, audioKey: "yaprak", spokenText: "yaprak" },
            { id: 5819, word: "yaprak", imageUrl: "/images/5819.webp", isCorrect: false, audioKey: "yaprak", spokenText: "yaprak" }
        ]
    },
    {
        id: 20,
        question: "Hangi yaprağın ucu küt?",
        questionAudioKey: "",
        activityType: ActivityType.SivriKut,
        speech: {
            tr: { question: 'Hangi yaprağın ucu küt?', correct: 'Evet! Bu yaprağın ucu küt.', wrong: 'Hayır, bu yaprağın ucu sivri.' }
        },
        options: [
            { id: 5819, word: "yaprak", imageUrl: "/images/5819.webp", isCorrect: true, audioKey: "yaprak", spokenText: "yaprak" },
            { id: 5820, word: "yaprak", imageUrl: "/images/5820.webp", isCorrect: false, audioKey: "yaprak", spokenText: "yaprak" }
        ]
    },
];
