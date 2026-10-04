import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import { sayInstruction, sayCorrect, sayFinished } from '../../utils/gameVoice.ts';
import { RUTIN_GORSEL } from '../../services/database/activities/yeni/tekilGorseller.ts';

// --- Sound Effects ---
const createRoutineSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playDrop = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
    };

    const playCorrect = () => {
        [523, 659, 784].forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.15);
            }, i * 80);
        });
    };

    const playWrong = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    };

    const playWin = () => {
        [523, 659, 784, 1047].forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.2);
            }, i * 100);
        });
    };

    return { playDrop, playCorrect, playWrong, playWin };
};

// --- Rutinler ---
// Kaan onayı (2026-10-04): gerçek fotoğraflar (aynı çocuk), mantıklı ve tartışmasız sıralar.
// Kolay: 3 adım. Zor: 4-5 adım. Fotoğraf yoksa emoji gösterilir.
interface Adim { gorsel: string; emoji: string; text: string }
const A = (gorsel: string, emoji: string, text: string): Adim => ({ gorsel, emoji, text });
type Seviye = 'kolay' | 'zor';
const ROUTINES: Record<Seviye, { title: string; icon: string; items: Adim[] }[]> = {
    kolay: [
        { title: 'Yemek Zamanı', icon: '🍽️', items: [A('09-el-yika', '🧼', 'Ellerini yıka'), A('10-ogle-yemegi', '🍝', 'Yemeğini ye'), A('06-dis-fircala', '🦷', 'Dişlerini fırçala')] },
        { title: 'Sabah', icon: '🌅', items: [A('01-uyan', '😴', 'Uyan'), A('04-giyin', '👕', 'Giyin'), A('05-kahvalti', '🍳', 'Kahvaltı yap')] },
        { title: 'Okula Gidiyorum', icon: '🎒', items: [A('04-giyin', '👕', 'Giyin'), A('07-ayakkabi-giy', '👟', 'Ayakkabı giy'), A('08-okula-git', '🚪', 'Okula git')] },
        { title: 'Uyku Zamanı', icon: '🌙', items: [A('12-pijama', '🩳', 'Pijama giy'), A('13-kitap-oku', '📖', 'Kitap oku'), A('14-uyu', '💤', 'Uyu')] },
    ],
    zor: [
        { title: 'Sabah Rutini', icon: '🌅', items: [A('01-uyan', '😴', 'Uyan'), A('02-yatak-topla', '🛏️', 'Yatağı topla'), A('03-yuz-yika', '💦', 'Yüzünü yıka'), A('04-giyin', '👕', 'Giyin'), A('05-kahvalti', '🍳', 'Kahvaltı yap')] },
        { title: 'Okula Hazırlık', icon: '🎒', items: [A('05-kahvalti', '🍳', 'Kahvaltı yap'), A('06-dis-fircala', '🦷', 'Dişlerini fırçala'), A('07-ayakkabi-giy', '👟', 'Ayakkabı giy'), A('08-okula-git', '🚪', 'Okula git')] },
        { title: 'Akşam Rutini', icon: '🌙', items: [A('11-banyo', '🛁', 'Banyo yap'), A('12-pijama', '🩳', 'Pijama giy'), A('13-kitap-oku', '📖', 'Kitap oku'), A('14-uyu', '💤', 'Uyu')] },
    ],
};

interface RoutineItem extends Adim {
    originalIndex: number;
}

interface DailyRoutineGameScreenProps {
    onBack: () => void;
}

const Resim: React.FC<{ item: Adim; boyut: string }> = ({ item, boyut }) => {
    const url = RUTIN_GORSEL[item.gorsel];
    return url
        ? <img src={url} alt={item.text} className={`${boyut} object-cover rounded-xl`} draggable={false} />
        : <div className={`${boyut} rounded-xl bg-violet-50 flex items-center justify-center text-4xl`}>{item.emoji}</div>;
};

