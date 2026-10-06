import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Word, ActivityType } from '../types.ts';
import Card from './ui/Card.tsx';
import SpeakerIcon from './icons/SpeakerIcon.tsx';
import { speak, playEffect } from '../services/speechService.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import EyeIcon from './icons/EyeIcon.tsx';
import EyeSlashIcon from './icons/EyeSlashIcon.tsx';
import BanIcon from './icons/BanIcon.tsx';
import { useAutoSpeak } from '../hooks/useAutoSpeak.ts';
import { getCurrentLanguage } from '../i18n/index.ts';

interface LearningCardProps {
    word: Word;
    letter: string;
    onAdvance: (isCorrect: boolean) => void;
    currentCard: number;
    totalCards: number;
    activityType: ActivityType;
    onBack: () => void;
    isAutoSpeakEnabled: boolean;
    isWordLabelVisible: boolean;
    onToggleWordLabel: () => void;
    onBanImage: (id: number) => void;
    isBanButtonEnabled: boolean;
    isFastTransitionEnabled: boolean;
}

const LearningCard: React.FC<LearningCardProps> = ({ 
    word, letter, onAdvance, currentCard, totalCards, onBack, 
    isAutoSpeakEnabled, isWordLabelVisible, onToggleWordLabel, onBanImage, isBanButtonEnabled, isFastTransitionEnabled
}) => {
    const [foundIndices, setFoundIndices] = useState<number[]>([]);
    const [wrongIndex, setWrongIndex] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState(false); // True when all letters are found
    const [mistakeMade, setMistakeMade] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    
    const lang = getCurrentLanguage();
    const locale = lang === 'tr' ? 'tr-TR' : lang === 'de' ? 'de-DE' : lang === 'az' ? 'az-AZ' : lang === 'fr' ? 'fr-FR' : lang === 'nl' ? 'nl-NL' : 'en-US';
    const upperCaseLetter = letter.toLocaleUpperCase(locale);

    const totalCorrectLetters = useMemo(() => 
        word.word.split('').filter(c => c.toLocaleUpperCase(locale) === upperCaseLetter).length
    , [word, upperCaseLetter, locale]);

    useAutoSpeak(word.word, isAutoSpeakEnabled, word.id, 250);

    useEffect(() => {
        // Reset state for new word
        setFoundIndices([]);
        setWrongIndex(null);
        setIsCorrect(false);
        setMistakeMade(false);
    }, [word]);
    
    useEffect(() => {
        if(cardRef.current) {
            cardRef.current.focus();
        }
    }, [word.id]);

    const handleLetterClick = async (clickedLetter: string, index: number) => {
        if (isCorrect || foundIndices.includes(index)) return;

        if (clickedLetter.toLocaleUpperCase('tr-TR') === upperCaseLetter) {
            await playEffect('correct');
            const newFound = [...foundIndices, index];
            setFoundIndices(newFound);

            if (newFound.length === totalCorrectLetters) {
                setIsCorrect(true);
                setTimeout(() => onAdvance(!mistakeMade), isFastTransitionEnabled ? 200 : 800);
            }
        } else {
            setMistakeMade(true);
            setWrongIndex(index);
            await playEffect('incorrect');
            setTimeout(() => {
                setWrongIndex(null);
            }, 500);
        }
    };
    
    const handleSpeak = (e: React.MouseEvent) => {
        e.stopPropagation();
        speak(word.word);
    };
    
    const handleBan = (e: React.MouseEvent) => {
        e.stopPropagation();
        onBanImage(word.id);
    }
    
    return (
        <div 
         ref={cardRef}
         tabIndex={-1}
         className="flex flex-col items-center justify-start h-full w-full max-w-4xl mx-auto p-1 sm:p-2 landscape:p-1 animate-fade-in outline-none" 
         aria-live="polite">
            
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-2 sm:mb-4">
                <button onClick={onBack} className="p-1.5 rounded-full bg-white/50 hover:bg-white/80 transition-colors" aria-label="Geri dön">
                    <ArrowLeftIcon className="w-6 h-6 sm:w-7 sm:h-7 text-sky-700" />
                </button>
                <div className="text-sm font-bold text-sky-800 drop-shadow-md">
                    {currentCard}/{totalCards}
                </div>
                <button onClick={onToggleWordLabel} className="p-1.5 rounded-full bg-white/50 hover:bg-white/80 transition-colors" aria-label={isWordLabelVisible ? 'Kelimeyi gizle' : 'Kelimeyi göster'}>
                    {isWordLabelVisible ? <EyeSlashIcon className="w-6 h-6 sm:w-7 sm:h-7 text-sky-700" /> : <EyeIcon className="w-6 h-6 sm:w-7 sm:h-7 text-sky-700" />}
                </button>
            </div>

            {/* Main Content Wrapper */}
            <div className="flex-grow w-full flex flex-col landscape:flex-row items-center justify-center gap-4">
                {/* Left Side: Title and Image */}
                <div className="w-full landscape:w-2/5 flex flex-col items-center">
                    <h1 className="text-lg sm:text-xl font-black text-center text-sky-900 mb-3">
                        Kelimedeki <span className="text-red-500 text-2xl">{upperCaseLetter}</span> harflerini bul
                        <span className="ml-2 inline-block rounded-full bg-sky-100 px-2 py-0.5 text-sm text-sky-700 align-middle">{foundIndices.length}/{totalCorrectLetters}</span>
                    </h1>
                    <Card
                        imageUrl={word.imageUrl}
                        word={word.word}
                        isRevealed={isCorrect || isWordLabelVisible}
                        isCorrect={isCorrect}
                        onClick={() => {}}
                        className={`${wrongIndex !== null ? 'animate-shake' : ''} w-full max-w-[280px] sm:max-w-[320px] landscape:max-w-[240px] h-auto aspect-square`}
                        aria-label={word.word}
                        isLetterActivity={true}
                    >
                        <div className="absolute top-2 right-2 flex space-x-1 sm:space-x-2">
                            {isBanButtonEnabled && (
                                <button 
                                    onClick={handleBan}
                                    className="p-1.5 sm:p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors" 
                                    aria-label="Bu görseli bir daha gösterme">
                                    <BanIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                                </button>
                            )}
                            <button 
                                onClick={handleSpeak}
                                className="p-1.5 sm:p-2 bg-sky-100 rounded-full hover:bg-sky-200 transition-colors" 
                                aria-label="Kelimeyi seslendir">
                                <SpeakerIcon className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
                            </button>
                        </div>
                    </Card>
                </div>
            
                {/* Right Side: Letter choices */}
                <div className="w-full mt-2 landscape:w-3/5 landscape:mt-0 max-w-sm">
                    <div className="flex flex-col items-center justify-center gap-2 p-3 bg-white/70 rounded-2xl shadow-inner">
                        {word.word.split(' ').map((wordPart, wordIndex) => {
                            const precedingLetters = word.word.split(' ').slice(0, wordIndex).join('').length + wordIndex;
                            return (
                                <div key={wordIndex} className="flex flex-wrap justify-center items-center gap-1 sm:gap-2">
                                    {wordPart.split('').map((char, charIndex) => {
                                        const overallIndex = precedingLetters + charIndex;
                                        const isFound = foundIndices.includes(overallIndex);
                                        const isJustWrong = wrongIndex === overallIndex;

                                        return (
                                            <button
                                                key={`${word.id}-${overallIndex}`}
                                                onClick={() => handleLetterClick(char, overallIndex)}
                                                disabled={isCorrect || isFound}
                                                className={`
                                                    w-11 h-12 sm:w-12 sm:h-14 text-2xl sm:text-3xl font-black rounded-xl shadow-md
                                                    transition-all duration-200 ease-in-out
                                                    focus:outline-none focus:ring-4 focus:ring-amber-400
                                                    ${
                                                        isFound
                                                            ? 'bg-green-400 text-white transform scale-110 ring-4 ring-green-200'
                                                            : isJustWrong
                                                            ? 'bg-red-400 text-white transform scale-110'
                                                            : 'bg-white hover:bg-sky-50 text-sky-800'
                                                    }
                                                `}
                                                aria-label={`Harf ${char}`}
                                            >
                                                {char}
                                            </button>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(LearningCard);