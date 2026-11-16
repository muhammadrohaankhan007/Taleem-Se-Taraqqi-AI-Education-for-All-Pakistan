# Taleem Se Taraqqi — Prototype Capabilities & Limits Specification

**Document Version:** 1.0.0  
**Phase:** Clickable Web & Cross-Platform Prototype  
**Date:** November 2026  
**Audience:** Project Supervisors, Donors, Technical Evaluators, Implementation Partners  

---

## 1. Executive Summary

This document specifies the boundary between **implemented production-ready architecture** and **simulated prototype features** within the **Taleem Se Taraqqi** Flutter Web prototype.

Per project transparency principles:
- Every simulated feature within the user interface is explicitly labeled with **`[DEMO]`**, **`[SIMULATED]`**, or **`[TEMP]`**.
- A dedicated **"What's Real / What's Simulated"** modal is accessible from the top AppBar of every primary screen.
- No medical dosages, veterinary treatments, or emergency phone numbers are presented as reviewed facts.

---

## 2. Real vs. Simulated Capability Matrix

| Feature Area | In Prototype (Real) | Simulated / Mocked (Demo) | Production Roadmap Need |
| :--- | :--- | :--- | :--- |
| **Typography & Fonts** | **Real**: Bundled Google Noto Naskh Arabic & Noto Nastaliq Urdu (SIL Open Font License). Genuine distinct font files with zero OS Arial dependencies. | None. Full RTL glyph rendering is genuine. | Direct reuse in production APK. |
| **Multilingual UI & RTL** | **Real**: Dynamic in-memory switching between Urdu (RTL), Sindhi (RTL), and English (LTR) without app restart. Real-world non-mirrored iconography. | Punjabi, Pashto, Balochi are currently scaffolded ARB stubs. | Complete translation dictionaries for regional dialects. |
| **Speech & Audio Guidance** | **Real**: Web Speech API (`flutter_tts`) integration with automated voice availability detection and visual badge fallback. | **Simulated**: Audio prompts use browser TTS synthesis labeled `[TEMP AUDIO]`. | Professional studio audio recordings by native Urdu & Sindhi speakers bundled as OPUS packs. |
| **Household Profiles & Auth** | **Real**: Multi-learner state (up to 6 profiles), picture avatar selection, 4-symbol picture PINs, browser `SharedPreferences` persistence. | Cloud backup and SMS-based multi-factor authentication are inactive. | SQLite (`sqflite_common_ffi`) on mobile + encrypted biometric Keystore. |
| **Diagnostic Placement Assessment** | **Real**: 8-question scripted assessment covering picture recognition, letter sounds, and basic math. Automated scoring, level assignment (Level 0, 1, 2), and pathway suggestion. | Pre-scripted fixed question bank; does not dynamically generate adaptive items from IRT (Item Response Theory). | Dynamic adaptive question selector powered by backend item bank. |
| **Interactive Literacy Player** | **Real**: 3 complete lessons per language with 3 sequential pedagogical phases: (1) Listen & Tap, (2) 60fps responsive Canvas Touch Tracing, (3) 5-question comprehension check with star awards. | Tracing accuracy uses bounding box completion rather than computer-vision stroke order analysis. | Machine-learning stroke alignment verification using on-device TFLite. |
| **Applied Farming & Numeracy** | **Real**: Interactive Farming Profit Calculator with live slider computation (Acres, Yield in maunds, Costs, Net Profit). | Agronomic yield recommendations and market prices are illustrative defaults labeled `[DEMO CONTENT]`. | Agronomic review by Sindh Agriculture University (SAU Tandojam) & live mandi price feed. |
| **Deterministic Safety Engine** | **Real**: Ported deterministic regex & keyword matcher from `rules_engine.py`. Detects chest pain, snakebites, downer livestock, fits, and refuses medical dosage queries. | 1122 and ASV center call buttons show a simulation SnackBar rather than initiating actual cellular telephony calls. | Direct Android `ACTION_CALL` intent with geofenced district hospital routing. |
| **Conversational AI Tutor** | **Real**: Chat interface with suggested prompt chips, curriculum answer matcher, and spoken TTS response playback. | Pre-scripted canned answers labeled `"Scripted demo - live AI not connected"`. | Parked FastAPI backend with quantized Whisper ASR + Llama 3 / Gemini Nano inference. |
| **Facilitator Dashboard** | **Real**: Interactive village switcher, cohort cards, aggregate learner metrics, and progress bars. | All cohort telemetry data and BLE mesh sync timestamps are pre-seeded fake data labeled `[DEMO DASHBOARD]`. | Android Nearby Connections API / WiFi Direct mesh synchronization engine. |

---

## 3. Screen-by-Screen Breakdown & SRS Requirement Mapping

