import React, { useState, useCallback } from 'react';
import { ColorRecognitionRound, COLOR_OPTIONS } from '../../services/database/activities/reasoning/colorRecognitionData.ts';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import PrintIcon from '../icons/PrintIcon.tsx';

interface Props {
  rounds: ColorRecognitionRound[];
  onBack: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => 0.5 - Math.random());
}

// Her tur için 4 renk seçeneği üret: doğru + 3 rastgele
function buildOptions(correctKey: string): { key: string; label: string; hex: string }[] {
  const correct = COLOR_OPTIONS.find(c => c.key === correctKey)!;
  const others = shuffle(COLOR_OPTIONS.filter(c => c.key !== correctKey)).slice(0, 3);
  return shuffle([correct, ...others]);
}

const ColorRecognitionWorksheetPreview: React.FC<Props> = ({ rounds, onBack }) => {
  const [questionCount, setQuestionCount] = useState(Math.min(9, rounds.length));
  const [cols, setCols] = useState<2 | 3>(3);

  const [picked, setPicked] = useState<ColorRecognitionRound[]>(() =>
    shuffle(rounds).slice(0, Math.min(9, rounds.length))
  );
  const [optionsPerRound, setOptionsPerRound] = useState<ReturnType<typeof buildOptions>[]>(() =>
    picked.map(r => buildOptions(r.correctColor))
  );

  const regenerate = useCallback((count: number) => {
    const next = shuffle(rounds).slice(0, count);
    setPicked(next);
    setOptionsPerRound(next.map(r => buildOptions(r.correctColor)));
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
              <div className="text-base font-black text-slate-800">Çalışma Kağıdı · Rengi Ne?</div>
              <div className="text-xs text-slate-500 font-semibold mt-0.5">Temel Kavramlar — Nesnenin rengini bul</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Her soruda nesnenin rengini bulun ve doğru rengin yanındaki daireyi işaretleyin.</div>
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
              const opts = optionsPerRound[index] ?? buildOptions(round.correctColor);
              const imgH = cols === 2 ? 100 : 72;

              return (
                <div key={round.id} className="border border-slate-200 rounded-xl p-3 flex flex-col items-center gap-2" style={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
                  {/* Question number + text */}
                  <div className="flex items-center gap-1.5 w-full">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">{index + 1}</span>
                    <span className="text-[9px] font-bold text-slate-700 leading-tight">
                      {round.speech?.tr.question ?? `${round.word} ne renk?`}
                    </span>
                  </div>

                  {/* Object image */}
                  <div className="flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200" style={{ height: imgH, width: imgH }}>
                    <img src={`/images/${round.imageId}.png`} alt={round.word}
                      className="object-contain p-1"
                      style={{ maxHeight: imgH - 8, maxWidth: imgH - 8 }} />
                  </div>

                  {/* Color options: 2x2 grid */}
                  <div className="grid grid-cols-2 gap-1.5 w-full">
                    {opts.map(opt => (
                      <div key={opt.key} className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-1.5 py-1">
                        {/* Color swatch */}
                        <span
                          className="flex-shrink-0 rounded-full border border-slate-300"
                          style={{ width: 16, height: 16, backgroundColor: opt.hex }}
                        />
                        {/* Tick circle */}
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-400 flex-shrink-0" />
                        {/* Label */}
                        <span className={`text-slate-600 font-semibold leading-tight capitalize ${cols === 2 ? 'text-[9px]' : 'text-[8px]'}`}>{opt.label}</span>
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
            <span>Rengi Ne? — Temel Kavramlar Serisi</span>
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

export default ColorRecognitionWorksheetPreview;
