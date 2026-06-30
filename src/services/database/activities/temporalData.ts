import { ConceptRound, ActivityType } from '../../../types';

// --------------------------------------------------------------------------
// 1. ÖNCE / SONRA (BeforeAfter)
// --------------------------------------------------------------------------

export const beforeAfterData: ConceptRound[] = [
    // 1. Dondurma
    { 
        id: 1, 
        question: "Önce hangisi olur?", 
        questionAudioKey: "q_which_is_before_person", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Dondurma önce bu haldedir.', wrong: 'Hayır, erimiş dondurma sonradır.' },
            en: { correct: 'Yes! The ice cream is like this before.', wrong: 'No, the melted ice cream is after.' },
            de: { correct: 'Ja! Das Eis ist vorher so.', wrong: 'Nein, das geschmolzene Eis ist danach.' },
            fr: { correct: "Oui ! La glace est comme ça avant.", wrong: "Non, la glace fondue est après." },
            nl: { correct: 'Ja! Het ijs is eerst zo.', wrong: 'Nee, het gesmolten ijs is later.' },
            az: { correct: 'Bəli! Dondurma əvvəl belədir.', wrong: 'Xeyr, ərimiş dondurma sonradır.' }
        },
        options: [
            { id: 63, word: "dondurma", imageUrl: "/images/63.png", isCorrect: true, audioKey: "dondurma", spokenText: "dondurma" },
            { id: 64, word: "dondurma", imageUrl: "/images/64.png", isCorrect: false, audioKey: "erimis_dondurma", spokenText: "erimiş dondurma" }
        ]
    },
    { 
        id: 2, 
        question: "Sonra hangisi olur?", 
        questionAudioKey: "q_which_is_after", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Erimiş dondurma sonradır.', wrong: 'Hayır, dondurma öncedir.' },
            en: { correct: 'Yes! The melted ice cream is after.', wrong: 'No, the ice cream is before.' },
            de: { correct: 'Ja! Das geschmolzene Eis ist danach.', wrong: 'Nein, das Eis ist vorher.' },
            fr: { correct: "Oui ! La glace fondue est après.", wrong: "Non, la glace est avant." },
            nl: { correct: 'Ja! Het gesmolten ijs is later.', wrong: 'Nee, het ijs is eerst.' },
            az: { correct: 'Bəli! Ərimiş dondurma sonradır.', wrong: 'Xeyr, dondurma əvvəldir.' }
        },
        options: [
            { id: 63, word: "dondurma", imageUrl: "/images/63.png", isCorrect: false, audioKey: "dondurma", spokenText: "dondurma" },
            { id: 64, word: "dondurma", imageUrl: "/images/64.png", isCorrect: true, audioKey: "erimis_dondurma", spokenText: "erimiş dondurma" }
        ]
    },

    // 2. Yumurta -> Civciv
    { 
        id: 3, 
        question: "Önce hangisi olur?", 
        questionAudioKey: "q_which_is_before", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Yumurta öncedir.', wrong: 'Hayır, civciv sonradır.' },
            en: { correct: 'Yes! The egg is before.', wrong: 'No, the chick is after.' },
            de: { correct: 'Ja! Das Ei ist vorher.', wrong: 'Nein, das Küken ist danach.' },
            fr: { correct: "Oui ! L'œuf est avant.", wrong: "Non, le poussin est après." },
            nl: { correct: 'Ja! Het ei is eerst.', wrong: 'Nee, het kuiken is later.' },
            az: { correct: 'Bəli! Yumurta əvvəldir.', wrong: 'Xeyr, cücə sonradır.' }
        },
        options: [
            { id: 77, word: "yumurta", imageUrl: "/images/77.png", isCorrect: true, audioKey: "kirik_yumurta", spokenText: "kırık yumurta" },
            { id: 376, word: "civciv", imageUrl: "/images/376.png", isCorrect: false, audioKey: "civciv", spokenText: "civciv" }
        ]
    },
    { 
        id: 4, 
        question: "Sonra hangisi olur?", 
        questionAudioKey: "q_which_is_after", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Civciv sonradır.', wrong: 'Hayır, yumurta öncedir.' },
            en: { correct: 'Yes! The chick is after.', wrong: 'No, the egg is before.' },
            de: { correct: 'Ja! Das Küken ist danach.', wrong: 'Nein, das Ei ist vorher.' },
            fr: { correct: "Oui ! Le poussin est après.", wrong: "Non, l'œuf est avant." },
            nl: { correct: 'Ja! Het kuiken is later.', wrong: 'Nee, het ei is eerst.' },
            az: { correct: 'Bəli! Cücə sonradır.', wrong: 'Xeyr, yumurta əvvəldir.' }
        },
        options: [
            { id: 77, word: "yumurta", imageUrl: "/images/77.png", isCorrect: false, audioKey: "kirik_yumurta", spokenText: "kırık yumurta" },
            { id: 376, word: "civciv", imageUrl: "/images/376.png", isCorrect: true, audioKey: "civciv", spokenText: "civciv" }
        ]
    },

    // 3. Tohum -> Filiz
    { 
        id: 5, 
        question: "Önce hangisi olur?", 
        questionAudioKey: "q_which_is_before", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Tohum öncedir.', wrong: 'Hayır, filiz sonradır.' },
            en: { correct: 'Yes! The seed is before.', wrong: 'No, the sprout is after.' },
            de: { correct: 'Ja! Der Samen ist vorher.', wrong: 'Nein, der Keimling ist danach.' },
            fr: { correct: "Oui ! La graine est avant.", wrong: "Non, la pousse est après." },
            nl: { correct: 'Ja! Het zaadje is eerst.', wrong: 'Nee, de scheut is later.' },
            az: { correct: 'Bəli! Toxum əvvəldir.', wrong: 'Xeyr, ting sonradır.' }
        },
        options: [
            { id: 316, word: "tohum", imageUrl: "/images/316.png", isCorrect: true, audioKey: "tohum", spokenText: "tohum" },
            { id: 317, word: "filiz", imageUrl: "/images/317.png", isCorrect: false, audioKey: "filiz", spokenText: "filiz" }
        ]
    },
    { 
        id: 6, 
        question: "Sonra hangisi olur?", 
        questionAudioKey: "q_which_is_after", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Filiz sonradır.', wrong: 'Hayır, tohum öncedir.' },
            en: { correct: 'Yes! The sprout is after.', wrong: 'No, the seed is before.' },
            de: { correct: 'Ja! Der Keimling ist danach.', wrong: 'Nein, der Samen ist vorher.' },
            fr: { correct: "Oui ! La pousse est après.", wrong: "Non, la graine est avant." },
            nl: { correct: 'Ja! De scheut is later.', wrong: 'Nee, het zaadje is eerst.' },
            az: { correct: 'Bəli! Ting sonradır.', wrong: 'Xeyr, toxum əvvəldir.' }
        },
        options: [
            { id: 316, word: "tohum", imageUrl: "/images/316.png", isCorrect: false, audioKey: "tohum", spokenText: "tohum" },
            { id: 317, word: "filiz", imageUrl: "/images/317.png", isCorrect: true, audioKey: "filiz", spokenText: "filiz" }
        ]
    },

    // 4. Hamur -> Ekmek
    { 
        id: 7, 
        question: "Önce hangisi olur?", 
        questionAudioKey: "q_which_is_before", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Hamur öncedir.', wrong: 'Hayır, ekmek sonradır.' },
            en: { correct: 'Yes! The dough is before.', wrong: 'No, the bread is after.' },
            de: { correct: 'Ja! Der Teig ist vorher.', wrong: 'Nein, das Brot ist danach.' },
            fr: { correct: "Oui ! La pâte est avant.", wrong: "Non, le pain est après." },
            nl: { correct: 'Ja! Het deeg is eerst.', wrong: 'Nee, het brood is later.' },
            az: { correct: 'Bəli! Xəmir əvvəldir.', wrong: 'Xeyr, çörək sonradır.' }
        },
        options: [
            { id: 588, word: "hamur", imageUrl: "/images/588.png", isCorrect: true, audioKey: "hamur", spokenText: "hamur" },
            { id: 112, word: "ekmek", imageUrl: "/images/112.png", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    { 
        id: 8, 
        question: "Sonra hangisi olur?", 
        questionAudioKey: "q_which_is_after", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Ekmek sonradır.', wrong: 'Hayır, hamur öncedir.' },
            en: { correct: 'Yes! The bread is after.', wrong: 'No, the dough is before.' },
            de: { correct: 'Ja! Das Brot ist danach.', wrong: 'Nein, der Teig ist vorher.' },
            fr: { correct: "Oui ! Le pain est après.", wrong: "Non, la pâte est avant." },
            nl: { correct: 'Ja! Het brood is later.', wrong: 'Nee, het deeg is eerst.' },
            az: { correct: 'Bəli! Çörək sonradır.', wrong: 'Xeyr, xəmir əvvəldir.' }
        },
        options: [
            { id: 588, word: "hamur", imageUrl: "/images/588.png", isCorrect: false, audioKey: "hamur", spokenText: "hamur" },
            { id: 112, word: "ekmek", imageUrl: "/images/112.png", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },

    // 5. Dağınık Oda -> Toplu Oda
    { 
        id: 9, 
        question: "Önce hangisi olur?", 
        questionAudioKey: "q_which_is_before", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Dağınık oda öncedir.', wrong: 'Hayır, toplu oda sonradır.' },
            en: { correct: 'Yes! The messy room is before.', wrong: 'No, the tidy room is after.' },
            de: { correct: 'Ja! Das unordentliche Zimmer ist vorher.', wrong: 'Nein, das ordentliche Zimmer ist danach.' },
            fr: { correct: "Oui ! La chambre en désordre est avant.", wrong: "Non, la chambre rangée est après." },
            nl: { correct: 'Ja! De rommelige kamer is eerst.', wrong: 'Nee, de nette kamer is later.' },
            az: { correct: 'Bəli! Dağınıq otaq əvvəldir.', wrong: 'Xeyr, səliqəli otaq sonradır.' }
        },
        options: [
            { id: 229, word: "oda", imageUrl: "/images/229.png", isCorrect: true, audioKey: "daginik_oda", spokenText: "dağınık oda" },
            { id: 230, word: "oda", imageUrl: "/images/230.png", isCorrect: false, audioKey: "toplu_oda", spokenText: "toplu oda" }
        ]
    },
    { 
        id: 10, 
        question: "Sonra hangisi olur?", 
        questionAudioKey: "q_which_is_after", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Toplu oda sonradır.', wrong: 'Hayır, dağınık oda öncedir.' },
            en: { correct: 'Yes! The tidy room is after.', wrong: 'No, the messy room is before.' },
            de: { correct: 'Ja! Das ordentliche Zimmer ist danach.', wrong: 'Nein, das unordentliche Zimmer ist vorher.' },
            fr: { correct: "Oui ! La chambre rangée est après.", wrong: "Non, la chambre en désordre est avant." },
            nl: { correct: 'Ja! De nette kamer is later.', wrong: 'Nee, de rommelige kamer is eerst.' },
            az: { correct: 'Bəli! Səliqəli otaq sonradır.', wrong: 'Xeyr, dağınıq otaq əvvəldir.' }
        },
        options: [
            { id: 229, word: "oda", imageUrl: "/images/229.png", isCorrect: false, audioKey: "daginik_oda", spokenText: "dağınık oda" },
            { id: 230, word: "oda", imageUrl: "/images/230.png", isCorrect: true, audioKey: "toplu_oda", spokenText: "toplu oda" }
        ]
    },

    // 6. Kirli El -> Temiz El
    { 
        id: 11, 
        question: "Önce hangisi olur?", 
        questionAudioKey: "q_which_is_before", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Kirli el öncedir.', wrong: 'Hayır, temiz el sonradır.' },
            en: { correct: 'Yes! The dirty hand is before.', wrong: 'No, the clean hand is after.' },
            de: { correct: 'Ja! Die schmutzige Hand ist vorher.', wrong: 'Nein, die saubere Hand ist danach.' },
            fr: { correct: "Oui ! La main sale est avant.", wrong: "Non, la main propre est après." },
            nl: { correct: 'Ja! De vuile hand is eerst.', wrong: 'Nee, de schone hand is later.' },
            az: { correct: 'Bəli! Çirkli əl əvvəldir.', wrong: 'Xeyr, təmiz əl sonradır.' }
        },
        options: [
            { id: 591, word: "el", imageUrl: "/images/591.png", isCorrect: true, audioKey: "kirli_el", spokenText: "kirli el" },
            { id: 590, word: "el", imageUrl: "/images/590.png", isCorrect: false, audioKey: "temiz_el", spokenText: "temiz el" }
        ]
    },
    { 
        id: 12, 
        question: "Sonra hangisi olur?", 
        questionAudioKey: "q_which_is_after", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Temiz el sonradır.', wrong: 'Hayır, kirli el öncedir.' },
            en: { correct: 'Yes! The clean hand is after.', wrong: 'No, the dirty hand is before.' },
            de: { correct: 'Ja! Die saubere Hand ist danach.', wrong: 'Nein, die schmutzige Hand ist vorher.' },
            fr: { correct: "Oui ! La main propre est après.", wrong: "Non, la main sale est avant." },
            nl: { correct: 'Ja! De schone hand is later.', wrong: 'Nee, de vuile hand is eerst.' },
            az: { correct: 'Bəli! Təmiz əl sonradır.', wrong: 'Xeyr, çirkli əl əvvəldir.' }
        },
        options: [
            { id: 591, word: "el", imageUrl: "/images/591.png", isCorrect: false, audioKey: "kirli_el", spokenText: "kirli el" },
            { id: 590, word: "el", imageUrl: "/images/590.png", isCorrect: true, audioKey: "temiz_el", spokenText: "temiz el" }
        ]
    },

    // 7. Ev Temeli -> Biten Ev
    { 
        id: 13, 
        question: "Önce hangisi olur?", 
        questionAudioKey: "q_which_is_before", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Temel öncedir.', wrong: 'Hayır, ev sonradır.' },
            en: { correct: 'Yes! The foundation is before.', wrong: 'No, the house is after.' },
            de: { correct: 'Ja! Das Fundament ist vorher.', wrong: 'Nein, das Haus ist danach.' },
            fr: { correct: "Oui ! La fondation est avant.", wrong: "Non, la maison est après." },
            nl: { correct: 'Ja! De fundering is eerst.', wrong: 'Nee, het huis is later.' },
            az: { correct: 'Bəli! Təməl əvvəldir.', wrong: 'Xeyr, ev sonradır.' }
        },
        options: [
            { id: 602, word: "temel", imageUrl: "/images/602.png", isCorrect: true, audioKey: "temel", spokenText: "temel" },
            { id: 601, word: "ev", imageUrl: "/images/601.png", isCorrect: false, audioKey: "ev", spokenText: "ev" }
        ]
    },
    { 
        id: 14, 
        question: "Sonra hangisi olur?", 
        questionAudioKey: "q_which_is_after", 
        activityType: ActivityType.BeforeAfter, 
        speech: {
            tr: { correct: 'Evet! Ev sonradır.', wrong: 'Hayır, temel öncedir.' },
            en: { correct: 'Yes! The house is after.', wrong: 'No, the foundation is before.' },
            de: { correct: 'Ja! Das Haus ist danach.', wrong: 'Nein, das Fundament ist vorher.' },
            fr: { correct: "Oui ! La maison est après.", wrong: "Non, la fondation est avant." },
            nl: { correct: 'Ja! Het huis is later.', wrong: 'Nee, de fundering is eerst.' },
            az: { correct: 'Bəli! Ev sonradır.', wrong: 'Xeyr, təməl əvvəldir.' }
        },
        options: [
            { id: 602, word: "temel", imageUrl: "/images/602.png", isCorrect: false, audioKey: "temel", spokenText: "temel" },
            { id: 601, word: "ev", imageUrl: "/images/601.png", isCorrect: true, audioKey: "ev", spokenText: "ev" }
        ]
    }
];

