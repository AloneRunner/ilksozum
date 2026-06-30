import React, { useState, useEffect, useCallback } from 'react';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';

interface EmotionPuppetGameScreenProps {
  onBack: () => void;
}

// Yüz Parçaları Veritabanı
const FEATURES = {
  brows: [
    { id: 'normal', path: 'M20 35 Q40 35 60 35 M140 35 Q160 35 180 35', label: '😐' },
    { id: 'happy', path: 'M20 40 Q40 30 60 40 M140 40 Q160 30 180 40', label: '😊' },
    { id: 'angry', path: 'M20 25 Q40 45 60 45 M140 45 Q160 45 180 25', label: '😠' },
    { id: 'sad', path: 'M20 45 Q40 30 60 30 M140 30 Q160 30 180 45', label: '😢' },
    { id: 'surprised', path: 'M20 20 Q40 10 60 20 M140 20 Q160 10 180 20', label: '😲' },
    { id: 'worried', path: 'M25 40 Q40 28 55 38 M145 38 Q160 28 175 40', label: '😟' },
  ],
  eyes: [
    { id: 'open', paths: ['circle-40-70-15', 'circle-160-70-15', 'circle-40-70-8-white', 'circle-160-70-8-white'], label: '👀' },
    { id: 'happy', paths: ['arc-25-75-55-75-up', 'arc-145-75-175-75-up'], label: '😊' },
    { id: 'sad', paths: ['arc-25-65-55-65-down', 'arc-145-65-175-65-down'], label: '😢' },
    { id: 'closed', paths: ['line-25-70-55-70', 'line-145-70-175-70'], label: '😌' },
    { id: 'wink', paths: ['circle-40-70-15', 'circle-160-70-15', 'circle-40-70-8-white', 'line-145-75-175-75'], label: '😉' },
    { id: 'wide', paths: ['circle-40-70-18', 'circle-160-70-18', 'circle-40-70-10-white', 'circle-160-70-10-white'], label: '😳' },
    { id: 'sleepy', paths: ['arc-25-75-55-68-flat', 'arc-145-75-175-68-flat'], label: '😪' },
  ],
  mouth: [
    { id: 'smile', path: 'M50 120 Q100 160 150 120', label: '😊' },
    { id: 'big_smile', path: 'M40 115 Q100 170 160 115', label: '😃' },
    { id: 'sad', path: 'M50 150 Q100 110 150 150', label: '😢' },
    { id: 'neutral', path: 'M60 135 L140 135', label: '😐' },
    { id: 'open', path: 'M70 130 Q100 155 130 130 Q100 145 70 130 Z', label: '😮' },
    { id: 'surprised', path: 'M90 125 Q100 145 110 125 Q100 140 90 125 Z', label: '😲' },
    { id: 'laugh', path: 'M40 110 Q100 180 160 110 L160 125 Q100 195 40 125 Z', label: '😆' },
    { id: 'tongue', path: 'M50 125 Q100 165 150 125 M85 140 Q100 150 115 140', label: '😛' },
  ]
};

// Hedef Duygular
const EMOTIONS = [
  { 
    name: 'Mutlu 😊', 
    config: { brows: 'happy', eyes: 'happy', mouth: 'smile' }, 
    color: 'from-yellow-400 via-orange-300 to-yellow-400',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-400'
  },
  { 
    name: 'Çok Mutlu 😃', 
    config: { brows: 'happy', eyes: 'open', mouth: 'big_smile' }, 
    color: 'from-green-400 via-emerald-300 to-green-400',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-400'
  },
  { 
    name: 'Şaşkın 😲', 
    config: { brows: 'surprised', eyes: 'wide', mouth: 'surprised' }, 
    color: 'from-blue-400 via-cyan-300 to-blue-400',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-400'
  },
  { 
    name: 'Üzgün 😢', 
    config: { brows: 'sad', eyes: 'sad', mouth: 'sad' }, 
    color: 'from-indigo-400 via-blue-300 to-indigo-400',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-400'
  },
  { 
    name: 'Kızgın 😠', 
    config: { brows: 'angry', eyes: 'open', mouth: 'neutral' }, 
    color: 'from-red-400 via-orange-400 to-red-400',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-400'
  },
  { 
    name: 'Göz Kırp 😉', 
    config: { brows: 'happy', eyes: 'wink', mouth: 'smile' }, 
    color: 'from-pink-400 via-rose-300 to-pink-400',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-400'
  },
  { 
    name: 'Gülen 😆', 
    config: { brows: 'happy', eyes: 'happy', mouth: 'laugh' }, 
    color: 'from-amber-400 via-yellow-300 to-amber-400',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-400'
  },
  { 
    name: 'Şakacı 😛', 
    config: { brows: 'normal', eyes: 'wink', mouth: 'tongue' }, 
    color: 'from-purple-400 via-fuchsia-300 to-purple-400',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-400'
  },
  { 
    name: 'Endişeli 😟', 
    config: { brows: 'worried', eyes: 'sad', mouth: 'neutral' }, 
    color: 'from-slate-400 via-gray-300 to-slate-400',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-400'
  },
  { 
    name: 'Uykulu 😪', 
    config: { brows: 'sad', eyes: 'sleepy', mouth: 'neutral' }, 
    color: 'from-teal-400 via-cyan-300 to-teal-400',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-400'
  },
];

