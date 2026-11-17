import type { Language } from '../types';

export type SubjectId = 'literacy' | 'physics' | 'math' | 'chemistry' | 'agriculture' | 'health';
export type DifficultyLevel = 'beginner' | 'elementary' | 'intermediate' | 'advanced';
export type InteractiveToolType =
  | 'tracing'
  | 'pulley_lever'
  | 'cash_register'
  | 'water_purifier'
  | 'farm_calculator'
  | 'health_triage';

export interface ExerciseItem {
  id: string;
  type: 'multiple_choice' | 'true_false';
  question: Record<Language, string>;
  options: {
    id: string;
    text: Record<Language, string>;
  }[];
  correctAnswer: string; // option id
  explanation: Record<Language, string>;
  hint?: Record<Language, string>;
}

export interface LessonContent {
  introduction: Record<Language, string>;
  keyConcepts: {
    title: Record<Language, string>;
    description: Record<Language, string>;
    bulletPoints?: Record<Language, string>[];
  }[];
  practicalExample: {
    title: Record<Language, string>;
    scenario: Record<Language, string>;
    takeaway: Record<Language, string>;
  };
  visualEmoji: string;
  interactiveTool?: InteractiveToolType;
}

export interface Lesson {
  id: string;
  subjectId: SubjectId;
  chapterNumber: number;
  lessonNumber: number;
  level: DifficultyLevel;
  title: Record<Language, string>;
  topic: Record<Language, string>;
  learningObjectives?: Record<Language, string[]>;
  estimatedMinutes: number;
  prerequisiteLessonId?: string;
  content: LessonContent;
  exercises: ExerciseItem[];
}

export interface Chapter {
  chapterNumber: number;
  title: Record<Language, string>;
  level: DifficultyLevel;
  lessonIds: string[];
}

export interface SubjectCurriculum {
  id: SubjectId;
  title: Record<Language, string>;
  description: Record<Language, string>;
  emoji: string;
  tag: Record<Language, string>;
  badgeBg: string;
  accentBorder: string;
  gradient: string;
  chapters: Chapter[];
  lessons: Lesson[];
}

// ============================================================================
// 1. LANGUAGES & LITERACY CURRICULUM
// Progression:
// Chapter 1 (Beginner): Alphabet & Phonics Foundation (English A-Z, Urdu, Sindhi)
// Chapter 2 (Elementary): Vocabulary & Word Building
// Chapter 3 (Intermediate): Sentence Construction & Functional Reading
// Chapter 4 (Advanced): Literature, Expression & Classical Quotations
// ============================================================================
export const LITERACY_SUBJECT: SubjectCurriculum = {
  id: 'literacy',
  title: {
    en: 'Languages & Literacy',
    ur: 'زبان و حروف شناسی',
    sd: 'ٻولي ۽ اکر شناسي',
  },
  description: {
    en: 'A step-by-step pathway from basic letters and phonics to reading comprehension, practical documents, and classical literature.',
    ur: 'بنیادی حروف اور صوتیات سے لے کر جملہ سازی، روزمرہ دستاویزات اور کلاسیکی ادب تک مرحلہ وار نصاب۔',
    sd: 'بنيادي اکرن ۽ آوازن کان وٺي جملن جي جوڙجڪ، روزمره جي دستاويزن ۽ ڪلاسيڪل ادب تائين منظم نصاب.',
  },
  emoji: '📖',
  tag: {
    en: 'Primary to Advanced',
    ur: 'پرائمری تا اعلیٰ',
    sd: 'پرائمري کان اعليٰ',
  },
  badgeBg: 'bg-sky-100 text-sky-900 border-sky-200',
  accentBorder: 'border-sky-300 hover:border-sky-500',
  gradient: 'from-sky-500 to-blue-600',
  chapters: [
    {
      chapterNumber: 1,
      title: {
        en: 'Chapter 1: Foundational Alphabets & Letter Sounds',
        ur: 'باب ۱: بنیادی حروف، اشکال اور صوتیات',
        sd: 'باب ۱: بنيادي اکر ۽ آواز',
      },
      level: 'beginner',
      lessonIds: ['lit_1', 'lit_2'],
    },
    {
      chapterNumber: 2,
      title: {
        en: 'Chapter 2: Vocabulary & Word Building',
        ur: 'باب ۲: بنیادی الفاظ سازی اور ذخیرہ الفاظ',
        sd: 'باب ۲: بنيادي لفظ ۽ لفظن جي جوڙجڪ',
      },
      level: 'elementary',
      lessonIds: ['lit_3', 'lit_4'],
    },
    {
      chapterNumber: 3,
      title: {
        en: 'Chapter 3: Sentences & Practical Reading',
        ur: 'باب ۳: جملہ سازی اور روزمرہ دستاویز فہمی',
        sd: 'باب ۳: جملن جي جوڙجڪ ۽ دستاويز پڙهڻ',
      },
      level: 'intermediate',
      lessonIds: ['lit_5', 'lit_6'],
    },
    {
      chapterNumber: 4,
      title: {
        en: 'Chapter 4: Advanced Expression & Classical Literature',
        ur: 'باب ۴: اعلیٰ تحریر، ضرب الامثال اور کلاسیکی ادب',
        sd: 'باب ۴: اعليٰ اظهار ۽ ڪلاسيڪل ادب',
      },
      level: 'advanced',
      lessonIds: ['lit_7'],
    },
  ],
  lessons: [
    {
      id: 'lit_1',
      subjectId: 'literacy',
      chapterNumber: 1,
      lessonNumber: 1,
      level: 'beginner',
      title: {
        en: 'Lesson 1: English & Regional Alphabets (Letter Shapes)',
        ur: 'سبق ۱: حروف تہجی کی پہچان اور بنیادی لکیریں',
        sd: 'سبق ۱: اکرن جي سڃاڻپ ۽ بنيادي لکت',
      },
      topic: {
        en: 'Letter Recognition & Tracing',
        ur: 'حروف کی شناخت اور ٹریسنگ',
        sd: 'اکرن جي سڃاڻپ ۽ لکڻ جي مشق',
      },
      learningObjectives: {
        en: [
          'Recognize basic letterforms of English (A, B, C, D) and Urdu/Sindhi (ا، ب، ٻ، ج)',
          'Trace letters smoothly following top-to-bottom and left/right stroke guidelines',
          'Identify common starting objects for each letter',
        ],
        ur: [
          'انگریزی، اردو اور سندھی کے بنیادی حروف کی اشکال پہچاننا',
          'حروف پر انگلی یا قلم سے درست سمت میں ٹریسنگ کرنا',
          'ہر حرف سے شروع ہونے والی روزمرہ اشیاء کی شناخت کرنا',
        ],
        sd: [
          'انگريزي، سنڌي ۽ اردو جي بنيادي اکرن جي سڃاڻپ ڪرڻ',
          'اکرن تي آڱر يا پين سان صحيح رخ ۾ لکڻ جي مشق',
          'هر اکر مان شروع ٿيندڙ عام شين جا نالا ياد رکڻ',
        ],
      },
      estimatedMinutes: 8,
      content: {
        visualEmoji: '✍️',
        interactiveTool: 'tracing',
        introduction: {
          en: 'Every language begins with basic shapes and sounds. In this lesson, we practice tracing foundational letters step by step.',
          ur: 'ہر زبان کی بنیاد چند بنیادی لکیروں اور آوازوں پر ہے۔ اس سبق میں ہم حروف کو درست انداز میں لکھنا اور پہچاننا سیکھیں گے۔',
          sd: 'هر ٻوليءَ جي شروعات بنيادي اکرن ۽ آوازن سان ٿئي ٿي. هن سبق ۾ اسان بنيادي اکر لکڻ ۽ انهن جي سڃاڻپ سکنداسين.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Stroke Direction Matters',
              ur: 'لکھائی کی سمت کی اہمیت',
              sd: 'لکت جو صحيح رخ',
            },
            description: {
              en: 'English letters flow left-to-right (A, B, C). Urdu and Sindhi flow right-to-left (ا، ب، ٻ). Always start from the top anchor.',
              ur: 'انگریزی حروف بائیں سے دائیں لکھے جاتے ہیں جبکہ اردو اور سندھی دائیں سے بائیں تحریر ہوتے ہیں۔',
              sd: 'انگريزي اکر کٻي کان سڄي پاسي جڏهن ته سنڌي اکر سڄي کان کٻي پاسي لکيا ويندا آهن.',
            },
          },
          {
            title: {
              en: 'Connecting Sounds to Pictures',
              ur: 'تصویر سے حرف کا رشتہ',
              sd: 'تصوير مان اکر جي سڃاڻپ',
            },
            description: {
              en: 'A is for Apple (سیب / سوف). B is for Bag (بستہ / ٿيلهو). Connecting images solidifies letter memory.',
              ur: 'حرف "ا" سے انار، "ب" سے بستہ، "A" سے Apple۔ تصویر ذہن میں حرف کی مستقل تصویر بناتی ہے۔',
              sd: 'اکر "ٻ" مان ٻڪري، "ا" مان انب، "A" مان Apple. تصوير سان اکر ذهن ۾ ويهي وڃي ٿو.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Everyday Signpost Recognition',
            ur: 'روزمرہ تختیوں کی پڑھائی',
            sd: 'بورڊ ۽ پليٽون پڙهڻ',
          },
          scenario: {
            en: 'When looking at a village school board or bus stand, recognizing the first letters "B" for Bus or "ا" for School helps you navigate.',
            ur: 'جب آپ بس اسٹاپ یا اسکول کا بورڈ دیکھتے ہیں تو پہلا حرف دیکھ کر فوراً اندازہ ہو جاتا ہے۔',
            sd: 'جڏهن توهان اسڪول يا بس اسٽاپ جو بورڊ ڏسندا آهيو ته پهريون اکر ڏسي اندازو ٿي ويندو آهي.',
          },
          takeaway: {
            en: 'Mastering single letters builds the gateway to all road signs and books.',
            ur: 'حروف کی شناخت تمام تختیوں اور کتابوں کی چابی ہے۔',
            sd: 'اکرن جي سڃاڻپ ڪتاب ۽ بورڊ پڙهڻ جي ڪنجي آهي.',
          },
        },
      },
      exercises: [
        {
          id: 'lit_1_ex1',
          type: 'multiple_choice',
          question: {
            en: 'Which of the following is the uppercase letter "B"?',
            ur: 'درج ذیل میں سے انگریزی کا بڑا حرف "B" کون سا ہے؟',
            sd: 'هيٺين مان انگريزيءَ جو وڏو اکر "B" ڪهڙو آهي؟',
          },
          options: [
            { id: 'opt1', text: { en: 'B', ur: 'B', sd: 'B' } },
            { id: 'opt2', text: { en: 'D', ur: 'D', sd: 'D' } },
            { id: 'opt3', text: { en: 'P', ur: 'P', sd: 'P' } },
          ],
          correctAnswer: 'opt1',
          explanation: {
            en: 'Correct! The letter "B" has a vertical backbone with two rounded lobes on the right side.',
            ur: 'شاباش! حرف "B" میں ایک سیدھی لکیر اور دائیں طرف دو گول دائرے ہوتے ہیں۔',
            sd: 'بلڪل درست! اکر "B" هڪ سڌي ليڪ ۽ ٻه گول دائرا رکندو آهي.',
          },
        },
        {
          id: 'lit_1_ex2',
          type: 'multiple_choice',
          question: {
            en: 'What is the starting letter for the fruit "Apple" (سیب / سوف)?',
            ur: 'پھل "Apple" کا پہلا حرف کون سا ہے؟',
            sd: 'ميوو "Apple" ڪهڙي اکر سان شروع ٿئي ٿو؟',
          },
          options: [
            { id: 'optA', text: { en: 'A', ur: 'A', sd: 'A' } },
            { id: 'optC', text: { en: 'C', ur: 'C', sd: 'C' } },
            { id: 'optM', text: { en: 'M', ur: 'M', sd: 'M' } },
          ],
          correctAnswer: 'optA',
          explanation: {
            en: 'Correct! "A is for Apple".',
            ur: 'درست جواب! لفظ Apple حرف A سے شروع ہوتا ہے۔',
            sd: 'صحيح جواب! لفظ Apple اکر A مان شروع ٿئي ٿو.',
          },
        },
      ],
    },
    {
      id: 'lit_2',
      subjectId: 'literacy',
      chapterNumber: 1,
      lessonNumber: 2,
      level: 'beginner',
      title: {
        en: 'Lesson 2: Alphabet Sounds & Phonetics (Vowels vs Consonants)',
        ur: 'سبق ۲: صوتیات اور حروف کی آوازیں (حروف علت و صحیح)',
        sd: 'سبق ۲: اکرن جا آواز ۽ صوٽيات',
      },
      topic: {
        en: 'Phonetics & Pronunciation',
        ur: 'تلفظ اور صوتی ملاپ',
        sd: 'تلفظ ۽ آوازن جو ميلاپ',
      },
      prerequisiteLessonId: 'lit_1',
      estimatedMinutes: 10,
      content: {
        visualEmoji: '🗣️',
        introduction: {
          en: 'Now that you recognize letter shapes, let us explore how letters create sounds. English vowels (A, E, I, O, U) give breath and life to consonants.',
          ur: 'حروف کی اشکال کے بعد اب ہم ان کی آوازیں سیکھیں گے۔ حروف علت (A, E, I, O, U / ا، و، ہ، ی) الفاظ کو روانی اور آواز عطا کرتے ہیں۔',
          sd: 'اکرن جي شڪلين کان پوءِ هاڻي اسان انهن جا آواز سکنداسين. حرف علت اکرن کي آواز ۽ رواني بخشين ٿا.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Vowels Open the Mouth',
              ur: 'حروف علت کا کلاؤ',
              sd: 'حرف علت جو کليل آواز',
            },
            description: {
              en: 'Vowels produce uninterrupted airflow: /æ/ as in Cat, /e/ as in Bed, /i/ as in Pin.',
              ur: 'حروف علت بغیر کسی رکاوٹ کے زبان سے ادا ہوتے ہیں جیسے ب، پ، ت کے ساتھ زبر، زیر، پیش کی آواز۔',
              sd: 'حرف علت وات مان سڌي هوا سان نڪرندا آهن، جهڙوڪ زبر، زير ۽ پيش جا آواز.',
            },
          },
          {
            title: {
              en: 'Consonant Anchors',
              ur: 'حروف صحیح کی بندش',
              sd: 'حرف صحيح جو بيهڪ',
            },
            description: {
              en: 'Consonants like B, T, K use lips, tongue, or teeth to shape the sound.',
              ur: 'حروف صحیح (جیسے ب، ت، ک) ہونٹوں، دانتوں اور تالو کے ملاپ سے ادا ہوتے ہیں۔',
              sd: 'حرف صحيح (جهڙوڪ ب، ت، ڪ) چپن، ڏندن ۽ زبان جي ٽڪرائجڻ سان ادا ٿين ٿا.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Reading Names on Clinic Slips',
            ur: 'طبی پرچی پر نام پڑھنا',
            sd: 'ڊاڪٽر جي پرچي تي نالو پڙهڻ',
          },
          scenario: {
            en: 'Breaking down "Ali" into /A/ - /l/ - /i/ makes it simple to read your family name on dispensary records.',
            ur: 'نام "علی" کو ع - ل - ی کی آوازوں میں تقسیم کرنے سے پرچی پر نام تلاش کرنا آسان ہو جاتا ہے۔',
            sd: 'نالو "علي" کي ع - ل - ي جي آوازن ۾ ورهائڻ سان پرچي پڙهڻ سولي ٿي پوي ٿي.',
          },
          takeaway: {
            en: 'Blending sounds letter by letter is how reading begins.',
            ur: 'آوازوں کو جوڑ کر پڑھنا ہی اصل خواندگی ہے۔',
            sd: 'آوازن کي ڳنڍي پڙهڻ ئي پڙهائيءَ جي بنياد آهي.',
          },
        },
      },
      exercises: [
        {
          id: 'lit_2_ex1',
          type: 'multiple_choice',
          question: {
            en: 'Which of the following is a vowel letter in English?',
            ur: 'درج ذیل میں سے انگریزی کا حرف علت (Vowel) کون سا ہے؟',
            sd: 'هيٺين مان انگريزيءَ جو حرف علت (Vowel) ڪهڙو آهي؟',
          },
          options: [
            { id: 'optV', text: { en: 'E', ur: 'E', sd: 'E' } },
            { id: 'optB', text: { en: 'B', ur: 'B', sd: 'B' } },
            { id: 'optT', text: { en: 'T', ur: 'T', sd: 'T' } },
          ],
          correctAnswer: 'optV',
          explanation: {
            en: 'Correct! The five primary English vowels are A, E, I, O, U.',
            ur: 'شاباش! انگریزی کے بنیادی پانچ حروف علت A, E, I, O, U ہیں۔',
            sd: 'صحيح! انگريزيءَ جا پنج مکيه حرف علت A, E, I, O, U آهن.',
          },
        },
      ],
    },
    {
      id: 'lit_3',
      subjectId: 'literacy',
      chapterNumber: 2,
      lessonNumber: 3,
      level: 'elementary',
      title: {
        en: 'Lesson 3: Basic Vocabulary (Everyday Objects & Nature)',
        ur: 'سبق ۳: بنیادی ذخیرہ الفاظ (روزمرہ اشیاء اور ماحول)',
        sd: 'سبق ۳: بنيادي لفظ (روزمره جون شيون ۽ ماحول)',
      },
      topic: {
        en: 'Vocabulary Building',
        ur: 'الفاظ سازی و مفاہیم',
        sd: 'لفظن جو ذخيرو',
      },
      prerequisiteLessonId: 'lit_2',
      estimatedMinutes: 10,
      content: {
        visualEmoji: '🌾',
        introduction: {
          en: 'Building a rich vocabulary allows you to describe your home, field, livestock, and market needs clearly.',
          ur: 'الفاظ کا وسیع ذخیرہ آپ کو اپنے گھر، کھیت، مویشیوں اور بازار کی ضروریات درست طریقے سے بیان کرنے کے قابل بناتا ہے۔',
          sd: 'لفظن جو وسيع ذخيرو توهان کي گهر، ٻني، مال ۽ مارڪيٽ جي ضرورتن کي چٽيءَ ريت بيان ڪرڻ ۾ مدد ڪري ٿو.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Naming Everyday Realities',
              ur: 'روزمرہ اشیاء کے نام',
              sd: 'روزمره شين جا نالا',
            },
            description: {
              en: 'Water (پانی / پاڻي), Crop (فصل / ٻني), Book (کتاب / ڪتاب), Tree (درخت / وڻ).',
              ur: 'پانی، فصل، درخت، کتاب جیسے الفاظ زبانی اور تحریری مواصلت کی بنیاد ہیں۔',
              sd: 'پاڻي، ٻني، وڻ ۽ ڪتاب جهڙا لفظ تحريري ۽ زباني گفتگو جا بنياد آهن.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Market Receipt Words',
            ur: 'بازار کی رسید کے بنیادی الفاظ',
            sd: 'مارڪيٽ جي رسيد جا لفظ',
          },
          scenario: {
            en: 'Identifying words like "Rate" (شرح / اگھ) and "Total" (کل / ڪل) prevents overpaying.',
            ur: 'رسید پر "نرخ" اور "کل رقم" کے الفاظ پہچاننے سے آپ اضافی پیسوں سے بچ جاتے ہیں۔',
            sd: 'رسيد تي "اگھ" ۽ "ڪل رقم" پڙهڻ سان اوهان وڌيڪ پئسا ڏيڻ کان بچي سگهو ٿا.',
          },
          takeaway: {
            en: 'Vocabulary directly protects your household economy.',
            ur: 'الفاظ کا فہم گھریلو معیشت کا تحفظ کرتا ہے۔',
            sd: 'لفظن جي ڄاڻ گهرو معيشيت جي حفاظت ڪري ٿي.',
          },
        },
      },
      exercises: [
        {
          id: 'lit_3_ex1',
          type: 'multiple_choice',
          question: {
            en: 'What is the English word for "پانی" / "پاڻي"?',
            ur: 'لفظ "پانی" / "پاڻي" کا انگریزی ترجمہ کیا ہے؟',
            sd: 'لفظ "پاڻي" جو انگريزي ترجمو ڇا آهي؟',
          },
          options: [
            { id: 'w1', text: { en: 'Water', ur: 'Water', sd: 'Water' } },
            { id: 'w2', text: { en: 'Wheat', ur: 'Wheat', sd: 'Wheat' } },
            { id: 'w3', text: { en: 'Wind', ur: 'Wind', sd: 'Wind' } },
          ],
          correctAnswer: 'w1',
          explanation: {
            en: 'Correct! Water translates to پانی in Urdu and پاڻي in Sindhi.',
            ur: 'بالکل درست! پانی کو انگریزی میں Water کہتے ہیں۔',
            sd: 'بلڪل صحيح! پاڻيءَ کي انگريزيءَ ۾ Water سڏيو ويندو آهي.',
          },
        },
      ],
    },
    {
      id: 'lit_4',
      subjectId: 'literacy',
      chapterNumber: 2,
      lessonNumber: 4,
      level: 'elementary',
      title: {
        en: 'Lesson 4: Simple Words & Spelling Construction',
        ur: 'سبق ۴: سادہ الفاظ کی ہجے اور جوڑ توڑ',
        sd: 'سبق ۴: سادا لفظ ۽ هِجي جوڙڻ',
      },
      topic: {
        en: 'Spelling & Word Assembly',
        ur: 'ہجے اور املا',
        sd: 'هِجي ۽ اکر ملائڻ',
      },
      prerequisiteLessonId: 'lit_3',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '🧩',
        introduction: {
          en: 'Learn how individual letters join together to form solid words, like C-A-T into Cat, and ک + ت + ا + ب into کتاب.',
          ur: 'سیکھیں کہ کس طرح حروف آپس میں مل کر مکمل لفظ بناتے ہیں، جیسے ک + ت + ا + ب = کتاب۔',
          sd: 'سکو ته ڪيئن اکر ملي مڪمل لفظ ٺاهيندا آهن، جهڙوڪ ڪ + ت + ا + ب = ڪتاب.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Three-Letter Words (CVC)',
              ur: 'سہ حرفی الفاظ',
              sd: 'ٽي اکرن وارا لفظ',
            },
            description: {
              en: 'Consonant-Vowel-Consonant words like Bag, Sun, Pen provide reliable spelling patterns.',
              ur: 'سہ حرفی الفاظ جیسے بستہ، قلم، سورج بنیادی املا کے نمونے ہیں۔',
              sd: 'ٽي اکرن وارا لفظ جهڙوڪ قلم، سِج ۽ ٿيلهو بنيادي املا سيکارين ٿا.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Filling Name and Village on a Form',
            ur: 'فارم پر نام اور گاؤں لکھنا',
            sd: 'فارم تي نالو ۽ ڳوٺ لکڻ',
          },
          scenario: {
            en: 'Knowing how to spell your name letter by letter ensures official registration without facilitator errors.',
            ur: 'اپنے نام کی درست ہجے جاننے سے سرکاری کاغذات میں غلطیوں سے بچا جا سکتا ہے۔',
            sd: 'پنهنجي نالي جا اکر ڄاڻڻ سان سرڪاري ڪاغذن ۾ غلطي نٿي ٿئي.',
          },
          takeaway: {
            en: 'Spelling is the foundation of personal legal identity.',
            ur: 'درست املا انسان کی قانونی شناخت کی بنیاد ہے۔',
            sd: 'درست هِجي قانوني سڃاڻپ جو اهم بنياد آهي.',
          },
        },
      },
      exercises: [
        {
          id: 'lit_4_ex1',
          type: 'multiple_choice',
          question: {
            en: 'Which letters combine to spell the word "SUN"?',
            ur: 'لفظ "SUN" (سورج) کی درست ہجے کیا ہے؟',
            sd: 'لفظ "SUN" (سِج) جي صحيح هِجي ڪهڙي آهي؟',
          },
          options: [
            { id: 's1', text: { en: 'S - U - N', ur: 'S - U - N', sd: 'S - U - N' } },
            { id: 's2', text: { en: 'S - O - N', ur: 'S - O - N', sd: 'S - O - N' } },
            { id: 's3', text: { en: 'S - A - N', ur: 'S - A - N', sd: 'S - A - N' } },
          ],
          correctAnswer: 's1',
          explanation: {
            en: 'Correct! S-U-N spells Sun.',
            ur: 'شاباش! S-U-N سے Sun (سورج) بنتا ہے۔',
            sd: 'بلڪل درست! S-U-N مان Sun (سِج) ٺهي ٿو.',
          },
        },
      ],
    },
    {
      id: 'lit_5',
      subjectId: 'literacy',
      chapterNumber: 3,
      lessonNumber: 5,
      level: 'intermediate',
      title: {
        en: 'Lesson 5: Sentence Construction & Grammar Fundamentals',
        ur: 'سبق ۵: جملہ سازی اور بنیادی قواعد (فاعل، فعل، مفعول)',
        sd: 'سبق ۵: جملن جي بناوٽ ۽ بنيادي گرامر',
      },
      topic: {
        en: 'Grammar & Syntax',
        ur: 'قواعد اور جملوں کی ترتیب',
        sd: 'گرامر ۽ جملي جي بيهڪ',
      },
      prerequisiteLessonId: 'lit_4',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '📝',
        introduction: {
          en: 'Sentences express complete thoughts. In English, we usually follow Subject-Verb-Object (The farmer waters the crop). In Urdu and Sindhi, the verb rests at the end.',
          ur: 'جملے مکمل خیال کو ظاہر کرتے ہیں۔ انگریزی میں فاعل + فعل + مفعول ہوتا ہے جبکہ اردو اور سندھی میں فعل عام طور پر آخر میں آتا ہے۔',
          sd: 'جملو مڪمل خيال بيان ڪري ٿو. سنڌي ۽ اردو ۾ فعل عام طور تي آخر ۾ ايندو آهي جڏهن ته انگريزيءَ ۾ وچ تي.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Subject, Verb, and Object',
              ur: 'فاعل، فعل اور مفعول',
              sd: 'فاعل، فعل ۽ مفعول',
            },
            description: {
              en: 'Subject = Who does it (Farmer). Verb = The action (harvests). Object = What receives action (Wheat).',
              ur: 'فاعل = کام کرنے والا (کسان)۔ فعل = عمل (کاٹتا ہے)۔ مفعول = جس پر کام ہو (گندم)۔',
              sd: 'فاعل = ڪم ڪندڙ (هاري). فعل = عمل (لڻي ٿو). مفعول = جنهن تي ڪم ٿئي (ڪڻڪ).',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Writing an Application to the Canal Officer',
            ur: 'نہر کے داروغہ کو درخواست کا بنیادی جملہ',
            sd: 'واهه جي آفيسر کي درخواست لکڻ',
          },
          scenario: {
            en: 'Writing "Water supply is interrupted in canal 4" clearly communicates the issue without ambiguity.',
            ur: 'واضح جملہ "کھال نمبر ۴ میں پانی کی فراہمی بند ہے" مسئلہ جلدی حل کرواتا ہے۔',
            sd: 'واضح جملو "شاھ نمبر ۴ ۾ پاڻي بند آهي" مسئلو فوري حل ڪرائي ٿو.',
          },
          takeaway: {
            en: 'Correct grammar makes your written requests official and respected.',
            ur: 'درست جملہ سازی آپ کی تحریری درخواست کو بااثر بناتی ہے۔',
            sd: 'صحيح گرامر توهان جي درخواست کي وزندار بڻائي ٿي.',
          },
        },
      },
      exercises: [
        {
          id: 'lit_5_ex1',
          type: 'multiple_choice',
          question: {
            en: 'Which is a grammatically complete sentence in English?',
            ur: 'درج ذیل میں سے کون سا جملہ انگریزی قواعد کے مطابق مکمل ہے؟',
            sd: 'هيٺين مان ڪهڙو جملو انگريزي گرامر موجب مڪمل آهي؟',
          },
          options: [
            { id: 'g1', text: { en: 'The student reads the book.', ur: 'طالب علم کتاب پڑھتا ہے۔', sd: 'شاگرد ڪتاب پڙهي ٿو.' } },
            { id: 'g2', text: { en: 'Student book reads.', ur: 'اسٹوڈنٹ بک ریڈز۔', sd: 'اسٽوڊنٽ بڪ ريڊز.' } },
            { id: 'g3', text: { en: 'Reads the student.', ur: 'ریڈز دا اسٹوڈنٹ۔', sd: 'ريڊز دي اسٽوڊنٽ.' } },
          ],
          correctAnswer: 'g1',
          explanation: {
            en: 'Correct! "The student (Subject) reads (Verb) the book (Object)".',
            ur: 'شاباش! فاعل + فعل + مفعول کی درست ترتیب ہے۔',
            sd: 'بلڪل صحيح! فاعل، فعل ۽ مفعول جي صحيح ترتيب آهي.',
          },
        },
      ],
    },
    {
      id: 'lit_6',
      subjectId: 'literacy',
      chapterNumber: 3,
      lessonNumber: 6,
      level: 'intermediate',
      title: {
        en: 'Lesson 6: Reading Comprehension & Practical Documents (Utility Bills)',
        ur: 'سبق ۶: عبارت فہمی اور ضروری دستاویزات (بجلی کا بل اور لیبل)',
        sd: 'سبق ۶: عبارت سمجهڻ ۽ عملي دستاويز (بجليءَ جو بل ۽ ليبل)',
      },
      topic: {
        en: 'Functional Document Literacy',
        ur: 'دستاویز فہمی اور افادی پڑھائی',
        sd: 'عملي دستاويزن جو فھم',
      },
      prerequisiteLessonId: 'lit_5',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '🧾',
        introduction: {
          en: 'Functional literacy empowers you to inspect electricity bills, medicine expiry dates, and fertilizer bags independently.',
          ur: 'عملی خواندگی آپ کو بجلی کے بل، دواؤں کے لیبل اور کھاد کے تھیلوں پر لکھی ہدایات خود پڑھنے کے قابل بناتی ہے۔',
          sd: 'عملي خواندگي اوهان کي بجليءَ جا بل، دوائن جا ليبل ۽ ڀاڻ جون ٻوريون پاڻ پڙهڻ جي قابل بڻائي ٿي.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Key Utility Terms',
              ur: 'بل کے ضروری الفاظ',
              sd: 'بل جا ضروري لفظ',
            },
            description: {
              en: 'Due Date = Last payment date without fine. Units Consumed = Electricity usage. Payable Amount = Money owed.',
              ur: 'آخری تاریخ (Due Date)، استعمال شدہ یونٹ اور واجب الادا رقم بل کے بنیادی حصے ہیں۔',
              sd: 'آخري تاريخ، استعمال ٿيل يونٽ ۽ ڀرڻ واري رقم بل جا اهم حصا آهن.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'HESCO Rural Household Power Bill',
            ur: 'حیسکو گھریلو بجلی کا بل',
            sd: 'حيسڪو گهريلو بجلي بل',
          },
          scenario: {
            en: 'Units Consumed: 185. Payable within due date: Rs 4,250. Payable after due date: Rs 4,680. Paying on time saves Rs 430.',
            ur: 'اگر بل وقت پر جمع کرایا جائے تو Rs 4,250 ورنہ تاخیر پر Rs 4,680 بنتے ہیں۔ وقت پر ادائیگی سے بچت ہوتی ہے۔',
            sd: 'وقت تي بل ڀرڻ سان 4,250 رپيا جڏهن ته دير سان 4,680 رپيا ڏيڻا پوندا.',
          },
          takeaway: {
            en: 'Careful reading directly saves household money.',
            ur: 'دستاویز غور سے پڑھنا براہ راست مالی بچت دلاتا ہے۔',
            sd: 'دستاويز ڌيان سان پڙهڻ سان مالي بچت ٿئي ٿي.',
          },
        },
      },
      exercises: [
        {
          id: 'lit_6_ex1',
          type: 'multiple_choice',
          question: {
            en: 'If a bill states "Due Date: 15 Oct, Amount: Rs 3,000; After Due Date: Rs 3,400", how much do you save by paying before 15 Oct?',
            ur: 'اگر بل پر تاریخ سے قبل Rs 3,000 اور تاریخ کے بعد Rs 3,400 لکھا ہو تو وقت پر ادائیگی سے کتنی بچت ہوگی؟',
            sd: 'جيڪڏهن بل تي تاريخ کان اڳ 3,000 ۽ پوءِ 3,400 لکيل هجي ته وقت تي ڀرڻ سان ڪيتري بچت ٿيندي؟',
          },
          options: [
            { id: 'b1', text: { en: 'Rs 400', ur: 'Rs 400', sd: 'Rs 400' } },
            { id: 'b2', text: { en: 'Rs 100', ur: 'Rs 100', sd: 'Rs 100' } },
            { id: 'b3', text: { en: 'Rs 3,000', ur: 'Rs 3,000', sd: 'Rs 3,000' } },
          ],
          correctAnswer: 'b1',
          explanation: {
            en: 'Correct! Rs 3,400 - Rs 3,000 = Rs 400 penalty saved.',
            ur: 'شاباش! 3,400 میں سے 3,000 نکالیں تو 400 روپے بچتے ہیں۔',
            sd: 'بلڪل درست! 3,400 مان 3,000 ڪڍڻ سان 400 رپين جي بچت ٿئي ٿي.',
          },
        },
      ],
    },
    {
      id: 'lit_7',
      subjectId: 'literacy',
      chapterNumber: 4,
      lessonNumber: 7,
      level: 'advanced',
      title: {
        en: 'Lesson 7: Advanced Reading, Literature & Quotations (Shakespeare, Iqbal & Latif)',
        ur: 'سبق ۷: اعلیٰ ادب، ضرب الامثال اور دانائی کے کلمات (شیکسپیئر، اقبال اور شاہ لطیف)',
        sd: 'سبق ۷: اعليٰ ادب ۽ حڪمت جا قول (شڪسپيئر، علامه اقبال ۽ شاهه لطيف)',
      },
      topic: {
        en: 'Classical Literature & Metaphor',
        ur: 'کلاسیکی ادب اور استعاراتی زبان',
        sd: 'ڪلاسيڪل ادب ۽ تشبيهون',
      },
      prerequisiteLessonId: 'lit_6',
      estimatedMinutes: 15,
      content: {
        visualEmoji: '🎭',
        introduction: {
          en: 'Having mastered foundational letters, spelling, and sentence structures, we can now appreciate classical literary quotations that express deep human wisdom.',
          ur: 'بنیادی حروف، ہجے، جملوں اور روزمرہ دستاویزات میں مہارت حاصل کرنے کے بعد اب ہم کلاسیکی ادب اور دانائی کے گہرے اقوال کا مطالعہ کر سکتے ہیں۔',
          sd: 'بنيادي اکرن، هِجي، جملن ۽ دستاويزن تي مڪمل عبور حاصل ڪرڻ کان پوءِ، هاڻي اسان اعليٰ ادبي قولن ۽ حڪمت ڀري شاعريءَ جو اڀياس ڪري سگهون ٿا.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Metaphor and Figurative Language',
              ur: 'استعارہ اور علامتی زبان',
              sd: 'استعارو ۽ علامتي ٻولي',
            },
            description: {
              en: 'Great authors do not just describe facts; they use metaphors. William Shakespeare wrote: "All the world\'s a stage, and all the men and women merely players."',
              ur: 'عظیم ادیب گہری بات تشبیہ اور استعارے سے سمجھاتے ہیں۔ ولیم شیکسپیئر کا مشہور قول ہے: "یہ ساری دنیا ایک اسٹیج ہے اور تمام انسان محض اداکار ہیں۔"',
              sd: 'وڏا اديب تشبيهه سان ڳالهه سمجهائيندا آهن. وليم شڪسپيئر چيو هو: "سڄي دنيا هڪ اسٽيج آهي ۽ سڀ ماڻهو ان جا اداڪار آهن."',
            },
          },
          {
            title: {
              en: 'Indigenous Wisdom: Shah Abdul Latif Bhittai & Allama Iqbal',
              ur: 'مقامی فکری روایت: علامہ اقبال اور شاہ عبداللطیف بھٹائی',
              sd: 'مقامي ڏاهپ: شاهه عبداللطيف ڀٽائي ۽ علامه اقبال',
            },
            description: {
              en: 'Shah Latif taught patience through Marvi and Sasui. Allama Iqbal taught self-reliance (Khudi). Literature enriches character.',
              ur: 'شاہ لطیف نے ماروی اور سسئی کے ذریعے غیرت اور صبر سکھایا، جبکہ اقبال نے خودی کا درس دیا۔ ادب کردار سنوارتا ہے۔',
              sd: 'شاهه لطيف مارئي ۽ سسئيءَ ذريعي صبر ۽ حب الوطني سيکاري، علامه اقبال خوديءَ جو سبق ڏنو.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Understanding Proverbial Wisdom',
            ur: 'ضرب الامثال کی معنویت سمجھنا',
            sd: 'پهاڪن ۽ چوڻين جي معنيٰ',
          },
          scenario: {
            en: 'When a community elder quotes "A stitch in time saves nine" or "علم روشنی ہے", understanding the literary meaning guides collective decision making.',
            ur: 'جب محفل میں کہا جائے "وقت کی پابندی کامیابی کی کنجی ہے" تو ادبی شعور انسان کو عمل کی ترغیب دیتا ہے۔',
            sd: 'جڏهن چيو وڃي "محنت ۾ عظمت آهي" ته ادبي سمجهه سان ان تي عمل ڪرڻ جو جذبو وڌي ٿو.',
          },
          takeaway: {
            en: 'Literature inspires the soul and cultivates critical thinking.',
            ur: 'ادب روح کو بالیدگی اور سوچ کو وسعت بخشتا ہے۔',
            sd: 'ادب روح کي سڪون ۽ سوچ کي وسعت ڏئي ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'lit_7_ex1',
          type: 'multiple_choice',
          question: {
            en: 'In William Shakespeare\'s phrase "All the world\'s a stage", what does the "stage" symbolize?',
            ur: 'ولیم شیکسپیئر کے قول "ساری دنیا ایک اسٹیج ہے" میں اسٹیج کس چیز کی علامت ہے؟',
            sd: 'شڪسپيئر جي قول "سڄي دنيا هڪ اسٽيج آهي" ۾ اسٽيج ڪنهن جي علامت آهي؟',
          },
          options: [
            { id: 'q1', text: { en: 'Human life and temporary earthly actions', ur: 'انسانی زندگی اور اس کے عارضی کردار', sd: 'انساني زندگي ۽ ان جا عارضي ڪردار' } },
            { id: 'q2', text: { en: 'A literal wooden platform in a theatre', ur: 'صرف لکڑی کا بنا ہوا تھیٹر', sd: 'رڳو ڪاٺيءَ جو ٺهيل ٿيٽر' } },
            { id: 'q3', text: { en: 'An agricultural grain field', ur: 'کھیت کی فصل', sd: 'ٻنيءَ جو فصل' } },
          ],
          correctAnswer: 'q1',
          explanation: {
            en: 'Correct! Shakespeare uses the stage metaphor to remind us that life is transient and each person plays different roles.',
            ur: 'شاباش! شیکسپیئر نے دنیاوی زندگی اور اس کے تغیر کو اسٹیج کی تمثیل سے واضح کیا ہے۔',
            sd: 'بلڪل درست! شڪسپيئر زندگيءَ جي عارضي هجڻ کي اسٽيج جي مثال سان سمجهايو آهي.',
          },
        },
      ],
    },
  ],
};

