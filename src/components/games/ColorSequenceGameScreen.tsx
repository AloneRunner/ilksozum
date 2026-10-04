import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import { sayInstruction, sayCorrect, sayFinished } from '../../utils/gameVoice.ts';
import { getMutedState } from '../../services/speechService.ts';

// Renk Sırası (Kaan'ın önerisi): 4 renkli oyuncaktaki gibi önce 1 renk yanar, çocuk aynısına basar;
// sonra 2 renk, 3 renk... Otizmli çocuklar için uyarlandı:
// - Süre baskısı yok; gösterim yavaş, istenirse renk adları söylenir.
// - Yanlışta oyun bitmez: doğru düğme gösterilir ve aynı sıra tekrar oynatılır.
// - 3 kez üst üste olmazsa sıra bir kısalır. Hedef uzunluğa ulaşınca oyun biter (sonsuz değil).

interface ColorSequenceGameScreenProps {
    onBack: () => void;
}

interface Pad {
    id: number;
    name: string;      // söylenecek renk adı
    color: string;     // normal
    lit: string;       // yanınca
    freq: number;      // ton (do-mi-sol-do: kulağa hoş, birbirinden ayrık)
    shape: string;     // renk körlüğüne karşı ikinci ipucu
}

const PADS: Pad[] = [
    { id: 0, name: 'kırmızı', color: '#dc2626', lit: '#fca5a5', freq: 261.63, shape: '●' },
    { id: 1, name: 'mavi', color: '#2563eb', lit: '#93c5fd', freq: 329.63, shape: '■' },
    { id: 2, name: 'sarı', color: '#eab308', lit: '#fef08a', freq: 392.0, shape: '▲' },
    { id: 3, name: 'yeşil', color: '#16a34a', lit: '#86efac', freq: 523.25, shape: '★' },
];

const HEDEFLER = [
    { uzunluk: 3, ad: 'Kısa', alt: '3 renk' },
    { uzunluk: 5, ad: 'Orta', alt: '5 renk' },
    { uzunluk: 8, ad: 'Uzun', alt: '8 renk' },
];

const HIZLAR = {
    yavas: { yanma: 900, ara: 450, ad: '🐢 Yavaş' },
    normal: { yanma: 600, ara: 300, ad: '🐇 Normal' },
};
type Hiz = keyof typeof HIZLAR;

const SAYILAR = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz'];

type Faz = 'menu' | 'izle' | 'oyna' | 'bitti';

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

