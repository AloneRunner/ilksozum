import React from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import AsamaliCalisma from './AsamaliCalisma.tsx';
import { ON_ARKA_SETLER, onArkaSoru, onArkaDogru, type OnArkaSet } from '../../data/onArka.ts';
import { karistir, zar, type Tur } from './ozelOrtak.tsx';

// Önünde / Arkasında (Gökhan Hoca, 2026-10-29): referans (kutu, sepet, kova, kase) iki şıkta aynı yerde ve ölçekte; nesne tam
// ortada. Önünde: nesne önde ve biraz aşağıda, referansın bir kısmını kapatır. Arkasında: referans önde çizilir, nesnenin
// yalnız üst kısmı görünür. Nesneler beyaz zeminli fotoğraftan kesik. Sıra: Tanı → önünde → arkasında → karışık.
const kesik = (d: string) => `/images/ozel/kesik/${d}.webp`;
const ZEMIN = 176;
const REF_ORAN: Record<string, number> = { kutu: 289 / 342, sepet: 343 / 341, kova: 275 / 298, kase: 360 / 216 }; // kesik görsel en/boy

export const OnArkaSahne: React.FC<{ s: OnArkaSet; onunde: boolean; className?: string }> = ({ s, onunde, className }) => {
  const R = s.refBoy, boy = Math.round(R * 0.85);
  const refUst = ZEMIN - R;
  // Arkada: tabanı referansın yarısından biraz yukarıda (uzakta), üstü referansın üstünden taşar
  const arkaAlt = ZEMIN - R * 0.45, onAlt = ZEMIN + 14;
  // Nesne referanstan geniş olmasın (arkadayken yanlardan taşmasın); iki şıkta aynı ölçü
  const en = Math.min(boy * 1.4, R * (REF_ORAN[s.refDosya] ?? 1) * 0.9);
  const nesne = (alt: number) => <image href={kesik(s.dosya)} x={100 - en / 2} y={alt - boy} width={en} height={boy} preserveAspectRatio="xMidYMax meet" />;
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`${s.nesne} ${onunde ? 'önünde' : 'arkasında'}`}>
      <rect width="200" height="200" fill="#f8fafc" />
      <ellipse cx="100" cy={ZEMIN + 4} rx="80" ry="10" fill="#e2e8f0" />
      {!onunde && nesne(arkaAlt)}
      <image href={kesik(s.refDosya)} x={100 - R * 0.62} y={refUst} width={R * 1.24} height={R} preserveAspectRatio="xMidYMax meet" />
      {onunde && <><ellipse cx="100" cy={onAlt} rx={boy * 0.4} ry="3.5" fill="#000" opacity={0.18} />{nesne(onAlt)}</>}
    </svg>
  );
};

const tur = (on: boolean): Tur => {
  const s = ON_ARKA_SETLER[zar(ON_ARKA_SETLER.length)];
  return {
    soru: onArkaSoru(s, on), dogruId: on ? 'on' : 'arka', dogruSoz: onArkaDogru(s, on),
    secenekler: karistir(['on', 'arka']).map((id) => ({ id, icerik: <OnArkaSahne s={s} onunde={id === 'on'} className="w-full aspect-square" /> })),
  };
};
const tekrar10 = (f: () => Tur) => Array.from({ length: 10 }, f);

const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <OyunCercevesi baslik="Önünde / Arkasında" emoji="📦" onBack={onBack} yonerge="Resme dokun, dinle.">
    <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
      <div className="grid grid-cols-1 landscape:grid-cols-2 gap-3 w-full max-w-4xl mx-auto">
        {ON_ARKA_SETLER.slice(0, 4).map((s) => (
          <div key={s.dosya + s.ref} className="grid grid-cols-2 gap-2 rounded-3xl bg-white p-2 shadow-lg">
            {([true, false] as const).map((u) => (
              <button key={String(u)} onClick={() => speak(onArkaDogru(s, u).replace(/^Evet! /, ''))} className="rounded-2xl overflow-hidden active:scale-95">
                <OnArkaSahne s={s} onunde={u} className="w-full aspect-square" />
                <span className="block text-lg font-black text-slate-800">{u ? 'önünde' : 'arkasında'}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  </OyunCercevesi>
);

const OnArkaCalis: React.FC<{ onBack: () => void; onSorular: () => void; onKutu: () => void }> = ({ onBack, onSorular, onKutu }) => (
  <AsamaliCalisma id="onArkaCalis" baslik="Önünde / Arkasında" emoji="📦" onBack={onBack} onSorular={onSorular}
    ekKart={{ emoji: '🖐️', baslik: 'Kutu Oyunu', alt: 'Nesneyi kendin yerleştir', onClick: onKutu }}
    aciklama="Kutu, sepet, kova hep aynı yerde; nesne tam ortada. Önündeyken kutunun bir kısmını kapatır, arkasındayken yalnız üstü görünür. Önce “önünde”, sonra “arkasında”; en son karışık."
    tani={(bitti) => <Tani onBack={bitti} />} taniAlt="Önünde ve arkasında, dokun ve dinle"
    asamalar={[
      { ad: 'Önünde · 2 şık', alt: '10 soru', secenek: 2, turlar: () => tekrar10(() => tur(true)) },
      { ad: 'Arkasında · 2 şık', alt: '10 soru', secenek: 2, turlar: () => tekrar10(() => tur(false)) },
    ]}
    karisik={{ alt: '30 soru, önünde ve arkasında karışık', secenek: 2, turlar: () => Array.from({ length: 30 }, () => tur(zar(2) === 0)) }} />
);

export default OnArkaCalis;
