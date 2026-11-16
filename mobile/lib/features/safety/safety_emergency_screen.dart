import 'package:flutter/material.dart';
import '../../core/i18n/language_manager.dart';
import '../../core/audio/tts_service.dart';
import '../common/prototype_limits_sheet.dart';

enum SafetyAction { allow, escalateEmergency, refuseDosage }

class SafetyEmergencyScreen extends StatefulWidget {
  final AppLanguage language;

  const SafetyEmergencyScreen({
    super.key,
    required this.language,
  });

  @override
  State<SafetyEmergencyScreen> createState() => _SafetyEmergencyScreenState();
}

class _SafetyEmergencyScreenState extends State<SafetyEmergencyScreen> {
  final TextEditingController _queryController = TextEditingController();
  final TtsService _tts = TtsService();

  SafetyAction _currentAction = SafetyAction.allow;
  String? _emergencyTitle;
  String? _emergencyInstructions;
  String? _referralTarget;

  // Emergency patterns ported from backend/app/safety/rules_engine.py
  final List<Map<String, dynamic>> _emergencyRules = [
    {
      'id': 'EMERG_CHEST_PAIN',
      'patterns': [
        r'سینے\s*میں\s*(شدید\s*)?درد',
        r'سانس\s*رک\s*رہی',
        r'چھاتی\s*میں\s*درد',
        r'chest\s*pain',
        r'difficulty\s*breathing',
        r'سينے\s*۾\s*سور'
      ],
      'title_ur': 'طبی ہنگامی صورتحال: سینے میں شدید درد',
      'title_sd': 'طبي ايمرجنسي: سينئي ۾ سخت سور',
      'instructions_ur':
          '1. مریض کو فوراً بٹھا دیں اور کپڑے ڈھیلے کریں۔\n2. فوری طور پر ایمبولینس (1122) کو کال کریں۔\n3. خود سے گاڑی چلانے کی کوشش نہ کریں۔',
      'instructions_sd':
          '1. مريض کي ويهاريو ۽ ساهه کڻڻ ۾ مدد ڪريو.\n2. فوري ايمبولينس 1122 کي ڪال ڪريو.\n3. اسپتال پهچڻ ۾ دير نه ڪريو.',
      'referral': 'Rescue 1122 / Nearest Emergency Ward',
    },
    {
      'id': 'EMERG_SNAKEBITE',
      'patterns': [
        r'سانپ\s*نے\s*کاٹ',
        r'snake\s*bite',
        r'scorpion\s*sting',
        r'بچھو',
        r'نانگ\s*جو\s*چڪ',
        r'وڇونءَ\s*ڏنگيو'
      ],
      'title_ur': 'ہنگامی الرٹ: سانپ یا بچھو کا کاٹنا',
      'title_sd': 'ايمرجنسي الرٽ: نانگ يا وڇونءَ جو چڪ',
      'instructions_ur':
          '1. مریض کو پرسکون رکھیں اور حرکت نہ کرنے دیں۔\n2. زخم پر کٹ نہ لگائیں اور زہر چوسنے کی کوشش ہرگز نہ کریں۔\n3. متاثرہ عضو کو دل کی سطح سے نیچے رکھیں۔\n4. فوری اینٹی اسنیک وینم (ASV) سنٹر پہنچیں۔',
      'instructions_sd':
          '1. مريض کي سڪون ڏيو ۽ چُرپر کان روڪيو.\n2. زخم تي چڪ يا ڪٽ نه هڻو.\n3. فوري طور ويجھي اسپتال مان اينٽي ويزن ويڪسين لڳرايو.',
      'referral': 'District Headquarter Hospital / Anti-Snake Venom (ASV) Center',
    },
    {
      'id': 'VET_EMERG_DOWN',
      'patterns': [
        r'اٹھ\s*نہیں\s*پا\s*رہی',
        r'بیٹھ\s*گئی\s*ہے',
        r'cannot\s*stand',
        r'downer\s*cow',
        r'ڍڳي\s*اٿي\s*نٿي\s*سگهي',
        r'پيٽ\s*ڦوڪجي\s*ويو',
        r'buffalo\s*down'
      ],
      'title_ur': 'جانوروں کی ایمرجنسی: جانور کا بیٹھ جانا (Downer Animal)',
      'title_sd': 'مال جي ايمرجنسي: ڍڳي يا مينهن بيهي نه سگهڻ',
      'instructions_ur':
          '1. جانور کو نرم جگہ پر سیدھا بٹھائیں، الٹا نہ سونے دیں۔\n2. خود سے نال میں سخت دوائی نہ انڈیلیں۔\n3. فوری ویٹرنری فیلڈ اسٹاف یا ڈاکٹر کو طلب کریں۔',
      'instructions_sd':
          '1. جانور کي سڌو ويهاريو ۽ ساهه جي نالي بند ٿيڻ کان بچايو.\n2. فوري مقامي ويٽرنري آفيسر سان رابطو ڪريو.',
      'referral': 'Local Veterinary Officer / Livestock Dispensary',
    },
    {
      'id': 'EMERG_CONVULSIONS',
      'patterns': [
        r'jhatkay',
        r'fits',
        r'seizures',
        r'جھٹکے',
        r'مرگی',
        r'اکڑ\s*گیا'
      ],
      'title_ur': 'طبی ایمرجنسی: جھٹکے اور مرگی کا دورہ',
      'title_sd': 'طبي ايمرجنسي: مريض کي جهٽڪا لڳڻ',
      'instructions_ur':
          '1. مریض کے ارد گرد سے خطرناک اشیاء ہٹا دیں۔\n2. منہ میں چمچ یا کپڑا نہ ٹھونسیں۔\n3. مریض کو کروٹ کے بل لٹا دیں۔\n4. فوری 1122 کال کریں۔',
      'instructions_sd':
          '1. مريض کي پاسي ڀر ليٽايو ته جيئن ساهه نه ٻوسٽجي.\n2. وات ۾ ڪا شيءِ نه وجھو.\n3. فوري ڊاڪٽر ڏانهن کڻي وڃو.',
      'referral': 'Nearest Hospital Emergency',
    },
  ];

