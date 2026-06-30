import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createRoutineSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playDrop = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1);
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
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.15);
            }, i * 80);
        });
    };

    const playWrong = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
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

// --- Routine Sequences ---
const ROUTINE_SEQUENCES = [
    {
        title: 'Sabah Rutini',
        icon: '🌅',
        items: [
            { emoji: '😴', text: 'Uyan' },
            { emoji: '🛏️', text: 'Yatağı topla' },
            { emoji: '🚿', text: 'Duş al' },
            { emoji: '👕', text: 'Giyin' },
            { emoji: '🍳', text: 'Kahvaltı yap' },
        ]
    },
    {
        title: 'Okula Hazırlık',
        icon: '🎒',
        items: [
            { emoji: '📚', text: 'Çantayı hazırla' },
            { emoji: '👟', text: 'Ayakkabı giy' },
            { emoji: '🧥', text: 'Mont giy' },
            { emoji: '👋', text: 'Ailene veda et' },
            { emoji: '🚌', text: 'Okula git' },
        ]
    },
    {
        title: 'Yemek Zamanı',
        icon: '🍽️',
        items: [
            { emoji: '🧼', text: 'Ellerini yıka' },
            { emoji: '🪑', text: 'Sofraya otur' },
            { emoji: '🍝', text: 'Yemeğini ye' },
            { emoji: '💧', text: 'Su iç' },
            { emoji: '🧹', text: 'Masayı temizle' },
        ]
    },
    {
        title: 'Akşam Rutini',
        icon: '🌙',
        items: [
            { emoji: '📺', text: 'Biraz dinlen' },
            { emoji: '🛁', text: 'Banyo yap' },
            { emoji: '👔', text: 'Pijama giy' },
            { emoji: '🦷', text: 'Dişlerini fırçala' },
            { emoji: '📖', text: 'Kitap oku' },
        ]
    },
    {
        title: 'Oyun Parkı',
        icon: '🎡',
        items: [
            { emoji: '🚶', text: 'Parka yürü' },
            { emoji: '🎠', text: 'Oyun alanına git' },
            { emoji: '⛹️', text: 'Oyna' },
            { emoji: '🧃', text: 'Mola ver' },
            { emoji: '🏠', text: 'Eve dön' },
        ]
    },
    {
        title: 'Doğum Günü Partisi',
        icon: '🎂',
        items: [
            { emoji: '🎁', text: 'Hediye al' },
            { emoji: '🏠', text: 'Partiye git' },
            { emoji: '🎈', text: 'Oyna eğlen' },
            { emoji: '🎂', text: 'Pasta ye' },
            { emoji: '👋', text: 'Teşekkür et' },
        ]
    },
];

interface RoutineItem {
    emoji: string;
    text: string;
    originalIndex: number;
}

interface DailyRoutineGameScreenProps {
    onBack: () => void;
}

