import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:taleem_se_taraqqi/core/i18n/language_manager.dart';
import 'package:taleem_se_taraqqi/core/i18n/app_strings.dart';
import 'package:taleem_se_taraqqi/features/onboarding/hello_screen.dart';

void main() {
  group('i18n and RTL Directionality Tests', () {
    test('Urdu language config is RTL and maps to Noto Naskh Arabic by default', () {
      const urdu = AppLanguage.urdu;
      expect(urdu.direction, TextDirection.rtl);
      expect(urdu.isRtl, isTrue);

      const settings = LanguageSettings(currentLanguage: urdu);
      expect(settings.primaryFontFamily, 'NotoNaskhArabic');

      final nastaliqSettings = settings.copyWith(useNastaliqStyle: true);
      expect(nastaliqSettings.primaryFontFamily, 'NotoNastaliqUrdu');
    });

    test('Sindhi language config is RTL and maps to Noto Naskh Arabic', () {
      const sindhi = AppLanguage.sindhi;
      expect(sindhi.direction, TextDirection.rtl);
      expect(sindhi.isRtl, isTrue);

      const settings = LanguageSettings(currentLanguage: sindhi);
      expect(settings.primaryFontFamily, 'NotoNaskhArabic');
    });

    test('English language config is LTR and maps to standard font', () {
      const english = AppLanguage.english;
      expect(english.direction, TextDirection.ltr);
      expect(english.isRtl, isFalse);

      const settings = LanguageSettings(currentLanguage: english);
      expect(settings.primaryFontFamily, 'Roboto');
    });

    test('Translations are non-empty for all core keys in Urdu, Sindhi, and English', () {
      final keys = [
        'appTitle',
        'tagline',
        'hello',
        'selectLanguage',
        'startLearning',
        'listenPrompt',
        'offlineMode',
        'liveAiMode',
        'emergencyHelp',
      ];

      for (final lang in [AppLanguage.urdu, AppLanguage.sindhi, AppLanguage.english]) {
        for (final key in keys) {
          final translation = AppStrings.get(key, lang);
          expect(translation, isNotEmpty, reason: 'Key $key must exist for ${lang.code}');
        }
      }
    });

    testWidgets('HelloScreen renders initial Urdu RTL layout and switches to Sindhi and English', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: HelloScreen(),
        ),
      );
      await tester.pumpAndSettle();

      // Check initial Urdu text
      expect(find.text('تعلیم سے ترقی'), findsOneWidget);
      expect(find.text('خوش آمدید! آئیے سیکھنا شروع کریں۔'), findsOneWidget);

      // Tap Sindhi language button
      await tester.tap(find.text('سنڌي'));
      await tester.pumpAndSettle();

      // Verify Sindhi text rendered
      expect(find.text('تعليم مان ترقي'), findsOneWidget);
      expect(find.text('ڀلي ڪري آيا! اچو سکڻ شروع ڪريون.'), findsOneWidget);

      // Tap English language button
      await tester.tap(find.text('English'));
      await tester.pumpAndSettle();

      // Verify English text rendered
      expect(find.text('Taleem Se Taraqqi'), findsOneWidget);
      expect(find.text('Hello! Welcome to learning.'), findsOneWidget);
    });
  });
}
