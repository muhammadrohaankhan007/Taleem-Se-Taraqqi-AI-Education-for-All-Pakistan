import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  URDU_LETTERS,
  SINDHI_LETTERS,
  ENGLISH_LETTERS,
  MEDIUM_WORDS,
  type TracingLetter,
} from '../../data/learningCurriculum';
import { tts } from '../../services/tts';
import { awardStarsToActiveProfile } from '../../services/storage';
import {
  Volume2,
  Eraser,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  FileText,
  Palette,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onClose: () => void;
}

type LiteracyTab = 'tracing' | 'matching' | 'reading';

interface PracticalSignageItem {
  id: string;
  typeUr: string;
  typeSd: string;
  typeEn: string;
  titleUr: string;
  titleSd: string;
  titleEn: string;
  contentUr: string[];
  contentSd: string[];
  contentEn: string[];
  questionUr: string;
  questionSd: string;
  questionEn: string;
  optionsUr: string[];
  optionsSd: string[];
  optionsEn: string[];
  correctIndex: number;
}

const PRACTICAL_DOCUMENTS: PracticalSignageItem[] = [
  {
    id: 'bill',
    typeUr: 'بجلی کا بل (Electricity Bill)',
    typeSd: 'بجلي جو بل (Electricity Bill)',
    typeEn: 'Electricity Utility Bill',
    titleUr: 'حیسکو / لیسکو گھریلو بجلی کا بل',
    titleSd: 'حيسڪو گهريلو بجلي بل',
    titleEn: 'HESCO Rural Household Power Bill',
    contentUr: [
      'صارف کا نام: محمد بشیر (اکاؤنٹ # 49201)',
      'استعمال شدہ یونٹس: 185 Units',
      'آخری تاریخ سے قبل واجب الادا رقم: Rs 4,250',
      'آخری تاریخ کے بعد رقم: Rs 4,680',
    ],
    contentSd: [
      'صارف جو نالو: محمد بشير (کاتو # 49201)',
      'استعمال ٿيل يونٽ: 185 Units',
      'آخري تاريخ کان اڳ رقم: Rs 4,250',
      'آخري تاريخ کان پوءِ رقم: Rs 4,680',
    ],
    contentEn: [
      'Consumer Name: Muhammad Bashir (Acc # 49201)',
      'Units Consumed: 185 Units',
      'Payable within Due Date: Rs 4,250',
      'Payable after Due Date: Rs 4,680',
    ],
    questionUr: 'اگر بل وقت پر جمع کرایا جائے تو کتنی رقم ادا کرنی ہوگی؟',
    questionSd: 'جيڪڏهن بل وقت تي ڀريو وڃي ته ڪيتري رقم ادا ڪرڻي پوندي؟',
    questionEn: 'How much is payable if the bill is paid within the due date?',
    optionsUr: ['Rs 185', 'Rs 4,250', 'Rs 4,680'],
    optionsSd: ['Rs 185', 'Rs 4,250', 'Rs 4,680'],
    optionsEn: ['Rs 185', 'Rs 4,250', 'Rs 4,680'],
    correctIndex: 1,
  },
  {
    id: 'medicine',
    typeUr: 'طبی دوا کا لیبل (Medicine Label)',
    typeSd: 'طبي دوا جو ليبل (Medicine Label)',
    typeEn: 'Medicine Warning Label',
    titleUr: 'بچوں کا کھانسی سیرپ و اینٹی بائیوٹک',
    titleSd: 'ٻارن جي کنگهه جو سيرپ',
    titleEn: 'Pediatric Syrup Warning Instructions',
    contentUr: [
      'خوراک: صرف مستند ڈاکٹر کے نسخے کے مطابق لیں۔',
      'ضروری انتباہ: استعمال سے قبل شیشی اچھی طرح ہلائیں۔',
      'تحفظ: بچوں کی پہنچ سے ہمیشہ دور رکھیں۔',
      'درجہ حرارت: 30 ڈگری سینٹی گریڈ سے کم ٹھنڈی خشک جگہ پر رکھیں۔',
    ],
    contentSd: [
      'خوراڪ: رڳو مستند ڊاڪٽر جي نسخي موجب ڏيو.',
      'ضروري هدايت: استعمال کان اڳ شيشي چڱيءَ ريت لوڏيو.',
      'حفاظت: ٻارن جي پهچ کان هميشه پري رکو.',
      'درجه حرارت: 30 سينٽي گريڊ کان هيٺ ٿڌي جاءِ تي رکو.',
    ],
    contentEn: [
      'Dosage: Take strictly according to certified doctor prescription.',
      'Instruction: Shake bottle well before each use.',
      'Safety: Keep strictly out of reach of children.',
      'Storage: Store in a dry place below 30°C.',
    ],
    questionUr: 'دوا کے لیبل پر بچوں کے تحفظ کے بارے میں کیا واضح ہدایت ہے؟',
    questionSd: 'دوا جي ليبل تي ٻارن جي حفاظت بابت ڪهڙي هدايت آهي؟',
    questionEn: 'What is the explicit safety warning regarding children on this medicine label?',
    optionsUr: ['کھانے کے ساتھ کھلائیں', 'بچوں کی پہنچ سے دور رکھیں', 'دھوپ میں رکھیں'],
    optionsSd: ['ماني سان گڏ ڏيو', 'ٻارن جي پهچ کان پري رکو', 'تيز اس ۾ رکو'],
    optionsEn: ['Give with meals', 'Keep out of reach of children', 'Store in sunlight'],
    correctIndex: 1,
  },
  {
    id: 'fertilizer',
    typeUr: 'کھاد کی بوری کا لیبل (Fertilizer Bag)',
    typeSd: 'ڀاڻ جي ٻوري جو ليبل (Fertilizer Bag)',
    typeEn: 'Fertilizer Bag Specifications',
    titleUr: 'سونا یوریا (46% نائٹروجن)',
    titleSd: 'سونا يوريا (46% نائيٽروجن)',
    titleEn: 'Sona Urea (46% Nitrogen Prilled)',
    contentUr: [
      'خالص وزن: 50 کلوگرام',
      'غذائی اجزاء: نائٹروجن (N) کم از کم 46 فیصد',
      'استعمال: فصل کے پتوں کو سبز اور پودے کو قدآور بناتا ہے۔',
      'محفوظ طریقہ: نمی سے بچائیں اور اسپرے کے بعد ہاتھ صابن سے دھوئیں۔',
    ],
    contentSd: [
      'خالص وزن: 50 ڪلوگرام',
      'غذائي جز: نائيٽروجن (N) گهٽ ۾ گهٽ 46 سيڪڙو',
      'استعمال: پنن کي سائو ۽ ٻوٽي کي قدآور بڻائي ٿو.',
      'حفاظت: آلاڻ کان بچايو ۽ ڪم کان پوءِ هٿ صابڻ سان ڌوئو.',
    ],
    contentEn: [
      'Net Weight: 50 Kilograms',
      'Nutrient Content: Nitrogen (N) min 46%',
      'Function: Promotes vegetative growth and leaf greening.',
      'Safety: Keep dry; wash hands thoroughly after handling.',
    ],
    questionUr: 'اس یوریا کھاد میں نائٹروجن کی کتنی فیصد شرح موجود ہے؟',
    questionSd: 'هن يوريا ڀاڻ ۾ نائيٽروجن جو ڪيترو سيڪڙو موجود آهي؟',
    questionEn: 'What is the guaranteed percentage of Nitrogen in this Urea bag?',
    optionsUr: ['18%', '46%', '60%'],
    optionsSd: ['18%', '46%', '60%'],
    optionsEn: ['18%', '46%', '60%'],
    correctIndex: 1,
  },
];

