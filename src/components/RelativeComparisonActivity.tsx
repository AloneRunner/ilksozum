import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { nesneUrl } from '../services/nesneGorsel.ts';
import { t } from '../i18n/index';
import { playEffect } from '../services/speechService.ts';
import { useAutoSpeak } from '../hooks/useAutoSpeak.ts';
import { ActivityType } from '../types.ts';

type Item = {
  imageId: number;
  labelKey: string;
  rank?: number; // 1..4 where higher means "more" for the chosen dimension
};

export type Round = {
  id?: string;
  dimension?: string;
  items: Item[];
};

type Props = {
  data: Round | null | undefined;
  activityType: ActivityType;
  currentCard: number;
  totalCards: number;
  onAdvance: (isCorrect: boolean) => void;
  isAutoSpeakEnabled: boolean;
  onBack?: () => void;
};

type AskMode = 'max' | 'min';

const dimensionQuestions: Record<
  string,
  { maxKey: string; minKey: string; maxFallback: string; minFallback: string }
> = {
  size: {
    maxKey: 'questions.q_which_is_big',
    minKey: 'questions.q_which_is_small',
    maxFallback: 'Hangisi büyük?',
    minFallback: 'Hangisi küçük?',
  },
  width: {
    maxKey: 'questions.q_which_is_wide',
    minKey: 'questions.q_which_is_narrow',
    maxFallback: 'Hangisi daha geniş?',
    minFallback: 'Hangisi daha dar?',
  },
  thickness: {
    maxKey: 'questions.q_which_is_thick',
    minKey: 'questions.q_which_is_thin',
    maxFallback: 'Hangisi daha kalın?',
    minFallback: 'Hangisi daha ince?',
  },
  quantity: {
    maxKey: 'questions.q_which_is_many',
    minKey: 'questions.q_which_is_few',
    maxFallback: 'Hangisi daha çok?',
    minFallback: 'Hangisi daha az?',
  },
  length: {
    maxKey: 'questions.q_which_is_long',
    minKey: 'questions.q_which_is_short',
    maxFallback: 'Hangisi daha uzun?',
    minFallback: 'Hangisi daha kısa?',
  },
  distance: {
    maxKey: 'questions.q_which_is_far',
    minKey: 'questions.q_which_is_near',
    maxFallback: 'Hangisi daha uzak?',
    minFallback: 'Hangisi daha yakın?',
  },
  height: {
    maxKey: 'questions.q_which_is_higher',
    minKey: 'questions.q_which_is_lower',
    maxFallback: 'Hangisi daha yüksek?',
    minFallback: 'Hangisi daha alçak?',
  },
};

// Helper to generate all unique pairs from 0 to n-1
const generateAllPairs = (n: number): [number, number][] => {
  const pairs: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      pairs.push([i, j]);
    }
  }
  return pairs;
};

// Per-round turns should match the number of unique pairs for the current
// set of items (e.g., for 4 items there are 6 pairs). Compute dynamically
// so the UI and logic reflect actual available comparisons.

