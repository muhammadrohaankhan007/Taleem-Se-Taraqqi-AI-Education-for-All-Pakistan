import 'package:flutter/material.dart';
import '../../core/i18n/language_manager.dart';
import '../../core/audio/tts_service.dart';
import '../../core/models/learner_profile.dart';
import '../common/prototype_limits_sheet.dart';

enum AppliedTopic { riceFarming, livestockCare, householdHealth }

class AppliedLessonScreen extends StatefulWidget {
  final LearnerProfile profile;
  final AppLanguage language;
  final AppliedTopic topic;

  const AppliedLessonScreen({
    super.key,
    required this.profile,
    required this.language,
    required this.topic,
  });

  @override
  State<AppliedLessonScreen> createState() => _AppliedLessonScreenState();
}

class _AppliedLessonScreenState extends State<AppliedLessonScreen> {
  final TtsService _tts = TtsService();

  // Farming profit calculator state
  double _acres = 2.0;
  double _yieldPerAcre = 35.0; // Maunds (من)
  final double _pricePerMaund = 3200.0; // PKR
  double _costPerAcre = 45000.0; // PKR (Seeds, Fertilizer, Water, Labor)

  @override
  void initState() {
    super.initState();
    _playTopicAudio();
  }

  void _playTopicAudio() {
    final isSindhi = widget.language == AppLanguage.sindhi;
    String text = '';
    switch (widget.topic) {
      case AppliedTopic.riceFarming:
        text = isSindhi
            ? 'چانورن جي فصل جي تياري ۽ منافعي جو حساب'
            : 'دھان (چاول) کی کاشت، کھاد اور منافع کا حساب';
        break;
      case AppliedTopic.livestockCare:
        text = isSindhi
            ? 'مال مويشي ۽ ٻڪرين جي سار سنڀال ۽ ويڪسين'
            : 'بھیڑ بکریوں اور بھینس کی نگہداشت اور ویکسین';
        break;
      case AppliedTopic.householdHealth:
        text = isSindhi
            ? 'گھر جي صفائي، پاڻي ٽهڪائڻ ۽ نمڪول تيار ڪرڻ'
            : 'گھریلو صحت، صاف پانی اور او آر ایس نمکول';
        break;
    }
    _tts.speak(text, widget.language.code);
  }

  double get _totalRevenue => _acres * _yieldPerAcre * _pricePerMaund;
  double get _totalCost => _acres * _costPerAcre;
  double get _netProfit => _totalRevenue - _totalCost;

