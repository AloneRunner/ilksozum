import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createRainbowSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playPlace = (index: number) => {
        const freq = 400 + index * 50;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
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

    const playComplete = () => {
        [261, 329, 392, 523, 659, 784, 1047].forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.2);
            }, i * 80);
        });
    };

    return { playPlace, playCorrect, playWrong, playComplete };
};

// Rainbow colors in correct order
const RAINBOW_COLORS = [
    { name: 'Kırmızı', color: '#EF4444', emoji: '🔴' },
    { name: 'Turuncu', color: '#F97316', emoji: '🟠' },
    { name: 'Sarı', color: '#EAB308', emoji: '🟡' },
    { name: 'Yeşil', color: '#22C55E', emoji: '🟢' },
    { name: 'Mavi', color: '#3B82F6', emoji: '🔵' },
    { name: 'Lacivert', color: '#4338CA', emoji: '🟣' },
    { name: 'Mor', color: '#A855F7', emoji: '💜' },
];

interface RainbowGameScreenProps {
    onBack: () => void;
}

const RainbowGameScreen: React.FC<RainbowGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'complete'>('menu');
    const [placedColors, setPlacedColors] = useState<number[]>([]);
    const [selectedColor, setSelectedColor] = useState<number | null>(null);
    const [shuffledColors, setShuffledColors] = useState<number[]>([]);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [attempts, setAttempts] = useState(0);
    const soundRef = useRef<ReturnType<typeof createRainbowSound> | null>(null);

    useEffect(() => {
        soundRef.current = createRainbowSound();
    }, []);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const startGame = useCallback(() => {
        setPlacedColors([]);
        setSelectedColor(null);
        setShuffledColors(shuffleArray([0, 1, 2, 3, 4, 5, 6]));
        setShowFeedback(null);
        setAttempts(0);
        setGameState('playing');
    }, []);

    const handleColorClick = useCallback((colorIndex: number) => {
        if (showFeedback) return;
        if (placedColors.includes(colorIndex)) return;

        soundRef.current?.playPlace(colorIndex);
        setSelectedColor(colorIndex);
    }, [showFeedback, placedColors]);

    const handleSlotClick = useCallback((slotIndex: number) => {
        if (selectedColor === null || showFeedback) return;
        if (placedColors.length !== slotIndex) return;

        setAttempts(a => a + 1);

        // Check if correct color for this position
        const isCorrect = selectedColor === slotIndex;

        if (isCorrect) {
            soundRef.current?.playCorrect();
            setShowFeedback('correct');
            setPlacedColors(prev => [...prev, selectedColor]);
            setSelectedColor(null);

            setTimeout(() => {
                setShowFeedback(null);

                // Check if rainbow complete
                if (placedColors.length + 1 === 7) {
                    soundRef.current?.playComplete();
                    setGameState('complete');
                }
            }, 400);
        } else {
            soundRef.current?.playWrong();
            setShowFeedback('wrong');
            setSelectedColor(null);

            setTimeout(() => setShowFeedback(null), 400);
        }
    }, [selectedColor, showFeedback, placedColors]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 via-sky-300 to-cyan-200 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🌈</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 mb-2">
                    Gökkuşağı Oluştur
                </h1>
                <p className="text-gray-600 mb-2">Renkleri doğru sıraya diz!</p>
                <p className="text-sm text-gray-500 mb-6">
                    Kırmızı → Turuncu → Sarı → Yeşil → Mavi → Lacivert → Mor
                </p>

                {/* Preview Rainbow */}
                <div className="flex justify-center gap-1 mb-6">
                    {RAINBOW_COLORS.map((c, i) => (
                        <div
                            key={i}
                            className="w-8 h-16 rounded-full"
                            style={{ backgroundColor: c.color }}
                        />
                    ))}
                </div>

                <button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-lg px-6 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                    Başla! 🎨
                </button>
            </div>
        </div>
    );

    const renderPlaying = () => (
        <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-blue-300 via-sky-200 to-cyan-100">
            {/* Header */}
            <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                    <ArrowLeftIcon className="w-5 h-5 text-blue-600" />
                </button>

                <div className="font-bold text-blue-700">Gökkuşağını Tamamla!</div>

                <div className="bg-blue-500 text-white rounded-full px-3 py-1 font-bold text-sm">
                    {placedColors.length}/7
                </div>
            </div>

            {/* Rainbow Arc Slots */}
            <div className="flex-1 flex flex-col items-center justify-center">
                {/* Sky */}
                <div className="text-4xl mb-4">☁️ ☀️ ☁️</div>

                {/* Rainbow */}
                <div className="relative w-80 h-40 mb-8">
                    {/* Arc Background */}
                    <div className="absolute inset-0 flex justify-center">
                        <div className="w-80 h-40 rounded-t-full overflow-hidden bg-gray-200/50 flex items-end">
                            {RAINBOW_COLORS.map((_, i) => {
                                const placed = placedColors.includes(i);
                                const isNextSlot = placedColors.length === i;
                                const color = RAINBOW_COLORS[i];

                                return (
                                    <button
                                        key={i}
                                        onClick={() => handleSlotClick(i)}
                                        disabled={!isNextSlot || selectedColor === null}
                                        className={`flex-1 h-full transition-all ${placed
                                                ? ''
                                                : isNextSlot && selectedColor !== null
                                                    ? 'bg-white/50 animate-pulse'
                                                    : 'bg-gray-200/30'
                                            }`}
                                        style={{
                                            backgroundColor: placed ? color.color : undefined,
                                            borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.3)' : 'none',
                                        }}
                                    >
                                        {!placed && isNextSlot && (
                                            <span className="text-2xl opacity-50">?</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Ground */}
                <div className="text-3xl">🌳 🌷 🏠 🌻 🌲</div>
            </div>

            {/* Available Colors */}
            <div className="p-4 bg-white/80 rounded-t-3xl shadow-lg">
                <p className="text-center text-gray-600 text-sm mb-3">Rengi seç ve yerine koy:</p>
                <div className="flex justify-center gap-2 flex-wrap">
                    {shuffledColors.filter(i => !placedColors.includes(i)).map((colorIndex) => {
                        const color = RAINBOW_COLORS[colorIndex];
                        return (
                            <button
                                key={colorIndex}
                                onClick={() => handleColorClick(colorIndex)}
                                className={`px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-all ${selectedColor === colorIndex
                                        ? 'ring-4 ring-white scale-110 shadow-xl'
                                        : 'hover:scale-105 shadow-md'
                                    }`}
                                style={{
                                    backgroundColor: color.color,
                                    color: colorIndex <= 2 ? '#000' : '#fff',
                                }}
                            >
                                <span className="text-xl">{color.emoji}</span>
                                <span className="text-sm">{color.name}</span>
                            </button>
                        );
                    })}
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

    const renderComplete = () => {
        const stars = attempts <= 7 ? 3 : attempts <= 10 ? 2 : 1;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-blue-400 via-sky-300 to-cyan-200 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-8xl mb-4">🌈</div>
                    <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 mb-2">
                        Harika!
                    </h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-xl p-4 mb-4 text-white">
                        <div className="text-sm opacity-80">Deneme Sayısı</div>
                        <div className="text-3xl font-black">{attempts}</div>
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
                    <ArrowLeftIcon className="w-6 h-6 text-blue-600" />
                </button>
            )}

            {gameState === 'menu' && renderMenu()}
            {gameState === 'playing' && renderPlaying()}
            {gameState === 'complete' && renderComplete()}

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

export default RainbowGameScreen;
