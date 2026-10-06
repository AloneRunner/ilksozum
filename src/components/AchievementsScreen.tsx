
import React from 'react';
import { ActivityCategory, ActivityStats, ActivityType, SubAchievement } from '../types.ts';
import { ACHIEVEMENTS, ALL_SUB_ACHIEVEMENTS, LETTER_GROUPS, OBJECT_CATEGORIES } from '../constants.ts';
import StarIcon from './icons/StarIcon.tsx';
import BrainIcon from './icons/BrainIcon.tsx';
import CrownIcon from './icons/CrownIcon.tsx';
import ArrowLeftIcon from './icons/ArrowLeftIcon.tsx';
import { AppColor, getColorClasses } from '../themes/colorManager.ts';
import { useAppContext } from '../contexts/AppContext.ts';
import CosmicBackdrop from './ui/CosmicBackdrop.tsx';
import PanelStars from './ui/PanelStars.tsx';
import { t, getCurrentLanguage } from '../i18n/index.ts';

// Helper function to translate activity names
const getActivityName = (activityType: ActivityType | string): string => {
    // Letter activities
    if (activityType === ActivityType.Syllabification) return t('activities.letter.syllabification', 'Heceleme');
    if (activityType === ActivityType.FindTheLetterInGrid) return t('activities.letter.grid', 'Harf Tablosu');
    if (activityType === ActivityType.FindTheSoundInImage) return t('activities.letter.findSoundInImage', 'Görselde Sesi Bul');
    if (activityType === ActivityType.EmbeddedStory) return t('activities.letter.embeddedStory', 'Hikaye Zamanı');
    if (activityType === ActivityType.SoundPresence) return t('activities.letter.soundPresence', 'Seste Harf Var mı?');
    if (activityType === ActivityType.FindTheLetter) return t('activities.letter.findTheLetter', 'Harf Bulma');
    
    // Concept activities
    if (activityType === ActivityType.YesNo) return t('concepts.activities.yesNo', 'Evet / Hayır');
    if (activityType === ActivityType.Colors) return t('concepts.activities.colors', 'Renkler');
    if (activityType === ActivityType.Shapes) return t('concepts.activities.shapes', 'Şekiller');
    if (activityType === ActivityType.Emotions) return t('concepts.activities.emotions', 'Duygular');
    if (activityType === ActivityType.BigSmall) return t('concepts.activities.bigSmall', 'Büyük / Küçük');
    if (activityType === ActivityType.LongShort) return t('concepts.activities.longShort', 'Uzun / Kısa');
    if (activityType === ActivityType.ThinThick) return t('concepts.activities.thinThick', 'İnce / Kalın');
    if (activityType === ActivityType.WideNarrow) return t('concepts.activities.wideNarrow', 'Geniş / Dar');
    if (activityType === ActivityType.OldNew) return t('concepts.activities.oldNew', 'Eski / Yeni');
    if (activityType === ActivityType.HardSoft) return t('concepts.activities.hardSoft', 'Sert / Yumuşak');
    if (activityType === ActivityType.CleanDirty) return t('concepts.activities.cleanDirty', 'Temiz / Kirli');
    if (activityType === ActivityType.WetDry) return t('concepts.activities.wetDry', 'Islak / Kuru');
    if (activityType === ActivityType.OpenClosed) return t('concepts.activities.openClosed', 'Açık / Kapalı');
    if (activityType === ActivityType.StraightCurved) return t('concepts.activities.straightCurved', 'Düz / Eğri');
    if (activityType === ActivityType.AliveLifeless) return t('concepts.activities.aliveLifeless', 'Canlı / Cansız');
    if (activityType === ActivityType.BitterSweet) return t('concepts.activities.bitterSweet', 'Acı / Tatlı');
    if (activityType === ActivityType.HeavyLight) return t('concepts.activities.heavyLight', 'Ağır / Hafif');
    if (activityType === ActivityType.HotCold) return t('concepts.activities.hotCold', 'Sıcak / Soğuk');
    if (activityType === ActivityType.RoughSmooth) return t('concepts.activities.roughSmooth', 'Pürüzlü / Pürüzsüz');
    if (activityType === ActivityType.BrokenIntact) return t('concepts.activities.brokenIntact', 'Sağlam / Kırık');
    if (activityType === ActivityType.MessyClean) return t('concepts.activities.messyClean', 'Dağınık / Toplu');
    if (activityType === ActivityType.HungryFull) return t('concepts.activities.hungryFull', 'Aç / Tok');
    if (activityType === ActivityType.YoungOld) return t('concepts.activities.youngOld', 'Yaşlı / Genç');
    if (activityType === ActivityType.FewMuch) return t('concepts.activities.fewMuch', 'Az / Çok');
    if (activityType === ActivityType.HalfQuarterWhole) return t('concepts.activities.halfQuarterWhole', 'Bütün / Yarım / Çeyrek');
    if (activityType === ActivityType.FullEmpty) return t('concepts.activities.fullEmpty', 'Dolu / Boş');
    if (activityType === ActivityType.OddEven) return t('concepts.activities.oddEven', 'Tek / Çift');
    if (activityType === ActivityType.OnUnder) return t('concepts.activities.onUnder', 'Üstünde / Altında');
    if (activityType === ActivityType.BelowAbove) return t('concepts.activities.belowAbove', 'Aşağıda / Yukarıda');
    // Additional concept activities (full coverage)
    if (activityType === ActivityType.NoisyQuiet) return t('concepts.activities.noisyQuiet', 'Gürültülü / Sessiz');
    if (activityType === ActivityType.TazeBayat) return t('concepts.activities.freshStale', 'Taze / Bayat');
    if (String(activityType) === String(ActivityType.MessyClean)) return t('concepts.activities.messyTidy', 'Dağınık / Toplu');
    if (activityType === ActivityType.KirisikDuzgun) return t('concepts.activities.wrinkledSmooth', 'Kırışık / Düzgün');
    if (activityType === ActivityType.SivriKut) return t('concepts.activities.pointedBlunt', 'Sivri / Küt');
    if (activityType === ActivityType.ParlakMat) return t('concepts.activities.shinyMatte', 'Parlak / Mat');
    if (activityType === ActivityType.AcikKoyu) return t('concepts.activities.acikKoyu', 'Açık / Koyu');
    if (activityType === ActivityType.HavaDurumu) return t('concepts.activities.havaDurumu', 'Hava Durumu');
    if (activityType === ActivityType.IlkSon) return t('concepts.activities.ilkSon', 'İlk / Son');
    if (activityType === ActivityType.TehlikeliGuvenli) return t('concepts.activities.tehlikeliGuvenli', 'Tehlikeli / Güvenli');
    if (activityType === ActivityType.YenirYenmez) return t('concepts.activities.yenirYenmez', 'Yenir / Yenmez');
    if (activityType === ActivityType.TembelCaliskan) return t('concepts.activities.lazyHardworking', 'Tembel / Çalışkan');
    if (activityType === ActivityType.SeffafOpak) return t('concepts.activities.transparentOpaque', 'Şeffaf / Opak');
    if (activityType === ActivityType.DikenliPuruzsuz) return t('concepts.activities.thornySmooth', 'Dikenli / Pürüzsüz');
    if (activityType === ActivityType.DerinSig) return t('concepts.activities.deepShallow', 'Derin / Sığ');
    if (activityType === ActivityType.KalabalikTenha) return t('concepts.activities.crowdedSparse', 'Kalabalık / Tenha');
    if (activityType === ActivityType.DugumCozuk) return t('concepts.activities.knottedUntied', 'Düğüm / Çözük');
    if (activityType === ActivityType.TersDuz) return t('concepts.activities.upsideDownUpright', 'Ters / Düz');
    if (activityType === ActivityType.BesideOpposite) return t('concepts.activities.besideOpposite', 'Yanında / Karşısında');
    if (activityType === ActivityType.InFrontOfBehind) return t('concepts.activities.inFrontOfBehind', 'Önünde / Arkada');
    if (activityType === ActivityType.InsideOutside) return t('concepts.activities.insideOutside', 'İçinde / Dışında');
    if (activityType === ActivityType.Between) return t('concepts.activities.between', 'Arasında');
    if (activityType === ActivityType.LeftRight) return t('concepts.activities.leftRight', 'Sağ / Sol');
    if (activityType === ActivityType.NearFar) return t('concepts.activities.nearFar', 'Yakın / Uzak');
    if (activityType === ActivityType.HighLow) return t('concepts.activities.highLow', 'Yüksek / Alçak');
    if (activityType === ActivityType.BeforeAfter) return t('concepts.activities.beforeAfter', 'Önce / Sonra');
    if (activityType === ActivityType.DayNight) return t('concepts.activities.dayNight', 'Gündüz / Gece');
    if (activityType === ActivityType.FastSlow) return t('concepts.activities.fastSlow', 'Hızlı / Yavaş');
    if (activityType === ActivityType.Senses) return t('concepts.activities.senses', 'Duyularımız');

    // Relative comparison activities
    if (activityType === ActivityType.RelativeBigSmall) return t('concepts.activities.bigSmall', 'Büyük / Küçük');
    if (activityType === ActivityType.RelativeWideNarrow) return t('concepts.activities.wideNarrow', 'Geniş / Dar');
    if (activityType === ActivityType.RelativeThinThick) return t('concepts.activities.thinThick', 'İnce / Kalın');
    if (activityType === ActivityType.RelativeFewMuch) return t('concepts.activities.fewMuch', 'Az / Çok');
    if (activityType === ActivityType.RelativeLongShort) return t('concepts.activities.longShort', 'Uzun / Kısa');
    if (activityType === ActivityType.RelativeNearFar) return t('concepts.activities.nearFar', 'Yakın / Uzak');
    if (activityType === ActivityType.RelativeHighLow) return t('concepts.activities.highLow', 'Yüksek / Alçak');

    // Reasoning activities
    if (activityType === ActivityType.WhatDoesntBelong) return t('activities.reasoning.whatDoesntBelong', 'Hangisi Farklı?');
    if (activityType === ActivityType.FunctionalMatching) return t('activities.reasoning.functionalMatching', 'Fonksiyonel Eşleştirme');
    if (activityType === ActivityType.CauseEffect) return t('activities.reasoning.causeEffect', 'Neden & Sonuç');
    if (activityType === ActivityType.SequencingStories) return t('activities.reasoning.sequencingStories', 'Sıralama');
    if (activityType === ActivityType.PatternCompletion) return t('activities.reasoning.patternCompletion', 'Örüntü Tamamlama');
    if (activityType === ActivityType.Sudoku) return t('activities.reasoning.sudoku', 'Sudoku');
    if (activityType === ActivityType.MemoryCards) return t('activities.reasoning.memoryCards', 'Hafıza Kartları');
    if (activityType === ActivityType.DragAndDropCounting) return t('activities.reasoning.dragAndDropCounting', 'Nesneleri Taşı');
    if (activityType === ActivityType.DragAndDropPositioning) return t('activities.reasoning.dragAndDropPositioning', 'Topu Yerleştir');
    if (activityType === ActivityType.Hangman) return t('activities.reasoning.hangman', 'Adam Asmaca');

    // Fine motor
    if (activityType === ActivityType.LineTracing) return t('activities.fineMotor.lineTracing', 'Çizgi Takip');
    if (activityType === ActivityType.ShapeColoring) return t('activities.fineMotor.shapeColoring', 'Şekil Boyama');
    if (activityType === ActivityType.RhythmFollowing) return t('activities.fineMotor.rhythmFollowing', 'Ritim Takip');
    if (activityType === ActivityType.LetterTracing) return t('activities.fineMotor.letterTracing', 'Harf Çizgi Takibi');
    if (activityType === ActivityType.ConstrainedColoring) return t('activities.fineMotor.constrainedColoring', 'Kısıtlı Boyama');

    // 5N1K subcategories (string ids)
    if (String(activityType) === 'FiveWOneH_Who') return t('activities.fiveWOneH.who', '5N1K - Kim?');
    if (String(activityType) === 'FiveWOneH_What') return t('activities.fiveWOneH.what', '5N1K - Ne?');
    if (String(activityType) === 'FiveWOneH_Where') return t('activities.fiveWOneH.where', '5N1K - Nerede?');
    if (String(activityType) === 'FiveWOneH_When') return t('activities.fiveWOneH.when', '5N1K - Ne Zaman?');
    if (String(activityType) === 'FiveWOneH_Why') return t('activities.fiveWOneH.why', '5N1K - Neden?');
    if (String(activityType) === 'FiveWOneH_How') return t('activities.fiveWOneH.how', '5N1K - Nasıl?');
    
    // Object categories - try to translate using objects.categories keys
    // Common object category strings that appear in activities
    // If activityType is a string and matches an object category id, translate by id directly
    if (typeof activityType === 'string') {
        const isObjectCategory = OBJECT_CATEGORIES.some(c => c.id === activityType);
        if (isObjectCategory) {
            return t(`objects.categories.${activityType}`, activityType);
        }
    }

    // For other activities, return the Turkish name as fallback
    const subAchievement = ALL_SUB_ACHIEVEMENTS.find(sa => String(sa.id) === String(activityType));
    return subAchievement?.name || String(activityType);
};

