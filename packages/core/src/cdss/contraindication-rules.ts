import { CDSSFinding } from '@airo/types';

export interface IntakeAnswers {
  // Common
  pregnantOrBreastfeeding?: boolean;
  tryingToConceive?: boolean;
  currentMedications?: string[];
  allergies?: string[];
  medicalConditions?: string[];

  // Sexual Health / ED
  takesNitratesOrPoppers?: boolean;
  takesRiociguat?: boolean;
  takesAlphaBlockers?: boolean;
  recentHeartAttackOrStroke?: boolean; // Last 6 months
  unstableAnginaOrChestPainDuringSex?: boolean;
  systolicBloodPressure?: number;
  diastolicBloodPressure?: number;

  // Weight Management
  calculatedBMI?: number;
  personalOrFamilyMTC?: boolean; // Medullary Thyroid Carcinoma
  personalOrFamilyMEN2?: boolean; // Multiple Endocrine Neoplasia type 2
  historyOfPancreatitis?: boolean;
  historyOfEatingDisorder?: boolean; // Anorexia / Bulimia
  hasWeightRelatedComorbidity?: boolean; // Hypertension, dyslipidemia, T2D, OSA

  // Hair Loss
  suddenPatchyHairLoss?: boolean;
  scalpPainBurningOrPustules?: boolean;

  // Dermatology
  activeSevereEczemaOnFace?: boolean;
  sunlightHypersensitivity?: boolean;
}

export class ClinicalContraindicationRules {
  /**
   * Evaluates Sexual Health (ED/PE) intake.
   */
  public static evaluateSexualHealth(answers: IntakeAnswers): CDSSFinding[] {
    const findings: CDSSFinding[] = [];

    // 1. Nitrates Hard Stop
    if (answers.takesNitratesOrPoppers) {
      findings.push({
        ruleId: 'ED-CONTRA-NITRATES',
        category: 'SEXUAL_HEALTH_ED',
        severity: 'CRITICAL_HARD_STOP',
        ruleTitle: 'Absolute Contraindication: Nitrates Co-Administration',
        clinicalExplanation:
          'Co-administration of PDE5 inhibitors (sildenafil, tadalafil) with organic nitrates or alkyl nitrites causes profound, potentially fatal systemic hypotension.',
        evidenceReference: 'FDA Drug Safety Communication & ACC/AHA Practice Guidelines',
        actionRequired: 'REJECT_APPLICATION',
      });
    }

    // 2. Riociguat Hard Stop
    if (answers.takesRiociguat) {
      findings.push({
        ruleId: 'ED-CONTRA-RIOCIGUAT',
        category: 'SEXUAL_HEALTH_ED',
        severity: 'CRITICAL_HARD_STOP',
        ruleTitle: 'Absolute Contraindication: Soluble Guanylate Cyclase (sGC) Stimulator',
        clinicalExplanation:
          'Concomitant use of PDE5 inhibitors with riociguat is contraindicated due to synergistic hypotensive risk.',
        evidenceReference: 'FDA Package Insert (Adempas / Sildenafil)',
        actionRequired: 'REJECT_APPLICATION',
      });
    }

    // 3. Cardiovascular Instability
    if (answers.recentHeartAttackOrStroke || answers.unstableAnginaOrChestPainDuringSex) {
      findings.push({
        ruleId: 'ED-CONTRA-CARDIO-RISK',
        category: 'SEXUAL_HEALTH_ED',
        severity: 'CRITICAL_HARD_STOP',
        ruleTitle: 'Absolute Contraindication: High Cardiovascular Risk',
        clinicalExplanation:
          'Sexual activity entails cardiac risk. Patients with recent myocardial infarction, stroke (<6 mos), or unstable angina require in-person cardiology clearance.',
        evidenceReference: 'Princeton Consensus Panel on Sexual Dysfunction and Cardiac Risk',
        actionRequired: 'REJECT_APPLICATION',
      });
    }

    // 4. Blood Pressure Boundaries
    if (answers.systolicBloodPressure && answers.diastolicBloodPressure) {
      if (answers.systolicBloodPressure > 170 || answers.diastolicBloodPressure > 100) {
        findings.push({
          ruleId: 'ED-WARN-HYPERTENSION',
          category: 'SEXUAL_HEALTH_ED',
          severity: 'CRITICAL_HARD_STOP',
          ruleTitle: 'Contraindication: Uncontrolled Severe Hypertension',
          clinicalExplanation: `Blood pressure reading (${answers.systolicBloodPressure}/${answers.diastolicBloodPressure} mmHg) exceeds safe telehealth prescribing limits.`,
          evidenceReference: 'ACC/AHA High Blood Pressure Clinical Practice Guidelines',
          actionRequired: 'REJECT_APPLICATION',
        });
      } else if (answers.systolicBloodPressure < 90 || answers.diastolicBloodPressure < 50) {
        findings.push({
          ruleId: 'ED-WARN-HYPOTENSION',
          category: 'SEXUAL_HEALTH_ED',
          severity: 'CRITICAL_HARD_STOP',
          ruleTitle: 'Contraindication: Baseline Resting Hypotension',
          clinicalExplanation: `Resting blood pressure (${answers.systolicBloodPressure}/${answers.diastolicBloodPressure} mmHg) is too low for PDE5i initiation.`,
          evidenceReference: 'FDA Sildenafil Prescribing Information',
          actionRequired: 'REJECT_APPLICATION',
        });
      }
    }

    // 5. Alpha-Blocker Warning
    if (answers.takesAlphaBlockers) {
      findings.push({
        ruleId: 'ED-WARN-ALPHA-BLOCKERS',
        category: 'SEXUAL_HEALTH_ED',
        severity: 'WARNING_CLINICIAN_CONFIRMATION',
        ruleTitle: 'Precaution: Concomitant Alpha-Blocker Therapy',
        clinicalExplanation:
          'Patient takes alpha-blockers. Advise spacing doses by at least 4-6 hours to prevent orthostatic hypotension.',
        evidenceReference: 'American Urological Association (AUA) ED Guidelines',
        actionRequired: 'REQUIRE_CLINICIAN_OVERRIDE_REASON',
      });
    }

    return findings;
  }

