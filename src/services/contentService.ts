
import { ActivityType, ActivityCategory, ImageMetadata, ConceptRound, Word, Story, ScreenState, ConceptOption, ActivityStats, MemoryGameRound, SudokuRound, SudokuItem } from '../types.ts';
import { storyData } from './staticData.ts';
import { imageData } from './database/imageData.ts';
import { 
    sensesData,
    bigSmallData, longShortData, thinThickData, wideNarrowData, oldNewData, youngOldData, hardSoftData, cleanDirtyData, wetDryData, openClosedData, straightCurvedData, aliveLifelessData, bitterSweetData, heavyLightData, hotColdData, roughSmoothData, brokenIntactData, messyCleanData, tazeBayatData, kirisikDuzgunData, sivriKutData, parlakMatData, tembelCaliskanData, seffafOpakData, dikenliPuruzsuzData, dugumCozukData, hungryFullData, derinSigData, kalabalikTenhaData, tersDuzData,
    fewMuchData, halfQuarterWholeData, fullEmptyData, oddEvenData, countMatchData,
    onUnderData, belowAboveData, besideOppositeData, inFrontOfBehindData, insideOutsideData, betweenData, leftRightData, nearFarData, highLowData,
    beforeAfterData, dayNightData, fastSlowData, noisyQuietData,
    whatDoesntBelongData, fiveWOneHData, sequencingStoryData, patternCompletionData, sudokuData, memoryCardPool, dragAndDropCountingData, dragAndDropPositioningData, ownershipData, colorRecognitionData, whatsMissingData
} from './database/activities/index.ts';
import objectCollectorData from './database/activities/games/objectCollectorData.ts';
import { CONCEPT_ACTIVITIES, LETTER_SOUND_ACTIVITIES, REASONING_ACTIVITIES, LETTER_GROUPS, OBJECT_RECOGNITION_ACTIVITIES, ALL_SUB_ACHIEVEMENTS } from '../constants.ts';
import { getActivityMetadata } from '../constants/activityMetadata';
import { shuffleArray, getValueFromLocalStorage } from '../utils.ts';
import { getCurrentLanguage, t } from '../i18n/index.ts';
import wordmapTrEn from '../utils/wordmap.tr-en.json';
import wordmapTrDe from '../utils/wordmap.tr-de.json';
import wordmapTrFr from '../utils/wordmap.tr-fr.json';
import wordmapTrNl from '../utils/wordmap.tr-nl.json';
import wordmapTrAz from '../utils/wordmap.tr-az.json';


// --- UTILITY FUNCTIONS ---
const getRandomItems = <T,>(arr: T[], n: number): T[] => {
    if (!arr || arr.length === 0) return [];
    return shuffleArray(arr).slice(0, n);
};

const QUESTION_SIDE_ALIASES: Record<string, string> = {
    alive: 'alive',
    lifeless: 'lifeless',
    before: 'before',
    after: 'after',
    beside: 'beside',
    opposite: 'opposite',
    big: 'big',
    small: 'small',
    bitter: 'bitter',
    sweet: 'sweet',
    broken: 'broken',
    intact: 'intact',
    clean: 'clean',
    dirty: 'dirty',
    closed: 'closed',
    open: 'open',
    day: 'day',
    night: 'night',
    deep: 'deep',
    shallow: 'shallow',
    dry: 'dry',
    wet: 'wet',
    empty: 'empty',
    full: 'full',
    even: 'even',
    odd: 'odd',
    far: 'far',
    fast: 'fast',
    slow: 'slow',
    few: 'few',
    much: 'much',
    front: 'front',
    infront: 'front',
    behind: 'behind',
    half: 'half',
    quarter: 'quarter',
    whole: 'whole',
    slice: 'slice',
    hard: 'hard',
    soft: 'soft',
    high: 'high',
    higher: 'high',
    low: 'low',
    lower: 'low',
    hot: 'hot',
    cold: 'cold',
    hungry: 'hungry',
    fullup: 'fullup',
    inside: 'inside',
    outside: 'outside',
    knotted: 'knotted',
    untied: 'untied',
    left: 'left',
    right: 'right',
    long: 'long',
    short: 'short',
    matte: 'matte',
    shiny: 'shiny',
    near: 'near',
    old: 'old',
    new: 'new',
    on: 'on',
    under: 'under',
    rough: 'rough',
    smooth: 'smooth',
    noisy: 'noisy',
    quiet: 'quiet',
    sharp: 'sharp',
    blunt: 'blunt',
    straight: 'straight',
    curved: 'curved',
    thick: 'thick',
    thin: 'thin',
    thorny: 'thorny',
    transparent: 'transparent',
    opaque: 'opaque',
    above: 'above',
    below: 'below',
    wide: 'wide',
    narrow: 'narrow',
    wrinkled: 'wrinkled',
    smoothened: 'smoothened',
    young: 'young'
};

const getQuestionSideBucket = (round: Pick<ConceptRound, 'questionAudioKey' | 'question'>): string | null => {
    const rawKey = String(round.questionAudioKey || '').toLowerCase();
    if (!rawKey) return null;

    const normalized = rawKey
        .replace(/^q_/, '')
        .replace(/which_are/g, '')
        .replace(/which_is/g, '')
        .replace(/does_this_have/g, '')
        .replace(/in_front/g, 'infront')
        .replace(/\bfaces\b/g, '')
        .replace(/__+/g, '_')
        .replace(/^_+|_+$/g, '');

    const tokens = normalized.split('_').filter(Boolean);
    for (const token of tokens) {
        const mapped = QUESTION_SIDE_ALIASES[token];
        if (mapped) return mapped;
    }

    return null;
};

const pickBalancedRoundFromPairGroup = (
    rounds: ConceptRound[],
    sideCounts: Map<string, number>
): ConceptRound => {
    const shuffledRounds = shuffleArray(rounds);
    const annotated = shuffledRounds.map(round => ({
        round,
        side: getQuestionSideBucket(round),
    }));
    const roundsWithKnownSide = annotated.filter(item => item.side);

    if (roundsWithKnownSide.length === 0) {
        return shuffledRounds[0];
    }

    const minCount = Math.min(...roundsWithKnownSide.map(item => sideCounts.get(item.side!) || 0));
    const candidates = roundsWithKnownSide
        .filter(item => (sideCounts.get(item.side!) || 0) === minCount)
        .map(item => item.round);

    return shuffleArray(candidates)[0];
};

// Helper to translate Turkish word to target language using wordmap
const translateWord = (turkishWord: string, targetLang: string): string => {
    if (targetLang === 'tr') return turkishWord;
    
    const wordmaps: Record<string, any> = {
        'en': wordmapTrEn,
        'de': wordmapTrDe,
        'fr': wordmapTrFr,
        'nl': wordmapTrNl,
        'az': wordmapTrAz
    };
    
    const wordmap = wordmaps[targetLang];
    if (!wordmap) return turkishWord;
    
    // Search through all categories in wordmap
    for (const category in wordmap) {
        if (wordmap[category][turkishWord]) {
            return wordmap[category][turkishWord];
        }
    }
    
    // Fallback to Turkish if no translation found
    return turkishWord;
};