// Helper function to translate category names
const getCategoryName = (category: ActivityCategory): string => {
    if (category === ActivityCategory.LetterSound) return t('achievements.categories.letterSound', 'Harfler ve Okuma');
    if (category === ActivityCategory.Objects) return t('achievements.categories.objects', 'Kelimeler');
    if (category === ActivityCategory.Concept) return t('achievements.categories.concept', 'Kavramlar');
    if (category === ActivityCategory.Reasoning) return t('achievements.categories.reasoning', 'Düşünme ve Hafıza');
    if (category === ActivityCategory.FiveWOneH) return t('achievements.categories.fiveWOneH', '5N1K');
    if (category === ActivityCategory.FineMotor) return t('achievements.categories.fineMotor', 'El Becerisi');
    if (category === ActivityCategory.RelativeComparison) return t('achievements.categories.relativeComparison', 'Kavramlar: Kıyasla (Zor)');
    return String(category);
};

interface AchievementsScreenProps {
    activityStats: Record<string, ActivityStats>;
    onSelectParentReport: () => void;
    onBack: () => void;
    isPremium: boolean;
}

// A new component to handle the specific logic for letter/group based activities
const AggregatedProgress: React.FC<{
    subAchievement: SubAchievement;
    activityStats: Record<string, ActivityStats>;
    achievementColor: AppColor | string;
}> = ({ subAchievement, activityStats, achievementColor }) => {
    
    const allLetters = React.useMemo(() => {
        const lang = getCurrentLanguage();
        // Turkish and Azerbaijani use 29 letters (including Ğ, Ş, etc.)
        // Other languages use 26 letters (standard Latin alphabet)
        if (lang === 'tr' || lang === 'az') {
            return LETTER_GROUPS.flatMap(g => g.letters);
        } else {
            // For other languages, use A-Z (26 letters)
            return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        }
    }, []);
    
    const {
        totalCorrect,
        totalQuestions,
        attempts,
        completionCount,
        totalSubItems
    } = React.useMemo(() => {
        let totalCorrect = 0;
        let totalQuestions = 0;
        let attempts = 0;
        let completionCount = 0;
        let totalSubItems = 0;
        
        const activityId = String(subAchievement.id);
        
        if (activityId === String(ActivityType.Syllabification)) {
            totalSubItems = 5; // 5 groups
            for (let i = 1; i <= totalSubItems; i++) {
                const key = `${activityId}-${i}`;
                const stats = activityStats[key];
                if (stats) {
                    attempts += stats.attempts;
                    totalCorrect += stats.totalCorrect || 0;
                    totalQuestions += stats.totalQuestions || 0;
                    if ((stats.completions || 0) >= 3) {
                        completionCount++;
                    }
                }
            }
        } else {
            totalSubItems = allLetters.length;
            for (const letter of allLetters) {
                const key = `${activityId}-${letter}`;
                const stats = activityStats[key];
                if (stats) {
                    attempts += stats.attempts;
                    totalCorrect += stats.totalCorrect || 0;
                    totalQuestions += stats.totalQuestions || 0;
                    if ((stats.completions || 0) >= 3) {
                        completionCount++;
                    }
                }
            }
        }
        
        return { totalCorrect, totalQuestions, attempts, completionCount, totalSubItems };

    }, [subAchievement.id, activityStats, allLetters]);

    const isMastered = totalSubItems > 0 && completionCount === totalSubItems;
    const skillPercentage = totalQuestions > 0 ? (totalCorrect / totalQuestions * 100) : 0;
    const progressText = subAchievement.id === ActivityType.Syllabification 
        ? t('achievements.groups', 'Gruplar') 
        : t('achievements.letters', 'Harfler');

    const colorClasses = getColorClasses(achievementColor);

    return (
        <div className={`p-2 rounded-lg transition-colors ${isMastered ? colorClasses.bg100 : 'bg-slate-100'}`}>
            <div className="flex items-center mb-1">
                {isMastered ? (
                    <StarIcon className={`w-4 h-4 mr-2 text-amber-400`} />
                ) : (
                    <div className={`w-4 h-4 mr-2 rounded-full ${attempts > 0 ? colorClasses.bg200 : 'bg-slate-200'}`} />
                )}
                <span className={`text-xs font-semibold ${isMastered ? colorClasses.text800 : 'text-slate-600'}`}>{getActivityName(subAchievement.id)}</span>
            </div>
            {attempts > 0 && (
                <>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mt-1.5">
                        <div className={`${colorClasses.bg500} h-1.5 rounded-full`} style={{ width: `${skillPercentage}%` }}></div>
                    </div>
                    <div className="text-xs text-right text-slate-600 mt-1 font-semibold">
                       {progressText}: {completionCount} / {totalSubItems}
                    </div>
                </>
            )}
        </div>
    );
};


