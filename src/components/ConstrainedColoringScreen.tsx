import React, { useEffect, useMemo, useRef, useState } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { t } from '../i18n/index.ts';
import { playEffect } from '../services/speechService.ts';

interface ConstrainedColoringScreenProps {
  currentCard: number;
  totalCards: number;
  isAutoSpeakEnabled: boolean;
  onAdvance: (isCorrect: boolean) => Promise<void>;
  onBack: () => void;
}

type RegionKey = 'sun' | 'cloud1' | 'cloud2' | 'grass' | 'house' | 'roof' | 'door' | 'window';
type PaletteColor = { color: string; label: string };

const PALETTE: PaletteColor[] = [
  { color: '#facc15', label: 'Sarı' }, // güneş
  { color: '#ffffff', label: 'Beyaz' }, // bulut
  { color: '#60a5fa', label: 'Mavi' },  // pencere
  { color: '#22c55e', label: 'Yeşil' }, // çim
  { color: '#b45309', label: 'Kahverengi' }, // kapı
  { color: '#ef4444', label: 'Kırmızı' }, // çatı
  { color: '#f97316', label: 'Turuncu' }, // ev gövdesi
  { color: '#fca5a5', label: 'Açık pembe' }, // ev gövdesi alternatif
];

const ALLOWED: Record<RegionKey, string[]> = {
  sun: ['#facc15'],
  cloud1: ['#ffffff'],
  cloud2: ['#ffffff'],
  grass: ['#22c55e'],
  house: ['#f97316', '#fca5a5'],
  roof: ['#ef4444', '#b91c1c'],
  door: ['#b45309', '#92400e'],
  window: ['#60a5fa', '#93c5fd'],
};

