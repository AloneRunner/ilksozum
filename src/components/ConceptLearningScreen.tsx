import React, { useState, useEffect, useRef } from 'react';
import BasHareketi from './ui/BasHareketi.tsx';
import { Word, ActivityType } from '../types.ts';
import Card from './ui/Card.tsx';
import SpeakerIcon from './icons/SpeakerIcon.tsx';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { speak, playEffect } from '../services/speechService.ts';
import EyeIcon from './icons/EyeIcon.tsx';
import EyeSlashIcon from './icons/EyeSlashIcon.tsx';
import BanIcon from './icons/BanIcon.tsx';
import { useAutoSpeak } from '../hooks/useAutoSpeak.ts';
import { LETTER_SOUND_ACTIVITIES } from '../constants.ts';
import { t, getCurrentLanguage } from '../i18n/index.ts';
import { translateLabel, getSpeechLocale, withIndefiniteArticle } from '../utils/translate.ts';
import { AppColor, getColorClasses } from '../themes/colorManager.ts';
import { useAppContext } from '../contexts/AppContext.ts';
import CosmicBackdrop from './ui/CosmicBackdrop.tsx';
import PanelStars from './ui/PanelStars.tsx';

interface ConceptLearningScreenProps {
    word: Word;
    letter?: string;
    onAdvance: (isCorrect: boolean) => void;
    currentCard: number;
    totalCards: number;
    onBack: () => void;
    isAutoSpeakEnabled: boolean;
    onBanImage: (id: number) => void;
    isBanButtonEnabled: boolean;
    activityType: ActivityType;
    isWordLabelVisible: boolean;
    onToggleWordLabel: () => void;
    isFastTransitionEnabled: boolean;
}

