import { ConceptRound, ActivityType } from '../../../../types';

export const oldNewData: ConceptRound[] = [
    // 1. Bisiklet
    { 
        id: 1, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Bisiklet eskidir.', wrong: 'Hayır, bisiklet yenidir.' },
            en: { correct: 'Yes! The bicycle is old.', wrong: 'No, the bicycle is new.' },
            de: { correct: 'Ja! Das Fahrrad ist alt.', wrong: 'Nein, das Fahrrad ist neu.' },
            fr: { correct: "Oui ! Le vélo est vieux.", wrong: "Non, le vélo est neuf." },
            nl: { correct: 'Ja! De fiets is oud.', wrong: 'Nee, de fiets is nieuw.' },
            az: { correct: 'Bəli! Velosiped köhnədir.', wrong: 'Xeyr, velosiped yenidir.' }
        },
        options: [
            { id: 907, word: "bisiklet", imageUrl: "/images/907.webp", isCorrect: true, audioKey: "bisiklet", spokenText: "eski bisiklet" },
            { id: 910, word: "bisiklet", imageUrl: "/images/910.webp", isCorrect: false, audioKey: "bisiklet", spokenText: "yeni bisiklet" }
        ]
    },
    { 
        id: 2, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Bisiklet yenidir.', wrong: 'Hayır, bisiklet eskidir.' },
            en: { correct: 'Yes! The bicycle is new.', wrong: 'No, the bicycle is old.' },
            de: { correct: 'Ja! Das Fahrrad ist neu.', wrong: 'Nein, das Fahrrad ist alt.' },
            fr: { correct: "Oui ! Le vélo est neuf.", wrong: "Non, le vélo est vieux." },
            nl: { correct: 'Ja! De fiets is nieuw.', wrong: 'Nee, de fiets is oud.' },
            az: { correct: 'Bəli! Velosiped yenidir.', wrong: 'Xeyr, velosiped köhnədir.' }
        },
        options: [
            { id: 907, word: "bisiklet", imageUrl: "/images/907.webp", isCorrect: false, audioKey: "bisiklet", spokenText: "eski bisiklet" },
            { id: 910, word: "bisiklet", imageUrl: "/images/910.webp", isCorrect: true, audioKey: "bisiklet", spokenText: "yeni bisiklet" }
        ]
    },

    // 2. Araba (Animasyon)
    { 
        id: 3, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Araba eskidir.', wrong: 'Hayır, araba yenidir.' },
            en: { correct: 'Yes! The car is old.', wrong: 'No, the car is new.' },
            de: { correct: 'Ja! Das Auto ist alt.', wrong: 'Nein, das Auto ist neu.' },
            fr: { correct: "Oui ! La voiture est vieille.", wrong: "Non, la voiture est neuve." },
            nl: { correct: 'Ja! De auto is oud.', wrong: 'Nee, de auto is nieuw.' },
            az: { correct: 'Bəli! Maşın köhnədir.', wrong: 'Xeyr, maşın yenidir.' }
        },
        options: [
            { id: 911, word: "araba", imageUrl: "/images/911.webp", isCorrect: true, audioKey: "araba", spokenText: "eski araba" },
            { id: 912, word: "araba", imageUrl: "/images/912.webp", isCorrect: false, audioKey: "araba", spokenText: "yeni araba" }
        ]
    },
    { 
        id: 4, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Araba yenidir.', wrong: 'Hayır, araba eskidir.' },
            en: { correct: 'Yes! The car is new.', wrong: 'No, the car is old.' },
            de: { correct: 'Ja! Das Auto ist neu.', wrong: 'Nein, das Auto ist alt.' },
            fr: { correct: "Oui ! La voiture est neuve.", wrong: "Non, la voiture est vieille." },
            nl: { correct: 'Ja! De auto is nieuw.', wrong: 'Nee, de auto is oud.' },
            az: { correct: 'Bəli! Maşın yenidir.', wrong: 'Xeyr, maşın köhnədir.' }
        },
        options: [
            { id: 911, word: "araba", imageUrl: "/images/911.webp", isCorrect: false, audioKey: "araba", spokenText: "eski araba" },
            { id: 912, word: "araba", imageUrl: "/images/912.webp", isCorrect: true, audioKey: "araba", spokenText: "yeni araba" }
        ]
    },

    // 3. Tren
    { 
        id: 5, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Tren eskidir.', wrong: 'Hayır, tren yenidir.' },
            en: { correct: 'Yes! The train is old.', wrong: 'No, the train is new.' },
            de: { correct: 'Ja! Der Zug ist alt.', wrong: 'Nein, der Zug ist neu.' },
            fr: { correct: "Oui ! Le train est vieux.", wrong: "Non, le train est neuf." },
            nl: { correct: 'Ja! De trein is oud.', wrong: 'Nee, de trein is nieuw.' },
            az: { correct: 'Bəli! Qatar köhnədir.', wrong: 'Xeyr, qatar yenidir.' }
        },
        options: [
            { id: 913, word: "tren", imageUrl: "/images/913.webp", isCorrect: true, audioKey: "tren", spokenText: "eski tren" },
            { id: 914, word: "tren", imageUrl: "/images/914.webp", isCorrect: false, audioKey: "tren", spokenText: "yeni tren" }
        ]
    },
    { 
        id: 6, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Tren yenidir.', wrong: 'Hayır, tren eskidir.' },
            en: { correct: 'Yes! The train is new.', wrong: 'No, the train is old.' },
            de: { correct: 'Ja! Der Zug ist neu.', wrong: 'Nein, der Zug ist alt.' },
            fr: { correct: "Oui ! Le train est neuf.", wrong: "Non, le train est vieux." },
            nl: { correct: 'Ja! De trein is nieuw.', wrong: 'Nee, de trein is oud.' },
            az: { correct: 'Bəli! Qatar yenidir.', wrong: 'Xeyr, qatar köhnədir.' }
        },
        options: [
            { id: 913, word: "tren", imageUrl: "/images/913.webp", isCorrect: false, audioKey: "tren", spokenText: "eski tren" },
            { id: 914, word: "tren", imageUrl: "/images/914.webp", isCorrect: true, audioKey: "tren", spokenText: "yeni tren" }
        ]
    },

    // 4. Ayakkabı
    { 
        id: 7, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Ayakkabı eskidir.', wrong: 'Hayır, ayakkabı yenidir.' },
            en: { correct: 'Yes! The shoe is old.', wrong: 'No, the shoe is new.' },
            de: { correct: 'Ja! Der Schuh ist alt.', wrong: 'Nein, der Schuh ist neu.' },
            fr: { correct: "Oui ! La chaussure est vieille.", wrong: "Non, la chaussure est neuve." },
            nl: { correct: 'Ja! De schoen is oud.', wrong: 'Nee, de schoen is nieuw.' },
            az: { correct: 'Bəli! Ayaqqabı köhnədir.', wrong: 'Xeyr, ayaqqabı yenidir.' }
        },
        options: [
            { id: 60, word: "ayakkabı", imageUrl: "/images/60.png", isCorrect: true, audioKey: "ayakkabi", spokenText: "eski ayakkabı" },
            { id: 59, word: "ayakkabı", imageUrl: "/images/59.png", isCorrect: false, audioKey: "ayakkabi", spokenText: "yeni ayakkabı" }
        ]
    },
    { 
        id: 8, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Ayakkabı yenidir.', wrong: 'Hayır, ayakkabı eskidir.' },
            en: { correct: 'Yes! The shoe is new.', wrong: 'No, the shoe is old.' },
            de: { correct: 'Ja! Der Schuh ist neu.', wrong: 'Nein, der Schuh ist alt.' },
            fr: { correct: "Oui ! La chaussure est neuve.", wrong: "Non, la chaussure est vieille." },
            nl: { correct: 'Ja! De schoen is nieuw.', wrong: 'Nee, de schoen is oud.' },
            az: { correct: 'Bəli! Ayaqqabı yenidir.', wrong: 'Xeyr, ayaqqabı köhnədir.' }
        },
        options: [
            { id: 60, word: "ayakkabı", imageUrl: "/images/60.png", isCorrect: false, audioKey: "ayakkabi", spokenText: "eski ayakkabı" },
            { id: 59, word: "ayakkabı", imageUrl: "/images/59.png", isCorrect: true, audioKey: "ayakkabi", spokenText: "yeni ayakkabı" }
        ]
    },

    // 5. Kale vs Ev
    { 
        id: 9, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Kale eskidir.', wrong: 'Hayır, ev yenidir.' },
            en: { correct: 'Yes! The castle is old.', wrong: 'No, the house is new.' },
            de: { correct: 'Ja! Die Burg ist alt.', wrong: 'Nein, das Haus ist neu.' },
            fr: { correct: "Oui ! Le château est vieux.", wrong: "Non, la maison est neuve." },
            nl: { correct: 'Ja! Het kasteel is oud.', wrong: 'Nee, het huis is nieuw.' },
            az: { correct: 'Bəli! Qala köhnədir.', wrong: 'Xeyr, ev yenidir.' }
        },
        options: [
            { id: 212, word: "kale", imageUrl: "/images/212.png", isCorrect: true, audioKey: "kale", spokenText: "eski kale" },
            { id: 174, word: "ev", imageUrl: "/images/174.png", isCorrect: false, audioKey: "ev", spokenText: "yeni ev" }
        ]
    },
    { 
        id: 10, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Ev yenidir.', wrong: 'Hayır, kale eskidir.' },
            en: { correct: 'Yes! The house is new.', wrong: 'No, the castle is old.' },
            de: { correct: 'Ja! Das Haus ist neu.', wrong: 'Nein, die Burg ist alt.' },
            fr: { correct: "Oui ! La maison est neuve.", wrong: "Non, le château est vieux." },
            nl: { correct: 'Ja! Het huis is nieuw.', wrong: 'Nee, het kasteel is oud.' },
            az: { correct: 'Bəli! Ev yenidir.', wrong: 'Xeyr, qala köhnədir.' }
        },
        options: [
            { id: 212, word: "kale", imageUrl: "/images/212.png", isCorrect: false, audioKey: "kale", spokenText: "eski kale" },
            { id: 174, word: "ev", imageUrl: "/images/174.png", isCorrect: true, audioKey: "ev", spokenText: "yeni ev" }
        ]
    },

    // 6. Sandalye
    { 
        id: 11, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Sandalye eskidir.', wrong: 'Hayır, sandalye yenidir.' },
            en: { correct: 'Yes! The chair is old.', wrong: 'No, the chair is new.' },
            de: { correct: 'Ja! Der Stuhl ist alt.', wrong: 'Nein, der Stuhl ist neu.' },
            fr: { correct: "Oui ! La chaise est vieille.", wrong: "Non, la chaise est neuve." },
            nl: { correct: 'Ja! De stoel is oud.', wrong: 'Nee, de stoel is nieuw.' },
            az: { correct: 'Bəli! Stul köhnədir.', wrong: 'Xeyr, stul yenidir.' }
        },
        options: [
            { id: 318, word: "sandalye", imageUrl: "/images/318.png", isCorrect: true, audioKey: "kirik_sandalye", spokenText: "eski sandalye" },
            { id: 319, word: "sandalye", imageUrl: "/images/319.png", isCorrect: false, audioKey: "sandalye", spokenText: "yeni sandalye" }
        ]
    },
    { 
        id: 12, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Sandalye yenidir.', wrong: 'Hayır, sandalye eskidir.' },
            en: { correct: 'Yes! The chair is new.', wrong: 'No, the chair is old.' },
            de: { correct: 'Ja! Der Stuhl ist neu.', wrong: 'Nein, der Stuhl ist alt.' },
            fr: { correct: "Oui ! La chaise est neuve.", wrong: "Non, la chaise est vieille." },
            nl: { correct: 'Ja! De stoel is nieuw.', wrong: 'Nee, de stoel is oud.' },
            az: { correct: 'Bəli! Stul yenidir.', wrong: 'Xeyr, stul köhnədir.' }
        },
        options: [
            { id: 318, word: "sandalye", imageUrl: "/images/318.png", isCorrect: false, audioKey: "kirik_sandalye", spokenText: "eski sandalye" },
            { id: 319, word: "sandalye", imageUrl: "/images/319.png", isCorrect: true, audioKey: "sandalye", spokenText: "yeni sandalye" }
        ]
    },

    // 7. Araba (Kırık vs Yeni)
    { 
        id: 13, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Araba eskidir.', wrong: 'Hayır, araba yenidir.' },
            en: { correct: 'Yes! The car is old.', wrong: 'No, the car is new.' },
            de: { correct: 'Ja! Das Auto ist alt.', wrong: 'Nein, das Auto ist neu.' },
            fr: { correct: "Oui ! La voiture est vieille.", wrong: "Non, la voiture est neuve." },
            nl: { correct: 'Ja! De auto is oud.', wrong: 'Nee, de auto is nieuw.' },
            az: { correct: 'Bəli! Maşın köhnədir.', wrong: 'Xeyr, maşın yenidir.' }
        },
        options: [
            { id: 108, word: "araba", imageUrl: "/images/108.png", isCorrect: true, audioKey: "kirik_araba", spokenText: "eski araba" },
            { id: 1, word: "araba", imageUrl: "/images/1.png", isCorrect: false, audioKey: "araba", spokenText: "yeni araba" }
        ]
    },
    { 
        id: 14, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Araba yenidir.', wrong: 'Hayır, araba eskidir.' },
            en: { correct: 'Yes! The car is new.', wrong: 'No, the car is old.' },
            de: { correct: 'Ja! Das Auto ist neu.', wrong: 'Nein, das Auto ist alt.' },
            fr: { correct: "Oui ! La voiture est neuve.", wrong: "Non, la voiture est vieille." },
            nl: { correct: 'Ja! De auto is nieuw.', wrong: 'Nee, de auto is oud.' },
            az: { correct: 'Bəli! Maşın yenidir.', wrong: 'Xeyr, maşın köhnədir.' }
        },
        options: [
            { id: 108, word: "araba", imageUrl: "/images/108.png", isCorrect: false, audioKey: "kirik_araba", spokenText: "eski araba" },
            { id: 1, word: "araba", imageUrl: "/images/1.png", isCorrect: true, audioKey: "araba", spokenText: "yeni araba" }
        ]
    },

    // 8. Kitap
    { 
        id: 15, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Kitap eskidir.', wrong: 'Hayır, kitap yenidir.' },
            en: { correct: 'Yes! The book is old.', wrong: 'No, the book is new.' },
            de: { correct: 'Ja! Das Buch ist alt.', wrong: 'Nein, das Buch ist neu.' },
            fr: { correct: "Oui ! Le livre est vieux.", wrong: "Non, le livre est neuf." },
            nl: { correct: 'Ja! Het boek is oud.', wrong: 'Nee, het boek is nieuw.' },
            az: { correct: 'Bəli! Kitab köhnədir.', wrong: 'Xeyr, kitab yenidir.' }
        },
        options: [
            { id: 570, word: "kitap", imageUrl: "/images/570.png", isCorrect: true, audioKey: "kitap", spokenText: "eski kitap" },
            { id: 37, word: "kitap", imageUrl: "/images/37.png", isCorrect: false, audioKey: "kitap", spokenText: "yeni kitap" }
        ]
    },
    { 
        id: 16, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Kitap yenidir.', wrong: 'Hayır, kitap eskidir.' },
            en: { correct: 'Yes! The book is new.', wrong: 'No, the book is old.' },
            de: { correct: 'Ja! Das Buch ist neu.', wrong: 'Nein, das Buch ist alt.' },
            fr: { correct: "Oui ! Le livre est neuf.", wrong: "Non, le livre est vieux." },
            nl: { correct: 'Ja! Het boek is nieuw.', wrong: 'Nee, het boek is oud.' },
            az: { correct: 'Bəli! Kitab yenidir.', wrong: 'Xeyr, kitab köhnədir.' }
        },
        options: [
            { id: 570, word: "kitap", imageUrl: "/images/570.png", isCorrect: false, audioKey: "kitap", spokenText: "eski kitap" },
            { id: 37, word: "kitap", imageUrl: "/images/37.png", isCorrect: true, audioKey: "kitap", spokenText: "yeni kitap" }
        ]
    },

    // 9. Ampul vs Led Ampul
    { 
        id: 17, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Ampul eskidir.', wrong: 'Hayır, led ampul yenidir.' },
            en: { correct: 'Yes! The light bulb is old.', wrong: 'No, the led bulb is new.' },
            de: { correct: 'Ja! Die Glühbirne ist alt.', wrong: 'Nein, die LED-Lampe ist neu.' },
            fr: { correct: "Oui ! L'ampoule est vieille.", wrong: "Non, l'ampoule LED est neuve." },
            nl: { correct: 'Ja! De gloeilamp is oud.', wrong: 'Nee, de LED-lamp is nieuw.' },
            az: { correct: 'Bəli! Lampa köhnədir.', wrong: 'Xeyr, led lampa yenidir.' }
        },
        options: [
            { id: 574, word: "ampul", imageUrl: "/images/574.png", isCorrect: true, audioKey: "ampul", spokenText: "eski ampul" },
            { id: 887, word: "led ampul", imageUrl: "/images/887.png", isCorrect: false, audioKey: "led_ampul", spokenText: "yeni ampul" }
        ]
    },
    { 
        id: 18, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Led ampul yenidir.', wrong: 'Hayır, ampul eskidir.' },
            en: { correct: 'Yes! The led bulb is new.', wrong: 'No, the light bulb is old.' },
            de: { correct: 'Ja! Die LED-Lampe ist neu.', wrong: 'Nein, die Glühbirne ist alt.' },
            fr: { correct: "Oui ! L'ampoule LED est neuve.", wrong: "Non, l'ampoule est vieille." },
            nl: { correct: 'Ja! De LED-lamp is nieuw.', wrong: 'Nee, de gloeilamp is oud.' },
            az: { correct: 'Bəli! Led lampa yenidir.', wrong: 'Xeyr, lampa köhnədir.' }
        },
        options: [
            { id: 574, word: "ampul", imageUrl: "/images/574.png", isCorrect: false, audioKey: "ampul", spokenText: "eski ampul" },
            { id: 887, word: "led ampul", imageUrl: "/images/887.png", isCorrect: true, audioKey: "led_ampul", spokenText: "yeni ampul" }
        ]
    },

    // 10. Ev
    { 
        id: 19, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Ev eskidir.', wrong: 'Hayır, ev yenidir.' },
            en: { correct: 'Yes! The house is old.', wrong: 'No, the house is new.' },
            de: { correct: 'Ja! Das Haus ist alt.', wrong: 'Nein, das Haus ist neu.' },
            fr: { correct: "Oui ! La maison est vieille.", wrong: "Non, la maison est neuve." },
            nl: { correct: 'Ja! Het huis is oud.', wrong: 'Nee, het huis is nieuw.' },
            az: { correct: 'Bəli! Ev köhnədir.', wrong: 'Xeyr, ev yenidir.' }
        },
        options: [
            { id: 888, word: "ev", imageUrl: "/images/888.png", isCorrect: true, audioKey: "ev", spokenText: "eski ev" },
            { id: 889, word: "ev", imageUrl: "/images/889.png", isCorrect: false, audioKey: "ev", spokenText: "yeni ev" }
        ]
    },
    { 
        id: 20, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Ev yenidir.', wrong: 'Hayır, ev eskidir.' },
            en: { correct: 'Yes! The house is new.', wrong: 'No, the house is old.' },
            de: { correct: 'Ja! Das Haus ist neu.', wrong: 'Nein, das Haus ist alt.' },
            fr: { correct: "Oui ! La maison est neuve.", wrong: "Non, la maison est vieille." },
            nl: { correct: 'Ja! Het huis is nieuw.', wrong: 'Nee, het huis is oud.' },
            az: { correct: 'Bəli! Ev yenidir.', wrong: 'Xeyr, ev köhnədir.' }
        },
        options: [
            { id: 888, word: "ev", imageUrl: "/images/888.png", isCorrect: false, audioKey: "ev", spokenText: "eski ev" },
            { id: 889, word: "ev", imageUrl: "/images/889.png", isCorrect: true, audioKey: "ev", spokenText: "yeni ev" }
        ]
    },

    // 11. Televizyon
    { 
        id: 21, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Televizyon eskidir.', wrong: 'Hayır, televizyon yenidir.' },
            en: { correct: 'Yes! The TV is old.', wrong: 'No, the TV is new.' },
            de: { correct: 'Ja! Der Fernseher ist alt.', wrong: 'Nein, der Fernseher ist neu.' },
            fr: { correct: "Oui ! La télévision est vieille.", wrong: "Non, la télévision est neuve." },
            nl: { correct: 'Ja! De televisie is oud.', wrong: 'Nee, de televisie is nieuw.' },
            az: { correct: 'Bəli! Televizor köhnədir.', wrong: 'Xeyr, televizor yenidir.' }
        },
        options: [
            { id: 893, word: "televizyon", imageUrl: "/images/893.png", isCorrect: true, audioKey: "kirik_televizyon", spokenText: "eski televizyon" },
            { id: 892, word: "televizyon", imageUrl: "/images/892.png", isCorrect: false, audioKey: "televizyon", spokenText: "yeni televizyon" }
        ]
    },
    { 
        id: 22, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Televizyon yenidir.', wrong: 'Hayır, televizyon eskidir.' },
            en: { correct: 'Yes! The TV is new.', wrong: 'No, the TV is old.' },
            de: { correct: 'Ja! Der Fernseher ist neu.', wrong: 'Nein, der Fernseher ist alt.' },
            fr: { correct: "Oui ! La télévision est neuve.", wrong: "Non, la télévision est vieille." },
            nl: { correct: 'Ja! De televisie is nieuw.', wrong: 'Nee, de televisie is oud.' },
            az: { correct: 'Bəli! Televizor yenidir.', wrong: 'Xeyr, televizor köhnədir.' }
        },
        options: [
            { id: 893, word: "televizyon", imageUrl: "/images/893.png", isCorrect: false, audioKey: "kirik_televizyon", spokenText: "eski televizyon" },
            { id: 892, word: "televizyon", imageUrl: "/images/892.png", isCorrect: true, audioKey: "televizyon", spokenText: "yeni televizyon" }
        ]
    },

    // 12. Zarf vs Email
    { 
        id: 23, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Zarf eskidir.', wrong: 'Hayır, e-posta yenidir.' },
            en: { correct: 'Yes! The envelope is old.', wrong: 'No, the email is new.' },
            de: { correct: 'Ja! Der Umschlag ist alt.', wrong: 'Nein, die E-Mail ist neu.' },
            fr: { correct: "Oui ! L'enveloppe est vieille.", wrong: "Non, l'email est neuf." },
            nl: { correct: 'Ja! De envelop is oud.', wrong: 'Nee, de e-mail is nieuw.' },
            az: { correct: 'Bəli! Zərf köhnədir.', wrong: 'Xeyr, e-poçt yenidir.' }
        },
        options: [
            { id: 572, word: "zarf", imageUrl: "/images/572.png", isCorrect: true, audioKey: "zarf", spokenText: "eski zarf" },
            { id: 573, word: "email", imageUrl: "/images/573.png", isCorrect: false, audioKey: "email", spokenText: "yeni email" }
        ]
    },
    { 
        id: 24, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! E-posta yenidir.', wrong: 'Hayır, zarf eskidir.' },
            en: { correct: 'Yes! The email is new.', wrong: 'No, the envelope is old.' },
            de: { correct: 'Ja! Die E-Mail ist neu.', wrong: 'Nein, der Umschlag ist alt.' },
            fr: { correct: "Oui ! L'email est neuf.", wrong: "Non, l'enveloppe est vieille." },
            nl: { correct: 'Ja! De e-mail is nieuw.', wrong: 'Nee, de envelop is oud.' },
            az: { correct: 'Bəli! E-poçt yenidir.', wrong: 'Xeyr, zərf köhnədir.' }
        },
        options: [
            { id: 572, word: "zarf", imageUrl: "/images/572.png", isCorrect: false, audioKey: "zarf", spokenText: "eski zarf" },
            { id: 573, word: "email", imageUrl: "/images/573.png", isCorrect: true, audioKey: "email", spokenText: "yeni email" }
        ]
    },

    // 13. Telefon (Kırık vs Yeni)
    { 
        id: 25, 
        question: "Eski olan hangisi?", 
        questionAudioKey: "q_which_is_old", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Telefon eskidir.', wrong: 'Hayır, telefon yenidir.' },
            en: { correct: 'Yes! The phone is old.', wrong: 'No, the phone is new.' },
            de: { correct: 'Ja! Das Telefon ist alt.', wrong: 'Nein, das Telefon ist neu.' },
            fr: { correct: "Oui ! Le téléphone est vieux.", wrong: "Non, le téléphone est neuf." },
            nl: { correct: 'Ja! De telefoon is oud.', wrong: 'Nee, de telefoon is nieuw.' },
            az: { correct: 'Bəli! Telefon köhnədir.', wrong: 'Xeyr, telefon yenidir.' }
        },
        options: [
            { id: 465, word: "akıllı telefon", imageUrl: "/images/465.png", isCorrect: true, audioKey: "kirik_telefon", spokenText: "eski telefon" },
            { id: 464, word: "akıllı telefon", imageUrl: "/images/464.png", isCorrect: false, audioKey: "akilli_telefon", spokenText: "yeni telefon" }
        ]
    },
    { 
        id: 26, 
        question: "Yeni olan hangisi?", 
        questionAudioKey: "q_which_is_new", 
        activityType: ActivityType.OldNew, 
        speech: {
            tr: { correct: 'Evet! Telefon yenidir.', wrong: 'Hayır, telefon eskidir.' },
            en: { correct: 'Yes! The phone is new.', wrong: 'No, the phone is old.' },
            de: { correct: 'Ja! Das Telefon ist neu.', wrong: 'Nein, das Telefon ist alt.' },
            fr: { correct: "Oui ! Le téléphone est neuf.", wrong: "Non, le téléphone est vieux." },
            nl: { correct: 'Ja! De telefoon is nieuw.', wrong: 'Nee, de telefoon is oud.' },
            az: { correct: 'Bəli! Telefon yenidir.', wrong: 'Xeyr, telefon köhnədir.' }
        },
        options: [
            { id: 465, word: "akıllı telefon", imageUrl: "/images/465.png", isCorrect: false, audioKey: "kirik_telefon", spokenText: "eski telefon" },
            { id: 464, word: "akıllı telefon", imageUrl: "/images/464.png", isCorrect: true, audioKey: "akilli_telefon", spokenText: "yeni telefon" }
        ]
    },
];