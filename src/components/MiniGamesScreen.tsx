import React, { useCallback, useEffect, useRef, useState } from 'react';
import { t } from '../i18n/index.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import StarIcon from './icons/StarIcon.tsx';

// --- Soft Sound Effects for Butterfly Garden ---
const createButterflySound = () => {
  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

  // Soft flutter when selecting butterfly
  const playSelect = () => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  };

  // Happy chime for correct match
  const playMatch = () => {
    [523, 659, 784].forEach((freq, i) => {
      setTimeout(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
      }, i * 80);
    });
  };

  // Soft buzz for wrong match
  const playWrong = () => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(200, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  };

  // Celebration for game end
  const playGameOver = (isHighScore: boolean) => {
    const notes = isHighScore ? [523, 659, 784, 1047] : [392, 330, 262];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      }, i * 120);
    });
  };

  return { playSelect, playMatch, playWrong, playGameOver };
};

/* ============================================================
   🦋 KELEBEK BAHÇESI - Copilot'un Orijinal Mini Oyunu
   Okul öncesi çocuklar için renk eşleştirme ve koordinasyon oyunu
   ============================================================ */

interface Butterfly {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  wingPhase: number;
  size: number;
  speed: number;
}

interface Flower {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  hasNectar: boolean;
  glowIntensity: number;
}

interface Sparkle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
}

interface MiniGamesScreenProps {
  onBack: () => void;
}

const COLORS = [
  { name: 'pink', bg: '#ec4899', light: '#fbcfe8', emoji: '🌸' },
  { name: 'purple', bg: '#a855f7', light: '#e9d5ff', emoji: '💜' },
  { name: 'blue', bg: '#3b82f6', light: '#bfdbfe', emoji: '💙' },
  { name: 'yellow', bg: '#eab308', light: '#fef08a', emoji: '🌻' },
  { name: 'orange', bg: '#f97316', light: '#fed7aa', emoji: '🧡' },
];

const GAME_DURATION = 60;

