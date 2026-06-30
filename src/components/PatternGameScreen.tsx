import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { t } from '../i18n/index.ts';

interface PatternGameScreenProps {
  onBack: () => void;
}

// Tren vagonu için kargo emojileri
const CARGO_EMOJIS = ['🍎', '🍊', '🍋', '🍇', '🍓', '🌟', '💎', '🎁', '🧸', '🎈', '🍪', '🧁'];

// Pattern tipleri
type PatternType = 'ABAB' | 'AABB' | 'ABCABC' | 'AABA' | 'ABB' | 'ABBA';

interface Level {
  patternType: PatternType;
  repeatCount: number;
  itemCount: number;
}

const LEVELS: Level[] = [
  { patternType: 'ABAB', repeatCount: 3, itemCount: 2 },
  { patternType: 'AABB', repeatCount: 2, itemCount: 2 },
  { patternType: 'ABB', repeatCount: 3, itemCount: 2 },
  { patternType: 'AABA', repeatCount: 2, itemCount: 2 },
  { patternType: 'ABCABC', repeatCount: 2, itemCount: 3 },
  { patternType: 'ABBA', repeatCount: 2, itemCount: 2 },
];

// Pattern oluşturucu
const generatePatternSequence = (type: PatternType, items: string[], repeatCount: number): string[] => {
  let unit: string[] = [];

  switch (type) {
    case 'ABAB':
      unit = [items[0], items[1]];
      break;
    case 'AABB':
      unit = [items[0], items[0], items[1], items[1]];
      break;
    case 'ABB':
      unit = [items[0], items[1], items[1]];
      break;
    case 'AABA':
      unit = [items[0], items[0], items[1], items[0]];
      break;
    case 'ABCABC':
      unit = [items[0], items[1], items[2]];
      break;
    case 'ABBA':
      unit = [items[0], items[1], items[1], items[0]];
      break;
  }

  const sequence: string[] = [];
  for (let i = 0; i < repeatCount; i++) {
    sequence.push(...unit);
  }
  return sequence;
};

// Doğru cevabı bul
const getCorrectAnswer = (sequence: string[], type: PatternType): string => {
  // Pattern'in devamı
  const unitLength = type === 'ABAB' ? 2 :
    type === 'AABB' ? 4 :
      type === 'ABB' ? 3 :
        type === 'AABA' ? 4 :
          type === 'ABCABC' ? 3 :
            type === 'ABBA' ? 4 : 2;

  const nextIndex = sequence.length % unitLength;
  // Birim başına dön
  return sequence[nextIndex];
};

