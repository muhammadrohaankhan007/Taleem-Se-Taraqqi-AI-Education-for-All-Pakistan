import 'package:flutter/material.dart';
import '../../core/i18n/language_manager.dart';
import '../../core/audio/tts_service.dart';
import '../common/prototype_limits_sheet.dart';

class ScriptedTutorScreen extends StatefulWidget {
  final AppLanguage language;

  const ScriptedTutorScreen({
    super.key,
    required this.language,
  });

  @override
  State<ScriptedTutorScreen> createState() => _ScriptedTutorScreenState();
}

class _ScriptedTutorScreenState extends State<ScriptedTutorScreen> {
  final TextEditingController _inputController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  final TtsService _tts = TtsService();

  late final List<Map<String, dynamic>> _messages;

  final List<Map<String, dynamic>> _cannedKnowledge = [
    {
      'keywords': ['پڑھنا', 'کتاب', 'حرف', 'پڙهڻ', 'اکر', 'read'],
      'reply_ur': 'بہت خوب! آئیے ایک ساتھ پڑھتے ہیں۔ حرف "الف" سے "انار" اور "ب" سے "بستہ" بنتا ہے۔ روزانہ 10 منٹ پڑھائی سے آپ تیزی سے سیکھ سکتے ہیں!',
      'reply_sd': 'تمام سٺو! اچو گڏجي پڙهون. اکر "الف" مان "انب" ۽ "ٻ" مان "ٻڪري" ٺهي ٿي. روزانو 10 منٽ پڙهڻ سان اوهان تيزي سان سکي سگهو ٿا!',
      'reply_en': 'Great! Let’s read together. The letter "Alif" makes words like "Pomegranate", and "Bay" makes "Bag". Practicing 10 minutes daily builds fast fluency!',
    },
    {
      'keywords': ['حساب', 'پیسے', 'روپے', 'گنتی', 'math', 'money', 'ڳڻپ'],
      'reply_ur': 'آئیے حساب کرتے ہیں: اگر آپ کے پاس 100 روپے ہوں اور آپ 35 روپے کی دال خریدیں، تو (100 - 35 = 65) روپے باقی بچیں گے۔ ہمیشہ خرچ سے پہلے بچت کا سوچیں!',
      'reply_sd': 'اچو حساب ڪريون: جيڪڏهن وٽان 100 رپيا هجن ۽ 35 رپين جي دال وٺو، ته باقي (100 - 35 = 65) رپيا بچندا. خرچ ڪرڻ کان اڳ بچت جو خيال رکو!',
      'reply_en': 'Let’s calculate: If you have 100 rupees and spend 35 on pulses, you have (100 - 35 = 65) left. Always track your daily household budget!',
    },
    {
      'keywords': ['چانور', 'فصل', 'پانی', 'کھاد', 'rice', 'farming', 'پوک'],
      'reply_ur': 'دھان (چاول) کی فصل میں پنیری منتقلی کے بعد پہلے 25 سے 30 دن تک 2 سے 3 انچ پانی کھڑا رہنا ضروری ہے، تاکہ جڑی بوٹیاں نہ اگیں۔ کھاد کی خوراک زرعی ماہر کی ہدایت کے مطابق دیں۔',
      'reply_sd': 'چانورن جي پوک ۾ پنيری هڻڻ کان پوءِ شروعاتي 25 کان 30 ڏينهن پاڻي 2 کان 3 انچ بيهڻ گهرجي ته جيئن گاهه نه اُڀري. ڀاڻ جو استعمال زرعي صلاحڪار جي مشوري سان ڪريو.',
      'reply_en': 'For rice crops, maintain 2-3 inches of standing water for 25-30 days after transplanting to suppress weeds. Apply fertilizer as advised by local extension officers.',
    },
    {
      'keywords': ['بکری', 'بھینس', 'جانور', 'دودھ', 'ٻڪري', 'مال', 'goat', 'animal'],
      'reply_ur': 'بکریوں اور بھینسوں کو موسمی بیماریوں (جیسے منہ کھر اور گل گھوٹو) سے بچانے کے لیے ہر 6 ماہ بعد حفاظتی ٹیکے لگوائیں۔ حاملہ جانوروں کو صاف پینے کا پانی اور متوازن چارہ دیں۔',
      'reply_sd': 'ٻڪرين ۽ ڍڳين کي بيمارين کان بچائڻ لاءِ سال ۾ ٻه ڀيرا حفاظتي ويڪسين لازمي ڪرايو. کير ڏيندڙ مال کي صاف پاڻي ۽ سٺو چارو ڏيو.',
      'reply_en': 'Vaccinate livestock against Foot-and-Mouth disease every 6 months. Provide clean drinking water and nutrient-rich fodder to milking animals.',
    },
  ];

