import { sayInstruction } from '../../utils/gameVoice.ts';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { t } from '../../i18n/index.ts';
import { getMutedState, speak } from '../../services/speechService.ts';
import { titret } from '../../utils/titresim.ts';

interface SheepGameScreenProps {
  onBack: () => void;
}

// Koyun Kırkma (Kaan bu oyunu seviyor, "çok daha güzel yap"):
// - Koyun SVG ile çizilir; yün canvas'ta, gövdeyi saran kıvırcık bulut olarak.
// - İlerleme gerçek yüne göre ölçülür (başta kalan yün piksel sayısı = %0).
// - Sırayla 4 koyun: beyaz, gri, kahverengi, kara koyun. Her biri sepete kendi renginde yumak bırakır.
// - Kafasına dokununca "meee". Konuşma az, ses ile üst üste binmez.

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
}

const KOYUNLAR = [
  { ad: 'beyaz koyun', ic: '#FFFFFF', dis: '#EFE6D2', kivrim: 'rgba(196,180,150,0.55)', yumak: '#F5EFE0' },
  { ad: 'gri koyun', ic: '#F1F2F4', dis: '#C9CDD3', kivrim: 'rgba(120,128,140,0.5)', yumak: '#C9CDD3' },
  { ad: 'kahverengi koyun', ic: '#E8CFA9', dis: '#B98E5E', kivrim: 'rgba(120,80,40,0.45)', yumak: '#C49A6C' },
  { ad: 'kara koyun', ic: '#6B6B73', dis: '#35353B', kivrim: 'rgba(20,20,24,0.6)', yumak: '#45454C' },
];

// Koyunun çizim ölçüleri (ölçek 1'de, koyun merkezine göre)
const GOVDE = { rx: 125, ry: 92, dx: 25, dy: 0 };   // gövde elipsi (merkez sağa kaydırılmış, kafa solda)
const BITIS = 92;                                    // yüzde: kalanı biz temizleriz (son pikselleri aratma)
const KESME_YARICAP = 34;

