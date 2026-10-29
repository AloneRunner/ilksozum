// Rengi Ne? şıkları (Gökhan Hoca, 2026-10-29: "renk düğmesi fotoğrafla ton olarak tam uyuşmalı").
// Doğru düğme o fotoğraftaki nesnenin ölçülen tonu; öteki düğmeler aynı rengin fotoğraflardaki ortalama tonu
// (hepsi "fotoğraf tonu", doğru düğme parlaklığıyla kendini belli etmesin). Fotoğrafı olmayan renk (pembe) sabit tonda.
import { RENK_TONLARI } from './renkTonlari.ts';
import { COLOR_OPTIONS, type ColorRecognitionRound } from '../services/database/activities/reasoning/colorRecognitionData.ts';
import { colorRecognitionDataYeni } from '../services/database/activities/yeni/renkTanimaData.ts';

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const ORTALAMA: Record<string, string> = (() => {
  const top: Record<string, number[][]> = {};
  for (const r of colorRecognitionDataYeni) { const t = r.imageUrl && RENK_TONLARI[r.imageUrl]; if (t) (top[r.correctColor] ||= []).push(hex(t)); }
  return Object.fromEntries(Object.entries(top).map(([renk, l]) =>
    [renk, '#' + [0, 1, 2].map((i) => Math.round(l.reduce((s, c) => s + c[i], 0) / l.length).toString(16).padStart(2, '0')).join('')]));
})();

/** Düğmenin rengi: doğru renkse fotoğrafın kendi tonu, değilse o rengin ortalama fotoğraf tonu */
export const sikTonu = (renk: string, tur?: ColorRecognitionRound): string =>
  (tur && tur.correctColor === renk && tur.imageUrl && RENK_TONLARI[tur.imageUrl]) || ORTALAMA[renk] || COLOR_OPTIONS.find((c) => c.key === renk)?.hex || '#999';

/** Doğru renk + (n-1) farklı renk, karışık; turun dışarıda tuttuğu renkler (penguende beyaz) gelmez */
export const renkSiklari = (tur: ColorRecognitionRound, n: number): string[] => {
  const diger = COLOR_OPTIONS.map((c) => c.key).filter((k) => k !== tur.correctColor && !(tur.haricRenkler || []).includes(k));
  const sec = [...diger].sort(() => Math.random() - 0.5).slice(0, n - 1);
  return [tur.correctColor, ...sec].sort(() => Math.random() - 0.5);
};

export const renkEtiketi = (renk: string) => COLOR_OPTIONS.find((c) => c.key === renk)?.label || renk;
export const acikRenk = (renk: string) => renk === 'beyaz' || renk === 'sarı';
