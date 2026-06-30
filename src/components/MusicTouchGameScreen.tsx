import React, { useState, useRef, useCallback, useEffect } from 'react';
import { t } from '../i18n/index.ts';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';

interface MusicTouchGameScreenProps {
  onBack: () => void;
}

type SubMode = 'free' | 'song' | 'memory';
type PianoSound = 'classic' | 'soft' | 'sharp';

interface Note {
  id: string;
  frequency: number;
  name: string;
  color: string;
}

interface Song {
  id: string;
  title: string;
  notes: string[];
}

interface ActiveNote {
  oscillator: OscillatorNode;
  gainNode: GainNode;
}

const PIANO_NOTES: Note[] = [
  { id: 'C', frequency: 261.63, name: 'Do', color: '#ef4444' },
  { id: 'D', frequency: 293.66, name: 'Re', color: '#f97316' },
  { id: 'E', frequency: 329.63, name: 'Mi', color: '#eab308' },
  { id: 'F', frequency: 349.23, name: 'Fa', color: '#22c55e' },
  { id: 'G', frequency: 392.00, name: 'Sol', color: '#3b82f6' },
  { id: 'A', frequency: 440.00, name: 'La', color: '#a855f7' },
  { id: 'B', frequency: 493.88, name: 'Si', color: '#ec4899' },
];

const SONGS: Song[] = [
  { id: 'twinkle', title: '⭐ Işılda Işılda', notes: ['C', 'C', 'G', 'G', 'A', 'A', 'G', 'F', 'F', 'E', 'E', 'D', 'D', 'C'] },
  { id: 'mary', title: '🐑 Meee Kuzum', notes: ['E', 'D', 'C', 'D', 'E', 'E', 'E', 'D', 'D', 'D', 'E', 'G', 'G'] },
  { id: 'jingle', title: '🔔 Jingle Bells', notes: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'G', 'C', 'D', 'E'] },
  { id: 'odeToJoy', title: '🎶 Neşeye Övgü', notes: ['E', 'E', 'F', 'G', 'G', 'F', 'E', 'D', 'C', 'C', 'D', 'E', 'E', 'D', 'D'] },
  { id: 'scale', title: '🎵 Gam', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'B', 'A', 'G', 'F', 'E', 'D', 'C'] },
];

const SOUND_CONFIGS: Record<PianoSound, { type: OscillatorType; attack: number; label: string; emoji: string }> = {
  classic: { type: 'sine', attack: 0.02, label: 'Klasik', emoji: '🎹' },
  soft: { type: 'triangle', attack: 0.05, label: 'Yumuşak', emoji: '🌙' },
  sharp: { type: 'sawtooth', attack: 0.01, label: 'Keskin', emoji: '⚡' },
};