// ============================================================================
// 2. PHYSICS CURRICULUM
// Progression:
// Chapter 1 (Beginner): Introduction to Physics & Measurements (Quantities, SI Units)
// Chapter 2 (Elementary): Vectors & Kinematics (Speed, Velocity, Acceleration)
// Chapter 3 (Intermediate): Dynamics & Simple Machines (Newton's Laws, Pulleys, Levers)
// Chapter 4 (Advanced): Work, Energy, Heat & Solar Applications
// ============================================================================
export const PHYSICS_SUBJECT: SubjectCurriculum = {
  id: 'physics',
  title: {
    en: 'Physics & Applied Mechanics',
    ur: 'طبیعیات و عملی مکینکس',
    sd: 'طبيعيات ۽ عملي ميڪانڪس',
  },
  description: {
    en: 'A logical progression from units and measurement to vectors, kinematics, Newton\'s laws, pulleys, levers, and solar energy.',
    ur: 'پیمائش اور ایس آئی اکائیوں سے لے کر سمتی مقداروں، حرکت کی مساواتوں، نیوٹن کے قوانین، چرخیوں اور شمسی توانائی تک مکمل نصاب۔',
    sd: 'ماپن ۽ ايس آئي اڪاين کان وٺي نيئوٽن جي قانونن، چرخين، ليور ۽ شمسي توانائي تائين مرحليوار نصاب.',
  },
  emoji: '⚡',
  tag: {
    en: 'Applied Science',
    ur: 'عملی سائنس',
    sd: 'عملي سائنس',
  },
  badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
  accentBorder: 'border-amber-300 hover:border-amber-500',
  gradient: 'from-amber-500 to-orange-600',
  chapters: [
    {
      chapterNumber: 1,
      title: {
        en: 'Chapter 1: Physical Quantities & Measurements',
        ur: 'باب ۱: طبعی مقداریں، پیمائش اور معیاری اکائیاں',
        sd: 'باب ۱: طبعي مقدارون ۽ ماپ جون اڪائيون',
      },
      level: 'beginner',
      lessonIds: ['phys_1', 'phys_2'],
    },
    {
      chapterNumber: 2,
      title: {
        en: 'Chapter 2: Motion, Vectors & Kinematics',
        ur: 'باب ۲: حرکت، سمتی مقداریں، رفتار اور اسراع',
        sd: 'باب ۲: چرپر، رفتار ۽ اسراع',
      },
      level: 'elementary',
      lessonIds: ['phys_3', 'phys_4'],
    },
    {
      chapterNumber: 3,
      title: {
        en: 'Chapter 3: Newton\'s Laws & Simple Machines',
        ur: 'باب ۳: نیوٹن کے قوانین حرکت اور سادہ مشینیں (چرخیاں و لیور)',
        sd: 'باب ۳: نيوٽن جا قانون ۽ ساديون مشينون',
      },
      level: 'intermediate',
      lessonIds: ['phys_5', 'phys_6'],
    },
    {
      chapterNumber: 4,
      title: {
        en: 'Chapter 4: Work, Energy & Solar Power',
        ur: 'باب ۴: کام، توانائی اور شمسی ٹیوب ویل کا اطلاق',
        sd: 'باب ۴: توانائي ۽ سولر ٽيوب ويل',
      },
      level: 'advanced',
      lessonIds: ['phys_7'],
    },
  ],
  lessons: [
    {
      id: 'phys_1',
      subjectId: 'physics',
      chapterNumber: 1,
      lessonNumber: 1,
      level: 'beginner',
      title: {
        en: 'Lesson 1: Introduction to Physics & Physical Quantities',
        ur: 'سبق ۱: طبیعیات کا تعارف اور طبعی مقداریں',
        sd: 'سبق ۱: طبيعيات جو تعارف ۽ طبعي مقدارون',
      },
      topic: {
        en: 'Introduction & Observable Phenomena',
        ur: 'طبیعیات کا دائرہ کار',
        sd: 'طبيعيات ۽ مشاهدو',
      },
      learningObjectives: {
        en: [
          'Understand what Physics investigates (Matter, Energy, Force, and Motion)',
          'Distinguish between physical quantities (measurable) and non-physical perceptions',
          'Identify the fundamental quantities: Length, Mass, and Time',
        ],
        ur: [
          'طبیعیات کے بنیادی مقصد (مادہ، توانائی، قوت اور حرکت کا مطالعہ) کو سمجھنا',
          'طبعی مقداروں (جن کی پیمائش ممکن ہو) اور غیر طبعی باتوں میں فرق جاننا',
          'بنیادی مقداروں (لمبائی، کمیت اور وقت) کی شناخت کرنا',
        ],
        sd: [
          'طبيعيات جي بنيادي مقصد (مادو، توانائي ۽ قوت) کي سمجهڻ',
          'ماپڻ جوڳين طبعي مقدارن جي سڃاڻپ ڪرڻ',
          'بنيادي مقدارن (ڊيگهه، وزن ۽ وقت) جي اهميت ڄاڻڻ',
        ],
      },
      estimatedMinutes: 8,
      content: {
        visualEmoji: '📏',
        introduction: {
          en: 'Physics is the natural science that studies matter, energy, and their interactions. Everything in our daily life—from dropping a bucket into a well to riding a bicycle—obeys physical laws.',
          ur: 'طبیعیات وہ بنیادی سائنس ہے جو مادے، توانائی، قوت اور ان کے باہمی تعلق کا مطالعہ کرتی ہے۔ کنویں سے پانی کھینچنے سے لے کر سائیکل چلانے تک ہر عمل طبیعیات کے قوانین کا پابند ہے۔',
          sd: 'طبيعيات اها بنيادي سائنس آهي جيڪا مادي، توانائي ۽ انهن جي لاڳاپن جو مطالعو ڪري ٿي. کوھ مان پاڻي ڪڍڻ کان وٺي سائيڪل هلائڻ تائين هر ڪم طبيعي اصولن موجب ٿئي ٿو.',
        },
        keyConcepts: [
          {
            title: {
              en: 'What Makes a Physical Quantity?',
              ur: 'طبعی مقدار کیا ہوتی ہے؟',
              sd: 'طبعي مقدار ڇا آهي؟',
            },
            description: {
              en: 'A physical quantity must have a numerical magnitude and an established unit. For example, "5 kilograms" of wheat or "12 meters" of rope.',
              ur: 'ہر وہ خصوصیت جس کی درست پیمائش کی جا سکے طبعی مقدار کہلاتی ہے، جیسے ۵ کلو گندم یا ۱۲ میٹر رسی۔ خوشی یا غم کی پیمائش نہیں ہو سکتی اس لیے وہ طبعی مقدار نہیں ہیں۔',
              sd: 'هر اها شيءِ جنهن جي باقاعده ماپ ٿي سگهي، اها طبعي مقدار آهي جهڙوڪ ۵ ڪلو ٻج يا ۱۲ ميٽر رسي.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Measuring Acreage and Grain Sacks',
            ur: 'کھیت کا رقبہ اور گندم کی بوریاں',
            sd: 'ٻنيءَ جي ماپ ۽ ڪڻڪ جون ٻوريون',
          },
          scenario: {
            en: 'A farmer cannot trade wheat by saying "I have some wheat". They must measure mass in kilograms (kg) or maunds (من).',
            ur: 'کوئی بھی کسان "کچھ گندم" کہہ کر سودا نہیں کر سکتا۔ اسے وزن من یا کلوگرام میں ناپنا پڑتا ہے۔',
            sd: 'ڪو به هاري ائين نٿو چئي سگهي ته مون وٽ ڪجهه ڪڻڪ آهي، بلڪه وزن ڪلو يا مڻ ۾ ٻڌائڻو پوي ٿو.',
          },
          takeaway: {
            en: 'Without physical measurement, commerce and engineering cannot exist.',
            ur: 'درست پیمائش کے بغیر تجارت اور تعمیرات ممکن نہیں۔',
            sd: 'صحيح ماپ کان سواءِ واپار ۽ اڏاوت ناممڪن آهي.',
          },
        },
      },
      exercises: [
        {
          id: 'phys_1_ex1',
          type: 'multiple_choice',
          question: {
            en: 'Which of the following is a measurable physical quantity?',
            ur: 'درج ذیل میں سے کون سی قابل پیمائش طبعی مقدار ہے؟',
            sd: 'هيٺين مان ڪهڙي ماپڻ جوڳي طبعي مقدار آهي؟',
          },
          options: [
            { id: 'p1', text: { en: 'Mass of a fertilizer bag (e.g., 50 kg)', ur: 'کھاد کی بوری کی کمیت (۵۰ کلوگرام)', sd: 'ڀاڻ جي ٻوريءَ جو وزن (۵۰ ڪلو)' } },
            { id: 'p2', text: { en: 'Happiness of the farmer', ur: 'کسان کی خوشی کا احساس', sd: 'هاريءَ جي خوشيءَ جو احساس' } },
            { id: 'p3', text: { en: 'Beauty of the sunset', ur: 'غروب آفتاب کا حسن', sd: 'سِج لهڻ جو منظر' } },
          ],
          correctAnswer: 'p1',
          explanation: {
            en: 'Correct! Mass has a numerical magnitude (50) and unit (kg), making it a true physical quantity.',
            ur: 'شاباش! ۵۰ کلوگرام کی درست عددی قیمت اور اکائی ہے، اس لیے یہ طبعی مقدار ہے۔',
            sd: 'بلڪل درست! ۵۰ ڪلوگرام جو پورو عدد ۽ اڪائي آهي، ان ڪري اها طبعي مقدار آهي.',
          },
        },
      ],
    },
    {
      id: 'phys_2',
      subjectId: 'physics',
      chapterNumber: 1,
      lessonNumber: 2,
      level: 'beginner',
      title: {
        en: 'Lesson 2: SI Units & Conversions (Meter, Kilogram, Second)',
        ur: 'سبق ۲: بین الاقوامی اکائیاں (SI Units) اور تبادلہ پیمائش',
        sd: 'سبق ۲: بين الاقوامي اڪائيون (SI Units) ۽ تبادلو',
      },
      topic: {
        en: 'Standard Units & Unit Prefixes',
        ur: 'ایس آئی نظام اور اکائیوں کا تبادلہ',
        sd: 'معياري اڪائيون ۽ تبادلو',
      },
      prerequisiteLessonId: 'phys_1',
      estimatedMinutes: 10,
      content: {
        visualEmoji: '⚖️',
        introduction: {
          en: 'To prevent confusion across borders and markets, the world uses the International System of Units (SI). Length is meters (m), Mass is kilograms (kg), and Time is seconds (s).',
          ur: 'دنیا بھر کی تجارت اور سائنس میں یکسانیت کے لیے بین الاقوامی نظام الاوزان (SI) استعمال ہوتا ہے۔ لمبائی کی اکائی میٹر، کمیت کی کلوگرام اور وقت کی سیکنڈ ہے۔',
          sd: 'سڄي دنيا ۾ هڪجهڙائي رکڻ لاءِ بين الاقوامي نظام (SI) واپرائجي ٿو. ڊيگهه ميٽر، وزن ڪلوگرام ۽ وقت سيڪنڊ ۾ ماپبو آهي.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Standard Conversion Ratios',
              ur: 'اکائیوں کے بنیادی تناسب',
              sd: 'اڪاين جا بنيادي تناسب',
            },
            description: {
              en: '1 Kilometer = 1,000 Meters. 1 Kilogram = 1,000 Grams. 1 Maund (من) ≈ 40 Kilograms.',
              ur: '۱ کلو میٹر = ۱,۰۰۰ میٹر۔ ۱ کلوگرام = ۱,۰۰۰ گرام۔ پاکستانی من تقریباً ۴۰ کلوگرام کے برابر ہوتا ہے۔',
              sd: '۱ ڪلوميٽر = ۱,۰۰۰ ميٽر. ۱ ڪلوگرام = ۱,۰۰۰ گرام. هڪ مڻ لڳ ڀڳ ۴۰ ڪلوگرام هوندو آهي.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Selling Paddy Rice at the Grain Market (Ghalla Mandi)',
            ur: 'غلہ منڈی میں دھان کی فروخت',
            sd: 'اناج منڊيءَ ۾ سارين جي وڪرو',
          },
          scenario: {
            en: 'If a digital weighbridge shows 2,000 kg of rice, converting to local maunds: 2,000 ÷ 40 = 50 maunds. Knowing both units secures your payment.',
            ur: 'اگر کانٹے پر ۲,۰۰۰ کلوگرام وزن آئے تو ۴۰ پر تقسیم کرنے سے ۵۰ من بنتے ہیں۔ دونوں اکائیوں کا علم دھوکہ دہی سے بچاتا ہے۔',
            sd: 'جيڪڏهن ڪانٽي تي ۲,۰۰۰ ڪلوگرام اچي ته ۴۰ سان ورهائڻ تي ۵۰ مڻ بنبا. ٻنهي اڪاين جو علم نقصان کان بچائي ٿو.',
          },
          takeaway: {
            en: 'Unit conversions ensure fair calculations in commerce and agriculture.',
            ur: 'اکائیوں کا تبادلہ منڈی میں کسان کے حق کا تحفظ کرتا ہے۔',
            sd: 'اڪاين جي مٽاسٽا سان منڊيءَ ۾ صحيح حساب ملي ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'phys_2_ex1',
          type: 'multiple_choice',
          question: {
            en: 'How many meters are in 2.5 kilometers?',
            ur: '۲.۵ کلو میٹر میں کتنے میٹر ہوتے ہیں؟',
            sd: '۲.۵ ڪلوميٽرن ۾ ڪيترا ميٽر هوندا آهن؟',
          },
          options: [
            { id: 'u1', text: { en: '2,500 meters', ur: '۲,۵۰۰ میٹر', sd: '۲,۵۰۰ ميٽر' } },
            { id: 'u2', text: { en: '250 meters', ur: '۲۵۰ میٹر', sd: '۲۵۰ ميٽر' } },
            { id: 'u3', text: { en: '25,000 meters', ur: '۲۵,۰۰۰ میٹر', sd: '۲۵,۰۰۰ ميٽر' } },
          ],
          correctAnswer: 'u1',
          explanation: {
            en: 'Correct! 1 km = 1,000 m. Therefore 2.5 × 1,000 = 2,500 meters.',
            ur: 'شاباش! ۱ کلو میٹر ۱۰۰۰ میٹر کے برابر ہے، اس لیے ۲.۵ ضرب ۱۰۰۰ = ۲,۵۰۰ میٹر۔',
            sd: 'بلڪل درست! ۱ ڪلوميٽر ۾ ۱۰۰۰ ميٽر هوندا آهن، تنهنڪري ۲.۵ × ۱۰۰۰ = ۲,۵۰۰ ميٽر.',
          },
        },
      ],
    },
    {
      id: 'phys_3',
      subjectId: 'physics',
      chapterNumber: 2,
      lessonNumber: 3,
      level: 'elementary',
      title: {
        en: 'Lesson 3: Scalars & Vectors (Magnitude vs Direction)',
        ur: 'سبق ۳: غیر سمتی اور سمتی مقداریں (مقدار بمقابلہ سمت)',
        sd: 'سبق ۳: ساديون ۽ طرف واريون مقدارون (اسڪيلر ۽ ويڪٽر)',
      },
      topic: {
        en: 'Vector Foundations',
        ur: 'سمتی مقداروں کا اصول',
        sd: 'طرف وارين مقدارن جو اصول',
      },
      prerequisiteLessonId: 'phys_2',
      estimatedMinutes: 10,
      content: {
        visualEmoji: '🧭',
        introduction: {
          en: 'Some physical quantities only need a number (Scalars, like mass and temperature). Others require both a number AND a specific direction (Vectors, like force and displacement).',
          ur: 'کچھ مقداروں کے لیے صرف عددی قیمت کافی ہوتی ہے (غیر سمتی یا سکیلر، جیسے کمیت یا درجہ حرارت)۔ لیکن قوت اور نقل مکانی جیسی مقداروں کے لیے سمت کا تعین لازمی ہے (سمتی یا ویکٹر)۔',
          sd: 'ڪجهه مقدارن لاءِ رڳو عدد ڪافي هوندو آهي (اسڪيلر، جهڙوڪ وزن يا گرمي پد). پر زور ۽ هٽاءَ لاءِ رخ جو هئڻ ضروري آهي (ويڪٽر).',
        },
        keyConcepts: [
          {
            title: {
              en: 'Why Direction Matters in Force',
              ur: 'قوت میں سمت کی اہمیت',
              sd: 'زور ۾ رخ جي اهميت',
            },
            description: {
              en: 'Pushing a stuck tractor forward frees it; pushing it sideways or backward might roll it into a ditch. Force is a vector!',
              ur: 'کیچڑ میں پھنسے ٹریکٹر کو آگے دھکیلنا مددگار ہے جبکہ سائیڈ پر دھکیلنا اسے الٹا سکتا ہے۔ اس لیے قوت ایک سمتی مقدار ہے۔',
              sd: 'گپ ۾ ڦاٿل ٽريڪٽر کي اڳتي ڌڪڻ فائديمند آهي، پاسي کان ڌڪڻ سان الٽي سگهي ٿو. تنهنڪري زور ويڪٽر آهي.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Wind Direction During Pesticide Spraying',
            ur: 'فصل پر اسپرے کے وقت ہوا کی سمت',
            sd: 'فصل تي دوائن ڇٽڻ وقت هوا جو رخ',
          },
          scenario: {
            en: 'Wind speed alone (15 km/h) is scalar. Wind velocity (15 km/h blowing South to North) is a vector. Spraying against the wind brings poison straight onto your face.',
            ur: 'صرف ہوا کی رفتار سکیلر ہے، لیکن یہ جاننا کہ ہوا کس سمت چل رہی ہے ویکٹر ہے۔ ہوا کے رخ پر اسپرے جان بچاتا ہے۔',
            sd: 'هوا جي رڳو رفتار اسڪيلر آهي پر ان جو رخ ڄاڻڻ ويڪٽر آهي. هوا جي سامهون اسپرے ڪرڻ سخت نقصانڪار آهي.',
          },
          takeaway: {
            en: 'Vector thinking prevents fatal chemical hazards in agriculture.',
            ur: 'سمت کا شعور کسان کو زہریلے اسپرے کے خطرات سے بچاتا ہے۔',
            sd: 'رخ جو خيال رکڻ هاريءَ کي زهريلي ڦوهاري کان بچائي ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'phys_3_ex1',
          type: 'multiple_choice',
          question: {
            en: 'Which of the following is a Vector quantity requiring both magnitude and direction?',
            ur: 'درج ذیل میں سے کون سی سمتی مقدار (Vector) ہے جس کے لیے مقدار اور سمت دونوں درکار ہیں؟',
            sd: 'هيٺين مان ڪهڙي طرف واري مقدار (Vector) آهي جنهن لاءِ رخ به گهربل هوندو آهي؟',
          },
          options: [
            { id: 'v1', text: { en: 'Force / Pushing effort', ur: 'قوت / دھکیلنے کا زور', sd: 'زور / ڌڪ' } },
            { id: 'v2', text: { en: 'Ambient temperature (e.g., 38°C)', ur: 'ہوا کا درجہ حرارت (۳۸ ڈگری)', sd: 'گرمي پد (۳۸ ڊگري)' } },
            { id: 'v3', text: { en: 'Mass of water (e.g., 10 kg)', ur: 'پانی کی کمیت (۱۰ کلو)', sd: 'پاڻيءَ جو وزن (۱۰ ڪلو)' } },
          ],
          correctAnswer: 'v1',
          explanation: {
            en: 'Correct! Force always acts in a specific direction, making it a Vector.',
            ur: 'شاباش! قوت ہمیشہ کسی خاص سمت میں عمل کرتی ہے، اس لیے یہ ویکٹر ہے۔',
            sd: 'بلڪل صحيح! زور هميشه ڪنهن خاص رخ ۾ لڳندو آهي، ان ڪري اهو ويڪٽر آهي.',
          },
        },
      ],
    },
    {
      id: 'phys_4',
      subjectId: 'physics',
      chapterNumber: 2,
      lessonNumber: 4,
      level: 'elementary',
      title: {
        en: 'Lesson 4: Motion & Kinematics (Speed, Velocity & Acceleration)',
        ur: 'سبق ۴: حرکیات (رفتار، سمت رفتار اور اسراع)',
        sd: 'سبق ۴: حرڪيات (رفتار، ويلاسٽي ۽ اسراع)',
      },
      topic: {
        en: 'Kinematic Formulas & Rate of Change',
        ur: 'حرکت کی بنیادی مساواتیں',
        sd: 'حرڪت جون بنيادي مساواتون',
      },
      prerequisiteLessonId: 'phys_3',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '🏎️',
        introduction: {
          en: 'Kinematics describes how objects move. Speed is distance divided by time (s = d/t). Acceleration is the rate at which velocity changes over time (a = Δv/Δt).',
          ur: 'حرکیات بتاتی ہے کہ اجسام کیسے حرکت کرتے ہیں۔ رفتار برابر ہے فاصلہ تقسیم وقت (s = d/t)۔ اسراع کا مطلب ہے رفتار میں تبدیلی کی شرح۔',
          sd: 'حرڪيات ٻڌائي ٿي ته شيون ڪيئن چرپر ڪن ٿيون. رفتار فاصلو ورهائيندي وقت (s = d/t) برابر آهي. اسراع مان مراد رفتار جو تيز يا سست ٿيڻ آهي.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Speed vs Acceleration',
              ur: 'رفتار اور اسراع کا فرق',
              sd: 'رفتار ۽ اسراع جو فرق',
            },
            description: {
              en: 'Cruising steadily at 40 km/h means zero acceleration. Pressing the motorcycle accelerator increases speed, creating positive acceleration.',
              ur: 'مسلسل ۴۰ کلومیٹر فی گھنٹہ پر گاڑی چلانا صفر اسراع ہے۔ جب آپ ایکسلریٹر دباتے ہیں تو رفتار بڑھتی ہے جسے مثبت اسراع کہتے ہیں۔',
              sd: 'هڪ ئي رفتار سان هلڻ تي اسراع ٻُڙي هوندو آهي. ايڪسيليٽر وڌائڻ سان رفتار وڌي ٿي جنهن کي مثبت اسراع چئبو آهي.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Calculating Travel Time to Town',
            ur: 'گاؤں سے شہر جانے کا وقت نکالنا',
            sd: 'ڳوٺان شهر وڃڻ جو وقت ڪڍڻ',
          },
          scenario: {
            en: 'If the town market is 30 kilometers away and your motorcycle travels at an average speed of 30 km/h: Time = Distance ÷ Speed = 30 ÷ 30 = 1 hour.',
            ur: 'اگر شہر کا فاصلہ ۳۰ کلومیٹر ہو اور موٹر سائیکل کی اوسط رفتار ۳۰ کلومیٹر فی گھنٹہ ہو تو ۱ گھنٹہ لگے گا۔',
            sd: 'جيڪڏهن شهر ۳۰ ڪلوميٽر پري هجي ۽ رفتار ۳۰ ڪلوميٽر في ڪلاڪ هجي ته پورو هڪ ڪلاڪ لڳندو.',
          },
          takeaway: {
            en: 'The formula Speed = Distance / Time lets you plan travel and logistics reliably.',
            ur: 'رفتار = فاصلہ / وقت کا فارمولا ہر سفر کا درست تخمینہ فراہم کرتا ہے۔',
            sd: 'رفتار ۽ فاصلي جو فارمولو وقت جي صحيح پلاننگ سيکاري ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'phys_4_ex1',
          type: 'multiple_choice',
          question: {
            en: 'A tractor travels 60 kilometers in 2 hours. What is its average speed?',
            ur: 'ایک ٹریکٹر ۲ گھنٹوں میں ۶۰ کلومیٹر کا فاصلہ طے کرتا ہے۔ اس کی اوسط رفتار کیا ہے؟',
            sd: 'هڪ ٽريڪٽر ۲ ڪلاڪن ۾ ۶۰ ڪلوميٽر فاصلو طئي ڪري ٿو. ان جي سراسري رفتار ڇا آهي؟',
          },
          options: [
            { id: 'k1', text: { en: '30 km/h', ur: '۳۰ کلومیٹر فی گھنٹہ', sd: '۳۰ ڪلوميٽر في ڪلاڪ' } },
            { id: 'k2', text: { en: '60 km/h', ur: '۶۰ کلومیٹر فی گھنٹہ', sd: '۶۰ ڪلوميٽر في ڪلاڪ' } },
            { id: 'k3', text: { en: '120 km/h', ur: '۱۲۰ کلومیٹر فی گھنٹہ', sd: '۱۲۰ ڪلوميٽر في ڪلاڪ' } },
          ],
          correctAnswer: 'k1',
          explanation: {
            en: 'Correct! Speed = 60 km ÷ 2 hours = 30 km/h.',
            ur: 'شاباش! رفتار = ۶۰ تقسیم ۲ = ۳۰ کلومیٹر فی گھنٹہ۔',
            sd: 'بلڪل درست! رفتار = ۶۰ ورهائيندي ۲ = ۳۰ ڪلوميٽر في ڪلاڪ.',
          },
        },
      ],
    },
    {
      id: 'phys_5',
      subjectId: 'physics',
      chapterNumber: 3,
      lessonNumber: 5,
      level: 'intermediate',
      title: {
        en: 'Lesson 5: Newton\'s Laws of Motion (Inertia, F=ma, Action-Reaction)',
        ur: 'سبق ۵: نیوٹن کے قوانین حرکت (جمود، F=ma اور عمل و ردعمل)',
        sd: 'سبق ۵: نيوٽن جا حرڪت بابت ٽي قانون',
      },
      topic: {
        en: 'Classical Dynamics',
        ur: 'حرکیات کے بنیادی قوانین',
        sd: 'حرڪت جا بنيادي قانون',
      },
      prerequisiteLessonId: 'phys_4',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '🍎',
        introduction: {
          en: 'Sir Isaac Newton formulated three fundamental laws of motion that govern every moving object in the universe: Inertia, Force equals mass times acceleration (F=ma), and Action and Reaction.',
          ur: 'سر آئزک نیوٹن نے حرکت کے تین عظیم قوانین وضع کیے: پہلا قانون جمود (Inertia)، دوسرا قانون F=ma، اور تیسرا قانون عمل اور ردعمل۔',
          sd: 'سر آئزڪ نيوٽن حرڪت جا ٽي عظيم قانون ڏنا: پهريون قانون جمود، ٻيون قانون F=ma، ۽ ٽيون عمل ۽ ردعمل جو قانون.',
        },
        keyConcepts: [
          {
            title: {
              en: '1st Law: Inertia',
              ur: 'پہلا قانون: جمود',
              sd: 'پهريون قانون: جمود',
            },
            description: {
              en: 'An object at rest stays at rest unless acted on by an external net force. When a bus brakes suddenly, passengers lurch forward because their bodies want to keep moving.',
              ur: 'کوئی بھی ساکن جسم اس وقت تک ساکن رہتا ہے جب تک بیرونی قوت نہ لگے۔ بس کے اچانک بریک لگانے پر مسافر آگے جھک جاتے ہیں۔',
              sd: 'ڪا به شيءِ بيهڻ چاهي ٿي جيستائين ان تي زور نه لڳي. بس جي اوچتي بريڪ لڳڻ تي مسافر اڳتي لڏن ٿا.',
            },
          },
          {
            title: {
              en: '2nd Law: Force = Mass × Acceleration',
              ur: 'دوسرا قانون: F = m × a',
              sd: 'ٻيون قانون: F = m × a',
            },
            description: {
              en: 'Heavier masses require greater force to accelerate. Pushing an empty wheelbarrow is effortless; pushing a wheelbarrow loaded with 80 kg of wet cement demands four times the force.',
              ur: 'زیادہ کمیت والے جسم کو تیزی دینے کے لیے زیادہ قوت درکار ہوتی ہے۔ خالی ریڑھی دھکیلنا آسان ہے جبکہ سیمنٹ کی بوریوں والی ریڑھی کو دگنا زور درکار ہوتا ہے۔',
              sd: 'وڌيڪ وزندار شيءِ کي ڌڪڻ لاءِ وڌيڪ زور کپندو آهي. سيمينٽ واري ريڙهيءَ کي خالي ريڙهيءَ کان گهڻو زور لڳندو.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Newton\'s Third Law on a Rowboat',
            ur: 'کشتی چلاتے وقت نیوٹن کا تیسرا قانون',
            sd: 'ٻيڙي هلائڻ وقت نيوٽن جو ٽيون قانون',
          },
          scenario: {
            en: 'When rowing on the Indus River, the oar pushes water backward (Action). Water pushes the boat forward with equal force (Reaction).',
            ur: 'دریائے سندھ پر کشتی چلاتے وقت چپو پانی کو پیچھے دھکیلتا ہے (عمل)، اور پانی کشتی کو آگے دھکیلتا ہے (ردعمل)۔',
            sd: 'سنڌوءَ ۾ ٻيڙي هلائيندي چپو پاڻيءَ کي پٺتي ڌڪيندو (عمل) ۽ پاڻي ٻيڙيءَ کي اڳتي وڌائيندو (ردعمل).',
          },
          takeaway: {
            en: 'For every action, there is an equal and opposite reaction.',
            ur: 'ہر عمل کا ایک برابر مگر مخالف سمت میں ردعمل ہوتا ہے۔',
            sd: 'هر عمل جو برابر ۽ ابتڙ رخ ۾ ردعمل هوندو آهي.',
          },
        },
      },
      exercises: [
        {
          id: 'phys_5_ex1',
          type: 'multiple_choice',
          question: {
            en: 'According to F = m × a, if a 10 kg mass accelerates at 3 m/s², what net force is acting on it?',
            ur: 'فارمولا F = m × a کے مطابق، اگر ۱۰ کلوگرام کمیت کا اسراع ۳ میٹر فی سیکنڈ اسکوائر ہو تو کتنی قوت لگے گی؟',
            sd: 'فارمولا F = m × a موجب، جيڪڏهن ۱۰ ڪلو وزن جو اسراع ۳ هجي ته ڪيترو زور لڳندو؟',
          },
          options: [
            { id: 'f1', text: { en: '30 Newtons (N)', ur: '۳۰ نیوٹن (N)', sd: '۳۰ نيوٽن (N)' } },
            { id: 'f2', text: { en: '13 Newtons (N)', ur: '۱۳ نیوٹن (N)', sd: '۱۳ نيوٽن (N)' } },
            { id: 'f3', text: { en: '3 Newtons (N)', ur: '۳ نیوٹن (N)', sd: '۳ نيوٽن (N)' } },
          ],
          correctAnswer: 'f1',
          explanation: {
            en: 'Correct! Force = 10 kg × 3 m/s² = 30 N.',
            ur: 'شاباش! قوت = ۱۰ ضرب ۳ = ۳۰ نیوٹن۔',
            sd: 'بلڪل درست! قوت = ۱۰ × ۳ = ۳۰ نيوٽن.',
          },
        },
      ],
    },
    {
      id: 'phys_6',
      subjectId: 'physics',
      chapterNumber: 3,
      lessonNumber: 6,
      level: 'intermediate',
      title: {
        en: 'Lesson 6: Simple Machines & Mechanical Advantage (Pulleys & Levers)',
        ur: 'سبق ۶: سادہ مشینیں اور مکینیکل ایڈوانٹیج (چرخیاں اور لیور)',
        sd: 'سبق ۶: ساديون مشينون ۽ ميڪانيڪي فائدو (چرخيون ۽ ليور)',
      },
      topic: {
        en: 'Mechanical Advantage & Applied Work',
        ur: 'چرخیوں اور لیور کے سائنسی اصول',
        sd: 'چرخي ۽ ليور جا اصول',
      },
      prerequisiteLessonId: 'phys_5',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '⚙️',
        interactiveTool: 'pulley_lever',
        introduction: {
          en: 'Simple machines do not eliminate work, but they multiply our force or change its direction, making hard village tasks manageable.',
          ur: 'سادہ مشینیں کام کی مقدار ختم نہیں کرتیں بلکہ ہماری لگائی گئی قوت کو دوگنا یا رخ آسان بنا کر بھاری کام ممکن بناتی ہیں۔',
          sd: 'ساديون مشينون ڪم ختم نه پر اسان جي زور کي ٻيڻو ڪري ڏکيا ڪم سولا ڪن ٿيون.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Pulleys Divide the Weight',
              ur: 'چرخی وزن بانٹتی ہے',
              sd: 'چرخي وزن ورهائي ٿي',
            },
            description: {
              en: 'A 2-pulley block-and-tackle system cuts the pulling effort in half (Mechanical Advantage = 2). A 20 kg bucket feels like 10 kg!',
              ur: 'دو چرخیوں والا نظام مطلوبہ طاقت آدھی کر دیتا ہے۔ ۲۰ کلو وزنی ڈول محض ۱۰ کلو محسوس ہوتا ہے۔',
              sd: 'ٻن چرخين وارو نظام زور اڌ ڪري ڇڏي ٿو. ۲۰ ڪلو جو ڊول رڳو ۱۰ ڪلو لڳندو آهي.',
            },
          },
          {
            title: {
              en: 'Lever Effort Arm',
              ur: 'لیور کے بازو کی لمبائی',
              sd: 'ليور جو هينڊل',
            },
            description: {
              en: 'The further the fulcrum is from your hands, the longer your effort arm, and the less force required to pry a heavy boulder.',
              ur: 'لیور کا ہینڈل جتنا لمبا ہو، بھاری پتھر یا وزنی چیز کو اکھاڑنے کے لیے اتنی ہی کم طاقت لگتی ہے۔',
              sd: 'ليور جو هينڊل جيترو ڊگهو هوندو، ڳرو پٿر کڻڻ لاءِ اوترو گهٽ زور لڳندو.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Drawing Water from a Deep Dug Well',
            ur: 'گہرے کنویں سے پانی نکالنا',
            sd: 'اونھي کوھ مان پاڻي ڇڪڻ',
          },
          scenario: {
            en: 'Pulling 20 kg straight up hurts your lower back. A fixed pulley allows you to pull downward using your own body weight to help.',
            ur: 'سیدھا اوپر ۲۰ کلو اٹھانے سے کمر پر بوجھ پڑتا ہے۔ چرخی کے ذریعے نیچے کی سمت کھینچنے میں انسان کا اپنا وزن بھی مددگار بنتا ہے۔',
            sd: 'سڌو مٿي کڻڻ سان چيلهه ۾ سور پوندو آهي. چرخيءَ ذريعي هيٺ ڇڪڻ ۾ انسان جو پنهنجو وزن به مدد ڪري ٿو.',
          },
          takeaway: {
            en: 'Mechanical advantage saves human physical health and spinal fatigue.',
            ur: 'سادہ مشینیں کسان اور مزدور کی جسمانی صحت اور کمر کا تحفظ کرتی ہیں۔',
            sd: 'ساديون مشينون انساني جسم کي تڪليف کان بچائين ٿيون.',
          },
        },
      },
      exercises: [
        {
          id: 'phys_6_ex1',
          type: 'multiple_choice',
          question: {
            en: 'When lifting a 20 kg bucket with a 2-pulley system (MA = 2), what is the required effort?',
            ur: 'دو چرخیوں والے نظام (MA = 2) سے ۲۰ کلو وزنی ڈول اٹھاتے وقت کتنا زور لگے گا؟',
            sd: 'ٻن چرخين واري نظام سان ۲۰ ڪلو وزن کڻڻ لاءِ ڪيترو زور لڳندو؟',
          },
          options: [
            { id: 'm1', text: { en: '10 kg (half force)', ur: '۱۰ کلو (آدھی طاقت)', sd: '۱۰ ڪلو (اڌ زور)' } },
            { id: 'm2', text: { en: '40 kg (double force)', ur: '۴۰ کلو (دگنی طاقت)', sd: '۴۰ ڪلو (ٻيڻو زور)' } },
            { id: 'm3', text: { en: '20 kg (no change)', ur: '۲۰ کلو (کوئی فرق نہیں)', sd: '۲۰ ڪلو (ڪو فرق ناهي)' } },
          ],
          correctAnswer: 'm1',
          explanation: {
            en: 'Correct! Effort = Load ÷ Mechanical Advantage = 20 kg ÷ 2 = 10 kg.',
            ur: 'شاباش! ۲۰ کلو کو ۲ پر تقسیم کریں تو درکار طاقت ۱۰ کلو رہ جاتی ہے۔',
            sd: 'بلڪل صحيح! ۲۰ ڪلو ورهائيندي ۲ برابر ۱۰ ڪلو زور لڳندو.',
          },
        },
      ],
    },
    {
      id: 'phys_7',
      subjectId: 'physics',
      chapterNumber: 4,
      lessonNumber: 7,
      level: 'advanced',
      title: {
        en: 'Lesson 7: Work, Energy & Solar Tube-Well Physics',
        ur: 'سبق ۷: کام، توانائی اور شمسی ٹیوب ویل کی طبیعیات',
        sd: 'سبق ۷: توانائي ۽ شمسي ٽيوب ويل جا اصول',
      },
      topic: {
        en: 'Energy Conservation & Solar Photovoltaics',
        ur: 'بقائے توانائی اور شمسی پینلز کا سائنسی نظام',
        sd: 'توانائيءَ جي بچاءُ ۽ سولر پينلز جو نظام',
      },
      prerequisiteLessonId: 'phys_6',
      estimatedMinutes: 15,
      content: {
        visualEmoji: '☀️',
        introduction: {
          en: 'Work is force applied over a distance (W = F · d). Energy is the capacity to do work. Solar photovoltaic panels convert radiant light directly into electrical energy to pump groundwater.',
          ur: 'کام کا مطلب ہے کسی جسم پر قوت لگا کر اسے فاصلہ طے کروانا (W = F · d)۔ شمسی پینل سورج کی روشنی (فوٹونز) کو براہ راست برقی توانائی میں تبدیل کرتے ہیں جس سے ٹیوب ویل چلتا ہے۔',
          sd: 'ڪم مان مراد زور سان شيءِ کي اڳتي وڌائڻ آهي (W = F · d). سولر پينل سِج جي روشنيءَ کي سڌو سنئون بجليءَ ۾ تبديل ڪري ٽيوب ويل هلائين ٿا.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Law of Conservation of Energy',
              ur: 'قانون بقائے توانائی',
              sd: 'توانائيءَ جي بچاءُ جو قانون',
            },
            description: {
              en: 'Energy cannot be created or destroyed; it only changes form: Solar Light -> Electricity (Inverter) -> Kinetic Energy of Rotating Impeller -> Gravitational Potential Energy of Lifted Water.',
              ur: 'توانائی نہ پیدا کی جا سکتی ہے نہ ختم، بلکہ شکل بدلتی ہے: شمسی روشنی برقی کرنٹ بنتی ہے جو موٹر کو گھما کر پانی کو بلندی پر پہنچاتی ہے۔',
              sd: 'توانائي نه ختم ٿيندي آهي نه ئي ازخود ٺهندي آهي، رڳو شڪل بدلائي ٿي: روشني مان بجلي، بجلي مان پاڻيءَ کي مٿي کڻڻ.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Solar Sizing for a 5 HP Tube-Well',
            ur: '۵ ہارس پاور ٹیوب ویل کے لیے سولر پینل کا تخمینہ',
            sd: '۵ هارس پاور ٽيوب ويل لاءِ سولر سسٽم',
          },
          scenario: {
            en: '1 Horsepower ≈ 746 Watts. A 5 HP motor requires 3,730 Watts running power. Factoring 25% dust and thermal loss, you need ~5,000 Watts (10 panels of 500W each).',
            ur: '۱ ہارس پاور ۷۴۶ واٹ کے برابر ہے۔ ۵ ہارس پاور کے لیے تقریباً ۳,۷۳۰ واٹ درکار ہیں۔ دھول اور گرمی کے نقصان کو شامل کر کے ۵,۰۰۰ واٹ کا سولر سیٹ اپ لگایا جاتا ہے۔',
            sd: 'هڪ هارس پاور ۷۴۶ واٽ جو ٿئي ٿو. ۵ هارس پاور لاءِ لڳ ڀڳ ۵,۰۰۰ واٽ جو سولر نظام کپندو ته جيئن کوهه مڪمل پاڻي ڏئي.',
          },
          takeaway: {
            en: 'Physics formulas protect farmers from buying undersized or fake solar systems.',
            ur: 'طبیعیات کا حسابی شعور کسان کو ناقص اور کمزور سولر پینل خریدنے سے بچاتا ہے۔',
            sd: 'طبيعيات جو فارمولو هاريءَ کي دوکي کان بچائي صحيح سولر پينل وٺڻ ۾ مدد ڪري ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'phys_7_ex1',
          type: 'multiple_choice',
          question: {
            en: 'How many Watts is equivalent to 1 Horsepower (HP)?',
            ur: 'ایک ہارس پاور (1 HP) کتنے واٹ کے برابر ہوتی ہے؟',
            sd: 'هڪ هارس پاور (1 HP) ڪيترن واٽن جي برابر هوندو آهي؟',
          },
          options: [
            { id: 'w746', text: { en: '746 Watts', ur: '۷۴۶ واٹ', sd: '۷۴۶ واٽ' } },
            { id: 'w500', text: { en: '500 Watts', ur: '۵۰۰ واٹ', sd: '۵۰۰ واٽ' } },
            { id: 'w1000', text: { en: '1,000 Watts', ur: '۱,۰۰۰ واٹ', sd: '۱,۰۰۰ واٽ' } },
          ],
          correctAnswer: 'w746',
          explanation: {
            en: 'Correct! Standard mechanical 1 HP = 746 Watts.',
            ur: 'شاباش! ایک معیاری ہارس پاور ۷۴۶ واٹ کے برابر ہوتی ہے۔',
            sd: 'بلڪل صحيح! هڪ هارس پاور ۷۴۶ واٽ جو هوندو آهي.',
          },
        },
      ],
    },
  ],
};

