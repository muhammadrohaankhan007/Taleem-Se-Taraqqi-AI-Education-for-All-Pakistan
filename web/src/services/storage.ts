import type { UserProfile, Language } from '../types';
import {
  SUBJECTS_MAP,
  type SubjectId,
  getLessonById,
  getAllLessons,
} from '../data/curriculumData';

const PROFILES_KEY = 'tst_household_profiles_v1';
const ACTIVE_PROFILE_KEY = 'tst_active_profile_id_v1';
export const LANGUAGE_KEY = 'tst_preferred_lang';
/** Earlier builds stored the language here; still read once so users keep their choice. */
const LEGACY_LANGUAGE_KEY = 'tst_app_language_v1';
/** Regional default (Urdu) when nothing has been chosen yet. */
export const DEFAULT_LANGUAGE: Language = 'ur';

const COMPLETED_LESSONS_KEY = 'tst_completed_lessons_v1';
const LAST_ACTIVE_LESSON_KEY = 'tst_last_active_lesson_v1';
const LEARNING_STREAK_KEY = 'tst_learning_streak_v1';

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: 'p_child_1',
    name: 'زینب (Zainab)',
    role: 'Child (Out of School)',
    roleUr: 'بچی (ابتدائی طالب علم)',
    roleSd: 'ٻار (شروعاتي سکندڙ)',
    avatar: '👧',
    pathway: 'Foundational Literacy',
    pathwayUr: 'بنیادی حروف و صوتیات',
    pathwaySd: 'بنيادي اکر ۽ آواز',
    level: 'Level 0: Non-Reader',
    levelUr: 'سطح 0: غیر خواندہ',
    levelSd: 'ليول 0: اڻ پڙهيل',
    stars: 8,
    pin: ['🌟', '🌙', '🦁', '🍎'],
  },
  {
    id: 'p_mother_2',
    name: 'کلثوم (Kalsoom)',
    role: 'Mother & Homemaker',
    roleUr: 'والدہ (گھریلو معیشت و دستکاری)',
    roleSd: 'والده (گھرو هنر ۽ ڊجيٽل ڪاروبار)',
    avatar: '🧕',
    pathway: 'Digital Commerce & Budgeting',
    pathwayUr: 'گھریلو بچت، خریداری و ایزی پیسہ',
    pathwaySd: 'گھرو بچت، روزگار ۽ ايزي پئسا',
    level: 'Level 1: Emergent Numeracy',
    levelUr: 'سطح 1: بنیادی حساب',
    levelSd: 'ليول 1: بنيادي ڳڻپيوڪر',
    stars: 15,
    pin: ['🌸', '💧', '🌾', '☀️'],
  },
  {
    id: 'p_father_3',
    name: 'بشیر احمد (Bashir)',
    role: 'Father & Smallholder Farmer',
    roleUr: 'والد (دھان کے کسان و مویشی پال)',
    roleSd: 'پيءُ (چانورن جو هاري ۽ مالوند)',
    avatar: '🧑‍🌾',
    pathway: 'Agriculture & Livestock',
    pathwayUr: 'دھان کی کاشت، کھاد اور منافع',
    pathwaySd: 'چانورن جي پوک، ڀاڻ ۽ منافعو',
    level: 'Level 1: Applied Practical',
    levelUr: 'سطح 1: عملی مہارت',
    levelSd: 'ليول 1: عملي ڄاڻ',
    stars: 22,
    pin: ['🌾', '🚜', '🐐', '💧'],
  },
  {
    id: 'p_grandparent_4',
    name: 'بابا محمد (Baba)',
    role: 'Grandparent & Elder',
    roleUr: 'بزرگ (صحت و بنیادی فرسٹ ایڈ)',
    roleSd: 'ڏاڏو (صحت ۽ طبي امداد)',
    avatar: '👴',
    pathway: 'Health & First Aid',
    pathwayUr: 'گھریلو صحت، صفائی و ایمرجنسی',
    pathwaySd: 'گھرو صحت، نمڪول ۽ ايمرجنسي',
    level: 'Level 0: Auditory Learner',
    levelUr: 'سطح 0: صوتی رہنمائی',
    levelSd: 'ليول 0: ٻڌڻ واري سکيا',
    stars: 12,
    pin: ['🌙', '⭐', '❤️', '🕊️'],
  },
];

