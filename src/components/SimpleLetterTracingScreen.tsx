import React, { useCallback, useEffect, useRef, useState } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { t } from '../i18n/index.ts';
import { playEffect } from '../services/speechService.ts';
import { sayInstruction, sayCorrect } from '../utils/gameVoice.ts';
import { useAppContext } from '../contexts/AppContext.ts';
import { titret } from '../utils/titresim.ts';

interface SimpleLetterTracingScreenProps {
  letter: string;
  isUpperCase: boolean;
  onComplete: () => void;
  onBack: () => void;
}

// Telefonda Capacitor Haptics ile (navigator.vibrate Android'de izinsiz çalışmıyordu)
const VIBRATE = (ms: number) => titret(ms >= 25 ? 'orta' : 'hafif', 80);

// Kontrol: harfin üstünde bir nokta ağı var. Çocuk harfin çoğunu boyamalı (KAPLAMA)
// ve çizdiğinin çoğu harfin üstünde kalmalı (UZERINDE). Her yeri karalamak kabul edilmez.
const AG_ADIM = 7;          // harf noktaları arası (CSS px)
const BOYA_YARICAP = 24;    // parmak izinin harfi boyadığı yarıçap
const UZAK_SINIR = 30;      // bundan uzak çizim "harfin dışında" sayılır
const KAPLAMA_HEDEF = 0.8;
const UZERINDE_HEDEF = 0.6;

