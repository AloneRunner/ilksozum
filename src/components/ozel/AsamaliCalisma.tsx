import React, { useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { SecimOyunu, ikinciBasarisizlik, GERI_MESAJ, type Tur } from './ozelOrtak.tsx';

// Aşamalı kavram çalışması (Gökhan Hoca'nın kalıbı, 2026-10-29): Tanı → sırayla aşamalar (10'ar soru, 8/10 ilk denemede
// doğru olmadan sonraki açılmaz) → karışık. İlerleme profil başına cihazda. Açık/Koyu ve Parlak/Mat bunu kullanır.
export interface Asama { ad: string; alt: string; secenek: number; turlar: () => Tur[] }

const profil = () => { try { return JSON.parse(localStorage.getItem('activeProfileId_v1') || 'null') || 'misafir'; } catch { return 'misafir'; } };
const GECME = 8;

const AsamaliCalisma: React.FC<{
  id: string; baslik: string; emoji: string; aciklama: string;
  tani?: (onBitti: () => void) => React.ReactNode; taniAlt?: string;
  asamalar: Asama[]; karisik: { alt: string; secenek: number; turlar: () => Tur[] };
  onBack: () => void; onSorular: () => void;
}> = ({ id, baslik, emoji, aciklama, tani, taniAlt, asamalar, karisik, onBack, onSorular }) => {
  const anahtar = `${id}_${profil()}`;
  const [gecilen, setGecilen] = useState<number>(() => { try { return Number(localStorage.getItem(anahtar)) || 0; } catch { return 0; } });
  const [ekran, setEkran] = useState<'merkez' | 'tani' | 'karisik' | number>('merkez');
  const [sonuc, setSonuc] = useState<string | null>(null);
  const merkez = () => setEkran('merkez');

  if (ekran === 'tani' && tani) return <>{tani(merkez)}</>;
  if (typeof ekran === 'number') {
    const a = asamalar[ekran];
    return (
      <SecimOyunu key={`a${ekran}`} oyunId={`${id}${ekran}`} sayacAdi={`${baslik} (${a.ad})`} baslik={`${baslik} · ${a.ad}`} emoji={emoji} onBack={merkez}
        secenekSayilari={[a.secenek]} turlariKur={a.turlar}
        onBitti={(dogru, toplam) => {
          const gecti = dogru >= GECME;
          if (ikinciBasarisizlik(`${anahtar}_hata${ekran}`, gecti) && gecilen === ekran) {
            if (ekran > 0) { setGecilen(ekran - 1); try { localStorage.setItem(anahtar, String(ekran - 1)); } catch { /* yok say */ } }
            setSonuc(GERI_MESAJ(ekran === 0)); setEkran(ekran === 0 && tani ? 'tani' : 'merkez');
            return;
          }
          if (gecti && gecilen <= ekran) { setGecilen(ekran + 1); try { localStorage.setItem(anahtar, String(ekran + 1)); } catch { /* yok say */ } }
          const sonraki = asamalar[ekran + 1];
          setSonuc(gecti
            ? `✅ ${a.ad} geçildi (${dogru}/${toplam}). ${sonraki ? `Sıradaki: ${sonraki.ad}.` : 'Karışık açıldı.'}`
            : `${a.ad}: ${dogru}/${toplam}. Geçmek için ${GECME} gerekiyor; bir daha çalışalım.`);
        }} />
    );
  }
  if (ekran === 'karisik') return (
    <SecimOyunu key="karisik" oyunId={`${id}Karisik`} sayacAdi={`${baslik} (Karışık)`} baslik={`${baslik} · Karışık`} emoji={emoji} onBack={merkez}
      secenekSayilari={[karisik.secenek]} turlariKur={karisik.turlar} />
  );

  const kart = 'w-full flex items-center gap-3 rounded-3xl bg-white p-4 shadow-md text-left active:scale-[.98] transition-transform disabled:opacity-45';
  const hepsi = gecilen >= asamalar.length;
  return (
    <OyunCercevesi baslik={baslik} emoji={emoji} onBack={onBack}>
      <div className="absolute inset-0 overflow-y-auto px-3 pb-6 space-y-3 pt-2 max-w-xl mx-auto">
        <p className="px-2 text-sm text-slate-600">{aciklama}</p>
        {sonuc && <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 px-4 py-2 text-center font-bold text-amber-900">{sonuc}</div>}
        {tani && (
          <button className={kart} onClick={() => setEkran('tani')}>
            <span className="text-4xl">📖</span>
            <span><span className="block text-xl font-black text-slate-800">Tanı</span><span className="text-sm text-slate-500">{taniAlt}</span></span>
          </button>
        )}
        {asamalar.map((a, i) => {
          const durum = gecilen > i ? '✅ Geçildi' : gecilen === i ? 'Sıradaki' : '🔒 Önce bir önceki';
          return (
            <button key={i} className={kart} disabled={gecilen < i} onClick={() => { setSonuc(null); setEkran(i); }}>
              <span className="w-10 shrink-0 text-center text-2xl font-black text-sky-600">{i + 1}</span>
              <span><span className="block text-xl font-black text-slate-800">{a.ad}</span><span className="text-sm text-slate-500">{a.alt} · {durum}</span></span>
            </button>
          );
        })}
        <button className={kart} disabled={!hepsi} onClick={() => { setSonuc(null); setEkran('karisik'); }}>
          <span className="text-4xl">🔀</span>
          <span><span className="block text-xl font-black text-slate-800">Karışık</span>
            <span className="text-sm text-slate-500">{hepsi ? karisik.alt : 'Bütün aşamalar geçilince açılır'}</span></span>
        </button>
        <button className={kart} onClick={onSorular}>
          <span className="text-4xl">❓</span>
          <span><span className="block text-xl font-black text-slate-800">Hızlı Sorular</span><span className="text-sm text-slate-500">Eski 8 soru</span></span>
        </button>
        <p className="px-2 text-xs text-slate-500">Her aşama 10 soru; {GECME}'i ilk denemede doğru olunca sıradaki açılır.</p>
      </div>
    </OyunCercevesi>
  );
};

export default AsamaliCalisma;
