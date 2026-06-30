import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createBelongSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playDrop = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
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

// Categories and Items
const CATEGORIES = [
    {
        emoji: '🍳',
        name: 'Mutfak',
        color: 'from-orange-400 to-red-500',
        items: ['🍴', '🥄', '🍳', '🫖', '🧂', '🍶']
    },
    {
        emoji: '🛁',
        name: 'Banyo',
        color: 'from-blue-400 to-cyan-500',
        items: ['🪥', '🧴', '🧼', '🛁', '🚿', '🧽']
    },
    {
        emoji: '🛏️',
        name: 'Yatak Odası',
        color: 'from-purple-400 to-pink-500',
        items: ['🛏️', '💤', '🧸', '🛋️', '🪞', '👗']
    },
    {
        emoji: '📚',
        name: 'Okul',
        color: 'from-green-400 to-emerald-500',
        items: ['📚', '✏️', '📐', '🎒', '📓', '🖍️']
    },
    {
        emoji: '🏡',
        name: 'Bahçe',
        color: 'from-lime-400 to-green-500',
        items: ['🌻', '🌷', '🪴', '🪨', '🦋', '🐦']
    },
];

interface Item {
    emoji: string;
    categoryIndex: number;
    placed: boolean;
}

const ITEMS_PER_ROUND = 8;

interface WhereBelongsGameScreenProps {
    onBack: () => void;
}

