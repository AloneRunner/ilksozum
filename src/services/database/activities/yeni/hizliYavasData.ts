// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (hizli-yavas). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/hizli-yavas/ → id 6001-6020.
import { ConceptRound, ActivityType } from '../../../../types';

export const fastSlowDataYeni: ConceptRound[] = [
    // araba_traktor
    {
        id: 1,
        question: "Hızlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Hızlı olan hangisi?', correct: 'Evet! Yarış arabası hızlıdır.', wrong: 'Hayır, traktör yavaştır.' }
        },
        options: [
            { id: 6001, word: "yarış arabası", imageUrl: "/images/6001.webp", isCorrect: true, audioKey: "yarış arabası", spokenText: "yarış arabası" },
            { id: 6002, word: "traktör", imageUrl: "/images/6002.webp", isCorrect: false, audioKey: "traktör", spokenText: "traktör" }
        ]
    },
    {
        id: 2,
        question: "Yavaş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Yavaş olan hangisi?', correct: 'Evet! Traktör yavaştır.', wrong: 'Hayır, yarış arabası hızlıdır.' }
        },
        options: [
            { id: 6002, word: "traktör", imageUrl: "/images/6002.webp", isCorrect: true, audioKey: "traktör", spokenText: "traktör" },
            { id: 6001, word: "yarış arabası", imageUrl: "/images/6001.webp", isCorrect: false, audioKey: "yarış arabası", spokenText: "yarış arabası" }
        ]
    },
    // at_inek
    {
        id: 3,
        question: "Hızlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Hızlı olan hangisi?', correct: 'Evet! At hızlıdır.', wrong: 'Hayır, inek yavaştır.' }
        },
        options: [
            { id: 6003, word: "at", imageUrl: "/images/6003.webp", isCorrect: true, audioKey: "at", spokenText: "at" },
            { id: 6004, word: "inek", imageUrl: "/images/6004.webp", isCorrect: false, audioKey: "inek", spokenText: "inek" }
        ]
    },
    {
        id: 4,
        question: "Yavaş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Yavaş olan hangisi?', correct: 'Evet! İnek yavaştır.', wrong: 'Hayır, at hızlıdır.' }
        },
        options: [
            { id: 6004, word: "inek", imageUrl: "/images/6004.webp", isCorrect: true, audioKey: "inek", spokenText: "inek" },
            { id: 6003, word: "at", imageUrl: "/images/6003.webp", isCorrect: false, audioKey: "at", spokenText: "at" }
        ]
    },
    // cita_salyangoz
    {
        id: 5,
        question: "Hızlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Hızlı olan hangisi?', correct: 'Evet! Çita hızlıdır.', wrong: 'Hayır, salyangoz yavaştır.' }
        },
        options: [
            { id: 6005, word: "çita", imageUrl: "/images/6005.webp", isCorrect: true, audioKey: "çita", spokenText: "çita" },
            { id: 6006, word: "salyangoz", imageUrl: "/images/6006.webp", isCorrect: false, audioKey: "salyangoz", spokenText: "salyangoz" }
        ]
    },
    {
        id: 6,
        question: "Yavaş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Yavaş olan hangisi?', correct: 'Evet! Salyangoz yavaştır.', wrong: 'Hayır, çita hızlıdır.' }
        },
        options: [
            { id: 6006, word: "salyangoz", imageUrl: "/images/6006.webp", isCorrect: true, audioKey: "salyangoz", spokenText: "salyangoz" },
            { id: 6005, word: "çita", imageUrl: "/images/6005.webp", isCorrect: false, audioKey: "çita", spokenText: "çita" }
        ]
    },
    // çocuk
    {
        id: 7,
        question: "Hangi çocuk hızlı koşuyor?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Hangi çocuk hızlı koşuyor?', correct: 'Evet! Bu çocuk hızlı.', wrong: 'Hayır, bu çocuk yavaş.' }
        },
        options: [
            { id: 6007, word: "çocuk", imageUrl: "/images/6007.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6008, word: "çocuk", imageUrl: "/images/6008.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    {
        id: 8,
        question: "Hangi çocuk yavaş yürüyor?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Hangi çocuk yavaş yürüyor?', correct: 'Evet! Bu çocuk yavaş.', wrong: 'Hayır, bu çocuk hızlı.' }
        },
        options: [
            { id: 6008, word: "çocuk", imageUrl: "/images/6008.webp", isCorrect: true, audioKey: "çocuk", spokenText: "çocuk" },
            { id: 6007, word: "çocuk", imageUrl: "/images/6007.webp", isCorrect: false, audioKey: "çocuk", spokenText: "çocuk" }
        ]
    },
    // kopek_tembelhayvan
    {
        id: 9,
        question: "Hızlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Hızlı olan hangisi?', correct: 'Evet! Köpek hızlıdır.', wrong: 'Hayır, tembel hayvan yavaştır.' }
        },
        options: [
            { id: 6009, word: "köpek", imageUrl: "/images/6009.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 6010, word: "tembel hayvan", imageUrl: "/images/6010.webp", isCorrect: false, audioKey: "tembel hayvan", spokenText: "tembel hayvan" }
        ]
    },
    {
        id: 10,
        question: "Yavaş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Yavaş olan hangisi?', correct: 'Evet! Tembel hayvan yavaştır.', wrong: 'Hayır, köpek hızlıdır.' }
        },
        options: [
            { id: 6010, word: "tembel hayvan", imageUrl: "/images/6010.webp", isCorrect: true, audioKey: "tembel hayvan", spokenText: "tembel hayvan" },
            { id: 6009, word: "köpek", imageUrl: "/images/6009.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    // sahin_tirtil
    {
        id: 11,
        question: "Hızlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Hızlı olan hangisi?', correct: 'Evet! Şahin hızlıdır.', wrong: 'Hayır, tırtıl yavaştır.' }
        },
        options: [
            { id: 6011, word: "şahin", imageUrl: "/images/6011.webp", isCorrect: true, audioKey: "şahin", spokenText: "şahin" },
            { id: 6012, word: "tırtıl", imageUrl: "/images/6012.webp", isCorrect: false, audioKey: "tırtıl", spokenText: "tırtıl" }
        ]
    },
    {
        id: 12,
        question: "Yavaş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Yavaş olan hangisi?', correct: 'Evet! Tırtıl yavaştır.', wrong: 'Hayır, şahin hızlıdır.' }
        },
        options: [
            { id: 6012, word: "tırtıl", imageUrl: "/images/6012.webp", isCorrect: true, audioKey: "tırtıl", spokenText: "tırtıl" },
            { id: 6011, word: "şahin", imageUrl: "/images/6011.webp", isCorrect: false, audioKey: "şahin", spokenText: "şahin" }
        ]
    },
    // tavsan_kaplumbaga
    {
        id: 13,
        question: "Hızlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Hızlı olan hangisi?', correct: 'Evet! Tavşan hızlıdır.', wrong: 'Hayır, kaplumbağa yavaştır.' }
        },
        options: [
            { id: 6013, word: "tavşan", imageUrl: "/images/6013.webp", isCorrect: true, audioKey: "tavşan", spokenText: "tavşan" },
            { id: 6014, word: "kaplumbağa", imageUrl: "/images/6014.webp", isCorrect: false, audioKey: "kaplumbağa", spokenText: "kaplumbağa" }
        ]
    },
    {
        id: 14,
        question: "Yavaş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Yavaş olan hangisi?', correct: 'Evet! Kaplumbağa yavaştır.', wrong: 'Hayır, tavşan hızlıdır.' }
        },
        options: [
            { id: 6014, word: "kaplumbağa", imageUrl: "/images/6014.webp", isCorrect: true, audioKey: "kaplumbağa", spokenText: "kaplumbağa" },
            { id: 6013, word: "tavşan", imageUrl: "/images/6013.webp", isCorrect: false, audioKey: "tavşan", spokenText: "tavşan" }
        ]
    },
    // tekne_sandal
    {
        id: 15,
        question: "Hızlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Hızlı olan hangisi?', correct: 'Evet! Sürat teknesi hızlıdır.', wrong: 'Hayır, sandal yavaştır.' }
        },
        options: [
            { id: 6015, word: "sürat teknesi", imageUrl: "/images/6015.webp", isCorrect: true, audioKey: "sürat teknesi", spokenText: "sürat teknesi" },
            { id: 6016, word: "sandal", imageUrl: "/images/6016.webp", isCorrect: false, audioKey: "sandal", spokenText: "sandal" }
        ]
    },
    {
        id: 16,
        question: "Yavaş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Yavaş olan hangisi?', correct: 'Evet! Sandal yavaştır.', wrong: 'Hayır, sürat teknesi hızlıdır.' }
        },
        options: [
            { id: 6016, word: "sandal", imageUrl: "/images/6016.webp", isCorrect: true, audioKey: "sandal", spokenText: "sandal" },
            { id: 6015, word: "sürat teknesi", imageUrl: "/images/6015.webp", isCorrect: false, audioKey: "sürat teknesi", spokenText: "sürat teknesi" }
        ]
    },
    // tren_atarabasi
    {
        id: 17,
        question: "Hızlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Hızlı olan hangisi?', correct: 'Evet! Tren hızlıdır.', wrong: 'Hayır, at arabası yavaştır.' }
        },
        options: [
            { id: 6017, word: "tren", imageUrl: "/images/6017.webp", isCorrect: true, audioKey: "tren", spokenText: "tren" },
            { id: 6018, word: "at arabası", imageUrl: "/images/6018.webp", isCorrect: false, audioKey: "at arabası", spokenText: "at arabası" }
        ]
    },
    {
        id: 18,
        question: "Yavaş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Yavaş olan hangisi?', correct: 'Evet! At arabası yavaştır.', wrong: 'Hayır, tren hızlıdır.' }
        },
        options: [
            { id: 6018, word: "at arabası", imageUrl: "/images/6018.webp", isCorrect: true, audioKey: "at arabası", spokenText: "at arabası" },
            { id: 6017, word: "tren", imageUrl: "/images/6017.webp", isCorrect: false, audioKey: "tren", spokenText: "tren" }
        ]
    },
    // ucak_balon
    {
        id: 19,
        question: "Hızlı olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Hızlı olan hangisi?', correct: 'Evet! Uçak hızlıdır.', wrong: 'Hayır, balon yavaştır.' }
        },
        options: [
            { id: 6019, word: "uçak", imageUrl: "/images/6019.webp", isCorrect: true, audioKey: "uçak", spokenText: "uçak" },
            { id: 6020, word: "balon", imageUrl: "/images/6020.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 20,
        question: "Yavaş olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.FastSlow,
        speech: {
            tr: { question: 'Yavaş olan hangisi?', correct: 'Evet! Balon yavaştır.', wrong: 'Hayır, uçak hızlıdır.' }
        },
        options: [
            { id: 6020, word: "balon", imageUrl: "/images/6020.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 6019, word: "uçak", imageUrl: "/images/6019.webp", isCorrect: false, audioKey: "uçak", spokenText: "uçak" }
        ]
    },
];
