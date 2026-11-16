export interface TracingLetter {
  char: string;
  nameUr: string;
  nameSd: string;
  nameEn: string;
  wordUr: string;
  wordSd: string;
  wordEn: string;
  emoji: string;
  soundUr: string;
  soundSd: string;
  soundEn: string;
}

export interface WordLesson {
  word: string;
  transliteration: string;
  meaningUr: string;
  meaningSd: string;
  meaningEn: string;
  emoji: string;
  exampleSentenceUr: string;
  exampleSentenceSd: string;
  exampleSentenceEn: string;
}

export interface ReadingSentenceLesson {
  titleUr: string;
  titleSd: string;
  titleEn: string;
  textUr: string;
  textSd: string;
  textEn: string;
  category: string;
}

// 1. LANGUAGES CURRICULUM
export const URDU_LETTERS: TracingLetter[] = [
  { char: 'ا', nameUr: 'الف', nameSd: 'الف', nameEn: 'Alif', wordUr: 'انار (Pomegranate)', wordSd: 'انب (Mango)', wordEn: 'Apple / Pomegranate', emoji: '🍎', soundUr: 'الف سے انار', soundSd: 'الف مان انب', soundEn: 'Alif starts Pomegranate' },
  { char: 'ب', nameUr: 'بے', nameSd: 'ٻ', nameEn: 'Bay', wordUr: 'بستہ (Schoolbag)', wordSd: 'ٻڪري (Goat)', wordEn: 'Bag / Goat', emoji: '🎒', soundUr: 'ب سے بستہ', soundSd: 'ٻ مان ٻڪري', soundEn: 'Bay starts Bag' },
  { char: 'ج', nameUr: 'جیم', nameSd: 'جيم', nameEn: 'Jeem', wordUr: 'جوتا (Shoes)', wordSd: 'جهول (Cradle)', wordEn: 'Shoes', emoji: '👞', soundUr: 'ج سے جوتا', soundSd: 'ج مان جهول', soundEn: 'Jeem starts Shoes' },
  { char: 'د', nameUr: 'دال', nameSd: 'دال', nameEn: 'Daal', wordUr: 'درخت (Tree)', wordSd: 'درياهه (River)', wordEn: 'Tree', emoji: '🌳', soundUr: 'د سے درخت', soundSd: 'د مان درياهه', soundEn: 'Daal starts Tree' },
  { char: 'ر', nameUr: 'رے', nameSd: 'ري', nameEn: 'Ray', wordUr: 'ریل گاڑی (Train)', wordSd: 'ريل (Train)', wordEn: 'Train', emoji: '🚂', soundUr: 'ر سے ریل گاڑی', soundSd: 'ر مان ريل', soundEn: 'Ray starts Train' },
  { char: 'س', nameUr: 'سین', nameSd: 'سين', nameEn: 'Seen', wordUr: 'سیب (Apple)', wordSd: 'سوف (Apple)', wordEn: 'Apple', emoji: '🍏', soundUr: 'س سے سیب', soundSd: 'س مان سوف', soundEn: 'Seen starts Apple' },
];

export const SINDHI_LETTERS: TracingLetter[] = [
  { char: 'ٻ', nameUr: 'ٻ (مخصوص سندھی ب)', nameSd: 'ٻ', nameEn: 'Sindhi Implosive B', wordUr: 'بکری (ٻڪري)', wordSd: 'ٻڪري (Goat)', wordEn: 'Goat', emoji: '🐐', soundUr: 'ٻ سے ٻڪري', soundSd: 'ٻ مان ٻڪري', soundEn: 'Sindhi Bay starts Bakri' },
  { char: 'ڄ', nameUr: 'ڄ (مخصوص سندھی ج)', nameSd: 'ڄ', nameEn: 'Sindhi Implosive J', wordUr: 'جامن (ڄامڻ)', wordSd: 'ڄامڻ (Berry/Jaman)', wordEn: 'Berry', emoji: '🍇', soundUr: 'ڄ سے ڄامڻ', soundSd: 'ڄ مان ڄامڻ', soundEn: 'Sindhi Jeem starts Jaman' },
  { char: 'ڳ', nameUr: 'ڳ (مخصوص سندھی گ)', nameSd: 'ڳ', nameEn: 'Sindhi Implosive G', wordUr: 'گائے (ڳئون)', wordSd: 'ڳئون (Cow)', wordEn: 'Cow', emoji: '🐄', soundUr: 'ڳ سے ڳئون', soundSd: 'ڳ مان ڳئون', soundEn: 'Sindhi Gaaf starts Gaoon' },
  { char: 'ڃ', nameUr: 'ڃ (سندھی نون)', nameSd: 'ڃ', nameEn: 'Sindhi Palatal N', wordUr: 'کنجی (چابی)', wordSd: 'ڪُڃي (Key)', wordEn: 'Key', emoji: '🔑', soundUr: 'ڃ سے ڪُڃي', soundSd: 'ڃ مان ڪُڃي', soundEn: 'Sindhi Nyaan starts Key' },
];

