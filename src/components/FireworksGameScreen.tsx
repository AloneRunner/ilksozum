import React, { useRef, useEffect, useCallback, useState } from 'react';
import { t } from '../i18n/index.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';

// HSL Neon Renk Paleti
const HUE_PALETTE = [0, 30, 60, 120, 180, 240, 280, 320];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  hue: number;
  size: number;
  life: number;
  maxLife: number;
  decay: number;
  isTrail: boolean;
  sparkle: boolean;
}

interface Rocket {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  hue: number;
  trail: { x: number; y: number; alpha: number }[];
}

interface FireworksGameScreenProps {
  onBack: () => void;
}

const FireworksGameScreen: React.FC<FireworksGameScreenProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const lastTimeRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragPosRef = useRef<{ x: number; y: number } | null>(null);

  const [tapCount, setTapCount] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  // Ekran yönü algılama
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ses efekti - yumuşak ve hoş sesler
  const playSound = useCallback((type: 'launch' | 'explode' | 'drag') => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;

      if (type === 'launch') {
        // Yumuşak fırlatma sesi - melodik yükselme
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      } else if (type === 'explode') {
        // Güzel patlama - melodik çıngıraklar (gürültü yok)
        const baseFreq = 400 + Math.random() * 200;
        
        // Ana melodik ses - çan gibi
        const mainOsc = ctx.createOscillator();
        const mainGain = ctx.createGain();
        mainOsc.type = 'sine';
        mainOsc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
        mainOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, ctx.currentTime + 0.6);
        mainGain.gain.setValueAtTime(0.12, ctx.currentTime);
        mainGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        mainOsc.connect(mainGain);
        mainGain.connect(ctx.destination);
        mainOsc.start();
        mainOsc.stop(ctx.currentTime + 0.6);

        // Harmonik çıngıraklar - yumuşak ve melodik
        [1.5, 2, 2.5].forEach((mult, i) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = baseFreq * mult;
          oscGain.gain.setValueAtTime(0.04 / (i + 1), ctx.currentTime + i * 0.05);
          oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5 + i * 0.1);
          osc.connect(oscGain);
          oscGain.connect(ctx.destination);
          osc.start(ctx.currentTime + i * 0.05);
          osc.stop(ctx.currentTime + 0.5 + i * 0.1);
        });

        // Yumuşak püskürme sesi - çok hafif
        const puffOsc = ctx.createOscillator();
        const puffGain = ctx.createGain();
        puffOsc.type = 'triangle';
        puffOsc.frequency.setValueAtTime(150, ctx.currentTime);
        puffOsc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);
        puffGain.gain.setValueAtTime(0.03, ctx.currentTime);
        puffGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        puffOsc.connect(puffGain);
        puffGain.connect(ctx.destination);
        puffOsc.start();
        puffOsc.stop(ctx.currentTime + 0.15);
      } else if (type === 'drag') {
        // Mini ışıltı sesi - çok yumuşak
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = 800 + Math.random() * 400;
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      }
    } catch (e) {
      console.log('Audio error:', e);
    }
  }, []);

  // Patlama oluştur
  const createExplosion = useCallback((x: number, y: number, isMain: boolean = true) => {
    const hue = HUE_PALETTE[Math.floor(Math.random() * HUE_PALETTE.length)];
    const particleCount = isMain ? 60 + Math.floor(Math.random() * 40) : 12;
    const speed = isMain ? 8 : 4;

    const explosionType = Math.floor(Math.random() * 5);

    for (let i = 0; i < particleCount; i++) {
      let angle: number, velocity: number;

      switch (explosionType) {
        case 0: // Dairesel
          angle = (i / particleCount) * Math.PI * 2;
          velocity = speed * (0.5 + Math.random() * 0.5);
          break;
        case 1: // Kalp
          const t = (i / particleCount) * Math.PI * 2;
          const hx = 16 * Math.pow(Math.sin(t), 3);
          const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
          angle = Math.atan2(hy, hx);
          velocity = Math.sqrt(hx * hx + hy * hy) * 0.4;
          break;
        case 2: // Yıldız (5 uçlu)
          const starPoint = i % 5;
          const starAngle = (starPoint / 5) * Math.PI * 2 - Math.PI / 2;
          angle = starAngle + (Math.random() - 0.5) * 0.3;
          velocity = speed * (0.3 + (i / particleCount) * 0.7);
          break;
        case 3: // Spiral
          angle = (i / particleCount) * Math.PI * 6;
          velocity = speed * (0.3 + (i / particleCount) * 0.7);
          break;
        case 4: // Çift halka
        default:
          const ring = i < particleCount / 2 ? 0 : 1;
          angle = (i / (particleCount / 2)) * Math.PI * 2;
          velocity = speed * (ring === 0 ? 0.5 : 1);
          break;
      }

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        hue: hue + (Math.random() - 0.5) * 30,
        size: isMain ? 3 + Math.random() * 3 : 2 + Math.random() * 2,
        life: 1.0,
        maxLife: 1.0,
        decay: isMain ? 0.012 + Math.random() * 0.008 : 0.025,
        isTrail: Math.random() > 0.3,
        sparkle: Math.random() > 0.7
      });
    }

    if (isMain) {
      playSound('explode');
    }
  }, [playSound]);

  // Roket fırlat
  const launchRocket = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const targetY = y;
    const hue = HUE_PALETTE[Math.floor(Math.random() * HUE_PALETTE.length)];

    rocketsRef.current.push({
      x,
      y: canvas.height,
      vy: -15 - Math.random() * 5,
      targetY,
      hue,
      trail: []
    });

    playSound('launch');
    setTapCount((prev) => prev + 1);
    setShowInstructions(false);
  }, [playSound]);

  // Ana animasyon döngüsü
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const animate = (timestamp: number) => {
      const deltaTime = Math.min((timestamp - lastTimeRef.current) / 16.67, 2);
      lastTimeRef.current = timestamp;

      // Trail efekti - yarı saydam siyah overlay
      ctx.fillStyle = 'rgba(10, 15, 30, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Lighter composite mode for neon glow
      ctx.globalCompositeOperation = 'lighter';

      // Roketleri güncelle
      rocketsRef.current = rocketsRef.current.filter((rocket) => {
        rocket.y += rocket.vy * deltaTime;
        rocket.vy += 0.3 * deltaTime; // Yavaşlama

        // Kuyruk ekle
        rocket.trail.push({ x: rocket.x, y: rocket.y, alpha: 1 });
        if (rocket.trail.length > 15) rocket.trail.shift();

        // Kuyruk çiz
        rocket.trail.forEach((point, i) => {
          const alpha = (i / rocket.trail.length) * 0.8;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${rocket.hue}, 100%, 70%, ${alpha})`;
          ctx.fill();
        });

        // Roket başı
        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${rocket.hue}, 100%, 80%)`;
        ctx.shadowColor = `hsl(${rocket.hue}, 100%, 60%)`;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Hedefe ulaştı mı?
        if (rocket.y <= rocket.targetY || rocket.vy > 0) {
          createExplosion(rocket.x, rocket.y, true);
          return false;
        }

        return true;
      });

      // Parçacıkları güncelle
      particlesRef.current = particlesRef.current.filter((p) => {
        // Fizik
        p.x += p.vx * deltaTime;
        p.y += p.vy * deltaTime;
        p.vy += 0.15 * deltaTime; // Yerçekimi
        p.vx *= 0.96; // Sürtünme
        p.life -= p.decay * deltaTime;

        if (p.life <= 0) return false;

        // Parçacık çiz
        const alpha = p.life;
        const lightness = 50 + p.life * 30;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, ${lightness}%, ${alpha})`;

        // Trail efekti
        if (p.isTrail) {
          ctx.shadowColor = `hsla(${p.hue}, 100%, 60%, ${alpha * 0.8})`;
          ctx.shadowBlur = 10;
        }

        ctx.fill();
        ctx.shadowBlur = 0;

        // Sparkle efekti
        if (p.sparkle && Math.random() > 0.7) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(60, 100%, 90%, ${alpha})`;
          ctx.fill();
        }

        return true;
      });

      // Sürüklerken mini patlamalar
      if (isDraggingRef.current && dragPosRef.current && Math.random() > 0.5) {
        createExplosion(
          dragPosRef.current.x + (Math.random() - 0.5) * 20,
          dragPosRef.current.y + (Math.random() - 0.5) * 20,
          false
        );
        if (Math.random() > 0.8) {
          playSound('drag');
        }
      }

      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [createExplosion, playSound]);

  // Pointer olayları
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    isDraggingRef.current = true;
    dragPosRef.current = { x, y };
    launchRocket(x, y);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [launchRocket]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    dragPosRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const handlePointerUp = useCallback(() => {
    isDraggingRef.current = false;
    dragPosRef.current = null;
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900"
    >
      {/* Yıldızlar arka plan */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 100 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              backgroundColor: `hsl(${Math.random() * 60 + 180}, 50%, ${70 + Math.random() * 30}%)`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Ana Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        style={{ touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4">
        <button
          onClick={onBack}
          className="bg-white/90 hover:bg-white text-indigo-600 rounded-full p-2.5 sm:p-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
        >
          <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="flex-grow text-center">
          <h1 className={`font-black text-white drop-shadow-lg ${isLandscape ? 'text-2xl' : 'text-xl sm:text-2xl'}`}>
            🎆 {t('miniGames.fireworks.title', 'Havai Fişek')}
          </h1>
        </div>

        <div className="bg-white/90 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg">
          <div className="text-indigo-600 font-bold text-base sm:text-lg">{tapCount} 🎇</div>
        </div>
      </div>

      {/* Talimatlar */}
      {showInstructions && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-40 pointer-events-none">
          <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl text-center max-w-sm mx-4 animate-pulse">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">✨</div>
            <h2 className="text-xl sm:text-2xl font-black text-indigo-600 mb-2 sm:mb-3">
              {t('miniGames.fireworks.instructions', 'Dokun ve Sürükle!')}
            </h2>
            <p className="text-slate-700 text-base sm:text-lg">
              {t('miniGames.fireworks.instructionDetail', 'Ekrana dokun, sürüklerken neon havai fişekler izle! 🌟')}
            </p>
            <div className="mt-4 text-sm text-slate-500">
              💡 Sürükleyerek mini patlamalar yarat!
            </div>
          </div>
        </div>
      )}

      {/* Animasyon stilleri */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default FireworksGameScreen;
