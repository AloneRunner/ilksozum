import { ConceptRound, ActivityType } from '../../../../types';

export const tembelCaliskanData: ConceptRound[] = [
    // 1. Ağustos Böceği vs Karınca
    { 
        id: 1, 
        question: "Tembel olan hangisi?", 
        questionAudioKey: "q_which_is_lazy_person", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Ağustos böceği tembeldir.', wrong: 'Hayır, karınca çalışkandır.' },
            en: { correct: 'Yes! The cicada is lazy.', wrong: 'No, the ant is hardworking.' },
            de: { correct: 'Ja! Die Grille ist faul.', wrong: 'Nein, die Ameise ist fleißig.' },
            fr: { correct: "Oui ! La cigale est paresseuse.", wrong: "Non, la fourmi est travailleuse." },
            nl: { correct: 'Ja! De cicade is lui.', wrong: 'Nee, de mier is hardwerkend.' },
            az: { correct: 'Bəli! Cırcırama tənbəldir.', wrong: 'Xeyr, qarışqa çalışqandır.' }
        },
        options: [
            { id: 348, word: "ağustos böceği", imageUrl: "/images/348.png", isCorrect: true, audioKey: "agustos_bocegi", spokenText: "ağustos böceği" },
            { id: 349, word: "karınca", imageUrl: "/images/349.png", isCorrect: false, audioKey: "karinca", spokenText: "karınca" }
        ]
    },
    { 
        id: 2, 
        question: "Çalışkan olan hangisi?", 
        questionAudioKey: "q_which_is_hardworking", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Karınca çalışkandır.', wrong: 'Hayır, ağustos böceği tembeldir.' },
            en: { correct: 'Yes! The ant is hardworking.', wrong: 'No, the cicada is lazy.' },
            de: { correct: 'Ja! Die Ameise ist fleißig.', wrong: 'Nein, die Grille ist faul.' },
            fr: { correct: "Oui ! La fourmi est travailleuse.", wrong: "Non, la cigale est paresseuse." },
            nl: { correct: 'Ja! De mier is hardwerkend.', wrong: 'Nee, de cicade is lui.' },
            az: { correct: 'Bəli! Qarışqa çalışqandır.', wrong: 'Xeyr, cırcırama tənbəldir.' }
        },
        options: [
            { id: 348, word: "ağustos böceği", imageUrl: "/images/348.png", isCorrect: false, audioKey: "agustos_bocegi", spokenText: "ağustos böceği" },
            { id: 349, word: "karınca", imageUrl: "/images/349.png", isCorrect: true, audioKey: "karinca", spokenText: "karınca" }
        ]
    },

    // 2. Tembel Hayvan vs Kunduz
    { 
        id: 3, 
        question: "Tembel olan hangisi?", 
        questionAudioKey: "q_which_is_lazy", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Tembel hayvan tembeldir.', wrong: 'Hayır, kunduz çalışkandır.' },
            en: { correct: 'Yes! The sloth is lazy.', wrong: 'No, the beaver is hardworking.' },
            de: { correct: 'Ja! Das Faultier ist faul.', wrong: 'Nein, der Biber ist fleißig.' },
            fr: { correct: "Oui ! Le paresseux est paresseux.", wrong: "Non, le castor est travailleur." },
            nl: { correct: 'Ja! De luiaard is lui.', wrong: 'Nee, de bever is hardwerkend.' },
            az: { correct: 'Bəli! Tənbəl heyvan tənbəldir.', wrong: 'Xeyr, qunduz çalışqandır.' }
        },
        options: [
            { id: 684, word: "tembel hayvan", imageUrl: "/images/684.png", isCorrect: true, audioKey: "tembel_hayvan", spokenText: "tembel hayvan" },
            { id: 680, word: "kunduz", imageUrl: "/images/680.png", isCorrect: false, audioKey: "kunduz", spokenText: "kunduz" }
        ]
    },
    { 
        id: 4, 
        question: "Çalışkan olan hangisi?", 
        questionAudioKey: "q_which_is_hardworking", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Kunduz çalışkandır.', wrong: 'Hayır, tembel hayvan tembeldir.' },
            en: { correct: 'Yes! The beaver is hardworking.', wrong: 'No, the sloth is lazy.' },
            de: { correct: 'Ja! Der Biber ist fleißig.', wrong: 'Nein, das Faultier ist faul.' },
            fr: { correct: "Oui ! Le castor est travailleur.", wrong: "Non, le paresseux est paresseux." },
            nl: { correct: 'Ja! De bever is hardwerkend.', wrong: 'Nee, de luiaard is lui.' },
            az: { correct: 'Bəli! Qunduz çalışqandır.', wrong: 'Xeyr, tənbəl heyvan tənbəldir.' }
        },
        options: [
            { id: 684, word: "tembel hayvan", imageUrl: "/images/684.png", isCorrect: false, audioKey: "tembel_hayvan", spokenText: "tembel hayvan" },
            { id: 680, word: "kunduz", imageUrl: "/images/680.png", isCorrect: true, audioKey: "kunduz", spokenText: "kunduz" }
        ]
    },

    // 3. Öğrenci (Tembel vs Çalışkan)
    { 
        id: 5, 
        question: "Tembel olan hangisi?", 
        questionAudioKey: "q_which_is_lazy", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Bu öğrenci tembeldir.', wrong: 'Hayır, bu öğrenci çalışkandır.' },
            en: { correct: 'Yes! This student is lazy.', wrong: 'No, this student is hardworking.' },
            de: { correct: 'Ja! Dieser Schüler ist faul.', wrong: 'Nein, dieser Schüler ist fleißig.' },
            fr: { correct: "Oui ! Cet élève est paresseux.", wrong: "Non, cet élève est travailleur." },
            nl: { correct: 'Ja! Deze student is lui.', wrong: 'Nee, deze student is hardwerkend.' },
            az: { correct: 'Bəli! Bu şagird tənbəldir.', wrong: 'Xeyr, bu şagird çalışqandır.' }
        },
        options: [
            { id: 676, word: "öğrenci", imageUrl: "/images/676.png", isCorrect: true, audioKey: "ogrenci", spokenText: "öğrenci" },
            { id: 677, word: "öğrenci", imageUrl: "/images/677.png", isCorrect: false, audioKey: "ogrenci", spokenText: "öğrenci" }
        ]
    },
    { 
        id: 6, 
        question: "Çalışkan olan hangisi?", 
        questionAudioKey: "q_which_is_hardworking", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Bu öğrenci çalışkandır.', wrong: 'Hayır, bu öğrenci tembeldir.' },
            en: { correct: 'Yes! This student is hardworking.', wrong: 'No, this student is lazy.' },
            de: { correct: 'Ja! Dieser Schüler ist fleißig.', wrong: 'Nein, dieser Schüler ist faul.' },
            fr: { correct: "Oui ! Cet élève est travailleur.", wrong: "Non, cet élève est paresseux." },
            nl: { correct: 'Ja! Deze student is hardwerkend.', wrong: 'Nee, deze student is lui.' },
            az: { correct: 'Bəli! Bu şagird çalışqandır.', wrong: 'Xeyr, bu şagird tənbəldir.' }
        },
        options: [
            { id: 676, word: "öğrenci", imageUrl: "/images/676.png", isCorrect: false, audioKey: "ogrenci", spokenText: "öğrenci" },
            { id: 677, word: "öğrenci", imageUrl: "/images/677.png", isCorrect: true, audioKey: "ogrenci", spokenText: "öğrenci" }
        ]
    },

    // 4. Panda vs Arı
    { 
        id: 7, 
        question: "Tembel olan hangisi?", 
        questionAudioKey: "q_which_is_lazy", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Panda tembeldir.', wrong: 'Hayır, arı çalışkandır.' },
            en: { correct: 'Yes! The panda is lazy.', wrong: 'No, the bee is hardworking.' },
            de: { correct: 'Ja! Der Panda ist faul.', wrong: 'Nein, die Biene ist fleißig.' },
            fr: { correct: "Oui ! Le panda est paresseux.", wrong: "Non, l'abeille est travailleuse." },
            nl: { correct: 'Ja! De panda is lui.', wrong: 'Nee, de bij is hardwerkend.' },
            az: { correct: 'Bəli! Panda tənbəldir.', wrong: 'Xeyr, arı çalışqandır.' }
        },
        options: [
            { id: 320, word: "panda", imageUrl: "/images/320.png", isCorrect: true, audioKey: "panda", spokenText: "panda" },
            { id: 273, word: "arı", imageUrl: "/images/273.png", isCorrect: false, audioKey: "ari", spokenText: "arı" }
        ]
    },
    { 
        id: 8, 
        question: "Çalışkan olan hangisi?", 
        questionAudioKey: "q_which_is_hardworking", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Arı çalışkandır.', wrong: 'Hayır, panda tembeldir.' },
            en: { correct: 'Yes! The bee is hardworking.', wrong: 'No, the panda is lazy.' },
            de: { correct: 'Ja! Die Biene ist fleißig.', wrong: 'Nein, der Panda ist faul.' },
            fr: { correct: "Oui ! L'abeille est travailleuse.", wrong: "Non, le panda est paresseux." },
            nl: { correct: 'Ja! De bij is hardwerkend.', wrong: 'Nee, de panda is lui.' },
            az: { correct: 'Bəli! Arı çalışqandır.', wrong: 'Xeyr, panda tənbəldir.' }
        },
        options: [
            { id: 320, word: "panda", imageUrl: "/images/320.png", isCorrect: false, audioKey: "panda", spokenText: "panda" },
            { id: 273, word: "arı", imageUrl: "/images/273.png", isCorrect: true, audioKey: "ari", spokenText: "arı" }
        ]
    },

    // 5. Kaplumbağa vs Horoz
    { 
        id: 9, 
        question: "Tembel olan hangisi?", 
        questionAudioKey: "q_which_is_lazy", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Kaplumbağa tembeldir.', wrong: 'Hayır, horoz çalışkandır.' },
            en: { correct: 'Yes! The turtle is lazy.', wrong: 'No, the rooster is hardworking.' },
            de: { correct: 'Ja! Die Schildkröte ist faul.', wrong: 'Nein, der Hahn ist fleißig.' },
            fr: { correct: "Oui ! La tortue est paresseuse.", wrong: "Non, le coq est travailleur." },
            nl: { correct: 'Ja! De schildpad is lui.', wrong: 'Nee, de haan is hardwerkend.' },
            az: { correct: 'Bəli! Tısbağa tənbəldir.', wrong: 'Xeyr, xoruz çalışqandır.' }
        },
        options: [
            { id: 42, word: "kaplumbağa", imageUrl: "/images/42.webp", isCorrect: true, audioKey: "kaplumbaga", spokenText: "kaplumbağa" },
            { id: 102, word: "horoz", imageUrl: "/images/102.png", isCorrect: false, audioKey: "horoz", spokenText: "horoz" }
        ]
    },
    { 
        id: 10, 
        question: "Çalışkan olan hangisi?", 
        questionAudioKey: "q_which_is_hardworking", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Horoz çalışkandır.', wrong: 'Hayır, kaplumbağa tembeldir.' },
            en: { correct: 'Yes! The rooster is hardworking.', wrong: 'No, the turtle is lazy.' },
            de: { correct: 'Ja! Der Hahn ist fleißig.', wrong: 'Nein, die Schildkröte ist faul.' },
            fr: { correct: "Oui ! Le coq est travailleur.", wrong: "Non, la tortue est paresseuse." },
            nl: { correct: 'Ja! De haan is hardwerkend.', wrong: 'Nee, de schildpad is lui.' },
            az: { correct: 'Bəli! Xoruz çalışqandır.', wrong: 'Xeyr, tısbağa tənbəldir.' }
        },
        options: [
            { id: 42, word: "kaplumbağa", imageUrl: "/images/42.webp", isCorrect: false, audioKey: "kaplumbaga", spokenText: "kaplumbağa" },
            { id: 102, word: "horoz", imageUrl: "/images/102.png", isCorrect: true, audioKey: "horoz", spokenText: "horoz" }
        ]
    },

    // 6. Tembel Adam vs Atlet
    { 
        id: 11, 
        question: "Tembel olan hangisi?", 
        questionAudioKey: "q_which_is_lazy", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Adam tembeldir.', wrong: 'Hayır, atlet çalışkandır.' },
            en: { correct: 'Yes! The man is lazy.', wrong: 'No, the athlete is hardworking.' },
            de: { correct: 'Ja! Der Mann ist faul.', wrong: 'Nein, der Sportler ist fleißig.' },
            fr: { correct: "Oui ! L'homme est paresseux.", wrong: "Non, l'athlète est travailleur." },
            nl: { correct: 'Ja! De man is lui.', wrong: 'Nee, de atleet is hardwerkend.' },
            az: { correct: 'Bəli! Adam tənbəldir.', wrong: 'Xeyr, atlet çalışqandır.' }
        },
        options: [
            { id: 683, word: "adam", imageUrl: "/images/683.png", isCorrect: true, audioKey: "adam", spokenText: "adam" },
            { id: 709, word: "atlet", imageUrl: "/images/709.png", isCorrect: false, audioKey: "atlet", spokenText: "atlet" }
        ]
    },
    { 
        id: 12, 
        question: "Çalışkan olan hangisi?", 
        questionAudioKey: "q_which_is_hardworking", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Atlet çalışkandır.', wrong: 'Hayır, adam tembeldir.' },
            en: { correct: 'Yes! The athlete is hardworking.', wrong: 'No, the man is lazy.' },
            de: { correct: 'Ja! Der Sportler ist fleißig.', wrong: 'Nein, der Mann ist faul.' },
            fr: { correct: "Oui ! L'athlète est travailleur.", wrong: "Non, l'homme est paresseux." },
            nl: { correct: 'Ja! De atleet is hardwerkend.', wrong: 'Nee, de man is lui.' },
            az: { correct: 'Bəli! Atlet çalışqandır.', wrong: 'Xeyr, adam tənbəldir.' }
        },
        options: [
            { id: 683, word: "adam", imageUrl: "/images/683.png", isCorrect: false, audioKey: "adam", spokenText: "adam" },
            { id: 709, word: "atlet", imageUrl: "/images/709.png", isCorrect: true, audioKey: "atlet", spokenText: "atlet" }
        ]
    },

    // 7. Koala vs At
    { 
        id: 13, 
        question: "Tembel olan hangisi?", 
        questionAudioKey: "q_which_is_lazy", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Koala tembeldir.', wrong: 'Hayır, at çalışkandır.' },
            en: { correct: 'Yes! The koala is lazy.', wrong: 'No, the horse is hardworking.' },
            de: { correct: 'Ja! Der Koala ist faul.', wrong: 'Nein, das Pferd ist fleißig.' },
            fr: { correct: "Oui ! Le koala est paresseux.", wrong: "Non, le cheval est travailleur." },
            nl: { correct: 'Ja! De koala is lui.', wrong: 'Nee, het paard is hardwerkend.' },
            az: { correct: 'Bəli! Koala tənbəldir.', wrong: 'Xeyr, at çalışqandır.' }
        },
        options: [
            { id: 681, word: "koala", imageUrl: "/images/681.png", isCorrect: true, audioKey: "koala", spokenText: "koala" },
            { id: 290, word: "at", imageUrl: "/images/290.png", isCorrect: false, audioKey: "at", spokenText: "at" }
        ]
    },
    { 
        id: 14, 
        question: "Çalışkan olan hangisi?", 
        questionAudioKey: "q_which_is_hardworking", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! At çalışkandır.', wrong: 'Hayır, koala tembeldir.' },
            en: { correct: 'Yes! The horse is hardworking.', wrong: 'No, the koala is lazy.' },
            de: { correct: 'Ja! Das Pferd ist fleißig.', wrong: 'Nein, der Koala ist faul.' },
            fr: { correct: "Oui ! Le cheval est travailleur.", wrong: "Non, le koala est paresseux." },
            nl: { correct: 'Ja! Het paard is hardwerkend.', wrong: 'Nee, de koala is lui.' },
            az: { correct: 'Bəli! At çalışqandır.', wrong: 'Xeyr, koala tənbəldir.' }
        },
        options: [
            { id: 681, word: "koala", imageUrl: "/images/681.png", isCorrect: false, audioKey: "koala", spokenText: "koala" },
            { id: 290, word: "at", imageUrl: "/images/290.png", isCorrect: true, audioKey: "at", spokenText: "at" }
        ]
    },

    // 8. Uykulu Çocuk vs Çiftçi
    { 
        id: 15, 
        question: "Tembel olan hangisi?", 
        questionAudioKey: "q_which_is_lazy", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Çocuk tembeldir.', wrong: 'Hayır, çiftçi çalışkandır.' },
            en: { correct: 'Yes! The child is lazy.', wrong: 'No, the farmer is hardworking.' },
            de: { correct: 'Ja! Das Kind ist faul.', wrong: 'Nein, der Bauer ist fleißig.' },
            fr: { correct: "Oui ! L'enfant est paresseux.", wrong: "Non, le fermier est travailleur." },
            nl: { correct: 'Ja! Het kind is lui.', wrong: 'Nee, de boer is hardwerkend.' },
            az: { correct: 'Bəli! Uşaq tənbəldir.', wrong: 'Xeyr, fermer çalışqandır.' }
        },
        options: [
            { id: 504, word: "çocuk", imageUrl: "/images/504.png", isCorrect: true, audioKey: "cocuk", spokenText: "çocuk" },
            { id: 388, word: "çiftçi", imageUrl: "/images/388.png", isCorrect: false, audioKey: "ciftci", spokenText: "çiftçi" }
        ]
    },
    { 
        id: 16, 
        question: "Çalışkan olan hangisi?", 
        questionAudioKey: "q_which_is_hardworking", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Çiftçi çalışkandır.', wrong: 'Hayır, çocuk tembeldir.' },
            en: { correct: 'Yes! The farmer is hardworking.', wrong: 'No, the child is lazy.' },
            de: { correct: 'Ja! Der Bauer ist fleißig.', wrong: 'Nein, das Kind ist faul.' },
            fr: { correct: "Oui ! Le fermier est travailleur.", wrong: "Non, l'enfant est paresseux." },
            nl: { correct: 'Ja! De boer is hardwerkend.', wrong: 'Nee, het kind is lui.' },
            az: { correct: 'Bəli! Fermer çalışqandır.', wrong: 'Xeyr, uşaq tənbəldir.' }
        },
        options: [
            { id: 504, word: "çocuk", imageUrl: "/images/504.png", isCorrect: false, audioKey: "cocuk", spokenText: "çocuk" },
            { id: 388, word: "çiftçi", imageUrl: "/images/388.png", isCorrect: true, audioKey: "ciftci", spokenText: "çiftçi" }
        ]
    },

    // 9. Tembel Kedi vs Çalışkan Köpek
    { 
        id: 17, 
        question: "Tembel olan hangisi?", 
        questionAudioKey: "q_which_is_lazy", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Kedi tembeldir.', wrong: 'Hayır, köpek çalışkandır.' },
            en: { correct: 'Yes! The cat is lazy.', wrong: 'No, the dog is hardworking.' },
            de: { correct: 'Ja! Die Katze ist faul.', wrong: 'Nein, der Hund ist fleißig.' },
            fr: { correct: "Oui ! Le chat est paresseux.", wrong: "Non, le chien est travailleur." },
            nl: { correct: 'Ja! De kat is lui.', wrong: 'Nee, de hond is hardwerkend.' },
            az: { correct: 'Bəli! Pişik tənbəldir.', wrong: 'Xeyr, it çalışqandır.' }
        },
        options: [
            { id: 675, word: "kedi", imageUrl: "/images/675.png", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 682, word: "köpek", imageUrl: "/images/682.png", isCorrect: false, audioKey: "kopek", spokenText: "köpek" }
        ]
    },
    { 
        id: 18, 
        question: "Çalışkan olan hangisi?", 
        questionAudioKey: "q_which_is_hardworking", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Köpek çalışkandır.', wrong: 'Hayır, kedi tembeldir.' },
            en: { correct: 'Yes! The dog is hardworking.', wrong: 'No, the cat is lazy.' },
            de: { correct: 'Ja! Der Hund ist fleißig.', wrong: 'Nein, die Katze ist faul.' },
            fr: { correct: "Oui ! Le chien est travailleur.", wrong: "Non, le chat est paresseux." },
            nl: { correct: 'Ja! De hond is hardwerkend.', wrong: 'Nee, de kat is lui.' },
            az: { correct: 'Bəli! İt çalışqandır.', wrong: 'Xeyr, pişik tənbəldir.' }
        },
        options: [
            { id: 675, word: "kedi", imageUrl: "/images/675.png", isCorrect: false, audioKey: "kedi", spokenText: "kedi" },
            { id: 682, word: "köpek", imageUrl: "/images/682.png", isCorrect: true, audioKey: "kopek", spokenText: "köpek" }
        ]
    },

    // 10. Maymun vs Kunduz
    { 
        id: 19, 
        question: "Tembel olan hangisi?", 
        questionAudioKey: "q_which_is_lazy", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Maymun tembeldir.', wrong: 'Hayır, kunduz çalışkandır.' },
            en: { correct: 'Yes! The monkey is lazy.', wrong: 'No, the beaver is hardworking.' },
            de: { correct: 'Ja! Der Affe ist faul.', wrong: 'Nein, der Biber ist fleißig.' },
            fr: { correct: "Oui ! Le singe est paresseux.", wrong: "Non, le castor est travailleur." },
            nl: { correct: 'Ja! De aap is lui.', wrong: 'Nee, de bever is hardwerkend.' },
            az: { correct: 'Bəli! Meymun tənbəldir.', wrong: 'Xeyr, qunduz çalışqandır.' }
        },
        options: [
            { id: 753, word: "maymun", imageUrl: "/images/753.png", isCorrect: true, audioKey: "maymun", spokenText: "maymun" },
            { id: 680, word: "kunduz", imageUrl: "/images/680.png", isCorrect: false, audioKey: "kunduz", spokenText: "kunduz" }
        ]
    },
    { 
        id: 20, 
        question: "Çalışkan olan hangisi?", 
        questionAudioKey: "q_which_is_hardworking", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Kunduz çalışkandır.', wrong: 'Hayır, maymun tembeldir.' },
            en: { correct: 'Yes! The beaver is hardworking.', wrong: 'No, the monkey is lazy.' },
            de: { correct: 'Ja! Der Biber ist fleißig.', wrong: 'Nein, der Affe ist faul.' },
            fr: { correct: "Oui ! Le castor est travailleur.", wrong: "Non, le singe est paresseux." },
            nl: { correct: 'Ja! De bever is hardwerkend.', wrong: 'Nee, de aap is lui.' },
            az: { correct: 'Bəli! Qunduz çalışqandır.', wrong: 'Xeyr, meymun tənbəldir.' }
        },
        options: [
            { id: 753, word: "maymun", imageUrl: "/images/753.png", isCorrect: false, audioKey: "maymun", spokenText: "maymun" },
            { id: 680, word: "kunduz", imageUrl: "/images/680.png", isCorrect: true, audioKey: "kunduz", spokenText: "kunduz" }
        ]
    },
    
    // 11. Tembel İşçi vs Çalışkan İşçi
    { 
        id: 21, 
        question: "Tembel olan hangisi?", 
        questionAudioKey: "q_which_is_lazy", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Bu işçi tembeldir.', wrong: 'Hayır, bu işçi çalışkandır.' },
            en: { correct: 'Yes! This worker is lazy.', wrong: 'No, this worker is hardworking.' },
            de: { correct: 'Ja! Dieser Arbeiter ist faul.', wrong: 'Nein, dieser Arbeiter ist fleißig.' },
            fr: { correct: "Oui ! Cet ouvrier est paresseux.", wrong: "Non, cet ouvrier est travailleur." },
            nl: { correct: 'Ja! Deze arbeider is lui.', wrong: 'Nee, deze arbeider is hardwerkend.' },
            az: { correct: 'Bəli! Bu işçi tənbəldir.', wrong: 'Xeyr, bu işçi çalışqandır.' }
        },
        options: [
            { id: 678, word: "işçi", imageUrl: "/images/678.png", isCorrect: true, audioKey: "isci", spokenText: "işçi" },
            { id: 679, word: "işçi", imageUrl: "/images/679.png", isCorrect: false, audioKey: "isci", spokenText: "işçi" }
        ]
    },
    { 
        id: 22, 
        question: "Çalışkan olan hangisi?", 
        questionAudioKey: "q_which_is_hardworking", 
        activityType: ActivityType.TembelCaliskan, 
        speech: {
            tr: { correct: 'Evet! Bu işçi çalışkandır.', wrong: 'Hayır, bu işçi tembeldir.' },
            en: { correct: 'Yes! This worker is hardworking.', wrong: 'No, this worker is lazy.' },
            de: { correct: 'Ja! Dieser Arbeiter ist fleißig.', wrong: 'Nein, dieser Arbeiter ist faul.' },
            fr: { correct: "Oui ! Cet ouvrier est travailleur.", wrong: "Non, cet ouvrier est paresseux." },
            nl: { correct: 'Ja! Deze arbeider is hardwerkend.', wrong: 'Nee, deze arbeider is lui.' },
            az: { correct: 'Bəli! Bu işçi çalışqandır.', wrong: 'Xeyr, bu işçi tənbəldir.' }
        },
        options: [
            { id: 678, word: "işçi", imageUrl: "/images/678.png", isCorrect: false, audioKey: "isci", spokenText: "işçi" },
            { id: 679, word: "işçi", imageUrl: "/images/679.png", isCorrect: true, audioKey: "isci", spokenText: "işçi" }
        ]
    },
];