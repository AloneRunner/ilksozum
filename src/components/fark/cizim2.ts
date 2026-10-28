// Farkları Bul: sahil, deniz altı, parti, kış, mutfak ve uzay nesneleri (cizim.ts ile aynı tarz).
import { CIZGI, denizYildiziNoktalari } from './cizim.ts';

const c = (s: number) => `stroke="${CIZGI}" stroke-width="${s}" stroke-linejoin="round" stroke-linecap="round"`;
const K = c(4);

export const semsiye = (x: number, y: number, renk1 = '#ef4444', renk2 = '#ffffff') => {
  const dilim = [0, 1, 2, 3].map(i => {
    const a1 = Math.PI + i * Math.PI / 4, a2 = a1 + Math.PI / 4;
    return `<path d="M${x} ${y} L${x + 90 * Math.cos(a1)} ${y + 90 * Math.sin(a1)} A90 90 0 0 1 ${x + 90 * Math.cos(a2)} ${y + 90 * Math.sin(a2)} Z" fill="${i % 2 ? renk2 : renk1}" ${K}/>`;
  }).join('');
  return `<line x1="${x}" y1="${y - 4}" x2="${x + 6}" y2="${y + 150}" ${c(6)}/>${dilim}`;
};

export const kumKale = (x: number, y: number, bayrak = true, bayrakRenk = '#ef4444') =>
  `<path d="M${x - 50} ${y} L${x - 50} ${y - 40} L${x - 38} ${y - 40} L${x - 38} ${y - 30} L${x - 26} ${y - 30} L${x - 26} ${y - 40} L${x + 26} ${y - 40} L${x + 26} ${y - 30} L${x + 38} ${y - 30} L${x + 38} ${y - 40} L${x + 50} ${y - 40} L${x + 50} ${y} Z" fill="#fcd34d" ${K}/>`
  + `<path d="M${x - 22} ${y - 40} L${x - 22} ${y - 80} L${x + 22} ${y - 80} L${x + 22} ${y - 40}" fill="#fcd34d" ${K}/><path d="M${x - 8} ${y} L${x - 8} ${y - 16} A8 8 0 0 1 ${x + 8} ${y - 16} L${x + 8} ${y}" fill="#a16207" ${c(3)}/>`
  + (bayrak ? `<line x1="${x}" y1="${y - 80}" x2="${x}" y2="${y - 115}" ${c(4)}/><path d="M${x} ${y - 115} L${x + 24} ${y - 107} L${x} ${y - 99} Z" fill="${bayrakRenk}" ${c(3)}/>` : '');

export const kova = (x: number, y: number, renk = '#3b82f6') =>
  `<path d="M${x - 22} ${y - 40} L${x + 22} ${y - 40} L${x + 16} ${y} L${x - 16} ${y} Z" fill="${renk}" ${K}/><path d="M${x - 22} ${y - 40} Q${x} ${y - 75} ${x + 22} ${y - 40}" fill="none" ${c(4)}/>`;

export const kurek = (x: number, y: number, renk = '#f97316') =>
  `<line x1="${x}" y1="${y}" x2="${x + 30}" y2="${y - 60}" ${c(5)}/><path d="M${x - 14} ${y - 4} L${x + 6} ${y + 6} L${x - 4} ${y + 30} L${x - 24} ${y + 20} Z" fill="${renk}" ${K}/>`;

export const plajTopu = (x: number, y: number, r: number, renkler = ['#ef4444', '#facc15', '#3b82f6']) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" ${K}/>`
  + renkler.map((rk, i) => `<path d="M${x} ${y - r + 3} Q${x + (i - 1) * r * 1.3} ${y} ${x} ${y + r - 3}" fill="none" stroke="${rk}" stroke-width="${r * 0.32}"/>`).join('')
  + `<circle cx="${x}" cy="${y}" r="${r}" fill="none" ${K}/>`;

