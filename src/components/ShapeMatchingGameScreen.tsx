import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { t } from '../i18n/index.ts';

interface ShapeMatchingGameScreenProps {
  onBack: () => void;
}

// Şekil tanımları
interface ShapeDefinition {
  id: string;
  type: 'circle' | 'square' | 'triangle' | 'star' | 'hexagon' | 'diamond' | 'heart' | 'pentagon';
  color: string;
  shadowColor: string;
}

// Konfeti parçacığı
interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  velocityX: number;
  velocityY: number;
  gravity: number;
  opacity: number;
}

// Şekil çizici
const drawShape = (
  ctx: CanvasRenderingContext2D,
  type: string,
  x: number,
  y: number,
  size: number,
  color: string,
  isShadow: boolean = false
): void => {
  ctx.save();
  ctx.translate(x, y);

  if (isShadow) {
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.shadowColor = 'transparent';
  } else {
    ctx.fillStyle = color;
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
  }

  ctx.beginPath();

  switch (type) {
    case 'circle':
      ctx.arc(0, 0, size * 0.45, 0, Math.PI * 2);
      break;

    case 'square':
      const halfSq = size * 0.4;
      ctx.roundRect(-halfSq, -halfSq, halfSq * 2, halfSq * 2, 8);
      break;

    case 'triangle':
      const triH = size * 0.45;
      ctx.moveTo(0, -triH);
      ctx.lineTo(triH * 0.87, triH * 0.5);
      ctx.lineTo(-triH * 0.87, triH * 0.5);
      ctx.closePath();
      break;

    case 'star':
      const outerR = size * 0.45;
      const innerR = outerR * 0.4;
      for (let i = 0; i < 5; i++) {
        const outerAngle = (i * 72 - 90) * Math.PI / 180;
        const innerAngle = ((i * 72) + 36 - 90) * Math.PI / 180;
        ctx.lineTo(Math.cos(outerAngle) * outerR, Math.sin(outerAngle) * outerR);
        ctx.lineTo(Math.cos(innerAngle) * innerR, Math.sin(innerAngle) * innerR);
      }
      ctx.closePath();
      break;

    case 'hexagon':
      const hexR = size * 0.42;
      for (let i = 0; i < 6; i++) {
        const angle = (i * 60 - 30) * Math.PI / 180;
        const px = Math.cos(angle) * hexR;
        const py = Math.sin(angle) * hexR;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      break;

    case 'diamond':
      const diaR = size * 0.45;
      ctx.moveTo(0, -diaR);
      ctx.lineTo(diaR * 0.6, 0);
      ctx.lineTo(0, diaR);
      ctx.lineTo(-diaR * 0.6, 0);
      ctx.closePath();
      break;

    case 'heart':
      const heartScale = size * 0.025;
      ctx.scale(heartScale, heartScale);
      ctx.moveTo(0, -8);
      ctx.bezierCurveTo(-12, -18, -24, -4, 0, 16);
      ctx.bezierCurveTo(24, -4, 12, -18, 0, -8);
      break;

    case 'pentagon':
      const pentR = size * 0.42;
      for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * Math.PI / 180;
        const px = Math.cos(angle) * pentR;
        const py = Math.sin(angle) * pentR;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      break;
  }

  ctx.fill();

  // Parlak kenar efekti (gölge değilse)
  if (!isShadow) {
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  ctx.restore();
};

// Konfeti bileşeni
const ConfettiCanvas: React.FC<{ particles: ConfettiParticle[] }> = ({ particles }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      // Çeşitli konfeti şekilleri
      const shapeType = p.id % 3;
      if (shapeType === 0) {
        // Dikdörtgen
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (shapeType === 1) {
        // Daire
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Üçgen
        ctx.beginPath();
        ctx.moveTo(0, -p.size / 2);
        ctx.lineTo(p.size / 2, p.size / 2);
        ctx.lineTo(-p.size / 2, p.size / 2);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    });
  }, [particles]);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
};

