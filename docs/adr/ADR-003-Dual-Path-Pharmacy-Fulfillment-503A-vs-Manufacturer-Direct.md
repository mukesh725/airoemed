# ADR-003: Dual-Path Pharmacy Fulfillment (503A Compounding vs. Manufacturer Direct)

## Context
Compounded medications under Section 503A of the Federal Food, Drug, and Cosmetic Act (FD&C Act) require a valid, patient-specific prescription and must not be a copy of a commercially available FDA-approved drug unless an active FDA drug shortage exists or there is a documented patient-specific clinical need (e.g., removing an allergen, altering dosage form). In 2026, the FDA issued over 55 warning letters regarding telehealth companies marketing compounded GLP-1 receptor agonists (semaglutide, tirzepatide) off the shortage list and implying equivalence to approved drugs. Furthermore, mail-order pharmacies must hold non-resident dispensing permits in every state they ship into.

## Decision
1. **Zero Compounded GLP-1s in v1**:
   - AIRO eMed US will not compound or dispense compounded semaglutide or tirzepatide in Phase 1.
   - For Weight Loss, prescriptions will be electronically routed via e-Prescribing (NCPDP SCRIPT / Surescripts) to manufacturer-direct self-pay fulfillment channels: **LillyDirect** (Zepbound, Foundayo) and **NovoCare** (Wegovy).
   - The patient pays the manufacturer self-pay price directly or as a pure pass-through; AIRO charges an independent $79/month care and coaching membership fee.
2. **503A Compounding for Personalized Formulations**:
   - For Hair Loss and Dermatology, AIRO will partner with accredited 503A compounding mail-order pharmacies (e.g., Belmar, Truepill) to compound customized, patient-specific formulations (e.g., compounded topical sprays combining minoxidil + finasteride + tretinoin).
   - Oral generics (finasteride, sildenafil, tadalafil) will be dispensed as standard FDA-approved generics.
3. **State Pharmacy Permit Enforcement**:
   - The fulfillment routing engine checks the patient's destination shipping state against the partner pharmacy's active out-of-state permits before routing an order.

## Consequences
### Positive
- Completely avoids FDA warning letters, Lanham Act lawsuits from pharmaceutical manufacturers, and regulatory crackdowns.
- Provides legitimate patient-specific compounding for hair and skin with healthy unit margins.
- Clean separation between healthcare membership revenue and pharmaceutical pass-through.

### Negative
- Weight-loss gross revenue margin is lower since drug cost is a direct manufacturer pass-through.
- Two distinct pharmacy integration interfaces must be maintained (NCPDP SCRIPT / Surescripts and 503A pharmacy REST APIs).

## Status
Accepted