export const kayik = (x: number, y: number, yelken = '#f97316', bayrak = true) =>
  `<path d="M${x - 60} ${y} L${x + 60} ${y} L${x + 40} ${y + 26} L${x - 40} ${y + 26} Z" fill="#b45309" ${K}/><line x1="${x}" y1="${y}" x2="${x}" y2="${y - 90}" ${c(5)}/>`
  + `<path d="M${x + 4} ${y - 85} L${x + 4} ${y - 8} L${x + 52} ${y - 8} Z" fill="${yelken}" ${K}/>`
  + (bayrak ? `<path d="M${x} ${y - 90} L${x - 22} ${y - 82} L${x} ${y - 74} Z" fill="#22c55e" ${c(3)}/>` : '');

export const marti = (x: number, y: number) => `<path d="M${x - 22} ${y} Q${x - 11} ${y - 14} ${x} ${y} Q${x + 11} ${y - 14} ${x + 22} ${y}" fill="none" ${c(5)}/>`;

export const yildizSekli = (x: number, y: number, r: number, renk = '#fb923c', cizgi = 4) => `<polygon points="${denizYildiziNoktalari(x, y, r)}" fill="${renk}" ${c(cizgi)}/>`;

export const yengec = (x: number, y: number, renk = '#ef4444', kiskac = 2) =>
  [-1, 1].map(s => `<path d="M${x + s * 20} ${y + 10} L${x + s * 34} ${y + 24} M${x + s * 10} ${y + 14} L${x + s * 18} ${y + 28}" ${c(4)}/>`).join('')
  + [-1, 1].slice(0, kiskac).map(s => `<path d="M${x + s * 26} ${y - 8} L${x + s * 40} ${y - 26}" ${c(4)}/><circle cx="${x + s * 44}" cy="${y - 32}" r="9" fill="${renk}" ${c(3)}/>`).join('')
  + `<ellipse cx="${x}" cy="${y}" rx="30" ry="18" fill="${renk}" ${K}/><circle cx="${x - 8}" cy="${y - 6}" r="4" fill="${CIZGI}"/><circle cx="${x + 8}" cy="${y - 6}" r="4" fill="${CIZGI}"/>`;

export const havlu = (x: number, y: number, renk = '#22d3ee', serit = 3) =>
  `<rect x="${x}" y="${y}" width="120" height="56" rx="4" fill="#ffffff" ${K}/>`
  + Array.from({ length: serit }, (_, i) => `<rect x="${x + 14 + i * 36}" y="${y}" width="18" height="56" fill="${renk}"/>`).join('')
  + `<rect x="${x}" y="${y}" width="120" height="56" rx="4" fill="none" ${K}/>`;

export const balik = (x: number, y: number, renk = '#f97316', ayna = false, s = 1) =>
  `<g transform="translate(${x} ${y}) scale(${ayna ? -s : s} ${s})"><path d="M-30 0 L-50 -18 L-50 18 Z" fill="${renk}" ${K}/><ellipse cx="0" cy="0" rx="34" ry="22" fill="${renk}" ${K}/>`
  + `<circle cx="16" cy="-5" r="5" fill="#fff" ${c(2)}/><circle cx="17" cy="-5" r="2.5" fill="${CIZGI}"/><path d="M-6 -20 Q4 -34 14 -20" fill="${renk}" ${c(3)}/></g>`;

export const kabarcik = (x: number, y: number, r: number) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#e0f2fe" fill-opacity=".7" ${c(3)}/>`;

export const yosun = (x: number, y: number, boy = 120, renk = '#16a34a') => {
  const d = `M${x} ${y} Q${x - 22} ${y - boy * 0.3} ${x} ${y - boy * 0.55} Q${x + 22} ${y - boy * 0.8} ${x} ${y - boy}`;
  return `<path d="${d}" fill="none" stroke="${CIZGI}" stroke-width="16" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${renk}" stroke-width="9" stroke-linecap="round"/>`;
};

