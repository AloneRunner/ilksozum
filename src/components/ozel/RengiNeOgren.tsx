import React, { useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { colorRecognitionDataYeni } from '../../services/database/activities/yeni/renkTanimaData.ts';
import type { ColorRecognitionRound } from '../../services/database/activities/reasoning/colorRecognitionData.ts';
import { renkSiklari, sikTonu, renkEtiketi } from '../../data/rengiNe.ts';
import { SecimOyunu, karistir, ikinciBasarisizlik, GERI_MESAJ, KARISIK_GECME, kavramTamamla, kavramTamamMi, TamamRozeti, type Tur } from './ozelOrtak.tsx';
import { speak } from '../../services/speechService.ts';

// Rengi Ne? çalışması (Gökhan Hoca, 2026-10-29): 2 şık (10 soru) → 3 şık (10) → 4 şık (10) → karışık (25, art arda aynı renk yok).
// Her aşamanın 10 sorusu 30 fotoğraftan her seferinde yeniden seçilir (ezber olmasın); 8/10 ilk denemede doğru olmadan sonrakine geçilmez.
// Eski 8 soruluk "Rengi Ne?" Hızlı Sorular olarak durur; Program Modu onu kullanmaya devam eder.
const SORU = 10, KARISIK = 25, GECME = 8;
const ASAMALAR = [2, 3, 4];
const HAVUZ = colorRecognitionDataYeni;

const profil = () => { try { return JSON.parse(localStorage.getItem('activeProfileId_v1') || 'null') || 'misafir'; } catch { return 'misafir'; } };
const ANAHTAR = () => `rengiNe_${profil()}`;
const oku = (): number => { try { return Number(localStorage.getItem(ANAHTAR())) || 0; } catch { return 0; } };

const Dugme: React.FC<{ renk: string; tur: ColorRecognitionRound }> = ({ renk, tur }) => (
  <span className="flex h-24 sm-landscape:h-16 w-full items-end justify-center pb-2 border-b border-slate-200" style={{ background: sikTonu(renk, tur) }}>
    <span className="rounded-full bg-white/90 px-3 py-0.5 text-sm font-black text-slate-700 shadow-sm">{renkEtiketi(renk)}</span>
  </span>
);
const tur = (r: ColorRecognitionRound, n: number): Tur => ({
  soru: r.speech!.tr.question, gorsel: r.imageUrl, dogruId: r.correctColor, dogruSoz: r.speech!.tr.correct,
  secenekler: renkSiklari(r, n).map((renk) => ({ id: renk, icerik: <Dugme renk={renk} tur={r} /> })),
});

type Ekran = { ad: 'merkez' } | { ad: 'tani' } | { ad: 'asama'; i: number } | { ad: 'karisik' };
const buyuk = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);
export const tanimCumle = (r: ColorRecognitionRound) => `${buyuk(r.word)} ${r.correctColor}.`;

