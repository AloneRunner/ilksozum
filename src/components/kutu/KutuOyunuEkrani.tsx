import React, { useEffect, useState } from 'react';
import { OyunCercevesi, OyunSonu } from '../oyunKiti/OyunKiti.tsx';
import KonumSahnesi, { TUM_HEDEFLER } from './KonumSahnesi.tsx';
import { etkinlikSay } from '../../services/sayac.ts';

// Kutu Oyunu (Kaan, 2026-10-13): İç/Dış kavram etkinliğinden AYRI, çizimli sahneler.
// Kutu (içine/dışına), masa (üstüne/altına/soluna/sağına), ağaç (önüne/arkasına), iki kutu (arasına).
// Kendi tur sayacı var (8 tur); sonda "Tekrar / Çık". Kavram istatistiklerine yazılmaz.
const TUR = 8;

const KutuOyunuEkrani: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [tur, setTur] = useState(1);
  const [bitti, setBitti] = useState(false);
  const [oturum, setOturum] = useState(0);
  useEffect(() => { etkinlikSay('Kutu Oyunu', 'acildi'); }, [oturum]);

  if (bitti) {
    return (
      <OyunCercevesi baslik="Kutu Oyunu" emoji="📦" onBack={onBack}>
        <OyunSonu onTekrar={() => { setTur(1); setBitti(false); setOturum((n) => n + 1); }} onBack={onBack} />
      </OyunCercevesi>
    );
  }
  return (
    <KonumSahnesi
      key={`${oturum}-${tur}`}
      baslik="Kutu Oyunu" emoji="📦"
      havuz={TUM_HEDEFLER}
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
