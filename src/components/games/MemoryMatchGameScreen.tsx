import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createMemorySound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playFlip = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.08);
    };

    const playMatch = () => {
        [659, 784, 880].forEach((freq, i) => {
            setTimeout(() => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
                gain.gain.setValueAtTime(0.07, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.15);
            }, i * 80);
        });
    };

    const playNoMatch = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
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
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.25);
            }, i * 120);
        });
    };

    return { playFlip, playMatch, playNoMatch, playWin };
};

// --- Card Data ---
const CARD_SETS = {
    animals: [
        { emoji: '🐶', name: 'Köpek' },
        { emoji: '🐱', name: 'Kedi' },
        { emoji: '🐰', name: 'Tavşan' },
        { emoji: '🐻', name: 'Ayı' },
        { emoji: '🦊', name: 'Tilki' },
        { emoji: '🐼', name: 'Panda' },
        { emoji: '🦁', name: 'Aslan' },
        { emoji: '🐯', name: 'Kaplan' },
        { emoji: '🐮', name: 'İnek' },
        { emoji: '🐷', name: 'Domuz' },
        { emoji: '🐸', name: 'Kurbağa' },
        { emoji: '🐵', name: 'Maymun' },
    ],
    fruits: [
        { emoji: '🍎', name: 'Elma' },
        { emoji: '🍊', name: 'Portakal' },
        { emoji: '🍋', name: 'Limon' },
        { emoji: '🍇', name: 'Üzüm' },
        { emoji: '🍓', name: 'Çilek' },
        { emoji: '🍑', name: 'Şeftali' },
        { emoji: '🍒', name: 'Kiraz' },
        { emoji: '🥝', name: 'Kivi' },
        { emoji: '🍌', name: 'Muz' },
        { emoji: '🍉', name: 'Karpuz' },
        { emoji: '🥭', name: 'Mango' },
        { emoji: '🍍', name: 'Ananas' },
    ],
    shapes: [
        { emoji: '🔴', name: 'Kırmızı' },
        { emoji: '🟢', name: 'Yeşil' },
        { emoji: '🔵', name: 'Mavi' },
        { emoji: '🟡', name: 'Sarı' },
        { emoji: '🟣', name: 'Mor' },
        { emoji: '🟠', name: 'Turuncu' },
        { emoji: '⭐', name: 'Yıldız' },
        { emoji: '❤️', name: 'Kalp' },
        { emoji: '💎', name: 'Elmas' },
        { emoji: '🌙', name: 'Ay' },
        { emoji: '☀️', name: 'Güneş' },
        { emoji: '🌈', name: 'Gökkuşağı' },
    ],
};

type CardSetType = keyof typeof CARD_SETS;

interface Card {
    id: number;
    emoji: string;
    name: string;
    pairId: number;
    isFlipped: boolean;
    isMatched: boolean;
}

const DIFFICULTIES = [
    { name: 'Kolay', pairs: 4, cols: 2 },
    { name: 'Orta', pairs: 6, cols: 3 },
    { name: 'Zor', pairs: 8, cols: 4 },
];

interface MemoryMatchGameScreenProps {
    onBack: () => void;
}

