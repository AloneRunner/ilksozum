import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createPlantSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playWater = () => {
        // Bubble sound
        [200, 250, 300, 350].forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.1);
            }, i * 50);
        });
    };

    const playSun = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    };

    const playGrow = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    };

    const playComplete = () => {
        [523, 659, 784, 1047].forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.2);
            }, i * 100);
        });
    };

    return { playWater, playSun, playGrow, playComplete };
};

// Plant Stages
const PLANTS = [
    { name: 'Çiçek', final: '🌸', stages: ['🌰', '🌱', '🌿', '🌷', '🌸'] },
    { name: 'Ayçiçeği', final: '🌻', stages: ['🌰', '🌱', '🌿', '🌾', '🌻'] },
    { name: 'Ağaç', final: '🌲', stages: ['🌰', '🌱', '🌿', '🌴', '🌲'] },
    { name: 'Elma', final: '🍎', stages: ['🌰', '🌱', '🌿', '🌳', '🍎'] },
];

interface PlantGrowingGameScreenProps {
    onBack: () => void;
}

const PlantGrowingGameScreen: React.FC<PlantGrowingGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'complete'>('menu');
    const [currentPlant, setCurrentPlant] = useState(0);
    const [stage, setStage] = useState(0);
    const [water, setWater] = useState(0);
    const [sun, setSun] = useState(0);
    const [isGrowing, setIsGrowing] = useState(false);
    const [completedPlants, setCompletedPlants] = useState<number[]>([]);
    const soundRef = useRef<ReturnType<typeof createPlantSound> | null>(null);

    useEffect(() => {
        soundRef.current = createPlantSound();
    }, []);

    const startPlant = useCallback((plantIndex: number) => {
        setCurrentPlant(plantIndex);
        setStage(0);
        setWater(0);
        setSun(0);
        setIsGrowing(false);
        setGameState('playing');
    }, []);

    const handleWater = useCallback(() => {
        if (isGrowing || stage >= 4) return;

        soundRef.current?.playWater();
        setWater(w => {
            const newWater = w + 1;
            if (newWater >= 3 && sun >= 3) {
                grow();
            }
            return newWater;
        });
    }, [isGrowing, stage, sun]);

    const handleSun = useCallback(() => {
        if (isGrowing || stage >= 4) return;

        soundRef.current?.playSun();
        setSun(s => {
            const newSun = s + 1;
            if (water >= 3 && newSun >= 3) {
                grow();
            }
            return newSun;
        });
    }, [isGrowing, stage, water]);

    const grow = useCallback(() => {
        setIsGrowing(true);
        soundRef.current?.playGrow();

        setTimeout(() => {
            setStage(s => {
                const newStage = s + 1;
                if (newStage >= 4) {
                    soundRef.current?.playComplete();
                    setCompletedPlants(prev => [...prev, currentPlant]);
                    setTimeout(() => setGameState('complete'), 500);
                }
                return newStage;
            });
            setWater(0);
            setSun(0);
            setIsGrowing(false);
        }, 800);
    }, [currentPlant]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-emerald-400 to-lime-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🌱</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-600 mb-2">
                    Bitki Büyüt
                </h1>
                <p className="text-gray-600 mb-2">Su ve güneş vererek bitkiyi büyüt!</p>
                <p className="text-sm text-gray-500 mb-6">
                    💧 3 su + ☀️ 3 güneş = Büyüme!
                </p>

                <div className="grid grid-cols-2 gap-3">
                    {PLANTS.map((plant, i) => (
                        <button
                            key={i}
                            onClick={() => startPlant(i)}
                            className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all hover:scale-105 ${completedPlants.includes(i)
                                    ? 'bg-green-100 border-2 border-green-400'
                                    : 'bg-white border-2 border-gray-200'
                                } shadow-md`}
                        >
                            <span className="text-4xl">{plant.final}</span>
                            <span className="font-medium text-gray-700">{plant.name}</span>
                            {completedPlants.includes(i) && (
                                <span className="text-green-600 text-sm">✓ Yetişti!</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        const plant = PLANTS[currentPlant];
        const currentEmoji = plant.stages[stage];
        const progressPercent = (stage / 4) * 100;

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-sky-300 via-sky-200 to-amber-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-green-600" />
                    </button>

                    <div className="font-bold text-green-700">{plant.name} Yetiştir</div>

                    <div className="bg-green-500 text-white rounded-full px-3 py-1 text-sm font-bold">
                        Aşama {stage + 1}/5
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="mx-4 mt-3">
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-green-400 to-lime-500 h-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Plant Display */}
                <div className="flex-1 flex flex-col items-center justify-center">
                    {/* Sun */}
                    <div className="text-6xl mb-4 animate-pulse">☀️</div>

                    {/* Plant */}
                    <div className={`text-9xl transition-all duration-500 ${isGrowing ? 'scale-125 animate-bounce' : ''}`}>
                        {currentEmoji}
                    </div>

                    {/* Soil */}
                    <div className="w-40 h-8 bg-amber-700 rounded-t-lg mt-2 flex items-center justify-center">
                        <span className="text-amber-900">🟫🟫🟫</span>
                    </div>

                    {/* Status */}
                    <div className="mt-6 flex gap-6">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">💧</span>
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <div
                                        key={i}
                                        className={`w-4 h-4 rounded-full ${i <= water ? 'bg-blue-400' : 'bg-gray-300'}`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">☀️</span>
                            <div className="flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <div
                                        key={i}
                                        className={`w-4 h-4 rounded-full ${i <= sun ? 'bg-yellow-400' : 'bg-gray-300'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-4 flex justify-center gap-6">
                    <button
                        onClick={handleWater}
                        disabled={isGrowing || stage >= 4}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 text-5xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform disabled:opacity-50 active:scale-95"
                    >
                        💧
                    </button>
                    <button
                        onClick={handleSun}
                        disabled={isGrowing || stage >= 4}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-5xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform disabled:opacity-50 active:scale-95"
                    >
                        ☀️
                    </button>
                </div>
            </div>
        );
    };

    const renderComplete = () => {
        const plant = PLANTS[currentPlant];
        const nextPlant = PLANTS.findIndex((_, i) => !completedPlants.includes(i) && i !== currentPlant);

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-400 via-emerald-400 to-lime-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-8xl mb-4">{plant.final}</div>
                    <h2 className="text-2xl font-black text-green-600 mb-2">
                        {plant.name} Yetişti! 🎉
                    </h2>

                    <div className="flex justify-center my-4">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-4xl">⭐</span>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        {nextPlant !== -1 && (
                            <button
                                onClick={() => startPlant(nextPlant)}
                                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                            >
                                Sonraki: {PLANTS[nextPlant].final} {PLANTS[nextPlant].name}
                            </button>
                        )}
                        <button
                            onClick={() => startPlant(currentPlant)}
                            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Tekrar Yetiştir 🔄
                        </button>
                        <button
                            onClick={() => setGameState('menu')}
                            className="text-gray-500 font-medium hover:text-gray-700"
                        >
                            Bitki Seç
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
                    <ArrowLeftIcon className="w-6 h-6 text-green-600" />
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

export default PlantGrowingGameScreen;
