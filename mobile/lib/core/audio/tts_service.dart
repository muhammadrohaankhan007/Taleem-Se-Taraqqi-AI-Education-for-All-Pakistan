import 'package:flutter/foundation.dart';
import 'package:flutter_tts/flutter_tts.dart';

class TtsService {
  static final TtsService _instance = TtsService._internal();
  factory TtsService() => _instance;
  TtsService._internal();

  final FlutterTts _flutterTts = FlutterTts();
  bool _initialized = false;
  List<dynamic> _availableVoices = [];
  bool _isSpeaking = false;

  bool get isSpeaking => _isSpeaking;

  Future<void> init() async {
    if (_initialized) return;
    try {
      if (kIsWeb) {
        await _flutterTts.setSpeechRate(0.9);
        await _flutterTts.setPitch(1.0);
      }
      final voices = await _flutterTts.getVoices;
      if (voices is List) {
        _availableVoices = voices;
      }
      _flutterTts.setStartHandler(() {
        _isSpeaking = true;
      });
      _flutterTts.setCompletionHandler(() {
        _isSpeaking = false;
      });
      _flutterTts.setErrorHandler((msg) {
        _isSpeaking = false;
      });
      _initialized = true;
    } catch (e) {
      debugPrint('TTS init error (non-fatal): $e');
    }
  }

  /// Checks whether the browser/OS has a voice that matches language code.
  Future<bool> hasVoiceForLanguage(String langCode) async {
    await init();
    try {
      final isAvailable = await _flutterTts.isLanguageAvailable(langCode);
      if (isAvailable == true || isAvailable == 1) {
        return true;
      }
      // Check voices list
      for (final voice in _availableVoices) {
        if (voice is Map) {
          final locale = (voice['locale'] ?? '').toString().toLowerCase();
          if (locale.startsWith(langCode.toLowerCase())) {
            return true;
          }
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  Future<bool> speak(String text, String langCode) async {
    await init();
    try {
      await _flutterTts.stop();
      final targetLang = _mapLanguageCode(langCode);
      await _flutterTts.setLanguage(targetLang);
      final result = await _flutterTts.speak(text);
      return result == 1;
    } catch (e) {
      debugPrint('TTS speak error: $e');
      return false;
    }
  }

  Future<void> stop() async {
    try {
      await _flutterTts.stop();
      _isSpeaking = false;
    } catch (_) {}
  }

  String _mapLanguageCode(String code) {
    switch (code.toLowerCase()) {
      case 'ur':
      case 'urdu':
        return 'ur-PK';
      case 'sd':
      case 'sindhi':
        return 'sd-PK';
      default:
        return 'en-US';
    }
  }
}
