import React, { useState } from 'react';
import type { UserProfile, Subject } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { tts } from '../services/tts';
import { LiteracyModule } from '../components/learning/LiteracyModule';
import { MathModule } from '../components/learning/MathModule';
import { PhysicsModule } from '../components/learning/PhysicsModule';
import { ChemistryModule } from '../components/learning/ChemistryModule';
import { FarmingLivestockModule } from '../components/learning/FarmingLivestockModule';
import { HealthSafetyModule } from '../components/learning/HealthSafetyModule';
import {
  Sparkles,
  ArrowRight,
  Star,
  BookOpen,
  Calculator,
  Zap,
  Droplets,
  Wheat,
  ShieldPlus,
  Volume2,
} from 'lucide-react';

interface Props {
  profile: UserProfile;
  onTakePlacement: () => void;
}

export const LearnerHomeScreen: React.FC<Props> = ({
  profile,
  onTakePlacement,
}) => {
  const { lang, isUrdu, isSindhi, t } = useLanguage();
  const [activeModule, setActiveModule] = useState<Subject | null>(null);

  const handleTileClick = (moduleName: Subject, title: string) => {
    setActiveModule(moduleName);
    tts.speak(title, lang);
  };

  // Dedicated interactive modules
  if (activeModule === 'literacy') {
    return <LiteracyModule onClose={() => setActiveModule(null)} />;
  }
  if (activeModule === 'math') {
    return <MathModule onClose={() => setActiveModule(null)} />;
  }
  if (activeModule === 'physics') {
    return <PhysicsModule onClose={() => setActiveModule(null)} />;
  }
  if (activeModule === 'chemistry') {
    return <ChemistryModule onClose={() => setActiveModule(null)} />;
  }
  if (activeModule === 'agriculture') {
    return <FarmingLivestockModule onClose={() => setActiveModule(null)} />;
  }
  if (activeModule === 'health') {
    return <HealthSafetyModule onClose={() => setActiveModule(null)} />;
  }

  // 6 Top-Level Modules Data for the 2x3 / 3x2 Grid
  const modulesList = [
    {
      id: 'literacy' as Subject,
      icon: <BookOpen className="w-8 h-8" />,
      emoji: '📖',
      titleUr: 'زبان و حروف شناسی',
      titleSd: 'ٻولي ۽ اکر شناسي',
      titleEn: 'Languages & Literacy',
      subtitleUr: 'اردو، سندھی اور انگریزی حروف، صوتیات اور ٹچ اسکرین ٹریسنگ پیڈ',
      subtitleSd: 'سنڌي، اردو ۽ انگريزي اکر، آواز ۽ ٽچ اسڪرين ٽريسنگ مشق',
      subtitleEn: 'Trilingual phonics, interactive canvas tracing, vocabulary & signage',
      tagUr: 'اردو • سنڌي • English',
      tagSd: 'سنڌي • اردو • English',
      tagEn: 'Urdu • Sindhi • English',
      accentColor: 'border-sky-200 hover:border-sky-600 bg-gradient-to-b from-sky-50/60 to-white',
      iconBg: 'bg-sky-100 text-sky-800 ring-2 ring-sky-300/40 group-hover:scale-105',
      tagBg: 'bg-sky-100 text-sky-900 border border-sky-200/60',
      progressColor: 'bg-sky-600',
      progress: 65,
    },
    {
      id: 'math' as Subject,
      icon: <Calculator className="w-8 h-8" />,
      emoji: '🔢',
      titleUr: 'بنیادی و عملی ریاضی',
      titleSd: 'بنيادي ۽ عملي حساب',
      titleEn: 'Applied Mathematics',
      subtitleUr: 'پاکستانی روپوں کا حساب، بازار کا بقایا، زرعی اراضی کنورٹر اور قرضہ مارک اپ',
      subtitleSd: 'پاڪستاني نوٽن جي ڳڻپ، بازار جو بقايا، زرعي زمين ماپ ۽ قرض مارڪ اپ',
      subtitleEn: 'PKR cash register, bazaar change, land area converter & agri-loan markup',
      tagUr: 'حساب • کرنسی • اراضی',
      tagSd: 'ڳڻپ • نوٽ • زمين',
      tagEn: 'Cash • Land • Markup',
      accentColor: 'border-emerald-200 hover:border-emerald-600 bg-gradient-to-b from-emerald-50/60 to-white',
      iconBg: 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-300/40 group-hover:scale-105',
      tagBg: 'bg-emerald-100 text-emerald-900 border border-emerald-200/60',
      progressColor: 'bg-emerald-600',
      progress: 50,
    },
    {
      id: 'physics' as Subject,
      icon: <Zap className="w-8 h-8" />,
      emoji: '⚡',
      titleUr: 'طبیعیات و دیہی توانائی',
      titleSd: 'فزڪس ۽ ڳوٺاڻي توانائي',
      titleEn: 'Physics & Rural Energy',
      subtitleUr: 'کنویں کی چرخی و لیور، سولر پینل و بیٹری سائزنگ، اور ٹیوب ویل واٹر فلو',
      subtitleSd: 'کوھ جي چرخي، سولر سسٽم ۽ بيٽري، ۽ ٽيوب ويل واٽر هائيڊرولڪس',
      subtitleEn: 'Simple machines & pulleys, solar PV sizing & tube well hydraulics',
      tagUr: 'چرخی • سولر • ٹیوب ویل',
      tagSd: 'چرخي • سولر • واٽر پمپ',
      tagEn: 'Pulleys • Solar • Hydraulics',
      accentColor: 'border-amber-200 hover:border-amber-600 bg-gradient-to-b from-amber-50/60 to-white',
      iconBg: 'bg-amber-100 text-amber-800 ring-2 ring-amber-300/40 group-hover:scale-105',
      tagBg: 'bg-amber-100 text-amber-900 border border-amber-200/60',
      progressColor: 'bg-amber-500',
      progress: 40,
    },
    {
      id: 'chemistry' as Subject,
      icon: <Droplets className="w-8 h-8" />,
      emoji: '🧪',
      titleUr: 'کیمیا، پانی و زرعی مٹی',
      titleSd: 'ڪيمسٽري، پاڻي ۽ زمين',
      titleEn: 'Chemistry, Water & Soil',
      subtitleUr: 'پینے کا صاف پانی (سودس/پھٹکری)، مٹی کی پی ایچ و جپسم علاج اور اسپرے محلول',
      subtitleSd: 'صاف پيئڻ جو پاڻي، کلراٺي زمين ۽ جپسم، ۽ زرعي دوائن جا رنگ ڪوڊ',
      subtitleEn: 'Safe water science, soil pH reclamation & agrochemical dilution safety',
      tagUr: 'پانی • جپسم • کھاد',
      tagSd: 'پاڻي • جپسم • ڀاڻ',
      tagEn: 'Water • Soil pH • Sprays',
      accentColor: 'border-indigo-200 hover:border-indigo-600 bg-gradient-to-b from-indigo-50/60 to-white',
      iconBg: 'bg-indigo-100 text-indigo-800 ring-2 ring-indigo-300/40 group-hover:scale-105',
      tagBg: 'bg-indigo-100 text-indigo-900 border border-indigo-200/60',
      progressColor: 'bg-indigo-600',
      progress: 35,
    },
    {
      id: 'agriculture' as Subject,
      icon: <Wheat className="w-8 h-8" />,
      emoji: '🌾',
      titleUr: 'کھیتی باڑی اور زرعی منافع',
      titleSd: 'ٻني ٻارو ۽ منافعي جو حساب',
      titleEn: 'Agriculture & Farm P&L',
      subtitleUr: 'سندھ میں چاول و گندم کے 6 مراحل، خالص منافع بیلنس شیٹ اور مویشی ڈیری',
      subtitleSd: 'سنڌ ۾ چانورن ۽ ڪڻڪ جا 6 مرحلا، سڌو منافعو اڪائونٽنگ ۽ مال جي ويڪسين',
      subtitleEn: 'Sindh Rice/Wheat agronomy, itemized farm profit ledger & livestock care',
      tagUr: 'دھان • گندم • بیلنس شیٹ',
      tagSd: 'چانور • ڪڻڪ • منافعو',
      tagEn: 'Rice • Wheat • Farm P&L',
      accentColor: 'border-lime-200 hover:border-lime-600 bg-gradient-to-b from-lime-50/60 to-white',
      iconBg: 'bg-lime-100 text-lime-800 ring-2 ring-lime-300/40 group-hover:scale-105',
      tagBg: 'bg-lime-100 text-lime-900 border border-lime-200/60',
      progressColor: 'bg-lime-600',
      progress: 60,
    },
    {
      id: 'health' as Subject,
      icon: <ShieldPlus className="w-8 h-8" />,
      emoji: '🏥',
      titleUr: 'صحت، فرسٹ ایڈ و ریسکیو 1122',
      titleSd: 'صحت، فرسٽ ايڊ ۽ ريسڪيو 1122',
      titleEn: 'Health, First Aid & Safety',
      subtitleUr: 'سانپ کاٹنا، لو لگنا، شدید خون، ریسکیو 1122 اور طبی نسخے کا سخت انکار',
      subtitleSd: 'نانگ جو چڪ، شديد گرمي، رت روڪڻ، ريسڪيو 1122 ۽ دوائن جو انڪار',
      subtitleEn: 'Snakebite triage, heatstroke, Rescue 1122 and medical prescription refusal',
      tagUr: 'ریسکیو 1122 • فرسٹ ایڈ',
      tagSd: 'ريسڪيو 1122 • فرسٽ ايڊ',
      tagEn: 'Rescue 1122 • First Aid',
      accentColor: 'border-rose-200 hover:border-rose-600 bg-gradient-to-b from-rose-50/60 to-white',
      iconBg: 'bg-rose-100 text-rose-800 ring-2 ring-rose-300/40 group-hover:scale-105',
      tagBg: 'bg-rose-100 text-rose-900 border border-rose-200/60',
      progressColor: 'bg-rose-600',
      progress: 45,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-8 animate-in fade-in duration-200">
      {/* Learner Profile Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-teal-800/50 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Soft decorative glow circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-5 text-center md:text-start relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl shadow-xl border border-white/20 shrink-0">
            {profile.avatar}
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5 flex-wrap">
              <span className="text-xs bg-teal-700/80 px-3 py-1 rounded-full font-bold text-teal-100 border border-teal-600/30">
                {isSindhi ? profile.roleSd : isUrdu ? profile.roleUr : profile.role}
              </span>
              <span className="text-xs bg-amber-400 text-amber-950 font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <Star className="w-3.5 h-3.5 fill-amber-950" />
                <span>
                  {profile.stars} {t('stars')}
                </span>
              </span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl font-black tracking-tight ${
                isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
              }`}
            >
              {profile.name}
            </h2>
            <p className="text-xs text-teal-200/90 font-medium mt-1">
              {isSindhi ? profile.levelSd : isUrdu ? profile.levelUr : profile.level} •{' '}
              {isSindhi ? profile.pathwaySd : isUrdu ? profile.pathwayUr : profile.pathway}
            </p>
          </div>
        </div>

        {/* Retake placement assessment action */}
        <button
          onClick={onTakePlacement}
          className="relative z-10 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-white text-xs font-black border border-white/20 transition-all flex items-center gap-2.5 shrink-0 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>
            {isSindhi
              ? 'مهارت جو جائزو ٻيهر ڏيو'
              : isUrdu
              ? 'مہارت کا تشخیصی جائزہ دوبارہ دیں'
              : 'Retake Diagnostic Quiz'}
          </span>
        </button>
      </div>

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div>
          <h3
            className={`text-xl sm:text-2xl font-black text-slate-900 ${
              isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
            }`}
          >
            {isSindhi
              ? 'پنهنجو سکيا وارو شعبو چونڊيو (Choose Pathway)'
              : isUrdu
              ? 'اپنا تعلیمی شعبہ منتخب کریں (Choose Pathway)'
              : 'Select Your Learning Pathway'}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {isSindhi
              ? '6 مڪمل طور تي فعال موضوع: وڏا ٽيبلٽ ٽارگيٽ، آواز، مشقون ۽ خالص عملي ڳڻپيوڪر'
              : isUrdu
              ? '6 مکمل طور پر فعال موضوعات: بڑے ٹیبلٹ ٹچ ٹارگٹس، صوتی رہنمائی، حقیقی مشقیں اور سائنسی لیبز'
              : '6 fully functional modules with tablet-first touch targets (≥72px), audio guidance and interactive labs.'}
          </p>
        </div>
      </div>

      {/* 6 Distinct, Spacious Learning Cards (2x3 or 3x2 Responsive Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {modulesList.map((m) => {
          const title = isSindhi ? m.titleSd : isUrdu ? m.titleUr : m.titleEn;
          const subtitle = isSindhi ? m.subtitleSd : isUrdu ? m.subtitleUr : m.subtitleEn;
          const tag = isSindhi ? m.tagSd : isUrdu ? m.tagUr : m.tagEn;

          return (
            <button
              key={m.id}
              onClick={() => handleTileClick(m.id, title)}
              className={`group relative ${m.accentColor} p-6 sm:p-7 rounded-3xl border-2 text-start shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 active:scale-[0.985] flex flex-col justify-between min-h-[290px]`}
            >
              {/* Card Header: Icon + Badge + Audio Button */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-16 h-16 rounded-2xl ${m.iconBg} flex items-center justify-center shadow-inner shrink-0 transition-all duration-200`}
                  >
                    {m.icon}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] sm:text-[11px] font-black px-2.5 py-1 rounded-full ${m.tagBg}`}>
                      {tag}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        tts.speak(`${title}. ${subtitle}`, lang);
                      }}
                      className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 shadow-2xs border border-slate-200 active:scale-95 transition-all"
                      title={t('listenAudio')}
                    >
                      <Volume2 className="w-4 h-4 text-teal-800" />
                    </button>
                  </div>
                </div>

                {/* Card Title & Subtitle */}
                <h4
                  className={`text-lg sm:text-xl font-black text-slate-900 group-hover:text-teal-900 transition-colors mb-2 ${
                    isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
                  }`}
                >
                  {title}
                </h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-3">
                  {subtitle}
                </p>
              </div>

              {/* Card Bottom: Progress Bar & Action Link */}
              <div className="mt-5 pt-3.5 border-t border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                  <span>{isSindhi ? 'ترقي:' : isUrdu ? 'پیشرفت:' : 'Progress:'} {m.progress}%</span>
                  <span className="text-teal-800 font-black flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                    <span>{t('startLearning')}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
                  </span>
                </div>
                <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`${m.progressColor} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${m.progress}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LearnerHomeScreen;
