import { ConceptRound, ActivityType } from '../../../../types';

export const sivriKutData: ConceptRound[] = [
    // 1. Kalem
    { 
        id: 1, 
        question: "Sivri olan hangisi?", 
        questionAudioKey: "q_which_is_pointed", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Kalem sivridir.', wrong: 'Hayır, kalem küttür.' },
            en: { correct: 'Yes! The pencil is pointed.', wrong: 'No, the pencil is blunt.' },
            de: { correct: 'Ja! Der Stift ist spitz.', wrong: 'Nein, der Stift ist stumpf.' },
            fr: { correct: "Oui ! Le crayon est pointu.", wrong: "Non, le crayon est émoussé." },
            nl: { correct: 'Ja! Het potlood is puntig.', wrong: 'Nee, het potlood is stomp.' },
            az: { correct: 'Bəli! Qələm sivridir.', wrong: 'Xeyr, qələm kütlədir.' }
        },
        options: [
            { id: 164, word: "kalem", imageUrl: "/images/164.png", isCorrect: true, audioKey: "sivri_kalem", spokenText: "sivri kalem" },
            { id: 165, word: "kalem", imageUrl: "/images/165.png", isCorrect: false, audioKey: "kut_kalem", spokenText: "küt kalem" }
        ]
    },
    { 
        id: 2, 
        question: "Küt olan hangisi?", 
        questionAudioKey: "q_which_is_blunt", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Kalem küttür.', wrong: 'Hayır, kalem sivridir.' },
            en: { correct: 'Yes! The pencil is blunt.', wrong: 'No, the pencil is pointed.' },
            de: { correct: 'Ja! Der Stift ist stumpf.', wrong: 'Nein, der Stift ist spitz.' },
            fr: { correct: "Oui ! Le crayon est émoussé.", wrong: "Non, le crayon est pointu." },
            nl: { correct: 'Ja! Het potlood is stomp.', wrong: 'Nee, het potlood is puntig.' },
            az: { correct: 'Bəli! Qələm kütlədir.', wrong: 'Xeyr, qələm sivridir.' }
        },
        options: [
            { id: 164, word: "kalem", imageUrl: "/images/164.png", isCorrect: false, audioKey: "sivri_kalem", spokenText: "sivri kalem" },
            { id: 165, word: "kalem", imageUrl: "/images/165.png", isCorrect: true, audioKey: "kut_kalem", spokenText: "küt kalem" }
        ]
    },

    // 2. Bıçak vs Kaşık
    { 
        id: 3, 
        question: "Sivri olan hangisi?", 
        questionAudioKey: "q_which_is_pointed", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Bıçak sivridir.', wrong: 'Hayır, kaşık küttür.' },
            en: { correct: 'Yes! The knife is pointed.', wrong: 'No, the spoon is blunt.' },
            de: { correct: 'Ja! Das Messer ist spitz.', wrong: 'Nein, der Löffel ist stumpf.' },
            fr: { correct: "Oui ! Le couteau est pointu.", wrong: "Non, la cuillère est émoussée." },
            nl: { correct: 'Ja! Het mes is puntig.', wrong: 'Nee, de lepel is stomp.' },
            az: { correct: 'Bəli! Bıçaq sivridir.', wrong: 'Xeyr, qaşıq kütlədir.' }
        },
        options: [
            { id: 262, word: "bıçak", imageUrl: "/images/262.png", isCorrect: true, audioKey: "bicak", spokenText: "bıçak" },
            { id: 125, word: "kaşık", imageUrl: "/images/125.png", isCorrect: false, audioKey: "kasik", spokenText: "kaşık" }
        ]
    },
    { 
        id: 4, 
        question: "Küt olan hangisi?", 
        questionAudioKey: "q_which_is_blunt", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Kaşık küttür.', wrong: 'Hayır, bıçak sivridir.' },
            en: { correct: 'Yes! The spoon is blunt.', wrong: 'No, the knife is pointed.' },
            de: { correct: 'Ja! Der Löffel ist stumpf.', wrong: 'Nein, das Messer ist spitz.' },
            fr: { correct: "Oui ! La cuillère est émoussée.", wrong: "Non, le couteau est pointu." },
            nl: { correct: 'Ja! De lepel is stomp.', wrong: 'Nee, het mes is puntig.' },
            az: { correct: 'Bəli! Qaşıq kütlədir.', wrong: 'Xeyr, bıçaq sivridir.' }
        },
        options: [
            { id: 262, word: "bıçak", imageUrl: "/images/262.png", isCorrect: false, audioKey: "bicak", spokenText: "bıçak" },
            { id: 125, word: "kaşık", imageUrl: "/images/125.png", isCorrect: true, audioKey: "kasik", spokenText: "kaşık" }
        ]
    },

    // 3. İğne vs Tığ
    { 
        id: 5, 
        question: "Sivri olan hangisi?", 
        questionAudioKey: "q_which_is_pointed", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! İğne sivridir.', wrong: 'Hayır, tığ küttür.' },
            en: { correct: 'Yes! The needle is pointed.', wrong: 'No, the crochet hook is blunt.' },
            de: { correct: 'Ja! Die Nadel ist spitz.', wrong: 'Nein, die Häkelnadel ist stumpf.' },
            fr: { correct: "Oui ! L'aiguille est pointue.", wrong: "Non, le crochet est émoussé." },
            nl: { correct: 'Ja! De naald is puntig.', wrong: 'Nee, de haaknaald is stomp.' },
            az: { correct: 'Bəli! İynə sivridir.', wrong: 'Xeyr, mil kütlədir.' }
        },
        options: [
            { id: 528, word: "iğne", imageUrl: "/images/528.png", isCorrect: true, audioKey: "igne", spokenText: "iğne" },
            { id: 527, word: "tığ", imageUrl: "/images/527.png", isCorrect: false, audioKey: "tig", spokenText: "tığ" }
        ]
    },
    { 
        id: 6, 
        question: "Küt olan hangisi?", 
        questionAudioKey: "q_which_is_blunt", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Tığ küttür.', wrong: 'Hayır, iğne sivridir.' },
            en: { correct: 'Yes! The crochet hook is blunt.', wrong: 'No, the needle is pointed.' },
            de: { correct: 'Ja! Die Häkelnadel ist stumpf.', wrong: 'Nein, die Nadel ist spitz.' },
            fr: { correct: "Oui ! Le crochet est émoussé.", wrong: "Non, l'aiguille est pointue." },
            nl: { correct: 'Ja! De haaknaald is stomp.', wrong: 'Nee, de naald is puntig.' },
            az: { correct: 'Bəli! Mil kütlədir.', wrong: 'Xeyr, iynə sivridir.' }
        },
        options: [
            { id: 528, word: "iğne", imageUrl: "/images/528.png", isCorrect: false, audioKey: "igne", spokenText: "iğne" },
            { id: 527, word: "tığ", imageUrl: "/images/527.png", isCorrect: true, audioKey: "tig", spokenText: "tığ" }
        ]
    },

    // 4. Çatal vs Kaşık
    { 
        id: 7, 
        question: "Sivri olan hangisi?", 
        questionAudioKey: "q_which_is_pointed", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Çatal sivridir.', wrong: 'Hayır, kaşık küttür.' },
            en: { correct: 'Yes! The fork is pointed.', wrong: 'No, the spoon is blunt.' },
            de: { correct: 'Ja! Die Gabel ist spitz.', wrong: 'Nein, der Löffel ist stumpf.' },
            fr: { correct: "Oui ! La fourchette est pointue.", wrong: "Non, la cuillère est émoussée." },
            nl: { correct: 'Ja! De vork is puntig.', wrong: 'Nee, de lepel is stomp.' },
            az: { correct: 'Bəli! Çəngəl sivridir.', wrong: 'Xeyr, qaşıq kütlədir.' }
        },
        options: [
            { id: 126, word: "çatal", imageUrl: "/images/126.png", isCorrect: true, audioKey: "catal", spokenText: "çatal" },
            { id: 125, word: "kaşık", imageUrl: "/images/125.png", isCorrect: false, audioKey: "kasik", spokenText: "kaşık" }
        ]
    },
    { 
        id: 8, 
        question: "Küt olan hangisi?", 
        questionAudioKey: "q_which_is_blunt", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Kaşık küttür.', wrong: 'Hayır, çatal sivridir.' },
            en: { correct: 'Yes! The spoon is blunt.', wrong: 'No, the fork is pointed.' },
            de: { correct: 'Ja! Der Löffel ist stumpf.', wrong: 'Nein, die Gabel ist spitz.' },
            fr: { correct: "Oui ! La cuillère est émoussée.", wrong: "Non, la fourchette est pointue." },
            nl: { correct: 'Ja! De lepel is stomp.', wrong: 'Nee, de vork is puntig.' },
            az: { correct: 'Bəli! Qaşıq kütlədir.', wrong: 'Xeyr, çəngəl sivridir.' }
        },
        options: [
            { id: 126, word: "çatal", imageUrl: "/images/126.png", isCorrect: false, audioKey: "catal", spokenText: "çatal" },
            { id: 125, word: "kaşık", imageUrl: "/images/125.png", isCorrect: true, audioKey: "kasik", spokenText: "kaşık" }
        ]
    },

    // 5. Dağ vs Tepe
    { 
        id: 9, 
        question: "Sivri olan hangisi?", 
        questionAudioKey: "q_which_is_pointed", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Dağ sivridir.', wrong: 'Hayır, tepe küttür.' },
            en: { correct: 'Yes! The mountain is pointed.', wrong: 'No, the hill is blunt.' },
            de: { correct: 'Ja! Der Berg ist spitz.', wrong: 'Nein, der Hügel ist stumpf.' },
            fr: { correct: "Oui ! La montagne est pointue.", wrong: "Non, la colline est émoussée." },
            nl: { correct: 'Ja! De berg is puntig.', wrong: 'Nee, de heuvel is stomp.' },
            az: { correct: 'Bəli! Dağ sivridir.', wrong: 'Xeyr, təpə kütlədir.' }
        },
        options: [
            { id: 195, word: "dağ", imageUrl: "/images/195.png", isCorrect: true, audioKey: "dag", spokenText: "dağ" },
            { id: 196, word: "tepe", imageUrl: "/images/196.png", isCorrect: false, audioKey: "tepe", spokenText: "tepe" }
        ]
    },
    { 
        id: 10, 
        question: "Küt olan hangisi?", 
        questionAudioKey: "q_which_is_blunt", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Tepe küttür.', wrong: 'Hayır, dağ sivridir.' },
            en: { correct: 'Yes! The hill is blunt.', wrong: 'No, the mountain is pointed.' },
            de: { correct: 'Ja! Der Hügel ist stumpf.', wrong: 'Nein, der Berg ist spitz.' },
            fr: { correct: "Oui ! La colline est émoussée.", wrong: "Non, la montagne est pointue." },
            nl: { correct: 'Ja! De heuvel is stomp.', wrong: 'Nee, de berg is puntig.' },
            az: { correct: 'Bəli! Təpə kütlədir.', wrong: 'Xeyr, dağ sivridir.' }
        },
        options: [
            { id: 195, word: "dağ", imageUrl: "/images/195.png", isCorrect: false, audioKey: "dag", spokenText: "dağ" },
            { id: 196, word: "tepe", imageUrl: "/images/196.png", isCorrect: true, audioKey: "tepe", spokenText: "tepe" }
        ]
    },

    // 6. Yıldız vs Daire
    { 
        id: 11, 
        question: "Sivri olan hangisi?", 
        questionAudioKey: "q_which_is_pointed", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Yıldız sivridir.', wrong: 'Hayır, daire küttür.' },
            en: { correct: 'Yes! The star is pointed.', wrong: 'No, the circle is blunt.' },
            de: { correct: 'Ja! Der Stern ist spitz.', wrong: 'Nein, der Kreis ist stumpf.' },
            fr: { correct: "Oui ! L'étoile est pointue.", wrong: "Non, le cercle est émoussé." },
            nl: { correct: 'Ja! De ster is puntig.', wrong: 'Nee, de cirkel is stomp.' },
            az: { correct: 'Bəli! Ulduz sivridir.', wrong: 'Xeyr, dairə kütlədir.' }
        },
        options: [
            { id: 69, word: "yıldız", imageUrl: "/images/69.png", isCorrect: true, audioKey: "yildiz", spokenText: "yıldız" },
            { id: 65, word: "daire", imageUrl: "/images/65.png", isCorrect: false, audioKey: "daire", spokenText: "daire" }
        ]
    },
    { 
        id: 12, 
        question: "Küt olan hangisi?", 
        questionAudioKey: "q_which_is_blunt", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Daire küttür.', wrong: 'Hayır, yıldız sivridir.' },
            en: { correct: 'Yes! The circle is blunt.', wrong: 'No, the star is pointed.' },
            de: { correct: 'Ja! Der Kreis ist stumpf.', wrong: 'Nein, der Stern ist spitz.' },
            fr: { correct: "Oui ! Le cercle est émoussé.", wrong: "Non, l'étoile est pointue." },
            nl: { correct: 'Ja! De cirkel is stomp.', wrong: 'Nee, de ster is puntig.' },
            az: { correct: 'Bəli! Dairə kütlədir.', wrong: 'Xeyr, ulduz sivridir.' }
        },
        options: [
            { id: 69, word: "yıldız", imageUrl: "/images/69.png", isCorrect: false, audioKey: "yildiz", spokenText: "yıldız" },
            { id: 65, word: "daire", imageUrl: "/images/65.png", isCorrect: true, audioKey: "daire", spokenText: "daire" }
        ]
    },

    // 7. Kirpi vs Kaplumbağa
    { 
        id: 13, 
        question: "Sivri olan hangisi?", 
        questionAudioKey: "q_which_is_pointed", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Kirpi sivridir.', wrong: 'Hayır, kaplumbağa küttür.' },
            en: { correct: 'Yes! The hedgehog is pointed.', wrong: 'No, the turtle is blunt.' },
            de: { correct: 'Ja! Der Igel ist spitz.', wrong: 'Nein, die Schildkröte ist stumpf.' },
            fr: { correct: "Oui ! Le hérisson est pointu.", wrong: "Non, la tortue est émoussée." },
            nl: { correct: 'Ja! De egel is puntig.', wrong: 'Nee, de schildpad is stomp.' },
            az: { correct: 'Bəli! Kirpi sivridir.', wrong: 'Xeyr, tısbağa kütlədir.' }
        },
        options: [
            { id: 418, word: "kirpi", imageUrl: "/images/418.png", isCorrect: true, audioKey: "kirpi", spokenText: "kirpi" },
            { id: 42, word: "kaplumbağa", imageUrl: "/images/42.webp", isCorrect: false, audioKey: "kaplumbaga", spokenText: "kaplumbağa" }
        ]
    },
    { 
        id: 14, 
        question: "Küt olan hangisi?", 
        questionAudioKey: "q_which_is_blunt", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Kaplumbağa küttür.', wrong: 'Hayır, kirpi sivridir.' },
            en: { correct: 'Yes! The turtle is blunt.', wrong: 'No, the hedgehog is pointed.' },
            de: { correct: 'Ja! Die Schildkröte ist stumpf.', wrong: 'Nein, der Igel ist spitz.' },
            fr: { correct: "Oui ! La tortue est émoussée.", wrong: "Non, le hérisson est pointu." },
            nl: { correct: 'Ja! De schildpad is stomp.', wrong: 'Nee, de egel is puntig.' },
            az: { correct: 'Bəli! Tısbağa kütlədir.', wrong: 'Xeyr, kirpi sivridir.' }
        },
        options: [
            { id: 418, word: "kirpi", imageUrl: "/images/418.png", isCorrect: false, audioKey: "kirpi", spokenText: "kirpi" },
            { id: 42, word: "kaplumbağa", imageUrl: "/images/42.webp", isCorrect: true, audioKey: "kaplumbaga", spokenText: "kaplumbağa" }
        ]
    },

    // 8. Ok vs Davul Çubuğu
    { 
        id: 15, 
        question: "Sivri olan hangisi?", 
        questionAudioKey: "q_which_is_pointed", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Ok sivridir.', wrong: 'Hayır, çubuk küttür.' },
            en: { correct: 'Yes! The arrow is pointed.', wrong: 'No, the stick is blunt.' },
            de: { correct: 'Ja! Der Pfeil ist spitz.', wrong: 'Nein, der Stock ist stumpf.' },
            fr: { correct: "Oui ! La flèche est pointue.", wrong: "Non, le bâton est émoussé." },
            nl: { correct: 'Ja! De pijl is puntig.', wrong: 'Nee, de stok is stomp.' },
            az: { correct: 'Bəli! Ox sivridir.', wrong: 'Xeyr, çubuq kütlədir.' }
        },
        options: [
            { id: 634, word: "ok", imageUrl: "/images/634.png", isCorrect: true, audioKey: "ok", spokenText: "ok" },
            { id: 592, word: "davul çubuğu", imageUrl: "/images/592.png", isCorrect: false, audioKey: "davul_cubugu", spokenText: "davul çubuğu" }
        ]
    },
    { 
        id: 16, 
        question: "Küt olan hangisi?", 
        questionAudioKey: "q_which_is_blunt", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Çubuk küttür.', wrong: 'Hayır, ok sivridir.' },
            en: { correct: 'Yes! The stick is blunt.', wrong: 'No, the arrow is pointed.' },
            de: { correct: 'Ja! Der Stock ist stumpf.', wrong: 'Nein, der Pfeil ist spitz.' },
            fr: { correct: "Oui ! Le bâton est émoussé.", wrong: "Non, la flèche est pointue." },
            nl: { correct: 'Ja! De stok is stomp.', wrong: 'Nee, de pijl is puntig.' },
            az: { correct: 'Bəli! Çubuq kütlədir.', wrong: 'Xeyr, ox sivridir.' }
        },
        options: [
            { id: 634, word: "ok", imageUrl: "/images/634.png", isCorrect: false, audioKey: "ok", spokenText: "ok" },
            { id: 592, word: "davul çubuğu", imageUrl: "/images/592.png", isCorrect: true, audioKey: "davul_cubugu", spokenText: "davul çubuğu" }
        ]
    },

    // 9. Çivi vs Vida
    { 
        id: 17, 
        question: "Sivri olan hangisi?", 
        questionAudioKey: "q_which_is_pointed", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Çivi sivridir.', wrong: 'Hayır, vida küttür.' },
            en: { correct: 'Yes! The nail is pointed.', wrong: 'No, the screw is blunt.' },
            de: { correct: 'Ja! Der Nagel ist spitz.', wrong: 'Nein, die Schraube ist stumpf.' },
            fr: { correct: "Oui ! Le clou est pointu.", wrong: "Non, la vis est émoussée." },
            nl: { correct: 'Ja! De spijker is puntig.', wrong: 'Nee, de schroef is stomp.' },
            az: { correct: 'Bəli! Mıx sivridir.', wrong: 'Xeyr, vida kütlədir.' }
        },
        options: [
            { id: 525, word: "çivi", imageUrl: "/images/525.png", isCorrect: true, audioKey: "civi", spokenText: "çivi" },
            { id: 53, word: "vida", imageUrl: "/images/53.png", isCorrect: false, audioKey: "vida", spokenText: "vida" }
        ]
    },
    { 
        id: 18, 
        question: "Küt olan hangisi?", 
        questionAudioKey: "q_which_is_blunt", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Vida küttür.', wrong: 'Hayır, çivi sivridir.' },
            en: { correct: 'Yes! The screw is blunt.', wrong: 'No, the nail is pointed.' },
            de: { correct: 'Ja! Die Schraube ist stumpf.', wrong: 'Nein, der Nagel ist spitz.' },
            fr: { correct: "Oui ! La vis est émoussée.", wrong: "Non, le clou est pointu." },
            nl: { correct: 'Ja! De schroef is stomp.', wrong: 'Nee, de spijker is puntig.' },
            az: { correct: 'Bəli! Vida kütlədir.', wrong: 'Xeyr, mıx sivridir.' }
        },
        options: [
            { id: 525, word: "çivi", imageUrl: "/images/525.png", isCorrect: false, audioKey: "civi", spokenText: "çivi" },
            { id: 53, word: "vida", imageUrl: "/images/53.png", isCorrect: true, audioKey: "vida", spokenText: "vida" }
        ]
    },

    // 10. Gül Dalı vs Dal
    { 
        id: 19, 
        question: "Sivri olan hangisi?", 
        questionAudioKey: "q_which_is_pointed", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Diken sivridir.', wrong: 'Hayır, dal küttür.' },
            en: { correct: 'Yes! The thorn is pointed.', wrong: 'No, the branch is blunt.' },
            de: { correct: 'Ja! Der Dorn ist spitz.', wrong: 'Nein, der Zweig ist stumpf.' },
            fr: { correct: "Oui ! L'épine est pointue.", wrong: "Non, la branche est émoussée." },
            nl: { correct: 'Ja! De doorn is puntig.', wrong: 'Nee, de tak is stomp.' },
            az: { correct: 'Bəli! Tikan sivridir.', wrong: 'Xeyr, budaq kütlədir.' }
        },
        options: [
            { id: 346, word: "gül dalı", imageUrl: "/images/346.png", isCorrect: true, audioKey: "gul_dali", spokenText: "gül dalı" },
            { id: 536, word: "dal", imageUrl: "/images/536.png", isCorrect: false, audioKey: "dal", spokenText: "dal" }
        ]
    },
    { 
        id: 20, 
        question: "Küt olan hangisi?", 
        questionAudioKey: "q_which_is_blunt", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Dal küttür.', wrong: 'Hayır, diken sivridir.' },
            en: { correct: 'Yes! The branch is blunt.', wrong: 'No, the thorn is pointed.' },
            de: { correct: 'Ja! Der Zweig ist stumpf.', wrong: 'Nein, der Dorn ist spitz.' },
            fr: { correct: "Oui ! La branche est émoussée.", wrong: "Non, l'épine est pointue." },
            nl: { correct: 'Ja! De tak is stomp.', wrong: 'Nee, de doorn is puntig.' },
            az: { correct: 'Bəli! Budaq kütlədir.', wrong: 'Xeyr, tikan sivridir.' }
        },
        options: [
            { id: 346, word: "gül dalı", imageUrl: "/images/346.png", isCorrect: false, audioKey: "gul_dali", spokenText: "gül dalı" },
            { id: 536, word: "dal", imageUrl: "/images/536.png", isCorrect: true, audioKey: "dal", spokenText: "dal" }
        ]
    },

    // 11. Pizza Dilimi vs Bütün Pizza
    { 
        id: 21, 
        question: "Sivri olan hangisi?", 
        questionAudioKey: "q_which_is_pointed", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Pizza dilimi sivridir.', wrong: 'Hayır, pizza küttür.' },
            en: { correct: 'Yes! The pizza slice is pointed.', wrong: 'No, the pizza is blunt.' },
            de: { correct: 'Ja! Das Pizzastück ist spitz.', wrong: 'Nein, die Pizza ist stumpf.' },
            fr: { correct: "Oui ! La part de pizza est pointue.", wrong: "Non, la pizza est émoussée." },
            nl: { correct: 'Ja! De pizzapunt is puntig.', wrong: 'Nee, de pizza is stomp.' },
            az: { correct: 'Bəli! Pizza dilimi sivridir.', wrong: 'Xeyr, pizza kütlədir.' }
        },
        options: [
            { id: 25, word: "pizza dilimi", imageUrl: "/images/25.png", isCorrect: true, audioKey: "pizza_dilimi", spokenText: "pizza dilimi" },
            { id: 23, word: "pizza", imageUrl: "/images/23.png", isCorrect: false, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
    { 
        id: 22, 
        question: "Küt olan hangisi?", 
        questionAudioKey: "q_which_is_blunt", 
        activityType: ActivityType.SivriKut, 
        speech: {
            tr: { correct: 'Evet! Pizza küttür.', wrong: 'Hayır, pizza dilimi sivridir.' },
            en: { correct: 'Yes! The pizza is blunt.', wrong: 'No, the pizza slice is pointed.' },
            de: { correct: 'Ja! Die Pizza ist stumpf.', wrong: 'Nein, das Pizzastück ist spitz.' },
            fr: { correct: "Oui ! La pizza est émoussée.", wrong: "Non, la part de pizza est pointue." },
            nl: { correct: 'Ja! De pizza is stomp.', wrong: 'Nee, de pizzapunt is puntig.' },
            az: { correct: 'Bəli! Pizza kütlədir.', wrong: 'Xeyr, pizza dilimi sivridir.' }
        },
        options: [
            { id: 25, word: "pizza dilimi", imageUrl: "/images/25.png", isCorrect: false, audioKey: "pizza_dilimi", spokenText: "pizza dilimi" },
            { id: 23, word: "pizza", imageUrl: "/images/23.png", isCorrect: true, audioKey: "pizza", spokenText: "pizza" }
        ]
    },
];