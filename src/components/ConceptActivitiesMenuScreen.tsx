import React from "react";
import ArrowLeftIcon from "./icons/ArrowLeftIcon.tsx";
import { ActivityType, ActivityStats } from "../types.ts";
import ShapesIcon from "./icons/ShapesIcon.tsx";
import QuantityIcon from "./icons/QuantityIcon.tsx";
import LocationIcon from "./icons/LocationIcon.tsx";
import TimeIcon from "./icons/TimeIcon.tsx";
import ProgressIndicator from "./ui/ProgressIndicator.tsx";
import MenuButton from "./ui/MenuButton.tsx";
import WideNarrowIcon from "./icons/WideNarrowIcon.tsx";
import TextureIcon from "./icons/TextureIcon.tsx";
import ArrowsRightLeftIcon from "./icons/ArrowsRightLeftIcon.tsx";
import OppositesIcon from "./icons/OppositesIcon.tsx";
import SensesIcon from "./icons/SensesIcon.tsx";
import { getCurrentLanguage, t } from "../i18n/index.ts";
import CosmicBackdrop from './ui/CosmicBackdrop.tsx';
import PanelStars from './ui/PanelStars.tsx';

interface ConceptActivity {
  type: ActivityType;
  title: string;
  subtitle: string;
}

interface ConceptTab {
  name: string;
  icon: React.FC<{ className?: string }>;
  activities: ConceptActivity[];
}

interface ConceptActivitiesMenuScreenProps {
  onSelectActivity: (activity: ActivityType) => void;
  onBack: () => void;
  activeCategory: string;
  onSelectCategory: (categoryName: string) => void;
  activityStats: Record<string, ActivityStats>;
  theme: string;
  enabledActivities: Set<string>;
}