The prototype demonstrates functionality directly satisfying requirements in [`docs/SRS.md`](file:///c:/dev/taleem-se-taraqqi/docs/SRS.md):

### Screen 1: Welcome & Language Selection (`HelloScreen`)
- **SRS Requirements Covered:**
  - `REQ-001 [P0]`: Audio-First Core Navigation.
  - `REQ-002 [P0]`: Minimum Touch Target Size (>= 56dp x 56dp).
  - `REQ-009 [P0]`: Native RTL Script Support for Urdu and Sindhi.
  - `REQ-010 [P0]`: Noto Naskh Arabic as Primary Bundled Font.
  - `REQ-013 [P0]`: Live Language Switching without App Restart.
- **Labeling:** Notice badge displayed when browser lacks speech synthesis for Sindhi/Urdu: `[صوتی سہولت موجود نہیں - ٹیکسٹ موڈ فعال]`.

### Screen 2: Multi-Learner Family Profiles (`FamilyProfilesScreen`)
- **SRS Requirements Covered:**
  - `REQ-004 [P0]`: Zero Mandatory Text Input for Low-Literacy Users.
  - `REQ-023 [P0]`: Multi-Learner Household Profiles (1 to 6 learners per device).
  - `REQ-024 [P0]`: Visual Avatar & 4-Symbol Picture PIN Authentication.
  - `REQ-025 [P1]`: Individualized Offline Progress Tracking per Profile.
- **Labeling:** Pre-seeded with 3 realistic family profiles (child, daughter, father farmer).

### Screen 3: Placement Quiz (`PlacementQuizScreen`)
- **SRS Requirements Covered:**
  - `REQ-031 [P0]`: Non-Text Diagnostic Placement Assessment.
  - `REQ-032 [P0]`: Audio-Visual Multi-Modal Question Prompts.
  - `REQ-033 [P0]`: Automatic Placement into Learning Pathways (Levels 0, 1, 2).
- **Labeling:** Persistent top badge: `[SIMULATED] 8-Question Scripted Placement Quiz (No backend required)`.

### Screen 4: Learning Home Center (`HomeLearningScreen`)
- **SRS Requirements Covered:**
  - `REQ-002 [P0]`: High-Contrast 4 Big Picture Category Tiles (Reading, Maths, Farming, Health).
  - `REQ-012 [P0]`: Non-Mirrored Real-World Object Icons in RTL.
  - `REQ-041 [P0]`: Structured Modular Curriculum Hub.
- **Labeling:** Top clickable pill: `[CLICKABLE PROTOTYPE] Tap to view Real vs. Simulated capabilities`.

### Screen 5: 3-Phase Lesson Player (`LessonPlayerScreen`)
- **SRS Requirements Covered:**
  - `REQ-042 [P0]`: 3-Phase Lesson Sequence (Listen & Tap, Tracing, Comprehension Check).
  - `REQ-053 [P0]`: Touch Gesture Tracing Canvas with Visual Trail.
  - `REQ-054 [P0]`: Non-Punitive Feedback and Star Accumulation.
- **Labeling:** Dedicated header: `[TEMP AUDIO / DEMO TTS] Browser speech synthesis active`.

### Screen 6: Applied Life Skills & Profit Calculator (`AppliedLessonScreen`)
- **SRS Requirements Covered:**
  - `REQ-089 [P0]`: Rice Farming Nursery and Water Management Guidance.
  - `REQ-094 [P0]`: Livestock Vaccination & Deworming Calendar.
  - `REQ-099 [P0]`: Household Hygiene & Home ORS Preparation Protocol.
  - `REQ-104 [P0]`: Practical Numeracy & Household Farming Profit Calculator.
- **Labeling:** `[DEMO CONTENT] Unverified field guidelines` and `[DEMO CALCULATOR - Estimates only]`.

### Screen 7: Safety & Emergency Screen (`SafetyEmergencyScreen`)
- **SRS Requirements Covered:**
  - `REQ-071 [P0]`: Deterministic Red-Flag Emergency Triage.
  - `REQ-072 [P0]`: Medical Prescription & Dosage Refusal Guardrail.
  - `REQ-073 [P0]`: Zero-Latency Keyword Matching (Bypasses AI Inference).
  - `REQ-109 [P0]`: Emergency Services Referral (Rescue 1122, Anti-Snake Venom Centers).
- **Labeling:** `[DEMO SAFETY ENGINE] Phone numbers & emergency contacts are simulated` and `[DEMO CALL]` on button.

### Screen 8: Scripted AI Tutor (`ScriptedTutorScreen`)
- **SRS Requirements Covered:**
  - `REQ-061 [P0]`: Socratic Pedagogical Dialogue.
  - `REQ-062 [P0]`: Curriculum-Bound Scope Enforcement.
- **Labeling:** Prominent banner: `Scripted demo - live AI not connected`.

### Screen 9: Facilitator & Admin Dashboard (`FacilitatorDashboardScreen`)
- **SRS Requirements Covered:**
  - `REQ-081 [P0]`: Offline Mesh Synchronization Architecture.
  - `REQ-113 [P0]`: Community Facilitator Cohort View.
  - `REQ-114 [P1]`: Village Progress Heatmap & Completion Metrics.
- **Labeling:** Persistent header: `[DEMO DASHBOARD] All facilitator analytics & sync logs are simulated`.

---

## 4. Exact Steps Required to Reach Production

To graduate from this prototype to the production field deployment:

1. **Native Field Audio Recording (Replacing TTS):**
   - Record ~1,200 standard audio prompt files in studio with male/female voice actors in literary Urdu and colloquial Sindhi (Larkana & Thatta dialects).
   - Compress audio into 16kbps OPUS format for low-storage bundling.
2. **Medical & Agrochemical Content Review:**
   - Formal sign-off on emergency instructions by Sindh Health Department / Rescue 1122 medical directors.
   - Formal sign-off on rice water schedule and fertilizer rates by Sindh Agriculture Extension Directorate.
3. **Hardware Telephony Integration:**
   - Wire the Rescue 1122 button to native Android `Intent.ACTION_DIAL` / `ACTION_CALL`.
4. **Offline Database & Native Android Build:**
   - Unpark PostgreSQL/FastAPI backend or embed local SQLite (`sqflite`) for permanent offline storage.
   - Run `flutter build apk --release` on a machine with sufficient disk space for the Android SDK/NDK.
5. **AI Inference Pipeline:**
   - Connect the scripted tutor interface to an on-device quantized model or the hosted FastAPI `/tutor/ask` endpoint when internet connectivity is present.
