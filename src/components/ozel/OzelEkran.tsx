import React, { lazy, Suspense, useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { DUYGULAR, DURUMLAR, ZAMIR_GRUPLARI, zamirSoru, MEVSIMLER, type Duygu } from './ozelVeri.ts';
import { SecimOyunu, Sekmeler, karistir, sikKur, konus, type Tur } from './ozelOrtak.tsx';

// Özel eğitim etkinlikleri (Kaan, 2026-10-29). Menüden "ekran" adıyla açılır (beceriMenu.ts → AppRouter).
const SosyalOyku = lazy(() => import('./SosyalOyku.tsx'));
const OzBakim = lazy(() => import('./OzBakim.tsx'));
const KediyiBul = lazy(() => import('./KediyiBul.tsx'));

export type OzelEkranId = 'sosyalOyku' | 'ozBakim' | 'nasilHisseder' | 'benSenO' | 'mevsimler' | 'kediyiBul';

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
  </Suspense>
);

export default OzelEkran;
