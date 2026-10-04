import React, { useState } from 'react';
import { nesneUrl } from '../services/nesneGorsel.ts';
import { CommunicationCard } from '../types.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import SpeakerIcon from './icons/SpeakerIcon.tsx';
import XCircleIcon from './icons/XCircleIcon.tsx';
import { imageData } from '../services/database/imageData.ts';
import CheckCircleIcon from './icons/CheckCircleIcon.tsx';
import BasketIcon from './icons/BasketIcon.tsx';
import CrownIcon from './icons/CrownIcon.tsx';
import { getCurrentLanguage, t } from '../i18n/index.ts';
import { translateLabel } from '../utils/translate.ts';

interface CommunicationCardDetailScreenProps {
  subcategoryId: string;
  categoryTitle: string;
  categoryColor: string;
  cards: CommunicationCard[];
  onBack: () => void;
  sentence: CommunicationCard[];
  onCardClick: (card: CommunicationCard) => void;
  onSpeakSentence: () => void;
  onClearSentence: () => void;
  isPremium: boolean;
  printPool: CommunicationCard[];
  onTogglePrintPool: (card: CommunicationCard) => void;
}

const DetailCard: React.FC<{ card: CommunicationCard; onClick: () => void; isInPrintPool: boolean; isPrintMode: boolean; }> = ({ card, onClick, isInPrintPool, isPrintMode }) => {
    const lang = getCurrentLanguage();
    const displayText = lang === 'tr' ? card.text : translateLabel(card.text, lang);
    
    if (card.imageId) {
        const image = imageData.find(img => img.id === card.imageId);
        return (
             <button
                onClick={onClick}
                className="relative w-full h-full aspect-square flex flex-col items-center justify-end text-center bg-white p-2 sm:p-2 rounded-2xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-sky-300 overflow-hidden group"
            >
                <img src={nesneUrl(image?.imageUrl) || '/images/placeholder.png'} alt={displayText} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"/>
                <h2 className="relative text-sm sm:text-base font-bold text-slate-700 z-10">{displayText}</h2>
                 {isPrintMode && isInPrintPool && (
                    <div className="absolute inset-0 bg-sky-500/70 flex items-center justify-center rounded-2xl animate-pop-in">
                        <CheckCircleIcon className="w-1/2 h-1/2 text-white"/>
                    </div>
                )}
            </button>
        )
    }

    const Icon = card.icon;
    return (
        <button
            onClick={onClick}
            className="relative w-full h-full flex flex-col items-center justify-center text-center bg-white p-2 sm:p-4 rounded-2xl shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-sky-300"
        >
            {Icon && <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-sky-600 mb-2" />}
            <h2 className="text-sm sm:text-base font-bold text-slate-700">{displayText}</h2>
             {isPrintMode && isInPrintPool && (
                <div className="absolute inset-0 bg-sky-500/70 flex items-center justify-center rounded-2xl animate-pop-in">
                    <CheckCircleIcon className="w-1/2 h-1/2 text-white"/>
                </div>
            )}
        </button>
    )
};


const CommunicationCardDetailScreen: React.FC<CommunicationCardDetailScreenProps> = ({
  subcategoryId,
  categoryTitle,
  categoryColor,
  cards,
  onBack,
  sentence,
  onCardClick,
  onSpeakSentence,
  onClearSentence,
  isPremium,
  printPool,
  onTogglePrintPool,
}) => {
    const [isPrintMode, setIsPrintMode] = useState(false);
    const lang = getCurrentLanguage();
  const printPoolIds = React.useMemo(() => new Set(printPool.map(c => c.id)), [printPool]);

  const handleTogglePrintMode = () => {
    if (!isPremium) return;
    setIsPrintMode(prev => !prev);
  };

  const handleCardPress = (card: CommunicationCard) => {
    if (isPrintMode) {
      onTogglePrintPool({ ...card, categoryColor });
    } else {
      onCardClick(card);
    }
  };


  return (
    <div className="flex flex-col items-center h-full w-full max-w-5xl mx-auto p-4 animate-fade-in">
        <div className="w-full flex items-center mb-3 landscape:mb-2 relative">
          <button onClick={onBack} className="absolute left-0 p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors" aria-label={t('app.back', 'Geri dön')}>
                 <ArrowLeftIcon className="w-7 h-7 text-amber-700" />
            </button>
                        <h1 className="flex-1 text-center text-xl sm:text-2xl landscape:text-lg font-black text-amber-800">
                                {(() => {
                                    const lang = getCurrentLanguage();
                                    if (lang === 'tr') return categoryTitle;
                                    // Try subcategory id mapping if available via t(); else translate label
                                    return t(`communication.subcategories.${subcategoryId}`, translateLabel(categoryTitle, lang));
                                })()}
                        </h1>
        </div>

        <>
            {/* Sentence Display */}
            <div className="w-full h-24 sm:h-28 bg-white/80 rounded-2xl shadow-inner mb-4 p-2 flex items-center overflow-x-auto touch-auto">
                {!isPrintMode && sentence.length > 0 ? (
                    <div className="flex items-center gap-2">
                        {sentence.map((card, index) => {
                            const image = card.imageId ? imageData.find(i => i.id === card.imageId) : null;
                            const Icon = card.icon;
                            const text = lang === 'tr' ? card.text : translateLabel(card.text, lang);
                            return (
                                <div key={`${card.id}-${index}`} className="flex-shrink-0 flex flex-col items-center text-center w-20 h-full bg-sky-100 p-1 rounded-lg">
                                    {image ? 
                                        <img src={nesneUrl(image.imageUrl)} alt={text} className="w-12 h-12 object-cover rounded-md"/>
                                        : Icon && <Icon className="w-8 h-8 text-sky-700" />
                                    }
                                    <span className="text-xs font-semibold text-slate-600 truncate w-full mt-1">{text}</span>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-slate-500 text-center w-full">
                        {isPrintMode ? t('communication.printHint', 'Sepete eklemek için kartlara dokunun.') : t('communication.composeHint', 'Cümle oluşturmak için kartlara dokunun.')}
                    </p>
                )}
            </div>
            
            {/* Sentence Action Buttons */}
            <div className="w-full flex justify-between items-center gap-2 mb-4">
                 <button
                    onClick={handleTogglePrintMode}
                    className={`flex items-center gap-2 font-bold py-3 px-4 rounded-full shadow-sm transition-colors text-white ${!isPremium ? 'bg-slate-400 cursor-not-allowed' : isPrintMode ? 'bg-rose-500 hover:bg-rose-600' : 'bg-sky-500 hover:bg-sky-600'}`}
                    aria-label={isPrintMode ? t('communication.finishSelectionAria', 'Kart seçimini bitir') : t('communication.selectForPrintAria', 'Yazdırmak için kart seç')}
                >
                    <BasketIcon className="w-6 h-6" />
                    <span>{isPrintMode ? t('communication.finishSelection', 'Seçimi Bitir') : t('communication.addToBasket', 'Sepete Ekle')}</span>
                    {!isPremium && <CrownIcon className="w-5 h-5 ml-1" />}
                </button>
                <div className="flex gap-2">
                    <button
                        onClick={onClearSentence}
                        disabled={sentence.length === 0 || isPrintMode}
                        className="p-3 bg-red-100 rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-200 transition-colors"
                        aria-label={t('communication.clearSentenceAria', 'Cümleyi temizle')}
                    >
                        <XCircleIcon className="w-7 h-7 text-red-600" />
                    </button>
                    <button
                        onClick={onSpeakSentence}
                        disabled={sentence.length === 0 || isPrintMode}
                        className="p-3 bg-green-100 rounded-full shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-200 transition-colors"
                        aria-label={t('communication.speakSentenceAria', 'Cümleyi seslendir')}
                    >
                        <SpeakerIcon className="w-7 h-7 text-green-600" />
                    </button>
                </div>
            </div>
        </>


        <div className="w-full flex-grow overflow-y-auto pr-2 pb-24">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {cards.map((card) => (
                <div key={card.id} className="aspect-square">
                    <DetailCard 
                        card={card} 
                        onClick={() => handleCardPress(card)}
                        isInPrintPool={printPoolIds.has(card.id)} 
                        isPrintMode={isPrintMode}
                    />
                </div>
            ))}
            </div>
        </div>
    </div>
  );
};

export default React.memo(CommunicationCardDetailScreen);