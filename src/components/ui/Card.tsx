import React from 'react';
import CheckIcon from '../icons/CheckIcon.tsx';
import { getCurrentLanguage } from '../../i18n/index.ts';
import { translateLabel } from '../../utils/translate.ts';
import { useAppContext } from '../../contexts/AppContext.ts';
import SmartImage from './SmartImage.tsx';

interface CardProps {
    imageUrl: string;
    word?: string;
    isRevealed?: boolean;
    isCorrect?: boolean;
    isSelected?: boolean;
    isFlipped?: boolean;
    isDisabled?: boolean;
    onClick: () => void;
    className?: string;
    children?: React.ReactNode;
    ariaLabel?: string;
    showCheckmark?: boolean;
    isFlippable?: boolean;
    isLetterActivity?: boolean;
}

const Card: React.FC<CardProps> = ({
    imageUrl,
    word,
    isRevealed = true,
    isCorrect = false,
    isSelected = false,
    isFlipped = false,
    isDisabled = false,
    onClick,
    className = '',
    children,
    ariaLabel,
    showCheckmark = false,
    isFlippable = false,
    isLetterActivity = false,
}) => {
    const { settings } = useAppContext();
    const currentLang = getCurrentLanguage();
    const resolvedWord = word ? (currentLang === 'tr' ? word : translateLabel(word, currentLang)) : undefined;
    const labelSizeClass = isLetterActivity ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl';

    // Tema bazlı etiket renkleri
    const getLabelColors = () => {
        const themeColors: Record<string, { bg: string; text: string; border: string }> = {
            simple: { bg: 'bg-purple-100/90 backdrop-blur-sm border border-purple-300/50', text: 'text-purple-900', border: 'border-purple-300/50' },
            gunes: { bg: 'bg-gradient-to-br from-yellow-200/95 via-amber-200/90 to-orange-200/85 backdrop-blur-sm border border-yellow-400/60', text: 'text-orange-900 font-bold', border: 'border-yellow-400/60' },
            tilki: { bg: 'bg-green-100/90 backdrop-blur-sm border border-green-300/50', text: 'text-green-900', border: 'border-green-300/50' },
            ay: { bg: 'bg-indigo-100/90 backdrop-blur-sm border border-indigo-300/50', text: 'text-indigo-900', border: 'border-indigo-300/50' },
            geceorman: { bg: 'bg-indigo-200/90 backdrop-blur-sm border border-indigo-400/50', text: 'text-indigo-900', border: 'border-indigo-400/50' },
            yagmur: { bg: 'bg-slate-100/90 backdrop-blur-sm border border-slate-300/50', text: 'text-slate-900', border: 'border-slate-300/50' },
            kus: { bg: 'bg-sky-100/90 backdrop-blur-sm border border-sky-300/50', text: 'text-sky-900', border: 'border-sky-300/50' },
            tilki2: { bg: 'bg-lime-100/90 backdrop-blur-sm border border-lime-300/50', text: 'text-lime-900', border: 'border-lime-300/50' },
            kedi: { bg: 'bg-green-100/90 backdrop-blur-sm border border-green-300/50', text: 'text-green-900', border: 'border-green-300/50' },
            kar: { bg: 'bg-sky-50/90 backdrop-blur-sm border border-sky-200/50', text: 'text-sky-900', border: 'border-sky-200/50' },
            gunbatimi: { bg: 'bg-orange-100/90 backdrop-blur-sm border border-orange-300/50', text: 'text-orange-900', border: 'border-orange-300/50' },
            ay2: { bg: 'bg-indigo-100/90 backdrop-blur-sm border border-indigo-300/50', text: 'text-indigo-900', border: 'border-indigo-300/50' },
            zurafa: { bg: 'bg-cyan-100/90 backdrop-blur-sm border border-cyan-300/50', text: 'text-cyan-900', border: 'border-cyan-300/50' },
            geometri: { bg: 'bg-rose-100/90 backdrop-blur-sm border border-rose-300/50', text: 'text-rose-900', border: 'border-rose-300/50' },
            deneme: { bg: 'bg-gradient-to-br from-blue-900/90 via-cyan-800/80 to-teal-700/85 backdrop-blur-sm border border-cyan-400/52', text: 'text-cyan-100 font-bold', border: 'border-cyan-400/60' },
            deneme2: { bg: 'bg-slate-900/60 backdrop-blur-sm border border-sky-400/25', text: 'text-sky-100 text-glow-planet', border: 'border-sky-400/25' },
        };
        return themeColors[settings.theme] || { bg: 'bg-black/60 backdrop-blur-sm', text: 'text-white', border: '' };
    };

    const labelColors = getLabelColors();

    if (!isFlippable) {
        const baseContainer = settings.theme === 'deneme2'
            ? 'bg-slate-900/50 backdrop-blur-md border border-sky-400/20 shadow-[0_0_24px_rgba(56,189,248,0.12)]'
            : 'bg-white/70 backdrop-blur-md border border-white/50';

        const simpleCardClasses = [
            'relative w-full rounded-2xl overflow-hidden transition-all duration-300 ease-in-out group',
            baseContainer,
            className,
            isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer',
            isSelected ? 'ring-4 ring-amber-400' : '',
            isCorrect ? 'ring-4 ring-green-500' : '',
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <div
                className={simpleCardClasses}
                onClick={!isDisabled ? onClick : undefined}
                role="button"
                aria-label={ariaLabel || resolvedWord}
                aria-pressed={isSelected}
                aria-disabled={isDisabled}
                tabIndex={isDisabled ? -1 : 0}
            >
                <SmartImage
                    src={imageUrl}
                    alt={resolvedWord || 'Egitim karti'}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    onError={(e) => {
                        e.currentTarget.src = '/images/placeholder.png';
                    }}
                />

                {resolvedWord && (
                    <div
                        className={`absolute bottom-0 left-0 right-0 p-2 sm:p-3 ${labelColors.bg} transition-opacity duration-300 ${
                            isRevealed ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <p className={`${labelColors.text} text-center font-black truncate ${labelSizeClass}`}>{resolvedWord}</p>
                    </div>
                )}

                {showCheckmark && isSelected && (
                    <div className="absolute inset-0 bg-green-500/70 flex items-center justify-center rounded-2xl animate-pop-in">
                        <CheckIcon className="w-1/2 h-1/2 text-white" />
                    </div>
                )}

                {children}
            </div>
        );
    }

    const flippableBaseClasses = 'relative w-full aspect-square rounded-2xl transition-all duration-300 ease-in-out cursor-pointer group';
    const dynamicClasses = [
        className,
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105',
        isSelected && !isCorrect ? 'ring-4 ring-amber-400' : '',
        isCorrect ? 'ring-4 ring-green-500' : '',
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div
            className={`${flippableBaseClasses} ${dynamicClasses}`}
            onClick={!isDisabled ? onClick : undefined}
            role="button"
            aria-label={ariaLabel || resolvedWord}
            aria-pressed={isSelected}
            aria-disabled={isDisabled}
            tabIndex={isDisabled ? -1 : 0}
        >
            {isFlipped ? (
                <div className="absolute inset-0 w-full h-full bg-white rounded-2xl animate-fade-in">
                    <SmartImage
                        src={imageUrl}
                        alt={resolvedWord || 'Egitim karti'}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                            e.currentTarget.src = '/images/placeholder.png';
                        }}
                    />
                    {resolvedWord && (
                        <div
                            className={`absolute bottom-0 left-0 right-0 p-2 sm:p-3 ${labelColors.bg} transition-opacity duration-300 ${
                                isRevealed ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                            <p className={`${labelColors.text} text-center font-black truncate ${labelSizeClass}`}>{resolvedWord}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center animate-fade-in">
                    <svg className="w-1/2 h-1/2 text-white opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default Card;
