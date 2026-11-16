import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { tts } from '../../services/tts';
import { awardStarsToActiveProfile } from '../../services/storage';
import {
  Volume2,
  Coins,
  Calculator,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onClose: () => void;
}

type MathTab = 'currency' | 'quiz' | 'land';

interface MathQuizItem {
  id: number;
  questionUr: string;
  questionSd: string;
  questionEn: string;
  contextUr: string;
  contextSd: string;
  contextEn: string;
  options: number[];
  correctAnswer: number;
  unitUr: string;
  unitSd: string;
  unitEn: string;
  explanationUr: string;
  explanationSd: string;
  explanationEn: string;
}

const MATH_QUIZ_DATA: MathQuizItem[] = [
  {
    id: 1,
    questionUr: 'اگر ایک ایکڑ دھان سے 40 من پیداوار ہو تو 3 ایکڑ سے کل کتنے من پیداوار حاصل ہوگی؟',
    questionSd: 'جيڪڏهن هڪ ايڪڙ مان 40 مڻ چانور نڪري، ته 3 ايڪڙن مان ڪل ڪيترا مڻ ٿيندا؟',
    questionEn: 'If 1 acre yields 40 maunds of rice, how many maunds will 3 acres produce?',
    contextUr: 'حساب: 3 ایکڑ × 40 من فی ایکڑ',
    contextSd: 'حساب: 3 ايڪڙ × 40 مڻ في ايڪڙ',
    contextEn: 'Calculation: 3 acres × 40 maunds/acre',
    options: [100, 120, 140, 160],
    correctAnswer: 120,
    unitUr: 'من',
    unitSd: 'مڻ',
    unitEn: 'maunds',
    explanationUr: 'درست! 3 کو 40 سے ضرب دیں: 3 × 40 = 120 من۔',
    explanationSd: 'صحيح! 3 کي 40 سان ضرب ڏيو: 3 × 40 = 120 مڻ.',
    explanationEn: 'Correct! Multiply 3 by 40: 3 × 40 = 120 maunds.',
  },
  {
    id: 2,
    questionUr: 'دکاندار سے 350 روپے کا سامان خریدا اور آپ نے 500 روپے کا نوٹ دیا۔ دکاندار کتنے روپے واپس کرے گا؟',
    questionSd: 'دڪاندار کان 350 رپين جو سامان ورتو ۽ اوهان 500 جو نوٽ ڏنو. دڪاندار ڪيترا رپيا موٽائيندو؟',
    questionEn: 'You bought goods for Rs 350 and gave a Rs 500 note. How much change will you receive?',
    contextUr: 'حساب: 500 روپے - 350 روپے',
    contextSd: 'حساب: 500 رپيا - 350 رپيا',
    contextEn: 'Calculation: Rs 500 - Rs 350',
    options: [100, 120, 150, 200],
    correctAnswer: 150,
    unitUr: 'روپے',
    unitSd: 'رپيا',
    unitEn: 'PKR',
    explanationUr: 'شاباش! 500 میں سے 350 تفریق کریں: 500 - 350 = 150 روپے بقایا۔',
    explanationSd: 'شاباس! 500 مان 350 ڪڍو: 500 - 350 = 150 رپيا بقايا.',
    explanationEn: 'Well done! Subtract 350 from 500: 500 - 350 = Rs 150.',
  },
  {
    id: 3,
    questionUr: 'کھاد کی ایک بوری پر 10 فیصد رعایت (ڈسکاؤنٹ) مل رہی ہے۔ اگر اصل قیمت 10,000 روپے ہو تو کتنی بچت ہوگی؟',
    questionSd: 'ڀاڻ جي هڪ ٻوري تي 10 سيڪڙو رعايت آهي. جيڪڏهن اصل اگهه 10,000 رپيا هجي ته ڪيتري بچت ٿيندي؟',
    questionEn: 'A fertilizer bag has a 10% discount. If the regular price is Rs 10,000, how much do you save?',
    contextUr: 'حساب: 10,000 کا 10% (10,000 × 10 ÷ 100)',
    contextSd: 'حساب: 10,000 جو 10% (10,000 × 10 ÷ 100)',
    contextEn: 'Calculation: 10% of Rs 10,000 (10,000 × 10 ÷ 100)',
    options: [500, 1000, 1500, 2000],
    correctAnswer: 1000,
    unitUr: 'روپے بچت',
    unitSd: 'رپيا بچت',
    unitEn: 'PKR saved',
    explanationUr: 'بالکل درست! 10,000 کا 10 فیصد 1,000 روپے کی خالص بچت ہے۔',
    explanationSd: 'بلڪل صحيح! 10,000 جو 10 سيڪڙو 1,000 رپيا خالص بچت آهي.',
    explanationEn: 'Exactly right! 10% of 10,000 is Rs 1,000 discount savings.',
  },
];

