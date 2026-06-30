import React from 'react';
import { APP_SHOWCASE, WEB_VERSION_URL, getPlatformLink } from '../appShowcase.ts';

interface OtherAppsSectionProps {
  theme: string;
}

const OtherAppsSection: React.FC<OtherAppsSectionProps> = ({ theme }) => {
  const isCosmic = theme === 'deneme2';
  const isDark = theme === 'koyu' || theme === 'dark';
  const isSimple = theme === 'simple';

  if (isCosmic || isDark) {
    return (
      <div className="space-y-3 mb-4">
        <a
          href={WEB_VERSION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-700/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 no-underline"
        >
          <span className="text-base">🌐</span>
          <span className="text-xs text-cyan-300 leading-snug">
            Web versiyonuna <strong className="text-cyan-100">ilksozumotizm.netlify.app</strong> adresinden de ulaşabilirsiniz
          </span>
        </a>

        <div>
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider mb-2">Diğer Uygulamalarımız</p>
          <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {APP_SHOWCASE.map((app) => (
              <a
                key={app.id}
                href={getPlatformLink(app)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 flex flex-col items-center gap-1.5 w-[72px] p-2.5 rounded-xl bg-slate-800 border border-slate-600/50 hover:border-cyan-500/40 hover:-translate-y-0.5 transition-all duration-200 no-underline"
              >
                {app.logoUrl ? (
                  <img src={app.logoUrl} alt={app.name} className="w-10 h-10 rounded-xl object-contain bg-white shadow-sm" />
                ) : (
                  <span className="text-2xl">{app.emoji}</span>
                )}
                <span className="text-[9px] text-slate-300 font-semibold text-center leading-tight">{app.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const webBannerClass = isSimple
    ? 'bg-purple-50 border-purple-200 hover:border-purple-400 text-purple-800'
    : 'bg-blue-50 border-blue-200 hover:border-blue-400 text-blue-800';
  const titleClass = isSimple ? 'text-purple-600' : 'text-indigo-600';
  const cardBg = isSimple
    ? 'bg-white border-purple-200 hover:border-purple-400 text-purple-900'
    : 'bg-white border-indigo-100 hover:border-indigo-300 text-indigo-900';

  return (
    <div className="space-y-3 mb-4">
      <a
        href={WEB_VERSION_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 ${webBannerClass} transition-all duration-300 shadow-sm hover:shadow-md no-underline`}
      >
        <span className="text-xl flex-shrink-0">🌐</span>
        <span className="text-sm leading-snug">
          Web versiyonuna <strong>ilksozumotizm.netlify.app</strong> adresinden de ulaşabilirsiniz
        </span>
      </a>

      <div>
        <p className={`text-[10px] ${titleClass} uppercase tracking-wider font-bold mb-2 text-center`}>Diğer Uygulamalarımız</p>
        <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {APP_SHOWCASE.map((app) => (
            <a
              key={app.id}
              href={getPlatformLink(app)}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-shrink-0 flex flex-col items-center gap-1.5 w-[72px] p-2.5 rounded-2xl border-2 ${cardBg} shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 no-underline`}
            >
              {app.logoUrl ? (
                <img src={app.logoUrl} alt={app.name} className="w-10 h-10 rounded-xl object-contain shadow-sm" />
              ) : (
                <span className="text-2xl">{app.emoji}</span>
              )}
              <span className="text-[9px] font-semibold text-center leading-tight">{app.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherAppsSection;