// A map to define the primary image ID for words with multiple visuals.
const mainVisualMap: { [word: string]: number } = {
    // Ana Görsel Listesi - Tam Güncellenmiş
    'araba': 1,
    'kutu': 5,
    'ağaç': 10,
    'tişört': 13,
    'kedi': 16,
    'pizza': 23,
    'vazo': 34,
    'kitap': 37,
    'kapı': 39,
    'köpek': 47,
    'ayakkabı': 59,
    'dondurma': 63,
    'pantolon': 79,
    'pencere': 82,
    'gözlük': 93,
    'havuç': 98,
    'aslan': 100,
    'tren': 106,
    'bisiklet': 110,
    'yumurta': 113,
    'portakal': 115,
    'saat': 118,
    'kalem': 121,
    'bardak': 124,
    'masa': 134,
    'yastık': 137,
    'merdiven': 143,
    'çorap': 147,
    'tabak': 153,
    'top': 156,
    'şemsiye': 158,
    'robot': 177,
    'hazine_sandığı': 201,
    'roket': 204,
    'gömlek': 255,
    'musluk': 304,
    'etek': 269,
    'terlik': 308,
    'çiçek': 309,
    'sandalye': 319,
    'dolap': 339,
    'armut': 365,
    'paten': 382,
    'sincap': 417,
    'saksı': 432,
    'halı': 439,
    'kavanoz': 447,
    'sepet': 449,
    'kurdele': 517,
    'havlu': 523,
    'ev': 533,
    'fırça': 539,
    'mum': 540,
    'zarf': 600,
    'yatak': 606,
    'gemi': 621,
    'limon': 703,
    'şişe': 814,
    'sandalet': 848,
    // Eski değerler (henüz güncellenmemiş)
    'çocuk': 500,
    'maymun': 277,
    'bebek': 579,
    'üzüm': 88,
    'çilek': 171,
    'kuş': 73,
    'elma': 43,
    // — Hayvanlar —
    'ahtapot': 358,
    'arı': 273,
    'at': 290,
    'ağustos böceği': 348,
    'ayı': 276,
    'balık': 400,
    'balina': 491,
    'baykuş': 103,
    'civciv': 376,
    'deve': 909,
    'dinozor': 178,
    'eşek': 865,
    'fare': 29,
    'fil': 28,
    'fok balığı': 293,
    'gergedan': 908,
    'geyik': 416,
    'hamster': 861,
    'horoz': 102,
    'inek': 291,
    'kaplan': 862,
    'kaplumbağa': 42,
    'karınca': 349,
    'kelebek': 274,
    'kirpi': 418,
    'kirpi balığı': 694,
    'koala': 681,
    'koyun': 460,
    'kunduz': 680,
    'kurbağa': 275,
    'kuzu': 462,
    'ördek': 26,
    'panda': 320,
    'papağan': 32,
    'penguen': 232,
    'salyangoz': 222,
    'solucan': 150,
    'tavuk': 377,
    'tavşan': 41,
    'tembel hayvan': 684,
    'tilki': 415,
    'tırtıl': 445,
    'uğur böceği': 92,
    'yılan': 323,
    'yunus': 763,
    'zebra': 866,
    'zürafa': 101,
    // — Meyveler —
    'ananas': 279,
    'erik': 641,
    'greyfurt': 637,
    'karpuz': 170,
    'kavun': 295,
    'kivi': 649,
    'kiraz': 278,
    'mandalina': 419,
    'muz': 114,
    'nar': 498,
    'şeftali': 333,
    'vişne': 294,
    'zeytin': 119,
    // — Sebzeler —
    'biber': 227,
    'brokoli': 311,
    'domates': 128,
    'enginar': 695,
    'ıspanak': 420,
    'kabak': 803,
    'karnabahar': 648,
    'lahana': 334,
    'marul': 129,
    'mısır': 853,
    'patates': 802,
    'patlıcan': 280,
    'pırasa': 421,
    'roka': 704,
    'salatalık': 116,
    'soğan': 75,
    'turp': 636,
    'zencefil': 640,
    // — Yiyecekler —
    'ayran': 813,
    'bal': 228,
    'bisküvi': 330,
    'cips': 804,
    'çay': 791,
    'çikolata': 297,
    'ekmek': 112,
    'gazoz': 793,
    'hamburger': 809,
    'jelibon': 806,
    'kahve': 635,
    'köfte': 808,
    'kraker': 805,
    'kuruyemiş': 807,
    'mantı': 812,
    'makarna': 267,
    'meyve suyu': 811,
    'milkshake': 645,
    'pasta': 78,
    'peynir': 50,
    'reçel': 639,
    'salata': 332,
    'simit': 296,
    'sirke': 638,
    'sosis': 312,
    'sosisli sandviç': 366,
    'sucuk': 860,
    'süt': 801,
    'şurup': 241,
    'tereyağı': 810,
    'yoğurt': 792,
    // — Giysiler —
    'atkı': 271,
    'bere': 336,
    'bot': 307,
    'ceket': 270,
    'elbise': 268,
    'eldiven': 272,
    'kask': 206,
    'kazak': 335,
    'kravat': 576,
    'papyon': 577,
    'pijama': 54,
    'şapka': 111,
    'şort': 80,
    // — Ev, Mutfak ve Banyo Eşyaları —
    'anahtar': 142,
    'ayna': 148,
    'balkon': 868,
    'bank': 430,
    'battaniye': 816,
    'bıçak': 262,
    'biberon': 371,
    'bulaşık makinesi': 301,
    'buzdolabı': 251,
    'çamaşır makinesi': 169,
    'çaydanlık': 356,
    'çatal': 126,
    'diş fırçası': 441,
    'diş macunu': 425,
    'elbise dolabı': 339,
    'fırın': 302,
    'ıslak mendil': 855,
    'jakuzi': 95,
    'kase': 700,
    'kaşık': 125,
    'kitaplık': 287,
    'koltuk': 548,
    'klima': 708,
    'küvet': 424,
    'lamba': 575,
    'lavabo': 423,
    'lazımlık': 798,
    'lif': 874,
    'mandal': 398,
    'mikser': 367,
    'paspas': 341,
    'priz': 340,
    'radyo': 436,
    'raf': 610,
    'sabun': 209,
    'sifon': 799,
    'sıvı sabun': 794,
    'soba': 250,
    'sürahi': 350,
    'şampuan': 426,
    'şömine': 384,
    'tava': 264,
    'tencere': 671,
    'tuvalet': 422,
    'tuvalet kağıdı': 815,
    'ütü': 305,
    'valiz': 31,
    'vantilatör': 89,
    // — Oyuncaklar —
    'balon': 130,
    'düdük': 427,
    'kaykay': 383,
    'kürek': 369,
    'misket': 762,
    'oyuncak ayı': 276,
    'oyuncak bebek': 109,
    'pilates topu': 362,
    'satranç': 510,
    'uçurtma': 135,
    'yapboz': 480,
    // — Taşıtlar —
    'ambulans': 257,
    'denizaltı': 337,
    'helikopter': 162,
    'itfaiye aracı': 256,
    'kamyon': 288,
    'motosiklet': 259,
    'okul otobüsü': 105,
    'polis arabası': 258,
    'sandal': 493,
    'sıcak hava balonu': 538,
    'traktör': 289,
    'uçak': 107,
    'vinç': 338,
    'yelkenli': 375,
    // — Vücut Bölümleri —
    'göz': 564,
    'el': 285,
    'saç': 662,
    'kulak': 490,
    'burun': 556,
    // — Meslekler —
    'doktor': 324,
    'polis': 325,
    'aşçı': 326,
    'itfaiyeci': 327,
    'öğretmen': 84,
    // — Bitkiler —
    'kaktüs': 281,
    'çim': 434,
    'pamuk': 27,
    // — Binalar ve Yerler —
    'okul': 497,
    'hastane': 852,
    'plaj': 858,
    'orman': 242,
    // — Müzik Aletleri —
    'davul': 72,
    'gitar': 180,
    'keman': 208,
    'flüt': 328,
    // — Tamir Aletleri —
    'çekiç': 496,
    'pense': 344,
    'tornavida': 217,
    // — Doğa Olayları —
    'yağmur': 52,
    'gökkuşağı': 159,
    'kar': 405,
    'rüzgar': 406,
    'şimşek': 407,
    // — Uzay —
    'gezegen': 205,
    'güneş': 237,
    'ay': 238,
    'yıldız': 239,
    'göktaşı': 408,
    'teleskop': 379,
};

const YES_NO_ALLOWED_IDS = new Set([
    1, 5, 13, 16, 23, 26, 28, 29, 34, 36, 41, 42, 43, 61, 73, 79, 80, 82, 92, 93, 98, 100, 101, 102, 103, 107, 110, 111, 112, 113, 114, 115, 116, 118, 121, 125, 126, 128, 137, 142, 144, 156, 158, 162, 167, 170, 171, 177, 201, 207, 209, 235, 236, 237, 251, 252, 256, 257, 258, 273, 274, 275, 277, 288, 290, 291, 296, 301, 302, 304, 319, 320, 323, 358, 365, 376, 419, 432, 439, 449, 462, 533, 539, 548, 606, 621, 671, 703, 814, 848
]);


const getBannedImageIds = (): Set<number> => {
    return getValueFromLocalStorage<number[]>('bannedImageIds_v1', []).reduce((set, id) => set.add(id), new Set<number>());
};

const CONCRETE_CATEGORIES_FOR_LETTER_GAMES = [
    'hayvan', 'meyve', 'sebze', 'taşıt', 'giysi', 'mutfak', 'banyo', 'ev_esya', 
    'muzik_aleti', 'tamir_aleti', 'oyuncak', 'yiyecek', 'bitki', 'doğal nesne', 'doğal yapı', 'olay',
    'insan', 'vücut', 'yapı', 'bina', 'malzeme', 'profession', 'yer', 'uzay', 'doğa olayı', 'nesne',
    // Added to include user-curated categories for family members and occupations
    'aile üyeleri', 'meslekler'
];


export const getActivityCategory = (activity: ActivityType | string): ActivityCategory | null => {
    const activityInfo = ALL_SUB_ACHIEVEMENTS.find(sa => String(sa.id) === String(activity));
    return activityInfo?.category || null;
}

export const getActivityUiConfig = (activityType: ActivityType | null): {
    backScreen: ScreenState;
    backButtonText: string;
} => {
    if (activityType === null) return {
        backScreen: ScreenState.MainMenu,
        backButtonText: "Etkinlik Menüsüne Dön",
    };
    if (activityType === ActivityType.FiveWOneH) {
        return {
            backScreen: ScreenState.FiveWOneHMenu,
            backButtonText: '5N1K Menüsüne Dön',
        };
    }

    if (activityType === ActivityType.Syllabification) {
        return {
            backScreen: ScreenState.GroupSelection,
            backButtonText: "Grup Seçimine Dön",
        };
    }
    if (LETTER_SOUND_ACTIVITIES.includes(activityType)) {
        return {
            backScreen: ScreenState.LetterSelection,
            backButtonText: "Harf Seçimine Dön",
        };
    }
    if (CONCEPT_ACTIVITIES.includes(activityType)) {
        return {
            backScreen: ScreenState.ConceptActivitiesMenu,
            backButtonText: "Kavram Menüsüne Dön",
        };
    }
    if (REASONING_ACTIVITIES.includes(activityType)) {
        return {
            backScreen: ScreenState.ReasoningActivitiesMenu,
            backButtonText: "Oyun Menüsüne Dön",
        };
    }
    if (OBJECT_RECOGNITION_ACTIVITIES.includes(activityType)) {
        return {
            backScreen: ScreenState.ObjectCategoriesMenu,
            backButtonText: "Nesne Menüsüne Dön",
        };
    }
    if (
        activityType === ActivityType.LineTracing ||
        activityType === ActivityType.ShapeColoring ||
        activityType === ActivityType.RhythmFollowing ||
        activityType === ActivityType.LetterTracing ||
        activityType === ActivityType.ConstrainedColoring
    ) {
        return {
            backScreen: ScreenState.FineMotorMenu,
            backButtonText: t('menu.fineMotor.backButton', 'İnce Motor Menüsüne Dön'),
        };
    }

    return {
        backScreen: ScreenState.MainMenu,
        backButtonText: "Etkinlik Menüsüne Dön",
    };
}


// --- LETTER & SYLLABLE DATA FETCHERS ---
// Helper: map accented/special letters to Turkish image dataset equivalents
const mapLetterForSearch = (lang: string, letter: string): string => {
    if (lang === 'de') {
        if (letter === 'Ä' || letter === 'ä') return 'A';
        if (letter === 'Ö' || letter === 'ö') return 'Ö';
        if (letter === 'Ü' || letter === 'ü') return 'Ü';
    }
    if (lang === 'az') {
        if (letter === 'Ə' || letter === 'ə') return 'E';
        // Q, X do not map to Turkish; leave as-is to naturally yield fewer results
    }
    return letter;
};