  // Refusal patterns for medical dosage / prescription
  final List<String> _refusePatterns = [
    r'kitni\s*(goli|tablet|dawai)',
    r'paracetamol\s*kitni',
    r'flagyl\s*kitni',
    r'syrup\s*kitna',
    r'dosage',
    r'کتنی\s*گولی',
    r'کتنی\s*خوراک',
    r'کون\s*سی\s*دوا',
    r'دوا\s*کتنی\s*کھائیں',
    r'insulin\s*kitne',
    r'amoxicillin',
    r'ڇا\s*مان\s*هي\s*دوا\s*کائي\s*سگهان'
  ];

  void _analyzeInput(String query) {
    if (query.trim().isEmpty) {
      setState(() {
        _currentAction = SafetyAction.allow;
        _emergencyTitle = null;
        _emergencyInstructions = null;
        _referralTarget = null;
      });
      return;
    }

    // 1. Check Medication Refusal
    for (final pattern in _refusePatterns) {
      if (RegExp(pattern, caseSensitive: false).hasMatch(query)) {
        setState(() {
          _currentAction = SafetyAction.refuseDosage;
          _emergencyTitle = null;
          _emergencyInstructions = null;
          _referralTarget = null;
        });
        _tts.speak(
          widget.language == AppLanguage.sindhi
              ? 'معاف ڪجو! هي ايپ ڪنهن به دوا جي خوراڪ تجويز نٿي ڪري سگهي. ڊاڪٽر سان رجوع ڪريو.'
              : 'معذرت! یہ ایپ دوا یا نسخہ تجویز نہیں کر سکتی۔ برائے کرم مستند ڈاکٹر سے رجوع کریں۔',
          widget.language.code,
        );
        return;
      }
    }

    // 2. Check Emergency Patterns
    for (final rule in _emergencyRules) {
      final patterns = rule['patterns'] as List<String>;
      for (final p in patterns) {
        if (RegExp(p, caseSensitive: false).hasMatch(query)) {
          final isSindhi = widget.language == AppLanguage.sindhi;
          setState(() {
            _currentAction = SafetyAction.escalateEmergency;
            _emergencyTitle = isSindhi ? rule['title_sd'] : rule['title_ur'];
            _emergencyInstructions = isSindhi ? rule['instructions_sd'] : rule['instructions_ur'];
            _referralTarget = rule['referral'];
          });
          _tts.speak(
            isSindhi
                ? 'خبردار! هيمرجنسي ظاهر ٿي آهي. فوري 1122 تي رابطو ڪريو.'
                : 'خبردار! ہنگامی صورتحال ظاہر ہوئی ہے۔ فوری 1122 کال کریں۔',
            widget.language.code,
          );
          return;
        }
      }
    }

    // Default: Allow standard safe educational response
    setState(() {
      _currentAction = SafetyAction.allow;
      _emergencyTitle = null;
      _emergencyInstructions = null;
      _referralTarget = null;
    });
  }

