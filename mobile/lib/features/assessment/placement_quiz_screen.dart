import 'package:flutter/material.dart';
import '../../core/i18n/language_manager.dart';
import '../../core/audio/tts_service.dart';
import '../../core/models/learner_profile.dart';
import '../../core/storage/local_storage_service.dart';
import '../learning/home_learning_screen.dart';
import '../common/prototype_limits_sheet.dart';

class PlacementQuizScreen extends StatefulWidget {
  final LearnerProfile profile;
  final AppLanguage language;

  const PlacementQuizScreen({
    super.key,
    required this.profile,
    required this.language,
  });

  @override
  State<PlacementQuizScreen> createState() => _PlacementQuizScreenState();
}

class _PlacementQuizScreenState extends State<PlacementQuizScreen> {
  final TtsService _tts = TtsService();
  int _currentIndex = 0;
  int _score = 0;
  bool _quizFinished = false;
  String? _selectedOption;

  final List<Map<String, dynamic>> _questions = [
    {
      'question_ur': 'اس تصویر میں کیا ہے؟ تصویر دیکھ کر صحیح نام چنیں۔',
      'question_sd': 'هن تصوير ۾ ڇا آهي؟ تصوير ڏسي صحيح نالو چونڊيو.',
      'question_en': 'What is in this picture? Choose the correct option.',
      'emoji': '📖',
      'options_ur': ['کتاب (Book)', 'سیب (Apple)', 'گاڑی (Car)'],
      'options_sd': ['ڪتاب (Book)', 'سوف (Apple)', 'گاڏي (Car)'],
      'options_en': ['Book', 'Apple', 'Car'],
      'correct_index': 0,
    },
    {
      'question_ur': 'حرف "الف" کی آواز سے کیا بنتا ہے؟',
      'question_sd': 'اکر "الف" جي آواز سان ڇا ٺهي ٿو؟',
      'question_en': 'Which object starts with the letter sound "Alif"?',
      'emoji': '🍎',
      'options_ur': ['انار (Pomegranate)', 'بلی (Cat)', 'درخت (Tree)'],
      'options_sd': ['انب / ڏاڙھون (Pomegranate)', 'ٻلي (Cat)', 'وڻ (Tree)'],
      'options_en': ['Pomegranate', 'Cat', 'Tree'],
      'correct_index': 0,
    },
    {
      'question_ur': 'یہ کتنے پرندے ہیں؟ گن کر صحیح عدد منتخب کریں۔ 🐦 🐦 🐦',
      'question_sd': 'هي ڪيترا پکي آهن؟ ڳڻي صحيح نمبر چونڊيو. 🐦 🐦 🐦',
      'question_en': 'How many birds are here? Count and select: 🐦 🐦 🐦',
      'emoji': '🐦 🐦 🐦',
      'options_ur': ['2 (دو)', '3 (تین)', '5 (پانچ)'],
      'options_sd': ['2 (ٻه)', '3 (ٽي)', '5 (پنج)'],
      'options_en': ['2 (Two)', '3 (Three)', '5 (Five)'],
      'correct_index': 1,
    },
    {
      'question_ur': 'حرف "ب" کی پہچان کریں۔',
      'question_sd': 'سنڌي اکر "ٻ" (ٻڪري) جي سڃاڻپ ڪريو:',
      'question_en': 'Identify the letter "B":',
      'emoji': '🐐',
      'options_ur': ['ب (B)', 'ت (T)', 'ج (J)'],
      'options_sd': ['ٻ (Sindhi B)', 'پ (P)', 'ٽ (Sindhi T)'],
      'options_en': ['B', 'T', 'J'],
      'correct_index': 0,
    },
    {
      'question_ur': 'حساب کریں: 5 میں سے 2 نکالیں تو کتنے بچیں گے؟ (5 - 2 = ?)',
      'question_sd': 'حساب ڪريو: 5 مان 2 ڪڍو ته ڪيترا بچندا؟ (5 - 2 = ?)',
      'question_en': 'Basic Math: 5 minus 2 equals what? (5 - 2 = ?)',
      'emoji': '🖐️ - ✌️',
      'options_ur': ['2', '3', '7'],
      'options_sd': ['2', '3', '7'],
      'options_en': ['2', '3', '7'],
      'correct_index': 1,
    },
    {
      'question_ur': 'اگر فصل یا پودے پر کیڑا نظر آئے تو محفوظ طریقہ کیا ہے؟',
      'question_sd': 'جيڪڏهن فصل تي جيت لڳي ته محفوظ طريقو ڪهڙو آهي؟',
      'question_en': 'If pests attack your crop, what is the safest first step?',
      'emoji': '🌾',
      'options_ur': ['زرعی ماہر سے رہنمائی لینا', 'بغیر پوچھے سخت زہر ڈالنا', 'پانی بند کر دینا'],
      'options_sd': ['زرعي ماهر کان صلاح وٺڻ', 'بغير پڇڻ جي تيز زهر ڏيڻ', 'پاڻي بند ڪرڻ'],
      'options_en': ['Consult agriculture facilitator', 'Spray unlabeled chemicals', 'Ignore it'],
      'correct_index': 0,
    },
    {
      'question_ur': 'طبی ہنگامی صورتحال (جیسے سانپ کاٹنا یا سینے کا درد) میں کیا کریں؟',
      'question_sd': 'طبي ايمرجنسي (جهڙوڪ نانگ جو چڪ) ۾ ڇا ڪرڻ گهرجي؟',
      'question_en': 'In a medical emergency (snakebite or chest pain), what is vital?',
      'emoji': '🚑',
      'options_ur': ['فوری 1122 ایمرجنسی اسپتال جانا', 'گھریلو ٹوٹکے آزماتے رہنا', 'مریض کو دوڑانا'],
      'options_sd': ['فوري 1122 ايمرجنسي اسپتال پهچڻ', 'گھريلو ٽوٽڪا آزمائڻ', 'مريض کي ڊوڙائڻ'],
      'options_en': ['Call 1122 / reach hospital immediately', 'Try unverified home remedies', 'Wait it out'],
      'correct_index': 0,
    },
    {
      'question_ur': 'حساب: 10 + 20 برابر ہے؟',
      'question_sd': 'حساب: 10 + 20 ڪيترا ٿيندا؟',
      'question_en': 'Math: 10 + 20 equals?',
      'emoji': '🪙',
      'options_ur': ['25', '30', '40'],
      'options_sd': ['25', '30', '40'],
      'options_en': ['25', '30', '40'],
      'correct_index': 1,
    },
  ];

