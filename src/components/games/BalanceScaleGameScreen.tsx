import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createBalanceSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playTilt = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
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
            }, i * 100);
        });
    };

    const playWrong = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
    };

    return { playTilt, playCorrect, playWrong };
};

// --- Types ---
type ConceptType = 'heavy' | 'big' | 'long' | 'many';

interface QuestionItem {
    emoji: string;
    label: string;
    value: number; // Comparison value
}

interface Question {
    concept: ConceptType;
    questionText: string;
    correctAnswer: 'left' | 'right';
    leftItem: QuestionItem;
    rightItem: QuestionItem;
}

// --- Question Data ---
const CONCEPTS: { type: ConceptType; icon: string; label: string; questionPrefix: string }[] = [
    { type: 'heavy', icon: '⚖️', label: 'Ağır - Hafif', questionPrefix: 'Hangisi daha AĞIR?' },
    { type: 'big', icon: '📐', label: 'Büyük - Küçük', questionPrefix: 'Hangisi daha BÜYÜK?' },
    { type: 'long', icon: '📏', label: 'Uzun - Kısa', questionPrefix: 'Hangisi daha UZUN?' },
    { type: 'many', icon: '🔢', label: 'Çok - Az', questionPrefix: 'Hangisi daha ÇOK?' },
];

