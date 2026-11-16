# Content Review Register & Governance

*All curriculum units, health guidance, agricultural practices, veterinary advice, emergency directories, and language string bundles must be reviewed by accredited domain specialists before inclusion in production releases.*

## Review Workflow
1. **DRAFT / AWAITING_REVIEW**: Content authored according to schema or AI-generated. In dev builds only (`PILOT-DRAFT` flag required).
2. **IN_REVIEW**: Submitted to accredited specialist (Pedagogue, Native Linguist, Physician, Veterinarian, or Agronomist).
3. **APPROVED**: Signed off with reviewer name, accreditation, source documentation, and verification date.
4. **RETIRED**: Superseded or expired content (auto-flagged if older than `valid_until`).

---

## Content & Localization Review Log

| Content Ref / ID | Domain | Language | Title / Component | Source Material | Reviewer Name & Role | Status | Reviewed On | Valid Until | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `mobile/lib/l10n/app_ur.arb` | UI Localization | Urdu | Core UI Strings & RTL Labels | App Interface Spec | Awaiting Certified Urdu Linguist | awaiting native reviewer | - | - | AI-authored initial bundle; requires dialect & cultural tone audit. |
| `mobile/lib/l10n/app_sd.arb` | UI Localization | Sindhi | Core UI Strings & RTL Labels | App Interface Spec | Awaiting Certified Sindhi Linguist | awaiting native reviewer | - | - | AI-authored initial bundle; needs review of Sindhi-specific typography and grammar. |
| `rules.safety.ur` | Safety Rule Engine | Urdu | Emergency, Health & Safeguarding Keywords | National Helplines & Clinical Guides | Awaiting Clinical / Safeguarding Reviewer | awaiting native reviewer | - | - | Urdu regex patterns for emergencies, poisoning, dosage refusals. |
| `rules.safety.sd` | Safety Rule Engine | Sindhi | Livestock, Agri & Emergency Keywords | Sindh Agri/Vet Field Bulletins | Awaiting Sindhi Agricultural/Vet Reviewer | awaiting native reviewer | - | - | Sindhi regex patterns for downer cow, bloat, pesticide storage. |
| `rules.safety.roman` | Safety Rule Engine | Roman Urdu | Transliterated Emergency & Triage Patterns | Regional Helpline Transcripts | Awaiting Community Reviewer | awaiting native reviewer | - | - | Colloquial Roman-Urdu transliterations (e.g. jhatkay, mitti ka tel). |
| `ur.w01.d1.l1` | Literacy (UR) | Urdu | Everyday Sounds & Objects (گھر اور ماحول کی آوازیں) | National ECE Curriculum Pakistan | Awaiting Certified Literacy Pedagogue | draft | - | - | Initial lesson structure drafted; pending recording & pedagogue approval. |
| `sd.w01.d1.l1` | Literacy (SD) | Sindhi | Everyday Sounds & Objects (گھر ۽ ماحول جا آواز) | Sindh Education Foundation Primer | Awaiting Certified Sindhi Pedagogue | draft | - | - | Draft lesson structure; pending 52-letter sequence sign-off. |
| `hlth.ors.001` | Health | Urdu/Sindhi | ORS Preparation & Dehydration Signs | WHO/UNICEF Child Diarrhoea Protocol | Awaiting Public Health Physician | awaiting native reviewer | - | - | Strict refusal of self-medication; pending clinical sign-off. |
| `agri.rice.001`| Agriculture | Urdu/Sindhi | Rice Nursery Land Preparation (Sindh) | PARC Rice Manual | Awaiting Extension Officer | awaiting native reviewer | - | - | Pending Sindh Agricultural Extension department review. |
| `vet.goat.001` | Livestock | Urdu/Sindhi | Goat Bloat & Downer Signs | Sindh Livestock Dept Advisory | Awaiting Veterinary Officer | awaiting native reviewer | - | - | Pending DVM sign-off on red-flag conditions. |
| `dir.emerg.001`| Emergency | National | Emergency Services (Rescue 1122, Edhi 115) | Official Directory Listing | System Operations | draft | 2026-11-16 | 2027-11-16 | Marked DEMO DATA until live dispatch verification. |

---

## Source Whitelist Policy
Only the following sources are authorized for medical, agricultural, and educational facts:
- Government of Pakistan Ministry of National Health Services, Regulations & Coordination
- Sindh Livestock & Fisheries Department / Punjab Livestock Department
- Pakistan Agricultural Research Council (PARC) & provincial agriculture extension directorates
- WHO / UNICEF Pakistan Country Office guidelines
- Rescue 1122 & Pakistan Red Crescent verified directories
- Standard National Curriculum / Sindh Education Foundation primers
