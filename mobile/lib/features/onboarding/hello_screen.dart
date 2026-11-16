import 'package:flutter/material.dart';
import '../../core/i18n/language_manager.dart';
import '../../core/i18n/app_strings.dart';
import '../../core/audio/tts_service.dart';
import '../common/prototype_limits_sheet.dart';
import '../profiles/family_profiles_screen.dart';

class HelloScreen extends StatefulWidget {
  const HelloScreen({super.key});

  @override
  State<HelloScreen> createState() => _HelloScreenState();
}

class _HelloScreenState extends State<HelloScreen> {
  LanguageSettings _settings = const LanguageSettings(
    currentLanguage: AppLanguage.urdu,
    useNastaliqStyle: false,
  );

  final TtsService _tts = TtsService();
  bool _hasVoice = true;
  bool _isPlayingVoice = false;

  @override
  void initState() {
    super.initState();
    _checkVoiceAvailability(AppLanguage.urdu);
  }

  Future<void> _checkVoiceAvailability(AppLanguage lang) async {
    final available = await _tts.hasVoiceForLanguage(lang.code);
    if (mounted) {
      setState(() {
        _hasVoice = available;
      });
    }
  }

  Future<void> _speakWelcome(AppLanguage lang) async {
    setState(() => _isPlayingVoice = true);
    final text = AppStrings.get('hello', lang);
    await _tts.speak(text, lang.code);
    if (mounted) {
      setState(() => _isPlayingVoice = false);
    }
  }

  void _onLanguageSelected(AppLanguage lang) {
    setState(() {
      _settings = _settings.copyWith(currentLanguage: lang);
    });
    _checkVoiceAvailability(lang);
    _speakWelcome(lang);
  }

