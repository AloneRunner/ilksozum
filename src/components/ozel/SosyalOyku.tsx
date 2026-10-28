import React, { useEffect, useState } from 'react';
import { OyunCercevesi, Kutlama } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { etkinlikSay } from '../../services/sayac.ts';
import { OYKULER, type Oyku } from './ozelVeri.ts';
import { SecimKarti, konus } from './ozelOrtak.tsx';

// Sosyal öyküler: berber, doktor, sıra bekleme, market, selamlaşma. Sayfa açılınca cümle okunur; geçiş çocuğun elinde.
const SosyalOyku: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [oyku, setOyku] = useState<Oyku | null>(null);
  const [sayfa, setSayfa] = useState(0);
  const [kutla, setKutla] = useState(false);
  useEffect(() => { etkinlikSay('Sosyal Öyküler', 'acildi'); }, []);
  useEffect(() => { if (oyku) speak(oyku.sayfalar[sayfa].yazi); }, [oyku, sayfa]);

  if (!oyku) return (
    <OyunCercevesi baslik="Sosyal Öyküler" emoji="📖" onBack={onBack} yonerge="Bir öykü seç.">
      <div className="absolute inset-0 overflow-y-auto px-3 pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 landscape:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {OYKULER.map(o => <SecimKarti key={o.id} url={o.sayfalar[0].url} emoji={o.emoji} ad={o.ad} onClick={() => { setSayfa(0); setOyku(o); }} />)}
        </div>
        <p className="mt-4 text-xs text-slate-500 text-center max-w-md mx-auto">Öyküyü yeni bir duruma girmeden önce (berbere, doktora gitmeden) birlikte birkaç kez okuyun.</p>
      </div>
    </OyunCercevesi>
  );

  const s = oyku.sayfalar[sayfa], son = sayfa === oyku.sayfalar.length - 1;
  const bitir = async () => { setKutla(true); etkinlikSay('Sosyal Öyküler', 'bitti'); await konus('Öykü bitti. Aferin!'); setKutla(false); setOyku(null); };
  return (
    <OyunCercevesi baslik={oyku.ad} emoji={oyku.emoji} onBack={() => setOyku(null)} adim={sayfa + 1} toplamAdim={oyku.sayfalar.length}>
      <div className="absolute inset-0 flex flex-col landscape:flex-row items-center justify-center gap-4 px-3 pb-3 overflow-y-auto">
        <img key={s.url} src={s.url} alt="" draggable={false} className="shrink-0 w-[min(100%,50vh)] sm-landscape:w-[min(46vw,66vh)] lg:w-[min(100%,58vh)] aspect-square object-cover rounded-3xl shadow-xl bg-white" style={{ animation: 'ok-yildiz .35s ease-out both' }} />
        <div className="flex flex-col items-center gap-4 max-w-md">
          <button onClick={() => speak(s.yazi)} className="text-2xl sm-landscape:text-xl lg:text-3xl font-black text-slate-800 text-center leading-snug active:scale-95">{s.yazi} <span className="text-xl">🔊</span></button>
          <div className="flex gap-3 items-center">
            <button onClick={() => setSayfa(sayfa - 1)} disabled={sayfa === 0} className="px-5 py-4 rounded-3xl bg-white shadow text-2xl font-black disabled:opacity-30 active:scale-95">◀</button>
            {son
              ? <button onClick={() => void bitir()} className="px-7 py-4 rounded-3xl bg-emerald-500 text-white shadow-lg text-2xl font-black active:scale-95">Bitti ⭐</button>
              : <button onClick={() => setSayfa(sayfa + 1)} className="px-7 py-4 rounded-3xl bg-sky-500 text-white shadow-lg text-2xl font-black active:scale-95">▶</button>}
          </div>
        </div>
      </div>
      <Kutlama acik={kutla} />
    </OyunCercevesi>
  );
};

export default SosyalOyku;
