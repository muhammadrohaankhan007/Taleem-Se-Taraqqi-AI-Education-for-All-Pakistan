import 'package:flutter/material.dart';
import '../../core/i18n/language_manager.dart';
import '../../core/audio/tts_service.dart';
import '../../core/models/learner_profile.dart';
import '../../core/storage/local_storage_service.dart';
import 'widgets/tracing_canvas.dart';
import '../common/prototype_limits_sheet.dart';

class LessonPlayerScreen extends StatefulWidget {
  final LearnerProfile profile;
  final AppLanguage language;
  final int lessonIndex; // 0, 1, or 2

  const LessonPlayerScreen({
    super.key,
    required this.profile,
    required this.language,
    required this.lessonIndex,
  });

  @override
  State<LessonPlayerScreen> createState() => _LessonPlayerScreenState();
}

class _LessonPlayerScreenState extends State<LessonPlayerScreen> {
  final TtsService _tts = TtsService();
  int _currentPhase = 0; // 0: Listen & Tap, 1: Tracing Canvas, 2: 5-Question Check
  int _quizIndex = 0;
  int _checkScore = 0;
  int? _selectedCheckOption;
  bool _lessonComplete = false;

  late final Map<String, dynamic> _lessonData;

  @override
  void initState() {
    super.initState();
    _loadLessonData();
    _playPhaseAudio();
  }