export const fetchWordsForLetter = async (letter: string, count?: number): Promise<Word[]> => {
    const lang = getCurrentLanguage();
    const letterLocale = (lang === 'tr' ? 'tr-TR' : lang === 'de' ? 'de-DE' : lang === 'az' ? 'az-AZ' : 'en-US');
    const upperDisplayLetter = letter.toLocaleUpperCase(letterLocale);
    const searchUpperLetter = mapLetterForSearch(lang, upperDisplayLetter);
  const bannedIds = getBannedImageIds();
    // Normalize categories so we correctly match imageData tag.category values
    const norm = (s?: string) => {
        if (!s) return '';
        return s.toString().toLowerCase()
            .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
            .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
            .replace(/[^a-z0-9]/g, '');
    };

    const allowedNorms = CONCRETE_CATEGORIES_FOR_LETTER_GAMES.map(c => norm(c));

    const availableWords = imageData.filter(item => {
        const isBanned = bannedIds.has(item.id);
        const hasLetters = item.tags && item.tags.letters;
        const rawCategory = item.tags && item.tags.category;
        const normalizedCategory = norm(rawCategory);

        const isConcrete = allowedNorms.some(a => (normalizedCategory && (normalizedCategory.includes(a) || a.includes(normalizedCategory))));

        // Kullanıcı geri bildirimine göre kafa karıştırıcı konumsal görüntüleri harf oyunlarından çıkarın.
        // "aile" (family) için istisna, çünkü net bir tek kavramdır.
        const isConfusingPositionalImage = !!(item.tags && item.tags.position) && item.word.toLocaleLowerCase('tr-TR') !== 'aile';

        return !isBanned && hasLetters && isConcrete && !isConfusingPositionalImage;
    });
  
    const uniqueWordMap = new Map<string, ImageMetadata>();
    
    for (const item of availableWords) {
        const key = item.word.toLocaleLowerCase('tr-TR');
        const mainVisualId = mainVisualMap[key];
        if (mainVisualId === item.id) {
            uniqueWordMap.set(key, item);
        }
    }
    
    for (const item of shuffleArray(availableWords)) {
        const key = item.word.toLocaleLowerCase('tr-TR');
        if (!uniqueWordMap.has(key)) {
            uniqueWordMap.set(key, item);
        }
    }

  const allWords = Array.from(uniqueWordMap.values());
  const selectedWords = count ? getRandomItems(allWords, count * 3) : allWords; // Fetch more for options

  return selectedWords.map(item => {
    const translatedWord = translateWord(item.word, lang);
    return {
        id: item.id,
        word: translatedWord,
        imageUrl: item.imageUrl,
        audioKeys: item.audioKeys,
        hasLetter: translatedWord.toLocaleUpperCase(letterLocale).includes(searchUpperLetter),
        activityType: ActivityType.FindTheLetter, // Placeholder, will be set in fetchLetterActivityData
    };
  });
};

export const createLetterPresenceRounds = async (letter: string, count?: number): Promise<Word[]> => {
        const lang = getCurrentLanguage();
        const letterLocale = (lang === 'tr' ? 'tr-TR' : lang === 'de' ? 'de-DE' : lang === 'az' ? 'az-AZ' : 'en-US');
        const upperDisplayLetter = letter.toLocaleUpperCase(letterLocale);
        const upperCaseLetter = upperDisplayLetter; // UI display
        const allWords = await fetchWordsForLetter(mapLetterForSearch(lang, letter));

    const wordsWithLetter = shuffleArray(allWords.filter(w => w.hasLetter));
    const wordsWithoutLetter = shuffleArray(allWords.filter(w => !w.hasLetter));
    
    const numRounds = count || 8;
    const numEach = Math.floor(numRounds / 2);

    if (wordsWithLetter.length < numEach || wordsWithoutLetter.length < numEach) {
        return [];
    }

    const selectedWithLetter = wordsWithLetter.slice(0, numEach).map(word => ({
        ...word,
        questionText: t('letters.soundPresence.question', `Bu görselde '{letter}' sesi var mı?`).replace('{letter}', upperCaseLetter),
        questionAudioKey: 'q_does_this_have_sound',
        isCorrectAnswer: true,
        activityType: ActivityType.SoundPresence,
    }));

    const selectedWithoutLetter = wordsWithoutLetter.slice(0, numEach).map(word => ({
        ...word,
        questionText: t('letters.soundPresence.question', `Bu görselde '{letter}' sesi var mı?`).replace('{letter}', upperCaseLetter),
        questionAudioKey: 'q_does_this_have_sound',
        isCorrectAnswer: false,
        activityType: ActivityType.SoundPresence,
    }));

    return shuffleArray([...selectedWithLetter, ...selectedWithoutLetter]);
};


export const fetchStoriesForLetter = async (letter: string): Promise<Story[]> => {
    const upperCaseLetter = letter.toLocaleUpperCase('tr-TR');
    return storyData[upperCaseLetter] || [];
};

const allSyllables = imageData.flatMap(item => item.tags.syllables || []);
const distractorSyllablePool = [...new Set(allSyllables)];

export const fetchSyllableWordsForGroup = async (groupNumber: number, count?: number): Promise<Word[]> => {
    const groupIndex = groupNumber - 1;
    if (groupIndex < 0 || groupIndex >= LETTER_GROUPS.length) return [];

    const lettersInGroup = LETTER_GROUPS.slice(0, groupIndex + 1).flatMap(g => g.letters);
    const bannedIds = getBannedImageIds();

    const potentialItems = imageData.filter(item =>
        !bannedIds.has(item.id) &&
        item.tags.letters &&
        item.tags.letters.every(letter => lettersInGroup.includes(letter)) &&
        !item.word.includes(' ') &&
        item.tags.syllables && item.tags.syllables.length > 1 && item.tags.syllables.length <= 4
    );

    const uniqueItemMap = new Map<string, ImageMetadata>();
    for (const item of shuffleArray(potentialItems)) {
        const key = item.word.toLocaleLowerCase('tr-TR');
        if (!uniqueItemMap.has(key)) {
            uniqueItemMap.set(key, item);
        }
    }
    const uniqueItems = Array.from(uniqueItemMap.values());
    
    const numToFetch = count || 8;
    const selectedItems = getRandomItems(uniqueItems, numToFetch);

    const validWords: Word[] = selectedItems.map(item => {
        const syllables = item.tags.syllables!;
        return {
            id: item.id,
            word: item.word,
            imageUrl: item.imageUrl,
            audioKeys: item.audioKeys,
            syllables: syllables,
            distractorSyllables: getRandomItems(distractorSyllablePool.filter(d => !syllables.includes(d)), 4 - syllables.length),
            activityType: ActivityType.Syllabification,
        };
    });

    return validWords;
};


