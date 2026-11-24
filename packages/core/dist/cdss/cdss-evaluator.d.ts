import { CDSSEvaluationResult, ClinicalCategory, TelehealthModality } from '@airo/types';
import { IntakeAnswers } from './contraindication-rules.js';
export declare class CDSSEvaluator {
    /**
     * Master CDSS evaluator: runs clinical safety algorithms across categories.
     */
    static evaluateIntake(category: ClinicalCategory, answers: IntakeAnswers, biologicalSex: 'MALE' | 'FEMALE', defaultModality?: TelehealthModality): CDSSEvaluationResult;
}
//# sourceMappingURL=cdss-evaluator.d.ts.map