  void _loadLessonData() {
    final isSindhi = widget.language == AppLanguage.sindhi;
    final idx = widget.lessonIndex;

    if (idx == 0) {
      // Literacy Lesson 1: Alif
      _lessonData = {
        'title': isSindhi ? 'سبق 1: اکر الف ۽ ٻ' : 'سبق 1: حرف الف کی پہچان',
        'character': isSindhi ? 'الف' : 'الف',
        'listen_tap_items': isSindhi
            ? [
                {'label': 'انب (Mango)', 'emoji': '🥭', 'sound': 'الف مان انب'},
                {'label': 'ڏاڙھون (Pomegranate)', 'emoji': '🍎', 'sound': 'الف مان انار'},
                {'label': 'اٺ (Camel)', 'emoji': '🐪', 'sound': 'الف مان اٺ'},
              ]
            : [
                {'label': 'انار (Pomegranate)', 'emoji': '🍎', 'sound': 'الف سے انار'},
                {'label': 'انگور (Grapes)', 'emoji': '🍇', 'sound': 'الف سے انگور'},
                {'label': 'اونٹ (Camel)', 'emoji': '🐪', 'sound': 'الف سے اونٹ'},
              ],
        'tracing_char': 'ا',
        'tracing_hint': isSindhi ? 'مٿان کان هيٺ سڌي لڪير ڇڪيو' : 'اوپر سے نیچے سیدھی لکیر کھینچیں',
        'check_questions': [
          {
            'q': isSindhi ? 'اکر الف مان ڪهڙو ميوو ٺهي ٿو؟' : 'حرف الف سے کون سا پھل بنتا ہے؟',
            'options': isSindhi ? ['انب 🥭', 'ٻڪري 🐐', 'پاڻي 💧'] : ['انار 🍎', 'بلی 🐱', 'پانی 💧'],
            'correct': 0,
          },
          {
            'q': isSindhi ? 'هن تصوير ۾ ڇا آهي؟ 🐪' : 'اس تصویر میں کیا ہے؟ 🐪',
            'options': isSindhi ? ['اٺ (Camel)', 'گھوڙو (Horse)', 'ٻلي (Cat)'] : ['اونٹ (Camel)', 'گھوڑا (Horse)', 'بلی (Cat)'],
            'correct': 0,
          },
          {
            'q': isSindhi ? 'اکر الف جي سڃاڻپ ڪريو:' : 'حرف الف کی پہچان کریں:',
            'options': ['ا', 'ب', 'ج'],
            'correct': 0,
          },
          {
            'q': isSindhi ? 'ڇا الف جي مٿان نقطو هوندو آهي؟' : 'کیا الف کے اوپر نقطہ ہوتا ہے؟',
            'options': isSindhi ? ['نه (نہیں)', 'ها (ہاں)', 'ٻه نقطا'] : ['نہیں (No)', 'ہاں (Yes)', 'دو نقطے'],
            'correct': 0,
          },
          {
            'q': isSindhi ? 'الف جي آواز آهي:' : 'الف کی بنیادی آواز ہے:',
            'options': ['آ (Aa)', 'با (Ba)', 'تا (Ta)'],
            'correct': 0,
          },
        ],
      };
    } else if (idx == 1) {
      // Numeracy Lesson 2: Counting 1 to 5
      _lessonData = {
        'title': isSindhi ? 'سبق 2: انگ ۽ ڳڻپ (1 کان 5)' : 'سبق 2: بنیادی گنتی (1 سے 5)',
        'character': '1 2 3 4 5',
        'listen_tap_items': [
          {'label': '1 (One)', 'emoji': '☝️', 'sound': isSindhi ? 'هڪ' : 'ایک'},
          {'label': '2 (Two)', 'emoji': '✌️', 'sound': isSindhi ? 'ٻه' : 'دو'},
          {'label': '3 (Three)', 'emoji': '🤟', 'sound': isSindhi ? 'ٽي' : 'تین'},
          {'label': '4 (Four)', 'emoji': '🍀', 'sound': isSindhi ? 'چار' : 'چار'},
          {'label': '5 (Five)', 'emoji': '🖐️', 'sound': isSindhi ? 'پنج' : 'پانچ'},
        ],
        'tracing_char': '۲',
        'tracing_hint': isSindhi ? 'عدد ٻه (2) لکو' : 'عدد دو (2) کو انگلی سے ٹریس کریں',
        'check_questions': [
          {
            'q': 'یہ کتنے سیب ہیں؟ 🍎 🍎',
            'options': ['1', '2', '3'],
            'correct': 1,
          },
          {
            'q': 'گن کر بتائیں: ⭐ ⭐ ⭐ ⭐',
            'options': ['3', '4', '5'],
            'correct': 1,
          },
          {
            'q': 'ایک ہاتھ میں کتنی انگلیاں ہوتی ہیں؟ 🖐️',
            'options': ['4', '5', '6'],
            'correct': 1,
          },
          {
            'q': '2 + 1 کتنا ہوتا ہے؟',
            'options': ['2', '3', '4'],
            'correct': 1,
          },
          {
            'q': '3 کے بعد کون سا عدد آتا ہے؟',
            'options': ['2', '4', '5'],
            'correct': 1,
          },
        ],
      };
    } else {
      // Applied Literacy Lesson 3: Letter Bay & Words
      _lessonData = {
        'title': isSindhi ? 'سبق 3: اکر ٻ ۽ روزانو لفظ' : 'سبق 3: حرف ب اور روزمرہ الفاظ',
        'character': isSindhi ? 'ٻ' : 'ب',
        'listen_tap_items': isSindhi
            ? [
                {'label': 'ٻڪري (Goat)', 'emoji': '🐐', 'sound': 'ٻ مان ٻڪري'},
                {'label': 'ٻير (Berry)', 'emoji': '🍒', 'sound': 'ٻ مان ٻير'},
                {'label': 'ٻيڙي (Boat)', 'emoji': '⛵', 'sound': 'ٻ مان ٻيڙي'},
              ]
            : [
                {'label': 'بستہ (Bag)', 'emoji': '🎒', 'sound': 'ب سے بستہ'},
                {'label': 'بکری (Goat)', 'emoji': '🐐', 'sound': 'ب سے بکری'},
                {'label': 'بتخ (Duck)', 'emoji': '🦆', 'sound': 'ب سے بتخ'},
              ],
        'tracing_char': isSindhi ? 'ٻ' : 'ب',
        'tracing_hint': isSindhi ? 'اکر ٻ لکو ۽ ٻه نقطا هيٺ ڏيو' : 'حرف ب لکھیں اور نیچے ایک نقطہ لگائیں',
        'check_questions': [
          {
            'q': isSindhi ? 'هن تصوير ۾ ڇا آهي؟ 🐐' : 'اس تصویر میں کیا ہے؟ 🐐',
            'options': isSindhi ? ['ٻڪري (Goat)', 'ڳئون (Cow)', 'گھوڙو (Horse)'] : ['بکری (Goat)', 'گائے (Cow)', 'گھوڑا (Horse)'],
            'correct': 0,
          },
          {
            'q': isSindhi ? 'اسڪول لاءِ ڪهڙي شئي ڪم اچي ٿي؟ 🎒' : 'اسکول کا بستہ کس حرف سے بنتا ہے؟ 🎒',
            'options': isSindhi ? ['بستو / ٿيلھو', 'چمچو', 'گڏي'] : ['ب سے بستہ', 'الف سے انار', 'ج سے جوتا'],
            'correct': 0,
          },
          {
            'q': isSindhi ? 'ٻڪري مان اسان کي ڇا ملي ٿو؟' : 'بکری سے ہمیں کیا حاصل ہوتا ہے؟',
            'options': isSindhi ? ['کير (Milk)', 'تيل (Oil)', 'لوهه (Iron)'] : ['دودھ (Milk)', 'تیل (Oil)', 'لوہا (Iron)'],
            'correct': 0,
          },
          {
            'q': isSindhi ? 'اکر ب جي هيٺان ڪيترا نقطا آهن؟' : 'حرف "ب" کے نیچے کتنے نقطے ہوتے ہیں؟',
            'options': ['1 نقطہ', '2 نقطے', 'کوئی نہیں'],
            'correct': 0,
          },
          {
            'q': isSindhi ? 'پکي پاڻيءَ ۾ تري ٿو: 🦆' : 'پانی میں تیرنے والی بتخ کا پہلا حرف:',
            'options': ['ب (Bay)', 'س (Seen)', 'د (Daal)'],
            'correct': 0,
          },
        ],
      };
    }
  }

