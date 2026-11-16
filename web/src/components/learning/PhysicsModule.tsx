import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { tts } from '../../services/tts';
import { awardStarsToActiveProfile } from '../../services/storage';
import {
  Volume2,
  Sun,
  Scale,
  ArrowRight,
  ChevronRight,
  Gauge,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onClose: () => void;
}

type PhysicsTab = 'machines' | 'solar' | 'tubewell';

export const PhysicsModule: React.FC<Props> = ({ onClose }) => {
  const { lang, isUrdu, isSindhi, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<PhysicsTab>('machines');

  // --- SIMPLE MACHINES STATE ---
  const [bucketWeight, setBucketWeight] = useState<number>(20); // kg
  const [pulleyCount, setPulleyCount] = useState<number>(2); // 1, 2, 4
  const [leverFulcrumPos, setLeverFulcrumPos] = useState<number>(50); // % from effort end

  // Mechanical advantage:
  // For pulleys: MA = pulleyCount
  const pulleyEffortKg = (bucketWeight / pulleyCount).toFixed(1);
  const pulleyEffortNewtons = Math.round(Number(pulleyEffortKg) * 9.8);

  // For levers: MA = (100 - fulcrumPos) / fulcrumPos
  const leverMA = Math.max(0.2, (100 - leverFulcrumPos) / Math.max(10, leverFulcrumPos));
  const leverEffortKg = (bucketWeight / leverMA).toFixed(1);

  // --- SOLAR PV SIZING LAB STATE ---
  const [appliances, setAppliances] = useState<{
    id: string;
    nameUr: string;
    nameSd: string;
    nameEn: string;
    icon: string;
    watts: number;
    hours: number;
    enabled: boolean;
    count: number;
  }[]>([
    { id: 'fans', nameUr: 'پنکھے (DC Inverter)', nameSd: 'پنکا (DC Inverter)', nameEn: 'DC Fans (Inverter)', icon: '🌀', watts: 55, hours: 10, enabled: true, count: 3 },
    { id: 'lights', nameUr: 'ایل ای ڈی بلب', nameSd: 'ايل اي ڊي بتيون', nameEn: 'LED Bulbs', icon: '💡', watts: 12, hours: 8, enabled: true, count: 5 },
    { id: 'cooler', nameUr: 'ڈیزرٹ کولر / ٹی وی', nameSd: 'ڪولر يا ٽي وي', nameEn: 'Desert Cooler / TV', icon: '❄️', watts: 120, hours: 5, enabled: false, count: 1 },
    { id: 'waterpump', nameUr: 'چھوٹا واٹر پمپ (0.5 HP)', nameSd: 'ننڍو واٽر پمپ', nameEn: 'Water Pump (0.5 HP)', icon: '💧', watts: 375, hours: 1, enabled: true, count: 1 },
    { id: 'phone', nameUr: 'موبائل چارجرز', nameSd: 'موبائل چارجر', nameEn: 'Mobile Phone Chargers', icon: '📱', watts: 18, hours: 4, enabled: true, count: 3 },
  ]);

  // Solar calculations:
  const totalDailyWh = appliances.reduce((sum, item) => {
    return item.enabled ? sum + item.watts * item.hours * item.count : sum;
  }, 0);

  const solarPanelsWatt = Math.round((totalDailyWh / 4.8) * 1.35); // 4.8 peak sunshine hours + 35% system losses
  const peakLoadWatts = appliances.reduce((sum, item) => {
    return item.enabled ? sum + item.watts * item.count : sum;
  }, 0);
  const inverterWatts = Math.round(peakLoadWatts * 1.5);
  // Night backup Wh (assuming ~50% load used at night):
  const nightWh = totalDailyWh * 0.55;
  const batteryAh12V = Math.round((nightWh / 12) / 0.7); // 70% depth of discharge

  // --- TUBE WELL HYDRAULICS SIMULATOR STATE ---
  const [boreDepth, setBoreDepth] = useState<number>(60); // ft
  const [pipeDiameter, setPipeDiameter] = useState<number>(4); // inches

  // Hydraulics outputs:
  const estimatedGpm = pipeDiameter * pipeDiameter * 28;
  const cusecs = (estimatedGpm / 450).toFixed(2);
  const hoursPerAcreInch = (450 / estimatedGpm).toFixed(1);
  const requiredMotorHp = Math.round((estimatedGpm * boreDepth) / 1980) + (pipeDiameter >= 5 ? 4 : 2);

  // 5-Question Physics Concept Check:
  const [conceptQuestions] = useState([
    {
      qUr: 'کنویں سے پانی بھرتے وقت 2 چرخیوں والا نظام استعمال کرنے سے مطلوبہ انسانی طاقت پر کیا اثر پڑتا ہے؟',
      qSd: 'کوھ مان پاڻي ڀرڻ وقت ٻن چرخين واري نظام سان انساني زور تي ڇا اثر پوندو؟',
      qEn: 'How does using a 2-pulley system affect the lifting force required to pull water from a well?',
      optionsUr: ['طاقت دگنی ہو جاتی ہے', 'طاقت آدھی (50%) ہو جاتی ہے', 'کوئی فرق نہیں پڑتا'],
      optionsSd: ['زور ٻيڻو ٿي ويندو', 'زور اڌ (50 سيڪڙو) رهجي ويندو', 'ڪو فرق نه پوندو'],
      optionsEn: ['Force doubles', 'Force is halved (50%)', 'No change in force'],
      correct: 1,
    },
    {
      qUr: 'سولر پینل بجلی کس اصول کے تحت بناتے ہیں؟',
      qSd: 'سولر پليٽون ڪهڙي اصول تي بجلي ٺاهين ٿيون؟',
      qEn: 'By which physics principle do solar panels generate electricity?',
      optionsUr: ['فوٹو وولٹائک اثر (Photovoltaic Effect)', 'حرکی توانائی', 'کیمیائی دھماکہ'],
      optionsSd: ['فوٽو وولٽائڪ اثر (Photovoltaic Effect)', 'حرڪتي توانائي', 'ڪيميائي دٻاءُ'],
      optionsEn: ['Photovoltaic Effect', 'Kinetic energy', 'Chemical reaction'],
      correct: 0,
    },
  ]);
  const [activeConceptIdx, setActiveConceptIdx] = useState<number>(0);
  const [selectedConceptAns, setSelectedConceptAns] = useState<number | null>(null);

  const speak = (text: string) => {
    tts.speak(text, lang);
  };

  const handleToggleAppliance = (id: string) => {
    setAppliances((prev) =>
      prev.map((item) => (item.id === id ? { ...item, enabled: !item.enabled } : item))
    );
  };

  const handleCheckConcept = (ansIdx: number) => {
    setSelectedConceptAns(ansIdx);
    const q = conceptQuestions[activeConceptIdx];
    if (ansIdx === q.correct) {
      awardStarsToActiveProfile(2);
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      } catch {}
      speak(isSindhi ? 'شاباس! درست سائنسي جواب.' : isUrdu ? 'شاباش! درست سائنسی جواب۔' : 'Correct scientific answer!');
    } else {
      speak(isSindhi ? 'غلط، وري ڪوشش ڪريو.' : isUrdu ? 'غلط، دوبارہ کوشش کریں۔' : 'Incorrect, try again.');
    }
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
              {isSindhi ? 'فزڪس ۽ ڳوٺاڻي توانائي' : isUrdu ? 'طبیعیات و دیہی توانائی' : 'Physics & Energy'}
            </span>
          </div>
          <h2
            className={`text-2xl md:text-3xl font-black text-slate-900 ${
              isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
            }`}
          >
            {isSindhi ? 'فزڪس، توانائي ۽ واٽر فلو (Physics)' : isUrdu ? 'طبیعیات، دیہی توانائی و واٹر فلو (Physics)' : 'Physics & Rural Energy Lab'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isSindhi
              ? 'کوھ جي چرخي جا اصول، سولر پينل ۽ بيٽري، ۽ زرعي ٽيوب ويل واٽر هائيڊرولڪس'
              : isUrdu
              ? 'کنویں کی چرخی کے قوانین، سولر پینل و بیٹری سائزنگ، اور زرعی ٹیوب ویل واٹر فلو'
              : 'Simple machines, solar photovoltaic load sizing & tube well hydraulics'}
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
          onClick={() => setActiveTab('machines')}
          className={`py-3 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'machines'
              ? 'bg-white text-teal-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Scale className="w-4 h-4 text-indigo-700" />
          <span>{isSindhi ? 'سادي مشين ۽ چرخي' : isUrdu ? 'سادہ مشینیں و چرخی' : 'Pulleys & Levers'}</span>
        </button>

        <button
          onClick={() => setActiveTab('solar')}
          className={`py-3 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'solar'
              ? 'bg-white text-teal-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sun className="w-4 h-4 text-amber-500" />
          <span>{isSindhi ? 'سولر ۽ بيٽري سسٽم' : isUrdu ? 'سولر پینل و بیٹری' : 'Solar PV Sizing Lab'}</span>
        </button>

        <button
          onClick={() => setActiveTab('tubewell')}
          className={`py-3 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'tubewell'
              ? 'bg-white text-teal-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Gauge className="w-4 h-4 text-blue-600" />
          <span>{isSindhi ? 'ٽيوب ويل واٽر فلو' : isUrdu ? 'ٹیوب ویل ہائیڈرولکس' : 'Hydraulics Simulator'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SIMPLE MACHINES, PULLEYS & LEVERS SIMULATION */}
      {/* ========================================================================= */}
      {activeTab === 'machines' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-700" />
                <span>
                  {isSindhi
                    ? '1. سادي مشين: کوھ جي چرخي ۽ ليور فورس ليب (Force Lab)'
                    : isUrdu
                    ? '1. سادہ مشینیں: کنویں کی چرخی اور لیور فورس لیب (Force Lab)'
                    : 'Simple Machines: Pulley & Lever Mechanical Advantage'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSindhi
                  ? 'رسيون ۽ چرخي وڌائڻ سان ڏسو ته ڪيئن پاڻي جو وزندار ڊول کڻڻ سولو ٿئي ٿو.'
                  : isUrdu
                  ? 'چرخیوں اور رسیوں کی تعداد بڑھا کر دیکھیں کہ کیسے بھاری ڈول کو اٹھانا آسان ہو جاتا ہے۔'
                  : 'Adjust pulley configurations and lever fulcrum to see mechanical advantage in action.'}
              </p>
            </div>

            <button
              onClick={() =>
                speak(
                  isSindhi
                    ? `${pulleyCount} چرخين سان ${bucketWeight} ڪلو وزن رڳو ${pulleyEffortKg} ڪلو جي زور سان مٿي اچي ٿو.`
                    : isUrdu
                    ? `${pulleyCount} چرخیوں کے ساتھ ${bucketWeight} کلو وزنی ڈول محض ${pulleyEffortKg} کلو کی طاقت سے اوپر آ جاتا ہے۔`
                    : `With ${pulleyCount} pulleys, a ${bucketWeight}kg load requires only ${pulleyEffortKg}kg of lifting effort.`
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-800 text-xs font-bold hover:bg-indigo-100 border border-indigo-200"
            >
              <Volume2 className="w-4 h-4 text-indigo-700" />
              <span>{t('listenAudio')}</span>
            </button>
          </div>

          {/* Interactive Pulley Simulator Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 items-center">
            {/* Left: Interactive Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isSindhi ? 'پاڻي جي ڊول جو وزن (Load Weight):' : isUrdu ? 'پانی کے ڈول کا وزن (Load Weight):' : 'Water Bucket Weight:'}
                </label>
                <input
                  type="range"
                  min="10"
                  max="60"
                  step="5"
                  value={bucketWeight}
                  onChange={(e) => setBucketWeight(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <span className="text-sm font-black text-indigo-900">{bucketWeight} kg (~{bucketWeight * 10} Newtons)</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isSindhi ? 'چرخين جو تعداد (Pulley System):' : isUrdu ? 'چرخیوں کی تعداد (Pulley System):' : 'Number of Pulleys:'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { count: 1, labelUr: '1 رسی (سیدھا)', labelSd: '1 چرخي', labelEn: '1 Pulley (1:1)' },
                    { count: 2, labelUr: '2 چرخیاں (نصف زور)', labelSd: '2 چرخيون', labelEn: '2 Pulleys (2:1)' },
                    { count: 4, labelUr: '4 چرخیاں (چوتھائی)', labelSd: '4 چرخيون', labelEn: '4 Pulleys (4:1)' },
                  ].map((p) => (
                    <button
                      key={p.count}
                      onClick={() => setPulleyCount(p.count)}
                      className={`min-h-[52px] p-2 rounded-xl text-xs font-black transition-all ${
                        pulleyCount === p.count
                          ? 'bg-indigo-700 text-white shadow-md'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                      }`}
                    >
                      <span>{isSindhi ? p.labelSd : isUrdu ? p.labelUr : p.labelEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Lever Fulcrum Position Slider */}
              <div className="pt-2 border-t border-slate-200">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isSindhi ? 'هينڊ پمپ / ليور فلڪرم پوزيشن:' : isUrdu ? 'ہینڈ پمپ ہینڈل کا فلکرم (Fulcrum Pivot):' : 'Lever Fulcrum Pivot Position:'}
                </label>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="5"
                  value={leverFulcrumPos}
                  onChange={(e) => setLeverFulcrumPos(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1">
                  <span>← چھوٹا ہینڈل</span>
                  <span>درمیانہ (50%)</span>
                  <span>لمبا ہینڈل (آسان زور) →</span>
                </div>
                <div className="flex justify-between items-center bg-indigo-50/70 p-2 rounded-xl text-xs mt-2 border border-indigo-100">
                  <span className="font-bold text-slate-700">
                    {isSindhi ? 'ليور جو ميڪينيڪل فائدو:' : isUrdu ? 'لیور مکینیکل فائدہ:' : 'Lever Mechanical Adv:'}
                  </span>
                  <span className="font-black text-indigo-950">
                    {leverMA.toFixed(1)}x ({leverEffortKg} kg {isSindhi ? 'زور' : isUrdu ? 'طاقت' : 'effort'})
                  </span>
                </div>
              </div>
            </div>

            {/* Right: SVG Physics Machine Visualizer */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col items-center justify-center min-h-[260px] text-center space-y-3">
              <svg className="w-56 h-36" viewBox="0 0 240 140">
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
                  </marker>
                </defs>
                {/* Overhead beam */}
                <rect x="20" y="15" width="200" height="8" rx="3" fill="#475569" />
                {/* Pulley wheels */}
                <circle cx="80" cy="35" r="14" fill="#64748b" stroke="#334155" strokeWidth="2" />
                <circle cx="80" cy="35" r="4" fill="#ffffff" />
                {pulleyCount >= 2 && (
                  <>
                    <circle cx="160" cy="70" r="14" fill="#64748b" stroke="#334155" strokeWidth="2" />
                    <circle cx="160" cy="70" r="4" fill="#ffffff" />
                  </>
                )}
                {/* Ropes */}
                <line x1="80" y1="35" x2="80" y2="120" stroke="#0284c7" strokeWidth="3" strokeDasharray="4 2" />
                {pulleyCount >= 2 && (
                  <line x1="160" y1="35" x2="160" y2="70" stroke="#0284c7" strokeWidth="3" strokeDasharray="4 2" />
                )}
                {/* Water Bucket Load */}
                <rect x="65" y="90" width="30" height="35" rx="4" fill="#0284c7" />
                <text x="80" y="112" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
                  {bucketWeight}kg
                </text>
                {/* Force arrow */}
                <path d="M 180 120 L 180 85" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
              </svg>

              <div className="w-full grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                <div className="bg-indigo-50 p-2.5 rounded-xl">
                  <span className="text-[10px] text-indigo-700 font-bold block">{isSindhi ? 'گهربل زور (Effort)' : isUrdu ? 'مطلوبہ طاقت (زور)' : 'Required Force'}</span>
                  <span className="text-lg font-black text-indigo-950">{pulleyEffortKg} kg</span>
                  <span className="text-[10px] text-slate-500 block">({pulleyEffortNewtons} N)</span>
                </div>

                <div className="bg-emerald-50 p-2.5 rounded-xl">
                  <span className="text-[10px] text-emerald-700 font-bold block">{isSindhi ? 'طاقت جي بچت' : isUrdu ? 'مکینیکل فائدہ' : 'Mechanical Adv.'}</span>
                  <span className="text-lg font-black text-emerald-800">{pulleyCount}:1 Ratio</span>
                  <span className="text-[10px] text-slate-500 block">
                    {pulleyCount === 1 ? '0% بچت' : pulleyCount === 2 ? '50% آسان' : '75% آسان'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: RURAL SOLAR PV & BATTERY SIZING LAB */}
      {/* ========================================================================= */}
      {activeTab === 'solar' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-500" />
                <span>
                  {isSindhi
                    ? '2. ڳوٺاڻو سولر پينل ۽ بيٽري سائزنگ ليب (Solar Lab)'
                    : isUrdu
                    ? '2. دیہی سولر پینل و بیٹری سائزنگ لیب (Solar Lab)'
                    : 'Rural Solar PV Array & Battery Sizing Lab'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSindhi
                  ? 'گهر جا پنکا، بتيون ۽ واٽر پمپ آن/آف ڪريو ته جيئن سولر پليٽن جي واٽ ۽ بيٽري ايمپيئر نڪرن.'
                  : isUrdu
                  ? 'پنکھے، بلب اور موٹر کا لوڈ آن/آف کریں اور دیکھیں کہ کتنے واٹ کے پینل اور ایمپیئر بیٹری درکار ہے۔'
                  : 'Toggle appliances on/off to calculate daily Watt-hours, solar array wattage, and battery Ah.'}
              </p>
            </div>

            <button
              onClick={() =>
                speak(
                  isSindhi
                    ? `روزانو بجلي جو خرچ ${totalDailyWh} واٽ آور آهي. اوهان کي ${solarPanelsWatt} واٽ جون سولر پليٽون ۽ ${batteryAh12V} ايمپيئر بيٽري گهرجي.`
                    : isUrdu
                    ? `روزانہ بجلی کی کھپت ${totalDailyWh} واٹ آور ہے۔ مطلوبہ سولر پینل ${solarPanelsWatt} واٹ اور بیٹری ${batteryAh12V} ایمپیئر آور ہے۔`
                    : `Daily load is ${totalDailyWh} Watt-hours. Recommended solar array is ${solarPanelsWatt}W with ${batteryAh12V}Ah battery bank.`
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 text-amber-900 text-xs font-bold hover:bg-amber-100 border border-amber-200"
            >
              <Volume2 className="w-4 h-4 text-amber-700" />
              <span>{t('listenAudio')}</span>
            </button>
          </div>

          {/* Interactive Appliance Toggle Board */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-700 block">
              {isSindhi ? 'بجلي جو سامان چونڊيو (Click to Toggle Appliances):' : isUrdu ? 'بجلی کا سامان آن/آف کریں (Click to Toggle Appliances):' : 'Appliance Load Selection:'}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {appliances.map((app) => (
                <button
                  key={app.id}
                  onClick={() => handleToggleAppliance(app.id)}
                  className={`p-4 rounded-2xl border-2 text-start transition-all flex items-start justify-between min-h-[90px] ${
                    app.enabled
                      ? 'border-amber-500 bg-amber-50/60 shadow-xs'
                      : 'border-slate-200 bg-slate-50 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{app.icon}</span>
                    <div>
                      <span className="font-bold text-sm block text-slate-900">
                        {isSindhi ? app.nameSd : isUrdu ? app.nameUr : app.nameEn}
                      </span>
                      <span className="text-xs text-slate-500 block">
                        {app.count} unit(s) • {app.watts}W each • {app.hours}h/day
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      app.enabled ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {app.enabled ? 'ON' : 'OFF'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Solar Engineering Recommendations Banner */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white p-6 rounded-2xl shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/20">
              <span className="text-xs font-black uppercase tracking-wider text-amber-100">
                {isSindhi ? 'سولر انجنيئرنگ تجويزون (Sizing Metrics):' : isUrdu ? 'سولر انجینئرنگ نتائج و تجاویز (Sizing Metrics):' : 'Solar Hardware Sizing Results:'}
              </span>
              <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                {totalDailyWh} Wh / Day
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <span className="text-[10px] text-amber-100 font-bold block">{isSindhi ? 'سولر پليٽون' : isUrdu ? 'سولر پلیٹیں' : 'Solar Array'}</span>
                <span className="text-xl font-black">{solarPanelsWatt} W</span>
                <span className="text-[10px] text-amber-200 block mt-0.5">
                  (~{Math.max(1, Math.ceil(solarPanelsWatt / 550))} × 550W Panels)
                </span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <span className="text-[10px] text-amber-100 font-bold block">{isSindhi ? 'انورٽر' : isUrdu ? 'انورٹر' : 'Inverter'}</span>
                <span className="text-xl font-black">{inverterWatts} W</span>
                <span className="text-[10px] text-amber-200 block mt-0.5">Surge Protected</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <span className="text-[10px] text-amber-100 font-bold block">{isSindhi ? 'رات جي بيٽري' : isUrdu ? 'رات کی بیٹری' : 'Night Battery'}</span>
                <span className="text-xl font-black">{batteryAh12V} Ah</span>
                <span className="text-[10px] text-amber-200 block mt-0.5">12V Deep Cycle</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-xl border border-white/20">
                <span className="text-[10px] text-amber-100 font-bold block">{isSindhi ? 'چارج ڪنٽرولر' : isUrdu ? 'چارج کنٹرولر' : 'Controller'}</span>
                <span className="text-xl font-black">MPPT 40A</span>
                <span className="text-[10px] text-amber-200 block mt-0.5">98% Peak Eff.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TUBE WELL HYDRAULICS & WATER FLOW SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'tubewell' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-blue-600" />
                <span>
                  {isSindhi
                    ? '3. زرعي ٽيوب ويل واٽر هائيڊرولڪس (Tube Well Hydraulics)'
                    : isUrdu
                    ? '3. زرعی ٹیوب ویل واٹر ہائیڈرولکس و فلو ریٹ (Hydraulics)'
                    : 'Agricultural Tube Well Hydraulics & Water Flow Simulator'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSindhi
                  ? 'ٻورنگ جي اونهائي ۽ پائپ جي سائيز مان ڪيوسڪ ۽ ڊيزل پيٽر انجڻ يا سولر موٽر جو حساب.'
                  : isUrdu
                  ? 'بورنگ کی گہرائی اور پائپ قطر سے پانی کے بہاؤ (کیوسک) اور موٹر ہارس پاور کا سائنسی حساب۔'
                  : 'Calculate water discharge rate (GPM/Cusecs), acre-inch time, and required motor Horsepower.'}
              </p>
            </div>

            <button
              onClick={() =>
                speak(
                  isSindhi
                    ? `${boreDepth} فٽ کوٽائي ۽ ${pipeDiameter} انچ پائپ مان پاڻي جو وهڪرو ${estimatedGpm} گيلن في منٽ (${cusecs} ڪيوسڪ) آهي. 1 ايڪڙ انچ لاءِ ${hoursPerAcreInch} ڪلاڪ لڳندا.`
                    : isUrdu
                    ? `${boreDepth} فٹ گہرائی اور ${pipeDiameter} انچ پائپ سے پانی کا بہاؤ ${estimatedGpm} گیلن فی منٹ (${cusecs} کیوسک) ہے۔ 1 ایکڑ انچ آبپاشی کے لیے ${hoursPerAcreInch} گھنٹے درکار ہیں۔`
                    : `At ${boreDepth}ft depth and ${pipeDiameter}in pipe, discharge is ${estimatedGpm} GPM (${cusecs} Cusecs). 1 acre-inch takes ${hoursPerAcreInch} hours.`
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 text-blue-800 text-xs font-bold hover:bg-blue-100 border border-blue-200"
            >
              <Volume2 className="w-4 h-4 text-blue-700" />
              <span>{t('listenAudio')}</span>
            </button>
          </div>

          {/* Interactive Hydraulics Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isSindhi ? 'پاڻي جي کوٽائي (Bore Depth / Head):' : isUrdu ? 'پانی کی سطح و گہرائی (Bore Depth / Head):' : 'Bore Depth / Total Head:'}
              </label>
              <input
                type="range"
                min="30"
                max="180"
                step="10"
                value={boreDepth}
                onChange={(e) => setBoreDepth(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
              <span className="text-sm font-black text-blue-900">{boreDepth} feet</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {isSindhi ? 'ڊليوري پائپ جي سائيز (Pipe Diameter):' : isUrdu ? 'پائپ کا قطر (Delivery Pipe Diameter):' : 'Delivery Pipe Diameter:'}
              </label>
              <div className="flex gap-2">
                {[3, 4, 5, 6].map((diam) => (
                  <button
                    key={diam}
                    onClick={() => setPipeDiameter(diam)}
                    className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                      pipeDiameter === diam
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                    }`}
                  >
                    {diam}&quot;
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Hydraulic Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <span className="text-[10px] text-blue-700 font-bold block">{isSindhi ? 'پاڻي جو وهڪرو' : isUrdu ? 'پانی کا بہاؤ (Discharge)' : 'Flow Rate'}</span>
              <span className="text-xl font-black text-blue-950">{estimatedGpm} GPM</span>
              <span className="text-[10px] text-slate-500 block">({cusecs} Cusecs)</span>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
              <span className="text-[10px] text-emerald-700 font-bold block">{isSindhi ? '1 ايڪڙ انچ وقت' : isUrdu ? '1 ایکڑ انچ کا وقت' : '1 Acre-Inch Time'}</span>
              <span className="text-xl font-black text-emerald-950">{hoursPerAcreInch} hours</span>
              <span className="text-[10px] text-slate-500 block">per acre inch</span>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
              <span className="text-[10px] text-amber-800 font-bold block">{isSindhi ? 'گهربل موٽر' : isUrdu ? 'مطلوبہ ہارس پاور' : 'Required Motor'}</span>
              <span className="text-xl font-black text-amber-950">{requiredMotorHp} HP</span>
              <span className="text-[10px] text-slate-500 block">Solar or Diesel Peter</span>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
              <span className="text-[10px] text-purple-700 font-bold block">{isSindhi ? 'سولر پينل تجويز' : isUrdu ? 'سولر پلیٹ تجویز' : 'Solar Pump Array'}</span>
              <span className="text-base font-black text-purple-950">{Math.ceil(requiredMotorHp * 1.3)} kW</span>
              <span className="text-[10px] text-slate-500 block">VFD Inverter</span>
            </div>
          </div>

          {/* Concept Check Question */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-teal-700" />
              <span>{isSindhi ? 'فزڪس تصور جي جانچ (Concept Check):' : isUrdu ? 'فزکس کا تصوراتی سوال (Concept Check):' : 'Physics Concept Check:'}</span>
            </h4>
            <p className="text-sm font-bold text-slate-800">
              {isSindhi ? conceptQuestions[activeConceptIdx].qSd : isUrdu ? conceptQuestions[activeConceptIdx].qUr : conceptQuestions[activeConceptIdx].qEn}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {(isSindhi ? conceptQuestions[activeConceptIdx].optionsSd : isUrdu ? conceptQuestions[activeConceptIdx].optionsUr : conceptQuestions[activeConceptIdx].optionsEn).map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleCheckConcept(i)}
                  className={`p-3 rounded-xl text-xs font-bold border transition-all text-start ${
                    selectedConceptAns === i
                      ? i === conceptQuestions[activeConceptIdx].correct
                        ? 'bg-emerald-100 border-emerald-600 text-emerald-950 font-black'
                        : 'bg-rose-100 border-rose-600 text-rose-950'
                      : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {selectedConceptAns !== null && (
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => {
                    setActiveConceptIdx((prev) => (prev + 1) % conceptQuestions.length);
                    setSelectedConceptAns(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-black hover:bg-teal-800 transition-colors shadow-xs"
                >
                  {isSindhi ? 'ايندڙ سوال ←' : isUrdu ? 'اگلا سوال ←' : 'Next Question →'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysicsModule;