const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ activityStats, onSelectParentReport, onBack, isPremium }) => {
    const { settings } = useAppContext();
    const isSimpleTheme = settings.theme === 'simple';
    const isCosmic = settings.theme === 'deneme2';
    
    const allLetters = React.useMemo(() => LETTER_GROUPS.flatMap(g => g.letters), []);
    
    const getCompletedCountForCategory = (category: ActivityCategory) => {
        const subAchievementsInCategory = ALL_SUB_ACHIEVEMENTS.filter(sa => sa.category === category);
        
        if (category === ActivityCategory.LetterSound) {
            let masteredActivities = 0;
            const letterBasedActivities = subAchievementsInCategory.filter(sa => sa.id !== ActivityType.Syllabification && sa.id !== ActivityType.EmbeddedStory);

            // Check Syllabification mastery
            let masteredGroups = 0;
            for(let i=1; i <= 5; i++){
                const key = `${ActivityType.Syllabification}-${i}`;
                if((activityStats[key]?.completions || 0) >= 3) {
                    masteredGroups++;
                }
            }
            if(masteredGroups === 5) masteredActivities++;

            // Check other letter-based activities
            for(const activity of letterBasedActivities) {
                let masteredLetters = 0;
                for(const letter of allLetters){
                    const key = `${activity.id}-${letter}`;
                    if((activityStats[key]?.completions || 0) >= 3){
                        masteredLetters++;
                    }
                }
                if(masteredLetters === allLetters.length) masteredActivities++;
            }
            return masteredActivities;

        } else {
            return subAchievementsInCategory.filter(sa => {
                const stats = activityStats[String(sa.id)];
                return (stats?.completions || 0) >= 3;
            }).length;
        }
    };

    const getTotalCountForCategory = (category: ActivityCategory) => {
        const subAchievements = ALL_SUB_ACHIEVEMENTS.filter(sa => sa.category === category);
        if (category === ActivityCategory.LetterSound) {
            // EmbeddedStory does not have completion tracking
            return subAchievements.filter(sa => sa.id !== ActivityType.EmbeddedStory).length;
        }
        return subAchievements.length;
    };

    const content = (
        <div className="relative flex flex-col items-center justify-start h-full max-w-4xl mx-auto p-4 animate-fade-in">
            {isCosmic && (
                <>
                    <CosmicBackdrop variant="rich" />
                </>
            )}
            <div className="w-full flex items-center mb-8 landscape:mb-4 relative z-10">
                <button
                    onClick={onBack}
                    className={`absolute left-0 p-3 rounded-full ${isCosmic ? 'bg-white/20 hover:bg-white/30' : 'bg-white hover:bg-sky-50'} shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200 z-50`}
                    aria-label="Geri Dön"
                >
                    <ArrowLeftIcon className={`w-8 h-8 ${isCosmic ? 'text-white' : 'text-sky-700'}`}/>
                </button>
                <h1 className={isSimpleTheme
                    ? "flex-1 text-center text-3xl sm:text-4xl landscape:text-2xl font-black text-purple-900 drop-shadow-[0_4px_12px_rgba(147,51,234,0.15)]"
                    : "flex-1 text-center text-3xl sm:text-4xl landscape:text-2xl font-black text-white text-shadow-soft"}>
                    {t('achievements.title', t('screens.achievements.title', 'Başarımlar'))}
                </h1>
                <button 
                    onClick={onSelectParentReport}
                    className={`absolute right-0 p-3 rounded-full ${isCosmic ? 'bg-white/20 hover:bg-white/30' : 'bg-white hover:bg-amber-50'} shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200 z-50`}
                    aria-label="Gelişim Raporunu Görüntüle"
                >
                    <BrainIcon className={`w-8 h-8 ${isCosmic ? 'text-amber-300' : 'text-amber-700'}`}/>
                    {!isPremium && <CrownIcon className="absolute -top-1 -right-1 w-6 h-6 text-amber-500 bg-white rounded-full p-0.5" />}
                </button>
            </div>

            <p className={isSimpleTheme
                ? "text-center text-pink-700 drop-shadow-[0_2px_6px_rgba(236,72,153,0.1)] mb-8 landscape:mb-4 text-lg landscape:text-base -mt-4 landscape:-mt-2"
                : "text-center text-white/90 text-shadow-soft mb-8 landscape:mb-4 text-lg landscape:text-base -mt-4 landscape:-mt-2"}>
                {t('achievements.subtitle', t('screens.achievements.subtitle', 'Bir etkinliği 3 kez hatasız tamamlayarak rozetini kazan!'))}
            </p>

            <div className="relative w-full flex-grow overflow-y-auto pr-2 space-y-4">
                {isCosmic && <PanelStars count={72} className="rounded-3xl" />}
                {ACHIEVEMENTS.map(achievement => {
                    const completedCount = getCompletedCountForCategory(achievement.id);
                    const totalCount = getTotalCountForCategory(achievement.id);
                    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
                    const colorClasses = getColorClasses(achievement.color);
                    
                    const subAchievements = ALL_SUB_ACHIEVEMENTS.filter(sa => sa.category === achievement.id);

                    return (
                        <div key={achievement.id} className={`${isCosmic ? 'bg-white/10 border border-cyan-300/30 backdrop-blur-md shadow-[0_18px_38px_rgba(14,165,233,0.18)]' : 'bg-white/80'} p-5 rounded-2xl shadow-md`}>
                            <div className="flex items-center mb-3">
                                <div className={`${isCosmic ? 'bg-white/15 border border-cyan-300/30' : colorClasses.bg100} p-3 rounded-xl mr-4`}>
                                    <achievement.icon className={`w-8 h-8 ${isCosmic ? 'text-white' : colorClasses.text600}`} />
                                </div>
                                <div>
                                    <h2 className={`text-xl font-bold ${isCosmic ? 'text-white' : colorClasses.text800}`}>{getCategoryName(achievement.id)}</h2>
                                    <p className={`${isCosmic ? 'text-white/80' : 'text-slate-500'} font-semibold`}>{completedCount} / {totalCount} {t('achievements.completed', 'Completed')}</p>
                                </div>
                            </div>
                            <div className={`w-full ${isCosmic ? 'bg-white/15' : 'bg-slate-200'} rounded-full h-4`}>
                                <div
                                    className={`${isCosmic ? 'bg-cyan-400' : colorClasses.bg500} h-4 rounded-full transition-all duration-500`}
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {achievement.id === ActivityCategory.LetterSound 
                                ? subAchievements.map(sub => {
                                    if(sub.id === ActivityType.EmbeddedStory) return null;
                                    return <AggregatedProgress key={String(sub.id)} subAchievement={sub} activityStats={activityStats} achievementColor={achievement.color} />
                                })
                                : subAchievements.map(sub => {
                                    const stats = activityStats[String(sub.id)] || { attempts: 0, completions: 0, totalCorrect: 0, totalQuestions: 0 };
                                    const isMastered = (stats.completions || 0) >= 3;
                                    const skillPercentage = (stats.totalQuestions || 0) > 0 ? (((stats.totalCorrect || 0) / stats.totalQuestions!) * 100) : 0;
                                    const subColorClasses = getColorClasses(achievement.color);
                                    const localizedName = getActivityName(sub.id);

                                    return (
                                        <div key={String(sub.id)} className={`p-2 rounded-lg transition-colors ${isCosmic ? (isMastered ? 'bg-white/15' : 'bg-white/10') : (isMastered ? subColorClasses.bg100 : 'bg-slate-100')}`}>
                                            <div className="flex items-center mb-1">
                                                {isMastered ? (
                                                    <StarIcon className={`w-4 h-4 mr-2 ${isCosmic ? 'text-amber-300' : 'text-amber-400'}`} />
                                                ) : (
                                                    <div className={`w-4 h-4 mr-2 rounded-full ${isCosmic ? (stats.attempts > 0 ? 'bg-white/25' : 'bg-white/10') : (stats.attempts > 0 ? subColorClasses.bg200 : 'bg-slate-200')}`} />
                                                )}
                                                <span className={`text-xs font-semibold ${isCosmic ? 'text-white/90' : (isMastered ? subColorClasses.text800 : 'text-slate-600')}`}>{localizedName}</span>
                                            </div>
                                            {stats.attempts > 0 && (
                                                <div className={`w-full ${isCosmic ? 'bg-white/15' : 'bg-slate-200'} rounded-full h-1.5 mt-1.5`}>
                                                    <div className={`${isCosmic ? 'bg-cyan-400' : subColorClasses.bg500} h-1.5 rounded-full`} style={{ width: `${skillPercentage}%` }}></div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );

    return content;
};

export default React.memo(AchievementsScreen);
