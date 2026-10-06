import { PatternRound, ActivityType } from '../../../../types.ts';

export const patternCompletionData: PatternRound[] = [
    // === SEVİYE 1: Basit 2'li tekrar (AB-AB) ===
    {
        id: 1, question: 'Sıradaki hangisi?', questionAudioKey: 'q_what_is_next', activityType: ActivityType.PatternCompletion,
        pattern: [ { id: 43, word: 'elma', imageUrl: '/images/43.png'}, { id: 114, word: 'muz', imageUrl: '/images/114.png'}, { id: 43, word: 'elma', imageUrl: '/images/43.png'} ],
        options: [ { id: 114, word: 'muz', imageUrl: '/images/114.png'}, { id: 43, word: 'elma', imageUrl: '/images/43.png'} ],
        answer: { id: 114, word: 'muz', imageUrl: '/images/114.png'}
    },
    {
        id: 2, question: 'Sıradaki hangisi?', questionAudioKey: 'q_what_is_next', activityType: ActivityType.PatternCompletion,
        pattern: [ { id: 237, word: 'güneş', imageUrl: '/images/237.png'}, { id: 238, word: 'ay', imageUrl: '/images/238.png'}, { id: 237, word: 'güneş', imageUrl: '/images/237.png'} ],
        options: [ { id: 237, word: 'güneş', imageUrl: '/images/237.png'}, { id: 238, word: 'ay', imageUrl: '/images/238.png'} ],
        answer: { id: 238, word: 'ay', imageUrl: '/images/238.png'}
    },
    {
        id: 3, question: 'Sıradaki hangisi?', questionAudioKey: 'q_what_is_next', activityType: ActivityType.PatternCompletion,
        pattern: [ { id: 79, word: 'pantolon', imageUrl: '/images/79.png'}, { id: 13, word: 'tişört', imageUrl: '/images/13.png'}, { id: 79, word: 'pantolon', imageUrl: '/images/79.png'} ],
        options: [ { id: 13, word: 'tişört', imageUrl: '/images/13.png'}, { id: 79, word: 'pantolon', imageUrl: '/images/79.png'} ],
        answer: { id: 13, word: 'tişört', imageUrl: '/images/13.png'}
    },
    {
        id: 4, question: 'Sıradaki hangisi?', questionAudioKey: 'q_what_is_next', activityType: ActivityType.PatternCompletion,
        pattern: [ { id: 157, word: 'şemsiye', imageUrl: '/images/157.png'}, { id: 52, word: 'yağmur', imageUrl: '/images/52.png'}, { id: 157, word: 'şemsiye', imageUrl: '/images/157.png'} ],
        options: [ { id: 52, word: 'yağmur', imageUrl: '/images/52.png'}, { id: 157, word: 'şemsiye', imageUrl: '/images/157.png'} ],
        answer: { id: 52, word: 'yağmur', imageUrl: '/images/52.png'}
    },

    // === SEVİYE 2: Orta 3'lü tekrar (ABC-ABC) ===
    {
        id: 5, question: 'Sıradaki hangisi?', questionAudioKey: 'q_what_is_next', activityType: ActivityType.PatternCompletion,
        pattern: [ { id: 580, word: 'kedi', imageUrl: '/images/580.png'}, { id: 582, word: 'köpek', imageUrl: '/images/582.png'}, { id: 73, word: 'kuş', imageUrl: '/images/73.png'}, { id: 580, word: 'kedi', imageUrl: '/images/580.png'} ],
        options: [ { id: 582, word: 'köpek', imageUrl: '/images/582.png'}, { id: 73, word: 'kuş', imageUrl: '/images/73.png'} ],
        answer: { id: 582, word: 'köpek', imageUrl: '/images/582.png'}
    },
    {
        id: 6, question: 'Sıradaki hangisi?', questionAudioKey: 'q_what_is_next', activityType: ActivityType.PatternCompletion,
        pattern: [ { id: 65, word: 'daire', imageUrl: '/images/65.png'}, { id: 67, word: 'üçgen', imageUrl: '/images/67.png'}, { id: 66, word: 'kare', imageUrl: '/images/7211.webp'} ],
        options: [ { id: 65, word: 'daire', imageUrl: '/images/65.png'}, { id: 67, word: 'üçgen', imageUrl: '/images/67.png'} ],
        answer: { id: 65, word: 'daire', imageUrl: '/images/65.png'}
    },
    {
        id: 7, question: 'Sıradaki hangisi?', questionAudioKey: 'q_what_is_next', activityType: ActivityType.PatternCompletion,
        pattern: [ { id: 125, word: 'kaşık', imageUrl: '/images/125.png'}, { id: 126, word: 'çatal', imageUrl: '/images/126.png'}, { id: 262, word: 'bıçak', imageUrl: '/images/262.png'} ],
        options: [ { id: 125, word: 'kaşık', imageUrl: '/images/125.png'}, { id: 262, word: 'bıçak', imageUrl: '/images/262.png'} ],
        answer: { id: 125, word: 'kaşık', imageUrl: '/images/125.png'}
    },
    {
        id: 8, question: 'Sıradaki hangisi?', questionAudioKey: 'q_what_is_next', activityType: ActivityType.PatternCompletion,
        pattern: [ { id: 1, word: 'araba', imageUrl: '/images/1.png'}, { id: 107, word: 'uçak', imageUrl: '/images/107.png'}, { id: 492, word: 'gemi', imageUrl: '/images/492.png'}, { id: 1, word: 'araba', imageUrl: '/images/1.png'} ],
        options: [ { id: 107, word: 'uçak', imageUrl: '/images/107.png'}, { id: 492, word: 'gemi', imageUrl: '/images/492.png'} ],
        answer: { id: 107, word: 'uçak', imageUrl: '/images/107.png'}
    },

    // === SEVİYE 3: Karmaşık 4'lü / AABB pattern ===
    {
        id: 9, question: 'Sıradaki hangisi?', questionAudioKey: 'q_what_is_next', activityType: ActivityType.PatternCompletion,
        pattern: [ { id: 43, word: 'elma', imageUrl: '/images/43.png'}, { id: 43, word: 'elma', imageUrl: '/images/43.png'}, { id: 114, word: 'muz', imageUrl: '/images/114.png'}, { id: 114, word: 'muz', imageUrl: '/images/114.png'}, { id: 43, word: 'elma', imageUrl: '/images/43.png'} ],
        options: [ { id: 43, word: 'elma', imageUrl: '/images/43.png'}, { id: 114, word: 'muz', imageUrl: '/images/114.png'} ],
        answer: { id: 43, word: 'elma', imageUrl: '/images/43.png'}
    },
    {
        id: 10, question: 'Sıradaki hangisi?', questionAudioKey: 'q_what_is_next', activityType: ActivityType.PatternCompletion,
        pattern: [ { id: 65, word: 'daire', imageUrl: '/images/65.png'}, { id: 66, word: 'kare', imageUrl: '/images/7211.webp'}, { id: 67, word: 'üçgen', imageUrl: '/images/67.png'}, { id: 69, word: 'yıldız', imageUrl: '/images/7221.webp'}, { id: 65, word: 'daire', imageUrl: '/images/65.png'} ],
        options: [ { id: 66, word: 'kare', imageUrl: '/images/7211.webp'}, { id: 67, word: 'üçgen', imageUrl: '/images/67.png'} ],
        answer: { id: 66, word: 'kare', imageUrl: '/images/7211.webp'}
    },
    {
        id: 11, question: 'Sıradaki hangisi?', questionAudioKey: 'q_what_is_next', activityType: ActivityType.PatternCompletion,
        pattern: [ { id: 237, word: 'güneş', imageUrl: '/images/237.png'}, { id: 237, word: 'güneş', imageUrl: '/images/237.png'}, { id: 238, word: 'ay', imageUrl: '/images/238.png'}, { id: 238, word: 'ay', imageUrl: '/images/238.png'} ],
        options: [ { id: 237, word: 'güneş', imageUrl: '/images/237.png'}, { id: 238, word: 'ay', imageUrl: '/images/238.png'} ],
        answer: { id: 237, word: 'güneş', imageUrl: '/images/237.png'}
    },
    {
        id: 12, question: 'Sıradaki hangisi?', questionAudioKey: 'q_what_is_next', activityType: ActivityType.PatternCompletion,
        pattern: [ { id: 1, word: 'araba', imageUrl: '/images/1.png'}, { id: 1, word: 'araba', imageUrl: '/images/1.png'}, { id: 110, word: 'bisiklet', imageUrl: '/images/110.png'} ],
        options: [ { id: 1, word: 'araba', imageUrl: '/images/1.png'}, { id: 110, word: 'bisiklet', imageUrl: '/images/110.png'} ],
        answer: { id: 110, word: 'bisiklet', imageUrl: '/images/110.png'}
    },
];