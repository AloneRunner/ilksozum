import React, { useState } from 'react';
import { OyunCercevesi } from '../oyunKiti/OyunKiti.tsx';
import SaatYuzu from './SaatYuzu.tsx';
import type { Saat } from './saatDil.ts';
import { SaatSoru, SaatKur, SaatTani, SerbestSaat, type SoruTuru, type KurTuru } from './SaatEkranlari.tsx';

// Saat Merkezi (Gökhan Hoca, 2026-10-27): "Saatler tek başına en az 8-10 farklı sayfa çıkar; hepsi ayrı sekmede olursa
// karışıklık olmaz." Tanıma → saat kaç → saati kur sırasıyla. Kavram menüsündeki "Saat" kartı ve Sayılar beceri menüsü buraya gelir;
// Program Modu eski "Hangi saat üçü gösteriyor?" sorularını kullanmaya devam eder.
type Sekme = 'tani' | 'serbest' | SoruTuru | KurTuru;
interface Kart { id: Sekme; baslik: string; alt: string; saat: Saat }
const BOLUMLER: { ad: string; kartlar: Kart[] }[] = [
  { ad: 'Saati tanı', kartlar: [
    { id: 'tani', baslik: 'Akrep ve Yelkovan', alt: 'Kısa kırmızı, uzun mavi', saat: { h: 3, m: 0 } },
    { id: 'serbest', baslik: 'Saatle Oyna', alt: 'Çevir, saati dinle', saat: { h: 10, m: 10 } },
  ] },
  { ad: 'Saat kaç?', kartlar: [
    { id: 'tam', baslik: 'Tam Saatler', alt: 'Saat üç', saat: { h: 3, m: 0 } },
    { id: 'bucuk', baslik: 'Buçuklar', alt: 'Saat üç buçuk', saat: { h: 3, m: 30 } },
    { id: 'ceyrekGecer', baslik: 'Çeyrek Geçiyor', alt: 'Üçü çeyrek geçiyor', saat: { h: 3, m: 15 } },
    { id: 'ceyrekVar', baslik: 'Çeyrek Var', alt: 'Dörde çeyrek var', saat: { h: 3, m: 45 } },
    { id: 'karisik', baslik: 'Karışık', alt: 'Tam, buçuk, çeyrek', saat: { h: 8, m: 30 } },
    { id: 'dijital', baslik: 'Dijital Saat', alt: '03:15 hangisi?', saat: { h: 3, m: 15 } },
  ] },
  { ad: 'Saati kur', kartlar: [
    { id: 'kurTam', baslik: 'Tam Saati Kur', alt: 'Akrebi çevir', saat: { h: 7, m: 0 } },
    { id: 'kurCeyrek', baslik: 'Buçuk, Çeyrek Kur', alt: 'İbreleri çevir', saat: { h: 7, m: 15 } },
  ] },
];

const SaatMerkezi: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [sekme, setSekme] = useState<Sekme | null>(null);
  const geri = () => setSekme(null);

  switch (sekme) {
    case 'tani': return <SaatTani onBack={geri} />;
    case 'serbest': return <SerbestSaat onBack={geri} />;
    case 'kurTam': case 'kurCeyrek': return <SaatKur key={sekme} tur={sekme} onBack={geri} />;
    case null: break;
    default: return <SaatSoru key={sekme} tur={sekme} onBack={geri} />;
  }

  return (
    <OyunCercevesi baslik="Saat" emoji="🕒" onBack={onBack}>
      <div className="absolute inset-0 overflow-y-auto px-3 pb-6">
        {BOLUMLER.map(b => (
          <section key={b.ad} className="mt-3">
            <h2 className="px-1 mb-2 text-lg font-black text-slate-600">{b.ad}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {b.kartlar.map(k => (
                <button key={k.id} onClick={() => setSekme(k.id)}
                  className="flex flex-col items-center gap-1 rounded-3xl bg-white p-3 shadow-md active:scale-95 transition-transform">
                  <SaatYuzu saat={k.saat} className="w-20 h-20 pointer-events-none" />
                  <span className="text-base font-black text-slate-800 text-center leading-tight">{k.baslik}</span>
                  <span className="text-xs font-semibold text-slate-500 text-center">{k.alt}</span>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>
    </OyunCercevesi>
  );
};

export default SaatMerkezi;