  void _toggleNastaliq() {
    setState(() {
      _settings = _settings.copyWith(
        useNastaliqStyle: !_settings.useNastaliqStyle,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    final lang = _settings.currentLanguage;
    final textDirection = lang.direction;
    final fontFamily = _settings.primaryFontFamily;

    return Directionality(
      textDirection: textDirection,
      child: Scaffold(
        backgroundColor: const Color(0xFFF7FAF7),
        appBar: AppBar(
          backgroundColor: const Color(0xFF1B5E20), // Forest Green
          foregroundColor: Colors.white,
          title: Text(
            AppStrings.get('appTitle', lang),
            style: TextStyle(
              fontFamily: fontFamily,
              fontSize: 22,
              fontWeight: FontWeight.bold,
            ),
          ),
          centerTitle: true,
          actions: [
            if (lang == AppLanguage.urdu)
              IconButton(
                icon: Icon(
                  _settings.useNastaliqStyle
                      ? Icons.font_download
                      : Icons.font_download_outlined,
                ),
                tooltip: 'Nastaliq Font Toggle',
                onPressed: _toggleNastaliq,
              ),
            IconButton(
              icon: const Icon(Icons.help_outline),
              tooltip: "What's Real / What's Simulated",
              onPressed: () => PrototypeLimitsSheet.show(context),
            ),
          ],
        ),
        body: SafeArea(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Top Honest DEMO Banner
                InkWell(
                  onTap: () => PrototypeLimitsSheet.show(context),
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFF3E0),
                      border: Border.all(color: const Color(0xFFFFB74D)),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Row(
                      children: [
                        Icon(Icons.warning_amber_rounded, size: 20, color: Color(0xFFE65100)),
                        SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            "[DEMO PROTOTYPE] Click here to see What's Real vs. What's Simulated",
                            style: TextStyle(
                              fontSize: 12,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFFE65100),
                            ),
                          ),
                        ),
                        Icon(Icons.arrow_forward_ios, size: 12, color: Color(0xFFE65100)),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 12),

                // Spoken Guidance Bar with Voice-Play Button
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFE8F5E9),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFFC8E6C9)),
                  ),
                  child: Row(
                    children: [
                      Material(
                        color: _isPlayingVoice ? const Color(0xFF43A047) : const Color(0xFF2E7D32),
                        shape: const CircleBorder(),
                        child: InkWell(
                          customBorder: const CircleBorder(),
                          onTap: () => _speakWelcome(lang),
                          child: Container(
                            width: 48,
                            height: 48,
                            alignment: Alignment.center,
                            child: Icon(
                              _isPlayingVoice ? Icons.graphic_eq : Icons.volume_up,
                              color: Colors.white,
                              size: 26,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              AppStrings.get('tagline', lang),
                              style: TextStyle(
                                fontFamily: fontFamily,
                                fontSize: 14,
                                color: const Color(0xFF1B5E20),
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              lang == AppLanguage.urdu
                                  ? 'آواز سننے کے لیے اسپیکر پر ٹیپ کریں'
                                  : (lang == AppLanguage.sindhi
                                      ? 'آواز ٻڌڻ لاءِ اسپيڪر تي ٽيپ ڪريو'
                                      : 'Tap the speaker to hear voice guidance'),
                              style: TextStyle(
                                fontFamily: fontFamily,
                                fontSize: 12,
                                color: Colors.grey.shade700,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),

                // Voice Availability Warning (Honest browser TTS check)
                if (!_hasVoice) ...[
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                    decoration: BoxDecoration(
                      color: const Color(0xFFEDE7F6),
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: const Color(0xFFD1C4E9)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.record_voice_over_outlined, size: 16, color: Color(0xFF4A148C)),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            lang == AppLanguage.sindhi
                                ? '[صوتي سھولت ناپيد - ٽيڪسٽ موڊ فعال] (Browser lacks Sindhi voice)'
                                : '[صوتی سہولت موجود نہیں - ٹیکسٹ موڈ فعال] (Browser lacks voice for ${lang.nativeName})',
                            style: TextStyle(
                              fontFamily: fontFamily,
                              fontSize: 11,
                              color: const Color(0xFF4A148C),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ],

                const SizedBox(height: 16),

                // Welcome Card
                Container(
                  padding: const EdgeInsets.all(20),
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
                      const Icon(
                        Icons.school,
                        size: 60,
                        color: Color(0xFF2E7D32),
                      ),
                      const SizedBox(height: 10),
                      Text(
                        AppStrings.get('hello', lang),
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontFamily: fontFamily,
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                          color: const Color(0xFF212121),
                          height: 1.3,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        AppStrings.get('listenPrompt', lang),
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontFamily: fontFamily,
                          fontSize: 14,
                          color: Colors.grey.shade700,
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 20),

                // Picture-Based Language Choice Header
                Text(
                  AppStrings.get('selectLanguage', lang),
                  style: TextStyle(
                    fontFamily: fontFamily,
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: const Color(0xFF212121),
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 4),
                Text(
                  lang == AppLanguage.urdu
                      ? 'تصویر یا زبان پر ٹیپ کر کے انتخاب کریں'
                      : (lang == AppLanguage.sindhi
                          ? 'تصوير يا ٻولي تي ٽيپ ڪري چونڊيو'
                          : 'Choose by tapping an icon or language'),
                  style: TextStyle(
                    fontFamily: fontFamily,
                    fontSize: 13,
                    color: Colors.grey.shade600,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: 12),

                // Picture-Based Language Choice Tiles (Large touch targets >= 72dp)
                Row(
                  children: [
                    Expanded(
                      child: _PictureLanguageCard(
                        language: AppLanguage.urdu,
                        icon: Icons.menu_book,
                        emoji: '📖',
                        subtitle: 'اردو',
                        isSelected: lang == AppLanguage.urdu,
                        fontFamily: fontFamily,
                        onTap: () => _onLanguageSelected(AppLanguage.urdu),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: _PictureLanguageCard(
                        language: AppLanguage.sindhi,
                        icon: Icons.landscape,
                        emoji: '🏺',
                        subtitle: 'سنڌي',
                        isSelected: lang == AppLanguage.sindhi,
                        fontFamily: fontFamily,
                        onTap: () => _onLanguageSelected(AppLanguage.sindhi),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: _PictureLanguageCard(
                        language: AppLanguage.english,
                        icon: Icons.language,
                        emoji: '🌐',
                        subtitle: 'English',
                        isSelected: lang == AppLanguage.english,
                        fontFamily: fontFamily,
                        onTap: () => _onLanguageSelected(AppLanguage.english),
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 24),

                // Primary Start Button (Navigates to Family Profiles)
                SizedBox(
                  height: 56,
                  child: ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color(0xFF2E7D32),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      elevation: 3,
                    ),
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (ctx) => FamilyProfilesScreen(language: lang),
                        ),
                      );
                    },
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          AppStrings.get('startLearning', lang),
                          style: TextStyle(
                            fontFamily: fontFamily,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(width: 12),
                        Transform.scale(
                          scaleX: textDirection == TextDirection.rtl ? -1 : 1,
                          child: const Icon(Icons.arrow_forward),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 16),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _PictureLanguageCard extends StatelessWidget {
  final AppLanguage language;
  final IconData icon;
  final String emoji;
  final String subtitle;
  final bool isSelected;
  final String fontFamily;
  final VoidCallback onTap;

  const _PictureLanguageCard({
    required this.language,
    required this.icon,
    required this.emoji,
    required this.subtitle,
    required this.isSelected,
    required this.fontFamily,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: isSelected ? const Color(0xFF2E7D32) : Colors.white,
      borderRadius: BorderRadius.circular(16),
      elevation: isSelected ? 4 : 1,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Container(
          constraints: const BoxConstraints(minHeight: 84),
          padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 4),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(16),
            border: Border.all(
              color: isSelected ? const Color(0xFF1B5E20) : const Color(0xFFE0E0E0),
              width: isSelected ? 2.5 : 1,
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                emoji,
                style: const TextStyle(fontSize: 26),
              ),
              const SizedBox(height: 4),
              Text(
                subtitle,
                style: TextStyle(
                  fontFamily: fontFamily,
                  fontSize: 15,
                  fontWeight: FontWeight.bold,
                  color: isSelected ? Colors.white : const Color(0xFF212121),
                ),
              ),
              const SizedBox(height: 2),
              Icon(
                Icons.volume_up,
                size: 14,
                color: isSelected ? Colors.white70 : Colors.grey.shade500,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
