import React, { useState, useCallback, useEffect, useRef } from 'react';
import ArrowLeftIcon from '../icons/ArrowLeftIcon.tsx';
import { useSeviye } from '../oyunKiti/OyunKiti.tsx';
import { getMutedState, speak, cancelSpeech } from '../../services/speechService.ts';

// Bekle ve Bas (dürtü kontrolü): kırmızıda bekle, yeşilde bas. Her doğru basışta araba eve bir adım yaklaşır.
// Otizm uyarlamaları: yeşil süresiz yanar (acele yok), kırmızıda basmanın cezası yok (sadece ilerlemez),
// konuşma az ve sesle üst üste binmez.

interface WaitAndPressGameScreenProps {
    onBack: () => void;
}

const SEVIYELER = [
    { ad: 'Kolay', alt: 'Kısa bekleme', min: 1200, max: 2200 },
    { ad: 'Orta', alt: 'Biraz daha bekle', min: 2000, max: 3800 },
    { ad: 'Zor', alt: 'Uzun bekleme', min: 3000, max: 5500 },
];
const ADIM = 6; // eve varmak için doğru basış

type Isik = 'kirmizi' | 'yesil';
type Faz = 'menu' | 'oyna' | 'bitti';

const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
const konus = (metin: string) => Promise.race([speak(metin).catch(() => { /* yoksay */ }), wait(4000)]);

