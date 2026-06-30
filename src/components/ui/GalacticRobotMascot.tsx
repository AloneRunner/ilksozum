import React, { useState, useEffect } from 'react';

export type MascotMood = 'idle' | 'happy' | 'sad' | 'think' | 'celebrate' | 'wave';

interface GalacticRobotMascotProps {
    mood?: MascotMood;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    message?: string;
    showMessage?: boolean;
    onClick?: () => void;
}

/**
 * Galactic Robot Mascot - Sevimli uzay robotu maskotu
 * Farklı ruh hallerine göre animasyonlar ve ifadeler gösterir
 * Çocuklar için özel tasarlanmış, yumuşak köşeler ve canlı renkler
 */
const GalacticRobotMascot: React.FC<GalacticRobotMascotProps> = ({
    mood = 'idle',
    size = 'md',
    className = '',
    message,
    showMessage = false,
    onClick,
}) => {
    const [isBlinking, setIsBlinking] = useState(false);
    const [antennaGlow, setAntennaGlow] = useState(false);

    // Random blinking effect
    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
        }, 3000 + Math.random() * 2000);
        return () => clearInterval(blinkInterval);
    }, []);

    // Antenna glow animation
    useEffect(() => {
        if (mood === 'celebrate' || mood === 'happy') {
            const glowInterval = setInterval(() => {
                setAntennaGlow(prev => !prev);
            }, 500);
            return () => clearInterval(glowInterval);
        }
    }, [mood]);

    // Size configurations
    const sizeConfig = {
        xs: { width: 48, height: 64, fontSize: 8 },
        sm: { width: 64, height: 80, fontSize: 10 },
        md: { width: 96, height: 120, fontSize: 12 },
        lg: { width: 128, height: 160, fontSize: 14 },
        xl: { width: 160, height: 200, fontSize: 16 },
    };
    const { width, height } = sizeConfig[size];

    // Eye expressions based on mood
    const getEyeExpression = () => {
        if (isBlinking || mood === 'sad') {
            return { type: 'closed' };
        }
        switch (mood) {
            case 'happy':
            case 'celebrate':
                return { type: 'happy', shine: true };
            case 'think':
                return { type: 'look-up' };
            case 'wave':
                return { type: 'wink' };
            default:
                return { type: 'normal', shine: true };
        }
    };

    // Mouth path based on mood
    const getMouthPath = () => {
        switch (mood) {
            case 'happy':
            case 'celebrate':
                return 'M32 58 Q48 70 64 58'; // Big smile
            case 'sad':
                return 'M35 62 Q48 52 61 62'; // Frown
            case 'think':
                return 'M40 58 Q48 62 56 58'; // Small pout
            case 'wave':
                return 'M34 58 Q48 66 62 58'; // Friendly smile
            default:
                return 'M38 58 Q48 64 58 58'; // Gentle smile
        }
    };

    // Animation classes
    const getAnimationClass = () => {
        switch (mood) {
            case 'celebrate':
                return 'animate-bounce';
            case 'happy':
                return 'animate-pulse';
            case 'wave':
                return 'animate-wave';
            default:
                return '';
        }
    };

    const eyeExp = getEyeExpression();

    // Colors based on mood
    const primaryColor = mood === 'celebrate' ? '#22d3ee' : '#60a5fa';
    const secondaryColor = mood === 'celebrate' ? '#a855f7' : '#3b82f6';
    const glowColor = mood === 'happy' ? '#10b981' : mood === 'sad' ? '#f87171' : '#fbbf24';

    // Unique ID for gradients to prevent conflicts
    const id = React.useId ? React.useId() : Math.random().toString(36).substr(2, 9);
    const bodyGradId = `galacticBodyGrad-${id}`;
    const headGradId = `galacticHeadGrad-${id}`;
    const visorGradId = `galacticVisorGrad-${id}`;
    const glowId = `galacticGlow-${id}`;
    const shadowId = `galacticShadow-${id}`;

    return (
        <div
            className={`relative inline-flex flex-col items-center ${className} ${onClick ? 'cursor-pointer' : ''}`}
            onClick={onClick}
        >
            {/* Speech Bubble */}
            {showMessage && message && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg border border-sky-200 whitespace-nowrap z-10 animate-fade-in">
                    <p className="text-xs font-medium text-sky-800">{message}</p>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-white border-b border-r border-sky-200 transform rotate-45" />
                </div>
            )}

            <svg
                width={width}
                height={height}
                viewBox="0 0 96 120"
                role="img"
                aria-label={`Galactic Robot - ${mood}`}
                className={`drop-shadow-lg ${getAnimationClass()}`}
            >
                <defs>
                    {/* Gradients */}
                    <linearGradient id={bodyGradId} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={primaryColor} />
                        <stop offset="100%" stopColor={secondaryColor} />
                    </linearGradient>
                    <linearGradient id={headGradId} x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#93c5fd" />
                        <stop offset="50%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id={visorGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor={glowColor} stopOpacity="0.8" />
                        <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
                    </radialGradient>
                    <filter id={shadowId} x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#1e40af" floodOpacity="0.3" />
                    </filter>
                </defs>

                {/* Antenna */}
                <g>
                    <line x1="48" y1="18" x2="48" y2="8" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                    <circle
                        cx="48"
                        cy="5"
                        r="5"
                        fill={antennaGlow ? glowColor : '#fbbf24'}
                        className={mood === 'celebrate' ? 'animate-ping' : ''}
                    />
                    <circle cx="48" cy="5" r="3" fill="#fef3c7" />
                </g>

                {/* Head */}
                <rect
                    x="22"
                    y="18"
                    width="52"
                    height="44"
                    rx="12"
                    fill={`url(#${headGradId})`}
                    stroke="#1e40af"
                    strokeWidth="2"
                    filter={`url(#${shadowId})`}
                />

                {/* Ear antennas */}
                <circle cx="18" cy="35" r="6" fill="#60a5fa" stroke="#1e40af" strokeWidth="2" />
                <circle cx="18" cy="35" r="3" fill="#22d3ee" />
                <circle cx="78" cy="35" r="6" fill="#60a5fa" stroke="#1e40af" strokeWidth="2" />
                <circle cx="78" cy="35" r="3" fill="#22d3ee" />

                {/* Visor/Face area */}
                <rect x="28" y="26" width="40" height="28" rx="8" fill={`url(#${visorGradId})`} />

                {/* Visor reflection */}
                <path
                    d="M30 30 Q38 28 50 30"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                />

                {/* Eyes */}
                <g>
                    {eyeExp.type === 'closed' ? (
                        <>
                            <path d="M34 40 Q40 43 46 40" stroke="#22d3ee" strokeWidth="3" fill="none" strokeLinecap="round" />
                            <path d="M50 40 Q56 43 62 40" stroke="#22d3ee" strokeWidth="3" fill="none" strokeLinecap="round" />
                        </>
                    ) : eyeExp.type === 'happy' ? (
                        <>
                            <path d="M34 42 Q40 36 46 42" stroke="#22d3ee" strokeWidth="3" fill="none" strokeLinecap="round" />
                            <path d="M50 42 Q56 36 62 42" stroke="#22d3ee" strokeWidth="3" fill="none" strokeLinecap="round" />
                        </>
                    ) : eyeExp.type === 'wink' ? (
                        <>
                            <circle cx="40" cy="40" r="6" fill="#22d3ee" />
                            {eyeExp.shine && <circle cx="42" cy="38" r="2" fill="#fff" opacity="0.9" />}
                            <path d="M50 42 Q56 36 62 42" stroke="#22d3ee" strokeWidth="3" fill="none" strokeLinecap="round" />
                        </>
                    ) : (
                        <>
                            <circle cx="40" cy="40" r="6" fill="#22d3ee" />
                            <circle cx="56" cy="40" r="6" fill="#22d3ee" />
                            {eyeExp.shine && (
                                <>
                                    <circle cx="42" cy="38" r="2" fill="#fff" opacity="0.9" />
                                    <circle cx="58" cy="38" r="2" fill="#fff" opacity="0.9" />
                                </>
                            )}
                        </>
                    )}
                </g>

                {/* Cheek blush for happy moods */}
                {(mood === 'happy' || mood === 'celebrate') && (
                    <>
                        <ellipse cx="30" cy="48" rx="4" ry="2" fill="#f9a8d4" opacity="0.6" />
                        <ellipse cx="66" cy="48" rx="4" ry="2" fill="#f9a8d4" opacity="0.6" />
                    </>
                )}

                {/* Mouth */}
                <path
                    d={getMouthPath()}
                    stroke={mood === 'sad' ? '#f87171' : '#22d3ee'}
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                />

                {/* Body */}
                <rect
                    x="28"
                    y="66"
                    width="40"
                    height="36"
                    rx="8"
                    fill={`url(#${bodyGradId})`}
                    stroke="#1e40af"
                    strokeWidth="2"
                />

                {/* Chest panel */}
                <rect x="36" y="72" width="24" height="24" rx="6" fill="#1e293b" opacity="0.5" />

                {/* Heart/Core light */}
                <circle cx="48" cy="84" r="6" fill={`url(#${glowId})`} />
                <circle
                    cx="48"
                    cy="84"
                    r="4"
                    fill={glowColor}
                    className={mood === 'celebrate' ? 'animate-ping' : mood === 'happy' ? 'animate-pulse' : ''}
                />
                <circle cx="48" cy="84" r="2" fill="#fff" opacity="0.8" />

                {/* Arms */}
                <g className={mood === 'wave' ? 'animate-wave-arm' : ''}>
                    <rect x="12" y="68" width="14" height="26" rx="7" fill="#60a5fa" stroke="#1e40af" strokeWidth="2" />
                    <circle cx="19" cy="96" r="5" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
                </g>
                <g>
                    <rect x="70" y="68" width="14" height="26" rx="7" fill="#60a5fa" stroke="#1e40af" strokeWidth="2" />
                    <circle cx="77" cy="96" r="5" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
                </g>

                {/* Legs */}
                <rect x="34" y="102" width="12" height="14" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />
                <rect x="50" y="102" width="12" height="14" rx="4" fill="#3b82f6" stroke="#1e40af" strokeWidth="2" />

                {/* Feet */}
                <ellipse cx="40" cy="118" rx="8" ry="3" fill="#1e40af" />
                <ellipse cx="56" cy="118" rx="8" ry="3" fill="#1e40af" />
            </svg>

            {/* Celebration particles */}
            {mood === 'celebrate' && (
                <div className="absolute inset-0 pointer-events-none overflow-visible">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full animate-float-particle"
                            style={{
                                left: `${20 + i * 12}%`,
                                top: `${10 + (i % 3) * 15}%`,
                                backgroundColor: ['#fbbf24', '#22d3ee', '#a855f7', '#10b981', '#f472b6', '#60a5fa'][i],
                                animationDelay: `${i * 0.2}s`,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default GalacticRobotMascot;
