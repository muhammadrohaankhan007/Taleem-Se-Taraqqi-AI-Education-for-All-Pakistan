export interface TutorChip {
  id: string;
  labelUr: string;
  labelSd: string;
  labelEn: string;
  query: string;
  icon: string;
}

export const TUTOR_CHIPS: TutorChip[] = [
  {
    id: 'reading',
    labelUr: 'حروف اور صوتیات',
    labelSd: 'اکر ۽ آواز',
    labelEn: 'Letters & Sounds',
    query: 'مجھے حرف الف اور ب کی مشق کروائیں',
    icon: '📖',
  },
  {
    id: 'math',
    labelUr: '100 روپے کا حساب',
    labelSd: '100 رپين جو حساب',
    labelEn: '100 PKR Change Math',
    query: '100 روپے میں سے 35 روپے خرچ کیے، کتنے بچے؟',
    icon: '💰',
  },
  {
    id: 'rice',
    labelUr: 'دھان کا پانی اور کھاد',
    labelSd: 'چانورن جو پاڻي ۽ ڀاڻ',
    labelEn: 'Rice Crop Water Timing',
    query: 'دھان کی فصل میں پنیری لگانے کے بعد پانی کب دینا ہے؟',
    icon: '🌾',
  },
  {
    id: 'livestock',
    labelUr: 'بکریوں کی ویکسین',
    labelSd: 'ٻڪرين جي ويڪسين',
    labelEn: 'Livestock Vaccine Guide',
    query: 'بھیڑ بکریوں کو موسمی بیماریوں سے کیسے بچائیں؟',
    icon: '🐐',
  },
  {
    id: 'ors',
    labelUr: 'نمکول بنانے کا طریقہ',
    labelSd: 'نمڪول ٺاهڻ جو طريقو',
    labelEn: 'ORS Prep at Home',
    query: 'گھر پر نمکول (او آر ایس) کیسے تیار کرتے ہیں؟',
    icon: '💧',
  },
];

export interface TutorQA {
  keywords: string[];
  replyUr: string;
  replySd: string;
  replyEn: string;
}

