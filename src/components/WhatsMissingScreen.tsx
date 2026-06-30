import React, { useState, useEffect, useRef as _useRef, useCallback } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { speak } from '../services/speechService.ts';
import { WhatsMissingRound, WhatsMissingItem } from '../services/database/activities/reasoning/whatsMissingData.ts';

type Phase = 'memorize' | 'countdown' | 'question';

interface WhatsMissingScreenProps {
  roundData: WhatsMissingRound;
  onAdvance: (correct: boolean) => void;
  onBack: () => void;
  isAutoSpeakEnabled?: boolean;
  isWordLabelVisible?: boolean;
  isFastTransitionEnabled?: boolean;
}

const MEMORIZE_SECONDS = 3;

const WhatsMissingScreen: React.FC<WhatsMissingScreenProps> = ({
  roundData,
  onAdvance,
  onBack,
  isAutoSpeakEnabled,
  isWordLabelVisible,
  isFastTransitionEnabled,
}) => {
  const [phase, setPhase] = useState<Phase>('memorize');
  const [countdown, setCountdown] = useState(MEMORIZE_SECONDS);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState<number | null>(null);

  const missingItem = roundData.items[roundData.missingIndex];

  // Seçenekler: kayıp nesne + diğer 2 yanlış (items'tan farklı rastgele seçilir)
  const options = React.useMemo(() => {
    const others = roundData.items.filter((_, i) => i !== roundData.missingIndex);
    const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 2);
    return [...shuffledOthers, missingItem].sort(() => Math.random() - 0.5);
  }, [roundData.id]);

  // Reset on new round
  useEffect(() => {
    setPhase('memorize');
    setCountdown(MEMORIZE_SECONDS);
    setIsCorrect(false);
    setIsWrong(null);
  }, [roundData.id]);

  // Ezberleme aşaması
  useEffect(() => {
    if (phase !== 'memorize') return;
    if (isAutoSpeakEnabled) speak('Nesneleri iyi bak!', 'tr-TR');

    let secs = MEMORIZE_SECONDS;
    setCountdown(secs);

    const interval = setInterval(() => {
      secs -= 1;
      setCountdown(secs);
      if (secs <= 0) {
        clearInterval(interval);
        setPhase('countdown');
        setTimeout(() => {
          setPhase('question');
          if (isAutoSpeakEnabled) speak('Hangisi kayboldu?', 'tr-TR');
        }, 600);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [roundData.id, phase]);

  const handleSelect = useCallback(async (item: WhatsMissingItem) => {
    if (isCorrect || isWrong !== null) return;
    if (item.id === missingItem.id) {
      setIsCorrect(true);
      const msg = `Evet! ${missingItem.word} kaybolmuştu!`;
      if (!isFastTransitionEnabled) await speak(msg, 'tr-TR');
      setTimeout(() => onAdvance(true), isFastTransitionEnabled ? 300 : 1300);
    } else {
      setIsWrong(item.id);
      const msg = `Hayır! ${missingItem.word} kaybolmuştu!`;
      if (!isFastTransitionEnabled) await speak(msg, 'tr-TR');
      setTimeout(() => { setIsWrong(null); }, 900);
    }
  }, [missingItem, isCorrect, isWrong, isFastTransitionEnabled, onAdvance]);

  return (
    <div className="absolute inset-0 flex flex-col bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-white shadow-sm border-b border-slate-200">
        <button onClick={onBack} className="bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors">
          <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
        </button>
        <p className="font-black text-slate-600 text-base">
          {phase === 'memorize' ? '👀 İyi bak!' : phase === 'countdown' ? '🙈 Gizleniyor...' : '🤔 Hangisi kayboldu?'}
        </p>
        <div className="w-10" />
      </div>

      {/* Tek sabit layout — grid her fazda aynı yerde kalır */}
      <div className="flex-1 flex flex-col items-center p-6 gap-4">
        {/* Sabit yükseklikte üst gösterge alanı */}
        <div className="flex items-center justify-center h-14 flex-shrink-0">
          {phase === 'memorize' && (
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-400 text-white font-black text-xl shadow-lg animate-pulse">
              {countdown}
            </div>
          )}
          {phase === 'countdown' && (
            <div className="text-5xl animate-spin-slow">🙈</div>
          )}
          {phase === 'question' && (
            <p className="text-slate-400 font-bold text-xs uppercase tracking-wider">Kayıp Nesneyi Seç</p>
          )}
        </div>

        {/* Grid — her fazda aynı konumda */}
        <div className="grid grid-cols-2 gap-4 max-w-xs w-full flex-shrink-0">
          {roundData.items.map((item, idx) => {
            const isMissing = idx === roundData.missingIndex;
            return (
              <div
                key={item.id}
                className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center overflow-hidden shadow-sm transition-all duration-500 ${
                  phase === 'question' && isMissing
                    ? 'border-dashed border-slate-300 bg-slate-100'
                    : phase === 'countdown' && isMissing
                    ? 'opacity-0 scale-90 border-slate-200 bg-white'
                    : 'border-slate-200 bg-white opacity-100 scale-100'
                }`}
              >
                {phase === 'question' && isMissing ? (
                  <span className="text-4xl opacity-30">❓</span>
                ) : (
                  <>
                    <img src={item.imageUrl} alt={item.word} className="w-full h-full object-contain p-3" />
                    {isWordLabelVisible && (
                      <p className="text-xs font-bold text-slate-500 pb-1">{item.word}</p>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Seçenekler — sadece soru fazında, grid'in hemen altında */}
        {phase === 'question' && (
          <div className="w-full max-w-xs">
            <div className="grid grid-cols-3 gap-3">
              {options.map((opt) => {
                const isThisCorrect = isCorrect && opt.id === missingItem.id;
                const isThisWrong = isWrong === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt)}
                    disabled={isCorrect}
                    className={`aspect-square rounded-2xl border-2 flex flex-col items-center justify-center overflow-hidden shadow-sm transition-all
                      ${isThisCorrect ? 'border-green-500 bg-green-50 scale-105' : ''}
                      ${isThisWrong ? 'border-red-400 bg-red-50 animate-shake' : ''}
                      ${!isThisCorrect && !isThisWrong ? 'border-slate-200 bg-white hover:border-indigo-400 hover:bg-indigo-50' : ''}
                    `}
                  >
                    <img src={opt.imageUrl} alt={opt.word} className="w-full h-full object-contain p-2" />
                    {isWordLabelVisible && (
                      <p className="text-xs font-bold text-slate-500 pb-1 truncate w-full text-center px-1">{opt.word}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-2px, 0, 0); }
          20%, 80% { transform: translate3d(3px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-shake { animation: shake 0.4s both; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default WhatsMissingScreen;
