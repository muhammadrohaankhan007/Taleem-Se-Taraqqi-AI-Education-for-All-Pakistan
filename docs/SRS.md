# Taleem Se Taraqqi (تعلیم سے ترقی) — Software Requirements Specification (SRS)

**Document Version:** 1.1.0  
**Status:** In Progress (Milestone 0 Expansion)  
**Scope:** Foundational Mobile Client, Safety Rule Engine, Curriculum Engine, Offline Sync & Multi-Role Operations Portal

---

## 1. System Vision & User Personas

### 1.1 Project Objective
To engineer an offline-first, voice-guided, touch-interactive mobile learning and livelihood empowerment platform for Pakistan's out-of-school children, non-literate and semi-literate adults, rural women, farmers, and livestock owners. The foundational principle is:
Learn to Read -> Read to Learn -> Learn to Earn -> Learn to Live Better.

### 1.2 Target Personas
1. **Zainab (7, Out-of-School Child, Peri-Urban Karachi):** Cannot read Urdu script. Uses mother's shared 2GB Android phone. Needs voice-guided letter recognition and gamified audio rewards.
2. **Bashir (42, Rice Farmer, Larkana, Sindh):** Speaks Sindhi; cannot read written text. Needs spoken guidance on nursery transplanting, water conservation, and fertilizer arithmetic.
3. **Kalsoom (34, Rural Homemaker & Goat Keeper, Badin):** Seeks guidance on goat health, ORS preparation for child dehydration, and household savings.
4. **Master Tariq (28, Community School Facilitator, Lyari):** Facilitates a cohort of 45 children with 5 shared tablets. Needs offline pack seeding and mastery heatmaps.
5. **Dr. Farooq (48, Public Health & Agrochemical Reviewer):** Reviews and approves medical, veterinary, and agricultural content items before public release.

---

## 2. Comprehensive Requirements Catalog (124 Functional & Technical Requirements)

### Module 1: Foundational Access & Low-Literacy Usability (REQ-001 – REQ-008)
- **REQ-001 [P0] Audio-First Core Navigation:** Every primary screen must provide clear spoken audio instructions alongside visual iconography.
  *Acceptance Criteria:* A user with zero reading literacy can launch the app, choose their profile, and start a lesson using audio and visual cues alone.
- **REQ-002 [P0] Minimum Touch Target Size:** Interactive elements must have a touch target of at least 56dp by 56dp.
  *Acceptance Criteria:* Automated widget tests verify no clickable button or icon on learner screens has dimensions below 56dp.
- **REQ-003 [P0] Element Spacing & Mis-click Protection:** Minimum 12dp margin between adjacent interactive elements.
  *Acceptance Criteria:* Button touch bounding boxes do not overlap on 320dp width screens.
- **REQ-004 [P0] Zero Mandatory Text Input:** Non-literate learners must never be blocked by mandatory text input fields.
  *Acceptance Criteria:* Learner registration, assessment, and lesson progression can be 100% completed via touch, voice, and tracing.
- **REQ-005 [P0] Audio Replay Button:** Every prompt, instruction, and feedback message must have a dedicated speaker button to replay audio.
  *Acceptance Criteria:* Tapping the speaker icon immediately re-triggers audio playback without resetting activity state.
- **REQ-006 [P1] High-Contrast Visual Theme:** Provide high-contrast color mode for visibility in bright direct sunlight.
  *Acceptance Criteria:* Contrast ratio meets WCAG AAA standards (7:1) between foreground elements and background in high-contrast mode.
- **REQ-007 [P1] Left-Handed & One-Handed Layout Mode:** Support one-handed thumb navigation toggle in settings.
  *Acceptance Criteria:* Critical action buttons shift to the lower quadrant corresponding to the user's active hand.
- **REQ-008 [P1] Non-Punitive Time Controls:** Literacy and numeracy activities must not employ countdown timers.
  *Acceptance Criteria:* No activity fails due to elapsed time; learners advance purely based on activity completion and accuracy.

### Module 2: Multilingual Support & RTL Typography (REQ-009 – REQ-016)
- **REQ-009 [P0] Native RTL Script Support:** Full bidirectional layout support for Urdu and Sindhi.
  *Acceptance Criteria:* UI components, navigation bars, and progress bars mirror correctly from right to left when Urdu or Sindhi is active.
