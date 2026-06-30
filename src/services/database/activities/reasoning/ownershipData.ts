import { ConceptRound, ActivityType } from '../../../../types.ts';

// Bu Kimin? / Bu Neyin? - Ownership & Belonging (21 rounds)
// Eşyaların sahipleri veya ait oldukları varlıkla eşleştirilmesi
export const ownershipData: ConceptRound[] = [
    // === 1-6: Aile Üyeleri ===
    {
        id: 1, question: "Bu biberon kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 371, word: "biberon", imageUrl: "/images/371.png", audioKeys: { default: "biberon" }, tags: { category: "Aile" } },
        options: [
            { id: 579, word: "bebek", imageUrl: "/images/579.png", isCorrect: true, audioKey: "bebek", spokenText: "bebeğin" },
            { id: 578, word: "dede", imageUrl: "/images/578.png", isCorrect: false, audioKey: "dede", spokenText: "dedenin" }
        ],
        speech: { tr: { question: "Bu biberon kimin?", correct: "Evet! Biberon bebeğin!", wrong: "Hayır! Biberon dedenin değil, bebeğin!" } }
    },
    {
        id: 2, question: "Bu baston kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 437, word: "baston", imageUrl: "/images/437.png", audioKeys: { default: "baston" }, tags: { category: "Aile" } },
        options: [
            { id: 578, word: "dede", imageUrl: "/images/578.png", isCorrect: true, audioKey: "dede", spokenText: "dedenin" },
            { id: 828, word: "baba", imageUrl: "/images/828.png", isCorrect: false, audioKey: "baba", spokenText: "babanın" }
        ],
        speech: { tr: { question: "Bu baston kimin?", correct: "Evet! Baston dedenin!", wrong: "Hayır! Baston babanın değil, dedenin!" } }
    },
    {
        id: 3, question: "Bu kravat kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 576, word: "kravat", imageUrl: "/images/576.png", audioKeys: { default: "kravat" }, tags: { category: "Aile" } },
        options: [
            { id: 828, word: "baba", imageUrl: "/images/828.png", isCorrect: true, audioKey: "baba", spokenText: "babanın" },
            { id: 701, word: "nine", imageUrl: "/images/701.png", isCorrect: false, audioKey: "nine", spokenText: "ninenin" }
        ],
        speech: { tr: { question: "Bu kravat kimin?", correct: "Evet! Kravat babanın!", wrong: "Hayır! Kravat ninenin değil, babanın!" } }
    },
    {
        id: 4, question: "Bu okul çantası kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 207, word: "okul çantası", imageUrl: "/images/207.png", audioKeys: { default: "okul_çantası" }, tags: { category: "Okul" } },
        options: [
            { id: 677, word: "öğrenci", imageUrl: "/images/677.png", isCorrect: true, audioKey: "öğrenci", spokenText: "öğrencinin" },
            { id: 828, word: "baba", imageUrl: "/images/828.png", isCorrect: false, audioKey: "baba", spokenText: "babanın" }
        ],
        speech: { tr: { question: "Bu okul çantası kimin?", correct: "Evet! Okul çantası öğrencinin!", wrong: "Hayır! Okul çantası babanın değil, öğrencinin!" } }
    },
    {
        id: 5, question: "Bu saç tokası kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 979, word: "saç tokası", imageUrl: "/images/979.png", audioKeys: { default: "saç_tokası" }, tags: { category: "Aile" } },
        options: [
            { id: 985, word: "kız çocuğu", imageUrl: "/images/985.png", isCorrect: true, audioKey: "kız_çocuğu", spokenText: "kız çocuğunun" },
            { id: 701, word: "nine", imageUrl: "/images/701.png", isCorrect: false, audioKey: "nine", spokenText: "ninenin" }
        ],
        speech: { tr: { question: "Bu saç tokası kimin?", correct: "Evet! Saç tokası kız çocuğunun!", wrong: "Hayır! Saç tokası ninenin değil, kız çocuğunun!" } }
    },

    // === 6-9: Meslekler ===
    {
        id: 6, question: "Bu önlük kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 934, word: "önlük", imageUrl: "/images/934.png", audioKeys: { default: "önlük" }, tags: { category: "Meslekler" } },
        options: [
            { id: 326, word: "aşçı", imageUrl: "/images/326.png", isCorrect: true, audioKey: "aşçı", spokenText: "aşçının" },
            { id: 324, word: "doktor", imageUrl: "/images/324.png", isCorrect: false, audioKey: "doktor", spokenText: "doktorun" }
        ],
        speech: { tr: { question: "Bu önlük kimin?", correct: "Evet! Önlük aşçının!", wrong: "Hayır! Önlük doktorun değil, aşçının!" } }
    },
    {
        id: 7, question: "Bu cetvel kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 149, word: "cetvel", imageUrl: "/images/149.png", audioKeys: { default: "cetvel" }, tags: { category: "Meslekler" } },
        options: [
            { id: 84, word: "öğretmen", imageUrl: "/images/84.png", isCorrect: true, audioKey: "öğretmen", spokenText: "öğretmenin" },
            { id: 326, word: "aşçı", imageUrl: "/images/326.png", isCorrect: false, audioKey: "aşçı", spokenText: "aşçının" }
        ],
        speech: { tr: { question: "Bu cetvel kimin?", correct: "Evet! Cetvel öğretmenin!", wrong: "Hayır! Cetvel aşçının değil, öğretmenin!" } }
    },
    {
        id: 8, question: "Bu polis arabası kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 258, word: "polis arabası", imageUrl: "/images/258.png", audioKeys: { default: "polis_arabası" }, tags: { category: "Meslekler" } },
        options: [
            { id: 325, word: "polis", imageUrl: "/images/325.png", isCorrect: true, audioKey: "polis", spokenText: "polisin" },
            { id: 327, word: "itfaiyeci", imageUrl: "/images/327.png", isCorrect: false, audioKey: "itfaiyeci", spokenText: "itfaiyecinin" }
        ],
        speech: { tr: { question: "Bu polis arabası kimin?", correct: "Evet! Polis arabası polisin!", wrong: "Hayır! Polis arabası itfaiyecinin değil, polisin!" } }
    },
    {
        id: 9, question: "Bu itfaiye aracı kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 256, word: "itfaiye aracı", imageUrl: "/images/256.png", audioKeys: { default: "itfaiye_aracı" }, tags: { category: "Meslekler" } },
        options: [
            { id: 327, word: "itfaiyeci", imageUrl: "/images/327.png", isCorrect: true, audioKey: "itfaiyeci", spokenText: "itfaiyecinin" },
            { id: 325, word: "polis", imageUrl: "/images/325.png", isCorrect: false, audioKey: "polis", spokenText: "polisin" }
        ],
        speech: { tr: { question: "Bu itfaiye aracı kimin?", correct: "Evet! İtfaiye aracı itfaiyecinin!", wrong: "Hayır! İtfaiye aracı polisin değil, itfaiyecinin!" } }
    },
    {
        id: 10, question: "Bu ambulans kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 257, word: "ambulans", imageUrl: "/images/257.png", audioKeys: { default: "ambulans" }, tags: { category: "Meslekler" } },
        options: [
            { id: 324, word: "doktor", imageUrl: "/images/324.png", isCorrect: true, audioKey: "doktor", spokenText: "doktorun" },
            { id: 325, word: "polis", imageUrl: "/images/325.png", isCorrect: false, audioKey: "polis", spokenText: "polisin" }
        ],
        speech: { tr: { question: "Bu ambulans kimin?", correct: "Evet! Ambulans doktorun!", wrong: "Hayır! Ambulans polisin değil, doktorun!" } }
    },

    // === 11-13: Hayal Dünyası / Eğlence ===
    {
        id: 11, question: "Bu taç kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 215, word: "taç", imageUrl: "/images/215.png", audioKeys: { default: "taç" }, tags: { category: "Hayal" } },
        options: [
            { id: 314, word: "kral", imageUrl: "/images/314.png", isCorrect: true, audioKey: "kral", spokenText: "kralın" },
            { id: 380, word: "astronot", imageUrl: "/images/380.png", isCorrect: false, audioKey: "astronot", spokenText: "astronotun" }
        ],
        speech: { tr: { question: "Bu taç kimin?", correct: "Evet! Taç kralın!", wrong: "Hayır! Taç astronotun değil, kralın!" } }
    },
    {
        id: 12, question: "Bu roket kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 204, word: "roket", imageUrl: "/images/204.png", audioKeys: { default: "roket" }, tags: { category: "Hayal" } },
        options: [
            { id: 380, word: "astronot", imageUrl: "/images/380.png", isCorrect: true, audioKey: "astronot", spokenText: "astronotun" },
            { id: 314, word: "kral", imageUrl: "/images/314.png", isCorrect: false, audioKey: "kral", spokenText: "kralın" }
        ],
        speech: { tr: { question: "Bu roket kimin?", correct: "Evet! Roket astronotun!", wrong: "Hayır! Roket kralın değil, astronotun!" } }
    },
    {
        id: 13, question: "Bu top kimin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 235, word: "top", imageUrl: "/images/235.png", audioKeys: { default: "top" }, tags: { category: "Spor" } },
        options: [
            { id: 629, word: "futbolcu", imageUrl: "/images/629.png", isCorrect: true, audioKey: "futbolcu", spokenText: "futbolcunun" },
            { id: 84, word: "öğretmen", imageUrl: "/images/84.png", isCorrect: false, audioKey: "öğretmen", spokenText: "öğretmenin" }
        ],
        speech: { tr: { question: "Bu top kimin?", correct: "Evet! Top futbolcunun!", wrong: "Hayır! Top öğretmenin değil, futbolcunun!" } }
    },

    // === 14-18: Hayvanlar ===
    {
        id: 14, question: "Bu bal neyin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 228, word: "bal", imageUrl: "/images/228.png", audioKeys: { default: "bal" }, tags: { category: "Hayvanlar" } },
        options: [
            { id: 273, word: "arı", imageUrl: "/images/273.png", isCorrect: true, audioKey: "arı", spokenText: "arının" },
            { id: 41, word: "tavşan", imageUrl: "/images/41.png", isCorrect: false, audioKey: "tavşan", spokenText: "tavşanın" }
        ],
        speech: { tr: { question: "Bu bal neyin?", correct: "Evet! Bal arının!", wrong: "Hayır! Bal tavşanın değil, arının!" } }
    },
    {
        id: 15, question: "Bu havuç neyin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 98, word: "havuç", imageUrl: "/images/98.png", audioKeys: { default: "havuç" }, tags: { category: "Hayvanlar" } },
        options: [
            { id: 41, word: "tavşan", imageUrl: "/images/41.png", isCorrect: true, audioKey: "tavşan", spokenText: "tavşanın" },
            { id: 273, word: "arı", imageUrl: "/images/273.png", isCorrect: false, audioKey: "arı", spokenText: "arının" }
        ],
        speech: { tr: { question: "Bu havuç neyin?", correct: "Evet! Havuç tavşanın!", wrong: "Hayır! Havuç arının değil, tavşanın!" } }
    },
    {
        id: 16, question: "Bu yuva neyin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 534, word: "yuva", imageUrl: "/images/534.png", audioKeys: { default: "kuş_yuvası" }, tags: { category: "Hayvanlar" } },
        options: [
            { id: 749, word: "kuş", imageUrl: "/images/749.png", isCorrect: true, audioKey: "kuş", spokenText: "kuşun" },
            { id: 16, word: "kedi", imageUrl: "/images/16.png", isCorrect: false, audioKey: "kedi", spokenText: "kedinin" }
        ],
        speech: { tr: { question: "Bu yuva neyin?", correct: "Evet! Yuva kuşun!", wrong: "Hayır! Yuva kedinin değil, kuşun!" } }
    },
    {
        id: 17, question: "Bu balık neyin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 915, word: "balık", imageUrl: "/images/915.png", audioKeys: { default: "balık" }, tags: { category: "Hayvanlar" } },
        options: [
            { id: 16, word: "kedi", imageUrl: "/images/16.png", isCorrect: true, audioKey: "kedi", spokenText: "kedinin" },
            { id: 749, word: "kuş", imageUrl: "/images/749.png", isCorrect: false, audioKey: "kuş", spokenText: "kuşun" }
        ],
        speech: { tr: { question: "Bu balık neyin?", correct: "Evet! Balık kedinin!", wrong: "Hayır! Balık kuşun değil, kedinin!" } }
    },
    {
        id: 18, question: "Bu muz neyin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 114, word: "muz", imageUrl: "/images/114.png", audioKeys: { default: "muz" }, tags: { category: "Hayvanlar" } },
        options: [
            { id: 994, word: "maymun", imageUrl: "/images/994.png", isCorrect: true, audioKey: "maymun", spokenText: "maymunun" },
            { id: 41, word: "tavşan", imageUrl: "/images/41.png", isCorrect: false, audioKey: "tavşan", spokenText: "tavşanın" }
        ],
        speech: { tr: { question: "Bu muz neyin?", correct: "Evet! Muz maymunun!", wrong: "Hayır! Muz tavşanın değil, maymunun!" } }
    },
    {
        id: 19, question: "Bu yumurta neyin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 113, word: "yumurta", imageUrl: "/images/113.png", audioKeys: { default: "yumurta" }, tags: { category: "Hayvanlar" } },
        options: [
            { id: 321, word: "tavuk", imageUrl: "/images/321.png", isCorrect: true, audioKey: "tavuk", spokenText: "tavuğun" },
            { id: 749, word: "kuş", imageUrl: "/images/749.png", isCorrect: false, audioKey: "kuş", spokenText: "kuşun" }
        ],
        speech: { tr: { question: "Bu yumurta neyin?", correct: "Evet! Yumurta tavuğun!", wrong: "Hayır! Yumurta kuşun değil, tavuğun!" } }
    },

    // === 20-21: Nesne-Nesne ===
    {
        id: 20, question: "Bu kumanda neyin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 946, word: "kumanda", imageUrl: "/images/946.png", audioKeys: { default: "kumanda" }, tags: { category: "Nesneler" } },
        options: [
            { id: 892, word: "televizyon", imageUrl: "/images/892.png", isCorrect: true, audioKey: "televizyon", spokenText: "televizyonun" },
            { id: 39, word: "kapı", imageUrl: "/images/39.png", isCorrect: false, audioKey: "kapı", spokenText: "kapının" }
        ],
        speech: { tr: { question: "Bu kumanda neyin?", correct: "Evet! Kumanda televizyonun!", wrong: "Hayır! Kumanda kapının değil, televizyonun!" } }
    },
    {
        id: 21, question: "Bu anahtar neyin?", questionAudioKey: "q_whose_is_this", activityType: ActivityType.WhoseIsThis,
        questionItem: { id: 142, word: "anahtar", imageUrl: "/images/142.png", audioKeys: { default: "anahtar" }, tags: { category: "Nesneler" } },
        options: [
            { id: 39, word: "kapı", imageUrl: "/images/39.png", isCorrect: true, audioKey: "kapı", spokenText: "kapının" },
            { id: 892, word: "televizyon", imageUrl: "/images/892.png", isCorrect: false, audioKey: "televizyon", spokenText: "televizyonun" }
        ],
        speech: { tr: { question: "Bu anahtar neyin?", correct: "Evet! Anahtar kapının!", wrong: "Hayır! Anahtar televizyonun değil, kapının!" } }
    },
];
