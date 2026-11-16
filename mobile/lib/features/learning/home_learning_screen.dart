import 'package:flutter/material.dart';
import '../../core/i18n/language_manager.dart';
import '../../core/models/learner_profile.dart';
import '../../core/audio/tts_service.dart';
import 'lesson_player_screen.dart';
import 'applied_lesson_screen.dart';
import '../safety/safety_emergency_screen.dart';
import '../tutor/scripted_tutor_screen.dart';
import '../dashboards/facilitator_dashboard_screen.dart';
import '../common/prototype_limits_sheet.dart';

class HomeLearningScreen extends StatefulWidget {
  final LearnerProfile profile;
  final AppLanguage language;

  const HomeLearningScreen({
    super.key,
    required this.profile,
    required this.language,
  });

  @override
  State<HomeLearningScreen> createState() => _HomeLearningScreenState();
}

class _HomeLearningScreenState extends State<HomeLearningScreen> {
  final TtsService _tts = TtsService();

  void _speakTile(String text) {
    _tts.speak(text, widget.language.code);
  }

  void _openLesson(int lessonIdx) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (ctx) => LessonPlayerScreen(
          profile: widget.profile,
          language: widget.language,
          lessonIndex: lessonIdx,
        ),
      ),
    );
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
          backgroundColor: const Color(0xFF1B5E20),
          foregroundColor: Colors.white,
          title: Text(
            isSindhi ? 'تعليمي مرڪز (Learning Home)' : 'تعلیمی مرکز (Learning Home)',
            style: TextStyle(fontFamily: fontFamily, fontSize: 18, fontWeight: FontWeight.bold),
          ),
          centerTitle: true,
          actions: [
            IconButton(
              icon: const Icon(Icons.help_outline),
              tooltip: "What's Real / What's Simulated",
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
                // Top Honest Demo Badge
                InkWell(
                  onTap: () => PrototypeLimitsSheet.show(context),
                  borderRadius: BorderRadius.circular(10),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFF3E0),
                      border: Border.all(color: const Color(0xFFFFB74D)),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.info_outline, size: 14, color: Color(0xFFE65100)),
                        SizedBox(width: 6),
                        Flexible(
                          child: Text(
                            '[CLICKABLE PROTOTYPE] Tap to view Real vs. Simulated capabilities',
                            style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFFE65100)),
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 12),

                // Learner Profile Card
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(18),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.04),
                        blurRadius: 8,
                        offset: const Offset(0, 2),
                      ),
                    ],
                  ),
                  child: Row(
                    children: [
                      CircleAvatar(
                        radius: 28,
                        backgroundColor: const Color(0xFFE8F5E9),
                        child: Text(widget.profile.avatar, style: const TextStyle(fontSize: 32)),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              widget.profile.name,
                              style: TextStyle(
                                fontFamily: fontFamily,
                                fontSize: 17,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              widget.profile.literacyLevel,
                              style: const TextStyle(fontSize: 12, color: Color(0xFF2E7D32), fontWeight: FontWeight.w600),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          color: const Color(0xFFFFF8E1),
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(color: const Color(0xFFFFE082)),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.star, color: Color(0xFFFFA000), size: 18),
                            const SizedBox(width: 4),
                            Text(
                              '${widget.profile.progressStars}',
                              style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFFF57F17)),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 18),

                // Section Title
                Text(
                  isSindhi ? 'پنهنجو موضوع چونڊيو:' : 'اپنا موضوع منتخب کریں:',
                  style: TextStyle(
                    fontFamily: fontFamily,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFF212121),
                  ),
                ),
                const SizedBox(height: 12),

                // 4 Big Picture Tiles
                GridView.count(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  crossAxisCount: 2,
                  crossAxisSpacing: 14,
                  mainAxisSpacing: 14,
                  childAspectRatio: 0.95,
                  children: [
                    // Tile 1: Reading and Writing
                    _buildBigTile(
                      title: isSindhi ? 'پڙهڻ ۽ لکڻ' : 'حروف شناسی و پڑھائی',
                      subtitle: isSindhi ? 'اکر، آواز ۽ لفظ' : 'Reading & Writing',
                      emoji: '📖',
                      color: const Color(0xFF1E88E5), // Blue
                      fontFamily: fontFamily,
                      onTap: () {
                        _speakTile(isSindhi ? 'پڙهڻ ۽ لکڻ' : 'حروف شناسی اور پڑھائی');
                        _openLesson(0);
                      },
                    ),

                    // Tile 2: Basic Maths
                    _buildBigTile(
                      title: isSindhi ? 'بنيادي حساب' : 'بنیادی ریاضی و گنتی',
                      subtitle: isSindhi ? 'انگ، جوڙ ۽ ڪٽ' : 'Basic Numbers & Maths',
                      emoji: '🔢',
                      color: const Color(0xFF43A047), // Green
                      fontFamily: fontFamily,
                      onTap: () {
                        _speakTile(isSindhi ? 'بنيادي حساب' : 'بنیادی ریاضی اور گنتی');
                        _openLesson(1);
                      },
                    ),

                    // Tile 3: Farming and Animals
                    _buildBigTile(
                      title: isSindhi ? 'ٻني ٻارو ۽ مال' : 'زراعت اور مویشی',
                      subtitle: isSindhi ? 'چانور، ٻڪريون ۽ حساب' : 'Farming & Livestock',
                      emoji: '🌾',
                      color: const Color(0xFFFB8C00), // Orange
                      fontFamily: fontFamily,
                      onTap: () {
                        _speakTile(isSindhi ? 'ٻني ٻارو ۽ مال' : 'زراعت اور مویشی');
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (ctx) => AppliedLessonScreen(
                              profile: widget.profile,
                              language: widget.language,
                              topic: AppliedTopic.riceFarming,
                            ),
                          ),
                        );
                      },
                    ),

                    // Tile 4: Health and Safety
                    _buildBigTile(
                      title: isSindhi ? 'صحت ۽ حفاظت' : 'صحت اور ہنگامی مدد',
                      subtitle: isSindhi ? 'ايمرجنسي ۽ تندرستي' : 'Health & Emergency',
                      emoji: '🏥',
                      color: const Color(0xFFE53935), // Red
                      fontFamily: fontFamily,
                      onTap: () {
                        _speakTile(isSindhi ? 'صحت ۽ حفاظت' : 'صحت اور ہنگامی مدد');
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (ctx) => SafetyEmergencyScreen(language: widget.language),
                          ),
                        );
                      },
                    ),
                  ],
                ),

                const SizedBox(height: 20),

                // Next Step Quick Access Buttons
                Text(
                  isSindhi ? 'بنيادي اسباق (Lessons 1-3):' : 'بنیادی اسباق کی فوری فہرست (Lessons 1 to 3):',
                  style: TextStyle(fontFamily: fontFamily, fontSize: 14, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),

                _buildLessonListTile(
                  index: 0,
                  title: isSindhi ? 'سبق 1: اکر الف ۽ آواز (Letters & Sounds)' : 'سبق 1: حرف الف اور صوتیات',
                  subtitle: 'سنیں اور ٹیپ کریں • انگلی سے ٹریسنگ • 5 سوالات',
                  fontFamily: fontFamily,
                ),
                const SizedBox(height: 8),

                _buildLessonListTile(
                  index: 1,
                  title: isSindhi ? 'سبق 2: انگ ۽ ڳڻپ 1 کان 5 (Counting 1 to 5)' : 'سبق 2: بنیادی گنتی 1 سے 5',
                  subtitle: 'اشیاء کی گنتی • عدد 2 کی ٹریسنگ • ریاضی جانچ',
                  fontFamily: fontFamily,
                ),
                const SizedBox(height: 8),

                _buildLessonListTile(
                  index: 2,
                  title: isSindhi ? 'سبق 3: اکر ٻ ۽ روزانو لفظ (Words & Livestock)' : 'سبق 3: حرف ب اور روزمرہ الفاظ',
                  subtitle: 'بکری اور بستہ • حرف ب کی ٹریسنگ • فہم جانچ',
                  fontFamily: fontFamily,
                ),

                const SizedBox(height: 20),

                // Applied Pathways & Practical Tools
                Text(
                  isSindhi ? 'عملي سبق ۽ اوزار (Applied Tools):' : 'عملی مہارت اور معاون ٹولز (Applied Tools):',
                  style: TextStyle(fontFamily: fontFamily, fontSize: 14, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),

                // Tool 1: Rice Farming & Profit Calculator
                ListTile(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  tileColor: Colors.white,
                  leading: const CircleAvatar(backgroundColor: Color(0xFFE8F5E9), child: Text('🌾')),
                  title: Text(
                    isSindhi ? 'چانورن جي پوک ۽ منافعي جو حساب' : 'دھان کی کاشت اور منافع کا کیلکولیٹر',
                    style: TextStyle(fontFamily: fontFamily, fontSize: 13, fontWeight: FontWeight.bold),
                  ),
                  subtitle: const Text('پنیری کا وقت • کھاد • [DEMO] منافع کا تخمینہ', style: TextStyle(fontSize: 11)),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 14),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (ctx) => AppliedLessonScreen(
                          profile: widget.profile,
                          language: widget.language,
                          topic: AppliedTopic.riceFarming,
                        ),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 8),

                // Tool 2: Goats / Livestock
                ListTile(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  tileColor: Colors.white,
                  leading: const CircleAvatar(backgroundColor: Color(0xFFFFF3E0), child: Text('🐐')),
                  title: Text(
                    isSindhi ? 'ٻڪريون ۽ مال مويشي سار سنڀال' : 'بھیڑ بکریاں اور مال مویشی کی دیکھ بھال',
                    style: TextStyle(fontFamily: fontFamily, fontSize: 13, fontWeight: FontWeight.bold),
                  ),
                  subtitle: const Text('ویکسین شیڈول • چارہ اور دودھ کی افزائش', style: TextStyle(fontSize: 11)),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 14),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (ctx) => AppliedLessonScreen(
                          profile: widget.profile,
                          language: widget.language,
                          topic: AppliedTopic.livestockCare,
                        ),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 8),

                // Tool 3: Household Health & ORS
                ListTile(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  tileColor: Colors.white,
                  leading: const CircleAvatar(backgroundColor: Color(0xFFE0F7FA), child: Text('💧')),
                  title: Text(
                    isSindhi ? 'گھرو صحت، صفائي ۽ نمڪول (ORS)' : 'گھریلو صحت، پینے کا پانی اور نمکول (ORS)',
                    style: TextStyle(fontFamily: fontFamily, fontSize: 13, fontWeight: FontWeight.bold),
                  ),
                  subtitle: const Text('پانی ابالنا • او آر ایس کی تیاری کے 4 مراحل', style: TextStyle(fontSize: 11)),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 14),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (ctx) => AppliedLessonScreen(
                          profile: widget.profile,
                          language: widget.language,
                          topic: AppliedTopic.householdHealth,
                        ),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 8),

                // Tool 4: Scripted AI Tutor
                ListTile(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  tileColor: const Color(0xFFE3F2FD),
                  leading: const CircleAvatar(backgroundColor: Color(0xFF1976D2), foregroundColor: Colors.white, child: Icon(Icons.smart_toy, size: 20)),
                  title: Text(
                    isSindhi ? 'اي آءِ استاد سان ڳالهه ٻولهه (AI Tutor)' : 'اے آئی استاد کے ساتھ بات چیت (AI Tutor)',
                    style: TextStyle(fontFamily: fontFamily, fontSize: 13, fontWeight: FontWeight.bold),
                  ),
                  subtitle: const Text('[SCRIPTED DEMO] نصابی سوالات کے فوری جوابات', style: TextStyle(fontSize: 11)),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 14),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (ctx) => ScriptedTutorScreen(language: widget.language),
                      ),
                    );
                  },
                ),
                const SizedBox(height: 8),

                // Tool 5: Facilitator Dashboard
                ListTile(
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  tileColor: const Color(0xFFE0F2F1),
                  leading: const CircleAvatar(backgroundColor: Color(0xFF004D40), foregroundColor: Colors.white, child: Icon(Icons.dashboard, size: 20)),
                  title: Text(
                    isSindhi ? 'ڳوٺ جي سهولتڪار جو ڊيش بورڊ' : 'دیہی سہولت کار ڈیش بورڈ (Facilitator)',
                    style: TextStyle(fontFamily: fontFamily, fontSize: 13, fontWeight: FontWeight.bold),
                  ),
                  subtitle: const Text('[DEMO DASHBOARD] 48 طلبہ • آف لائن سنک لاگ', style: TextStyle(fontSize: 11)),
                  trailing: const Icon(Icons.arrow_forward_ios, size: 14),
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (ctx) => FacilitatorDashboardScreen(language: widget.language),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildBigTile({
    required String title,
    required String subtitle,
    required String emoji,
    required Color color,
    required String fontFamily,
    required VoidCallback onTap,
  }) {
    return Material(
      color: Colors.white,
      borderRadius: BorderRadius.circular(20),
      elevation: 2,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(20),
        child: Container(
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: color.withValues(alpha: 0.3), width: 1.5),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 56,
                height: 56,
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.12),
                  shape: BoxShape.circle,
                ),
                alignment: Alignment.center,
                child: Text(emoji, style: const TextStyle(fontSize: 30)),
              ),
              const SizedBox(height: 10),
              Text(
                title,
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontFamily: fontFamily,
                  fontSize: 15,
                  fontWeight: FontWeight.bold,
                  color: const Color(0xFF212121),
                ),
              ),
              const SizedBox(height: 2),
              Text(
                subtitle,
                textAlign: TextAlign.center,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: TextStyle(
                  fontSize: 11,
                  color: Colors.grey.shade600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLessonListTile({
    required int index,
    required String title,
    required String subtitle,
    required String fontFamily,
  }) {
    return Material(
      color: Colors.white,
      borderRadius: BorderRadius.circular(14),
      elevation: 1,
      child: ListTile(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        leading: CircleAvatar(
          backgroundColor: const Color(0xFFE8F5E9),
          child: Text('${index + 1}', style: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF1B5E20))),
        ),
        title: Text(title, style: TextStyle(fontFamily: fontFamily, fontWeight: FontWeight.bold, fontSize: 14)),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 12)),
        trailing: const Icon(Icons.play_circle_fill, color: Color(0xFF2E7D32), size: 28),
        onTap: () => _openLesson(index),
      ),
    );
  }
}