const EmotionPuppetGameScreen: React.FC<EmotionPuppetGameScreenProps> = ({ onBack }) => {
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [currentConfig, setCurrentConfig] = useState({ brows: 'normal', eyes: 'open', mouth: 'neutral' });
  const [isWon, setIsWon] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [shake, setShake] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [hint, setHint] = useState(0); // Kaç özellik doğru

  const audioContext = React.useRef<AudioContext | null>(null);

  const playSound = useCallback((frequency: number, duration: number = 0.1) => {
    try {
      if (!audioContext.current) {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContext.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error('Audio error:', e);
    }
  }, []);

  const playSuccess = useCallback(() => {
    [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
      setTimeout(() => playSound(freq, 0.15), i * 80);
    });
  }, [playSound]);

  const target = EMOTIONS[level % EMOTIONS.length];

  // Hint sistemi - kaç özellik doğru
  useEffect(() => {
    let correct = 0;
    if (currentConfig.brows === target.config.brows) correct++;
    if (currentConfig.eyes === target.config.eyes) correct++;
    if (currentConfig.mouth === target.config.mouth) correct++;
    setHint(correct);
  }, [currentConfig, target]);

  useEffect(() => {
    if (!isWon &&
      currentConfig.brows === target.config.brows &&
      currentConfig.eyes === target.config.eyes &&
      currentConfig.mouth === target.config.mouth
    ) {
      setIsWon(true);
      playSuccess();
      
      setTimeout(() => {
        setShowModal(true);
      }, 800);
    }
  }, [currentConfig, target, isWon, playSuccess]);

  const nextLevel = () => {
    setShowModal(false);
    setIsWon(false);
    setLevel(prev => prev + 1);
    setScore(prev => prev + 10);
    
    setCurrentConfig({
      brows: 'normal',
      eyes: 'open',
      mouth: 'neutral'
    });
  };

  const cycleFeature = (feature: 'brows' | 'eyes' | 'mouth') => {
    if (isWon) return;
    
    playSound(440, 0.05);
    setActiveFeature(feature);
    setTimeout(() => setActiveFeature(null), 200);
    
    const list = FEATURES[feature];
    const currentIndex = list.findIndex(f => f.id === currentConfig[feature]);
    const nextIndex = (currentIndex + 1) % list.length;
    
    const newConfig = {
      ...currentConfig,
      [feature]: list[nextIndex].id
    };
    
    setCurrentConfig(newConfig);

    // Yanlış seçim animasyonu
    if (list[nextIndex].id !== target.config[feature]) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  };

  // SVG path render
  const renderPath = (pathData: string, className: string = 'stroke-gray-800') => {
    return <path d={pathData} className={className} strokeWidth="8" strokeLinecap="round" fill="none" />;
  };

  const renderEyes = (eyeId: string) => {
    const eye = FEATURES.eyes.find(e => e.id === eyeId);
    if (!eye) return null;

    return eye.paths.map((p, i) => {
      if (p.startsWith('circle')) {
        const [_, x, y, r, color] = p.split('-');
        return <circle key={i} cx={x} cy={y} r={r} fill={color === 'white' ? 'white' : 'currentColor'} />;
      } else if (p.startsWith('arc')) {
        const [_, x1, y1, x2, y2, dir] = p.split('-');
        const midX = (Number(x1) + Number(x2)) / 2;
        const controlY = dir === 'up' ? Number(y1) - 10 : dir === 'down' ? Number(y1) + 10 : Number(y1) - 5;
        return <path key={i} d={`M${x1} ${y1} Q${midX} ${controlY} ${x2} ${y2}`} className="stroke-gray-800" strokeWidth="6" strokeLinecap="round" fill="none" />;
      } else if (p.startsWith('line')) {
        const [_, x1, y1, x2, y2] = p.split('-');
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-gray-800" strokeWidth="6" strokeLinecap="round" />;
      }
      return null;
    });
  };

  const renderEyesWithColor = (eyeId: string, color: string) => {
    const eye = FEATURES.eyes.find(e => e.id === eyeId);
    if (!eye) return null;

    return eye.paths.map((p, i) => {
      if (p.startsWith('circle')) {
        const [_, x, y, r, colorType] = p.split('-');
        return <circle key={i} cx={x} cy={y} r={r} fill={colorType === 'white' ? 'white' : color} />;
      } else if (p.startsWith('arc')) {
        const [_, x1, y1, x2, y2, dir] = p.split('-');
        const midX = (Number(x1) + Number(x2)) / 2;
        const controlY = dir === 'up' ? Number(y1) - 10 : dir === 'down' ? Number(y1) + 10 : Number(y1) - 5;
        return <path key={i} d={`M${x1} ${y1} Q${midX} ${controlY} ${x2} ${y2}`} stroke={color} strokeWidth="6" strokeLinecap="round" fill="none" />;
      } else if (p.startsWith('line')) {
        const [_, x1, y1, x2, y2] = p.split('-');
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="6" strokeLinecap="round" />;
      }
      return null;
    });
  };

  return (
    <div className={`relative w-full h-full flex flex-col ${target.bgColor} overflow-hidden transition-colors duration-700`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${10 + Math.random() * 30}px`,
              height: `${10 + Math.random() * 30}px`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-3 z-10">
        <button
          onClick={onBack}
          className="bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition-all"
          style={{ touchAction: 'manipulation' }}
        >
          <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
        </button>

        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <span className="text-xs font-bold text-gray-400 mr-2">SKOR:</span>
          <span className="text-lg font-black text-purple-600">{score}</span>
        </div>

        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        
        {/* Target Card */}
        <div className={`mb-6 bg-gradient-to-br ${target.color} p-1 rounded-2xl shadow-2xl animate-bounce-slow`}>
          <div className="bg-white rounded-xl p-3 flex items-center gap-3">
            <div className="text-center">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">HEDEF</div>
              <div className="text-lg font-black text-gray-800">{target.name}</div>
              <div className="flex gap-0.5 mt-1 justify-center">
                {[0, 1, 2].map(i => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-colors ${
                    i < hint ? 'bg-green-400' : 'bg-gray-200'
                  }`} />
                ))}
              </div>
            </div>
            
            {/* Preview */}
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center border-2 border-gray-100">
              <svg viewBox="0 0 200 200" className="w-full h-full text-gray-700">
                <g transform="scale(0.85) translate(15, 20)">
                  {renderPath(FEATURES.brows.find(b => b.id === target.config.brows)!.path)}
                  <g className="text-gray-700">{renderEyes(target.config.eyes)}</g>
                  {renderPath(FEATURES.mouth.find(m => m.id === target.config.mouth)!.path)}
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Speech Bubble */}
        {!isWon && hint < 3 && (
          <div className="absolute top-[35%] md:top-[30%] left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-xl shadow-lg text-gray-600 font-bold text-xs animate-pulse whitespace-nowrap z-20 max-w-[85%] text-center">
            {hint === 0 && "Yüz parçalarına dokun ve değiştir! 👆"}
            {hint === 1 && "Harika! Bir parça doğru, devam et! ✨"}
            {hint === 2 && "Neredeyse tamam! Bir parça kaldı! 🎯"}
          </div>
        )}

        {/* Face Container */}
        <div className="relative">
          <div className={`w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-[#ffe0cc] to-[#ffd4b8] rounded-[4rem] shadow-[0_20px_60px_rgba(0,0,0,0.15),inset_0_-15px_30px_rgba(0,0,0,0.08)] border-b-[12px] border-[#f0c0a0] relative overflow-hidden transition-transform duration-300 ${
            shake ? 'animate-shake' : ''
          } ${isWon ? 'scale-110 rotate-6' : ''}`}>
            
            {/* Hair */}
            <div className="absolute top-0 inset-x-0 h-16 md:h-20 bg-gradient-to-b from-[#5a4a3a] to-[#4a3b32] rounded-b-[60%] opacity-90 shadow-lg" />

            <svg viewBox="0 0 200 200" className="w-full h-full text-gray-800 mt-6">
              {/* Brows */}
              <g 
                onClick={() => cycleFeature('brows')} 
                className={`cursor-pointer transition-all ${activeFeature === 'brows' ? 'scale-110' : 'hover:opacity-70'}`}
                style={{ transformOrigin: 'center' }}
              >
                <rect x="0" y="0" width="200" height="60" fill="transparent" />
                <path 
                  d={FEATURES.brows.find(b => b.id === currentConfig.brows)!.path} 
                  stroke={currentConfig.brows === target.config.brows ? '#16a34a' : '#1f2937'}
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  fill="none"
                />
              </g>

              {/* Eyes */}
              <g 
                onClick={() => cycleFeature('eyes')} 
                className={`cursor-pointer transition-all ${activeFeature === 'eyes' ? 'scale-110' : 'hover:opacity-70'}`}
                style={{ transformOrigin: 'center' }}
              >
                <rect x="0" y="50" width="200" height="60" fill="transparent" />
                {renderEyesWithColor(currentConfig.eyes, currentConfig.eyes === target.config.eyes ? '#16a34a' : '#1f2937')}
              </g>

              {/* Mouth */}
              <g 
                onClick={() => cycleFeature('mouth')} 
                className={`cursor-pointer transition-all ${activeFeature === 'mouth' ? 'scale-110' : 'hover:opacity-70'}`}
                style={{ transformOrigin: 'center' }}
              >
                <rect x="0" y="110" width="200" height="90" fill="transparent" />
                <path 
                  d={FEATURES.mouth.find(m => m.id === currentConfig.mouth)!.path}
                  stroke={currentConfig.mouth === target.config.mouth ? '#16a34a' : '#1f2937'}
                  strokeWidth="8" 
                  strokeLinecap="round" 
                  fill="none"
                />
              </g>
            </svg>

            {/* Cheeks */}
            <div className="absolute top-[58%] left-10 w-8 h-4 md:w-10 md:h-5 bg-pink-300/50 rounded-full blur-sm animate-pulse" />
            <div className="absolute top-[58%] right-10 w-8 h-4 md:w-10 md:h-5 bg-pink-300/50 rounded-full blur-sm animate-pulse" />

            {/* Click hints */}
            {!isWon && (
              <>
                {currentConfig.brows !== target.config.brows && (
                  <div className="absolute top-[15%] right-4 w-8 h-8 bg-white/70 rounded-full flex items-center justify-center animate-ping-slow">
                    <span className="text-xs">👆</span>
                  </div>
                )}
                {currentConfig.eyes !== target.config.eyes && (
                  <div className="absolute top-[35%] left-4 w-8 h-8 bg-white/70 rounded-full flex items-center justify-center animate-ping-slow" style={{ animationDelay: '0.5s' }}>
                    <span className="text-xs">👆</span>
                  </div>
                )}
                {currentConfig.mouth !== target.config.mouth && (
                  <div className="absolute bottom-[25%] right-4 w-8 h-8 bg-white/70 rounded-full flex items-center justify-center animate-ping-slow" style={{ animationDelay: '1s' }}>
                    <span className="text-xs">👆</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center max-w-sm w-full animate-scale-in relative overflow-hidden">
            
            {/* Confetti background */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    backgroundColor: ['#fbbf24', '#ef4444', '#3b82f6', '#10b981', '#8b5cf6'][Math.floor(Math.random() * 5)],
                    animation: `confetti ${1 + Math.random()}s ease-out forwards`,
                    animationDelay: `${Math.random() * 0.5}s`,
                  }}
                />
              ))}
            </div>

            <div className={`w-24 h-24 bg-gradient-to-br ${target.color} rounded-full flex items-center justify-center mb-4 shadow-lg animate-bounce`}>
              <span className="text-5xl">🎉</span>
            </div>
            
            <h2 className="text-3xl font-black text-gray-800 mb-2">Mükemmel!</h2>
            <p className="text-gray-600 text-center mb-2">
              Tam olarak <strong>{target.name}</strong> bir yüz yaptın!
            </p>
            <p className="text-sm text-gray-400 mb-6">+10 puan kazandın!</p>

            <div className="flex gap-1 mb-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="text-yellow-400 text-3xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                  ⭐
                </div>
              ))}
            </div>

            <button 
              onClick={nextLevel}
              className={`w-full bg-gradient-to-r ${target.color} text-white font-bold py-4 rounded-xl shadow-lg transform active:scale-95 transition-all flex items-center justify-center gap-2`}
              style={{ touchAction: 'manipulation' }}
            >
              <span>Sıradaki Yüz</span>
              <span className="text-xl">→</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(500px) rotate(720deg); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px) rotate(-2deg); }
          75% { transform: translateX(10px) rotate(2deg); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
        .animate-bounce-slow {
          animation: bounce 2s infinite;
        }
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default EmotionPuppetGameScreen;