// --------------------------------------------------------------------------
// 2. GÜNDÜZ / GECE (DayNight)
// --------------------------------------------------------------------------

export const dayNightData: ConceptRound[] = [
    // 1. Güneş vs Ay
    { 
        id: 1, 
        question: "Gündüz olan hangisi?", 
        questionAudioKey: "q_which_is_day", 
        activityType: ActivityType.DayNight, 
        speech: {
            tr: { correct: 'Evet! Güneş gündüz çıkar.', wrong: 'Hayır, ay gece çıkar.' },
            en: { correct: 'Yes! The sun appears in the day.', wrong: 'No, the moon appears at night.' },
            de: { correct: 'Ja! Die Sonne scheint am Tag.', wrong: 'Nein, der Mond scheint in der Nacht.' },
            fr: { correct: "Oui ! Le soleil apparaît le jour.", wrong: "Non, la lune apparaît la nuit." },
            nl: { correct: 'Ja! De zon schijnt overdag.', wrong: 'Nee, de maan schijnt \'s nachts.' },
            az: { correct: 'Bəli! Günəş gündüz çıxır.', wrong: 'Xeyr, ay gecə çıxır.' }
        },
        options: [
            { id: 237, word: "güneş", imageUrl: "/images/237.png", isCorrect: true, audioKey: "gunes", spokenText: "güneş" },
            { id: 238, word: "ay", imageUrl: "/images/238.png", isCorrect: false, audioKey: "ay", spokenText: "ay" }
        ]
    },
    { 
        id: 2, 
        question: "Gece olan hangisi?", 
        questionAudioKey: "q_which_is_night", 
        activityType: ActivityType.DayNight, 
        speech: {
            tr: { correct: 'Evet! Ay gece çıkar.', wrong: 'Hayır, güneş gündüz çıkar.' },
            en: { correct: 'Yes! The moon appears at night.', wrong: 'No, the sun appears in the day.' },
            de: { correct: 'Ja! Der Mond scheint in der Nacht.', wrong: 'Nein, die Sonne scheint am Tag.' },
            fr: { correct: "Oui ! La lune apparaît la nuit.", wrong: "Non, le soleil apparaît le jour." },
            nl: { correct: 'Ja! De maan schijnt \'s nachts.', wrong: 'Nee, de zon schijnt overdag.' },
            az: { correct: 'Bəli! Ay gecə çıxır.', wrong: 'Xeyr, günəş gündüz çıxır.' }
        },
        options: [
            { id: 237, word: "güneş", imageUrl: "/images/237.png", isCorrect: false, audioKey: "gunes", spokenText: "güneş" },
            { id: 238, word: "ay", imageUrl: "/images/238.png", isCorrect: true, audioKey: "ay", spokenText: "ay" }
        ]
    },
    // 2. Manzara
    { 
        id: 3, 
        question: "Gündüz olan hangisi?", 
        questionAudioKey: "q_which_is_day", 
        activityType: ActivityType.DayNight, 
        speech: {
            tr: { correct: 'Evet! Bu gündüz manzarasıdır.', wrong: 'Hayır, bu gece manzarasıdır.' },
            en: { correct: 'Yes! This is a day scene.', wrong: 'No, this is a night scene.' },
            de: { correct: 'Ja! Das ist eine Tagesszene.', wrong: 'Nein, das ist eine Nachtszene.' },
            fr: { correct: "Oui ! C'est une scène de jour.", wrong: "Non, c'est une scène de nuit." },
            nl: { correct: 'Ja! Dit is een dagtafereel.', wrong: 'Nee, dit is een nachttafereel.' },
            az: { correct: 'Bəli! Bu gündüz mənzərəsidir.', wrong: 'Xeyr, bu gecə mənzərəsidir.' }
        },
        options: [
            { id: 11, word: "manzara", imageUrl: "/images/11.gif", isCorrect: true, audioKey: "manzara_gunduz", spokenText: "gündüz manzara" },
            { id: 12, word: "manzara", imageUrl: "/images/12.gif", isCorrect: false, audioKey: "manzara_gece", spokenText: "gece manzara" }
        ]
    },
    { 
        id: 4, 
        question: "Gece olan hangisi?", 
        questionAudioKey: "q_which_is_night", 
        activityType: ActivityType.DayNight, 
        speech: {
            tr: { correct: 'Evet! Bu gece manzarasıdır.', wrong: 'Hayır, bu gündüz manzarasıdır.' },
            en: { correct: 'Yes! This is a night scene.', wrong: 'No, this is a day scene.' },
            de: { correct: 'Ja! Das ist eine Nachtszene.', wrong: 'Nein, das ist eine Tagesszene.' },
            fr: { correct: "Oui ! C'est une scène de nuit.", wrong: "Non, c'est une scène de jour." },
            nl: { correct: 'Ja! Dit is een nachttafereel.', wrong: 'Nee, dit is een dagtafereel.' },
            az: { correct: 'Bəli! Bu gecə mənzərəsidir.', wrong: 'Xeyr, bu gündüz mənzərəsidir.' }
        },
        options: [
            { id: 11, word: "manzara", imageUrl: "/images/11.gif", isCorrect: false, audioKey: "manzara_gunduz", spokenText: "gündüz manzara" },
            { id: 12, word: "manzara", imageUrl: "/images/12.gif", isCorrect: true, audioKey: "manzara_gece", spokenText: "gece manzara" }
        ]
    },
    // 3. Gökyüzü
    { 
        id: 5, 
        question: "Gündüz olan hangisi?", 
        questionAudioKey: "q_which_is_day_person", 
        activityType: ActivityType.DayNight, 
        speech: {
            tr: { correct: 'Evet! Gündüz gökyüzü aydınlıktır.', wrong: 'Hayır, gece gökyüzü karanlıktır.' },
            en: { correct: 'Yes! The day sky is bright.', wrong: 'No, the night sky is dark.' },
            de: { correct: 'Ja! Der Taghimmel ist hell.', wrong: 'Nein, der Nachthimmel ist dunkel.' },
            fr: { correct: "Oui ! Le ciel diurne est lumineux.", wrong: "Non, le ciel nocturne est sombre." },
            nl: { correct: 'Ja! De daglucht is helder.', wrong: 'Nee, de nachtlucht is donker.' },
            az: { correct: 'Bəli! Gündüz səması işıqlıdır.', wrong: 'Xeyr, gecə səması qaranlıqdır.' }
        },
        options: [
            { id: 604, word: "gökyüzü", imageUrl: "/images/604.png", isCorrect: true, audioKey: "gokyuzu_gunduz", spokenText: "gündüz gökyüzü" },
            { id: 603, word: "gökyüzü", imageUrl: "/images/603.png", isCorrect: false, audioKey: "gokyuzu_gece", spokenText: "gece gökyüzü" }
        ]
    },
    { 
        id: 6, 
        question: "Gece olan hangisi?", 
        questionAudioKey: "q_which_is_night", 
        activityType: ActivityType.DayNight, 
        speech: {
            tr: { correct: 'Evet! Gece gökyüzü karanlıktır.', wrong: 'Hayır, gündüz gökyüzü aydınlıktır.' },
            en: { correct: 'Yes! The night sky is dark.', wrong: 'No, the day sky is bright.' },
            de: { correct: 'Ja! Der Nachthimmel ist dunkel.', wrong: 'Nein, der Taghimmel ist hell.' },
            fr: { correct: "Oui ! Le ciel nocturne est sombre.", wrong: "Non, le ciel diurne est lumineux." },
            nl: { correct: 'Ja! De nachtlucht is donker.', wrong: 'Nee, de daglucht is helder.' },
            az: { correct: 'Bəli! Gecə səması qaranlıqdır.', wrong: 'Xeyr, gündüz səması işıqlıdır.' }
        },
        options: [
            { id: 604, word: "gökyüzü", imageUrl: "/images/604.png", isCorrect: false, audioKey: "gokyuzu_gunduz", spokenText: "gündüz gökyüzü" },
            { id: 603, word: "gökyüzü", imageUrl: "/images/603.png", isCorrect: true, audioKey: "gokyuzu_gece", spokenText: "gece gökyüzü" }
        ]
    },
    // 4. Horoz vs Baykuş
    { 
        id: 7, 
        question: "Gündüz olan hangisi?", 
        questionAudioKey: "q_which_is_day", 
        activityType: ActivityType.DayNight, 
        speech: {
            tr: { correct: 'Evet! Horoz gündüz öter.', wrong: 'Hayır, baykuş gece uyanıktır.' },
            en: { correct: 'Yes! The rooster crows in the day.', wrong: 'No, the owl is awake at night.' },
            de: { correct: 'Ja! Der Hahn kräht am Tag.', wrong: 'Nein, die Eule ist nachts wach.' },
            fr: { correct: "Oui ! Le coq chante le jour.", wrong: "Non, la chouette est éveillée la nuit." },
            nl: { correct: 'Ja! De haan kraait overdag.', wrong: 'Nee, de uil is \'s nachts wakker.' },
            az: { correct: 'Bəli! Xoruz gündüz banlayır.', wrong: 'Xeyr, bayquş gecə oyaqdır.' }
        },
        options: [
            { id: 102, word: "horoz", imageUrl: "/images/102.png", isCorrect: true, audioKey: "horoz", spokenText: "horoz" },
            { id: 103, word: "baykuş", imageUrl: "/images/103.png", isCorrect: false, audioKey: "baykus", spokenText: "baykuş" }
        ]
    },
    { 
        id: 8, 
        question: "Gece olan hangisi?", 
        questionAudioKey: "q_which_is_night", 
        activityType: ActivityType.DayNight, 
        speech: {
            tr: { correct: 'Evet! Baykuş gece uyanıktır.', wrong: 'Hayır, horoz gündüz öter.' },
            en: { correct: 'Yes! The owl is awake at night.', wrong: 'No, the rooster crows in the day.' },
            de: { correct: 'Ja! Die Eule ist nachts wach.', wrong: 'Nein, der Hahn kräht am Tag.' },
            fr: { correct: "Oui ! La chouette est éveillée la nuit.", wrong: "Non, le coq chante le jour." },
            nl: { correct: 'Ja! De uil is \'s nachts wakker.', wrong: 'Nee, de haan kraait overdag.' },
            az: { correct: 'Bəli! Bayquş gecə oyaqdır.', wrong: 'Xeyr, xoruz gündüz banlayır.' }
        },
        options: [
            { id: 102, word: "horoz", imageUrl: "/images/102.png", isCorrect: false, audioKey: "horoz", spokenText: "horoz" },
            { id: 103, word: "baykuş", imageUrl: "/images/103.png", isCorrect: true, audioKey: "baykus", spokenText: "baykuş" }
        ]
    },
    // 5. Pencere
    { 
        id: 9, 
        question: "Gündüz olan hangisi?", 
        questionAudioKey: "q_which_is_day", 
        activityType: ActivityType.DayNight, 
        speech: {
            tr: { correct: 'Evet! Gündüz dışarısı aydınlıktır.', wrong: 'Hayır, gece dışarısı karanlıktır.' },
            en: { correct: 'Yes! It is bright outside in the day.', wrong: 'No, it is dark outside at night.' },
            de: { correct: 'Ja! Draußen ist es am Tag hell.', wrong: 'Nein, draußen ist es nachts dunkel.' },
            fr: { correct: "Oui ! Il fait clair dehors le jour.", wrong: "Non, il fait nuit dehors la nuit." },
            nl: { correct: 'Ja! Het is licht buiten overdag.', wrong: 'Nee, het is donker buiten \'s nachts.' },
            az: { correct: 'Bəli! Gündüz çöl işıqlıdır.', wrong: 'Xeyr, gecə çöl qaranlıqdır.' }
        },
        options: [
            { id: 81, word: "pencere", imageUrl: "/images/81.png", isCorrect: true, audioKey: "pencere_gunduz", spokenText: "gündüz" },
            { id: 83, word: "pencere", imageUrl: "/images/83.png", isCorrect: false, audioKey: "pencere_gece", spokenText: "gece" }
        ]
    },
    { 
        id: 10, 
        question: "Gece olan hangisi?", 
        questionAudioKey: "q_which_is_night", 
        activityType: ActivityType.DayNight, 
        speech: {
            tr: { correct: 'Evet! Gece dışarısı karanlıktır.', wrong: 'Hayır, gündüz dışarısı aydınlıktır.' },
            en: { correct: 'Yes! It is dark outside at night.', wrong: 'No, it is bright outside in the day.' },
            de: { correct: 'Ja! Draußen ist es nachts dunkel.', wrong: 'Nein, draußen ist es am Tag hell.' },
            fr: { correct: "Oui ! Il fait nuit dehors la nuit.", wrong: "Non, il fait clair dehors le jour." },
            nl: { correct: 'Ja! Het is donker buiten \'s nachts.', wrong: 'Nee, het is licht buiten overdag.' },
            az: { correct: 'Bəli! Gecə çöl qaranlıqdır.', wrong: 'Xeyr, gündüz çöl işıqlıdır.' }
        },
        options: [
            { id: 81, word: "pencere", imageUrl: "/images/81.png", isCorrect: false, audioKey: "pencere_gunduz", spokenText: "gündüz" },
            { id: 83, word: "pencere", imageUrl: "/images/83.png", isCorrect: true, audioKey: "pencere_gece", spokenText: "gece" }
        ]
    },
    // 6. Park
    { 
        id: 11, 
        question: "Gündüz olan hangisi?", 
        questionAudioKey: "q_which_is_day", 
        activityType: ActivityType.DayNight, 
        speech: {
            tr: { correct: 'Evet! Gündüz parkta oynarız.', wrong: 'Hayır, gece park karanlıktır.' },
            en: { correct: 'Yes! We play in the park during the day.', wrong: 'No, the park is dark at night.' },
            de: { correct: 'Ja! Wir spielen tagsüber im Park.', wrong: 'Nein, der Park ist nachts dunkel.' },
            fr: { correct: "Oui ! Nous jouons au parc le jour.", wrong: "Non, le parc est sombre la nuit." },
            nl: { correct: 'Ja! We spelen overdag in het park.', wrong: 'Nee, het park is \'s nachts donker.' },
            az: { correct: 'Bəli! Biz gündüz parkda oynayırıq.', wrong: 'Xeyr, gecə park qaranlıqdır.' }
        },
        options: [
            { id: 505, word: "çocuk parkı", imageUrl: "/images/505.png", isCorrect: true, audioKey: "cocuk_parki_gunduz", spokenText: "gündüz park" },
            { id: 506, word: "çocuk parkı", imageUrl: "/images/506.png", isCorrect: false, audioKey: "cocuk_parki_gece", spokenText: "gece park" }
        ]
    },
    { 
        id: 12, 
        question: "Gece olan hangisi?", 
        questionAudioKey: "q_which_is_night", 
        activityType: ActivityType.DayNight, 
        speech: {
            tr: { correct: 'Evet! Gece park karanlıktır.', wrong: 'Hayır, gündüz parkta oynarız.' },
            en: { correct: 'Yes! The park is dark at night.', wrong: 'No, we play in the park during the day.' },
            de: { correct: 'Ja! Der Park ist nachts dunkel.', wrong: 'Nein, wir spielen tagsüber im Park.' },
            fr: { correct: "Oui ! Le parc est sombre la nuit.", wrong: "Non, nous jouons au parc le jour." },
            nl: { correct: 'Ja! Het park is \'s nachts donker.', wrong: 'Nee, we spelen overdag in het park.' },
            az: { correct: 'Bəli! Gecə park qaranlıqdır.', wrong: 'Xeyr, biz gündüz parkda oynayırıq.' }
        },
        options: [
            { id: 505, word: "çocuk parkı", imageUrl: "/images/505.png", isCorrect: false, audioKey: "cocuk_parki_gunduz", spokenText: "gündüz park" },
            { id: 506, word: "çocuk parkı", imageUrl: "/images/506.png", isCorrect: true, audioKey: "cocuk_parki_gece", spokenText: "gece park" }
        ]
    },
];

