import React, { useState, useCallback, useEffect } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { playEffect, speak } from '../services/speechService.ts';
import { t } from '../i18n/index.ts';
import { getSpeechLocale } from '../utils/translate.ts';
import { getCurrentLanguage } from '../i18n/index.ts';

interface EmotionPuppetRound {
  id: number;
  targetEmotion: string;
  targetEmotionLabel: string;
  correctParts: {
    eyes: string;
    mouth: string;
    eyebrows: string;
  };
}

interface EmotionPuppetScreenProps {
  roundData: EmotionPuppetRound;
  onAdvance: (isCorrect: boolean) => void;
  onBack: () => void;
  currentCard: number;
  totalCards: number;
  isAutoSpeakEnabled: boolean;
}

// SVG Yüz Bileşenleri - Her duygu için çok belirgin tasarımlar
const EyebrowsSVG: React.FC<{ emotion: string | null; side: 'left' | 'right' }> = ({ emotion, side }) => {
  const isLeft = side === 'left';

  if (!emotion) return (
    <rect x={isLeft ? 25 : 55} y="28" width="20" height="3" rx="1.5" fill="#d1d5db" />
  );

  switch (emotion) {
    case 'happy':
      return (
        <path
          d={isLeft ? "M25 32 Q35 26 45 30" : "M55 30 Q65 26 75 32"}
          stroke="#4b5563"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      );
    case 'sad':
      return (
        <path
          d={isLeft ? "M25 26 Q35 32 45 30" : "M55 30 Q65 32 75 26"}
          stroke="#4b5563"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      );
    case 'angry':
      return (
        <path
          d={isLeft ? "M22 34 L48 22" : "M52 22 L78 34"}
          stroke="#1f2937"
          strokeWidth="5"
          strokeLinecap="round"
        />
      );
    case 'surprised':
      return (
        <path
          d={isLeft ? "M25 20 Q35 18 45 20" : "M55 20 Q65 18 75 20"}
          stroke="#4b5563"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      );
    default:
      return null;
  }
};

const EyesSVG: React.FC<{ emotion: string | null; side: 'left' | 'right' }> = ({ emotion, side }) => {
  const cx = side === 'left' ? 35 : 65;

  if (!emotion) return (
    <>
      <circle cx={cx} cy="50" r="10" fill="white" stroke="#d1d5db" strokeWidth="2" />
      <circle cx={cx} cy="50" r="4" fill="#d1d5db" />
    </>
  );

  switch (emotion) {
    case 'happy':
      // Kısık mutlu gözler (^_^)
      return (
        <path
          d={`M${cx - 12} 52 Q${cx} 42 ${cx + 12} 52`}
          stroke="#1f2937"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      );
    case 'sad':
      // Gözyaşlı üzgün gözler
      return (
        <>
          <circle cx={cx} cy="50" r="12" fill="white" stroke="#1f2937" strokeWidth="3" />
          <circle cx={cx - 2} cy="52" r="5" fill="#1f2937" />
          {/* Gözyaşı */}
          <ellipse cx={cx + 8} cy="66" rx="4" ry="6" fill="#60a5fa" opacity="0.8" />
          <ellipse cx={cx + 6} cy="72" rx="2" ry="3" fill="#93c5fd" opacity="0.6" />
        </>
      );
    case 'angry':
      // Kızgın gözler - kare pupil, kırmızı çizgi
      return (
        <>
          <circle cx={cx} cy="50" r="12" fill="white" stroke="#1f2937" strokeWidth="3" />
          <circle cx={cx} cy="52" r="6" fill="#1f2937" />
          {/* Kırmızı damarlar */}
          <path d={`M${cx - 10} 44 L${cx - 5} 48`} stroke="#ef4444" strokeWidth="2" />
          <path d={`M${cx + 10} 44 L${cx + 5} 48`} stroke="#ef4444" strokeWidth="2" />
        </>
      );
    case 'surprised':
      // Büyük yuvarlak şaşkın gözler
      return (
        <>
          <circle cx={cx} cy="50" r="16" fill="white" stroke="#1f2937" strokeWidth="3" />
          <circle cx={cx} cy="50" r="8" fill="#1f2937" />
          <circle cx={cx + 3} cy="47" r="3" fill="white" opacity="0.9" />
        </>
      );
    default:
      return null;
  }
};

