import React, { useState, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createGameSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playCorrect = () => {
        [523, 659, 784].forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.12);
            }, i * 60);
        });
    };

    const playWrong = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(180, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    };

    return { playCorrect, playWrong };
};

// --- DATA ---
interface OwnershipPair {
    objectId: number;
    objectName: string;
    ownerId: number;
    ownerName: string;
}

const OWNERSHIP_PAIRS: OwnershipPair[] = [
    // Aile
    { objectId: 371, objectName: 'Biberon',       ownerId: 579, ownerName: 'Bebek' },
    { objectId: 437, objectName: 'Baston',         ownerId: 578, ownerName: 'Dede' },
    { objectId: 576, objectName: 'Kravat',         ownerId: 828, ownerName: 'Baba' },
    { objectId: 207, objectName: 'Okul Çantası',    ownerId: 677, ownerName: 'Öğrenci' },
    { objectId: 979, objectName: 'Saç Tokası',     ownerId: 985, ownerName: 'Kız Çocuğu' },
    // Meslekler
    { objectId: 934, objectName: 'Önlük',          ownerId: 326, ownerName: 'Aşçı' },
    { objectId: 149, objectName: 'Cetvel',         ownerId: 84,  ownerName: 'Öğretmen' },
    { objectId: 258, objectName: 'Polis Arabası',  ownerId: 325, ownerName: 'Polis' },
    { objectId: 256, objectName: 'İtfaiye Aracı',  ownerId: 327, ownerName: 'İtfaiyeci' },
    { objectId: 257, objectName: 'Ambulans',       ownerId: 324, ownerName: 'Doktor' },
    // Hayal / Spor
    { objectId: 215, objectName: 'Taç',            ownerId: 314, ownerName: 'Kral' },
    { objectId: 204, objectName: 'Roket',          ownerId: 380, ownerName: 'Astronot' },
    { objectId: 235, objectName: 'Top',            ownerId: 629, ownerName: 'Futbolcu' },
    // Hayvanlar
    { objectId: 228, objectName: 'Bal',            ownerId: 273, ownerName: 'Arı' },
    { objectId: 98,  objectName: 'Havuç',          ownerId: 41,  ownerName: 'Tavşan' },
    { objectId: 534, objectName: 'Yuva',           ownerId: 749, ownerName: 'Kuş' },
    { objectId: 915, objectName: 'Balık',          ownerId: 16,  ownerName: 'Kedi' },
    { objectId: 114, objectName: 'Muz',            ownerId: 994, ownerName: 'Maymun' },
    { objectId: 113, objectName: 'Yumurta',        ownerId: 321, ownerName: 'Tavuk' },
    // Nesne - Nesne
    { objectId: 946, objectName: 'Kumanda',        ownerId: 892, ownerName: 'Televizyon' },
    { objectId: 142, objectName: 'Anahtar',        ownerId: 39,  ownerName: 'Kapı' },
];

const imgUrl = (id: number) => `/images/${id}.png`;

type GameMode = 'ObjectToOwner' | 'OwnerToObject';

interface WhoseIsThisGameScreenProps {
    onBack: () => void;
}