// --------------------------------------------------------------------------
// 3. HIZLI / YAVAŞ (FastSlow)
// --------------------------------------------------------------------------

export const fastSlowData: ConceptRound[] = [
    // 1. Tavşan vs Kaplumbağa
    { 
        id: 1, 
        question: "Hızlı olan hangisi?", 
        questionAudioKey: "q_which_is_fast", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Tavşan hızlıdır.', wrong: 'Hayır, kaplumbağa yavaştır.' },
            en: { correct: 'Yes! The rabbit is fast.', wrong: 'No, the turtle is slow.' },
            de: { correct: 'Ja! Der Hase ist schnell.', wrong: 'Nein, die Schildkröte ist langsam.' },
            fr: { correct: "Oui ! Le lapin est rapide.", wrong: "Non, la tortue est lente." },
            nl: { correct: 'Ja! Het konijn is snel.', wrong: 'Nee, de schildpad is langzaam.' },
            az: { correct: 'Bəli! Dovşan sürətlidir.', wrong: 'Xeyr, tısbağa yavaşdır.' }
        },
        options: [
            { id: 41, word: "tavşan", imageUrl: "/images/41.gif", isCorrect: true, audioKey: "tavsan", spokenText: "tavşan" },
            { id: 42, word: "kaplumbağa", imageUrl: "/images/42.gif", isCorrect: false, audioKey: "kaplumbaga", spokenText: "kaplumbağa" }
        ]
    },
    { 
        id: 2, 
        question: "Yavaş olan hangisi?", 
        questionAudioKey: "q_which_is_slow", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Kaplumbağa yavaştır.', wrong: 'Hayır, tavşan hızlıdır.' },
            en: { correct: 'Yes! The turtle is slow.', wrong: 'No, the rabbit is fast.' },
            de: { correct: 'Ja! Die Schildkröte ist langsam.', wrong: 'Nein, der Hase ist schnell.' },
            fr: { correct: "Oui ! La tortue est lente.", wrong: "Non, le lapin est rapide." },
            nl: { correct: 'Ja! De schildpad is langzaam.', wrong: 'Nee, het konijn is snel.' },
            az: { correct: 'Bəli! Tısbağa yavaşdır.', wrong: 'Xeyr, dovşan sürətlidir.' }
        },
        options: [
            { id: 41, word: "tavşan", imageUrl: "/images/41.gif", isCorrect: false, audioKey: "tavsan", spokenText: "tavşan" },
            { id: 42, word: "kaplumbağa", imageUrl: "/images/42.gif", isCorrect: true, audioKey: "kaplumbaga", spokenText: "kaplumbağa" }
        ]
    },
    // 2. Çita vs Salyangoz
    { 
        id: 3, 
        question: "Hızlı olan hangisi?", 
        questionAudioKey: "q_which_is_fast", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Çita hızlıdır.', wrong: 'Hayır, salyangoz yavaştır.' },
            en: { correct: 'Yes! The cheetah is fast.', wrong: 'No, the snail is slow.' },
            de: { correct: 'Ja! Der Gepard ist schnell.', wrong: 'Nein, die Schnecke ist langsam.' },
            fr: { correct: "Oui ! Le guépard est rapide.", wrong: "Non, l'escargot est lent." },
            nl: { correct: 'Ja! De jachtluipaard is snel.', wrong: 'Nee, de slak is langzaam.' },
            az: { correct: 'Bəli! Hepard sürətlidir.', wrong: 'Xeyr, ilbiz yavaşdır.' }
        },
        options: [
            { id: 145, word: "çita", imageUrl: "/images/145.gif", isCorrect: true, audioKey: "cita", spokenText: "çita" },
            { id: 222, word: "salyangoz", imageUrl: "/images/222.gif", isCorrect: false, audioKey: "salyangoz", spokenText: "salyangoz" }
        ]
    },
    { 
        id: 4, 
        question: "Yavaş olan hangisi?", 
        questionAudioKey: "q_which_is_slow", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Salyangoz yavaştır.', wrong: 'Hayır, çita hızlıdır.' },
            en: { correct: 'Yes! The snail is slow.', wrong: 'No, the cheetah is fast.' },
            de: { correct: 'Ja! Die Schnecke ist langsam.', wrong: 'Nein, der Gepard ist schnell.' },
            fr: { correct: "Oui ! L'escargot est lent.", wrong: "Non, le guépard est rapide." },
            nl: { correct: 'Ja! De slak is langzaam.', wrong: 'Nee, de jachtluipaard is snel.' },
            az: { correct: 'Bəli! İlbiz yavaşdır.', wrong: 'Xeyr, hepard sürətlidir.' }
        },
        options: [
            { id: 145, word: "çita", imageUrl: "/images/145.gif", isCorrect: false, audioKey: "cita", spokenText: "çita" },
            { id: 222, word: "salyangoz", imageUrl: "/images/222.gif", isCorrect: true, audioKey: "salyangoz", spokenText: "salyangoz" }
        ]
    },
    // 3. Roket vs Sandal
    { 
        id: 5, 
        question: "Hızlı olan hangisi?", 
        questionAudioKey: "q_which_is_fast", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Roket hızlıdır.', wrong: 'Hayır, sandal yavaştır.' },
            en: { correct: 'Yes! The rocket is fast.', wrong: 'No, the rowboat is slow.' },
            de: { correct: 'Ja! Die Rakete ist schnell.', wrong: 'Nein, das Ruderboot ist langsam.' },
            fr: { correct: "Oui ! La fusée est rapide.", wrong: "Non, la barque est lente." },
            nl: { correct: 'Ja! De raket is snel.', wrong: 'Nee, de roeiboot is langzaam.' },
            az: { correct: 'Bəli! Raket sürətlidir.', wrong: 'Xeyr, qayıq yavaşdır.' }
        },
        options: [
            { id: 204, word: "roket", imageUrl: "/images/204.png", isCorrect: true, audioKey: "roket", spokenText: "roket" },
            { id: 493, word: "sandal", imageUrl: "/images/493.png", isCorrect: false, audioKey: "sandal", spokenText: "sandal" }
        ]
    },
    { 
        id: 6, 
        question: "Yavaş olan hangisi?", 
        questionAudioKey: "q_which_is_slow", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Sandal yavaştır.', wrong: 'Hayır, roket hızlıdır.' },
            en: { correct: 'Yes! The rowboat is slow.', wrong: 'No, the rocket is fast.' },
            de: { correct: 'Ja! Das Ruderboot ist langsam.', wrong: 'Nein, die Rakete ist schnell.' },
            fr: { correct: "Oui ! La barque est lente.", wrong: "Non, la fusée est rapide." },
            nl: { correct: 'Ja! De roeiboot is langzaam.', wrong: 'Nee, de raket is snel.' },
            az: { correct: 'Bəli! Qayıq yavaşdır.', wrong: 'Xeyr, raket sürətlidir.' }
        },
        options: [
            { id: 204, word: "roket", imageUrl: "/images/204.png", isCorrect: false, audioKey: "roket", spokenText: "roket" },
            { id: 493, word: "sandal", imageUrl: "/images/493.png", isCorrect: true, audioKey: "sandal", spokenText: "sandal" }
        ]
    },
    // 4. Bisikletler
    { 
        id: 7, 
        question: "Hızlı olan hangisi?", 
        questionAudioKey: "q_which_is_fast", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Bu bisiklet hızlıdır.', wrong: 'Hayır, bu bisiklet yavaştır.' },
            en: { correct: 'Yes! This bicycle is fast.', wrong: 'No, this bicycle is slow.' },
            de: { correct: 'Ja! Dieses Fahrrad ist schnell.', wrong: 'Nein, dieses Fahrrad ist langsam.' },
            fr: { correct: "Oui ! Ce vélo est rapide.", wrong: "Non, ce vélo est lent." },
            nl: { correct: 'Ja! Deze fiets is snel.', wrong: 'Nee, deze fiets is langzaam.' },
            az: { correct: 'Bəli! Bu velosiped sürətlidir.', wrong: 'Xeyr, bu velosiped yavaşdır.' }
        },
        options: [
            { id: 910, word: "bisiklet", imageUrl: "/images/910.gif", isCorrect: true, audioKey: "hizli_bisiklet", spokenText: "hızlı bisiklet" },
            { id: 907, word: "bisiklet", imageUrl: "/images/907.gif", isCorrect: false, audioKey: "yavas_bisiklet", spokenText: "yavaş bisiklet" }
        ]
    },
    { 
        id: 8, 
        question: "Yavaş olan hangisi?", 
        questionAudioKey: "q_which_is_slow", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Bu bisiklet yavaştır.', wrong: 'Hayır, bu bisiklet hızlıdır.' },
            en: { correct: 'Yes! This bicycle is slow.', wrong: 'No, this bicycle is fast.' },
            de: { correct: 'Ja! Dieses Fahrrad ist langsam.', wrong: 'Nein, dieses Fahrrad ist schnell.' },
            fr: { correct: "Oui ! Ce vélo est lent.", wrong: "Non, ce vélo est rapide." },
            nl: { correct: 'Ja! Deze fiets is langzaam.', wrong: 'Nee, deze fiets is snel.' },
            az: { correct: 'Bəli! Bu velosiped yavaşdır.', wrong: 'Xeyr, bu velosiped sürətlidir.' }
        },
        options: [
            { id: 910, word: "bisiklet", imageUrl: "/images/910.gif", isCorrect: false, audioKey: "hizli_bisiklet", spokenText: "hızlı bisiklet" },
            { id: 907, word: "bisiklet", imageUrl: "/images/907.gif", isCorrect: true, audioKey: "yavas_bisiklet", spokenText: "yavaş bisiklet" }
        ]
    },
    // 5. Gergedan vs Deve
    { 
        id: 9, 
        question: "Hızlı olan hangisi?", 
        questionAudioKey: "q_which_is_fast", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Gergedan hızlıdır.', wrong: 'Hayır, deve yavaştır.' },
            en: { correct: 'Yes! The rhino is fast.', wrong: 'No, the camel is slow.' },
            de: { correct: 'Ja! Das Nashorn ist schnell.', wrong: 'Nein, das Kamel ist langsam.' },
            fr: { correct: "Oui ! Le rhinocéros est rapide.", wrong: "Non, le chameau est lent." },
            nl: { correct: 'Ja! De neushoorn is snel.', wrong: 'Nee, de kameel is langzaam.' },
            az: { correct: 'Bəli! Kərgədan sürətlidir.', wrong: 'Xeyr, dəvə yavaşdır.' }
        },
        options: [
            { id: 908, word: "gergedan", imageUrl: "/images/908.gif", isCorrect: true, audioKey: "gergedan", spokenText: "gergedan" },
            { id: 909, word: "deve", imageUrl: "/images/909.gif", isCorrect: false, audioKey: "deve", spokenText: "deve" }
        ]
    },
    { 
        id: 10, 
        question: "Yavaş olan hangisi?", 
        questionAudioKey: "q_which_is_slow", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Deve yavaştır.', wrong: 'Hayır, gergedan hızlıdır.' },
            en: { correct: 'Yes! The camel is slow.', wrong: 'No, the rhino is fast.' },
            de: { correct: 'Ja! Das Kamel ist langsam.', wrong: 'Nein, das Nashorn ist schnell.' },
            fr: { correct: "Oui ! Le chameau est lent.", wrong: "Non, le rhinocéros est rapide." },
            nl: { correct: 'Ja! De kameel is langzaam.', wrong: 'Nee, de neushoorn is snel.' },
            az: { correct: 'Bəli! Dəvə yavaşdır.', wrong: 'Xeyr, kərgədan sürətlidir.' }
        },
        options: [
            { id: 908, word: "gergedan", imageUrl: "/images/908.gif", isCorrect: false, audioKey: "gergedan", spokenText: "gergedan" },
            { id: 909, word: "deve", imageUrl: "/images/909.gif", isCorrect: true, audioKey: "deve", spokenText: "deve" }
        ]
    },
    // 6. Arabalar
    { 
        id: 11, 
        question: "Hızlı olan hangisi?", 
        questionAudioKey: "q_which_is_fast", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Bu araba hızlıdır.', wrong: 'Hayır, bu araba yavaştır.' },
            en: { correct: 'Yes! This car is fast.', wrong: 'No, this car is slow.' },
            de: { correct: 'Ja! Dieses Auto ist schnell.', wrong: 'Nein, dieses Auto ist langsam.' },
            fr: { correct: "Oui ! Cette voiture est rapide.", wrong: "Non, cette voiture est lente." },
            nl: { correct: 'Ja! Deze auto is snel.', wrong: 'Nee, deze auto is langzaam.' },
            az: { correct: 'Bəli! Bu maşın sürətlidir.', wrong: 'Xeyr, bu maşın yavaşdır.' }
        },
        options: [
            { id: 912, word: "araba", imageUrl: "/images/912.gif", isCorrect: true, audioKey: "hizli_araba", spokenText: "hızlı araba" },
            { id: 911, word: "araba", imageUrl: "/images/911.gif", isCorrect: false, audioKey: "yavas_araba", spokenText: "yavaş araba" }
        ]
    },
    { 
        id: 12, 
        question: "Yavaş olan hangisi?", 
        questionAudioKey: "q_which_is_slow", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Bu araba yavaştır.', wrong: 'Hayır, bu araba hızlıdır.' },
            en: { correct: 'Yes! This car is slow.', wrong: 'No, this car is fast.' },
            de: { correct: 'Ja! Dieses Auto ist langsam.', wrong: 'Nein, dieses Auto ist schnell.' },
            fr: { correct: "Oui ! Cette voiture est lente.", wrong: "Non, cette voiture est rapide." },
            nl: { correct: 'Ja! Deze auto is langzaam.', wrong: 'Nee, deze auto is snel.' },
            az: { correct: 'Bəli! Bu maşın yavaşdır.', wrong: 'Xeyr, bu maşın sürətlidir.' }
        },
        options: [
            { id: 912, word: "araba", imageUrl: "/images/912.gif", isCorrect: false, audioKey: "hizli_araba", spokenText: "hızlı araba" },
            { id: 911, word: "araba", imageUrl: "/images/911.gif", isCorrect: true, audioKey: "yavas_araba", spokenText: "yavaş araba" }
        ]
    },
    // 7. Trenler
    { 
        id: 13, 
        question: "Hızlı olan hangisi?", 
        questionAudioKey: "q_which_is_fast", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Bu tren hızlıdır.', wrong: 'Hayır, bu tren yavaştır.' },
            en: { correct: 'Yes! This train is fast.', wrong: 'No, this train is slow.' },
            de: { correct: 'Ja! Dieser Zug ist schnell.', wrong: 'Nein, dieser Zug ist langsam.' },
            fr: { correct: "Oui ! Ce train est rapide.", wrong: "Non, ce train est lent." },
            nl: { correct: 'Ja! Deze trein is snel.', wrong: 'Nee, deze trein is langzaam.' },
            az: { correct: 'Bəli! Bu qatar sürətlidir.', wrong: 'Xeyr, bu qatar yavaşdır.' }
        },
        options: [
            { id: 914, word: "tren", imageUrl: "/images/914.gif", isCorrect: true, audioKey: "hizli_tren", spokenText: "hızlı tren" },
            { id: 913, word: "tren", imageUrl: "/images/913.gif", isCorrect: false, audioKey: "yavas_tren", spokenText: "yavaş tren" }
        ]
    },
    { 
        id: 14, 
        question: "Yavaş olan hangisi?", 
        questionAudioKey: "q_which_is_slow", 
        activityType: ActivityType.FastSlow, 
        speech: {
            tr: { correct: 'Evet! Bu tren yavaştır.', wrong: 'Hayır, bu tren hızlıdır.' },
            en: { correct: 'Yes! This train is slow.', wrong: 'No, this train is fast.' },
            de: { correct: 'Ja! Dieser Zug ist langsam.', wrong: 'Nein, dieser Zug ist schnell.' },
            fr: { correct: "Oui ! Ce train est lent.", wrong: "Non, ce train est rapide." },
            nl: { correct: 'Ja! Deze trein is langzaam.', wrong: 'Nee, deze trein is snel.' },
            az: { correct: 'Bəli! Bu qatar yavaşdır.', wrong: 'Xeyr, bu qatar sürətlidir.' }
        },
        options: [
            { id: 914, word: "tren", imageUrl: "/images/914.gif", isCorrect: false, audioKey: "hizli_tren", spokenText: "hızlı tren" },
            { id: 913, word: "tren", imageUrl: "/images/913.gif", isCorrect: true, audioKey: "yavas_tren", spokenText: "yavaş tren" }
        ]
    },
];