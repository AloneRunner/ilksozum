import { SequencingStoryRound, ActivityType } from '../../../../types.ts';

export const sequencingStoryData: SequencingStoryRound[] = [
    {
        id: 1,
        question: 'Olayları doğru sıraya diz.',
        questionAudioKey: 'q_order_events',
        activityType: ActivityType.SequencingStories,
        items: [
            { id: 113, word: 'sağlam yumurta', imageUrl: '/images/113.png', audioKey: 'sağlam_yumurta' },
            { id: 77, word: 'kırık yumurta', imageUrl: '/images/77.png', audioKey: 'kırık_yumurta' },
            { id: 376, word: 'civciv', imageUrl: '/images/376.png', audioKey: 'civciv' },
            { id: 377, word: 'horoz', imageUrl: '/images/377.png', audioKey: 'horoz' }
        ]
    },
    {
        id: 2,
        question: 'Olayları doğru sıraya diz.',
        questionAudioKey: 'q_order_events',
        activityType: ActivityType.SequencingStories,
        items: [
            { id: 445, word: 'tırtıl', imageUrl: '/images/445.png', audioKey: 'tırtıl' },
            { id: 274, word: 'kelebek', imageUrl: '/images/274.png', audioKey: 'kelebek' }
        ]
    },
    {
        id: 3,
        question: 'Olayları doğru sıraya diz.',
        questionAudioKey: 'q_order_events',
        activityType: ActivityType.SequencingStories,
        items: [
            { id: 316, word: 'tohum', imageUrl: '/images/316.png', audioKey: 'tohum' },
            { id: 317, word: 'filiz', imageUrl: '/images/317.png', audioKey: 'filiz' },
            { id: 163, word: 'çiçekli bitki', imageUrl: '/images/163.png', audioKey: 'çiçekli_bitki' }
        ]
    },
    {
        id: 4,
        question: 'Olayları doğru sıraya diz.',
        questionAudioKey: 'q_order_events',
        activityType: ActivityType.SequencingStories,
        items: [
            { id: 624, word: 'sandviç malzemeleri', imageUrl: '/images/624.png', audioKey: 'sandviç_malzemeleri' },
            { id: 623, word: 'hazır sandviç', imageUrl: '/images/623.png', audioKey: 'hazır_sandviç' }
        ]
    },
    {
        id: 5,
        question: 'Olayları doğru sıraya diz.',
        questionAudioKey: 'q_order_events',
        activityType: ActivityType.SequencingStories,
        items: [
            { id: 402, word: 'boş kağıt ve boya', imageUrl: '/images/402.png', audioKey: 'boş_kağıt_ve_boya' },
            { id: 401, word: 'yapılmış resim', imageUrl: '/images/401.png', audioKey: 'yapılmış_resim' }
        ]
    },
    {
        id: 6,
        question: 'Olayları doğru sıraya diz.',
        questionAudioKey: 'q_order_events',
        activityType: ActivityType.SequencingStories,
        items: [
            { id: 588, word: 'hamur', imageUrl: '/images/588.png', audioKey: 'hamur' },
            { id: 112, word: 'pişmiş ekmek', imageUrl: '/images/112.png', audioKey: 'pişmiş_ekmek' }
        ]
    },
    {
        id: 7,
        question: 'Olayları doğru sıraya diz.',
        questionAudioKey: 'q_order_events',
        activityType: ActivityType.SequencingStories,
        items: [
            { id: 591, word: 'kirli el', imageUrl: '/images/591.png', audioKey: 'kirli_el' },
            { id: 590, word: 'temiz el', imageUrl: '/images/590.png', audioKey: 'temiz_el' }
        ]
    },
    {
        id: 8,
        question: 'Olayları doğru sıraya diz.',
        questionAudioKey: 'q_order_events',
        activityType: ActivityType.SequencingStories,
        items: [
            { id: 229, word: 'dağınık oda', imageUrl: '/images/229.png', audioKey: 'dağınık_oda' },
            { id: 230, word: 'toplu oda', imageUrl: '/images/230.png', audioKey: 'toplu_oda' }
        ]
    },
    {
        id: 9,
        question: 'Olayları doğru sıraya diz.',
        questionAudioKey: 'q_order_events',
        activityType: ActivityType.SequencingStories,
        items: [
            { id: 583, word: 'iribaş', imageUrl: '/images/583.png', audioKey: 'iribaş' },
            { id: 275, word: 'kurbağa', imageUrl: '/images/275.png', audioKey: 'kurbağa' }
        ]
    }
    // Yapboz turu çıkarıldı (2026-10-27): yeni görsellerde dağınık ve tamamlanmış yapboz aynı resme düşüyor (8480), tur çözülemiyordu.
];