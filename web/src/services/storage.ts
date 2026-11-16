import type { UserProfile, Language } from '../types';

const PROFILES_KEY = 'tst_household_profiles_v1';
const ACTIVE_PROFILE_KEY = 'tst_active_profile_id_v1';
const LANGUAGE_KEY = 'tst_app_language_v1';

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
  const saved = localStorage.getItem(LANGUAGE_KEY);
  if (saved === 'ur' || saved === 'sd' || saved === 'en') {
    return saved;
  }
  return 'ur';
}

export function saveStoredLanguage(lang: Language): void {
  localStorage.setItem(LANGUAGE_KEY, lang);
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
  localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
}

export function getActiveProfile(): UserProfile {
  const profiles = getStoredProfiles();
  const activeId = localStorage.getItem(ACTIVE_PROFILE_KEY);
  if (activeId) {
    const found = profiles.find(p => p.id === activeId);
    if (found) return found;
  }
  return profiles[0];
}

export function setActiveProfile(id: string): void {
  localStorage.setItem(ACTIVE_PROFILE_KEY, id);
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
  const index = profiles.findIndex(p => p.id === updated.id);
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