const ShapeMatchingGameScreen: React.FC<ShapeMatchingGameScreenProps> = ({ onBack }) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Oyun durumu
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [confettiParticles, setConfettiParticles] = useState<ConfettiParticle[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

  // Sürükleme durumu
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [shapePositions, setShapePositions] = useState<Record<string, { x: number; y: number }>>({});

  // Ses çalma
  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio error:', e);
    }
  }, []);

  // Başarı melodisi
  const playSuccessSound = useCallback(() => {
    playSound(523, 0.15); // C5
    setTimeout(() => playSound(659, 0.15), 100); // E5
    setTimeout(() => playSound(784, 0.2), 200); // G5
    setTimeout(() => playSound(1047, 0.3), 300); // C6
  }, [playSound]);

  // Yanlış ses
  const playWrongSound = useCallback(() => {
    playSound(200, 0.2, 'sawtooth');
  }, [playSound]);

  // Bölüm tamamlandı sesi
  const playLevelCompleteSound = useCallback(() => {
    [392, 440, 494, 523, 587, 659, 698, 784].forEach((freq, i) => {
      setTimeout(() => playSound(freq, 0.2), i * 80);
    });
  }, [playSound]);

  // Ekran yönü algılama
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Level şekilleri
  const levelShapes = useMemo((): ShapeDefinition[] => {
    const allShapes: ShapeDefinition[] = [
      { id: 'circle', type: 'circle', color: '#FF6B6B', shadowColor: 'rgba(255,107,107,0.3)' },
      { id: 'square', type: 'square', color: '#4ECDC4', shadowColor: 'rgba(78,205,196,0.3)' },
      { id: 'triangle', type: 'triangle', color: '#FFE66D', shadowColor: 'rgba(255,230,109,0.3)' },
      { id: 'star', type: 'star', color: '#FF9F43', shadowColor: 'rgba(255,159,67,0.3)' },
      { id: 'hexagon', type: 'hexagon', color: '#A55EEA', shadowColor: 'rgba(165,94,234,0.3)' },
      { id: 'diamond', type: 'diamond', color: '#26DE81', shadowColor: 'rgba(38,222,129,0.3)' },
      { id: 'heart', type: 'heart', color: '#FC5C65', shadowColor: 'rgba(252,92,101,0.3)' },
      { id: 'pentagon', type: 'pentagon', color: '#45AAF2', shadowColor: 'rgba(69,170,242,0.3)' },
    ];

    const count = Math.min(3 + level, 6);
    return allShapes.slice(0, count);
  }, [level]);

  // Slot pozisyonları (tahtadaki hedef yerler)
  const slotPositions = useMemo(() => {
    const slots: { id: string; x: number; y: number }[] = [];
    const count = levelShapes.length;

    // Yatayda veya dikeyde düzenle
    if (isLandscape) {
      const cols = Math.min(count, 3);
      const rows = Math.ceil(count / cols);
      const spacing = 100 / (cols + 1);
      const rowSpacing = 100 / (rows + 1);

      levelShapes.forEach((shape, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        slots.push({
          id: shape.id,
          x: (col + 1) * spacing,
          y: (row + 1) * rowSpacing
        });
      });
    } else {
      // Dikeyde daha kompakt
      const cols = 2;
      const rows = Math.ceil(count / cols);
      const spacing = 100 / (cols + 1);
      const rowSpacing = 100 / (rows + 1);

      levelShapes.forEach((shape, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        slots.push({
          id: shape.id,
          x: (col + 1) * spacing,
          y: (row + 1) * rowSpacing
        });
      });
    }

    return slots;
  }, [levelShapes, isLandscape]);

  // Başlangıç şekil pozisyonları (karıştırılmış)
  const initialShapePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const shuffled = [...levelShapes].sort(() => Math.random() - 0.5);

    shuffled.forEach((shape, i) => {
      // Alt kısımda rastgele pozisyonlar
      positions[shape.id] = {
        x: 15 + (i * 70 / shuffled.length) + Math.random() * 10,
        y: 75 + Math.random() * 15
      };
    });

    return positions;
  }, [levelShapes, level]); // level ekleyerek her seviyede yeniden hesapla

  // Pozisyonları başlat
  useEffect(() => {
    setShapePositions(initialShapePositions);
    setMatchedIds([]);
  }, [initialShapePositions]);

  // Konfeti patlaması
  const createConfettiBurst = useCallback((x: number, y: number) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F43', '#A55EEA', '#26DE81', '#FC5C65', '#45AAF2'];
    const particles: ConfettiParticle[] = [];

    for (let i = 0; i < 50; i++) {
      const angle = (Math.random() * Math.PI * 2);
      const velocity = 5 + Math.random() * 10;
      particles.push({
        id: Date.now() + i,
        x,
        y,
        size: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        velocityX: Math.cos(angle) * velocity,
        velocityY: Math.sin(angle) * velocity - 5,
        gravity: 0.3,
        opacity: 1
      });
    }

    setConfettiParticles(particles);

    // Konfeti animasyonu
    const animate = () => {
      setConfettiParticles((prev) => {
        const updated = prev
          .map((p) => ({
            ...p,
            x: p.x + p.velocityX,
            y: p.y + p.velocityY,
            velocityY: p.velocityY + p.gravity,
            velocityX: p.velocityX * 0.98,
            rotation: p.rotation + 0.1,
            opacity: p.opacity - 0.015
          }))
          .filter((p) => p.opacity > 0);

        if (updated.length > 0) {
          requestAnimationFrame(animate);
        }
        return updated;
      });
    };

    requestAnimationFrame(animate);
  }, []);

  // Pointer olayları
  const handlePointerDown = useCallback((e: React.PointerEvent, shapeId: string) => {
    if (matchedIds.includes(shapeId)) return;

    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const pos = shapePositions[shapeId];

    setDraggingId(shapeId);
    setDragOffset({ x: x - pos.x, y: y - pos.y });
    setDragPosition({ x: e.clientX, y: e.clientY });

    playSound(400, 0.1);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [matchedIds, shapePositions, playSound]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!draggingId) return;

    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100 - dragOffset.x;
    const y = ((e.clientY - rect.top) / rect.height) * 100 - dragOffset.y;

    setShapePositions((prev) => ({
      ...prev,
      [draggingId]: { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) }
    }));
    setDragPosition({ x: e.clientX, y: e.clientY });
  }, [draggingId, dragOffset]);

  const handlePointerUp = useCallback(() => {
    if (!draggingId) return;

    const shapePos = shapePositions[draggingId];
    const targetSlot = slotPositions.find((s) => s.id === draggingId);

    if (targetSlot) {
      const dx = shapePos.x - targetSlot.x;
      const dy = shapePos.y - targetSlot.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Snap mesafesi - yüzde olarak
      const snapThreshold = 15;

      if (dist < snapThreshold) {
        // Doğru eşleşme!
        setShapePositions((prev) => ({
          ...prev,
          [draggingId]: { x: targetSlot.x, y: targetSlot.y }
        }));
        setMatchedIds((prev) => [...prev, draggingId]);
        setScore((prev) => prev + 10 * level);

        playSuccessSound();
        createConfettiBurst(dragPosition.x, dragPosition.y);

        // Tüm şekiller eşleşti mi?
        if (matchedIds.length + 1 === levelShapes.length) {
          setShowSuccess(true);
          playLevelCompleteSound();

          // Bir sonraki seviye
          setTimeout(() => {
            setShowSuccess(false);
            setLevel((prev) => prev + 1);
          }, 2000);
        }
      } else {
        // Yanlış pozisyon - geri döndür
        playWrongSound();
        setShapePositions((prev) => ({
          ...prev,
          [draggingId]: initialShapePositions[draggingId] || { x: 50, y: 80 }
        }));
      }
    }

    setDraggingId(null);
  }, [draggingId, shapePositions, slotPositions, matchedIds, levelShapes, dragPosition, initialShapePositions, playSuccessSound, playWrongSound, playLevelCompleteSound, createConfettiBurst, level]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 flex flex-col overflow-hidden">
      {/* Konfeti */}
      <ConfettiCanvas particles={confettiParticles} />

      {/* Başlık çubuğu */}
      <div className="flex items-center justify-between px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all text-white font-bold"
        >
          ← {t('common.back', 'Geri')}
        </button>

        <h1 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
          🔷 {t('miniGames.shapeMatching.title', 'Şekil Eşleştirme')}
        </h1>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-white/20 rounded-xl text-white font-bold">
            ⭐ {score}
          </div>
          <div className="px-4 py-2 bg-white/20 rounded-xl text-white font-bold">
            📊 {t('common.level', 'Seviye')} {level}
          </div>
        </div>
      </div>

      {/* Oyun alanı */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          ref={boardRef}
          className={`relative ${isLandscape ? 'w-[90vw] h-[75vh]' : 'w-[95vw] h-[85vh]'}`}
          style={{
            background: 'linear-gradient(145deg, #D4A574 0%, #C4956A 50%, #B4855A 100%)',
            borderRadius: '24px',
            boxShadow: `
              inset 0 4px 20px rgba(255,255,255,0.3),
              inset 0 -4px 20px rgba(0,0,0,0.2),
              0 10px 40px rgba(0,0,0,0.3),
              0 0 0 8px #8B5A2B,
              0 0 0 12px #6B4226
            `,
            touchAction: 'none'
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Ahşap doku efekti */}
          <div
            className="absolute inset-0 pointer-events-none rounded-3xl opacity-30"
            style={{
              background: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(139,90,43,0.1) 2px,
                  rgba(139,90,43,0.1) 4px
                ),
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 20px,
                  rgba(139,90,43,0.05) 20px,
                  rgba(139,90,43,0.05) 40px
                )
              `
            }}
          />

          {/* Talimat */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/80 rounded-full shadow-lg">
            <p className="text-amber-800 font-semibold text-sm md:text-base">
              🎯 {t('miniGames.shapeMatching.instruction', 'Şekilleri doğru yerlere sürükle!')}
            </p>
          </div>

          {/* Hedef slotlar - şekle göre yuvalar */}
          {slotPositions.map((slot) => {
            const shape = levelShapes.find((s) => s.id === slot.id);
            if (!shape) return null;

            const size = isLandscape ? Math.min(window.innerWidth * 0.12, 130) : Math.min(window.innerWidth * 0.22, 120);

            return (
              <div
                key={`slot-${slot.id}`}
                className="absolute"
                style={{
                  left: `${slot.x}%`,
                  top: `${slot.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: size,
                  height: size
                }}
              >
                {/* Şekle göre yuva - canvas ile çizilir */}
                <canvas
                  width={size}
                  height={size}
                  className="absolute inset-0"
                  style={{
                    filter: 'drop-shadow(inset 0 4px 8px rgba(0,0,0,0.3))'
                  }}
                  ref={(canvas) => {
                    if (canvas) {
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        ctx.clearRect(0, 0, size, size);
                        // İçe batık görünüm için koyu gölge şekli çiz
                        drawShape(ctx, shape.type, size / 2, size / 2, size, 'rgba(80,50,30,0.5)', true);
                      }
                    }
                  }}
                />
              </div>
            );
          })}

          {/* Sürüklenebilir şekiller */}
          {levelShapes.map((shape) => {
            const pos = shapePositions[shape.id];
            if (!pos) return null;

            const isMatched = matchedIds.includes(shape.id);
            const isDragging = draggingId === shape.id;
            const size = isLandscape ? Math.min(window.innerWidth * 0.12, 130) : Math.min(window.innerWidth * 0.22, 120);

            return (
              <div
                key={shape.id}
                className={`absolute cursor-grab ${isDragging ? 'cursor-grabbing z-50' : 'z-10'} ${isMatched ? 'pointer-events-none' : ''}`}
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: `translate(-50%, -50%) ${isDragging ? 'scale(1.1)' : 'scale(1)'}`,
                  width: size,
                  height: size,
                  filter: isDragging ? 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))',
                  willChange: isDragging ? 'transform, left, top' : 'auto',
                  transition: isDragging ? 'none' : 'transform 0.15s ease-out, filter 0.15s ease-out'
                }}
                onPointerDown={(e) => handlePointerDown(e, shape.id)}
              >
                <canvas
                  width={size}
                  height={size}
                  className="w-full h-full"
                  ref={(canvas) => {
                    if (canvas) {
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        ctx.clearRect(0, 0, size, size);
                        drawShape(ctx, shape.type, size / 2, size / 2, size, shape.color);
                      }
                    }
                  }}
                />

                {/* Eşleşti işareti */}
                {isMatched && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl animate-bounce">✓</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Seviye tamamlandı */}
      {
        showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-bounce-in">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-amber-600 mb-2">
                {t('miniGames.levelComplete', 'Tebrikler!')}
              </h2>
              <p className="text-xl text-gray-600">
                {t('miniGames.shapeMatching.allMatched', 'Tüm şekilleri eşleştirdin!')}
              </p>
              <p className="text-lg text-amber-500 mt-2 font-bold">
                +{10 * level * levelShapes.length} ⭐
              </p>
            </div>
          </div>
        )
      }

      {/* Animasyon stilleri */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-5px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </div >
  );
};

export default ShapeMatchingGameScreen;
