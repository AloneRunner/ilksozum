// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (ters-duz). Elle düzenleme.
// 15 çift, 30 soru. Görseller: gorsel-ham/ters-duz/ → id 5701-5730.
import { ConceptRound, ActivityType } from '../../../../types';

export const tersDuzDataYeni: ConceptRound[] = [
    // ayakkabılar
    {
        id: 1,
        question: "Hangi ayakkabılar ters duruyor?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi ayakkabılar ters duruyor?', correct: 'Evet! Ayakkabılar terstir.', wrong: 'Hayır, bu ayakkabılar düzdür.' }
        },
        options: [
            { id: 5702, word: "ayakkabılar", imageUrl: "/images/5702.webp", isCorrect: true, audioKey: "ayakkabılar", spokenText: "ayakkabılar" },
            { id: 5701, word: "ayakkabılar", imageUrl: "/images/5701.webp", isCorrect: false, audioKey: "ayakkabılar", spokenText: "ayakkabılar" }
        ]
    },
    {
        id: 2,
        question: "Hangi ayakkabılar düz duruyor?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi ayakkabılar düz duruyor?', correct: 'Evet! Ayakkabılar düzdür.', wrong: 'Hayır, bu ayakkabılar terstir.' }
        },
        options: [
            { id: 5701, word: "ayakkabılar", imageUrl: "/images/5701.webp", isCorrect: true, audioKey: "ayakkabılar", spokenText: "ayakkabılar" },
            { id: 5702, word: "ayakkabılar", imageUrl: "/images/5702.webp", isCorrect: false, audioKey: "ayakkabılar", spokenText: "ayakkabılar" }
        ]
    },
    // oyuncak ayı
    {
        id: 3,
        question: "Hangi oyuncak ayı ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi oyuncak ayı ters?', correct: 'Evet! Oyuncak ayı terstir.', wrong: 'Hayır, bu oyuncak ayı düzdür.' }
        },
        options: [
            { id: 5704, word: "oyuncak ayı", imageUrl: "/images/5704.webp", isCorrect: true, audioKey: "oyuncak ayı", spokenText: "oyuncak ayı" },
            { id: 5703, word: "oyuncak ayı", imageUrl: "/images/5703.webp", isCorrect: false, audioKey: "oyuncak ayı", spokenText: "oyuncak ayı" }
        ]
    },
    {
        id: 4,
        question: "Hangi oyuncak ayı düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi oyuncak ayı düz?', correct: 'Evet! Oyuncak ayı düzdür.', wrong: 'Hayır, bu oyuncak ayı terstir.' }
        },
        options: [
            { id: 5703, word: "oyuncak ayı", imageUrl: "/images/5703.webp", isCorrect: true, audioKey: "oyuncak ayı", spokenText: "oyuncak ayı" },
            { id: 5704, word: "oyuncak ayı", imageUrl: "/images/5704.webp", isCorrect: false, audioKey: "oyuncak ayı", spokenText: "oyuncak ayı" }
        ]
    },
    // çizmeler
    {
        id: 5,
        question: "Hangi çizmeler ters duruyor?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi çizmeler ters duruyor?', correct: 'Evet! Çizmeler terstir.', wrong: 'Hayır, bu çizmeler düzdür.' }
        },
        options: [
            { id: 5706, word: "çizmeler", imageUrl: "/images/5706.webp", isCorrect: true, audioKey: "çizmeler", spokenText: "çizmeler" },
            { id: 5705, word: "çizmeler", imageUrl: "/images/5705.webp", isCorrect: false, audioKey: "çizmeler", spokenText: "çizmeler" }
        ]
    },
    {
        id: 6,
        question: "Hangi çizmeler düz duruyor?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi çizmeler düz duruyor?', correct: 'Evet! Çizmeler düzdür.', wrong: 'Hayır, bu çizmeler terstir.' }
        },
        options: [
            { id: 5705, word: "çizmeler", imageUrl: "/images/5705.webp", isCorrect: true, audioKey: "çizmeler", spokenText: "çizmeler" },
            { id: 5706, word: "çizmeler", imageUrl: "/images/5706.webp", isCorrect: false, audioKey: "çizmeler", spokenText: "çizmeler" }
        ]
    },
    // fincan
    {
        id: 7,
        question: "Hangi fincan ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi fincan ters?', correct: 'Evet! Fincan terstir.', wrong: 'Hayır, bu fincan düzdür.' }
        },
        options: [
            { id: 5708, word: "fincan", imageUrl: "/images/5708.webp", isCorrect: true, audioKey: "fincan", spokenText: "fincan" },
            { id: 5707, word: "fincan", imageUrl: "/images/5707.webp", isCorrect: false, audioKey: "fincan", spokenText: "fincan" }
        ]
    },
    {
        id: 8,
        question: "Hangi fincan düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi fincan düz?', correct: 'Evet! Fincan düzdür.', wrong: 'Hayır, bu fincan terstir.' }
        },
        options: [
            { id: 5707, word: "fincan", imageUrl: "/images/5707.webp", isCorrect: true, audioKey: "fincan", spokenText: "fincan" },
            { id: 5708, word: "fincan", imageUrl: "/images/5708.webp", isCorrect: false, audioKey: "fincan", spokenText: "fincan" }
        ]
    },
    // çocuk
    {
        id: 9,
        question: "Hangi çocuk kazağını ters giymiş?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi çocuk kazağını ters giymiş?', correct: 'Evet! Çocuğun kazağı terstir.', wrong: 'Hayır, bu çocuğun kazağı düzdür.' }
        },
        options: [
            { id: 5710, word: "çocuk", imageUrl: "/images/5710.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 5709, word: "çocuk", imageUrl: "/images/5709.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 10,
        question: "Hangi çocuk kazağını düz giymiş?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi çocuk kazağını düz giymiş?', correct: 'Evet! Çocuğun kazağı düzdür.', wrong: 'Hayır, bu çocuğun kazağı terstir.' }
        },
        options: [
            { id: 5709, word: "çocuk", imageUrl: "/images/5709.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 5710, word: "çocuk", imageUrl: "/images/5710.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // kova
    {
        id: 11,
        question: "Hangi kova ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi kova ters?', correct: 'Evet! Kova terstir.', wrong: 'Hayır, bu kova düzdür.' }
        },
        options: [
            { id: 5712, word: "kova", imageUrl: "/images/5712.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 5711, word: "kova", imageUrl: "/images/5711.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    {
        id: 12,
        question: "Hangi kova düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi kova düz?', correct: 'Evet! Kova düzdür.', wrong: 'Hayır, bu kova terstir.' }
        },
        options: [
            { id: 5711, word: "kova", imageUrl: "/images/5711.webp", isCorrect: true, audioKey: "kova", spokenText: "kova" },
            { id: 5712, word: "kova", imageUrl: "/images/5712.webp", isCorrect: false, audioKey: "kova", spokenText: "kova" }
        ]
    },
    // pantolon
    {
        id: 13,
        question: "Hangi pantolon ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi pantolon ters?', correct: 'Evet! Pantolon terstir.', wrong: 'Hayır, bu pantolon düzdür.' }
        },
        options: [
            { id: 5714, word: "pantolon", imageUrl: "/images/5714.webp", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 5713, word: "pantolon", imageUrl: "/images/5713.webp", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" }
        ]
    },
    {
        id: 14,
        question: "Hangi pantolon düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi pantolon düz?', correct: 'Evet! Pantolon düzdür.', wrong: 'Hayır, bu pantolon terstir.' }
        },
        options: [
            { id: 5713, word: "pantolon", imageUrl: "/images/5713.webp", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 5714, word: "pantolon", imageUrl: "/images/5714.webp", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" }
        ]
    },
    // saksı
    {
        id: 15,
        question: "Hangi saksı ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi saksı ters?', correct: 'Evet! Saksı terstir.', wrong: 'Hayır, bu saksı düzdür.' }
        },
        options: [
            { id: 5716, word: "saksı", imageUrl: "/images/5716.webp", isCorrect: true, audioKey: "saksı", spokenText: "saksı" },
            { id: 5715, word: "saksı", imageUrl: "/images/5715.webp", isCorrect: false, audioKey: "saksı", spokenText: "saksı" }
        ]
    },
    {
        id: 16,
        question: "Hangi saksı düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi saksı düz?', correct: 'Evet! Saksı düzdür.', wrong: 'Hayır, bu saksı terstir.' }
        },
        options: [
            { id: 5715, word: "saksı", imageUrl: "/images/5715.webp", isCorrect: true, audioKey: "saksı", spokenText: "saksı" },
            { id: 5716, word: "saksı", imageUrl: "/images/5716.webp", isCorrect: false, audioKey: "saksı", spokenText: "saksı" }
        ]
    },
    // sandalye
    {
        id: 17,
        question: "Hangi sandalye ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi sandalye ters?', correct: 'Evet! Sandalye terstir.', wrong: 'Hayır, bu sandalye düzdür.' }
        },
        options: [
            { id: 5718, word: "sandalye", imageUrl: "/images/5718.webp", isCorrect: true, audioKey: "sandalye", spokenText: "sandalye" },
            { id: 5717, word: "sandalye", imageUrl: "/images/5717.webp", isCorrect: false, audioKey: "sandalye", spokenText: "sandalye" }
        ]
    },
    {
        id: 18,
        question: "Hangi sandalye düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi sandalye düz?', correct: 'Evet! Sandalye düzdür.', wrong: 'Hayır, bu sandalye terstir.' }
        },
        options: [
            { id: 5717, word: "sandalye", imageUrl: "/images/5717.webp", isCorrect: true, audioKey: "sandalye", spokenText: "sandalye" },
            { id: 5718, word: "sandalye", imageUrl: "/images/5718.webp", isCorrect: false, audioKey: "sandalye", spokenText: "sandalye" }
        ]
    },
    // çocuk
    {
        id: 19,
        question: "Hangi çocuk şapkasını ters takmış?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi çocuk şapkasını ters takmış?', correct: 'Evet! Çocuğun şapkası terstir.', wrong: 'Hayır, bu çocuğun şapkası düzdür.' }
        },
        options: [
            { id: 5720, word: "çocuk", imageUrl: "/images/5720.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 5719, word: "çocuk", imageUrl: "/images/5719.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 20,
        question: "Hangi çocuk şapkasını düz takmış?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi çocuk şapkasını düz takmış?', correct: 'Evet! Çocuğun şapkası düzdür.', wrong: 'Hayır, bu çocuğun şapkası terstir.' }
        },
        options: [
            { id: 5719, word: "çocuk", imageUrl: "/images/5719.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 5720, word: "çocuk", imageUrl: "/images/5720.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // şemsiye
    {
        id: 21,
        question: "Hangi şemsiye ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi şemsiye ters?', correct: 'Evet! Şemsiye terstir.', wrong: 'Hayır, bu şemsiye düzdür.' }
        },
        options: [
            { id: 5722, word: "şemsiye", imageUrl: "/images/5722.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 5721, word: "şemsiye", imageUrl: "/images/5721.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 22,
        question: "Hangi şemsiye düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi şemsiye düz?', correct: 'Evet! Şemsiye düzdür.', wrong: 'Hayır, bu şemsiye terstir.' }
        },
        options: [
            { id: 5721, word: "şemsiye", imageUrl: "/images/5721.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 5722, word: "şemsiye", imageUrl: "/images/5722.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    // şişe
    {
        id: 23,
        question: "Hangi şişe ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi şişe ters?', correct: 'Evet! Şişe terstir.', wrong: 'Hayır, bu şişe düzdür.' }
        },
        options: [
            { id: 5724, word: "şişe", imageUrl: "/images/5724.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 5723, word: "şişe", imageUrl: "/images/5723.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 24,
        question: "Hangi şişe düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi şişe düz?', correct: 'Evet! Şişe düzdür.', wrong: 'Hayır, bu şişe terstir.' }
        },
        options: [
            { id: 5723, word: "şişe", imageUrl: "/images/5723.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 5724, word: "şişe", imageUrl: "/images/5724.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    // tabure
    {
        id: 25,
        question: "Hangi tabure ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi tabure ters?', correct: 'Evet! Tabure terstir.', wrong: 'Hayır, bu tabure düzdür.' }
        },
        options: [
            { id: 5726, word: "tabure", imageUrl: "/images/5726.webp", isCorrect: true, audioKey: "tabure", spokenText: "tabure" },
            { id: 5725, word: "tabure", imageUrl: "/images/5725.webp", isCorrect: false, audioKey: "tabure", spokenText: "tabure" }
        ]
    },
    {
        id: 26,
        question: "Hangi tabure düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi tabure düz?', correct: 'Evet! Tabure düzdür.', wrong: 'Hayır, bu tabure terstir.' }
        },
        options: [
            { id: 5725, word: "tabure", imageUrl: "/images/5725.webp", isCorrect: true, audioKey: "tabure", spokenText: "tabure" },
            { id: 5726, word: "tabure", imageUrl: "/images/5726.webp", isCorrect: false, audioKey: "tabure", spokenText: "tabure" }
        ]
    },
    // terlikler
    {
        id: 27,
        question: "Hangi terlikler ters duruyor?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi terlikler ters duruyor?', correct: 'Evet! Terlikler terstir.', wrong: 'Hayır, bu terlikler düzdür.' }
        },
        options: [
            { id: 5728, word: "terlikler", imageUrl: "/images/5728.webp", isCorrect: true, audioKey: "terlikler", spokenText: "terlikler" },
            { id: 5727, word: "terlikler", imageUrl: "/images/5727.webp", isCorrect: false, audioKey: "terlikler", spokenText: "terlikler" }
        ]
    },
    {
        id: 28,
        question: "Hangi terlikler düz duruyor?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi terlikler düz duruyor?', correct: 'Evet! Terlikler düzdür.', wrong: 'Hayır, bu terlikler terstir.' }
        },
        options: [
            { id: 5727, word: "terlikler", imageUrl: "/images/5727.webp", isCorrect: true, audioKey: "terlikler", spokenText: "terlikler" },
            { id: 5728, word: "terlikler", imageUrl: "/images/5728.webp", isCorrect: false, audioKey: "terlikler", spokenText: "terlikler" }
        ]
    },
    // tişört
    {
        id: 29,
        question: "Hangi tişört ters?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi tişört ters?', correct: 'Evet! Tişört terstir.', wrong: 'Hayır, bu tişört düzdür.' }
        },
        options: [
            { id: 5730, word: "tişört", imageUrl: "/images/5730.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 5729, word: "tişört", imageUrl: "/images/5729.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
    {
        id: 30,
        question: "Hangi tişört düz?",
        questionAudioKey: "",
        activityType: ActivityType.TersDuz,
        speech: {
            tr: { question: 'Hangi tişört düz?', correct: 'Evet! Tişört düzdür.', wrong: 'Hayır, bu tişört terstir.' }
        },
        options: [
            { id: 5729, word: "tişört", imageUrl: "/images/5729.webp", isCorrect: true, audioKey: "tişört", spokenText: "tişört" },
            { id: 5730, word: "tişört", imageUrl: "/images/5730.webp", isCorrect: false, audioKey: "tişört", spokenText: "tişört" }
        ]
    },
];
