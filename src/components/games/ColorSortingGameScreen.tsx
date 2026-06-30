import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createSortingSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playDrop = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
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

    const playWin = () => {
        [523, 659, 784, 1047].forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.2);
            }, i * 100);
        });
    };

    return { playDrop, playCorrect, playWrong, playWin };
};

// --- Colors and Items ---
const COLORS = [
    { id: 'red', name: 'Kırmızı', bg: 'bg-red-400', border: 'border-red-500', text: 'text-red-600' },
    { id: 'blue', name: 'Mavi', bg: 'bg-blue-400', border: 'border-blue-500', text: 'text-blue-600' },
    { id: 'yellow', name: 'Sarı', bg: 'bg-yellow-400', border: 'border-yellow-500', text: 'text-yellow-600' },
    { id: 'green', name: 'Yeşil', bg: 'bg-green-400', border: 'border-green-500', text: 'text-green-600' },
];

const ITEMS = {
    red: ['🍎', '🍒', '🍓', '🌹', '❤️', '🎈', '🚗', '🧲'],
    blue: ['💙', '🧢', '🐋', '💎', '🧊', '🦋', '🫐', '🌊'],
    yellow: ['🌻', '🍋', '⭐', '🌟', '🌽', '🍌', '🧀', '🌞'],
    green: ['🥒', '🥬', '🍀', '🥝', '🐸', '🌲', '🥦', '🌿'],
};

interface SortItem {
    id: number;
    emoji: string;
    color: string;
}

interface ColorSortingGameScreenProps {
    onBack: () => void;
}

