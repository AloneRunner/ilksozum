
import React, { useState, useEffect } from 'react';
import { SequencingStoryRound, SequencingStoryItem } from '../types.ts';
import Card from './ui/Card.tsx';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { speak, playEffect } from '../services/speechService.ts';
import SpeakerIcon from './icons/SpeakerIcon.tsx';
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

    useAutoSpeak(localizedQuestion, isAutoSpeakEnabled, roundData.id);

    // Sallanan (yanlış) kart ve aynı adımdaki hata sayısı; 2 hatadan sonra doğru kart parlar (ipucu)
    const [wrongId, setWrongId] = useState<number | string | null>(null);
    const [stepMistakes, setStepMistakes] = useState(0);

    useEffect(() => {
        setShuffledItems([...roundData.items].sort(() => Math.random() - 0.5));
        setUserOrder([]);
        setIsCorrect(null);
        setMistakeMade(false);
        setStepMistakes(0);
        setWrongId(null);
    }, [roundData]);

    // Sayaç verisi (2026-10-27): 54 açılışın yalnız 6'sı bitti. Eskiden sıra en sonda kontrol edilip yanlışta
    // tamamen sıfırlanıyordu. Artık hatasız öğrenme: her dokunuş hemen kontrol edilir, doğru kart yerine oturur,
    // yanlış kart sallanır ve yerinde kalır; sıra hiç bozulmaz.
    const handleItemClick = async (item: SequencingStoryItem) => {
        if (isCorrect !== null || userOrder.length >= roundData.items.length || wrongId !== null) return;
        const expected = roundData.items[userOrder.length];
        if (item.id !== expected.id) {
            setMistakeMade(true);
            setStepMistakes(n => n + 1);
            setWrongId(item.id);
            void playEffect('softincorrect');
            setTimeout(() => setWrongId(null), 700);
            return;
        }
        const placed = [...userOrder, item];
        setUserOrder(placed);
        setShuffledItems(prev => prev.filter(i => i.id !== item.id));
        setStepMistakes(0);
        if (placed.length < roundData.items.length) { speak(item.word); return; }
        // Son kart: önce söz, sonra ton, sonra sonraki tur (üst üste binmesin)
        setIsCorrect(true);
        await Promise.race([speak(item.word), new Promise(r => setTimeout(r, 3000))]);
        await playEffect('correct');
        setTimeout(() => onAdvance(!mistakeMade), 900);
    };
    const nextExpectedId = roundData.items[userOrder.length]?.id;
    
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
                        <div key={index} className={`relative w-20 h-28 sm:w-24 sm:h-32 landscape:w-20 landscape:h-[70px] flex items-center justify-center rounded-xl bg-slate-200 border-2 border-dashed transition-all p-0.5
                            ${index === userOrder.length && isCorrect === null ? 'border-fuchsia-500 ring-4 ring-fuchsia-200 animate-pulse' : 'border-slate-400'}
                            ${isCorrect === true ? 'border-green-500' : ''}
                        `}>
                            {/* Kutu numarası: 1 önce, 2 sonra... */}
                            {!userOrder[index] && <span className="text-4xl landscape:text-2xl font-black text-slate-400">{index + 1}</span>}
                            {userOrder[index] && (
                                <div className="w-full h-full">
                                    <Card imageUrl={userOrder[index].imageUrl} word={userOrder[index].word} isRevealed={isWordLabelVisible} onClick={() => {}} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Seçenek kartları altta - Yatay ekranda küçük ve kompakt */}
                <div className="w-full flex items-center justify-center gap-2 sm:gap-3 landscape:gap-2 min-h-[150px] landscape:min-h-[70px] flex-wrap landscape:overflow-y-auto landscape:flex-1 landscape:px-2 landscape:pb-2">
                    {shuffledItems.map(item => (
                        <div key={item.id} className={`w-24 h-32 sm:w-28 sm:h-36 landscape:w-20 landscape:h-[70px] flex-shrink-0 p-0.5 rounded-xl transition-all
                            ${wrongId === item.id ? 'animate-shake ring-4 ring-rose-300' : ''}
                            ${stepMistakes >= 2 && item.id === nextExpectedId ? 'ring-4 ring-amber-400 animate-pulse' : ''}`}>
                            <Card imageUrl={item.imageUrl} word={item.word} isRevealed={isWordLabelVisible} onClick={() => handleItemClick(item)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SequencingStoryScreen;
