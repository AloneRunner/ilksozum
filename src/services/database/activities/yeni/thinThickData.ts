import { ConceptRound, ActivityType } from '../../../../types';

// İnce / Kalın: 10 çift, 20 soru. Görseller 2001-2020 (gerçekçi, Flow ile üretildi, 2026-10).
// Her çiftte aynı nesne, aynı boy; sadece kalınlık farklı. Kaynak: tools/gorsel-envanter/flow-kalin-ince.md
// Turda her çiftten tek soru seçilir (contentService), şıklar karıştırılır.
export const thinThickDataYeni: ConceptRound[] = [
    // Kalem
    {
        id: 1,
        question: "Kalın olan hangisi?",
        questionAudioKey: "q_which_is_thick",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Kalem kalındır.', wrong: 'Hayır, bu kalem incedir.' }
        },
        options: [
            { id: 2001, word: "kalem", imageUrl: "/images/2001.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2002, word: "kalem", imageUrl: "/images/2002.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 2,
        question: "İnce olan hangisi?",
        questionAudioKey: "q_which_is_thin",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Kalem incedir.', wrong: 'Hayır, bu kalem kalındır.' }
        },
        options: [
            { id: 2001, word: "kalem", imageUrl: "/images/2001.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" },
            { id: 2002, word: "kalem", imageUrl: "/images/2002.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // İp
    {
        id: 3,
        question: "Kalın olan hangisi?",
        questionAudioKey: "q_which_is_thick",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! İp kalındır.', wrong: 'Hayır, bu ip incedir.' }
        },
        options: [
            { id: 2003, word: "ip", imageUrl: "/images/2003.webp", isCorrect: true, audioKey: "ip", spokenText: "ip" },
            { id: 2004, word: "ip", imageUrl: "/images/2004.webp", isCorrect: false, audioKey: "ip", spokenText: "ip" }
        ]
    },
    {
        id: 4,
        question: "İnce olan hangisi?",
        questionAudioKey: "q_which_is_thin",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! İp incedir.', wrong: 'Hayır, bu ip kalındır.' }
        },
        options: [
            { id: 2003, word: "ip", imageUrl: "/images/2003.webp", isCorrect: false, audioKey: "ip", spokenText: "ip" },
            { id: 2004, word: "ip", imageUrl: "/images/2004.webp", isCorrect: true, audioKey: "ip", spokenText: "ip" }
        ]
    },
    // Mum
    {
        id: 5,
        question: "Kalın olan hangisi?",
        questionAudioKey: "q_which_is_thick",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Mum kalındır.', wrong: 'Hayır, bu mum incedir.' }
        },
        options: [
            { id: 2005, word: "mum", imageUrl: "/images/2005.webp", isCorrect: true, audioKey: "mum", spokenText: "mum" },
            { id: 2006, word: "mum", imageUrl: "/images/2006.webp", isCorrect: false, audioKey: "mum", spokenText: "mum" }
        ]
    },
    {
        id: 6,
        question: "İnce olan hangisi?",
        questionAudioKey: "q_which_is_thin",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Mum incedir.', wrong: 'Hayır, bu mum kalındır.' }
        },
        options: [
            { id: 2005, word: "mum", imageUrl: "/images/2005.webp", isCorrect: false, audioKey: "mum", spokenText: "mum" },
            { id: 2006, word: "mum", imageUrl: "/images/2006.webp", isCorrect: true, audioKey: "mum", spokenText: "mum" }
        ]
    },
    // Havuç
    {
        id: 7,
        question: "Kalın olan hangisi?",
        questionAudioKey: "q_which_is_thick",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Havuç kalındır.', wrong: 'Hayır, bu havuç incedir.' }
        },
        options: [
            { id: 2007, word: "havuç", imageUrl: "/images/2007.webp", isCorrect: true, audioKey: "havuç", spokenText: "havuç" },
            { id: 2008, word: "havuç", imageUrl: "/images/2008.webp", isCorrect: false, audioKey: "havuç", spokenText: "havuç" }
        ]
    },
    {
        id: 8,
        question: "İnce olan hangisi?",
        questionAudioKey: "q_which_is_thin",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Havuç incedir.', wrong: 'Hayır, bu havuç kalındır.' }
        },
        options: [
            { id: 2007, word: "havuç", imageUrl: "/images/2007.webp", isCorrect: false, audioKey: "havuç", spokenText: "havuç" },
            { id: 2008, word: "havuç", imageUrl: "/images/2008.webp", isCorrect: true, audioKey: "havuç", spokenText: "havuç" }
        ]
    },
    // Ağaç
    {
        id: 9,
        question: "Gövdesi kalın olan hangisi?",
        questionAudioKey: "", // özel soru: ekranda bu metin görünsün
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { question: 'Gövdesi kalın olan hangisi?', correct: 'Evet! Ağacın gövdesi kalındır.', wrong: 'Hayır, bu ağacın gövdesi incedir.' }
        },
        options: [
            { id: 2009, word: "ağaç", imageUrl: "/images/2009.webp", isCorrect: true, audioKey: "ağaç", spokenText: "ağaç" },
            { id: 2010, word: "ağaç", imageUrl: "/images/2010.webp", isCorrect: false, audioKey: "ağaç", spokenText: "ağaç" }
        ]
    },
    {
        id: 10,
        question: "Gövdesi ince olan hangisi?",
        questionAudioKey: "", // özel soru: ekranda bu metin görünsün
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { question: 'Gövdesi ince olan hangisi?', correct: 'Evet! Ağacın gövdesi incedir.', wrong: 'Hayır, bu ağacın gövdesi kalındır.' }
        },
        options: [
            { id: 2009, word: "ağaç", imageUrl: "/images/2009.webp", isCorrect: false, audioKey: "ağaç", spokenText: "ağaç" },
            { id: 2010, word: "ağaç", imageUrl: "/images/2010.webp", isCorrect: true, audioKey: "ağaç", spokenText: "ağaç" }
        ]
    },
    // Fırça
    {
        id: 11,
        question: "Kalın olan hangisi?",
        questionAudioKey: "q_which_is_thick",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Fırça kalındır.', wrong: 'Hayır, bu fırça incedir.' }
        },
        options: [
            { id: 2011, word: "fırça", imageUrl: "/images/2011.webp", isCorrect: true, audioKey: "fırça", spokenText: "fırça" },
            { id: 2012, word: "fırça", imageUrl: "/images/2012.webp", isCorrect: false, audioKey: "fırça", spokenText: "fırça" }
        ]
    },
    {
        id: 12,
        question: "İnce olan hangisi?",
        questionAudioKey: "q_which_is_thin",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Fırça incedir.', wrong: 'Hayır, bu fırça kalındır.' }
        },
        options: [
            { id: 2011, word: "fırça", imageUrl: "/images/2011.webp", isCorrect: false, audioKey: "fırça", spokenText: "fırça" },
            { id: 2012, word: "fırça", imageUrl: "/images/2012.webp", isCorrect: true, audioKey: "fırça", spokenText: "fırça" }
        ]
    },
    // Çivi
    {
        id: 13,
        question: "Kalın olan hangisi?",
        questionAudioKey: "q_which_is_thick",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Çivi kalındır.', wrong: 'Hayır, bu çivi incedir.' }
        },
        options: [
            { id: 2013, word: "çivi", imageUrl: "/images/2013.webp", isCorrect: true, audioKey: "çivi", spokenText: "çivi" },
            { id: 2014, word: "çivi", imageUrl: "/images/2014.webp", isCorrect: false, audioKey: "çivi", spokenText: "çivi" }
        ]
    },
    {
        id: 14,
        question: "İnce olan hangisi?",
        questionAudioKey: "q_which_is_thin",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Çivi incedir.', wrong: 'Hayır, bu çivi kalındır.' }
        },
        options: [
            { id: 2013, word: "çivi", imageUrl: "/images/2013.webp", isCorrect: false, audioKey: "çivi", spokenText: "çivi" },
            { id: 2014, word: "çivi", imageUrl: "/images/2014.webp", isCorrect: true, audioKey: "çivi", spokenText: "çivi" }
        ]
    },
    // Havlu
    {
        id: 15,
        question: "Kalın olan hangisi?",
        questionAudioKey: "q_which_is_thick",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Havlu kalındır.', wrong: 'Hayır, bu havlu incedir.' }
        },
        options: [
            { id: 2015, word: "havlu", imageUrl: "/images/2015.webp", isCorrect: true, audioKey: "havlu", spokenText: "havlu" },
            { id: 2016, word: "havlu", imageUrl: "/images/2016.webp", isCorrect: false, audioKey: "havlu", spokenText: "havlu" }
        ]
    },
    {
        id: 16,
        question: "İnce olan hangisi?",
        questionAudioKey: "q_which_is_thin",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Havlu incedir.', wrong: 'Hayır, bu havlu kalındır.' }
        },
        options: [
            { id: 2015, word: "havlu", imageUrl: "/images/2015.webp", isCorrect: false, audioKey: "havlu", spokenText: "havlu" },
            { id: 2016, word: "havlu", imageUrl: "/images/2016.webp", isCorrect: true, audioKey: "havlu", spokenText: "havlu" }
        ]
    },
    // Kitap
    {
        id: 17,
        question: "Kalın olan hangisi?",
        questionAudioKey: "q_which_is_thick",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Kitap kalındır.', wrong: 'Hayır, bu kitap incedir.' }
        },
        options: [
            { id: 2017, word: "kitap", imageUrl: "/images/2017.webp", isCorrect: true, audioKey: "kitap", spokenText: "kitap" },
            { id: 2018, word: "kitap", imageUrl: "/images/2018.webp", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    {
        id: 18,
        question: "İnce olan hangisi?",
        questionAudioKey: "q_which_is_thin",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Kitap incedir.', wrong: 'Hayır, bu kitap kalındır.' }
        },
        options: [
            { id: 2017, word: "kitap", imageUrl: "/images/2017.webp", isCorrect: false, audioKey: "kitap", spokenText: "kitap" },
            { id: 2018, word: "kitap", imageUrl: "/images/2018.webp", isCorrect: true, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    // Ekmek dilimi
    {
        id: 19,
        question: "Kalın olan hangisi?",
        questionAudioKey: "q_which_is_thick",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Ekmek dilimi kalındır.', wrong: 'Hayır, bu ekmek incedir.' }
        },
        options: [
            { id: 2019, word: "ekmek", imageUrl: "/images/2019.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2020, word: "ekmek", imageUrl: "/images/2020.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 20,
        question: "İnce olan hangisi?",
        questionAudioKey: "q_which_is_thin",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Ekmek dilimi incedir.', wrong: 'Hayır, bu ekmek kalındır.' }
        },
        options: [
            { id: 2019, word: "ekmek", imageUrl: "/images/2019.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2020, word: "ekmek", imageUrl: "/images/2020.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    }
];
