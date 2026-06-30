import { ConceptRound, ActivityType } from '../../../../types';

export const nearFarData: ConceptRound[] = [
    // ----------------------------------------------------------------------
    // 1. Ev (174-175)
    // ----------------------------------------------------------------------
    { 
        id: 1, 
        question: "Hangi ev daha yakın?", 
        questionAudioKey: "q_which_is_near", 
        activityType: ActivityType.NearFar, 
        speech: {
            tr: { correct: 'Evet! Bu ev daha yakın.', wrong: 'Hayır, bu ev daha uzak.' },
            en: { correct: 'Yes! This house is nearer.', wrong: 'No, this house is farther.' },
            de: { correct: 'Ja! Dieses Haus ist näher.', wrong: 'Nein, dieses Haus ist weiter weg.' },
            fr: { correct: "Oui ! Cette maison est plus proche.", wrong: "Non, cette maison est plus loin." },
            nl: { correct: 'Ja! Dit huis is dichterbij.', wrong: 'Nee, dit huis is verder weg.' },
            az: { correct: 'Bəli! Bu ev daha yaxındır.', wrong: 'Xeyr, bu ev daha uzaqdır.' }
        },
        options: [
            { id: 174, word: "ev", imageUrl: "/images/174.png", isCorrect: true, audioKey: "ev_yakin", spokenText: "yakın" },
            { id: 175, word: "ev", imageUrl: "/images/175.png", isCorrect: false, audioKey: "ev_uzak", spokenText: "uzak" }
        ]
    },
    { 
        id: 2, 
        question: "Hangi ev daha uzak?", 
        questionAudioKey: "q_which_is_far", 
        activityType: ActivityType.NearFar, 
        speech: {
            tr: { correct: 'Evet! Bu ev daha uzak.', wrong: 'Hayır, bu ev daha yakın.' },
            en: { correct: 'Yes! This house is farther.', wrong: 'No, this house is nearer.' },
            de: { correct: 'Ja! Dieses Haus ist weiter weg.', wrong: 'Nein, dieses Haus ist näher.' },
            fr: { correct: "Oui ! Cette maison est plus loin.", wrong: "Non, cette maison est plus proche." },
            nl: { correct: 'Ja! Dit huis is verder weg.', wrong: 'Nee, dit huis is dichterbij.' },
            az: { correct: 'Bəli! Bu ev daha uzaqdır.', wrong: 'Xeyr, bu ev daha yaxındır.' }
        },
        options: [
            { id: 174, word: "ev", imageUrl: "/images/174.png", isCorrect: false, audioKey: "ev_yakin", spokenText: "yakın" },
            { id: 175, word: "ev", imageUrl: "/images/175.png", isCorrect: true, audioKey: "ev_uzak", spokenText: "uzak" }
        ]
    },

    // ----------------------------------------------------------------------
    // 2. Uçak (616-615)
    // ----------------------------------------------------------------------
    { 
        id: 3, 
        question: "Hangi uçak daha yakın?", 
        questionAudioKey: "q_which_is_near", 
        activityType: ActivityType.NearFar, 
        speech: {
            tr: { correct: 'Evet! Bu uçak daha yakın.', wrong: 'Hayır, bu uçak daha uzak.' },
            en: { correct: 'Yes! This plane is nearer.', wrong: 'No, this plane is farther.' },
            de: { correct: 'Ja! Dieses Flugzeug ist näher.', wrong: 'Nein, dieses Flugzeug ist weiter weg.' },
            fr: { correct: "Oui ! Cet avion est plus proche.", wrong: "Non, cet avion est plus loin." },
            nl: { correct: 'Ja! Dit vliegtuig is dichterbij.', wrong: 'Nee, dit vliegtuig is verder weg.' },
            az: { correct: 'Bəli! Bu təyyarə daha yaxındır.', wrong: 'Xeyr, bu təyyarə daha uzaqdır.' }
        },
        options: [
            { id: 616, word: "uçak", imageUrl: "/images/616.png", isCorrect: true, audioKey: "ucak_yakin", spokenText: "yakın" },
            { id: 615, word: "uçak", imageUrl: "/images/615.png", isCorrect: false, audioKey: "ucak_uzak", spokenText: "uzak" }
        ]
    },
    { 
        id: 4, 
        question: "Hangi uçak daha uzak?", 
        questionAudioKey: "q_which_is_far", 
        activityType: ActivityType.NearFar, 
        speech: {
            tr: { correct: 'Evet! Bu uçak daha uzak.', wrong: 'Hayır, bu uçak daha yakın.' },
            en: { correct: 'Yes! This plane is farther.', wrong: 'No, this plane is nearer.' },
            de: { correct: 'Ja! Dieses Flugzeug ist weiter weg.', wrong: 'Nein, dieses Flugzeug ist näher.' },
            fr: { correct: "Oui ! Cet avion est plus loin.", wrong: "Non, cet avion est plus proche." },
            nl: { correct: 'Ja! Dit vliegtuig is verder weg.', wrong: 'Nee, dit vliegtuig is dichterbij.' },
            az: { correct: 'Bəli! Bu təyyarə daha uzaqdır.', wrong: 'Xeyr, bu təyyarə daha yaxındır.' }
        },
        options: [
            { id: 616, word: "uçak", imageUrl: "/images/616.png", isCorrect: false, audioKey: "ucak_yakin", spokenText: "yakın" },
            { id: 615, word: "uçak", imageUrl: "/images/615.png", isCorrect: true, audioKey: "ucak_uzak", spokenText: "uzak" }
        ]
    },

    // ----------------------------------------------------------------------
    // 3. Kuşlar (617-618)
    // ----------------------------------------------------------------------
    { 
        id: 5, 
        question: "Hangi kuşlar daha yakın?", 
        questionAudioKey: "q_which_is_near", 
        activityType: ActivityType.NearFar, 
        speech: {
            tr: { correct: 'Evet! Bu kuşlar daha yakın.', wrong: 'Hayır, bu kuşlar daha uzak.' },
            en: { correct: 'Yes! These birds are nearer.', wrong: 'No, these birds are farther.' },
            de: { correct: 'Ja! Diese Vögel sind näher.', wrong: 'Nein, diese Vögel sind weiter weg.' },
            fr: { correct: "Oui ! Ces oiseaux sont plus proches.", wrong: "Non, ces oiseaux sont plus loin." },
            nl: { correct: 'Ja! Deze vogels zijn dichterbij.', wrong: 'Nee, deze vogels zijn verder weg.' },
            az: { correct: 'Bəli! Bu quşlar daha yaxındır.', wrong: 'Xeyr, bu quşlar daha uzaqdır.' }
        },
        options: [
            { id: 617, word: "kuşlar", imageUrl: "/images/617.png", isCorrect: true, audioKey: "kuslar_yakin", spokenText: "yakın" },
            { id: 618, word: "kuşlar", imageUrl: "/images/618.png", isCorrect: false, audioKey: "kuslar_uzak", spokenText: "uzak" }
        ]
    },
    { 
        id: 6, 
        question: "Hangi kuşlar daha uzak?", 
        questionAudioKey: "q_which_is_far", 
        activityType: ActivityType.NearFar, 
        speech: {
            tr: { correct: 'Evet! Bu kuşlar daha uzak.', wrong: 'Hayır, bu kuşlar daha yakın.' },
            en: { correct: 'Yes! These birds are farther.', wrong: 'No, these birds are nearer.' },
            de: { correct: 'Ja! Diese Vögel sind weiter weg.', wrong: 'Nein, diese Vögel sind näher.' },
            fr: { correct: "Oui ! Ces oiseaux sont plus loin.", wrong: "Non, ces oiseaux sont plus proches." },
            nl: { correct: 'Ja! Deze vogels zijn verder weg.', wrong: 'Nee, deze vogels zijn dichterbij.' },
            az: { correct: 'Bəli! Bu quşlar daha uzaqdır.', wrong: 'Xeyr, bu quşlar daha yaxındır.' }
        },
        options: [
            { id: 617, word: "kuşlar", imageUrl: "/images/617.png", isCorrect: false, audioKey: "kuslar_yakin", spokenText: "yakın" },
            { id: 618, word: "kuşlar", imageUrl: "/images/618.png", isCorrect: true, audioKey: "kuslar_uzak", spokenText: "uzak" }
        ]
    },

    // ----------------------------------------------------------------------
    // 4. Ay (619-620)
    // ----------------------------------------------------------------------
    { 
        id: 7, 
        question: "Hangi ay daha yakın?", 
        questionAudioKey: "q_which_is_near", 
        activityType: ActivityType.NearFar, 
        speech: {
            tr: { correct: 'Evet! Ay daha yakın.', wrong: 'Hayır, ay daha uzak.' },
            en: { correct: 'Yes! The moon is nearer.', wrong: 'No, the moon is farther.' },
            de: { correct: 'Ja! Der Mond ist näher.', wrong: 'Nein, der Mond ist weiter weg.' },
            fr: { correct: "Oui ! La lune est plus proche.", wrong: "Non, la lune est plus loin." },
            nl: { correct: 'Ja! De maan is dichterbij.', wrong: 'Nee, de maan is verder weg.' },
            az: { correct: 'Bəli! Ay daha yaxındır.', wrong: 'Xeyr, ay daha uzaqdır.' }
        },
        options: [
            { id: 619, word: "ay", imageUrl: "/images/619.png", isCorrect: true, audioKey: "ay_yakin", spokenText: "yakın" },
            { id: 620, word: "ay", imageUrl: "/images/620.png", isCorrect: false, audioKey: "ay_uzak", spokenText: "uzak" }
        ]
    },
    { 
        id: 8, 
        question: "Hangi ay daha uzak?", 
        questionAudioKey: "q_which_is_far", 
        activityType: ActivityType.NearFar, 
        speech: {
            tr: { correct: 'Evet! Ay daha uzak.', wrong: 'Hayır, ay daha yakın.' },
            en: { correct: 'Yes! The moon is farther.', wrong: 'No, the moon is nearer.' },
            de: { correct: 'Ja! Der Mond ist weiter weg.', wrong: 'Nein, der Mond ist näher.' },
            fr: { correct: "Oui ! La lune est plus loin.", wrong: "Non, la lune est plus proche." },
            nl: { correct: 'Ja! De maan is verder weg.', wrong: 'Nee, de maan is dichterbij.' },
            az: { correct: 'Bəli! Ay daha uzaqdır.', wrong: 'Xeyr, ay daha yaxındır.' }
        },
        options: [
            { id: 619, word: "ay", imageUrl: "/images/619.png", isCorrect: false, audioKey: "ay_yakin", spokenText: "yakın" },
            { id: 620, word: "ay", imageUrl: "/images/620.png", isCorrect: true, audioKey: "ay_uzak", spokenText: "uzak" }
        ]
    },

    // ----------------------------------------------------------------------
    // 5. Gemi (621-622)
    // ----------------------------------------------------------------------
    { 
        id: 9, 
        question: "Hangi gemi daha yakın?", 
        questionAudioKey: "q_which_is_near", 
        activityType: ActivityType.NearFar, 
        speech: {
            tr: { correct: 'Evet! Gemi daha yakın.', wrong: 'Hayır, gemi daha uzak.' },
            en: { correct: 'Yes! The ship is nearer.', wrong: 'No, the ship is farther.' },
            de: { correct: 'Ja! Das Schiff ist näher.', wrong: 'Nein, das Schiff ist weiter weg.' },
            fr: { correct: "Oui ! Le navire est plus proche.", wrong: "Non, le navire est plus loin." },
            nl: { correct: 'Ja! Het schip is dichterbij.', wrong: 'Nee, het schip is verder weg.' },
            az: { correct: 'Bəli! Gəmi daha yaxındır.', wrong: 'Xeyr, gəmi daha uzaqdır.' }
        },
        options: [
            { id: 621, word: "gemi", imageUrl: "/images/621.png", isCorrect: true, audioKey: "gemi_yakin", spokenText: "yakın" },
            { id: 622, word: "gemi", imageUrl: "/images/622.png", isCorrect: false, audioKey: "gemi_uzak", spokenText: "uzak" }
        ]
    },
    { 
        id: 10, 
        question: "Hangi gemi daha uzak?", 
        questionAudioKey: "q_which_is_far", 
        activityType: ActivityType.NearFar, 
        speech: {
            tr: { correct: 'Evet! Gemi daha uzak.', wrong: 'Hayır, gemi daha yakın.' },
            en: { correct: 'Yes! The ship is farther.', wrong: 'No, the ship is nearer.' },
            de: { correct: 'Ja! Das Schiff ist weiter weg.', wrong: 'Nein, das Schiff ist näher.' },
            fr: { correct: "Oui ! Le navire est plus loin.", wrong: "Non, le navire est plus proche." },
            nl: { correct: 'Ja! Het schip is verder weg.', wrong: 'Nee, het schip is dichterbij.' },
            az: { correct: 'Bəli! Gəmi daha uzaqdır.', wrong: 'Xeyr, gəmi daha yaxındır.' }
        },
        options: [
            { id: 621, word: "gemi", imageUrl: "/images/621.png", isCorrect: false, audioKey: "gemi_yakin", spokenText: "yakın" },
            { id: 622, word: "gemi", imageUrl: "/images/622.png", isCorrect: true, audioKey: "gemi_uzak", spokenText: "uzak" }
        ]
    },
];