const SimpleLetterTracingScreen: React.FC<SimpleLetterTracingScreenProps> = ({
  letter,
  isUpperCase,
  onComplete,
  onBack,
}) => {
  const { settings } = useAppContext();
  const isCosmic = settings.theme === 'deneme2';

  const COLORS = isCosmic ? {
    bg: 'bg-slate-900',
    text: 'text-cyan-100',
    subtext: 'text-cyan-400',
    stroke: '#22d3ee',
    letter: 'rgba(6,182,212,0.25)',
    letterDone: 'rgba(34,211,238,0.55)',
    buttonBg: 'bg-slate-700 border border-cyan-500/30',
    buttonText: 'text-cyan-400',
    containerBorder: 'border-cyan-500/30 shadow-cyan-500/20'
  } : {
    bg: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
    text: 'text-white',
    subtext: 'text-white/90',
    stroke: '#fbbf24',
    letter: 'rgba(255,255,255,0.4)',
    letterDone: 'rgba(134,239,172,0.9)',
    buttonBg: 'bg-white/20 hover:bg-white/30',
    buttonText: 'text-white',
    containerBorder: 'border-white/30 shadow-xl'
  };
  const [strokes, setStrokes] = useState<Array<Array<{ x: number; y: number }>>>([]);
  const [currentStroke, setCurrentStroke] = useState<Array<{ x: number; y: number }>>([]);
  const [kaplama, setKaplama] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const [uyari, setUyari] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);
  const boyutRef = useRef(0);
  // Harf noktaları ve hızlı arama ızgarası
  const agRef = useRef<{ x: number; y: number; boyandi: boolean }[]>([]);
  const izgaraRef = useRef<Map<string, number[]>>(new Map());
  const sayacRef = useRef({ boyanan: 0, cizilen: 0, uzerinde: 0 });
  const completingRef = useRef(false);

  // Türkçe harf dönüşümü (I/ı, İ/i)
  const displayLetter = isUpperCase ? letter.toLocaleUpperCase('tr-TR') : letter.toLocaleLowerCase('tr-TR');

  const anahtar = (x: number, y: number) => `${Math.floor(x / BOYA_YARICAP)},${Math.floor(y / BOYA_YARICAP)}`;

  // Harfi çiz ve harf noktalarını çıkar
  const harfiHazirla = useCallback(() => {
    const cont = containerRef.current, canvas = canvasRef.current;
    if (!cont || !canvas) return;
    const size = cont.clientWidth;
    if (size < 10) return;
    const eskiBoyut = boyutRef.current;
    boyutRef.current = size;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width = Math.floor(size * dpr);
    canvas.height = Math.floor(size * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);
    const font = getComputedStyle(document.body).fontFamily || 'sans-serif';
    ctx.font = `bold ${Math.round(size * 0.72)}px ${font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    const m = ctx.measureText(displayLetter);
    const y = size / 2 + (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
    ctx.fillStyle = '#000';
    ctx.fillText(displayLetter, size / 2, y);

    // Nokta ağı (kalın harfin içi)
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const ag: { x: number; y: number; boyandi: boolean }[] = [];
    for (let py = AG_ADIM / 2; py < size; py += AG_ADIM) {
      for (let px = AG_ADIM / 2; px < size; px += AG_ADIM) {
        const i = (Math.floor(py * dpr) * canvas.width + Math.floor(px * dpr)) * 4 + 3;
        if (data[i] > 128) ag.push({ x: px, y: py, boyandi: false });
      }
    }
    const izgara = new Map<string, number[]>();
    ag.forEach((p, i) => { const k = anahtar(p.x, p.y); const l = izgara.get(k); if (l) l.push(i); else izgara.set(k, [i]); });
    agRef.current = ag;
    izgaraRef.current = izgara;
    if (import.meta.env.DEV) (window as any).__harfAg = ag; // otomatik test için

    // Görünen soluk harf
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = COLORS.letter;
    ctx.fillText(displayLetter, size / 2, y);

    // Boyut değiştiyse çizimleri sıfırla (koordinatlar değişti)
    if (eskiBoyut && eskiBoyut !== size) {
      setStrokes([]);
      setCurrentStroke([]);
    }
    sayacRef.current = { boyanan: 0, cizilen: 0, uzerinde: 0 };
    setKaplama(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayLetter, isCosmic]);

  useEffect(() => {
    // Yazı tipi yüklenmeden ölçersek harf yanlış çıkar
    const hazirla = () => harfiHazirla();
    if ((document as any).fonts?.ready) (document as any).fonts.ready.then(hazirla); else hazirla();
    window.addEventListener('resize', hazirla);
    return () => window.removeEventListener('resize', hazirla);
  }, [harfiHazirla]);

  useEffect(() => {
    sayInstruction(`${displayLetter} harfi. Parmağınla harfin üstünden geç.`, 300);
  }, [displayLetter]);

  // Boyanan harf noktasını yeşile boya
  const noktaBoya = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = COLORS.letterDone;
    ctx.fillRect(x - AG_ADIM / 2, y - AG_ADIM / 2, AG_ADIM, AG_ADIM);
  };

  // Yeni çizim noktası: yakındaki harf noktalarını boya, harfin üstünde mi say
  const noktaEkle = (x: number, y: number) => {
    const ag = agRef.current, izgara = izgaraRef.current, sayac = sayacRef.current;
    const cx = Math.floor(x / BOYA_YARICAP), cy = Math.floor(y / BOYA_YARICAP);
    let enYakin = Infinity;
    for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
      const l = izgara.get(`${cx + dx},${cy + dy}`);
      if (!l) continue;
      for (const i of l) {
        const p = ag[i];
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < enYakin) enYakin = d;
        if (d <= BOYA_YARICAP && !p.boyandi) { p.boyandi = true; sayac.boyanan++; noktaBoya(p.x, p.y); }
      }
    }
    sayac.cizilen++;
    if (enYakin <= UZAK_SINIR) sayac.uzerinde++;
  };

  const kontrolEt = () => {
    if (completingRef.current) return;
    const ag = agRef.current, sayac = sayacRef.current;
    if (!ag.length) return;
    const k = sayac.boyanan / ag.length;
    const u = sayac.cizilen ? sayac.uzerinde / sayac.cizilen : 0;
    setKaplama(k);
    if (k >= KAPLAMA_HEDEF && u >= UZERINDE_HEDEF) {
      completingRef.current = true;
      setIsCompleting(true);
      setUyari('');
      VIBRATE(30);
      playEffect('correct');
      sayCorrect();
      setTimeout(() => onComplete(), 1500);
    } else if (k >= KAPLAMA_HEDEF && u < UZERINDE_HEDEF) {
      setUyari('Harfin dışına çok taştı. Temizleyip harfin üstünden gidelim.');
    }
  };

  const konum = (e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Kutu kenarlığı (border-4): içerik alanına göre
    return { x: e.clientX - rect.left - 4, y: e.clientY - rect.top - 4 };
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (completingRef.current) return;
    drawingRef.current = true;
    try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { }
    const p = konum(e);
    noktaEkle(p.x, p.y);
    setCurrentStroke([p]);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!drawingRef.current) return;
    const p = konum(e);
    noktaEkle(p.x, p.y);
    setCurrentStroke((prev) => [...prev, p]);
  };

  const handlePointerUp = () => {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    setStrokes((prev) => (currentStroke.length ? [...prev, currentStroke] : prev));
    setCurrentStroke([]);
    kontrolEt();
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentStroke([]);
    setUyari('');
    harfiHazirla();
  };

  const nokta = (s: Array<{ x: number; y: number }>) => s.map(p => `${p.x},${p.y}`).join(' ');
  const yuzde = Math.min(100, Math.round((kaplama / KAPLAMA_HEDEF) * 100));

  return (
    <div className={`flex flex-col h-full w-full ${COLORS.bg} overflow-hidden relative`}>
      {isCosmic && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900/80 pointer-events-none" />
        </>
      )}
      <div className={`relative z-10 flex items-center justify-between p-3 backdrop-blur-sm ${isCosmic ? 'bg-slate-800/80 border-b border-cyan-500/20' : 'bg-black/20'}`}>
        <button
          onClick={onBack}
          aria-label={t('app.back', 'Geri')}
          className={`p-2 rounded-full transition-all active:scale-95 ${isCosmic ? 'bg-slate-700 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20' : 'hover:bg-white/30'}`}
        >
          <ArrowLeftIcon className={`w-7 h-7 drop-shadow-lg ${isCosmic ? 'text-cyan-400' : 'text-white'}`} />
        </button>
        <div className={`font-bold text-xl drop-shadow-md ${COLORS.text}`}>
          {t('letterTracing.currentLetter', 'Harf')}: {displayLetter}
        </div>
        <div className="w-16" />
      </div>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 gap-4">
        <div className={`text-center text-lg font-semibold drop-shadow-md ${COLORS.text}`}>
          {isCompleting ? 'Aferin! 🎉' : t('letterTracing.instructionSimple', 'Harfin üzerinden parmağınla geç!')}
        </div>

        <div
          ref={containerRef}
          className={`relative backdrop-blur-sm rounded-3xl border-4 shadow-2xl touch-none ${COLORS.containerBorder} ${isCosmic ? 'bg-slate-800/50' : 'bg-white/10 border-white/30'}`}
          style={{ width: '90%', maxWidth: '500px', aspectRatio: '1', boxSizing: 'content-box' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {strokes.map((s, i) => s.length > 1 && (
              <polyline key={i} points={nokta(s)} fill="none" stroke={COLORS.stroke} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            ))}
            {currentStroke.length > 1 && (
              <polyline points={nokta(currentStroke)} fill="none" stroke={COLORS.stroke} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            )}
          </svg>
        </div>

        {/* İlerleme: harfin ne kadarı boyandı */}
        <div className="w-full max-w-[500px] px-[5%]">
          <div className={`w-full rounded-full h-3 ${isCosmic ? 'bg-slate-700' : 'bg-white/30'}`}>
            <div className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 transition-all duration-300" style={{ width: `${yuzde}%` }} />
          </div>
          <p className={`text-sm text-center mt-1 min-h-[1.25rem] ${COLORS.subtext}`}>{uyari}</p>
        </div>

        <button
          onClick={handleClear}
          className={`px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${COLORS.buttonBg} ${COLORS.buttonText}`}
        >
          {t('letterTracing.clear', 'Temizle')}
        </button>
      </div>
    </div>
  );
};

export default SimpleLetterTracingScreen;
