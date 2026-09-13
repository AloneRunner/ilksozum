import React from 'react';
import { t } from '../i18n/index.ts';

interface PrivacyConsentModalProps {
  onAccept: () => void;
  onViewPolicy: () => void;
}

const PrivacyConsentModal: React.FC<PrivacyConsentModalProps> = ({ onAccept, onViewPolicy }) => {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60">
      <div className="w-[92vw] max-w-xl bg-white rounded-2xl shadow-2xl p-5 sm:p-6 animate-pop-in">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3 text-center">
          {t('consent.title', 'Gizlilik Sözleşmesi')}
        </h2>
        <p className="text-slate-700 leading-relaxed text-sm sm:text-base mb-4 text-center">
          {t(
            'consent.body',
            "Uygulamayı kullanmaya devam etmek için Gizlilik Politikası'nı kabul etmeniz gerekir. Kişisel veriler toplamıyoruz; oyun ilerlemeniz ve ayarlarınız yalnızca cihazınızda saklanır. Uygulamamız ücretsiz ve reklamsızdır."
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button
            onClick={onViewPolicy}
            className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold"
          >
            {t('consent.viewPolicy', "Gizlilik Politikası'nı Oku")}
          </button>
          <button
            onClick={onAccept}
            className="px-5 py-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white font-bold"
            autoFocus
          >
            {t('consent.accept', 'Kabul Ediyorum')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyConsentModal;
