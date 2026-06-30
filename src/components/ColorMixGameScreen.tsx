import React, { useState, useRef, useEffect, useCallback } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';

interface ColorMixGameScreenProps {
  onBack: () => void;
}

// Parçacık (kabarcık) tipi
interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  life: number;
  maxLife: number;
}

// Hedef renkler - RYB modeline uygun RGB değerleri ve ipuçları
const TARGETS = [
  { name: 'Mor', r: 128, g: 25, b: 128, hint: '🔴 Kırmızı + 🔵 Mavi eşit karıştır' },
  { name: 'Turuncu', r: 255, g: 128, b: 0, hint: '🔴 Çok Kırmızı + 🟡 biraz Sarı ekle' },
  { name: 'Yeşil', r: 55, g: 178, b: 128, hint: '🟡 Sarı + 🔵 Mavi eşit karıştır' },
  { name: 'Pembe', r: 200, g: 80, b: 100, hint: '🔴 Çok Kırmızı + 🔵 çok az Mavi' },
  { name: 'Turkuaz', r: 85, g: 185, b: 170, hint: '🔵 Çok Mavi + 🟡 biraz Sarı ekle' },
];

const ColorMixGameScreen: React.FC<ColorMixGameScreenProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [level, setLevel] = useState(0);
  // RYB model - Kırmızı, Sarı, Mavi (boya karıştırma modeli)
  const [amounts, setAmounts] = useState({ red: 0, yellow: 0, blue: 0, total: 0 });
  const [completed, setCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [pouring, setPouring] = useState<'r' | 'y' | 'b' | null>(null);
  const [score, setScore] = useState(0);

  const animationRef = useRef<number>();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const liquidWobbleRef = useRef(0);
  const lastPourTimeRef = useRef(0);

  const target = TARGETS[level];

  // RYB'den RGB'ye dönüşüm fonksiyonu (boya karıştırma modeli)
  const rybToRgb = useCallback((red: number, yellow: number, blue: number): { r: number; g: number; b: number } => {
    // Normalize (0-1 arası)
    const total = red + yellow + blue;
    if (total === 0) return { r: 128, g: 128, b: 128 };

    const rNorm = red / total;
    const yNorm = yellow / total;
    const bNorm = blue / total;

    // Boya karıştırma kuralları (subtractive color mixing)
    // Saf renkler:
    // Kırmızı -> RGB(255, 0, 0)
    // Sarı -> RGB(255, 255, 0)
    // Mavi -> RGB(0, 100, 255)

    // İkincil renkler:
    // Turuncu (Kırmızı + Sarı) -> RGB(255, 128, 0)
    // Yeşil (Sarı + Mavi) -> RGB(0, 180, 0)
    // Mor (Kırmızı + Mavi) -> RGB(128, 0, 128)

    let r = 0, g = 0, b = 0;

    // Saf Kırmızı katkısı
    r += rNorm * 255;
    g += rNorm * 0;
    b += rNorm * 0;

    // Saf Sarı katkısı (parlak sarı!)
    r += yNorm * 255;
    g += yNorm * 255;
    b += yNorm * 0;

    // Saf Mavi katkısı
    r += bNorm * 0;
    g += bNorm * 100;
    b += bNorm * 255;

    // Karışım düzeltmeleri - ikincil renk oluşumu
    // Eğer sarı ve mavi varsa, yeşil oluşur
    const yellowBlue = Math.min(yNorm, bNorm);
    if (yellowBlue > 0) {
      // Sarı+Mavi = Yeşil azaltması
      r -= yellowBlue * 200; // Kırmızıyı düşür
      g += yellowBlue * 80;  // Yeşili artır
    }

    // Eğer kırmızı ve sarı varsa, turuncu oluşur
    const redYellow = Math.min(rNorm, yNorm);
    if (redYellow > 0) {
      g -= redYellow * 80; // Sarının yeşilini azalt
    }

    // Eğer kırmızı ve mavi varsa, mor oluşur
    const redBlue = Math.min(rNorm, bNorm);
    if (redBlue > 0) {
      g -= redBlue * 50; // Mavinin yeşilini azalt
    }

    // Clamp değerleri 0-255 arasında
    r = Math.max(0, Math.min(255, Math.round(r)));
    g = Math.max(0, Math.min(255, Math.round(g)));
    b = Math.max(0, Math.min(255, Math.round(b)));

    return { r, g, b };
  }, []);

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
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error('Audio error:', e);
    }
  }, []);

  // Dökme sesi - su sesi
  const playPourSound = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      // Beyaz gürültü benzeri ses - su akışı
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.2;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 600;
      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      source.start();
    } catch (e) {
      console.error('Pour sound error:', e);
    }
  }, []);

  // Kabarcık ekle
  const addBubbles = useCallback((beakerX: number, beakerW: number, fillY: number) => {
    for (let i = 0; i < 2; i++) {
      particlesRef.current.push({
        x: beakerX + 25 + Math.random() * (beakerW - 50),
        y: fillY + Math.random() * 30,
        radius: 2 + Math.random() * 5,
        speedY: -0.3 - Math.random() * 1.2,
        speedX: (Math.random() - 0.5) * 0.5,
        life: 80 + Math.random() * 60,
        maxLife: 140
      });
    }
    // Maksimum 60 kabarcık
    if (particlesRef.current.length > 60) {
      particlesRef.current = particlesRef.current.slice(-60);
    }
  }, []);

  // Canvas çizimi - 60 FPS
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const time = Date.now();

    // Arka plan - lab ortamı gradyanı
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#0f0c29');
    bgGrad.addColorStop(0.5, '#302b63');
    bgGrad.addColorStop(1, '#24243e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Parıldayan yıldızlar arka planda
    for (let i = 0; i < 15; i++) {
      const starX = (i * 73 + time * 0.01) % w;
      const starY = (i * 41) % (h * 0.4);
      const twinkle = Math.sin(time * 0.003 + i) * 0.5 + 0.5;
      ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.4})`;
      ctx.beginPath();
      ctx.arc(starX, starY, 1 + twinkle, 0, Math.PI * 2);
      ctx.fill();
    }

    // Masa/tezgah
    const tableGrad = ctx.createLinearGradient(0, h - 80, 0, h);
    tableGrad.addColorStop(0, '#5a5a7a');
    tableGrad.addColorStop(1, '#3a3a5a');
    ctx.fillStyle = tableGrad;
    ctx.fillRect(0, h - 80, w, 80);
    // Masa kenarı parlaklık
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, h - 80, w, 3);

    // Beaker (deney kabı) pozisyonu
    const beakerX = w / 2 - 75;
    const beakerY = 100;
    const beakerW = 150;
    const beakerH = 240;

    // Tüpler - basılı tutunca döker
    const tubes = [
      { color: '#ff3333', darkColor: '#cc0000', x: 25, label: 'K', type: 'r' as const },
      { color: '#ffff00', darkColor: '#ffdd00', x: w / 2 - 20, label: 'S', type: 'y' as const },
      { color: '#3388ff', darkColor: '#0055cc', x: w - 65, label: 'M', type: 'b' as const }
    ];

    tubes.forEach((tube, idx) => {
      const isPouring = pouring === tube.type;
      const tubeY = isPouring ? 15 : 20;
      const rotation = isPouring ? (idx === 0 ? 15 : idx === 2 ? -15 : 0) : 0;

      ctx.save();
      if (rotation !== 0) {
        ctx.translate(tube.x + 20, tubeY + 80);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.translate(-(tube.x + 20), -(tubeY + 80));
      }

      // Tüp gölgesi
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.beginPath();
      ctx.ellipse(tube.x + 20, h - 75, 18, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Tüp gövdesi - cam efekti
      const tubeGrad = ctx.createLinearGradient(tube.x, tubeY, tube.x + 40, tubeY);
      tubeGrad.addColorStop(0, 'rgba(200, 220, 255, 0.3)');
      tubeGrad.addColorStop(0.3, 'rgba(200, 220, 255, 0.1)');
      tubeGrad.addColorStop(0.7, 'rgba(200, 220, 255, 0.1)');
      tubeGrad.addColorStop(1, 'rgba(200, 220, 255, 0.25)');

      ctx.fillStyle = tubeGrad;
      ctx.strokeStyle = 'rgba(200, 220, 255, 0.5)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(tube.x, tubeY, 40, 90, [8, 8, 3, 3]);
      ctx.fill();
      ctx.stroke();

      // Tüp içi sıvı
      const liquidGrad = ctx.createLinearGradient(tube.x + 5, tubeY + 15, tube.x + 35, tubeY + 15);
      liquidGrad.addColorStop(0, tube.darkColor);
      liquidGrad.addColorStop(0.5, tube.color);
      liquidGrad.addColorStop(1, tube.darkColor);
      ctx.fillStyle = liquidGrad;
      ctx.beginPath();
      ctx.roundRect(tube.x + 5, tubeY + 15, 30, 65, 3);
      ctx.fill();

      // Sıvı üst yüzeyi - parlak
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.ellipse(tube.x + 20, tubeY + 18, 13, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Cam parlaklık şeridi
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.beginPath();
      ctx.roundRect(tube.x + 6, tubeY + 20, 6, 50, 2);
      ctx.fill();

      // Tüp ağzı
      ctx.strokeStyle = 'rgba(200, 220, 255, 0.7)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(tube.x + 20, tubeY + 5, 12, Math.PI, 0);
      ctx.stroke();

      ctx.restore();
    });

    // Dökme animasyonu - akış efekti
    if (pouring) {
      const tubeIndex = pouring === 'r' ? 0 : pouring === 'y' ? 1 : 2;
      const tube = tubes[tubeIndex];
      const tubeEndX = tube.x + 20;
      const tubeEndY = 110;

      // Akış yolu - eğri
      const targetX = beakerX + beakerW / 2;
      const targetY = beakerY + 40;

      // Ana akış çizgisi
      ctx.strokeStyle = tube.color;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tubeEndX, tubeEndY);

      // Dalgalanan akış
      const wobble1 = Math.sin(time * 0.015) * 8;
      const wobble2 = Math.sin(time * 0.02 + 1) * 5;

      ctx.bezierCurveTo(
        tubeEndX + wobble1, tubeEndY + 60,
        targetX + wobble2, targetY - 40,
        targetX, targetY
      );
      ctx.stroke();

      // İç parlaklık
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tubeEndX - 1, tubeEndY);
      ctx.bezierCurveTo(
        tubeEndX + wobble1 - 1, tubeEndY + 60,
        targetX + wobble2 - 1, targetY - 40,
        targetX - 1, targetY
      );
      ctx.stroke();

      // Sıçrama damlacıkları
      for (let i = 0; i < 5; i++) {
        const splashX = targetX + (Math.random() - 0.5) * 30;
        const splashY = targetY + Math.random() * 15;
        const splashR = 2 + Math.random() * 3;

        ctx.fillStyle = tube.color;
        ctx.beginPath();
        ctx.arc(splashX, splashY, splashR, 0, Math.PI * 2);
        ctx.fill();

        // Damla parlaklığı
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(splashX - splashR * 0.3, splashY - splashR * 0.3, splashR * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Beaker gölgesi
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.beginPath();
    ctx.ellipse(beakerX + beakerW / 2, h - 75, beakerW / 2 + 15, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Beaker çizimi - clip ile sıvıyı içinde tut
    ctx.save();

    // Beaker şekli path
    ctx.beginPath();
    ctx.moveTo(beakerX + 15, beakerY);
    ctx.lineTo(beakerX + 5, beakerY + beakerH);
    ctx.quadraticCurveTo(beakerX + 5, beakerY + beakerH + 20, beakerX + 30, beakerY + beakerH + 20);
    ctx.lineTo(beakerX + beakerW - 30, beakerY + beakerH + 20);
    ctx.quadraticCurveTo(beakerX + beakerW - 5, beakerY + beakerH + 20, beakerX + beakerW - 5, beakerY + beakerH);
    ctx.lineTo(beakerX + beakerW - 15, beakerY);
    ctx.closePath();
    ctx.clip();

    // Beaker iç arka plan
    ctx.fillStyle = 'rgba(100, 120, 150, 0.08)';
    ctx.fillRect(beakerX, beakerY, beakerW, beakerH + 25);

    // Sıvı çizimi
    if (amounts.total > 0) {
      const maxFill = beakerH - 30;
      const fillHeight = Math.min((amounts.total / 300) * maxFill, maxFill);
      const fillY = beakerY + beakerH - fillHeight;

      // Karışım rengi hesapla - RYB'den RGB'ye dönüştür
      const rgbColor = rybToRgb(amounts.red, amounts.yellow, amounts.blue);
      const r = rgbColor.r;
      const g = rgbColor.g;
      const b = rgbColor.b;

      // Çalkalanma efekti - dökme sırasında artar, durduğunda azalır
      if (pouring) {
        liquidWobbleRef.current = Math.min(liquidWobbleRef.current + 0.8, 12);
      } else {
        liquidWobbleRef.current *= 0.92;
        if (liquidWobbleRef.current < 0.1) liquidWobbleRef.current = 0;
      }

      // Sıvı gradient - daha parlak ve hafif
      const liquidGrad = ctx.createLinearGradient(beakerX, fillY, beakerX + beakerW, fillY + fillHeight);
      liquidGrad.addColorStop(0, `rgba(${Math.max(0, r - 5)}, ${Math.max(0, g - 5)}, ${Math.max(0, b - 5)}, 0.9)`);
      liquidGrad.addColorStop(0.3, `rgb(${r}, ${g}, ${b})`);
      liquidGrad.addColorStop(0.7, `rgb(${r}, ${g}, ${b})`);
      liquidGrad.addColorStop(1, `rgba(${Math.max(0, r - 8)}, ${Math.max(0, g - 8)}, ${Math.max(0, b - 8)}, 0.9)`);

      // Sinüs dalgası ile sıvı yüzeyi çiz
      ctx.fillStyle = liquidGrad;
      ctx.beginPath();
      ctx.moveTo(beakerX, beakerY + beakerH + 25);

      // Sol kenar
      ctx.lineTo(beakerX, fillY + 15);

      // Üst yüzey - sinüs dalgaları
      for (let x = beakerX; x <= beakerX + beakerW; x += 2) {
        // İki farklı frekanslı dalga birleştir
        const wave1 = Math.sin((x * 0.06) + (time * 0.004)) * liquidWobbleRef.current;
        const wave2 = Math.sin((x * 0.1) + (time * 0.006)) * (liquidWobbleRef.current * 0.4);
        const wave3 = Math.sin((x * 0.15) + (time * 0.008)) * (liquidWobbleRef.current * 0.2);
        const y = fillY + wave1 + wave2 + wave3;
        ctx.lineTo(x, y);
      }

      // Sağ kenar ve alt
      ctx.lineTo(beakerX + beakerW, fillY + 15);
      ctx.lineTo(beakerX + beakerW, beakerY + beakerH + 25);
      ctx.closePath();
      ctx.fill();

      // Sıvı yüzey parlaklığı
      ctx.fillStyle = `rgba(255, 255, 255, 0.12)`;
      ctx.beginPath();
      ctx.moveTo(beakerX + 15, fillY + 25);
      for (let x = beakerX + 15; x <= beakerX + 50; x += 2) {
        const wave = Math.sin((x * 0.06) + (time * 0.004)) * liquidWobbleRef.current * 0.6;
        ctx.lineTo(x, fillY + wave + 8);
      }
      ctx.lineTo(beakerX + 50, beakerY + beakerH);
      ctx.lineTo(beakerX + 15, beakerY + beakerH);
      ctx.closePath();
      ctx.fill();

      // Kabarcıkları ekle ve çiz
      if (pouring && time - lastPourTimeRef.current > 80) {
        addBubbles(beakerX, beakerW, fillY);
        lastPourTimeRef.current = time;
      }

      // Kabarcıkları güncelle ve çiz
      particlesRef.current = particlesRef.current.filter(p => {
        // Hareket
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time * 0.008 + p.x * 0.1) * 0.4;
        p.life--;

        // Yüzeye yaklaştıkça hızlan
        if (p.y < fillY + 20) {
          p.speedY *= 1.05;
        }

        if (p.life > 0 && p.y > fillY - 5) {
          const alpha = (p.life / p.maxLife) * 0.7;

          // Kabarcık gövdesi
          const bubbleGrad = ctx.createRadialGradient(
            p.x - p.radius * 0.3, p.y - p.radius * 0.3, 0,
            p.x, p.y, p.radius
          );
          bubbleGrad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.9})`);
          bubbleGrad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.3})`);
          bubbleGrad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.1})`);

          ctx.fillStyle = bubbleGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();

          // Kabarcık kenarı
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.4})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          return true;
        }
        return false;
      });
    }

    ctx.restore();

    // Beaker cam çerçevesi
    ctx.strokeStyle = 'rgba(180, 200, 230, 0.6)';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(beakerX + 15, beakerY);
    ctx.lineTo(beakerX + 5, beakerY + beakerH);
    ctx.quadraticCurveTo(beakerX + 5, beakerY + beakerH + 20, beakerX + 30, beakerY + beakerH + 20);
    ctx.lineTo(beakerX + beakerW - 30, beakerY + beakerH + 20);
    ctx.quadraticCurveTo(beakerX + beakerW - 5, beakerY + beakerH + 20, beakerX + beakerW - 5, beakerY + beakerH);
    ctx.lineTo(beakerX + beakerW - 15, beakerY);
    ctx.stroke();

    // Beaker ağız kenarı - kalın
    ctx.strokeStyle = 'rgba(200, 220, 255, 0.8)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(beakerX + 8, beakerY);
    ctx.lineTo(beakerX + beakerW - 8, beakerY);
    ctx.stroke();

    // Beaker sol cam parlaklık şeridi
    ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.beginPath();
    ctx.moveTo(beakerX + 18, beakerY + 15);
    ctx.lineTo(beakerX + 12, beakerY + beakerH - 15);
    ctx.lineTo(beakerX + 28, beakerY + beakerH - 15);
    ctx.lineTo(beakerX + 32, beakerY + 15);
    ctx.closePath();
    ctx.fill();

    // Ölçü çizgileri
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = 'bold 11px Arial';
    ctx.textAlign = 'right';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
      const y = beakerY + beakerH - (i * 42);
      ctx.beginPath();
      ctx.moveTo(beakerX + beakerW - 30, y);
      ctx.lineTo(beakerX + beakerW - 12, y);
      ctx.stroke();
      ctx.fillText(`${i * 60}`, beakerX + beakerW - 32, y + 4);
    }

    animationRef.current = requestAnimationFrame(draw);
  }, [amounts, pouring, addBubbles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 340;
      canvas.height = 420;
    }
    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  // Dökme başlat - basılı tut
  const startPouring = (color: 'r' | 'y' | 'b') => {
    if (completed || amounts.total >= 300) return;
    setPouring(color);
  };

  // Dökme durdur
  const stopPouring = () => {
    setPouring(null);
  };

  // Dökme sırasında sürekli renk ve ses ekle
  useEffect(() => {
    if (!pouring) return;

    const interval = setInterval(() => {
      playPourSound();

      setAmounts(prev => {
        if (prev.total >= 300) {
          setPouring(null);
          return prev;
        }

        // RYB boya modeli - her renk ayrı takip edilir
        if (pouring === 'y') {
          return {
            ...prev,
            yellow: prev.yellow + 1,
            total: prev.total + 1
          };
        }
        if (pouring === 'b') {
          return {
            ...prev,
            blue: prev.blue + 1,
            total: prev.total + 1
          };
        }
        // Kırmızı
        return {
          ...prev,
          red: prev.red + 1,
          total: prev.total + 1
        };
      });
    }, 60);

    return () => clearInterval(interval);
  }, [pouring, playPourSound]);

  // Kontrol et - tolerans ile
  const checkMix = () => {
    if (amounts.total === 0) return;

    // RYB'den RGB'ye dönüştür
    const rgb = rybToRgb(amounts.red, amounts.yellow, amounts.blue);
    const r = rgb.r;
    const g = rgb.g;
    const b = rgb.b;

    // Tolerans kontrolü - her kanal için daha geniş hata payı
    const tolerance = 70;
    const diffR = Math.abs(r - target.r);
    const diffG = Math.abs(g - target.g);
    const diffB = Math.abs(b - target.b);

    if (diffR < tolerance && diffG < tolerance && diffB < tolerance) {
      setCompleted(true);
      setScore(prev => prev + 20);
      // Başarı melodisi
      playSound(523, 0.15, 'sine');
      setTimeout(() => playSound(659, 0.15, 'sine'), 100);
      setTimeout(() => playSound(784, 0.15, 'sine'), 200);
      setTimeout(() => playSound(1047, 0.3, 'sine'), 300);
    } else {
      // Hata sesi
      playSound(200, 0.2, 'sawtooth');
      setTimeout(() => playSound(150, 0.3, 'sawtooth'), 100);
    }
  };

  // Sıfırla
  const reset = () => {
    setAmounts({ red: 0, yellow: 0, blue: 0, total: 0 });
    setCompleted(false);
    setShowHint(false);
    setPouring(null);
    particlesRef.current = [];
    liquidWobbleRef.current = 0;
    playSound(300, 0.1);
  };

  // Sonraki seviye
  const nextLevel = () => {
    if (level < TARGETS.length - 1) {
      setLevel(level + 1);
    } else {
      setLevel(0);
    }
    setAmounts({ red: 0, yellow: 0, blue: 0, total: 0 });
    setCompleted(false);
    setShowHint(false);
    setPouring(null);
    particlesRef.current = [];
    liquidWobbleRef.current = 0;
  };

  // Otomatik ilerleme - başarıdan 2.5 saniye sonra
  useEffect(() => {
    if (!completed) return;

    const timer = setTimeout(() => {
      nextLevel();
    }, 2500);

    return () => clearTimeout(timer);
  }, [completed]);

  // Mevcut karışım rengi - RYB'den RGB'ye
  const currentRgb = amounts.total > 0 ? rybToRgb(amounts.red, amounts.yellow, amounts.blue) : { r: 128, g: 128, b: 128 };
  const currentR = currentRgb.r;
  const currentG = currentRgb.g;
  const currentB = currentRgb.b;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-3 z-10">
        <button
          onClick={onBack}
          className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center active:scale-95 transition-transform shadow-lg"
        >
          <ArrowLeftIcon className="w-6 h-6 text-white" />
        </button>
        <div className="text-center">
          <h1 className="text-lg font-bold text-white drop-shadow-lg">🧪 Renk Laboratuvarı</h1>
          <p className="text-white/70 text-xs">Seviye {level + 1}/{TARGETS.length}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
          <span className="text-white font-bold text-sm">⭐ {score}</span>
        </div>
      </div>

      {/* Hedef ve mevcut karşılaştırma */}
      <div className="mx-3 bg-black/40 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-3 border border-white/10">
        <div className="flex-1 text-center">
          <p className="text-white/60 text-xs mb-1.5">🎯 Hedef</p>
          <div
            className="w-14 h-14 mx-auto rounded-xl border-3 border-white/40 shadow-lg"
            style={{
              backgroundColor: `rgb(${target.r}, ${target.g}, ${target.b})`,
              boxShadow: `0 0 8px rgba(${target.r}, ${target.g}, ${target.b}, 0.3)`
            }}
          />
          <p className="text-white text-sm font-bold mt-1.5">{target.name}</p>
        </div>

        <div className="text-white/60 text-3xl font-light">=</div>

        <div className="flex-1 text-center">
          <p className="text-white/60 text-xs mb-1.5">🧪 Karışımın</p>
          <div
            className="w-14 h-14 mx-auto rounded-xl border-3 border-white/40 shadow-lg transition-all duration-300"
            style={{
              backgroundColor: amounts.total > 0 ? `rgb(${currentR}, ${currentG}, ${currentB})` : '#333',
              boxShadow: amounts.total > 0 ? `0 0 8px rgba(${currentR}, ${currentG}, ${currentB}, 0.3)` : 'none'
            }}
          />
          <p className="text-white/60 text-xs mt-1.5">
            {amounts.total > 0 ? `${Math.round(amounts.total)} ml` : 'Boş'}
          </p>
        </div>
      </div>

      {/* İpucu */}
      {showHint && (
        <div className="mx-3 mt-2 bg-yellow-500/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-yellow-500/30 animate-pulse">
          <p className="text-yellow-300 text-sm text-center font-medium">💡 {target.hint}</p>
        </div>
      )}

      {/* Canvas - ana oyun alanı */}
      <div className="flex-1 flex justify-center items-center py-2 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="rounded-2xl shadow-2xl"
          style={{ maxHeight: '52vh', maxWidth: '95vw' }}
        />
      </div>

      {/* Kontrol paneli */}
      <div className="p-3 space-y-3 bg-black/30 backdrop-blur-sm border-t border-white/10">
        {/* Renk butonları - BASILI TUT */}
        <div className="flex justify-center gap-5">
          {/* Kırmızı */}
          <button
            onMouseDown={() => startPouring('r')}
            onMouseUp={stopPouring}
            onMouseLeave={stopPouring}
            onTouchStart={(e) => { e.preventDefault(); startPouring('r'); }}
            onTouchEnd={stopPouring}
            disabled={completed || amounts.total >= 300}
            className={`w-[72px] h-[72px] rounded-full border-4 shadow-xl transition-all duration-150 flex flex-col items-center justify-center
              ${pouring === 'r' ? 'scale-110 border-white ring-4 ring-red-400/50' : 'border-red-300 active:scale-95'}
              bg-gradient-to-b from-red-400 via-red-500 to-red-700 disabled:opacity-40`}
            style={{ touchAction: 'manipulation' }}
          >
            <span className="text-white font-black text-xl drop-shadow-lg">K</span>
            <span className="text-white/70 text-[10px] font-medium">Kırmızı</span>
          </button>

          {/* Sarı */}
          <button
            onMouseDown={() => startPouring('y')}
            onMouseUp={stopPouring}
            onMouseLeave={stopPouring}
            onTouchStart={(e) => { e.preventDefault(); startPouring('y'); }}
            onTouchEnd={stopPouring}
            disabled={completed || amounts.total >= 300}
            className={`w-[72px] h-[72px] rounded-full border-4 shadow-xl transition-all duration-150 flex flex-col items-center justify-center
              ${pouring === 'y' ? 'scale-110 border-white ring-4 ring-yellow-400/50' : 'border-yellow-200 active:scale-95'}
              bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-600 disabled:opacity-40`}
            style={{ touchAction: 'manipulation' }}
          >
            <span className="text-white font-black text-xl drop-shadow-lg">S</span>
            <span className="text-white/80 text-[10px] font-medium">Sarı</span>
          </button>

          {/* Mavi */}
          <button
            onMouseDown={() => startPouring('b')}
            onMouseUp={stopPouring}
            onMouseLeave={stopPouring}
            onTouchStart={(e) => { e.preventDefault(); startPouring('b'); }}
            onTouchEnd={stopPouring}
            disabled={completed || amounts.total >= 300}
            className={`w-[72px] h-[72px] rounded-full border-4 shadow-xl transition-all duration-150 flex flex-col items-center justify-center
              ${pouring === 'b' ? 'scale-110 border-white ring-4 ring-blue-400/50' : 'border-blue-300 active:scale-95'}
              bg-gradient-to-b from-blue-400 via-blue-500 to-blue-700 disabled:opacity-40`}
            style={{ touchAction: 'manipulation' }}
          >
            <span className="text-white font-black text-xl drop-shadow-lg">M</span>
            <span className="text-white/70 text-[10px] font-medium">Mavi</span>
          </button>
        </div>

        <p className="text-white/40 text-xs text-center">Renk eklemek için butona basılı tut 👆</p>

        {/* Alt butonlar */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setShowHint(!showHint)}
            className="px-4 py-2.5 bg-yellow-600/80 hover:bg-yellow-600 rounded-xl text-white font-semibold text-sm shadow-lg transition-all active:scale-95"
          >
            💡 İpucu
          </button>
          <button
            onClick={reset}
            className="px-4 py-2.5 bg-gray-600/80 hover:bg-gray-600 rounded-xl text-white font-semibold text-sm shadow-lg transition-all active:scale-95"
          >
            🔄 Sıfırla
          </button>
          {!completed ? (
            <button
              onClick={checkMix}
              disabled={amounts.total < 30}
              className="px-5 py-2.5 bg-green-500 hover:bg-green-400 rounded-xl text-white font-bold text-sm shadow-lg transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ✓ Kontrol
            </button>
          ) : (
            <button
              onClick={nextLevel}
              className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl text-white font-bold text-sm shadow-lg animate-pulse transition-all active:scale-95"
            >
              🎉 Sonraki →
            </button>
          )}
        </div>
      </div>

      {/* Başarı overlay */}
      {completed && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="text-center animate-bounce-in">
            <div className="text-7xl mb-3 animate-spin-slow">🎉</div>
            <p className="text-white text-3xl font-black drop-shadow-lg">Harika!</p>
            <p className="text-white/80 text-lg mt-1">{target.name} rengini buldun!</p>
            <p className="text-yellow-400 font-bold mt-2">+20 puan ⭐</p>
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
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ColorMixGameScreen;
