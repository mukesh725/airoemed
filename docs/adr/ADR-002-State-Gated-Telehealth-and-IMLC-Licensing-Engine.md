# ADR-002: State-Gated Telehealth & Interstate Medical Licensure (IMLC) Engine

## Context
In the United States, medical licensure and telemedicine practice standards are regulated at the individual state level. A clinician must hold an active license in the exact state where the patient is physically located at the time of care. Furthermore, state medical boards differ on whether asynchronous store-and-forward questionnaires establish a legitimate patient-provider relationship or whether a synchronous audio-video consult is required before a prescription can be issued.

## Decision
1. **Intake State Gate**:
   - The user must declare their state of residence and current physical location prior to commencing the clinical intake questionnaire.
   - If the patient is located in an unserved state (not in Phase 1's 10 states: TX, FL, GA, AZ, CO, IL, OH, PA, NC, WA), intake is immediately halted, and the user is routed to a compliant early-access waitlist.
2. **Modality Matrix**:
   - The State Rules Engine determines consultation modality per state and category:
     - **Async Store-and-Forward**: Permitted in Texas, Florida, Arizona, etc., with structured clinical questionnaires and required photo uploads.
     - **Synchronous Video Required**: If a state requires synchronous interaction (or if clinical red flags dictate in physician judgement), the encounter automatically switches to a WebRTC video appointment workflow.
3. **Daily IMLC & State Board License Verification**:
   - Clinicians in the network are mapped to their state licenses.
   - The system executes a daily batch check against state board registry APIs and the Interstate Medical Licensure Compact (IMLC) clearinghouse.
   - An encounter can ONLY be assigned to or signed by a clinician whose license is verified active in the patient's state on that exact date.

## Consequences
### Positive
- Zero risk of illegal interstate practice of medicine.
- Dynamic rule updates as states amend telemedicine standards without rewriting application code.
- Full defensibility during state medical board audits.

### Negative
- Requires maintaining an active roster of multi-state licensed clinicians (or IMLC participants).
- Daily licensure sync requires robust integration and fallback mechanisms.

## Status
Accepted
