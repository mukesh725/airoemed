import { CDSSFinding } from '@airo/types';
export interface IntakeAnswers {
    pregnantOrBreastfeeding?: boolean;
    tryingToConceive?: boolean;
    currentMedications?: string[];
    allergies?: string[];
    medicalConditions?: string[];
    takesNitratesOrPoppers?: boolean;
    takesRiociguat?: boolean;
    takesAlphaBlockers?: boolean;
    recentHeartAttackOrStroke?: boolean;
    unstableAnginaOrChestPainDuringSex?: boolean;
    systolicBloodPressure?: number;
    diastolicBloodPressure?: number;
    calculatedBMI?: number;
    personalOrFamilyMTC?: boolean;
    personalOrFamilyMEN2?: boolean;
    historyOfPancreatitis?: boolean;
    historyOfEatingDisorder?: boolean;
    hasWeightRelatedComorbidity?: boolean;
    suddenPatchyHairLoss?: boolean;
    scalpPainBurningOrPustules?: boolean;
    activeSevereEczemaOnFace?: boolean;
    sunlightHypersensitivity?: boolean;
}
export declare class ClinicalContraindicationRules {
    /**
     * Evaluates Sexual Health (ED/PE) intake.
     */
    static evaluateSexualHealth(answers: IntakeAnswers): CDSSFinding[];
    /**
     * Evaluates Weight Management (GLP-1) intake.
     */
    static evaluateWeightManagement(answers: IntakeAnswers): CDSSFinding[];
    /**
     * Evaluates Hair Loss intake.
     */
    static evaluateHairLoss(answers: IntakeAnswers, biologicalSex: 'MALE' | 'FEMALE'): CDSSFinding[];
    /**
     * Evaluates Dermatology intake.
     */
    static evaluateDermatology(answers: IntakeAnswers, biologicalSex: 'MALE' | 'FEMALE'): CDSSFinding[];
}
//# sourceMappingURL=contraindication-rules.d.ts.map