const RelativeComparisonActivity: React.FC<Props> = ({
  data,
  activityType,
  currentCard,
  totalCards,
  onAdvance,
  isAutoSpeakEnabled,
  onBack,
}) => {
  const [items, setItems] = useState<Item[]>([]);
  const [askMode, setAskMode] = useState<AskMode>('max');
  const [openPair, setOpenPair] = useState<[number, number] | null>(null);
  const [previousPair, setPreviousPair] = useState<[number, number] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [turnCount, setTurnCount] = useState(0);
  const mistakeRef = useRef(false);

  const allPossiblePairs = useMemo(() => {
    if (items.length < 2) return [];
    return generateAllPairs(items.length);
  }, [items.length]);

  const maxTurns = useMemo(() => {
    return allPossiblePairs.length || 1;
  }, [allPossiblePairs.length]);

  const startNewTurn = useCallback(() => {
    if (allPossiblePairs.length === 0) return;

    let availablePairs = allPossiblePairs;
    if (previousPair) {
      // Filter out the previous pair (and its reverse)
      availablePairs = allPossiblePairs.filter(p => 
        !(p.includes(previousPair[0]) && p.includes(previousPair[1]))
      );
      if (availablePairs.length === 0) { // If all pairs have been shown once, reset
        availablePairs = allPossiblePairs;
      }
    }

    const newPair = availablePairs[Math.floor(Math.random() * availablePairs.length)];
    const newAskMode: AskMode = Math.random() < 0.5 ? 'max' : 'min';

    setOpenPair(newPair);
    setPreviousPair(newPair);
    setAskMode(newAskMode);
    setSelectedIndex(null);
    setFeedback(null);
    setIsLocked(false);
  }, [allPossiblePairs, previousPair]);

  // Effect to setup a new round when data changes
  const getDimensionFromActivityType = (act: ActivityType): string => {
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

  const dimensionKey = getDimensionFromActivityType(activityType);

  useEffect(() => {
    if (data) {
      // Use the provided data
  const subset = data.items.slice(0, 4).map((item: Item, index: number) => ({ ...item, rank: item.rank ?? index + 1 }));
      setItems(subset);
      setTurnCount(0);
      mistakeRef.current = false;
      setPreviousPair(null);
    } else {
      // Load from relative_concepts.json based on dimension
      const loadRound = async () => {
        try {
          const mod = (await import('../data/experimental/relative_concepts.json')) as any;
          const payload = mod.default ?? mod;
          const loadedRounds = payload?.rounds ?? [];
          const round = loadedRounds.find((r: Round) => r.dimension === dimensionKey);
          if (round) {
            const subset = round.items.slice(0, 4).map((item: Item, index: number) => ({ ...item, rank: item.rank ?? index + 1 }));
            setItems(subset);
            setTurnCount(0);
            mistakeRef.current = false;
            setPreviousPair(null);
          } else {
            console.error('Could not find round for dimension', dimensionKey);
          }
        } catch (e) {
          console.error('Could not load relative comparison data', e);
        }
      };
      loadRound();
    }
  }, [data, dimensionKey]);

  // Effect to start the first turn once items are set
  // Start the first turn when we initially receive items. We intentionally
  // depend only on items.length to avoid a loop caused by startNewTurn
  // changing identity when it updates previousPair.
  useEffect(() => {
    if (items.length === 0 || openPair) return;

    // Inline the startNewTurn logic for the initial turn to avoid
    // recreating the callback as a dependency which can cause an update loop.
    const pairs = generateAllPairs(items.length);
    if (pairs.length === 0) return;

    let availablePairs = pairs;
    if (previousPair) {
      availablePairs = pairs.filter(p => !(p.includes(previousPair[0]) && p.includes(previousPair[1])));
      if (availablePairs.length === 0) availablePairs = pairs;
    }

    const newPair = availablePairs[Math.floor(Math.random() * availablePairs.length)];
    const newAskMode: AskMode = Math.random() < 0.5 ? 'max' : 'min';

    setOpenPair(newPair);
    setPreviousPair(newPair);
    setAskMode(newAskMode);
    setSelectedIndex(null);
    setFeedback(null);
    setIsLocked(false);
  }, [items.length]);


  const handleCardClick = async (clickedIndex: number) => {
    if (!openPair || !openPair.includes(clickedIndex) || isLocked) {
      return;
    }

    setIsLocked(true);
    setSelectedIndex(clickedIndex);

    const [index1, index2] = openPair;
    const item1 = items[index1];
    const item2 = items[index2];

    // Determine the correct index based on the ranks of the items in the open pair
    const correctIndex = askMode === 'max'
      ? (item1.rank! > item2.rank! ? index1 : index2)
      : (item1.rank! < item2.rank! ? index1 : index2);

    const isCorrect = clickedIndex === correctIndex;

    if (isCorrect) {
      setFeedback('correct');
      await playEffect('correct');
      
      const newTurnCount = turnCount + 1;

      // Her doğru cevap bir round olarak sayılsın
      setTimeout(() => {
        onAdvance(true);
      }, 500);

      if (newTurnCount >= maxTurns) {
        // 8 soru tamamlandı, aktivite bitti
        // onAdvance zaten yukarıda çağrıldı
      } else {
        setTurnCount(newTurnCount);
        setTimeout(() => {
          startNewTurn();
        }, 600);
      }
    } else {
      mistakeRef.current = true;
      setFeedback('incorrect');
      await playEffect('incorrect');
      setTimeout(() => {
        setIsLocked(false);
        setSelectedIndex(null);
        setFeedback(null);
      }, 600);
    }
  };

  
  const questionMeta = dimensionQuestions[dimensionKey] ?? dimensionQuestions.size;
  const questionKey = askMode === 'max' ? questionMeta.maxKey : questionMeta.minKey;
  const questionText = askMode === 'max'
      ? t(questionKey, questionMeta.maxFallback)
      : t(questionKey, questionMeta.minFallback);

  useAutoSpeak(questionText, isAutoSpeakEnabled, openPair?.join('-'));

  // If we don't have enough items to play, show a friendly no-content message.
  // Do NOT require `data` prop to be present because the component may load
  // its own rounds when launched directly by activityType.
  if (items.length < 2) {
    return <div aria-live="polite">{t('app.noContentForActivity')}</div>;
  }

  // If we have items but the current open pair hasn't been selected yet,
  // render a lightweight placeholder while the first turn is being prepared.
  if (!openPair) {
    return (
      <div className="flex items-center justify-center w-full h-48">
        <div className="text-center text-sm text-slate-600">{t('app.loading', 'Yükleniyor...')}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-4xl mx-auto p-4 gap-4 animate-fade-in">
      {/* Orientation-specific styles for landscape: make cards shorter so 4 are visible and enable smooth vertical scrolling */}
      <style>{`
        /* Scroll container that limits height and enables smooth vertical scrolling */
        .rc-scroll-container { max-height: calc(100vh - 4rem); overflow-y: auto; -webkit-overflow-scrolling: touch; }

        /* Grid defaults to 2 columns (2x2 layout). We give the grid an explicit class to target orientation changes */
        .rc-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; width: 100%; max-width: 48rem; margin: 0 auto; }

        /* Card sizing: pick a compact height so 4 cards fit comfortably on smaller heights */
        .rc-card { height: 14rem; min-height: 10rem; }

        /* Landscape optimizations: place cards in a single row (4 columns) and reduce card height
           also allow horizontal scrolling if viewport is too narrow */
        @media (orientation: landscape) {
          .rc-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); max-width: 100%; gap: 0.75rem; }
          .rc-card { height: 18vh; min-height: 8rem; }
          .rc-scroll-container { max-height: calc(100vh - 3rem); overflow-x: auto; overflow-y: hidden; padding-bottom: 0.5rem; }
        }
      `}</style>
  <div className="w-full text-center space-y-1 relative">
        {/** Back button if parent passed onBack */}
        {typeof onBack === 'function' ? (
          <button onClick={onBack} className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-black/10 transition-colors" aria-label={t('app.back', 'Geri dön')}>
            <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6" /><path d="M12 19l-7-7 7-7"/></svg>
          </button>
        ) : null}
      </div>
  <div className="w-full text-center space-y-1">
        <h3 className="text-xl font-semibold text-slate-800">
          {t(
            'experimental.relativeComparison.title',
            'Göreceli Karşılaştırma (Deneme)'
          )}
        </h3>
        <p className="text-sm text-slate-600">
          {t(
            'experimental.relativeComparison.instruction',
            'Açılan iki kartı karşılaştır ve soruyu cevapla.'
          )}
        </p>
        <p className="text-base font-medium text-teal-700">{questionText}</p>
        <p className="text-xs text-slate-500">
          {t('experimental.relativeComparison.activityLabel', 'Etkinlik')}: {currentCard}/{totalCards}
        </p>
      </div>

      {/* Scrollable area that adapts to orientation */}
      <div className="rc-scroll-container w-full">
        <div className="rc-grid" aria-live="polite">
        {items.map((item, index) => {
          const isOpen = !!openPair?.includes(index);
          const isSelected = selectedIndex === index;
          const isCorrect = feedback === 'correct' && isSelected;
          const isIncorrect = feedback === 'incorrect' && isSelected;
          const borderColor = isCorrect
            ? '#0f9d58'
            : isIncorrect
            ? '#ea4335'
            : isOpen
            ? '#0b84ff'
            : '#d4d4d8';

          return (
            <button
              key={item.imageId}
              onClick={() => handleCardClick(index)}
              type="button"
              disabled={!isOpen || isLocked}
              className={`relative rc-card rounded-xl bg-transparent focus:outline-none`}
              style={{ perspective: '1000px' }}
              aria-pressed={isSelected}
              aria-label=""
            >
              <div className={`relative w-full h-full rounded-xl shadow-sm transition-transform duration-500 ${
                isOpen && !isLocked ? 'hover:-translate-y-1' : ''
              }`}
              style={{ transformStyle: 'preserve-3d', transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                {/* Front of the card (Hidden) */}
                <div className="absolute w-full h-full rounded-xl bg-white border-2 flex items-center justify-center text-lg font-semibold text-slate-400 select-none" style={{ backfaceVisibility: 'hidden', borderColor }}>
                  ?
                </div>

                {/* Back of the card (Visible) */}
                <div className="absolute w-full h-full rounded-xl bg-white border-2 flex items-center justify-center p-2" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderColor }}>
                  <img
                    src={nesneUrl(`/images/${item.imageId}.png`)}
                    alt=""
                    className="w-full h-full object-contain"
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                    onError={(event) => {
                      (event.currentTarget as HTMLImageElement).style.display =
                        'none';
                    }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </div>
  );
};

export default RelativeComparisonActivity;