const MusicTouchGameScreen: React.FC<MusicTouchGameScreenProps> = ({ onBack }) => {
  // Mode State
  const [subMode, setSubMode] = useState<SubMode>('free');
  const [pianoSound, setPianoSound] = useState<PianoSound>('classic');
  
  // Song Mode State
  const [activeSong, setActiveSong] = useState<string | null>(null);
  const [currentSongNoteIndex, setCurrentSongNoteIndex] = useState(0);
  
  // Memory Mode State
  const [memorySequence, setMemorySequence] = useState<string[]>([]);
  const [userSequenceIndex, setUserSequenceIndex] = useState(0);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [memoryRound, setMemoryRound] = useState(0);
  const [activeNoteOverride, setActiveNoteOverride] = useState<string | null>(null);
  
  // General State
  const [pressedNotes, setPressedNotes] = useState<Set<string>>(new Set());
  
  // Audio
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeNotesRef = useRef<Map<string, ActiveNote>>(new Map());
  const pianoContainerRef = useRef<HTMLDivElement>(null);
  const lastGlissandoNoteRef = useRef<string | null>(null);

  // --- GET AUDIO CONTEXT ---
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // --- START NOTE (with sustain) ---
  const startNote = useCallback((noteId: string, frequency: number) => {
    // Zaten çalıyorsa tekrar başlatma
    if (activeNotesRef.current.has(noteId)) return;

    try {
      const ctx = getAudioContext();
      const config = SOUND_CONFIGS[pianoSound];
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = config.type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

      // Attack
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + config.attack);

      oscillator.start();
      
      activeNotesRef.current.set(noteId, { oscillator, gainNode });
      setPressedNotes(prev => new Set(prev).add(noteId));
    } catch (e) {
      console.error('Audio start error:', e);
    }
  }, [pianoSound, getAudioContext]);

  // --- STOP NOTE (release) ---
  const stopNote = useCallback((noteId: string) => {
    const activeNote = activeNotesRef.current.get(noteId);
    if (!activeNote) return;

    try {
      const ctx = getAudioContext();
      const { oscillator, gainNode } = activeNote;
      
      // Release (fade out)
      gainNode.gain.cancelScheduledValues(ctx.currentTime);
      gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      
      oscillator.stop(ctx.currentTime + 0.3);
      
      activeNotesRef.current.delete(noteId);
      setPressedNotes(prev => {
        const next = new Set(prev);
        next.delete(noteId);
        return next;
      });
    } catch (e) {
      console.error('Audio stop error:', e);
    }
  }, [getAudioContext]);

  // --- STOP ALL NOTES ---
  const stopAllNotes = useCallback(() => {
    activeNotesRef.current.forEach((_, noteId) => stopNote(noteId));
  }, [stopNote]);

  // --- PLAY NOTE (short, for memory/song modes) ---
  const playNote = useCallback((frequency: number, duration: number = 0.4) => {
    try {
      const ctx = getAudioContext();
      const config = SOUND_CONFIGS[pianoSound];
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = config.type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start();
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.error('Audio error:', e);
    }
  }, [pianoSound, getAudioContext]);

  const playWinSound = useCallback(() => {
    [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
      setTimeout(() => playNote(freq, 0.3), i * 100);
    });
  }, [playNote]);

  const playErrorSound = useCallback(() => {
    playNote(150, 0.3);
  }, [playNote]);

  // --- GLISSANDO (slide across keys) ---
  const getNoteFromPoint = useCallback((clientX: number, clientY: number): Note | null => {
    const container = pianoContainerRef.current;
    if (!container) return null;

    const keys = container.querySelectorAll('[data-note-id]');
    for (const key of keys) {
      const rect = key.getBoundingClientRect();
      if (clientX >= rect.left && clientX <= rect.right && 
          clientY >= rect.top && clientY <= rect.bottom) {
        const noteId = key.getAttribute('data-note-id');
        return PIANO_NOTES.find(n => n.id === noteId) || null;
      }
    }
    return null;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAllNotes();
    };
  }, [stopAllNotes]);

  // --- MEMORY GAME LOGIC ---
  const startMemoryGame = useCallback(() => {
    const startNote = PIANO_NOTES[Math.floor(Math.random() * PIANO_NOTES.length)].id;
    setMemorySequence([startNote]);
    setMemoryRound(1);
    setUserSequenceIndex(0);
    setIsComputerTurn(true);
  }, []);

  const playMemorySequence = useCallback(async () => {
    await new Promise(r => setTimeout(r, 600));

    for (let i = 0; i < memorySequence.length; i++) {
      const noteId = memorySequence[i];
      const note = PIANO_NOTES.find(n => n.id === noteId);
      
      if (note) {
        setActiveNoteOverride(noteId);
        playNote(note.frequency);
        await new Promise(r => setTimeout(r, 500));
        setActiveNoteOverride(null);
        await new Promise(r => setTimeout(r, 200));
      }
    }
    setIsComputerTurn(false);
  }, [memorySequence, playNote]);

  useEffect(() => {
    if (subMode === 'memory' && isComputerTurn && memorySequence.length > 0) {
      playMemorySequence();
    }
  }, [memorySequence, isComputerTurn, subMode, playMemorySequence]);

  // --- MODE CHANGE HANDLER ---
  const handleModeChange = (newMode: SubMode) => {
    stopAllNotes();
    setSubMode(newMode);
    setActiveSong(null);
    setCurrentSongNoteIndex(0);
    setMemorySequence([]);
    setMemoryRound(0);
    setUserSequenceIndex(0);
    setIsComputerTurn(false);
  };

  // --- NOTE PRESS HANDLER ---
  const handleNotePress = useCallback((noteId: string, frequency: number) => {
    // Memory modunda bilgisayar sırasıysa input alma
    if (subMode === 'memory' && isComputerTurn) return;

    // Serbest modda sustain ile çal (startNote/stopNote)
    if (subMode === 'free') {
      startNote(noteId, frequency);
      return;
    }

    // Diğer modlarda kısa ses çal
    playNote(frequency);
    setPressedNotes(prev => new Set(prev).add(noteId));
    setTimeout(() => {
      setPressedNotes(prev => {
        const next = new Set(prev);
        next.delete(noteId);
        return next;
      });
    }, 150);

    // 1. SONG MODE
    if (subMode === 'song' && activeSong) {
      const song = SONGS.find(s => s.id === activeSong);
      if (song) {
        const expectedNote = song.notes[currentSongNoteIndex];
        if (noteId === expectedNote) {
          if (currentSongNoteIndex === song.notes.length - 1) {
            // Şarkı tamamlandı - küçük kutlama
            playWinSound();
            setCurrentSongNoteIndex(0);
            setActiveSong(null);
          } else {
            setCurrentSongNoteIndex(prev => prev + 1);
          }
        }
      }
    }

    // 2. MEMORY MODE
    if (subMode === 'memory' && !isComputerTurn && memorySequence.length > 0) {
      const expectedNote = memorySequence[userSequenceIndex];
      
      if (noteId === expectedNote) {
        if (userSequenceIndex === memorySequence.length - 1) {
          // Tur tamamlandı
          setUserSequenceIndex(0);
          setIsComputerTurn(true);
          setMemoryRound(prev => prev + 1);
          
          // Yeni nota ekle
          const nextNote = PIANO_NOTES[Math.floor(Math.random() * PIANO_NOTES.length)].id;
          setMemorySequence(prev => [...prev, nextNote]);
        } else {
          setUserSequenceIndex(prev => prev + 1);
        }
      } else {
        // Yanlış - tekrar oynat
        playErrorSound();
        setUserSequenceIndex(0);
        setTimeout(() => {
          setIsComputerTurn(true);
        }, 500);
      }
    }
  }, [subMode, activeSong, currentSongNoteIndex, memorySequence, userSequenceIndex, isComputerTurn, playNote, startNote, playWinSound, playErrorSound]);

  // --- NOTE RELEASE HANDLER ---
  const handleNoteRelease = useCallback((noteId: string) => {
    if (subMode === 'free') {
      stopNote(noteId);
    }
  }, [subMode, stopNote]);

  // --- GLISSANDO (slide across keys) ---
  const handleGlissando = useCallback((clientX: number, clientY: number) => {
    const note = getNoteFromPoint(clientX, clientY);
    if (note && note.id !== lastGlissandoNoteRef.current) {
      lastGlissandoNoteRef.current = note.id;
      
      // Serbest modda sustain ile çal
      if (subMode === 'free') {
        // Önceki notayı durdur (glissando için kısa süre)
        activeNotesRef.current.forEach((_, noteId) => {
          if (noteId !== note.id) {
            stopNote(noteId);
          }
        });
        startNote(note.id, note.frequency);
      } else {
        // Diğer modlarda kısa ses çal ve game logic
        playNote(note.frequency);
        setPressedNotes(prev => new Set(prev).add(note.id));
        setTimeout(() => {
          setPressedNotes(prev => {
            const next = new Set(prev);
            next.delete(note.id);
            return next;
          });
        }, 150);
      }
    }
  }, [subMode, getNoteFromPoint, startNote, stopNote, playNote]);

  // --- TOUCH/MOUSE HANDLERS for glissando ---
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const note = getNoteFromPoint(e.clientX, e.clientY);
    if (note) {
      lastGlissandoNoteRef.current = note.id;
      handleNotePress(note.id, note.frequency);
    }
  }, [getNoteFromPoint, handleNotePress]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    // Sadece basılıyken glissando
    if (e.buttons === 0 && e.pointerType !== 'touch') return;
    handleGlissando(e.clientX, e.clientY);
  }, [handleGlissando]);

  const handlePointerUp = useCallback(() => {
    if (lastGlissandoNoteRef.current) {
      handleNoteRelease(lastGlissandoNoteRef.current);
      lastGlissandoNoteRef.current = null;
    }
    // Tüm notaları bırak (free modda)
    if (subMode === 'free') {
      stopAllNotes();
    }
  }, [handleNoteRelease, subMode, stopAllNotes]);

  const handlePointerLeave = useCallback(() => {
    if (subMode === 'free') {
      stopAllNotes();
    }
    lastGlissandoNoteRef.current = null;
  }, [subMode, stopAllNotes]);

  // Hangi nota vurgulanacak
  const getHighlightNote = () => {
    if (subMode === 'memory' && isComputerTurn) {
      return activeNoteOverride;
    }
    if (subMode === 'song' && activeSong) {
      const song = SONGS.find(s => s.id === activeSong);
      return song ? song.notes[currentSongNoteIndex] : null;
    }
    return null;
  };

  const highlightNote = getHighlightNote();

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex flex-col">
      {/* Yıldızlar */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between p-3 z-10">
        <button
          onClick={onBack}
          className="bg-white/90 hover:bg-white text-purple-600 rounded-full p-2.5 shadow-lg transition-all"
          style={{ touchAction: 'manipulation' }}
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>

        <h1 className="text-xl font-black text-white drop-shadow-lg">
          🎹 {t('miniGames.musicTouch.title', 'Müzik Dokun')}
        </h1>

        <div className="w-10" />
      </div>

      {/* Mode Selector Panel */}
      <div className="flex-shrink-0 mx-3 mb-2 bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg z-10">
        {/* Tabs */}
        <div className="flex justify-center gap-1 mb-3">
          <button 
            onClick={() => handleModeChange('free')}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all ${
              subMode === 'free' 
                ? 'bg-purple-500 text-white shadow-md' 
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
            style={{ touchAction: 'manipulation' }}
          >
            🎨 Serbest
          </button>
          <button 
            onClick={() => handleModeChange('song')}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all ${
              subMode === 'song' 
                ? 'bg-purple-500 text-white shadow-md' 
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
            style={{ touchAction: 'manipulation' }}
          >
            ⭐ Şarkı Öğren
          </button>
          <button 
            onClick={() => handleModeChange('memory')}
            className={`px-3 py-1.5 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all ${
              subMode === 'memory' 
                ? 'bg-purple-500 text-white shadow-md' 
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
            style={{ touchAction: 'manipulation' }}
          >
            🧠 Hafıza
          </button>
        </div>

        {/* Sub-Mode Controls */}
        <div className="min-h-[40px] flex items-center justify-center">
          {subMode === 'free' && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs">Ses:</span>
              {(Object.keys(SOUND_CONFIGS) as PianoSound[]).map((sound) => (
                <button
                  key={sound}
                  onClick={() => setPianoSound(sound)}
                  className={`px-2 py-1 rounded-lg text-xs font-bold transition-all ${
                    pianoSound === sound
                      ? 'bg-purple-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                  style={{ touchAction: 'manipulation' }}
                >
                  {SOUND_CONFIGS[sound].emoji} {SOUND_CONFIGS[sound].label}
                </button>
              ))}
            </div>
          )}

          {subMode === 'song' && (
            <div className="flex gap-1.5 flex-wrap justify-center">
              {SONGS.map(song => (
                <button
                  key={song.id}
                  onClick={() => { setActiveSong(song.id); setCurrentSongNoteIndex(0); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border-2 transition-all ${
                    activeSong === song.id 
                      ? 'bg-orange-100 border-orange-400 text-orange-600' 
                      : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                  style={{ touchAction: 'manipulation' }}
                >
                  {song.title}
                </button>
              ))}
            </div>
          )}

          {subMode === 'memory' && (
            <div className="flex items-center gap-3">
              {memorySequence.length === 0 ? (
                <button 
                  onClick={startMemoryGame}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full font-bold shadow-lg flex items-center gap-2 animate-pulse"
                  style={{ touchAction: 'manipulation' }}
                >
                  ▶️ Oyunu Başlat
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl shadow-sm">
                  <div className={`p-1.5 rounded-full transition-colors ${
                    isComputerTurn ? 'bg-blue-100 text-blue-500' : 'bg-gray-100 text-gray-300'
                  }`}>
                    👂
                  </div>
                  <div className="flex flex-col items-center px-2">
                    <span className="text-[10px] font-bold text-gray-400">TUR</span>
                    <span className="text-lg font-black text-purple-600">{memoryRound}</span>
                  </div>
                  <div className={`p-1.5 rounded-full transition-colors ${
                    !isComputerTurn ? 'bg-green-100 text-green-500' : 'bg-gray-100 text-gray-300'
                  }`}>
                    🎹
                  </div>
                  <span className="text-xs font-bold text-gray-600 ml-1">
                    {isComputerTurn ? "Dinle..." : "Sıra Sende!"}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Song Progress */}
        {subMode === 'song' && activeSong && (
          <div className="mt-2 flex gap-1 justify-center flex-wrap">
            {SONGS.find(s => s.id === activeSong)?.notes.map((noteId, index) => {
              const isPlayed = index < currentSongNoteIndex;
              const isCurrent = index === currentSongNoteIndex;
              const note = PIANO_NOTES.find(n => n.id === noteId);
              
              return (
                <div
                  key={index}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] transition-all ${
                    isPlayed
                      ? 'bg-green-500 text-white scale-90'
                      : isCurrent
                      ? 'bg-yellow-400 text-gray-800 animate-pulse scale-110 ring-2 ring-yellow-300'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {note?.name}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Piano Keys */}
      <div className="flex-1 flex items-center justify-center px-2 pb-4">
        <div 
          ref={pianoContainerRef}
          className={`
            flex gap-1 w-full max-w-lg h-full max-h-[300px] justify-center items-end p-3 rounded-3xl shadow-2xl transition-all duration-300
            ${subMode === 'memory' && isComputerTurn ? 'bg-gray-800/90' : 'bg-gray-900/80'}
          `}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerLeave}
          style={{ touchAction: 'none' }}
        >
          {PIANO_NOTES.map((note) => {
            const isTarget = highlightNote === note.id;
            const isPressed = pressedNotes.has(note.id) || activeNoteOverride === note.id;
            const isDisabled = subMode === 'memory' && isComputerTurn;

            return (
              <div
                key={note.id}
                data-note-id={note.id}
                className={`
                  relative flex-1 min-w-[36px] h-full rounded-b-2xl shadow-lg 
                  flex flex-col justify-end items-center pb-3
                  transition-all duration-100 select-none
                  ${isPressed ? 'scale-95 translate-y-1' : ''}
                  ${isTarget ? 'ring-4 ring-white ring-offset-2 ring-offset-gray-900 z-10 scale-105' : ''}
                  ${isDisabled && !isPressed ? 'opacity-40 pointer-events-none' : 'cursor-pointer'}
                `}
                style={{
                  touchAction: 'none',
                  background: `linear-gradient(to bottom, ${note.color}, ${note.color}cc)`,
                  boxShadow: isPressed 
                    ? `0 0 20px ${note.color}, 0 0 40px ${note.color}` 
                    : `0 4px 0 ${note.color}99, 0 6px 10px rgba(0,0,0,0.3)`,
                }}
              >
                {/* Note Label */}
                <span className="text-white font-black text-lg md:text-xl drop-shadow-lg pointer-events-none">
                  {note.name}
                </span>
                
                {/* Target Star */}
                {isTarget && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl animate-bounce pointer-events-none">
                    ⭐
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MusicTouchGameScreen;
