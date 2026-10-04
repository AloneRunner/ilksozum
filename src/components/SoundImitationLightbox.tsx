import React, { useEffect } from 'react';
import { nesneUrl } from '../services/nesneGorsel.ts';
import { ImageMetadata } from '../types.ts';
import { getCurrentLanguage } from '../i18n/index.ts';
import { useAppContext } from '../contexts/AppContext.ts';

interface Props {
  items: ImageMetadata[];
  startIndex: number;
  onClose: () => void;
}

export default function SoundImitationLightbox({ items, startIndex, onClose }: Props) {
  const [index, setIndex] = React.useState(startIndex);

  useEffect(() => setIndex(startIndex), [startIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') setIndex(i => Math.max(0, i - 1));
      if (e.key === 'ArrowRight') setIndex(i => Math.min(items.length - 1, i + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [items.length, onClose]);

  // Touch/swipe support
  useEffect(() => {
    let startX: number | null = null;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      if (startX == null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 60) setIndex(i => Math.max(0, i - 1));
      if (dx < -60) setIndex(i => Math.min(items.length - 1, i + 1));
      startX = null;
    };
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [items.length]);

  const { settings } = useAppContext();
  const isUnderwater = settings.theme === 'deneme';

  if (!items || items.length === 0) return null;

  const item = items[index];
  const lang = getCurrentLanguage();
  const labelKey = `label_${lang}`;
  const label = (item.audioKeys as any)[labelKey] || item.audioKeys.default || item.word;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isUnderwater ? 'bg-black/60' : 'bg-gradient-to-br from-rose-50 via-indigo-50 to-sky-50'}`}>
      <button aria-label="Kapat" onClick={onClose} className={`absolute top-4 right-4 text-2xl ${isUnderwater ? 'text-cyan-100' : 'text-slate-700'}`}>✕</button>
      <button aria-label="Önceki" onClick={() => setIndex(i => Math.max(0, i - 1))} className={`absolute left-4 top-1/2 -translate-y-1/2 text-3xl ${isUnderwater ? 'text-cyan-100' : 'text-slate-700'}`}>◀</button>
      <div className="max-w-full max-h-full flex items-center justify-center">
        <div className={`rounded-lg shadow-2xl ring-1 p-4 ${isUnderwater ? 'ring-cyan-300/30 bg-black/20' : 'ring-white/60 bg-white/10'}`}>
          <img src={nesneUrl(item.imageUrl)} alt={item.word} className="max-h-[80vh] max-w-[90vw] object-contain rounded bg-transparent" />
        </div>
      </div>
      <button aria-label="Sonraki" onClick={() => setIndex(i => Math.min(items.length - 1, i + 1))} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700 text-3xl">▶</button>
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 rounded px-3 py-1 text-lg font-semibold ${isUnderwater ? 'bg-black/40 text-cyan-100' : 'bg-white/90 text-black'}`}>
        {label}
      </div>
      <div className={`absolute bottom-4 right-4 text-sm ${isUnderwater ? 'text-cyan-100/90' : 'text-slate-700'}`}>{index + 1}/{items.length}</div>
    </div>
  );
}
