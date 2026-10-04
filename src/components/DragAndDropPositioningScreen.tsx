import React, { useState, useEffect, useRef } from 'react';
import { nesneUrl } from '../services/nesneGorsel.ts';
import { DragAndDropPositioningRound } from '../types.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { speak, playEffect } from '../services/speechService.ts';
import SpeakerIcon from './icons/SpeakerIcon.tsx';
import { useAutoSpeak } from '../hooks/useAutoSpeak.ts';
import { getCurrentLanguage, t } from '../i18n/index.ts';
import { translateQuestion } from '../utils/translate.ts';

interface DragAndDropPositioningScreenProps {
    roundData: DragAndDropPositioningRound;
    onAdvance: (isCorrect: boolean) => void;
    onBack: () => void;
    currentCard: number;
    totalCards: number;
    isAutoSpeakEnabled: boolean;
}

const DragAndDropPositioningScreen: React.FC<DragAndDropPositioningScreenProps> = ({
    roundData, onAdvance, onBack, currentCard, totalCards, isAutoSpeakEnabled
}) => {
    const [ballPosition, setBallPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isWrong, setIsWrong] = useState(false);
    const [mistakeMade, setMistakeMade] = useState(false);
    const currentLang = getCurrentLanguage();
    const localizedQuestion = translateQuestion(roundData.question, currentLang);
    
    const dropZonesRef = useRef<Record<string, HTMLDivElement | null>>({});
    const ballRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useAutoSpeak(localizedQuestion, isAutoSpeakEnabled, roundData.id);

    useEffect(() => {
        setIsCorrect(false);
        setIsWrong(false);
        setMistakeMade(false);
        
        if (ballRef.current) {
            // Reset position but preserve the centering translation used by the CSS class
            ballRef.current.style.transform = `translate(0px, 0px) translate(-50%, -50%)`;
        }
        setBallPosition({ x: 0, y: 0 });

    }, [roundData]);
    
    const handleDragStart = (e: React.PointerEvent) => {
        if (isCorrect) return;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        setIsDragging(true);
    };

    const handleDragMove = (e: React.PointerEvent) => {
        if (!isDragging || !ballRef.current || !containerRef.current) return;
        
        const newX = ballPosition.x + e.movementX;
        const newY = ballPosition.y + e.movementY;

        setBallPosition({ x: newX, y: newY });
        // Compose translation while keeping the -50% centering from the CSS class so the ball doesn't jump
        ballRef.current.style.transform = `translate(${newX}px, ${newY}px) translate(-50%, -50%)`;
    };

    const handleDragEnd = async (e: React.PointerEvent) => {
        if (!isDragging || !ballRef.current) return;
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        setIsDragging(false);

        const ballRect = ballRef.current.getBoundingClientRect();
        const ballCenterX = ballRect.left + ballRect.width / 2;
        const ballCenterY = ballRect.top + ballRect.height / 2;
        
        let droppedInZone: string | null = null;
        
        for (const zoneName in dropZonesRef.current) {
            const zoneEl = dropZonesRef.current[zoneName];
            if (zoneEl) {
                const zoneRect = zoneEl.getBoundingClientRect();
                if (
                    ballCenterX > zoneRect.left &&
                    ballCenterX < zoneRect.right &&
                    ballCenterY > zoneRect.top &&
                    ballCenterY < zoneRect.bottom
                ) {
                    droppedInZone = zoneName;
                    break;
                }
            }
        }

        if (droppedInZone === roundData.correctZone) {
            setIsCorrect(true);
            await playEffect('correct');
            setTimeout(() => onAdvance(!mistakeMade), 1200);
        } else {
            setMistakeMade(true);
            setIsWrong(true);
            await playEffect('incorrect');
            if (ballRef.current) {
                ballRef.current.style.transition = 'transform 0.5s ease-out';
                // Reset transform while preserving centering translate
                ballRef.current.style.transform = 'translate(0px, 0px) translate(-50%, -50%)';
            }
            setTimeout(() => {
                setBallPosition({ x: 0, y: 0 });
                if(ballRef.current) ballRef.current.style.transition = '';
                setIsWrong(false);
            }, 500);
        }
    };
    
    const Zone = ({ position, gridClass }: { position: string, gridClass: string }) => (
        <div
            ref={el => { dropZonesRef.current[position] = el; }}
            className={`flex items-center justify-center rounded-xl landscape:rounded-lg border-3 landscape:border-2 border-dashed transition-all duration-300 ${gridClass}
            ${isDragging ? 'bg-slate-300/70 border-slate-500' : 'bg-slate-200/50 border-slate-400'}
            `}
        >
            {isCorrect && roundData.correctZone === position && (
                <div className="w-14 h-14 sm:w-16 sm:h-16 landscape:w-12 landscape:h-12 animate-pop-in">
                    <img src={nesneUrl(roundData.itemToDrag.imageUrl)} alt="" className="w-full h-full pointer-events-none"/>
                </div>
            )}
        </div>
    );


    return (
    <div ref={containerRef} className={`flex flex-col items-center h-full w-full max-w-lg landscape:max-w-6xl mx-auto p-4 landscape:p-2 animate-fade-in overflow-hidden ${isDragging ? 'touch-none' : ''}`}>
            {/* Compact Header for Landscape */}
            <div className="w-full flex justify-between items-center mb-4 landscape:mb-2 p-2 landscape:p-1 bg-white/50 backdrop-blur-sm rounded-full">
                <button onClick={onBack} className="p-2 landscape:p-1 rounded-full hover:bg-white/80 transition-colors" aria-label="Geri dön">
                    <ArrowLeftIcon className="w-8 h-8 landscape:w-6 landscape:h-6 text-rose-700" />
                </button>
                <div className="flex items-center gap-2 landscape:gap-3">
                    <h1 className="text-lg landscape:text-sm font-bold text-rose-800 hidden landscape:block">{localizedQuestion}</h1>
                    <button onClick={() => speak(localizedQuestion)} className="p-2 landscape:p-1 bg-rose-100 rounded-full hover:bg-rose-200 transition-colors" aria-label="Soruyu seslendir">
                        <SpeakerIcon className="w-7 h-7 landscape:w-5 landscape:h-5 text-rose-600" />
                    </button>
                </div>
                <div className="text-lg landscape:text-sm font-bold text-rose-800">{currentCard} / {totalCards}</div>
            </div>
            
            {/* Question - Only Portrait */}
            <div className="w-full landscape:hidden bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-center text-rose-800 flex items-center justify-center gap-4">
                    {localizedQuestion}
                    <button onClick={() => speak(localizedQuestion)} className="p-2 bg-rose-100 rounded-full hover:bg-rose-200 transition-colors" aria-label="Soruyu seslendir">
                        <SpeakerIcon className="w-7 h-7 text-rose-600" />
                    </button>
                </h1>
            </div>

            <div className="w-full flex-grow flex flex-col landscape:flex-row items-center landscape:justify-center gap-6 landscape:gap-8 landscape:max-h-[80vh]">
                 {/* Draggable Ball Area */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 landscape:w-32 landscape:h-32 flex items-center justify-center">
                        <div 
                            ref={ballRef}
                            onPointerDown={handleDragStart}
                            onPointerMove={handleDragMove}
                            onPointerUp={handleDragEnd}
                            onPointerCancel={handleDragEnd}
                            style={{ touchAction: 'none' }}
                            className={`w-16 h-16 sm:w-20 sm:h-20 landscape:w-20 landscape:h-20 cursor-grab ${isDragging ? 'cursor-grabbing' : ''} ${isWrong ? 'animate-shake' : ''} ${isCorrect ? 'hidden' : ''} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                        >
                            <img src={nesneUrl(roundData.itemToDrag.imageUrl)} alt={roundData.itemToDrag.word} className="w-full h-full pointer-events-none"/>
                        </div>
                </div>
                
                {/* Drop Zones Grid (Right in landscape) */}
                <div className="w-full max-w-sm landscape:w-[min(42vw,60vh)] landscape:max-w-none aspect-square relative">
                    <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-2 landscape:gap-1.5">
                        <div />
                        <Zone position="üstünde" gridClass="col-start-2 row-start-1" />
                        <div />
                        <Zone position="solunda" gridClass="col-start-1 row-start-2" />
                        <div className="relative col-start-2 row-start-2">
                            <div className="absolute inset-0 bg-amber-300 rounded-2xl flex items-center justify-center shadow-lg">
                                            <span className="font-bold text-white text-xl landscape:text-base">{t('reasoning.activities.dragAndDropPositioning.boxLabel', currentLang === 'tr' ? 'KUTU' : 'BOX')}</span>
                            </div>
                            <Zone position="içinde" gridClass="w-full h-full" />
                        </div>
                        <Zone position="sağında" gridClass="col-start-3 row-start-2" />
                        <div />
                        <Zone position="altında" gridClass="col-start-2 row-start-3" />
                        <div />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(DragAndDropPositioningScreen);
