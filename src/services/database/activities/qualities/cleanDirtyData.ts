import { ConceptRound, ActivityType } from '../../../../types';

export const cleanDirtyData: ConceptRound[] = [
    // 1. El
    { 
        id: 77, 
        question: "Temiz olan hangisi?", 
        questionAudioKey: "q_which_is_clean_person", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! El temizdir.', wrong: 'Hayır, el kirlidir.' },
            en: { correct: 'Yes! The hand is clean.', wrong: 'No, the hand is dirty.' },
            de: { correct: 'Ja! Die Hand ist sauber.', wrong: 'Nein, die Hand ist schmutzig.' },
            fr: { correct: "Oui ! La main est propre.", wrong: "Non, la main est sale." },
            nl: { correct: 'Ja! De hand is schoon.', wrong: 'Nee, de hand is vuil.' },
            az: { correct: 'Bəli! Əl təmizdir.', wrong: 'Xeyr, əl çirklidir.' }
        },
        options: [
            { id: 590, word: "el", imageUrl: "/images/590.png", isCorrect: true, audioKey: "temiz_el", spokenText: "el" },
            { id: 591, word: "el", imageUrl: "/images/591.png", isCorrect: false, audioKey: "kirli_el", spokenText: "el" }
        ]
    },
    { 
        id: 78, 
        question: "Kirli olan hangisi?", 
        questionAudioKey: "q_which_is_dirty", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! El kirlidir.', wrong: 'Hayır, el temizdir.' },
            en: { correct: 'Yes! The hand is dirty.', wrong: 'No, the hand is clean.' },
            de: { correct: 'Ja! Die Hand ist schmutzig.', wrong: 'Nein, die Hand ist sauber.' },
            fr: { correct: "Oui ! La main est sale.", wrong: "Non, la main est propre." },
            nl: { correct: 'Ja! De hand is vuil.', wrong: 'Nee, de hand is schoon.' },
            az: { correct: 'Bəli! Əl çirklidir.', wrong: 'Xeyr, əl təmizdir.' }
        },
        options: [
            { id: 590, word: "el", imageUrl: "/images/590.png", isCorrect: false, audioKey: "temiz_el", spokenText: "el" },
            { id: 591, word: "el", imageUrl: "/images/591.png", isCorrect: true, audioKey: "kirli_el", spokenText: "el" }
        ]
    },

    // 2. Tabak
    { 
        id: 79, 
        question: "Temiz olan hangisi?", 
        questionAudioKey: "q_which_is_clean", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Tabak temizdir.', wrong: 'Hayır, tabak kirlidir.' },
            en: { correct: 'Yes! The plate is clean.', wrong: 'No, the plate is dirty.' },
            de: { correct: 'Ja! Der Teller ist sauber.', wrong: 'Nein, der Teller ist schmutzig.' },
            fr: { correct: "Oui ! L'assiette est propre.", wrong: "Non, l'assiette est sale." },
            nl: { correct: 'Ja! Het bord is schoon.', wrong: 'Nee, het bord is vuil.' },
            az: { correct: 'Bəli! Boşqab təmizdir.', wrong: 'Xeyr, boşqab çirklidir.' }
        },
        options: [
            { id: 153, word: "tabak", imageUrl: "/images/153.png", isCorrect: true, audioKey: "temiz_tabak", spokenText: "tabak" },
            { id: 589, word: "tabak", imageUrl: "/images/589.png", isCorrect: false, audioKey: "kirli_tabak", spokenText: "tabak" }
        ]
    },
    { 
        id: 80, 
        question: "Kirli olan hangisi?", 
        questionAudioKey: "q_which_is_dirty", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Tabak kirlidir.', wrong: 'Hayır, tabak temizdir.' },
            en: { correct: 'Yes! The plate is dirty.', wrong: 'No, the plate is clean.' },
            de: { correct: 'Ja! Der Teller ist schmutzig.', wrong: 'Nein, der Teller ist sauber.' },
            fr: { correct: "Oui ! L'assiette est sale.", wrong: "Non, l'assiette est propre." },
            nl: { correct: 'Ja! Het bord is vuil.', wrong: 'Nee, het bord is schoon.' },
            az: { correct: 'Bəli! Boşqab çirklidir.', wrong: 'Xeyr, boşqab təmizdir.' }
        },
        options: [
            { id: 153, word: "tabak", imageUrl: "/images/153.png", isCorrect: false, audioKey: "temiz_tabak", spokenText: "tabak" },
            { id: 589, word: "tabak", imageUrl: "/images/589.png", isCorrect: true, audioKey: "kirli_tabak", spokenText: "tabak" }
        ]
    },

    // 3. Pencere
    { 
        id: 81, 
        question: "Temiz olan hangisi?", 
        questionAudioKey: "q_which_is_clean", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Pencere temizdir.', wrong: 'Hayır, pencere kirlidir.' },
            en: { correct: 'Yes! The window is clean.', wrong: 'No, the window is dirty.' },
            de: { correct: 'Ja! Das Fenster ist sauber.', wrong: 'Nein, das Fenster ist schmutzig.' },
            fr: { correct: "Oui ! La fenêtre est propre.", wrong: "Non, la fenêtre est sale." },
            nl: { correct: 'Ja! Het raam is schoon.', wrong: 'Nee, het raam is vuil.' },
            az: { correct: 'Bəli! Pəncərə təmizdir.', wrong: 'Xeyr, pəncərə çirklidir.' }
        },
        options: [
            { id: 82, word: "pencere", imageUrl: "/images/82.png", isCorrect: true, audioKey: "temiz_pencere", spokenText: "pencere" },
            { id: 593, word: "pencere", imageUrl: "/images/593.png", isCorrect: false, audioKey: "kirli_pencere", spokenText: "pencere" }
        ]
    },
    { 
        id: 82, 
        question: "Kirli olan hangisi?", 
        questionAudioKey: "q_which_is_dirty", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Pencere kirlidir.', wrong: 'Hayır, pencere temizdir.' },
            en: { correct: 'Yes! The window is dirty.', wrong: 'No, the window is clean.' },
            de: { correct: 'Ja! Das Fenster ist schmutzig.', wrong: 'Nein, das Fenster ist sauber.' },
            fr: { correct: "Oui ! La fenêtre est sale.", wrong: "Non, la fenêtre est propre." },
            nl: { correct: 'Ja! Het raam is vuil.', wrong: 'Nee, het raam is schoon.' },
            az: { correct: 'Bəli! Pəncərə çirklidir.', wrong: 'Xeyr, pəncərə təmizdir.' }
        },
        options: [
            { id: 82, word: "pencere", imageUrl: "/images/82.png", isCorrect: false, audioKey: "temiz_pencere", spokenText: "pencere" },
            { id: 593, word: "pencere", imageUrl: "/images/593.png", isCorrect: true, audioKey: "kirli_pencere", spokenText: "pencere" }
        ]
    },

    // 4. Tişört
    { 
        id: 83, 
        question: "Temiz olan hangisi?", 
        questionAudioKey: "q_which_is_clean", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Tişört temizdir.', wrong: 'Hayır, tişört kirlidir.' },
            en: { correct: 'Yes! The t-shirt is clean.', wrong: 'No, the t-shirt is dirty.' },
            de: { correct: 'Ja! Das T-Shirt ist sauber.', wrong: 'Nein, das T-Shirt ist schmutzig.' },
            fr: { correct: "Oui ! Le t-shirt est propre.", wrong: "Non, le t-shirt est sale." },
            nl: { correct: 'Ja! Het t-shirt is schoon.', wrong: 'Nee, het t-shirt is vuil.' },
            az: { correct: 'Bəli! Tişört təmizdir.', wrong: 'Xeyr, tişört çirklidir.' }
        },
        options: [
            { id: 13, word: "tişört", imageUrl: "/images/13.png", isCorrect: true, audioKey: "temiz_tisort", spokenText: "tişört" },
            { id: 14, word: "tişört", imageUrl: "/images/14.gif", isCorrect: false, audioKey: "kirli_tisort", spokenText: "tişört" }
        ]
    },
    { 
        id: 84, 
        question: "Kirli olan hangisi?", 
        questionAudioKey: "q_which_is_dirty", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Tişört kirlidir.', wrong: 'Hayır, tişört temizdir.' },
            en: { correct: 'Yes! The t-shirt is dirty.', wrong: 'No, the t-shirt is clean.' },
            de: { correct: 'Ja! Das T-Shirt ist schmutzig.', wrong: 'Nein, das T-Shirt ist sauber.' },
            fr: { correct: "Oui ! Le t-shirt est sale.", wrong: "Non, le t-shirt est propre." },
            nl: { correct: 'Ja! Het t-shirt is vuil.', wrong: 'Nee, het t-shirt is schoon.' },
            az: { correct: 'Bəli! Tişört çirklidir.', wrong: 'Xeyr, tişört təmizdir.' }
        },
        options: [
            { id: 13, word: "tişört", imageUrl: "/images/13.png", isCorrect: false, audioKey: "temiz_tisort", spokenText: "tişört" },
            { id: 14, word: "tişört", imageUrl: "/images/14.gif", isCorrect: true, audioKey: "kirli_tisort", spokenText: "tişört" }
        ]
    },

    // 5. Ayakkabı
    { 
        id: 85, 
        question: "Temiz olan hangisi?", 
        questionAudioKey: "q_which_is_clean", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Ayakkabı temizdir.', wrong: 'Hayır, ayakkabı kirlidir.' },
            en: { correct: 'Yes! The shoe is clean.', wrong: 'No, the shoe is dirty.' },
            de: { correct: 'Ja! Der Schuh ist sauber.', wrong: 'Nein, der Schuh ist schmutzig.' },
            fr: { correct: "Oui ! La chaussure est propre.", wrong: "Non, la chaussure est sale." },
            nl: { correct: 'Ja! De schoen is schoon.', wrong: 'Nee, de schoen is vuil.' },
            az: { correct: 'Bəli! Ayaqqabı təmizdir.', wrong: 'Xeyr, ayaqqabı çirklidir.' }
        },
        options: [
            { id: 59, word: "ayakkabı", imageUrl: "/images/59.png", isCorrect: true, audioKey: "temiz_ayakkabi", spokenText: "ayakkabı" },
            { id: 60, word: "ayakkabı", imageUrl: "/images/60.png", isCorrect: false, audioKey: "kirli_ayakkabi", spokenText: "ayakkabı" }
        ]
    },
    { 
        id: 86, 
        question: "Kirli olan hangisi?", 
        questionAudioKey: "q_which_is_dirty", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Ayakkabı kirlidir.', wrong: 'Hayır, ayakkabı temizdir.' },
            en: { correct: 'Yes! The shoe is dirty.', wrong: 'No, the shoe is clean.' },
            de: { correct: 'Ja! Der Schuh ist schmutzig.', wrong: 'Nein, der Schuh ist sauber.' },
            fr: { correct: "Oui ! La chaussure est sale.", wrong: "Non, la chaussure est propre." },
            nl: { correct: 'Ja! De schoen is vuil.', wrong: 'Nee, de schoen is schoon.' },
            az: { correct: 'Bəli! Ayaqqabı çirklidir.', wrong: 'Xeyr, ayaqqabı təmizdir.' }
        },
        options: [
            { id: 59, word: "ayakkabı", imageUrl: "/images/59.png", isCorrect: false, audioKey: "temiz_ayakkabi", spokenText: "ayakkabı" },
            { id: 60, word: "ayakkabı", imageUrl: "/images/60.png", isCorrect: true, audioKey: "kirli_ayakkabi", spokenText: "ayakkabı" }
        ]
    },

    // 6. Halı
    { 
        id: 87, 
        question: "Temiz olan hangisi?", 
        questionAudioKey: "q_which_is_clean", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Halı temizdir.', wrong: 'Hayır, halı kirlidir.' },
            en: { correct: 'Yes! The carpet is clean.', wrong: 'No, the carpet is dirty.' },
            de: { correct: 'Ja! Der Teppich ist sauber.', wrong: 'Nein, der Teppich ist schmutzig.' },
            fr: { correct: "Oui ! Le tapis est propre.", wrong: "Non, le tapis est sale." },
            nl: { correct: 'Ja! Het tapijt is schoon.', wrong: 'Nee, het tapijt is vuil.' },
            az: { correct: 'Bəli! Xalça təmizdir.', wrong: 'Xeyr, xalça çirklidir.' }
        },
        options: [
            { id: 439, word: "halı", imageUrl: "/images/439.png", isCorrect: true, audioKey: "temiz_hali", spokenText: "halı" },
            { id: 438, word: "halı", imageUrl: "/images/438.png", isCorrect: false, audioKey: "kirli_hali", spokenText: "halı" }
        ]
    },
    { 
        id: 88, 
        question: "Kirli olan hangisi?", 
        questionAudioKey: "q_which_is_dirty", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Halı kirlidir.', wrong: 'Hayır, halı temizdir.' },
            en: { correct: 'Yes! The carpet is dirty.', wrong: 'No, the carpet is clean.' },
            de: { correct: 'Ja! Der Teppich ist schmutzig.', wrong: 'Nein, der Teppich ist sauber.' },
            fr: { correct: "Oui ! Le tapis est sale.", wrong: "Non, le tapis est propre." },
            nl: { correct: 'Ja! Het tapijt is vuil.', wrong: 'Nee, het tapijt is schoon.' },
            az: { correct: 'Bəli! Xalça çirklidir.', wrong: 'Xeyr, xalça təmizdir.' }
        },
        options: [
            { id: 439, word: "halı", imageUrl: "/images/439.png", isCorrect: false, audioKey: "temiz_hali", spokenText: "halı" },
            { id: 438, word: "halı", imageUrl: "/images/438.png", isCorrect: true, audioKey: "kirli_hali", spokenText: "halı" }
        ]
    },

    // 7. Araba
    { 
        id: 89, 
        question: "Temiz olan hangisi?", 
        questionAudioKey: "q_which_is_clean", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Araba temizdir.', wrong: 'Hayır, araba kirlidir.' },
            en: { correct: 'Yes! The car is clean.', wrong: 'No, the car is dirty.' },
            de: { correct: 'Ja! Das Auto ist sauber.', wrong: 'Nein, das Auto ist schmutzig.' },
            fr: { correct: "Oui ! La voiture est propre.", wrong: "Non, la voiture est sale." },
            nl: { correct: 'Ja! De auto is schoon.', wrong: 'Nee, de auto is vuil.' },
            az: { correct: 'Bəli! Maşın təmizdir.', wrong: 'Xeyr, maşın çirklidir.' }
        },
        options: [
            { id: 1, word: "araba", imageUrl: "/images/1.png", isCorrect: true, audioKey: "temiz_araba", spokenText: "araba" },
            { id: 3, word: "araba", imageUrl: "/images/3.png", isCorrect: false, audioKey: "kirli_araba", spokenText: "araba" }
        ]
    },
    { 
        id: 90, 
        question: "Kirli olan hangisi?", 
        questionAudioKey: "q_which_is_dirty", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Araba kirlidir.', wrong: 'Hayır, araba temizdir.' },
            en: { correct: 'Yes! The car is dirty.', wrong: 'No, the car is clean.' },
            de: { correct: 'Ja! Das Auto ist schmutzig.', wrong: 'Nein, das Auto ist sauber.' },
            fr: { correct: "Oui ! La voiture est sale.", wrong: "Non, la voiture est propre." },
            nl: { correct: 'Ja! De auto is vuil.', wrong: 'Nee, de auto is schoon.' },
            az: { correct: 'Bəli! Maşın çirklidir.', wrong: 'Xeyr, maşın təmizdir.' }
        },
        options: [
            { id: 1, word: "araba", imageUrl: "/images/1.png", isCorrect: false, audioKey: "temiz_araba", spokenText: "araba" },
            { id: 3, word: "araba", imageUrl: "/images/3.png", isCorrect: true, audioKey: "kirli_araba", spokenText: "araba" }
        ]
    },

    // 8. Gömlek ciftini gecici olarak kaldirdik.
    // Mevcut "kirli gomlek" gorseli kirli degil, daha cok kirisik/dogru-duruyor.

    // 9. Çorap
    { 
        id: 93, 
        question: "Temiz olan hangisi?", 
        questionAudioKey: "q_which_is_clean", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Çorap temizdir.', wrong: 'Hayır, çorap kirlidir.' },
            en: { correct: 'Yes! The socks are clean.', wrong: 'No, the socks are dirty.' },
            de: { correct: 'Ja! Die Socken sind sauber.', wrong: 'Nein, die Socken sind schmutzig.' },
            fr: { correct: "Oui ! Les chaussettes sont propres.", wrong: "Non, les chaussettes sont sales." },
            nl: { correct: 'Ja! De sokken zijn schoon.', wrong: 'Nee, de sokken zijn vuil.' },
            az: { correct: 'Bəli! Corablar təmizdir.', wrong: 'Xeyr, corablar çirklidir.' }
        },
        options: [
            { id: 147, word: "çoraplar", imageUrl: "/images/147.png", isCorrect: true, audioKey: "coraplar", spokenText: "çoraplar" },
            { id: 58, word: "çorap", imageUrl: "/images/58.png", isCorrect: false, audioKey: "corap", spokenText: "çorap" }
        ]
    },
    { 
        id: 94, 
        question: "Kirli olan hangisi?", 
        questionAudioKey: "q_which_is_dirty", 
        activityType: ActivityType.CleanDirty, 
        speech: {
            tr: { correct: 'Evet! Çorap kirlidir.', wrong: 'Hayır, çorap temizdir.' },
            en: { correct: 'Yes! The socks are dirty.', wrong: 'No, the socks are clean.' },
            de: { correct: 'Ja! Die Socken sind schmutzig.', wrong: 'Nein, die Socken sind sauber.' },
            fr: { correct: "Oui ! Les chaussettes sont sales.", wrong: "Non, les chaussettes sont propres." },
            nl: { correct: 'Ja! De sokken zijn vuil.', wrong: 'Nee, de sokken zijn schoon.' },
            az: { correct: 'Bəli! Corablar çirklidir.', wrong: 'Xeyr, corablar təmizdir.' }
        },
        options: [
            { id: 147, word: "çoraplar", imageUrl: "/images/147.png", isCorrect: false, audioKey: "coraplar", spokenText: "çoraplar" },
            { id: 58, word: "çorap", imageUrl: "/images/58.png", isCorrect: true, audioKey: "corap", spokenText: "çorap" }
        ]
    },
];