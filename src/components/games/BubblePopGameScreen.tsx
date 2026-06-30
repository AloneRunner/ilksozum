import React, { useRef, useEffect, useState, useCallback } from 'react';
import { t } from '../../i18n/index.ts';

interface BubblePopGameScreenProps {
  onBack: () => void;
}

// Baloncuk tipi
interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  hue: number;
  opacity: number;
  popped: boolean;
  popScale: number;
}

// Pop parçacığı
interface PopParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  hue: number;
  life: number;
}

const BubblePopGameScreen: React.FC<BubblePopGameScreenProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [particles, setParticles] = useState<PopParticle[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);

  // Pop sesi
  const playPopSound = useCallback((pitch: number = 1) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;

      // Bubble pop - yumuşak "plop" sesi
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400 * pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150 * pitch, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);

      // İkinci harmonik - daha zengin ses
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(800 * pitch, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(300 * pitch, ctx.currentTime + 0.08);
      gain2.gain.setValueAtTime(0.1, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start();
      osc2.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.log('Audio error:', e);
    }
  }, []);

  // Combo sesi
  const playComboSound = useCallback(() => {
    try {
      if (!audioContextRef.current) return;
      const ctx = audioContextRef.current;

      [523, 659, 784].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.15);
      });
    } catch (e) {
      console.log('Audio error:', e);
    }
  }, []);

  // Yeni baloncuk oluştur
  const createBubble = useCallback((): Bubble => {
    const container = containerRef.current;
    const width = container?.clientWidth || window.innerWidth;

    return {
      id: Date.now() + Math.random(),
      x: 50 + Math.random() * (width - 100),
      y: window.innerHeight + 50,
      size: 40 + Math.random() * 50,
      speed: 1 + Math.random() * 2,
      wobble: 0,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      hue: Math.random() * 360,
      opacity: 0.7 + Math.random() * 0.3,
      popped: false,
      popScale: 1
    };
  }, []);

  // Oyun başlat
  useEffect(() => {
    // İlk baloncuklar
    const initialBubbles: Bubble[] = [];
    for (let i = 0; i < 8; i++) {
      const bubble = createBubble();
      bubble.y = 100 + Math.random() * (window.innerHeight - 200);
      initialBubbles.push(bubble);
    }
    setBubbles(initialBubbles);
  }, [createBubble]);

  // Ana animasyon döngüsü
  useEffect(() => {
    let bubbleSpawnTimer = 0;

    const animate = (timestamp: number) => {
      const deltaTime = Math.min((timestamp - lastTimeRef.current) / 16.67, 3);
      lastTimeRef.current = timestamp;
      bubbleSpawnTimer += deltaTime;

      // Yeni baloncuk ekle
      if (bubbleSpawnTimer > 60) {
        bubbleSpawnTimer = 0;
        setBubbles((prev) => {
          if (prev.filter((b) => !b.popped).length < 15) {
            return [...prev, createBubble()];
          }
          return prev;
        });
      }

      // Baloncukları güncelle
      setBubbles((prev) =>
        prev
          .map((bubble) => {
            if (bubble.popped) {
              return {
                ...bubble,
                popScale: bubble.popScale + 0.15,
                opacity: bubble.opacity - 0.08
              };
            }

            const newWobble = bubble.wobble + bubble.wobbleSpeed * deltaTime;
            return {
              ...bubble,
              y: bubble.y - bubble.speed * deltaTime,
              x: bubble.x + Math.sin(newWobble) * 0.8,
              wobble: newWobble
            };
          })
          .filter((b) => b.y > -100 && b.opacity > 0)
      );

      // Parçacıkları güncelle
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * deltaTime,
            y: p.y + p.vy * deltaTime,
            vy: p.vy + 0.1 * deltaTime,
            life: p.life - 0.02 * deltaTime
          }))
          .filter((p) => p.life > 0)
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [createBubble]);

  // Baloncuk patlatma
  const popBubble = useCallback(
    (bubbleId: number, x: number, y: number, hue: number, size: number) => {
      // Baloncuğu patlat
      setBubbles((prev) =>
        prev.map((b) => (b.id === bubbleId ? { ...b, popped: true } : b))
      );

      // Parçacıklar oluştur
      const newParticles: PopParticle[] = [];
      const particleCount = 8 + Math.floor(size / 10);

      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const speed = 2 + Math.random() * 3;
        newParticles.push({
          id: Date.now() + i,
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          size: 4 + Math.random() * 6,
          hue,
          life: 1
        });
      }
      setParticles((prev) => [...prev, ...newParticles].slice(-100));

      // Skor ve combo
      const points = Math.floor(size / 5);
      setScore((prev) => prev + points * (combo + 1));

      setCombo((prev) => {
        const newCombo = prev + 1;
        if (newCombo >= 3) {
          setShowCombo(true);
          playComboSound();
          setTimeout(() => setShowCombo(false), 800);
        }
        return newCombo;
      });

      // Combo reset timer
      setTimeout(() => {
        setCombo(0);
      }, 1500);

      // Pop sesi (pitch boyuta göre)
      playPopSound(1.5 - size / 150);
    },
    [combo, playPopSound, playComboSound]
  );

  // Dokunma/tıklama
  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // En yakın baloncuğu bul
      setBubbles((prev) => {
        const clickedBubble = prev.find((b) => {
          if (b.popped) return false;
          const dx = b.x - x;
          const dy = b.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return dist < b.size / 2 + 10;
        });

        if (clickedBubble) {
          popBubble(clickedBubble.id, clickedBubble.x, clickedBubble.y, clickedBubble.hue, clickedBubble.size);
        }

        return prev;
      });
    },
    [popBubble]
  );

  // Sürükleme ile patlat
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.buttons === 0) return;

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setBubbles((prev) => {
        const touchedBubble = prev.find((b) => {
          if (b.popped) return false;
          const dx = b.x - x;
          const dy = b.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return dist < b.size / 2;
        });

        if (touchedBubble) {
          popBubble(touchedBubble.id, touchedBubble.x, touchedBubble.y, touchedBubble.hue, touchedBubble.size);
        }

        return prev;
      });
    },
    [popBubble]
  );

  return (
    <div className="fixed inset-0 overflow-hidden select-none" style={{ touchAction: 'none' }}>
      {/* Arka plan - gökkuşağı gradyan */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              #1a1a2e 0%, 
              #16213e 30%, 
              #0f3460 60%, 
              #1a1a2e 100%)
          `
        }}
      />

      {/* Yıldızlar */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              backgroundColor: 'white',
              opacity: 0.3 + Math.random() * 0.5,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Başlık */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4">
        <button
          onClick={onBack}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur shadow-lg transition-all"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
          🫧 {t('miniGames.bubblePop.title', 'Baloncuk Patlatma')}
        </h1>

        <div className="px-4 py-2 rounded-full bg-white/20 backdrop-blur shadow-lg">
          <span className="text-white font-bold">⭐ {score}</span>
        </div>
      </div>

      {/* Combo göstergesi */}
      {showCombo && combo >= 3 && (
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-40 animate-bounce">
          <div
            className="px-6 py-3 rounded-2xl text-white font-black text-3xl"
            style={{
              background: `linear-gradient(135deg, hsl(${combo * 30}, 80%, 50%), hsl(${combo * 30 + 60}, 80%, 50%))`,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            {combo}x COMBO! 🎉
          </div>
        </div>
      )}

      {/* Oyun alanı */}
      <div
        ref={containerRef}
        className="absolute inset-0 cursor-pointer"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        {/* Baloncuklar */}
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute pointer-events-none"
            style={{
              left: bubble.x,
              top: bubble.y,
              width: bubble.size,
              height: bubble.size,
              transform: `translate(-50%, -50%) scale(${bubble.popScale})`,
              opacity: bubble.opacity,
              transition: bubble.popped ? 'transform 0.1s, opacity 0.1s' : 'none'
            }}
          >
            {/* Baloncuk gövdesi */}
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `
                  radial-gradient(circle at 30% 30%, 
                    hsla(${bubble.hue}, 70%, 80%, 0.9) 0%,
                    hsla(${bubble.hue}, 60%, 60%, 0.7) 40%,
                    hsla(${bubble.hue}, 50%, 40%, 0.5) 100%)
                `,
                boxShadow: `
                  inset -8px -8px 20px hsla(${bubble.hue}, 50%, 30%, 0.3),
                  inset 5px 5px 15px hsla(${bubble.hue}, 80%, 90%, 0.5),
                  0 4px 15px hsla(${bubble.hue}, 60%, 50%, 0.3)
                `,
                border: `1px solid hsla(${bubble.hue}, 60%, 70%, 0.3)`
              }}
            >
              {/* Parlak nokta */}
              <div
                className="absolute rounded-full bg-white/60"
                style={{
                  width: bubble.size * 0.25,
                  height: bubble.size * 0.2,
                  left: '20%',
                  top: '15%',
                  filter: 'blur(2px)'
                }}
              />

              {/* İkinci parlak nokta */}
              <div
                className="absolute rounded-full bg-white/30"
                style={{
                  width: bubble.size * 0.1,
                  height: bubble.size * 0.1,
                  left: '55%',
                  top: '60%',
                  filter: 'blur(1px)'
                }}
              />
            </div>
          </div>
        ))}

        {/* Pop parçacıkları */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              backgroundColor: `hsla(${p.hue}, 70%, 60%, ${p.life})`,
              transform: 'translate(-50%, -50%)',
              boxShadow: `0 0 ${p.size}px hsla(${p.hue}, 70%, 60%, ${p.life * 0.5})`
            }}
          />
        ))}
      </div>

      {/* Alt bilgi */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40">
        <p className="text-white/60 text-sm text-center">
          👆 {t('miniGames.bubblePop.hint', 'Baloncuklara dokun veya sürükle!')}
        </p>
      </div>

      {/* Animasyon stilleri */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};

export default BubblePopGameScreen;