export const sandik = (x: number, y: number, acik = false) =>
  `<rect x="${x - 45}" y="${y - 40}" width="90" height="40" rx="4" fill="#b45309" ${K}/>`
  + (acik
    ? `<path d="M${x - 45} ${y - 40} L${x - 52} ${y - 80} L${x + 38} ${y - 80} L${x + 45} ${y - 40} Z" fill="#92400e" ${K}/><circle cx="${x - 15}" cy="${y - 44}" r="9" fill="#facc15" ${c(3)}/><circle cx="${x + 8}" cy="${y - 46}" r="9" fill="#facc15" ${c(3)}/>`
    : `<path d="M${x - 45} ${y - 40} Q${x} ${y - 75} ${x + 45} ${y - 40} Z" fill="#92400e" ${K}/>`)
  + `<rect x="${x - 7}" y="${y - 30}" width="14" height="14" rx="2" fill="#facc15" ${c(3)}/>`;

export const ahtapot = (x: number, y: number, renk = '#c084fc', bacak = 5) =>
  Array.from({ length: bacak }, (_, i) => {
    const dx = -32 + i * (64 / Math.max(1, bacak - 1)), d = `M${x + dx} ${y + 4} Q${x + dx - 10} ${y + 40} ${x + dx + 4} ${y + 58}`;
    return `<path d="${d}" fill="none" stroke="${CIZGI}" stroke-width="15" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${renk}" stroke-width="8" stroke-linecap="round"/>`;
  }).join('')
  + `<path d="M${x - 40} ${y + 14} Q${x - 42} ${y - 50} ${x} ${y - 50} Q${x + 42} ${y - 50} ${x + 40} ${y + 14} Z" fill="${renk}" ${K}/>`
  + `<circle cx="${x - 13}" cy="${y - 16}" r="6" fill="#fff" ${c(2)}/><circle cx="${x + 13}" cy="${y - 16}" r="6" fill="#fff" ${c(2)}/><circle cx="${x - 12}" cy="${y - 15}" r="3" fill="${CIZGI}"/><circle cx="${x + 14}" cy="${y - 15}" r="3" fill="${CIZGI}"/>`;

export const kabuk = (x: number, y: number, renk = '#fda4af') =>
  `<path d="M${x - 26} ${y} Q${x} ${y - 50} ${x + 26} ${y} Z" fill="${renk}" ${K}/>` + [-14, -5, 5, 14].map(d => `<line x1="${x}" y1="${y - 2}" x2="${x + d}" y2="${y - 30}" ${c(2)}/>`).join('');

export const pasta = (x: number, y: number, mum = 3, kremaRenk = '#f9a8d4') =>
  `<rect x="${x - 70}" y="${y - 60}" width="140" height="60" rx="8" fill="#fde68a" ${K}/><path d="M${x - 70} ${y - 48} Q${x - 52} ${y - 34} ${x - 35} ${y - 48} Q${x - 17} ${y - 34} ${x} ${y - 48} Q${x + 17} ${y - 34} ${x + 35} ${y - 48} Q${x + 52} ${y - 34} ${x + 70} ${y - 48} L${x + 70} ${y - 60} L${x - 70} ${y - 60} Z" fill="${kremaRenk}" ${c(3)}/>`
  + Array.from({ length: mum }, (_, i) => { const mx = x - (mum - 1) * 20 + i * 40; return `<rect x="${mx - 5}" y="${y - 92}" width="10" height="32" fill="#93c5fd" ${c(3)}/><path d="M${mx} ${y - 108} Q${mx + 8} ${y - 98} ${mx} ${y - 94} Q${mx - 8} ${y - 98} ${mx} ${y - 108} Z" fill="#fb923c" ${c(2)}/>`; }).join('');

