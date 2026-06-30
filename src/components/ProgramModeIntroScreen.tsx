import React, { useMemo, useState } from 'react';
import { t } from '../i18n';
import { ActivityType } from '../types';
import { SimpleThemeWrapper, SIMPLE_THEME_ACTION_BUTTON, SIMPLE_THEME_TEXT_PRIMARY, SIMPLE_THEME_TEXT_SECONDARY } from '../themes/simpleTheme';
import AcademicCapIcon from './icons/AcademicCapIcon.tsx';
import { ActivityStats, ParentOverride } from '../types.ts';
import { UNIT_DEFINITIONS } from '../constants/unitDefinitions';
import { getUnitCompletionPercentage, getUnitDisplaySuccessPercentageForProgramMode, isUnitUnlockedForProgramMode, getUnlockedUnitsForProgramMode, getActivityProgramSuccessPercentage } from '../services/masteryEngine';
import { buildDailySession, getRecommendedSessionLength, shouldShowNewSession } from '../services/sessionBuilder';
import { getActivityMetadata } from '../constants/activityMetadata';
import { getAllowedUnitCeiling, getPolicyToday } from '../services/progressionPolicy';
import LockClosedIcon from './icons/LockClosedIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface ProgramModeIntroScreenProps {
  onBack: () => void;
  onStartProgramMode: () => void | Promise<void>;
  onStartReinforcementMode?: () => void | Promise<void>;
  setActivityStats?: React.Dispatch<React.SetStateAction<Record<string, ActivityStats>>>;
  theme: string;
  activityStats: Record<string, ActivityStats>;
  masteredObjectCategories?: Set<string>;
  lastSessionDate?: string;
  profileId?: string;
  isPremium?: boolean;
  parentOverrides?: ParentOverride[];
}

type TabType = 'progress' | 'units' | 'today';

function getHighestUnlockedUnit(units: Set<number>): number {
  let highest = 1;
  units.forEach(unit => {
    if (unit > highest) highest = unit;
  });
  return highest;
}