- **REQ-010 [P0] Noto Naskh Arabic as Primary Font:** Default to bundled Noto Naskh Arabic for Urdu and Sindhi.
  *Acceptance Criteria:* No vertical glyph clipping occurs on low-end Android devices; all Sindhi-specific letters render cleanly.
- **REQ-011 [P1] Optional Noto Nastaliq Urdu Toggle:** Provide optional toggle for Nastaliq calligraphy style for Urdu learners.
  *Acceptance Criteria:* When toggled, Urdu text switches to Noto Nastaliq with adjusted line-height (1.8x) to prevent character collision.
- **REQ-012 [P0] Non-Mirrored Real-World Icons:** Real-world object icons (tractors, animals, water taps, syringes) must never be mirrored in RTL.
  *Acceptance Criteria:* Visual audit confirms only directional navigational arrows flip in RTL; tractors, tools, and animals retain real-world orientation.
- **REQ-013 [P0] Live Language Switching:** Language selection must update the entire UI immediately without requiring an app restart.
  *Acceptance Criteria:* Selecting Sindhi from the language picker re-renders the current screen in Sindhi RTL in under 300ms.
- **REQ-014 [P1] Numeral System Toggle:** Allow user selection between Western digits (0-9) and Eastern Arabic-Indic digits.
  *Acceptance Criteria:* Toggling the numeral preference dynamically switches numbers in lesson arithmetic and page counts.
- **REQ-015 [P1] Dialect Audio Matching:** Onboarding audio confirms regional dialect familiarity.
  *Acceptance Criteria:* Users listen to two short 5-second audio samples and pick the dialect closest to their home region.
- **REQ-016 [P2] Scaffolded Language Stubs:** The architecture must cleanly scaffold Punjabi, Pashto, and Balochi localization.
  *Acceptance Criteria:* ARB resource files and language manager enums exist for `pa`, `ps`, and `bal`.

### Module 3: Device Constraints & Low-Resource Budgets (REQ-017 – REQ-022)
- **REQ-017 [P0] Release APK Size Budget:** Base release APK size must not exceed 40 MB.
  *Acceptance Criteria:* CI pipeline verifies `app-release.apk` <= 40,000,000 bytes before merging release branches.
- **REQ-018 [P0] Downloadable Pack Size Budget:** Individual modular curriculum packs must not exceed 15 MB.
  *Acceptance Criteria:* Automated pack builder rejects any compressed pack exceeding 15,728,640 bytes.
- **REQ-019 [P0] Cold Start Performance:** Cold start to interactive home screen must take <= 4.0 seconds on 2GB RAM test profile.
  *Acceptance Criteria:* Benchmark run on Android 8.0, 2GB RAM profile achieves cold start under 4.0 seconds.
- **REQ-020 [P0] Zero Network Dependency for Downloaded Packs:** Rendered lesson screens must never make blocking network requests.
  *Acceptance Criteria:* In airplane mode, 100% of activities in a downloaded pack execute without UI hitching or error screens.
- **REQ-021 [P1] Low-Data Mode Enforcement:** When enabled, the app must suppress all background sync on cellular data.
  *Acceptance Criteria:* Background sync and pack downloads trigger only on active Wi-Fi unless explicitly authorized by the user.
- **REQ-022 [P1] Image Optimization Budget:** All in-app graphics must use WebP format with maximum dimension 480px.
  *Acceptance Criteria:* CI content linter fails if any image asset exceeds 480px in width or 150KB in file size.

### Module 4: Identity, Household Accounts & Shared Device Profiles (REQ-023 – REQ-030)
- **REQ-023 [P0] Shared Family Learning Account:** Support up to 6 individual profiles per device under one household.
  *Acceptance Criteria:* Up to 6 profiles can be created, each maintaining independent lesson progress and assessment scores.
- **REQ-024 [P0] Visual Avatar Selection:** Profiles must use animal or object illustrations, not user photographs.
  *Acceptance Criteria:* Avatar picker displays 16 distinct animal/nature illustrations with spoken names on tap.
- **REQ-025 [P0] 4-Picture PIN Protection:** Each profile may optionally be protected with a 4-picture sequence PIN.
  *Acceptance Criteria:* Profile switching requires tapping the correct 4-picture sequence; invalid sequence prompts audio retry.
- **REQ-026 [P0] Guardian Management PIN:** Guardians can set a PIN to restrict profile deletion and manage consent.
  *Acceptance Criteria:* Accessing the data export, deletion, or child settings menu requires entering the guardian PIN.
