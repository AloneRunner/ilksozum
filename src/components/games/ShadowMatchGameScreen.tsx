import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createShadowSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playSelect = () => {
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

    return { playSelect, playCorrect, playWrong };
};

// --- Shadow Items ---
const SHADOW_ITEMS = [
    { emoji: '🐶', name: 'Köpek' },
    { emoji: '🐱', name: 'Kedi' },
    { emoji: '🐰', name: 'Tavşan' },
    { emoji: '🦋', name: 'Kelebek' },
    { emoji: '🐟', name: 'Balık' },
    { emoji: '🌸', name: 'Çiçek' },
    { emoji: '⭐', name: 'Yıldız' },
    { emoji: '❤️', name: 'Kalp' },
    { emoji: '🚗', name: 'Araba' },
    { emoji: '✈️', name: 'Uçak' },
    { emoji: '🚂', name: 'Tren' },
    { emoji: '⛵', name: 'Tekne' },
    { emoji: '🏠', name: 'Ev' },
    { emoji: '🌲', name: 'Ağaç' },
    { emoji: '🍎', name: 'Elma' },
    { emoji: '🍌', name: 'Muz' },
    { emoji: '🎈', name: 'Balon' },
    { emoji: '⚽', name: 'Top' },
    { emoji: '🎸', name: 'Gitar' },
    { emoji: '🔔', name: 'Zil' },
];

interface Question {
    targetEmoji: string;
    targetName: string;
    options: { emoji: string; name: string }[];
    correctIndex: number;
}

const TOTAL_QUESTIONS = 10;

interface ShadowMatchGameScreenProps {
    onBack: () => void;
}

const ShadowMatchGameScreen: React.FC<ShadowMatchGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [question, setQuestion] = useState<Question | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [difficulty, setDifficulty] = useState(3); // Number of options
    const soundRef = useRef<ReturnType<typeof createShadowSound> | null>(null);

    useEffect(() => {
        soundRef.current = createShadowSound();
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
        const shuffled = shuffleArray([...SHADOW_ITEMS]);
        const target = shuffled[0];
        const distractors = shuffled.slice(1, difficulty);

        const options = shuffleArray([target, ...distractors]);
        const correctIndex = options.findIndex(o => o.emoji === target.emoji);

        return {
            targetEmoji: target.emoji,
            targetName: target.name,
            options,
            correctIndex,
        };
    }, [difficulty]);

    const startGame = useCallback((optionCount: number) => {
        setDifficulty(optionCount);
        setQuestionIndex(0);
        setScore(0);
        setSelectedIndex(null);
        setShowResult(false);
        setQuestion(generateQuestion());
        setGameState('playing');
    }, [generateQuestion]);

    useEffect(() => {
        if (gameState === 'playing' && !question) {
            setQuestion(generateQuestion());
        }
    }, [gameState, question, generateQuestion]);

    const handleAnswer = useCallback((index: number) => {
        if (showResult || !question) return;

        soundRef.current?.playSelect();
        setSelectedIndex(index);
        setShowResult(true);

        const isCorrect = index === question.correctIndex;

        setTimeout(() => {
            if (isCorrect) {
                soundRef.current?.playCorrect();
                setScore(s => s + 1);
            } else {
                soundRef.current?.playWrong();
            }
        }, 200);

        setTimeout(() => {
            if (questionIndex < TOTAL_QUESTIONS - 1) {
                setQuestionIndex(i => i + 1);
                setQuestion(generateQuestion());
                setSelectedIndex(null);
                setShowResult(false);
            } else {
                setGameState('result');
            }
        }, 1500);
    }, [showResult, question, questionIndex, generateQuestion]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🔦</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-800 mb-2">
                    Gölge Eşleştirme
                </h1>
                <p className="text-gray-600 mb-2">Gölgeyi renkli haliyle eşleştir!</p>
                <p className="text-sm text-gray-500 mb-6">
                    Karanlık gölgeyi hangi nesne oluşturdu?
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => startGame(3)}
                        className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Kolay (3 seçenek)
                    </button>
                    <button
                        onClick={() => startGame(4)}
                        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Orta (4 seçenek)
                    </button>
                    <button
                        onClick={() => startGame(6)}
                        className="w-full bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Zor (6 seçenek)
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        if (!question) return null;

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-slate-700 via-slate-600 to-slate-500">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-slate-800/80 shadow-md">
                    <button onClick={onBack} className="bg-white/20 rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-white" />
                    </button>

                    <div className="bg-slate-600 text-white rounded-full px-4 py-1 font-bold">
                        {questionIndex + 1}/{TOTAL_QUESTIONS}
                    </div>

                    <div className="bg-amber-500 text-white rounded-full px-4 py-1 font-bold">
                        ⭐ {score}
                    </div>
                </div>

                {/* Question */}
                <div className="text-center py-4">
                    <p className="text-white/80 font-semibold text-lg">
                        Bu gölge kime ait?
                    </p>
                </div>

                {/* Shadow Display */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="bg-slate-900/50 rounded-3xl p-8 shadow-2xl">
                        <div
                            className="text-9xl transition-transform hover:scale-110"
                            style={{
                                filter: 'brightness(0) saturate(100%)',
                                opacity: 0.9,
                            }}
                        >
                            {question.targetEmoji}
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="p-4 bg-white/90 rounded-t-3xl shadow-lg">
                    <p className="text-center text-gray-600 text-sm mb-3">Doğru olanı seç:</p>
                    <div className={`grid gap-3 ${difficulty <= 3 ? 'grid-cols-3' : difficulty <= 4 ? 'grid-cols-4' : 'grid-cols-3'
                        }`}>
                        {question.options.map((option, i) => {
                            const isCorrect = i === question.correctIndex;
                            const isSelected = selectedIndex === i;

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    disabled={showResult}
                                    className={`py-4 px-2 rounded-xl flex flex-col items-center gap-1 transition-all ${showResult
                                            ? isCorrect
                                                ? 'bg-green-500 text-white scale-110 ring-4 ring-green-300'
                                                : isSelected
                                                    ? 'bg-red-400 text-white'
                                                    : 'bg-gray-200 text-gray-400'
                                            : 'bg-slate-100 hover:bg-slate-200 hover:scale-105 active:scale-95'
                                        }`}
                                >
                                    <span className="text-4xl">{option.emoji}</span>
                                    <span className="text-xs font-medium">{option.name}</span>
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
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">{percent >= 80 ? '🏆' : percent >= 50 ? '🎉' : '💪'}</div>
                    <h2 className="text-2xl font-black text-slate-700 mb-2">
                        {percent >= 80 ? 'Harika!' : percent >= 50 ? 'İyi!' : 'Tekrar Dene!'}
                    </h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl p-4 mb-4 text-white">
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
                            className="bg-gradient-to-r from-slate-500 to-slate-600 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
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
                    <ArrowLeftIcon className="w-6 h-6 text-slate-600" />
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

export default ShadowMatchGameScreen;
