import React, { useState } from 'react';
import { t } from '../i18n/index.ts';
import { useAppContext } from '../contexts/AppContext.ts';
interface DevelopmentNotesCardProps {
  theme: string;
}

const DevelopmentNotesCard: React.FC<DevelopmentNotesCardProps> = ({ theme }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isCosmic = theme === 'deneme2';
  const isSimple = theme === 'simple';
  const { settings } = useAppContext();
  const isRealisticOn = Boolean((settings as any).isRealisticImagesEnabled);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ((settings as any).handleToggleRealisticImages) {
       (settings as any).handleToggleRealisticImages();
    }
  };

  // Cosmic tema stil (Robot Kontrol Paneli için kompakt)
  if (isCosmic) {
    return (
      <div className="relative w-full mb-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left px-3 py-2 rounded-xl bg-slate-700/50 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">📸</span>
              <span className="text-sm font-medium text-cyan-300">
                {t('developmentNotes.title', 'Yeni: Gerçekçi Görseller')}
              </span>
            </div>
            <span className={`text-cyan-400 text-sm transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
        </button>

        {isExpanded && (
          <div className="mt-2 px-4 py-3 rounded-2xl bg-slate-900/60 backdrop-blur-md border border-cyan-400/20 text-white animate-fade-in space-y-4">
            <div>
              <p className="text-sm opacity-90 leading-relaxed">
                Çizimler otizmli çocuklar için bazen soyut gelebilir. Etkinliklerde, varsa <strong>fotoğraf (gerçek)</strong> görselleri deneme seçeneği eklendi.
              </p>
              <p className="text-xs text-yellow-300/80 mt-2 font-bold">
                ⚠️ Not: Bazı nesnelerin henüz fotoğraf versiyonları eksik olabilir. Eksik olduğunda otomatik çizimli versiyona geçer. Hatalar görebilirsiniz, anlayışınız için teşekkürler.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-cyan-500/20">
              <h4 className="font-bold text-sm mb-1 flex items-center gap-2 text-cyan-200">🖨️ Çıktı Merkezi (Yeni)</h4>
              <p className="text-xs font-medium leading-relaxed opacity-90">
                Çocuğunuz için masa başı eğitim materyalleri hazırlayabilirsiniz. PDF oluşturup yazdırabilirsiniz. 
                <br /><span className="text-amber-400 font-bold mt-1 inline-block">Not: Mobil cihaz performansı henüz geliştirme / test aşamasındadır.</span>
              </p>
            </div>
            
            <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-cyan-500/30">
              <span className="text-sm font-bold text-cyan-100">Alternatif Görseller Açık mı?</span>
              <button
                 onClick={handleToggle}
                 className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${isRealisticOn ? 'bg-cyan-500' : 'bg-slate-600'}`}
              >
                  <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${isRealisticOn ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Simple ve diğer temalar için
  const bgClass = isSimple
    ? 'bg-gradient-to-br from-purple-100 to-pink-50 border-purple-300'
    : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300';
  const textClass = isSimple ? 'text-purple-900' : 'text-indigo-900';
  const subtitleClass = isSimple ? 'text-purple-700' : 'text-indigo-700';

  return (
    <div className="relative w-full mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full text-left px-4 py-3 rounded-2xl border-2 ${bgClass} shadow-md hover:shadow-lg transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📸</span>
            <h3 className={`text-lg font-bold ${textClass}`}>
              {t('developmentNotes.title', 'Yeni: Gerçekçi Görseller (Betá)')}
            </h3>
          </div>
          <span className={`${textClass} text-xl transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </div>
        <p className={`text-sm ${subtitleClass} mt-1`}>
          Soyutlamakta zorlanan çocuklarımız için fotoğraf görsellerini deneyin!
        </p>
      </button>

      {isExpanded && (
        <div className={`mt-2 px-4 py-4 rounded-2xl border-2 ${bgClass} animate-fade-in space-y-4`}>
          <div className={`${textClass} space-y-2`}>
            <p className="text-sm font-medium leading-relaxed">
              Çizgi film karakterleri gibi görseller bazı otizmli çocuklara soyut gelebilir ve algılamalarını zorlaştırabilir. 
              Bu güncellemede, isterseniz oyun içindeki görselleri <b>fotoğraf çekilmiş gibi (gerçekçi)</b> versiyonlarıyla değiştiren bir özellik getirdik.
            </p>
            <p className="text-xs opacity-75 font-semibold">
              ⚠️ Dikkat: Mevcut görsellerin alternatif fotoğrafları henüz tam yüklenmediği için eksik olanlar çıkabilir. Eksik olanda oyun eski çizimli halini gösterecektir. Hatalar olursa lütfen bize iletin.
            </p>
          </div>

          <div className={`mt-3 pt-3 border-t border-indigo-200/50 ${textClass}`}>
            <h4 className="font-bold text-sm mb-1 flex items-center gap-2">🖨️ Çıktı Merkezi (Yeni)</h4>
            <p className="text-xs font-medium leading-relaxed">
              Çocuğunuz için masa başı eğitim materyalleri (çalışma kağıtları) hazırlayabilirsiniz. PDF oluşturup yazdırabilirsiniz. 
              <br /><span className="text-indigo-600 font-bold mt-1 inline-block">Not: Mobil cihaz performansı henüz geliştirme / test aşamasındadır.</span>
            </p>
          </div>
          
          <div className="flex items-center justify-between bg-white/50 p-3 rounded-xl border border-white/60 shadow-sm mt-3" onClick={handleToggle}>
             <div>
                <span className={`text-sm font-bold ${textClass}`}>Gerçekçi Görüntüleri Aç</span>
             </div>
             <button
               className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${isRealisticOn ? 'bg-indigo-500' : 'bg-slate-300'}`}
             >
                <span className={`inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${isRealisticOn ? 'translate-x-6' : 'translate-x-1'}`} />
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(DevelopmentNotesCard);