  @override
  void initState() {
    super.initState();
    final isSindhi = widget.language == AppLanguage.sindhi;
    _messages = [
      {
        'isUser': false,
        'text': isSindhi
            ? 'اسلام عليڪم! مان تعليم سي ترقي جو اسڪرپٽڊ ٽيوٽر آهيان. اوهان پڙهائي، حساب يا ٻني ٻاري بابت ڪجهه به پڇي سگهو ٿا.'
            : 'السلام علیکم! میں تعلیم سے ترقی کا اسکرپٹڈ استاد ہوں۔ آپ حروف، ریاضی یا کھیتی باڑی سے متعلق کوئی بھی سوال پوچھ سکتے ہیں۔',
      }
    ];
    _playGreeting();
  }

  void _playGreeting() {
    if (_messages.isNotEmpty) {
      _tts.speak(_messages.first['text'], widget.language.code);
    }
  }

  void _handleSend(String query) {
    if (query.trim().isEmpty) return;

    final userText = query.trim();
    _inputController.clear();

    setState(() {
      _messages.add({'isUser': true, 'text': userText});
    });

    _scrollToBottom();

    // Determine Canned Answer
    String reply = '';
    final lang = widget.language;
    final isSindhi = lang == AppLanguage.sindhi;
    final isUrdu = lang == AppLanguage.urdu;

    bool matched = false;
    for (final item in _cannedKnowledge) {
      final keywords = item['keywords'] as List<String>;
      for (final kw in keywords) {
        if (userText.toLowerCase().contains(kw.toLowerCase())) {
          reply = isSindhi
              ? item['reply_sd']
              : (isUrdu ? item['reply_ur'] : item['reply_en']);
          matched = true;
          break;
        }
      }
      if (matched) break;
    }

    if (!matched) {
      reply = isSindhi
          ? '[اسڪرپٽڊ جواب] هي پروٽوٽائپ آهي. حقيقي اي آءِ اڃا ڳنڍيل ناهي. مهرباني ڪري مٿي ڏنل تڪڙن سوالن مان چونڊيو.'
          : '[اسکرپٹڈ جواب] یہ تعلیمی پروٹوٹائپ ہے۔ لائیو AI ماڈل منسلک نہیں ہے۔ برائے کرم دیے گئے بنیادی موضوعات پر سوال پوچھیں۔';
    }

    Future.delayed(const Duration(milliseconds: 300), () {
      if (mounted) {
        setState(() {
          _messages.add({'isUser': false, 'text': reply});
        });
        _tts.speak(reply, widget.language.code);
        _scrollToBottom();
      }
    });
  }