const buildTabs = (lang: ReturnType<typeof getCurrentLanguage>): ConceptTab[] => {
  const isTr = lang === "tr";
  return [
    {
      name: isTr ? "Temel" : t("concepts.basic", "Basic"),
      icon: ShapesIcon,
      activities: [
        {
          type: ActivityType.YesNo,
          title: isTr ? "Evet / Hayır" : t("concepts.activities.yesNo", "Yes / No"),
          subtitle: isTr ? "Görseli onayla veya reddet" : t("concepts.subtitles.approveReject", "Approve or reject the image"),
        },
        {
          type: ActivityType.Colors,
          title: isTr ? "Renkler" : t("concepts.activities.colors", "Colors"),
          subtitle: isTr ? "İstenen rengi bul" : t("concepts.subtitles.findColor", "Find the requested color"),
        },
        {
          type: ActivityType.ColorRecognition,
          title: isTr ? "Rengi Ne?" : "What Color Is It?",
          subtitle: isTr ? "Nesnenin rengini bul" : "Find the color of the object",
        },
        {
          type: ActivityType.Shapes,
          title: isTr ? "Şekiller" : t("concepts.activities.shapes", "Shapes"),
          subtitle: isTr ? "Doğru şekli seç" : t("concepts.subtitles.rightShape", "Pick the right shape"),
        },
        {
          type: ActivityType.Emotions,
          title: isTr ? "Duygular" : t("concepts.activities.emotions", "Emotions"),
          subtitle: isTr ? "Yüz ifadelerini tanı" : t("concepts.subtitles.recognizeFaces", "Recognize facial expressions"),
        },
        {
          type: ActivityType.SeffafOpak,
          title: isTr ? "Şeffaf / Opak" : t("concepts.activities.seffafOpak", "Transparent / Opaque"),
          subtitle: isTr ? "Görünürlüğü öğren" : t("concepts.subtitles.understandTransparency", "Understand transparency"),
        },
        {
          type: ActivityType.StraightCurved,
          title: isTr ? "Düz / Eğri" : t("concepts.activities.straightCurved", "Straight / Curved"),
          subtitle: isTr ? "Çizgileri tanı" : t("concepts.subtitles.recognizeLines", "Recognize lines"),
        },
        {
          type: ActivityType.NoisyQuiet,
          title: isTr ? "Gürültülü / Sessiz" : t("concepts.activities.noisyQuiet", "Noisy / Quiet"),
          subtitle: isTr ? "Sesleri ayırt et" : t("concepts.subtitles.distinguishSounds", "Distinguish sounds"),
        },
        {
          type: ActivityType.ParlakMat,
          title: isTr ? "Parlak / Mat" : t("concepts.activities.parlakMat", "Shiny / Matte"),
          subtitle: isTr ? "Yansımaları öğren" : t("concepts.subtitles.learnReflections", "Learn reflections"),
        },
      ],
    },
    {
      name: isTr ? "Boyutsal" : t("concepts.dimensional", "Dimensional"),
      icon: WideNarrowIcon,
      activities: [
        {
          type: ActivityType.BigSmall,
          title: isTr ? "Büyük / Küçük" : t("concepts.activities.bigSmall", "Big / Small"),
          subtitle: isTr ? "Boyutları karşılaştır" : t("concepts.subtitles.compareSizes", "Compare sizes"),
        },
        {
          type: ActivityType.LongShort,
          title: isTr ? "Uzun / Kısa" : t("concepts.activities.longShort", "Long / Short"),
          subtitle: isTr ? "Uzunlukları ayırt et" : t("concepts.subtitles.tellLengths", "Tell lengths apart"),
        },
        {
          type: ActivityType.ThinThick,
          title: isTr ? "İnce / Kalın" : t("concepts.activities.thinThick", "Thin / Thick"),
          subtitle: isTr ? "Kalınlıkları öğren" : t("concepts.subtitles.learnThickness", "Learn thickness"),
        },
        {
          type: ActivityType.WideNarrow,
          title: isTr ? "Geniş / Dar" : t("concepts.activities.wideNarrow", "Wide / Narrow"),
          subtitle: isTr ? "Genişlikleri anla" : t("concepts.subtitles.understandWidth", "Understand width"),
        },
        {
          type: ActivityType.DerinSig,
          title: isTr ? "Derin / Sığ" : t("concepts.activities.derinSig", "Deep / Shallow"),
          subtitle: isTr ? "Derinlikleri ölç" : t("concepts.subtitles.measureDepths", "Measure depths"),
        },
      ],
    },
    {
      name: isTr ? "Duyusal" : t("concepts.sensory", "Sensory"),
      icon: TextureIcon,
      activities: [
        {
          type: ActivityType.HardSoft,
          title: isTr ? "Sert / Yumuşak" : t("concepts.activities.hardSoft", "Hard / Soft"),
          subtitle: isTr ? "Dokuları hisset" : t("concepts.subtitles.feelTextures", "Feel textures"),
        },
        {
          type: ActivityType.RoughSmooth,
          title: isTr ? "Pürüzlü / Pürüzsüz" : t("concepts.activities.roughSmooth", "Rough / Smooth"),
          subtitle: isTr ? "Yüzeyleri tanı" : t("concepts.subtitles.knowSurfaces", "Know surfaces"),
        },
        {
          type: ActivityType.DikenliPuruzsuz,
          title: isTr ? "Dikenli / Pürüzsüz" : t("concepts.activities.dikenliPuruzsuz", "Spiky / Smooth"),
          subtitle: isTr ? "Sivri yüzeyleri keşfet" : t("concepts.subtitles.discoverSpiky", "Discover spiky surfaces"),
        },
        {
          type: ActivityType.SivriKut,
          title: isTr ? "Sivri / Küt" : t("concepts.activities.sivriKut", "Sharp / Blunt"),
          subtitle: isTr ? "Uç şekillerini fark et" : t("concepts.subtitles.noticePoints", "Notice point shapes"),
        },
        {
          type: ActivityType.WetDry,
          title: isTr ? "Islak / Kuru" : t("concepts.activities.wetDry", "Wet / Dry"),
          subtitle: isTr ? "Hisleri tanı" : t("concepts.subtitles.recognizeMoisture", "Recognize moisture"),
        },
        {
          type: ActivityType.HotCold,
          title: isTr ? "Sıcak / Soğuk" : t("concepts.activities.hotCold", "Hot / Cold"),
          subtitle: isTr ? "Sıcaklıkları hisset" : t("concepts.subtitles.feelTemperatures", "Feel temperatures"),
        },
        {
          type: ActivityType.BitterSweet,
          title: isTr ? "Acı / Tatlı" : t("concepts.activities.bitterSweet", "Bitter / Sweet"),
          subtitle: isTr ? "Tatları keşfet" : t("concepts.subtitles.discoverTastes", "Discover tastes"),
        },
        {
          type: ActivityType.KirisikDuzgun,
          title: isTr ? "Kırışık / Düzgün" : t("concepts.activities.kirisikDuzgun", "Wrinkled / Smooth"),
          subtitle: isTr ? "Yüzey durumlarını tanı" : t("concepts.subtitles.surfaceConditions", "Know surface conditions"),
        },
      ],
    },
    {
      name: isTr ? "Konum" : t("concepts.position", "Spatial"),
      icon: LocationIcon,
      activities: [
        {
          type: ActivityType.OnUnder,
          title: isTr ? "Altında / Üstünde" : t("concepts.activities.onUnder", "Up / Down"),
          subtitle: isTr ? "Konumları öğren" : t("concepts.subtitles.learnPositions", "Learn positions"),
        },
        {
          type: ActivityType.BelowAbove,
          title: isTr ? "Aşağıda / Yukarıda" : t("concepts.activities.belowAbove", "Below / Above"),
          subtitle: isTr ? "Konumla eşleştir" : t("concepts.subtitles.matchPlacement", "Match the placement"),
        },
        {
          type: ActivityType.InFrontOfBehind,
          title: isTr ? "Ön / Arka" : t("concepts.activities.inFrontOfBehind", "Front / Back"),
          subtitle: isTr ? "Yönleri keşfet" : t("concepts.subtitles.discoverDirections", "Discover directions"),
        },
        {
          type: ActivityType.InsideOutside,
          title: isTr ? "İç / Dış" : t("concepts.activities.insideOutside", "Inside / Outside"),
          subtitle: isTr ? "Konum karşılaştır" : t("concepts.subtitles.comparePlacement", "Compare placement"),
        },
        {
          type: ActivityType.BesideOpposite,
          title: isTr ? "Yan yana / Karşı karşıya" : t("concepts.activities.besideOpposite", "Beside / Opposite"),
          subtitle: isTr ? "Dizilişi fark et" : t("concepts.subtitles.noticeArrangement", "Notice arrangement"),
        },
        {
          type: ActivityType.Between,
          title: isTr ? "Arasında" : t("concepts.activities.between", "Between"),
          subtitle: isTr ? "Ortadakini bul" : t("concepts.subtitles.findMiddle", "Find the middle"),
        },
        {
          type: ActivityType.LeftRight,
          title: isTr ? "Sol / Sağ" : t("concepts.activities.leftRight", "Left / Right"),
          subtitle: isTr ? "Yönleri pekiştir" : t("concepts.subtitles.strengthenDirections", "Strengthen directions"),
        },
        {
          type: ActivityType.NearFar,
          title: isTr ? "Yakın / Uzak" : t("concepts.activities.nearFar", "Near / Far"),
          subtitle: isTr ? "Mesafeyi ölç" : t("concepts.subtitles.measureDistance", "Measure distance"),
        },
        {
          type: ActivityType.HighLow,
          title: isTr ? "Yüksek / Alçak" : t("concepts.activities.highLow", "High / Low"),
          subtitle: isTr ? "Seviyeleri fark et" : t("concepts.subtitles.noticeLevels", "Notice levels"),
        },
        {
          type: ActivityType.TersDuz,
          title: isTr ? "Ters / Düz" : t("concepts.activities.tersDuz", "Upside Down / Upright"),
          subtitle: isTr ? "Yön değişimini fark et" : t("concepts.subtitles.noticeOrientation", "Notice orientation"),
        },
      ],
    },
    {
      name: isTr ? "Zaman" : t("concepts.time", "Temporal"),
      icon: TimeIcon,
      activities: [
        {
          type: ActivityType.BeforeAfter,
          title: isTr ? "Önce / Sonra" : t("concepts.activities.beforeAfter", "Before / After"),
          subtitle: isTr ? "Sıralamayı öğren" : t("concepts.subtitles.learnOrder", "Learn order"),
        },
        {
          type: ActivityType.DayNight,
          title: isTr ? "Gündüz / Gece" : t("concepts.activities.dayNight", "Day / Night"),
          subtitle: isTr ? "Zamanı ayırt et" : t("concepts.subtitles.distinguishTime", "Distinguish time"),
        },
        {
          type: ActivityType.FastSlow,
          title: isTr ? "Hızlı / Yavaş" : t("concepts.activities.fastSlow", "Fast / Slow"),
          subtitle: isTr ? "Hızları karşılaştır" : t("concepts.subtitles.compareSpeeds", "Compare speeds"),
        },
        {
          type: ActivityType.ClockLearning,
          title: isTr ? "Saat Öğreniyorum" : "Clock Learning",
          subtitle: isTr ? "Saatleri eşleştir" : "Match the clocks",
        },
      ],
    },
    {
      name: isTr ? "Miktar" : t("concepts.quantity", "Quantity"),
      icon: QuantityIcon,
      activities: [
        {
          type: ActivityType.FewMuch,
          title: isTr ? "Az / Çok" : t("concepts.activities.fewMuch", "Few / Many"),
          subtitle: isTr ? "Miktarları kıyasla" : t("concepts.subtitles.compareAmounts", "Compare amounts"),
        },
        {
          type: ActivityType.KalabalikTenha,
          title: isTr ? "Kalabalık / Tenha" : t("concepts.activities.kalabalikTenha", "Crowded / Sparse"),
          subtitle: isTr ? "Yoğunlukları anla" : t("concepts.subtitles.understandCrowding", "Understand crowding"),
        },
        {
          type: ActivityType.HalfQuarterWhole,
          title: isTr ? "Yarım / Çeyrek / Bütün" : t("concepts.activities.halfQuarterWhole", "Half / Quarter / Whole"),
          subtitle: isTr ? "Parçaları tanı" : t("concepts.subtitles.recognizeFractions", "Recognize fractions"),
        },
        {
          type: ActivityType.OddEven,
          title: isTr ? "Tek / Çift" : t("concepts.activities.oddEven", "Odd / Even"),
          subtitle: isTr ? "Sayı türünü bul" : t("concepts.subtitles.findNumberType", "Find the number type"),
        },
        {
          type: ActivityType.FullEmpty,
          title: isTr ? "Dolu / Boş" : t("concepts.activities.fullEmpty", "Full / Empty"),
          subtitle: isTr ? "Kapları karşılaştır" : t("concepts.subtitles.compareContainers", "Compare containers"),
        },
        {
          type: ActivityType.HeavyLight,
          title: isTr ? "Ağır / Hafif" : t("concepts.activities.heavyLight", "Heavy / Light"),
          subtitle: isTr ? "Ağırlıkları karşılaştır" : t("concepts.subtitles.compareWeights", "Compare weights"),
        },
        {
          type: ActivityType.CountMatch,
          title: isTr ? "Kaç Tane Var?" : t("concepts.activities.countMatch", "How Many?"),
          subtitle: isTr ? "Sayıları eşleştir" : t("concepts.subtitles.matchCounts", "Match the counts"),
        },
      ],
    },
    {
      name: isTr ? "Durum" : t("concepts.state", "State"),
      icon: OppositesIcon,
      activities: [
        {
          type: ActivityType.OpenClosed,
          title: isTr ? "Açık / Kapalı" : t("concepts.activities.openClosed", "Open / Closed"),
          subtitle: isTr ? "Açık ve kapalı durumları ayırt et" : t("concepts.subtitles.distinguishOpenClosed", "Distinguish open and closed states"),
        },
        {
          type: ActivityType.BrokenIntact,
          title: isTr ? "Kırık / Sağlam" : t("concepts.activities.brokenIntact", "Broken / Intact"),
          subtitle: isTr ? "Durumları ayırt et" : t("concepts.subtitles.distinguishCondition", "Distinguish condition"),
        },
        {
          type: ActivityType.TembelCaliskan,
          title: isTr ? "Tembel / Çalışkan" : t("concepts.activities.tembelCaliskan", "Lazy / Hardworking"),
          subtitle: isTr ? "Hareketi karşılaştır" : t("concepts.subtitles.compareActivity", "Compare activity levels"),
        },
        {
          type: ActivityType.TazeBayat,
          title: isTr ? "Taze / Bayat" : t("concepts.activities.tazeBayat", "Fresh / Stale"),
          subtitle: isTr ? "Durumları fark et" : t("concepts.subtitles.noticeFreshness", "Notice freshness"),
        },
        {
          type: ActivityType.DugumCozuk,
          title: isTr ? "Düğümlü / Çözük" : t("concepts.activities.dugumCozuk", "Knotted / Untied"),
          subtitle: isTr ? "Bağlantıları çöz" : t("concepts.subtitles.untangleConnections", "Untangle connections"),
        },
      ],
    },
    {
      name: isTr ? "Duyularımız" : t("concepts.senses", "Our Senses"),
      icon: SensesIcon,
      activities: [
        {
          type: ActivityType.Senses,
          title: isTr ? "Duyularımız" : t("concepts.activities.senses", "Our Senses"),
          subtitle: isTr ? "Duyularımızı keşfet" : t("concepts.subtitles.exploreSenses", "Explore our senses"),
        },
      ],
    },
    {
      name: isTr ? "Karşılaştırma" : t("concepts.relative", "Comparisons"),
      icon: ArrowsRightLeftIcon,
      activities: [
        {
          type: ActivityType.AliveLifeless,
          title: isTr ? "Canlı / Cansız" : t("concepts.activities.aliveLifeless", "Alive / Lifeless"),
          subtitle: isTr ? "Varlıkları tanı" : t("concepts.subtitles.recogniseLife", "Recognise living things"),
        },
        {
          type: ActivityType.OldNew,
          title: isTr ? "Eski / Yeni" : t("concepts.activities.oldNew", "Old / New"),
          subtitle: isTr ? "Durumu değerlendir" : t("concepts.subtitles.evaluateState", "Evaluate state"),
        },
        {
          type: ActivityType.HungryFull,
          title: isTr ? "Aç / Tok" : t("concepts.activities.hungryFull", "Hungry / Full"),
          subtitle: isTr ? "Duyguları yorumla" : t("concepts.subtitles.interpretFeelings", "Interpret feelings"),
        },
        {
          type: ActivityType.YoungOld,
          title: isTr ? "Genç / Yaşlı" : t("concepts.activities.youngOld", "Young / Old"),
          subtitle: isTr ? "Yaş farkını keşfet" : t("concepts.subtitles.discoverAge", "Discover age difference"),
        },
        {
          type: ActivityType.CleanDirty,
          title: isTr ? "Temiz / Kirli" : t("concepts.activities.cleanDirty", "Clean / Dirty"),
          subtitle: isTr ? "Durumu değerlendir" : t("concepts.subtitles.evaluateCleanliness", "Evaluate cleanliness"),
        },
        {
          type: ActivityType.MessyClean,
          title: isTr ? "Dağınık / Toplu" : t("concepts.activities.messyClean", "Messy / Tidy"),
          subtitle: isTr ? "Düzeni kıyasla" : t("concepts.subtitles.compareOrder", "Compare order"),
        },
        {
          type: ActivityType.WhoseIsThis,
          title: isTr ? "Bu Kimin?" : "Whose Is This?",
          subtitle: isTr ? "Eşyayı sahibiyle eşleştir" : "Match the object to its owner",
        },
      ],
    },
  ];
};

