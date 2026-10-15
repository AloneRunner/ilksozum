import React from 'react';
import KonumSahnesi, { TUM_HEDEFLER } from './KonumSahnesi.tsx';

// Nesneyi Yerleştir (Kaan, 2026-10-13): fotoğraf/ızgara yerine çizimli masa; nesne söylenen yere konur.
// Sahne motoru KonumSahnesi'nde (Kutu Oyunu ile ortak).
// Masa (üstüne/altına/soluna/sağına), ağaç (önüne/arkasına) ve iki kutu (arasına); kutu içi/dışı Kutu Oyunu'nda
const YERLER = TUM_HEDEFLER.filter((h) => !h.startsWith('kutu-'));

interface Props { currentCard: number; totalCards: number; onAdvance: (correct: boolean) => void; onBack: () => void; }

const NesneYerlestir: React.FC<Props> = (p) => (
  <KonumSahnesi {...p} baslik="Nesneyi Yerleştir" emoji="📍" havuz={YERLER} />
);

export default NesneYerlestir;
