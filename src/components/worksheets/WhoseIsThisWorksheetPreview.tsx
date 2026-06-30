import React, { useState, useCallback } from 'react';
import { ConceptRound } from '../../types.ts';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import PrintIcon from '../icons/PrintIcon.tsx';

interface Props {
  rounds: ConceptRound[];
  onBack: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => 0.5 - Math.random());
}

const WhoseIsThisWorksheetPreview: React.FC<Props> = ({ rounds, onBack }) => {
  const [questionCount, setQuestionCount] = useState(Math.min(9, rounds.length));
  const [cols, setCols] = useState<2 | 3>(3);

  const [picked, setPicked] = useState<ConceptRound[]>(() =>
    shuffle(rounds).slice(0, Math.min(9, rounds.length))
  );
  const [correctOnLeft, setCorrectOnLeft] = useState<boolean[]>(() =>
    picked.map(() => Math.random() > 0.5)
  );

  const regenerate = useCallback((count: number) => {
    const next = shuffle(rounds).slice(0, count);
    setPicked(next);
    setCorrectOnLeft(next.map(() => Math.random() > 0.5));
  }, [rounds]);

  const maxCount = Math.min(12, rounds.length);
  const countOptions = [6, 9, 12].filter(n => n <= maxCount);
  if (countOptions.length === 0) countOptions.push(rounds.length);

  return (
    <div className="flex flex-col h-full w-full bg-slate-300 print:h-auto print:block print:bg-white print:overflow-visible">

      {/* Toolbar */}
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 bg-white shadow-sm print:hidden gap-2 flex-wrap">
        <button onClick={onBack} className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 font-bold text-sm flex-shrink-0">
          <ArrowLeftIcon className="w-5 h-5" /> Geri
        </button>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          {countOptions.length > 1 && (
            <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700">
              <span>📝</span>
              {countOptions.map(n => (
                <button key={n} onClick={() => { setQuestionCount(n); regenerate(n); }}
                  className={`w-7 h-7 rounded-md text-xs font-black transition-colors ${questionCount === n ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-indigo-50'}`}>{n}</button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2 py-1.5 text-sm font-semibold text-slate-700">
            <span>📐</span>
            {([2, 3] as const).map(c => (
              <button key={c} onClick={() => setCols(c)}
                className={`w-7 h-7 rounded-md text-xs font-black transition-colors ${cols === c ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600 hover:bg-indigo-50'}`}>{c}</button>
            ))}
          </div>
          <button onClick={() => regenerate(questionCount)}
            className="flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-1.5 px-3 rounded-lg text-sm transition-colors">
            🔀 Yeni Karıştır
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-3 rounded-xl shadow text-sm">
            <PrintIcon className="w-4 h-4" /> Yazdır
          </button>
          <button onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl shadow text-sm">
            <span>📄</span> PDF Kaydet
          </button>
        </div>
      </header>

      {/* A4 Preview */}
      <main className="flex-1 overflow-y-auto print:overflow-visible print:h-auto py-6 flex justify-center print:p-0 print:block print:flex-none">
        <div id="worksheet-print-area" className="bg-white w-full max-w-[21cm] shadow-2xl print:shadow-none print:max-w-none print:w-full"
          style={{ minHeight: '29.7cm', padding: '1cm 1.2cm' }}>

          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-300 pb-2 mb-4">
            <div>
              <div className="text-base font-black text-slate-800">Çalışma Kağıdı · Bu Kimin?</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">Akıl Yürütme — Eşyayı sahibiyle eşleştir</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Her soruda nesnenin sahibini bulun ve altındaki daireyi işaretleyin.</div>
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
          <div className={`grid gap-3 ${cols === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
            {picked.map((round, index) => {
              const correct = round.options.find(o => o.isCorrect);
              const wrong = round.options.find(o => !o.isCorrect);
              if (!correct || !wrong) return null;
              const left = correctOnLeft[index] ? correct : wrong;
              const right = correctOnLeft[index] ? wrong : correct;
              const itemH = cols === 2 ? 90 : 65;
              const optH = cols === 2 ? 75 : 55;

              return (
                <div key={round.id} className="border border-slate-200 rounded-xl p-3 flex flex-col items-center gap-2" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  {/* Question number */}
                  <div className="flex items-center gap-1.5 w-full">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">{index + 1}</span>
                    <span className="text-[9px] font-bold text-slate-700 leading-tight">{round.question}</span>
                  </div>

                  {/* Question item (the object) */}
                  {round.questionItem && (
                    <div className="flex items-center justify-center rounded-lg bg-indigo-50 border border-indigo-200" style={{ width: itemH, height: itemH }}>
                      <img src={round.questionItem.imageUrl} alt={round.questionItem.word}
                        className="object-contain p-1"
                        style={{ maxHeight: itemH - 8, maxWidth: itemH - 8 }} />
                    </div>
                  )}

                  <div className="text-[8px] text-slate-400 font-bold">KİMİN?</div>

                  {/* Two owner options */}
                  <div className="flex items-end justify-evenly gap-2 w-full">
                    {[left, right].map((opt, side) => (
                      <div key={`${opt.id}-${side}`} className="flex flex-col items-center gap-1.5 flex-1">
                        <div className="flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200" style={{ height: optH, width: '100%' }}>
                          <img src={opt.imageUrl} alt={opt.word} className="object-contain p-1"
                            style={{ maxHeight: optH - 8, maxWidth: '90%' }} />
                        </div>
                        <div className={`rounded-full border-[1.5px] border-slate-400 ${cols === 2 ? 'w-5 h-5' : 'w-4 h-4'}`} />
                        <span className={`text-slate-500 font-medium capitalize text-center leading-tight ${cols === 2 ? 'text-[10px]' : 'text-[8px]'}`}>{opt.word}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-3 border-t border-slate-200 flex items-center justify-between text-[8px] text-slate-400">
            <span>İlkSözüm — Erken Çocukluk Eğitim Uygulaması</span>
            <span>Bu Kimin? — Akıl Yürütme Serisi</span>
            <span>Tüm Hakları Saklıdır.</span>
          </div>
        </div>
      </main>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          #worksheet-print-area, #worksheet-print-area * { visibility: visible; }
          #worksheet-print-area { position: fixed !important; left: 0; top: 0; width: 100% !important; padding: 1cm 1.2cm !important; box-shadow: none !important; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>
    </div>
  );
};

export default WhoseIsThisWorksheetPreview;