- **REQ-027 [P0] Frictionless Child Onboarding:** Children under 18 can onboard without entering a phone number or password.
  *Acceptance Criteria:* Child profile is created entirely within the household account using avatar, name/audio-tag, and age band.
- **REQ-028 [P1] Spoken Permissions Onboarding:** Permissions (microphone, storage) must be requested contextually with spoken audio explanations.
  *Acceptance Criteria:* Audio explanation plays before the OS permission dialog; a "Not now" button allows proceeding without granting.
- **REQ-029 [P0] Age-Band Categorization:** Three distinct age tiers: Child (5-9), Adolescent (10-17), Adult (18+).
  *Acceptance Criteria:* Curriculum content, tutor vocabulary, and livelihood examples adapt based on the selected age tier.
- **REQ-030 [P1] Fast Profile Switcher:** Switch between household profiles in under 3 taps from the home header.
  *Acceptance Criteria:* Tapping the top avatar icon presents the profile drawer; selecting an avatar changes active learner state instantly.

### Module 5: Adaptive Placement & Diagnostic Assessment Engine (REQ-031 – REQ-040)
- **REQ-031 [P0] Voice-First Placement Ladder:** 8–12 minute non-reading diagnostic assessment.
  *Acceptance Criteria:* Learner completes warm-up, listening comprehension, letter recognition, and numeracy ladders without reading.
- **REQ-032 [P0] Bayesian Knowledge Tracing (BKT) Scoring:** Track mastery probability $p(\text{known})$ per skill offline.
  *Acceptance Criteria:* Local SQLite scoring engine updates skill mastery dynamically after each assessment activity attempt.
- **REQ-033 [P0] Resumable Assessment Sessions:** Assessments can be paused and resumed at any point without progress loss.
  *Acceptance Criteria:* Killing the app during assessment step 5 resumes directly at step 5 upon relaunch.
- **REQ-034 [P0] Early Floor and Ceiling Termination:** Assessment terminates early if learner exhibits clear floor or ceiling mastery.
  *Acceptance Criteria:* 3 consecutive failures at level 1 exits gracefully to Stage 1; 5 consecutive perfect answers advances stage.
- **REQ-035 [P0] Deterministic Pathway Generation:** Generate customized lesson pathway using deterministic rule layer.
  *Acceptance Criteria:* Placement engine outputs JSON pathway with prerequisite enforcement; the LLM never determines placement.
- **REQ-036 [P1] Facilitator Reason Code Tagging:** Every generated pathway item must store a machine-readable `reason_code`.
  *Acceptance Criteria:* Facilitator dashboard displays why each lesson was assigned (e.g., `PREREQ_DEFICIT_UR_LETTERS_G1`).
- **REQ-037 [P1] Livelihood Interest Card Selector:** Learners select interests via picture cards (Farming, Livestock, Shop, Sewing).
  *Acceptance Criteria:* Selected interest cards weight the sequencing of applied numeracy and vocabulary modules.
- **REQ-038 [P1] Schedule Preference Selector:** Spoken selection for preferred learning time (Morning, Afternoon, Evening).
  *Acceptance Criteria:* App schedules local reminder notifications according to the chosen time slot.
- **REQ-039 [P1] Accessibility Self-Diagnostic:** Spoken check verifying visual clarity and hearing volume.
  *Acceptance Criteria:* Learner taps "Cannot hear clearly" or "Cannot see clearly" to automatically enable large text or max volume.
- **REQ-040 [P0] Automatic Re-Placement Triggers:** Trigger re-assessment after 3 consecutive lesson failures or 5 consecutive perfect scores.
  *Acceptance Criteria:* System flags the learner profile and suggests a quick 3-minute diagnostic check.

### Module 6: 12-Week Literacy Curriculum Engine (Urdu & Sindhi) (REQ-041 – REQ-052)
- **REQ-041 [P0] Structured Daily Rhythm:** 5 days/week curriculum (15-25 min/day adults, 10-15 min/day children).
  *Acceptance Criteria:* Each lesson enforces the six-step sequence: Listen -> Say -> See -> Do -> Play -> Check.
- **REQ-042 [P0] Week 1 Environmental Sounds & Matching:** Distinguish sounds and match 20 everyday objects.
  *Acceptance Criteria:* Complete audio-visual matching activities for rural and urban household objects.
