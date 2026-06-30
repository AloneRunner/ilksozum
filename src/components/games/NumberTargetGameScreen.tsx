import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createTargetSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playCatch = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
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

    return { playCatch, playCorrect, playWrong };
};

interface FallingNumber {
    id: number;
    value: number;
    x: number;
    y: number;
    speed: number;
}

const TOTAL_ROUNDS = 10;

interface NumberTargetGameScreenProps {
    onBack: () => void;
}

const NumberTargetGameScreen: React.FC<NumberTargetGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [targetNumber, setTargetNumber] = useState(5);
    const [fallingNumbers, setFallingNumbers] = useState<FallingNumber[]>([]);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [lives, setLives] = useState(3);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const numberIdRef = useRef(0);
    const soundRef = useRef<ReturnType<typeof createTargetSound> | null>(null);

    useEffect(() => {
        soundRef.current = createTargetSound();
    }, []);

    const getMaxTarget = () => {
        switch (difficulty) {
            case 'easy': return 5;
            case 'medium': return 10;
            case 'hard': return 15;
        }
    };

    const generateNewRound = useCallback(() => {
        const maxTarget = getMaxTarget();
        const target = Math.floor(Math.random() * maxTarget) + 1;
        setTargetNumber(target);
        setFallingNumbers([]);
        numberIdRef.current = 0;
    }, [difficulty]);

    const startGame = useCallback((diff: 'easy' | 'medium' | 'hard') => {
        setDifficulty(diff);
        setScore(0);
        setRound(1);
        setLives(3);
        setGameState('playing');
        generateNewRound();
    }, [generateNewRound]);

    // Generate falling numbers
    useEffect(() => {
        if (gameState !== 'playing') return;

        const interval = setInterval(() => {
            const container = containerRef.current;
            if (!container) return;

            const maxTarget = getMaxTarget();

            // 40% chance for EXACT target number, 60% other numbers
            const spawnType = Math.random();
            let value: number;

            if (spawnType < 0.4) {
                // Spawn exact target number (40% chance)
                value = targetNumber;
            } else if (spawnType < 0.6) {
                // Spawn a number close to target (20% chance)
                value = targetNumber + (Math.random() < 0.5 ? 1 : -1);
                if (value < 1) value = 1;
                if (value > maxTarget) value = maxTarget;
            } else {
                // Spawn random number (40% chance)
                value = Math.floor(Math.random() * maxTarget) + 1;
            }

            const newNumber: FallingNumber = {
                id: numberIdRef.current++,
                value,
                x: Math.random() * 70 + 15,
                y: -10,
                speed: difficulty === 'easy' ? 0.25 : difficulty === 'medium' ? 0.35 : 0.5,
            };

            setFallingNumbers(prev => [...prev, newNumber]);
        }, difficulty === 'easy' ? 1800 : difficulty === 'medium' ? 1400 : 1000);

        return () => clearInterval(interval);
    }, [gameState, targetNumber, difficulty]);

    // Animation loop
    useEffect(() => {
        if (gameState !== 'playing') return;

        const animate = () => {
            setFallingNumbers(prev => {
                const updated = prev.map(num => ({
                    ...num,
                    y: num.y + num.speed,
                })).filter(num => num.y < 110);

                return updated;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [gameState]);

    const handleNumberClick = useCallback((num: FallingNumber) => {
        soundRef.current?.playCatch();

        // Remove the clicked number
        setFallingNumbers(prev => prev.filter(n => n.id !== num.id));

        // Check if this number can make the target with another clicked number
        // For simplicity: just check if the number equals the target
        if (num.value === targetNumber) {
            soundRef.current?.playCorrect();
            setShowFeedback('correct');
            setScore(s => s + 10);

            setTimeout(() => {
                setShowFeedback(null);
                if (round >= TOTAL_ROUNDS) {
                    setGameState('result');
                } else {
                    setRound(r => r + 1);
                    generateNewRound();
                }
            }, 800);
        } else {
            soundRef.current?.playWrong();
            setShowFeedback('wrong');
            setLives(l => {
                const newLives = l - 1;
                if (newLives <= 0) {
                    setTimeout(() => setGameState('result'), 500);
                }
                return newLives;
            });

            setTimeout(() => setShowFeedback(null), 500);
        }
    }, [targetNumber, round, generateNewRound]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 mb-2">
                    Sayı Hedefi
                </h1>
                <p className="text-gray-600 mb-2">Hedef sayıya eşit olan sayıyı yakala!</p>
                <p className="text-sm text-gray-500 mb-6">
                    Düşen sayılara dokun ve hedefi bul!
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => startGame('easy')}
                        className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Kolay (1-5)
                    </button>
                    <button
                        onClick={() => startGame('medium')}
                        className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Orta (1-10)
                    </button>
                    <button
                        onClick={() => startGame('hard')}
                        className="w-full bg-gradient-to-r from-red-400 to-rose-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                    >
                        Zor (1-15)
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => (
        <div
            ref={containerRef}
            className="absolute inset-0 flex flex-col bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100 overflow-hidden"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-white/80 shadow-md z-10">
                <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                    <ArrowLeftIcon className="w-5 h-5 text-orange-600" />
                </button>

                <div className="flex gap-2">
                    <div className="bg-orange-500 text-white rounded-full px-3 py-1 font-bold">
                        {round}/{TOTAL_ROUNDS}
                    </div>
                    <div className="bg-red-500 text-white rounded-full px-3 py-1 font-bold">
                        {'❤️'.repeat(lives)}
                    </div>
                </div>

                <div className="bg-emerald-500 text-white rounded-full px-4 py-1 font-bold">
                    ⭐ {score}
                </div>
            </div>

            {/* Target */}
            <div className="bg-white/90 mx-4 mt-2 rounded-2xl p-4 shadow-lg text-center z-10">
                <p className="text-gray-600 text-sm">Hedef sayıyı bul:</p>
                <div className="text-5xl font-black text-orange-600">{targetNumber}</div>
            </div>

            {/* Game Area */}
            <div className="flex-1 relative">
                {fallingNumbers.map(num => (
                    <button
                        key={num.id}
                        onClick={() => handleNumberClick(num)}
                        className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white font-black text-4xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform border-4 border-white"
                        style={{
                            left: `${num.x}%`,
                            top: `${num.y}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        {num.value}
                    </button>
                ))}
            </div>

            {/* Feedback */}
            {showFeedback && (
                <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-20 ${showFeedback === 'correct' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                    <div className="text-8xl animate-bounce">
                        {showFeedback === 'correct' ? '✅' : '❌'}
                    </div>
                </div>
            )}
        </div>
    );

    const renderResult = () => {
        const percent = lives > 0 ? Math.round((score / (TOTAL_ROUNDS * 10)) * 100) : 0;
        const stars = percent >= 90 ? 3 : percent >= 60 ? 2 : percent >= 30 ? 1 : 0;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">{lives > 0 ? '🏆' : '💔'}</div>
                    <h2 className="text-2xl font-black text-orange-600 mb-2">
                        {lives > 0 ? 'Tebrikler!' : 'Oyun Bitti!'}
                    </h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-xl p-4 mb-4 text-white">
                        <div className="text-sm opacity-80">Puan</div>
                        <div className="text-3xl font-black">{score}</div>
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

export default NumberTargetGameScreen;
