import { svg, gunes, bulut, agac, bank, kaydirak, top, kopek, ucurtma, cicek, kus, copKutusu, kelebek, CIZGI } from './cizim.ts';
import {
  semsiye, kumKale, kova, kurek, plajTopu, kayik, marti, yildizSekli, yengec, havlu, balik, kabarcik, yosun, sandik, ahtapot, kabuk,
  pasta, balon, hediye, sapka, bardak, kurabiyeTabagi, flama, kardanAdam, camAgaci, ev, kizak, kartopu, cit,
  caydanlik, fincan, meyveKasesi, duvarSaati, pencere, saksi, lamba, roket, gezegen, ay, ufo, uzayli, kuyrukluYildiz,
} from './cizim2.ts';

// Bir sahne: farksız çizim + aday farklar. Fark açıkken nesne başka hâliyle çizilir; dokunma alanı daire (600'lük koordinat).
export interface Fark { id: string; x: number; y: number; r: number }
export interface Sahne { id: string; ad: string; farklar: Fark[]; ciz: (acik: Set<string>) => string }

const park: Sahne = {
  id: 'park', ad: 'Park',
  farklar: [
    { id: 'gunes', x: 520, y: 80, r: 62 },
    { id: 'bulut', x: 330, y: 115, r: 55 },
    { id: 'elma', x: 144, y: 344, r: 34 },
    { id: 'top', x: 300, y: 530, r: 40 },
    { id: 'kuyruk', x: 420, y: 505, r: 40 },
    { id: 'ucurtma', x: 430, y: 200, r: 55 },
    { id: 'cicek', x: 560, y: 450, r: 40 },
    { id: 'kapak', x: 555, y: 510, r: 40 },
    { id: 'kelebek', x: 255, y: 330, r: 35 },
  ],
  ciz: (f) => svg(
    `<rect width="600" height="600" fill="#bae6fd"/>`
    + `<path d="M0 380 Q150 340 300 372 T600 360 L600 600 L0 600 Z" fill="#86efac" stroke="${CIZGI}" stroke-width="4"/>`
    + gunes(520, 80, 34, '#fcd34d', !f.has('gunes'))
    + bulut(150, 85, 1) + (f.has('bulut') ? '' : bulut(335, 125, 0.8))
    + ucurtma(430, 180, f.has('ucurtma') ? '#22c55e' : '#a855f7')
    + kus(250, 70, '#38bdf8')
    + agac(110, 440, f.has('elma') ? 2 : 3)
    + bank(190, 418)
    + kaydirak(345, 478, '#facc15')
    + (f.has('kelebek') ? '' : kelebek(255, 330))
    + top(300, 530, 24, f.has('top') ? '#3b82f6' : '#ef4444')
    + kopek(470, 565, !f.has('kuyruk'))
    + cicek(40, 575, '#f472b6') + cicek(80, 590, '#c084fc') + cicek(560, 480, f.has('cicek') ? '#facc15' : '#f472b6')
    + copKutusu(555, 560, !f.has('kapak'), '#0ea5e9')
  ),
};