const SheepGameScreen: React.FC<SheepGameScreenProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number>(0);
  const ilkYunRef = useRef(1);
  const kesimSayacRef = useRef(0);
  const merkezRef = useRef({ x: 0, y: 0, s: 1 });
  const lastCutPosRef = useRef({ x: 0, y: 0 });
  const bittiRef = useRef(false);
  const gurultuRef = useRef<AudioBuffer | null>(null);
  const sonCitRef = useRef(0);

  const [koyunNo, setKoyunNo] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isCutting, setIsCutting] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [woolParticles, setWoolParticles] = useState<WoolParticle[]>([]);
  const [yumaklar, setYumaklar] = useState<string[]>([]);
  const [meee, setMeee] = useState(false);
  const [scissorAngle, setScissorAngle] = useState(0);
  const [olcek, setOlcek] = useState(1);

  const koyun = KOYUNLAR[koyunNo % KOYUNLAR.length];

  // --- Ses ---
  const playSound = useCallback((type: 'snip' | 'bleat' | 'success') => {
    if (getMutedState()) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const now = ctx.currentTime;
      if (type === 'snip') {
        // Makas "çıt": süzülmüş kısa gürültü (bıçakların sürtünmesi) + metalik tık
        if (!gurultuRef.current) {
          const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.08), ctx.sampleRate);
          const d = buf.getChannelData(0);
          for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
          gurultuRef.current = buf;
        }
        const kay = ctx.createBufferSource();
        kay.buffer = gurultuRef.current;
        kay.playbackRate.value = 0.9 + Math.random() * 0.25;
        const bant = ctx.createBiquadFilter();
        bant.type = 'bandpass'; bant.frequency.value = 3200 + Math.random() * 800; bant.Q.value = 1.2;
        const g1 = ctx.createGain();
        g1.gain.setValueAtTime(0.35, now);
        g1.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        kay.connect(bant); bant.connect(g1); g1.connect(ctx.destination);
        kay.start(now); kay.stop(now + 0.08);
        const tik = ctx.createOscillator();
        const g2 = ctx.createGain();
        tik.type = 'square';
        tik.frequency.setValueAtTime(2600, now + 0.045);
        g2.gain.setValueAtTime(0.0001, now);
        g2.gain.setValueAtTime(0.06, now + 0.045);
        g2.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
        tik.connect(g2); g2.connect(ctx.destination);
        tik.start(now); tik.stop(now + 0.08);
      } else if (type === 'bleat') {
        // "Meee": titreşimli (vibrato) koyun sesi
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const gain = ctx.createGain();
        const filtre = ctx.createBiquadFilter();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.linearRampToValueAtTime(370, now + 0.15);
        osc.frequency.linearRampToValueAtTime(300, now + 0.6);
        lfo.frequency.value = 22;
        lfoGain.gain.value = 18;
        lfo.connect(lfoGain); lfoGain.connect(osc.frequency);
        filtre.type = 'lowpass'; filtre.frequency.value = 1600;
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
        osc.connect(filtre); filtre.connect(gain); gain.connect(ctx.destination);
        osc.start(now); lfo.start(now);
        osc.stop(now + 0.7); lfo.stop(now + 0.7);
      } else if (type === 'success') {
        [523, 659, 784, 1047].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.13, now + i * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.25);
          osc.connect(gain); gain.connect(ctx.destination);
          osc.start(now + i * 0.12); osc.stop(now + i * 0.12 + 0.25);
        });
      }
    } catch { /* yoksay */ }
  }, []);

  useEffect(() => () => { audioContextRef.current?.close().catch(() => { /* yoksay */ }); }, []);

  const meele = useCallback(() => {
    playSound('bleat');
    setMeee(true);
    setTimeout(() => setMeee(false), 900);
  }, [playSound]);

  useEffect(() => {
    sayInstruction('Parmağını koyunun yününde gezdir.', 500);
  }, []);

  // Görünen yün pikseli say (seyrek örnekleme)
  const yunSay = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const data = ctx.getImageData(0, 0, w, h).data;
    let n = 0;
    for (let i = 3; i < data.length; i += 4 * 7) if (data[i] > 40) n++;
    return n;
  };

  // --- Yünü çiz ---
  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const w = container.clientWidth, h = container.clientHeight;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const s = Math.min(1, (w - 30) / 420);
    setOlcek(s);
    const cx = w / 2 + GOVDE.dx * s;
    const cy = h / 2 + 30 + GOVDE.dy * s;
    merkezRef.current = { x: w / 2, y: h / 2 + 30, s };
    const rx = GOVDE.rx * s, ry = GOVDE.ry * s;
    const renk = KOYUNLAR[koyunNo % KOYUNLAR.length];

    ctx.clearRect(0, 0, w, h);
    // Rastgele ama her seferinde aynı görünüm için basit tohum
    let tohum = 11 + koyunNo * 7;
    const rnd = () => (tohum = (tohum * 9301 + 49297) % 233280) / 233280;

    const top = (x: number, y: number, r: number) => {
      const g = ctx.createRadialGradient(x - r * 0.35, y - r * 0.35, r * 0.1, x, y, r);
      g.addColorStop(0, renk.ic);
      g.addColorStop(1, renk.dis);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    };
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.18)';
    ctx.shadowBlur = 18 * s;
    ctx.shadowOffsetY = 8 * s;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx * 0.92, ry * 0.9, 0, 0, Math.PI * 2);
    ctx.fillStyle = renk.dis;
    ctx.fill();
    ctx.restore();
    // Kenardaki kabarık toplar (bulut kenarı)
    const kenar = 30;
    for (let i = 0; i < kenar; i++) {
      const a = (i / kenar) * Math.PI * 2;
      top(cx + Math.cos(a) * rx * 0.86, cy + Math.sin(a) * ry * 0.84, (22 + rnd() * 8) * s);
    }
    // İç toplar (kıvırcık doku)
    for (let i = 0; i < 70; i++) {
      const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * 0.8;
      top(cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r, (16 + rnd() * 10) * s);
    }
    // Kıvrımlar
    ctx.strokeStyle = renk.kivrim;
    ctx.lineWidth = 2 * s;
    ctx.lineCap = 'round';
    for (let i = 0; i < 55; i++) {
      const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()) * 0.85;
      const x = cx + Math.cos(a) * rx * r, y = cy + Math.sin(a) * ry * r;
      ctx.beginPath();
      ctx.arc(x, y, (5 + rnd() * 4) * s, rnd() * Math.PI, rnd() * Math.PI + Math.PI * 1.3);
      ctx.stroke();
    }

    ilkYunRef.current = Math.max(1, yunSay(ctx, w, h));
    kesimSayacRef.current = 0;
    bittiRef.current = false;
    setProgress(0);
    setIsWon(false);
    setWoolParticles([]);
    setTimeout(() => playSound('bleat'), 500);
  }, [koyunNo, playSound]);

  useEffect(() => {
    const timer = setTimeout(initGame, 150);
    const onResize = () => { if (!bittiRef.current) initGame(); };
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(timer); window.removeEventListener('resize', onResize); };
  }, [initGame]);

  // --- Yün parçacıkları (yere süzülür, kaybolur) ---
  useEffect(() => {
    const animate = () => {
      setWoolParticles(prev => prev.length === 0 ? prev : prev.map(p => ({
        ...p,
        x: p.x + p.vx,
        y: p.y + p.vy,
        vy: Math.min(p.vy + 0.18, 2.2),        // yün hafif: yavaş süzülür
        vx: p.vx * 0.97,
        rotation: p.rotation + p.rotationSpeed,
        opacity: p.opacity - 0.008,
      })).filter(p => p.opacity > 0));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Makas açılıp kapanır
  useEffect(() => {
    if (!isCutting) { setScissorAngle(0); return; }
    const interval = setInterval(() => setScissorAngle(a => (a === 0 ? 18 : 0)), 90);
    return () => clearInterval(interval);
  }, [isCutting]);

  const bitir = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    bittiRef.current = true;
    ctx.clearRect(0, 0, w, h);
    setProgress(100);
    setIsWon(true);
    setYumaklar(y => [...y, KOYUNLAR[koyunNo % KOYUNLAR.length].yumak]);
    // Ses sırası: kutlama → meee → söz (üst üste binmesin)
    playSound('success');
    titret('orta', 0);
    setTimeout(() => meele(), 700);
    setTimeout(() => { speak('Koyun tertemiz oldu!').catch(() => { /* yoksay */ }); }, 1600);
  }, [koyunNo, playSound, meele]);

  const performCut = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || bittiRef.current) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const dx = x - lastCutPosRef.current.x;
    const dy = y - lastCutPosRef.current.y;
    if (Math.hypot(dx, dy) < 5) return;
    lastCutPosRef.current = { x, y };

    // Yün var mı? (boşlukta kesince parçacık/ses yok)
    const px = ctx.getImageData(Math.max(0, Math.min(canvas.width - 1, Math.round(x))), Math.max(0, Math.min(canvas.height - 1, Math.round(y))), 1, 1).data[3];
    const r = KESME_YARICAP * merkezRef.current.s + 6;
    ctx.globalCompositeOperation = 'destination-out';
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    gradient.addColorStop(0, 'rgba(0,0,0,1)');
    gradient.addColorStop(0.65, 'rgba(0,0,0,0.95)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    if (px > 40) {
      const yeni: WoolParticle[] = [];
      const count = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 2.5;
        yeni.push({
          id: Date.now() + Math.random(),
          x: x + (Math.random() - 0.5) * 24,
          y: y + (Math.random() - 0.5) * 24,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          size: 12 + Math.random() * 16,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          opacity: 1,
        });
      }
      setWoolParticles(prev => [...prev, ...yeni].slice(-60));
      // Kesim sürerken makasın açılıp kapanma ritminde "çıt çıt" + telefonda hafif titreşim (Kaan)
      const simdi = Date.now();
      if (simdi - sonCitRef.current > 150) {
        sonCitRef.current = simdi;
        playSound('snip');
        titret('hafif', 120);
      }
    }

    // İlerleme: her 4 kesimde bir ölç (getImageData pahalı)
    if (++kesimSayacRef.current % 4 === 0) {
      const kalan = yunSay(ctx, canvas.width, canvas.height);
      const p = Math.min(100, Math.max(0, (1 - kalan / ilkYunRef.current) * 100));
      setProgress(p);
      if (p >= BITIS) bitir(ctx, canvas.width, canvas.height);
    }
  }, [playSound, bitir]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (isWon) return;
    e.preventDefault();
    setIsCutting(true);
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      lastCutPosRef.current = { x: -999, y: -999 };
    }
    performCut(e.clientX, e.clientY);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [isWon, performCut]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) setCursorPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (!isCutting || isWon) return;
    e.preventDefault();
    performCut(e.clientX, e.clientY);
  }, [isCutting, isWon, performCut]);

  const handlePointerUp = useCallback(() => {
    setIsCutting(false);
    // Bırakınca bir kez daha ölç (son kesim sayılmamış olabilir)
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { willReadFrequently: true });
    if (!canvas || !ctx || bittiRef.current) return;
    const kalan = yunSay(ctx, canvas.width, canvas.height);
    const p = Math.min(100, Math.max(0, (1 - kalan / ilkYunRef.current) * 100));
    setProgress(p);
    if (p >= BITIS) bitir(ctx, canvas.width, canvas.height);
  }, [bitir]);

  const sonrakiKoyun = () => setKoyunNo(n => n + 1);

  const mutlu = isWon ? 'bitti' : progress > 50 ? 'gulumse' : 'normal';
  const s = olcek;

  return (
    <div className="fixed inset-0 overflow-hidden select-none" style={{ touchAction: 'none' }}>
      {/* Arka plan: gökyüzü + tepeler */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #8fd3f4 0%, #c2e9fb 38%, #a8e063 60%, #56ab2f 100%)' }} />
      <svg className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path d="M0 80 Q100 30 200 70 T400 60 V200 H0 Z" fill="#8bc34a" opacity="0.6" />
        <path d="M0 120 Q120 80 240 115 T400 105 V200 H0 Z" fill="#6aaa3a" />
      </svg>
      <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-yellow-300" style={{ boxShadow: '0 0 60px 20px rgba(255,220,100,0.5)' }} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="absolute text-white/80" style={{ left: `${5 + i * 25}%`, top: `${9 + (i % 2) * 6}%`, fontSize: `${46 + (i % 3) * 12}px`, animation: `floatCloud ${12 + i * 2}s ease-in-out infinite` }}>☁️</div>
        ))}
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-around px-4 pointer-events-none">
        {['🌼', '🌷', '🌸', '🌼', '🌷', '🌸'].map((f, i) => (
          <div key={i} className="text-2xl" style={{ animation: `gentleSway ${3 + i * 0.3}s ease-in-out infinite` }}>{f}</div>
        ))}
      </div>

      {/* Başlık */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3">
        <button onClick={onBack} className="p-3 rounded-full bg-white/90 shadow-lg" aria-label="Geri">
          <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-white drop-shadow-lg">🐑 {t('miniGames.sheepShearing.title', 'Koyun Kırkma')}</h1>
        <button onClick={initGame} className="p-3 rounded-full bg-white/90 shadow-lg" aria-label="Baştan">
          <svg className="w-6 h-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* İlerleme */}
      <div className="absolute top-[4.5rem] left-1/2 -translate-x-1/2 z-40 w-64">
        <div className="bg-white/50 backdrop-blur rounded-full p-1.5 shadow-lg">
          <div className="bg-white/60 rounded-full h-4 overflow-hidden">
            <div className="h-full rounded-full transition-all duration-200" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#fbbf24,#84cc16,#22c55e)' }} />
          </div>
        </div>
      </div>

      {/* KOYUN (yünün altında) */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{ transform: 'translateY(30px)' }}>
        <div className="absolute left-1/2 top-1/2" style={{ width: 400 * s, height: 320 * s, marginLeft: -200 * s, marginTop: -160 * s }}>
          <svg viewBox="-200 -160 400 320" width={400 * s} height={320 * s} className={isWon ? 'animate-[zipla_0.6s_ease-in-out_3]' : ''} style={{ overflow: 'visible' }}>
            <defs>
              <radialGradient id="ten" cx="45%" cy="40%" r="65%">
                <stop offset="0%" stopColor="#ffd9cf" />
                <stop offset="100%" stopColor="#f4a99b" />
              </radialGradient>
            </defs>
            {/* bacaklar */}
            {[-55, -15, 50, 90].map((x, i) => (
              <g key={i}>
                <rect x={x} y={55} width="20" height="62" rx="9" fill="#4b4b52" />
                <rect x={x - 2} y={106} width="24" height="13" rx="6" fill="#2a2a2f" />
              </g>
            ))}
            {/* gövde (kırkılınca görünen pembe ten) */}
            <ellipse cx={GOVDE.dx} cy={GOVDE.dy} rx={GOVDE.rx * 0.9} ry={GOVDE.ry * 0.86} fill="url(#ten)" />
            <ellipse cx={GOVDE.dx + 10} cy={GOVDE.dy + 40} rx={70} ry={22} fill="#f8b9ad" opacity="0.6" />
            {/* kuyruk */}
            <circle cx={GOVDE.dx + GOVDE.rx * 0.92} cy={-20} r="16" fill={koyun.ic} stroke={koyun.dis} strokeWidth="3" />
            {/* kafa */}
            <g transform="translate(-150,-30)" style={{ pointerEvents: 'auto', cursor: 'pointer' }} onPointerDown={(e) => { e.stopPropagation(); meele(); }}>
              <g className={meee ? 'animate-[sallan_0.3s_ease-in-out_3]' : ''} style={{ transformOrigin: '20px 30px' }}>
                {/* kulaklar */}
                <ellipse cx="-38" cy="-12" rx="26" ry="11" fill="#e9b6a8" transform="rotate(-25 -38 -12)" />
                <ellipse cx="-38" cy="-12" rx="16" ry="6" fill="#f7cfc4" transform="rotate(-25 -38 -12)" />
                <ellipse cx="44" cy="-14" rx="26" ry="11" fill="#e9b6a8" transform="rotate(25 44 -14)" />
                <ellipse cx="44" cy="-14" rx="16" ry="6" fill="#f7cfc4" transform="rotate(25 44 -14)" />
                {/* yüz */}
                <ellipse cx="3" cy="12" rx="44" ry="52" fill="#fbe3d6" />
                {/* kafadaki yün perçemi */}
                {[-24, -8, 8, 24].map((x, i) => <circle key={i} cx={x + 3} cy={-38 + (i % 2) * 4} r="15" fill={koyun.ic} stroke={koyun.dis} strokeWidth="2" />)}
                {/* gözler */}
                {mutlu === 'bitti' ? (
                  <>
                    <path d="M-20 6 q8 -9 16 0" stroke="#2a2a2f" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M10 6 q8 -9 16 0" stroke="#2a2a2f" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <circle cx="-12" cy="6" r="9" fill="#2a2a2f" /><circle cx="-9" cy="2" r="3.5" fill="#fff" />
                    <circle cx="18" cy="6" r="9" fill="#2a2a2f" /><circle cx="21" cy="2" r="3.5" fill="#fff" />
                  </>
                )}
                {/* yanaklar */}
                <ellipse cx="-24" cy="26" rx="8" ry="5" fill="#f59e8b" opacity={mutlu === 'normal' ? 0.35 : 0.8} />
                <ellipse cx="30" cy="26" rx="8" ry="5" fill="#f59e8b" opacity={mutlu === 'normal' ? 0.35 : 0.8} />
                {/* burun + ağız */}
                <ellipse cx="3" cy="36" rx="9" ry="6" fill="#e58b7c" />
                {meee ? (
                  <ellipse cx="3" cy="52" rx="8" ry="7" fill="#7a2f2f" />
                ) : (
                  <path d={mutlu === 'normal' ? 'M-5 50 q8 4 16 0' : 'M-9 48 q12 12 24 0'} stroke="#7a2f2f" strokeWidth="3.5" fill="none" strokeLinecap="round" />
                )}
              </g>
              {meee && <text x="-70" y="-60" fontSize="30" fontWeight="bold" fill="#fff" stroke="#6b7280" strokeWidth="1">Meee!</text>}
            </g>
          </svg>
        </div>
      </div>

      {/* Yün katmanı */}
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

      {/* Kafaya dokunma alanı yünün üstünde de çalışsın: canvas kafayı örtmüyor (kafa yünsüz) ama
          canvas üstte olduğu için kafa bölgesine şeffaf bir düğme konur */}
      <button
        aria-label="Koyunu sev"
        onPointerDown={(e) => { e.stopPropagation(); meele(); }}
        className="absolute z-30 rounded-full"
        style={{
          width: 100 * s, height: 110 * s,
          left: `calc(50% - ${(150 + 50) * s}px)`,
          top: `calc(50% + 30px - ${(30 + 55) * s}px)`,
          background: 'transparent',
        }}
      />

      {/* Makas imleci */}
      {!isWon && (
        <div className="absolute pointer-events-none z-30" style={{ left: cursorPos.x - 24, top: cursorPos.y - 24, transform: 'rotate(-45deg)' }}>
          <div className="relative w-12 h-12">
            <div className="absolute w-6 h-3 bg-gray-300 rounded-full origin-right" style={{ right: '50%', top: '40%', transform: `rotate(${-scissorAngle}deg)` }}>
              <div className="absolute right-0 top-0 w-4 h-3 bg-red-500 rounded-full" />
            </div>
            <div className="absolute w-6 h-3 bg-gray-300 rounded-full origin-right" style={{ right: '50%', top: '50%', transform: `rotate(${scissorAngle}deg)` }}>
              <div className="absolute right-0 bottom-0 w-4 h-3 bg-red-500 rounded-full" />
            </div>
            <div className="absolute w-3 h-3 bg-gray-600 rounded-full" style={{ left: '45%', top: '42%' }} />
          </div>
        </div>
      )}

      {/* Yün parçacıkları */}
      {woolParticles.map(p => (
        <div key={p.id} className="absolute rounded-full pointer-events-none z-[25]"
          style={{
            left: p.x - p.size / 2, top: p.y - p.size / 2, width: p.size, height: p.size,
            background: `radial-gradient(circle at 35% 35%, ${koyun.ic}, ${koyun.dis})`,
            opacity: p.opacity, transform: `rotate(${p.rotation}deg)`,
          }} />
      ))}

      {/* Yumak sepeti */}
      <div className="absolute z-40 bottom-12 right-3 flex flex-col items-center pointer-events-none">
        <div className="flex flex-wrap-reverse justify-center gap-0.5 w-24 min-h-[28px] px-1">
          {yumaklar.map((r, i) => (
            <svg key={i} width="26" height="26" viewBox="-13 -13 26 26" className="animate-[dus_0.6s_ease-out]">
              <circle r="12" fill={r} stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
              <path d="M-9 -4 q9 6 18 0 M-10 3 q10 6 20 0 M-5 -10 q-3 10 3 20" stroke="rgba(0,0,0,0.25)" strokeWidth="1.3" fill="none" />
            </svg>
          ))}
        </div>
        <div className="text-5xl -mt-2">🧺</div>
      </div>

      {/* Bitti */}
      {isWon && (
        <div className="absolute top-28 left-0 right-0 z-50 flex justify-center">
          <div className="bg-white/95 rounded-2xl p-4 px-6 text-center shadow-2xl animate-bounce-in border-4 border-green-400">
            <h2 className="text-2xl font-black text-green-600 mb-1">✨ Tertemiz oldu! ✨</h2>
            <p className="text-base font-bold text-amber-600 mb-3">Sepete bir yumak düştü 🧶</p>
            <button onClick={sonrakiKoyun}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg text-lg active:scale-95">
              🐑 Sıradaki koyun
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes floatCloud { 0%, 100% { transform: translateX(0) translateY(0); } 50% { transform: translateX(20px) translateY(-10px); } }
        @keyframes gentleSway { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        @keyframes bounce-in { 0% { transform: scale(0.5); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes zipla { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-28px); } }
        @keyframes sallan { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(-12deg); } }
        @keyframes dus { 0% { transform: translateY(-120px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
        .animate-bounce-in { animation: bounce-in 0.5s ease-out; }
      `}</style>
    </div>
  );
};

export default SheepGameScreen;
