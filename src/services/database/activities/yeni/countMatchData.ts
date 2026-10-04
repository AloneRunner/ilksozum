// OTOMATİK ÜRETİLDİ: tools/gorsel-envanter/uret-sayi.mjs. Elle düzenleme.
// Kaç Tane?: el N parmak gösterir; aynı nesnenin 1-5 adedi zar düzeninde (id 6701+). 25 soru.
import { ConceptRound, ActivityType } from '../../../../types';

export const countMatchDataYeni: ConceptRound[] = [
  {
    id: 12001,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1002, word: 'bir parmak gösteren el', imageUrl: '/images/1002.png', audioKeys: { default: 'bir parmak gösteren el' }, tags: { category: 'eller', count: 1 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada bir elma var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6701, word: "bir elma", spokenText: "bir elma", imageUrl: "/images/6701.webp", audioKey: "bir elma", isCorrect: true },
      { id: 6705, word: "beş elma", spokenText: "beş elma", imageUrl: "/images/6705.webp", audioKey: "beş elma", isCorrect: false },
      { id: 6703, word: "üç elma", spokenText: "üç elma", imageUrl: "/images/6703.webp", audioKey: "üç elma", isCorrect: false }
    ]
  },
  {
    id: 12002,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1002, word: 'bir parmak gösteren el', imageUrl: '/images/1002.png', audioKeys: { default: 'bir parmak gösteren el' }, tags: { category: 'eller', count: 1 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada bir top var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6706, word: "bir top", spokenText: "bir top", imageUrl: "/images/6706.webp", audioKey: "bir top", isCorrect: true },
      { id: 6709, word: "dört top", spokenText: "dört top", imageUrl: "/images/6709.webp", audioKey: "dört top", isCorrect: false },
      { id: 6707, word: "iki top", spokenText: "iki top", imageUrl: "/images/6707.webp", audioKey: "iki top", isCorrect: false }
    ]
  },
  {
    id: 12003,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1002, word: 'bir parmak gösteren el', imageUrl: '/images/1002.png', audioKeys: { default: 'bir parmak gösteren el' }, tags: { category: 'eller', count: 1 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada bir balon var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6711, word: "bir balon", spokenText: "bir balon", imageUrl: "/images/6711.webp", audioKey: "bir balon", isCorrect: true },
      { id: 6715, word: "beş balon", spokenText: "beş balon", imageUrl: "/images/6715.webp", audioKey: "beş balon", isCorrect: false },
      { id: 6713, word: "üç balon", spokenText: "üç balon", imageUrl: "/images/6713.webp", audioKey: "üç balon", isCorrect: false }
    ]
  },
  {
    id: 12004,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1002, word: 'bir parmak gösteren el', imageUrl: '/images/1002.png', audioKeys: { default: 'bir parmak gösteren el' }, tags: { category: 'eller', count: 1 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada bir araba var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6716, word: "bir araba", spokenText: "bir araba", imageUrl: "/images/6716.webp", audioKey: "bir araba", isCorrect: true },
      { id: 6719, word: "dört araba", spokenText: "dört araba", imageUrl: "/images/6719.webp", audioKey: "dört araba", isCorrect: false },
      { id: 6717, word: "iki araba", spokenText: "iki araba", imageUrl: "/images/6717.webp", audioKey: "iki araba", isCorrect: false }
    ]
  },
  {
    id: 12005,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1002, word: 'bir parmak gösteren el', imageUrl: '/images/1002.png', audioKeys: { default: 'bir parmak gösteren el' }, tags: { category: 'eller', count: 1 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada bir kupa var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6721, word: "bir kupa", spokenText: "bir kupa", imageUrl: "/images/6721.webp", audioKey: "bir kupa", isCorrect: true },
      { id: 6725, word: "beş kupa", spokenText: "beş kupa", imageUrl: "/images/6725.webp", audioKey: "beş kupa", isCorrect: false },
      { id: 6723, word: "üç kupa", spokenText: "üç kupa", imageUrl: "/images/6723.webp", audioKey: "üç kupa", isCorrect: false }
    ]
  },
  {
    id: 12006,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1003, word: 'iki parmak gösteren el', imageUrl: '/images/1003.png', audioKeys: { default: 'iki parmak gösteren el' }, tags: { category: 'eller', count: 2 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada iki elma var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6702, word: "iki elma", spokenText: "iki elma", imageUrl: "/images/6702.webp", audioKey: "iki elma", isCorrect: true },
      { id: 6705, word: "beş elma", spokenText: "beş elma", imageUrl: "/images/6705.webp", audioKey: "beş elma", isCorrect: false },
      { id: 6701, word: "bir elma", spokenText: "bir elma", imageUrl: "/images/6701.webp", audioKey: "bir elma", isCorrect: false }
    ]
  },
  {
    id: 12007,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1003, word: 'iki parmak gösteren el', imageUrl: '/images/1003.png', audioKeys: { default: 'iki parmak gösteren el' }, tags: { category: 'eller', count: 2 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada iki top var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6707, word: "iki top", spokenText: "iki top", imageUrl: "/images/6707.webp", audioKey: "iki top", isCorrect: true },
      { id: 6709, word: "dört top", spokenText: "dört top", imageUrl: "/images/6709.webp", audioKey: "dört top", isCorrect: false },
      { id: 6708, word: "üç top", spokenText: "üç top", imageUrl: "/images/6708.webp", audioKey: "üç top", isCorrect: false }
    ]
  },
  {
    id: 12008,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1003, word: 'iki parmak gösteren el', imageUrl: '/images/1003.png', audioKeys: { default: 'iki parmak gösteren el' }, tags: { category: 'eller', count: 2 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada iki balon var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6712, word: "iki balon", spokenText: "iki balon", imageUrl: "/images/6712.webp", audioKey: "iki balon", isCorrect: true },
      { id: 6715, word: "beş balon", spokenText: "beş balon", imageUrl: "/images/6715.webp", audioKey: "beş balon", isCorrect: false },
      { id: 6711, word: "bir balon", spokenText: "bir balon", imageUrl: "/images/6711.webp", audioKey: "bir balon", isCorrect: false }
    ]
  },
  {
    id: 12009,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1003, word: 'iki parmak gösteren el', imageUrl: '/images/1003.png', audioKeys: { default: 'iki parmak gösteren el' }, tags: { category: 'eller', count: 2 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada iki araba var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6717, word: "iki araba", spokenText: "iki araba", imageUrl: "/images/6717.webp", audioKey: "iki araba", isCorrect: true },
      { id: 6719, word: "dört araba", spokenText: "dört araba", imageUrl: "/images/6719.webp", audioKey: "dört araba", isCorrect: false },
      { id: 6718, word: "üç araba", spokenText: "üç araba", imageUrl: "/images/6718.webp", audioKey: "üç araba", isCorrect: false }
    ]
  },
  {
    id: 12010,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1003, word: 'iki parmak gösteren el', imageUrl: '/images/1003.png', audioKeys: { default: 'iki parmak gösteren el' }, tags: { category: 'eller', count: 2 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada iki kupa var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6722, word: "iki kupa", spokenText: "iki kupa", imageUrl: "/images/6722.webp", audioKey: "iki kupa", isCorrect: true },
      { id: 6725, word: "beş kupa", spokenText: "beş kupa", imageUrl: "/images/6725.webp", audioKey: "beş kupa", isCorrect: false },
      { id: 6721, word: "bir kupa", spokenText: "bir kupa", imageUrl: "/images/6721.webp", audioKey: "bir kupa", isCorrect: false }
    ]
  },
  {
    id: 12011,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1004, word: 'üç parmak gösteren el', imageUrl: '/images/1004.png', audioKeys: { default: 'üç parmak gösteren el' }, tags: { category: 'eller', count: 3 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada üç elma var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6703, word: "üç elma", spokenText: "üç elma", imageUrl: "/images/6703.webp", audioKey: "üç elma", isCorrect: true },
      { id: 6701, word: "bir elma", spokenText: "bir elma", imageUrl: "/images/6701.webp", audioKey: "bir elma", isCorrect: false },
      { id: 6702, word: "iki elma", spokenText: "iki elma", imageUrl: "/images/6702.webp", audioKey: "iki elma", isCorrect: false }
    ]
  },
  {
    id: 12012,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1004, word: 'üç parmak gösteren el', imageUrl: '/images/1004.png', audioKeys: { default: 'üç parmak gösteren el' }, tags: { category: 'eller', count: 3 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada üç top var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6708, word: "üç top", spokenText: "üç top", imageUrl: "/images/6708.webp", audioKey: "üç top", isCorrect: true },
      { id: 6710, word: "beş top", spokenText: "beş top", imageUrl: "/images/6710.webp", audioKey: "beş top", isCorrect: false },
      { id: 6709, word: "dört top", spokenText: "dört top", imageUrl: "/images/6709.webp", audioKey: "dört top", isCorrect: false }
    ]
  },
  {
    id: 12013,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1004, word: 'üç parmak gösteren el', imageUrl: '/images/1004.png', audioKeys: { default: 'üç parmak gösteren el' }, tags: { category: 'eller', count: 3 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada üç balon var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6713, word: "üç balon", spokenText: "üç balon", imageUrl: "/images/6713.webp", audioKey: "üç balon", isCorrect: true },
      { id: 6711, word: "bir balon", spokenText: "bir balon", imageUrl: "/images/6711.webp", audioKey: "bir balon", isCorrect: false },
      { id: 6712, word: "iki balon", spokenText: "iki balon", imageUrl: "/images/6712.webp", audioKey: "iki balon", isCorrect: false }
    ]
  },
  {
    id: 12014,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1004, word: 'üç parmak gösteren el', imageUrl: '/images/1004.png', audioKeys: { default: 'üç parmak gösteren el' }, tags: { category: 'eller', count: 3 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada üç araba var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6718, word: "üç araba", spokenText: "üç araba", imageUrl: "/images/6718.webp", audioKey: "üç araba", isCorrect: true },
      { id: 6720, word: "beş araba", spokenText: "beş araba", imageUrl: "/images/6720.webp", audioKey: "beş araba", isCorrect: false },
      { id: 6719, word: "dört araba", spokenText: "dört araba", imageUrl: "/images/6719.webp", audioKey: "dört araba", isCorrect: false }
    ]
  },
  {
    id: 12015,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1004, word: 'üç parmak gösteren el', imageUrl: '/images/1004.png', audioKeys: { default: 'üç parmak gösteren el' }, tags: { category: 'eller', count: 3 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada üç kupa var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6723, word: "üç kupa", spokenText: "üç kupa", imageUrl: "/images/6723.webp", audioKey: "üç kupa", isCorrect: true },
      { id: 6721, word: "bir kupa", spokenText: "bir kupa", imageUrl: "/images/6721.webp", audioKey: "bir kupa", isCorrect: false },
      { id: 6722, word: "iki kupa", spokenText: "iki kupa", imageUrl: "/images/6722.webp", audioKey: "iki kupa", isCorrect: false }
    ]
  },
  {
    id: 12016,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1005, word: 'dört parmak gösteren el', imageUrl: '/images/1005.png', audioKeys: { default: 'dört parmak gösteren el' }, tags: { category: 'eller', count: 4 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada dört elma var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6704, word: "dört elma", spokenText: "dört elma", imageUrl: "/images/6704.webp", audioKey: "dört elma", isCorrect: true },
      { id: 6701, word: "bir elma", spokenText: "bir elma", imageUrl: "/images/6701.webp", audioKey: "bir elma", isCorrect: false },
      { id: 6703, word: "üç elma", spokenText: "üç elma", imageUrl: "/images/6703.webp", audioKey: "üç elma", isCorrect: false }
    ]
  },
  {
    id: 12017,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1005, word: 'dört parmak gösteren el', imageUrl: '/images/1005.png', audioKeys: { default: 'dört parmak gösteren el' }, tags: { category: 'eller', count: 4 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada dört top var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6709, word: "dört top", spokenText: "dört top", imageUrl: "/images/6709.webp", audioKey: "dört top", isCorrect: true },
      { id: 6707, word: "iki top", spokenText: "iki top", imageUrl: "/images/6707.webp", audioKey: "iki top", isCorrect: false },
      { id: 6710, word: "beş top", spokenText: "beş top", imageUrl: "/images/6710.webp", audioKey: "beş top", isCorrect: false }
    ]
  },
  {
    id: 12018,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1005, word: 'dört parmak gösteren el', imageUrl: '/images/1005.png', audioKeys: { default: 'dört parmak gösteren el' }, tags: { category: 'eller', count: 4 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada dört balon var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6714, word: "dört balon", spokenText: "dört balon", imageUrl: "/images/6714.webp", audioKey: "dört balon", isCorrect: true },
      { id: 6711, word: "bir balon", spokenText: "bir balon", imageUrl: "/images/6711.webp", audioKey: "bir balon", isCorrect: false },
      { id: 6713, word: "üç balon", spokenText: "üç balon", imageUrl: "/images/6713.webp", audioKey: "üç balon", isCorrect: false }
    ]
  },
  {
    id: 12019,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1005, word: 'dört parmak gösteren el', imageUrl: '/images/1005.png', audioKeys: { default: 'dört parmak gösteren el' }, tags: { category: 'eller', count: 4 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada dört araba var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6719, word: "dört araba", spokenText: "dört araba", imageUrl: "/images/6719.webp", audioKey: "dört araba", isCorrect: true },
      { id: 6717, word: "iki araba", spokenText: "iki araba", imageUrl: "/images/6717.webp", audioKey: "iki araba", isCorrect: false },
      { id: 6720, word: "beş araba", spokenText: "beş araba", imageUrl: "/images/6720.webp", audioKey: "beş araba", isCorrect: false }
    ]
  },
  {
    id: 12020,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1005, word: 'dört parmak gösteren el', imageUrl: '/images/1005.png', audioKeys: { default: 'dört parmak gösteren el' }, tags: { category: 'eller', count: 4 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada dört kupa var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6724, word: "dört kupa", spokenText: "dört kupa", imageUrl: "/images/6724.webp", audioKey: "dört kupa", isCorrect: true },
      { id: 6721, word: "bir kupa", spokenText: "bir kupa", imageUrl: "/images/6721.webp", audioKey: "bir kupa", isCorrect: false },
      { id: 6723, word: "üç kupa", spokenText: "üç kupa", imageUrl: "/images/6723.webp", audioKey: "üç kupa", isCorrect: false }
    ]
  },
  {
    id: 12021,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1006, word: 'beş parmak gösteren el', imageUrl: '/images/1006.png', audioKeys: { default: 'beş parmak gösteren el' }, tags: { category: 'eller', count: 5 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada beş elma var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6705, word: "beş elma", spokenText: "beş elma", imageUrl: "/images/6705.webp", audioKey: "beş elma", isCorrect: true },
      { id: 6701, word: "bir elma", spokenText: "bir elma", imageUrl: "/images/6701.webp", audioKey: "bir elma", isCorrect: false },
      { id: 6703, word: "üç elma", spokenText: "üç elma", imageUrl: "/images/6703.webp", audioKey: "üç elma", isCorrect: false }
    ]
  },
  {
    id: 12022,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1006, word: 'beş parmak gösteren el', imageUrl: '/images/1006.png', audioKeys: { default: 'beş parmak gösteren el' }, tags: { category: 'eller', count: 5 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada beş top var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6710, word: "beş top", spokenText: "beş top", imageUrl: "/images/6710.webp", audioKey: "beş top", isCorrect: true },
      { id: 6707, word: "iki top", spokenText: "iki top", imageUrl: "/images/6707.webp", audioKey: "iki top", isCorrect: false },
      { id: 6709, word: "dört top", spokenText: "dört top", imageUrl: "/images/6709.webp", audioKey: "dört top", isCorrect: false }
    ]
  },
  {
    id: 12023,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1006, word: 'beş parmak gösteren el', imageUrl: '/images/1006.png', audioKeys: { default: 'beş parmak gösteren el' }, tags: { category: 'eller', count: 5 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada beş balon var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6715, word: "beş balon", spokenText: "beş balon", imageUrl: "/images/6715.webp", audioKey: "beş balon", isCorrect: true },
      { id: 6711, word: "bir balon", spokenText: "bir balon", imageUrl: "/images/6711.webp", audioKey: "bir balon", isCorrect: false },
      { id: 6713, word: "üç balon", spokenText: "üç balon", imageUrl: "/images/6713.webp", audioKey: "üç balon", isCorrect: false }
    ]
  },
  {
    id: 12024,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1006, word: 'beş parmak gösteren el', imageUrl: '/images/1006.png', audioKeys: { default: 'beş parmak gösteren el' }, tags: { category: 'eller', count: 5 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada beş araba var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6720, word: "beş araba", spokenText: "beş araba", imageUrl: "/images/6720.webp", audioKey: "beş araba", isCorrect: true },
      { id: 6717, word: "iki araba", spokenText: "iki araba", imageUrl: "/images/6717.webp", audioKey: "iki araba", isCorrect: false },
      { id: 6719, word: "dört araba", spokenText: "dört araba", imageUrl: "/images/6719.webp", audioKey: "dört araba", isCorrect: false }
    ]
  },
  {
    id: 12025,
    activityType: ActivityType.CountMatch,
    question: 'Hangisinde bu kadar var?',
    questionAudioKey: '',
    questionItem: { id: 1006, word: 'beş parmak gösteren el', imageUrl: '/images/1006.png', audioKeys: { default: 'beş parmak gösteren el' }, tags: { category: 'eller', count: 5 } },
    speech: { tr: { question: 'Hangisinde bu kadar var?', correct: 'Evet! Burada beş kupa var.', wrong: 'Hayır, bu sayı farklı. Parmakları say.' } },
    options: [
      { id: 6725, word: "beş kupa", spokenText: "beş kupa", imageUrl: "/images/6725.webp", audioKey: "beş kupa", isCorrect: true },
      { id: 6721, word: "bir kupa", spokenText: "bir kupa", imageUrl: "/images/6721.webp", audioKey: "bir kupa", isCorrect: false },
      { id: 6723, word: "üç kupa", spokenText: "üç kupa", imageUrl: "/images/6723.webp", audioKey: "üç kupa", isCorrect: false }
    ]
  }
];
