import React, { useEffect, useState, useCallback } from 'react';
import { bigSmallData } from '../../services/database/activities/qualities/bigSmallData.ts';
import { ConceptRound } from '../../types.ts';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import PrintIcon from '../icons/PrintIcon.tsx';

interface ConceptWorksheetPreviewProps {
  onBack: () => void;
  conceptType: 'big-small';
}

// Build unique pairs from bigSmallData taking only "Büyük olan hangisi?" questions
// (odd-indexed rounds → id 1,3,5,7...) to avoid duplicate pairs
function buildUniquePairs(): ConceptRound[] {
  // Take only odd IDs (the "which is BIG?" questions) to get one question per pair
  const bigQuestions = bigSmallData.filter(r => r.question.includes('Büyük'));
  return bigQuestions;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => 0.5 - Math.random());
}

function toRealisticPng(url: string): string {
  const fileName = url.split('/').pop() || '';
  const fileStem = fileName.replace(/\.[^.]+$/, '');
  return `/realistic/${fileStem}.png`;
}

function toMirroredRealistic(url: string): string {
  return url.replace('/images/', '/realistic/');
}

const ConceptWorksheetPreview: React.FC<ConceptWorksheetPreviewProps> = ({ onBack }) => {
  const allPairs = buildUniquePairs(); // all available pairs
  const [questions, setQuestions] = useState<ConceptRound[]>([]);
  // For each question track which side is correct (to randomise left/right)
  const [correctOnLeft, setCorrectOnLeft] = useState<boolean[]>([]);
  const [useRealistic, setUseRealistic] = useState(false);
  const [questionCount, setQuestionCount] = useState(9);

  const regenerate = useCallback((count: number = questionCount) => {
    const picked = shuffle(allPairs).slice(0, count);
    setQuestions(picked);
    setCorrectOnLeft(picked.map(() => Math.random() > 0.5));
  }, [questionCount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    regenerate(questionCount);
  }, [questionCount]); // eslint-disable-line react-hooks/exhaustive-deps

  const getImageUrl = (url: string): string => {
    if (!useRealistic) return url;
    return toRealisticPng(url);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>, originalUrl: string) => {
    const img = event.currentTarget;

    if (!useRealistic) {
      if (img.dataset.fallbackStage !== 'original') {
        img.dataset.fallbackStage = 'original';
        img.src = originalUrl;
      }
      return;
    }

    const stage = img.dataset.fallbackStage || 'png';
    if (stage === 'png') {
      img.dataset.fallbackStage = 'mirrored';
      img.src = toMirroredRealistic(originalUrl);
      return;
    }

    if (stage === 'mirrored') {
      img.dataset.fallbackStage = 'original';
      img.src = originalUrl;
    }
  };

  const cols = questionCount <= 6 ? 2 : 3;

  return (
    <div className="flex flex-col h-full w-full bg-slate-300">

      {/* Toolbar */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 bg-white shadow-sm print:hidden gap-2 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 font-bold text-sm flex-shrink-0"
        >
          <ArrowLeftIcon className="w-5 h-5" /> Geri
        </button>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          {/* Question count */}
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700">
            <span>📝</span>
            <span>Soru:</span>
            {[6, 9, 12].map(n => (
              <button
                key={n}
                onClick={() => setQuestionCount(n)}
                className={`w-7 h-7 rounded-md text-xs font-black transition-colors ${questionCount === n ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-indigo-50'}`}
              >
                {n}
              </button>
            ))}
          </div>

          {/* Realistic toggle */}
          <button
            onClick={() => setUseRealistic(v => !v)}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${useRealistic ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}
          >
            {useRealistic ? '📷 Gerçekçi' : '🎨 Çizgifilm'}
          </button>

          {/* Regenerate */}
          <button
            onClick={() => regenerate(questionCount)}
            className="flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-1.5 px-3 rounded-lg text-sm transition-colors"
          >
            🔀 Yeni Karıştır
          </button>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-bold py-2 px-4 rounded-xl shadow text-sm flex-shrink-0"
        >
          <PrintIcon className="w-4 h-4" /> Yazdır / PDF
        </button>
      </header>

      {/* Scrollable A4 preview */}
      <main className="flex-1 overflow-y-auto py-6 flex justify-center print:p-0 print:block">
        <div
          id="worksheet-print-area"
          className="bg-white w-full max-w-[21cm] shadow-2xl print:shadow-none"
          style={{ minHeight: '29.7cm', padding: '1cm 1.2cm' }}
        >

          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-300 pb-2 mb-4">
            <div>
              <div className="text-base font-black text-slate-800">Çalışma Kağıdı</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">Zıt Kavramlar: Büyük ↔ Küçük</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Her soruda BÜYÜK olanın altındaki daireyi işaretleyin.</div>
            </div>
            <div className="flex flex-col gap-1.5 text-right">
              {[['Adı Soyadı:', 'w-44'], ['Tarih:', 'w-24'], ['Sınıf:', 'w-16']].map(([label, w]) => (
                <div key={label} className="flex items-center gap-1 justify-end">
                  <span className="text-[10px] font-semibold text-slate-500 whitespace-nowrap">{label}</span>
                  <span className={`border-b border-dashed border-slate-400 ${w} inline-block h-3`}></span>
                </div>
              ))}
            </div>
          </div>

          {/* Questions */}
          {questions.length === 0 ? (
            <div className="flex items-center justify-center h-40 text-slate-400 text-sm">Yükleniyor...</div>
          ) : (
            <div className={`grid gap-3 ${cols === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {questions.map((round, index) => {
                const leftOnLeft = correctOnLeft[index];
                // In bigSmallData, isCorrect:true = the BIG one
                const correctOpt = round.options.find(o => o.isCorrect)!;
                const wrongOpt = round.options.find(o => !o.isCorrect)!;
                const leftOpt = leftOnLeft ? correctOpt : wrongOpt;
                const rightOpt = leftOnLeft ? wrongOpt : correctOpt;

                return (
                  <div
                    key={round.id}
                    className="border border-slate-200 rounded-xl p-3 flex flex-col"
                    style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}
                  >
                    {/* Question number + text */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-[9px] font-bold text-slate-700 leading-tight">
                        <strong>BÜYÜK</strong> olan hangisi?
                      </span>
                    </div>

                    {/* Two image choices */}
                    <div className="flex items-end justify-evenly gap-2 flex-1">
                      {[leftOpt, rightOpt].map((opt, side) => (
                        <div key={`${opt.id}-${side}`} className="flex flex-col items-center gap-2">
                          <div className="flex items-end justify-center" style={{ height: '72px' }}>
                            <img
                              src={getImageUrl(opt.imageUrl)}
                              alt={opt.word}
                              data-fallback-stage={useRealistic ? 'png' : 'original'}
                              className="object-contain"
                              style={{ maxHeight: '72px', maxWidth: '80px' }}
                              onError={(e) => handleImageError(e, opt.imageUrl)}
                            />
                          </div>
                          {/* Tick circle */}
                          <div className="w-6 h-6 rounded-full border-[1.5px] border-slate-400 flex-shrink-0" />
                          {/* Word */}
                          <span className="text-[9px] text-slate-400 font-medium capitalize text-center leading-tight">
                            {opt.word}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-3 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-400">
            <span>İlkSözüm — Erken Çocukluk Eğitim Uygulaması</span>
            <span>Zıt Kavramlar Serisi</span>
            <span>Tüm Hakları Saklıdır.</span>
          </div>
        </div>
      </main>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #worksheet-print-area, #worksheet-print-area * { visibility: visible; }
          #worksheet-print-area {
            position: fixed !important;
            left: 0; top: 0;
            width: 100% !important;
            padding: 1cm 1.2cm !important;
            box-shadow: none !important;
          }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>
    </div>
  );
};

export default ConceptWorksheetPreview;
