import React, { useEffect, useRef, useState } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { t } from '../i18n/index.ts';
import { playEffect } from '../services/speechService.ts';
import { sayInstruction, sayCorrect } from '../utils/gameVoice.ts';
import { useAppContext } from '../contexts/AppContext.ts';

export type LineTracingLevel = 'straight' | 'wave' | 'spiral' | 'zigzag' | 'curve' | 'loop';

interface LineTracingScreenProps {
  currentCard: number;
  totalCards: number;
  isAutoSpeakEnabled: boolean;
  onAdvance: (isCorrect: boolean) => Promise<void>;
  onBack: () => void;
  level?: LineTracingLevel; // optional: defaults rotate by card index
}

// Her çizgide bir karakter hedefine gider: çocuk karakteri parmağıyla çizgi boyunca götürür.
const SAHNE: Record<LineTracingLevel, { ad: string; kim: string; hedef: string; cumle: string; aynala?: boolean }> = {
  straight: { ad: 'Düz Çizgi', kim: '🚗', hedef: '🏠', cumle: 'Arabayı eve götür.', aynala: true },
  wave: { ad: 'Dalgalı', kim: '🐟', hedef: '🪸', cumle: 'Balığı mercana götür.', aynala: true },
  zigzag: { ad: 'Zikzak', kim: '🐰', hedef: '🥕', cumle: 'Tavşanı havuca götür.' },
  curve: { ad: 'Eğri', kim: '🐝', hedef: '🌸', cumle: 'Arıyı çiçeğe götür.' },
  spiral: { ad: 'Spiral', kim: '🐌', hedef: '🍃', cumle: 'Salyangozu yaprağa götür.' },
  loop: { ad: 'İlmek', kim: '🐶', hedef: '🦴', cumle: 'Köpeği kemiğe götür.' },
};

const VIBRATE = (ms: number) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try { (navigator as any).vibrate(ms); } catch { }
  }
};

// Küçük çocuk parmağı için bağışlayıcı mesafeler (CSS px)
const CIZGI_GENISLIK = 40;   // gri yol bandı
const USTUNDE = 26;          // bu kadar yakınsa çizgide sayılır
const ILERLE_TAMAM = 0.96;   // bu orana gelince hedefe vardı