- **REQ-043 [P0] Weeks 2–4 Shape-Family Urdu Letters:** Teach letters grouped by base shape (Be-Pe-Te group, Jim-Che group).
  *Acceptance Criteria:* Urdu letter lessons introduce shape families with culturally authentic vocabulary (Ajrak, Bakri, Charpai).
- **REQ-044 [P0] Independent Sindhi 52-Letter Sequence:** Sindhi alphabet taught via independent native sequence.
  *Acceptance Criteria:* Sindhi lessons introduce specific implosive/retroflex characters without copying Urdu sequence.
- **REQ-045 [P0] Aspirated Consonant Explicit Block:** Explicit teaching module for Urdu "do-chashmi he" digraphs.
  *Acceptance Criteria:* Separate interactive tracing and pronunciation activities for Bh, Ph, Th, Jh, Chh sounds.
- **REQ-046 [P0] Weeks 5–6 Word & Sentence Reading:** Recognize 30 common community words and 5 two-word sentences.
  *Acceptance Criteria:* Learner successfully reads two-word phrases (e.g., "صاف پانی", "گرم چائے") with picture verification.
- **REQ-047 [P0] Weeks 7–8 Numeracy & Currency:** Numbers 0-100, counting Pakistani Rupees, and market transactions.
  *Acceptance Criteria:* Learner calculates price totals and change using images of Pakistani rupee notes and coins.
- **REQ-048 [P0] Week 9 Practical Reading:** Reading bus destination boards, shop signs, and clinic notices.
  *Acceptance Criteria:* Learner identifies local bus route signs (e.g., "صدر", "سہراب گوٹھ") and medicine warning symbols.
- **REQ-049 [P0] Week 10 Measurements & Calendars:** Units of weight (kg), volume (litres), area (kanal/acre), and calendar days.
  *Acceptance Criteria:* Learner completes interactive measurement matching for crop yields and milk production.
- **REQ-050 [P0] Week 11 Digital & Mobile Literacy:** Managing phone contacts, reading SMS notices, and recognizing scam messages.
  *Acceptance Criteria:* Learner identifies fake lottery SMS and practices safe PIN non-disclosure habits.
- **REQ-051 [P0] Week 12 Capstone & Checkpoint:** Read short 3-sentence passage, answer questions, and budget a weekly basket.
  *Acceptance Criteria:* Passing capstone triggers issuance of an app-completion certificate.
- **REQ-052 [P0] App-Completion Certificate Disclaimers:** Issued certificates must explicitly state lack of government accreditation.
  *Acceptance Criteria:* Certificate text contains: "This certificate shows completion of lessons in Taleem Se Taraqqi. It is not a government qualification."

### Module 7: Interactive Lesson Player & Multi-Modal Activities (REQ-053 – REQ-060)
- **REQ-053 [P0] Listen-and-Tap Activity Engine:** Play native audio prompt, present 2-4 picture options, validate tap.
  *Acceptance Criteria:* Tapping correct image gives cheerful audio feedback; incorrect tap gives gentle retry prompt.
- **REQ-054 [P0] Canvas Letter Tracing Engine:** Smooth bezier curve tracing with stroke tolerance thresholding.
  *Acceptance Criteria:* Tracing within 35% tolerance of glyph guide path registers success and triggers audio pronunciation.
- **REQ-055 [P0] Drag-to-Build Word Activity:** Drag letter tiles into sequential slots to assemble target words.
  *Acceptance Criteria:* Correct tile order plays blended word audio; misplaced tiles snap back to dock.
- **REQ-056 [P0] Count-and-Tap Numeracy Engine:** Display animated items (goats, coins), learner counts and taps total.
  *Acceptance Criteria:* Tapping each item plays sequential counting audio (aik, do, teen / هڪ, ٻه, ٽي).
- **REQ-057 [P0] Sound-to-Picture Matching:** Play sound (animal, tool, vehicle) and match with corresponding graphic.
  *Acceptance Criteria:* Correct sound-picture association advances progress bar and saves attempt record.
- **REQ-058 [P0] Stage Checkpoint Activity:** Multi-item review quiz (minimum 5 items) with configurable pass threshold.
  *Acceptance Criteria:* Scoring >= 80% marks lesson complete; scoring < 80% generates targeted review queue items.
