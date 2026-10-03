// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (seffaf-opak). Elle düzenleme.
// 9 çift, 18 soru. Görseller: gorsel-ham/seffaf-opak/ → id 4001-4014.
import { ConceptRound, ActivityType } from '../../../../types';

export const seffafOpakDataYeni: ConceptRound[] = [
    // balon
    {
        id: 1,
        question: "Şeffaf olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Şeffaf olan hangisi?', correct: 'Evet! Balon şeffaftır.', wrong: 'Hayır, bu balon opaktır.' }
        },
        options: [
            { id: 4001, word: "balon", imageUrl: "/images/4001.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 2305, word: "balon", imageUrl: "/images/2305.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    {
        id: 2,
        question: "Opak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Opak olan hangisi?', correct: 'Evet! Balon opaktır.', wrong: 'Hayır, bu balon şeffaftır.' }
        },
        options: [
            { id: 2305, word: "balon", imageUrl: "/images/2305.webp", isCorrect: true, audioKey: "balon", spokenText: "balon" },
            { id: 4001, word: "balon", imageUrl: "/images/4001.webp", isCorrect: false, audioKey: "balon", spokenText: "balon" }
        ]
    },
    // bardak
    {
        id: 3,
        question: "Şeffaf olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Şeffaf olan hangisi?', correct: 'Evet! Bardak şeffaftır.', wrong: 'Hayır, bu bardak opaktır.' }
        },
        options: [
            { id: 4003, word: "bardak", imageUrl: "/images/4003.webp", isCorrect: true, audioKey: "bardak", spokenText: "bardak" },
            { id: 4002, word: "bardak", imageUrl: "/images/4002.webp", isCorrect: false, audioKey: "bardak", spokenText: "bardak" }
        ]
    },
    {
        id: 4,
        question: "Opak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Opak olan hangisi?', correct: 'Evet! Bardak opaktır.', wrong: 'Hayır, bu bardak şeffaftır.' }
        },
        options: [
            { id: 4002, word: "bardak", imageUrl: "/images/4002.webp", isCorrect: true, audioKey: "bardak", spokenText: "bardak" },
            { id: 4003, word: "bardak", imageUrl: "/images/4003.webp", isCorrect: false, audioKey: "bardak", spokenText: "bardak" }
        ]
    },
    // kalemlik
    {
        id: 5,
        question: "Şeffaf olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Şeffaf olan hangisi?', correct: 'Evet! Kalemlik şeffaftır.', wrong: 'Hayır, bu kalemlik opaktır.' }
        },
        options: [
            { id: 4004, word: "kalemlik", imageUrl: "/images/4004.webp", isCorrect: true, audioKey: "kalemlik", spokenText: "kalemlik" },
            { id: 2606, word: "kalemlik", imageUrl: "/images/2606.webp", isCorrect: false, audioKey: "kalemlik", spokenText: "kalemlik" }
        ]
    },
    {
        id: 6,
        question: "Opak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Opak olan hangisi?', correct: 'Evet! Kalemlik opaktır.', wrong: 'Hayır, bu kalemlik şeffaftır.' }
        },
        options: [
            { id: 2606, word: "kalemlik", imageUrl: "/images/2606.webp", isCorrect: true, audioKey: "kalemlik", spokenText: "kalemlik" },
            { id: 4004, word: "kalemlik", imageUrl: "/images/4004.webp", isCorrect: false, audioKey: "kalemlik", spokenText: "kalemlik" }
        ]
    },
    // kavanoz
    {
        id: 7,
        question: "Şeffaf olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Şeffaf olan hangisi?', correct: 'Evet! Kavanoz şeffaftır.', wrong: 'Hayır, bu kavanoz opaktır.' }
        },
        options: [
            { id: 4006, word: "kavanoz", imageUrl: "/images/4006.webp", isCorrect: true, audioKey: "kavanoz", spokenText: "kavanoz" },
            { id: 4005, word: "kavanoz", imageUrl: "/images/4005.webp", isCorrect: false, audioKey: "kavanoz", spokenText: "kavanoz" }
        ]
    },
    {
        id: 8,
        question: "Opak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Opak olan hangisi?', correct: 'Evet! Kavanoz opaktır.', wrong: 'Hayır, bu kavanoz şeffaftır.' }
        },
        options: [
            { id: 4005, word: "kavanoz", imageUrl: "/images/4005.webp", isCorrect: true, audioKey: "kavanoz", spokenText: "kavanoz" },
            { id: 4006, word: "kavanoz", imageUrl: "/images/4006.webp", isCorrect: false, audioKey: "kavanoz", spokenText: "kavanoz" }
        ]
    },
    // kutu
    {
        id: 9,
        question: "Şeffaf olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Şeffaf olan hangisi?', correct: 'Evet! Kutu şeffaftır.', wrong: 'Hayır, bu kutu opaktır.' }
        },
        options: [
            { id: 4007, word: "kutu", imageUrl: "/images/4007.webp", isCorrect: true, audioKey: "kutu", spokenText: "kutu" },
            { id: 3014, word: "kutu", imageUrl: "/images/3014.webp", isCorrect: false, audioKey: "kutu", spokenText: "kutu" }
        ]
    },
    {
        id: 10,
        question: "Opak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Opak olan hangisi?', correct: 'Evet! Kutu opaktır.', wrong: 'Hayır, bu kutu şeffaftır.' }
        },
        options: [
            { id: 3014, word: "kutu", imageUrl: "/images/3014.webp", isCorrect: true, audioKey: "kutu", spokenText: "kutu" },
            { id: 4007, word: "kutu", imageUrl: "/images/4007.webp", isCorrect: false, audioKey: "kutu", spokenText: "kutu" }
        ]
    },
    // poset_torba
    {
        id: 11,
        question: "Şeffaf olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Şeffaf olan hangisi?', correct: 'Evet! Poşet şeffaftır.', wrong: 'Hayır, kâğıt torba opaktır.' }
        },
        options: [
            { id: 4009, word: "poşet", imageUrl: "/images/4009.webp", isCorrect: true, audioKey: "poşet", spokenText: "poşet" },
            { id: 4008, word: "kâğıt torba", imageUrl: "/images/4008.webp", isCorrect: false, audioKey: "kâğıt torba", spokenText: "kâğıt torba" }
        ]
    },
    {
        id: 12,
        question: "Opak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Opak olan hangisi?', correct: 'Evet! Kâğıt torba opaktır.', wrong: 'Hayır, poşet şeffaftır.' }
        },
        options: [
            { id: 4008, word: "kâğıt torba", imageUrl: "/images/4008.webp", isCorrect: true, audioKey: "kâğıt torba", spokenText: "kâğıt torba" },
            { id: 4009, word: "poşet", imageUrl: "/images/4009.webp", isCorrect: false, audioKey: "poşet", spokenText: "poşet" }
        ]
    },
    // şemsiye
    {
        id: 13,
        question: "Şeffaf olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Şeffaf olan hangisi?', correct: 'Evet! Şemsiye şeffaftır.', wrong: 'Hayır, bu şemsiye opaktır.' }
        },
        options: [
            { id: 4010, word: "şemsiye", imageUrl: "/images/4010.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 3019, word: "şemsiye", imageUrl: "/images/3019.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    {
        id: 14,
        question: "Opak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Opak olan hangisi?', correct: 'Evet! Şemsiye opaktır.', wrong: 'Hayır, bu şemsiye şeffaftır.' }
        },
        options: [
            { id: 3019, word: "şemsiye", imageUrl: "/images/3019.webp", isCorrect: true, audioKey: "şemsiye", spokenText: "şemsiye" },
            { id: 4010, word: "şemsiye", imageUrl: "/images/4010.webp", isCorrect: false, audioKey: "şemsiye", spokenText: "şemsiye" }
        ]
    },
    // şişe
    {
        id: 15,
        question: "Şeffaf olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Şeffaf olan hangisi?', correct: 'Evet! Şişe şeffaftır.', wrong: 'Hayır, bu şişe opaktır.' }
        },
        options: [
            { id: 4012, word: "şişe", imageUrl: "/images/4012.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 4011, word: "şişe", imageUrl: "/images/4011.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    {
        id: 16,
        question: "Opak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Opak olan hangisi?', correct: 'Evet! Şişe opaktır.', wrong: 'Hayır, bu şişe şeffaftır.' }
        },
        options: [
            { id: 4011, word: "şişe", imageUrl: "/images/4011.webp", isCorrect: true, audioKey: "şişe", spokenText: "şişe" },
            { id: 4012, word: "şişe", imageUrl: "/images/4012.webp", isCorrect: false, audioKey: "şişe", spokenText: "şişe" }
        ]
    },
    // su_sut
    {
        id: 17,
        question: "Şeffaf olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Şeffaf olan hangisi?', correct: 'Evet! Su şeffaftır.', wrong: 'Hayır, süt opaktır.' }
        },
        options: [
            { id: 4014, word: "su", imageUrl: "/images/4014.webp", isCorrect: true, audioKey: "su", spokenText: "su" },
            { id: 4013, word: "süt", imageUrl: "/images/4013.webp", isCorrect: false, audioKey: "süt", spokenText: "süt" }
        ]
    },
    {
        id: 18,
        question: "Opak olan hangisi?",
        questionAudioKey: "",
        activityType: ActivityType.SeffafOpak,
        speech: {
            tr: { question: 'Opak olan hangisi?', correct: 'Evet! Süt opaktır.', wrong: 'Hayır, su şeffaftır.' }
        },
        options: [
            { id: 4013, word: "süt", imageUrl: "/images/4013.webp", isCorrect: true, audioKey: "süt", spokenText: "süt" },
            { id: 4014, word: "su", imageUrl: "/images/4014.webp", isCorrect: false, audioKey: "su", spokenText: "su" }
        ]
    },
];
