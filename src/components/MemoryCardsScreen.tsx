import React, { useState, useEffect, useRef } from 'react';
import { MemoryGameRound, MemoryCard } from '../types.ts';
import Card from './ui/Card.tsx';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { playEffect } from '../services/speechService.ts';
import SpeakerIcon from './icons/SpeakerIcon.tsx';
import SpeakerOffIcon from './icons/SpeakerOffIcon.tsx';
import EyeIcon from './icons/EyeIcon.tsx';
import EyeSlashIcon from './icons/EyeSlashIcon.tsx';
import { useAutoSpeak } from '../hooks/useAutoSpeak.ts';
import useWindowSize from '../hooks/useWindowSize.ts';
import { t } from '../i18n/index.ts';

interface MemoryCardsScreenProps {
    roundData: MemoryGameRound;
    onAdvance: (isCorrect: boolean) => void;
    onBack: () => void;
    isAutoSpeakEnabled: boolean;
    onToggleAutoSpeak: () => void;
    currentCard: number;
    totalCards: number;
    isWordLabelVisible: boolean;
    onToggleWordLabel: () => void;
}

const MemoryCardsScreen: React.FC<MemoryCardsScreenProps> = ({
    roundData, onAdvance, onBack, isAutoSpeakEnabled, onToggleAutoSpeak, currentCard, totalCards, isWordLabelVisible, onToggleWordLabel
}) => {
    const [board, setBoard] = useState<(MemoryCard & { uniqueId: number })[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchedIds, setMatchedIds] = useState<number[]>([]);
    const [isChecking, setIsChecking] = useState(false);
    const [isMemorizing, setIsMemorizing] = useState(true);
    const [isComplete, setIsComplete] = useState(false);
    const [mistakeMade, setMistakeMade] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const { width, height } = useWindowSize();
    const isLandscape = (width ?? 0) > (height ?? 0);
    
    const question = t('reasoning.activities.memoryCards.instruction', 'Remember the positions and find the matching pairs.');
    useAutoSpeak(question, isAutoSpeakEnabled, roundData.id);

    // (debug logging removed for production)

    useEffect(() => {
        const shuffledPairs = [...roundData.boardCards, ...roundData.boardCards]
            .sort(() => Math.random() - 0.5)
            .map((card, index) => ({ ...card, uniqueId: index }));
        
        setBoard(shuffledPairs);
        setFlippedIndices([]);
        setMatchedIds([]);
        setIsChecking(false);
        setIsMemorizing(true);
        setIsComplete(false);
        setMistakeMade(false);
        
        // Memorization phase
        const memorizationTimer = setTimeout(() => {
            setIsMemorizing(false);
        }, 5000); // 5 seconds to memorize

        return () => {
            clearTimeout(memorizationTimer);
        }
    }, [roundData]);

    useEffect(() => {
        if (isComplete) return;
        if (!isMemorizing && matchedIds.length === roundData.boardCards.length) {
            setIsComplete(true);
            playEffect('finish');
            setTimeout(() => onAdvance(!mistakeMade), 1200);
        }
    }, [matchedIds, roundData.boardCards.length, onAdvance, isMemorizing, isComplete, mistakeMade]);
    
     useEffect(() => {
        if(cardRef.current) {
            cardRef.current.focus();
        }
    }, [roundData.id]);

    const handleCardClick = (index: number) => {
        if (isMemorizing || isChecking || flippedIndices.includes(index) || matchedIds.includes(board[index].id)) {
            return;
        }

        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);
        
        // Kart etiketini okuma - sadece efekt sesleri çal

        if (newFlipped.length === 2) {
            setIsChecking(true);
            const [firstIndex, secondIndex] = newFlipped;
            if (board[firstIndex].id === board[secondIndex].id) {
                // Match - non-blocking
                playEffect('correct').catch(() => {});
                setMatchedIds(prev => [...prev, board[firstIndex].id]);
                setFlippedIndices([]);
                setIsChecking(false);
            } else {
                // No match - non-blocking
                setMistakeMade(true);
                playEffect('incorrect').catch(() => {});
                setTimeout(() => {
                    setFlippedIndices([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    };
    
    const numCards = board.length;
    // Dinamik kolon hesaplama - zorluk artınca daha fazla kolon
    const computeCols = () => {
        if (isLandscape) {
            if (numCards <= 4) return 4;
            if (numCards <= 6) return 3; // 2x3 grid
            if (numCards <= 8) return 4; // 2x4 grid
            if (numCards <= 10) return 5; // 2x5 grid
            return 6; // 2x6 grid (12 kart)
        } else {
            if (numCards <= 4) return 2; // 2x2
            if (numCards <= 6) return 3; // 2x3
            if (numCards <= 8) return 4; // 2x4
            if (numCards <= 10) return 5; // 2x5
            return 4; // 12 kart için 3x4
        }
    };
    const gridCols = computeCols();



    return (
        <div 
         ref={cardRef}
         tabIndex={-1}
         className="flex flex-col items-center justify-start h-full w-full max-w-4xl mx-auto p-4 animate-fade-in outline-none overflow-y-auto" 
         aria-live="polite">
            
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-4">
                <button onClick={onBack} className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors" aria-label={t('app.back', 'Go back')}>
                    <ArrowLeftIcon className="w-8 h-8 text-indigo-700" />
                </button>
                 <div className="flex-grow flex items-center justify-center gap-4">
                {isMemorizing ? (
                    <h1 className="text-xl sm:text-2xl font-bold text-center text-red-600 animate-pulse">
                       {t('reasoning.activities.memoryCards.memorizeTitle', 'Memorize!')}
                    </h1>
                ) : (
                    <h1 className="text-xl sm:text-2xl font-bold text-center text-indigo-800">
                      {t('reasoning.activities.memoryCards.playTitle', 'Find the Match')}
                    </h1>
                )}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-indigo-800">{currentCard}/{totalCards}</span>
                    <button onClick={onToggleAutoSpeak} className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors" aria-label={isAutoSpeakEnabled ? t('accessibility.autoSpeakOff', 'Turn off auto speak') : t('accessibility.autoSpeakOn', 'Turn on auto speak')}>
                        {isAutoSpeakEnabled ? <SpeakerIcon className="w-7 h-7 text-indigo-600" /> : <SpeakerOffIcon className="w-7 h-7 text-indigo-600" />}
                    </button>
                     <button onClick={onToggleWordLabel} className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors" aria-label={isWordLabelVisible ? t('choice.hideLabel', 'Hide labels') : t('choice.showLabel', 'Show labels')}>
                        {isWordLabelVisible ? <EyeSlashIcon className="w-7 h-7 text-indigo-600" /> : <EyeIcon className="w-7 h-7 text-indigo-600" />}
                    </button>
                </div>
            </div>

            {/* debug panel removed */}

            <div className="w-full flex-grow flex items-center justify-center p-2 overflow-hidden">
                <div
                    className={`mx-auto grid ${isLandscape ? 'gap-1.5 sm:gap-2 max-h-[70vh] max-w-[90vw]' : 'gap-2 sm:gap-3 max-w-xl max-h-[75vh]'}`}
                    style={{ 
                        gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
                        width: 'fit-content'
                    }}
                >
                    {board.map((card, index) => {
                        const isFlipped = flippedIndices.includes(index) || matchedIds.includes(card.id) || isMemorizing;
                        const isMatched = matchedIds.includes(card.id);
                        
                        return (
                            <div 
                                key={card.uniqueId} 
                                className={`aspect-square ${board.length <= 4 ? 'w-36 sm:w-44' : board.length <= 8 ? 'w-28 sm:w-36' : 'w-24 sm:w-28'}`}
                            >
                                <Card
                                    imageUrl={card.imageUrl}
                                    word={card.word}
                                    isFlippable={true}
                                    isFlipped={isFlipped}
                                    isCorrect={isMatched}
                                    onClick={() => handleCardClick(index)}
                                    isDisabled={isChecking || isMatched}
                                    isRevealed={isWordLabelVisible}
                                />
                            </div>
                        );
    
                    })}
                </div>
            </div>
        </div>
    );
};

export default MemoryCardsScreen;