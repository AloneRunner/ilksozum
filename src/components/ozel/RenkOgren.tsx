import React, { useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { RENKLER, RENK_GRUPLARI, RENK_KODU, NESNELER, renkliUrl, renkliAdCumle, renkSoru, renkDogru, type Renk } from '../../data/renkGorselleri.ts';
import { SecimOyunu, karistir, zar, konus, ikinciBasarisizlik, GERI_MESAJ, KARISIK_GECME, kavramTamamla, kavramTamamMi, TamamRozeti, type Tur } from './ozelOrtak.tsx';

// Renk Öğren (Gökhan Hoca, 2026-10-29): Kelime Öğren'deki gibi önce tanıma, sonra çalışılan renk hep aynı kalır,
// öteki renkler değişir: 2 renk (10 soru) → 3 renk (10) → 4 renk (10). Aşama, 10 sorunun en az 8'i ilk denemede
// doğruysa geçilir. Sonunda karışık: öğrenilen renkler, art arda aynı renk sorulmaz. Şıklar hep aynı nesne (renk dışında ipucu yok).
// Eski Renkler soruları "Hızlı Sorular" olarak durur; Program Modu onları kullanmaya devam eder.
const AsamaSoru = 10, KARISIK = 20, GECME = 8;
const ASAMALAR = [2, 3, 4];
const buyuk = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

const profil = () => { try { return JSON.parse(localStorage.getItem('activeProfileId_v1') || 'null') || 'misafir'; } catch { return 'misafir'; } };
const ANAHTAR = () => `renkOgren_${profil()}`;
type Kayit = Partial<Record<Renk, number>>; // renk → geçilen aşama sayısı (3 = öğrenildi)
const oku = (): Kayit => { try { return JSON.parse(localStorage.getItem(ANAHTAR()) || '{}'); } catch { return {}; } };
const yaz = (k: Kayit) => { try { localStorage.setItem(ANAHTAR(), JSON.stringify(k)); } catch { /* yok say */ } };

// Öteki şıklar önce aynı gruptan, sonra önceki gruplardan, en son sonraki gruplardan (Gökhan Hoca'nın grup sırası)
const grupNo = (r: Renk) => RENK_GRUPLARI.findIndex((g) => (g as readonly string[]).includes(r));
const tur = (renk: Renk, sik: number): Tur => {
  const nesne = NESNELER[zar(NESNELER.length)];
  const g = grupNo(renk);
  const kat = (r: Renk) => (grupNo(r) === g ? 0 : grupNo(r) < g ? 1 : 2);
  const digerleri = karistir(RENKLER.filter((r) => r !== renk)).sort((a, b) => kat(a) - kat(b));
  const renkler = karistir([renk, ...digerleri.slice(0, sik - 1)]);
  return { soru: renkSoru(nesne, renk), dogruId: renk, dogruSoz: renkDogru(nesne, renk), secenekler: renkler.map((r) => ({ id: r, url: renkliUrl(nesne, r) })) };
};

type Ekran = { ad: 'merkez' } | { ad: 'tani' } | { ad: 'asama'; i: number } | { ad: 'karisik' };

const RenkOgren: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => {
  const [kayit, setKayit] = useState<Kayit>(oku);
  const [renk, setRenk] = useState<Renk>(() => RENKLER.find((r) => (oku()[r] || 0) < 3) || RENKLER[0]);
  const [ekran, setEkran] = useState<Ekran>({ ad: 'merkez' });
  const [sonuc, setSonuc] = useState<string | null>(null);
  const [tamam, setTamam] = useState(() => kavramTamamMi('renkOgren'));
  const gecilen = kayit[renk] || 0;
  const ogrenilen = RENKLER.filter((r) => (kayit[r] || 0) >= 3);
  const merkez = () => setEkran({ ad: 'merkez' });

  if (ekran.ad === 'tani') return (
    <OyunCercevesi baslik={buyuk(renk)} emoji="🎨" onBack={merkez} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        <button onClick={() => speak(`${buyuk(renk)}.`)} className="self-center flex items-center gap-3 rounded-full bg-white px-5 py-2 shadow active:scale-95">
          <span className="h-12 w-12 rounded-full border-4 border-white shadow" style={{ background: RENK_KODU[renk] }} />
          <span className="text-3xl font-black text-slate-800">{buyuk(renk)}</span>
        </button>
        <div className="grid grid-cols-3 sm:grid-cols-4 landscape:grid-cols-6 gap-3 w-full max-w-4xl mx-auto">
          {NESNELER.map((n) => (
            <button key={n} onClick={() => speak(renkliAdCumle(n, renk))} className="rounded-3xl bg-white shadow-lg overflow-hidden active:scale-95">
              <img src={renkliUrl(n, renk)} alt="" draggable={false} className="w-full aspect-square object-contain p-1" />
              <span className="block pb-1.5 text-base font-black text-slate-800 leading-tight">{renk} {n}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={async () => { for (const n of NESNELER) await konus(renkliAdCumle(n, renk)); }} className="px-5 py-3 rounded-full bg-white shadow font-black text-slate-700 active:scale-95">🔊 Hepsini dinle</button>
          <button onClick={() => setEkran({ ad: 'asama', i: Math.min(gecilen, 2) })} className="px-5 py-3 rounded-full bg-emerald-500 text-white shadow font-black active:scale-95">▶ Çalışmaya başla</button>
        </div>
      </div>
    </OyunCercevesi>
  );

  if (ekran.ad === 'asama') {
    const sik = ASAMALAR[ekran.i];
    return (
      <SecimOyunu key={`${renk}-${ekran.i}`} oyunId={`renkOgren${sik}`} sayacAdi={`Renk Öğren (${sik} renk)`} baslik={`${buyuk(renk)} · ${sik} renk`} emoji="🎨" onBack={merkez}
        secenekSayilari={[sik]} turlariKur={() => Array.from({ length: AsamaSoru }, () => tur(renk, sik))}
        onBitti={(dogru) => {
          const gecti = dogru >= GECME;
          if (ikinciBasarisizlik(`${ANAHTAR()}_hata_${renk}_${ekran.i}`, gecti) && gecilen === ekran.i) {
            if (ekran.i > 0) { const y = { ...kayit, [renk]: ekran.i - 1 }; setKayit(y); yaz(y); }
            setSonuc(GERI_MESAJ(ekran.i === 0)); setEkran(ekran.i === 0 ? { ad: 'tani' } : { ad: 'merkez' });
            return;
          }
          if (gecti && gecilen <= ekran.i) { const y = { ...kayit, [renk]: ekran.i + 1 }; setKayit(y); yaz(y); }
          setSonuc(gecti
            ? (ekran.i === 2 ? `🎉 ${buyuk(renk)} öğrenildi! (${dogru}/${AsamaSoru})` : `✅ ${sik} renk geçildi (${dogru}/${AsamaSoru}). Sıradaki: ${sik + 1} renk.`)
            : `${sik} renk: ${dogru}/${AsamaSoru}. Geçmek için ${GECME} gerekiyor; bir daha çalışalım.`);
        }} />
    );
  }

  if (ekran.ad === 'karisik') return (
    <SecimOyunu key="karisik" oyunId="renkOgrenKarisik" sayacAdi="Renk Öğren (Karışık)" baslik="Renkler · Karışık" emoji="🎨" onBack={merkez}
      secenekSayilari={[3, 4]}
      onBitti={(dogru, toplam) => {
        const gecti = dogru >= Math.ceil(toplam * KARISIK_GECME);
        // Kavram tamamı: 10 rengin hepsi öğrenilmiş ve karışık %80
        if (gecti && ogrenilen.length === RENKLER.length) { kavramTamamla('renkOgren'); setTamam(true); setSonuc(`🏅 Karışık: ${dogru}/${toplam}. Renkler tamamlandı!`); }
        else setSonuc(gecti ? `✅ Karışık: ${dogru}/${toplam}. Bütün renkler öğrenilince Renkler tamamlanır (${ogrenilen.length}/${RENKLER.length}).`
          : `Karışık: ${dogru}/${toplam}. ${Math.ceil(toplam * KARISIK_GECME)} gerekiyor; bir daha deneyelim.`);
      }}
      turlariKur={(n) => {
        const sira: Renk[] = [];
        while (sira.length < KARISIK) { const r = ogrenilen[zar(ogrenilen.length)]; if (r !== sira[sira.length - 1]) sira.push(r); }
        return sira.map((r) => tur(r, n));
      }} />
  );

  const kart = 'w-full flex items-center gap-3 rounded-3xl bg-white p-4 shadow-md text-left active:scale-[.98] transition-transform disabled:opacity-45';
  return (
    <OyunCercevesi baslik="Renkler" emoji="🎨" onBack={onBack}>
      <div className="absolute inset-0 overflow-y-auto px-3 pb-6 space-y-3 pt-2 max-w-xl mx-auto">
        {tamam && <TamamRozeti ad="Renkler" />}
        <div className="rounded-3xl bg-white p-3 shadow-md">
          <div className="mb-2 text-sm font-bold text-slate-500">Hangi rengi çalışalım?</div>
          {RENK_GRUPLARI.map((grup, gi) => (
            <div key={gi} className="flex items-center justify-center gap-2 py-1">
              <span className="w-12 shrink-0 text-xs font-bold text-slate-400">{gi + 1}. grup</span>
              {grup.map((r) => (
                <button key={r} onClick={() => { setRenk(r); setSonuc(null); void speak(`${buyuk(r)}.`); }} aria-label={r}
                  className={`relative h-11 w-11 rounded-full border border-slate-300 shadow active:scale-95 ${r === renk ? 'ring-4 ring-slate-800 ring-offset-2' : ''}`} style={{ background: RENK_KODU[r] }}>
                  {(kayit[r] || 0) >= 3 && <span className="absolute -right-1 -top-1 rounded-full bg-white text-sm shadow">✅</span>}
                </button>
              ))}
            </div>
          ))}
          <div className="mt-2 text-center text-lg font-black text-slate-800">{buyuk(renk)}</div>
        </div>
        {sonuc && <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 px-4 py-2 text-center font-bold text-amber-900">{sonuc}</div>}
        <button className={kart} onClick={() => setEkran({ ad: 'tani' })}>
          <span className="text-4xl">📖</span>
          <span><span className="block text-xl font-black text-slate-800">Tanı</span><span className="text-sm text-slate-500">{buyuk(renk)} eşyalar, dokun ve dinle</span></span>
        </button>
        {ASAMALAR.map((sik, i) => {
          const durum = gecilen > i ? '✅ Geçildi' : gecilen === i ? 'Sıradaki' : '🔒 Önce bir önceki';
          return (
            <button key={sik} className={kart} disabled={gecilen < i} onClick={() => { setSonuc(null); setEkran({ ad: 'asama', i }); }}>
              <span className="flex w-10 shrink-0 justify-center gap-0.5">{Array.from({ length: sik }, (_, k) => <span key={k} className="h-3 w-3 rounded-full" style={{ background: k === 0 ? RENK_KODU[renk] : '#cbd5e1' }} />)}</span>
              <span><span className="block text-xl font-black text-slate-800">{sik} renk</span><span className="text-sm text-slate-500">{AsamaSoru} soru · {durum}</span></span>
            </button>
          );
        })}
        <button className={kart} disabled={ogrenilen.length < 2} onClick={() => setEkran({ ad: 'karisik' })}>
          <span className="text-4xl">🔀</span>
          <span><span className="block text-xl font-black text-slate-800">Karışık</span>
            <span className="text-sm text-slate-500">{ogrenilen.length >= 2 ? `Öğrenilen ${ogrenilen.length} renkten ${KARISIK} soru, her soru farklı renk` : 'En az 2 renk öğrenilince açılır'}</span></span>
        </button>
        <button className={kart} onClick={onSorular}>
          <span className="text-4xl">❓</span>
          <span><span className="block text-xl font-black text-slate-800">Hızlı Sorular</span><span className="text-sm text-slate-500">Bütün renklerden 8 soru</span></span>
        </button>
        <p className="px-2 text-xs text-slate-500">Her aşama 10 soru; 8'i ilk denemede doğru olunca sıradaki açılır. 4 renk de geçilince renk öğrenilmiş sayılır ✅.</p>
      </div>
    </OyunCercevesi>
  );
};

export default RenkOgren;
