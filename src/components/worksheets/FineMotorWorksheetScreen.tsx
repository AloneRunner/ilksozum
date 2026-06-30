import React, { useState } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import PrintIcon from '../icons/PrintIcon.tsx';

interface FineMotorWorksheetScreenProps {
  onBack: () => void;
}

type WorksheetType = 'tracing' | 'cutting' | 'coloring';
type Difficulty = 'easy' | 'medium' | 'hard';

// Some emojis for line tracing (start -> end)
const TRACING_PAIRS = [
  { left: '🐝', right: '🌻' },
  { left: '🐁', right: '🧀' },
  { left: '🐕', right: '🦴' },
  { left: '🚙', right: '🏠' },
  { left: '🐒', right: '🍌' },
  { left: '🚀', right: '🌕' },
  { left: '🐰', right: '🥕' },
];

const FineMotorWorksheetScreen: React.FC<FineMotorWorksheetScreenProps> = ({ onBack }) => {
  const [worksheetType, setWorksheetType] = useState<WorksheetType>('tracing');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [seed, setSeed] = useState(0);

  // Trigger re-render with new random stuff
  const regenerate = () => setSeed(s => s + 1);

  const getRandomPairs = (count: number) => {
    const shuffled = [...TRACING_PAIRS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  /* ───── TRACING (ÇİZGİ) ───── */
  const renderTracing = () => {
    const pairs = getRandomPairs(5);

    return (
      <div className="flex flex-col gap-10 w-full mt-4">
        {pairs.map((pair, index) => {
          let svgPath = '';
          if (difficulty === 'easy') {
            // Düz Çizgi
            svgPath = 'M 20,50 L 580,50';
          } else if (difficulty === 'medium') {
            // Zigzag
            svgPath = 'M 20,50 L 100,20 L 180,80 L 260,20 L 340,80 L 420,20 L 500,80 L 580,50';
          } else {
            // Dalgalı (Sinüs benzeri) / Döngülü
            svgPath = 'M 20,50 Q 80,-20 150,50 T 280,50 T 410,50 T 540,50 L 580,50';
            if (index % 2 === 1) {
              // Kale suru / Kare dalga (yaklaşık)
              svgPath = 'M 20,80 L 80,80 L 80,20 L 140,20 L 140,80 L 200,80 L 200,20 L 260,20 L 260,80 L 320,80 L 320,20 L 380,20 L 380,80 L 440,80 L 440,20 L 500,20 L 500,80 L 580,80';
            }
          }

          return (
            <div key={index} className="flex items-center w-full px-8 relative h-24">
              <span className="text-5xl z-10">{pair.left}</span>
              <div className="flex-1 h-full mx-4">
                <svg width="100%" height="100%" viewBox="0 0 600 100" preserveAspectRatio="none">
                  {/* Kılavuz çizgiler (çok hafif) */}
                  <line x1="0" y1="20" x2="600" y2="20" stroke="#e2e8f0" strokeWidth="1" />
                  <line x1="0" y1="50" x2="600" y2="50" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5,5" />
                  <line x1="0" y1="80" x2="600" y2="80" stroke="#e2e8f0" strokeWidth="1" />
                  
                  {/* Kesik ana çizgi */}
                  <path 
                    d={svgPath} 
                    fill="none" 
                    stroke="#475569" 
                    strokeWidth="3" 
                    strokeDasharray="10, 10" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
              <span className="text-5xl z-10">{pair.right}</span>
            </div>
          );
        })}
      </div>
    );
  };

  /* ───── CUTTING (MAKAS) ───── */
  const renderCutting = () => {
    let shapes = [];
    if (difficulty === 'easy') {
      // Büyük basit şekiller (Kare, Üçgen, Daire)
      shapes = [
        <rect x="50" y="50" width="200" height="200" />,
        <circle cx="450" cy="150" r="100" />,
        <polygon points="250,550 150,850 350,850" />,
      ];
    } else if (difficulty === 'medium') {
      // Kalp, Yıldız, Oval
      shapes = [
        <path d="M 150,150 L 450,150 L 450,450 L 150,450 Z" />, // Kare (ama döndürülmüş vb yapılabilir)
        <path d="M 300,100 L 360,250 L 500,250 L 380,330 L 420,480 L 300,380 L 180,480 L 220,330 L 100,250 L 240,250 Z" />, // Yıldız
        <path d="M 150,800 C 150,700 250,600 300,700 C 350,600 450,700 450,800 C 450,900 300,1050 300,1050 C 300,1050 150,900 150,800 Z" />, // Kalp
      ];
    } else {
      // Zor: Sarmal (Spiral) veya Karmaşık Yol
      shapes = [
        <path d="M 300,300 C 400,300 400,400 300,400 C 150,400 150,200 300,200 C 500,200 500,500 300,500 C 50,500 50,100 300,100 C 600,100 600,600 300,600" />
      ];
    }

    return (
      <div className="flex flex-col items-center justify-center w-full h-full relative">
        <svg width="600" height="900" viewBox="0 0 600 1100">
          {shapes.map((shape, idx) => (
            <g key={idx}>
              {/* Kopya path sırf kılavuz (açık gri) için koyulabilirdi, şimdilik kesik çizgi yeterli */}
              {React.cloneElement(shape, {
                fill: 'none',
                stroke: '#475569',
                strokeWidth: '4',
                strokeDasharray: '12, 12',
                strokeLinecap: 'round'
              })}
            </g>
          ))}
          {/* Makas İkonları Ekleme (Dinamik yerleştirme SVG path hesaplamasıyla yapılır ama basitçe manuel koyalım) */}
          {difficulty === 'easy' && (
            <g fontSize="40">
              <text x="30" y="60">✂️</text>
              <text x="330" y="160">✂️</text>
              <text x="210" y="520">✂️</text>
            </g>
          )}
          {difficulty === 'medium' && (
            <g fontSize="40">
              <text x="280" y="80">✂️</text>
              <text x="130" y="700">✂️</text>
            </g>
          )}
          {difficulty === 'hard' && (
            <g fontSize="40 transform-rotate-45">
              <text x="320" y="310">✂️</text>
            </g>
          )}
        </svg>
      </div>
    );
  };

  /* ───── COLORING (BOYAMA) ───── */
  const renderColoring = () => {
    // Klasik dış hat çizimlerinden oluşan SVG (Araba, Ev, Ağaç basit çizimleri)
    let coloringPath = '';
    if (seed % 3 === 0) {
      // EV ve AĞAÇ
      coloringPath = `
        <!-- Ev -->
        <path d="M 100,500 L 100,800 L 400,800 L 400,500 Z" fill="white" stroke="black" stroke-width="6" stroke-linejoin="round"/>
        <path d="M 50,500 L 250,250 L 450,500 Z" fill="white" stroke="black" stroke-width="6" stroke-linejoin="round"/>
        <rect x="200" y="600" width="100" height="200" fill="white" stroke="black" stroke-width="6"/>
        <circle cx="280" cy="700" r="8" fill="black" />
        <rect x="130" y="550" width="60" height="60" fill="white" stroke="black" stroke-width="6"/>
        <!-- Ağaç -->
        <path d="M 500,800 L 500,600 C 450,600 450,500 500,450 C 480,400 550,300 600,400 C 650,300 700,400 680,450 C 750,500 700,600 650,600 L 650,800 Z" fill="white" stroke="black" stroke-width="6" stroke-linejoin="round"/>
      `;
    } else if (seed % 3 === 1) {
      // ARABA
      coloringPath = `
        <path d="M 100,600 L 100,500 L 200,500 L 300,400 L 500,400 L 600,500 L 700,500 L 700,600 Z" fill="white" stroke="black" stroke-width="6" stroke-linejoin="round"/>
        <circle cx="200" cy="650" r="60" fill="white" stroke="black" stroke-width="6"/>
        <circle cx="200" cy="650" r="20" fill="white" stroke="black" stroke-width="6"/>
        <circle cx="600" cy="650" r="60" fill="white" stroke="black" stroke-width="6"/>
        <circle cx="600" cy="650" r="20" fill="white" stroke="black" stroke-width="6"/>
        <path d="M 230,500 L 310,420 L 400,420 L 400,500 Z" fill="white" stroke="black" stroke-width="6" stroke-linejoin="round"/>
        <path d="M 420,420 L 480,420 L 550,500 L 420,500 Z" fill="white" stroke="black" stroke-width="6" stroke-linejoin="round"/>
      `;
    } else {
      // BALIK ve DENİZALTI
      coloringPath = `
        <!-- Balık -->
        <path d="M 300,300 C 400,200 600,300 550,400 C 600,500 400,600 300,500 C 200,600 100,500 150,400 C 100,300 200,200 300,300 Z" fill="white" stroke="black" stroke-width="6" stroke-linejoin="round"/>
        <circle cx="450" cy="350" r="10" fill="black" />
        <path d="M 500,400 C 480,420 480,440 500,450" fill="none" stroke="black" stroke-width="6" stroke-linecap="round"/>
        <path d="M 350,300 C 350,250 400,250 400,300" fill="none" stroke="black" stroke-width="6" stroke-linecap="round"/>
        <!-- Kabarcıklar -->
        <circle cx="550" cy="250" r="15" fill="white" stroke="black" stroke-width="4"/>
        <circle cx="580" cy="180" r="25" fill="white" stroke="black" stroke-width="4"/>
        <!-- Yosun -->
        <path d="M 100,900 C 120,800 80,750 150,650 C 120,750 160,800 100,900 Z" fill="white" stroke="black" stroke-width="4" stroke-linejoin="round"/>
        <path d="M 200,900 C 180,850 220,800 180,700 C 240,800 200,850 200,900 Z" fill="white" stroke="black" stroke-width="4" stroke-linejoin="round"/>
      `;
    }

    return (
      <div className="flex flex-col items-center justify-center w-full h-[800px] relative">
        <svg width="800" height="900" viewBox="0 0 800 900" dangerouslySetInnerHTML={{ __html: coloringPath }} />
      </div>
    );
  };

  const getTitle = () => {
    if (worksheetType === 'tracing') return 'Çizgi Çalışması';
    if (worksheetType === 'cutting') return 'Makasla Kesme Pratiği';
    return 'Boyama Sayfası';
  };

  const getSubtitle = () => {
    if (worksheetType === 'tracing') return 'Kesik çizgileri takip ederek şekilleri/resimleri birleştirin.';
    if (worksheetType === 'cutting') return 'Makas işareti olan yerden başlayarak kesik çizgileri takip edin.';
    return 'Resimlerin içini dilediğiniz renklerle boyayın.';
  };

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
          {/* Worksheet Type */}
          <div className="flex items-center bg-slate-100 rounded-lg p-1 text-sm font-semibold text-slate-700 h-[34px]">
            <button
              onClick={() => setWorksheetType('tracing')}
              className={`px-3 py-1 rounded-md text-xs font-black transition-colors h-full ${worksheetType === 'tracing' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-indigo-50'}`}
            >
              〽️ Çizgi
            </button>
            <button
              onClick={() => setWorksheetType('cutting')}
              className={`px-3 py-1 rounded-md text-xs font-black transition-colors h-full ${worksheetType === 'cutting' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-indigo-50'}`}
            >
              ✂️ Makas
            </button>
            <button
              onClick={() => setWorksheetType('coloring')}
              className={`px-3 py-1 rounded-md text-xs font-black transition-colors h-full ${worksheetType === 'coloring' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-indigo-50'}`}
            >
              🖍️ Boyama
            </button>
          </div>

          {/* Difficulty (only for tracing and cutting) */}
          {(worksheetType === 'tracing' || worksheetType === 'cutting') && (
            <div className="flex items-center bg-slate-100 rounded-lg p-1 text-sm font-semibold text-slate-700 h-[34px] ml-2">
              <button
                onClick={() => setDifficulty('easy')}
                className={`px-3 py-1 rounded-md text-xs font-black transition-colors h-full ${difficulty === 'easy' ? 'bg-emerald-500 text-white shadow-sm' : 'hover:bg-emerald-50'}`}
              >
                Kolay
              </button>
              <button
                onClick={() => setDifficulty('medium')}
                className={`px-3 py-1 rounded-md text-xs font-black transition-colors h-full ${difficulty === 'medium' ? 'bg-amber-500 text-white shadow-sm' : 'hover:bg-amber-50'}`}
              >
                Orta
              </button>
              <button
                onClick={() => setDifficulty('hard')}
                className={`px-3 py-1 rounded-md text-xs font-black transition-colors h-full ${difficulty === 'hard' ? 'bg-rose-500 text-white shadow-sm' : 'hover:bg-rose-50'}`}
              >
                Zor
              </button>
            </div>
          )}

          {/* Regenerate */}
          <button
            onClick={regenerate}
            className="flex items-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-1.5 px-3 rounded-lg text-sm transition-colors ml-2"
          >
            🔀 Yeni Şablon
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
      <main className="flex-1 overflow-y-auto py-6 flex justify-center print:p-0 print:block">
        <div
          id="worksheet-print-area"
          className="bg-white w-full max-w-[21cm] shadow-2xl print:shadow-none"
          style={{ minHeight: '29.7cm', padding: '1cm 1.2cm', position: 'relative' }}
        >
          {/* Paper header */}
          <div className="flex items-start justify-between border-b-2 border-slate-300 pb-2 mb-8">
            <div>
              <div className="text-xl font-black text-slate-800">{getTitle()}</div>
              <div className="text-sm text-slate-500 font-semibold mt-1">
                {getSubtitle()}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-right mt-1">
              {[['Adı Soyadı:', 'w-44'], ['Tarih:', 'w-24']].map(([label, w]) => (
                <div key={label} className="flex items-center gap-2 justify-end">
                  <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">{label}</span>
                  <span className={`border-b border-dashed border-slate-400 ${w} inline-block h-3`}></span>
                </div>
              ))}
            </div>
          </div>

          {/* Worksheet Content */}
          <div className="w-full flex-1 min-h-[800px]">
            {worksheetType === 'tracing' && renderTracing()}
            {worksheetType === 'cutting' && renderCutting()}
            {worksheetType === 'coloring' && renderColoring()}
          </div>

          {/* Footer watermark */}
          <div className="absolute bottom-4 left-0 right-0 text-center print:block">
            <span className="text-[10px] font-bold text-slate-300">İlk Sözüm Otizm · motor beceriler ve etkinlik merkezi</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FineMotorWorksheetScreen;
