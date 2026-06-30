/**
 * BASARA — tek ders akışı. Dersi sahnelere ayırır (Hece → Kelime → Cümle) ve
 * sırayla yürütür; son sahne bitince `onComplete` çağrılır (ders tamamlanır).
 */
import React, { useEffect, useMemo, useState } from 'react';
import { BasaraLesson } from '../../data/basaraLessons.ts';
import { SyllableStage, WordStage, SentenceStage, StoryStage, WritingStage } from './BasaraSteps.tsx';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import { playEffect, cancelSpeech } from '../../services/speechService.ts';

interface Props {
  lessons: BasaraLesson[];
  lessonId: number;
  onExit: () => void;
  onComplete: (lessonId: number) => void;
  isHighlightEnabled?: boolean;
}

type Stage = 'syllable' | 'words' | 'sentences' | 'story' | 'writing';

const BasaraLessonScreen: React.FC<Props> = ({ lessons, lessonId, onExit, onComplete, isHighlightEnabled }) => {
  const lesson = lessons.find((l) => l.id === lessonId);
  const [index, setIndex] = useState(0);

  const stages = useMemo<Stage[]>(() => {
    if (!lesson) return [];
    const s: Stage[] = ['syllable'];
    if (lesson.words.length > 0) s.push('words');
    if (lesson.sentences.length > 0) s.push('sentences');
    if (lesson.story && lesson.story.length > 0) s.push('story');
    s.push('writing'); // yazma (çizgi takibi) — atlanabilir
    return s;
  }, [lessonId]);

  useEffect(() => { setIndex(0); }, [lessonId]);
  // Ekrandan çıkarken seslendirmeyi durdur
  useEffect(() => () => { try { cancelSpeech(); } catch { /* yok say */ } }, []);

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <p className="text-slate-600">Ders bulunamadı.</p>
        <button onClick={onExit} className="px-6 py-3 bg-sky-600 text-white rounded-xl font-bold">Geri</button>
      </div>
    );
  }

  const total = stages.length;
  const stage = stages[index];

  const advance = () => {
    if (index + 1 < total) {
      setIndex(index + 1);
    } else {
      playEffect('finish');
      onComplete(lesson.id);
    }
  };

  return (
    <div className="flex flex-col h-full w-full max-w-3xl mx-auto p-3 sm:p-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => { try { cancelSpeech(); } catch { /* yok say */ } onExit(); }} className="p-2 rounded-full bg-white/60 hover:bg-white/90 transition-colors" aria-label="Derslere dön">
          <ArrowLeftIcon className="w-7 h-7 text-sky-700" />
        </button>
        <h1 className="text-xl sm:text-2xl font-black text-sky-800">{lesson.id}. ders — {lesson.newUnit}</h1>
        <div className="text-sm font-bold text-sky-700 w-16 text-right">{index + 1} / {total}</div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2.5 bg-sky-100 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-sky-500 transition-all duration-300" style={{ width: `${(index / total) * 100}%` }} />
      </div>

      {/* Stage content */}
      <div className="flex-grow flex flex-col items-center justify-center w-full overflow-y-auto">
        {stage === 'syllable' && <SyllableStage key={`s-${index}`} lesson={lesson} onDone={advance} isHighlightEnabled={isHighlightEnabled} />}
        {stage === 'words' && <WordStage key={`w-${index}`} lesson={lesson} onDone={advance} isHighlightEnabled={isHighlightEnabled} />}
        {stage === 'sentences' && <SentenceStage key={`t-${index}`} lesson={lesson} onDone={advance} isHighlightEnabled={isHighlightEnabled} />}
        {stage === 'story' && <StoryStage key={`st-${index}`} lesson={lesson} onDone={advance} isHighlightEnabled={isHighlightEnabled} />}
        {stage === 'writing' && <WritingStage key={`x-${index}`} lesson={lesson} onDone={advance} isHighlightEnabled={isHighlightEnabled} />}
      </div>
    </div>
  );
};

export default BasaraLessonScreen;
