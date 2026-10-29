import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Capacitor } from '@capacitor/core';
import { etkinlikSay } from '../services/sayac.ts';

// Açılışta "Bu sürümde yeni" penceresi (Kaan, 2026-10-28): her yeni sürümde bir kez kendiliğinden açılır.
// 2. sayfa bağış ricası; bağış Google Play ile alındığı için yalnız Android'de.
// Yeni sürümde: SURUM'ü değiştir, YENILIKLER'i yeniden yaz.
const SURUM = '2026-11';
const ANAHTAR = 'yenilikGoruldu_v1';

const YENILIKLER: { emoji: string; baslik: string; metin: string }[] = [
  { emoji: '🧩', baslik: 'Yeni özel eğitim etkinlikleri', metin: 'Sosyal öyküler (berber, doktor, market, sıra bekleme, arkadaşlık), Kendine Bakım (el yıkama, diş fırçalama, giyinme), Nasıl Hisseder?, Ben-Sen-O, Mevsimler, Yönerge Takibi ("Önce elmaya, sonra topa dokun"), Ne Yapıyor?, Dinle-Bul: Konuşma ve Anlama menüsünde. Toplama, Paralarımız, Günler ve Aylar: Sayılar menüsünde. Saklanan kediyi bulma oyunu: Düşünme ve Hafıza menüsünde.' },
  { emoji: '📚', baslik: 'Kelimeleri tek tek öğren', metin: 'Kategoriye girince önce çalışma sayfası açılır. "Tek Tek Öğren"de hep aynı kelime sorulur (ör. "Elma hangisi?"), %80 doğru olunca sıradakine geçilir; öğrenilenlerle 20 soruluk karışık tekrar yapılır. Bütün kategorilerde (sebze, içecek, oyuncak, hayvan…); en sık kullanılan kelimeler önce gelir.' },
  { emoji: '🧐', baslik: 'Yeni oyun: Farkları Bul', metin: 'İki resim arasındaki farkları bul. 7 sahne; önce 3 fark, başardıkça 5 ve 7. Düşünme ve Hafıza menüsünde.' },
  { emoji: '🕒', baslik: 'Saat Merkezi', metin: 'Akrep ve yelkovanı tanı, saatle oyna, tam saat, buçuk, çeyrek geçiyor, çeyrek var, dijital saat ve parmakla saati kur: 10 bölüm. Kavramlar › Zaman ya da Sayılar menüsünde.' },
  { emoji: '🎨', baslik: 'Renkleri tek tek öğren', metin: 'Kavramlar › Renkler: çalışılacak rengi seçin; önce tanıyın, sonra 2, 3 ve 4 renk arasından bulun (her biri 10 soru), en sonda karışık. Etiketlerde artık rengi de yazıyor ("yeşil elbise").' },
  { emoji: '👩‍🏫', baslik: 'Özel eğitimcilerin önerisi', metin: 'Ayarlar › "Yanlışta kavramı olumsuzla": yanlış seçince "Hayır, bu atkı kısa." yerine "Hayır, bu atkı uzun değil." denir.' },
  { emoji: '🎞️', baslik: 'Olay Sıralama yenilendi', metin: 'Yanlış kart sallanır, sıra bozulmaz. Önce iki kartlık kolay sıralar gelir.' },
  { emoji: '🔤', baslik: 'Harf ve ses etkinlikleri', metin: '"A sesi var mı?" soruları önce kısa (1–2 heceli) kelimelerle başlar, sonra uzar. Yeni: Sesin Yeri (ses başta mı, ortada mı, sonda mı?) ve İşlevsel Okuma (çocuğun sevdiği yiyeceklerin yazısını okuyup resmini bulma): Harfler ve Okuma menüsünde.' },
  { emoji: '🖨️', baslik: 'Saat çalışma kâğıtları', metin: 'Çıktı Merkezi › Saat Kâğıtları: saat kaç, ibreleri çiz, eşleştir; tam, buçuk, çeyrek, 5 dakika. Cevap anahtarıyla.' },
  { emoji: '🔊', baslik: '1.400\'den fazla yeni ses', metin: 'Yeni cümleler de gerçek bir insan sesiyle.' },
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
            <p className="text-xs text-center text-slate-500">Yenilikler özel eğitim öğretmenlerinin önerileriyle geliyor. Teşekkürler! 🙏</p>
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