const DailyRoutineGameScreen: React.FC<DailyRoutineGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [currentSequence, setCurrentSequence] = useState(0);
    const [shuffledItems, setShuffledItems] = useState<RoutineItem[]>([]);
    const [placedItems, setPlacedItems] = useState<(RoutineItem | null)[]>([]);
    const [selectedItem, setSelectedItem] = useState<RoutineItem | null>(null);
    const [score, setScore] = useState(0);
    const [totalRounds, setTotalRounds] = useState(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
    const soundRef = useRef<ReturnType<typeof createRoutineSound> | null>(null);

    useEffect(() => {
        soundRef.current = createRoutineSound();
    }, []);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const startRound = useCallback((seqIndex: number) => {
        const sequence = ROUTINE_SEQUENCES[seqIndex];
        const itemsWithIndex = sequence.items.map((item, idx) => ({
            ...item,
            originalIndex: idx,
        }));

        setCurrentSequence(seqIndex);
        setShuffledItems(shuffleArray(itemsWithIndex));
        setPlacedItems(Array(sequence.items.length).fill(null));
        setSelectedItem(null);
        setShowFeedback(null);
        setGameState('playing');
    }, []);

    const startGame = useCallback(() => {
        setScore(0);
        setTotalRounds(ROUTINE_SEQUENCES.length);
        startRound(0);
    }, [startRound]);

    const handleItemClick = useCallback((item: RoutineItem) => {
        if (showFeedback) return;
        soundRef.current?.playDrop();
        setSelectedItem(item);
    }, [showFeedback]);

    const handleSlotClick = useCallback((slotIndex: number) => {
        if (!selectedItem || showFeedback) return;
        if (placedItems[slotIndex]) return; // Slot occupied

        // Check if correct placement
        const isCorrect = selectedItem.originalIndex === slotIndex;

        if (isCorrect) {
            soundRef.current?.playCorrect();
            setShowFeedback('correct');

            // Place item
            const newPlaced = [...placedItems];
            newPlaced[slotIndex] = selectedItem;
            setPlacedItems(newPlaced);

            // Remove from shuffled
            setShuffledItems(prev => prev.filter(i => i.originalIndex !== selectedItem.originalIndex));
            setSelectedItem(null);

            setTimeout(() => {
                setShowFeedback(null);

                // Check if round complete
                if (newPlaced.every(p => p !== null)) {
                    setScore(s => s + 1);

                    // Next round or end
                    if (currentSequence < ROUTINE_SEQUENCES.length - 1) {
                        startRound(currentSequence + 1);
                    } else {
                        soundRef.current?.playWin();
                        setGameState('result');
                    }
                }
            }, 800);
        } else {
            soundRef.current?.playWrong();
            setShowFeedback('wrong');
            setSelectedItem(null);

            setTimeout(() => {
                setShowFeedback(null);
            }, 500);
        }
    }, [selectedItem, placedItems, showFeedback, currentSequence, startRound]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">📋</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-2">
                    Sıralı Ol!
                </h1>
                <p className="text-gray-600 mb-2">Günlük aktiviteleri doğru sıraya koy!</p>
                <p className="text-sm text-gray-500 mb-6">
                    Önce aktiviteye tıkla, sonra doğru sıraya yerleştir.
                </p>

                <button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-violet-400 to-fuchsia-500 text-white font-bold text-xl px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                    Başla! 🎯
                </button>

                <div className="mt-4 text-sm text-gray-500">
                    {ROUTINE_SEQUENCES.length} farklı rutin
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        const sequence = ROUTINE_SEQUENCES[currentSequence];

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-violet-200 via-purple-100 to-fuchsia-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-violet-600" />
                    </button>

                    <div className="text-center">
                        <div className="text-xl">{sequence.icon}</div>
                        <div className="font-bold text-violet-700 text-sm">{sequence.title}</div>
                    </div>

                    <div className="bg-fuchsia-500 text-white rounded-full px-3 py-1 font-bold">
                        {currentSequence + 1}/{ROUTINE_SEQUENCES.length}
                    </div>
                </div>

                {/* Instruction */}
                <div className="text-center py-2 px-4">
                    <p className="text-violet-800 font-semibold">
                        {selectedItem
                            ? `"${selectedItem.text}" için doğru sırayı seç!`
                            : 'Aşağıdan bir aktivite seç 👇'
                        }
                    </p>
                </div>

                {/* Slots (Target) */}
                <div className="flex-1 flex flex-col justify-center px-4">
                    <div className="bg-white/70 rounded-2xl p-3 shadow-lg mb-4">
                        <p className="text-center text-sm text-gray-600 mb-2">Doğru sıra:</p>
                        <div className="space-y-2">
                            {placedItems.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSlotClick(idx)}
                                    disabled={!!item}
                                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${item
                                            ? 'bg-green-100 border-2 border-green-400'
                                            : selectedItem
                                                ? 'bg-violet-100 border-2 border-violet-400 border-dashed hover:bg-violet-200'
                                                : 'bg-gray-100 border-2 border-gray-300 border-dashed'
                                        }`}
                                >
                                    <div className="w-8 h-8 rounded-full bg-violet-500 text-white flex items-center justify-center font-bold">
                                        {idx + 1}
                                    </div>
                                    {item ? (
                                        <>
                                            <span className="text-2xl">{item.emoji}</span>
                                            <span className="font-medium text-gray-800">{item.text}</span>
                                        </>
                                    ) : (
                                        <span className="text-gray-400 text-sm">Buraya yerleştir...</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Items (Source) */}
                <div className="bg-white/80 rounded-t-3xl shadow-lg p-4">
                    <p className="text-center text-sm text-gray-600 mb-2">Aktiviteler:</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {shuffledItems.map((item) => (
                            <button
                                key={item.originalIndex}
                                onClick={() => handleItemClick(item)}
                                className={`px-4 py-3 rounded-xl shadow-md flex items-center gap-2 transition-all ${selectedItem?.originalIndex === item.originalIndex
                                        ? 'bg-violet-500 text-white scale-105 ring-4 ring-violet-300'
                                        : 'bg-white hover:bg-violet-50 text-gray-800'
                                    }`}
                            >
                                <span className="text-2xl">{item.emoji}</span>
                                <span className="font-medium text-sm">{item.text}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feedback overlay */}
                {showFeedback && (
                    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${showFeedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'
                        }`}>
                        <div className="text-8xl animate-bounce">
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
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">🏆</div>
                    <h2 className="text-2xl font-black text-violet-600 mb-2">
                        Tebrikler!
                    </h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-violet-400 to-fuchsia-500 rounded-xl p-4 mb-4 text-white">
                        <div className="text-sm opacity-80">Skor</div>
                        <div className="text-3xl font-black">{score} / {totalRounds}</div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={startGame}
                            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Tekrar Oyna 🔄
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
                    <ArrowLeftIcon className="w-6 h-6 text-violet-600" />
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

export default DailyRoutineGameScreen;
