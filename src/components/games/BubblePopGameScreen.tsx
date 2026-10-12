import { sayInstruction } from '../../utils/gameVoice.ts';
import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { t } from '../../i18n/index.ts';

interface BubblePopGameScreenProps {
  onBack: () => void;
}

// Baloncuk oyunu (Kaan, 2026-10-12: "eski telefonda kasıyor"): her karede React'i yeniden çizmek yerine
// tek bir canvas'a çizilir; baloncuk görselleri bir kez hazırlanıp (sprite) kopyalanır. Gölge/bulanıklık yok.

interface Bubble { x: number; y: number; size: number; speed: number; wobble: number; wobbleSpeed: number; hue: number; opacity: number; popT: number; } // popT: -1 canlı, 0..1 patlıyor
interface Particle { x: number; y: number; vx: number; vy: number; size: number; hue: number; life: number; }

const HUE_ADIMI = 30;      // 12 renk
const SPRITE_BOYUT = 96;   // piksel; ekranda ölçeklenir
const MAKS_BALON = 12;
const MAKS_PARCACIK = 60;

const spriteYap = (hue: number): HTMLCanvasElement => {
  const c = document.createElement('canvas');
  c.width = c.height = SPRITE_BOYUT;
  const g = c.getContext('2d');
  if (!g) return c;
  const r = SPRITE_BOYUT / 2;
  const grad = g.createRadialGradient(r * 0.7, r * 0.7, r * 0.1, r, r, r);
  grad.addColorStop(0, `hsla(${hue}, 70%, 85%, 0.95)`);
  grad.addColorStop(0.45, `hsla(${hue}, 62%, 62%, 0.75)`);
  grad.addColorStop(1, `hsla(${hue}, 55%, 42%, 0.55)`);
  g.fillStyle = grad;
  g.beginPath(); g.arc(r, r, r - 1.5, 0, Math.PI * 2); g.fill();
  g.strokeStyle = `hsla(${hue}, 60%, 80%, 0.45)`; g.lineWidth = 2; g.stroke();
  g.fillStyle = 'rgba(255,255,255,0.65)';
  g.beginPath(); g.ellipse(r * 0.62, r * 0.5, r * 0.22, r * 0.14, -0.5, 0, Math.PI * 2); g.fill();
  g.fillStyle = 'rgba(255,255,255,0.3)';
  g.beginPath(); g.arc(r * 1.2, r * 1.3, r * 0.08, 0, Math.PI * 2); g.fill();
  return c;
};

