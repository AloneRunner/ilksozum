import { ActivityType } from '../../../../types.ts';

export interface ColorRecognitionRound {
  id: number;
  activityType: ActivityType.ColorRecognition;
  imageId: number;
  word: string;         // nesnenin adı (TR)
  correctColor: string; // renk key'i
  speech?: { tr: { question: string; correct: string; wrong: string } };
}

// Renk seçenekleri — sabit liste, her turda 4 tanesi gösterilir (doğru + 3 rastgele)
export const COLOR_OPTIONS: { key: string; label: string; hex: string }[] = [
  { key: 'kırmızı',     label: 'Kırmızı',     hex: '#ef4444' },
  { key: 'sarı',        label: 'Sarı',         hex: '#facc15' },
  { key: 'turuncu',     label: 'Turuncu',      hex: '#f97316' },
  { key: 'yeşil',       label: 'Yeşil',        hex: '#22c55e' },
  { key: 'mor',         label: 'Mor',          hex: '#a855f7' },
  { key: 'kahverengi',  label: 'Kahverengi',   hex: '#92400e' },
  { key: 'beyaz',       label: 'Beyaz',        hex: '#e2e8f0' },
  { key: 'siyah',       label: 'Siyah',        hex: '#1e293b' },
  { key: 'pembe',       label: 'Pembe',        hex: '#ec4899' },
  { key: 'mavi',        label: 'Mavi',         hex: '#3b82f6' },
];

