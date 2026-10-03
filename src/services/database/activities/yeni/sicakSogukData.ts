// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (sicak-soguk). Elle düzenleme.
// 10 çift, 20 soru. Görseller: gorsel-ham/sicak-soguk/ → id 3601-3620.
import { ConceptRound, ActivityType } from '../../../../types';

export const hotColdDataYeni: ConceptRound[] = [
    // ates_kardanadam
    {
        id: 1,
        question: "Sıcak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Sıcak olan hangisi?', correct: 'Evet! Ateş sıcaktır.', wrong: 'Hayır, kardan adam soğuktur.' }
        },
        options: [
            { id: 3601, word: "ateş", imageUrl: "/images/3601.webp", isCorrect: true, audioKey: "ateş", spokenText: "ateş" },
            { id: 3602, word: "kardan adam", imageUrl: "/images/3602.webp", isCorrect: false, audioKey: "kardan adam", spokenText: "kardan adam" }
        ]
    },
    {
        id: 2,
        question: "Soğuk olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Soğuk olan hangisi?', correct: 'Evet! Kardan adam soğuktur.', wrong: 'Hayır, ateş sıcaktır.' }
        },
        options: [
            { id: 3602, word: "kardan adam", imageUrl: "/images/3602.webp", isCorrect: true, audioKey: "kardan adam", spokenText: "kardan adam" },
            { id: 3601, word: "ateş", imageUrl: "/images/3601.webp", isCorrect: false, audioKey: "ateş", spokenText: "ateş" }
        ]
    },
    // caydanlik_surahi
    {
        id: 3,
        question: "Sıcak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Sıcak olan hangisi?', correct: 'Evet! Çaydanlık sıcaktır.', wrong: 'Hayır, buzlu su soğuktur.' }
        },
        options: [
            { id: 3603, word: "çaydanlık", imageUrl: "/images/3603.webp", isCorrect: true, audioKey: "çaydanlık", spokenText: "çaydanlık" },
            { id: 3604, word: "buzlu su", imageUrl: "/images/3604.webp", isCorrect: false, audioKey: "buzlu su", spokenText: "buzlu su" }
        ]
    },
    {
        id: 4,
        question: "Soğuk olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Soğuk olan hangisi?', correct: 'Evet! Buzlu su soğuktur.', wrong: 'Hayır, çaydanlık sıcaktır.' }
        },
        options: [
            { id: 3604, word: "buzlu su", imageUrl: "/images/3604.webp", isCorrect: true, audioKey: "buzlu su", spokenText: "buzlu su" },
            { id: 3603, word: "çaydanlık", imageUrl: "/images/3603.webp", isCorrect: false, audioKey: "çaydanlık", spokenText: "çaydanlık" }
        ]
    },
    // cikolata_limonata
    {
        id: 5,
        question: "Sıcak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Sıcak olan hangisi?', correct: 'Evet! Sıcak çikolata sıcaktır.', wrong: 'Hayır, limonata soğuktur.' }
        },
        options: [
            { id: 3605, word: "sıcak çikolata", imageUrl: "/images/3605.webp", isCorrect: true, audioKey: "sıcak çikolata", spokenText: "sıcak çikolata" },
            { id: 3606, word: "limonata", imageUrl: "/images/3606.webp", isCorrect: false, audioKey: "limonata", spokenText: "limonata" }
        ]
    },
    {
        id: 6,
        question: "Soğuk olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Soğuk olan hangisi?', correct: 'Evet! Limonata soğuktur.', wrong: 'Hayır, sıcak çikolata sıcaktır.' }
        },
        options: [
            { id: 3606, word: "limonata", imageUrl: "/images/3606.webp", isCorrect: true, audioKey: "limonata", spokenText: "limonata" },
            { id: 3605, word: "sıcak çikolata", imageUrl: "/images/3605.webp", isCorrect: false, audioKey: "sıcak çikolata", spokenText: "sıcak çikolata" }
        ]
    },
    // corba_dondurma
    {
        id: 7,
        question: "Sıcak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Sıcak olan hangisi?', correct: 'Evet! Çorba sıcaktır.', wrong: 'Hayır, dondurma soğuktur.' }
        },
        options: [
            { id: 3607, word: "çorba", imageUrl: "/images/3607.webp", isCorrect: true, audioKey: "çorba", spokenText: "çorba" },
            { id: 3608, word: "dondurma", imageUrl: "/images/3608.webp", isCorrect: false, audioKey: "dondurma", spokenText: "dondurma" }
        ]
    },
    {
        id: 8,
        question: "Soğuk olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Soğuk olan hangisi?', correct: 'Evet! Dondurma soğuktur.', wrong: 'Hayır, çorba sıcaktır.' }
        },
        options: [
            { id: 3608, word: "dondurma", imageUrl: "/images/3608.webp", isCorrect: true, audioKey: "dondurma", spokenText: "dondurma" },
            { id: 3607, word: "çorba", imageUrl: "/images/3607.webp", isCorrect: false, audioKey: "çorba", spokenText: "çorba" }
        ]
    },
    // ekmek_bezelye
    {
        id: 9,
        question: "Sıcak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Sıcak olan hangisi?', correct: 'Evet! Ekmek sıcaktır.', wrong: 'Hayır, dondurulmuş bezelye soğuktur.' }
        },
        options: [
            { id: 3609, word: "ekmek", imageUrl: "/images/3609.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 3610, word: "dondurulmuş bezelye", imageUrl: "/images/3610.webp", isCorrect: false, audioKey: "dondurulmuş bezelye", spokenText: "dondurulmuş bezelye" }
        ]
    },
    {
        id: 10,
        question: "Soğuk olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Soğuk olan hangisi?', correct: 'Evet! Dondurulmuş bezelye soğuktur.', wrong: 'Hayır, ekmek sıcaktır.' }
        },
        options: [
            { id: 3610, word: "dondurulmuş bezelye", imageUrl: "/images/3610.webp", isCorrect: true, audioKey: "dondurulmuş bezelye", spokenText: "dondurulmuş bezelye" },
            { id: 3609, word: "ekmek", imageUrl: "/images/3609.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    // hava
    {
        id: 11,
        question: "Hangi resimde hava sıcak?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Hangi resimde hava sıcak?', correct: 'Evet! Hava sıcaktır.', wrong: 'Hayır, bu hava soğuktur.' }
        },
        options: [
            { id: 3611, word: "hava", imageUrl: "/images/3611.webp", isCorrect: true, audioKey: "hava", spokenText: "hava" },
            { id: 3612, word: "hava", imageUrl: "/images/3612.webp", isCorrect: false, audioKey: "hava", spokenText: "hava" }
        ]
    },
    {
        id: 12,
        question: "Hangi resimde hava soğuk?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Hangi resimde hava soğuk?', correct: 'Evet! Hava soğuktur.', wrong: 'Hayır, bu hava sıcaktır.' }
        },
        options: [
            { id: 3612, word: "hava", imageUrl: "/images/3612.webp", isCorrect: true, audioKey: "hava", spokenText: "hava" },
            { id: 3611, word: "hava", imageUrl: "/images/3611.webp", isCorrect: false, audioKey: "hava", spokenText: "hava" }
        ]
    },
    // kupa
    {
        id: 13,
        question: "Hangi kupa sıcak?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Hangi kupa sıcak?', correct: 'Evet! Kupadaki içecek sıcaktır.', wrong: 'Hayır, bu kupadaki içecek soğuktur.' }
        },
        options: [
            { id: 3613, word: "kupa", imageUrl: "/images/3613.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 3614, word: "kupa", imageUrl: "/images/3614.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    {
        id: 14,
        question: "Hangi kupa soğuk?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Hangi kupa soğuk?', correct: 'Evet! Kupadaki içecek soğuktur.', wrong: 'Hayır, bu kupadaki içecek sıcaktır.' }
        },
        options: [
            { id: 3614, word: "kupa", imageUrl: "/images/3614.webp", isCorrect: true, audioKey: "kupa", spokenText: "kupa" },
            { id: 3613, word: "kupa", imageUrl: "/images/3613.webp", isCorrect: false, audioKey: "kupa", spokenText: "kupa" }
        ]
    },
    // soba_pencere
    {
        id: 15,
        question: "Sıcak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Sıcak olan hangisi?', correct: 'Evet! Soba sıcaktır.', wrong: 'Hayır, buzlu pencere soğuktur.' }
        },
        options: [
            { id: 3615, word: "soba", imageUrl: "/images/3615.webp", isCorrect: true, audioKey: "soba", spokenText: "soba" },
            { id: 3616, word: "buzlu pencere", imageUrl: "/images/3616.webp", isCorrect: false, audioKey: "buzlu pencere", spokenText: "buzlu pencere" }
        ]
    },
    {
        id: 16,
        question: "Soğuk olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Soğuk olan hangisi?', correct: 'Evet! Buzlu pencere soğuktur.', wrong: 'Hayır, soba sıcaktır.' }
        },
        options: [
            { id: 3616, word: "buzlu pencere", imageUrl: "/images/3616.webp", isCorrect: true, audioKey: "buzlu pencere", spokenText: "buzlu pencere" },
            { id: 3615, word: "soba", imageUrl: "/images/3615.webp", isCorrect: false, audioKey: "soba", spokenText: "soba" }
        ]
    },
    // süt
    {
        id: 17,
        question: "Hangi süt sıcak?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Hangi süt sıcak?', correct: 'Evet! Süt sıcaktır.', wrong: 'Hayır, bu süt soğuktur.' }
        },
        options: [
            { id: 3617, word: "süt", imageUrl: "/images/3617.webp", isCorrect: true, audioKey: "süt", spokenText: "süt" },
            { id: 3618, word: "süt", imageUrl: "/images/3618.webp", isCorrect: false, audioKey: "süt", spokenText: "süt" }
        ]
    },
    {
        id: 18,
        question: "Hangi süt soğuk?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Hangi süt soğuk?', correct: 'Evet! Süt soğuktur.', wrong: 'Hayır, bu süt sıcaktır.' }
        },
        options: [
            { id: 3618, word: "süt", imageUrl: "/images/3618.webp", isCorrect: true, audioKey: "süt", spokenText: "süt" },
            { id: 3617, word: "süt", imageUrl: "/images/3617.webp", isCorrect: false, audioKey: "süt", spokenText: "süt" }
        ]
    },
    // utu_buz
    {
        id: 19,
        question: "Sıcak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Sıcak olan hangisi?', correct: 'Evet! Ütü sıcaktır.', wrong: 'Hayır, buz soğuktur.' }
        },
        options: [
            { id: 3619, word: "ütü", imageUrl: "/images/3619.webp", isCorrect: true, audioKey: "ütü", spokenText: "ütü" },
            { id: 3620, word: "buz", imageUrl: "/images/3620.webp", isCorrect: false, audioKey: "buz", spokenText: "buz" }
        ]
    },
    {
        id: 20,
        question: "Soğuk olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.HotCold,
        speech: {
            tr: { question: 'Soğuk olan hangisi?', correct: 'Evet! Buz soğuktur.', wrong: 'Hayır, ütü sıcaktır.' }
        },
        options: [
            { id: 3620, word: "buz", imageUrl: "/images/3620.webp", isCorrect: true, audioKey: "buz", spokenText: "buz" },
            { id: 3619, word: "ütü", imageUrl: "/images/3619.webp", isCorrect: false, audioKey: "ütü", spokenText: "ütü" }
        ]
    },
];
