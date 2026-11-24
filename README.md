# AIRO eMed US — Telehealth Platform

> US direct-to-consumer healthcare platform for stigmatized conditions (Hair Loss, ED/PE, Dermatology, Weight Management). Built in accordance with US clinical guidelines, HIPAA, FTC consumer protection rules, state telemedicine practice acts, and LegitScript compliance.

---

## 🏛️ Architecture Overview

The system is organized into a modular clean architecture:

```
airo-emed-us/
├── apps/
│   ├── web/                     # Patient-facing web application (Zero-pixel tracking, HIPAA notice)
│   └── clinician-portal/        # Licensed clinician review workstation & encounter locking
├── packages/
│   ├── types/                   # Shared domain definitions (States, Modalities, CDSS, Prescriptions)
│   ├── core/                    # Core business logic:
│   │   ├── rules-engine/        # 10 Phase 1 launch state rules (TX, FL, GA, AZ, CO, IL, OH, PA, NC, WA)
│   │   ├── cdss/                # Clinical Decision Support System & contraindication hard-stops
│   │   ├── audit/               # HIPAA-compliant immutable PHI access logger
│   │   ├── pharmacy-router/     # Dual-path fulfillment (503A compounding vs LillyDirect/NovoCare)
│   │   └── billing/             # FTC Negative-Option subscription engine (1-click cancel)
│   └── db/                      # PostgreSQL / Prisma schema with no-cascade clinical deletes
├── docs/
│   └── adr/                     # Architecture Decision Records (ADR-001 through ADR-005)
├── .agents/                     # ECC harness rules, agents, workflows, and skills
└── .claude/                     # Claude Code project configuration
```

---

## 📋 Architectural Principles & Compliance

1. **MSO-PC Model**: Clear separation between AIRO US MSO LLC (technology, marketing, billing) and AIRO Medical Group PC (physician-owned, clinical protocols, prescribing).
2. **State Gating & Licensure**: Pre-questionnaire location verification; daily license checks against state medical boards via the Interstate Medical Licensure Compact (IMLC).
3. **Dual-Path Pharmacy**:
   - **503A Compounding**: Personalized hair and skin formulations dispensed by state-licensed partner pharmacies.
   - **Manufacturer Direct**: Branded GLP-1s (Wegovy, Zepbound) routed via LillyDirect / NovoCare. Zero compounded GLP-1s in v1.
4. **Zero-Pixel Privacy**: Strict absence of third-party advertising trackers (Meta, Google, TikTok) on health routes (`/intake`, `/consult`, `/account`).
5. **FTC Negative-Option Billing**: Free consult to start, card pre-authorized at checkout, charged only upon clinician prescription approval, with 1-click self-serve cancellation and pause.

---

## 🧪 Automated Architecture Verification

Run the automated test suite verifying State Gating, CDSS Contraindications, Pharmacy Routing, HIPAA Audit Logging, and FTC Negative Option Subscriptions:

```bash
# Run Core Domain Verification (16 tests)
node --test --experimental-strip-types packages/core/test/domain-verification.test.ts

# Run Clinician Portal Verification (3 tests)
node --test --experimental-strip-types apps/clinician-portal/test/encounter-lock.test.ts
```
