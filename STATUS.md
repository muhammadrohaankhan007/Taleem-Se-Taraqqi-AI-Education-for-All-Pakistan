# Taleem Se Taraqqi (تعلیم سے ترقی) — Status Tracker

*Last Updated: 2026-11-16 23:12 PKT (Scope: Clickable Web Prototype Track - COMPLETE)*

---

## Active Track: Clickable Flutter Web Prototype

Per user direction, the production backend/Docker/database/Gradle stack is **parked** (retained in repository, un-deleted per ADR-011). All active work focused on delivering a zero-daemon, browser-runnable, clickable Flutter Web prototype with real Noto font RTL typography, honest `[DEMO]` / `[SIMULATED]` labeling, and local in-browser persistence.

### Prototype Implementation Roadmap (12 of 12 COMPLETE):

- [x] **Item 1: Web Platform & Language Switcher (COMPLETE)**
  - Web platform initialized (`flutter create --platforms=web .`).
  - Production web compilation passed (`flutter build web` -> `build/web`).
  - All automated tests passing (`flutter test` 20/20 passing).
  - Live RTL language switcher in Urdu, Sindhi, and English verified without restart.

- [x] **Item 2: Voice-Guided Welcome & Picture Language Choice (COMPLETE)**
  - Spoken welcome audio prompt using browser speech synthesis (`flutter_tts`).
  - Dynamic detection of Urdu/Sindhi voice availability with explicit notice badge when unsupported.
  - Large picture-based language tiles (>= 72dp touch targets).
  - Top AppBar `[?]` button opens "What's Real vs. What's Simulated" limits modal.

- [x] **Item 3: Multi-Learner Family Profiles (COMPLETE)**
  - Support for up to 6 family members on a single shared device.
  - Picture avatar selector and non-alphanumeric 4-symbol picture PINs.
  - In-browser local storage persistence via `SharedPreferences`.

- [x] **Item 4: Voice & Picture Diagnostic Placement Quiz (COMPLETE)**
  - 8-question scripted assessment with picture cues and audio prompts.
  - Automated scoring and placement into Level 0 (Non-Reader), Level 1 (Emergent), or Level 2 (Applied).
  - Labeled with persistent top honesty banner: `[SIMULATED]`.

- [x] **Item 5: 3-Phase Literacy & Numeracy Lessons (COMPLETE)**
  - 3 complete lessons per language (Urdu and Sindhi).
  - Sequential pedagogical sequence: (1) Listen & Tap with `[TEMP AUDIO]`, (2) 60fps touch tracing canvas with clear button, (3) 5-question comprehension check.
  - Profile star accumulation and local persistence.

- [x] **Item 6: Learning Home Screen with 4 Big Tiles (COMPLETE)**
  - High-contrast 2x2 grid with 4 big picture tiles: Reading & Writing, Basic Maths, Farming & Animals, Health & Safety.
  - Direct navigation into learning activities and applied tools.

- [x] **Item 7: Applied Pathways & Farming Profit Calculator (COMPLETE)**
  - Dedicated applied lessons for Rice Farming, Goats/Buffalo Livestock Care, and Household Health / ORS.
  - Interactive Farming Profit Calculator with live slider computation (Acres, Yield in maunds, Costs, Net Profit).
  - Labeled `[DEMO CONTENT]` and `[DEMO CALCULATOR - Estimates only]`.

- [x] **Item 8: Deterministic Safety Engine & Dosage Refusal (COMPLETE)**
  - Ported deterministic regex matching from `backend/app/safety/rules_engine.py`.
  - Red-flag danger triggers (chest pain, snakebites, downer animal, convulsions) immediately escalate to the emergency screen with big `کال ریسکیو 1122 [DEMO CALL]` button.
  - Medication prescription and dosage requests are strictly refused with a medical explanation directing the user to a doctor.
  - Evaluator test chips for one-tap verification.

- [x] **Item 9: Scripted AI Tutor Chat (COMPLETE)**
  - Chat interface clearly labeled: `Scripted demo - live AI not connected`.
  - Quick topic chips and pre-canned curriculum answers for reading, numeracy, rice farming, and livestock.
  - Spoken TTS response playback.

- [x] **Item 10: Facilitator & Admin Cohort Dashboard (COMPLETE)**
  - Cohort management screen with village selector (Thatta, Larkana, Rahim Yar Khan).
  - 48 active learners metric, completion rates, and simulated offline BLE mesh sync logs.
  - Labeled `[DEMO DASHBOARD]`.

- [x] **Item 11: Free Deployment Bundle (COMPLETE)**
  - Production web compilation generated in `mobile/build/web` (`index.html`, `main.dart.js` 3.28MB, `assets/`).
  - `README_DEPLOY_WEB.md` created with exact step-by-step commands for free hosting on Netlify and Firebase Hosting.

- [x] **Item 12: Prototype Documentation (COMPLETE)**
  - `docs/PROTOTYPE_DEMO_SCRIPT.md`: 5-minute supervisor presentation walkthrough.
  - `docs/PROTOTYPE_LIMITS.md`: Comprehensive Real vs. Simulated matrix, production roadmap, and SRS requirement mappings.

---

## Quality Gates & Verification

- **Automated Tests:** `20 / 20 passing` (`mobile/test`).
  - `test/core/fonts_test.dart`: Font file presence, SIL OFL license verification, binary distinction.
  - `test/core/i18n_test.dart`: RTL directionality, font mappings, language switching.
  - `test/features/prototype_flow_test.dart`: Items 2, 3, 4, 5, 6, 7, 8, 9, 10 feature verification.
  - `test/widget_test.dart`: App boot in Urdu RTL, live in-place language switching.
- **Static Analysis:** `flutter analyze`: **0 issues found**.
- **Web Build:** `flutter build web`: **Exit code 0** (`build/web` generated).