const MouthSVG: React.FC<{ emotion: string | null }> = ({ emotion }) => {
  if (!emotion) return (
    <rect x="35" y="82" width="30" height="4" rx="2" fill="#d1d5db" />
  );

  switch (emotion) {
    case 'happy':
      // Büyük gülümseyen ağız
      return (
        <>
          <path
            d="M30 78 Q50 98 70 78"
            stroke="#1f2937"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* İç kısım - dişler */}
          <path
            d="M35 80 Q50 92 65 80"
            fill="#fecaca"
          />
        </>
      );
    case 'sad':
      // Aşağı kıvrık üzgün ağız
      return (
        <path
          d="M32 88 Q50 74 68 88"
          stroke="#1f2937"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      );
    case 'angry':
      // Gergin, dişli kızgın ağız
      return (
        <>
          {/* Üst dudak */}
          <path d="M28 80 L72 80" stroke="#1f2937" strokeWidth="3" />
          {/* Alt dudak - gergin */}
          <path d="M30 84 Q50 78 70 84" stroke="#1f2937" strokeWidth="3" fill="none" />
          {/* Dişler */}
          <rect x="35" y="80" width="5" height="4" fill="white" stroke="#1f2937" strokeWidth="1" />
          <rect x="42" y="80" width="5" height="4" fill="white" stroke="#1f2937" strokeWidth="1" />
          <rect x="49" y="80" width="5" height="4" fill="white" stroke="#1f2937" strokeWidth="1" />
          <rect x="56" y="80" width="5" height="4" fill="white" stroke="#1f2937" strokeWidth="1" />
        </>
      );
    case 'surprised':
      // Büyük yuvarlak O şeklinde şaşkın ağız
      return (
        <ellipse cx="50" cy="85" rx="12" ry="14" fill="#1f2937" />
      );
    default:
      return null;
  }
};

