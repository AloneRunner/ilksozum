import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createPieceSound = () => {
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

// Objects with missing pieces
const PUZZLES = [
    {
        name: 'Araba',
        emojis: ['🚗', '🛞', '🪟', '🚙'],
        complete: '🚗',
        missing: '🛞',
        missingName: 'Tekerlek',
        options: ['🛞', '⭐', '🔔', '🎈']
    },
    {
        name: 'Ev',
        emojis: ['🏠', '🚪', '🪟', '🏡'],
        complete: '🏠',
        missing: '🚪',
        missingName: 'Kapı',
        options: ['🔔', '🚪', '📦', '🎁']
    },
    {
        name: 'Yüz',
        emojis: ['😊', '👁️', '👃', '👄'],
        complete: '😊',
        missing: '👃',
        missingName: 'Burun',
        options: ['👂', '👃', '👅', '🦷']
    },
    {
        name: 'Bisiklet',
        emojis: ['🚲', '🛞', '🪑', '🔔'],
        complete: '🚲',
        missing: '🔔',
        missingName: 'Zil',
        options: ['🔔', '🎵', '📢', '🔊']
    },
    {
        name: 'Ağaç',
        emojis: ['🌳', '🍃', '🌸', '🍎'],
        complete: '🌳',
        missing: '🍃',
        missingName: 'Yaprak',
        options: ['🌸', '🍃', '🌺', '🌹']
    },
    {
        name: 'Masa',
        emojis: ['🪑', '📚', '🖊️', '💡'],
        complete: '🪑',
        missing: '💡',
        missingName: 'Lamba',
        options: ['🕯️', '💡', '🔦', '⭐']
    },
    {
        name: 'Saat',
        emojis: ['⏰', '🔢', '⏱️', '🔔'],
        complete: '⏰',
        missing: '🔔',
        missingName: 'Zil',
        options: ['🎵', '🔔', '📢', '🔊']
    },
    {
        name: 'Gemi',
        emojis: ['⛵', '🌊', '⚓', '🏴‍☠️'],
        complete: '⛵',
        missing: '⚓',
        missingName: 'Çapa',
        options: ['🔱', '⚓', '🪝', '⛏️']
    },
];

interface Question {
    puzzle: typeof PUZZLES[0];
    options: string[];
    correctIndex: number;
}

const TOTAL_QUESTIONS = 8;

interface MissingPieceGameScreenProps {
    onBack: () => void;
}

const MissingPieceGameScreen: React.FC<MissingPieceGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [question, setQuestion] = useState<Question | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [usedPuzzles, setUsedPuzzles] = useState<number[]>([]);
    const soundRef = useRef<ReturnType<typeof createPieceSound> | null>(null);

    useEffect(() => {
        soundRef.current = createPieceSound();
    }, []);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const generateQuestion = useCallback((used: number[]): Question => {
        const available = PUZZLES.map((_, i) => i).filter(i => !used.includes(i));
        const puzzleIndex = available[Math.floor(Math.random() * available.length)];
        const puzzle = PUZZLES[puzzleIndex];

        const options = shuffleArray([...puzzle.options]);
        const correctIndex = options.indexOf(puzzle.missing);

        setUsedPuzzles(prev => [...prev, puzzleIndex]);

        return { puzzle, options, correctIndex };
    }, []);

    const startGame = useCallback(() => {
        setQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setUsedPuzzles([]);
        setQuestion(generateQuestion([]));
        setGameState('playing');
    }, [generateQuestion]);

    const handleAnswer = useCallback((index: number) => {
        if (showResult || !question) return;

        soundRef.current?.playSelect();
        setSelectedAnswer(index);
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
                setQuestion(generateQuestion(usedPuzzles));
                setSelectedAnswer(null);
                setShowResult(false);
            } else {
                setGameState('result');
            }
        }, 1500);
    }, [showResult, question, questionIndex, generateQuestion, usedPuzzles]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🧩</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-2">
                    Eksik Parçayı Bul
                </h1>
                <p className="text-gray-600 mb-2">Resimde eksik olan şeyi bul!</p>
                <p className="text-sm text-gray-500 mb-6">
                    Dikkatli bak, neyi eksik?
                </p>

                <button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                    Başla! 🔍
                </button>
            </div>
        </div>
    );

    const renderPlaying = () => {
        if (!question) return null;

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-amber-200 via-yellow-100 to-orange-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-orange-600" />
                    </button>

                    <div className="bg-orange-500 text-white rounded-full px-4 py-1 font-bold">
                        {questionIndex + 1}/{TOTAL_QUESTIONS}
                    </div>

                    <div className="bg-amber-500 text-white rounded-full px-4 py-1 font-bold">
                        ⭐ {score}
                    </div>
                </div>

                {/* Question */}
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <p className="text-orange-800 font-semibold mb-4 text-lg">
                        {question.puzzle.name}'de eksik olan ne?
                    </p>

                    {/* Main Image with Missing Hint */}
                    <div className="bg-white rounded-3xl p-6 shadow-xl mb-4 relative">
                        <div className="text-8xl">{question.puzzle.complete}</div>
                        <div className="absolute -bottom-3 -right-3 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold">
                            ?
                        </div>
                    </div>

                    {/* Hint */}
                    <p className="text-gray-600 text-sm mb-2">
                        İpucu: <span className="font-bold">{question.puzzle.missingName}</span> eksik!
                    </p>
                </div>

                {/* Options */}
                <div className="p-4 bg-white/80 rounded-t-3xl shadow-lg">
                    <p className="text-center text-gray-600 text-sm mb-3">Eksik parçayı seç:</p>
                    <div className="grid grid-cols-4 gap-3">
                        {question.options.map((option, i) => {
                            const isCorrect = i === question.correctIndex;
                            const isSelected = selectedAnswer === i;

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    disabled={showResult}
                                    className={`py-4 rounded-xl text-4xl transition-all ${showResult
                                            ? isCorrect
                                                ? 'bg-green-500 scale-110 ring-4 ring-green-300'
                                                : isSelected
                                                    ? 'bg-red-400'
                                                    : 'bg-gray-200 opacity-50'
                                            : 'bg-amber-100 hover:bg-amber-200 hover:scale-105 active:scale-95'
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
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-400 via-yellow-400 to-orange-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">{percent >= 80 ? '🏆' : '🧩'}</div>
                    <h2 className="text-2xl font-black text-orange-600 mb-2">
                        {percent >= 80 ? 'Harika!' : percent >= 50 ? 'İyi!' : 'Tekrar Dene!'}
                    </h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl p-4 mb-4 text-white">
                        <div className="text-sm opacity-80">Skor</div>
                        <div className="text-3xl font-black">{score} / {TOTAL_QUESTIONS}</div>
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
            `}</style>
        </div>
    );
};

export default MissingPieceGameScreen;