const ColorSortingGameScreen: React.FC<ColorSortingGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [items, setItems] = useState<SortItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<SortItem | null>(null);
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [sortedCount, setSortedCount] = useState(0);
    const [showFeedback, setShowFeedback] = useState<{ type: 'correct' | 'wrong'; color: string } | null>(null);
    const [difficulty, setDifficulty] = useState(2); // Number of colors (2, 3, or 4)
    const soundRef = useRef<ReturnType<typeof createSortingSound> | null>(null);

    useEffect(() => {
        soundRef.current = createSortingSound();
    }, []);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const startGame = useCallback((colorCount: number) => {
        setDifficulty(colorCount);

        // Get items for selected colors
        const selectedColors = COLORS.slice(0, colorCount);
        const allItems: SortItem[] = [];
        let idCounter = 0;

        selectedColors.forEach(color => {
            const colorItems = shuffleArray([...ITEMS[color.id as keyof typeof ITEMS]]).slice(0, 4);
            colorItems.forEach(emoji => {
                allItems.push({ id: idCounter++, emoji, color: color.id });
            });
        });

        setItems(shuffleArray(allItems));
        setTotalItems(allItems.length);
        setSortedCount(0);
        setScore(0);
        setMistakes(0);
        setSelectedItem(null);
        setShowFeedback(null);
        setGameState('playing');
    }, []);

    const handleItemClick = useCallback((item: SortItem) => {
        if (showFeedback) return;
        soundRef.current?.playDrop();
        setSelectedItem(item);
    }, [showFeedback]);

    const handleBucketClick = useCallback((colorId: string) => {
        if (!selectedItem || showFeedback) return;

        const isCorrect = selectedItem.color === colorId;

        if (isCorrect) {
            soundRef.current?.playCorrect();
            setShowFeedback({ type: 'correct', color: colorId });
            setScore(s => s + 10);
            setSortedCount(c => c + 1);

            // Remove item
            setItems(prev => prev.filter(i => i.id !== selectedItem.id));
            setSelectedItem(null);

            setTimeout(() => {
                setShowFeedback(null);

                // Check if game over
                if (sortedCount + 1 >= totalItems) {
                    soundRef.current?.playWin();
                    setGameState('result');
                }
            }, 500);
        } else {
            soundRef.current?.playWrong();
            setShowFeedback({ type: 'wrong', color: colorId });
            setMistakes(m => m + 1);
            setSelectedItem(null);

            setTimeout(() => {
                setShowFeedback(null);
            }, 500);
        }
    }, [selectedItem, showFeedback, sortedCount, totalItems]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🎨</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 mb-2">
                    Renk Toplama
                </h1>
                <p className="text-gray-600 mb-2">Nesneleri renklerine göre ayır!</p>
                <p className="text-sm text-gray-500 mb-6">
                    Nesneye tıkla, sonra doğru renkli sepete at.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => startGame(2)}
                        className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Kolay (2 Renk) 🟢
                    </button>
                    <button
                        onClick={() => startGame(3)}
                        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Orta (3 Renk) 🟡
                    </button>
                    <button
                        onClick={() => startGame(4)}
                        className="w-full bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Zor (4 Renk) 🔴
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        const activeColors = COLORS.slice(0, difficulty);

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-sky-200 via-pink-100 to-orange-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-pink-600" />
                    </button>

                    <div className="flex gap-2">
                        <div className="bg-emerald-500 text-white rounded-full px-3 py-1 font-bold text-sm">
                            ⭐ {score}
                        </div>
                        <div className="bg-rose-500 text-white rounded-full px-3 py-1 font-bold text-sm">
                            ❌ {mistakes}
                        </div>
                    </div>

                    <div className="bg-pink-500 text-white rounded-full px-3 py-1 font-bold text-sm">
                        {sortedCount}/{totalItems}
                    </div>
                </div>

                {/* Instruction */}
                <div className="text-center py-2">
                    <p className="text-pink-800 font-semibold">
                        {selectedItem
                            ? `${selectedItem.emoji} hangi sepete gider?`
                            : 'Bir nesne seç! 👇'
                        }
                    </p>
                </div>

                {/* Color Buckets */}
                <div className={`flex justify-center gap-2 px-4 py-2`}>
                    {activeColors.map(color => (
                        <button
                            key={color.id}
                            onClick={() => handleBucketClick(color.id)}
                            className={`flex-1 max-w-[100px] aspect-square rounded-2xl shadow-lg flex flex-col items-center justify-center transition-all ${color.bg} border-4 ${color.border} ${selectedItem ? 'hover:scale-110 cursor-pointer' : 'opacity-80'
                                } ${showFeedback?.color === color.id
                                    ? showFeedback.type === 'correct'
                                        ? 'ring-4 ring-green-400 scale-110'
                                        : 'ring-4 ring-red-400 animate-shake'
                                    : ''
                                }`}
                        >
                            <div className="text-3xl">🗑️</div>
                            <div className="text-white font-bold text-xs mt-1 drop-shadow">{color.name}</div>
                        </button>
                    ))}
                </div>

                {/* Items Grid */}
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="bg-white/70 rounded-3xl p-4 shadow-lg max-w-md w-full">
                        <p className="text-center text-gray-600 text-sm mb-3">Nesneler:</p>
                        <div className="grid grid-cols-4 gap-3">
                            {items.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                    className={`aspect-square rounded-xl shadow-md flex items-center justify-center text-3xl transition-all ${selectedItem?.id === item.id
                                            ? 'bg-pink-200 ring-4 ring-pink-400 scale-110'
                                            : 'bg-white hover:bg-gray-50 hover:scale-105'
                                        }`}
                                >
                                    {item.emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feedback Overlay */}
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
    };

    const renderResult = () => {
        const accuracy = totalItems > 0 ? Math.round((score / 10 / totalItems) * 100) : 0;
        const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-400 via-rose-400 to-red-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">🎨</div>
                    <h2 className="text-2xl font-black text-pink-600 mb-2">
                        Tebrikler!
                    </h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-pink-400 to-rose-500 rounded-xl p-4 mb-4 text-white">
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
                            onClick={() => startGame(difficulty)}
                            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Tekrar Oyna 🔄
                        </button>
                        <button
                            onClick={() => setGameState('menu')}
                            className="bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Zorluk Değiştir 📊
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
                    <ArrowLeftIcon className="w-6 h-6 text-pink-600" />
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

export default ColorSortingGameScreen;
