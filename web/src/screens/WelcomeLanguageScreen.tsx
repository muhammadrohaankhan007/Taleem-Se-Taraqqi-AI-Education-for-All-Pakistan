import React from 'react';
import type { Language } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { tts } from '../services/tts';
import { Volume2, ArrowRight, BookOpen, Sparkles, Check, Play } from 'lucide-react';

interface Props {
  onProceed: () => void;
}

interface LanguageCard {
  code: Language;
  emoji: string;
  nameClass: string;
}

// Same order as the navbar pills: English | Sindhi | Urdu.
const LANGUAGE_CARDS: LanguageCard[] = [
  { code: 'en', emoji: '🌍', nameClass: 'font-sans text-xl' },
  { code: 'sd', emoji: '🌾', nameClass: 'font-sindhi text-2xl' },
  { code: 'ur', emoji: '🇵🇰', nameClass: 'font-urdu text-2xl' },
];

export const WelcomeLanguageScreen: React.FC<Props> = ({ onProceed }) => {
  const { lang, setLang, isUrdu, isSindhi, t } = useLanguage();

  /** Speech must never break a click: tts.speak is already safe, the try/catch is belt and braces. */
  const speakSafely = (text: string, forLang: Language) => {
    try {
      tts.speak(text, forLang);
    } catch {
      // No voice / blocked audio: the UI already shows a text-mode notice.
    }
  };

  const handleLanguageClick = (selected: Language) => {
    setLang(selected); // 1. global state + localStorage + <html dir/lang> + fonts
    speakSafely(t('langSelectedSpeech', selected), selected); // 2. localised confirmation
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 max-w-4xl mx-auto animate-in fade-in duration-200">
      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200/80 flex flex-col items-center text-center relative overflow-hidden">
        {/* Soft Decorative Ambient Background Glows */}
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        {/* Hero Visual Badge */}
        <div className="relative mb-6">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-teal-900 via-teal-800 to-emerald-600 flex items-center justify-center text-5xl sm:text-6xl shadow-xl ring-4 ring-emerald-500/20">
            🌱
          </div>
          <div className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-amber-400 to-amber-300 text-amber-950 p-2.5 rounded-2xl shadow-lg ring-2 ring-white">
            <Sparkles className="w-5 h-5 fill-amber-950" />
          </div>
        </div>

        {/* Welcome Titles */}
        <h1
          className={`text-2xl sm:text-4xl font-black text-slate-900 mb-2 leading-tight ${
            isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
          }`}
        >
          {t('appName')}
        </h1>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold mb-3">
          <span>{t('heroBadge')}</span>
        </div>
        <p
          className={`text-teal-900 font-bold text-base sm:text-lg mb-8 max-w-xl leading-relaxed ${
            isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
          }`}
        >
          {t('welcomePrompt')}
        </p>

        {/* 3 big tactile language cards. Each card shows its OWN language, whatever is active. */}
        <div
          role="radiogroup"
          aria-label={t('chooseLanguage')}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-8"
        >
          {LANGUAGE_CARDS.map(({ code, emoji, nameClass }) => {
            const selected = lang === code;
            return (
              <div key={code} className="relative" dir={code === 'en' ? 'ltr' : 'rtl'}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  lang={code}
                  onClick={() => handleLanguageClick(code)}
                  className={`w-full min-h-[110px] p-5 pe-16 rounded-3xl border-2 flex items-center text-start transition-all active:scale-[0.98] ${
                    selected
                      ? 'border-teal-700 bg-gradient-to-b from-teal-50/90 to-white ring-4 ring-teal-600/25 shadow-xl scale-[1.02]'
                      : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50/80 shadow-md'
                  }`}
                >
                  <span className="flex items-center gap-3.5">
                    <span className="text-4xl filter drop-shadow-xs">{emoji}</span>
                    <span>
                      <span className={`${nameClass} font-black block text-slate-900 leading-tight`}>
                        {t('langNameNative', code)}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                        {t('langCardSub', code)}
                      </span>
                    </span>
                  </span>
                </button>

                {/* Selected badge (checkmark) */}
                {selected && (
                  <span
                    className="absolute -top-2 -end-2 w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-md ring-2 ring-white"
                    title={t('langSelectedBadge', code)}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </span>
                )}

                {/* Listen button sits beside, not inside, the card button (no nested buttons). */}
                <button
                  type="button"
                  onClick={() => speakSafely(t('welcomeSpeech', code), code)}
                  className="absolute top-1/2 -translate-y-1/2 end-3 p-2 rounded-xl bg-teal-100/70 hover:bg-teal-200 text-teal-900 transition-colors shadow-2xs"
                  title={t('listenAudio', code)}
                  aria-label={t('listenAudio', code)}
                >
                  <Volume2 className="w-4 h-4 text-teal-800" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Primary Start Action */}
        <button
          onClick={onProceed}
          className="w-full max-w-md min-h-[66px] bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-700 hover:from-teal-900 hover:to-emerald-800 active:scale-[0.98] text-white rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-xl shadow-teal-950/20 transition-all border border-teal-600/30"
        >
          <BookOpen className="w-6 h-6" />
          <span>{t('startLearning')}</span>
          <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
        </button>

        {/* Replay welcome in the active language */}
        <button
          onClick={() => speakSafely(t('welcomeSpeech'), lang)}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 hover:bg-teal-100 text-xs text-teal-900 font-bold transition-colors border border-teal-200/60"
        >
          <Play className="w-3.5 h-3.5 fill-teal-800 text-teal-800" />
          <span>{t('replayWelcome')}</span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeLanguageScreen;
