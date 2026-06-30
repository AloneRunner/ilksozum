import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

interface RoomCleaningGameScreenProps {
    onBack: () => void;
}

type ItemType = 'toy' | 'trash' | 'book' | 'clothes';

interface CleaningItem {
    id: number;
    type: ItemType;
    emoji: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    isDragging: boolean;
    isPlaced: boolean;
    scale: number;
    rotation: number;
}

interface Stain {
    id: number;
    x: number;
    y: number;
    radius: number;
    opacity: number;
    color: string;
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

const ITEM_TYPES = {
    toy: { emojis: ['🧸', '🎮', '🚗', '⚽', '🎀'], container: '🧺', name: 'Oyuncak', color: '#EC4899', xPerc: 0.15 },
    trash: { emojis: ['🗑️', '📄', '🥤', '🍬'], container: '🗑️', name: 'Çöp', color: '#6B7280', xPerc: 0.38 },
    book: { emojis: ['📚', '📖', '📕', '📗'], container: '📚', name: 'Kitap', color: '#3B82F6', xPerc: 0.62 },
    clothes: { emojis: ['👕', '👖', '🧦', '🧢'], container: '🧺', name: 'Kıyafet', color: '#8B5CF6', xPerc: 0.85 },
};

const RoomCleaningGameScreen: React.FC<RoomCleaningGameScreenProps> = ({ onBack }) => {
    // Game State
    const [phase, setPhase] = useState<'sorting' | 'scrubbing' | 'completed'>('sorting');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [guideMessage, setGuideMessage] = useState('Dağınıklığı topla!');

    // Refs
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>();
    const itemsRef = useRef<CleaningItem[]>([]);
    const stainsRef = useRef<Stain[]>([]);
    const particlesRef = useRef<Particle[]>([]);
    const draggingIdRef = useRef<number | null>(null);
    const mousePosRef = useRef({ x: 0, y: 0 });

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

    const createParticles = (x: number, y: number, colorHex: string, count: number = 8) => {
        for (let i = 0; i < count; i++) {
            particlesRef.current.push({
                x,
                y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0,
                color: colorHex,
                size: 3 + Math.random() * 5
            });
        }
    };

    // Initialize Level
    const initLevel = useCallback(() => {
        const canvas = canvasRef.current;
        const width = canvas ? canvas.width : window.innerWidth;
        const height = canvas ? canvas.height : window.innerHeight;

        setPhase('sorting');
        setGuideMessage('Dağınıklığı uygun kutulara taşı!');

        // 1. Create Items
        const newItems: CleaningItem[] = [];
        const definitions = Object.keys(ITEM_TYPES) as ItemType[];
        const count = 5 + level * 2;

        for (let i = 0; i < count; i++) {
            const type = definitions[Math.floor(Math.random() * definitions.length)];
            const typeDef = ITEM_TYPES[type];
            newItems.push({
                id: Date.now() + i,
                type,
                emoji: typeDef.emojis[Math.floor(Math.random() * typeDef.emojis.length)],
                x: Math.random() * (width - 100) + 50,
                y: Math.random() * (height - 300) + 150, // Floor area
                vx: 0,
                vy: 0,
                isDragging: false,
                isPlaced: false,
                scale: 1,
                rotation: (Math.random() - 0.5) * 0.5
            });
        }
        itemsRef.current = newItems;

        // 2. Create Stains (for Phase 2)
        const newStains: Stain[] = [];
        const stainCount = 2 + Math.floor(level / 2);
        const stainColors = ['#5D4037', '#3E2723', '#4E342E']; // Muddy colors

        for (let i = 0; i < stainCount; i++) {
            newStains.push({
                id: i,
                x: Math.random() * (width - 100) + 50,
                y: Math.random() * (height - 250) + 200,
                radius: 40 + Math.random() * 30,
                opacity: 1,
                color: stainColors[Math.floor(Math.random() * stainColors.length)]
            });
        }
        stainsRef.current = newStains;

    }, [level]);

    useEffect(() => {
        initLevel();
    }, [initLevel]);

    const checkPhaseCompletion = () => {
        if (phase === 'sorting') {
            const remaining = itemsRef.current.filter(i => !i.isPlaced);
            if (remaining.length === 0) {
                // Sorting Done -> Go to Scrubbing
                playSound(800, 'sine', 0.5);
                setPhase('scrubbing');
                setGuideMessage('Şimdi yerdeki lekeleri ovalayarak temizle!');
                createParticles(window.innerWidth / 2, window.innerHeight / 2, '#FFD700', 50); // Celebration sparkles
            }
        } else if (phase === 'scrubbing') {
            const remaining = stainsRef.current.filter(s => s.opacity > 0);
            if (remaining.length === 0) {
                // All Done -> Level Up
                setPhase('completed');
                playSound(1000, 'sine', 0.8);
                createParticles(window.innerWidth / 2, window.innerHeight / 2, '#FFD700', 100);
            }
        }
    };

    // Game Loop
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Standard clear

        // Draw Room Background (Simple Geometry)
        const floorY = canvas.height * 0.3;

        // Wall
        const gradient = ctx.createLinearGradient(0, 0, 0, floorY);
        gradient.addColorStop(0, '#FEF3C7');
        gradient.addColorStop(1, '#FDE68A');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, floorY);

