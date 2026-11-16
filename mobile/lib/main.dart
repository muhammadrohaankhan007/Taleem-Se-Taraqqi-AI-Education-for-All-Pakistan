import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'core/i18n/language_manager.dart';
import 'features/onboarding/hello_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const TaleemApp());
}

class TaleemApp extends StatelessWidget {
  const TaleemApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Taleem Se Taraqqi',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        primaryColor: const Color(0xFF1B5E20),
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF2E7D32),
          primary: const Color(0xFF1B5E20),
          secondary: const Color(0xFF388E3C),
        ),
        fontFamily: 'NotoNaskhArabic',
      ),
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: AppLanguage.values.map((l) => l.locale).toList(),
      home: const HelloScreen(),
    );
  }
}
