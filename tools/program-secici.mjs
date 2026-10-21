// Tek seferlik düzenleme: Program Modu'nda eski (üniteli) ve yeni (beceri kulvarlı) sürüm arasında seçim.
import fs from 'fs';
const f = 'src/components/navigation/AppRouter.tsx';
let s = fs.readFileSync(f, 'utf8');
const ok = (n, v) => { console.log(v ? 'ok ' : 'YOK', n); return v; };

ok('sabit', s.includes('const YENI_PROGRAM = true;'));
s = s.replace(/\/\/ Program Modu 2 \(beceri kulvarları, 2026-10\)\. false yapılırsa eski üniteli Program Modu açılır\.\r?\nconst YENI_PROGRAM = true;/,
  "// Program Modu 2 (beceri kulvarları, 2026-10) ve eski üniteli Program Modu: ebeveyn seçer (Kaan, 2026-10-21: eskiyi tercih ediyorum).\n// Varsayılan: eski. Seçim localStorage 'programSurumu' = 'yeni' | 'eski'.");

// state
const durum = "    const [beceriDonus, setBeceriDonus] = useState(false);";
ok('state', s.includes(durum));
s = s.replace(durum, durum + "\n    const [yeniProgram, setYeniProgram] = useState<boolean>(() => { try { return window.localStorage.getItem('programSurumu') === 'yeni'; } catch { return false; } });\n    const programSurumuSec = (yeni: boolean) => { try { window.localStorage.setItem('programSurumu', yeni ? 'yeni' : 'eski'); } catch { /* yok say */ } setYeniProgram(yeni); };");

// case
s = s.replace(/        case ScreenState\.ProgramIntro: if \(YENI_PROGRAM\) return <ProgramEkrani/, "        case ScreenState.ProgramIntro: { const programEkrani = yeniProgram ? <ProgramEkrani");
s = s.replace(/(            onOdul=\{\(oyun\) => \{[\s\S]*?\}\}\r?\n        \/>);\r?\n        return <ProgramModeIntroScreen/, "$1 : <ProgramModeIntroScreen");
s = s.replace(/(            parentOverrides=\{ctx\.profile\.parentOverrides\}\r?\n        \/>);(\r?\n\r?\n        case ScreenState\.Playing:)/,
  "$1;\n        return <>\n            {programEkrani}\n            <div className=\"fixed bottom-3 left-1/2 z-50 flex -translate-x-1/2 gap-1 rounded-full bg-white/95 p-1 shadow-lg ring-1 ring-slate-200\">\n                <button onClick={() => programSurumuSec(false)} className={`rounded-full px-3 py-1.5 text-xs font-black ${!yeniProgram ? 'bg-emerald-500 text-white' : 'text-slate-500'}`}>Eski program</button>\n                <button onClick={() => programSurumuSec(true)} className={`rounded-full px-3 py-1.5 text-xs font-black ${yeniProgram ? 'bg-emerald-500 text-white' : 'text-slate-500'}`}>Yeni program</button>\n            </div>\n        </>; }$2");
fs.writeFileSync(f, s);
console.log(s.includes('programEkrani'), s.includes('YENI_PROGRAM'));