export const ENGLISH_LETTERS: TracingLetter[] = [
  { char: 'A', nameUr: 'اے', nameSd: 'اي', nameEn: 'A', wordUr: 'Apple (سیب)', wordSd: 'Apple (سوف)', wordEn: 'Apple', emoji: '🍎', soundUr: 'A is for Apple', soundSd: 'A is for Apple', soundEn: 'A is for Apple' },
  { char: 'B', nameUr: 'بی', nameSd: 'بي', nameEn: 'B', wordUr: 'Bag (بستہ)', wordSd: 'Bag (ٿيلهو)', wordEn: 'Bag', emoji: '🎒', soundUr: 'B is for Bag', soundSd: 'B is for Bag', soundEn: 'B is for Bag' },
  { char: 'C', nameUr: 'سی', nameSd: 'سي', nameEn: 'C', wordUr: 'Cat (بلی)', wordSd: 'Cat (ٻلي)', wordEn: 'Cat', emoji: '🐱', soundUr: 'C is for Cat', soundSd: 'C is for Cat', soundEn: 'C is for Cat' },
  { char: 'D', nameUr: 'ڈی', nameSd: 'ڊي', nameEn: 'D', wordUr: 'Doctor (ڈاکٹر)', wordSd: 'Doctor (ڊاڪٽر)', wordEn: 'Doctor', emoji: '🩺', soundUr: 'D is for Doctor', soundSd: 'D is for Doctor', soundEn: 'D is for Doctor' },
  { char: 'W', nameUr: 'ڈبلیو', nameSd: 'ڊبليو', nameEn: 'W', wordUr: 'Water (پانی)', wordSd: 'Water (پاڻي)', wordEn: 'Water', emoji: '💧', soundUr: 'W is for Water', soundSd: 'W is for Water', soundEn: 'W is for Water' },
];

export const MEDIUM_WORDS: WordLesson[] = [
  { word: 'آب / پاڻي', transliteration: 'Paani', meaningUr: 'پینے کا پانی', meaningSd: 'پيئڻ جو پاڻي', meaningEn: 'Drinking Water', emoji: '💧', exampleSentenceUr: 'صاف پانی پینا صحت کے لیے ضروری ہے۔', exampleSentenceSd: 'صاف پاڻي پيئڻ صحت لاءِ لازمي آهي.', exampleSentenceEn: 'Drinking clean water is vital for health.' },
  { word: 'فصل / ٻني', transliteration: 'Fasal', meaningUr: 'کھیت کی پیداوار', meaningSd: 'ٻني جي پيداوار', meaningEn: 'Crop / Harvest', emoji: '🌾', exampleSentenceUr: 'دھان کی فصل پک کر تیار ہو چکی ہے۔', exampleSentenceSd: 'چانورن جي فصل تيار ٿي وئي آهي.', exampleSentenceEn: 'The rice crop is ready for harvest.' },
  { word: 'اسپتال / علاج', transliteration: 'Hospital', meaningUr: 'مرکز صحت', meaningSd: 'طبي مرڪز', meaningEn: 'Hospital / Clinic', emoji: '🏥', exampleSentenceUr: 'بیماری میں فورا بنیادی مرکز صحت جائیں۔', exampleSentenceSd: 'بيماري ۾ فوري طور اسپتال پهچو.', exampleSentenceEn: 'Visit the primary health clinic when unwell.' },
  { word: 'بازار / حساب', transliteration: 'Bazaar', meaningUr: 'مارکیٹ و خرید و فروخت', meaningSd: 'مارڪيٽ ۽ خريداري', meaningEn: 'Marketplace', emoji: '🏪', exampleSentenceUr: 'خریداری کے بعد ہمیشہ بقایا پیسے گنیں۔', exampleSentenceSd: 'خريداري کان پوءِ هميشه بقايا پئسا ڳڻيو.', exampleSentenceEn: 'Always count your remaining change.' },
];

export const HARD_READINGS: ReadingSentenceLesson[] = [
  {
    titleUr: 'زرعی حفاظت: اسپرے اور کیمیکل کے اصول',
    titleSd: 'زرعي حفاظت: دوائن جي ڇٽڪار جا اصول',
    titleEn: 'Agricultural Safety: Agrochemical Rules',
    textUr: 'فصل پر زہر چھڑکتے وقت منہ پر ماسک اور ہاتھوں پر دستانے پہنیں۔ ہوا کے مخالف سمت میں ہرگز اسپرے نہ کریں۔ خالی کیمیکل کے ڈبے پانی یا دودھ کے لیے استعمال کرنا سخت جان لیوا ہے۔',
    textSd: 'فصل تي زهر ڇٽڻ وقت منهن تي نقاب ۽ هٿن ۾ دستانا هجن. هوا جي سامهون ڇٽڪار نه ڪريو. خالي دٻا کير يا پاڻي لاءِ ڪم آڻڻ سخت خطرناڪ آهي.',
    textEn: 'Always wear a mask and gloves when spraying crops. Never spray against the wind. Reusing chemical containers for water or milk is strictly hazardous.',
    category: 'Safety Signage',
  },
  {
    titleUr: 'دیہی معیشت: بچت اور حساب کتاب',
    titleSd: 'ڳوٺاڻي معيشيت: بچت ۽ حساب ڪتاب',
    titleEn: 'Rural Economy: Financial Bookkeeping',
    textUr: 'ہر کسان اور گھریلو خاتون کو یومیہ اخراجات اور آمدنی تحریری طور پر نوٹ کرنی چاہیے۔ بیج اور کھاد کی خریداری پر رسید لیں تاکہ منافع اور لاگت کا درست تخمینہ لگایا جا سکے۔',
    textSd: 'هر هاري ۽ گهرواريءَ کي روزانو خرچ ۽ آمدني رڪارڊ ۾ رکڻ گهرجي. ڀاڻ ۽ ٻج جي رسيد وٺو ته جيئن منافعي جو پورو حساب ملي سگهي.',
    textEn: 'Every farmer and homemaker should maintain a daily ledger of expenses. Keep receipts for seed and fertilizer to calculate real net profit.',
    category: 'Economics & Literacy',
  },
];
