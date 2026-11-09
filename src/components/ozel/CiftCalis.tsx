import React from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma, { type Asama } from './AsamaliCalisma.tsx';
import { GercekSesAyari, gercekSesCal } from './gercekSes.tsx';
import { karistir, konus, zar, type Tur } from './ozelOrtak.tsx';
import {
  ISLAK_KURU, SICAK_SOGUK, HAVA_SICAK_SOGUK, GURULTULU_SESSIZ, KIRISIK_DUZ, TATLAR, DOKUNMA_SORU, DOKUNMA_SICAK, DOKUNMA_GUVENLI,
  dokunmaDogru, hazir, taniSoz, tatSoru, tatDogru, type CiftSet, type Tat, type Yiyecek,
} from '../../data/ciftKavramlar.ts';

// Gökhan Hoca'nın 2026-11-09 turu: fotoğraf çiftli kavramların aşamalı çalışması. Tanı → önce bir yan (10) → öteki yan (10) → karışık.
export type CiftKonu = 'islakKuru' | 'sicakSoguk' | 'aciTatli' | 'gurultuluSessiz' | 'kirisikDuz';
type Yon = 'a' | 'b';

// Havuz karışık gezilir: bütün çiftler bir kez çıkmadan aynı çift yeniden gelmez
const havuzdan = <T,>(l: T[], n: number): T[] => {
  const s: T[] = [];
  while (s.length < n) for (const x of karistir(l)) { if (s.length < n && s[s.length - 1] !== x) s.push(x); }
  return s;
};

const sesCal = (s: CiftSet, y: Yon) => (s.ses ? (y === 'a' ? gercekSesCal(s.ses) : gercekSesCal('sessiz', true)) : Promise.resolve());

const turKur = (s: CiftSet, y: Yon, etiketler: Record<Yon, string>): Tur => ({
  soru: s[y].soru, dogruId: y, dogruSoz: s[y].dogru, sonraSes: s.ses ? () => sesCal(s, y) : undefined,
  secenekler: karistir<Yon>(['a', 'b']).map((id) => ({ id, url: s[id].url, sonraYazi: id === y ? etiketler[y] : undefined })),
});
const yanTurlari = (l: CiftSet[], y: Yon, e: Record<Yon, string>, n = 10) => () => havuzdan(l, n).map((s) => turKur(s, y, e));
const karisikTurlari = (l: CiftSet[], e: Record<Yon, string>, n = 20) => () => havuzdan(l, n).map((s) => turKur(s, zar(2) ? 'a' : 'b', e));

