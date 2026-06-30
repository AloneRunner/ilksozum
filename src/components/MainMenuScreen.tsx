import React from "react";
import { getCurrentLanguage } from "../i18n/index.ts";
import { t } from "../i18n/index.ts";
import MenuButton from "./ui/MenuButton.tsx";
// import MenuOrb from "./ui/MenuOrb.tsx";
// import CosmicOrb from "./ui/CosmicOrb.tsx";
// GalacticPlanet removed - deneme2 theme simplified
import GalacticRobotMascot from "./ui/GalacticRobotMascot.tsx";
import OceanJellyfishMascot from "./ui/OceanJellyfishMascot.tsx";
import MascotContainer from "./ui/MascotContainer.tsx";
// import ShootingStars from "./ui/ShootingStars.tsx"; // sadeleştirildi
// Heavy animations removed: WanderingMeteors, UFOFlyby
import DevelopmentNotesCard from "./DevelopmentNotesCard.tsx";
import OtherAppsSection from "./OtherAppsSection.tsx";
import LoyaltyProgressCard from "./LoyaltyProgressCard.tsx";
import { useAppContext } from "../contexts/AppContext.ts";
import StoryIcon from "./icons/StoryIcon.tsx";
import BasketIcon from "./icons/BasketIcon.tsx";
import SparklesIcon from "./icons/SparklesIcon.tsx";
import SpeakerIcon from "./icons/SpeakerIcon.tsx";
import SudokuIcon from "./icons/SudokuIcon.tsx";
import EyeIcon from "./icons/EyeIcon.tsx";
import StarIcon from "./icons/StarIcon.tsx";
import PersonIcon from "./icons/PersonIcon.tsx";
import AcademicCapIcon from "./icons/AcademicCapIcon.tsx";
import FiveWOneHIcon from "./icons/FiveWOneHIcon.tsx";
import GameIcon from "./icons/GameIcon.tsx";
import PrintIcon from "./icons/PrintIcon.tsx";
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
  | "miniGames";

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
              <b>YENİ:</b> Alternatif bir okuma yöntemi olan <b>BASARA Sistemi</b> (54 Ders) eklendi! Harfler & Heceler menüsünden ulaşabilirsiniz.
            </p>
            <p className={`text-xs sm:text-sm leading-relaxed ${subTextClass}`}>
              <b>YENİ:</b> Kavramlar (Zaman) menüsüne etkileşimli <b>Saat Öğreniyorum</b> etkinliği eklendi! Çocuklar artık zorluk derecesine göre kendi saatlerini kurabilir.
            </p>
            <div className="bg-white/20 p-2 rounded-lg mt-1 border border-sky-500/20">
              <p className={`text-xs leading-relaxed font-semibold ${subTextClass}`}>
                🌍 Yabancı Dil Desteği Kaldırılıyor:
              </p>
              <p className={`text-[10px] leading-relaxed ${subTextClass} mt-0.5`}>
                Şu an kullanıcılarımızın %96'sı Türkiye'den. Tüm enerjimizi Türkçeye özel eğitim içeriklerine verebilmek için (örneğin BASARA gibi sadece Türkçede olan sistemler) çok yakında İngilizce, Almanca vb. yabancı dil desteklerini uygulamadan tamamen kaldıracağız.
              </p>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed mt-1 ${subTextClass}`}>
              Bu süreçte uygulamayı huzurla kullanabilmeniz için <b>1 Ağustos 2026'ya kadar tüm Premium özellikleri ücretsiz</b> açtık. Anlayışınız için teşekkür ederiz. 💜
            </p>
          </>
        ) : (
          <p className={`text-xs sm:text-sm leading-relaxed ${subTextClass}`}>
            <b>Important Notice:</b> Foreign language support will be removed soon. Since 96% of our users are from Turkey, we are shifting our entire focus to Turkish special education content. Thank you for your understanding.
          </p>
        )}
      </div>
    </div>
  );
};

const PrintInfoNote: React.FC<{ theme: string }> = ({ theme }) => {
  const isDark = ['koyu', 'dark', 'geceorman', 'ay', 'yagmur', 'deneme2'].includes(theme);
  const isSimple = theme === 'simple';
  const cardClass = isDark
    ? 'bg-indigo-900/40 border border-indigo-500/30 text-white'
    : isSimple
      ? 'bg-indigo-50 border border-indigo-200 text-indigo-900'
      : 'bg-indigo-50 border border-indigo-200 text-indigo-900';

  return (
    <div className={`w-full rounded-2xl px-4 py-3 shadow-sm flex items-start gap-3 ${cardClass}`}>
      <span className="text-xl flex-shrink-0 mt-0.5" role="img" aria-label="PC">💻</span>
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-bold text-sm leading-tight border-b border-indigo-200/20 pb-1">
          Bilgisayardan Yazdırmak Daha Kolay!
        </h3>
        <p className="text-xs leading-relaxed opacity-90">
          Çalışma kağıtlarına bilgisayarınızdan erişmek ve çok daha rahat yazıcıdan çıktı almak için <span className="font-bold font-mono bg-white/20 px-1 py-0.5 rounded text-[10px] select-all">ilksozumotizm.netlify.app</span> adresine girebilirsiniz.
        </p>
        <button 
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.clipboard) {
              navigator.clipboard.writeText('https://ilksozumotizm.netlify.app');
              alert('Bağlantı kopyalandı! Bilgisayarınıza gönderebilirsiniz.');
            }
          }}
          className="self-start text-[10px] font-bold bg-indigo-600 text-white px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
        >
          🔗 Bağlantıyı Kopyala
        </button>
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
  const appCtx = useAppContext();
  const loyaltySnapshot = appCtx?.settings?.loyalty;
  const lang = getCurrentLanguage();
  const showObjectsIntl = lang !== "tr";
  const isSimpleTheme = theme === "simple";
  const isCatTheme = theme === "kedi";
  const isHilalTheme = theme === "ay2";
  const isSnowTheme = theme === "kar";
  const isFoxTheme = theme === "tilki";
  const isZurafaTheme = theme === "zurafa";
  const isDenemeTheme = theme === "deneme";
  const isDeneme2Theme = theme === "deneme2";
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
    : isCatTheme
      ? {
        titleColor: "text-orange-700 drop-shadow-[0_4px_14px_rgba(255,255,255,0.65)]",
        subtitleColor: "text-orange-900 drop-shadow-[0_3px_10px_rgba(255,255,255,0.55)]",
        headerWrapper:
          "px-5 py-3 rounded-3xl bg-white/70 border border-orange-200/50 shadow-xl shadow-orange-200/30 backdrop-blur-lg",
        titleWrapper:
          "px-6 py-4 rounded-3xl bg-white/75 border border-orange-200/60 shadow-[0_18px_40px_rgba(249,115,22,0.22)] backdrop-blur-lg",
        subtitleExtras: "tracking-wide",
        titleExtras: "tracking-tight",
        greetingEmoji: "\uD83D\uDC08",
        greetingAnimation: "animate-cat-wave drop-shadow-[0_3px_8px_rgba(249,115,22,0.35)]",
        overlayGradient:
          "bg-gradient-to-b from-white/40 via-white/22 to-white/12 border border-orange-200/45 shadow-inner shadow-orange-200/30 backdrop-blur-lg",
        overlayTopEmoji: "\uD83D\uDC31",
        overlayTopClass:
          "hidden sm:block absolute -top-9 -left-3 text-5xl opacity-70 drop-shadow-[0_10px_25px_rgba(249,115,22,0.25)]",
        overlayBottomEmoji: "\uD83D\uDC08",
        overlayBottomClass:
          "hidden sm:block absolute bottom-6 -right-2 text-4xl opacity-60 drop-shadow-[0_10px_25px_rgba(249,115,22,0.25)]",
        gridPadding: "px-3 pb-5",
      }
      : isHilalTheme
        ? {
          titleColor: "text-indigo-800 drop-shadow-[0_4px_14px_rgba(255,255,255,0.6)]",
          subtitleColor: "text-indigo-900 drop-shadow-[0_3px_10px_rgba(255,255,255,0.55)]",
          headerWrapper:
            "px-5 py-3 rounded-3xl bg-white/70 border border-indigo-200/50 shadow-xl shadow-indigo-200/30 backdrop-blur-lg",
          titleWrapper:
            "px-6 py-4 rounded-3xl bg-white/75 border border-indigo-200/60 shadow-[0_18px_40px_rgba(99,102,241,0.22)] backdrop-blur-lg",
          subtitleExtras: "tracking-wide",
          titleExtras: "tracking-tight",
          greetingEmoji: "\uD83C\uDF19",
          greetingAnimation: "animate-cat-wave drop-shadow-[0_4px_12px_rgba(79,70,229,0.35)]",
          overlayGradient:
            "bg-gradient-to-b from-white/42 via-indigo-50/24 to-white/12 border border-indigo-200/45 shadow-inner shadow-indigo-200/25 backdrop-blur-lg",
          overlayTopEmoji: "\u2728",
          overlayTopClass:
            "hidden sm:block absolute -top-9 -left-3 text-5xl opacity-70 drop-shadow-[0_10px_25px_rgba(79,70,229,0.25)]",
          overlayBottomEmoji: "\uD83C\uDF1F",
          overlayBottomClass:
            "hidden sm:block absolute bottom-6 -right-2 text-4xl opacity-60 drop-shadow-[0_10px_25px_rgba(79,70,229,0.25)]",
          gridPadding: "px-3 pb-5",
        }
        : isSnowTheme
          ? {
            titleColor: "text-sky-100 drop-shadow-[0_4px_18px_rgba(15,23,42,0.55)]",
            subtitleColor: "text-sky-50 drop-shadow-[0_3px_14px_rgba(15,23,42,0.5)]",
            headerWrapper:
              "px-5 py-3 rounded-3xl bg-white/40 border border-sky-100/60 shadow-xl shadow-sky-200/40 backdrop-blur-2xl",
            titleWrapper:
              "px-6 py-4 rounded-3xl bg-white/45 border border-sky-100/60 shadow-[0_24px_48px_rgba(96,165,250,0.28)] backdrop-blur-2xl",
            subtitleExtras: "tracking-wide uppercase",
            titleExtras: "tracking-tight",
            greetingEmoji: "\u2744",
            greetingAnimation: "animate-cat-wave drop-shadow-[0_4px_16px_rgba(148,197,255,0.45)]",
            overlayGradient:
              "bg-gradient-to-b from-white/55 via-sky-100/30 to-sky-200/18 border border-sky-100/45 shadow-inner shadow-sky-200/30 backdrop-blur-2xl",
            overlayTopEmoji: "\u2745",
            overlayTopClass:
              "hidden sm:block absolute -top-9 -left-4 text-5xl opacity-75 drop-shadow-[0_12px_26px_rgba(148,197,255,0.3)]",
            overlayBottomEmoji: "\u2744",
            overlayBottomClass:
              "hidden sm:block absolute bottom-7 -right-3 text-4xl opacity-75 drop-shadow-[0_12px_26px_rgba(148,197,255,0.28)]",
            gridPadding: "px-3 pb-6",
          }
          : isFoxTheme
            ? {
              titleColor: "text-amber-800 drop-shadow-[0_4px_14px_rgba(255,255,255,0.55)]",
              subtitleColor: "text-emerald-900 drop-shadow-[0_3px_10px_rgba(255,255,255,0.45)]",
              headerWrapper:
                "px-5 py-3 rounded-3xl bg-white/55 border border-amber-100/60 shadow-xl shadow-emerald-100/30 backdrop-blur-lg",
              titleWrapper:
                "px-6 py-4 rounded-3xl bg-white/60 border border-amber-200/55 shadow-[0_18px_40px_rgba(245,158,11,0.22)] backdrop-blur-lg",
              subtitleExtras: "tracking-wide",
              titleExtras: "tracking-tight",
              greetingEmoji: "\uD83E\uDD8A",
              greetingAnimation: "animate-bounce drop-shadow-[0_4px_12px_rgba(245,158,11,0.32)]",
              overlayGradient:
                "bg-gradient-to-b from-white/35 via-amber-50/16 to-emerald-50/12 border border-amber-100/40 shadow-inner shadow-emerald-100/25 backdrop-blur-lg",
              overlayTopEmoji: "\u2728",
              overlayTopClass:
                "hidden sm:block absolute -top-9 -left-4 text-5xl opacity-70 drop-shadow-[0_12px_24px_rgba(245,158,11,0.28)]",
              overlayBottomEmoji: "\uD83C\uDF3F",
              overlayBottomClass:
                "hidden sm:block absolute bottom-6 -right-2 text-4xl opacity-60 drop-shadow-[0_12px_24px_rgba(56,161,105,0.28)]",
              gridPadding: "px-3 pb-5",
            }
            : isZurafaTheme
              ? {
                titleColor: "text-cyan-700 drop-shadow-[0_4px_14px_rgba(255,255,255,0.65)]",
                subtitleColor: "text-cyan-900 drop-shadow-[0_3px_10px_rgba(255,255,255,0.55)]",
                headerWrapper:
                  "px-5 py-3 rounded-3xl bg-white/70 border border-cyan-200/50 shadow-xl shadow-cyan-200/30 backdrop-blur-lg",
                titleWrapper:
                  "px-6 py-4 rounded-3xl bg-white/75 border border-cyan-200/60 shadow-[0_18px_40px_rgba(6,182,212,0.22)] backdrop-blur-lg",
                subtitleExtras: "tracking-wide",
                titleExtras: "tracking-tight",
                greetingEmoji: "\uD83E\uDD92",
                greetingAnimation: "animate-cat-wave drop-shadow-[0_3px_8px_rgba(6,182,212,0.35)]",
                overlayGradient:
                  "bg-gradient-to-b from-white/40 via-white/22 to-white/12 border border-cyan-200/45 shadow-inner shadow-cyan-200/30 backdrop-blur-lg",
                overlayTopEmoji: "\uD83E\uDD92",
                overlayTopClass:
                  "hidden sm:block absolute -top-9 -left-3 text-5xl opacity-70 drop-shadow-[0_10px_25px_rgba(6,182,212,0.25)]",
                overlayBottomEmoji: "\uD83C\uDF3C",
                overlayBottomClass:
                  "hidden sm:block absolute bottom-6 -right-2 text-4xl opacity-60 drop-shadow-[0_10px_25px_rgba(6,182,212,0.25)]",
                gridPadding: "px-3 pb-5",
              }
              : null;
  const isSpecialTheme = Boolean(specialPalette);

  const menuItems = [
    // Program Mode (experimental beta)
    {
      id: "programMode" as const,
      icon: AcademicCapIcon,
      title: t('programMode.menuTitle', 'Program Modu (Deneme)'),
      subtitle: t('programMode.menuSubtitle', 'Uzman planıyla günlük oturum başlat'),
      color: 'emerald' as const,
    },
    {
      id: "letterSound" as const,
      icon: StoryIcon,
      title: t("menu.letterSound.title", "Harf ve Sesler"),
      subtitle: t(
        "menu.letterSound.subtitle",
        "Harfleri ve sesleri \u00f6\u011fren, hecele ve oku."
      ),
      color: "sky" as const,
    },
    ...(lang === "tr"
      ? [
        {
          id: "objectCategories" as const,
          icon: BasketIcon,
          title: t("menu.objects.title", "Nesneleri Tan\u0131yal\u0131m"),
          subtitle: t(
            "menu.objects.subtitle",
            "Hayvanlar\u0131, meyveleri ve daha fazlas\u0131n\u0131 \u00f6\u011fren."
          ),
          color: "amber" as const,
        },
      ]
      : []),
    ...(!showObjectsIntl
      ? []
      : [
        {
          id: "objectCategoriesIntl" as const,
          icon: BasketIcon,
          title: t("categories.objectsIntl.title") || "Objects",
          subtitle:
            t("categories.objectsIntl.subtitle") ||
            "Curated objects for non-TR languages",
          color: "amber" as const,
        },
      ]),
    {
      id: "fiveWOneH" as const,
      icon: FiveWOneHIcon,
      title: t('menu.fiveWOneH.title', '5N1K'),
      subtitle: `${t('menu.fiveWOneH.subtitle', 'Kim • Ne • Nerede • Ne Zaman • Neden • Nasıl')} — ${t('menu.fiveWOneH.developingNote', 'Geliştiriliyor')}`,
      color: 'emerald' as const,
    },
    {
      id: "conceptActivities" as const,
      icon: SparklesIcon,
      title: t("menu.concepts.title", "Kavram Etkinlikleri"),
      subtitle: t(
        "menu.concepts.subtitle",
        "Renkleri, \u015fekilleri ve z\u0131t kavramlar\u0131 \u00f6\u011fren."
      ),
      color: "teal" as const,
    },
    {
      id: "reasoningActivities" as const,
      icon: SudokuIcon,
      title: t("menu.reasoning.title", "Ak\u0131l Oyunlar\u0131"),
      subtitle: t(
        "menu.reasoning.subtitle",
        "Haf\u0131za, sudoku ve mant\u0131k oyunlar\u0131 oyna."
      ),
      color: "indigo" as const,
    },
    {
      id: "fineMotor" as const,
      icon: EyeIcon,
      title: t("menu.fineMotor.title", lang === "tr" ? "\u0130nce Motor" : "Fine Motor"),
      subtitle: t(
        "menu.fineMotor.subtitle",
        lang === "tr" ? "\u00c7izgi Takip, Boyama ve daha fazlas\u0131" : "Line Tracing, Coloring, and more"
      ),
      badge: t('menu.fineMotor.badge', 'Geliştirme Aşamasında'),
      color: "rose" as const,
    },
    // Relative comparison activity
    {
      id: "relativeComparison" as const,
      icon: SparklesIcon,
      title: t('experimental.relativeComparison.title', 'Göreceli Karşılaştırma'),
      subtitle: t('experimental.relativeComparison.instruction', 'Açılan iki kartı karşılaştır ve soruyu cevapla.'),
      color: 'teal' as const,
    },
    {
      id: 'soundImitation' as const,
      icon: SpeakerIcon,
      title: t('menu.soundImitation.title', 'Ses Taklit Kartları'),
      subtitle: t('menu.soundImitation.subtitle', 'Konuşamayan çocuklar için ses taklit kartları'),
      color: 'sky' as const,
    },
    {
      id: 'miniGames' as const,
      icon: GameIcon,
      title: t('menu.miniGames.title', '🎮 Mini Oyunlar'),
      subtitle: t('menu.miniGames.subtitle', 'Eğlenceli mini oyunlar oyna ve rahatlayarak öğren!'),
      color: 'fuchsia' as const,
    },
  ];

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

  // === SADE2 THEME - Mini Game Style Modern Menu ===
  const isSimple2Theme = theme === "simple2" || theme === "sade2";
  if (isSimple2Theme) {
    const categories = [
      { id: 'programMode' as const, emoji: '🎓', label: 'Program Modu', color: 'from-violet-400 to-purple-500', onClick: () => onSelectCategory('programMode') },
      { id: 'random' as const, emoji: '🎲', label: 'Rastgele', color: 'from-amber-300 to-orange-400', onClick: onStartRandomMode },
      { id: 'letterSound' as const, emoji: '🔤', label: 'Harfler', color: 'from-sky-300 to-cyan-400', onClick: () => onSelectCategory('letterSound') },
      { id: 'objectCategories' as const, emoji: '📦', label: 'Nesneler', color: 'from-lime-300 to-green-400', onClick: () => onSelectCategory('objectCategories') },
      { id: 'conceptActivities' as const, emoji: '💡', label: 'Kavramlar', color: 'from-pink-300 to-rose-400', onClick: () => onSelectCategory('conceptActivities') },
      { id: 'reasoningActivities' as const, emoji: '🧩', label: 'Akıl Oyunları', color: 'from-teal-300 to-cyan-400', onClick: () => onSelectCategory('reasoningActivities') },
      { id: 'fiveWOneH' as const, emoji: '❓', label: '5N1K', color: 'from-fuchsia-300 to-purple-400', onClick: () => onSelectCategory('fiveWOneH') },
      { id: 'miniGames' as const, emoji: '🎮', label: 'Mini Oyunlar', color: 'from-emerald-300 to-teal-400', onClick: () => onSelectCategory('miniGames') },
      { id: 'fineMotor' as const, emoji: '✋', label: 'İnce Motor', color: 'from-red-300 to-rose-400', onClick: () => onSelectCategory('fineMotor') },
      { id: 'soundImitation' as const, emoji: '🔊', label: 'Ses Taklidi', color: 'from-indigo-300 to-blue-400', onClick: () => onSelectCategory('soundImitation') },
      { id: 'parentTips' as const, emoji: '👨‍👩‍👧', label: 'Ebeveyn', color: 'from-slate-300 to-gray-400', onClick: onSelectParentTips },
    ];

    return (
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-100">
        {/* Subtle floating circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-blue-200 to-purple-200 animate-pulse"
              style={{
                width: `${40 + Math.random() * 60}px`,
                height: `${40 + Math.random() * 60}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* Header */}
          <div className="bg-white/70 backdrop-blur-sm p-4 text-center border-b border-indigo-100 shadow-sm">
            <h1 className="text-2xl font-black text-indigo-800">
              📚 İlk Sözüm
            </h1>
            <p className="text-indigo-600/80 text-sm">Eğitim ve Gelişim</p>
          </div>

          {/* Scrollable Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={cat.onClick}
                  className={`relative bg-gradient-to-br ${cat.color} rounded-2xl p-3 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 flex flex-col items-center justify-center aspect-square border border-white/50`}
                >
                  {/* Emoji */}
                  <span className="text-3xl mb-1 drop-shadow-sm">{cat.emoji}</span>
                  {/* Label */}
                  <span className="text-white font-bold text-[10px] text-center leading-tight drop-shadow-md">
                    {cat.label}
                  </span>
                  {/* Shine effect */}
                  <div className="absolute top-2 left-2 w-3 h-3 bg-white/40 rounded-full blur-[2px]" />
                </button>
              ))}
            </div>

            {/* Development Notes */}
            <div className="mt-6 max-w-md mx-auto space-y-3">
              <PrintInfoNote theme={theme} />
              {/* Güncellemeler & Duyurular Kartı */}
              <SystemAnnouncementsCard theme={theme} />
              {loyaltySnapshot && <LoyaltyProgressCard theme={theme} snapshot={loyaltySnapshot} />}
              <AudioIssueNote theme={theme} />

              <OtherAppsSection theme={theme} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === KOYU THEME - Dark Neomorphism ===
  const isKoyuTheme = theme === "koyu" || theme === "dark";
  if (isKoyuTheme) {
    const categories = [
      { id: 'programMode' as const, emoji: '🎓', label: 'Program Modu', onClick: () => onSelectCategory('programMode') },
      { id: 'random' as const, emoji: '🎲', label: 'Rastgele', onClick: onStartRandomMode },
      { id: 'letterSound' as const, emoji: '🔤', label: 'Harfler', onClick: () => onSelectCategory('letterSound') },
      { id: 'objectCategories' as const, emoji: '📦', label: 'Nesneler', onClick: () => onSelectCategory('objectCategories') },
      { id: 'conceptActivities' as const, emoji: '💡', label: 'Kavramlar', onClick: () => onSelectCategory('conceptActivities') },
      { id: 'reasoningActivities' as const, emoji: '🧩', label: 'Akıl Oyunları', onClick: () => onSelectCategory('reasoningActivities') },
      { id: 'miniGames' as const, emoji: '🎮', label: 'Mini Oyunlar', onClick: () => onSelectCategory('miniGames') },
      { id: 'parentTips' as const, emoji: '👨‍👩‍👧', label: 'Ebeveyn', onClick: onSelectParentTips },
    ];

    return (
      <div className="relative w-full h-full bg-slate-800 overflow-y-auto">
        <div className="p-4 max-w-md mx-auto">
          <h1 className="text-2xl font-black text-slate-200 text-center mb-1">📚 İlk Sözüm</h1>
          <p className="text-slate-400 text-center text-sm mb-6">Eğitim ve Gelişim</p>

          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={cat.onClick}
                className="bg-slate-800 rounded-2xl p-4 shadow-[6px_6px_12px_#1e293b,-6px_-6px_12px_#475569] hover:shadow-[inset_4px_4px_8px_#1e293b,inset_-4px_-4px_8px_#475569] active:shadow-[inset_4px_4px_8px_#1e293b,inset_-4px_-4px_8px_#475569] transition-all flex flex-col items-center justify-center aspect-square"
              >
                <span className="text-4xl mb-2">{cat.emoji}</span>
                <span className="text-slate-300 font-bold text-xs text-center">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <PrintInfoNote theme={theme} />
            <SystemAnnouncementsCard theme={theme} />
              {loyaltySnapshot && <LoyaltyProgressCard theme={theme} snapshot={loyaltySnapshot} />}
              <AudioIssueNote theme={theme} />

            <OtherAppsSection theme={theme} />
          </div>
        </div>
      </div>
    );
  }

  // === YUMUSAK THEME - Soft Neomorphism with Pastel Colors ===
  const isYumusakTheme = theme === "yumusak" || theme === "soft" || theme === "neo";
  if (isYumusakTheme) {
    const categories = [
      { id: 'programMode' as const, emoji: '🎓', label: 'Program Modu', onClick: () => onSelectCategory('programMode') },
      { id: 'random' as const, emoji: '🎲', label: 'Rastgele', onClick: onStartRandomMode },
      { id: 'letterSound' as const, emoji: '🔤', label: 'Harfler', onClick: () => onSelectCategory('letterSound') },
      { id: 'objectCategories' as const, emoji: '📦', label: 'Nesneler', onClick: () => onSelectCategory('objectCategories') },
      { id: 'conceptActivities' as const, emoji: '💡', label: 'Kavramlar', onClick: () => onSelectCategory('conceptActivities') },
      { id: 'reasoningActivities' as const, emoji: '🧩', label: 'Akıl Oyunları', onClick: () => onSelectCategory('reasoningActivities') },
      { id: 'miniGames' as const, emoji: '🎮', label: 'Mini Oyunlar', onClick: () => onSelectCategory('miniGames') },
      { id: 'parentTips' as const, emoji: '👨‍👩‍👧', label: 'Ebeveyn', onClick: onSelectParentTips },
    ];

    return (
      <div className="relative w-full h-full bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 overflow-y-auto">
        <div className="p-4 max-w-md mx-auto">
          <h1 className="text-2xl font-black text-purple-700 text-center mb-1">📚 İlk Sözüm</h1>
          <p className="text-purple-500 text-center text-sm mb-6">Eğitim ve Gelişim</p>

          <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={cat.onClick}
                className="bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 rounded-2xl p-4 shadow-[6px_6px_16px_rgba(199,186,196,0.7),-6px_-6px_16px_rgba(255,255,255,0.9)] hover:shadow-[inset_4px_4px_10px_rgba(199,186,196,0.5),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] active:shadow-[inset_4px_4px_10px_rgba(199,186,196,0.5),inset_-4px_-4px_10px_rgba(255,255,255,0.8)] transition-all flex flex-col items-center justify-center aspect-square"
              >
                <span className="text-4xl mb-2">{cat.emoji}</span>
                <span className="text-purple-700 font-bold text-xs text-center">{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <PrintInfoNote theme={theme} />
            <SystemAnnouncementsCard theme={theme} />
              {loyaltySnapshot && <LoyaltyProgressCard theme={theme} snapshot={loyaltySnapshot} />}
              <AudioIssueNote theme={theme} />

            <OtherAppsSection theme={theme} />
          </div>
        </div>
      </div>
    );
  }


  // === DENEME2 THEME - Robot Kontrol Paneli (Tamamen Özgün) ===
  if (isDeneme2Theme) {
    // Modlar - Üstte büyük butonlar
    const modes = [
      { id: 'programMode' as const, icon: '🎓', label: 'Program Modu', desc: 'Uzman rehberliği', color: '#10b981', onClick: () => onSelectCategory('programMode') },
      { id: 'random' as const, icon: '🎲', label: 'Rastgele Mod', desc: 'Sürpriz etkinlik', color: '#f59e0b', onClick: onStartRandomMode },
    ];

    // Kategoriler - Mantıklı sırada
    const categories = [
      // Öğrenme
      { id: 'letterSound' as const, icon: '🔤', label: 'Harfler', color: '#3b82f6', onClick: () => onSelectCategory('letterSound') },
      { id: 'objectCategories' as const, icon: '📦', label: 'Nesneler', color: '#22c55e', onClick: () => onSelectCategory('objectCategories') },
      { id: 'conceptActivities' as const, icon: '💡', label: 'Kavramlar', color: '#ec4899', onClick: () => onSelectCategory('conceptActivities') },
      { id: 'relativeComparison' as const, icon: '⚖️', label: 'Göreceli', color: '#6366f1', onClick: () => onSelectCategory('relativeComparison') },
      // Düşünme
      { id: 'reasoningActivities' as const, icon: '🧩', label: 'Akıl', color: '#06b6d4', onClick: () => onSelectCategory('reasoningActivities') },
      { id: 'fiveWOneH' as const, icon: '❓', label: '5N1K', color: '#a855f7', onClick: () => onSelectCategory('fiveWOneH') },
      // Yaratıcı
      { id: 'soundImitation' as const, icon: '🔊', label: 'Ses', color: '#14b8a6', onClick: () => onSelectCategory('soundImitation') },
      { id: 'fineMotor' as const, icon: '✋', label: 'Motor', color: '#f43f5e', onClick: () => onSelectCategory('fineMotor') },
      // Eğlence & Ebeveyn
      { id: 'miniGames' as const, icon: '🎮', label: 'Oyunlar', color: '#8b5cf6', onClick: () => onSelectCategory('miniGames') },
      { id: 'parentTips' as const, icon: '👨‍👩‍👧', label: 'Ebeveyn', color: '#64748b', onClick: onSelectParentTips },
    ];

    return (
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950">
        {/* Tech grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Scanning line effect */}
        <div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent animate-scan-line pointer-events-none"
          style={{ animationDuration: '4s' }}
        />

        {/* Glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/3 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }} />

        <div className="relative z-10 w-full h-full flex flex-col">
          {/* Header - Status Bar */}
          <div className="flex items-center justify-between px-3 sm-landscape:px-4 py-1.5 bg-slate-800/80 border-b border-cyan-500/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-cyan-300 text-xs font-mono hidden sm-landscape:block">AKTİF</span>
            </div>
            <div className="text-cyan-400 font-mono text-sm font-bold">🤖 ROBOT MERKEZ</div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-status-pulse" />
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-status-pulse" style={{ animationDelay: '0.3s' }} />
              <div className="w-2 h-2 rounded-full bg-cyan-400/50 animate-status-pulse" style={{ animationDelay: '0.6s' }} />
            </div>
          </div>

          {/* Main Content - Portrait vs Landscape */}
          <div className="flex-1 overflow-y-auto p-2 sm-landscape:p-3 sm-landscape:overflow-hidden">
            {/* LANDSCAPE LAYOUT */}
            <div className="hidden sm-landscape:flex sm-landscape:h-full sm-landscape:gap-4">
              {/* Left: Robot */}
              <div className="flex flex-col items-center justify-center w-1/3 bg-slate-700/30 rounded-2xl p-3 border border-cyan-500/20 animate-robot-breathe">
                <GalacticRobotMascot mood="happy" size="lg" />
                <div className="mt-3 text-center">
                  <p className="text-cyan-100 text-sm font-medium">Merhaba! 🚀<span className="inline-block w-0.5 h-4 bg-cyan-400 ml-1 animate-cursor-blink"></span></p>
                  <p className="text-cyan-400/60 text-xs mt-1">Bir mod veya kategori seç</p>
                </div>
              </div>

              {/* Right: Controls */}
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
                {/* Modes */}
                <div className="grid grid-cols-2 gap-2">
                  {modes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={mode.onClick}
                      className="flex items-center gap-3 py-2 px-3 rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                      style={{
                        background: `linear-gradient(135deg, ${mode.color}25 0%, ${mode.color}40 100%)`,
                        border: `1px solid ${mode.color}50`,
                      }}
                    >
                      <span className="text-2xl">{mode.icon}</span>
                      <div>
                        <div className="text-sm font-bold text-white">{mode.label}</div>
                        <div className="text-[10px] text-white/50">{mode.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Categories - 5 columns in landscape */}
                <div className="grid grid-cols-5 gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={cat.onClick}
                      className="flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: `linear-gradient(135deg, ${cat.color}20 0%, ${cat.color}35 100%)`,
                        border: `1px solid ${cat.color}40`,
                      }}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="text-[8px] font-bold text-white/80">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* PORTRAIT LAYOUT */}
            <div className="sm-landscape:hidden">
              {/* Robot Mascot - Same style as landscape */}
              <div className="flex flex-col items-center justify-center mb-4 bg-slate-700/30 rounded-2xl p-4 border border-cyan-500/20 animate-robot-breathe">
                <GalacticRobotMascot mood="happy" size="lg" />
                <div className="mt-3 text-center">
                  <p className="text-cyan-100 text-sm font-medium">Merhaba! 🚀<span className="inline-block w-0.5 h-4 bg-cyan-400 ml-1 animate-cursor-blink"></span></p>
                  <p className="text-cyan-400/60 text-xs mt-1">Bir mod veya kategori seç</p>
                </div>
              </div>

              <div className="max-w-sm mx-auto space-y-3">
                {/* Mode Buttons */}
                <div>
                  <div className="text-center mb-1.5">
                    <span className="text-amber-400/80 text-[10px] font-mono uppercase tracking-wider">⚡ Modlar</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {modes.map((mode) => (
                      <button
                        key={mode.id}
                        onClick={mode.onClick}
                        className="flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all hover:scale-[1.03] active:scale-95"
                        style={{
                          background: `linear-gradient(135deg, ${mode.color}30 0%, ${mode.color}50 100%)`,
                          border: `2px solid ${mode.color}60`,
                        }}
                      >
                        <span className="text-2xl mb-0.5">{mode.icon}</span>
                        <span className="text-xs font-bold text-white">{mode.label}</span>
                        <span className="text-[9px] text-white/50">{mode.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category Buttons */}
                <div>
                  <div className="text-center mb-1.5">
                    <span className="text-cyan-400/70 text-[10px] font-mono uppercase tracking-wider">📚 Kategoriler</span>
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={cat.onClick}
                        className="flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg transition-all hover:scale-105 active:scale-95"
                        style={{
                          background: `linear-gradient(135deg, ${cat.color}20 0%, ${cat.color}35 100%)`,
                          border: `1px solid ${cat.color}40`,
                        }}
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span className="text-[8px] font-bold text-white/80 text-center leading-tight">{cat.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Development Notes - Only in portrait */}
              <div className="mt-3 max-w-sm mx-auto space-y-3">
                <PrintInfoNote theme={theme} />
                <SystemAnnouncementsCard theme={theme} />
              {loyaltySnapshot && <LoyaltyProgressCard theme={theme} snapshot={loyaltySnapshot} />}
              <AudioIssueNote theme={theme} />

                <DevelopmentNotesCard theme={theme} />
                <OtherAppsSection theme={theme} />
              </div>

              {lang !== 'tr' && (
                <div className="text-center text-xs text-cyan-400/50 mt-2">
                  {t('settings.languageNote', 'Letter activities are currently Turkish-only.')}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Tech Bar - Compact */}
          <div className="px-4 py-1.5 bg-slate-800/80 border-t border-cyan-500/20">
            <div className="flex justify-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[9px] text-slate-400 font-mono">BAĞLI</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-[9px] text-slate-400 font-mono">HAZIR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Special underwater layout for "deneme" theme
  if (isDenemeTheme) {
    return (
      <div className="relative flex flex-col items-center justify-start h-full w-full mx-auto p-4 sm-landscape:p-2 animate-fade-in overflow-hidden">
        {/* Deep ocean gradient background */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#001122] via-[#001a2e] to-[#000814]" />

        {/* Ocean bubbles animation */}
        <div className="absolute inset-0 -z-18 opacity-40">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/60 rounded-full animate-bubble"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: `-10px`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Ocean floor sand */}
        <div className="absolute bottom-0 left-0 right-0 h-32 -z-15 bg-gradient-to-t from-amber-900/30 via-amber-800/20 to-transparent" />

        {/* Light rays from surface */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-cyan-300/60 via-cyan-400/30 to-transparent -z-16" />
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-blue-300/60 via-blue-400/30 to-transparent -z-16" />

        <div className="relative w-full flex-grow overflow-y-auto pr-1 pb-24 z-10">
          <div className="px-2 sm:px-4">
            <div className="text-center pt-6 mb-8">
              <h1 className="text-3xl sm:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-200 to-teal-300 drop-shadow-[0_10px_30px_rgba(56,189,248,0.45)] font-[Poppins] tracking-wide">
                🌊 Okyanus Keşfi
              </h1>
              <p className="mt-2 text-cyan-200/90 font-semibold text-sm drop-shadow-[0_2px_8px_rgba(15,23,42,0.55)]">
                {t('menu.chooseActivity', 'Bir derinlik seç.')}
              </p>
            </div>

            {/* Grid of Jellyfish orbs (two columns, no text) */}
            <div className="grid grid-cols-2 gap-8 sm:gap-10 justify-items-center items-start">
              {/* Random Mode */}
              <div className="flex flex-col items-center">
                <div className="relative cursor-pointer" onClick={onStartRandomMode}>
                  {/* Jellyfish body - bell shape */}
                  <div className="relative w-32 h-24 sm:w-36 sm:h-28">
                    <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-br from-cyan-400/80 via-blue-500/80 to-teal-600/80 rounded-t-full blur-sm animate-pulse" />
                    <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-br from-rose-300/60 via-pink-400/60 to-purple-500/60 rounded-t-full border-t border-rose-200/30" />
                  </div>
                  <div className="absolute inset-x-0 top-4 flex items-center justify-center">
                    <StarIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" />
                  </div>
                  {/* Jellyfish tentacles - more detailed */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 h-12">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 bg-gradient-to-b from-purple-400/60 via-purple-300/40 to-transparent animate-tentacle"
                        style={{
                          left: `${i * 12.5 + 6}%`,
                          height: `${25 + Math.random() * 15}px`,
                          animationDelay: `${i * 0.15}s`,
                          transformOrigin: 'top',
                        }}
                      />
                    ))}
                  </div>
                  {/* Invisible overlay for better click area */}
                  <div className="absolute inset-0 -m-4 rounded-2xl hover:bg-cyan-400/10 transition-colors duration-200" />
                </div>
                <div className="mt-2 px-3 py-1 bg-cyan-500/20 rounded-full text-xs text-cyan-200">
                  Rastgele
                </div>
              </div>

              {/* Program Mode (explicit) */}
              <div className="flex flex-col items-center">
                <div className="relative cursor-pointer" onClick={() => onSelectCategory('programMode')}>
                  <div className="relative w-32 h-24 sm:w-36 sm:h-28">
                    <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-br from-amber-400/80 via-amber-500/80 to-rose-500/80 rounded-t-full blur-sm animate-pulse" />
                    <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-br from-amber-300/60 via-amber-400/60 to-rose-400/60 rounded-t-full border-t border-amber-200/30" />
                  </div>
                  <div className="absolute inset-x-0 top-4 flex items-center justify-center">
                    <AcademicCapIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 h-12">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 bg-gradient-to-b from-amber-400/60 via-amber-300/40 to-transparent animate-tentacle"
                        style={{
                          left: `${i * 12.5 + 6}%`,
                          height: `${25 + Math.random() * 15}px`,
                          animationDelay: `${i * 0.15}s`,
                          transformOrigin: 'top',
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute inset-0 -m-4 rounded-2xl hover:bg-cyan-400/10 transition-colors duration-200" />
                </div>
                <div className="mt-2 px-3 py-1 bg-amber-500/20 rounded-full text-xs text-amber-200">
                  {t('programMode.menuTitle', 'Program Modu')}
                </div>
              </div>

              {menuItems.filter(i => i.id !== 'programMode').map((item, idx) => (
                <div key={item.id} className="flex flex-col items-center">
                  <div className="relative cursor-pointer" onClick={() => onSelectCategory(item.id)}>
                    {/* Jellyfish body - bell shape */}
                    <div className="relative w-32 h-24 sm:w-36 sm:h-28">
                      <div className={`absolute inset-x-0 top-0 h-16 sm:h-20 rounded-t-full blur-sm animate-pulse ${idx === 0 ? 'bg-gradient-to-br from-cyan-400/80 via-blue-500/80 to-teal-600/80' :
                        idx === 1 ? 'bg-gradient-to-br from-blue-400/80 via-indigo-500/80 to-cyan-600/80' :
                          idx === 2 ? 'bg-gradient-to-br from-teal-400/80 via-green-500/80 to-emerald-600/80' :
                            idx === 3 ? 'bg-gradient-to-br from-emerald-400/80 via-teal-500/80 to-cyan-600/80' :
                              idx === 4 ? 'bg-gradient-to-br from-indigo-400/80 via-purple-500/80 to-blue-600/80' :
                                idx === 5 ? 'bg-gradient-to-br from-purple-400/80 via-violet-500/80 to-indigo-600/80' :
                                  idx === 6 ? 'bg-gradient-to-br from-indigo-400/80 via-blue-500/80 to-cyan-600/80' :
                                    'bg-gradient-to-br from-cyan-400/80 via-blue-500/80 to-teal-600/80'
                        }`} style={{ animationDelay: `${idx * 0.5}s` }} />
                      <div className={`absolute inset-x-0 top-0 h-16 sm:h-20 rounded-t-full border-t border-white/20 ${idx === 0 ? 'bg-gradient-to-br from-cyan-300/60 via-blue-400/60 to-teal-500/60' :
                        idx === 1 ? 'bg-gradient-to-br from-blue-300/60 via-indigo-400/60 to-cyan-500/60' :
                          idx === 2 ? 'bg-gradient-to-br from-teal-300/60 via-green-400/60 to-emerald-500/60' :
                            idx === 3 ? 'bg-gradient-to-br from-emerald-300/60 via-teal-400/60 to-cyan-500/60' :
                              idx === 4 ? 'bg-gradient-to-br from-indigo-300/60 via-purple-400/60 to-blue-500/60' :
                                idx === 5 ? 'bg-gradient-to-br from-purple-300/60 via-violet-400/60 to-indigo-500/60' :
                                  idx === 6 ? 'bg-gradient-to-br from-violet-300/60 via-fuchsia-400/60 to-purple-500/60' :
                                    'bg-gradient-to-br from-fuchsia-300/60 via-rose-400/60 to-pink-500/60'
                        }`} />
                    </div>
                    <div className="absolute inset-x-0 top-4 flex items-center justify-center">
                      <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" />
                    </div>
                    {/* Jellyfish tentacles - more detailed */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 h-12">
                      {Array.from({ length: 8 }, (_, i) => (
                        <div
                          key={i}
                          className={`absolute w-0.5 bg-gradient-to-b ${idx === 0 ? 'from-cyan-400/60 via-cyan-300/40' :
                            idx === 1 ? 'from-blue-400/60 via-blue-300/40' :
                              idx === 2 ? 'from-teal-400/60 via-teal-300/40' :
                                idx === 3 ? 'from-emerald-400/60 via-emerald-300/40' :
                                  idx === 4 ? 'from-indigo-400/60 via-indigo-300/40' :
                                    idx === 5 ? 'from-purple-400/60 via-purple-300/40' :
                                      idx === 6 ? 'from-violet-400/60 via-violet-300/40' :
                                        'from-fuchsia-400/60 via-fuchsia-300/40'
                            } to-transparent animate-tentacle`}
                          style={{
                            left: `${i * 12.5 + 6}%`,
                            height: `${25 + Math.random() * 15}px`,
                            animationDelay: `${i * 0.15 + idx * 0.3}s`,
                            transformOrigin: 'top',
                          }}
                        />
                      ))}
                    </div>
                    {/* Invisible overlay for better click area */}
                    <div className="absolute inset-0 -m-4 rounded-2xl hover:bg-cyan-400/10 transition-colors duration-200" />
                    {item.id === 'fineMotor' && item.badge && (
                      <span className="absolute -top-2 -right-2 inline-flex items-center px-2 py-0.5 text-xs bg-amber-500 text-white rounded-full shadow">{item.badge}</span>
                    )}
                  </div>
                  <div className="mt-2 px-3 py-1 bg-cyan-500/20 rounded-full text-xs text-cyan-200">
                    {item.title.split(' ')[0]}
                  </div>
                </div>
              ))}

              {/* Parent Tips */}
              <div className="flex flex-col items-center">
                <div className="relative cursor-pointer" onClick={onSelectParentTips}>
                  {/* Jellyfish body - bell shape */}
                  <div className="relative w-32 h-24 sm:w-36 sm:h-28">
                    <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-br from-emerald-400/80 via-green-500/80 to-teal-600/80 rounded-t-full blur-sm animate-pulse" />
                    <div className="absolute inset-x-0 top-0 h-16 sm:h-20 bg-gradient-to-br from-emerald-300/60 via-green-400/60 to-teal-500/60 rounded-t-full border-t border-emerald-200/30" />
                  </div>
                  <div className="absolute inset-x-0 top-4 flex items-center justify-center">
                    <PersonIcon className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]" />
                  </div>
                  {/* Jellyfish tentacles - more detailed */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-20 h-12">
                    {Array.from({ length: 8 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 bg-gradient-to-b from-green-400/60 via-green-300/40 to-transparent animate-tentacle"
                        style={{
                          left: `${i * 12.5 + 6}%`,
                          height: `${25 + Math.random() * 15}px`,
                          animationDelay: `${i * 0.15}s`,
                          transformOrigin: 'top',
                        }}
                      />
                    ))}
                  </div>
                  {/* Invisible overlay for better click area */}
                  <div className="absolute inset-0 -m-4 rounded-2xl hover:bg-cyan-400/10 transition-colors duration-200" />
                </div>
                <div className="mt-2 px-3 py-1 bg-cyan-500/20 rounded-full text-xs text-cyan-200">
                  İpuçları
                </div>
              </div>
            </div>

            {/* Development Notes Card */}
            <div className="mt-8">
              <SystemAnnouncementsCard theme={theme} />
              {loyaltySnapshot && <LoyaltyProgressCard theme={theme} snapshot={loyaltySnapshot} />}
              <AudioIssueNote theme={theme} />

              <OtherAppsSection theme={theme} />
            </div>

            {lang !== 'tr' && (
              <div className="text-center text-xs text-cyan-300/60 mt-3">
                {t('settings.languageNote', 'Letter activities are currently Turkish-only.')}
              </div>
            )}
          </div>
        </div>

        {/* Ocean Jellyfish Mascot - Interactive container */}
        <MascotContainer>
          <OceanJellyfishMascot
            mood="happy"
            size="md"
            message="Hoş geldin! 🌊"
            showMessage={true}
          />
        </MascotContainer>
      </div>
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
        <div
          className={`relative grid ${theme === 'simple2' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 landscape:grid-cols-3 sm-landscape:grid-cols-3'} gap-4 sm-landscape:gap-3 ${gridPadding
            }`}
        >
          <MenuButton
            icon={StarIcon}
            title={t("menu.random.title", "Rastgele Mod")}
            subtitle={t(
              "menu.random.subtitle",
              "Se\u00e7ili etkinliklerden kar\u0131\u015f\u0131k oyna"
            )}
            onClick={onStartRandomMode}
            color="rose"
            theme={theme}
          />
          {/* Explicit Program Mode button placed directly under Random Mode */}
          <MenuButton
            icon={AcademicCapIcon}
            title={t('programMode.menuTitle', 'Program Modu (Deneme)')}
            subtitle={t('programMode.menuSubtitle', 'Uzman planıyla günlük oturum başlat')}
            onClick={() => onSelectCategory('programMode')}
            color="emerald"
            theme={theme}
          >
            <span
              className="absolute bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-white/85 border border-emerald-200 px-2 py-0.5 text-xs font-semibold text-emerald-700 shadow-sm"
              aria-label={t('programMode.units', 'Üniteler')}
            >
              📚 {t('programMode.unitsCount', '{count} Ünite').replace('{count}', '10')}
            </span>
          </MenuButton>

          {menuItems.filter(i => i.id !== 'programMode').map((item) => (
            <div key={item.id} className="relative">
              <MenuButton
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
                onClick={() => onSelectCategory(item.id)}
                color={item.color}
                theme={theme}
              />
              {item.id === 'fineMotor' && item.badge && (
                <span className="absolute top-2 right-2 inline-flex items-center px-2 py-0.5 text-xs bg-amber-500 text-white rounded-full shadow">{item.badge}</span>
              )}
            </div>
          ))}
          {lang !== "tr" && (
            <div className="col-span-1 sm:col-span-2 landscape:col-span-3 text-center text-xs text-slate-500 mt-1">
              {t(
                "settings.languageNote",
                "Letter activities are currently Turkish-only."
              )}
            </div>
          )}
          <div className={`${theme === 'simple2' ? 'col-span-2' : ''}`}>
            <MenuButton
              icon={PersonIcon}
              title={t("menu.parentTips.title", "Ebeveynler \u0130\u00e7in \u0130pu\u00e7lar\u0131")}
              subtitle={t(
                "menu.parentTips.subtitle",
                "Uygulamay\u0131 daha verimli kullan\u0131n"
              )}
              onClick={onSelectParentTips}
              color="purple"
              theme={theme}
            />
          </div>
          {onSelectWorksheets && (
            <div className={`${theme === 'simple2' ? 'col-span-2' : ''} relative`}>
              <MenuButton
                icon={PrintIcon}
                title="Çıktı & Çalışma Kağıtları"
                subtitle="Özel kağıt etkinlikleri oluştur"
                onClick={onSelectWorksheets}
                color="indigo"
                theme={theme}
              />
              <span className="absolute bottom-1.5 right-2 inline-flex items-center px-2 py-0.5 text-[10px] bg-amber-500 text-white rounded-full shadow pointer-events-none opacity-90">Geliştirme Aşamasında</span>
            </div>
          )}

          {/* Development Notes Card - full width */}
          <div className={`${theme === 'simple2' ? 'col-span-2' : 'col-span-1 sm:col-span-2 landscape:col-span-3'}`}>
            <SystemAnnouncementsCard theme={theme} />
              {loyaltySnapshot && <LoyaltyProgressCard theme={theme} snapshot={loyaltySnapshot} />}
              <AudioIssueNote theme={theme} />

            <OtherAppsSection theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainMenuScreen);
