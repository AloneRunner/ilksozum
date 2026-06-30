/**
 * BASARA — ders haritası. 41 dersi sıralı kart olarak gösterir; bir önceki ders
 * tamamlanmadan diğeri açılmaz (yöntem kuralı: "bir hece öğrenilmeden diğerine geçilmez").
 */
import React from 'react';
import { ActivityStats } from '../../types.ts';
import { BasaraLesson } from '../../data/basaraLessons.ts';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import CheckCircleIcon from '../icons/CheckCircleIcon.tsx';
import LockClosedIcon from '../icons/LockClosedIcon.tsx';

interface Props {
  lessons: BasaraLesson[];
  keyPrefix: string;       // ilerleme anahtarı öneki ('basara' | 'basara2')
  title: string;           // başlık ('BASARA Yöntemi' | 'BASARA 2 (Klasik)')
  activityStats: Record<string, ActivityStats>;
  onSelectLesson: (lessonId: number) => void;
  onBack: () => void;
}

export const isBasaraLessonCompleted = (stats: Record<string, ActivityStats>, keyPrefix: string, id: number): boolean =>
  (stats[`${keyPrefix}-${id}`]?.completions || 0) > 0;

// Tüm dersleri açık tut (öğretmen/veli incelemesi için). Sıralı kilidi geri getirmek
// istersen bunu false yap.
export const BASARA_UNLOCK_ALL = true;

const BasaraLessonMapScreen: React.FC<Props> = ({ lessons, keyPrefix, title, activityStats, onSelectLesson, onBack }) => {
  const completed = (id: number) => isBasaraLessonCompleted(activityStats, keyPrefix, id);
  const unlocked = (id: number) => BASARA_UNLOCK_ALL || id === 1 || completed(id - 1);

  const phase1 = lessons.filter((l) => l.phase === 1);
  const phase2 = lessons.filter((l) => l.phase === 2);
  const doneCount = lessons.filter((l) => completed(l.id)).length;

  const renderLesson = (id: number, title: string, newUnit: string) => {
    const isDone = completed(id);
    const isOpen = unlocked(id);
    const isCurrent = isOpen && !isDone;
    const badge = newUnit.replace(/\s+/g, '');
    const badgeSize = badge.length <= 2 ? 'text-2xl' : badge.length <= 3 ? 'text-lg' : 'text-sm';
    return (
      <button
        key={id}
        onClick={() => isOpen && onSelectLesson(id)}
        disabled={!isOpen}
        className={`relative flex items-center gap-3 p-3 rounded-2xl shadow-md text-left transition-all active:scale-95
          ${isDone ? 'bg-green-50 border-2 border-green-200' : isCurrent ? 'bg-white border-2 border-sky-400 ring-2 ring-sky-200' : 'bg-slate-100 border-2 border-slate-200 opacity-60 cursor-not-allowed'}`}
        aria-label={`${id}. ders: ${title}${isOpen ? '' : ' (kilitli)'}`}
      >
        <div className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center font-black ${badgeSize}
          ${isDone ? 'bg-green-200 text-green-800' : isCurrent ? 'bg-sky-500 text-white' : 'bg-slate-300 text-slate-500'}`}>
          {badge}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-slate-400">{id}. ders</div>
          <div className={`text-base font-bold truncate ${isDone ? 'text-green-800' : isCurrent ? 'text-sky-800' : 'text-slate-500'}`}>{title}</div>
        </div>
        {isDone ? (
          <CheckCircleIcon className="w-7 h-7 text-green-500 flex-shrink-0" />
        ) : !isOpen ? (
          <LockClosedIcon className="w-6 h-6 text-slate-400 flex-shrink-0" />
        ) : null}
      </button>
    );
  };

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto p-3 sm:p-4 animate-fade-in overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <button onClick={onBack} className="p-2 rounded-full bg-white/60 hover:bg-white/90 transition-colors" aria-label="Geri dön">
          <ArrowLeftIcon className="w-7 h-7 text-sky-700" />
        </button>
        <h1 className="text-2xl font-black text-sky-800">{title}</h1>
        <div className="text-sm font-bold text-sky-700 w-16 text-right">{doneCount}/{lessons.length}</div>
      </div>
      <p className="text-center text-slate-500 text-sm mb-4 flex-shrink-0">
        Heceleri oku, kelime ve cümlelere geç. Dilediğin dersten başlayabilirsin.
      </p>

      <div className="flex-grow overflow-y-auto pr-1 pb-4">
        <h2 className="text-sm font-bold text-sky-600 uppercase tracking-wide mb-2">
          {phase1.some((l) => l.tag === 'vowel') ? '1. Aşama — Ünlüler, heceler ve görme kelimeleri' : '1. Aşama — a-serisi heceler'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
          {phase1.map((l) => renderLesson(l.id, l.title, l.newUnit))}
        </div>

        {phase2.length > 0 && (
          <>
            <h2 className="text-sm font-bold text-sky-600 uppercase tracking-wide mb-2">2. Aşama — Tüm ünlülerle (ileri okuma)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {phase2.map((l) => renderLesson(l.id, l.title, l.newUnit))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BasaraLessonMapScreen;
