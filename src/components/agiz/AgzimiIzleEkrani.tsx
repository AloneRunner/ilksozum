import React, { useEffect, useState } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import KonusanAgiz, { AgizSekli } from './KonusanAgiz.tsx';
import { anaVizem } from './agizSekilleri.ts';
import { cancelSpeech, kayittanSoyle, setKayitHizi } from '../../services/speechService.ts';
import { SES_KAYITLARI } from '../../data/sesListesi.ts';

// Ağzımı İzle (Kaan, 2026-10-08): ses → hece → ilk kelimeler. Karta dokun: Gökçe söyler, ağız senkron hareket eder,
// sonra "Sen de söyle!". Tarifler artikülasyon kartı tarzında (kısa, ebeveynin yüksek sesle okuyabileceği).
type Oge = [metin: string, tarif?: string];
interface Bolum { id: string; ad: string; emoji: string; ogeler: Oge[] }

const BOLUMLER: Bolum[] = [
  { id: 'unlu', ad: 'Sesler', emoji: '🔤', ogeler: [
    ['a', 'Ağzını kocaman aç.'], ['e', 'Dudaklarını yana ger, ağzını biraz aç.'], ['ı', 'Dişlerin hafif görünsün, dudakların gergin.'],
    ['i', 'Gülümser gibi dudaklarını yana ger.'], ['o', 'Dudaklarını yuvarlak yap.'], ['ö', 'Dudakların yuvarlak, "e" der gibi.'],
    ['u', 'Dudaklarını öne uzat, küçük bir daire yap.'], ['ü', 'Dudaklarını öne uzat, "i" der gibi.'],
  ] },
  { id: 'dudak', ad: 'Dudaklar', emoji: '👄', ogeler: [
    ['ma', 'Dudaklarını birleştir: mmm… sonra aç.'], ['ba', 'Dudaklarını birleştir, sonra patlat.'], ['pa', 'Dudaklarını birleştir, havayı patlatarak bırak.'],
    ['mama', 'Dudaklar iki kez kapanıp açılır.'], ['baba', 'Dudaklar iki kez kapanıp açılır.'],
    ['fa', 'Üst dişlerin alt dudağına değsin, üfle.'], ['va', 'Üst dişlerin alt dudağına değsin.'],
  ] },
  { id: 'dil', ad: 'Dil ucu', emoji: '👅', ogeler: [
    ['la', 'Dilinin ucu üst dişlerinin arkasına değsin.'], ['na', 'Dilinin ucu üst dişlerinin arkasına değsin, burnundan ses ver.'],
    ['ta', 'Dilinin ucunu üst dişlerine değdir, sonra çek.'], ['da', 'Dilinin ucunu üst dişlerine değdir, sonra çek.'],
    ['ra', 'Dilinin ucu üst dişlerin arkasında hafifçe titresin.'],
  ] },
  { id: 'dis', ad: 'Dişler', emoji: '🦷', ogeler: [
    ['sa', 'Dişlerini birleştir, yılan gibi üfle: sss.'], ['za', 'Dişlerini birleştir, arı gibi vızılda: zzz.'],
    ['şa', 'Dudaklarını öne uzat, "sus" der gibi: şşş.'], ['ça', 'Dudaklarını öne uzat, kısa bir üfle.'],
    ['ca', 'Dudakların önde, sesli üfle.'], ['ya', 'Gülümser gibi başla, sonra aç.'],
  ] },
  { id: 'bogaz', ad: 'Boğaz', emoji: '🗣️', ogeler: [
    ['ka', 'Dilin geride, ağzın açık.'], ['ga', 'Dilin geride, sesli.'], ['ha', 'Aynayı buğular gibi nefes ver.'],
  ] },
  { id: 'kelime', ad: 'İlk kelimeler', emoji: '⭐', ogeler: [
    ['baba'], ['mama'], ['bebek'], ['su'], ['süt'], ['muz'], ['elma'], ['bal'], ['çay'], ['ev'], ['el'],
    ['göz'], ['at'], ['ayı'], ['balık'], ['araba'], ['ip'], ['evet'], ['hayır'], ['daha'], ['bitti'], ['gel'], ['ver'], ['dur'],
  ] },
];

// Yalnız Gökçe kaydı olanlar (ağız kayıtla senkron çalışır)
const kayitli = (m: string) => !!SES_KAYITLARI[m.toLocaleLowerCase('tr-TR')];

