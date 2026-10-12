import React from 'react';
import KonumSahnesi, { MASA_HEDEFLERI } from './KonumSahnesi.tsx';

// Nesneyi Yerleştir (Kaan, 2026-10-13): fotoğraf/ızgara yerine çizimli masa; nesne masanın üstüne / altına / soluna / sağına konur.
// Sahne motoru KonumSahnesi'nde (Kutu Oyunu ile ortak); burada yalnız masa yerleri kullanılır.
interface Props { currentCard: number; totalCards: number; onAdvance: (correct: boolean) => void; onBack: () => void; }

const NesneYerlestir: React.FC<Props> = (p) => (
  <KonumSahnesi {...p} baslik="Nesneyi Yerleştir" emoji="📍" havuz={MASA_HEDEFLERI} />
);

export default NesneYerlestir;