const LineTracingScreen: React.FC<LineTracingScreenProps> = ({ currentCard, totalCards, onAdvance, onBack, level }) => {
  const { settings } = useAppContext();
  const isCosmic = settings.theme === 'deneme2';

  const COLORS = isCosmic ? {
    grid: 'rgba(6,182,212,0.15)',
    band: 'rgba(30,41,59,0.85)',
    line: '#0e7490',
    done: '#22d3ee',
    trailError: '#ef4444',
  } : {
    grid: 'rgba(255,255,255,0.1)',
    band: 'rgba(255,255,255,0.22)',
    line: 'rgba(255,255,255,0.75)',
    done: '#22c55e',
    trailError: '#ef4444',
  };
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [kimPos, setKimPos] = useState<{ x: number; y: number } | null>(null);
  const [hedefPos, setHedefPos] = useState<{ x: number; y: number } | null>(null);
  const [bitti, setBitti] = useState(false);
  const drawingRef = useRef(false);
  const samplesRef = useRef<Array<{ x: number; y: number }>>([]);
  const bestIndexRef = useRef(0);
  const bittiRef = useRef(false);

  const effectiveLevel: LineTracingLevel = level || (['straight', 'wave', 'zigzag', 'curve', 'spiral', 'loop'][((currentCard - 1) % 6)] as LineTracingLevel);
  const sahne = SAHNE[effectiveLevel];

  // Yolun noktalarını üret (CSS px)
  const yolNoktalari = (w: number, h: number) => {
    const margin = 44;
    const startX = margin;
    const endX = w - margin;
    const midY = Math.floor(h / 2);
    const span = endX - startX;
    const pts: Array<{ x: number; y: number }> = [];
    const ekle = (x: number, y: number) => pts.push({ x, y });
    if (effectiveLevel === 'straight') {
      for (let x = startX; x <= endX; x += 3) ekle(x, midY);
    } else if (effectiveLevel === 'wave') {
      const amp = Math.max(24, Math.min(64, h * 0.18));
      for (let i = 0; i <= span; i += 3) ekle(startX + i, midY + Math.sin((i / span) * 3 * Math.PI * 2) * amp);
    } else if (effectiveLevel === 'zigzag') {
      const amp = Math.max(32, Math.min(80, h * 0.22));
      const seg = 6;
      for (let i = 0; i < seg; i++) {
        const x1 = startX + (i / seg) * span, x2 = startX + ((i + 1) / seg) * span;
        const y1 = midY + (i % 2 === 0 ? -amp : amp), y2 = midY + (i % 2 === 0 ? amp : -amp);
        for (let k = 0; k < 1; k += 0.04) ekle(x1 + (x2 - x1) * k, y1 + (y2 - y1) * k);
      }
      ekle(endX, midY + (seg % 2 === 0 ? -amp : amp));
    } else if (effectiveLevel === 'curve') {
      for (let i = 0; i <= span; i += 3) ekle(startX + i, midY - h * 0.12 + Math.sin((i / span) * Math.PI) * (h * 0.25));
    } else if (effectiveLevel === 'loop') {
      const cx = Math.floor(w * 0.5), radius = Math.min(w, h) * 0.26;
      for (let k = 0; k <= 1; k += 0.03) ekle(startX + (cx - startX) * k, midY + radius);
      for (let a = Math.PI / 2; a <= Math.PI / 2 + Math.PI * 2; a += 0.04) ekle(cx + Math.cos(a) * radius * -1, midY + Math.sin(a) * radius);
      for (let k = 0; k <= 1; k += 0.03) ekle(cx + (endX - cx) * k, midY + radius);
    } else if (effectiveLevel === 'spiral') {
      // Dıştan içe: salyangoz dışarıdan başlar, ortadaki yaprağa gider
      const cx = Math.floor(w * 0.5), turns = 2, maxR = Math.min(w, h) * 0.36, minR = 18;
      const tot = Math.PI * 2 * turns;
      for (let a = 0; a <= tot; a += 0.03) {
        const r = maxR - (a / tot) * (maxR - minR);
        ekle(cx + Math.cos(a + Math.PI) * r, midY + Math.sin(a + Math.PI) * r);
      }
    }
    return pts;
  };

  const drawScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = Math.max(1, canvas.clientWidth);
    const h = Math.max(1, canvas.clientHeight);
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 32) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
    for (let y = 0; y < h; y += 32) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

    // Ekran dönerse ilerleme kaybolmasın: oranı koru
    const eskiOran = samplesRef.current.length > 1 ? bestIndexRef.current / (samplesRef.current.length - 1) : 0;
    const pts = yolNoktalari(w, h);
    samplesRef.current = pts;
    if (import.meta.env.DEV) (window as any).__cizgiYol = pts; // otomatik test için
    bestIndexRef.current = Math.round(eskiOran * (pts.length - 1));

    const yol = (to = pts.length - 1) => {
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i <= to; i++) ctx.lineTo(pts[i].x, pts[i].y);
    };
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    // geniş yol bandı
    yol(); ctx.lineWidth = CIZGI_GENISLIK; ctx.strokeStyle = COLORS.band; ctx.stroke();
    // ortada kesikli kılavuz çizgi
    ctx.setLineDash([10, 12]); yol(); ctx.lineWidth = 5; ctx.strokeStyle = COLORS.line; ctx.stroke(); ctx.setLineDash([]);
    cizIlerleme(ctx);

    setHedefPos(pts[pts.length - 1]);
    setKimPos(pts[bestIndexRef.current]);
    setProgress(bestIndexRef.current / (pts.length - 1));
  };

  // Geçilen kısmı yeşile boya
  const cizIlerleme = (ctx: CanvasRenderingContext2D) => {
    const pts = samplesRef.current;
    const to = bestIndexRef.current;
    if (to < 1) return;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i <= to; i++) ctx.lineTo(pts[i].x, pts[i].y);
    ctx.lineWidth = CIZGI_GENISLIK - 12;
    ctx.strokeStyle = COLORS.done;
    ctx.stroke();
    ctx.restore();
  };

  useEffect(() => {
    bestIndexRef.current = 0;
    samplesRef.current = [];
    bittiRef.current = false;
    setBitti(false);
    drawScene();
    sayInstruction(`Parmağınla ${sahne.cumle.charAt(0).toLowerCase()}${sahne.cumle.slice(1)} Çizginin üstünden git.`, 400);
    const onResize = () => drawScene();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveLevel, isCosmic, currentCard]);

  const handlePointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (bittiRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (e.type === 'pointerdown') {
      drawingRef.current = true;
      try { canvas.setPointerCapture(e.pointerId); } catch { }
    }
    if (e.type === 'pointerup' || e.type === 'pointercancel' || e.type === 'pointerleave') {
      // Parmak kalktı: ilerleme korunur, kaldığı yerden devam eder (hata sesi yok)
      drawingRef.current = false;
      return;
    }
    if (!drawingRef.current) return;

    const samples = samplesRef.current;
    if (samples.length < 2) return;
    const curr = bestIndexRef.current;
    // Sadece ilerideki yakın kısma bakılır: spiral/ilmekte iç halkaya atlamayı önler
    const startIdx = Math.max(0, curr - 10);
    const endIdx = Math.min(samples.length - 1, curr + 40);
    let candIdx = curr, best = Infinity;
    for (let i = startIdx; i <= endIdx; i++) {
      const d = Math.hypot(samples[i].x - x, samples[i].y - y);
      if (d < best) { best = d; candIdx = i; }
    }
    const ustunde = best <= USTUNDE;
    if (!ustunde) {
      // Çizgiden çıktı: kırmızı iz, hafif titreşim; ilerleme silinmez
      ctx.save();
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = COLORS.trailError;
      ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      VIBRATE(15);
      return;
    }
    if (candIdx > curr) {
      bestIndexRef.current = candIdx;
      cizIlerleme(ctx);
      const pct = candIdx / (samples.length - 1);
      setProgress(pct);
      setKimPos(samples[candIdx]);
      if (pct >= ILERLE_TAMAM) {
        bestIndexRef.current = samples.length - 1;
        cizIlerleme(ctx);
        setKimPos(samples[samples.length - 1]);
        setProgress(1);
        bittiRef.current = true;
        setBitti(true);
        drawingRef.current = false;
        playEffect('correct');
        sayCorrect();
        setTimeout(() => { void onAdvance(true); }, 1600);
      }
    }
  };

  return (
    <div className={`flex flex-col h-full w-full overflow-hidden landscape:flex-row ${isCosmic ? 'bg-slate-900' : 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500'}`}>
      {isCosmic && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900/80 pointer-events-none" />
        </>
      )}

      <div className={`relative z-10 flex items-center justify-between p-3 backdrop-blur-sm landscape:flex-col landscape:h-full landscape:w-20 landscape:justify-start landscape:gap-4 landscape:py-4 ${isCosmic ? 'bg-slate-800/80 border-b landscape:border-r border-cyan-500/20' : 'bg-black/20'}`}>
        <button onClick={onBack} aria-label={t('app.back', 'Geri')} className={`p-2 rounded-full transition-all active:scale-95 ${isCosmic ? 'bg-slate-700 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20' : 'hover:bg-white/30'}`}>
          <ArrowLeftIcon className={`w-7 h-7 landscape:w-6 landscape:h-6 drop-shadow-lg ${isCosmic ? 'text-cyan-400' : 'text-white'}`} />
        </button>
        <div className={`font-bold text-base landscape:text-sm px-3 py-1 landscape:px-2 landscape:py-1 rounded-full shadow-lg ${isCosmic ? 'bg-cyan-900/40 text-cyan-100 border border-cyan-500/30' : 'text-white bg-white/20'}`}>
          {currentCard}/{totalCards}
        </div>
      </div>

      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        <div className="px-4 py-2 landscape:py-1 text-center">
          <p className={`text-lg landscape:text-sm font-bold drop-shadow-md ${isCosmic ? 'text-cyan-100' : 'text-white'}`}>
            {bitti ? 'Aferin! 🎉' : sahne.cumle}
          </p>
          <p className={`text-xs landscape:text-[10px] mt-0.5 ${isCosmic ? 'text-cyan-400/70' : 'text-white/80'}`}>{sahne.ad}</p>
        </div>

        <div className="flex-1 px-3 pb-2 landscape:px-4 landscape:pb-2 flex flex-col min-h-0">
          <div className="flex-1 relative min-h-0">
            <canvas
              ref={canvasRef}
              className={`w-full h-full touch-none rounded-2xl shadow-2xl border-4 ${isCosmic ? 'bg-slate-800/50 border-cyan-500/10 shadow-cyan-900/20' : 'bg-black/30 border-white/20'}`}
              onPointerDown={handlePointer}
              onPointerMove={handlePointer}
              onPointerUp={handlePointer}
              onPointerCancel={handlePointer}
              onPointerLeave={handlePointer}
            />
            {/* Hedef ve karakter (canvas'ın üstünde, dokunmayı engellemez) */}
            {hedefPos && (
              <div className={`absolute pointer-events-none text-5xl -translate-x-1/2 -translate-y-1/2 ${bitti ? 'animate-bounce' : ''}`}
                style={{ left: hedefPos.x + 4, top: hedefPos.y + 4 }}>{sahne.hedef}</div>
            )}
            {kimPos && (
              <div className="absolute pointer-events-none text-4xl -translate-x-1/2 -translate-y-1/2 drop-shadow-lg transition-[left,top] duration-75"
                style={{ left: kimPos.x + 4, top: kimPos.y + 4 }}>
                {/* emoji sola bakıyorsa yürüdüğü yöne çevir */}
                <span className="inline-block" style={sahne.aynala ? { transform: 'scaleX(-1)' } : undefined}>{sahne.kim}</span>
              </div>
            )}
            {progress === 0 && kimPos && !bitti && (
              <div className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2" style={{ left: kimPos.x + 4, top: kimPos.y + 4 }}>
                <div className="w-16 h-16 rounded-full border-4 border-white/80 animate-ping" />
              </div>
            )}
          </div>

          <div className="mt-2 landscape:mt-1 flex-shrink-0">
            <div className={`w-full rounded-full h-2 shadow-inner ${isCosmic ? 'bg-slate-700' : 'bg-white/30'}`}>
              <div className={`h-2 rounded-full transition-all duration-300 shadow-lg ${isCosmic ? 'bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-cyan-500/50' : 'bg-gradient-to-r from-emerald-400 to-green-500'}`} style={{ width: `${Math.floor(progress * 100)}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineTracingScreen;
