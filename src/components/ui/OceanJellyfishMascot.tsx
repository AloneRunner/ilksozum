import React, { useState, useEffect } from 'react';

export type JellyfishMood = 'idle' | 'happy' | 'sad' | 'think' | 'celebrate' | 'wave';

interface OceanJellyfishMascotProps {
    mood?: JellyfishMood;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    message?: string;
    showMessage?: boolean;
    onClick?: () => void;
}

/**
 * Ocean Jellyfish Mascot - Sevimli denizanası maskotu
 * Okyanus teması (deneme) için özel tasarım
 * Çocuklar için sakin, yumuşak hareketler
 */
const OceanJellyfishMascot: React.FC<OceanJellyfishMascotProps> = ({
    mood = 'idle',
    size = 'md',
    className = '',
    message,
    showMessage = false,
    onClick,
}) => {
    const [isBlinking, setIsBlinking] = useState(false);
    const [tentaclePhase, setTentaclePhase] = useState(0);

    // Gentle blinking
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 200);
        }, 4000 + Math.random() * 2000);
        return () => clearInterval(blinkInterval);
    }, []);

    // Tentacle animation phase
    useEffect(() => {
        const tentacleInterval = setInterval(() => {
            setTentaclePhase(p => (p + 1) % 4);
        }, 800);
        return () => clearInterval(tentacleInterval);
    }, []);

    const sizeConfig = {
        xs: { width: 48, height: 72 },
        sm: { width: 64, height: 96 },
        md: { width: 80, height: 120 },
        lg: { width: 100, height: 150 },
        xl: { width: 128, height: 192 },
    };
    const { width, height } = sizeConfig[size];

    // Colors based on mood
    const getColors = () => {
        switch (mood) {
            case 'happy':
            case 'celebrate':
                return { body: '#f0abfc', glow: '#e879f9', accent: '#d946ef' };
            case 'sad':
                return { body: '#93c5fd', glow: '#60a5fa', accent: '#3b82f6' };
            case 'think':
                return { body: '#c4b5fd', glow: '#a78bfa', accent: '#8b5cf6' };
            default:
                return { body: '#a5f3fc', glow: '#67e8f9', accent: '#22d3ee' };
        }
    };
    const colors = getColors();

    // Eye expression
    const getEyeExpression = () => {
        if (isBlinking) return 'closed';
        if (mood === 'happy' || mood === 'celebrate') return 'happy';
        if (mood === 'sad') return 'sad';
        return 'normal';
    };

    // Mouth
    const getMouth = () => {
        switch (mood) {
            case 'happy':
            case 'celebrate':
                return 'M32 52 Q40 60 48 52'; // Big smile
            case 'sad':
                return 'M34 56 Q40 50 46 56'; // Frown
            default:
                return 'M35 54 Q40 56 45 54'; // Slight smile
        }
    };

    const eyeExp = getEyeExpression();

    return (
        <div
            className={`relative inline-flex flex-col items-center ${className} ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            {/* Speech Bubble */}
            {showMessage && message && (
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg border border-cyan-200 whitespace-nowrap z-10 animate-fade-in">
                    <p className="text-xs font-medium text-cyan-800">{message}</p>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white border-b border-r border-cyan-200 transform rotate-45" />
                </div>
            )}

            <svg
                width={width}
                height={height}
                viewBox="0 0 80 120"
                role="img"
                aria-label={`Ocean Jellyfish - ${mood}`}
                className="drop-shadow-lg"
                style={{ filter: `drop-shadow(0 0 15px ${colors.glow}40)` }}
            >
                <defs>
                    <radialGradient id="jellyfishBody" cx="50%" cy="30%" r="60%">
                        <stop offset="0%" stopColor="#fff" stopOpacity="0.8" />
                        <stop offset="50%" stopColor={colors.body} stopOpacity="0.9" />
                        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.7" />
                    </radialGradient>
                    <linearGradient id="jellyfishGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={colors.glow} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={colors.accent} stopOpacity="0.2" />
                    </linearGradient>
                </defs>

                {/* Glow effect */}
                <ellipse
                    cx="40" cy="35" rx="32" ry="28"
                    fill="url(#jellyfishGlow)"
                    className={mood === 'celebrate' ? 'animate-pulse' : ''}
                />

                {/* Main body (bell) */}
                <ellipse
                    cx="40" cy="35" rx="28" ry="26"
                    fill="url(#jellyfishBody)"
                    stroke={colors.accent}
                    strokeWidth="1"
                    strokeOpacity="0.5"
                />

                {/* Body highlights */}
                <ellipse cx="30" cy="28" rx="8" ry="5" fill="#fff" opacity="0.4" />

                {/* Eyes */}
                {eyeExp === 'closed' ? (
                    <>
                        <path d="M28 38 Q33 42 38 38" stroke={colors.accent} strokeWidth="2" fill="none" strokeLinecap="round" />
                        <path d="M42 38 Q47 42 52 38" stroke={colors.accent} strokeWidth="2" fill="none" strokeLinecap="round" />
                    </>
                ) : eyeExp === 'happy' ? (
                    <>
                        <path d="M28 40 Q33 34 38 40" stroke={colors.accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M42 40 Q47 34 52 40" stroke={colors.accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
                    </>
                ) : eyeExp === 'sad' ? (
                    <>
                        <ellipse cx="33" cy="38" rx="4" ry="5" fill={colors.accent} />
                        <ellipse cx="47" cy="38" rx="4" ry="5" fill={colors.accent} />
                        <ellipse cx="34" cy="37" rx="1.5" ry="2" fill="#fff" opacity="0.8" />
                        <ellipse cx="48" cy="37" rx="1.5" ry="2" fill="#fff" opacity="0.8" />
                    </>
                ) : (
                    <>
                        <ellipse cx="33" cy="38" rx="4" ry="4" fill={colors.accent} />
                        <ellipse cx="47" cy="38" rx="4" ry="4" fill={colors.accent} />
                        <circle cx="34" cy="37" r="1.5" fill="#fff" opacity="0.9" />
                        <circle cx="48" cy="37" r="1.5" fill="#fff" opacity="0.9" />
                    </>
                )}

                {/* Cheek blush */}
                {(mood === 'happy' || mood === 'celebrate') && (
                    <>
                        <ellipse cx="25" cy="44" rx="4" ry="2" fill="#f9a8d4" opacity="0.5" />
                        <ellipse cx="55" cy="44" rx="4" ry="2" fill="#f9a8d4" opacity="0.5" />
                    </>
                )}

                {/* Mouth */}
                <path
                    d={getMouth()}
                    stroke={colors.accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                />

                {/* Tentacles - animated with phase */}
                {[0, 1, 2, 3, 4].map((i) => {
                    const baseX = 20 + i * 10;
                    const waveOffset = Math.sin((tentaclePhase + i) * 0.8) * 3;
                    const length = 35 + (i % 2) * 10;
                    return (
                        <path
                            key={i}
                            d={`M${baseX} 58 Q${baseX + waveOffset} ${58 + length / 2} ${baseX + waveOffset * 0.5} ${58 + length}`}
                            stroke={colors.body}
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="none"
                            opacity="0.8"
                        />
                    );
                })}

                {/* Inner frills */}
                <path
                    d="M18 55 Q25 52 32 55 Q40 52 48 55 Q55 52 62 55"
                    stroke={colors.accent}
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.6"
                />
            </svg>

            {/* Bubbles for celebrate mood */}
            {mood === 'celebrate' && (
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-cyan-300/60 animate-bubble"
                            style={{
                                left: `${30 + i * 15}%`,
                                bottom: '20%',
                                animationDelay: `${i * 0.3}s`,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default OceanJellyfishMascot;