export const balon = (x: number, y: number, renk = '#ef4444', ip = 90) =>
  `<path d="M${x} ${y + 34} Q${x - 10} ${y + 34 + ip / 2} ${x + 4} ${y + 34 + ip}" fill="none" ${c(3)}/><ellipse cx="${x}" cy="${y}" rx="26" ry="32" fill="${renk}" ${K}/><path d="M${x - 5} ${y + 32} L${x + 5} ${y + 32} L${x} ${y + 38} Z" fill="${renk}" ${c(2)}/><ellipse cx="${x - 9}" cy="${y - 12}" rx="5" ry="9" fill="#fff" opacity=".6"/>`;

export const hediye = (x: number, y: number, renk = '#a855f7', kurdele = '#facc15', w = 60) =>
  `<rect x="${x - w / 2}" y="${y - w * 0.8}" width="${w}" height="${w * 0.8}" fill="${renk}" ${K}/><rect x="${x - 6}" y="${y - w * 0.8}" width="12" height="${w * 0.8}" fill="${kurdele}" ${c(2)}/>`
  + `<path d="M${x} ${y - w * 0.8} Q${x - 22} ${y - w * 0.8 - 22} ${x - 4} ${y - w * 0.8} Q${x + 22} ${y - w * 0.8 - 22} ${x + 4} ${y - w * 0.8}" fill="${kurdele}" ${c(3)}/>`;

export const sapka = (x: number, y: number, renk = '#22c55e', ponpon = true) =>
  `<path d="M${x - 22} ${y} L${x} ${y - 52} L${x + 22} ${y} Z" fill="${renk}" ${K}/><path d="M${x - 12} ${y - 24} L${x + 9} ${y - 28} M${x - 17} ${y - 10} L${x + 16} ${y - 14}" stroke="#fde047" stroke-width="5"/>`
  + (ponpon ? `<circle cx="${x}" cy="${y - 54}" r="7" fill="#fde047" ${c(3)}/>` : '');

export const bardak = (x: number, y: number, renk = '#38bdf8', pipet = true) =>
  (pipet ? `<line x1="${x + 4}" y1="${y - 42}" x2="${x + 12}" y2="${y - 66}" stroke="#f43f5e" stroke-width="5" stroke-linecap="round"/>` : '')
  + `<path d="M${x - 16} ${y - 42} L${x + 16} ${y - 42} L${x + 12} ${y} L${x - 12} ${y} Z" fill="${renk}" ${K}/>`;