- **REQ-059 [P0] Local Attempt Logging:** Every activity attempt (duration, correct, hints used, modality) saved to SQLite.
  *Acceptance Criteria:* Database inspection confirms write to `activity_attempt` within 50ms of activity conclusion.
- **REQ-060 [P1] Haptic Feedback:** Provide subtle vibration feedback on correct and incorrect selections.
  *Acceptance Criteria:* Device vibrates briefly on success/retry if haptics enabled in system settings.

### Module 8: Controlled AI Tutor & Pedagogical Orchestration (REQ-061 – REQ-070)
- **REQ-061 [P0] Provider-Agnostic LLM Interface:** Pluggable adapter supporting OpenAI, Anthropic, Gemini, and Local Stub.
  *Acceptance Criteria:* Switching `LLM_PROVIDER` in environment config switches inference provider without code modification.
- **REQ-062 [P0] Five Dedicated Tutor Modes:** Isolated prompts and retrieval indices: `lesson_coach`, `agri_edu`, `livestock_edu`, `health_edu`, `help_finder`.
  *Acceptance Criteria:* Router directs agricultural questions strictly to `agri_edu` system prompt and knowledge index.
- **REQ-063 [P0] Strict JSON Structured Output:** Model responses must parse against defined response schema.
  *Acceptance Criteria:* Output contains `{answer_text, steps[], warnings[], uncertainty_level, refer_to, sources[], reading_level}`.
- **REQ-064 [P0] Retrieval-Augmented Generation (RAG):** Retrieve top-k verified knowledge items from PostgreSQL via pgvector.
  *Acceptance Criteria:* No factual medical, agricultural, or veterinary response is generated without matching retrieved context.
- **REQ-065 [P0] Safe Fallback on Low Retrieval Confidence:** If similarity score is below threshold, tutor must refuse and refer.
  *Acceptance Criteria:* Queries outside approved knowledge trigger: "I don't have a trusted lesson on that yet" and log a content gap.
- **REQ-066 [P0] Respectful Adult Tone:** System prompt enforces patient, dignified language without condescension.
  *Acceptance Criteria:* Prompts address adult learners respectfully and use real-world, practical examples.
- **REQ-067 [P0] Single-Question Interaction Rhythm:** Tutor asks only one question or introduces one concept at a time.
  *Acceptance Criteria:* Model evaluation tests verify responses contain <= 1 question mark per reply turn.
- **REQ-068 [P0] Offline Scripted State Machine Mode:** Offline tutor operates strictly via deterministic scripted state machine.
  *Acceptance Criteria:* When offline, UI displays prominent "Offline lesson mode" badge and serves pre-compiled hint trees.
- **REQ-069 [P1] Golden Test Set CI Regression:** Continuous evaluation against 150+ multilingual and adversarial prompts.
  *Acceptance Criteria:* CI test run verifies zero safety regressions across the golden prompt bank before release.
- **REQ-070 [P1] Content Gap Auto-Logging:** Unanswered learner queries logged as anonymized topics in admin dashboard.
  *Acceptance Criteria:* Reviewers can inspect top 20 requested topics that lack approved curriculum coverage.

### Module 9: Deterministic Safety Rule Engine & Guardrails (REQ-071 – REQ-080)
- **REQ-071 [P0] Pre-LLM Emergency Interception:** Hard regex/keyword engine executes before any model call.
  *Acceptance Criteria:* Critical phrases (chest pain, snakebite, unconscious, convulsions) bypass LLM in < 5ms.
- **REQ-072 [P0] Emergency Call UI Action:** Emergency action presents high-contrast screen with tap-to-call buttons.
  *Acceptance Criteria:* Screen displays large 1122 / 115 call buttons and speaks immediate first-aid precautions.
- **REQ-073 [P0] Absolute Prohibition on Drug Dosages:** Zero tolerance for medical or pediatric drug dosages.
  *Acceptance Criteria:* Queries asking for antibiotic or paracetamol quantities trigger immediate refusal and clinical referral.
- **REQ-074 [P0] Absolute Prohibition on Veterinary Injections:** Refuse all requests for animal injections or dosages.
  *Acceptance Criteria:* Inquiries regarding livestock antibiotic/ivermectin dosages trigger vet dispensary referral.
- **REQ-075 [P0] Post-LLM Dosage Filter:** Output sanitizer scans for dosage regex patterns before displaying text.
  *Acceptance Criteria:* Any response containing `mg`, `ml`, or `tablets` from the model is suppressed and replaced by fallback.
