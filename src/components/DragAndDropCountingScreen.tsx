import React, { useState, useEffect } from 'react';
import { nesneUrl } from '../services/nesneGorsel.ts';
import { DragAndDropCountingRound } from '../types.ts';
import Card from './ui/Card.tsx';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { speak, playEffect } from '../services/speechService.ts';
import SpeakerIcon from './icons/SpeakerIcon.tsx';
import BasketIcon from './icons/BasketIcon.tsx';
import EyeIcon from './icons/EyeIcon.tsx';
import EyeSlashIcon from './icons/EyeSlashIcon.tsx';
import { useAutoSpeak } from '../hooks/useAutoSpeak.ts';
import { getCurrentLanguage, t } from '../i18n/index.ts';
import { translateQuestion } from '../utils/translate.ts';

interface DragAndDropCountingScreenProps {
    roundData: DragAndDropCountingRound;
    onAdvance: (isCorrect: boolean) => void;
    onBack: () => void;
    currentCard: number;
    totalCards: number;
    isAutoSpeakEnabled: boolean;
    isWordLabelVisible: boolean;
    onToggleWordLabel: () => void;
}

const DragAndDropCountingScreen: React.FC<DragAndDropCountingScreenProps> = ({
    roundData, onAdvance, onBack, currentCard, totalCards, isAutoSpeakEnabled, isWordLabelVisible, onToggleWordLabel
}) => {
    const [count, setCount] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isWrong, setIsWrong] = useState(false);

    const currentLang = getCurrentLanguage();
    const localizedQuestion = translateQuestion(roundData.question, currentLang);
    const instructionByLang: Record<string, string> = {
        tr: 'Sepete eklemek için dokun',
        en: 'Tap to add to the basket',
        de: 'Zum Hinzufügen in den Korb tippen',
        fr: 'Touchez pour ajouter au panier',
        nl: 'Tik om toe te voegen aan de mand',
        az: 'Səbətə əlavə etmək üçün toxun'
    };
    const localizedInstruction = instructionByLang[currentLang] ?? instructionByLang.en;

    useAutoSpeak(localizedQuestion, isAutoSpeakEnabled, roundData.id);

    useEffect(() => {
        setCount(0);
        setIsCorrect(false);
        setIsWrong(false);
    }, [roundData]);

    const handleAddItem = async () => {
        if (isCorrect) return;

        const newCount = count + 1;
        setCount(newCount);
        speak(String(newCount));
        
        if (newCount === roundData.targetCount) {
            setIsCorrect(true);
            await playEffect('correct');
            setTimeout(() => onAdvance(true), 1200);
        } else if (newCount > roundData.targetCount) {
             setIsWrong(true);
             await playEffect('incorrect');
             setTimeout(() => {
                setCount(0);
                setIsWrong(false);
             }, 1000);
        }
    };

    return (
        <div className="flex flex-col items-center h-full w-full max-w-4xl mx-auto p-4 landscape:p-2 animate-fade-in overflow-y-auto">
            {/* Compact Header for Landscape */}
            <div className="w-full flex justify-between items-center mb-4 landscape:mb-2 p-2 landscape:p-1 bg-white/50 backdrop-blur-sm rounded-full">
                <button onClick={onBack} className="p-2 landscape:p-1 rounded-full hover:bg-white/80 transition-colors" aria-label={t('app.back')}>
                    <ArrowLeftIcon className="w-8 h-8 landscape:w-6 landscape:h-6 text-lime-700" />
                </button>
                <div className="flex items-center gap-2 landscape:gap-3">
                    <h1 className="text-lg landscape:text-sm font-bold text-lime-800 hidden landscape:block">{localizedQuestion}</h1>
                    <button onClick={() => speak(localizedQuestion)} className="p-2 landscape:p-1 bg-lime-100 rounded-full hover:bg-lime-200 transition-colors" aria-label={t('choice.readQuestion')}>
                        <SpeakerIcon className="w-7 h-7 landscape:w-5 landscape:h-5 text-lime-600" />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-lg landscape:text-sm font-bold text-lime-800">{currentCard} / {totalCards}</div>
                    <button onClick={onToggleWordLabel} className="p-2 landscape:p-1 rounded-full hover:bg-white/80 transition-colors" aria-label={isWordLabelVisible ? t('choice.hideLabel') : t('choice.showLabel')}>
                        {isWordLabelVisible ? <EyeSlashIcon className="w-8 h-8 landscape:w-6 landscape:h-6 text-lime-700" /> : <EyeIcon className="w-8 h-8 landscape:w-6 landscape:h-6 text-lime-700" />}
                    </button>
                </div>
            </div>

            {/* Question - Only Portrait */}
            <div className="w-full landscape:hidden bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-center text-lime-800 flex items-center justify-center gap-4">
                    {localizedQuestion}
                    <button onClick={() => speak(localizedQuestion)} className="p-2 bg-lime-100 rounded-full hover:bg-lime-200 transition-colors" aria-label={t('choice.readQuestion')}>
                        <SpeakerIcon className="w-7 h-7 text-lime-600" />
                    </button>
                </h1>
            </div>


            <div className="flex-grow w-full flex flex-col landscape:flex-row items-center justify-around gap-6 landscape:gap-4 landscape:max-h-[80vh]">
                {/* Item to Drag */}
                <div className="text-center landscape:flex-1 flex flex-col items-center">
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg mb-3">
                        <p className="font-semibold text-sm landscape:text-xs text-lime-700">{localizedInstruction}</p>
                    </div>
                    <div className="w-28 h-28 sm:w-36 sm:h-36 landscape:w-32 landscape:h-32">
                       <Card imageUrl={roundData.itemToDrag.imageUrl} word={roundData.itemToDrag.word} isRevealed={isWordLabelVisible} onClick={handleAddItem} className="aspect-square"/>
                    </div>
                </div>

                {/* Target Basket */}
                <div className="text-center landscape:flex-1 flex items-center justify-center">
                    <div className={`relative w-48 h-48 sm:w-60 sm:h-60 landscape:w-[min(40vw,55vh)] landscape:h-[min(40vw,55vh)] flex items-center justify-center p-3 landscape:p-2 rounded-3xl bg-amber-200/50 border-4 border-dashed border-amber-400 ${isWrong ? 'animate-shake' : ''}`}>
                       <BasketIcon className="w-20 h-20 landscape:w-16 landscape:h-16 text-amber-600 opacity-50"/>
                       <div className="absolute inset-0 flex flex-wrap items-start justify-center p-3 landscape:p-2 gap-1.5 landscape:gap-1 overflow-hidden">
                           {[...Array(count)].map((_, i) => (
                               <img key={i} src={nesneUrl(roundData.itemToDrag.imageUrl)} alt="" className="w-9 h-9 landscape:w-7 landscape:h-7 animate-pop-in"/>
                           ))}
                       </div>
                       <div className="absolute bottom-2 right-3 w-14 h-14 landscape:w-12 landscape:h-12 bg-white rounded-full flex items-center justify-center text-3xl landscape:text-2xl font-bold text-lime-800 shadow-lg">
                           {count}
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(DragAndDropCountingScreen);