// ============================================================================
// 3. MATHEMATICS CURRICULUM
// Progression:
// Chapter 1 (Beginner): Numbers, Counting & Place Values (1-100)
// Chapter 2 (Elementary): Addition, Subtraction & Pakistani Cash Register
// Chapter 3 (Intermediate): Multiplication, Division & Fractions
// Chapter 4 (Advanced): Percentages, Loan Markup & Land Area Calculations
// ============================================================================
export const MATH_SUBJECT: SubjectCurriculum = {
  id: 'math',
  title: {
    en: 'Mathematics & Everyday Numeracy',
    ur: 'ریاضی اور روزمرہ مالی حساب',
    sd: 'حساب ۽ روزمره جي ڳڻپيوڪر',
  },
  description: {
    en: 'A step-by-step numeracy journey from counting and Pakistani currency to multiplication, fractions, land area, and loan markup.',
    ur: 'گنتی اور پاکستانی کرنسی نوٹوں سے لے کر ضرب، کسر، زرعی رقبے کی پیمائش اور منافع کے حساب تک جامع ریاضی۔',
    sd: 'ڳڻپ ۽ پاڪستاني نوٽن کان وٺي ضرب، ونڊ، جريبن جي ماپ ۽ منافعي تائين مڪمل رياضي.',
  },
  emoji: '🔢',
  tag: {
    en: 'Foundational Numeracy',
    ur: 'بنیادی تا عملی حساب',
    sd: 'بنيادي کان عملي حساب',
  },
  badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  accentBorder: 'border-emerald-300 hover:border-emerald-500',
  gradient: 'from-emerald-600 to-teal-700',
  chapters: [
    {
      chapterNumber: 1,
      title: {
        en: 'Chapter 1: Number Sense & Place Value (1–100)',
        ur: 'باب ۱: گنتی، ہندسوں کی پہچان اور مقامی قیمت (اکائی، دہائی)',
        sd: 'باب ۱: ڳڻپ ۽ مقامي قيمت (ايڪو، ڏهاڪو)',
      },
      level: 'beginner',
      lessonIds: ['math_1', 'math_2'],
    },
    {
      chapterNumber: 2,
      title: {
        en: 'Chapter 2: Addition, Subtraction & Bazaar Cash Change',
        ur: 'باب ۲: جمع، تفریق اور بازار میں بقایا رقم کا حساب',
        sd: 'باب ۲: جوڙ، ڪٽ ۽ بقايا رقم جو حساب',
      },
      level: 'elementary',
      lessonIds: ['math_3', 'math_4'],
    },
    {
      chapterNumber: 3,
      title: {
        en: 'Chapter 3: Multiplication, Division & Practical Fractions',
        ur: 'باب ۳: ضرب، تقسیم اور روزمرہ زندگی میں کسر کا استعمال',
        sd: 'باب ۳: ضرب، ونڊ ۽ روزمره حصا (ڪسر)',
      },
      level: 'intermediate',
      lessonIds: ['math_5', 'math_6'],
    },
    {
      chapterNumber: 4,
      title: {
        en: 'Chapter 4: Percentages, Land Area & Loan Markup Calculations',
        ur: 'باب ۴: فیصد، اراضی کی پیمائش (ایکڑ و جریب) اور قرض کا سود',
        sd: 'باب ۴: سيڪڙو، زمين جي ماپ ۽ وياج جو حساب',
      },
      level: 'advanced',
      lessonIds: ['math_7'],
    },
  ],
  lessons: [
    {
      id: 'math_1',
      subjectId: 'math',
      chapterNumber: 1,
      lessonNumber: 1,
      level: 'beginner',
      title: {
        en: 'Lesson 1: Counting & Visual Manipulatives (1 to 20)',
        ur: 'سبق ۱: بنیادی گنتی اور تصویری اشیاء (۱ تا ۲۰)',
        sd: 'سبق ۱: بنيادي ڳڻپ ۽ تصويري شيون (۱ کان ۲۰)',
      },
      topic: {
        en: 'Foundational Counting',
        ur: 'گنتی کا بنیادی تصور',
        sd: 'ڳڻپ جو بنياد',
      },
      learningObjectives: {
        en: [
          'Count objects sequentially from 1 to 20 without skipping',
          'Associate digits with concrete quantities (apples, goats, wheat sacks)',
          'Identify greater and smaller quantities visually',
        ],
        ur: [
          '۱ سے ۲۰ تک بغیر کسی غلطی کے گنتی گننا',
          'ہندسوں کو اصل چیزوں (سیب، بکریاں، بوریاں) سے جوڑ کر سمجھنا',
          'کم اور زیادہ مقدار میں فرق کرنا',
        ],
        sd: [
          '۱ کان ۲۰ تائين تسلسل سان ڳڻڻ',
          'عددن کي اصل شين سان ڀيٽي ياد رکڻ',
          'گهٽ ۽ وڌيڪ مقدار کي سمجهڻ',
        ],
      },
      estimatedMinutes: 8,
      content: {
        visualEmoji: '🍎',
        introduction: {
          en: 'Math begins with concrete objects: counting your cattle, tallying fruit trees, or ensuring all family members have a plate at mealtime.',
          ur: 'ریاضی کی شروعات روزمرہ اشیاء سے ہوتی ہے: اپنے مویشی گننا، پھلوں کی ٹوکریاں شمار کرنا اور گھر کی ضرورتیں ناپنا۔',
          sd: 'حساب جي شروعات عام شين سان ٿئي ٿي: گهر جا ڀاتي، ٻنيءَ جا وڻ يا مال ڳڻڻ.',
        },
        keyConcepts: [
          {
            title: {
              en: 'One-to-One Correspondence',
              ur: 'ایک چیز، ایک ہندسہ',
              sd: 'هڪ شيءِ، هڪ عدد',
            },
            description: {
              en: 'Each physical item corresponds to exactly one counted number: 1, 2, 3, 4, 5.',
              ur: 'ہر چیز کے بدلے صرف ایک ہندسہ بولا جاتا ہے: ایک، دو، تین، چار، پانچ۔',
              sd: 'هر شيءِ جي بدلي هڪ عدد چيو ويندو آهي: هڪ، ٻه، ٽي، چار، پنج.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Counting Goats Returning to the Pen',
            ur: 'شام کو باڑے میں بکریاں گننا',
            sd: 'شام جو واڙي ۾ ٻڪريون ڳڻڻ',
          },
          scenario: {
            en: 'If 8 goats went out in the morning and 7 return at dusk, counting reveals that 1 goat is missing and needs searching.',
            ur: 'اگر صبح ۸ بکریاں چرنے گئیں اور شام کو ۷ واپس آئیں تو گنتی بتاتی ہے کہ ۱ بکری گم ہے جس کی تلاش ضروری ہے۔',
            sd: 'جيڪڏهن صبح ۸ ٻڪريون ويون ۽ شام جو ۷ واپس آيون ته ڳڻپ ٻڌائي ٿي ته هڪ ٻڪري گم آهي.',
          },
          takeaway: {
            en: 'Accurate counting protects family livestock assets.',
            ur: 'درست گنتی گھریلو مویشیوں اور اثاثوں کا تحفظ کرتی ہے۔',
            sd: 'صحيح ڳڻپ مال ۽ ملڪيت جي حفاظت ڪري ٿي.',
          },
        },
      },
      exercises: [
        {
          id: 'math_1_ex1',
          type: 'multiple_choice',
          question: {
            en: 'There are 5 apples on the table. You place 3 more. How many apples are there in total?',
            ur: 'میز پر ۵ سیب رکھے ہیں۔ آپ نے ۳ سیب مزید رکھ دیے۔ اب کل کتنے سیب ہیں؟',
            sd: 'ميز تي ۵ صوف رکيل آهن. اوهان ۳ صوف وڌيڪ رکيا. هاڻي ڪل ڪيترا صوف ٿيا؟',
          },
          options: [
            { id: 'c8', text: { en: '8 apples', ur: '۸ سیب', sd: '۸ صوف' } },
            { id: 'c7', text: { en: '7 apples', ur: '۷ سیب', sd: '۷ صوف' } },
            { id: 'c9', text: { en: '9 apples', ur: '۹ سیب', sd: '۹ صوف' } },
          ],
          correctAnswer: 'c8',
          explanation: {
            en: 'Correct! 5 + 3 = 8 apples.',
            ur: 'شاباش! ۵ میں ۳ جمع کریں تو ۸ حاصل ہوتا ہے۔',
            sd: 'بلڪل درست! ۵ ۾ ۳ ملائڻ سان ۸ صوف ٿيندا.',
          },
        },
      ],
    },
    {
      id: 'math_2',
      subjectId: 'math',
      chapterNumber: 1,
      lessonNumber: 2,
      level: 'beginner',
      title: {
        en: 'Lesson 2: Place Value (Units, Tens & Hundreds)',
        ur: 'سبق ۲: مقامی قیمت (اکائی، دہائی اور سینکڑہ)',
        sd: 'سبق ۲: مقامي قيمت (ايڪو، ڏهاڪو، سو)',
      },
      topic: {
        en: 'Base-10 Structure',
        ur: 'دس کا بنیادی نظام',
        sd: 'ڏهن جو بنيادي نظام',
      },
      prerequisiteLessonId: 'math_1',
      estimatedMinutes: 10,
      content: {
        visualEmoji: '🔟',
        introduction: {
          en: 'Our number system is grouped in tens. The position of a digit determines its actual value: 45 means 4 Tens (40) and 5 Units (5).',
          ur: 'ہمارا حسابی نظام دس دس کے بنڈلوں پر مشتمل ہے۔ ہندسے کی جگہ اس کی اصل قیمت بتاتی ہے: ۴۵ کا مطلب ہے ۴ دہائیاں (۴۰) اور ۵ اکائیاں (۵)۔',
          sd: 'اسان جو حساب ڏهن جي ٻڌل سسٽم تي هلي ٿو. عدد جي جاءِ ان جي قيمت ٻڌائي ٿي: ۴۵ مان مراد ۴ ڏهاڪا (۴۰) ۽ ۵ ايڪا (۵) آهن.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Bundling in Tens',
              ur: 'دس کے بنڈل',
              sd: 'ڏهن جا بنڊل',
            },
            description: {
              en: '10 Units = 1 Ten. 10 Tens = 1 Hundred (100). This mirrors how money and wheat bags are stacked.',
              ur: '۱۰ اکائیاں مل کر ۱ دہائی بناتی ہیں۔ ۱۰ دہائیاں مل کر ۱ سینکڑہ (۱۰۰) بناتی ہیں۔',
              sd: '۱۰ ايڪا ملي هڪ ڏهاڪو ٺاهين ٿا ۽ ۱۰ ڏهاڪا ملي ۱۰۰ ٺاهين ٿا.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Reading Currency Note Denominations',
            ur: 'کرنسی نوٹوں کی قدر سمجھنا',
            sd: 'ڪرنسي نوٽن جو قدر سمجهڻ',
          },
          scenario: {
            en: 'A 500 Rupee note represents five 100-Rupee notes. Understanding place value prevents mistaking a 50 note for a 500 note.',
            ur: '۵۰۰ روپے کا نوٹ دراصل ۱۰۰ والے پانچ نوٹوں کے برابر ہوتا ہے۔ مقامی قیمت کا فہم ۵۰ اور ۵۰۰ کے نوٹ میں فرق واضح رکھتا ہے۔',
            sd: '۵۰۰ جو نوٽ ۱۰۰ وارن پنجن نوٽن جي برابر آهي. ان جي خبر هجڻ سان ۵۰ ۽ ۵۰۰ جي فرق ۾ غلطي نٿي ٿئي.',
          },
          takeaway: {
            en: 'Place value is the core of financial literacy.',
            ur: 'مقامی قیمت مالیاتی سمجھ بوجھ کی اصل بنیاد ہے۔',
            sd: 'مقامي قيمت پئسن جي ڏي وٺ ۾ بنيادي ڪردار ادا ڪري ٿي.',
          },
        },
      },
      exercises: [
        {
          id: 'math_2_ex1',
          type: 'multiple_choice',
          question: {
            en: 'In the number 73, what does the digit "7" represent?',
            ur: 'عدد ۷۳ میں ہندسہ "۷" کس کی نمائندگی کرتا ہے؟',
            sd: 'عدد ۷۳ ۾ انگ "۷" ڪهڙي قيمت ظاهر ڪري ٿو؟',
          },
          options: [
            { id: 'p70', text: { en: '7 Tens (70)', ur: '۷ دہائیاں (۷۰)', sd: '۷ ڏهاڪا (۷۰)' } },
            { id: 'p7', text: { en: '7 Units (7)', ur: '۷ اکائیاں (۷)', sd: '۷ ايڪا (۷)' } },
            { id: 'p700', text: { en: '7 Hundreds (700)', ur: '۷ سینکڑے (۷۰۰)', sd: '۷ سئو (۷۰۰)' } },
          ],
          correctAnswer: 'p70',
          explanation: {
            en: 'Correct! The 7 is in the tens place, representing 70.',
            ur: 'شاباش! ۷ دہائی کی جگہ پر ہے جس کی قیمت ۷۰ بنتی ہے۔',
            sd: 'بلڪل درست! ۷ ڏهاڪي جي جاءِ تي آهي تنهنڪري ان جي قيمت ۷۰ آهي.',
          },
        },
      ],
    },
    {
      id: 'math_3',
      subjectId: 'math',
      chapterNumber: 2,
      lessonNumber: 3,
      level: 'elementary',
      title: {
        en: 'Lesson 3: Pakistani Currency & Bazaar Cash Register (Tender & Change)',
        ur: 'سبق ۳: پاکستانی کرنسی اور بازار میں بقایا رقم کا حساب',
        sd: 'سبق ۳: پاڪستاني ڪرنسي ۽ بازار ۾ بقايا پئسن جو حساب',
      },
      topic: {
        en: 'PKR Notes & Bazaar Arithmetic',
        ur: 'روپوں کا حساب اور بقایا رقم',
        sd: 'رپين جو حساب ۽ موٽ',
      },
      prerequisiteLessonId: 'math_2',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '💵',
        interactiveTool: 'cash_register',
        introduction: {
          en: 'Mastering everyday shopping transactions ensures you always receive the exact change when buying flour, tea, oil, and seeds.',
          ur: 'روزمرہ خریداری میں آٹا، گھی، چائے اور بیج لیتے وقت درست بقایا رقم گننا دھوکہ دہی سے تحفظ دیتا ہے۔',
          sd: 'مارڪيٽ مان اٽو، گيهه، چانھ ۽ ٻج وٺندي دڪاندار کان پورو باقي پئسو واپس وٺڻ ضروري آهي.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Tendered - Total Bill = Change Due',
              ur: 'دی گئی رقم منفی بل = بقایا رقم',
              sd: 'ڏنل رقم مان بل ڪٽڻ = بقايا رقم',
            },
            description: {
              en: 'If your bill is Rs 350 and you give a Rs 500 note: 500 - 350 = Rs 150 change due.',
              ur: 'اگر کل بل ۳۵۰ روپے ہو اور آپ ۵۰۰ کا نوٹ دیں تو ۵۰۰ منفی ۳۵۰ = ۱۵۰ روپے بقایا ملنے چاہئیں۔',
              sd: 'جيڪڏهن بل ۳۵۰ رپيا آهي ۽ اوهان ۵۰۰ ڏنا ته ۵۰۰ مان ۳۵۰ ڪٽ ڪرڻ تي ۱۵۰ رپيا باقي بچندا.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Checking Change at the Grocery Store',
            ur: 'کریانہ اسٹور پر بقایا رقم کی تصدیق',
            sd: 'ڪريانه دڪان تي پئسا ڳڻڻ',
          },
          scenario: {
            en: 'Counting the change notes (a 100-Rupee note plus a 50-Rupee note = Rs 150) right at the counter prevents regret.',
            ur: 'کاؤنٹر چھوڑنے سے قبل ۱۰۰ کا ایک اور ۵۰ کا ایک نوٹ گن لینا آپ کی محنت کی کمائی کو محفوظ رکھتا ہے۔',
            sd: 'دڪان ڇڏڻ کان اڳ ۱۰۰ ۽ ۵۰ جو نوٽ چڱيءَ طرح ڳڻي وٺڻ سان مالي نقصان کان بچي سگهجي ٿو.',
          },
          takeaway: {
            en: 'Always calculate your change before leaving the shop.',
            ur: 'ہمیشہ دکان چھوڑنے سے قبل بقایا رقم خود جوڑیں۔',
            sd: 'هميشه دڪان ڇڏڻ کان اڳ موٽيل پئسا پاڻ ڳڻيو.',
          },
        },
      },
      exercises: [
        {
          id: 'math_3_ex1',
          type: 'multiple_choice',
          question: {
            en: 'Your grocery bill is Rs 680. You pay with a Rs 1,000 note. What is your correct change?',
            ur: 'سودے کا بل ۶۸۰ روپے بنا۔ آپ نے ۱,۰۰۰ کا نوٹ دیا۔ آپ کو کتنے روپے بقایا ملنے چاہئیں؟',
            sd: 'سامان جو بل ۶۸۰ رپيا ٿيو. اوهان ۱,۰۰۰ جو نوٽ ڏنو. اوهان کي ڪيترا پئسا موٽڻ گهرجن؟',
          },
          options: [
            { id: 'ch320', text: { en: 'Rs 320', ur: 'Rs 320', sd: 'Rs 320' } },
            { id: 'ch220', text: { en: 'Rs 220', ur: 'Rs 220', sd: 'Rs 220' } },
            { id: 'ch420', text: { en: 'Rs 420', ur: 'Rs 420', sd: 'Rs 420' } },
          ],
          correctAnswer: 'ch320',
          explanation: {
            en: 'Correct! 1,000 - 680 = Rs 320.',
            ur: 'شاباش! ۱,۰۰۰ میں سے ۶۸۰ منفی کریں تو ۳۲۰ روپے بچتے ہیں۔',
            sd: 'بلڪل صحيح! ۱,۰۰۰ مان ۶۸۰ ڪڍڻ سان ۳۲۰ رپيا باقي بچندا.',
          },
        },
      ],
    },
    {
      id: 'math_4',
      subjectId: 'math',
      chapterNumber: 2,
      lessonNumber: 4,
      level: 'elementary',
      title: {
        en: 'Lesson 4: Multiplication & Equal Grouping (Times Tables)',
        ur: 'سبق ۴: ضرب اور مساوی گروہ بندی (پہاڑے)',
        sd: 'سبق ۴: ضرب ۽ پهاڙا',
      },
      topic: {
        en: 'Repeated Addition & Multiplication',
        ur: 'بار بار جمع کرنا اور ضرب',
        sd: 'ضرب ۽ وڌندڙ ڳڻپ',
      },
      prerequisiteLessonId: 'math_3',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '✖️',
        introduction: {
          en: 'Multiplication is quick repeated addition. Instead of adding 5 + 5 + 5 + 5, we say 4 groups of 5: 4 × 5 = 20.',
          ur: 'ضرب دراصل بار بار جمع کرنے کا تیز ترین طریقہ ہے۔ ۵ + ۵ + ۵ + ۵ کرنے کے بجائے ۴ ضرب ۵ = ۲۰ کہنا زیادہ آسان ہے۔',
          sd: 'ضرب دراصل تيز رفتاريءَ سان جوڙ ڪرڻ آهي. ۵ کي چار ڀيرا ڳڻڻ بجاءِ ۴ ضرب ۵ = ۲۰ چئبو.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Equal Rows and Stacks',
              ur: 'برابر قطاریں اور بوریاں',
              sd: 'هڪجهڙيون قطارون',
            },
            description: {
              en: 'If a truck carries 6 rows of fertilizer, and each row holds 8 bags: 6 × 8 = 48 bags in total.',
              ur: 'اگر ٹرک میں کھاد کی ۶ قطاریں ہوں اور ہر قطار میں ۸ بوریاں ہوں تو ۶ ضرب ۸ = ۴۸ بوریاں بنتی ہیں۔',
              sd: 'جيڪڏهن ٽرڪ ۾ ۶ قطارون هجن ۽ هر قطار ۾ ۸ ٻوريون هجن ته ۶ × ۸ = ۴۸ ٻوريون ٿينديون.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Daily Labor Wage Calculations',
            ur: 'مزدوروں کی روزانہ اجرت کا حساب',
            sd: 'مزدورن جي روزاني ڏهاڙيءَ جو حساب',
          },
          scenario: {
            en: 'Hiring 4 harvest laborers at Rs 1,200 per day: 4 × 1,200 = Rs 4,800 total daily wage cost.',
            ur: 'اگر ۴ کٹائی مزدور ۱,۲۰۰ روپے روزانہ پر کام کریں تو ۴ ضرب ۱,۲۰۰ = ۴,۸۰۰ روپے یومیہ خرچ بنے گا۔',
            sd: 'جيڪڏهن ۴ مزدور ۱,۲۰۰ رپيا روزاني وٺن ته ۴ × ۱,۲۰۰ = ۴,۸۰۰ رپيا روز خرچ ٿيندو.',
          },
          takeaway: {
            en: 'Multiplication simplifies budget forecasting on farms.',
            ur: 'ضرب کا علم فارم کے اخراجات کا تخمینہ چند سیکنڈ میں ممکن بناتا ہے۔',
            sd: 'ضرب جي ڄاڻ سان ٻنيءَ جي خرچن جو فوري پتو پئجي وڃي ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'math_4_ex1',
          type: 'multiple_choice',
          question: {
            en: 'A poultry farm packs eggs into cartons of 12. If you buy 5 cartons, how many eggs is that?',
            ur: 'ایک مرغی خانے میں انڈوں کی درجن میں ۱۲ انڈے ہوتے ہیں۔ اگر آپ ۵ درجن خریدیں تو کل کتنے انڈے ہوں گے؟',
            sd: 'هڪ درجن ۾ ۱۲ آنا هوندا آهن. جيڪڏهن اوهان ۵ درجن وٺو ته ڪل ڪيترا آنا ٿيندا؟',
          },
          options: [
            { id: 'eg60', text: { en: '60 eggs', ur: '۶۰ انڈے', sd: '۶۰ آنا' } },
            { id: 'eg50', text: { en: '50 eggs', ur: '۵۰ انڈے', sd: '۵۰ آنا' } },
            { id: 'eg72', text: { en: '72 eggs', ur: '۷۲ انڈے', sd: '۷۲ آنا' } },
          ],
          correctAnswer: 'eg60',
          explanation: {
            en: 'Correct! 5 × 12 = 60 eggs.',
            ur: 'شاباش! ۵ ضرب ۱۲ = ۶۰ انڈے۔',
            sd: 'بلڪل درست! ۵ ضرب ۱۲ = ۶۰ آنا.',
          },
        },
      ],
    },
    {
      id: 'math_5',
      subjectId: 'math',
      chapterNumber: 3,
      lessonNumber: 5,
      level: 'intermediate',
      title: {
        en: 'Lesson 5: Fractions & Decimals in Agriculture & Trade',
        ur: 'سبق ۵: کسر، اعشاریہ اور زرعی تقسیم (آدھا، پاؤ اور تہائی)',
        sd: 'سبق ۵: حصا (ڪسر) ۽ ڏهائي وارا انگ',
      },
      topic: {
        en: 'Fractions & Proportions',
        ur: 'کسر اور تناسب کا استعمال',
        sd: 'حصا ۽ تناسب',
      },
      prerequisiteLessonId: 'math_4',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '🥧',
        introduction: {
          en: 'Not everything comes in whole numbers. When sharing land, dosing pesticides, or buying fabric, we use fractions like 1/2 (Half / آدھا), 1/4 (Quarter / پاؤ), and 3/4.',
          ur: 'ہمیشہ پوری چیزیں نہیں ہوتیں؛ بیج کی پیمائش، زمین کی تقسیم یا کپڑے کی خریداری میں آدھا (۱/۲)، پاؤ (۱/۴) اور پونا (۳/۴) جیسی کسریں استعمال ہوتی ہیں۔',
          sd: 'زندگيءَ ۾ هميشه سڄا انگ ناهن هوندا. اڌ (۱/۲) ۽ پا (۱/۴) جا حصا زرعي دوائن ۽ زمين جي ورهائڻ ۾ ڪم اچن ٿا.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Numerator over Denominator',
              ur: 'شمار کنندہ اور مخرج',
              sd: 'مٿيون ۽ هيٺيون انگ',
            },
            description: {
              en: 'In 1/4, the bottom number (4) tells total equal parts; the top number (1) tells how many parts you take.',
              ur: 'کسر ۱/۴ میں نیچے کا عدد کل حصے بتاتا ہے اور اوپر کا عدد منتخب حصہ ظاہر کرتا ہے۔',
              sd: '۱/۴ ۾ هيٺيون انگ ڪل حصا ۽ مٿيون انگ اوهان جو ورتل حصو ٻڌائي ٿو.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Mixing Chemical Spray Solution',
            ur: 'اسپرے کے لیے دوا کا محلول بنانا',
            sd: 'اسپرے لاءِ دوا جو حل ٺاهڻ',
          },
          scenario: {
            en: 'If a 1-liter bottle treats 4 acres, each acre needs 1/4 liter (250 ml). Exact fractions prevent crop burn.',
            ur: 'اگر ۱ لیٹر کی بوتل ۴ ایکڑ کے لیے ہو تو ہر ایکڑ پر ۱/۴ لیٹر (۲۵۰ ملی لیٹر) ڈلے گی۔ درست کسر فصل کو جلنے سے بچاتی ہے۔',
            sd: 'جيڪڏهن هڪ ليٽر دوا ۴ ايڪڙن لاءِ هجي ته هر ايڪڙ تي ۱/۴ ليٽر پوندو. صحيح حصي سان فصل سڙڻ کان بچي ٿو.',
          },
          takeaway: {
            en: 'Fractions safeguard crops against toxic overdoses.',
            ur: 'کسر کا حساب فصل کو دوا کی زیادتی سے محفوظ رکھتا ہے۔',
            sd: 'حصن جي صحيح ڄاڻ فصل کي نقصان کان بچائي ٿي.',
          },
        },
      },
      exercises: [
        {
          id: 'math_5_ex1',
          type: 'multiple_choice',
          question: {
            en: 'How many milliliters (ml) are in 1/2 liter of water?',
            ur: 'آدھے (۱/۲) لیٹر پانی میں کتنے ملی لیٹر (ml) ہوتے ہیں؟',
            sd: 'اڌ (۱/۲) ليٽر پاڻيءَ ۾ ڪيترا ملي ليٽر هوندا آهن؟',
          },
          options: [
            { id: 'ml500', text: { en: '500 ml', ur: '۵۰۰ ملی لیٹر', sd: '۵۰۰ ملي ليٽر' } },
            { id: 'ml250', text: { en: '250 ml', ur: '۲۵۰ ملی لیٹر', sd: '۲۵۰ ملي ليٽر' } },
            { id: 'ml750', text: { en: '750 ml', ur: '۷۵۰ ملی لیٹر', sd: '۷۵۰ ملي ليٽر' } },
          ],
          correctAnswer: 'ml500',
          explanation: {
            en: 'Correct! 1 Liter = 1,000 ml. 1/2 Liter = 500 ml.',
            ur: 'شاباش! ۱ لیٹر ۱,۰۰۰ ملی لیٹر کے برابر ہوتا ہے، اس لیے آدھا لیٹر ۵۰۰ ملی لیٹر ہوگا۔',
            sd: 'بلڪل درست! ۱ ليٽر ۾ ۱,۰۰۰ ملي ليٽر ٿين ٿا، تنهنڪري اڌ ليٽر ۵۰۰ ملي ليٽر ٿيندو.',
          },
        },
      ],
    },
    {
      id: 'math_6',
      subjectId: 'math',
      chapterNumber: 3,
      lessonNumber: 6,
      level: 'intermediate',
      title: {
        en: 'Lesson 6: Division & Sharing (Harvest Yield per Acre)',
        ur: 'سبق ۶: تقسیم اور مساوی بٹوارہ (فی ایکڑ پیداوار کا تناسب)',
        sd: 'سبق ۶: ونڊ ۽ ورهاست (في ايڪڙ اپت)',
      },
      topic: {
        en: 'Division & Per-Unit Averages',
        ur: 'تقسیم اور اوسط فی اکائی',
        sd: 'ونڊ ۽ في ايڪڙ حساب',
      },
      prerequisiteLessonId: 'math_5',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '➗',
        introduction: {
          en: 'Division is sharing a total quantity equally among a set number of recipients or dividing yield across acreage to find productivity.',
          ur: 'تقسیم کا مطلب ہے کسی کل مقدار کو برابر حصوں میں بانٹنا، یا کل پیداوار کو رقبے پر تقسیم کر کے فی ایکڑ اوسط معلوم کرنا۔',
          sd: 'ونڊ مان مراد ڪل مقدار کي برابر حصن ۾ ورهائڻ يا في ايڪڙ پيداوار جي سراسري ڪڍڻ آهي.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Yield per Acre Formula',
              ur: 'فی ایکڑ پیداوار کا فارمولا',
              sd: 'في ايڪڙ اپت جو فارمولو',
            },
            description: {
              en: 'Average Yield = Total Maunds ÷ Total Acres. If 5 acres produce 250 maunds: 250 ÷ 5 = 50 maunds/acre.',
              ur: 'فی ایکڑ پیداوار = کل پیداوار تقسیم کل ایکڑ۔ اگر ۵ ایکڑ سے ۲۵۰ من گندم اترے تو ۲۵۰ ÷ ۵ = ۵۰ من فی ایکڑ۔',
              sd: 'في ايڪڙ پيداوار = ڪل پيداوار ورهائيندي ڪل ايڪڙ. جيڪڏهن ۵ ايڪڙن مان ۲۵۰ مڻ لٿا ته ۲۵۰ ÷ ۵ = ۵۰ مڻ في ايڪڙ.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Dividing Thresher Grain Between Landowner and Harvester',
            ur: 'تھریشر کی گندم کی منصفانہ تقسیم',
            sd: 'ٿريشر جي ڪڻڪ جي برابر ورهاست',
          },
          scenario: {
            en: 'Dividing 120 bags equally among 3 brothers gives 120 ÷ 3 = 40 bags each, completely free of disputes.',
            ur: '۱۲۰ بوریوں کو ۳ بھائیوں میں برابر بانٹنے پر ہر ایک کو ۴۰ بوریاں ملیں گی، جس سے کوئی تنازعہ پیدا نہیں ہوتا۔',
            sd: '۱۲۰ ٻوريون ۳ ڀائرن ۾ برابر ورهائڻ تي هر هڪ کي ۴۰ ٻوريون ملنديون.',
          },
          takeaway: {
            en: 'Division brings peace and transparency to joint agricultural holdings.',
            ur: 'تقسیم کا شفاف حساب مشترکہ خاندانی کاروبار میں تنازعات ختم کرتا ہے۔',
            sd: 'ونڊ جو شفاف حساب خاندان ۾ امن ۽ ڀائيواري قائم رکي ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'math_6_ex1',
          type: 'multiple_choice',
          question: {
            en: 'If 4 acres of land produce 160 maunds of rice, what is the yield per acre?',
            ur: 'اگر ۴ ایکڑ رقبے سے ۱۶۰ من چاول حاصل ہوں تو فی ایکڑ پیداوار کتنی ہے؟',
            sd: 'جيڪڏهن ۴ ايڪڙن مان ۱۶۰ مڻ چانور لهن ته في ايڪڙ اپت ڪيتري ٿي؟',
          },
          options: [
            { id: 'y40', text: { en: '40 maunds/acre', ur: '۴۰ من فی ایکڑ', sd: '۴۰ مڻ في ايڪڙ' } },
            { id: 'y30', text: { en: '30 maunds/acre', ur: '۳۰ من فی ایکڑ', sd: '۳۰ مڻ في ايڪڙ' } },
            { id: 'y50', text: { en: '50 maunds/acre', ur: '۵۰ من فی ایکڑ', sd: '۵۰ مڻ في ايڪڙ' } },
          ],
          correctAnswer: 'y40',
          explanation: {
            en: 'Correct! 160 ÷ 4 = 40 maunds per acre.',
            ur: 'شاباش! ۱۶۰ کو ۴ پر تقسیم کریں تو ۴۰ من فی ایکڑ بنتا ہے۔',
            sd: 'بلڪل درست! ۱۶۰ ورهائيندي ۴ = ۴۰ مڻ في ايڪڙ.',
          },
        },
      ],
    },
    {
      id: 'math_7',
      subjectId: 'math',
      chapterNumber: 4,
      lessonNumber: 7,
      level: 'advanced',
      title: {
        en: 'Lesson 7: Percentages, Markup & Land Area (Acre vs Jareeb)',
        ur: 'سبق ۷: فیصد، قرض کا منافع/سود اور رقبے کی پیمائش (ایکڑ و جریب)',
        sd: 'سبق ۷: سيڪڙو، قرض جو وياج ۽ زمين جي ماپ (ايڪڙ ۽ جريب)',
      },
      topic: {
        en: 'Commercial Finance & Land Units',
        ur: 'تجارتی فنانس اور اراضی کی اکائیاں',
        sd: 'تجارتي فنانس ۽ زمين جون اڪائيون',
      },
      prerequisiteLessonId: 'math_6',
      estimatedMinutes: 15,
      content: {
        visualEmoji: '📊',
        introduction: {
          en: 'In high-level agricultural finance, understanding percentage markup on dealer credit and land measurements (Acre vs Jareeb vs Karam) keeps your family out of debt traps.',
          ur: 'اعلیٰ زرعی تجارت میں کھاد کے ڈیلر کا اضافی منافع (فیصد شرح) اور زمینی پیمائش (ایکڑ، جریب، مرلہ) کا فہم کسان کو قرض کے جال سے بچاتا ہے۔',
          sd: 'زرعي واپار ۾ ڀاڻ جي سيٺ جو سيڪڙو وياج ۽ زمين جي ماپ (ايڪڙ، جريب) سمجهڻ سان هاري قرضي ٿيڻ کان بچي ٿو.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Acre to Jareeb Conversion in Sindh',
              ur: 'سندھ میں ایکڑ اور جریب کا رشتہ',
              sd: 'سنڌ ۾ ايڪڙ ۽ جريب جو حساب',
            },
            description: {
              en: 'In standard land records, 1 Acre = 43,560 sq ft. In local Sindh practice, 1 Jareeb is approximately half an acre (~20,000 sq ft). Clarifying the unit prevents disputes.',
              ur: 'سرکاری ریکارڈ میں ۱ ایکڑ ۴۳,۵۶۰ مربع فٹ ہوتا ہے۔ سندھ میں ۱ جریب تقریباً نصف ایکڑ بنتا ہے۔ اکائی کی وضاحت زمین کے جھگڑوں سے بچاتی ہے۔',
              sd: 'سرڪاري ڪاغذن ۾ ۱ ايڪڙ ۴۳,۵۶۰ چورس فوٽ ٿيندو آهي. سنڌ ۾ عام طور ۱ جريب اڌ ايڪڙ سڏجي ٿو. ان جو علم هئڻ جهيڙن کان بچائي ٿو.',
            },
          },
          {
            title: {
              en: 'Calculating Annual Percentage Rate (APR)',
              ur: 'سالانہ منافع / مارک اپ کا فارمولا',
              sd: 'سالانو وياج جو حساب',
            },
            description: {
              en: 'Markup = Principal × (Rate / 100) × Time. On a loan of Rs 100,000 at 15% for 1 year: 100,000 × 0.15 = Rs 15,000 interest.',
              ur: 'قرض پر منافع = اصل رقم ضرب (شرح / ۱۰۰) ضرب سال۔ ۱۰۰,۰۰۰ پر ۱۵ فیصد کے حساب سے ۱۵,۰۰۰ روپے اضافی دینے پڑتے ہیں۔',
              sd: 'قرض جو وياج = اصل رقم × (ريٽ / ۱۰۰). ۱۰۰,۰۰۰ تي ۱۵ سيڪڙو موجب ۱۵,۰۰۰ رپيا مٿي ڏيڻا پوندا.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Cash Purchase vs Credit Fertilizer Markup',
            ur: 'نقد کھاد بمقابلہ ادھار کا منافع',
            sd: 'روڪ ڀاڻ بمقابله اوڌر جو وياج',
          },
          scenario: {
            en: 'Cash Urea bag: Rs 3,200. Dealer credit price payable at harvest: Rs 4,000. That is an extra Rs 800 per bag (25% in 4 months, which is 75% annualized!).',
            ur: 'نقد یوریا بوری ۳,۲۰۰ کی ہے جبکہ فصل پر ادھار ۴,۰۰۰ روپے ہے۔ یہ فی بوری ۸۰۰ روپے یعنی ۴ ماہ میں ۲۵ فیصد اضافی ہے جو کہ سخت مالی بوجھ ہے۔',
            sd: 'روڪ يوريا ۳,۲۰۰ ۽ اوڌر ۴,۰۰۰ رپيا آهي. ۸۰۰ رپيا مٿي وٺڻ ۴ مهينن ۾ ۲۵ سيڪڙو بڻجي ٿو جيڪو وڏو نقصان آهي.',
          },
          takeaway: {
            en: 'Percentage literacy empowers farmers to reject exploitative informal loans.',
            ur: 'فیصد کا علم کسان کو ڈیلروں کے ظالمانہ سود سے محفوظ رکھتا ہے۔',
            sd: 'سيڪڙو ڄاڻڻ سان هاري ظلم واري وياج کان بچي سگهي ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'math_7_ex1',
          type: 'multiple_choice',
          question: {
            en: 'If a bank loan of Rs 50,000 carries an annual markup rate of 10%, what is the markup after 1 year?',
            ur: 'اگر ۵۰,۰۰۰ روپے کے بینک قرض پر سالانہ ۱۰ فیصد شرح ہو تو ایک سال بعد کتنا اضافی منافع بنے گا؟',
            sd: 'جيڪڏهن ۵۰,۰۰۰ رپين جي قرض تي سالانو ۱۰ سيڪڙو ريٽ هجي ته سال بعد ڪيترو وياج ٿيندو؟',
          },
          options: [
            { id: 'mk5k', text: { en: 'Rs 5,000', ur: 'Rs 5,000', sd: 'Rs 5,000' } },
            { id: 'mk10k', text: { en: 'Rs 10,000', ur: 'Rs 10,000', sd: 'Rs 10,000' } },
            { id: 'mk2500', text: { en: 'Rs 2,500', ur: 'Rs 2,500', sd: 'Rs 2,500' } },
          ],
          correctAnswer: 'mk5k',
          explanation: {
            en: 'Correct! 50,000 × (10 / 100) = Rs 5,000.',
            ur: 'شاباش! ۵۰,۰۰۰ کا ۱۰ فیصد ۵,۰۰۰ روپے بنتا ہے۔',
            sd: 'بلڪل صحيح! ۵۰,۰۰۰ جو ۱۰ سيڪڙو ۵,۰۰۰ رپيا ٿيندو.',
          },
        },
      ],
    },
  ],
};

