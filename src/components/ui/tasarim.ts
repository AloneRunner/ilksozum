// Tema tasarımları (Kaan, 2026-10-06: "resmen yepyeni arayüz gibi olsun").
// Sade dışındaki her tema kartları, düğmeleri ve başlıkları baştan farklı çizer.
// Ana menü, beceri menüleri ve kavram menüsü bunu kullanır; diğer ekranlar Sade arayüzle açılır.
import type { SahneId } from './ArkaPlanSahnesi.tsx';

export interface Tasarim {
  id: SahneId;
  /** Ana menü başlık kutusu ve yazıları */
  baslikKutu: string; baslikUst: string; baslikAna: string;
  /** Program Modu / Rastgele düğmeleri */
  programDugme: string; rastgeleDugme: string; modYazi: string; modAlt: string;
  /** Kart (i: sıra, grad: kartın kendi renk geçişi) */
  kart: (i: number, grad: string) => string;
  kartIkon: (i: number, grad: string) => string;
  kartBaslik: (i: number) => string; kartAlt: (i: number) => string;
  /** Ebeveyn köşesi küçük düğmeleri */
  kucukDugme: string; kucukYazi: string; bolumBaslik: string;
  /** Beceri / kavram menüsü üst şeridi */
  serit: (grad: string) => string; seritYazi: string; geriDugme: string;
  /** Kavram sekmeleri */
  sekme: (secili: boolean) => string;
  /** Etkinlik ekranı: resim kartı çerçevesi (seed: karttan karta renk), kelime etiketi, soru kutusu, panel */
  etkinlikKart: (seed: number) => string;
  etiket: string;
  soruKutu: string;
  etkinlikPanel: string;
}

const GOKKUSAGI = ['bg-rose-500 border-rose-700', 'bg-orange-500 border-orange-700', 'bg-amber-400 border-amber-600', 'bg-lime-500 border-lime-700',
  'bg-emerald-500 border-emerald-700', 'bg-sky-500 border-sky-700', 'bg-indigo-500 border-indigo-700', 'bg-fuchsia-500 border-fuchsia-700'];
const PASTEL = ['bg-rose-200', 'bg-amber-200', 'bg-lime-200', 'bg-sky-200', 'bg-violet-200', 'bg-teal-200', 'bg-orange-200', 'bg-pink-200'];

