import React, { useRef, useEffect, useState, useCallback } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import { t } from '../../i18n/index.ts';

interface BusJamGameScreenProps {
    onBack: () => void;
}

// Yolcu tipi
interface Passenger {
    id: number;
    color: string;
    colorName: string;
    x: number;
    y: number;
    originX: number;
    originY: number;
    state: 'waiting' | 'dragging' | 'boarding' | 'seated';
    boardingProgress: number;
}

// Otobüs tipi
interface Bus {
    id: number;
    color: string;
    colorName: string;
    x: number;
    y: number;
    passengers: number;
    maxPassengers: number;
    state: 'waiting' | 'leaving' | 'arriving';
    animationProgress: number;
}

// Parçacık efekti
interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
    size: number;
}

// Renk tanımları
const COLORS = [
    { name: 'Kırmızı', hex: '#EF4444', light: '#FEE2E2' },
    { name: 'Mavi', hex: '#3B82F6', light: '#DBEAFE' },
    { name: 'Yeşil', hex: '#22C55E', light: '#DCFCE7' },
    { name: 'Sarı', hex: '#EAB308', light: '#FEF9C3' },
];

const BusJamGameScreen: React.FC<BusJamGameScreenProps> = ({ onBack }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>(0);
    const audioContextRef = useRef<AudioContext | null>(null);

    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const [buses, setBuses] = useState<Bus[]>([]);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [draggedPassenger, setDraggedPassenger] = useState<number | null>(null);
    const [isLevelComplete, setIsLevelComplete] = useState(false);
    const [showWrongFeedback, setShowWrongFeedback] = useState(false);

    // Ses çalma
    const playSound = useCallback((type: 'board' | 'wrong' | 'depart' | 'complete' | 'pickup') => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioContextRef.current;
            const now = ctx.currentTime;

            if (type === 'board') {
                // Mutlu biniş sesi
                [523, 659, 784].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.12, now + i * 0.08);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.15);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.08);
                    osc.stop(now + i * 0.08 + 0.15);
                });
            } else if (type === 'wrong') {
                // Nazik uyarı sesi
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.linearRampToValueAtTime(200, now + 0.2);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.25);
            } else if (type === 'depart') {
                // Otobüs kalkış sesi
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(80, now);
                osc.frequency.linearRampToValueAtTime(120, now + 0.3);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.4);
            } else if (type === 'complete') {
                // Seviye tamamlama fanfari
                [523, 659, 784, 1047].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.value = freq;
                    gain.gain.setValueAtTime(0.15, now + i * 0.12);
                    gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.3);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(now + i * 0.12);
                    osc.stop(now + i * 0.12 + 0.3);
                });
            } else if (type === 'pickup') {
                // Yolcu kaldırma sesi
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = 400;
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.1);
            }
        } catch (e) {
            console.log('Audio error:', e);
        }
    }, []);

    // Parçacık oluştur
    const createParticles = useCallback((x: number, y: number, color: string, count: number = 8) => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 * i) / count;
            newParticles.push({
                x,
                y,
                vx: Math.cos(angle) * (3 + Math.random() * 3),
                vy: Math.sin(angle) * (3 + Math.random() * 3),
                life: 1,
                color,
                size: 4 + Math.random() * 4,
            });
        }
        setParticles(prev => [...prev, ...newParticles].slice(-50));
    }, []);

    // Seviye başlat
    const initLevel = useCallback(() => {
        const numColors = Math.min(2 + Math.floor((level - 1) / 2), 4);
        const passengersPerColor = 3;
        const totalPassengers = numColors * passengersPerColor;

        // Yolcuları oluştur
        const levelColors = COLORS.slice(0, numColors);
        const newPassengers: Passenger[] = [];

        const shuffledColors: typeof COLORS[0][] = [];
        for (let i = 0; i < passengersPerColor; i++) {
            levelColors.forEach(c => shuffledColors.push(c));
        }
        // Karıştır
        for (let i = shuffledColors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledColors[i], shuffledColors[j]] = [shuffledColors[j], shuffledColors[i]];
        }

        const containerWidth = containerRef.current?.clientWidth || 400;
        const containerHeight = containerRef.current?.clientHeight || 600;
        const startX = 30;
        const startY = containerHeight * 0.25;
        const spacing = Math.min(70, (containerHeight * 0.6) / totalPassengers);

        shuffledColors.forEach((color, i) => {
            const x = startX + (i % 2) * 50;
            const y = startY + Math.floor(i / 2) * spacing;
            newPassengers.push({
                id: i,
                color: color.hex,
                colorName: color.name,
                x,
                y,
                originX: x,
                originY: y,
                state: 'waiting',
                boardingProgress: 0,
            });
        });

        // Otobüsleri oluştur
        const busWidth = 100;
        const busHeight = 70;
        const busX = containerWidth - busWidth - 20;
        const busSpacing = busHeight + 30;
        const busStartY = containerHeight * 0.2;

        const newBuses: Bus[] = levelColors.map((color, i) => ({
            id: i,
            color: color.hex,
            colorName: color.name,
            x: busX,
            y: busStartY + i * busSpacing,
            passengers: 0,
            maxPassengers: passengersPerColor,
            state: 'waiting' as const,
            animationProgress: 0,
        }));

        setPassengers(newPassengers);
        setBuses(newBuses);
        setDraggedPassenger(null);
        setIsLevelComplete(false);
        setParticles([]);
    }, [level]);

    useEffect(() => {
        initLevel();
    }, [initLevel]);

    // Animasyon döngüsü
    useEffect(() => {
        const animate = () => {
            // Parçacıkları güncelle
            setParticles(prev =>
                prev
                    .map(p => ({
                        ...p,
                        x: p.x + p.vx,
                        y: p.y + p.vy,
                        vy: p.vy + 0.2,
                        life: p.life - 0.03,
                    }))
                    .filter(p => p.life > 0)
            );

            // Otobüsleri güncelle
            setBuses(prev =>
                prev.map(bus => {
                    if (bus.state === 'leaving') {
                        const newProgress = bus.animationProgress + 0.02;
                        if (newProgress >= 1) {
                            return { ...bus, state: 'arriving' as const, animationProgress: 0 };
                        }
                        return { ...bus, animationProgress: newProgress };
                    } else if (bus.state === 'arriving') {
                        const newProgress = bus.animationProgress + 0.03;
                        if (newProgress >= 1) {
                            return { ...bus, state: 'waiting' as const, animationProgress: 0, passengers: 0 };
                        }
                        return { ...bus, animationProgress: newProgress };
                    }
                    return bus;
                })
            );

            // Biniş animasyonlarını güncelle
            setPassengers(prev =>
                prev.map(p => {
                    if (p.state === 'boarding') {
                        const newProgress = p.boardingProgress + 0.05;
                        if (newProgress >= 1) {
                            return { ...p, state: 'seated' as const, boardingProgress: 1 };
                        }
                        return { ...p, boardingProgress: newProgress };
                    }
                    return p;
                })
            );

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    // Seviye tamamlandı mı kontrol et
    useEffect(() => {
        const waitingPassengers = passengers.filter(p => p.state === 'waiting' || p.state === 'dragging');
        const boardingPassengers = passengers.filter(p => p.state === 'boarding');

        if (passengers.length > 0 && waitingPassengers.length === 0 && boardingPassengers.length === 0 && !isLevelComplete) {
            setIsLevelComplete(true);
            playSound('complete');
        }
    }, [passengers, isLevelComplete, playSound]);

    // Yolcu biniş işlemi
    const boardPassenger = useCallback((passengerId: number, busId: number) => {
        const passenger = passengers.find(p => p.id === passengerId);
        const bus = buses.find(b => b.id === busId);

        if (!passenger || !bus) return;

        if (passenger.color === bus.color && bus.state === 'waiting') {
            // Doğru eşleşme!
            playSound('board');
            createParticles(bus.x + 50, bus.y + 35, bus.color, 12);
            setScore(s => s + 10 * level);

            setPassengers(prev =>
                prev.map(p =>
                    p.id === passengerId
                        ? { ...p, state: 'boarding' as const, x: bus.x + 50, y: bus.y + 35, boardingProgress: 0 }
                        : p
                )
            );

            setBuses(prev =>
                prev.map(b => {
                    if (b.id === busId) {
                        const newPassengerCount = b.passengers + 1;
                        if (newPassengerCount >= b.maxPassengers) {
                            setTimeout(() => playSound('depart'), 300);
                            return { ...b, passengers: newPassengerCount, state: 'leaving' as const, animationProgress: 0 };
                        }
                        return { ...b, passengers: newPassengerCount };
                    }
                    return b;
                })
            );
        } else {
            // Yanlış eşleşme!
            playSound('wrong');
            setShowWrongFeedback(true);
            setTimeout(() => setShowWrongFeedback(false), 300);

            setPassengers(prev =>
                prev.map(p =>
                    p.id === passengerId
                        ? { ...p, state: 'waiting' as const, x: p.originX, y: p.originY }
                        : p
                )
            );
        }

        setDraggedPassenger(null);
    }, [passengers, buses, level, playSound, createParticles]);

    // Pointer olayları
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        if (isLevelComplete) return;

        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // En yakın yolcuyu bul
        const clickedPassenger = passengers.find(p => {
            if (p.state !== 'waiting') return false;
            const dx = x - p.x;
            const dy = y - p.y;
            return Math.sqrt(dx * dx + dy * dy) < 40;
        });

        if (clickedPassenger) {
            playSound('pickup');
            setDraggedPassenger(clickedPassenger.id);
            setPassengers(prev =>
                prev.map(p =>
                    p.id === clickedPassenger.id ? { ...p, state: 'dragging' as const, x, y } : p
                )
            );
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
        }
    }, [passengers, isLevelComplete, playSound]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (draggedPassenger === null) return;

        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setPassengers(prev =>
            prev.map(p => (p.id === draggedPassenger ? { ...p, x, y } : p))
        );
    }, [draggedPassenger]);

    const handlePointerUp = useCallback((e: React.PointerEvent) => {
        if (draggedPassenger === null) return;

        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // En yakın otobüsü bul
        const targetBus = buses.find(b => {
            if (b.state !== 'waiting') return false;
            return x >= b.x && x <= b.x + 100 && y >= b.y && y <= b.y + 70;
        });

        if (targetBus) {
            boardPassenger(draggedPassenger, targetBus.id);
        } else {
            // Otobüse bırakılmadı, geri dön
            setPassengers(prev =>
                prev.map(p =>
                    p.id === draggedPassenger
                        ? { ...p, state: 'waiting' as const, x: p.originX, y: p.originY }
                        : p
                )
            );
            setDraggedPassenger(null);
        }
    }, [draggedPassenger, buses, boardPassenger]);

    // Canvas çizimi
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Otobüsleri çiz
            buses.forEach(bus => {
                ctx.save();

                let offsetX = 0;
                if (bus.state === 'leaving') {
                    offsetX = bus.animationProgress * (canvas.width + 150);
                } else if (bus.state === 'arriving') {
                    offsetX = (1 - bus.animationProgress) * -(canvas.width + 150);
                }

                ctx.translate(bus.x + offsetX, bus.y);

                // Otobüs gövdesi
                ctx.fillStyle = bus.color;
                ctx.beginPath();
                ctx.roundRect(0, 0, 100, 70, 10);
                ctx.fill();

                // Otobüs penceresi
                ctx.fillStyle = '#87CEEB';
                ctx.beginPath();
                ctx.roundRect(60, 8, 35, 25, 5);
                ctx.fill();

                // Kapı
                ctx.fillStyle = bus.color;
                ctx.filter = 'brightness(0.8)';
                ctx.beginPath();
                ctx.roundRect(8, 15, 20, 40, 3);
                ctx.fill();
                ctx.filter = 'none';

                // Tekerlekler
                ctx.fillStyle = '#333';
                ctx.beginPath();
                ctx.arc(25, 70, 12, 0, Math.PI * 2);
                ctx.arc(75, 70, 12, 0, Math.PI * 2);
                ctx.fill();

                // Tekerlek jantı
                ctx.fillStyle = '#666';
                ctx.beginPath();
                ctx.arc(25, 70, 6, 0, Math.PI * 2);
                ctx.arc(75, 70, 6, 0, Math.PI * 2);
                ctx.fill();

                // Yolcu sayısı göstergesi
                ctx.fillStyle = 'white';
                ctx.font = 'bold 16px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(`${bus.passengers}/${bus.maxPassengers}`, 50, 50);

                ctx.restore();
            });

            // Parçacıkları çiz
            particles.forEach(p => {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            // Yolcuları çiz
            passengers.forEach(p => {
                if (p.state === 'seated') return;

                ctx.save();
                ctx.translate(p.x, p.y);

                const scale = p.state === 'dragging' ? 1.2 : 1;
                ctx.scale(scale, scale);

                // Gölge
                if (p.state === 'dragging') {
                    ctx.fillStyle = 'rgba(0,0,0,0.2)';
                    ctx.beginPath();
                    ctx.ellipse(0, 35, 20, 8, 0, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Vücut
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.ellipse(0, 15, 18, 22, 0, 0, Math.PI * 2);
                ctx.fill();

                // Kafa
                ctx.fillStyle = '#FFE4C4';
                ctx.beginPath();
                ctx.arc(0, -15, 15, 0, Math.PI * 2);
                ctx.fill();

                // Gözler
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(-5, -17, 5, 0, Math.PI * 2);
                ctx.arc(5, -17, 5, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#333';
                ctx.beginPath();
                ctx.arc(-5, -17, 2, 0, Math.PI * 2);
                ctx.arc(5, -17, 2, 0, Math.PI * 2);
                ctx.fill();

                // Ağız (gülümseme)
                ctx.strokeStyle = '#333';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, -10, 5, 0.2 * Math.PI, 0.8 * Math.PI);
                ctx.stroke();

                ctx.restore();
            });

            requestAnimationFrame(draw);
        };

        const animId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(animId);
    }, [buses, passengers, particles]);

    return (
        <div className="fixed inset-0 overflow-hidden select-none" style={{ touchAction: 'none' }}>
            {/* Arka plan */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 30%, #90EE90 60%, #228B22 100%)',
                }}
            />

            {/* Yol */}
            <div
                className="absolute right-0 top-0 bottom-0"
                style={{
                    width: '45%',
                    background: 'linear-gradient(90deg, #90EE90 0%, #4a4a4a 10%, #4a4a4a 90%, #4a4a4a 100%)',
                }}
            >
                {/* Yol çizgileri */}
                <div className="absolute left-[10%] top-0 bottom-0 w-1 bg-yellow-400 opacity-80" />
                <div className="absolute left-[10%] top-0 bottom-0 w-1 bg-transparent"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(to bottom, #facc15 0, #facc15 30px, transparent 30px, transparent 60px)'
                    }}
                />
            </div>

            {/* Güneş */}
            <div
                className="absolute top-6 left-6 w-16 h-16 rounded-full bg-yellow-300"
                style={{ boxShadow: '0 0 40px 15px rgba(255,220,100,0.4)' }}
            />

            {/* Bulutlar */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-white/60"
                        style={{
                            left: `${10 + i * 25}%`,
                            top: `${5 + (i % 2) * 8}%`,
                            fontSize: `${40 + (i % 2) * 15}px`,
                            animation: `floatCloud ${10 + i * 2}s ease-in-out infinite`,
                        }}
                    >
                        ☁️
                    </div>
                ))}
            </div>

            {/* Başlık */}
            <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3">
                <button onClick={onBack} className="p-3 rounded-full bg-white/90 shadow-lg">
                    <ArrowLeftIcon className="w-6 h-6 text-blue-600" />
                </button>

                <h1 className="text-xl font-bold text-white drop-shadow-lg">
                    🚌 {t('miniGames.busJam.title', 'Otobüs Durağı')}
                </h1>

                <div className="bg-white/90 px-4 py-2 rounded-full shadow-lg">
                    <span className="text-yellow-500 font-bold">⭐ {score}</span>
                </div>
            </div>

            {/* Seviye ve İpucu */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40">
                <div className="bg-white/90 backdrop-blur rounded-2xl px-6 py-3 shadow-lg text-center">
                    <div className="text-lg font-bold text-blue-600">Seviye {level}</div>
                    <div className="text-sm text-gray-600">
                        Yolcuları aynı renkteki otobüse sürükle! 🚌
                    </div>
                </div>
            </div>

            {/* Oyun alanı (Canvas) */}
            <div ref={containerRef} className="absolute inset-0 z-20">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                />
            </div>

            {/* Yanlış eşleşme geri bildirimi */}
            {showWrongFeedback && (
                <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                    <div className="bg-red-500/80 text-white text-4xl font-bold px-8 py-4 rounded-2xl animate-pulse">
                        ❌ Farklı Renk!
                    </div>
                </div>
            )}

            {/* Seviye tamamlandı */}
            {isLevelComplete && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-[2rem] p-8 text-center shadow-2xl animate-bounce-in max-w-sm mx-4">
                        <div className="text-7xl mb-4 animate-bounce">🎉</div>
                        <h2 className="text-3xl font-bold text-blue-600 mb-2">
                            Harika İş!
                        </h2>
                        <p className="text-gray-600 mb-2">
                            Seviye {level} tamamlandı!
                        </p>
                        <p className="text-xl font-bold text-yellow-500 mb-6">
                            ⭐ {score} Puan
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={onBack}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-full shadow-lg transition-all"
                            >
                                🏠 Menü
                            </button>
                            <button
                                onClick={() => setLevel(l => l + 1)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105"
                            >
                                Sonraki Seviye ➡️
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Animasyonlar */}
            <style>{`
        @keyframes floatCloud {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(15px) translateY(-8px); }
        }
        @keyframes bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in { animation: bounce-in 0.5s ease-out; }
      `}</style>
        </div>
    );
};

export default BusJamGameScreen;