// --- OBJECT RECOGNITION ---
export const createObjectChoiceRounds = async (categoryId: string, count?: number): Promise<ConceptRound[]> => {
    // If language is not Turkish, use curated static sets similar to concept rounds
    const lang = getCurrentLanguage();
    if (lang !== 'tr') {
        try {
            if (categoryId === 'hayvan') {
                const { enAnimalsData } = await import('./database/activities/objects/enAnimalsData.ts');
                return shuffleArray(enAnimalsData).slice(0, count || 8);
            }
            if (categoryId === 'meyve') {
                const { enFruitsData } = await import('./database/activities/objects/enFruitsData.ts');
                return shuffleArray(enFruitsData).slice(0, count || 8);
            }
            if (categoryId === 'sebze') {
                const { enVegetablesData } = await import('./database/activities/objects/enVegetablesData.ts');
                return shuffleArray(enVegetablesData).slice(0, count || 8);
            }
            if (categoryId === 'ulasim') {
                const { enVehiclesData } = await import('./database/activities/objects/enVehiclesData.ts');
                return shuffleArray(enVehiclesData).slice(0, count || 8);
            }
            if (categoryId === 'giysi') {
                const { enClothesData } = await import('./database/activities/objects/enClothesData.ts');
                return shuffleArray(enClothesData).slice(0, count || 8);
            }
            if (categoryId === 'mutfak') {
                const { enKitchenData } = await import('./database/activities/objects/enKitchenData.ts');
                return shuffleArray(enKitchenData).slice(0, count || 8);
            }
            if (categoryId === 'ev_esya') {
                const { enHouseholdData } = await import('./database/activities/objects/enHouseholdData.ts');
                return shuffleArray(enHouseholdData).slice(0, count || 8);
            }
            if (categoryId === 'oyuncak') {
                const { enToysData } = await import('./database/activities/objects/enToysData.ts');
                return shuffleArray(enToysData).slice(0, count || 8);
            }
            if (categoryId === 'yiyecek') {
                const { enFoodsData } = await import('./database/activities/objects/enFoodsData.ts');
                return shuffleArray(enFoodsData).slice(0, count || 8);
            }
            if (categoryId === 'profession') {
                const { enProfessionsData } = await import('./database/activities/objects/enProfessionsData.ts');
                return shuffleArray(enProfessionsData).slice(0, count || 8);
            }
            if (categoryId === 'okul_esya') {
                const { enSchoolItemsData } = await import('./database/activities/objects/enSchoolItemsData.ts');
                return shuffleArray(enSchoolItemsData).slice(0, count || 8);
            }
            if (categoryId === 'ev') {
                const { enHomeData } = await import('./database/activities/objects/enHomeData.ts');
                return shuffleArray(enHomeData).slice(0, count || 8);
            }
            if (categoryId === 'insan') {
                const { enPeopleData } = await import('./database/activities/objects/enPeopleData.ts');
                return shuffleArray(enPeopleData).slice(0, count || 8);
            }
            if (categoryId === 'doğal yapı') {
                const { enNaturalStructuresData } = await import('./database/activities/objects/enNaturalStructuresData.ts');
                return shuffleArray(enNaturalStructuresData).slice(0, count || 8);
            }
            if (categoryId === 'doğal nesne') {
                const { enNaturalObjectsData } = await import('./database/activities/objects/enNaturalObjectsData.ts');
                return shuffleArray(enNaturalObjectsData).slice(0, count || 8);
            }
            if (categoryId === 'eglence') {
                const { enEntertainmentData } = await import('./database/activities/objects/enEntertainmentData.ts');
                return shuffleArray(enEntertainmentData).slice(0, count || 8);
            }
            if (categoryId === 'vücut') {
                const { enBodyPartsData } = await import('./database/activities/objects/enBodyPartsData.ts');
                return shuffleArray(enBodyPartsData).slice(0, count || 8);
            }
            if (categoryId === 'bitki') {
                const { enPlantsData } = await import('./database/activities/objects/enPlantsData.ts');
                return shuffleArray(enPlantsData).slice(0, count || 8);
            }
            if (categoryId === 'doğa olayı') {
                const { enNaturalEventsData } = await import('./database/activities/objects/enNaturalEventsData.ts');
                return shuffleArray(enNaturalEventsData).slice(0, count || 8);
            }
            if (categoryId === 'uzay') {
                const { enSpaceData } = await import('./database/activities/objects/enSpaceData.ts');
                return shuffleArray(enSpaceData).slice(0, count || 8);
            }
            if (categoryId === 'tamir_aleti') {
                const { enToolsData } = await import('./database/activities/objects/enToolsData.ts');
                return shuffleArray(enToolsData).slice(0, count || 8);
            }
            if (categoryId === 'muzik_aleti') {
                const { enMusicalInstrumentsData } = await import('./database/activities/objects/enMusicalInstrumentsData.ts');
                return shuffleArray(enMusicalInstrumentsData).slice(0, count || 8);
            }
            if (categoryId === 'bina') {
                const { enBuildingsData } = await import('./database/activities/objects/enBuildingsData.ts');
                return shuffleArray(enBuildingsData).slice(0, count || 8);
            }
            if (categoryId === 'yer') {
                const { enPlacesData } = await import('./database/activities/objects/enPlacesData.ts');
                return shuffleArray(enPlacesData).slice(0, count || 8);
            }
        } catch (e) {
            console.warn('Curated EN dataset not found for category', categoryId, e);
        }
        // If no curated dataset exists yet, fall back to dynamic Turkish generator for now
    }
    const MAX_QUESTIONS_PER_ROUND = count || 8;
    const bannedIds = getBannedImageIds();

    // Normalize category strings to match the canonical IDs generated in `constants.ts`.
    // - lowercase
    // - convert Turkish diacritics to ASCII equivalents
    // - replace spaces, ampersands (&) and slashes with underscores
    // - collapse consecutive underscores
    const normalizeCategory = (s?: string) => (s || '').toString().toLowerCase().trim()
        .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
        .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
        .replace(/\s*&\s*|\s+\/\s+|\s+/g, '_').replace(/_+/g, '_')
        // Remove combining dot (from Turkish uppercase İ lowercasing producing i + \u0307)
        .replace(/\u0307/g, '');
    const targetCategory = normalizeCategory(categoryId);

    const itemsInCategory = imageData.filter(item =>
        !bannedIds.has(item.id) && normalizeCategory(item.tags.category) === targetCategory
    );

    // Önceden 4'ten az öğe varsa hiç tur döndürmüyordu. Artık havuz küçükse de eldeki kadar soru üretelim.
    if (itemsInCategory.length < 1) return [];

    const uniqueWords = [...new Set(itemsInCategory.map(item => item.word))];
    const questionWords = shuffleArray(uniqueWords).slice(0, MAX_QUESTIONS_PER_ROUND);

    const rounds: ConceptRound[] = [];

    for (const word of questionWords) {
        let correctItem: ImageMetadata | undefined;
        
        const mainVisualId = mainVisualMap[word.toLowerCase()];
        console.log(`DEBUG: word="${word}", normalized="${word.toLowerCase()}", mainVisualId=${mainVisualId}`);
        if (mainVisualId) {
            correctItem = itemsInCategory.find(item => item.id === mainVisualId);
            console.log(`DEBUG: Found correctItem with ID ${correctItem?.id} for word "${word}"`);
        }
        
        if (!correctItem) {
            const possibleItems = itemsInCategory.filter(item => item.word === word);
            
            const undesirableStates = new Set(['kırık', 'kirli', 'ıslak', 'eski', 'bayat', 'dağınık', 'kırışık', 'üzgün', 'kızgın', 'korkmuş', 'hasta', 'yorgun', 'solgun', 'çürük', 'ters']);
            
            const preferredItems = possibleItems.filter(item => {
                const itemTags = [
                    item.tags.quality,
                    item.tags.state,
                    item.tags.condition,
                    item.tags.emotion,
                ].flat().filter(Boolean);

                return !itemTags.some(tag => undesirableStates.has(tag as string));
            });

            if (preferredItems.length > 0) {
                correctItem = getRandomItems(preferredItems, 1)[0];
            } else {
                correctItem = getRandomItems(possibleItems, 1)[0];
            }
        }

        if (!correctItem) continue;

        // Helper function to check word conflicts
        const hasWordConflict = (word1: string, word2: string): boolean => {
            // Normalize Turkish characters for better matching
            const normalize = (str: string) => str.toLowerCase()
                .replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/ş/g, 's')
                .replace(/ç/g, 'c').replace(/ö/g, 'o').replace(/ü/g, 'u');
            
            const w1Normalized = normalize(word1);
            const w2Normalized = normalize(word2);
            
            // Direct substring check
            if (w1Normalized.includes(w2Normalized) || w2Normalized.includes(w1Normalized)) {
                return true;
            }
            
            // Split and check word parts
            const w1Parts = w1Normalized.split(' ');
            const w2Parts = w2Normalized.split(' ');
            
            // Check if any word parts overlap (e.g., "bardak" vs "su bardagi")
            return w1Parts.some(part => 
                w2Parts.some(part2 => {
                    if (part.length < 3 || part2.length < 3) return false; // Skip short words like "su"
                    return part.includes(part2) || part2.includes(part) ||
                           (Math.abs(part.length - part2.length) <= 2 && 
                            part.substring(0, Math.min(part.length - 1, part2.length - 1)) === 
                            part2.substring(0, Math.min(part.length - 1, part2.length - 1)));
                })
            );
        };

        let distractorPool: ImageMetadata[] = [];
        
        if (['meyve', 'sebze', 'yiyecek'].includes(targetCategory)) {
            distractorPool = imageData.filter(item =>
                !bannedIds.has(item.id) &&
                ['meyve', 'sebze', 'yiyecek'].includes(normalizeCategory(item.tags.category)) &&
                item.word !== correctItem.word &&
                !hasWordConflict(item.word, correctItem.word)
            );
        } else {
            distractorPool = itemsInCategory.filter(item => 
                item.word !== correctItem.word &&
                !hasWordConflict(item.word, correctItem.word)
            );
        }

        if (distractorPool.length < 3) {
            // Fallback: Get distractors from different categories to ensure variety
            distractorPool = imageData.filter(item =>
                !bannedIds.has(item.id) && 
                item.word !== correctItem.word &&
                !hasWordConflict(item.word, correctItem.word) &&
                item.tags.category !== correctItem.tags.category // Different category for variety
            );
            
            // If still not enough, relax category restriction but keep word conflict filter
            if (distractorPool.length < 3) {
                distractorPool = imageData.filter(item =>
                    !bannedIds.has(item.id) && 
                    item.word !== correctItem.word &&
                    !hasWordConflict(item.word, correctItem.word)
                );
            }
        }

        const distractors = getRandomItems(distractorPool, 3);
        if (distractors.length < 3) continue;

        // Translate words to target language
        const translatedWord = translateWord(correctItem.word, lang);
        const translatedDistractors = distractors.map(d => translateWord(d.word, lang));

        const options = shuffleArray([
            {
                id: correctItem.id, word: correctItem.word, audioKey: correctItem.audioKeys.default,
                spokenText: translatedWord, imageUrl: correctItem.imageUrl, isCorrect: true,
            },
            ...distractors.map((d, idx) => ({
                id: d.id, word: d.word, audioKey: d.audioKeys.default,
                spokenText: translatedDistractors[idx], imageUrl: d.imageUrl, isCorrect: false,
            }))
        ]);
        
        // Generate question text based on current language with translated word
        const questionTemplates: Record<string, (word: string) => string> = {
            tr: (word) => `${word} hangisi?`,
            en: (word) => `Which one is the ${word}?`,
            de: (word) => `Welches ist ${word}?`,
            fr: (word) => `Lequel est ${word}?`,
            nl: (word) => `Welke is ${word}?`,
            az: (word) => `${word} hansıdır?`
        };
        
        const questionTemplate = questionTemplates[lang] || questionTemplates.tr;
        
        rounds.push({
            id: correctItem.id, 
            question: questionTemplate(translatedWord),
            questionAudioKey: 'question_which_is_it', 
            options: options,
            activityType: ActivityType.ObjectRecognition,
            speech: {
                tr: {
                    correct: `Evet, bu ${translateWord(correctItem.word, 'tr')}.`,
                    wrong: `Hayır, bu ${translateWord(correctItem.word, 'tr')} değil.`
                },
                en: {
                    correct: `Yes, this is the ${translateWord(correctItem.word, 'en')}.`,
                    wrong: `No, this is not the ${translateWord(correctItem.word, 'en')}.`
                },
                de: {
                    correct: `Ja, das ist ${translateWord(correctItem.word, 'de')}.`,
                    wrong: `Nein, das ist nicht ${translateWord(correctItem.word, 'de')}.`
                },
                fr: {
                    correct: `Oui, c'est ${translateWord(correctItem.word, 'fr')}.`,
                    wrong: `Non, ce n'est pas ${translateWord(correctItem.word, 'fr')}.`
                },
                nl: {
                    correct: `Ja, dit is ${translateWord(correctItem.word, 'nl')}.`,
                    wrong: `Nee, dit is niet ${translateWord(correctItem.word, 'nl')}.`
                },
                az: {
                    correct: `Bəli, bu ${translateWord(correctItem.word, 'az')}.`,
                    wrong: `Xeyr, bu ${translateWord(correctItem.word, 'az')} deyil.`
                }
            }
        });
    }
    return rounds;
};

// --- DYNAMIC CONCEPT ACTIVITY GENERATORS ---

// Helper to create a ConceptOption from ImageMetadata (şu an kullanılmıyor)
/* const createOption = (image: ImageMetadata, isCorrect: boolean, spokenText: string): ConceptOption => ({
    id: image.id,
    word: image.word,
    imageUrl: image.imageUrl,
    audioKey: image.audioKeys.default,
    spokenText: spokenText,
    isCorrect,
}); */