  void _playPhaseAudio() {
    final langCode = widget.language.code;
    String prompt = '';
    if (_currentPhase == 0) {
      prompt = widget.language == AppLanguage.sindhi
          ? 'تصويرن تي ٽيپ ڪريو ۽ آواز ٻڌو.'
          : 'تصویروں پر ٹیپ کریں اور تلفظ سنیں۔';
    } else if (_currentPhase == 1) {
      prompt = widget.language == AppLanguage.sindhi
          ? 'پنهنجي آڱر سان اکر لکو.'
          : 'اپنی انگلی سے اسکرین پر حرف ٹریس کریں۔';
    } else {
      prompt = widget.language == AppLanguage.sindhi
          ? 'هاڻي 5 مختصر سوالن جا جواب ڏيو.'
          : 'اب 5 مختصر سوالات کے جوابات دیں۔';
    }
    _tts.speak(prompt, langCode);
  }

  void _onOptionTap(String soundText) {
    _tts.speak(soundText, widget.language.code);
  }

  void _nextPhase() {
    setState(() {
      _currentPhase++;
    });
    _playPhaseAudio();
  }

  void _handleCheckAnswer(int idx) {
    setState(() {
      _selectedCheckOption = idx;
    });
  }

  void _submitCheckQuestion() {
    if (_selectedCheckOption == null) return;
    final questions = _lessonData['check_questions'] as List;
    final correct = questions[_quizIndex]['correct'] as int;

    if (_selectedCheckOption == correct) {
      _checkScore++;
    }

    if (_quizIndex < questions.length - 1) {
      setState(() {
        _quizIndex++;
        _selectedCheckOption = null;
      });
    } else {
      _finishLesson();
    }
  }

