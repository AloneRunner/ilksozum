import React from 'react';
import { nesneUrl } from '../services/nesneGorsel.ts';
import soundImitationImages from '../services/database/soundImitationImages.ts';
import SoundImitationLightbox from './SoundImitationLightbox.tsx';
import { playNamedAudio, speak } from '../services/speechService.ts';
import { t, getCurrentLanguage } from '../i18n/index.ts';
import { useAppContext } from '../contexts/AppContext.ts';
import UnderwaterBackdrop from './ui/UnderwaterBackdrop.tsx';

interface Props {
  onBack?: () => void;
}

export default function SoundImitationScreen({ onBack }: Props) {
  const items = soundImitationImages;
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [startIndex, setStartIndex] = React.useState(0);
  const [playingId, setPlayingId] = React.useState<number | null>(null);
  const { settings } = useAppContext();
  const isUnderwater = settings.theme === 'deneme';

  const openAt = (i: number) => {
    setStartIndex(i);
    setLightboxOpen(true);
  };

  return (
    <div className="p-4 relative min-h-screen flex flex-col items-center justify-start">
      {isUnderwater && <UnderwaterBackdrop count={12} />}
      <div className="flex items-center justify-between mb-6 w-full max-w-4xl">
        <h2 className={`text-3xl font-extrabold ${isUnderwater ? 'text-cyan-200' : 'text-slate-800'}`}>{t('activities.soundImitation.title','Ses Taklit Kartları')}</h2>
        {onBack && (
          <button onClick={onBack} className={`text-base font-semibold px-3 py-1.5 rounded-lg shadow transition ${isUnderwater ? 'text-cyan-100 bg-cyan-700/60 hover:bg-cyan-700/90' : 'text-slate-700 bg-slate-200/80 hover:bg-slate-300/90'}`}>{t('common.back','Geri')}</button>
        )}
      </div>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 w-full max-w-4xl">
        {items.map((it, i) => (
          <div key={it.id} className={`relative w-full`}>
            <button key={it.id} onClick={() => openAt(i)} className={`flex flex-col items-center gap-3 rounded-2xl p-2 transition-transform hover:scale-105 focus:outline-none shadow-lg border-2 ${isUnderwater ? 'bg-white/5 border-cyan-300/10' : 'bg-white/90 border-slate-200'}`}>
            <div className="relative w-full">
              <img src={nesneUrl(it.imageUrl)} alt={it.word} className="w-full h-28 sm:h-32 object-cover rounded-lg" />
              {/* subtle border / accent */}
              <div className={`absolute inset-0 rounded-lg ring-1 ${isUnderwater ? 'ring-cyan-300/20' : 'ring-transparent'}`} />
            </div>
            <div className={`text-sm sm:text-base font-semibold text-center truncate w-full ${isUnderwater ? 'text-cyan-100' : 'text-slate-800'}`}>{
              (() => {
                const lang = getCurrentLanguage();
                const key = `label_${lang}`;
                return (it.audioKeys as any)[key] || it.audioKeys.default || it.word;
              })()
            }</div>
            </button>

            {/* small listen button (does not open lightbox) */}
            <button
              onClick={async (e) => {
                e.stopPropagation();
                const lang = getCurrentLanguage();
                const labelKey = `label_${lang}`;
                const label = (it.audioKeys as any)[labelKey] || (it.audioKeys as any).default || it.word;
                const fileKey = (it.audioKeys as any).default || label || it.word;

                setPlayingId(it.id);
                try {
                  // quick HEAD check for an audio file on the server
                  let hasFile = false;
                  try {
                    const resp = await fetch(`/audio/${fileKey}.mp3`, { method: 'HEAD' });
                    hasFile = resp.ok;
                  } catch (err) {
                    hasFile = false;
                  }

                  if (hasFile) {
                    await playNamedAudio(fileKey, { fallbackText: label });
                  } else {
                    // speak the localized onomatopoeic label for nicer sound
                    await speak(label);
                  }
                } catch (err) {
                  // swallow errors, keep UI responsive
                } finally {
                  setPlayingId(null);
                }
              }}
              aria-label="Dinle"
              className={`absolute bottom-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition shadow ${isUnderwater ? 'bg-black/30 text-cyan-100 hover:bg-black/45' : 'bg-white/90 text-slate-700 hover:bg-slate-100'}`}
            >
              {playingId === it.id ? (
                <span className="w-3 h-3 rounded-full bg-rose-400 animate-pulse" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path d="M9 4a1 1 0 00-1 1v10a1 1 0 001 1h0a1 1 0 001-1V5a1 1 0 00-1-1h0z" />
                  <path d="M12.5 6.5a3 3 0 010 7" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <SoundImitationLightbox items={items} startIndex={startIndex} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}