export const kurabiyeTabagi = (x: number, y: number, adet = 3) =>
  `<ellipse cx="${x}" cy="${y}" rx="52" ry="14" fill="#ffffff" ${K}/>`
  + [[-24, -12], [0, -16], [24, -12]].slice(0, adet).map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="13" fill="#d97706" ${c(3)}/><circle cx="${x + dx - 4}" cy="${y + dy - 3}" r="2.5" fill="${CIZGI}"/><circle cx="${x + dx + 4}" cy="${y + dy + 3}" r="2.5" fill="${CIZGI}"/>`).join('');

export const flama = (x1: number, x2: number, y: number, renkler: string[]) => {
  const n = renkler.length, w = (x2 - x1) / n;
  return `<path d="M${x1} ${y} Q${(x1 + x2) / 2} ${y + 34} ${x2} ${y}" fill="none" ${c(3)}/>`
    + renkler.map((rk, i) => { const a = x1 + i * w + 4, t = y + 2 + Math.sin(Math.PI * (i + 0.5) / n) * 16; return `<path d="M${a} ${t} L${a + w - 8} ${t} L${a + (w - 8) / 2} ${t + 30} Z" fill="${rk}" ${c(3)}/>`; }).join('');
};

export const kardanAdam = (x: number, y: number, sapkaRenk = '#1f2937', atki = '#ef4444', burun = true, dugme = 3) =>
  `<circle cx="${x}" cy="${y - 50}" r="50" fill="#ffffff" ${K}/><circle cx="${x}" cy="${y - 128}" r="36" fill="#ffffff" ${K}/>`
  + Array.from({ length: dugme }, (_, i) => `<circle cx="${x}" cy="${y - 72 + i * 22}" r="5" fill="${CIZGI}"/>`).join('')
  + `<path d="M${x + 16} ${y - 96} L${x + 24} ${y - 64} L${x + 36} ${y - 66} L${x + 28} ${y - 98}" fill="${atki}" ${c(3)}/><path d="M${x - 34} ${y - 102} Q${x} ${y - 90} ${x + 34} ${y - 102} L${x + 34} ${y - 90} Q${x} ${y - 78} ${x - 34} ${y - 90} Z" fill="${atki}" ${c(3)}/>`
  + `<circle cx="${x - 12}" cy="${y - 138}" r="4" fill="${CIZGI}"/><circle cx="${x + 12}" cy="${y - 138}" r="4" fill="${CIZGI}"/>`
  + (burun ? `<path d="M${x} ${y - 128} L${x + 26} ${y - 122} L${x} ${y - 117} Z" fill="#fb923c" ${c(2)}/>` : '')
  + `<rect x="${x - 40}" y="${y - 168}" width="80" height="10" rx="3" fill="${sapkaRenk}" ${c(3)}/><rect x="${x - 26}" y="${y - 206}" width="52" height="40" rx="4" fill="${sapkaRenk}" ${c(3)}/>`;

export const camAgaci = (x: number, y: number, s = 1, kar = true) =>
  `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-22" width="20" height="24" fill="#78350f" ${c(3)}/>`
  + [[-20, 70, 60], [-62, 54, 54], [-100, 38, 48]].map(([dy, w, h]) => `<path d="M${-w} ${dy} L0 ${dy - h} L${w} ${dy} Z" fill="#15803d" ${K}/>`).join('')
  + (kar ? `<path d="M-16 -132 L0 -148 L16 -132 Q0 -124 -16 -132 Z" fill="#fff" ${c(2)}/>` : '') + `</g>`;

export const ev = (x: number, y: number, duman = true, pencereIsik = '#fde047', kapiRenk = '#b91c1c') =>
  `<rect x="${x + 30}" y="${y - 175}" width="24" height="44" fill="#9ca3af" ${c(3)}/>`
  + (duman ? `<circle cx="${x + 44}" cy="${y - 192}" r="11" fill="#e5e7eb" ${c(2)}/><circle cx="${x + 58}" cy="${y - 212}" r="14" fill="#e5e7eb" ${c(2)}/><circle cx="${x + 50}" cy="${y - 236}" r="10" fill="#e5e7eb" ${c(2)}/>` : '')
  + `<rect x="${x - 70}" y="${y - 100}" width="140" height="100" fill="#fca5a5" ${K}/><path d="M${x - 85} ${y - 100} L${x} ${y - 170} L${x + 85} ${y - 100} Z" fill="#7c2d12" ${K}/>`
  + `<rect x="${x - 50}" y="${y - 76}" width="38" height="34" fill="${pencereIsik}" ${c(3)}/><path d="M${x - 31} ${y - 76} L${x - 31} ${y - 42} M${x - 50} ${y - 59} L${x - 12} ${y - 59}" ${c(2)}/>`
  + `<rect x="${x + 12}" y="${y - 62}" width="34" height="62" fill="${kapiRenk}" ${c(3)}/><circle cx="${x + 38}" cy="${y - 30}" r="3" fill="${CIZGI}"/>`;

export const kizak = (x: number, y: number, renk = '#dc2626') =>
  `<rect x="${x - 50}" y="${y - 34}" width="100" height="16" rx="4" fill="${renk}" ${K}/><path d="M${x - 40} ${y - 18} L${x - 40} ${y - 4} M${x + 30} ${y - 18} L${x + 30} ${y - 4}" ${c(4)}/><path d="M${x - 60} ${y - 4} L${x + 50} ${y - 4} Q${x + 66} ${y - 4} ${x + 64} ${y - 20}" fill="none" ${c(5)}/>`;

