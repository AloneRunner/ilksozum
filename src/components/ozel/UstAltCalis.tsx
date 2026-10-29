import React from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import MobilyaSahne from './MobilyaSahne.tsx';
import { UST_ALT_SETLER, ustAltSoru, ustAltDogru, type UstAltSet } from '../../data/ustAlt.ts';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Üstünde / Altında (Gökhan Hoca, 2026-10-29): iki şıkta aynı mobilya, yalnız nesnenin yeri değişir; altında nesne ayakların
// arasında ve yerde, üstünde yüzeye değer. Resimler büyük. Sıra: Tanı → yalnız "üstünde" → yalnız "altında" → karışık.
// Sürükle-bırak ("topu masanın altına bırak") bölümün içinde: "Kendin yerleştir" kartı (Nesneyi Yerleştir etkinliği).
const SETLER = UST_ALT_SETLER;
const url = (s: UstAltSet) => `/images/ozel/kesik/${s.dosya}.webp`;

const tur = (ust: boolean): Tur => {
  const s = SETLER[zar(SETLER.length)];
  return {
    soru: ustAltSoru(s, ust), dogruId: ust ? 'ust' : 'alt', dogruSoz: ustAltDogru(s, ust),
    secenekler: karistir(['ust', 'alt']).map((id) => ({ id, icerik: <MobilyaSahne mobilya={s.mobilya} nesne={url(s)} ustunde={id === 'ust'} className="w-full aspect-square" /> })),
  };
};
const on = (f: () => Tur) => Array.from({ length: 10 }, f);

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Üstünde / Altında" emoji="🪑" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
      <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
        {SETLER.slice(0, 6).map((s) => (
          <div key={s.dosya + s.mobilya} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
            {([true, false] as const).map((u) => (
              <button key={String(u)} onClick={() => speak(ustAltDogru(s, u).replace(/^Evet! /, ''))} className="rounded-2xl overflow-hidden active:scale-95">
                <MobilyaSahne mobilya={s.mobilya} nesne={url(s)} ustunde={u} className="w-full aspect-square" />
                <span className="block text-lg font-black text-slate-800">{u ? 'üstünde' : 'altında'}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  </OyunCercevesi>
);

const UstAltCalis: React.FC<{ onBack: () => void; onSorular: () => void; onYerlestir: () => void }> = ({ onBack, onSorular, onYerlestir }) => (
  <AsamaliCalisma id="ustAltCalis" baslik="Üstünde / Altında" emoji="🪑" onBack={onBack} onSorular={onSorular}
    aciklama="Aynı mobilya, yalnız nesnenin yeri farklı: üstünde yüzeye değer, altında ayakların arasında yerde durur. Önce “üstünde”, sonra “altında”; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Üstünde ve altında, dokun ve dinle"
    ekKart={{ emoji: '🖐️', baslik: 'Kendin yerleştir', alt: 'Nesneyi sürükle: masanın üstüne, altına…', onClick: onYerlestir }}
    asamalar={[
      { ad: 'Üstünde · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(true)) },
      { ad: 'Altında · 2 şık', alt: '10 soru', secenek: 2, turlar: () => on(() => tur(false)) },
    ]}
    karisik={{ alt: '30 soru, üstünde ve altında karışık', secenek: 2, turlar: () => Array.from({ length: 30 }, () => tur(zar(2) === 0)) }} />
);

export default UstAltCalis;