const TabButton: React.FC<{
  name: string;
  icon: React.FC<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
  isThemed: boolean;
  displayMode?: "simple" | "default";
  isCosmic?: boolean;
  isUnderwater?: boolean;
}> = ({ name, icon: Icon, isActive, onClick, isThemed, displayMode = "default", isCosmic, isUnderwater }) => {
  if (displayMode === "simple") {
    return (
            <button
              type="button"
              onClick={onClick}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200 ${isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white/95 border border-slate-200 text-slate-700 hover:shadow-md hover:-translate-y-0.5"
                }`}>
              <Icon className="h-5 w-5" />
              {name}
            </button>
    );
  }

  if (isCosmic) {
    return (
      <button
        onClick={onClick}
        className={`flex-shrink-0 w-28 sm-landscape:w-24 flex items-center justify-center flex-col gap-1 px-2 py-2 rounded-full transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-sky-400 to-indigo-400 text-slate-900 shadow-[0_0_20px_rgba(56,189,248,0.6)] scale-105' 
            : 'bg-slate-800/50 text-sky-200/80 border border-sky-400/20 hover:bg-slate-700/60 hover:border-sky-400/40 hover:scale-105'
        }`}
      >
        <Icon className="h-5 w-5 sm-landscape:h-4 sm-landscape:w-4" />
        <span className="text-xs font-bold sm-landscape:text-[10px] whitespace-normal text-center line-clamp-2 leading-tight">{name}</span>
      </button>
    );
  }

  if (isUnderwater) {
    return (
      <button
        onClick={onClick}
        className={`flex-shrink-0 w-28 sm-landscape:w-24 flex items-center justify-center flex-col gap-1 px-2 py-2 rounded-full transition-all duration-300 ${
          isActive 
            ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900 shadow-[0_0_20px_rgba(6,182,212,0.6)] scale-105' 
            : 'bg-slate-800/30 text-cyan-200/80 border border-cyan-400/20 hover:bg-slate-700/40 hover:border-cyan-400/40 hover:scale-105'
        }`}
      >
        <Icon className="h-5 w-5 sm-landscape:h-4 sm-landscape:w-4" />
        <span className="text-xs font-bold sm-landscape:text-[10px] whitespace-normal text-center line-clamp-2 leading-tight">{name}</span>
      </button>
    );
  }

  const activeClass = isThemed ? "bg-white/60 text-teal-700" : "bg-white text-teal-700";
  const inactiveClass = isThemed ? "text-white/80 hover:bg-white/20" : "text-slate-500 hover:bg-white/60";
  const textShadow = isThemed ? "text-shadow-soft" : "";

  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 w-24 sm-landscape:w-20 flex flex-col items-center justify-center p-2 sm-landscape:p-1 rounded-t-lg transition-colors duration-200 ${
        isActive ? activeClass : inactiveClass
      }`}
    >
      <Icon className="mb-1 h-6 w-6 sm-landscape:mb-0.5 sm-landscape:h-5 sm-landscape:w-5" />
      <span className={`text-xs font-bold sm-landscape:text-[11px] leading-tight text-center ${textShadow}`}>{name}</span>
    </button>
  );
};

