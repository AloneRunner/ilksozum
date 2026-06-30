import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';

// --- Sound Effects ---
const createMazeSound = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playMove = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
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

    const playStar = () => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    };

    return { playMove, playWin, playStar };
};

// --- Types ---
interface Cell {
    row: number;
    col: number;
    walls: { top: boolean; right: boolean; bottom: boolean; left: boolean };
    visited: boolean;
}

interface Star {
    row: number;
    col: number;
    collected: boolean;
}

// --- Maze Levels ---
const LEVELS = [
    { size: 4, stars: 1, name: 'Çok Kolay' },
    { size: 4, stars: 2, name: 'Kolay' },
    { size: 5, stars: 2, name: 'Orta' },
    { size: 5, stars: 3, name: 'Zor' },
    { size: 6, stars: 3, name: 'Çok Zor' },
];

interface MazeGameScreenProps {
    onBack: () => void;
}

const MazeGameScreen: React.FC<MazeGameScreenProps> = ({ onBack }) => {
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'won'>('menu');
    const [level, setLevel] = useState(0);
    const [maze, setMaze] = useState<Cell[][]>([]);
    const [mousePos, setMousePos] = useState({ row: 0, col: 0 });
    const [stars, setStars] = useState<Star[]>([]);
    const [collectedStars, setCollectedStars] = useState(0);
    const [visitedPath, setVisitedPath] = useState<Set<string>>(new Set(['0,0']));
    const [isDrawing, setIsDrawing] = useState(false);
    const mazeRef = useRef<HTMLDivElement>(null);
    const soundRef = useRef<ReturnType<typeof createMazeSound> | null>(null);

    useEffect(() => {
        soundRef.current = createMazeSound();
    }, []);

    // Generate maze using recursive backtracking
    const generateMaze = useCallback((size: number): Cell[][] => {
        const grid: Cell[][] = [];

        for (let row = 0; row < size; row++) {
            grid[row] = [];
            for (let col = 0; col < size; col++) {
                grid[row][col] = {
                    row, col,
                    walls: { top: true, right: true, bottom: true, left: true },
                    visited: false,
                };
            }
        }

        const stack: Cell[] = [];
        const start = grid[0][0];
        start.visited = true;
        stack.push(start);

        while (stack.length > 0) {
            const current = stack[stack.length - 1];
            const neighbors: Cell[] = [];

            const { row, col } = current;
            if (row > 0 && !grid[row - 1][col].visited) neighbors.push(grid[row - 1][col]);
            if (row < size - 1 && !grid[row + 1][col].visited) neighbors.push(grid[row + 1][col]);
            if (col > 0 && !grid[row][col - 1].visited) neighbors.push(grid[row][col - 1]);
            if (col < size - 1 && !grid[row][col + 1].visited) neighbors.push(grid[row][col + 1]);

            if (neighbors.length > 0) {
                const next = neighbors[Math.floor(Math.random() * neighbors.length)];

                if (next.row < current.row) {
                    current.walls.top = false;
                    next.walls.bottom = false;
                } else if (next.row > current.row) {
                    current.walls.bottom = false;
                    next.walls.top = false;
                } else if (next.col < current.col) {
                    current.walls.left = false;
                    next.walls.right = false;
                } else {
                    current.walls.right = false;
                    next.walls.left = false;
                }

                next.visited = true;
                stack.push(next);
            } else {
                stack.pop();
            }
        }

        return grid;
    }, []);

    const placeStars = useCallback((count: number, size: number): Star[] => {
        const newStars: Star[] = [];
        const usedPositions = new Set<string>();
        usedPositions.add('0,0');
        usedPositions.add(`${size - 1},${size - 1}`);

        while (newStars.length < count) {
            const row = Math.floor(Math.random() * size);
            const col = Math.floor(Math.random() * size);
            const key = `${row},${col}`;

            if (!usedPositions.has(key)) {
                usedPositions.add(key);
                newStars.push({ row, col, collected: false });
            }
        }

        return newStars;
    }, []);

    const startLevel = useCallback((levelIndex: number) => {
        const levelData = LEVELS[levelIndex] || LEVELS[LEVELS.length - 1];
        const newMaze = generateMaze(levelData.size);
        const newStars = placeStars(levelData.stars, levelData.size);

        setMaze(newMaze);
        setStars(newStars);
        setMousePos({ row: 0, col: 0 });
        setCollectedStars(0);
        setVisitedPath(new Set(['0,0']));
        setGameState('playing');
    }, [generateMaze, placeStars]);

    const startGame = useCallback(() => {
        setLevel(0);
        startLevel(0);
    }, [startLevel]);

    // Check if can move between cells
    const canMoveTo = useCallback((fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
        if (toRow < 0 || toRow >= maze.length || toCol < 0 || toCol >= maze[0]?.length) return false;

        const current = maze[fromRow]?.[fromCol];
        if (!current) return false;

        if (toRow < fromRow) return !current.walls.top;
        if (toRow > fromRow) return !current.walls.bottom;
        if (toCol < fromCol) return !current.walls.left;
        if (toCol > fromCol) return !current.walls.right;

        return false;
    }, [maze]);

    // Move mouse to a new cell
    const moveTo = useCallback((newRow: number, newCol: number) => {
        if (gameState !== 'playing') return;

        // Check adjacency and wall
        const rowDiff = Math.abs(newRow - mousePos.row);
        const colDiff = Math.abs(newCol - mousePos.col);

        // Must be adjacent
        if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
            if (canMoveTo(mousePos.row, mousePos.col, newRow, newCol)) {
                soundRef.current?.playMove();
                setMousePos({ row: newRow, col: newCol });
                setVisitedPath(prev => new Set([...prev, `${newRow},${newCol}`]));

                // Check star
                const starIndex = stars.findIndex(s => s.row === newRow && s.col === newCol && !s.collected);
                if (starIndex !== -1) {
                    soundRef.current?.playStar();
                    setStars(prev => prev.map((s, i) => i === starIndex ? { ...s, collected: true } : s));
                    setCollectedStars(c => c + 1);
                }

                // Check win
                if (newRow === maze.length - 1 && newCol === maze.length - 1) {
                    soundRef.current?.playWin();
                    setTimeout(() => setGameState('won'), 300);
                }
            }
        }
    }, [gameState, mousePos, canMoveTo, stars, maze]);

    // Get cell from touch/mouse coordinates
    const getCellFromPoint = useCallback((clientX: number, clientY: number): { row: number; col: number } | null => {
        if (!mazeRef.current || maze.length === 0) return null;

        const rect = mazeRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const size = maze.length;
        const cellWidth = rect.width / size;
        const cellHeight = rect.height / size;

        const col = Math.floor(x / cellWidth);
        const row = Math.floor(y / cellHeight);

        if (row >= 0 && row < size && col >= 0 && col < size) {
            return { row, col };
        }
        return null;
    }, [maze]);

    // Touch/Mouse handlers for trace drawing
    const handlePointerDown = useCallback((e: React.PointerEvent) => {
        if (gameState !== 'playing') return;

        const cell = getCellFromPoint(e.clientX, e.clientY);
        if (cell && cell.row === mousePos.row && cell.col === mousePos.col) {
            setIsDrawing(true);
        }
    }, [gameState, getCellFromPoint, mousePos]);

    const handlePointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDrawing || gameState !== 'playing') return;

        const cell = getCellFromPoint(e.clientX, e.clientY);
        if (cell) {
            moveTo(cell.row, cell.col);
        }
    }, [isDrawing, gameState, getCellFromPoint, moveTo]);

    const handlePointerUp = useCallback(() => {
        setIsDrawing(false);
    }, []);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameState !== 'playing') return;

            let newRow = mousePos.row;
            let newCol = mousePos.col;

            switch (e.key) {
                case 'ArrowUp': case 'w': case 'W': newRow--; break;
                case 'ArrowDown': case 's': case 'S': newRow++; break;
                case 'ArrowLeft': case 'a': case 'A': newCol--; break;
                case 'ArrowRight': case 'd': case 'D': newCol++; break;
                default: return;
            }

            if (canMoveTo(mousePos.row, mousePos.col, newRow, newCol)) {
                moveTo(newRow, newCol);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, mousePos, canMoveTo, moveTo]);

    const renderMenu = () => (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-400 p-4">
            <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full text-center">
                <div className="text-7xl mb-4">🐭🧀</div>
                <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-2">
                    Labirent
                </h1>
                <p className="text-gray-600 mb-2">Fareyi peynire götür!</p>
                <p className="text-sm text-gray-500 mb-6">
                    👆 Parmağınla yol çizerek fareyi götür!
                </p>

                <button
                    onClick={startGame}
                    className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-xl px-10 py-4 rounded-full shadow-lg hover:scale-105 transition-transform mb-4"
                >
                    Başla! 🎮
                </button>

                <div className="grid grid-cols-5 gap-2 text-sm">
                    {LEVELS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => { setLevel(i); startLevel(i); }}
                            className="bg-amber-100 hover:bg-amber-200 rounded-lg py-2 font-medium text-amber-800"
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderPlaying = () => {
        const size = maze.length;
        if (size === 0) return null;

        const cellSize = Math.min(60, (window.innerWidth - 48) / size, (window.innerHeight - 250) / size);

        return (
            <div className="absolute inset-0 flex flex-col bg-gradient-to-b from-sky-300 via-sky-200 to-emerald-200">
                {/* Header */}
                <div className="flex items-center justify-between p-3 bg-white/80 shadow-md">
                    <button onClick={onBack} className="bg-white rounded-full p-2 shadow">
                        <ArrowLeftIcon className="w-6 h-6 text-amber-600" />
                    </button>

                    <div className="bg-amber-500 text-white rounded-full px-4 py-1 font-bold text-lg">
                        Seviye {level + 1}
                    </div>

                    <div className="bg-emerald-500 text-white rounded-full px-4 py-1 font-bold text-lg">
                        ⭐ {collectedStars}/{stars.length}
                    </div>
                </div>

                {/* Instruction */}
                <div className="text-center py-3">
                    <p className="text-amber-800 font-bold text-lg">
                        👆 Fareye dokun ve parmağınla yol çiz! 🐭➡️🧀
                    </p>
                </div>

                {/* Maze Grid */}
                <div className="flex-1 flex items-center justify-center p-4">
                    <div
                        ref={mazeRef}
                        className="relative bg-amber-50 rounded-2xl shadow-xl p-1 touch-none"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
                            gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
                            gap: '0px',
                        }}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerLeave={handlePointerUp}
                    >
                        {maze.flat().map((cell) => {
                            const isMouse = cell.row === mousePos.row && cell.col === mousePos.col;
                            const isCheese = cell.row === size - 1 && cell.col === size - 1;
                            const star = stars.find(s => s.row === cell.row && s.col === cell.col && !s.collected);
                            const isStart = cell.row === 0 && cell.col === 0;
                            const isVisited = visitedPath.has(`${cell.row},${cell.col}`);

                            return (
                                <div
                                    key={`${cell.row}-${cell.col}`}
                                    className={`relative flex items-center justify-center transition-colors ${isVisited ? 'bg-amber-200' :
                                            isStart ? 'bg-green-100' :
                                                isCheese ? 'bg-yellow-100' : 'bg-white'
                                        }`}
                                    style={{
                                        width: cellSize,
                                        height: cellSize,
                                        borderTop: cell.walls.top ? '3px solid #78350f' : '1px solid #fef3c7',
                                        borderRight: cell.walls.right ? '3px solid #78350f' : '1px solid #fef3c7',
                                        borderBottom: cell.walls.bottom ? '3px solid #78350f' : '1px solid #fef3c7',
                                        borderLeft: cell.walls.left ? '3px solid #78350f' : '1px solid #fef3c7',
                                    }}
                                >
                                    {/* Star */}
                                    {star && (
                                        <span className="absolute text-xl animate-pulse">⭐</span>
                                    )}

                                    {/* Cheese at end */}
                                    {isCheese && !isMouse && (
                                        <span className="text-2xl">🧀</span>
                                    )}

                                    {/* Mouse */}
                                    {isMouse && (
                                        <span className={`text-2xl ${isDrawing ? 'animate-pulse' : ''}`}>🐭</span>
                                    )}

                                    {/* Start indicator */}
                                    {isStart && !isMouse && (
                                        <span className="text-lg text-green-500">🟢</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Helper buttons for phones without good touch */}
                <div className="p-3 flex justify-center">
                    <div className="grid grid-cols-3 gap-1" style={{ width: '120px' }}>
                        <div />
                        <button
                            onClick={() => {
                                const newRow = mousePos.row - 1;
                                if (canMoveTo(mousePos.row, mousePos.col, newRow, mousePos.col)) {
                                    moveTo(newRow, mousePos.col);
                                }
                            }}
                            className="bg-amber-400 hover:bg-amber-500 text-white rounded-lg p-2 text-lg shadow active:scale-95"
                        >
                            ⬆️
                        </button>
                        <div />
                        <button
                            onClick={() => {
                                const newCol = mousePos.col - 1;
                                if (canMoveTo(mousePos.row, mousePos.col, mousePos.row, newCol)) {
                                    moveTo(mousePos.row, newCol);
                                }
                            }}
                            className="bg-amber-400 hover:bg-amber-500 text-white rounded-lg p-2 text-lg shadow active:scale-95"
                        >
                            ⬅️
                        </button>
                        <div className="bg-amber-200 rounded-lg flex items-center justify-center text-lg">
                            🐭
                        </div>
                        <button
                            onClick={() => {
                                const newCol = mousePos.col + 1;
                                if (canMoveTo(mousePos.row, mousePos.col, mousePos.row, newCol)) {
                                    moveTo(mousePos.row, newCol);
                                }
                            }}
                            className="bg-amber-400 hover:bg-amber-500 text-white rounded-lg p-2 text-lg shadow active:scale-95"
                        >
                            ➡️
                        </button>
                        <div />
                        <button
                            onClick={() => {
                                const newRow = mousePos.row + 1;
                                if (canMoveTo(mousePos.row, mousePos.col, newRow, mousePos.col)) {
                                    moveTo(newRow, mousePos.col);
                                }
                            }}
                            className="bg-amber-400 hover:bg-amber-500 text-white rounded-lg p-2 text-lg shadow active:scale-95"
                        >
                            ⬇️
                        </button>
                        <div />
                    </div>
                </div>
            </div>
        );
    };

    const renderWon = () => {
        const isLastLevel = level >= LEVELS.length - 1;

        return (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 p-4">
                <div className="bg-white/95 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center animate-scale-in">
                    <div className="text-7xl mb-4">🎉</div>
                    <h2 className="text-2xl font-black text-emerald-600 mb-2">
                        {isLastLevel ? 'Tebrikler! Tüm seviyeler tamamlandı!' : `Seviye ${level + 1} Tamamlandı!`}
                    </h2>

                    <div className="flex justify-center gap-2 my-4">
                        {Array.from({ length: stars.length }).map((_, i) => (
                            <span key={i} className="text-4xl">
                                {i < collectedStars ? '⭐' : '☆'}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        {!isLastLevel && (
                            <button
                                onClick={() => {
                                    setLevel(l => l + 1);
                                    startLevel(level + 1);
                                }}
                                className="bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                            >
                                Sonraki Seviye ▶️
                            </button>
                        )}
                        <button
                            onClick={() => startLevel(level)}
                            className="bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
                        >
                            Tekrar Oyna 🔄
                        </button>
                        <button
                            onClick={() => setGameState('menu')}
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
        <div className="relative w-full h-full overflow-hidden select-none">
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

export default MazeGameScreen;