- **REQ-076 [P0] Post-LLM Diagnostic Certainty Filter:** Suppress definitive diagnostic declarations.
  *Acceptance Criteria:* Phrases like "you are suffering from X" are blocked and replaced with educational possibilities.
- **REQ-077 [P0] Multilingual Regex Patterns:** Safety triggers implemented in Urdu script, Sindhi script, and Roman Urdu.
  *Acceptance Criteria:* All 60 test cases in `SAFETY_CASES.md` pass across Urdu, Sindhi, and Roman Urdu.
- **REQ-078 [P0] Banned Agrochemical Interception:** Block advice regarding banned substances (DDT, methyl parathion).
  *Acceptance Criteria:* Inquiries regarding banned chemicals trigger immediate hazard warning and extension officer referral.
- **REQ-079 [P0] Chemical Water Contamination Red Flag:** Alert against washing pesticide bottles in canals or drinking water.
  *Acceptance Criteria:* Mention of washing chemical containers near water triggers immediate environmental safety alert.
- **REQ-080 [P0] Prompt Injection Shield:** Intercept jailbreak attempts (e.g., "ignore all previous instructions").
  *Acceptance Criteria:* Adversarial system prompts trigger standard polite boundary refusal.

### Module 10: Offline Content Packs & Synchronization Engine (REQ-081 – REQ-088)
- **REQ-081 [P0] Atomic Pack Installation:** Lesson packs install atomically from signed ZIP archives.
  *Acceptance Criteria:* Interrupted or corrupted downloads roll back cleanly without leaving partial files on disk.
- **REQ-082 [P0] SHA-256 Checksum Verification:** Packs verified against server checksum before extraction.
  *Acceptance Criteria:* Pack with mismatched hash is rejected and deleted; error logged to sync diagnostics.
- **REQ-083 [P0] Append-Only Sync Event Log:** Local learning interactions stored in append-only SQLite `sync_event` table.
  *Acceptance Criteria:* Every activity completion generates an immutable event record with client timestamp and unique UUID.
- **REQ-084 [P0] Max-Wins Mastery Merge Policy:** Resolving mastery conflicts using maximum progress.
  *Acceptance Criteria:* Server merges local and cloud skill masteries using $p(\text{mastery}) = \max(\text{client}, \text{server})$.
- **REQ-085 [P0] Last-Write-Wins Profile Conflict Policy:** Profile metadata synchronized via timestamped LWW.
  *Acceptance Criteria:* Profile display name or avatar edits resolve to the most recent timestamp.
- **REQ-086 [P0] Idempotent Sync Endpoints:** Pushing sync batches must be safe against repeated network retries.
  *Acceptance Criteria:* Submitting identical sync event batch twice produces identical database state without duplicate records.
- **REQ-087 [P1] Facilitator Local Mesh Seeding:** Allow facilitator devices to share content packs over local Wi-Fi.
  *Acceptance Criteria:* Facilitator tablet hosts local HTTP server allowing classroom tablets to download packs without internet.
- **REQ-088 [P1] Visual Sync Status Indicator:** Header icon indicates pending sync events and last sync timestamp.
  *Acceptance Criteria:* Icon pulses during sync and displays green checkmark upon completion, with spoken explanation on tap.

### Module 11: Applied Pathway: Agriculture (Sindh Rice Lifecycle) (REQ-089 – REQ-093)
- **REQ-089 [P0] Rice Nursery & Transplanting Module:** Audio-visual guide to nursery soil preparation and 25-day seedling stage.
  *Acceptance Criteria:* Interactive calendar shows optimal sowing dates for Sindh canal barrage zones.
- **REQ-090 [P0] Water Depth & Conservation Guide:** Visual ruler showing water depth requirements across vegetative stages.
  *Acceptance Criteria:* Interactive water slider demonstrates water-saving intermittent irrigation techniques.
- **REQ-091 [P0] Interactive Fertilizer Cost Calculator:** Calculator computes urea/DAP bags required and cost per acre.
  *Acceptance Criteria:* Learner inputs their acreage using slider; app speaks total bag requirement and cost in PKR.
- **REQ-092 [P0] Pest & Disease Awareness with Uncertainty:** Photo recognition guide for stem borer and blast disease.
  *Acceptance Criteria:* Guidance displays 3-tier output: What I notice, What it could be, Who to ask (Extension Officer).