const ConceptLearningScreen: React.FC<ConceptLearningScreenProps> = ({
    word, letter, onAdvance, currentCard, totalCards, onBack, isAutoSpeakEnabled,
    onBanImage, isBanButtonEnabled, activityType, isWordLabelVisible, onToggleWordLabel, isFastTransitionEnabled
}) => {
    const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    const isLetterActivity = LETTER_SOUND_ACTIVITIES.includes(activityType);

    const currentLang = getCurrentLanguage();
    const locale = getSpeechLocale(currentLang);
    const baseWord = (word as { spokenText?: string }).spokenText ?? word.word;
    const displayWord = currentLang === 'tr' ? baseWord : translateLabel(baseWord, currentLang);

    // Build localized question for Yes/No.
    // For Turkish: normalize and reconstruct the canonical question using vowel harmony
    // so the question particle (mi/mı/mu/mü) is correct for TTS and display.
    const trQuestionRaw = word.questionText || word.word;

    // Helper: find last vowel in a Turkish word (returns lower-cased vowel)
    const lastVowelOf = (w: string): string | null => {
        if (!w) return null;
        const s = w.normalize('NFC').toLocaleLowerCase('tr-TR');
        for (let i = s.length - 1; i >= 0; i--) {
            const ch = s[i];
            if ('aeıioöuü'.includes(ch)) return ch;
        }
        return null;
    };

    const getTurkishQuestionParticle = (w: string): string => {
        const v = lastVowelOf(w);
        if (!v) return 'mi';
        // back/unrounded: a, ı -> 'mı'
        if (['a', 'ı'].includes(v)) return 'mı';
        // front/unrounded: e, i -> 'mi'
        if (['e', 'i'].includes(v)) return 'mi';
        // back/rounded: o, u -> 'mu'
        if (['o', 'u'].includes(v)) return 'mu';
        // front/rounded: ö, ü -> 'mü'
        return 'mü';
    };

    // Safely extract the noun from Turkish question like "Bu bir <noun> mı?"
    const extractTrWordFromQuestion = (q: string, fallback: string): string => {
        if (!q) return fallback;
        let s = q.trim();
        const prefix = 'Bu bir ';
        if (s.startsWith(prefix)) s = s.slice(prefix.length).trim();
        if (s.endsWith('?')) s = s.slice(0, -1).trim();
        // remove trailing particle if present (space + m[ıiuü])
        s = s.replace(/\s+m[ıiuü]\s*$/u, '').trim();
        return s || fallback;
    };

    const trWord = extractTrWordFromQuestion(trQuestionRaw, word.word);
    const canonicalTrQuestion = `Bu bir ${trWord} ${getTurkishQuestionParticle(trWord)}?`;

    const buildLocalizedQuestion = () => {
        const target = translateLabel(trWord, currentLang);
        switch (currentLang) {
            case 'de':
                return `Ist das ${target}?`;
            case 'fr':
                return `Est-ce ${target} ?`;
            case 'nl':
                return `Is dit ${target}?`;
            case 'en':
                return `Is this ${withIndefiniteArticle(target)}?`;
            default:
                return `Is this ${target}?`;
        }
    };

    const localizedQuestion = currentLang === 'tr' ? canonicalTrQuestion : buildLocalizedQuestion();
    
    // For letter activities (Sound Presence), build the proper question for TTS
    const getSpokenQuestion = () => {
        if (isLetterActivity && letter) {
            const locale = currentLang === 'tr' ? 'tr-TR' : currentLang === 'de' ? 'de-DE' : currentLang === 'az' ? 'az-AZ' : currentLang === 'fr' ? 'fr-FR' : currentLang === 'nl' ? 'nl-NL' : 'en-US';
            const upperCaseLetter = letter.toLocaleUpperCase(locale);
            const questionTemplate = t('letters.soundPresence.question', "Bu görselde '{letter}' sesi var mı?");
            return questionTemplate.replace('{letter}', upperCaseLetter);
        }
        return localizedQuestion;
    };
    
    useAutoSpeak(getSpokenQuestion(), isAutoSpeakEnabled, word.id);

    const isCorrect = answer !== null && ((answer === 'yes' && word.isCorrectAnswer) || (answer === 'no' && !word.isCorrectAnswer));
    const isWrong = answer !== null && !isCorrect;

    const renderQuestion = () => {
        if (!letter || !word.questionText) {
            return localizedQuestion;
        }
        // Use locale-specific casing for letter
        const locale = currentLang === 'tr' ? 'tr-TR' : currentLang === 'de' ? 'de-DE' : currentLang === 'az' ? 'az-AZ' : currentLang === 'fr' ? 'fr-FR' : currentLang === 'nl' ? 'nl-NL' : 'en-US';
        const upperCaseLetter = letter.toLocaleUpperCase(locale);
        
        // Use i18n for Sound Presence question
        const questionTemplate = t('letters.soundPresence.question', "Bu görselde '{letter}' sesi var mı?");
        const questionText = questionTemplate.replace('{letter}', upperCaseLetter);
        
        // Split to highlight the letter
        const parts = questionText.split(upperCaseLetter);
        if (parts.length !== 2) {
            return questionText;
        }
        return (
            <>
                {parts[0]}
                <span className={`text-red-500 font-black`}>
                    {upperCaseLetter}
                </span>
                {parts[1]}
            </>
        );
    };
    
    useEffect(() => {
        setAnswer(null);
    }, [word]);
    
     useEffect(() => {
        if(cardRef.current) {
            cardRef.current.focus();
        }
    }, [word.id]);

    const handleAnswer = async (userAnswer: 'yes' | 'no') => {
        if (answer !== null) return;
        setAnswer(userAnswer);

        const correct = (userAnswer === 'yes' && word.isCorrectAnswer) || (userAnswer === 'no' && !word.isCorrectAnswer);
        
        if (isFastTransitionEnabled) {
            if (correct) {
                await playEffect('correct');
            } else {
                await playEffect('incorrect');
            }
        } else {
            const spokenLabel = currentLang === 'tr' ? baseWord : displayWord;
            if (correct) {
                if (word.isCorrectAnswer) { // Said yes, was yes
                    await speak(`${t('feedback.correctPrefix')} ${spokenLabel}.`, locale);
                } else { // Said no, was no
                    const rightPrefix = t('feedback.rightPrefix') || (currentLang === 'tr' ? 'Doğru, bu' : 'Correct, this is');
                    await speak(`${rightPrefix} ${spokenLabel}.`, locale);
                }
            } else {
                await speak(`${t('feedback.wrongPrefix')} ${spokenLabel}.`, locale);
            }
        }

        setTimeout(() => {
            onAdvance(correct);
        }, isFastTransitionEnabled ? 400 : 1200);
    };

    const handleSpeak = (e: React.MouseEvent) => {
        e.stopPropagation();
        speak(localizedQuestion, locale);
    };
    
    const handleBan = (e: React.MouseEvent) => {
        e.stopPropagation();
        onBanImage(word.id);
    }
    
    const themeColor = (activityType === ActivityType.SoundPresence ? 'cyan' : 'teal') as AppColor;
    const colorClasses = getColorClasses(themeColor);
    const { settings } = useAppContext();
    const isCosmic = settings.theme === 'deneme2';

    return (
        <div 
         ref={cardRef}
         tabIndex={-1}
         className="relative overflow-hidden flex flex-col items-center justify-start h-full w-full max-w-4xl mx-auto p-2 sm:p-4 animate-fade-in outline-none landscape:pt-0" 
         aria-live="polite">
            {isCosmic && (
                <CosmicBackdrop variant="light" showMeteors={true} />
            )}
            
            {/* Header */}
             <div className={`w-full flex justify-between items-center mb-2 sm:mb-4 p-2 ${isCosmic ? 'bg-slate-900/60 border border-sky-400/20' : 'bg-white/50'} backdrop-blur-sm rounded-full`}>
                <button onClick={onBack} className={`p-2 rounded-full hover:bg-white/50 transition-colors`} aria-label="Geri dön">
                    <ArrowLeftIcon className={`w-8 h-8 ${colorClasses.text700}`} />
                </button>
                <div className={`text-lg font-bold ${colorClasses.text800}`}>
                    {currentCard} / {totalCards}
                </div>
                <button onClick={onToggleWordLabel} className="p-2 rounded-full hover:bg-white/50 transition-colors" aria-label={isWordLabelVisible ? 'Kelimeyi gizle' : 'Kelimeyi göster'}>
                    {isWordLabelVisible ? <EyeSlashIcon className={`w-8 h-8 ${colorClasses.text700}`} /> : <EyeIcon className={`w-8 h-8 ${colorClasses.text700}`} />}
                </button>
            </div>
            
                        <div className={`relative flex-grow w-full flex flex-col items-center justify-center p-4 sm:p-6 sm-landscape:p-2 ${isCosmic ? 'bg-slate-900/50 border border-sky-400/20' : 'bg-white/60'} backdrop-blur-lg rounded-3xl shadow-xl`}>
                                {isCosmic && (
                                    <>
                                        <PanelStars count={48} className="rounded-3xl" />
                                        <div className="cosmic-panel-nebula rounded-3xl" />
                                    </>
                                )}
                <div className="flex-grow w-full flex flex-col landscape:flex-row landscape:items-center landscape:justify-center landscape:gap-8">
                    {/* Left Side (Image & Question) */}
                    <div className="w-full flex-grow flex flex-col items-center justify-center landscape:w-7/12 landscape:flex-grow-0 landscape:max-w-md">
                        <h1 className={`text-2xl sm:text-3xl landscape:text-xl font-bold text-center ${isCosmic ? 'bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-indigo-200 to-fuchsia-300 text-glow-planet' : colorClasses.text800} mb-4 sm-landscape:mb-2`}>
                            {renderQuestion()}
                        </h1>
                        <Card
                            imageUrl={word.imageUrl}
                            word={baseWord}
                            isRevealed={answer !== null || isWordLabelVisible}
                            isCorrect={isCorrect}
                            onClick={() => {}}
                            className={`w-full h-auto aspect-square max-h-[50vh] sm-landscape:max-h-[calc(100vh-12rem)] landscape:max-h-[65vh] ${isWrong ? 'animate-shake' : ''}`}
                            isLetterActivity={isLetterActivity}
                        >
                             <div className="absolute top-2 right-2 flex space-x-2">
                                 {isBanButtonEnabled && (
                                    <button 
                                        onClick={handleBan}
                                        className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors" 
                                        aria-label="Bu görseli bir daha gösterme">
                                        <BanIcon className="w-6 h-6 text-red-600" />
                                    </button>
                                )}
                                <button onClick={handleSpeak} className={`p-2 ${colorClasses.bg100} rounded-full ${colorClasses.hoverBg200} transition-colors`} aria-label="Soruyu seslendir">
                                    <SpeakerIcon className={`w-6 h-6 ${colorClasses.accent}`} />
                                </button>
                            </div>
                        </Card>
                    </div>
                    
                    {/* Right Side (Buttons) */}
                     <div className="w-full mt-6 grid grid-cols-2 landscape:grid-cols-1 landscape:w-auto landscape:flex-grow landscape:mt-0 gap-4">
                        <button
                            onClick={() => handleAnswer('yes')}
                            disabled={answer !== null}
                            className={`
                                p-6 sm-landscape:p-2 w-full flex items-center justify-center rounded-2xl shadow-lg transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-4
                                ${ answer === 'yes' && isCorrect ? `bg-green-100 ring-green-300 scale-110` :
                                answer === 'yes' && isWrong ? `bg-red-100 ring-red-300` :
                                answer !== null ? `bg-slate-200 opacity-60` :
                                `bg-green-100 hover:bg-green-200 focus:ring-green-300`
                                }
                            `}
                            aria-label="Evet"
                        >
                            <span className="flex flex-col items-center gap-1"><BasHareketi tur="evet" className="w-28 h-28 sm:w-36 sm:h-36 sm-landscape:w-20 sm-landscape:h-20" /><span className="text-xl font-black text-green-700">✓ Evet</span></span>
                        </button>
                        <button
                            onClick={() => handleAnswer('no')}
                            disabled={answer !== null}
                            className={`
                                p-6 sm-landscape:p-2 w-full flex items-center justify-center rounded-2xl shadow-lg transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-4
                                ${ answer === 'no' && isCorrect ? `bg-green-100 ring-green-300 scale-110` :
                                answer === 'no' && isWrong ? `bg-red-100 ring-red-300` :
                                answer !== null ? `bg-slate-200 opacity-60` :
                                `bg-red-100 hover:bg-red-200 focus:ring-red-300`
                                }
                            `}
                            aria-label="Hayır"
                        >
                            <span className="flex flex-col items-center gap-1"><BasHareketi tur="hayir" className="w-28 h-28 sm:w-36 sm:h-36 sm-landscape:w-20 sm-landscape:h-20" /><span className="text-xl font-black text-red-700">✗ Hayır</span></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ConceptLearningScreen);
