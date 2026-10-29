import React, { useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { GUNLER, AYLAR, gunSoru, aySoru, evetAd, bugunCumle, buAyCumle } from './ozelVeri.ts';
import { SecimOyunu, Sekmeler, karistir, sikKur, konus, type Tur } from './ozelOrtak.tsx';

// Günler ve aylar (takvim, MEB programı, 2026-10-29): Tanı (dokun, dinle; bugün / bu ay işaretli) ve
// sıra sorusu ("Pazartesiden sonra hangi gün gelir?"). Ay kartlarında mevsim işareti var (Mevsimler ile bağ).
type Sekme = 'gunler' | 'gunSoru' | 'aylar' | 'aySoru';
const MEVSIM_EMOJI = ['❄️', '❄️', '🌸', '🌸', '🌸', '☀️', '☀️', '☀️', '🍂', '🍂', '🍂', '❄️'];
const bugun = () => (new Date().getDay() + 6) % 7; // pazartesi = 0
const buAy = () => new Date().getMonth();

const yaziSik = (ad: string) => <span className="px-2 py-6 sm-landscape:py-4 text-3xl sm-landscape:text-2xl font-black text-slate-800 leading-tight">{ad}</span>;

const soruTurlari = (adlar: string[], soru: (i: number) => string, n: number, adet: number) =>
  karistir(adlar.map((_, i) => i)).slice(0, adet).map((i): Tur => {
    const sonraki = (i + 1) % adlar.length;
    return {
      soru: soru(i), ustYazi: `${adlar[i]} → ?`, dogruId: String(sonraki), dogruSoz: evetAd(adlar[sonraki]),
      secenekler: sikKur(sonraki, adlar.map((_, k) => k).filter((k) => k !== i), n).map((k) => ({ id: String(k), icerik: yaziSik(adlar[k]) })),
    };
  });

const GunlerAylar: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sekme, setSekme] = useState<Sekme>('gunler');
  const ust = <Sekmeler secili={sekme} sekmeler={[['gunler', '📅 Günler'], ['gunSoru', '❓ Gün'], ['aylar', '🗓️ Aylar'], ['aySoru', '❓ Ay']]} onSec={setSekme} />;

  if (sekme === 'gunSoru') return (
    <SecimOyunu key="gun" oyunId="gunSoru" sayacAdi="Günler (Soru)" baslik="Günler" emoji="📅" onBack={onBack} ust={ust}
      secenekSayilari={[2, 3, 4]} turlariKur={(n) => soruTurlari(GUNLER, gunSoru, n, 7)} />
  );
  if (sekme === 'aySoru') return (
    <SecimOyunu key="ay" oyunId="aySoru" sayacAdi="Aylar (Soru)" baslik="Aylar" emoji="🗓️" onBack={onBack} ust={ust}
      secenekSayilari={[2, 3, 4]} turlariKur={(n) => soruTurlari(AYLAR, aySoru, n, 8)} />
  );

  const gunMu = sekme === 'gunler';
  const adlar = gunMu ? GUNLER : AYLAR;
  const simdi = gunMu ? bugun() : buAy();
  return (
    <OyunCercevesi baslik={gunMu ? 'Günler' : 'Aylar'} emoji={gunMu ? '📅' : '🗓️'} onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        {ust}
        <div className={`grid gap-2 w-full max-w-4xl mx-auto ${gunMu ? 'grid-cols-4 landscape:grid-cols-7' : 'grid-cols-3 sm:grid-cols-4 landscape:grid-cols-6'}`}>
          {adlar.map((ad, i) => (
            <button key={ad} onClick={() => speak(`${ad}.`)}
              className={`relative flex flex-col items-center justify-center gap-1 rounded-3xl py-4 shadow-lg active:scale-95 ${i === simdi ? 'bg-amber-300 ring-4 ring-amber-500' : gunMu && i >= 5 ? 'bg-rose-100' : 'bg-white'}`}>
              <span className="text-xs font-black text-slate-400">{i + 1}</span>
              {!gunMu && <span className="text-3xl">{MEVSIM_EMOJI[i]}</span>}
              <span className={`font-black text-slate-800 ${gunMu ? 'text-lg landscape:text-base lg:text-xl' : 'text-xl sm:text-2xl'}`}>{ad}</span>
              {i === simdi && <span className="text-xs font-black text-amber-800">{gunMu ? 'Bugün' : 'Bu ay'}</span>}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={() => speak(gunMu ? bugunCumle(simdi) : buAyCumle(simdi))} className="px-5 py-3 rounded-full bg-white shadow font-black text-slate-700 active:scale-95">
            🔊 {gunMu ? 'Bugün hangi gün?' : 'Bu ay hangi ay?'}
          </button>
          <button onClick={async () => { for (const ad of adlar) await konus(`${ad}.`); }} className="px-5 py-3 rounded-full bg-white shadow font-black text-slate-700 active:scale-95">
            🔊 Sırayla dinle
          </button>
        </div>
        {gunMu && <p className="text-xs text-slate-500 text-center max-w-md mx-auto">Bir haftada 7 gün var. Pembe günler hafta sonu: cumartesi ve pazar.</p>}
      </div>
    </OyunCercevesi>
  );
};

export default GunlerAylar;
