import 'dart:io';
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('Font Asset Integrity and Licensing Tests', () {
    const regularPath = 'assets/fonts/NotoNaskhArabic-Regular.ttf';
    const boldPath = 'assets/fonts/NotoNaskhArabic-Bold.ttf';
    const nastaliqPath = 'assets/fonts/NotoNastaliqUrdu-Regular.ttf';
    const licensePath = 'assets/fonts/OFL.txt';

    test('All registered Noto font files and SIL OFL license exist on disk', () {
      expect(File(regularPath).existsSync(), isTrue, reason: 'Regular font must exist');
      expect(File(boldPath).existsSync(), isTrue, reason: 'Bold font must exist');
      expect(File(nastaliqPath).existsSync(), isTrue, reason: 'Nastaliq font must exist');
      expect(File(licensePath).existsSync(), isTrue, reason: 'SIL OFL license file must exist');

      final licenseContent = File(licensePath).readAsStringSync();
      expect(licenseContent.contains('SIL OPEN FONT LICENSE'), isTrue,
          reason: 'License must be SIL Open Font License');
    });

    test('Registered fonts are genuine distinct files and not byte-identical duplicates', () {
      final regularBytes = File(regularPath).readAsBytesSync();
      final boldBytes = File(boldPath).readAsBytesSync();
      final nastaliqBytes = File(nastaliqPath).readAsBytesSync();

      expect(regularBytes.length, greaterThan(10000));
      expect(boldBytes.length, greaterThan(10000));
      expect(nastaliqBytes.length, greaterThan(100000));

      // Assert none are byte-identical copies of each other (preventing Arial copy issue)
      expect(regularBytes.length == boldBytes.length && _bytesEqual(regularBytes, boldBytes), isFalse,
          reason: 'Regular and Bold fonts must not be byte-identical');
      expect(regularBytes.length == nastaliqBytes.length && _bytesEqual(regularBytes, nastaliqBytes), isFalse,
          reason: 'Naskh Regular and Nastaliq Regular fonts must not be byte-identical');
      expect(boldBytes.length == nastaliqBytes.length && _bytesEqual(boldBytes, nastaliqBytes), isFalse,
          reason: 'Naskh Bold and Nastaliq Regular fonts must not be byte-identical');
    });

    test('pubspec.yaml registers the exact Noto font families and files', () {
      final pubspec = File('pubspec.yaml').readAsStringSync();
      expect(pubspec.contains('family: NotoNaskhArabic'), isTrue);
      expect(pubspec.contains('- asset: assets/fonts/NotoNaskhArabic-Regular.ttf'), isTrue);
      expect(pubspec.contains('- asset: assets/fonts/NotoNaskhArabic-Bold.ttf'), isTrue);
      expect(pubspec.contains('family: NotoNastaliqUrdu'), isTrue);
      expect(pubspec.contains('- asset: assets/fonts/NotoNastaliqUrdu-Regular.ttf'), isTrue);
    });
  });
}

bool _bytesEqual(List<int> a, List<int> b) {
  if (a.length != b.length) return false;
  for (int i = 0; i < a.length; i++) {
    if (a[i] != b[i]) return false;
  }
  return true;
}
