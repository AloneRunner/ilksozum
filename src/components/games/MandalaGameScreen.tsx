import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createMandalaSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playColor = (colorIndex: number) => {
        const freq = 300 + colorIndex * 80;
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
    };

    const playComplete = () => {
        [261, 329, 392, 523].forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.2);
            }, i * 80);
        });
    };

    return { playColor, playComplete };
};

// Colors for coloring
const COLORS = [
    { name: 'Kırmızı', color: '#EF4444' },
    { name: 'Turuncu', color: '#F97316' },
    { name: 'Sarı', color: '#EAB308' },
    { name: 'Yeşil', color: '#22C55E' },
    { name: 'Mavi', color: '#3B82F6' },
    { name: 'Mor', color: '#A855F7' },
    { name: 'Pembe', color: '#EC4899' },
    { name: 'Kahverengi', color: '#92400E' },
];

// Simple mandala patterns (as sector data)
interface MandalaSection {
    id: number;
    path: string;
    color: string | null;
}

interface MandalaPattern {
    name: string;
    sections: number;
    emoji: string;
}

const PATTERNS: MandalaPattern[] = [
    { name: 'Çiçek', sections: 8, emoji: '🌸' },
    { name: 'Yıldız', sections: 6, emoji: '⭐' },
    { name: 'Güneş', sections: 12, emoji: '☀️' },
    { name: 'Kalp', sections: 8, emoji: '❤️' },
];

interface MandalaGameScreenProps {
    onBack: () => void;
}

