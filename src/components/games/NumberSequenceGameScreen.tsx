import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createSequenceSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playDrop = (index: number) => {
        const freq = 300 + index * 50;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
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

    return { playDrop, playCorrect, playWrong };
};

interface NumberItem {
    value: number;
    placed: boolean;
}

const TOTAL_ROUNDS = 5;

interface NumberSequenceGameScreenProps {
    onBack: () => void;
}

const NumberSequenceGameScreen: React.FC<NumberSequenceGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [numbers, setNumbers] = useState<NumberItem[]>([]);
    const [placedNumbers, setPlacedNumbers] = useState<number[]>([]);
    const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
    const [round, setRound] = useState(0);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [mode, setMode] = useState<'ascending' | 'descending'>('ascending');
    const [count, setCount] = useState(5);
    const soundRef = useRef<ReturnType<typeof createSequenceSound> | null>(null);

    useEffect(() => {
        soundRef.current = createSequenceSound();
    }, []);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const startRound = useCallback((roundNum: number) => {
        // Generate random starting point
        const maxStart = count <= 5 ? 10 : count <= 7 ? 7 : 5;
        const start = Math.floor(Math.random() * maxStart) + 1;

        const nums: NumberItem[] = [];
        for (let i = 0; i < count; i++) {
            nums.push({ value: start + i, placed: false });
        }

        setNumbers(shuffleArray(nums));
        setPlacedNumbers([]);
        setSelectedNumber(null);
        setShowFeedback(null);
        setRound(roundNum);
    }, [count]);

    const startGame = useCallback((numCount: number, orderMode: 'ascending' | 'descending') => {
        setCount(numCount);
        setMode(orderMode);
        setScore(0);
        setGameState('playing');
        startRound(1);
    }, [startRound]);

    const handleNumberClick = useCallback((num: number) => {
        if (showFeedback) return;
        if (placedNumbers.includes(num)) return;

        soundRef.current?.playDrop(placedNumbers.length);
        setSelectedNumber(num);
    }, [showFeedback, placedNumbers]);

    const handleSlotClick = useCallback((slotIndex: number) => {
        if (selectedNumber === null || showFeedback) return;
        if (placedNumbers.length !== slotIndex) return;

        // Get sorted numbers
        const sortedValues = [...numbers].map(n => n.value).sort((a, b) =>
            mode === 'ascending' ? a - b : b - a
        );

        const expectedValue = sortedValues[slotIndex];
        const isCorrect = selectedNumber === expectedValue;

        if (isCorrect) {
            soundRef.current?.playCorrect();
            setShowFeedback('correct');
            setPlacedNumbers(prev => [...prev, selectedNumber]);
            setNumbers(prev => prev.map(n =>
                n.value === selectedNumber ? { ...n, placed: true } : n
            ));
            setSelectedNumber(null);

            setTimeout(() => {
                setShowFeedback(null);

                if (placedNumbers.length + 1 === count) {
                    setScore(s => s + 1);

                    if (round >= TOTAL_ROUNDS) {
                        setGameState('result');
                    } else {
                        startRound(round + 1);
                    }
                }
            }, 500);
        } else {
            soundRef.current?.playWrong();
            setShowFeedback('wrong');
            setSelectedNumber(null);

            setTimeout(() => setShowFeedback(null), 500);
        }
    }, [selectedNumber, showFeedback, placedNumbers, numbers, mode, count, round, startRound]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🔢</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-indigo-600 mb-2">
                    Sayı Sırala
                </h1>
                <p className="text-gray-600 mb-6">Sayıları doğru sıraya diz!</p>

                <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Küçükten Büyüğe (1,2,3...):</p>
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => startGame(5, 'ascending')}
                            className="px-4 py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            5 sayı
                        </button>
                        <button
                            onClick={() => startGame(7, 'ascending')}
                            className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            7 sayı
                        </button>
                        <button
                            onClick={() => startGame(10, 'ascending')}
                            className="px-4 py-3 rounded-xl bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            10 sayı
                        </button>
                    </div>
                </div>

                <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Büyükten Küçüğe (10,9,8...):</p>
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => startGame(5, 'descending')}
                            className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-400 to-fuchsia-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            5 sayı
                        </button>
                        <button
                            onClick={() => startGame(7, 'descending')}
                            className="px-4 py-3 rounded-xl bg-gradient-to-r from-pink-400 to-rose-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            7 sayı
                        </button>
                        <button
                            onClick={() => startGame(10, 'descending')}
                            className="px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-400 to-violet-500 text-white font-bold shadow-lg hover:scale-105 transition-transform"
                        >
                            10 sayı
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        const modeText = mode === 'ascending' ? 'Küçükten Büyüğe' : 'Büyükten Küçüğe';

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-cyan-200 via-blue-100 to-indigo-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-indigo-600" />
                    </button>

                    <div className="text-center">
                        <div className="font-bold text-indigo-700">{modeText}</div>
                        <div className="text-xs text-gray-500">{round}/{TOTAL_ROUNDS}</div>
                    </div>

                    <div className="bg-indigo-500 text-white rounded-full px-4 py-1 font-bold">
                        ⭐ {score}
                    </div>
                </div>

                {/* Target Slots */}
                <div className="bg-white/60 rounded-2xl mx-4 mt-4 p-4 shadow-lg">
                    <p className="text-center text-gray-600 text-sm mb-3">Sıraya yerleştir:</p>
                    <div className="flex justify-center gap-2 flex-wrap">
                        {Array.from({ length: count }).map((_, i) => {
                            const placed = placedNumbers[i];
                            const isNextSlot = placedNumbers.length === i;

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleSlotClick(i)}
                                    disabled={!isNextSlot || selectedNumber === null}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl transition-all ${placed !== undefined
                                            ? 'bg-green-400 text-white'
                                            : isNextSlot && selectedNumber !== null
                                                ? 'bg-indigo-100 border-2 border-indigo-400 border-dashed hover:bg-indigo-200'
                                                : 'bg-gray-100 border-2 border-gray-300 border-dashed'
                                        }`}
                                >
                                    {placed !== undefined ? placed : '?'}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex justify-between mt-2 px-2 text-xs text-gray-500">
                        <span>{mode === 'ascending' ? '← Küçük' : '← Büyük'}</span>
                        <span>{mode === 'ascending' ? 'Büyük →' : 'Küçük →'}</span>
                    </div>
                </div>

                {/* Available Numbers */}
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="bg-white/70 rounded-3xl p-6 shadow-lg">
                        <p className="text-center text-gray-600 text-sm mb-4">Sayılar:</p>
                        <div className="flex justify-center gap-3 flex-wrap">
                            {numbers.filter(n => !n.placed).map(num => (
                                <button
                                    key={num.value}
                                    onClick={() => handleNumberClick(num.value)}
                                    className={`w-14 h-14 rounded-xl font-black text-2xl transition-all ${selectedNumber === num.value
                                            ? 'bg-indigo-500 text-white ring-4 ring-indigo-300 scale-110'
                                            : 'bg-white hover:bg-gray-50 hover:scale-105 text-indigo-700'
                                        } shadow-md`}
                                >
                                    {num.value}
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
        const percent = Math.round((score / TOTAL_ROUNDS) * 100);
        const stars = percent >= 90 ? 3 : percent >= 60 ? 2 : 1;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-400 via-blue-400 to-indigo-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">{percent >= 80 ? '🏆' : '🎉'}</div>
                    <h2 className="text-2xl font-black text-indigo-600 mb-2">Tebrikler!</h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-xl p-4 mb-4 text-white">
                        <div className="text-sm opacity-80">Skor</div>
                        <div className="text-3xl font-black">{score} / {TOTAL_ROUNDS}</div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => startGame(count, mode)}
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
                    <ArrowLeftIcon className="w-6 h-6 text-indigo-600" />
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

export default NumberSequenceGameScreen;