const sahil: Sahne = {
  id: 'sahil', ad: 'Sahil',
  farklar: [
    { id: 'gunes', x: 90, y: 80, r: 60 },
    { id: 'bulut', x: 300, y: 72, r: 50 },
    { id: 'marti', x: 262, y: 125, r: 32 },
    { id: 'yelken', x: 455, y: 230, r: 45 },
    { id: 'semsiye', x: 130, y: 290, r: 70 },
    { id: 'kale', x: 420, y: 370, r: 34 },
    { id: 'kova', x: 520, y: 500, r: 40 },
    { id: 'top', x: 300, y: 440, r: 40 },
    { id: 'yengec', x: 285, y: 520, r: 30 },
    { id: 'yildiz', x: 80, y: 560, r: 34 },
    { id: 'havlu', x: 120, y: 488, r: 50 },
  ],
  ciz: (f) => svg(
    `<rect width="600" height="600" fill="#bae6fd"/>`
    + `<path d="M0 262 Q75 248 150 262 T300 262 T450 262 T600 262 L600 350 L0 350 Z" fill="#38bdf8" stroke="${CIZGI}" stroke-width="4"/>`
    + `<path d="M0 340 Q300 322 600 340 L600 600 L0 600 Z" fill="#fde68a" stroke="${CIZGI}" stroke-width="4"/>`
    + gunes(90, 80, 30, '#fcd34d', !f.has('gunes'))
    + (f.has('bulut') ? '' : bulut(300, 78, 0.85))
    + marti(225, 145) + (f.has('marti') ? '' : marti(262, 120))
    + kayik(430, 282, f.has('yelken') ? '#a855f7' : '#f97316')
    + semsiye(130, 330, f.has('semsiye') ? '#3b82f6' : '#ef4444')
    + havlu(60, 460, f.has('havlu') ? '#22d3ee' : '#22d3ee', f.has('havlu') ? 2 : 3)
    + kumKale(420, 470, !f.has('kale'))
    + plajTopu(300, 440, 28, f.has('top') ? ['#22c55e', '#facc15', '#ef4444'] : ['#ef4444', '#facc15', '#3b82f6'])
    + kova(520, 520, f.has('kova') ? '#ef4444' : '#3b82f6') + kurek(560, 480)
    + yengec(240, 545, '#ef4444', f.has('yengec') ? 1 : 2)
    + yildizSekli(80, 560, 24, f.has('yildiz') ? '#a855f7' : '#fb923c')
    + kabuk(360, 575)
  ),
};

const denizAlti: Sahne = {
  id: 'denizalti', ad: 'Deniz Altı',
  farklar: [
    { id: 'balik1', x: 150, y: 120, r: 55 },
    { id: 'balik2', x: 430, y: 200, r: 55 },
    { id: 'balik3', x: 260, y: 300, r: 40 },
    { id: 'kabarcik', x: 525, y: 115, r: 50 },
    { id: 'yosun', x: 110, y: 520, r: 45 },
    { id: 'sandik', x: 300, y: 530, r: 55 },
    { id: 'ahtapot', x: 470, y: 420, r: 60 },
    { id: 'yildiz', x: 180, y: 565, r: 34 },
    { id: 'kabuk', x: 420, y: 560, r: 34 },
  ],
  ciz: (f) => svg(
    `<rect width="600" height="600" fill="#7dd3fc"/>`
    + `<path d="M0 520 Q150 495 300 520 T600 515 L600 600 L0 600 Z" fill="#fde68a" stroke="${CIZGI}" stroke-width="4"/>`
    + kabarcik(525, 160, 14) + kabarcik(540, 115, 10) + (f.has('kabarcik') ? '' : kabarcik(515, 75, 8))
    + yosun(60, 585, 170) + (f.has('yosun') ? '' : yosun(110, 585, 110)) + yosun(565, 585, 150)
    + balik(150, 120, f.has('balik1') ? '#22c55e' : '#f97316')
    + balik(430, 200, '#facc15', !f.has('balik2'))
    + (f.has('balik3') ? '' : balik(260, 300, '#f472b6', false, 0.7))
    + ahtapot(470, 420, f.has('ahtapot') ? '#fb7185' : '#c084fc')
    + sandik(300, 565, f.has('sandik'))
    + yildizSekli(180, 565, 24, f.has('yildiz') ? '#ef4444' : '#fb923c')
    + kabuk(420, 575, f.has('kabuk') ? '#a5b4fc' : '#fda4af')
  ),
};