const AgzimiIzleEkrani: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [bolumId, setBolumId] = useState('unlu');
  const [secili, setSecili] = useState<Oge | null>(null);
  const [harf, setHarf] = useState(-1);
  const [yavas, setYavas] = useState(false);
  const [senSoyle, setSenSoyle] = useState(false);
  const bolum = BOLUMLER.find((b) => b.id === bolumId)!;
  const ogeler = bolum.ogeler.filter(([m]) => kayitli(m));

  useEffect(() => () => { setKayitHizi(1); cancelSpeech(); }, []);

  const soyle = async (o: Oge) => {
    setSecili(o); setSenSoyle(false);
    setKayitHizi(yavas ? 0.7 : 1);
    await kayittanSoyle(o[0]);
    setSenSoyle(true);
  };

  const yazi = secili?.[0] || '';
  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto px-3 pt-3 pb-4 animate-fade-in">
      <header className="flex items-center gap-3 mb-2">
        <button onClick={onBack} className="p-2 rounded-full bg-white/80 shadow active:scale-95" aria-label="Geri dön"><ArrowLeftIcon className="w-7 h-7 text-slate-700" /></button>
        <h1 className="text-2xl font-black text-slate-800">👄 Ağzımı İzle</h1>
      </header>

      <div className="flex flex-col landscape:flex-row gap-3 flex-1 min-h-0">
        <section className="flex flex-col items-center landscape:w-[42%] shrink-0">
          <button onClick={() => secili && soyle(secili)} className="w-[min(62vw,250px)] landscape:w-[min(34vw,250px)] active:scale-[0.98] transition" aria-label="Tekrar söyle">
            <KonusanAgiz className="w-full h-auto drop-shadow-lg" onHarf={setHarf} buyukAgiz />
          </button>
          <div className="min-h-[56px] flex items-center justify-center gap-0.5 mt-1">
            {yazi ? [...yazi].map((h, i) => (
              <span key={i} className={`text-5xl font-black transition-all ${i === harf ? 'text-rose-500 scale-125' : 'text-slate-700'}`}>{h}</span>
            )) : <span className="text-base font-semibold text-slate-500">Bir karta dokun 👇</span>}
          </div>
          {/* Yer hep ayrılı: ipucu ve "Şimdi sen söyle" çıkıp kaybolurken ekran oynamasın (Kaan, 2026-10-09) */}
          <p className="text-center text-sm font-semibold text-slate-600 max-w-xs min-h-[2.5rem] line-clamp-2">{secili?.[1] || ''}</p>
          <div className={`mt-1 px-4 py-2 rounded-full bg-amber-100 text-amber-800 font-black text-lg transition-opacity duration-300 ${senSoyle ? 'opacity-100 animate-pulse' : 'opacity-0'}`} aria-hidden={!senSoyle}>Şimdi sen söyle! 🗣️</div>
          <div className="flex gap-2 mt-2">
            <button disabled={!secili} onClick={() => secili && soyle(secili)} className="px-4 py-2 rounded-full bg-sky-500 text-white font-black shadow active:scale-95 disabled:opacity-40">🔁 Tekrar</button>
            <button onClick={() => setYavas((y) => !y)} className={`px-4 py-2 rounded-full font-black shadow active:scale-95 ${yavas ? 'bg-emerald-500 text-white' : 'bg-white text-slate-700'}`}>🐢 Yavaş {yavas ? 'açık' : ''}</button>
          </div>
        </section>

        <section className="flex flex-col min-h-0 flex-1">
          <div className="flex gap-2 overflow-x-auto pb-2 shrink-0">
            {BOLUMLER.map((b) => (
              <button key={b.id} onClick={() => setBolumId(b.id)} className={`shrink-0 px-3 py-2 rounded-full font-black text-sm shadow-sm ${b.id === bolumId ? 'bg-rose-500 text-white' : 'bg-white text-slate-700'}`}>{b.emoji} {b.ad}</button>
            ))}
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-5 landscape:grid-cols-4 gap-2 overflow-y-auto pb-2">
            {ogeler.map((o) => (
              <button key={o[0]} onClick={() => soyle(o)} className={`flex flex-col items-center rounded-2xl bg-white p-1.5 shadow active:scale-95 border-4 ${secili?.[0] === o[0] ? 'border-rose-400' : 'border-transparent'}`}>
                <AgizSekli v={anaVizem(o[0])} className="w-full h-auto" />
                <span className="text-2xl font-black text-slate-800 leading-tight mt-0.5">{o[0]}</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AgzimiIzleEkrani;