  void _scrollToBottom() {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (_scrollController.hasClients) {
        _scrollController.animateTo(
          _scrollController.position.maxScrollExtent,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeOut,
        );
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final lang = widget.language;
    final textDirection = lang.direction;
    final fontFamily = lang == AppLanguage.sindhi || lang == AppLanguage.urdu
        ? 'NotoNaskhArabic'
        : 'Roboto';
    final isSindhi = lang == AppLanguage.sindhi;

    return Directionality(
      textDirection: textDirection,
      child: Scaffold(
        backgroundColor: const Color(0xFFF7FAF7),
        appBar: AppBar(
          backgroundColor: const Color(0xFF1565C0), // Blue
          foregroundColor: Colors.white,
          title: Text(
            isSindhi ? 'اي آءِ استاد (AI Tutor)' : 'اے آئی استاد (Scripted AI Tutor)',
            style: TextStyle(fontFamily: fontFamily, fontSize: 18, fontWeight: FontWeight.bold),
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.help_outline),
              onPressed: () => PrototypeLimitsSheet.show(context),
            ),
          ],
        ),
        body: SafeArea(
          child: Column(
            children: [
              // Honest Demo Banner
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                color: const Color(0xFFFFF3E0),
                child: const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.smart_toy_outlined, size: 14, color: Color(0xFFE65100)),
                    SizedBox(width: 6),
                    Flexible(
                      child: Text(
                        'Scripted demo - live AI not connected',
                        style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFFE65100)),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                  ],
                ),
              ),

              // Quick prompts chips
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                color: Colors.white,
                child: SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  child: Row(
                    children: [
                      ActionChip(
                        avatar: const Text('📖'),
                        label: Text(isSindhi ? 'اکر ۽ پڙهڻ' : 'حروف اور پڑھائی'),
                        onPressed: () => _handleSend('کتاب پڑھنے کی مشق کروائیں'),
                      ),
                      const SizedBox(width: 6),
                      ActionChip(
                        avatar: const Text('💰'),
                        label: Text(isSindhi ? 'بنيادي حساب' : '100 روپے کا حساب'),
                        onPressed: () => _handleSend('100 روپے کا حساب کیسے کریں'),
                      ),
                      const SizedBox(width: 6),
                      ActionChip(
                        avatar: const Text('🌾'),
                        label: Text(isSindhi ? 'چانورن جي پوک' : 'چاول کی فصل'),
                        onPressed: () => _handleSend('دھان کی فصل میں پانی کب دینا ہے؟'),
                      ),
                      const SizedBox(width: 6),
                      ActionChip(
                        avatar: const Text('🐐'),
                        label: Text(isSindhi ? 'ٻڪريون ۽ ويڪسين' : 'بکری اور جانور'),
                        onPressed: () => _handleSend('بکریوں کی ویکسین کب کروائیں؟'),
                      ),
                    ],
                  ),
                ),
              ),

              // Chat Message List
              Expanded(
                child: ListView.builder(
                  controller: _scrollController,
                  padding: const EdgeInsets.all(16),
                  itemCount: _messages.length,
                  itemBuilder: (ctx, idx) {
                    final msg = _messages[idx];
                    final isUser = msg['isUser'] as bool;
                    final text = msg['text'] as String;

                    return Align(
                      alignment: isUser ? Alignment.centerRight : Alignment.centerLeft,
                      child: Container(
                        margin: const EdgeInsets.symmetric(vertical: 6),
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.8),
                        decoration: BoxDecoration(
                          color: isUser ? const Color(0xFF1E88E5) : Colors.white,
                          borderRadius: BorderRadius.only(
                            topLeft: const Radius.circular(16),
                            topRight: const Radius.circular(16),
                            bottomLeft: Radius.circular(isUser ? 16 : 4),
                            bottomRight: Radius.circular(isUser ? 4 : 16),
                          ),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withValues(alpha: 0.04),
                              blurRadius: 6,
                              offset: const Offset(0, 2),
                            ),
                          ],
                        ),
                        child: Column(
                          crossAxisAlignment: isUser ? CrossAxisAlignment.end : CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                Icon(
                                  isUser ? Icons.person : Icons.smart_toy,
                                  size: 14,
                                  color: isUser ? Colors.white70 : const Color(0xFF1565C0),
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  isUser ? 'آپ' : 'استاد (AI)',
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.bold,
                                    color: isUser ? Colors.white70 : const Color(0xFF1565C0),
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            Text(
                              text,
                              style: TextStyle(
                                fontFamily: fontFamily,
                                fontSize: 14,
                                height: 1.4,
                                color: isUser ? Colors.white : const Color(0xFF263238),
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ),

              // Chat Input Bar
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withValues(alpha: 0.05),
                      blurRadius: 8,
                      offset: const Offset(0, -2),
                    ),
                  ],
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: _inputController,
                        onSubmitted: _handleSend,
                        decoration: InputDecoration(
                          hintText: isSindhi ? 'هتي سوال لکو...' : 'یہاں سوال لکھیں...',
                          border: OutlineInputBorder(borderRadius: BorderRadius.circular(24)),
                          contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                        ),
                      ),
                    ),
                    const SizedBox(width: 8),
                    CircleAvatar(
                      backgroundColor: const Color(0xFF1565C0),
                      foregroundColor: Colors.white,
                      child: IconButton(
                        icon: const Icon(Icons.send, size: 18),
                        onPressed: () => _handleSend(_inputController.text),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
