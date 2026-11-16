import 'language_manager.dart';

class AppStrings {
  static const Map<String, Map<String, String>> _localizedValues = {
    'ur': {
      'appTitle': 'تعلیم سے ترقی',
      'tagline': 'ہر گھر میں اے آئی استاد، ہر نسل کے لیے علم',
      'hello': 'خوش آمدید! آئیے سیکھنا شروع کریں۔',
      'selectLanguage': 'اپنی زبان منتخب کریں',
      'startLearning': 'سیکھنا شروع کریں',
      'listenPrompt': 'آواز سننے کے لیے سپیکر پر ٹیپ کریں',
      'offlineMode': 'آف لائن سبق موڈ',
      'liveAiMode': 'لائیو اے آئی استاد',
      'emergencyHelp': 'ہنگامی مدد',
    },
    'sd': {
      'appTitle': 'تعليم مان ترقي',
      'tagline': 'هر گھر ۾ اي آءِ استاد، هر نسل لاءِ علم',
      'hello': 'ڀلي ڪري آيا! اچو سکڻ شروع ڪريون.',
      'selectLanguage': 'پنهنجي ٻولي چونڊيو',
      'startLearning': 'سکڻ شروع ڪريو',
      'listenPrompt': 'آواز ٻڌڻ لاءِ اسپيڪر تي ٽيپ ڪريو',
      'offlineMode': 'آف لائن سبق موڊ',
      'liveAiMode': 'لائيو اي آءِ مددگار',
      'emergencyHelp': 'ايمرجنسي مدد',
    },
    'en': {
      'appTitle': 'Taleem Se Taraqqi',
      'tagline': 'An AI Teacher in Every Home, Knowledge for Every Generation',
      'hello': 'Hello! Welcome to learning.',
      'selectLanguage': 'Select your language',
      'startLearning': 'Start Learning',
      'listenPrompt': 'Tap the speaker to listen',
      'offlineMode': 'Offline Mode',
      'liveAiMode': 'Live AI Helper',
      'emergencyHelp': 'Emergency Help',
    },
    'pa': {
      'appTitle': 'تعلیم توں ترقی',
      'tagline': 'ہر گھر وچ اے آئی استاد، ہر نسل لئی علم',
      'hello': 'جی آیاں نوں! آؤ سکھنا شروع کریے۔',
      'selectLanguage': 'اپنی بولی چنو',
      'startLearning': 'سکھنا شروع کرو',
      'listenPrompt': 'آواز سنن لئی سپیکر تے ٹیپ کرو',
      'offlineMode': 'آف لائن سبق موڈ',
      'liveAiMode': 'لائیو اے آئی استاد',
      'emergencyHelp': 'ہنگامی مدد',
    },
    'ps': {
      'appTitle': 'له زده کړې تر پرمختګه',
      'tagline': 'په هر کور کې د AI ښوونکی، د هر نسل لپاره پوهه',
      'hello': 'ښه راغلاست! راځئ چې زده کړه پیل کړو.',
      'selectLanguage': 'خپله ژبه وټاکئ',
      'startLearning': 'زده کړه پیل کړئ',
      'listenPrompt': 'د غږ اوریدو لپاره په سپیکر ټایپ کړئ',
      'offlineMode': 'آفلاین درس حالت',
      'liveAiMode': 'ژوندی د AI ښوونکی',
      'emergencyHelp': 'بیړنۍ مرسته',
    },
    'bal': {
      'appTitle': 'تعلیم چہ دیمروی',
      'tagline': 'ہر لوگ ءَ یک اے آئی استاد، ہر پدریچ ءَ زانت',
      'hello': 'وش آتک ئے! بیا دربرگ ءَ بندات کن ایں.',
      'selectLanguage': 'وتی زبان ءَ گچین کن',
      'startLearning': 'دربرگ بندات کن',
      'listenPrompt': 'تواری گوشدارگ ءَ سپیکر ءَ بجن',
      'offlineMode': 'آف لائن سبق موڈ',
      'liveAiMode': 'لائیو اے آئی مددگار',
      'emergencyHelp': 'ہنگامی مدت',
    },
  };

  static String get(String key, AppLanguage language) {
    final langMap = _localizedValues[language.code] ?? _localizedValues['ur']!;
    return langMap[key] ?? key;
  }
}