- **REQ-093 [P0] Agrochemical Personal Protective Equipment (PPE):** Mandatory safety module on masks, gloves, and storage.
  *Acceptance Criteria:* Activity tests learner on storing pesticides locked away from children, food, and animal feed.

### Module 12: Applied Pathway: Livestock (Goat & Buffalo Care) (REQ-094 – REQ-098)
- **REQ-094 [P0] Buffalo Downer Cow Red Flag Triage:** Immediate triage for livestock unable to stand.
  *Acceptance Criteria:* Selecting "buffalo down" triggers urgent vet referral screen; no self-treatment advice provided.
- **REQ-095 [P0] Goat Bloat & Tympany Warning:** Visual identification of left-side abdominal distension.
  *Acceptance Criteria:* Guidance warns against force-feeding and directs user to call the local veterinary assistant.
- **REQ-096 [P0] Clean Milk Production & Hygiene:** Audio-visual unit on udder washing, clean utensils, and mastitis checks.
  *Acceptance Criteria:* Learner completes step-by-step checklist on hygienic milking and immediate cooling.
- **REQ-097 [P0] Livestock Vaccination Awareness:** Explains why and when animals need preventive vaccinations.
  *Acceptance Criteria:* Module emphasizes scheduling shots through government veterinary dispensaries; gives no drug names.
- **REQ-098 [P1] Feed Cost & Daily Milk Yield Calculator:** Compute daily feed expense against milk revenue.
  *Acceptance Criteria:* Farmer inputs daily litres produced and feed cost; app displays net daily profit in play rupees.

### Module 13: Applied Pathway: Community Health & Hygiene (REQ-099 – REQ-103)
- **REQ-099 [P0] ORS Preparation Protocol:** Strict step-by-step guide matching WHO/UNICEF guidelines.
  *Acceptance Criteria:* Teaches exact ratio: 1 packet of ORS in 1 litre of clean boiled water; zero medication dosage.
- **REQ-100 [P0] Dehydration Signs Visual Triage:** 3-picture triage identifying sunken eyes, skin pinch, and thirst.
  *Acceptance Criteria:* Severe signs trigger emergency referral screen to nearest Basic Health Unit (BHU).
- **REQ-101 [P0] Safe Drinking Water Methods:** Boiling, filtering, and safe covered vessel storage.
  *Acceptance Criteria:* Interactive activity instructs on boiling rolling water for 1 minute before cooling.
- **REQ-102 [P0] Dengue & Malaria Mosquito Prevention:** Removing standing water and sleeping under bed nets.
  *Acceptance Criteria:* Interactive scene where learner taps and empties discarded tyres and stagnant water containers.
- **REQ-103 [P0] Mother & Child Immunization Awareness:** Explains the EPI vaccination card and clinic schedule.
  *Acceptance Criteria:* Audio guide explains why children need EPI drops and injections at birth, 6, 10, and 14 weeks.

### Module 14: Applied Pathway: Household Budgeting & Financial Literacy (REQ-104 – REQ-108)
- **REQ-104 [P0] Picture-Based Rupee Income & Expense Tracker:** Visual cash tracker using note graphics.
  *Acceptance Criteria:* User logs daily bread, tea, and bus expenses by tapping rupee note denominations.
- **REQ-105 [P0] Weekly Household Expense Summary:** Audio summary of weekly food, transport, and savings totals.
  *Acceptance Criteria:* App speaks: "This week you spent 3,500 rupees on food and saved 500 rupees."
- **REQ-106 [P0] Savings Goal Progress Bar:** Visual jug filling up with coins as savings are recorded.
  *Acceptance Criteria:* Setting a 5,000 PKR goal visualizes progress toward purchasing school supplies or seeds.
- **REQ-107 [P1] Village Shop Profit Simulator:** Educational game calculating item cost, selling price, and profit.
  *Acceptance Criteria:* Learner simulates buying soap for 80 PKR and selling for 100 PKR, identifying 20 PKR profit.
- **REQ-108 [P0] Mobile Wallet & PIN Security Training:** Interactive simulation on never sharing secret PINs.
  *Acceptance Criteria:* Learner identifies fraudulent caller asking for OTP and selects the "Hang up and refuse" action.