// Tanı: renk renk fotoğraflar; dokununca "Muz sarı." (1. aşamada iki kez takılınca buraya dönülür)
const Tani: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const renkler = [...new Set(HAVUZ.map((r) => r.correctColor))];
  return (
    <OyunCercevesi baslik="Rengi Ne?" emoji="🍌" onBack={onBack} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        {renkler.map((renk) => (
          <div key={renk} className="w-full max-w-4xl mx-auto rounded-3xl bg-white p-2 shadow-lg">
            <div className="flex items-center gap-2 px-1 pb-1">
              <span className="h-6 w-6 rounded-full border border-slate-300" style={{ background: sikTonu(renk) }} />
              <span className="text-xl font-black text-slate-800">{renkEtiketi(renk)}</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 landscape:grid-cols-6 gap-2">
              {HAVUZ.filter((r) => r.correctColor === renk).map((r) => (
                <button key={r.id} onClick={() => speak(tanimCumle(r))} className="rounded-2xl active:scale-95">
                  <img src={r.imageUrl} alt="" draggable={false} className="w-full aspect-square object-contain rounded-2xl bg-white" />
                  <span className="block text-sm font-bold text-slate-700">{r.word}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </OyunCercevesi>
  );
};

const RengiNeOgren: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => {
  const [gecilen, setGecilen] = useState(oku);
  const [ekran, setEkran] = useState<Ekran>({ ad: 'merkez' });
  const [sonuc, setSonuc] = useState<string | null>(null);
  const [tamam, setTamam] = useState(() => kavramTamamMi('rengiNe'));
  const merkez = () => setEkran({ ad: 'merkez' });

  if (ekran.ad === 'tani') return <Tani onBack={merkez} />;
  if (ekran.ad === 'asama') {
    const sik = ASAMALAR[ekran.i];
    return (
      <SecimOyunu key={`a${ekran.i}`} oyunId={`rengiNe${sik}`} sayacAdi={`Rengi Ne? (${sik} şık)`} baslik={`Rengi Ne? · ${sik} renk`} emoji="🍌" onBack={merkez}
        secenekSayilari={[sik]} turlariKur={() => karistir(HAVUZ).slice(0, SORU).map((r) => tur(r, sik))}
        onBitti={(dogru) => {
          const gecti = dogru >= GECME;
          if (ikinciBasarisizlik(`${ANAHTAR()}_hata_${ekran.i}`, gecti) && gecilen === ekran.i) {
            if (ekran.i > 0) { setGecilen(ekran.i - 1); try { localStorage.setItem(ANAHTAR(), String(ekran.i - 1)); } catch { /* yok say */ } }
            setSonuc(GERI_MESAJ(ekran.i === 0)); setEkran(ekran.i === 0 ? { ad: 'tani' } : { ad: 'merkez' });
            return;
          }
          if (gecti && gecilen <= ekran.i) { setGecilen(ekran.i + 1); try { localStorage.setItem(ANAHTAR(), String(ekran.i + 1)); } catch { /* yok say */ } }
          setSonuc(gecti
            ? (ekran.i === 2 ? `🎉 4 renk de geçildi (${dogru}/${SORU}). Karışık açıldı.` : `✅ ${sik} renk geçildi (${dogru}/${SORU}). Sıradaki: ${sik + 1} renk.`)
            : `${sik} renk: ${dogru}/${SORU}. Geçmek için ${GECME} gerekiyor; bir daha çalışalım.`);
        }} />
    );
  }

  if (ekran.ad === 'karisik') return (
    <SecimOyunu key="karisik" oyunId="rengiNeKarisik" sayacAdi="Rengi Ne? (Karışık)" baslik="Rengi Ne? · Karışık" emoji="🍌" onBack={merkez}
      secenekSayilari={[4]}
      onBitti={(dogru, toplam) => {
        if (dogru >= Math.ceil(toplam * KARISIK_GECME)) { kavramTamamla('rengiNe'); setTamam(true); setSonuc(`🏅 Karışık: ${dogru}/${toplam}. Rengi Ne? tamamlandı!`); }
        else setSonuc(`Karışık: ${dogru}/${toplam}. Tamamlamak için ${Math.ceil(toplam * KARISIK_GECME)} gerekiyor; bir daha deneyelim.`);
      }}
      turlariKur={(n) => {
        // Art arda aynı renk sorulmaz; havuz bitince yeniden karışır
        const sira: ColorRecognitionRound[] = [];
        let kalan = karistir(HAVUZ);
        while (sira.length < KARISIK) {
          if (!kalan.length) kalan = karistir(HAVUZ);
          const i = kalan.findIndex((r) => r.correctColor !== sira[sira.length - 1]?.correctColor);
          sira.push(...kalan.splice(i < 0 ? 0 : i, 1));
        }
        return sira.map((r) => tur(r, n));
      }} />
  );

  const kart = 'w-full flex items-center gap-3 rounded-3xl bg-white p-4 shadow-md text-left active:scale-[.98] transition-transform disabled:opacity-45';
  return (
    <OyunCercevesi baslik="Rengi Ne?" emoji="🍌" onBack={onBack}>
      <div className="absolute inset-0 overflow-y-auto px-3 pb-6 space-y-3 pt-2 max-w-xl mx-auto">
        {tamam && <TamamRozeti ad="Rengi Ne?" />}
        <p className="px-2 text-sm text-slate-600">Muz sarı, havuç turuncu… Fotoğraftaki nesnenin rengini bul. Önce 2 renk arasından, sonra 3 ve 4.</p>
        {sonuc && <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 px-4 py-2 text-center font-bold text-amber-900">{sonuc}</div>}
        <button className={kart} onClick={() => setEkran({ ad: 'tani' })}>
          <span className="text-4xl">📖</span>
          <span><span className="block text-xl font-black text-slate-800">Tanı</span><span className="text-sm text-slate-500">Renk renk fotoğraflar, dokun ve dinle</span></span>
        </button>
        {ASAMALAR.map((sik, i) => {
          const durum = gecilen > i ? '✅ Geçildi' : gecilen === i ? 'Sıradaki' : '🔒 Önce bir önceki';
          return (
            <button key={sik} className={kart} disabled={gecilen < i} onClick={() => { setSonuc(null); setEkran({ ad: 'asama', i }); }}>
              <span className="text-3xl w-10 text-center">{['2️⃣', '3️⃣', '4️⃣'][i]}</span>
              <span><span className="block text-xl font-black text-slate-800">{sik} renk</span><span className="text-sm text-slate-500">{SORU} soru · {durum}</span></span>
            </button>
          );
        })}
        <button className={kart} disabled={gecilen < 3} onClick={() => { setSonuc(null); setEkran({ ad: 'karisik' }); }}>
          <span className="text-4xl">🔀</span>
          <span><span className="block text-xl font-black text-slate-800">Karışık</span>
            <span className="text-sm text-slate-500">{gecilen >= 3 ? `${KARISIK} soru, her soru farklı renk` : '4 renk geçilince açılır'}</span></span>
        </button>
        <button className={kart} onClick={onSorular}>
          <span className="text-4xl">❓</span>
          <span><span className="block text-xl font-black text-slate-800">Hızlı Sorular</span><span className="text-sm text-slate-500">8 soru, 4 renk arasından</span></span>
        </button>
        <p className="px-2 text-xs text-slate-500">Her aşamada sorular {HAVUZ.length} fotoğraftan yeniden seçilir (ezberlenmesin). 10 sorunun {GECME}'i ilk denemede doğru olunca sıradaki açılır.</p>
      </div>
    </OyunCercevesi>
  );
};

export default RengiNeOgren;
