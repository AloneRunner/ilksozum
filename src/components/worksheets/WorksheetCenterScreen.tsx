import React, { useState, useMemo, lazy, Suspense } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import PrintIcon from '../icons/PrintIcon.tsx';
import GenericWorksheetPreview from './GenericWorksheetPreview.tsx';
import FineMotorWorksheetScreen from './FineMotorWorksheetScreen.tsx';
import MatchingWorksheetScreen from './MatchingWorksheetScreen.tsx';
import {
  WORKSHEET_REGISTRY,
  WORKSHEET_CATEGORIES,
  WorksheetDef,
  WorksheetCategory,
} from './worksheetRegistry.ts';
import { ConceptRound } from '../../types.ts';

const WhoseIsThisWorksheetPreview = lazy(() => import('./WhoseIsThisWorksheetPreview.tsx'));
const ColorRecognitionWorksheetPreview = lazy(() => import('./ColorRecognitionWorksheetPreview.tsx'));
const WhatsMissingWorksheetPreview = lazy(() => import('./WhatsMissingWorksheetPreview.tsx'));

interface WorksheetCenterScreenProps {
  onBack: () => void;
}

type ViewState =
  | { mode: 'menu' }
  | { mode: 'loading'; def: WorksheetDef }
  | { mode: 'preview'; def: WorksheetDef; rounds: any[] }
  | { mode: 'fineMotor' }
  | { mode: 'matching' };

// Category config
const CATEGORY_META: Record<WorksheetCategory, { icon: string; bg: string; text: string }> = {
  'Zıt Kavramlar':  { icon: '↔️', bg: 'bg-indigo-500',  text: 'Zıt Kavramlar'  },
  'Mekan & Konum':  { icon: '📍', bg: 'bg-teal-500',    text: 'Mekan & Konum'  },
  'Miktar & Sayı':  { icon: '🔢', bg: 'bg-amber-500',   text: 'Miktar & Sayı'  },
  'Akıl Yürütme':   { icon: '💡', bg: 'bg-fuchsia-500', text: 'Akıl Yürütme'   },
  'Zaman & Duyular':{ icon: '⏰', bg: 'bg-cyan-500',    text: 'Zaman & Duyular' },
  'Nesne Tanıma':   { icon: '🔍', bg: 'bg-emerald-500', text: 'Nesne Tanıma'   },
};

