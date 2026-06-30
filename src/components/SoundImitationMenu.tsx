import { t } from '../i18n/index.ts';
import { useAppContext } from '../contexts/AppContext.ts';
import { useRef, useState } from 'react';
import UnderwaterBackdrop from './ui/UnderwaterBackdrop.tsx';

interface Props {
  onSelectSadece: () => void;
  onSelectVideo: () => void;
  onBack: () => void;
}

export default function SoundImitationMenu({ onSelectSadece, onSelectVideo, onBack }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRef2 = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPlaying2, setIsPlaying2] = useState<boolean>(false);
  const [saksVersion, setSaksVersion] = useState<1 | 2>(1);
  const lyrics = `Hav hav dedi köpekçik
Pat pat koştu ayakçık
Şıp şıp damlar yağmurcuk

[Chorus]
Hav hav
Pat pat
Şıp şıp
Çat çat
Herkes seslere kat kat

[Verse 2]
Miyav dedi minik kedi
Vız vız uçtu arı peri
Tak tak çaldı kapı seni

[Chorus]
Hav hav
Pat pat
Şıp şıp
Çat çat
Herkes seslere kat kat

[Bridge]
Cik cik kuşlar uçar
Tık tık saat kaçar
Hop hop toplar zıplar

[Chorus]
Hav hav
Pat pat
Şıp şıp
Çat çat
Herkes seslere kat kat`;
  const lyrics2 = `[Verse]
Alkış, şak şak şak, eller havada,
Zıplamak, hop hop, bulutlar arada.
Asker yürür, rap rap, yolda sırada,
Gülüşler, ha ha, yayılsın her odada.

[Chorus]
Şak şak, hop hop, herkes katılsın,
Rap rap, ha ha, neşe saçsın!
Şak şak, hop hop, ritim tutulsun,
Rap rap, ha ha, gülüş unutulsun!

[Verse 2]
Kediler miyav, kuşlar cıv cıv,
Doğa şarkı söyler, hepimiz canlı.
Köpekler hav hav, neşeli bir kervan,
Seslerle dolu bu dünya, ne harika bir an!

[Chorus]
Şak şak, hop hop, herkes katılsın,
Rap rap, ha ha, neşe saçsın!
Şak şak, hop hop, ritim tutulsun,
Rap rap, ha ha, gülüş unutulsun!

[Bridge]
Birlikte gülelim, ha ha, çok güzel,
Şarkılarla dolsun günler, her özel.
Şak şak, hop hop, kalpler pır pır,
Seslerle dans eder dünya, ne şık bir sır!

[Outro]
Alkış, şak şak, sesler yankılansın,
Zıplamak, hop hop, göklere ulaşsın.
Rap rap, ha ha, çocuklar gülsün,
Bu şarkıyla herkes neşeyle dolsun!`;
  const { settings } = useAppContext();
  const isUnderwater = settings.theme === 'deneme';
  const isCosmic = settings.theme === 'deneme2';

  if (isCosmic) {
    // Robot Theme: Tech Interface
    return (
      <div className="relative h-full flex flex-col overflow-hidden bg-slate-900 font-mono">
        {/* Tech Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900/80 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 bg-slate-800/50 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all">
              <span className="text-xl">←</span>
            </button>
            <h2 className="text-xl font-bold text-cyan-100 tracking-wider uppercase">
              {t('menu.soundImitation.title', 'Sound Imitation')}
            </h2>
          </div>
          <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 overflow-y-auto p-4 content-center">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Main Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button onClick={onSelectSadece} className="group relative p-6 rounded-xl border border-cyan-500/30 bg-slate-800/60 hover:bg-slate-800/90 hover:border-cyan-400 transition-all text-left overflow-hidden">
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-500/50 group-hover:border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-500/50 group-hover:border-cyan-400" />

                <div className="relative z-10">
                  <div className="text-lg font-bold text-cyan-100 mb-2 group-hover:text-cyan-300 transition-colors uppercase tracking-tight">
                    {t('menu.soundImitation.imagesTitle', 'Image Cards')}
                  </div>
                  <div className="text-xs text-cyan-400/70 leading-relaxed max-w-[90%]">
                    {t('menu.soundImitation.imagesDesc', 'View image cards; tap to enlarge.')}
                  </div>
                </div>
                <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button onClick={onSelectVideo} className="group relative p-6 rounded-xl border border-teal-500/30 bg-slate-800/60 hover:bg-slate-800/90 hover:border-teal-400 transition-all text-left overflow-hidden">
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-teal-500/50 group-hover:border-teal-400" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-teal-500/50 group-hover:border-teal-400" />

                <div className="relative z-10">
                  <div className="text-lg font-bold text-teal-100 mb-2 group-hover:text-teal-300 transition-colors uppercase tracking-tight flex items-center gap-2">
                    {t('menu.soundImitation.videosTitleShort', 'Short Videos')}
                    <span className="text-[10px] bg-teal-500/20 px-1.5 py-0.5 rounded text-teal-300 border border-teal-500/30">BETA</span>
                  </div>
                  <div className="text-xs text-teal-400/70 leading-relaxed max-w-[90%]">
                    {t('menu.soundImitation.videosDesc', 'Experimental video section.')}
                  </div>
                </div>
                <div className="absolute inset-0 bg-teal-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>

            {/* Music Player Section */}
            <div className="border border-cyan-500/20 rounded-xl bg-slate-800/40 p-5 mt-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              <h3 className="text-sm font-bold text-cyan-500/80 mb-4 uppercase tracking-wider">{t('menu.soundImitation.experimentalMusic', 'Experimental Music')}</h3>

              <div className="space-y-4">
                {/* Song 1 */}
                <div className="bg-slate-900/60 border border-cyan-500/10 rounded-lg p-3 flex items-center justify-between">
                  <span className="text-cyan-100 font-bold text-sm tracking-wide">Hav Hav — Pat Pat</span>
                  <button
                    onClick={() => {
                      const a = audioRef.current;
                      if (!a) return;
                      if (a.paused) { a.play(); setIsPlaying(true); } else { a.pause(); setIsPlaying(false); }
                    }}
                    className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all border ${isPlaying ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50' : 'bg-slate-700 hover:bg-slate-600 text-slate-300 border-transparent'}`}
                  >
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </button>
                </div>
                <audio ref={audioRef} src="/muzik/havhavpatpat.mp3" onEnded={() => setIsPlaying(false)} preload="metadata" />

                {/* Song 2 */}
                <div className="bg-slate-900/60 border border-cyan-500/10 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-rose-300 font-bold text-sm tracking-wide">Şak Şak Hop Hop</span>
                    <div className="flex gap-1">
                      <button onClick={() => { if (saksVersion !== 1) { const a = audioRef2.current; if (a && !a.paused) { a.pause(); setIsPlaying2(false); } setSaksVersion(1); } }} className={`text-[10px] px-1.5 rounded border ${saksVersion === 1 ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' : 'text-slate-500 border-slate-700'}`}>V1</button>
                      <button onClick={() => { if (saksVersion !== 2) { const a = audioRef2.current; if (a && !a.paused) { a.pause(); setIsPlaying2(false); } setSaksVersion(2); } }} className={`text-[10px] px-1.5 rounded border ${saksVersion === 2 ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' : 'text-slate-500 border-slate-700'}`}>V2</button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const a1 = audioRef.current;
                      const a2 = audioRef2.current;
                      if (!a2) return;
                      if (a1 && !a1.paused) { a1.pause(); setIsPlaying(false); }
                      if (a2.paused) { a2.play(); setIsPlaying2(true); } else { a2.pause(); setIsPlaying2(false); }
                    }}
                    className={`px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all border ${isPlaying2 ? 'bg-rose-500/20 text-rose-300 border-rose-500/50' : 'bg-slate-700 hover:bg-slate-600 text-slate-300 border-transparent'}`}
                  >
                    {isPlaying2 ? 'PAUSE' : 'PLAY'}
                  </button>
                </div>
                <audio ref={audioRef2} src={`/muzik/saksakhophop${saksVersion === 2 ? '2' : ''}.mp3`} onEnded={() => setIsPlaying2(false)} preload="metadata" />
              </div>

              <div className="mt-4 pt-4 border-t border-cyan-500/20">
                <details className="group">
                  <summary className="text-xs text-cyan-500/70 cursor-pointer list-none flex items-center gap-2 uppercase tracking-wide group-open:text-cyan-400 transition-colors">
                    <span className="group-open:rotate-90 transition-transform">▶</span> Show Lyrics
                  </summary>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] text-slate-400 font-mono">
                    <div>
                      <div className="text-cyan-300 mb-1">-- HAV HAV --</div>
                      <pre className="whitespace-pre-wrap">{lyrics}</pre>
                    </div>
                    <div>
                      <div className="text-rose-300 mb-1">-- SAK SAK --</div>
                      <pre className="whitespace-pre-wrap">{lyrics2}</pre>
                    </div>
                  </div>
                </details>
              </div>
            </div>

            {/* Experimental Note */}
            <div className="p-4 border border-yellow-500/20 bg-yellow-500/5 rounded-lg">
              <h4 className="text-yellow-500 text-xs font-bold uppercase mb-1">System Notice</h4>
              <p className="text-yellow-200/60 text-[10px] leading-relaxed">
                {t('menu.soundImitation.experimentalNote', 'Experimental features active.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 relative min-h-screen flex flex-col items-center justify-start">
      {isUnderwater && <UnderwaterBackdrop count={10} />}
      <div className="flex items-center justify-between mb-6 w-full max-w-2xl">
        <h2 className={`text-3xl font-extrabold tracking-tight drop-shadow-md ${isUnderwater ? 'text-cyan-200' : 'text-slate-800'}`}>
          {t('menu.soundImitation.title', 'Sound Imitation Cards')}
        </h2>
        <button onClick={onBack} className={`text-base font-semibold px-4 py-1.5 rounded-lg shadow transition ${isUnderwater ? 'text-cyan-100 bg-cyan-700/60 hover:bg-cyan-700/90' : 'text-slate-700 bg-slate-200/80 hover:bg-slate-300/90'}`}>
          {t('common.back', 'Back')}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <button onClick={onSelectSadece} className={`rounded-2xl p-6 flex flex-col items-start gap-2 shadow-lg border-2 ${isUnderwater ? 'bg-gradient-to-b from-[#0a2a3d]/80 to-[#001219]/90 border-cyan-300/20 hover:from-cyan-900/80 hover:to-[#001219]/95' : 'bg-white/90 hover:bg-slate-100 border-slate-200/40'}`}>
          <div className={`text-xl font-bold drop-shadow-sm ${isUnderwater ? 'text-cyan-100' : 'text-slate-800'}`}>{t('menu.soundImitation.imagesTitle', 'Image Cards')}</div>
          <div className={`text-base font-medium ${isUnderwater ? 'text-cyan-200/90' : 'text-slate-600'}`}>{t('menu.soundImitation.imagesDesc', 'View image cards; tap to enlarge and swipe through.')}</div>
        </button>

        <button onClick={onSelectVideo} className={`rounded-2xl p-6 flex flex-col items-start gap-2 shadow-lg border-2 ${isUnderwater ? 'bg-gradient-to-b from-[#0a2a3d]/80 to-[#001219]/90 border-cyan-300/20 hover:from-cyan-900/80 hover:to-[#001219]/95' : 'bg-white/90 hover:bg-slate-100 border-slate-200/40'}`}>
          <div className={`text-xl font-bold drop-shadow-sm ${isUnderwater ? 'text-cyan-100' : 'text-slate-800'}`}>{t('menu.soundImitation.videosTitleShort', 'Short Videos (Experimental)')}</div>
          <div className={`text-base font-medium ${isUnderwater ? 'text-cyan-200/90' : 'text-slate-600'}`}>{t('menu.soundImitation.videosDesc', 'Short videos — experimental. Videos may take space.')}</div>
        </button>
      </div>

      <div className="w-full max-w-2xl px-0 py-8">
        <h3 className={`text-2xl font-bold mb-4 ${isUnderwater ? 'text-cyan-100 drop-shadow' : 'text-slate-800'}`}>{t('menu.soundImitation.experimentalMusic', 'Experimental Music')}</h3>
        <div className="rounded-2xl shadow bg-white/90 p-5 flex flex-col gap-3 border border-cyan-100/30">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-lg text-cyan-900">Hav Hav — Pat Pat</div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const a = audioRef.current;
                  if (!a) return;
                  if (a.paused) { a.play(); setIsPlaying(true); } else { a.pause(); setIsPlaying(false); }
                }}
                className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow transition"
              >
                {isPlaying ? t('common.pause', 'Pause') : t('common.play', 'Play')}
              </button>
            </div>
          </div>

          <audio
            ref={audioRef}
            src="/muzik/havhavpatpat.mp3"
            onEnded={() => setIsPlaying(false)}
            preload="metadata"
          />

          <details className="bg-slate-50 p-3 rounded-lg mt-2">
            <summary className="font-medium cursor-pointer">{t('menu.soundImitation.lyrics', 'Lyrics')}</summary>
            <pre className="whitespace-pre-wrap mt-2 text-sm text-slate-800">{lyrics}</pre>
          </details>
        </div>

        {/* Separate box for second experimental song (Şak Şak Hop Hop) */}
        <div className="mt-4 rounded-2xl shadow bg-white/90 p-5 flex flex-col gap-3 border border-cyan-100/30">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <div className="font-bold text-lg text-rose-800">Şak Şak Hop Hop</div>
              {/* Minimal version selector immediately under the title */}
              <div className="mt-1 flex items-center gap-2 text-xs">
                <button
                  onClick={() => {
                    if (saksVersion !== 1) {
                      const a = audioRef2.current;
                      if (a && !a.paused) { a.pause(); setIsPlaying2(false); }
                      setSaksVersion(1);
                    }
                  }}
                  aria-pressed={saksVersion === 1}
                  className={`px-2 py-0.5 rounded-md border text-rose-700 ${saksVersion === 1 ? 'bg-rose-100 border-rose-200' : 'bg-transparent border-transparent hover:border-rose-100'}`}
                >
                  V1
                </button>
                <button
                  onClick={() => {
                    if (saksVersion !== 2) {
                      const a = audioRef2.current;
                      if (a && !a.paused) { a.pause(); setIsPlaying2(false); }
                      setSaksVersion(2);
                    }
                  }}
                  aria-pressed={saksVersion === 2}
                  className={`px-2 py-0.5 rounded-md border text-rose-700 ${saksVersion === 2 ? 'bg-rose-100 border-rose-200' : 'bg-transparent border-transparent hover:border-rose-100'}`}
                >
                  V2
                </button>
              </div>
            </div>

            <div>
              <button
                onClick={() => {
                  const a1 = audioRef.current;
                  const a2 = audioRef2.current;
                  if (!a2) return;
                  if (a1 && !a1.paused) { a1.pause(); setIsPlaying(false); }
                  if (a2.paused) { a2.play(); setIsPlaying2(true); } else { a2.pause(); setIsPlaying2(false); }
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-md shadow-sm transition text-sm"
              >
                {isPlaying2 ? t('common.pause', 'Pause') : t('common.play', 'Play')}
              </button>
            </div>
          </div>

          <audio ref={audioRef2} src={`/muzik/saksakhophop${saksVersion === 2 ? '2' : ''}.mp3`} onEnded={() => setIsPlaying2(false)} preload="metadata" />

          <details className="bg-transparent p-2 mt-1 rounded">
            <summary className="font-medium cursor-pointer">{t('menu.soundImitation.lyrics', 'Lyrics')} (Şak Şak Hop Hop)</summary>
            <pre className="whitespace-pre-wrap mt-2 text-sm text-slate-800">{lyrics2}</pre>
          </details>
        </div>
      </div>

      <div className={`mt-8 p-5 rounded-2xl text-base w-full max-w-2xl shadow-lg border ${isUnderwater ? 'bg-gradient-to-r from-cyan-900/30 via-[#022337]/30 to-teal-900/30 text-cyan-100 border-cyan-300/10' : 'bg-gradient-to-r from-pink-50 via-white to-amber-50 text-slate-700 border-slate-200/30'}`}>
        <div className="font-semibold mb-2">{t('menu.soundImitation.experimentalNoteTitle', 'Experimental Note')}</div>
        <div className="mb-2">{t('menu.soundImitation.experimentalNote', 'The video section is experimental and may not be permanent. Videos can be large and may take space on your device; we will shape this section based on your feedback.')}</div>
        <div className="font-semibold">{t('menu.soundImitation.feedbackRequest', 'Please leave feedback (good or bad) in the app store reviews.')}</div>
      </div>
    </div>
  );
}
