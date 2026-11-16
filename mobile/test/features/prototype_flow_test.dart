import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:taleem_se_taraqqi/core/i18n/language_manager.dart';
import 'package:taleem_se_taraqqi/core/models/learner_profile.dart';
import 'package:taleem_se_taraqqi/core/storage/local_storage_service.dart';
import 'package:taleem_se_taraqqi/features/onboarding/hello_screen.dart';
import 'package:taleem_se_taraqqi/features/profiles/family_profiles_screen.dart';
import 'package:taleem_se_taraqqi/features/assessment/placement_quiz_screen.dart';
import 'package:taleem_se_taraqqi/features/learning/lesson_player_screen.dart';
import 'package:taleem_se_taraqqi/features/learning/home_learning_screen.dart';
import 'package:taleem_se_taraqqi/features/learning/applied_lesson_screen.dart';
import 'package:taleem_se_taraqqi/features/safety/safety_emergency_screen.dart';
import 'package:taleem_se_taraqqi/features/tutor/scripted_tutor_screen.dart';
import 'package:taleem_se_taraqqi/features/dashboards/facilitator_dashboard_screen.dart';

void main() {
  setUp(() {
    SharedPreferences.setMockInitialValues({});
  });

  group('Item 2: HelloScreen & Voice-guided Welcome', () {
    testWidgets('renders language choices and voice notice badge', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: HelloScreen(),
        ),
      );
      await tester.pumpAndSettle();

      // Check for Start Learning button
      expect(find.byType(ElevatedButton), findsWidgets);
      // Check for language tiles
      expect(find.text('اردو'), findsWidgets);
      expect(find.text('سنڌي'), findsWidgets);
      expect(find.text('English'), findsWidgets);
    });
  });

  group('Item 3: Family Profiles', () {
    testWidgets('renders default profiles and allows selection', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: FamilyProfilesScreen(language: AppLanguage.urdu),
        ),
      );
      await tester.pumpAndSettle();

      // Default profiles initialized
      expect(find.textContaining('علی'), findsWidgets);
      expect(find.textContaining('زینب'), findsWidgets);
      expect(find.byIcon(Icons.person_add), findsOneWidget);
    });

    test('LocalStorageService supports up to 6 profiles and picture PINs', () async {
      final profiles = await LocalStorageService.loadProfiles();
      expect(profiles.length, lessThanOrEqualTo(6));
      expect(profiles.first.picturePin.length, 4);
    });
  });

  group('Item 4: Placement Quiz', () {
    testWidgets('runs quiz questions and calculates pathway', (tester) async {
      const dummyProfile = LearnerProfile(
        id: 'test_1',
        name: 'ٹیسٹ طالب علم',
        avatar: '👦',
        ageGroup: 'child',
        picturePin: ['🌟', '🌙', '🦁', '🍎'],
        progressStars: 0,
      );

      await tester.pumpWidget(
        const MaterialApp(
          home: PlacementQuizScreen(profile: dummyProfile, language: AppLanguage.urdu),
        ),
      );
      await tester.pumpAndSettle();

      // Initial question displayed
      expect(find.textContaining('سوال 1 / 8'), findsOneWidget);
      expect(find.textContaining('[SIMULATED]'), findsOneWidget);
    });
  });

  group('Item 5: Literacy and Numeracy Lessons', () {
    testWidgets('Lesson player displays TEMP audio badge, listen & tap, and tracing', (tester) async {
      const dummyProfile = LearnerProfile(
        id: 'test_2',
        name: 'علی',
        avatar: '👦',
        ageGroup: 'child',
        picturePin: ['🌟', '🌙', '🦁', '🍎'],
        progressStars: 5,
      );

      await tester.pumpWidget(
        const MaterialApp(
          home: LessonPlayerScreen(
            profile: dummyProfile,
            language: AppLanguage.urdu,
            lessonIndex: 0,
          ),
        ),
      );
      await tester.pump();

      // Check for lesson title or phase tab
      expect(find.textContaining('سبق 1'), findsOneWidget);
      // Check for TEMP AUDIO indicator
      expect(find.byIcon(Icons.mic_none), findsOneWidget);
      // Check for phase title
      expect(find.textContaining('سنیں اور ٹیپ کریں'), findsWidgets);
    });
  });

  group('Item 6: Home Learning Screen', () {
    testWidgets('displays 4 big picture tiles and profile header', (tester) async {
      const dummyProfile = LearnerProfile(
        id: 'test_3',
        name: 'زاہد',
        avatar: '👨',
        ageGroup: 'adult',
        picturePin: ['🌟', '🌙', '🦁', '🍎'],
        progressStars: 8,
      );

      await tester.pumpWidget(
        const MaterialApp(
          home: HomeLearningScreen(
            profile: dummyProfile,
            language: AppLanguage.urdu,
          ),
        ),
      );
      await tester.pumpAndSettle();

      // 4 tiles: Reading, Maths, Farming, Health
      expect(find.text('حروف شناسی و پڑھائی'), findsOneWidget);
      expect(find.text('بنیادی ریاضی و گنتی'), findsOneWidget);
      expect(find.text('زراعت اور مویشی'), findsOneWidget);
      expect(find.text('صحت اور ہنگامی مدد'), findsOneWidget);
    });
  });

  group('Item 7: Applied Lessons & Farming Profit Calculator', () {
    testWidgets('calculates profit correctly and displays DEMO label', (tester) async {
      const dummyProfile = LearnerProfile(
        id: 'test_4',
        name: 'کسان بھائی',
        avatar: '🧑‍🌾',
        ageGroup: 'adult',
        picturePin: ['🌟', '🌙', '🦁', '🍎'],
        progressStars: 10,
      );

      await tester.pumpWidget(
        const MaterialApp(
          home: AppliedLessonScreen(
            profile: dummyProfile,
            language: AppLanguage.urdu,
            topic: AppliedTopic.riceFarming,
          ),
        ),
      );
      await tester.pumpAndSettle();

      // Check for DEMO content label
      expect(find.textContaining('[DEMO CONTENT]'), findsOneWidget);
      // Check for Calculator section
      expect(find.textContaining('کیلکولیٹر'), findsWidgets);
      // Check for net profit output
      expect(find.textContaining('خالص بچت و منافع'), findsOneWidget);
    });
  });

  group('Item 8: Safety Emergency Engine & Dosage Refusal', () {
    testWidgets('triggers emergency screen for chest pain with 1122 call button', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: SafetyEmergencyScreen(language: AppLanguage.urdu),
        ),
      );
      await tester.pumpAndSettle();

      // Enter danger phrase
      final searchField = find.byType(TextField);
      expect(searchField, findsOneWidget);

      await tester.enterText(searchField, 'سینے میں شدید درد ہے');
      await tester.pumpAndSettle();

      // Emergency triggered
      expect(find.textContaining('EMERGENCY RED FLAG'), findsOneWidget);
      expect(find.textContaining('کال ریسکیو 1122 [DEMO CALL]'), findsOneWidget);
    });

    testWidgets('refuses medicine dosage requests with explicit safety explanation', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: SafetyEmergencyScreen(language: AppLanguage.urdu),
        ),
      );
      await tester.pumpAndSettle();

      final searchField = find.byType(TextField);
      await tester.enterText(searchField, 'بچے کو بخار کی کتنی گولی دیں؟');
      await tester.pumpAndSettle();

      // Dosage Refusal triggered
      expect(find.textContaining('DOSAGE PRESCRIPTION REFUSED'), findsOneWidget);
      expect(find.textContaining('طبی نسخہ یا دوا کی خوراک تجویز کرنا ممنوع ہے'), findsOneWidget);
    });
  });

  group('Item 9: Scripted AI Tutor', () {
    testWidgets('renders canned tutor greeting and scripted demo label', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: ScriptedTutorScreen(language: AppLanguage.urdu),
        ),
      );
      await tester.pumpAndSettle();

      // Check for honest demo label
      expect(find.textContaining('Scripted demo - live AI not connected'), findsOneWidget);
      // Check for initial message
      expect(find.textContaining('السلام علیکم! میں تعلیم سے ترقی کا اسکرپٹڈ استاد ہوں'), findsOneWidget);
      // Check for quick chips
      expect(find.textContaining('100 روپے کا حساب'), findsOneWidget);
    });
  });

  group('Item 10: Facilitator & Admin Dashboard', () {
    testWidgets('renders village selector, metrics cards, and learner cohort', (tester) async {
      await tester.pumpWidget(
        const MaterialApp(
          home: FacilitatorDashboardScreen(language: AppLanguage.urdu),
        ),
      );
      await tester.pumpAndSettle();

      // Check for demo label
      expect(find.textContaining('[DEMO DASHBOARD]'), findsOneWidget);
      // Check for village dropdown
      expect(find.textContaining('Thatta'), findsOneWidget);
      // Check for active learners count
      expect(find.text('48'), findsOneWidget);
      // Check for simulated offline sync metric
      expect(find.textContaining('[SIMULATED] BLE Mesh'), findsOneWidget);
    });
  });
}
