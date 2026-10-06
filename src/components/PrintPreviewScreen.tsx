// src/components/PrintPreviewScreen.tsx
import React from 'react';
import { nesneUrl } from '../services/nesneGorsel.ts';
import { t, getCurrentLanguage } from '../i18n/index.ts';
import { CommunicationCard } from '../types.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import PrintIcon from './icons/PrintIcon.tsx';
import SaveIcon from './icons/SaveIcon.tsx';
import { imageData } from '../services/database/imageData.ts';
import { exportPrintAreaToPdf, savePrintAreaAsPdf } from '../utils/exportPdf.ts';
import { translateLabel } from '../utils/translate.ts';

interface PrintPreviewScreenProps {
  cards: CommunicationCard[];
  categoryColor: string;
  onBack: () => void;
}

const borderColorMap: Record<string, string> = {
  red: 'border-red-500',
  yellow: 'border-yellow-500',
  green: 'border-green-500',
  blue: 'border-blue-500',
  indigo: 'border-indigo-500',
  purple: 'border-purple-500',
  pink: 'border-pink-500',
  teal: 'border-teal-500',
  amber: 'border-amber-500',
  orange: 'border-orange-500',
  slate: 'border-slate-500',
};

const PrintableCard: React.FC<{ card: CommunicationCard; borderColorClass: string }> = ({
  card,
  borderColorClass,
}) => {
  const image = card.imageId ? imageData.find((img) => img.id === card.imageId) : null;
  const Icon = card.icon;
  const lang = getCurrentLanguage();
  const display = lang === 'tr' ? card.text : translateLabel(card.text, lang);

  return (
    <div
      className={`w-full aspect-[3/4] bg-white border-4 border-solid ${borderColorClass} p-1 flex flex-col items-center justify-center rounded-xl`}
    >
      <div className="flex-grow w-full flex items-center justify-center overflow-hidden p-1">
        {image ? (
          <img
            src={nesneUrl(image.imageUrl)}
            alt={display}
            className="max-w-full max-h-full object-contain"
            draggable={false}
          />
        ) : Icon ? (
          <Icon className="w-2/3 h-2/3 text-slate-700" />
        ) : null}
      </div>
      <p className="flex-shrink-0 text-center font-bold text-slate-800 text-sm mt-1 break-words">
        {display}
      </p>
    </div>
  );
};

const PrintPreviewScreen: React.FC<PrintPreviewScreenProps> = ({
  cards,
  categoryColor,
  onBack,
}) => {
  const handlePrint = () => {
    console.log('[PDF] button tapped');
    exportPrintAreaToPdf().catch((err) => {
      console.error('PDF oluşturma hatası:', err);
      alert(t('app.pdfCreateError'));
    });
  };

  const handleSavePdf = async () => {
    try {
      console.log('[Save PDF] button tapped');
      const now = new Date();
      const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
      const fileName = `IlkSozum-Kartlar_${stamp}`;
      await savePrintAreaAsPdf(fileName);
      alert(t('app.pdfSavedInfo'));
    } catch (err) {
      console.error('PDF kaydetme hatası:', err);
      alert(t('app.pdfSaveError'));
    }
  };

  const borderColorClass = borderColorMap[categoryColor] || 'border-slate-400';

  // 9’arlı sayfalar halinde parçala
  const pages: CommunicationCard[][] = [];
  for (let i = 0; i < cards.length; i += 9) pages.push(cards.slice(i, i + 9));

  return (
    <div className="flex flex-col h-full w-full bg-slate-200 p-4 print:p-0 print:bg-white print-parent-container">
      {/* z-index verildi ki üstteki olası overlay’ler butonu kapatmasın */}
      <header className="relative z-50 w-full flex-shrink-0 flex items-center justify-between gap-2 mb-4 no-print">
        <button
          type="button"
          onClick={onBack}
          className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors flex-shrink-0"
          aria-label={t('app.back')}
        >
          <ArrowLeftIcon className="w-8 h-8 text-slate-700" />
        </button>

        <h1 className="text-lg sm:text-xl font-bold text-slate-800 text-center flex-1">
          {t('app.printPreview')}
        </h1>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSavePdf}
            className="relative z-[100] pointer-events-auto cursor-pointer
                       flex items-center justify-center gap-2
                       bg-emerald-600 text-white font-bold py-2 px-3 sm:px-4
                       rounded-lg shadow-md hover:bg-emerald-700 transition-colors flex-shrink-0"
            aria-label={t('app.savePdf')}
          >
            <SaveIcon className="w-6 h-6" />
            <span>{t('app.savePdf')}</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="relative z-[100] pointer-events-auto cursor-pointer
                       flex items-center justify-center gap-2
                       bg-sky-500 text-white font-bold py-2 px-3 sm:px-4
                       rounded-lg shadow-md hover:bg-sky-600 transition-colors flex-shrink-0"
            aria-label={t('app.print')}
          >
            <PrintIcon className="w-6 h-6" />
            <span>{t('app.print')}</span>
          </button>
        </div>
      </header>

      <main
        id="rapor-alani"
        className="flex-grow overflow-y-auto bg-slate-200 print:bg-white print:overflow-visible print:p-0"
      >
        <div className="flex flex-col items-center gap-4 print:gap-0">
          {pages.map((pageCards, pageIndex) => (
            <div
              key={pageIndex}
              className="page-container w-full max-w-[21cm] aspect-[210/297] bg-white shadow-lg p-[1cm] flex flex-col justify-center
                         print:shadow-none print:p-0 print:max-w-full print:w-full"
            >
              <div className="grid grid-cols-3 gap-4">
                {pageCards.map((card, cardIndex) => (
                  <div key={`${card.id}-${cardIndex}`} className="printable-card-wrapper">
                    <PrintableCard card={card} borderColorClass={borderColorClass} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default React.memo(PrintPreviewScreen);