// Question pools for each concept
const QUESTION_POOLS: Record<ConceptType, { left: QuestionItem; right: QuestionItem; answer: 'left' | 'right' }[]> = {
    heavy: [
        { left: { emoji: '🐘', label: 'Fil', value: 100 }, right: { emoji: '🐁', label: 'Fare', value: 1 }, answer: 'left' },
        { left: { emoji: '🪶', label: 'Tüy', value: 1 }, right: { emoji: '🪨', label: 'Taş', value: 80 }, answer: 'right' },
        { left: { emoji: '🚗', label: 'Araba', value: 90 }, right: { emoji: '🚲', label: 'Bisiklet', value: 10 }, answer: 'left' },
        { left: { emoji: '🍎', label: 'Elma', value: 5 }, right: { emoji: '🍉', label: 'Karpuz', value: 50 }, answer: 'right' },
        { left: { emoji: '🐋', label: 'Balina', value: 100 }, right: { emoji: '🐟', label: 'Balık', value: 5 }, answer: 'left' },
        { left: { emoji: '🏠', label: 'Ev', value: 100 }, right: { emoji: '🧸', label: 'Oyuncak', value: 2 }, answer: 'left' },
        { left: { emoji: '✈️', label: 'Uçak', value: 95 }, right: { emoji: '🦅', label: 'Kartal', value: 8 }, answer: 'left' },
        { left: { emoji: '🐜', label: 'Karınca', value: 1 }, right: { emoji: '🐕', label: 'Köpek', value: 40 }, answer: 'right' },
    ],
    big: [
        { left: { emoji: '🏔️', label: 'Dağ', value: 100 }, right: { emoji: '🏠', label: 'Ev', value: 30 }, answer: 'left' },
        { left: { emoji: '🐛', label: 'Tırtıl', value: 5 }, right: { emoji: '🐅', label: 'Kaplan', value: 70 }, answer: 'right' },
        { left: { emoji: '🌍', label: 'Dünya', value: 100 }, right: { emoji: '⚽', label: 'Top', value: 5 }, answer: 'left' },
        { left: { emoji: '🍒', label: 'Kiraz', value: 3 }, right: { emoji: '🎃', label: 'Balkabağı', value: 60 }, answer: 'right' },
        { left: { emoji: '🚢', label: 'Gemi', value: 95 }, right: { emoji: '🚤', label: 'Kayık', value: 25 }, answer: 'left' },
        { left: { emoji: '🌻', label: 'Çiçek', value: 10 }, right: { emoji: '🌳', label: 'Ağaç', value: 80 }, answer: 'right' },
        { left: { emoji: '🐊', label: 'Timsah', value: 75 }, right: { emoji: '🦎', label: 'Kertenkele', value: 10 }, answer: 'left' },
        { left: { emoji: '📱', label: 'Telefon', value: 8 }, right: { emoji: '📺', label: 'Televizyon', value: 50 }, answer: 'right' },
    ],
    long: [
        { left: { emoji: '🦒', label: 'Zürafa', value: 100 }, right: { emoji: '🐕', label: 'Köpek', value: 20 }, answer: 'left' },
        { left: { emoji: '🐍', label: 'Yılan', value: 85 }, right: { emoji: '🐛', label: 'Solucan', value: 15 }, answer: 'left' },
        { left: { emoji: '🚂', label: 'Tren', value: 95 }, right: { emoji: '🚗', label: 'Araba', value: 30 }, answer: 'left' },
        { left: { emoji: '✏️', label: 'Kalem', value: 20 }, right: { emoji: '📏', label: 'Cetvel', value: 40 }, answer: 'right' },
        { left: { emoji: '🌈', label: 'Gökkuşağı', value: 100 }, right: { emoji: '🎀', label: 'Kurdele', value: 30 }, answer: 'left' },
        { left: { emoji: '🦴', label: 'Kemik', value: 25 }, right: { emoji: '🥖', label: 'Baget', value: 50 }, answer: 'right' },
        { left: { emoji: '🐊', label: 'Timsah', value: 70 }, right: { emoji: '🐢', label: 'Kaplumbağa', value: 25 }, answer: 'left' },
        { left: { emoji: '🧵', label: 'İplik', value: 90 }, right: { emoji: '📎', label: 'Ataç', value: 5 }, answer: 'left' },
    ],
    many: [
        { left: { emoji: '🍬🍬🍬🍬🍬', label: '5 şeker', value: 5 }, right: { emoji: '🍬🍬', label: '2 şeker', value: 2 }, answer: 'left' },
        { left: { emoji: '⭐', label: '1 yıldız', value: 1 }, right: { emoji: '⭐⭐⭐⭐', label: '4 yıldız', value: 4 }, answer: 'right' },
        { left: { emoji: '🎈🎈🎈', label: '3 balon', value: 3 }, right: { emoji: '🎈', label: '1 balon', value: 1 }, answer: 'left' },
        { left: { emoji: '🍎🍎', label: '2 elma', value: 2 }, right: { emoji: '🍎🍎🍎🍎🍎🍎', label: '6 elma', value: 6 }, answer: 'right' },
        { left: { emoji: '🌸🌸🌸🌸', label: '4 çiçek', value: 4 }, right: { emoji: '🌸🌸', label: '2 çiçek', value: 2 }, answer: 'left' },
        { left: { emoji: '🐦', label: '1 kuş', value: 1 }, right: { emoji: '🐦🐦🐦', label: '3 kuş', value: 3 }, answer: 'right' },
        { left: { emoji: '🍪🍪🍪🍪🍪🍪🍪', label: '7 kurabiye', value: 7 }, right: { emoji: '🍪🍪🍪', label: '3 kurabiye', value: 3 }, answer: 'left' },
        { left: { emoji: '💎💎', label: '2 elmas', value: 2 }, right: { emoji: '💎💎💎💎💎', label: '5 elmas', value: 5 }, answer: 'right' },
    ],
};

interface BalanceScaleGameScreenProps {
    onBack: () => void;
}

