import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, OyunSonu } from '../oyunKiti/OyunKiti.tsx';
import { speak, playEffect } from '../../services/speechService.ts';
import { etkinlikSay, basariSay } from '../../services/sayac.ts';
import { KEDILER } from './ozelVeri.ts';
import { karistir, konus, bekle } from './ozelOrtak.tsx';

// Kediyi Bul (şekil-zemin): kalabalık sahnede saklanan kediye dokun. Bulununca yeri söylenir
// ("Kedi masanın altında.") — altında/üstünde/içinde/arkasında kavramlarını da pekiştirir.
// Kutlama yıldızı kullanılmaz: kediyi örterdi. Yanlış dokunuşta ceza yok; 20 sn bulunamazsa kedinin yeri yanıp söner.
const IPUCU_SN = 20;

const KediyiBul: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [oyun, setOyun] = useState(0);
  const sira = useMemo(() => karistir(KEDILER), [oyun]); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [buldu, setBuldu] = useState(false);
  const [ipucu, setIpucu] = useState(false);
  const [bitti, setBitti] = useState(false);
  const yardim = useRef(0);
  const k = sira[i];
  const yonerge = 'Kedi nerede? Bul ve dokun.';

  useEffect(() => { etkinlikSay('Kediyi Bul', 'acildi'); }, []);
  useEffect(() => {
    setBuldu(false); setIpucu(false);
    const z1 = setTimeout(() => speak(yonerge), 400);
    const z2 = setTimeout(() => { setIpucu(true); yardim.current++; }, IPUCU_SN * 1000);
    return () => { clearTimeout(z1); clearTimeout(z2); };
  }, [i, oyun]);

  const dokun = async (e: React.PointerEvent<HTMLDivElement>) => {
    if (buldu || bitti) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    if (Math.hypot(x - k.x, y - k.y) > k.r + 0.05) return;
    setBuldu(true); setIpucu(false);
    void playEffect('correct', { volume: 0.6 }); await bekle(700);
    await konus(`Buldun! ${k.yer}`);
    if (i + 1 < sira.length) { setI(i + 1); return; }
    etkinlikSay('Kediyi Bul', 'bitti'); basariSay('Kediyi Bul', sira.length - Math.min(sira.length, yardim.current), sira.length);
    setBitti(true);
  };

  return (
    <OyunCercevesi baslik="Kediyi Bul" emoji="🐱" onBack={onBack} adim={i} toplamAdim={sira.length} yonerge={yonerge}>
      <div className="absolute inset-0 flex items-center justify-center px-3 pb-3">
        <div className="relative w-full max-w-[min(100%,62vh)] sm-landscape:max-w-[min(100%,72vh)] aspect-square rounded-3xl overflow-hidden shadow-xl bg-white touch-manipulation select-none" onPointerDown={dokun}>
          <img key={k.url} src={k.url} alt="Saklanan kedi" draggable={false} className="w-full h-full object-cover pointer-events-none" />
          {(buldu || ipucu) && (
            <span className={`absolute rounded-full border-[6px] pointer-events-none ${buldu ? 'border-emerald-500' : 'border-amber-400 border-dashed bg-amber-200/30 animate-pulse'}`}
              style={{ left: `${(k.x - k.r) * 100}%`, top: `${(k.y - k.r) * 100}%`, width: `${k.r * 200}%`, height: `${k.r * 200}%`, ...(buldu ? { animation: 'ok-yildiz .4s ease-out both' } : {}) }} />
          )}
        </div>
      </div>
      {bitti && <OyunSonu onTekrar={() => { setBitti(false); setI(0); yardim.current = 0; setOyun(o => o + 1); }} onBack={onBack} />}
    </OyunCercevesi>
  );
};

export default KediyiBul;