export const kartopu = (x: number, y: number) => `<circle cx="${x}" cy="${y}" r="12" fill="#ffffff" ${c(3)}/>`;

export const cit = (x: number, y: number, n: number, eldiven = false) =>
  `<rect x="${x}" y="${y - 40}" width="${n * 30}" height="8" fill="#a16207" ${c(3)}/>`
  + Array.from({ length: n }, (_, i) => `<path d="M${x + 6 + i * 30} ${y} L${x + 6 + i * 30} ${y - 54} L${x + 15 + i * 30} ${y - 64} L${x + 24 + i * 30} ${y - 54} L${x + 24 + i * 30} ${y} Z" fill="#d97706" ${c(3)}/>`).join('')
  + (eldiven ? `<path d="M${x + 36} ${y - 62} q-2 -18 10 -18 q12 0 10 18 l3 -8 q8 3 3 14 l-5 8 h-20 z" fill="#3b82f6" ${c(3)}/>` : '');

export const caydanlik = (x: number, y: number, renk = '#ef4444') =>
  `<path d="M${x + 34} ${y - 30} Q${x + 60} ${y - 40} ${x + 62} ${y - 58}" fill="none" ${c(8)}/><path d="M${x - 40} ${y - 46} Q${x - 62} ${y - 30} ${x - 40} ${y - 14}" fill="none" ${c(6)}/>`
  + `<path d="M${x - 40} ${y} Q${x - 46} ${y - 56} ${x} ${y - 58} Q${x + 46} ${y - 56} ${x + 40} ${y} Z" fill="${renk}" ${K}/><ellipse cx="${x}" cy="${y - 60}" rx="22" ry="7" fill="${renk}" ${c(3)}/><circle cx="${x}" cy="${y - 70}" r="6" fill="${renk}" ${c(3)}/>`;

export const fincan = (x: number, y: number, renk = '#ffffff') =>
  `<path d="M${x + 16} ${y - 22} q14 2 8 14 q-4 6 -12 2" fill="none" ${c(4)}/><path d="M${x - 20} ${y - 28} L${x + 20} ${y - 28} Q${x + 18} ${y} ${x} ${y} Q${x - 18} ${y} ${x - 20} ${y - 28} Z" fill="${renk}" ${K}/>`;

export const meyveKasesi = (x: number, y: number, muz = true, elmaRenk = '#ef4444') =>
  `<circle cx="${x - 24}" cy="${y - 34}" r="16" fill="${elmaRenk}" ${c(3)}/><circle cx="${x + 6}" cy="${y - 40}" r="16" fill="#fb923c" ${c(3)}/><circle cx="${x + 30}" cy="${y - 30}" r="14" fill="#a3e635" ${c(3)}/>`
  + (muz ? `<path d="M${x - 44} ${y - 30} Q${x - 10} ${y - 2} ${x + 30} ${y - 50} Q${x + 30} ${y - 28} ${x - 10} ${y - 18} Q${x - 30} ${y - 18} ${x - 44} ${y - 30} Z" fill="#fde047" ${c(3)}/>` : '')
  + `<path d="M${x - 56} ${y - 26} L${x + 56} ${y - 26} Q${x + 50} ${y + 6} ${x} ${y + 6} Q${x - 50} ${y + 6} ${x - 56} ${y - 26} Z" fill="#60a5fa" ${K}/>`;

