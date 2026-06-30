import React, { useState, useCallback, useRef, useEffect } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

interface TrainTrackGameScreenProps {
    onBack: () => void;
}

interface Point {
    x: number;
    y: number;
}

interface Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
    type: 'rock' | 'water' | 'forest';
}

interface Level {
    id: number;
    start: Point;
    end: Point;
    obstacles: Obstacle[];
    gridSize: number; // For future grid snapping if needed
}

const LEVELS: Level[] = [
    {
        id: 1,
        start: { x: 10, y: 50 },
        end: { x: 90, y: 50 },
        obstacles: [
            { x: 40, y: 0, width: 20, height: 70, type: 'forest' } // Wall in middle
        ],
        gridSize: 20
    },
    {
        id: 2,
        start: { x: 10, y: 60 }, // Fixed: Moved down
        end: { x: 90, y: 50 },
        obstacles: [
            { x: 30, y: 0, width: 10, height: 60, type: 'water' },
            { x: 60, y: 40, width: 10, height: 60, type: 'rock' }
        ],
        gridSize: 20
    },
    {
        id: 3, // "The Fork" - Simple choice
        start: { x: 10, y: 70 }, // Safe zone
        end: { x: 90, y: 50 },
        obstacles: [
            { x: 30, y: 30, width: 40, height: 40, type: 'rock' }, // Center block
        ],
        gridSize: 20
    },
    {
        id: 4, // "The Snake"
        start: { x: 10, y: 25 }, // Moved down safe from UI
        end: { x: 90, y: 90 },
        obstacles: [
            // Zig-Zag Walls
            { x: 25, y: 0, width: 5, height: 75, type: 'forest' },
            { x: 50, y: 25, width: 5, height: 75, type: 'rock' },
            { x: 75, y: 0, width: 5, height: 75, type: 'water' }
        ],
        gridSize: 20
    },
    {
        id: 5, // "Classic Maze" - Complex
        start: { x: 10, y: 90 }, // Start bottom-left
        end: { x: 90, y: 10 },   // End top-right
        obstacles: [
            // Bounds
            { x: 0, y: 0, width: 100, height: 2, type: 'rock' },
            { x: 0, y: 98, width: 100, height: 2, type: 'rock' },
            { x: 0, y: 0, width: 2, height: 100, type: 'rock' },
            { x: 98, y: 0, width: 2, height: 100, type: 'rock' },

            // Fixed Level 5: Solvable 
            // 1. Vertical wall x=30, gap at top
            { x: 30, y: 20, width: 2, height: 80, type: 'rock' }, // Block bottom

            // 2. Horizontal barrier - gaps on both sides!\n            { x: 35, y: 50, width: 30, height: 2, type: 'rock' },

            // 3. Vertical wall x=70, gap at bottom
            { x: 70, y: 0, width: 2, height: 80, type: 'rock' }, // Block top

            // Route: Start(10,90) -> Up to y<20 -> Right over wall 1 -> Down past wall 2 -> Right under wall 3 -> Up to End(90,10)
        ],
        gridSize: 10
    }
];