const dogumGunu: Sahne = {
  id: 'dogumgunu', ad: 'Doğum Günü',
  farklar: [
    { id: 'flama', x: 405, y: 70, r: 40 },
    { id: 'balon1', x: 90, y: 170, r: 45 },
    { id: 'balon2', x: 480, y: 160, r: 45 },
    { id: 'saat', x: 300, y: 170, r: 50 },
    { id: 'mum', x: 300, y: 300, r: 60 },
    { id: 'kurdele', x: 110, y: 360, r: 45 },
    { id: 'pipet', x: 200, y: 360, r: 40 },
    { id: 'kurabiye', x: 410, y: 385, r: 50 },
    { id: 'ponpon', x: 515, y: 335, r: 40 },
    { id: 'top', x: 300, y: 535, r: 40 },
  ],
  ciz: (f) => svg(
    `<rect width="600" height="600" fill="#fef3c7"/><rect y="470" width="600" height="130" fill="#fdba74" stroke="${CIZGI}" stroke-width="4"/>`
    + flama(20, 580, 40, ['#ef4444', '#facc15', '#22c55e', '#3b82f6', '#a855f7', f.has('flama') ? '#22c55e' : '#f97316', '#ef4444', '#facc15'])
    + balon(90, 170, f.has('balon1') ? '#3b82f6' : '#ef4444') + balon(150, 140, '#22c55e')
    + (f.has('balon2') ? '' : balon(480, 160, '#a855f7')) + balon(530, 190, '#facc15')
    + duvarSaati(300, 170, '#f59e0b', f.has('saat') ? 180 : 90, 0)
    + `<rect x="40" y="400" width="530" height="18" rx="4" fill="#b45309" stroke="${CIZGI}" stroke-width="4"/><rect x="70" y="418" width="16" height="90" fill="#92400e" stroke="${CIZGI}" stroke-width="3"/><rect x="524" y="418" width="16" height="90" fill="#92400e" stroke="${CIZGI}" stroke-width="3"/>`
    + hediye(110, 400, '#a855f7', f.has('kurdele') ? '#22c55e' : '#facc15')
    + bardak(200, 400, '#38bdf8', !f.has('pipet'))
    + pasta(300, 400, f.has('mum') ? 2 : 3)
    + kurabiyeTabagi(410, 398, f.has('kurabiye') ? 2 : 3)
    + sapka(515, 400, '#22c55e', !f.has('ponpon'))
    + top(300, 535, 26, f.has('top') ? '#facc15' : '#3b82f6')
  ),
};

const kis: Sahne = {
  id: 'kis', ad: 'Kış',
  farklar: [
    { id: 'duman', x: 482, y: 210, r: 45 },
    { id: 'pencere', x: 419, y: 381, r: 35 },
    { id: 'agac', x: 175, y: 360, r: 60 },
    { id: 'kar', x: 90, y: 270, r: 35 },
    { id: 'burun', x: 312, y: 464, r: 28 },
    { id: 'atki', x: 305, y: 500, r: 36 },
    { id: 'sapka', x: 300, y: 408, r: 40 },
    { id: 'kizak', x: 480, y: 545, r: 55 },
    { id: 'kartopu', x: 205, y: 572, r: 30 },
    { id: 'eldiven', x: 70, y: 500, r: 35 },
    { id: 'kus', x: 330, y: 150, r: 35 },
  ],
  ciz: (f) => svg(
    `<rect width="600" height="600" fill="#c7d2fe"/>`
    + `<path d="M0 420 Q150 395 300 420 T600 410 L600 600 L0 600 Z" fill="#ffffff" stroke="${CIZGI}" stroke-width="4"/>`
    + bulut(130, 90, 0.9) + kus(330, 150, f.has('kus') ? '#ef4444' : '#38bdf8')
    + ev(450, 440, !f.has('duman'), f.has('pencere') ? '#93c5fd' : '#fde047')
    + camAgaci(90, 430, 1, !f.has('kar')) + (f.has('agac') ? '' : camAgaci(175, 440, 0.8))
    + cit(20, 560, 4, !f.has('eldiven'))
    + kardanAdam(300, 590, f.has('sapka') ? '#7c3aed' : '#1f2937', f.has('atki') ? '#22c55e' : '#ef4444', !f.has('burun'))
    + kizak(480, 570, f.has('kizak') ? '#2563eb' : '#dc2626')
    + kartopu(160, 575) + kartopu(185, 582) + (f.has('kartopu') ? '' : kartopu(210, 572))
  ),
};