const WorksheetCenterScreen: React.FC<WorksheetCenterScreenProps> = ({ onBack }) => {
  const [view, setView] = useState<ViewState>({ mode: 'menu' });
  const [activeCategory, setActiveCategory] = useState<WorksheetCategory | 'Tümü'>('Tümü');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = WORKSHEET_REGISTRY;
    if (activeCategory !== 'Tümü') {
      list = list.filter(w => w.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(w =>
        w.title.toLowerCase().includes(q) ||
        w.subtitle.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeCategory, search]);

  const grouped = useMemo(() => {
    if (activeCategory !== 'Tümü') {
      return [[activeCategory, filtered] as [string, WorksheetDef[]]];
    }
    return WORKSHEET_CATEGORIES
      .map(cat => [cat, filtered.filter(w => w.category === cat)] as [string, WorksheetDef[]])
      .filter(([, items]) => items.length > 0);
  }, [activeCategory, filtered]);

  const handleSelectWorksheet = async (def: WorksheetDef) => {
    setView({ mode: 'loading', def });
    try {
      const rounds = await def.loadData();
      if (!rounds || rounds.length === 0) throw new Error('No data');
      setView({ mode: 'preview', def, rounds });
    } catch (err) {
      console.error('Worksheet load failed:', err);
      alert('Bu çalışma kağıdı yüklenemedi. Veri dosyasını kontrol edin.');
      setView({ mode: 'menu' });
    }
  };

  /* ───── LOADING ─────────────────────────────────── */
  if (view.mode === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full bg-slate-100">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg animate-bounce"
          style={{ backgroundColor: view.def.color + '22', border: `2px solid ${view.def.color}` }}>
          {view.def.emoji.split('')[0]}
        </div>
        <p className="mt-4 text-slate-600 font-bold text-sm">{view.def.title}</p>
        <p className="mt-1 text-slate-400 text-xs">Yükleniyor…</p>
      </div>
    );
  }

  /* ───── PREVIEW ─────────────────────────────────── */
  if (view.mode === 'preview') {
    const goBack = () => setView({ mode: 'menu' });

    if (view.def.component === 'whose-is-this') {
      return (
        <Suspense fallback={null}>
          <WhoseIsThisWorksheetPreview rounds={view.rounds} onBack={goBack} />
        </Suspense>
      );
    }
    if (view.def.component === 'color-recognition') {
      return (
        <Suspense fallback={null}>
          <ColorRecognitionWorksheetPreview rounds={view.rounds} onBack={goBack} />
        </Suspense>
      );
    }
    if (view.def.component === 'whats-missing') {
      return (
        <Suspense fallback={null}>
          <WhatsMissingWorksheetPreview rounds={view.rounds} onBack={goBack} />
        </Suspense>
      );
    }

    return (
      <GenericWorksheetPreview
        rounds={view.rounds as ConceptRound[]}
        worksheetTitle={`Çalışma Kağıdı · ${view.def.title}`}
        worksheetSubtitle={`${view.def.category} — ${view.def.subtitle}`}
        answerLabel={view.def.answerLabel}
        onBack={goBack}
      />
    );
  }

  /* ───── FINE MOTOR PREVIEW ──────────────────────── */
  if (view.mode === 'fineMotor') {
    return (
      <FineMotorWorksheetScreen onBack={() => setView({ mode: 'menu' })} />
    );
  }

  /* ───── MATCHING (GÖLGE/ANNE-YAVRU) ─────────────── */
  if (view.mode === 'matching') {
    return (
      <MatchingWorksheetScreen onBack={() => setView({ mode: 'menu' })} />
    );
  }

  /* ───── MENU ─────────────────────────────────────── */
  const totalCount = WORKSHEET_REGISTRY.length;

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 overflow-hidden print:overflow-visible print:h-auto print:block">

      {/* ── TOP HERO HEADER ── */}
      <div
        className="flex-shrink-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-10 w-24 h-24 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #a5b4fc, transparent)', transform: 'translateY(40%)' }} />

        <div className="relative px-4 pt-4 pb-5">
          {/* Back + title row */}
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
            >
              <ArrowLeftIcon className="w-5 h-5 text-white" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-white font-black text-lg leading-tight">🖨️ Çıktı Merkezi</h1>
              <p className="text-indigo-200 text-xs font-medium">{totalCount} çalışma kağıdı hazır</p>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-1.5">
              <PrintIcon className="w-4 h-4 text-white" />
              <span className="text-white text-xs font-bold">PDF</span>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base select-none">🔍</span>
            <input
              type="text"
              placeholder="Etkinlik ara…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/15 text-white placeholder-indigo-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/40 transition-shadow"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-300 hover:text-white text-lg leading-none"
              >×</button>
            )}
          </div>
        </div>

        {/* Category tab strip */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 px-4 pb-3 pt-1">
          {(['Tümü', ...WORKSHEET_CATEGORIES] as const).map(cat => {
            const isAll = cat === 'Tümü';
            const active = activeCategory === cat;
            const meta = isAll ? null : CATEGORY_META[cat];
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat as any); setSearch(''); }}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-slate-50 text-slate-800 shadow'
                    : 'text-indigo-100 hover:text-white hover:bg-white/10 bg-white/5 border border-white/10'
                }`}
              >
                <span>{isAll ? '📋' : meta!.icon}</span>
                <span>{cat}</span>
                {active && (
                  <span className="bg-indigo-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    {isAll ? totalCount : WORKSHEET_REGISTRY.filter(w => w.category === cat).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <main className="flex-1 overflow-y-auto px-4 py-4 space-y-6">

        {/* Info tip */}
        <div className="space-y-3 mb-2">
          {!search && activeCategory === 'Tümü' && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-4 py-3 shadow-sm">
              <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
              <p className="text-xs text-blue-700 leading-relaxed">
                Bir kağıt seçin, sorular otomatik hazırlanır.
                Yazdır / PDF ile doğrudan yazıcıya ya da bilgisayarınıza gönderin.
              </p>
            </div>
          )}
          
          <div className="flex items-start gap-3 bg-indigo-50 border border-indigo-100 rounded-2xl px-4 py-3 shadow-sm">
            <span className="text-xl flex-shrink-0 mt-0.5">💻</span>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-indigo-800 leading-relaxed">
                <strong>Bilgisayardan Yazdırmak Daha Kolay!</strong><br />
                Çalışma kağıtlarına bilgisayarınızdan erişmek ve çok daha rahat yazıcıdan çıktı almak için <span className="font-bold font-mono bg-indigo-200/50 px-1 py-0.5 rounded select-all">ilksozumotizm.netlify.app</span> adresine girebilirsiniz.
              </p>
              <button 
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.clipboard) {
                    navigator.clipboard.writeText('https://ilksozumotizm.netlify.app');
                    alert('Bağlantı kopyalandı! Bilgisayarınıza gönderebilirsiniz.');
                  }
                }}
                className="self-start text-[10px] font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
              >
                🔗 Bağlantıyı Kopyala
              </button>
            </div>
          </div>
        </div>

        {/* Empty state */}
        {grouped.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-5xl">🔍</span>
            <p className="text-slate-500 font-semibold text-sm">"{search}" için sonuç bulunamadı</p>
            <button onClick={() => setSearch('')} className="text-indigo-500 text-sm font-bold">Temizle</button>
          </div>
        )}

        {/* Special Banner for Fine Motor */}
        {!search && activeCategory === 'Tümü' && (
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setView({ mode: 'fineMotor' })}
              className="w-full relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 shadow-md text-left transition-transform hover:scale-[1.02] active:scale-95"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 text-7xl opacity-20">✂️</div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-black text-lg">İnce Motor & Makas Becerileri</h3>
                  <p className="text-emerald-100 text-xs font-semibold mt-1">Özel Üretici: Çizgi, Makas Eğitimi ve Boyama Sayfaları</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <ArrowLeftIcon className="w-5 h-5 text-white rotate-180" />
                </div>
              </div>
            </button>
            <button
              onClick={() => setView({ mode: 'matching' })}
              className="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-md text-left transition-transform hover:scale-[1.02] active:scale-95"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 text-7xl opacity-20">👤</div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h3 className="text-white font-black text-lg">Eşleştirme Çalışmaları</h3>
                  <p className="text-blue-100 text-xs font-semibold mt-1">Gölge, Parça-Bütün ve Anne-Yavru Eşleştirme PDF'leri</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <ArrowLeftIcon className="w-5 h-5 text-white rotate-180" />
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Category sections */}
        {grouped.map(([catName, items]) => (
          <section key={catName}>
            {/* Section header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-base">{CATEGORY_META[catName as WorksheetCategory]?.icon ?? '📋'}</span>
              <h2 className="font-black text-slate-700 text-sm">{catName}</h2>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-200 rounded-full px-2 py-0.5">
                {items.length} kağıt
              </span>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-2 gap-3">
              {items.map(def => (
                <WorksheetCard key={def.id} def={def} onSelect={handleSelectWorksheet} />
              ))}
            </div>
          </section>
        ))}

        {/* Footer spacer */}
        <div className="h-6" />
      </main>
    </div>
  );
};

/* ── WorksheetCard ────────────── */
const WorksheetCard: React.FC<{ def: WorksheetDef; onSelect: (d: WorksheetDef) => void }> = ({ def, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(def)}
      className="group flex flex-col text-left rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 active:scale-95 transition-all hover:shadow-xl hover:-translate-y-1 w-full bg-white relative"
    >
      {/* Premium subtle shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

      {/* Color stripe top */}
      <div
        className="w-full pt-5 pb-4 px-4 flex items-start justify-between relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${def.color}dd 0%, ${def.color} 100%)`,
        }}
      >
        {/* Decorative background emoji */}
        <span className="absolute -right-2 -bottom-4 text-6xl opacity-20 pointer-events-none rotate-12 drop-shadow-lg filter blur-[1px]">
          {def.emoji.split('')[0]}
        </span>
        
        <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-2xl bg-white/20 shadow-inner border border-white/20 backdrop-blur-sm">
          <span className="text-2xl leading-none drop-shadow-md">{def.emoji.split('')[0]}</span>
        </div>
        
        <div
          className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-white/30 backdrop-blur-md"
          style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
        >
          <PrintIcon className="w-4 h-4 text-white drop-shadow" />
        </div>
      </div>

      {/* Content bottom */}
      <div className="flex-1 px-4 pt-3 pb-4 flex flex-col gap-1 relative z-10">
        <span className="font-extrabold text-slate-800 text-sm leading-tight line-clamp-2 pr-1">{def.title}</span>
        <span className="text-[11px] text-slate-500 font-semibold leading-relaxed line-clamp-2">{def.subtitle}</span>
        <div className="mt-3 flex items-center">
          <span
            className="text-[9px] font-black px-2.5 py-1 rounded-lg text-white shadow-sm tracking-wide"
            style={{ backgroundColor: def.color, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
          >
            {def.category}
          </span>
        </div>
      </div>
    </button>
  );
};

export default WorksheetCenterScreen;