const createYesNoRounds = (count: number = 8): Word[] => {
    const bannedIds = getBannedImageIds();
    
    // Filter the pool based on the user's list of IDs
    const yesNoPool = imageData.filter(item => 
        !bannedIds.has(item.id) && YES_NO_ALLOWED_IDS.has(item.id)
    );

    const uniqueWordMap = new Map<string, ImageMetadata>();
    for (const item of shuffleArray(yesNoPool)) {
        if (!uniqueWordMap.has(item.word.toLocaleLowerCase('tr-TR'))) {
            uniqueWordMap.set(item.word.toLocaleLowerCase('tr-TR'), item);
        }
    }
    const uniquePool = Array.from(uniqueWordMap.values());
    
    const rounds: Word[] = [];
    const usedIds = new Set<number>();
    const numYes = Math.ceil(count / 2);
    let attempts = 0;

    // "Yes" rounds
    while (rounds.length < numYes && attempts < 50) {
        attempts++;
        const item = getRandomItems(uniquePool, 1)[0];
        if (item && !usedIds.has(item.id)) {
            usedIds.add(item.id);
            rounds.push({
                id: item.id, word: item.word, imageUrl: item.imageUrl, audioKeys: item.audioKeys,
                questionText: `Bu bir ${item.word} mı?`, isCorrectAnswer: true, activityType: ActivityType.YesNo
            });
        }
    }
    
    // "No" rounds
    while (rounds.length < count && attempts < 100) {
        attempts++;
        const shownItem = getRandomItems(uniquePool, 1)[0];
        if (!shownItem || usedIds.has(shownItem.id)) {
            continue;
        }

        // New logic: Find a distractor from the same category first.
        let distractorPool = uniquePool.filter(
            item => item.tags.category === shownItem.tags.category && item.word !== shownItem.word
        );

        // Fallback: If no distractors in the same category, use any other item.
        if (distractorPool.length === 0) {
            distractorPool = uniquePool.filter(
                item => item.word !== shownItem.word
            );
        }
        
        if (distractorPool.length > 0) {
            const questionItem = getRandomItems(distractorPool, 1)[0];
            usedIds.add(shownItem.id);
            rounds.push({
                id: shownItem.id, word: shownItem.word, imageUrl: shownItem.imageUrl, audioKeys: shownItem.audioKeys,
                questionText: `Bu bir ${questionItem.word} mı?`, isCorrectAnswer: false, activityType: ActivityType.YesNo
            });
        }
    }

    return shuffleArray(rounds);
};

const createColorsRounds = (count: number = 8): ConceptRound[] => {
    const lang = getCurrentLanguage();
    const bannedIds = getBannedImageIds();
    const availableItems = imageData.filter(item => !bannedIds.has(item.id) && item.tags.color);
    
    const allColors = [...new Set(availableItems.flatMap(item => item.tags.color || []))];
    const rounds: ConceptRound[] = [];
    
    for (let i = 0; i < count; i++) {
        const targetColor = getRandomItems(allColors, 1)[0];
        
        const correctItems = availableItems.filter(item => (Array.isArray(item.tags.color) ? item.tags.color.includes(targetColor) : item.tags.color === targetColor));
        let distractorItems = availableItems.filter(item => !(Array.isArray(item.tags.color) ? item.tags.color.includes(targetColor) : item.tags.color === targetColor));

        if (targetColor === 'çok renkli') {
            const multiColoredWords = new Set(['papağan', 'gökkuşağı']);
            const correctItemForMulti = correctItems.find(item => multiColoredWords.has(item.word));
            if(correctItemForMulti) {
                distractorItems = distractorItems.filter(item => !multiColoredWords.has(item.word));
            }
        }

        const correctItem = getRandomItems(correctItems, 1)[0];
        const distractorItem = getRandomItems(distractorItems.filter(d => d.word !== correctItem?.word), 1)[0];

        if (correctItem && distractorItem) {
            const translatedColor = translateWord(targetColor, lang);
            
            const questionTemplates: Record<string, (color: string) => string> = {
                tr: (color) => `${color} olan hangisi?`,
                en: (color) => `Which one is ${color}?`,
                de: (color) => `Welches ist ${color}?`,
                fr: (color) => `Lequel est ${color}?`,
                nl: (color) => `Welke is ${color}?`,
                az: (color) => `${color} hansıdır?`
            };
            
            const options: ConceptOption[] = shuffleArray([
                { id: correctItem.id, word: correctItem.word, imageUrl: correctItem.imageUrl, isCorrect: true, audioKey: correctItem.audioKeys.default, spokenText: translatedColor },
                { id: distractorItem.id, word: distractorItem.word, imageUrl: distractorItem.imageUrl, isCorrect: false, audioKey: distractorItem.audioKeys.default, spokenText: translatedColor },
            ]);
            
            const questionTemplate = questionTemplates[lang] || questionTemplates.tr;
            
            rounds.push({ 
                id: correctItem.id + i, 
                question: questionTemplate(translatedColor), 
                questionAudioKey: "q_which_is_color", 
                activityType: ActivityType.Colors, 
                options,
                speech: {
                    tr: {
                        correct: `Evet, bu ${translateWord(targetColor, 'tr')}.`,
                        wrong: `Hayır, bu ${translateWord(targetColor, 'tr')} değil.`
                    },
                    en: {
                        correct: `Yes, this is ${translateWord(targetColor, 'en')}.`,
                        wrong: `No, this is not ${translateWord(targetColor, 'en')}.`
                    },
                    de: {
                        correct: `Ja, das ist ${translateWord(targetColor, 'de')}.`,
                        wrong: `Nein, das ist nicht ${translateWord(targetColor, 'de')}.`
                    },
                    fr: {
                        correct: `Oui, c'est ${translateWord(targetColor, 'fr')}.`,
                        wrong: `Non, ce n'est pas ${translateWord(targetColor, 'fr')}.`
                    },
                    nl: {
                        correct: `Ja, dit is ${translateWord(targetColor, 'nl')}.`,
                        wrong: `Nee, dit is niet ${translateWord(targetColor, 'nl')}.`
                    },
                    az: {
                        correct: `Bəli, bu ${translateWord(targetColor, 'az')}.`,
                        wrong: `Xeyr, bu ${translateWord(targetColor, 'az')} deyil.`
                    }
                }
            });
        }
    }
    return rounds;
};

const createShapesRounds = (count: number = 8): ConceptRound[] => {
    const lang = getCurrentLanguage();
    const bannedIds = getBannedImageIds();
    const shapePool = imageData.filter(item => !bannedIds.has(item.id) && item.tags.shape);

    const allShapes = [...new Set(shapePool.flatMap(item => item.tags.shape || []))].filter(s => ['daire', 'kare', 'üçgen', 'dikdörtgen', 'yıldız', 'oval'].includes(s));
    const rounds: ConceptRound[] = [];
    let attempts = 0;

    while (rounds.length < count && attempts < 50) {
        attempts++;
        const targetShape = getRandomItems(allShapes, 1)[0];
        if (!targetShape) continue;

        const correctItems = shapePool.filter(item => Array.isArray(item.tags.shape) ? item.tags.shape.includes(targetShape) : item.tags.shape === targetShape);
        
        const distractorItems = shapePool.filter(item => {
            if (!item.tags.shape) return false;
            const itemShapes = Array.isArray(item.tags.shape) ? item.tags.shape : [item.tags.shape];
            return itemShapes.some(s => allShapes.includes(s)) && !itemShapes.includes(targetShape);
        });
        
        const correctItem = getRandomItems(correctItems, 1)[0];
        const distractorItem = getRandomItems(distractorItems.filter(d => d.word !== correctItem?.word), 1)[0];
        
        if (correctItem && distractorItem) {
            const translatedShape = translateWord(targetShape, lang);
            
            // Helper to determine correct article for English
            const getArticle = (shape: string) => {
                const vowels = ['a', 'e', 'i', 'o', 'u'];
                return vowels.includes(shape.charAt(0).toLowerCase()) ? 'an' : 'a';
            };
            
            const questionTemplates: Record<string, (shape: string) => string> = {
                tr: (shape) => `${shape} olan hangisi?`,
                en: (shape) => `Which one is ${getArticle(shape)} ${shape}?`,
                de: (shape) => `Welches ist ${shape}?`,
                fr: (shape) => `Lequel est ${shape}?`,
                nl: (shape) => `Welke is ${shape}?`,
                az: (shape) => `${shape} hansıdır?`
            };
            
            const options: ConceptOption[] = shuffleArray([
                { id: correctItem.id, word: correctItem.word, imageUrl: correctItem.imageUrl, isCorrect: true, audioKey: correctItem.audioKeys.default, spokenText: translatedShape },
                { id: distractorItem.id, word: distractorItem.word, imageUrl: distractorItem.imageUrl, isCorrect: false, audioKey: distractorItem.audioKeys.default, spokenText: translatedShape },
            ]);
            
            const questionTemplate = questionTemplates[lang] || questionTemplates.tr;
            
            rounds.push({ 
                id: correctItem.id + rounds.length, 
                question: questionTemplate(translatedShape), 
                questionAudioKey: "q_which_is_shape", 
                activityType: ActivityType.Shapes, 
                options,
                speech: {
                    tr: {
                        correct: `Evet, bu ${translateWord(targetShape, 'tr')}.`,
                        wrong: `Hayır, bu ${translateWord(targetShape, 'tr')} değil.`
                    },
                    en: {
                        correct: `Yes, this is ${getArticle(translateWord(targetShape, 'en'))} ${translateWord(targetShape, 'en')}.`,
                        wrong: `No, this is not ${getArticle(translateWord(targetShape, 'en'))} ${translateWord(targetShape, 'en')}.`
                    },
                    de: {
                        correct: `Ja, das ist ${translateWord(targetShape, 'de')}.`,
                        wrong: `Nein, das ist nicht ${translateWord(targetShape, 'de')}.`
                    },
                    fr: {
                        correct: `Oui, c'est ${translateWord(targetShape, 'fr')}.`,
                        wrong: `Non, ce n'est pas ${translateWord(targetShape, 'fr')}.`
                    },
                    nl: {
                        correct: `Ja, dit is ${translateWord(targetShape, 'nl')}.`,
                        wrong: `Nee, dit is niet ${translateWord(targetShape, 'nl')}.`
                    },
                    az: {
                        correct: `Bəli, bu ${translateWord(targetShape, 'az')}.`,
                        wrong: `Xeyr, bu ${translateWord(targetShape, 'az')} deyil.`
                    }
                }
            });
        }
    }
    return rounds;
};