const ConstrainedColoringScreen: React.FC<ConstrainedColoringScreenProps> = ({ currentCard, totalCards, onAdvance, onBack }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selected, setSelected] = useState<string>(PALETTE[0].color);
  const [message, setMessage] = useState<string>('');
  const regionPaths = useRef<Record<RegionKey, Path2D>>({} as Record<RegionKey, Path2D>);
  const regionState = useRef<Record<RegionKey, string | null>>({ sun: null, cloud1: null, cloud2: null, grass: null, house: null, roof: null, door: null, window: null });
  const [progress, setProgress] = useState(0);
  const completionTimeoutRef = useRef<number | null>(null);
  const isCompletedRef = useRef(false);

  const regions: RegionKey[] = useMemo(() => ['sun', 'cloud1', 'cloud2', 'grass', 'house', 'roof', 'door', 'window'], []);

  // Reset completion state when card changes
  useEffect(() => {
    isCompletedRef.current = false;
    regionState.current = { sun: null, cloud1: null, cloud2: null, grass: null, house: null, roof: null, door: null, window: null };
    setProgress(0);
  }, [currentCard]);

  const drawScene = () => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const w = Math.max(1, canvas.clientWidth);
    const h = Math.max(1, canvas.clientHeight);
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
    ctx.setTransform(1,0,0,1,0,0); ctx.scale(dpr, dpr);
    ctx.clearRect(0,0,w,h);

    // sky background
    ctx.fillStyle = '#0ea5e9';
    ctx.fillRect(0,0,w,h);

    // grass base
    const grassH = h * 0.28;
    const grassY = h - grassH;
    const grassPath = new Path2D();
    grassPath.rect(0, grassY, w, grassH);
    regionPaths.current.grass = grassPath;
    ctx.fillStyle = regionState.current.grass || 'rgba(255,255,255,0.12)';
    ctx.fill(grassPath);

    // sun
    const sunPath = new Path2D();
    const sunR = Math.min(w,h) * 0.12;
    sunPath.arc(w*0.18, h*0.18, sunR, 0, Math.PI*2);
    regionPaths.current.sun = sunPath;
    ctx.fillStyle = regionState.current.sun || 'rgba(255,255,255,0.18)';
    ctx.fill(sunPath);

    // clouds
    const mkCloud = (cx:number, cy:number, scale:number) => {
      const p = new Path2D();
      p.arc(cx - 30*scale, cy, 26*scale, Math.PI*0.9, Math.PI*2.1);
      p.arc(cx, cy - 12*scale, 32*scale, Math.PI*1.1, Math.PI*2.05);
      p.arc(cx + 32*scale, cy, 28*scale, Math.PI*1.0, Math.PI*2.0);
      p.arc(cx, cy + 12*scale, 32*scale, Math.PI*1.9, Math.PI*1.1, true);
      p.closePath();
      return p;
    };
    const cloud1 = mkCloud(w*0.42, h*0.18, 1.0);
    const cloud2 = mkCloud(w*0.68, h*0.24, 1.1);
    regionPaths.current.cloud1 = cloud1; regionPaths.current.cloud2 = cloud2;
    ctx.fillStyle = regionState.current.cloud1 || 'rgba(255,255,255,0.15)'; ctx.fill(cloud1);
    ctx.fillStyle = regionState.current.cloud2 || 'rgba(255,255,255,0.15)'; ctx.fill(cloud2);

    // house body (draw first, before door/window)
    const houseW = w * 0.32;
    const houseH = h * 0.30;
    const houseX = w*0.5 - houseW/2;
    const houseY = grassY - houseH;
    const house = new Path2D();
    house.rect(houseX, houseY, houseW, houseH);
    regionPaths.current.house = house;
    ctx.fillStyle = regionState.current.house || 'rgba(255,255,255,0.16)';
    ctx.fill(house);

    // roof
    const roof = new Path2D();
    roof.moveTo(houseX - 12, houseY);
    roof.lineTo(houseX + houseW/2, houseY - houseH*0.45);
    roof.lineTo(houseX + houseW + 12, houseY);
    roof.closePath();
    regionPaths.current.roof = roof;
    ctx.fillStyle = regionState.current.roof || 'rgba(255,255,255,0.18)';
    ctx.fill(roof);

    // Calculate door and window positions (but don't draw yet)
    const doorW = houseW * 0.18;
    const doorH = houseH * 0.38;
    const doorX = houseX + houseW * 0.2;
    const doorY = houseY + houseH - doorH;
    const winW = houseW * 0.18;
    const winH = houseH * 0.18;
    const winX = houseX + houseW * 0.6;
    const winY = houseY + houseH * 0.32;

    // Store paths but don't fill yet
    const door = new Path2D();
    door.rect(doorX, doorY, doorW, doorH);
    regionPaths.current.door = door;
    
    const windowPath = new Path2D();
    windowPath.rect(winX, winY, winW, winH);
    regionPaths.current.window = windowPath;

    // Draw outlines for house, roof first
    const backgroundOutlines: Array<[RegionKey, string]> = [ 
      ['sun','#facc15'], 
      ['cloud1','#ffffff'], 
      ['cloud2','#ffffff'], 
      ['grass','#22c55e'], 
      ['house','#f97316'], 
      ['roof','#ef4444']
    ];
    backgroundOutlines.forEach(([key, color]) => {
      const path = regionPaths.current[key];
      if (!path) return;
      ctx.save();
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
      ctx.stroke(path);
      ctx.restore();
    });

    // NOW draw door and window ON TOP of house
    ctx.fillStyle = regionState.current.door || 'rgba(255,255,255,0.16)';
    ctx.fill(door);
    ctx.fillStyle = regionState.current.window || 'rgba(255,255,255,0.16)';
    ctx.fill(windowPath);

    // Draw door and window outlines
    const foregroundOutlines: Array<[RegionKey, string]> = [
      ['door','#b45309'], 
      ['window','#60a5fa']
    ];
    foregroundOutlines.forEach(([key, color]) => {
      const path = regionPaths.current[key];
      if (!path) return;
      ctx.save();
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(255,255,255,0.8)';
      ctx.stroke(path);
      ctx.restore();
    });

    // instruction overlay
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(10,10, 220, 60);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 14px Inter, system-ui, sans-serif';
    ctx.fillText(t('constrainedColoring.tip1', 'Her bölge için doğru rengi seç!'), 20, 32);
    ctx.fillText(t('constrainedColoring.tip2', 'Yanlış renkler boyamaz.'), 20, 52);
  };

  useEffect(() => {
    drawScene();
    const onResize = () => drawScene();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCard]);

  const handleCanvasClick = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current; if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    // Use clientWidth/clientHeight for hit testing (not scaled canvas dimensions)
    const scaleX = canvas.clientWidth / canvas.width;
    const scaleY = canvas.clientHeight / canvas.height;
    const x = (e.clientX - rect.left) / scaleX;
    const y = (e.clientY - rect.top) / scaleY;
    const ctx = canvas.getContext('2d'); if (!ctx) return;

    // Check from last to first (top-most drawn region first) to handle overlaps
    let hit: RegionKey | null = null;
    for (let i = regions.length - 1; i >= 0; i--) {
      const key = regions[i];
      const path = regionPaths.current[key];
      if (path && ctx.isPointInPath(path, x, y)) { hit = key; break; }
    }
    if (!hit) return;

    const allowed = ALLOWED[hit];
    if (allowed.includes(selected)) {
      regionState.current[hit] = selected;
      setMessage(t('constrainedColoring.good', 'Harika, doğru renk!'));
      playEffect('correct');
    } else {
      setMessage(t('constrainedColoring.wrongColor', 'Bu bölge için uygun renk değil.'));
      VIBRATE(20);
      playEffect('softincorrect');
    }
    drawScene();
    const total = regions.length;
    const done = regions.filter(r => regionState.current[r]).length;
    const newProgress = done / total;
    setProgress(newProgress);
    
    // Check completion immediately - but only once
    if (done === total && !isCompletedRef.current) {
      isCompletedRef.current = true;
      if (completionTimeoutRef.current) clearTimeout(completionTimeoutRef.current);
      completionTimeoutRef.current = window.setTimeout(() => { 
        void onAdvance(true); 
      }, 600);
    }
  };

  // Hook kuralı: erken dönüş tüm hook'lardan sonra olmalı
  if (currentCard > totalCards) return null;

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600">
      <div className="flex items-center justify-between p-3 bg-black/20 backdrop-blur-sm">
        <button onClick={onBack} aria-label={t('app.back', 'Back')} className="p-2 rounded-full hover:bg-white/30 transition-all active:scale-95">
          <ArrowLeftIcon className="w-7 h-7 text-white drop-shadow-lg" />
        </button>
        <div className="text-white font-bold text-base bg-white/20 px-3 py-1 rounded-full shadow-lg">{currentCard}/{totalCards}</div>
      </div>

      <div className="flex-1 flex flex-col gap-2 px-3 pb-3">
        <div className="text-center text-white text-sm font-semibold drop-shadow-md">
          {t('constrainedColoring.instruction', 'Doğru renklerle boya: güneş sarı, bulut beyaz, çimler yeşil...')}
        </div>
        <div className="flex flex-row items-center gap-2 overflow-x-auto py-1.5 px-1 bg-black/15 rounded-xl">
          {PALETTE.map(p => (
            <button
              key={p.color}
              onClick={() => setSelected(p.color)}
              className={`flex-shrink-0 w-9 h-9 rounded-full border-2 ${selected === p.color ? 'ring-3 ring-white/80 scale-110' : 'border-white/40'} transition-all`}
              style={{ background: p.color }}
              aria-label={p.label}
            />
          ))}
        </div>

        <div className="flex-1 min-h-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-2xl shadow-2xl border-4 border-white/20 touch-none bg-sky-400/10"
            onPointerDown={handleCanvasClick}
          />
        </div>

        <div className="flex flex-col gap-1">
          <div className="w-full bg-white/30 rounded-full h-2 shadow-inner">
            <div className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full transition-all duration-300 shadow-lg" style={{ width: `${Math.floor(progress * 100)}%` }} />
          </div>
          <div className="flex justify-between text-white/90 text-xs">
            <span>{Math.floor(progress * 100)}%</span>
            {message && <span className="text-white font-semibold">{message}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

const VIBRATE = (ms: number) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try { (navigator as any).vibrate(ms); } catch {}
  }
};

export default React.memo(ConstrainedColoringScreen);