export const TUTOR_KNOWLEDGE: TutorQA[] = [
  {
    keywords: ['الف', 'حرف', 'پڑھنا', 'کتاب', 'اکر', 'پڙهڻ', 'read', 'letter'],
    replyUr:
      'بہت خوب! آئیے ایک ساتھ پڑھتے ہیں۔ حرف "الف" سے "انار" 🍎 اور حرف "ب" سے "بستہ" 🎒 بنتا ہے۔ روزانہ صرف 10 منٹ انگلی سے ٹریسنگ اور دہرائی کرنے سے آپ کی پڑھائی تیزی سے بہتر ہوگی!',
    replySd:
      'تمام سٺو! اچو گڏجي پڙهون. سنڌي اکر "الف" مان "انب" 🥭 ۽ "ٻ" مان "ٻڪري" 🐐 ٺهي ٿي. روزانو 10 منٽ آڱر سان اکر لکڻ سان پڙهڻ بلڪل سولو ٿي ويندو!',
    replyEn:
      'Great! Let’s learn together. The letter "Alif" starts "Pomegranate" 🍎 and "Bay" starts "Schoolbag" 🎒. Practicing tracing for 10 minutes daily will build rapid fluency!',
  },
  {
    keywords: ['100', 'روپے', 'حساب', 'پیسے', 'خرچ', 'باقی', 'math', 'money', 'ڳڻپ'],
    replyUr:
      'آئیے بازار کا حساب کرتے ہیں: اگر آپ کے پاس 100 روپے ہوں اور آپ 35 روپے کی دال یا نمک خریدیں، تو (100 - 35 = 65) روپے بقایا ملیں گے۔ ہمیشہ خریداری سے پہلے بقایا پیسے خود گنیں!',
    replySd:
      'اچو بازار جو حساب ڪريون: جيڪڏهن وٽان 100 رپيا هجن ۽ 35 رپين جو سامان وٺو، ته دڪاندار اوهان کي (100 - 35 = 65) رپيا واپس ڪندو. هميشه بقايا پئسا پاڻ ڳڻيو!',
    replyEn:
      'Let’s do marketplace math: If you give a 100 PKR note and buy 35 PKR of groceries, your change is (100 - 35 = 65) PKR. Always count your change before leaving the counter!',
  },
  {
    keywords: ['دھان', 'چاول', 'پانی', 'کھاد', 'فصل', 'چانور', 'پوک', 'rice', 'crop'],
    replyUr:
      'دھان (چاول) کی کاشت میں پنیری منتقل کرنے کے بعد ابتدائی 25 سے 30 دنوں تک کھیت میں 2 سے 3 انچ پانی کھڑا رہنا ضروری ہے تاکہ جڑی بوٹیاں نہ اگیں۔ کھاد کی خوراک صبح یا شام کے وقت لگائیں۔',
    replySd:
      'چانورن جي پوک ۾ پنيری هڻڻ کان پوءِ شروعاتي 25 کان 30 ڏينهن پاڻي 2 کان 3 انچ بيٺل هئڻ گهرجي ته جيئن گند گاهه مري وڃي. نائٽروجن ڀاڻ جو استعمال ٻن کان ٽن قسطن ۾ ڪريو.',
    replyEn:
      'In rice farming, maintain 2 to 3 inches of standing water for the first 25 to 30 days after transplanting to suppress weed emergence. Split fertilizer applications evenly between morning or evening.',
  },
  {
    keywords: ['بکری', 'بھینس', 'جانور', 'ویکسین', 'منہ کھر', 'ٻڪري', 'ڍڳي', 'goat', 'animal', 'vet'],
    replyUr:
      'مویشیوں کو منہ کھر اور گل گھوٹو جیسی بیماریوں سے بچانے کے لیے ہر سال دو بار حفاظتی ویکسین کروائیں۔ اگر جانور سست ہو یا چارہ کھانا چھوڑ دے تو مقامی ویٹرنری فیلڈ عملے سے رجوع کریں۔',
    replySd:
      'ٻڪرين ۽ ڍڳين کي منهن کُر ۽ گلگهوٽو جي خطرناڪ بيمارين کان بچائڻ لاءِ سال ۾ ٻه ڀيرا حفاظتي ٽڪا لازمي لڳرايو. بيمار جانور کي ٻين کان ڌار رکو.',
    replyEn:
      'Vaccinate sheep, goats, and cattle twice annually against Foot-and-Mouth Disease and Hemorrhagic Septicemia. Isolate unwell animals and notify the district livestock assistant.',
  },
  {
    keywords: ['نمکول', 'او آر ایس', 'دست', 'اسہال', 'پانی', 'ors', 'dehydration'],
    replyUr:
      'گھریلو نمکول (ORS) بنانے کا آسان نسخہ: 4 گلاس (ایک لیٹر) ابلا ہوا ٹھنڈا پانی لیں، اس میں 6 چھوٹے چمچ چینی اور آدھا چھوٹا چمچ نمک اچھی طرح حل کریں۔ اسہال میں مریض کو ہر ایک گھنٹے بعد پلائیں۔',
    replySd:
      'گھرو نمڪول (ORS) ٺاهڻ جو سولو طريقو: 4 گلاس (هڪ ليٽر) اُٻريل ٿڌو پاڻي کڻو، ان ۾ 6 ننڍا چمچا کنڊ ۽ اڌ ننڍو چمچو کاڌي جو لوڻ ملائي حل ڪريو. دستن دوران مريض کي ٿورو ٿورو ڪري پيئاريو.',
    replyEn:
      'Home ORS recipe: Take 4 cups (1 liter) of clean boiled drinking water, add 6 level teaspoons of sugar and half a teaspoon of salt. Stir well and administer frequently in small sips during dehydration.',
  },
];
