import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Animal Data with Sound Frequencies ---
const ANIMALS = [
    { emoji: '🐱', name: 'Kedi', sound: 'Miyav!', freq: [400, 600, 400] },
    { emoji: '🐶', name: 'Köpek', sound: 'Hav hav!', freq: [300, 350, 300] },
    { emoji: '🐮', name: 'İnek', sound: 'Möö!', freq: [150, 180, 150] },
    { emoji: '🐷', name: 'Domuz', sound: 'Oink!', freq: [250, 300, 250] },
    { emoji: '🐸', name: 'Kurbağa', sound: 'Vrak vrak!', freq: [200, 250, 200] },
    { emoji: '🦁', name: 'Aslan', sound: 'Kükreee!', freq: [100, 150, 100] },
    { emoji: '🐔', name: 'Tavuk', sound: 'Gıt gıdak!', freq: [500, 600, 500] },
    { emoji: '🦆', name: 'Ördek', sound: 'Vak vak!', freq: [350, 400, 350] },
    { emoji: '🐑', name: 'Koyun', sound: 'Mee!', freq: [300, 400, 300] },
    { emoji: '🐴', name: 'At', sound: 'İhaha!', freq: [200, 300, 200] },
];

// --- Sound Effects with more realistic animal sounds ---
const createAnimalSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playAnimalSound = (animalName: string) => {
        // Different sound patterns for each animal
        const patterns: { [key: string]: { type: OscillatorType; freqs: number[]; duration: number; interval: number } } = {
            'Kedi': { type: 'sine', freqs: [700, 600, 500, 400], duration: 0.3, interval: 80 },
            'Köpek': { type: 'sawtooth', freqs: [300, 350, 300, 280], duration: 0.2, interval: 150 },
            'İnek': { type: 'sawtooth', freqs: [120, 150, 130, 120], duration: 0.5, interval: 200 },
            'Domuz': { type: 'square', freqs: [200, 250, 220, 200], duration: 0.15, interval: 100 },
            'Kurbağa': { type: 'square', freqs: [150, 200, 150, 180], duration: 0.1, interval: 80 },
            'Aslan': { type: 'sawtooth', freqs: [80, 100, 120, 100, 80], duration: 0.4, interval: 150 },
            'Tavuk': { type: 'square', freqs: [600, 500, 650, 550, 600], duration: 0.1, interval: 60 },
            'Ördek': { type: 'sawtooth', freqs: [400, 350, 380, 320], duration: 0.15, interval: 100 },
            'Koyun': { type: 'sine', freqs: [350, 400, 380, 350], duration: 0.25, interval: 120 },
            'At': { type: 'sawtooth', freqs: [200, 300, 400, 350, 250], duration: 0.2, interval: 100 },
        };

        const pattern = patterns[animalName] || patterns['Kedi'];

        pattern.freqs.forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = pattern.type;
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(freq * 0.8, audioCtx.currentTime + pattern.duration);
                gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + pattern.duration);
                osc.start();
                osc.stop(audioCtx.currentTime + pattern.duration);
            }, i * pattern.interval);
        });
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

    return { playAnimalSound, playCorrect, playWrong };
};

interface Question {
    targetAnimal: typeof ANIMALS[0];
    options: typeof ANIMALS[0][];
}

const TOTAL_QUESTIONS = 10;

interface AnimalSoundsGameScreenProps {
    onBack: () => void;
}

