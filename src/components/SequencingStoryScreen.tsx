
import React, { useState, useEffect } from 'react';
import { SequencingStoryRound, SequencingStoryItem } from '../types.ts';
import Card from './ui/Card.tsx';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { speak, playEffect } from '../services/speechService.ts';
import SpeakerIcon from './icons/SpeakerIcon.tsx';
import CheckIcon from './icons/CheckIcon.tsx';
import UndoIcon from './icons/UndoIcon.tsx';
import EyeIcon from './icons/EyeIcon.tsx';
import EyeSlashIcon from './icons/EyeSlashIcon.tsx';
import { useAutoSpeak } from '../hooks/useAutoSpeak.ts';
import { getCurrentLanguage, t } from '../i18n/index.ts';
import { translateQuestion } from '../utils/translate.ts';

interface SequencingStoryScreenProps {
    roundData: SequencingStoryRound;
    onAdvance: (isCorrect: boolean) => void;
    onBack: () => void;
    currentCard: number;
    totalCards: number;
    isAutoSpeakEnabled: boolean;
    isWordLabelVisible: boolean;
    onToggleWordLabel: () => void;
}

const SequencingStoryScreen: React.FC<SequencingStoryScreenProps> = ({
    roundData, onAdvance, onBack, currentCard, totalCards, isAutoSpeakEnabled, isWordLabelVisible, onToggleWordLabel
}) => {
    const [shuffledItems, setShuffledItems] = useState<SequencingStoryItem[]>([]);
    const [userOrder, setUserOrder] = useState<SequencingStoryItem[]>([]);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [mistakeMade, setMistakeMade] = useState(false);
    const currentLang = getCurrentLanguage();
    const localizedQuestion = translateQuestion(roundData.question, currentLang);
    const undoLabelMap: Record<string, string> = {
        tr: 'Geri Al',
        en: 'Undo',
        de: 'Rückgängig',
        fr: 'Annuler',
        nl: 'Ongedaan maken',
        az: 'Geri al'
    };
    const checkLabelMap: Record<string, string> = {
        tr: 'Kontrol Et',
        en: 'Check',
        de: 'Prüfen',
        fr: 'Vérifier',
        nl: 'Controleer',
        az: 'Yoxla'
    };
    const undoLabel = undoLabelMap[currentLang] ?? undoLabelMap.en;
    const checkLabel = checkLabelMap[currentLang] ?? checkLabelMap.en;

    useAutoSpeak(localizedQuestion, isAutoSpeakEnabled, roundData.id);

    useEffect(() => {
        setShuffledItems([...roundData.items].sort(() => Math.random() - 0.5));
        setUserOrder([]);
        setIsCorrect(null);
        setMistakeMade(false);
    }, [roundData]);

    const handleItemClick = (item: SequencingStoryItem) => {
        if (isCorrect !== null || userOrder.length >= roundData.items.length) return;
        setUserOrder(prev => [...prev, item]);
        setShuffledItems(prev => prev.filter(i => i.id !== item.id));
        speak(item.word);
    };

    // Sayaç verisi (2026-10-15): açılan 10 oturumun hiçbiri bitmedi; çocuklar 'Kontrol' düğmesini bulamıyor olabilir.
    // Son kutu doldurulunca sıra kendiliğinden kontrol edilir.
    useEffect(() => {
        if (isCorrect !== null || userOrder.length === 0 || userOrder.length !== roundData.items.length) return;
        const z = setTimeout(() => { void checkOrder(); }, 700);
        return () => clearTimeout(z);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userOrder, isCorrect]);

    const handleUndo = () => {
        if (userOrder.length === 0 || isCorrect !== null) return;
        const lastItem = userOrder[userOrder.length - 1];
        setUserOrder(prev => prev.slice(0, -1));
        setShuffledItems(prev => [...prev, lastItem].sort(() => Math.random() - 0.5));
    };

    const checkOrder = async () => {
        if (userOrder.length !== roundData.items.length) return;

        const isOrderCorrect = userOrder.every((item, index) => item.id === roundData.items[index].id);
        setIsCorrect(isOrderCorrect);

        if (isOrderCorrect) {
            await playEffect('correct');
            setTimeout(() => onAdvance(!mistakeMade), 1200);
        } else {
            setMistakeMade(true);
            await playEffect('incorrect');
            setTimeout(() => {
                setShuffledItems([...roundData.items].sort(() => Math.random() - 0.5));
                setUserOrder([]);
                setIsCorrect(null);
            }, 1500);
        }
    };
    
    return (
        <div className="flex flex-col items-center h-full w-full max-w-5xl mx-auto p-4 landscape:p-2 animate-fade-in overflow-y-auto">
            {/* Compact Header for Landscape */}
            <div className="w-full flex justify-between items-center mb-4 landscape:mb-2 p-2 landscape:p-1 bg-white/50 backdrop-blur-sm rounded-full">
                <button onClick={onBack} className="p-2 landscape:p-1 rounded-full hover:bg-white/80 transition-colors" aria-label={t('app.back', 'Go back')}>
                    <ArrowLeftIcon className="w-8 h-8 landscape:w-6 landscape:h-6 text-fuchsia-700" />
                </button>
                <div className="flex items-center gap-2 landscape:gap-3">
                    <h1 className="text-lg landscape:text-sm font-bold text-fuchsia-800 hidden landscape:block">{localizedQuestion}</h1>
                    <button onClick={() => speak(localizedQuestion)} className="p-2 landscape:p-1 bg-fuchsia-100 rounded-full hover:bg-fuchsia-200 transition-colors" aria-label={t('choice.readQuestion', 'Speak the question')}>
                        <SpeakerIcon className="w-7 h-7 landscape:w-5 landscape:h-5 text-fuchsia-600" />
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <div className="text-lg landscape:text-sm font-bold text-fuchsia-800">{currentCard} / {totalCards}</div>
                    <button onClick={onToggleWordLabel} className="p-2 landscape:p-1 rounded-full hover:bg-white/80 transition-colors" aria-label={isWordLabelVisible ? t('choice.hideLabel', 'Hide labels') : t('choice.showLabel', 'Show labels')}>
                        {isWordLabelVisible ? <EyeSlashIcon className="w-8 h-8 landscape:w-6 landscape:h-6 text-fuchsia-700" /> : <EyeIcon className="w-8 h-8 landscape:w-6 landscape:h-6 text-fuchsia-700" />}
                    </button>
                </div>
            </div>

            {/* Question - Only Portrait */}
            <div className="w-full landscape:hidden bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-center text-fuchsia-800 flex items-center justify-center gap-4">
                    {localizedQuestion}
                    <button onClick={() => speak(localizedQuestion)} className="p-2 bg-fuchsia-100 rounded-full hover:bg-fuchsia-200 transition-colors" aria-label={t('choice.readQuestion', 'Speak the question')}>
                        <SpeakerIcon className="w-7 h-7 text-fuchsia-600" />
                    </button>
                </h1>
            </div>
            
            <div className="w-full flex-grow flex flex-col items-center justify-center gap-4 landscape:gap-2 landscape:min-h-0">
                {/* User Sequence Area - Üstte yatay sıralı boş alanlar */}
                <div className="w-full flex items-center justify-center gap-2 sm:gap-3 landscape:gap-2 p-4 landscape:p-2 rounded-2xl bg-white/60 shadow-inner min-h-[140px] landscape:min-h-[80px]">
                    {roundData.items.map((_, index) => (
                        <div key={index} className={`w-20 h-28 sm:w-24 sm:h-32 landscape:w-20 landscape:h-[70px] flex items-center justify-center rounded-xl bg-slate-200 border-2 border-dashed border-slate-400 transition-all p-0.5
                            ${isCorrect === false ? 'border-red-500 animate-shake' : ''}
                            ${isCorrect === true ? 'border-green-500' : ''}
                        `}>
                            {userOrder[index] && (
                                <div className="w-full h-full">
                                    <Card imageUrl={userOrder[index].imageUrl} word={userOrder[index].word} isRevealed={isWordLabelVisible} onClick={() => {}} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Butonlar ortada */}
                <div className="flex gap-3 landscape:gap-2 flex-shrink-0">
                    <button onClick={handleUndo} disabled={userOrder.length === 0 || isCorrect !== null} className="px-5 py-2 landscape:px-2 landscape:py-1 bg-yellow-400 text-white font-bold rounded-lg shadow-md hover:bg-yellow-500 disabled:opacity-50 flex items-center gap-2 text-sm landscape:text-xs">
                        <UndoIcon className="w-5 h-5 landscape:w-4 landscape:h-4" />
                        <span className="landscape:hidden">{undoLabel}</span>
                    </button>
                    <button onClick={checkOrder} disabled={userOrder.length !== roundData.items.length || isCorrect !== null} className="px-5 py-2 landscape:px-2 landscape:py-1 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 disabled:opacity-50 flex items-center gap-2 text-sm landscape:text-xs">
                        <CheckIcon className="w-5 h-5 landscape:w-4 landscape:h-4" />
                        <span className="landscape:hidden">{checkLabel}</span>
                    </button>
                </div>

                {/* Seçenek kartları altta - Yatay ekranda küçük ve kompakt */}
                <div className="w-full flex items-center justify-center gap-2 sm:gap-3 landscape:gap-2 min-h-[150px] landscape:min-h-[70px] flex-wrap landscape:overflow-y-auto landscape:flex-1 landscape:px-2 landscape:pb-2">
                    {shuffledItems.map(item => (
                        <div key={item.id} className="w-24 h-32 sm:w-28 sm:h-36 landscape:w-20 landscape:h-[70px] flex-shrink-0 p-0.5">
                            <Card imageUrl={item.imageUrl} word={item.word} isRevealed={isWordLabelVisible} onClick={() => handleItemClick(item)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SequencingStoryScreen;