  @override
  void initState() {
    super.initState();
    _playQuestionAudio();
  }

  void _playQuestionAudio() {
    final q = _questions[_currentIndex];
    final langCode = widget.language.code;
    String text = q['question_en'];
    if (langCode == 'ur') text = q['question_ur'];
    if (langCode == 'sd') text = q['question_sd'];
    _tts.speak(text, langCode);
  }

  void _handleOptionSelect(int index) {
    setState(() {
      _selectedOption = index.toString();
    });
  }

  void _submitAnswer() {
    if (_selectedOption == null) return;
    final selectedIdx = int.parse(_selectedOption!);
    final correctIdx = _questions[_currentIndex]['correct_index'] as int;

    if (selectedIdx == correctIdx) {
      _score++;
    }

    if (_currentIndex < _questions.length - 1) {
      setState(() {
        _currentIndex++;
        _selectedOption = null;
      });
      _playQuestionAudio();
    } else {
      _finishQuiz();
    }
  }

  Future<void> _finishQuiz() async {
    String assignedLevel;
    String suggestedPathway;

    if (_score <= 3) {
      assignedLevel = 'Level 0: Foundation Non-Reader';
      suggestedPathway = widget.language == AppLanguage.sindhi
          ? 'سنڌي بنيادي اکر ۽ آواز (Letters & Sounds)'
          : 'بنیادی حروف شناسی و صوتیات (Letters & Sounds)';
    } else if (_score <= 6) {
      assignedLevel = 'Level 1: Emergent Practical';
      suggestedPathway = widget.language == AppLanguage.sindhi
          ? 'بنيادي حساب ۽ چانورن جي پوک (Numeracy & Farming)'
          : 'بنیادی ریاضی اور زراعت (Numeracy & Farming)';
    } else {
      assignedLevel = 'Level 2: Applied Lifeskills';
      suggestedPathway = widget.language == AppLanguage.sindhi
          ? 'مال مويشي ۽ گھر جي صحت (Livestock & Health)'
          : 'مال مویشی، صحت اور حساب داری (Livestock & Health)';
    }

    final updated = widget.profile.copyWith(
      literacyLevel: assignedLevel,
      suggestedPathway: suggestedPathway,
      progressStars: widget.profile.progressStars + _score,
    );

    await LocalStorageService.updateProfile(updated);

    setState(() {
      _quizFinished = true;
    });

    _tts.speak(
      widget.language == AppLanguage.sindhi
          ? 'شاباس! جائزو مڪمل ٿيو. توهان جي ليول مقرر ڪئي وئي آهي.'
          : 'شاباش! جائزہ مکمل ہو گیا۔ آپ کی سطح مقرر کر دی گئی ہے۔',
      widget.language.code,
    );
  }

