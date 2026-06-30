import React, { useEffect, useRef, useState, useCallback } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

interface FruitCollectorGameScreenProps {
    onBack: () => void;
}

interface Fruit {
    id: number;
    type: string; // 'red', 'yellow', etc.
    emoji: string;
    x: number;
    y: number;
    speed: number;
    size: number;
    rotation: number;
    rotationSpeed: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
}

const FRUIT_TYPES = [
    { type: 'red', emoji: '🍎', name: 'Elma', color: '#EF4444' },
    { type: 'yellow', emoji: '🍌', name: 'Muz', color: '#EAB308' },
    { type: 'orange', emoji: '🍊', name: 'Portakal', color: '#F97316' },
    { type: 'green', emoji: '🍐', name: 'Armut', color: '#22C55E' },
    { type: 'purple', emoji: '🍇', name: 'Üzüm', color: '#A855F7' },
];

const FruitCollectorGameScreen: React.FC<FruitCollectorGameScreenProps> = ({ onBack }) => {
    // Game UI State
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [targetFruit, setTargetFruit] = useState(FRUIT_TYPES[0]);
    const [collectedCount, setCollectedCount] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    // Canvas & Game Loop Refs
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();
    const fruitsRef = useRef<Fruit[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const basketRef = useRef({ x: window.innerWidth / 2, width: 100, height: 60 });
    const lastSpawnTimeRef = useRef(0);

    const collectTarget = 5 + level * 2;

    // Audio Helper
    const playSound = useCallback((freq: number, type: OscillatorType = 'sine') => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
            osc.start();
            osc.stop(ctx.currentTime + 0.15);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const createParticles = (x: number, y: number, colorHex: string) => {
        for (let i = 0; i < 8; i++) {
            particlesRef.current.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0,
                color: colorHex,
                size: 5 + Math.random() * 5
            });
        }
    };

    // Initialize Level
    const initLevel = useCallback(() => {
        fruitsRef.current = [];
        particlesRef.current = [];
        setCollectedCount(0);
        setShowSuccess(false); // Ensure success screen is hidden

        // Pick new random target not just first one to avoid repetition
        const availableTypes = FRUIT_TYPES.slice(0, Math.min(2 + level, FRUIT_TYPES.length));
        setTargetFruit(availableTypes[Math.floor(Math.random() * availableTypes.length)]);

    }, [level]);

    useEffect(() => {
        initLevel();
    }, [initLevel]);


    // Game Loop
    const animate = useCallback((time: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Resize
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Update basket Y position to be near bottom
            basketRef.current.x = Math.min(Math.max(basketRef.current.x, 0), canvas.width);
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Spawn Fruits
        if (time - lastSpawnTimeRef.current > Math.max(800 - level * 50, 400)) {
            lastSpawnTimeRef.current = time;
            // Choose type based on level
            const availableTypes = FRUIT_TYPES.slice(0, Math.min(2 + level, FRUIT_TYPES.length));
            const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];

            fruitsRef.current.push({
                id: Date.now() + Math.random(),
                type: type.type,
                emoji: type.emoji,
                x: Math.random() * (canvas.width - 40) + 20,
                y: -50,
                speed: (2 + Math.random() * 2) + (level * 0.2), // Gravity-ish
                size: 40 + Math.random() * 10,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.1
            });
        }

        // Draw Basket
        const basketY = canvas.height - 100;
        const basketX = basketRef.current.x;

        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 10;

        ctx.font = '60px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🧺', basketX, basketY);

        // Visual indicator of target on basket
        ctx.font = '30px serif';
        ctx.fillText(targetFruit.emoji, basketX, basketY + 10);

        ctx.restore();

        // Update & Draw Fruits
        for (let i = fruitsRef.current.length - 1; i >= 0; i--) {
            const fruit = fruitsRef.current[i];

            fruit.y += fruit.speed;
            fruit.rotation += fruit.rotationSpeed;

            // Draw
            ctx.save();
            ctx.translate(fruit.x, fruit.y);
            ctx.rotate(fruit.rotation);
            ctx.font = `${fruit.size}px serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(fruit.emoji, 0, 0);
            ctx.restore();

            // Collision with Basket
            const distX = Math.abs(fruit.x - basketX);
            const distY = Math.abs(fruit.y - basketY);

            // Simple box/circle collision
            if (distY < 50 && distX < 50) {
                // CAUGHT
                const meta = FRUIT_TYPES.find(f => f.type === fruit.type);
                createParticles(fruit.x, fruit.y, meta?.color || '#FFF');

                if (fruit.type === targetFruit.type) {
                    // Correct
                    playSound(600, 'sine');
                    setScore(s => s + 10);
                    setCollectedCount(c => {
                        const n = c + 1;
                        if (n >= collectTarget) {
                            setTimeout(() => setShowSuccess(true), 100);
                        }
                        return n;
                    });
                } else {
                    // Wrong
                    playSound(150, 'sawtooth');
                    setScore(s => Math.max(0, s - 5)); // Penalty?
                }

                fruitsRef.current.splice(i, 1);
                continue;
            }

            // Missed / Out of bounds
            if (fruit.y > canvas.height + 50) {
                fruitsRef.current.splice(i, 1);
            }
        }

        // Update & Draw Particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.05;
            p.vy += 0.5;

            if (p.life <= 0) {
                particlesRef.current.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }

        requestRef.current = requestAnimationFrame(animate);
    }, [targetFruit, collectTarget, level, playSound, showSuccess]); // showSuccess added to deps if it stops animation? actually better not to stop

    useEffect(() => {
        // Start loop
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [animate]);

    // Input Handling
    const handleMove = (clientX: number) => {
        if (showSuccess) return;
        basketRef.current.x = clientX;
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-green-200 flex flex-col overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-8 right-8 w-24 h-24 bg-yellow-300 rounded-full blur-xl opacity-60"></div>
                {/* Trees/Grass at bottom could be simple CSS shapes or gradient */}
                <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-green-600 to-transparent opacity-40"></div>
            </div>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-col-resize touch-none"
                onMouseMove={(e) => handleMove(e.clientX)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            />

            {/* UI Overlay */}
            <div className="absolute top-0 w-full p-4 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto">
                    <button
                        onClick={onBack}
                        className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                    >
                        <ArrowLeftIcon className="w-6 h-6 text-green-600" />
                    </button>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl shadow-xl flex items-center gap-4 border-2 border-green-100">
                        <span className="text-gray-500 font-medium text-sm">TOPLA</span>
                        <div className="flex items-center gap-2">
                            <span className="text-4xl animate-bounce">{targetFruit.emoji}</span>
                            <span className="font-bold text-xl" style={{ color: targetFruit.color }}>{targetFruit.name}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200 mx-2"></div>
                        <span className="text-gray-600 font-bold">{collectedCount}/{collectTarget}</span>
                    </div>
                </div>

                <div className="bg-white/90 px-4 py-2 rounded-full shadow-lg border-2 border-yellow-100">
                    <span className="text-yellow-500 font-bold text-xl">⭐ {score}</span>
                </div>
            </div>

            <div className="absolute bottom-4 w-full text-center pointer-events-none text-green-800/60 font-medium">
                Parmağını kaydırarak sepeti hareket ettir!
            </div>

            {/* Level Up Overlay */}
            {showSuccess && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm pointer-events-auto">
                    <div className="bg-white rounded-[2rem] p-8 text-center shadow-2xl animate-in zoom-in duration-300 max-w-sm mx-4">
                        <div className="text-7xl mb-4 animate-bounce">🎉</div>
                        <h2 className="text-3xl font-bold text-green-600 mb-2">Mükemmel!</h2>
                        <p className="text-gray-600 mb-6">Tüm meyveleri topladın.</p>
                        <button
                            onClick={() => setLevel(l => l + 1)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transform transition active:scale-95 text-xl"
                        >
                            Devam Et
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FruitCollectorGameScreen;
