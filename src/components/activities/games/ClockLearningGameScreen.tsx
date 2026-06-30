import React, { useState } from 'react';
import ArrowLeftIcon from '../../icons/ArrowLeftIcon.tsx';
import ClockFace from '../../common/ClockFace.tsx';
import { playEffect } from '../../../services/speechService.ts';

interface ClockLearningGameProps {
  onBack: () => void;
}

type QuestionType = 'read_analog' | 'find_analog' | 'set_clock';
type GamePhase = 'select_level' | 'playing' | 'game_over';

interface Time {
  h: number;
  m: number;
}

// 1: Tam(60), 2: Yarım(30), 3: Çeyrek(15), 4: 5dk(5), 5: 1dk(1)
const LEVEL_STEPS: Record<number, number> = {
  1: 60,
  2: 30,
  3: 15,
  4: 5,
  5: 1,
};

const formatDigital = (t: Time) => {
  // Use 12-hour format or 24-hour? Let's keep 12-hour for kids, or simple 0-12
  return `${t.h.toString().padStart(2, '0')}:${t.m.toString().padStart(2, '0')}`;
};

const normalizeTime = (t: Time): Time => {
  let { h, m } = t;
  if (m >= 60) {
    h += Math.floor(m / 60);
    m = m % 60;
  }
  if (m < 0) {
    h -= Math.ceil(Math.abs(m) / 60);
    m = 60 + (m % 60);
    if (m === 60) m = 0;
  }
  if (h > 12) h = h % 12;
  if (h <= 0) {
    h = 12 - (Math.abs(h) % 12);
  }
  if (h === 0) h = 12;
  return { h, m };
};

