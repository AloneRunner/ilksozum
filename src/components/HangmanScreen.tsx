import React, { useState, useEffect, useCallback } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { playEffect, speak } from '../services/speechService.ts';
import { getRandomWordIntl, getAlphabetForLang, getUppercaseLocaleForLang } from '../data/hangmanWords.ts';
import { t, getCurrentLanguage } from '../i18n/index.ts';
import { getSpeechLocale } from '../utils/translate.ts';

interface HangmanScreenProps {
  onBack: () => void;
}

const MAX_WRONG_GUESSES = 6;
// Çocuğun elindeki 6 balon (yay şeklinde)
const EL_Y = 196;
const BALONLAR = [
  { x: 38, y: 92, renk: '#ef4444' },
  { x: 72, y: 58, renk: '#f97316' },
  { x: 108, y: 40, renk: '#eab308' },
  { x: 144, y: 58, renk: '#22c55e' },
  { x: 168, y: 98, renk: '#3b82f6' },
  { x: 102, y: 102, renk: '#a855f7' },
];

const HangmanScreen: React.FC<HangmanScreenProps> = ({ onBack }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [category, setCategory] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [isLandscape, setIsLandscape] = useState<boolean>(false);
  const lang = getCurrentLanguage();
  const upperLocale = getUppercaseLocaleForLang(lang);
  const speechLocale = getSpeechLocale(lang as any);
  const ALPHABET = getAlphabetForLang(lang);

  // Yeni oyun başlat
  const startNewGame = useCallback(() => {
    const { word, category: cat } = getRandomWordIntl(lang);
    setCurrentWord(word.toLocaleUpperCase(upperLocale));
    setCategory(cat);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus('playing');
  }, [lang, upperLocale]);

  // İlk yükleme
  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  // Küçük ekranlar + orientation tespiti (dikey 820px ve altı, ya da en fazla 440px genişlik; ayrıca landscape düzeni kur)
  useEffect(() => {
    const updateCompact = () => {
      const h = window.innerHeight || document.documentElement.clientHeight;
      const w = window.innerWidth || document.documentElement.clientWidth;
      setIsCompact(h <= 820 || w <= 440);
      setIsLandscape(w > h);
    };
    updateCompact();
    window.addEventListener('resize', updateCompact);
    window.addEventListener('orientationchange', updateCompact as any);
    return () => {
      window.removeEventListener('resize', updateCompact);
      window.removeEventListener('orientationchange', updateCompact as any);
    };
  }, []);

  // Kelimeyi göster (tahmin edilen harflerle)
  const displayWord = currentWord
    .split('')
    .map((letter) => (guessedLetters.has(letter) ? letter : '_'))
    .join(' ');

  // Harf tahmini
  const handleLetterGuess = useCallback(async (letter: string) => {
    if (gameStatus !== 'playing') return;
    // Aynı harfe ikinci kez basılırsa görmezden gel
    if (guessedLetters.has(letter)) return;

    // Harfi ekle (fonksiyonel set ile yarış durumlarını engelle)
    setGuessedLetters(prev => {
      const next = new Set(prev);
      next.add(letter);
      return next;
    });

    if (currentWord.includes(letter)) {
      // Önce state mantığını çalıştır, sesi arka planda çal (bekleme yok)
      playEffect('correct');
      // Tüm harfler bulundu mu kontrol et (state henüz güncellenmediği için manuel set kullan)
      const allLettersGuessed = currentWord.split('').every(l => l === letter || guessedLetters.has(l));
      if (allLettersGuessed) {
        setGameStatus('won');
        setTimeout(async () => {
          await playEffect('finish');
          await speak(t('games.hangman.speak.win', 'Tebrikler! Kelimeyi buldun!'), speechLocale);
        }, 250);
      }
    } else {
      // Sesi beklemeden çal; state güncellemesi anında gerçekleşsin
      playEffect('softincorrect');
      // Yanlış tahmin sayısını fonksiyonel olarak arttır
      setWrongGuesses(prev => {
        const updated = prev + 1;
        if (updated >= MAX_WRONG_GUESSES) {
          setGameStatus('lost');
          setTimeout(async () => {
            await speak(`${t('games.hangman.speak.wordWas', 'Kelime')} ${currentWord}`, speechLocale);
          }, 250);
        }
        return updated;
      });
    }
  }, [gameStatus, currentWord, guessedLetters, speechLocale]);

  // Klavye desteği
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLocaleUpperCase(upperLocale);
      if (ALPHABET.includes(key)) {
        handleLetterGuess(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleLetterGuess]);

  // (KULLANILMIYOR) Eskiden ayrı renderHangman fonksiyonu vardı; kompakt düzen için inline SVG kullanıyoruz.

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 ${isCompact ? 'p-2 pb-6' : 'p-4 pb-10'} ${isLandscape ? 'flex items-center justify-center' : ''}`}>
  <div className={`bg-white rounded-2xl shadow-xl w-full ${isLandscape ? 'max-w-5xl flex flex-col' : ''} ${isCompact && !isLandscape ? 'p-3 max-w-sm mx-auto' : isLandscape ? 'p-4 mx-2' : 'p-6 max-w-2xl mx-auto'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={t('app.back')}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className={`${isCompact ? 'text-xl' : 'text-2xl'} font-bold text-purple-600`}>🎮 {t('reasoning.activities.hangman.title', 'Adam Asmaca')}</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Oyun Alanı */}
  <div className={`${isLandscape ? 'flex flex-row gap-6 mb-2 items-start' : `grid md:grid-cols-2 ${isCompact ? 'gap-3 mb-3' : 'gap-8 mb-8'}`}` }>
          {/* Sol taraf: Adam çizimi */}
          <div className={`flex flex-col items-center ${isLandscape ? 'w-[220px] flex-shrink-0' : ''}`}>
            <div className={`bg-white rounded-lg ${isCompact ? 'p-4' : 'p-6'} shadow-inner ${isLandscape ? 'mb-2 -mt-1' : 'mb-4'}`}>
              {/* Kaan: asılan adam yerine balonlar. Her yanlış harfte bir balon uçup gider. */}
              <svg
                viewBox="0 0 200 250"
                className="w-full h-full overflow-visible"
                style={{ maxWidth: isCompact ? '150px' : isLandscape ? '180px' : '200px', maxHeight: isCompact ? '190px' : isLandscape ? '220px' : '250px' }}
              >
                {BALONLAR.map((b, i) => {
                  const uctu = i < wrongGuesses;
                  return (
                    <g key={i} style={{ transform: uctu ? 'translate(0px, -170px)' : 'none', opacity: uctu ? 0 : 1, transition: 'transform 1.4s ease-in, opacity 1.4s ease-in' }}>
                      <path d={`M ${b.x} ${b.y + 26} Q ${(b.x + 100) / 2 + 6} ${(b.y + 200) / 2} 100 ${EL_Y}`} stroke="#94a3b8" strokeWidth="1.5" fill="none" />
                      <ellipse cx={b.x} cy={b.y} rx="19" ry="24" fill={b.renk} />
                      <ellipse cx={b.x - 6} cy={b.y - 9} rx="5" ry="7" fill="white" opacity="0.45" />
                      <path d={`M ${b.x - 4} ${b.y + 26} L ${b.x} ${b.y + 22} L ${b.x + 4} ${b.y + 26} Z`} fill={b.renk} />
                    </g>
                  );
                })}
                <text x="100" y="242" fontSize="54" textAnchor="middle">{gameStatus === 'lost' ? '😮' : gameStatus === 'won' ? '😄' : '🧒'}</text>
              </svg>
            </div>
            <div className={`text-center ${isLandscape ? 'mt-1' : ''}`}>
              <p className={`${isCompact ? 'text-[11px]' : 'text-sm'} text-gray-600 mb-1`}>Kalan balon: {MAX_WRONG_GUESSES - wrongGuesses}</p>
            </div>
          </div>

          {/* Sağ taraf: Kelime ve kategori */}
          <div className={`flex flex-col ${isLandscape ? 'flex-1 justify-start pr-2' : 'items-center justify-center'}`}>
            <div className={`${isCompact ? 'mb-3' : 'mb-4'}`}>
              <p className={`${isCompact ? 'text-[11px]' : 'text-sm'} text-gray-600 text-center mb-1`}>{t('games.hangman.category', 'Kategori')}</p>
              <p className={`${isCompact ? 'text-base' : 'text-xl'} font-semibold text-purple-600 text-center`}>
                {category}
              </p>
            </div>

            {/* Kelime */}
            <div className={`bg-white rounded-lg ${isCompact ? 'p-3' : isLandscape ? 'p-5' : 'p-8'} shadow-lg ${isCompact ? 'mb-3' : 'mb-6'}`}>
              <p className={`${isCompact ? 'text-2xl tracking-wide' : isLandscape ? 'text-3xl' : 'text-4xl'} font-bold text-center font-mono`}>
                {displayWord}
              </p>
            </div>

            {/* Landscape klavye burada */}
            {isLandscape && (
              <div className="mt-2">
                <p className="text-xs text-gray-600 mb-1 text-center">{t('games.hangman.pickLetter', 'Harf seç')}</p>
                <div className="grid grid-cols-12 gap-1">
                  {ALPHABET.map(letter => {
                    const isGuessed = guessedLetters.has(letter);
                    const isCorrect = isGuessed && currentWord.includes(letter);
                    const isWrong = isGuessed && !currentWord.includes(letter);
                    return (
                      <button
                        key={letter}
                        onClick={() => handleLetterGuess(letter)}
                        disabled={isGuessed || gameStatus !== 'playing'}
                        className={`p-2 text-xs rounded-md font-bold transition-all
                          ${isCorrect ? 'bg-green-500 text-white' : isWrong ? 'bg-red-500 text-white' : gameStatus === 'playing' ? 'bg-white border border-purple-200 hover:bg-purple-100 hover:border-purple-400' : 'bg-gray-200 text-gray-400'}
                          ${isGuessed || gameStatus !== 'playing' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >{letter}</button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Oyun durumu mesajları */}
            {gameStatus === 'won' && (
              <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 mb-4 text-center">
                <p className="text-2xl font-bold text-green-700">🎉 {t('games.hangman.youWinTitle', 'Tebrikler!')}</p>
                <p className="text-green-600">{t('games.hangman.youWinDesc', 'Kelimeyi buldun!')}</p>
              </div>
            )}

            {gameStatus === 'lost' && (
              <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 mb-4 text-center">
                <p className="text-2xl font-bold text-orange-600">🎈 Balonlar uçtu!</p>
                <p className="text-orange-700">
                  {t('games.hangman.wordLabel', 'Kelime')}: <span className="font-bold">{currentWord}</span>
                </p>
              </div>
            )}

            {/* Yeni Oyun butonu */}
            {gameStatus !== 'playing' && (
              <button
                onClick={startNewGame}
                className={`${isCompact ? 'px-5 py-2.5' : 'px-6 py-3'} bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg`}
              >
                🔄 {t('games.hangman.newGame', 'Yeni Oyun')}
              </button>
            )}
          </div>
        </div>

        {/* Alfabe */}
        {!isLandscape && (
          <div className={`border-t ${isLandscape ? 'pt-3' : 'pt-6'}`}>
            <p className={`${isCompact ? 'text-[11px]' : 'text-sm'} text-gray-600 text-center mb-2`}>
              {t('games.hangman.pickLetter', 'Harf seç')}
            </p>
            <div className={`${`grid ${isCompact ? 'grid-cols-9' : 'grid-cols-7'} sm:grid-cols-10 gap-1.5 max-w-3xl`} mx-auto`}>
              {ALPHABET.map((letter) => {
                const isGuessed = guessedLetters.has(letter);
                const isCorrect = isGuessed && currentWord.includes(letter);
                const isWrong = isGuessed && !currentWord.includes(letter);
                return (
                  <button
                    key={letter}
                    onClick={() => handleLetterGuess(letter)}
                    disabled={isGuessed || gameStatus !== 'playing'}
                    className={`
                      ${isCompact ? 'p-2 text-sm' : 'p-3 text-lg'} rounded-md font-bold transition-all
                      ${
                        isCorrect
                          ? 'bg-green-500 text-white'
                          : isWrong
                          ? 'bg-red-500 text-white'
                          : gameStatus === 'playing'
                          ? 'bg-white hover:bg-purple-100 border border-purple-200 hover:border-purple-400'
                          : 'bg-gray-200 text-gray-400'
                      }
                      ${isGuessed || gameStatus !== 'playing' ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HangmanScreen;
