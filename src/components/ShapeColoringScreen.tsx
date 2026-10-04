import React, { useEffect, useRef, useState } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { playEffect } from '../services/speechService.ts';
import { t } from '../i18n/index.ts';

interface ShapeColoringScreenProps {
  currentCard: number;
  totalCards: number;
  isAutoSpeakEnabled: boolean;
  onAdvance: (isCorrect: boolean) => Promise<void>;
  onBack: () => void;
}

type Color = '#ef4444' | '#f59e0b' | '#10b981' | '#3b82f6' | '#8b5cf6';
type Shape = 'circle' | 'square' | 'triangle' | 'star' | 'heart' | 'hexagon';

const BIN = 16; // grid cell size for coverage
const OUTSIDE_TOLERANCE_PX = 10; // küçük taşma toleransı

const ShapeColoringScreen: React.FC<ShapeColoringScreenProps> = ({ currentCard, totalCards, onAdvance, onBack }) => {
  const [selectedColor, setSelectedColor] = useState<Color>('#ef4444');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<Path2D | null>(null);
  const bboxRef = useRef<{x:number;y:number;w:number;h:number}>({x:0,y:0,w:0,h:0});
  const [isDrawing, setIsDrawing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAdvancing, setIsAdvancing] = useState(false); // Tur ilerlemesi kontrol bayrağı
  const eligibleCellsRef = useRef<Set<string>>(new Set());
  const paintedCellsRef = useRef<Set<string>>(new Set());
  const lastOutsideFeedbackAt = useRef<number>(0);

  const VIBRATE = (ms: number) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try { (navigator as any).vibrate(ms); } catch {}
    }
  };

  // Her turda farklı şekil göstermek için, toplam tur sayısı kadar şekil dizisi oluşturulmalı
  // Eğer totalCards > 6 ise şekiller tekrar etmeli, ancak totalCards < 6 ise sadece ilgili şekiller gösterilmeli
  const shapeOrder: Shape[] = ['circle', 'square', 'triangle', 'star', 'heart', 'hexagon'];
  const shape: Shape = shapeOrder[(currentCard-1) % shapeOrder.length];
  // Eğer totalCards < 6 ise, sadece ilk totalCards şekli gösterilsin
  // Örneğin totalCards=2 ise, sadece circle ve square
  // currentCard > totalCards ise, ilerleme durmalı

  const drawScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use the actual CSS size of the canvas to avoid offsets
    const w = Math.max(1, canvas.clientWidth);
    const ch = Math.max(200, canvas.clientHeight);
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(ch * dpr);
  ctx.setTransform(1,0,0,1,0,0);
  ctx.scale(dpr, dpr); // work in CSS pixels

  ctx.clearRect(0,0,w,ch);

    // faint grid
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
  for (let x=0; x<w; x+=32) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,ch); ctx.stroke(); }
  for (let y=0; y<ch; y+=32) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke(); }

  const cx = Math.floor(w*0.5);
  const cy = Math.floor(ch*0.5);
  const size = Math.min(w, ch) * 0.55;
    const half = size/2;

    const path = new Path2D();
    if (shape === 'circle') {
      path.arc(cx, cy, half, 0, Math.PI*2);
      bboxRef.current = { x: cx-half, y: cy-half, w: size, h: size };
    } else if (shape === 'square') {
      path.rect(cx-half, cy-half, size, size);
      bboxRef.current = { x: cx-half, y: cy-half, w: size, h: size };
    } else if (shape === 'triangle') {
      const hTri = size * 0.866; // equilateral height
      const x1 = cx, y1 = cy - hTri/2;
      const x2 = cx - size/2, y2 = cy + hTri/2;
      const x3 = cx + size/2, y3 = cy + hTri/2;
      path.moveTo(x1,y1); path.lineTo(x2,y2); path.lineTo(x3,y3); path.closePath();
      const minX = Math.min(x1,x2,x3), maxX = Math.max(x1,x2,x3);
      const minY = Math.min(y1,y2,y3), maxY = Math.max(y1,y2,y3);
      bboxRef.current = { x: minX, y: minY, w: maxX-minX, h: maxY-minY };
    } else if (shape === 'star') {
      // 5 köşeli yıldız
      const outerRadius = half;
      const innerRadius = half * 0.4;
      const points = 5;
      for (let i = 0; i < points * 2; i++) {
        const angle = (Math.PI * i) / points - Math.PI / 2;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) path.moveTo(x, y);
        else path.lineTo(x, y);
      }
      path.closePath();
      bboxRef.current = { x: cx-outerRadius, y: cy-outerRadius, w: outerRadius*2, h: outerRadius*2 };
    } else if (shape === 'heart') {
      // Kalp şekli
      const scale = half / 50;
      path.moveTo(cx, cy + 25 * scale);
      path.bezierCurveTo(cx, cy + 15 * scale, cx - 15 * scale, cy - 5 * scale, cx - 25 * scale, cy - 5 * scale);
      path.bezierCurveTo(cx - 40 * scale, cy - 5 * scale, cx - 40 * scale, cy + 15 * scale, cx - 40 * scale, cy + 15 * scale);
      path.bezierCurveTo(cx - 40 * scale, cy + 30 * scale, cx - 25 * scale, cy + 45 * scale, cx, cy + 60 * scale);
      path.bezierCurveTo(cx + 25 * scale, cy + 45 * scale, cx + 40 * scale, cy + 30 * scale, cx + 40 * scale, cy + 15 * scale);
      path.bezierCurveTo(cx + 40 * scale, cy + 15 * scale, cx + 40 * scale, cy - 5 * scale, cx + 25 * scale, cy - 5 * scale);
      path.bezierCurveTo(cx + 15 * scale, cy - 5 * scale, cx, cy + 15 * scale, cx, cy + 25 * scale);
      path.closePath();
      bboxRef.current = { x: cx - 40 * scale, y: cy - 5 * scale, w: 80 * scale, h: 65 * scale };
    } else if (shape === 'hexagon') {
      // Altıgen
      const radius = half;
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * i) / 3;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;
        if (i === 0) path.moveTo(x, y);
        else path.lineTo(x, y);
      }
      path.closePath();
      bboxRef.current = { x: cx-radius, y: cy-radius, w: radius*2, h: radius*2 };
    }

    pathRef.current = path;

    // precompute eligible grid cells inside shape (transform-agnostic)
    eligibleCellsRef.current.clear();
    paintedCellsRef.current.clear();
    const { x:bx, y:by, w:bw, h:bh } = bboxRef.current;
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    for (let gy = Math.floor(by/BIN)*BIN; gy <= by+bh; gy += BIN) {
      for (let gx = Math.floor(bx/BIN)*BIN; gx <= bx+bw; gx += BIN) {
        if (ctx.isPointInPath(path, gx + BIN/2, gy + BIN/2)) {
          eligibleCellsRef.current.add(`${Math.floor(gx/BIN)},${Math.floor(gy/BIN)}`);
        }
      }
    }
    ctx.restore();

    // draw outline and light fill background with glow
    ctx.save();
    ctx.fillStyle = 'rgba(255,255,255,0.12)';
    ctx.fill(path);
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 8;
    ctx.strokeStyle = 'rgba(255,255,255,0.95)';
    ctx.stroke(path);
    ctx.restore();
  };

  useEffect(() => {
    // Her şekil değiştiğinde progress ve painted cells'i sıfırla
    setProgress(0);
    setIsAdvancing(false); // Yeni tur başladığında bayrağı sıfırla
    paintedCellsRef.current.clear();
    drawScene();
    const onResize = () => drawScene();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape, currentCard]);

  const paintAt = (x:number, y:number, color: Color, evtType?: string) => {
    const canvas = canvasRef.current; const path = pathRef.current; if (!canvas || !path) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    // IMPORTANT: reset transform for hit-testing so CSS px match path coordinates
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    const inPath = ctx.isPointInPath(path, x, y);
    ctx.restore();
    // update coverage via grid (only if inside AND eligible)
    const key = `${Math.floor(x/BIN)},${Math.floor(y/BIN)}`;
    if (inPath && eligibleCellsRef.current.has(key)) {
      paintedCellsRef.current.add(key);
      const covered = paintedCellsRef.current.size;
      const total = Math.max(1, eligibleCellsRef.current.size);
      setProgress(covered / total);

      // clip and draw a soft brush dab
      ctx.save();
      ctx.clip(path);
      const r = 14;
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = color;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    } else {
      // Küçük taşmaya tolerans: sınır çizgisine yakınsa uyarma
      ctx.save();
      // Perform stroke hit-test without DPR scaling
      const prevLineWidth = ctx.lineWidth;
      ctx.setTransform(1,0,0,1,0,0);
      ctx.lineWidth = OUTSIDE_TOLERANCE_PX * 2; // sınır etrafında tolerans bandı
      const nearBoundary = ctx.isPointInStroke(path, x, y);
      ctx.lineWidth = prevLineWidth;
      ctx.restore();

      // BBox toleransı: şeklin bounding box'ı +- tolerans içinde ise "sınır yakın" say
      const { x:bx, y:by, w:bw, h:bh } = bboxRef.current;
      const inExpandedBox = (x >= bx-OUTSIDE_TOLERANCE_PX && x <= bx+bw+OUTSIDE_TOLERANCE_PX && y >= by-OUTSIDE_TOLERANCE_PX && y <= by+bh+OUTSIDE_TOLERANCE_PX);

      if (!nearBoundary && !inExpandedBox) {
        // belirgin şekilde dışarıda: uyarı (debounced)
        if (evtType === 'pointermove') {
          const now = Date.now();
          if (now - lastOutsideFeedbackAt.current > 600) {
            VIBRATE(20);
            playEffect('softincorrect');
            lastOutsideFeedbackAt.current = now;
          }
        }
  // görsel ipucu (yalnızca anlık işaret, kalıcı boyama yok)
  ctx.save();
  ctx.globalAlpha = 0.25;
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(x,y,10,0,Math.PI*2); ctx.stroke();
  ctx.restore();
      }
    }
  };

  const handlePointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    if (e.type === 'pointerdown') {
      setIsDrawing(true);
      paintAt(x,y, selectedColor, e.type);
      return;
    }
    if (e.type === 'pointermove') {
      if (!isDrawing) return;
      paintAt(x,y, selectedColor, e.type);
    }
    if (e.type === 'pointerup' || e.type === 'pointercancel' || e.type === 'pointerleave') {
      setIsDrawing(false);
      const total = Math.max(1, eligibleCellsRef.current.size);
      const covered = paintedCellsRef.current.size;
      const pct = covered / total;
      const minCells = Math.max(10, Math.floor(total * 0.05)); // en az %5 ya da 10 hücre
      if (pct >= 0.65 && covered >= minCells && !isAdvancing) {
        setIsAdvancing(true); // Bayrak set et, tekrar çağrılmasını engelle
        // Her turda (son tur dahil) onAdvance çağrılmalı
        // Başarı efekti ve delay ekleyelim
        playEffect('correct');
        setTimeout(() => { 
          void onAdvance(true); 
        }, 800);
      }
    }
  };

  // Hook kuralı: erken dönüş tüm hook'lardan sonra olmalı
  if (currentCard > totalCards) return null;

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-orange-400 landscape:flex-row">
      {/* Üst panel (dikey) / Sol panel (yatay): geri butonu ve tur göstergesi */}
      <div className="flex items-center justify-between p-3 bg-black/20 backdrop-blur-sm landscape:flex-col landscape:h-full landscape:w-20 landscape:justify-start landscape:gap-4 landscape:py-4">
        <button onClick={onBack} aria-label={t('app.back', 'Back')} className="p-2 rounded-full hover:bg-white/30 transition-all active:scale-95">
          <ArrowLeftIcon className="w-7 h-7 landscape:w-6 landscape:h-6 text-white drop-shadow-lg" />
        </button>
        <div className="text-white font-bold text-base landscape:text-sm bg-white/20 px-3 py-1 landscape:px-2 landscape:py-1 rounded-full shadow-lg">{currentCard}/{totalCards}</div>
      </div>
      
      {/* Ana içerik alanı */}
      <div className="flex-1 flex flex-col landscape:flex-row overflow-hidden">
        {/* Sol panel (dikey) / Üst panel (yatay): Talimatlar ve renk butonları */}
        <div className="flex flex-col items-center px-4 py-2 landscape:w-48 landscape:py-4 landscape:justify-center landscape:gap-3">
          <div className="text-center landscape:px-2">
            <p className="text-white text-sm landscape:text-xs font-semibold drop-shadow-md leading-tight">
              {t('shapeColoring.instruction', 'Tek seferde tek şekil geliyor. Parmağını kaldırmadan şeklin içini boya.')}
            </p>
            <p className="text-white/90 text-xs landscape:text-[10px] mt-1">{Math.min(100, Math.max(0, Math.floor(progress*100)))}% Tamamlandı</p>
          </div>
          
          {/* Renk butonları */}
          <div className="flex gap-2 landscape:flex-col landscape:gap-2 mt-2">
            {(['#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6'] as Color[]).map(c => (
              <button 
                key={c} 
                onClick={() => setSelectedColor(c)} 
                className={`w-10 h-10 landscape:w-9 landscape:h-9 rounded-full transition-all active:scale-90 ${selectedColor===c ? 'border-3 border-white shadow-2xl scale-110' : 'border-2 border-white/50 shadow-lg hover:scale-105'}`} 
                style={{ backgroundColor: c }} 
                aria-label={`color-${c}`} 
              />
            ))}
          </div>
        </div>
        
        {/* Canvas alanı */}
        <div ref={containerRef} className="flex-1 p-3 landscape:p-4 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="w-full h-full max-h-[60vh] landscape:max-h-full landscape:max-w-[70vw] touch-none rounded-2xl bg-black/30 shadow-2xl border-4 border-white/20"
            onPointerDown={handlePointer}
            onPointerMove={handlePointer}
            onPointerUp={handlePointer}
            onPointerCancel={handlePointer}
            onPointerLeave={handlePointer}
          />
        </div>
      </div>
      
      {/* İlerleme barı - Alt (her zaman) */}
      <div className="px-4 pb-4 landscape:absolute landscape:bottom-4 landscape:left-1/2 landscape:-translate-x-1/2 landscape:w-1/2">
        <div className="w-full bg-white/30 rounded-full h-3 shadow-inner">
          <div className="bg-gradient-to-r from-emerald-400 to-green-500 h-3 rounded-full transition-all duration-300 shadow-lg" style={{ width: `${Math.floor(progress*100)}%`}} />
        </div>
      </div>
    </div>
  );
};

export default ShapeColoringScreen;