const WhoseIsThisGameScreen: React.FC<WhoseIsThisGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [mode, setMode] = useState<GameMode>('ObjectToOwner');
    const [score, setScore] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [roundCount, setRoundCount] = useState(0);
    const [maxRounds] = useState(10);
    
    // Core game states
    const [currentPair, setCurrentPair] = useState(OWNERSHIP_PAIRS[0]);
    const [options, setOptions] = useState<{ imageId: number; name: string; isCorrect: boolean }[]>([]);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);

    const soundRef = useRef<ReturnType<typeof createGameSound> | null>(null);

    useEffect(() => {
        soundRef.current = createGameSound();
    }, []);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const startGame = (selectedMode: GameMode) => {
        setMode(selectedMode);
        setScore(0);
        setMistakes(0);
        setRoundCount(0);
        setGameState('playing');
        generateRound(selectedMode);
    };

    const generateRound = (currentMode: GameMode) => {
        const target = OWNERSHIP_PAIRS[Math.floor(Math.random() * OWNERSHIP_PAIRS.length)];
        setCurrentPair(target);

        const opts: { imageId: number; name: string; isCorrect: boolean }[] = [];

        if (currentMode === 'ObjectToOwner') {
            opts.push({ imageId: target.ownerId, name: target.ownerName, isCorrect: true });
            const others = shuffleArray(OWNERSHIP_PAIRS.filter(p => p.ownerId !== target.ownerId));
            const seen = new Set<number>([target.ownerId]);
            for (const p of others) {
                if (!seen.has(p.ownerId)) { seen.add(p.ownerId); opts.push({ imageId: p.ownerId, name: p.ownerName, isCorrect: false }); }
                if (opts.length === 3) break;
            }
        } else {
            opts.push({ imageId: target.objectId, name: target.objectName, isCorrect: true });
            const others = shuffleArray(OWNERSHIP_PAIRS.filter(p => p.objectId !== target.objectId));
            const seen = new Set<number>([target.objectId]);
            for (const p of others) {
                if (!seen.has(p.objectId)) { seen.add(p.objectId); opts.push({ imageId: p.objectId, name: p.objectName, isCorrect: false }); }
                if (opts.length === 3) break;
            }
        }

        setOptions(shuffleArray(opts));
    };

    const handleOptionClick = (isCorrect: boolean) => {
        if (showFeedback) return;

        if (isCorrect) {
            soundRef.current?.playCorrect();
            setShowFeedback('correct');
            setScore(s => s + 10);
            
            setTimeout(() => {
                setShowFeedback(null);
                if (roundCount + 1 >= maxRounds) {
                    setGameState('result');
                } else {
                    setRoundCount(r => r + 1);
                    generateRound(mode);
                }
            }, 1000);
        } else {
            soundRef.current?.playWrong();
            setShowFeedback('wrong');
            setMistakes(m => m + 1);
            setTimeout(() => setShowFeedback(null), 500);
        }
    };

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🧩</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                    Bu Kimin?
                </h1>
                <p className="text-gray-600 mb-2 font-medium">Aidiyet ve eşleştirme çalışmaları</p>
                <p className="text-sm text-gray-500 mb-6 bg-purple-50 p-3 rounded-xl border border-purple-100">
                    Otizm eğitiminde çift yönlü eşleştirme becerisini geliştirmek için tasarlanmıştır.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={() => startGame('ObjectToOwner')}
                        className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-lg px-6 py-4 rounded-xl shadow-lg hover:scale-105 transition-all flex items-center justify-between"
                    >
                        <span className="text-2xl">📱 ➡️ 👩</span>
                        <span>Eşyadan Sahibine<br/><span className="text-xs font-normal opacity-80">(Bu telefon kimin?)</span></span>
                    </button>
                    <button
                        onClick={() => startGame('OwnerToObject')}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg px-6 py-4 rounded-xl shadow-lg hover:scale-105 transition-all flex items-center justify-between"
                    >
                        <span className="text-2xl">👩 ➡️ 📱</span>
                        <span>Sahibinden Eşyaya<br/><span className="text-xs font-normal opacity-80">(Annenin eşyası hangisi?)</span></span>
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        const questionText = mode === 'ObjectToOwner'
            ? `Bu ${currentPair.objectName.toLowerCase()} kime / neye ait?`
            : `${currentPair.ownerName} neyi arıyor?`;

        const targetImageId = mode === 'ObjectToOwner' ? currentPair.objectId : currentPair.ownerId;
        const targetBg = mode === 'ObjectToOwner' ? 'bg-indigo-100 border-indigo-300' : 'bg-purple-100 border-purple-300';

        return (
            <div className="absolute inset-0 flex flex-col bg-slate-50">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white shadow-sm border-b border-slate-200">
                    <button onClick={onBack} className="bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors">
                        <ArrowLeftIcon className="w-5 h-5 text-slate-600" />
                    </button>

                    <div className="flex gap-3">
                        <div className="bg-green-100 text-green-700 rounded-full px-3 py-1 font-bold text-sm border border-green-200">
                            ⭐ {score}
                        </div>
                        <div className="text-slate-500 font-bold px-3 py-1 text-sm bg-slate-100 rounded-full border border-slate-200">
                            {roundCount}/{maxRounds}
                        </div>
                    </div>
                </div>

                {/* Question Area */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-700 text-center">
                        {questionText}
                    </h2>

                    <div className={`w-40 h-40 rounded-full flex items-center justify-center shadow-inner border-4 ${targetBg} animate-bounce-slow overflow-hidden`}>
                        <img src={imgUrl(targetImageId)} alt={mode === 'ObjectToOwner' ? currentPair.objectName : currentPair.ownerName} className="w-full h-full object-contain p-2" />
                    </div>
                </div>

                {/* Options Area */}
                <div className="p-6 bg-white rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                    <p className="text-center text-slate-400 font-bold mb-4 text-sm uppercase tracking-wider">Doğru Olanı Seç</p>
                    <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
                        {options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleOptionClick(opt.isCorrect)}
                                className={`aspect-square bg-slate-50 rounded-2xl border-2 border-slate-200 flex flex-col items-center justify-center gap-2 shadow-sm hover:border-indigo-400 hover:bg-indigo-50 transition-all overflow-hidden ${
                                    showFeedback === 'correct' && opt.isCorrect ? 'bg-green-100 border-green-500 scale-105' : ''
                                } ${
                                    showFeedback === 'wrong' ? 'opacity-50 pointer-events-none' : ''
                                }`}
                            >
                                <img src={imgUrl(opt.imageId)} alt={opt.name} className="w-full h-full object-contain p-2" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feedback Overlay */}
                {showFeedback && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
                        {showFeedback === 'correct' ? (
                            <div className="bg-green-500 text-white rounded-full p-8 shadow-2xl animate-bounce">
                                <span className="text-8xl">✅</span>
                            </div>
                        ) : (
                            <div className="bg-red-500 text-white rounded-full p-8 shadow-2xl animate-shake">
                                <span className="text-8xl">❌</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const renderResult = () => {
        const accuracy = Math.round((score / 10 / maxRounds) * 100);
        const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">🏆</div>
                    <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">Harikasın!</h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className={`text-4xl ${i <= stars ? 'opacity-100' : 'opacity-20 grayscale'}`}>⭐</span>
                        ))}
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4 mb-6 border border-purple-100">
                        <div className="flex justify-around">
                            <div>
                                <div className="text-sm text-purple-400 font-bold mb-1">Puan</div>
                                <div className="text-2xl font-black text-purple-700">{score}</div>
                            </div>
                            <div>
                                <div className="text-sm text-purple-400 font-bold mb-1">Hata</div>
                                <div className="text-2xl font-black text-purple-700">{mistakes}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => startGame(mode)}
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Tekrar Oyna 🔄
                        </button>
                        <button
                            onClick={() => setGameState('menu')}
                            className="text-slate-500 font-bold hover:text-slate-700 py-2"
                        >
                            Ana Menüye Dön
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-full h-full overflow-hidden bg-slate-50">
            {gameState === 'menu' && (
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 z-50 bg-white/90 hover:bg-white rounded-full p-3 shadow-md transition-all"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-indigo-600" />
                </button>
            )}

            {gameState === 'menu' && renderMenu()}
            {gameState === 'playing' && renderPlaying()}
            {gameState === 'result' && renderResult()}

            <style>{`
                .animate-scale-in {
                    animation: scaleIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
                @keyframes scaleIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-shake {
                    animation: shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
                }
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
                .animate-bounce-slow {
                    animation: bounceSlow 3s infinite;
                }
                @keyframes bounceSlow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `}</style>
        </div>
    );
};

export default WhoseIsThisGameScreen;