  @override
  Widget build(BuildContext context) {
    final lang = widget.language;
    final textDirection = lang.direction;
    final fontFamily = lang == AppLanguage.sindhi || lang == AppLanguage.urdu
        ? 'NotoNaskhArabic'
        : 'Roboto';

    return Directionality(
      textDirection: textDirection,
      child: Scaffold(
        backgroundColor: const Color(0xFFF7FAF7),
        appBar: AppBar(
          backgroundColor: const Color(0xFF1B5E20),
          foregroundColor: Colors.white,
          title: Text(
            lang == AppLanguage.sindhi
                ? 'مهارت جو مختصر جائزو (Quiz)'
                : (lang == AppLanguage.urdu ? 'مہارت کا مختصر جائزہ (Placement)' : 'Placement Assessment'),
            style: TextStyle(fontFamily: fontFamily, fontSize: 18, fontWeight: FontWeight.bold),
          ),
          centerTitle: true,
          actions: [
            IconButton(
              icon: const Icon(Icons.help_outline),
              onPressed: () => PrototypeLimitsSheet.show(context),
            ),
          ],
        ),
        body: SafeArea(
          child: _quizFinished ? _buildResultView(fontFamily) : _buildQuizView(fontFamily),
        ),
      ),
    );
  }

  Widget _buildQuizView(String fontFamily) {
    final q = _questions[_currentIndex];
    final lang = widget.language;
    String qText = q['question_en'];
    List<String> options = List<String>.from(q['options_en']);

    if (lang == AppLanguage.urdu) {
      qText = q['question_ur'];
      options = List<String>.from(q['options_ur']);
    } else if (lang == AppLanguage.sindhi) {
      qText = q['question_sd'];
      options = List<String>.from(q['options_sd']);
    }

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
            margin: const EdgeInsets.only(bottom: 12),
            decoration: BoxDecoration(
              color: const Color(0xFFFFF3E0),
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: const Color(0xFFFFB74D)),
            ),
            child: const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.info_outline, size: 14, color: Color(0xFFE65100)),
                SizedBox(width: 6),
                Flexible(
                  child: Text(
                    '[SIMULATED] 8-Question Scripted Placement Quiz (No backend required)',
                    style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFFE65100)),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ],
            ),
          ),
          // Progress Header
          Row(
            children: [
              Text(
                '${widget.profile.avatar} ${widget.profile.name}',
                style: TextStyle(fontFamily: fontFamily, fontSize: 14, fontWeight: FontWeight.bold),
              ),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0xFFE8F5E9),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  'سوال ${_currentIndex + 1} / ${_questions.length}',
                  style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1B5E20)),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          LinearProgressIndicator(
            value: (_currentIndex + 1) / _questions.length,
            backgroundColor: Colors.grey.shade300,
            color: const Color(0xFF2E7D32),
            minHeight: 8,
            borderRadius: BorderRadius.circular(4),
          ),

          const SizedBox(height: 16),

          // Question Card with Sound and Visual
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(20),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.05),
                  blurRadius: 10,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: Column(
              children: [
                Text(
                  q['emoji'] ?? '❓',
                  style: const TextStyle(fontSize: 48),
                ),
                const SizedBox(height: 12),
                Text(
                  qText,
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontFamily: fontFamily,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    height: 1.3,
                  ),
                ),
                const SizedBox(height: 8),
                IconButton.filledTonal(
                  icon: const Icon(Icons.volume_up, color: Color(0xFF1B5E20)),
                  onPressed: _playQuestionAudio,
                  tooltip: 'Play sound',
                ),
              ],
            ),
          ),

          const SizedBox(height: 16),

          // Options List
          Expanded(
            child: ListView.separated(
              itemCount: options.length,
              separatorBuilder: (_, __) => const SizedBox(height: 10),
              itemBuilder: (ctx, idx) {
                final isSelected = _selectedOption == idx.toString();
                return Material(
                  color: isSelected ? const Color(0xFFE8F5E9) : Colors.white,
                  borderRadius: BorderRadius.circular(14),
                  elevation: isSelected ? 2 : 1,
                  child: InkWell(
                    borderRadius: BorderRadius.circular(14),
                    onTap: () => _handleOptionSelect(idx),
                    child: Container(
                      height: 58, // >= 56dp
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(14),
                        border: Border.all(
                          color: isSelected ? const Color(0xFF2E7D32) : Colors.grey.shade300,
                          width: isSelected ? 2 : 1,
                        ),
                      ),
                      child: Row(
                        children: [
                          Icon(
                            isSelected ? Icons.check_circle : Icons.radio_button_unchecked,
                            color: isSelected ? const Color(0xFF2E7D32) : Colors.grey,
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              options[idx],
                              style: TextStyle(
                                fontFamily: fontFamily,
                                fontSize: 16,
                                fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          // Submit / Next Button
          SizedBox(
            height: 56,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: _selectedOption == null ? Colors.grey : const Color(0xFF2E7D32),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              onPressed: _selectedOption == null ? null : _submitAnswer,
              child: Text(
                _currentIndex == _questions.length - 1
                    ? (widget.language == AppLanguage.sindhi ? 'نتيجو ڏسو (Finish)' : 'نتیجہ دیکھیں (Finish)')
                    : (widget.language == AppLanguage.sindhi ? 'اڳيون سوال (Next)' : 'اگلا سوال (Next)'),
                style: TextStyle(fontFamily: fontFamily, fontSize: 17, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildResultView(String fontFamily) {
    final lang = widget.language;
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Icon(Icons.celebration, size: 70, color: Color(0xFFFFA000)),
          const SizedBox(height: 12),
          Text(
            lang == AppLanguage.sindhi ? 'مبارڪون! نتيجو تيار آهي' : 'مبارک ہو! تشخیصی نتیجہ تیار ہے',
            textAlign: TextAlign.center,
            style: TextStyle(fontFamily: fontFamily, fontSize: 22, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            'اسکور: $_score / ${_questions.length} سوالات درست',
            textAlign: TextAlign.center,
            style: const TextStyle(fontSize: 16, color: Color(0xFF2E7D32), fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 20),

          // Result Card
          Container(
            padding: const EdgeInsets.all(18),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: const Color(0xFFC8E6C9)),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.05),
                  blurRadius: 10,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Text(widget.profile.avatar, style: const TextStyle(fontSize: 32)),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            widget.profile.name,
                            style: TextStyle(fontFamily: fontFamily, fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                          Text(
                            widget.profile.literacyLevel,
                            style: const TextStyle(fontSize: 13, color: Color(0xFF1B5E20), fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const Divider(height: 24),
                Text(
                  lang == AppLanguage.sindhi ? 'توهان لاءِ تجويز ڪيل تعليمي رستو:' : 'آپ کے لیے تجویز کردہ تعلیمی راستہ:',
                  style: TextStyle(fontFamily: fontFamily, fontSize: 14, color: Colors.grey.shade700),
                ),
                const SizedBox(height: 6),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFE8F5E9),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.star, color: Color(0xFFFFA000)),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          widget.profile.suggestedPathway,
                          style: TextStyle(fontFamily: fontFamily, fontSize: 15, fontWeight: FontWeight.bold, color: const Color(0xFF1B5E20)),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          const SizedBox(height: 24),

          // Start Learning Pathway Button
          SizedBox(
            height: 56,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF2E7D32),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              onPressed: () {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(
                    builder: (ctx) => HomeLearningScreen(
                      profile: widget.profile,
                      language: widget.language,
                    ),
                  ),
                );
              },
              child: Text(
                lang == AppLanguage.sindhi ? 'پنهنجو سبق شروع ڪريو' : 'اپنا سبق شروع کریں (Start Pathway)',
                style: TextStyle(fontFamily: fontFamily, fontSize: 17, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
