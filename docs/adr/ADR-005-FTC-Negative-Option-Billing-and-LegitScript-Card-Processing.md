# ADR-005: FTC Negative-Option Subscription Billing & LegitScript Card Processing

## Context
Telehealth recurring subscription models are heavily scrutinized by the Federal Trade Commission under the "Negative Option Rule" (16 CFR Part 425) and state auto-renewal laws (e.g., California ARL). Regulators require transparent pre-disclosure of subscription terms, clear recurring cadence, simple cancellation mechanisms equal in ease to enrollment ("click to cancel"), and advance notice before renewals. In addition, payment processors (Stripe, Visa, Mastercard) and ad platforms (Google, Meta) mandate **LegitScript Certification** for card-not-present telemedicine and pharmacy processing.

## Decision
1. **Pre-Authorization Hold at Checkout**:
   - The initial medical consultation is free to start.
   - At checkout, the patient's payment method (credit/debit card, HSA/FSA card) is validated with an authorization hold ($0 or temporary pending authorization).
   - The card is ONLY captured and billed if and when the licensed clinician officially approves the treatment and signs the prescription.
   - If the clinician declines the prescription (e.g., contraindicated), the authorization is released immediately with zero charge.
2. **FTC Negative-Option Subscription Lifecycle**:
   - Clear and conspicuous disclosures at checkout showing: monthly membership price, renewal frequency, and how to cancel.
   - Self-serve patient dashboard with immediate:
     - 1-click **Cancel Subscription** (no phone call or retention maze required).
     - **Pause Subscription** (1-3 months).
     - **Skip Next Delivery**.
     - **Dose Adjustment Request** (triggers clinician re-evaluation).
   - Automated email reminder sent 72 hours prior to every recurring renewal.
3. **LegitScript Certification & HSA/FSA Acceptance**:
   - Merchant of Record configured under Telemedicine Merchant Category Code (MCC 8099).
   - LegitScript certification application submitted during Phase 0 foundation.
   - Integration with Stripe's SIGIS-certified HSA/FSA processing pipeline, generating IIAS-compliant itemized receipts with 9-digit NPI, provider name, and NDC numbers for reimbursement.

## Consequences
### Positive
- Strict alignment with FTC consumer protection standards and California Auto-Renewal Law.
- Card dispute and chargeback rates minimized.
- High patient retention built on consumer trust rather than cancellation friction.

### Negative
- Requires robust automated notification pipelines and payment state machines for async clinician approvals.

## Status
Accepted
