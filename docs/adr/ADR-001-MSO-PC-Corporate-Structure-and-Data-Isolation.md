# ADR-001: MSO-PC Corporate Model & HIPAA Multi-Tenant Data Isolation

## Context
Under US healthcare law, the **Corporate Practice of Medicine (CPOM)** doctrine in many target launch states (such as Texas, California, and Illinois) prohibits non-physician-owned business corporations from practicing medicine, employing physicians, or exercising control over medical judgements. Furthermore, AIRO eMed operates in India under Indian privacy laws (DPDP Act 2023), while the US platform must comply with the Health Insurance Portability and Accountability Act (HIPAA), state health-privacy acts (such as Washington's My Health My Data Act), and the FTC Health Breach Notification Rule.

## Decision
1. **Corporate Structure**:
   - **AIRO US MSO LLC** (Management Services Organization) will provide software, patient acquisition, non-clinical customer service, billing infrastructure, and administrative tools.
   - **AIRO Medical Group PC** (Professional Corporation / Association), owned 100% by a US-licensed physician, will employ or contract with clinicians, own all clinical protocols, and make all medical prescribing decisions.
   - A comprehensive Management Services Agreement (MSA) and HIPAA Business Associate Agreement (BAA) govern the relationship between the MSO and the PC.
2. **Infrastructure & Data Isolation**:
   - Complete technical and logical isolation from AIRO India. AIRO US operates in dedicated AWS US regions (`us-east-1` primary, `us-west-2` failover) under a Business Associate Agreement with Amazon Web Services.
   - No patient Protected Health Information (PHI) is ever replicated, accessible, or routed to Indian infrastructure or non-US clinical staff.
   - Encryption of all PHI at rest via AWS KMS Customer Managed Keys (CMK) and in transit via TLS 1.3.

## Consequences
### Positive
- Strict compliance with state CPOM doctrines across all launch states.
- Clear HIPAA covered entity (PC) vs business associate (MSO) legal boundaries.
- Total regulatory insulation of US patient data.

### Negative
- Operational overhead of managing inter-company billing and distinct legal entities.
- Independent infrastructure costs for US-only cloud regions.

## Status
Accepted
