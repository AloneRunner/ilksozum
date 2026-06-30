import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

interface TargetShootingGameScreenProps {
    onBack: () => void;
}

// --- Physics Engine Interfaces ---

interface Vector2 {
    x: number;
    y: number;
}

interface Ball {
    pos: Vector2;
    vel: Vector2;
    radius: number;
    active: boolean; // true if flying/rolling
    isHeld: boolean;
}

interface BoxTarget {
    id: number;
    pos: Vector2;
    vel: Vector2;
    width: number;
    height: number;
    rotation: number;
    angVel: number;
    mass: number;
    color: string;
    emoji: string;
    isDebris: boolean; // if fallen off screen
    isSleeping: boolean; // Physics optimization: don't move until hit
}

interface Particle {
    pos: Vector2;
    vel: Vector2;
    life: number;
    color: string;
    size: number;
}

// --- Constants ---
const GRAVITY = 0.5;
const FRICTION = 0.99;
const RESTITUTION = 0.6; // Bounciness

const TargetShootingGameScreen: React.FC<TargetShootingGameScreenProps> = ({ onBack }) => {
    // Game State
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [ballsLeft, setBallsLeft] = useState(5);
    const [gameState, setGameState] = useState<'playing' | 'level_complete' | 'game_over'>('playing');

    // Refs
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();
    const ballRef = useRef<Ball>({ pos: { x: 0, y: 0 }, vel: { x: 0, y: 0 }, radius: 25, active: false, isHeld: false });
    const targetsRef = useRef<BoxTarget[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const dragStartRef = useRef<Vector2 | null>(null);
    const shelfRef = useRef({ x: 0, y: 0, width: 0 });

    // Audio
    const playSound = useCallback((freq: number, type: OscillatorType = 'sine', duration: number = 0.1) => {
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
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
            osc.start();
            osc.stop(ctx.currentTime + duration);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const createParticles = (x: number, y: number, color: string, count: number = 10) => {
        for (let i = 0; i < count; i++) {
            particlesRef.current.push({
                pos: { x, y },
                vel: { x: (Math.random() - 0.5) * 15, y: (Math.random() - 0.5) * 15 },
                life: 1.0,
                color,
                size: 3 + Math.random() * 5
            });
        }
    };

    // --- Physics Helpers ---

    const checkCollisionBallBox = (ball: Ball, box: BoxTarget): boolean => {
        // Transform ball into box local space
        const dx = ball.pos.x - box.pos.x;
        const dy = ball.pos.y - box.pos.y;
        const theta = -box.rotation;

        const localX = dx * Math.cos(theta) - dy * Math.sin(theta);
        const localY = dx * Math.sin(theta) + dy * Math.cos(theta);

        // Closest point on box
        const closestX = Math.max(-box.width / 2, Math.min(box.width / 2, localX));
        const closestY = Math.max(-box.height / 2, Math.min(box.height / 2, localY));

        const distX = localX - closestX;
        const distY = localY - closestY;

        return (distX * distX + distY * distY) < (ball.radius * ball.radius);
    };

    // Initialize Level
    const initLevel = useCallback(() => {
        setGameState('playing');
        setBallsLeft(5); // Reset projectile count

        const shelfY = window.innerHeight * 0.5; // Moved UP (was 0.6)
        const ballY = window.innerHeight * 0.75; // Moved UP (was height - 100)

        // Reset Ball
        ballRef.current = {
            pos: { x: window.innerWidth / 2, y: ballY },
            vel: { x: 0, y: 0 },
            radius: 25,
            active: false,
            isHeld: false
        };

        // Create Pyramid of Cans
        const newTargets: BoxTarget[] = [];
        const baseY = shelfY - 30; // On top of shelf
        const startX = window.innerWidth / 2;
        const boxSize = 60;

        const rows = 2 + Math.min(level, 4); // Increase rows with level

        for (let r = 0; r < rows; r++) {
            const cols = rows - r; // 3, 2, 1...
            const rowWidth = cols * boxSize;
            const rowStartX = startX - rowWidth / 2 + boxSize / 2;

            for (let c = 0; c < cols; c++) {
                newTargets.push({
                    id: Date.now() + r * 100 + c,
                    pos: {
                        x: rowStartX + c * boxSize,
                        y: baseY - r * boxSize - boxSize / 2
                    },
                    vel: { x: 0, y: 0 },
                    width: boxSize - 4,
                    height: boxSize - 4,
                    rotation: 0,
                    angVel: 0,
                    mass: 1,
                    color: ['#EF4444', '#3B82F6', '#EAB308', '#22C55E'][Math.floor(Math.random() * 4)],
                    emoji: ['🥫', '📦', '🥛', '🥤'][Math.floor(Math.random() * 4)],
                    isDebris: false,
                    isSleeping: true // Stable start
                });
            }
        }
        targetsRef.current = newTargets;

        // Setup Shelf
        shelfRef.current = {
            x: window.innerWidth / 2,
            y: shelfY,
            width: window.innerWidth * 0.7
        };

    }, [level]);

    useEffect(() => {
        initLevel();
    }, [initLevel]);

    // Game Loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Update shelf on resize
            const shelfY = window.innerHeight * 0.5;
            shelfRef.current = {
                x: window.innerWidth / 2,
                y: shelfY,
                width: window.innerWidth * 0.7
            };
            // Reset ball pos if idle
            if (!ballRef.current.active) {
                ballRef.current.pos = { x: canvas.width / 2, y: window.innerHeight * 0.75 };
            }
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // --- Physics Step ---
        const ball = ballRef.current;
        const targets = targetsRef.current;
        const shelf = shelfRef.current;

        // 1. Ball Physics
        if (ball.active) {
            ball.vel.y += GRAVITY;
            ball.pos.x += ball.vel.x;
            ball.pos.y += ball.vel.y;

            // Bounce off walls
            if (ball.pos.x < ball.radius || ball.pos.x > canvas.width - ball.radius) {
                ball.vel.x *= -RESTITUTION;
                ball.pos.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.pos.x));
            }

            // Floor bounce (Screen bottom)
            if (ball.pos.y > canvas.height - ball.radius) {
                ball.vel.y *= -0.5;
                ball.vel.x *= 0.95;
                ball.pos.y = canvas.height - ball.radius;

                // Stop if slow
                if (Math.abs(ball.vel.y) < 1 && Math.abs(ball.vel.x) < 0.5) {
                    ball.active = false;

                    if (ballsLeft > 0 && gameState === 'playing') {
                        setTimeout(() => {
                            setBallsLeft(b => b - 1);
                            // Check game over in effect
                            ballRef.current.pos = { x: canvas.width / 2, y: canvas.height * 0.75 };
                            ballRef.current.vel = { x: 0, y: 0 };
                            ballRef.current.isHeld = false;
                        }, 800);
                    }
                }
            }
        }

        // 2. Target Physics
        targets.forEach(box => {
            if (box.isDebris) return;

            // Wake Up Check
            if (ball.active && !box.isSleeping) {
                // If this box is hit or moving fast, it stays awake.
                // If it's awake, check collisions with sleeping neighbors to wake them.
            }

            if (!box.isSleeping) {
                box.vel.y += GRAVITY;
                box.pos.x += box.vel.x;
                box.pos.y += box.vel.y;
                box.rotation += box.angVel;

                box.vel.x *= FRICTION;
                box.vel.y *= FRICTION;
                box.angVel *= 0.98;
            }

            // Floor Collision (Fallen off shelf)
            if (box.pos.y > canvas.height + 100) {
                if (!box.isDebris) {
                    box.isDebris = true;
                    setScore(s => s + 50);
                    playSound(400, 'square', 0.2);
                    createParticles(box.pos.x, canvas.height, box.color, 10);
                }
            }

            // Shelf Collision
            const shelfLeft = shelf.x - shelf.width / 2;
            const shelfRight = shelf.x + shelf.width / 2;

            if (!box.isSleeping) {
                const onShelfX = box.pos.x > shelfLeft && box.pos.x < shelfRight;
                // Collide with top of shelf
                if (onShelfX && box.pos.y + box.height / 2 >= shelf.y && box.pos.y - box.height / 2 < shelf.y + 10 && box.vel.y >= 0) {
                    box.pos.y = shelf.y - box.height / 2;
                    box.vel.y *= -0.3;
                    box.vel.x *= 0.8;
                    box.angVel *= 0.8;
                }
            } else {
                // Force sleep position if needed? Not really, they don't move.
            }

            // Ball Collision with Box
            if (ball.active && !box.isDebris) {
                if (checkCollisionBallBox(ball, box)) {
                    // Wake up ALL targets to simulate structural instability on impact
                    // This is safer than individual wakeups for stability
                    targets.forEach(t => t.isSleeping = false);

                    // Impulse
                    const dx = box.pos.x - ball.pos.x;
                    const dy = box.pos.y - ball.pos.y;
                    const angle = Math.atan2(dy, dx);
                    const power = Math.sqrt(ball.vel.x ** 2 + ball.vel.y ** 2);

                    if (power > 1) { // Lower threshold for satisfaction
                        box.vel.x += Math.cos(angle) * power * 0.8;
                        box.vel.y += Math.sin(angle) * power * 0.8;
                        box.angVel += (Math.random() - 0.5) * 0.5 * power;

                        // Ball reacts
                        ball.vel.x *= -0.6;
                        ball.vel.y *= -0.6;

                        playSound(200 + Math.random() * 200, 'sawtooth', 0.1);
                        createParticles((box.pos.x + ball.pos.x) / 2, (box.pos.y + ball.pos.y) / 2, '#FFF', 5);
                    }
                }
            }

            // Box-Box Collision (Simple)
            // Only if awake
            if (!box.isSleeping) {
                targets.forEach(other => {
                    if (box === other || other.isDebris) return;

                    const dx = box.pos.x - other.pos.x;
                    const dy = box.pos.y - other.pos.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const minDist = (box.width + other.width) / 2 * 0.95;

                    if (dist < minDist && dist > 0) {
                        // If one is awake and hits a sleeper, wake the sleeper
                        if (other.isSleeping) other.isSleeping = false;

                        const push = (minDist - dist) / 2;
                        const nx = dx / dist;
                        const ny = dy / dist;

                        box.pos.x += nx * push;
                        box.pos.y += ny * push;
                        other.pos.x -= nx * push;
                        other.pos.y -= ny * push;

                        // Friction
                        box.vel.x *= 0.95;
                        other.vel.x *= 0.95;
                    }
                });
            }
        });

        // Check Win/Loss
        if (gameState === 'playing') {
            if (targets.every(t => t.isDebris)) {
                setGameState('level_complete');
                playSound(600, 'sine', 0.5);
                createParticles(canvas.width / 2, canvas.height / 2, '#FFD700', 50);
            } else if (ballsLeft <= 0 && !ball.active) {
                // All balls used, ball stopped, targets remain
                setGameState('game_over');
            }
        }

        // --- Render ---

        // Background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#1E1B4B');
        gradient.addColorStop(1, '#4C1D95');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Stars
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        for (let i = 0; i < 30; i++) ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);

        // Shelf - 3D effect
        ctx.fillStyle = '#78350F'; // Top
        ctx.fillRect(shelf.x - shelf.width / 2, shelf.y, shelf.width, 20);

        ctx.fillStyle = '#92400E'; // Front/Shadow
        ctx.fillRect(shelf.x - shelf.width / 2, shelf.y + 20, shelf.width, 10);

        // Circus Booth Legs
        ctx.fillStyle = '#B91C1C';
        const legWidth = 20;
        // Left Leg
        ctx.fillRect(shelf.x - shelf.width / 2 + 20, shelf.y + 30, legWidth, canvas.height);
        // Right Leg
        ctx.fillRect(shelf.x + shelf.width / 2 - 40, shelf.y + 30, legWidth, canvas.height);

        // Targets
        targets.forEach(box => {
            if (box.isDebris && box.pos.y > canvas.height) return;

            ctx.save();
            ctx.translate(box.pos.x, box.pos.y);
            ctx.rotate(box.rotation);

            ctx.shadowColor = 'rgba(0,0,0,0.3)';
            ctx.shadowBlur = 10;

            // Box Body
            ctx.fillStyle = box.color;
            ctx.fillRect(-box.width / 2, -box.height / 2, box.width, box.height);

            // Detail
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(-box.width / 2, -box.height / 2, box.width, box.height);

            // Emoji
            ctx.font = '30px serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowBlur = 0;
            ctx.fillText(box.emoji, 0, 0);

            ctx.restore();
        });

        // Ball
        const b = ballRef.current;
        ctx.save();
        ctx.translate(b.pos.x, b.pos.y);

        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.arc(-b.radius * 0.3, -b.radius * 0.3, b.radius * 0.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();

        // Aiming Line
        if (b.isHeld && dragStartRef.current) {
            ctx.beginPath();
            ctx.moveTo(b.pos.x, b.pos.y);
            // Visualise inverse trajectory
            const dx = mousePosRef.current.x - b.pos.x;
            const dy = mousePosRef.current.y - b.pos.y;
            ctx.lineTo(b.pos.x - dx, b.pos.y - dy);
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.lineWidth = 3;
            ctx.setLineDash([10, 10]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Drag Area Hint (if idle)
        if (!b.active && !b.isHeld && gameState === 'playing') {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.arc(b.pos.x, b.pos.y, 60, 0, Math.PI * 2); // Pulsing ring
            ctx.fill();
        }

        // Particles
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.pos.x += p.vel.x;
            p.pos.y += p.vel.y;
            p.life -= 0.05;
            p.vel.y += 0.5;

            if (p.life <= 0) {
                particlesRef.current.splice(i, 1);
                continue;
            }

            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.pos.x, p.pos.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }

        requestRef.current = requestAnimationFrame(animate);
    }, [level, gameState, ballsLeft]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
    }, [animate]);

    // Input Handling
    const handleStart = (clientX: number, clientY: number) => {
        if (ballRef.current.active) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Large touch tolerance for mobile
        const dx = x - ballRef.current.pos.x;
        const dy = y - ballRef.current.pos.y;
        if (dx * dx + dy * dy < 5000) { // ~70px radius
            ballRef.current.isHeld = true;
            dragStartRef.current = { x, y };
        }
    };

    const handleMove = (clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        mousePosRef.current = { x: clientX - rect.left, y: clientY - rect.top };
    };

    const handleEnd = (clientX: number, clientY: number) => {
        if (!ballRef.current.isHeld) return;

        ballRef.current.isHeld = false;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        if (dragStartRef.current) {
            // Throw Vector
            const dx = dragStartRef.current.x - x;
            const dy = dragStartRef.current.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist > 20) { // Minimum pull distance
                // Scale power
                ballRef.current.vel = { x: dx * 0.18, y: dy * 0.18 };
                ballRef.current.active = true;
                playSound(400, 'triangle', 0.1);
            }
            dragStartRef.current = null;
        }
    };

    return (
        <div className="fixed inset-0 bg-neutral-900 flex flex-col overflow-hidden select-none">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full touch-none cursor-grab active:cursor-grabbing"
                onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                onMouseUp={(e) => handleEnd(e.clientX, e.clientY)}
                onMouseLeave={(e) => handleEnd(e.clientX, e.clientY)}
                onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchEnd={(e) => handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
            />

            {/* UI Overlay */}
            <div className="absolute top-0 w-full p-4 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto">
                    <button onClick={onBack} className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                        <ArrowLeftIcon className="w-6 h-6 text-purple-600" />
                    </button>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white/90 px-4 py-2 rounded-full shadow-lg border-2 border-red-100 flex gap-2">
                        <span className="text-red-500 font-bold text-xl">⚾ {ballsLeft}</span>
                    </div>
                    <div className="bg-white/90 px-4 py-2 rounded-full shadow-lg border-2 border-yellow-100">
                        <span className="text-yellow-500 font-bold text-xl">⭐ {score}</span>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-16 w-full text-center pointer-events-none text-white/80 animate-pulse font-bold text-lg drop-shadow-md">
                {ballRef.current.active ? '' : '👇 Topu aşağı çek ve bırak!'}
            </div>

            {/* Level Complete / Game Over */}
            {gameState !== 'playing' && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm pointer-events-auto">
                    <div className="bg-white rounded-[2rem] p-8 text-center shadow-2xl animate-in zoom-in duration-300 max-w-sm mx-4">
                        <div className="text-7xl mb-4 animate-bounce">
                            {gameState === 'level_complete' ? '🎪' : '😢'}
                        </div>
                        <h2 className="text-3xl font-bold text-purple-600 mb-2">
                            {gameState === 'level_complete' ? 'Bravo!' : 'Oyun Bitti'}
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {gameState === 'level_complete' ? 'Tüm kutuları devirdin!' : 'Topların bitti.'}
                        </p>
                        <button
                            onClick={() => {
                                if (gameState === 'level_complete') setLevel(l => l + 1);
                                else {
                                    setLevel(1);
                                    setScore(0);
                                }
                                initLevel();
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transform transition active:scale-95 text-xl"
                        >
                            {gameState === 'level_complete' ? 'Devam Et' : 'Tekrar Dene'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

const mousePosRef = { current: { x: 0, y: 0 } };

export default TargetShootingGameScreen;
