import React, { useState } from 'react';
import { OyunCercevesi, OyunSonu } from '../oyunKiti/OyunKiti.tsx';
import KutuIcDis from './KutuIcDis.tsx';
import { etkinlikSay } from '../../services/sayac.ts';

// Kutu Oyunu (Kaan, 2026-10-13): İç/Dış kavram etkinliğinden AYRI, çizimli kutu sahnesi.
// Kendi tur sayacı var (6 tur); sonda "Tekrar / Çık". Kavram istatistiklerine yazılmaz.
const TUR = 6;

const KutuOyunuEkrani: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [tur, setTur] = useState(1);
  const [bitti, setBitti] = useState(false);
  const [oturum, setOturum] = useState(0);

  if (bitti) {
    return (
      <OyunCercevesi baslik="Kutu Oyunu" emoji="📦" onBack={onBack}>
        <OyunSonu onTekrar={() => { setTur(1); setBitti(false); setOturum((n) => n + 1); }} onBack={onBack} />
      </OyunCercevesi>
    );
  }
  return (
    <KutuIcDis
      key={`${oturum}-${tur}`}
      baslik="Kutu Oyunu"
      currentCard={tur}
      totalCards={TUR}
      onBack={onBack}
      onAdvance={() => {
        if (tur >= TUR) { etkinlikSay('Kutu Oyunu', 'bitti'); setBitti(true); }
        else setTur((n) => n + 1);
      }}
    />
  );
};

export default KutuOyunuEkrani;