// ============================================================================
// 4. CHEMISTRY CURRICULUM
// Progression:
// Chapter 1 (Beginner): States of Matter (Solid, Liquid, Gas)
// Chapter 2 (Elementary): Atoms, Elements & Water Solutions
// Chapter 3 (Intermediate): Water Purification & Safe Drinking Protocols
// Chapter 4 (Advanced): Acids, Bases & Agricultural Chemicals (Urea, DAP, Safety)
// ============================================================================
export const CHEMISTRY_SUBJECT: SubjectCurriculum = {
  id: 'chemistry',
  title: {
    en: 'Chemistry & Applied Solutions',
    ur: 'کیمیا اور عملی حلول',
    sd: 'ڪيميا ۽ عملي ڪيميا',
  },
  description: {
    en: 'From the three states of matter and water solutions to safe purification (Boiling, SODIS, Chlorine), acids/bases, and agricultural fertilizer chemistry.',
    ur: 'مادے کی حالتوں اور پانی کے محلولوں سے لے کر محفوظ فلٹریشن (جوشاندہ، سوڈس، کلورین)، تیزابیت اور کھاد کی کیمسٹری تک جامع نصاب۔',
    sd: 'مادي جي حالتن ۽ پاڻيءَ جي حل کان وٺي صاف ڪرڻ (ٽهڪائڻ، سوڊس، ڪلورين)، تيزابيت ۽ يوريا ڀاڻ جي ڪيميا تائين منظم علم.',
  },
  emoji: '🧪',
  tag: {
    en: 'Lab to Field Science',
    ur: 'لیب تا کھیت سائنس',
    sd: 'ليبارٽري کان ٻنيءَ تائين',
  },
  badgeBg: 'bg-indigo-100 text-indigo-900 border-indigo-200',
  accentBorder: 'border-indigo-300 hover:border-indigo-500',
  gradient: 'from-indigo-600 to-purple-700',
  chapters: [
    {
      chapterNumber: 1,
      title: {
        en: 'Chapter 1: Matter & States of Matter',
        ur: 'باب ۱: مادہ اور اس کی تین طبعی حالتیں (ٹھوس، مائع، گیس)',
        sd: 'باب ۱: مادو ۽ ان جون ٽي حالتون (سخت، پاڻياٺو، گئس)',
      },
      level: 'beginner',
      lessonIds: ['chem_1', 'chem_2'],
    },
    {
      chapterNumber: 2,
      title: {
        en: 'Chapter 2: Atoms, Elements & Everyday Mixtures',
        ur: 'باب ۲: ایٹم، عناصر اور روزمرہ آمیزے و محلول',
        sd: 'باب ۲: ائٽم، عنصر ۽ روزمره جو محلول',
      },
      level: 'elementary',
      lessonIds: ['chem_3', 'chem_4'],
    },
    {
      chapterNumber: 3,
      title: {
        en: 'Chapter 3: Water Purification Science (Boiling, SODIS, Chlorine)',
        ur: 'باب ۳: پینے کے پانی کی سائنسی صفائی (ابالنا، سوڈس، کلورین)',
        sd: 'باب ۳: پيئڻ جي پاڻيءَ جي صفائيءَ جي سائنس',
      },
      level: 'intermediate',
      lessonIds: ['chem_5'],
    },
    {
      chapterNumber: 4,
      title: {
        en: 'Chapter 4: Acids, Bases & Agricultural Chemical Nutrients (Urea & DAP)',
        ur: 'باب ۴: تیزاب، اساس اور زرعی کیمیائی اجزاء (یوریا و ڈی اے پی)',
        sd: 'باب ۴: تيزاب ۽ زرعي ڀاڻ جي ڪيميا',
      },
      level: 'advanced',
      lessonIds: ['chem_6', 'chem_7'],
    },
  ],
  lessons: [
    {
      id: 'chem_1',
      subjectId: 'chemistry',
      chapterNumber: 1,
      lessonNumber: 1,
      level: 'beginner',
      title: {
        en: 'Lesson 1: Introduction to Matter & Its Three States',
        ur: 'سبق ۱: مادہ کا تعارف اور اس کی تین حالتیں',
        sd: 'سبق ۱: مادو ۽ ان جون ٽي حالتون',
      },
      topic: {
        en: 'States of Matter & Particle Arrangement',
        ur: 'مادے کے ذرات کی ترتیب',
        sd: 'مادي جي ذرڙن جي بناوٽ',
      },
      learningObjectives: {
        en: [
          'Define matter as anything that occupies space and has mass',
          'Identify the three states of matter: Solid, Liquid, and Gas',
          'Explain how heat causes phase changes (Melting, Evaporating, Freezing)',
        ],
        ur: [
          'مادے کی تعریف (ہر وہ چیز جو وزن رکھے اور جگہ گھیرے)',
          'مادے کی تین بنیادی حالتوں (ٹھوس، مائع، گیس) کی پہچان',
          'گرمی کے ذریعے حالت بدلنے کے عمل (پگھلنا، ابلنا، جمنا) کو سمجھنا',
        ],
        sd: [
          'مادي جي وصف (جيڪا به شيءِ جاءِ والاري ۽ وزن رکي)',
          'مادي جي ٽن حالتن (سخت، پاڻياٺو ۽ گئس) کي ڄاڻڻ',
          'گرميءَ سبب حالت بدلجڻ (پگهرڻ، ٽهڪڻ) کي سمجهڻ',
        ],
      },
      estimatedMinutes: 8,
      content: {
        visualEmoji: '🧊',
        introduction: {
          en: 'Everything around you is made of matter. Water is the most vivid example: Ice is solid, water from the handpump is liquid, and steam rising from a kettle is gas.',
          ur: 'ہمارے ارد گرد ہر چیز مادہ ہے۔ پانی اس کی بہترین مثال ہے: برف ٹھوس ہے، نلکے کا پانی مائع ہے اور کیتلی سے نکلنے والی بھاپ گیس ہے۔',
          sd: 'اسان جي چوڌاري هر شيءِ مادو آهي. پاڻي بهترين مثال آهي: برف سخت، پاڻي پاڻياٺو ۽ ٻاف گئس آهي.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Particle Closeness',
              ur: 'ذرات کا باہمی فاصلہ',
              sd: 'ذرڙن جو پاڻ ۾ فاصلو',
            },
            description: {
              en: 'In solids, particles are tightly packed and vibrate in place. In liquids, they flow over each other. In gases, they fly apart freely.',
              ur: 'ٹھوس میں ذرات سختی سے جڑے ہوتے ہیں۔ مائع میں ذرات ایک دوسرے کے اوپر بہتے ہیں۔ گیس میں ذرات کھلے فضا میں اڑتے ہیں۔',
              sd: 'سخت شين ۾ ذرڙا ڳنڍيل هوندا آهن، پاڻياٺ ۾ وهي سگهندا آهن ۽ گئس ۾ کليل آزاد گهمندا آهن.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Drying Grain under Sunlight (Evaporation)',
            ur: 'دھوپ میں دھان اور گندم کا سکھانا (تبخیر)',
            sd: 'اس ۾ ان سڪائڻ (ٻاف بڻجڻ)',
          },
          scenario: {
            en: 'Spreading moist wheat under the hot sun heats liquid water inside the grain, turning it into water vapor gas and preserving the grain.',
            ur: 'گیلی گندم کو دھوپ میں پھیلانے سے اس میں موجود مائع پانی بخارات (گیس) بن کر اڑ جاتا ہے جس سے گندم کیڑے لگنے سے محفوظ رہتی ہے۔',
            sd: 'آلي ڪڻڪ کي اس ۾ وڇائڻ سان ان جو پاڻي ٻاف بڻجي اڏامي وڃي ٿو ۽ ان خراب ٿيڻ کان بچي ٿو.',
          },
          takeaway: {
            en: 'Phase changes are practical tools used every harvest season.',
            ur: 'حالتوں کی تبدیلی کسان کی فصل محفوظ رکھنے میں مدد کرتی ہے۔',
            sd: 'مادي جي حالت بدلجڻ سان هاري پنهنجو اناج محفوظ ڪري ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'chem_1_ex1',
          type: 'multiple_choice',
          question: {
            en: 'At what temperature does liquid water boil and turn into steam (gas)?',
            ur: 'پانی کس درجہ حرارت پر ابل کر بھاپ (گیس) میں تبدیل ہوتا ہے؟',
            sd: 'پاڻي ڪهڙي گرمي پد تي ٽهڪي ٻاف (گئس) بڻجي ٿو؟',
          },
          options: [
            { id: 't100', text: { en: '100°C', ur: '۱۰۰ ڈگری سینٹی گریڈ', sd: '۱۰۰ ڊگري سينٽي گريڊ' } },
            { id: 't0', text: { en: '0°C', ur: '۰ ڈگری سینٹی گریڈ', sd: '۰ ڊگري سينٽي گريڊ' } },
            { id: 't50', text: { en: '50°C', ur: '۵۰ ڈگری سینٹی گریڈ', sd: '۵۰ ڊگري سينٽي گريڊ' } },
          ],
          correctAnswer: 't100',
          explanation: {
            en: 'Correct! Under standard sea-level pressure, water boils at 100°C.',
            ur: 'شاباش! عام فضا میں پانی ۱۰۰ ڈگری سینٹی گریڈ پر ابلتا ہے۔',
            sd: 'بلڪل درست! عام هوا ۾ پاڻي ۱۰۰ ڊگري تي ٽهڪندو آهي.',
          },
        },
      ],
    },
    {
      id: 'chem_2',
      subjectId: 'chemistry',
      chapterNumber: 1,
      lessonNumber: 2,
      level: 'beginner',
      title: {
        en: 'Lesson 2: Physical vs Chemical Changes in Everyday Life',
        ur: 'سبق ۲: طبعی اور کیمیائی تبدیلیاں (برف پگھلنا بمقابلہ لکڑی جلنا)',
        sd: 'سبق ۲: طبعي ۽ ڪيميائي تبديليون',
      },
      topic: {
        en: 'Reversibility & Chemical Bonds',
        ur: 'تبدیلیوں کی اقسام',
        sd: 'تبديلين جا قسم',
      },
      prerequisiteLessonId: 'chem_1',
      estimatedMinutes: 10,
      content: {
        visualEmoji: '🔥',
        introduction: {
          en: 'A physical change changes only shape or state and can be reversed (freezing water). A chemical change forms brand-new substances and cannot be easily undone (burning wood into ash).',
          ur: 'طبعی تبدیلی میں صرف شکل یا حالت بدلتی ہے اور مادہ واپس اپنی اصل حالت میں لایا جا سکتا ہے (جیسے برف پگھلانا)۔ کیمیائی تبدیلی میں نیا مادہ بنتا ہے جسے واپس نہیں لایا جا سکتا (جیسے لکڑی کا جل کر راکھ بننا)۔',
          sd: 'طبعي تبديليءَ ۾ شڪل بدلبي آهي پر نئين شيءِ ناهي ٺهندي (جهڙوڪ برف جو ڳرڻ). ڪيميائي تبديليءَ ۾ مڪمل نئين شيءِ ٺهي ٿي جهڙوڪ ڪاٺيءَ جو سڙي رک ٿيڻ.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Rusting of Farm Tools',
              ur: 'زرعی آلات پر زنگ لگنا',
              sd: 'اوزارن کي ڪٽ لڳڻ',
            },
            description: {
              en: 'Iron (Fe) reacts with oxygen and water to form Iron Oxide (Rust). This is a permanent chemical change that weakens metal.',
              ur: 'لوہا ہوا میں موجود آکسیجن اور نمی سے مل کر زنگ بناتا ہے۔ یہ ایک کیمیائی تبدیلی ہے جو ہل اور ٹریکٹر کے پرزوں کو کمزور کرتی ہے۔',
              sd: 'لوهه هوا جي آڪسيجن ۽ آلاڻ سان ملي ڪٽ ٺاهي ٿو. هي ڪيميائي تبديلي اوزارن کي ڳاري ڇڏي ٿي.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Oiling Plowshares and Blades',
            ur: 'ہل اور بلیڈ پر تیل لگانا',
            sd: 'ھر ۽ بليڊ تي تيل لڳائڻ',
          },
          scenario: {
            en: 'Coating iron tools with old engine oil forms a physical barrier that stops oxygen from chemically touching the iron.',
            ur: 'ہل پر پرانا تیل لگانے سے ایک طبعی تہہ بن جاتی ہے جو ہوا کی آکسیجن کو لوہے سے چھونے نہیں دیتی اور زنگ رک جاتا ہے۔',
            sd: 'اوزارن تي تيل لڳائڻ سان هوا لوهه کي ڇهي نٿي سگهي ۽ ڪٽ نٿو لڳي.',
          },
          takeaway: {
            en: 'Understanding chemical reactions prevents expensive equipment damage.',
            ur: 'کیمیا کا شعور اوزاروں کو زنگ اور تباہی سے بچاتا ہے۔',
            sd: 'ڪيميا جو علم اوزارن کي ورهين تائين نئون رکي ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'chem_2_ex1',
          type: 'multiple_choice',
          question: {
            en: 'Which of the following is a permanent Chemical change?',
            ur: 'درج ذیل میں سے کون سی مستقل کیمیائی تبدیلی ہے؟',
            sd: 'هيٺين مان ڪهڙي ڪيميائي تبديلي آهي؟',
          },
          options: [
            { id: 'r1', text: { en: 'Rusting of an iron blade', ur: 'لوہے کے بلیڈ کو زنگ لگنا', sd: 'لوهه جي بليڊ کي ڪٽ لڳڻ' } },
            { id: 'r2', text: { en: 'Melting ice into water', ur: 'برف کا پگھل کر پانی بننا', sd: 'برف جو ڳري پاڻي بڻجڻ' } },
            { id: 'r3', text: { en: 'Cutting a piece of paper', ur: 'کاغذ کے ٹکڑے کاٹنا', sd: 'ڪاغذ جا ٽڪرا ڪرڻ' } },
          ],
          correctAnswer: 'r1',
          explanation: {
            en: 'Correct! Rusting is a chemical reaction between iron, oxygen, and water forming a new substance.',
            ur: 'شاباش! زنگ لگنا لوہے، آکسیجن اور پانی کے ملاپ سے نیا کیمیائی مادہ بناتا ہے۔',
            sd: 'بلڪل درست! ڪٽ لڳڻ سان نئون ڪيميائي مادو بڻجي ٿو.',
          },
        },
      ],
    },
    {
      id: 'chem_3',
      subjectId: 'chemistry',
      chapterNumber: 2,
      lessonNumber: 3,
      level: 'elementary',
      title: {
        en: 'Lesson 3: Atoms, Elements & Molecules (The Building Blocks)',
        ur: 'سبق ۳: ایٹم، عناصر اور سالمات (کائنات کے بنیادی اینٹیں)',
        sd: 'سبق ۳: ائٽم، عنصر ۽ ماليڪيول',
      },
      topic: {
        en: 'Atomic Theory & Chemical Symbols',
        ur: 'ایٹمی نظریہ اور علامات',
        sd: 'ائٽمي نظريو ۽ علامتون',
      },
      prerequisiteLessonId: 'chem_2',
      estimatedMinutes: 10,
      content: {
        visualEmoji: '⚛️',
        introduction: {
          en: 'Just as words are built from alphabets, all matter in the universe is built from around 100 pure Elements. The smallest individual unit of an element is an Atom.',
          ur: 'جس طرح الفاظ حروف سے بنتے ہیں، اسی طرح کائنات کی ہر شے تقریباً ۱۰۰ خالص عناصر سے مل کر بنی ہے۔ کسی عنصر کا سب سے چھوٹا ذرہ ایٹم کہلاتا ہے۔',
          sd: 'جهڙيءَ طرح لفظ اکرن مان ٺهن ٿا، ائين سڄي ڪائنات ۱۰۰ عنصرن مان ٺهيل آهي. عنصر جو ننڍي ۾ ننڍو ذرو ائٽم سڏجي ٿو.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Chemical Symbols',
              ur: 'کیمیائی علامتیں',
              sd: 'ڪيميائي نشانيون',
            },
            description: {
              en: 'H = Hydrogen. O = Oxygen. C = Carbon. N = Nitrogen (the vital plant nutrient in Urea!).',
              ur: 'H = ہائیڈروجن، O = آکسیجن، C = کاربن، N = نائٹروجن (کھاد کا سب سے اہم غذائی جزو)۔',
              sd: 'H = هائيڊروجن، O = آڪسيجن، C = ڪاربن، N = نائيٽروجن (ڀاڻ جو سڀ کان مکيه جزو).',
            },
          },
          {
            title: {
              en: 'Molecules: Atoms Joining Hands',
              ur: 'سالمہ (مالیکیول): ایٹموں کا ملاپ',
              sd: 'ماليڪيول: ائٽمن جو گڏجڻ',
            },
            description: {
              en: 'Two Hydrogen atoms join with one Oxygen atom to form H2O: Water!',
              ur: 'جب دو ہائیڈروجن ایٹم ایک آکسیجن ایٹم سے ملتے ہیں تو H2O یعنی پانی کا مالیکیول بنتا ہے۔',
              sd: 'ٻه هائيڊروجن ائٽم هڪ آڪسيجن ائٽم سان ملندا آهن ته H2O يعني پاڻي ٺهي ٿو.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Reading the Fertilizer "N-P-K" Label',
            ur: 'کھاد پر لکھے کیمیائی حروف "N-P-K" کا مطلب',
            sd: 'ڀاڻ تي لکيل "N-P-K" جي سڃاڻپ',
          },
          scenario: {
            en: 'A fertilizer bag stamped 18-46-0 stands for Nitrogen (N), Phosphorus (P), and Potassium (K). Knowing elements helps you buy the exact plant food needed.',
            ur: 'کھاد کی بوری پر N-P-K نائٹروجن، فاسفورس اور پوٹاشیم کی علامتیں ہیں۔ یہ علم صحیح کھاد خریدنے میں مدد دیتا ہے۔',
            sd: 'ڀاڻ تي N-P-K نائيٽروجن، فاسفورس ۽ پوٽاشيم جا ڪيميائي نالا آهن.',
          },
          takeaway: {
            en: 'The periodic table directly decodes farm nutrient bags.',
            ur: 'عناصر کی علامتیں زرعی کھادوں کے لیبل سمجھاتی ہیں۔',
            sd: 'عنصرن جا نشان هاريءَ کي صحيح ڀاڻ سڃاڻڻ ۾ مدد ڪن ٿا.',
          },
        },
      },
      exercises: [
        {
          id: 'chem_3_ex1',
          type: 'multiple_choice',
          question: {
            en: 'What is the chemical formula for pure drinking water?',
            ur: 'پینے کے صاف پانی کا کیمیائی فارمولا کیا ہے؟',
            sd: 'صاف پيئڻ جي پاڻيءَ جو ڪيميائي فارمولو ڇا آهي؟',
          },
          options: [
            { id: 'f_h2o', text: { en: 'H2O', ur: 'H2O', sd: 'H2O' } },
            { id: 'f_co2', text: { en: 'CO2', ur: 'CO2', sd: 'CO2' } },
            { id: 'f_nacl', text: { en: 'NaCl', ur: 'NaCl', sd: 'NaCl' } },
          ],
          correctAnswer: 'f_h2o',
          explanation: {
            en: 'Correct! Two hydrogen atoms bonded to one oxygen atom form H2O (Water).',
            ur: 'شاباش! دو ہائیڈروجن اور ایک آکسیجن مل کر H2O یعنی پانی بناتے ہیں۔',
            sd: 'بلڪل درست! ٻه هائيڊروجن ۽ هڪ آڪسيجن ملي پاڻي (H2O) ٺاهين ٿا.',
          },
        },
      ],
    },
    {
      id: 'chem_4',
      subjectId: 'chemistry',
      chapterNumber: 2,
      lessonNumber: 4,
      level: 'elementary',
      title: {
        en: 'Lesson 4: Mixtures, Solutions & Suspensions (ORS & Saline Water)',
        ur: 'سبق ۴: آمیزے، محلول اور معلقات (نمکول اور نمکین پانی)',
        sd: 'سبق ۴: حل ٿيل پاڻي ۽ نمڪول جو محلول',
      },
      topic: {
        en: 'Solutions & Solubility',
        ur: 'محلول، حل پذیر مادے اور ارتکاز',
        sd: 'محلول ۽ ڳرڻ جو عمل',
      },
      prerequisiteLessonId: 'chem_3',
      estimatedMinutes: 10,
      content: {
        visualEmoji: '🧂',
        introduction: {
          en: 'When salt dissolves completely in water, it forms a homogeneous solution. When mud is mixed in canal water, it creates a cloudy suspension where particles settle over time.',
          ur: 'جب نمک پانی میں مکمل حل ہو جائے تو وہ شفاف محلول بناتا ہے۔ لیکن نہر کا گدلا پانی مٹی کا معلق آمیزہ (سسپینشن) ہے جس کے ذرات برتن کے نیچے بیٹھ جاتے ہیں۔',
          sd: 'جڏهن لوڻ پاڻيءَ ۾ مڪمل ڳري وڃي ته اهو شفاف محلول بنجي ٿو. پر گپ وارو پاڻي گدلو هوندو آهي جنهن جا ذرڙا هيٺ ويهندا آهن.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Solute and Solvent',
              ur: 'حل پذیر (سولیوٹ) اور محلل (سالوینٹ)',
              sd: 'ڳرندڙ شيءِ ۽ پاڻي',
            },
            description: {
              en: 'Solvent = The liquid that dissolves (Water). Solute = The substance dissolved (Sugar, Salt).',
              ur: 'سالوینٹ = وہ مائع جو حل کرے (پانی)۔ سولیوٹ = وہ چیز جو حل ہو (نمک یا چینی)۔',
              sd: 'سالوينٽ = جيڪو ڳاري (پاڻي). سوليٽ = جيڪا شيءِ ڳري (کنڊ يا لوڻ).',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Preparing Oral Rehydration Solution (ORS / نمکول)',
            ur: 'گھر میں زندگی بچانے والا نمکول تیار کرنا',
            sd: 'گهر ۾ نمڪول تيار ڪرڻ',
          },
          scenario: {
            en: '1 Liter of clean boiled water + 6 level teaspoons of Sugar (energy solute) + 1/2 level teaspoon of Salt (electrolyte solute) creates the life-saving ORS solution for dehydration.',
            ur: '۱ لیٹر صاف ابلے پانی میں ۶ چمچ چینی اور آدھا چمچ نمک حل کرنے سے اسہال اور ہیضے میں جان بچانے والا نمکول بنتا ہے۔',
            sd: '۱ ليٽر اٻريل پاڻيءَ ۾ ۶ چمچا کنڊ ۽ اڌ چمچو لوڻ ڳارڻ سان دستن ۾ جان بچائيندڙ نمڪول تيار ٿئي ٿو.',
          },
          takeaway: {
            en: 'Solution chemistry is the direct recipe for oral rehydration.',
            ur: 'محلول کی کیمسٹری بچوں کی جان بچانے کا فوری ذریعہ ہے۔',
            sd: 'ڪيميا جو صحيح تناسب ٻارن جي حياتي بچائي سگهي ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'chem_4_ex1',
          type: 'multiple_choice',
          question: {
            en: 'In an Oral Rehydration Solution (ORS), what acts as the Solvent?',
            ur: 'نمکول کے محلول میں سالوینٹ (محلل) کون سی چیز ہوتی ہے؟',
            sd: 'نمڪول جي محلول ۾ سالوينٽ (ڳاريندڙ مادو) ڪهڙو هوندو آهي؟',
          },
          options: [
            { id: 's_wat', text: { en: 'Clean boiled water', ur: 'صاف ابلا ہوا پانی', sd: 'صاف ٽهڪايل پاڻي' } },
            { id: 's_sug', text: { en: 'Table sugar', ur: 'چینی', sd: 'کنڊ' } },
            { id: 's_slt', text: { en: 'Common salt', ur: 'کھانے کا نمک', sd: 'لوڻ' } },
          ],
          correctAnswer: 's_wat',
          explanation: {
            en: 'Correct! Water is the universal solvent that dissolves the sugar and salt solutes.',
            ur: 'شاباش! پانی وہ سالوینٹ ہے جو چینی اور نمک کو اپنے اندر حل کرتا ہے۔',
            sd: 'بلڪل درست! پاڻي سالوينٽ آهي جيڪو کنڊ ۽ لوڻ کي حل ڪري ٿو.',
          },
        },
      ],
    },
    {
      id: 'chem_5',
      subjectId: 'chemistry',
      chapterNumber: 3,
      lessonNumber: 5,
      level: 'intermediate',
      title: {
        en: 'Lesson 5: Water Purification Science (Boiling, SODIS & Chlorine Dosing)',
        ur: 'سبق ۵: پانی صاف کرنے کی سائنسی تراکیب (ابالنا، سوڈس، کلورین)',
        sd: 'سبق ۵: پاڻي صاف ڪرڻ جا سائنسي طريقا (ٽهڪائڻ، سوڊس، ڪلورين)',
      },
      topic: {
        en: 'Disinfection & Water Microbiology',
        ur: 'جراثیم کشی اور محفوظ پانی کی فراہمی',
        sd: 'جراثيم ڪشي ۽ محفوظ پيئڻ جو پاڻي',
      },
      prerequisiteLessonId: 'chem_4',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '💧',
        interactiveTool: 'water_purifier',
        introduction: {
          en: 'Unpurified canal and pond water carries deadly cholera, typhoid, and diarrhea bacteria. Understanding the chemical and physical disinfection methods protects your family.',
          ur: 'نہر، تالاب اور گندے نلکوں کا پانی ہیضہ، ٹائیفائیڈ اور اسہال کے بیکٹیریا پھیلاتا ہے۔ سائنسی جراثیم کشی کے ذریعے بیماریوں کا خاتمہ ممکن ہے۔',
          sd: 'واهه يا کڏ جو گندو پاڻي هيضه، ٽائيفائيڊ ۽ دستن جون بيماريون پيدا ڪري ٿو. پاڻي صاف رکڻ سان گهر وارا بيمارين کان بچن ٿا.',
        },
        keyConcepts: [
          {
            title: {
              en: '1. Rolling Boil (100°C for 5-10 min)',
              ur: '۱۔ تیز ابال (۵ تا ۱۰ منٹ)',
              sd: '۱. تيز ٽهڪ (۵ کان ۱۰ منٽ)',
            },
            description: {
              en: 'High thermal heat denatures pathogen proteins, killing 99.9% of harmful organisms.',
              ur: 'شدید گرمی بیکٹیریا اور وائرس کے پروٹین تباہ کر کے انہیں مکمل مار دیتی ہے۔',
              sd: 'تيز گرمي بيماري پيدا ڪندڙ جراثيمن کي مڪمل ماري ڇڏي ٿي.',
            },
          },
          {
            title: {
              en: '2. Solar Disinfection (SODIS)',
              ur: '۲۔ شمسی جراثیم کشی (سوڈس)',
              sd: '۲. سِج جي روشنيءَ سان صفائي (سوڊس)',
            },
            description: {
              en: 'Placing clear PET plastic bottles in direct sunlight for 6 full hours uses solar UV-A radiation and heat to destroy waterborne pathogens.',
              ur: 'شفاف پلاسٹک کی بوتل چھ گھنٹے دھوپ میں چھت پر رکھنے سے سورج کی الٹرا وائلٹ (UV) شعاعیں جراثیم ختم کر دیتی ہیں۔',
              sd: 'شفاف بوتلون ۶ ڪلاڪ اس ۾ ڇت تي رکڻ سان سج جون تيز شعاعون جراثيمن کي ماري ڇڏين ٿيون.',
            },
          },
          {
            title: {
              en: '3. Chlorine Drops / Tablets',
              ur: '۳۔ کلورین کے قطرے / گولیاں',
              sd: '۳. ڪلورين جا ڦڙا / گوريون',
            },
            description: {
              en: 'Sodium hypochlorite oxidizes cell walls of microorganisms. Wait 30 minutes before drinking.',
              ur: 'کلورین بیکٹیریا کی خلیاتی جھلی کو توڑ دیتی ہے۔ کلورین ڈالنے کے بعد ۳۰ منٹ انتظار لازمی ہے۔',
              sd: 'ڪلورين جراثيمن جي بناوٽ ٽوڙي ڇڏي ٿي. ڪلورين وجهڻ بعد ۳۰ منٽ ترسي پوءِ پيئجي.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Flood and Rainy Season Water Protocol',
            ur: 'سیلاب اور برسات میں پانی کا محفوظ طریقہ',
            sd: 'برسات ۽ ٻوڏ ۾ پاڻي صاف ڪرڻ جو طريقو',
          },
          scenario: {
            en: 'When rainwater mixes with sewage, drink ONLY boiled water or water treated with SODIS/chlorine. Straining through a cloth removes mud, but does NOT kill germs!',
            ur: 'سیلاب میں گندے پانی سے بچاؤ کے لیے صرف ابلا ہوا پانی پئیں۔ کپڑے سے چھاننے سے صرف مٹی نکلتی ہے، جراثیم نہیں مرتے!',
            sd: 'ٻوڏ وقت پاڻي هميشه ٽهڪائي پيو. ڪپڙي مان ڇاڻڻ سان صرف گندگي نڪرندي آهي، جراثيم نٿا مرن!',
          },
          takeaway: {
            en: 'Cloth filters dirt; heat and chlorine kill microscopic germs.',
            ur: 'کپڑا مٹی روکتا ہے جبکہ گرمی اور کلورین جراثیم مارتے ہیں۔',
            sd: 'ڪپڙو مٽي روڪي ٿو، پر جراثيم رڳو گرمي يا ڪلورين سان مرن ٿا.',
          },
        },
      },
      exercises: [
        {
          id: 'chem_5_ex1',
          type: 'multiple_choice',
          question: {
            en: 'Does filtering muddy canal water through a cotton dupatta or cloth make it safe from cholera bacteria?',
            ur: 'کیا گندے پانی کو صرف سوتی کپڑے یا دوپٹے سے چھاننے سے ہیضے کے جراثیم مر جاتے ہیں؟',
            sd: 'ڇا گدلي پاڻيءَ کي رڳو ڪپڙي مان ڇاڻڻ سان هيضي جا جراثيم مري وڃن ٿا؟',
          },
          options: [
            { id: 'c_no', text: { en: 'No, cloth only removes dirt; boiling or chlorine is needed to kill germs', ur: 'نہیں، کپڑا صرف مٹی روکتا ہے؛ جراثیم مارنے کے لیے ابالنا یا کلورین ضروری ہے', sd: 'نه، ڪپڙو صرف مٽي روڪي ٿو، جراثيم مارڻ لاءِ ٽهڪائڻ ضروري آهي' } },
            { id: 'c_yes', text: { en: 'Yes, cloth filtering completely sterilizes water', ur: 'ہاں، کپڑے سے چھننے کے بعد پانی سو فیصد جراثیم سے پاک ہو جاتا ہے', sd: 'ها، ڪپڙي مان ڇاڻڻ بعد پاڻي مڪمل صاف ٿي وڃي ٿو' } },
          ],
          correctAnswer: 'c_no',
          explanation: {
            en: 'Correct! Bacteria are microscopic and pass easily through fabric pores. You must boil or disinfect with chlorine/SODIS.',
            ur: 'بالکل درست! بیکٹیریا خوردبینی ہوتے ہیں جو کپڑے کے سوراخوں سے گزر جاتے ہیں۔ انہیں ختم کرنے کے لیے ابالنا لازمی ہے۔',
            sd: 'بلڪل صحيح! جراثيم تمام ننڍا هوندا آهن جيڪي ڪپڙي مان لنگهي وڃن ٿا، تنهنڪري ٽهڪائڻ لازمي آهي.',
          },
        },
      ],
    },
    {
      id: 'chem_6',
      subjectId: 'chemistry',
      chapterNumber: 4,
      lessonNumber: 6,
      level: 'advanced',
      title: {
        en: 'Lesson 6: Acids, Bases & Soil pH in Sindh Agriculture',
        ur: 'سبق ۶: تیزاب، اساس اور سندھ کی زمین کی پی ایچ (pH)',
        sd: 'سبق ۶: تيزاب، ڪلراٺي زمين ۽ پي ايڇ (pH)',
      },
      topic: {
        en: 'pH Scale & Saline/Sodic Soil Chemistry',
        ur: 'پی ایچ پیمانہ اور کلر زدہ زمینوں کا علاج',
        sd: 'پي ايڇ اسڪيل ۽ ڪلراٺي ٻنيءَ جو علاج',
      },
      prerequisiteLessonId: 'chem_5',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '🧪',
        introduction: {
          en: 'The pH scale runs from 0 (Extremely Acidic) to 14 (Extremely Alkaline/Basic), with 7 being neutral. In Sindh, high salinity and canal water stagnation frequently cause alkaline soils (pH > 8.5) that lock away nutrients.',
          ur: 'پی ایچ پیمانہ ۰ (شدید تیزابی) سے ۱۴ (شدید اساسی یا کلراٹھا) تک ہوتا ہے۔ سندھ کی اکثر زمینیں سیم و تھور اور کلر کی وجہ سے اساسی (pH > 8.5) ہو جاتی ہیں جس سے فصلیں خوراک جذب نہیں کر پاتیں۔',
          sd: 'پي ايڇ ۰ کان ۱۴ تائين ٿئي ٿو. سنڌ ۾ ڪلر جي ڪري زمين جي پي ايڇ ۸.۵ کان مٿي ٿي وڃي ٿي جنهن سان ٻوٽا ڀاڻ کڻي نٿا سگهن.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Neutralizing High Soil pH with Gypsum (جپسم)',
              ur: 'جپسم (Gypsum) کے ذریعے کلر کا خاتمہ',
              sd: 'جپسم ذريعي ڪلر جو علاج',
            },
            description: {
              en: 'Calcium Sulfate (Gypsum) displaces toxic sodium ions with beneficial calcium ions, improving soil drainage and lowering pH back toward 7.5.',
              ur: 'کیلشیم سلفیٹ (جپسم) زمین سے مضر سوڈیم کو نکال کر کیلشیم دیتا ہے، جس سے زمین کی سختی ختم ہوتی ہے اور پی ایچ نارمل ہو جاتی ہے۔',
              sd: 'جپسم زمين مان زيانڪار سوڊيم ڪڍي ڪيلشيم ڏئي ٿو، جنهن سان ڪلر گهٽجي ٿو ۽ زمين زرخيز ٿئي ٿي.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Testing Irrigation Tube-Well Salinity (TDS)',
            ur: 'ٹیوب ویل کے کھارے پانی کا معائنہ',
            sd: 'ٽيوب ويل جي کاري پاڻيءَ جي چڪاس',
          },
          scenario: {
            en: 'Water with TDS > 1,500 ppm or high sodium will destroy topsoil chemistry over 3 seasons. Testing before drilling prevents financial loss.',
            ur: 'اگر ٹیوب ویل کا پانی کھارا اور کڑوا ہو تو وہ تین فصلوں کے اندر زمین کو بنجر بنا دے گا۔ پانی کی کیمیائی جانچ ضروری ہے۔',
            sd: 'جيڪڏهن پاڻي کارو هجي ته ۳ سالن ۾ زمين ڪلراٺي بڻائي ڇڏيندو. اڳواٽ ليبارٽري چڪاس ضروري آهي.',
          },
          takeaway: {
            en: 'Chemistry protects the soil foundation of your farmland.',
            ur: 'کیمیا کا علم زمین کو بنجر ہونے سے بچاتا ہے۔',
            sd: 'ڪيميا جي ڄاڻ زمين کي سدائين زرخيز رکي ٿي.',
          },
        },
      },
      exercises: [
        {
          id: 'chem_6_ex1',
          type: 'multiple_choice',
          question: {
            en: 'What is the neutral pH value of pure clean water?',
            ur: 'خالص اور غیر جانبدار پانی کی پی ایچ (pH) کتنی ہوتی ہے؟',
            sd: 'خالص ۽ صاف پاڻيءَ جو غير جانبدار پي ايڇ (pH) ڪيترو هوندو آهي؟',
          },
          options: [
            { id: 'ph7', text: { en: 'pH 7 (Neutral)', ur: 'pH 7 (معتدل)', sd: 'pH 7 (معتدل)' } },
            { id: 'ph2', text: { en: 'pH 2 (Strong Acid)', ur: 'pH 2 (تیزاب)', sd: 'pH 2 (تيزاب)' } },
            { id: 'ph12', text: { en: 'pH 12 (Strong Base)', ur: 'pH 12 (اساس/کلر)', sd: 'pH 12 (ڪلراٺو)' } },
          ],
          correctAnswer: 'ph7',
          explanation: {
            en: 'Correct! pH 7 is exactly neutral on the 0-14 scale.',
            ur: 'شاباش! پی ایچ ۷ معتدل پانی کی شناخت ہے۔',
            sd: 'بلڪل درست! پي ايڇ ۷ صاف پاڻيءَ جو معتدل درجو آهي.',
          },
        },
      ],
    },
    {
      id: 'chem_7',
      subjectId: 'chemistry',
      chapterNumber: 4,
      lessonNumber: 7,
      level: 'advanced',
      title: {
        en: 'Lesson 7: Agricultural Chemicals & Agrochemical Safety (Urea, DAP & Pesticides)',
        ur: 'سبق ۷: زرعی کھادوں کی کیمسٹری اور اسپرے کا محفوظ استعمال (یوریا، ڈی اے پی)',
        sd: 'سبق ۷: ڀاڻ ۽ زرعي دوائن جي حفاظت جا اصول',
      },
      topic: {
        en: 'Macronutrients & Chemical Hazard Protocols',
        ur: 'پودوں کی خوراک اور زہریلی ادویات سے بچاؤ',
        sd: 'ٻوٽن جي خوراڪ ۽ خطرناڪ دوائن کان بچاءُ',
      },
      prerequisiteLessonId: 'chem_6',
      estimatedMinutes: 15,
      content: {
        visualEmoji: '⚠️',
        introduction: {
          en: 'Urea delivers concentrated Nitrogen (46% N) for leaf growth; DAP provides Phosphorus (46% P2O5) for deep root establishment. Understanding these chemicals prevents wasting money and protects human life from toxic spray poisoning.',
          ur: 'یوریا میں ۴۶ فیصد نائٹروجن پتوں کو سرسبز اور قدآور بناتی ہے؛ ڈی اے پی میں فاسفورس جڑوں کو مضبوط بناتا ہے۔ کیمیائی حفاظت نہ برتنے سے خطرناک زہر انسانی جسم میں داخل ہو سکتا ہے۔',
          sd: 'يوريا مان نائيٽروجن (۴۶ سيڪڙو) ۽ ڊي اي پي مان فاسفورس ملي ٿو. پر اسپرے ڪندي احتياط نه ڪرڻ سان زهر ساهه ذريعي اندر هليو وڃي ٿو.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Never Spray Against the Wind',
              ur: 'ہوا کے مخالف سمت میں ہرگز اسپرے نہ کریں',
              sd: 'هوا جي سامهون ڪڏهن به اسپرے نه ڪريو',
            },
            description: {
              en: 'Wind carries fine droplet mist directly into your eyes, mouth, and lungs. Always spray with the wind blowing away from your body.',
              ur: 'ہوا کا رخ الٹا ہونے پر کیمیکل اسپرے سیدھا کسان کی آنکھوں، منہ اور پھیپھڑوں میں جاتا ہے۔ ہمیشہ ہوا کے رخ کے ساتھ چلیں۔',
              sd: 'سامهون هوا هجڻ سان زهر اڏامي منهن ۽ اکين ۾ پوندو آهي. هميشه هوا جي رخ ۾ اڳتي وڌو.',
            },
          },
          {
            title: {
              en: 'Never Reuse Chemical Containers for Water or Milk',
              ur: 'خالی کیمیکل ڈبے کبھی پانی یا دودھ کے لیے استعمال نہ کریں',
              sd: 'خالي زهر جا دٻا پاڻي يا کير لاءِ هرگز استعمال نه ڪريو',
            },
            description: {
              en: 'Pesticide residues bond into porous plastic containers and cannot be washed away with water. Reusing them causes fatal poisoning.',
              ur: 'کیڑے مار ادویات کے زہریلے اجزاء پلاسٹک میں جذب ہو جاتے ہیں جو دھونے سے ختم نہیں ہوتے۔ ان کا استعمال جان لیوا ہے۔',
              sd: 'پلاسٽڪ مان زهر ڪڏهن به ڌوئڻ سان ختم ناهي ٿيندو، اهي دٻا ٻارن جي کير يا پاڻيءَ لاءِ ڪم آڻڻ سخت جان ليوا آهي.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Personal Protective Equipment (PPE) Checklist',
            ur: 'اسپرے کے وقت حفاظتی لباس کی فہرست',
            sd: 'اسپرے ڪرڻ وقت حفاظت جا لازمي اوزار',
          },
          scenario: {
            en: 'Cover face with a damp cloth or mask, wear long sleeves, use rubber gloves, and wash clothes immediately after spraying with soap.',
            ur: 'منہ پر ماسک، ہاتھوں پر دستانے، بند جوتے اور اسپرے کے بعد کپڑے بدل کر صابن سے نہانا زندگی بچاتا ہے۔',
            sd: 'منهن تي ماسڪ، هٿن ۾ دستانا ۽ ڪم کان پوءِ فوري طور صابڻ سان هٿ منهن ڌوئڻ گهرجي.',
          },
          takeaway: {
            en: 'Chemical literacy is the single greatest protector against rural pesticide fatalities.',
            ur: 'کیمیائی حفاظت کا اصول زرعی بستیوں میں کسانوں کی جانوں کا محافظ ہے۔',
            sd: 'ڪيميائي حفاظت جا اصول ڳوٺاڻي زندگيءَ ۾ هارين جو تحفظ ڪن ٿا.',
          },
        },
      },
      exercises: [
        {
          id: 'chem_7_ex1',
          type: 'multiple_choice',
          question: {
            en: 'What is the guaranteed percentage of Nitrogen in standard agricultural Urea?',
            ur: 'معیاری زرعی یوریا کھاد میں نائٹروجن (N) کی کتنی فیصد شرح موجود ہوتی ہے؟',
            sd: 'معياري زرعي يوريا ڀاڻ ۾ نائيٽروجن (N) جو ڪيترو سيڪڙو هوندو آهي؟',
          },
          options: [
            { id: 'u46', text: { en: '46% Nitrogen', ur: '۴۶ فیصد نائٹروجن', sd: '۴۶ سيڪڙو نائيٽروجن' } },
            { id: 'u18', text: { en: '18% Nitrogen', ur: '۱۸ فیصد نائٹروجن', sd: '۱۸ سيڪڙو نائيٽروجن' } },
            { id: 'u60', text: { en: '60% Nitrogen', ur: '۶۰ فیصد نائٹروجن', sd: '۶۰ سيڪڙو نائيٽروجن' } },
          ],
          correctAnswer: 'u46',
          explanation: {
            en: 'Correct! Standard Urea fertilizer prills contain 46% Nitrogen.',
            ur: 'شاباش! یوریا میں نائٹروجن کی معیاری شرح ۴۶ فیصد ہوتی ہے۔',
            sd: 'بلڪل درست! يوريا ڀاڻ ۾ نائيٽروجن ۴۶ سيڪڙو ٿئي ٿي.',
          },
        },
      ],
    },
  ],
};

