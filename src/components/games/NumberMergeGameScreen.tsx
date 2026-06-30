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
        osc.frequency.setValueAtTime(350, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    };

    const playMerge = (level: number) => {
        const baseFreq = 350 + level * 60;
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(baseFreq + i * 120, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.12);
            }, i * 40);
        }
    };

    const playGameOver = () => {
        [280, 230, 180].forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.18);
            }, i * 140);
        });
    };

    return { playDrop, playMerge, playGameOver };
};

// --- Types ---
interface NumberBall {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    value: number;
    mass: number;
    merging: boolean;
    dropped: boolean;
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
const BASE_GRAVITY = 0.3;
const FRICTION = 0.985;
const BOUNCE = 0.45;
const WALL_PADDING = 15;
const DROP_ZONE_HEIGHT = 160;

// Number balls: 1-10 with colors and sizes
const NUMBERS = [
    { value: 1, color: '#ef4444', baseRadius: 24, mass: 1.0 },
    { value: 2, color: '#f97316', baseRadius: 30, mass: 1.5 },
    { value: 3, color: '#facc15', baseRadius: 36, mass: 2.0 },
    { value: 4, color: '#84cc16', baseRadius: 42, mass: 2.8 },
    { value: 5, color: '#22c55e', baseRadius: 48, mass: 3.5 },
    { value: 6, color: '#14b8a6', baseRadius: 54, mass: 4.5 },
    { value: 7, color: '#06b6d4', baseRadius: 60, mass: 5.5 },
    { value: 8, color: '#3b82f6', baseRadius: 66, mass: 6.8 },
    { value: 9, color: '#8b5cf6', baseRadius: 72, mass: 8.0 },
    { value: 10, color: '#ec4899', baseRadius: 80, mass: 10.0 },
];

const getPoints = (value: number) => value * value * 10;

const NumberMergeGameScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'gameover'>('start');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(() => {
        const saved = localStorage.getItem('numberMergeHighScore');
        return saved ? parseInt(saved, 10) : 0;
    });

