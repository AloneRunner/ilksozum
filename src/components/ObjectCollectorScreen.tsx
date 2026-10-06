import React, { useState, useEffect, useCallback, useRef } from 'react';
import { nesneUrl } from '../services/nesneGorsel.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { playEffect } from '../services/speechService.ts';
import { t } from '../i18n/index.ts';

interface FallingObject {
  id: number;
  imageUrl: string;
  word: string;
  isTarget: boolean; // Bu objeyi toplamamız gerekiyor mu?
  x: number; // Yatay pozisyon (0-100 arası yüzde)
  y: number; // Dikey pozisyon (0-100 arası yüzde)
  speed: number; // Düşme hızı
}

interface ObjectCollectorScreenProps {
  onBack: () => void;
  targetCategory: string; // "Sadece meyveleri topla!" gibi
  targetObjects: Array<{ id: number; imageUrl: string; word: string }>; // Toplanacak objeler
  distractorObjects: Array<{ id: number; imageUrl: string; word: string }>; // Dikkat dağıtıcılar
  onComplete: (score: number, isCorrect: boolean) => void;
}

const ObjectCollectorScreen: React.FC<ObjectCollectorScreenProps> = ({
  onBack,
  targetCategory,
  targetObjects,
  distractorObjects,
  onComplete,
}) => {
  const [playerX, setPlayerX] = useState(50); // Karakter pozisyonu (0-100 yüzde)
  const [fallingObjects, setFallingObjects] = useState<FallingObject[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameTime, setGameTime] = useState(60); // 60 saniye
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [nextObjectId, setNextObjectId] = useState(1);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const lastSpawnTimeRef = useRef<number>(Date.now());
  const soundPlayedRef = useRef(false); // Ses tekrarını önlemek için

  // Klavye kontrolü
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;
      
      if (e.key === 'ArrowLeft') {
        setPlayerX(prev => Math.max(0, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setPlayerX(prev => Math.min(100, prev + 5));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStatus]);

  // Touch/Mouse kontrolü
  const handlePlayerMove = useCallback((clientX: number) => {
    if (!gameAreaRef.current || gameStatus !== 'playing') return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const relativeX = ((clientX - rect.left) / rect.width) * 100;
    setPlayerX(Math.max(0, Math.min(100, relativeX)));
  }, [gameStatus]);

  // Yeni obje spawn et
  const spawnObject = useCallback(() => {
    const now = Date.now();
    if (now - lastSpawnTimeRef.current < 1500) return; // 1.5 saniyede bir spawn
    
    lastSpawnTimeRef.current = now;
    
    // %70 hedef, %30 dikkat dağıtıcı
    const isTarget = Math.random() < 0.7;
    const sourceArray = isTarget ? targetObjects : distractorObjects;
    
    if (sourceArray.length === 0) return;
    
    const randomObj = sourceArray[Math.floor(Math.random() * sourceArray.length)];
    
    const newObject: FallingObject = {
      id: nextObjectId,
      imageUrl: randomObj.imageUrl,
      word: randomObj.word,
      isTarget,
      x: Math.random() * 90 + 5, // 5-95 arası
      y: -10, // Ekranın üstünde başla
      speed: 0.3 + Math.random() * 0.4, // 0.3-0.7 arası hız
    };
    
    setNextObjectId(prev => prev + 1);
    setFallingObjects(prev => [...prev, newObject]);
  }, [targetObjects, distractorObjects, nextObjectId]);

  // Oyun döngüsü - objeleri düşür ve çarpışma kontrolü
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const gameLoop = () => {
      setFallingObjects(prev => {
        const updated = prev.map(obj => ({
          ...obj,
          y: obj.y + obj.speed,
        }));

        // Çarpışma kontrolü - karakterle toplanan objeler
        const collected: number[] = [];
        updated.forEach(obj => {
          // Karakter genişliği ~10%, obje ~8%
          const playerLeft = playerX - 5;
          const playerRight = playerX + 5;
          const objLeft = obj.x - 4;
          const objRight = obj.x + 4;
          
          // Y pozisyonu karakter seviyesinde mi? (ekranın en altı ~90-100)
          if (obj.y >= 85 && obj.y <= 95) {
            // X pozisyonu çakışıyor mu?
            if (objRight >= playerLeft && objLeft <= playerRight) {
              collected.push(obj.id);
              
              if (obj.isTarget) {
                // Doğru obje toplandı
                setScore(s => s + 10);
                playEffect('correct');
              } else {
                // Yanlış obje toplandı
                setLives(l => Math.max(0, l - 1));
                playEffect('incorrect');
              }
            }
          }
        });

        // Toplanan veya ekrandan çıkan objeleri kaldır
        return updated.filter(obj => !collected.includes(obj.id) && obj.y < 105);
      });

      // Yeni obje spawn et
      spawnObject();

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStatus, playerX, spawnObject]);

  // Süre sayacı
  useEffect(() => {
    if (gameStatus !== 'playing') return;

    const timer = setInterval(() => {
      setGameTime(prev => {
        if (prev <= 1) {
          setGameStatus('won');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus]);

  // Can kontrolü
  useEffect(() => {
    if (lives <= 0 && gameStatus === 'playing') {
      setGameStatus('lost');
    }
  }, [lives, gameStatus]);

  // Oyun bitişi
  useEffect(() => {
    if (gameStatus === 'won' && !soundPlayedRef.current) {
      soundPlayedRef.current = true;
      playEffect('finish');
      setTimeout(() => onComplete(score, true), 1500);
    } else if (gameStatus === 'lost' && !soundPlayedRef.current) {
      soundPlayedRef.current = true;
      playEffect('incorrect');
      setTimeout(() => onComplete(score, false), 1500);
    }
  }, [gameStatus, score, onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200 p-4 pb-10 overflow-hidden">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-auto p-6 h-[calc(100vh-2rem)] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={t('app.back')}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold text-blue-600">🏃 {t('games.objectCollector.title', 'Nesne Toplama')}</h1>
            <p className="text-sm text-gray-600 mt-1">{targetCategory}</p>
          </div>
          
          <div className="w-10" />
        </div>

        {/* Skorlar */}
        <div className="flex justify-between items-center mb-4 px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⏱️</span>
            <span className="text-xl font-bold text-gray-700">{gameTime}s</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            <span className="text-xl font-bold text-yellow-600">{score}</span>
          </div>
          
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="text-2xl">
                {i < lives ? '❤️' : '🖤'}
              </span>
            ))}
          </div>
        </div>

        {/* Oyun Alanı */}
        <div
          ref={gameAreaRef}
          className="flex-1 bg-gradient-to-b from-sky-50 to-green-100 rounded-lg relative overflow-hidden border-4 border-blue-300"
          onMouseMove={(e) => handlePlayerMove(e.clientX)}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              handlePlayerMove(e.touches[0].clientX);
            }
          }}
        >
          {/* Düşen Objeler */}
          {fallingObjects.map(obj => (
            <div
              key={obj.id}
              className="absolute transition-none pointer-events-none"
              style={{
                left: `${obj.x}%`,
                top: `${obj.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '60px',
                height: '60px',
              }}
            >
              <img
                src={nesneUrl(obj.imageUrl)}
                alt={obj.word}
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
          ))}

          {/* Karakter (Sepet) */}
          <div
            className="absolute bottom-0 transition-all duration-100 ease-linear"
            style={{
              left: `${playerX}%`,
              transform: 'translateX(-50%)',
              width: '80px',
              height: '80px',
            }}
          >
            <div className="text-6xl">🧺</div>
          </div>

          {/* Oyun Sonu Mesajları */}
          {gameStatus === 'won' && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-green-100 border-4 border-green-500 rounded-2xl p-8 text-center">
                <p className="text-4xl font-bold text-green-700 mb-2">🎉 {t('games.objectCollector.youWin', 'Tebrikler!')}</p>
                <p className="text-2xl text-green-600">{t('games.objectCollector.finalScore', 'Skor')}: {score}</p>
              </div>
            </div>
          )}

          {gameStatus === 'lost' && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="bg-red-100 border-4 border-red-500 rounded-2xl p-8 text-center">
                <p className="text-4xl font-bold text-red-700 mb-2">😔 {t('games.objectCollector.gameOver', 'Oyun Bitti')}</p>
                <p className="text-2xl text-red-600">{t('games.objectCollector.finalScore', 'Skor')}: {score}</p>
              </div>
            </div>
          )}
        </div>

        {/* Talimatlar */}
        <div className="mt-4 text-center text-sm text-gray-500">
          {t('games.objectCollector.instructions', '← → ok tuşları veya fare/parmağınla sepeti hareket ettir')}
        </div>
      </div>
    </div>
  );
};

export default ObjectCollectorScreen;