  @override
  Widget build(BuildContext context) {
    final lang = widget.language;
    final textDirection = lang.direction;
    final fontFamily = lang == AppLanguage.sindhi || lang == AppLanguage.urdu
        ? 'NotoNaskhArabic'
        : 'Roboto';
    final isSindhi = lang == AppLanguage.sindhi;

    String pageTitle = '';
    IconData pageIcon = Icons.eco;
    Color themeColor = const Color(0xFF2E7D32);

    switch (widget.topic) {
      case AppliedTopic.riceFarming:
        pageTitle = isSindhi ? 'چانورن جي پوک ۽ حساب' : 'دھان کی کاشت اور منافع کا حساب';
        pageIcon = Icons.agriculture;
        themeColor = const Color(0xFF2E7D32);
        break;
      case AppliedTopic.livestockCare:
        pageTitle = isSindhi ? 'ٻڪريون ۽ مال مويشي' : 'مال مویشی اور بکری بانی';
        pageIcon = Icons.pets;
        themeColor = const Color(0xFFE65100);
        break;
      case AppliedTopic.householdHealth:
        pageTitle = isSindhi ? 'گھرو صحت ۽ صفائي' : 'گھریلو صحت اور نمکول (ORS)';
        pageIcon = Icons.health_and_safety;
        themeColor = const Color(0xFF00838F);
        break;
    }

    return Directionality(
      textDirection: textDirection,
      child: Scaffold(
        backgroundColor: const Color(0xFFF7FAF7),
        appBar: AppBar(
          backgroundColor: themeColor,
          foregroundColor: Colors.white,
          title: Text(
            pageTitle,
            style: TextStyle(fontFamily: fontFamily, fontSize: 17, fontWeight: FontWeight.bold),
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.help_outline),
              onPressed: () => PrototypeLimitsSheet.show(context),
            ),
          ],
        ),
        body: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Top Honest Badge
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
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
                          '[DEMO CONTENT] Unverified field guidelines - For prototype review only',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFFE65100)),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 12),

                // Hero Card
                Card(
                  elevation: 2,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      children: [
                        CircleAvatar(
                          radius: 28,
                          backgroundColor: themeColor.withValues(alpha: 0.15),
                          child: Icon(pageIcon, size: 32, color: themeColor),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                pageTitle,
                                style: TextStyle(
                                  fontFamily: fontFamily,
                                  fontSize: 18,
                                  fontWeight: FontWeight.bold,
                                  color: themeColor,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                isSindhi ? 'عملي سکيا ۽ روزگار جا سبق' : 'عملی مہارت اور روزمرہ رہنمائی',
                                style: TextStyle(fontFamily: fontFamily, fontSize: 13, color: Colors.grey.shade700),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // Topic Content Cards
                if (widget.topic == AppliedTopic.riceFarming) ...[
                  _buildSectionCard(
                    title: isSindhi ? '1. ٻج جي تياري ۽ پاڻي جو انتظام' : '1. پنیری اور پانی کا انتظام',
                    fontFamily: fontFamily,
                    content: isSindhi
                        ? '• تصديق ٿيل بيج چونڊيو (مثلاً باسمتي يا اِري 6)\n• پنيری لڳائڻ کان پوءِ شروعاتي ڏينهن ۾ پاڻي جي سطح 2 کان 3 انچ رکو\n• بيماري جي صورت ۾ زراعت مرڪز کان تصديق وٺو'
                        : '• منظور شدہ تصدیق شدہ بیج کا انتخاب کریں\n• پنیری لگانے کے بعد ابتدائی دنوں میں پانی کی سطح 2 سے 3 انچ رکھیں\n• بلا ضرورت کیمیکل اسپرے سے گریز کریں',
                  ),
                  const SizedBox(height: 12),
                  _buildSectionCard(
                    title: isSindhi ? '2. سادي منافعي جو ڳڻپيوڪر (Calculator)' : '2. کھیتی منافع کا کیلکولیٹر (DEMO Calculator)',
                    fontFamily: fontFamily,
                    isCalculator: true,
                    child: _buildProfitCalculator(fontFamily, isSindhi),
                  ),
                ] else if (widget.topic == AppliedTopic.livestockCare) ...[
                  _buildSectionCard(
                    title: isSindhi ? '1. مال جي صحت ۽ ويڪسين ريڪارڊ' : '1. ویکسین اور موسمی دیکھ بھال',
                    fontFamily: fontFamily,
                    content: isSindhi
                        ? '• گلگهوٽو ۽ منهن کُر جي بيماري جي ويڪسين وقت سر ڪرايو\n• جانور جو پاڻي روزانو صاف بالٽي ۾ ڏيو\n• جيڪڏهن جانور اٿي نه سگهي ته فوري ويٽرنري ڊسپنسري سان رابطو ڪريو'
                        : '• منہ کھر اور گل گھوٹو کی حفاظتی ویکسین بر وقت کروائیں\n• حاملہ جانور کی خوراک میں چارے کے ساتھ دلیہ اور نمکیات شامل کریں\n• جانور کے بیٹھ جانے اور نہ اٹھنے پر فوری ڈاکٹر سے رجوع کریں (Safety Emergency)',
                  ),
                  const SizedBox(height: 12),
                  _buildSectionCard(
                    title: isSindhi ? '2. کير ۽ منافعو' : '2. دودھ اور پیداوار کا تخمینہ',
                    fontFamily: fontFamily,
                    content: isSindhi
                        ? '• روزانو کير جو مقدار ماپيو\n• في ليٽر خرچ (چارو + صفائي) معلوم ڪريو'
                        : '• یومیہ دودھ کی پیداوار نوٹ کریں\n• فی لیٹر لاگت اور بازار کے ریٹ کا موازنہ کریں',
                  ),
                ] else ...[
                  _buildSectionCard(
                    title: isSindhi ? '1. نمڪول (ORS) ٺاهڻ جو طريقو' : '1. گھریلو نمکول (ORS) بنانے کا طریقہ',
                    fontFamily: fontFamily,
                    content: isSindhi
                        ? '• 4 گلاس (هڪ ليٽر) اُٻريل ٿڌو پاڻي\n• 6 ننڍا چمچا کنڊ (Sugar)\n• اڌ ننڍو چمچو لوڻ (Salt)\n• سٺي نموني ملائي دستن دوران مريض کي پيئاريو'
                        : '• 4 گلاس (ایک لیٹر) ابلا ہوا ٹھنڈا پانی\n• 6 چھوٹے چمچ چینی (Sugar)\n• آدھا چھوٹا چمچ کھانے کا نمک (Salt)\n• اچھی طرح حل کر کے اسہال و قے میں مریض کو گھونٹ گھونٹ پلائیں',
                  ),
                  const SizedBox(height: 12),
                  _buildSectionCard(
                    title: isSindhi ? '2. صفائي ۽ پيئڻ جو پاڻي' : '2. پینے کا محفوظ پانی',
                    fontFamily: fontFamily,
                    content: isSindhi
                        ? '• پيئڻ جو پاڻي گهٽ ۾ گهٽ 5 منٽ اُٻاريو\n• کاڌو کائڻ ۽ تيار ڪرڻ کان اڳ هٿ صابڻ سان ڌوئو'
                        : '• پینے کے پانی کو کم از کم 5 منٹ ابالیں\n• کھانا کھانے اور بنانے سے پہلے صابن سے ہاتھ 20 سیکنڈ دھوئیں',
                  ),
                ],

                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSectionCard({
    required String title,
    required String fontFamily,
    String? content,
    Widget? child,
    bool isCalculator = false,
  }) {
    return Card(
      elevation: 2,
      color: Colors.white,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    title,
                    style: TextStyle(
                      fontFamily: fontFamily,
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: const Color(0xFF1B5E20),
                    ),
                  ),
                ),
                if (isCalculator)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFF3E0),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: const Text('[DEMO]', style: TextStyle(fontSize: 10, color: Color(0xFFE65100), fontWeight: FontWeight.bold)),
                  ),
              ],
            ),
            const Divider(height: 18),
            if (content != null)
              Text(
                content,
                style: TextStyle(
                  fontFamily: fontFamily,
                  fontSize: 14,
                  height: 1.6,
                  color: const Color(0xFF37474F),
                ),
              ),
            if (child != null) child,
          ],
        ),
      ),
    );
  }

  Widget _buildProfitCalculator(String fontFamily, bool isSindhi) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        // Acres Slider
        Text(
          isSindhi ? 'زمين (ايڪڙ): ${_acres.toStringAsFixed(1)}' : 'کل رقبہ (ایکڑ): ${_acres.toStringAsFixed(1)}',
          style: TextStyle(fontFamily: fontFamily, fontWeight: FontWeight.w600),
        ),
        Slider(
          value: _acres,
          min: 0.5,
          max: 20.0,
          divisions: 39,
          activeColor: const Color(0xFF2E7D32),
          onChanged: (val) => setState(() => _acres = val),
        ),

        // Yield per Acre
        Text(
          isSindhi ? 'في ايڪڙ پيداوار (مڻ): ${_yieldPerAcre.toInt()}' : 'فی ایکڑ پیداوار (من): ${_yieldPerAcre.toInt()}',
          style: TextStyle(fontFamily: fontFamily, fontWeight: FontWeight.w600),
        ),
        Slider(
          value: _yieldPerAcre,
          min: 15.0,
          max: 80.0,
          divisions: 65,
          activeColor: const Color(0xFF2E7D32),
          onChanged: (val) => setState(() => _yieldPerAcre = val),
        ),

        // Cost per Acre
        Text(
          isSindhi
              ? 'في ايڪڙ خرچ (ٻج، پاڻي، ڀاڻ): PKR ${_costPerAcre.toInt()}'
              : 'فی ایکڑ کل لاگت (بیج، کھاد، ڈیزل): PKR ${_costPerAcre.toInt()}',
          style: TextStyle(fontFamily: fontFamily, fontWeight: FontWeight.w600),
        ),
        Slider(
          value: _costPerAcre,
          min: 20000.0,
          max: 100000.0,
          divisions: 80,
          activeColor: const Color(0xFF2E7D32),
          onChanged: (val) => setState(() => _costPerAcre = val),
        ),

        const SizedBox(height: 8),

        // Results Card
        Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: _netProfit >= 0 ? const Color(0xFFE8F5E9) : const Color(0xFFFFEBEE),
            borderRadius: BorderRadius.circular(12),
            border: Border.all(
              color: _netProfit >= 0 ? const Color(0xFFA5D6A7) : const Color(0xFFEF9A9A),
            ),
          ),
          child: Column(
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(isSindhi ? 'ڪل آمدني (آمدنی):' : 'کل متوقع آمدنی:', style: TextStyle(fontFamily: fontFamily, fontSize: 13)),
                  Text('PKR ${_totalRevenue.toStringAsFixed(0)}', style: const TextStyle(fontWeight: FontWeight.bold)),
                ],
              ),
              const SizedBox(height: 4),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(isSindhi ? 'ڪل خرچ (لاگت):' : 'کل لاگت و اخراجات:', style: TextStyle(fontFamily: fontFamily, fontSize: 13)),
                  Text('PKR ${_totalCost.toStringAsFixed(0)}', style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.red)),
                ],
              ),
              const Divider(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    isSindhi ? 'خالص منافعو (Net Profit):' : 'خالص بچت و منافع:',
                    style: TextStyle(fontFamily: fontFamily, fontSize: 15, fontWeight: FontWeight.bold),
                  ),
                  Text(
                    'PKR ${_netProfit.toStringAsFixed(0)}',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: _netProfit >= 0 ? const Color(0xFF1B5E20) : Colors.red.shade700,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ],
    );
  }
}