const PatternGameScreen: React.FC<PatternGameScreenProps> = ({ onBack }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [pattern, setPattern] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [trainPosition, setTrainPosition] = useState(-100);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
  const [usedEmojis, setUsedEmojis] = useState<string[]>([]);

  // Ekran yönü algılama
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ses çalma
  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio error:', e);
    }
  }, []);

  // Tren sesi
  const playTrainSound = useCallback(() => {
    // Tüdü tüdüüü
    playSound(400, 0.2);
    setTimeout(() => playSound(500, 0.3), 200);
  }, [playSound]);

  // Başarı melodisi
  const playSuccessSound = useCallback(() => {
    [523, 659, 784, 1047].forEach((freq, i) => {
      setTimeout(() => playSound(freq, 0.15), i * 100);
    });
  }, [playSound]);

  // Yanlış sesi
  const playWrongSound = useCallback(() => {
    playSound(200, 0.3, 'sawtooth');
  }, [playSound]);

  // Yeni seviye oluştur
  const generateLevel = useCallback(() => {
    const currentLevel = LEVELS[level % LEVELS.length];

    // Rastgele emoji seç (kullanılmamışlardan)
    const availableEmojis = CARGO_EMOJIS.filter((e) => !usedEmojis.includes(e));
    const pool = availableEmojis.length >= currentLevel.itemCount ? availableEmojis : CARGO_EMOJIS;

    const selectedItems: string[] = [];
    const tempPool = [...pool];
    for (let i = 0; i < currentLevel.itemCount; i++) {
      const idx = Math.floor(Math.random() * tempPool.length);
      selectedItems.push(tempPool[idx]);
      tempPool.splice(idx, 1);
    }

    // Pattern oluştur
    const sequence = generatePatternSequence(currentLevel.patternType, selectedItems, currentLevel.repeatCount);

    // Doğru cevap
    const answer = getCorrectAnswer(sequence, currentLevel.patternType);

    // Seçenekler (doğru cevap + 3 yanlış)
    // Yanlış seçenekler: pattern'de OLMAYAN emojilerden seç
    const wrongOptions = CARGO_EMOJIS.filter((e) => !selectedItems.includes(e));
    const shuffledWrong = wrongOptions.sort(() => Math.random() - 0.5).slice(0, 3);
    // Doğru cevabı kesinlikle ekle!
    const allOptions = [answer, ...shuffledWrong].sort(() => Math.random() - 0.5);

    setPattern(sequence);
    setCorrectAnswer(answer);
    setOptions(allOptions);
    setSelectedOption(null);
    setIsCorrect(null);
    setUsedEmojis((prev) => [...prev, ...selectedItems].slice(-6));

    // Tren animasyonu
    setTrainPosition(-100);
    playTrainSound();

    // Tren içeri girer
    let pos = -100;
    const animateIn = () => {
      pos += 5;
      setTrainPosition(pos);
      setWheelRotation((prev) => prev + 15);
      if (pos < 0) {
        requestAnimationFrame(animateIn);
      }
    };
    requestAnimationFrame(animateIn);
  }, [level, usedEmojis, playTrainSound]);

  // İlk yükleme ve seviye değişimi
  useEffect(() => {
    generateLevel();
  }, [level]);

  // Seçenek tıklama
  const handleOptionClick = useCallback((option: string) => {
    if (selectedOption !== null) return;

    setSelectedOption(option);

    if (option === correctAnswer) {
      // Doğru!
      setIsCorrect(true);
      setScore((prev) => prev + 10 * (level + 1));
      playSuccessSound();

      // Tren dışarı çıkar
      let pos = trainPosition;
      const animateOut = () => {
        pos += 6;
        setTrainPosition(pos);
        setWheelRotation((prev) => prev + 20);
        if (pos < 120) {
          requestAnimationFrame(animateOut);
        } else {
          // Sonraki seviye
          setTimeout(() => {
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
              setLevel((prev) => prev + 1);
            }, 1000);
          }, 300);
        }
      };
      requestAnimationFrame(animateOut);
    } else {
      // Yanlış
      setIsCorrect(false);
      playWrongSound();

      // Sarsıntı efekti
      setTimeout(() => {
        setSelectedOption(null);
        setIsCorrect(null);
      }, 1000);
    }
  }, [selectedOption, correctAnswer, level, trainPosition, playSuccessSound, playWrongSound]);

  // Vagon boyutları - BÜYÜK
  const wagonSize = useMemo(() => {
    const baseSize = isLandscape ? 90 : 80;
    const maxWagons = pattern.length + 2; // lokomotif + soru vagonu
    const maxWidth = isLandscape ? window.innerWidth * 0.92 : window.innerWidth * 0.95;
    const calculatedSize = maxWidth / maxWagons;
    return Math.max(65, Math.min(baseSize, calculatedSize));
  }, [isLandscape, pattern.length]);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-green-300 flex flex-col overflow-hidden">
      {/* Gökyüzü dekorasyonları */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Bulutlar */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/80 select-none"
            style={{
              left: `${10 + i * 20}%`,
              top: `${5 + (i % 3) * 8}%`,
              fontSize: `${30 + (i % 3) * 15}px`,
              animation: `float ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 1.5}s`
            }}
          >
            ☁️
          </div>
        ))}

        {/* Güneş */}
        <div
          className="absolute text-6xl select-none"
          style={{
            right: '5%',
            top: '5%',
            animation: 'pulse 3s ease-in-out infinite'
          }}
        >
          ☀️
        </div>
      </div>

      {/* Başlık çubuğu */}
      <div className="relative z-20 flex items-center justify-between px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all text-white font-bold"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="hidden sm:inline">{t('common.back', 'Geri')}</span>
        </button>

        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">
          🚂 {t('miniGames.pattern.title', 'Örüntü Treni')}
        </h1>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="px-3 py-1.5 bg-white/20 rounded-xl text-white font-bold text-sm sm:text-base">
            ⭐ {score}
          </div>
          <div className="px-3 py-1.5 bg-white/20 rounded-xl text-white font-bold text-sm sm:text-base">
            📊 {level + 1}
          </div>
        </div>
      </div>

      {/* Talimat */}
      <div className="relative z-10 text-center py-2 px-4">
        <p className="text-amber-800 font-semibold text-sm sm:text-base bg-white/70 inline-block px-4 py-1.5 rounded-full shadow">
          🤔 {t('miniGames.pattern.instruction', 'Sıradaki vagonun yükü ne olmalı?')}
        </p>
      </div>

      {/* Tren alanı */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Raylar */}
        <div
          className="absolute bottom-28 left-0 right-0 h-10"
          style={{
            background: `
              repeating-linear-gradient(
                90deg,
                #5D4E37 0px,
                #5D4E37 40px,
                transparent 40px,
                transparent 60px
              ),
              linear-gradient(0deg, #8B7355 0%, #6B5344 100%)
            `,
            borderTop: '3px solid #4A3728',
            borderBottom: '3px solid #4A3728'
          }}
        />

        {/* Tren konteyneri */}
        <div
          className="absolute flex items-end transition-transform duration-100"
          style={{
            bottom: '112px',
            left: `${trainPosition}%`,
            transform: 'translateX(-50%)'
          }}
        >
          {/* Lokomotif */}
          <div
            className="relative flex flex-col items-center mr-1"
            style={{ width: wagonSize * 1.3, height: wagonSize * 1.5 }}
          >
            {/* Baca */}
            <div
              className="absolute -top-4 left-1/4 w-4 h-6 bg-gray-700 rounded-t-lg"
              style={{
                boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {/* Duman */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl animate-bounce">💨</div>
            </div>

            {/* Kabin */}
            <div
              className="w-full h-3/4 bg-gradient-to-b from-red-500 to-red-700 rounded-t-xl"
              style={{
                boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.3), inset 0 -4px 8px rgba(0,0,0,0.2)'
              }}
            >
              {/* Pencere */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2/3 h-6 bg-sky-200 rounded border-2 border-gray-800" />

              {/* Işık */}
              <div className="absolute top-8 right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse" />
            </div>

            {/* Alt gövde */}
            <div className="w-full h-1/4 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b" />

            {/* Tekerlekler */}
            <div className="absolute -bottom-3 left-1 flex gap-1">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-gray-800 rounded-full border-2 border-gray-600 flex items-center justify-center"
                  style={{ transform: `rotate(${wheelRotation}deg)` }}
                >
                  <div className="w-1 h-full bg-gray-500" />
                  <div className="absolute w-full h-1 bg-gray-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Bağlantı çubukları ve Vagonlar */}
          {pattern.map((cargo, index) => (
            <React.Fragment key={index}>
              {/* Bağlantı çubuğu */}
              <div
                className="w-3 h-2 bg-gray-600 self-center -mx-1"
                style={{ marginBottom: wagonSize * 0.3 }}
              />

              {/* Vagon */}
              <div
                className="relative flex flex-col items-center"
                style={{ width: wagonSize, height: wagonSize * 1.2 }}
              >
                {/* Vagon gövdesi */}
                <div
                  className="w-full h-full rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(145deg, #8B7355 0%, #6B5344 100%)',
                    boxShadow: `
                      inset 0 3px 6px rgba(255,255,255,0.2),
                      inset 0 -3px 6px rgba(0,0,0,0.3),
                      0 4px 8px rgba(0,0,0,0.3)
                    `,
                    border: '3px solid #5D4E37'
                  }}
                >
                  {/* Kargo */}
                  <span style={{ fontSize: wagonSize * 0.5 }}>{cargo}</span>
                </div>

                {/* Tekerlekler */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                  {[0, 1].map((i) => (
                    <div
                      key={i}
                      className="w-4 h-4 bg-gray-800 rounded-full border border-gray-600"
                      style={{ transform: `rotate(${wheelRotation}deg)` }}
                    >
                      <div className="w-0.5 h-full bg-gray-500 mx-auto" />
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}

          {/* Bağlantı çubuğu - Soru vagonu için */}
          <div
            className="w-3 h-2 bg-gray-600 self-center -mx-1"
            style={{ marginBottom: wagonSize * 0.3 }}
          />

          {/* Soru vagonu */}
          <div
            className="relative flex flex-col items-center"
            style={{ width: wagonSize, height: wagonSize * 1.2 }}
          >
            <div
              className={`w-full h-full rounded-lg flex items-center justify-center transition-all ${isCorrect === false ? 'animate-shake' : ''
                }`}
              style={{
                background: selectedOption
                  ? isCorrect
                    ? 'linear-gradient(145deg, #4ADE80 0%, #22C55E 100%)'
                    : 'linear-gradient(145deg, #F87171 0%, #EF4444 100%)'
                  : 'linear-gradient(145deg, #FCD34D 0%, #F59E0B 100%)',
                boxShadow: `
                  inset 0 3px 6px rgba(255,255,255,0.3),
                  inset 0 -3px 6px rgba(0,0,0,0.2),
                  0 4px 8px rgba(0,0,0,0.3)
                `,
                border: '3px dashed #854D0E',
                animation: !selectedOption ? 'pulse 1.5s ease-in-out infinite' : 'none'
              }}
            >
              <span style={{ fontSize: wagonSize * 0.5 }}>
                {selectedOption || '❓'}
              </span>
            </div>

            {/* Tekerlekler */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className="w-4 h-4 bg-gray-800 rounded-full border border-gray-600"
                  style={{ transform: `rotate(${wheelRotation}deg)` }}
                >
                  <div className="w-0.5 h-full bg-gray-500 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Çim */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-green-600 to-green-400" />
      </div>

      {/* Seçenekler */}
      <div className="relative z-10 px-4 pb-4">
        <div className="bg-white/90 rounded-2xl p-4 shadow-xl">
          <p className="text-center text-gray-600 font-semibold mb-3 text-sm">
            👇 {t('miniGames.pattern.selectCargo', 'Bir kargo seç:')}
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                disabled={selectedOption !== null}
                className={`
                  w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center
                  text-3xl sm:text-4xl transition-all transform
                  ${selectedOption === option
                    ? isCorrect
                      ? 'bg-green-400 scale-110 ring-4 ring-green-500'
                      : 'bg-red-400 scale-95 animate-shake'
                    : 'bg-amber-100 hover:bg-amber-200 hover:scale-105 active:scale-95'
                  }
                  ${selectedOption !== null && selectedOption !== option ? 'opacity-50' : ''}
                  shadow-lg border-2 border-amber-300
                `}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Başarı bildirimi */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-bounce-in">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600">
              {t('miniGames.correct', 'Doğru!')}
            </h2>
            <p className="text-amber-600 font-bold mt-2">+{10 * (level + 1)} ⭐</p>
          </div>
        </div>
      )}

      {/* Animasyon stilleri */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-10px) translateX(5px); }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes bounce-in {
          0% { transform: scale(0.5); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-shake {
          animation: shake 0.3s ease-in-out 3;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PatternGameScreen;