// Duygu seçim kartı
const EmotionPartCard: React.FC<{
  emotion: string;
  type: 'eyebrows' | 'eyes' | 'mouth';
  isSelected: boolean;
  onClick: () => void;
}> = ({ emotion, type, isSelected, onClick }) => {
  const emotionLabels: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    surprised: '😲',
  };

  return (
    <button
      onClick={onClick}
      className={`
        relative p-2 rounded-2xl transition-all duration-300 transform
        ${isSelected
          ? 'bg-gradient-to-br from-purple-500 to-pink-500 scale-110 shadow-xl ring-4 ring-purple-300'
          : 'bg-white hover:bg-purple-50 hover:scale-105 shadow-md'
        }
      `}
    >
      <svg viewBox="0 0 100 60" className="w-16 h-10">
        {/* Arka plan */}
        <rect x="5" y="5" width="90" height="50" rx="10" fill={isSelected ? "rgba(255,255,255,0.3)" : "#fef3c7"} />

        {/* Parça önizleme */}
        <g transform="translate(0, -20)">
          {type === 'eyebrows' && (
            <>
              <EyebrowsSVG emotion={emotion} side="left" />
              <EyebrowsSVG emotion={emotion} side="right" />
            </>
          )}
          {type === 'eyes' && (
            <>
              <EyesSVG emotion={emotion} side="left" />
              <EyesSVG emotion={emotion} side="right" />
            </>
          )}
          {type === 'mouth' && (
            <g transform="translate(0, 0)">
              <MouthSVG emotion={emotion} />
            </g>
          )}
        </g>
      </svg>

      {/* Emoji göstergesi */}
      <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-sm ${isSelected ? 'bg-white' : 'bg-purple-100'}`}>
        {emotionLabels[emotion]}
      </div>
    </button>
  );
};

const EmotionPuppetScreen: React.FC<EmotionPuppetScreenProps> = ({
  roundData,
  onAdvance,
  onBack,
  currentCard,
  totalCards,
  isAutoSpeakEnabled,
}) => {
  const [selectedEyes, setSelectedEyes] = useState<string | null>(null);
  const [selectedMouth, setSelectedMouth] = useState<string | null>(null);
  const [selectedEyebrows, setSelectedEyebrows] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const lang = getCurrentLanguage();
  const speechLocale = getSpeechLocale(lang as any);

  const emotionNames: Record<string, string> = {
    happy: t('emotionPuppet.emotions.happy', 'Mutlu'),
    sad: t('emotionPuppet.emotions.sad', 'Üzgün'),
    angry: t('emotionPuppet.emotions.angry', 'Kızgın'),
    surprised: t('emotionPuppet.emotions.surprised', 'Şaşkın'),
  };

  const localizedTargetEmotion = emotionNames[roundData.targetEmotion] ?? roundData.targetEmotionLabel;

  // Emoji for target emotion
  const emotionEmoji: Record<string, string> = {
    happy: '😊',
    sad: '😢',
    angry: '😠',
    surprised: '😲',
  };

  // Reset state when round changes
  useEffect(() => {
    setSelectedEyes(null);
    setSelectedMouth(null);
    setSelectedEyebrows(null);
    setShowFeedback(false);
    setIsCorrect(false);
    setShowCelebration(false);
  }, [roundData.id]);

  // Auto speak
  useEffect(() => {
    if (isAutoSpeakEnabled) {
      const instruction = t('emotionPuppet.instruction', '{emotion} bir yüz yap!').replace('{emotion}', localizedTargetEmotion);
      speak(instruction, speechLocale);
    }
  }, [roundData.id, isAutoSpeakEnabled, localizedTargetEmotion, speechLocale]);

  const handleCheck = useCallback(async () => {
    if (!selectedEyes || !selectedMouth || !selectedEyebrows) {
      await playEffect('incorrect');
      return;
    }

    const correct =
      selectedEyes === roundData.correctParts.eyes &&
      selectedMouth === roundData.correctParts.mouth &&
      selectedEyebrows === roundData.correctParts.eyebrows;

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setShowCelebration(true);
      await playEffect('correct');
      await speak(t('emotionPuppet.feedback.correct', 'Harika! {emotion} yüzü yaptın!').replace('{emotion}', localizedTargetEmotion), speechLocale);
      setTimeout(() => {
        setShowFeedback(false);
        setShowCelebration(false);
        onAdvance(true);
      }, 2500);
    } else {
      await playEffect('incorrect');
      await speak(t('emotionPuppet.feedback.incorrect', 'Tekrar dene!'), speechLocale);
      setTimeout(() => {
        setShowFeedback(false);
      }, 1500);
    }
  }, [selectedEyes, selectedMouth, selectedEyebrows, roundData, onAdvance, speechLocale, localizedTargetEmotion]);

  const emotions = ['happy', 'sad', 'angry', 'surprised'] as const;

  const getEyebrowEmotion = () => {
    if (!selectedEyebrows) return null;
    return selectedEyebrows.replace('-brows', '');
  };

  const getEyeEmotion = () => {
    if (!selectedEyes) return null;
    return selectedEyes.replace('-eyes', '');
  };

  const getMouthEmotion = () => {
    if (!selectedMouth) return null;
    return selectedMouth.replace('-mouth', '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 pb-24">
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 rounded-full animate-float-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#fbbf24', '#22d3ee', '#a855f7', '#10b981', '#f472b6', '#60a5fa'][i % 6],
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s',
              }}
            />
          ))}
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl w-full max-w-4xl mx-auto p-6 border border-purple-200">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors shadow-md"
            aria-label={t('app.back')}
          >
            <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
          </button>

          <div className="text-center flex-1 px-4">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              🎭 {t('emotionPuppet.title', 'Duygu Kuklası')}
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-4xl">{emotionEmoji[roundData.targetEmotion] || '😶'}</span>
              <span className="text-lg font-bold text-purple-700">{localizedTargetEmotion}</span>
              <span className="text-sm text-gray-500">yüzü yap!</span>
            </div>
          </div>

          <div className="px-4 py-2 bg-purple-100 rounded-full text-purple-700 font-bold">
            {currentCard}/{totalCards}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Sol: Yüz Önizleme */}
          <div className="flex flex-col items-center">
            <div className={`relative transition-all duration-500 ${showFeedback && isCorrect ? 'animate-bounce' : ''}`}>
              <svg viewBox="0 0 100 120" className="w-64 h-80 drop-shadow-xl">
                {/* Yüz - Sarı daire */}
                <circle cx="50" cy="55" r="48" fill="#fef3c7" stroke="#fbbf24" strokeWidth="3" />

                {/* Yanak kızarıklığı */}
                <ellipse cx="22" cy="65" rx="8" ry="5" fill="#fecaca" opacity="0.6" />
                <ellipse cx="78" cy="65" rx="8" ry="5" fill="#fecaca" opacity="0.6" />

                {/* Kaşlar */}
                <EyebrowsSVG emotion={getEyebrowEmotion()} side="left" />
                <EyebrowsSVG emotion={getEyebrowEmotion()} side="right" />

                {/* Gözler */}
                <EyesSVG emotion={getEyeEmotion()} side="left" />
                <EyesSVG emotion={getEyeEmotion()} side="right" />

                {/* Burun */}
                <ellipse cx="50" cy="68" rx="4" ry="5" fill="#fcd34d" />

                {/* Ağız */}
                <MouthSVG emotion={getMouthEmotion()} />
              </svg>

              {/* Geri bildirim rozeti */}
              {showFeedback && (
                <div className={`absolute -top-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg ${isCorrect ? 'bg-green-500' : 'bg-orange-400'
                  } animate-bounce`}>
                  {isCorrect ? '🎉' : '🤔'}
                </div>
              )}
            </div>

            {/* Hedef göstergesi */}
            <div className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-bold flex items-center gap-2 shadow-lg">
              <span>Hedef:</span>
              <span className="text-2xl">{emotionEmoji[roundData.targetEmotion]}</span>
              <span>{localizedTargetEmotion}</span>
            </div>
          </div>

          {/* Sağ: Parça Seçiciler */}
          <div className="space-y-6">

            {/* Kaşlar */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 shadow-md">
              <h3 className="text-center font-bold text-amber-700 mb-3 flex items-center justify-center gap-2">
                <span>🤨</span>
                <span>{t('emotionPuppet.selectEyebrows', 'Kaşları Seç')}</span>
              </h3>
              <div className="flex justify-center gap-3 flex-wrap">
                {emotions.map(emotion => (
                  <EmotionPartCard
                    key={`brows-${emotion}`}
                    emotion={emotion}
                    type="eyebrows"
                    isSelected={selectedEyebrows === `${emotion}-brows`}
                    onClick={() => setSelectedEyebrows(`${emotion}-brows`)}
                  />
                ))}
              </div>
            </div>

            {/* Gözler */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 shadow-md">
              <h3 className="text-center font-bold text-blue-700 mb-3 flex items-center justify-center gap-2">
                <span>👀</span>
                <span>{t('emotionPuppet.selectEyes', 'Gözleri Seç')}</span>
              </h3>
              <div className="flex justify-center gap-3 flex-wrap">
                {emotions.map(emotion => (
                  <EmotionPartCard
                    key={`eyes-${emotion}`}
                    emotion={emotion}
                    type="eyes"
                    isSelected={selectedEyes === `${emotion}-eyes`}
                    onClick={() => setSelectedEyes(`${emotion}-eyes`)}
                  />
                ))}
              </div>
            </div>

            {/* Ağız */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-4 shadow-md">
              <h3 className="text-center font-bold text-pink-700 mb-3 flex items-center justify-center gap-2">
                <span>👄</span>
                <span>{t('emotionPuppet.selectMouth', 'Ağzı Seç')}</span>
              </h3>
              <div className="flex justify-center gap-3 flex-wrap">
                {emotions.map(emotion => (
                  <EmotionPartCard
                    key={`mouth-${emotion}`}
                    emotion={emotion}
                    type="mouth"
                    isSelected={selectedMouth === `${emotion}-mouth`}
                    onClick={() => setSelectedMouth(`${emotion}-mouth`)}
                  />
                ))}
              </div>
            </div>

            {/* Kontrol Butonu */}
            <button
              onClick={handleCheck}
              disabled={!selectedEyes || !selectedMouth || !selectedEyebrows || showFeedback}
              className={`
                w-full py-4 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg
                ${!selectedEyes || !selectedMouth || !selectedEyebrows || showFeedback
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 hover:shadow-xl transform hover:scale-105 active:scale-95'
                }
              `}
            >
              ✨ {t('emotionPuppet.checkButton', 'Kontrol Et')}
            </button>
          </div>
        </div>

        {/* Geri Bildirim Mesajı */}
        {showFeedback && (
          <div className={`
            mt-6 p-5 rounded-2xl text-center font-bold text-xl
            transition-all duration-300 animate-fade-in
            ${isCorrect
              ? 'bg-gradient-to-r from-green-400 to-emerald-400 text-white shadow-lg'
              : 'bg-gradient-to-r from-orange-400 to-amber-400 text-white shadow-lg'
            }
          `}>
            {isCorrect
              ? `🎉 ${t('emotionPuppet.feedback.correct', 'Harika! {emotion} yüzü yaptın!').replace('{emotion}', localizedTargetEmotion)}`
              : `💭 ${t('emotionPuppet.feedback.incorrect', 'Tekrar dene!')} - Doğru parçaları seç!`
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default EmotionPuppetScreen;
