import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { tts } from '../../services/tts';
import { Volume2, RotateCcw, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LetterItem {
  char: string;
  name: { en: string; ur: string; sd: string };
  word: { en: string; ur: string; sd: string };
  sound: { en: string; ur: string; sd: string };
  emoji: string;
}

const FOUNDATIONAL_LETTERS: LetterItem[] = [
  {
    char: 'A',
    name: { en: 'A', ur: 'اے', sd: 'اي' },
    word: { en: 'Apple', ur: 'سیب (Apple)', sd: 'سوف (Apple)' },
    sound: { en: 'A is for Apple', ur: 'A سے Apple', sd: 'A مان Apple' },
    emoji: '🍎',
  },
  {
    char: 'B',
    name: { en: 'B', ur: 'بی', sd: 'بي' },
    word: { en: 'Bag', ur: 'بستہ (Bag)', sd: 'ٿيلهو (Bag)' },
    sound: { en: 'B is for Bag', ur: 'B سے Bag', sd: 'B مان Bag' },
    emoji: '🎒',
  },
  {
    char: 'ا',
    name: { en: 'Alif', ur: 'الف', sd: 'الف' },
    word: { en: 'Pomegranate / Mango', ur: 'انار', sd: 'انب' },
    sound: { en: 'Alif for Anar', ur: 'الف سے انار', sd: 'الف مان انب' },
    emoji: '🥭',
  },
  {
    char: 'ب',
    name: { en: 'Bay', ur: 'بے', sd: 'ٻ' },
    word: { en: 'Goat / Bag', ur: 'بستہ', sd: 'ٻڪري' },
    sound: { en: 'Bay for Bakri', ur: 'ب سے بکری', sd: 'ٻ مان ٻڪري' },
    emoji: '🐐',
  },
  {
    char: 'ٻ',
    name: { en: 'Sindhi B (ٻ)', ur: 'مخصوص سندھی ٻ', sd: 'ٻ' },
    word: { en: 'Sindhi Bakri', ur: 'ٻڪري (بکری)', sd: 'ٻڪري' },
    sound: { en: 'Sindhi B is for Bakri', ur: 'ٻ سے ٻڪري', sd: 'ٻ مان ٻڪري' },
    emoji: '🐐',
  },
];

export const TracingCanvasTool: React.FC = () => {
  const { lang, isUrdu, isSindhi, t } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const currentLetter = FOUNDATIONAL_LETTERS[selectedIdx];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const strokeColor = '#0F766E'; // teal-700
  const strokeWidth = 14;

  const drawGuide = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw guide lines
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, canvas.height * 0.25);
    ctx.lineTo(canvas.width - 20, canvas.height * 0.25);
    ctx.moveTo(20, canvas.height * 0.75);
    ctx.lineTo(canvas.width - 20, canvas.height * 0.75);
    ctx.stroke();

    // Draw background guide letter
    ctx.font = 'bold 150px "Noto Naskh Arabic", Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#CBD5E1'; // slate-300
    ctx.fillText(currentLetter.char, canvas.width / 2, canvas.height / 2);
  }, [currentLetter.char]);

  useEffect(() => {
    drawGuide();
  }, [drawGuide]);

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

  const handleVerify = () => {
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } catch {}
    const praise = isSindhi
      ? 'شاباس! سهڻو لکيو.'
      : isUrdu
      ? 'شاباش! بہترین لکھائی۔'
      : 'Well done! Great letter tracing.';
    tts.speak(praise, lang);
  };

  const speakSound = () => {
    const s = currentLetter.sound[lang] || currentLetter.sound.en;
    tts.speak(s, lang);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
      {/* Letter selector chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {FOUNDATIONAL_LETTERS.map((item, idx) => (
          <button
            key={item.char}
            onClick={() => {
              setSelectedIdx(idx);
              const s = item.sound[lang] || item.sound.en;
              tts.speak(s, lang);
            }}
            className={`px-4 py-2 rounded-xl text-lg font-bold border transition-all shrink-0 ${
              selectedIdx === idx
                ? 'bg-teal-700 text-white border-teal-800 shadow-sm ring-2 ring-teal-600/30'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {item.char} <span className="text-xs opacity-80">{item.emoji}</span>
          </button>
        ))}
      </div>

      {/* Main slate container */}
      <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        {/* Left: letter pronunciation details */}
        <div className="w-full md:w-56 flex flex-col items-center md:items-start text-center md:text-start space-y-3">
          <div className="text-5xl">{currentLetter.emoji}</div>
          <div>
            <h4 className="text-2xl font-black text-slate-900">
              {currentLetter.char} — {currentLetter.name[lang]}
            </h4>
            <p className="text-sm font-semibold text-teal-800">
              {currentLetter.word[lang]}
            </p>
          </div>
          <button
            onClick={speakSound}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-bold border border-teal-200 transition-all active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-teal-700" />
            <span>{t('listenAudio')}</span>
          </button>
        </div>

        {/* Center: Tracing canvas */}
        <div className="relative touch-none">
          <canvas
            ref={canvasRef}
            width={340}
            height={260}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={stopDrawing}
            onTouchMove={draw}
            className="bg-white border-2 border-dashed border-teal-400 rounded-2xl cursor-crosshair shadow-inner"
          />
        </div>

        {/* Right: Controls */}
        <div className="flex md:flex-col gap-3 w-full md:w-auto">
          <button
            onClick={drawGuide}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t('tryAgain')}</span>
          </button>
          <button
            onClick={handleVerify}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-black shadow-sm transition-all active:scale-95"
          >
            <Check className="w-4 h-4" />
            <span>{t('checkAnswer')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
