import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { kelimeGorseli } from '../services/kelimeGorseli.ts';
import { Story } from '../types.ts';
import { speak, cancelSpeech } from '../services/speechService.ts';
import SpeakerIcon from './icons/SpeakerIcon.tsx';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import HomeIcon from './icons/HomeIcon.tsx';
import { useAutoSpeak } from '../hooks/useAutoSpeak.ts';
import { t } from '../i18n/index.ts';

interface StoryScreenProps {
    stories: Story[];
    letter: string;
    onBack: () => void;
    onGoToMenu: () => void;
    isAutoSpeakEnabled: boolean;
}

const StoryScreen: React.FC<StoryScreenProps> = ({ stories, letter, onBack, onGoToMenu, isAutoSpeakEnabled }) => {
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

    const highlightLetter = useCallback((text: string, letterToHighlight: string) => {
        const regex = new RegExp(`(${letterToHighlight})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, i) =>
            part.toLowerCase() === letterToHighlight.toLowerCase() ? (
                <span key={i} className="text-red-500 font-bold">
                    {part}
                </span>
            ) : (
                part
            )
        );
    }, []);

    const currentStory = stories[currentStoryIndex];
    const storyTextToSpeak = currentStory ? `${currentStory.title}. ${currentStory.story}` : null;
    const EKLER = ['ları', 'leri', 'ndan', 'nden', 'nın', 'nin', 'nun', 'nün', 'lar', 'ler', 'dan', 'den', 'tan', 'ten', 'nda', 'nde', 'yla', 'yle', 'lı', 'li', 'lu', 'lü', 'da', 'de', 'ta', 'te', 'yı', 'yi', 'yu', 'yü', 'ya', 'ye', 'ın', 'in', 'un', 'ün', 'sı', 'si', 'su', 'sü', 'ı', 'i', 'u', 'ü'];
    // Hikâyedeki kelimelerin fotoğrafları (en çok 3): "elmalı" → elma, "kekleri" → kek
    const hikayeResimleri = useMemo(() => {
        if (!currentStory) return [] as Array<{ kelime: string; url: string }>;
        const out: Array<{ kelime: string; url: string }> = [];
        const metin = `${currentStory.title} ${currentStory.story}`.toLocaleLowerCase('tr-TR').split(/[^a-zçğıöşü]+/);
        for (const ham of metin) {
            // Önce kelimenin kendisi, sonra yalnız gerçek eklerden arındırılmış kökü ("karga" → "kar" olmasın)
            const adaylar = [ham, ...EKLER.filter((e) => ham.endsWith(e) && ham.length - e.length >= 2).map((e) => ham.slice(0, -e.length))];
            for (const k of adaylar) {
                const url = kelimeGorseli(k);
                if (url) { if (!out.some((o) => o.url === url)) out.push({ kelime: k, url }); break; }
            }
            if (out.length >= 3) break;
        }
        return out;
    }, [currentStory]);

    useAutoSpeak(storyTextToSpeak, isAutoSpeakEnabled, currentStory?.id);

    useEffect(() => {
        return () => {
            cancelSpeech();
        };
    }, []);

    const handleSpeak = useCallback(() => {
        if (storyTextToSpeak) {
            speak(storyTextToSpeak);
        }
    }, [storyTextToSpeak]);

    const goToNextStory = () => {
        setCurrentStoryIndex((prevIndex) => (prevIndex + 1) % stories.length);
    };

    const goToPreviousStory = () => {
        setCurrentStoryIndex((prevIndex) => (prevIndex - 1 + stories.length) % stories.length);
    };

    return (
        <div className="flex flex-col items-center justify-between h-full w-full max-w-2xl mx-auto p-4 animate-fade-in">
             {/* Header */}
            <div className="w-full flex justify-between items-center mb-4">
                <button onClick={onBack} className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors" aria-label={t('app.back', 'Go back')}>
                    <ArrowLeftIcon className="w-8 h-8 text-sky-700" />
                </button>
                 <h1 className="text-2xl sm:text-3xl font-bold text-center text-sky-800">
                    {t('activities.letter.embeddedStory', 'Story Time')}
                </h1>
                <button onClick={onGoToMenu} className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors" aria-label={t('completion.home', 'Main Menu')}>
                    <HomeIcon className="w-8 h-8 text-sky-700" />
                </button>
            </div>
            
            <div className="flex-grow w-full bg-white/70 rounded-2xl shadow-lg p-6 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-sky-800 flex-grow">
                        {highlightLetter(currentStory.title, letter)}
                    </h2>
                     <button onClick={handleSpeak} className="p-2 bg-sky-100 rounded-full hover:bg-sky-200 transition-colors flex-shrink-0 ml-4" aria-label={t('story.readStory', 'Read the story')}>
                        <SpeakerIcon className="w-7 h-7 text-sky-600" />
                    </button>
                </div>
                {hikayeResimleri.length > 0 && (
                    <div className="flex justify-center gap-3 mb-4">
                        {hikayeResimleri.map((r) => (
                            <figure key={r.url} className="flex flex-col items-center">
                                <img src={r.url} alt={r.kelime} className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-2xl bg-white shadow" draggable={false} />
                                <figcaption className="mt-1 text-sm font-bold text-sky-800">{r.kelime}</figcaption>
                            </figure>
                        ))}
                    </div>
                )}
                <p className="text-xl sm:text-2xl text-slate-700 leading-relaxed">
                    {highlightLetter(currentStory.story, letter)}
                </p>
            </div>

            <div className="w-full flex justify-between items-center mt-6">
                 <button 
                    onClick={goToPreviousStory} 
                    className="bg-white text-sky-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-sky-100 transition-all disabled:opacity-50"
                    disabled={stories.length <= 1}
                >
                    {t('common.previous', 'Previous')}
                </button>
                <span className="font-bold text-sky-800">
                    {currentStoryIndex + 1} / {stories.length}
                </span>
                <button 
                    onClick={goToNextStory} 
                    className="bg-white text-sky-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-sky-100 transition-all disabled:opacity-50"
                    disabled={stories.length <= 1}
                >
                    {t('common.next', 'Next')}
                </button>
            </div>
        </div>
    );
};

export default StoryScreen;