// Farkları Bul (Kaan, 2026-10-29): sahneler kodla çizilir; iki resim aynı çizimden, yalnız seçilen ayarlarla ayrılır.
// Her nesne SVG metni döndüren saf bir fonksiyon (uygulamada ve node betiklerinde aynı kod).
// Tarz: düz renkler, kalın koyu çizgi, çocuk kitabı.

export const CIZGI = '#2d3748';
const c = (s: number) => `stroke="${CIZGI}" stroke-width="${s}" stroke-linejoin="round" stroke-linecap="round"`;
const K = c(4);

export const gunes = (x: number, y: number, r: number, renk = '#fcd34d', isinlar = true) => {
  const isin = isinlar ? Array.from({ length: 8 }, (_, i) => {
    const a = (i * 45) * Math.PI / 180, r1 = r + 10, r2 = r + 26;
    return `<line x1="${x + r1 * Math.cos(a)}" y1="${y + r1 * Math.sin(a)}" x2="${x + r2 * Math.cos(a)}" y2="${y + r2 * Math.sin(a)}" ${c(5)} />`;
  }).join('') : '';
  return `${isin}<circle cx="${x}" cy="${y}" r="${r}" fill="${renk}" ${K}/>`;
};

export const bulut = (x: number, y: number, o = 1) =>
  `<g transform="translate(${x} ${y}) scale(${o})"><path d="M-40 10 a22 22 0 0 1 10-36 a28 28 0 0 1 50-6 a22 22 0 0 1 28 30 a16 16 0 0 1-8 22 h-72 a14 14 0 0 1-8-10z" fill="#ffffff" ${K}/></g>`;