export const AVAILABLE_AVATARS = ['👧', '👦', '👩', '👨', '🧕', '🧑‍🌾', '👵', '👴', '🧒', '👶'];
export const PIN_SYMBOLS = ['🌟', '🌙', '🦁', '🍎', '🌸', '💧', '🌾', '☀️', '🚜', '🐐', '❤️', '🕊️'];

export function getStoredLanguage(): Language {
  try {
    const saved =
      localStorage.getItem(LANGUAGE_KEY) ?? localStorage.getItem(LEGACY_LANGUAGE_KEY);
    if (saved === 'ur' || saved === 'sd' || saved === 'en') {
      return saved;
    }
  } catch {
    // localStorage can be blocked (private mode / strict settings); fall through to default.
  }
  return DEFAULT_LANGUAGE;
}

export function saveStoredLanguage(lang: Language): void {
  try {
    localStorage.setItem(LANGUAGE_KEY, lang);
  } catch {
    // Non-fatal: the language still changes for this session.
  }
}

export function getStoredProfiles(): UserProfile[] {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) {
      saveStoredProfiles(INITIAL_PROFILES);
      return INITIAL_PROFILES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PROFILES;
  } catch {
    return INITIAL_PROFILES;
  }
}

export function saveStoredProfiles(profiles: UserProfile[]): void {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch {}
}

export function getActiveProfile(): UserProfile {
  const profiles = getStoredProfiles();
  try {
    const activeId = localStorage.getItem(ACTIVE_PROFILE_KEY);
    if (activeId) {
      const found = profiles.find((p) => p.id === activeId);
      if (found) return found;
    }
  } catch {}
  return profiles[0];
}

export function setActiveProfile(id: string): void {
  try {
    localStorage.setItem(ACTIVE_PROFILE_KEY, id);
  } catch {}
}

export function addStoredProfile(profile: UserProfile): boolean {
  const profiles = getStoredProfiles();
  if (profiles.length >= 6) return false;
  profiles.push(profile);
  saveStoredProfiles(profiles);
  return true;
}

export function updateStoredProfile(updated: UserProfile): void {
  const profiles = getStoredProfiles();
  const index = profiles.findIndex((p) => p.id === updated.id);
  if (index >= 0) {
    profiles[index] = updated;
    saveStoredProfiles(profiles);
  }
}

export function awardStarsToActiveProfile(count: number): UserProfile {
  const active = getActiveProfile();
  const updated = { ...active, stars: active.stars + count };
  updateStoredProfile(updated);
  return updated;
}

// ============================================================================
// LESSON PROGRESSION & COMPLETION PERSISTENCE
// ============================================================================
interface ProgressStore {
  [profileId: string]: {
    completed: string[];
    scores: Record<string, number>;
  };
}

function readProgressStore(): ProgressStore {
  try {
    const raw = localStorage.getItem(COMPLETED_LESSONS_KEY);
    if (raw) {
      return JSON.parse(raw) as ProgressStore;
    }
  } catch {}
  return {};
}

function writeProgressStore(store: ProgressStore): void {
  try {
    localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(store));
  } catch {}
}

export function getCompletedLessonIds(profileId?: string): string[] {
  const pid = profileId || getActiveProfile().id;
  const store = readProgressStore();
  const profileProgress = store[pid];
  if (profileProgress && Array.isArray(profileProgress.completed)) {
    return profileProgress.completed;
  }
  // Default: start with foundational lesson 1 completed for non-new profiles
  return ['lit_1', 'phys_1', 'math_1'];
}

export function isLessonCompleted(lessonId: string, profileId?: string): boolean {
  const completed = getCompletedLessonIds(profileId);
  return completed.includes(lessonId);
}

