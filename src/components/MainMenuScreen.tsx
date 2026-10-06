import React from "react";
import { useAppContext } from '../contexts/AppContext.ts';
import { tasarimAl } from './ui/tasarim.ts';
import TemaliAnaMenu from './TemaliAnaMenu.tsx';
import { Capacitor } from "@capacitor/core";
import { getCurrentLanguage } from "../i18n/index.ts";
import { t } from "../i18n/index.ts";
// import MenuOrb from "./ui/MenuOrb.tsx";
// import CosmicOrb from "./ui/CosmicOrb.tsx";
// GalacticPlanet removed - deneme2 theme simplified
// import ShootingStars from "./ui/ShootingStars.tsx"; // sadeleştirildi
// Heavy animations removed: WanderingMeteors, UFOFlyby
import OtherAppsSection from "./OtherAppsSection.tsx";
import StoryIcon from "./icons/StoryIcon.tsx";
import BasketIcon from "./icons/BasketIcon.tsx";
import SparklesIcon from "./icons/SparklesIcon.tsx";
import SpeakerIcon from "./icons/SpeakerIcon.tsx";
import BrainIcon from "./icons/BrainIcon.tsx";
import HandIcon from "./icons/HandIcon.tsx";
import NumberIcon from "./icons/NumberIcon.tsx";
import GameIcon from "./icons/GameIcon.tsx";
type MainMenuCategory =
  | "letterSound"
  | "objectCategories"
  | "objectCategoriesIntl"
  | "conceptActivities"
  | "reasoningActivities"
  | "fiveWOneH"
  | "fineMotor"
  | "relativeComparison"
  | "programMode"
  | "soundImitation"
  | "miniGames"
  // Beceri kartları (2026-10): Harfler, Sayılar, Düşünme, El, Konuşma, Oyun Odası
  | "harfler"
  | "sayilar"
  | "dusunme"
  | "el"
  | "konusma"
  | "oyunOdasi"
  | "reports";

interface MainMenuScreenProps {
  onSelectCategory: (category: MainMenuCategory) => void;
  onStartRandomMode: () => void;
  onSelectParentTips: () => void;
  onSelectWorksheets?: () => void;
  onSelectSettings?: () => void;
  theme: string;
}

