import React, { lazy, Suspense, useMemo, useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { DUYGULAR, DURUMLAR, ZAMIR_GRUPLARI, zamirSoru, MEVSIMLER, EYLEMLER, DINLE_SESLER, dinleSoru, type Duygu } from './ozelVeri.ts';
import { SecimOyunu, Sekmeler, karistir, sikKur, konus, type Tur } from './ozelOrtak.tsx';
import { soundImitationImages } from '../../services/database/soundImitationImages.ts';
import { nesneUrl } from '../../services/nesneGorsel.ts';

// Özel eğitim etkinlikleri (Kaan, 2026-10-29). Menüden "ekran" adıyla açılır (beceriMenu.ts → AppRouter).
const SosyalOyku = lazy(() => import('./SosyalOyku.tsx'));
const OzBakim = lazy(() => import('./OzBakim.tsx'));
const KediyiBul = lazy(() => import('./KediyiBul.tsx'));
const SesinYeri = lazy(() => import('./SesinYeri.tsx'));
const IslevselOkuma = lazy(() => import('./IslevselOkuma.tsx'));
const YonergeTakibi = lazy(() => import('./YonergeTakibi.tsx'));
const Toplama = lazy(() => import('./Toplama.tsx'));
const GunlerAylar = lazy(() => import('./GunlerAylar.tsx'));

export type OzelEkranId = 'sosyalOyku' | 'ozBakim' | 'nasilHisseder' | 'benSenO' | 'mevsimler' | 'kediyiBul' | 'sesinYeri' | 'islevselOkuma'
  | 'neYapiyor' | 'yonerge' | 'dinleBul' | 'toplama' | 'gunlerAylar';

// --- Ne yapıyor? Eylem fotoğrafları: Tanı (dokun, dinle) + Soru ("Kim uyuyor?") ---
const NeYapiyor: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sekme, setSekme] = useState<'tani' | 'soru'>('tani');
  const ust = <Sekmeler secili={sekme} sekmeler={[['tani', '👀 Tanı'], ['soru', '❓ Soru']]} onSec={setSekme} />;
  if (sekme === 'soru') return (
    <SecimOyunu oyunId="neYapiyor" sayacAdi="Ne Yapıyor?" baslik="Ne Yapıyor?" emoji="🏃" onBack={onBack} ust={ust}
      secenekSayilari={[2, 3, 4]}
      turlariKur={(n) => karistir(EYLEMLER).slice(0, 10).map((e): Tur => ({
        soru: e.soru, dogruId: e.id, dogruSoz: e.dogru,
        secenekler: sikKur(e, EYLEMLER, n).map(x => ({ id: x.id, url: x.url })),
      }))} />
  );
  return (
    <OyunCercevesi baslik="Ne Yapıyor?" emoji="🏃" onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        {ust}
        <div className="grid grid-cols-2 sm:grid-cols-3 landscape:grid-cols-4 gap-3 w-full max-w-4xl mx-auto">
          {EYLEMLER.map(e => (
            <button key={e.id} onClick={() => speak(e.soz)} className="rounded-3xl bg-white shadow-lg overflow-hidden active:scale-95">
              <img src={e.url} alt="" draggable={false} className="w-full aspect-square object-cover" />
              <span className="block py-1.5 px-1 text-lg font-black text-slate-800 leading-tight">{e.soz.replace(/\.$/, '')}</span>
            </button>
          ))}
        </div>
      </div>
    </OyunCercevesi>
  );
};

// --- Dinle, bul: Gökçe sesi taklit eder ("Hav hav. Bu ses kimin?"), çocuk resmi bulur ---
const DinleBul: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const sesler = useMemo(() => DINLE_SESLER.map(s => {
    const g = soundImitationImages.find(i => i.word === s.kelime);
    return g ? { ...s, url: nesneUrl(g.imageUrl) } : null;
  }).filter((s): s is NonNullable<typeof s> => !!s), []);
  return (
    <SecimOyunu oyunId="dinleBul" sayacAdi="Dinle, Bul" baslik="Dinle, Bul" emoji="👂" onBack={onBack}
      secenekSayilari={[2, 3, 4]}
      turlariKur={(n) => karistir(sesler).slice(0, 10).map((s): Tur => ({
        soru: dinleSoru(s), dogruId: s.kelime, dogruSoz: `Evet, bu ${s.kelime}.`,
        secenekler: sikKur(s, sesler, n, (a, b) => a.kelime === b.kelime || a.ses === b.ses).map(x => ({ id: x.kelime, url: x.url })),
      }))} />
  );
};

// --- Nasıl hisseder? Durum resmi + duygu yüzleri (2 → 3 → 4 şık) ---
const NasilHisseder: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <SecimOyunu oyunId="nasilHisseder" sayacAdi="Nasıl Hisseder?" baslik="Nasıl Hisseder?" emoji="😊" onBack={onBack}
    secenekSayilari={[2, 3, 4]}
    turlariKur={(n) => karistir(DURUMLAR).map((d): Tur => ({
      soru: `${d.durum} Nasıl hisseder?`, gorsel: d.url, dogruId: d.duygu, dogruSoz: d.dogru,
      secenekler: sikKur<Duygu>(d.duygu, Object.keys(DUYGULAR) as Duygu[], n).map(id => ({ id, emoji: DUYGULAR[id].emoji, yazi: DUYGULAR[id].ad })),
    }))} />
);

