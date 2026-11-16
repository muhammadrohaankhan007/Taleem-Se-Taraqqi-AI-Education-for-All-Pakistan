import React from 'react';
import type { UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import {
  HelpCircle,
  Star,
  LayoutDashboard,
} from 'lucide-react';

interface Props {
  activeProfile: UserProfile;
  onSwitchProfile: () => void;
  onToggleFacilitator: () => void;
  isFacilitatorView: boolean;
  onOpenLimits: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeProfile,
  onSwitchProfile,
  onToggleFacilitator,
  isFacilitatorView,
  onOpenLimits,
  onGoHome,
}) => {
  const { lang, setLang, isUrdu, isSindhi, t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Left: Brand & Home Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onGoHome}
            className="flex items-center gap-2.5 text-start group p-1 -m-1 rounded-2xl hover:bg-slate-100/80 active:scale-98 transition-all"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-800 to-emerald-600 flex items-center justify-center text-white text-2xl shadow-md ring-2 ring-emerald-500/20 group-hover:scale-105 transition-transform">
              🌱
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-black text-teal-950 leading-tight">
                  {t('appName')}
                </h1>
                <span className="inline-flex items-center gap-1 bg-emerald-100/80 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Offline</span>
                </span>
              </div>
              <p className="text-[10px] text-teal-700 font-semibold tracking-wide">
                {t('tagline')}
              </p>
            </div>
          </button>
        </div>

        {/* Center: Language Switcher Tabs */}
        <div className="flex items-center bg-slate-100/90 p-1 rounded-2xl border border-slate-200 shadow-inner">
          <button
            onClick={() => setLang('ur')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
              lang === 'ur'
                ? 'bg-gradient-to-r from-teal-800 to-teal-700 text-white shadow-sm ring-1 ring-teal-900/10'
                : 'text-slate-700 hover:text-teal-900 hover:bg-white/60'
            }`}
          >
            اردو
          </button>
          <button
            onClick={() => setLang('sd')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
              lang === 'sd'
                ? 'bg-gradient-to-r from-teal-800 to-teal-700 text-white shadow-sm ring-1 ring-teal-900/10'
                : 'text-slate-700 hover:text-teal-900 hover:bg-white/60'
            }`}
          >
            سنڌي
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 ${
              lang === 'en'
                ? 'bg-gradient-to-r from-teal-800 to-teal-700 text-white shadow-sm ring-1 ring-teal-900/10'
                : 'text-slate-700 hover:text-teal-900 hover:bg-white/60'
            }`}
          >
            English
          </button>
        </div>

        {/* Right: Profile, Facilitator, Info */}
        <div className="flex items-center gap-2">
          {/* Active Profile Pill */}
          <button
            onClick={onSwitchProfile}
            title={isSindhi ? 'فيملي پروفائل تبديل ڪريو' : isUrdu ? 'فیملی پروفائل تبدیل کریں' : 'Switch Household Profile'}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 text-slate-900 transition-all shadow-xs active:scale-98"
          >
            <span className="text-xl p-0.5 rounded-lg bg-slate-100">{activeProfile.avatar}</span>
            <div className="hidden md:flex flex-col text-start">
              <span className="text-xs font-black leading-tight truncate max-w-[110px] text-slate-900">
                {activeProfile.name}
              </span>
              <span className="text-[10px] font-semibold text-emerald-800">
                {isSindhi
                  ? activeProfile.roleSd
                  : isUrdu
                  ? activeProfile.roleUr
                  : activeProfile.role}
              </span>
            </div>
            {/* Stars pill */}
            <div className="flex items-center gap-1 bg-amber-100/90 text-amber-950 px-2 py-0.5 rounded-full text-xs font-black border border-amber-300/60 shadow-2xs">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{activeProfile.stars}</span>
            </div>
          </button>

          {/* Facilitator Dashboard Toggle */}
          <button
            onClick={onToggleFacilitator}
            className={`p-2.5 rounded-2xl border transition-all active:scale-95 ${
              isFacilitatorView
                ? 'bg-teal-700 text-white border-teal-800 shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
            }`}
            title="Facilitator / Community Dashboard"
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>

          {/* About / Prototype Limits Modal */}
          <button
            onClick={onOpenLimits}
            className="p-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all active:scale-95"
            title="What's Real vs. What's Simulated"
          >
            <HelpCircle className="w-4 h-4 text-emerald-700" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
