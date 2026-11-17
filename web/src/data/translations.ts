import type { Language } from '../types';

/**
 * Every leaf MUST provide all three languages. The `satisfies` clause below makes the
 * TypeScript compiler reject any entry that is missing `en`, `ur` or `sd`.
 */
export type Leaf = Record<Language, string>;
export interface TranslationTree {
  [key: string]: Leaf | TranslationTree;
}

export const translations = {
  appName: {
    ur: 'تعلیم سے ترقی',
    sd: 'تعليم سي ترقي',
    en: 'Taleem Se Taraqqi',
  },
  tagline: {
    ur: 'علم، ہنر اور خوشحال زندگی کا ڈیجیٹل پورٹل',
    sd: 'علم، هنر ۽ خوشحال زندگي جو ڊجيٽل پورٽل',
    en: 'Digital Portal for Literacy, Skills & Livelihood',
  },
  offlineReadyPlanned: {
    ur: 'آف لائن دستیابی (منصوبہ بندی)',
    sd: 'آف لائن تيار (منصوبابندي)',
    en: 'Offline-ready (planned)',
  },
  illustrativeOnly: {
    ur: 'صرف علامتی (Illustrative only)',
    sd: 'رڳو علامتي (Illustrative only)',
    en: 'Illustrative only',
  },
  chooseLanguage: {
    ur: 'اپنی پسندیدہ زبان منتخب کریں',
    sd: 'پنهنجي پسند جي ٻولي چونڊيو',
    en: 'Choose Your Preferred Language',
  },
  welcomePrompt: {
    ur: 'پڑھائی، ریاضی، سائنس، زراعت اور صحت سیکھنے کے لیے آگے بڑھیں:',
    sd: 'پڙهائي، حساب، سائنس، ٻني ٻارو ۽ صحت سکڻ لاءِ اڳتي وڌو:',
    en: 'Step forward to learn literacy, maths, physics, chemistry, farming & health:',
  },
  startLearning: {
    ur: 'سیکھنا شروع کریں',
    sd: 'سکڻ شروع ڪريو',
    en: 'Start Learning',
  },
  continueLearning: {
    ur: 'پڑھائی جاری رکھیں',
    sd: 'سکيا جاري رکو',
    en: 'Continue Learning',
  },
  backToHome: {
    ur: 'مرکز پر واپس جائیں',
    sd: 'مرڪز تي واپس وڃو',
    en: 'Back to Home',
  },
  listenAudio: {
    ur: 'آواز سنیں',
    sd: 'آواز ٻڌو',
    en: 'Listen Audio',
  },
  listenExplanation: {
    ur: 'استاد کی وضاحت سنیں',
    sd: 'استاد جي سمجهاڻي ٻڌو',
    en: 'Listen to Teacher',
  },
  teacherExplanation: {
    ur: 'استاد کی وضاحت (Lesson Concept)',
    sd: 'استاد جي سمجهاڻي (Lesson Concept)',
    en: "Teacher's Lesson Explanation",
  },
  interactivePractice: {
    ur: 'عملی مشق و لیب (Interactive Lab)',
    sd: 'عملي مشق ۽ ليب (Interactive Lab)',
    en: 'Interactive Practice & Lab',
  },
  masteryQuiz: {
    ur: 'مہارت کی جانچ (Mastery Quiz)',
    sd: 'مهارت جي چڪاس (Mastery Quiz)',
    en: 'Mastery Quiz & Assessment',
  },
  selectTier: {
    ur: 'تعلیمی سطح منتخب کریں (Learning Tier)',
    sd: 'تعليمي درجو چونڊيو (Learning Tier)',
    en: 'Select Learning Tier',
  },
  tier1: {
    ur: 'سطح ۱: بنیادی (گریڈ ۱-۲)',
    sd: 'درجو ۱: بنيادي (گريڊ ۱-۲)',
    en: 'Tier 1: Foundational (Grade 1–2)',
  },
  tier2: {
    ur: 'سطح ۲: ابتدائی (گریڈ ۳-۵)',
    sd: 'درجو ۲: شروعاتي (گريڊ ۳-۵)',
    en: 'Tier 2: Elementary (Grade 3–5)',
  },
  tier3: {
    ur: 'سطح ۳: متوسط (گریڈ ۶-۸)',
    sd: 'درجو ۳: وچولو (گريڊ ۶-۸)',
    en: 'Tier 3: Middle (Grade 6–8)',
  },
  tier4: {
    ur: 'سطح ۴: عملی روزگار و مہارت',
    sd: 'درجو ۴: عملي روزگار ۽ مهارت',
    en: 'Tier 4: Applied Livelihood & Mastery',
  },
  stepByStepSolution: {
    ur: 'استاد کا تصحیحی حل:',
    sd: 'استاد جو درست حل:',
    en: "Teacher's Step-by-Step Solution:",
  },
  quizCompleted: {
    ur: 'کوئز مکمل! ستارے حاصل ہوئے',
    sd: 'ڪوئز مڪمل! ستارا مليا',
    en: 'Quiz Complete! Stars Earned',
  },
  back: {
    ur: 'واپس',
    sd: 'واپس',
    en: 'Back',
  },
  next: {
    ur: 'اگلا',
    sd: 'اڳيون',
    en: 'Next',
  },
  home: {
    ur: 'مرکز',
    sd: 'مرڪز',
    en: 'Home',
  },
  family: {
    ur: 'فیملی پروفائلز',
    sd: 'فيملي اڪائونٽ',
    en: 'Family Profiles',
  },
  dashboard: {
    ur: 'کمیونٹی ڈیش بورڈ',
    sd: 'ڪميونٽي ڊيش بورڊ',
    en: 'Community Dashboard',
  },
  quiz: {
    ur: 'مہارت کا جائزہ',
    sd: 'مهارت جو جائزو',
    en: 'Placement Quiz',
  },
  difficulty: {
    ur: 'مشکل کی سطح',
    sd: 'ڏکيائي جي سطح',
    en: 'Difficulty Level',
  },
  easy: {
    ur: 'ابتدائی (آسان)',
    sd: 'شروعاتي (سولو)',
    en: 'Beginner (Easy)',
  },
  medium: {
    ur: 'درمیانی (متوسط)',
    sd: 'وچولو (وچٿرو)',
    en: 'Intermediate (Medium)',
  },
  hard: {
    ur: 'اعلیٰ (جامع)',
    sd: 'اعليٰ (مشڪل)',
    en: 'Advanced (Hard)',
  },
  stars: {
    ur: 'ستارے',
    sd: 'ستارا',
    en: 'Stars',
  },
  pointsEarned: {
    ur: 'ستارے حاصل کیے',
    sd: 'ستارا حاصل ڪيا',
    en: 'Stars Earned',
  },
  claimReward: {
    ur: 'انعام حاصل کریں ⭐',
    sd: 'انعام حاصل ڪريو ⭐',
    en: 'Claim Reward ⭐',
  },
  clear: {
    ur: 'صاف کریں',
    sd: 'صاف ڪريو',
    en: 'Clear',
  },
  checkAnswer: {
    ur: 'جواب چیک کریں',
    sd: 'جواب چيڪ ڪريو',
    en: 'Check Answer',
  },
  correct: {
    ur: 'شاباش! درست جواب',
    sd: 'شاباس! صحيح جواب',
    en: 'Correct! Well Done',
  },
  tryAgain: {
    ur: 'دوبارہ کوشش کریں',
    sd: 'ٻيهر ڪوشش ڪريو',
    en: 'Try Again',
  },
  nextQuestion: {
    ur: 'اگلا سوال',
    sd: 'اڳيون سوال',
    en: 'Next Question',
  },
  question: {
    ur: 'سوال',
    sd: 'سوال',
    en: 'Question',
  },
  score: {
    ur: 'اسکور',
    sd: 'اسڪور',
    en: 'Score',
  },
  learningObjectives: {
    ur: 'سیکھنے کے اہم مقاصد',
    sd: 'سکڻ جا مکيه مقصد',
    en: 'Learning Objectives',
  },
  conceptAndTheory: {
    ur: 'بنیادی تصور و استاد کی سمجھانی',
    sd: 'بنيادي تصور ۽ استاد جي سمجهاڻي',
    en: 'Concept & Lesson Theory',
  },
  practicalExample: {
    ur: 'روزمرہ عملی مثال',
    sd: 'روزمره عملي مثال',
    en: 'Everyday Practical Example',
  },
  interactiveLab: {
    ur: 'عملی تجربہ گاہ و لیب',
    sd: 'عملي ليب ۽ مشق',
    en: 'Interactive Practice Lab',
  },
  exercises: {
    ur: 'مشقی سوالات و جانچ',
    sd: 'مشق جا سوال ۽ چڪاس',
    en: 'Practice Exercises & Quiz',
  },
  lessonCompleted: {
    ur: 'سبق مکمل! شاباش!',
    sd: 'سبق مڪمل! تمام بهترين!',
    en: 'Lesson Completed! Well Done!',
  },
  completed: {
    ur: 'مکمل',
    sd: 'مڪمل',
    en: 'Completed',
  },
  unlocked: {
    ur: 'دستیاب',
    sd: 'کليل',
    en: 'Available',
  },
  locked: {
    ur: 'مقفل (پہلے پچھلا سبق مکمل کریں)',
    sd: 'بند (اڳيون سبق پورو ڪريو)',
    en: 'Locked (Prerequisite Required)',
  },
  nextLesson: {
    ur: 'اگلا سبق',
    sd: 'اڳيون سبق',
    en: 'Next Lesson',
  },
  prevLesson: {
    ur: 'پچھلا سبق',
    sd: 'پوئتي سبق',
    en: 'Previous Lesson',
  },
  resumeLearning: {
    ur: 'پڑھائی جاری رکھیں',
    sd: 'سکيا جاري رکو',
    en: 'Resume Learning',
  },
  recommendedForYou: {
    ur: 'آپ کے لیے تجویز کردہ اگلا سبق',
    sd: 'توهان لاءِ تجويز ڪيل اڳيون سبق',
    en: 'Recommended Next Lesson',
  },
  viewCurriculum: {
    ur: 'نصاب دیکھیں',
    sd: 'نصاب ڏسو',
    en: 'View Syllabus',
  },
  learningStreak: {
    ur: 'مسلسل پڑھائی',
    sd: 'مسلسل پڙهائي',
    en: 'Day Streak',
  },
  overallProgress: {
    ur: 'مجموعی تعلیمی پیش رفت',
    sd: 'مجموعي تعليمي ترقي',
    en: 'Overall Learning Progress',
  },
  lessonsCompleted: {
    ur: 'مکمل شدہ اسباق',
    sd: 'پورا ٿيل سبق',
    en: 'Lessons Completed',
  },
  backToSyllabus: {
    ur: 'فہرست اسباق پر واپس',
    sd: 'فهرست ڏي واپس',
    en: 'Back to Syllabus',
  },
  congratulations: {
    ur: 'مبارک ہو! بہترین کارکردگی!',
    sd: 'مبارڪون! شاندار ڪم!',
    en: 'Congratulations! Great job!',
  },
  prerequisiteNotice: {
    ur: 'اس سبق کو کھولنے کے لیے پچھلا سبق مکمل کریں:',
    sd: 'هن سبق کي کولڻ لاءِ اڳيون سبق پورو ڪريو:',
    en: 'Complete the prerequisite lesson to unlock:',
  },
  estimatedTime: {
    ur: 'دورانیہ',
    sd: 'وقت',
    en: 'Duration',
  },
  subjects: {
    ur: 'تعلیمی مضامین',
    sd: 'تعليمي مضمون',
    en: 'Academic Subjects',
  },
  chapter: {
    ur: 'باب',
    sd: 'باب',
    en: 'Chapter',
  },
  lesson: {
    ur: 'سبق',
    sd: 'سبق',
    en: 'Lesson',
  },
  // 6 Top-Level Modules
  modules: {
    literacy: {
      title: {
        ur: 'زبان و حروف شناسی',
        sd: 'ٻولي ۽ اکر شناسي',
        en: 'Languages & Literacy',
      },
      subtitle: {
        ur: 'اردو، سندھی اور انگریزی حروف، صوتیات، الفاظ سازی اور دستاویزات فہمی',
        sd: 'سنڌي، اردو ۽ انگريزي اکر، آواز، لفظ ٺاهڻ ۽ عملي دستاويز پڙهڻ',
        en: 'Trilingual phonics, word building, canvas tracing & practical reading',
      },
      tag: {
        ur: 'اردو • سنڌي • English',
        sd: 'سنڌي • اردو • English',
        en: 'Urdu • Sindhi • English',
      },
    },
    math: {
      title: {
        ur: 'بنیادی و عملی ریاضی',
        sd: 'بنيادي ۽ عملي حساب',
        en: 'Applied Mathematics',
      },
      subtitle: {
        ur: 'گنتی، بازار کا بقایا، گھریلو بجٹ، زرعی اراضی کنورٹر اور قرضہ مارک اپ',
        sd: 'ڳڻپ، بازار جو بقايا، گھريلو بجيٽ، زرعي زمين ماپ ۽ قرض مارڪ اپ',
        en: 'Manipulatives counting, PKR register, family budget, land & loan markup',
      },
      tag: {
        ur: 'حساب • کرنسی • اراضی',
        sd: 'ڳڻپ • نوٽ • زمين',
        en: 'Cash • Land • Markup',
      },
    },
    physics: {
      title: {
        ur: 'طبیعیات و دیہی توانائی',
        sd: 'فزڪس ۽ ڳوٺاڻي توانائي',
        en: 'Physics & Rural Energy',
      },
      subtitle: {
        ur: 'سادہ مشینیں، حرارت و بخارات، سولر پینل و بیٹری، اور ٹیوب ویل واٹر فلو',
        sd: 'ساديون مشينون، گرمي ۽ پاڻي جون حالتون، سولر بيٽري ۽ ٽيوب ويل فلو',
        en: 'Simple machines, heat states, solar PV & battery Ah, tube well hydraulics',
      },
      tag: {
        ur: 'چرخی • سولر • ٹیوب ویل',
        sd: 'چرخي • سولر • واٽر پمپ',
        en: 'Pulleys • Solar • Hydraulics',
      },
    },
    chemistry: {
      title: {
        ur: 'کیمیا، پانی و زرعی مٹی',
        sd: 'ڪيمسٽري، پاڻي ۽ زمين',
        en: 'Chemistry, Water & Soil',
      },
      subtitle: {
        ur: 'پینے کا صاف پانی، مٹی کی پی ایچ و جپسم، این پی کے کھادیں اور اسپرے سیفٹی',
        sd: 'صاف پيئڻ جو پاڻي، زمين جي پي ايڇ ۽ جپسم، ڀاڻ جو حساب ۽ دوائن جي حفاظت',
        en: 'Clean water science, soil pH & gypsum, NPK fertilizers, WHO hazard bands',
      },
      tag: {
        ur: 'پانی • جپسم • کھاد',
        sd: 'پاڻي • جپسم • ڀاڻ',
        en: 'Water • Soil pH • Sprays',
      },
    },
    agriculture: {
      title: {
        ur: 'کھیتی باڑی اور زرعی منافع',
        sd: 'ٻني ٻارو ۽ منافعي جو حساب',
        en: 'Agriculture & Farm P&L',
      },
      subtitle: {
        ur: 'بیج و فصلیں، آبپاشی و آئی پی ایم، مویشی دیکھ بھال، اور مکمل منافع بیلنس شیٹ',
        sd: 'ٻج ۽ فصلي ڪيلينڊر، پاڻي ۽ ڪينئان، مال جي سنڀال، ۽ منافعو بيلنس شيٽ',
        en: 'Crop calendar, IPM protection, livestock vaccination & farm P&L accounting',
      },
      tag: {
        ur: 'دھان • گندم • بیلنس شیٹ',
        sd: 'چانور • ڪڻڪ • منافعو',
        en: 'Rice • Wheat • Farm P&L',
      },
    },
    health: {
      title: {
        ur: 'صحت، فرسٹ ایڈ و ریسکیو 1122',
        sd: 'صحت، فرسٽ ايڊ ۽ ريسڪيو 1122',
        en: 'Health, First Aid & Safety',
      },
      subtitle: {
        ur: 'نمکول تیاری، موسمی امراض، فرسٹ ایڈ پروٹوکول، اور ایمرجنسی ٹرائیج 1122',
        sd: 'نمڪول تيار ڪرڻ، بيمارين کان بچاءُ، فرسٽ ايڊ، ۽ ايمرجنسي ريسڪيو 1122',
        en: 'ORS preparation, disease prevention, first aid drills, emergency triage 1122',
      },
      tag: {
        ur: 'ریسکیو 1122 • فرسٹ ایڈ',
        sd: 'ريسڪيو 1122 • فرسٽ ايڊ',
        en: 'Rescue 1122 • First Aid',
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Shell: navbar, welcome hero, learner home, voice notices
  // ---------------------------------------------------------------------------
  langNameNative: {
    ur: 'اردو',
    sd: 'سنڌي',
    en: 'English',
  },
  changeLanguage: {
    ur: 'زبان تبدیل کریں',
    sd: 'ٻولي تبديل ڪريو',
    en: 'Change language',
  },
  switchProfile: {
    ur: 'فیملی پروفائل تبدیل کریں',
    sd: 'فيملي پروفائل تبديل ڪريو',
    en: 'Switch household profile',
  },
  facilitatorDashboardTip: {
    ur: 'منتظم / کمیونٹی ڈیش بورڈ',
    sd: 'منتظم / ڪميونٽي ڊيش بورڊ',
    en: 'Facilitator / community dashboard',
  },
  realVsSimulatedTip: {
    ur: 'کیا حقیقی ہے اور کیا نقلی؟',
    sd: 'ڇا حقيقي آهي ۽ ڇا نقلي؟',
    en: "What's real vs. what's simulated",
  },
  heroBadge: {
    ur: 'تعلیم سب کے لیے — پاکستان',
    sd: 'سڀني لاءِ تعليم — پاڪستان',
    en: 'Education for All — Pakistan',
  },
  langCardSub: {
    ur: 'قومی زبان • آسان سبق',
    sd: 'علائقائي ٻولي • آسان سکيا',
    en: 'Global / Practical STEM',
  },
  welcomeSpeech: {
    ur: 'خوش آمدید! تعلیم سے ترقی میں اپنی پسند کی زبان منتخب کریں اور سیکھنا شروع کریں۔',
    sd: 'ڀليڪار! تعليم سي ترقي ۾ پنهنجي پسند جي ٻولي چونڊيو ۽ سکڻ شروع ڪريو.',
    en: 'Welcome to Taleem Se Taraqqi! Choose your preferred language and start learning.',
  },
  langSelectedSpeech: {
    ur: 'خوش آمدید! اردو زبان منتخب ہو گئی ہے۔',
    sd: 'ڀليڪار! سنڌي ٻولي چونڊجي وئي آهي.',
    en: 'Welcome! English language has been selected.',
  },
  langSelectedBadge: {
    ur: 'منتخب',
    sd: 'چونڊيل',
    en: 'Selected',
  },
  replayWelcome: {
    ur: 'خوش آمدید کا آڈیو دوبارہ سنیں',
    sd: 'ڀليڪار جو آواز ٻيهر ٻڌو',
    en: 'Replay welcome audio',
  },
  retakeQuiz: {
    ur: 'مہارت کا تشخیصی جائزہ دوبارہ دیں',
    sd: 'مهارت جو جائزو ٻيهر ڏيو',
    en: 'Retake diagnostic quiz',
  },
  choosePathway: {
    ur: 'اپنا تعلیمی شعبہ منتخب کریں',
    sd: 'پنهنجو سکيا وارو شعبو چونڊيو',
    en: 'Select your learning pathway',
  },
  pathwaySubtitle: {
    ur: '6 مکمل طور پر فعال موضوعات: بڑے ٹچ ٹارگٹس، صوتی رہنمائی، حقیقی مشقیں اور سائنسی لیبز',
    sd: '6 مڪمل طور تي فعال موضوع: وڏا ٽچ ٽارگيٽ، آواز، مشقون ۽ سائنسي ليب',
    en: '6 fully functional modules with large touch targets, audio guidance and interactive labs.',
  },
  progress: {
    ur: 'پیشرفت',
    sd: 'ترقي',
    en: 'Progress',
  },
  voiceNoticeLabel: {
    ur: 'آواز کی اطلاع',
    sd: 'آواز جي اطلاع',
    en: 'Voice notice',
  },
  voiceUnavailable: {
    ur: '[صوتی سہولت موجود نہیں - ٹیکسٹ موڈ فعال]',
    sd: '[آواز جي سهولت موجود ناهي - ٽيڪسٽ موڊ فعال]',
    en: '[Voice not available on this device - text mode active]',
  },
  voiceApproximate: {
    ur: '[اس براؤزر میں اردو آواز نہیں؛ قریب ترین متبادل آواز استعمال ہو رہی ہے]',
    sd: '[هن براؤزر ۾ سنڌي آواز ناهي؛ ويجهي ۾ ويجهي متبادل آواز استعمال ٿي رهي آهي]',
    en: '[No native voice for this language; using the closest available voice]',
  },

  // ---------------------------------------------------------------------------
  // "What's real vs. simulated" modal
  // ---------------------------------------------------------------------------
  limits: {
    title: {
      ur: 'کیا حقیقی ہے اور کیا نقلی / علامتی ہے',
      sd: 'ڇا حقيقي آهي ۽ ڇا ڊيمو / نقلي آهي',
      en: "What's Real vs. What's Simulated",
    },
    subtitle: {
      ur: 'تعلیم سے ترقی • پروٹوٹائپ کی شفافیت اور جانچ',
      sd: 'تعليم سي ترقي • پروٽو ٽائپ جي شفافيت ۽ جاچ',
      en: 'Taleem Se Taraqqi • Prototype transparency & audit',
    },
    coverageTitle: {
      ur: 'تمام 6 تعلیمی شعبے اور 4 سطحی نصاب',
      sd: 'سڀ 6 تعليمي شعبا ۽ 4 سطحن وارو نصاب',
      en: 'All 6 modules covered (Tiers 1 to 4)',
    },
    realTitle: {
      ur: 'حقیقی طور پر کام کرنے والی خصوصیات',
      sd: 'حقيقي طور ڪم ڪندڙ خاصيتون',
      en: 'Genuinely implemented capabilities',
    },
    simulatedTitle: {
      ur: 'نقلی اور ڈیمو خصوصیات',
      sd: 'نقلي ۽ ڊيمو خاصيتون',
      en: 'Simulated features & sample data (DEMO)',
    },
    close: {
      ur: 'سمجھ گیا',
      sd: 'سمجھي ويس',
      en: 'Understood',
    },
    realFontsTitle: {
      ur: 'مقامی فونٹس',
      sd: 'مقامي فونٽ',
      en: 'Self-hosted fonts',
    },
    realFontsBody: {
      ur: 'Inter، نوٹو نستعلیق اردو اور نوٹو نسخ عربی فونٹس مقامی پیکجز سے لوڈ ہوتے ہیں؛ کسی بیرونی فونٹ سرور سے رابطہ نہیں ہوتا۔',
      sd: 'Inter، نوٽو نستعليق اردو ۽ نوٽو نسخ عربي فونٽ مقامي پيڪيجز مان لوڊ ٿين ٿا؛ ڪنهن ٻاهرين فونٽ سرور سان رابطو نٿو ٿئي.',
      en: 'Inter, Noto Nastaliq Urdu and Noto Naskh Arabic load from local packages, with no external font server calls.',
    },
    realRtlTitle: {
      ur: 'تین زبانیں اور سمت کی تبدیلی',
      sd: 'ٽي ٻوليون ۽ رخ جي تبديلي',
      en: 'Three languages with RTL/LTR switching',
    },
    realRtlBody: {
      ur: 'اردو، سندھی اور انگریزی فوراً بدلتی ہیں؛ صفحے کی سمت اور فونٹ ایک ساتھ تبدیل ہوتے ہیں۔',
      sd: 'اردو، سنڌي ۽ انگريزي فوري بدلجن ٿيون؛ صفحي جو رخ ۽ فونٽ گڏجي تبديل ٿين ٿا.',
      en: 'Urdu, Sindhi and English switch instantly; page direction and font change together.',
    },
    realStorageTitle: {
      ur: 'مقامی پروفائلز اور پیشرفت',
      sd: 'مقامي پروفائل ۽ ترقي',
      en: 'Local profiles & progress',
    },
    realStorageBody: {
      ur: 'خاندان کے پروفائلز، تصویری پن اور ستارے صرف اس براؤزر کی localStorage میں محفوظ ہوتے ہیں؛ کچھ بھی سرور پر نہیں بھیجا جاتا۔',
      sd: 'خاندان جا پروفائل، تصويري پن ۽ ستارا رڳو هن براؤزر جي localStorage ۾ محفوظ ٿين ٿا؛ ڪجهه به سرور ڏانهن نٿو موڪليو وڃي.',
      en: "Family profiles, picture PINs and stars are saved only in this browser's localStorage; nothing is sent to a server.",
    },
    realTracingTitle: {
      ur: 'ٹریسنگ پیڈ کی درستگی',
      sd: 'ٽريسنگ پيڊ جي درستي',
      en: 'Calibrated tracing pad',
    },
    realTracingBody: {
      ur: 'ٹریسنگ کینوس ٹچ یا ماؤس کے نقاط کو کینوس کے سائز کے مطابق ناپتا ہے تاکہ ٹیبلٹ پر لکیر ہٹ کر نہ بنے۔',
      sd: 'ٽريسنگ ڪينواس ٽچ يا مائوس جا نقطا ڪينواس جي ماپ مطابق ٺاهي ٿو ته جيئن ٽيبليٽ تي لڪير هٽي نه ٿئي.',
      en: 'The tracing canvas scales touch/mouse coordinates to the canvas size so lines do not drift on tablets.',
    },
    realMathTitle: {
      ur: 'براہِ راست حساب',
      sd: 'سڌو حساب',
      en: 'Live calculations',
    },
    realMathBody: {
      ur: 'کرنسی کا بقایا، زمین کی پیمائش، قرض کا مارک اپ، چرخی کا فائدہ، سولر سائزنگ، ٹیوب ویل بہاؤ، جپسم مقدار، اسپرے محلول اور فارم کا منافع و نقصان براؤزر میں اصل فارمولوں سے نکلتے ہیں۔ اندراج شدہ اور ابتدائی قیمتیں صرف مثال ہیں؛ مقامی ماہرین سے تصدیق کریں۔',
      sd: 'ڪرنسي جو بقايا، زمين جي ماپ، قرض جو مارڪ اپ، چرخي جو فائدو، سولر سائزنگ، ٽيوب ويل وهڪرو، جپسم مقدار، اسپري محلول ۽ فارم جو نفعو ۽ نقصان براؤزر ۾ اصل فارمولن سان ڳڻيو وڃي ٿو. داخل ٿيل ۽ شروعاتي قيمتون رڳو مثال آهن؛ مقامي ماهرن کان تصديق ڪريو.',
      en: 'Currency change, land-area conversion, loan markup, pulley advantage, solar sizing, tube-well flow, gypsum dosage, spray dilution and farm profit & loss run as real formulas in the browser. Inputs and default prices are examples only; verify with local experts.',
    },
    realSafetyTitle: {
      ur: 'اصول پر مبنی حفاظتی فلٹر',
      sd: 'اصولن تي ٻڌل حفاظتي فلٽر',
      en: 'Rule-based safety filter',
    },
    realSafetyBody: {
      ur: 'ایک مقررہ الفاظ کی فہرست ہنگامی جملوں (سانپ کاٹنا، سینے کا درد، بیٹھی ہوئی بھینس) کو پہچانتی ہے اور دوا کی خوراک کے سوالات سے انکار کرتی ہے۔ یہ طبی تشخیص کا آلہ نہیں ہے اور اس کی الفاظ کی فہرست محدود ہے۔',
      sd: 'هڪ مقرر لفظن جي فهرست هنگامي جملن (نانگ جو چڪ، سيني جو سور، ويٺل ڍڳي) کي سڃاڻي ٿي ۽ دوا جي خوراڪ وارن سوالن کان انڪار ڪري ٿي. هي طبي تشخيص جو اوزار ناهي ۽ ان جي لفظن جي فهرست محدود آهي.',
      en: 'A fixed keyword list detects emergency phrases (snakebite, chest pain, downed animal) and refuses medicine-dosage questions. It is not a medical diagnosis tool and its keyword coverage is limited.',
    },
    simVoiceTitle: {
      ur: 'براؤزر کی آواز',
      sd: 'براؤزر جي آواز',
      en: 'Browser voice',
    },
    simVoiceBody: {
      ur: 'آڈیو براؤزر کی speechSynthesis سے آتا ہے [TEMP AUDIO]۔ آپ کے آلے پر اردو یا سندھی آواز موجود نہ ہو سکتی ہے؛ اصل ریکارڈ شدہ مقامی آوازیں ابھی درکار ہیں۔',
      sd: 'آڊيو براؤزر جي speechSynthesis مان اچي ٿو [TEMP AUDIO]. توهان جي ڊوائيس تي اردو يا سنڌي آواز موجود نه به ٿي سگهي ٿي؛ اصل رڪارڊ ٿيل مقامي آوازن جي اڃا ضرورت آهي.',
      en: "Audio comes from the browser's speechSynthesis [TEMP AUDIO]. Urdu or Sindhi voices may be missing on your device; real recorded local voices are still needed.",
    },
    simCallTitle: {
      ur: 'ہنگامی کال',
      sd: 'هنگامي ڪال',
      en: 'Emergency call',
    },
    simCallBody: {
      ur: 'ریسکیو 1122 کا بٹن صرف [DEMO CALL] پیغام دکھاتا ہے؛ کوئی اصل فون کال نہیں ہوتی۔',
      sd: 'ريسڪيو 1122 جو بٽڻ رڳو [DEMO CALL] پيغام ڏيکاري ٿو؛ ڪا اصل فون ڪال نٿي ٿئي.',
      en: 'The Rescue 1122 button only shows a [DEMO CALL] message; no real phone call is placed.',
    },
    simDashboardTitle: {
      ur: 'منتظم ڈیش بورڈ',
      sd: 'منتظم ڊيش بورڊ',
      en: 'Facilitator dashboard',
    },
    simDashboardBody: {
      ur: 'گاؤں کے طلبہ کے اعداد و شمار اور ہم آہنگی کی کیفیت نمونے کا ڈیٹا ہے [DEMO DASHBOARD]۔',
      sd: 'ڳوٺ جي شاگردن جا انگ اکر ۽ هم وقت سازي جي حالت نموني جو ڊيٽا آهي [DEMO DASHBOARD].',
      en: 'Village cohort figures and sync status are sample data [DEMO DASHBOARD].',
    },
    simNotesTitle: {
      ur: 'علامتی پاکستانی کرنسی نوٹ',
      sd: 'علامتي پاڪستاني ڪرنسي نوٽ',
      en: 'Illustrative PKR notes',
    },
    simNotesBody: {
      ur: 'نوٹوں کی تصاویر صرف سیکھنے کے لیے ہیں [صرف علامتی] اور قانونی کرنسی نہیں ہیں۔',
      sd: 'نوٽن جون تصويرون رڳو سکڻ لاءِ آهن [رڳو علامتي] ۽ قانوني ڪرنسي ناهن.',
      en: 'Banknote graphics are teaching illustrations [Illustrative only], not legal tender.',
    },
    simContentTitle: {
      ur: 'نصاب کا مواد',
      sd: 'نصاب جو مواد',
      en: 'Curriculum content',
    },
    simContentBody: {
      ur: 'صحت، زراعت اور حفاظت کا مواد ابھی پاکستانی ماہرین یا تعلیمی حکام سے جانچا نہیں گیا؛ اسے صرف نمونے کا مواد سمجھیں۔',
      sd: 'صحت، زراعت ۽ حفاظت جو مواد اڃا پاڪستاني ماهرن يا تعليمي اختيارين کان جاچيو ويو ناهي؛ ان کي رڳو نموني جو مواد سمجهو.',
      en: 'Health, farming and safety content has not been reviewed by qualified Pakistani experts or education authorities; treat it as demonstration material.',
    },
  },
} satisfies TranslationTree;

/** Union of every valid key. Nested groups are addressed with dots, e.g. `modules.math.title`. */
type Paths<T> = {
  [K in keyof T & string]: T[K] extends Leaf ? K : `${K}.${Paths<T[K]>}`;
}[keyof T & string];

export type TranslationKey = Paths<typeof translations>;

const isLeaf = (node: unknown): node is Leaf =>
  typeof node === 'object' && node !== null && 'en' in node && 'ur' in node && 'sd' in node;

/**
 * Resolve a (possibly dotted) key for a language.
 * Falls back to English, then Urdu, if the requested language string is empty.
 */
export function getTranslation(key: TranslationKey, lang: Language): string {
  let node: unknown = translations;
  for (const part of key.split('.')) {
    if (typeof node !== 'object' || node === null) return '';
    node = (node as Record<string, unknown>)[part];
  }
  if (!isLeaf(node)) return '';
  return node[lang] || node.en || node.ur || '';
}
