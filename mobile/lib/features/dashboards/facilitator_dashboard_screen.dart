import 'package:flutter/material.dart';
import '../../core/i18n/language_manager.dart';
import '../common/prototype_limits_sheet.dart';

class FacilitatorDashboardScreen extends StatefulWidget {
  final AppLanguage language;

  const FacilitatorDashboardScreen({
    super.key,
    required this.language,
  });

  @override
  State<FacilitatorDashboardScreen> createState() => _FacilitatorDashboardScreenState();
}

class _FacilitatorDashboardScreenState extends State<FacilitatorDashboardScreen> {
  String _selectedVillage = 'گوٹھ غلام محمد (Thatta, Sindh)';

  final List<String> _villages = [
    'گوٹھ غلام محمد (Thatta, Sindh)',
    'دستی والا (Larkana, Sindh)',
    'چک 42 جنوبی (Rahim Yar Khan, Punjab)',
  ];

  final List<Map<String, dynamic>> _cohort = [
    {
      'name': 'زینب بی بی',
      'avatar': '👧',
      'level': 'Level 0: Non-Reader',
      'pathway': 'حروف شناسی (Alif-Bay)',
      'progress': 0.80,
      'stars': 18,
      'lastSync': 'آج 10:15 AM (Bluetooth Mesh)',
    },
    {
      'name': 'علی رضا',
      'avatar': '👦',
      'level': 'Level 1: Emergent Reader',
      'pathway': 'بنیادی حساب (1-10)',
      'progress': 0.65,
      'stars': 24,
      'lastSync': 'کل 4:30 PM (Direct P2P)',
    },
    {
      'name': 'محمد عثمان (کسان)',
      'avatar': '👨',
      'level': 'Level 1: Applied Practical',
      'pathway': 'دھان کی کاشت و منافع',
      'progress': 0.90,
      'stars': 32,
      'lastSync': 'آج 11:00 AM (Community Hub)',
    },
    {
      'name': 'کلثوم اختر',
      'avatar': '👩',
      'level': 'Level 2: Household Health',
      'pathway': 'او آر ایس اور پینے کا پانی',
      'progress': 0.75,
      'stars': 28,
      'lastSync': '2 دن پہلے (SD Card Hub)',
    },
    {
      'name': 'عبدالکریم',
      'avatar': '🧑‍🌾',
      'level': 'Level 1: Livestock Management',
      'pathway': 'بھیڑ بکریوں کی ویکسین',
      'progress': 0.50,
      'stars': 14,
      'lastSync': 'آج 9:45 AM (Bluetooth Mesh)',
    },
  ];

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
          backgroundColor: const Color(0xFF004D40), // Dark Teal
          foregroundColor: Colors.white,
          title: Text(
            isSindhi ? 'سهولتڪار ڊيش بورڊ (Facilitator)' : 'سہولت کار ڈیش بورڈ (Facilitator)',
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
                    color: const Color(0xFFFFF3E0),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: const Color(0xFFFFB74D)),
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.bar_chart, size: 14, color: Color(0xFFE65100)),
                      SizedBox(width: 6),
                      Flexible(
                        child: Text(
                          '[DEMO DASHBOARD] All facilitator analytics & sync logs are simulated',
                          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Color(0xFFE65100)),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 12),

                // Village Selector Dropdown
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: const Color(0xFFB2DFDB)),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: _selectedVillage,
                      isExpanded: true,
                      icon: const Icon(Icons.location_on, color: Color(0xFF004D40)),
                      items: _villages.map((v) {
                        return DropdownMenuItem<String>(
                          value: v,
                          child: Text(
                            v,
                            style: TextStyle(fontFamily: fontFamily, fontWeight: FontWeight.bold, fontSize: 14),
                          ),
                        );
                      }).toList(),
                      onChanged: (val) {
                        if (val != null) setState(() => _selectedVillage = val);
                      },
                    ),
                  ),
                ),

                const SizedBox(height: 16),

                // Summary Stats Grid
                Row(
                  children: [
                    Expanded(
                      child: _buildMetricCard(
                        title: isSindhi ? 'ڪل سکندڙ' : 'فعال طالب علم',
                        value: '48',
                        subtitle: '12 خاندان (Households)',
                        icon: Icons.people,
                        color: const Color(0xFF00796B),
                        fontFamily: fontFamily,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: _buildMetricCard(
                        title: isSindhi ? 'مڪمل سبق' : 'مکمل اسباق',
                        value: '194',
                        subtitle: '87% تسلسل (Completion)',
                        icon: Icons.school,
                        color: const Color(0xFF388E3C),
                        fontFamily: fontFamily,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: _buildMetricCard(
                        title: isSindhi ? 'آف لائن ڊوائيسز' : 'آف لائن سنک',
                        value: '14',
                        subtitle: '[SIMULATED] BLE Mesh',
                        icon: Icons.sync,
                        color: const Color(0xFFF57C00),
                        fontFamily: fontFamily,
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: _buildMetricCard(
                        title: isSindhi ? 'حفاظتي الرٽ' : 'ہنگامی مداخلت',
                        value: '0',
                        subtitle: 'محفوظ کمیونٹی (All Safe)',
                        icon: Icons.security,
                        color: const Color(0xFFD32F2F),
                        fontFamily: fontFamily,
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: 20),

                // Cohort List Header
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      isSindhi ? 'ڳوٺ جي سکندڙن جي لسٽ:' : 'گروپ کے طلبہ و کسان (Cohort):',
                      style: TextStyle(fontFamily: fontFamily, fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: const Color(0xFFE0F2F1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Text('Sync: Online [DEMO]', style: TextStyle(fontSize: 10, color: Color(0xFF004D40), fontWeight: FontWeight.bold)),
                    ),
                  ],
                ),
                const SizedBox(height: 10),

                // Learner Cards
                ListView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: _cohort.length,
                  itemBuilder: (ctx, idx) {
                    final item = _cohort[idx];
                    return Card(
                      elevation: 1,
                      margin: const EdgeInsets.symmetric(vertical: 5),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      child: Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Row(
                          children: [
                            CircleAvatar(
                              radius: 22,
                              backgroundColor: const Color(0xFFE0F2F1),
                              child: Text(item['avatar'], style: const TextStyle(fontSize: 22)),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        item['name'],
                                        style: TextStyle(fontFamily: fontFamily, fontSize: 14, fontWeight: FontWeight.bold),
                                      ),
                                      Row(
                                        children: [
                                          const Icon(Icons.star, size: 14, color: Color(0xFFFFA000)),
                                          const SizedBox(width: 2),
                                          Text('${item['stars']}', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                                        ],
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 2),
                                  Text(
                                    '${item['level']} • ${item['pathway']}',
                                    style: TextStyle(fontFamily: fontFamily, fontSize: 11, color: Colors.grey.shade700),
                                  ),
                                  const SizedBox(height: 6),
                                  LinearProgressIndicator(
                                    value: item['progress'] as double,
                                    backgroundColor: Colors.grey.shade200,
                                    color: const Color(0xFF00796B),
                                    minHeight: 5,
                                    borderRadius: BorderRadius.circular(3),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    'آخری سنک: ${item['lastSync']}',
                                    style: const TextStyle(fontSize: 10, color: Color(0xFF78909C)),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildMetricCard({
    required String title,
    required String value,
    required String subtitle,
    required IconData icon,
    required Color color,
    required String fontFamily,
  }) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: color.withValues(alpha: 0.3)),
        boxShadow: [
          BoxShadow(
            color: color.withValues(alpha: 0.05),
            blurRadius: 6,
            offset: const Offset(0, 2),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                title,
                style: TextStyle(fontFamily: fontFamily, fontSize: 12, fontWeight: FontWeight.bold, color: Colors.grey.shade800),
              ),
              Icon(icon, size: 18, color: color),
            ],
          ),
          const SizedBox(height: 6),
          Text(
            value,
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: color),
          ),
          const SizedBox(height: 2),
          Text(
            subtitle,
            style: TextStyle(fontFamily: fontFamily, fontSize: 10, color: Colors.grey.shade600),
          ),
        ],
      ),
    );
  }
}
