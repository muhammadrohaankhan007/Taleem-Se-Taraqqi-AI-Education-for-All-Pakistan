import React from 'react';
import type { Language } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { tts } from '../services/tts';
import { SpeechNoticeBadge } from '../components/SpeechNoticeBadge';
import { Volume2, ArrowRight, BookOpen, Sparkles, Check, Play } from 'lucide-react';

interface Props {
  onProceed: () => void;
}

export const WelcomeLanguageScreen: React.FC<Props> = ({ onProceed }) => {
  const { lang, setLang, isUrdu, isSindhi, t } = useLanguage();

  const playWelcomeSpeech = (langToSpeak: Language) => {
    let text = '';
    if (langToSpeak === 'sd') {
      text = 'ڀلي ڪري آيا! تعليم سي ترقي ۾ پنهنجي پسند جي ٻولي چونڊيو ۽ سکڻ شروع ڪريو.';
    } else if (langToSpeak === 'ur') {
      text = 'خوش آمدید! تعلیم سے ترقی میں اپنی پسند کی زبان منتخب کریں اور سیکھنا شروع کریں۔';
    } else {
      text = 'Welcome to Taleem Se Taraqqi! Choose your preferred language and start learning.';
    }
    tts.speak(text, langToSpeak);
  };

  const handleLanguageClick = (selectedLang: Language) => {
    setLang(selectedLang);
    playWelcomeSpeech(selectedLang);
  };

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center p-4 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Top Banner Notice */}
      <div className="w-full mb-4">
        <SpeechNoticeBadge language={lang} />
      </div>

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
          <span>{lang === 'en' ? 'Education for All — Pakistan' : 'تعلیم برائے ہمہ — پاکستان'}</span>
        </div>
        <p
          className={`text-teal-900 font-bold text-base sm:text-lg mb-8 max-w-xl leading-relaxed ${
            isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
          }`}
        >
          {t('welcomePrompt')}
        </p>

        {/* 3 Big Tactile Picture Language Choice Cards (>= 72px Target) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-8">
          {/* Urdu Card */}
          <button
            onClick={() => handleLanguageClick('ur')}
            className={`min-h-[110px] p-5 rounded-3xl border-2 flex items-center justify-between text-start transition-all active:scale-[0.98] ${
              lang === 'ur'
                ? 'border-teal-700 bg-gradient-to-b from-teal-50/90 to-white ring-4 ring-teal-600/25 shadow-xl scale-[1.02]'
                : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50/80 shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="text-4xl filter drop-shadow-xs">🇵🇰</span>
              <div>
                <span className="text-2xl font-black font-urdu block text-slate-900 leading-tight">
                  اردو
                </span>
                <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                  قومی زبان • آسان سبق
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playWelcomeSpeech('ur');
                }}
                className="p-2 rounded-xl bg-teal-100/70 hover:bg-teal-200 text-teal-900 transition-colors shadow-2xs"
                title="آواز سنیں"
              >
                <Volume2 className="w-4 h-4 text-teal-800" />
              </button>
              {lang === 'ur' && (
                <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}
            </div>
          </button>

          {/* Sindhi Card */}
          <button
            onClick={() => handleLanguageClick('sd')}
            className={`min-h-[110px] p-5 rounded-3xl border-2 flex items-center justify-between text-start transition-all active:scale-[0.98] ${
              lang === 'sd'
                ? 'border-teal-700 bg-gradient-to-b from-teal-50/90 to-white ring-4 ring-teal-600/25 shadow-xl scale-[1.02]'
                : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50/80 shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="text-4xl filter drop-shadow-xs">🌾</span>
              <div>
                <span className="text-2xl font-black font-sindhi block text-slate-900 leading-tight">
                  سنڌي
                </span>
                <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                  علائقائي ٻولي • آسان سکيا
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playWelcomeSpeech('sd');
                }}
                className="p-2 rounded-xl bg-teal-100/70 hover:bg-teal-200 text-teal-900 transition-colors shadow-2xs"
                title="آواز ٻڌو"
              >
                <Volume2 className="w-4 h-4 text-teal-800" />
              </button>
              {lang === 'sd' && (
                <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}
            </div>
          </button>

          {/* English Card */}
          <button
            onClick={() => handleLanguageClick('en')}
            className={`min-h-[110px] p-5 rounded-3xl border-2 flex items-center justify-between text-start transition-all active:scale-[0.98] ${
              lang === 'en'
                ? 'border-teal-700 bg-gradient-to-b from-teal-50/90 to-white ring-4 ring-teal-600/25 shadow-xl scale-[1.02]'
                : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50/80 shadow-md'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <span className="text-4xl filter drop-shadow-xs">🌍</span>
              <div>
                <span className="text-xl font-black block text-slate-900 leading-tight">
                  English
                </span>
                <span className="text-xs font-semibold text-slate-500 block mt-0.5">
                  Global / Practical STEM
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  playWelcomeSpeech('en');
                }}
                className="p-2 rounded-xl bg-teal-100/70 hover:bg-teal-200 text-teal-900 transition-colors shadow-2xs"
                title="Listen voice"
              >
                <Volume2 className="w-4 h-4 text-teal-800" />
              </button>
              {lang === 'en' && (
                <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}
            </div>
          </button>
        </div>

        {/* Primary Start Action (>= 64px Target) */}
        <button
          onClick={onProceed}
          className="w-full max-w-md min-h-[66px] bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-700 hover:from-teal-900 hover:to-emerald-800 active:scale-[0.98] text-white rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 shadow-xl shadow-teal-950/20 transition-all border border-teal-600/30"
        >
          <BookOpen className="w-6 h-6" />
          <span>{t('startLearning')}</span>
          <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
        </button>

        {/* Audio prompt button */}
        <button
          onClick={() => playWelcomeSpeech(lang)}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 hover:bg-teal-100 text-xs text-teal-900 font-bold transition-colors border border-teal-200/60"
        >
          <Play className="w-3.5 h-3.5 fill-teal-800 text-teal-800" />
          <span>
            {isSindhi ? 'ڀليڪار جو آواز ٻيهر ٻڌو' : isUrdu ? 'خوش آمدید کا آڈیو دوبارہ سنیں' : 'Replay Welcome Audio'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default WelcomeLanguageScreen;