const CiftTani: React.FC<{ baslik: string; emoji: string; setler: CiftSet[]; etiketler: Record<Yon, string>; ust?: React.ReactNode; onBack: () => void }> = ({ baslik, emoji, setler, etiketler, ust, onBack }) => {
  const dinlet = async (s: CiftSet, y: Yon) => { await konus(taniSoz(s[y].dogru)); await sesCal(s, y); };
  return (
    <OyunCercevesi baslik={baslik} emoji={emoji} onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        {ust}
        <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
          {setler.map((s) => (
            <div key={s.a.url} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
              {(['a', 'b'] as const).map((y) => (
                <button key={y} onClick={() => void dinlet(s, y)} className="rounded-2xl overflow-hidden active:scale-95">
                  <img src={s[y].url} alt="" draggable={false} className="w-full aspect-square object-cover" />
                  <span className="block text-lg font-black text-slate-800">{etiketler[y]}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </OyunCercevesi>
  );
};

// Tatlar: çiftler rastgele kurulur (tatlı–ekşi, tatlı–acı)
const tatTur = (sor: Tat, oteki: Tat, ...daha: Tat[]): Tur => {
  const y = TATLAR[sor][zar(TATLAR[sor].length)];
  const celdirici = [oteki, ...daha].map((t) => ({ t, o: TATLAR[t][zar(TATLAR[t].length)] }));
  const secenek = (t: Tat, o: Yiyecek) => ({ id: t, url: o.url, sonraYazi: t === sor ? t : undefined });
  return { soru: tatSoru(sor), dogruId: sor, dogruSoz: tatDogru(y.ad, sor), secenekler: karistir([secenek(sor, y), ...celdirici.map((c) => secenek(c.t, c.o))]) };
};
const on = (f: () => Tur) => () => Array.from({ length: 10 }, f);

const TatTani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Acı / Tatlı" emoji="🍋" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-4 px-3 pb-3 overflow-y-auto">
      {(['tatlı', 'ekşi', 'acı'] as const).map((t) => (
        <div key={t} className="w-full max-w-4xl mx-auto rounded-3xl bg-white p-3 shadow-lg">
          <div className="text-2xl font-black text-slate-800 text-center mb-2">{t}</div>
          <div className="grid grid-cols-4 landscape:grid-cols-5 gap-2">
            {TATLAR[t].map((o) => (
              <button key={o.ad} onClick={() => speak(taniSoz(tatDogru(o.ad, t)))} className="rounded-2xl active:scale-95">
                <img src={o.url} alt={o.ad} draggable={false} className="w-full aspect-square object-contain" />
                <span className="block text-sm font-bold text-slate-700">{o.ad}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  </OyunCercevesi>
);

const dokunmaTur = (): Tur => {
  const s = DOKUNMA_SICAK[zar(DOKUNMA_SICAK.length)], g = DOKUNMA_GUVENLI[zar(DOKUNMA_GUVENLI.length)];
  const resim = (url: string, p: string) => <img src={url} alt="" draggable={false} className={`w-full aspect-square object-contain ${p}`} />;
  return {
    soru: DOKUNMA_SORU, dogruId: 'sicak', dogruSoz: dokunmaDogru(s.ad),
    secenekler: karistir([{ id: 'sicak', icerik: resim(s.url, ''), sonraYazi: 'sıcak' }, { id: 'guvenli', icerik: resim(g, 'p-[14%]') }]),
  };
};

interface Yapi { id: string; baslik: string; emoji: string; aciklama: string; taniAlt: string; tani: (b: () => void, ust?: React.ReactNode) => React.ReactNode; asamalar: Asama[]; karisik: { alt: string; secenek: number; turlar: () => Tur[] }; ileri?: Asama[]; ust?: React.ReactNode }

const ikiYan = (id: string, baslik: string, emoji: string, setler: CiftSet[], a: string, b: string, ust?: React.ReactNode, ozet?: string): Yapi => {
  const e = { a, b };
  return {
    id, baslik, emoji, ust, taniAlt: `${a} ve ${b}, dokun ve dinle`,
    aciklama: ozet || `Aynı nesne bir resimde ${a}, ötekinde ${b}. Önce “${a}”, sonra “${b}”; en son karışık.`,
    tani: (bitti) => <CiftTani baslik={baslik} emoji={emoji} setler={setler} etiketler={e} ust={ust} onBack={bitti} />,
    asamalar: [
      { ad: `${a.charAt(0).toLocaleUpperCase('tr-TR')}${a.slice(1)} · 2 şık`, alt: '10 soru', secenek: 2, turlar: yanTurlari(setler, 'a', e) },
      { ad: `${b.charAt(0).toLocaleUpperCase('tr-TR')}${b.slice(1)} · 2 şık`, alt: '10 soru', secenek: 2, turlar: yanTurlari(setler, 'b', e) },
    ],
    karisik: { alt: `20 soru, ${a} ve ${b} karışık`, secenek: 2, turlar: karisikTurlari(setler, e) },
  };
};

const yapiKur = (konu: CiftKonu): Yapi => {
  if (konu === 'islakKuru') return ikiYan('islakKuruCalis', 'Islak / Kuru', '💧', hazir(ISLAK_KURU), 'ıslak', 'kuru');
  if (konu === 'kirisikDuz') return ikiYan('kirisikDuzCalis', 'Kırışık / Düz', '👕', hazir(KIRISIK_DUZ), 'kırışık', 'düz');
  if (konu === 'gurultuluSessiz') return ikiYan('gurultuluSessizCalis', 'Gürültülü / Sessiz', '🔊', hazir(GURULTULU_SESSIZ), 'gürültülü', 'sessiz', <GercekSesAyari />,
    'Aynı özne bir resimde ses çıkarıyor, ötekinde çıkarmıyor. Doğru cevaptan sonra gerçek sesi çalar; sesi kısabilir ya da kapatabilirsiniz.');
  if (konu === 'sicakSoguk') {
    const y = ikiYan('sicakSogukCalis', 'Sıcak / Soğuk', '🔥', hazir(SICAK_SOGUK), 'sıcak', 'soğuk', undefined,
      'Önce “sıcak”, sonra “soğuk”; sıcak şeylere dokunmamayı öğrenip karışığa geçilir. Karışık tamamlanınca ileri aşama: hava durumu.');
    const he = { a: 'sıcak', b: 'soğuk' };
    const havaSet = hazir(HAVA_SICAK_SOGUK);
    return {
      ...y,
      asamalar: [...y.asamalar, { ad: 'Sıcak şeylere dokunmayız', alt: '10 soru', secenek: 2, turlar: on(dokunmaTur) }],
      ileri: [{ ad: 'Hava sıcak mı, soğuk mu?', alt: '10 soru', secenek: 2, turlar: () => havuzdan(havaSet.length > 1 ? havaSet : [...havaSet, ...havaSet], 10).map((s) => turKur(s, zar(2) ? 'a' : 'b', he)) }],
    };
  }
  return {
    id: 'aciTatliCalis', baslik: 'Acı / Tatlı', emoji: '🍋', taniAlt: 'Tatlı, ekşi ve acı, dokun ve dinle',
    aciklama: 'Önce tatlı ve ekşi ayrı ayrı, sonra tatlı ve acı; en son üçü bir arada.',
    tani: (bitti) => <TatTani onBack={bitti} />,
    asamalar: [
      { ad: 'Tatlı (ekşi yanında)', alt: '10 soru', secenek: 2, turlar: on(() => tatTur('tatlı', 'ekşi')) },
      { ad: 'Ekşi', alt: '10 soru', secenek: 2, turlar: on(() => tatTur('ekşi', 'tatlı')) },
      { ad: 'Tatlı (acı yanında)', alt: '10 soru', secenek: 2, turlar: on(() => tatTur('tatlı', 'acı')) },
      { ad: 'Acı', alt: '10 soru', secenek: 2, turlar: on(() => tatTur('acı', 'tatlı')) },
    ],
    karisik: { alt: '20 soru, tatlı, ekşi ve acı', secenek: 3, turlar: () => Array.from({ length: 20 }, () => {
      const t = (['tatlı', 'ekşi', 'acı'] as const)[zar(3)];
      const o = (['tatlı', 'ekşi', 'acı'] as const).filter((x) => x !== t);
      return tatTur(t, o[0], o[1]);
    }) },
  };
};

const CiftCalis: React.FC<{ konu: CiftKonu; onBack: () => void; onSorular: () => void }> = ({ konu, onBack, onSorular }) => {
  const y = yapiKur(konu);
  return (
    <AsamaliCalisma id={y.id} baslik={y.baslik} emoji={y.emoji} aciklama={y.aciklama} onBack={onBack} onSorular={onSorular} ust={y.ust}
      tani={(bitti) => y.tani(bitti, y.ust)} taniAlt={y.taniAlt} asamalar={y.asamalar} karisik={y.karisik} ileri={y.ileri} />
  );
};

export default CiftCalis;
