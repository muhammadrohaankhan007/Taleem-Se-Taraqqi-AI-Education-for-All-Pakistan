import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  RICE_LIFECYCLE,
  WHEAT_LIFECYCLE,
  VACCINE_SCHEDULE,
} from '../../data/farmingLivestockData';
import { tts } from '../../services/tts';
import { awardStarsToActiveProfile } from '../../services/storage';
import {
  Volume2,
  Calculator,
  Sprout,
  HeartPulse,
  Coins,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Clock,
  Droplet,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onClose: () => void;
}

type TabType = 'crops' | 'accounting' | 'livestock';

export const FarmingLivestockModule: React.FC<Props> = ({ onClose }) => {
  const { lang, isUrdu, isSindhi, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('accounting');
  const [selectedCrop, setSelectedCrop] = useState<'rice' | 'wheat'>('rice');
  const [selectedPhaseIdx, setSelectedPhaseIdx] = useState(0);

  // -----------------------------------------------------------
  // 1. CROP PROFIT & LOSS ACCOUNTING CALCULATOR STATE
  // -----------------------------------------------------------
  const [acres, setAcres] = useState<number>(3.0);
  const [yieldPerAcre, setYieldPerAcre] = useState<number>(42); // Maunds (من)
  const [pricePerMaund, setPricePerMaund] = useState<number>(3500); // PKR per maund

  // Itemized costs per acre (PKR defaults based on Sindh agricultural market)
  const [costLandPrep, setCostLandPrep] = useState<number>(8500); // Ploughing & puddling
  const [costSeed, setCostSeed] = useState<number>(4500); // Certified seed
  const [costDap, setCostDap] = useState<number>(18000); // 1.5 bags DAP
  const [costUrea, setCostUrea] = useState<number>(9600); // 2 bags Urea
  const [costMicroNutrients, setCostMicroNutrients] = useState<number>(4000); // Zinc & Potash
  const [costIrrigation, setCostIrrigation] = useState<number>(13000); // Diesel / tube well / canal
  const [costCropProtection, setCostCropProtection] = useState<number>(6500); // Herbicides & insecticides
  const [costHarvesting, setCostHarvesting] = useState<number>(9500); // Combine harvester / threshing
  const [costTransport, setCostTransport] = useState<number>(3000); // Mandi hauling

  // -----------------------------------------------------------
  // 2. LIVESTOCK DAIRY ECONOMICS STATE
  // -----------------------------------------------------------
  const [milkingAnimals, setMilkingAnimals] = useState<number>(4);
  const [litersPerAnimal, setLitersPerAnimal] = useState<number>(9); // Liters / day
  const [milkPricePerLiter, setMilkPricePerLiter] = useState<number>(180); // PKR
  const [dailyFeedCostPerAnimal, setDailyFeedCostPerAnimal] = useState<number>(750); // PKR (fodder + wanda)

  // -----------------------------------------------------------
  // CALCULATIONS
  // -----------------------------------------------------------
  // Crop P&L:
  const costPerAcreItemized =
    costLandPrep +
    costSeed +
    costDap +
    costUrea +
    costMicroNutrients +
    costIrrigation +
    costCropProtection +
    costHarvesting +
    costTransport;

  const totalProductionExpenses = Math.round(acres * costPerAcreItemized);
  const totalMaunds = Math.round(acres * yieldPerAcre);
  const grossRevenue = Math.round(totalMaunds * pricePerMaund);
  const netFarmProfit = grossRevenue - totalProductionExpenses;
  const costPerMaund = totalMaunds > 0 ? Math.round(totalProductionExpenses / totalMaunds) : 0;
  const breakEvenPrice = costPerMaund;
  const roiPercentage = totalProductionExpenses > 0 ? Math.round((netFarmProfit / totalProductionExpenses) * 100) : 0;

  // Dairy P&L:
  const totalDailyMilkLiters = milkingAnimals * litersPerAnimal;
  const dailyDairyGrossRevenue = totalDailyMilkLiters * milkPricePerLiter;
  const dailyTotalFeedCost = milkingAnimals * dailyFeedCostPerAnimal;
  const dailyNetDairyProfit = dailyDairyGrossRevenue - dailyTotalFeedCost;
  const monthlyEstimatedDairyProfit = dailyNetDairyProfit * 30;

  // Active crop lifecycle
  const currentLifecycle = selectedCrop === 'rice' ? RICE_LIFECYCLE : WHEAT_LIFECYCLE;
  const currentPhase = currentLifecycle[selectedPhaseIdx] || currentLifecycle[0];

  const speakGuidance = (text: string) => {
    tts.speak(text, lang);
  };

  const handleClaimReward = () => {
    awardStarsToActiveProfile(2);
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <div className="bg-white rounded-3xl p-4 md:p-8 border border-slate-200 shadow-xl max-w-5xl mx-auto space-y-6">
      {/* Top Breadcrumb Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold mb-1">
            <button onClick={onClose} className="hover:text-teal-700 transition-colors">
              {t('home')}
            </button>
            <ChevronRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
            <span className="text-teal-800 font-black">
              {isSindhi ? 'ٻني ٻارو ۽ منافعو' : isUrdu ? 'کھیتی باڑی اور زرعی منافع' : 'Agriculture & Livestock'}
            </span>
          </div>
          <h2
            className={`text-2xl md:text-3xl font-black text-slate-900 ${
              isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
            }`}
          >
            {isSindhi
              ? 'ٻني ٻارو، مال مويشي ۽ منافعي جو اڪائونٽنگ'
              : isUrdu
              ? 'کھیتی باڑی، لائیو اسٹاک اور زرعی منافع کا حساب'
              : 'Agriculture, Livestock & Farm Profit Accounting'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isSindhi
              ? 'سنڌ ۾ چانور ۽ ڪڻڪ جا 6 مرحلا، خرچن ۽ منافعي جو تفصيلي حساب ۽ جانورن جو کير'
              : isUrdu
              ? 'سندھ میں دھان و گندم کی 6 مراحل لائف سائیکل، خالص منافع و اخراجات کی بیلنس شیٹ'
              : 'Sindh Rice/Wheat 6-Phase Agronomy, Itemized Farm P&L and Dairy Economics'}
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

      {/* Main Tabs Navigation */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('accounting')}
          className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'accounting'
              ? 'bg-white text-emerald-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calculator className="w-4 h-4 text-emerald-700" />
          <span>{isSindhi ? 'منافع جو ڳڻپيوڪر (P&L)' : isUrdu ? 'زرعی منافع (P&L)' : 'Farm Profit P&L'}</span>
        </button>

        <button
          onClick={() => setActiveTab('crops')}
          className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'crops'
              ? 'bg-white text-amber-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sprout className="w-4 h-4 text-amber-600" />
          <span>{isSindhi ? 'چانور ۽ ڪڻڪ جا مرحلا' : isUrdu ? 'دھان و گندم لائف سائیکل' : 'Crop Lifecycles'}</span>
        </button>

        <button
          onClick={() => setActiveTab('livestock')}
          className={`py-2.5 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'livestock'
              ? 'bg-white text-blue-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HeartPulse className="w-4 h-4 text-rose-600" />
          <span>{isSindhi ? 'مال ۽ کير جو منافعو' : isUrdu ? 'مویشی و ڈیری حساب' : 'Livestock & Dairy'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. COMPREHENSIVE ITEMIZED FARM PROFIT & LOSS CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'accounting' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-emerald-50/70 rounded-3xl p-5 md:p-6 border border-emerald-300 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-emerald-950 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-emerald-800" />
                  <span>
                    {isSindhi
                      ? 'مڪمل زرعي آمدني ۽ خرچن جو تفصيلي حساب (Balance Sheet)'
                      : isUrdu
                      ? 'زرعی آمدن، مدوار اخراجات اور خالص منافع کی مکمل بیلنس شیٹ'
                      : 'Itemized Agricultural Cost-Benefit & Net Profit Statement'}
                  </span>
                </h3>
                <p className="text-xs text-emerald-800/80 mt-0.5">
                  {isSindhi
                    ? 'ايڪڙ، پيداوار، مارڪيٽ ريٽ ۽ في ايڪڙ سمورا خرچ درج ڪري سچو منافعو معلوم ڪريو.'
                    : isUrdu
                    ? 'کل رقبہ، متوقع پیداوار، منڈی ریٹ اور فی ایکڑ تمام مدوار اخراجات کا جامع تخمینہ۔'
                    : 'Real-time itemized production expenses, break-even price per maund, and ROI.'}
                </p>
              </div>

              <button
                onClick={() =>
                  speakGuidance(
                    isSindhi
                      ? `${acres} ايڪڙ تي ڪل متوقع پيداوار ${totalMaunds} مڻ، ڪل آمدني ${grossRevenue} رپيا ۽ سمورا خرچ ڪڍي خالص منافعو ${netFarmProfit} رپيا آهي.`
                      : isUrdu
                      ? `${acres} ایکڑ پر متوقع پیداوار ${totalMaunds} من، کل آمدنی ${grossRevenue} روپے اور تمام اخراجات نکال کر خالص بچت ${netFarmProfit} روپے بنتی ہے۔`
                      : `For ${acres} acres, total yield is ${totalMaunds} maunds, gross revenue is PKR ${grossRevenue}, and net seasonal profit is PKR ${netFarmProfit}.`
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-emerald-900 text-xs font-bold shadow-xs hover:bg-emerald-100 border border-emerald-200 self-end sm:self-center"
              >
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span>{isSindhi ? 'حساب ٻڌو' : isUrdu ? 'حساب سنیں' : 'Listen'}</span>
              </button>
            </div>

            {/* Primary Production Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  {isSindhi ? `ڪل رقبہ (ايڪڙ): ${acres}` : isUrdu ? `کل رقبہ (ایکڑ): ${acres}` : `Cultivated Land: ${acres} Acres`}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="20"
                  step="0.5"
                  value={acres}
                  onChange={(e) => setAcres(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>0.5 ایکڑ</span>
                  <span>20 ایکڑ</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  {isSindhi ? `پيداوار في ايڪڙ: ${yieldPerAcre} مڻ` : isUrdu ? `پیداوار فی ایکڑ: ${yieldPerAcre} من` : `Yield / Acre: ${yieldPerAcre} Maunds`}
                </label>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="1"
                  value={yieldPerAcre}
                  onChange={(e) => setYieldPerAcre(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>20 من</span>
                  <span>80 من</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  {isSindhi ? `منڊي اگهه في مڻ: PKR ${pricePerMaund}` : isUrdu ? `منڈی ریٹ فی من: PKR ${pricePerMaund}` : `Sale Price / Maund: PKR ${pricePerMaund}`}
                </label>
                <input
                  type="range"
                  min="2000"
                  max="6000"
                  step="100"
                  value={pricePerMaund}
                  onChange={(e) => setPricePerMaund(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Rs 2,000</span>
                  <span>Rs 6,000</span>
                </div>
              </div>
            </div>

            {/* Itemized Expenses Breakdown Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {isSindhi ? 'في ايڪڙ مدوار اخراجات (Itemized Costs / Acre)' : isUrdu ? 'فی ایکڑ مدوار اخراجات (Itemized Costs / Acre)' : 'Itemized Production Costs per Acre'}
                </span>
                <span className="text-xs font-black text-slate-900">
                  PKR {costPerAcreItemized.toLocaleString()} / acre
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block text-[11px] font-semibold">{isSindhi ? 'زمين جي تياري ۽ قدو:' : isUrdu ? 'زمین تیاری و ہل/قدو:' : 'Land Prep & Puddling:'}</span>
                  <input
                    type="number"
                    step="500"
                    value={costLandPrep}
                    onChange={(e) => setCostLandPrep(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-semibold">{isSindhi ? 'تصديق ٿيل ٻج:' : isUrdu ? 'تصدیق شدہ بیج:' : 'Certified Seed:'}</span>
                  <input
                    type="number"
                    step="500"
                    value={costSeed}
                    onChange={(e) => setCostSeed(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-semibold">{isSindhi ? 'ڊي اي پي ڀاڻ (DAP):' : isUrdu ? 'ڈی اے پی کھاد (DAP):' : 'DAP Fertilizer:'}</span>
                  <input
                    type="number"
                    step="500"
                    value={costDap}
                    onChange={(e) => setCostDap(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-semibold">{isSindhi ? 'يوريا ڀاڻ (Urea):' : isUrdu ? 'یوریا کھاد (Urea):' : 'Urea Fertilizer:'}</span>
                  <input
                    type="number"
                    step="500"
                    value={costUrea}
                    onChange={(e) => setCostUrea(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-semibold">{isSindhi ? 'زنڪ ۽ پوٽاش:' : isUrdu ? 'زنک و پوٹاش مائیکرو:' : 'Zinc & Potash:'}</span>
                  <input
                    type="number"
                    step="500"
                    value={costMicroNutrients}
                    onChange={(e) => setCostMicroNutrients(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-semibold">{isSindhi ? 'پاڻي، ڊيزل يا ٽيوب ويل:' : isUrdu ? 'پانی، ڈیزل یا ٹیوب ویل:' : 'Irrigation & Fuel:'}</span>
                  <input
                    type="number"
                    step="500"
                    value={costIrrigation}
                    onChange={(e) => setCostIrrigation(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-semibold">{isSindhi ? 'گند گاهه ۽ ڪيڙا اسپري:' : isUrdu ? 'جڑی بوٹی و کیڑا اسپرے:' : 'Pest & Weed Spray:'}</span>
                  <input
                    type="number"
                    step="500"
                    value={costCropProtection}
                    onChange={(e) => setCostCropProtection(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-semibold">{isSindhi ? 'ڪمبائن هارويسٽر / لڻائي:' : isUrdu ? 'کمبائن ہارویسٹر / کٹائی:' : 'Harvesting / Threshing:'}</span>
                  <input
                    type="number"
                    step="500"
                    value={costHarvesting}
                    onChange={(e) => setCostHarvesting(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>

                <div>
                  <span className="text-slate-500 block text-[11px] font-semibold">{isSindhi ? 'منڊي تائين ڀاڙو:' : isUrdu ? 'منڈی تک ٹرانسپورٹ کرایہ:' : 'Transport to Mandi:'}</span>
                  <input
                    type="number"
                    step="500"
                    value={costTransport}
                    onChange={(e) => setCostTransport(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Financial Dashboard Metrics */}
            <div className="bg-white rounded-2xl p-5 border border-emerald-300 shadow-md space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold block">{isSindhi ? 'ڪل متوقع اناج' : isUrdu ? 'کل متوقع اناج' : 'Total Yield'}</span>
                  <span className="text-lg font-black text-slate-800">{totalMaunds} من</span>
                  <span className="text-[10px] text-slate-400 block">({acres} ایکڑ)</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold block">{isSindhi ? 'ڪل آمدني' : isUrdu ? 'کل آمدنی' : 'Gross Revenue'}</span>
                  <span className="text-lg font-black text-emerald-800">PKR {grossRevenue.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 block">@ {pricePerMaund} / من</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold block">{isSindhi ? 'ڪل اخراجات' : isUrdu ? 'کل اخراجات' : 'Total Expenses'}</span>
                  <span className="text-lg font-black text-rose-700">PKR {totalProductionExpenses.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-400 block">({costPerAcreItemized.toLocaleString()} / ایکڑ)</span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold block">{isSindhi ? 'پيداواري لاڳت في مڻ' : isUrdu ? 'لاگت فی من (Break-even)' : 'Cost per Maund'}</span>
                  <span className="text-lg font-black text-indigo-900">PKR {breakEvenPrice}</span>
                  <span className="text-[10px] text-slate-400 block">Break-even Price</span>
                </div>
              </div>

              {/* Net Profit Banner */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-bold block">
                      {isSindhi ? 'خالص موسمي منافعو (Net Profit):' : isUrdu ? 'خالص موسمی منافع و بچت (Net Seasonal Profit):' : 'Net Seasonal Farm Profit:'}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        netFarmProfit >= 0 ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                      }`}
                    >
                      {roiPercentage}% ROI
                    </span>
                  </div>
                  <div className={`text-3xl font-black ${netFarmProfit >= 0 ? 'text-emerald-800' : 'text-rose-700'}`}>
                    PKR {netFarmProfit.toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={handleClaimReward}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>{isSindhi ? 'منافعو محفوظ ڪريو ⭐' : isUrdu ? 'منافع ریکارڈ کریں ⭐' : 'Save & Claim ⭐'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. SINDH RICE & WHEAT 6-PHASE AGRONOMIC LIFECYCLES */}
      {/* ========================================================================= */}
      {activeTab === 'crops' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Crop Selector: Rice vs Wheat */}
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedCrop('rice');
                  setSelectedPhaseIdx(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  selectedCrop === 'rice'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                🌾 {isSindhi ? 'سنڌ ۾ چانورن جي پوک (Rice)' : isUrdu ? 'سندھ میں دھان کی کاشت (Rice)' : 'Sindh Rice (Paddy)'}
              </button>

              <button
                onClick={() => {
                  setSelectedCrop('wheat');
                  setSelectedPhaseIdx(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  selectedCrop === 'wheat'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                🌱 {isSindhi ? 'سنڌ ۾ ڪڻڪ جي پوک (Wheat)' : isUrdu ? 'سندھ میں گندم کی کاشت (Wheat)' : 'Sindh Wheat (Rabi)'}
              </button>
            </div>

            <button
              onClick={() =>
                speakGuidance(
                  isSindhi
                    ? `${currentPhase.titleSd}: ${currentPhase.keyActionSd} پاڻي: ${currentPhase.waterRuleSd} ڀاڻ: ${currentPhase.fertilizerSd}`
                    : isUrdu
                    ? `${currentPhase.titleUr}: ${currentPhase.keyActionUr} پانی کی ہدایت: ${currentPhase.waterRuleUr} کھاد: ${currentPhase.fertilizerUr}`
                    : `${currentPhase.titleEn}: ${currentPhase.keyActionEn} Water rule: ${currentPhase.waterRuleEn} Fertilizer: ${currentPhase.fertilizerEn}`
                )
              }
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold hover:bg-amber-100"
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>{isSindhi ? 'مرحلو ٻڌو' : isUrdu ? 'مرحلہ سنیں' : 'Listen'}</span>
            </button>
          </div>

          {/* 6-Phase Stepper Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {currentLifecycle.map((phase, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhaseIdx(idx)}
                className={`p-2.5 rounded-2xl text-xs font-bold text-center border transition-all ${
                  selectedPhaseIdx === idx
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-102'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-xl block mb-1">{phase.icon}</span>
                <span className="text-[11px] block font-black">
                  {isSindhi ? `مرحلو ${idx + 1}` : isUrdu ? `مرحلہ ${idx + 1}` : `Stage ${idx + 1}`}
                </span>
                <span className="text-[10px] opacity-80 block truncate">
                  {isSindhi ? phase.titleSd.split('(')[0] : isUrdu ? phase.titleUr.split('(')[0] : phase.titleEn.split('(')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Active Phase Deep Agronomy Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{currentPhase.icon}</span>
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    {isSindhi ? currentPhase.titleSd : isUrdu ? currentPhase.titleUr : currentPhase.titleEn}
                  </h4>
                  <span className="text-xs text-amber-700 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{currentPhase.duration}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <span>🚜</span>
                  <span>{isSindhi ? 'اهم ڪم ۽ احتياط:' : isUrdu ? 'اہم ترین زرعی عمل:' : 'Key Farm Action:'}</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isSindhi ? currentPhase.keyActionSd : isUrdu ? currentPhase.keyActionUr : currentPhase.keyActionEn}
                </p>
              </div>

              <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200 space-y-1">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                  <Droplet className="w-4 h-4 text-blue-600" />
                  <span>{isSindhi ? 'پاڻي جو اصول (Water Rule):' : isUrdu ? 'آبپاشی و پانی کی سطح:' : 'Irrigation Schedule:'}</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isSindhi ? currentPhase.waterRuleSd : isUrdu ? currentPhase.waterRuleUr : currentPhase.waterRuleEn}
                </p>
              </div>

              <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                  <Sprout className="w-4 h-4 text-emerald-600" />
                  <span>{isSindhi ? 'ڀاڻ ۽ مائڪرو نيُوٽرينٽس:' : isUrdu ? 'کھاد اور غذائی اجزاء:' : 'Fertilizer Application:'}</span>
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isSindhi ? currentPhase.fertilizerSd : isUrdu ? currentPhase.fertilizerUr : currentPhase.fertilizerEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. LIVESTOCK VACCINATION & DAIRY ECONOMICS */}
      {/* ========================================================================= */}
      {activeTab === 'livestock' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Daily Dairy Profit Calculator */}
          <div className="bg-blue-50/70 rounded-3xl p-5 md:p-6 border border-blue-300 space-y-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-blue-950 flex items-center gap-2">
                  <span>🥛</span>
                  <span>
                    {isSindhi
                      ? 'روزانو کير ۽ مويشين جي منافعي جو حساب (Dairy Profit)'
                      : isUrdu
                      ? 'روزانہ دودھ کی پیداوار، چارہ لاگت اور ڈیری منافع'
                      : 'Daily Milk Production, Fodder Cost & Dairy Profit Calculator'}
                  </span>
                </h3>
                <p className="text-xs text-blue-800/80 mt-0.5">
                  {isSindhi
                    ? 'ڏڌ کير، چاري جو خرچ ۽ مهيني جي خالص بچت معلوم ڪريو.'
                    : isUrdu
                    ? 'دودھ دینے والے جانور، اوسط دودھ، ونڈا چارہ لاگت اور ماہانہ خالص ڈیری بچت۔'
                    : 'Calculate daily and monthly net dairy income after feed and fodder expenses.'}
                </p>
              </div>

              <button
                onClick={() =>
                  speakGuidance(
                    isSindhi
                      ? `${milkingAnimals} جانورن مان روزانو ${totalDailyMilkLiters} ليٽر کير ٿئي ٿو، چاري جو خرچ ڪڍي روزانو منافعو ${dailyNetDairyProfit} ۽ مهيني جي بچت ${monthlyEstimatedDairyProfit} رپيا آهي.`
                      : isUrdu
                      ? `${milkingAnimals} جانوروں سے روزانہ ${totalDailyMilkLiters} لیٹر دودھ حاصل ہوتا ہے۔ چارہ خرچ نکال کر روزانہ خالص منافع ${dailyNetDairyProfit} اور ماہانہ بچت ${monthlyEstimatedDairyProfit} روپے ہے۔`
                      : `From ${milkingAnimals} animals, daily milk yield is ${totalDailyMilkLiters}L. Net daily profit is PKR ${dailyNetDairyProfit} and monthly profit is PKR ${monthlyEstimatedDairyProfit}.`
                  )
                }
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-blue-900 text-xs font-bold shadow-xs hover:bg-blue-100 border border-blue-200 self-end sm:self-center"
              >
                <Volume2 className="w-4 h-4 text-blue-700" />
                <span>{isSindhi ? 'ڊيري حساب ٻڌو' : isUrdu ? 'ڈیری حساب سنیں' : 'Listen'}</span>
              </button>
            </div>

            {/* Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  {isSindhi ? 'ڏڌ جانورن جو تعداد:' : isUrdu ? 'دودھ دینے والے جانور:' : 'Milking Animals:'}
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={milkingAnimals}
                  onChange={(e) => setMilkingAnimals(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-xs"
                />
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  {isSindhi ? 'اوسط کير (ليٽر/ڏينهن):' : isUrdu ? 'اوسط دودھ (لیٹر فی جانور):' : 'Milk / Animal (Liters/day):'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={litersPerAnimal}
                  onChange={(e) => setLitersPerAnimal(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-xs"
                />
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  {isSindhi ? 'کير جو اگهه (PKR/ليٽر):' : isUrdu ? 'دودھ کی قیمت (PKR فی لیٹر):' : 'Milk Price / Liter (PKR):'}
                </label>
                <input
                  type="number"
                  step="5"
                  value={milkPricePerLiter}
                  onChange={(e) => setMilkPricePerLiter(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-xs"
                />
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1">
                <label className="text-xs font-bold text-slate-700 block">
                  {isSindhi ? 'روزانو چارو ۽ ونڊو (PKR):' : isUrdu ? 'روزانہ چارہ و ونڈا خرچ:' : 'Feed Cost / Animal (PKR):'}
                </label>
                <input
                  type="number"
                  step="50"
                  value={dailyFeedCostPerAnimal}
                  onChange={(e) => setDailyFeedCostPerAnimal(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 font-bold text-xs"
                />
              </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">{isSindhi ? 'روزانو ڪل کير' : isUrdu ? 'روزانہ کل دودھ' : 'Daily Milk'}</span>
                <span className="text-lg font-black text-slate-800">{totalDailyMilkLiters} L</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">{isSindhi ? 'روزانو آمدني' : isUrdu ? 'روزانہ آمدنی' : 'Daily Revenue'}</span>
                <span className="text-lg font-black text-blue-800">PKR {dailyDairyGrossRevenue.toLocaleString()}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">{isSindhi ? 'روزانو چاري خرچ' : isUrdu ? 'روزانہ چارہ خرچ' : 'Daily Feed Cost'}</span>
                <span className="text-lg font-black text-rose-700">PKR {dailyTotalFeedCost.toLocaleString()}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">{isSindhi ? 'مهيني جي خالص بچت' : isUrdu ? 'ماہانہ خالص ڈیری بچت' : 'Monthly Net Profit'}</span>
                <span className="text-lg font-black text-emerald-800">PKR {monthlyEstimatedDairyProfit.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Seasonal Livestock Vaccination Calendar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>
                {isSindhi
                  ? 'مال مويشين جي اهم موسمي ويڪسين جو ڪيلينڊر (Government Schedule):'
                  : isUrdu
                  ? 'مویشیوں کی جان لیوا بیماریوں کا موسمی ویکسین شیڈول:'
                  : 'Livestock Preventive Vaccination Calendar:'}
              </span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VACCINE_SCHEDULE.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    item.isFatal ? 'bg-rose-50/60 border-rose-200' : 'bg-slate-50 border-slate-200'
                  } space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">
                      {isSindhi ? item.diseaseSd : isUrdu ? item.diseaseUr : item.diseaseEn}
                    </span>
                    {item.isFatal && (
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-200 text-rose-900">
                        {isSindhi ? 'جان ليوا (Fatal)' : isUrdu ? 'جان لیوا (Fatal)' : 'High Mortality'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-800">{isSindhi ? 'وقت / مهينو:' : isUrdu ? 'ٹیکہ لگانے کا وقت:' : 'Vaccine Month:'}</strong>{' '}
                    {item.month}
                  </p>

                  <p className="text-xs text-slate-600">
                    <strong className="text-slate-800">{isSindhi ? 'جانور:' : isUrdu ? 'جانور:' : 'Animals:'}</strong>{' '}
                    {item.targetAnimals}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed bg-white/70 p-2.5 rounded-xl border border-slate-200/50">
                    <strong className="text-slate-800">{isSindhi ? 'علامتون:' : isUrdu ? 'علامات:' : 'Symptoms:'}</strong>{' '}
                    {isSindhi ? item.symptomsSd : isUrdu ? item.symptomsUr : item.symptomsEn}
                  </p>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>
                {isSindhi
                  ? 'بيمار جانور کي ترت صحتمند جانورن کان ڌار رکو ۽ ويٽرنري اسپتال جي ڊاڪٽر سان رجوع ڪريو.'
                  : isUrdu
                  ? 'بیمار جانور کو فوری طور پر تندرست جانوروں کے باڑے سے الگ کریں اور قریبی سرکاری ویٹرنری فیلڈ اسٹاف سے رجوع کریں۔'
                  : 'Immediately isolate sick animals and contact your local government veterinary clinic.'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmingLivestockModule;