export const TASARIMLAR: Record<Exclude<SahneId, 'yok'>, Tasarim> = {
  // Orman: krem kartlar, ahşap kenar, kabartma gölge, ahşap tabela başlık
  orman: {
    id: 'orman',
    baslikKutu: 'rounded-[22px] bg-[#8b5a2b] border-b-[6px] border-[#5c3a1a] px-5 py-3 shadow-lg',
    baslikUst: 'text-amber-200 text-sm font-bold', baslikAna: 'text-amber-50 text-lg font-black tracking-wide',
    programDugme: 'rounded-[26px] bg-[#4d7c0f] border-b-[6px] border-[#365314] shadow-md',
    rastgeleDugme: 'rounded-[26px] bg-[#c2410c] border-b-[6px] border-[#7c2d12] shadow-md',
    modYazi: 'text-amber-50', modAlt: 'text-amber-100/90',
    kart: () => 'rounded-[26px] bg-[#fffaf0] border-[3px] border-[#e7d3a8] shadow-[0_6px_0_#d6bf8f] active:translate-y-1 active:shadow-[0_2px_0_#d6bf8f]',
    kartIkon: () => 'rounded-full bg-[#ecfccb] border-[3px] border-[#a3c46c]',
    kartBaslik: () => 'text-[#3f5f2a]', kartAlt: () => 'text-[#7c6a46]',
    kucukDugme: 'rounded-2xl bg-[#fffaf0] border-[3px] border-[#e7d3a8] shadow-[0_4px_0_#d6bf8f]', kucukYazi: 'text-[#5c4a2a]', bolumBaslik: 'text-[#4d3a1f]',
    serit: () => 'bg-[#8b5a2b] border-b-[6px] border-[#5c3a1a]', seritYazi: 'text-amber-50', geriDugme: 'bg-amber-50 text-[#5c3a1a]',
    sekme: (s) => s ? 'bg-[#4d7c0f] text-amber-50 border-b-4 border-[#365314] rounded-2xl' : 'bg-[#fffaf0] text-[#5c4a2a] border-2 border-[#e7d3a8] rounded-2xl',
    etkinlikKart: () => 'bg-[#fffaf0] border-[3px] border-[#e7d3a8] shadow-[0_5px_0_#d6bf8f]',
    etiket: 'bg-[#4d7c0f]/90 text-amber-50',
    soruKutu: 'bg-[#8b5a2b] text-amber-50 rounded-2xl border-b-[5px] border-[#5c3a1a] px-4 py-2 shadow-md',
    etkinlikPanel: 'bg-[#fdf6e3]/80 border-[3px] border-[#e7d3a8]',
  },
  // Deniz: buzlu cam kartlar, yuvarlak baloncuk ikonlar
  deniz: {
    id: 'deniz',
    baslikKutu: 'rounded-[30px] bg-white/45 backdrop-blur-md border border-white/70 px-5 py-3 shadow-lg shadow-sky-900/10',
    baslikUst: 'text-sky-700 text-sm font-bold', baslikAna: 'text-sky-950 text-lg font-black',
    programDugme: 'rounded-[30px] bg-gradient-to-br from-cyan-400/90 to-sky-600/90 backdrop-blur border border-white/60 shadow-lg shadow-sky-900/20',
    rastgeleDugme: 'rounded-[30px] bg-gradient-to-br from-teal-300/90 to-emerald-500/90 backdrop-blur border border-white/60 shadow-lg shadow-sky-900/20',
    modYazi: 'text-white drop-shadow', modAlt: 'text-white/90',
    kart: () => 'rounded-[30px] bg-white/55 backdrop-blur-md border border-white/80 shadow-lg shadow-sky-900/10',
    kartIkon: (_i, g) => `rounded-full bg-gradient-to-br ${g} ring-4 ring-white/70 shadow-inner`,
    kartBaslik: () => 'text-sky-950', kartAlt: () => 'text-sky-800/80',
    kucukDugme: 'rounded-3xl bg-white/55 backdrop-blur border border-white/80', kucukYazi: 'text-sky-900', bolumBaslik: 'text-sky-900',
    serit: () => 'bg-gradient-to-r from-sky-500/90 to-cyan-400/90 backdrop-blur', seritYazi: 'text-white', geriDugme: 'bg-white/80 text-sky-700',
    sekme: (s) => s ? 'bg-sky-600 text-white rounded-full shadow' : 'bg-white/60 backdrop-blur text-sky-900 rounded-full border border-white/80',
    etkinlikKart: () => 'bg-white/70 backdrop-blur-md border border-white/90 shadow-lg shadow-sky-900/10',
    etiket: 'bg-sky-600/85 backdrop-blur-sm text-white',
    soruKutu: 'bg-white/55 backdrop-blur-md border border-white/80 rounded-3xl text-sky-950 px-4 py-2 shadow-lg shadow-sky-900/10',
    etkinlikPanel: 'bg-white/35 backdrop-blur-lg border border-white/70',
  },
  // Gökkuşağı: her kart dolgun renkli şeker düğme, beyaz yazı, kabartma alt kenar
  gokkusagi: {
    id: 'gokkusagi',
    baslikKutu: 'rounded-full bg-white px-6 py-3 shadow-[0_6px_0_#e2e8f0]',
    baslikUst: 'text-rose-500 text-sm font-black', baslikAna: 'bg-gradient-to-r from-rose-500 via-amber-500 to-sky-500 bg-clip-text text-transparent text-lg font-black',
    programDugme: 'rounded-[28px] bg-emerald-500 border-b-[7px] border-emerald-700',
    rastgeleDugme: 'rounded-[28px] bg-amber-400 border-b-[7px] border-amber-600',
    modYazi: 'text-white drop-shadow-sm', modAlt: 'text-white/90',
    kart: (i) => `rounded-[28px] border-b-[7px] ${GOKKUSAGI[i % GOKKUSAGI.length]} active:translate-y-1 active:border-b-[3px]`,
    kartIkon: () => 'rounded-[22px] bg-white/25',
    kartBaslik: () => 'text-white drop-shadow-sm', kartAlt: () => 'text-white/90',
    kucukDugme: 'rounded-3xl bg-white border-b-[5px] border-slate-200', kucukYazi: 'text-slate-700', bolumBaslik: 'text-slate-700',
    serit: () => 'bg-gradient-to-r from-rose-500 via-amber-400 to-sky-500', seritYazi: 'text-white drop-shadow', geriDugme: 'bg-white text-rose-500',
    sekme: (s) => s ? 'bg-rose-500 text-white rounded-full border-b-4 border-rose-700' : 'bg-white text-slate-700 rounded-full border-b-4 border-slate-200',
    etkinlikKart: (seed) => `bg-white border-[5px] border-b-[10px] ${['border-rose-400', 'border-amber-400', 'border-lime-500', 'border-sky-400', 'border-violet-400', 'border-orange-400'][Math.abs(seed) % 6]}`,
    etiket: 'bg-rose-500 text-white',
    soruKutu: 'bg-white rounded-full border-b-[6px] border-slate-200 text-rose-600 px-5 py-2',
    etkinlikPanel: 'bg-white/45 border-4 border-white',
  },
  // Konfeti: çizgi roman / çıkartma görünüşü, kalın siyah çerçeve, sert gölge, pastel dolgu
  konfeti: {
    id: 'konfeti',
    baslikKutu: 'rounded-2xl bg-yellow-300 border-[3px] border-slate-900 px-5 py-3 shadow-[5px_5px_0_#0f172a] -rotate-1',
    baslikUst: 'text-slate-900 text-sm font-black', baslikAna: 'text-slate-900 text-lg font-black uppercase tracking-wide',
    programDugme: 'rounded-2xl bg-emerald-300 border-[3px] border-slate-900 shadow-[5px_5px_0_#0f172a]',
    rastgeleDugme: 'rounded-2xl bg-pink-300 border-[3px] border-slate-900 shadow-[5px_5px_0_#0f172a]',
    modYazi: 'text-slate-900', modAlt: 'text-slate-800',
    kart: (i) => `rounded-2xl border-[3px] border-slate-900 shadow-[5px_5px_0_#0f172a] ${PASTEL[i % PASTEL.length]} active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0_#0f172a] ${i % 2 ? 'rotate-[0.6deg]' : '-rotate-[0.6deg]'}`,
    kartIkon: () => 'rounded-xl bg-white border-[3px] border-slate-900',
    kartBaslik: () => 'text-slate-900', kartAlt: () => 'text-slate-700',
    kucukDugme: 'rounded-xl bg-white border-[3px] border-slate-900 shadow-[3px_3px_0_#0f172a]', kucukYazi: 'text-slate-900', bolumBaslik: 'text-slate-900',
    serit: () => 'bg-yellow-300 border-b-[3px] border-slate-900', seritYazi: 'text-slate-900', geriDugme: 'bg-white text-slate-900 border-[3px] border-slate-900',
    sekme: (s) => s ? 'bg-slate-900 text-yellow-300 rounded-xl border-[3px] border-slate-900' : 'bg-white text-slate-900 rounded-xl border-[3px] border-slate-900 shadow-[2px_2px_0_#0f172a]',
    etkinlikKart: () => 'bg-white border-[3px] border-slate-900 shadow-[5px_5px_0_#0f172a]',
    etiket: 'bg-yellow-300 text-slate-900 border-t-[3px] border-slate-900',
    soruKutu: 'bg-yellow-300 border-[3px] border-slate-900 shadow-[4px_4px_0_#0f172a] rounded-xl text-slate-900 px-4 py-2 -rotate-1',
    etkinlikPanel: 'bg-white/60 border-[3px] border-slate-900 shadow-[6px_6px_0_#0f172a]',
  },
};

export const tasarimAl = (sahne: SahneId | undefined): Tasarim | null => (sahne && sahne !== 'yok' ? TASARIMLAR[sahne] : null);
