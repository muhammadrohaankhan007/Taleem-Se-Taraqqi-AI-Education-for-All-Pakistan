# Taleem Se Taraqqi (تعلیم سے ترقی) — Privacy Policy & Safeguarding Protocol

*Effective Date: 2026-11-15*

---

## 1. Core Privacy Tenets

1. **Data Minimization by Design:** We collect only what is strictly necessary to maintain learning continuity on shared, low-end mobile devices.
2. **Zero Commercial Exploitation:** No advertising SDKs, no tracking pixels, no third-party behavioral analytics, and zero sale or monetization of user data.
3. **No Invasive Identifiers:**
   - No National Identity Card (CNIC) or Form-B numbers collected.
   - No biometric data collected.
   - No access to device contact lists or personal SMS logs.
   - No continuous GPS tracking. Location is requested solely at regional (tehsil/district) resolution for localized curriculum calendars and emergency helplines. If a user triggers "find nearest clinic", coordinates are processed strictly in volatile memory and never persisted.
4. **No Raw Audio Storage by Default:** Microphone audio is processed on-device or streamed ephemerally for transcription/evaluation and discarded immediately. Audio is never stored on backend servers without explicit, revocable guardian consent.
5. **No Open Social or Minors Chat:** There are no open chatrooms, direct messaging features, or public learner directories. Children interact exclusively with the curated, safety-bounded tutor engine and their designated classroom facilitator.

---

## 2. Shared Device & Household Profile Architecture

To protect individuals sharing a single phone in rural and low-income households:
- Up to 6 profiles per household account.
- Each profile is identified by an animal/object picture avatar and an optional 4-picture PIN.
- Progress, mastery records, and assessment levels are strictly segregated per profile.
- Guardians have an administrative PIN to view children's progress summaries, revoke consent, or trigger data deletion.

---

## 3. Consent Management

- **Child Learners (Under 18):** Express verification and informed consent by a parent or guardian required during onboarding. Spoken audio explanations in Urdu or Sindhi accompany picture-based consent options.
- **Adult Learners:** Spoken consent explaining data usage, offline caching, and tutor interaction.
- **Revocation:** Consent can be revoked at any time via the Guardian/Account settings menu or by requesting assistance from the local community school facilitator.

---

## 4. Right to Data Export and Hard Delete

- **Full Export:** Users can download an unencrypted JSON/CSV bundle of all learning events, skill mastery levels, and profile data at any time via `GET /learners/{id}/export`.
- **Hard Delete:** When `DELETE /learners/{id}` is triggered:
  1. The learner profile and all associated activity attempts, skill masteries, and sync logs are permanently purged from the active database.
  2. Local device SQLite databases clear corresponding profile records upon the next sync or immediate local logout.
  3. Database backups expire on an automated 30-day rolling encryption lifecycle, ensuring complete hard erasure.

---

## 5. Safeguarding & Harm Disclosure Protocol

If an interaction or voice input indicates child abuse, physical violence, exploitation, or self-harm:
1. Normal educational tutoring terminates immediately.
2. The user receives a gentle, non-judgmental spoken audio message affirming support.
3. The screen displays verified national emergency and child protection hotlines (e.g., Child Protection Helpline 1121, Madadgaar 1098, Rescue 1122) with single-tap calling.
4. Designated school facilitators are notified only if prior guardian safeguarding consent exists, adhering strictly to regional child welfare protocols.

---

## 6. Technical Security Measures

- **In Transit:** TLS 1.3 enforced for all backend communication.
- **At Rest:** AES-256 encryption on database volumes; SQLCipher encrypted storage on mobile devices with keys secured in Android Keystore.
- **Role-Based Access Control (RBAC):** Facilitators can only view aggregated and anonymized progress of learners in their assigned cohort. Facilitators cannot access personal home details or other classes.
- **Admin De-identification:** System dashboards aggregate data across tehsils/districts; groups smaller than 10 learners are suppressed to prevent reverse re-identification.