export function isLessonUnlocked(lessonId: string, profileId?: string): boolean {
  const lesson = getLessonById(lessonId);
  if (!lesson) return false;
  // If no prerequisite, it is open from the start
  if (!lesson.prerequisiteLessonId) return true;
  // Otherwise, prerequisite must be completed
  return isLessonCompleted(lesson.prerequisiteLessonId, profileId);
}

export function markLessonCompleted(
  lessonId: string,
  score: number = 100,
  profileId?: string,
): void {
  const pid = profileId || getActiveProfile().id;
  const store = readProgressStore();
  if (!store[pid]) {
    store[pid] = { completed: [], scores: {} };
  }
  if (!store[pid].completed.includes(lessonId)) {
    store[pid].completed.push(lessonId);
  }
  store[pid].scores[lessonId] = score;
  writeProgressStore(store);

  // Award stars (3 stars for completing a lesson)
  awardStarsToActiveProfile(3);

  // Update streak
  updateLearningStreak();
}

export function getSubjectCompletedCount(subjectId: SubjectId, profileId?: string): number {
  const subject = SUBJECTS_MAP[subjectId];
  if (!subject) return 0;
  const completed = getCompletedLessonIds(profileId);
  return subject.lessons.filter((l) => completed.includes(l.id)).length;
}

export function getSubjectProgressPercent(subjectId: SubjectId, profileId?: string): number {
  const subject = SUBJECTS_MAP[subjectId];
  if (!subject || subject.lessons.length === 0) return 0;
  const completedCount = getSubjectCompletedCount(subjectId, profileId);
  return Math.round((completedCount / subject.lessons.length) * 100);
}

export function getOverallProgressPercent(profileId?: string): number {
  const all = getAllLessons();
  if (all.length === 0) return 0;
  const completed = getCompletedLessonIds(profileId);
  const count = all.filter((l) => completed.includes(l.id)).length;
  return Math.round((count / all.length) * 100);
}

export function getLastActiveLesson(profileId?: string): {
  subjectId: SubjectId;
  lessonId: string;
} {
  const pid = profileId || getActiveProfile().id;
  try {
    const raw = localStorage.getItem(`${LAST_ACTIVE_LESSON_KEY}_${pid}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.subjectId && parsed.lessonId) {
        return parsed;
      }
    }
  } catch {}
  // Default to next recommended lesson
  return getNextRecommendedLesson(pid);
}

export function setLastActiveLesson(
  subjectId: SubjectId,
  lessonId: string,
  profileId?: string,
): void {
  const pid = profileId || getActiveProfile().id;
  try {
    localStorage.setItem(
      `${LAST_ACTIVE_LESSON_KEY}_${pid}`,
      JSON.stringify({ subjectId, lessonId }),
    );
  } catch {}
}

export function getNextRecommendedLesson(profileId?: string): {
  subjectId: SubjectId;
  lessonId: string;
} {
  const all = getAllLessons();
  const completed = getCompletedLessonIds(profileId);
  // Find the first lesson that is NOT completed but IS unlocked
  for (const lesson of all) {
    if (!completed.includes(lesson.id)) {
      if (!lesson.prerequisiteLessonId || completed.includes(lesson.prerequisiteLessonId)) {
        return { subjectId: lesson.subjectId, lessonId: lesson.id };
      }
    }
  }
  // If all completed, return first lesson
  return { subjectId: 'literacy', lessonId: 'lit_1' };
}

export function getLearningStreak(): number {
  try {
    const raw = localStorage.getItem(LEARNING_STREAK_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return typeof parsed.days === 'number' ? parsed.days : 3;
    }
  } catch {}
  return 3; // Default inspiring 3-day active streak
}

function updateLearningStreak(): void {
  try {
    const today = new Date().toISOString().split('T')[0];
    const raw = localStorage.getItem(LEARNING_STREAK_KEY);
    let streak = { days: 1, lastDate: today };
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.lastDate === today) {
        return; // Already counted today
      }
      streak = { days: (parsed.days || 0) + 1, lastDate: today };
    }
    localStorage.setItem(LEARNING_STREAK_KEY, JSON.stringify(streak));
  } catch {}
}
