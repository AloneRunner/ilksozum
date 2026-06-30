import { ConceptRound, ActivityType } from '../../../../types';

export const noisyQuietData: ConceptRound[] = [
    // 1. Aslan (Kükreyen vs Uyuyan)
    { 
        id: 283, 
        question: "Gürültülü olan hangisi?", 
        questionAudioKey: "q_which_is_noisy_person", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Kükreyen aslan gürültülüdür.', wrong: 'Hayır, uyuyan aslan sessizdir.' },
            en: { correct: 'Yes! The roaring lion is noisy.', wrong: 'No, the sleeping lion is quiet.' },
            de: { correct: 'Ja! Der brüllende Löwe ist laut.', wrong: 'Nein, der schlafende Löwe ist leise.' },
            fr: { correct: "Oui ! Le lion rugissant est bruyant.", wrong: "Non, le lion endormi est silencieux." },
            nl: { correct: 'Ja! De brullende leeuw is luidruchtig.', wrong: 'Nee, de slapende leeuw is stil.' },
            az: { correct: 'Bəli! Nərildəyən aslan səs-küylüdür.', wrong: 'Xeyr, yatan aslan sakitdir.' }
        },
        options: [
            { id: 199, word: "kükreyen aslan", imageUrl: "/images/199.png", isCorrect: true, audioKey: "kukreyen_aslan", spokenText: "kükreyen aslan" },
            { id: 200, word: "uyuyan aslan", imageUrl: "/images/200.png", isCorrect: false, audioKey: "uyuyan_aslan", spokenText: "uyuyan aslan" }
        ]
    },
    { 
        id: 284, 
        question: "Sessiz olan hangisi?", 
        questionAudioKey: "q_which_is_quiet", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Uyuyan aslan sessizdir.', wrong: 'Hayır, kükreyen aslan gürültülüdür.' },
            en: { correct: 'Yes! The sleeping lion is quiet.', wrong: 'No, the roaring lion is noisy.' },
            de: { correct: 'Ja! Der schlafende Löwe ist leise.', wrong: 'Nein, der brüllende Löwe ist laut.' },
            fr: { correct: "Oui ! Le lion endormi est silencieux.", wrong: "Non, le lion rugissant est bruyant." },
            nl: { correct: 'Ja! De slapende leeuw is stil.', wrong: 'Nee, de brullende leeuw is luidruchtig.' },
            az: { correct: 'Bəli! Yatan aslan sakitdir.', wrong: 'Xeyr, nərildəyən aslan səs-küylüdür.' }
        },
        options: [
            { id: 199, word: "kükreyen aslan", imageUrl: "/images/199.png", isCorrect: false, audioKey: "kukreyen_aslan", spokenText: "kükreyen aslan" },
            { id: 200, word: "uyuyan aslan", imageUrl: "/images/200.png", isCorrect: true, audioKey: "uyuyan_aslan", spokenText: "uyuyan aslan" }
        ]
    },

    // 2. Davul vs Yastık
    { 
        id: 285, 
        question: "Gürültülü olan hangisi?", 
        questionAudioKey: "q_which_is_noisy", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Davul gürültülüdür.', wrong: 'Hayır, yastık sessizdir.' },
            en: { correct: 'Yes! The drum is noisy.', wrong: 'No, the pillow is quiet.' },
            de: { correct: 'Ja! Die Trommel ist laut.', wrong: 'Nein, das Kissen ist leise.' },
            fr: { correct: "Oui ! Le tambour est bruyant.", wrong: "Non, l'oreiller est silencieux." },
            nl: { correct: 'Ja! De trommel is luidruchtig.', wrong: 'Nee, het kussen is stil.' },
            az: { correct: 'Bəli! Təbil səs-küylüdür.', wrong: 'Xeyr, yastıq sakitdir.' }
        },
        options: [
            { id: 72, word: "davul", imageUrl: "/images/72.png", isCorrect: true, audioKey: "davul", spokenText: "davul" },
            { id: 137, word: "yastık", imageUrl: "/images/137.png", isCorrect: false, audioKey: "yastik", spokenText: "yastık" }
        ]
    },
    { 
        id: 286, 
        question: "Sessiz olan hangisi?", 
        questionAudioKey: "q_which_is_quiet", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Yastık sessizdir.', wrong: 'Hayır, davul gürültülüdür.' },
            en: { correct: 'Yes! The pillow is quiet.', wrong: 'No, the drum is noisy.' },
            de: { correct: 'Ja! Das Kissen ist leise.', wrong: 'Nein, die Trommel ist laut.' },
            fr: { correct: "Oui ! L'oreiller est silencieux.", wrong: "Non, le tambour est bruyant." },
            nl: { correct: 'Ja! Het kussen is stil.', wrong: 'Nee, de trommel is luidruchtig.' },
            az: { correct: 'Bəli! Yastıq sakitdir.', wrong: 'Xeyr, təbil səs-küylüdür.' }
        },
        options: [
            { id: 72, word: "davul", imageUrl: "/images/72.png", isCorrect: false, audioKey: "davul", spokenText: "davul" },
            { id: 137, word: "yastık", imageUrl: "/images/137.png", isCorrect: true, audioKey: "yastik", spokenText: "yastık" }
        ]
    },

    // 3. Şimşek vs Tüy
    { 
        id: 287, 
        question: "Gürültülü olan hangisi?", 
        questionAudioKey: "q_which_is_noisy", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Şimşek gürültülüdür.', wrong: 'Hayır, tüy sessizdir.' },
            en: { correct: 'Yes! The lightning is noisy.', wrong: 'No, the feather is quiet.' },
            de: { correct: 'Ja! Der Blitz ist laut.', wrong: 'Nein, die Feder ist leise.' },
            fr: { correct: "Oui ! La foudre est bruyante.", wrong: "Non, la plume est silencieuse." },
            nl: { correct: 'Ja! De bliksem is luidruchtig.', wrong: 'Nee, de veer is stil.' },
            az: { correct: 'Bəli! İldırım səs-küylüdür.', wrong: 'Xeyr, lələk sakitdir.' }
        },
        options: [
            { id: 407, word: "şimşek", imageUrl: "/images/407.png", isCorrect: true, audioKey: "simsek", spokenText: "şimşek" },
            { id: 139, word: "tüy", imageUrl: "/images/139.png", isCorrect: false, audioKey: "tuy", spokenText: "tüy" }
        ]
    },
    { 
        id: 288, 
        question: "Sessiz olan hangisi?", 
        questionAudioKey: "q_which_is_quiet", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Tüy sessizdir.', wrong: 'Hayır, şimşek gürültülüdür.' },
            en: { correct: 'Yes! The feather is quiet.', wrong: 'No, the lightning is noisy.' },
            de: { correct: 'Ja! Die Feder ist leise.', wrong: 'Nein, der Blitz ist laut.' },
            fr: { correct: "Oui ! La plume est silencieuse.", wrong: "Non, la foudre est bruyante." },
            nl: { correct: 'Ja! De veer is stil.', wrong: 'Nee, de bliksem is luidruchtig.' },
            az: { correct: 'Bəli! Lələk sakitdir.', wrong: 'Xeyr, ildırım səs-küylüdür.' }
        },
        options: [
            { id: 407, word: "şimşek", imageUrl: "/images/407.png", isCorrect: false, audioKey: "simsek", spokenText: "şimşek" },
            { id: 139, word: "tüy", imageUrl: "/images/139.png", isCorrect: true, audioKey: "tuy", spokenText: "tüy" }
        ]
    },

    // 4. Traktör vs Kelebek
    { 
        id: 289, 
        question: "Gürültülü olan hangisi?", 
        questionAudioKey: "q_which_is_noisy", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Traktör gürültülüdür.', wrong: 'Hayır, kelebek sessizdir.' },
            en: { correct: 'Yes! The tractor is noisy.', wrong: 'No, the butterfly is quiet.' },
            de: { correct: 'Ja! Der Traktor ist laut.', wrong: 'Nein, der Schmetterling ist leise.' },
            fr: { correct: "Oui ! Le tracteur est bruyant.", wrong: "Non, le papillon est silencieux." },
            nl: { correct: 'Ja! De tractor is luidruchtig.', wrong: 'Nee, de vlinder is stil.' },
            az: { correct: 'Bəli! Traktor səs-küylüdür.', wrong: 'Xeyr, kəpənək sakitdir.' }
        },
        options: [
            { id: 289, word: "traktör", imageUrl: "/images/289.png", isCorrect: true, audioKey: "traktor", spokenText: "traktör" },
            { id: 274, word: "kelebek", imageUrl: "/images/274.png", isCorrect: false, audioKey: "kelebek", spokenText: "kelebek" }
        ]
    },
    { 
        id: 290, 
        question: "Sessiz olan hangisi?", 
        questionAudioKey: "q_which_is_quiet", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Kelebek sessizdir.', wrong: 'Hayır, traktör gürültülüdür.' },
            en: { correct: 'Yes! The butterfly is quiet.', wrong: 'No, the tractor is noisy.' },
            de: { correct: 'Ja! Der Schmetterling ist leise.', wrong: 'Nein, der Traktor ist laut.' },
            fr: { correct: "Oui ! Le papillon est silencieux.", wrong: "Non, le tracteur est bruyant." },
            nl: { correct: 'Ja! De vlinder is stil.', wrong: 'Nee, de tractor is luidruchtig.' },
            az: { correct: 'Bəli! Kəpənək sakitdir.', wrong: 'Xeyr, traktor səs-küylüdür.' }
        },
        options: [
            { id: 289, word: "traktör", imageUrl: "/images/289.png", isCorrect: false, audioKey: "traktor", spokenText: "traktör" },
            { id: 274, word: "kelebek", imageUrl: "/images/274.png", isCorrect: true, audioKey: "kelebek", spokenText: "kelebek" }
        ]
    },

    // 5. Tren vs Yaprak
    { 
        id: 291, 
        question: "Gürültülü olan hangisi?", 
        questionAudioKey: "q_which_is_noisy", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Tren gürültülüdür.', wrong: 'Hayır, yaprak sessizdir.' },
            en: { correct: 'Yes! The train is noisy.', wrong: 'No, the leaf is quiet.' },
            de: { correct: 'Ja! Der Zug ist laut.', wrong: 'Nein, das Blatt ist leise.' },
            fr: { correct: "Oui ! Le train est bruyant.", wrong: "Non, la feuille est silencieuse." },
            nl: { correct: 'Ja! De trein is luidruchtig.', wrong: 'Nee, het blad is stil.' },
            az: { correct: 'Bəli! Qatar səs-küylüdür.', wrong: 'Xeyr, yarpaq sakitdir.' }
        },
        options: [
            { id: 106, word: "tren", imageUrl: "/images/106.png", isCorrect: true, audioKey: "tren", spokenText: "tren" },
            { id: 117, word: "yaprak", imageUrl: "/images/117.png", isCorrect: false, audioKey: "yaprak", spokenText: "yaprak" }
        ]
    },
    { 
        id: 292, 
        question: "Sessiz olan hangisi?", 
        questionAudioKey: "q_which_is_quiet", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Yaprak sessizdir.', wrong: 'Hayır, tren gürültülüdür.' },
            en: { correct: 'Yes! The leaf is quiet.', wrong: 'No, the train is noisy.' },
            de: { correct: 'Ja! Das Blatt ist leise.', wrong: 'Nein, der Zug ist laut.' },
            fr: { correct: "Oui ! La feuille est silencieuse.", wrong: "Non, le train est bruyant." },
            nl: { correct: 'Ja! Het blad is stil.', wrong: 'Nee, de trein is luidruchtig.' },
            az: { correct: 'Bəli! Yarpaq sakitdir.', wrong: 'Xeyr, qatar səs-küylüdür.' }
        },
        options: [
            { id: 106, word: "tren", imageUrl: "/images/106.png", isCorrect: false, audioKey: "tren", spokenText: "tren" },
            { id: 117, word: "yaprak", imageUrl: "/images/117.png", isCorrect: true, audioKey: "yaprak", spokenText: "yaprak" }
        ]
    },

    // 6. Kamyon vs Tüy
    { 
        id: 293, 
        question: "Gürültülü olan hangisi?", 
        questionAudioKey: "q_which_is_noisy", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Kamyon gürültülüdür.', wrong: 'Hayır, tüy sessizdir.' },
            en: { correct: 'Yes! The truck is noisy.', wrong: 'No, the feather is quiet.' },
            de: { correct: 'Ja! Der Lastwagen ist laut.', wrong: 'Nein, die Feder ist leise.' },
            fr: { correct: "Oui ! Le camion est bruyant.", wrong: "Non, la plume est silencieuse." },
            nl: { correct: 'Ja! De vrachtwagen is luidruchtig.', wrong: 'Nee, de veer is stil.' },
            az: { correct: 'Bəli! Yük maşını səs-küylüdür.', wrong: 'Xeyr, lələk sakitdir.' }
        },
        options: [
            { id: 288, word: "kamyon", imageUrl: "/images/288.png", isCorrect: true, audioKey: "kamyon", spokenText: "kamyon" },
            { id: 139, word: "tüy", imageUrl: "/images/139.png", isCorrect: false, audioKey: "tuy", spokenText: "tüy" }
        ]
    },
    { 
        id: 294, 
        question: "Sessiz olan hangisi?", 
        questionAudioKey: "q_which_is_quiet", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Tüy sessizdir.', wrong: 'Hayır, kamyon gürültülüdür.' },
            en: { correct: 'Yes! The feather is quiet.', wrong: 'No, the truck is noisy.' },
            de: { correct: 'Ja! Die Feder ist leise.', wrong: 'Nein, der Lastwagen ist laut.' },
            fr: { correct: "Oui ! La plume est silencieuse.", wrong: "Non, le camion est bruyant." },
            nl: { correct: 'Ja! De veer is stil.', wrong: 'Nee, de vrachtwagen is luidruchtig.' },
            az: { correct: 'Bəli! Lələk sakitdir.', wrong: 'Xeyr, yük maşını səs-küylüdür.' }
        },
        options: [
            { id: 288, word: "kamyon", imageUrl: "/images/288.png", isCorrect: false, audioKey: "kamyon", spokenText: "kamyon" },
            { id: 139, word: "tüy", imageUrl: "/images/139.png", isCorrect: true, audioKey: "tuy", spokenText: "tüy" }
        ]
    },

    // 7. Roket vs Yastık
    { 
        id: 295, 
        question: "Gürültülü olan hangisi?", 
        questionAudioKey: "q_which_is_noisy", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Roket gürültülüdür.', wrong: 'Hayır, yastık sessizdir.' },
            en: { correct: 'Yes! The rocket is noisy.', wrong: 'No, the pillow is quiet.' },
            de: { correct: 'Ja! Die Rakete ist laut.', wrong: 'Nein, das Kissen ist leise.' },
            fr: { correct: "Oui ! La fusée est bruyante.", wrong: "Non, l'oreiller est silencieux." },
            nl: { correct: 'Ja! De raket is luidruchtig.', wrong: 'Nee, het kussen is stil.' },
            az: { correct: 'Bəli! Raket səs-küylüdür.', wrong: 'Xeyr, yastıq sakitdir.' }
        },
        options: [
            { id: 204, word: "roket", imageUrl: "/images/204.png", isCorrect: true, audioKey: "roket", spokenText: "roket" },
            { id: 137, word: "yastık", imageUrl: "/images/137.png", isCorrect: false, audioKey: "yastik", spokenText: "yastık" }
        ]
    },
    { 
        id: 296, 
        question: "Sessiz olan hangisi?", 
        questionAudioKey: "q_which_is_quiet", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Yastık sessizdir.', wrong: 'Hayır, roket gürültülüdür.' },
            en: { correct: 'Yes! The pillow is quiet.', wrong: 'No, the rocket is noisy.' },
            de: { correct: 'Ja! Das Kissen ist leise.', wrong: 'Nein, die Rakete ist laut.' },
            fr: { correct: "Oui ! L'oreiller est silencieux.", wrong: "Non, la fusée est bruyante." },
            nl: { correct: 'Ja! Het kussen is stil.', wrong: 'Nee, de raket is luidruchtig.' },
            az: { correct: 'Bəli! Yastıq sakitdir.', wrong: 'Xeyr, raket səs-küylüdür.' }
        },
        options: [
            { id: 204, word: "roket", imageUrl: "/images/204.png", isCorrect: false, audioKey: "roket", spokenText: "roket" },
            { id: 137, word: "yastık", imageUrl: "/images/137.png", isCorrect: true, audioKey: "yastik", spokenText: "yastık" }
        ]
    },

    // 8. Davul vs Kitap
    { 
        id: 297, 
        question: "Gürültülü olan hangisi?", 
        questionAudioKey: "q_which_is_noisy", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Davul gürültülüdür.', wrong: 'Hayır, kitap sessizdir.' },
            en: { correct: 'Yes! The drum is noisy.', wrong: 'No, the book is quiet.' },
            de: { correct: 'Ja! Die Trommel ist laut.', wrong: 'Nein, das Buch ist leise.' },
            fr: { correct: "Oui ! Le tambour est bruyant.", wrong: "Non, le livre est silencieux." },
            nl: { correct: 'Ja! De trommel is luidruchtig.', wrong: 'Nee, het boek is stil.' },
            az: { correct: 'Bəli! Təbil səs-küylüdür.', wrong: 'Xeyr, kitab sakitdir.' }
        },
        options: [
            { id: 72, word: "davul", imageUrl: "/images/72.png", isCorrect: true, audioKey: "davul", spokenText: "davul" },
            { id: 37, word: "kitap", imageUrl: "/images/37.png", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    { 
        id: 298, 
        question: "Sessiz olan hangisi?", 
        questionAudioKey: "q_which_is_quiet", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Kitap sessizdir.', wrong: 'Hayır, davul gürültülüdür.' },
            en: { correct: 'Yes! The book is quiet.', wrong: 'No, the drum is noisy.' },
            de: { correct: 'Ja! Das Buch ist leise.', wrong: 'Nein, die Trommel ist laut.' },
            fr: { correct: "Oui ! Le livre est silencieux.", wrong: "Non, le tambour est bruyant." },
            nl: { correct: 'Ja! Het boek is stil.', wrong: 'Nee, de trommel is luidruchtig.' },
            az: { correct: 'Bəli! Kitab sakitdir.', wrong: 'Xeyr, təbil səs-küylüdür.' }
        },
        options: [
            { id: 72, word: "davul", imageUrl: "/images/72.png", isCorrect: false, audioKey: "davul", spokenText: "davul" },
            { id: 37, word: "kitap", imageUrl: "/images/37.png", isCorrect: true, audioKey: "kitap", spokenText: "kitap" }
        ]
    },

    // 9. Gitar vs Fırça
    { 
        id: 299, 
        question: "Gürültülü olan hangisi?", 
        questionAudioKey: "q_which_is_noisy", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Gitar gürültülüdür.', wrong: 'Hayır, fırça sessizdir.' },
            en: { correct: 'Yes! The guitar is noisy.', wrong: 'No, the brush is quiet.' },
            de: { correct: 'Ja! Die Gitarre ist laut.', wrong: 'Nein, der Pinsel ist leise.' },
            fr: { correct: "Oui ! La guitare est bruyante.", wrong: "Non, le pinceau est silencieux." },
            nl: { correct: 'Ja! De gitaar is luidruchtig.', wrong: 'Nee, de kwast is stil.' },
            az: { correct: 'Bəli! Gitara səs-küylüdür.', wrong: 'Xeyr, fırça sakitdir.' }
        },
        options: [
            { id: 180, word: "gitar", imageUrl: "/images/180.png", isCorrect: true, audioKey: "gitar", spokenText: "gitar" },
            { id: 539, word: "fırça", imageUrl: "/images/539.png", isCorrect: false, audioKey: "firca", spokenText: "fırça" }
        ]
    },
    { 
        id: 300, 
        question: "Sessiz olan hangisi?", 
        questionAudioKey: "q_which_is_quiet", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Fırça sessizdir.', wrong: 'Hayır, gitar gürültülüdür.' },
            en: { correct: 'Yes! The brush is quiet.', wrong: 'No, the guitar is noisy.' },
            de: { correct: 'Ja! Der Pinsel ist leise.', wrong: 'Nein, die Gitarre ist laut.' },
            fr: { correct: "Oui ! Le pinceau est silencieux.", wrong: "Non, la guitare est bruyante." },
            nl: { correct: 'Ja! De kwast is stil.', wrong: 'Nee, de gitaar is luidruchtig.' },
            az: { correct: 'Bəli! Fırça sakitdir.', wrong: 'Xeyr, gitara səs-küylüdür.' }
        },
        options: [
            { id: 180, word: "gitar", imageUrl: "/images/180.png", isCorrect: false, audioKey: "gitar", spokenText: "gitar" },
            { id: 539, word: "fırça", imageUrl: "/images/539.png", isCorrect: true, audioKey: "firca", spokenText: "fırça" }
        ]
    },

    // 10. Düdük vs Pamuk
    { 
        id: 19, 
        question: "Gürültülü olan hangisi?", 
        questionAudioKey: "q_which_is_noisy", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Düdük gürültülüdür.', wrong: 'Hayır, pamuk sessizdir.' },
            en: { correct: 'Yes! The whistle is noisy.', wrong: 'No, the cotton is quiet.' },
            de: { correct: 'Ja! Die Pfeife ist laut.', wrong: 'Nein, die Baumwolle ist leise.' },
            fr: { correct: "Oui ! Le sifflet est bruyant.", wrong: "Non, le coton est silencieux." },
            nl: { correct: 'Ja! De fluit is luidruchtig.', wrong: 'Nee, het katoen is stil.' },
            az: { correct: 'Bəli! Fit səs-küylüdür.', wrong: 'Xeyr, pambıq sakitdir.' }
        },
        options: [
            { id: 427, word: "düdük", imageUrl: "/images/427.png", isCorrect: true, audioKey: "duduk", spokenText: "düdük" },
            { id: 27, word: "pamuk", imageUrl: "/images/27.png", isCorrect: false, audioKey: "pamuk", spokenText: "pamuk" }
        ]
    },
    { 
        id: 20, 
        question: "Sessiz olan hangisi?", 
        questionAudioKey: "q_which_is_quiet", 
        activityType: ActivityType.NoisyQuiet, 
        speech: {
            tr: { correct: 'Evet! Pamuk sessizdir.', wrong: 'Hayır, düdük gürültülüdür.' },
            en: { correct: 'Yes! The cotton is quiet.', wrong: 'No, the whistle is noisy.' },
            de: { correct: 'Ja! Die Baumwolle ist leise.', wrong: 'Nein, die Pfeife ist laut.' },
            fr: { correct: "Oui ! Le coton est silencieux.", wrong: "Non, le sifflet est bruyant." },
            nl: { correct: 'Ja! Het katoen is stil.', wrong: 'Nee, de fluit is luidruchtig.' },
            az: { correct: 'Bəli! Pambıq sakitdir.', wrong: 'Xeyr, fit səs-küylüdür.' }
        },
        options: [
            { id: 427, word: "düdük", imageUrl: "/images/427.png", isCorrect: false, audioKey: "duduk", spokenText: "düdük" },
            { id: 27, word: "pamuk", imageUrl: "/images/27.png", isCorrect: true, audioKey: "pamuk", spokenText: "pamuk" }
        ]
    },
];