const WaitAndPressGameScreen: React.FC<WaitAndPressGameScreenProps> = ({ onBack }) => {
    // Açılışta zorluk menüsü yok (Kaan, 2026-10-08): oyun hemen başlar, bekleme süresi çocuğun seviyesine göre; ⚙️ ebeveyne
    const kit = useSeviye('bekleBas', SEVIYELER.length - 1);
    const [faz, setFaz] = useState<Faz>('oyna');
    const [seviye, setSeviye] = useState(kit.seviye);
    const [isik, setIsik] = useState<Isik>('kirmizi');
    const [adim, setAdim] = useState(0);
    const [uyari, setUyari] = useState(false);
    const [basildi, setBasildi] = useState(false);
    const ctxRef = useRef<AudioContext | null>(null);
    const zamanRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const kilitRef = useRef(false); // konuşma/animasyon sürerken basışları yok say

    useEffect(() => () => {
        if (zamanRef.current) clearTimeout(zamanRef.current);
        cancelSpeech().catch(() => { /* yoksay */ });
        ctxRef.current?.close().catch(() => { /* yoksay */ });
    }, []);

    const ton = useCallback((frekanslar: number[], sure = 0.18, aralik = 0.1, tip: OscillatorType = 'sine') => {
        if (getMutedState()) return;
        try {
            if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            const ctx = ctxRef.current;
            frekanslar.forEach((f, i) => {
                const t0 = ctx.currentTime + i * aralik;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = tip;
                osc.frequency.setValueAtTime(f, t0);
                gain.gain.setValueAtTime(0.0001, t0);
                gain.gain.exponentialRampToValueAtTime(0.18, t0 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, t0 + sure);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(t0); osc.stop(t0 + sure + 0.05);
            });
        } catch { /* yoksay */ }
    }, []);

    // Kırmızı yak, rastgele süre sonra yeşile geç
    const kirmiziYak = useCallback((sev: number) => {
        if (zamanRef.current) clearTimeout(zamanRef.current);
        setIsik('kirmizi');
        const { min, max } = SEVIYELER[sev];
        zamanRef.current = setTimeout(() => {
            setIsik('yesil');
            ton([784, 1047], 0.15, 0.09); // yeşil işareti: kısa "ding-dong"
        }, min + Math.random() * (max - min));
    }, [ton]);

    const basla = useCallback(async (sev: number) => {
        setSeviye(sev);
        setAdim(0);
        setFaz('oyna');
        setIsik('kirmizi');
        kilitRef.current = true;
        await konus('Yeşil yanınca bas. Kırmızıda bekle.');
        kilitRef.current = false;
        kirmiziYak(sev);
    }, [kirmiziYak]);

    const bas = useCallback(async () => {
        if (faz !== 'oyna' || kilitRef.current) return;
        setBasildi(true);
        setTimeout(() => setBasildi(false), 150);
        if (isik === 'kirmizi') {
            // Erken bastı: ceza yok, ilerlemez. Lamba yeniden saymaya başlar.
            kilitRef.current = true;
            setUyari(true);
            ton([220], 0.25, 0, 'triangle');
            await wait(300);
            await konus('Bekle.');
            setUyari(false);
            kilitRef.current = false;
            kirmiziYak(seviye);
            return;
        }
        // Yeşilde bastı
        kilitRef.current = true;
        if (zamanRef.current) clearTimeout(zamanRef.current);
        const yeni = adim + 1;
        setAdim(yeni);
        setIsik('kirmizi');
        ton([523, 659, 784], 0.15, 0.08);
        if (yeni >= ADIM) {
            await wait(900);
            ton([523, 659, 784, 1047], 0.22, 0.12);
            await wait(700);
            setFaz('bitti');
            kit.basari();
            await konus('Eve vardın! Çok güzel bekledin.');
            kilitRef.current = false;
            return;
        }
        await wait(700);
        kilitRef.current = false;
        kirmiziYak(seviye);
    }, [faz, isik, adim, seviye, ton, kirmiziYak]);

    const ilkBasla = useRef(false);
    useEffect(() => { if (!ilkBasla.current) { ilkBasla.current = true; basla(kit.seviye); } }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const menuyeDon = () => {
        if (zamanRef.current) clearTimeout(zamanRef.current);
        cancelSpeech().catch(() => { /* yoksay */ });
        kilitRef.current = false;
        setFaz('menu');
    };

    const Baslik = ({ geri, ayar }: { geri: () => void; ayar?: () => void }) => (
        <div className="flex items-center justify-between p-3">
            <button onClick={geri} className="bg-white rounded-full p-2.5 shadow-lg text-emerald-700" style={{ touchAction: 'manipulation' }} aria-label="Geri">
                <ArrowLeftIcon className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-black text-emerald-800">🚦 Bekle ve Bas</h1>
            {ayar ? <button onClick={ayar} className="bg-white rounded-full w-10 h-10 shadow-lg text-lg" style={{ touchAction: 'manipulation' }} aria-label="Ayarlar (ebeveyn)">⚙️</button> : <div className="w-10" />}
        </div>
    );

    if (faz === 'menu') {
        return (
            <div className="w-full h-full overflow-y-auto bg-gradient-to-b from-sky-100 to-emerald-100 flex flex-col">
                <Baslik geri={onBack} />
                <div className="flex-1 flex flex-col items-center justify-center gap-5 p-4">
                    <div className="text-7xl">🚦</div>
                    <p className="text-center text-emerald-900 font-semibold max-w-xs">
                        Kırmızı yanarken bekle. Yeşil yanınca büyük düğmeye bas. Araba eve gitsin!
                    </p>
                    <div className="flex flex-col gap-3 w-full max-w-xs">
                        {SEVIYELER.map((s, i) => (
                            <button key={i} onClick={() => basla(i)} style={{ touchAction: 'manipulation' }}
                                className="bg-white hover:bg-emerald-50 rounded-2xl shadow-lg px-5 py-3 flex items-center justify-between">
                                <span className="text-lg font-black text-emerald-700">{s.ad}</span>
                                <span className="text-sm font-bold text-emerald-500">{s.alt}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (faz === 'bitti') {
        return (
            <div className="w-full h-full bg-gradient-to-b from-sky-100 to-emerald-100 flex flex-col items-center justify-center gap-6 p-6">
                <div className="text-7xl animate-bounce">🏠</div>
                <h2 className="text-2xl font-black text-emerald-700 text-center">Eve vardın! Çok güzel bekledin!</h2>
                <div className="flex gap-3">
                    <button onClick={() => basla(kit.seviye)} style={{ touchAction: 'manipulation' }} className="bg-green-500 text-white px-6 py-3 rounded-2xl font-bold shadow-lg">🔁 Tekrar</button>
                    <button onClick={onBack} style={{ touchAction: 'manipulation' }} className="bg-white text-emerald-700 px-6 py-3 rounded-2xl font-bold shadow-lg">🏠 Çık</button>
                </div>
            </div>
        );
    }

    const yesil = isik === 'yesil';
    return (
        <div className="w-full h-full bg-gradient-to-b from-sky-100 to-emerald-100 flex flex-col select-none">
            <Baslik geri={() => { menuyeDon(); onBack(); }} ayar={menuyeDon} />

            {/* Trafik lambası */}
            <div className="flex justify-center mt-1">
                <div className="bg-gray-800 rounded-3xl p-3 flex flex-col gap-3 shadow-2xl">
                    <div className={`w-20 h-20 rounded-full transition-all duration-200 ${!yesil ? 'bg-red-500 shadow-[0_0_40px_10px_rgba(239,68,68,0.6)]' : 'bg-red-900/40'} ${uyari ? 'animate-pulse' : ''}`} />
                    <div className={`w-20 h-20 rounded-full transition-all duration-200 ${yesil ? 'bg-green-400 shadow-[0_0_40px_10px_rgba(74,222,128,0.7)]' : 'bg-green-900/40'}`} />
                </div>
            </div>
            <div className={`text-center text-2xl font-black mt-3 h-8 ${yesil ? 'text-green-600' : 'text-red-500'}`}>
                {uyari ? 'Bekle!' : yesil ? 'Bas!' : 'Bekle...'}
            </div>

            {/* Yol: araba eve doğru ilerler */}
            <div className="relative mx-4 mt-4 h-20 bg-gray-600 rounded-2xl shadow-inner overflow-hidden">
                <div className="absolute inset-x-3 top-1/2 h-1 -translate-y-1/2 border-t-4 border-dashed border-yellow-300" />
                {Array.from({ length: ADIM }, (_, i) => (
                    <div key={i} className={`absolute top-1 w-3 h-3 rounded-full ${i < adim ? 'bg-yellow-300' : 'bg-white/30'}`}
                        style={{ left: `calc(${8 + (i + 1) * (80 / ADIM)}% - 6px)` }} />
                ))}
                <div className="absolute top-1/2 text-5xl transition-all duration-700 ease-out"
                    style={{ left: `calc(${4 + adim * (80 / ADIM)}%)`, transform: 'translateY(-50%) scaleX(-1)' }}>🚗</div>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-5xl">🏠</div>
            </div>

            {/* Büyük düğme */}
            <div className="flex-1 flex items-center justify-center p-6">
                <button
                    onPointerDown={bas}
                    aria-label="Bas"
                    className={`w-52 h-52 rounded-full shadow-2xl border-8 transition-all duration-150 flex items-center justify-center text-6xl ${yesil ? 'bg-green-500 border-green-300' : 'bg-gray-300 border-gray-200'} ${basildi ? 'scale-90' : 'scale-100'}`}
                    style={{ touchAction: 'manipulation' }}
                >
                    {yesil ? '👆' : '✋'}
                </button>
            </div>
        </div>
    );
};

export default WaitAndPressGameScreen;
