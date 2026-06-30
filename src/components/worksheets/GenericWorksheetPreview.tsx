import React, { useState, useCallback } from 'react';
import { ConceptRound } from '../../types.ts';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import PrintIcon from '../icons/PrintIcon.tsx';

interface GenericWorksheetPreviewProps {
  rounds: ConceptRound[];
  worksheetTitle: string;
  worksheetSubtitle: string;
  /** Label on the correct-answer circle (e.g. "BÜYÜK" | "UZUN" | "GÜNELİK" etc.) */
  answerLabel: string;
  onBack: () => void;
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

function getUniqueRounds(rounds: ConceptRound[], targetCount: number): ConceptRound[] {
  const shuffled = shuffle(rounds);
  const result: ConceptRound[] = [];
  const seenVisualKeys = new Set<string>();

  for (const r of shuffled) {
    if (result.length >= targetCount) break;
    const imagesKey = (r.options || []).map(o => o.imageUrl || '').sort().join('|');
    if (!seenVisualKeys.has(imagesKey)) {
      seenVisualKeys.add(imagesKey);
      result.push(r);
    }
  }

  // If there are not enough unique pairs to fill the target count,
  // fill remaining spots with other available rounds (different questions for the same pairs).
  if (result.length < targetCount) {
    for (const r of shuffled) {
      if (result.length >= targetCount) break;
      if (!result.includes(r)) {
        result.push(r);
      }
    }
  }

  return result.slice(0, targetCount);
}

const GenericWorksheetPreview: React.FC<GenericWorksheetPreviewProps> = ({
  rounds,
  worksheetTitle,
  worksheetSubtitle,
  answerLabel: _answerLabel, // reserved for future use (e.g. answer key)
  onBack,
}) => {
  const [questionCount, setQuestionCount] = useState(Math.min(9, rounds.length));
  const [useRealistic, setUseRealistic] = useState(false);
  const [cols, setCols] = useState<2 | 3>(questionCount <= 6 ? 2 : 3);
  const [layoutMode, setLayoutMode] = useState<'standard' | 'cards'>('standard');

  const [picked, setPicked] = useState<ConceptRound[]>(() =>
    getUniqueRounds(rounds, Math.min(9, rounds.length))
  );
  const [correctOnLeft, setCorrectOnLeft] = useState<boolean[]>(() =>
    picked.map(() => Math.random() > 0.5)
  );

  const regenerate = useCallback((count: number) => {
    const next = getUniqueRounds(rounds, count);
    setPicked(next);
    setCorrectOnLeft(next.map(() => Math.random() > 0.5));
  }, [rounds]);

  const handleCountChange = (n: number) => {
    setQuestionCount(n);
    regenerate(n);
  };

  const getImageUrl = (opt: any) => {
    if (useRealistic && opt.imageUrl) {
      return toRealisticPng(opt.imageUrl);
    }
    return opt.imageUrl;
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

  const maxCount = Math.min(12, rounds.length);
  const countOptions = [6, 9, 12].filter(n => n <= maxCount);
  if (countOptions.length === 0) countOptions.push(rounds.length);

  return (
    <div className="flex flex-col h-full w-full bg-slate-300 print:h-auto print:block print:bg-white print:overflow-visible">

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
          {countOptions.length > 1 && (
            <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700">
              <span>📝</span>
              {countOptions.map(n => (
                <button
                  key={n}
                  onClick={() => handleCountChange(n)}
                  className={`w-7 h-7 rounded-md text-xs font-black transition-colors ${questionCount === n ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-indigo-50'}`}
                >
                  {n}
                </button>
              ))}
            </div>
          )}

          {/* Columns toggle */}
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700">
            <span>📐</span>
            {[2, 3].map(c => (
              <button
                key={c}
                onClick={() => setCols(c as 2 | 3)}
                className={`w-7 h-7 rounded-md text-xs font-black transition-colors ${cols === c ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-indigo-50'}`}
                title={`${c} Sütun`}
              >
                {c}
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

          {/* Layout Mode */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1 text-sm font-semibold text-slate-700 h-[34px]">
            <button
              onClick={() => setLayoutMode('standard')}
              className={`px-2 py-1 rounded-md text-xs font-black transition-colors h-full ${layoutMode === 'standard' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-50'}`}
              title="Test Formatı"
            >
              📝 Test
            </button>
            <button
              onClick={() => setLayoutMode('cards')}
              className={`px-2 py-1 rounded-md text-xs font-black transition-colors h-full ${layoutMode === 'cards' ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-50'}`}
              title="Sadece görseller (Makasla kesmek için)"
            >
              ✂️ Kart
            </button>
          </div>

          {/* Regenerate */}
          <button
            onClick={() => regenerate(questionCount)}
            className="flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-1.5 px-3 rounded-lg text-sm transition-colors"
          >
            🔀 Yeni Karıştır
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-slate-600 hover:bg-slate-700 active:scale-95 transition-all text-white font-bold py-2 px-3 rounded-xl shadow text-sm flex-shrink-0"
            title="Sadece Yazdır"
          >
            <PrintIcon className="w-4 h-4" /> Yazdır
          </button>
          
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 transition-all text-white font-bold py-2 px-3 rounded-xl shadow text-sm flex-shrink-0"
            title="PDF Olarak Kaydetmek İçin Tıklayın (Yazdırırken 'PDF Kaydet' seçin)"
          >
            <span className="text-base flex-shrink-0">📄</span> PDF Kaydet
          </button>
        </div>
      </header>

      {/* A4 Preview */}
      <main className="flex-1 overflow-y-auto print:overflow-visible print:h-auto py-6 flex justify-center print:p-0 print:block print:flex-none">
        <div
          id="worksheet-print-area"
          className="bg-white w-full max-w-[21cm] shadow-2xl print:shadow-none print:max-w-none print:w-full print:h-auto"
          style={{ minHeight: '29.7cm', padding: '1cm 1.2cm' }}
        >
          {/* Paper header */}
          <div className="flex items-start justify-between border-b-2 border-slate-300 pb-2 mb-4">
            <div>
              <div className="text-base font-black text-slate-800">{worksheetTitle}</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">{worksheetSubtitle}</div>
              {layoutMode === 'standard' && (
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Her soruyu okuyun ve doğru seçeneğin altındaki daireyi işaretleyin.
                </div>
              )}
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

          {/* Questions grid */}
          <div className={`ws-grid grid gap-3 ${cols === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {picked.map((round, index) => {
              return (
                <div
                  key={`${round.id}-${index}`}
                  className={`ws-card border border-slate-200 rounded-xl ${cols === 2 ? 'p-4' : 'p-3'} flex flex-col items-center justify-center`}
                  style={{ minHeight: cols === 2 ? '240px' : '150px' }}
                >
                  {/* # and question text */}
                  {layoutMode === 'standard' && (
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-[9px] font-bold text-slate-700 leading-tight">
                        {round.question}
                      </span>
                    </div>
                  )}

                  {/* Options — adaptive to count */}
                  {round.options.length <= 2 ? (
                    // 2-option: big side-by-side (concept activities)
                    (() => {
                      const leftIsCorrect = correctOnLeft[index];
                      const correctOpt2 = round.options.find(o => o.isCorrect);
                      const wrongOpt2 = round.options.find(o => !o.isCorrect);
                      if (!correctOpt2 || !wrongOpt2) return null;
                      const leftOpt = leftIsCorrect ? correctOpt2 : wrongOpt2;
                      const rightOpt = leftIsCorrect ? wrongOpt2 : correctOpt2;
                      return (
                        <div className="flex items-end justify-evenly gap-2 flex-1">
                          {[leftOpt, rightOpt].map((opt, side) => (
                            <div key={`${opt.id}-${side}`} className="flex flex-col items-center justify-center gap-2 flex-1 w-1/2">
                              <div className="flex items-end justify-center w-full" style={{ height: layoutMode === 'cards' ? (cols === 2 ? '180px' : '110px') : (cols === 2 ? '140px' : '90px') }}>
                                <img src={getImageUrl(opt)} alt={opt.word}
                                  data-fallback-stage={useRealistic ? 'png' : 'original'}
                                  className={`object-contain transition-none ${(opt as any).imageScale && (opt as any).imageScale < 1 ? 'self-end' : ''}`}
                                  style={{
                                    maxHeight: `${Math.round(((layoutMode === 'cards' ? (cols === 2 ? 180 : 110) : (cols === 2 ? 140 : 90))) * ((opt as any).imageScale ?? 1))}px`,
                                    maxWidth: `${Math.round(100 * ((opt as any).imageScale ?? 1))}%`
                                  }}
                                  onError={(e) => handleImageError(e, opt.imageUrl)} />
                              </div>
                              {layoutMode === 'standard' && (
                                <div className={`rounded-full border-[1.5px] border-slate-400 flex-shrink-0 mt-1 ${cols === 2 ? 'w-5 h-5' : 'w-4 h-4'}`} />
                              )}
                              <span className={`text-[9px] text-slate-400 font-medium capitalize text-center leading-tight ${cols === 2 ? 'text-[12px]' : ''}`}>{opt.word}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })()
                  ) : (
                    // 3-4 options: compact grid (ObjectRecognition, 5N1K)
                    <div
                      className="grid gap-1.5 mt-1"
                      style={{ gridTemplateColumns: `repeat(${round.options.length === 4 ? 2 : round.options.length}, 1fr)` }}
                    >
                      {[...round.options].sort(() => Math.random() - 0.5).map((opt, si) => (
                        <div key={`${opt.id}-${si}`} className={`flex flex-col items-center ${layoutMode === 'cards' ? 'justify-center' : ''} gap-1 p-1 rounded-lg bg-slate-50`}>
                          <div className="flex items-center justify-center w-full" style={{ height: layoutMode === 'cards' ? (cols === 2 ? '100px' : '80px') : (cols === 2 ? '80px' : '60px') }}>
                            <img src={getImageUrl(opt)} alt={opt.word} className="object-contain"
                              data-fallback-stage={useRealistic ? 'png' : 'original'}
                              style={{ maxHeight: layoutMode === 'cards' ? (cols === 2 ? '100px' : '80px') : (cols === 2 ? '80px' : '60px'), maxWidth: cols === 2 ? '85px' : '65px', ...(opt.imageScale && { transform: `scale(${opt.imageScale})` }) }}
                              onError={(e) => handleImageError(e, opt.imageUrl)} />
                          </div>
                          <div className="flex items-center gap-1">
                            {layoutMode === 'standard' && (
                              <div className={`w-3.5 h-3.5 rounded-full border border-slate-400 flex-shrink-0 ${cols === 2 ? 'w-4 h-4' : ''}`} />
                            )}
                            <span className={`text-[7px] text-slate-500 font-medium capitalize leading-tight line-clamp-1 ${cols === 2 ? 'text-[9px]' : ''}`}>{opt.word}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-3 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-400">
            <span>İlkSözüm — Erken Çocukluk Eğitim Uygulaması</span>
            <span>{worksheetSubtitle}</span>
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
            left: 0; top: 0; width: 100% !important;
            padding: 1cm 1.2cm !important;
            box-shadow: none !important;
          }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>
    </div>
  );
};

export default GenericWorksheetPreview;