  /**
   * Evaluates Weight Management (GLP-1) intake.
   */
  public static evaluateWeightManagement(answers: IntakeAnswers): CDSSFinding[] {
    const findings: CDSSFinding[] = [];

    // 1. MTC / MEN2 Thyroid Cancer Hard Stop
    if (answers.personalOrFamilyMTC || answers.personalOrFamilyMEN2) {
      findings.push({
        ruleId: 'WEIGHT-CONTRA-MTC-MEN2',
        category: 'WEIGHT_MANAGEMENT',
        severity: 'CRITICAL_HARD_STOP',
        ruleTitle: 'Black Box Warning: Risk of Thyroid C-Cell Tumors (MTC / MEN2)',
        clinicalExplanation:
          'Semaglutide and tirzepatide are contraindicated in patients with a personal or family history of MTC or Multiple Endocrine Neoplasia syndrome type 2.',
        evidenceReference: 'FDA Boxed Warning (Wegovy / Zepbound)',
        actionRequired: 'REJECT_APPLICATION',
      });
    }

    // 2. Pancreatitis Hard Stop
    if (answers.historyOfPancreatitis) {
      findings.push({
        ruleId: 'WEIGHT-CONTRA-PANCREATITIS',
        category: 'WEIGHT_MANAGEMENT',
        severity: 'CRITICAL_HARD_STOP',
        ruleTitle: 'Contraindication: Prior History of Acute or Chronic Pancreatitis',
        clinicalExplanation:
          'GLP-1 receptor agonists have been associated with acute pancreatitis. Safety in patients with prior pancreatitis has not been established.',
        evidenceReference: 'FDA Warnings and Precautions for Incretin Mimetics',
        actionRequired: 'REJECT_APPLICATION',
      });
    }

    // 3. Pregnancy / Breastfeeding Hard Stop
    if (answers.pregnantOrBreastfeeding || answers.tryingToConceive) {
      findings.push({
        ruleId: 'WEIGHT-CONTRA-PREGNANCY',
        category: 'WEIGHT_MANAGEMENT',
        severity: 'CRITICAL_HARD_STOP',
        ruleTitle: 'Absolute Contraindication: Pregnancy or Lactation',
        clinicalExplanation:
          'GLP-1 weight loss medications must be discontinued at least 2 months before a planned pregnancy due to fetal harm risks.',
        evidenceReference: 'FDA Prescribing Information Section 8.1',
        actionRequired: 'REJECT_APPLICATION',
      });
    }

    // 4. Eating Disorder Hard Stop
    if (answers.historyOfEatingDisorder) {
      findings.push({
        ruleId: 'WEIGHT-CONTRA-EATING-DISORDER',
        category: 'WEIGHT_MANAGEMENT',
        severity: 'CRITICAL_HARD_STOP',
        ruleTitle: 'Contraindication: Active or Prior Anorexia / Bulimia',
        clinicalExplanation:
          'Potent appetite suppressants are contraindicated in patients with eating disorders without specialized multidisciplinary psychiatric supervision.',
        evidenceReference: 'Academy for Eating Disorders Telemedicine Standards',
        actionRequired: 'REJECT_APPLICATION',
      });
    }

    // 5. BMI Verification
    if (answers.calculatedBMI !== undefined) {
      if (answers.calculatedBMI < 27) {
        findings.push({
          ruleId: 'WEIGHT-CONTRA-BMI-TOO-LOW',
          category: 'WEIGHT_MANAGEMENT',
          severity: 'CRITICAL_HARD_STOP',
          ruleTitle: 'Label Restriction: BMI Does Not Meet FDA Indications',
          clinicalExplanation: `Patient BMI (${answers.calculatedBMI}) is below the FDA indication threshold (BMI >= 30, or BMI >= 27 with comorbidity).`,
          evidenceReference: 'FDA Indications for Chronic Weight Management',
          actionRequired: 'REJECT_APPLICATION',
        });
      } else if (answers.calculatedBMI >= 27 && answers.calculatedBMI < 30 && !answers.hasWeightRelatedComorbidity) {
        findings.push({
          ruleId: 'WEIGHT-WARN-BMI-COMORBIDITY',
          category: 'WEIGHT_MANAGEMENT',
          severity: 'CRITICAL_HARD_STOP',
          ruleTitle: 'Label Restriction: BMI 27-30 Requires Documented Comorbidity',
          clinicalExplanation:
            'For BMI between 27 and 30, at least one weight-related condition (hypertension, high cholesterol, T2D, OSA) must be verified.',
          evidenceReference: 'FDA Indications for Wegovy / Zepbound',
          actionRequired: 'REJECT_APPLICATION',
        });
      }
    }

    return findings;
  }