// ============================================================================
// 5. AGRICULTURE & LIVESTOCK CURRICULUM
// Progression:
// Chapter 1 (Beginner): Soil Preparation & Land Leveling
// Chapter 2 (Elementary): Sindh Crop Lifecycles (Rice Irri-6/Basmati & Wheat)
// Chapter 3 (Intermediate): Irrigation Systems & Livestock Care (Cattle & Dairy)
// Chapter 4 (Advanced): Farm Economics & Interactive Crop Profit Calculator
// ============================================================================
export const AGRICULTURE_SUBJECT: SubjectCurriculum = {
  id: 'agriculture',
  title: {
    en: 'Agriculture & Livestock Economics',
    ur: 'زراعت، لائیو اسٹاک اور فارم معیشت',
    sd: 'ٻني ٻارو، مالوند ۽ فارم جي معيشيت',
  },
  description: {
    en: 'Master soil preparation, Sindh Rice/Wheat lifecycles, livestock care, and real interactive farm profit and loss accounting.',
    ur: 'زمین کی تیاری، سندھ میں چانور و گندم کی کاشت، مویشیوں کی نگہداشت اور منافع کا مکمل حسابی نظام۔',
    sd: 'ٻنيءَ جي تياري، سنڌ ۾ چانورن ۽ ڪڻڪ جي پوک، مال جي سار سنڀال ۽ منافعي جو مڪمل حساب ڪتاب.',
  },
  emoji: '🌾',
  tag: {
    en: 'Rural Livelihood',
    ur: 'دیہی خوشحالی و معیشت',
    sd: 'ڳوٺاڻو روزگار ۽ خوشحالي',
  },
  badgeBg: 'bg-lime-100 text-lime-900 border-lime-200',
  accentBorder: 'border-lime-300 hover:border-lime-500',
  gradient: 'from-lime-600 to-green-700',
  chapters: [
    {
      chapterNumber: 1,
      title: {
        en: 'Chapter 1: Soil Preparation & Laser Leveling',
        ur: 'باب ۱: زمین کی تیاری، ہل چلانا اور لیزر لیولنگ',
        sd: 'باب ۱: ٻنيءَ جي تياري ۽ ليزر ليولنگ',
      },
      level: 'beginner',
      lessonIds: ['agri_1'],
    },
    {
      chapterNumber: 2,
      title: {
        en: 'Chapter 2: Sindh Crop Lifecycles (Kharif Rice & Rabi Wheat)',
        ur: 'باب ۲: سندھ کی اہم فصلیں (خریف چاول و ربیع گندم کا دورانیہ)',
        sd: 'باب ۲: سنڌ جا اهم فصل (چانور ۽ ڪڻڪ جو چڪر)',
      },
      level: 'elementary',
      lessonIds: ['agri_2', 'agri_3'],
    },
    {
      chapterNumber: 3,
      title: {
        en: 'Chapter 3: Water Management & Livestock Dairy Care',
        ur: 'باب ۳: آبپاشی کے طریقے اور مویشیوں کی نگہداشت',
        sd: 'باب ۳: پاڻيءَ جو بندوبست ۽ مال جي سنڀال',
      },
      level: 'intermediate',
      lessonIds: ['agri_4'],
    },
    {
      chapterNumber: 4,
      title: {
        en: 'Chapter 4: Farm Economics & Interactive Profit Calculator',
        ur: 'باب ۴: زرعی معاشیات اور منافع و نقصان کا لائیو کیلکولیٹر',
        sd: 'باب ۴: ٻنيءَ جو کاتو ۽ منافعي جو لائيو ڪيلڪوليٽر',
      },
      level: 'advanced',
      lessonIds: ['agri_5'],
    },
  ],
  lessons: [
    {
      id: 'agri_1',
      subjectId: 'agriculture',
      chapterNumber: 1,
      lessonNumber: 1,
      level: 'beginner',
      title: {
        en: 'Lesson 1: Soil Preparation & Laser Land Leveling',
        ur: 'سبق ۱: زمین کی تیاری اور لیزر لیولنگ کے فوائد',
        sd: 'سبق ۱: ٻنيءَ کي سنئون ڪرڻ ۽ ليزر ليولنگ',
      },
      topic: {
        en: 'Land Preparation & Water Conservation',
        ur: 'زمین ہموار کرنا اور پانی کی بچت',
        sd: 'پاڻيءَ جي بچت ۽ زمين جي سڌائي',
      },
      learningObjectives: {
        en: [
          'Understand how laser leveling cuts water usage by 25–30%',
          'Identify the ideal moisture level (Vattar / وتر) for plowing',
          'Explain the role of farmyard manure in improving sandy and clay soils',
        ],
        ur: [
          'لیزر لیولنگ کے ذریعے پانی کی ۲۵ سے ۳۰ فیصد بچت کو سمجھنا',
          'ہل چلانے کے لیے زمین کے وتر (مناسب نمی) کی پہچان',
          'گوبر کی دیسی کھاد کے ذریعے زمین کی زرخیزی بڑھانا',
        ],
        sd: [
          'ليزر ليولنگ سان پاڻيءَ جي ۲۵ کان ۳۰ سيڪڙو بچت سمجهڻ',
          'هر هلائڻ لاءِ ٻنيءَ ۾ وتر (مناسب آلاڻ) جو خيال رکڻ',
          'ڏيهي ڀاڻ سان زمين جي طاقت وڌائڻ',
        ],
      },
      estimatedMinutes: 10,
      content: {
        visualEmoji: '🚜',
        introduction: {
          en: 'A high crop yield begins before a single seed is sown. Uneven land leaves high spots parched and low spots waterlogged. Laser land leveling ensures uniform irrigation.',
          ur: 'اچھی فصل کی بنیاد بیج بونے سے پہلے رکھی جاتی ہے۔ ناہموار زمین میں اونچی جگہیں پیاسی رہ جاتی ہیں اور نشیبی جگہوں پر پانی کھڑا ہو کر جڑیں سڑا دیتا ہے۔ لیزر لیولنگ پورے کھیت کو یکساں پانی دیتی ہے۔',
          sd: 'سٺي پيداوار ٻج پوکڻ کان اڳ شروع ٿئي ٿي. اوچي زمين تي پاڻي نٿو چڙهي ۽ هيٺاهينءَ تي پاڻي بيهي ٻوٽن کي سڙي ڇڏي ٿو. ليزر ليولنگ سان پاڻي هڪجهڙو وڃي ٿو.',
        },
        keyConcepts: [
          {
            title: {
              en: '25% Water Savings',
              ur: 'پانی اور ڈیزل کی ۲۵ فیصد بچت',
              sd: 'پاڻي ۽ ڊيزل جي ۲۵ سيڪڙو بچت',
            },
            description: {
              en: 'Level fields allow water to spread quickly, reducing tubewell pumping hours and fuel expenses.',
              ur: 'ہموار زمین میں پانی تیزی سے آگے بڑھتا ہے جس سے ٹیوب ویل کے ڈیزل کا خرچ کم ہوتا ہے۔',
              sd: 'سڌي زمين تي پاڻي تيزيءَ سان وهي ٿو ۽ ٽيوب ويل هلائڻ جو تيل بچي ٿو.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Checking Soil "Vattar" (وتر)',
            ur: 'زمین کا "وتر" جانچنے کا طریقہ',
            sd: 'ٻنيءَ جو وتر جاچڻ',
          },
          scenario: {
            en: 'Squeeze a handful of topsoil: if it forms a firm ball without dripping water and crumbles easily when pressed, the field is ready for plowing.',
            ur: 'مٹھی بھر مٹی دبائیں: اگر مٹی کا لڈو بن جائے لیکن پانی نہ ٹپکے تو زمین ہل چلانے کے لیے تیار ہے۔',
            sd: 'مٽيءَ کي مُٺ ۾ دٻايو: جيڪڏهن لڏو ٺهي پر پاڻي نه ٽمي ته ٻني هر هلائڻ لاءِ تيار آهي.',
          },
          takeaway: {
            en: 'Plowing at the right moisture produces fine tilth and prevents hard clods.',
            ur: 'صحیح وتر پر ہل چلانے سے مٹی بھربھری ہوتی ہے اور روڑے نہیں بنتے۔',
            sd: 'صحيح وقت تي هر هلائڻ سان ٻنيءَ ۾ مٽي نرم رهي ٿي.',
          },
        },
      },
      exercises: [
        {
          id: 'agri_1_ex1',
          type: 'multiple_choice',
          question: {
            en: 'How much irrigation water does laser land leveling typically save compared to unlevel fields?',
            ur: 'غیر ہموار کھیتوں کے مقابلے میں لیزر لیولنگ سے آبپاشی کے پانی کی کتنی بچت ہوتی ہے؟',
            sd: 'غير سڌي ٻنيءَ جي ڀيٽ ۾ ليزر ليولنگ سان پاڻيءَ جي لڳ ڀڳ ڪيتري بچت ٿئي ٿي؟',
          },
          options: [
            { id: 'l25', text: { en: '25% to 30%', ur: '۲۵ سے ۳۰ فیصد', sd: '۲۵ کان ۳۰ سيڪڙو' } },
            { id: 'l5', text: { en: 'Only 2%', ur: 'صرف ۲ فیصد', sd: 'رڳو ۲ سيڪڙو' } },
            { id: 'l80', text: { en: '80%', ur: '۸۰ فیصد', sd: '۸۰ سيڪڙو' } },
          ],
          correctAnswer: 'l25',
          explanation: {
            en: 'Correct! Laser leveling saves about 25–30% of irrigation water and reduces weed growth.',
            ur: 'شاباش! لیزر لیولنگ سے ۲۵ سے ۳۰ فیصد پانی اور ڈیزل کی بچت ہوتی ہے۔',
            sd: 'بلڪل درست! ليزر ليولنگ سان ۲۵ کان ۳۰ سيڪڙو پاڻي بچي ٿو.',
          },
        },
      ],
    },
    {
      id: 'agri_2',
      subjectId: 'agriculture',
      chapterNumber: 2,
      lessonNumber: 2,
      level: 'elementary',
      title: {
        en: 'Lesson 2: Sindh Rice Crop Lifecycle (Nursery to Harvest)',
        ur: 'سبق ۲: سندھ میں دھان / چاول کی کاشت کا مکمل دورانیہ',
        sd: 'سبق ۲: سنڌ ۾ چانورن (سارين) جو مڪمل چڪر',
      },
      topic: {
        en: 'Kharif Rice Cultivation (Irri-6 & Basmati)',
        ur: 'دھان کی پنیری، منتقلی اور کٹائی',
        sd: 'سارين جي پنيري ۽ لڻائي',
      },
      prerequisiteLessonId: 'agri_1',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '🌾',
        introduction: {
          en: 'Rice (Kharif season) is a cornerstone of Sindh agriculture, especially in Thatta, Badin, Larkana, and Jacobabad. It thrives in standing water and follows a 120–140 day cycle.',
          ur: 'چاول (خریف سیزن) سندھ کی معیشت کا بنیادی ستون ہے، خاص طور پر ٹھٹہ، بدین، لاڑکانہ اور جیکب آباد میں۔ یہ ۱۲۰ سے ۱۴۰ دن میں تیار ہوتا ہے۔',
          sd: 'چانور (خريف) سنڌ جي معيشيت جو اهم حصو آهن، خاص ڪري لاڙڪاڻي، بدين ۽ ٺٽي ۾. هي فصل ۱۲۰ کان ۱۴۰ ڏينهن ۾ لٿو آهي.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Four Key Stages',
              ur: 'دھان کے چار اہم مراحل',
              sd: 'سارين جا چار مرحلا',
            },
            description: {
              en: '1. Nursery Bed (پنیری): 25–30 days. 2. Transplanting (کھیت میں لگانا): Plant 2 seedlings per hill. 3. Tillering & Panicle initiation. 4. Ripening & Harvesting.',
              ur: '۱۔ پنیری (۲۵ تا ۳۰ دن)۔ ۲۔ منتقلی (فی سوراخ ۲ پودے)۔ ۳۔ شگوفے اور سٹہ نکلنا۔ ۴۔ پکائی اور کٹائی۔',
              sd: '۱. پنيري (۲۵ کان ۳۰ ڏينهن). ۲. ٽپائڻ (هر ٻوٽي تي ۲ سلا). ۳. پن ۽ سنگ نڪرڻ. ۴. پچڻ ۽ لڻائي.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Zinc Deficiency in Alkaline Soils (خوشہ نہ بھرنا)',
            ur: 'دھان میں زنک کی کمی کا علاج',
            sd: 'سارين ۾ زنڪ جي کوٽ جو علاج',
          },
          scenario: {
            en: 'If rice leaves turn rust-brown after transplanting, the soil lacks Zinc. Applying Zinc Sulfate (33%) at 5 kg/acre restores vigorous tillering.',
            ur: 'اگر چاول کے پتے زنگ آلود براؤن ہو جائیں تو یہ زنک کی کمی ہے۔ ۵ کلو زنک سلفیٹ فی ایکڑ ڈالنے سے فصل میں جان آ جاتی ہے۔',
            sd: 'جيڪڏهن سارين جا پن ڀورا ٿين ته زنڪ سلفيٽ وجهڻ سان فصل سائي ٿي وڃي ٿي.',
          },
          takeaway: {
            en: 'Micro-nutrients like Zinc prevent empty grain panicles.',
            ur: 'زنک جیسے اجزاء سٹے کو خالی رہنے سے بچاتے ہیں۔',
            sd: 'زنڪ سنگ کي ڀرپور رکڻ لاءِ تمام ضروري آهي.',
          },
        },
      },
      exercises: [
        {
          id: 'agri_2_ex1',
          type: 'multiple_choice',
          question: {
            en: 'How many days after sowing in the nursery should rice seedlings normally be transplanted to the main field?',
            ur: 'پنیری بیجنے کے کتنے دن بعد دھان کے پودے مرکزی کھیت میں منتقل کرنے چاہییں؟',
            sd: 'پنيري پوکڻ کان ڪيترا ڏينهن پوءِ سارين جا سلا وڏي ٻنيءَ ۾ لڳائڻ گهرجن؟',
          },
          options: [
            { id: 'd25', text: { en: '25 to 30 days', ur: '۲۵ سے ۳۰ دن', sd: '۲۵ کان ۳۰ ڏينهن' } },
            { id: 'd60', text: { en: '60 days', ur: '۶۰ دن', sd: '۶۰ ڏينهن' } },
            { id: 'd10', text: { en: '10 days', ur: '۱۰ دن', sd: '۱۰ ڏينهن' } },
          ],
          correctAnswer: 'd25',
          explanation: {
            en: 'Correct! Transplanting at 25–30 days ensures quick root establishment without root shock.',
            ur: 'شاباش! ۲۵ سے ۳۰ دن کی پنیری منتقل کرنے سے جڑیں تیزی سے پھیلتی ہیں۔',
            sd: 'بلڪل درست! ۲۵ کان ۳۰ ڏينهن جي پنيري ٽپائڻ سان جڙون مضبوط ٿين ٿيون.',
          },
        },
      ],
    },
    {
      id: 'agri_3',
      subjectId: 'agriculture',
      chapterNumber: 2,
      lessonNumber: 3,
      level: 'elementary',
      title: {
        en: 'Lesson 3: Sindh Wheat Crop (Gandum) & Grain Storage',
        ur: 'سبق ۳: ربیع گندم کی کاشت اور اناج کا محفوظ ذخیرہ',
        sd: 'سبق ۳: ڪڻڪ جو فصل ۽ ان کي سانڍڻ جا طريقا',
      },
      topic: {
        en: 'Rabi Wheat Season & Rust Protection',
        ur: 'گندم کی نگہداشت اور کٹائی',
        sd: 'ڪڻڪ جي سنڀال ۽ رکڻ جا اصول',
      },
      prerequisiteLessonId: 'agri_2',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '🌾',
        introduction: {
          en: 'Wheat (Gandum / ڪڻڪ) is our primary staple food, sown in November and harvested in March/April across Sindh. Timely sowing is critical; every day of delay after November 20 reduces yield.',
          ur: 'گندم ہماری بنیادی خوراک ہے۔ نومبر میں کاشت اور مارچ/اپریل میں کٹائی ہوتی ہے۔ ۲۰ نومبر کے بعد ہر دن کی تاخیر فی ایکڑ پیداوار کم کرتی ہے۔',
          sd: 'ڪڻڪ اسان جو بنيادي کاڌو آهي. نومبر ۾ پوک ۽ مارچ/اپريل ۾ لڻائي ٿئي ٿي. وقت تي پوک ڪرڻ سان ئي سٺو فصل لهي ٿو.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Critical Irrigation Stages',
              ur: 'پانی کے اہم مراحل',
              sd: 'پاڻيءَ جا نازڪ مرحلا',
            },
            description: {
              en: '1. Crown Root Initiation (21 days after sowing). 2. Booting / Flowering stage. 3. Grain milking stage. Never let soil dry out at flowering.',
              ur: '۱۔ بیج اگنے کے ۲۱ دن بعد پہلا پانی۔ ۲۔ گوبھ اور سٹہ نکلنے کا وقت۔ ۳۔ دودھیا دانہ بننے کا مرحلہ۔ ان وقتوں پر پانی میں تاخیر دانہ پچکا دیتی ہے۔',
              sd: '۱. پوکڻ کان ۲۱ ڏينهن پوءِ پهريون پاڻي. ۲. سنگ نڪرڻ جو وقت. ۳. داڻي ڀرجڻ جو وقت. انهن وقتن تي پاڻي نه ملڻ سان داڻو سڙي ويندو.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Hermetic Bag Storage vs Grain Weevils (سسری)',
            ur: 'گندم کو سسری اور کیڑے سے محفوظ رکھنا',
            sd: 'ڪڻڪ کي سُسري ۽ مائي کان بچائڻ',
          },
          scenario: {
            en: 'Storing dry wheat (<10% moisture) in airtight (hermetic) bags suffocates insects naturally without toxic chemical tablets.',
            ur: 'خشک گندم کو ایئر ٹائٹ بیگز میں رکھنے سے آکسیجن ختم ہو جاتی ہے اور بغیر خطرناک زہریلی گولیوں کے کیڑا ختم ہو جاتا ہے۔',
            sd: 'سڪل ڪڻڪ کي هوا بند ٿيلهن ۾ رکڻ سان سُسري پيدا نٿي ٿئي.',
          },
          takeaway: {
            en: 'Proper moisture control protects grain all year without chemicals.',
            ur: 'صحیح نمی کا کنٹرول گندم کو سال بھر محفوظ رکھتا ہے۔',
            sd: 'صحيح نمي رکڻ سان ڪڻڪ سڄو سال محفوظ رهي ٿي.',
          },
        },
      },
      exercises: [
        {
          id: 'agri_3_ex1',
          type: 'multiple_choice',
          question: {
            en: 'When should the critical first irrigation (Crown Root Initiation) be given to wheat after sowing?',
            ur: 'گندم کی کاشت کے بعد پہلا انتہائی اہم پانی (تاج نما جڑوں کے نکلنے پر) کب دینا چاہیے؟',
            sd: 'ڪڻڪ پوکڻ کان پوءِ پهريون تمام ضروري پاڻي ڪڏهن ڏيڻ گهرجي؟',
          },
          options: [
            { id: 'w21', text: { en: '20 to 22 days after sowing', ur: '۲۰ سے ۲۲ دن بعد', sd: '۲۰ کان ۲۲ ڏينهن بعد' } },
            { id: 'w50', text: { en: '50 days after sowing', ur: '۵۰ دن بعد', sd: '۵۰ ڏينهن بعد' } },
            { id: 'w5', text: { en: '5 days after sowing', ur: '۵ دن بعد', sd: '۵ ڏينهن بعد' } },
          ],
          correctAnswer: 'w21',
          explanation: {
            en: 'Correct! The first irrigation at 20–22 days supports crown root development.',
            ur: 'شاباش! ۲۰ سے ۲۲ دن پر پہلا پانی جڑوں کے پھیلاؤ کے لیے ناگزیر ہے۔',
            sd: 'بلڪل درست! ۲۰ کان ۲۲ ڏينهن تي پهريون پاڻي جڙن کي سگھ ڏئي ٿو.',
          },
        },
      ],
    },
    {
      id: 'agri_4',
      subjectId: 'agriculture',
      chapterNumber: 3,
      lessonNumber: 4,
      level: 'intermediate',
      title: {
        en: 'Lesson 4: Livestock Care, Mastitis Prevention & Dairy Yield',
        ur: 'سبق ۴: مویشیوں کی دیکھ بھال، ساڑو کی بیماری اور دودھ کی پیداوار',
        sd: 'سبق ۴: مال جي سار سنڀال، ساڙو جي بيماري ۽ کير جي پيداوار',
      },
      topic: {
        en: 'Dairy Health & Hygiene',
        ur: 'مویشی پروری اور دودھ کی افزائش',
        sd: 'مال جي سنڀال ۽ کير وڌائڻ جا طريقا',
      },
      prerequisiteLessonId: 'agri_3',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '🐄',
        introduction: {
          en: 'Cattle, buffaloes (Kundhi), and goats provide continuous daily cash flow. Mastitis (udder infection / ساڑو) is the #1 destroyer of dairy income.',
          ur: 'گائے، کنڈھی بھینس اور بکریاں دیہی خاندانوں کی یومیہ آمدنی کا ذریعہ ہیں۔ ہوانے کی سوزش (ساڑو) دودھ کی آمدنی کو سب سے زیادہ نقصان پہنچاتی ہے۔',
          sd: 'ڳئون، ڪنڍي مينهون ۽ ٻڪريون روزانو پئسو ڏيندڙ اثاثو آهن. اوهن جي بيماري (ساڙو) کير جو وڏو نقصان ڪري ٿي.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Post-Milking Teat Dipping',
              ur: 'چوائی کے بعد تھن جراثیم کش دوا میں ڈبونا',
              sd: 'کير ڏهڻ بعد اوهن کي دوا لڳائڻ',
            },
            description: {
              en: 'After milking, the teat canal remains open for 30 minutes. Dipping teats in 0.5% iodine solution prevents bacteria from entering.',
              ur: 'دودھ دوہنے کے بعد تھن کا سوراخ آدھے گھنٹے تک کھلا رہتا ہے۔ آئیوڈین کے محلول میں ڈبونے سے جراثیم داخل نہیں ہو سکتے۔',
              sd: 'کير ڏهڻ کان پوءِ ٿڻن جو سوراخ اڌ ڪلاڪ کليل رهندو آهي. آئيڊين جو ڦڙو لڳائڻ سان ساڙو نٿو ٿئي.',
            },
          },
          {
            title: {
              en: 'Balanced Green Fodder & Mineral Mixtures',
              ur: 'متوازن چارہ اور منرل مکسچر',
              sd: 'سائو گاهه ۽ معدني نمڪ',
            },
            description: {
              en: 'Feeding mineral salts and clean water increases milk yield by 1.5 to 2 liters daily.',
              ur: 'جانوروں کو منرل نمکیات اور صاف پانی دینے سے دودھ کی پیداوار ڈیڑھ سے دو لیٹر یومیہ بڑھ جاتی ہے۔',
              sd: 'مال کي نمڪيات ۽ صاف پاڻي پيارڻ سان کير روزانو ٻه ليٽر وڌي ٿو.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Cooling Buffaloes During Severe June Heat',
            ur: 'جون کی شدید گرمی میں بھینسوں کو ٹھنڈا رکھنا',
            sd: 'گرميءَ ۾ مينهن کي تڙ ڪرائڻ',
          },
          scenario: {
            en: 'Buffaloes have dark skin and fewer sweat glands. Bathing them twice daily under straw shade prevents heat stress and keeps milk output steady.',
            ur: 'بھینسوں کی جلد سیاہ ہوتی ہے جس سے انہیں شدید گرمی لگتی ہے۔ دن میں دو بار نہلانے اور سایہ دار شیڈ سے دودھ کی پیداوار گرتی نہیں ہے۔',
            sd: 'سخت گرميءَ ۾ مينهن کي ڏينهن ۾ ٻه ڀيرا تڙ ڪرائڻ سان گرمي نٿي لڳي ۽ کير برقرار رهي ٿو.',
          },
          takeaway: {
            en: 'Preventing animal heat exhaustion safeguards dairy revenue.',
            ur: 'جانوروں کو گرمی سے بچانا کسان کی روزانہ آمدنی برقرار رکھتا ہے۔',
            sd: 'مال جي حفاظت ڪرڻ سان کير جي روزاني آمدني بچي ٿي.',
          },
        },
      },
      exercises: [
        {
          id: 'agri_4_ex1',
          type: 'multiple_choice',
          question: {
            en: 'Why is it critical to keep dairy cows standing for 30 minutes after milking?',
            ur: 'دودھ دوہنے کے بعد گائے یا بھینس کو فوراً بیٹھنے سے روکنا کیوں ضروری ہے؟',
            sd: 'کير ڏهڻ کان پوءِ ۳۰ منٽ تائين جانور کي ويهڻ کان روڪڻ ڇو ضروري آهي؟',
          },
          options: [
            { id: 'm_open', text: { en: 'Because teat canals remain open for 30 minutes and ground bacteria can enter causing mastitis', ur: 'کیونکہ تھن کا منہ آدھے گھنٹے کھلا رہتا ہے اور نیچے کی گندگی سے ساڑو ہو سکتا ہے', sd: 'ڇو ته ٿڻن جو منهن اڌ ڪلاڪ کليل هوندو آهي ۽ مٽيءَ مان جراثيم اندر وڃي سگهن ٿا' } },
            { id: 'm_walk', text: { en: 'To make the animal digest faster', ur: 'صرف ہاضمہ بہتر کرنے کے لیے', sd: 'رڳو کاڌو هضم ڪرائڻ لاءِ' } },
          ],
          correctAnswer: 'm_open',
          explanation: {
            en: 'Correct! Giving green fodder right after milking keeps them standing while the teat canal closes safely.',
            ur: 'شاباش! چوائی کے فوراً بعد چارہ ڈالیں تاکہ وہ کھڑے کھڑے کھائیں اور تھن کا منہ بند ہو جائے۔',
            sd: 'بلڪل درست! ڏهڻ بعد گاهه وجهو ته جيئن مال بيٺو رهي ۽ ٿڻن جو منهن بند ٿي وڃي.',
          },
        },
      ],
    },
    {
      id: 'agri_5',
      subjectId: 'agriculture',
      chapterNumber: 4,
      lessonNumber: 5,
      level: 'advanced',
      title: {
        en: 'Lesson 5: Farm Economics & Interactive Crop Profit Calculator',
        ur: 'سبق ۵: زرعی معاشیات اور منافع کا انٹرایکٹو کیلکولیٹر',
        sd: 'سبق ۵: ٻنيءَ جي معيشيت ۽ منافعي جو لکت ۾ حساب',
      },
      topic: {
        en: 'Agri-Business & Profit Margin Accounting',
        ur: 'لاگت، پیداوار اور خالص منافع کا حساب',
        sd: 'خرچ، اپت ۽ پڪي منافعي جو حساب',
      },
      prerequisiteLessonId: 'agri_4',
      estimatedMinutes: 15,
      content: {
        visualEmoji: '💰',
        interactiveTool: 'farm_calculator',
        introduction: {
          en: 'Farming is a business. Too many farmers track total revenue without deducting seed, fertilizer, diesel, labor, and water charges. Use this real mathematical formula to find your TRUE net profit.',
          ur: 'کاشتکاری ایک مکمل کاروبار ہے۔ اکثر کسان صرف کل آمدنی دیکھتے ہیں اور بیج، کھاد، ڈیزل اور مزدوری کی لاگت نکالنا بھول جاتے ہیں۔ یہ کیلکولیٹر حقیقی خالص منافع کا حساب لگاتا ہے۔',
          sd: 'ٻني ٻارو هڪ ڪاروبار آهي. گهڻا هاري ڪل پئسا ڳڻيندا آهن پر ڀاڻ، ٻج، تيل ۽ مزدورن جو خرچ نٿا ڪٽين. هي فارمولو پڪو منافعو ٻڌائي ٿو.',
        },
        keyConcepts: [
          {
            title: {
              en: 'The Golden Farm Profit Equation',
              ur: 'منافع کا سنہری کلیہ',
              sd: 'منافعي جو سونهري اصول',
            },
            description: {
              en: 'Gross Revenue = Total Maunds × Price per Maund. Total Cost = Seed + Fertilizers + Water/Diesel + Pesticides + Labor + Thresher. Net Profit = Gross Revenue - Total Cost.',
              ur: 'کل آمدنی = کل من ضرب فی من قیمت۔ کل لاگت = بیج + کھاد + پانی/ڈیزل + اسپرے + مزدوری + تھریشر۔ خالص منافع = کل آمدنی منفی کل لاگت۔',
              sd: 'ڪل آمدني = ڪل مڻ × في مڻ اگھ. ڪل خرچ = ٻج + ڀاڻ + تيل + دوائون + مزوري. پڪو منافعو = ڪل آمدني مان ڪل خرچ ڪٽڻ.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: '5-Acre Wheat Crop Accounting Case',
            ur: '۵ ایکڑ گندم کی فصل کا عملی حساب کتاب',
            sd: '۵ ايڪڙ ڪڻڪ جو مڪمل حساب ڪتاب',
          },
          scenario: {
            en: 'Yield: 45 maunds/acre (225 maunds total). Market price: Rs 3,900/maund. Gross Revenue: Rs 877,500. Total Cost across 5 acres: Rs 460,000. Net Profit: Rs 417,500.',
            ur: 'پیداوار: ۴۵ من فی ایکڑ (کل ۲۲۵ من)۔ سرکاری نرخ: ۳,۹۰۰ فی من۔ کل آمدنی: ۸۷۷,۵۰۰۔ کل لاگت: ۴۶۰,۰۰۰ روپے۔ خالص منافع: ۴۱۷,۵۰۰ روپے بچے۔',
            sd: 'پيداوار: ۴۵ مڻ في ايڪڙ (ڪل ۲۲۵ مڻ). ريٽ: ۳,۹۰۰ رپيا. ڪل پئسا: ۸۷۷,۵۰۰ رپيا. ڪل خرچ: ۴۶۰,۰۰۰ رپيا. پڪو منافعو: ۴۱۷,۵۰۰ رپيا بچت.',
          },
          takeaway: {
            en: 'Knowing net profit lets you plan for the next planting season with confidence.',
            ur: 'خالص منافع کا درست علم کسان کو اگلی فصل کے لیے خود کفیل بناتا ہے۔',
            sd: 'پڪي منافعي جي خبر هجڻ سان ايندڙ فصل لاءِ پئسا آسانيءَ سان بچائي سگهجن ٿا.',
          },
        },
      },
      exercises: [
        {
          id: 'agri_5_ex1',
          type: 'multiple_choice',
          question: {
            en: 'If your 4-acre rice crop produces 200 maunds and sells for Rs 2,500/maund, while total expenses were Rs 300,000, what is your Net Profit?',
            ur: 'اگر ۴ ایکڑ سے ۲۰۰ من چاول ۲,۵۰۰ روپے فی من فروخت ہوں اور کل اخراجات ۳۰۰,۰۰۰ روپے آئیں تو آپ کا خالص منافع کتنا ہے؟',
            sd: 'جيڪڏهن ۴ ايڪڙن مان ۲۰۰ مڻ چانور ۲,۵۰۰ رپيا مڻ وڪامي ۽ ڪل خرچ ۳۰۰,۰۰۰ ٿئي ته پڪو منافعو ڪيترو ٿيو؟',
          },
          options: [
            { id: 'p200k', text: { en: 'Rs 200,000', ur: 'Rs 200,000', sd: 'Rs 200,000' } },
            { id: 'p500k', text: { en: 'Rs 500,000', ur: 'Rs 500,000', sd: 'Rs 500,000' } },
            { id: 'p100k', text: { en: 'Rs 100,000', ur: 'Rs 100,000', sd: 'Rs 100,000' } },
          ],
          correctAnswer: 'p200k',
          explanation: {
            en: 'Correct! Gross Revenue = 200 × 2,500 = Rs 500,000. Net Profit = 500,000 - 300,000 = Rs 200,000.',
            ur: 'شاباش! کل آمدنی ۵۰۰,۰۰۰ میں سے ۳۰۰,۰۰۰ لاگت نکالیں تو خالص منافع ۲۰۰,۰۰۰ روپے بچتا ہے۔',
            sd: 'بلڪل درست! ڪل ۵۰۰,۰۰۰ مان ۳۰۰,۰۰۰ خرچ ڪٽڻ تي ۲۰۰,۰۰۰ رپيا بچندا.',
          },
        },
      ],
    },
  ],
};