export const duvarSaati = (x: number, y: number, renk = '#f59e0b', akrepAci = 90, yelkovanAci = 0) => {
  const ib = (aci: number, boy: number, k: number) => { const a = (aci - 90) * Math.PI / 180; return `<line x1="${x}" y1="${y}" x2="${x + boy * Math.cos(a)}" y2="${y + boy * Math.sin(a)}" ${c(k)}/>`; };
  return `<circle cx="${x}" cy="${y}" r="38" fill="#ffffff" stroke="${renk}" stroke-width="10"/><circle cx="${x}" cy="${y}" r="43" fill="none" stroke="${CIZGI}" stroke-width="3"/>`
    + [0, 90, 180, 270].map(a => { const r = (a - 90) * Math.PI / 180; return `<circle cx="${x + 26 * Math.cos(r)}" cy="${y + 26 * Math.sin(r)}" r="3" fill="${CIZGI}"/>`; }).join('')
    + ib(akrepAci, 15, 6) + ib(yelkovanAci, 24, 4) + `<circle cx="${x}" cy="${y}" r="4" fill="${CIZGI}"/>`;
};

export const pencere = (x: number, y: number, perde = '#f472b6', gunesli = true) =>
  `<rect x="${x - 70}" y="${y - 60}" width="140" height="120" fill="#bae6fd" ${K}/>` + (gunesli ? `<circle cx="${x + 32}" cy="${y - 24}" r="15" fill="#fcd34d" ${c(3)}/>` : '')
  + `<path d="M${x} ${y - 60} L${x} ${y + 60} M${x - 70} ${y} L${x + 70} ${y}" ${c(4)}/>`
  + `<path d="M${x - 80} ${y - 70} L${x - 40} ${y - 70} Q${x - 50} ${y} ${x - 66} ${y + 70} L${x - 80} ${y + 70} Z" fill="${perde}" ${c(3)}/><path d="M${x + 80} ${y - 70} L${x + 40} ${y - 70} Q${x + 50} ${y} ${x + 66} ${y + 70} L${x + 80} ${y + 70} Z" fill="${perde}" ${c(3)}/>`
  + `<rect x="${x - 86}" y="${y - 78}" width="172" height="10" rx="4" fill="#a16207" ${c(3)}/>`;

export const saksi = (x: number, y: number, yaprak = 5, saksiRenk = '#ea580c') =>
  Array.from({ length: yaprak }, (_, i) => {
    const a = -160 + i * (140 / Math.max(1, yaprak - 1)), r = a * Math.PI / 180, cx = x + 28 * Math.cos(r), cy = y - 44 + 28 * Math.sin(r);
    return `<ellipse cx="${cx}" cy="${cy}" rx="17" ry="8" fill="#22c55e" ${c(3)} transform="rotate(${a} ${cx} ${cy})"/>`;
  }).join('')
  + `<path d="M${x - 26} ${y - 40} L${x + 26} ${y - 40} L${x + 20} ${y} L${x - 20} ${y} Z" fill="${saksiRenk}" ${K}/>`;

export const lamba = (x: number, y: number, renk = '#facc15', isik = true) =>
  `<line x1="${x}" y1="0" x2="${x}" y2="${y - 30}" ${c(3)}/>` + (isik ? `<path d="M${x - 12} ${y + 2} Q${x} ${y + 20} ${x + 12} ${y + 2}" fill="#fef9c3" ${c(3)}/>` : '')
  + `<path d="M${x - 40} ${y} L${x - 18} ${y - 32} L${x + 18} ${y - 32} L${x + 40} ${y} Z" fill="${renk}" ${K}/>`;

export const roket = (x: number, y: number, govde = '#e5e7eb', pencereRenk = '#38bdf8', alev = true) =>
  (alev ? `<path d="M${x - 14} ${y + 60} Q${x} ${y + 110} ${x + 14} ${y + 60} Z" fill="#fb923c" ${c(3)}/><path d="M${x - 7} ${y + 62} Q${x} ${y + 88} ${x + 7} ${y + 62} Z" fill="#fde047"/>` : '')
  + `<path d="M${x - 26} ${y + 34} L${x - 50} ${y + 66} L${x - 24} ${y + 62} Z" fill="#ef4444" ${c(3)}/><path d="M${x + 26} ${y + 34} L${x + 50} ${y + 66} L${x + 24} ${y + 62} Z" fill="#ef4444" ${c(3)}/>`
  + `<path d="M${x} ${y - 80} Q${x + 34} ${y - 40} ${x + 26} ${y + 62} L${x - 26} ${y + 62} Q${x - 34} ${y - 40} ${x} ${y - 80} Z" fill="${govde}" ${K}/><circle cx="${x}" cy="${y - 10}" r="14" fill="${pencereRenk}" ${K}/>`;

