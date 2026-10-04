import React from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { t } from '../i18n/index.ts';

interface LetterSelectionForTracingScreenProps {
  onSelectLetter: (letter: string, isUpperCase: boolean) => void;
  onBack: () => void;
}

const TURKISH_LETTERS = 'ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ';

const LetterSelectionForTracingScreen: React.FC<LetterSelectionForTracingScreenProps> = ({
  onSelectLetter,
  onBack,
}) => {
  const [isUpperCase, setIsUpperCase] = React.useState(true);
  const letters = TURKISH_LETTERS.split('');

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500">
      <div className="flex items-center justify-between p-3 bg-black/20 backdrop-blur-sm">
        <button
          onClick={onBack}
          aria-label={t('app.back', 'Geri')}
          className="p-2 rounded-full hover:bg-white/30 transition-all active:scale-95"
        >
          <ArrowLeftIcon className="w-7 h-7 text-white drop-shadow-lg" />
        </button>
        <div className="text-white font-bold text-lg drop-shadow-md">
          {t('letterTracing.selectLetter', 'Harf Seç')}
        </div>
        <div className="w-11" />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => setIsUpperCase(true)}
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
              isUpperCase
                ? 'bg-white text-purple-600 shadow-lg scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {t('letterTracing.uppercase', 'BÜYÜK HARF')}
          </button>
          <button
            onClick={() => setIsUpperCase(false)}
            className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
              !isUpperCase
                ? 'bg-white text-purple-600 shadow-lg scale-105'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {t('letterTracing.lowercase', 'küçük harf')}
          </button>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-7 gap-3 max-w-4xl mx-auto">
          {letters.map((letter) => {
            const displayLetter = isUpperCase ? letter : letter.toLocaleLowerCase('tr-TR');
            return (
              <button
                key={letter}
                onClick={() => onSelectLetter(letter, isUpperCase)}
                className="aspect-square bg-white/90 hover:bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center font-bold text-4xl text-purple-700 hover:text-purple-900"
              >
                {displayLetter}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LetterSelectionForTracingScreen;