        // Floor (Wood pattern effect)
        ctx.fillStyle = '#FBBF24'; // Base wood color
        ctx.fillRect(0, floorY, canvas.width, canvas.height - floorY);
        // Add simple planks
        ctx.strokeStyle = 'rgba(180, 83, 9, 0.2)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 100) {
            ctx.moveTo(x, floorY);
            ctx.lineTo(x - 100, canvas.height); // Perspective lines
        }
        ctx.stroke();


        // Draw Containers (Only in Sorting Phase)
        const containerY = floorY - 60;
        if (phase === 'sorting') {
            Object.entries(ITEM_TYPES).forEach(([_key, val]) => {
                const cx = canvas.width * val.xPerc;

                // Draw Box/Container
                ctx.save();
                ctx.translate(cx, containerY);

                // Shadow
                ctx.fillStyle = 'rgba(0,0,0,0.1)';
                ctx.beginPath();
                ctx.ellipse(0, 40, 40, 10, 0, 0, Math.PI * 2);
                ctx.fill();

                // Box Body
                ctx.fillStyle = val.color; // Box color based on type
                ctx.beginPath();
                ctx.roundRect(-35, -30, 70, 70, 10);
                ctx.fill();
                ctx.lineWidth = 3;
                ctx.strokeStyle = 'white';
                ctx.stroke();

                // Emoji Label
                ctx.font = '30px serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(val.container, 0, 5);

                // Text Name
                ctx.font = 'bold 12px sans-serif';
                ctx.fillStyle = '#374151'; // Gray-700
                ctx.fillText(val.name, 0, 55);

                ctx.restore();
            });
        }

        // Draw Stains (Only active in Scrubbing, but maybe visible underneath items in Sorting?)
        // Let's show them in scrubbing phase to keep sorting clean.
        if (phase === 'scrubbing') {
            stainsRef.current.forEach(stain => {
                if (stain.opacity <= 0) return;

                ctx.save();
                ctx.globalAlpha = stain.opacity;
                ctx.fillStyle = stain.color;
                ctx.beginPath();
                // Irregular shape for stain
                ctx.ellipse(stain.x, stain.y, stain.radius, stain.radius * 0.7, 0.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }

        // Draw Items (Sorting Phase)
        if (phase === 'sorting') {
            itemsRef.current.forEach(item => {
                if (item.isPlaced) return; // Don't draw placed items on floor

                // Physics (Friction)
                if (!item.isDragging) {
                    item.x += item.vx;
                    item.y += item.vy;
                    item.vx *= 0.9;
                    item.vy *= 0.9;

                    // Bounce off walls
                    if (item.x < 30 || item.x > canvas.width - 30) item.vx *= -0.5;
                    if (item.y < floorY + 30 || item.y > canvas.height - 30) item.vy *= -0.5;

                    // Bounds correction
                    item.x = Math.max(30, Math.min(canvas.width - 30, item.x));
                    item.y = Math.max(floorY + 30, Math.min(canvas.height - 30, item.y));
                }

                ctx.save();
                ctx.translate(item.x, item.y);
                ctx.scale(item.scale, item.scale);
                ctx.rotate(item.rotation);

                // Shadow
                if (item.isDragging) {
                    ctx.shadowColor = 'rgba(0,0,0,0.3)';
                    ctx.shadowBlur = 20;
                    ctx.shadowOffsetY = 20;
                } else {
                    ctx.shadowColor = 'rgba(0,0,0,0.1)';
                    ctx.shadowBlur = 5;
                    ctx.shadowOffsetY = 5;
                }

                ctx.font = '50px serif';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(item.emoji, 0, 0);

                ctx.restore();
            });
        }

        // Draw Particles
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
    }, [phase]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [animate]);

    // Input Handling
    const handleStart = (clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        mousePosRef.current = { x, y };

        if (phase === 'sorting') {
            // Check item intersection (iterate backwards for z-order)
            for (let i = itemsRef.current.length - 1; i >= 0; i--) {
                const item = itemsRef.current[i];
                if (item.isPlaced) continue;

                const dist = Math.sqrt((x - item.x) ** 2 + (y - item.y) ** 2);
                if (dist < 40) { // Hit radius
                    draggingIdRef.current = item.id;
                    item.isDragging = true;
                    item.scale = 1.2;
                    playSound(300, 'sine', 0.05);
                    return;
                }
            }
        }
    };

    const handleMove = (clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        // Scrubbing Mechanic
        if (phase === 'scrubbing') {
            const dx = x - mousePosRef.current.x;
            const dy = y - mousePosRef.current.y;
            const speed = Math.sqrt(dx * dx + dy * dy);

            // If moving fast enough over a stain
            if (speed > 5) {
                let cleanedSomething = false;
                stainsRef.current.forEach(stain => {
                    if (stain.opacity <= 0) return;
                    const dist = Math.sqrt((x - stain.x) ** 2 + (y - stain.y) ** 2);
                    if (dist < stain.radius) {
                        stain.opacity -= 0.05; // cleaning rate
                        cleanedSomething = true;

                        if (Math.random() > 0.7) {
                            createParticles(x, y, '#EFF6FF', 1); // Soap bubbles
                        }

                        if (stain.opacity <= 0) {
                            // Fully cleaned this stain
                            createParticles(stain.x, stain.y, '#FFD700', 20); // Gold sparkles
                            playSound(600, 'sine', 0.1);
                            setScore(s => s + 5);
                            checkPhaseCompletion(); // Check immediately
                        }
                    }
                });

                if (cleanedSomething && Math.random() > 0.8) {
                    playSound(100 + Math.random() * 200, 'triangle', 0.05); // Scrubbing noise
                }
            }
        }

        // Sorting Dragging Logic
        if (phase === 'sorting' && draggingIdRef.current !== null) {
            const item = itemsRef.current.find(i => i.id === draggingIdRef.current);
            if (item) {
                // Calculate velocity for throw
                item.vx = (x - item.x) * 0.5;
                item.vy = (y - item.y) * 0.5;

                item.x = x;
                item.y = y;
            }
        }

        mousePosRef.current = { x, y };
    };

    const handleEnd = () => {
        if (phase === 'sorting' && draggingIdRef.current !== null) {
            const item = itemsRef.current.find(i => i.id === draggingIdRef.current);
            if (item) {
                item.isDragging = false;
                item.scale = 1;

                // Check Drop Zones (Containers)
                const canvas = canvasRef.current;
                if (!canvas) return;

                const containerY = canvas.height * 0.3 - 60;
                let dropped = false;

                Object.entries(ITEM_TYPES).forEach(([typeKey, val]) => {
                    const cx = canvas.width * val.xPerc;
                    // Simple box check around container
                    const dx = Math.abs(item.x - cx);
                    const dy = Math.abs(item.y - containerY);

                    if (dx < 60 && dy < 80) { // Hit container
                        // Check match
                        if (item.type === typeKey) {
                            // Correct!
                            item.isPlaced = true;
                            setScore(s => s + 10);
                            playSound(500, 'sine', 0.1);
                            createParticles(cx, containerY, val.color, 15);
                            dropped = true;
                        } else {
                            // Wrong!
                            playSound(150, 'sawtooth', 0.2);
                            // Bounce back
                            item.vy = 15; // Push down
                            item.vx = (Math.random() - 0.5) * 20;
                            createParticles(cx, containerY, '#EF4444', 5); // Red invalid
                        }
                    }
                });

                if (dropped) {
                    checkPhaseCompletion();
                }
            }
            draggingIdRef.current = null;
        }
    };

    return (
        <div className="fixed inset-0 bg-neutral-100 flex flex-col overflow-hidden select-none">

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full touch-none cursor-grab active:cursor-grabbing"
                onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
                onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
                onTouchEnd={handleEnd}
            />

            {/* UI Overlay */}
            <div className="absolute top-0 w-full p-4 flex justify-between items-start pointer-events-none">
                <div className="pointer-events-auto">
                    <button
                        onClick={onBack}
                        className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                    >
                        <ArrowLeftIcon className="w-6 h-6 text-amber-600" />
                    </button>

                    <div className="mt-4 bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow-md border-l-4 border-amber-500">
                        <p className="text-amber-800 font-bold text-sm">{guideMessage}</p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <div className="bg-white/90 px-4 py-2 rounded-full shadow-lg border-2 border-yellow-100">
                        <span className="text-yellow-500 font-bold text-xl">⭐ {score}</span>
                    </div>
                </div>
            </div>

            {/* Success Overlay */}
            {phase === 'completed' && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm pointer-events-auto">
                    <div className="bg-white rounded-[2rem] p-8 text-center shadow-2xl animate-in zoom-in duration-300 max-w-sm mx-4">
                        <div className="text-7xl mb-4 animate-bounce">✨</div>
                        <h2 className="text-3xl font-bold text-amber-600 mb-2">Tertemiz!</h2>
                        <p className="text-gray-600 mb-6">Oda pırıl pırıl oldu.</p>
                        <button
                            onClick={() => {
                                setLevel(l => l + 1);
                                // InitLevel triggered by effect
                            }}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transform transition active:scale-95 text-xl"
                        >
                            Sonraki Oda
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomCleaningGameScreen;
