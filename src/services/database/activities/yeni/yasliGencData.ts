// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-cift.mjs (yasli-genc). Elle düzenleme.
// 6 çift, 12 soru. Görseller: gorsel-ham/yasli-genc/ → id 4401-4412.
import { ConceptRound, ActivityType } from '../../../../types';

export const youngOldDataYeni: ConceptRound[] = [
    // adam
    {
        id: 1,
        question: "Hangi adam yaşlı?",
        questionAudioKey: "",
        activityType: ActivityType.YoungOld,
        speech: {
            tr: { question: 'Hangi adam yaşlı?', correct: 'Evet! Adam yaşlıdır.', wrong: 'Hayır, bu adam gençtir.' }
        },
        options: [
            { id: 4402, word: "adam", imageUrl: "/images/4402.webp", isCorrect: true, audioKey: "adam", spokenText: "adam" },
            { id: 4401, word: "adam", imageUrl: "/images/4401.webp", isCorrect: false, audioKey: "adam", spokenText: "adam" }
        ]
    },
    {
        id: 2,
        question: "Hangi adam genç?",
        questionAudioKey: "",
        activityType: ActivityType.YoungOld,
        speech: {
            tr: { question: 'Hangi adam genç?', correct: 'Evet! Adam gençtir.', wrong: 'Hayır, bu adam yaşlıdır.' }
        },
        options: [
            { id: 4401, word: "adam", imageUrl: "/images/4401.webp", isCorrect: true, audioKey: "adam", spokenText: "adam" },
            { id: 4402, word: "adam", imageUrl: "/images/4402.webp", isCorrect: false, audioKey: "adam", spokenText: "adam" }
        ]
    },
    // aslan
    {
        id: 3,
        question: "Hangi aslan yaşlı?",
        questionAudioKey: "",
        activityType: ActivityType.YoungOld,
        speech: {
            tr: { question: 'Hangi aslan yaşlı?', correct: 'Evet! Aslan yaşlıdır.', wrong: 'Hayır, bu aslan gençtir.' }
        },
        options: [
            { id: 4404, word: "aslan", imageUrl: "/images/4404.webp", isCorrect: true, audioKey: "aslan", spokenText: "aslan" },
            { id: 4403, word: "aslan", imageUrl: "/images/4403.webp", isCorrect: false, audioKey: "aslan", spokenText: "aslan" }
        ]
    },
    {
        id: 4,
        question: "Hangi aslan genç?",
        questionAudioKey: "",
        activityType: ActivityType.YoungOld,
        speech: {
            tr: { question: 'Hangi aslan genç?', correct: 'Evet! Aslan gençtir.', wrong: 'Hayır, bu aslan yaşlıdır.' }
        },
        options: [
            { id: 4403, word: "aslan", imageUrl: "/images/4403.webp", isCorrect: true, audioKey: "aslan", spokenText: "aslan" },
            { id: 4404, word: "aslan", imageUrl: "/images/4404.webp", isCorrect: false, audioKey: "aslan", spokenText: "aslan" }
        ]
    },
    // at
    {
        id: 5,
        question: "Hangi at yaşlı?",
        questionAudioKey: "",
        activityType: ActivityType.YoungOld,
        speech: {
            tr: { question: 'Hangi at yaşlı?', correct: 'Evet! At yaşlıdır.', wrong: 'Hayır, bu at gençtir.' }
        },
        options: [
            { id: 4406, word: "at", imageUrl: "/images/4406.webp", isCorrect: true, audioKey: "at", spokenText: "at" },
            { id: 4405, word: "at", imageUrl: "/images/4405.webp", isCorrect: false, audioKey: "at", spokenText: "at" }
        ]
    },
    {
        id: 6,
        question: "Hangi at genç?",
        questionAudioKey: "",
        activityType: ActivityType.YoungOld,
        speech: {
            tr: { question: 'Hangi at genç?', correct: 'Evet! At gençtir.', wrong: 'Hayır, bu at yaşlıdır.' }
        },
        options: [
            { id: 4405, word: "at", imageUrl: "/images/4405.webp", isCorrect: true, audioKey: "at", spokenText: "at" },
            { id: 4406, word: "at", imageUrl: "/images/4406.webp", isCorrect: false, audioKey: "at", spokenText: "at" }
        ]
    },
    // kadın
    {
        id: 7,
        question: "Hangi kadın yaşlı?",
        questionAudioKey: "",
        activityType: ActivityType.YoungOld,
        speech: {
            tr: { question: 'Hangi kadın yaşlı?', correct: 'Evet! Kadın yaşlıdır.', wrong: 'Hayır, bu kadın gençtir.' }
        },
        options: [
            { id: 4408, word: "kadın", imageUrl: "/images/4408.webp", isCorrect: true, audioKey: "kadın", spokenText: "kadın" },
            { id: 4407, word: "kadın", imageUrl: "/images/4407.webp", isCorrect: false, audioKey: "kadın", spokenText: "kadın" }
        ]
    },
    {
        id: 8,
        question: "Hangi kadın genç?",
        questionAudioKey: "",
        activityType: ActivityType.YoungOld,
        speech: {
            tr: { question: 'Hangi kadın genç?', correct: 'Evet! Kadın gençtir.', wrong: 'Hayır, bu kadın yaşlıdır.' }
        },
        options: [
            { id: 4407, word: "kadın", imageUrl: "/images/4407.webp", isCorrect: true, audioKey: "kadın", spokenText: "kadın" },
            { id: 4408, word: "kadın", imageUrl: "/images/4408.webp", isCorrect: false, audioKey: "kadın", spokenText: "kadın" }
        ]
    },
    // kedi
    {
        id: 9,
        question: "Hangi kedi yaşlı?",
        questionAudioKey: "",
        activityType: ActivityType.YoungOld,
        speech: {
            tr: { question: 'Hangi kedi yaşlı?', correct: 'Evet! Kedi yaşlıdır.', wrong: 'Hayır, bu kedi gençtir.' }
        },
        options: [
            { id: 4410, word: "kedi", imageUrl: "/images/4410.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 4409, word: "kedi", imageUrl: "/images/4409.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    {
        id: 10,
        question: "Hangi kedi genç?",
        questionAudioKey: "",
        activityType: ActivityType.YoungOld,
        speech: {
            tr: { question: 'Hangi kedi genç?', correct: 'Evet! Kedi gençtir.', wrong: 'Hayır, bu kedi yaşlıdır.' }
        },
        options: [
            { id: 4409, word: "kedi", imageUrl: "/images/4409.webp", isCorrect: true, audioKey: "kedi", spokenText: "kedi" },
            { id: 4410, word: "kedi", imageUrl: "/images/4410.webp", isCorrect: false, audioKey: "kedi", spokenText: "kedi" }
        ]
    },
    // köpek
    {
        id: 11,
        question: "Hangi köpek yaşlı?",
        questionAudioKey: "",
        activityType: ActivityType.YoungOld,
        speech: {
            tr: { question: 'Hangi köpek yaşlı?', correct: 'Evet! Köpek yaşlıdır.', wrong: 'Hayır, bu köpek gençtir.' }
        },
        options: [
            { id: 4412, word: "köpek", imageUrl: "/images/4412.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 4411, word: "köpek", imageUrl: "/images/4411.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
    {
        id: 12,
        question: "Hangi köpek genç?",
        questionAudioKey: "",
        activityType: ActivityType.YoungOld,
        speech: {
            tr: { question: 'Hangi köpek genç?', correct: 'Evet! Köpek gençtir.', wrong: 'Hayır, bu köpek yaşlıdır.' }
        },
        options: [
            { id: 4411, word: "köpek", imageUrl: "/images/4411.webp", isCorrect: true, audioKey: "köpek", spokenText: "köpek" },
            { id: 4412, word: "köpek", imageUrl: "/images/4412.webp", isCorrect: false, audioKey: "köpek", spokenText: "köpek" }
        ]
    },
];
