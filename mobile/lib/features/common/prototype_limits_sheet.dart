import 'package:flutter/material.dart';

class PrototypeLimitsSheet extends StatelessWidget {
  const PrototypeLimitsSheet({super.key});

  static void show(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => const PrototypeLimitsSheet(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.85,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Center(
            child: Container(
              width: 48,
              height: 5,
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              const Icon(Icons.info_outline, color: Color(0xFF1B5E20), size: 28),
              const SizedBox(width: 12),
              const Expanded(
                child: Text(
                  "What's Real vs. What's Simulated",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
              ),
              IconButton(
                icon: const Icon(Icons.close),
                onPressed: () => Navigator.of(context).pop(),
              ),
            ],
          ),
          const Divider(),
          Expanded(
            child: ListView(
              children: [
                _buildSectionHeader('✅ 100% Real & Verified (In This Build)', Colors.green.shade800),
                _buildItem(
                  'Urdu & Sindhi Typography',
                  'Authentic SIL Open Font License Google Noto Naskh Arabic & Noto Nastaliq Urdu fonts rendering live RTL scripts with 0 clipping.',
                ),
                _buildItem(
                  'Local Storage & Profiles',
                  'Family profiles and placement results persist locally in your browser (LocalStorage / SharedPreferences).',
                ),
                _buildItem(
                  'Interactive Touch Canvas',
                  '60fps finger-tracing canvas for Urdu/Sindhi alphabet practice with stroke tracking.',
                ),
                _buildItem(
                  'Deterministic Safety Interceptor',
                  'Keyword matching for health, snakebite, livestock emergencies, and pesticide dosage refusals ported directly to client.',
                ),
                const SizedBox(height: 16),
                _buildSectionHeader('⚠️ Simulated / Demo Content [DEMO]', Colors.amber.shade900),
                _buildItem(
                  'Voice Audio & TTS [TEMP / DEMO]',
                  'Browser Web Speech Synthesis API is used for demonstration. Actual production app uses human studio recordings.',
                ),
                _buildItem(
                  'AI Tutor Chat [SIMULATED]',
                  'Canned rule-based answers demonstration. Cloud LLM / RAG pgvector pipeline is not connected in this client-only demo.',
                ),
                _buildItem(
                  'Emergency Phone Numbers [DEMO]',
                  'Emergency helpline numbers (1122, Edhi, etc.) are demo shortcuts. Medical dosage queries are deterministically refused.',
                ),
                _buildItem(
                  'Facilitator & Village Sync [DEMO]',
                  'Village dashboard heatmaps and facilitator rosters show simulated offline aggregation data.',
                ),
              ],
            ),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF1B5E20),
              foregroundColor: Colors.white,
              padding: const EdgeInsets.symmetric(vertical: 14),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
            ),
            onPressed: () => Navigator.of(context).pop(),
            child: const Text('Back to Prototype Demo', style: TextStyle(fontSize: 16)),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(String title, Color color) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Text(
        title,
        style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: color),
      ),
    );
  }

  Widget _buildItem(String title, String description) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12.0),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Icon(Icons.circle, size: 8, color: Colors.grey),
          const SizedBox(width: 8),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
                const SizedBox(height: 2),
                Text(description, style: TextStyle(color: Colors.grey.shade700, fontSize: 13)),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