  /**
   * Evaluates Hair Loss intake.
   */
  public static evaluateHairLoss(
    answers: IntakeAnswers,
    biologicalSex: 'MALE' | 'FEMALE'
  ): CDSSFinding[] {
    const findings: CDSSFinding[] = [];

    // Finasteride in women of childbearing potential
    if (biologicalSex === 'FEMALE') {
      if (answers.pregnantOrBreastfeeding || answers.tryingToConceive) {
        findings.push({
          ruleId: 'HAIR-CONTRA-TERATOGENIC-FINASTERIDE',
          category: 'HAIR_LOSS',
          severity: 'CRITICAL_HARD_STOP',
          ruleTitle: 'Teratogenic Hazard: Pregnancy Risk with 5-Alpha Reductase Inhibitors',
          clinicalExplanation:
            'Finasteride and dutasteride cause abnormalities of external genitalia in male fetuses. Strictly contraindicated in pregnant or childbearing women.',
          evidenceReference: 'FDA Category X Warning / Propecia Package Insert',
          actionRequired: 'REJECT_APPLICATION',
        });
      }
    }

    // Sudden patchy or scarring hair loss
    if (answers.suddenPatchyHairLoss || answers.scalpPainBurningOrPustules) {
      findings.push({
        ruleId: 'HAIR-WARN-SCARRING-ALOPECIA',
        category: 'HAIR_LOSS',
        severity: 'WARNING_CLINICIAN_CONFIRMATION',
        ruleTitle: 'Atypical Presentation: Possible Scarring Alopecia or Alopecia Areata',
        clinicalExplanation:
          'Symptoms suggest possible lichen planopilaris, frontal fibrosing alopecia, or alopecia areata. Requires dermoscopic evaluation before prescribing.',
        evidenceReference: 'American Academy of Dermatology (AAD) Alopecia Guidelines',
        actionRequired: 'FORCE_VIDEO_CONSULT',
      });
    }

    return findings;
  }

  /**
   * Evaluates Dermatology intake.
   */
  public static evaluateDermatology(
    answers: IntakeAnswers,
    biologicalSex: 'MALE' | 'FEMALE'
  ): CDSSFinding[] {
    const findings: CDSSFinding[] = [];

    if (biologicalSex === 'FEMALE' && (answers.pregnantOrBreastfeeding || answers.tryingToConceive)) {
      findings.push({
        ruleId: 'DERM-WARN-TERATOGENIC-RETINOID',
        category: 'DERMATOLOGY',
        severity: 'WARNING_CLINICIAN_CONFIRMATION',
        ruleTitle: 'Precaution: Retinoid Avoidance in Pregnancy',
        clinicalExplanation:
          'Topical retinoids (tretinoin) should be avoided in pregnancy. Clinician must confirm non-retinoid alternatives (e.g. azelaic acid).',
        evidenceReference: 'AAD Acne Guidelines & Teratology Society',
        actionRequired: 'REQUIRE_CLINICIAN_OVERRIDE_REASON',
      });
    }

    return findings;
  }
}