// ============================================================================
// 6. HEALTH, HYGIENE & SAFETY CURRICULUM
// Progression:
// Chapter 1 (Beginner): Personal Hygiene & Germ Theory
// Chapter 2 (Elementary): Waterborne Illnesses & ORS Preparation
// Chapter 3 (Intermediate): Clinical Triage (Fever, Malaria, Dengue)
// Chapter 4 (Advanced): Emergency First Aid (Snakebites, Bleeding) & Prescription Refusal
// ============================================================================
export const HEALTH_SUBJECT: SubjectCurriculum = {
  id: 'health',
  title: {
    en: 'Health, Hygiene & Emergency Safety',
    ur: 'صحت، صفائی اور بنیادی فرسٹ ایڈ',
    sd: 'صحت، صفائي ۽ طبي امداد',
  },
  description: {
    en: 'Life-saving protocols from personal hygiene and ORS preparation to snakebite first aid, emergency triage, and ethical medicine safety.',
    ur: 'جراثیم سے بچاؤ، نمکول کی تیاری، سانپ کاٹنے پر فرسٹ ایڈ اور دوا کے غلط استعمال سے انکار تک جان بچانے والی رہنمائی۔',
    sd: 'جراثيمن کان بچاءُ، نمڪول تيار ڪرڻ، نانگ چڪڻ تي طبي امداد ۽ دوائن جي حفاظت جا اصول.',
  },
  emoji: '🏥',
  tag: {
    en: 'Life-Saving Protocols',
    ur: 'جان بچانے والی طبی رہنمائی',
    sd: 'حياتي بچائيندڙ طبي اصول',
  },
  badgeBg: 'bg-rose-100 text-rose-900 border-rose-200',
  accentBorder: 'border-rose-300 hover:border-rose-500',
  gradient: 'from-rose-600 to-red-700',
  chapters: [
    {
      chapterNumber: 1,
      title: {
        en: 'Chapter 1: Hygiene & Germ Transmission',
        ur: 'باب ۱: ذاتی صفائی اور جراثیم کے پھیلاؤ کی روک تھام',
        sd: 'باب ۱: ذاتي صفائي ۽ بيمارين کان بچاءُ',
      },
      level: 'beginner',
      lessonIds: ['hlth_1'],
    },
    {
      chapterNumber: 2,
      title: {
        en: 'Chapter 2: Waterborne Illnesses & Dehydration Recovery',
        ur: 'باب ۲: آلودہ پانی کی بیماریاں اور پانی کی کمی (ڈی ہائیڈریشن) کا علاج',
        sd: 'باب ۲: گندي پاڻيءَ جون بيماريون ۽ پاڻيءَ جي کوٽ',
      },
      level: 'elementary',
      lessonIds: ['hlth_2'],
    },
    {
      chapterNumber: 3,
      title: {
        en: 'Chapter 3: Infection Triage (Fever, Malaria & Danger Signs)',
        ur: 'باب ۳: بخار، ملیریا، ڈینگی اور اسپتال جانے کی ہنگامی علامات',
        sd: 'باب ۳: تپ، مليريا ۽ اسپتال وڃڻ جا خطرا',
      },
      level: 'intermediate',
      lessonIds: ['hlth_3'],
    },
    {
      chapterNumber: 4,
      title: {
        en: 'Chapter 4: Emergency First Aid & Medication Safety',
        ur: 'باب ۴: ہنگامی فرسٹ ایڈ (سانپ کاٹنا، خون بہنا) اور دواؤں کے خطرات',
        sd: 'باب ۴: ايمرجنسي طبي امداد ۽ دوائن جا خطرا',
      },
      level: 'advanced',
      lessonIds: ['hlth_4', 'hlth_5'],
    },
  ],
  lessons: [
    {
      id: 'hlth_1',
      subjectId: 'health',
      chapterNumber: 1,
      lessonNumber: 1,
      level: 'beginner',
      title: {
        en: 'Lesson 1: Handwashing with Soap & Germ Theory',
        ur: 'سبق ۱: صابن سے ہاتھ دھونا اور جراثیم سے بچاؤ',
        sd: 'سبق ۱: صابڻ سان هٿ ڌوئڻ ۽ جراثيمن کان بچاءُ',
      },
      topic: {
        en: 'Infection Prevention & Cleanliness',
        ur: 'حفظان صحت کے بنیادی اصول',
        sd: 'صفائي ۽ صحت جا اصول',
      },
      learningObjectives: {
        en: [
          'Understand that invisible microbes (germs) cause diarrhea and respiratory infections',
          'Practice the 20-second soap lathering technique across palms, back of hands, and nails',
          'Identify critical handwashing moments (before cooking, before eating, after latrine)',
        ],
        ur: [
          'یہ جاننا کہ آنکھ سے نہ نظر آنے والے جراثیم بیماری پھیلاتے ہیں',
          'صابن کے ساتھ ۲۰ سیکنڈ تک ہاتھ، ناخن اور انگلیوں کو اچھی طرح دھونا',
          'ہاتھ دھونے کے لازمی اوقات (کھانا پکانے سے پہلے، کھانے سے پہلے، بیت الخلا کے بعد)',
        ],
        sd: [
          'اهو سمجهڻ ته اکين سان نه ڏسڻ وارا جراثيم بيماري پکيڙين ٿا',
          'صابڻ سان ۲۰ سيڪنڊن تائين چڱيءَ ريت هٿ ڌوئڻ',
          'کاڌو پچائڻ، کائڻ کان اڳ ۽ واش روم کان پوءِ هٿ ڌوئڻ جي عادت',
        ],
      },
      estimatedMinutes: 8,
      content: {
        visualEmoji: '🧼',
        introduction: {
          en: 'Germs are microscopic organisms living on unwashed hands, door handles, and soil. Rinsing with plain water does not remove oily germ membranes; soap is required to destroy them.',
          ur: 'جراثیم اتنے چھوٹے ہوتے ہیں کہ عام آنکھ سے نظر نہیں آتے۔ صرف سادہ پانی سے تیل اور جراثیم صاف نہیں ہوتے، صابن کا جھاگ ان کی جھلی پھاڑ کر بہا دیتا ہے۔',
          sd: 'جراثيم تمام ننڍا هوندا آهن جيڪي هٿن تي چنبڙي وڃن ٿا. رڳو پاڻيءَ سان جراثيم ختم ناهن ٿيندا، صابڻ لڳائڻ سان ئي مري وڃن ٿا.',
        },
        keyConcepts: [
          {
            title: {
              en: 'The 20-Second Rule',
              ur: '۲۰ سیکنڈ کا اصول',
              sd: '۲۰ سيڪنڊن جو اصول',
            },
            description: {
              en: 'Scrub palms, backs of hands, between fingers, and under fingernails for at least 20 seconds (the time it takes to recite Surah Ikhlas).',
              ur: 'ہتھیلیاں، انگلیوں کے درمیان، ناخن اور کلائیوں کو کم از کم ۲۰ سیکنڈ تک رگڑ کر دھوئیں۔',
              sd: 'هٿن جون کجين، آڱرين ۽ ننهن کي گهٽ ۾ گهٽ ۲۰ سيڪنڊ چڱيءَ طرح صابڻ لڳايو.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Stopping Family Diarrhea Outbreaks',
            ur: 'گھر میں ہیضے اور پیٹ درد کے حملے کی روک تھام',
            sd: 'گهر ۾ پيٽ جي بيمارين کان بچاءُ',
          },
          scenario: {
            en: 'A mother washing hands with soap before preparing infant milk cuts child diarrhea risk by over 45%.',
            ur: 'ماں اگر بچے کو دودھ پلانے سے قبل صابن سے ہاتھ دھوئے تو بچے میں دست اور الٹی کے خطرات ۴۵ فیصد کم ہو جاتے ہیں۔',
            sd: 'جيڪڏهن ماءُ ٻار کي کير ڏيڻ کان اڳ هٿ ڌوئي ته ٻار پيٽ جي بيمارين کان ۴۵ سيڪڙو بچي وڃي ٿو.',
          },
          takeaway: {
            en: 'Soap is the cheapest and most potent medicine on earth.',
            ur: 'صابن دنیا کی سب سے سستی اور طاقتور ترین دوا ہے۔',
            sd: 'صابڻ دنيا جي سڀ کان سستي ۽ اثرائتي دوا آهي.',
          },
        },
      },
      exercises: [
        {
          id: 'hlth_1_ex1',
          type: 'multiple_choice',
          question: {
            en: 'How long should you thoroughly scrub hands with soap and water to destroy disease-causing microbes?',
            ur: 'جراثیم ختم کرنے کے لیے صابن کے ساتھ ہاتھ کم از کم کتنی دیر رگڑ کر دھونے چاہییں؟',
            sd: 'جراثيم مارڻ لاءِ گهٽ ۾ گهٽ ڪيتري دير تائين هٿ صابڻ سان ڌوئڻ گهرجن؟',
          },
          options: [
            { id: 's20', text: { en: 'At least 20 seconds', ur: 'کم از کم ۲۰ سیکنڈ', sd: 'گهٽ ۾ گهٽ ۲۰ سيڪنڊ' } },
            { id: 's2', text: { en: 'Just 2 seconds', ur: 'صرف ۲ سیکنڈ', sd: 'رڳو ۲ سيڪنڊ' } },
            { id: 's5', text: { en: '5 seconds without soap', ur: 'بغیر صابن ۵ سیکنڈ', sd: 'صابڻ بنا ۵ سيڪنڊ' } },
          ],
          correctAnswer: 's20',
          explanation: {
            en: 'Correct! 20 seconds of thorough friction with soap breaks the lipid envelope of viruses and bacteria.',
            ur: 'شاباش! ۲۰ سیکنڈ تک صابن سے ہاتھ ملنے سے جراثیم کی جھلی ٹوٹ جاتی ہے۔',
            sd: 'بلڪل درست! ۲۰ سيڪنڊ تائين صابڻ سان مهٽڻ سان جراثيم ختم ٿين ٿا.',
          },
        },
      ],
    },
    {
      id: 'hlth_2',
      subjectId: 'health',
      chapterNumber: 2,
      lessonNumber: 2,
      level: 'elementary',
      title: {
        en: 'Lesson 2: Dehydration Signs & ORS (نمکول) Preparation',
        ur: 'سبق ۲: پانی کی کمی (ڈی ہائیڈریشن) کی علامات اور نمکول بنانا',
        sd: 'سبق ۲: پاڻيءَ جي کوٽ ۽ نمڪول تيار ڪرڻ جا طريقا',
      },
      topic: {
        en: 'Diarrhea Management & Oral Rehydration',
        ur: 'اسہال کا بروقت علاج اور او آر ایس',
        sd: 'دستن جو علاج ۽ نمڪول',
      },
      prerequisiteLessonId: 'hlth_1',
      estimatedMinutes: 10,
      content: {
        visualEmoji: '🥤',
        introduction: {
          en: 'Severe diarrhea does not kill from the stomach bug itself; it kills because the body loses water and vital salts. Immediate oral rehydration saves lives.',
          ur: 'اسہال یا الٹی میں انسان بیماری سے نہیں مرتا بلکہ جسم میں پانی اور نمکیات کے ختم ہو جانے سے جاں بحق ہوتا ہے۔ فوری نمکول دینا جان بچاتا ہے۔',
          sd: 'دستن يا الٽيءَ ۾ ماڻهو بيماريءَ کان نه بلڪه پاڻي ۽ لوڻ گهٽجڻ سان مري ويندو آهي. نمڪول ڏيڻ سان حياتي بچي ٿي.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Emergency Dehydration Signs',
              ur: 'پانی کی شدید کمی کی علامات',
              sd: 'پاڻيءَ جي کوٽ جون نشانيون',
            },
            description: {
              en: 'Sunken eyes, extreme thirst, dry tongue, pinched skin that snaps back slowly, and no urine for over 6 hours.',
              ur: 'آنکھیں اندر دھنس جانا، شدید پیاس، خشک زبان، جلد کھینچنے پر دیر سے واپس جانا اور ۶ گھنٹے تک پیشاب نہ آنا۔',
              sd: 'اکيون اندران ويهي وڃڻ، سڪل زبان، چمڙي ڇڪڻ تي واپس نه وڃڻ ۽ ۶ ڪلاڪن تائين پيشاب نه اچڻ.',
            },
          },
          {
            title: {
              en: 'Exact Homemade ORS Formula',
              ur: 'گھریلو نمکول کا مستند فارمولا',
              sd: 'گهر ۾ نمڪول ٺاهڻ جو فارمولو',
            },
            description: {
              en: '1 Liter of boiled, cooled water + 6 level teaspoons of Sugar + 1/2 level teaspoon of Salt. Stir until completely dissolved.',
              ur: '۱ لیٹر ابلا ہوا ٹھنڈا پانی + ۶ چمچ چینی + آدھا چمچ کھانے کا نمک۔ اچھی طرح گھول کر تھوڑا تھوڑا پلائیں۔',
              sd: '۱ ليٽر ٽهڪايل ٿڌو پاڻي + ۶ چمچا کنڊ + اڌ چمچو لوڻ. چڱيءَ ريت حل ڪري پيارجي.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Administering ORS to an Infant',
            ur: 'بچے کو نمکول پلانے کا طریقہ',
            sd: 'ٻار کي نمڪول پيارڻ جو طريقو',
          },
          scenario: {
            en: 'Do not force the child to drink a full glass at once (which induces vomiting). Give small sips with a teaspoon every 2 to 3 minutes.',
            ur: 'ایک دم پورا گلاس نہ پلائیں ورنہ قے ہو جائے گی۔ چمچ سے ہر دو سے تین منٹ بعد تھوڑا تھوڑا پلائیں۔',
            sd: 'هڪ ئي وقت پورو گلاس نه پياريو، هر ٻن منٽن بعد چمچي سان ٿورو ٿورو پياريندا رهو.',
          },
          takeaway: {
            en: 'Sip by sip, ORS replenishes lost electrolytes safely.',
            ur: 'چمچ چمچ نمکول جسم کو پانی کی کمی سے باہر لاتا ہے۔',
            sd: 'ٿورو ٿورو نمڪول پيارڻ سان جسم جي توانائي موٽي اچي ٿي.',
          },
        },
      },
      exercises: [
        {
          id: 'hlth_2_ex1',
          type: 'multiple_choice',
          question: {
            en: 'What is the correct ratio of sugar and salt for 1 Liter of clean boiled water to make homemade ORS?',
            ur: '۱ لیٹر صاف پانی میں گھر پر نمکول تیار کرنے کے لیے چینی اور نمک کا درست تناسب کیا ہے؟',
            sd: '۱ ليٽر پاڻيءَ ۾ گهر ۾ نمڪول تيار ڪرڻ لاءِ کنڊ ۽ لوڻ جو صحيح تناسب ڇا آهي؟',
          },
          options: [
            { id: 'ors_ok', text: { en: '6 level teaspoons Sugar + 1/2 teaspoon Salt', ur: '۶ چمچ چینی اور آدھا چمچ نمک', sd: '۶ چمچا کنڊ ۽ اڌ چمچو لوڻ' } },
            { id: 'ors_bad', text: { en: '6 teaspoons Salt + 1/2 teaspoon Sugar', ur: '۶ چمچ نمک اور آدھا چمچ چینی', sd: '۶ چمچا لوڻ ۽ اڌ چمچو کنڊ' } },
            { id: 'ors_zero', text: { en: 'Only plain tap water without sugar or salt', ur: 'صرف نلکے کا سادہ پانی', sd: 'رڳو نلڪي جو پاڻي' } },
          ],
          correctAnswer: 'ors_ok',
          explanation: {
            en: 'Correct! 6 teaspoons of sugar provides cellular energy while 1/2 teaspoon of salt restores sodium-potassium balance.',
            ur: 'شاباش! ۶ چمچ چینی توانائی دیتی ہے اور آدھا چمچ نمک جسمانی نمکیات بحال کرتا ہے۔',
            sd: 'بلڪل درست! ۶ چمچا کنڊ توانائي ڏئي ٿي ۽ اڌ چمچو لوڻ نمڪيات بحال ڪري ٿو.',
          },
        },
      ],
    },
    {
      id: 'hlth_3',
      subjectId: 'health',
      chapterNumber: 3,
      lessonNumber: 3,
      level: 'intermediate',
      title: {
        en: 'Lesson 3: Fever Triage (Malaria, Dengue & Danger Signs)',
        ur: 'سبق ۳: بخار، ملیریا، ڈینگی اور اسپتال جانے کی ہنگامی علامات',
        sd: 'سبق ۳: تپ، مليريا، ڊينگي ۽ اسپتال وڃڻ جون نشانيون',
      },
      topic: {
        en: 'Clinical Triage & Mosquito Protection',
        ur: 'بخار کی اقسام اور فوری ہسپتال ریفرل',
        sd: 'تپ جا قسم ۽ فوري اسپتال پهچڻ',
      },
      prerequisiteLessonId: 'hlth_2',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '🌡️',
        introduction: {
          en: 'Fever is your body fighting infection. However, high fever accompanied by danger signs requires urgent professional hospital diagnosis (BHU / RHC).',
          ur: 'بخار دراصل جسم کا بیماری کے خلاف دفاع ہے۔ لیکن اگر بخار کے ساتھ خطرے کی علامات ہوں تو بغیر تاخیر کے بنیادی مرکز صحت جانا چاہیے۔',
          sd: 'تپ جسم ۾ بيماريءَ خلاف جنگ جو نشان آهي. پر جيڪڏهن خطري جون نشانيون هجن ته فوري اسپتال پهچڻ لازمي آهي.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Emergency Red Flag Signs (Go to Hospital Immediately)',
              ur: 'اسپتال جانے کی فوری سرخ علامات',
              sd: 'فوري اسپتال وڃڻ جا خطرا',
            },
            description: {
              en: '1. Convulsions / fits (جھٹکے). 2. Inability to drink or breastfeed. 3. Bleeding from gums or nose (Dengue). 4. Extreme lethargy or unconsciousness. 5. Rapid chest indrawing breath.',
              ur: '۱۔ جھٹکے لگنا۔ ۲۔ بچہ ماں کا دودھ یا پانی نہ پی سکے۔ ۳۔ مسوڑھوں یا ناک سے خون آنا (ڈینگی)۔ ۴۔ بے ہوشی یا شدید غنودگی۔ ۵۔ پسلیاں چلنا (سانس میں دشواری)۔',
              sd: '۱. جهٽڪا لڳڻ. ۲. ٻار جو کير يا پاڻي نه پي سگهڻ. ۳. نڪ يا مهارن مان رت اچڻ. ۴. بيهوشي. ۵. ساهه کڻڻ وقت پاسيون اندر وڃڻ.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Tepid Sponging for High Child Fever',
            ur: 'شدید بخار میں بچے کی ٹھنڈی پٹیاں کرنا',
            sd: 'تيز تپ ۾ پٽيون ڪرڻ',
          },
          scenario: {
            en: 'Never use ice or freezing water (which causes violent shivering). Use clean room-temperature water with a soft cloth on the forehead, neck, and armpits.',
            ur: 'برف کا پانی ہرگز استعمال نہ کریں جس سے کپکپی طاری ہو جاتی ہے۔ نلکے کے عام پانی کی پٹیاں ماتھے، بغلوں اور گردن پر رکھیں۔',
            sd: 'برف جهڙو پاڻي نه ورتائجي. عام پاڻيءَ جون پٽيون نڙيءَ، ڪڇن ۽ مٿي تي رکجن.',
          },
          takeaway: {
            en: 'Tepid sponging lowers body heat safely while you travel to the clinic.',
            ur: 'معتدل پٹیاں اسپتال پہنچنے تک بچے کے دماغ کو تپش سے بچاتی ہیں۔',
            sd: 'پٽيون ٻار کي اسپتال پهچڻ تائين خطري کان بچائين ٿيون.',
          },
        },
      },
      exercises: [
        {
          id: 'hlth_3_ex1',
          type: 'multiple_choice',
          question: {
            en: 'Which of the following is a dangerous red-flag sign in a child with fever requiring IMMEDIATE emergency hospital care?',
            ur: 'بخار میں مبتلا بچے میں درج ذیل میں سے کون سی علامت دیکھ کر فوراً ایمرجنسی اسپتال بھاگنا چاہیے؟',
            sd: 'تپ واري ٻار ۾ هيٺين مان ڪهڙي نشاني ڏسندي ئي فوري ايمرجنسي اسپتال وڃڻ گهرجي؟',
          },
          options: [
            { id: 'f_conv', text: { en: 'Convulsions / Fits or inability to drink anything', ur: 'جھٹکے لگنا یا بچہ کچھ بھی پینے سے قاصر ہو', sd: 'جهٽڪا لڳڻ يا پاڻي پيئڻ کان لاچار هجڻ' } },
            { id: 'f_mild', text: { en: 'Mild warm forehead while playing actively', ur: 'کھیل کود کے دوران ہلکی گرمی', sd: 'راند روند دوران هلڪو گرم هجڻ' } },
          ],
          correctAnswer: 'f_conv',
          explanation: {
            en: 'Correct! Fits and inability to swallow are life-threatening signs of severe cerebral malaria, meningitis, or sepsis.',
            ur: 'شاباش! جھٹکے اور کچھ نہ پی سکنا جان لیوا علامات ہیں جن کے لیے فوری ڈاکٹر ضروری ہے۔',
            sd: 'بلڪل درست! جهٽڪا لڳڻ موتمار نشاني آهي جنهن لاءِ فوري ڊاڪٽر گهرجي.',
          },
        },
      ],
    },
    {
      id: 'hlth_4',
      subjectId: 'health',
      chapterNumber: 4,
      lessonNumber: 4,
      level: 'advanced',
      title: {
        en: 'Lesson 4: Snakebite First Aid & Severe Bleeding Protocol',
        ur: 'سبق ۴: سانپ کاٹنے پر ابتدائی طبی امداد اور شدید خون بہنے کا تدارک',
        sd: 'سبق ۴: نانگ چڪڻ ۽ رت وهي وڃڻ تي طبي امداد',
      },
      topic: {
        en: 'Trauma & Envenomation Protocol',
        ur: 'ہنگامی حادثات اور فرسٹ ایڈ',
        sd: 'حادثا ۽ هنگامي طبي امداد',
      },
      prerequisiteLessonId: 'hlth_3',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '🐍',
        interactiveTool: 'health_triage',
        introduction: {
          en: 'Snakebites (Krait, Cobra, Russell\'s Viper) are frequent during rice harvesting and monsoon floods. Common myths (cutting, sucking, tight tourniquets) cause gangrene and death. Learn the real WHO-certified protocol.',
          ur: 'چاول کی کٹائی اور سیلاب کے دوران سانپ کے کاٹنے کے واقعات کثرت سے ہوتے ہیں۔ کٹ لگانا، چوسنا یا سخت رسی باندھنا ٹانگ گلا کر موت کا سبب بنتا ہے۔ عالمی ادارہ صحت کا درست طریقہ سیکھیں۔',
          sd: 'سارين جي لڻائي ۽ ٻوڏ ۾ نانگ چڪڻ جا واقعا وڌي وڃن ٿا. چڪ واري جاءِ تي بليڊ هڻڻ يا رسي ٻڌڻ سان ٽنگ سڙي ويندي آهي. صحيح طبي طريقو سکو.',
        },
        keyConcepts: [
          {
            title: {
              en: 'DO NOT CUT, SUCK, OR TIE TOURNIQUET',
              ur: 'کٹ نہ لگائیں، نہ چوسیں، نہ سخت رسی باندھیں',
              sd: 'ڪڏهن به بليڊ نه هڻو، نه ئي رسي ٻڌو',
            },
            description: {
              en: 'Cutting introduces massive infection; tourniquets cause limb necrosis. Venom moves through lymphatic channels, not main arteries.',
              ur: 'بلیڈ لگانے سے خون کا زہر نہیں نکلتا بلکہ جراثیم پھیلتے ہیں۔ سخت رسی ٹانگ کو مردہ کر دیتی ہے۔',
              sd: 'بليڊ هڻڻ سان رت بند ناهي ٿيندو ۽ رڳ سڙي ويندي آهي.',
            },
          },
          {
            title: {
              en: 'The Life-Saving Protocol: IMMOBILIZE & TRANSPORT',
              ur: 'زندگی بچانے والا اصول: اعضاء بے حرکت رکھیں اور فوراً اسپتال پہنچائیں',
              sd: 'حياتي بچائڻ جو اصول: ٽنگ چوري نه ۽ فوري اسپتال پهچو',
            },
            description: {
              en: '1. Keep victim calm (panic accelerates heart rate and venom spread). 2. Immobilize bitten limb with a splint/stick. 3. Remove rings and anklets before swelling. 4. Rush to a hospital carrying Anti-Snake Venom (ASV).',
              ur: '۱۔ مریض کو پرسکون رکھیں (خوف سے دل تیز دھڑکتا ہے اور زہر جلدی پھیلتا ہے)۔ ۲۔ لکڑی کی کھپچی باندھ کر پاؤں کو بالکل بے حرکت رکھیں۔ ۳۔ انگوٹھی اور پازیب فوراً اتاریں۔ ۴۔ اینٹی سنیک وینم (ASV) والے اسپتال لے جائیں۔',
              sd: '۱. مريض کي آٿت ڏيو. ۲. لڪڙي ٻڌي چڪيل پير کي چرپر کان روڪيو. ۳. منڊي يا پڙو فوري لاھيو. ۴. سرڪاري اسپتال جتي ويڪسين هجي فوري پهچايو.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Severe Bleeding Control: DIRECT PRESSURE',
            ur: 'شدید خون بہنے کا علاج: براہ راست دباؤ',
            sd: 'رت وهي وڃڻ جو علاج: سڌو دٻاءُ',
          },
          scenario: {
            en: 'If a scythe cuts a worker\'s leg, press a clean thick cloth firmly over the wound with both hands. Maintain continuous pressure for 10 minutes without lifting to inspect.',
            ur: 'اگر درانتی سے گہرا کٹ لگ جائے تو صاف کپڑا رکھ کر دونوں ہاتھوں سے لگاتار ۱۰ منٹ تک زور سے دبائے رکھیں۔ کپڑا ہٹا کر بار بار نہ دیکھیں۔',
            sd: 'جيڪڏهن لڻائيءَ دوران وڍ پئجي وڃي ته صاف ڪپڙي سان زخم تي ٻنهي هٿن سان ۱۰ منٽ دٻاءُ رکو.',
          },
          takeaway: {
            en: 'Direct continuous pressure stops 95% of life-threatening hemorrhages.',
            ur: 'مسلسل دباؤ ۹۵ فیصد جان لیوا خون بہنے کو روک دیتا ہے۔',
            sd: 'مسلسل دٻاءُ ۹۵ سيڪڙو رت کي بند ڪري ڇڏي ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'hlth_4_ex1',
          type: 'multiple_choice',
          question: {
            en: 'If a farmer is bitten by a venomous snake in the field, what is the SINGLE MOST IMPORTANT immediate action?',
            ur: 'اگر کھیت میں کسی کو سانپ کاٹ لے تو سب سے پہلا اور اہم ترین اقدام کیا ہے؟',
            sd: 'جيڪڏهن ٻنيءَ ۾ ڪنهن کي نانگ چڪ هڻي ته سڀ کان اهم پهريون ڪم ڪهڙو آهي؟',
          },
          options: [
            { id: 'sb_immob', text: { en: 'Keep victim calm, immobilize the bitten limb with a splint, and transport immediately to a hospital with ASV', ur: 'مریض کو پرسکون رکھیں، لکڑی کی کھپچی سے پاؤں بے حرکت کریں اور فوراً ویکسین والے اسپتال لے جائیں', sd: 'مريض کي پرامن رکو، ٽنگ کي بيحرڪت رکو ۽ فوري اسپتال پهچايو' } },
            { id: 'sb_cut', text: { en: 'Cut the wound with a blade and suck the venom out with mouth', ur: 'زخم پر بلیڈ سے کٹ لگائیں اور منہ سے زہر چوسیں', sd: 'زخم تي بليڊ هڻي وات سان زهر ڇڪيو' } },
            { id: 'sb_rope', text: { en: 'Tie a wire or rope tightly until the limb turns black', ur: 'سخت رسی یا تار باندھیں یہاں تک کہ ٹانگ کالی پڑ جائے', sd: 'سخت تار يا رسي ٻڌو' } },
          ],
          correctAnswer: 'sb_immob',
          explanation: {
            en: 'Correct! Cutting and tourniquets kill tissue. Keeping the limb still and rushing to hospital for anti-snake venom saves life and limb.',
            ur: 'شاباش! کٹ لگانے اور رسی باندھنے سے بازو یا ٹانگ کاٹنی پڑ جاتی ہے۔ بے حرکت رکھ کر فوری اسپتال لے جانا ہی زندگی بچاتا ہے۔',
            sd: 'بلڪل درست! بليڊ هڻڻ نقصانڪار آهي. فوري اسپتال پهچڻ سان ئي جان بچي ٿي.',
          },
        },
      ],
    },
    {
      id: 'hlth_5',
      subjectId: 'health',
      chapterNumber: 4,
      lessonNumber: 5,
      level: 'advanced',
      title: {
        en: 'Lesson 5: Medication Safety & Refusal of Uncertified Prescriptions',
        ur: 'سبق ۵: ادویات کا محفوظ استعمال اور غیر مستند نسخہ جات سے انکار',
        sd: 'سبق ۵: دوائن جو محفوظ واهپو ۽ اناڙي نسخن کان انڪار',
      },
      topic: {
        en: 'Pharmacovigilance & Patient Safety',
        ur: 'ادویات کی احتیاط اور اینٹی بائیوٹک کا بے جا استعمال',
        sd: 'دوائن جي حفاظت ۽ بي جا گوريون نه واپرائڻ',
      },
      prerequisiteLessonId: 'hlth_4',
      estimatedMinutes: 12,
      content: {
        visualEmoji: '💊',
        introduction: {
          en: 'Taking antibiotics for simple viral colds or accepting arbitrary steroid injections from quacks damages kidneys and destroys immunity. Learn to demand certified medical prescriptions.',
          ur: 'عام نزلہ زکام میں اینٹی بائیوٹک یا غیر مستند اتائیوں سے طاقت کے ڈرپ اور انجکشن لگوانا گردے فیل کر دیتا ہے۔ صرف مستند ڈاکٹر کے نسخے پر دوا لینا ہی سلامتی ہے۔',
          sd: 'عام زڪام ۾ تيز دوائون کائڻ يا اناڙي ڊاڪٽرن کان ڊرپون هڻائڻ سان بڪيون فيل ٿي وڃن ٿيون. رڳو مستند ڊاڪٽر جي صلاح وٺو.',
        },
        keyConcepts: [
          {
            title: {
              en: 'Our Ethical Medical Policy',
              ur: 'ہمارا طبی اور اخلاقی اصول',
              sd: 'اسان جو طبي ۽ اخلاقي اصول',
            },
            description: {
              en: 'This educational platform NEVER prescribes dosages or tells you which pill to buy. Medicine doses depend on age, weight, liver, and kidney health and require an in-person doctor.',
              ur: 'یہ تعلیمی پورٹل کبھی بھی کسی دوا کی خوراک تجویز نہیں کرتا۔ دوا کی مقدار عمر، وزن اور معائنے پر منحصر ہے جو صرف مستند ڈاکٹر طے کر سکتا ہے۔',
              sd: 'هي پورٽل ڪڏهن به دوائن جو دوز تجويز نٿو ڪري. دوائن جي مقدار ڊاڪٽر جي چڪاس کان سواءِ وٺڻ خطرناڪ آهي.',
            },
          },
          {
            title: {
              en: 'Always Check Expiry Date (تاریخ تنسیخ)',
              ur: 'ہمیشہ دوا کی آخری تاریخ (Expiry Date) دیکھیں',
              sd: 'هميشه دوا جي آخري تاريخ (Expiry) چيڪ ڪريو',
            },
            description: {
              en: 'Expired medicines lose potency or degrade into toxic compounds. Always read the EXP date on the bottle or blister pack.',
              ur: 'میعاد ختم دوا یا تو اثر کھو دیتی ہے یا زہر بن جاتی ہے۔ شیشی یا پتے پر EXP تاریخ دیکھنا ہر شہری کا بنیادی حق ہے۔',
              sd: 'ختم ٿيل تاريخ واري دوا زهر بنجي سگهي ٿي. هميشه پتي تي EXP تاريخ ڏسي دوا وٺو.',
            },
          },
        ],
        practicalExample: {
          title: {
            en: 'Refusing Unnecessary Injections at Village Clinics',
            ur: 'دیہی کلینک پر غیر ضروری انجکشن سے انکار',
            sd: 'ڳوٺ ۾ اناڙين کان بي جا انجيڪشن نه لڳائڻ',
          },
          scenario: {
            en: 'Reused needles from unsterilized clinics spread Hepatitis B, Hepatitis C, and HIV. Demand a brand new, sealed syringe opened right before your eyes.',
            ur: 'پرانی اور غیر جراثیم سے پاک سوئیوں سے ہیپاٹائٹس بی، سی اور ایڈز پھیلتا ہے۔ ہمیشہ اپنی آنکھوں کے سامنے نیا سیل بند سرنج کھلوا کر استعمال کریں۔',
            sd: 'هڪ ئي سئي ٻين کي هڻڻ سان هيپاٽائيٽس (ڪارو سائي) ٿئي ٿو. هميشه نئين سرنج اکين سامهون کولرائي استعمال ڪريو.',
          },
          takeaway: {
            en: 'Your vigilance saves your family from chronic viral liver infections.',
            ur: 'آپ کی بیداری آپ کے خاندان کو کالا یرقان اور خطرناک بیماریوں سے بچاتی ہے۔',
            sd: 'توهان جو شعور خاندان کي موتمار بيمارين کان محفوظ رکي ٿو.',
          },
        },
      },
      exercises: [
        {
          id: 'hlth_5_ex1',
          type: 'multiple_choice',
          question: {
            en: 'What should you do if an uncertified person offers you unlabelled pills without a certified doctor prescription?',
            ur: 'اگر کوئی غیر مستند شخص آپ کو ڈاکٹر کے نسخے کے بغیر انجان گولیاں دے تو آپ کو کیا کرنا چاہیے؟',
            sd: 'جيڪڏهن ڪو غير مستند ماڻهو بنا نسخي جي اڻڄاتل دوائون ڏئي ته ڇا ڪرڻ گهرجي؟',
          },
          options: [
            { id: 'm_refuse', text: { en: 'Politely refuse and visit a registered medical doctor or government clinic (BHU)', ur: 'شائستگی سے انکار کریں اور قریبی بنیادی مرکز صحت یا مستند ڈاکٹر سے رجوع کریں', sd: 'انڪار ڪري ويجهي سرڪاري اسپتال يا مستند ڊاڪٽر ڏي وڃجي' } },
            { id: 'm_take', text: { en: 'Take the pills immediately hoping for a fast cure', ur: 'فوری فائدے کی امید میں گولیاں کھا لیں', sd: 'فوري کائي وٺجي' } },
          ],
          correctAnswer: 'm_refuse',
          explanation: {
            en: 'Correct! Self-medication and uncertified quack medicines cause severe kidney damage and drug resistance. Always consult certified doctors.',
            ur: 'شاباش! اتائیوں سے دوائیں لینا گردے فیل کر سکتا ہے۔ ہمیشہ مستند ڈاکٹر کی رہنمائی لیں۔',
            sd: 'بلڪل درست! اناڙي ماڻهن جون دوائون کائڻ سان بڪيون خراب ٿي سگهن ٿيون.',
          },
        },
      ],
    },
  ],
};