const MandalaGameScreen: React.FC<MandalaGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'coloring' | 'complete'>('menu');
    const [currentPattern, setCurrentPattern] = useState(0);
    const [selectedColor, setSelectedColor] = useState<string>(COLORS[0].color);
    const [sections, setSections] = useState<MandalaSection[]>([]);
    const [coloredCount, setColoredCount] = useState(0);
    const soundRef = useRef<ReturnType<typeof createMandalaSound> | null>(null);

    useEffect(() => {
        soundRef.current = createMandalaSound();
    }, []);

    const generateSections = useCallback((patternIndex: number) => {
        const pattern = PATTERNS[patternIndex];
        const newSections: MandalaSection[] = [];

        for (let i = 0; i < pattern.sections; i++) {
            newSections.push({
                id: i,
                path: '', // Will use CSS positioning
                color: null,
            });
        }

        return newSections;
    }, []);

    const startColoring = useCallback((patternIndex: number) => {
        setCurrentPattern(patternIndex);
        setSections(generateSections(patternIndex));
        setColoredCount(0);
        setSelectedColor(COLORS[0].color);
        setGameState('coloring');
    }, [generateSections]);

    const handleSectionClick = useCallback((sectionId: number) => {
        const colorIndex = COLORS.findIndex(c => c.color === selectedColor);
        soundRef.current?.playColor(colorIndex);

        setSections(prev => {
            const updated = prev.map(s =>
                s.id === sectionId ? { ...s, color: selectedColor } : s
            );

            const colored = updated.filter(s => s.color !== null).length;
            setColoredCount(colored);

            // Check if complete
            if (colored === PATTERNS[currentPattern].sections) {
                setTimeout(() => {
                    soundRef.current?.playComplete();
                    setGameState('complete');
                }, 300);
            }

            return updated;
        });
    }, [selectedColor, currentPattern]);

    const clearCanvas = useCallback(() => {
        setSections(generateSections(currentPattern));
        setColoredCount(0);
    }, [currentPattern, generateSections]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🎨</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-2">
                    Mandala Boyama
                </h1>
                <p className="text-gray-600 mb-2">Güzel desenler boya ve rahatla!</p>
                <p className="text-sm text-gray-500 mb-6">
                    Bir desen seç ve boyamaya başla
                </p>

                <div className="grid grid-cols-2 gap-3">
                    {PATTERNS.map((pattern, i) => (
                        <button
                            key={i}
                            onClick={() => startColoring(i)}
                            className="p-4 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 flex flex-col items-center gap-2 shadow-md hover:scale-105 transition-all"
                        >
                            <span className="text-4xl">{pattern.emoji}</span>
                            <span className="font-bold text-purple-700">{pattern.name}</span>
                            <span className="text-xs text-gray-500">{pattern.sections} parça</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderColoring = () => {
        const pattern = PATTERNS[currentPattern];
        const progress = Math.round((coloredCount / pattern.sections) * 100);

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-purple-100 via-pink-50 to-indigo-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-purple-600" />
                    </button>

                    <div className="text-center">
                        <div className="font-bold text-purple-700">{pattern.emoji} {pattern.name}</div>
                        <div className="text-xs text-gray-500">{coloredCount}/{pattern.sections} boyanmış</div>
                    </div>

                    <button
                        onClick={clearCanvas}
                        className="bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-600 hover:bg-gray-200"
                    >
                        Temizle
                    </button>
                </div>

                {/* Progress */}
                <div className="mx-4 mt-2">
                    <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                            className="bg-gradient-to-r from-pink-500 to-purple-500 h-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Mandala Area */}
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="relative w-72 h-72">
                        {/* Center Circle */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 to-amber-300 border-4 border-amber-400 z-10 flex items-center justify-center">
                                <span className="text-2xl">{pattern.emoji}</span>
                            </div>
                        </div>

                        {/* Sections */}
                        {sections.map((section, i) => {
                            const angle = (360 / pattern.sections) * i;
                            const size = 80;
                            const distance = 100;
                            const x = Math.cos((angle - 90) * Math.PI / 180) * distance + 144 - size / 2;
                            const y = Math.sin((angle - 90) * Math.PI / 180) * distance + 144 - size / 2;

                            // Shape based on pattern
                            const shapes = ['rounded-full', 'rounded-lg rotate-45', 'rounded-full', 'rounded-full'];
                            const shapeClass = shapes[currentPattern] || 'rounded-full';

                            return (
                                <button
                                    key={section.id}
                                    onClick={() => handleSectionClick(section.id)}
                                    className={`absolute w-16 h-16 ${shapeClass} border-2 border-gray-300 shadow-md transition-all hover:scale-110 active:scale-95`}
                                    style={{
                                        left: x,
                                        top: y,
                                        backgroundColor: section.color || '#f5f5f5',
                                        transform: `rotate(${angle}deg)`,
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>

                {/* Color Palette */}
                <div className="p-4 bg-white/90 rounded-t-3xl shadow-lg">
                    <p className="text-center text-gray-600 text-sm mb-3">Renk seç:</p>
                    <div className="flex justify-center gap-2 flex-wrap">
                        {COLORS.map((color, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedColor(color.color)}
                                className={`w-10 h-10 rounded-full transition-all ${selectedColor === color.color
                                        ? 'ring-4 ring-gray-400 scale-110'
                                        : 'hover:scale-105'
                                    }`}
                                style={{ backgroundColor: color.color }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderComplete = () => {
        const pattern = PATTERNS[currentPattern];
        const nextPattern = (currentPattern + 1) % PATTERNS.length;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-8xl mb-4">{pattern.emoji}</div>
                    <h2 className="text-2xl font-black text-purple-600 mb-2">
                        Harika Çalışma! 🎨
                    </h2>

                    <div className="flex justify-center my-4">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-4xl">⭐</span>
                        ))}
                    </div>

                    <p className="text-gray-600 mb-6">
                        {pattern.name} mandala tamamlandı!
                    </p>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => startColoring(nextPattern)}
                            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Sonraki: {PATTERNS[nextPattern].emoji} {PATTERNS[nextPattern].name}
                        </button>
                        <button
                            onClick={() => startColoring(currentPattern)}
                            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Tekrar Boya 🔄
                        </button>
                        <button
                            onClick={() => setGameState('menu')}
                            className="text-gray-500 font-medium hover:text-gray-700"
                        >
                            Desen Seç
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
            {gameState === 'coloring' && renderColoring()}
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

export default MandalaGameScreen;
