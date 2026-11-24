import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import {
  EligibilityValidator,
  CDSSEvaluator,
  PharmacyRoutingEngine,
  HASTAuditLogger,
  SubscriptionEngine,
  STATE_TELEHEALTH_RULES,
} from '../dist/index.js';

describe('AIRO eMed US — Core Architecture Verification', () => {
  describe('1. State Gating & Clinical Licensure Engine', () => {
    it('allows async intake for eligible patient in Texas (Phase 1 Launch State)', () => {
      const result = EligibilityValidator.validatePatientEligibility(
        'TX',
        'TX',
        'SEXUAL_HEALTH_ED',
        28
      );

      assert.strictEqual(result.isEligible, true);
      assert.strictEqual(result.allowedModality, 'ASYNC_STORE_AND_FORWARD');
      assert.ok(result.requiredDisclosures.length > 0);
    });

    it('blocks patient located in unserved expansion state (e.g. MI) with waitlist notice', () => {
      const result = EligibilityValidator.validatePatientEligibility(
        'MI',
        'MI',
        'HAIR_LOSS',
        25
      );

      assert.strictEqual(result.isEligible, false);
      assert.ok(result.reasons[0]?.includes('not yet licensed'));
    });

    it('enforces minimum age of 21 for Sexual Health (ED)', () => {
      const result = EligibilityValidator.validatePatientEligibility(
        'TX',
        'TX',
        'SEXUAL_HEALTH_ED',
        19
      );

      assert.strictEqual(result.isEligible, false);
      assert.ok(result.reasons[0]?.includes('at least 21 years old'));
    });

    it('matches patient state only to clinicians holding active, non-expired licenses in that state', () => {
      const mockClinicians = [
        {
          clinicianId: 'doc_tx_active',
          name: 'Dr. Sarah Smith, MD',
          licenses: [
            {
              licenseId: 'lic_1',
              clinicianId: 'doc_tx_active',
              state: 'TX' as const,
              licenseNumber: 'TX-98765',
              licenseType: 'MD' as const,
              isActive: true,
              lastVerifiedAt: new Date(),
              expiresAt: new Date(Date.now() + 86400000 * 180), // 180 days in future
              imlcCompactIssued: true,
            },
          ],
        },
        {
          clinicianId: 'doc_fl_only',
          name: 'Dr. Robert Davis, DO',
          licenses: [
            {
              licenseId: 'lic_2',
              clinicianId: 'doc_fl_only',
              state: 'FL' as const,
              licenseNumber: 'FL-43210',
              licenseType: 'DO' as const,
              isActive: true,
              lastVerifiedAt: new Date(),
              expiresAt: new Date(Date.now() + 86400000 * 180),
              imlcCompactIssued: true,
            },
          ],
        },
      ];

      const qualified = EligibilityValidator.findQualifiedClinicians('TX', mockClinicians);
      assert.deepStrictEqual(qualified, ['doc_tx_active']);
    });
  });

  describe('2. Clinical Decision Support System (CDSS) & Contraindication Hard-Stops', () => {
    it('triggers CRITICAL HARD-STOP when Sexual Health intake mentions Nitrates', () => {
      const cdssResult = CDSSEvaluator.evaluateIntake(
        'SEXUAL_HEALTH_ED',
        {
          takesNitratesOrPoppers: true,
          systolicBloodPressure: 125,
          diastolicBloodPressure: 80,
        },
        'MALE'
      );

      assert.strictEqual(cdssResult.hasHardStop, true);
      assert.strictEqual(cdssResult.canProceedToReview, false);
      assert.strictEqual(cdssResult.findings[0]?.ruleId, 'ED-CONTRA-NITRATES');
      assert.strictEqual(cdssResult.findings[0]?.actionRequired, 'REJECT_APPLICATION');
    });

    it('triggers CRITICAL HARD-STOP when Weight intake mentions Family MTC / MEN2 Thyroid Cancer', () => {
      const cdssResult = CDSSEvaluator.evaluateIntake(
        'WEIGHT_MANAGEMENT',
        {
          calculatedBMI: 32,
          personalOrFamilyMTC: true,
        },
        'FEMALE'
      );

      assert.strictEqual(cdssResult.hasHardStop, true);
      assert.strictEqual(cdssResult.canProceedToReview, false);
      assert.strictEqual(cdssResult.findings[0]?.ruleId, 'WEIGHT-CONTRA-MTC-MEN2');
    });

    it('triggers CRITICAL HARD-STOP for female of childbearing potential on Finasteride', () => {
      const cdssResult = CDSSEvaluator.evaluateIntake(
        'HAIR_LOSS',
        {
          pregnantOrBreastfeeding: true,
        },
        'FEMALE'
      );

      assert.strictEqual(cdssResult.hasHardStop, true);
      assert.strictEqual(cdssResult.findings[0]?.ruleId, 'HAIR-CONTRA-TERATOGENIC-FINASTERIDE');
    });

    it('passes clean patient intake with zero contraindications', () => {
      const cdssResult = CDSSEvaluator.evaluateIntake(
        'HAIR_LOSS',
        {
          pregnantOrBreastfeeding: false,
          suddenPatchyHairLoss: false,
        },
        'MALE'
      );

      assert.strictEqual(cdssResult.hasHardStop, false);
      assert.strictEqual(cdssResult.canProceedToReview, true);
      assert.strictEqual(cdssResult.findings.length, 0);
    });
  });

  describe('3. Dual-Path Pharmacy Fulfillment Router', () => {
    it('strictly REJECTS any attempt to compound GLP-1 weight medications in v1', () => {
      const decision = PharmacyRoutingEngine.routePrescription(
        {
          id: 'med_comp_glp1',
          ndcOrCompoundCode: 'CMP-SEMA-01',
          displayName: 'Compounded Semaglutide',
          category: 'WEIGHT_MANAGEMENT',
          type: 'COMPOUNDED_503A',
          strength: '1mg/mL',
          dosageForm: 'Subcutaneous Solution',
          defaultDaysSupply: 30,
          monthlyRetailPriceUSD: 199,
          isManufacturerPassThrough: false,
          partnerPharmacyIds: ['pharm_belmar'],
        },
        'TX',
        []
      );

      assert.strictEqual(decision.success, false);
      assert.ok(decision.error?.includes('strictly prohibited'));
    });

    it('routes branded Wegovy directly to NovoCare self-pay manufacturer channel', () => {
      const decision = PharmacyRoutingEngine.routePrescription(
        {
          id: 'med_wegovy',
          ndcOrCompoundCode: '0169-4501-14',
          displayName: 'Wegovy 2.4mg Pen (NovoCare)',
          category: 'WEIGHT_MANAGEMENT',
          type: 'MANUFACTURER_DIRECT_BRANDED',
          strength: '2.4mg/0.75mL',
          dosageForm: 'Pen Injector',
          defaultDaysSupply: 30,
          monthlyRetailPriceUSD: 349,
          isManufacturerPassThrough: true,
          partnerPharmacyIds: [],
        },
        'TX',
        []
      );

      assert.strictEqual(decision.success, true);
      assert.strictEqual(decision.route, 'NOVO_CARE_API');
      assert.strictEqual(decision.drugCostUSD, 349);
      assert.strictEqual(decision.careMembershipFeeUSD, 79);
      assert.strictEqual(decision.totalPatientBilledUSD, 428);
      assert.strictEqual(decision.isColdChainRequired, true);
    });

    it('routes personalized Hair Loss spray to licensed 503A compounding partner', () => {
      const decision = PharmacyRoutingEngine.routePrescription(
        {
          id: 'med_hair_spray',
          ndcOrCompoundCode: 'CMP-MINOX-FIN-01',
          displayName: 'Custom Topical Spray (Minoxidil 6% + Finasteride 0.1% + Tretinoin 0.01%)',
          category: 'HAIR_LOSS',
          type: 'COMPOUNDED_503A',
          strength: 'Custom',
          dosageForm: 'Topical Solution',
          defaultDaysSupply: 30,
          monthlyRetailPriceUSD: 45,
          isManufacturerPassThrough: false,
          partnerPharmacyIds: ['pharm_truepill_503a'],
        },
        'TX',
        [
          {
            id: 'pharm_truepill_503a',
            name: 'Truepill Compounding Pharmacy 503A',
            is503ACompounding: true,
            licensedStates: ['TX', 'FL', 'AZ', 'GA'],
            supportsColdChain: false,
            averageDispenseHours: 12,
          },
        ]
      );

      assert.strictEqual(decision.success, true);
      assert.strictEqual(decision.route, 'MAIL_ORDER_503A_PARTNER');
      assert.strictEqual(decision.assignedPharmacyId, 'pharm_truepill_503a');
      assert.strictEqual(decision.totalPatientBilledUSD, 45);
    });
  });

  describe('4. HIPAA Audit Logger & Zero-Pixel Privacy', () => {
    it('creates immutable audit entry with salted HMAC-SHA256 hashed IP', () => {
      const entry = HASTAuditLogger.createAuditEntry({
        userId: 'user_doc_1',
        userRole: 'CLINICIAN',
        action: 'READ',
        resourceType: 'ENCOUNTER',
        resourceId: 'enc_123',
        patientId: 'pat_456',
        rawIpAddress: '198.51.100.42',
        accessReason: 'Clinical intake review for prescribing',
      });

      assert.ok(entry.id);
      assert.strictEqual(entry.ipAddressHash.length, 64); // SHA-256 hex string
      assert.notStrictEqual(entry.ipAddressHash, '198.51.100.42');
    });

    it('scrubs passwords, credit card numbers, and tokens from system logs', () => {
      const rawData = {
        eventName: 'IntakeStepCompleted',
        userId: 'user_123',
        password: 'SuperSecretPassword!',
        creditCard: '4111222233334444',
        nested: {
          authorizationToken: 'Bearer jwt.xyz.123',
          stepNumber: 3,
        },
      };

      const sanitized = HASTAuditLogger.sanitizeForTelemetry(rawData);
      assert.strictEqual(sanitized['password'], '[REDACTED_HIPAA_SECURE]');
      assert.strictEqual(sanitized['creditCard'], '[REDACTED_HIPAA_SECURE]');
      assert.strictEqual(
        (sanitized['nested'] as Record<string, unknown>)['authorizationToken'],
        '[REDACTED_HIPAA_SECURE]'
      );
      assert.strictEqual((sanitized['nested'] as Record<string, unknown>)['stepNumber'], 3);
    });
  });

  describe('5. FTC Negative-Option Subscription Lifecycle', () => {
    it('creates pending subscription at checkout with pre-authorization hold', () => {
      const plan = {
        id: 'plan_ed_monthly',
        name: 'Tadalafil Daily 5mg Monthly Plan',
        intervalDays: 30,
        amountUSD: 40,
        isPassThroughDrugIncluded: true,
        cancelAnytimeNoticeText: 'Cancel anytime in your portal.',
      };

      const sub = SubscriptionEngine.createPendingSubscription('pat_123', plan);
      assert.strictEqual(sub.status, 'PENDING_CLINICAL_APPROVAL');
      assert.strictEqual(sub.cardAuthorizedOnly, true);
    });

    it('activates subscription upon clinician prescription approval', () => {
      const plan = {
        id: 'plan_ed_monthly',
        name: 'Tadalafil Daily 5mg Monthly Plan',
        intervalDays: 30,
        amountUSD: 40,
        isPassThroughDrugIncluded: true,
        cancelAnytimeNoticeText: 'Cancel anytime in your portal.',
      };

      const sub = SubscriptionEngine.createPendingSubscription('pat_123', plan);
      const activeSub = SubscriptionEngine.activateOnPrescriptionApproval(sub);

      assert.strictEqual(activeSub.status, 'ACTIVE');
      assert.strictEqual(activeSub.cardAuthorizedOnly, false);
    });

    it('executes 1-click immediate cancellation without retention roadblocks', () => {
      const plan = {
        id: 'plan_hair_monthly',
        name: 'Finasteride 1mg Monthly',
        intervalDays: 30,
        amountUSD: 25,
        isPassThroughDrugIncluded: true,
        cancelAnytimeNoticeText: 'Cancel anytime in your portal.',
      };

      const sub = SubscriptionEngine.createPendingSubscription('pat_123', plan);
      const cancelledSub = SubscriptionEngine.cancelSubscription(sub, 'Patient requested stop');

      assert.strictEqual(cancelledSub.status, 'CANCELLED');
      assert.ok(cancelledSub.cancellationDate);
    });
  });
});
