import {
  CDSSEvaluator,
  EligibilityValidator,
  IntakeAnswers,
} from '@airo/core';
import { ClinicalCategory, USStateCode } from '@airo/types';

export interface IntakeEvaluationRequest {
  stateOfResidence: USStateCode;
  currentPhysicalState: USStateCode;
  category: ClinicalCategory;
  patientAge: number;
  biologicalSex: 'MALE' | 'FEMALE';
  answers: IntakeAnswers;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as IntakeEvaluationRequest;

    // 1. Validate State Gating & Eligibility
    const eligibility = EligibilityValidator.validatePatientEligibility(
      body.stateOfResidence,
      body.currentPhysicalState,
      body.category,
      body.patientAge
    );

    if (!eligibility.isEligible) {
      return Response.json(
        {
          success: false,
          error: 'ELIGIBILITY_RESTRICTION',
          reasons: eligibility.reasons,
        },
        { status: 403 }
      );
    }

    // 2. Run Clinical Decision Support (CDSS) Contraindication Engine
    const cdssResult = CDSSEvaluator.evaluateIntake(
      body.category,
      body.answers,
      body.biologicalSex,
      eligibility.allowedModality
    );

    if (cdssResult.hasHardStop) {
      return Response.json(
        {
          success: false,
          error: 'CLINICAL_CONTRAINDICATION_HARD_STOP',
          reasons: cdssResult.findings
            .filter((f) => f.severity === 'CRITICAL_HARD_STOP')
            .map((f) => `${f.ruleTitle}: ${f.clinicalExplanation}`),
          findings: cdssResult.findings,
        },
        { status: 422 }
      );
    }

    // 3. Approved for Licensed Clinician Review
    return Response.json({
      success: true,
      allowedModality: cdssResult.recommendedModality,
      requiresVideo: cdssResult.recommendedModality === 'SYNCHRONOUS_AUDIO_VIDEO',
      disclosures: eligibility.requiredDisclosures,
      findings: cdssResult.findings,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: 'INTERNAL_EVALUATION_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
