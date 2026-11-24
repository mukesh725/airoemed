import { ClinicalCategory, ClinicianLicense, TelehealthModality, USStateCode } from '@airo/types';
export interface EligibilityResult {
    isEligible: boolean;
    reasons: string[];
    allowedModality?: TelehealthModality;
    requiredDisclosures: string[];
}
export declare class EligibilityValidator {
    /**
     * Validates whether a patient in a given physical location can initiate
     * care for a requested clinical category.
     */
    static validatePatientEligibility(stateOfResidence: USStateCode, currentPhysicalState: USStateCode, category: ClinicalCategory, patientAgeYears: number): EligibilityResult;
    /**
     * Matches an eligible case to clinicians who hold active, verified licenses
     * in the patient's physical state.
     */
    static findQualifiedClinicians(patientPhysicalState: USStateCode, clinicianRoster: Array<{
        clinicianId: string;
        name: string;
        licenses: ClinicianLicense[];
    }>, evaluationDate?: Date): string[];
}
//# sourceMappingURL=eligibility-validator.d.ts.map