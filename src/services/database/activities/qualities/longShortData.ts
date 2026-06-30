import { ConceptRound, ActivityType } from '../../../../types';

export const longShortData: ConceptRound[] = [
    // 1. Zürafa vs Fare
    { 
        id: 245, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long_person", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Zürafa uzundur.', wrong: 'Hayır, fare kısadır.' },
            en: { correct: 'Yes! The giraffe is tall.', wrong: 'No, the mouse is short.' },
            de: { correct: 'Ja! Die Giraffe ist groß.', wrong: 'Nein, die Maus ist klein.' },
            fr: { correct: "Oui ! La girafe est grande.", wrong: "Non, la souris est petite." },
            nl: { correct: 'Ja! De giraf is lang.', wrong: 'Nee, de muis is kort.' },
            az: { correct: 'Bəli! Zürafə uzundur.', wrong: 'Xeyr, siçan qısadır.' }
        },
        options: [
            { id: 101, word: "zürafa", imageUrl: "/images/101.png", isCorrect: true, audioKey: "zurafa", spokenText: "zürafa" },
            { id: 29, word: "fare", imageUrl: "/images/29.png", isCorrect: false, audioKey: "fare", spokenText: "fare" }
        ]
    },
    { 
        id: 246, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Fare kısadır.', wrong: 'Hayır, zürafa uzundur.' },
            en: { correct: 'Yes! The mouse is short.', wrong: 'No, the giraffe is tall.' },
            de: { correct: 'Ja! Die Maus ist klein.', wrong: 'Nein, die Giraffe ist groß.' },
            fr: { correct: "Oui ! La souris est petite.", wrong: "Non, la girafe est grande." },
            nl: { correct: 'Ja! De muis is kort.', wrong: 'Nee, de giraf is lang.' },
            az: { correct: 'Bəli! Siçan qısadır.', wrong: 'Xeyr, zürafə uzundur.' }
        },
        options: [
            { id: 101, word: "zürafa", imageUrl: "/images/101.png", isCorrect: false, audioKey: "zurafa", spokenText: "zürafa" },
            { id: 29, word: "fare", imageUrl: "/images/29.png", isCorrect: true, audioKey: "fare", spokenText: "fare" }
        ]
    },

    // 2. Pantolon vs Şort
    { 
        id: 247, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Pantolon uzundur.', wrong: 'Hayır, şort kısadır.' },
            en: { correct: 'Yes! The pants are long.', wrong: 'No, the shorts are short.' },
            de: { correct: 'Ja! Die Hose ist lang.', wrong: 'Nein, die Shorts sind kurz.' },
            fr: { correct: "Oui ! Le pantalon est long.", wrong: "Non, le short est court." },
            nl: { correct: 'Ja! De broek is lang.', wrong: 'Nee, de korte broek is kort.' },
            az: { correct: 'Bəli! Şalvar uzundur.', wrong: 'Xeyr, şort qısadır.' }
        },
        options: [
            { id: 79, word: "pantolon", imageUrl: "/images/79.png", isCorrect: true, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 80, word: "şort", imageUrl: "/images/80.png", isCorrect: false, audioKey: "sort", spokenText: "şort" }
        ]
    },
    { 
        id: 248, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Şort kısadır.', wrong: 'Hayır, pantolon uzundur.' },
            en: { correct: 'Yes! The shorts are short.', wrong: 'No, the pants are long.' },
            de: { correct: 'Ja! Die Shorts sind kurz.', wrong: 'Nein, die Hose ist lang.' },
            fr: { correct: "Oui ! Le short est court.", wrong: "Non, le pantalon est long." },
            nl: { correct: 'Ja! De korte broek is kort.', wrong: 'Nee, de broek is lang.' },
            az: { correct: 'Bəli! Şort qısadır.', wrong: 'Xeyr, şalvar uzundur.' }
        },
        options: [
            { id: 79, word: "pantolon", imageUrl: "/images/79.png", isCorrect: false, audioKey: "pantolon", spokenText: "pantolon" },
            { id: 80, word: "şort", imageUrl: "/images/80.png", isCorrect: true, audioKey: "sort", spokenText: "şort" }
        ]
    },

    // 3. Havuç
    { 
        id: 249, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Bu havuç uzundur.', wrong: 'Hayır, bu havuç kısadır.' },
            en: { correct: 'Yes! This carrot is long.', wrong: 'No, this carrot is short.' },
            de: { correct: 'Ja! Diese Karotte ist lang.', wrong: 'Nein, diese Karotte ist kurz.' },
            fr: { correct: "Oui ! Cette carotte est longue.", wrong: "Non, cette carotte est courte." },
            nl: { correct: 'Ja! Deze wortel is lang.', wrong: 'Nee, deze wortel is kort.' },
            az: { correct: 'Bəli! Bu kök uzundur.', wrong: 'Xeyr, bu kök qısadır.' }
        },
        options: [
            { id: 98, word: "havuç", imageUrl: "/images/98.png", isCorrect: true, audioKey: "havuc", spokenText: "havuç" },
            { id: 99, word: "havuç", imageUrl: "/images/99.png", isCorrect: false, audioKey: "havuc", spokenText: "havuç" }
        ]
    },
    { 
        id: 250, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Bu havuç kısadır.', wrong: 'Hayır, bu havuç uzundur.' },
            en: { correct: 'Yes! This carrot is short.', wrong: 'No, this carrot is long.' },
            de: { correct: 'Ja! Diese Karotte ist kurz.', wrong: 'Nein, diese Karotte ist lang.' },
            fr: { correct: "Oui ! Cette carotte est courte.", wrong: "Non, cette carotte est longue." },
            nl: { correct: 'Ja! Deze wortel is kort.', wrong: 'Nee, deze wortel is lang.' },
            az: { correct: 'Bəli! Bu kök qısadır.', wrong: 'Xeyr, bu kök uzundur.' }
        },
        options: [
            { id: 98, word: "havuç", imageUrl: "/images/98.png", isCorrect: false, audioKey: "havuc", spokenText: "havuç" },
            { id: 99, word: "havuç", imageUrl: "/images/99.png", isCorrect: true, audioKey: "havuc", spokenText: "havuç" }
        ]
    },

    // 4. Merdiven vs Tabure
    { 
        id: 251, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Merdiven uzundur.', wrong: 'Hayır, tabure kısadır.' },
            en: { correct: 'Yes! The ladder is tall.', wrong: 'No, the stool is short.' },
            de: { correct: 'Ja! Die Leiter ist lang.', wrong: 'Nein, der Hocker ist kurz.' },
            fr: { correct: "Oui ! L'échelle est longue.", wrong: "Non, le tabouret est court." },
            nl: { correct: 'Ja! De ladder is lang.', wrong: 'Nee, de kruk is kort.' },
            az: { correct: 'Bəli! Nərdivan uzundur.', wrong: 'Xeyr, taburet qısadır.' }
        },
        options: [
            { id: 494, word: "merdiven", imageUrl: "/images/494.png", isCorrect: true, audioKey: "merdiven", spokenText: "merdiven" },
            { id: 495, word: "tabure", imageUrl: "/images/495.png", isCorrect: false, audioKey: "tabure", spokenText: "tabure" }
        ]
    },
    { 
        id: 252, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Tabure kısadır.', wrong: 'Hayır, merdiven uzundur.' },
            en: { correct: 'Yes! The stool is short.', wrong: 'No, the ladder is tall.' },
            de: { correct: 'Ja! Der Hocker ist kurz.', wrong: 'Nein, die Leiter ist lang.' },
            fr: { correct: "Oui ! Le tabouret est court.", wrong: "Non, l'échelle est longue." },
            nl: { correct: 'Ja! De kruk is kort.', wrong: 'Nee, de ladder is lang.' },
            az: { correct: 'Bəli! Taburet qısadır.', wrong: 'Xeyr, nərdivan uzundur.' }
        },
        options: [
            { id: 494, word: "merdiven", imageUrl: "/images/494.png", isCorrect: false, audioKey: "merdiven", spokenText: "merdiven" },
            { id: 495, word: "tabure", imageUrl: "/images/495.png", isCorrect: true, audioKey: "tabure", spokenText: "tabure" }
        ]
    },

    // 5. Tren vs Araba
    { 
        id: 253, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Tren uzundur.', wrong: 'Hayır, araba kısadır.' },
            en: { correct: 'Yes! The train is long.', wrong: 'No, the car is short.' },
            de: { correct: 'Ja! Der Zug ist lang.', wrong: 'Nein, das Auto ist kurz.' },
            fr: { correct: "Oui ! Le train est long.", wrong: "Non, la voiture est courte." },
            nl: { correct: 'Ja! De trein is lang.', wrong: 'Nee, de auto is kort.' },
            az: { correct: 'Bəli! Qatar uzundur.', wrong: 'Xeyr, maşın qısadır.' }
        },
        options: [
            { id: 106, word: "tren", imageUrl: "/images/106.png", isCorrect: true, audioKey: "tren", spokenText: "tren" },
            { id: 246, word: "araba", imageUrl: "/images/2.png", isCorrect: false, audioKey: "araba", spokenText: "araba" }
        ]
    },
    { 
        id: 254, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Araba kısadır.', wrong: 'Hayır, tren uzundur.' },
            en: { correct: 'Yes! The car is short.', wrong: 'No, the train is long.' },
            de: { correct: 'Ja! Das Auto ist kurz.', wrong: 'Nein, der Zug ist lang.' },
            fr: { correct: "Oui ! La voiture est courte.", wrong: "Non, le train est long." },
            nl: { correct: 'Ja! De auto is kort.', wrong: 'Nee, de trein is lang.' },
            az: { correct: 'Bəli! Maşın qısadır.', wrong: 'Xeyr, qatar uzundur.' }
        },
        options: [
            { id: 106, word: "tren", imageUrl: "/images/106.png", isCorrect: false, audioKey: "tren", spokenText: "tren" },
            { id: 246, word: "araba", imageUrl: "/images/2.png", isCorrect: true, audioKey: "araba", spokenText: "araba" }
        ]
    },

    // 6. Yılan vs Solucan
    { 
        id: 255, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Yılan uzundur.', wrong: 'Hayır, solucan kısadır.' },
            en: { correct: 'Yes! The snake is long.', wrong: 'No, the worm is short.' },
            de: { correct: 'Ja! Die Schlange ist lang.', wrong: 'Nein, der Wurm ist kurz.' },
            fr: { correct: "Oui ! Le serpent est long.", wrong: "Non, le ver est court." },
            nl: { correct: 'Ja! De slang is lang.', wrong: 'Nee, de worm is kort.' },
            az: { correct: 'Bəli! İlan uzundur.', wrong: 'Xeyr, soxulcan qısadır.' }
        },
        options: [
            { id: 323, word: "yılan", imageUrl: "/images/323.png", isCorrect: true, audioKey: "yilan", spokenText: "yılan" },
            { id: 150, word: "solucan", imageUrl: "/images/150.png", isCorrect: false, audioKey: "solucan", spokenText: "solucan" }
        ]
    },
    { 
        id: 256, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Solucan kısadır.', wrong: 'Hayır, yılan uzundur.' },
            en: { correct: 'Yes! The worm is short.', wrong: 'No, the snake is long.' },
            de: { correct: 'Ja! Der Wurm ist kurz.', wrong: 'Nein, die Schlange ist lang.' },
            fr: { correct: "Oui ! Le ver est court.", wrong: "Non, le serpent est long." },
            nl: { correct: 'Ja! De worm is kort.', wrong: 'Nee, de slang is lang.' },
            az: { correct: 'Bəli! Soxulcan qısadır.', wrong: 'Xeyr, ilan uzundur.' }
        },
        options: [
            { id: 323, word: "yılan", imageUrl: "/images/323.png", isCorrect: false, audioKey: "yilan", spokenText: "yılan" },
            { id: 150, word: "solucan", imageUrl: "/images/150.png", isCorrect: true, audioKey: "solucan", spokenText: "solucan" }
        ]
    },

    // 7. Saç
    { 
        id: 257, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Bu saç uzundur.', wrong: 'Hayır, bu saç kısadır.' },
            en: { correct: 'Yes! This hair is long.', wrong: 'No, this hair is short.' },
            de: { correct: 'Ja! Dieses Haar ist lang.', wrong: 'Nein, dieses Haar ist kurz.' },
            fr: { correct: "Oui ! Ces cheveux sont longs.", wrong: "Non, ces cheveux sont courts." },
            nl: { correct: 'Ja! Dit haar is lang.', wrong: 'Nee, dit haar is kort.' },
            az: { correct: 'Bəli! Bu saç uzundur.', wrong: 'Xeyr, bu saç qısadır.' }
        },
        options: [
            { id: 663, word: "saç", imageUrl: "/images/663.png", isCorrect: true, audioKey: "sac", spokenText: "saç" },
            { id: 488, word: "saç", imageUrl: "/images/488.png", isCorrect: false, audioKey: "sac", spokenText: "saç" }
        ]
    },
    { 
        id: 258, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Bu saç kısadır.', wrong: 'Hayır, bu saç uzundur.' },
            en: { correct: 'Yes! This hair is short.', wrong: 'No, this hair is long.' },
            de: { correct: 'Ja! Dieses Haar ist kurz.', wrong: 'Nein, dieses Haar ist lang.' },
            fr: { correct: "Oui ! Ces cheveux sont courts.", wrong: "Non, ces cheveux sont longs." },
            nl: { correct: 'Ja! Dit haar is kort.', wrong: 'Nee, dit haar is lang.' },
            az: { correct: 'Bəli! Bu saç qısadır.', wrong: 'Xeyr, bu saç uzundur.' }
        },
        options: [
            { id: 663, word: "saç", imageUrl: "/images/663.png", isCorrect: false, audioKey: "sac", spokenText: "saç" },
            { id: 488, word: "saç", imageUrl: "/images/488.png", isCorrect: true, audioKey: "sac", spokenText: "saç" }
        ]
    },

    // 8. Ağaç
    { 
        id: 259, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Bu ağaç uzundur.', wrong: 'Hayır, bu ağaç kısadır.' },
            en: { correct: 'Yes! This tree is tall.', wrong: 'No, this tree is short.' },
            de: { correct: 'Ja! Dieser Baum ist groß.', wrong: 'Nein, dieser Baum ist klein.' },
            fr: { correct: "Oui ! Cet arbre est grand.", wrong: "Non, cet arbre est petit." },
            nl: { correct: 'Ja! Deze boom is groot.', wrong: 'Nee, deze boom is klein.' },
            az: { correct: 'Bəli! Bu ağac uzundur.', wrong: 'Xeyr, bu ağac qısadır.' }
        },
        options: [
            { id: 252, word: "ağaç", imageUrl: "/images/8.png", isCorrect: true, audioKey: "agac", spokenText: "ağaç" },
            { id: 253, word: "ağaç", imageUrl: "/images/9.png", isCorrect: false, audioKey: "agac", spokenText: "ağaç" }
        ]
    },
    { 
        id: 260, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Bu ağaç kısadır.', wrong: 'Hayır, bu ağaç uzundur.' },
            en: { correct: 'Yes! This tree is short.', wrong: 'No, this tree is tall.' },
            de: { correct: 'Ja! Dieser Baum ist klein.', wrong: 'Nein, dieser Baum ist groß.' },
            fr: { correct: "Oui ! Cet arbre est petit.", wrong: "Non, cet arbre est grand." },
            nl: { correct: 'Ja! Deze boom is klein.', wrong: 'Nee, deze boom is groot.' },
            az: { correct: 'Bəli! Bu ağac qısadır.', wrong: 'Xeyr, bu ağac uzundur.' }
        },
        options: [
            { id: 252, word: "ağaç", imageUrl: "/images/8.png", isCorrect: false, audioKey: "agac", spokenText: "ağaç" },
            { id: 253, word: "ağaç", imageUrl: "/images/9.png", isCorrect: true, audioKey: "agac", spokenText: "ağaç" }
        ]
    },

    // 9. Cetvel vs Silgi
    { 
        id: 261, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Cetvel uzundur.', wrong: 'Hayır, silgi kısadır.' },
            en: { correct: 'Yes! The ruler is long.', wrong: 'No, the eraser is short.' },
            de: { correct: 'Ja! Das Lineal ist lang.', wrong: 'Nein, der Radiergummi ist kurz.' },
            fr: { correct: "Oui ! La règle est longue.", wrong: "Non, la gomme est courte." },
            nl: { correct: 'Ja! De liniaal is lang.', wrong: 'Nee, de gum is kort.' },
            az: { correct: 'Bəli! Xətkeş uzundur.', wrong: 'Xeyr, pozan qısadır.' }
        },
        options: [
            { id: 149, word: "cetvel", imageUrl: "/images/149.png", isCorrect: true, audioKey: "cetvel", spokenText: "cetvel" },
            { id: 535, word: "silgi", imageUrl: "/images/535.png", isCorrect: false, audioKey: "silgi", spokenText: "silgi" }
        ]
    },
    { 
        id: 262, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Silgi kısadır.', wrong: 'Hayır, cetvel uzundur.' },
            en: { correct: 'Yes! The eraser is short.', wrong: 'No, the ruler is long.' },
            de: { correct: 'Ja! Der Radiergummi ist kurz.', wrong: 'Nein, das Lineal ist lang.' },
            fr: { correct: "Oui ! La gomme est courte.", wrong: "Non, la règle est longue." },
            nl: { correct: 'Ja! De gum is kort.', wrong: 'Nee, de liniaal is lang.' },
            az: { correct: 'Bəli! Pozan qısadır.', wrong: 'Xeyr, xətkeş uzundur.' }
        },
        options: [
            { id: 149, word: "cetvel", imageUrl: "/images/149.png", isCorrect: false, audioKey: "cetvel", spokenText: "cetvel" },
            { id: 535, word: "silgi", imageUrl: "/images/535.png", isCorrect: true, audioKey: "silgi", spokenText: "silgi" }
        ]
    },

    // 10. Kalem vs Silgi
    { 
        id: 263, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Kalem uzundur.', wrong: 'Hayır, silgi kısadır.' },
            en: { correct: 'Yes! The pencil is long.', wrong: 'No, the eraser is short.' },
            de: { correct: 'Ja! Der Stift ist lang.', wrong: 'Nein, der Radiergummi ist kurz.' },
            fr: { correct: "Oui ! Le crayon est long.", wrong: "Non, la gomme est courte." },
            nl: { correct: 'Ja! Het potlood is lang.', wrong: 'Nee, de gum is kort.' },
            az: { correct: 'Bəli! Qələm uzundur.', wrong: 'Xeyr, pozan qısadır.' }
        },
        options: [
            { id: 121, word: "kalem", imageUrl: "/images/121.png", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 535, word: "silgi", imageUrl: "/images/535.png", isCorrect: false, audioKey: "silgi", spokenText: "silgi" }
        ]
    },
    { 
        id: 20, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Silgi kısadır.', wrong: 'Hayır, kalem uzundur.' },
            en: { correct: 'Yes! The eraser is short.', wrong: 'No, the pencil is long.' },
            de: { correct: 'Ja! Der Radiergummi ist kurz.', wrong: 'Nein, der Stift ist lang.' },
            fr: { correct: "Oui ! La gomme est courte.", wrong: "Non, le crayon est long." },
            nl: { correct: 'Ja! De gum is kort.', wrong: 'Nee, het potlood is lang.' },
            az: { correct: 'Bəli! Pozan qısadır.', wrong: 'Xeyr, qələm uzundur.' }
        },
        options: [
            { id: 121, word: "kalem", imageUrl: "/images/121.png", isCorrect: false, audioKey: "kalem", spokenText: "kalem" },
            { id: 535, word: "silgi", imageUrl: "/images/535.png", isCorrect: true, audioKey: "silgi", spokenText: "silgi" }
        ]
    },

    // 11. Yılan vs Tırtıl
    { 
        id: 21, 
        question: "Uzun olan hangisi?", 
        questionAudioKey: "q_which_is_long", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Yılan uzundur.', wrong: 'Hayır, tırtıl kısadır.' },
            en: { correct: 'Yes! The snake is long.', wrong: 'No, the caterpillar is short.' },
            de: { correct: 'Ja! Die Schlange ist lang.', wrong: 'Nein, die Raupe ist kurz.' },
            fr: { correct: "Oui ! Le serpent est long.", wrong: "Non, la chenille est courte." },
            nl: { correct: 'Ja! De slang is lang.', wrong: 'Nee, de rups is kort.' },
            az: { correct: 'Bəli! İlan uzundur.', wrong: 'Xeyr, tırtıl qısadır.' }
        },
        options: [
            { id: 323, word: "yılan", imageUrl: "/images/323.png", isCorrect: true, audioKey: "yilan", spokenText: "yılan" },
            { id: 445, word: "tırtıl", imageUrl: "/images/445.png", isCorrect: false, audioKey: "tirtil", spokenText: "tırtıl" }
        ]
    },
    { 
        id: 22, 
        question: "Kısa olan hangisi?", 
        questionAudioKey: "q_which_is_short", 
        activityType: ActivityType.LongShort, 
        speech: {
            tr: { correct: 'Evet! Tırtıl kısadır.', wrong: 'Hayır, yılan uzundur.' },
            en: { correct: 'Yes! The caterpillar is short.', wrong: 'No, the snake is long.' },
            de: { correct: 'Ja! Die Raupe ist kurz.', wrong: 'Nein, die Schlange ist lang.' },
            fr: { correct: "Oui ! La chenille est courte.", wrong: "Non, le serpent est long." },
            nl: { correct: 'Ja! De rups is kort.', wrong: 'Nee, de slang is lang.' },
            az: { correct: 'Bəli! Tırtıl qısadır.', wrong: 'Xeyr, ilan uzundur.' }
        },
        options: [
            { id: 323, word: "yılan", imageUrl: "/images/323.png", isCorrect: false, audioKey: "yilan", spokenText: "yılan" },
            { id: 445, word: "tırtıl", imageUrl: "/images/445.png", isCorrect: true, audioKey: "tirtil", spokenText: "tırtıl" }
        ]
    }
];