export const gezegen = (x: number, y: number, r: number, renk = '#f472b6', halka = true, halkaRenk = '#fcd34d') => {
  if (!halka) return `<circle cx="${x}" cy="${y}" r="${r}" fill="${renk}" ${K}/>`;
  const rx = r * 1.7, ry = r * 0.42;
  return `<g transform="rotate(-15 ${x} ${y})">`
    + `<path d="M${x - rx} ${y} A${rx} ${ry} 0 0 1 ${x + rx} ${y}" fill="none" stroke="${CIZGI}" stroke-width="14"/><path d="M${x - rx} ${y} A${rx} ${ry} 0 0 1 ${x + rx} ${y}" fill="none" stroke="${halkaRenk}" stroke-width="8"/>`
    + `<circle cx="${x}" cy="${y}" r="${r}" fill="${renk}" ${K}/>`
    + `<path d="M${x - rx} ${y} A${rx} ${ry} 0 0 0 ${x + rx} ${y}" fill="none" stroke="${CIZGI}" stroke-width="14"/><path d="M${x - rx} ${y} A${rx} ${ry} 0 0 0 ${x + rx} ${y}" fill="none" stroke="${halkaRenk}" stroke-width="8"/></g>`;
};

export const ay = (x: number, y: number, r: number, krater = 3) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#e5e7eb" ${K}/>` + [[-0.35, -0.3, 0.22], [0.3, 0.1, 0.16], [-0.1, 0.42, 0.13]].slice(0, krater).map(([dx, dy, rr]) => `<circle cx="${x + dx * r}" cy="${y + dy * r}" r="${rr * r}" fill="#cbd5e1" ${c(3)}/>`).join('');

export const ufo = (x: number, y: number, isik = '#facc15', kubbe = '#a5f3fc') =>
  `<ellipse cx="${x}" cy="${y - 10}" rx="26" ry="22" fill="${kubbe}" ${K}/><ellipse cx="${x}" cy="${y}" rx="56" ry="16" fill="#94a3b8" ${K}/>`
  + [-30, 0, 30].map(d => `<circle cx="${x + d}" cy="${y + 2}" r="5" fill="${isik}" ${c(2)}/>`).join('');

export const uzayli = (x: number, y: number, renk = '#4ade80', anten = 2) =>
  Array.from({ length: anten }, (_, i) => { const s = anten === 1 ? 0 : (i ? 1 : -1); return `<path d="M${x + s * 10} ${y - 30} L${x + s * 18} ${y - 52}" ${c(3)}/><circle cx="${x + s * 18}" cy="${y - 56}" r="5" fill="#f472b6" ${c(2)}/>`; }).join('')
  + `<ellipse cx="${x}" cy="${y}" rx="26" ry="32" fill="${renk}" ${K}/><circle cx="${x}" cy="${y - 8}" r="11" fill="#fff" ${c(3)}/><circle cx="${x}" cy="${y - 8}" r="5" fill="${CIZGI}"/><path d="M${x - 8} ${y + 12} Q${x} ${y + 18} ${x + 8} ${y + 12}" fill="none" ${c(3)}/>`;

export const kuyrukluYildiz = (x: number, y: number, renk = '#fde047') =>
  `<path d="M${x} ${y - 6} L${x - 90} ${y - 34} L${x - 8} ${y + 8} Z" fill="#fef3c7" ${c(2)}/>` + yildizSekli(x, y, 16, renk);
