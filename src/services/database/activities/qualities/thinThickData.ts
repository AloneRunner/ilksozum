import { ConceptRound, ActivityType } from '../../../../types';

export const thinThickData: ConceptRound[] = [
    // 1. Kitap
    { 
        id: 1, 
        question: "Kalın olan hangisi?", 
        questionAudioKey: "q_which_is_thick", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Kitap kalındır.', wrong: 'Hayır, kitap incedir.' },
            en: { correct: 'Yes! The book is thick.', wrong: 'No, the book is thin.' },
            de: { correct: 'Ja! Das Buch ist dick.', wrong: 'Nein, das Buch ist dünn.' },
            fr: { correct: "Oui ! Le livre est épais.", wrong: "Non, le livre est fin." },
            nl: { correct: 'Ja! Het boek is dik.', wrong: 'Nee, het boek is dun.' },
            az: { correct: 'Bəli! Kitab qalındır.', wrong: 'Xeyr, kitab nazikdir.' }
        },
        options: [
            { id: 36, word: "kitap", imageUrl: "/images/36.png", isCorrect: true, audioKey: "kitap", spokenText: "kitap" },
            { id: 37, word: "kitap", imageUrl: "/images/37.png", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    { 
        id: 2, 
        question: "İnce olan hangisi?", 
        questionAudioKey: "q_which_is_thin", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Kitap incedir.', wrong: 'Hayır, kitap kalındır.' },
            en: { correct: 'Yes! The book is thin.', wrong: 'No, the book is thick.' },
            de: { correct: 'Ja! Das Buch ist dünn.', wrong: 'Nein, das Buch ist dick.' },
            fr: { correct: "Oui ! Le livre est fin.", wrong: "Non, le livre est épais." },
            nl: { correct: 'Ja! Het boek is dun.', wrong: 'Nee, het boek is dik.' },
            az: { correct: 'Bəli! Kitab nazikdir.', wrong: 'Xeyr, kitab qalındır.' }
        },
        options: [
            { id: 36, word: "kitap", imageUrl: "/images/36.png", isCorrect: false, audioKey: "kitap", spokenText: "kitap" },
            { id: 37, word: "kitap", imageUrl: "/images/37.png", isCorrect: true, audioKey: "kitap", spokenText: "kitap" }
        ]
    },

    // 2. Kalem
    { 
        id: 3, 
        question: "Kalın olan hangisi?", 
        questionAudioKey: "q_which_is_thick", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Kalem kalındır.', wrong: 'Hayır, kalem incedir.' },
            en: { correct: 'Yes! The pencil is thick.', wrong: 'No, the pencil is thin.' },
            de: { correct: 'Ja! Der Stift ist dick.', wrong: 'Nein, der Stift ist dünn.' },
            fr: { correct: "Oui ! Le crayon est épais.", wrong: "Non, le crayon est fin." },
            nl: { correct: 'Ja! Het potlood is dik.', wrong: 'Nee, het potlood is dun.' },
            az: { correct: 'Bəli! Qələm qalındır.', wrong: 'Xeyr, qələm nazikdir.' }
        },
        options: [
            { id: 121, word: "kalem", imageUrl: "/images/121.png", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 122, word: "kalem", imageUrl: "/images/122.png", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    { 
        id: 4, 
        question: "İnce olan hangisi?", 
        questionAudioKey: "q_which_is_thin", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Kalem incedir.', wrong: 'Hayır, kalem kalındır.' },
            en: { correct: 'Yes! The pencil is thin.', wrong: 'No, the pencil is thick.' },
            de: { correct: 'Ja! Der Stift ist dünn.', wrong: 'Nein, der Stift ist dick.' },
            fr: { correct: "Oui ! Le crayon est fin.", wrong: "Non, le crayon est épais." },
            nl: { correct: 'Ja! Het potlood is dun.', wrong: 'Nee, het potlood is dik.' },
            az: { correct: 'Bəli! Qələm nazikdir.', wrong: 'Xeyr, qələm qalındır.' }
        },
        options: [
            { id: 121, word: "kalem", imageUrl: "/images/121.png", isCorrect: false, audioKey: "kalem", spokenText: "kalem" },
            { id: 122, word: "kalem", imageUrl: "/images/122.png", isCorrect: true, audioKey: "kalem", spokenText: "kalem" }
        ]
    },

    // 3. Fırça
    { 
        id: 5, 
        question: "Kalın olan hangisi?", 
        questionAudioKey: "q_which_is_thick", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Fırça kalındır.', wrong: 'Hayır, fırça incedir.' },
            en: { correct: 'Yes! The brush is thick.', wrong: 'No, the brush is thin.' },
            de: { correct: 'Ja! Der Pinsel ist dick.', wrong: 'Nein, der Pinsel ist dünn.' },
            fr: { correct: "Oui ! Le pinceau est épais.", wrong: "Non, le pinceau est fin." },
            nl: { correct: 'Ja! De kwast is dik.', wrong: 'Nee, de kwast is dun.' },
            az: { correct: 'Bəli! Fırça qalındır.', wrong: 'Xeyr, fırça nazikdir.' }
        },
        options: [
            { id: 539, word: "fırça", imageUrl: "/images/539.png", isCorrect: true, audioKey: "firca", spokenText: "fırça" },
            { id: 467, word: "fırça", imageUrl: "/images/467.png", isCorrect: false, audioKey: "firca", spokenText: "fırça" }
        ]
    },
    { 
        id: 6, 
        question: "İnce olan hangisi?", 
        questionAudioKey: "q_which_is_thin", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Fırça incedir.', wrong: 'Hayır, fırça kalındır.' },
            en: { correct: 'Yes! The brush is thin.', wrong: 'No, the brush is thick.' },
            de: { correct: 'Ja! Der Pinsel ist dünn.', wrong: 'Nein, der Pinsel ist dick.' },
            fr: { correct: "Oui ! Le pinceau est fin.", wrong: "Non, le pinceau est épais." },
            nl: { correct: 'Ja! De kwast is dun.', wrong: 'Nee, de kwast is dik.' },
            az: { correct: 'Bəli! Fırça nazikdir.', wrong: 'Xeyr, fırça qalındır.' }
        },
        options: [
            { id: 539, word: "fırça", imageUrl: "/images/539.png", isCorrect: false, audioKey: "firca", spokenText: "fırça" },
            { id: 467, word: "fırça", imageUrl: "/images/467.png", isCorrect: true, audioKey: "firca", spokenText: "fırça" }
        ]
    },

    // 4. Halat vs İp
    { 
        id: 7, 
        question: "Kalın olan hangisi?", 
        questionAudioKey: "q_which_is_thick", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Halat kalındır.', wrong: 'Hayır, ip incedir.' },
            en: { correct: 'Yes! The rope is thick.', wrong: 'No, the string is thin.' },
            de: { correct: 'Ja! Das Seil ist dick.', wrong: 'Nein, die Schnur ist dünn.' },
            fr: { correct: "Oui ! La corde est épaisse.", wrong: "Non, la ficelle est fine." },
            nl: { correct: 'Ja! Het touw is dik.', wrong: 'Nee, het draadje is dun.' },
            az: { correct: 'Bəli! Kəndir qalındır.', wrong: 'Xeyr, ip nazikdir.' }
        },
        options: [
            { id: 223, word: "halat", imageUrl: "/images/223.png", isCorrect: true, audioKey: "halat", spokenText: "halat" },
            { id: 224, word: "ip", imageUrl: "/images/224.png", isCorrect: false, audioKey: "ip", spokenText: "ip" }
        ]
    },
    { 
        id: 8, 
        question: "İnce olan hangisi?", 
        questionAudioKey: "q_which_is_thin", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! İp incedir.', wrong: 'Hayır, halat kalındır.' },
            en: { correct: 'Yes! The string is thin.', wrong: 'No, the rope is thick.' },
            de: { correct: 'Ja! Die Schnur ist dünn.', wrong: 'Nein, das Seil ist dick.' },
            fr: { correct: "Oui ! La ficelle est fine.", wrong: "Non, la corde est épaisse." },
            nl: { correct: 'Ja! Het draadje is dun.', wrong: 'Nee, het touw is dik.' },
            az: { correct: 'Bəli! İp nazikdir.', wrong: 'Xeyr, kəndir qalındır.' }
        },
        options: [
            { id: 223, word: "halat", imageUrl: "/images/223.png", isCorrect: false, audioKey: "halat", spokenText: "halat" },
            { id: 224, word: "ip", imageUrl: "/images/224.png", isCorrect: true, audioKey: "ip", spokenText: "ip" }
        ]
    },

    // 5. Ağaç Gövdesi vs Dal
    { 
        id: 9, 
        question: "Kalın olan hangisi?", 
        questionAudioKey: "q_which_is_thick", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Ağaç gövdesi kalındır.', wrong: 'Hayır, dal incedir.' },
            en: { correct: 'Yes! The tree trunk is thick.', wrong: 'No, the branch is thin.' },
            de: { correct: 'Ja! Der Baumstamm ist dick.', wrong: 'Nein, der Zweig ist dünn.' },
            fr: { correct: "Oui ! Le tronc d'arbre est épais.", wrong: "Non, la branche est fine." },
            nl: { correct: 'Ja! De boomstam is dik.', wrong: 'Nee, de tak is dun.' },
            az: { correct: 'Bəli! Ağac gövdəsi qalındır.', wrong: 'Xeyr, budaq nazikdir.' }
        },
        options: [
            { id: 537, word: "ağaç gövdesi", imageUrl: "/images/537.png", isCorrect: true, audioKey: "agac_govdesi", spokenText: "ağaç gövdesi" },
            { id: 536, word: "dal", imageUrl: "/images/536.png", isCorrect: false, audioKey: "dal", spokenText: "dal" }
        ]
    },
    { 
        id: 10, 
        question: "İnce olan hangisi?", 
        questionAudioKey: "q_which_is_thin", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Dal incedir.', wrong: 'Hayır, ağaç gövdesi kalındır.' },
            en: { correct: 'Yes! The branch is thin.', wrong: 'No, the tree trunk is thick.' },
            de: { correct: 'Ja! Der Zweig ist dünn.', wrong: 'Nein, der Baumstamm ist dick.' },
            fr: { correct: "Oui ! La branche est fine.", wrong: "Non, le tronc d'arbre est épais." },
            nl: { correct: 'Ja! De tak is dun.', wrong: 'Nee, de boomstam is dik.' },
            az: { correct: 'Bəli! Budaq nazikdir.', wrong: 'Xeyr, ağac gövdəsi qalındır.' }
        },
        options: [
            { id: 537, word: "ağaç gövdesi", imageUrl: "/images/537.png", isCorrect: false, audioKey: "agac_govdesi", spokenText: "ağaç gövdesi" },
            { id: 536, word: "dal", imageUrl: "/images/536.png", isCorrect: true, audioKey: "dal", spokenText: "dal" }
        ]
    },

    // 6. Havlu vs Peçete
    { 
        id: 11, 
        question: "Kalın olan hangisi?", 
        questionAudioKey: "q_which_is_thick", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Havlu kalındır.', wrong: 'Hayır, peçete incedir.' },
            en: { correct: 'Yes! The towel is thick.', wrong: 'No, the napkin is thin.' },
            de: { correct: 'Ja! Das Handtuch ist dick.', wrong: 'Nein, die Serviette ist dünn.' },
            fr: { correct: "Oui ! La serviette est épaisse.", wrong: "Non, la serviette en papier est fine." },
            nl: { correct: 'Ja! De handdoek is dik.', wrong: 'Nee, het servet is dun.' },
            az: { correct: 'Bəli! Dəsmal qalındır.', wrong: 'Xeyr, salfet nazikdir.' }
        },
        options: [
            { id: 410, word: "havlu", imageUrl: "/images/410.png", isCorrect: true, audioKey: "havlu", spokenText: "havlu" },
            { id: 409, word: "peçete", imageUrl: "/images/409.png", isCorrect: false, audioKey: "pecete", spokenText: "peçete" }
        ]
    },
    { 
        id: 12, 
        question: "İnce olan hangisi?", 
        questionAudioKey: "q_which_is_thin", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Peçete incedir.', wrong: 'Hayır, havlu kalındır.' },
            en: { correct: 'Yes! The napkin is thin.', wrong: 'No, the towel is thick.' },
            de: { correct: 'Ja! Die Serviette ist dünn.', wrong: 'Nein, das Handtuch ist dick.' },
            fr: { correct: "Oui ! La serviette en papier est fine.", wrong: "Non, la serviette est épaisse." },
            nl: { correct: 'Ja! Het servet is dun.', wrong: 'Nee, de handdoek is dik.' },
            az: { correct: 'Bəli! Salfet nazikdir.', wrong: 'Xeyr, dəsmal qalındır.' }
        },
        options: [
            { id: 410, word: "havlu", imageUrl: "/images/410.png", isCorrect: false, audioKey: "havlu", spokenText: "havlu" },
            { id: 409, word: "peçete", imageUrl: "/images/409.png", isCorrect: true, audioKey: "pecete", spokenText: "peçete" }
        ]
    },

    // 7. Vida vs Çivi
    { 
        id: 13, 
        question: "Kalın olan hangisi?", 
        questionAudioKey: "q_which_is_thick", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Vida kalındır.', wrong: 'Hayır, çivi incedir.' },
            en: { correct: 'Yes! The screw is thick.', wrong: 'No, the nail is thin.' },
            de: { correct: 'Ja! Die Schraube ist dick.', wrong: 'Nein, der Nagel ist dünn.' },
            fr: { correct: "Oui ! La vis est épaisse.", wrong: "Non, le clou est fin." },
            nl: { correct: 'Ja! De schroef is dik.', wrong: 'Nee, de spijker is dun.' },
            az: { correct: 'Bəli! Vida qalındır.', wrong: 'Xeyr, mıx nazikdir.' }
        },
        options: [
            { id: 53, word: "vida", imageUrl: "/images/53.png", isCorrect: true, audioKey: "vida", spokenText: "vida" },
            { id: 306, word: "çivi", imageUrl: "/images/306.png", isCorrect: false, audioKey: "civi", spokenText: "çivi" }
        ]
    },
    { 
        id: 14, 
        question: "İnce olan hangisi?", 
        questionAudioKey: "q_which_is_thin", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Çivi incedir.', wrong: 'Hayır, vida kalındır.' },
            en: { correct: 'Yes! The nail is thin.', wrong: 'No, the screw is thick.' },
            de: { correct: 'Ja! Der Nagel ist dünn.', wrong: 'Nein, die Schraube ist dick.' },
            fr: { correct: "Oui ! Le clou est fin.", wrong: "Non, la vis est épaisse." },
            nl: { correct: 'Ja! De spijker is dun.', wrong: 'Nee, de schroef is dik.' },
            az: { correct: 'Bəli! Mıx nazikdir.', wrong: 'Xeyr, vida qalındır.' }
        },
        options: [
            { id: 53, word: "vida", imageUrl: "/images/53.png", isCorrect: false, audioKey: "vida", spokenText: "vida" },
            { id: 306, word: "çivi", imageUrl: "/images/306.png", isCorrect: true, audioKey: "civi", spokenText: "çivi" }
        ]
    },

    // 8. Ağaç Gövdesi vs Roka
    { 
        id: 15, 
        question: "Kalın olan hangisi?", 
        questionAudioKey: "q_which_is_thick", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Ağaç gövdesi kalındır.', wrong: 'Hayır, roka incedir.' },
            en: { correct: 'Yes! The tree trunk is thick.', wrong: 'No, the arugula is thin.' },
            de: { correct: 'Ja! Der Baumstamm ist dick.', wrong: 'Nein, der Rucola ist dünn.' },
            fr: { correct: "Oui ! Le tronc d'arbre est épais.", wrong: "Non, la roquette est fine." },
            nl: { correct: 'Ja! De boomstam is dik.', wrong: 'Nee, de rucola is dun.' },
            az: { correct: 'Bəli! Ağac gövdəsi qalındır.', wrong: 'Xeyr, roka nazikdir.' }
        },
        options: [
            { id: 537, word: "ağaç gövdesi", imageUrl: "/images/537.png", isCorrect: true, audioKey: "agac_govdesi", spokenText: "ağaç gövdesi" },
            { id: 704, word: "roka", imageUrl: "/images/704.png", isCorrect: false, audioKey: "roka", spokenText: "roka" }
        ]
    },
    { 
        id: 16, 
        question: "İnce olan hangisi?", 
        questionAudioKey: "q_which_is_thin", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Roka incedir.', wrong: 'Hayır, ağaç gövdesi kalındır.' },
            en: { correct: 'Yes! The arugula is thin.', wrong: 'No, the tree trunk is thick.' },
            de: { correct: 'Ja! Der Rucola ist dünn.', wrong: 'Nein, der Baumstamm ist dick.' },
            fr: { correct: "Oui ! La roquette est fine.", wrong: "Non, le tronc d'arbre est épais." },
            nl: { correct: 'Ja! De rucola is dun.', wrong: 'Nee, de boomstam is dik.' },
            az: { correct: 'Bəli! Roka nazikdir.', wrong: 'Xeyr, ağac gövdəsi qalındır.' }
        },
        options: [
            { id: 537, word: "ağaç gövdesi", imageUrl: "/images/537.png", isCorrect: false, audioKey: "agac_govdesi", spokenText: "ağaç gövdesi" },
            { id: 704, word: "roka", imageUrl: "/images/704.png", isCorrect: true, audioKey: "roka", spokenText: "roka" }
        ]
    },

    // 9. Ansiklopedi vs Kitap
    { 
        id: 17, 
        question: "Kalın olan hangisi?", 
        questionAudioKey: "q_which_is_thick", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Ansiklopedi kalındır.', wrong: 'Hayır, kitap incedir.' },
            en: { correct: 'Yes! The encyclopedia is thick.', wrong: 'No, the book is thin.' },
            de: { correct: 'Ja! Die Enzyklopädie ist dick.', wrong: 'Nein, das Buch ist dünn.' },
            fr: { correct: "Oui ! L'encyclopédie est épaisse.", wrong: "Non, le livre est fin." },
            nl: { correct: 'Ja! De encyclopedie is dik.', wrong: 'Nee, het boek is dun.' },
            az: { correct: 'Bəli! Ensiklopediya qalındır.', wrong: 'Xeyr, kitab nazikdir.' }
        },
        options: [
            { id: 554, word: "ansiklopedi", imageUrl: "/images/554.png", isCorrect: true, audioKey: "ansiklopedi", spokenText: "ansiklopedi" },
            { id: 37, word: "kitap", imageUrl: "/images/37.png", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    { 
        id: 18, 
        question: "İnce olan hangisi?", 
        questionAudioKey: "q_which_is_thin", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Kitap incedir.', wrong: 'Hayır, ansiklopedi kalındır.' },
            en: { correct: 'Yes! The book is thin.', wrong: 'No, the encyclopedia is thick.' },
            de: { correct: 'Ja! Das Buch ist dünn.', wrong: 'Nein, die Enzyklopädie ist dick.' },
            fr: { correct: "Oui ! Le livre est fin.", wrong: "Non, l'encyclopédie est épaisse." },
            nl: { correct: 'Ja! Het boek is dun.', wrong: 'Nee, de encyclopedie is dik.' },
            az: { correct: 'Bəli! Kitab nazikdir.', wrong: 'Xeyr, ensiklopediya qalındır.' }
        },
        options: [
            { id: 554, word: "ansiklopedi", imageUrl: "/images/554.png", isCorrect: false, audioKey: "ansiklopedi", spokenText: "ansiklopedi" },
            { id: 37, word: "kitap", imageUrl: "/images/37.png", isCorrect: true, audioKey: "kitap", spokenText: "kitap" }
        ]
    },

    // 10. Davul Çubuğu vs İğne
    { 
        id: 19, 
        question: "Kalın olan hangisi?", 
        questionAudioKey: "q_which_is_thick", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Çubuk kalındır.', wrong: 'Hayır, iğne incedir.' },
            en: { correct: 'Yes! The stick is thick.', wrong: 'No, the needle is thin.' },
            de: { correct: 'Ja! Der Stock ist dick.', wrong: 'Nein, die Nadel ist dünn.' },
            fr: { correct: "Oui ! Le bâton est épais.", wrong: "Non, l'aiguille est fine." },
            nl: { correct: 'Ja! De stok is dik.', wrong: 'Nee, de naald is dun.' },
            az: { correct: 'Bəli! Çubuq qalındır.', wrong: 'Xeyr, iynə nazikdir.' }
        },
        options: [
            { id: 592, word: "davul çubuğu", imageUrl: "/images/592.png", isCorrect: true, audioKey: "davul_cubugu", spokenText: "davul çubuğu" },
            { id: 528, word: "iğne", imageUrl: "/images/528.png", isCorrect: false, audioKey: "igne", spokenText: "iğne" }
        ]
    },
    { 
        id: 20, 
        question: "İnce olan hangisi?", 
        questionAudioKey: "q_which_is_thin", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! İğne incedir.', wrong: 'Hayır, çubuk kalındır.' },
            en: { correct: 'Yes! The needle is thin.', wrong: 'No, the stick is thick.' },
            de: { correct: 'Ja! Die Nadel ist dünn.', wrong: 'Nein, der Stock ist dick.' },
            fr: { correct: "Oui ! L'aiguille est fine.", wrong: "Non, le bâton est épais." },
            nl: { correct: 'Ja! De naald is dun.', wrong: 'Nee, de stok is dik.' },
            az: { correct: 'Bəli! İynə nazikdir.', wrong: 'Xeyr, çubuq qalındır.' }
        },
        options: [
            { id: 592, word: "davul çubuğu", imageUrl: "/images/592.png", isCorrect: false, audioKey: "davul_cubugu", spokenText: "davul çubuğu" },
            { id: 528, word: "iğne", imageUrl: "/images/528.png", isCorrect: true, audioKey: "igne", spokenText: "iğne" }
        ]
    },

    // 11. Dal
    { 
        id: 21, 
        question: "Kalın olan hangisi?", 
        questionAudioKey: "q_which_is_thick", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Dal kalındır.', wrong: 'Hayır, dal incedir.' },
            en: { correct: 'Yes! The branch is thick.', wrong: 'No, the branch is thin.' },
            de: { correct: 'Ja! Der Zweig ist dick.', wrong: 'Nein, der Zweig ist dünn.' },
            fr: { correct: "Oui ! La branche est épaisse.", wrong: "Non, la branche est fine." },
            nl: { correct: 'Ja! De tak is dik.', wrong: 'Nee, de tak is dun.' },
            az: { correct: 'Bəli! Budaq qalındır.', wrong: 'Xeyr, budaq nazikdir.' }
        },
        options: [
            { id: 886, word: "dal", imageUrl: "/images/886.png", isCorrect: true, audioKey: "dal", spokenText: "dal" },
            { id: 885, word: "dal", imageUrl: "/images/885.png", isCorrect: false, audioKey: "dal", spokenText: "dal" }
        ]
    },
    { 
        id: 22, 
        question: "İnce olan hangisi?", 
        questionAudioKey: "q_which_is_thin", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Dal incedir.', wrong: 'Hayır, dal kalındır.' },
            en: { correct: 'Yes! The branch is thin.', wrong: 'No, the branch is thick.' },
            de: { correct: 'Ja! Der Zweig ist dünn.', wrong: 'Nein, der Zweig ist dick.' },
            fr: { correct: "Oui ! La branche est fine.", wrong: "Non, la branche est épaisse." },
            nl: { correct: 'Ja! De tak is dun.', wrong: 'Nee, de tak is dik.' },
            az: { correct: 'Bəli! Budaq nazikdir.', wrong: 'Xeyr, budaq qalındır.' }
        },
        options: [
            { id: 886, word: "dal", imageUrl: "/images/886.png", isCorrect: false, audioKey: "dal", spokenText: "dal" },
            { id: 885, word: "dal", imageUrl: "/images/885.png", isCorrect: true, audioKey: "dal", spokenText: "dal" }
        ]
    },

    // 12. Kurdele
    { 
        id: 23, 
        question: "Kalın olan hangisi?", 
        questionAudioKey: "q_which_is_thick", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Kurdele kalındır.', wrong: 'Hayır, kurdele incedir.' },
            en: { correct: 'Yes! The ribbon is thick.', wrong: 'No, the ribbon is thin.' },
            de: { correct: 'Ja! Das Band ist dick.', wrong: 'Nein, das Band ist dünn.' },
            fr: { correct: "Oui ! Le ruban est épais.", wrong: "Non, le ruban est fin." },
            nl: { correct: 'Ja! Het lint is dik.', wrong: 'Nee, het lint is dun.' },
            az: { correct: 'Bəli! Lent qalındır.', wrong: 'Xeyr, lent nazikdir.' }
        },
        options: [
            { id: 516, word: "kurdele", imageUrl: "/images/516.png", isCorrect: true, audioKey: "kurdele", spokenText: "kurdele" },
            { id: 517, word: "kurdele", imageUrl: "/images/517.png", isCorrect: false, audioKey: "kurdele", spokenText: "kurdele" }
        ]
    },
    { 
        id: 24, 
        question: "İnce olan hangisi?", 
        questionAudioKey: "q_which_is_thin", 
        activityType: ActivityType.ThinThick, 
        speech: {
            tr: { correct: 'Evet! Kurdele incedir.', wrong: 'Hayır, kurdele kalındır.' },
            en: { correct: 'Yes! The ribbon is thin.', wrong: 'No, the ribbon is thick.' },
            de: { correct: 'Ja! Das Band ist dünn.', wrong: 'Nein, das Band ist dick.' },
            fr: { correct: "Oui ! Le ruban est fin.", wrong: "Non, le ruban est épais." },
            nl: { correct: 'Ja! Het lint is dun.', wrong: 'Nee, het lint is dik.' },
            az: { correct: 'Bəli! Lent nazikdir.', wrong: 'Xeyr, lent qalındır.' }
        },
        options: [
            { id: 516, word: "kurdele", imageUrl: "/images/516.png", isCorrect: false, audioKey: "kurdele", spokenText: "kurdele" },
            { id: 517, word: "kurdele", imageUrl: "/images/517.png", isCorrect: true, audioKey: "kurdele", spokenText: "kurdele" }
        ]
    }
];
