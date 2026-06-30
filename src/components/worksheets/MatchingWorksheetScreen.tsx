import React, { useState } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import PrintIcon from '../icons/PrintIcon.tsx';

interface MatchingWorksheetScreenProps {
  onBack: () => void;
}

type MatchingMode = 'shadow' | 'half' | 'momBaby';

// Sample animal data for mom-baby matching. Assuming we have some generic emoji or image paths.
// We will use high quality Emojis or just generic representations for simplicity right now.
const MOM_BABY_PAIRS = [
  { left: '🐄', right: '🐮', leftWord: 'İnek', rightWord: 'Buzağı' },
  { left: '🐕', right: '🐶', leftWord: 'Köpek', rightWord: 'Yavru Köpek' },
  { left: '🐈', right: '🐱', leftWord: 'Kedi', rightWord: 'Yavru Kedi' },
  { left: '🐎', right: '🐴', leftWord: 'At', rightWord: 'Tay' },
  { left: '🐑', right: '🐏', leftWord: 'Koyun', rightWord: 'Kuzu' },
  { left: '🐔', right: '🐣', leftWord: 'Tavuk', rightWord: 'Civciv' },
  { left: '🐖', right: '🐽', leftWord: 'Domuz', rightWord: 'Yavru Domuz' },
  { left: '🦆', right: '🐤', leftWord: 'Ördek', rightWord: 'Yavru Ördek' },
];

const GENERIC_ITEMS = ['🍎', '🚗', '🧸', '🌳', '🏠', '🍕', '⚽', '🎸', '🐢', '🦀', '🦋', '🚁', '⛴️'];

const MatchingWorksheetScreen: React.FC<MatchingWorksheetScreenProps> = ({ onBack }) => {
  const [mode, setMode] = useState<MatchingMode>('shadow');
  const [, setSeed] = useState(0);

  const regenerate = () => setSeed(s => s + 1);

  const getShuffledItems = () => {
    let baseList = [...GENERIC_ITEMS];
    if (mode === 'momBaby') {
      // Return 5 random mom-baby pairs
      const pairs = [...MOM_BABY_PAIRS].sort(() => 0.5 - Math.random()).slice(0, 5);
      const leftCol = pairs.map(p => p.left);
      const rightCol = pairs.map(p => p.right).sort(() => 0.5 - Math.random());
      return { leftCol, rightCol, data: pairs }; // data not strictly needed for rendering, just info
    }

    // For shadow and half, we use 5 generic items
    const selected = baseList.sort(() => 0.5 - Math.random()).slice(0, 5);
    const rightCol = [...selected].sort(() => 0.5 - Math.random());
    return { leftCol: selected, rightCol };
  };

  const { leftCol, rightCol } = getShuffledItems(); // Runs on every render (dependent on state which triggers re-render via seed)

  const getTitleInfo = () => {
    if (mode === 'shadow') return { title: 'Gölge Eşleştirme', sub: 'Her nesneyi doğru gölgesiyle eşleştir (Çizgi Çek).' };
    if (mode === 'half') return { title: 'Parça - Bütün (Tamamlama)', sub: 'İkiye bölünmüş nesnelerin diğer yarısını bul.' };
    return { title: 'Anne - Yavru Eşleştirme', sub: 'Yavru hayvanları anneleriyle eşleştir (Çizgi Çek).' };
  };

  const { title, sub } = getTitleInfo();

  /* ───── RENDER HELPERS ───── */
  const renderItem = (item: string, side: 'left' | 'right') => {
    if (mode === 'shadow' && side === 'right') {
      // Gölge efekti: filtre ile kapkara yap
      return (
        <div className="text-6xl" style={{ textShadow: '0 0 0 black', color: 'transparent' }}>
          {item}
        </div>
      );
    }
    
    if (mode === 'half') {
      // Sol taraf için resmin sağını kes, sağ taraf için solunu kes
      const clipPath = side === 'left' 
        ? 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' 
        : 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)';
      return (
        <div className="text-6xl" style={{ clipPath }}>
          {item}
        </div>
      );
    }

    // Normal veya anne-yavru
    return <div className="text-6xl">{item}</div>;
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-200">
      <header className="flex-shrink-0 flex items-center justify-between px-4 py-2.5 bg-white shadow-sm print:hidden gap-2 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-600 hover:text-slate-800 font-bold text-sm flex-shrink-0"
        >
          <ArrowLeftIcon className="w-5 h-5" /> Geri
        </button>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          <div className="flex items-center bg-slate-100 rounded-lg p-1 text-sm font-semibold text-slate-700 h-[34px]">
            <button
              onClick={() => setMode('shadow')}
              className={`px-3 py-1 rounded-md text-xs font-black transition-colors h-full ${mode === 'shadow' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-indigo-50'}`}
            >
              👤 Gölge
            </button>
            <button
              onClick={() => setMode('half')}
              className={`px-3 py-1 rounded-md text-xs font-black transition-colors h-full ${mode === 'half' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-indigo-50'}`}
            >
              🌗 Parça-Bütün
            </button>
            <button
              onClick={() => setMode('momBaby')}
              className={`px-3 py-1 rounded-md text-xs font-black transition-colors h-full ${mode === 'momBaby' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-indigo-50'}`}
            >
              🐄 Anne-Yavru
            </button>
          </div>

          <button
            onClick={regenerate}
            className="flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-1.5 px-3 rounded-lg text-sm transition-colors ml-2"
          >
            🔀 Karıştır
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

      <main className="flex-1 overflow-y-auto py-6 flex justify-center print:p-0">
        <div
          className="bg-white w-full max-w-[21cm] shadow-2xl print:shadow-none"
          style={{ minHeight: '29.7cm', padding: '1cm 1.5cm' }}
        >
          <div className="flex items-start justify-between border-b-2 border-slate-300 pb-2 mb-10">
            <div>
              <div className="text-xl font-black text-slate-800">{title}</div>
              <div className="text-sm text-slate-500 font-semibold mt-1">{sub}</div>
            </div>
            <div className="flex flex-col gap-2 text-right mt-1">
              <div className="flex items-center gap-2 justify-end">
                <span className="text-xs font-semibold text-slate-500">Adı Soyadı:</span>
                <span className="border-b border-dashed border-slate-400 w-44 h-3"></span>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-between px-10 relative">
            {/* L column */}
            <div className="flex flex-col gap-12">
              {leftCol.map((item, i) => (
                <div key={`l-${i}`} className="flex items-center gap-4">
                  <div className="w-24 h-24 border-2 border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50 relative">
                    {renderItem(item, 'left')}
                    {/* Bağlantı noktası sağda */}
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-400 border-2 border-white"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* R column */}
            <div className="flex flex-col gap-12">
              {rightCol.map((item, i) => (
                <div key={`r-${i}`} className="flex items-center gap-4 flex-row-reverse">
                  <div className="w-24 h-24 border-2 border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50 relative">
                    {renderItem(item, 'right')}
                    {/* Bağlantı noktası solda */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-400 border-2 border-white"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MatchingWorksheetScreen;
