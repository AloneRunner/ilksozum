import React, { useState, useEffect, useRef, useCallback } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { speak } from '../services/speechService.ts';
import { COLOR_OPTIONS, ColorRecognitionRound } from '../services/database/activities/reasoning/colorRecognitionData.ts';

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

  // 4 seçenek: doğru renk + 3 rastgele farklı renk
  const options = React.useMemo(() => {
    const correct = COLOR_OPTIONS.find(c => c.key === roundData.correctColor)!;
    const others = COLOR_OPTIONS.filter(c => c.key !== roundData.correctColor);
    const shuffled = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
    return [...shuffled, correct].sort(() => Math.random() - 0.5);
  }, [roundData.id]);

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

  const correctColorObj = COLOR_OPTIONS.find(c => c.key === roundData.correctColor);

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

      {/* Görsel + Soru */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
        <p className="text-2xl sm:text-3xl font-black text-slate-700 text-center">
          {roundData.speech?.tr?.question || `${roundData.word} ne renk?`}
        </p>

        <div
          className={`w-44 h-44 rounded-3xl flex items-center justify-center shadow-lg border-4 transition-all duration-300 overflow-hidden ${
            isCorrect
              ? 'border-green-400 scale-105'
              : 'border-slate-200'
          }`}
          style={isCorrect ? { borderColor: correctColorObj?.hex } : {}}
        >
          <img
            src={`/images/${roundData.imageId}.png`}
            alt={roundData.word}
            className="w-full h-full object-contain p-3"
          />
        </div>

        {isWordLabelVisible && (
          <p className="text-lg font-bold text-slate-500 capitalize">{roundData.word}</p>
        )}
      </div>

      {/* Renk Seçenekleri */}
      <div className="p-5 bg-white rounded-t-3xl shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.1)]">
        <p className="text-center text-slate-400 font-bold text-xs uppercase tracking-wider mb-4">
          Rengi Seç
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          {options.map((opt) => {
            const isThisCorrect = isCorrect && opt.key === roundData.correctColor;
            const isThisWrong = isWrong === opt.key;
            return (
              <button
                key={opt.key}
                onClick={() => handleSelect(opt.key)}
                disabled={!!isCorrect}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 border-2 font-bold text-base transition-all shadow-sm
                  ${isThisCorrect ? 'border-green-500 scale-105 bg-green-50' : ''}
                  ${isThisWrong ? 'border-red-400 bg-red-50 animate-shake' : ''}
                  ${!isThisCorrect && !isThisWrong ? 'border-slate-200 bg-slate-50 hover:border-slate-400 hover:bg-slate-100' : ''}
                `}
              >
                <span
                  className="w-8 h-8 rounded-full border-2 border-slate-300 flex-shrink-0 shadow-inner"
                  style={{ backgroundColor: opt.hex }}
                />
                <span className="text-slate-700">{opt.label}</span>
              </button>
            );
          })}
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
