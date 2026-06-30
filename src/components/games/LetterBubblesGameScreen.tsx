import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createBubbleSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playPop = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
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
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.15);
            }, i * 80);
        });
    };

    const playWrong = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    };

    const speakLetter = (letter: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(letter);
            utterance.lang = 'tr-TR';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    };

    return { playPop, playCorrect, playWrong, speakLetter };
};

// --- Turkish Alphabet ---
const TURKISH_ALPHABET = [
    'A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H',
    'I', 'İ', 'J', 'K', 'L', 'M', 'N', 'O', 'Ö', 'P',
    'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z'
];

const BUBBLE_COLORS = [
    'from-rose-400 to-pink-500',
    'from-violet-400 to-purple-500',
    'from-blue-400 to-indigo-500',
    'from-cyan-400 to-teal-500',
    'from-emerald-400 to-green-500',
    'from-amber-400 to-orange-500',
];

interface Bubble {
    id: number;
    letter: string;
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    color: string;
    popped: boolean;
}

interface LetterBubblesGameScreenProps {
    onBack: () => void;
}

const LetterBubblesGameScreen: React.FC<LetterBubblesGameScreenProps> = ({ onBack }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
    const [targetLetter, setTargetLetter] = useState<string>('');
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [round, setRound] = useState(0);
    const [totalRounds] = useState(10);
    const soundRef = useRef<ReturnType<typeof createBubbleSound> | null>(null);
    const animationRef = useRef<number>(0);
    const bubblesRef = useRef<Bubble[]>([]);

    useEffect(() => {
        soundRef.current = createBubbleSound();
    }, []);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const createBubble = (id: number, letter: string, canvasWidth: number): Bubble => {
        // Use window.innerWidth for accurate mobile detection
        const screenWidth = window.innerWidth;
        const isMobile = screenWidth < 600;

        // Fixed sizes that work well on mobile
        const bubbleSize = isMobile ? 44 + Math.random() * 8 : 50 + Math.random() * 10; // 44-52px on mobile

        return {
            id,
            letter,
            x: Math.random() * (canvasWidth - bubbleSize * 2) + bubbleSize,
            y: window.innerHeight + Math.random() * 50, // Start just below visible area
            size: bubbleSize,
            speedY: isMobile ? -(1.2 + Math.random() * 0.4) : -(0.8 + Math.random() * 0.4), // Faster on mobile
            speedX: (Math.random() - 0.5) * 0.3,
            color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
            popped: false,
        };
    };

    const startRound = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Pick target letter
        const target = TURKISH_ALPHABET[Math.floor(Math.random() * TURKISH_ALPHABET.length)];
        setTargetLetter(target);

        // Speak the letter
        setTimeout(() => {
            soundRef.current?.speakLetter(target);
        }, 500);

        // Create bubbles - fewer on mobile to prevent overlap
        const isMobile = canvas.width < 500;
        const numDistractors = isMobile ? 3 : 5; // 4 bubbles on mobile, 6 on desktop
        const letters = shuffleArray(TURKISH_ALPHABET.filter(l => l !== target)).slice(0, numDistractors);
        // Add target letter
        letters.splice(Math.floor(Math.random() * (letters.length + 1)), 0, target);

        let idCounter = 0;
        const newBubbles = letters.map(letter =>
            createBubble(idCounter++, letter, canvas.width)
        );

        bubblesRef.current = newBubbles;
        setBubbles(newBubbles);
    }, []);

    const startGame = useCallback(() => {
        setScore(0);
        setLives(3);
        setRound(1);
        setGameState('playing');
    }, []);

    useEffect(() => {
        if (gameState === 'playing' && round > 0) {
            startRound();
        }
    }, [gameState, round, startRound]);

    // Animation loop
    useEffect(() => {
        if (gameState !== 'playing') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const animate = () => {
            // Update bubble positions
            bubblesRef.current = bubblesRef.current.map(bubble => {
                if (bubble.popped) return bubble;

                let newY = bubble.y + bubble.speedY;
                let newX = bubble.x + bubble.speedX;

                // Bounce off walls
                if (newX < bubble.size / 2 || newX > canvas.width - bubble.size / 2) {
                    bubble.speedX *= -1;
                    newX = Math.max(bubble.size / 2, Math.min(canvas.width - bubble.size / 2, newX));
                }

                return { ...bubble, x: newX, y: newY };
            });

            // Check if bubbles escaped
            const escaped = bubblesRef.current.filter(b => !b.popped && b.y < -b.size);
            if (escaped.some(b => b.letter === targetLetter)) {
                // Target letter escaped - lose a life
                setLives(l => {
                    const newLives = l - 1;
                    if (newLives <= 0) {
                        setGameState('result');
                    } else {
                        // Next round
                        setTimeout(() => setRound(r => r + 1), 500);
                    }
                    return newLives;
                });
                return;
            }

            setBubbles([...bubblesRef.current]);

            // Continue animation if bubbles remain
            if (bubblesRef.current.some(b => !b.popped && b.y > -b.size)) {
                animationRef.current = requestAnimationFrame(animate);
            }
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [gameState, targetLetter]);

    // Draw bubbles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || gameState !== 'playing') return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear
        ctx.fillStyle = 'rgba(135, 206, 250, 0.95)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw bubbles
        bubbles.forEach(bubble => {
            if (bubble.popped) return;

            const x = bubble.x;
            const y = bubble.y;
            const r = bubble.size / 2;

            // Bubble gradient
            const gradient = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
            gradient.addColorStop(0.3, 'rgba(200, 230, 255, 0.7)');
            gradient.addColorStop(1, 'rgba(100, 180, 255, 0.5)');

            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Border
            ctx.strokeStyle = 'rgba(100, 150, 255, 0.6)';
            ctx.lineWidth = 2;
            ctx.stroke();

            // Letter
            ctx.fillStyle = '#1e3a5f';
            ctx.font = `bold ${bubble.size * 0.5}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(bubble.letter, x, y);
        });
    }, [bubbles, gameState]);

    // Handle canvas resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleBubbleClick = useCallback((clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Find clicked bubble
        const clickedBubble = bubblesRef.current.find(b => {
            if (b.popped) return false;
            const dx = b.x - x;
            const dy = b.y - y;
            return Math.sqrt(dx * dx + dy * dy) < b.size / 2;
        });

        if (!clickedBubble) return;

        soundRef.current?.playPop();

        // Mark as popped
        bubblesRef.current = bubblesRef.current.map(b =>
            b.id === clickedBubble.id ? { ...b, popped: true } : b
        );
        setBubbles([...bubblesRef.current]);

        if (clickedBubble.letter === targetLetter) {
            // Correct!
            soundRef.current?.playCorrect();
            setScore(s => s + 1);

            // Next round
            setTimeout(() => {
                if (round >= totalRounds) {
                    setGameState('result');
                } else {
                    setRound(r => r + 1);
                }
            }, 500);
        } else {
            // Wrong
            soundRef.current?.playWrong();
            setLives(l => {
                const newLives = l - 1;
                if (newLives <= 0) {
                    setTimeout(() => setGameState('result'), 500);
                }
                return newLives;
            });
        }
    }, [targetLetter, round, totalRounds]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🔤</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                    Harf Baloncukları
                </h1>
                <p className="text-gray-600 mb-2">Söylenen harfi bul ve patlat!</p>
                <p className="text-sm text-gray-500 mb-6">
                    Ekranda yüzen baloncuklarda harfler var. Söylenen harfi bul ve dokun!
                </p>

                <button
                    onClick={startGame}
                    className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                >
                    Başla! 🎈
                </button>
            </div>
        </div>
    );

    const renderResult = () => {
        const percent = Math.round((score / totalRounds) * 100);
        const stars = percent >= 90 ? 3 : percent >= 60 ? 2 : 1;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">{percent >= 80 ? '🏆' : percent >= 50 ? '🎉' : '💪'}</div>
                    <h2 className="text-2xl font-black text-blue-600 mb-2">
                        {lives > 0 ? 'Oyun Bitti!' : 'Canlar Tükendi!'}
                    </h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">{i <= stars ? '⭐' : '☆'}</span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl p-4 mb-4 text-white">
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
                    <ArrowLeftIcon className="w-6 h-6 text-blue-600" />
                </button>
            )}

            {gameState === 'menu' && renderMenu()}

            {gameState === 'playing' && (
                <>
                    <canvas
                        ref={canvasRef}
                        className="block w-full h-full touch-none"
                        onClick={(e) => handleBubbleClick(e.clientX, e.clientY)}
                        onTouchStart={(e) => {
                            const touch = e.touches[0];
                            handleBubbleClick(touch.clientX, touch.clientY);
                        }}
                    />

                    {/* Header UI */}
                    <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between pointer-events-none">
                        <button onClick={onBack} className="bg-white/90 rounded-full p-2 shadow-lg pointer-events-auto">
                            <ArrowLeftIcon className="w-5 h-5 text-blue-600" />
                        </button>

                        <div className="flex gap-2">
                            <div className="bg-white/90 rounded-full px-4 py-1 shadow-lg">
                                <span className="font-bold text-blue-800">{round}/{totalRounds}</span>
                            </div>
                            <div className="bg-white/90 rounded-full px-4 py-1 shadow-lg">
                                <span className="font-bold text-emerald-600">⭐ {score}</span>
                            </div>
                            <div className="bg-white/90 rounded-full px-4 py-1 shadow-lg">
                                {'❤️'.repeat(lives)}{'🖤'.repeat(3 - lives)}
                            </div>
                        </div>
                    </div>

                    {/* Target Letter */}
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-white/95 rounded-2xl px-6 py-3 shadow-xl pointer-events-none">
                        <p className="text-sm text-gray-600">Bu harfi bul:</p>
                        <p className="text-4xl font-black text-blue-600 text-center">{targetLetter}</p>
                        <button
                            onClick={() => soundRef.current?.speakLetter(targetLetter)}
                            className="mt-1 text-sm text-blue-500 hover:text-blue-700 pointer-events-auto"
                        >
                            🔊 Tekrar Dinle
                        </button>
                    </div>
                </>
            )}

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

export default LetterBubblesGameScreen;
