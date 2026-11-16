import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/learner_profile.dart';

class LocalStorageService {
  static const String _profilesKey = 'tst_family_profiles';
  static const String _activeProfileIdKey = 'tst_active_profile_id';
  static const String _appLanguageKey = 'tst_app_language';

  static Future<List<LearnerProfile>> loadProfiles() async {
    final prefs = await SharedPreferences.getInstance();
    final jsonStr = prefs.getString(_profilesKey);
    if (jsonStr == null || jsonStr.isEmpty) {
      // Return initial pre-seeded profiles for instant demo
      final initialProfiles = [
        const LearnerProfile(
          id: 'p1',
          name: 'زینب (Zainab)',
          avatar: '👧',
          ageGroup: 'child',
          literacyLevel: 'Level 0: Non-reader',
          suggestedPathway: 'Foundation Literacy (حروف شناسی)',
          progressStars: 5,
        ),
        const LearnerProfile(
          id: 'p2',
          name: 'علی (Ali)',
          avatar: '👦',
          ageGroup: 'child',
          literacyLevel: 'Level 1: Letter Sounds',
          suggestedPathway: 'Foundation Numeracy (بنیادی حساب)',
          progressStars: 12,
        ),
        const LearnerProfile(
          id: 'p3',
          name: 'بابا - محمد (Baba)',
          avatar: '👨',
          ageGroup: 'adult',
          literacyLevel: 'Level 1: Practical',
          suggestedPathway: 'Rice Farming (چانورن جي پوک)',
          progressStars: 8,
        ),
      ];
      await saveProfiles(initialProfiles);
      return initialProfiles;
    }

    try {
      final List<dynamic> list = json.decode(jsonStr);
      return list.map((item) => LearnerProfile.fromMap(item)).toList();
    } catch (_) {
      return [];
    }
  }

  static Future<void> saveProfiles(List<LearnerProfile> profiles) async {
    final prefs = await SharedPreferences.getInstance();
    final list = profiles.map((p) => p.toMap()).toList();
    await prefs.setString(_profilesKey, json.encode(list));
  }

  static Future<void> addProfile(LearnerProfile profile) async {
    final current = await loadProfiles();
    if (current.length < 6) {
      current.add(profile);
      await saveProfiles(current);
    }
  }

  static Future<void> updateProfile(LearnerProfile updated) async {
    final current = await loadProfiles();
    final idx = current.indexWhere((p) => p.id == updated.id);
    if (idx != -1) {
      current[idx] = updated;
      await saveProfiles(current);
    }
  }

  static Future<void> deleteProfile(String id) async {
    final current = await loadProfiles();
    current.removeWhere((p) => p.id == id);
    await saveProfiles(current);
  }

  static Future<void> setActiveProfileId(String id) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_activeProfileIdKey, id);
  }

  static Future<String?> getActiveProfileId() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_activeProfileIdKey);
  }

  static Future<void> saveLanguageCode(String code) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_appLanguageKey, code);
  }

  static Future<String> getLanguageCode() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_appLanguageKey) ?? 'ur';
  }
}
