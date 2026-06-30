import React, { useState, useRef, useEffect, useCallback } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';

interface SevenDifferencesScreenProps {
  onBack: () => void;
}

interface Difference {
  id: number;
  x: number;
  y: number;
  radius: number;
  found: boolean;
}

// Canvas üzerinde çizilecek sahne tipi
interface SceneData {
  name: string;
  bgGradient: [string, string];
  differences: Difference[];
  drawScene: (ctx: CanvasRenderingContext2D, w: number, h: number, showDiffs: boolean) => void;
}

const SevenDifferencesScreen: React.FC<SevenDifferencesScreenProps> = ({ onBack }) => {
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const [level, setLevel] = useState(0);
  const [foundDifferences, setFoundDifferences] = useState<number[]>([]);
  const [showWin, setShowWin] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongClick, setWrongClick] = useState<{ x: number; y: number; side: 'left' | 'right' } | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [showHint, setShowHint] = useState<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Ses çal
  const playSound = useCallback((freq: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = freq;
      osc.type = type;
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error('Audio error:', e);
    }
  }, []);

  const playSuccess = useCallback(() => {
    playSound(523, 0.1);
    setTimeout(() => playSound(659, 0.1), 80);
    setTimeout(() => playSound(784, 0.15), 160);
  }, [playSound]);

  const playWin = useCallback(() => {
    [523, 587, 659, 698, 784, 880, 988, 1047].forEach((f, i) => {
      setTimeout(() => playSound(f, 0.12), i * 80);
    });
  }, [playSound]);

  const playError = useCallback(() => {
    playSound(200, 0.15, 'sawtooth');
  }, [playSound]);

  // ====== SAHNE 1: MUTLU EV ======
  const drawHouseScene = (ctx: CanvasRenderingContext2D, w: number, h: number, showDiffs: boolean) => {
    // Gökyüzü
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGrad.addColorStop(0, '#87CEEB');
    skyGrad.addColorStop(1, '#E0F4FF');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.6);

    // Çimen
    const grassGrad = ctx.createLinearGradient(0, h * 0.6, 0, h);
    grassGrad.addColorStop(0, '#7CCD7C');
    grassGrad.addColorStop(1, '#228B22');
    ctx.fillStyle = grassGrad;
    ctx.fillRect(0, h * 0.6, w, h * 0.4);

    // Çimen detayları
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 2;
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * w;
      const y = h * 0.62 + Math.random() * (h * 0.35);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 3, y - 8);
      ctx.moveTo(x, y);
      ctx.lineTo(x + 3, y - 10);
      ctx.stroke();
    }

    // Güneş - FARK 1: Sağda güneş ışınları farklı
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(w * 0.85, h * 0.12, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Güneş ışınları
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 3;
    const rayCount = showDiffs ? 12 : 8;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i * Math.PI * 2) / rayCount;
      ctx.beginPath();
      ctx.moveTo(w * 0.85 + Math.cos(angle) * 30, h * 0.12 + Math.sin(angle) * 30);
      ctx.lineTo(w * 0.85 + Math.cos(angle) * 45, h * 0.12 + Math.sin(angle) * 45);
      ctx.stroke();
    }

    // Bulutlar
    const drawCloud = (cx: number, cy: number, size: number) => {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(cx, cy, size, 0, Math.PI * 2);
      ctx.arc(cx + size * 0.8, cy - size * 0.3, size * 0.7, 0, Math.PI * 2);
      ctx.arc(cx + size * 1.5, cy, size * 0.8, 0, Math.PI * 2);
      ctx.arc(cx + size * 0.7, cy + size * 0.2, size * 0.6, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCloud(w * 0.15, h * 0.1, 18);
    drawCloud(w * 0.5, h * 0.15, 15);

    // FARK 2: Sağda ekstra bulut
    if (showDiffs) {
      drawCloud(w * 0.35, h * 0.08, 12);
    }

    // Ev gövdesi
    ctx.fillStyle = '#DEB887';
    ctx.fillRect(w * 0.3, h * 0.35, w * 0.4, h * 0.28);
    
    // Ev çerçevesi
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 3;
    ctx.strokeRect(w * 0.3, h * 0.35, w * 0.4, h * 0.28);

    // Çatı
    ctx.fillStyle = '#8B0000';
    ctx.beginPath();
    ctx.moveTo(w * 0.25, h * 0.35);
    ctx.lineTo(w * 0.5, h * 0.15);
    ctx.lineTo(w * 0.75, h * 0.35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Baca - FARK 3: Sağda duman var
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(w * 0.6, h * 0.18, w * 0.06, h * 0.12);
    
    if (showDiffs) {
      // Duman
      ctx.fillStyle = 'rgba(150, 150, 150, 0.6)';
      ctx.beginPath();
      ctx.arc(w * 0.63, h * 0.13, 8, 0, Math.PI * 2);
      ctx.arc(w * 0.65, h * 0.09, 10, 0, Math.PI * 2);
      ctx.arc(w * 0.68, h * 0.05, 12, 0, Math.PI * 2);
      ctx.fill();
    }

    // Kapı
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(w * 0.45, h * 0.48, w * 0.1, h * 0.15);
    
    // Kapı kolu - FARK 4: Sağda kapı kolu sağda
    ctx.fillStyle = '#FFD700';
    const doorKnobX = showDiffs ? w * 0.53 : w * 0.47;
    ctx.beginPath();
    ctx.arc(doorKnobX, h * 0.55, 4, 0, Math.PI * 2);
    ctx.fill();

    // Pencereler
    const drawWindow = (wx: number, wy: number) => {
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(wx, wy, w * 0.08, h * 0.08);
      ctx.strokeStyle = '#8B4513';
      ctx.lineWidth = 2;
      ctx.strokeRect(wx, wy, w * 0.08, h * 0.08);
      // Pencere çerçevesi
      ctx.beginPath();
      ctx.moveTo(wx + w * 0.04, wy);
      ctx.lineTo(wx + w * 0.04, wy + h * 0.08);
      ctx.moveTo(wx, wy + h * 0.04);
      ctx.lineTo(wx + w * 0.08, wy + h * 0.04);
      ctx.stroke();
    };
    drawWindow(w * 0.33, h * 0.4);
    drawWindow(w * 0.58, h * 0.4);

    // FARK 5: Sağda sol pencerede perde
    if (showDiffs) {
      ctx.fillStyle = '#FF6B6B';
      ctx.beginPath();
      ctx.moveTo(w * 0.33, h * 0.4);
      ctx.lineTo(w * 0.36, h * 0.44);
      ctx.lineTo(w * 0.33, h * 0.48);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(w * 0.41, h * 0.4);
      ctx.lineTo(w * 0.38, h * 0.44);
      ctx.lineTo(w * 0.41, h * 0.48);
      ctx.fill();
    }

    // Ağaç
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(w * 0.1, h * 0.45, w * 0.04, h * 0.18);
    ctx.fillStyle = '#228B22';
    ctx.beginPath();
    ctx.arc(w * 0.12, h * 0.38, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w * 0.1, h * 0.42, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w * 0.15, h * 0.43, 20, 0, Math.PI * 2);
    ctx.fill();

    // FARK 6: Sağda ağaçta elma var
    if (showDiffs) {
      ctx.fillStyle = '#FF0000';
      ctx.beginPath();
      ctx.arc(w * 0.1, h * 0.36, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(w * 0.14, h * 0.4, 5, 0, Math.PI * 2);
      ctx.fill();
      // Yaprak
      ctx.fillStyle = '#228B22';
      ctx.beginPath();
      ctx.ellipse(w * 0.105, h * 0.345, 3, 2, -0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Çiçekler
    const drawFlower = (fx: number, fy: number, color: string) => {
      ctx.fillStyle = '#228B22';
      ctx.fillRect(fx - 1, fy, 2, 15);
      ctx.fillStyle = color;
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        ctx.beginPath();
        ctx.arc(fx + Math.cos(angle) * 6, fy + Math.sin(angle) * 6, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(fx, fy, 4, 0, Math.PI * 2);
      ctx.fill();
    };
    drawFlower(w * 0.78, h * 0.68, '#FF69B4');
    drawFlower(w * 0.85, h * 0.72, '#FF6347');
    drawFlower(w * 0.82, h * 0.78, '#9370DB');

    // FARK 7: Sağda kelebek var
    if (showDiffs) {
      ctx.fillStyle = '#FF69B4';
      ctx.beginPath();
      ctx.ellipse(w * 0.22, h * 0.5, 8, 12, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(w * 0.26, h * 0.5, 8, 12, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#333';
      ctx.fillRect(w * 0.235, h * 0.48, 3, 15);
      // Antenler
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.24, h * 0.48);
      ctx.lineTo(w * 0.23, h * 0.44);
      ctx.moveTo(w * 0.24, h * 0.48);
      ctx.lineTo(w * 0.25, h * 0.44);
      ctx.stroke();
    }
  };

  // ====== SAHNE 2: DENİZ ALTI ======
  const drawUnderwaterScene = (ctx: CanvasRenderingContext2D, w: number, h: number, showDiffs: boolean) => {
    // Deniz gradyanı
    const seaGrad = ctx.createLinearGradient(0, 0, 0, h);
    seaGrad.addColorStop(0, '#006994');
    seaGrad.addColorStop(0.5, '#004466');
    seaGrad.addColorStop(1, '#001a33');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, 0, w, h);

    // Işık hüzmeleri
    ctx.fillStyle = 'rgba(100, 200, 255, 0.1)';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(w * (0.1 + i * 0.2), 0);
      ctx.lineTo(w * (0.05 + i * 0.2), h);
      ctx.lineTo(w * (0.15 + i * 0.2), h);
      ctx.closePath();
      ctx.fill();
    }

    // Kum zemin
    const sandGrad = ctx.createLinearGradient(0, h * 0.85, 0, h);
    sandGrad.addColorStop(0, '#C2B280');
    sandGrad.addColorStop(1, '#8B7355');
    ctx.fillStyle = sandGrad;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.88);
    for (let x = 0; x <= w; x += 20) {
      ctx.lineTo(x, h * 0.88 + Math.sin(x * 0.05) * 5);
    }
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();

    // Yosunlar
    const drawSeaweed = (sx: number, height: number, color: string) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(sx, h * 0.88);
      for (let y = h * 0.88; y > h * 0.88 - height; y -= 10) {
        const wave = Math.sin((h * 0.88 - y) * 0.1 + Date.now() * 0.001) * 8;
        ctx.lineTo(sx + wave, y);
      }
      ctx.stroke();
    };
    drawSeaweed(w * 0.08, 60, '#228B22');
    drawSeaweed(w * 0.12, 80, '#2E8B57');
    drawSeaweed(w * 0.88, 70, '#228B22');
    drawSeaweed(w * 0.92, 50, '#2E8B57');

    // FARK 1: Sağda ekstra yosun
    if (showDiffs) {
      drawSeaweed(w * 0.85, 90, '#32CD32');
    }

    // Kabarcıklar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    [0.15, 0.35, 0.65, 0.8].forEach((xRatio, i) => {
      const bubbleY = h * (0.3 + (i * 0.15));
      ctx.beginPath();
      ctx.arc(w * xRatio, bubbleY, 4 + i * 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // FARK 2: Sağda daha fazla kabarcık
    if (showDiffs) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      [0.25, 0.45, 0.55].forEach((xRatio, i) => {
        ctx.beginPath();
        ctx.arc(w * xRatio, h * (0.4 + i * 0.1), 5, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // Balık çizici
    const drawFish = (fx: number, fy: number, size: number, color: string, facingRight: boolean) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      const dir = facingRight ? 1 : -1;
      ctx.ellipse(fx, fy, size, size * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
      // Kuyruk
      ctx.beginPath();
      ctx.moveTo(fx - dir * size, fy);
      ctx.lineTo(fx - dir * (size + size * 0.6), fy - size * 0.4);
      ctx.lineTo(fx - dir * (size + size * 0.6), fy + size * 0.4);
      ctx.closePath();
      ctx.fill();
      // Göz
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(fx + dir * size * 0.5, fy - size * 0.1, size * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'black';
      ctx.beginPath();
      ctx.arc(fx + dir * size * 0.55, fy - size * 0.1, size * 0.1, 0, Math.PI * 2);
      ctx.fill();
    };

    drawFish(w * 0.7, h * 0.25, 25, '#FF6347', true);
    drawFish(w * 0.25, h * 0.4, 20, '#FFD700', false);
    drawFish(w * 0.5, h * 0.55, 18, '#FF69B4', true);

    // FARK 3: Sağda turuncu balık yok
    if (!showDiffs) {
      drawFish(w * 0.35, h * 0.2, 15, '#FFA500', true);
    }

    // Deniz yıldızı
    const drawStarfish = (sx: number, sy: number, size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const outerX = sx + Math.cos(angle) * size;
        const outerY = sy + Math.sin(angle) * size;
        const innerAngle = angle + Math.PI / 5;
        const innerX = sx + Math.cos(innerAngle) * (size * 0.4);
        const innerY = sy + Math.sin(innerAngle) * (size * 0.4);
        if (i === 0) ctx.moveTo(outerX, outerY);
        else ctx.lineTo(outerX, outerY);
        ctx.lineTo(innerX, innerY);
      }
      ctx.closePath();
      ctx.fill();
    };
    drawStarfish(w * 0.75, h * 0.92, 18, '#FF6B6B');
    
    // FARK 4: Sağda ek deniz yıldızı
    if (showDiffs) {
      drawStarfish(w * 0.2, h * 0.9, 15, '#FFD93D');
    }

    // Mercan
    ctx.fillStyle = '#FF7F50';
    ctx.beginPath();
    ctx.moveTo(w * 0.6, h * 0.88);
    ctx.lineTo(w * 0.58, h * 0.78);
    ctx.lineTo(w * 0.62, h * 0.82);
    ctx.lineTo(w * 0.65, h * 0.75);
    ctx.lineTo(w * 0.67, h * 0.8);
    ctx.lineTo(w * 0.7, h * 0.77);
    ctx.lineTo(w * 0.68, h * 0.88);
    ctx.closePath();
    ctx.fill();

    // FARK 5: Sağda mercan rengi farklı
    if (showDiffs) {
      ctx.fillStyle = '#9370DB';
      ctx.beginPath();
      ctx.moveTo(w * 0.6, h * 0.88);
      ctx.lineTo(w * 0.58, h * 0.78);
      ctx.lineTo(w * 0.62, h * 0.82);
      ctx.lineTo(w * 0.65, h * 0.75);
      ctx.lineTo(w * 0.67, h * 0.8);
      ctx.lineTo(w * 0.7, h * 0.77);
      ctx.lineTo(w * 0.68, h * 0.88);
      ctx.closePath();
      ctx.fill();
    }

    // Denizaltı
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.15, 45, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#87CEEB';
    ctx.beginPath();
    ctx.arc(w * 0.45, h * 0.13, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w * 0.55, h * 0.13, 10, 0, Math.PI * 2);
    ctx.fill();
    // Periskop
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(w * 0.49, h * 0.05, 6, 12);
    ctx.fillRect(w * 0.47, h * 0.03, 12, 6);

    // FARK 6: Sağda periskop yok
    if (showDiffs) {
      ctx.fillStyle = '#006994';
      ctx.fillRect(w * 0.46, h * 0.02, 14, 14);
    }

    // Hazine sandığı
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(w * 0.78, h * 0.85, 35, 25);
    ctx.fillStyle = '#A0522D';
    ctx.beginPath();
    ctx.ellipse(w * 0.795, h * 0.85, 17.5, 8, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(w * 0.79, h * 0.89, 8, 6);

    // FARK 7: Sağda sandıktan altın çıkıyor
    if (showDiffs) {
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(w * 0.8, h * 0.82, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(w * 0.83, h * 0.81, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(w * 0.77, h * 0.83, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // ====== SAHNE 3: UZAY ======
  const drawSpaceScene = (ctx: CanvasRenderingContext2D, w: number, h: number, showDiffs: boolean) => {
    // Uzay arka planı
    const spaceGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, w * 0.8);
    spaceGrad.addColorStop(0, '#1a1a3a');
    spaceGrad.addColorStop(1, '#000011');
    ctx.fillStyle = spaceGrad;
    ctx.fillRect(0, 0, w, h);

    // Yıldızlar
    for (let i = 0; i < 80; i++) {
      const starX = (i * 47 + 13) % w;
      const starY = (i * 31 + 7) % h;
      const size = (i % 3) + 1;
      ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + (i % 5) * 0.1})`;
      ctx.beginPath();
      ctx.arc(starX, starY, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // FARK 1: Sağda büyük parlak yıldız
    if (showDiffs) {
      ctx.fillStyle = '#FFFACD';
      ctx.beginPath();
      const sx = w * 0.15, sy = h * 0.12;
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        ctx.lineTo(sx + Math.cos(angle) * 15, sy + Math.sin(angle) * 15);
        ctx.lineTo(sx + Math.cos(angle + Math.PI / 4) * 5, sy + Math.sin(angle + Math.PI / 4) * 5);
      }
      ctx.closePath();
      ctx.fill();
    }

    // Gezegen - Satürn
    ctx.fillStyle = '#DEB887';
    ctx.beginPath();
    ctx.arc(w * 0.75, h * 0.25, 35, 0, Math.PI * 2);
    ctx.fill();
    // Halka
    ctx.strokeStyle = '#C4A35A';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.ellipse(w * 0.75, h * 0.25, 55, 15, -0.2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = '#B8956E';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(w * 0.75, h * 0.25, 48, 12, -0.2, 0, Math.PI * 2);
    ctx.stroke();

    // FARK 2: Sağda halka rengi farklı
    if (showDiffs) {
      ctx.strokeStyle = '#FF69B4';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.ellipse(w * 0.75, h * 0.25, 55, 15, -0.2, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Ay
    ctx.fillStyle = '#E8E8E8';
    ctx.beginPath();
    ctx.arc(w * 0.2, h * 0.7, 50, 0, Math.PI * 2);
    ctx.fill();
    // Kraterler
    ctx.fillStyle = '#CCCCCC';
    ctx.beginPath();
    ctx.arc(w * 0.17, h * 0.67, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w * 0.24, h * 0.73, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w * 0.18, h * 0.75, 6, 0, Math.PI * 2);
    ctx.fill();

    // FARK 3: Sağda bayrak var
    if (showDiffs) {
      ctx.fillStyle = '#888';
      ctx.fillRect(w * 0.22, h * 0.58, 3, 35);
      ctx.fillStyle = '#FF0000';
      ctx.fillRect(w * 0.22, h * 0.58, 25, 15);
      // Yıldız
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.arc(w * 0.28, h * 0.64, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Roket
    ctx.fillStyle = '#E8E8E8';
    ctx.beginPath();
    ctx.moveTo(w * 0.5, h * 0.35);
    ctx.lineTo(w * 0.45, h * 0.55);
    ctx.lineTo(w * 0.55, h * 0.55);
    ctx.closePath();
    ctx.fill();
    // Roket gövdesi
    ctx.fillStyle = '#DC143C';
    ctx.fillRect(w * 0.46, h * 0.55, w * 0.08, h * 0.15);
    // Pencere
    ctx.fillStyle = '#87CEEB';
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.58, 8, 0, Math.PI * 2);
    ctx.fill();
    // Kanatlar
    ctx.fillStyle = '#DC143C';
    ctx.beginPath();
    ctx.moveTo(w * 0.46, h * 0.65);
    ctx.lineTo(w * 0.4, h * 0.72);
    ctx.lineTo(w * 0.46, h * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w * 0.54, h * 0.65);
    ctx.lineTo(w * 0.6, h * 0.72);
    ctx.lineTo(w * 0.54, h * 0.7);
    ctx.closePath();
    ctx.fill();
    // Alev
    ctx.fillStyle = '#FFA500';
    ctx.beginPath();
    ctx.moveTo(w * 0.47, h * 0.7);
    ctx.lineTo(w * 0.5, h * 0.8);
    ctx.lineTo(w * 0.53, h * 0.7);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.moveTo(w * 0.48, h * 0.7);
    ctx.lineTo(w * 0.5, h * 0.76);
    ctx.lineTo(w * 0.52, h * 0.7);
    ctx.closePath();
    ctx.fill();

    // FARK 4: Sağda roket alevi büyük
    if (showDiffs) {
      ctx.fillStyle = '#FF4500';
      ctx.beginPath();
      ctx.moveTo(w * 0.45, h * 0.7);
      ctx.lineTo(w * 0.5, h * 0.88);
      ctx.lineTo(w * 0.55, h * 0.7);
      ctx.closePath();
      ctx.fill();
    }

    // Uzaylı
    ctx.fillStyle = '#90EE90';
    ctx.beginPath();
    ctx.ellipse(w * 0.85, h * 0.6, 15, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    // Gözler
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(w * 0.83, h * 0.57, 5, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(w * 0.87, h * 0.57, 5, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    // Antenler
    ctx.strokeStyle = '#90EE90';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.83, h * 0.54);
    ctx.lineTo(w * 0.81, h * 0.48);
    ctx.moveTo(w * 0.87, h * 0.54);
    ctx.lineTo(w * 0.89, h * 0.48);
    ctx.stroke();
    ctx.fillStyle = '#90EE90';
    ctx.beginPath();
    ctx.arc(w * 0.81, h * 0.47, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w * 0.89, h * 0.47, 3, 0, Math.PI * 2);
    ctx.fill();

    // FARK 5: Sağda uzaylı gülüyor
    if (showDiffs) {
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(w * 0.85, h * 0.63, 6, 0.2, Math.PI - 0.2);
      ctx.stroke();
    }

    // UFO
    ctx.fillStyle = '#C0C0C0';
    ctx.beginPath();
    ctx.ellipse(w * 0.3, h * 0.2, 35, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#87CEEB';
    ctx.beginPath();
    ctx.ellipse(w * 0.3, h * 0.17, 15, 18, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    // Işıklar
    ctx.fillStyle = '#FFD700';
    [-20, 0, 20].forEach(offset => {
      ctx.beginPath();
      ctx.arc(w * 0.3 + offset, h * 0.22, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // FARK 6: Sağda UFO ışın yayıyor
    if (showDiffs) {
      ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';
      ctx.beginPath();
      ctx.moveTo(w * 0.27, h * 0.23);
      ctx.lineTo(w * 0.2, h * 0.4);
      ctx.lineTo(w * 0.4, h * 0.4);
      ctx.lineTo(w * 0.33, h * 0.23);
      ctx.closePath();
      ctx.fill();
    }

    // Küçük gezegen
    ctx.fillStyle = '#FF6347';
    ctx.beginPath();
    ctx.arc(w * 0.1, h * 0.4, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FF7F50';
    ctx.beginPath();
    ctx.arc(w * 0.08, h * 0.38, 5, 0, Math.PI * 2);
    ctx.fill();

    // FARK 7: Sağda gezegen yüzüğü var
    if (showDiffs) {
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(w * 0.1, h * 0.4, 30, 8, 0.3, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  // Sahneler
  const scenes: SceneData[] = [
    {
      name: '🏠 Mutlu Ev',
      bgGradient: ['#87CEEB', '#E0F4FF'],
      differences: [
        { id: 1, x: 0.85, y: 0.12, radius: 40, found: false }, // Güneş ışınları
        { id: 2, x: 0.35, y: 0.08, radius: 30, found: false }, // Ekstra bulut
        { id: 3, x: 0.63, y: 0.12, radius: 30, found: false }, // Duman (baca)
        { id: 4, x: 0.50, y: 0.55, radius: 25, found: false }, // Kapı kolu
        { id: 5, x: 0.37, y: 0.44, radius: 25, found: false }, // Perde
        { id: 6, x: 0.12, y: 0.40, radius: 35, found: false }, // Elma (ağaç)
        { id: 7, x: 0.24, y: 0.50, radius: 30, found: false }, // Kelebek
      ],
      drawScene: drawHouseScene,
    },
    {
      name: '🌊 Derin Deniz',
      bgGradient: ['#006994', '#001a33'],
      differences: [
        { id: 1, x: 0.85, y: 0.72, radius: 35, found: false }, // Ekstra yosun
        { id: 2, x: 0.40, y: 0.42, radius: 35, found: false }, // Kabarcıklar
        { id: 3, x: 0.35, y: 0.20, radius: 30, found: false }, // Turuncu balık (yok)
        { id: 4, x: 0.20, y: 0.90, radius: 30, found: false }, // Deniz yıldızı
        { id: 5, x: 0.64, y: 0.82, radius: 35, found: false }, // Mercan rengi
        { id: 6, x: 0.50, y: 0.10, radius: 30, found: false }, // Periskop
        { id: 7, x: 0.80, y: 0.84, radius: 30, found: false }, // Altın
      ],
      drawScene: drawUnderwaterScene,
    },
    {
      name: '🚀 Uzay Macerası',
      bgGradient: ['#1a1a3a', '#000011'],
      differences: [
        { id: 1, x: 0.15, y: 0.12, radius: 30, found: false }, // Parlak yıldız
        { id: 2, x: 0.75, y: 0.25, radius: 45, found: false }, // Halka rengi
        { id: 3, x: 0.25, y: 0.65, radius: 30, found: false }, // Bayrak
        { id: 4, x: 0.50, y: 0.82, radius: 35, found: false }, // Roket alevi
        { id: 5, x: 0.85, y: 0.60, radius: 30, found: false }, // Uzaylı gülüşü
        { id: 6, x: 0.30, y: 0.30, radius: 40, found: false }, // UFO ışını
        { id: 7, x: 0.10, y: 0.40, radius: 35, found: false }, // Gezegen yüzüğü
      ],
      drawScene: drawSpaceScene,
    },
  ];

  const currentScene = scenes[level % scenes.length];

  // Canvas çizimi
  useEffect(() => {
    const leftCanvas = leftCanvasRef.current;
    const rightCanvas = rightCanvasRef.current;
    if (!leftCanvas || !rightCanvas) return;

    const leftCtx = leftCanvas.getContext('2d');
    const rightCtx = rightCanvas.getContext('2d');
    if (!leftCtx || !rightCtx) return;

    // Sol canvas - orijinal
    currentScene.drawScene(leftCtx, leftCanvas.width, leftCanvas.height, false);
    
    // Sağ canvas - farklı
    currentScene.drawScene(rightCtx, rightCanvas.width, rightCanvas.height, true);

    // Bulunan farkları işaretle
    foundDifferences.forEach(id => {
      const diff = currentScene.differences.find(d => d.id === id);
      if (diff) {
        const x = diff.x * leftCanvas.width;
        const y = diff.y * leftCanvas.height;

        // Sol canvas
        leftCtx.strokeStyle = '#00FF00';
        leftCtx.lineWidth = 3;
        leftCtx.beginPath();
        leftCtx.arc(x, y, diff.radius, 0, Math.PI * 2);
        leftCtx.stroke();
        
        // Sağ canvas
        rightCtx.strokeStyle = '#00FF00';
        rightCtx.lineWidth = 3;
        rightCtx.beginPath();
        rightCtx.arc(x, y, diff.radius, 0, Math.PI * 2);
        rightCtx.stroke();

        // Tik işareti
        [leftCtx, rightCtx].forEach(ctx => {
          ctx.fillStyle = '#00FF00';
          ctx.font = 'bold 20px Arial';
          ctx.fillText('✓', x - 8, y + 6);
        });
      }
    });

    // İpucu göster
    if (showHint !== null) {
      const diff = currentScene.differences.find(d => d.id === showHint);
      if (diff && !foundDifferences.includes(showHint)) {
        const x = diff.x * leftCanvas.width;
        const y = diff.y * leftCanvas.height;

        [leftCtx, rightCtx].forEach(ctx => {
          ctx.strokeStyle = '#FFD700';
          ctx.lineWidth = 3;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.arc(x, y, diff.radius + 5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }
    }
  }, [currentScene, foundDifferences, showHint]);

  // Tıklama kontrolü - object-contain için düzeltilmiş koordinat hesaplama
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>, isRight: boolean) => {
    if (showWin) return;

    const canvas = e.currentTarget;
    const rect = canvas.getBoundingClientRect();
    
    // object-contain için gerçek çizim alanını hesapla
    const canvasAspect = canvas.width / canvas.height;
    const rectAspect = rect.width / rect.height;
    
    let renderWidth, renderHeight, offsetX, offsetY;
    
    if (rectAspect > canvasAspect) {
      // Container daha geniş, yükseklik sınırlayıcı
      renderHeight = rect.height;
      renderWidth = rect.height * canvasAspect;
      offsetX = (rect.width - renderWidth) / 2;
      offsetY = 0;
    } else {
      // Container daha dar, genişlik sınırlayıcı
      renderWidth = rect.width;
      renderHeight = rect.width / canvasAspect;
      offsetX = 0;
      offsetY = (rect.height - renderHeight) / 2;
    }
    
    // Tıklama pozisyonunu canvas koordinatlarına çevir
    const clickX = e.clientX - rect.left - offsetX;
    const clickY = e.clientY - rect.top - offsetY;
    
    // Render alanı dışındaysa ignore et
    if (clickX < 0 || clickX > renderWidth || clickY < 0 || clickY > renderHeight) {
      return;
    }
    
    const x = (clickX / renderWidth) * canvas.width;
    const y = (clickY / renderHeight) * canvas.height;

    // Fark kontrolü
    let found = false;
    for (const diff of currentScene.differences) {
      if (foundDifferences.includes(diff.id)) continue;

      const diffX = diff.x * canvas.width;
      const diffY = diff.y * canvas.height;
      const distance = Math.sqrt((x - diffX) ** 2 + (y - diffY) ** 2);

      if (distance <= diff.radius + 10) {
        setFoundDifferences([...foundDifferences, diff.id]);
        setScore(prev => prev + 15);
        playSuccess();
        found = true;

        // Tümü bulundu mu?
        if (foundDifferences.length + 1 >= 7) {
          setTimeout(() => {
            setShowWin(true);
            playWin();
          }, 500);
        }
        break;
      }
    }

    if (!found) {
      setWrongClick({ x, y, side: isRight ? 'right' : 'left' });
      playError();
      setTimeout(() => setWrongClick(null), 500);
    }
  };

  // İpucu
  const giveHint = () => {
    if (hintUsed) return;
    const notFound = currentScene.differences.find(d => !foundDifferences.includes(d.id));
    if (notFound) {
      setShowHint(notFound.id);
      setHintUsed(true);
      setTimeout(() => setShowHint(null), 3000);
    }
  };

  // Sonraki seviye
  const nextLevel = () => {
    setLevel(prev => prev + 1);
    setFoundDifferences([]);
    setShowWin(false);
    setHintUsed(false);
    setShowHint(null);
  };

  // Yeniden başla
  const restart = () => {
    setFoundDifferences([]);
    setShowWin(false);
    setHintUsed(false);
    setShowHint(null);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-2 z-10">
        <button
          onClick={onBack}
          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-transform"
        >
          <ArrowLeftIcon className="w-5 h-5 text-white" />
        </button>
        <div className="text-center">
          <h1 className="text-base font-bold text-white">{currentScene.name}</h1>
          <p className="text-white/70 text-xs">Seviye {level + 1}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-white font-bold text-sm">⭐ {score}</span>
        </div>
      </div>

      {/* Fark sayacı */}
      <div className="flex justify-center gap-1.5 py-2">
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <div
            key={i}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              foundDifferences.includes(i)
                ? 'bg-green-500 text-white scale-110'
                : 'bg-white/20 text-white/60'
            }`}
          >
            {foundDifferences.includes(i) ? '✓' : i}
          </div>
        ))}
      </div>

      {/* Resimler - Yan yana */}
      <div className="flex-1 flex gap-2 px-2 pb-2 min-h-0">
        {/* Sol resim */}
        <div className="flex-1 relative">
          <div className="absolute top-1 left-1 bg-black/50 px-2 py-0.5 rounded text-white text-xs font-medium z-10">
            Orijinal
          </div>
          <canvas
            ref={leftCanvasRef}
            width={400}
            height={320}
            onClick={(e) => handleCanvasClick(e, false)}
            className="w-full h-full object-contain rounded-xl shadow-lg cursor-crosshair"
          />
          {wrongClick && wrongClick.side === 'left' && (
            <div
              className="absolute w-8 h-8 border-4 border-red-500 rounded-full animate-ping pointer-events-none"
              style={{
                left: `${(wrongClick.x / 400) * 100}%`,
                top: `${(wrongClick.y / 320) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}
        </div>

        {/* Sağ resim */}
        <div className="flex-1 relative">
          <div className="absolute top-1 right-1 bg-black/50 px-2 py-0.5 rounded text-white text-xs font-medium z-10">
            7 Fark
          </div>
          <canvas
            ref={rightCanvasRef}
            width={400}
            height={320}
            onClick={(e) => handleCanvasClick(e, true)}
            className="w-full h-full object-contain rounded-xl shadow-lg cursor-crosshair"
          />
          {wrongClick && wrongClick.side === 'right' && (
            <div
              className="absolute w-8 h-8 border-4 border-red-500 rounded-full animate-ping pointer-events-none"
              style={{
                left: `${(wrongClick.x / 400) * 100}%`,
                top: `${(wrongClick.y / 320) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}
        </div>
      </div>

      {/* Alt butonlar */}
      <div className="flex justify-center gap-3 p-3 bg-black/20">
        <button
          onClick={giveHint}
          disabled={hintUsed}
          className="px-4 py-2 bg-yellow-500/80 rounded-xl text-white font-semibold text-sm disabled:opacity-40"
        >
          💡 İpucu
        </button>
        <button
          onClick={restart}
          className="px-4 py-2 bg-gray-600/80 rounded-xl text-white font-semibold text-sm"
        >
          🔄 Yeniden
        </button>
      </div>

      {/* Kazanma ekranı */}
      {showWin && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 mx-4 text-center shadow-2xl animate-bounce-in">
            <div className="text-6xl mb-3">🎉</div>
            <h2 className="text-2xl font-black text-gray-800 mb-2">Tebrikler!</h2>
            <p className="text-gray-600 mb-1">7 farkın tamamını buldun!</p>
            <p className="text-green-600 font-bold mb-4">+105 puan ⭐</p>
            <button
              onClick={nextLevel}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 rounded-xl active:scale-95 transition-transform"
            >
              Sonraki Sahne →
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes bounce-in {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
};

export default SevenDifferencesScreen;