const ColorSequenceGameScreen: React.FC<ColorSequenceGameScreenProps> = ({ onBack }) => {
    const [faz, setFaz] = useState<Faz>('menu');
    const [hedef, setHedef] = useState(3);
    const [hiz, setHiz] = useState<Hiz>('yavas');
    const [renkSoyle, setRenkSoyle] = useState(true);
    const [sira, setSira] = useState<number[]>([]);
    const [adim, setAdim] = useState(0);            // çocuğun kaçıncı basışı
    const [yanan, setYanan] = useState<number | null>(null);
    const [ipucu, setIpucu] = useState<number | null>(null);
    const [mesaj, setMesaj] = useState('');
    const [enUzun, setEnUzun] = useState(0);

    const ctxRef = useRef<AudioContext | null>(null);
    const runRef = useRef(0);          // eski gösterimleri iptal eder
    const hataRef = useRef(0);         // aynı uzunlukta üst üste hata

    useEffect(() => () => {
        runRef.current++;
        ctxRef.current?.close().catch(() => { /* yoksay */ });
    }, []);

    const ton = useCallback((freq: number, sure: number) => {
        if (getMutedState()) return;
        try {
            if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            const ctx = ctxRef.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);
            gain.gain.setValueAtTime(0.0001, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + sure);
            osc.start();
            osc.stop(ctx.currentTime + sure + 0.05);
        } catch { /* yoksay */ }
    }, []);

    const kutlamaSesi = useCallback(() => {
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => setTimeout(() => ton(f, 0.25), i * 110));
    }, [ton]);

    // Sırayı göster: her renk yanar, ton çalar, istenirse adı söylenir
    const goster = useCallback(async (dizi: number[]) => {
        const run = ++runRef.current;
        const h = HIZLAR[hiz];
        setFaz('izle');
        setAdim(0);
        setIpucu(null);
        setMesaj('Bak ve dinle');
        sayInstruction(dizi.length === 1 ? 'Bak.' : `Bak. ${SAYILAR[dizi.length] ?? dizi.length} renk.`);
        await wait(1200);
        for (const id of dizi) {
            if (run !== runRef.current) return;
            setYanan(id);
            ton(PADS[id].freq, h.yanma / 1000);
            if (renkSoyle) sayInstruction(PADS[id].name);
            await wait(h.yanma);
            setYanan(null);
            await wait(h.ara);
        }
        if (run !== runRef.current) return;
        setFaz('oyna');
        setMesaj('Sıra sende');
        sayInstruction('Şimdi sen bas.');
    }, [hiz, renkSoyle, ton]);

    const yeniRenk = (dizi: number[]) => {
        // Aynı renk üç kez art arda gelmesin (çocuk için kafa karıştırıcı)
        let r = Math.floor(Math.random() * PADS.length);
        const n = dizi.length;
        while (n >= 2 && dizi[n - 1] === r && dizi[n - 2] === r) r = Math.floor(Math.random() * PADS.length);
        return r;
    };

    const basla = useCallback((hedefUzunluk: number) => {
        setHedef(hedefUzunluk);
        hataRef.current = 0;
        setEnUzun(0);
        const ilk = [Math.floor(Math.random() * PADS.length)];
        setSira(ilk);
        goster(ilk);
    }, [goster]);

    const bas = useCallback((id: number) => {
        if (faz !== 'oyna') return;
        const h = HIZLAR[hiz];
        setYanan(id);
        ton(PADS[id].freq, 0.35);
        setTimeout(() => setYanan(y => (y === id ? null : y)), 250);
        setIpucu(null);

        if (id !== sira[adim]) {
            // Yanlış: oyun bitmez. Doğru düğmeyi göster, aynı sırayı tekrar oynat.
            const dogru = sira[adim];
            hataRef.current++;
            setFaz('izle');
            setIpucu(dogru);
            setMesaj('Bak, bu renkti');
            sayInstruction(`Bak, ${PADS[dogru].name}.`);
            let dizi = sira;
            if (hataRef.current >= 3 && sira.length > 1) {
                // Üç kez olmadı: bir kısalt, başarı yaşasın
                dizi = sira.slice(0, -1);
                hataRef.current = 0;
                setSira(dizi);
            }
            setTimeout(() => { setIpucu(null); goster(dizi); }, h.yanma * 2 + 900);
            return;
        }

        if (adim + 1 < sira.length) {
            setAdim(adim + 1);
            return;
        }

        // Sıra tamam
        hataRef.current = 0;
        setEnUzun(e => Math.max(e, sira.length));
        setFaz('izle');
        if (sira.length >= hedef) {
            kutlamaSesi();
            sayFinished(`Harika! ${SAYILAR[sira.length] ?? sira.length} rengi sırayla bastın!`);
            setTimeout(() => setFaz('bitti'), 1200);
            return;
        }
        kutlamaSesi();
        sayCorrect();
        setMesaj('Aferin!');
        const yeni = [...sira, yeniRenk(sira)];
        setSira(yeni);
        setTimeout(() => goster(yeni), 1700);
    }, [faz, hiz, sira, adim, hedef, goster, ton, kutlamaSesi]);

    const menuyeDon = () => {
        runRef.current++;
        setFaz('menu');
        setSira([]);
        setYanan(null);
        setIpucu(null);
    };

    // --- MENÜ ---
    if (faz === 'menu') {
        return (
            <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-sky-100 via-indigo-50 to-pink-100 flex flex-col">
                <div className="flex items-center justify-between p-3">
                    <button onClick={onBack} className="bg-white rounded-full p-2.5 shadow-lg text-indigo-600" style={{ touchAction: 'manipulation' }}>
                        <ArrowLeftIcon className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-black text-indigo-700">🔴🔵 Renk Sırası</h1>
                    <div className="w-10" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center gap-5 p-4">
                    <div className="grid grid-cols-2 gap-2 w-32 h-32">
                        {PADS.map(p => <div key={p.id} className="rounded-2xl shadow" style={{ background: p.color }} />)}
                    </div>
                    <p className="text-center text-indigo-800 font-semibold max-w-xs">
                        Renkler sırayla yanar. Sen de aynı sırayla bas. Her seferinde bir renk eklenir.
                    </p>
                    <div className="flex gap-2">
                        {(Object.keys(HIZLAR) as Hiz[]).map(k => (
                            <button key={k} onClick={() => setHiz(k)} style={{ touchAction: 'manipulation' }}
                                className={`px-4 py-2 rounded-xl font-bold shadow ${hiz === k ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-600'}`}>
                                {HIZLAR[k].ad}
                            </button>
                        ))}
                    </div>
                    <label className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow font-semibold text-indigo-700">
                        <input type="checkbox" checked={renkSoyle} onChange={e => setRenkSoyle(e.target.checked)} className="w-5 h-5" />
                        Renk adlarını söyle
                    </label>
                    <div className="flex flex-col gap-3 w-full max-w-xs">
                        {HEDEFLER.map(h => (
                            <button key={h.uzunluk} onClick={() => basla(h.uzunluk)} style={{ touchAction: 'manipulation' }}
                                className="bg-white hover:bg-indigo-50 rounded-2xl shadow-lg px-5 py-3 flex items-center justify-between">
                                <span className="text-lg font-black text-indigo-700">{h.ad}</span>
                                <span className="text-sm font-bold text-indigo-400">{h.alt}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- BİTTİ ---
    if (faz === 'bitti') {
        return (
            <div className="w-full h-full bg-gradient-to-br from-sky-100 via-indigo-50 to-pink-100 flex flex-col items-center justify-center gap-6 p-6">
                <div className="text-7xl animate-bounce">🌟</div>
                <h2 className="text-2xl font-black text-indigo-700 text-center">Harika! {enUzun} rengi sırayla bastın!</h2>
                <div className="flex gap-3">
                    <button onClick={() => basla(hedef)} style={{ touchAction: 'manipulation' }}
                        className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg">🔁 Tekrar</button>
                    <button onClick={menuyeDon} style={{ touchAction: 'manipulation' }}
                        className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold shadow-lg">Menü</button>
                </div>
            </div>
        );
    }

    // --- OYUN ---
    return (
        <div className="w-full h-full bg-gradient-to-br from-sky-100 via-indigo-50 to-pink-100 flex flex-col">
            <div className="flex items-center justify-between p-3">
                <button onClick={menuyeDon} className="bg-white rounded-full p-2.5 shadow-lg text-indigo-600" style={{ touchAction: 'manipulation' }}>
                    <ArrowLeftIcon className="w-5 h-5" />
                </button>
                {/* İlerleme: hedef uzunluk kadar nokta, ulaşılan uzunluk dolu */}
                <div className="flex gap-1.5">
                    {Array.from({ length: hedef }, (_, i) => (
                        <div key={i} className={`w-4 h-4 rounded-full border-2 ${i < sira.length ? 'bg-indigo-500 border-indigo-600' : 'bg-white border-indigo-200'}`} />
                    ))}
                </div>
                <button
                    onClick={() => faz === 'oyna' && goster(sira)}
                    disabled={faz !== 'oyna'}
                    className="bg-white rounded-full px-3 py-2 shadow-lg text-indigo-600 font-bold text-sm disabled:opacity-40"
                    style={{ touchAction: 'manipulation' }}
                >
                    🔁 Tekrar
                </button>
            </div>

            <div className={`text-center text-xl font-black h-8 ${faz === 'oyna' ? 'text-green-600' : 'text-indigo-500'}`}>{mesaj}</div>

            {/* Çocuğun bastıkları (izle sırasında boş) */}
            <div className="flex justify-center gap-1.5 h-6 mt-1">
                {faz === 'oyna' && sira.map((_, i) => (
                    <div key={i} className={`w-5 h-5 rounded-full border-2 border-gray-300 ${i < adim ? '' : 'bg-white'}`}
                        style={i < adim ? { background: PADS[sira[i]].color, borderColor: PADS[sira[i]].color } : undefined} />
                ))}
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md aspect-square">
                    {PADS.map(p => {
                        const isik = yanan === p.id || ipucu === p.id;
                        return (
                            <button
                                key={p.id}
                                onPointerDown={() => bas(p.id)}
                                disabled={faz !== 'oyna'}
                                aria-label={p.name}
                                className={`rounded-3xl flex items-center justify-center text-5xl text-white/70 select-none transition-all duration-150 ${isik ? 'scale-105' : faz === 'oyna' ? 'active:scale-95' : 'opacity-80'} ${ipucu === p.id ? 'animate-pulse ring-8 ring-white' : ''}`}
                                style={{
                                    touchAction: 'manipulation',
                                    background: isik ? p.lit : p.color,
                                    boxShadow: isik ? `0 0 40px ${p.lit}, 0 0 80px ${p.color}` : '0 8px 0 rgba(0,0,0,0.2)',
                                }}
                            >
                                {p.shape}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ColorSequenceGameScreen;
