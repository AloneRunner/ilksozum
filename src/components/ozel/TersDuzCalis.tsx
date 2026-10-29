import React, { useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { TERS_DUZ_SETLER, tdSoru, tdDogru, type TersDuzSet } from '../../data/tersDuz.ts';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Ters / Düz (Gökhan Hoca, 2026-10-29): yalnız baş aşağı duran nesneler (ayı, fincan, kova, saksı, sandalye, şemsiye, şişe,
// tabure; kesik bardak, kutu, araba ters şıkta çevrilir). Sıra: Tanı → ters → düz → karışık.
export const TersDuzResim: React.FC<{ s: TersDuzSet; ters: boolean; className?: string }> = ({ s, ters, className }) => (
  <div className={`relative bg-white ${className || ''}`}>
    <img src={ters ? s.ters : s.duz} alt={`${s.ad} ${ters ? 'ters' : 'düz'}`} draggable={false}
      className={`absolute inset-0 w-full h-full ${s.cevir ? 'object-contain p-[14%]' : 'object-cover'}`}
      style={s.cevir && ters ? { transform: 'scaleY(-1)' } : undefined} />
  </div>
);

// İpucu (Gökhan Hoca): nesne yavaşça döner
export const DonmeIpucu: React.FC<{ soyle: (k: string) => void; tersYazi?: string; duzYazi?: string; dugme?: string }> = ({ soyle, tersYazi = 'ters', duzYazi = 'düz', dugme = '' }) => {
  const [ters, setTers] = useState(false);
  const cevir = (t: boolean) => { setTers(t); setTimeout(() => soyle(t ? 'ters' : 'düz'), 1600); };
  return (
    <div className="w-full text-center">
      <div className="h-40 flex items-center justify-center">
        <img src="/images/ozel/kesik/ayi.webp" alt="" draggable={false} className="h-32 object-contain" style={{ transform: `rotate(${ters ? 180 : 0}deg)`, transition: 'transform 1.6s ease-in-out' }} />
      </div>
      <div className="flex justify-center gap-8 mt-2">
        <button onClick={() => cevir(true)} className={`${dugme} bg-slate-500 text-sm px-4 ${ters ? 'ring-4 ring-slate-300' : ''}`}>{tersYazi}</button>
        <button onClick={() => cevir(false)} className={`${dugme} bg-slate-500 text-sm px-4 ${!ters ? 'ring-4 ring-slate-300' : ''}`}>{duzYazi}</button>
      </div>
    </div>
  );
};

const tur = (ters: boolean): Tur => {
  const s = TERS_DUZ_SETLER[zar(TERS_DUZ_SETLER.length)];
  return {
    soru: tdSoru(s, ters), dogruId: ters ? 't' : 'd', dogruSoz: tdDogru(s, ters),
    secenekler: karistir(['t', 'd']).map((id) => ({ id, icerik: <TersDuzResim s={s} ters={id === 't'} className="w-full aspect-square" /> })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const ornek = [TERS_DUZ_SETLER[0], TERS_DUZ_SETLER[4], TERS_DUZ_SETLER[8], TERS_DUZ_SETLER[10]];
  return (
    <OyunCercevesi baslik="Ters / Düz" emoji="🙃" onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
          {ornek.map((s) => (
            <div key={s.ad} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
              {([false, true] as const).map((t) => (
                <button key={String(t)} onClick={() => speak(tdDogru(s, t).replace(/^Evet! /, ''))} className="rounded-2xl overflow-hidden active:scale-95">
                  <TersDuzResim s={s} ters={t} className="w-full aspect-square" />
                  <span className="block text-lg font-black text-slate-800">{t ? 'ters' : 'düz'}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </OyunCercevesi>
  );
};

const TersDuzCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => (
  <AsamaliCalisma id="tersDuzCalis" baslik="Ters / Düz" emoji="🙃" onBack={onBack} onSorular={onSorular}
    aciklama="Aynı nesne bir resimde düz, ötekinde baş aşağı. Önce “ters”, sonra “düz”; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Ters ve düz, dokun ve dinle"
    asamalar={[
      { ad: 'Ters · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(true)) },
      { ad: 'Düz · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(false)) },
    ]}
    karisik={{ alt: '30 soru, ters ve düz karışık', secenek: 2, turlar: () => Array.from({ length: 30 }, () => tur(zar(2) === 0)) }} />
);

export default TersDuzCalis;
