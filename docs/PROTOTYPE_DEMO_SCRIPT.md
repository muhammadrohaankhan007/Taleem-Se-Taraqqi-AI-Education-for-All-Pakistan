# 5-Minute Supervisor Demo Script: Taleem Se Taraqqi Prototype

This script provides an exact, step-by-step click path to demonstrate the **Taleem Se Taraqqi** Flutter Web prototype to a supervisor, stakeholder, or donor in 5 minutes.

---

## Pre-Demo Checklist
1. Open the prototype link in Google Chrome or mobile browser: `http://localhost:8080` (or your Netlify/Firebase URL).
2. Ensure device audio is turned on (browser speech synthesis is used for audio guidance).
3. Have this script handy for talking points.

---

## Minute-by-Minute Walkthrough

### Minute 0:00 – 0:45: Language Choice & Spoken Welcome (SRS: FR-LANG-01, FR-LANG-02)
- **What to click:**
  1. Boot the app. Observe that the app launches in **Urdu RTL** by default.
  2. Tap the **سنڌي (Sindhi)** tile. Notice that the entire UI switches instantly to Sindhi typography (using genuine Google Noto Naskh Arabic fonts) and layout mirrors naturally.
  3. Tap the **English** tile, then tap back to **اردو (Urdu)**.
  4. Point out the audio icon and note the purple TTS notice badge: *"[صوتی سہولت موجود نہیں - ٹیکسٹ موڈ فعال] (Browser lacks voice for Urdu)"* showing honest capability detection.
  5. Tap the `[?]` icon in the AppBar to open the **"What's Real vs. What's Simulated"** sheet.
- **Talking Point:** *"Notice that this is not an English app translated after the fact. It is designed from the ground up for rural Pakistani communities in Urdu and Sindhi, with genuine SIL OFL Noto fonts, zero backend dependency, and full audio-first assistance."*

---

### Minute 0:45 – 1:30: Multi-Learner Family Profiles (SRS: FR-PROF-01, FR-PROF-02, FR-SEC-03)
- **What to click:**
  1. Tap the green **"سیکھنا شروع کریں (Start Learning)"** button to enter the **فیملی اکاؤنٹ و پروفائلز (Family Profiles)** screen.
  2. Show that a single shared household device supports up to **6 family members** (children, mothers, fathers, grandparents).
  3. Tap **"+ نیا فیملی ممبر شامل کریں (Add Profile)"**.
  4. Enter a name (e.g. `فاطمہ`), choose an avatar (`👧` or `🧕`), and select a **4-symbol Picture PIN** (`🌟 🌙 🦁 🍎`). Tap Save.
  5. Tap on **"زینب (Zainab)"** (pre-assessed) or **"علی (Ali)"** to demonstrate profile selection.
- **Talking Point:** *"In rural villages, multiple family members share one phone. Instead of alphanumeric passwords they can't read, each member has a personal avatar and a 4-picture visual PIN. All data persists safely in the browser's local storage."*

---

### Minute 1:30 – 2:30: Voice & Picture Placement Quiz (SRS: FR-ASSESS-01)
- **What to click:**
  1. From profiles, tap a learner with 0 stars (or tap "مہارت کا مختصر جائزہ (Placement)").
  2. Walk through 2–3 questions:
     - Question 1: Picture recognition (📖 -> کتاب).
     - Question 2: Letter sound (حرف الف -> 🍎 انار).
     - Question 3: Number counting (3 birds -> 3).
  3. Point out the clear `[SIMULATED]` banner at the top of the quiz.
  4. Complete the 8 questions to show the result screen:
     - Assigned level: *Level 1: Emergent Practical*.
     - Recommended pathway: *بنیادی ریاضی اور زراعت (Numeracy & Farming)*.
     - Stars awarded and saved to the learner's profile.
- **Talking Point:** *"Non-literate adults don't read instructions; they hear spoken questions and tap intuitive pictures. The assessment runs completely offline and assigns a personalized learning track immediately."*

---