const MemoryMatchGameScreen: React.FC<MemoryMatchGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'won'>('menu');
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [totalPairs, setTotalPairs] = useState(0);
    const [difficulty, setDifficulty] = useState(0);
    const [cardSet, setCardSet] = useState<CardSetType>('animals');
    const [isChecking, setIsChecking] = useState(false);
    const soundRef = useRef<ReturnType<typeof createMemorySound> | null>(null);
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        soundRef.current = createMemorySound();
    }, []);

    // Timer
    useEffect(() => {
        if (gameState !== 'playing') return;

        const timer = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(timer);
    }, [gameState, startTime]);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const startGame = useCallback((diffIndex: number, set: CardSetType) => {
        const diff = DIFFICULTIES[diffIndex];
        const cardData = shuffleArray(CARD_SETS[set]).slice(0, diff.pairs);

        // Create pairs
        let id = 0;
        const newCards: Card[] = [];
        cardData.forEach((data, pairId) => {
            // First card of pair
            newCards.push({
                id: id++,
                emoji: data.emoji,
                name: data.name,
                pairId,
                isFlipped: false,
                isMatched: false,
            });
            // Second card of pair
            newCards.push({
                id: id++,
                emoji: data.emoji,
                name: data.name,
                pairId,
                isFlipped: false,
                isMatched: false,
            });
        });

        setCards(shuffleArray(newCards));
        setFlippedCards([]);
        setMoves(0);
        setMatchedPairs(0);
        setTotalPairs(diff.pairs);
        setDifficulty(diffIndex);
        setCardSet(set);
        setIsChecking(false);
        setStartTime(Date.now());
        setElapsedTime(0);
        setGameState('playing');
    }, []);

    const handleCardClick = useCallback((cardId: number) => {
        if (isChecking) return;

        const card = cards.find(c => c.id === cardId);
        if (!card || card.isFlipped || card.isMatched) return;
        if (flippedCards.length >= 2) return;

        soundRef.current?.playFlip();

        // Flip the card
        setCards(prev => prev.map(c =>
            c.id === cardId ? { ...c, isFlipped: true } : c
        ));

        const newFlipped = [...flippedCards, cardId];
        setFlippedCards(newFlipped);

        // Check for match
        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            setIsChecking(true);

            const [firstId, secondId] = newFlipped;
            const firstCard = cards.find(c => c.id === firstId)!;
            const secondCard = cards.find(c => c.id === secondId)!;

            if (firstCard.pairId === secondCard.pairId) {
                // Match!
                setTimeout(() => {
                    soundRef.current?.playMatch();
                    setCards(prev => prev.map(c =>
                        c.pairId === firstCard.pairId ? { ...c, isMatched: true } : c
                    ));
                    setMatchedPairs(m => {
                        const newMatched = m + 1;
                        if (newMatched === totalPairs) {
                            setTimeout(() => {
                                soundRef.current?.playWin();
                                setGameState('won');
                            }, 500);
                        }
                        return newMatched;
                    });
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 500);
            } else {
                // No match
                setTimeout(() => {
                    soundRef.current?.playNoMatch();
                    setCards(prev => prev.map(c =>
                        newFlipped.includes(c.id) ? { ...c, isFlipped: false } : c
                    ));
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    }, [cards, flippedCards, isChecking, totalPairs]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">🃏</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                    Hafıza Çiftleri
                </h1>
                <p className="text-gray-600 mb-6">Eşleşen kartları bul!</p>

                {/* Card Set Selection */}
                <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Tema Seç:</p>
                    <div className="flex justify-center gap-2">
                        {[
                            { key: 'animals', icon: '🐶', label: 'Hayvanlar' },
                            { key: 'fruits', icon: '🍎', label: 'Meyveler' },
                            { key: 'shapes', icon: '⭐', label: 'Şekiller' },
                        ].map(({ key, icon, label }) => (
                            <button
                                key={key}
                                onClick={() => setCardSet(key as CardSetType)}
                                className={`px-3 py-2 rounded-xl border-2 transition-all ${cardSet === key
                                        ? 'border-purple-500 bg-purple-100'
                                        : 'border-gray-200 bg-white hover:border-purple-300'
                                    }`}
                            >
                                <span className="text-xl">{icon}</span>
                                <div className="text-xs font-medium text-gray-600">{label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Difficulty Selection */}
                <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Zorluk Seç:</p>
                    <div className="flex justify-center gap-2">
                        {DIFFICULTIES.map((diff, i) => (
                            <button
                                key={i}
                                onClick={() => startGame(i, cardSet)}
                                className={`px-4 py-3 rounded-xl shadow-lg font-bold transition-all hover:scale-105 ${i === 0 ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' :
                                        i === 1 ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' :
                                            'bg-gradient-to-r from-red-400 to-rose-500 text-white'
                                    }`}
                            >
                                <div>{diff.name}</div>
                                <div className="text-xs opacity-80">{diff.pairs} çift</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        const diff = DIFFICULTIES[difficulty];
        const cols = diff.cols;

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-purple-200 via-pink-100 to-rose-100">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-5 h-5 text-purple-600" />
                    </button>

                    <div className="flex gap-3">
                        <div className="bg-purple-500 text-white rounded-full px-3 py-1 text-sm font-bold">
                            ⏱️ {formatTime(elapsedTime)}
                        </div>
                        <div className="bg-pink-500 text-white rounded-full px-3 py-1 text-sm font-bold">
                            🔄 {moves}
                        </div>
                        <div className="bg-emerald-500 text-white rounded-full px-3 py-1 text-sm font-bold">
                            ✓ {matchedPairs}/{totalPairs}
                        </div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="flex-1 flex items-center justify-center p-4">
                    <div
                        className="grid gap-2 sm:gap-3"
                        style={{
                            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                            maxWidth: cols * 100 + 'px',
                        }}
                    >
                        {cards.map(card => (
                            <button
                                key={card.id}
                                onClick={() => handleCardClick(card.id)}
                                disabled={card.isFlipped || card.isMatched || isChecking}
                                className={`aspect-square rounded-xl shadow-lg transition-all duration-300 transform ${card.isFlipped || card.isMatched
                                        ? 'bg-white rotate-y-0'
                                        : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-105'
                                    } ${card.isMatched ? 'opacity-60 scale-95' : ''}`}
                                style={{
                                    minWidth: '60px',
                                    minHeight: '60px',
                                    maxWidth: '90px',
                                    maxHeight: '90px',
                                }}
                            >
                                {(card.isFlipped || card.isMatched) ? (
                                    <span className="text-3xl sm:text-4xl">{card.emoji}</span>
                                ) : (
                                    <span className="text-2xl sm:text-3xl text-white/80">❓</span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderWon = () => {
        const stars = moves <= totalPairs + 2 ? 3 : moves <= totalPairs + 5 ? 2 : 1;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">🏆</div>
                    <h2 className="text-2xl font-black text-purple-600 mb-2">
                        Tebrikler!
                    </h2>

                    <div className="flex justify-center gap-1 my-3">
                        {[1, 2, 3].map(i => (
                            <span key={i} className="text-3xl">
                                {i <= stars ? '⭐' : '☆'}
                            </span>
                        ))}
                    </div>

                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl p-4 mb-4 text-white">
                        <div className="flex justify-around">
                            <div>
                                <div className="text-sm opacity-80">Süre</div>
                                <div className="text-xl font-bold">{formatTime(elapsedTime)}</div>
                            </div>
                            <div>
                                <div className="text-sm opacity-80">Hamle</div>
                                <div className="text-xl font-bold">{moves}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => startGame(difficulty, cardSet)}
                            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Tekrar Oyna 🔄
                        </button>
                        <button
                            onClick={() => setGameState('menu')}
                            className="bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Zorluk Değiştir 📊
                        </button>
                        <button
                            onClick={onBack}
                            className="text-gray-500 font-medium hover:text-gray-700"
                        >
                            Menüye Dön
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-full h-full overflow-hidden">
            {gameState === 'menu' && (
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 z-50 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-purple-600" />
                </button>
            )}

            {gameState === 'menu' && renderMenu()}
            {gameState === 'playing' && renderPlaying()}
            {gameState === 'won' && renderWon()}

            <style>{`
                .animate-scale-in {
                    animation: scaleIn 0.3s ease-out;
                }
                @keyframes scaleIn {
                    from { transform: scale(0.8); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default MemoryMatchGameScreen;