export const colorRecognitionData: ColorRecognitionRound[] = [
  // === KIRMIZI ===
  {
    id: 1, activityType: ActivityType.ColorRecognition,
    imageId: 43, word: 'elma', correctColor: 'kırmızı',
    speech: { tr: { question: 'Elmanın rengi ne?', correct: 'Evet! Elma kırmızı!', wrong: 'Hayır! Elma kırmızı!' } }
  },
  {
    id: 2, activityType: ActivityType.ColorRecognition,
    imageId: 128, word: 'domates', correctColor: 'kırmızı',
    speech: { tr: { question: 'Domatesin rengi ne?', correct: 'Evet! Domates kırmızı!', wrong: 'Hayır! Domates kırmızı!' } }
  },
  {
    id: 3, activityType: ActivityType.ColorRecognition,
    imageId: 171, word: 'çilek', correctColor: 'kırmızı',
    speech: { tr: { question: 'Çileğin rengi ne?', correct: 'Evet! Çilek kırmızı!', wrong: 'Hayır! Çilek kırmızı!' } }
  },
  {
    id: 4, activityType: ActivityType.ColorRecognition,
    imageId: 183, word: 'kiraz', correctColor: 'kırmızı',
    speech: { tr: { question: 'Kirazın rengi ne?', correct: 'Evet! Kiraz kırmızı!', wrong: 'Hayır! Kiraz kırmızı!' } }
  },

  // === SARI ===
  {
    id: 5, activityType: ActivityType.ColorRecognition,
    imageId: 114, word: 'muz', correctColor: 'sarı',
    speech: { tr: { question: 'Muzun rengi ne?', correct: 'Evet! Muz sarı!', wrong: 'Hayır! Muz sarı!' } }
  },
  {
    id: 6, activityType: ActivityType.ColorRecognition,
    imageId: 237, word: 'güneş', correctColor: 'sarı',
    speech: { tr: { question: 'Güneşin rengi ne?', correct: 'Evet! Güneş sarı!', wrong: 'Hayır! Güneş sarı!' } }
  },
  {
    id: 7, activityType: ActivityType.ColorRecognition,
    imageId: 55, word: 'limon', correctColor: 'sarı',
    speech: { tr: { question: 'Limonun rengi ne?', correct: 'Evet! Limon sarı!', wrong: 'Hayır! Limon sarı!' } }
  },
  {
    id: 8, activityType: ActivityType.ColorRecognition,
    imageId: 853, word: 'mısır', correctColor: 'sarı',
    speech: { tr: { question: 'Mısırın rengi ne?', correct: 'Evet! Mısır sarı!', wrong: 'Hayır! Mısır sarı!' } }
  },

  // === TURUNCU ===
  {
    id: 9, activityType: ActivityType.ColorRecognition,
    imageId: 98, word: 'havuç', correctColor: 'turuncu',
    speech: { tr: { question: 'Havucun rengi ne?', correct: 'Evet! Havuç turuncu!', wrong: 'Hayır! Havuç turuncu!' } }
  },
  {
    id: 10, activityType: ActivityType.ColorRecognition,
    imageId: 115, word: 'portakal', correctColor: 'turuncu',
    speech: { tr: { question: 'Portakalın rengi ne?', correct: 'Evet! Portakal turuncu!', wrong: 'Hayır! Portakal turuncu!' } }
  },

  // === YEŞİL ===
  {
    id: 11, activityType: ActivityType.ColorRecognition,
    imageId: 170, word: 'karpuz', correctColor: 'yeşil',
    speech: { tr: { question: 'Karpuzun rengi ne?', correct: 'Evet! Karpuz yeşil!', wrong: 'Hayır! Karpuz yeşil!' } }
  },
  {
    id: 12, activityType: ActivityType.ColorRecognition,
    imageId: 275, word: 'kurbağa', correctColor: 'yeşil',
    speech: { tr: { question: 'Kurbağanın rengi ne?', correct: 'Evet! Kurbağa yeşil!', wrong: 'Hayır! Kurbağa yeşil!' } }
  },
  {
    id: 13, activityType: ActivityType.ColorRecognition,
    imageId: 8, word: 'ağaç', correctColor: 'yeşil',
    speech: { tr: { question: 'Ağacın rengi ne?', correct: 'Evet! Ağaç yeşil!', wrong: 'Hayır! Ağaç yeşil!' } }
  },
  {
    id: 14, activityType: ActivityType.ColorRecognition,
    imageId: 311, word: 'brokoli', correctColor: 'yeşil',
    speech: { tr: { question: 'Brokolinin rengi ne?', correct: 'Evet! Brokoli yeşil!', wrong: 'Hayır! Brokoli yeşil!' } }
  },

  // === MOR ===
  {
    id: 15, activityType: ActivityType.ColorRecognition,
    imageId: 87, word: 'üzüm', correctColor: 'mor',
    speech: { tr: { question: 'Üzümün rengi ne?', correct: 'Evet! Üzüm mor!', wrong: 'Hayır! Üzüm mor!' } }
  },
  {
    id: 16, activityType: ActivityType.ColorRecognition,
    imageId: 280, word: 'patlıcan', correctColor: 'mor',
    speech: { tr: { question: 'Patlıcanın rengi ne?', correct: 'Evet! Patlıcan mor!', wrong: 'Hayır! Patlıcan mor!' } }
  },

  // === KAHVERENGİ ===
  {
    id: 17, activityType: ActivityType.ColorRecognition,
    imageId: 297, word: 'çikolata', correctColor: 'kahverengi',
    speech: { tr: { question: 'Çikolatanın rengi ne?', correct: 'Evet! Çikolata kahverengi!', wrong: 'Hayır! Çikolata kahverengi!' } }
  },
  {
    id: 18, activityType: ActivityType.ColorRecognition,
    imageId: 916, word: 'ayı', correctColor: 'kahverengi',
    speech: { tr: { question: 'Ayının rengi ne?', correct: 'Evet! Ayı kahverengi!', wrong: 'Hayır! Ayı kahverengi!' } }
  },
  {
    id: 19, activityType: ActivityType.ColorRecognition,
    imageId: 112, word: 'ekmek', correctColor: 'kahverengi',
    speech: { tr: { question: 'Ekmeğin rengi ne?', correct: 'Evet! Ekmek kahverengi!', wrong: 'Hayır! Ekmek kahverengi!' } }
  },

  // === BEYAZ ===
  {
    id: 20, activityType: ActivityType.ColorRecognition,
    imageId: 265, word: 'süt', correctColor: 'beyaz',
    speech: { tr: { question: 'Sütün rengi ne?', correct: 'Evet! Süt beyaz!', wrong: 'Hayır! Süt beyaz!' } }
  },
  {
    id: 21, activityType: ActivityType.ColorRecognition,
    imageId: 236, word: 'bulut', correctColor: 'beyaz',
    speech: { tr: { question: 'Bulutun rengi ne?', correct: 'Evet! Bulut beyaz!', wrong: 'Hayır! Bulut beyaz!' } }
  },
  {
    id: 22, activityType: ActivityType.ColorRecognition,
    imageId: 405, word: 'kar', correctColor: 'beyaz',
    speech: { tr: { question: 'Karın rengi ne?', correct: 'Evet! Kar beyaz!', wrong: 'Hayır! Kar beyaz!' } }
  },

  // === SİYAH ===
  {
    id: 23, activityType: ActivityType.ColorRecognition,
    imageId: 232, word: 'penguen', correctColor: 'siyah',
    speech: { tr: { question: 'Penguenin rengi ne?', correct: 'Evet! Penguen siyah beyaz!', wrong: 'Hayır! Penguen siyah beyaz!' } }
  },
  {
    id: 24, activityType: ActivityType.ColorRecognition,
    imageId: 320, word: 'panda', correctColor: 'siyah',
    speech: { tr: { question: 'Pandanın rengi ne?', correct: 'Evet! Panda siyah beyaz!', wrong: 'Hayır! Panda siyah beyaz!' } }
  },

  // === PEMBE ===
  {
    id: 25, activityType: ActivityType.ColorRecognition,
    imageId: 923, word: 'domuz', correctColor: 'pembe',
    speech: { tr: { question: 'Domuzun rengi ne?', correct: 'Evet! Domuz pembe!', wrong: 'Hayır! Domuz pembe!' } }
  },
];