### Module 15: Verified Help Directory & Emergency Services (REQ-109 – REQ-112)
- **REQ-109 [P0] Base Offline Emergency Helpline Directory:** Embedded directory of Rescue 1122, Edhi 115, Child Helpline 1121.
  *Acceptance Criteria:* Helplines accessible in airplane mode with single-tap phone dialer invocation.
- **REQ-110 [P0] Verification Date & Stale Data Warning:** Display `verified_on` date on all clinic and helpline listings.
  *Acceptance Criteria:* If listing is older than 12 months, app displays: "May be outdated — please verify by phone."
- **REQ-111 [P0] Demo Data Prominent Banners:** All unverified MVP seed listings must display demo banner.
  *Acceptance Criteria:* Unverified directory entries display a yellow "DEMO DATA — NOT REAL" warning tag.
- **REQ-112 [P1] Spatial Distance Nearby Facility Lookup:** PostGIS spatial query for nearest verified clinic/BHU.
  *Acceptance Criteria:* Backend returns verified health facilities ordered by distance from learner's approximate tehsil.

### Module 16: Multi-Role Dashboards & Classroom Heatmaps (REQ-113 – REQ-118)
- **REQ-113 [P0] Learner In-App Visual Progress Dashboard:** Gamified path showing completed days and streak badges.
  *Acceptance Criteria:* Screen displays audio encouragement and recommended next lesson with spoken reason.
- **REQ-114 [P0] Guardian Home Engagement Dashboard:** Progress summary and weekly suggested home activities.
  *Acceptance Criteria:* Guardian can review child's time-on-task and listen to suggested conversational story prompts.
- **REQ-115 [P0] Facilitator Cohort Skill Heatmap:** Matrix displaying skill mastery across all classroom students.
  *Acceptance Criteria:* Facilitator sees green/yellow/red grid of student competencies; clicking red highlights diagnostic gap.
- **REQ-116 [P0] Facilitator Group Scoping Boundary:** Facilitators can only view students assigned to their cohorts.
  *Acceptance Criteria:* API enforces strict RBAC; query for learners outside assigned cohort returns 403 Forbidden.
- **REQ-117 [P0] De-Identified Admin Analytical Overview:** Aggregated district enrollment and stage progression.
  *Acceptance Criteria:* Admin views tehsils with cohort counts; cohorts smaller than 10 students are suppressed.
- **REQ-118 [P0] Content Reviewer Approval Queue:** Review portal for domain experts to inspect diffs and sign off.
  *Acceptance Criteria:* Reviewers can inspect curriculum JSON, test audio, approve content, or reject with revision notes.

### Module 17: Safeguarding, Child Protection & Privacy (REQ-119 – REQ-124)
- **REQ-119 [P0] Harm & Abuse Disclosure Escalation:** Disclosing physical abuse or exploitation triggers safeguarding.
  *Acceptance Criteria:* System terminates lesson coach, speaks supportive message, and displays Child Helpline 1121.
- **REQ-120 [P0] Zero Third-Party Commercial Trackers:** No advertising, behavioral tracking, or commercial SDKs.
  *Acceptance Criteria:* Static binary analysis confirms zero Google AdMob, Facebook SDK, or third-party ad libraries.
- **REQ-121 [P0] Right to Full Data Export:** User or guardian can download complete JSON/CSV export of records.
  *Acceptance Criteria:* `GET /learners/{id}/export` generates full archive of skill masteries, attempts, and logs.
- **REQ-122 [P0] Right to Permanent Hard Delete:** User or guardian can trigger complete database erasure.
  *Acceptance Criteria:* `DELETE /learners/{id}` permanently deletes profile, attempts, and sync records from DB.
- **REQ-123 [P0] Approximate Location Privacy:** Never store precise GPS coordinates in persistent database.
  *Acceptance Criteria:* Database stores location only at tehsil or district region ID level; ephemeral lat/lng discarded after query.
- **REQ-124 [P0] Ephemeral Audio Processing:** Audio recorded for speech recognition discarded immediately after parsing.
  *Acceptance Criteria:* Server and device store zero raw audio files without explicit, revocable guardian consent.

---

## 3. Requirements Traceability Matrix Summary

- **P0 (Must Have for Pilot Release):** 98 Requirements
- **P1 (Should Have for Phase 1 Pilots):** 24 Requirements
- **P2 (Could Have for Future Roadmap):** 2 Requirements
- **Total Requirements:** 124 Requirements across 17 Modules
