import React, { useState } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { t } from '../i18n/index.ts';
import { playEffect } from '../services/speechService.ts';
import { useAppContext } from '../contexts/AppContext.ts';

interface SimpleLetterTracingScreenProps {
  letter: string;
  isUpperCase: boolean;
  onComplete: () => void;
  onBack: () => void;
}

const VIBRATE = (ms: number) => {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      (navigator as any).vibrate(ms);
    } catch { }
  }
};

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
    stroke: '#22d3ee', // cyan-400
    buttonBg: 'bg-slate-700 border border-cyan-500/30',
    buttonText: 'text-cyan-400',
    containerBorder: 'border-cyan-500/30 shadow-cyan-500/20'
  } : {
    bg: 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500',
    text: 'text-white',
    subtext: 'text-white/90',
    stroke: '#fbbf24', // amber-400
    buttonBg: 'bg-white/20 hover:bg-white/30',
    buttonText: 'text-white',
    containerBorder: 'border-white/30 shadow-xl'
  };
  const [strokes, setStrokes] = useState<Array<Array<{ x: number; y: number }>>>([]);
  const [currentStroke, setCurrentStroke] = useState<Array<{ x: number; y: number }>>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const displayLetter = isUpperCase ? letter.toUpperCase() : letter.toLowerCase();

  const totalPoints = strokes.reduce((sum, stroke) => sum + stroke.length, 0) + currentStroke.length;

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDrawing(true);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Start a new stroke
    setCurrentStroke([{ x, y }]);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // Add to current stroke
    setCurrentStroke((prev) => [...prev, { x, y }]);
  };

  const handlePointerUp = () => {
    if (isDrawing && currentStroke.length > 0) {
      // Save current stroke to strokes array
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke([]);
    }
    setIsDrawing(false);
  };

  const handleComplete = () => {
    if (!isCompleting && totalPoints > 20) {
      setIsCompleting(true);
      VIBRATE(30);
      playEffect('correct');
      setTimeout(() => {
        onComplete();
      }, 400);
    }
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentStroke([]);
    playEffect('softincorrect');
  };

  return (
    <div className={`flex flex-col h-full w-full ${COLORS.bg} font-mono overflow-hidden relative`}>
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
          {t('letterTracing.instructionSimple', 'Harfin üzerinden parmağınla geç!')}
        </div>

        <div
          ref={containerRef}
          className={`relative backdrop-blur-sm rounded-3xl border-4 shadow-2xl touch-none ${COLORS.containerBorder} ${isCosmic ? 'bg-slate-800/50' : 'bg-white/10 border-white/30'}`}
          style={{ width: '90%', maxWidth: '500px', aspectRatio: '1' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Large letter in background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`font-bold select-none ${isCosmic ? 'text-cyan-500/20' : 'text-white/40'}`}
              style={{ fontSize: 'min(60vw, 350px)', lineHeight: 1 }}
            >
              {displayLetter}
            </div>
          </div>

          {/* User's trace */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 500 500"
            preserveAspectRatio="xMidYMid meet"
          >
            {containerRef.current && (() => {
              const rect = containerRef.current.getBoundingClientRect();
              return (
                <>
                  {/* Draw completed strokes */}
                  {strokes.map((stroke, idx) => (
                    stroke.length > 1 && (
                      <polyline
                        key={idx}
                        points={stroke.map((p) => {
                          const svgX = (p.x / rect.width) * 500;
                          const svgY = (p.y / rect.height) * 500;
                          return `${svgX},${svgY}`;
                        }).join(' ')}
                        fill="none"
                        stroke={COLORS.stroke}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )
                  ))}
                  {/* Draw current stroke being drawn */}
                  {currentStroke.length > 1 && (
                    <polyline
                      points={currentStroke.map((p) => {
                        const svgX = (p.x / rect.width) * 500;
                        const svgY = (p.y / rect.height) * 500;
                        return `${svgX},${svgY}`;
                      }).join(' ')}
                      fill="none"
                      stroke={COLORS.stroke}
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </>
              );
            })()}
          </svg>
        </div>

        <div className={`text-sm text-center ${COLORS.subtext}`}>
          {totalPoints > 0
            ? `${t('letterTracing.drawing', 'Çiziyorsun... Devam et!')} (${totalPoints})`
            : t('letterTracing.start', 'Harfe dokunarak başla')}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleClear}
            className={`px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${COLORS.buttonBg} ${COLORS.buttonText}`}
          >
            {t('letterTracing.clear', 'Temizle')}
          </button>
          <button
            onClick={handleComplete}
            disabled={totalPoints < 20}
            className={`px-6 py-3 rounded-xl font-bold transition-all active:scale-95 ${totalPoints >= 20
              ? (isCosmic ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-green-500 hover:bg-green-600 text-white shadow-lg')
              : (isCosmic ? 'bg-slate-800 text-slate-600 border border-slate-700 cursor-not-allowed' : 'bg-white/10 text-white/40 cursor-not-allowed')
              }`}
          >
            {t('letterTracing.continue', 'Devam Et')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleLetterTracingScreen;
