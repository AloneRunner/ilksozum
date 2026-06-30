import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createDotsSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playConnect = (index: number, total: number) => {
        const freq = 300 + (index / total) * 400;
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

    return { playConnect, playComplete };
};

// --- Dot Patterns (as percentage of canvas) ---
const PATTERNS = [
    {
        name: 'Yıldız',
        emoji: '⭐',
        dots: [
            { x: 50, y: 10 },   // 1 - top
            { x: 62, y: 38 },   // 2
            { x: 95, y: 38 },   // 3
            { x: 70, y: 58 },   // 4
            { x: 80, y: 90 },   // 5
            { x: 50, y: 72 },   // 6
            { x: 20, y: 90 },   // 7
            { x: 30, y: 58 },   // 8
            { x: 5, y: 38 },    // 9
            { x: 38, y: 38 },   // 10 - back to start area
        ],
        closeLoop: true,
    },
    {
        name: 'Ev',
        emoji: '🏠',
        dots: [
            { x: 50, y: 10 },   // 1 - roof top
            { x: 85, y: 40 },   // 2 - roof right
            { x: 85, y: 90 },   // 3 - bottom right
            { x: 15, y: 90 },   // 4 - bottom left
            { x: 15, y: 40 },   // 5 - roof left
        ],
        closeLoop: true,
    },
    {
        name: 'Kalp',
        emoji: '❤️',
        dots: [
            { x: 50, y: 25 },   // 1
            { x: 70, y: 15 },   // 2
            { x: 90, y: 25 },   // 3
            { x: 90, y: 45 },   // 4
            { x: 50, y: 90 },   // 5 - bottom
            { x: 10, y: 45 },   // 6
            { x: 10, y: 25 },   // 7
            { x: 30, y: 15 },   // 8
        ],
        closeLoop: true,
    },
    {
        name: 'Balon',
        emoji: '🎈',
        dots: [
            { x: 50, y: 10 },   // 1 - top
            { x: 75, y: 20 },   // 2
            { x: 85, y: 40 },   // 3
            { x: 75, y: 60 },   // 4
            { x: 50, y: 70 },   // 5
            { x: 50, y: 90 },   // 6 - string bottom
            { x: 50, y: 70 },   // 7 - back up
            { x: 25, y: 60 },   // 8
            { x: 15, y: 40 },   // 9
            { x: 25, y: 20 },   // 10
        ],
        closeLoop: true,
    },
    {
        name: 'Elma',
        emoji: '🍎',
        dots: [
            { x: 50, y: 5 },    // 1 - stem
            { x: 50, y: 20 },   // 2
            { x: 75, y: 25 },   // 3
            { x: 90, y: 50 },   // 4
            { x: 75, y: 80 },   // 5
            { x: 50, y: 90 },   // 6 - bottom
            { x: 25, y: 80 },   // 7
            { x: 10, y: 50 },   // 8
            { x: 25, y: 25 },   // 9
        ],
        closeLoop: true,
    },
];

interface Dot {
    x: number;
    y: number;
    number: number;
    connected: boolean;
}

interface ConnectDotsGameScreenProps {
    onBack: () => void;
}

