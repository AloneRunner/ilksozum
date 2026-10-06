import React from 'react';
import { kelimeGorseli } from '../../services/kelimeGorseli.ts';

/** Kelimenin fotoğrafı varsa onu, yoksa emojiyi gösterir. */
const KelimeResmi: React.FC<{ kelime: string; emoji: string; className?: string; emojiClassName?: string }> = ({ kelime, emoji, className, emojiClassName }) => {
  const url = kelimeGorseli(kelime);
  if (!url) return <div className={emojiClassName}>{emoji}</div>;
  return <img src={url} alt={kelime} draggable={false} className={className || 'w-40 h-40 object-contain rounded-2xl bg-white shadow'} />;
};

export default React.memo(KelimeResmi);
