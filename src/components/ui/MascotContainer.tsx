import React, { useState, useRef, useEffect, ReactNode, useCallback } from 'react';

interface MascotContainerProps {
    children: ReactNode;
    initialPosition?: { x: number; y: number };
    onPositionChange?: (position: { x: number; y: number }) => void;
}

/**
 * MascotContainer - Sürüklenebilir ve açılıp kapanabilir maskot container'ı
 */
const MascotContainer: React.FC<MascotContainerProps> = ({
    children,
    initialPosition,
    onPositionChange,
}) => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [position, setPosition] = useState(() => initialPosition ?? { x: 16, y: window.innerHeight - 250 });
    const [isDragging, setIsDragging] = useState(false);
    const [isPoked, setIsPoked] = useState(false);
    const [pokeCount, setPokeCount] = useState(0);
    const dragStartRef = useRef({ x: 0, y: 0, hasMoved: false });
    const containerRef = useRef<HTMLDivElement>(null);
    const draggableRef = useRef<HTMLDivElement>(null);

    // Handle drag
    const handleDragStart = useCallback((clientX: number, clientY: number) => {
        setIsDragging(true);
        dragStartRef.current = {
            x: clientX - position.x,
            y: clientY - position.y,
            hasMoved: false,
        };
    }, [position.x, position.y]);

    const handleDragMove = useCallback((clientX: number, clientY: number) => {
        const newX = clientX - dragStartRef.current.x;
        const newY = clientY - dragStartRef.current.y;

        // Check if actually moved
        if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
            dragStartRef.current.hasMoved = true;
        }

        const maxX = window.innerWidth - 120;
        const maxY = window.innerHeight - 220;

        const boundedPosition = {
            x: Math.max(0, Math.min(newX, maxX)),
            y: Math.max(0, Math.min(newY, maxY)),
        };

        setPosition(boundedPosition);
        onPositionChange?.(boundedPosition);
    }, [position.x, position.y, onPositionChange]);

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Native event listeners for proper drag handling (non-passive)
    useEffect(() => {
        const el = draggableRef.current;
        if (!el) return;

        const onTouchStart = (e: TouchEvent) => {
            handleDragStart(e.touches[0].clientX, e.touches[0].clientY);
        };

        const onMouseDown = (e: MouseEvent) => {
            handleDragStart(e.clientX, e.clientY);
        };

        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('mousedown', onMouseDown);

        return () => {
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('mousedown', onMouseDown);
        };
    }, [handleDragStart]);

    // Global move/end listeners
    useEffect(() => {
        if (!isDragging) return;

        const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            handleDragMove(e.clientX, e.clientY);
        };
        const onTouchMove = (e: TouchEvent) => {
            handleDragMove(e.touches[0].clientX, e.touches[0].clientY);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', handleDragEnd);
        window.addEventListener('touchmove', onTouchMove, { passive: true });
        window.addEventListener('touchend', handleDragEnd);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, handleDragMove, handleDragEnd]);

    // Handle poke (tap on mascot) - only if didn't drag
    const handlePoke = () => {
        if (dragStartRef.current.hasMoved) return;

        setIsPoked(true);
        setPokeCount(prev => prev + 1);

        setTimeout(() => setIsPoked(false), 600);
    };

    // Toggle minimize
    const handleToggleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMinimized(!isMinimized);
    };

    // Get poke reaction class
    const getPokeClass = () => {
        if (!isPoked) return '';
        const reactions = ['animate-wiggle', 'animate-bounce', 'animate-spin-slow', 'animate-wiggle'];
        return reactions[pokeCount % reactions.length];
    };

    return (
        <div
            ref={containerRef}
            className={`fixed z-50 transition-all duration-300 select-none ${isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'}`}
            style={{
                left: position.x,
                top: position.y,
                touchAction: 'none',
            }}
        >
            {/* Minimize/Maximize Button */}
            <button
                onClick={handleToggleMinimize}
                className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center z-10 transition-all duration-200 shadow-lg border-2 border-white/30 ${isMinimized ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-600/80 hover:bg-slate-700'
                    }`}
                aria-label={isMinimized ? 'Maskotu göster' : 'Maskotu gizle'}
            >
                <span className="text-white text-sm font-bold">{isMinimized ? '+' : '−'}</span>
            </button>

            {/* Mascot Content - Draggable */}
            <div
                ref={draggableRef}
                onClick={handlePoke}
                className={`transition-all duration-300 ${getPokeClass()} ${isMinimized ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
                    }`}
            >
                {children}
            </div>

            {/* Minimized State - Small Icon */}
            {isMinimized && (
                <div
                    onClick={handleToggleMinimize}
                    className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform border-2 border-white/30"
                >
                    <span className="text-2xl">🎭</span>
                </div>
            )}

            {/* Drag Handle Indicator */}
            {!isMinimized && !isDragging && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                </div>
            )}
        </div>
    );
};

export default MascotContainer;
