import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi, Kutlama, OyunSonu, useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { OBJECT_CATEGORIES } from '../../constants.ts';
import { kategoriOgeleri } from '../sozluk/KelimeKitabi.tsx';
import { speak, playEffect } from '../../services/speechService.ts';
import { etkinlikSay, basariSay } from '../../services/sayac.ts';
import { YONERGE_NESNELER, dokunCumle, onceCumle, sonraCumle } from './ozelVeri.ts';
import { SecimOyunu, Sekmeler, karistir, sikKur, bekle, konus, type Tur } from './ozelOrtak.tsx';

// Yönerge takibi (MEB otizm programı, 2026-10-29): önce tek adım "Topa dokun.", sonra iki adım
// "Önce elmaya dokun. Sonra topa dokun." İki adımda sıra önemli: yanlış resim sallanır, 2 yanlıştan sonra doğrusu parlar.
interface Nesne { kelime: string; yonelme: string; url: string }
const TUR_SAYISI = 8;

let onbellek: Nesne[] | null = null;
const nesneler = (): Nesne[] => {
  if (onbellek) return onbellek;
  const resim = new Map<string, string>();
  for (const k of OBJECT_CATEGORIES) if (!k.disabled) for (const o of kategoriOgeleri(k.id)) if (!resim.has(o.kelime)) resim.set(o.kelime, o.url);
  onbellek = YONERGE_NESNELER.filter(([k]) => resim.has(k)).map(([kelime, yonelme]) => ({ kelime, yonelme, url: resim.get(kelime)! }));
  return onbellek;
};

const IkiAdim: React.FC<{ onBack: () => void; ust: React.ReactNode }> = ({ onBack, ust }) => {
  const liste = useMemo(nesneler, []);
  const { seviye, basari, zorlandi } = useSeviye('yonergeIki', 1);
  const [oyun, setOyun] = useState(0);
  const turlar = useMemo(() => Array.from({ length: TUR_SAYISI }, () => {
    const resimler = karistir(liste).slice(0, seviye === 0 ? 3 : 4);
    return { resimler, hedef: karistir(resimler).slice(0, 2) };
  }), [oyun]); // eslint-disable-line react-hooks/exhaustive-deps
  const [i, setI] = useState(0);
  const [adim, setAdim] = useState(0);
  const [yanlis, setYanlis] = useState(0);
  const [sallanan, setSallanan] = useState<string | null>(null);
  const [kilit, setKilit] = useState(false);
  const [kutla, setKutla] = useState(false);
  const [bitti, setBitti] = useState(false);
  const hatasiz = useRef(true);
  const dogrular = useRef(0);
  const tur = turlar[i];
  const yonerge = `${onceCumle(tur.hedef[0].yonelme)} ${sonraCumle(tur.hedef[1].yonelme)}`;

  useEffect(() => { etkinlikSay('Yönerge Takibi (İki adım)', 'acildi'); }, []);
  useEffect(() => {
    if (bitti) return;
    setAdim(0); setYanlis(0); setSallanan(null); setKilit(false); hatasiz.current = true;
    const z = setTimeout(() => speak(yonerge), 350);
    return () => clearTimeout(z);
  }, [i, oyun]); // eslint-disable-line react-hooks/exhaustive-deps

  const sec = async (n: Nesne) => {
    if (kilit || tur.hedef.slice(0, adim).includes(n)) return;
    if (n !== tur.hedef[adim]) {
      hatasiz.current = false; setYanlis(y => y + 1);
      setSallanan(n.kelime); void playEffect('softincorrect', { volume: 0.4 });
      setTimeout(() => setSallanan(null), 700);
      return;
    }
    if (adim === 0) { void playEffect('correct', { volume: 0.5 }); setAdim(1); setYanlis(0); return; }
    setAdim(2); setKilit(true);
    if (hatasiz.current) { dogrular.current++; basari(); } else zorlandi();
    setKutla(true); await bekle(700);
    await konus('Aferin!');
    setKutla(false);
    if (i + 1 < turlar.length) { setI(i + 1); return; }
    etkinlikSay('Yönerge Takibi (İki adım)', 'bitti'); basariSay('Yönerge Takibi (İki adım)', dogrular.current, turlar.length);
    setBitti(true);
  };
  const tekrar = () => { setBitti(false); setI(0); dogrular.current = 0; setOyun(o => o + 1); };

  return (
    <OyunCercevesi baslik="Yönerge Takibi" emoji="👆" onBack={onBack} adim={i} toplamAdim={turlar.length} yonerge={yonerge}>
      <div className="absolute inset-0 flex flex-col items-center gap-3 px-3 pb-3 overflow-y-auto">
        {ust}
        <div className="flex-1 w-full flex items-center justify-center">
          <div className={`grid gap-3 w-full ${tur.resimler.length === 3 ? 'grid-cols-3' : 'grid-cols-2 landscape:grid-cols-4'}`}
            style={{ maxWidth: `min(48rem, ${tur.resimler.length * 42}vh, 100%)` }}>
            {tur.resimler.map(n => {
              const sira = tur.hedef.indexOf(n);
              const yapildi = sira >= 0 && sira < adim;
              const parla = yanlis >= 2 && n === tur.hedef[adim];
              return (
                <button key={n.kelime} onClick={() => void sec(n)}
                  className={`relative rounded-3xl bg-white shadow-lg overflow-hidden transition-all active:scale-95 ${yapildi ? 'ring-8 ring-emerald-400' : ''} ${parla ? 'ring-8 ring-amber-300 animate-pulse' : ''} ${sallanan === n.kelime ? 'ok-sallan ring-4 ring-rose-300' : ''}`}>
                  <img src={n.url} alt="" draggable={false} className="w-full aspect-square object-cover" />
                  {yapildi && <span className="absolute left-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-2xl font-black text-white shadow">{sira + 1}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <Kutlama acik={kutla} />
      {bitti && <OyunSonu onTekrar={tekrar} onBack={onBack} />}
    </OyunCercevesi>
  );
};

const YonergeTakibi: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sekme, setSekme] = useState<'tek' | 'iki'>('tek');
  const liste = useMemo(nesneler, []);
  const ust = <Sekmeler secili={sekme} sekmeler={[['tek', '1️⃣ Tek adım'], ['iki', '2️⃣ İki adım']]} onSec={setSekme} />;
  if (sekme === 'iki') return <IkiAdim key="iki" onBack={onBack} ust={ust} />;
  return (
    <SecimOyunu key="tek" oyunId="yonergeTek" sayacAdi="Yönerge Takibi" baslik="Yönerge Takibi" emoji="👆" onBack={onBack} ust={ust}
      secenekSayilari={[2, 3, 4]}
      turlariKur={(n) => karistir(liste).slice(0, TUR_SAYISI).map((o): Tur => ({
        soru: dokunCumle(o.yonelme), dogruId: o.kelime, dogruSoz: `Evet, bu ${o.kelime}.`,
        secenekler: sikKur(o, liste, n, (a, b) => a.kelime === b.kelime).map(x => ({ id: x.kelime, url: x.url })),
      }))} />
  );
};

export default YonergeTakibi;