const createEmotionsRounds = (count: number = 8): ConceptRound[] => {
    const bannedIds = getBannedImageIds();
    const emotionItems = imageData.filter(item => !bannedIds.has(item.id) && item.tags.emotion);

    const characters = new Map<string, ImageMetadata[]>();
    for (const item of emotionItems) {
        if (!characters.has(item.word)) {
            characters.set(item.word, []);
        }
        characters.get(item.word)!.push(item);
    }
    
    const validCharacterGroups = Array.from(characters.values()).filter(group => group.length >= 2);
    if (validCharacterGroups.length === 0) return [];
    
    const rounds: ConceptRound[] = [];
    let attempts = 0;

    while (rounds.length < count && attempts < 50) {
        attempts++;
        const characterGroup = getRandomItems(validCharacterGroups, 1)[0];
        const [correctItem, distractorItem] = getRandomItems(characterGroup, 2);

        if (!correctItem || !distractorItem || !correctItem.tags.emotion || !distractorItem.tags.emotion) continue;

        const targetEmotion = Array.isArray(correctItem.tags.emotion) ? correctItem.tags.emotion[0] : correctItem.tags.emotion;
        
        if (rounds.some(r => r.options.some(o => o.id === correctItem.id))) {
            continue;
        }

        const lang = getCurrentLanguage();
        const translatedEmotion = translateWord(targetEmotion, lang);
        
        const questionTemplates: Record<string, (emotion: string) => string> = {
            tr: (emotion) => `${emotion.charAt(0).toLocaleUpperCase('tr-TR') + emotion.slice(1)} olan hangisi?`,
            en: (emotion) => `Which one is ${emotion}?`,
            de: (emotion) => `Welches ist ${emotion}?`,
            fr: (emotion) => `Lequel est ${emotion}?`,
            nl: (emotion) => `Welke is ${emotion}?`,
            az: (emotion) => `${emotion} hansıdır?`
        };
        
        const options: ConceptOption[] = shuffleArray([
            { id: correctItem.id, word: correctItem.word, imageUrl: correctItem.imageUrl, isCorrect: true, audioKey: correctItem.audioKeys.default, spokenText: translatedEmotion },
            { id: distractorItem.id, word: distractorItem.word, imageUrl: distractorItem.imageUrl, isCorrect: false, audioKey: distractorItem.audioKeys.default, spokenText: translatedEmotion },
        ]);

        const questionTemplate = questionTemplates[lang] || questionTemplates.tr;

        rounds.push({ 
            id: correctItem.id + distractorItem.id + rounds.length,
            question: questionTemplate(translatedEmotion), 
            questionAudioKey: "q_which_is_emotion", 
            activityType: ActivityType.Emotions, 
            options,
            speech: {
                tr: {
                    correct: `Evet, bu ${translateWord(targetEmotion, 'tr')}.`,
                    wrong: `Hayır, bu ${translateWord(targetEmotion, 'tr')} değil.`
                },
                en: {
                    correct: `Yes, this is ${translateWord(targetEmotion, 'en')}.`,
                    wrong: `No, this is not ${translateWord(targetEmotion, 'en')}.`
                },
                de: {
                    correct: `Ja, das ist ${translateWord(targetEmotion, 'de')}.`,
                    wrong: `Nein, das ist nicht ${translateWord(targetEmotion, 'de')}.`
                },
                fr: {
                    correct: `Oui, c'est ${translateWord(targetEmotion, 'fr')}.`,
                    wrong: `Non, ce n'est pas ${translateWord(targetEmotion, 'fr')}.`
                },
                nl: {
                    correct: `Ja, dit is ${translateWord(targetEmotion, 'nl')}.`,
                    wrong: `Nee, dit is niet ${translateWord(targetEmotion, 'nl')}.`
                },
                az: {
                    correct: `Bəli, bu ${translateWord(targetEmotion, 'az')}.`,
                    wrong: `Xeyr, bu ${translateWord(targetEmotion, 'az')} deyil.`
                }
            }
        });
    }

    return rounds;
};

// --- NEW, SIMPLIFIED MAIN DATA FETCHER ---
const staticActivityDataMap: { [key in ActivityType]?: any[] } = {
    [ActivityType.Senses]: sensesData,
    [ActivityType.BigSmall]: bigSmallData,
    [ActivityType.LongShort]: longShortData,
    [ActivityType.ThinThick]: thinThickData,
    [ActivityType.WideNarrow]: wideNarrowData,
    [ActivityType.OldNew]: oldNewData,
    [ActivityType.YoungOld]: youngOldData,
    [ActivityType.HardSoft]: hardSoftData,
    [ActivityType.CleanDirty]: cleanDirtyData,
    [ActivityType.WetDry]: wetDryData,
    [ActivityType.OpenClosed]: openClosedData,
    [ActivityType.StraightCurved]: straightCurvedData,
    [ActivityType.AliveLifeless]: aliveLifelessData,
    [ActivityType.BitterSweet]: bitterSweetData,
    [ActivityType.HeavyLight]: heavyLightData,
    [ActivityType.HotCold]: hotColdData,
    [ActivityType.RoughSmooth]: roughSmoothData,
    [ActivityType.BrokenIntact]: brokenIntactData,
    [ActivityType.MessyClean]: messyCleanData,
    [ActivityType.TazeBayat]: tazeBayatData,
    [ActivityType.KirisikDuzgun]: kirisikDuzgunData,
    [ActivityType.SivriKut]: sivriKutData,
    [ActivityType.ParlakMat]: parlakMatData,
    [ActivityType.TembelCaliskan]: tembelCaliskanData,
    [ActivityType.SeffafOpak]: seffafOpakData,
    [ActivityType.DikenliPuruzsuz]: dikenliPuruzsuzData,
    [ActivityType.DugumCozuk]: dugumCozukData,
    [ActivityType.HungryFull]: hungryFullData,
    [ActivityType.DerinSig]: derinSigData,
    [ActivityType.KalabalikTenha]: kalabalikTenhaData,
    [ActivityType.TersDuz]: tersDuzData,
    [ActivityType.FewMuch]: fewMuchData,
    [ActivityType.HalfQuarterWhole]: halfQuarterWholeData,
    [ActivityType.FullEmpty]: fullEmptyData,
    [ActivityType.OddEven]: oddEvenData,
    [ActivityType.CountMatch]: countMatchData,
    [ActivityType.OnUnder]: onUnderData,
    [ActivityType.BelowAbove]: belowAboveData,
    [ActivityType.BesideOpposite]: besideOppositeData,
    [ActivityType.InFrontOfBehind]: inFrontOfBehindData,
    [ActivityType.InsideOutside]: insideOutsideData,
    [ActivityType.Between]: betweenData,
    [ActivityType.LeftRight]: leftRightData,
    [ActivityType.NearFar]: nearFarData,
    [ActivityType.HighLow]: highLowData,
    [ActivityType.BeforeAfter]: beforeAfterData,
    [ActivityType.DayNight]: dayNightData,
    [ActivityType.FastSlow]: fastSlowData,
    [ActivityType.NoisyQuiet]: noisyQuietData,
    // WhatDoesntBelong is now handled dynamically
    // FunctionalMatching removed - now integrated into 5N1K "What?" category
    [ActivityType.FiveWOneH]: fiveWOneHData,
    [ActivityType.SequencingStories]: sequencingStoryData,
    [ActivityType.PatternCompletion]: patternCompletionData,
    [ActivityType.DragAndDropCounting]: dragAndDropCountingData,
    [ActivityType.DragAndDropPositioning]: dragAndDropPositioningData,
    [ActivityType.WhoseIsThis]: ownershipData,
    [ActivityType.ColorRecognition]: colorRecognitionData,
    [ActivityType.WhatsMissing]: whatsMissingData,
};