export const MathModule: React.FC<Props> = ({ onClose }) => {
  const { lang, isUrdu, isSindhi, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<MathTab>('currency');

  // --- CURRENCY REGISTER STATE ---
  const [billAmount, setBillAmount] = useState<number>(230);
  const [tenderedNotes, setTenderedNotes] = useState<number[]>([]);
  const totalTendered = tenderedNotes.reduce((acc, curr) => acc + curr, 0);
  const changeDue = totalTendered >= billAmount ? totalTendered - billAmount : 0;
  const isShortOfCash = totalTendered > 0 && totalTendered < billAmount;

  // --- QUIZ STATE ---
  const [quizIdx, setQuizIdx] = useState<number>(0);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizDone, setQuizDone] = useState<boolean>(false);

  // --- SINDH LAND & LOAN CALCULATOR STATE ---
  const [landArea, setLandArea] = useState<number>(3.5);
  const [landUnit, setLandUnit] = useState<'acres' | 'jaribs' | 'kanals' | 'marlas'>('acres');
  const [loanPrincipal, setLoanPrincipal] = useState<number>(100000);
  const [loanRate, setLoanRate] = useState<number>(12);
  const [loanMonths, setLoanMonths] = useState<number>(12);

  // Land conversions:
  // 1 Acre = 43,560 sq ft = 8 Kanals = 160 Marlas = 2 Sindh Jaribs (0.5 acre each)
  let baseAcres = landArea;
  if (landUnit === 'jaribs') baseAcres = landArea * 0.5;
  if (landUnit === 'kanals') baseAcres = landArea / 8;
  if (landUnit === 'marlas') baseAcres = landArea / 160;

  const kanalsVal = (baseAcres * 8).toFixed(2);
  const marlasVal = (baseAcres * 160).toFixed(1);
  const jaribsVal = (baseAcres * 2).toFixed(2);
  const sqftVal = Math.round(baseAcres * 43560).toLocaleString();

  // Loan Markup calculations:
  const totalMarkup = Math.round(loanPrincipal * (loanRate / 100) * (loanMonths / 12));
  const totalRepayment = loanPrincipal + totalMarkup;
  const monthlyPayment = Math.round(totalRepayment / loanMonths);

  const speak = (text: string) => {
    tts.speak(text, lang);
  };

  const handleAddNote = (denom: number) => {
    const next = [...tenderedNotes, denom];
    setTenderedNotes(next);
    const sum = next.reduce((a, b) => a + b, 0);
    const text = isSindhi
      ? `${denom} رپيا شامل ڪيا، ڪل ${sum} رپيا`
      : isUrdu
      ? `${denom} روپے شامل کیے، کل رقم ${sum} روپے`
      : `Added Rs ${denom}, total Rs ${sum}`;
    speak(text);
  };

  const handleClearRegister = () => {
    setTenderedNotes([]);
    speak(isSindhi ? 'بٽوو خالي ڪيو ويو' : isUrdu ? 'بٹوہ خالی کر دیا گیا' : 'Wallet reset');
  };

  const handleAnswerQuiz = (option: number) => {
    if (showFeedback) return;
    setSelectedAns(option);
    setShowFeedback(true);
    const currentQ = MATH_QUIZ_DATA[quizIdx];
    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      setQuizScore((prev) => prev + 1);
      awardStarsToActiveProfile(2);
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      } catch {}
      speak(isSindhi ? currentQ.explanationSd : isUrdu ? currentQ.explanationUr : currentQ.explanationEn);
    } else {
      speak(isSindhi ? 'غلط جواب، ٻيهر ڪوشش ڪريو.' : isUrdu ? 'غلط جواب، دوبارہ کوشش کریں۔' : 'Incorrect, try again.');
    }
  };

  const handleNextQuiz = () => {
    setSelectedAns(null);
    setShowFeedback(false);
    if (quizIdx < MATH_QUIZ_DATA.length - 1) {
      setQuizIdx((prev) => prev + 1);
    } else {
      setQuizDone(true);
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.5 } });
      } catch {}
    }
  };

  const handleResetQuiz = () => {
    setQuizIdx(0);
    setSelectedAns(null);
    setShowFeedback(false);
    setQuizScore(0);
    setQuizDone(false);
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
              {isSindhi ? 'بنيادي ۽ عملي حساب' : isUrdu ? 'بنیادی و عملی ریاضی' : 'Applied Mathematics'}
            </span>
          </div>
          <h2
            className={`text-2xl md:text-3xl font-black text-slate-900 ${
              isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
            }`}
          >
            {isSindhi ? 'بنيادي ۽ عملي حساب (Mathematics)' : isUrdu ? 'بنیادی و عملی ریاضی (Mathematics)' : 'Applied Mathematics Lab'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isSindhi
              ? 'پاڪستاني نوٽ ڳڻپ، بازار جو بقايا، زرعي زمين ماپ ۽ قرض مارڪ اپ'
              : isUrdu
              ? 'پاکستانی روپوں کا حساب، بازار کا بقایا، زرعی اراضی کنورٹر اور قرضہ مارک اپ'
              : 'PKR cash register, bazaar change, land area converter & agri-loan markup'}
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
          onClick={() => setActiveTab('currency')}
          className={`py-3 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'currency'
              ? 'bg-white text-teal-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Coins className="w-4 h-4 text-emerald-700" />
          <span>{isSindhi ? 'نوٽ ۽ بازار جو بقايا' : isUrdu ? 'نوٹ و بازار کا بقایا' : 'PKR Cash Register'}</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`py-3 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'quiz'
              ? 'bg-white text-teal-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>{isSindhi ? 'حساب سوال ۽ جواب' : isUrdu ? 'ریاضی کوئز و مشق' : 'Word Problems Quiz'}</span>
        </button>

        <button
          onClick={() => setActiveTab('land')}
          className={`py-3 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'land'
              ? 'bg-white text-teal-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calculator className="w-4 h-4 text-indigo-700" />
          <span>{isSindhi ? 'زمين ماپ ۽ مارڪ اپ' : isUrdu ? 'اراضی ماپ و مارک اپ' : 'Land & Loan Markup'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: INTERACTIVE PKR CASH REGISTER & BAZAAR CHANGE CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'currency' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Coins className="w-5 h-5 text-emerald-700" />
                <span>
                  {isSindhi
                    ? '1. بازار جو بقايا ۽ روپين جو حساب (Cash Register)'
                    : isUrdu
                    ? '1. بازار کا بقایا اور پاکستانی کرنسی کا حساب (Cash Register)'
                    : 'Pakistani Rupee (PKR) Cash Register & Change Simulator'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSindhi
                  ? 'سامان جو بل چونڊيو ۽ نوٽ ٽيپ ڪري ادا ڪريو ته جيئن دڪاندار کان صحيح بقايا معلوم ٿئي.'
                  : isUrdu
                  ? 'سامان کا بل منتخب کریں اور نوٹ ٹیپ کر کے رقم ادا کریں تاکہ دکاندار سے ملنے والا بقایا معلوم ہو سکے۔'
                  : 'Tap banknotes to build tendered cash and see itemized return change.'}
              </p>
            </div>

            <button
              onClick={() =>
                speak(
                  isSindhi
                    ? `بل ${billAmount} روپيا، اوهان ادا ڪيا ${totalTendered} روپيا، بقايا ملندا ${changeDue} روپيا`
                    : isUrdu
                    ? `بل ${billAmount} روپے، آپ نے ادا کیے ${totalTendered} روپے، بقایا ملیں گے ${changeDue} روپے`
                    : `Bill is Rs ${billAmount}, tendered Rs ${totalTendered}, change returned is Rs ${changeDue}`
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold hover:bg-teal-100 border border-teal-200"
            >
              <Volume2 className="w-4 h-4 text-teal-700" />
              <span>{t('listenAudio')}</span>
            </button>
          </div>

          {/* Shop Bill Slider & Presets */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">
                {isSindhi ? 'سامان جو بل (Bill Amount):' : isUrdu ? 'سامان کا بل (Bill Amount):' : 'Item Bill Amount:'}
              </span>
              <span className="text-2xl font-black text-teal-900">Rs {billAmount}</span>
            </div>

            <input
              type="range"
              min="20"
              max="1500"
              step="10"
              value={billAmount}
              onChange={(e) => setBillAmount(Number(e.target.value))}
              className="w-full accent-teal-700"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
              <span className="text-slate-500 font-semibold">{isSindhi ? 'عام خريداري:' : isUrdu ? 'عام خریداری:' : 'Quick Presets:'}</span>
              <div className="flex flex-wrap gap-1.5">
                {[60, 150, 230, 480, 850, 1200].map((v) => (
                  <button
                    key={v}
                    onClick={() => setBillAmount(v)}
                    className={`px-3 py-1 rounded-xl font-bold transition-all ${
                      billAmount === v
                        ? 'bg-teal-800 text-white shadow-xs'
                        : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    Rs {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Banknote Tap Pad */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                {isSindhi ? 'نوٽ تي ٽيپ ڪري رقم ڏيو (Tap Notes to Tender):' : isUrdu ? 'نوٹ پر ٹیپ کر کے رقم ادا کریں (Tap Notes to Tender):' : 'Tap Banknotes to Tender Cash:'}
              </span>
              {tenderedNotes.length > 0 && (
                <button
                  onClick={handleClearRegister}
                  className="text-xs text-rose-700 hover:text-rose-900 font-bold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{isSindhi ? 'نوٽ صاف ڪريو' : isUrdu ? 'نوٹ صاف کریں' : 'Reset Wallet'}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {[
                { val: 10, bg: 'bg-[#2E5A36] border-[#3F7549]', label: '10 روپے' },
                { val: 20, bg: 'bg-[#B85D19] border-[#D47125]', label: '20 روپے' },
                { val: 50, bg: 'bg-[#6D326D] border-[#894489]', label: '50 روپے' },
                { val: 100, bg: 'bg-[#9C2020] border-[#BC2C2C]', label: '100 روپے' },
                { val: 500, bg: 'bg-[#0D5C58] border-[#137A74]', label: '500 روپے' },
                { val: 1000, bg: 'bg-[#1D3557] border-[#2A4D7E]', label: '1000 روپے' },
                { val: 5000, bg: 'bg-[#7C5A14] border-[#9E731C]', label: '5000 روپے' },
              ].map((note) => {
                const count = tenderedNotes.filter((n) => n === note.val).length;
                return (
                  <button
                    key={note.val}
                    onClick={() => handleAddNote(note.val)}
                    className={`relative min-h-[76px] rounded-2xl ${note.bg} text-white p-2.5 flex flex-col items-center justify-between font-black shadow-md hover:brightness-110 active:scale-95 transition-all border-2 border-white/20 select-none overflow-hidden`}
                  >
                    <div className="w-full flex justify-between items-center text-[10px] opacity-80 font-bold">
                      <span>PKR</span>
                      <span>₨</span>
                    </div>
                    <span className="text-xl sm:text-2xl tracking-tight">Rs {note.val}</span>
                    <span className="text-[10px] opacity-90 font-medium">{note.label}</span>
                    {count > 0 && (
                      <span className="absolute top-1 right-1 bg-white text-slate-900 px-1.5 py-0.2 rounded-full text-[10px] font-black shadow-xs ring-1 ring-black/20">
                        x{count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wallet Tendered vs. Change Result Box */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-bold block">{isSindhi ? 'سامان جو بل' : isUrdu ? 'سامان کا بل' : 'Bill Amount'}</span>
                <span className="text-xl font-black text-slate-800">Rs {billAmount}</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-bold block">{isSindhi ? 'اوهان جي ڏنل رقم' : isUrdu ? 'آپ کی ادا کردہ رقم' : 'Tendered Cash'}</span>
                <span className="text-xl font-black text-teal-800">Rs {totalTendered}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">({tenderedNotes.length} notes)</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-[11px] text-slate-500 font-bold block">{isSindhi ? 'دڪاندار کان بقايا واپسي' : isUrdu ? 'دکاندار سے واپس ملنے والا بقایا' : 'Change Due'}</span>
                <span className={`text-2xl font-black ${changeDue > 0 ? 'text-emerald-700' : isShortOfCash ? 'text-rose-600' : 'text-slate-400'}`}>
                  Rs {changeDue}
                </span>
              </div>
            </div>

            {/* Validation Feedback */}
            {isShortOfCash && (
              <div className="bg-amber-50 border border-amber-300 p-3.5 rounded-xl flex items-center gap-2 text-xs text-amber-950 font-bold shadow-2xs">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  {isSindhi
                    ? `رقم گهٽ آهي! اوهان کي اڃا Rs ${billAmount - totalTendered} وڌيڪ ڏيڻا آهن.`
                    : isUrdu
                    ? `رقم کم ہے! آپ کو مزید Rs ${billAmount - totalTendered} دینے ہیں۔`
                    : `Tendered cash is short by Rs ${billAmount - totalTendered}!`}
                </span>
              </div>
            )}

            {totalTendered >= billAmount && totalTendered > 0 && (
              <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-xl space-y-2 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{isSindhi ? 'صحيح حساب!' : isUrdu ? 'درست حساب!' : 'Transaction Cleared!'}</span>
                  </span>
                  <span className="text-xs font-bold text-emerald-800">
                    {isSindhi ? `بقايا نوٽن جو تخمينو: Rs ${changeDue}` : isUrdu ? `بقایا نوٹوں کا تخمینہ: Rs ${changeDue}` : `Change Breakdown: Rs ${changeDue}`}
                  </span>
                </div>
                <div className="text-xs text-emerald-950 flex flex-wrap gap-2 pt-1 font-semibold">
                  {changeDue === 0 ? (
                    <span>{isSindhi ? 'پورا پئسا ادا ڪيا ويا!' : isUrdu ? 'پوری رقم ادا کر دی گئی!' : 'Exact payment!'}</span>
                  ) : (
                    <>
                      {Math.floor(changeDue / 5000) > 0 && <span className="bg-white px-2.5 py-1 rounded-xl border border-emerald-200 font-bold shadow-2xs">{Math.floor(changeDue / 5000)} × Rs 5000</span>}
                      {Math.floor((changeDue % 5000) / 1000) > 0 && <span className="bg-white px-2.5 py-1 rounded-xl border border-emerald-200 font-bold shadow-2xs">{Math.floor((changeDue % 5000) / 1000)} × Rs 1000</span>}
                      {Math.floor((changeDue % 1000) / 500) > 0 && <span className="bg-white px-2.5 py-1 rounded-xl border border-emerald-200 font-bold shadow-2xs">{Math.floor((changeDue % 1000) / 500)} × Rs 500</span>}
                      {Math.floor((changeDue % 500) / 100) > 0 && <span className="bg-white px-2.5 py-1 rounded-xl border border-emerald-200 font-bold shadow-2xs">{Math.floor((changeDue % 500) / 100)} × Rs 100</span>}
                      {Math.floor((changeDue % 100) / 50) > 0 && <span className="bg-white px-2.5 py-1 rounded-xl border border-emerald-200 font-bold shadow-2xs">{Math.floor((changeDue % 100) / 50)} × Rs 50</span>}
                      {Math.floor((changeDue % 50) / 20) > 0 && <span className="bg-white px-2.5 py-1 rounded-xl border border-emerald-200 font-bold shadow-2xs">{Math.floor((changeDue % 50) / 20)} × Rs 20</span>}
                      {Math.floor((changeDue % 20) / 10) > 0 && <span className="bg-white px-2.5 py-1 rounded-xl border border-emerald-200 font-bold shadow-2xs">{Math.floor((changeDue % 20) / 10)} × Rs 10</span>}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERACTIVE WORD PROBLEMS & HOUSEHOLD BUDGETING QUIZ */}
      {/* ========================================================================= */}
      {activeTab === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>
                  {isSindhi ? '2. عملي حساب ۽ مسئلن جا سوال (Math Quiz)' : isUrdu ? '2. عملی ریاضی اور روزمرہ مسائل کے سوالات (Math Quiz)' : 'Applied Math & Everyday Word Problems'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSindhi
                  ? 'ٻني، بازار ۽ بچت سان لاڳاپيل سوالن جا صحيح جواب ڏيو ۽ ستارا حاصل ڪريو.'
                  : isUrdu
                  ? 'کھیت، مارکیٹ اور گھریلو بجٹ کے مسائل حل کریں اور ستارے کمائیں۔'
                  : 'Solve practical agricultural and household arithmetic challenges.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                {t('score')}: {quizScore} / {MATH_QUIZ_DATA.length}
              </span>
            </div>
          </div>

          {!quizDone ? (
            <div className="space-y-6">
              {/* Question Header & Context */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                    {t('question')} {quizIdx + 1} / {MATH_QUIZ_DATA.length}
                  </span>
                  <button
                    onClick={() => {
                      const q = MATH_QUIZ_DATA[quizIdx];
                      speak(isSindhi ? q.questionSd : isUrdu ? q.questionUr : q.questionEn);
                    }}
                    className="flex items-center gap-1 text-xs text-teal-800 hover:text-teal-950 font-bold"
                  >
                    <Volume2 className="w-4 h-4 text-teal-700" />
                    <span>{t('listenAudio')}</span>
                  </button>
                </div>

                <h4 className="text-base md:text-lg font-black text-slate-900 leading-snug">
                  {isSindhi
                    ? MATH_QUIZ_DATA[quizIdx].questionSd
                    : isUrdu
                    ? MATH_QUIZ_DATA[quizIdx].questionUr
                    : MATH_QUIZ_DATA[quizIdx].questionEn}
                </h4>

                <div className="text-xs text-slate-500 font-semibold bg-white p-2.5 rounded-xl border border-slate-200 inline-block">
                  💡 {isSindhi ? MATH_QUIZ_DATA[quizIdx].contextSd : isUrdu ? MATH_QUIZ_DATA[quizIdx].contextUr : MATH_QUIZ_DATA[quizIdx].contextEn}
                </div>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MATH_QUIZ_DATA[quizIdx].options.map((opt) => {
                  const isChosen = selectedAns === opt;
                  const isCorrectOpt = opt === MATH_QUIZ_DATA[quizIdx].correctAnswer;
                  let btnColor = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
                  if (showFeedback) {
                    if (isCorrectOpt) btnColor = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black ring-2 ring-emerald-500/20';
                    else if (isChosen && !isCorrectOpt) btnColor = 'bg-rose-100 border-rose-500 text-rose-950';
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleAnswerQuiz(opt)}
                      disabled={showFeedback}
                      className={`min-h-[64px] p-4 rounded-2xl border-2 text-start font-bold transition-all active:scale-98 flex items-center justify-between ${btnColor}`}
                    >
                      <span className="text-lg">
                        {opt} {isSindhi ? MATH_QUIZ_DATA[quizIdx].unitSd : isUrdu ? MATH_QUIZ_DATA[quizIdx].unitUr : MATH_QUIZ_DATA[quizIdx].unitEn}
                      </span>
                      {showFeedback && isCorrectOpt && <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Banner & Next Button */}
              {showFeedback && (
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
                  <p className="text-xs font-bold text-teal-950">
                    {isSindhi ? MATH_QUIZ_DATA[quizIdx].explanationSd : isUrdu ? MATH_QUIZ_DATA[quizIdx].explanationUr : MATH_QUIZ_DATA[quizIdx].explanationEn}
                  </p>
                  <button
                    onClick={handleNextQuiz}
                    className="px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-black text-xs flex items-center gap-2 shrink-0 shadow-md active:scale-95"
                  >
                    <span>{t('nextQuestion')}</span>
                    <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-4xl mx-auto shadow-inner">
                🎉
              </div>
              <h4 className="text-xl font-black text-slate-900">
                {isSindhi ? 'شاباس! اوهان سمورا سوال مڪمل ڪيا!' : isUrdu ? 'بہت خوب! آپ نے تمام سوالات حل کر لیے!' : 'Congratulations! Quiz Completed!'}
              </h4>
              <p className="text-sm font-bold text-emerald-800">
                {t('score')}: {quizScore} / {MATH_QUIZ_DATA.length}
              </p>
              <button
                onClick={handleResetQuiz}
                className="px-6 py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white font-black text-xs shadow-md transition-all active:scale-95"
              >
                {isSindhi ? 'ٻيهر کوئز ڏيو' : isUrdu ? 'دوبارہ کوئز دیں' : 'Retake Quiz'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SINDH AGRICULTURAL LAND & LOAN MARKUP CALCULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'land' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-indigo-700" />
                <span>
                  {isSindhi ? '3. زرعي زمين ماپ ۽ قرض مارڪ اپ (Land & Markup)' : isUrdu ? '3. زرعی اراضی کنورٹر و قرضہ مارک اپ (Land & Markup)' : 'Sindh Land Measurement & Loan Calculator'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSindhi
                  ? 'ايڪڙ، جريب (سنڌي معيار 0.5 ايڪڙ)، ڪنال، مرلا ۽ مربع فٽن جي تبديلي، گڏوگڏ ساليانو مارڪ اپ حساب.'
                  : isUrdu
                  ? 'ایکڑ، سندھی جریب (0.5 ایکڑ)، کنال، مرلہ اور مربع فٹ کی تبدیلی اور زرعی بینک قرضہ مارک اپ۔'
                  : 'Convert Sindh Jarib, Acre, Kanal, Marla, and calculate repayment schedules.'}
              </p>
            </div>

            <button
              onClick={() =>
                speak(
                  isSindhi
                    ? `${landArea} ${landUnit} مان ${jaribsVal} جريب، ${kanalsVal} ڪنال ۽ ${marlasVal} مرلا ٺهن ٿا.`
                    : isUrdu
                    ? `${landArea} ${landUnit} سے ${jaribsVal} جریب، ${kanalsVal} کنال اور ${marlasVal} مرلہ بنتے ہیں۔`
                    : `${landArea} ${landUnit} equals ${jaribsVal} jaribs, ${kanalsVal} kanals, and ${marlasVal} marlas.`
                )
              }
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-50 text-indigo-800 text-xs font-bold hover:bg-indigo-100 border border-indigo-200"
            >
              <Volume2 className="w-4 h-4 text-indigo-700" />
              <span>{t('listenAudio')}</span>
            </button>
          </div>

          {/* Land Converter Section */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider">
              {isSindhi ? 'زمين جي ماپ جو ڪنورٽر (Land Unit Converter)' : isUrdu ? 'اراضی کا کنورٹر (Land Unit Converter)' : 'Land Units Converter'}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isSindhi ? 'زمين جي ايراضي درج ڪريو:' : isUrdu ? 'اراضی کا رقبہ درج کریں:' : 'Enter Land Area:'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.1"
                  value={landArea}
                  onChange={(e) => setLandArea(Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-indigo-600 bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {isSindhi ? 'يونٽ چونڊيو:' : isUrdu ? 'یونٹ منتخب کریں:' : 'Select Measurement Unit:'}
                </label>
                <select
                  value={landUnit}
                  onChange={(e) => setLandUnit(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 focus:outline-indigo-600 bg-white"
                >
                  <option value="acres">{isSindhi ? 'ايڪڙ (Acres)' : isUrdu ? 'ایکڑ (Acres)' : 'Acres'}</option>
                  <option value="jaribs">{isSindhi ? 'جريب سنڌ (Sindh Jarib = 0.5 Acre)' : isUrdu ? 'جریب سندھ (0.5 ایکڑ)' : 'Sindh Jarib (0.5 Acre)'}</option>
                  <option value="kanals">{isSindhi ? 'ڪنال (Kanals)' : isUrdu ? 'کنال (Kanals)' : 'Kanals'}</option>
                  <option value="marlas">{isSindhi ? 'مرلا (Marlas)' : isUrdu ? 'مرلہ (Marlas)' : 'Marlas'}</option>
                </select>
              </div>
            </div>

            {/* Equivalent Measurements Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2 border-t border-slate-200 text-center">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">{isSindhi ? 'ايڪڙ' : isUrdu ? 'ایکڑ' : 'Acres'}</span>
                <span className="text-base font-black text-slate-800">{baseAcres.toFixed(2)}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-indigo-200 bg-indigo-50/50">
                <span className="text-[10px] text-indigo-700 font-bold block">{isSindhi ? 'جريب (سنڌ)' : isUrdu ? 'جریب (سندھ)' : 'Sindh Jaribs'}</span>
                <span className="text-base font-black text-indigo-900">{jaribsVal}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">{isSindhi ? 'ڪنال' : isUrdu ? 'کنال' : 'Kanals'}</span>
                <span className="text-base font-black text-slate-800">{kanalsVal}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">{isSindhi ? 'مرلا' : isUrdu ? 'مرلہ' : 'Marlas'}</span>
                <span className="text-base font-black text-slate-800">{marlasVal}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 font-bold block">{isSindhi ? 'مربع فٽ' : isUrdu ? 'مربع فٹ' : 'Sq. Feet'}</span>
                <span className="text-xs font-black text-slate-800 mt-1 block">{sqftVal}</span>
              </div>
            </div>
          </div>

          {/* Agri-Loan Installment Calculator */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
            <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              <span>{isSindhi ? 'زرعي قرض ۽ مارڪ اپ حساب (Agri-Loan Calculator)' : isUrdu ? 'زرعی قرضہ اور مارک اپ حساب (Agri-Loan Calculator)' : 'Agricultural Loan & Markup Calculator'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  {isSindhi ? 'قرض رقم (PKR):' : isUrdu ? 'قرضہ رقم (PKR):' : 'Loan Principal (PKR):'}
                </label>
                <input
                  type="number"
                  step="10000"
                  value={loanPrincipal}
                  onChange={(e) => setLoanPrincipal(Math.max(1000, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  {isSindhi ? 'ساليانو مارڪ اپ %:' : isUrdu ? 'سالانہ مارک اپ %:' : 'Annual Markup %:'}
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="40"
                  value={loanRate}
                  onChange={(e) => setLoanRate(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-xs"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">
                  {isSindhi ? 'مدت (مهينا):' : isUrdu ? 'مدت (ماہ):' : 'Tenure (Months):'}
                </label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="60"
                  value={loanMonths}
                  onChange={(e) => setLoanMonths(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-xs"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-emerald-800 font-bold block">{isSindhi ? 'ڪل اضافي مارڪ اپ:' : isUrdu ? 'کل اضافی مارک اپ:' : 'Total Markup:'}</span>
                <span className="font-black text-base text-emerald-950">Rs {totalMarkup.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-emerald-800 font-bold block">{isSindhi ? 'ڪل واپسي رقم:' : isUrdu ? 'کل قابل ادائیگی رقم:' : 'Total Repayment:'}</span>
                <span className="font-black text-base text-emerald-950">Rs {totalRepayment.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-emerald-800 font-bold block">{isSindhi ? 'ماھوار قسط:' : isUrdu ? 'ماہانہ قسط:' : 'Monthly Installment:'}</span>
                <span className="font-black text-base text-emerald-950">Rs {monthlyPayment.toLocaleString()} / mo</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MathModule;
