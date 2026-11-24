import {
  CDSSEvaluationResult,
  CDSSFinding,
  ClinicalCategory,
  TelehealthModality,
} from '@airo/types';
import { ClinicalContraindicationRules, IntakeAnswers } from './contraindication-rules.js';

export class CDSSEvaluator {
  /**
   * Master CDSS evaluator: runs clinical safety algorithms across categories.
   */
  public static evaluateIntake(
    category: ClinicalCategory,
    answers: IntakeAnswers,
    biologicalSex: 'MALE' | 'FEMALE',
    defaultModality: TelehealthModality = 'ASYNC_STORE_AND_FORWARD'
  ): CDSSEvaluationResult {
    let findings: CDSSFinding[] = [];

    switch (category) {
      case 'SEXUAL_HEALTH_ED':
        findings = ClinicalContraindicationRules.evaluateSexualHealth(answers);
        break;
      case 'WEIGHT_MANAGEMENT':
        findings = ClinicalContraindicationRules.evaluateWeightManagement(answers);
        break;
      case 'HAIR_LOSS':
        findings = ClinicalContraindicationRules.evaluateHairLoss(answers, biologicalSex);
        break;
      case 'DERMATOLOGY':
        findings = ClinicalContraindicationRules.evaluateDermatology(answers, biologicalSex);
        break;
      default:
        findings = [];
    }

    const hasHardStop = findings.some((f) => f.severity === 'CRITICAL_HARD_STOP');
    const requiresVideo = findings.some((f) => f.actionRequired === 'FORCE_VIDEO_CONSULT');

    const recommendedModality: TelehealthModality = requiresVideo
      ? 'SYNCHRONOUS_AUDIO_VIDEO'
      : defaultModality;

    return {
      hasHardStop,
      canProceedToReview: !hasHardStop,
      findings,
      recommendedModality,
    };
  }
}
