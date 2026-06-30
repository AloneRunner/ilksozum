import { ConceptRound, ActivityType } from '../../../../types';

export const wetDryData: ConceptRound[] = [
    // 1. Islak Sünger - Kuru Sünger
    { 
        id: 1, 
        question: "Islak olan hangisi?", 
        questionAudioKey: "q_which_is_wet", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Sünger ıslaktır.', wrong: 'Hayır, sünger kurudur.' },
            en: { correct: 'Yes! The sponge is wet.', wrong: 'No, the sponge is dry.' },
            de: { correct: 'Ja! Der Schwamm ist nass.', wrong: 'Nein, der Schwamm ist trocken.' },
            fr: { correct: "Oui ! L'éponge est mouillée.", wrong: "Non, l'éponge est sèche." },
            nl: { correct: 'Ja! De spons is nat.', wrong: 'Nee, de spons is droog.' },
            az: { correct: 'Bəli! Süngər yaşdır.', wrong: 'Xeyr, süngər qurudur.' }
        },
        options: [
            { id: 166, word: "sünger", imageUrl: "/images/166.png", isCorrect: true, audioKey: "sunger", spokenText: "ıslak sünger" },
            { id: 167, word: "sünger", imageUrl: "/images/167.png", isCorrect: false, audioKey: "sunger", spokenText: "kuru sünger" }
        ]
    },
    { 
        id: 2, 
        question: "Kuru olan hangisi?", 
        questionAudioKey: "q_which_is_dry", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Sünger kurudur.', wrong: 'Hayır, sünger ıslaktır.' },
            en: { correct: 'Yes! The sponge is dry.', wrong: 'No, the sponge is wet.' },
            de: { correct: 'Ja! Der Schwamm ist trocken.', wrong: 'Nein, der Schwamm ist nass.' },
            fr: { correct: "Oui ! L'éponge est sèche.", wrong: "Non, l'éponge est mouillée." },
            nl: { correct: 'Ja! De spons is droog.', wrong: 'Nee, de spons is nat.' },
            az: { correct: 'Bəli! Süngər qurudur.', wrong: 'Xeyr, süngər yaşdır.' }
        },
        options: [
            { id: 166, word: "sünger", imageUrl: "/images/166.png", isCorrect: false, audioKey: "sunger", spokenText: "ıslak sünger" },
            { id: 167, word: "sünger", imageUrl: "/images/167.png", isCorrect: true, audioKey: "sunger", spokenText: "kuru sünger" }
        ]
    },

    // 2. Yağmur Bulutu - Güneş
    { 
        id: 3, 
        question: "Islak olan hangisi?", 
        questionAudioKey: "q_which_is_wet", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Yağmur ıslaktır.', wrong: 'Hayır, güneş kurudur.' },
            en: { correct: 'Yes! The rain is wet.', wrong: 'No, the sun is dry.' },
            de: { correct: 'Ja! Der Regen ist nass.', wrong: 'Nein, die Sonne ist trocken.' },
            fr: { correct: "Oui ! La pluie est mouillée.", wrong: "Non, le soleil est sec." },
            nl: { correct: 'Ja! De regen is nat.', wrong: 'Nee, de zon is droog.' },
            az: { correct: 'Bəli! Yağış yaşdır.', wrong: 'Xeyr, günəş qurudur.' }
        },
        options: [
            { id: 52, word: "yağmur", imageUrl: "/images/52.png", isCorrect: true, audioKey: "yagmur", spokenText: "yağmur" },
            { id: 237, word: "güneş", imageUrl: "/images/237.png", isCorrect: false, audioKey: "gunes", spokenText: "güneş" }
        ]
    },
    { 
        id: 4, 
        question: "Kuru olan hangisi?", 
        questionAudioKey: "q_which_is_dry", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Güneş kurudur.', wrong: 'Hayır, yağmur ıslaktır.' },
            en: { correct: 'Yes! The sun is dry.', wrong: 'No, the rain is wet.' },
            de: { correct: 'Ja! Die Sonne ist trocken.', wrong: 'Nein, der Regen ist nass.' },
            fr: { correct: "Oui ! Le soleil est sec.", wrong: "Non, la pluie est mouillée." },
            nl: { correct: 'Ja! De zon is droog.', wrong: 'Nee, de regen is nat.' },
            az: { correct: 'Bəli! Günəş qurudur.', wrong: 'Xeyr, yağış yaşdır.' }
        },
        options: [
            { id: 52, word: "yağmur", imageUrl: "/images/52.png", isCorrect: false, audioKey: "yagmur", spokenText: "yağmur" },
            { id: 237, word: "güneş", imageUrl: "/images/237.png", isCorrect: true, audioKey: "gunes", spokenText: "güneş" }
        ]
    },

    // 3. Islak Köpek - Kuru Köpek
    { 
        id: 5, 
        question: "Islak olan hangisi?", 
        questionAudioKey: "q_which_is_wet_person", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Köpek ıslaktır.', wrong: 'Hayır, köpek kurudur.' },
            en: { correct: 'Yes! The dog is wet.', wrong: 'No, the dog is dry.' },
            de: { correct: 'Ja! Der Hund ist nass.', wrong: 'Nein, der Hund ist trocken.' },
            fr: { correct: "Oui ! Le chien est mouillé.", wrong: "Non, le chien est sec." },
            nl: { correct: 'Ja! De hond is nat.', wrong: 'Nee, de hond is droog.' },
            az: { correct: 'Bəli! İt yaşdır.', wrong: 'Xeyr, it qurudur.' }
        },
        options: [
            { id: 522, word: "köpek", imageUrl: "/images/522.png", isCorrect: true, audioKey: "kopek", spokenText: "ıslak köpek" },
            { id: 521, word: "köpek", imageUrl: "/images/521.png", isCorrect: false, audioKey: "kopek", spokenText: "kuru köpek" }
        ]
    },
    { 
        id: 6, 
        question: "Kuru olan hangisi?", 
        questionAudioKey: "q_which_is_dry_person", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Köpek kurudur.', wrong: 'Hayır, köpek ıslaktır.' },
            en: { correct: 'Yes! The dog is dry.', wrong: 'No, the dog is wet.' },
            de: { correct: 'Ja! Der Hund ist trocken.', wrong: 'Nein, der Hund ist nass.' },
            fr: { correct: "Oui ! Le chien est sec.", wrong: "Non, le chien est mouillé." },
            nl: { correct: 'Ja! De hond is droog.', wrong: 'Nee, de hond is nat.' },
            az: { correct: 'Bəli! İt qurudur.', wrong: 'Xeyr, it yaşdır.' }
        },
        options: [
            { id: 522, word: "köpek", imageUrl: "/images/522.png", isCorrect: false, audioKey: "kopek", spokenText: "ıslak köpek" },
            { id: 521, word: "köpek", imageUrl: "/images/521.png", isCorrect: true, audioKey: "kopek", spokenText: "kuru köpek" }
        ]
    },

    // 4. Islak Saç - Kuru Saç
    { 
        id: 7, 
        question: "Islak olan hangisi?", 
        questionAudioKey: "q_which_is_wet", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Saç ıslaktır.', wrong: 'Hayır, saç kurudur.' },
            en: { correct: 'Yes! The hair is wet.', wrong: 'No, the hair is dry.' },
            de: { correct: 'Ja! Das Haar ist nass.', wrong: 'Nein, das Haar ist trocken.' },
            fr: { correct: "Oui ! Les cheveux sont mouillés.", wrong: "Non, les cheveux sont secs." },
            nl: { correct: 'Ja! Het haar is nat.', wrong: 'Nee, het haar is droog.' },
            az: { correct: 'Bəli! Saç yaşdır.', wrong: 'Xeyr, saç qurudur.' }
        },
        options: [
            { id: 594, word: "saç", imageUrl: "/images/594.png", isCorrect: true, audioKey: "sac", spokenText: "ıslak saç" },
            { id: 662, word: "saç", imageUrl: "/images/662.png", isCorrect: false, audioKey: "sac", spokenText: "kuru saç" }
        ]
    },
    { 
        id: 8, 
        question: "Kuru olan hangisi?", 
        questionAudioKey: "q_which_is_dry", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Saç kurudur.', wrong: 'Hayır, saç ıslaktır.' },
            en: { correct: 'Yes! The hair is dry.', wrong: 'No, the hair is wet.' },
            de: { correct: 'Ja! Das Haar ist trocken.', wrong: 'Nein, das Haar ist nass.' },
            fr: { correct: "Oui ! Les cheveux sont secs.", wrong: "Non, les cheveux sont mouillés." },
            nl: { correct: 'Ja! Het haar is droog.', wrong: 'Nee, het haar is nat.' },
            az: { correct: 'Bəli! Saç qurudur.', wrong: 'Xeyr, saç yaşdır.' }
        },
        options: [
            { id: 594, word: "saç", imageUrl: "/images/594.png", isCorrect: false, audioKey: "sac", spokenText: "ıslak saç" },
            { id: 662, word: "saç", imageUrl: "/images/662.png", isCorrect: true, audioKey: "sac", spokenText: "kuru saç" }
        ]
    },

    // 5. Islak Şemsiye - Kuru Şemsiye
    { 
        id: 9, 
        question: "Islak olan hangisi?", 
        questionAudioKey: "q_which_is_wet", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Şemsiye ıslaktır.', wrong: 'Hayır, şemsiye kurudur.' },
            en: { correct: 'Yes! The umbrella is wet.', wrong: 'No, the umbrella is dry.' },
            de: { correct: 'Ja! Der Regenschirm ist nass.', wrong: 'Nein, der Regenschirm ist trocken.' },
            fr: { correct: "Oui ! Le parapluie est mouillé.", wrong: "Non, le parapluie est sec." },
            nl: { correct: 'Ja! De paraplu is nat.', wrong: 'Nee, de paraplu is droog.' },
            az: { correct: 'Bəli! Çətir yaşdır.', wrong: 'Xeyr, çətir qurudur.' }
        },
        options: [
            { id: 157, word: "şemsiye", imageUrl: "/images/157.png", disableRealistic: true, isCorrect: true, audioKey: "semsiye", spokenText: "ıslak şemsiye" },
            { id: 158, word: "şemsiye", imageUrl: "/images/158.png", isCorrect: false, audioKey: "semsiye", spokenText: "kuru şemsiye" }
        ]
    },
    { 
        id: 10, 
        question: "Kuru olan hangisi?", 
        questionAudioKey: "q_which_is_dry", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Şemsiye kurudur.', wrong: 'Hayır, şemsiye ıslaktır.' },
            en: { correct: 'Yes! The umbrella is dry.', wrong: 'No, the umbrella is wet.' },
            de: { correct: 'Ja! Der Regenschirm ist trocken.', wrong: 'Nein, der Regenschirm ist nass.' },
            fr: { correct: "Oui ! Le parapluie est sec.", wrong: "Non, le parapluie est mouillé." },
            nl: { correct: 'Ja! De paraplu is droog.', wrong: 'Nee, de paraplu is nat.' },
            az: { correct: 'Bəli! Çətir qurudur.', wrong: 'Xeyr, çətir yaşdır.' }
        },
        options: [
            { id: 157, word: "şemsiye", imageUrl: "/images/157.png", disableRealistic: true, isCorrect: false, audioKey: "semsiye", spokenText: "ıslak şemsiye" },
            { id: 158, word: "şemsiye", imageUrl: "/images/158.png", isCorrect: true, audioKey: "semsiye", spokenText: "kuru şemsiye" }
        ]
    },

    // 6. Islak Tişört - Kuru Tişört
    { 
        id: 11, 
        question: "Islak olan hangisi?", 
        questionAudioKey: "q_which_is_wet", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Tişört ıslaktır.', wrong: 'Hayır, tişört kurudur.' },
            en: { correct: 'Yes! The t-shirt is wet.', wrong: 'No, the t-shirt is dry.' },
            de: { correct: 'Ja! Das T-Shirt ist nass.', wrong: 'Nein, das T-Shirt ist trocken.' },
            fr: { correct: "Oui ! Le t-shirt est mouillé.", wrong: "Non, le t-shirt est sec." },
            nl: { correct: 'Ja! Het t-shirt is nat.', wrong: 'Nee, het t-shirt is droog.' },
            az: { correct: 'Bəli! Tişört yaşdır.', wrong: 'Xeyr, tişört qurudur.' }
        },
        options: [
            { id: 15, word: "tişört", imageUrl: "/images/15.png", isCorrect: true, audioKey: "tisort", spokenText: "ıslak tişört" },
            { id: 13, word: "tişört", imageUrl: "/images/13.png", isCorrect: false, audioKey: "tisort", spokenText: "kuru tişört" }
        ]
    },
    { 
        id: 12, 
        question: "Kuru olan hangisi?", 
        questionAudioKey: "q_which_is_dry", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Tişört kurudur.', wrong: 'Hayır, tişört ıslaktır.' },
            en: { correct: 'Yes! The t-shirt is dry.', wrong: 'No, the t-shirt is wet.' },
            de: { correct: 'Ja! Das T-Shirt ist trocken.', wrong: 'Nein, das T-Shirt ist nass.' },
            fr: { correct: "Oui ! Le t-shirt est sec.", wrong: "Non, le t-shirt est mouillé." },
            nl: { correct: 'Ja! Het t-shirt is droog.', wrong: 'Nee, het t-shirt is nat.' },
            az: { correct: 'Bəli! Tişört qurudur.', wrong: 'Xeyr, tişört yaşdır.' }
        },
        options: [
            { id: 15, word: "tişört", imageUrl: "/images/15.png", isCorrect: false, audioKey: "tisort", spokenText: "ıslak tişört" },
            { id: 13, word: "tişört", imageUrl: "/images/13.png", isCorrect: true, audioKey: "tisort", spokenText: "kuru tişört" }
        ]
    },

    // 7. Islak Yol - Kuru Yol
    { 
        id: 13, 
        question: "Islak olan hangisi?", 
        questionAudioKey: "q_which_is_wet_person", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Yol ıslaktır.', wrong: 'Hayır, yol kurudur.' },
            en: { correct: 'Yes! The road is wet.', wrong: 'No, the road is dry.' },
            de: { correct: 'Ja! Die Straße ist nass.', wrong: 'Nein, die Straße ist trocken.' },
            fr: { correct: "Oui ! La route est mouillée.", wrong: "Non, la route est sèche." },
            nl: { correct: 'Ja! De weg is nat.', wrong: 'Nee, de weg is droog.' },
            az: { correct: 'Bəli! Yol yaşdır.', wrong: 'Xeyr, yol qurudur.' }
        },
        options: [
            { id: 599, word: "otoyol", imageUrl: "/images/599.png", isCorrect: true, audioKey: "otoyol", spokenText: "ıslak yol" },
            { id: 530, word: "otoyol", imageUrl: "/images/530.png", isCorrect: false, audioKey: "otoyol", spokenText: "kuru yol" }
        ]
    },
    { 
        id: 14, 
        question: "Kuru olan hangisi?", 
        questionAudioKey: "q_which_is_dry", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Yol kurudur.', wrong: 'Hayır, yol ıslaktır.' },
            en: { correct: 'Yes! The road is dry.', wrong: 'No, the road is wet.' },
            de: { correct: 'Ja! Die Straße ist trocken.', wrong: 'Nein, die Straße ist nass.' },
            fr: { correct: "Oui ! La route est sèche.", wrong: "Non, la route est mouillée." },
            nl: { correct: 'Ja! De weg is droog.', wrong: 'Nee, de weg is nat.' },
            az: { correct: 'Bəli! Yol qurudur.', wrong: 'Xeyr, yol yaşdır.' }
        },
        options: [
            { id: 599, word: "otoyol", imageUrl: "/images/599.png", isCorrect: false, audioKey: "otoyol", spokenText: "ıslak yol" },
            { id: 530, word: "otoyol", imageUrl: "/images/530.png", isCorrect: true, audioKey: "otoyol", spokenText: "kuru yol" }
        ]
    },

    // 8. Islak Yaprak - Kuru Yaprak
    { 
        id: 15, 
        question: "Islak olan hangisi?", 
        questionAudioKey: "q_which_is_wet", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Yaprak ıslaktır.', wrong: 'Hayır, yaprak kurudur.' },
            en: { correct: 'Yes! The leaf is wet.', wrong: 'No, the leaf is dry.' },
            de: { correct: 'Ja! Das Blatt ist nass.', wrong: 'Nein, das Blatt ist trocken.' },
            fr: { correct: "Oui ! La feuille est mouillée.", wrong: "Non, la feuille est sèche." },
            nl: { correct: 'Ja! Het blad is nat.', wrong: 'Nee, het blad is droog.' },
            az: { correct: 'Bəli! Yarpaq yaşdır.', wrong: 'Xeyr, yarpaq qurudur.' }
        },
        options: [
            { id: 647, word: "yaprak", imageUrl: "/images/647.png", isCorrect: true, audioKey: "yaprak", spokenText: "ıslak yaprak" },
            { id: 117, word: "yaprak", imageUrl: "/images/117.png", isCorrect: false, audioKey: "yaprak", spokenText: "kuru yaprak" }
        ]
    },
    { 
        id: 16, 
        question: "Kuru olan hangisi?", 
        questionAudioKey: "q_which_is_dry", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Yaprak kurudur.', wrong: 'Hayır, yaprak ıslaktır.' },
            en: { correct: 'Yes! The leaf is dry.', wrong: 'No, the leaf is wet.' },
            de: { correct: 'Ja! Das Blatt ist trocken.', wrong: 'Nein, das Blatt ist nass.' },
            fr: { correct: "Oui ! La feuille est sèche.", wrong: "Non, la feuille est mouillée." },
            nl: { correct: 'Ja! Het blad is droog.', wrong: 'Nee, het blad is nat.' },
            az: { correct: 'Bəli! Yarpaq qurudur.', wrong: 'Xeyr, yarpaq yaşdır.' }
        },
        options: [
            { id: 647, word: "yaprak", imageUrl: "/images/647.png", isCorrect: false, audioKey: "yaprak", spokenText: "ıslak yaprak" },
            { id: 117, word: "yaprak", imageUrl: "/images/117.png", isCorrect: true, audioKey: "yaprak", spokenText: "kuru yaprak" }
        ]
    },

    // 9. Su Bardağı - Kuru Bardak
    { 
        id: 17, 
        question: "Islak olan hangisi?", 
        questionAudioKey: "q_which_is_wet", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Bardak ıslaktır.', wrong: 'Hayır, bardak kurudur.' },
            en: { correct: 'Yes! The glass is wet.', wrong: 'No, the glass is dry.' },
            de: { correct: 'Ja! Das Glas ist nass.', wrong: 'Nein, das Glas ist trocken.' },
            fr: { correct: "Oui ! Le verre est mouillé.", wrong: "Non, le verre est sec." },
            nl: { correct: 'Ja! Het glas is nat.', wrong: 'Nee, het glas is droog.' },
            az: { correct: 'Bəli! Stəkan yaşdır.', wrong: 'Xeyr, stəkan qurudur.' }
        },
        options: [
            { id: 123, word: "bardak", imageUrl: "/images/123.png", isCorrect: true, audioKey: "bardak", spokenText: "ıslak bardak" },
            { id: 124, word: "bardak", imageUrl: "/images/124.png", isCorrect: false, audioKey: "bardak", spokenText: "kuru bardak" }
        ]
    },
    { 
        id: 18, 
        question: "Kuru olan hangisi?", 
        questionAudioKey: "q_which_is_dry", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Bardak kurudur.', wrong: 'Hayır, bardak ıslaktır.' },
            en: { correct: 'Yes! The glass is dry.', wrong: 'No, the glass is wet.' },
            de: { correct: 'Ja! Das Glas ist trocken.', wrong: 'Nein, das Glas ist nass.' },
            fr: { correct: "Oui ! Le verre est sec.", wrong: "Non, le verre est mouillé." },
            nl: { correct: 'Ja! Het glas is droog.', wrong: 'Nee, het glas is nat.' },
            az: { correct: 'Bəli! Stəkan qurudur.', wrong: 'Xeyr, stəkan yaşdır.' }
        },
        options: [
            { id: 123, word: "bardak", imageUrl: "/images/123.png", isCorrect: false, audioKey: "bardak", spokenText: "ıslak bardak" },
            { id: 124, word: "bardak", imageUrl: "/images/124.png", isCorrect: true, audioKey: "bardak", spokenText: "kuru bardak" }
        ]
    },

    // 10. Islak Zemin - Kuru Toprak
    { 
        id: 19, 
        question: "Islak olan hangisi?", 
        questionAudioKey: "q_which_is_wet", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Su birikintisi ıslaktır.', wrong: 'Hayır, toprak kurudur.' },
            en: { correct: 'Yes! The puddle is wet.', wrong: 'No, the soil is dry.' },
            de: { correct: 'Ja! Die Pfütze ist nass.', wrong: 'Nein, die Erde ist trocken.' },
            fr: { correct: "Oui ! La flaque d'eau est mouillée.", wrong: "Non, le sol est sec." },
            nl: { correct: 'Ja! De plas is nat.', wrong: 'Nee, de grond is droog.' },
            az: { correct: 'Bəli! Gölməçə yaşdır.', wrong: 'Xeyr, torpaq qurudur.' }
        },
        options: [
            { id: 699, word: "su birikintisi", imageUrl: "/images/699.png", isCorrect: true, audioKey: "su_birikintisi", spokenText: "ıslak zemin" },
            { id: 316, word: "tohum", imageUrl: "/images/316.png", isCorrect: false, audioKey: "tohum", spokenText: "kuru toprak" }
        ]
    },
    { 
        id: 20, 
        question: "Kuru olan hangisi?", 
        questionAudioKey: "q_which_is_dry", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Toprak kurudur.', wrong: 'Hayır, su birikintisi ıslaktır.' },
            en: { correct: 'Yes! The soil is dry.', wrong: 'No, the puddle is wet.' },
            de: { correct: 'Ja! Die Erde ist trocken.', wrong: 'Nein, die Pfütze ist nass.' },
            fr: { correct: "Oui ! Le sol est sec.", wrong: "Non, la flaque d'eau est mouillée." },
            nl: { correct: 'Ja! De grond is droog.', wrong: 'Nee, de plas is nat.' },
            az: { correct: 'Bəli! Torpaq qurudur.', wrong: 'Xeyr, gölməçə yaşdır.' }
        },
        options: [
            { id: 699, word: "su birikintisi", imageUrl: "/images/699.png", isCorrect: false, audioKey: "su_birikintisi", spokenText: "ıslak zemin" },
            { id: 316, word: "tohum", imageUrl: "/images/316.png", isCorrect: true, audioKey: "tohum", spokenText: "kuru toprak" }
        ]
    },

    // 11. Islak Boya Fırçası - Kuru Fırça
    { 
        id: 21, 
        question: "Islak olan hangisi?", 
        questionAudioKey: "q_which_is_wet", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Fırça ıslaktır.', wrong: 'Hayır, fırça kurudur.' },
            en: { correct: 'Yes! The brush is wet.', wrong: 'No, the brush is dry.' },
            de: { correct: 'Ja! Der Pinsel ist nass.', wrong: 'Nein, der Pinsel ist trocken.' },
            fr: { correct: "Oui ! Le pinceau est mouillé.", wrong: "Non, le pinceau est sec." },
            nl: { correct: 'Ja! De kwast is nat.', wrong: 'Nee, de kwast is droog.' },
            az: { correct: 'Bəli! Fırça yaşdır.', wrong: 'Xeyr, fırça qurudur.' }
        },
        options: [
            { id: 51, word: "fırça", imageUrl: "/images/51.png", isCorrect: true, audioKey: "firca", spokenText: "ıslak fırça" },
            { id: 539, word: "fırça", imageUrl: "/images/539.png", isCorrect: false, audioKey: "firca", spokenText: "kuru fırça" }
        ]
    },
    { 
        id: 22, 
        question: "Kuru olan hangisi?", 
        questionAudioKey: "q_which_is_dry", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Fırça kurudur.', wrong: 'Hayır, fırça ıslaktır.' },
            en: { correct: 'Yes! The brush is dry.', wrong: 'No, the brush is wet.' },
            de: { correct: 'Ja! Der Pinsel ist trocken.', wrong: 'Nein, der Pinsel ist nass.' },
            fr: { correct: "Oui ! Le pinceau est sec.", wrong: "Non, le pinceau est mouillé." },
            nl: { correct: 'Ja! De kwast is droog.', wrong: 'Nee, de kwast is nat.' },
            az: { correct: 'Bəli! Fırça qurudur.', wrong: 'Xeyr, fırça yaşdır.' }
        },
        options: [
            { id: 51, word: "fırça", imageUrl: "/images/51.png", isCorrect: false, audioKey: "firca", spokenText: "ıslak fırça" },
            { id: 539, word: "fırça", imageUrl: "/images/539.png", isCorrect: true, audioKey: "firca", spokenText: "kuru fırça" }
        ]
    },

    // 12. Islak Banyo Yapan Çocuk - Kuru Havlu
    { 
        id: 25, 
        question: "Islak olan hangisi?", 
        questionAudioKey: "q_which_is_wet_person", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Çocuk ıslaktır.', wrong: 'Hayır, havlu kurudur.' },
            en: { correct: 'Yes! The child is wet.', wrong: 'No, the towel is dry.' },
            de: { correct: 'Ja! Das Kind ist nass.', wrong: 'Nein, das Handtuch ist trocken.' },
            fr: { correct: "Oui ! L'enfant est mouillé.", wrong: "Non, la serviette est sèche." },
            nl: { correct: 'Ja! Het kind is nat.', wrong: 'Nee, de handdoek is droog.' },
            az: { correct: 'Bəli! Uşaq yaşdır.', wrong: 'Xeyr, dəsmal qurudur.' }
        },
        options: [
            { id: 875, word: "banyo yapan çocuk", imageUrl: "/images/875.png", isCorrect: true, audioKey: "banyo_yapan_cocuk", spokenText: "ıslak banyo yapan çocuk" },
            { id: 523, word: "havlu", imageUrl: "/images/523.png", isCorrect: false, audioKey: "havlu", spokenText: "kuru havlu" }
        ]
    },
    { 
        id: 26, 
        question: "Kuru olan hangisi?", 
        questionAudioKey: "q_which_is_dry_person", 
        activityType: ActivityType.WetDry, 
        speech: {
            tr: { correct: 'Evet! Havlu kurudur.', wrong: 'Hayır, çocuk ıslaktır.' },
            en: { correct: 'Yes! The towel is dry.', wrong: 'No, the child is wet.' },
            de: { correct: 'Ja! Das Handtuch ist trocken.', wrong: 'Nein, das Kind ist nass.' },
            fr: { correct: "Oui ! La serviette est sèche.", wrong: "Non, l'enfant est mouillé." },
            nl: { correct: 'Ja! De handdoek is droog.', wrong: 'Nee, het kind is nat.' },
            az: { correct: 'Bəli! Dəsmal qurudur.', wrong: 'Xeyr, uşaq yaşdır.' }
        },
        options: [
            { id: 875, word: "banyo yapan çocuk", imageUrl: "/images/875.png", isCorrect: false, audioKey: "banyo_yapan_cocuk", spokenText: "ıslak banyo yapan çocuk" },
            { id: 523, word: "havlu", imageUrl: "/images/523.png", isCorrect: true, audioKey: "havlu", spokenText: "kuru havlu" }
        ]
    },
];