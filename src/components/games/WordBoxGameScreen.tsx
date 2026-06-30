import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createWordSound = () => {
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

// Word-Image pairs
const WORD_PAIRS = [
    { emoji: '🍎', word: 'ELMA', options: ['ELMA', 'ARMUT', 'PORTAKAL', 'MUZ'] },
    { emoji: '🐶', word: 'KÖPEK', options: ['KEDİ', 'KÖPEK', 'TAVŞİAN', 'FARE'] },
    { emoji: '🚗', word: 'ARABA', options: ['ARABA', 'OTOBÜS', 'KAMYON', 'TREN'] },
    { emoji: '🌸', word: 'ÇİÇEK', options: ['AĞAÇ', 'ÇİÇEK', 'YAPRAK', 'OT'] },
    { emoji: '🏠', word: 'EV', options: ['EV', 'OKUL', 'HASTANE', 'MARKET'] },
    { emoji: '☀️', word: 'GÜNEŞ', options: ['AY', 'YILDIZ', 'GÜNEŞ', 'BULUT'] },
    { emoji: '🐱', word: 'KEDİ', options: ['KÖPEK', 'KEDİ', 'ASLAN', 'KAPLAN'] },
    { emoji: '🍌', word: 'MUZ', options: ['ELMA', 'ÇLEK', 'MUZ', 'ÜZÜM'] },
    { emoji: '⚽', word: 'TOP', options: ['TOP', 'BALON', 'YUMURTA', 'PORTAKAL'] },
    { emoji: '🦋', word: 'KELEBEK', options: ['ARİ', 'KELEBEK', 'UĞUR BÖCEĞİ', 'SİNEK'] },
    { emoji: '🌙', word: 'AY', options: ['GÜNEŞ', 'AY', 'YILDIZ', 'GEZEGEN'] },
    { emoji: '🎈', word: 'BALON', options: ['TOP', 'BALON', 'ŞEKİL', 'DAİRE'] },
    { emoji: '🐟', word: 'BALIK', options: ['BALIK', 'YENGEÇ', 'DENİZ ATI', 'KURBAĞA'] },
    { emoji: '📚', word: 'KİTAP', options: ['DEFTER', 'KİTAP', 'GAZETE', 'DERGİ'] },
    { emoji: '✈️', word: 'UÇAK', options: ['HELİKOPTER', 'UÇAK', 'ROKET', 'BALON'] },
];

interface Question {
    emoji: string;
    word: string;
    options: string[];
    correctIndex: number;
}

const TOTAL_QUESTIONS = 10;

interface WordBoxGameScreenProps {
    onBack: () => void;
}

const WordBoxGameScreen: React.FC<WordBoxGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [question, setQuestion] = useState<Question | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [usedPairs, setUsedPairs] = useState<number[]>([]);
    const soundRef = useRef<ReturnType<typeof createWordSound> | null>(null);

    useEffect(() => {
        soundRef.current = createWordSound();
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
        const available = WORD_PAIRS.map((_, i) => i).filter(i => !used.includes(i));
        const pairIndex = available[Math.floor(Math.random() * available.length)];
        const pair = WORD_PAIRS[pairIndex];

        const options = shuffleArray([...pair.options]);
        const correctIndex = options.indexOf(pair.word);

        setUsedPairs(prev => [...prev, pairIndex]);

        return {
            emoji: pair.emoji,
            word: pair.word,
            options,
            correctIndex,
        };
    }, []);

    const startGame = useCallback(() => {
        setQuestionIndex(0);
        setScore(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setUsedPairs([]);
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
                setQuestion(generateQuestion(usedPairs));
                setSelectedAnswer(null);
                setShowResult(false);
            } else {
                setGameState('result');
            }
        }, 1500);
    }, [showResult, question, questionIndex, generateQuestion, usedPairs]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-400 to-violet-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">📦</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 mb-2">
                    Kelime Kutusu
                </h1>
                <p className="text-gray-600 mb-2">Resme bak, doğru kelimeyi bul!</p>
                <p className="text-sm text-gray-500 mb-6">
                    🖼️ → 📝 Resim-Kelime Eşleştirme
                </p>

                <button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-blue-500 to-violet-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                    Başla! 🎉
                </button>
            </div>
        </div>
    );

    const renderPlaying = () => {
        if (!question) return null;

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-blue-200 via-indigo-100 to-violet-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-indigo-600" />
                    </button>

                    <div className="bg-indigo-500 text-white rounded-full px-4 py-1 font-bold">
                        {questionIndex + 1}/{TOTAL_QUESTIONS}
                    </div>

                    <div className="bg-violet-500 text-white rounded-full px-4 py-1 font-bold">
                        ⭐ {score}
                    </div>
                </div>

                {/* Question */}
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <p className="text-indigo-800 font-semibold mb-4 text-lg">Bu ne?</p>

                    <div className="bg-white rounded-3xl p-8 shadow-xl mb-6">
                        <div className="text-9xl">{question.emoji}</div>
                    </div>
                </div>

                {/* Options */}
                <div className="p-4 bg-white/80 rounded-t-3xl shadow-lg">
                    <p className="text-center text-gray-600 text-sm mb-3">Doğru kelimeyi seç:</p>
                    <div className="grid grid-cols-2 gap-3">
                        {question.options.map((option, i) => {
                            const isCorrect = i === question.correctIndex;
                            const isSelected = selectedAnswer === i;

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    disabled={showResult}
                                    className={`py-4 px-3 rounded-xl font-bold text-lg transition-all ${showResult
                                            ? isCorrect
                                                ? 'bg-green-500 text-white scale-105'
                                                : isSelected
                                                    ? 'bg-red-400 text-white'
                                                    : 'bg-gray-200 text-gray-400'
                                            : 'bg-indigo-500 text-white hover:bg-indigo-600 hover:scale-105 active:scale-95'
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
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-400 to-violet-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">{percent >= 80 ? '🏆' : '📦'}</div>
                    <h2 className="text-2xl font-black text-indigo-600 mb-2">
                        {percent >= 80 ? 'Harika!' : percent >= 50 ? 'İyi!' : 'Tekrar Dene!'}
                    </h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-400 to-violet-500 rounded-xl p-4 mb-4 text-white">
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

export default WordBoxGameScreen;
