# ADR-004: Zero-Pixel Health Frontend & HIPAA Compliance Architecture

## Context
Federal Trade Commission (FTC) enforcement actions (e.g., BetterHelp, GoodRx, Premom) and the FTC Health Breach Notification Rule established that transmitting user browsing data linked to health conditions or intake funnels to third-party ad networks (Meta Pixel, Google Analytics, TikTok Pixel) constitutes an unlawful disclosure of protected health and privacy data. Washington's My Health My Data Act (MHMDA) and California's CMIA impose strict liability and private right of action for unauthorized disclosure of consumer health data without opt-in consent.

## Decision
1. **Zero Third-Party Advertising Pixels on Health Routes**:
   - The frontend application strictly prohibits client-side third-party advertising tracking scripts on all health-related routes:
     - `/intake/*`
     - `/consult/*`
     - `/account/*`
     - `/prescription/*`
     - Any condition-specific product pages indicating sensitive concerns.
2. **Server-Side Anonymized Telemetry**:
   - Web telemetry will run strictly through a first-party, server-side gateway.
   - All IP addresses, User-Agents, and query parameters are stripped of identifying information prior to analytics ingestion.
   - Zero health questionnaire responses or condition selections are ever sent to analytics platforms.
3. **Discreet Patient Communications**:
   - All outbound emails, SMS, and push notifications will use neutral, non-stigmatizing sender headers.
   - Notifications will state "You have an update from AIRO" and will NEVER name the medication, condition (e.g., ED, Hair Loss, Obesity), or treatment in unauthenticated push/SMS/email payloads.
   - Bank/credit card billing descriptors will appear as neutral "AIRO HEALTH" or "AIRO CARE".

## Consequences
### Positive
- Absolute insulation from FTC, HHS OCR, and state attorney general investigations regarding pixel leaks.
- Preserves patient trust and high consumer discretion.

### Negative
- Client-side conversion attribution for ad platforms (Meta Ads, Google Ads) must rely on server-to-server privacy-preserving conversions API (CAPI) on non-health landing pages prior to intake commencement.

## Status
Accepted