const MiniGamesScreen: React.FC<MiniGamesScreenProps> = ({ onBack }) => {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [selectedButterfly, setSelectedButterfly] = useState<Butterfly | null>(null);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('butterflyGardenHighScore') || '0', 10);
    } catch {
      return 0;
    }
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const butterflyIdRef = useRef(0);
  const sparkleIdRef = useRef(0);
  const timerRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const scoreRef = useRef(0);
  const soundRef = useRef<ReturnType<typeof createButterflySound> | null>(null);

  // Initialize sound
  useEffect(() => {
    soundRef.current = createButterflySound();
  }, []);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  const stopLoops = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const addSparkles = useCallback((x: number, y: number, color: string) => {
    const newSparkles: Sparkle[] = Array.from({ length: 12 }).map(() => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 3;
      sparkleIdRef.current += 1;
      return {
        id: sparkleIdRef.current,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        life: 1,
        color,
        size: 4 + Math.random() * 6,
      };
    });
    setSparkles(prev => [...prev, ...newSparkles]);
  }, []);

  const createFlowers = useCallback(() => {
    const container = containerRef.current;
    if (!container) return [];

    const rect = container.getBoundingClientRect();
    const newFlowers: Flower[] = [];
    const flowerCount = 5;
    const spacing = rect.width / (flowerCount + 1);

    for (let i = 0; i < flowerCount; i++) {
      const colorData = COLORS[i % COLORS.length];
      newFlowers.push({
        id: i,
        x: spacing * (i + 1),
        y: rect.height - 120,
        color: colorData.bg,
        size: 70 + Math.random() * 20,
        hasNectar: true,
        glowIntensity: 0,
      });
    }
    return newFlowers;
  }, []);

  const spawnButterfly = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const colorData = COLORS[Math.floor(Math.random() * COLORS.length)];

    // Ekranın kenarlarından spawn et - soldan veya sağdan
    const fromLeft = Math.random() > 0.5;
    const x = fromLeft ? -60 : rect.width + 60;

    // Farklı yüksekliklerden giriş yap
    const yZones = [0.2, 0.35, 0.5, 0.65];
    const yZone = yZones[Math.floor(Math.random() * yZones.length)];
    const y = rect.height * yZone + (Math.random() - 0.5) * 60;

    // Hedef: ekranın karşı tarafına doğru rastgele bir nokta
    const targetX = fromLeft
      ? rect.width * (0.5 + Math.random() * 0.4)
      : rect.width * (0.1 + Math.random() * 0.4);
    const targetY = 150 + Math.random() * (rect.height * 0.4);

    butterflyIdRef.current += 1;
    const newButterfly: Butterfly = {
      id: butterflyIdRef.current,
      x,
      y,
      targetX,
      targetY,
      color: colorData.bg,
      wingPhase: Math.random() * Math.PI * 2,
      size: 65 + Math.random() * 15,
      speed: 1.5 + Math.random() * 1,
    };

    setButterflies(prev => [...prev, newButterfly]);
  }, []);

  const finishGame = useCallback(() => {
    stopLoops();
    setGameStarted(false);
    setGameOver(true);
    const finalScore = scoreRef.current;
    const isNewHighScore = finalScore > highScore;
    soundRef.current?.playGameOver(isNewHighScore);
    setHighScore(prev => {
      const next = Math.max(prev, finalScore);
      try {
        localStorage.setItem('butterflyGardenHighScore', String(next));
      } catch { /* ignore */ }
      return next;
    });
  }, [stopLoops, highScore]);

  const startGame = useCallback(() => {
    stopLoops();
    setButterflies([]);
    setSparkles([]);
    setScore(0);
    setCombo(0);
    setTimeLeft(GAME_DURATION);
    setGameOver(false);
    setGameStarted(true);
    setSelectedButterfly(null);
    setFlowers(createFlowers());
  }, [createFlowers, stopLoops]);

  const handleButterflyClick = useCallback((butterfly: Butterfly, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (!gameStarted || gameOver) return;
    setSelectedButterfly(butterfly);
    soundRef.current?.playSelect();
  }, [gameStarted, gameOver]);

  const handleFlowerClick = useCallback((flower: Flower, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (!gameStarted || gameOver || !selectedButterfly) return;

    // Renk eşleşiyor mu?
    if (selectedButterfly.color === flower.color && flower.hasNectar) {
      // Doğru eşleşme!
      addSparkles(flower.x, flower.y - 40, flower.color);
      setCombo(prev => prev + 1);
      const points = 10 + combo * 5;
      setScore(prev => prev + points);

      // Kelebeği kaldır
      setButterflies(prev => prev.filter(b => b.id !== selectedButterfly.id));

      // Çiçeğin nektarını geçici olarak kaldır
      setFlowers(prev => prev.map(f =>
        f.id === flower.id ? { ...f, hasNectar: false, glowIntensity: 1 } : f
      ));

      // 2 saniye sonra nektar geri gelsin
      setTimeout(() => {
        setFlowers(prev => prev.map(f =>
          f.id === flower.id ? { ...f, hasNectar: true } : f
        ));
      }, 2000);

      soundRef.current?.playMatch();
    } else {
      // Yanlış eşleşme
      setCombo(0);
      soundRef.current?.playWrong();
    }

    setSelectedButterfly(null);
  }, [addSparkles, combo, gameOver, gameStarted, selectedButterfly]);

  // Oyun döngüsü - zamanlayıcı
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [finishGame, gameOver, gameStarted]);

  // Kelebek spawn döngüsü
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const spawnInterval = setInterval(() => {
      if (butterflies.length < 6) {
        spawnButterfly();
      }
    }, 1500);

    return () => clearInterval(spawnInterval);
  }, [butterflies.length, gameOver, gameStarted, spawnButterfly]);

  // Animasyon döngüsü
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const animate = () => {
      // Kelebekleri hareket ettir
      setButterflies(prev => prev.map(b => {
        const newWingPhase = b.wingPhase + 0.15;

        // Rastgele hareket
        const dx = (Math.random() - 0.5) * 3;
        const dy = Math.sin(newWingPhase * 0.5) * 2;

        let newX = b.x + dx + (b.targetX > b.x ? b.speed : -b.speed);
        let newY = b.y + dy;

        // Sınırlar içinde tut - header'ın altında kal
        const container = containerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          newX = Math.max(50, Math.min(rect.width - 50, newX));
          newY = Math.max(130, Math.min(rect.height - 180, newY));
        }

        return { ...b, x: newX, y: newY, wingPhase: newWingPhase };
      }));

      // Parıltıları güncelle
      setSparkles(prev => prev
        .map(s => ({
          ...s,
          x: s.x + s.vx,
          y: s.y + s.vy,
          vy: s.vy + 0.1,
          life: s.life - 0.02,
        }))
        .filter(s => s.life > 0));

      // Çiçek parlamasını azalt
      setFlowers(prev => prev.map(f => ({
        ...f,
        glowIntensity: Math.max(0, f.glowIntensity - 0.02),
      })));

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [gameOver, gameStarted]);

  // Cleanup
  useEffect(() => () => stopLoops(), [stopLoops]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Arka plan - Bahçe */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-green-200">
        {/* Güneş */}
        <div className="absolute top-8 right-8 w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full shadow-2xl animate-pulse"
          style={{ boxShadow: '0 0 60px rgba(251, 191, 36, 0.6)' }} />

        {/* Bulutlar */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute text-5xl opacity-80"
            style={{
              left: `${10 + i * 25}%`,
              top: `${8 + (i % 2) * 8}%`,
              animation: `float-cloud ${20 + i * 5}s linear infinite`,
            }}
          >
            ☁️
          </div>
        ))}

        {/* Çimen */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-500 via-green-400 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-600 to-transparent opacity-50" />
      </div>

      {/* Geri butonu */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-50 bg-white/90 hover:bg-white text-green-700 rounded-full p-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
      >
        <ArrowLeftIcon className="w-6 h-6" />
      </button>

      {/* Başlık ve skor */}
      <div className="absolute top-4 right-4 left-16 z-50 flex flex-wrap gap-3 items-start justify-between">
        <div className="bg-white/95 rounded-2xl px-4 py-2 shadow-lg backdrop-blur-sm">
          <h1 className="text-lg sm:text-xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            🦋 {t('miniGames.butterflyGarden.title', 'Kelebek Bahçesi')}
          </h1>
        </div>

        {gameStarted && (
          <div className="flex gap-2 flex-wrap">
            <div className="bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl px-4 py-2 shadow-lg">
              <div className="text-white text-xs font-semibold">{t('miniGames.score', 'Puan')}</div>
              <div className="text-white text-2xl font-black">{score}</div>
            </div>
            <div className={`bg-gradient-to-br ${timeLeft <= 10 ? 'from-red-500 to-red-600 animate-pulse' : 'from-blue-500 to-indigo-500'} rounded-xl px-4 py-2 shadow-lg`}>
              <div className="text-white text-xs font-semibold">{t('miniGames.time', 'Süre')}</div>
              <div className="text-white text-2xl font-black">{timeLeft}s</div>
            </div>
            {combo >= 2 && (
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl px-4 py-2 shadow-lg animate-bounce">
                <div className="text-white text-xs font-semibold">Kombo!</div>
                <div className="text-white text-2xl font-black">x{combo}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Oyun alanı */}
      <div
        ref={containerRef}
        className="absolute inset-0 pt-24"
        style={{ touchAction: 'none' }}
      >
        {/* Çiçekler */}
        {flowers.map(flower => (
          <div
            key={flower.id}
            className={`absolute cursor-pointer transform transition-all duration-200 ${!flower.hasNectar ? 'opacity-60 scale-95' : 'hover:scale-105'}`}
            style={{
              left: flower.x - flower.size / 2,
              top: flower.y - flower.size / 2 - 20,
              width: flower.size,
              height: flower.size + 40,
              filter: flower.glowIntensity > 0
                ? `drop-shadow(0 0 ${20 * flower.glowIntensity}px ${flower.color})`
                : 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))',
            }}
            onMouseDown={(e) => handleFlowerClick(flower, e)}
            onTouchStart={(e) => handleFlowerClick(flower, e)}
          >
            <svg viewBox="0 0 100 140" className="w-full h-full">
              {/* Sap */}
              <path
                d="M 50 70 Q 48 100 50 130"
                stroke="#22c55e"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              {/* Sol yaprak */}
              <ellipse cx="35" cy="105" rx="12" ry="7" fill="#4ade80" transform="rotate(-30 35 105)" />
              {/* Sağ yaprak */}
              <ellipse cx="65" cy="100" rx="12" ry="7" fill="#4ade80" transform="rotate(30 65 100)" />

              {/* Taç yaprakları - 8 adet */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <ellipse
                  key={i}
                  cx="50"
                  cy="25"
                  rx="18"
                  ry="28"
                  fill={flower.color}
                  opacity={flower.hasNectar ? 0.9 : 0.5}
                  transform={`rotate(${angle} 50 45)`}
                />
              ))}

              {/* İç taç yaprakları */}
              {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
                <ellipse
                  key={i}
                  cx="50"
                  cy="30"
                  rx="12"
                  ry="20"
                  fill={flower.color}
                  opacity={flower.hasNectar ? 1 : 0.6}
                  transform={`rotate(${angle} 50 45)`}
                />
              ))}

              {/* Çiçek merkezi */}
              <circle cx="50" cy="45" r="16" fill="#fbbf24" />
              <circle cx="50" cy="45" r="12" fill="#f59e0b" />
              <circle cx="50" cy="45" r="6" fill="#d97706" />

              {/* Parlaklık efekti */}
              <circle cx="45" cy="40" r="4" fill="white" opacity="0.6" />
              <circle cx="55" cy="48" r="2" fill="white" opacity="0.4" />

              {/* Nektar yok göstergesi */}
              {!flower.hasNectar && (
                <text x="50" y="50" textAnchor="middle" fontSize="20">💫</text>
              )}
            </svg>
          </div>
        ))}

        {/* Kelebekler */}
        {butterflies.map(butterfly => {
          const wingScale = 0.7 + Math.sin(butterfly.wingPhase) * 0.3;
          const isSelected = selectedButterfly?.id === butterfly.id;

          return (
            <div
              key={butterfly.id}
              className={`absolute cursor-pointer z-30 ${isSelected ? 'z-40' : ''}`}
              style={{
                left: butterfly.x - butterfly.size / 2,
                top: butterfly.y - butterfly.size / 2,
                width: butterfly.size,
                height: butterfly.size,
                filter: isSelected ? `drop-shadow(0 0 15px ${butterfly.color}) drop-shadow(0 0 25px ${butterfly.color})` : `drop-shadow(2px 4px 6px rgba(0,0,0,0.3))`,
                transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                transition: 'transform 0.2s, filter 0.2s',
              }}
              onMouseDown={(e) => handleButterflyClick(butterfly, e)}
              onTouchStart={(e) => handleButterflyClick(butterfly, e)}
            >
              {/* SVG Kelebek */}
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Sol üst kanat */}
                <ellipse
                  cx="30"
                  cy="35"
                  rx={22 * wingScale}
                  ry="28"
                  fill={butterfly.color}
                  opacity="0.9"
                />
                <ellipse
                  cx="28"
                  cy="32"
                  rx={12 * wingScale}
                  ry="15"
                  fill="white"
                  opacity="0.5"
                />
                <circle cx="25" cy="30" r={5 * wingScale} fill="white" opacity="0.7" />

                {/* Sağ üst kanat */}
                <ellipse
                  cx="70"
                  cy="35"
                  rx={22 * wingScale}
                  ry="28"
                  fill={butterfly.color}
                  opacity="0.9"
                />
                <ellipse
                  cx="72"
                  cy="32"
                  rx={12 * wingScale}
                  ry="15"
                  fill="white"
                  opacity="0.5"
                />
                <circle cx="75" cy="30" r={5 * wingScale} fill="white" opacity="0.7" />

                {/* Sol alt kanat */}
                <ellipse
                  cx="32"
                  cy="62"
                  rx={18 * wingScale}
                  ry="22"
                  fill={butterfly.color}
                  opacity="0.85"
                />
                <ellipse
                  cx="30"
                  cy="65"
                  rx={8 * wingScale}
                  ry="10"
                  fill="white"
                  opacity="0.4"
                />

                {/* Sağ alt kanat */}
                <ellipse
                  cx="68"
                  cy="62"
                  rx={18 * wingScale}
                  ry="22"
                  fill={butterfly.color}
                  opacity="0.85"
                />
                <ellipse
                  cx="70"
                  cy="65"
                  rx={8 * wingScale}
                  ry="10"
                  fill="white"
                  opacity="0.4"
                />

                {/* Gövde */}
                <ellipse cx="50" cy="50" rx="5" ry="25" fill="#1a1a2e" />
                <ellipse cx="50" cy="28" rx="4" ry="5" fill="#1a1a2e" />

                {/* Antenler */}
                <path d="M 46 25 Q 40 10 35 8" stroke="#1a1a2e" strokeWidth="2" fill="none" />
                <path d="M 54 25 Q 60 10 65 8" stroke="#1a1a2e" strokeWidth="2" fill="none" />
                <circle cx="35" cy="8" r="3" fill="#1a1a2e" />
                <circle cx="65" cy="8" r="3" fill="#1a1a2e" />

                {/* Gözler */}
                <circle cx="47" cy="26" r="2" fill="white" />
                <circle cx="53" cy="26" r="2" fill="white" />
              </svg>
            </div>
          );
        })}

        {/* Parıltılar */}
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: sparkle.x,
              top: sparkle.y,
              width: sparkle.size,
              height: sparkle.size,
              background: sparkle.color,
              opacity: sparkle.life,
              boxShadow: `0 0 ${sparkle.size * 2}px ${sparkle.color}`,
            }}
          />
        ))}

        {/* Seçili kelebek göstergesi - çiçeklerin üstünde */}
        {selectedButterfly && (
          <div className="absolute right-4 top-1/3 bg-white/95 rounded-2xl px-4 py-3 shadow-xl z-30 max-w-[140px]">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-2xl">🦋</span>
              <span className="font-bold text-sm leading-tight" style={{ color: selectedButterfly.color }}>
                Bu kelebeği hangi çiçeğe götürelim?
              </span>
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                style={{ background: selectedButterfly.color }}
              />
            </div>
          </div>
        )}

        {/* Başlangıç ekranı */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-900/20 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl text-center max-w-md mx-4">
              <div className="text-7xl mb-4 animate-bounce">🦋</div>
              <h2 className="text-3xl font-black text-green-600 mb-3">
                {t('miniGames.butterflyGarden.welcome', 'Kelebek Bahçesine Hoş Geldin!')}
              </h2>
              <p className="text-slate-700 text-lg mb-4">
                {t('miniGames.butterflyGarden.instructions', 'Kelebeklere tıkla ve onları aynı renkteki çiçeklere götür!')}
              </p>
              <div className="flex justify-center gap-2 mb-6">
                {COLORS.map((c, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl shadow-lg transform hover:scale-110 transition-transform"
                    style={{ background: c.bg }}
                  >
                    {c.emoji}
                  </div>
                ))}
              </div>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                {t('miniGames.startGame', 'Oyuna Başla!')} 🌟
              </button>
              {highScore > 0 && (
                <div className="mt-4 text-slate-600 flex items-center justify-center gap-2">
                  <StarIcon className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold">{t('miniGames.highScore', 'En Yüksek Puan')}: {highScore}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Oyun sonu ekranı */}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-900/20 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl text-center max-w-md mx-4 animate-scale-in">
              <div className="text-6xl mb-4">{score > highScore ? '🏆' : score >= 50 ? '🎉' : '🦋'}</div>
              <h2 className="text-3xl font-black text-green-600 mb-3">
                {score > highScore ? t('miniGames.newHighScore', 'YENİ REKOR!') : t('miniGames.gameOver', 'Oyun Bitti!')}
              </h2>
              <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-xl p-6 mb-6">
                <div className="text-white text-lg font-semibold mb-1">{t('miniGames.yourScore', 'Puanın')}</div>
                <div className="text-white text-5xl font-black">{score}</div>
              </div>
              {highScore > 0 && score !== highScore && (
                <div className="mb-4 text-slate-600 flex items-center justify-center gap-2">
                  <StarIcon className="w-5 h-5 text-amber-500" />
                  <span className="font-semibold">{t('miniGames.highScore', 'En Yüksek Puan')}: {highScore}</span>
                </div>
              )}
              <div className="flex gap-3 justify-center">
                <button
                  onClick={startGame}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  {t('miniGames.playAgain', 'Tekrar Oyna')} 🔄
                </button>
                <button
                  onClick={onBack}
                  className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                >
                  {t('miniGames.backToMenu', 'Menüye Dön')} 🏠
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float-cloud {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(calc(100vw + 100px)); }
        }
        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default MiniGamesScreen;
