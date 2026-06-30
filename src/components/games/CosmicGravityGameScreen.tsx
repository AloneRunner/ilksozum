import React, { useRef, useEffect, useState, useCallback } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Types ---
interface Point {
    x: number;
    y: number;
}

interface Vector {
    x: number;
    y: number;
}

interface GameObject {
    id: number;
    position: Point;
    radius: number;
    color: string;
}

interface GravityWell extends GameObject {
    strength: number;
    life: number; // 0 to 1
}

interface Asteroid extends GameObject {
    rotation: number;
    rotationSpeed: number;
    vertices: Point[];
}

interface Particle {
    id: number;
    position: Point;
    velocity: Vector;
    life: number;
    color: string;
}

// --- Constants ---
const GRAVITY_CONSTANT = 3500; // Increased from 2000 for stronger pull
const SHIP_SPEED = 0.8; // Reduced slightly more from 1.0
const WELL_LIFETIME = 90; // Increased from 60 frames (1.5s) for longer control window

const CosmicGravityGameScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [level, setLevel] = useState(1);
    const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'lost'>('start');

    // Game State Refs (for loop)
    const shipRef = useRef({ pos: { x: 50, y: 300 }, vel: { x: SHIP_SPEED, y: 0 }, angle: 0 });
    const wellsRef = useRef<GravityWell[]>([]);
    const asteroidsRef = useRef<Asteroid[]>([]);
    const goalRef = useRef<GameObject>({ id: -1, position: { x: 0, y: 0 }, radius: 30, color: '#4ade80' }); // Green portal
    const particlesRef = useRef<Particle[]>([]);
    const frameIdRef = useRef<number>(0);

    // --- Sound Effects (Placeholder) ---
    const playSound = (_type: 'portal' | 'crash' | 'gravity') => {
        // Implement simple oscillator sounds here if needed, consistent with other games
    };

    // --- Level Generation ---
    const initLevel = useCallback((lvl: number) => {
        if (!canvasRef.current) return;
        const { width, height } = canvasRef.current;

        // Reset Ship
        shipRef.current = {
            pos: { x: 100, y: height / 2 },
            vel: { x: SHIP_SPEED + (lvl * 0.2), y: 0 },
            angle: 0
        };

        // Goal Position (Far right)
        goalRef.current = {
            id: -1,
            position: { x: width - 100, y: height / 2 + (Math.random() - 0.5) * (height * 0.6) },
            radius: 40,
            color: '#4ade80'
        };

        // Generate Asteroids
        const newAsteroids: Asteroid[] = [];
        const numAsteroids = 1 + Math.floor(lvl / 2); // Reduced count: 1 at lvl 1-2, 2 at lvl 3-4...

        let attempts = 0;
        while (newAsteroids.length < numAsteroids && attempts < 100) {
            attempts++;
            const radius = 30 + Math.random() * 20;

            // Random position with padding
            const minX = 200;
            const maxX = Math.max(minX + 50, width - 150);
            const x = minX + Math.random() * (maxX - minX);
            const y = 50 + Math.random() * (height - 100); // Keep away from very top/bottom

            // Check distance to goal
            const dxG = x - goalRef.current.position.x;
            const dyG = y - goalRef.current.position.y;
            const distG = Math.sqrt(dxG * dxG + dyG * dyG);
            if (distG < (goalRef.current.radius + radius + 100)) continue; // Ensure 100px gap

            // Check distance to ship
            const dxS = x - shipRef.current.pos.x;
            const dyS = y - shipRef.current.pos.y;
            const distS = Math.sqrt(dxS * dxS + dyS * dyS);
            if (distS < 300) continue; // Ensure 300px safe zone around ship

            // Check distance to other asteroids
            let tooClose = false;
            for (const other of newAsteroids) {
                const dx = x - other.position.x;
                const dy = y - other.position.y;
                if (Math.sqrt(dx * dx + dy * dy) < (radius + other.radius + 50)) {
                    tooClose = true;
                    break;
                }
            }
            if (tooClose) continue;

            // Jagged shape
            const vertices: Point[] = [];
            const numVerts = 5 + Math.floor(Math.random() * 5);
            for (let j = 0; j < numVerts; j++) {
                const angle = (j / numVerts) * Math.PI * 2;
                const r = radius * (0.8 + Math.random() * 0.4);
                vertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
            }

            newAsteroids.push({
                id: attempts,
                position: { x, y },
                radius,
                color: '#64748b', // Slate-500
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.02, // Slower rotation
                vertices
            });
        }
        asteroidsRef.current = newAsteroids;

        // Clear others
        wellsRef.current = [];
        particlesRef.current = [];
        setGameState('playing');
    }, []);

    // --- Game Loop ---
    const update = useCallback(() => {
        if (gameState !== 'playing') {
            // Still animate particles/background if needed
            return;
        }
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height } = canvas;

        // 1. Update Physics
        const ship = shipRef.current;

        // Apply Gravity
        wellsRef.current.forEach(well => {
            const dx = well.position.x - ship.pos.x;
            const dy = well.position.y - ship.pos.y;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            if (dist > 10) { // Min valid distance
                const force = GRAVITY_CONSTANT / distSq;
                ship.vel.x += (dx / dist) * force;
                ship.vel.y += (dy / dist) * force;
            }

            well.life -= 1;
        });

        // Remove dead wells
        wellsRef.current = wellsRef.current.filter(w => w.life > 0);

        // Damping / Max Speed
        const speed = Math.sqrt(ship.vel.x * ship.vel.x + ship.vel.y * ship.vel.y);
        const MAX_SPEED = 8;
        if (speed > MAX_SPEED) {
            ship.vel.x = (ship.vel.x / speed) * MAX_SPEED;
            ship.vel.y = (ship.vel.y / speed) * MAX_SPEED;
        }

        // Move Ship
        ship.pos.x += ship.vel.x;
        ship.pos.y += ship.vel.y;

        // Rotate Ship (towards velocity)
        ship.angle = Math.atan2(ship.vel.y, ship.vel.x);

        // Bounds Check (Bounce? or Crash? Let's Bounce off walls)
        // Bounds Check (Bounce off walls)
        if (ship.pos.y < 0 + 10) {
            ship.vel.y = Math.abs(ship.vel.y) * 0.8;
            ship.pos.y = 10;
        } else if (ship.pos.y > height - 10) {
            ship.vel.y = -Math.abs(ship.vel.y) * 0.8;
            ship.pos.y = height - 10;
        }

        if (ship.pos.x < 0 + 10) {
            ship.vel.x = Math.abs(ship.vel.x) * 0.8;
            ship.pos.x = 10;
        } else if (ship.pos.x > width - 10) {
            // Bounce off right wall too, preventing "flying away"
            ship.vel.x = -Math.abs(ship.vel.x) * 0.8;
            ship.pos.x = width - 10;
        }

        // 2. Collision Detection
        // Goal
        const dxG = goalRef.current.position.x - ship.pos.x;
        const dyG = goalRef.current.position.y - ship.pos.y;
        if (Math.sqrt(dxG * dxG + dyG * dyG) < goalRef.current.radius + 30) { // Increased hit area (+30)
            setGameState('won');
            playSound('portal');
        }

        // Asteroids
        for (const ast of asteroidsRef.current) {
            const dx = ast.position.x - ship.pos.x;
            const dy = ast.position.y - ship.pos.y;
            if (Math.sqrt(dx * dx + dy * dy) < ast.radius + 10) {
                setGameState('lost');
                playSound('crash');
                // Create explosion particles
                for (let i = 0; i < 20; i++) {
                    particlesRef.current.push({
                        id: Math.random(),
                        position: { ...ship.pos },
                        velocity: { x: (Math.random() - 0.5) * 10, y: (Math.random() - 0.5) * 10 },
                        life: 1.0,
                        color: '#f87171'
                    });
                }
            }
            ast.rotation += ast.rotationSpeed;
        }

        // Particles
        particlesRef.current.forEach(p => {
            p.position.x += p.velocity.x;
            p.position.y += p.velocity.y;
            p.life -= 0.02;
        });
        particlesRef.current = particlesRef.current.filter(p => p.life > 0);

        // Trail
        if (frameIdRef.current % 3 === 0) {
            particlesRef.current.push({
                id: Math.random(),
                position: { ...ship.pos },
                velocity: { x: -ship.vel.x * 0.2, y: -ship.vel.y * 0.2 },
                life: 0.5,
                color: '#67e8f9' // Cyan
            });
        }

    }, [gameState]);

    // --- Rendering ---
    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const { width, height } = canvas;

        // Clear with trail effect
        ctx.fillStyle = 'rgba(15, 23, 42, 0.3)'; // Dark slate background
        ctx.fillRect(0, 0, width, height);

        // Draw Grid (Cyberpunk feel)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
        ctx.lineWidth = 1;
        const gridSize = 50;
        const offsetX = (-shipRef.current.pos.x * 0.2) % gridSize;
        for (let x = offsetX; x < width; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
        }

        // Draw Goal
        const goal = goalRef.current;
        ctx.save();
        ctx.translate(goal.position.x, goal.position.y);
        ctx.rotate(frameIdRef.current * 0.02);
        ctx.beginPath();
        ctx.arc(0, 0, goal.radius, 0, Math.PI * 2);
        ctx.strokeStyle = goal.color;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.fillStyle = `rgba(74, 222, 128, 0.2)`;
        ctx.fill();
        // Swirl
        for (let i = 0; i < 4; i++) {
            ctx.rotate(Math.PI / 2);
            ctx.beginPath();
            ctx.arc(15, 0, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.fill();
        }
        ctx.restore();

        // Draw Gravity Wells
        wellsRef.current.forEach(well => {
            ctx.beginPath();
            ctx.arc(well.position.x, well.position.y, well.radius * (0.5 + Math.sin(frameIdRef.current * 0.2) * 0.1), 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';
            ctx.fill();
            ctx.strokeStyle = '#a855f7';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(well.position.x, well.position.y, well.radius * (well.life / WELL_LIFETIME), 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,255,255,0.5)';
            ctx.stroke();
        });

        // Draw Asteroids
        asteroidsRef.current.forEach(ast => {
            ctx.save();
            ctx.translate(ast.position.x, ast.position.y);
            ctx.rotate(ast.rotation);
            ctx.beginPath();
            ctx.moveTo(ast.vertices[0].x, ast.vertices[0].y);
            for (let i = 1; i < ast.vertices.length; i++) {
                ctx.lineTo(ast.vertices[i].x, ast.vertices[i].y);
            }
            ctx.closePath();
            ctx.fillStyle = ast.color;
            ctx.fill();
            ctx.strokeStyle = '#94a3b8';
            ctx.stroke();
            ctx.restore();
        });

        // Draw Ship
        const ship = shipRef.current;
        if (gameState !== 'lost') {
            ctx.save();
            ctx.translate(ship.pos.x, ship.pos.y);
            ctx.rotate(ship.angle);

            // Simple Triangle Ship
            ctx.beginPath();
            ctx.moveTo(15, 0);
            ctx.lineTo(-10, 10);
            ctx.lineTo(-5, 0);
            ctx.lineTo(-10, -10);
            ctx.closePath();

            ctx.fillStyle = '#22d3ee'; // Cyan
            ctx.fill();

            // Engine glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#22d3ee';
            ctx.stroke();
            ctx.shadowBlur = 0;

            ctx.restore();
        }

        // Draw Particles
        particlesRef.current.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.position.x, p.position.y, 2 + p.life * 2, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life;
            ctx.fill();
            ctx.globalAlpha = 1.0;
        });

    }, [gameState]);

    // --- Engine ---
    const loop = useCallback((_time: number) => {
        frameIdRef.current = requestAnimationFrame(loop);
        update();
        draw();
    }, [update, draw]);

    useEffect(() => {
        // Canvas Sizing
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                if (gameState === 'start' || gameState === 'won') {
                    // Re-init if just waiting
                    initLevel(level);
                }
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        frameIdRef.current = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frameIdRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, [loop, level, initLevel]); // Re-bind loop if it changes

    // --- Interaction ---
    const handleInput = (clientX: number, clientY: number) => {
        if (gameState !== 'playing') return;

        // Create Gravity Well
        wellsRef.current = [{
            id: Date.now(),
            position: { x: clientX, y: clientY },
            radius: 60,
            color: 'purple',
            strength: 1,
            life: WELL_LIFETIME
        }];

        // Particle effect at touch
        for (let i = 0; i < 5; i++) {
            particlesRef.current.push({
                id: Math.random(),
                position: { x: clientX, y: clientY },
                velocity: { x: (Math.random() - 0.5) * 5, y: (Math.random() - 0.5) * 5 },
                life: 0.8,
                color: '#d8b4fe'
            });
        }
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-slate-900">
            <canvas
                ref={canvasRef}
                className="block w-full h-full touch-none"
                onMouseDown={(e) => handleInput(e.clientX, e.clientY)}
                onTouchStart={(e) => {
                    // e.preventDefault(); // Prevent scrolling
                    const touch = e.touches[0];
                    handleInput(touch.clientX, touch.clientY);
                }}
            />

            {/* UI Overlay */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center pointer-events-none">
                <button
                    onClick={onBack}
                    className="bg-white/20 backdrop-blur-md rounded-full p-2 text-white pointer-events-auto hover:bg-white/30 transition"
                >
                    <ArrowLeftIcon className="w-8 h-8" />
                </button>
                <div className="bg-slate-800/80 backdrop-blur rounded-xl px-4 py-2 border border-cyan-500/30">
                    <span className="text-cyan-400 font-bold text-xl">Level {level}</span>
                </div>
                <div className="w-12" /> {/* Spacer */}
            </div>

            {/* Messages */}
            {gameState === 'start' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-auto">
                    <div className="bg-slate-800 p-8 rounded-3xl border border-cyan-500 shadow-2xl text-center max-w-md mx-4">
                        <h1 className="text-4xl font-black text-cyan-400 mb-4 tracking-wider">KOZMİK ÇEKİM</h1>
                        <p className="text-slate-300 text-lg mb-8">
                            Portala ulaşmak için dokun.
                            <br /><br />
                            Mor delikler yolu açar!
                        </p>
                        <button
                            onClick={() => {
                                setGameState('playing');
                                initLevel(1);
                            }}
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            BAŞLA 🚀
                        </button>
                    </div>
                </div>
            )}

            {gameState === 'won' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-900/60 backdrop-blur-sm pointer-events-auto animate-fadeIn">
                    <div className="text-center">
                        <div className="text-8xl mb-4">🌟</div>
                        <h2 className="text-5xl font-black text-white mb-6 drop-shadow-lg">HARİKA!</h2>
                        <button
                            onClick={() => {
                                setLevel(l => l + 1);
                                initLevel(level + 1);
                            }}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-2xl px-16 py-6 rounded-full shadow-xl hover:scale-110 transition-transform"
                        >
                            SONRAKİ SEVİYE ▶
                        </button>
                        <button
                            onClick={onBack}
                            className="block mt-4 text-white/80 font-bold hover:text-white"
                        >
                            Menüden Çık
                        </button>
                    </div>
                </div>
            )}

            {gameState === 'lost' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-900/60 backdrop-blur-sm pointer-events-auto animate-fadeIn">
                    <div className="text-center">
                        <div className="text-8xl mb-4">💥</div>
                        <h2 className="text-4xl font-black text-white mb-6">DİKKAT ET!</h2>
                        <button
                            onClick={() => initLevel(level)}
                            className="bg-white text-red-600 font-bold text-xl px-12 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                        >
                            TEKRAR DENE ↺
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
            `}</style>
        </div>
    );
};

export default CosmicGravityGameScreen;
