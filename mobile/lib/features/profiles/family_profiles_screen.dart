import 'package:flutter/material.dart';
import '../../core/i18n/language_manager.dart';
import '../../core/models/learner_profile.dart';
import '../../core/storage/local_storage_service.dart';
import '../../core/audio/tts_service.dart';
import '../assessment/placement_quiz_screen.dart';
import '../learning/home_learning_screen.dart';
import '../common/prototype_limits_sheet.dart';

class FamilyProfilesScreen extends StatefulWidget {
  final AppLanguage language;

  const FamilyProfilesScreen({super.key, required this.language});

  @override
  State<FamilyProfilesScreen> createState() => _FamilyProfilesScreenState();
}

class _FamilyProfilesScreenState extends State<FamilyProfilesScreen> {
  final TtsService _tts = TtsService();
  List<LearnerProfile> _profiles = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadProfiles();
  }

  Future<void> _loadProfiles() async {
    final list = await LocalStorageService.loadProfiles();
    if (mounted) {
      setState(() {
        _profiles = list;
        _loading = false;
      });
    }
  }

  void _onProfileSelected(LearnerProfile profile) {
    _tts.speak(profile.name, widget.language.code);
    LocalStorageService.setActiveProfileId(profile.id);

    // If unassessed, go to placement quiz (Item 4); otherwise go to learning home (Item 5/6)
    if (profile.progressStars == 0) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (ctx) => PlacementQuizScreen(profile: profile, language: widget.language),
        ),
      ).then((_) => _loadProfiles());
    } else {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (ctx) => HomeLearningScreen(profile: profile, language: widget.language),
        ),
      ).then((_) => _loadProfiles());
    }
  }

  void _showAddProfileDialog() {
    if (_profiles.length >= 6) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('زیادہ سے زیادہ 6 افراد کے پروفائلز محفوظ ہو سکتے ہیں۔ (Max 6 profiles reached)'),
        ),
      );
      return;
    }

    final nameController = TextEditingController();
    String selectedAvatar = '👧';
    const selectedAgeGroup = 'child';
    final selectedPin = ['🌟', '🌙', '🦁', '🍎'];

    const avatars = ['👧', '👦', '👩', '👨', '👵', '🧕', '🧑‍🌾', '🧒'];
    const pinSymbols = ['🌟', '🌙', '🦁', '🍎', '🌸', '💧', '🌾', '☀️'];

    showDialog(
      context: context,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setDialogState) {
            final isSindhi = widget.language == AppLanguage.sindhi;
            return AlertDialog(
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              title: Text(
                isSindhi ? 'نئون فيملي ميمبر شامل ڪريو' : 'نیا فیملی ممبر شامل کریں',
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
              ),
              content: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    TextField(
                      controller: nameController,
                      decoration: InputDecoration(
                        labelText: isSindhi ? 'نالو (Name)' : 'نام (Name)',
                        hintText: 'مثلاً: زاہد، فاطمہ، امی',
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                      ),
                    ),
                    const SizedBox(height: 14),
                    const Text('تصویر یا اوتار چنیں:', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 8,
                      children: avatars.map((av) {
                        final isSel = selectedAvatar == av;
                        return InkWell(
                          onTap: () => setDialogState(() => selectedAvatar = av),
                          borderRadius: BorderRadius.circular(12),
                          child: Container(
                            padding: const EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: isSel ? const Color(0xFFC8E6C9) : Colors.grey.shade100,
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(color: isSel ? const Color(0xFF2E7D32) : Colors.transparent, width: 2),
                            ),
                            child: Text(av, style: const TextStyle(fontSize: 26)),
                          ),
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 14),
                    const Text('4-علامتی تصویری پن (Picture PIN):', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                    const SizedBox(height: 6),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                      decoration: BoxDecoration(
                        color: const Color(0xFFF1F8E9),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: selectedPin.map((p) => Text(p, style: const TextStyle(fontSize: 22))).toList(),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Wrap(
                      spacing: 6,
                      children: pinSymbols.map((sym) {
                        return ActionChip(
                          label: Text(sym, style: const TextStyle(fontSize: 16)),
                          onPressed: () {
                            setDialogState(() {
                              selectedPin.removeAt(0);
                              selectedPin.add(sym);
                            });
                          },
                        );
                      }).toList(),
                    ),
                  ],
                ),
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(ctx),
                  child: const Text('منسوخ (Cancel)'),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF2E7D32),
                    foregroundColor: Colors.white,
                  ),
                  onPressed: () async {
                    final name = nameController.text.trim();
                    if (name.isEmpty) return;
                    final newProf = LearnerProfile(
                      id: 'p_${DateTime.now().millisecondsSinceEpoch}',
                      name: name,
                      avatar: selectedAvatar,
                      ageGroup: selectedAgeGroup,
                      picturePin: selectedPin,
                      progressStars: 0,
                    );
                    await LocalStorageService.addProfile(newProf);
                    if (context.mounted) {
                      Navigator.pop(ctx);
                      _loadProfiles();
                    }
                  },
                  child: const Text('محفوظ کریں (Save)'),
                ),
              ],
            );
          },
        );
      },
    );
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
          backgroundColor: const Color(0xFF1B5E20),
          foregroundColor: Colors.white,
          title: Text(
            isSindhi ? 'فيملي اڪائونٽ ۽ پروفائلز' : 'فیملی اکاؤنٹ و پروفائلز',
            style: TextStyle(fontFamily: fontFamily, fontSize: 18, fontWeight: FontWeight.bold),
          ),
          centerTitle: true,
          actions: [
            IconButton(
              icon: const Icon(Icons.help_outline),
              tooltip: "What's Real / What's Simulated",
              onPressed: () => PrototypeLimitsSheet.show(context),
            ),
          ],
        ),
        body: SafeArea(
          child: _loading
              ? const Center(child: CircularProgressIndicator())
              : SingleChildScrollView(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      // Header Card
                      Container(
                        padding: const EdgeInsets.all(14),
                        decoration: BoxDecoration(
                          color: const Color(0xFFE8F5E9),
                          borderRadius: BorderRadius.circular(16),
                          border: Border.all(color: const Color(0xFFC8E6C9)),
                        ),
                        child: Row(
                          children: [
                            const Icon(Icons.people, color: Color(0xFF2E7D32), size: 36),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    isSindhi
                                        ? 'پنهنجو نالو يا تصوير چونڊيو'
                                        : 'اپنا نام یا تصویر منتخب کریں',
                                    style: TextStyle(
                                      fontFamily: fontFamily,
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                      color: const Color(0xFF1B5E20),
                                    ),
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    isSindhi
                                        ? 'هڪ ئي فون تي سڄي خاندان جي ترقي الڳ محفوظ ٿئي ٿي'
                                        : 'ایک ہی موبائل پر پورے خاندان کی پیشرفت محفوظ رہتی ہے (6 افراد تک)',
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

                      const SizedBox(height: 16),

                      // Profile Grid (Up to 6)
                      GridView.builder(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                          crossAxisCount: 2,
                          crossAxisSpacing: 12,
                          mainAxisSpacing: 12,
                          childAspectRatio: 0.95,
                        ),
                        itemCount: _profiles.length,
                        itemBuilder: (ctx, idx) {
                          final prof = _profiles[idx];
                          return Material(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(18),
                            elevation: 2,
                            child: InkWell(
                              borderRadius: BorderRadius.circular(18),
                              onTap: () => _onProfileSelected(prof),
                              child: Container(
                                padding: const EdgeInsets.all(12),
                                decoration: BoxDecoration(
                                  borderRadius: BorderRadius.circular(18),
                                  border: Border.all(color: const Color(0xFFC8E6C9)),
                                ),
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    CircleAvatar(
                                      radius: 28,
                                      backgroundColor: const Color(0xFFE8F5E9),
                                      child: Text(prof.avatar, style: const TextStyle(fontSize: 30)),
                                    ),
                                    const SizedBox(height: 8),
                                    Text(
                                      prof.name,
                                      textAlign: TextAlign.center,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: TextStyle(
                                        fontFamily: fontFamily,
                                        fontSize: 15,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    const SizedBox(height: 2),
                                    Text(
                                      prof.literacyLevel,
                                      textAlign: TextAlign.center,
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(fontSize: 11, color: Color(0xFF2E7D32)),
                                    ),
                                    const SizedBox(height: 6),
                                    Row(
                                      mainAxisAlignment: MainAxisAlignment.center,
                                      children: [
                                        const Icon(Icons.star, size: 14, color: Color(0xFFFFA000)),
                                        const SizedBox(width: 4),
                                        Text('${prof.progressStars} ستارے', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
                                      ],
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          );
                        },
                      ),

                      const SizedBox(height: 18),

                      // Add Family Profile Button
                      if (_profiles.length < 6)
                        SizedBox(
                          height: 54,
                          child: OutlinedButton.icon(
                            style: OutlinedButton.styleFrom(
                              side: const BorderSide(color: Color(0xFF2E7D32), width: 1.5),
                              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            ),
                            icon: const Icon(Icons.person_add, color: Color(0xFF2E7D32)),
                            label: Text(
                              isSindhi ? '+ نئون فيملي ميمبر شامل ڪريو' : '+ نیا فیملی ممبر شامل کریں (Add Profile)',
                              style: TextStyle(
                                fontFamily: fontFamily,
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                                color: const Color(0xFF2E7D32),
                              ),
                            ),
                            onPressed: _showAddProfileDialog,
                          ),
                        ),
                    ],
                  ),
                ),
        ),
      ),
    );
  }
}
