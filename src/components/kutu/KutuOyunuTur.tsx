import React from 'react';
import KonumSahnesi, { TUM_HEDEFLER } from './KonumSahnesi.tsx';

// Kutu Oyunu (Kaan, 2026-10-13/15): gerçek bir kavram etkinliği; sonuçlar rapora, başarıma, Program Modu'na ve sayaca gider.
// Her tur bir sahne: kutu, masa, ağaç, iki kutu. Sahne motoru KonumSahnesi'nde.
interface Props { currentCard: number; totalCards: number; onAdvance: (correct: boolean) => void; onBack: () => void; }

const KutuOyunuTur: React.FC<Props> = (p) => (
  <KonumSahnesi {...p} baslik="Kutu Oyunu" emoji="📦" havuz={TUM_HEDEFLER} />
);

export default KutuOyunuTur;
