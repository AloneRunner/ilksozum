import React, { useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { PARALAR, paraSoru, DAHA_COK_SORU, dahaCokDogru, type Para } from './ozelVeri.ts';
import { SecimOyunu, Sekmeler, karistir, sikKur, type Tur } from './ozelOrtak.tsx';

// Paralarımız (Kaan, 2026-10-29; MEB programı "para tanıma"): Tanı, "Hangisi on lira?", "Hangisi daha çok?".
// Şıklar aynı türden: banknotla banknot, madeni parayla madeni para (boyut farkı ipucu olmasın).
const KAGIT = PARALAR.filter((p) => p.kagit);
const MADENI = PARALAR.filter((p) => !p.kagit);

const ParaResmi: React.FC<{ p: Para }> = ({ p }) => (
  <img src={p.url} alt="" draggable={false} className={p.kagit ? 'w-full aspect-[2/1] object-contain p-2' : 'w-full aspect-square object-contain p-3'} />
);

const Paralar: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sekme, setSekme] = useState<'tani' | 'soru' | 'cok'>('tani');
  const ust = <Sekmeler secili={sekme} sekmeler={[['tani', '👀 Tanı'], ['soru', '❓ Hangisi?'], ['cok', '⚖️ Daha çok']]} onSec={setSekme} />;

  if (sekme === 'soru') return (
    <SecimOyunu key="soru" oyunId="paraSoru" sayacAdi="Paralarımız" baslik="Paralarımız" emoji="💰" onBack={onBack} ust={ust}
      secenekSayilari={[2, 3, 4]}
      turlariKur={(n) => karistir(PARALAR).slice(0, 8).map((p): Tur => ({
        soru: paraSoru(p), genis: p.kagit, dogruId: p.id, dogruSoz: `Evet, ${p.ad.toLocaleLowerCase('tr-TR')}.`,
        secenekler: sikKur(p, p.kagit ? KAGIT : MADENI, Math.min(n, 3)).map((x) => ({ id: x.id, icerik: <ParaResmi p={x} /> })),
      }))} />
  );
  if (sekme === 'cok') return (
    <SecimOyunu key="cok" oyunId="paraCok" sayacAdi="Paralarımız (Daha çok)" baslik="Paralarımız" emoji="💰" onBack={onBack} ust={ust}
      secenekSayilari={[2]}
      turlariKur={() => Array.from({ length: 8 }, (): Tur => {
        const [a, b] = karistir(KAGIT);
        const cok = a.kurus > b.kurus ? a : b;
        return { soru: DAHA_COK_SORU, genis: true, dogruId: cok.id, dogruSoz: dahaCokDogru(cok), secenekler: [a, b].map((x) => ({ id: x.id, icerik: <ParaResmi p={x} /> })) };
      })} />
  );

  const kart = (p: Para) => (
    <button key={p.id} onClick={() => speak(`${p.ad}.`)} className="rounded-3xl bg-white shadow-lg overflow-hidden active:scale-95">
      <ParaResmi p={p} />
      <span className="block pb-2 text-lg font-black text-slate-800">{p.ad}</span>
    </button>
  );
  return (
    <OyunCercevesi baslik="Paralarımız" emoji="💰" onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        {ust}
        <div className="text-lg font-black text-slate-700 max-w-4xl w-full mx-auto">Kâğıt paralar</div>
        <div className="grid grid-cols-2 landscape:grid-cols-3 gap-3 w-full max-w-4xl mx-auto">{KAGIT.map(kart)}</div>
        <div className="text-lg font-black text-slate-700 max-w-4xl w-full mx-auto">Madeni paralar</div>
        <div className="grid grid-cols-3 landscape:grid-cols-5 gap-3 w-full max-w-4xl mx-auto">{MADENI.map(kart)}</div>
        <p className="text-xs text-slate-500 text-center max-w-md mx-auto">Gerçek parayla da çalışın: önce iki parayı (ör. 5 ve 10 lira) masaya koyup "Hangisi on lira?" diye sorun.</p>
      </div>
    </OyunCercevesi>
  );
};

export default Paralar;
