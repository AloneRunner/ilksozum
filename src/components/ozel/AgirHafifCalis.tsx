import React, { useEffect, useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import Terazi from './Terazi.tsx';
import { karistir, zar, bekle, konus, type Tur } from './ozelOrtak.tsx';

// Ağır / Hafif (Gökhan Hoca, 2026-10-29): "soyut kalıyor; terazi olsun". Tanı'da terazi animasyonu (karpuz–çilek, tüy–taş…):
// iki nesne kefelere konur, terazi ağır tarafa iner. Sorularda "⚖️ Teraziye koy" ipucu (basılırsa ilk deneme sayılmaz).
// Fil–kelebek teraziye konmayacağı için alınmadı. Sıra: Tanı → yalnız "ağır" → yalnız "hafif" → karışık.
interface Nesne { ad: string; url: string }
interface Cift { agir: Nesne; hafif: Nesne; agirCumle: string; hafifCumle: string }
const n = (ad: string, id: number): Nesne => ({ ad, url: `/images/${id}.webp` });
const ilk = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);
const cift = (a: Nesne, h: Nesne): Cift => ({ agir: a, hafif: h, agirCumle: `${ilk(a.ad)} ağırdır.`, hafifCumle: `${ilk(h.ad)} hafiftir.` });
const CIFTLER: Cift[] = [
  cift(n('karpuz', 6209), n('çilek', 6210)), cift(n('taş', 6211), n('tüy', 6212)), cift(n('balkabağı', 6201), n('mandalina', 6202)),
  cift(n('bowling topu', 6203), n('plaj topu', 6204)), cift(n('dambıl', 6205), n('balon', 6206)), cift(n('kitaplar', 6213), n('kâğıt', 6214)),
  cift(n('su dolu kova', 6215), n('boş kova', 6216)), cift(n('tuğla', 6217), n('sünger', 6218)), cift(n('valiz', 6219), n('çanta', 6220)),
];

// Soru ipucu: düğmeye basılınca iki nesne (şıklarla aynı sırada) teraziye konur
const TeraziIpucu: React.FC<{ sol: Nesne; sag: Nesne; solAgir: boolean; kullan: () => void }> = ({ sol, sag, solAgir, kullan }) => {
  const [acik, setAcik] = useState(false);
  if (!acik) return (
    <button onClick={() => { setAcik(true); kullan(); }} className="rounded-full bg-white px-5 py-2 text-lg font-black text-slate-700 shadow active:scale-95">⚖️ Teraziye koy</button>
  );
  return <Terazi sol={sol.url} sag={sag.url} egim={solAgir ? -1 : 1} className="w-[min(80vw,46vh)] h-auto" />;
};

const tur = (agir: boolean): Tur => {
  const c = CIFTLER[zar(CIFTLER.length)];
  const [sol, sag] = karistir([c.agir, c.hafif]);
  return {
    soru: agir ? 'Ağır olan hangisi?' : 'Hafif olan hangisi?', dogruId: agir ? c.agir.ad : c.hafif.ad,
    dogruSoz: `Evet! ${agir ? c.agirCumle : c.hafifCumle}`,
    sahne: (kullan) => <TeraziIpucu sol={sol} sag={sag} solAgir={sol === c.agir} kullan={kullan} />,
    secenekler: [sol, sag].map((x) => ({ id: x.ad, icerik: <span className="relative block w-full aspect-square bg-white"><img src={x.url} alt="" draggable={false} className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] object-contain" /></span> })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);

// Tanı: terazi animasyonu. Açılınca karpuz–çilek kendiliğinden konur; başka çift seçilebilir.
const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [i, setI] = useState(0);
  const [kondu, setKondu] = useState(false);
  const [tekrar, setTekrar] = useState(0);
  const c = CIFTLER[i];
  useEffect(() => {
    let iptal = false;
    setKondu(false);
    (async () => {
      await bekle(600); if (iptal) return; setKondu(true);
      await bekle(2100); if (iptal) return;
      await konus(c.agirCumle); if (iptal) return; await konus(c.hafifCumle);
    })();
    return () => { iptal = true; };
  }, [i, tekrar]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <OyunCercevesi baslik="Ağır / Hafif" emoji="⚖️" onBack={onBack} yonerge="Teraziyi izle. Ağır olan aşağı iner.">
      <div className="absolute inset-0 flex flex-col items-center gap-3 px-3 pb-3 overflow-y-auto">
        <div className="flex w-full max-w-3xl items-center justify-center gap-3">
          <img src={c.agir.url} alt="" className={`w-[18vh] max-w-[22vw] aspect-square object-contain rounded-2xl bg-white shadow transition-opacity ${kondu ? 'opacity-30' : ''}`} />
          <Terazi sol={kondu ? c.agir.url : undefined} sag={kondu ? c.hafif.url : undefined} egim={kondu ? -1 : 0} className="w-[min(60vw,52vh)] h-auto" />
          <img src={c.hafif.url} alt="" className={`w-[18vh] max-w-[22vw] aspect-square object-contain rounded-2xl bg-white shadow transition-opacity ${kondu ? 'opacity-30' : ''}`} />
        </div>
        <div className="flex gap-6 text-2xl font-black">
          <span className="text-slate-800">{c.agir.ad}: ağır</span><span className="text-slate-500">{c.hafif.ad}: hafif</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
          {CIFTLER.map((x, k) => (
            <button key={k} onClick={() => setI(k)} className={`rounded-full px-3 py-1.5 text-sm font-bold shadow ${k === i ? 'bg-amber-400 text-white' : 'bg-white text-slate-600'}`}>{x.agir.ad} – {x.hafif.ad}</button>
          ))}
        </div>
        <button onClick={() => setTekrar((t) => t + 1)} className="rounded-full bg-white px-5 py-2 font-black text-slate-700 shadow active:scale-95">🔁 Tekrar izle</button>
        <p className="text-xs text-slate-500 text-center max-w-md">Evde de deneyin: bir elinize ağır, bir elinize hafif bir şey alın; ağır olan eliniz aşağı iner. Mutfak terazisiyle de gösterebilirsiniz.</p>
      </div>
    </OyunCercevesi>
  );
};

const AgirHafifCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => (
  <AsamaliCalisma id="agirHafifCalis" baslik="Ağır / Hafif" emoji="⚖️" onBack={onBack} onSorular={onSorular}
    aciklama="Önce terazinin nasıl çalıştığını izleyin: ağır olan aşağı iner. Sorularda takılırsa “Teraziye koy” düğmesi yardım eder. Önce “ağır”, sonra “hafif”; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Terazi: karpuz–çilek, taş–tüy… ağır olan aşağı iner"
    asamalar={[
      { ad: 'Ağır · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(true)) },
      { ad: 'Hafif · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(false)) },
    ]}
    karisik={{ alt: '30 soru, ağır ve hafif karışık', secenek: 2, turlar: () => Array.from({ length: 30 }, () => tur(zar(2) === 0)) }} />
);

export default AgirHafifCalis;