const WhereBelongsGameScreen: React.FC<WhereBelongsGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [placedCount, setPlacedCount] = useState(0);
    const [showFeedback, setShowFeedback] = useState<{ type: 'correct' | 'wrong'; category: number } | null>(null);
    const [categoryCount, setCategoryCount] = useState(3);
    const soundRef = useRef<ReturnType<typeof createBelongSound> | null>(null);

    useEffect(() => {
        soundRef.current = createBelongSound();
    }, []);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const startGame = useCallback((numCategories: number) => {
        setCategoryCount(numCategories);

        // Generate items from selected categories
        const selectedCategories = shuffleArray([...CATEGORIES]).slice(0, numCategories);
        const allItems: Item[] = [];

        selectedCategories.forEach((cat) => {
            const catItems = shuffleArray([...cat.items]).slice(0, Math.ceil(ITEMS_PER_ROUND / numCategories));
            catItems.forEach(emoji => {
                allItems.push({ emoji, categoryIndex: CATEGORIES.indexOf(cat), placed: false });
            });
        });

        setItems(shuffleArray(allItems).slice(0, ITEMS_PER_ROUND));
        setScore(0);
        setMistakes(0);
        setPlacedCount(0);
        setSelectedItem(null);
        setShowFeedback(null);
        setGameState('playing');
    }, []);

    const handleItemClick = useCallback((item: Item) => {
        if (showFeedback || item.placed) return;
        soundRef.current?.playDrop();
        setSelectedItem(item);
    }, [showFeedback]);

    const handleCategoryClick = useCallback((categoryIndex: number) => {
        if (!selectedItem || showFeedback) return;

        const isCorrect = selectedItem.categoryIndex === categoryIndex;

        if (isCorrect) {
            soundRef.current?.playCorrect();
            setShowFeedback({ type: 'correct', category: categoryIndex });
            setScore(s => s + 10);
            setPlacedCount(c => c + 1);

            setItems(prev => prev.map(i =>
                i.emoji === selectedItem.emoji ? { ...i, placed: true } : i
            ));
            setSelectedItem(null);

            setTimeout(() => {
                setShowFeedback(null);

                if (placedCount + 1 >= items.filter(i => !i.placed).length + placedCount) {
                    setGameState('result');
                }
            }, 500);
        } else {
            soundRef.current?.playWrong();
            setShowFeedback({ type: 'wrong', category: categoryIndex });
            setMistakes(m => m + 1);
            setSelectedItem(null);

            setTimeout(() => setShowFeedback(null), 500);
        }
    }, [selectedItem, showFeedback, placedCount, items]);

    const activeCategories = CATEGORIES.filter((_, i) =>
        items.some(item => item.categoryIndex === i)
    );

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🏠</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-red-600 mb-2">
                    Nereye Ait?
                </h1>
                <p className="text-gray-600 mb-2">Her şeyi doğru yerine koy!</p>
                <p className="text-sm text-gray-500 mb-6">
                    Nesneyi seç, sonra doğru odaya yerleştir.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => startGame(2)}
                        className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Kolay (2 oda)
                    </button>
                    <button
                        onClick={() => startGame(3)}
                        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Orta (3 oda)
                    </button>
                    <button
                        onClick={() => startGame(5)}
                        className="w-full bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Zor (5 oda)
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => (
        <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-amber-200 via-orange-100 to-red-100">
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                    <ArrowLeftIcon className="w-5 h-5 text-orange-600" />
                </button>

                <div className="flex gap-2">
                    <div className="bg-green-500 text-white rounded-full px-3 py-1 font-bold text-sm">
                        ✅ {placedCount}
                    </div>
                    <div className="bg-red-500 text-white rounded-full px-3 py-1 font-bold text-sm">
                        ❌ {mistakes}
                    </div>
                </div>

                <div className="bg-amber-500 text-white rounded-full px-3 py-1 font-bold text-sm">
                    ⭐ {score}
                </div>
            </div>

            {/* Instruction */}
            <div className="text-center py-2">
                <p className="text-orange-800 font-semibold">
                    {selectedItem
                        ? `${selectedItem.emoji} nereye ait?`
                        : 'Bir nesne seç!'
                    }
                </p>
            </div>

            {/* Categories (Rooms) */}
            <div className="px-4 py-2">
                <div className={`grid gap-2 ${activeCategories.length <= 3 ? 'grid-cols-3' : 'grid-cols-3'}`}>
                    {activeCategories.map((cat) => (
                        <button
                            key={cat.name}
                            onClick={() => handleCategoryClick(CATEGORIES.indexOf(cat))}
                            disabled={!selectedItem}
                            className={`p-3 rounded-xl flex flex-col items-center shadow-lg transition-all ${selectedItem ? 'hover:scale-105' : 'opacity-80'
                                } bg-gradient-to-br ${cat.color} ${showFeedback?.category === CATEGORIES.indexOf(cat)
                                    ? showFeedback.type === 'correct'
                                        ? 'ring-4 ring-green-400 scale-105'
                                        : 'ring-4 ring-red-400 animate-shake'
                                    : ''
                                }`}
                        >
                            <span className="text-3xl">{cat.emoji}</span>
                            <span className="text-white font-bold text-xs mt-1">{cat.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Items */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="bg-white/70 rounded-3xl p-4 shadow-lg max-w-md w-full">
                    <p className="text-center text-gray-600 text-sm mb-3">Nesneler:</p>
                    <div className="grid grid-cols-4 gap-3">
                        {items.filter(i => !i.placed).map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleItemClick(item)}
                                className={`aspect-square rounded-xl shadow-md flex items-center justify-center text-3xl transition-all ${selectedItem?.emoji === item.emoji
                                    ? 'bg-orange-200 ring-4 ring-orange-400 scale-110'
                                    : 'bg-white hover:bg-gray-50 hover:scale-105'
                                    }`}
                            >
                                {item.emoji}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feedback */}
            {showFeedback && (
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${showFeedback.type === 'correct' ? 'bg-green-500/10' : 'bg-red-500/10'
                    }`}>
                    <div className="text-7xl animate-bounce">
                        {showFeedback.type === 'correct' ? '✅' : '❌'}
                    </div>
                </div>
            )}
        </div>
    );

    const renderResult = () => {
        const total = items.length;
        const accuracy = total > 0 ? Math.round((score / 10 / total) * 100) : 0;
        const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">🏠</div>
                    <h2 className="text-2xl font-black text-orange-600 mb-2">Tebrikler!</h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-4 mb-4 text-white">
                        <div className="flex justify-around">
                            <div>
                                <div className="text-sm opacity-80">Puan</div>
                                <div className="text-2xl font-bold">{score}</div>
                            </div>
                            <div>
                                <div className="text-sm opacity-80">Hata</div>
                                <div className="text-2xl font-bold">{mistakes}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => startGame(categoryCount)}
                            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Tekrar Oyna 🔄
                        </button>
                        <button
                            onClick={() => setGameState('menu')}
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
                    <ArrowLeftIcon className="w-6 h-6 text-orange-600" />
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
                .animate-shake {
                    animation: shake 0.3s ease-in-out;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `}</style>
        </div>
    );
};

export default WhereBelongsGameScreen;
