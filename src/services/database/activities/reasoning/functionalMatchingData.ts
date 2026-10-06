import { ConceptRound, ActivityType } from '../../../../types.ts';

// İşlevsel Eşleştirme - Functional Matching (20 rounds)
// Nesneler ve kullanım alanları, günlük yaşam becerileri için
export const functionalMatchingData: ConceptRound[] = [
    { id: 1, question: "Çiviyi neyle çakarız?", questionAudioKey: "q_what_hammer_nail_with", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Çiviyi çekiçle çakarız." },
            en: { correct: "We hammer nails with a hammer." }
        },
        questionItem: { id: 306, word: "çivi", imageUrl: "/images/306.png", audioKeys: { default: "çivi" }, tags: { category: "" } },
        options: [
            { id: 496, word: "çekiç", imageUrl: "/images/496.png", isCorrect: true, audioKey: "çekiç", spokenText: "çekiç" },
            { id: 535, word: "silgi", imageUrl: "/images/535.png", isCorrect: false, audioKey: "silgi", spokenText: "silgi" }
        ]
    },
    { id: 2, question: "Dişlerimizi neyle fırçalarız?", questionAudioKey: "q_what_brush_teeth_with", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Dişlerimizi diş macunu ile fırçalarız." },
            en: { correct: "We brush our teeth with toothpaste." }
        },
        questionItem: { id: 441, word: "diş fırçası", imageUrl: "/images/441.png", audioKeys: { default: "diş_fırçası" }, tags: { category: "" } },
        options: [
            { id: 209, word: "sabun", imageUrl: "/images/209.png", isCorrect: false, audioKey: "sabun", spokenText: "sabun" },
            { id: 425, word: "diş macunu", imageUrl: "/images/425.png", isCorrect: true, audioKey: "diş_macunu", spokenText: "diş macunu" }
        ]
    },
    { id: 3, question: "Çoraptan sonra ne giyeriz?", questionAudioKey: "q_what_after_socks", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Çoraptan sonra ayakkabı giyeriz." },
            en: { correct: "We wear shoes after socks." }
        },
        questionItem: { id: 147, word: "çoraplar", imageUrl: "/images/147.png", audioKeys: { default: "çoraplar" }, tags: { category: "" } },
        options: [
            { id: 59, word: "ayakkabı", imageUrl: "/images/59.png", isCorrect: true, audioKey: "ayakkabı", spokenText: "ayakkabı" },
            { id: 111, word: "şapka", imageUrl: "/images/111.png", isCorrect: false, audioKey: "şapka", spokenText: "şapka" }
        ]
    },
    { id: 4, question: "Yastığı nerede kullanırız?", questionAudioKey: "q_where_use_pillow", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Yastığı yatak üzerinde kullanırız." },
            en: { correct: "We use the pillow on the bed." }
        },
        questionItem: { id: 137, word: "yastık", imageUrl: "/images/137.png", audioKeys: { default: "yastık" }, tags: { category: "" } },
        options: [
            { id: 606, word: "yatak", imageUrl: "/images/606.png", isCorrect: true, audioKey: "yatak", spokenText: "yatak" },
            { id: 549, word: "koltuk", imageUrl: "/images/549.png", isCorrect: false, audioKey: "koltuk", spokenText: "koltuk" }
        ]
    },
    { id: 5, question: "Çorbayı neyle içeriz?", questionAudioKey: "q_what_eat_soup_with", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Çorbayı kaşık ile içeriz." },
            en: { correct: "We eat soup with a spoon." }
        },
        questionItem: { id: 266, word: "çorba", imageUrl: "/images/266.png", audioKeys: { default: "çorba" }, tags: { category: "" } },
        options: [
            { id: 125, word: "kaşık", imageUrl: "/images/125.png", isCorrect: true, audioKey: "kaşık", spokenText: "kaşık" },
            { id: 296, word: "simit", imageUrl: "/images/296.png", isCorrect: false, audioKey: "simit", spokenText: "simit" }
        ]
    },
    { id: 6, question: "Resmi neyle boyarız?", questionAudioKey: "q_what_color_picture_with", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Resmi fırça ile boyarız." },
            en: { correct: "We paint the picture with a brush." }
        },
        questionItem: { id: 402, word: "boyama", imageUrl: "/images/402.png", audioKeys: { default: "boyama" }, tags: { category: "" } },
        options: [
            { id: 51, word: "fırça", imageUrl: "/images/51.png", isCorrect: true, audioKey: "fırça", spokenText: "fırça" },
            { id: 37, word: "kitap", imageUrl: "/images/37.png", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    { id: 7, question: "Kağıda neyle yazarız?", questionAudioKey: "q_what_write_paper_with", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Kağıda kalem ile yazarız." },
            en: { correct: "We write on paper with a pen." }
        },
        questionItem: { id: 642, word: "kağıt", imageUrl: "/images/642.png", audioKeys: { default: "kağıt" }, tags: { category: "" } },
        options: [
            { id: 535, word: "silgi", imageUrl: "/images/535.png", isCorrect: false, audioKey: "silgi", spokenText: "silgi" },
            { id: 121, word: "kalem", imageUrl: "/images/121.png", isCorrect: true, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    { id: 8, question: "Kapıyı neyle açarız?", questionAudioKey: "q_what_open_door_with", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Kapıyı anahtar ile açarız." },
            en: { correct: "We open the door with a key." }
        },
        questionItem: { id: 903, word: "kapı", imageUrl: "/images/903.png", audioKeys: { default: "kapı" }, tags: { category: "" } },
        options: [
            { id: 142, word: "anahtar", imageUrl: "/images/142.png", isCorrect: true, audioKey: "anahtar", spokenText: "anahtar" },
            { id: 144, word: "makas", imageUrl: "/images/144.png", isCorrect: false, audioKey: "makas", spokenText: "makas" }
        ]
    },
    { id: 9, question: "Makarnayı neyle yeriz?", questionAudioKey: "q_what_eat_pasta_with", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Makarnayı çatal ile yeriz." },
            en: { correct: "We eat pasta with a fork." }
        },
        questionItem: { id: 267, word: "makarna", imageUrl: "/images/267.png", audioKeys: { default: "makarna" }, tags: { category: "" } },
        options: [
            { id: 126, word: "çatal", imageUrl: "/images/126.png", isCorrect: true, audioKey: "çatal", spokenText: "çatal" },
            { id: 125, word: "kaşık", imageUrl: "/images/125.png", isCorrect: false, audioKey: "kaşık", spokenText: "kaşık" }
        ]
    },
    { id: 10, question: "Parayı nereye koyarız?", questionAudioKey: "q_where_put_money", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Parayı kumbara içine koyarız." },
            en: { correct: "We put money in a piggy bank." }
        },
        questionItem: { id: 248, word: "para", imageUrl: "/images/248.png", audioKeys: { default: "para" }, tags: { category: "" } },
        options: [
            { id: 184, word: "kumbara", imageUrl: "/images/184.png", isCorrect: true, audioKey: "kumbara", spokenText: "kumbara" },
            { id: 207, word: "çanta", imageUrl: "/images/207.png", isCorrect: false, audioKey: "çanta", spokenText: "çanta" }
        ]
    },
    
    // === YENİ TURLAR: 11-15 (Düzeltilmiş ve doğrulanmış) ===
    { id: 11, question: "Saçımızı neyle tararız?", questionAudioKey: "q_what_comb_hair_with", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Saçımızı tarak ile tararız." },
            en: { correct: "We comb our hair with a comb." }
        },
        questionItem: { id: 663, word: "saç", imageUrl: "/images/663.png", audioKeys: { default: "saç" }, tags: { category: "" } },
        options: [
            { id: 856, word: "tarak", imageUrl: "/images/856.png", isCorrect: true, audioKey: "tarak", spokenText: "tarak" },
            { id: 441, word: "diş fırçası", imageUrl: "/images/441.png", isCorrect: false, audioKey: "diş_fırçası", spokenText: "diş fırçası" }
        ]
    },
    { id: 12, question: "Kitabı nerede okuruz?", questionAudioKey: "q_where_read_book", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Kitabı masa üzerinde okuruz." },
            en: { correct: "We read the book on the table." }
        },
        questionItem: { id: 37, word: "kitap", imageUrl: "/images/37.png", audioKeys: { default: "kitap" }, tags: { category: "" } },
        options: [
            { id: 144, word: "makas", imageUrl: "/images/144.png", isCorrect: false, audioKey: "makas", spokenText: "makas" },
            { id: 134, word: "masa", imageUrl: "/images/134.png", isCorrect: true, audioKey: "masa", spokenText: "masa" }
        ]
    },
    { id: 13, question: "Kağıdı neyle keseriz?", questionAudioKey: "q_what_cut_paper_with", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Kağıdı makas ile keseriz." },
            en: { correct: "We cut paper with scissors." }
        },
        questionItem: { id: 642, word: "kağıt", imageUrl: "/images/642.png", audioKeys: { default: "kağıt" }, tags: { category: "" } },
        options: [
            { id: 144, word: "makas", imageUrl: "/images/144.png", isCorrect: true, audioKey: "makas", spokenText: "makas" },
            { id: 121, word: "kalem", imageUrl: "/images/121.png", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    { id: 14, question: "Ekmeği neyle keseriz?", questionAudioKey: "q_what_cut_bread_with", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Ekmeği bıçak ile keseriz." },
            en: { correct: "We cut bread with a knife." }
        },
        questionItem: { id: 112, word: "ekmek", imageUrl: "/images/112.png", audioKeys: { default: "pişmiş_ekmek" }, tags: { category: "" } },
        options: [
            { id: 126, word: "çatal", imageUrl: "/images/126.png", isCorrect: false, audioKey: "çatal", spokenText: "çatal" },
            { id: 262, word: "bıçak", imageUrl: "/images/262.png", isCorrect: true, audioKey: "bıçak", spokenText: "bıçak" }
        ]
    },
    { id: 15, question: "Ellerimizi neyle yıkarız?", questionAudioKey: "q_what_wash_hands_with", activityType: ActivityType.FunctionalMatching,
        speech: {
            tr: { correct: "Ellerimizi sabun ile yıkarız." },
            en: { correct: "We wash our hands with soap." }
        },
        questionItem: { id: 285, word: "el", imageUrl: "/images/285.png", audioKeys: { default: "el" }, tags: { category: "" } },
        options: [
            { id: 209, word: "sabun", imageUrl: "/images/209.png", isCorrect: true, audioKey: "sabun", spokenText: "sabun" },
            { id: 425, word: "diş macunu", imageUrl: "/images/425.png", isCorrect: false, audioKey: "diş_macunu", spokenText: "diş macunu" }
        ]
    },
];
