import React, { useState, useEffect, useRef, useCallback } from 'react';
import { t } from '../i18n/index.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import StarIcon from './icons/StarIcon.tsx';

interface Balloon {
  id: number;
  x: number;
  y: number;
  color: string;
  speed: number;
  size: number;
  rotation: number;
  swingOffset: number;
  specialType?: 'star' | 'diamond' | 'clover';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

interface BalloonPopGameScreenProps {
  onBack: () => void;
}

const BALLOON_COLORS = [
  '#FF6B9D', // Pink
  '#4ECDC4', // Turquoise
  '#FFE66D', // Yellow
  '#A8E6CF', // Mint
  '#FF8B94', // Coral
  '#B4A7D6', // Purple
  '#FFD3B6', // Peach
  '#95E1D3', // Aqua
];

const SPECIAL_BALLOONS = [
  { color: '#FFD700', type: 'star' as const, emoji: '⭐', points: 5 },
  { color: '#FF1493', type: 'diamond' as const, emoji: '💎', points: 10 },
  { color: '#00FF00', type: 'clover' as const, emoji: '🍀', points: 3 },
];

const BalloonPopGameScreen: React.FC<BalloonPopGameScreenProps> = ({ onBack }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [comboTimer, setComboTimer] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('balloonGameHighScore') || '0');
    } catch {
      return 0;
    }
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const balloonIdCounter = useRef(0);
  const particleIdCounter = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Fun sound effects using Web Audio API
  const playPopSound = useCallback((frequency: number = 800) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.1);
    } catch (e) {
      // Silent fail if audio context not available
    }
  }, []);

  const playComboSound = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = 1200;
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Silent fail
    }
  }, []);

  // Create particles when balloon pops
  const createParticles = useCallback((x: number, y: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = 3 + Math.random() * 3;
      newParticles.push({
        id: particleIdCounter.current++,
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        life: 1,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  // Spawn new balloon
  const spawnBalloon = useCallback(() => {
    if (!containerRef.current || gameOver) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const isSpecial = Math.random() < 0.15; // 15% chance for special balloon
    
    let color: string;
    let specialType: 'star' | 'diamond' | 'clover' | undefined;
    
    if (isSpecial) {
      const special = SPECIAL_BALLOONS[Math.floor(Math.random() * SPECIAL_BALLOONS.length)];
      color = special.color;
      specialType = special.type;
    } else {
      color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
    }
    
    const newBalloon: Balloon = {
      id: balloonIdCounter.current++,
      x: Math.random() * (container.width - 80) + 40,
      y: container.height + 50,
      color,
      speed: 1.5 + Math.random() * 2.5,
      size: isSpecial ? 70 : 60 + Math.random() * 20,
      rotation: Math.random() * 20 - 10,
      swingOffset: Math.random() * Math.PI * 2,
      specialType,
    };
    
    setBalloons(prev => [...prev, newBalloon]);
  }, [gameOver]);

  // Pop balloon
  const popBalloon = useCallback((balloon: Balloon, event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
    
    // Calculate points
    let points = 1;
    if (balloon.specialType) {
      const specialBalloon = SPECIAL_BALLOONS.find(s => s.type === balloon.specialType);
      if (specialBalloon) {
        points = specialBalloon.points;
      }
    }
    
    // Combo bonus
    const newCombo = combo + 1;
    setCombo(newCombo);
    
    if (newCombo >= 5) {
      playComboSound();
      points *= 2; // Double points for combo!
    }
    
    setScore(prev => prev + points);
    
    // Play sound with varying pitch
    playPopSound(700 + Math.random() * 400);
    
    // Create particles
    createParticles(balloon.x, balloon.y, balloon.color);
    
    // Remove balloon
    setBalloons(prev => prev.filter(b => b.id !== balloon.id));
    
    // Reset combo timer
    if (comboTimer) clearTimeout(comboTimer);
    const timer = window.setTimeout(() => {
      setCombo(0);
    }, 2000);
    setComboTimer(timer);
  }, [combo, comboTimer, playPopSound, playComboSound, createParticles]);

  // Start game
  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setCombo(0);
    setTimeLeft(60);
    setBalloons([]);
    setParticles([]);
  }, []);

  // Game loop - move balloons with swing
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const interval = setInterval(() => {
      setBalloons(prev => {
        return prev
          .map(balloon => ({
            ...balloon,
            y: balloon.y - balloon.speed,
            rotation: balloon.rotation + 0.5,
            swingOffset: balloon.swingOffset + 0.05,
            x: balloon.x + Math.sin(balloon.swingOffset) * 0.5, // Gentle swing
          }))
          .filter(balloon => balloon.y > -100);
      });
    }, 1000 / 60); // 60 FPS
    
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  // Particle animation
  useEffect(() => {
    if (!gameStarted) return;
    
    const interval = setInterval(() => {
      setParticles(prev => {
        return prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.2, // Gravity
            life: particle.life - 0.02,
          }))
          .filter(particle => particle.life > 0);
      });
    }, 1000 / 60);
    
    return () => clearInterval(interval);
  }, [gameStarted]);

  // Spawn balloons periodically
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const interval = setInterval(() => {
      spawnBalloon();
    }, 800);
    
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, spawnBalloon]);

  // Timer countdown
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          
          // Update high score
          if (score > highScore) {
            setHighScore(score);
            try {
              localStorage.setItem('balloonGameHighScore', score.toString());
            } catch {
              // Silent fail
            }
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameStarted, gameOver, score, highScore]);

  // Get special balloon emoji
  const getSpecialEmoji = (specialType?: 'star' | 'diamond' | 'clover') => {
    if (!specialType) return null;
    const special = SPECIAL_BALLOONS.find(s => s.type === specialType);
    return special?.emoji || null;
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200">
      {/* Animated clouds background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={i}
            className="absolute text-6xl opacity-40 animate-float-cloud"
            style={{
              left: `${-10 + (i * 25) % 120}%`,
              top: `${10 + (i * 13) % 80}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${20 + i * 3}s`,
            }}
          >
            ☁️
          </div>
        ))}
      </div>

      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-50 bg-white/90 hover:bg-white text-purple-600 rounded-full p-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
      >
        <ArrowLeftIcon className="w-6 h-6" />
      </button>

      {/* Game title and stats */}
      <div className="absolute top-4 right-4 left-20 z-40 flex justify-between items-start gap-4">
        <div className="bg-white/90 rounded-2xl px-6 py-3 shadow-lg backdrop-blur-sm">
          <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            🎈 {t('miniGames.balloonPop.title', 'Balon Patlatma Festivali')}
          </h1>
        </div>
        
        {gameStarted && (
          <div className="flex gap-3">
            {/* Score */}
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl px-4 py-2 shadow-lg">
              <div className="text-white text-xs font-semibold">
                {t('miniGames.score', 'Puan')}
              </div>
              <div className="text-white text-2xl font-black">{score}</div>
            </div>
            
            {/* Timer */}
            <div className={`bg-gradient-to-br ${timeLeft <= 10 ? 'from-red-500 to-red-600 animate-pulse' : 'from-blue-500 to-purple-600'} rounded-xl px-4 py-2 shadow-lg`}>
              <div className="text-white text-xs font-semibold">
                {t('miniGames.time', 'Süre')}
              </div>
              <div className="text-white text-2xl font-black">{timeLeft}s</div>
            </div>
          </div>
        )}
      </div>

      {/* Combo indicator */}
      {combo >= 3 && gameStarted && !gameOver && (
        <div className="absolute top-28 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full px-6 py-3 shadow-2xl">
            <div className="text-white text-2xl font-black flex items-center gap-2">
              <span className="animate-spin">⚡</span>
              COMBO x{combo}!
              <span className="animate-spin">⚡</span>
            </div>
            {combo >= 5 && (
              <div className="text-yellow-300 text-sm font-bold text-center animate-pulse">
                🌟 {t('miniGames.doublePoints', 'ÇİFT PUAN!')} 🌟
              </div>
            )}
          </div>
        </div>
      )}

      {/* Game container */}
      <div
        ref={containerRef}
        className="absolute inset-0 pt-24"
        style={{ touchAction: 'none' }}
        onMouseDown={() => {
          if (!gameStarted && !gameOver) {
            startGame();
          }
        }}
        onTouchStart={() => {
          if (!gameStarted && !gameOver) {
            startGame();
          }
        }}
      >
        {/* Balloons */}
        {balloons.map(balloon => {
          const specialEmoji = getSpecialEmoji(balloon.specialType);
          return (
            <div
              key={balloon.id}
              className="absolute cursor-pointer"
              style={{
                left: balloon.x,
                top: balloon.y,
                width: balloon.size,
                height: balloon.size,
              }}
              onMouseDown={(e) => popBalloon(balloon, e)}
              onTouchStart={(e) => popBalloon(balloon, e)}
            >
              {/* Balloon */}
              <div
                className="w-full h-full rounded-full shadow-2xl flex items-center justify-center relative transform transition-transform hover:scale-110"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${balloon.color}dd, ${balloon.color})`,
                  boxShadow: `0 10px 30px ${balloon.color}88, inset -5px -5px 15px rgba(0,0,0,0.2), inset 5px 5px 15px rgba(255,255,255,0.4)`,
                  transform: `rotate(${balloon.rotation}deg)`,
                }}
              >
                {/* Special balloon emoji */}
                {specialEmoji && (
                  <div className="text-3xl sm:text-4xl animate-pulse">
                    {specialEmoji}
                  </div>
                )}
                
                {/* Highlight shine */}
                <div 
                  className="absolute top-2 left-2 w-6 h-6 bg-white/40 rounded-full blur-sm"
                />
              </div>
              
              {/* Animated rope string */}
              <svg
                className="absolute left-1/2 top-full transform -translate-x-1/2"
                width="4"
                height="60"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                }}
              >
                <path
                  d={`M 2 0 Q ${2 + Math.sin(balloon.swingOffset) * 3} 20, 2 40 Q ${2 - Math.sin(balloon.swingOffset) * 3} 50, 2 60`}
                  stroke="#888"
                  strokeWidth="2"
                  fill="none"
                  className="animate-rope-swing"
                />
              </svg>
            </div>
          );
        })}

        {/* Particles */}
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              backgroundColor: particle.color,
              opacity: particle.life,
            }}
          />
        ))}

        {/* Start screen */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center max-w-md mx-4 transform animate-bounce-gentle">
              <div className="text-6xl mb-4 animate-float">🎈</div>
              <h2 className="text-3xl font-black text-purple-600 mb-4">
                {t('miniGames.balloonPop.welcome', 'Hoş Geldin!')}
              </h2>
              <p className="text-gray-700 text-lg mb-6">
                {t('miniGames.balloonPop.instructions', 'Balonları patlatarak puan kazan! Özel balonlar ekstra puan verir. 5 kombo ile çift puan!')}
              </p>
              <div className="flex gap-2 justify-center mb-6 text-3xl">
                <span className="animate-bounce" style={{ animationDelay: '0s' }}>⭐</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>💎</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>🍀</span>
              </div>
              <button
                onClick={startGame}
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                {t('miniGames.startGame', 'Oyuna Başla!')} 🚀
              </button>
              {highScore > 0 && (
                <div className="mt-6 text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">
                      {t('miniGames.highScore', 'En Yüksek Puan')}: {highScore}
                    </span>
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Game over screen */}
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-2xl text-center max-w-md mx-4 transform animate-scale-in">
              <div className="text-6xl mb-4">
                {score > highScore ? '🏆' : score >= 50 ? '🎉' : '😊'}
              </div>
              <h2 className="text-3xl font-black text-purple-600 mb-4">
                {score > highScore 
                  ? t('miniGames.newHighScore', 'YENİ REKOR!')
                  : t('miniGames.gameOver', 'Oyun Bitti!')}
              </h2>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 mb-6">
                <div className="text-white text-lg font-semibold mb-2">
                  {t('miniGames.yourScore', 'Puanın')}
                </div>
                <div className="text-white text-5xl font-black">{score}</div>
              </div>
              {highScore > 0 && score !== highScore && (
                <div className="mb-6 text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">
                      {t('miniGames.highScore', 'En Yüksek Puan')}: {highScore}
                    </span>
                    <StarIcon className="w-5 h-5 text-yellow-500" />
                  </div>
                </div>
              )}
              <div className="flex gap-4 justify-center">
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

      {/* Custom styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes float-cloud {
          0% { transform: translateX(0); }
          100% { transform: translateX(120vw); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes scale-in {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes rope-swing {
          0%, 100% { d: path('M 2 0 Q 2 20, 2 40 Q 2 50, 2 60'); }
          50% { d: path('M 2 0 Q 5 20, 2 40 Q -1 50, 2 60'); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-cloud {
          animation: float-cloud linear infinite;
        }
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
        .animate-rope-swing {
          animation: rope-swing 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BalloonPopGameScreen;
