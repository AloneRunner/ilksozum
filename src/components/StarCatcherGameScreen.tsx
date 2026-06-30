import React, { useState, useEffect, useRef, useCallback } from 'react';
import { t } from '../i18n/index.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import StarIcon from './icons/StarIcon.tsx';

interface GameObject {
  id: number;
  x: number;
  y: number;
  type: 'star' | 'fruit' | 'diamond' | 'cloud' | 'lightning';
  speed: number;
  size: number;
  rotation: number;
  emoji: string;
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

interface StarCatcherGameScreenProps {
  onBack: () => void;
}

const OBJECT_TYPES = [
  { type: 'star', emoji: '⭐', points: 10, probability: 0.6 },
  { type: 'fruit', emoji: '🍎', points: 15, probability: 0.2 },
  { type: 'diamond', emoji: '💎', points: 50, probability: 0.05 },
  { type: 'cloud', emoji: '☁️', points: -20, probability: 0.1 },
  { type: 'lightning', emoji: '⚡', points: -30, probability: 0.05 },
];

const StarCatcherGameScreen: React.FC<StarCatcherGameScreenProps> = ({ onBack }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    try {
      return parseInt(localStorage.getItem('starCatcherHighScore') || '0');
    } catch {
      return 0;
    }
  });

  const [objects, setObjects] = useState<GameObject[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [playerPosition, setPlayerPosition] = useState(50); // Percentage 0-100
  const [isStunned, setIsStunned] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const objectIdCounter = useRef(0);
  const particleIdCounter = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  const playSound = useCallback((type: 'catch' | 'bad' | 'bonus') => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      if (type === 'catch') {
        oscillator.frequency.setValueAtTime(440, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      } else if (type === 'bad') {
        oscillator.frequency.setValueAtTime(220, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      } else {
        oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      }
      
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  }, []);

  const createParticles = useCallback((x: number, y: number, color: string) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 8; i++) {
      newParticles.push({
        id: particleIdCounter.current++,
        x,
        y,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        color,
        life: 1.0,
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
  }, []);

  const spawnObject = useCallback(() => {
    const rand = Math.random();
    let cumulativeProb = 0;
    let selectedType = OBJECT_TYPES[0];
    
    for (const obj of OBJECT_TYPES) {
      cumulativeProb += obj.probability;
      if (rand < cumulativeProb) {
        selectedType = obj;
        break;
      }
    }

    const newObject: GameObject = {
      id: objectIdCounter.current++,
      x: Math.random() * 90 + 5,
      y: -10,
      type: selectedType.type as any,
      emoji: selectedType.emoji,
      speed: 0.3 + Math.random() * 0.4,
      size: 60 + Math.random() * 20,
      rotation: Math.random() * 360,
    };
    
    setObjects(prev => [...prev, newObject]);
  }, [score]);

  const updateGame = useCallback((time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;
    lastTimeRef.current = time;

    if (gameStarted && !gameOver) {
      // Spawn objects
      if (Math.random() < 0.015) {
        spawnObject();
      }

      // Update objects
      setObjects(prev => {
        const nextObjects: GameObject[] = [];
        prev.forEach(obj => {
          const nextY = obj.y + obj.speed;
          
          // Collision detection
          const playerX = playerPosition;
          const playerY = 85; // Player is at 85% height
          
          const dist = Math.sqrt(Math.pow(obj.x - playerX, 2) + Math.pow(nextY - playerY, 2));
          
          if (dist < 10 && !isStunned) {
            // Caught!
            const typeInfo = OBJECT_TYPES.find(t => t.type === obj.type)!;
            setScore(s => Math.max(0, s + typeInfo.points));
            
            if (typeInfo.points > 0) {
              playSound(obj.type === 'diamond' ? 'bonus' : 'catch');
              createParticles(obj.x, nextY, '#FFD700');
            } else {
              playSound('bad');
              createParticles(obj.x, nextY, '#666666');
              if (obj.type === 'lightning') {
                setIsStunned(true);
                setTimeout(() => setIsStunned(false), 600);
              }
            }
          } else if (nextY < 110) {
            nextObjects.push({ ...obj, y: nextY, rotation: obj.rotation + 2 });
          }
        });
        return nextObjects;
      });

      // Update particles
      setParticles(prev => 
        prev
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
          }))
          .filter(p => p.life > 0)
      );
    }

    requestRef.current = requestAnimationFrame(updateGame);
  }, [gameStarted, gameOver, playerPosition, isStunned, score, spawnObject, playSound, createParticles]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [updateGame]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, timeLeft]);

  useEffect(() => {
    if (gameOver && score > highScore) {
      setHighScore(score);
      localStorage.setItem('starCatcherHighScore', score.toString());
    }
  }, [gameOver, score, highScore]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setObjects([]);
    setParticles([]);
    setGameOver(false);
    setGameStarted(true);
    setIsStunned(false);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current || isStunned) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPlayerPosition(Math.max(5, Math.min(95, x)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-900 touch-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {/* Background Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: Math.random() * 3 + 'px',
              height: Math.random() * 3 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.7,
              animationDelay: Math.random() * 5 + 's',
            }}
          />
        ))}
      </div>

      {/* UI Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 backdrop-blur-md transition-all"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <div className="flex gap-4">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/30 flex items-center gap-2">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-white font-bold text-xl tabular-nums">{score}</span>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/30 flex items-center gap-2">
            <span className="text-2xl">⏱️</span>
            <span className={`text-white font-bold text-xl tabular-nums ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-full">
        {/* Objects */}
        {objects.map(obj => (
          <div
            key={obj.id}
            className="absolute select-none pointer-events-none transition-transform duration-100"
            style={{
              left: `${obj.x}%`,
              top: `${obj.y}%`,
              fontSize: `${obj.size}px`,
              transform: `translate(-50%, -50%) rotate(${obj.rotation}deg)`,
              filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))',
            }}
          >
            {obj.emoji}
          </div>
        ))}

        {/* Particles */}
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: '6px',
              height: '6px',
              backgroundColor: p.color,
              opacity: p.life,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Player */}
        <div
          className={`absolute bottom-[15%] transition-all duration-75 ease-out select-none pointer-events-none ${isStunned ? 'opacity-50 grayscale animate-shake' : ''}`}
          style={{
            left: `${playerPosition}%`,
            transform: 'translate(-50%, 50%)',
            fontSize: '80px',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
          }}
        >
          {isStunned ? '😵' : '🐱'}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-black/30 rounded-[100%] blur-sm" />
        </div>
      </div>

      {/* Start/Game Over Overlays */}
      {!gameStarted && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-scale-in">
            <div className="text-6xl mb-4">🌟</div>
            <h2 className="text-3xl font-black text-indigo-600 mb-2">{t('miniGames.starCatcher.welcome', 'Yıldız Yakalayıcı')}</h2>
            <p className="text-gray-600 mb-6">{t('miniGames.starCatcher.instructions', 'Yıldızları ve meyveleri topla, bulutlardan kaç! Kediyi hareket ettirmek için parmağını kaydır.')}</p>
            
            {highScore > 0 && (
              <div className="mb-6 bg-indigo-50 rounded-xl py-2">
                <p className="text-indigo-400 text-sm font-bold uppercase tracking-wider">{t('miniGames.highScore', 'En Yüksek Skor')}</p>
                <p className="text-2xl font-black text-indigo-600">{highScore}</p>
              </div>
            )}

            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              {t('miniGames.startGame', 'OYUNA BAŞLA!')} 🚀
            </button>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-md p-6">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-scale-in">
            <div className="text-6xl mb-4">🏁</div>
            <h2 className="text-3xl font-black text-gray-800 mb-2">{t('miniGames.gameOver', 'Oyun Bitti!')}</h2>
            
            <div className="my-6">
              <p className="text-gray-500 text-sm font-bold uppercase">{t('miniGames.yourScore', 'Toplam Puan')}</p>
              <p className="text-5xl font-black text-indigo-600">{score}</p>
            </div>

            {score >= highScore && score > 0 && (
              <div className="mb-6 animate-bounce">
                <span className="bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full uppercase">{t('miniGames.newHighScore', 'YENİ REKOR!')} 🏆</span>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={startGame}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                {t('miniGames.playAgain', 'TEKRAR OYNA')} 🔄
              </button>
              <button
                onClick={onBack}
                className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl text-lg font-bold hover:bg-gray-200 transition-all"
              >
                {t('miniGames.backToMenu', 'MENÜYE DÖN')} 🏠
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(-50%, 50%) rotate(0deg); }
          25% { transform: translate(-55%, 50%) rotate(-5deg); }
          75% { transform: translate(-45%, 50%) rotate(5deg); }
        }
        .animate-shake {
          animation: shake 0.1s infinite;
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

export default StarCatcherGameScreen;