const ClockLearningGameScreen: React.FC<ClockLearningGameProps> = ({ onBack }) => {
  const [phase, setPhase] = useState<GamePhase>('select_level');
  const [level, setLevel] = useState(1);

  const [showConfetti, setShowConfetti] = useState(false);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);

  const [questionType, setQuestionType] = useState<QuestionType>('read_analog');
  const [targetTime, setTargetTime] = useState<Time>({ h: 12, m: 0 });
  const [options, setOptions] = useState<Time[]>([]);
  const [selectedOption, setSelectedOption] = useState<Time | null>(null);

  // For 'set_clock' mode
  const [userTime, setUserTime] = useState<Time>({ h: 12, m: 0 });

  const generateTime = (lvl: number): Time => {
    const step = LEVEL_STEPS[lvl] || 60;
    const h = Math.floor(Math.random() * 12) + 1;
    let possibleMinutes = [];
    for (let i = 0; i < 60; i += step) possibleMinutes.push(i);
    const m = possibleMinutes[Math.floor(Math.random() * possibleMinutes.length)];
    return { h, m };
  };

  const setupRound = (lvl: number) => {
    const target = generateTime(lvl);
    setTargetTime(target);
    
    // Choose question type (equal probability)
    const types: QuestionType[] = ['read_analog', 'find_analog', 'set_clock'];
    setQuestionType(types[Math.floor(Math.random() * types.length)]);
    
    const opts = [target];
    while(opts.length < 3) {
      const wrong = generateTime(lvl);
      if (!opts.find(o => o.h === wrong.h && o.m === wrong.m)) {
        opts.push(wrong);
      }
    }
    setOptions(opts.sort(() => Math.random() - 0.5));
    setSelectedOption(null);

    // Initialize user time for set_clock to a random DIFFERENT time
    let initUserTime = generateTime(lvl);
    while (initUserTime.h === target.h && initUserTime.m === target.m) {
      initUserTime = generateTime(lvl);
    }
    setUserTime(initUserTime);
  };

  const startGame = (lvl: number) => {
    setLevel(lvl);
    setRound(1);
    setScore(0);
    setPhase('playing');
    setupRound(lvl);
  };

  const handleCorrect = () => {
    playEffect('correct');
    setShowConfetti(true);
    setScore(s => s + 1);
    setTimeout(() => {
      setShowConfetti(false);
      if (round >= 10) {
        setPhase('game_over');
      } else {
        setRound(r => r + 1);
        setupRound(level);
      }
    }, 2000);
  };

  const handleWrong = () => {
    playEffect('incorrect');
    setTimeout(() => {
      setSelectedOption(null);
    }, 1000);
  };

  const handleSelect = (time: Time) => {
    if (selectedOption) return;
    setSelectedOption(time);

    const isCorrect = time.h === targetTime.h && time.m === targetTime.m;
    if (isCorrect) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  const handleCheckSetClock = () => {
    const isCorrect = userTime.h === targetTime.h && userTime.m === targetTime.m;
    if (isCorrect) {
      handleCorrect();
    } else {
      handleWrong();
    }
  };

  const adjustTime = (type: 'h' | 'm', amount: number) => {
    setUserTime(prev => {
      let newTime = { ...prev };
      if (type === 'h') newTime.h += amount;
      if (type === 'm') newTime.m += amount;
      return normalizeTime(newTime);
    });
  };

  if (phase === 'select_level') {
    return (
      <div className="w-full h-full flex flex-col bg-sky-50 p-6">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="p-3 bg-white rounded-full shadow text-sky-600 active:scale-95">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-black text-sky-800 ml-4">Saat Öğreniyorum</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
          <h2 className="text-2xl font-bold text-slate-700 mb-6">Bir Zorluk Seviyesi Seç</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <button onClick={() => startGame(1)} className="p-6 bg-white rounded-3xl shadow-md border-b-4 border-sky-200 hover:-translate-y-1 active:translate-y-0 transition-all flex flex-col items-center">
              <span className="text-3xl mb-2">🕛</span>
              <span className="font-bold text-sky-800 text-lg">Seviye 1</span>
              <span className="text-sky-600 text-sm">Tam Saatler</span>
            </button>
            <button onClick={() => startGame(2)} className="p-6 bg-white rounded-3xl shadow-md border-b-4 border-green-200 hover:-translate-y-1 active:translate-y-0 transition-all flex flex-col items-center">
              <span className="text-3xl mb-2">🕧</span>
              <span className="font-bold text-green-800 text-lg">Seviye 2</span>
              <span className="text-green-600 text-sm">Buçuklu Saatler</span>
            </button>
            <button onClick={() => startGame(3)} className="p-6 bg-white rounded-3xl shadow-md border-b-4 border-amber-200 hover:-translate-y-1 active:translate-y-0 transition-all flex flex-col items-center">
              <span className="text-3xl mb-2">🕒</span>
              <span className="font-bold text-amber-800 text-lg">Seviye 3</span>
              <span className="text-amber-600 text-sm">Çeyrek Saatler</span>
            </button>
            <button onClick={() => startGame(4)} className="p-6 bg-white rounded-3xl shadow-md border-b-4 border-purple-200 hover:-translate-y-1 active:translate-y-0 transition-all flex flex-col items-center">
              <span className="text-3xl mb-2">🕓</span>
              <span className="font-bold text-purple-800 text-lg">Seviye 4</span>
              <span className="text-purple-600 text-sm">5'er Dakikalık</span>
            </button>
            <button onClick={() => startGame(5)} className="p-6 bg-white rounded-3xl shadow-md border-b-4 border-rose-200 hover:-translate-y-1 active:translate-y-0 transition-all flex flex-col items-center sm:col-span-2">
              <span className="text-3xl mb-2">⏱️</span>
              <span className="font-bold text-rose-800 text-lg">Seviye 5</span>
              <span className="text-rose-600 text-sm">Dakika Dakika (Uzman)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'game_over') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-sky-50">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-8xl animate-bounce">🏆</div>
        </div>
        <h1 className="text-5xl font-black text-sky-800 mb-6 z-10">Tebrikler!</h1>
        <p className="text-3xl font-bold text-sky-600 mb-12 z-10">Puanın: {score} / 10</p>
        
        <div className="flex gap-4 z-10">
          <button 
            onClick={() => setPhase('select_level')}
            className="px-8 py-4 bg-white text-sky-600 border-2 border-sky-200 rounded-full font-bold text-xl shadow-lg active:scale-95"
          >
            Seviye Seç
          </button>
          <button 
            onClick={onBack}
            className="px-8 py-4 bg-sky-500 text-white rounded-full font-bold text-xl shadow-lg active:scale-95"
          >
            Menüye Dön
          </button>
        </div>
      </div>
    );
  }

  const step = LEVEL_STEPS[level] || 60;

  return (
    <div className="w-full h-full flex flex-col bg-sky-50 overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="text-8xl animate-bounce">✨🎉🌟</div>
        </div>
      )}
      
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <button onClick={() => setPhase('select_level')} className="p-3 bg-white rounded-full shadow text-sky-600 active:scale-95">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
        <div className="text-xl font-bold text-sky-800">
          Seviye {level}
        </div>
        <div className="text-lg font-bold text-sky-600 bg-white px-4 py-2 rounded-full shadow">
          {round} / 10
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        
        {questionType === 'read_analog' && (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8 text-center">Saat Kaç?</h2>
            <div className="mb-12">
              <ClockFace hours={targetTime.h} minutes={targetTime.m} size={250} />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className={`px-8 py-4 text-4xl font-bold rounded-2xl shadow-md transition-all
                    ${selectedOption === opt && opt.h === targetTime.h && opt.m === targetTime.m ? 'bg-green-500 text-white' : 
                      selectedOption === opt ? 'bg-red-500 text-white animate-shake' : 'bg-white text-sky-800 hover:bg-sky-50 active:scale-95'}
                  `}
                >
                  {formatDigital(opt)}
                </button>
              ))}
            </div>
          </>
        )}

        {questionType === 'find_analog' && (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-8 text-center">Hangi saat <span className="text-sky-600">{formatDigital(targetTime)}</span> gösteriyor?</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt)}
                  className={`p-4 rounded-3xl shadow-md transition-all
                    ${selectedOption === opt && opt.h === targetTime.h && opt.m === targetTime.m ? 'bg-green-500 scale-110' : 
                      selectedOption === opt ? 'bg-red-500 animate-shake' : 'bg-white hover:scale-105 active:scale-95'}
                  `}
                >
                  <ClockFace hours={opt.h} minutes={opt.m} size={150} />
                </button>
              ))}
            </div>
          </>
        )}

        {questionType === 'set_clock' && (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-6 text-center">Saati <span className="text-sky-600">{formatDigital(targetTime)}</span> yap!</h2>
            
            <div className="mb-8">
              <ClockFace hours={userTime.h} minutes={userTime.m} size={250} />
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex gap-4 items-center justify-center">
                <div className="flex bg-white rounded-full shadow-md overflow-hidden">
                  <button onClick={() => adjustTime('h', -1)} className="px-6 py-3 bg-rose-100 text-rose-700 font-bold text-xl hover:bg-rose-200 active:bg-rose-300">- Saat</button>
                  <button onClick={() => adjustTime('h', 1)} className="px-6 py-3 bg-emerald-100 text-emerald-700 font-bold text-xl hover:bg-emerald-200 active:bg-emerald-300">+ Saat</button>
                </div>
              </div>
              <div className="flex gap-4 items-center justify-center">
                <div className="flex bg-white rounded-full shadow-md overflow-hidden">
                  <button onClick={() => adjustTime('m', -step)} className="px-6 py-3 bg-rose-100 text-rose-700 font-bold text-xl hover:bg-rose-200 active:bg-rose-300">- {step} Dk</button>
                  <button onClick={() => adjustTime('m', step)} className="px-6 py-3 bg-emerald-100 text-emerald-700 font-bold text-xl hover:bg-emerald-200 active:bg-emerald-300">+ {step} Dk</button>
                </div>
              </div>
            </div>

            <button 
              onClick={handleCheckSetClock}
              disabled={showConfetti} // Prevent spamming
              className="px-12 py-4 bg-sky-500 text-white rounded-full font-black text-2xl shadow-lg hover:bg-sky-400 active:scale-95 disabled:opacity-50"
            >
              KONTROL ET
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default ClockLearningGameScreen;
