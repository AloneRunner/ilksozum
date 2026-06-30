import React, { useRef, useEffect, useState, useCallback } from 'react';
import { t } from '../../i18n/index.ts';

interface SheepGameScreenProps {
  onBack: () => void;
}

// Yün parçacığı
interface WoolParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  grounded: boolean; // Yere düştü mü?
}

const SheepGameScreen: React.FC<SheepGameScreenProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number>(0);

  const [progress, setProgress] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [woolParticles, setWoolParticles] = useState<WoolParticle[]>([]);
  const [collectedWool, setCollectedWool] = useState(0);
  const [sheepMood, setSheepMood] = useState<'normal' | 'happy' | 'excited'>('normal');
  const [scissorAngle, setScissorAngle] = useState(0);
  const lastCutPosRef = useRef({ x: 0, y: 0 });

  // Ses
  const playSound = useCallback((type: 'snip' | 'bleat' | 'success' | 'collect') => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;

      if (type === 'snip') {
        // Makas sesi - keskin "şık şık"
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(2000, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.03);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'bleat') {
        // Koyun sesi
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.linearRampToValueAtTime(350, now + 0.15);
        osc.frequency.linearRampToValueAtTime(250, now + 0.4);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'success') {
        [523, 659, 784, 1047].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.15, now + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.12);
          osc.stop(now + i * 0.12 + 0.25);
        });
      } else if (type === 'collect') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = 600 + Math.random() * 200;
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch (e) {
      console.log('Audio error:', e);
    }
  }, []);

  // Oyunu başlat
  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // MEGA FLUFFY WOOL - Koyuna tam oturan şekil
    const drawMegaFluffyWool = () => {
      ctx.save();

      // Gölge
      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetY = 10;

      // Ana şekil - KOYUNUN VÜCUDUNU TAM SARAN BALONCUKLAR
      ctx.beginPath();

      // Koyunun vücudu: width 240, height 200
      // Merkezden çiziyoruz.
      // Elips şeklinde bir bulut oluşturuyoruz

      const bodyWidth = 240;
      const bodyHeight = 200;
      // KÜÇÜLTME: Kenar payını düşürüyoruz, hatta biraz içeriden başlasın ki taşmasın
      // Önceki hali: +20 margin -> Taşmaya neden oldu
      // Yeni hali: -10 margin -> Tam oturması için
      const insetMargin = 10;

      const woolWidth = (bodyWidth / 2) - insetMargin;
      const woolHeight = (bodyHeight / 2) - insetMargin;

      // Tam elips çizelim - OPAK BEYAZ/KREM
      ctx.fillStyle = '#FFF8E7';
      ctx.ellipse(cx, cy, woolWidth, woolHeight, 0, 0, Math.PI * 2);
      ctx.fill();

      // Kenarlara küçük daireler ekleyerek "bulut" efekti verelim
      const numFluffs = 28; // Adet makul
      for (let i = 0; i < numFluffs; i++) {
        const angle = (i / numFluffs) * Math.PI * 2;
        // Kenarlara tam otursun, çok taşmasın
        const x = cx + Math.cos(angle) * (woolWidth - 5);
        const y = cy + Math.sin(angle) * (woolHeight - 5);
        const r = 20; // Kabarık toplar

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = '#FFF8E7';
        ctx.fill();

        // Bir tane de hafif dışarıda (doğallık için, ama çok değil)
        if (i % 2 === 0) {
          const x2 = cx + Math.cos(angle) * (woolWidth + 2);
          const y2 = cy + Math.sin(angle) * (woolHeight + 2);
          ctx.beginPath();
          ctx.arc(x2, y2, 12, 0, Math.PI * 2);
          // Hafif gölgeli
          const grad2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, 12);
          grad2.addColorStop(0, '#FFFFFF');
          grad2.addColorStop(1, '#F0E6D2');
          ctx.fillStyle = grad2;
          ctx.fill();
        }
      }

      // Gradyan dolgu
      const gradient = ctx.createRadialGradient(cx - 30, cy - 30, 0, cx, cy, woolWidth + 10);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.5, 'rgba(255, 248, 231, 0.6)');
      gradient.addColorStop(1, 'rgba(232, 224, 200, 0.4)');

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();

      // İÇ DOKU - Opak noktalar (Bulut gibi)
      const innerW = woolWidth - 15;
      const innerH = woolHeight - 15;

      for (let i = 0; i < 350; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random());

        const x = cx + r * Math.cos(angle) * innerW;
        const y = cy + r * Math.sin(angle) * innerH;
        const size = 8 + Math.random() * 12;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        const shade = 245 + Math.random() * 10;
        ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade - 5})`;
        ctx.fill();
      }

      // Parlak noktalar
      for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random());
        const x = cx + r * Math.cos(angle) * (innerW - 5);
        const y = cy + r * Math.sin(angle) * (innerH - 5);

        ctx.beginPath();
        ctx.arc(x, y, 2 + Math.random() * 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
      }
    };

    drawMegaFluffyWool();

    setProgress(0);
    setIsWon(false);
    setSheepMood('normal');
    setWoolParticles([]);
    setCollectedWool(0);

    setTimeout(() => playSound('bleat'), 500);
  }, [playSound]);

  useEffect(() => {
    const timer = setTimeout(initGame, 200);
    return () => clearTimeout(timer);
  }, [initGame]);

  // Parçacık animasyonu
  useEffect(() => {
    const floorY = window.innerHeight - 80;

    const animate = () => {
      setWoolParticles(prev => {
        let collected = 0;
        const updated = prev.map(p => {
          if (p.grounded) {
            // Yere düşen yün yavaşça kaybolur ve toplanır
            if (p.opacity > 0.3 && Math.random() > 0.98) {
              collected++;
              return { ...p, opacity: p.opacity - 0.1 };
            }
            return { ...p, opacity: p.opacity - 0.002 };
          }

          const newY = p.y + p.vy;
          const newVy = p.vy + 0.4; // Yerçekimi

          if (newY > floorY) {
            // Yere düştü!
            return {
              ...p,
              y: floorY,
              vy: 0,
              vx: 0,
              grounded: true
            };
          }

          return {
            ...p,
            x: p.x + p.vx,
            y: newY,
            vy: newVy,
            vx: p.vx * 0.98,
            rotation: p.rotation + p.rotationSpeed,
            opacity: p.opacity - 0.003
          };
        }).filter(p => p.opacity > 0);

        if (collected > 0) {
          setCollectedWool(c => c + collected);
        }

        return updated;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [playSound]);

  // Makas animasyonu
  useEffect(() => {
    if (isCutting) {
      const interval = setInterval(() => {
        setScissorAngle(a => (a === 0 ? 15 : 0));
      }, 80);
      return () => clearInterval(interval);
    } else {
      setScissorAngle(0);
    }
  }, [isCutting]);

  // Kesme işlemi
  const performCut = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isWon) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Hareket mesafesi kontrolü (daha tatmin edici kesim için)
    const dx = x - lastCutPosRef.current.x;
    const dy = y - lastCutPosRef.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 5) return; // Çok yakınsa kesme
    lastCutPosRef.current = { x, y };

    // BÜYÜK kesme yarıçapı
    const cutRadius = 35;

    ctx.globalCompositeOperation = 'destination-out';
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, cutRadius);
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.6, 'rgba(0,0,0,0.9)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.arc(x, y, cutRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // DAHA FAZLA yün parçacığı
    if (Math.random() > 0.3) {
      const newParticles: WoolParticle[] = [];
      const count = 3 + Math.floor(Math.random() * 4);

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 3 + Math.random() * 5;
        newParticles.push({
          id: Date.now() + Math.random(),
          x: clientX + (Math.random() - 0.5) * 30,
          y: clientY + (Math.random() - 0.5) * 30,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          size: 12 + Math.random() * 18,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 15,
          opacity: 1,
          grounded: false
        });
      }
      setWoolParticles(prev => [...prev, ...newParticles].slice(-80));
    }

    // Makas sesi
    if (Math.random() > 0.7) {
      playSound('snip');
    }

    // İlerleme kontrolü
    checkProgress(ctx, canvas.width, canvas.height);
  }, [isWon, playSound]);

  // İlerleme kontrolü
  const checkProgress = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const margin = 50;
    const imgData = ctx.getImageData(margin, margin, w - margin * 2, h - margin * 2);
    const data = imgData.data;
    let visiblePixels = 0;

    for (let i = 3; i < data.length; i += 60) {
      if (data[i] > 30) visiblePixels++;
    }

    const totalSampled = data.length / 60;
    const initialEstimate = totalSampled * 0.4;
    const remaining = visiblePixels / initialEstimate;
    // Daha sıkı kontrol: %99.8 üzeri
    const p = Math.min(100, Math.max(0, (1 - remaining) * 100));

    setProgress(p);

    if (p > 25 && p < 60) setSheepMood('happy');
    else if (p >= 60) setSheepMood('excited');

    if (p > 35 && p < 40) playSound('bleat');

    // KESİNLİKLE %100 OLMADAN BİTMEZ
    if (p >= 99.8 && !isWon) {
      // SON DOKUNUŞ: Kalan o minik parçayı da biz temizleyelim ki görsel kusursuz olsun
      ctx.clearRect(0, 0, w, h);

      setIsWon(true);
      setProgress(100);
      playSound('success');
      setTimeout(() => playSound('bleat'), 600);
    }
  }, [isWon, playSound]);

  // Pointer olayları
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isWon) return;
    e.preventDefault();
    setIsCutting(true);
    lastCutPosRef.current = { x: e.clientX, y: e.clientY };

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    performCut(e.clientX, e.clientY);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [isWon, performCut]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }

    if (!isCutting || isWon) return;
    e.preventDefault();
    performCut(e.clientX, e.clientY);
  }, [isCutting, isWon, performCut]);

  const handlePointerUp = useCallback(() => {
    setIsCutting(false);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden select-none" style={{ touchAction: 'none' }}>
      {/* Arka plan - çayır */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #87CEEB 0%, #98D8C8 25%, #7CB342 55%, #558B2F 100%)'
        }}
      />

      {/* Güneş */}
      <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-yellow-300 shadow-lg"
        style={{ boxShadow: '0 0 60px 20px rgba(255,220,100,0.5)' }} />

      {/* Bulutlar */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/70"
            style={{
              left: `${5 + i * 22}%`,
              top: `${8 + (i % 2) * 6}%`,
              fontSize: `${50 + (i % 3) * 15}px`,
              animation: `floatCloud ${12 + i * 2}s ease-in-out infinite`
            }}
          >
            ☁️
          </div>
        ))}
      </div>

      {/* Çiçekler + Yün toplama alanı */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-800/50 to-transparent" />
        <div className="flex items-end justify-around px-4 h-full pb-2">
          {['🌸', '🌼', '🌷', '🌻', '🌸', '🌼', '🌷', '🌻'].map((flower, i) => (
            <div key={i} className="text-2xl" style={{ animation: `gentleSway ${3 + i * 0.2}s ease-in-out infinite` }}>
              {flower}
            </div>
          ))}
        </div>
      </div>

      {/* Başlık */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3">
        <button onClick={onBack} className="p-3 rounded-full bg-white/90 shadow-lg">
          <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <h1 className="text-xl font-bold text-white drop-shadow-lg">
          🐑 {t('miniGames.sheepShearing.title', 'Koyun Kırkma')}
        </h1>

        <button onClick={initGame} className="p-3 rounded-full bg-white/90 shadow-lg">
          <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* İlerleme + Toplanan Yün */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 w-72">
        <div className="bg-white/40 backdrop-blur rounded-2xl p-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold drop-shadow">✂️ %{Math.round(progress)}</span>
            <span className="text-white font-bold drop-shadow">🧶 {collectedWool}</span>
          </div>
          <div className="bg-white/30 rounded-full h-4 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${progress}%`,
                background: progress < 40 ? '#FFC107' : progress < 70 ? '#8BC34A' : '#4CAF50'
              }}
            />
          </div>
        </div>
      </div>

      {/* Koyun (alt katman) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className={`relative transition-all duration-300 ${isWon ? 'animate-bounce' : ''}`}>
          {/* Vücut - Pembe */}
          <div
            className="relative rounded-[45%] shadow-2xl"
            style={{
              width: 240,
              height: 200,
              background: 'linear-gradient(145deg, #FFCCBC 0%, #FFAB91 100%)',
              animation: sheepMood === 'happy' ? 'wiggle 0.4s ease-in-out infinite' :
                sheepMood === 'excited' ? 'wiggle 0.2s ease-in-out infinite' : 'none'
            }}
          >
            {/* Bacaklar */}
            <div className="absolute bg-gray-800 rounded-full" style={{ bottom: -20, left: 30, width: 18, height: 40 }} />
            <div className="absolute bg-gray-800 rounded-full" style={{ bottom: -20, left: 60, width: 18, height: 40 }} />
            <div className="absolute bg-gray-800 rounded-full" style={{ bottom: -20, right: 30, width: 18, height: 40 }} />
            <div className="absolute bg-gray-800 rounded-full" style={{ bottom: -20, right: 60, width: 18, height: 40 }} />

            {/* Kuyruk */}
            <div
              className="absolute bg-pink-200 rounded-full"
              style={{ right: -12, top: '45%', width: 25, height: 25, animation: 'wiggle 0.25s ease-in-out infinite' }}
            />
          </div>

          {/* Kafa */}
          <div
            className="absolute flex flex-col items-center justify-center"
            style={{
              width: 110,
              height: 130,
              left: -60,
              top: 30,
              background: 'linear-gradient(145deg, #4A4A4A 0%, #2D2D2D 100%)',
              borderRadius: '45% 45% 40% 40%',
              border: '4px solid #FFAB91'
            }}
          >
            {/* Gözler */}
            <div className="flex gap-4 -mt-2">
              {[0, 1].map(i => (
                <div key={i} className="bg-white rounded-full flex items-center justify-center shadow-inner" style={{ width: 24, height: 24 }}>
                  <div className="bg-black rounded-full" style={{ width: 10, height: 10 }} />
                </div>
              ))}
            </div>

            {/* Kulaklar */}
            <div className="absolute bg-gray-700 rounded-full" style={{ top: 0, left: 5, width: 35, height: 18, transform: 'rotate(-25deg)' }} />
            <div className="absolute bg-gray-700 rounded-full" style={{ top: 0, right: 5, width: 35, height: 18, transform: 'rotate(25deg)' }} />

            {/* Ağız - Emoji yerine basit çizgi */}
            {sheepMood === 'happy' && (
              <div className="mt-4 w-4 h-2 border-b-2 border-black/50 rounded-full" />
            )}
            {sheepMood === 'excited' && (
              <div className="mt-4 w-4 h-3 border-b-4 border-black/50 rounded-full" />
            )}
          </div>
        </div>
      </div>

      {/* Yün katmanı (Canvas) */}
      <div ref={containerRef} className="absolute inset-0 z-20">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ cursor: 'none' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        />
      </div>

      {/* Makas imleci - AÇILIP KAPANAN */}
      <div
        className="absolute pointer-events-none z-30 transition-transform duration-50"
        style={{
          left: cursorPos.x - 25,
          top: cursorPos.y - 25,
          transform: `rotate(-45deg)`
        }}
      >
        <div className="relative w-12 h-12">
          {/* Sol makas kanadı */}
          <div
            className="absolute w-6 h-3 bg-gray-400 rounded-full origin-right"
            style={{
              right: '50%',
              top: '40%',
              transform: `rotate(${-scissorAngle}deg)`,
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)'
            }}
          >
            <div className="absolute right-0 top-0 w-4 h-3 bg-red-500 rounded-full" />
          </div>
          {/* Sağ makas kanadı */}
          <div
            className="absolute w-6 h-3 bg-gray-400 rounded-full origin-right"
            style={{
              right: '50%',
              top: '50%',
              transform: `rotate(${scissorAngle}deg)`,
              boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.3)'
            }}
          >
            <div className="absolute right-0 bottom-0 w-4 h-3 bg-red-500 rounded-full" />
          </div>
          {/* Vida */}
          <div className="absolute w-3 h-3 bg-gray-600 rounded-full" style={{ left: '45%', top: '42%' }} />
        </div>
      </div>

      {/* Yün parçacıkları */}
      {woolParticles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none z-25"
          style={{
            left: p.x - p.size / 2,
            top: p.y - p.size / 2,
            width: p.size,
            height: p.size,
            backgroundColor: '#FFF8E7',
            opacity: p.opacity,
            transform: `rotate(${p.rotation}deg)`,
            boxShadow: p.grounded ? 'none' : '0 3px 6px rgba(0,0,0,0.15)'
          }}
        />
      ))}

      {/* Kazanma ekranı - KOYUNUN ÜSTÜNE GELMEYECEK ŞEKİLDE AYARLANDI */}
      {isWon && (
        <div className="absolute top-24 left-0 right-0 z-50 flex justify-center pointer-events-auto">
          <div className="bg-white/95 backdrop-blur rounded-2xl p-4 px-8 text-center shadow-2xl animate-bounce-in border-4 border-green-400">
            <div className="text-4xl mb-2">✨ MÜKEMMEL! ✨</div>
            <h2 className="text-xl font-bold text-green-600 mb-1">
              Koyun Tertemiz Oldu!
            </h2>
            <p className="text-lg font-bold text-amber-600 mb-3">Toplam: {collectedWool} yumak yün 🧶</p>
            <button
              onClick={initGame}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg transition-all text-lg hover:scale-105 active:scale-95"
            >
              🔄 Tekrar Oyna
            </button>
          </div>
        </div>
      )}

      {/* Animasyonlar */}
      <style>{`
        @keyframes floatCloud {
          0%, 100% { transform: translateX(0) translateY(0); }
          50% { transform: translateX(20px) translateY(-10px); }
        }
        @keyframes gentleSway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-2deg) scale(1); }
          50% { transform: rotate(2deg) scale(1.02); }
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

export default SheepGameScreen;
