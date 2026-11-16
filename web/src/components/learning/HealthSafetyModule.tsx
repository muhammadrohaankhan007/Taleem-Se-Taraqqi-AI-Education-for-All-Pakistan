import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { evaluateSafetyRules } from '../../services/safetyEngine';
import { tts } from '../../services/tts';
import {
  PhoneCall,
  AlertOctagon,
  Ban,
  CheckCircle,
  Search,
  Hospital,
  Ambulance,
  HeartPulse,
  Flame,
  Zap,
  Activity,
  ShieldAlert,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface Props {
  onClose: () => void;
}

type FirstAidTopic = 'snakebite' | 'heatstroke' | 'shock' | 'bleeding' | 'chestpain';

export const HealthSafetyModule: React.FC<Props> = ({ onClose }) => {
  const { lang, isUrdu, isSindhi, t } = useLanguage();
  const [activeFirstAid, setActiveFirstAid] = useState<FirstAidTopic>('snakebite');
  const [query, setQuery] = useState('');
  const [safetyResult, setSafetyResult] = useState(() => evaluateSafetyRules(''));
  const [demoCallToast, setDemoCallToast] = useState(false);

  const handleInputChange = (text: string) => {
    setQuery(text);
    const result = evaluateSafetyRules(text);
    setSafetyResult(result);

    if (result.type === 'emergency') {
      const voice = isSindhi
        ? 'خبردار! هيمرجنسي الرٽ ظاهر ٿيو آهي. فوري ايمبولينس 1122 کي ڪال ڪريو.'
        : isUrdu
          ? 'خبردار! ہنگامی ایمرجنسی الرٹ۔ فوری طور پر 1122 یا اسپتال سے رجوع کریں۔'
          : 'Warning! Emergency red-flag detected. Call ambulance 1122 immediately.';
      tts.speak(voice, lang);
    } else if (result.type === 'refusal') {
      const voice = isSindhi
        ? 'معاف ڪجو! هي ايپ دوائن جو مقدار يا خوراڪ نٿي ٻڌائي سگهي. مستند ڊاڪٽر سان رجوع ڪريو.'
        : isUrdu
          ? 'معذرت! یہ ایپ کسی بھی دوا کا نام یا خوراک تجویز نہیں کر سکتی۔ مستند ڈاکٹر سے رجوع کریں۔'
          : 'Prescription refused. This app strictly does not provide medication dosages. Consult a certified doctor.';
      tts.speak(voice, lang);
    }
  };

  const handleQuickChip = (phrase: string) => {
    handleInputChange(phrase);
  };

  const handleTriggerDemoCall = () => {
    setDemoCallToast(true);
    setTimeout(() => setDemoCallToast(false), 3500);
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
              {isSindhi ? 'صحت ۽ فرسٽ ايڊ' : isUrdu ? 'صحت و فرسٹ ایڈ' : 'Health & Safety'}
            </span>
          </div>
          <h2
            className={`text-2xl md:text-3xl font-black text-slate-900 ${
              isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
            }`}
          >
            {isSindhi
              ? 'صحت، فرسٽ ايڊ ۽ ايمرجنسي فلٽر'
              : isUrdu
              ? 'صحت، ابتدائی طبی امداد اور ایمرجنسی فلٹر'
              : 'Health, First Aid & Safety Triage Portal'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isSindhi
              ? 'ريسڪيو 1122 هدايتون، نانگ جو چڪ، لو لڳڻ، رت روڪڻ ۽ دوائن جو سخت انڪار'
              : isUrdu
              ? 'ریسکیو 1122 ہدایات، سانپ کاٹنے کا پروٹوکول، لو لگنا اور طبی نسخے کا سخت انکار'
              : 'Deterministic Red-Flag Triage, First Aid Protocols & Medical Dosage Refusal'}
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

      {/* Demo Call Toast */}
      {demoCallToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-rose-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-200 border border-rose-700">
          <Ambulance className="w-6 h-6 text-amber-300 animate-pulse" />
          <div>
            <p className="text-xs font-bold">[CALL TRIGGERED: 1122]</p>
            <p className="text-xs opacity-90">In cellular environment, initiates cellular call to Rescue 1122.</p>
          </div>
        </div>
      )}

      {/* Part 1: First Aid Visual Guide Protocols */}
      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-4">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-rose-600" />
          <span>
            {isSindhi
              ? 'ضروري فرسٽ ايڊ گائيڊ (Immediate First Aid Action):'
              : isUrdu
                ? 'فوری ابتدائی طبی امداد کے رہنما اصول:'
                : 'Immediate First Aid Emergency Protocols:'}
          </span>
        </h3>

        {/* First Aid Navigation Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <button
            onClick={() => setActiveFirstAid('snakebite')}
            className={`p-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${activeFirstAid === 'snakebite'
                ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
          >
            <span>🐍</span>
            <span>{isSindhi ? 'نانگ جو چڪ' : isUrdu ? 'سانپ کاٹنا' : 'Snakebite'}</span>
          </button>

          <button
            onClick={() => setActiveFirstAid('heatstroke')}
            className={`p-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${activeFirstAid === 'heatstroke'
                ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-300" />
            <span>{isSindhi ? 'شديد گرمي / لو' : isUrdu ? 'لو لگنا / ہیٹ اسٹروک' : 'Heatstroke'}</span>
          </button>

          <button
            onClick={() => setActiveFirstAid('shock')}
            className={`p-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${activeFirstAid === 'shock'
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
          >
            <Zap className="w-3.5 h-3.5 text-indigo-300" />
            <span>{isSindhi ? 'بجليءَ جو ڪرنٽ' : isUrdu ? 'بجلی کا کرنٹ' : 'Electric Shock'}</span>
          </button>

          <button
            onClick={() => setActiveFirstAid('bleeding')}
            className={`p-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${activeFirstAid === 'bleeding'
                ? 'bg-red-700 text-white border-red-800 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-300" />
            <span>{isSindhi ? 'شدید رت وهڻ' : isUrdu ? 'شدید خون بہنا' : 'Severe Bleeding'}</span>
          </button>

          <button
            onClick={() => setActiveFirstAid('chestpain')}
            className={`p-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${activeFirstAid === 'chestpain'
                ? 'bg-purple-700 text-white border-purple-800 shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
          >
            <Activity className="w-3.5 h-3.5 text-purple-300" />
            <span>{isSindhi ? 'سينئي ۾ سور' : isUrdu ? 'سینے میں درد' : 'Chest Pain'}</span>
          </button>
        </div>

        {/* Selected Protocol Details Card */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-xs leading-relaxed space-y-3">
          {activeFirstAid === 'snakebite' && (
            <div className="space-y-2">
              <span className="font-black text-rose-900 text-sm block">
                🐍 {isSindhi ? 'نانگ يا وڇونءَ جي چڪ جا ضروري اصول:' : isUrdu ? 'سانپ یا بچھو کے کاٹنے پر فوری اقدامات:' : 'Snakebite Protocol (Anti-Snake Venom):'}
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>{isSindhi ? 'سڪون رکو:' : isUrdu ? 'مریض کو ساکت رکھیں:' : 'Keep Patient Still:'}</strong> {isSindhi ? 'هلڻ يا ڊوڙڻ سان زهر رت ۾ تيزي سان پکڙجي ٿو.' : isUrdu ? 'چلنے پھرنے سے زہر خون میں تیزی سے پھیلتا ہے۔' : 'Movement accelerates venom spread.'}</li>
                <li><strong>{isSindhi ? 'ڪٽ نه هڻو:' : isUrdu ? 'کٹ یا چیرا ہرگز نہ لگائیں:' : 'Do NOT Cut or Incise:'}</strong> {isSindhi ? 'زخم تي ڪٽ هڻڻ يا وات سان چوسڻ سخت نقصانڪار آهي.' : isUrdu ? 'زخم پر چیرا لگانا یا منہ سے زہر چوسنا سخت جان لیوا ہے۔' : 'Never cut, suck venom, or apply kerosene.'}</li>
                <li><strong>{isSindhi ? 'دل کان هيٺ رکو:' : isUrdu ? 'عضو کو دل سے نیچے رکھیں:' : 'Immobilize Below Heart Level:'}</strong> {isSindhi ? 'متاثر هٿ يا پير کي پٽي سان ٻڌي دل کان هيٺ رکو.' : isUrdu ? 'ڈسے ہوئے ہاتھ یا پیر کو بغیر سخت باندھے دل کی سطح سے نیچے رکھیں۔' : 'Immobilize limb with splint below heart.'}</li>
                <li><strong>{isSindhi ? 'اسپتال پهچو:' : isUrdu ? 'قریبی ASV اسپتال پہنچیں:' : 'Rush to ASV Hospital:'}</strong> {isSindhi ? 'فوري تعلقي اسپتال وڃي اينٽي سنيڪ وينم (ASV) لڳرايو.' : isUrdu ? 'فوری سرکاری اسپتال جائیں جہاں اینٹی اسنیک وینم انجکشن موجود ہو۔' : 'Locate nearest hospital stocking Anti-Snake Venom.'}</li>
              </ul>
            </div>
          )}

          {activeFirstAid === 'heatstroke' && (
            <div className="space-y-2">
              <span className="font-black text-amber-900 text-sm block">
                ☀️ {isSindhi ? 'سخت گرمي ۽ لو (Heatstroke & Dehydration):' : isUrdu ? 'شدید گرمی اور لو لگنا (ہیٹ اسٹروک):' : 'Heatstroke & Dehydration First Aid:'}
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>{isSindhi ? 'ڇانو ۾ آڻيو:' : isUrdu ? 'فوری چھاؤں میں لائیں:' : 'Move to Shade:'}</strong> {isSindhi ? 'مريض کي تيز اس مان ڪڍي ٿڌي هوا يا پنکي هيٺ رکو.' : isUrdu ? 'مریض کو دھوپ سے ہٹا کر فوری سایہ دار ہوادار جگہ پر لٹائیں۔' : 'Move victim out of direct sunlight immediately.'}</li>
                <li><strong>{isSindhi ? 'پاڻي جون پٽيون:' : isUrdu ? 'ٹھنڈے پانی کی پٹیاں:' : 'Cold Water Sponging:'}</strong> {isSindhi ? 'ڳچي، ڪڇن ۽ پيشاني تي ٿڌي پاڻي جون پٽيون رکو.' : isUrdu ? 'گردن، بغلوں اور ماتھے پر ٹھنڈے گیلے کپڑے کی پٹیاں رکھیں۔' : 'Apply cold water compresses to neck, armpits, and forehead.'}</li>
                <li><strong>{isSindhi ? 'او آر ايس نمڪول:' : isUrdu ? 'او آر ایس یا نمکول:' : 'ORS Solution:'}</strong> {isSindhi ? 'جيڪڏهن مريض هوش ۾ هجي ته نمڪول يا ليمن جو شربت پيئاريو.' : isUrdu ? 'اگر مریض ہوش میں ہے تو نمکول، او آر ایس یا لیموں پانی پلائیں۔' : 'Administer ORS if patient is conscious.'}</li>
              </ul>
            </div>
          )}

          {activeFirstAid === 'shock' && (
            <div className="space-y-2">
              <span className="font-black text-indigo-900 text-sm block">
                ⚡ {isSindhi ? 'بجليءَ جو ڪرنٽ (Electric Shock Protocol):' : isUrdu ? 'بجلی کا کرنٹ لگنے پر فوری کارروائی:' : 'Electric Shock Protocol:'}
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>{isSindhi ? 'هٿ نه لڳايو:' : isUrdu ? 'براہ راست ہاتھ نہ لگائیں:' : 'Do NOT Touch Directly:'}</strong> {isSindhi ? 'سڌو هٿ لڳائڻ سان بچائيندڙ کي به ڪرنٽ لڳي ويندو.' : isUrdu ? 'بغیر سوئیچ بند کیے متاثرہ شخص کو ہرگز نہ چھوئیں۔' : 'Never touch victim while current is flowing.'}</li>
                <li><strong>{isSindhi ? 'مين سوئچ بند ڪريو:' : isUrdu ? 'مین سوئچ یا بریکر بند کریں:' : 'Switch Off Main Breaker:'}</strong> {isSindhi ? 'سڀ کان اڳ بجلي جو مين بٽڻ يا فيوز ڪڍو.' : isUrdu ? 'فوری بجلی کا مین سوئچ آف کریں یا فیوز نکالیں۔' : 'Kill power supply at breaker immediately.'}</li>
                <li><strong>{isSindhi ? 'سڪل ڪاٺي جو استعمال:' : isUrdu ? 'خشک لکڑی یا پلاسٹک:' : 'Use Dry Wooden Stick:'}</strong> {isSindhi ? 'جيڪڏهن بجلي بند نه ٿئي ته سڪل لٺ سان تار پري ڪريو.' : isUrdu ? 'اگر سوئچ دور ہو تو خشک ڈنڈے یا پلاسٹک سے تار کو دور ہٹائیں۔' : 'Separate wire using dry non-conductive wood.'}</li>
              </ul>
            </div>
          )}

          {activeFirstAid === 'bleeding' && (
            <div className="space-y-2">
              <span className="font-black text-red-900 text-sm block">
                🩸 {isSindhi ? 'شدید رت وهڻ تي ڪنٽرول (Hemorrhage Control):' : isUrdu ? 'شدید خون بہنے کا ہنگامی تدارک:' : 'Severe Bleeding & Hemorrhage Control:'}
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>{isSindhi ? 'سڌو دٻاءُ ڏيو:' : isUrdu ? 'زخم پر براہ راست دباؤ:' : 'Direct Pressure:'}</strong> {isSindhi ? 'صاف ڪپڙو يا پٽي زخم تي رکي هٿ سان زور سان دٻايو.' : isUrdu ? 'صاف کپڑے یا پٹی سے زخم پر ہتھیلی سے مسلسل مضبوط دباؤ ڈالیں۔' : 'Apply firm, continuous manual pressure on wound.'}</li>
                <li><strong>{isSindhi ? 'پٽي هٽايو نه:' : isUrdu ? 'کپڑا مت ہٹائیں:' : 'Do NOT Remove Cloth:'}</strong> {isSindhi ? 'جيڪڏهن رت ڀرججي وڃي ته مٿان نئون ڪپڙو رکو، هيٺيون نه ڪڍو.' : isUrdu ? 'خون سے لت پت کپڑا نہ ہٹائیں، بلکہ اس کے اوپر مزید کپڑا رکھ کر دبائیں۔' : 'Add layers on top; do not peel off clotted layers.'}</li>
              </ul>
            </div>
          )}

          {activeFirstAid === 'chestpain' && (
            <div className="space-y-2">
              <span className="font-black text-purple-900 text-sm block">
                💔 {isSindhi ? 'سينئي ۾ سور ۽ دل جو دورو (Chest Pain Triage):' : isUrdu ? 'سینے میں شدید درد اور ہارٹ اٹیک پروٹوکول:' : 'Chest Pain & Cardiac Triage Protocol:'}
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>{isSindhi ? 'مريض کي ويهاريو:' : isUrdu ? 'مریض کو آرام سے بٹھائیں:' : 'Sit Patient Upright:'}</strong> {isSindhi ? 'مريض کي هلڻ يا ليٽڻ نه ڏيو، تکيي سان ويهاريو.' : isUrdu ? 'مریض کو فوراً پرسکون بٹھا دیں اور کپڑے ڈھیلے کریں۔' : 'Sit patient upright; loosen tight clothing.'}</li>
                <li><strong>{isSindhi ? 'فوري 1122 ڪال ڪريو:' : isUrdu ? 'فوری 1122 کال کریں:' : 'Call 1122 Immediately:'}</strong> {isSindhi ? 'دل جو دورو ٿي سگهي ٿو، هرگز اسپتال پهچڻ ۾ دير نه ڪريو.' : isUrdu ? 'ہارٹ اٹیک کی صورت میں وقت سب سے قیمتی ہے۔ فوری ایمبولینس کال کریں۔' : 'Immediate emergency transfer to cardiac facility.'}</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Part 2: Search Bar / Symptom Query & Safety Guardrail Filter */}
      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 space-y-3">
        <label className="block text-xs font-bold text-slate-700">
          {isSindhi ? 'علامت، تڪليف يا سوال لکو:' : isUrdu ? 'علامت، تکلیف یا سوال درج کریں:' : 'Enter Health Symptom or Query:'}
        </label>
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute top-3.5 right-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={
              isSindhi
                ? 'مثال: سينئي ۾ سخت سور، نانگ جو چڪ، ٻار کي ڪيتري دوا ڏيان...'
                : isUrdu
                  ? 'مثال: سینے میں شدید درد، سانپ نے کاٹ لیا، بچے کو کتنی گولی دوں؟'
                  : 'Example: Chest pain, snakebite, how much medicine dosage...'
            }
            className="w-full bg-white rounded-2xl px-4 py-3.5 pl-11 border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium"
          />
        </div>

        {/* Quick Testing Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs text-slate-500 font-bold">
            {isSindhi ? 'آزمائشي فقرا:' : isUrdu ? 'آزمائشی فقرے (Tap):' : 'Test Triggers:'}
          </span>
          <button
            onClick={() => handleQuickChip('میرے سینے میں شدید درد ہے اور سانس رک رہی ہے')}
            className="px-3 py-1.5 rounded-xl bg-white border border-rose-300 hover:bg-rose-50 text-rose-800 text-xs font-bold transition-all shadow-xs"
          >
            💔 سینے میں شدید درد
          </button>
          <button
            onClick={() => handleQuickChip('کھیت میں سانپ نے کاٹ لیا ہے')}
            className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-50 text-amber-800 text-xs font-bold transition-all shadow-xs"
          >
            🐍 سانپ کا کاٹنا
          </button>
          <button
            onClick={() => handleQuickChip('بھینس اٹھ نہیں پا رہی اور بیٹھ گئی ہے')}
            className="px-3 py-1.5 rounded-xl bg-white border border-amber-300 hover:bg-amber-50 text-amber-800 text-xs font-bold transition-all shadow-xs"
          >
            🐄 بھینس بیٹھ گئی (Downer)
          </button>
          <button
            onClick={() => handleQuickChip('بچے کو بخار کے لیے کتنی گولی یا سیرپ دوں؟')}
            className="px-3 py-1.5 rounded-xl bg-white border border-blue-300 hover:bg-blue-50 text-blue-800 text-xs font-bold transition-all shadow-xs"
          >
            💊 کتنی گولی دوں؟ (Dosage)
          </button>
        </div>
      </div>

      {/* Outcome State 1: Emergency Red-Flag Triggered */}
      {safetyResult.type === 'emergency' && (
        <div className="bg-rose-50 border-2 border-rose-600 rounded-3xl p-6 text-rose-950 shadow-lg animate-in zoom-in-95 duration-150">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center animate-pulse shrink-0">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wider uppercase">
                EMERGENCY RED FLAG
              </span>
              <h3 className="text-lg md:text-xl font-black text-rose-900 mt-1">
                {isSindhi ? safetyResult.titleSd : safetyResult.titleUr}
              </h3>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-4 border border-rose-200 mb-6 whitespace-pre-line text-sm leading-relaxed text-slate-800">
            <h4 className="font-bold text-rose-900 mb-1">
              {isSindhi ? 'فوري طبي هدايتون (First Aid):' : 'فوری طبی ہدایات (First Aid):'}
            </h4>
            {isSindhi ? safetyResult.instructionsSd : safetyResult.instructionsUr}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleTriggerDemoCall}
              className="w-full sm:flex-1 min-h-[64px] rounded-2xl bg-rose-600 hover:bg-rose-700 active:scale-98 text-white font-black text-lg md:text-xl flex items-center justify-center gap-3 shadow-xl transition-all"
            >
              <PhoneCall className="w-6 h-6 animate-bounce" />
              <span>{isSindhi ? 'ڪال ريسڪيو 1122' : isUrdu ? 'کال ریسکیو 1122' : 'Call Rescue 1122'}</span>
            </button>

            <div className="text-xs text-rose-800 font-semibold px-3 py-2 bg-rose-100 rounded-xl text-center">
              رجوع: {safetyResult.referralTarget}
            </div>
          </div>
        </div>
      )}

      {/* Outcome State 2: Dosage Prescription Refused */}
      {safetyResult.type === 'refusal' && (
        <div className="bg-amber-50 border-2 border-amber-600 rounded-3xl p-6 text-amber-950 shadow-lg animate-in zoom-in-95 duration-150">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0">
              <Ban className="w-7 h-7" />
            </div>
            <div>
              <span className="bg-amber-600 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wider uppercase">
                DOSAGE PRESCRIPTION REFUSED
              </span>
              <h3 className="text-lg md:text-xl font-black text-amber-900 mt-1">
                {isSindhi ? safetyResult.titleSd : safetyResult.titleUr}
              </h3>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-4 border border-amber-200 mb-4 whitespace-pre-line text-sm leading-relaxed text-slate-800">
            {isSindhi ? safetyResult.instructionsSd : safetyResult.instructionsUr}
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-900 font-bold bg-amber-100 p-3 rounded-xl">
            <Hospital className="w-4 h-4 text-amber-700 shrink-0" />
            <span>رجوع: قریبی بنیادی مرکز صحت (BHU) یا دیہی ہیلتھ سنٹر (RHC)</span>
          </div>
        </div>
      )}

      {/* Outcome State 3: Safe / Active State */}
      {safetyResult.type === 'safe' && (
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
          <div className="text-xs text-emerald-950">
            <p className="font-bold">
              {isSindhi ? 'حفاظتي فلٽر فعال آهي (Safety Filter Active)' : 'حفاظتی فلٹر فعال ہے (Safety Engine Active)'}
            </p>
            <p className="text-emerald-800">
              {isSindhi
                ? 'سسٽم خودڪار طريقي سان خطرناڪ طبي ۽ زرعي حالتن کي سڃاڻي ٿو ۽ دوائن جا نسخا بند ڪري ٿو.'
                : 'سسٹم تمام خطرناک طبی ہنگامی علامات کی خودکار جانچ کرتا ہے اور کسی بھی دوا کا نسخہ تجویز کرنے سے روکتا ہے۔'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthSafetyModule;
