import React, { useState, useEffect } from 'react';
import type { Language, UserProfile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { DIAGNOSTIC_QUESTIONS } from '../data/quizQuestions';
import { tts } from '../services/tts';
import { updateStoredProfile } from '../services/storage';
import confetti from 'canvas-confetti';
import { Volume2, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

interface Props {
  language?: Language;
  profile: UserProfile;
  onFinish: () => void;
}

export const PlacementQuizScreen: React.FC<Props> = ({
  profile,
  onFinish,
}) => {
  const { lang, isUrdu, isSindhi } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const q = DIAGNOSTIC_QUESTIONS[currentIndex];

  const playQuestionAudio = () => {
    let text = q.questionEn;
    if (lang === 'ur') text = q.questionUr;
    if (lang === 'sd') text = q.questionSd;
    tts.speak(text, lang);
  };

  useEffect(() => {
    if (!isCompleted) {
      let text = q.questionEn;
      if (lang === 'ur') text = q.questionUr;
      if (lang === 'sd') text = q.questionSd;
      tts.speak(text, lang);
    }
  }, [currentIndex, isCompleted, lang, q.questionEn, q.questionUr, q.questionSd]);

  const handleSelectOption = (index: number) => {
    setSelectedOption(index);
    const options = lang === 'sd' ? q.optionsSd : lang === 'ur' ? q.optionsUr : q.optionsEn;
    tts.speak(options[index], lang);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const nextScore = selectedOption === q.correctIndex ? score + 1 : score;
    setScore(nextScore);
    setSelectedOption(null);

    if (currentIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Completed quiz!
      finishQuiz(nextScore);
    }
  };

  const finishQuiz = (finalScore: number) => {
    setIsCompleted(true);
    try {
      confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
    } catch {}

    let assignedLevel = 'Level 0: Non-Reader';
    let assignedLevelUr = 'سطح 0: غیر خواندہ (Non-Reader)';
    let assignedLevelSd = 'ليول 0: اڻ پڙهيل (Non-Reader)';

    let suggestedPathway = 'Foundational Letters & Sounds';
    let suggestedPathwayUr = 'بنیادی حروف و صوتیات (Letters & Sounds)';
    let suggestedPathwaySd = 'بنيادي اکر ۽ آواز (Letters & Sounds)';

    if (finalScore >= 4 && finalScore <= 6) {
      assignedLevel = 'Level 1: Emergent Reader';
      assignedLevelUr = 'سطح 1: ابتدائی خواندگی (Emergent)';
      assignedLevelSd = 'ليول 1: شروعاتي پڙهندڙ (Emergent)';
      suggestedPathway = 'Numeracy & Agriculture';
      suggestedPathwayUr = 'بنیادی ریاضی اور زراعت (Numeracy & Farming)';
      suggestedPathwaySd = 'بنيادي ڳڻپ ۽ چانورن جي پوک';
    } else if (finalScore >= 7) {
      assignedLevel = 'Level 2: Applied Lifeskills';
      assignedLevelUr = 'سطح 2: عملی مہارت و صحت (Applied)';
      assignedLevelSd = 'ليول 2: عملي زندگي ۽ صحت (Applied)';
      suggestedPathway = 'Livestock, Health & Trade';
      suggestedPathwayUr = 'مال مویشی، گھریلو صحت و کاروبار';
      suggestedPathwaySd = 'مال، صحت ۽ روزگار';
    }

    const updated: UserProfile = {
      ...profile,
      level: assignedLevel,
      levelUr: assignedLevelUr,
      levelSd: assignedLevelSd,
      pathway: suggestedPathway,
      pathwayUr: suggestedPathwayUr,
      pathwaySd: suggestedPathwaySd,
      stars: profile.stars + finalScore + 5, // Bonus stars for completion
    };

    updateStoredProfile(updated);

    const completionVoice = isSindhi
      ? `شاباس! جائزو مڪمل ٿيو. اوهان جو اسڪور ${finalScore} آهي ۽ ليول مقرر ڪئي وئي آهي.`
      : isUrdu
      ? `شاباش! جائزہ مکمل ہو گیا۔ آپ کا اسکور ${finalScore} ہے اور سطح مقرر کر دی گئی ہے۔`
      : `Well done! Placement assessment complete. Your assigned score is ${finalScore}.`;
    tts.speak(completionVoice, lang);
  };

  if (isCompleted) {
    const finalLevel =
      score <= 3
        ? isSindhi ? 'ليول 0: اڻ پڙهيل (Non-Reader)' : isUrdu ? 'سطح 0: غیر خواندہ (Non-Reader)' : 'Level 0: Non-Reader'
        : score <= 6
        ? isSindhi ? 'ليول 1: شروعاتي پڙهندڙ (Emergent)' : isUrdu ? 'سطح 1: ابتدائی خواندگی (Emergent)' : 'Level 1: Emergent Reader'
        : isSindhi ? 'ليول 2: عملي زندگي ۽ صحت (Applied)' : isUrdu ? 'سطح 2: عملی مہارت و صحت (Applied)' : 'Level 2: Applied Lifeskills';

    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8 animate-in zoom-in-95 duration-200">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center text-4xl mx-auto mb-4 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <span className="inline-block bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold mb-3">
            [SIMULATED PLACEMENT COMPLETED]
          </span>

          <h2
            className={`text-2xl md:text-3xl font-black text-slate-900 mb-2 ${
              isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
            }`}
          >
            {isSindhi ? 'مبارڪون! جائزو مڪمل ٿي ويو' : isUrdu ? 'مبارک ہو! تشخیصی جائزہ مکمل' : 'Diagnostic Assessment Complete!'}
          </h2>

          <p className="text-slate-600 text-sm mb-6">
            {profile.name} • {score} / {DIAGNOSTIC_QUESTIONS.length} {isSindhi ? 'صحيح جواب' : isUrdu ? 'درست جواب' : 'Correct'}
          </p>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mb-8 text-start space-y-3">
            <div>
              <span className="text-xs text-emerald-700 font-bold block uppercase tracking-wider">
                {isSindhi ? 'مقرر ٿيل ليول (Assigned Level):' : isUrdu ? 'مقرر کردہ تعلیمی سطح (Assigned Level):' : 'Assigned Learning Level:'}
              </span>
              <p className="text-lg font-bold text-emerald-950">{finalLevel}</p>
            </div>
            <div className="pt-2 border-t border-emerald-200">
              <span className="text-xs text-emerald-700 font-bold block uppercase tracking-wider">
                {isSindhi ? 'تجويز ڪيل تعليمي رستو (Suggested Pathway):' : isUrdu ? 'تجویز کردہ تعلیمی ٹریک (Suggested Pathway):' : 'Recommended Pathway:'}
              </span>
              <p className="text-sm font-semibold text-emerald-900">
                {score <= 3
                  ? isSindhi ? 'بنيادي اکر، تصويرون ۽ صوتیات' : isUrdu ? 'بنیادی حروف شناسی، تصویر شناسی اور صوتیات' : 'Foundational Phonics & Picture Literacy'
                  : score <= 6
                  ? isSindhi ? 'بنيادي ڳڻپ، چانورن جي پوک ۽ خرچ' : isUrdu ? 'بنیادی گنتی، دھان کی کاشت اور مارکیٹ حساب' : 'Foundational Numeracy & Sindh Agriculture'
                  : isSindhi ? 'مال مويشي، گھرو صحت ۽ بچت' : isUrdu ? 'مال مویشی، گھریلو صحت اور ایزی پیسہ بچت' : 'Livestock Care, Health & Commerce'}
              </p>
            </div>
          </div>

          <button
            onClick={onFinish}
            className="w-full min-h-[64px] bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
          >
            <span>{isSindhi ? 'تعليمي مرڪز ڏانهن وڃو' : isUrdu ? 'تعلیمی مرکز میں داخل ہوں' : 'Enter Learning Center'}</span>
            <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
          </button>
        </div>
      </div>
    );
  }

  const options =
    lang === 'sd'
      ? q.optionsSd
      : lang === 'ur'
      ? q.optionsUr
      : q.optionsEn;

  const questionText =
    lang === 'sd'
      ? q.questionSd
      : lang === 'ur'
      ? q.questionUr
      : q.questionEn;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      {/* Quiz Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-200">
        {/* Progress Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{profile.avatar}</span>
            <span className="font-bold text-sm text-slate-800">{profile.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-900 text-xs px-3 py-1 rounded-full font-bold">
              {isSindhi ? `سوال ${currentIndex + 1} مان ${DIAGNOSTIC_QUESTIONS.length}` : isUrdu ? `سوال ${currentIndex + 1} از ${DIAGNOSTIC_QUESTIONS.length}` : `Question ${currentIndex + 1} of ${DIAGNOSTIC_QUESTIONS.length}`}
            </span>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
              [SIMULATED]
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-emerald-600 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%`,
            }}
          />
        </div>

        {/* Visual Question Area */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center mb-6">
          <div className="text-6xl mb-4 select-none animate-bounce-short">
            {q.visualEmoji}
          </div>
          <h3
            className={`text-lg md:text-xl font-bold text-slate-900 mb-3 ${
              isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
            }`}
          >
            {questionText}
          </h3>

          <button
            onClick={playQuestionAudio}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold hover:bg-emerald-200 transition-colors shadow-xs"
          >
            <Volume2 className="w-4 h-4 text-emerald-700" />
            <span>{isSindhi ? 'سوال ٻيهر ٻڌو' : isUrdu ? 'سوال دوبارہ سنیں' : 'Replay Question Audio'}</span>
          </button>
        </div>

        {/* 3 Large Picture / Text Option Buttons (>= 64px) */}
        <div className="space-y-3 mb-8">
          {options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full min-h-[64px] p-4 rounded-2xl border-2 flex items-center justify-between text-start text-base md:text-lg font-bold transition-all active:scale-99 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-600/30 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center text-sm ${
                      isSelected
                        ? 'border-emerald-700 bg-emerald-700 text-white'
                        : 'border-slate-300 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className={isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''}>
                    {opt}
                  </span>
                </div>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-700" />}
              </button>
            );
          })}
        </div>

        {/* Next / Submit Button (>= 64px) */}
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="w-full min-h-[64px] bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98"
        >
          <span>
            {currentIndex === DIAGNOSTIC_QUESTIONS.length - 1
              ? isSindhi ? 'جائزو مڪمل ڪريو' : isUrdu ? 'جائزہ مکمل کریں' : 'Complete Assessment'
              : isSindhi ? 'اڳيون سوال' : isUrdu ? 'اگلا سوال' : 'Next Question'}
          </span>
          <ArrowRight className="w-5 h-5 rtl:-scale-x-100" />
        </button>
      </div>
    </div>
  );
};
