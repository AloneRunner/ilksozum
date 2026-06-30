import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createOrderSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playDrop = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(350, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    };

    const playCorrect = () => {
        [523, 659, 784].forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.12);
            }, i * 60);
        });
    };

    const playWrong = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    };

    return { playDrop, playCorrect, playWrong };
};

// --- Item Sets (emoji with different sizes) ---
const ITEM_SETS = [
    { emoji: '🐻', name: 'Ayılar', sizes: [0.6, 0.8, 1.0, 1.2, 1.4] },
    { emoji: '🌸', name: 'Çiçekler', sizes: [0.5, 0.7, 0.9, 1.1, 1.3] },
    { emoji: '⭐', name: 'Yıldızlar', sizes: [0.5, 0.75, 1.0, 1.25, 1.5] },
    { emoji: '🍎', name: 'Elmalar', sizes: [0.6, 0.8, 1.0, 1.2, 1.4] },
    { emoji: '🏠', name: 'Evler', sizes: [0.55, 0.75, 0.95, 1.15, 1.35] },
    { emoji: '🚗', name: 'Arabalar', sizes: [0.5, 0.7, 0.9, 1.1, 1.3] },
    { emoji: '🎈', name: 'Balonlar', sizes: [0.6, 0.8, 1.0, 1.2, 1.4] },
    { emoji: '🐶', name: 'Köpekler', sizes: [0.55, 0.75, 0.95, 1.15, 1.35] },
];

interface SizeItem {
    id: number;
    emoji: string;
    size: number;
    sizeOrder: number; // 0 = smallest, 4 = largest
}

interface SizeOrderingGameScreenProps {
    onBack: () => void;
}

