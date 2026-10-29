import React, { useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import { speak } from '../../services/speechService.ts';
import { SecimOyunu, karistir, zar, konus, ikinciBasarisizlik, GERI_MESAJ, type Tur } from './ozelOrtak.tsx';

// Şekil Öğren (Gökhan Hoca, 2026-10-29): gruplarla — önce daire, kare, üçgen; sonra dikdörtgen, oval, yıldız.
// Tanı: her şekil 4 örnekle (farklı renk, boyut, yön). Aşamalar 2 → 3 → 4 şık, 10'ar soru, 8/10 ile geçilir; sonra karışık 35 soru.
// Benzer şekiller (daire/oval, kare/dikdörtgen) grup aşamalarında aynı soruda yan yana gelmez; karışıkta gelir.
// Şıklarda bütün şekiller aynı boyutta ve aynı renkte (yalnız biçim ayırt edilsin). Şekiller kodla çizilir (renk/boyut/yön serbest).
// Eski "Şekiller" soruları (tanıtım turuyla) "Hızlı Sorular" olarak durur; Program Modu onları kullanır.
type Sekil = 'daire' | 'kare' | 'üçgen' | 'dikdörtgen' | 'oval' | 'yıldız' | 'kalp';
const GRUPLAR: { ad: string; sekiller: Sekil[]; dorduncu: Sekil }[] = [
  { ad: 'Daire, kare, üçgen', sekiller: ['daire', 'kare', 'üçgen'], dorduncu: 'yıldız' },      // 4 şıkta 4. şekil: benzeri olmayan
  { ad: 'Dikdörtgen, oval, yıldız, kalp', sekiller: ['dikdörtgen', 'oval', 'yıldız', 'kalp'], dorduncu: 'üçgen' }, // kalp: hoca "eklensin"
];
const HEPSI: Sekil[] = ['daire', 'kare', 'üçgen', 'dikdörtgen', 'oval', 'yıldız', 'kalp'];
const SORU = 10, KARISIK = 35, GECME = 8;
const RENKLER = ['#ef4444', '#3b82f6', '#eab308', '#16a34a', '#a855f7', '#f97316'];
const buyuk = (s: string) => s.charAt(0).toLocaleUpperCase('tr-TR') + s.slice(1);

const yildiz = (r: number, ic: number) => Array.from({ length: 10 }, (_, i) => {
  const a = (i * 36 - 90) * Math.PI / 180, u = i % 2 ? ic : r;
  return `${50 + u * Math.cos(a)},${52 + u * Math.sin(a)}`;
}).join(' ');
/** 100×100 kutuda şekil; olcek 1 = kutuyu dolduran boy, aci derece */
export const SekilCiz: React.FC<{ ad: Sekil; renk: string; olcek?: number; aci?: number; className?: string }> = ({ ad, renk, olcek = 1, aci = 0, className }) => (
  <svg viewBox="0 0 100 100" className={className} aria-label={ad} role="img">
    <g transform={`rotate(${aci} 50 50) translate(50 50) scale(${olcek}) translate(-50 -50)`} fill={renk}>
      {ad === 'daire' && <circle cx={50} cy={50} r={42} />}
      {ad === 'kare' && <rect x={12} y={12} width={76} height={76} />}
      {ad === 'üçgen' && <polygon points="50,8 94,86 6,86" />}
      {ad === 'dikdörtgen' && <rect x={4} y={26} width={92} height={48} />}
      {ad === 'oval' && <ellipse cx={50} cy={50} rx={46} ry={28} />}
      {ad === 'yıldız' && <polygon points={yildiz(46, 19)} />}
      {ad === 'kalp' && <path d="M50 88 C20 66 6 48 10 30 C14 14 34 10 50 28 C66 10 86 14 90 30 C94 48 80 66 50 88 Z" />}
    </g>
  </svg>
);
// Tanı örnekleri: renk, boyut, yön değişir (kare 45° döndürülmez: baklava gibi görünür)
const ORNEKLER: Record<Sekil, { olcek: number; aci: number }[]> = {
  'daire': [{ olcek: 1, aci: 0 }, { olcek: 0.6, aci: 0 }, { olcek: 0.8, aci: 0 }, { olcek: 0.45, aci: 0 }],
  'kare': [{ olcek: 1, aci: 0 }, { olcek: 0.6, aci: 15 }, { olcek: 0.8, aci: -10 }, { olcek: 0.45, aci: 0 }],
  'üçgen': [{ olcek: 1, aci: 0 }, { olcek: 0.65, aci: 180 }, { olcek: 0.8, aci: 90 }, { olcek: 0.5, aci: -25 }],
  'dikdörtgen': [{ olcek: 1, aci: 0 }, { olcek: 0.7, aci: 90 }, { olcek: 0.8, aci: 20 }, { olcek: 0.5, aci: 0 }],
  'oval': [{ olcek: 1, aci: 0 }, { olcek: 0.7, aci: 90 }, { olcek: 0.8, aci: -30 }, { olcek: 0.5, aci: 0 }],
  'yıldız': [{ olcek: 1, aci: 0 }, { olcek: 0.6, aci: 20 }, { olcek: 0.8, aci: -15 }, { olcek: 0.45, aci: 36 }],
  'kalp': [{ olcek: 1, aci: 0 }, { olcek: 0.6, aci: 15 }, { olcek: 0.8, aci: -20 }, { olcek: 0.45, aci: 0 }],
};

const BENZER: [Sekil, Sekil][] = [['daire', 'oval'], ['kare', 'dikdörtgen']];
const benzer = (a: Sekil, b: Sekil) => BENZER.some(([x, y]) => (a === x && b === y) || (a === y && b === x));

const turKur = (hedef: Sekil, siklar: Sekil[]): Tur => {
  const renk = RENKLER[zar(RENKLER.length)];
  return {
    soru: `Hangisi ${hedef}?`, dogruId: hedef, dogruSoz: `Evet! Bu ${hedef}.`,
    secenekler: karistir(siklar).map((s) => ({ id: s, icerik: <SekilCiz ad={s} renk={renk} className="w-full aspect-square p-4" /> })),
  };
};
// Grup aşaması: sorulan şekil + grubun öteki şekillerinden (n-1) tanesi; 4 şıkta benzeri olmayan bir şekil eklenir
const grupTurlari = (g: typeof GRUPLAR[number], n: number): Tur[] => {
  const sira: Sekil[] = [];
  while (sira.length < SORU) sira.push(...karistir(g.sekiller));
  return sira.slice(0, SORU).map((hedef) => {
    const havuz = [...g.sekiller, ...(n > g.sekiller.length ? [g.dorduncu] : [])].filter((s) => s !== hedef && !benzer(s, hedef));
    return turKur(hedef, [hedef, ...karistir(havuz).slice(0, n - 1)]);
  });
};

const profil = () => { try { return JSON.parse(localStorage.getItem('activeProfileId_v1') || 'null') || 'misafir'; } catch { return 'misafir'; } };
const ANAHTAR = () => `sekilCalis_${profil()}`;
const oku = (): number[] => { try { const v = JSON.parse(localStorage.getItem(ANAHTAR()) || '[]'); return Array.isArray(v) ? v : []; } catch { return []; } };

type Ekran = { ad: 'merkez' } | { ad: 'tani' } | { ad: 'asama'; i: number } | { ad: 'karisik' };

const SekilCalis: React.FC<{ onBack: () => void; onSorular: () => void }> = ({ onBack, onSorular }) => {
  const [gecilen, setGecilen] = useState<number[]>(oku); // grup → geçilen aşama sayısı
  const [grup, setGrup] = useState(() => ((oku()[0] || 0) >= 3 ? 1 : 0));
  const [ekran, setEkran] = useState<Ekran>({ ad: 'merkez' });
  const [sonuc, setSonuc] = useState<string | null>(null);
  const g = GRUPLAR[grup];
  const gg = gecilen[grup] || 0;
  const ikisiTamam = (gecilen[0] || 0) >= 3 && (gecilen[1] || 0) >= 3;
  const merkez = () => setEkran({ ad: 'merkez' });

  if (ekran.ad === 'tani') return (
    <OyunCercevesi baslik={g.ad} emoji="🔷" onBack={merkez} yonerge="Resme dokun, dinle.">
      <div className="absolute inset-0 flex flex-col gap-3 px-3 pb-3 overflow-y-auto">
        {g.sekiller.map((s, si) => (
          <button key={s} onClick={() => speak(`${buyuk(s)}.`)} className="w-full max-w-3xl mx-auto rounded-3xl bg-white shadow-lg p-2 active:scale-[.99]">
            <div className="text-2xl font-black text-slate-800 text-left px-2">{buyuk(s)}</div>
            <div className="grid grid-cols-4 gap-2">
              {ORNEKLER[s].map((o, k) => <SekilCiz key={k} ad={s} renk={RENKLER[(si * 2 + k) % RENKLER.length]} olcek={o.olcek} aci={o.aci} className="w-full aspect-square" />)}
            </div>
          </button>
        ))}
        <div className="flex flex-wrap justify-center gap-2">
          <button onClick={async () => { for (const s of g.sekiller) await konus(`Bu ${s}.`); }} className="px-5 py-3 rounded-full bg-white shadow font-black text-slate-700 active:scale-95">🔊 Hepsini dinle</button>
          <button onClick={() => setEkran({ ad: 'asama', i: Math.min(gg, 2) })} className="px-5 py-3 rounded-full bg-emerald-500 text-white shadow font-black active:scale-95">▶ Çalışmaya başla</button>
        </div>
        <p className="text-xs text-slate-500 text-center max-w-md mx-auto">Büyük ya da küçük, hangi renkte, hangi yöne dönük olursa olsun şeklin adı değişmez.</p>
      </div>
    </OyunCercevesi>
  );

  if (ekran.ad === 'asama') {
    const sik = ekran.i + 2;
    return (
      <SecimOyunu key={`${grup}-${ekran.i}`} oyunId={`sekilCalis${sik}`} sayacAdi={`Şekil Öğren (${sik} şık)`} baslik={`Şekiller · ${sik} şık`} emoji="🔷" onBack={merkez}
        secenekSayilari={[sik]} turlariKur={() => grupTurlari(g, sik)}
        onBitti={(dogru) => {
          const gecti = dogru >= GECME;
          if (ikinciBasarisizlik(`${ANAHTAR()}_hata_${grup}_${ekran.i}`, gecti) && gg === ekran.i) {
            if (ekran.i > 0) { const y = [...gecilen]; y[grup] = ekran.i - 1; setGecilen(y); try { localStorage.setItem(ANAHTAR(), JSON.stringify(y)); } catch { /* yok say */ } }
            setSonuc(GERI_MESAJ(ekran.i === 0)); setEkran(ekran.i === 0 ? { ad: 'tani' } : { ad: 'merkez' });
            return;
          }
          if (gecti && gg <= ekran.i) { const y = [...gecilen]; y[grup] = ekran.i + 1; setGecilen(y); try { localStorage.setItem(ANAHTAR(), JSON.stringify(y)); } catch { /* yok say */ } }
          setSonuc(gecti
            ? (ekran.i === 2 ? `🎉 ${g.ad}: öğrenildi (${dogru}/${SORU})!` : `✅ ${sik} şık geçildi (${dogru}/${SORU}). Sıradaki: ${sik + 1} şık.`)
            : `${sik} şık: ${dogru}/${SORU}. Geçmek için ${GECME} gerekiyor; bir daha çalışalım.`);
        }} />
    );
  }

  if (ekran.ad === 'karisik') return (
    <SecimOyunu key="karisik" oyunId="sekilCalisKarisik" sayacAdi="Şekil Öğren (Karışık)" baslik="Şekiller · Karışık" emoji="🔷" onBack={merkez}
      secenekSayilari={[4]}
      turlariKur={() => {
        const sira: Sekil[] = [];
        while (sira.length < KARISIK) { const s = HEPSI[zar(HEPSI.length)]; if (s !== sira[sira.length - 1]) sira.push(s); }
        return sira.map((h) => turKur(h, [h, ...karistir(HEPSI.filter((s) => s !== h)).slice(0, 3)]));
      }} />
  );

  const kart = 'w-full flex items-center gap-3 rounded-3xl bg-white p-4 shadow-md text-left active:scale-[.98] transition-transform disabled:opacity-45';
  return (
    <OyunCercevesi baslik="Şekiller" emoji="🔷" onBack={onBack}>
      <div className="absolute inset-0 overflow-y-auto px-3 pb-6 space-y-3 pt-2 max-w-xl mx-auto">
        <div className="grid grid-cols-2 gap-2">
          {GRUPLAR.map((x, i) => (
            <button key={x.ad} onClick={() => { setGrup(i); setSonuc(null); }}
              className={`rounded-3xl bg-white p-2 shadow-md active:scale-95 ${i === grup ? 'ring-4 ring-sky-500' : ''}`}>
              <div className="flex justify-center gap-1">{x.sekiller.map((s, k) => <SekilCiz key={s} ad={s} renk={RENKLER[(k + i * 3) % RENKLER.length]} className="h-10 w-10" />)}</div>
              <div className="mt-1 text-sm font-black text-slate-700">{i + 1}. grup {(gecilen[i] || 0) >= 3 ? '✅' : ''}</div>
              <div className="text-xs text-slate-500">{x.ad}</div>
            </button>
          ))}
        </div>
        {sonuc && <div className="rounded-2xl bg-amber-50 border-2 border-amber-200 px-4 py-2 text-center font-bold text-amber-900">{sonuc}</div>}
        <button className={kart} onClick={() => setEkran({ ad: 'tani' })}>
          <span className="text-4xl">📖</span>
          <span><span className="block text-xl font-black text-slate-800">Tanı</span><span className="text-sm text-slate-500">{g.ad}: her biri 4 örnekle, dokun ve dinle</span></span>
        </button>
        {[2, 3, 4].map((sik, i) => {
          const durum = gg > i ? '✅ Geçildi' : gg === i ? 'Sıradaki' : '🔒 Önce bir önceki';
          return (
            <button key={sik} className={kart} disabled={gg < i} onClick={() => { setSonuc(null); setEkran({ ad: 'asama', i }); }}>
              <span className="text-3xl w-10 text-center">{['2️⃣', '3️⃣', '4️⃣'][i]}</span>
              <span><span className="block text-xl font-black text-slate-800">{sik} şık</span><span className="text-sm text-slate-500">{SORU} soru · {durum}</span></span>
            </button>
          );
        })}
        <button className={kart} disabled={!ikisiTamam} onClick={() => { setSonuc(null); setEkran({ ad: 'karisik' }); }}>
          <span className="text-4xl">🔀</span>
          <span><span className="block text-xl font-black text-slate-800">Karışık</span>
            <span className="text-sm text-slate-500">{ikisiTamam ? `7 şekilden ${KARISIK} soru, art arda aynı şekil yok` : 'İki grup da öğrenilince açılır'}</span></span>
        </button>
        <button className={kart} onClick={onSorular}>
          <span className="text-4xl">❓</span>
          <span><span className="block text-xl font-black text-slate-800">Hızlı Sorular</span><span className="text-sm text-slate-500">Tanıtım turu ve 8 soru (kalp dahil)</span></span>
        </button>
        <p className="px-2 text-xs text-slate-500">Her aşama 10 soru; 8'i ilk denemede doğru olunca sıradaki açılır. Benzer şekiller (daire–oval, kare–dikdörtgen) gruplarda yan yana sorulmaz, karışıkta sorulur.</p>
      </div>
    </OyunCercevesi>
  );
};

export default SekilCalis;
