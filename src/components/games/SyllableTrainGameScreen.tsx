import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createSyllableSound = () => {
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

// Word with syllables
const WORDS = [
    { word: 'ELMA', syllables: ['EL', 'MA'], emoji: '🍎' },
    { word: 'ARABA', syllables: ['A', 'RA', 'BA'], emoji: '🚗' },
    { word: 'KEDI', syllables: ['KE', 'Dİ'], emoji: '🐱' },
    { word: 'KÖPEK', syllables: ['KÖ', 'PEK'], emoji: '🐶' },
    { word: 'TOP', syllables: ['TOP'], emoji: '⚽' },
    { word: 'BAL', syllables: ['BAL'], emoji: '🍯' },
    { word: 'BALIK', syllables: ['BA', 'LIK'], emoji: '🐟' },
    { word: 'KELEBEK', syllables: ['KE', 'LE', 'BEK'], emoji: '🦋' },
    { word: 'ÇIÇEK', syllables: ['ÇI', 'ÇEK'], emoji: '🌸' },
    { word: 'ŞAPKA', syllables: ['ŞAP', 'KA'], emoji: '🎩' },
    { word: 'KUZU', syllables: ['KU', 'ZU'], emoji: '🐑' },
    { word: 'AYI', syllables: ['A', 'YI'], emoji: '🐻' },
];

interface SyllableTrainGameScreenProps {
    onBack: () => void;
}

const SyllableTrainGameScreen: React.FC<SyllableTrainGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [shuffledSyllables, setShuffledSyllables] = useState<string[]>([]);
    const [placedSyllables, setPlacedSyllables] = useState<string[]>([]);
    const [round, setRound] = useState(0);
    const [score, setScore] = useState(0);
    const [totalRounds] = useState(8);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [usedWords, setUsedWords] = useState<number[]>([]);
    const soundRef = useRef<ReturnType<typeof createSyllableSound> | null>(null);

    useEffect(() => {
        soundRef.current = createSyllableSound();
    }, []);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const startRound = useCallback((roundNum: number, used: number[]) => {
        // Get available words
        const available = WORDS.map((_, i) => i).filter(i => !used.includes(i));
        if (available.length === 0) {
            setGameState('result');
            return;
        }

        const wordIndex = available[Math.floor(Math.random() * available.length)];
        const word = WORDS[wordIndex];

        setCurrentWordIndex(wordIndex);
        setShuffledSyllables(shuffleArray([...word.syllables]));
        setPlacedSyllables([]);
        setShowFeedback(null);
        setRound(roundNum);
        setUsedWords([...used, wordIndex]);
    }, []);

    const startGame = useCallback(() => {
        setScore(0);
        setUsedWords([]);
        setGameState('playing');
        startRound(1, []);
    }, [startRound]);

    const handleSyllableClick = useCallback((syllable: string) => {
        if (showFeedback) return;
        if (placedSyllables.includes(syllable)) return;

        const word = WORDS[currentWordIndex];
        const nextSlotIndex = placedSyllables.length;
        const isCorrect = word.syllables[nextSlotIndex] === syllable;

        soundRef.current?.playDrop();

        if (isCorrect) {
            soundRef.current?.playCorrect();
            setShowFeedback('correct');
            setPlacedSyllables(prev => [...prev, syllable]);

            setTimeout(() => {
                setShowFeedback(null);

                // Check if word complete
                if (placedSyllables.length + 1 === word.syllables.length) {
                    setScore(s => s + 1);

                    if (round >= totalRounds) {
                        setGameState('result');
                    } else {
                        startRound(round + 1, usedWords);
                    }
                }
            }, 500);
        } else {
            soundRef.current?.playWrong();
            setShowFeedback('wrong');

            setTimeout(() => setShowFeedback(null), 500);
        }
    }, [showFeedback, placedSyllables, currentWordIndex, round, totalRounds, startRound, usedWords]);

    // handleSlotClick is no longer needed - direct tap works

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🚂</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-2">
                    Hece Treni
                </h1>
                <p className="text-gray-600 mb-2">Heceleri birleştirip kelime oluştur!</p>
                <p className="text-sm text-gray-500 mb-6">
                    Örnek: EL + MA = 🍎
                </p>

                <button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                    Başla! 🎉
                </button>
            </div>
        </div>
    );

    const renderPlaying = () => {
        const word = WORDS[currentWordIndex];

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-violet-200 via-purple-100 to-fuchsia-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-purple-600" />
                    </button>

                    <div className="bg-purple-500 text-white rounded-full px-4 py-1 font-bold">
                        {round}/{totalRounds}
                    </div>

                    <div className="bg-fuchsia-500 text-white rounded-full px-4 py-1 font-bold">
                        ⭐ {score}
                    </div>
                </div>

                {/* Target Word Image */}
                <div className="flex flex-col items-center py-4">
                    <div className="text-8xl mb-2">{word.emoji}</div>
                    <p className="text-purple-800 font-bold text-lg">Bu kelimeyi oluştur!</p>
                </div>

                {/* Train Track / Slots */}
                <div className="bg-white/60 rounded-2xl mx-4 p-4 shadow-lg mb-4">
                    <div className="flex justify-center gap-2">
                        {word.syllables.map((_, i) => {
                            const placed = placedSyllables[i];
                            const isNextSlot = placedSyllables.length === i;

                            return (
                                <React.Fragment key={i}>
                                    <div
                                        className={`min-w-16 h-14 rounded-xl flex items-center justify-center font-bold text-xl transition-all ${placed
                                            ? 'bg-purple-400 text-white'
                                            : isNextSlot
                                                ? 'bg-purple-100 border-2 border-purple-400 border-dashed animate-pulse'
                                                : 'bg-gray-100 border-2 border-gray-300 border-dashed'
                                            }`}
                                    >
                                        {placed || '?'}
                                    </div>
                                    {i < word.syllables.length - 1 && (
                                        <span className="text-3xl text-purple-400 mx-1">🔗</span>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>

                    {/* Train */}
                    <div className="flex justify-center mt-3">
                        <span className="text-4xl">🚂</span>
                        {word.syllables.map((_, i) => (
                            <span key={i} className={`text-3xl ${i < placedSyllables.length ? 'opacity-100' : 'opacity-30'}`}>
                                🚃
                            </span>
                        ))}
                    </div>
                </div>

                {/* Available Syllables */}
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="bg-white/70 rounded-3xl p-6 shadow-lg">
                        <p className="text-center text-gray-600 text-sm mb-4">Heceler:</p>
                        <div className="flex justify-center gap-3 flex-wrap">
                            {shuffledSyllables.filter(s => !placedSyllables.includes(s)).map((syllable, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSyllableClick(syllable)}
                                    className={`px-6 py-3 rounded-xl font-bold text-xl transition-all bg-white hover:bg-purple-50 hover:scale-105 text-purple-700 shadow-md active:scale-95`}
                                >
                                    {syllable}
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
        const percent = Math.round((score / totalRounds) * 100);
        const stars = percent >= 90 ? 3 : percent >= 60 ? 2 : 1;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">🚂</div>
                    <h2 className="text-2xl font-black text-purple-600 mb-2">Tebrikler!</h2>

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
                    <ArrowLeftIcon className="w-6 h-6 text-purple-600" />
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

export default SyllableTrainGameScreen;
