import React from 'react';
import { nesneUrl } from '../services/nesneGorsel.ts';
import { CommunicationCard } from '../types.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import PrintIcon from './icons/PrintIcon.tsx';
import XCircleIcon from './icons/XCircleIcon.tsx';
import { imageData } from '../services/database/imageData.ts';
import BasketIcon from './icons/BasketIcon.tsx';
import { getCurrentLanguage, t } from '../i18n/index.ts';
import { translateLabel } from '../utils/translate.ts';
import { useAppContext } from '../contexts/AppContext.ts';

interface PrintPoolScreenProps {
  pool: CommunicationCard[];
  onBack: () => void;
  onTogglePrintPool: (card: CommunicationCard) => void;
  onClearPrintPool: () => void;
  onPrepareToPrint: (cards: CommunicationCard[]) => void;
}

const PoolCard: React.FC<{ card: CommunicationCard; onRemove: () => void; }> = ({ card, onRemove }) => {
    const image = card.imageId ? imageData.find(img => img.id === card.imageId) : null;
    const Icon = card.icon;
  const lang = getCurrentLanguage();
  const display = lang === 'tr' ? card.text : translateLabel(card.text, lang);

    return (
        <div className="relative w-full aspect-square bg-white p-2 flex flex-col items-center justify-end rounded-2xl shadow-md group">
             <div className="flex-grow w-full flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={nesneUrl(image.imageUrl)} alt={display} className="max-w-full max-h-full object-contain" />
                ) : Icon ? (
                    <Icon className="w-2/3 h-2/3 text-slate-700" />
                ) : null}
            </div>
      <p className="flex-shrink-0 text-center font-bold text-slate-700 text-sm mt-1 break-words">{display}</p>
            <button
                onClick={onRemove}
                className="absolute top-1 right-1 p-1 bg-red-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`${display} ${t('communication.removeFromBasket', 'kartını sepetten çıkar')}`}
            >
                <XCircleIcon className="w-6 h-6 text-red-500"/>
            </button>
        </div>
    );
};

const PrintPoolScreen: React.FC<PrintPoolScreenProps> = ({ pool, onBack, onTogglePrintPool, onClearPrintPool, onPrepareToPrint }) => {
  const { settings } = useAppContext();
  const isThemed = settings.theme !== 'simple';
  const handlePrint = () => {
    if (pool.length > 0 && pool.length <= 9) {
      onPrepareToPrint(pool);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto p-4 animate-fade-in">
      <header className="w-full flex-shrink-0 flex items-center justify-between mb-4">
        <button onClick={onBack} className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors" aria-label={t('app.back', 'Geri dön')}>
          <ArrowLeftIcon className="w-8 h-8 text-slate-700" />
        </button>
        <h1 className={`text-xl font-bold ${isThemed ? 'text-white text-shadow-soft' : 'text-slate-700'}`}>{t('communication.printBasketTitle', 'Yazdırma Sepeti')} ({pool.length}/9)</h1>
        <div className="w-12"></div>
      </header>

      <div className="flex-grow flex flex-col landscape:flex-row gap-4">
        <main className="flex-grow overflow-y-auto bg-white/60 p-4 rounded-2xl shadow-inner">
      {pool.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                  <BasketIcon className="w-24 h-24 text-slate-400 mb-4"/>
          <h2 className="text-2xl font-bold text-slate-600">{t('communication.basketEmpty', 'Sepetiniz Boş')}</h2>
          <p className="text-slate-500 mt-2">{t('communication.basketEmptyHelp', 'Yazdırmak istediğiniz kartları eklemek için kategorilere geri dönün.')}</p>
              </div>
          ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                  {pool.map(card => (
                      <PoolCard key={card.id} card={card} onRemove={() => onTogglePrintPool(card)} />
                  ))}
              </div>
          )}
        </main>

        {/* Landscape action panel */}
        <aside className="hidden landscape:flex landscape:w-72 sm-landscape:w-64 landscape:flex-shrink-0 bg-white/60 p-4 rounded-2xl shadow-inner flex-col gap-3">
          <button
              onClick={onClearPrintPool}
              disabled={pool.length === 0}
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white font-bold py-3 px-5 rounded-lg shadow-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t('communication.clearBasketAria', 'Sepeti Temizle')}
          >
              <XCircleIcon className="w-6 h-6" />
              <span>{t('communication.clear', 'Temizle')}</span>
          </button>
          <button
            onClick={handlePrint}
            disabled={pool.length === 0 || pool.length > 9}
            className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white font-bold py-3 px-5 rounded-lg shadow-md hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('communication.printSelectedAria', 'Seçili Kartları Yazdır')}
          >
            <PrintIcon className="w-6 h-6" />
            <span>{t('app.print', 'Yazdır')} ({pool.length})</span>
          </button>
          {pool.length > 9 && (
              <p className="text-center text-red-600 font-semibold">
                  {t('communication.printPoolLimitTooMany', 'Yazdırmak için en fazla 9 kart seçebilirsiniz. Lütfen bazı kartları çıkarın.')}
              </p>
          )}
        </aside>
      </div>

      {/* Portrait footer actions */}
      <footer className="landscape:hidden w-full flex-shrink-0 flex items-center justify-between mt-4">
        <button
            onClick={onClearPrintPool}
            disabled={pool.length === 0}
            className="flex items-center gap-2 bg-red-500 text-white font-bold py-3 px-5 rounded-lg shadow-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('communication.clearBasketAria', 'Sepeti Temizle')}
        >
            <XCircleIcon className="w-6 h-6" />
            <span>{t('communication.clear', 'Temizle')}</span>
        </button>
        <button
          onClick={handlePrint}
          disabled={pool.length === 0 || pool.length > 9}
          className="flex items-center gap-2 bg-sky-500 text-white font-bold py-3 px-5 rounded-lg shadow-md hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={t('communication.printSelectedAria', 'Seçili Kartları Yazdır')}
        >
          <PrintIcon className="w-6 h-6" />
          <span>{t('app.print', 'Yazdır')} ({pool.length})</span>
        </button>
      </footer>
      {pool.length > 9 && (
          <p className="landscape:hidden text-center text-red-600 font-semibold mt-2">
              {t('communication.printPoolLimitTooMany', 'Yazdırmak için en fazla 9 kart seçebilirsiniz. Lütfen bazı kartları çıkarın.')}
          </p>
      )}
    </div>
  );
};

export default React.memo(PrintPoolScreen);