const AudioIssueNote: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = ['koyu', 'dark', 'geceorman', 'ay', 'yagmur', 'deneme2'].includes(theme);
  const isSimple = theme === 'simple';
  const cardClass = isDark
    ? 'bg-white/10 border border-white/15 text-white'
    : isSimple
      ? 'bg-white/90 border border-purple-200 text-purple-900'
      : 'bg-white/80 border border-slate-200 text-slate-900';
  const subTextClass = isDark
    ? 'text-white/80'
    : isSimple
      ? 'text-purple-700'
      : 'text-slate-700';
  const buttonClass = isDark
    ? 'bg-white/15 hover:bg-white/20 text-white'
    : isSimple
      ? 'bg-purple-600/90 hover:bg-purple-700 text-white'
      : 'bg-slate-900/90 hover:bg-slate-900 text-white';

  const handleOpenGoogleTts = async () => {
    const webUrl = 'https://play.google.com/store/apps/details?id=com.google.android.tts';
    if (typeof window !== 'undefined') {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className={`w-full rounded-2xl px-4 py-3 shadow-sm ${cardClass}`}>
      <h3 className="font-bold text-sm sm:text-base">
        {t('menu.audioIssue.title', 'Seslendirme sorunu yaşıyorsanız')}
      </h3>
      {t('menu.audioIssue.line4', '') ? (
        <div className={`mt-1 text-[11px] sm:text-xs ${subTextClass}`}>
          {t('menu.audioIssue.line4', '')}
        </div>
      ) : null}
      <ul className={`mt-3 text-[11px] sm:text-xs space-y-2 ${subTextClass} font-medium`}>
        <li className="font-semibold text-[10px] sm:text-[11px] mb-2 bg-white/20 p-2 rounded leading-relaxed border border-white/10">
          Not: Eski Samsung / Android modellerinde Google TTS kapanabiliyor. Türkçe dil paketi inmediği durumlarda İngilizce aksan çıkabilir veya ses gelmeyebilir. Aşağıdaki ayarları deneyin:
        </li>
        <li className="flex gap-2"><span>1.</span><span>Cihazınızda <b>Ayarlar</b> uygulamasına girin ve arama çubuğuna <b className="bg-white/20 px-1 rounded">Metin</b> yazın.</span></li>
        <li className="flex gap-2"><span>2.</span><span>Çıkan sonuçlardan <b>Metin-Okuma (TTS)</b> veya <b>Metin-Konuşma Çıktısı</b> (Talkback ayarları altında da olabilir) menüsüne girin.</span></li>
        <li className="flex gap-2"><span>3.</span><span>Tercih Edilen Motor olarak <b>Google Ses Tanıma ve Sentez Hizmeti</b> (Google TTS) seçili olduğundan emin olun.</span></li>
        <li className="flex gap-2"><span>4.</span><span>Aynı ekrandan Dil'i <b>Türkçe</b> yapın. Varsa ses seçeneklerinden 4. sesi seçmeyi deneyin.</span></li>
      </ul>
      <button
        type="button"
        onClick={handleOpenGoogleTts}
        className={`mt-2 inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-bold shadow-sm transition ${buttonClass}`}
        style={{ touchAction: 'manipulation' }}
      >
        {t('menu.audioIssue.cta', "Google TTS'yi Ac / Yukle")}
      </button>
    </div>
  );
};