  Future<void> _finishLesson() async {
    final updated = widget.profile.copyWith(
      progressStars: widget.profile.progressStars + _checkScore + 3,
    );
    await LocalStorageService.updateProfile(updated);

    setState(() {
      _lessonComplete = true;
    });

    _tts.speak(
      widget.language == AppLanguage.sindhi
          ? 'تمام بهترين! سبق مڪمل ٿي ويو ۽ ستارا ملي ويا.'
          : 'بہت خوب! سبق مکمل ہو گیا اور آپ کو ستارے مل گئے۔',
      widget.language.code,
    );
  }

  @override
  Widget build(BuildContext context) {
    final lang = widget.language;
    final fontFamily = lang == AppLanguage.sindhi || lang == AppLanguage.urdu
        ? 'NotoNaskhArabic'
        : 'Roboto';

    return Directionality(
      textDirection: lang.direction,
      child: Scaffold(
        backgroundColor: const Color(0xFFF7FAF7),
        appBar: AppBar(
          backgroundColor: const Color(0xFF1B5E20),
          foregroundColor: Colors.white,
          title: Text(
            _lessonData['title'] ?? 'Lesson',
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
          child: _lessonComplete
              ? _buildCompletionView(fontFamily)
              : Column(
                  children: [
                    // Phase Stepper Tabs
                    Container(
                      color: Colors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                      child: Row(
                        children: [
                          _buildStepTab(0, '1. سنیں اور ٹیپ کریں', Icons.touch_app, fontFamily),
                          const SizedBox(width: 6),
                          _buildStepTab(1, '2. انگلی سے لکھیں', Icons.gesture, fontFamily),
                          const SizedBox(width: 6),
                          _buildStepTab(2, '3. جانچ (5 سوال)', Icons.quiz, fontFamily),
                        ],
                      ),
                    ),

                    // Temp Audio Indicator
                    Container(
                      padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 12),
                      color: const Color(0xFFFFF8E1),
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.mic_none, size: 14, color: Color(0xFFF57F17)),
                          SizedBox(width: 6),
                          Text(
                            '[TEMP AUDIO / DEMO TTS] Browser speech synthesis active',
                            style: TextStyle(fontSize: 11, color: Color(0xFFF57F17), fontWeight: FontWeight.w600),
                          ),
                        ],
                      ),
                    ),

                    // Active Phase Body
                    Expanded(
                      child: _currentPhase == 0
                          ? _buildListenTapPhase(fontFamily)
                          : (_currentPhase == 1
                              ? _buildTracingPhase(fontFamily)
                              : _buildCheckPhase(fontFamily)),
                    ),
                  ],
                ),
        ),
      ),
    );
  }

  Widget _buildStepTab(int stepIdx, String label, IconData icon, String fontFamily) {
    final isActive = _currentPhase == stepIdx;
    final isDone = _currentPhase > stepIdx;
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 6),
        decoration: BoxDecoration(
          color: isActive ? const Color(0xFFE8F5E9) : Colors.transparent,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: isActive ? const Color(0xFF2E7D32) : Colors.transparent,
          ),
        ),
        child: Column(
          children: [
            Icon(
              isDone ? Icons.check_circle : icon,
              size: 18,
              color: isActive || isDone ? const Color(0xFF2E7D32) : Colors.grey,
            ),
            const SizedBox(height: 2),
            Text(
              label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: TextStyle(
                fontFamily: fontFamily,
                fontSize: 10,
                fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
                color: isActive ? const Color(0xFF1B5E20) : Colors.grey.shade700,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildListenTapPhase(String fontFamily) {
    final items = _lessonData['listen_tap_items'] as List;
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          Text(
            widget.language == AppLanguage.sindhi
                ? 'تصوير تي ٽيپ ڪريو ۽ تلفظ ٻڌو (Listen & Tap)'
                : 'تصویر پر ٹیپ کریں اور تلفظ سنیں (Listen & Tap)',
            style: TextStyle(fontFamily: fontFamily, fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 12),
          Expanded(
            child: GridView.builder(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 1.0,
              ),
              itemCount: items.length,
              itemBuilder: (ctx, idx) {
                final item = items[idx];
                return Material(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(16),
                  elevation: 2,
                  child: InkWell(
                    borderRadius: BorderRadius.circular(16),
                    onTap: () => _onOptionTap(item['sound']),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(item['emoji'], style: const TextStyle(fontSize: 48)),
                        const SizedBox(height: 8),
                        Text(
                          item['label'],
                          textAlign: TextAlign.center,
                          style: TextStyle(
                            fontFamily: fontFamily,
                            fontSize: 15,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 4),
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.volume_up, size: 16, color: Color(0xFF2E7D32)),
                            SizedBox(width: 4),
                            Text('سنیں', style: TextStyle(fontSize: 11, color: Color(0xFF2E7D32))),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
          ),
          SizedBox(
            height: 54,
            width: double.infinity,
            child: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF2E7D32),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
              icon: const Icon(Icons.arrow_forward),
              label: const Text('اگلا مرحلہ: ٹریسنگ کینوس (Next: Tracing)', style: TextStyle(fontSize: 16)),
              onPressed: _nextPhase,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildTracingPhase(String fontFamily) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12.0),
      child: Column(
        children: [
          Text(
            widget.language == AppLanguage.sindhi ? 'آڱر سان ٽريس ڪريو' : 'انگلی سے ٹریس کریں (Finger Tracing)',
            style: TextStyle(fontFamily: fontFamily, fontSize: 16, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Expanded(
            child: TracingCanvas(
              letter: _lessonData['tracing_char'] ?? 'ا',
              hint: _lessonData['tracing_hint'] ?? 'حرف کو ٹریس کریں',
              onCompleted: _nextPhase,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCheckPhase(String fontFamily) {
    final questions = _lessonData['check_questions'] as List;
    final currentQ = questions[_quizIndex];
    final options = List<String>.from(currentQ['options']);

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Row(
            children: [
              Text(
                'سوال ${_quizIndex + 1} / ${questions.length}',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
              ),
              const Spacer(),
              Text('اسکور: $_checkScore ⭐', style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFFFA000))),
            ],
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.04),
                  blurRadius: 8,
                ),
              ],
            ),
            child: Text(
              currentQ['q'],
              textAlign: TextAlign.center,
              style: TextStyle(fontFamily: fontFamily, fontSize: 17, fontWeight: FontWeight.bold),
            ),
          ),
          const SizedBox(height: 16),
          Expanded(
            child: ListView.separated(
              itemCount: options.length,
              separatorBuilder: (_, __) => const SizedBox(height: 10),
              itemBuilder: (ctx, idx) {
                final isSelected = _selectedCheckOption == idx;
                return Material(
                  color: isSelected ? const Color(0xFFE8F5E9) : Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  child: InkWell(
                    borderRadius: BorderRadius.circular(12),
                    onTap: () => _handleCheckAnswer(idx),
                    child: Container(
                      height: 56,
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(12),
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
                                fontSize: 15,
                                fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
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
          SizedBox(
            height: 54,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: _selectedCheckOption == null ? Colors.grey : const Color(0xFF2E7D32),
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
              onPressed: _selectedCheckOption == null ? null : _submitCheckQuestion,
              child: Text(
                _quizIndex == questions.length - 1 ? 'سبق مکمل کریں (Finish)' : 'اگلا سوال (Next)',
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCompletionView(String fontFamily) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.star, size: 80, color: Color(0xFFFFA000)),
            const SizedBox(height: 12),
            Text(
              widget.language == AppLanguage.sindhi ? 'شاباس! سبق مڪمل ٿيو' : 'بہترین! سبق مکمل ہو گیا',
              style: TextStyle(fontFamily: fontFamily, fontSize: 24, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            Text(
              'آپ نے ${_checkScore + 3} ستارے جیتے! ⭐⭐⭐',
              style: const TextStyle(fontSize: 16, color: Color(0xFF2E7D32), fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color(0xFF2E7D32),
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 14),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
              ),
              onPressed: () => Navigator.pop(context),
              child: const Text('مرکزی صفحہ پر واپس جائیں (Back Home)', style: TextStyle(fontSize: 16)),
            ),
          ],
        ),
      ),
    );
  }
}
