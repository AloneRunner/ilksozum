import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createOddOneOutSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playSelect = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, audioCtx.currentTime);
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

    return { playSelect, playCorrect, playWrong };
};

// --- Categories and Items ---
const CATEGORIES = {
    animals: { name: 'Hayvanlar', items: ['🐶', '🐱', '🐰', '🐻', '🦊', '🐼', '🦁', '🐯', '🐮', '🐷'] },
    fruits: { name: 'Meyveler', items: ['🍎', '🍊', '🍋', '🍇', '🍓', '🍑', '🍒', '🥝', '🍌', '🍉'] },
    vehicles: { name: 'Taşıtlar', items: ['🚗', '🚕', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🛺', '🚚'] },
    foods: { name: 'Yiyecekler', items: ['🍕', '🍔', '🌭', '🍟', '🥪', '🌮', '🍿', '🥐', '🍖', '🧇'] },
    sports: { name: 'Sporlar', items: ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸', '🥊', '⛳'] },
    nature: { name: 'Doğa', items: ['🌸', '🌺', '🌻', '🌷', '🌹', '💐', '🌼', '🏵️', '🌾', '🌿'] },
    clothes: { name: 'Giysiler', items: ['👕', '👖', '🧥', '👗', '👔', '🧦', '👟', '🥾', '👒', '🎩'] },
    music: { name: 'Müzik', items: ['🎸', '🎹', '🥁', '🎺', '🎷', '🪕', '🎻', '🪗', '🎤', '🎧'] },
};

type CategoryKey = keyof typeof CATEGORIES;

interface Question {
    items: string[];
    oddIndex: number;
    oddCategory: string;
    normalCategory: string;
}

const TOTAL_QUESTIONS = 10;

interface OddOneOutGameScreenProps {
    onBack: () => void;
}

const OddOneOutGameScreen: React.FC<OddOneOutGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null);
    const [difficulty, setDifficulty] = useState(4); // 4, 5, or 6 items
    const soundRef = useRef<ReturnType<typeof createOddOneOutSound> | null>(null);

    useEffect(() => {
        soundRef.current = createOddOneOutSound();
    }, []);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const generateQuestion = useCallback((): Question => {
        const categoryKeys = Object.keys(CATEGORIES) as CategoryKey[];
        const shuffledCategories = shuffleArray(categoryKeys);

        // Pick two different categories
        const mainCategory = shuffledCategories[0];
        const oddCategory = shuffledCategories[1];

        const mainItems = shuffleArray([...CATEGORIES[mainCategory].items]);
        const oddItems = shuffleArray([...CATEGORIES[oddCategory].items]);

        // Create items array with one odd item
        const count = difficulty;
        const items: string[] = mainItems.slice(0, count - 1);
        const oddItem = oddItems[0];

        // Insert odd item at random position
        const oddIndex = Math.floor(Math.random() * count);
        items.splice(oddIndex, 0, oddItem);

        return {
            items,
            oddIndex,
            oddCategory: CATEGORIES[oddCategory].name,
            normalCategory: CATEGORIES[mainCategory].name,
        };
    }, [difficulty]);

    const startGame = useCallback((diff: number) => {
        setDifficulty(diff);
        setQuestionIndex(0);
        setScore(0);
        setSelectedIndex(null);
        setShowResult(null);
        setCurrentQuestion(generateQuestion());
        setGameState('playing');
    }, [generateQuestion]);

    const handleSelect = useCallback((index: number) => {
        if (showResult || !currentQuestion) return;

        soundRef.current?.playSelect();
        setSelectedIndex(index);

        const isCorrect = index === currentQuestion.oddIndex;

        setTimeout(() => {
            if (isCorrect) {
                soundRef.current?.playCorrect();
                setScore(s => s + 1);
                setShowResult('correct');
            } else {
                soundRef.current?.playWrong();
                setShowResult('wrong');
            }

            // Next question
            setTimeout(() => {
                if (questionIndex < TOTAL_QUESTIONS - 1) {
                    setQuestionIndex(i => i + 1);
                    setCurrentQuestion(generateQuestion());
                    setSelectedIndex(null);
                    setShowResult(null);
                } else {
                    setGameState('result');
                }
            }, 1500);
        }, 300);
    }, [currentQuestion, questionIndex, showResult, generateQuestion]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🎪</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 mb-2">
                    Kim Farklı?
                </h1>
                <p className="text-gray-600 mb-6">Diğerlerinden farklı olanı bul!</p>

                <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-3">Zorluk Seç:</p>
                    <div className="flex justify-center gap-3">
                        {[
                            { count: 4, label: 'Kolay', color: 'from-green-400 to-emerald-500' },
                            { count: 5, label: 'Orta', color: 'from-amber-400 to-orange-500' },
                            { count: 6, label: 'Zor', color: 'from-red-400 to-rose-500' },
                        ].map(({ count, label, color }) => (
                            <button
                                key={count}
                                onClick={() => startGame(count)}
                                className={`px-5 py-3 rounded-xl shadow-lg font-bold text-white bg-gradient-to-r ${color} hover:scale-105 transition-transform`}
                            >
                                <div>{label}</div>
                                <div className="text-xs opacity-80">{count} şık</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        if (!currentQuestion) return null;

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-cyan-200 via-teal-100 to-emerald-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-teal-600" />
                    </button>

                    <div className="bg-teal-500 text-white rounded-full px-4 py-1 font-bold">
                        {questionIndex + 1} / {TOTAL_QUESTIONS}
                    </div>

                    <div className="bg-emerald-500 text-white rounded-full px-4 py-1 font-bold">
                        ⭐ {score}
                    </div>
                </div>

                {/* Question */}
                <div className="text-center py-6">
                    <h2 className="text-xl sm:text-2xl font-black text-teal-800">
                        Hangisi farklı? 🤔
                    </h2>
                    {showResult && (
                        <p className="text-sm text-gray-600 mt-2">
                            {showResult === 'correct'
                                ? `✅ Doğru! O bir ${currentQuestion.oddCategory}`
                                : `❌ Hayır, farklı olan ${currentQuestion.oddCategory} kategorisinden`
                            }
                        </p>
                    )}
                </div>

                {/* Items Grid */}
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className={`grid gap-4 ${difficulty <= 4 ? 'grid-cols-2' : difficulty === 5 ? 'grid-cols-3' : 'grid-cols-3'
                        }`}>
                        {currentQuestion.items.map((item, index) => {
                            const isSelected = selectedIndex === index;
                            const isOdd = index === currentQuestion.oddIndex;
                            const showAsCorrect = showResult && isOdd;
                            const showAsWrong = showResult === 'wrong' && isSelected && !isOdd;

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSelect(index)}
                                    disabled={showResult !== null}
                                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl shadow-lg flex items-center justify-center text-4xl sm:text-5xl transition-all ${showAsCorrect
                                            ? 'bg-green-100 border-4 border-green-500 scale-110'
                                            : showAsWrong
                                                ? 'bg-red-100 border-4 border-red-400'
                                                : isSelected
                                                    ? 'bg-cyan-100 border-4 border-cyan-500 scale-105'
                                                    : 'bg-white border-2 border-gray-200 hover:border-cyan-400 hover:scale-105'
                                        }`}
                                >
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderResult = () => {
        const percent = Math.round((score / TOTAL_QUESTIONS) * 100);
        const stars = percent >= 90 ? 3 : percent >= 60 ? 2 : 1;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">{percent >= 80 ? '🏆' : percent >= 50 ? '🎉' : '💪'}</div>
                    <h2 className="text-2xl font-black text-teal-600 mb-2">
                        {percent >= 80 ? 'Harika!' : percent >= 50 ? 'İyi!' : 'Tekrar Dene!'}
                    </h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-teal-400 to-emerald-500 rounded-xl p-4 mb-4 text-white">
                        <div className="text-sm opacity-80">Skor</div>
                        <div className="text-3xl font-black">{score} / {TOTAL_QUESTIONS}</div>
                        <div className="text-sm opacity-80">%{percent} başarı</div>
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
                            className="bg-gradient-to-r from-cyan-400 to-teal-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
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
                    <ArrowLeftIcon className="w-6 h-6 text-teal-600" />
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

export default OddOneOutGameScreen;
