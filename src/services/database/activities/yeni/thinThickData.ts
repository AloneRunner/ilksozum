import { ConceptRound, ActivityType } from '../../../../types';

// İnce / Kalın: 10 çift, 20 soru. Görseller 2001-2020 (gerçekçi, Flow ile üretildi, 2026-10).
// Her çiftte aynı nesne, aynı boy; sadece kalınlık farklı. Kaynak: tools/gorsel-envanter/flow-kalin-ince.md
// Sorular nesne adıyla ("Hangi kalem kalın?"): somut, tek odak.
// Cevaplar aynı nesne karşılaştırması: "Evet! Bu kalem kalın." (-dır yok; Kaan, 2026-10-07)
// Turda her çiftten tek soru seçilir (contentService), şıklar karıştırılır.
export const thinThickDataYeni: ConceptRound[] = [
    // Kalem
    {
        id: 1,
        question: "Hangi kalem kalın?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu kalem kalın.', wrong: 'Hayır, bu kalem ince.' }
        },
        options: [
            { id: 2001, word: "kalem", imageUrl: "/images/2001.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" },
            { id: 2002, word: "kalem", imageUrl: "/images/2002.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    {
        id: 2,
        question: "Hangi kalem ince?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu kalem ince.', wrong: 'Hayır, bu kalem kalın.' }
        },
        options: [
            { id: 2001, word: "kalem", imageUrl: "/images/2001.webp", isCorrect: false, audioKey: "kalem", spokenText: "kalem" },
            { id: 2002, word: "kalem", imageUrl: "/images/2002.webp", isCorrect: true, audioKey: "kalem", spokenText: "kalem" }
        ]
    },
    // İp
    {
        id: 3,
        question: "Hangi ip kalın?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu ip kalın.', wrong: 'Hayır, bu ip ince.' }
        },
        options: [
            { id: 2003, word: "ip", imageUrl: "/images/2003.webp", isCorrect: true, audioKey: "ip", spokenText: "ip" },
            { id: 2004, word: "ip", imageUrl: "/images/2004.webp", isCorrect: false, audioKey: "ip", spokenText: "ip" }
        ]
    },
    {
        id: 4,
        question: "Hangi ip ince?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu ip ince.', wrong: 'Hayır, bu ip kalın.' }
        },
        options: [
            { id: 2003, word: "ip", imageUrl: "/images/2003.webp", isCorrect: false, audioKey: "ip", spokenText: "ip" },
            { id: 2004, word: "ip", imageUrl: "/images/2004.webp", isCorrect: true, audioKey: "ip", spokenText: "ip" }
        ]
    },
    // Mum
    {
        id: 5,
        question: "Hangi mum kalın?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu mum kalın.', wrong: 'Hayır, bu mum ince.' }
        },
        options: [
            { id: 2005, word: "mum", imageUrl: "/images/2005.webp", isCorrect: true, audioKey: "mum", spokenText: "mum" },
            { id: 2006, word: "mum", imageUrl: "/images/2006.webp", isCorrect: false, audioKey: "mum", spokenText: "mum" }
        ]
    },
    {
        id: 6,
        question: "Hangi mum ince?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu mum ince.', wrong: 'Hayır, bu mum kalın.' }
        },
        options: [
            { id: 2005, word: "mum", imageUrl: "/images/2005.webp", isCorrect: false, audioKey: "mum", spokenText: "mum" },
            { id: 2006, word: "mum", imageUrl: "/images/2006.webp", isCorrect: true, audioKey: "mum", spokenText: "mum" }
        ]
    },
    // Havuç
    {
        id: 7,
        question: "Hangi havuç kalın?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu havuç kalın.', wrong: 'Hayır, bu havuç ince.' }
        },
        options: [
            { id: 2007, word: "havuç", imageUrl: "/images/2007.webp", isCorrect: true, audioKey: "havuç", spokenText: "havuç" },
            { id: 2008, word: "havuç", imageUrl: "/images/2008.webp", isCorrect: false, audioKey: "havuç", spokenText: "havuç" }
        ]
    },
    {
        id: 8,
        question: "Hangi havuç ince?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu havuç ince.', wrong: 'Hayır, bu havuç kalın.' }
        },
        options: [
            { id: 2007, word: "havuç", imageUrl: "/images/2007.webp", isCorrect: false, audioKey: "havuç", spokenText: "havuç" },
            { id: 2008, word: "havuç", imageUrl: "/images/2008.webp", isCorrect: true, audioKey: "havuç", spokenText: "havuç" }
        ]
    },
    // Ağaç
    {
        id: 9,
        question: "Hangi ağacın gövdesi kalın?",
        questionAudioKey: "", // özel soru: ekranda bu metin görünsün
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { question: 'Hangi ağacın gövdesi kalın?', correct: 'Evet! Bu ağacın gövdesi kalın.', wrong: 'Hayır, bu ağacın gövdesi ince.' }
        },
        options: [
            { id: 2009, word: "ağaç", imageUrl: "/images/2009.webp", isCorrect: true, audioKey: "ağaç", spokenText: "ağaç" },
            { id: 2010, word: "ağaç", imageUrl: "/images/2010.webp", isCorrect: false, audioKey: "ağaç", spokenText: "ağaç" }
        ]
    },
    {
        id: 10,
        question: "Hangi ağacın gövdesi ince?",
        questionAudioKey: "", // özel soru: ekranda bu metin görünsün
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { question: 'Hangi ağacın gövdesi ince?', correct: 'Evet! Bu ağacın gövdesi ince.', wrong: 'Hayır, bu ağacın gövdesi kalın.' }
        },
        options: [
            { id: 2009, word: "ağaç", imageUrl: "/images/2009.webp", isCorrect: false, audioKey: "ağaç", spokenText: "ağaç" },
            { id: 2010, word: "ağaç", imageUrl: "/images/2010.webp", isCorrect: true, audioKey: "ağaç", spokenText: "ağaç" }
        ]
    },
    // Fırça
    {
        id: 11,
        question: "Hangi fırça kalın?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu fırça kalın.', wrong: 'Hayır, bu fırça ince.' }
        },
        options: [
            { id: 2011, word: "fırça", imageUrl: "/images/2011.webp", isCorrect: true, audioKey: "fırça", spokenText: "fırça" },
            { id: 2012, word: "fırça", imageUrl: "/images/2012.webp", isCorrect: false, audioKey: "fırça", spokenText: "fırça" }
        ]
    },
    {
        id: 12,
        question: "Hangi fırça ince?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu fırça ince.', wrong: 'Hayır, bu fırça kalın.' }
        },
        options: [
            { id: 2011, word: "fırça", imageUrl: "/images/2011.webp", isCorrect: false, audioKey: "fırça", spokenText: "fırça" },
            { id: 2012, word: "fırça", imageUrl: "/images/2012.webp", isCorrect: true, audioKey: "fırça", spokenText: "fırça" }
        ]
    },
    // Çivi
    {
        id: 13,
        question: "Hangi çivi kalın?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu çivi kalın.', wrong: 'Hayır, bu çivi ince.' }
        },
        options: [
            { id: 2013, word: "çivi", imageUrl: "/images/2013.webp", isCorrect: true, audioKey: "çivi", spokenText: "çivi" },
            { id: 2014, word: "çivi", imageUrl: "/images/2014.webp", isCorrect: false, audioKey: "çivi", spokenText: "çivi" }
        ]
    },
    {
        id: 14,
        question: "Hangi çivi ince?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu çivi ince.', wrong: 'Hayır, bu çivi kalın.' }
        },
        options: [
            { id: 2013, word: "çivi", imageUrl: "/images/2013.webp", isCorrect: false, audioKey: "çivi", spokenText: "çivi" },
            { id: 2014, word: "çivi", imageUrl: "/images/2014.webp", isCorrect: true, audioKey: "çivi", spokenText: "çivi" }
        ]
    },
    // Havlu
    {
        id: 15,
        question: "Hangi havlu kalın?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu havlu kalın.', wrong: 'Hayır, bu havlu ince.' }
        },
        options: [
            { id: 2015, word: "havlu", imageUrl: "/images/2015.webp", isCorrect: true, audioKey: "havlu", spokenText: "havlu" },
            { id: 2016, word: "havlu", imageUrl: "/images/2016.webp", isCorrect: false, audioKey: "havlu", spokenText: "havlu" }
        ]
    },
    {
        id: 16,
        question: "Hangi havlu ince?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu havlu ince.', wrong: 'Hayır, bu havlu kalın.' }
        },
        options: [
            { id: 2015, word: "havlu", imageUrl: "/images/2015.webp", isCorrect: false, audioKey: "havlu", spokenText: "havlu" },
            { id: 2016, word: "havlu", imageUrl: "/images/2016.webp", isCorrect: true, audioKey: "havlu", spokenText: "havlu" }
        ]
    },
    // Kitap
    {
        id: 17,
        question: "Hangi kitap kalın?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu kitap kalın.', wrong: 'Hayır, bu kitap ince.' }
        },
        options: [
            { id: 2017, word: "kitap", imageUrl: "/images/2017.webp", isCorrect: true, audioKey: "kitap", spokenText: "kitap" },
            { id: 2018, word: "kitap", imageUrl: "/images/2018.webp", isCorrect: false, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    {
        id: 18,
        question: "Hangi kitap ince?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu kitap ince.', wrong: 'Hayır, bu kitap kalın.' }
        },
        options: [
            { id: 2017, word: "kitap", imageUrl: "/images/2017.webp", isCorrect: false, audioKey: "kitap", spokenText: "kitap" },
            { id: 2018, word: "kitap", imageUrl: "/images/2018.webp", isCorrect: true, audioKey: "kitap", spokenText: "kitap" }
        ]
    },
    // Ekmek dilimi
    {
        id: 19,
        question: "Hangi ekmek dilimi kalın?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu ekmek dilimi kalın.', wrong: 'Hayır, bu ekmek ince.' }
        },
        options: [
            { id: 2019, word: "ekmek", imageUrl: "/images/2019.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2020, word: "ekmek", imageUrl: "/images/2020.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    },
    {
        id: 20,
        question: "Hangi ekmek dilimi ince?",
        questionAudioKey: "",
        activityType: ActivityType.ThinThick,
        speech: {
            tr: { correct: 'Evet! Bu ekmek dilimi ince.', wrong: 'Hayır, bu ekmek kalın.' }
        },
        options: [
            { id: 2019, word: "ekmek", imageUrl: "/images/2019.webp", isCorrect: false, audioKey: "ekmek", spokenText: "ekmek" },
            { id: 2020, word: "ekmek", imageUrl: "/images/2020.webp", isCorrect: true, audioKey: "ekmek", spokenText: "ekmek" }
        ]
    }
];