### Minute 2:30 – 3:30: 3-Phase Literacy & Numeracy Lesson (SRS: FR-LIT-01, FR-LIT-02)
- **What to click:**
  1. From Learning Home, tap the first tile: **"حروف شناسی و پڑھائی (Reading & Writing)"**.
  2. **Phase 1: Listen & Tap:** Tap the pictures (`🍎 انار`, `🍇 انگور`, `🐪 اونٹ`). Hear spoken pronunciation. Point out the orange `[TEMP AUDIO / DEMO TTS]` label indicating browser speech synthesis.
  3. Tap "اگلا مرحلہ (Next Phase)".
  4. **Phase 2: Touch Tracing Canvas:** Trace the letter **"ا"** on the screen with your finger or mouse. Observe the smooth 60fps responsive green stroke and the "صاف کریں (Clear)" button.
  5. Tap "اگلا مرحلہ (Next Phase)".
  6. **Phase 3: 5-Question Comprehension Check:** Answer 2 quick questions, tap "سبق مکمل کریں (Finish Lesson)".
  7. Celebrate the star rewards and updated profile score.
- **Talking Point:** *"Every lesson follows our 3-phase pedagogical sequence: Ear (Listen & Tap), Hand (Motor Tracing), and Mind (Comprehension Check). All audio is transparently marked TEMP until native field studio recordings are integrated."*

---

### Minute 3:30 – 4:15: Applied Farming, Livestock & Profit Calculator (SRS: FR-AGRI-01, FR-BUDGET-01)
- **What to click:**
  1. Go back to Learning Home and scroll to **"دھان کی کاشت اور منافع کا کیلکولیٹر (Rice Farming & Profit Calculator)"**.
  2. Show the farming advice (water depth 2-3 inches, weed suppression).
  3. Interact with the **کھیتی منافع کا کیلکولیٹر (Farming Profit Calculator)**:
     - Drag the **رقبہ (Acres)** slider to `4.0 ایکڑ`.
     - Drag the **پیداوار (Yield)** slider to `45 من`.
     - Observe live mathematical recalculation: Total Revenue, Total Cost, and **Net Profit (خالص بچت و منافع)** turning green.
  4. Point out the `[DEMO CALCULATOR - Estimates only]` honesty badge.
- **Talking Point:** *"Literacy is not taught in a vacuum. A farmer learns numeracy through real-life economic tools: calculating their crop costs, yield in maunds, and net seasonal profit."*

---

### Minute 4:15 – 4:45: Deterministic Safety Engine & Dosage Refusal (SRS: FR-SAFE-01, FR-SAFE-02)
- **What to click:**
  1. Return to Learning Home and tap the red tile: **"صحت اور ہنگامی مدد (Safety Engine)"**.
  2. Point out the `[DEMO SAFETY ENGINE]` banner.
  3. **Test 1 - Medical Emergency:** Tap the quick chip: **"سینے میں شدید درد"** (or type `سینے میں شدید درد اور سانس رک رہی ہے`).
     - Observe instant escalation to the red **EMERGENCY RED FLAG** screen.
     - Highlight the big **"کال ریسکیو 1122 [DEMO CALL]"** button and first-aid instructions.
  4. **Test 2 - Medication Prescription Refusal:** Tap the quick chip: **"کتنی گولی کھائیں؟"** (or type `بچے کو بخار کی کتنی گولی دوں؟`).
     - Observe instant escalation to the orange **DOSAGE PRESCRIPTION REFUSED** card.
     - Note the message: *"یہ سسٹم کسی بھی دوا کا نام یا خوراک تجویز نہیں کر سکتا۔ بغیر معائنے کے دوا دینا مریض کے لیے جان لیوا ہو سکتا ہے۔"*
- **Talking Point:** *"Safety in Taleem Se Taraqqi is deterministic, not left to AI hallucinations. Red flags like chest pain or snakebites trigger emergency hospital referrals immediately. Crucially, any request for drug dosages is strictly refused with an explanation directing them to a doctor."*

---

### Minute 4:45 – 5:00: Scripted AI Tutor & Facilitator Dashboard (SRS: FR-TUTOR-01, FR-FACIL-01)
- **What to click:**
  1. Tap into **"اے آئی استاد (Scripted AI Tutor)"**:
     - Point out the top header: `[Scripted demo - live AI not connected]`.
     - Tap the chip **"100 روپے کا حساب"** and read the grounded curriculum response.
  2. Tap into **"سہولت کار ڈیش بورڈ (Facilitator Dashboard)"**:
     - Show the village selector (Thatta, Larkana, Rahim Yar Khan).
     - Show cohort roster of 48 rural learners, star counts, and simulated peer-to-peer offline sync logs.
  3. Conclude by re-opening the **Prototype Limits Sheet** from any screen.
- **Talking Point:** *"Every simulated screen is labeled honestly. The architecture is ready to connect to our parked FastAPI backend, PostgreSQL database, and Whisper/Gemini models when transitioning to Milestone 1."*