const DailyRoutineGameScreen: React.FC<DailyRoutineGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [seviye, setSeviye] = useState<Seviye>('kolay');
    const [currentSequence, setCurrentSequence] = useState(0);
    const [shuffledItems, setShuffledItems] = useState<RoutineItem[]>([]);
    const [placedItems, setPlacedItems] = useState<(RoutineItem | null)[]>([]);
    const [selectedItem, setSelectedItem] = useState<RoutineItem | null>(null);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
    const soundRef = useRef<ReturnType<typeof createRoutineSound> | null>(null);
    const rutinler = ROUTINES[seviye];

    useEffect(() => {
        soundRef.current = createRoutineSound();
    }, []);

    const shuffleArray = (array: RoutineItem[]): RoutineItem[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        // Karıştırma doğru sırayı vermesin
        if (newArray.length > 1 && newArray.every((x, i) => x.originalIndex === i)) newArray.reverse();
        return newArray;
    };

    const startRound = useCallback((sev: Seviye, seqIndex: number) => {
        const sequence = ROUTINES[sev][seqIndex];
        setCurrentSequence(seqIndex);
        setShuffledItems(shuffleArray(sequence.items.map((item, idx) => ({ ...item, originalIndex: idx }))));
        setPlacedItems(Array(sequence.items.length).fill(null));
        setSelectedItem(null);
        setShowFeedback(null);
        setGameState('playing');
    }, []);

    const startGame = useCallback((sev: Seviye) => {
        setSeviye(sev);
        startRound(sev, 0);
    }, [startRound]);

    useEffect(() => {
        if (gameState !== 'playing') return;
        sayInstruction(`${rutinler[currentSequence].title}. Önce ne yapılır?`, 300);
    }, [gameState, currentSequence, rutinler]);

    useEffect(() => {
        if (gameState === 'result') setTimeout(() => sayFinished(), 700); // kutlama sesi bitince
    }, [gameState]);

    // Sıradaki boş yer: çocuk kartı seçince doğrudan oraya denenir (yer seçmek gerekmez)
    const siradaki = placedItems.findIndex(p => p === null);

    const yerlestir = useCallback((item: RoutineItem) => {
        if (showFeedback || siradaki < 0) return;
        if (item.originalIndex === siradaki) {
            soundRef.current?.playCorrect();
            setTimeout(() => sayCorrect(`${item.text}.`), 350);
            setShowFeedback('correct');
            const newPlaced = [...placedItems];
            newPlaced[siradaki] = item;
            setPlacedItems(newPlaced);
            setShuffledItems(prev => prev.filter(i => i.originalIndex !== item.originalIndex));
            setSelectedItem(null);
            setTimeout(() => {
                setShowFeedback(null);
                if (newPlaced.every(p => p !== null)) {
                    setTimeout(() => {
                        if (currentSequence < rutinler.length - 1) startRound(seviye, currentSequence + 1);
                        else { soundRef.current?.playWin(); setGameState('result'); }
                    }, 1200);
                }
            }, 700);
        } else {
            // Yanlış: kızmadan kartı hafifçe salla
            soundRef.current?.playWrong();
            setSelectedItem(item);
            setShowFeedback('wrong');
            setTimeout(() => { setShowFeedback(null); setSelectedItem(null); }, 900);
        }
    }, [showFeedback, siradaki, placedItems, currentSequence, rutinler, seviye, startRound]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">📋</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-2">
                    Sıralı Ol!
                </h1>
                <p className="text-gray-600 mb-6">Önce ne yapılır, sonra ne yapılır? Resimleri sırayla seç.</p>
                <div className="flex flex-col gap-3">
                    <button onClick={() => startGame('kolay')}
                        className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-xl px-8 py-4 rounded-full shadow-lg">
                        Kolay · 3 adım
                    </button>
                    <button onClick={() => startGame('zor')}
                        className="w-full bg-gradient-to-r from-violet-400 to-fuchsia-500 text-white font-bold text-xl px-8 py-4 rounded-full shadow-lg">
                        Zor · 4-5 adım
                    </button>
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        const sequence = rutinler[currentSequence];
        const yanlisSecili = showFeedback === 'wrong';
        const sutun = placedItems.length <= 3 ? 'grid-cols-3' : placedItems.length === 4 ? 'grid-cols-4' : 'grid-cols-5';
        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-violet-200 via-purple-100 to-fuchsia-100">
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={() => setGameState('menu')} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-violet-600" />
                    </button>
                    <div className="font-bold text-violet-700">{sequence.icon} {sequence.title}</div>
                    <div className="bg-fuchsia-500 text-white rounded-full px-3 py-1 font-bold">
                        {currentSequence + 1}/{rutinler.length}
                    </div>
                </div>

                {/* Sıra: 1, 2, 3... (dolanlar fotoğrafla) */}
                <div className="px-3 pt-4">
                    <div className={`grid gap-2 ${sutun}`}>
                        {placedItems.map((item, idx) => (
                            <div key={idx} className={`relative rounded-2xl p-1 border-2 ${item ? 'bg-green-200 border-green-400' : idx === siradaki ? 'bg-violet-200 border-dashed border-violet-500 animate-pulse' : 'bg-white/60 border-dashed border-violet-300'}`}>
                                <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-violet-600 text-white text-sm font-black flex items-center justify-center z-10">{idx + 1}</div>
                                {item ? <Resim item={item} boyut="w-full aspect-square" /> : <div className="w-full aspect-square flex items-center justify-center text-3xl text-violet-300">?</div>}
                                <div className="text-[11px] text-center font-semibold text-gray-700 h-4 mt-0.5 truncate">{item?.text}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center py-2 px-4 text-violet-800 font-bold">
                    {siradaki === 0 ? 'Önce ne yapılır?' : siradaki > 0 ? 'Sonra ne yapılır?' : 'Aferin! 🎉'}
                </div>

                {/* Kartlar */}
                <div className="flex-1 overflow-y-auto px-3 pb-4">
                    <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                        {shuffledItems.map((item) => {
                            const yanlis = yanlisSecili && selectedItem?.originalIndex === item.originalIndex;
                            return (
                                <button
                                    key={item.originalIndex}
                                    onClick={() => yerlestir(item)}
                                    className={`bg-white rounded-2xl p-2 shadow-md transition-all active:scale-95 ${yanlis ? 'ring-4 ring-orange-300 animate-[sarsil_0.3s_ease-in-out_2]' : ''}`}
                                >
                                    <Resim item={item} boyut="w-full aspect-square" />
                                    <div className="mt-1 font-bold text-sm text-gray-800">{item.text}</div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    };

    const renderResult = () => (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-400 via-purple-400 to-fuchsia-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-2xl font-black text-violet-600 mb-4">Tebrikler!</h2>
                <div className="flex flex-col gap-3">
                    <button onClick={() => startGame(seviye)}
                        className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg">
                        Tekrar Oyna 🔄
                    </button>
                    <button onClick={() => setGameState('menu')} className="text-gray-500 font-medium hover:text-gray-700">
                        Seviye Seç
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="relative w-full h-full overflow-hidden">
            {gameState === 'menu' && (
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 z-50 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-violet-600" />
                </button>
            )}

            {gameState === 'menu' && renderMenu()}
            {gameState === 'playing' && renderPlaying()}
            {gameState === 'result' && renderResult()}

            <style>{`
                .animate-scale-in { animation: scaleIn 0.3s ease-out; }
                @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
                @keyframes sarsil { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
            `}</style>
        </div>
    );
};

export default DailyRoutineGameScreen;
