import { ActivityType } from '../../../../types.ts';

export interface WhatsMissingItem {
  id: number;
  word: string;
  imageUrl: string;
}

export interface WhatsMissingRound {
  id: number;
  activityType: ActivityType.WhatsMissing;
  items: WhatsMissingItem[];   // 4 nesne gösterilir
  missingIndex: number;        // hangisi kaybolacak (0-3)
}

export const whatsMissingData: WhatsMissingRound[] = [
  {
    id: 1, activityType: ActivityType.WhatsMissing, missingIndex: 2,
    items: [
      { id: 43,  word: 'elma',    imageUrl: '/images/43.png' },
      { id: 114, word: 'muz',     imageUrl: '/images/114.png' },
      { id: 128, word: 'domates', imageUrl: '/images/128.png' },
      { id: 87,  word: 'üzüm',   imageUrl: '/images/87.png' },
    ]
  },
  {
    id: 2, activityType: ActivityType.WhatsMissing, missingIndex: 0,
    items: [
      { id: 47,  word: 'köpek',   imageUrl: '/images/47.png' },
      { id: 16,  word: 'kedi',    imageUrl: '/images/16.png' },
      { id: 41,  word: 'tavşan',  imageUrl: '/images/41.png' },
      { id: 100, word: 'aslan',   imageUrl: '/images/100.png' },
    ]
  },
  {
    id: 3, activityType: ActivityType.WhatsMissing, missingIndex: 3,
    items: [
      { id: 1,   word: 'araba',   imageUrl: '/images/1.png' },
      { id: 106, word: 'tren',    imageUrl: '/images/106.png' },
      { id: 107, word: 'uçak',    imageUrl: '/images/107.png' },
      { id: 110, word: 'bisiklet',imageUrl: '/images/110.png' },
    ]
  },
  {
    id: 4, activityType: ActivityType.WhatsMissing, missingIndex: 1,
    items: [
      { id: 156, word: 'top',     imageUrl: '/images/156.png' },
      { id: 204, word: 'roket',   imageUrl: '/images/204.png' },
      { id: 180, word: 'gitar',   imageUrl: '/images/180.png' },
      { id: 208, word: 'keman',   imageUrl: '/images/208.png' },
    ]
  },
  {
    id: 5, activityType: ActivityType.WhatsMissing, missingIndex: 2,
    items: [
      { id: 237, word: 'güneş',   imageUrl: '/images/237.png' },
      { id: 236, word: 'bulut',   imageUrl: '/images/236.png' },
      { id: 405, word: 'kar',     imageUrl: '/images/405.png' },
      { id: 52,  word: 'yağmur',  imageUrl: '/images/52.png' },
    ]
  },
  {
    id: 6, activityType: ActivityType.WhatsMissing, missingIndex: 0,
    items: [
      { id: 324, word: 'doktor',      imageUrl: '/images/324.png' },
      { id: 325, word: 'polis',       imageUrl: '/images/325.png' },
      { id: 326, word: 'aşçı',        imageUrl: '/images/326.png' },
      { id: 84,  word: 'öğretmen',    imageUrl: '/images/84.png' },
    ]
  },
  {
    id: 7, activityType: ActivityType.WhatsMissing, missingIndex: 3,
    items: [
      { id: 55,  word: 'limon',   imageUrl: '/images/55.png' },
      { id: 98,  word: 'havuç',   imageUrl: '/images/98.png' },
      { id: 115, word: 'portakal',imageUrl: '/images/115.png' },
      { id: 171, word: 'çilek',   imageUrl: '/images/171.png' },
    ]
  },
  {
    id: 8, activityType: ActivityType.WhatsMissing, missingIndex: 1,
    items: [
      { id: 578, word: 'dede',    imageUrl: '/images/578.png' },
      { id: 579, word: 'bebek',   imageUrl: '/images/579.png' },
      { id: 828, word: 'baba',    imageUrl: '/images/828.png' },
      { id: 711, word: 'anne',    imageUrl: '/images/711.png' },
    ]
  },
  {
    id: 9, activityType: ActivityType.WhatsMissing, missingIndex: 2,
    items: [
      { id: 273, word: 'arı',     imageUrl: '/images/273.png' },
      { id: 41,  word: 'tavşan',  imageUrl: '/images/41.png' },
      { id: 749, word: 'kuş',     imageUrl: '/images/749.png' },
      { id: 321, word: 'tavuk',   imageUrl: '/images/321.png' },
    ]
  },
  {
    id: 10, activityType: ActivityType.WhatsMissing, missingIndex: 0,
    items: [
      { id: 142, word: 'anahtar', imageUrl: '/images/142.png' },
      { id: 946, word: 'kumanda', imageUrl: '/images/946.png' },
      { id: 576, word: 'kravat',  imageUrl: '/images/576.png' },
      { id: 437, word: 'baston',  imageUrl: '/images/437.png' },
    ]
  },
];
