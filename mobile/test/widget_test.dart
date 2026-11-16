import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:taleem_se_taraqqi/main.dart';

void main() {
  testWidgets('App boots in Urdu RTL, switching to Sindhi and English changes text and direction without restart', (WidgetTester tester) async {
    // 1. Boot app
    await tester.pumpWidget(const TaleemApp());
    await tester.pumpAndSettle();

    // Verify initial boot is in Urdu (RTL)
    final urduDirectionFinder = find.byWidgetPredicate(
      (widget) => widget is Directionality && widget.textDirection == TextDirection.rtl,
    );
    expect(urduDirectionFinder, findsWidgets, reason: 'Urdu boot must be RTL');
    expect(find.text('تعلیم سے ترقی'), findsOneWidget, reason: 'App title must be Urdu');
    expect(find.text('خوش آمدید! آئیے سیکھنا شروع کریں۔'), findsOneWidget, reason: 'Urdu greeting');

    // 2. Switch to Sindhi (RTL)
    await tester.tap(find.text('سنڌي'));
    await tester.pumpAndSettle();

    final sindhiDirectionFinder = find.byWidgetPredicate(
      (widget) => widget is Directionality && widget.textDirection == TextDirection.rtl,
    );
    expect(sindhiDirectionFinder, findsWidgets, reason: 'Sindhi must be RTL');
    expect(find.text('تعليم مان ترقي'), findsOneWidget, reason: 'App title must be Sindhi');
    expect(find.text('ڀلي ڪري آيا! اچو سکڻ شروع ڪريون.'), findsOneWidget, reason: 'Sindhi greeting');

    // 3. Switch to English (LTR) without restart
    await tester.tap(find.text('English'));
    await tester.pumpAndSettle();

    final englishDirectionFinder = find.byWidgetPredicate(
      (widget) => widget is Directionality && widget.textDirection == TextDirection.ltr,
    );
    expect(englishDirectionFinder, findsWidgets, reason: 'English must be LTR');
    expect(find.text('Taleem Se Taraqqi'), findsOneWidget, reason: 'App title must be English');
    expect(find.text('Hello! Welcome to learning.'), findsOneWidget, reason: 'English greeting');
  });
}