  void _setTestQuery(String phrase) {
    _queryController.text = phrase;
    _analyzeInput(phrase);
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
          backgroundColor: const Color(0xFFC62828), // Red
          foregroundColor: Colors.white,
          title: Text(
            isSindhi ? 'حفاظت ۽ هنگامي مدد (Safety Engine)' : 'حفاظت اور ہنگامی مدد (Safety Engine)',
            style: TextStyle(fontFamily: fontFamily, fontSize: 18, fontWeight: FontWeight.bold),
          ),
          actions: [
            IconButton(
              icon: const Icon(Icons.help_outline),
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
                // Top Honest Notice
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFEBEE),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: const Color(0xFFEF9A9A)),
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.shield_outlined, size: 14, color: Color(0xFFC62828)),
                      SizedBox(width: 6),
                      Flexible(
                        child: Text(
                          '[DEMO SAFETY ENGINE] Phone numbers & emergency contacts are simulated',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFFC62828)),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 12),

                // Rule-based Input Search Field
                Card(
                  elevation: 2,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          isSindhi ? 'تڪليف يا سوال لکو:' : 'علامت یا سوال درج کریں:',
                          style: TextStyle(fontFamily: fontFamily, fontSize: 15, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 8),
                        TextField(
                          controller: _queryController,
                          onChanged: _analyzeInput,
                          decoration: InputDecoration(
                            hintText: isSindhi
                                ? 'مثال: سينئي ۾ سور، نانگ جو چڪ، دوا جي خوراڪ...'
                                : 'مثال: سینے میں شدید درد، سانپ نے کاٹ لیا، بخار کی کتنی گولی؟',
                            border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                            prefixIcon: const Icon(Icons.search, color: Color(0xFFC62828)),
                            suffixIcon: _queryController.text.isNotEmpty
                                ? IconButton(
                                    icon: const Icon(Icons.clear),
                                    onPressed: () {
                                      _queryController.clear();
                                      _analyzeInput('');
                                    },
                                  )
                                : null,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          isSindhi ? 'امتحان لاءِ تڪڙيون چونڊون (Quick Test):' : 'آزمائشی فقرے (Tap to test safety trigger):',
                          style: TextStyle(fontFamily: fontFamily, fontSize: 12, color: Colors.grey.shade600),
                        ),
                        const SizedBox(height: 6),
                        Wrap(
                          spacing: 6,
                          runSpacing: 6,
                          children: [
                            ActionChip(
                              avatar: const Icon(Icons.favorite, size: 14, color: Colors.red),
                              label: const Text('سینے میں شدید درد'),
                              onPressed: () => _setTestQuery('میرے سینے میں شدید درد ہے اور سانس رک رہی ہے'),
                            ),
                            ActionChip(
                              avatar: const Icon(Icons.warning_amber, size: 14, color: Colors.amber),
                              label: const Text('سانپ کاٹنا'),
                              onPressed: () => _setTestQuery('کھیت میں سانپ نے کاٹ لیا ہے'),
                            ),
                            ActionChip(
                              avatar: const Icon(Icons.pets, size: 14, color: Colors.brown),
                              label: const Text('بھینس بیٹھ گئی'),
                              onPressed: () => _setTestQuery('بھینس اٹھ نہیں پا رہی اور بیٹھ گئی ہے'),
                            ),
                            ActionChip(
                              avatar: const Icon(Icons.medication, size: 14, color: Colors.blue),
                              label: const Text('کتنی گولی کھائیں؟'),
                              onPressed: () => _setTestQuery('بچے کو بخار کے لیے کتنی گولی یا سیرپ دوں؟'),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // State 1: Emergency Triggered
                if (_currentAction == SafetyAction.escalateEmergency) ...[
                  Container(
                    padding: const EdgeInsets.all(18),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFEBEE),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: const Color(0xFFC62828), width: 2),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.red.withValues(alpha: 0.2),
                          blurRadius: 12,
                          offset: const Offset(0, 4),
                        ),
                      ],
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.warning, color: Color(0xFFC62828), size: 36),
                            SizedBox(width: 8),
                            Text(
                              'EMERGENCY RED FLAG',
                              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Color(0xFFC62828)),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Text(
                          _emergencyTitle ?? '',
                          textAlign: TextAlign.center,
                          style: TextStyle(fontFamily: fontFamily, fontSize: 17, fontWeight: FontWeight.bold, color: const Color(0xFFB71C1C)),
                        ),
                        const Divider(height: 20, color: Color(0xFFEF9A9A)),
                        Text(
                          isSindhi ? 'فوري هدايتون (First Aid):' : 'فوری احتیاطی تدابیر (First Aid):',
                          style: TextStyle(fontFamily: fontFamily, fontSize: 14, fontWeight: FontWeight.bold),
                        ),
                        const SizedBox(height: 6),
                        Text(
                          _emergencyInstructions ?? '',
                          style: TextStyle(fontFamily: fontFamily, fontSize: 14, height: 1.5, color: const Color(0xFF37474F)),
                        ),
                        const SizedBox(height: 16),

                        // Large Emergency Call Button
                        SizedBox(
                          height: 58,
                          child: ElevatedButton.icon(
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFFC62828),
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                              elevation: 4,
                            ),
                            icon: const Icon(Icons.phone_in_talk, size: 26),
                            label: const Text(
                              'کال ریسکیو 1122 [DEMO CALL]',
                              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                            ),
                            onPressed: () {
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  backgroundColor: Color(0xFFC62828),
                                  content: Text('[DEMO SIMULATION] In production this connects immediately to Rescue 1122.'),
                                ),
                              );
                            },
                          ),
                        ),

                        const SizedBox(height: 10),
                        Text(
                          'رجوع: ${_referralTarget ?? "Rescue 1122"}',
                          textAlign: TextAlign.center,
                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: Color(0xFF757575)),
                        ),
                      ],
                    ),
                  ),
                ] else if (_currentAction == SafetyAction.refuseDosage) ...[
                  // State 2: Dosage Refusal Triggered
                  Container(
                    padding: const EdgeInsets.all(18),
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFF3E0),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: const Color(0xFFE65100), width: 2),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.block, color: Color(0xFFE65100), size: 32),
                            SizedBox(width: 8),
                            Text(
                              'DOSAGE PRESCRIPTION REFUSED',
                              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFFE65100)),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Text(
                          isSindhi
                              ? 'طبي خوراڪ تجويز ڪرڻ منع آهي'
                              : 'طبی نسخہ یا دوا کی خوراک تجویز کرنا ممنوع ہے',
                          textAlign: TextAlign.center,
                          style: TextStyle(fontFamily: fontFamily, fontSize: 17, fontWeight: FontWeight.bold, color: const Color(0xFFE65100)),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          isSindhi
                              ? 'هي ايپ ڪنهن به حالت ۾ دوائن جو مقدار يا خوراڪ نٿي ٻڌائي سگهي. غلط دوا مريض جي زندگي کي خطري ۾ وجهي سگهي ٿي.\nمهرباني ڪري ويجھي اسپتال يا ڊاڪٽر سان رجوع ڪريو.'
                              : 'یہ سسٹم کسی بھی دوا کا نام یا خوراک تجویز نہیں کر سکتا۔ بغیر معائنے کے دوا دینا مریض کے لیے جان لیوا ہو سکتا ہے۔\nبرائے کرم قریبی بنیادی مرکز صحت (BHU)، اسپتال یا مستند ڈاکٹر سے رجوع کریں۔',
                          textAlign: TextAlign.center,
                          style: TextStyle(fontFamily: fontFamily, fontSize: 14, height: 1.5, color: const Color(0xFF4E342E)),
                        ),
                      ],
                    ),
                  ),
                ] else ...[
                  // State 3: Safe Idle State
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(color: const Color(0xFFE0E0E0)),
                    ),
                    child: Column(
                      children: [
                        const Icon(Icons.check_circle_outline, color: Color(0xFF2E7D32), size: 40),
                        const SizedBox(height: 8),
                        Text(
                          isSindhi ? 'حفاظتي فلٽر فعال آهي' : 'حفاظتی فلٹر فعال ہے',
                          style: TextStyle(fontFamily: fontFamily, fontSize: 16, fontWeight: FontWeight.bold, color: const Color(0xFF2E7D32)),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          isSindhi
                              ? 'سسٽم تمام خطرناڪ علامات جي خودڪار چڪاس ڪري ٿو'
                              : 'سسٹم تمام خطرناک علامات اور طبی نسخوں کی خودکار جانچ کرتا ہے',
                          textAlign: TextAlign.center,
                          style: TextStyle(fontFamily: fontFamily, fontSize: 13, color: Colors.grey.shade600),
                        ),
                      ],
                    ),
                  ),
                ],
              ],
            ),
          ),
        ),
      ),
    );
  }
}
