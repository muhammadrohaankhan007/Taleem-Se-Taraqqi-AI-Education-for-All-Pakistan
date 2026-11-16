# System Architecture & Technical Design

**Project:** Taleem Se Taraqqi (AI Education for All — Pakistan)  
**Architecture Style:** Offline-First Modular Monolith with Edge Synchronisation & Controlled AI Orchestration

---

## 1. High-Level System Context (C4 Context Diagram)

```mermaid
flowchart TD
    User["Learner / Guardian\n(Non-literate Adult, Child, Farmer)"]
    Facilitator["Community School Facilitator\n(Classroom Tablet / Seed Device)"]
    
    subgraph MobileDevice["Affordable Android Device (2GB RAM, Android 8+)"]
        App["Taleem Se Taraqqi Flutter Client\n- Voice & Touch UI (RTL)\n- Drift / SQLite Local DB\n- Offline Lesson Player\n- Local Safety Interceptor"]
    end
    
    subgraph CloudInfra["Backend Cloud Infrastructure (Docker / K8s)"]
        API["FastAPI Gateway & Auth"]
        SafetyEngine["Deterministic Safety Rule Engine\n(Pre- & Post-LLM Guardrails)"]
        TutorOrchestrator["Controlled AI Tutor Orchestrator\n(5 Bounded Modes)"]
        SyncService["Delta Sync Engine\n(Max-Wins Conflict Resolver)"]
        DB[("PostgreSQL 16 + PostGIS + pgvector")]
        Storage[("StorageBackend\n(LocalDiskStorage Dev Volume / S3 Adapter)")]
    end

    AdminUser["Admin / Curriculum Reviewer"]
    AdminWeb["Admin & Reviewer Portal (React + Vite)"]

    User -->|Touch, Spoken Audio| App
    Facilitator -->|Seeding & Class Sync| App
    App -->|Batch Sync Events / Packs| API
    AdminUser -->|Reviews & Aggregations| AdminWeb
    AdminWeb -->|REST API| API

    API --> SafetyEngine
    API --> TutorOrchestrator
    API --> SyncService
    API --> DB
    API --> Storage
```

### Storage Architecture
Asset and content pack distribution is decoupled via `StorageBackend`:
- **Development / Milestone 0–3:** `LocalDiskStorage` backed by a persistent Docker volume (`storage_data:/app/storage`), serving lesson audio, images, and content bundles without external daemon dependencies.
- **Production / Milestone 4+:** `S3Storage` adapter plug-in connecting to remote S3-compatible cloud object storage for regional CDN distribution.

---

## 2. Request & AI Safety Pipeline

Every tutor or guidance query follows this pipeline:

```mermaid
sequenceDiagram
    autonumber
    actor Learner as Learner (Voice / Text)
    participant Client as Flutter Mobile Client
    participant PreFilter as Deterministic Pre-LLM Rule Filter
    participant Router as Tutor Mode Router
    participant RAG as Knowledge Retrieval (pgvector)
    participant LLM as Bounded LLM Provider
    participant PostFilter as Post-LLM Dosage / Diagnosis Filter

    Learner->>Client: Speaks or Taps Query
    Client->>PreFilter: Evaluate input text
    alt Emergency / Poison / Abuse Red Flag Detected
        PreFilter-->>Client: Escalation Action (Rescue 1122 / 1121 Helpline)
        Client-->>Learner: High-contrast call buttons + Spoken Urdu/Sindhi audio
    else Medication / Prescription Query
        PreFilter-->>Client: Refusal Action (msg.refuse.rx_prescription)
        Client-->>Learner: Polite boundary notice + Local clinic referral
    else Allowed Educational / Livelihood Query
        PreFilter->>Router: Route to (lesson_coach, agri_edu, livestock_edu, health_edu)
        Router->>RAG: Retrieve top-k verified knowledge_items
        RAG-->>Router: Verified items (with reviewer, date, source)
        Router->>LLM: Prompt with retrieved context & strict JSON schema
        LLM-->>PostFilter: Structured reply candidate
        PostFilter->>PostFilter: Check for hallucinated dosages or diagnostic claims
        alt Output Violation Detected
            PostFilter-->>Client: Fallback verified educational script
        else Output Valid
            PostFilter-->>Client: Safe response with uncertainty level & sources
        end
        Client-->>Learner: Display text + Play pre-recorded/TTS audio
    end
```

---

## 3. Offline Synchronization Architecture

```mermaid
flowchart LR
    subgraph Device["Android Client (Offline)"]
        LocalUI["Lesson Activity Completed"] -->|Write Attempt| LocalEventLog["Local sync_event Log\n(SQLite / Drift)"]
        LocalEventLog --> LocalMastery["Update Skill Mastery\n(Local Bayesian State)"]
    end

    subgraph SyncEngine["Network Available (Wi-Fi / Facilitator Mesh)"]
        LocalEventLog -->|Push Batch| ServerSync["POST /sync/push\n(Idempotent Event IDs)"]
        ServerSync --> ConflictResolution{"Conflict Policy"}
        ConflictResolution -->|Mastery Progress| MaxWins["Max-Wins Rule\np_known = max(client, server)"]
        ConflictResolution -->|Profile Settings| LWW["Last-Write-Wins Rule\n(Server TS validation)"]
        MaxWins --> CentralDB[("PostgreSQL\nCentral Learner State")]
        LWW --> CentralDB
        CentralDB -->|Cursor Delta| ClientPull["GET /sync/pull?cursor="]
        ClientPull --> LocalEventLog
    end
```

---

## 4. Threat Model & Security Boundaries

1. **Minors & Safeguarding Threat:** Unauthorized contact with minors.
   - *Mitigation:* Zero open messaging, zero public learner profiles, zero contact list access.
2. **Medical & Agrochemical Liability Threat:** Hallucinated dosage causing human, crop, or livestock harm.
   - *Mitigation:* Hard regex and dictionary pre-LLM and post-LLM rule engine; all knowledge items require human doctor/vet sign-off in `CONTENT_REVIEW.md`.
3. **Stale Information Threat:** Learner dials outdated emergency or hospital number during crisis.
   - *Mitigation:* Listings store `verified_on`. If older than 12 months, app displays and speaks a prominent warning banner.
4. **Data Leakage on Shared Devices:** Sibling or neighbor inspecting another family member's personal progress.
   - *Mitigation:* 4-symbol picture PIN per profile; session locks on profile switch; AES-256 database encryption via SQLCipher.
