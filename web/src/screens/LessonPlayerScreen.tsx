import React, { useState } from 'react';
import {
  getLessonById,
  getNextLesson,
  getPreviousLesson,
  SUBJECTS_MAP,
} from '../data/curriculumData';
import { useLanguage } from '../context/LanguageContext';
import { tts } from '../services/tts';
import {
  markLessonCompleted,
  isLessonCompleted,
  isLessonUnlocked,
} from '../services/storage';
import { TracingCanvasTool } from '../components/tools/TracingCanvasTool';
import { PulleyLeverSimulatorTool } from '../components/tools/PulleyLeverSimulatorTool';
import { CashRegisterTool } from '../components/tools/CashRegisterTool';
import { WaterPurifierTool } from '../components/tools/WaterPurifierTool';
import { FarmProfitCalculatorTool } from '../components/tools/FarmProfitCalculatorTool';
import { HealthTriageTool } from '../components/tools/HealthTriageTool';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  FlaskConical,
  HelpCircle,
  Trophy,
  Volume2,
  CheckCircle2,
  XCircle,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  lessonId: string;
  onBackToSyllabus: () => void;
  onNavigateLesson: (nextLessonId: string) => void;
}

type LessonTab = 'concept' | 'lab' | 'exercises' | 'completion';

export const LessonPlayerScreen: React.FC<Props> = ({
  lessonId,
  onBackToSyllabus,
  onNavigateLesson,
}) => {
  const { lang, isUrdu, isSindhi, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<LessonTab>('concept');

  const lesson = getLessonById(lessonId);
  const nextLesson = getNextLesson(lessonId);
  const prevLesson = getPreviousLesson(lessonId);

  // Exercises State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [exerciseChecked, setExerciseChecked] = useState<Record<string, boolean>>({});

  if (!lesson) {
    return (
      <div className="p-8 text-center">
        <p>Lesson not found.</p>
        <button onClick={onBackToSyllabus} className="mt-4 px-4 py-2 bg-teal-700 text-white rounded-xl">
          Back
        </button>
      </div>
    );
  }

  const subject = SUBJECTS_MAP[lesson.subjectId];
  const alreadyCompleted = isLessonCompleted(lesson.id);

  // Audio Speech Handler
  const speakLessonConcept = () => {
    const textToRead = `${lesson.title[lang]}. ${lesson.content.introduction[lang]}. ${lesson.content.keyConcepts
      .map((k) => `${k.title[lang]}: ${k.description[lang]}`)
      .join(' ')}`;
    tts.speak(textToRead, lang);
  };

  const handleSelectOption = (exerciseId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [exerciseId]: optionId }));
    setExerciseChecked((prev) => ({ ...prev, [exerciseId]: false }));
  };

  const handleCheckExercises = () => {
    const checkedMap: Record<string, boolean> = {};
    let correctCount = 0;

    lesson.exercises.forEach((ex) => {
      checkedMap[ex.id] = true;
      if (selectedAnswers[ex.id] === ex.correctAnswer) {
        correctCount++;
      }
    });

    setExerciseChecked(checkedMap);

    if (correctCount === lesson.exercises.length) {
      markLessonCompleted(lesson.id, 100);
      try {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
      } catch {}
      const praise = isSindhi
        ? 'شاباس! سڀ جواب صحيح آهن.'
        : isUrdu
        ? 'شاباش! تمام سوالات کے درست جوابات۔'
        : 'Excellent! All exercise answers are correct.';
      tts.speak(praise, lang);
      setActiveTab('completion');
    } else {
      const retryMsg = isSindhi
        ? 'ڪجهه جواب غلط آهن، مهرباني ڪري استاد جي سمجهاڻي ڏسي وري ڪوشش ڪريو.'
        : isUrdu
        ? 'کچھ جوابات غلط ہیں، استاد کی وضاحت دیکھ کر دوبارہ کوشش کریں۔'
        : 'Some answers are incorrect. Review the teacher explanation and try again.';
      tts.speak(retryMsg, lang);
    }
  };

  const handleManualComplete = () => {
    markLessonCompleted(lesson.id, 100);
    try {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.5 } });
    } catch {}
    setActiveTab('completion');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <button
            onClick={onBackToSyllabus}
            className="hover:text-teal-800 transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
            <span>{subject?.title[lang]}</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
          <span className="text-teal-900 font-black truncate max-w-[200px] sm:max-w-xs">
            {lesson.title[lang]}
          </span>
        </div>

        {alreadyCompleted && (
          <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>{t('completed')}</span>
          </span>
        )}
      </div>

      {/* Main Lesson Title Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-black text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                {t('chapter')} {lesson.chapterNumber} • {t('lesson')} {lesson.lessonNumber}
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                {lesson.topic[lang]}
              </span>
            </div>
            <h2
              className={`text-xl sm:text-2xl font-black text-slate-900 ${
                isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
              }`}
            >
              {lesson.title[lang]}
            </h2>
          </div>

          <button
            onClick={speakLessonConcept}
            className="p-3 rounded-2xl bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-all shrink-0 active:scale-95 shadow-2xs"
            title={t('listenExplanation')}
          >
            <Volume2 className="w-5 h-5 text-teal-800" />
          </button>
        </div>

        {/* 4 Navigation Tabs */}
        <div
          role="tablist"
          className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100"
        >
          <button
            role="tab"
            aria-selected={activeTab === 'concept'}
            onClick={() => setActiveTab('concept')}
            className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'concept'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="truncate">{t('conceptAndTheory')}</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'lab'}
            onClick={() => setActiveTab('lab')}
            className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'lab'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span className="truncate">{t('interactiveLab')}</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'exercises'}
            onClick={() => setActiveTab('exercises')}
            className={`py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'exercises'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span className="truncate">{t('exercises')}</span>
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'completion'}
            onClick={() => setActiveTab('completion')}
            className={`hidden sm:flex py-2 px-3 rounded-xl text-xs font-black items-center justify-center gap-1.5 transition-all ${
              activeTab === 'completion'
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span className="truncate">{t('lessonCompleted')}</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: CONCEPT & THEORY */}
      {/* ========================================================= */}
      {activeTab === 'concept' && (
        <div className="space-y-6">
          {/* Learning Objectives */}
          {lesson.learningObjectives?.[lang] && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-black text-teal-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t('learningObjectives')}</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {lesson.learningObjectives[lang].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-800 text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Lesson Introduction & Key Concepts */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 block mb-1">
                {t('conceptAndTheory')}
              </span>
              <p
                className={`text-sm sm:text-base text-slate-800 leading-relaxed font-medium ${
                  isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
                }`}
              >
                {lesson.content.introduction[lang]}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {lesson.content.keyConcepts.map((concept, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200 space-y-1.5"
                >
                  <h4
                    className={`text-sm font-black text-slate-900 ${
                      isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
                    }`}
                  >
                    {concept.title[lang]}
                  </h4>
                  <p
                    className={`text-xs text-slate-600 leading-relaxed ${
                      isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
                    }`}
                  >
                    {concept.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Everyday Practical Example */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-3xl p-5 sm:p-6 shadow-xs space-y-2">
            <span className="text-xs font-black text-amber-900 block">
              💡 {t('practicalExample')}: {lesson.content.practicalExample.title[lang]}
            </span>
            <p
              className={`text-xs sm:text-sm text-slate-800 leading-relaxed ${
                isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
              }`}
            >
              {lesson.content.practicalExample.scenario[lang]}
            </p>
            <div className="text-[11px] font-bold text-amber-950 pt-1">
              ✨ Key Takeaway: {lesson.content.practicalExample.takeaway[lang]}
            </div>
          </div>

          {/* Bottom Next Action */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => setActiveTab('lab')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl text-xs font-black shadow-md transition-all active:scale-95"
            >
              <span>{t('interactiveLab')}</span>
              <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: INTERACTIVE PRACTICE LAB */}
      {/* ========================================================= */}
      {activeTab === 'lab' && (
        <div className="space-y-6">
          {lesson.content.interactiveTool === 'tracing' && <TracingCanvasTool />}
          {lesson.content.interactiveTool === 'pulley_lever' && <PulleyLeverSimulatorTool />}
          {lesson.content.interactiveTool === 'cash_register' && <CashRegisterTool />}
          {lesson.content.interactiveTool === 'water_purifier' && <WaterPurifierTool />}
          {lesson.content.interactiveTool === 'farm_calculator' && <FarmProfitCalculatorTool />}
          {lesson.content.interactiveTool === 'health_triage' && <HealthTriageTool />}

          {!lesson.content.interactiveTool && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-3">
              <div className="text-5xl">{lesson.content.visualEmoji}</div>
              <h4 className="text-base font-black text-slate-900">
                {lesson.title[lang]}
              </h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                {lesson.content.introduction[lang]}
              </p>
              <button
                onClick={speakLessonConcept}
                className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-900 font-bold text-xs rounded-xl border border-teal-200"
              >
                <Volume2 className="w-4 h-4 text-teal-800" />
                <span>{t('listenExplanation')}</span>
              </button>
            </div>
          )}

          {/* Tab Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveTab('concept')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{t('conceptAndTheory')}</span>
            </button>

            <button
              onClick={() => setActiveTab('exercises')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl text-xs font-black shadow-md transition-all active:scale-95"
            >
              <span>{t('exercises')}</span>
              <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: PRACTICE EXERCISES */}
      {/* ========================================================= */}
      {activeTab === 'exercises' && (
        <div className="space-y-6">
          <div className="space-y-5">
            {lesson.exercises.map((ex, idx) => {
              const selectedOpt = selectedAnswers[ex.id];
              const isChecked = exerciseChecked[ex.id];
              const isCorrect = selectedOpt === ex.correctAnswer;

              return (
                <div
                  key={ex.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-900 text-xs font-black flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h4
                        className={`text-sm sm:text-base font-black text-slate-900 ${
                          isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
                        }`}
                      >
                        {ex.question[lang]}
                      </h4>
                    </div>

                    <button
                      onClick={() => tts.speak(ex.question[lang], lang)}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors shrink-0"
                    >
                      <Volume2 className="w-4 h-4 text-teal-700" />
                    </button>
                  </div>

                  {/* Options List */}
                  <div className="space-y-2">
                    {ex.options.map((opt) => {
                      const isChosen = selectedOpt === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => handleSelectOption(ex.id, opt.id)}
                          className={`w-full p-3.5 rounded-2xl border-2 text-start text-xs sm:text-sm font-bold transition-all flex items-center justify-between ${
                            isChosen
                              ? 'border-teal-700 bg-teal-50/70 text-teal-950 shadow-2xs'
                              : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                          }`}
                        >
                          <span className={isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''}>
                            {opt.text[lang]}
                          </span>
                          <span
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isChosen
                                ? 'border-teal-700 bg-teal-700 text-white'
                                : 'border-slate-300'
                            }`}
                          >
                            {isChosen && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Teacher Feedback Banner */}
                  {isChecked && (
                    <div
                      className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : 'bg-rose-50 border-rose-200 text-rose-950'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-black text-sm">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                            <span>{t('correct')}</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-700" />
                            <span>{t('tryAgain')}</span>
                          </>
                        )}
                      </div>
                      <p className={isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''}>
                        {ex.explanation[lang]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Check / Submit Action */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveTab('lab')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{t('interactiveLab')}</span>
            </button>

            <button
              onClick={handleCheckExercises}
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-2xl text-xs font-black shadow-md transition-all active:scale-95"
            >
              <span>{t('checkAnswer')}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: COMPLETION CELEBRATION */}
      {/* ========================================================= */}
      {activeTab === 'completion' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-5xl mx-auto shadow-inner ring-4 ring-emerald-500/20">
            🏆
          </div>

          <div className="space-y-2">
            <h3
              className={`text-2xl sm:text-3xl font-black text-slate-900 ${
                isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
              }`}
            >
              {t('congratulations')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              {lang === 'sd'
                ? `اوهان هي سبق ڪاميابيءَ سان مڪمل ڪري ورتو آهي. ۳ نوان ستارا اوهان جي اڪائونٽ ۾ جمع ٿي ويا آهن.`
                : lang === 'ur'
                ? `آپ نے یہ سبق کامیابی سے مکمل کر لیا ہے۔ ۳ نئے ستارے آپ کے کھاتے میں جمع ہو چکے ہیں۔`
                : `You have successfully completed this lesson. 3 stars have been awarded to your profile.`}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-950 font-black text-sm border border-amber-300">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>+3 Stars Earned ⭐⭐⭐</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={onBackToSyllabus}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all"
            >
              {t('backToSyllabus')}
            </button>

            {nextLesson && (
              <button
                onClick={() => onNavigateLesson(nextLesson.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-black shadow-md transition-all active:scale-95"
              >
                <span>{t('nextLesson')}</span>
                <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Prev / Next Lesson Navigation Footer */}
      <div className="flex items-center justify-between border-t border-slate-200/80 pt-4 text-xs font-bold text-slate-500">
        <div>
          {prevLesson ? (
            <button
              onClick={() => onNavigateLesson(prevLesson.id)}
              className="inline-flex items-center gap-1.5 hover:text-teal-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{t('prevLesson')}</span>
            </button>
          ) : (
            <span className="opacity-40">{t('prevLesson')}</span>
          )}
        </div>

        <div>
          {nextLesson && isLessonUnlocked(nextLesson.id) ? (
            <button
              onClick={() => onNavigateLesson(nextLesson.id)}
              className="inline-flex items-center gap-1.5 text-teal-800 font-black hover:text-teal-950 transition-colors"
            >
              <span>{t('nextLesson')}</span>
              <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
            </button>
          ) : (
            <button
              onClick={handleManualComplete}
              className="inline-flex items-center gap-1.5 text-emerald-700 font-black hover:text-emerald-900"
            >
              <span>{t('completed')}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