const mutfak: Sahne = {
  id: 'mutfak', ad: 'Mutfak',
  farklar: [
    { id: 'perde', x: 220, y: 150, r: 40 },
    { id: 'gunes', x: 332, y: 126, r: 30 },
    { id: 'saat', x: 90, y: 110, r: 50 },
    { id: 'lamba', x: 480, y: 110, r: 50 },
    { id: 'caydanlik', x: 190, y: 385, r: 50 },
    { id: 'fincan', x: 340, y: 405, r: 32 },
    { id: 'muz', x: 420, y: 385, r: 45 },
    { id: 'elma', x: 396, y: 386, r: 25 },
    { id: 'saksi', x: 545, y: 520, r: 50 },
  ],
  ciz: (f) => svg(
    `<rect width="600" height="600" fill="#fef3c7"/><rect y="470" width="600" height="130" fill="#d6d3d1" stroke="${CIZGI}" stroke-width="4"/>`
    + [100, 200, 300, 400, 500].map(x => `<line x1="${x}" y1="470" x2="${x}" y2="600" stroke="${CIZGI}" stroke-width="2" opacity=".35"/>`).join('')
    + pencere(300, 150, f.has('perde') ? '#60a5fa' : '#f472b6', !f.has('gunes'))
    + duvarSaati(90, 110, '#f59e0b', 120, f.has('saat') ? 180 : 0)
    + lamba(480, 110, '#facc15', !f.has('lamba'))
    + `<rect x="110" y="420" width="380" height="18" rx="4" fill="#b45309" stroke="${CIZGI}" stroke-width="4"/><rect x="135" y="438" width="16" height="110" fill="#92400e" stroke="${CIZGI}" stroke-width="3"/><rect x="449" y="438" width="16" height="110" fill="#92400e" stroke="${CIZGI}" stroke-width="3"/>`
    + caydanlik(190, 420, f.has('caydanlik') ? '#3b82f6' : '#ef4444')
    + fincan(285, 420) + (f.has('fincan') ? '' : fincan(340, 420, '#fbcfe8'))
    + meyveKasesi(420, 420, !f.has('muz'), f.has('elma') ? '#a3e635' : '#ef4444')
    + saksi(545, 560, f.has('saksi') ? 4 : 6)
  ),
};

const uzay: Sahne = {
  id: 'uzay', ad: 'Uzay',
  farklar: [
    { id: 'gezegen', x: 440, y: 140, r: 60 },
    { id: 'halka', x: 360, y: 160, r: 30 },
    { id: 'ay', x: 110, y: 110, r: 50 },
    { id: 'pencere', x: 300, y: 320, r: 30 },
    { id: 'alev', x: 300, y: 425, r: 35 },
    { id: 'ufo', x: 480, y: 380, r: 55 },
    { id: 'anten', x: 140, y: 470, r: 35 },
    { id: 'uzayli', x: 130, y: 530, r: 40 },
    { id: 'kuyruklu', x: 200, y: 225, r: 55 },
    { id: 'yildiz', x: 545, y: 520, r: 30 },
  ],
  ciz: (f) => svg(
    `<rect width="600" height="600" fill="#312e81"/>`
    + [[40, 300], [260, 60], [360, 260], [560, 280], [60, 210], [520, 40], [400, 520], [230, 450]].map(([x, y]) => yildizSekli(x, y, 10, '#fde047', 1.5)).join('')
    + (f.has('yildiz') ? '' : yildizSekli(545, 520, 16, '#fde047', 2))
    + `<path d="M0 560 Q300 520 600 560 L600 600 L0 600 Z" fill="#a8a29e" stroke="${CIZGI}" stroke-width="4"/>`
    + ay(110, 110, 42, f.has('ay') ? 2 : 3)
    + gezegen(440, 140, 46, f.has('gezegen') ? '#4ade80' : '#f472b6', !f.has('halka'))
    + (f.has('kuyruklu') ? '' : kuyrukluYildiz(220, 225))
    + roket(300, 330, '#e5e7eb', f.has('pencere') ? '#f472b6' : '#38bdf8', !f.has('alev'))
    + ufo(480, 380, '#facc15')
    + uzayli(130, 530, f.has('uzayli') ? '#60a5fa' : '#4ade80', f.has('anten') ? 1 : 2)
  ),
};

export const SAHNELER: Sahne[] = [park, sahil, denizAlti, dogumGunu, kis, mutfak, uzay];
