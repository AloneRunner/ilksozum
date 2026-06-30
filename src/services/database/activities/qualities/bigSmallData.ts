import { ConceptRound, ActivityType } from '../../../../types';

export const bigSmallData: ConceptRound[] = [
    // 1. Fil vs Fare
    { 
        id: 1, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big_person", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Fil büyüktür.', wrong: 'Hayır, fare küçüktür.' },
            en: { correct: 'Yes! The elephant is big.', wrong: 'No, the mouse is small.' },
            de: { correct: 'Ja! Der Elefant ist groß.', wrong: 'Nein, die Maus ist klein.' },
            fr: { correct: "Oui ! L'éléphant est grand.", wrong: "Non, la souris est petite." },
            nl: { correct: 'Ja! De olifant is groot.', wrong: 'Nee, de muis is klein.' },
            az: { correct: 'Bəli! Fil böyükdür.', wrong: 'Xeyr, siçan kiçikdir.' }
        },
        options: [
            { id: 28, word: "fil", imageUrl: "/images/28.png", isCorrect: true, audioKey: "fil", spokenText: "fil" },
            { id: 29, word: "fare", imageUrl: "/images/29.png", isCorrect: false, audioKey: "fare", spokenText: "fare" }
        ]
    },
    { 
        id: 2, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Fare küçüktür.', wrong: 'Hayır, fil büyüktür.' },
            en: { correct: 'Yes! The mouse is small.', wrong: 'No, the elephant is big.' },
            de: { correct: 'Ja! Die Maus ist klein.', wrong: 'Nein, der Elefant ist groß.' },
            fr: { correct: "Oui ! La souris est petite.", wrong: "Non, l'éléphant est grand." },
            nl: { correct: 'Ja! De muis is klein.', wrong: 'Nee, de olifant is groot.' },
            az: { correct: 'Bəli! Siçan kiçikdir.', wrong: 'Xeyr, fil böyükdür.' }
        },
        options: [
            { id: 28, word: "fil", imageUrl: "/images/28.png", isCorrect: false, audioKey: "fil", spokenText: "fil" },
            { id: 29, word: "fare", imageUrl: "/images/29.png", isCorrect: true, audioKey: "fare", spokenText: "fare" }
        ]
    },

    // 2. Balina vs Karınca
    { 
        id: 3, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Balina büyüktür.', wrong: 'Hayır, karınca küçüktür.' },
            en: { correct: 'Yes! The whale is big.', wrong: 'No, the ant is small.' },
            de: { correct: 'Ja! Der Wal ist groß.', wrong: 'Nein, die Ameise ist klein.' },
            fr: { correct: "Oui ! La baleine est grande.", wrong: "Non, la fourmi est petite." },
            nl: { correct: 'Ja! De walvis is groot.', wrong: 'Nee, de mier is klein.' },
            az: { correct: 'Bəli! Balina böyükdür.', wrong: 'Xeyr, qarışqa kiçikdir.' }
        },
        options: [
            { id: 491, word: "balina", imageUrl: "/images/491.png", isCorrect: true, audioKey: "balina", spokenText: "balina" },
            { id: 349, word: "karınca", imageUrl: "/images/349.png", isCorrect: false, audioKey: "karinca", spokenText: "karınca" }
        ]
    },
    { 
        id: 4, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Karınca küçüktür.', wrong: 'Hayır, balina büyüktür.' },
            en: { correct: 'Yes! The ant is small.', wrong: 'No, the whale is big.' },
            de: { correct: 'Ja! Die Ameise ist klein.', wrong: 'Nein, der Wal ist groß.' },
            fr: { correct: "Oui ! La fourmi est petite.", wrong: "Non, la baleine est grande." },
            nl: { correct: 'Ja! De mier is klein.', wrong: 'Nee, de walvis is groot.' },
            az: { correct: 'Bəli! Qarışqa kiçikdir.', wrong: 'Xeyr, balina böyükdür.' }
        },
        options: [
            { id: 491, word: "balina", imageUrl: "/images/491.png", isCorrect: false, audioKey: "balina", spokenText: "balina" },
            { id: 349, word: "karınca", imageUrl: "/images/349.png", isCorrect: true, audioKey: "karinca", spokenText: "karınca" }
        ]
    },

    // 3. Okul Otobüsü vs Bisiklet
    { 
        id: 5, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Okul otobüsü büyüktür.', wrong: 'Hayır, bisiklet küçüktür.' },
            en: { correct: 'Yes! The school bus is big.', wrong: 'No, the bicycle is small.' },
            de: { correct: 'Ja! Der Schulbus ist groß.', wrong: 'Nein, das Fahrrad ist klein.' },
            fr: { correct: "Oui ! Le bus scolaire est grand.", wrong: "Non, le vélo est petit." },
            nl: { correct: 'Ja! De schoolbus is groot.', wrong: 'Nee, de fiets is klein.' },
            az: { correct: 'Bəli! Məktəb avtobusu böyükdür.', wrong: 'Xeyr, velosiped kiçikdir.' }
        },
        options: [
            { id: 105, word: "okul otobüsü", imageUrl: "/images/105.png", isCorrect: true, audioKey: "okul_otobusu", spokenText: "okul otobüsü" },
            { id: 110, word: "bisiklet", imageUrl: "/images/110.png", isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    { 
        id: 6, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Bisiklet küçüktür.', wrong: 'Hayır, okul otobüsü büyüktür.' },
            en: { correct: 'Yes! The bicycle is small.', wrong: 'No, the school bus is big.' },
            de: { correct: 'Ja! Das Fahrrad ist klein.', wrong: 'Nein, der Schulbus ist groß.' },
            fr: { correct: "Oui ! Le vélo est petit.", wrong: "Non, le bus scolaire est grand." },
            nl: { correct: 'Ja! De fiets is klein.', wrong: 'Nee, de schoolbus is groot.' },
            az: { correct: 'Bəli! Velosiped kiçikdir.', wrong: 'Xeyr, məktəb avtobusu böyükdür.' }
        },
        options: [
            { id: 105, word: "okul otobüsü", imageUrl: "/images/105.png", isCorrect: false, audioKey: "okul_otobusu", spokenText: "okul otobüsü" },
            { id: 110, word: "bisiklet", imageUrl: "/images/110.png", isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },

    // 4. Gemi vs Sandal
    { 
        id: 7, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Gemi büyüktür.', wrong: 'Hayır, sandal küçüktür.' },
            en: { correct: 'Yes! The ship is big.', wrong: 'No, the rowboat is small.' },
            de: { correct: 'Ja! Das Schiff ist groß.', wrong: 'Nein, das Ruderboot ist klein.' },
            fr: { correct: "Oui ! Le navire est grand.", wrong: "Non, la barque est petite." },
            nl: { correct: 'Ja! Het schip is groot.', wrong: 'Nee, de roeiboot is klein.' },
            az: { correct: 'Bəli! Gəmi böyükdür.', wrong: 'Xeyr, qayıq kiçikdir.' }
        },
        options: [
            { id: 492, word: "gemi", imageUrl: "/images/492.png", isCorrect: true, audioKey: "gemi", spokenText: "gemi" },
            { id: 493, word: "sandal", imageUrl: "/images/493.png", isCorrect: false, audioKey: "sandal", spokenText: "sandal" }
        ]
    },
    { 
        id: 8, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Sandal küçüktür.', wrong: 'Hayır, gemi büyüktür.' },
            en: { correct: 'Yes! The rowboat is small.', wrong: 'No, the ship is big.' },
            de: { correct: 'Ja! Das Ruderboot ist klein.', wrong: 'Nein, das Schiff ist groß.' },
            fr: { correct: "Oui ! La barque est petite.", wrong: "Non, le navire est grand." },
            nl: { correct: 'Ja! De roeiboot is klein.', wrong: 'Nee, het schip is groot.' },
            az: { correct: 'Bəli! Qayıq kiçikdir.', wrong: 'Xeyr, gəmi böyükdür.' }
        },
        options: [
            { id: 492, word: "gemi", imageUrl: "/images/492.png", isCorrect: false, audioKey: "gemi", spokenText: "gemi" },
            { id: 493, word: "sandal", imageUrl: "/images/493.png", isCorrect: true, audioKey: "sandal", spokenText: "sandal" }
        ]
    },

    // 5. Ev vs Kuş Evi
    { 
        id: 9, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Ev büyüktür.', wrong: 'Hayır, kuş evi küçüktür.' },
            en: { correct: 'Yes! The house is big.', wrong: 'No, the birdhouse is small.' },
            de: { correct: 'Ja! Das Haus ist groß.', wrong: 'Nein, das Vogelhaus ist klein.' },
            fr: { correct: "Oui ! La maison est grande.", wrong: "Non, le nichoir est petit." },
            nl: { correct: 'Ja! Het huis is groot.', wrong: 'Nee, het vogelhuisje is klein.' },
            az: { correct: 'Bəli! Ev böyükdür.', wrong: 'Xeyr, quş yuvası kiçikdir.' }
        },
        options: [
            { id: 571, word: "ev", imageUrl: "/images/571.png", isCorrect: true, audioKey: "ev", spokenText: "ev" },
            { id: 534, word: "kuş evi", imageUrl: "/images/534.png", isCorrect: false, audioKey: "kus_evi", spokenText: "kuş evi" }
        ]
    },
    { 
        id: 10, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Kuş evi küçüktür.', wrong: 'Hayır, ev büyüktür.' },
            en: { correct: 'Yes! The birdhouse is small.', wrong: 'No, the house is big.' },
            de: { correct: 'Ja! Das Vogelhaus ist klein.', wrong: 'Nein, das Haus ist groß.' },
            fr: { correct: "Oui ! Le nichoir est petit.", wrong: "Non, la maison est grande." },
            nl: { correct: 'Ja! Het vogelhuisje is klein.', wrong: 'Nee, het huis is groot.' },
            az: { correct: 'Bəli! Quş yuvası kiçikdir.', wrong: 'Xeyr, ev böyükdür.' }
        },
        options: [
            { id: 571, word: "ev", imageUrl: "/images/571.png", isCorrect: false, audioKey: "ev", spokenText: "ev" },
            { id: 534, word: "kuş evi", imageUrl: "/images/534.png", isCorrect: true, audioKey: "kus_evi", spokenText: "kuş evi" }
        ]
    },

    // 6. Araba (Büyük) vs Araba (Küçük)
    { 
        id: 11, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Bu araba büyüktür.', wrong: 'Hayır, bu araba küçüktür.' },
            en: { correct: 'Yes! This car is big.', wrong: 'No, this car is small.' },
            de: { correct: 'Ja! Dieses Auto ist groß.', wrong: 'Nein, dieses Auto ist klein.' },
            fr: { correct: "Oui ! Cette voiture est grande.", wrong: "Non, cette voiture est petite." },
            nl: { correct: 'Ja! Deze auto is groot.', wrong: 'Nee, deze auto is klein.' },
            az: { correct: 'Bəli! Bu maşın böyükdür.', wrong: 'Xeyr, bu maşın kiçikdir.' }
        },
        options: [
            { id: 1, word: "araba", imageUrl: "/images/1.png", isCorrect: true, audioKey: "araba", spokenText: "araba" },
            { id: 2, word: "araba", imageUrl: "/images/2.png", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    { 
        id: 12, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Bu araba küçüktür.', wrong: 'Hayır, bu araba büyüktür.' },
            en: { correct: 'Yes! This car is small.', wrong: 'No, this car is big.' },
            de: { correct: 'Ja! Dieses Auto ist klein.', wrong: 'Nein, dieses Auto ist groß.' },
            fr: { correct: "Oui ! Cette voiture est petite.", wrong: "Non, cette voiture est grande." },
            nl: { correct: 'Ja! Deze auto is klein.', wrong: 'Nee, deze auto is groot.' },
            az: { correct: 'Bəli! Bu maşın kiçikdir.', wrong: 'Xeyr, bu maşın böyükdür.' }
        },
        options: [
            { id: 1, word: "araba", imageUrl: "/images/1.png", isCorrect: false, audioKey: "araba", spokenText: "araba" },
            { id: 2, word: "araba", imageUrl: "/images/2.png", isCorrect: true, audioKey: "araba", spokenText: "araba" }
        ]
    },

    // 7. Kamyon vs Araba
    { 
        id: 13, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Kamyon büyüktür.', wrong: 'Hayır, araba küçüktür.' },
            en: { correct: 'Yes! The truck is big.', wrong: 'No, the car is small.' },
            de: { correct: 'Ja! Der Lastwagen ist groß.', wrong: 'Nein, das Auto ist klein.' },
            fr: { correct: "Oui ! Le camion est grand.", wrong: "Non, la voiture est petite." },
            nl: { correct: 'Ja! De vrachtwagen is groot.', wrong: 'Nee, de auto is klein.' },
            az: { correct: 'Bəli! Yük maşını böyükdür.', wrong: 'Xeyr, maşın kiçikdir.' }
        },
        options: [
            { id: 288, word: "kamyon", imageUrl: "/images/288.png", isCorrect: true, audioKey: "kamyon", spokenText: "kamyon" },
            { id: 4, word: "araba", imageUrl: "/images/4.png", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    { 
        id: 14, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Araba küçüktür.', wrong: 'Hayır, kamyon büyüktür.' },
            en: { correct: 'Yes! The car is small.', wrong: 'No, the truck is big.' },
            de: { correct: 'Ja! Das Auto ist klein.', wrong: 'Nein, der Lastwagen ist groß.' },
            fr: { correct: "Oui ! La voiture est petite.", wrong: "Non, le camion est grand." },
            nl: { correct: 'Ja! De auto is klein.', wrong: 'Nee, de vrachtwagen is groot.' },
            az: { correct: 'Bəli! Maşın kiçikdir.', wrong: 'Xeyr, yük maşını böyükdür.' }
        },
        options: [
            { id: 288, word: "kamyon", imageUrl: "/images/288.png", isCorrect: false, audioKey: "kamyon", spokenText: "kamyon" },
            { id: 4, word: "araba", imageUrl: "/images/4.png", isCorrect: true, audioKey: "araba", spokenText: "araba" }
        ]
    },

    // 8. Güneş vs Yıldız
    { 
        id: 15, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Güneş büyüktür.', wrong: 'Hayır, yıldız küçüktür.' },
            en: { correct: 'Yes! The sun is big.', wrong: 'No, the star is small.' },
            de: { correct: 'Ja! Die Sonne ist groß.', wrong: 'Nein, der Stern ist klein.' },
            fr: { correct: "Oui ! Le soleil est grand.", wrong: "Non, l'étoile est petite." },
            nl: { correct: 'Ja! De zon is groot.', wrong: 'Nee, de ster is klein.' },
            az: { correct: 'Bəli! Günəş böyükdür.', wrong: 'Xeyr, ulduz kiçikdir.' }
        },
        options: [
            { id: 237, word: "güneş", imageUrl: "/images/237.png", isCorrect: true, audioKey: "gunes", spokenText: "güneş" },
            { id: 239, word: "yıldız", imageUrl: "/images/239.png", isCorrect: false, audioKey: "yildiz", spokenText: "yıldız" }
        ]
    },
    { 
        id: 16, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Yıldız küçüktür.', wrong: 'Hayır, güneş büyüktür.' },
            en: { correct: 'Yes! The star is small.', wrong: 'No, the sun is big.' },
            de: { correct: 'Ja! Der Stern ist klein.', wrong: 'Nein, die Sonne ist groß.' },
            fr: { correct: "Oui ! L'étoile est petite.", wrong: "Non, le soleil est grand." },
            nl: { correct: 'Ja! De ster is klein.', wrong: 'Nee, de zon is groot.' },
            az: { correct: 'Bəli! Ulduz kiçikdir.', wrong: 'Xeyr, günəş böyükdür.' }
        },
        options: [
            { id: 237, word: "güneş", imageUrl: "/images/237.png", isCorrect: false, audioKey: "gunes", spokenText: "güneş" },
            { id: 239, word: "yıldız", imageUrl: "/images/239.png", isCorrect: true, audioKey: "yildiz", spokenText: "yıldız" }
        ]
    },

    // 9. Ağaç vs Papatya
    { 
        id: 17, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Ağaç büyüktür.', wrong: 'Hayır, papatya küçüktür.' },
            en: { correct: 'Yes! The tree is big.', wrong: 'No, the daisy is small.' },
            de: { correct: 'Ja! Der Baum ist groß.', wrong: 'Nein, das Gänseblümchen ist klein.' },
            fr: { correct: "Oui ! L'arbre est grand.", wrong: "Non, la marguerite est petite." },
            nl: { correct: 'Ja! De boom is groot.', wrong: 'Nee, het madeliefje is klein.' },
            az: { correct: 'Bəli! Ağac böyükdür.', wrong: 'Xeyr, çobanyastığı kiçikdir.' }
        },
        options: [
            { id: 10, word: "ağaç", imageUrl: "/images/10.png", isCorrect: true, audioKey: "agac", spokenText: "ağaç" },
            { id: 76, word: "papatya", imageUrl: "/images/76.png", imageScale: 0.84, isCorrect: false, audioKey: "papatya", spokenText: "papatya" }
        ]
    },
    { 
        id: 18, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Papatya küçüktür.', wrong: 'Hayır, ağaç büyüktür.' },
            en: { correct: 'Yes! The daisy is small.', wrong: 'No, the tree is big.' },
            de: { correct: 'Ja! Das Gänseblümchen ist klein.', wrong: 'Nein, der Baum ist groß.' },
            fr: { correct: "Oui ! La marguerite est petite.", wrong: "Non, l'arbre est grand." },
            nl: { correct: 'Ja! Het madeliefje is klein.', wrong: 'Nee, de boom is groot.' },
            az: { correct: 'Bəli! Çobanyastığı kiçikdir.', wrong: 'Xeyr, ağac böyükdür.' }
        },
        options: [
            { id: 10, word: "ağaç", imageUrl: "/images/10.png", isCorrect: false, audioKey: "agac", spokenText: "ağaç" },
            { id: 76, word: "papatya", imageUrl: "/images/76.png", imageScale: 0.84, isCorrect: true, audioKey: "papatya", spokenText: "papatya" }
        ]
    },

    // 10. Gökdelen vs Ev
    { 
        id: 19, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Gökdelen büyüktür.', wrong: 'Hayır, ev küçüktür.' },
            en: { correct: 'Yes! The skyscraper is big.', wrong: 'No, the house is small.' },
            de: { correct: 'Ja! Der Wolkenkratzer ist groß.', wrong: 'Nein, das Haus ist klein.' },
            fr: { correct: "Oui ! Le gratte-ciel est grand.", wrong: "Non, la maison est petite." },
            nl: { correct: 'Ja! De wolkenkrabber is groot.', wrong: 'Nee, het huis is klein.' },
            az: { correct: 'Bəli! Göydələn böyükdür.', wrong: 'Xeyr, ev kiçikdir.' }
        },
        options: [
            { id: 612, word: "gökdelen", imageUrl: "/images/612.png", isCorrect: true, audioKey: "gokdelen", spokenText: "gökdelen" },
            { id: 533, word: "ev", imageUrl: "/images/533.png", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    { 
        id: 20, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Ev küçüktür.', wrong: 'Hayır, gökdelen büyüktür.' },
            en: { correct: 'Yes! The house is small.', wrong: 'No, the skyscraper is big.' },
            de: { correct: 'Ja! Das Haus ist klein.', wrong: 'Nein, der Wolkenkratzer ist groß.' },
            fr: { correct: "Oui ! La maison est petite.", wrong: "Non, le gratte-ciel est grand." },
            nl: { correct: 'Ja! Het huis is klein.', wrong: 'Nee, de wolkenkrabber is groot.' },
            az: { correct: 'Bəli! Ev kiçikdir.', wrong: 'Xeyr, göydələn böyükdür.' }
        },
        options: [
            { id: 612, word: "gökdelen", imageUrl: "/images/612.png", isCorrect: false, audioKey: "gokdelen", spokenText: "gökdelen" },
            { id: 533, word: "ev", imageUrl: "/images/533.png", isCorrect: true, audioKey: "ev", spokenText: "ev" }
        ]
    },

    // 11. Balina vs Balık
    { 
        id: 21, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Balina büyüktür.', wrong: 'Hayır, balık küçüktür.' },
            en: { correct: 'Yes! The whale is big.', wrong: 'No, the fish is small.' },
            de: { correct: 'Ja! Der Wal ist groß.', wrong: 'Nein, der Fisch ist klein.' },
            fr: { correct: "Oui ! La baleine est grande.", wrong: "Non, le poisson est petit." },
            nl: { correct: 'Ja! De walvis is groot.', wrong: 'Nee, de vis is klein.' },
            az: { correct: 'Bəli! Balina böyükdür.', wrong: 'Xeyr, balıq kiçikdir.' }
        },
        options: [
            { id: 491, word: "balina", imageUrl: "/images/491.png", isCorrect: true, audioKey: "balina", spokenText: "balina" },
            { id: 740, word: "balık", imageUrl: "/images/740.png", isCorrect: false, audioKey: "balik", spokenText: "balık" }
        ]
    },
    { 
        id: 22, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Balık küçüktür.', wrong: 'Hayır, balina büyüktür.' },
            en: { correct: 'Yes! The fish is small.', wrong: 'No, the whale is big.' },
            de: { correct: 'Ja! Der Fisch ist klein.', wrong: 'Nein, der Wal ist groß.' },
            fr: { correct: "Oui ! Le poisson est petit.", wrong: "Non, la baleine est grande." },
            nl: { correct: 'Ja! De vis is klein.', wrong: 'Nee, de walvis is groot.' },
            az: { correct: 'Bəli! Balıq kiçikdir.', wrong: 'Xeyr, balina böyükdür.' }
        },
        options: [
            { id: 491, word: "balina", imageUrl: "/images/491.png", isCorrect: false, audioKey: "balina", spokenText: "balina" },
            { id: 740, word: "balık", imageUrl: "/images/740.png", isCorrect: true, audioKey: "balik", spokenText: "balık" }
        ]
    },

    // 12. Pilates Topu vs Misket
    { 
        id: 23, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Pilates topu büyüktür.', wrong: 'Hayır, misket küçüktür.' },
            en: { correct: 'Yes! The pilates ball is big.', wrong: 'No, the marble is small.' },
            de: { correct: 'Ja! Der Pilatesball ist groß.', wrong: 'Nein, die Murmel ist klein.' },
            fr: { correct: "Oui ! Le ballon de pilates est grand.", wrong: "Non, la bille est petite." },
            nl: { correct: 'Ja! De pilatesbal is groot.', wrong: 'Nee, de knikker is klein.' },
            az: { correct: 'Bəli! Pilates topu böyükdür.', wrong: 'Xeyr, mərmər daşı kiçikdir.' }
        },
        options: [
            { id: 362, word: "pilates topu", imageUrl: "/images/362.png", isCorrect: true, audioKey: "pilates_topu", spokenText: "pilates topu" },
            { id: 762, word: "misket", imageUrl: "/images/762.png", imageScale: 0.72, isCorrect: false, audioKey: "misket", spokenText: "misket" }
        ]
    },
    { 
        id: 24, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Misket küçüktür.', wrong: 'Hayır, pilates topu büyüktür.' },
            en: { correct: 'Yes! The marble is small.', wrong: 'No, the pilates ball is big.' },
            de: { correct: 'Ja! Die Murmel ist klein.', wrong: 'Nein, der Pilatesball ist groß.' },
            fr: { correct: "Oui ! La bille est petite.", wrong: "Non, le ballon de pilates est grand." },
            nl: { correct: 'Ja! De knikker is klein.', wrong: 'Nee, de pilatesbal is groot.' },
            az: { correct: 'Bəli! Mərmər daşı kiçikdir.', wrong: 'Xeyr, pilates topu böyükdür.' }
        },
        options: [
            { id: 362, word: "pilates topu", imageUrl: "/images/362.png", isCorrect: false, audioKey: "pilates_topu", spokenText: "pilates topu" },
            { id: 762, word: "misket", imageUrl: "/images/762.png", imageScale: 0.72, isCorrect: true, audioKey: "misket", spokenText: "misket" }
        ]
    },

    // 13. Karpuz vs Kiraz
    { 
        id: 25, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Karpuz büyüktür.', wrong: 'Hayır, kiraz küçüktür.' },
            en: { correct: 'Yes! The watermelon is big.', wrong: 'No, the cherry is small.' },
            de: { correct: 'Ja! Die Wassermelone ist groß.', wrong: 'Nein, die Kirsche ist klein.' },
            fr: { correct: "Oui ! La pastèque est grande.", wrong: "Non, la cerise est petite." },
            nl: { correct: 'Ja! De watermeloen is groot.', wrong: 'Nee, de kers is klein.' },
            az: { correct: 'Bəli! Qarpız böyükdür.', wrong: 'Xeyr, albalı kiçikdir.' }
        },
        options: [
            { id: 170, word: "karpuz", imageUrl: "/images/170.png", isCorrect: true, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 278, word: "kiraz", imageUrl: "/images/278.png", isCorrect: false, audioKey: "kiraz", spokenText: "kiraz" }
        ]
    },
    { 
        id: 26, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Kiraz küçüktür.', wrong: 'Hayır, karpuz büyüktür.' },
            en: { correct: 'Yes! The cherry is small.', wrong: 'No, the watermelon is big.' },
            de: { correct: 'Ja! Die Kirsche ist klein.', wrong: 'Nein, die Wassermelone ist groß.' },
            fr: { correct: "Oui ! La cerise est petite.", wrong: "Non, la pastèque est grande." },
            nl: { correct: 'Ja! De kers is klein.', wrong: 'Nee, de watermeloen is groot.' },
            az: { correct: 'Bəli! Albalı kiçikdir.', wrong: 'Xeyr, qarpız böyükdür.' }
        },
        options: [
            { id: 170, word: "karpuz", imageUrl: "/images/170.png", isCorrect: false, audioKey: "karpuz", spokenText: "karpuz" },
            { id: 278, word: "kiraz", imageUrl: "/images/278.png", isCorrect: true, audioKey: "kiraz", spokenText: "kiraz" }
        ]
    },

    // 14. Ansiklopedi vs Silgi
    { 
        id: 27, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Ansiklopedi büyüktür.', wrong: 'Hayır, silgi küçüktür.' },
            en: { correct: 'Yes! The encyclopedia is big.', wrong: 'No, the eraser is small.' },
            de: { correct: 'Ja! Die Enzyklopädie ist groß.', wrong: 'Nein, der Radiergummi ist klein.' },
            fr: { correct: "Oui ! L'encyclopédie est grande.", wrong: "Non, la gomme est petite." },
            nl: { correct: 'Ja! De encyclopedie is groot.', wrong: 'Nee, de gum is klein.' },
            az: { correct: 'Bəli! Ensiklopediya böyükdür.', wrong: 'Xeyr, pozan kiçikdir.' }
        },
        options: [
            { id: 554, word: "ansiklopedi", imageUrl: "/images/554.png", isCorrect: true, audioKey: "ansiklopedi", spokenText: "ansiklopedi" },
            { id: 535, word: "silgi", imageUrl: "/images/535.png", isCorrect: false, audioKey: "silgi", spokenText: "silgi" }
        ]
    },
    { 
        id: 28, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Silgi küçüktür.', wrong: 'Hayır, ansiklopedi büyüktür.' },
            en: { correct: 'Yes! The eraser is small.', wrong: 'No, the encyclopedia is big.' },
            de: { correct: 'Ja! Der Radiergummi ist klein.', wrong: 'Nein, die Enzyklopädie ist groß.' },
            fr: { correct: "Oui ! La gomme est petite.", wrong: "Non, l'encyclopédie est grande." },
            nl: { correct: 'Ja! De gum is klein.', wrong: 'Nee, de encyclopedie is groot.' },
            az: { correct: 'Bəli! Pozan kiçikdir.', wrong: 'Xeyr, ensiklopediya böyükdür.' }
        },
        options: [
            { id: 554, word: "ansiklopedi", imageUrl: "/images/554.png", isCorrect: false, audioKey: "ansiklopedi", spokenText: "ansiklopedi" },
            { id: 535, word: "silgi", imageUrl: "/images/535.png", isCorrect: true, audioKey: "silgi", spokenText: "silgi" }
        ]
    },
    
    // 15. Traktör vs Bisiklet
    { 
        id: 29, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Traktör büyüktür.', wrong: 'Hayır, bisiklet küçüktür.' },
            en: { correct: 'Yes! The tractor is big.', wrong: 'No, the bicycle is small.' },
            de: { correct: 'Ja! Der Traktor ist groß.', wrong: 'Nein, das Fahrrad ist klein.' },
            fr: { correct: "Oui ! Le tracteur est grand.", wrong: "Non, le vélo est petit." },
            nl: { correct: 'Ja! De tractor is groot.', wrong: 'Nee, de fiets is klein.' },
            az: { correct: 'Bəli! Traktor böyükdür.', wrong: 'Xeyr, velosiped kiçikdir.' }
        },
        options: [
            { id: 289, word: "traktör", imageUrl: "/images/289.png", isCorrect: true, audioKey: "traktor", spokenText: "traktör" },
            { id: 110, word: "bisiklet", imageUrl: "/images/110.png", isCorrect: false, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    { 
        id: 30, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Bisiklet küçüktür.', wrong: 'Hayır, traktör büyüktür.' },
            en: { correct: 'Yes! The bicycle is small.', wrong: 'No, the tractor is big.' },
            de: { correct: 'Ja! Das Fahrrad ist klein.', wrong: 'Nein, der Traktor ist groß.' },
            fr: { correct: "Oui ! Le vélo est petit.", wrong: "Non, le tracteur est grand." },
            nl: { correct: 'Ja! De fiets is klein.', wrong: 'Nee, de tractor is groot.' },
            az: { correct: 'Bəli! Velosiped kiçikdir.', wrong: 'Xeyr, traktor böyükdür.' }
        },
        options: [
            { id: 289, word: "traktör", imageUrl: "/images/289.png", isCorrect: false, audioKey: "traktor", spokenText: "traktör" },
            { id: 110, word: "bisiklet", imageUrl: "/images/110.png", isCorrect: true, audioKey: "bisiklet", spokenText: "bisiklet" }
        ]
    },
    
    // 16. Kanepe vs Koltuk
    { 
        id: 31, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Kanepe büyüktür.', wrong: 'Hayır, koltuk küçüktür.' },
            en: { correct: 'Yes! The sofa is big.', wrong: 'No, the armchair is small.' },
            de: { correct: 'Ja! Das Sofa ist groß.', wrong: 'Nein, der Sessel ist klein.' },
            fr: { correct: "Oui ! Le canapé est grand.", wrong: "Non, le fauteuil est petit." },
            nl: { correct: 'Ja! De bank is groot.', wrong: 'Nee, de fauteuil is klein.' },
            az: { correct: 'Bəli! Divan böyükdür.', wrong: 'Xeyr, kreslo kiçikdir.' }
        },
        options: [
            { id: 549, word: "kanepe", imageUrl: "/images/549.png", isCorrect: true, audioKey: "kanepe", spokenText: "kanepe" },
            { id: 548, word: "koltuk", imageUrl: "/images/548.png", isCorrect: false, audioKey: "koltuk", spokenText: "koltuk" }
        ]
    },
    { 
        id: 32, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Koltuk küçüktür.', wrong: 'Hayır, kanepe büyüktür.' },
            en: { correct: 'Yes! The armchair is small.', wrong: 'No, the sofa is big.' },
            de: { correct: 'Ja! Der Sessel ist klein.', wrong: 'Nein, das Sofa ist groß.' },
            fr: { correct: "Oui ! Le fauteuil est petit.", wrong: "Non, le canapé est grand." },
            nl: { correct: 'Ja! De fauteuil is klein.', wrong: 'Nee, de bank is groot.' },
            az: { correct: 'Bəli! Kreslo kiçikdir.', wrong: 'Xeyr, divan böyükdür.' }
        },
        options: [
            { id: 549, word: "kanepe", imageUrl: "/images/549.png", isCorrect: false, audioKey: "kanepe", spokenText: "kanepe" },
            { id: 548, word: "koltuk", imageUrl: "/images/548.png", isCorrect: true, audioKey: "koltuk", spokenText: "koltuk" }
        ]
    },

    // 17. Merdiven vs Tabure
    { 
        id: 33, 
        question: "Büyük olan hangisi?", 
        questionAudioKey: "q_which_is_big", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Merdiven büyüktür.', wrong: 'Hayır, tabure küçüktür.' },
            en: { correct: 'Yes! The ladder is big.', wrong: 'No, the stool is small.' },
            de: { correct: 'Ja! Die Leiter ist groß.', wrong: 'Nein, der Hocker ist klein.' },
            fr: { correct: "Oui ! L'échelle est grande.", wrong: "Non, le tabouret est petit." },
            nl: { correct: 'Ja! De ladder is groot.', wrong: 'Nee, de kruk is klein.' },
            az: { correct: 'Bəli! Nərdivan böyükdür.', wrong: 'Xeyr, taburet kiçikdir.' }
        },
        options: [
            { id: 494, word: "merdiven", imageUrl: "/images/494.png", isCorrect: true, audioKey: "merdiven", spokenText: "merdiven" },
            { id: 495, word: "tabure", imageUrl: "/images/495.png", isCorrect: false, audioKey: "tabure", spokenText: "tabure" }
        ]
    },
    { 
        id: 34, 
        question: "Küçük olan hangisi?", 
        questionAudioKey: "q_which_is_small", 
        activityType: ActivityType.BigSmall, 
        speech: {
            tr: { correct: 'Evet! Tabure küçüktür.', wrong: 'Hayır, merdiven büyüktür.' },
            en: { correct: 'Yes! The stool is small.', wrong: 'No, the ladder is big.' },
            de: { correct: 'Ja! Der Hocker ist klein.', wrong: 'Nein, die Leiter ist groß.' },
            fr: { correct: "Oui ! Le tabouret est petit.", wrong: "Non, l'échelle est grande." },
            nl: { correct: 'Ja! De kruk is klein.', wrong: 'Nee, de ladder is groot.' },
            az: { correct: 'Bəli! Taburet kiçikdir.', wrong: 'Xeyr, nərdivan böyükdür.' }
        },
        options: [
            { id: 494, word: "merdiven", imageUrl: "/images/494.png", isCorrect: false, audioKey: "merdiven", spokenText: "merdiven" },
            { id: 495, word: "tabure", imageUrl: "/images/495.png", isCorrect: true, audioKey: "tabure", spokenText: "tabure" }
        ]
    }
];
