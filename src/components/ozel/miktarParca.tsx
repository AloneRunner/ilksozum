import React, { useEffect, useMemo, useRef, useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { OBJECT_CATEGORIES } from '../../constants.ts';
import { kategoriOgeleri } from '../sozluk/KelimeKitabi.tsx';
import { speak } from '../../services/speechService.ts';
import { azCokDogru, kacDogru, taniSoz, yakinDogru, PARCALI, YAKIN_NESNE, YAKIN_YER, type AraSet, type Parcali, type Kisim } from '../../data/ciftKavramlar.ts';
import { karistir } from './ozelOrtak.tsx';

// Gökhan Hoca, 2026-11-09 (Miktar): nesneler her şıkta aynı boyutta; bütün/yarım/çeyrek gerçek oranda, kesme animasyonuyla.
let onbellek: Map<string, string> | null = null;
export const nesneResmi = (ad: string): string | undefined => {
  if (!onbellek) {
    onbellek = new Map();
    for (const k of OBJECT_CATEGORIES) if (!k.disabled) for (const o of kategoriOgeleri(k.id)) if (!onbellek.has(o.kelime)) onbellek.set(o.kelime, o.url);
  }
  return onbellek.get(ad);
};

/** Yerleri bir kez seçilir ki yeniden çizimde nesneler zıplamasın */
export const yerSec = (n: number, hucre: number) => karistir(Array.from({ length: hucre }, (_, i) => i)).slice(0, n);

/** Sabit ızgara: hücre boyu sayıya göre değişmez, az olan grup büyümez. */
export const Grup: React.FC<{ url: string; yerler: number[]; sutun: number; hucre: number }> = ({ url, yerler, sutun, hucre }) => (
  <div className="grid w-full aspect-square gap-0.5 p-1.5" style={{ gridTemplateColumns: `repeat(${sutun}, minmax(0, 1fr))` }}>
    {Array.from({ length: hucre }, (_, i) => (
      <div key={i} className="aspect-square">{yerler.includes(i) && <img src={url} alt="" draggable={false} className="h-full w-full object-contain" />}</div>
    ))}
  </div>
);

const PARCA = [
  { kirp: 'inset(0 50% 50% 0)', x: -1, y: -1 }, { kirp: 'inset(0 0 50% 50%)', x: 1, y: -1 },
  { kirp: 'inset(50% 50% 0 0)', x: -1, y: 1 }, { kirp: 'inset(50% 0 0 50%)', x: 1, y: 1 },
];
const EL_CSS = '@keyframes kesDikey{from{top:-6%;opacity:1}to{top:88%;opacity:1}}@keyframes kesYatay{from{left:-6%;opacity:1}to{left:88%;opacity:1}}';

/** Kesildikten sonra ekranda kalan parçalar: yarımda sol yarı, çeyrekte sol üst. */
const kalir = (k: Kisim, i: number) => k === 'bütün' || i === 0 || (k === 'yarım' && i === 2);

/** Kuşbakışı bütün resmi el ikiye, sonra dörde böler; fazla parçalar yavaşça silinir, söz en sonda gelir. Parçalar aynı resmin kırpılmışı olduğu için oran tam 1/2 ve 1/4. */
export const Kesme: React.FC<{ p: Parcali }> = ({ p }) => {
  const [hal, setHal] = useState<Kisim>('bütün');
  const [ayrik, setAyrik] = useState<Kisim>('bütün');
  const [silik, setSilik] = useState(false);
  const [yazi, setYazi] = useState<string>('bütün');
  const [sayac, setSayac] = useState(0);
  const zaman = useRef<number[]>([]);
  const temizle = () => { zaman.current.forEach((t) => clearTimeout(t)); zaman.current = []; };
  useEffect(() => temizle, []);
  const sonra = (ms: number, f: () => void) => { zaman.current.push(window.setTimeout(f, ms)); };
  const sec = (k: Kisim) => {
    temizle(); setHal(k); setAyrik('bütün'); setSilik(false); setSayac((s) => s + 1);
    const bitir = () => { setSilik(true); setYazi(k); void speak(`Bu ${p.ad} ${k}.`); };
    if (k === 'bütün') { bitir(); return; }
    setYazi('');
    sonra(700, () => setAyrik('yarım'));
    if (k === 'çeyrek') sonra(1400, () => setAyrik('çeyrek'));
    sonra(k === 'çeyrek' ? 2000 : 1300, bitir);
  };
  const dugme = (k: Kisim, yazi: string) => (
    <button onClick={() => sec(k)} className={`flex-1 rounded-2xl px-2 py-3 text-lg font-black active:scale-95 ${hal === k ? 'bg-sky-600 text-white' : 'bg-sky-100 text-sky-800'}`}>{yazi}</button>
  );
  return (
    <div className="w-full max-w-sm mx-auto rounded-3xl bg-white p-3 shadow-lg">
      <style>{EL_CSS}</style>
      <div className="relative aspect-square w-full overflow-hidden">
        {PARCA.map((c, i) => (
          <img key={i} src={p.bütün} alt="" draggable={false} className="absolute inset-0 h-full w-full object-contain"
            style={{ clipPath: c.kirp, transform: `translate(${ayrik === 'bütün' ? 0 : c.x * 7}%, ${ayrik === 'çeyrek' ? c.y * 7 : 0}%)`, opacity: silik && !kalir(hal, i) ? 0 : 1, transition: `transform .5s, opacity ${silik ? '1.2s' : '.3s'}` }} />
        ))}
        {hal !== 'bütün' && <span key={`d${sayac}`} className="absolute left-1/2 -ml-5 text-4xl opacity-0" style={{ animation: 'kesDikey .7s ease-in' }}>✋</span>}
        {hal === 'çeyrek' && <span key={`y${sayac}`} className="absolute top-1/2 -mt-5 text-4xl opacity-0" style={{ animation: 'kesYatay .7s ease-in .7s' }}>✋</span>}
      </div>
      <div className="mt-2 text-center text-2xl font-black text-slate-800">{yazi || ' '}</div>
      <div className="mt-2 flex gap-2">{dugme('bütün', 'Bütün')}{dugme('yarım', 'İkiye böl')}{dugme('çeyrek', 'Dörde böl')}</div>
    </div>
  );
};

export const ParcaTani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Bütün / Yarım" emoji="🍕" onBack={onBack} yonerge="Dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
      <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
        {PARCALI.filter((p) => p.kusbakisi).map((p) => <Kesme key={p.ad} p={p} />)}
      </div>
      <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
        {PARCALI.filter((p) => !p.kusbakisi).map((p) => (
          <div key={p.ad} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
            {(['bütün', 'yarım'] as const).map((k) => (
              <button key={k} onClick={() => void speak(`Bu ${p.ad} ${k}.`)} className="rounded-2xl overflow-hidden active:scale-95">
                <img src={p[k]} alt="" draggable={false} className="w-full aspect-square object-contain" />
                <span className="block text-lg font-black text-slate-800">{k}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  </OyunCercevesi>
);

export const AzCokTani: React.FC<{ nesneler: string[]; onBack: () => void }> = ({ nesneler, onBack }) => {
  const satirlar = useMemo(() => nesneler.flatMap((ad) => {
    const url = nesneResmi(ad);
    return url ? [{ ad, url, cok: yerSec(12, 16), az: yerSec(2, 16) }] : [];
  }), [nesneler]);
  return (
    <OyunCercevesi baslik="Az / Çok" emoji="🍎" onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 overflow-y-auto px-3 pb-3">
        <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
          {satirlar.map((s) => (
            <div key={s.ad} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
              {(['çok', 'az'] as const).map((k) => (
                <button key={k} onClick={() => void speak(taniSoz(azCokDogru(s.ad, k)))} className="rounded-2xl active:scale-95">
                  <Grup url={s.url} yerler={k === 'çok' ? s.cok : s.az} sutun={4} hucre={16} />
                  <span className="block text-lg font-black text-slate-800">{k}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </OyunCercevesi>
  );
};

export const KacTani: React.FC<{ ad: string; onBack: () => void }> = ({ ad, onBack }) => {
  const url = nesneResmi(ad) || '';
  const satirlar = useMemo(() => [1, 2, 3, 4, 5].map((n) => ({ n, yerler: yerSec(n, 9) })), []);
  return (
    <OyunCercevesi baslik="Kaç Tane Var?" emoji="🖐️" onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 overflow-y-auto px-3 pb-3">
        <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
          {satirlar.map(({ n, yerler }) => (
            <button key={n} onClick={() => void speak(taniSoz(kacDogru(n, ad)))} className="grid grid-cols-2 items-center gap-2 rounded-3xl bg-white p-2 shadow-lg active:scale-95">
              <img src={`/images/${6725 + n}.webp`} alt="" draggable={false} className="w-full aspect-square object-contain" />
              <Grup url={url} yerler={yerler} sutun={3} hucre={9} />
            </button>
          ))}
        </div>
      </div>
    </OyunCercevesi>
  );
};

export const AraTani: React.FC<{ setler: AraSet[]; onBack: () => void }> = ({ setler, onBack }) => (
  <OyunCercevesi baslik="Arasında" emoji="📦" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 overflow-y-auto px-3 pb-3">
      <div className="grid grid-cols-2 landscape:grid-cols-3 gap-3 w-full max-w-4xl mx-auto">
        {setler.map((s) => (
          <button key={s.ad} onClick={() => void speak(taniSoz(s.dogru))} className="rounded-3xl bg-white p-2 shadow-lg active:scale-95">
            <img src={s.orta} alt="" draggable={false} className="w-full aspect-square object-contain" />
            <span className="block text-lg font-black text-slate-800">arasında</span>
          </button>
        ))}
      </div>
    </div>
  </OyunCercevesi>
);

/** Yandan sahne: referans solda sabit; nesne aynı boyutta, ya yanında ya uzakta. */
export const YakinSahne: React.FC<{ yer: string; nesne: string; yakin: boolean }> = ({ yer, nesne, yakin }) => (
  <svg viewBox="0 0 200 200" className="w-full aspect-square">
    <rect x="0" y="152" width="200" height="48" fill="#e6efd6" />
    <image href={`/images/ozel/kesik/${yer}.webp`} x="4" y="86" width="66" height="72" preserveAspectRatio="xMidYMax meet" />
    <image href={`/images/ozel/kesik/${nesne}.webp`} x={yakin ? 72 : 150} y="110" width="46" height="48" preserveAspectRatio="xMidYMax meet" />
  </svg>
);

export const YakinTani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Yakın / Uzak" emoji="📏" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 overflow-y-auto px-3 pb-3">
      <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
        {YAKIN_NESNE.map((n, i) => {
          const y = YAKIN_YER[i % YAKIN_YER.length];
          return (
            <div key={n.ad} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
              {([true, false] as const).map((k) => (
                <button key={String(k)} onClick={() => void speak(taniSoz(yakinDogru(n.ad, y, k)))} className="rounded-2xl overflow-hidden active:scale-95">
                  <YakinSahne yer={y.dosya} nesne={n.dosya} yakin={k} />
                  <span className="block text-lg font-black text-slate-800">{k ? 'yakın' : 'uzak'}</span>
                </button>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  </OyunCercevesi>
);
