import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { tts } from '../../services/tts';
import { awardStarsToActiveProfile } from '../../services/storage';
import {
  Volume2,
  Droplets,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onClose: () => void;
}

type ChemistryTab = 'soil' | 'water' | 'agrochemical';

export const ChemistryModule: React.FC<Props> = ({ onClose }) => {
  const { lang, isUrdu, isSindhi, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<ChemistryTab>('soil');

  // --- SOIL PH & RECLAMATION LAB STATE ---
  const [soilPh, setSoilPh] = useState<number>(8.4); // Typical sodic alkaline Sindh soil
  const [soilAcres, setSoilAcres] = useState<number>(2.5);

  // Chemistry Gypsum calculations:
  // For sodic soils (pH > 8.0): roughly 2 to 4 bags of Gypsum per acre per 0.5 pH above 7.8
  const gypsumBagsPerAcre = soilPh > 7.8 ? Math.round((soilPh - 7.5) * 5) : 0;
  const totalGypsumBags = Math.round(gypsumBagsPerAcre * soilAcres);

  // Dynamic pH Color indicator:
  let phColor = 'bg-emerald-500';
  let phText = 'text-emerald-950 bg-emerald-50 border-emerald-300';
  if (soilPh < 6.0) {
    phColor = 'bg-rose-500';
    phText = 'text-rose-950 bg-rose-50 border-rose-300';
  } else if (soilPh > 8.0) {
    phColor = 'bg-amber-500';
    phText = 'text-amber-950 bg-amber-50 border-amber-300';
  }

  // --- SAFE WATER PURIFICATION STATE ---
  const [waterMethod, setWaterMethod] = useState<'boiling' | 'sodis' | 'alum' | 'chlorine'>('boiling');

  // --- AGROCHEMICAL DILUTION & SAFETY STATE ---
  const [sprayerTankLiters, setSprayerTankLiters] = useState<number>(20);
  const [dosePerAcreMl, setDosePerAcreMl] = useState<number>(400);
  const [tanksPerAcre, setTanksPerAcre] = useState<number>(5);
  const mlPerTank = Math.round(dosePerAcreMl / tanksPerAcre);

  // WHO Hazard Band Match Quiz
  const [hazardQuiz] = useState([
    {
      labelUr: '🔴 لال رنگ (Red Band)',
      labelSd: '🔴 ڳاڙهو رنگ (Red Band)',
      labelEn: '🔴 Red Band (Class Ia/Ib)',
      descUr: 'انتہائی زہریلا (Extremely Toxic) — منہ پر ماسک اور دستانے لازمی ہیں، بچوں سے بالکل دور رکھیں۔',
      descSd: 'سخت خطرناڪ زهر — نقاب ۽ دستانا لازمي، ٻارن کان مڪمل پري رکو.',
      descEn: 'Extremely Hazardous — Imperative respirator and nitrile gloves, keep locked away.',
    },
    {
      labelUr: '🟡 پیلا رنگ (Yellow Band)',
      labelSd: '🟡 پيلو رنگ (Yellow Band)',
      labelEn: '🟡 Yellow Band (Class II)',
      descUr: 'شدید زہریلا (Highly Toxic) — تیز ہوا کے رخ پر اسپرے ہرگز نہ کریں ورنہ زہر آنکھوں اور سانس میں جائے گا۔',
      descSd: 'شديد زهر — هوا جي سامهون ڇٽڪار نه ڪريو، اکين ۽ ساهه کي بچايو.',
      descEn: 'Highly Toxic — Never spray against the wind to protect respiratory tract and eyes.',
    },
    {
      labelUr: '🔵 نیلا رنگ (Blue Band)',
      labelSd: '🔵 نيرو رنگ (Blue Band)',
      labelEn: '🔵 Blue Band (Class III)',
      descUr: 'درمیانہ زہریلا (Moderately Toxic) — اسپرے کے بعد ہاتھ صابن سے دھوئیں، اسپرے کی ٹینکی نہر میں نہ دھوئیں۔',
      descSd: 'وچٿرو زهر — هٿ صابڻ سان ڌوئو ۽ ٽينڪي واهه ۾ صفا نه ڪريو.',
      descEn: 'Moderately Toxic — Wash hands with soap; never rinse tanks in irrigation canals.',
    },
    {
      labelUr: '🟢 سبز رنگ (Green Band)',
      labelSd: '🟢 سائو رنگ (Green Band)',
      labelEn: '🟢 Green Band (Class IV)',
      descUr: 'کم خطرہ / احتیاط (Caution) — نسبتاً محفوظ لیکن کھانے پینے کی اشیاء سے دور رکھیں۔',
      descSd: 'گهٽ خطرو — کائڻ پيئڻ جي شين کان ڌار رکو.',
      descEn: 'Low Hazard / Caution — Relatively safe, but keep isolated from food and cattle feed.',
    },
  ]);
  const [selectedHazardIdx, setSelectedHazardIdx] = useState<number>(0);

  const speak = (text: string) => {
    tts.speak(text, lang);
  };

  const handleCelebrate = () => {
    awardStarsToActiveProfile(2);
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 animate-in fade-in duration-150">
      {/* Top Breadcrumb Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold mb-1">
            <button onClick={onClose} className="hover:text-teal-700 transition-colors">
              {t('home')}
            </button>
            <ChevronRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
            <span className="text-teal-800 font-black">
              {isSindhi ? 'ڪيمسٽري، پاڻي ۽ زمين' : isUrdu ? 'کیمیا، پانی و زرعی مٹی' : 'Chemistry & Soil'}
            </span>
          </div>
          <h2
            className={`text-2xl md:text-3xl font-black text-slate-900 ${
              isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
            }`}
          >
            {isSindhi ? 'ڪيمسٽري، پاڻي ۽ مٽي ليب (Chemistry)' : isUrdu ? 'کیمیا، پانی اور مٹی کیمسٹری (Chemistry)' : 'Applied Chemistry Lab'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isSindhi
              ? 'پيئڻ جو صاف پاڻي، کلراٺي زمين ۽ جپسم، ۽ زرعي دوائن جا رنگ ڪوڊ'
              : isUrdu
              ? 'پینے کا صاف پانی، کلر زدہ مٹی و جپسم علاج، اور زرعی اسپرے محلول'
              : 'Safe drinking water purification, soil pH reclamation & agrochemical dilution safety'}
          </p>
        </div>

        <button
          onClick={onClose}
          className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-black text-xs flex items-center gap-2 shadow-md transition-all active:scale-95 self-end sm:self-center"
        >
          <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
          <span>{t('backToHome')}</span>
        </button>
      </div>

      {/* Sub-Tab Navigation */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('soil')}
          className={`py-3 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'soil'
              ? 'bg-white text-teal-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Lightbulb className="w-4 h-4 text-emerald-700" />
          <span>{isSindhi ? 'زمين جي پي ايڇ ۽ جپسم' : isUrdu ? 'مٹی کی پی ایچ و جپسم' : 'Soil pH & Gypsum'}</span>
        </button>

        <button
          onClick={() => setActiveTab('water')}
          className={`py-3 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'water'
              ? 'bg-white text-teal-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Droplets className="w-4 h-4 text-blue-600" />
          <span>{isSindhi ? 'صاف پاڻي جا سائنسي طريقا' : isUrdu ? 'صاف پانی کے سائنسی طریقے' : 'Safe Water Science'}</span>
        </button>

        <button
          onClick={() => setActiveTab('agrochemical')}
          className={`py-3 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'agrochemical'
              ? 'bg-white text-teal-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span>{isSindhi ? 'زرعي دوائون ۽ زهر ڪوڊ' : isUrdu ? 'زرعی اسپرے و زہر کوڈ' : 'Agrochemical Lab'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: INTERACTIVE SOIL PH & GYPSUM RECLAMATION LAB */}
      {/* ========================================================================= */}
      {activeTab === 'soil' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-700" />
                <span>
                  {isSindhi
                    ? '1. زمين جي پي ايڇ (pH) ۽ کلراٺي زمين جو جپسم علاج'
                    : isUrdu
                    ? '1. مٹی کی پی ایچ (pH) اور کلر زدہ زمین کا جپسم علاج'
                    : 'Soil pH Chemistry & Gypsum Reclamation Simulator'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSindhi
                  ? 'سلائيڊر مان زمين جي پي ايڇ مٽايو ۽ ڏسو ته جپسم (CaSO₄) ڪيئن سوڊيم کي هٽائي زمين نرم ڪري ٿو.'
                  : isUrdu
                  ? 'سلائیڈر سے مٹی کی پی ایچ تبدیل کریں اور دیکھیں کہ جپسم (CaSO₄) کھاری پن کو کیسے دور کرتا ہے۔'
                  : 'Slide pH from 4.0 to 10.5 to diagnose sodic soils and calculate exact gypsum remediation bags.'}
              </p>
            </div>

            <button
              onClick={() =>
                speak(
                  soilPh > 8.0
                    ? (isSindhi ? `زمين جي پي ايڇ ${soilPh} کلراٺي آهي. ${soilAcres} ايڪڙ لاءِ ${totalGypsumBags} ٻوريون جپسم گهرجن.` : isUrdu ? `زمین کی پی ایچ ${soilPh} کھاری اور کلر زدہ ہے۔ ${soilAcres} ایکڑ کے لیے ${totalGypsumBags} بوری جپسم درکار ہے۔` : `Soil pH ${soilPh} is alkaline/sodic. For ${soilAcres} acres, ${totalGypsumBags} bags of gypsum are recommended.`)
                    : (isSindhi ? `زمين جي پي ايڇ ${soilPh} زرخيز ۽ بهترين آهي.` : isUrdu ? `زمین کی پی ایچ ${soilPh} زرخیز اور مثالی ہے۔` : `Soil pH ${soilPh} is ideal for cultivation.`)
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 border border-emerald-200"
            >
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span>{t('listenAudio')}</span>
            </button>
          </div>

          {/* Interactive Soil pH Slider */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">
                {isSindhi ? 'زمين جي ٽيسٽ پي ايڇ (pH Slider):' : isUrdu ? 'مٹی کی ٹیسٹ پی ایچ (pH Slider):' : 'Soil pH Meter Slider:'}
              </span>
              <span className={`text-xl font-black px-4 py-1.5 rounded-2xl border flex items-center gap-2 ${phText}`}>
                <span className={`w-3 h-3 rounded-full ${phColor}`} />
                pH {soilPh.toFixed(1)}
              </span>
            </div>

            <input
              type="range"
              min="4.0"
              max="10.5"
              step="0.1"
              value={soilPh}
              onChange={(e) => setSoilPh(Number(e.target.value))}
              className="w-full accent-teal-700 cursor-pointer"
            />

            {/* Visual pH Spectrum Indicator Bar */}
            <div className="w-full h-2.5 rounded-full bg-gradient-to-r from-rose-500 via-emerald-500 via-amber-500 to-purple-600 shadow-inner opacity-90" />

            <div className="flex justify-between text-[11px] font-bold text-slate-500">
              <span className="text-rose-600">4.0 (تیزابی / Acidic)</span>
              <span className="text-emerald-700">7.0 (معتدل / Neutral)</span>
              <span className="text-amber-700">8.5+ (کلراٹھی / Sodic Sindh)</span>
            </div>

            {/* Scientific Diagnostic Analysis */}
            <div className="p-4 rounded-xl border text-xs leading-relaxed">
              {soilPh < 6.5 && (
                <div className="text-rose-950 bg-rose-50 border-rose-200 p-3 rounded-xl space-y-1">
                  <span className="font-black text-sm block">🔴 تیزابی مٹی (Acidic Soil):</span>
                  <p>پودے فاسفورس اور پوٹاشیم جذب نہیں کر سکتے۔ علاج: بجھا ہوا چونا (Agricultural Lime) ڈالیں تاکہ پی ایچ اوپر آئے۔</p>
                </div>
              )}

              {soilPh >= 6.5 && soilPh <= 7.8 && (
                <div className="text-emerald-950 bg-emerald-50 border-emerald-200 p-3 rounded-xl space-y-1">
                  <span className="font-black text-sm block">🟢 معتدل و زرخیز مٹی (Optimal Neutral Soil):</span>
                  <p>گندم، دھان اور کپاس کے لیے 100% مثالی۔ پودا تمام کھادیں (نائٹروجن، فاسفورس، زنک) آسانی سے جذب کرتا ہے۔</p>
                </div>
              )}

              {soilPh > 7.8 && (
                <div className="text-amber-950 bg-amber-50 border-amber-300 p-3 rounded-xl space-y-2">
                  <span className="font-black text-sm block">🟡 کلر زدہ / کھاری زمین (Sodic Alkaline Soil - Sindh):</span>
                  <p>
                    مٹی میں سوڈیم ($Na^+$) کی کثرت سے زمین پر کالی پپڑی جم جاتی ہے اور پانی جذب نہیں ہوتا۔
                    کیمیائی حل: <strong className="underline">جپسم ($CaSO_4 \cdot 2H_2O$)</strong>۔ جپسم کا کیلشیم مٹی کے ذرات سے سوڈیم کو الگ کر کے نچلی تہوں میں بہا دیتا ہے، جس سے زمین نرم ہو جاتی ہے۔
                  </p>
                </div>
              )}
            </div>

            {/* Gypsum Dosage Calculator */}
            {soilPh > 7.8 && (
              <div className="bg-white p-5 rounded-2xl border border-amber-200 space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black text-amber-950 uppercase tracking-wider block">
                      {isSindhi ? 'جپسم مقدار ڳڻپيوڪر (Gypsum Dosage Calculator):' : isUrdu ? 'جپسم مقدار کیلکولیٹر (Gypsum Calculator):' : 'Gypsum Remediation Calculator:'}
                    </span>
                    <span className="text-xs text-slate-500">
                      {isSindhi ? 'زمين جو رقبہ (ايڪڙ):' : isUrdu ? 'اراضی کا رقبہ (ایکڑ):' : 'Cultivated Acres:'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="50"
                      value={soilAcres}
                      onChange={(e) => setSoilAcres(Math.max(0.5, Number(e.target.value)))}
                      className="w-24 px-3 py-1.5 rounded-xl border border-slate-300 font-black text-xs text-center"
                    />
                    <span className="text-xs font-bold text-slate-700">{isSindhi ? 'ايڪڙ' : isUrdu ? 'ایکڑ' : 'Acres'}</span>
                  </div>
                </div>

                <div className="p-4 bg-amber-100/60 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="text-amber-900 font-bold block">{isSindhi ? 'في ايڪڙ تجويز ڪيل جپسم:' : isUrdu ? 'فی ایکڑ مطلوبہ جپسم:' : 'Per Acre Requirement:'}</span>
                    <span className="text-lg font-black text-amber-950">{gypsumBagsPerAcre} بوری فی ایکڑ</span>
                  </div>
                  <div className="text-end">
                    <span className="text-amber-900 font-bold block">{isSindhi ? 'ڪل جپسم ٻوريون:' : isUrdu ? 'کل مطلوبہ جپسم بوریاں:' : 'Total Gypsum Bags:'}</span>
                    <span className="text-2xl font-black text-amber-950">{totalGypsumBags} Bags (50kg each)</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SAFE WATER PURIFICATION SCIENCE */}
      {/* ========================================================================= */}
      {activeTab === 'water' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                <span>
                  {isSindhi
                    ? '2. پيئڻ جو صاف پاڻي ۽ جراثيم ڪش سائنس (Water Science)'
                    : isUrdu
                    ? '2. پینے کا صاف پانی اور جراثیم کش کیمسٹری (Water Science)'
                    : 'Safe Drinking Water Chemistry & Rural Purification'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSindhi
                  ? 'اُٻارڻ، سج جون الٽرا وائلٽ شعاعون (سودس)، ڦٽڪي ۽ ڪلورين جا سائنسي مرحلا سکو.'
                  : isUrdu
                  ? 'ابالنا، سورج کی الٹرا وائلٹ شعاعیں (سودس)، پھٹکری اور کلورین کے محفوظ سائنسی طریقے سمجھیں۔'
                  : 'Scientific methods to eliminate cholera, hepatitis, typhoid, and sediment turbidity.'}
              </p>
            </div>

            <button
              onClick={() =>
                speak(
                  waterMethod === 'boiling'
                    ? (isSindhi ? 'پاڻي کي 100 سينٽي گريڊ تي 10 منٽ رڌڻ سان بيڪٽيريا مري وڃن ٿا.' : isUrdu ? 'پانی کو 10 منٹ تک تیز ابالنے سے تمام بیکٹیریا اور جراثیم ختم ہو جاتے ہیں۔' : 'Boiling water for 10 minutes kills all bacteria and pathogens.')
                    : waterMethod === 'alum'
                    ? (isSindhi ? 'ڦٽڪي جا مثبت چارج مٽيءَ جي ذرڙن کي پاڻ ۾ ملائي تري ۾ ويهارين ٿا.' : isUrdu ? 'پھٹکری مٹی کے ذرات کو جوڑ کر وزنی بنا کر پیندے میں بٹھا دیتی ہے۔' : 'Alum coagulates suspended clay sediments, settling water crystal clear.')
                    : (isSindhi ? 'سج جي الٽرا وائلٽ شعاعن سان پاڻي 6 ڪلاڪن ۾ پيئڻ لائق ٿئي ٿو.' : isUrdu ? 'سورج کی الٹرا وائلٹ شعاعیں 6 گھنٹوں میں پانی کو جراثیم سے پاک کر دیتی ہیں۔' : 'Solar UV-A rays disinfect water in clear PET bottles after 6 hours.')
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold hover:bg-blue-100 border border-blue-200"
            >
              <Volume2 className="w-4 h-4 text-blue-700" />
              <span>{t('listenAudio')}</span>
            </button>
          </div>

          {/* 4 Methods Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'boiling', icon: '🔥', nameUr: 'ابالنا (Boiling)', nameSd: 'اُٻارڻ (Boiling)', nameEn: 'Boiling (100°C)' },
              { id: 'sodis', icon: '☀️', nameUr: 'سودس (Solar UV)', nameSd: 'سودس (Solar UV)', nameEn: 'Solar SODIS' },
              { id: 'alum', icon: '💎', nameUr: 'پھٹکری (Alum)', nameSd: 'ڦٽڪي (Alum)', nameEn: 'Alum Coagulation' },
              { id: 'chlorine', icon: '🧪', nameUr: 'کلورین (Chlorine)', nameSd: 'ڪلورين (Chlorine)', nameEn: 'Chlorine Drops' },
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setWaterMethod(m.id as any)}
                className={`min-h-[80px] p-4 rounded-2xl border-2 text-start transition-all flex flex-col justify-between ${
                  waterMethod === m.id
                    ? 'border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                }`}
              >
                <span className="text-2xl">{m.icon}</span>
                <span className="text-xs font-black text-slate-900 mt-2 block">
                  {isSindhi ? m.nameSd : isUrdu ? m.nameUr : m.nameEn}
                </span>
              </button>
            ))}
          </div>

          {/* Method Scientific Walkthrough */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
            {waterMethod === 'boiling' && (
              <div className="space-y-2">
                <span className="text-base font-black text-rose-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-rose-600" />
                  <span>{isSindhi ? 'اُٻارڻ جو سائنسي عمل (Thermal Disinfection):' : isUrdu ? 'ابالنے کا سائنسی طریقہ (Thermal Disinfection):' : 'Thermal Disinfection Science (100°C):'}</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isSindhi
                    ? 'پاڻي کي ٻڙڪو ڏئي 10 منٽ هلڪي باهه تي رڌيو. گرمي بيڪٽيريا جي پروٽين کي ٽوڙي ڇڏيندي آهي، جنهن سان هيضه ۽ پيچش جا جراثيم مڪمل ختم ٿين ٿا.'
                    : isUrdu
                    ? 'پانی کو تیز آنچ پر ابال آنے کے بعد 10 منٹ تک مزید پکنے دیں۔ شدید حرارت بیکٹیریا اور پیٹ کے کیڑوں کے پروٹین کو تباہ کر دیتی ہے۔ پینے سے قبل صاف برتن میں ڈھانپ کر ٹھنڈا کریں۔'
                    : 'Heating water to 100°C denatures bacterial and viral proteins within 5–10 minutes, eliminating waterborne pathogens entirely.'}
                </p>
              </div>
            )}

            {waterMethod === 'sodis' && (
              <div className="space-y-2">
                <span className="text-base font-black text-amber-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                  <span>{isSindhi ? 'سودس جو شمسي طريقو (Solar SODIS Method):' : isUrdu ? 'سودس شمسی طریقہ کار (Solar SODIS Method):' : 'Solar UV-A Disinfection (SODIS):'}</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isSindhi
                    ? 'شفاف پلاسٽڪ جي بوتل ۾ ڇاڻيل پاڻي ڀري، ٽين جي ڇت تي سڌي اس ۾ 6 ڪلاڪ رکو. سج جون الٽرا وائلٽ شعاعون بيڪٽيريا جي ڊي اين اي کي ناس ڪن ٿيون.'
                    : isUrdu
                    ? 'شفاف پلاسٹک کی بوتل کو چھان کر ٹین یا چھت پر براہ راست دھوپ میں 6 گھنٹے رکھیں۔ سورج کی بالائے بنفشی (UV-A) شعاعیں جراثیم کا ڈی این اے توڑ دیتی ہیں۔'
                    : 'Fill clean, transparent PET bottles with filtered water and expose them to direct sunlight for 6 hours. UV-A radiation and elevated temperatures eliminate harmful pathogens.'}
                </p>
              </div>
            )}

            {waterMethod === 'alum' && (
              <div className="space-y-2">
                <span className="text-base font-black text-blue-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>{isSindhi ? 'ڦٽڪي سان گندگي ڄمائڻ (Alum Coagulation):' : isUrdu ? 'پھٹکری سے مٹی اور گدلا پن بٹھانا (Alum Coagulation):' : 'Alum Flocculation & Coagulation:'}</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isSindhi
                    ? 'گدلي پاڻي واري ٿانو ۾ ڦٽڪي جو ٽڪرو 4 کان 5 ڀيرا ڦيرايو. ڦٽڪي جا مثبت چارج مٽيءَ جي ذرڙن سان ملي ڳرا فلڪ ٺاهين ٿا جيڪي تري ۾ ويهي وڃن ٿا.'
                    : isUrdu
                    ? 'گدلے پانی کے برتن میں پھٹکری کا چھوٹا ٹکڑا 4 سے 5 بار گھمائیں۔ پھٹکری کے ایلومینیم آئنز مٹی کے منفی چارج والے ذرات کو چپکا کر وزنی بنا دیتے ہیں، جو پیندے میں بیٹھ جاتے ہیں اور اوپر کا پانی شفاف ہو جاتا ہے۔'
                    : 'Alum releases Al³⁺ ions that neutralize negatively charged colloidal clay, causing sediments to flocculate and settle within 30 minutes.'}
                </p>
              </div>
            )}

            {waterMethod === 'chlorine' && (
              <div className="space-y-2">
                <span className="text-base font-black text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>{isSindhi ? 'ڪلورين جا محفوظ قطرا (Chlorination):' : isUrdu ? 'کلورین اور پیوریفکیشن ٹیبلٹس (Chlorination):' : 'Chlorine Disinfection Guidelines:'}</span>
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {isSindhi
                    ? '10 ليٽر پاڻي ۾ 2 قطرا سوڊيم هائپوڪلورائيٽ وجهي 30 منٽ انتظار ڪريو. ڪلورين جراثيم جي سيل کي ٽوڙي ڇڏيندي آهي.'
                    : isUrdu
                    ? '10 لیٹر پانی میں کلورین محلول کے 2 قطرے ڈال کر 30 منٹ کے لیے چھوڑ دیں۔ کلورین خلیاتی دیواروں کو آکسیڈائز کر کے تباہ کرتی ہے۔ سیلاب کے دوران یہ تیز ترین طریقہ ہے۔'
                    : 'Add 2 drops of standard 5% sodium hypochlorite per 10 liters of water and allow 30 minutes contact time before consumption.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: AGROCHEMICAL DILUTION CALCULATOR & WHO SAFETY LAB */}
      {/* ========================================================================= */}
      {activeTab === 'agrochemical' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>
                  {isSindhi
                    ? '3. زرعي دوائن جي ڇٽڪار جو ڳڻپيوڪر ۽ خطري جا ڪوڊ'
                    : isUrdu
                    ? '3. زرعی اسپرے کا کیمیائی محلول اور زہر کے رنگ کوڈ'
                    : 'Agrochemical Dilution Calculator & WHO Toxicity Labels'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSindhi
                  ? 'في ايڪڙ تجويز ڪيل دوا کي 20 ليٽر ٽينڪي ۾ ماپي صحيح محلول ٺاهيو ۽ زهر جي رنگن کي سڃاڻو.'
                  : isUrdu
                  ? 'فی ایکڑ دوا کی مقدار کو 20 لیٹر کی اسپرے ٹینکیوں میں درست حل کرنے کا حساب اور زہر کے رنگ کوڈ۔'
                  : 'Calculate exact milliliters per knapsack tank to avoid crop burn, and review WHO toxicity warnings.'}
              </p>
            </div>

            <button
              onClick={() =>
                speak(
                  isSindhi
                    ? `في ايڪڙ ${dosePerAcreMl}ml دوا کي ${tanksPerAcre} ٽينڪين ۾ ڇٽڻ لاءِ هر هڪ ٽينڪي ۾ ${mlPerTank}ml دوا وجھو.`
                    : isUrdu
                    ? `فی ایکڑ ${dosePerAcreMl} ملی لیٹر دوا کو ${tanksPerAcre} ٹینکیوں میں اسپرے کرنے کے لیے ہر ٹینکی میں ${mlPerTank} ملی لیٹر دوا ڈالیں۔`
                    : `For a dose of ${dosePerAcreMl}ml over ${tanksPerAcre} tanks, add exactly ${mlPerTank}ml to each tank.`
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold hover:bg-amber-100 border border-amber-200"
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>{t('listenAudio')}</span>
            </button>
          </div>

          {/* Interactive Dilution Calculator Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isSindhi ? 'اسپري ٽينڪي حجم (ليٽر):' : isUrdu ? 'اسپرے ٹینکی کا حجم (لیٹر):' : 'Tank Capacity (Liters):'}
              </label>
              <input
                type="number"
                min="10"
                max="30"
                value={sprayerTankLiters}
                onChange={(e) => setSprayerTankLiters(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-black text-slate-800 bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Standard knapsack = 16-20L</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isSindhi ? 'في ايڪڙ دوا جو مقدار (ml):' : isUrdu ? 'فی ایکڑ دوا کی مقدار (ملی لیٹر):' : 'Dose per Acre (ml):'}
              </label>
              <input
                type="number"
                step="50"
                min="100"
                max="2000"
                value={dosePerAcreMl}
                onChange={(e) => setDosePerAcreMl(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-black text-slate-800 bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">e.g. 250ml, 400ml, 800ml</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isSindhi ? 'في ايڪڙ ٽينڪين جو تعداد:' : isUrdu ? 'فی ایکڑ ٹینکیوں کی تعداد:' : 'Tanks per Acre:'}
              </label>
              <input
                type="number"
                min="2"
                max="10"
                value={tanksPerAcre}
                onChange={(e) => setTanksPerAcre(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-black text-slate-800 bg-white"
              />
              <span className="text-[10px] text-slate-400 mt-0.5 block">Usually 4 to 6 tanks (100L)</span>
            </div>
          </div>

          {/* Dilution Output Banner */}
          <div className="bg-teal-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div>
              <span className="text-xs text-teal-200 font-bold block">
                {isSindhi ? 'هر هڪ اسپرے ٽينڪي ۾ وجهڻ جو مقدار:' : isUrdu ? 'ہر اسپرے ٹینکی میں ڈالنے کی مقدار:' : 'Add Exactly per Knapsack Tank:'}
              </span>
              <div className="text-3xl font-black text-amber-300 mt-0.5">
                {mlPerTank} ml <span className="text-base text-white font-normal">/ {sprayerTankLiters}L Tank</span>
              </div>
            </div>

            <button
              onClick={handleCelebrate}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSindhi ? 'حساب محفوظ ڪريو ⭐' : isUrdu ? 'حساب محفوظ کریں ⭐' : 'Save & Claim ⭐'}</span>
            </button>
          </div>

          {/* Interactive WHO Toxicity Color Code Cards */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 block">
              {isSindhi ? 'دوا جي دٻي تي زهر جا خطري ڪوڊ (Click to Inspect):' : isUrdu ? 'دوا کے ڈبے پر زہر کے رنگ کوڈ (Click to Inspect):' : 'WHO Toxicity Color Bands:'}
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {hazardQuiz.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedHazardIdx(idx)}
                  className={`min-h-[64px] p-3 rounded-2xl border-2 text-start transition-all font-bold text-xs ${
                    selectedHazardIdx === idx
                      ? 'border-slate-800 bg-slate-100 shadow-md scale-102 ring-2 ring-slate-800/10'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span>{isSindhi ? item.labelSd : isUrdu ? item.labelUr : item.labelEn}</span>
                </button>
              ))}
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs leading-relaxed text-slate-800">
              <p className="font-black text-sm text-slate-900 mb-1">
                {isSindhi ? hazardQuiz[selectedHazardIdx].labelSd : isUrdu ? hazardQuiz[selectedHazardIdx].labelUr : hazardQuiz[selectedHazardIdx].labelEn}
              </p>
              <p>
                {isSindhi ? hazardQuiz[selectedHazardIdx].descSd : isUrdu ? hazardQuiz[selectedHazardIdx].descUr : hazardQuiz[selectedHazardIdx].descEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChemistryModule;