const BubblePopGameScreen: React.FC<BubblePopGameScreenProps> = ({ onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const balonlar = useRef<Bubble[]>([]);
  const parcaciklar = useRef<Particle[]>([]);
  const spriteler = useRef<Map<number, HTMLCanvasElement>>(new Map());
  const sesBaglami = useRef<AudioContext | null>(null);
  const seri = useRef(0);
  const seriZamani = useRef<ReturnType<typeof setTimeout> | null>(null);
  const boyut = useRef({ w: 0, h: 0, dpr: 1 });

  // Sabit arka plan yıldızları (bir kez üretilir; her çizimde değişmez)
  const yildizlar = useMemo(() => Array.from({ length: 24 }, () => ({
    left: Math.random() * 100, top: Math.random() * 100, s: 1 + Math.random() * 2, o: 0.3 + Math.random() * 0.5,
  })), []);

  const sesCal = useCallback((pitch: number) => {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!sesBaglami.current) sesBaglami.current = new AC();
      const ctx = sesBaglami.current;
      if (ctx.state === 'suspended') ctx.resume().catch(() => { /* yok say */ });
      const osc = ctx.createOscillator(); const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400 * pitch, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150 * pitch, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.15);
    } catch { /* ses yoksa oyun yine çalışır */ }
  }, []);

  const seriSesi = useCallback(() => {
    try {
      const ctx = sesBaglami.current; if (!ctx) return;
      [523, 659, 784].forEach((freq, i) => {
        const osc = ctx.createOscillator(); const gain = ctx.createGain();
        osc.type = 'sine'; osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.08 + 0.15);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08); osc.stop(ctx.currentTime + i * 0.08 + 0.15);
      });
    } catch { /* yok say */ }
  }, []);

  const baloncukUret = (alttan: boolean): Bubble => {
    const { w, h } = boyut.current;
    const size = 44 + Math.random() * 50;
    return {
      x: 40 + Math.random() * Math.max(10, w - 80),
      y: alttan ? h + size : 90 + Math.random() * Math.max(10, h - 180),
      size, speed: 55 + Math.random() * 90, // px/sn
      wobble: Math.random() * 6, wobbleSpeed: 1.2 + Math.random() * 1.6,
      hue: Math.floor(Math.random() * (360 / HUE_ADIMI)) * HUE_ADIMI, opacity: 0.75 + Math.random() * 0.25, popT: -1,
    };
  };

  const patlat = useCallback((b: Bubble) => {
    b.popT = 0;
    const adet = 8 + Math.floor(b.size / 12);
    for (let i = 0; i < adet; i++) {
      const a = (i / adet) * Math.PI * 2; const sp = 90 + Math.random() * 140;
      parcaciklar.current.push({ x: b.x, y: b.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 90, size: 3 + Math.random() * 4, hue: b.hue, life: 1 });
    }
    if (parcaciklar.current.length > MAKS_PARCACIK) parcaciklar.current.splice(0, parcaciklar.current.length - MAKS_PARCACIK);
    seri.current += 1;
    if (seri.current >= 3) seriSesi();
    if (seriZamani.current) clearTimeout(seriZamani.current);
    seriZamani.current = setTimeout(() => { seri.current = 0; }, 1500);
    sesCal(1.5 - b.size / 150);
  }, [seriSesi, sesCal]);

  const dokun = useCallback((e: React.PointerEvent, genis: boolean) => {
    const c = canvasRef.current; if (!c) return;
    const r = c.getBoundingClientRect();
    const x = e.clientX - r.left; const y = e.clientY - r.top;
    for (const b of balonlar.current) {
      if (b.popT >= 0) continue;
      const dx = b.x - x; const dy = b.y - y;
      if (Math.hypot(dx, dy) < b.size / 2 + (genis ? 10 : 0)) { patlat(b); if (genis) break; }
    }
  }, [patlat]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    const boyutla = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // eski telefonda piksel sayısını sınırla
      const w = window.innerWidth; const h = window.innerHeight;
      boyut.current = { w, h, dpr };
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
    };
    boyutla();
    window.addEventListener('resize', boyutla);

    balonlar.current = Array.from({ length: 7 }, () => baloncukUret(false));
    sayInstruction('Baloncuklara dokun ve patlat!', 500);

    let son = performance.now(); let spawn = 0; let raf = 0; let durdu = false;
    const spriteAl = (hue: number) => {
      let s = spriteler.current.get(hue);
      if (!s) { s = spriteYap(hue); spriteler.current.set(hue, s); }
      return s;
    };

    const kare = (simdi: number) => {
      if (durdu) return;
      const dt = Math.min((simdi - son) / 1000, 0.05); son = simdi;
      const { w, h, dpr } = boyut.current;

      spawn += dt;
      if (spawn > 1.0) { spawn = 0; if (balonlar.current.filter((b) => b.popT < 0).length < MAKS_BALON) balonlar.current.push(baloncukUret(true)); }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Baloncuklar
      const kalan: Bubble[] = [];
      for (const b of balonlar.current) {
        if (b.popT >= 0) { b.popT += dt / 0.18; if (b.popT >= 1) continue; }
        else { b.wobble += b.wobbleSpeed * dt; b.y -= b.speed * dt; b.x += Math.sin(b.wobble) * 28 * dt; if (b.y < -b.size) continue; }
        kalan.push(b);
        const olcek = b.popT >= 0 ? 1 + b.popT * 0.6 : 1;
        const opak = b.popT >= 0 ? b.opacity * (1 - b.popT) : b.opacity;
        const d = b.size * olcek;
        ctx.globalAlpha = Math.max(0, opak);
        ctx.drawImage(spriteAl(b.hue), b.x - d / 2, b.y - d / 2, d, d);
      }
      balonlar.current = kalan;

      // Parçacıklar (düz daire; gölge yok)
      const pk: Particle[] = [];
      for (const p of parcaciklar.current) {
        p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 260 * dt; p.life -= 1.4 * dt;
        if (p.life <= 0) continue;
        pk.push(p);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = `hsl(${p.hue}, 70%, 65%)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      }
      parcaciklar.current = pk;
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(kare);
    };
    raf = requestAnimationFrame(kare);

    const gorunurluk = () => { if (document.hidden) { durdu = true; cancelAnimationFrame(raf); } else if (durdu) { durdu = false; son = performance.now(); raf = requestAnimationFrame(kare); } };
    document.addEventListener('visibilitychange', gorunurluk);

    return () => {
      durdu = true; cancelAnimationFrame(raf);
      window.removeEventListener('resize', boyutla);
      document.removeEventListener('visibilitychange', gorunurluk);
      if (seriZamani.current) clearTimeout(seriZamani.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden select-none" style={{ touchAction: 'none', background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%)' }}>
      {/* Yıldızlar: sabit, animasyonsuz */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {yildizlar.map((s, i) => (
          <div key={i} className="absolute rounded-full bg-white" style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.s, height: s.s, opacity: s.o }} />
        ))}
      </div>

      {/* Oyun alanı */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 cursor-pointer"
        onPointerDown={(e) => dokun(e, true)}
        onPointerMove={(e) => { if (e.buttons !== 0) dokun(e, false); }}
      />

      {/* Başlık */}
      <div className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-3 sm:p-4 pointer-events-none">
        <button onClick={onBack} className="pointer-events-auto p-3 rounded-full bg-white/20 hover:bg-white/30 shadow-lg transition-all" aria-label={t('common.back', 'Geri')}>
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">🫧 {t('miniGames.bubblePop.title', 'Baloncuk Patlatma')}</h1>
        <div className="w-12" />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <p className="text-white/60 text-sm text-center">👆 {t('miniGames.bubblePop.hint', 'Baloncuklara dokun veya sürükle!')}</p>
      </div>
    </div>
  );
};

export default BubblePopGameScreen;
