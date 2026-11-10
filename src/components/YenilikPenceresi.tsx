import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Capacitor } from '@capacitor/core';
import { etkinlikSay } from '../services/sayac.ts';

// Açılışta "Bu sürümde yeni" penceresi (Kaan, 2026-10-28): her yeni sürümde bir kez kendiliğinden açılır.
// 2. sayfa bağış ricası; bağış Google Play ile alındığı için yalnız Android'de.
// Yeni sürümde: SURUM'ü değiştir, YENILIKLER'i yeniden yaz.
const SURUM = '2026-11-b';
const ANAHTAR = 'yenilikGoruldu_v1';

const YENILIKLER: { emoji: string; baslik: string; metin: string }[] = [
  { emoji: '🧮', baslik: 'Miktar kavramları yenilendi', metin: 'Kaç Tane Var?, Az/Çok, Tek/Çift, Dolu/Boş, Kalabalık/Tenha ve Bütün/Yarım aşamalı. Bütün/Yarım’da el pizzayı ikiye ve dörde böler, geriye yalnız yarım ya da çeyrek kalır; çeyrek ileri aşamada. Kavramlar › Miktar.' },
  { emoji: '👁️', baslik: 'Duyularımız', metin: 'Göz, kulak, el, burun, dil: önce tek tek, sonra karışık. Kulak sorularında gerçek sesler. Kavramlar › Duyular.' },
  { emoji: '🌡️', baslik: 'Duyular kavramları', metin: 'Islak/Kuru, Sıcak/Soğuk (hava aşamasıyla), Acı/Tatlı, Gürültülü/Sessiz, Kırışık/Düz, Pürüzlü/Pürüzsüz ve Sivri/Küt aşamalı: aynı nesnede yalnız o özellik değişir.' },
  { emoji: '📍', baslik: 'Konumda yeni çalışmalar', metin: 'İç/Dış, Arasında, Sağ/Sol, Yan Yana ve Yakın/Uzak aşamalı. Önce kavramın bir yanı, sonra öteki, en son karışık; 10 sorudan 8 doğru olunca sıradaki aşama açılır. Kavramlar › Konum.' },
  { emoji: '🔊', baslik: 'Daha çok insan sesi', metin: '5N1K cevapları ve yeni kavramların cümleleri gerçek bir insan sesiyle.' },
  { emoji: '⚙️', baslik: 'Rastgele Oyna seçmeli', metin: 'Ana menüdeki Rastgele Oyna düğmesini Ayarlar’dan kapatabilirsiniz.' },
];

// Daha önce kullanılmış cihaz mı? (yeni kuruluma "yenilikler" gösterilmez)
const eskiKullanici = (): boolean => {
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i) || '';
      if (k.startsWith('activityStats_profile_') && !k.endsWith('_backup_v1')) {
        const v = JSON.parse(localStorage.getItem(k) || '{}');
        if (v && Object.keys(v).length > 0) return true;
      }
    }
  } catch { /* yok say */ }
  return false;
};

const YenilikPenceresi: React.FC<{ onDestek?: () => void }> = ({ onDestek }) => {
  const [acik, setAcik] = useState(false);
  const [sayfa, setSayfa] = useState(0);
  // Önizleme: adresin sonuna ?yenilik yazılınca her seferinde açılır, bağış sayfası da görünür
  const onizle = (() => { try { return new URLSearchParams(location.search).has('yenilik'); } catch { return false; } })();
  const destekVar = (Capacitor.getPlatform() === 'android' || onizle) && !!onDestek;

  useEffect(() => {
    if (onizle) { setAcik(true); return; }
    try {
      if (localStorage.getItem(ANAHTAR) === SURUM) return;
      localStorage.setItem(ANAHTAR, SURUM);
    } catch { return; }
    if (!eskiKullanici()) return;
    const z = setTimeout(() => { setAcik(true); etkinlikSay('Yenilikler penceresi', 'acildi'); }, 700);
    return () => clearTimeout(z);
  }, []);

  if (!acik) return null;
  const kapat = () => setAcik(false);
  // Sayaçta "bitti" = Destek Ol'a basıldı (pencereden bağışa geçiş oranı)
  const destek = () => { etkinlikSay('Yenilikler penceresi', 'bitti'); setAcik(false); onDestek?.(); };

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-3">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white shadow-2xl">
        {sayfa === 0 ? (
          <div className="p-5 space-y-3">
            <div className="text-center">
              <div className="text-5xl">🎉</div>
              <h2 className="mt-1 text-2xl font-black text-slate-800">Bu sürümde yeni</h2>
            </div>
            {YENILIKLER.map(y => (
              <div key={y.baslik} className="flex gap-3 rounded-2xl bg-sky-50 border border-sky-100 p-3">
                <span className="text-3xl leading-none">{y.emoji}</span>
                <div>
                  <div className="font-black text-slate-800">{y.baslik}</div>
                  <div className="text-sm text-slate-600 leading-snug">{y.metin}</div>
                </div>
              </div>
            ))}
            <p className="text-xs text-center text-slate-500">Yenilikler Tuğ Ortaokulu özel eğitim öğretmeni Gökhan Laçin'in katkılarıyla hazırlandı. Teşekkürler! 🙏</p>
            <div className="flex gap-2 pt-1">
              <button onClick={kapat} className="flex-1 rounded-2xl bg-slate-100 py-3 font-bold text-slate-600 active:scale-95">Kapat</button>
              {destekVar && <button onClick={() => setSayfa(1)} className="flex-[2] rounded-2xl bg-emerald-500 py-3 text-lg font-black text-white shadow active:scale-95">Devam ▶</button>}
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-3 text-center">
            {/* Aile politikası: bağış çağrısı ebeveynlere; satın alma Ayarlar'da ebeveyn kilidinin (ParentGateButton) arkasında */}
            <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">👨‍👩‍👧 Ebeveynler için</span>
            <div className="text-6xl">💛</div>
            <h2 className="text-2xl font-black text-slate-800">Bir ricamız var</h2>
            <p className="text-slate-700 leading-relaxed">
              İlk Sözüm <b>tamamen ücretsiz ve reklamsız</b>, öyle de kalacak.
            </p>
            <p className="text-slate-700 leading-relaxed">
              İlk Sözüm'ü bir şirket değil, tek bir geliştirici kendi imkânlarıyla yapıyor. Gerçek insan sesi kayıtları, yeni fotoğraflar ve
              iPhone/iPad sürümü için Apple hesabı her ay masraf demek.
            </p>
            <p className="text-slate-700 leading-relaxed">
              Uygulamayı her ay yüzlerce aile kullanıyor ama destek olan yok denecek kadar az.
              <b> Bir çay parası bile</b> yeni etkinliklerin ve seslerin gelmesini sağlar.
            </p>
            <button onClick={destek} className="w-full rounded-2xl bg-amber-400 py-4 text-2xl font-black text-amber-950 shadow-lg active:scale-95">💛 Destek Ol</button>
            <button onClick={kapat} className="w-full rounded-2xl bg-slate-100 py-3 font-bold text-slate-500 active:scale-95">Belki sonra</button>
            <p className="text-xs text-slate-400">Bağış hiçbir özelliği açmaz; her şey zaten herkese açık.</p>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default YenilikPenceresi;