const SystemAnnouncementsCard: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = ['koyu', 'dark', 'geceorman', 'ay', 'yagmur', 'deneme2'].includes(theme);
  const isSimple = theme === 'simple';
  const cardClass = isDark
    ? 'bg-sky-500/15 border border-sky-300/30 text-sky-50'
    : isSimple
      ? 'bg-sky-50 border border-sky-200 text-sky-900'
      : 'bg-sky-50 border border-sky-200 text-sky-900';
  const subTextClass = isDark ? 'text-sky-100/85' : 'text-sky-800';

  const lang = getCurrentLanguage();
  const isTr = lang === 'tr';
  // Bağış yalnızca Google Play üzerinden alınabildiği için destek satırı sadece Android uygulamasında görünür.
  const androidUygulama = Capacitor.getPlatform() === 'android';
  const destekKartiAdi = t('settingsEx.donate.title', isTr ? 'Geliştiriciye Destek Ol' : 'Support the Developer');

  return (
    <div className={`w-full rounded-2xl px-4 py-3 shadow-sm flex items-start gap-3 ${cardClass}`}>
      <span className="text-xl flex-shrink-0 mt-0.5" role="img" aria-label="duyuru">📢</span>
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-bold text-sm sm:text-base leading-tight">
          {isTr ? 'Güncellemeler & Duyurular' : t('menu.announcements', 'Announcements')}
        </h3>
        
        {isTr ? (
          <>
            <p className={`text-xs sm:text-sm leading-relaxed ${subTextClass}`}>
              <b>GÜNCELLEME:</b> İlk Sözüm <b>tamamen ücretsiz ve reklamsızdır.</b> Tüm eğitim içerikleri herkese açıktır; hiçbir özellik için ödeme gerekmez.
            </p>
            {androidUygulama && (
              <p className={`text-xs sm:text-sm leading-relaxed ${subTextClass}`}>
                <b>DESTEK:</b> Uygulamanın gelişmesine katkıda bulunmak isteyenler <b>Ayarlar › {destekKartiAdi}</b> bölümünden gönüllü bağış yapabilir. Bağış hiçbir özelliği açmaz; her şey zaten ücretsizdir. 💛
              </p>
            )}
            <p className={`text-xs sm:text-sm leading-relaxed ${subTextClass}`}>
              <b>YAKINDA:</b> Uygulamamız <b>Windows Store'da</b> da yayınlanacak. Böylece bilgisayar üzerinden de eğitim etkinliklerine kolayca ulaşabileceksiniz.
            </p>
            <div className="bg-white/20 p-2 rounded-lg mt-1 border border-sky-500/20">
              <p className={`text-xs leading-relaxed font-semibold ${subTextClass}`}>
                🎓 Diğer eğitim uygulamalarımız:
              </p>
              <p className={`text-[10px] leading-relaxed ${subTextClass} mt-0.5`}>
                TAZOF turnuvaları için <b>Zeka Ustası</b>; idareciler, sınıflar ve öğretmenler için <b>DersTimeTable</b>. Bağlantıları aşağıdaki uygulama kartlarından inceleyebilirsiniz.
              </p>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed mt-1 ${subTextClass}`}>
              Tüm uygulamalar ve eğitim projeleri hakkında daha fazla bilgi için <b>ozarik.org</b> adresini ziyaret edebilirsiniz.
            </p>
          </>
        ) : (
          <>
            <p className={`text-xs sm:text-sm leading-relaxed ${subTextClass}`}>
              <b>UPDATE:</b> İlk Sözüm is <b>completely free and ad-free.</b> All educational content is open to everyone; no feature requires payment.
            </p>
            {androidUygulama && (
              <p className={`text-xs sm:text-sm leading-relaxed ${subTextClass}`}>
                <b>SUPPORT:</b> If you would like to help the app grow, you can make a voluntary donation from <b>Settings › {destekKartiAdi}</b>. Donations do not unlock anything; everything is already free. 💛
              </p>
            )}
            <p className={`text-xs sm:text-sm leading-relaxed ${subTextClass}`}>
              <b>COMING SOON:</b> The app will also be available on the <b>Windows Store</b>, making it easier to use the activities on a computer.
            </p>
            <p className={`text-xs sm:text-sm leading-relaxed mt-1 ${subTextClass}`}>
              Explore our other educational apps at <b>ozarik.org</b>, including Zeka Ustası for TAZOF tournaments and DersTimeTable for school scheduling.
            </p>
          </>
        )}
      </div>
    </div>
  );
};



const MainMenuScreen: React.FC<MainMenuScreenProps> = ({
  onSelectCategory,
  onStartRandomMode,
  onSelectParentTips,
  onSelectWorksheets,
  theme,
}) => {
  const { settings: ayarlar } = useAppContext();
  const tas = tasarimAl(ayarlar.sahne);
  const lang = getCurrentLanguage();
  const showObjectsIntl = lang !== "tr";
  const isSimpleTheme = theme === "simple";
  const isFoxTheme = theme === "tilki";
  const specialPalette = isSimpleTheme
    ? {
      titleColor: "text-purple-900 drop-shadow-[0_14px_32px_rgba(147,51,234,0.15)]",
      subtitleColor: "text-pink-700 drop-shadow-[0_8px_18px_rgba(236,72,153,0.12)]",
      headerWrapper:
        "px-6 py-4 rounded-3xl border border-purple-200/50 bg-white/85 shadow-[0_32px_70px_rgba(147,51,234,0.12)] backdrop-blur-xl",
      titleWrapper:
        "px-6 py-6 rounded-3xl border border-purple-200/60 bg-white/90 shadow-[0_40px_90px_rgba(147,51,234,0.15)] backdrop-blur-2xl",
      subtitleExtras: "tracking-tight",
      titleExtras: "tracking-tight sm:tracking-normal",
      greetingEmoji: "💖",
      greetingAnimation: "animate-pulse drop-shadow-[0_8px_22px_rgba(236,72,153,0.28)]",
      overlayGradient:
        "bg-gradient-to-br from-white/70 via-purple-50/30 to-pink-50/20 ring-1 ring-inset ring-purple-200/40 shadow-[0_48px_110px_rgba(147,51,234,0.12)] backdrop-blur-3xl",
      overlayTopEmoji: "🦋",
      overlayTopClass:
        "hidden sm:block absolute -top-8 left-6 text-4xl opacity-70 drop-shadow-[0_16px_32px_rgba(147,51,234,0.25)]",
      overlayBottomEmoji: "✨",
      overlayBottomClass:
        "hidden sm:block absolute bottom-6 right-6 text-4xl opacity-60 drop-shadow-[0_18px_36px_rgba(236,72,153,0.28)]",
      gridPadding: "px-2 pb-6 sm:px-4",
    }
    : null;
  const isSpecialTheme = Boolean(specialPalette);

  // Ana menü kartları (2026-10, Kaan onayı): "ne öğretiyor"a göre 8 kart. Tüm temalar bu listeyi kullanır.
  type KartId = Exclude<MainMenuCategory, "programMode">;
  const anaKartlar: Array<{ id: KartId; emoji: string; label: string; icon: React.FC<{ className?: string }>; title: string; subtitle: string; color: 'amber' | 'teal' | 'sky' | 'lime' | 'indigo' | 'rose' | 'cyan' | 'fuchsia'; grad: string; hex: string }> = [
    showObjectsIntl
      ? { id: "objectCategoriesIntl", emoji: "🍎", label: t("categories.objectsIntl.title") || "Objects", icon: BasketIcon, title: t("categories.objectsIntl.title") || "Objects", subtitle: t("categories.objectsIntl.subtitle") || "Animals, fruits and more", color: "amber", grad: "from-amber-300 to-orange-400", hex: "#f59e0b" }
      : { id: "objectCategories", emoji: "🍎", label: "Kelimeler", icon: BasketIcon, title: "Kelimeler", subtitle: "Hayvanlar, meyveler, eşyalar: nesneleri tanı", color: "amber", grad: "from-amber-300 to-orange-400", hex: "#f59e0b" },
    { id: "conceptActivities", emoji: "💡", label: "Kavramlar", icon: SparklesIcon, title: "Kavramlar", subtitle: "Renk, boyut, konum, miktar, zaman ve daha fazlası", color: "teal", grad: "from-teal-300 to-emerald-400", hex: "#14b8a6" },
    { id: "harfler", emoji: "🔤", label: "Harfler ve Okuma", icon: StoryIcon, title: "Harfler ve Okuma", subtitle: "Harf, ses, hece, BASARA", color: "sky", grad: "from-sky-300 to-blue-400", hex: "#3b82f6" },
    { id: "sayilar", emoji: "🔢", label: "Sayılar", icon: NumberIcon, title: "Sayılar", subtitle: "Say, eşle, sırala", color: "lime", grad: "from-lime-300 to-green-400", hex: "#22c55e" },
    { id: "dusunme", emoji: "🧠", label: "Düşünme ve Hafıza", icon: BrainIcon, title: "Düşünme ve Hafıza", subtitle: "Hangisi farklı, hafıza, sıralama, örüntü", color: "indigo", grad: "from-indigo-300 to-violet-400", hex: "#6366f1" },
    { id: "el", emoji: "✋", label: "El Becerisi", icon: HandIcon, title: "El Becerisi", subtitle: "Çizgi, boyama, labirent, yapboz", color: "rose", grad: "from-rose-300 to-pink-400", hex: "#f43f5e" },
    { id: "konusma", emoji: "🗣️", label: "Konuşma ve Anlama", icon: SpeakerIcon, title: "Konuşma ve Anlama", subtitle: "Ses taklidi, 5N1K, günlük işler", color: "cyan", grad: "from-cyan-300 to-teal-400", hex: "#06b6d4" },
    { id: "oyunOdasi", emoji: "🎈", label: "Oyun Odası", icon: GameIcon, title: "Oyun Odası", subtitle: "Ödül ve rahatlama oyunları", color: "fuchsia", grad: "from-fuchsia-300 to-purple-400", hex: "#a855f7" },
  ];
  const menuItems = anaKartlar;
  const kartSec = (id: KartId) => onSelectCategory(id);

  const textColorClass = specialPalette
    ? specialPalette.titleColor
    : "text-white text-shadow-soft";
  const subtitleColorClass = specialPalette
    ? specialPalette.subtitleColor
    : "text-white text-shadow-soft";
  const titleWrapperClass = specialPalette?.titleWrapper ?? "";
  const titleWrapperOpacityClass =
    isFoxTheme && specialPalette ? "bg-white/65" : "";
  const subtitleExtras = specialPalette?.subtitleExtras ?? "";
  const titleExtras = specialPalette?.titleExtras ?? "";
  const greetingEmoji = specialPalette?.greetingEmoji ?? "\uD83D\uDC4B";
  const greetingAnimation = specialPalette?.greetingAnimation ?? "";
  const gridPadding = specialPalette?.gridPadding ?? "";

  // === Temalı arayüz (Orman, Deniz, Gökkuşağı, Konfeti) ===
  if (tas) {
    return (
      <TemaliAnaMenu
        tas={tas}
        kartlar={menuItems}
        onKart={(id) => kartSec(id as KartId)}
        onProgram={() => onSelectCategory('programMode')}
        onRastgele={onStartRandomMode}
        ebeveyn={[
          { id: 'tips', emoji: '💡', label: 'İpuçları', onClick: onSelectParentTips },
          ...(onSelectWorksheets ? [{ id: 'sheets', emoji: '🖨️', label: 'Çalışma Kâğıtları', onClick: onSelectWorksheets }] : []),
          { id: 'reports', emoji: '📊', label: 'Raporlar', onClick: () => onSelectCategory('reports') },
        ]}
        selam={`${t("menu.hello", "Merhaba")} 👋`}
        baslik={t("menu.appTitle", "İlk Sözüm: Otizm & Okul Öncesi")}
      >
        <SystemAnnouncementsCard theme={theme} />
        <AudioIssueNote theme={theme} />
        <OtherAppsSection theme={theme} />
      </TemaliAnaMenu>
    );
  }


  return (
    <div className="flex flex-col items-center justify-start h-full max-w-lg landscape:max-w-5xl mx-auto p-4 sm-landscape:p-2 animate-fade-in">
      <div
        className={`w-full text-center mb-4 landscape:mb-2 ${titleWrapperClass} ${titleWrapperOpacityClass}`}
      >
        <p
          className={`text-lg landscape:text-base sm-landscape:text-sm font-semibold mb-1 ${subtitleColorClass} ${subtitleExtras}`}
        >
          {t("menu.hello", "Merhaba")}
          <span
            className={`ml-1 ${greetingAnimation}`}
            aria-hidden="true"
          >
            {greetingEmoji}
          </span>
        </p>
        <h1
          className={`text-base sm:text-lg landscape:text-base sm-landscape:text-sm font-black ${textColorClass} ${titleExtras}`}
        >
          {t("menu.appTitle", "İlk Sözüm: Otizm & Okul Öncesi")}
        </h1>
      </div>

      <div
        className={`w-full flex-grow overflow-y-auto pr-2 animate-fade-in relative ${isSpecialTheme ? "pt-2" : ""
          }`}
      >
        {isSpecialTheme && specialPalette && (
          <>
            <div className={`absolute inset-0 rounded-[32px] ${specialPalette.overlayGradient}`} />
            <span className={specialPalette.overlayTopClass}>
              {specialPalette.overlayTopEmoji}
            </span>
            <span className={specialPalette.overlayBottomClass}>
              {specialPalette.overlayBottomEmoji}
            </span>
          </>
        )}
        <div className={`relative space-y-4 ${gridPadding}`}>
          {/* Üstte iki büyük düğme: Program Modu ve Rastgele */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onSelectCategory('programMode')}
              className="relative flex flex-col items-center justify-center gap-1 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 p-4 text-white shadow-[0_10px_24px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 active:scale-95 transition"
            >
              <span className="text-4xl drop-shadow" aria-hidden="true">🎓</span>
              <span className="text-base font-black leading-tight drop-shadow-sm">{t('programMode.menuTitleShort', 'Program Modu')}</span>
              <span className="text-[11px] font-semibold text-white/90">📚 {t('programMode.unitsCount', '{count} Ünite').replace('{count}', '10')} · {t('programMode.daily', 'günlük plan')}</span>
            </button>
            <button
              onClick={onStartRandomMode}
              className="relative flex flex-col items-center justify-center gap-1 rounded-3xl bg-gradient-to-br from-amber-400 to-rose-500 p-4 text-white shadow-[0_10px_24px_rgba(244,63,94,0.3)] hover:-translate-y-0.5 active:scale-95 transition"
            >
              <span className="text-4xl drop-shadow" aria-hidden="true">🎲</span>
              <span className="text-base font-black leading-tight drop-shadow-sm">{t('menu.random.titleShort', 'Rastgele Oyna')}</span>
              <span className="text-[11px] font-semibold text-white/90">{t('menu.random.subtitleShort', 'Karışık etkinlikler')}</span>
            </button>
          </div>

          {/* Öğrenme alanları: 8 kart */}
          <div className="grid grid-cols-2 landscape:grid-cols-4 gap-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => kartSec(item.id)}
                className="flex flex-col items-center text-center rounded-3xl bg-white/90 border border-white p-3 pt-4 min-h-[140px] shadow-[0_6px_16px_rgba(15,23,42,0.10)] hover:shadow-[0_10px_24px_rgba(15,23,42,0.16)] hover:-translate-y-0.5 active:scale-95 transition"
              >
                <span className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.grad} flex items-center justify-center text-4xl shadow-inner mb-2`} aria-hidden="true">{item.emoji}</span>
                <span className="text-sm font-black leading-tight text-slate-800">{item.title}</span>
                <span className="mt-1 text-[11px] leading-snug text-slate-500 line-clamp-2">{item.subtitle}</span>
              </button>
            ))}
          </div>
          {lang !== "tr" && (
            <div className="text-center text-xs text-slate-500">
              {t("settings.languageNote", "Letter activities are currently Turkish-only.")}
            </div>
          )}

          {/* Ebeveyn köşesi */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-sm font-black ${subtitleColorClass}`}>👨‍👩‍👧 {t('menu.parentCorner', 'Ebeveyn Köşesi')}</span>
              <span className="flex-1 h-px bg-current opacity-20" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'tips', emoji: '💡', label: t('menu.parentTips.short', 'İpuçları'), onClick: onSelectParentTips },
                ...(onSelectWorksheets ? [{ id: 'sheets', emoji: '🖨️', label: t('menu.worksheets.short', 'Çalışma Kâğıtları'), onClick: onSelectWorksheets }] : []),
                { id: 'reports', emoji: '📊', label: t('menu.reports.title', 'Raporlar'), onClick: () => onSelectCategory('reports') },
              ].map((k) => (
                <button
                  key={k.id}
                  onClick={k.onClick}
                  className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white/80 border border-slate-200 py-3 px-1 shadow-sm hover:bg-white active:scale-95 transition"
                >
                  <span className="text-2xl" aria-hidden="true">{k.emoji}</span>
                  <span className="text-[11px] font-bold text-slate-700 leading-tight text-center">{k.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Duyurular ve notlar */}
          <div>
            <SystemAnnouncementsCard theme={theme} />
            <AudioIssueNote theme={theme} />
            <OtherAppsSection theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainMenuScreen);