const ConnectDotsGameScreen: React.FC<ConnectDotsGameScreenProps> = ({ onBack }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'complete'>('menu');
    const [currentPattern, setCurrentPattern] = useState(0);
    const [dots, setDots] = useState<Dot[]>([]);
    const [connections, setConnections] = useState<number[]>([]);
    const [nextDot, setNextDot] = useState(1);
    const [completedPatterns, setCompletedPatterns] = useState<number[]>([]);
    const soundRef = useRef<ReturnType<typeof createDotsSound> | null>(null);

    useEffect(() => {
        soundRef.current = createDotsSound();
    }, []);

    // Initialize dots from pattern
    const initPattern = useCallback((patternIndex: number) => {
        const pattern = PATTERNS[patternIndex];
        const newDots: Dot[] = pattern.dots.map((d, i) => ({
            x: d.x,
            y: d.y,
            number: i + 1,
            connected: false,
        }));

        setDots(newDots);
        setConnections([]);
        setNextDot(1);
        setCurrentPattern(patternIndex);
        setGameState('playing');
    }, []);

    // Handle dot click
    const handleDotClick = useCallback((dotNumber: number) => {
        if (dotNumber !== nextDot) return;

        soundRef.current?.playConnect(dotNumber, dots.length);

        // Mark as connected
        setDots(prev => prev.map(d =>
            d.number === dotNumber ? { ...d, connected: true } : d
        ));

        // Add to connections
        setConnections(prev => [...prev, dotNumber]);
        setNextDot(dotNumber + 1);

        // Check if complete
        if (dotNumber === dots.length) {
            soundRef.current?.playComplete();
            setCompletedPatterns(prev => [...prev, currentPattern]);
            setTimeout(() => setGameState('complete'), 500);
        }
    }, [nextDot, dots.length, currentPattern]);

    // Draw on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || gameState !== 'playing') return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const w = canvas.width;
        const h = canvas.height;
        const padding = 40;
        const usableW = w - padding * 2;
        const usableH = h - padding * 2;

        // Clear
        ctx.fillStyle = '#fef9e7';
        ctx.fillRect(0, 0, w, h);

        // Draw connections
        ctx.strokeStyle = '#3b82f6';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (connections.length > 1) {
            ctx.beginPath();
            for (let i = 0; i < connections.length; i++) {
                const dot = dots.find(d => d.number === connections[i]);
                if (!dot) continue;

                const x = padding + (dot.x / 100) * usableW;
                const y = padding + (dot.y / 100) * usableH;

                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            // Close loop if complete
            if (connections.length === dots.length && PATTERNS[currentPattern].closeLoop) {
                const firstDot = dots.find(d => d.number === 1);
                if (firstDot) {
                    const x = padding + (firstDot.x / 100) * usableW;
                    const y = padding + (firstDot.y / 100) * usableH;
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }

        // Draw dots
        dots.forEach(dot => {
            const x = padding + (dot.x / 100) * usableW;
            const y = padding + (dot.y / 100) * usableH;
            const radius = dot.number === nextDot ? 24 : 20;

            // Dot circle
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);

            if (dot.connected) {
                ctx.fillStyle = '#22c55e';
            } else if (dot.number === nextDot) {
                ctx.fillStyle = '#f59e0b';
            } else {
                ctx.fillStyle = '#94a3b8';
            }
            ctx.fill();

            // Border
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 3;
            ctx.stroke();

            // Number
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(String(dot.number), x, y);
        });

    }, [dots, connections, nextDot, gameState, currentPattern]);

    // Handle canvas click
    const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;

        const w = canvas.width;
        const h = canvas.height;
        const padding = 40;
        const usableW = w - padding * 2;
        const usableH = h - padding * 2;

        // Find clicked dot
        for (const dot of dots) {
            const x = padding + (dot.x / 100) * usableW;
            const y = padding + (dot.y / 100) * usableH;
            const dist = Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2);

            if (dist < 30) {
                handleDotClick(dot.number);
                break;
            }
        }
    }, [dots, handleDotClick]);

    const handleCanvasTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
        e.preventDefault();
        const touch = e.touches[0];
        const canvas = canvasRef.current;
        if (!canvas || !touch) return;

        const rect = canvas.getBoundingClientRect();
        const touchX = touch.clientX - rect.left;
        const touchY = touch.clientY - rect.top;

        const w = canvas.width;
        const h = canvas.height;
        const padding = 40;
        const usableW = w - padding * 2;
        const usableH = h - padding * 2;

        for (const dot of dots) {
            const x = padding + (dot.x / 100) * usableW;
            const y = padding + (dot.y / 100) * usableH;
            const dist = Math.sqrt((touchX - x) ** 2 + (touchY - y) ** 2);

            if (dist < 40) {
                handleDotClick(dot.number);
                break;
            }
        }
    }, [dots, handleDotClick]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">✏️</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                    Noktaları Birleştir
                </h1>
                <p className="text-gray-600 mb-6">Sayıları sırayla takip et ve resmi tamamla!</p>

                <div className="grid grid-cols-2 gap-3">
                    {PATTERNS.map((pattern, i) => (
                        <button
                            key={i}
                            onClick={() => initPattern(i)}
                            className={`p-4 rounded-xl shadow-md flex flex-col items-center gap-2 transition-all hover:scale-105 ${completedPatterns.includes(i)
                                    ? 'bg-green-100 border-2 border-green-400'
                                    : 'bg-white border-2 border-gray-200'
                                }`}
                        >
                            <span className="text-4xl">{pattern.emoji}</span>
                            <span className="font-medium text-gray-700">{pattern.name}</span>
                            {completedPatterns.includes(i) && (
                                <span className="text-green-600 text-sm">✓ Tamamlandı</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        const pattern = PATTERNS[currentPattern];

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-blue-200 to-indigo-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-indigo-600" />
                    </button>

                    <div className="text-center">
                        <span className="text-2xl mr-2">{pattern.emoji}</span>
                        <span className="font-bold text-indigo-700">{pattern.name}</span>
                    </div>

                    <div className="bg-indigo-500 text-white rounded-full px-3 py-1 font-bold">
                        {connections.length}/{dots.length}
                    </div>
                </div>

                {/* Instruction */}
                <div className="text-center py-2">
                    <p className="text-indigo-800 font-semibold">
                        {nextDot <= dots.length
                            ? `${nextDot} numaralı noktaya dokun!`
                            : 'Tamamlandı!'
                        }
                    </p>
                </div>

                {/* Canvas */}
                <div className="flex-1 p-4">
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full rounded-2xl shadow-lg bg-amber-50"
                        onClick={handleCanvasClick}
                        onTouchStart={handleCanvasTouch}
                    />
                </div>
            </div>
        );
    };

    const renderComplete = () => {
        const pattern = PATTERNS[currentPattern];
        const nextPatternIndex = PATTERNS.findIndex((_, i) => !completedPatterns.includes(i) && i !== currentPattern);

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-7xl mb-4">{pattern.emoji}</div>
                    <h2 className="text-2xl font-black text-emerald-600 mb-2">
                        Harika! {pattern.name} tamamlandı!
                    </h2>

                    <div className="flex justify-center my-4">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-4xl">⭐</span>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        {nextPatternIndex !== -1 && (
                            <button
                                onClick={() => initPattern(nextPatternIndex)}
                                className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                            >
                                Sonraki: {PATTERNS[nextPatternIndex].emoji} {PATTERNS[nextPatternIndex].name}
                            </button>
                        )}
                        <button
                            onClick={() => initPattern(currentPattern)}
                            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Tekrar Çiz 🔄
                        </button>
                        <button
                            onClick={() => setGameState('menu')}
                            className="text-gray-500 font-medium hover:text-gray-700"
                        >
                            Şekil Seç
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

export default ConnectDotsGameScreen;
