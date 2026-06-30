import React, { useRef, useEffect, useState, useCallback } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Soft Sound Effects (Web Audio API) ---
const createSoftSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playDrop = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    };

    const playMerge = (level: number) => {
        const baseFreq = 300 + level * 50;
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(baseFreq + i * 100, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.12);
            }, i * 50);
        }
    };

    const playGameOver = () => {
        [300, 250, 200].forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.2);
            }, i * 150);
        });
    };

    return { playDrop, playMerge, playGameOver };
};

// --- Types ---
interface Fruit {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    level: number; // 0-9, determines which fruit
    mass: number;  // Mass based on level for realistic physics
    merging: boolean;
    dropped: boolean; // Has this fruit been released?
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

// --- Constants ---
const BASE_GRAVITY = 0.25;
const FRICTION = 0.985;
const BOUNCE = 0.4;
const WALL_PADDING = 15; // Side walls - thin
const DROP_ZONE_HEIGHT = 160; // Top zone where UI lives - fruits start below this

// Fruit evolution chain with emojis, colors, sizes and masses
const FRUITS = [
    { emoji: '🍒', color: '#dc2626', baseRadius: 22, mass: 1.0 },    // Cherry - lightest
    { emoji: '🍓', color: '#ef4444', baseRadius: 28, mass: 1.4 },    // Strawberry
    { emoji: '🍊', color: '#f97316', baseRadius: 35, mass: 2.0 },    // Orange
    { emoji: '🍋', color: '#facc15', baseRadius: 42, mass: 2.8 },    // Lemon
    { emoji: '🍎', color: '#dc2626', baseRadius: 48, mass: 3.8 },    // Apple
    { emoji: '🍐', color: '#84cc16', baseRadius: 55, mass: 5.0 },    // Pear
    { emoji: '🍑', color: '#fb923c', baseRadius: 62, mass: 6.5 },    // Peach
    { emoji: '🍈', color: '#a3e635', baseRadius: 70, mass: 8.5 },    // Melon
    { emoji: '🍉', color: '#22c55e', baseRadius: 80, mass: 11.0 },   // Watermelon - heaviest
    { emoji: '🌟', color: '#fbbf24', baseRadius: 90, mass: 15.0 },   // Star (final)
];

// Points for merging at each level
const MERGE_POINTS = [10, 20, 40, 80, 160, 320, 640, 1280, 2560, 5000];

const MergeDropGameScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('mergeDropHighScore');
        return saved ? parseInt(saved, 10) : 0;
    });

    // Game state refs
    const fruitsRef = useRef<Fruit[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const nextFruitLevelRef = useRef(0);
    const previewFruitLevelRef = useRef(0);
    const frameIdRef = useRef(0);
    const fruitIdCounterRef = useRef(0);
    const gameOverLineRef = useRef(DROP_ZONE_HEIGHT);
    const scoreRef = useRef(0);

    // Dragging state refs
    const isDraggingRef = useRef(false);
    const dragFruitRef = useRef<Fruit | null>(null);
    const dragXRef = useRef(0);
    const canSpawnRef = useRef(true);

    // Sound effects ref
    const soundRef = useRef<ReturnType<typeof createSoftSound> | null>(null);

    // Initialize sounds
    useEffect(() => {
        soundRef.current = createSoftSound();
    }, []);

    // Initialize game
    const initGame = useCallback(() => {
        fruitsRef.current = [];
        particlesRef.current = [];
        nextFruitLevelRef.current = Math.floor(Math.random() * 3); // 0-2 for starting fruits
        previewFruitLevelRef.current = Math.floor(Math.random() * 3);
        fruitIdCounterRef.current = 0;
        scoreRef.current = 0;
        setScore(0);
        isDraggingRef.current = false;
        dragFruitRef.current = null;
        canSpawnRef.current = true;

        if (canvasRef.current) {
            dragXRef.current = canvasRef.current.width / 2;
            gameOverLineRef.current = DROP_ZONE_HEIGHT;
        }

        setGameState('playing');
    }, []);

    // Spawn a new draggable fruit
    const spawnDragFruit = useCallback(() => {
        if (!canSpawnRef.current || dragFruitRef.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const level = nextFruitLevelRef.current;
        const fruitData = FRUITS[level];

        dragFruitRef.current = {
            id: fruitIdCounterRef.current++,
            x: dragXRef.current,
            y: 60,
            vx: 0,
            vy: 0,
            radius: fruitData.baseRadius,
            level,
            mass: fruitData.mass,
            merging: false,
            dropped: false,
        };

        // Prepare next fruit
        nextFruitLevelRef.current = previewFruitLevelRef.current;
        previewFruitLevelRef.current = Math.floor(Math.random() * 4); // 0-3 for variety
    }, []);

    // Create merge particles
    const createMergeParticles = useCallback((x: number, y: number, color: string, intensity: number = 1) => {
        const count = Math.floor(12 * intensity);
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = (3 + Math.random() * 3) * intensity;
            particlesRef.current.push({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1,
                color,
                size: (4 + Math.random() * 4) * intensity,
            });
        }
    }, []);

    // Check collision between two fruits
    const checkCollision = (a: Fruit, b: Fruit): boolean => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist < a.radius + b.radius;
    };

    // Mass-based collision resolution
    const resolveCollision = (a: Fruit, b: Fruit) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) return;

        const overlap = (a.radius + b.radius - dist) / 2;
        const nx = dx / dist;
        const ny = dy / dist;

        // Mass ratio for realistic physics
        const totalMass = a.mass + b.mass;
        const ratioA = b.mass / totalMass; // Lighter object moves more
        const ratioB = a.mass / totalMass;

        // Separate fruits based on mass
        a.x -= nx * overlap * ratioA * 1.1;
        a.y -= ny * overlap * ratioA * 1.1;
        b.x += nx * overlap * ratioB * 1.1;
        b.y += ny * overlap * ratioB * 1.1;

        // Velocity exchange based on mass (momentum conservation)
        const dvx = a.vx - b.vx;
        const dvy = a.vy - b.vy;
        const dvn = dvx * nx + dvy * ny;

        if (dvn > 0) {
            // Elastic collision with mass consideration
            const restitution = 0.6;
            const impulse = (2 * dvn * restitution) / totalMass;

            a.vx -= impulse * b.mass * nx;
            a.vy -= impulse * b.mass * ny;
            b.vx += impulse * a.mass * nx;
            b.vy += impulse * a.mass * ny;
        }
    };

    // Update game physics
    const update = useCallback(() => {
        if (gameState !== 'playing') return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const { width, height } = canvas;
        const fruits = fruitsRef.current;

        // Update and spawn drag fruit if needed
        if (!dragFruitRef.current && canSpawnRef.current && !isDraggingRef.current) {
            spawnDragFruit();
        }

        // Update dragging fruit position
        if (dragFruitRef.current && !dragFruitRef.current.dropped) {
            const radius = dragFruitRef.current.radius;
            dragFruitRef.current.x = Math.max(
                WALL_PADDING + radius,
                Math.min(width - WALL_PADDING - radius, dragXRef.current)
            );
        }

        // Update particles
        particlesRef.current = particlesRef.current.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.15; // Particle gravity
            p.life -= 0.025;
            return p.life > 0;
        });

        // Update fruits physics (only dropped ones)
        for (const fruit of fruits) {
            if (fruit.merging || !fruit.dropped) continue;

            // Mass-based gravity (heavier = slightly faster fall feel)
            const gravityMultiplier = 0.9 + (fruit.mass * 0.02);
            fruit.vy += BASE_GRAVITY * gravityMultiplier;

            // Mass-based air friction (heavier = less air resistance proportionally)
            const frictionMultiplier = FRICTION + (1 - FRICTION) * (fruit.mass / 15) * 0.3;
            fruit.vx *= frictionMultiplier;
            fruit.vy *= frictionMultiplier;

            // Move
            fruit.x += fruit.vx;
            fruit.y += fruit.vy;

            // Wall collisions with mass-based bounce
            const bounceMultiplier = BOUNCE * (1 - fruit.mass / 30); // Heavier = less bouncy

            if (fruit.x - fruit.radius < WALL_PADDING) {
                fruit.x = WALL_PADDING + fruit.radius;
                fruit.vx = -fruit.vx * bounceMultiplier;
            }
            if (fruit.x + fruit.radius > width - WALL_PADDING) {
                fruit.x = width - WALL_PADDING - fruit.radius;
                fruit.vx = -fruit.vx * bounceMultiplier;
            }
            // Floor collision
            if (fruit.y + fruit.radius > height - WALL_PADDING) {
                fruit.y = height - WALL_PADDING - fruit.radius;
                fruit.vy = -fruit.vy * bounceMultiplier;
                // Floor friction based on mass
                fruit.vx *= 0.92 - (fruit.mass / 100);
            }
        }

        // Fruit-fruit collisions
        for (let i = 0; i < fruits.length; i++) {
            for (let j = i + 1; j < fruits.length; j++) {
                const a = fruits[i];
                const b = fruits[j];
                if (a.merging || b.merging) continue;
                if (!a.dropped || !b.dropped) continue;

                if (checkCollision(a, b)) {
                    // Same level = merge!
                    if (a.level === b.level && a.level < FRUITS.length - 1) {
                        a.merging = true;
                        b.merging = true;

                        const newLevel = a.level + 1;
                        const newFruitData = FRUITS[newLevel];
                        const newX = (a.x + b.x) / 2;
                        const newY = (a.y + b.y) / 2;

                        // New fruit gets momentum from both parents
                        const newVx = (a.vx * a.mass + b.vx * b.mass) / (a.mass + b.mass) * 0.5;
                        const newVy = Math.min(-3, (a.vy + b.vy) * 0.3); // Pop up effect

                        fruitsRef.current.push({
                            id: fruitIdCounterRef.current++,
                            x: newX,
                            y: newY,
                            vx: newVx,
                            vy: newVy,
                            radius: newFruitData.baseRadius,
                            level: newLevel,
                            mass: newFruitData.mass,
                            merging: false,
                            dropped: true,
                        });

                        // More particles for bigger merges
                        const intensity = 0.8 + newLevel * 0.15;
                        createMergeParticles(newX, newY, newFruitData.color, intensity);
                        soundRef.current?.playMerge(newLevel);
                        scoreRef.current += MERGE_POINTS[newLevel];
                        setScore(scoreRef.current);
                    } else {
                        resolveCollision(a, b);
                    }
                }
            }
        }

        // Remove merged fruits
        fruitsRef.current = fruitsRef.current.filter(f => !f.merging);

        // Check game over
        const dangerFruits = fruits.filter(f =>
            f.dropped &&
            f.y - f.radius < gameOverLineRef.current &&
            !f.merging &&
            Math.abs(f.vy) < 0.3 && Math.abs(f.vx) < 0.3 // Stable
        );

        if (dangerFruits.length > 0 && canSpawnRef.current && !isDraggingRef.current) {
            setGameState('gameover');
            soundRef.current?.playGameOver();
            if (scoreRef.current > highScore) {
                setHighScore(scoreRef.current);
                localStorage.setItem('mergeDropHighScore', String(scoreRef.current));
            }
        }

    }, [gameState, createMergeParticles, highScore, spawnDragFruit]);

    // Drawing
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const { width, height } = canvas;

        // Gradient background (pastel)
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#fce7f3');   // pink-100
        gradient.addColorStop(0.5, '#e9d5ff'); // purple-200
        gradient.addColorStop(1, '#dbeafe');   // blue-100
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Drop zone highlight
        ctx.fillStyle = 'rgba(168, 85, 247, 0.08)';
        ctx.fillRect(WALL_PADDING, 0, width - WALL_PADDING * 2, DROP_ZONE_HEIGHT);

        // Container walls
        ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
        ctx.fillRect(0, 0, WALL_PADDING, height);
        ctx.fillRect(width - WALL_PADDING, 0, WALL_PADDING, height);
        ctx.fillRect(0, height - WALL_PADDING, width, WALL_PADDING);

        // Danger line
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 3;
        ctx.setLineDash([15, 10]);
        ctx.beginPath();
        ctx.moveTo(WALL_PADDING, gameOverLineRef.current);
        ctx.lineTo(width - WALL_PADDING, gameOverLineRef.current);
        ctx.stroke();
        ctx.setLineDash([]);

        // "Danger zone" text
        ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('⚠️ TEHLİKE', WALL_PADDING + 10, gameOverLineRef.current - 8);

        // Draw particles
        for (const p of particlesRef.current) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        // Draw dropped fruits
        for (const fruit of fruitsRef.current) {
            if (fruit.merging || !fruit.dropped) continue;
            drawFruit(ctx, fruit);
        }

        // Draw dragging fruit
        if (dragFruitRef.current && !dragFruitRef.current.dropped) {
            const fruit = dragFruitRef.current;

            // Drop line preview
            ctx.strokeStyle = 'rgba(139, 92, 246, 0.3)';
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 8]);
            ctx.beginPath();
            ctx.moveTo(fruit.x, fruit.y + fruit.radius);
            ctx.lineTo(fruit.x, height - WALL_PADDING);
            ctx.stroke();
            ctx.setLineDash([]);

            // Dragging fruit with glow
            ctx.shadowColor = 'rgba(139, 92, 246, 0.5)';
            ctx.shadowBlur = 15;
            drawFruit(ctx, fruit, isDraggingRef.current ? 1 : 0.8);
            ctx.shadowBlur = 0;
        }

    }, [gameState]);

    // Helper to draw a fruit
    const drawFruit = (ctx: CanvasRenderingContext2D, fruit: Fruit, alpha: number = 1) => {
        const fruitData = FRUITS[fruit.level];
        ctx.globalAlpha = alpha;

        // Shadow (bigger for heavier fruits)
        const shadowOffset = 2 + fruit.mass * 0.2;
        ctx.beginPath();
        ctx.arc(fruit.x + shadowOffset, fruit.y + shadowOffset, fruit.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${0.1 + fruit.mass * 0.01})`;
        ctx.fill();

        // Fruit circle with gradient
        const fruitGradient = ctx.createRadialGradient(
            fruit.x - fruit.radius * 0.3,
            fruit.y - fruit.radius * 0.3,
            0,
            fruit.x,
            fruit.y,
            fruit.radius
        );
        fruitGradient.addColorStop(0, '#fff');
        fruitGradient.addColorStop(0.3, fruitData.color);
        fruitGradient.addColorStop(1, fruitData.color);

        ctx.beginPath();
        ctx.arc(fruit.x, fruit.y, fruit.radius, 0, Math.PI * 2);
        ctx.fillStyle = fruitGradient;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Emoji
        ctx.font = `${fruit.radius * 1.1}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(fruitData.emoji, fruit.x, fruit.y);

        ctx.globalAlpha = 1;
    };

    // Game loop
    const loop = useCallback(() => {
        frameIdRef.current = requestAnimationFrame(loop);
        update();
        draw();
    }, [update, draw]);

    // Start game loop
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                dragXRef.current = window.innerWidth / 2;
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        frameIdRef.current = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frameIdRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, [loop]);

    // Input handlers - Drag and Drop
    const handlePointerDown = useCallback((clientX: number, _clientY: number) => {
        if (gameState !== 'playing') return;

        // If there's a fruit ready, start dragging from anywhere
        if (dragFruitRef.current && !dragFruitRef.current.dropped) {
            isDraggingRef.current = true;
            dragXRef.current = clientX;
        }
    }, [gameState]);

    const handlePointerMove = useCallback((clientX: number) => {
        if (gameState !== 'playing') return;

        if (isDraggingRef.current || dragFruitRef.current) {
            dragXRef.current = clientX;
        }
    }, [gameState]);

    const handlePointerUp = useCallback(() => {
        if (gameState !== 'playing') return;

        if (isDraggingRef.current && dragFruitRef.current) {
            // Release the fruit
            dragFruitRef.current.dropped = true;
            fruitsRef.current.push(dragFruitRef.current);
            dragFruitRef.current = null;
            isDraggingRef.current = false;
            soundRef.current?.playDrop();

            // Short cooldown before next fruit
            canSpawnRef.current = false;
            setTimeout(() => {
                canSpawnRef.current = true;
            }, 350);
        }
    }, [gameState]);

    // Tap anywhere to drop
    const handleTap = useCallback((clientX: number) => {
        if (gameState !== 'playing') return;

        // If there's a fruit ready, drop it at tap position
        if (dragFruitRef.current && !dragFruitRef.current.dropped) {
            dragFruitRef.current.x = Math.max(
                WALL_PADDING + dragFruitRef.current.radius,
                Math.min(window.innerWidth - WALL_PADDING - dragFruitRef.current.radius, clientX)
            );
            dragFruitRef.current.dropped = true;
            fruitsRef.current.push(dragFruitRef.current);
            dragFruitRef.current = null;
            isDraggingRef.current = false;
            soundRef.current?.playDrop();

            canSpawnRef.current = false;
            setTimeout(() => {
                canSpawnRef.current = true;
            }, 350);
        }
    }, [gameState]);

    return (
        <div className="relative w-full h-full overflow-hidden">
            <canvas
                ref={canvasRef}
                className="block w-full h-full touch-none"
                onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
                onMouseMove={(e) => handlePointerMove(e.clientX)}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onClick={(e) => handleTap(e.clientX)}
                onTouchStart={(e) => {
                    const touch = e.touches[0];
                    handlePointerDown(touch.clientX, touch.clientY);
                }}
                onTouchMove={(e) => {
                    const touch = e.touches[0];
                    handlePointerMove(touch.clientX);
                }}
                onTouchEnd={handlePointerUp}
            />

            {/* UI Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none">
                {/* Left side - Back button + Next fruit */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onBack}
                        className="bg-white/80 backdrop-blur-md rounded-full p-3 shadow-lg pointer-events-auto hover:bg-white transition-all"
                    >
                        <ArrowLeftIcon className="w-7 h-7 text-purple-600" />
                    </button>
                    {/* Next fruit preview */}
                    {gameState === 'playing' && (
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg flex flex-col items-center">
                            <span className="text-[10px] text-gray-400 font-medium">Sırada</span>
                            <span className="text-3xl">{FRUITS[previewFruitLevelRef.current].emoji}</span>
                        </div>
                    )}
                </div>

                {/* Right side - Score only */}
                <div className="flex flex-col items-end gap-1">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg text-center">
                        <div className="text-[10px] text-purple-400 font-medium">SKOR</div>
                        <div className="text-2xl font-black text-purple-600">{score}</div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-md rounded-lg px-2 py-0.5 shadow text-center">
                        <div className="text-[10px] text-amber-500 font-medium">🏆 {highScore}</div>
                    </div>
                </div>
            </div>

            {/* Start Screen */}
            {gameState === 'start' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-400/90 via-purple-400/90 to-blue-400/90 backdrop-blur-sm">
                    <div className="bg-white/95 p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 border-4 border-purple-300">
                        <div className="text-6xl mb-4">🍒🍓🍊</div>
                        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-3">
                            DÜŞÜR BİRLEŞTİR
                        </h1>
                        <p className="text-gray-600 text-lg mb-4">
                            Meyveleri sürükle ve bırak!<br />
                            Aynı meyveler birleşir 🌟
                        </p>

                        <div className="bg-purple-50 rounded-xl p-3 mb-4">
                            <p className="text-sm text-purple-600 mb-2">💡 Büyük meyveler daha ağır düşer!</p>
                            <div className="flex flex-wrap justify-center gap-1 text-xl">
                                {FRUITS.slice(0, 5).map((f, i) => (
                                    <span key={i} style={{ fontSize: `${18 + i * 2}px` }}>{f.emoji}</span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={initGame}
                            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold text-2xl px-12 py-4 rounded-full shadow-xl hover:scale-105 transition-transform active:scale-95"
                        >
                            BAŞLA 🎮
                        </button>
                    </div>
                </div>
            )}

            {/* Game Over Screen */}
            {gameState === 'gameover' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white/95 p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 border-4 border-amber-300">
                        <div className="text-6xl mb-4">
                            {score >= highScore ? '🏆' : '🍉'}
                        </div>
                        <h2 className="text-3xl font-black text-gray-800 mb-2">
                            {score >= highScore ? 'YENİ REKOR!' : 'OYUN BİTTİ'}
                        </h2>
                        <div className="text-5xl font-black text-purple-600 mb-4">{score}</div>
                        <p className="text-gray-500 mb-6">En Yüksek: {highScore}</p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={initGame}
                                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                            >
                                TEKRAR OYNA 🔄
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
            )}

            <style>{`
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default MergeDropGameScreen;