const BalanceScaleGameScreen: React.FC<BalanceScaleGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
    const [selectedConcept, setSelectedConcept] = useState<ConceptType | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [totalQuestions] = useState(5);
    const [tiltAngle, setTiltAngle] = useState(0);
    const [showResult, setShowResult] = useState<'correct' | 'wrong' | null>(null);
    const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);
    const soundRef = useRef<ReturnType<typeof createBalanceSound> | null>(null);
    const questionsRef = useRef<Question[]>([]);

    useEffect(() => {
        soundRef.current = createBalanceSound();
    }, []);

    const shuffleArray = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    const startGame = useCallback((concept: ConceptType) => {
        setSelectedConcept(concept);
        const conceptData = CONCEPTS.find(c => c.type === concept)!;
        const pool = shuffleArray(QUESTION_POOLS[concept]).slice(0, totalQuestions);

        questionsRef.current = pool.map(q => ({
            concept,
            questionText: conceptData.questionPrefix,
            correctAnswer: q.answer,
            leftItem: q.left,
            rightItem: q.right,
        }));

        setQuestionIndex(0);
        setScore(0);
        setCurrentQuestion(questionsRef.current[0]);
        setTiltAngle(0);
        setShowResult(null);
        setSelectedSide(null);
        setGameState('playing');
    }, [totalQuestions]);

    const handleAnswer = useCallback((side: 'left' | 'right') => {
        if (!currentQuestion || showResult) return;

        setSelectedSide(side);
        const isCorrect = side === currentQuestion.correctAnswer;

        // Animate tilt
        const targetAngle = currentQuestion.correctAnswer === 'left' ? -15 : 15;
        setTiltAngle(targetAngle);
        soundRef.current?.playTilt();

        setTimeout(() => {
            if (isCorrect) {
                setScore(s => s + 1);
                setShowResult('correct');
                soundRef.current?.playCorrect();
            } else {
                setShowResult('wrong');
                soundRef.current?.playWrong();
            }

            // Next question after delay
            setTimeout(() => {
                if (questionIndex < totalQuestions - 1) {
                    setQuestionIndex(i => i + 1);
                    setCurrentQuestion(questionsRef.current[questionIndex + 1]);
                    setTiltAngle(0);
                    setShowResult(null);
                    setSelectedSide(null);
                } else {
                    setGameState('result');
                }
            }, 1200);
        }, 500);
    }, [currentQuestion, showResult, questionIndex, totalQuestions]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-6xl mb-4">⚖️</div>
                <h1 className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600 mb-2">
                    Tartı Dengele
                </h1>
                <p className="text-gray-600 mb-6">Bir kavram seç ve oynamaya başla!</p>

                <div className="grid grid-cols-2 gap-3">
                    {CONCEPTS.map(concept => (
                        <button
                            key={concept.type}
                            onClick={() => startGame(concept.type)}
                            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
                        >
                            <span className="text-3xl">{concept.icon}</span>
                            <span className="font-bold text-amber-800 text-sm">{concept.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        if (!currentQuestion) return null;
        const conceptData = CONCEPTS.find(c => c.type === currentQuestion.concept)!;

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200">
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    <button onClick={onBack} className="bg-white/90 rounded-full p-3 shadow-lg">
                        <ArrowLeftIcon className="w-6 h-6 text-amber-600" />
                    </button>
                    <div className="flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 shadow-lg">
                        <span className="text-2xl">{conceptData.icon}</span>
                        <span className="font-bold text-amber-800">{conceptData.label}</span>
                    </div>
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-full px-4 py-2 shadow-lg">
                        <span className="font-bold text-white">{questionIndex + 1}/{totalQuestions}</span>
                    </div>
                </div>

                {/* Question */}
                <div className="text-center py-4">
                    <h2 className="text-2xl sm:text-3xl font-black text-amber-800 drop-shadow-sm">
                        {currentQuestion.questionText}
                    </h2>
                </div>

                {/* Scale */}
                <div className="flex-1 flex flex-col items-center justify-center px-4">
                    {/* Scale beam and items */}
                    <div
                        className="relative w-full max-w-sm transition-transform duration-500 ease-out"
                        style={{ transform: `rotate(${tiltAngle}deg)` }}
                    >
                        {/* Beam */}
                        <div className="h-3 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 rounded-full shadow-lg" />

                        {/* Left platform */}
                        <div className="absolute -left-4 -top-2">
                            <div className="w-4 h-16 bg-amber-700 mx-auto rounded-b" />
                            <button
                                onClick={() => handleAnswer('left')}
                                disabled={showResult !== null}
                                className={`-mt-1 w-32 sm:w-40 h-24 sm:h-28 bg-gradient-to-b from-amber-200 to-amber-300 rounded-xl shadow-xl flex flex-col items-center justify-center gap-1 border-4 transition-all ${selectedSide === 'left'
                                        ? showResult === 'correct' ? 'border-green-500 bg-green-100' : showResult === 'wrong' ? 'border-red-400' : 'border-amber-500'
                                        : 'border-amber-400 hover:border-amber-500 hover:scale-105 active:scale-95'
                                    } ${showResult && selectedSide !== 'left' && currentQuestion.correctAnswer === 'left' ? 'border-green-500' : ''}`}
                            >
                                <span className="text-4xl sm:text-5xl">{currentQuestion.leftItem.emoji}</span>
                                <span className="text-xs sm:text-sm font-bold text-amber-800">{currentQuestion.leftItem.label}</span>
                            </button>
                        </div>

                        {/* Right platform */}
                        <div className="absolute -right-4 -top-2">
                            <div className="w-4 h-16 bg-amber-700 mx-auto rounded-b" />
                            <button
                                onClick={() => handleAnswer('right')}
                                disabled={showResult !== null}
                                className={`-mt-1 w-32 sm:w-40 h-24 sm:h-28 bg-gradient-to-b from-amber-200 to-amber-300 rounded-xl shadow-xl flex flex-col items-center justify-center gap-1 border-4 transition-all ${selectedSide === 'right'
                                        ? showResult === 'correct' ? 'border-green-500 bg-green-100' : showResult === 'wrong' ? 'border-red-400' : 'border-amber-500'
                                        : 'border-amber-400 hover:border-amber-500 hover:scale-105 active:scale-95'
                                    } ${showResult && selectedSide !== 'right' && currentQuestion.correctAnswer === 'right' ? 'border-green-500' : ''}`}
                            >
                                <span className="text-4xl sm:text-5xl">{currentQuestion.rightItem.emoji}</span>
                                <span className="text-xs sm:text-sm font-bold text-amber-800">{currentQuestion.rightItem.label}</span>
                            </button>
                        </div>

                        {/* Center stand */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-1">
                            <div className="w-6 h-24 bg-gradient-to-b from-amber-700 to-amber-900 rounded-b-lg shadow-lg" />
                            <div className="w-16 h-4 bg-amber-900 rounded-lg -mt-1 mx-auto shadow-lg" />
                        </div>
                    </div>

                    {/* Result feedback */}
                    {showResult && (
                        <div className={`mt-8 px-6 py-3 rounded-full shadow-lg animate-bounce ${showResult === 'correct'
                                ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                                : 'bg-gradient-to-r from-red-400 to-rose-500'
                            }`}>
                            <span className="text-white font-bold text-xl">
                                {showResult === 'correct' ? '✅ Doğru!' : '❌ Tekrar dene!'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Score */}
                <div className="p-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/80 rounded-full px-6 py-2 shadow-lg">
                        <span className="text-2xl">⭐</span>
                        <span className="font-bold text-amber-800 text-xl">{score}</span>
                    </div>
                </div>
            </div>
        );
    };

    const renderResult = () => {
        const perfect = score === totalQuestions;
        const conceptData = selectedConcept ? CONCEPTS.find(c => c.type === selectedConcept) : null;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-6xl mb-4">{perfect ? '🏆' : score >= 3 ? '🎉' : '💪'}</div>
                    <h2 className="text-2xl font-black text-amber-800 mb-2">
                        {perfect ? 'Mükemmel!' : score >= 3 ? 'Harika!' : 'İyi Deneme!'}
                    </h2>
                    <p className="text-gray-600 mb-4">
                        {conceptData?.label} konusunda
                    </p>
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-4 mb-6">
                        <div className="text-white text-lg">Skor</div>
                        <div className="text-white text-4xl font-black">{score}/{totalQuestions}</div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => startGame(selectedConcept!)}
                            className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Tekrar Oyna 🔄
                        </button>
                        <button
                            onClick={() => setGameState('menu')}
                            className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Kategori Seç 📚
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
            {/* Back button for menu */}
            {gameState === 'menu' && (
                <button
                    onClick={onBack}
                    className="absolute top-4 left-4 z-50 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                >
                    <ArrowLeftIcon className="w-6 h-6 text-amber-600" />
                </button>
            )}

            {gameState === 'menu' && renderMenu()}
            {gameState === 'playing' && renderPlaying()}
            {gameState === 'result' && renderResult()}

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

export default BalanceScaleGameScreen;