const ConceptActivitiesMenuScreen: React.FC<ConceptActivitiesMenuScreenProps> = ({
  onSelectActivity,
  onBack,
  activeCategory,
  onSelectCategory,
  activityStats,
  theme,
  enabledActivities,
}) => {
  const lang = getCurrentLanguage();
  const tabs = React.useMemo(() => buildTabs(lang), [lang]);
  const activeTabData = tabs.find((t) => t.name === activeCategory) || tabs[0];
  const colors = ["teal", "rose", "sky", "amber", "purple", "cyan", "indigo"] as const;
  const isSimpleTheme = theme === "simple";
  const isCosmic = theme === 'deneme2';
  const isUnderwater = theme === 'deneme';
  
  const titleColorClass = isCosmic
    ? 'bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-indigo-200 to-fuchsia-300 text-glow-planet drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]'
    : isUnderwater
    ? 'text-cyan-200 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]'
    : isSimpleTheme ? "text-purple-900" : "text-white text-shadow-soft";
  const iconColorClass = isCosmic ? 'text-sky-300' : isUnderwater ? 'text-cyan-300' : isSimpleTheme ? "text-purple-700" : "text-white";

  // Cosmic gradient palettes for each activity
  const cosmicPalettes: Record<number, string> = {
    0: 'from-teal-400 via-cyan-300 to-sky-200',
    1: 'from-rose-400 via-pink-300 to-fuchsia-200',
    2: 'from-sky-400 via-blue-300 to-indigo-200',
    3: 'from-amber-400 via-orange-300 to-yellow-200',
    4: 'from-purple-400 via-violet-300 to-indigo-200',
    5: 'from-cyan-400 via-teal-300 to-emerald-200',
    6: 'from-indigo-400 via-purple-300 to-fuchsia-200',
  };

  // Render cosmic activity card
  const renderCosmicCard = (activity: ConceptActivity, index: number, Icon: React.FC<{ className?: string }>, stats: ActivityStats, isDisabled: boolean) => {
    const gradient = cosmicPalettes[index % 7];
    return (
      <button
        key={activity.type}
        onClick={() => !isDisabled && onSelectActivity(activity.type)}
        disabled={isDisabled}
        className={`group relative overflow-hidden rounded-3xl p-4 min-h-[180px] flex flex-col transition-all duration-300 ${
          isDisabled 
            ? 'opacity-40 cursor-not-allowed' 
            : 'hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.5)] active:scale-95'
        }`}
        style={{
          background: isDisabled 
            ? 'linear-gradient(135deg, rgba(51,65,85,0.6), rgba(30,41,59,0.6))' 
            : `linear-gradient(135deg, rgba(15,23,42,0.85), rgba(30,41,59,0.85))`,
          border: '2px solid rgba(56,189,248,0.3)',
        }}
      >
        {/* Inner glow layer */}
        <div 
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity rounded-3xl"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${gradient.split(' ')[0].replace('from-', '')}, transparent 70%)`,
          }}
        />
        
        {/* Icon orb */}
        <div className="relative z-10 mb-2 flex justify-center flex-shrink-0">
          <div 
            className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br ${gradient} shadow-lg ${!isDisabled && 'group-hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]'} transition-shadow`}
          >
            <Icon className="w-7 h-7 text-slate-900" />
          </div>
        </div>
        
        {/* Title */}
        <h3 className="relative z-10 text-center font-bold text-sm text-sky-100 mb-1 group-hover:text-white transition-colors flex-shrink-0">
          {activity.title}
        </h3>
        
        {/* Subtitle */}
        <p className="relative z-10 text-center text-xs text-sky-300/70 mb-2 flex-shrink-0 line-clamp-1">
          {activity.subtitle}
        </p>
        
        {/* Progress */}
        <div className="relative z-10 mt-auto">
          <ProgressIndicator
            attempts={stats.attempts}
            completions={stats.completions}
            totalCorrect={stats.totalCorrect}
            totalQuestions={stats.totalQuestions}
          />
        </div>
      </button>
    );
  };

  // Render underwater activity card - jellyfish style matching main menu
  const renderUnderwaterCard = (activity: ConceptActivity, _index: number, Icon: React.FC<{ className?: string }>, stats: ActivityStats, isDisabled: boolean) => {
    const jellyfishColors = [
      // Oceanic palette — prioritize blues, cyans and teals. Keep variety but avoid pinks.
      'from-blue-600 to-cyan-500',
      'from-cyan-600 to-teal-500',
      'from-teal-600 to-blue-500',
      'from-sky-600 to-cyan-400',
      'from-indigo-600 to-blue-500',
      'from-blue-700 to-teal-500',
      'from-cyan-500 to-sky-400',
      'from-teal-500 to-cyan-400',
    ];
    const color = jellyfishColors[_index % jellyfishColors.length];
    
    return (
      <button
        key={activity.type}
        onClick={() => !isDisabled && onSelectActivity(activity.type)}
        disabled={isDisabled}
        className={`relative flex flex-col items-center transition-all duration-300 ${
          isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110 cursor-pointer'
        }`}
      >
        {/* Jellyfish body (dome) */}
        <div className={`w-32 h-24 sm:w-36 sm:h-28 rounded-t-full bg-gradient-to-b ${color} border-2 border-white/30 backdrop-blur-sm shadow-lg relative overflow-hidden ${!isDisabled && 'hover:shadow-2xl'}`}>
          {/* Shine effect */}
          <div className="absolute top-1 left-3 w-4 h-4 bg-white/40 rounded-full blur-sm"></div>
          <div className="absolute top-2 right-4 w-2 h-2 bg-white/30 rounded-full blur-sm"></div>
          
          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-white drop-shadow-md" />
          </div>
        </div>
        
        {/* Tentacles */}
        <div className="flex gap-0.5 justify-center -mt-1">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className={`w-0.5 h-8 bg-gradient-to-b ${color} opacity-60 rounded-full animate-tentacle`}
              style={{ height: `${32 + Math.random() * 12}px`, animationDelay: `${i * 0.15}s`, transformOrigin: 'top' }}
            />
          ))}
        </div>
        
        {/* Title */}
        <h3 className="text-sm font-bold text-white text-center mt-2 line-clamp-2 px-2 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
          {activity.title}
        </h3>
        
        {/* Subtitle */}
        <p className="text-xs text-white/90 text-center line-clamp-1 px-2 mb-2 drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]">
          {activity.subtitle}
        </p>
        
        {/* Progress */}
        <div className="w-full px-2">
          <ProgressIndicator
            attempts={stats.attempts}
            completions={stats.completions}
            totalCorrect={stats.totalCorrect}
            totalQuestions={stats.totalQuestions}
          />
        </div>
      </button>
    );
  };

  return (
    <div className={`relative flex h-full max-w-4xl flex-col items-center p-2 sm:p-4 animate-fade-in ${isCosmic || isUnderwater ? 'overflow-hidden' : ''}`}>
      {isCosmic && (
        <CosmicBackdrop variant="light" showMeteors={false} />
      )}
      {isUnderwater && (
        <>
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
        </>
      )}
      
      {/* Cosmic: Wrap in big panel */}
      <div className={`relative flex h-full w-full flex-col rounded-3xl p-4 shadow-2xl sm:p-6 sm-landscape:p-2 ${
        isCosmic 
          ? 'bg-slate-900/50 border border-sky-400/20 backdrop-blur-lg overflow-y-auto'
          : isUnderwater
          ? 'bg-gradient-to-b from-[#001122]/60 via-[#001a2e]/50 to-[#000814]/40 border border-cyan-400/20 backdrop-blur-lg overflow-y-auto'
          : isSimpleTheme ? "bg-white/80 backdrop-blur-md border border-purple-200/50" : "bg-black/20 backdrop-blur-md"
      }`}>
        {isCosmic && (
          <>
            <PanelStars count={62} className="rounded-3xl" />
            <div className="cosmic-panel-nebula rounded-3xl" />
          </>
        )}
        {isUnderwater && (
          <>
            {/* Underwater decorative elements */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              {/* Small jellyfish */}
              <div className="absolute top-8 right-12 w-8 h-8 opacity-30">
                <div className="w-full h-full bg-cyan-400/20 rounded-full relative">
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-cyan-400/20 rounded-b-full"></div>
                  <div className="absolute top-1 left-1 w-1 h-2 bg-cyan-300/30 rounded-full"></div>
                  <div className="absolute top-1 right-1 w-1 h-2 bg-cyan-300/30 rounded-full"></div>
                </div>
              </div>
              {/* Small fish */}
              <div className="absolute bottom-12 left-8 text-cyan-300/20 text-lg animate-pulse">🐠</div>
            </div>
          </>
        )}
        
        <div className="relative z-10 mb-4 flex-shrink-0 w-full flex justify-between items-center sm-landscape:mb-2 px-3 py-1.5">
          <button
            onClick={onBack}
            className={`p-2 rounded-full transition-colors ${isCosmic ? 'hover:bg-white/20' : 'hover:bg-black/10'}`}
            aria-label={t("app.back", "Go back")}
          >
            <ArrowLeftIcon className={`h-8 w-8 sm-landscape:h-7 sm-landscape:w-7 ${iconColorClass}`} />
          </button>
          <h1 className={`flex-1 text-center text-2xl font-black sm:text-3xl sm-landscape:text-xl ${titleColorClass}`}>
            {lang === "tr" ? "Kavram Etkinlikleri" : "Concept Activities"}
          </h1>
          <div className="w-12 h-12 sm-landscape:w-11 sm-landscape:h-11" />
        </div>

        <div
          className={`relative z-10 mb-4 w-full overflow-x-auto rounded-t-xl pb-1 sm-landscape:mb-2 h-14 sm-landscape:h-12 flex-shrink-0 ${
            isCosmic ? '' : isUnderwater ? 'bg-gradient-to-r from-cyan-900/20 to-teal-900/20' : isSimpleTheme ? "bg-purple-100/50" : "bg-black/20"
          }`}
        >
          <div className="flex gap-2 items-center h-full w-max min-w-full">
            {tabs.map((tab) => (
              <TabButton
                key={tab.name}
                name={tab.name}
                icon={tab.icon}
                isActive={activeCategory === tab.name}
                onClick={() => onSelectCategory(tab.name)}
                isThemed={isCosmic || isUnderwater || !isSimpleTheme}
                isCosmic={isCosmic}
                isUnderwater={isUnderwater}
              />
            ))}
          </div>
        </div>

        <div key={activeTabData.name} className="relative z-10 flex-grow overflow-y-auto animate-fade-in">
          {isCosmic ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-4 landscape:grid-cols-3 sm-landscape:grid-cols-4">
              {activeTabData.activities.map((activity, index) => {
                const stats =
                  activityStats[String(activity.type)] || {
                    attempts: 0,
                    completions: 0,
                    totalCorrect: 0,
                    totalQuestions: 0,
                  };
                const isDisabled = !enabledActivities.has(String(activity.type));
                return renderCosmicCard(activity, index, activeTabData.icon, stats, isDisabled);
              })}
            </div>
          ) : isUnderwater ? (
            <div className="grid grid-cols-2 gap-6 sm:gap-8 landscape:grid-cols-3 sm-landscape:grid-cols-4">
              {activeTabData.activities.map((activity, index) => {
                const stats =
                  activityStats[String(activity.type)] || {
                    attempts: 0,
                    completions: 0,
                    totalCorrect: 0,
                    totalQuestions: 0,
                  };
                const isDisabled = !enabledActivities.has(String(activity.type));
                return renderUnderwaterCard(activity, index, activeTabData.icon, stats, isDisabled);
              })}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 landscape:grid-cols-3 sm-landscape:grid-cols-4">
              {activeTabData.activities.map((activity, index) => {
                const stats =
                  activityStats[String(activity.type)] || {
                    attempts: 0,
                    completions: 0,
                    totalCorrect: 0,
                    totalQuestions: 0,
                  };
                const isDisabled = !enabledActivities.has(String(activity.type));
                return (
                  <MenuButton
                    key={activity.type}
                    icon={activeTabData.icon}
                    title={activity.title}
                    subtitle={activity.subtitle}
                    onClick={() => onSelectActivity(activity.type)}
                    color={colors[index % colors.length]}
                    theme={theme}
                    disabled={isDisabled}
                  >
                    <ProgressIndicator
                      attempts={stats.attempts}
                      completions={stats.completions}
                      totalCorrect={stats.totalCorrect}
                      totalQuestions={stats.totalQuestions}
                    />
                  </MenuButton>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ConceptActivitiesMenuScreen);