// ============================================================================
// ALL SUBJECTS REGISTRY
// ============================================================================
export const ALL_CURRICULUM_SUBJECTS: SubjectCurriculum[] = [
  LITERACY_SUBJECT,
  PHYSICS_SUBJECT,
  MATH_SUBJECT,
  CHEMISTRY_SUBJECT,
  AGRICULTURE_SUBJECT,
  HEALTH_SUBJECT,
];

export const SUBJECTS_MAP: Record<SubjectId, SubjectCurriculum> = {
  literacy: LITERACY_SUBJECT,
  physics: PHYSICS_SUBJECT,
  math: MATH_SUBJECT,
  chemistry: CHEMISTRY_SUBJECT,
  agriculture: AGRICULTURE_SUBJECT,
  health: HEALTH_SUBJECT,
};

export function getAllLessons(): Lesson[] {
  return ALL_CURRICULUM_SUBJECTS.flatMap((s) => s.lessons);
}

export function getLessonById(lessonId: string): Lesson | undefined {
  for (const s of ALL_CURRICULUM_SUBJECTS) {
    const found = s.lessons.find((l) => l.id === lessonId);
    if (found) return found;
  }
  return undefined;
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const current = getLessonById(currentLessonId);
  if (!current) return undefined;
  const subject = SUBJECTS_MAP[current.subjectId];
  if (!subject) return undefined;
  const idx = subject.lessons.findIndex((l) => l.id === currentLessonId);
  if (idx >= 0 && idx < subject.lessons.length - 1) {
    return subject.lessons[idx + 1];
  }
  return undefined;
}

export function getPreviousLesson(currentLessonId: string): Lesson | undefined {
  const current = getLessonById(currentLessonId);
  if (!current) return undefined;
  const subject = SUBJECTS_MAP[current.subjectId];
  if (!subject) return undefined;
  const idx = subject.lessons.findIndex((l) => l.id === currentLessonId);
  if (idx > 0) {
    return subject.lessons[idx - 1];
  }
  return undefined;
}
