import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createCountingSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playCount = (number: number) => {
        const freq = 300 + number * 50;
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

    return { playCount, playCorrect, playWrong };
};

// --- Object Categories ---
const OBJECT_SETS = [
    { category: 'Meyveler', items: ['🍎', '🍊', '🍋', '🍇', '🍓', '🍌', '🍉', '🍒'] },
    { category: 'Hayvanlar', items: ['🐶', '🐱', '🐰', '🐻', '🦊', '🐷', '🐸', '🦁'] },
    { category: 'Taşıtlar', items: ['🚗', '🚌', '✈️', '🚂', '🚁', '⛵', '🚲', '🚀'] },
    { category: 'Yiyecekler', items: ['🍕', '🍔', '🌭', '🍟', '🍦', '🧁', '🍪', '🍩'] },
    { category: 'Doğa', items: ['🌸', '🌻', '🌲', '⭐', '🌙', '☀️', '🌈', '❄️'] },
];

interface Question {
    emoji: string;
    count: number;
    options: number[];
    positions: { x: number; y: number; rotation: number }[];
}

const TOTAL_QUESTIONS = 10;

interface CountingGameScreenProps {
    onBack: () => void;
}

const CountingGameScreen: React.FC<CountingGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [question, setQuestion] = useState<Question | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [countedItems, setCountedItems] = useState<number[]>([]);
    const soundRef = useRef<ReturnType<typeof createCountingSound> | null>(null);

    useEffect(() => {
        soundRef.current = createCountingSound();
    }, []);

    const getMaxCount = () => {
        switch (difficulty) {
            case 'easy': return 5;
            case 'medium': return 10;
            case 'hard': return 15;
        }
    };

    const generateQuestion = useCallback((): Question => {
        const maxCount = getMaxCount();
        const count = Math.floor(Math.random() * maxCount) + 1;

        // Pick random emoji
        const categoryIndex = Math.floor(Math.random() * OBJECT_SETS.length);
        const itemIndex = Math.floor(Math.random() * OBJECT_SETS[categoryIndex].items.length);
        const emoji = OBJECT_SETS[categoryIndex].items[itemIndex];

        // Generate options (including correct answer)
        const options: number[] = [count];
        let optionAttempts = 0;
        while (options.length < 4 && optionAttempts < 20) {
            optionAttempts++;
            let option = count + Math.floor(Math.random() * 5) - 2;
            if (option < 1) option = Math.floor(Math.random() * 3) + 1;
            if (option > maxCount + 2) option = maxCount;
            if (!options.includes(option) && option > 0) {
                options.push(option);
            }
        }

        // Fill remaining options if needed
        while (options.length < 4) {
            const fallback = options.length + 1;
            if (!options.includes(fallback)) {
                options.push(fallback);
            } else {
                options.push(options.length + count);
            }
        }

        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        // Generate random positions with safety limit
        const positions: { x: number; y: number; rotation: number }[] = [];
        for (let i = 0; i < count; i++) {
            let attempts = 0;
            let valid = false;
            let x = 0, y = 0;

            while (!valid && attempts < 30) {
                x = Math.random() * 70 + 15;
                y = Math.random() * 60 + 15;
                valid = true;

                // Check overlap with reduced distance for more items
                const minDist = count > 10 ? 10 : 12;
                for (const pos of positions) {
                    const dist = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
                    if (dist < minDist) {
                        valid = false;
                        break;
                    }
                }
                attempts++;
            }

            // Force place if couldn't find valid spot
            if (!valid) {
                x = 10 + (i % 5) * 18;
                y = 10 + Math.floor(i / 5) * 20;
            }

            positions.push({
                x,
                y,
                rotation: Math.random() * 20 - 10,
            });
        }

        return { emoji, count, options, positions };
    }, [difficulty]);

    const startGame = useCallback((diff: 'easy' | 'medium' | 'hard') => {
        setDifficulty(diff);
        setQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setCountedItems([]);
        setQuestion(generateQuestion());
        setGameState('playing');
    }, [generateQuestion]);

    // Regenerate question when difficulty changes
    useEffect(() => {
        if (gameState === 'playing' && !question) {
            setQuestion(generateQuestion());
        }
    }, [gameState, question, generateQuestion]);

    const handleItemClick = useCallback((index: number) => {
        if (showResult || !question) return;

        if (!countedItems.includes(index)) {
            soundRef.current?.playCount(countedItems.length + 1);
            setCountedItems(prev => [...prev, index]);
        }
    }, [showResult, countedItems, question]);

    const handleAnswer = useCallback((answer: number) => {
        if (showResult || !question) return;

        setSelectedAnswer(answer);
        setShowResult(true);

        const isCorrect = answer === question.count;

        if (isCorrect) {
            soundRef.current?.playCorrect();
            setScore(s => s + 1);
        } else {
            soundRef.current?.playWrong();
        }

        setTimeout(() => {
            if (questionIndex < TOTAL_QUESTIONS - 1) {
                setQuestionIndex(i => i + 1);
                setQuestion(generateQuestion());
                setSelectedAnswer(null);
                setShowResult(false);
                setCountedItems([]);
            } else {
                setGameState('result');
            }
        }, 1500);
    }, [showResult, question, questionIndex, generateQuestion]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🔢</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600 mb-2">
                    Sayı Sayma
                </h1>
                <p className="text-gray-600 mb-2">Nesneleri say ve doğru sayıyı bul!</p>
                <p className="text-sm text-gray-500 mb-6">
                    💡 İpucu: Nesnelere tıklayarak sayabilirsin!
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => startGame('easy')}
                        className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                        <span>Kolay</span>
                        <span className="text-sm opacity-80">(1-5)</span>
                    </button>
                    <button
                        onClick={() => startGame('medium')}
                        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                        <span>Orta</span>
                        <span className="text-sm opacity-80">(1-10)</span>
                    </button>
                    <button
                        onClick={() => startGame('hard')}
                        className="w-full bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                        <span>Zor</span>
                        <span className="text-sm opacity-80">(1-15)</span>
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        if (!question) return null;

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-emerald-200 via-teal-100 to-cyan-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-teal-600" />
                    </button>

                    <div className="bg-teal-500 text-white rounded-full px-4 py-1 font-bold">
                        {questionIndex + 1}/{TOTAL_QUESTIONS}
                    </div>

                    <div className="bg-emerald-500 text-white rounded-full px-4 py-1 font-bold">
                        ⭐ {score}
                    </div>
                </div>

                {/* Question */}
                <div className="text-center py-3">
                    <p className="text-teal-800 font-bold text-xl">
                        Kaç tane {question.emoji} var?
                    </p>
                    {countedItems.length > 0 && (
                        <p className="text-sm text-teal-600 mt-1">
                            Saydığın: {countedItems.length}
                        </p>
                    )}
                </div>

                {/* Objects Area */}
                <div className="flex-1 mx-4 my-2 bg-white/70 rounded-3xl shadow-lg p-4 relative overflow-hidden">
                    {question.positions.map((pos, i) => (
                        <button
                            key={i}
                            onClick={() => handleItemClick(i)}
                            className={`absolute text-4xl transition-all duration-200 ${countedItems.includes(i)
                                ? 'scale-75 opacity-50'
                                : 'hover:scale-125 cursor-pointer'
                                }`}
                            style={{
                                left: `${pos.x}%`,
                                top: `${pos.y}%`,
                                transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
                            }}
                            disabled={showResult}
                        >
                            {question.emoji}
                            {countedItems.includes(i) && (
                                <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {countedItems.indexOf(i) + 1}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Answer Options */}
                <div className="p-4 bg-white/80 rounded-t-3xl shadow-lg">
                    <p className="text-center text-gray-600 text-sm mb-3">Cevabını seç:</p>
                    <div className="grid grid-cols-4 gap-3">
                        {question.options.map((option, i) => {
                            const isCorrect = option === question.count;
                            const isSelected = selectedAnswer === option;

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(option)}
                                    disabled={showResult}
                                    className={`py-4 rounded-xl font-black text-2xl transition-all ${showResult
                                        ? isCorrect
                                            ? 'bg-green-500 text-white scale-110'
                                            : isSelected
                                                ? 'bg-red-400 text-white'
                                                : 'bg-gray-200 text-gray-400'
                                        : 'bg-teal-500 text-white hover:bg-teal-600 hover:scale-105 active:scale-95'
                                        }`}
                                >
                                    {option}
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
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 p-4">
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

                    <div className="bg-gradient-to-r from-teal-400 to-cyan-500 rounded-xl p-4 mb-4 text-white">
                        <div className="text-sm opacity-80">Skor</div>
                        <div className="text-3xl font-black">{score} / {TOTAL_QUESTIONS}</div>
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
                            className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
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

export default CountingGameScreen;