const ProgramModeIntroScreen: React.FC<ProgramModeIntroScreenProps> = ({ 
  onBack, 
  onStartProgramMode, 
  onStartReinforcementMode,
  activityStats,
  masteredObjectCategories = new Set(),
  lastSessionDate,
  profileId,
  isPremium,
  parentOverrides
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('today');
  // Manual reinforcement selections per-profile (persisted in localStorage)
  const [manualReinforcement, setManualReinforcement] = useState<Set<string>>(new Set());

  const manualKey = profileId ? `manual_reinforcement_profile_${profileId}` : null;

  React.useEffect(() => {
    if (!manualKey) return;
    try {
      const raw = localStorage.getItem(manualKey);
      if (raw) {
        const arr = JSON.parse(raw) as string[];
        setManualReinforcement(new Set(arr));
      } else {
        setManualReinforcement(new Set());
      }
    } catch (e) {
      console.warn('Failed to read manual reinforcement from localStorage', e);
      setManualReinforcement(new Set());
    }
  }, [manualKey]);

  const persistManualReinforcement = (set: Set<string>) => {
    if (!manualKey) return;
    const arr = Array.from(set);
    try {
      localStorage.setItem(manualKey, JSON.stringify(arr));
    } catch (e) {
      console.warn('Failed to persist manual reinforcement', e);
    }
  };

  const toggleManualReinforcement = (activityId: string) => {
    setManualReinforcement(prev => {
      const next = new Set(prev);
      if (next.has(activityId)) next.delete(activityId);
      else next.add(activityId);
      persistManualReinforcement(next);
      return next;
    });
  };

  const clearManualReinforcement = () => {
    setManualReinforcement(new Set());
    persistManualReinforcement(new Set());
  };

  // Small inner component to render the activity dot + manual toggle button
  const ActivityProgramDot: React.FC<{ activityId: string }> = ({ activityId }) => {
    const prog = getActivityProgramSuccessPercentage(activityId, activityStats, 6);
    const isGood = prog >= 100;
    const isManual = manualReinforcement.has(activityId);
    return (
      <>
        <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ backgroundColor: isGood ? '#16a34a' : '#d1d5db' }} />
        <span className="text-xs text-gray-600 ml-1">{prog}%</span>
        {/* Manual toggle shown only when activity is not successful (grey) */}
        {!isGood && (
          <button
            type="button"
            onClick={() => toggleManualReinforcement(activityId)}
            className={`ml-2 text-[11px] px-2 py-0.5 rounded-md font-medium ${isManual ? 'bg-violet-600 text-white' : 'bg-violet-50 text-violet-700 border border-violet-100'}`}
          >
            {isManual ? t('programMode.removeFromReinforcement', 'Çıkar') : t('programMode.addToReinforcement', 'Ekle')}
          </button>
        )}
      </>
    );
  };
  
  // Calculate unit progress
  const unitProgress = useMemo(() =>
    UNIT_DEFINITIONS.map(unit => {
      const completion = getUnitCompletionPercentage(unit.unitNumber, activityStats, masteredObjectCategories);
      // Use program-mode display (last 6 attempts) so the percentage matches what
      // the unit-unlock check actually evaluates.
      const display = getUnitDisplaySuccessPercentageForProgramMode(unit.unitNumber, activityStats, masteredObjectCategories, parentOverrides, 6);
      return {
        ...unit,
        isUnlocked: isUnitUnlockedForProgramMode(unit.unitNumber, activityStats, masteredObjectCategories, parentOverrides, 6, profileId),
        completionPercentage: completion,
        displayPercentage: display,
      };
    }),
    [activityStats, masteredObjectCategories, parentOverrides, profileId]
  );
  
  const todaySession = useMemo(() => {
    const sessionLength = getRecommendedSessionLength(
      Object.keys(activityStats).filter(id => activityStats[id]?.completions > 0).length
    );
    // Use program-mode unlock check (last 6 attempts) so the session ceiling matches
    // the same logic used by unit-advancement tracking in useActivity.
    const unlocked = getUnlockedUnitsForProgramMode(activityStats, masteredObjectCategories, parentOverrides, 6, profileId);
    const ceiling = profileId
      ? (isPremium ? getHighestUnlockedUnit(unlocked) : getAllowedUnitCeiling(profileId, unlocked))
      : undefined;
    return buildDailySession(activityStats, masteredObjectCategories, undefined, sessionLength, ceiling, parentOverrides);
  }, [activityStats, masteredObjectCategories, profileId, isPremium, parentOverrides]);

  // Check if today's session is fresh
  const isSessionFresh = useMemo(() => 
    shouldShowNewSession(lastSessionDate),
    [lastSessionDate]
  );

  // Render progress circles
  const renderProgressCircles = (percentage: number, total: number = 7) => {
    const filled = Math.round((percentage / 100) * total);
    return (
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${
              i < filled ? 'bg-emerald-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  // Localized activity name (fallback to metadata Turkish name)
  const getActivityName = (activityId: string) => {
    const metadata = getActivityMetadata(activityId);
    const base = metadata?.activityName || activityId;
    // Resolve enum name if ID is numeric (ActivityType is a numeric enum)
    let keyId = activityId;
    if (/^\d+$/.test(activityId)) {
      const enumName = (ActivityType as any)[Number(activityId)];
      if (typeof enumName === 'string') keyId = enumName;
    }
    const langKey = `programMode.activityNames.${keyId}`;
    const localized = t(langKey, base);
    return localized;
  };

  const getUnitName = (unitNumber: number, defaultName: string) => {
    const key = `programMode.unitNames.${unitNumber}`;
    return t(key, defaultName);
  };

  // Render tab button
  const TabButton = ({ tab, label, icon }: { tab: TabType; label: string; icon: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
        activeTab === tab
          ? 'bg-emerald-600 text-white shadow-sm'
          : 'bg-white text-gray-600 hover:bg-emerald-50'
      }`}
    >
      {icon} {label}
    </button>
  );
  return (
    <SimpleThemeWrapper maxWidthClassName="max-w-3xl" className="gap-4">
      <header className="mb-2 text-center">
        <div className="inline-flex items-center gap-3 rounded-2xl bg-white/90 px-5 py-3 border border-emerald-200 shadow-sm">
          <AcademicCapIcon className="h-6 w-6 text-emerald-600" />
          <h1 className={`text-2xl font-black ${SIMPLE_THEME_TEXT_PRIMARY}`}>
            {t('programMode.title', 'Program Modu')}
          </h1>
        </div>
        <p className={`mt-3 text-sm sm:text-base ${SIMPLE_THEME_TEXT_SECONDARY}`}>
          {t('programMode.subtitle', '10 ünitede planlı ve dengeli ilerleme')}
        </p>
        {/* Development warning banner */}
        <div className="mt-3 text-xs sm:text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 inline-flex items-start gap-2 text-left">
          <span>⚠️</span>
          <div>
            <div className="font-semibold">{t('programMode.devWarningTitle', 'Deneysel: Program Modu')}</div>
            <div>{t('programMode.devWarningDesc', 'Bu mod hâlâ geliştirilme aşamasındadır. Zaman zaman ünite geçişi/ilerleme beklediğiniz gibi çalışmayabilir. Lütfen hataları ve görüşlerinizi bizimle paylaşın.')}</div>
          </div>
        </div>
      </header>

      {/* TABS */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
  <TabButton tab="today" label={t('programMode.tabs.today', 'Bugün')} icon="🎯" />
  <TabButton tab="progress" label={t('programMode.tabs.progress', 'İlerleme')} icon="📊" />
  <TabButton tab="units" label={t('programMode.tabs.units', 'Üniteler')} icon="📚" />
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'today' && (
        <>
          {/* TODAY'S SESSION */}
          {todaySession.activities.length > 0 ? (
            <section className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 shadow-sm p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className={`text-lg font-bold ${SIMPLE_THEME_TEXT_PRIMARY}`}>
                  🎯 {t('programMode.todaySession', 'Bugünün Programı')}
                </h2>
                <div className="flex items-center gap-2">
                  {!isSessionFresh && (
                    <span className="text-xs px-2 py-1 rounded-full bg-orange-200 text-orange-800 font-semibold">
                      {t('programMode.alreadyDone', 'Bugün tamamlandı')}
                    </span>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full bg-emerald-200 text-emerald-800 font-semibold`}>
                    ~{todaySession.estimatedDuration} {t('programMode.minutesAbbrev', 'dk')}
                  </span>
                </div>
              </div>

              {/* Daily progression note: hide for premium users */}
              {!isPremium && profileId && (() => {
                const snap = getPolicyToday(profileId);
                const used = snap.advances || 0;
                if (used >= 3) {
                  return (
                    <div className="mb-3 text-xs text-amber-800 bg-amber-100 border border-amber-200 rounded-lg px-3 py-2">
                      {t('programMode.dailyLimitNote', "Daily unit advancement limit (3) reached. Let's continue with reinforcement today.")}
                    </div>
                  );
                }
                return (
                  <div className="mb-3 text-xs text-emerald-800 bg-emerald-100 border border-emerald-200 rounded-lg px-3 py-2">
                    {t('programMode.dailyLimitRemaining', 'Daily advancement: {used}/3').replace('{used}', String(used))}
                  </div>
                );
              })()}

              <div className="space-y-3">
                {/* Warmup */}
                {todaySession.activities.filter(a => a.sessionRole === 'warmup').length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-orange-600 mb-1">
                      🔥 {t('programMode.warmup', 'Isınma')}
                    </p>
                    <ul className="space-y-1 text-sm">
                      {todaySession.activities
                        .filter(a => a.sessionRole === 'warmup')
                        .map((activity, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-orange-500">•</span>
                            <span>{getActivityName(String(activity.activityId))}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* New Content */}
                {todaySession.activities.filter(a => a.sessionRole === 'new').length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-blue-600 mb-1">
                      📚 {t('programMode.newContent', 'Yeni İçerik')}
                    </p>
                    <ul className="space-y-1 text-sm">
                      {todaySession.activities
                        .filter(a => a.sessionRole === 'new')
                        .map((activity, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-blue-500">•</span>
                            <span>{getActivityName(String(activity.activityId))}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {/* Reinforcement (always render a block). If user manually selected activities for reinforcement,
                    show those instead of automatic candidates. */}
                <div>
                  <p className="text-xs font-bold text-purple-600 mb-1">
                    💪 {t('programMode.reinforcement', 'Pekiştirme')}
                  </p>
                  {
                    (() => {
                      const manualList = Array.from(manualReinforcement);
                      if (manualList.length > 0) {
                        return (
                          <div>
                            <div className="flex items-center justify-between">
                              <ul className="space-y-1 text-sm">
                                {manualList.map((aid, idx) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <span className="text-purple-500">•</span>
                                    <span>{getActivityName(String(aid))}</span>
                                  </li>
                                ))}
                              </ul>
                              <button type="button" onClick={clearManualReinforcement} className="ml-4 text-xs px-2 py-1 rounded-md bg-red-50 text-red-700 border border-red-100">
                                {t('programMode.clearManualReinforcement', 'Manuel Seçimleri Temizle')}
                              </button>
                            </div>
                          </div>
                        );
                      }

                      const autoReinf = todaySession.activities.filter(a => a.sessionRole === 'reinforcement');
                      if (autoReinf.length > 0) {
                        return (
                          <ul className="space-y-1 text-sm">
                            {autoReinf.map((activity, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <span className="text-purple-500">•</span>
                                <span>{getActivityName(String(activity.activityId))}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }

                      return (
                        <p className="text-[11px] text-purple-700 bg-purple-50 border border-purple-200 rounded-md px-2 py-1 inline-block">
                          {t('programMode.noReinforcementToday', 'Bugün pekiştirme yok (zayıf etkinlik bulunamadı).')}
                        </p>
                      );
                    })()
                  }
                </div>
              </div>
            </section>
          ) : (
            <section className="rounded-2xl bg-white/95 border border-emerald-100 shadow-sm p-8 text-center">
              <p className="text-2xl mb-2">🎉</p>
              <p className={`text-lg font-semibold ${SIMPLE_THEME_TEXT_PRIMARY}`}>
                {t('programMode.allComplete', 'Tebrikler!')}
              </p>
              <p className={`text-sm ${SIMPLE_THEME_TEXT_SECONDARY} mt-1`}>
                {t('programMode.allCompleteDesc', 'Tüm içerikler tamamlandı!')}
              </p>
            </section>
          )}

          {/* INFO FOR PARENTS */}
          <section className="rounded-2xl bg-white/95 border border-gray-100 shadow-sm p-4 sm:p-5">
            <h2 className={`text-sm font-bold mb-2 ${SIMPLE_THEME_TEXT_PRIMARY}`}>
              💡 {t('programMode.sessionRulesTitle', 'Oturum Kuralları')}
            </h2>
            <ul className={`list-disc pl-5 space-y-1 text-xs ${SIMPLE_THEME_TEXT_SECONDARY}`}>
              <li>
                <strong>{t('programMode.rules.count', 'Oturumdaki etkinlik sayısı:')}</strong> {todaySession.activities.length} {t('programMode.rules.activityWord', 'etkinlik')}
                ({todaySession.activities.filter(a => a.sessionRole === 'warmup').length} {t('programMode.rules.warmupWord', 'ısınma')}, {' '}
                {todaySession.activities.filter(a => a.sessionRole === 'new').length} {t('programMode.rules.newWord', 'yeni içerik')}, {' '}
                {todaySession.activities.filter(a => a.sessionRole === 'reinforcement').length} {t('programMode.rules.reinforcementWord', 'pekiştirme')})
              </li>
              <li>
                <strong>{t('programMode.rules.selection', 'Sıralama:')}</strong> {t('programMode.rules.selectionDesc', 'Isınma (geçmişten 1 rahat etkinlik) → Yeni içerik (odak ünite, önce hiç çözülmeyenler) → Pekiştirme (geçmişten en zayıf 0–2)')}
              </li>
              <li>
                <strong>{t('programMode.rules.coverageFirst', 'Kapsam önceliği:')}</strong> {t('programMode.rules.coverageFirstDesc', 'Odak ünitede henüz çözülmeyen içerik varsa Yeni İçerik +1 artar, Pekiştirme -1 azalır. Böylece önce tüm konulara en az 1 kez dokunuruz.')}
              </li>
              <li>
                <strong>{t('programMode.rules.failure', 'Başarı düşük olursa:')}</strong> {t('programMode.rules.failureDesc', 'Etkinlik tamamlanır, puan kaydedilir. Başarı yeterli değilse ilerleyen günlerde yeniden çalışılır.')}
              </li>
              <li>
                <strong>{t('programMode.rules.reinforcementCounts', 'Pekiştirme ve ilerleme:')}</strong> {t('programMode.rules.reinforcementCountsDesc', 'Pekiştirme oturumları artık program denemesi olarak sayılır; bu denemeler ünitenin ilerleme hesabına katkı sağlar. Pekiştirme adayları sıfır başarı gösteren etkinlikleri de içerebilir ve ebeveynler manuel olarak aday ekleyip çıkarabilir.')}
              </li>
              <li>
                <strong>{t('programMode.rules.reinforcementScope', 'Pekiştirme kapsamı:')}</strong> {t('programMode.rules.reinforcementScopeDesc', 'Pekiştirme normalde oturumun odak ünitelerindeki etkinliklerle sınırlıdır; başka ünitelerden manuel eklenen seçimler odak üniteyle uyuşmuyorsa dikkate alınmaz. (Manuel seçimleri temizlemek için "Manuel Seçimleri Temizle" düğmesini kullanın.)')}
              </li>
              <li>
                <strong>{t('programMode.rules.unlocking', 'Ünite açma şartı:')}</strong> {t('programMode.rules.unlockingDesc', 'Program sırası 1. üniteden başlayarak ilk tamamlanmamış üniteye göre belirlenir. Bir ünitenin tamamlanması için ünitedeki etkinliklerin en az %75i en az 1 kez çözülmüş olmalı ve son 6 program/pekiştirme denemesinin ortalaması ≥ %75 olmalıdır.')}
              </li>
              {!isPremium ? (
                <li>
                  <strong>{t('programMode.rules.daily', 'Günlük sınır:')}</strong> {t('programMode.rules.dailyDesc', 'Günde en fazla 3 ünite ilerleme (aşırı hızlanmayı önlemek için)')}
                </li>
              ) : (
                <li>
                  <strong>{t('programMode.rules.dailyPremium', 'Premium:')}</strong> {t('programMode.rules.dailyPremiumDesc', 'Günlük ilerleme sınırı yoktur; kilidi açılan üniteler serbestçe oynanır.')}
                </li>
              )}
              <li>
                <strong>{t('programMode.rules.progressDisplay', 'Görünen yüzde:')}</strong> {t('programMode.rules.progressDisplayDesc', 'Program Modu ekranindaki yuzdeler son 6 program denemesini baz alir; ebeveyn raporundaki genel yuzdeyle birebir ayni olmayabilir.')}
              </li>
              <li>
                <strong>{t('programMode.rules.joker', 'Joker:')}</strong> {t('programMode.rules.jokerDesc', 'Ebeveynler geçici olarak kilitli bir etkinliği açabilir; ustalık kuralları değişmez, sadece erişim sağlar.')}
              </li>
            </ul>
          </section>
        </>
      )}

      {activeTab === 'progress' && (
        <section className="rounded-2xl bg-white/95 border border-emerald-100 shadow-sm p-4 sm:p-6">
          <h2 className={`text-lg font-bold mb-4 ${SIMPLE_THEME_TEXT_PRIMARY}`}>
            📊 {t('programMode.unitProgress', 'Unit Progress')}
          </h2>
          <div className="space-y-3">
            {unitProgress.map((unit) => (
              <div key={unit.unitNumber} className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700">
                  {unit.unitNumber}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-semibold ${unit.isUnlocked ? SIMPLE_THEME_TEXT_PRIMARY : 'text-gray-400'}`}>
                      {getUnitName(unit.unitNumber, unit.unitName)}
                    </span>
                    {unit.isUnlocked ? (
                      <span className="text-xs text-emerald-600 font-medium">
                        {unit.displayPercentage === 100 ? (
                          <CheckCircleIcon className="h-4 w-4 inline text-emerald-600" />
                        ) : (
                            `%${unit.displayPercentage}`
                        )}
                      </span>
                    ) : (
                      <LockClosedIcon className="h-3 w-3 text-gray-400" />
                    )}
                  </div>
                  {renderProgressCircles(unit.displayPercentage)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'units' && (
        <section className="rounded-2xl bg-white/95 border border-emerald-100 shadow-sm p-4 sm:p-6">
          <h2 className={`text-lg font-bold mb-4 ${SIMPLE_THEME_TEXT_PRIMARY}`}>
            📚 {t('programMode.unitDetails', 'Unit Details')}
          </h2>
          <div className="space-y-4">
            {unitProgress.map((unit) => (
              <details 
                key={unit.unitNumber}
                className={`group rounded-lg border ${unit.isUnlocked ? 'border-emerald-200' : 'border-gray-200'} overflow-hidden`}
              >
                <summary className={`cursor-pointer px-4 py-3 ${unit.isUnlocked ? 'bg-emerald-50' : 'bg-gray-50'} hover:brightness-95 transition-all`}>
                  <div className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full ${unit.isUnlocked ? 'bg-emerald-200' : 'bg-gray-200'} flex items-center justify-center text-sm font-bold ${unit.isUnlocked ? 'text-emerald-800' : 'text-gray-500'}`}>
                      {unit.unitNumber}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-bold ${unit.isUnlocked ? SIMPLE_THEME_TEXT_PRIMARY : 'text-gray-400'}`}>
                          {getUnitName(unit.unitNumber, unit.unitName)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            {t('programMode.activityCountLabel', '{count} activities').replace('{count}', String(unit.activities.length))}
                          </span>
                          {!unit.isUnlocked && <LockClosedIcon className="h-3 w-3 text-gray-400" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </summary>
                <div className="p-4 bg-white border-t border-gray-100">
                    <ul className="space-y-2 text-sm">
                    {unit.activities.map((activityId, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        {/* per-activity program-mode success indicator */}
                        <ActivityProgramDot activityId={String(activityId)} />
                        <span className={unit.isUnlocked ? SIMPLE_THEME_TEXT_SECONDARY : 'text-gray-400'}>
                          {getActivityName(activityId as string)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {!unit.isUnlocked && (
                    <p className="mt-3 text-xs text-gray-500 italic">
                      🔒 {t('programMode.unlockHint', 'Unlocks when the previous unit reaches 75%')}
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      <div className="mt-2 flex items-center justify-between gap-3">
        <button type="button" onClick={onBack} className={SIMPLE_THEME_ACTION_BUTTON}>
          {t('app.back', 'Back')}
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onStartProgramMode}
            disabled={todaySession.activities.length === 0}
            className={`${SIMPLE_THEME_ACTION_BUTTON} !bg-emerald-600 !text-white border-emerald-500 hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {todaySession.activities.length === 0 
              ? t('programMode.noActivities', 'All activities completed!')
              : t('programMode.start', 'Start Program Mode')}
          </button>

          {/* Reinforcement Mode button - starts a session focused on reinforcement candidates only */}
          <button
            type="button"
            onClick={onStartReinforcementMode}
            disabled={(Array.from(manualReinforcement).length === 0) && (todaySession.activities.filter(a => a.sessionRole === 'reinforcement').length === 0)}
            className={`${SIMPLE_THEME_ACTION_BUTTON} !bg-violet-600 !text-white border-violet-500 hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {t('programMode.reinforcement', 'Pekiştirme')}
          </button>
        </div>
      </div>

    </SimpleThemeWrapper>
  );
};

export default React.memo(ProgramModeIntroScreen);
