import React from 'react';
import type { SubjectId } from '../data/curriculumData';
import { SUBJECTS_MAP } from '../data/curriculumData';
import { useLanguage } from '../context/LanguageContext';
import {
  isLessonCompleted,
  isLessonUnlocked,
  getSubjectProgressPercent,
  getSubjectCompletedCount,
} from '../services/storage';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lock,
  Play,
  Clock,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface Props {
  subjectId: SubjectId;
  onSelectLesson: (lessonId: string) => void;
  onBackToDashboard: () => void;
}

export const SubjectCurriculumScreen: React.FC<Props> = ({
  subjectId,
  onSelectLesson,
  onBackToDashboard,
}) => {
  const { lang, isUrdu, isSindhi, t } = useLanguage();
  const subject = SUBJECTS_MAP[subjectId];

  if (!subject) {
    return (
      <div className="p-8 text-center">
        <p>Subject not found.</p>
        <button onClick={onBackToDashboard} className="mt-4 px-4 py-2 bg-teal-700 text-white rounded-xl">
          Back
        </button>
      </div>
    );
  }

  const progressPercent = getSubjectProgressPercent(subjectId);
  const completedCount = getSubjectCompletedCount(subjectId);

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8 space-y-6 animate-in fade-in duration-200">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
        <button
          onClick={onBackToDashboard}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-800 transition-colors py-1 px-2.5 rounded-xl hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{t('backToHome')}</span>
        </button>
        <span className={`text-xs font-black px-3 py-1 rounded-full border ${subject.badgeBg}`}>
          {subject.tag[lang]}
        </span>
      </div>

      {/* Subject Header Banner */}
      <div
        className={`bg-gradient-to-r ${subject.gradient} text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden`}
      >
        <div className="flex items-start sm:items-center gap-5 relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-4xl sm:text-5xl border border-white/20 shrink-0">
            {subject.emoji}
          </div>
          <div className="space-y-1.5 flex-1">
            <h2
              className={`text-2xl sm:text-3xl font-black ${
                isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
              }`}
            >
              {subject.title[lang]}
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl">
              {subject.description[lang]}
            </p>
          </div>
        </div>

        {/* Progress Bar inside Header */}
        <div className="mt-6 pt-4 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/90">
          <div className="flex items-center gap-2 font-bold">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>
              {completedCount} / {subject.lessons.length} {t('lessonsCompleted')} ({progressPercent}%)
            </span>
          </div>
          <div className="w-full sm:w-56 h-2.5 bg-black/20 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chapters & Lessons Syllabus Tree */}
      <div className="space-y-6">
        {subject.chapters.map((chapter) => {
          const chapterLessons = subject.lessons.filter((l) => chapter.lessonIds.includes(l.id));

          return (
            <div
              key={chapter.chapterNumber}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-4"
            >
              {/* Chapter Title & Level Badge */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-teal-50 text-teal-900 border border-teal-200 flex items-center justify-center text-xs font-black">
                    {chapter.chapterNumber}
                  </span>
                  <h3
                    className={`text-base sm:text-lg font-black text-slate-900 ${
                      isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
                    }`}
                  >
                    {chapter.title[lang]}
                  </h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {chapter.level}
                </span>
              </div>

              {/* Lesson Items */}
              <div className="space-y-3">
                {chapterLessons.map((lesson) => {
                  const completed = isLessonCompleted(lesson.id);
                  const unlocked = isLessonUnlocked(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        completed
                          ? 'bg-emerald-50/40 border-emerald-200/80 hover:border-emerald-400'
                          : unlocked
                          ? 'bg-white border-teal-200 hover:border-teal-600 hover:shadow-md'
                          : 'bg-slate-50 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 mt-0.5 ${
                            completed
                              ? 'bg-emerald-100 text-emerald-800'
                              : unlocked
                              ? 'bg-teal-100 text-teal-800'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {completed ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                          ) : unlocked ? (
                            <BookOpen className="w-5 h-5 text-teal-700" />
                          ) : (
                            <Lock className="w-4 h-4 text-slate-500" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[11px] font-bold text-slate-500">
                              {t('lesson')} {lesson.lessonNumber}
                            </span>
                            <span className="text-[10px] px-2 py-0.2 rounded-md bg-slate-100 font-semibold text-slate-600">
                              {lesson.topic[lang]}
                            </span>
                          </div>
                          <h4
                            className={`text-sm sm:text-base font-black text-slate-900 ${
                              isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
                            }`}
                          >
                            {lesson.title[lang]}
                          </h4>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1">
                            <span className="inline-flex items-center gap-1 font-medium">
                              <Clock className="w-3.5 h-3.5" />
                              {lesson.estimatedMinutes} min
                            </span>
                            <span>•</span>
                            <span className="capitalize font-semibold text-teal-800">
                              {lesson.level}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div>
                        {unlocked ? (
                          <button
                            onClick={() => onSelectLesson(lesson.id)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black shadow-xs active:scale-95 transition-all ${
                              completed
                                ? 'bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300'
                                : 'bg-teal-700 hover:bg-teal-800 text-white'
                            }`}
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>{completed ? t('continueLearning') : t('startLearning')}</span>
                            <ArrowRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
                          </button>
                        ) : (
                          <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200">
                            <Lock className="w-3.5 h-3.5" />
                            <span>{t('locked')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
