import { ConceptRound, ActivityType } from '../../../../types';

export const betweenData: ConceptRound[] = [
    // ----------------------------------------------------------------------
    // 1. Top - Bloklar (22-632)
    // ----------------------------------------------------------------------
    {
        id: 1,
        question: "Blokların arasında olan hangisi?",
        questionAudioKey: "q_which_is_between",
        activityType: ActivityType.Between,
        speech: {
            tr: { correct: 'Evet! Top blokların arasındadır.', wrong: 'Hayır, top yandadır.' },
            en: { correct: 'Yes! The ball is between the blocks.', wrong: 'No, the ball is on the side.' },
            de: { correct: 'Ja! Der Ball ist zwischen den Blöcken.', wrong: 'Nein, der Ball ist an der Seite.' },
            fr: { correct: "Oui ! La balle est entre les blocs.", wrong: "Non, la balle est sur le côté." },
            nl: { correct: 'Ja! De bal is tussen de blokken.', wrong: 'Nee, de bal is aan de zijkant.' },
            az: { correct: 'Bəli! Top blokların arasındadır.', wrong: 'Xeyr, top yanındadır.' }
        },
        options: [
            { id: 22, word: "top", imageUrl: "/images/22.png", isCorrect: true, audioKey: "top_arasinda", spokenText: "arasında" },
            { id: 632, word: "top", imageUrl: "/images/632.png", isCorrect: false, audioKey: "top_yanda", spokenText: "yanda" }
        ]
    },

    // ----------------------------------------------------------------------
    // 2. Araba - Binalar (456-457)
    // ----------------------------------------------------------------------
    {
        id: 2,
        question: "Binaların arasında olan hangisi?",
        questionAudioKey: "q_which_is_between",
        activityType: ActivityType.Between,
        speech: {
            tr: { correct: 'Evet! Araba binaların arasındadır.', wrong: 'Hayır, araba yandadır.' },
            en: { correct: 'Yes! The car is between the buildings.', wrong: 'No, the car is on the side.' },
            de: { correct: 'Ja! Das Auto ist zwischen den Gebäuden.', wrong: 'Nein, das Auto ist an der Seite.' },
            fr: { correct: "Oui ! La voiture est entre les bâtiments.", wrong: "Non, la voiture est sur le côté." },
            nl: { correct: 'Ja! De auto is tussen de gebouwen.', wrong: 'Nee, de auto is aan de zijkant.' },
            az: { correct: 'Bəli! Maşın binaların arasındadır.', wrong: 'Xeyr, maşın yanındadır.' }
        },
        options: [
            { id: 456, word: "araba", imageUrl: "/images/456.png", isCorrect: true, audioKey: "araba_arasinda", spokenText: "arasında" },
            { id: 457, word: "araba", imageUrl: "/images/457.png", isCorrect: false, audioKey: "araba_yanda", spokenText: "yanda" }
        ]
    },

    // ----------------------------------------------------------------------
    // 3. Çocuk - Anne/Baba (476-477)
    // ----------------------------------------------------------------------
    {
        id: 3,
        question: "Annesiyle babasının arasında olan hangisi?",
        questionAudioKey: "q_which_is_between",
        activityType: ActivityType.Between,
        speech: {
            tr: { correct: 'Evet! Çocuk annesiyle babasının arasındadır.', wrong: 'Hayır, çocuk yandadır.' },
            en: { correct: 'Yes! The child is between the parents.', wrong: 'No, the child is on the side.' },
            de: { correct: 'Ja! Das Kind ist zwischen den Eltern.', wrong: 'Nein, das Kind ist an der Seite.' },
            fr: { correct: "Oui ! L'enfant est entre ses parents.", wrong: "Non, l'enfant est sur le côté." },
            nl: { correct: 'Ja! Het kind is tussen de ouders.', wrong: 'Nee, het kind is aan de zijkant.' },
            az: { correct: 'Bəli! Uşaq valideynlərinin arasındadır.', wrong: 'Xeyr, uşaq yanındadır.' }
        },
        options: [
            { id: 476, word: "çocuk", imageUrl: "/images/476.png", isCorrect: true, audioKey: "cocuk_arasinda", spokenText: "arasında" },
            { id: 477, word: "çocuk", imageUrl: "/images/477.png", isCorrect: false, audioKey: "cocuk_yanda", spokenText: "yanda" }
        ]
    },

    // ----------------------------------------------------------------------
    // 4. Sandviç (623-624)
    // ----------------------------------------------------------------------
    {
        id: 4,
        question: "Ekmeklerin arasında olan hangisi?",
        questionAudioKey: "q_which_is_between",
        activityType: ActivityType.Between,
        speech: {
            tr: { correct: 'Evet! Malzemeler ekmeklerin arasındadır.', wrong: 'Hayır, malzemeler yandadır.' },
            en: { correct: 'Yes! The ingredients are between the bread.', wrong: 'No, the ingredients are on the side.' },
            de: { correct: 'Ja! Die Zutaten sind zwischen dem Brot.', wrong: 'Nein, die Zutaten sind an der Seite.' },
            fr: { correct: "Oui ! Les ingrédients sont entre les pains.", wrong: "Non, les ingrédients sont sur le côté." },
            nl: { correct: 'Ja! De ingrediënten zijn tussen het brood.', wrong: 'Nee, de ingrediënten zijn aan de zijkant.' },
            az: { correct: 'Bəli! Ərzaqlar çörəklərin arasındadır.', wrong: 'Xeyr, ərzaqlar yanındadır.' }
        },
        options: [
            { id: 623, word: "sandviç", imageUrl: "/images/623.png", isCorrect: true, audioKey: "sandvic_arasinda", spokenText: "arasında" },
            { id: 624, word: "sandviç malzemeleri", imageUrl: "/images/624.png", isCorrect: false, audioKey: "sandvic_malzemeleri_yanda", spokenText: "yanda" }
        ]
    }
];