const TrainTrackGameScreen: React.FC<TrainTrackGameScreenProps> = ({ onBack }) => {
    const [levelIndex, setLevelIndex] = useState(0);
    const [path, setPath] = useState<Point[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [gameState, setGameState] = useState<'idle' | 'drawing' | 'running' | 'crashed' | 'success'>('idle');
    const [trainPos, setTrainPos] = useState<Point>({ x: 0, y: 0 });

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();
    const crashPointRef = useRef<Point | null>(null);

    const currentLevel = LEVELS[levelIndex % LEVELS.length];

    // Helpers
    const getCanvasPoint = (e: React.PointerEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.PointerEvent).clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.PointerEvent).clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const toScreen = (p: Point, width: number, height: number) => ({
        x: (p.x / 100) * width,
        y: (p.y / 100) * height
    });

    const checkCollision = (p1: Point, p2: Point, width: number, height: number): boolean => {
        // Check multiple points along the segment to prevent tunneling
        const steps = 5;
        for (let i = 1; i <= steps; i++) {
            const t = i / steps;
            const x = p1.x + (p2.x - p1.x) * t;
            const y = p1.y + (p2.y - p1.y) * t;

            const px = (x / width) * 100;
            const py = (y / height) * 100;
            const buffer = 2; // Train width buffer

            const hit = currentLevel.obstacles.some(obs => {
                return (
                    px > obs.x - buffer &&
                    px < obs.x + obs.width + buffer &&
                    py > obs.y - buffer &&
                    py < obs.y + obs.height + buffer
                );
            });
            if (hit) return true;
        }
        return false;
    };

    const playSound = (type: 'draw' | 'crash' | 'success' | 'choochoo') => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            const now = ctx.currentTime;

            if (type === 'draw') {
                osc.frequency.value = 200 + Math.random() * 50;
                osc.type = 'triangle';
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.1);
                osc.start(now);
                osc.stop(now + 0.1);
            } else if (type === 'crash') {
                osc.frequency.value = 100;
                osc.type = 'sawtooth';
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
            } else if (type === 'success') {
                osc.frequency.setValueAtTime(400, now);
                osc.frequency.linearRampToValueAtTime(800, now + 0.2);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.linearRampToValueAtTime(0, now + 1);
                osc.start(now);
                osc.stop(now + 1);
            }
        } catch (e) { console.error(e); }
    };

    // Draw Loop
    const render = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (canvas.width !== canvas.offsetWidth || canvas.height !== canvas.offsetHeight) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        const width = canvas.width;
        const height = canvas.height;

        // Clear
        ctx.clearRect(0, 0, width, height);

        // Background Path Pattern
        ctx.fillStyle = '#f0fdf4'; // Light green bg
        ctx.fillRect(0, 0, width, height);

        // Grid (Subtle)
        ctx.strokeStyle = '#dcfce7';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < width; x += 40) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
        for (let y = 0; y < height; y += 40) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
        ctx.stroke();

        // Obstacles (Walls)
        currentLevel.obstacles.forEach(obs => {
            const rx = (obs.x / 100) * width;
            const ry = (obs.y / 100) * height;
            const rw = (obs.width / 100) * width;
            const rh = (obs.height / 100) * height;

            ctx.shadowColor = 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 5;

            if (obs.type === 'rock') {
                ctx.fillStyle = '#78350F';
                ctx.fillRect(rx, ry, rw, rh);
                // Detail
                ctx.fillStyle = '#92400E';
                ctx.fillRect(rx + 5, ry + 5, rw - 10, rh - 10);
            } else if (obs.type === 'water') {
                ctx.fillStyle = '#3B82F6';
                ctx.fillRect(rx, ry, rw, rh);
                // Waves
                ctx.strokeStyle = '#93C5FD';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(rx + 5, ry + rh / 2);
                ctx.lineTo(rx + rw - 5, ry + rh / 2);
                ctx.stroke();
            } else {
                // Forest (Hedge)
                ctx.fillStyle = '#166534';
                ctx.fillRect(rx, ry, rw, rh);
                // Leaves
                ctx.fillStyle = '#15803D';
                for (let i = 0; i < 5; i++) {
                    ctx.beginPath();
                    ctx.arc(rx + Math.random() * rw, ry + Math.random() * rh, 10, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            ctx.shadowBlur = 0;
            ctx.shadowOffsetY = 0;
        });

        // Drawn Path
        if (path.length > 0) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // Outline
            ctx.lineWidth = 18;
            ctx.strokeStyle = 'rgba(0,0,0,0.1)';
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            path.forEach(p => ctx.lineTo(p.x, p.y));
            ctx.stroke();

            // Rails
            ctx.lineWidth = 14;
            ctx.strokeStyle = '#57534E'; // Stone color
            ctx.setLineDash([]);
            ctx.stroke();

            // Sleepers
            ctx.lineWidth = 10;
            ctx.strokeStyle = '#A8A29E';
            ctx.setLineDash([2, 12]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        // Start Point
        const start = toScreen(currentLevel.start, width, height);
        ctx.fillStyle = '#22C55E';
        ctx.beginPath();
        ctx.arc(start.x, start.y, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🚂', start.x, start.y);

        // End Point
        const end = toScreen(currentLevel.end, width, height);
        ctx.fillStyle = '#EF4444';
        ctx.beginPath();
        ctx.arc(end.x, end.y, 25, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillText('🏠', end.x, end.y);

        // Crash Marker
        if (gameState === 'crashed' && crashPointRef.current) {
            ctx.fillStyle = '#EF4444';
            ctx.font = '40px Arial';
            ctx.fillText('💥', crashPointRef.current.x, crashPointRef.current.y);
        }

        // Running Train
        if (gameState === 'running' || gameState === 'success') {
            const p = trainPos;
            ctx.font = '40px Arial';
            ctx.shadowColor = 'black';
            ctx.shadowBlur = 10;
            ctx.fillText('🚂', p.x, p.y);
            ctx.shadowBlur = 0;
        }

        requestRef.current = requestAnimationFrame(render);
    }, [currentLevel, path, gameState, trainPos]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(render);
        return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
    }, [render]);


    // Input Handlers
    const handleStart = (e: React.PointerEvent | React.TouchEvent) => {
        if (gameState === 'running' || gameState === 'success') return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const pt = getCanvasPoint(e, canvas);

        const width = canvas.width;
        const height = canvas.height;
        const start = toScreen(currentLevel.start, width, height);

        // Must start near the train
        const dist = Math.sqrt((pt.x - start.x) ** 2 + (pt.y - start.y) ** 2);
        if (dist < 40) {
            setGameState('drawing');
            setIsDrawing(true);
            setPath([start]);
            setTrainPos(start);
            crashPointRef.current = null;
        }
    };

    const handleMove = (e: React.PointerEvent | React.TouchEvent) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const pt = getCanvasPoint(e, canvas);
        const width = canvas.width;
        const height = canvas.height;

        // Collision Check
        if (path.length > 0) {
            const last = path[path.length - 1];
            // Don't add if too close
            if (Math.sqrt((pt.x - last.x) ** 2 + (pt.y - last.y) ** 2) < 5) return;

            if (checkCollision(last, pt, width, height)) {
                setIsDrawing(false);
                setGameState('crashed');
                crashPointRef.current = pt;
                playSound('crash');
                return;
            }
        }

        setPath(prev => [...prev, pt]);
        if (Math.random() > 0.8) playSound('draw');
    };

    const handleEnd = () => {
        if (!isDrawing) return;
        setIsDrawing(false);

        // Check if reached end
        const canvas = canvasRef.current;
        if (!canvas) return;
        const width = canvas.width;
        const height = canvas.height;

        const end = toScreen(currentLevel.end, width, height);
        const last = path[path.length - 1];

        const dist = Math.sqrt((last.x - end.x) ** 2 + (last.y - end.y) ** 2);

        if (dist < 40) {
            // Success! Start Animation
            startTrain();
        } else {
            // Failed to reach
            setGameState('idle');
            setPath([]); // Clear path
        }
    };

    const startTrain = () => {
        setGameState('running');
        let prog = 0;
        const totalPoints = path.length;
        // Adjust speed based on length
        const speed = 0.5; // points per frame approx

        const animateTrain = () => {
            prog += speed;
            if (prog >= totalPoints) {
                setGameState('success');
                playSound('success');
                return;
            }

            const idx = Math.floor(prog);
            const nextIdx = Math.min(idx + 1, totalPoints - 1);
            const sub = prog - idx;

            const p1 = path[idx];
            const p2 = path[nextIdx];

            // Interpolate
            const x = p1.x + (p2.x - p1.x) * sub;
            const y = p1.y + (p2.y - p1.y) * sub;
            setTrainPos({ x, y });

            // Particle smoke?

            requestAnimationFrame(animateTrain);
        };
        requestAnimationFrame(animateTrain);
    };

    return (
        <div className="fixed inset-0 bg-neutral-100 flex flex-col select-none touch-none">
            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start pointer-events-none z-10">
                <div className="pointer-events-auto">
                    <button onClick={onBack} className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                        <ArrowLeftIcon className="w-6 h-6 text-green-600" />
                    </button>

                    <div className="mt-4 bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow-md border-l-4 border-green-500">
                        <p className="text-green-800 font-bold text-sm">Seviye {levelIndex + 1}</p>
                    </div>
                </div>
            </div>

            {/* Canvas */}
            <canvas
                ref={canvasRef}
                className="w-full h-full touch-none cursor-crosshair"
                onPointerDown={handleStart}
                onPointerMove={handleMove}
                onPointerUp={handleEnd}
                onPointerLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
            />

            <div className="absolute bottom-8 w-full text-center pointer-events-none">
                <p className={`text-lg font-bold drop-shadow-md transition-all ${gameState === 'crashed' ? 'text-red-600 scale-125' :
                    gameState === 'drawing' ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                    {gameState === 'crashed' ? '💥 Çarptın! Yeniden dene.' :
                        gameState === 'drawing' ? 'Ray döşeniyor...' :
                            gameState === 'success' ? 'Harika! 🎉' :
                                'Parmağınla yolu çiz!'}
                </p>
            </div>

            {/* Success Overlay */}
            {gameState === 'success' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] p-8 text-center shadow-2xl animate-in zoom-in duration-300">
                        <div className="text-7xl mb-4 animate-bounce">🏆</div>
                        <h2 className="text-3xl font-bold text-green-600 mb-2">Başardın!</h2>
                        <button
                            onClick={() => {
                                setLevelIndex(l => l + 1);
                                setGameState('idle');
                                setPath([]);
                            }}
                            className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transform transition active:scale-95 text-xl"
                        >
                            Sonraki Bölüm
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainTrackGameScreen;
