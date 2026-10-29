import React, { useState, useEffect, useRef, useCallback } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { speak } from '../services/speechService.ts';
import { nesneUrl } from '../services/nesneGorsel.ts';
import { ColorRecognitionRound } from '../services/database/activities/reasoning/colorRecognitionData.ts';
import { renkSiklari, sikTonu, renkEtiketi } from '../data/rengiNe.ts';

interface ColorRecognitionScreenProps {
  roundData: ColorRecognitionRound;
  onAdvance: (correct: boolean) => void;
  onBack: () => void;
  isAutoSpeakEnabled?: boolean;
  isWordLabelVisible?: boolean;
  isFastTransitionEnabled?: boolean;
}

const ColorRecognitionScreen: React.FC<ColorRecognitionScreenProps> = ({
  roundData,
  onAdvance,
  onBack,
  isAutoSpeakEnabled,
  isWordLabelVisible,
  isFastTransitionEnabled,
}) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState<string | null>(null);
  const hasSpoken = useRef(false);

  // 4 seçenek: doğru renk + 3 farklı renk; düğme tonları fotoğraftan ölçülen tonlar (data/rengiNe.ts, Gökhan Hoca)
  const options = React.useMemo(() => renkSiklari(roundData, 4)
    .map(key => ({ key, label: renkEtiketi(key), hex: sikTonu(key, roundData) })), [roundData.id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setIsCorrect(false);
    setIsWrong(null);
    hasSpoken.current = false;
  }, [roundData.id]);

  useEffect(() => {
    if (isAutoSpeakEnabled && !hasSpoken.current) {
      hasSpoken.current = true;
      const q = roundData.speech?.tr?.question || `${roundData.word} ne renk?`;
      setTimeout(() => speak(q, 'tr-TR'), 400);
    }
  }, [roundData.id, isAutoSpeakEnabled]);

  const handleSelect = useCallback(async (colorKey: string) => {
    if (isCorrect || isWrong) return;
    if (colorKey === roundData.correctColor) {
      setIsCorrect(true);
      const msg = roundData.speech?.tr?.correct || `Evet! ${roundData.word} ${roundData.correctColor}!`;
      if (!isFastTransitionEnabled) await speak(msg, 'tr-TR');
      setTimeout(() => onAdvance(true), isFastTransitionEnabled ? 300 : 1200);
    } else {
      setIsWrong(colorKey);
      const msg = roundData.speech?.tr?.wrong || `Hayır! ${roundData.word} ${roundData.correctColor}!`;
      if (!isFastTransitionEnabled) await speak(msg, 'tr-TR');
      setTimeout(() => { setIsWrong(null); }, 800);
    }
  }, [roundData, isCorrect, isWrong, isFastTransitionEnabled, onAdvance]);

  const correctColorObj = options.find(c => c.key === roundData.correctColor);

  return (
    <div className="absolute inset-0 flex flex-col bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-white shadow-sm border-b border-slate-200">
        <button onClick={onBack} className="bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors">
          <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
        </button>
        <button
          onClick={() => speak(roundData.speech?.tr?.question || `${roundData.word} ne renk?`, 'tr-TR')}
          className="bg-indigo-100 hover:bg-indigo-200 rounded-full px-4 py-2 text-indigo-700 font-bold text-sm transition-colors"
        >
          🔊 Tekrar Dinle
        </button>
      </div>

      {/* Yatayda fotoğraf solda, renkler sağda (fotoğraf büyük kalsın) */}
      <div className="flex-1 min-h-0 flex flex-col landscape:flex-row">
      {/* Görsel + Soru */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center gap-3 p-3">
        <p className="text-2xl sm:text-3xl font-black text-slate-700 text-center">
          {roundData.speech?.tr?.question || `${roundData.word} ne renk?`}
        </p>

        {/* Fotoğraf eskisinin en az iki katı (Gökhan Hoca, 2026-10-29: 176 px küçüktü) */}
        <div
          className={`w-[min(86vw,42vh)] h-[min(86vw,42vh)] landscape:w-[min(46vw,64vh)] landscape:h-[min(46vw,64vh)] rounded-3xl bg-white flex items-center justify-center shadow-lg border-4 transition-all duration-300 overflow-hidden ${
            isCorrect
              ? 'border-green-400 scale-105'
              : 'border-slate-200'
          }`}
          style={isCorrect ? { borderColor: correctColorObj?.hex } : {}}
        >
          <img
            src={roundData.imageUrl || nesneUrl(`/images/${roundData.imageId}.png`)}
            alt={roundData.word}
            className="w-full h-full object-contain p-1"
          />
        </div>

        {isWordLabelVisible && (
          <p className="text-lg font-bold text-slate-500 capitalize">{roundData.word}</p>
        )}
      </div>

      {/* Renk Seçenekleri */}
      <div className="p-5 landscape:p-4 bg-white rounded-t-3xl landscape:rounded-t-none landscape:rounded-l-3xl landscape:w-[42%] landscape:flex landscape:flex-col landscape:justify-center shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.1)]">
        <p className="text-center text-slate-400 font-bold text-xs uppercase tracking-wider mb-4 landscape:mb-2">
          Rengi Seç
        </p>
        <div className="grid grid-cols-2 gap-4 landscape:gap-3 w-full max-w-sm mx-auto">
          {options.map((opt) => {
            const isThisCorrect = isCorrect && opt.key === roundData.correctColor;
            const isThisWrong = isWrong === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => handleSelect(opt.key)}
                disabled={!!isCorrect}
                aria-label={opt.label}
                // Sayaç (2026-10-15): 'Rengi Ne?' %79 yarıda kalıyor; yazı yerine büyük renk düğmeleri (okuma gerektirmez)
                className={`relative flex h-24 landscape:h-[18vh] items-end justify-center rounded-3xl border-4 pb-2 shadow-md transition-all active:scale-95
                  ${isThisCorrect ? 'border-green-500 scale-105 ring-4 ring-green-300' : ''}
                  ${isThisWrong ? 'border-red-400 animate-shake' : ''}
                  ${!isThisCorrect && !isThisWrong ? 'border-slate-200' : ''}
                `}
                style={{ backgroundColor: opt.hex }}
              >
                <span className="rounded-full bg-white/90 px-3 py-0.5 text-sm font-black text-slate-700 shadow-sm">{opt.label}</span>
                {isThisCorrect && <span className="absolute right-2 top-1 text-2xl">✅</span>}
              </button>
            );
          })}
        </div>
      </div>

      </div>

      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-2px, 0, 0); }
          20%, 80% { transform: translate3d(3px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-shake { animation: shake 0.4s both; }
      `}</style>
    </div>
  );
};

export default ColorRecognitionScreen;
