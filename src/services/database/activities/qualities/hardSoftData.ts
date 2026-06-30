import { ConceptRound, ActivityType } from '../../../../types';

export const hardSoftData: ConceptRound[] = [
    // 1. Taş vs Pamuk
    { 
        id: 131, 
        question: "Sert olan hangisi?", 
        questionAudioKey: "q_which_is_hard_person", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Taş serttir.', wrong: 'Hayır, pamuk yumuşaktır.' },
            en: { correct: 'Yes! The stone is hard.', wrong: 'No, the cotton is soft.' },
            de: { correct: 'Ja! Der Stein ist hart.', wrong: 'Nein, die Baumwolle ist weich.' },
            fr: { correct: "Oui ! La pierre est dure.", wrong: "Non, le coton est doux." },
            nl: { correct: 'Ja! De steen is hard.', wrong: 'Nee, het katoen is zacht.' },
            az: { correct: 'Bəli! Daş sərtdir.', wrong: 'Xeyr, pambıq yumşaqdır.' }
        },
        options: [
            { id: 347, word: "taş", imageUrl: "/images/347.png", isCorrect: true, audioKey: "tas", spokenText: "taş" },
            { id: 27, word: "pamuk", imageUrl: "/images/27.png", isCorrect: false, audioKey: "pamuk", spokenText: "pamuk" }
        ]
    },
    { 
        id: 132, 
        question: "Yumuşak olan hangisi?", 
        questionAudioKey: "q_which_is_soft", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Pamuk yumuşaktır.', wrong: 'Hayır, taş serttir.' },
            en: { correct: 'Yes! The cotton is soft.', wrong: 'No, the stone is hard.' },
            de: { correct: 'Ja! Die Baumwolle ist weich.', wrong: 'Nein, der Stein ist hart.' },
            fr: { correct: "Oui ! Le coton est doux.", wrong: "Non, la pierre est dure." },
            nl: { correct: 'Ja! Het katoen is zacht.', wrong: 'Nee, de steen is hard.' },
            az: { correct: 'Bəli! Pambıq yumşaqdır.', wrong: 'Xeyr, daş sərtdir.' }
        },
        options: [
            { id: 347, word: "taş", imageUrl: "/images/347.png", isCorrect: false, audioKey: "tas", spokenText: "taş" },
            { id: 27, word: "pamuk", imageUrl: "/images/27.png", isCorrect: true, audioKey: "pamuk", spokenText: "pamuk" }
        ]
    },

    // 2. Tuğla vs Yastık
    { 
        id: 133, 
        question: "Sert olan hangisi?", 
        questionAudioKey: "q_which_is_hard", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Tuğla serttir.', wrong: 'Hayır, yastık yumuşaktır.' },
            en: { correct: 'Yes! The brick is hard.', wrong: 'No, the pillow is soft.' },
            de: { correct: 'Ja! Der Ziegelstein ist hart.', wrong: 'Nein, das Kissen ist weich.' },
            fr: { correct: "Oui ! La brique est dure.", wrong: "Non, l'oreiller est doux." },
            nl: { correct: 'Ja! De baksteen is hard.', wrong: 'Nee, het kussen is zacht.' },
            az: { correct: 'Bəli! Kərpic sərtdir.', wrong: 'Xeyr, yastıq yumşaqdır.' }
        },
        options: [
            { id: 136, word: "tuğla", imageUrl: "/images/136.png", isCorrect: true, audioKey: "tugla", spokenText: "tuğla" },
            { id: 137, word: "yastık", imageUrl: "/images/137.png", isCorrect: false, audioKey: "yastik", spokenText: "yastık" }
        ]
    },
    { 
        id: 134, 
        question: "Yumuşak olan hangisi?", 
        questionAudioKey: "q_which_is_soft", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Yastık yumuşaktır.', wrong: 'Hayır, tuğla serttir.' },
            en: { correct: 'Yes! The pillow is soft.', wrong: 'No, the brick is hard.' },
            de: { correct: 'Ja! Das Kissen ist weich.', wrong: 'Nein, der Ziegelstein ist hart.' },
            fr: { correct: "Oui ! L'oreiller est doux.", wrong: "Non, la brique est dure." },
            nl: { correct: 'Ja! Het kussen is zacht.', wrong: 'Nee, de baksteen is hard.' },
            az: { correct: 'Bəli! Yastıq yumşaqdır.', wrong: 'Xeyr, kərpic sərtdir.' }
        },
        options: [
            { id: 136, word: "tuğla", imageUrl: "/images/136.png", isCorrect: false, audioKey: "tugla", spokenText: "tuğla" },
            { id: 137, word: "yastık", imageUrl: "/images/137.png", isCorrect: true, audioKey: "yastik", spokenText: "yastık" }
        ]
    },

    // 3. Çekiç vs Oyuncak Ayı
    { 
        id: 135, 
        question: "Sert olan hangisi?", 
        questionAudioKey: "q_which_is_hard", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Çekiç serttir.', wrong: 'Hayır, oyuncak ayı yumuşaktır.' },
            en: { correct: 'Yes! The hammer is hard.', wrong: 'No, the teddy bear is soft.' },
            de: { correct: 'Ja! Der Hammer ist hart.', wrong: 'Nein, der Teddybär ist weich.' },
            fr: { correct: "Oui ! Le marteau est dur.", wrong: "Non, l'ours en peluche est doux." },
            nl: { correct: 'Ja! De hamer is hard.', wrong: 'Nee, de teddybeer is zacht.' },
            az: { correct: 'Bəli! Çəkic sərtdir.', wrong: 'Xeyr, oyuncaq ayı yumşaqdır.' }
        },
        options: [
            { id: 496, word: "çekiç", imageUrl: "/images/496.png", isCorrect: true, audioKey: "cekic", spokenText: "çekiç" },
            { id: 276, word: "oyuncak ayı", imageUrl: "/images/276.png", isCorrect: false, audioKey: "oyuncak_ayi", spokenText: "oyuncak ayı" }
        ]
    },
    { 
        id: 136, 
        question: "Yumuşak olan hangisi?", 
        questionAudioKey: "q_which_is_soft", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Oyuncak ayı yumuşaktır.', wrong: 'Hayır, çekiç serttir.' },
            en: { correct: 'Yes! The teddy bear is soft.', wrong: 'No, the hammer is hard.' },
            de: { correct: 'Ja! Der Teddybär ist weich.', wrong: 'Nein, der Hammer ist hart.' },
            fr: { correct: "Oui ! L'ours en peluche est doux.", wrong: "Non, le marteau est dur." },
            nl: { correct: 'Ja! De teddybeer is zacht.', wrong: 'Nee, de hamer is hard.' },
            az: { correct: 'Bəli! Oyuncaq ayı yumşaqdır.', wrong: 'Xeyr, çəkic sərtdir.' }
        },
        options: [
            { id: 496, word: "çekiç", imageUrl: "/images/496.png", isCorrect: false, audioKey: "cekic", spokenText: "çekiç" },
            { id: 276, word: "oyuncak ayı", imageUrl: "/images/276.png", isCorrect: true, audioKey: "oyuncak_ayi", spokenText: "oyuncak ayı" }
        ]
    },

    // 4. Masa vs Sünger
    { 
        id: 137, 
        question: "Sert olan hangisi?", 
        questionAudioKey: "q_which_is_hard", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Masa serttir.', wrong: 'Hayır, sünger yumuşaktır.' },
            en: { correct: 'Yes! The table is hard.', wrong: 'No, the sponge is soft.' },
            de: { correct: 'Ja! Der Tisch ist hart.', wrong: 'Nein, der Schwamm ist weich.' },
            fr: { correct: "Oui ! La table est dure.", wrong: "Non, l'éponge est molle." },
            nl: { correct: 'Ja! De tafel is hard.', wrong: 'Nee, de spons is zacht.' },
            az: { correct: 'Bəli! Masa sərtdir.', wrong: 'Xeyr, süngər yumşaqdır.' }
        },
        options: [
            { id: 134, word: "masa", imageUrl: "/images/134.png", isCorrect: true, audioKey: "masa", spokenText: "masa" },
            { id: 167, word: "sünger", imageUrl: "/images/167.png", isCorrect: false, audioKey: "sunger", spokenText: "sünger" }
        ]
    },
    { 
        id: 138, 
        question: "Yumuşak olan hangisi?", 
        questionAudioKey: "q_which_is_soft", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Sünger yumuşaktır.', wrong: 'Hayır, masa serttir.' },
            en: { correct: 'Yes! The sponge is soft.', wrong: 'No, the table is hard.' },
            de: { correct: 'Ja! Der Schwamm ist weich.', wrong: 'Nein, der Tisch ist hart.' },
            fr: { correct: "Oui ! L'éponge est molle.", wrong: "Non, la table est dure." },
            nl: { correct: 'Ja! De spons is zacht.', wrong: 'Nee, de tafel is hard.' },
            az: { correct: 'Bəli! Süngər yumşaqdır.', wrong: 'Xeyr, masa sərtdir.' }
        },
        options: [
            { id: 134, word: "masa", imageUrl: "/images/134.png", isCorrect: false, audioKey: "masa", spokenText: "masa" },
            { id: 167, word: "sünger", imageUrl: "/images/167.png", isCorrect: true, audioKey: "sunger", spokenText: "sünger" }
        ]
    },

    // 5. Elmas vs Yün
    { 
        id: 139, 
        question: "Sert olan hangisi?", 
        questionAudioKey: "q_which_is_hard", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Elmas serttir.', wrong: 'Hayır, yün yumuşaktır.' },
            en: { correct: 'Yes! The diamond is hard.', wrong: 'No, the wool is soft.' },
            de: { correct: 'Ja! Der Diamant ist hart.', wrong: 'Nein, die Wolle ist weich.' },
            fr: { correct: "Oui ! Le diamant est dur.", wrong: "Non, la laine est douce." },
            nl: { correct: 'Ja! De diamant is hard.', wrong: 'Nee, de wol is zacht.' },
            az: { correct: 'Bəli! Almaz sərtdir.', wrong: 'Xeyr, yun yumşaqdır.' }
        },
        options: [
            { id: 586, word: "elmas", imageUrl: "/images/586.png", isCorrect: true, audioKey: "elmas", spokenText: "elmas" },
            { id: 587, word: "yün", imageUrl: "/images/587.png", isCorrect: false, audioKey: "yun", spokenText: "yün" }
        ]
    },
    { 
        id: 140, 
        question: "Yumuşak olan hangisi?", 
        questionAudioKey: "q_which_is_soft", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Yün yumuşaktır.', wrong: 'Hayır, elmas serttir.' },
            en: { correct: 'Yes! The wool is soft.', wrong: 'No, the diamond is hard.' },
            de: { correct: 'Ja! Die Wolle ist weich.', wrong: 'Nein, der Diamant ist hart.' },
            fr: { correct: "Oui ! La laine est douce.", wrong: "Non, le diamant est dur." },
            nl: { correct: 'Ja! De wol is zacht.', wrong: 'Nee, de diamant is hard.' },
            az: { correct: 'Bəli! Yun yumşaqdır.', wrong: 'Xeyr, almaz sərtdir.' }
        },
        options: [
            { id: 586, word: "elmas", imageUrl: "/images/586.png", isCorrect: false, audioKey: "elmas", spokenText: "elmas" },
            { id: 587, word: "yün", imageUrl: "/images/587.png", isCorrect: true, audioKey: "yun", spokenText: "yün" }
        ]
    },

    // 6. Kask vs Bere
    { 
        id: 141, 
        question: "Sert olan hangisi?", 
        questionAudioKey: "q_which_is_hard", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Kask serttir.', wrong: 'Hayır, bere yumuşaktır.' },
            en: { correct: 'Yes! The helmet is hard.', wrong: 'No, the beanie is soft.' },
            de: { correct: 'Ja! Der Helm ist hart.', wrong: 'Nein, die Mütze ist weich.' },
            fr: { correct: "Oui ! Le casque est dur.", wrong: "Non, le bonnet est doux." },
            nl: { correct: 'Ja! De helm is hard.', wrong: 'Nee, de muts is zacht.' },
            az: { correct: 'Bəli! Kask sərtdir.', wrong: 'Xeyr, papaq yumşaqdır.' }
        },
        options: [
            { id: 370, word: "kask", imageUrl: "/images/370.png", isCorrect: true, audioKey: "kask", spokenText: "kask" },
            { id: 336, word: "bere", imageUrl: "/images/336.png", isCorrect: false, audioKey: "bere", spokenText: "bere" }
        ]
    },
    { 
        id: 142, 
        question: "Yumuşak olan hangisi?", 
        questionAudioKey: "q_which_is_soft", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Bere yumuşaktır.', wrong: 'Hayır, kask serttir.' },
            en: { correct: 'Yes! The beanie is soft.', wrong: 'No, the helmet is hard.' },
            de: { correct: 'Ja! Die Mütze ist weich.', wrong: 'Nein, der Helm ist hart.' },
            fr: { correct: "Oui ! Le bonnet est doux.", wrong: "Non, le casque est dur." },
            nl: { correct: 'Ja! De muts is zacht.', wrong: 'Nee, de helm is hard.' },
            az: { correct: 'Bəli! Papaq yumşaqdır.', wrong: 'Xeyr, kask sərtdir.' }
        },
        options: [
            { id: 370, word: "kask", imageUrl: "/images/370.png", isCorrect: false, audioKey: "kask", spokenText: "kask" },
            { id: 336, word: "bere", imageUrl: "/images/336.png", isCorrect: true, audioKey: "bere", spokenText: "bere" }
        ]
    },

    // 7. Tencere vs Hamur
    { 
        id: 143, 
        question: "Sert olan hangisi?", 
        questionAudioKey: "q_which_is_hard", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Tencere serttir.', wrong: 'Hayır, hamur yumuşaktır.' },
            en: { correct: 'Yes! The pot is hard.', wrong: 'No, the dough is soft.' },
            de: { correct: 'Ja! Der Topf ist hart.', wrong: 'Nein, der Teig ist weich.' },
            fr: { correct: "Oui ! La casserole est dure.", wrong: "Non, la pâte est molle." },
            nl: { correct: 'Ja! De pan is hard.', wrong: 'Nee, het deeg is zacht.' },
            az: { correct: 'Bəli! Qazan sərtdir.', wrong: 'Xeyr, xəmir yumşaqdır.' }
        },
        options: [
            { id: 671, word: "tencere", imageUrl: "/images/671.png", isCorrect: true, audioKey: "tencere", spokenText: "tencere" },
            { id: 588, word: "hamur", imageUrl: "/images/588.png", isCorrect: false, audioKey: "hamur", spokenText: "hamur" }
        ]
    },
    { 
        id: 144, 
        question: "Yumuşak olan hangisi?", 
        questionAudioKey: "q_which_is_soft", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Hamur yumuşaktır.', wrong: 'Hayır, tencere serttir.' },
            en: { correct: 'Yes! The dough is soft.', wrong: 'No, the pot is hard.' },
            de: { correct: 'Ja! Der Teig ist weich.', wrong: 'Nein, der Topf ist hart.' },
            fr: { correct: "Oui ! La pâte est molle.", wrong: "Non, la casserole est dure." },
            nl: { correct: 'Ja! Het deeg is zacht.', wrong: 'Nee, de pan is hard.' },
            az: { correct: 'Bəli! Xəmir yumşaqdır.', wrong: 'Xeyr, qazan sərtdir.' }
        },
        options: [
            { id: 671, word: "tencere", imageUrl: "/images/671.png", isCorrect: false, audioKey: "tencere", spokenText: "tencere" },
            { id: 588, word: "hamur", imageUrl: "/images/588.png", isCorrect: true, audioKey: "hamur", spokenText: "hamur" }
        ]
    },

    // 8. Ceviz vs Ekmek
    { 
        id: 145, 
        question: "Sert olan hangisi?", 
        questionAudioKey: "q_which_is_hard", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Ceviz serttir.', wrong: 'Hayır, ekmek yumuşaktır.' },
            en: { correct: 'Yes! The walnut is hard.', wrong: 'No, the bread is soft.' },
            de: { correct: 'Ja! Die Walnuss ist hart.', wrong: 'Nein, das Brot ist weich.' },
            fr: { correct: "Oui ! La noix est dure.", wrong: "Non, le pain est mou." },
            nl: { correct: 'Ja! De walnoot is hard.', wrong: 'Nee, het brood is zacht.' },
            az: { correct: 'Bəli! Qoz sərtdir.', wrong: 'Xeyr, çörək yumşaqdır.' }
        },
        options: [
            { id: 650, word: "ceviz", imageUrl: "/images/650.png", isCorrect: true, audioKey: "ceviz", spokenText: "ceviz" },
            { id: 112, word: "ekmek", imageUrl: "/images/112.png", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    { 
        id: 146, 
        question: "Yumuşak olan hangisi?", 
        questionAudioKey: "q_which_is_soft", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Ekmek yumuşaktır.', wrong: 'Hayır, ceviz serttir.' },
            en: { correct: 'Yes! The bread is soft.', wrong: 'No, the walnut is hard.' },
            de: { correct: 'Ja! Das Brot ist weich.', wrong: 'Nein, die Walnuss ist hart.' },
            fr: { correct: "Oui ! Le pain est mou.", wrong: "Non, la noix est dure." },
            nl: { correct: 'Ja! Het brood is zacht.', wrong: 'Nee, de walnoot is hard.' },
            az: { correct: 'Bəli! Çörək yumşaqdır.', wrong: 'Xeyr, qoz sərtdir.' }
        },
        options: [
            { id: 650, word: "ceviz", imageUrl: "/images/650.png", isCorrect: false, audioKey: "ceviz", spokenText: "ceviz" },
            { id: 112, word: "ekmek", imageUrl: "/images/112.png", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },

    // 9. Otoyol vs Çim
    { 
        id: 147, 
        question: "Sert olan hangisi?", 
        questionAudioKey: "q_which_is_hard", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Otoyol serttir.', wrong: 'Hayır, çim yumuşaktır.' },
            en: { correct: 'Yes! The highway is hard.', wrong: 'No, the grass is soft.' },
            de: { correct: 'Ja! Die Autobahn ist hart.', wrong: 'Nein, das Gras ist weich.' },
            fr: { correct: "Oui ! L'autoroute est dure.", wrong: "Non, l'herbe est douce." },
            nl: { correct: 'Ja! De snelweg is hard.', wrong: 'Nee, het gras is zacht.' },
            az: { correct: 'Bəli! Yol sərtdir.', wrong: 'Xeyr, ot yumşaqdır.' }
        },
        options: [
            { id: 530, word: "otoyol", imageUrl: "/images/530.png", isCorrect: true, audioKey: "otoyol", spokenText: "otoyol" },
            { id: 434, word: "çim", imageUrl: "/images/434.png", isCorrect: false, audioKey: "cim", spokenText: "çim" }
        ]
    },
    { 
        id: 148, 
        question: "Yumuşak olan hangisi?", 
        questionAudioKey: "q_which_is_soft", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Çim yumuşaktır.', wrong: 'Hayır, otoyol serttir.' },
            en: { correct: 'Yes! The grass is soft.', wrong: 'No, the highway is hard.' },
            de: { correct: 'Ja! Das Gras ist weich.', wrong: 'Nein, die Autobahn ist hart.' },
            fr: { correct: "Oui ! L'herbe est douce.", wrong: "Non, l'autoroute est dure." },
            nl: { correct: 'Ja! Het gras is zacht.', wrong: 'Nee, de snelweg is hard.' },
            az: { correct: 'Bəli! Ot yumşaqdır.', wrong: 'Xeyr, yol sərtdir.' }
        },
        options: [
            { id: 530, word: "otoyol", imageUrl: "/images/530.png", isCorrect: false, audioKey: "otoyol", spokenText: "otoyol" },
            { id: 434, word: "çim", imageUrl: "/images/434.png", isCorrect: true, audioKey: "cim", spokenText: "çim" }
        ]
    },

    // 10. Misket vs Yün
    { 
        id: 149, 
        question: "Sert olan hangisi?", 
        questionAudioKey: "q_which_is_hard", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Misket serttir.', wrong: 'Hayır, yün yumuşaktır.' },
            en: { correct: 'Yes! The marble is hard.', wrong: 'No, the wool is soft.' },
            de: { correct: 'Ja! Die Murmel ist hart.', wrong: 'Nein, die Wolle ist weich.' },
            fr: { correct: "Oui ! La bille est dure.", wrong: "Non, la laine est douce." },
            nl: { correct: 'Ja! De knikker is hard.', wrong: 'Nee, de wol is zacht.' },
            az: { correct: 'Bəli! Mərmər daşı sərtdir.', wrong: 'Xeyr, yun yumşaqdır.' }
        },
        options: [
            { id: 762, word: "misket", imageUrl: "/images/762.png", imageScale: 0.72, isCorrect: true, audioKey: "misket", spokenText: "misket" },
            { id: 587, word: "yün", imageUrl: "/images/587.png", isCorrect: false, audioKey: "yun", spokenText: "yün" }
        ]
    },
    { 
        id: 150, 
        question: "Yumuşak olan hangisi?", 
        questionAudioKey: "q_which_is_soft", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Yün yumuşaktır.', wrong: 'Hayır, misket serttir.' },
            en: { correct: 'Yes! The wool is soft.', wrong: 'No, the marble is hard.' },
            de: { correct: 'Ja! Die Wolle ist weich.', wrong: 'Nein, die Murmel ist hart.' },
            fr: { correct: "Oui ! La laine est douce.", wrong: "Non, la bille est dure." },
            nl: { correct: 'Ja! De wol is zacht.', wrong: 'Nee, de knikker is hard.' },
            az: { correct: 'Bəli! Yun yumşaqdır.', wrong: 'Xeyr, mərmər daşı sərtdir.' }
        },
        options: [
            { id: 762, word: "misket", imageUrl: "/images/762.png", imageScale: 0.72, isCorrect: false, audioKey: "misket", spokenText: "misket" },
            { id: 587, word: "yün", imageUrl: "/images/587.png", isCorrect: true, audioKey: "yun", spokenText: "yün" }
        ]
    },

    // 11. Fındık vs Peynir
    { 
        id: 151, 
        question: "Sert olan hangisi?", 
        questionAudioKey: "q_which_is_hard", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Fındık serttir.', wrong: 'Hayır, peynir yumuşaktır.' },
            en: { correct: 'Yes! The hazelnut is hard.', wrong: 'No, the cheese is soft.' },
            de: { correct: 'Ja! Die Haselnuss ist hart.', wrong: 'Nein, der Käse ist weich.' },
            fr: { correct: "Oui ! La noisette est dure.", wrong: "Non, le fromage est mou." },
            nl: { correct: 'Ja! De hazelnoot is hard.', wrong: 'Nee, de kaas is zacht.' },
            az: { correct: 'Bəli! Fındıq sərtdir.', wrong: 'Xeyr, pendir yumşaqdır.' }
        },
        options: [
            { id: 94, word: "fındık", imageUrl: "/images/94.png", isCorrect: true, audioKey: "findik", spokenText: "fındık" },
            { id: 50, word: "peynir", imageUrl: "/images/50.png", isCorrect: false, audioKey: "peynir", spokenText: "peynir" }
        ]
    },
    { 
        id: 152, 
        question: "Yumuşak olan hangisi?", 
        questionAudioKey: "q_which_is_soft", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Peynir yumuşaktır.', wrong: 'Hayır, fındık serttir.' },
            en: { correct: 'Yes! The cheese is soft.', wrong: 'No, the hazelnut is hard.' },
            de: { correct: 'Ja! Der Käse ist weich.', wrong: 'Nein, die Haselnuss ist hart.' },
            fr: { correct: "Oui ! Le fromage est mou.", wrong: "Non, la noisette est dure." },
            nl: { correct: 'Ja! De kaas is zacht.', wrong: 'Nee, de hazelnoot is hard.' },
            az: { correct: 'Bəli! Pendir yumşaqdır.', wrong: 'Xeyr, fındıq sərtdir.' }
        },
        options: [
            { id: 94, word: "fındık", imageUrl: "/images/94.png", isCorrect: false, audioKey: "findik", spokenText: "fındık" },
            { id: 50, word: "peynir", imageUrl: "/images/50.png", isCorrect: true, audioKey: "peynir", spokenText: "peynir" }
        ]
    },

    // 12. Elma vs Şeftali
    { 
        id: 153, 
        question: "Sert olan hangisi?", 
        questionAudioKey: "q_which_is_hard", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Elma serttir.', wrong: 'Hayır, şeftali yumuşaktır.' },
            en: { correct: 'Yes! The apple is hard.', wrong: 'No, the peach is soft.' },
            de: { correct: 'Ja! Der Apfel ist hart.', wrong: 'Nein, der Pfirsich ist weich.' },
            fr: { correct: "Oui ! La pomme est dure.", wrong: "Non, la pêche est molle." },
            nl: { correct: 'Ja! De appel is hard.', wrong: 'Nee, de perzik is zacht.' },
            az: { correct: 'Bəli! Alma sərtdir.', wrong: 'Xeyr, şaftalı yumşaqdır.' }
        },
        options: [
            { id: 43, word: "elma", imageUrl: "/images/43.png", isCorrect: true, audioKey: "elma", spokenText: "elma" },
            { id: 333, word: "şeftali", imageUrl: "/images/333.png", isCorrect: false, audioKey: "seftali", spokenText: "şeftali" }
        ]
    },
    { 
        id: 154, 
        question: "Yumuşak olan hangisi?", 
        questionAudioKey: "q_which_is_soft", 
        activityType: ActivityType.HardSoft, 
        speech: {
            tr: { correct: 'Evet! Şeftali yumuşaktır.', wrong: 'Hayır, elma serttir.' },
            en: { correct: 'Yes! The peach is soft.', wrong: 'No, the apple is hard.' },
            de: { correct: 'Ja! Der Pfirsich ist weich.', wrong: 'Nein, der Apfel ist hart.' },
            fr: { correct: "Oui ! La pêche est molle.", wrong: "Non, la pomme est dure." },
            nl: { correct: 'Ja! De perzik is zacht.', wrong: 'Nee, de appel is hard.' },
            az: { correct: 'Bəli! Şaftalı yumşaqdır.', wrong: 'Xeyr, alma sərtdir.' }
        },
        options: [
            { id: 43, word: "elma", imageUrl: "/images/43.png", isCorrect: false, audioKey: "elma", spokenText: "elma" },
            { id: 333, word: "şeftali", imageUrl: "/images/333.png", isCorrect: true, audioKey: "seftali", spokenText: "şeftali" }
        ]
    },
];