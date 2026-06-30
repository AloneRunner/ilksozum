import { ActivityType, ConceptRound } from '../../../../types';

// Curated static rounds for Object Recognition (Vehicles) in English
// ID range corrected to 2000s, distractors improved, and expanded to 12 rounds.

export const enVehiclesData: ConceptRound[] = [
  {
    id: 1201, // ID aralığı 2000'e güncellendi
    question: 'Which one is the car?',
    questionAudioKey: 'q_which_is_car',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 1, word: 'araba', imageUrl: '/images/1.png', isCorrect: true, audioKey: 'araba', spokenText: 'car' },
      { id: 621, word: 'gemi', imageUrl: '/images/621.png', isCorrect: false, audioKey: 'gemi', spokenText: 'ship' },
      { id: 110, word: 'bisiklet', imageUrl: '/images/110.png', isCorrect: false, audioKey: 'bisiklet', spokenText: 'bicycle' },
      { id: 106, word: 'tren', imageUrl: '/images/106.png', isCorrect: false, audioKey: 'tren', spokenText: 'train' }
    ]
  },
  {
    id: 1202,
    question: 'Which one is the train?',
    questionAudioKey: 'q_which_is_train',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 106, word: 'tren', imageUrl: '/images/106.png', isCorrect: true, audioKey: 'tren', spokenText: 'train' },
      { id: 204, word: 'roket', imageUrl: '/images/204.png', isCorrect: false, audioKey: 'roket', spokenText: 'rocket' },
      { id: 621, word: 'gemi', imageUrl: '/images/621.png', isCorrect: false, audioKey: 'gemi', spokenText: 'ship' },
      { id: 1, word: 'araba', imageUrl: '/images/1.png', isCorrect: false, audioKey: 'araba', spokenText: 'car' }
    ]
  },
  {
    id: 1203,
    question: 'Which one is the bicycle?',
    questionAudioKey: 'q_which_is_bicycle',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 110, word: 'bisiklet', imageUrl: '/images/110.png', isCorrect: true, audioKey: 'bisiklet', spokenText: 'bicycle' },
      { id: 1, word: 'araba', imageUrl: '/images/1.png', isCorrect: false, audioKey: 'araba', spokenText: 'car' },
      { id: 259, word: 'motosiklet', imageUrl: '/images/259.png', isCorrect: false, audioKey: 'motosiklet', spokenText: 'motorcycle' }, // DÜZELTME: 'uzay' yerine 'motosiklet'
      { id: 621, word: 'gemi', imageUrl: '/images/621.png', isCorrect: false, audioKey: 'gemi', spokenText: 'ship' }
    ]
  },
  {
    id: 1204,
    question: 'Which one is the ship?',
    questionAudioKey: 'q_which_is_ship',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 621, word: 'gemi', imageUrl: '/images/621.png', isCorrect: true, audioKey: 'gemi', spokenText: 'ship' },
      { id: 107, word: 'uçak', imageUrl: '/images/107.png', isCorrect: false, audioKey: 'uçak', spokenText: 'airplane' },
      { id: 493, word: 'sandal', imageUrl: '/images/493.png', isCorrect: false, audioKey: 'sandal', spokenText: 'boat' },
      { id: 106, word: 'tren', imageUrl: '/images/106.png', isCorrect: false, audioKey: 'tren', spokenText: 'train' }
    ]
  },
  {
    id: 1205,
    question: 'Which one is the airplane?',
    questionAudioKey: 'q_which_is_airplane',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 107, word: 'uçak', imageUrl: '/images/107.png', isCorrect: true, audioKey: 'uçak', spokenText: 'airplane' },
      { id: 162, word: 'helikopter', imageUrl: '/images/162.png', isCorrect: false, audioKey: 'helikopter', spokenText: 'helicopter' },
      { id: 204, word: 'roket', imageUrl: '/images/204.png', isCorrect: false, audioKey: 'roket', spokenText: 'rocket' },
      { id: 621, word: 'gemi', imageUrl: '/images/621.png', isCorrect: false, audioKey: 'gemi', spokenText: 'ship' }
    ]
  },
  {
    id: 1206,
    question: 'Which one is the truck?',
    questionAudioKey: 'q_which_is_truck',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 288, word: 'kamyon', imageUrl: '/images/288.png', isCorrect: true, audioKey: 'kamyon', spokenText: 'truck' },
      { id: 105, word: 'okul otobüsü', imageUrl: '/images/105.png', isCorrect: false, audioKey: 'okul_otobüsü', spokenText: 'school bus' },
      { id: 289, word: 'traktör', imageUrl: '/images/289.png', isCorrect: false, audioKey: 'traktör', spokenText: 'tractor' },
      { id: 1, word: 'araba', imageUrl: '/images/1.png', isCorrect: false, audioKey: 'araba', spokenText: 'car' }
    ]
  },
  {
    id: 1207,
    question: 'Which one is the school bus?',
    questionAudioKey: 'q_which_is_school_bus',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 105, word: 'okul otobüsü', imageUrl: '/images/105.png', isCorrect: true, audioKey: 'okul_otobüsü', spokenText: 'school bus' },
      { id: 288, word: 'kamyon', imageUrl: '/images/288.png', isCorrect: false, audioKey: 'kamyon', spokenText: 'truck' },
      { id: 257, word: 'ambulans', imageUrl: '/images/257.png', isCorrect: false, audioKey: 'ambulans', spokenText: 'ambulance' },
      { id: 256, word: 'itfaiye aracı', imageUrl: '/images/256.png', isCorrect: false, audioKey: 'itfaiye_aracı', spokenText: 'fire truck' }
    ]
  },
  {
    id: 1208,
    question: 'Which one is the fire truck?',
    questionAudioKey: 'q_which_is_fire_truck',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 256, word: 'itfaiye aracı', imageUrl: '/images/256.png', isCorrect: true, audioKey: 'itfaiye_aracı', spokenText: 'fire truck' },
      { id: 257, word: 'ambulans', imageUrl: '/images/257.png', isCorrect: false, audioKey: 'ambulans', spokenText: 'ambulance' },
      { id: 258, word: 'polis arabası', imageUrl: '/images/258.png', isCorrect: false, audioKey: 'polis_arabası', spokenText: 'police car' },
      { id: 105, word: 'okul otobüsü', imageUrl: '/images/105.png', isCorrect: false, audioKey: 'okul_otobüsü', spokenText: 'school bus' }
    ]
  },
  {
    id: 1209,
    question: 'Which one is the ambulance?',
    questionAudioKey: 'q_which_is_ambulance',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 257, word: 'ambulans', imageUrl: '/images/257.png', isCorrect: true, audioKey: 'ambulans', spokenText: 'ambulance' },
      { id: 258, word: 'polis arabası', imageUrl: '/images/258.png', isCorrect: false, audioKey: 'polis_arabası', spokenText: 'police car' },
      { id: 256, word: 'itfaiye aracı', imageUrl: '/images/256.png', isCorrect: false, audioKey: 'itfaiye_aracı', spokenText: 'fire truck' },
      { id: 288, word: 'kamyon', imageUrl: '/images/288.png', isCorrect: false, audioKey: 'kamyon', spokenText: 'truck' }
    ]
  },
  {
    id: 1210,
    question: 'Which one is the police car?',
    questionAudioKey: 'q_which_is_police_car',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 258, word: 'polis arabası', imageUrl: '/images/258.png', isCorrect: true, audioKey: 'polis_arabası', spokenText: 'police car' },
      { id: 257, word: 'ambulans', imageUrl: '/images/257.png', isCorrect: false, audioKey: 'ambulans', spokenText: 'ambulance' },
      { id: 256, word: 'itfaiye aracı', imageUrl: '/images/256.png', isCorrect: false, audioKey: 'itfaiye_aracı', spokenText: 'fire truck' },
      { id: 1, word: 'araba', imageUrl: '/images/1.png', isCorrect: false, audioKey: 'araba', spokenText: 'car' }
    ]
  },
  {
    id: 1211,
    question: 'Which one is the helicopter?',
    questionAudioKey: 'q_which_is_helicopter',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 162, word: 'helikopter', imageUrl: '/images/162.png', isCorrect: true, audioKey: 'helikopter', spokenText: 'helicopter' },
      { id: 107, word: 'uçak', imageUrl: '/images/107.png', isCorrect: false, audioKey: 'uçak', spokenText: 'airplane' },
      { id: 204, word: 'roket', imageUrl: '/images/204.png', isCorrect: false, audioKey: 'roket', spokenText: 'rocket' },
      { id: 538, word: 'sıcak hava balonu', imageUrl: '/images/538.png', isCorrect: false, audioKey: 'sıcak_hava_balonu', spokenText: 'hot air balloon' }
    ]
  },
  {
    id: 1212,
    question: 'Which one is the rocket?',
    questionAudioKey: 'q_which_is_rocket',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 204, word: 'roket', imageUrl: '/images/204.png', isCorrect: true, audioKey: 'roket', spokenText: 'rocket' },
      { id: 107, word: 'uçak', imageUrl: '/images/107.png', isCorrect: false, audioKey: 'uçak', spokenText: 'airplane' },
      { id: 162, word: 'helikopter', imageUrl: '/images/162.png', isCorrect: false, audioKey: 'helikopter', spokenText: 'helicopter' },
      { id: 337, word: 'denizaltı', imageUrl: '/images/337.png', isCorrect: false, audioKey: 'denizaltı', spokenText: 'submarine' }
    ]
  }
];