export const agac = (x: number, y: number, elmalar: number, elmaRenk = '#ef4444') => {
  const yerler = [[-28, -118], [22, -132], [34, -96], [-6, -92], [-40, -150]];
  const elma = yerler.slice(0, elmalar).map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="9" fill="${elmaRenk}" ${c(3)}/>`).join('');
  return `<path d="M${x - 14} ${y} L${x - 10} ${y - 80} L${x + 10} ${y - 80} L${x + 14} ${y} Z" fill="#a16207" ${K}/>`
    + `<path d="M${x} ${y - 78} C${x - 95} ${y - 70} ${x - 85} ${y - 190} ${x - 20} ${y - 175} C${x} ${y - 215} ${x + 70} ${y - 200} ${x + 62} ${y - 150} C${x + 105} ${y - 120} ${x + 70} ${y - 70} ${x} ${y - 78} Z" fill="#4ade80" ${K}/>`
    + elma;
};

export const bank = (x: number, y: number, citalar = 3) => {
  const cita = Array.from({ length: citalar }, (_, i) => `<rect x="${x}" y="${y + i * 14}" width="110" height="10" rx="3" fill="#b45309" ${c(3)}/>`).join('');
  return `<rect x="${x + 8}" y="${y + 30}" width="8" height="40" fill="#78350f" ${c(3)}/><rect x="${x + 94}" y="${y + 30}" width="8" height="40" fill="#78350f" ${c(3)}/>${cita}`;
};

export const kaydirak = (x: number, y: number, renk = '#facc15') =>
  `<path d="M${x} ${y} L${x} ${y - 110}" ${c(6)}/><path d="M${x + 26} ${y} L${x + 26} ${y - 110}" ${c(6)}/>`
  + [0, 1, 2, 3].map(i => `<line x1="${x}" y1="${y - 20 - i * 25}" x2="${x + 26}" y2="${y - 20 - i * 25}" ${c(4)}/>`).join('')
  + `<path d="M${x + 26} ${y - 110} L${x + 46} ${y - 110} L${x + 130} ${y - 8} L${x + 112} ${y} Z" fill="${renk}" ${K}/>`;

export const top = (x: number, y: number, r: number, renk = '#ef4444') =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${renk}" ${K}/><path d="M${x - r} ${y} Q${x} ${y - r * 0.8} ${x + r} ${y}" fill="none" stroke="#fff" stroke-width="4"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" ${K}/>`;

export const kopek = (x: number, y: number, kuyruk = true, benek = true, ayna = false) =>
  `<g transform="translate(${x} ${y}) scale(${ayna ? -1 : 1} 1)">`
  + (kuyruk ? `<path d="M-38 -30 Q-60 -55 -50 -62" fill="none" ${c(6)}/>` : '')
  + `<rect x="-22" y="-12" width="9" height="22" rx="4" fill="#d97706" ${c(3)}/><rect x="16" y="-12" width="9" height="22" rx="4" fill="#d97706" ${c(3)}/>`
  + `<ellipse cx="0" cy="-26" rx="42" ry="22" fill="#f59e0b" ${K}/>`
  + (benek ? `<ellipse cx="-8" cy="-30" rx="11" ry="8" fill="#92400e"/>` : '')
  + `<circle cx="40" cy="-52" r="20" fill="#f59e0b" ${K}/><ellipse cx="30" cy="-62" rx="8" ry="15" fill="#92400e" ${c(3)} transform="rotate(25 30 -62)"/>`
  + `<circle cx="46" cy="-56" r="3.5" fill="${CIZGI}"/><circle cx="58" cy="-48" r="4" fill="${CIZGI}"/><path d="M44 -42 Q50 -38 56 -42" fill="none" ${c(3)}/></g>`;

export const ucurtma = (x: number, y: number, renk = '#a855f7', fiyonk = 3) =>
  `<path d="M${x} ${y - 40} L${x + 30} ${y} L${x} ${y + 44} L${x - 30} ${y} Z" fill="${renk}" ${K}/><path d="M${x} ${y - 40} L${x} ${y + 44} M${x - 30} ${y} L${x + 30} ${y}" ${c(3)}/>`
  + `<path d="M${x} ${y + 44} Q${x - 20} ${y + 80} ${x + 6} ${y + 110} Q${x + 30} ${y + 140} ${x + 4} ${y + 170}" fill="none" ${c(3)}/>`
  + [[-12, 70], [12, 105], [-6, 140]].slice(0, fiyonk).map(([dx, dy]) => `<path d="M${x + dx - 9} ${y + dy - 7} L${x + dx + 9} ${y + dy + 7} M${x + dx - 9} ${y + dy + 7} L${x + dx + 9} ${y + dy - 7}" stroke="#f43f5e" stroke-width="6" stroke-linecap="round"/>`).join('');

export const cicek = (x: number, y: number, renk = '#f472b6') =>
  `<path d="M${x} ${y} L${x} ${y - 34}" stroke="#16a34a" stroke-width="5" stroke-linecap="round"/><path d="M${x} ${y - 14} Q${x + 14} ${y - 22} ${x + 16} ${y - 10}" fill="#4ade80" ${c(3)}/>`
  + [0, 72, 144, 216, 288].map(a => { const r = a * Math.PI / 180; return `<circle cx="${x + 9 * Math.cos(r)}" cy="${y - 42 + 9 * Math.sin(r)}" r="8" fill="${renk}" ${c(3)}/>`; }).join('')
  + `<circle cx="${x}" cy="${y - 42}" r="6" fill="#fde047" ${c(3)}/>`;

export const kus = (x: number, y: number, renk = '#38bdf8', ayna = false) =>
  `<g transform="translate(${x} ${y}) scale(${ayna ? -1 : 1} 1)"><ellipse cx="0" cy="0" rx="18" ry="13" fill="${renk}" ${K}/><circle cx="14" cy="-10" r="9" fill="${renk}" ${K}/>`
  + `<path d="M22 -10 L31 -7 L22 -4 Z" fill="#fb923c" ${c(2)}/><circle cx="16" cy="-12" r="2.5" fill="${CIZGI}"/><path d="M-6 -2 Q-2 -14 8 -4" fill="none" ${c(3)}/><path d="M-18 0 L-28 -6 L-26 6 Z" fill="${renk}" ${c(3)}/></g>`;

export const copKutusu = (x: number, y: number, kapak = true, renk = '#22c55e') =>
  `<path d="M${x - 20} ${y - 50} L${x + 20} ${y - 50} L${x + 16} ${y} L${x - 16} ${y} Z" fill="${renk}" ${K}/>`
  + `<path d="M${x - 8} ${y - 40} L${x - 6} ${y - 10} M${x + 8} ${y - 40} L${x + 6} ${y - 10}" ${c(3)}/>`
  + (kapak ? `<rect x="${x - 25}" y="${y - 60}" width="50" height="10" rx="4" fill="${renk}" ${K}/>` : '');

export const kelebek = (x: number, y: number, renk = '#fb923c') =>
  `<ellipse cx="${x - 11}" cy="${y - 6}" rx="11" ry="9" fill="${renk}" ${c(3)}/><ellipse cx="${x + 11}" cy="${y - 6}" rx="11" ry="9" fill="${renk}" ${c(3)}/>`
  + `<ellipse cx="${x - 8}" cy="${y + 7}" rx="8" ry="6" fill="${renk}" ${c(3)}/><ellipse cx="${x + 8}" cy="${y + 7}" rx="8" ry="6" fill="${renk}" ${c(3)}/>`
  + `<rect x="${x - 2.5}" y="${y - 14}" width="5" height="26" rx="2.5" fill="${CIZGI}"/>`;

// Yıldız / deniz yıldızı köşe noktaları (5 kollu)
export const denizYildiziNoktalari = (x: number, y: number, r: number) =>
  Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; return `${x + rr * Math.cos(a)},${y + rr * Math.sin(a)}`; }).join(' ');

export const svg = (icerik: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">${icerik}</svg>`;
