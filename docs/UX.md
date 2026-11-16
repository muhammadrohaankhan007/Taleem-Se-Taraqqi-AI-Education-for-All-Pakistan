# UX & Design Guidelines — Voice-First & Non-Reader Interactions

**App Name:** Taleem Se Taraqqi (تعلیم سے ترقی)  
**Core Design Axiom:** A person who **cannot read** must be able to complete every primary flow using **pictures + sound + touch**.

---

## 1. Key User Journeys

### Journey 1: Non-Reading Child (First Time Launch)
1. **App Opens:** Full-screen greeting with cheerful visual illustration of a sun and school bell. Native spoken audio in Urdu and Sindhi greets the child: *"خوش آمدید! آواز سننے کے لیے سپیکر چھوئیں۔"*
2. **Language Selection:** Three large cards (Urdu with crescent/calligraphy, Sindhi with Ajrak motif, English). Tapping any card immediately plays its spoken name.
3. **Profile Creation:** Child taps their favorite animal avatar (e.g. Peacock / مور or Lion / شیر).
4. **PIN Setup (Optional):** Child selects 4 pictures (e.g. Star, Sun, Apple, Flower) to secure their profile on the shared family phone.
5. **Warm-up Assessment:** Game starts: "Tap the bird making this sound." Child completes 3 sound taps without reading a single word.

### Journey 2: Rural Farmer (Sindhi Livelihood Guidance)
1. **Home Screen:** Farmer selects the "Farming / ٻني پوکڻ" icon (Tractor + Rice stalk picture).
2. **Voice Inquiry:** Farmer presses the large microphone button and asks in Sindhi: *"ٻج ڪڏهن پوکڻ گهرجي؟"* (When should nursery seeds be sown?).
3. **Audio-Visual Advice:** System responds with native Sindhi voice explanation grounded in the Sindh Rice Calendar, showing pictures of nursery water depth and seedling age (25–30 days).
4. **Cost Calculator:** Farmer adjusts slider showing bags of fertilizer; the app speaks the total cost in Pakistani Rupees (PKR) and compares it with expected yield.

### Journey 3: Mother Seeking Emergency Help for Child Diarrhea
1. **Home Screen:** Mother taps the red Medical / صحت icon.
2. **Red-Flag Triage:** App displays 3 high-contrast pictures:
   - Alert child drinking water (Mild dehydration)
   - Sunken eyes & crying without tears (Moderate)
   - Child unconscious or cannot drink (Severe emergency)
3. **Outcome:** Mother taps "Sunken eyes". The app immediately plays clear audio on preparing 1 packet of ORS in 1 litre of boiled clean water, and highlights the "Find Nearest Dispensary" button with one-tap dialing to Lady Health Worker (LHW) or BHU.

---

## 2. Low-Literacy Wireframe Standards

### 2.1 Color Palette & Contrast
- **Primary Color:** Deep Forest Green (`#1B5E20`) — culturally positive, reassuring, high contrast.
- **Secondary Accent:** Warm Golden Sun (`#F59E0B`) — highlights active audio cues and interactive buttons.
- **Safety / Emergency:** High-Visibility Crimson (`#DC2626`) — reserved exclusively for emergency escalation screens.
- **Background:** Soft Off-White (`#F9FBF9`) — reduces eye strain on low-quality TN LCD phone screens.

### 2.2 Touch Target Specifications
- **Minimum Target Size:** $\ge 56\text{ dp} \times 56\text{ dp}$ for all primary buttons, avatar selectors, and answer tiles.
- **Spacing:** Minimum $12\text{ dp}$ margin between clickable elements to avoid accidental taps by children or working adults.

### 2.3 RTL Directionality Rules
- Directional UI icons (back arrows, next arrows, progress indicators) are flipped automatically in RTL mode (`Transform.scale(scaleX: -1)`).
- Real-world entity icons (tractors, goats, water taps, syringes, books) are **never mirrored**.