const AnimalSoundsGameScreen: React.FC<AnimalSoundsGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [question, setQuestion] = useState<Question | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [optionCount, setOptionCount] = useState(3);
    const [isPlaying, setIsPlaying] = useState(false);
    const soundRef = useRef<ReturnType<typeof createAnimalSound> | null>(null);

    useEffect(() => {
        soundRef.current = createAnimalSound();
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
        const shuffled = shuffleArray([...ANIMALS]);
        const target = shuffled[0];
        const distractors = shuffled.slice(1, optionCount);
        const options = shuffleArray([target, ...distractors]);

        return { targetAnimal: target, options };
    }, [optionCount]);

    const playCurrentSound = useCallback(() => {
        if (!question || isPlaying) return;

        setIsPlaying(true);
        soundRef.current?.playAnimalSound(question.targetAnimal.name);

        setTimeout(() => setIsPlaying(false), 600);
    }, [question, isPlaying]);

    const startGame = useCallback((options: number) => {
        setOptionCount(options);
        setQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        const q = generateQuestion();
        setQuestion(q);
        setGameState('playing');

        setTimeout(() => {
            soundRef.current?.playAnimalSound(q.targetAnimal.name);
        }, 500);
    }, [generateQuestion]);

    const handleAnswer = useCallback((index: number) => {
        if (showResult || !question) return;

        setSelectedAnswer(index);
        setShowResult(true);

        const isCorrect = question.options[index].emoji === question.targetAnimal.emoji;

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
                const newQ = generateQuestion();
                setQuestion(newQ);
                setSelectedAnswer(null);
                setShowResult(false);

                setTimeout(() => {
                    soundRef.current?.playAnimalSound(newQ.targetAnimal.name);
                }, 300);
            } else {
                setGameState('result');
            }
        }, 1500);
    }, [showResult, question, questionIndex, generateQuestion]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🦁</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-2">
                    Hayvan Sesleri
                </h1>
                <p className="text-gray-600 mb-2">Sesi dinle, doğru hayvanı bul!</p>
                <p className="text-sm text-gray-500 mb-6">
                    🔊 Ses açık olmalı!
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
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-green-200 via-emerald-100 to-teal-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-emerald-600" />
                    </button>

                    <div className="bg-emerald-500 text-white rounded-full px-4 py-1 font-bold">
                        {questionIndex + 1}/{TOTAL_QUESTIONS}
                    </div>

                    <div className="bg-amber-500 text-white rounded-full px-4 py-1 font-bold">
                        ⭐ {score}
                    </div>
                </div>

                {/* Sound Button */}
                <div className="flex flex-col items-center py-6">
                    <p className="text-emerald-800 font-semibold mb-4">Bu sesi hangi hayvan çıkarır?</p>

                    <button
                        onClick={playCurrentSound}
                        disabled={isPlaying}
                        className={`w-32 h-32 rounded-full flex items-center justify-center shadow-xl transition-all ${isPlaying
                            ? 'bg-emerald-500 scale-110'
                            : 'bg-gradient-to-br from-emerald-400 to-teal-500 hover:scale-105'
                            }`}
                    >
                        <span className="text-6xl">{isPlaying ? '🔊' : '🔉'}</span>
                    </button>

                    <p className="text-emerald-600 font-bold mt-3 text-lg">
                        "{question.targetAnimal.sound}"
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                        (Tekrar dinlemek için dokun)
                    </p>
                </div>

                {/* Options */}
                <div className="flex-1 flex items-center">
                    <div className="w-full px-4">
                        <div className={`grid gap-3 ${optionCount <= 3 ? 'grid-cols-3' : optionCount <= 4 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                            {question.options.map((animal, i) => {
                                const isCorrect = animal.emoji === question.targetAnimal.emoji;
                                const isSelected = selectedAnswer === i;

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
                                                    : 'bg-gray-200 opacity-50'
                                            : 'bg-white hover:bg-emerald-50 hover:scale-105 active:scale-95 shadow-md'
                                            }`}
                                    >
                                        <span className="text-5xl">{animal.emoji}</span>
                                        <span className="text-sm font-medium text-gray-700">{animal.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderResult = () => {
        const percent = Math.round((score / TOTAL_QUESTIONS) * 100);
        const stars = percent >= 90 ? 3 : percent >= 60 ? 2 : 1;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">{percent >= 80 ? '🦁' : '🐱'}</div>
                    <h2 className="text-2xl font-black text-emerald-600 mb-2">
                        {percent >= 80 ? 'Harika!' : percent >= 50 ? 'İyi!' : 'Tekrar Dene!'}
                    </h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-green-400 to-teal-500 rounded-xl p-4 mb-4 text-white">
                        <div className="text-sm opacity-80">Skor</div>
                        <div className="text-3xl font-black">{score} / {TOTAL_QUESTIONS}</div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => startGame(optionCount)}
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

export default AnimalSoundsGameScreen;