// --- Ben, sen, o ---
const BenSenO: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sekme, setSekme] = useState<'tani' | 'soru'>('tani');
  const ust = <Sekmeler secili={sekme} sekmeler={[['tani', '👀 Tanı'], ['soru', '❓ Soru']]} onSec={setSekme} />;
  if (sekme === 'soru') return (
    <SecimOyunu oyunId="benSenO" sayacAdi="Ben, Sen, O" baslik="Ben, Sen, O" emoji="👉" onBack={onBack} ust={ust}
      secenekSayilari={[2, 3]}
      turlariKur={(n) => karistir(ZAMIR_GRUPLARI.flatMap(grup => grup.map(z => ({ z, grup })))).map(({ z, grup }): Tur => ({
        soru: zamirSoru(z), dogruId: z.id, dogruSoz: `Evet! ${z.soz}`,
        secenekler: sikKur(z, grup, n).map(x => ({ id: x.id, url: x.url })),
      }))} />
  );
  return (
    <OyunCercevesi baslik="Ben, Sen, O" emoji="👉" onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        {ust}
        {ZAMIR_GRUPLARI.map((grup, gi) => (
          <div key={gi} className="grid grid-cols-3 gap-3 w-full max-w-2xl mx-auto">
            {grup.map(z => (
              <button key={z.id} onClick={() => speak(z.soz)} className="rounded-3xl bg-white shadow-lg overflow-hidden active:scale-95">
                <img src={z.url} alt="" draggable={false} className="w-full aspect-square object-cover" />
                <span className="block py-1.5 text-2xl font-black text-slate-800">{z.ad}</span>
              </button>
            ))}
          </div>
        ))}
        <p className="text-xs text-slate-500 text-center max-w-md mx-auto">Gerçek hayatta da gösterin: kendinizi gösterip "ben", çocuğu gösterip "sen" deyin. Zamirler çocuğun bakış açısına göre değişir; bol tekrar gerekir.</p>
      </div>
    </OyunCercevesi>
  );
};

// --- Mevsimler ---
const Mevsimler: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sekme, setSekme] = useState<'tani' | 'soru'>('tani');
  const ust = <Sekmeler secili={sekme} sekmeler={[['tani', '👀 Tanı'], ['soru', '❓ Soru']]} onSec={setSekme} />;
  if (sekme === 'soru') return (
    <SecimOyunu oyunId="mevsimler" sayacAdi="Mevsimler" baslik="Mevsimler" emoji="🍂" onBack={onBack} ust={ust}
      secenekSayilari={[2, 3, 4]}
      turlariKur={(n) => karistir(MEVSIMLER.flatMap(m => (['agac', 'cocuk'] as const).map(tur => ({ m, tur })))).map(({ m, tur }): Tur => ({
        soru: `Hangisi ${m.ad.toLocaleLowerCase('tr-TR')}?`, dogruId: m.id, dogruSoz: `Evet! ${tur === 'agac' ? m.agacSoz : m.cocukSoz}`,
        secenekler: sikKur(m, MEVSIMLER, n).map(x => ({ id: x.id, url: x[tur] })),
      }))} />
  );
  return (
    <OyunCercevesi baslik="Mevsimler" emoji="🍂" onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        {ust}
        <div className="grid grid-cols-1 sm:grid-cols-2 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
          {MEVSIMLER.map(m => (
            <div key={m.id} className="rounded-3xl bg-white shadow-lg p-2">
              <div className="text-2xl font-black text-slate-800 px-1 pb-1">{m.emoji} {m.ad}</div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => speak(m.agacSoz)} className="active:scale-95"><img src={m.agac} alt="" draggable={false} className="w-full aspect-square object-cover rounded-2xl" /></button>
                <button onClick={() => speak(m.cocukSoz)} className="active:scale-95"><img src={m.cocuk} alt="" draggable={false} className="w-full aspect-square object-cover rounded-2xl" /></button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={async () => { for (const m of MEVSIMLER) await konus(m.ad); }} className="self-center px-5 py-3 rounded-full bg-white shadow font-black text-slate-700 active:scale-95">🔊 İlkbahar, yaz, sonbahar, kış</button>
      </div>
    </OyunCercevesi>
  );
};

const OzelEkran: React.FC<{ ekran: OzelEkranId; onBack: () => void }> = ({ ekran, onBack }) => (
  <Suspense fallback={null}>
    {ekran === 'sosyalOyku' && <SosyalOyku onBack={onBack} />}
    {ekran === 'ozBakim' && <OzBakim onBack={onBack} />}
    {ekran === 'kediyiBul' && <KediyiBul onBack={onBack} />}
    {ekran === 'nasilHisseder' && <NasilHisseder onBack={onBack} />}
    {ekran === 'benSenO' && <BenSenO onBack={onBack} />}
    {ekran === 'mevsimler' && <Mevsimler onBack={onBack} />}
    {ekran === 'sesinYeri' && <SesinYeri onBack={onBack} />}
    {ekran === 'islevselOkuma' && <IslevselOkuma onBack={onBack} />}
    {ekran === 'neYapiyor' && <NeYapiyor onBack={onBack} />}
    {ekran === 'yonerge' && <YonergeTakibi onBack={onBack} />}
    {ekran === 'dinleBul' && <DinleBul onBack={onBack} />}
    {ekran === 'toplama' && <Toplama onBack={onBack} />}
    {ekran === 'gunlerAylar' && <GunlerAylar onBack={onBack} />}
  </Suspense>
);

export default OzelEkran;