export const LiteracyModule: React.FC<Props> = ({ onClose }) => {
  const { lang, isUrdu, isSindhi, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<LiteracyTab>('tracing');
  const [overrideScript, setOverrideScript] = useState<'ur' | 'sd' | 'en' | null>(null);
  const scriptType = overrideScript ?? lang;
  const setScriptType = (s: 'ur' | 'sd' | 'en') => setOverrideScript(s);
  const [selectedLetterIdx, setSelectedLetterIdx] = useState<number>(0);

  // Tracing Canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [strokeColor, setStrokeColor] = useState<string>('#0F766E'); // Teal-700
  const strokeWidth = 14;

  // Matching game state
  const [matchingIdx, setMatchingIdx] = useState<number>(0);
  const [matchingSelected, setMatchingSelected] = useState<number | null>(null);
  const [matchingFeedback, setMatchingFeedback] = useState<boolean>(false);
  const [matchingScore, setMatchingScore] = useState<number>(0);

  // Practical reading state
  const [selectedDocIdx, setSelectedDocIdx] = useState<number>(0);
  const [selectedDocAnswer, setSelectedDocAnswer] = useState<number | null>(null);
  const [docFeedback, setDocFeedback] = useState<boolean>(false);

  // Choose letter list
  const letterList: TracingLetter[] =
    scriptType === 'sd'
      ? SINDHI_LETTERS
      : scriptType === 'en'
      ? ENGLISH_LETTERS
      : URDU_LETTERS;

  const currentLetter = letterList[selectedLetterIdx] || letterList[0];

  // Draw guide letter on canvas
  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = scriptType === 'en' ? 'bold 150px Inter, sans-serif' : 'bold 140px "Noto Naskh Arabic", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#CBD5E1'; // Slate-300 guide letter
    ctx.fillText(currentLetter.char, canvas.width / 2, canvas.height / 2);
  }, [currentLetter.char, scriptType]);

  useEffect(() => {
    if (activeTab === 'tracing') {
      drawGuide();
      const sound = isSindhi ? currentLetter.soundSd : isUrdu ? currentLetter.soundUr : currentLetter.soundEn;
      tts.speak(sound, lang);
    }
  }, [activeTab, drawGuide, isSindhi, isUrdu, currentLetter.soundSd, currentLetter.soundUr, currentLetter.soundEn, lang]);

  // 1:1 Scaled Canvas Drawing Handlers
  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    // Accurate 1:1 pointer scaling on high DPI and touch screens
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = strokeColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleClearCanvas = () => {
    drawGuide();
    speak(isSindhi ? 'صاف ڪيو ويو' : isUrdu ? 'صاف کر دیا گیا' : 'Canvas cleared');
  };

  const handleVerifyTracing = () => {
    awardStarsToActiveProfile(3);
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch {}
    const text = isSindhi ? 'شاباس! اوهان اکر لکڻ مڪمل ڪيو.' : isUrdu ? 'بہت خوب! آپ نے حرف لکھنے کی مشق مکمل کر لی۔' : 'Great job! Tracing completed.';
    tts.speak(text, lang);
  };

  const speak = (text: string) => {
    tts.speak(text, lang);
  };

  // Matching Quiz logic
  const currentWord = MEDIUM_WORDS[matchingIdx] || MEDIUM_WORDS[0];
  const matchingOptions = [
    currentWord.meaningUr,
    'اسکول کا بستہ اور کتاب',
    'کھیت کا ٹریکٹر اور ہل',
    'دریا کا ٹھنڈا پانی',
  ];

  const handleSelectMatching = (optIdx: number) => {
    if (matchingFeedback) return;
    setMatchingSelected(optIdx);
    setMatchingFeedback(true);
    if (optIdx === 0) {
      setMatchingScore((prev) => prev + 1);
      awardStarsToActiveProfile(2);
      try {
        confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      } catch {}
      speak(isSindhi ? currentWord.exampleSentenceSd : isUrdu ? currentWord.exampleSentenceUr : currentWord.exampleSentenceEn);
    } else {
      speak(isSindhi ? 'غلط، ٻيهر ڪوشش ڪريو.' : isUrdu ? 'غلط، دوبارہ کوشش کریں۔' : 'Incorrect, try again.');
    }
  };

  const handleNextMatching = () => {
    setMatchingSelected(null);
    setMatchingFeedback(false);
    setMatchingIdx((prev) => (prev + 1) % MEDIUM_WORDS.length);
  };

  // Practical Doc Quiz logic
  const currentDoc = PRACTICAL_DOCUMENTS[selectedDocIdx];
  const handleAnswerDocQuiz = (optIdx: number) => {
    setSelectedDocAnswer(optIdx);
    setDocFeedback(true);
    if (optIdx === currentDoc.correctIndex) {
      awardStarsToActiveProfile(3);
      try {
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
      } catch {}
      speak(isSindhi ? 'شاباس! درست جواب.' : isUrdu ? 'شاباش! درست جواب۔' : 'Correct answer!');
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
              {isSindhi ? 'ٻولي ۽ اکر شناسي' : isUrdu ? 'زبان و حروف شناسی' : 'Languages & Literacy'}
            </span>
          </div>
          <h2
            className={`text-2xl md:text-3xl font-black text-slate-900 ${
              isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
            }`}
          >
            {isSindhi ? 'ٻولي، پڙهڻ ۽ اکر لکڻ (Literacy)' : isUrdu ? 'زبان، پڑھائی اور حروف شناسی (Literacy)' : 'Languages & Literacy Lab'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isSindhi
              ? 'اردو، سنڌي ۽ انگريزي اکرن جي ٽريسنگ، صوٽياتي ميچنگ، ۽ روزمرهه جا سائن بورڊ پڙهڻ'
              : isUrdu
              ? 'اردو، سندھی اور انگریزی حروف کی ٹریسنگ، صوتیاتی گیم اور عملی دستاویزات پڑھنا'
              : 'Trilingual letter tracing, phonics audio matching, and practical reading comprehension'}
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
          onClick={() => setActiveTab('tracing')}
          className={`py-3 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'tracing'
              ? 'bg-white text-teal-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>{isSindhi ? 'اکر ٽريسنگ پيڊ' : isUrdu ? 'حروف ٹریسنگ پیڈ' : 'Interactive Tracing'}</span>
        </button>

        <button
          onClick={() => setActiveTab('matching')}
          className={`py-3 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'matching'
              ? 'bg-white text-teal-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-600" />
          <span>{isSindhi ? 'آواز ۽ لفظ ميچنگ' : isUrdu ? 'صوتیات و لفظ میچنگ' : 'Phonics Matching'}</span>
        </button>

        <button
          onClick={() => setActiveTab('reading')}
          className={`py-3 px-3 rounded-xl text-xs md:text-sm font-black flex items-center justify-center gap-2 transition-all ${
            activeTab === 'reading'
              ? 'bg-white text-teal-950 shadow-md border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-blue-600" />
          <span>{isSindhi ? 'عملي دستاويز پڙهڻ' : isUrdu ? 'عملی دستاویزات پڑھنا' : 'Practical Reading'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: INTERACTIVE HTML5 CANVAS TRACING PAD (1:1 SCALED) */}
      {/* ========================================================================= */}
      {activeTab === 'tracing' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            {/* Script Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                {isSindhi ? 'رسم الخط:' : isUrdu ? 'رسم الخط:' : 'Script:'}
              </span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    setScriptType('ur');
                    setSelectedLetterIdx(0);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black border transition-all ${
                    scriptType === 'ur'
                      ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  اردو حروف
                </button>
                <button
                  onClick={() => {
                    setScriptType('sd');
                    setSelectedLetterIdx(0);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black border transition-all ${
                    scriptType === 'sd'
                      ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  سنڌي اکر (ٻ، ڄ، ڳ، ڃ)
                </button>
                <button
                  onClick={() => {
                    setScriptType('en');
                    setSelectedLetterIdx(0);
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black border transition-all ${
                    scriptType === 'en'
                      ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  English A-Z
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                const sound = isSindhi ? currentLetter.soundSd : isUrdu ? currentLetter.soundUr : currentLetter.soundEn;
                speak(sound);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold hover:bg-teal-100 border border-teal-200"
            >
              <Volume2 className="w-4 h-4 text-teal-700" />
              <span>{t('listenAudio')}</span>
            </button>
          </div>

          {/* Letter Choice Cards (>= 64px) */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5">
            {letterList.map((item, idx) => (
              <button
                key={item.char}
                onClick={() => setSelectedLetterIdx(idx)}
                className={`min-h-[68px] rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all active:scale-95 ${
                  selectedLetterIdx === idx
                    ? 'border-teal-700 bg-teal-50 text-teal-950 shadow-md ring-2 ring-teal-600/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <span className="text-2xl font-black">{item.char}</span>
                <span className="text-[10px] opacity-70 mt-0.5">
                  {isSindhi ? item.nameSd : isUrdu ? item.nameUr : item.nameEn}
                </span>
              </button>
            ))}
          </div>

          {/* Canvas Tracing Pad Box */}
          <div className="flex flex-col lg:flex-row items-center gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-200">
            {/* Visual Word Card */}
            <div className="w-full lg:w-64 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center space-y-2">
              <span className="text-5xl">{currentLetter.emoji}</span>
              <h4 className="text-xl font-black text-slate-900">
                {isSindhi ? currentLetter.wordSd : isUrdu ? currentLetter.wordUr : currentLetter.wordEn}
              </h4>
              <p className="text-xs text-slate-500 font-semibold">
                {isSindhi ? currentLetter.soundSd : isUrdu ? currentLetter.soundUr : currentLetter.soundEn}
              </p>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 flex flex-col items-center w-full">
              <div className="relative touch-none border-4 border-dashed border-teal-600/40 rounded-3xl bg-white shadow-inner overflow-hidden max-w-sm w-full h-72">
                <canvas
                  ref={canvasRef}
                  width={360}
                  height={288}
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onMouseMove={draw}
                  onTouchStart={startDrawing}
                  onTouchEnd={stopDrawing}
                  onTouchCancel={stopDrawing}
                  onTouchMove={draw}
                  className="w-full h-full cursor-crosshair"
                />
              </div>

              {/* Stroke Controls & Actions */}
              <div className="flex flex-wrap items-center justify-between w-full max-w-sm mt-3 gap-2">
                <div className="flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-slate-500" />
                  {['#0F766E', '#2563EB', '#D97706', '#9333EA'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setStrokeColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        strokeColor === color ? 'scale-125 border-slate-900 shadow-xs' : 'border-white'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClearCanvas}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1"
                  >
                    <Eraser className="w-3.5 h-3.5" />
                    <span>{t('clear')}</span>
                  </button>

                  <button
                    onClick={handleVerifyTracing}
                    className="px-4 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-black shadow-xs flex items-center gap-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isSindhi ? 'مڪمل ڪريو ⭐' : isUrdu ? 'مکمل کریں ⭐' : 'Earn Star ⭐'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERACTIVE PHONICS & LETTER-WORD MATCHING GAME */}
      {/* ========================================================================= */}
      {activeTab === 'matching' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>
                  {isSindhi ? '2. آواز، تصوير ۽ لفظ ميچنگ گيم' : isUrdu ? '2. صوتیات، تصویر اور لفظ میچنگ گیم' : 'Phonics & Word Picture Matching Game'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSindhi
                  ? 'تصوير ۽ اکر ڏسي صحيح معنيٰ تي ٽيپ ڪريو.'
                  : isUrdu
                  ? 'تصویر اور لفظ کا درست ملاپ منتخب کر کے جواب چیک کریں۔'
                  : 'Listen to the phonic sound and tap the correct matching word card.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full">
                {t('score')}: {matchingScore}
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-5xl">{currentWord.emoji}</span>
                <div>
                  <h4 className="text-2xl font-black text-slate-900">{currentWord.word}</h4>
                  <span className="text-xs text-slate-500 font-bold">{currentWord.transliteration}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  const s = isSindhi ? currentWord.exampleSentenceSd : isUrdu ? currentWord.exampleSentenceUr : currentWord.exampleSentenceEn;
                  speak(s);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-50 text-teal-800 text-xs font-bold hover:bg-teal-100 border border-teal-200"
              >
                <Volume2 className="w-4 h-4 text-teal-700" />
                <span>{t('listenAudio')}</span>
              </button>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {matchingOptions.map((opt, i) => {
                const isSelected = matchingSelected === i;
                let btnColor = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
                if (matchingFeedback) {
                  if (i === 0) btnColor = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black';
                  else if (isSelected && i !== 0) btnColor = 'bg-rose-100 border-rose-500 text-rose-950';
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectMatching(i)}
                    disabled={matchingFeedback}
                    className={`min-h-[64px] p-4 rounded-2xl border-2 text-start font-bold transition-all active:scale-98 flex items-center justify-between ${btnColor}`}
                  >
                    <span>{opt}</span>
                    {matchingFeedback && i === 0 && <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {matchingFeedback && (
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
                <p className="text-xs font-bold text-teal-950">
                  {isSindhi ? currentWord.exampleSentenceSd : isUrdu ? currentWord.exampleSentenceUr : currentWord.exampleSentenceEn}
                </p>
                <button
                  onClick={handleNextMatching}
                  className="px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-black text-xs flex items-center gap-2 shrink-0 shadow-md active:scale-95"
                >
                  <span>{t('next')}</span>
                  <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PRACTICAL READING COMPREHENSION (BILLS, MEDICINE, FERTILIZER) */}
      {/* ========================================================================= */}
      {activeTab === 'reading' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <span>
                  {isSindhi ? '3. روزمرهه جا ضروري دستاويز پڙهڻ (Practical Reading)' : isUrdu ? '3. روزمرہ کے ضروری دستاویزات پڑھنا (Practical Reading)' : 'Practical Everyday Document Comprehension'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isSindhi
                  ? 'بجليءَ جو بل، دوا جو ليبل، ۽ ڀاڻ جي ٻوري پڙهي صحيح جواب چونڊيو.'
                  : isUrdu
                  ? 'بجلی کا بل، دوا کا لیبل اور کھاد کی بوری کی تحریر پڑھ کر سوالات حل کریں۔'
                  : 'Interactive exercises reading utility bills, medicine warnings, and fertilizer bags.'}
              </p>
            </div>
          </div>

          {/* Document Type Selector Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {PRACTICAL_DOCUMENTS.map((doc, idx) => (
              <button
                key={doc.id}
                onClick={() => {
                  setSelectedDocIdx(idx);
                  setSelectedDocAnswer(null);
                  setDocFeedback(false);
                }}
                className={`min-h-[64px] p-3 rounded-2xl border-2 text-start font-bold transition-all ${
                  selectedDocIdx === idx
                    ? 'border-teal-700 bg-teal-50 text-teal-950 shadow-md ring-2 ring-teal-600/20'
                    : 'border-slate-200 bg-slate-50 hover:bg-white text-slate-700'
                }`}
              >
                <span className="text-xs block">
                  {isSindhi ? doc.typeSd : isUrdu ? doc.typeUr : doc.typeEn}
                </span>
              </button>
            ))}
          </div>

          {/* Document Content Display Box */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-300 shadow-inner space-y-3 font-mono">
              <h4 className="text-sm font-black text-teal-950 font-sans border-b pb-2">
                📄 {isSindhi ? currentDoc.titleSd : isUrdu ? currentDoc.titleUr : currentDoc.titleEn}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {(isSindhi ? currentDoc.contentSd : isUrdu ? currentDoc.contentUr : currentDoc.contentEn).map((line, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-700 font-bold">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Comprehension Question */}
            <div className="space-y-3 pt-2">
              <p className="text-sm font-black text-slate-900">
                ❓ {isSindhi ? currentDoc.questionSd : isUrdu ? currentDoc.questionUr : currentDoc.questionEn}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(isSindhi ? currentDoc.optionsSd : isUrdu ? currentDoc.optionsUr : currentDoc.optionsEn).map((opt, i) => {
                  const isSelected = selectedDocAnswer === i;
                  let optStyle = 'bg-white hover:bg-slate-100 border-slate-200 text-slate-800';
                  if (docFeedback) {
                    if (i === currentDoc.correctIndex) optStyle = 'bg-emerald-100 border-emerald-600 text-emerald-950 font-black';
                    else if (isSelected) optStyle = 'bg-rose-100 border-rose-600 text-rose-950';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswerDocQuiz(i)}
                      className={`min-h-[52px] p-3 rounded-xl border-2 text-start text-xs font-bold transition-all ${optStyle}`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {docFeedback && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-950 flex items-center justify-between">
                  <span>{isSindhi ? 'شاباس! اوهان دستاويز بلڪل صحيح پڙهيو.' : isUrdu ? 'شاباش! آپ نے دستاویز بالکل درست پڑھی۔' : 'Great job! Document reading verified.'}</span>
                  <button
                    onClick={() => {
                      setSelectedDocIdx((prev) => (prev + 1) % PRACTICAL_DOCUMENTS.length);
                      setSelectedDocAnswer(null);
                      setDocFeedback(false);
                    }}
                    className="px-3 py-1 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs"
                  >
                    {t('next')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiteracyModule;
