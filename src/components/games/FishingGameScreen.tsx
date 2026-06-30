import React, { useEffect, useRef, useState, useCallback } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import FishIcon from '../icons/FishIcon';

interface FishingGameScreenProps {
    onBack: () => void;
}

interface Fish {
    id: number;
    x: number;
    y: number;
    color: string;
    speed: number;
    direction: 1 | -1;
    size: number;
    wobbleOffset: number;
}

const SPAWN_MARGIN = 100; // Distance off-screen to spawn

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
}

interface Bubble {
    x: number;
    y: number;
    speed: number;
    size: number;
    wobble: number;
}

// Fish configuration (colors)
const FISH_TYPES = [
    { color: 'red', name: 'Kırmızı', hex: '#EF4444' },
    { color: 'blue', name: 'Mavi', hex: '#3B82F6' },
    { color: 'yellow', name: 'Sarı', hex: '#EAB308' },
    { color: 'green', name: 'Yeşil', hex: '#22C55E' },
    { color: 'orange', name: 'Turuncu', hex: '#F97316' },
    { color: 'purple', name: 'Mor', hex: '#A855F7' },
];

const FishingGameScreen: React.FC<FishingGameScreenProps> = ({ onBack }) => {
    // Game State
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [targetFish, setTargetFish] = useState(FISH_TYPES[0]);
    const [caughtCount, setCaughtCount] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);

    // Refs for Game Loop
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();
    const fishesRef = useRef<Fish[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const bubblesRef = useRef<Bubble[]>([]);

    const caughtTarget = 3 + level;

    // Helper: Create a single fish
    const createFish = useCallback((isInitial: boolean = false): Fish => {
        const fishType = FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)];
        const direction = Math.random() > 0.5 ? 1 : -1;

        let startX;
        if (isInitial) {
            startX = Math.random() * window.innerWidth;
        } else {
            // Spawn off-screen based on direction
            startX = direction === 1 ? -SPAWN_MARGIN : window.innerWidth + SPAWN_MARGIN;
        }

        return {
            id: Date.now() + Math.random(),
            x: startX,
            y: Math.random() * (window.innerHeight - 200) + 150,
            color: fishType.color,
            speed: (0.5 + Math.random() * 1.5) * (1 + (level || 1) * 0.1),
            direction: direction as 1 | -1,
            size: 40 + Math.random() * 20,
            wobbleOffset: Math.random() * Math.PI * 2,
        };
    }, [level]);

    // Initialize/Reset Game Level
    const initLevel = useCallback(() => {
        const fishCount = 10 + level * 3; // Increased count
        const newFishes: Fish[] = [];

        for (let i = 0; i < fishCount; i++) {
            newFishes.push(createFish(true));
        }
        fishesRef.current = newFishes;

        // Bubbles
        const newBubbles: Bubble[] = [];
        for (let i = 0; i < 15; i++) {
            newBubbles.push({
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + Math.random() * 100,
                speed: 1 + Math.random() * 2,
                size: 5 + Math.random() * 10,
                wobble: Math.random() * Math.PI * 2
            });
        }
        bubblesRef.current = newBubbles;

        setTargetFish(FISH_TYPES[Math.floor(Math.random() * Math.min(2 + level, FISH_TYPES.length))]);
        setCaughtCount(0);
        setShowSuccess(false);
    }, [level, createFish]);

    useEffect(() => {
        initLevel();
    }, [initLevel]);

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

    // The Game Loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Resize handling check (basic)
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // 1. Update & Draw Bubbles
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        bubblesRef.current.forEach(bubble => {
            bubble.y -= bubble.speed;
            bubble.x += Math.sin(Date.now() * 0.003 + bubble.wobble) * 0.5;

            // Reset if out of top
            if (bubble.y < -50) {
                bubble.y = canvas.height + 50;
                bubble.x = Math.random() * canvas.width;
            }

            ctx.beginPath();
            ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
            ctx.fill();
        });


        // 2. Update & Draw Fishes
        fishesRef.current.forEach(fish => {
            // Movement
            fish.x += fish.speed * fish.direction;
            fish.y += Math.sin(Date.now() * 0.003 + fish.wobbleOffset) * 0.5; // Gentle float

            // Bounds check - wrap around
            if (fish.direction === 1 && fish.x > canvas.width + 50) {
                fish.x = -50;
            } else if (fish.direction === -1 && fish.x < -50) {
                fish.x = canvas.width + 50;
            }

            // Draw Custom Fish
            ctx.save();
            ctx.translate(fish.x, fish.y);
            ctx.scale(fish.direction, 1); // Flip based on direction

            // Draw Fish Body
            ctx.fillStyle = FISH_TYPES.find(f => f.color === fish.color)?.hex || '#000';
            ctx.beginPath();
            // Ellipse for body
            ctx.ellipse(0, 0, fish.size / 2, fish.size * 0.35, 0, 0, Math.PI * 2);
            ctx.fill();

            // Tail
            ctx.beginPath();
            ctx.moveTo(fish.size * -0.4, 0);
            ctx.lineTo(fish.size * -0.7, fish.size * -0.3);
            ctx.lineTo(fish.size * -0.7, fish.size * 0.3);
            ctx.fill();

            // Eye
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(fish.size * 0.2, fish.size * -0.1, fish.size * 0.08, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(fish.size * 0.22, fish.size * -0.1, fish.size * 0.03, 0, Math.PI * 2);
            ctx.fill();

            // Fin
            ctx.fillStyle = FISH_TYPES.find(f => f.color === fish.color)?.hex || '#000';
            ctx.filter = 'brightness(0.9)'; // Slightly darker fin
            ctx.beginPath();
            ctx.moveTo(0, fish.size * -0.2);
            ctx.quadraticCurveTo(fish.size * 0.2, fish.size * -0.5, fish.size * -0.2, fish.size * -0.4);
            ctx.fill();
            ctx.filter = 'none';

            ctx.restore();
        });

        // 3. Update & Draw Particles (Success/Fail effects)
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.05;
            p.vy += 0.5; // Gravity

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
    }, []);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [animate]);


    // Handle Clicks/Touches
    const handleInteraction = (clientX: number, clientY: number) => {
        if (showSuccess) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Simple Hit Detection
        let caught = false;
        // Check array backwards to catch 'top' fish first
        for (let i = fishesRef.current.length - 1; i >= 0; i--) {
            const fish = fishesRef.current[i];
            // Simple circular hitbox
            const dx = clientX - fish.x;
            const dy = clientY - fish.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < fish.size * 0.8) {
                // CAUGHT!
                caught = true;

                // Visuals
                const fishMeta = FISH_TYPES.find(f => f.color === fish.color);
                createParticles(fish.x, fish.y, fishMeta?.hex || '#FFF');

                if (fish.color === targetFish.color) {
                    // Correct!
                    playSound(600, 'sine');
                    setScore(s => s + 10);
                    setCaughtCount(c => {
                        const newCount = c + 1;
                        if (newCount >= caughtTarget) {
                            setTimeout(() => setShowSuccess(true), 500);
                        }
                        return newCount;
                    });

                    // Remove fish
                    fishesRef.current.splice(i, 1);

                    // Spawn new fish to replace it
                    setTimeout(() => {
                        fishesRef.current.push(createFish(false));
                    }, 500);

                } else {
                    // Wrong!
                    playSound(150, 'sawtooth');
                }
                break; // Only catch one at a time
            }
        }

        if (!caught) {
            createParticles(clientX, clientY, '#A5F3FC');
        }
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-b from-sky-400 to-blue-800 flex flex-col items-center overflow-hidden">
            {/* Canvas Layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-pointer touch-none"
                onClick={(e) => handleInteraction(e.clientX, e.clientY)}
                onTouchStart={(e) => handleInteraction(e.touches[0].clientX, e.touches[0].clientY)}
            />

            {/* UI Overlay */}
            <div className="absolute top-0 w-full p-4 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto">
                    <button
                        onClick={onBack}
                        className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                    >
                        <ArrowLeftIcon className="w-6 h-6 text-blue-600" />
                    </button>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-2xl shadow-xl flex items-center gap-4 border-2 border-blue-100">
                        <span className="text-gray-500 font-medium text-sm">HEDEF</span>
                        <div className="flex items-center gap-2">
                            <FishIcon
                                size={40}
                                color={targetFish.hex}
                                className="filter drop-shadow-md animate-bounce"
                            />
                            <span className="font-bold text-xl" style={{ color: targetFish.hex }}>{targetFish.name}</span>
                        </div>
                        <div className="w-px h-8 bg-gray-200 mx-2"></div>
                        <span className="text-gray-600 font-bold">{caughtCount}/{caughtTarget}</span>
                    </div>
                </div>

                <div className="bg-white/90 px-4 py-2 rounded-full shadow-lg border-2 border-yellow-100">
                    <span className="text-yellow-500 font-bold text-xl">⭐ {score}</span>
                </div>
            </div>

            {/* Level Up Overlay */}
            {showSuccess && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] p-8 text-center shadow-2xl animate-in zoom-in duration-300 max-w-sm mx-4">
                        <div className="text-7xl mb-4 animate-bounce">🎉</div>
                        <h2 className="text-3xl font-bold text-blue-600 mb-2">Harika İş!</h2>
                        <p className="text-gray-600 mb-6">Tüm balıkları yakaladın.</p>
                        <button
                            onClick={() => setLevel(l => l + 1)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transform transition active:scale-95 text-xl"
                        >
                            Devam Et
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FishingGameScreen;
