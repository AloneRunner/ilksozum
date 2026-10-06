import React, { useEffect, useRef } from 'react';

interface AmbientSoundProps {
  theme: string;
  isUnderwaterMusicEnabled: boolean;
  isMuted: boolean;
  volume?: number;
}

const AmbientSound: React.FC<AmbientSoundProps> = ({ theme, isUnderwaterMusicEnabled, isMuted, volume = 0.5 }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const shouldPlay = theme === 'deneme' && isUnderwaterMusicEnabled && !isMuted;

    if (shouldPlay) {
      // Müzik çalmalı
      if (audio.src !== window.location.origin + '/muzik/okyonus.mp3') {
        audio.src = '/muzik/okyonus.mp3';
        audio.load(); // Dosyayı yükle
      }
      audio.volume = volume;
      audio.loop = true;

      // Kullanıcı etkileşimi sonrası çal
      const playMusic = () => {
        audio.play().catch(() => {
          // Otomatik oynatma engellendi, kullanıcı etkileşimi bekle
        });
      };

      // İlk kullanıcı etkileşiminde çal
      document.addEventListener('click', playMusic);
      document.addEventListener('touchstart', playMusic);

      // Hemen çalmayı dene (bazı tarayıcılarda çalışır)
      setTimeout(() => {
        audio.play().catch(() => {
          // Otomatik oynatma engellendi, kullanıcı etkileşimi bekle
        });
      }, 1000);

      return () => {
        document.removeEventListener('click', playMusic);
        document.removeEventListener('touchstart', playMusic);
      };
    } else {
      // Müzik durmalı
      audio.pause();
      audio.currentTime = 0;
    }
  }, [theme, isUnderwaterMusicEnabled, isMuted, volume]);

  return (
    <audio
      ref={audioRef}
      preload="auto"
    />
  );
};

export default AmbientSound;