export const fetchConceptActivityData = async (
    activity: ActivityType,
    _activityStats: Record<string, ActivityStats>,
    count?: number,
    _isPremium?: boolean
): Promise<any[]> => {
    const MAX_QUESTIONS_STATIC = count || 8;
    const NUM_ROUNDS_DYNAMIC = count || 4; // Sudoku/Hafıza için 4 tur yeterli 

    // Dynamic Generators
    if (activity === ActivityType.YesNo) return createYesNoRounds(MAX_QUESTIONS_STATIC);
    if (activity === ActivityType.Colors) return createColorsRounds(MAX_QUESTIONS_STATIC);
    if (activity === ActivityType.Shapes) return createShapesRounds(MAX_QUESTIONS_STATIC);
    if (activity === ActivityType.Emotions) return createEmotionsRounds(MAX_QUESTIONS_STATIC);
    
    if (activity === ActivityType.WhatDoesntBelong) {
        // Erken ünitelerde sadece basit 3 aynı + 1 farklı (ID <=4), ileri (unit >=9) kategori bazlı.
        // Unlocked en yüksek üniteyi tahmin etmek için stats'tan güncel ilerleme: başarı oranı veya deneme varlığı.
        const highestUnlockedUnit = (() => {
            let maxUnit = 1;
            for (const key of Object.keys(_activityStats)) {
                const meta = getActivityMetadata(key as any);
                if (!meta) continue;
                const s = _activityStats[key];
                const attempted = s && ((s.totalQuestions || 0) > 0 || (s.history || []).some(h => h.total > 0));
                if (attempted && meta.unitNumber > maxUnit) maxUnit = meta.unitNumber;
            }
            return maxUnit;
        })();
        const pool = highestUnlockedUnit >= 9 ? whatDoesntBelongData : whatDoesntBelongData.filter(r => Number(r.id) <= 4);
        const rounds = getRandomItems(pool, MAX_QUESTIONS_STATIC).map(round => ({
            ...round,
            options: shuffleArray(round.options),
            activityType: activity,
        }));
        return shuffleArray(rounds);
    }

    // 5N1K: Only use static curated rounds; do NOT merge other reasoning rounds and do NOT slice here
    // so category filtering can pick sufficient items.
    if (activity === ActivityType.FiveWOneH) {
        const base = fiveWOneHData.map(r => ({ ...r, options: shuffleArray(r.options), activityType: ActivityType.FiveWOneH }));
        // Shuffle rounds for mixed mode; category filtering happens in AppRouter
        return shuffleArray(base);
    }


    if (activity === ActivityType.Sudoku) {
        // Progressive difficulty: Her 2 başarılı turda +1 boş hücre (1→4 arası)
        const rounds: SudokuRound[] = [];
        const shuffledSolutions = shuffleArray(sudokuData);

        for (let i = 0; i < NUM_ROUNDS_DYNAMIC; i++) {
            const solution = shuffledSolutions[i % shuffledSolutions.length];
            const unknowns = Math.min(4, Math.floor(i / 2) + 1); // Tur bazlı zorluk
            
            const puzzleGrid: (SudokuItem | null)[] = [...solution.solutionGrid];
            const indices = shuffleArray(Array.from({ length: 9 }, (_, k) => k));
            
            for (let j = 0; j < unknowns; j++) {
                puzzleGrid[indices[j]] = null;
            }

            rounds.push({
                ...solution,
                id: solution.id + i * 100,
                puzzleGrid: puzzleGrid,
                activityType: ActivityType.Sudoku,
            });
        }
        return rounds;
    }

    if (activity === ActivityType.PatternCompletion) {
        // Progressive difficulty: Seviye bazlı turlar (ID 1-4: Basit, 5-8: Orta, 9-12: Karmaşık)
        const rounds = [];
        
        for (let i = 0; i < NUM_ROUNDS_DYNAMIC; i++) {
            // Her 2 turda bir seviye atla: 0→basit, 2→orta, 4→karmaşık
            const difficultyLevel = Math.floor(i / 2); // 0, 0, 1, 1, 2, 2, 3, 3
            const startId = Math.min(difficultyLevel * 4 + 1, 9); // 1, 1, 5, 5, 9, 9, 9, 9
            const endId = Math.min(startId + 3, 12); // 4, 4, 8, 8, 12, 12, 12, 12
            
            // İlgili seviyeden rastgele tur seç
            const levelRounds = patternCompletionData.filter(r => r.id >= startId && r.id <= endId);
            const selectedRound = levelRounds[Math.floor(Math.random() * levelRounds.length)];
            
            if (selectedRound) {
                rounds.push({
                    ...selectedRound,
                    id: selectedRound.id + i * 100, // Unique ID
                    options: shuffleArray([...selectedRound.options]),
                });
            }
        }
        return rounds;
    }

    if (activity === ActivityType.MemoryCards) {
        // Progressive difficulty: Her 2 başarılı turda +1 çift (2→6 çift arası)
        const rounds: MemoryGameRound[] = [];
        
        for (let i = 0; i < NUM_ROUNDS_DYNAMIC; i++) {
            const numPairs = Math.min(6, Math.floor(i / 2) + 2); // Tur bazlı zorluk
            const boardCards = getRandomItems(memoryCardPool, numPairs);
            
            rounds.push({
                id: i,
                boardCards: boardCards,
                activityType: ActivityType.MemoryCards,
            });
        }
        return rounds;
    }

    if (activity === ActivityType.ObjectCollector) {
        // Nesne Toplama Oyunu - 8 farklı kategori/senaryo
        const shuffled = shuffleArray([...objectCollectorData]);
        const selectedRounds = shuffled.slice(0, Math.min(count || 8, objectCollectorData.length));
        return selectedRounds.map((round, idx) => ({
            ...round,
            id: idx,
            category: t(round.categoryKey, round.category),
        }));
    }

    // Provide placeholder rounds for fine motor activities which are UI-driven and
    // don't require prebuilt question payloads. This prevents "no content" messages
    // when launching LineTracing / ShapeColoring / RhythmFollowing from the menu.
    if (
        activity === ActivityType.LineTracing ||
        activity === ActivityType.ShapeColoring ||
        activity === ActivityType.RhythmFollowing ||
        activity === ActivityType.LetterTracing ||
        activity === ActivityType.ConstrainedColoring
    ) {
        const rounds: any[] = [];
        // LineTracing: 6 çizgi tipi var, ShapeColoring: 6 şekil var
        const numRounds = count || (activity === ActivityType.LineTracing ? 6 : 4);
        for (let i = 0; i < numRounds; i++) rounds.push({ id: i, activityType: activity });
        return rounds;
    }

    // --- Relative Comparison activities: load rounds from experimental JSON if available ---
    if (activity === ActivityType.RelativeBigSmall || activity === ActivityType.RelativeWideNarrow || activity === ActivityType.RelativeThinThick || activity === ActivityType.RelativeFewMuch || activity === ActivityType.RelativeLongShort || activity === ActivityType.RelativeNearFar || activity === ActivityType.RelativeHighLow) {
        // Map activity enum to dimension keys used in the JSON file
        const getDimensionKey = (act: ActivityType) => {
            switch (act) {
                case ActivityType.RelativeBigSmall: return 'size';
                case ActivityType.RelativeWideNarrow: return 'width';
                case ActivityType.RelativeThinThick: return 'thickness';
                case ActivityType.RelativeFewMuch: return 'quantity';
                case ActivityType.RelativeLongShort: return 'length';
                case ActivityType.RelativeNearFar: return 'distance';
                case ActivityType.RelativeHighLow: return 'height';
                default: return 'size';
            }
        };

        // Helper to synthesize items from imageData when payload is missing/insufficient
        // Prefer picking 4 visually-comparable items from the same category to avoid
        // totally unrelated images being compared.
        const synthesizeItems = (): any[] => {
            const bannedIds = getBannedImageIds();
            const candidates = imageData.filter(item => !bannedIds.has(item.id));

            // Group candidates by normalized category
            const normalize = (s?: string) => (s || '').toString().toLowerCase().trim();
            const bucket: Record<string, any[]> = {};
            for (const c of candidates) {
                const key = normalize(c.tags && (c.tags.category || '')) || 'uncategorized';
                if (!bucket[key]) bucket[key] = [];
                bucket[key].push(c);
            }

            // Prefer a category that has at least 4 distinct words
            let chosenGroup: any[] | null = null;
            const keys = Object.keys(bucket).filter(k => bucket[k] && bucket[k].length > 0);
            // Shuffle keys to pick a random category each time
            const shuffledKeys = shuffleArray(keys);
            for (const k of shuffledKeys) {
                const uniqueByWord = Array.from(new Map(bucket[k].map(it => [it.word && it.word.toLowerCase() || String(it.id), it])).values());
                if (uniqueByWord.length >= 4) { chosenGroup = uniqueByWord; break; }
            }

            // If no category has 4, pick the largest category
            if (!chosenGroup && keys.length > 0) {
                const largestKey = keys.reduce((a, b) => (bucket[a].length > bucket[b].length ? a : b));
                chosenGroup = Array.from(new Map(bucket[largestKey].map(it => [it.word && it.word.toLowerCase() || String(it.id), it])).values());
            }

            // Fallback: sample unique words from the whole candidate pool
            let selected: any[] = [];
            if (chosenGroup) {
                selected = getRandomItems(chosenGroup, Math.min(8, chosenGroup.length));
            } else {
                const uniquePool = Array.from(new Map(candidates.map(it => [it.word && it.word.toLowerCase() || String(it.id), it])).values());
                selected = getRandomItems(uniquePool, Math.min(8, uniquePool.length));
            }

            const unique: any[] = [];
            const seen = new Set<string>();
            for (const s of selected) {
                const key = (s.word || String(s.id)).toLowerCase();
                if (!seen.has(key)) {
                    seen.add(key);
                    // Prefer mainVisualMap match if exists
                    const mainId = mainVisualMap[key];
                    const imageId = mainId && !bannedIds.has(mainId) ? mainId : s.id;
                    unique.push({ imageId: imageId, labelKey: s.word || String(s.id), rank: undefined });
                }
                if (unique.length >= 4) break;
            }

            // Ensure we have 4 items; try to fill from other candidates
            if (unique.length < 4) {
                for (const c of candidates) {
                    const key = (c.word || String(c.id)).toLowerCase();
                    if (!seen.has(key)) {
                        seen.add(key);
                        unique.push({ imageId: c.id, labelKey: c.word || String(c.id), rank: undefined });
                    }
                    if (unique.length >= 4) break;
                }
            }

            // Final fallback: pad with placeholders (should be rare)
            while (unique.length < 4) unique.push({ imageId: 0, labelKey: `placeholder_${unique.length}`, rank: undefined });

            // Assign deterministic ranks 1..4 (could be randomized later)
            return unique.map((u, idx) => ({ ...u, rank: idx + 1 }));
        };

        // Try to load curated experimental data; if missing or incomplete, synthesize playable rounds
        try {
            const mod = await import('../data/experimental/relative_concepts.json');
            const payload = (mod && (mod as any).default) ? (mod as any).default : mod;
            const roundsPayload = payload && payload.rounds ? payload.rounds : [];
            const dim = getDimensionKey(activity);
            // Find rounds matching the requested dimension
            const matched = roundsPayload.filter((r: any) => String(r.dimension) === dim);

            // Prefer curated rounds. Use matched rounds first, then other curated rounds
            // (different dimensions) to fill the requested number. Only synthesize
            // from the general image pool as a last resort. This preserves the
            // dedicated curated set (IDs 950-977) for Relative Comparison activities.
            const rounds: any[] = [];

            // Normalized helper to convert payload items to internal format
            const convertItems = (arr: any[]) => arr.slice(0, 4).map((it: any, i: number) => ({ imageId: it.imageId || it.id || 0, labelKey: it.labelKey || it.word || `item_${i}`, rank: it.rank ?? i + 1 }));

            // 1) Add matched rounds (same dimension)
            for (let idx = 0; idx < Math.min(matched.length, NUM_ROUNDS_DYNAMIC); idx++) {
                const r = matched[idx];
                const items = (r.items && Array.isArray(r.items) && r.items.length >= 2)
                    ? convertItems(r.items)
                    : [];
                if (items.length > 0) rounds.push({ id: r.id || `${dim}_${idx}`, items, dimension: r.dimension, activityType: activity });
            }

            // If we have curated matches for this exact dimension, DO NOT mix in
            // curated rounds from other dimensions. Instead, create the requested
            // number of rounds using only the matched curated items (rotate
            // through matched rounds if there are multiple). This preserves the
            // dedicated curated image sets (e.g. IDs 950-977) for their respective
            // dimensions and prevents unrelated images appearing in the same
            // activity.
            if (matched.length > 0) {
                const baseRounds = matched.map((r: any) => ({ id: r.id, items: (r.items || []).slice(0,4).map((it: any, i: number) => ({ imageId: it.imageId || it.id || 0, labelKey: it.labelKey || it.word || `item_${i}`, rank: it.rank ?? i + 1 })), dimension: r.dimension }));
                for (let k = 0; k < NUM_ROUNDS_DYNAMIC; k++) {
                    const src = baseRounds[k % baseRounds.length];
                    // Use the exact curated items for every generated round
                    rounds.push({ id: `${src.id || dim}_${k}`, items: src.items.map((it: any) => ({ ...it })), dimension: src.dimension, activityType: activity });
                }
                return rounds;
            }

            // If there were no curated matches for this dimension at all,
            // fall back to sampling across the entire curated payload first
            // (to reuse any available experimental assets), then synthesize.
            const curatedItems = roundsPayload.flatMap((r: any) => (r.items || [])).map((it: any) => ({ imageId: it.imageId || it.id || 0, labelKey: it.labelKey || it.word || String(it.imageId || it.id), rank: it.rank }));
            const uniqueCurated = Array.from(new Map<number, any>((curatedItems as any[]).map((ci: any) => [ci.imageId, ci])).values());
            let cidx = 0;
            while (rounds.length < NUM_ROUNDS_DYNAMIC && uniqueCurated.length >= 4) {
                const slice = uniqueCurated.slice(cidx, cidx + 4).map((u: any, i: number) => ({ ...u, rank: u.rank ?? i + 1 }));
                if (slice.length === 4) rounds.push({ id: `curated_fill_${rounds.length}`, items: slice, dimension: dim, activityType: activity });
                cidx += 4;
                if (cidx >= uniqueCurated.length) cidx = 0;
            }

            // Fill remaining slots by synthesizing from the general image pool
            for (let k = rounds.length; k < NUM_ROUNDS_DYNAMIC; k++) {
                rounds.push({ id: `synth_fill_${k}`, items: synthesizeItems(), dimension: dim, activityType: activity });
            }

            return rounds;
        } catch (e) {
            console.warn('Could not load experimental relative comparison data', e);
            const fallback: any[] = [];
            const dim = getDimensionKey(activity);
            for (let i = 0; i < NUM_ROUNDS_DYNAMIC; i++) {
                // Inline synthesize logic (keep local to catch to avoid scope edge-cases)
                const bannedIds = getBannedImageIds();
                const candidates = imageData.filter(item => !bannedIds.has(item.id));
                const normalize = (s?: string) => (s || '').toString().toLowerCase().trim();
                const bucket: Record<string, any[]> = {};
                for (const c of candidates) {
                    const key = normalize(c.tags && (c.tags.category || '')) || 'uncategorized';
                    if (!bucket[key]) bucket[key] = [];
                    bucket[key].push(c);
                }
                let chosenGroup: any[] | null = null;
                const keys = Object.keys(bucket).filter(k => bucket[k] && bucket[k].length > 0);
                const shuffledKeys = shuffleArray(keys);
                for (const k of shuffledKeys) {
                    const uniqueByWord = Array.from(new Map(bucket[k].map(it => [it.word && it.word.toLowerCase() || String(it.id), it])).values());
                    if (uniqueByWord.length >= 4) { chosenGroup = uniqueByWord; break; }
                }
                if (!chosenGroup && keys.length > 0) {
                    const largestKey = keys.reduce((a, b) => (bucket[a].length > bucket[b].length ? a : b));
                    chosenGroup = Array.from(new Map(bucket[largestKey].map(it => [it.word && it.word.toLowerCase() || String(it.id), it])).values());
                }
                let selected: any[] = [];
                if (chosenGroup) selected = getRandomItems(chosenGroup, Math.min(8, chosenGroup.length));
                else selected = getRandomItems(Array.from(new Map(candidates.map(it => [it.word && it.word.toLowerCase() || String(it.id), it])).values()), Math.min(8, candidates.length));

                const unique: any[] = [];
                const seen = new Set<string>();
                for (const s of selected) {
                    const key = (s.word || String(s.id)).toLowerCase();
                    if (!seen.has(key)) {
                        seen.add(key);
                        const mainId = mainVisualMap[key];
                        const imageId = mainId && !bannedIds.has(mainId) ? mainId : s.id;
                        unique.push({ imageId: imageId, labelKey: s.word || String(s.id), rank: undefined });
                    }
                    if (unique.length >= 4) break;
                }
                if (unique.length < 4) {
                    for (const c of candidates) {
                        const key = (c.word || String(c.id)).toLowerCase();
                        if (!seen.has(key)) { seen.add(key); unique.push({ imageId: c.id, labelKey: c.word || String(c.id), rank: undefined }); }
                        if (unique.length >= 4) break;
                    }
                }
                while (unique.length < 4) unique.push({ imageId: 0, labelKey: `placeholder_${unique.length}`, rank: undefined });
                fallback.push({ id: `synth_${i}`, items: unique.map((u, idx) => ({ ...u, rank: idx + 1 })), dimension: dim, activityType: activity });
            }
            return fallback;
        }
    }

    // For all other static activities (spatial, qualities, quantities, etc.)
    const rawData = staticActivityDataMap[activity];
    if (!rawData) return [];

    if (rawData.length > 0 && rawData[0]?.options?.length === 2) {
        const pairGroups = new Map<string, ConceptRound[]>();
        const uniquePairRounds: ConceptRound[] = [];
        const sideCounts = new Map<string, number>();

        for (const round of rawData) {
            const optionIds = (round.options as ConceptOption[]).map(opt => opt.id).sort((a, b) => a - b);
            const pairKey = optionIds.join('-');
            const existing = pairGroups.get(pairKey) || [];
            existing.push(round);
            pairGroups.set(pairKey, existing);
        }

        const shuffledGroups = shuffleArray(Array.from(pairGroups.values()));
        for (const pairGroup of shuffledGroups) {
            if (uniquePairRounds.length >= MAX_QUESTIONS_STATIC) break;

            const selectedRound = pickBalancedRoundFromPairGroup(pairGroup, sideCounts);
            const side = getQuestionSideBucket(selectedRound);
            if (side) {
                sideCounts.set(side, (sideCounts.get(side) || 0) + 1);
            }

            uniquePairRounds.push({
                ...selectedRound,
                options: shuffleArray(selectedRound.options),
                activityType: activity,
            });
        }
        return uniquePairRounds;
    }

    let processedRounds: any[] = [];

    if (rawData.length > 0 && rawData[0]?.options) {
        processedRounds = rawData.map(round => ({
            ...round,
            options: shuffleArray(round.options),
            activityType: activity,
        }));
    } else {
        processedRounds = rawData.map(round => ({...round, activityType: activity}));
    }
    
    return getRandomItems(processedRounds, MAX_QUESTIONS_STATIC);
};

