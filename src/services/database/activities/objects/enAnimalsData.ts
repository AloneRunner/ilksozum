import { ActivityType, ConceptRound } from '../../../../types';

// Curated static rounds for Object Recognition (Animals) in English
// Expanded to 12 rounds using main visual IDs.

export const enAnimalsData: ConceptRound[] = [
  {
    id: 1001,
    question: 'Which one is the cat?',
    questionAudioKey: 'q_which_is_cat_person',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 16, word: 'kedi', imageUrl: '/images/16.png', isCorrect: true, audioKey: 'kedi', spokenText: 'cat' },
      { id: 100, word: 'aslan', imageUrl: '/images/100.png', isCorrect: false, audioKey: 'aslan', spokenText: 'lion' },
      { id: 47, word: 'köpek', imageUrl: '/images/47.png', isCorrect: false, audioKey: 'köpek', spokenText: 'dog' },
      { id: 26, word: 'ördek', imageUrl: '/images/26.png', isCorrect: false, audioKey: 'ördek', spokenText: 'duck' }
    ]
  },
  {
    id: 1002,
    question: 'Which one is the dog?',
    questionAudioKey: 'q_which_is_dog',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 47, word: 'köpek', imageUrl: '/images/47.png', isCorrect: true, audioKey: 'köpek', spokenText: 'dog' },
      { id: 274, word: 'kelebek', imageUrl: '/images/274.png', isCorrect: false, audioKey: 'kelebek', spokenText: 'butterfly' },
      { id: 16, word: 'kedi', imageUrl: '/images/16.png', isCorrect: false, audioKey: 'kedi', spokenText: 'cat' },
      { id: 400, word: 'balık', imageUrl: '/images/400.png', isCorrect: false, audioKey: 'balık', spokenText: 'fish' }
    ]
  },
  {
    id: 1003,
    question: 'Which one is the lion?',
    questionAudioKey: 'q_which_is_lion_person',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 100, word: 'aslan', imageUrl: '/images/100.png', isCorrect: true, audioKey: 'aslan', spokenText: 'lion' },
      { id: 28, word: 'fil', imageUrl: '/images/28.png', isCorrect: false, audioKey: 'fil', spokenText: 'elephant' },
      { id: 101, word: 'zürafa', imageUrl: '/images/101.png', isCorrect: false, audioKey: 'zürafa', spokenText: 'giraffe' },
      { id: 47, word: 'köpek', imageUrl: '/images/47.png', isCorrect: false, audioKey: 'köpek', spokenText: 'dog' }
    ]
  },
  {
    id: 1004,
    question: 'Which one is the elephant?',
    questionAudioKey: 'q_which_is_elephant_person',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 28, word: 'fil', imageUrl: '/images/28.png', isCorrect: true, audioKey: 'fil', spokenText: 'elephant' },
      { id: 29, word: 'fare', imageUrl: '/images/29.png', isCorrect: false, audioKey: 'fare', spokenText: 'mouse' },
      { id: 100, word: 'aslan', imageUrl: '/images/100.png', isCorrect: false, audioKey: 'aslan', spokenText: 'lion' },
      { id: 320, word: 'panda', imageUrl: '/images/320.png', isCorrect: false, audioKey: 'panda', spokenText: 'panda' }
    ]
  },
  {
    id: 1005,
    question: 'Which one is the fish?',
    questionAudioKey: 'q_which_is_fish_person',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 400, word: 'balık', imageUrl: '/images/400.png', isCorrect: true, audioKey: 'balık', spokenText: 'fish' },
      { id: 275, word: 'kurbağa', imageUrl: '/images/275.png', isCorrect: false, audioKey: 'kurbağa', spokenText: 'frog' },
      { id: 73, word: 'kuş', imageUrl: '/images/73.png', isCorrect: false, audioKey: 'kuş', spokenText: 'bird' },
      { id: 26, word: 'ördek', imageUrl: '/images/26.png', isCorrect: false, audioKey: 'ördek', spokenText: 'duck' }
    ]
  },
  {
    id: 1006,
    question: 'Which one is the bird?',
    questionAudioKey: 'q_which_is_bird_person',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 73, word: 'kuş', imageUrl: '/images/73.png', isCorrect: true, audioKey: 'kuş', spokenText: 'bird' },
      { id: 274, word: 'kelebek', imageUrl: '/images/274.png', isCorrect: false, audioKey: 'kelebek', spokenText: 'butterfly' },
      { id: 102, word: 'horoz', imageUrl: '/images/102.png', isCorrect: false, audioKey: 'horoz', spokenText: 'rooster' },
      { id: 26, word: 'ördek', imageUrl: '/images/26.png', isCorrect: false, audioKey: 'ördek', spokenText: 'duck' }
    ]
  },
  {
    id: 1007,
    question: 'Which one is the rabbit?',
    questionAudioKey: 'q_which_is_rabbit_person',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 41, word: 'tavşan', imageUrl: '/images/41.png', isCorrect: true, audioKey: 'tavşan', spokenText: 'rabbit' },
      { id: 47, word: 'köpek', imageUrl: '/images/47.png', isCorrect: false, audioKey: 'köpek', spokenText: 'dog' },
      { id: 16, word: 'kedi', imageUrl: '/images/16.png', isCorrect: false, audioKey: 'kedi', spokenText: 'cat' },
      { id: 29, word: 'fare', imageUrl: '/images/29.png', isCorrect: false, audioKey: 'fare', spokenText: 'mouse' }
    ]
  },
  {
    id: 1008,
    question: 'Which one is the giraffe?',
    questionAudioKey: 'q_which_is_giraffe_person',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 101, word: 'zürafa', imageUrl: '/images/101.png', isCorrect: true, audioKey: 'zürafa', spokenText: 'giraffe' },
      { id: 28, word: 'fil', imageUrl: '/images/28.png', isCorrect: false, audioKey: 'fil', spokenText: 'elephant' },
      { id: 290, word: 'at', imageUrl: '/images/290.png', isCorrect: false, audioKey: 'at', spokenText: 'horse' },
      { id: 291, word: 'inek', imageUrl: '/images/291.png', isCorrect: false, audioKey: 'inek', spokenText: 'cow' }
    ]
  },
  {
    id: 1009,
    question: 'Which one is the butterfly?',
    questionAudioKey: 'q_which_is_butterfly_person',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 274, word: 'kelebek', imageUrl: '/images/274.png', isCorrect: true, audioKey: 'kelebek', spokenText: 'butterfly' },
      { id: 273, word: 'arı', imageUrl: '/images/273.png', isCorrect: false, audioKey: 'arı', spokenText: 'bee' },
      { id: 92, word: 'uğur böceği', imageUrl: '/images/92.png', isCorrect: false, audioKey: 'uğur_böceği', spokenText: 'ladybug' },
      { id: 73, word: 'kuş', imageUrl: '/images/73.png', isCorrect: false, audioKey: 'kuş', spokenText: 'bird' }
    ]
  },
  {
    id: 1010,
    question: 'Which one is the bee?',
    questionAudioKey: 'q_which_is_bee_person',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 273, word: 'arı', imageUrl: '/images/273.png', isCorrect: true, audioKey: 'arı', spokenText: 'bee' },
      { id: 274, word: 'kelebek', imageUrl: '/images/274.png', isCorrect: false, audioKey: 'kelebek', spokenText: 'butterfly' },
      { id: 349, word: 'karınca', imageUrl: '/images/349.png', isCorrect: false, audioKey: 'karınca', spokenText: 'ant' },
      { id: 92, word: 'uğur böceği', imageUrl: '/images/92.png', isCorrect: false, audioKey: 'uğur_böceği', spokenText: 'ladybug' }
    ]
  },
  {
    id: 1011,
    question: 'Which one is the duck?',
    questionAudioKey: 'q_which_is_duck_person',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 26, word: 'ördek', imageUrl: '/images/26.png', isCorrect: true, audioKey: 'ördek', spokenText: 'duck' },
      { id: 377, word: 'tavuk', imageUrl: '/images/377.png', isCorrect: false, audioKey: 'tavuk', spokenText: 'chicken' },
      { id: 102, word: 'horoz', imageUrl: '/images/102.png', isCorrect: false, audioKey: 'horoz', spokenText: 'rooster' },
      { id: 73, word: 'kuş', imageUrl: '/images/73.png', isCorrect: false, audioKey: 'kuş', spokenText: 'bird' }
    ]
  },
  {
    id: 1012,
    question: 'Which one is the turtle?',
    questionAudioKey: 'q_which_is_turtle_person',
    activityType: ActivityType.ObjectRecognition,
    options: [
      { id: 42, word: 'kaplumbağa', imageUrl: '/images/42.png', isCorrect: true, audioKey: 'kaplumbağa', spokenText: 'turtle' },
      { id: 323, word: 'yılan', imageUrl: '/images/323.png', isCorrect: false, audioKey: 'yılan', spokenText: 'snake' },
      { id: 275, word: 'kurbağa', imageUrl: '/images/275.png', isCorrect: false, audioKey: 'kurbağa', spokenText: 'frog' },
      { id: 222, word: 'salyangoz', imageUrl: '/images/222.webp', isCorrect: false, audioKey: 'salyangoz', spokenText: 'snail' }
    ]
  }
];