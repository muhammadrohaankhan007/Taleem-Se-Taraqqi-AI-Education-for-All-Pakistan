import 'package:flutter/material.dart';

enum AppLanguage {
  urdu('ur', 'اُردُو', 'Urdu', TextDirection.rtl, 'assets/ui_audio/lang_ur.ogg'),
  sindhi('sd', 'سنڌي', 'Sindhi', TextDirection.rtl, 'assets/ui_audio/lang_sd.ogg'),
  english('en', 'English', 'English', TextDirection.ltr, 'assets/ui_audio/lang_en.ogg'),
  punjabi('pa', 'پنجابی', 'Punjabi', TextDirection.rtl, 'assets/ui_audio/lang_pa.ogg'),
  pashto('ps', 'پښتو', 'Pashto', TextDirection.rtl, 'assets/ui_audio/lang_ps.ogg'),
  balochi('bal', 'بلوچی', 'Balochi', TextDirection.rtl, 'assets/ui_audio/lang_bal.ogg');

  final String code;
  final String nativeName;
  final String englishName;
  final TextDirection direction;
  final String spokenAudioRef;

  const AppLanguage(
    this.code,
    this.nativeName,
    this.englishName,
    this.direction,
    this.spokenAudioRef,
  );

  bool get isRtl => direction == TextDirection.rtl;

  Locale get locale => Locale(code);

  static AppLanguage fromCode(String code) {
    return AppLanguage.values.firstWhere(
      (lang) => lang.code == code,
      orElse: () => AppLanguage.urdu,
    );
  }
}

class LanguageSettings {
  final AppLanguage currentLanguage;
  final bool useNastaliqStyle;
  final bool useEasternDigits;

  const LanguageSettings({
    this.currentLanguage = AppLanguage.urdu,
    this.useNastaliqStyle = false,
    this.useEasternDigits = false,
  });

  String get primaryFontFamily {
    if (currentLanguage == AppLanguage.english) {
      return 'Roboto';
    }
    if (currentLanguage == AppLanguage.urdu && useNastaliqStyle) {
      return 'NotoNastaliqUrdu';
    }
    // Default Arabic script font for Urdu, Sindhi, Pashto, Balochi, Punjabi
    return 'NotoNaskhArabic';
  }

  LanguageSettings copyWith({
    AppLanguage? currentLanguage,
    bool? useNastaliqStyle,
    bool? useEasternDigits,
  }) {
    return LanguageSettings(
      currentLanguage: currentLanguage ?? this.currentLanguage,
      useNastaliqStyle: useNastaliqStyle ?? this.useNastaliqStyle,
      useEasternDigits: useEasternDigits ?? this.useEasternDigits,
    );
  }
}
