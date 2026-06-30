import React, { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  rewardDays: number;
  onClose: () => void;
}

const LoyaltyCelebrationModal: React.FC<Props> = ({ isOpen, rewardDays, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center px-4"
      style={{ background: 'rgba(15,23,42,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-w-md w-full rounded-3xl bg-gradient-to-br from-amber-50 via-white to-purple-50 border border-amber-200 shadow-[0_30px_80px_rgba(168,85,247,0.35)] p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center mb-3">
          <div className="text-6xl sm:text-7xl animate-bounce" role="img" aria-label="hediye">🎁</div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-800 leading-tight">
          Tebrikler!
        </h2>
        <p className="mt-2 text-base sm:text-lg font-bold text-amber-700">
          Sadakat Premium'u kazandınız ✨
        </p>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Çocuğunuz için uygulamayı düzenli kullandığınız için size teşekkür ediyoruz.
          <br />
          <b>{rewardDays} gün boyunca tüm Premium özellikler ücretsiz</b> sizin.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs sm:text-sm text-purple-700">
          <span className="px-3 py-1 rounded-full bg-purple-100 border border-purple-200">Tüm temalar</span>
          <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-200">Reklam yok</span>
          <span className="px-3 py-1 rounded-full bg-pink-100 border border-pink-200">Hızlı geçiş</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-bold bg-purple-600 hover:bg-purple-700 active:scale-95 text-white shadow-lg transition"
          style={{ touchAction: 'manipulation' }}
        >
          Harika, Teşekkürler! 💜
        </button>
        <p className="mt-3 text-[11px] text-slate-500">
          Düzenli kullandığınız sürece her ay yeniden kazanabilirsiniz.
        </p>
      </div>
    </div>
  );
};

export default LoyaltyCelebrationModal;