    const ballsRef = useRef<NumberBall[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const nextValueRef = useRef(1);
    const previewValueRef = useRef(1);
    const frameIdRef = useRef(0);
    const ballIdCounterRef = useRef(0);
    const dangerLineRef = useRef(DROP_ZONE_HEIGHT);
    const scoreRef = useRef(0);
    const isDraggingRef = useRef(false);
    const dragBallRef = useRef<NumberBall | null>(null);
    const dragXRef = useRef(0);
    const canSpawnRef = useRef(true);
    const soundRef = useRef<ReturnType<typeof createSoftSound> | null>(null);

    useEffect(() => {
        soundRef.current = createSoftSound();
    }, []);

    const initGame = useCallback(() => {
        ballsRef.current = [];
        particlesRef.current = [];
        nextValueRef.current = 1 + Math.floor(Math.random() * 3);
        previewValueRef.current = 1 + Math.floor(Math.random() * 3);
        ballIdCounterRef.current = 0;
        scoreRef.current = 0;
        setScore(0);
        isDraggingRef.current = false;
        dragBallRef.current = null;
        canSpawnRef.current = true;
        if (canvasRef.current) {
            dragXRef.current = canvasRef.current.width / 2;
            dangerLineRef.current = DROP_ZONE_HEIGHT;
        }
        setGameState('playing');
    }, []);

    const spawnDragBall = useCallback(() => {
        if (!canSpawnRef.current || dragBallRef.current) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const value = nextValueRef.current;
        const numData = NUMBERS[value - 1];
        dragBallRef.current = {
            id: ballIdCounterRef.current++,
            x: dragXRef.current,
            y: 80,
            vx: 0, vy: 0,
            radius: numData.baseRadius,
            value, mass: numData.mass,
            merging: false, dropped: false,
        };
        nextValueRef.current = previewValueRef.current;
        previewValueRef.current = 1 + Math.floor(Math.random() * 4);
    }, []);

    const createParticles = useCallback((x: number, y: number, color: string, count: number = 12) => {
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const speed = 4 + Math.random() * 4;
            particlesRef.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 1, color,
                size: 5 + Math.random() * 5,
            });
        }
    }, []);

    const checkCollision = (a: NumberBall, b: NumberBall): boolean => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        return Math.sqrt(dx * dx + dy * dy) < a.radius + b.radius;
    };

    const resolveCollision = (a: NumberBall, b: NumberBall) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist === 0) return;
        const overlap = (a.radius + b.radius - dist) / 2;
        const nx = dx / dist;
        const ny = dy / dist;
        const totalMass = a.mass + b.mass;
        const ratioA = b.mass / totalMass;
        const ratioB = a.mass / totalMass;
        a.x -= nx * overlap * ratioA * 1.1;
        a.y -= ny * overlap * ratioA * 1.1;
        b.x += nx * overlap * ratioB * 1.1;
        b.y += ny * overlap * ratioB * 1.1;
        const dvx = a.vx - b.vx;
        const dvy = a.vy - b.vy;
        const dvn = dvx * nx + dvy * ny;
        if (dvn > 0) {
            const impulse = (2 * dvn * 0.6) / totalMass;
            a.vx -= impulse * b.mass * nx;
            a.vy -= impulse * b.mass * ny;
            b.vx += impulse * a.mass * nx;
            b.vy += impulse * a.mass * ny;
        }
    };

    const update = useCallback(() => {
        if (gameState !== 'playing') return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const { width, height } = canvas;
        const balls = ballsRef.current;

        if (!dragBallRef.current && canSpawnRef.current && !isDraggingRef.current) {
            spawnDragBall();
        }

        if (dragBallRef.current && !dragBallRef.current.dropped) {
            const radius = dragBallRef.current.radius;
            dragBallRef.current.x = Math.max(
                WALL_PADDING + radius,
                Math.min(width - WALL_PADDING - radius, dragXRef.current)
            );
        }

        particlesRef.current = particlesRef.current.filter(p => {
            p.x += p.vx; p.y += p.vy;
            p.vy += 0.15; p.life -= 0.025;
            return p.life > 0;
        });

        for (const ball of balls) {
            if (ball.merging || !ball.dropped) continue;
            const gravityMult = 0.9 + (ball.mass * 0.02);
            ball.vy += BASE_GRAVITY * gravityMult;
            const frictionMult = FRICTION + (1 - FRICTION) * (ball.mass / 12) * 0.3;
            ball.vx *= frictionMult; ball.vy *= frictionMult;
            ball.x += ball.vx; ball.y += ball.vy;
            const bounceMult = BOUNCE * (1 - ball.mass / 25);
            if (ball.x - ball.radius < WALL_PADDING) {
                ball.x = WALL_PADDING + ball.radius;
                ball.vx = -ball.vx * bounceMult;
            }
            if (ball.x + ball.radius > width - WALL_PADDING) {
                ball.x = width - WALL_PADDING - ball.radius;
                ball.vx = -ball.vx * bounceMult;
            }
            if (ball.y + ball.radius > height - WALL_PADDING) {
                ball.y = height - WALL_PADDING - ball.radius;
                ball.vy = -ball.vy * bounceMult;
                ball.vx *= 0.92;
            }
        }

        for (let i = 0; i < balls.length; i++) {
            for (let j = i + 1; j < balls.length; j++) {
                const a = balls[i];
                const b = balls[j];
                if (a.merging || b.merging || !a.dropped || !b.dropped) continue;
                if (checkCollision(a, b)) {
                    if (a.value === b.value && a.value < 10) {
                        a.merging = true; b.merging = true;
                        const newValue = a.value + 1;
                        const newData = NUMBERS[newValue - 1];
                        const newX = (a.x + b.x) / 2;
                        const newY = (a.y + b.y) / 2;
                        const newVx = (a.vx * a.mass + b.vx * b.mass) / (a.mass + b.mass) * 0.5;
                        const newVy = Math.min(-4, (a.vy + b.vy) * 0.3);
                        ballsRef.current.push({
                            id: ballIdCounterRef.current++,
                            x: newX, y: newY, vx: newVx, vy: newVy,
                            radius: newData.baseRadius,
                            value: newValue, mass: newData.mass,
                            merging: false, dropped: true,
                        });
                        createParticles(newX, newY, newData.color, 15);
                        soundRef.current?.playMerge(newValue);
                        scoreRef.current += getPoints(newValue);
                        setScore(scoreRef.current);
                    } else {
                        resolveCollision(a, b);
                    }
                }
            }
        }

        ballsRef.current = ballsRef.current.filter(b => !b.merging);

        const dangerBalls = balls.filter(b =>
            b.dropped && b.y - b.radius < dangerLineRef.current && !b.merging &&
            Math.abs(b.vy) < 0.3 && Math.abs(b.vx) < 0.3
        );
        if (dangerBalls.length > 0 && canSpawnRef.current && !isDraggingRef.current) {
            setGameState('gameover');
            soundRef.current?.playGameOver();
            if (scoreRef.current > highScore) {
                setHighScore(scoreRef.current);
                localStorage.setItem('numberMergeHighScore', String(scoreRef.current));
            }
        }
    }, [gameState, createParticles, highScore, spawnDragBall]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const { width, height } = canvas;

        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#dbeafe');
        gradient.addColorStop(0.5, '#d1fae5');
        gradient.addColorStop(1, '#fef3c7');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = 'rgba(59, 130, 246, 0.08)';
        ctx.fillRect(WALL_PADDING, 0, width - WALL_PADDING * 2, DROP_ZONE_HEIGHT);

        ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.fillRect(0, 0, WALL_PADDING, height);
        ctx.fillRect(width - WALL_PADDING, 0, WALL_PADDING, height);
        ctx.fillRect(0, height - WALL_PADDING, width, WALL_PADDING);

        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
        ctx.lineWidth = 3;
        ctx.setLineDash([15, 10]);
        ctx.beginPath();
        ctx.moveTo(WALL_PADDING, dangerLineRef.current);
        ctx.lineTo(width - WALL_PADDING, dangerLineRef.current);
        ctx.stroke();
        ctx.setLineDash([]);

        for (const p of particlesRef.current) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
            ctx.globalAlpha = 1;
        }

        for (const ball of ballsRef.current) {
            if (ball.merging || !ball.dropped) continue;
            drawBall(ctx, ball);
        }

        if (dragBallRef.current && !dragBallRef.current.dropped) {
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
            ctx.lineWidth = 2;
            ctx.setLineDash([8, 8]);
            ctx.beginPath();
            ctx.moveTo(dragBallRef.current.x, dragBallRef.current.y + dragBallRef.current.radius);
            ctx.lineTo(dragBallRef.current.x, height - WALL_PADDING);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
            ctx.shadowBlur = 15;
            drawBall(ctx, dragBallRef.current, isDraggingRef.current ? 1 : 0.85);
            ctx.shadowBlur = 0;
        }
    }, [gameState]);

    const drawBall = (ctx: CanvasRenderingContext2D, ball: NumberBall, alpha: number = 1) => {
        const numData = NUMBERS[ball.value - 1];
        ctx.globalAlpha = alpha;
        const shadowOffset = 2 + ball.mass * 0.15;
        ctx.beginPath();
        ctx.arc(ball.x + shadowOffset, ball.y + shadowOffset, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,0,0,${0.1 + ball.mass * 0.01})`;
        ctx.fill();
        const ballGradient = ctx.createRadialGradient(
            ball.x - ball.radius * 0.3, ball.y - ball.radius * 0.3, 0,
            ball.x, ball.y, ball.radius
        );
        ballGradient.addColorStop(0, '#fff');
        ballGradient.addColorStop(0.4, numData.color);
        ballGradient.addColorStop(1, numData.color);
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ballGradient;
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.15)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = `bold ${ball.radius * 0.9}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 3;
        ctx.fillText(String(ball.value), ball.x, ball.y);
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    };

    const loop = useCallback(() => {
        frameIdRef.current = requestAnimationFrame(loop);
        update(); draw();
    }, [update, draw]);

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

    const handlePointerDown = useCallback((clientX: number, _clientY: number) => {
        if (gameState !== 'playing') return;
        // Start dragging from anywhere
        if (dragBallRef.current && !dragBallRef.current.dropped) {
            isDraggingRef.current = true;
            dragXRef.current = clientX;
        }
    }, [gameState]);

    const handlePointerMove = useCallback((clientX: number) => {
        if (gameState !== 'playing') return;
        if (isDraggingRef.current || dragBallRef.current) {
            dragXRef.current = clientX;
        }
    }, [gameState]);

    const handlePointerUp = useCallback(() => {
        if (gameState !== 'playing') return;
        if (isDraggingRef.current && dragBallRef.current) {
            dragBallRef.current.dropped = true;
            ballsRef.current.push(dragBallRef.current);
            dragBallRef.current = null;
            isDraggingRef.current = false;
            soundRef.current?.playDrop();
            canSpawnRef.current = false;
            setTimeout(() => { canSpawnRef.current = true; }, 350);
        }
    }, [gameState]);

    // Tap anywhere to drop
    const handleTap = useCallback((clientX: number) => {
        if (gameState !== 'playing') return;
        // Drop ball at tap X position
        if (dragBallRef.current && !dragBallRef.current.dropped) {
            dragBallRef.current.x = Math.max(
                WALL_PADDING + dragBallRef.current.radius,
                Math.min(window.innerWidth - WALL_PADDING - dragBallRef.current.radius, clientX)
            );
            dragBallRef.current.dropped = true;
            ballsRef.current.push(dragBallRef.current);
            dragBallRef.current = null;
            isDraggingRef.current = false;
            soundRef.current?.playDrop();
            canSpawnRef.current = false;
            setTimeout(() => { canSpawnRef.current = true; }, 350);
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

            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start pointer-events-none">
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onBack}
                        className="bg-white/80 backdrop-blur-md rounded-full p-3 shadow-lg pointer-events-auto hover:bg-white transition-all"
                    >
                        <ArrowLeftIcon className="w-7 h-7 text-blue-600" />
                    </button>
                    {gameState === 'playing' && (
                        <div className="bg-white/80 backdrop-blur-md rounded-2xl px-3 py-2 shadow-lg flex flex-col items-center">
                            <span className="text-[10px] text-gray-400 font-medium">Sırada</span>
                            <div
                                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md"
                                style={{ backgroundColor: NUMBERS[previewValueRef.current - 1].color }}
                            >
                                {previewValueRef.current}
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col items-end gap-1">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2 shadow-lg text-center">
                        <div className="text-[10px] text-blue-400 font-medium">SKOR</div>
                        <div className="text-2xl font-black text-blue-600">{score}</div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-md rounded-lg px-2 py-0.5 shadow text-center">
                        <div className="text-[10px] text-amber-500 font-medium">🏆 {highScore}</div>
                    </div>
                </div>
            </div>

            {gameState === 'start' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-blue-400/90 via-green-400/90 to-amber-400/90 backdrop-blur-sm">
                    <div className="bg-white/95 p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 border-4 border-blue-300">
                        <div className="text-6xl mb-4">🔢</div>
                        <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-500 to-amber-500 mb-3">
                            SAYI BİRLEŞTİR
                        </h1>
                        <p className="text-gray-600 text-lg mb-4">
                            Aynı sayıları birleştir!<br />
                            <span className="text-2xl">1+1=2, 2+2=3... 10'a kadar!</span>
                        </p>
                        <div className="bg-blue-50 rounded-xl p-3 mb-4">
                            <p className="text-sm text-blue-600 mb-2">🧮 Sayıları öğren!</p>
                            <div className="flex justify-center gap-2">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <div
                                        key={n}
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow"
                                        style={{ backgroundColor: NUMBERS[n - 1].color }}
                                    >
                                        {n}
                                    </div>
                                ))}
                                <span className="self-center">→</span>
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow"
                                    style={{ backgroundColor: NUMBERS[9].color }}
                                >
                                    10
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={initGame}
                            className="bg-gradient-to-r from-blue-500 via-green-500 to-amber-500 text-white font-bold text-2xl px-12 py-4 rounded-full shadow-xl hover:scale-105 transition-transform active:scale-95"
                        >
                            BAŞLA 🎮
                        </button>
                    </div>
                </div>
            )}

            {gameState === 'gameover' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white/95 p-8 rounded-3xl shadow-2xl text-center max-w-sm mx-4 border-4 border-amber-300">
                        <div className="text-6xl mb-4">{score >= highScore ? '🏆' : '🔢'}</div>
                        <h2 className="text-3xl font-black text-gray-800 mb-2">
                            {score >= highScore ? 'YENİ REKOR!' : 'OYUN BİTTİ'}
                        </h2>
                        <div className="text-5xl font-black text-blue-600 mb-4">{score}</div>
                        <p className="text-gray-500 mb-6">En Yüksek: {highScore}</p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={initGame}
                                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                            >
                                TEKRAR OYNA 🔄
                            </button>
                            <button onClick={onBack} className="text-gray-500 font-medium hover:text-gray-700">
                                Menüye Dön
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default NumberMergeGameScreen;
