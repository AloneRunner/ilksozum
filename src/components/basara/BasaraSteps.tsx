/**
 * BASARA ders sahneleri (metin temelli — görsel gerektirmez).
 * Üç sahne: Hece (SyllableStage) → Kelime (WordStage) → Cümle (SentenceStage).
 * Her sahne `onDone` ile bir sonrakine geçer.
 *
 * TTS notu: tekrar/üst üste okumayı önlemek için her seslendirmeden önce mevcut
 * konuşma iptal edilir (`say`), ve otomatik seslendirme her sahnede yalnızca BİR kez
 * yapılır (React StrictMode'un çift effect çağrısına karşı `spokenRef`).
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BasaraLesson, BASARA_VOWELS } from '../../data/basaraLessons.ts';
import { speak, playEffect } from '../../services/speechService.ts';
import { imageData } from '../../services/database/imageData.ts';
import SpeakerIcon from '../icons/SpeakerIcon.tsx';

interface StageProps {
  lesson: BasaraLesson;
  onDone: () => void;
  isHighlightEnabled?: boolean;
}

export const HighlightedText: React.FC<{ text: string; highlights: string[]; enabled?: boolean }> = ({ text, highlights, enabled }) => {
  if (!enabled || highlights.length === 0) return <span>{text}</span>;
  
  // Create regex pattern. Need to escape regex special characters if any (usually not for simple syllables)
  const pattern = highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');
  
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => {
        const isMatch = highlights.some(h => h.toLocaleLowerCase('tr-TR') === part.toLocaleLowerCase('tr-TR'));
        if (isMatch) {
          return <span key={i} className="text-pink-600 font-black bg-pink-50 rounded px-0.5 mx-px">{part}</span>;
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};

// speak() zaten kendi içinde önceki konuşmayı iptal eder; ayrıca iptale gerek yok.
const say = (text: string) => { void speak(text); };
const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
const upper = (s: string) => s.toLocaleUpperCase('tr-TR');

const ContinueButton: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="mt-8 px-10 py-4 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white text-xl font-bold rounded-2xl shadow-lg transition-all"
  >
    {label || 'Devam'}
  </button>
);

const SyllableButton: React.FC<{ text: string; size?: 'lg' | 'md' | 'sm' }> = ({ text, size = 'md' }) => {
  const cls = size === 'lg'
    ? 'w-32 h-32 text-6xl'
    : size === 'sm'
    ? 'w-16 h-16 text-2xl'
    : 'w-20 h-20 sm:w-24 sm:h-24 text-3xl sm:text-4xl';
  return (
    <button
      onClick={() => say(text)}
      className={`${cls} bg-white rounded-2xl shadow-md border-2 border-sky-100 hover:bg-sky-50 active:scale-95 flex items-center justify-center font-black text-sky-700 transition-all`}
      aria-label={`Hece ${text}, dinlemek için dokun`}
    >
      {text}
    </button>
  );
};

/** 1. Sahne — yeni ses/hece/görme-kelimesini oku/tanı (+ küçük tanıma oyunu). */
export const SyllableStage: React.FC<StageProps> = ({ lesson, onDone }) => {
  const spokenRef = useRef(false);
  const focus = lesson.family[0];
  const isVowel = focus.length === 1 && BASARA_VOWELS.includes(focus);
  // Tanıma oyunu yalnızca tek üyeli ve kısa (ünlü ya da 2 harfli hece/al) derslerde.
  const showRecognition = lesson.phase === 1 && lesson.family.length === 1 && focus.length <= 2;

  const options = useMemo(() => {
    if (!showRecognition) return [];
    const pool = isVowel
      ? BASARA_VOWELS.filter((v) => v !== focus)
      : ['ba', 'sa', 'ra', 'ma', 'ka', 'ça', 'ta', 'na', 'ya', 'la', 'va', 'pa', 'şa', 'za', 'al'].filter((s) => s !== focus);
    return shuffle([focus, ...shuffle(pool).slice(0, 3)]);
  }, [focus, showRecognition, isVowel]);

  const [wrong, setWrong] = useState<string | null>(null);
  const [recognized, setRecognized] = useState(false);

  useEffect(() => {
    if (spokenRef.current) return;
    spokenRef.current = true;
    say(focus);
  }, []);

  const pick = (s: string) => {
    if (s === focus) {
      setRecognized(true);
      playEffect('correct');
      say(focus);
    } else {
      setWrong(s);
      playEffect('incorrect');
      setTimeout(() => setWrong(null), 700);
    }
  };

  const heading = lesson.tag === 'vowel'
    ? 'Yeni ses — oku ve dinle'
    : lesson.tag === 'sight'
    ? 'Görme kelimesi — oku ve dinle'
    : lesson.family.length > 1
    ? 'Yeni heceler — oku ve dinle'
    : 'Yeni hece — oku ve dinle';

  const bigSize = lesson.family.length === 1 ? (focus.length <= 2 ? 'lg' : 'md') : 'md';

  return (
    <div className="flex flex-col items-center justify-center flex-grow w-full">
      <h2 className="text-2xl font-bold text-sky-800 mb-1">{heading}</h2>
      <div className="flex items-center gap-1 text-sky-500 text-sm mb-5">
        <SpeakerIcon className="w-4 h-4" /> Dinlemek için dokun
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {lesson.family.map((s) => (
          <SyllableButton key={s} text={lesson.tag === 'vowel' ? upper(s) : s} size={bigSize} />
        ))}
      </div>

      {/* Faz 2: ters heceler */}
      {lesson.closed && (
        <div className="mt-5 w-full flex flex-col items-center">
          <p className="text-slate-500 text-sm mb-2">Ters heceler</p>
          <div className="grid grid-cols-4 gap-2">
            {lesson.closed.map((s) => (
              <SyllableButton key={s} text={s} size="sm" />
            ))}
          </div>
        </div>
      )}

      {/* Küçük tanıma oyunu (ünlü / kısa hece) */}
      {showRecognition && !recognized ? (
        <div className="mt-8 w-full max-w-sm flex flex-col items-center">
          <p className="text-lg text-slate-600 mb-3">Hangisi <span className="font-bold text-sky-700">{isVowel ? upper(focus) : focus}</span>?</p>
          <div className="grid grid-cols-2 gap-3 w-full">
            {options.map((s) => (
              <button
                key={s}
                onClick={() => pick(s)}
                className={`py-5 text-3xl font-bold rounded-xl shadow-md transition-all active:scale-95 ${wrong === s ? 'bg-red-200 text-red-700 animate-shake' : 'bg-white hover:bg-sky-50 text-sky-800'}`}
              >
                {isVowel ? upper(s) : s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <ContinueButton onClick={onDone} />
      )}
    </div>
  );
};

/** 2. Sahne — kelimeleri oku (metin kartları; dokun ve dinle). */
export const WordStage: React.FC<StageProps> = ({ lesson, onDone, isHighlightEnabled }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow w-full">
      <h2 className="text-2xl font-bold text-sky-800 mb-1">Kelimeleri okuyalım</h2>
      <div className="flex items-center gap-1 text-sky-500 text-sm mb-5">
        <SpeakerIcon className="w-4 h-4" /> Dokun ve dinle
      </div>
      <div className="flex flex-wrap justify-center gap-2.5 max-w-2xl">
        {lesson.words.map((w) => {
          const matchingImage = imageData.find(img => img.word.toLocaleLowerCase('tr-TR') === w.toLocaleLowerCase('tr-TR'));
          return (
            <button
              key={w}
              onClick={() => say(w)}
              className="px-5 py-3 bg-white rounded-2xl shadow-md border-2 border-sky-100 flex flex-col items-center justify-center gap-2 hover:bg-sky-50 active:scale-95 transition-all"
            >
              {matchingImage && (
                <img src={matchingImage.imageUrl} alt={w} className="w-16 h-16 object-contain" />
              )}
              <span className="text-2xl sm:text-3xl font-bold text-sky-800">
                <HighlightedText text={w} highlights={lesson.family} enabled={isHighlightEnabled} />
              </span>
            </button>
          );
        })}
      </div>
      <ContinueButton onClick={onDone} />
    </div>
  );
};

/** 3. Sahne — basit cümleleri oku (dokun ve dinle). */
export const SentenceStage: React.FC<StageProps> = ({ lesson, onDone, isHighlightEnabled }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-grow w-full">
      <h2 className="text-2xl font-bold text-sky-800 mb-1">Cümleleri okuyalım</h2>
      <div className="flex items-center gap-1 text-sky-500 text-sm mb-5">
        <SpeakerIcon className="w-4 h-4" /> Dokun ve dinle
      </div>
      <div className="flex flex-col gap-3 w-full max-w-lg">
        {lesson.sentences.map((s) => (
          <button
            key={s}
            onClick={() => say(s)}
            className="px-6 py-4 bg-white rounded-2xl shadow-md border-2 border-sky-100 text-2xl sm:text-3xl font-bold text-sky-800 hover:bg-sky-50 active:scale-95 flex items-center justify-between gap-3 text-left"
          >
            <span><HighlightedText text={s} highlights={lesson.family} enabled={isHighlightEnabled} /></span>
            <SpeakerIcon className="w-7 h-7 text-sky-400 flex-shrink-0" />
          </button>
        ))}
      </div>
      <ContinueButton onClick={onDone} />
    </div>
  );
};

/** 3.5 Sahne — hikaye okuma (dokun ve dinle). */
export const StoryStage: React.FC<StageProps> = ({ lesson, onDone, isHighlightEnabled }) => {
  if (!lesson.story) return null;
  return (
    <div className="flex flex-col items-center justify-center flex-grow w-full">
      <h2 className="text-2xl font-bold text-sky-800 mb-1">Küçük Hikaye</h2>
      <div className="flex items-center gap-1 text-sky-500 text-sm mb-5">
        <SpeakerIcon className="w-4 h-4" /> Dokun ve dinle
      </div>
      <div className="bg-white rounded-3xl shadow-xl border-4 border-sky-100 p-6 w-full max-w-lg">
        <div className="flex flex-col gap-3">
          {lesson.story.map((s, idx) => (
            <button
              key={idx}
              onClick={() => say(s)}
              className="text-left text-2xl sm:text-3xl font-medium text-slate-700 hover:text-sky-800 transition-colors py-1 px-2 rounded-lg hover:bg-sky-50 active:bg-sky-100"
            >
              <HighlightedText text={s} highlights={lesson.family} enabled={isHighlightEnabled} />
            </button>
          ))}
        </div>
      </div>
      <ContinueButton onClick={onDone} />
    </div>
  );
};

/**
 * 4. Sahne — yazma (çizgi takibi): yeni heceyi parmakla çiz.
 * Yöntem yazmayı sonraya bıraktığından adım "Geç" ile atlanabilir (zorlamaz).
 */
export const WritingStage: React.FC<StageProps> = ({ lesson, onDone }) => {
  const target = lesson.family[0]; // yeni hece (örn. "ba")
  const containerRef = useRef<HTMLDivElement>(null);
  const [strokes, setStrokes] = useState<Array<Array<{ x: number; y: number }>>>([]);
  const [current, setCurrent] = useState<Array<{ x: number; y: number }>>([]);
  const [drawing, setDrawing] = useState(false);

  const totalPoints = strokes.reduce((n, s) => n + s.length, 0) + current.length;

  // Noktayı handler içinde (currentTarget geçerliyken) hesapla; ASLA setState updater
  // içinde hesaplama — StrictMode updater'ı tekrar oynatınca currentTarget null olur.
  const pt = (e: React.PointerEvent): { x: number; y: number } => {
    const el = e.currentTarget as HTMLElement | null;
    if (!el) return { x: 0, y: 0 };
    const r = el.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const down = (e: React.PointerEvent) => { const p = pt(e); setDrawing(true); setCurrent([p]); };
  const move = (e: React.PointerEvent) => { if (!drawing) return; const p = pt(e); setCurrent((prev) => [...prev, p]); };
  const up = () => { if (drawing && current.length > 0) { setStrokes((p) => [...p, current]); setCurrent([]); } setDrawing(false); };
  const clear = () => { setStrokes([]); setCurrent([]); playEffect('softincorrect'); };
  const finish = () => { playEffect('correct'); onDone(); };

  const toPts = (s: Array<{ x: number; y: number }>) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return '';
    return s.map((p) => `${(p.x / r.width) * 500},${(p.y / r.height) * 500}`).join(' ');
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow w-full">
      <h2 className="text-2xl font-bold text-sky-800 mb-1">Heceyi yazalım</h2>
      <p className="text-slate-500 text-sm mb-4">Parmağınla <span className="font-bold text-sky-700">{target}</span> hecesinin üzerinden geç</p>

      <div
        ref={containerRef}
        className="relative bg-white rounded-3xl border-4 border-sky-100 shadow-xl touch-none"
        style={{ width: '85%', maxWidth: '420px', aspectRatio: '1' }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-black text-sky-200 select-none leading-none" style={{ fontSize: 'min(30vw, 200px)' }}>{target}</span>
        </div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
          {strokes.map((s, i) => s.length > 1 && (
            <polyline key={i} points={toPts(s)} fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          ))}
          {current.length > 1 && (
            <polyline points={toPts(current)} fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      </div>

      <div className="flex gap-3 mt-6">
        <button onClick={clear} className="px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95">Temizle</button>
        <button onClick={onDone} className="px-6 py-3 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95">Geç</button>
        <button
          onClick={finish}
          disabled={totalPoints < 20}
          className={`px-8 py-3 rounded-xl font-bold transition-all active:scale-95 ${totalPoints >= 20 ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
        >
          Bitir
        </button>
      </div>
    </div>
  );
};
