import React, { useState } from 'react';
import type { UserProfile } from '../types';
import type { SubjectId } from '../data/curriculumData';
import {
  ALL_CURRICULUM_SUBJECTS,
  SUBJECTS_MAP,
  getLessonById,
} from '../data/curriculumData';
import { useLanguage } from '../context/LanguageContext';
import { tts } from '../services/tts';
import {
  getSubjectProgressPercent,
  getSubjectCompletedCount,
  getOverallProgressPercent,
  getCompletedLessonIds,
  getNextRecommendedLesson,
  getLearningStreak,
} from '../services/storage';
import { SubjectCurriculumScreen } from './SubjectCurriculumScreen';
import { LessonPlayerScreen } from './LessonPlayerScreen';
import {
  Sparkles,
  ArrowRight,
  Star,
  Play,
  CheckCircle2,
  Flame,
  Award,
  Volume2,
} from 'lucide-react';

interface Props {
  profile: UserProfile;
  onTakePlacement: () => void;
}

export const LearnerHomeScreen: React.FC<Props> = ({
  profile,
  onTakePlacement,
}) => {
  const { lang, isUrdu, isSindhi, t } = useLanguage();

  // Navigation State inside Learner Home
  const [activeSubjectId, setActiveSubjectId] = useState<SubjectId | null>(null);
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  // If a lesson is being played, render the LessonPlayer
  if (activeLessonId) {
    return (
      <LessonPlayerScreen
        lessonId={activeLessonId}
        onBackToSyllabus={() => {
          const lesson = getLessonById(activeLessonId);
          setActiveLessonId(null);
          if (lesson) setActiveSubjectId(lesson.subjectId);
        }}
        onNavigateLesson={(nextId) => {
          setActiveLessonId(nextId);
        }}
      />
    );
  }

  // If a subject curriculum is opened, render the SubjectCurriculumScreen
  if (activeSubjectId) {
    return (
      <SubjectCurriculumScreen
        subjectId={activeSubjectId}
        onSelectLesson={(lessonId) => {
          setActiveLessonId(lessonId);
        }}
        onBackToDashboard={() => {
          setActiveSubjectId(null);
        }}
      />
    );
  }

  // Otherwise, render the Main Educational Dashboard
  const overallProgress = getOverallProgressPercent(profile.id);
  const completedLessons = getCompletedLessonIds(profile.id);
  const streakDays = getLearningStreak();
  const nextRec = getNextRecommendedLesson(profile.id);
  const recLesson = getLessonById(nextRec.lessonId);
  const recSubject = SUBJECTS_MAP[nextRec.subjectId];

  const handleResume = () => {
    if (recLesson) {
      setActiveLessonId(recLesson.id);
      tts.speak(recLesson.title[lang], lang);
    }
  };

  const handleOpenSubject = (subId: SubjectId) => {
    setActiveSubjectId(subId);
    const sub = SUBJECTS_MAP[subId];
    if (sub) {
      tts.speak(sub.title[lang], lang);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-8 animate-in fade-in duration-200">
      {/* 1. Welcome & Learner Hero Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-800/50 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Soft decorative glow circles */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-5 text-center md:text-start relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-5xl shadow-xl border border-white/20 shrink-0">
            {profile.avatar}
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5 flex-wrap">
              <span className="text-xs bg-teal-700/80 px-3 py-1 rounded-full font-bold text-teal-100 border border-teal-600/30">
                {isSindhi ? profile.roleSd : isUrdu ? profile.roleUr : profile.role}
              </span>
              <span className="text-xs bg-amber-400 text-amber-950 font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <Star className="w-3.5 h-3.5 fill-amber-950" />
                <span>
                  {profile.stars} {t('stars')}
                </span>
              </span>
              <span className="text-xs bg-rose-500 text-white font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <Flame className="w-3.5 h-3.5 fill-white" />
                <span>
                  {streakDays} {t('learningStreak')}
                </span>
              </span>
            </div>

            <h2
              className={`text-2xl sm:text-3xl font-black tracking-tight ${
                isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
              }`}
            >
              {profile.name}
            </h2>
            <p className="text-xs text-teal-200/90 font-medium mt-1">
              {isSindhi ? profile.levelSd : isUrdu ? profile.levelUr : profile.level} •{' '}
              {isSindhi ? profile.pathwaySd : isUrdu ? profile.pathwayUr : profile.pathway}
            </p>
          </div>
        </div>

        {/* Retake assessment action */}
        <button
          onClick={onTakePlacement}
          className="relative z-10 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-white text-xs font-black border border-white/20 transition-all flex items-center gap-2.5 shrink-0 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{t('retakeQuiz')}</span>
        </button>
      </div>

      {/* 2. Overall Progress Overview & Continue Learning Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Progress Metric Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {t('overallProgress')}
              </span>
              <span className="text-xs font-black text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                {completedLessons.length} {t('completed')}
              </span>
            </div>
            <div className="text-3xl font-black text-slate-900 mb-2">
              {overallProgress}%
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-bold">
              <Award className="w-4 h-4 text-amber-500" />
              <span>
                {profile.stars} {t('stars')}
              </span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-rose-600">
              <Flame className="w-4 h-4" />
              <span>
                {streakDays} {t('learningStreak')}
              </span>
            </span>
          </div>
        </div>

        {/* Continue Learning / Recommended Lesson Card */}
        {recLesson && (
          <div className="lg:col-span-2 bg-gradient-to-r from-teal-900 to-emerald-900 text-white rounded-3xl p-6 shadow-md border border-teal-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
            <div className="space-y-2 relative z-10 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 text-white px-2.5 py-0.5 rounded-md">
                  {t('recommendedForYou')}
                </span>
                <span className="text-xs text-emerald-300 font-bold">
                  {recSubject?.title[lang]}
                </span>
              </div>

              <h3
                className={`text-lg sm:text-xl font-black text-white ${
                  isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
                }`}
              >
                {recLesson.title[lang]}
              </h3>

              <p className="text-xs text-teal-100/90 line-clamp-2 leading-relaxed">
                {recLesson.content.introduction[lang]}
              </p>
            </div>

            <button
              onClick={handleResume}
              className="relative z-10 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-95 text-amber-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shrink-0 transition-all"
            >
              <Play className="w-4 h-4 fill-amber-950" />
              <span>{t('resumeLearning')}</span>
              <ArrowRight className="w-4 h-4 rtl:-scale-x-100" />
            </button>
          </div>
        )}
      </div>

      {/* 3. Academic Subjects Grid (6 Distinct Curriculum Subjects) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div>
            <h3
              className={`text-xl sm:text-2xl font-black text-slate-900 ${
                isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
              }`}
            >
              {t('subjects')}
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {t('pathwaySubtitle')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_CURRICULUM_SUBJECTS.map((sub) => {
            const subProgress = getSubjectProgressPercent(sub.id, profile.id);
            const subCompleted = getSubjectCompletedCount(sub.id, profile.id);

            return (
              <div
                key={sub.id}
                onClick={() => handleOpenSubject(sub.id)}
                className={`group relative bg-white p-6 rounded-3xl border-2 ${sub.accentBorder} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 active:scale-[0.985] flex flex-col justify-between cursor-pointer min-h-[300px]`}
              >
                <div>
                  {/* Top: Icon + Badge + Audio Pronunciation */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-3xl shadow-inner border border-slate-200/70 group-hover:scale-105 transition-transform">
                      {sub.emoji}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${sub.badgeBg}`}>
                        {sub.tag[lang]}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          tts.speak(sub.title[lang], lang);
                        }}
                        className="p-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 shadow-2xs border border-slate-200"
                        title={t('listenAudio')}
                      >
                        <Volume2 className="w-3.5 h-3.5 text-teal-800" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h4
                    className={`text-lg font-black text-slate-900 group-hover:text-teal-900 transition-colors mb-1.5 ${
                      isUrdu ? 'font-urdu' : isSindhi ? 'font-sindhi' : ''
                    }`}
                  >
                    {sub.title[lang]}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {sub.description[lang]}
                  </p>
                </div>

                {/* Bottom: Progress Bar & Syllabus Link */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span>
                      {subCompleted} / {sub.lessons.length} {t('lessonsCompleted')}
                    </span>
                    <span className="font-black text-teal-900">{subProgress}%</span>
                  </div>

                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-teal-600 rounded-full transition-all duration-300"
                      style={{ width: `${subProgress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-black text-teal-800 flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                      <span>{t('viewCurriculum')}</span>
                      <ArrowRight className="w-3.5 h-3.5 rtl:-scale-x-100" />
                    </span>
                    {subProgress === 100 && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