const SizeOrderingGameScreen: React.FC<SizeOrderingGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [items, setItems] = useState<SizeItem[]>([]);
    const [orderedItems, setOrderedItems] = useState<SizeItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<SizeItem | null>(null);
    const [currentSetIndex, setCurrentSetIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [totalRounds] = useState(5);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [mode, setMode] = useState<'small-to-large' | 'large-to-small'>('small-to-large');
    const [itemCount, setItemCount] = useState(3);
    const soundRef = useRef<ReturnType<typeof createOrderSound> | null>(null);

    useEffect(() => {
        soundRef.current = createOrderSound();
    }, []);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const startRoundWithCount = useCallback((roundNum: number, count: number) => {
        const setIndex = Math.floor(Math.random() * ITEM_SETS.length);
        const set = ITEM_SETS[setIndex];

        // Select random sizes based on count
        const selectedSizes = shuffleArray([...set.sizes]).slice(0, count);
        const sortedSizes = [...selectedSizes].sort((a, b) => a - b);

        const newItems: SizeItem[] = selectedSizes.map((size, i) => ({
            id: i,
            emoji: set.emoji,
            size,
            sizeOrder: sortedSizes.indexOf(size),
        }));

        setCurrentSetIndex(setIndex);
        setItems(shuffleArray(newItems));
        setOrderedItems([]);
        setSelectedItem(null);
        setShowFeedback(null);
        setRound(roundNum);
    }, []);

    const startRound = useCallback((roundNum: number) => {
        startRoundWithCount(roundNum, itemCount);
    }, [itemCount, startRoundWithCount]);

    const startGame = useCallback((count: number, orderMode: 'small-to-large' | 'large-to-small') => {
        setItemCount(count);
        setMode(orderMode);
        setScore(0);
        setGameState('playing');
        // Pass count directly since state update is async
        startRoundWithCount(1, count);
    }, []);

    const handleItemClick = useCallback((item: SizeItem) => {
        if (showFeedback) return;
        if (orderedItems.find(i => i.id === item.id)) return;

        soundRef.current?.playDrop();
        setSelectedItem(item);
    }, [showFeedback, orderedItems]);

    const handleSlotClick = useCallback((slotIndex: number) => {
        if (!selectedItem || showFeedback) return;
        if (orderedItems.length !== slotIndex) return; // Must fill in order

        // Check if correct order
        const expectedOrder = mode === 'small-to-large'
            ? slotIndex
            : (itemCount - 1 - slotIndex);

        const isCorrect = selectedItem.sizeOrder === expectedOrder;

        if (isCorrect) {
            soundRef.current?.playCorrect();
            setShowFeedback('correct');
            setOrderedItems(prev => [...prev, selectedItem]);
            setSelectedItem(null);

            setTimeout(() => {
                setShowFeedback(null);

                // Check if round complete
                if (orderedItems.length + 1 === itemCount) {
                    setScore(s => s + 1);

                    if (round >= totalRounds) {
                        setGameState('result');
                    } else {
                        startRound(round + 1);
                    }
                }
            }, 500);
        } else {
            soundRef.current?.playWrong();
            setShowFeedback('wrong');
            setSelectedItem(null);

            setTimeout(() => {
                setShowFeedback(null);
            }, 500);
        }
    }, [selectedItem, showFeedback, orderedItems, mode, itemCount, round, totalRounds, startRound]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-lime-400 via-green-400 to-emerald-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">📏</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-lime-600 to-emerald-600 mb-2">
                    Boyut Sıralama
                </h1>
                <p className="text-gray-600 mb-6">Nesneleri boyutlarına göre sırala!</p>

                <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Küçükten Büyüğe:</p>
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => startGame(3, 'small-to-large')}
                            className="px-5 py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            3 nesne
                        </button>
                        <button
                            onClick={() => startGame(4, 'small-to-large')}
                            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            4 nesne
                        </button>
                        <button
                            onClick={() => startGame(5, 'small-to-large')}
                            className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            5 nesne
                        </button>
                    </div>
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Büyükten Küçüğe:</p>
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => startGame(3, 'large-to-small')}
                            className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            3 nesne
                        </button>
                        <button
                            onClick={() => startGame(4, 'large-to-small')}
                            className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-400 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            4 nesne
                        </button>
                        <button
                            onClick={() => startGame(5, 'large-to-small')}
                            className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            5 nesne
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        const set = ITEM_SETS[currentSetIndex];
        const modeText = mode === 'small-to-large' ? 'Küçükten Büyüğe' : 'Büyükten Küçüğe';

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-lime-200 via-green-100 to-emerald-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-emerald-600" />
                    </button>

                    <div className="text-center">
                        <div className="font-bold text-emerald-700">{modeText}</div>
                        <div className="text-xs text-gray-500">{set.name}</div>
                    </div>

                    <div className="flex gap-2">
                        <div className="bg-emerald-500 text-white rounded-full px-3 py-1 font-bold text-sm">
                            {round}/{totalRounds}
                        </div>
                        <div className="bg-amber-500 text-white rounded-full px-3 py-1 font-bold text-sm">
                            ⭐ {score}
                        </div>
                    </div>
                </div>

                {/* Instruction */}
                <div className="text-center py-3">
                    <p className="text-emerald-800 font-semibold">
                        {selectedItem
                            ? 'Doğru sıraya yerleştir!'
                            : 'Sıradaki nesneyi seç!'
                        }
                    </p>
                </div>

                {/* Target Slots */}
                <div className="bg-white/60 rounded-2xl mx-4 p-4 shadow-lg mb-4">
                    <div className="flex justify-center gap-3">
                        {Array.from({ length: itemCount }).map((_, i) => {
                            const placed = orderedItems[i];
                            const isNextSlot = orderedItems.length === i;

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleSlotClick(i)}
                                    disabled={!isNextSlot || !selectedItem}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center transition-all ${placed
                                        ? 'bg-green-100 border-2 border-green-400'
                                        : isNextSlot && selectedItem
                                            ? 'bg-emerald-100 border-2 border-emerald-400 border-dashed hover:bg-emerald-200'
                                            : 'bg-gray-100 border-2 border-gray-300 border-dashed'
                                        }`}
                                >
                                    {placed ? (
                                        <span style={{ fontSize: `${placed.size * 2.5}rem` }}>
                                            {placed.emoji}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 font-bold">{i + 1}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex justify-between mt-2 px-2 text-xs text-gray-500">
                        <span>{mode === 'small-to-large' ? '← Küçük' : '← Büyük'}</span>
                        <span>{mode === 'small-to-large' ? 'Büyük →' : 'Küçük →'}</span>
                    </div>
                </div>

                {/* Available Items */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-white/70 rounded-3xl p-6 shadow-lg">
                        <p className="text-center text-gray-600 text-sm mb-4">Nesneler:</p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {items.filter(item => !orderedItems.find(o => o.id === item.id)).map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                    className={`p-3 rounded-xl transition-all ${selectedItem?.id === item.id
                                        ? 'bg-emerald-200 ring-4 ring-emerald-400 scale-110'
                                        : 'bg-white hover:bg-gray-50 hover:scale-105'
                                        } shadow-md`}
                                >
                                    <span style={{ fontSize: `${item.size * 3}rem` }}>
                                        {item.emoji}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feedback */}
                {showFeedback && (
                    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${showFeedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                        <div className="text-7xl animate-bounce">
                            {showFeedback === 'correct' ? '✅' : '❌'}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderResult = () => {
        const percent = Math.round((score / totalRounds) * 100);
        const stars = percent >= 90 ? 3 : percent >= 60 ? 2 : 1;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lime-400 via-green-400 to-emerald-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">{percent >= 80 ? '🏆' : percent >= 50 ? '🎉' : '💪'}</div>
                    <h2 className="text-2xl font-black text-emerald-600 mb-2">
                        {percent >= 80 ? 'Harika!' : percent >= 50 ? 'İyi!' : 'Tekrar Dene!'}
                    </h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-lime-400 to-emerald-500 rounded-xl p-4 mb-4 text-white">
                        <div className="text-sm opacity-80">Skor</div>
                        <div className="text-3xl font-black">{score} / {totalRounds}</div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => startGame(itemCount, mode)}
                            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Tekrar Oyna 🔄
                        </button>
                        <button
                            onClick={() => setGameState('menu')}
                            className="bg-gradient-to-r from-lime-400 to-green-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Mod Değiştir 📊
                        </button>
                        <button
                            onClick={onBack}
                            className="text-gray-500 font-medium hover:text-gray-700"
                        >
                            Menüye Dön
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-full h-full overflow-hidden">
            {gameState === 'menu' && (
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 z-50 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-emerald-600" />
                </button>
            )}

            {gameState === 'menu' && renderMenu()}
            {gameState === 'playing' && renderPlaying()}
            {gameState === 'result' && renderResult()}

            <style>{`
                .animate-scale-in {
                    animation: scaleIn 0.3s ease-out;
                }
                @keyframes scaleIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default SizeOrderingGameScreen;
