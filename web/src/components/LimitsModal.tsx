import React from 'react';
import { X, CheckCircle2, AlertTriangle, ShieldCheck, Layers } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { TranslationKey } from '../data/translations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MODULES: { emoji: string; key: TranslationKey }[] = [
  { emoji: '📖', key: 'modules.literacy.title' },
  { emoji: '🔢', key: 'modules.math.title' },
  { emoji: '⚡', key: 'modules.physics.title' },
  { emoji: '🧪', key: 'modules.chemistry.title' },
  { emoji: '🌾', key: 'modules.agriculture.title' },
  { emoji: '🏥', key: 'modules.health.title' },
];

const REAL_ITEMS: { title: TranslationKey; body: TranslationKey }[] = [
  { title: 'limits.realFontsTitle', body: 'limits.realFontsBody' },
  { title: 'limits.realRtlTitle', body: 'limits.realRtlBody' },
  { title: 'limits.realStorageTitle', body: 'limits.realStorageBody' },
  { title: 'limits.realTracingTitle', body: 'limits.realTracingBody' },
  { title: 'limits.realMathTitle', body: 'limits.realMathBody' },
  { title: 'limits.realSafetyTitle', body: 'limits.realSafetyBody' },
];

const SIMULATED_ITEMS: { title: TranslationKey; body: TranslationKey }[] = [
  { title: 'limits.simVoiceTitle', body: 'limits.simVoiceBody' },
  { title: 'limits.simCallTitle', body: 'limits.simCallBody' },
  { title: 'limits.simDashboardTitle', body: 'limits.simDashboardBody' },
  { title: 'limits.simNotesTitle', body: 'limits.simNotesBody' },
  { title: 'limits.simContentTitle', body: 'limits.simContentBody' },
];

export const LimitsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t, isUrdu, isSindhi } = useLanguage();

  if (!isOpen) return null;

  const textFont = isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : '';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label={t('limits.title')}
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-emerald-900 text-white p-5 flex items-center justify-between border-b border-teal-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-teal-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className={`text-lg font-black ${textFont}`}>{t('limits.title')}</h2>
              <p className="text-xs text-teal-200 font-medium">{t('limits.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={t('limits.close')}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className={`p-6 overflow-y-auto space-y-6 text-sm ${textFont}`}>
          {/* Module Coverage Overview */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <h3 className="text-slate-900 font-black text-xs flex items-center gap-2">
              <Layers className="w-4 h-4 text-teal-700" />
              <span>{t('limits.coverageTitle')}</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-bold text-slate-700 pt-1">
              {MODULES.map((m, i) => (
                <div
                  key={m.key}
                  className="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-1.5"
                >
                  <span>{m.emoji}</span>
                  <span>
                    {i + 1}. {t(m.key)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* REAL Section */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
            <h3 className="text-emerald-950 font-black text-sm flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>{t('limits.realTitle')}</span>
            </h3>
            <ul className="space-y-2 text-emerald-950 text-xs sm:text-sm">
              {REAL_ITEMS.map((item) => (
                <li key={item.title} className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>
                    <strong>{t(item.title)}:</strong> {t(item.body)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* SIMULATED / DEMO Section */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <h3 className="text-amber-950 font-black text-sm flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
              <span>{t('limits.simulatedTitle')}</span>
            </h3>
            <ul className="space-y-2 text-amber-950 text-xs sm:text-sm">
              {SIMULATED_ITEMS.map((item) => (
                <li key={item.title} className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">•</span>
                  <span>
                    <strong>{t(item.title)}:</strong> {t(item.body)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-bold text-sm transition-all shadow-md active:scale-95 ${textFont}`}
          >
            {t('limits.close')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LimitsModal;