export const fetchLetterActivityData = async (activity: ActivityType, letter: string, count?: number): Promise<any[]> => {
    try {
        if (activity === ActivityType.EmbeddedStory) {
            return await fetchStoriesForLetter(letter);
        }
        if (activity === ActivityType.FindTheLetterInGrid) {
            return [{ id: 0, word: 'grid', imageUrl: '', audioKeys: { default: '' }, activityType: activity }];
        }
        if (activity === ActivityType.SoundPresence) {
             return await createLetterPresenceRounds(letter, count);
        }
        
        const fetchedWords = await fetchWordsForLetter(letter, count);
        
        if (activity === ActivityType.FindTheLetter) {
            const wordsWithLetter = fetchedWords.filter(w => w.hasLetter && w.word.replace(/\s/g, '').length <= 7);
            return getRandomItems(wordsWithLetter, count || 8).map(w => ({ ...w, activityType: activity }));
        }

        if (activity === ActivityType.FindTheSoundInImage) {
            const correctWords = fetchedWords.filter(w => w.hasLetter);
            const distractorPool = fetchedWords.filter(w => !w.hasLetter);
            
            const numRounds = Math.min(correctWords.length, Math.floor(distractorPool.length / 2), count || 8);
            if (numRounds < 1) return [];

            const rounds: Word[] = [];
            for (let i = 0; i < numRounds; i++) {
                const correctWord = correctWords[i];
                const distractors = [distractorPool[i * 2], distractorPool[i * 2 + 1]];
                const options = [correctWord, ...distractors].sort(() => Math.random() - 0.5);
                rounds.push({ ...correctWord, options, activityType: activity });
            }
            return rounds;
        }

        return [];
    } catch(error) {
        console.error("İçerik yüklenirken hata:", error);
        return [];
    }
};

// --- 5W1H helpers for sub-ID filtering (Who/What/Where/When/Why/How) ---
export const fetchFiveWOneHBySubKey = async (subKey: string, count?: number): Promise<ConceptRound[]> => {
    // Map sub-key to questionAudioKey prefix
    const prefixMap: Record<string, string> = {
        'FiveWOneH_Who': 'q_who',
        'FiveWOneH_What': 'q_what',
        'FiveWOneH_Where': 'q_where',
        'FiveWOneH_When': 'q_when',
        'FiveWOneH_Why': 'q_why',
        'FiveWOneH_How': 'q_how',
    };
    const prefix = prefixMap[subKey] || '';
    const base = fiveWOneHData
        .filter(r => !prefix || String(r.questionAudioKey || '').startsWith(prefix))
        .map(r => ({ ...r, options: shuffleArray(r.options), activityType: ActivityType.FiveWOneH }));
    const num = count || 6;
    return getRandomItems(base, num);
};
