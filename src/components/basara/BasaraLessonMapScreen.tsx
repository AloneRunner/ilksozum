/**
 * BASARA — ders haritası. 41 dersi sıralı kart olarak gösterir; bir önceki ders
 * tamamlanmadan diğeri açılmaz (yöntem kuralı: "bir hece öğrenilmeden diğerine geçilmez").
 */
import React from 'react';
import { ActivityStats } from '../../types.ts';
import { BasaraLesson } from '../../data/basaraLessons.ts';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
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

  // Ders döşemesi: büyük hece, türüne göre renk (ünlü / hece / görme kelimesi), tamamlandıysa ✓, okuma metni varsa 📖
  const renderLesson = (l: BasaraLesson) => {
    const isDone = completed(l.id);
    const isOpen = unlocked(l.id);
    const badge = l.tag === 'vowel' ? l.newUnit.toLocaleUpperCase('tr-TR') : l.newUnit.replace(/\s+/g, '');
    const badgeSize = badge.length <= 2 ? 'text-4xl' : badge.length <= 3 ? 'text-3xl' : 'text-xl';
    const tur = l.tag === 'vowel' ? { ad: 'ünlü', renk: 'from-amber-300 to-orange-400' }
      : l.tag === 'sight' ? { ad: 'görme kelimesi', renk: 'from-violet-400 to-fuchsia-500' }
      : { ad: 'hece', renk: 'from-sky-400 to-blue-500' };
    return (
      <button
        key={l.id}
        onClick={() => isOpen && onSelectLesson(l.id)}
        disabled={!isOpen}
        className={`relative flex flex-col items-center justify-center aspect-square rounded-3xl shadow-md transition-all active:scale-95
          ${isDone ? 'bg-gradient-to-br from-emerald-300 to-green-500' : `bg-gradient-to-br ${tur.renk}`} ${isOpen ? '' : 'opacity-40 cursor-not-allowed'}`}
        aria-label={`${l.id}. ders: ${l.title}${isOpen ? '' : ' (kilitli)'}`}
      >
        <span className="absolute top-1.5 left-2.5 text-[11px] font-black text-white/90">{l.id}</span>
        {l.story && <span className="absolute top-1 right-2 text-sm" title="Okuma metni var" aria-label="okuma metni var">📖</span>}
        <span className={`font-black text-white drop-shadow ${badgeSize}`}>{badge}</span>
        <span className="mt-0.5 text-[10px] font-bold text-white/90">{isDone ? '✓ tamam' : tur.ad}</span>
        {!isOpen && <LockClosedIcon className="absolute bottom-2 right-2 w-4 h-4 text-white" />}
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
        {phase1.some((l) => l.tag === 'vowel') && (
          <>
            <h2 className="text-sm font-black text-orange-600 mb-2">🅰️ Ünlüler</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 landscape:grid-cols-8 gap-2.5 mb-5">
              {phase1.filter((l) => l.tag === 'vowel').map(renderLesson)}
            </div>
          </>
        )}
        <h2 className="text-sm font-black text-sky-700 mb-2">
          {phase1.some((l) => l.tag === 'vowel') ? '📘 Heceler ve görme kelimeleri' : '📘 a-serisi heceler'}
        </h2>
        <div className="grid grid-cols-4 sm:grid-cols-6 landscape:grid-cols-8 gap-2.5 mb-6">
          {phase1.filter((l) => l.tag !== 'vowel').map(renderLesson)}
        </div>

        {phase2.length > 0 && (
          <>
            <h2 className="text-sm font-bold text-sky-600 uppercase tracking-wide mb-2">2. Aşama — Tüm ünlülerle (ileri okuma)</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 landscape:grid-cols-8 gap-2.5">
              {phase2.map(renderLesson)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BasaraLessonMapScreen;
