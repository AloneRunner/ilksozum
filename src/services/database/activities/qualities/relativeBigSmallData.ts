import { ConceptRound, ActivityType } from '../../../../types';

export const relativeBigSmallData: ConceptRound[] = [
    // 1. Fil (Aynı)
    { 
        id: 1, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.RelativeBigSmall, 
        speech: {
            tr: { correct: 'Evet! Bu fil büyüktür.', wrong: 'Hayır, bu fil küçüktür.' },
            en: { correct: 'Yes! This elephant is big.', wrong: 'No, this elephant is small.' }
        },
        options: [
            { id: 281, word: "fil", imageUrl: "/images/28.png", imageScale: 1.0, isCorrect: true, audioKey: "fil", spokenText: "fil" },
            { id: 282, word: "fil", imageUrl: "/images/28.png", imageScale: 0.5, isCorrect: false, audioKey: "fil", spokenText: "fil" }
        ]
    },
    { 
        id: 2, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.RelativeBigSmall, 
        speech: {
            tr: { correct: 'Evet! Bu fil küçüktür.', wrong: 'Hayır, bu fil büyüktür.' },
            en: { correct: 'Yes! This elephant is small.', wrong: 'No, this elephant is big.' }
        },
        options: [
            { id: 281, word: "fil", imageUrl: "/images/28.png", imageScale: 1.0, isCorrect: false, audioKey: "fil", spokenText: "fil" },
            { id: 282, word: "fil", imageUrl: "/images/28.png", imageScale: 0.5, isCorrect: true, audioKey: "fil", spokenText: "fil" }
        ]
    },

    // 2. Okul Otobüsü (Aynı)
    { 
        id: 3, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.RelativeBigSmall, 
        speech: {
            tr: { correct: 'Evet! Bu otobüs büyüktür.', wrong: 'Hayır, bu otobüs küçüktür.' },
            en: { correct: 'Yes! This bus is big.', wrong: 'No, this bus is small.' }
        },
        options: [
            { id: 1051, word: "okul otobüsü", imageUrl: "/images/105.png", imageScale: 1.0, isCorrect: true, audioKey: "okul_otobusu", spokenText: "okul otobüsü" },
            { id: 1052, word: "okul otobüsü", imageUrl: "/images/105.png", imageScale: 0.5, isCorrect: false, audioKey: "okul_otobusu", spokenText: "okul otobüsü" }
        ]
    },
    { 
        id: 4, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.RelativeBigSmall, 
        speech: {
            tr: { correct: 'Evet! Bu otobüs küçüktür.', wrong: 'Hayır, bu otobüs büyüktür.' },
            en: { correct: 'Yes! This bus is small.', wrong: 'No, this bus is big.' }
        },
        options: [
            { id: 1051, word: "okul otobüsü", imageUrl: "/images/105.png", imageScale: 1.0, isCorrect: false, audioKey: "okul_otobusu", spokenText: "okul otobüsü" },
            { id: 1052, word: "okul otobüsü", imageUrl: "/images/105.png", imageScale: 0.5, isCorrect: true, audioKey: "okul_otobusu", spokenText: "okul otobüsü" }
        ]
    },

    // 3. Balina (Aynı)
    { 
        id: 5, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.RelativeBigSmall, 
        speech: {
            tr: { correct: 'Evet! Bu balina büyüktür.', wrong: 'Hayır, bu balina küçüktür.' },
            en: { correct: 'Yes! This whale is big.', wrong: 'No, this whale is small.' }
        },
        options: [
            { id: 4911, word: "balina", imageUrl: "/images/491.png", imageScale: 1.0, isCorrect: true, audioKey: "balina", spokenText: "balina" },
            { id: 4912, word: "balina", imageUrl: "/images/491.png", imageScale: 0.5, isCorrect: false, audioKey: "balina", spokenText: "balina" }
        ]
    },
    { 
        id: 6, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.RelativeBigSmall, 
        speech: {
            tr: { correct: 'Evet! Bu balina küçüktür.', wrong: 'Hayır, bu balina büyüktür.' },
            en: { correct: 'Yes! This whale is small.', wrong: 'No, this whale is big.' }
        },
        options: [
            { id: 4911, word: "balina", imageUrl: "/images/491.png", imageScale: 1.0, isCorrect: false, audioKey: "balina", spokenText: "balina" },
            { id: 4912, word: "balina", imageUrl: "/images/491.png", imageScale: 0.5, isCorrect: true, audioKey: "balina", spokenText: "balina" }
        ]
    },

    // 4. Bisiklet (Aynı)
    { 
        id: 7, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.RelativeBigSmall, 
        speech: {
            tr: { correct: 'Evet! Bu bisiklet büyüktür.', wrong: 'Hayır, bu bisiklet küçüktür.' },
            en: { correct: 'Yes! This bicycle is big.', wrong: 'No, this bicycle is small.' }
        },
        options: [
            { id: 1101, word: "bisiklet", imageUrl: "/images/110.png", imageScale: 1.0, isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" },
            { id: 1102, word: "bisiklet", imageUrl: "/images/110.png", imageScale: 0.5, isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    { 
        id: 8, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.RelativeBigSmall, 
        speech: {
            tr: { correct: 'Evet! Bu bisiklet küçüktür.', wrong: 'Hayır, bu bisiklet büyüktür.' },
            en: { correct: 'Yes! This bicycle is small.', wrong: 'No, this bicycle is big.' }
        },
        options: [
            { id: 1101, word: "bisiklet", imageUrl: "/images/110.png", imageScale: 1.0, isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" },
            { id: 1102, word: "bisiklet", imageUrl: "/images/110.png", imageScale: 0.5, isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    }
];
